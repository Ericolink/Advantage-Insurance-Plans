import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, t, type Dictionary } from "@/lib/i18n";
import { formatHoursSummary } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { container, h1Class, textLinkClass } from "@/components/ui/styles";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const otherLocale: Locale = locale === "en" ? "es" : "en";
  const servesOtherLanguage = site.languages?.includes(otherLocale) ?? false;
  const office =
    site.location.showAddress && site.location.city && site.location.stateCode
      ? fill(dict.hero.office, { city: site.location.city, state: site.location.stateCode })
      : site.location.serviceArea
        ? t(site.location.serviceArea, locale)
        : null;
  const portrait = site.portrait ?? site.photo;

  return (
    <section aria-labelledby="hero-title" className="bg-brand-soft">
      <div className={`${container} grid items-center gap-12 pb-12 pt-8 sm:pb-16 sm:pt-14 lg:grid-cols-[3fr_2fr]`}>
        <div>
          {/* Phones: a small, personal introduction instead of the large photo. */}
          <div className="mb-6 flex items-center gap-4 lg:hidden">
            {portrait && (
              // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open
              <img
                src={portrait.src}
                width={portrait.width}
                height={portrait.height}
                alt=""
                className="size-16 shrink-0 rounded-full object-cover object-top ring-4 ring-surface"
              />
            )}
            <p className="leading-snug">
              <span className="block text-lg font-bold text-brand-deep">{site.agentName}</span>
              {office && <span className="block text-base text-ink">{office}</span>}
              {servesOtherLanguage && (
                <span lang={otherLocale} className="block text-base font-semibold text-brand-deep">
                  {dict.hero.otherLanguage}
                </span>
              )}
            </p>
          </div>

          <h1 id="hero-title" className={h1Class}>
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink text-pretty sm:text-xl">{fill(dict.hero.subtitle, siteVars)}</p>

          {/* One main action (call); the secondary one is a plain link to the services. */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <CallButton dict={dict} label={dict.hero.ctaCall} variant="primary" className="w-full sm:w-auto sm:shrink-0" primary />
            <a href="#services" className={textLinkClass}>
              {dict.hero.ctaHelp}
              <Icon name="arrowRight" className="size-5 rotate-90" />
            </a>
          </div>

          {site.hours && site.hours.length > 0 && (
            <p className="mt-6 flex items-start gap-2 text-base text-ink sm:text-lg">
              <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-brand" />
              {fill(dict.hero.open, { hours: formatHoursSummary(site.hours, locale) })}
            </p>
          )}

          <ul className="mt-6 hidden flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-brand-deep lg:flex">
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
            {office && (
              <li className="inline-flex items-center gap-2">
                <Icon name="mapPin" className="size-5" />
                {office}
              </li>
            )}
          </ul>
        </div>

        {site.photo && (
          <picture className="mx-auto hidden w-full max-w-sm lg:block">
            {site.photo.webp && <source srcSet={site.photo.webp} type="image/webp" />}
            <img
              src={site.photo.src}
              width={site.photo.width}
              height={site.photo.height}
              alt={fill(dict.hero.photoAlt, siteVars)}
              className="aspect-[4/5] w-full rounded-3xl object-cover object-[50%_30%] shadow-xl"
              loading="lazy"
            />
          </picture>
        )}
      </div>
      {/* Coral swoosh echoing Silvia's flyers and the logo's red wave. */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-8 w-full sm:h-16">
        <path d="M0 46 C 360 6, 720 86, 1080 38 S 1440 26 1440 26 V80 H0 Z" fill="var(--color-surface)" />
        <path d="M0 46 C 360 6, 720 86, 1080 38 S 1440 26 1440 26" fill="none" stroke="var(--color-coral)" strokeWidth="7" />
        <path d="M0 60 C 360 20, 720 100, 1080 52 S 1440 40 1440 40" fill="none" stroke="var(--color-brand)" strokeWidth="3" />
      </svg>
    </section>
  );
}
