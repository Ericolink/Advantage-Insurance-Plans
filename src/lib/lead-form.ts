import type { Locale, ServiceId } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import type { ContactMethod } from "@/lib/leads";

export type HelpType = ServiceId | "other";

/** Field values echoed back on error so the form keeps what the visitor typed. */
export interface LeadValues {
  name: string;
  phone: string;
  email: string;
  helpType: HelpType | "";
  contactMethod: ContactMethod;
  language: Locale;
  consent: boolean;
  smsConsent: boolean;
}

export type LeadErrorKey = keyof Dictionary["form"]["errors"];
export type LeadField = "name" | "phone" | "email" | "consent" | "smsConsent" | "form";

export type LeadFormState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "error"; errors: Partial<Record<LeadField, LeadErrorKey>>; values: LeadValues };

export const initialLeadFormState: LeadFormState = { status: "idle" };
