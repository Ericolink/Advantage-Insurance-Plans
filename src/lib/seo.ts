import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Image, Locale } from "@/config/types";
import { localeTags, locales } from "@/lib/i18n";

/**
 * Canonical URL plus hreflang links to the same page in every language (paths may differ per language).
 * Only output once the production domain is confirmed (site.url): without it Next.js would resolve the
 * links against a placeholder host such as localhost, so search engines would get wrong URLs.
 */
export function alternatesFor(paths: Record<Locale, string>, locale: Locale): Metadata["alternates"] {
  if (!site.url) return undefined;
  return {
    canonical: paths[locale],
    languages: { ...Object.fromEntries(locales.map((code) => [localeTags[code], paths[code]])), "x-default": paths.en },
  };
}

/** Open Graph URL and preview image, only with a confirmed domain (same reason as alternatesFor). */
export function openGraphUrls(path: string, image: Image | null): Pick<NonNullable<Metadata["openGraph"]>, "url" | "images"> {
  if (!site.url) return {};
  return {
    url: path,
    ...(image && { images: [{ url: image.src, width: image.width, height: image.height }] }),
  };
}

/** Same path in both languages, e.g. "/privacy" -> { en: "/en/privacy", es: "/es/privacy" }. */
export function samePath(suffix: string): Record<Locale, string> {
  return Object.fromEntries(locales.map((code) => [code, `/${code}${suffix}`])) as Record<Locale, string>;
}
