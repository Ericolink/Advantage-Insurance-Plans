// Inner pages and their URL slug in each language. Kept free of path aliases and runtime
// imports so client components (the language switcher) can use it too.
import type { Locale } from "./types.ts";

export type PageId = "medicare" | "medicaid" | "dual" | "aca" | "firstVisit" | "faq" | "resources";

export const pageSlugs: Record<PageId, Record<Locale, string>> = {
  medicare: { en: "medicare", es: "medicare" },
  medicaid: { en: "medicaid", es: "medicaid" },
  dual: { en: "medicare-and-medicaid", es: "medicare-y-medicaid" },
  aca: { en: "aca-marketplace", es: "mercado-de-seguros" },
  firstVisit: { en: "first-appointment", es: "primera-cita" },
  faq: { en: "faq", es: "preguntas-frecuentes" },
  resources: { en: "resources", es: "recursos" },
};

export const pageIds = Object.keys(pageSlugs) as PageId[];

/** "/es/primera-cita" */
export function pagePath(id: PageId, locale: Locale): string {
  return `/${locale}/${pageSlugs[id][locale]}`;
}

export function pageFromSlug(slug: string, locale: Locale): PageId | null {
  return pageIds.find((id) => pageSlugs[id][locale] === slug) ?? null;
}

/** The same page in another language: "/es/primera-cita" -> "/en/first-appointment". Other paths keep their slug. */
export function translatePath(pathname: string, target: Locale): string {
  const match = pathname.match(/^\/(en|es)(\/[^/?#]*)?(.*)$/);
  if (!match) return `/${target}`;
  const [, from, segment = "", rest] = match;
  const id = segment ? pageFromSlug(segment.slice(1), from as Locale) : null;
  return `/${target}${id ? `/${pageSlugs[id][target]}` : segment}${rest}`;
}
