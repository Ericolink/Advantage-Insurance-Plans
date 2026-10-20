import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, localeNames, t, type Dictionary } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { container, h2Class, sectionSpace } from "@/components/ui/styles";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const portrait = site.portrait ?? site.photo;
  // Silvia's own words are published only once her approval date is recorded.
  const approved = Boolean(site.about.approvedOn);
  const intro = approved ? site.about.intro : null;
  const story = approved ? site.about.story : null;

  return (
    <section id="about" aria-labelledby="about-title" className={`scroll-mt-24 bg-sun-soft ${sectionSpace}`}>
      <div className={`${container} grid items-start gap-8 md:grid-cols-[1fr_2fr] md:gap-12`}>
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open
          <img
            data-reveal="left"
            src={portrait.webp ?? portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={fill(dict.about.photoAlt, siteVars)}
            loading="lazy"
            className="aspect-square w-36 rounded-full object-cover object-top shadow-md ring-6 ring-surface sm:w-48 md:mx-auto md:w-full md:max-w-xs md:ring-8"
          />
        )}

        <div data-reveal="right">
          <h2 id="about-title" className={h2Class}>
            {fill(dict.about.title, siteVars)}
          </h2>
          <p className="mt-2 text-lg font-semibold text-accent-strong sm:text-xl">{fill(dict.about.role, siteVars)}</p>
          <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-ink sm:text-lg">
            <p>{intro ? t(intro, locale) : fill(dict.about.fallback, siteVars)}</p>
            {story && <p>{t(story, locale)}</p>}
            <p>{dict.about.howWeHelp}</p>
            {site.languages && (
              <p className="flex items-center gap-2 font-semibold text-brand-deep">
                <Icon name="globe" className="size-6 shrink-0" />
                {fill(dict.about.languages, { languages: site.languages.map((code) => localeNames[code]).join(" · ") })}
              </p>
            )}
          </div>

          {/* Phones already have the call bar at the bottom. */}
          <div className="mt-8 hidden sm:block">
            <CallButton dict={dict} variant="brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
