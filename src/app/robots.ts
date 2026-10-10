import type { MetadataRoute } from "next";
import { isLaunchReady } from "@/config/readiness";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Block crawlers until the domain is set and every blocking item is resolved.
  if (!site.url || !isLaunchReady(site)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
