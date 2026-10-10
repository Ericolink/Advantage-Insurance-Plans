import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { isLaunchReady } from "@/config/readiness";
import { site } from "@/config/site";
import { fill, getDictionary, hasLocale, localeTags, locales } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { DraftBanner } from "@/components/layout/DraftBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "../globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Fraunces({ subsets: ["latin"], variable: "--font-heading", display: "swap", weight: ["600", "700"] });

type LayoutProps = { children: ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#223c86" };

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const title = fill(dict.meta.title, siteVars);
  const description = fill(dict.meta.description, siteVars);
  const indexable = Boolean(site.url) && isLaunchReady(site);

  return {
    ...(site.url && { metadataBase: new URL(site.url) }),
    title: { default: title, template: `%s | ${site.businessName}` },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((code) => [localeTags[code], `/${code}`])), "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: site.businessName,
      title,
      description,
      locale: localeTags[lang].replace("-", "_"),
      url: `/${lang}`,
      ...(site.photo && { images: [{ url: site.photo.src, width: site.photo.width, height: site.photo.height }] }),
    },
    // Keep search engines out until the real data is in place.
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={localeTags[lang]} className={`${body.variable} ${heading.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <DraftBanner dict={dict} />
        <Header locale={lang} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
      </body>
    </html>
  );
}
