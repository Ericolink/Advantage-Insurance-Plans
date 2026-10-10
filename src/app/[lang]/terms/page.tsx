import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { termsOfUse } from "@/content/legal";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { LegalPage } from "@/components/sections/LegalPage";

type Props = { params: Promise<{ lang: string }> };

const ready = site.legal.termsReady && termsOfUse !== null;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: getDictionary(lang).legal.termsTitle,
    alternates: { canonical: `/${lang}/terms` },
    ...(!ready && { robots: { index: false, follow: false } }),
  };
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return <LegalPage locale={lang} dict={dict} title={dict.legal.termsTitle} document={termsOfUse} ready={ready} />;
}
