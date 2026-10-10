import type { Localized } from "@/config/types";

export interface LegalDocument {
  /** ISO date, e.g. "2026-11-01". */
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
}

/**
 * Real legal text goes here, reviewed by Silvia (and ideally her agency's
 * compliance contact). Leave it `null` until then: the pages show a neutral
 * "being prepared" notice and are excluded from search engines.
 * After filling it in, set `legal.privacyPolicyReady` / `legal.termsReady` in site.ts.
 */
export const privacyPolicy: Localized<LegalDocument> | null = null;
export const termsOfUse: Localized<LegalDocument> | null = null;
