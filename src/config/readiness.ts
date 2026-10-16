import { silviaMessage } from "../content/message.ts";
import { hasLeadDestination } from "./lead-env.ts";
import type { SiteConfig } from "./types.ts";

export interface PendingItem {
  /** Stable key, useful for tests and logs. */
  key: string;
  /** What is missing and where to set it (written for whoever maintains the site). */
  message: string;
  /** Blocking items must be resolved before a production launch. */
  blocking: boolean;
}

/**
 * Lists everything that is still missing or unconfirmed.
 * Kept free of runtime imports so `node scripts/launch-check.ts` can run it directly.
 */
export function getPendingItems(site: SiteConfig): PendingItem[] {
  const items: PendingItem[] = [];
  const add = (key: string, message: string, blocking = true) => items.push({ key, message, blocking });

  if (!site.url) add("url", "site.url: production domain is not set (needed for SEO, sitemap and canonical links).");
  // The audience prefers calling, and the "Call our office" buttons depend on it.
  if (!site.contact.phone) add("phone", "site.contact.phone: the office phone number is missing (a placeholder is shown).");
  if (!site.contact.email) add("email", "site.contact.email: no email yet.", false);
  if (!site.location.state || !site.location.stateCode) {
    add("state", "site.location.state / stateCode: state where the agency operates is missing.");
  }
  if (!site.location.city && !site.location.serviceArea) {
    add("area", "site.location: add a city or a service area description.", false);
  }
  if (site.location.showAddress && (!site.location.streetAddress || !site.location.postalCode)) {
    add("address", "site.location: showAddress is true but the street address or postal code is missing.");
  }
  site.otherOffices.forEach((office, index) => {
    if (!office.streetAddress || !office.city || !office.stateCode) {
      add(`office-${index + 2}`, `site.otherOffices[${index}]: address of office ${index + 2} is pending (hidden until filled in).`, false);
    }
  });
  if (site.licenses.length === 0) {
    add("licenses", "site.licenses: at least one state license number is required to market insurance.");
  }
  if (!site.npn) add("npn", "site.npn: National Producer Number not set (shown in the footer once confirmed).", false);
  if (!site.contact.tty) {
    add("tty", "site.contact.tty: confirm the office accepts relay calls (TTY 711) before showing it.", false);
  }
  if (!site.hours) add("hours", "site.hours: business hours are not set.", false);
  if (!site.photo) add("photo", "site.photo: no real photo of Silvia yet.", false);
  if (site.officePhoto?.credit?.includes("Google")) {
    add("office-photo", "site.officePhoto: uses a Google Street View capture; an own photo of the office is better.", false);
  }
  if (!site.about.intro) add("intro", "site.about.intro: Silvia's introduction is missing.", false);
  if (!silviaMessage.approved) {
    add("message", "src/content/message.ts: Silvia's message is a draft; it stays hidden in production until she approves it (approved: true).", false);
  }
  if (site.services.length === 0) add("services", "site.services: no services listed.");
  const unconfirmedScope = Object.entries(site.scope)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  if (unconfirmedScope.length > 0) {
    add(
      "scope",
      `site.scope: not confirmed yet (${unconfirmedScope.join(", ")}). Pages stay educational and ask visitors to call until each is true/false.`,
      false,
    );
  }
  if (!site.languages) {
    add("languages", "site.languages: confirm the languages Silvia serves clients in (e.g. [\"en\", \"es\"]).", false);
  }
  if (site.carriers.names.length > 0 && !site.carriers.confirmed) {
    add("carriers", "site.carriers: list not confirmed by the office yet, so it stays hidden.", false);
  }
  if (site.regulated.medicare && site.testimonials.length > 0) {
    add("testimonials", "site.testimonials: Medicare rules restrict testimonials; have compliance review them before launch.");
  }

  if (site.regulated.medicare === null) {
    add("medicare", "site.regulated.medicare: confirm whether the agency markets Medicare products (true/false).");
  } else if (
    site.regulated.medicare &&
    (site.regulated.medicareOrganizations === null || site.regulated.medicareProducts === null)
  ) {
    add(
      "medicare-disclaimer",
      "site.regulated: Medicare is enabled, so the CMS disclaimer needs medicareOrganizations and medicareProducts.",
    );
  }
  if (site.regulated.aca === null) {
    add("aca", "site.regulated.aca: confirm whether the agency sells Health Insurance Marketplace (ACA) plans.");
  }

  if (site.contact.acceptsTexts && !site.contact.phone) {
    add("texts", "site.contact.acceptsTexts is true but there is no phone number.");
  }
  if (site.leadForm && !hasLeadDestination()) {
    add(
      "lead-delivery",
      "Form: no destination configured (LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_EMAIL_TO + LEAD_EMAIL_FROM). Requests cannot be received.",
    );
  }
  if (!site.legal.privacyPolicyReady) {
    // Required once the site collects personal data through the form; recommended otherwise (e.g. the Google map).
    add("privacy", "Privacy policy: write the real text in src/content/legal and set legal.privacyPolicyReady.", site.leadForm);
  }
  if (!site.legal.termsReady) {
    add("terms", "Terms of use: write the real text in src/content/legal and set legal.termsReady.", false);
  }
  if (!site.socials.google) add("google", "site.socials.google: link the official Google Business Profile once it is confirmed.", false);
  if (!site.copyApproved) {
    add(
      "copy",
      "site.copyApproved: Silvia has not approved the copy in EN and ES, including the inner pages in src/content/pages (and, for Medicare, compliance review).",
    );
  }

  return items;
}

export function isLaunchReady(site: SiteConfig): boolean {
  return getPendingItems(site).every((item) => !item.blocking);
}
