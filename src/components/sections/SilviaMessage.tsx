import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { isMessagePublishable, silviaMessage } from "@/content/message";
import { fill, t } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { DraftTag } from "@/components/ui/DraftTag";
import { container, h2Class } from "@/components/ui/styles";

/**
 * Silvia's message, laid out as a signed letter. Continues the "Meet Silvia" section above (same background).
 * Until Silvia's approval is recorded (`approved` + `approvedOn`) it renders only in development, marked
 * as a draft: production builds return null, so the draft is never in the published HTML.
 */
export function SilviaMessage({ locale }: { locale: Locale }) {
  const { title, paragraphs } = silviaMessage;
  const publishable = isMessagePublishable();
  if (!publishable && process.env.NODE_ENV !== "development") return null;
  const portrait = site.portrait ?? site.photo;

  return (
    <section aria-labelledby="message-title" className="bg-sun-soft pb-16 sm:pb-20 lg:pb-24">
      <div className={container}>
        <article className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-surface px-6 py-10 shadow-sm ring-1 ring-line sm:px-12 sm:py-14 lg:px-16">
          {/* Orange rule along the top, as on the site's other highlighted blocks. */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
          {!publishable && <DraftTag className="relative mb-4">not approved by Silvia · hidden in production</DraftTag>}
          <span aria-hidden="true" className="pointer-events-none absolute top-1 right-5 font-display text-[6rem] leading-none text-brand select-none sm:top-2 sm:right-12 sm:text-[12rem]">
            &ldquo;
          </span>

          {/* Right padding keeps the title clear of the quote mark. */}
          <h2 id="message-title" className={`relative pr-12 sm:pr-28 lg:pr-24 ${h2Class}`}>
            {fill(t(title, locale), siteVars)}
          </h2>

          <div className="relative mt-8 space-y-5 text-base leading-relaxed text-ink sm:text-lg">
            {t(paragraphs, locale).map((paragraph) => (
              <p key={paragraph}>{fill(paragraph, siteVars)}</p>
            ))}
          </div>

          <footer className="mt-10 flex items-center gap-4 border-t border-line pt-8">
            {portrait && (
              // Decorative: the name is written right next to it.
              // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open
              <img
                src={portrait.src}
                width={portrait.width}
                height={portrait.height}
                alt=""
                loading="lazy"
                className="size-16 shrink-0 rounded-full object-cover object-top ring-4 ring-sun sm:size-20"
              />
            )}
            <p className="leading-tight">
              <span className="block font-display text-2xl font-bold text-brand-deep sm:text-3xl">{site.agentName}</span>
              <span className="mt-1 block text-base font-semibold text-accent-strong sm:text-lg">{site.businessName}</span>
            </p>
          </footer>
        </article>
      </div>
    </section>
  );
}
