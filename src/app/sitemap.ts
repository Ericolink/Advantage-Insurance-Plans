import type { MetadataRoute } from "next";
import { isLaunchReady } from "@/config/readiness";
import { site } from "@/config/site";
import { localeTags, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url || !isLaunchReady(site)) return [];
  const base = site.url;

  const paths = [
    { path: "", priority: 1 },
    ...(site.legal.privacyPolicyReady ? [{ path: "/privacy", priority: 0.2 }] : []),
    ...(site.legal.termsReady ? [{ path: "/terms", priority: 0.2 }] : []),
  ];

  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [localeTags[code], `${base}/${code}${path}`])),
      },
    })),
  );
}
