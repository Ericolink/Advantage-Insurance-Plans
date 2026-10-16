import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageFromSlug, pageSlugs, pagePath, pageIds } from "@/config/pages";
import { site } from "@/config/site";
import { getPage } from "@/content/pages";
import { getDictionary, hasLocale, localeTags, locales } from "@/lib/i18n";
import { alternatesFor, openGraphUrls } from "@/lib/seo";
import { InfoPage } from "@/components/content/InfoPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Only the slugs listed in src/config/pages.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  return hasLocale(params.lang) ? pageIds.map((id) => ({ slug: pageSlugs[id][params.lang as "en" | "es"] })) : [];
}

function resolve(lang: string, slug: string) {
  if (!hasLocale(lang)) return null;
  const id = pageFromSlug(slug, lang);
  return id ? { locale: lang, id } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const match = resolve(lang, slug);
  if (!match) return {};
  const page = getPage(match.id, match.locale);
  const paths = Object.fromEntries(locales.map((code) => [code, pagePath(match.id, code)])) as Record<"en" | "es", string>;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: alternatesFor(paths, match.locale),
    openGraph: {
      type: "article",
      siteName: site.brandName,
      title: page.metaTitle,
      description: page.metaDescription,
      locale: localeTags[match.locale].replace("-", "_"),
      ...openGraphUrls(paths[match.locale], site.photo),
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  const match = resolve(lang, slug);
  if (!match) notFound();
  const dict = getDictionary(match.locale);
  const page = getPage(match.id, match.locale);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: dict.nav.home, path: `/${match.locale}` }, { name: page.label, path: pagePath(match.id, match.locale) }]} />
      <InfoPage locale={match.locale} dict={dict} page={page} />
    </>
  );
}
