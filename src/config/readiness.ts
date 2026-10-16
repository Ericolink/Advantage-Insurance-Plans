import { hasPlaceholders, privacyPolicy, termsOfUse } from "../content/legal/index.ts";
import { isMessagePublishable, silviaMessage } from "../content/message.ts";
import { hasLeadDestination } from "./lead-env.ts";
import type { SiteConfig } from "./types.ts";

/** Who has to provide or approve the missing piece. */
export type Owner = "Silvia" | "Silvia + compliance" | "Silvia + legal" | "Web team";

export interface PendingItem {
  /** Stable key, useful for tests and logs. */
  key: string;
  /** What is missing (one line, written for whoever maintains the site). */
  message: string;
  /** Blocking items must be resolved before a production launch. */
  blocking: boolean;
  /** Why it matters. */
  why: string;
  /** File (and field) where it is set. */
  where: string;
  /** Who provides or approves it. */
  owner: Owner;
  /** What has to happen for the item to be resolved. */
  resolve: string;
}

type Details = Omit<PendingItem, "key" | "message" | "blocking">;

const SITE = "src/config/site.ts";
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
/** Hosts that are never a real production domain or a real mailbox. */
const PLACEHOLDER_HOST = /(^|\.)(localhost|example\.(com|org|net)|test|invalid|local)$|^127\.|^0\.0\.0\.0$|netlify\.app$|vercel\.app$/i;

const isValidDate = (value: string) => ISO_DATE.test(value) && !Number.isNaN(Date.parse(value));

/**
 * Lists everything that is still missing, unconfirmed or invalid.
 * Kept free of path aliases so `node scripts/launch-check.ts` and next.config.ts can run it directly.
 * Rule: an item disappears only when the real data or approval is in place, never by relaxing a check.
 */
