import type { Metadata } from "next";
import type { Locale } from "@/config/types";
import { localeTags, locales } from "@/lib/i18n";

/** Canonical URL plus hreflang links to the same page in every language (paths may differ per language). */
export function alternatesFor(paths: Record<Locale, string>, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: paths[locale],
    languages: { ...Object.fromEntries(locales.map((code) => [localeTags[code], paths[code]])), "x-default": paths.en },
  };
}

/** Same path in both languages, e.g. "/privacy" -> { en: "/en/privacy", es: "/es/privacy" }. */
export function samePath(suffix: string): Record<Locale, string> {
  return Object.fromEntries(locales.map((code) => [code, `/${code}${suffix}`])) as Record<Locale, string>;
}
