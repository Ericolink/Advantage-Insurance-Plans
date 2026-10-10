"use server";

import { headers } from "next/headers";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { en } from "@/content/dictionaries/en";
import { fill, getDictionary, hasLocale } from "@/lib/i18n";
import type { HelpType, LeadField, LeadErrorKey, LeadFormState, LeadValues } from "@/lib/lead-form";
import { hasLeadDestination } from "@/config/lead-env";
import { deliverLead, isRateLimited, type ContactMethod } from "@/lib/leads";
import { siteVars } from "@/lib/site-vars";

const text = (formData: FormData, key: string, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns the phone as E.164 (+1XXXXXXXXXX) or null when it isn't a valid US number. */
function normalizeUsPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(national) ? `+1${national}` : null;
}

function parseHelpType(value: string): HelpType | "" {
  if (value === "other") return "other";
  return (site.services as string[]).includes(value) ? (value as HelpType) : "";
}

export async function submitLead(_previous: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const rawLocale = String(formData.get("locale"));
  const pageLocale: Locale = hasLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(pageLocale);

  // Honeypot: real visitors never fill this hidden field. Pretend it worked.
  if (text(formData, "company_website", 200)) return { status: "success", name: "" };

  const method = String(formData.get("contactMethod"));
  const language = String(formData.get("language"));
  const values: LeadValues = {
    name: text(formData, "name", 120),
    phone: text(formData, "phone", 40),
    email: text(formData, "email", 200),
    helpType: parseHelpType(text(formData, "helpType", 20)),
    contactMethod: (["phone", "text", "email"].includes(method) ? method : "phone") as ContactMethod,
    language: hasLocale(language) ? language : pageLocale,
    consent: formData.get("consent") === "on",
    smsConsent: site.contact.acceptsTexts && formData.get("smsConsent") === "on",
  };

  const errors: Partial<Record<LeadField, LeadErrorKey>> = {};
  const phone = values.phone ? normalizeUsPhone(values.phone) : null;
  if (!values.name) errors.name = "name";
  if (!values.phone && !values.email) errors.phone = "contact";
  if (values.phone && !phone) errors.phone = "phone";
  if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = "email";
  if (!values.consent) errors.consent = "consent";
  if (values.contactMethod === "text" && (!phone || !values.smsConsent)) errors.smsConsent = "text";
  if (values.contactMethod === "email" && !values.email && !errors.email) errors.email = "email";

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  // Never pretend a request was sent: without a destination, ask the visitor to call.
  if (!hasLeadDestination()) return { status: "error", errors: { form: "unavailable" }, values };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip");
  if (isRateLimited(ip ?? "unknown")) return { status: "error", errors: { form: "rateLimited" }, values };

  const delivered = await deliverLead({
    name: values.name,
    phone,
    email: values.email || null,
    helpType: values.helpType || null,
    // The office reads leads in English, whatever language the visitor used.
    helpLabel: values.helpType ? en.form.helpOptions[values.helpType] : null,
    contactMethod: values.contactMethod,
    language: values.language,
    consent: {
      contact: true,
      sms: values.smsConsent,
      contactText: fill(dict.form.consent, siteVars),
      smsText: values.smsConsent ? fill(dict.form.smsConsent, siteVars) : null,
    },
    pageLocale,
    submittedAt: new Date().toISOString(),
    ip: ip ?? null,
    userAgent: requestHeaders.get("user-agent"),
  });

  if (!delivered) return { status: "error", errors: { form: "generic" }, values };
  return { status: "success", name: values.name.split(/\s+/)[0] };
}
