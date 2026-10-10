import Link from "next/link";
import { pagePath } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;
  const phone = site.contact.phone;
  const links = [
    { href: `${home}#services`, label: dict.nav.services },
    { href: pagePath("firstVisit", locale), label: dict.nav.firstVisit },
    { href: pagePath("faq", locale), label: dict.nav.faq },
    { href: `${home}#about`, label: dict.nav.about },
    { href: `${home}#contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3 focus:text-lg focus:font-semibold focus:shadow-lg"
      >
        {dict.nav.skip}
      </a>

      {/* Top bar: language choice and the phone, always easy to find. */}
      <div className="bg-brand-deep text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 sm:px-6">
          <p className="flex items-center gap-2 text-base">
            <Icon name="phone" className="size-5 shrink-0" />
            <span>{dict.hero.realPerson}:</span>
            {phone ? (
              <a href={`tel:${phone.e164}`} className="whitespace-nowrap font-bold underline-offset-4 hover:underline">
                {phone.display}
              </a>
            ) : (
              <span className="rounded bg-amber-300 px-2 font-semibold text-amber-950">{dict.nav.phonePending}</span>
            )}
          </p>
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-surface shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href={home} className="flex items-center gap-3 rounded-lg focus-visible:outline-3 focus-visible:outline-brand-deep">
            {site.logo ? (
              // On narrow phones the name needs the room more than the logo does.
              // eslint-disable-next-line @next/next/no-img-element -- small static asset, no optimization needed
              <img src={site.logo.src} width={site.logo.width} height={site.logo.height} alt="" className="h-8 w-auto max-[460px]:hidden sm:h-10" />
            ) : (
              <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
                <Icon name="shield" className="size-6" />
              </span>
            )}
            {/* The full name ("… by Silvia Alcazar") sets the office apart from agencies with similar names. */}
            <span className="leading-tight">
              <span className="block font-display text-base font-bold text-brand-deep sm:text-lg lg:whitespace-nowrap">{site.businessName}</span>
              <span className="block text-base font-semibold text-accent-strong">{site.brandName.replace(site.businessName, "").trim()}</span>
            </span>
          </Link>

          <nav aria-label={dict.nav.main} className="hidden xl:block">
            <ul className="flex items-center">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="whitespace-nowrap rounded-lg px-2.5 py-2 text-base font-semibold text-ink hover:bg-brand-soft hover:text-brand-deep"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {phone ? (
            <a
              href={`tel:${phone.e164}`}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-base font-semibold text-white hover:bg-accent-strong focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              <Icon name="phone" className="size-5" />
              {/* Short label on phones and while the desktop menu shares the row; the number is always in the top bar. */}
              <span className="sm:hidden xl:inline 2xl:hidden">{dict.nav.callShort}</span>
              <span className="hidden sm:inline xl:hidden 2xl:inline">{dict.nav.call}</span>
            </a>
          ) : (
            <a
              href={`${home}#contact`}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-base font-semibold text-white hover:bg-accent-strong focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
            >
              {dict.nav.getHelp}
            </a>
          )}
        </div>

      </header>

      {/* Small screens: the section links stay visible, wrapping instead of scrolling sideways. */}
      <nav aria-label={dict.nav.main} className="border-b border-line bg-surface xl:hidden">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-1 px-2 py-1 sm:px-4">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block whitespace-nowrap rounded-lg px-2 py-2 text-base font-semibold text-ink hover:bg-brand-soft sm:px-3">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
