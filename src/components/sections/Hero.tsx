import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, t, type Dictionary } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { CallButton } from "@/components/ui/CallButton";
import { HelpButton } from "@/components/ui/HelpButton";
import { Icon } from "@/components/ui/Icon";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const otherLocale: Locale = locale === "en" ? "es" : "en";
  const servesOtherLanguage = site.languages?.includes(otherLocale) ?? false;

  return (
    <section aria-labelledby="hero-title" className="bg-brand-soft">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-6">
          <h1 id="hero-title" className="font-display text-4xl font-bold leading-tight text-brand-deep text-balance sm:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-ink text-pretty">{dict.hero.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <HelpButton variant="primary">
              {dict.hero.ctaHelp}
              <Icon name="arrowRight" className="size-5" />
            </HelpButton>
            <CallButton dict={dict} label={dict.hero.ctaCall} />
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-brand-deep">
            <li className="inline-flex items-center gap-2">
              <Icon name="message" className="size-5" />
              {dict.hero.realPerson}
            </li>
            {servesOtherLanguage && (
              <li lang={otherLocale} className="inline-flex items-center gap-2">
                <Icon name="globe" className="size-5" />
                {dict.hero.otherLanguage}
              </li>
            )}
            {site.location.showAddress && site.location.city && site.location.stateCode && (
              <li className="inline-flex items-center gap-2">
                <Icon name="mapPin" className="size-5" />
                {fill(dict.hero.office, { city: site.location.city, state: site.location.stateCode })}
              </li>
            )}
            {site.location.serviceArea && (
              <li className="inline-flex items-center gap-2">
                <Icon name="mapPin" className="size-5" />
                {t(site.location.serviceArea, locale)}
              </li>
            )}
          </ul>
        </div>

        {site.photo && (
          // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open
          <img
            src={site.photo.src}
            width={site.photo.width}
            height={site.photo.height}
            alt={fill(dict.hero.photoAlt, siteVars)}
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl object-cover object-[50%_30%] shadow-xl"
            fetchPriority="high"
          />
        )}
      </div>
      {/* Coral swoosh echoing Silvia's flyers and the logo's red wave. */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full sm:h-16">
        <path d="M0 46 C 360 6, 720 86, 1080 38 S 1440 26 1440 26 V80 H0 Z" fill="var(--color-surface)" />
        <path d="M0 46 C 360 6, 720 86, 1080 38 S 1440 26 1440 26" fill="none" stroke="var(--color-coral)" strokeWidth="7" />
        <path d="M0 60 C 360 20, 720 100, 1080 52 S 1440 40 1440 40" fill="none" stroke="var(--color-brand)" strokeWidth="3" />
      </svg>
    </section>
  );
}
