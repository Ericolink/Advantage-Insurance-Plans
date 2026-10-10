import Link from "next/link";
import { pagePath } from "@/config/pages";
import type { Locale } from "@/config/types";
import { getFaqItems } from "@/content/pages";
import type { Dictionary } from "@/lib/i18n";
import { FaqList } from "@/components/content/FaqList";
import { Icon } from "@/components/ui/Icon";
import { container, h2Class, leadClass, sectionSpace, textLinkClass } from "@/components/ui/styles";

// A few of the most common questions; the full list lives on the FAQ page.
const featured = ["what-is-medicare", "original-vs-advantage", "both", "turning-65", "bring", "family-member"];

export function FaqTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="questions" aria-labelledby="faq-teaser-title" className={`scroll-mt-24 bg-surface ${sectionSpace}`}>
      <div className={container}>
        <div className="max-w-3xl">
          <h2 id="faq-teaser-title" className={h2Class}>
            {dict.faqTeaser.title}
          </h2>
          <p className={`mt-4 ${leadClass}`}>{dict.faqTeaser.intro}</p>
          <div className="mt-8">
            <FaqList items={getFaqItems(locale, featured)} />
          </div>
          <Link href={pagePath("faq", locale)} className={`mt-6 ${textLinkClass}`}>
            {dict.faqTeaser.cta}
            <Icon name="arrowRight" className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
