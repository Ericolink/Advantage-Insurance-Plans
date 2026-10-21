import type { MetadataRoute } from "next";
import { pageIds, pagePath } from "@/config/pages";
import { isIndexable } from "@/config/readiness";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { localeTags, locales } from "@/lib/i18n";
import { samePath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url || !isIndexable(site)) return [];
  const base = site.url;

  // Each entry lists its URL in every language (inner pages have translated slugs).
  const entries: { paths: Record<Locale, string>; priority: number }[] = [
    { paths: samePath(""), priority: 1 },
    ...pageIds.map((id) => ({
      paths: Object.fromEntries(locales.map((code) => [code, pagePath(id, code)])) as Record<Locale, string>,
      priority: 0.8,
    })),
    ...(site.legal.privacyPolicyReady ? [{ paths: samePath("/privacy"), priority: 0.2 }] : []),
    ...(site.legal.termsReady ? [{ paths: samePath("/terms"), priority: 0.2 }] : []),
  ];

  return entries.flatMap(({ paths, priority }) =>
    locales.map((locale) => ({
      url: `${base}${paths[locale]}`,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [localeTags[code], `${base}${paths[code]}`])),
      },
    })),
  );
}
