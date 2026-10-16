import type { Localized } from "../../config/types.ts";

export interface LegalDocument {
  /** ISO date, e.g. "2026-11-01". */
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
}

/**
 * Real legal text goes here, reviewed by Silvia (and ideally her agency's
 * compliance contact or a lawyer). Leave it `null` until then: the pages show a neutral
 * "being prepared" notice and are excluded from search engines.
 *
 * Working drafts based on what the site actually does live in ./drafts.ts (shown only in
 * development). Once every [PENDING] / [PENDIENTE] item is resolved and the text is approved,
 * move it here and set `legal.privacyPolicyReady` / `legal.termsReady` in site.ts.
 * `npm run check:launch` blocks the launch if a published document still has placeholders.
 */
export const privacyPolicy: Localized<LegalDocument> | null = null;
export const termsOfUse: Localized<LegalDocument> | null = null;

/** Markers used in drafts for facts that still need confirmation. */
const PLACEHOLDER = /\[(PENDING|PENDIENTE)\b/;

/** True if any heading or paragraph, in either language, still has a [PENDING] / [PENDIENTE] marker. */
export function hasPlaceholders(document: Localized<LegalDocument>): boolean {
  return Object.values(document).some((version) =>
    version.sections.some((section) => PLACEHOLDER.test(section.heading) || section.paragraphs.some((paragraph) => PLACEHOLDER.test(paragraph))),
  );
}
