import type { Locale } from "@/config/types";
import { leadEmailConfig, leadWebhookConfig } from "@/config/lead-env";
import { site } from "@/config/site";

export type ContactMethod = "phone" | "text" | "email";

export interface Lead {
  name: string;
  phone: string | null;
  email: string | null;
  /** "medicare" | "medicaid" | "aca" | "other", or null when not chosen. */
  helpType: string | null;
  helpLabel: string | null;
  contactMethod: ContactMethod;
  language: Locale;
  consent: {
    contact: boolean;
    sms: boolean;
    /** Exact wording the visitor agreed to, kept as a consent record. */
    contactText: string;
    smsText: string | null;
  };
  /** Locale of the page the form was sent from. */
  pageLocale: Locale;
  submittedAt: string;
  ip: string | null;
  userAgent: string | null;
}


async function sendToWebhook(lead: Lead, config: { url: string; secret: string | null }) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.secret) headers["X-Lead-Secret"] = config.secret;
  const response = await fetch(config.url, {
    method: "POST",
    headers,
    body: JSON.stringify({ source: "website", business: site.businessName, ...lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

async function sendEmail(lead: Lead, config: { apiKey: string; to: string; from: string }) {
  const rows: [string, string | null][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Needs help with", lead.helpLabel],
    ["Preferred contact", lead.contactMethod],
    ["Preferred language", lead.language === "es" ? "Spanish" : "English"],
    ["Agreed to be contacted", lead.consent.contact ? `Yes — "${lead.consent.contactText}"` : "No"],
    ["Agreed to text messages", lead.consent.sms ? `Yes — "${lead.consent.smsText}"` : "No"],
    ["Sent at", lead.submittedAt],
    ["IP", lead.ip],
  ];
  const html = `<h2>New assistance request</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td style="white-space:pre-wrap">${escapeHtml(value!)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: lead.email ?? undefined,
      subject: `New assistance request: ${lead.name}${lead.helpLabel ? ` (${lead.helpLabel})` : ""}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
}

/**
 * Sends the lead to every configured destination.
 * Succeeds when at least one destination accepted it, so a single outage doesn't lose the lead.
 */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const tasks: Promise<void>[] = [];
  const webhook = leadWebhookConfig();
  const email = leadEmailConfig();
  if (webhook) tasks.push(sendToWebhook(lead, webhook));
  if (email) tasks.push(sendEmail(lead, email));
  if (tasks.length === 0) return false;

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    // Log the failure reason only, never the visitor's data.
    if (result.status === "rejected") console.error("[lead] delivery failed:", String(result.reason));
  }
  return results.some((result) => result.status === "fulfilled");
}

// Best-effort, per-instance rate limit. Enough to stop casual abuse of the form.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 5000) attempts.clear();
  return recent.length > MAX_ATTEMPTS;
}
