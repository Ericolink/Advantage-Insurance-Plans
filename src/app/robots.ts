import type { MetadataRoute } from "next";
import { isIndexable } from "@/config/readiness";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Block crawlers only until the production domain is set (absolute URLs depend on it).
  if (!site.url || !isIndexable(site)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
