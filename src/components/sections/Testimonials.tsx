import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { t, type Dictionary } from "@/lib/i18n";

/** Renders nothing until real, authorized testimonials are added to site.ts. */
export function Testimonials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  if (site.testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="bg-sun-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 id="testimonials-title" data-reveal className="font-display text-3xl font-bold text-brand-deep">
          {dict.testimonials.title}
        </h2>
        <ul data-reveal-group className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.testimonials.map((item) => (
            <li key={item.name} className="rounded-2xl border-t-4 border-accent bg-surface p-6 shadow-sm ring-1 ring-line">
              <figure>
                <blockquote className="text-ink-soft">“{t(item.quote, locale)}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink">
                  {item.name}
                  {item.detail && <span className="font-normal text-ink-soft"> · {t(item.detail, locale)}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
