import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { Hero } from "@/components/sections/Hero";
import { HowWeHelp } from "@/components/sections/HowWeHelp";
import { Services } from "@/components/sections/Services";
import { Terms } from "@/components/sections/Terms";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd locale={lang} />
      <Hero locale={lang} dict={dict} />
      <Services locale={lang} dict={dict} />
      <HowWeHelp locale={lang} dict={dict} />
      <About locale={lang} dict={dict} />
      <FaqTeaser locale={lang} dict={dict} />
      <Terms dict={dict} />
      <Testimonials locale={lang} dict={dict} />
      <Contact locale={lang} dict={dict} />
    </>
  );
}