export function getPendingItems(site: SiteConfig): PendingItem[] {
  const items: PendingItem[] = [];
  const add = (key: string, message: string, blocking: boolean, details: Details) =>
    items.push({ key, message, blocking, ...details });

  // ── Domain ────────────────────────────────────────────────────────────────
  if (!site.url) {
    add("url", "site.url: production domain is not set (needed for SEO, sitemap and canonical links).", true, {
      why: "Canonical, hreflang, Open Graph, sitemap and JSON-LD need absolute URLs. Until then the site stays noindex and none of them are generated.",
      where: `${SITE} → url`,
      owner: "Silvia",
      resolve: 'Buy or confirm the domain, point it to the hosting, then set url to "https://<domain>" (no trailing slash).',
    });
  } else {
    let problem: string | null = null;
    try {
      const parsed = new URL(site.url);
      if (parsed.protocol !== "https:") problem = "must start with https://";
      else if (PLACEHOLDER_HOST.test(parsed.hostname)) problem = "is a local, example or temporary hosting domain";
      else if (site.url.endsWith("/") || parsed.pathname !== "/" || parsed.search || parsed.hash) problem = "must be the bare origin, without a path or trailing slash";
    } catch {
      problem = "is not a valid URL";
    }
    if (problem) {
      add("url-invalid", `site.url: "${site.url}" ${problem}.`, true, {
        why: "Every canonical link, the sitemap and the structured data would point to the wrong address.",
        where: `${SITE} → url`,
        owner: "Web team",
        resolve: 'Use the confirmed production origin, e.g. "https://www.<domain>".',
      });
    }
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  // The audience prefers calling, and the "Call our office" buttons depend on it.
  if (!site.contact.phone) {
    add("phone", "site.contact.phone: the office phone number is missing (a placeholder is shown).", true, {
      why: "Calling is the main action on every page.",
      where: `${SITE} → contact.phone`,
      owner: "Silvia",
      resolve: "Add the office number in E.164 and display format.",
    });
  }
  if (!site.contact.email) {
    add("email", "site.contact.email: no official email yet (none is shown).", false, {
      why: "Some visitors and the privacy policy need a written contact channel.",
      where: `${SITE} → contact.email`,
      owner: "Silvia",
      resolve: "Silvia confirms the official address she reads (ideally on the site's domain). Never use an example or personal address.",
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(site.contact.email) || PLACEHOLDER_HOST.test(site.contact.email.split("@")[1] ?? "")) {
    add("email-invalid", `site.contact.email: "${site.contact.email}" is not a valid, real address.`, true, {
      why: "An example or mistyped address would be published on every page.",
      where: `${SITE} → contact.email`,
      owner: "Web team",
      resolve: "Replace it with the address Silvia confirmed.",
    });
  }
  if (!site.contact.tty) {
    add("tty", "site.contact.tty: TTY 711 is not shown until the office confirms it takes relay calls.", false, {
      why: "Medicare materials usually list a TTY option, but showing it is a promise that relay calls are answered.",
      where: `${SITE} → contact.tty`,
      owner: "Silvia",
      resolve: "Silvia confirms the office answers calls through the 711 relay service (test one call), then set tty: true.",
    });
  }
  if (!site.languages) {
    add("languages", "site.languages: the languages the office serves clients in are not confirmed.", false, {
      why: 'The site being in EN and ES does not prove the office serves clients in both. "Se habla español" / "We speak English" stay hidden.',
      where: `${SITE} → languages`,
      owner: "Silvia",
      resolve: 'Silvia confirms which languages she (and staff) use with clients by phone and in person, e.g. ["en", "es"].',
    });
  }
  if (!site.socials.google) {
    add("google", "site.socials.google: the official Google Business Profile is not linked.", false, {
      why: "Links visitors to reviews and directions and confirms the listing in structured data.",
      where: `${SITE} → socials.google`,
      owner: "Silvia",
      resolve: 'Silvia (as owner/manager of the profile) copies the link from the profile\'s "Share" button. Never a Google search URL.',
    });
  } else if (!/^https:\/\/(www\.google\.com\/maps|maps\.google\.com|g\.page|maps\.app\.goo\.gl|business\.google\.com)\b/.test(site.socials.google) || /google\.com\/search/.test(site.socials.google)) {
    add("google-invalid", `site.socials.google: "${site.socials.google}" is not a Google Business Profile link.`, true, {
      why: "A search link is not the official profile.",
      where: `${SITE} → socials.google`,
      owner: "Web team",
      resolve: "Use the share link of the profile itself.",
    });
  }

  // ── Location ──────────────────────────────────────────────────────────────
  if (!site.location.state || !site.location.stateCode) {
    add("state", "site.location.state / stateCode: state where the agency operates is missing.", true, {
      why: "Licensing, disclaimers and the page copy depend on the state.",
      where: `${SITE} → location`,
      owner: "Silvia",
      resolve: "Fill in the state of the main office.",
    });
  }
  if (!site.location.city && !site.location.serviceArea) {
    add("area", "site.location: add a city or a service area description.", false, {
      why: "Visitors need to know where the office works.",
      where: `${SITE} → location`,
      owner: "Silvia",
      resolve: "Add the city or a service area.",
    });
  }
  if (site.location.showAddress && (!site.location.streetAddress || !site.location.postalCode)) {
    add("address", "site.location: showAddress is true but the street address or postal code is missing.", true, {
      why: "An incomplete address would be published.",
      where: `${SITE} → location`,
      owner: "Silvia",
      resolve: "Complete the address or set showAddress: false.",
    });
  }
  site.otherOffices.forEach((office, index) => {
    if (!office.streetAddress || !office.city || !office.stateCode) {
      add(`office-${index + 2}`, `site.otherOffices[${index}]: address of office ${index + 2} is pending (hidden until filled in).`, false, {
        why: "Incomplete offices are hidden in production.",
        where: `${SITE} → otherOffices[${index}]`,
        owner: "Silvia",
        resolve: "Complete the address or remove the entry.",
      });
    }
  });
  if (!site.hours) {
    add("hours", "site.hours: business hours are not set.", false, {
      why: "Visitors need to know when to call.",
      where: `${SITE} → hours`,
      owner: "Silvia",
      resolve: "Add the office hours.",
    });
  }

  // ── Licensing ─────────────────────────────────────────────────────────────
  if (site.licenses.length === 0) {
    add("licenses", "site.licenses: at least one state license number is required to market insurance.", true, {
      why: "Licensed agents must be identifiable; visitors check the number on the state lookup (TDI in Texas). No license is shown or invented until confirmed.",
      where: `${SITE} → licenses ({ state, number, holder })`,
      owner: "Silvia",
      resolve: "Silvia sends, for each state where she or the agency is licensed: state, license number exactly as on TDI/NM OSI, whether it is her individual or the agency license, and that it is active.",
    });
  }
  site.licenses.forEach((license, index) => {
    const number = license.number.trim();
    const problem = !/^[A-Z]{2}$/.test(license.state)
      ? "state must be a two-letter code"
      : !number
        ? "number is empty"
        : /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(number)
          ? "number looks like a phone number"
          : site.npn && number === site.npn
            ? "number is the NPN, not a state license"
            : null;
    if (problem) {
      add(`license-${index}`, `site.licenses[${index}]: ${problem}.`, true, {
        why: "A wrong identifier would be published as a state license.",
        where: `${SITE} → licenses[${index}]`,
        owner: "Web team",
        resolve: "Copy the number exactly from the state license lookup.",
      });
    }
  });
  if (site.licenses.length > 0) {
    const officeStates = new Set(
      [site.location.showAddress ? site.location.stateCode : null, ...site.otherOffices.filter((o) => o.streetAddress && o.city).map((o) => o.stateCode)].filter(
        (state): state is string => Boolean(state),
      ),
    );
    const licensed = new Set(site.licenses.map((license) => license.state));
    const missing = [...officeStates].filter((state) => !licensed.has(state));
    if (missing.length > 0) {
      add("license-states", `site.licenses: the site shows offices in ${missing.join(", ")} but lists no license for that state.`, false, {
        why: "Visitors in that state would see an office without a matching license.",
        where: `${SITE} → licenses / otherOffices`,
        owner: "Silvia",
        resolve: "Add the license for that state, or confirm with Silvia how that office is licensed.",
      });
    }
  }
  if (!site.npn) {
    add("npn", "site.npn: National Producer Number not set (shown in the footer once confirmed).", false, {
      why: "Carriers and visitors use the NPN to verify an agent across states. It is not a state license number.",
      where: `${SITE} → npn`,
      owner: "Silvia",
      resolve: "Silvia sends her NPN (from NIPR, digits only).",
    });
  } else if (!/^\d{1,10}$/.test(site.npn)) {
    add("npn-invalid", `site.npn: "${site.npn}" is not a valid NPN (digits only).`, true, {
      why: "A wrong identifier would be published in the footer.",
      where: `${SITE} → npn`,
      owner: "Web team",
      resolve: "Copy the NPN exactly from NIPR.",
    });
  }

  // ── Photos and Silvia's own words ─────────────────────────────────────────
  if (!site.photo) {
    add("photo", "site.photo: no real photo of Silvia yet.", false, {
      why: "A real photo builds trust.",
      where: `${SITE} → photo`,
      owner: "Silvia",
      resolve: "Add a photo Silvia approved.",
    });
  }
  if (site.officePhoto && site.officePhoto.source !== "own") {
    add("office-photo", "site.officePhoto: only a Google Street View capture is available, so production shows no office photo.", false, {
      why: "A Street View capture must not be presented as the agency's own photo of its premises.",
      where: `${SITE} → officePhoto (file: public/images/office.webp)`,
      owner: "Silvia",
      resolve: 'The office sends its own photo of the storefront; replace the file, update width/height, set source: "own" and credit: null.',
    });
  }
  if (!site.about.intro) {
    add("intro", "site.about.intro: Silvia's introduction is missing (a neutral fallback is shown).", false, {
      why: "Visitors want to know who they will talk to. It must be in Silvia's own words, not an invented biography.",
      where: `${SITE} → about.intro (EN and ES)`,
      owner: "Silvia",
      resolve: "Silvia writes or approves a short introduction in EN and ES; then set about.approvedOn to the approval date.",
    });
  } else if (!site.about.approvedOn) {
    add("intro-draft", "site.about: the introduction is a draft; it stays hidden in production until approved.", false, {
      why: "Text attributed to Silvia can only be published with her approval.",
      where: `${SITE} → about.approvedOn`,
      owner: "Silvia",
      resolve: "Silvia approves the EN and ES text; set about.approvedOn to that date.",
    });
  }
  if (site.about.approvedOn && !isValidDate(site.about.approvedOn)) {
    add("intro-date", `site.about.approvedOn: "${site.about.approvedOn}" is not an ISO date (YYYY-MM-DD).`, true, {
      why: "The approval record must be readable.",
      where: `${SITE} → about.approvedOn`,
      owner: "Web team",
      resolve: "Use the real approval date as YYYY-MM-DD.",
    });
  }
  if (silviaMessage.approved && !silviaMessage.approvedOn) {
    add("message-record", "src/content/message.ts: approved is true but approvedOn is empty, so the message stays hidden.", true, {
      why: "approved: true alone is not a record of Silvia's approval.",
      where: "src/content/message.ts → approvedOn",
      owner: "Silvia",
      resolve: "Record the date Silvia approved both languages, or set approved back to false.",
    });
  } else if (silviaMessage.approvedOn && !isValidDate(silviaMessage.approvedOn)) {
    add("message-date", `src/content/message.ts: approvedOn "${silviaMessage.approvedOn}" is not an ISO date (YYYY-MM-DD).`, true, {
      why: "The approval record must be readable.",
      where: "src/content/message.ts → approvedOn",
      owner: "Web team",
      resolve: "Use the real approval date as YYYY-MM-DD.",
    });
  } else if (!isMessagePublishable()) {
    add("message", "src/content/message.ts: Silvia's message is a draft; it stays hidden in production until she approves it.", false, {
      why: "It is an editorial proposal written in her voice; publishing it without her approval would put words in her mouth.",
      where: "src/content/message.ts → approved + approvedOn",
      owner: "Silvia",
      resolve: "Silvia reads, edits and approves the EN and ES text; then set approved: true and approvedOn to that date.",
    });
  }

  // ── Services, carriers and Medicare ───────────────────────────────────────
  if (site.services.length === 0) {
    add("services", "site.services: no services listed.", true, {
      why: "The home page and inner pages are built from this list.",
      where: `${SITE} → services`,
      owner: "Web team",
      resolve: "List the programs the site explains.",
    });
  }
  const unconfirmedScope = Object.entries(site.scope)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  if (unconfirmedScope.length > 0) {
    add("scope", `site.scope: not confirmed yet (${unconfirmedScope.join(", ")}). Pages stay educational and ask visitors to call.`, false, {
      why: "The site never says the office sells or handles a product until Silvia confirms it.",
      where: `${SITE} → scope`,
      owner: "Silvia",
      resolve: "Silvia answers yes/no for each item (docs/launch/silvia-confirmations.md); set each to true or false.",
    });
  }
  if (site.carriers.names.length > 0 && !site.carriers.confirmed) {
    add("carriers", "site.carriers: list not confirmed by the office yet, so it stays hidden.", false, {
      why: "Naming a carrier implies a current appointment/contract with it.",
      where: `${SITE} → carriers`,
      owner: "Silvia",
      resolve: "Silvia confirms each company she is currently appointed with for the coming plan year (and in which states); then set confirmed: true.",
    });
  }
  if (site.regulated.medicare && site.testimonials.length > 0) {
    add("testimonials", "site.testimonials: Medicare rules restrict testimonials; have compliance review them before launch.", true, {
      why: "CMS marketing rules apply to testimonials.",
      where: `${SITE} → testimonials`,
      owner: "Silvia + compliance",
      resolve: "Compliance approves each testimonial and the client's written consent is on file.",
    });
  }
  if (site.regulated.medicare === null) {
    add("medicare", "site.regulated.medicare: confirm whether the agency markets Medicare products (true/false).", true, {
      why: "Decides whether the CMS disclaimers are required.",
      where: `${SITE} → regulated.medicare`,
      owner: "Silvia",
      resolve: "Set true or false.",
    });
  } else if (site.regulated.medicare && (site.regulated.medicareOrganizations === null || site.regulated.medicareProducts === null)) {
    add("medicare-disclaimer", "site.regulated: Medicare is enabled, so the CMS disclaimer needs medicareOrganizations and medicareProducts.", true, {
      why: "CMS requires the number of organizations and products represented in the area.",
      where: `${SITE} → regulated`,
      owner: "Silvia + compliance",
      resolve: "Get both numbers from Silvia's upline/compliance contact.",
    });
  }
  if (site.regulated.aca === null) {
    add("aca", "site.regulated.aca: confirm whether the agency sells Health Insurance Marketplace (ACA) plans.", true, {
      why: "Decides whether the Marketplace disclaimer is required.",
      where: `${SITE} → regulated.aca`,
      owner: "Silvia",
      resolve: "Set true or false.",
    });
  }

  // ── Form and legal pages ──────────────────────────────────────────────────
  if (site.contact.acceptsTexts && !site.contact.phone) {
    add("texts", "site.contact.acceptsTexts is true but there is no phone number.", true, {
      why: "The text-message option would have no number.",
      where: `${SITE} → contact`,
      owner: "Web team",
      resolve: "Add the phone or set acceptsTexts: false.",
    });
  }
  if (site.leadForm && !hasLeadDestination()) {
    add("lead-delivery", "Form: no destination configured (LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_EMAIL_TO + LEAD_EMAIL_FROM).", true, {
      why: "Requests could not be received.",
      where: ".env.local / hosting environment variables (see .env.example)",
      owner: "Web team",
      resolve: "Configure a destination and send a test request.",
    });
  }
  if (!site.legal.privacyPolicyReady) {
    // Required once the site collects personal data through the form; recommended otherwise (cookie, Google maps, hosting logs).
    add("privacy", "Privacy policy: not published yet (a neutral \"being prepared\" notice is shown).", site.leadForm, {
      why: "The site sets a language cookie, embeds Google Maps and is served by a host that logs requests; the form, if enabled, collects personal data.",
      where: "src/content/legal/index.ts → privacyPolicy (draft: src/content/legal/drafts.ts), then site.ts → legal.privacyPolicyReady",
      owner: "Silvia + legal",
      resolve: "Fill in every [PENDING] item of the draft, have it reviewed, move it to privacyPolicy and set privacyPolicyReady: true.",
    });
  } else if (!privacyPolicy || hasPlaceholders(privacyPolicy)) {
    add("privacy-incomplete", "legal.privacyPolicyReady is true but the policy is missing or still has [PENDING] placeholders.", true, {
      why: "An incomplete policy would be published.",
      where: "src/content/legal/index.ts → privacyPolicy",
      owner: "Silvia + legal",
      resolve: "Complete and approve the text, or set privacyPolicyReady back to false.",
    });
  }
  if (!site.legal.termsReady) {
    add("terms", "Terms of use: not published yet (a neutral \"being prepared\" notice is shown).", false, {
      why: "Sets out that the site is educational and that no insurance is sold or bound through it.",
      where: "src/content/legal/index.ts → termsOfUse (draft: src/content/legal/drafts.ts), then site.ts → legal.termsReady",
      owner: "Silvia + legal",
      resolve: "Fill in every [PENDING] item of the draft, have it reviewed, move it to termsOfUse and set termsReady: true.",
    });
  } else if (!termsOfUse || hasPlaceholders(termsOfUse)) {
    add("terms-incomplete", "legal.termsReady is true but the terms are missing or still have [PENDING] placeholders.", true, {
      why: "Incomplete terms would be published.",
      where: "src/content/legal/index.ts → termsOfUse",
      owner: "Silvia + legal",
      resolve: "Complete and approve the text, or set termsReady back to false.",
    });
  }

  // ── Copy approval ─────────────────────────────────────────────────────────
  if (!site.copyApproved) {
    add(
      "copy",
      "site.copyApproved: Silvia has not approved the copy in EN and ES, including the inner pages in src/content/pages (and, for Medicare, compliance review).",
      true,
      {
        why: "Everything on the site speaks for a licensed agency; Medicare marketing copy is regulated by CMS.",
        where: `${SITE} → copyApproved (checklist: docs/launch/content-review.md)`,
        owner: "Silvia + compliance",
        resolve: "Silvia approves every page in EN and ES and the Medicare copy passes compliance review; then set copyApproved: true.",
      },
    );
  }

  return items;
}

export function isLaunchReady(site: SiteConfig): boolean {
  return getPendingItems(site).every((item) => !item.blocking);
}
