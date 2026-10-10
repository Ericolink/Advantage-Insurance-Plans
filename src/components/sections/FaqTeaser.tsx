import Link from "next/link";
import { pagePath } from "@/config/pages";
import type { Locale } from "@/config/types";
import { getFaqItems } from "@/content/pages";
import type { Dictionary } from "@/lib/i18n";
import { FaqList } from "@/components/content/FaqList";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

// A few of the most common questions; the full list lives on the FAQ page.
const featured = ["what-is-medicare", "original-vs-advantage", "both", "turning-65", "bring", "family-member"];

export function FaqTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="questions" aria-labelledby="faq-teaser-title" className="scroll-mt-32 bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <h2 id="faq-teaser-title" className="font-display text-3xl font-bold text-brand-deep sm:text-4xl">
          {dict.faqTeaser.title}
        </h2>
        <p className="mt-3 text-xl text-ink">{dict.faqTeaser.intro}</p>
        <div className="mt-8">
          <FaqList items={getFaqItems(locale, featured)} />
        </div>
        <Link href={pagePath("faq", locale)} className={buttonClass("secondary", "mt-8")}>
          {dict.faqTeaser.cta}
          <Icon name="arrowRight" className="size-5" />
        </Link>
      </div>
    </section>
  );
}
