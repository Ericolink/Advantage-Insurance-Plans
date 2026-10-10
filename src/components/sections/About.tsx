import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, t, type Dictionary } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { CallButton } from "@/components/ui/CallButton";
import { HelpButton } from "@/components/ui/HelpButton";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const portrait = site.portrait ?? site.photo;
  const showCarriers = site.carriers.confirmed && site.carriers.names.length > 0;

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-32 bg-brand-soft">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_2fr] md:py-20">
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open
          <img
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={fill(dict.about.photoAlt, siteVars)}
            loading="lazy"
            className="mx-auto aspect-square w-full max-w-xs rounded-full object-cover object-top shadow-lg ring-8 ring-surface"
          />
        )}

        <div>
          <h2 id="about-title" className="font-display text-3xl font-bold text-brand-deep sm:text-4xl">
            {fill(dict.about.title, siteVars)}
          </h2>
          <p className="mt-2 text-xl font-semibold text-accent-strong">{fill(dict.about.role, siteVars)}</p>
          <div className="mt-5 space-y-4 text-xl leading-relaxed text-ink">
            <p>{site.about.intro ? t(site.about.intro, locale) : fill(dict.about.fallback, siteVars)}</p>
            {site.about.story && <p>{t(site.about.story, locale)}</p>}
            <p>{dict.about.howWeHelp}</p>
          </div>

          {showCarriers && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-brand-deep">{dict.about.carriersTitle}</h3>
              {/* Names only: carrier logos need written permission. */}
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.carriers.names.map((name) => (
                  <li key={name} className="rounded-full bg-surface px-4 py-2 text-lg font-semibold text-ink ring-1 ring-line">
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-base text-ink-soft">{dict.about.carriersNote}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <HelpButton>{dict.about.cta}</HelpButton>
            <CallButton dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
