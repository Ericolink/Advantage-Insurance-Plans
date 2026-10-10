import Link from "next/link";
import { pagePath } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import type { Dictionary } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { container } from "@/components/ui/styles";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

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

      {/* Tablets and up: phone and language in a slim top bar. On phones both live in the menu
          and the call bar at the bottom, so the first screen goes to the content. */}
      <div className="hidden bg-brand-deep text-white sm:block">
        <div className={`${container} flex items-center justify-between gap-6 py-1`}>
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

      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className={`${container} flex items-center justify-between gap-3 py-2.5 sm:py-3`}>
          <Link href={home} className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-3 focus-visible:outline-brand-deep">
            {site.logo && (
              // Hidden on the narrowest phones, where the name needs the room more than the logo does.
              // eslint-disable-next-line @next/next/no-img-element -- small static asset, no optimization needed
              <img src={site.logo.src} width={site.logo.width} height={site.logo.height} alt="" className="h-7 w-auto max-[400px]:hidden sm:h-10" />
            )}
            {/* The full name ("… by Silvia Alcazar") sets the office apart from agencies with similar names. */}
            <span className="leading-tight">
              <span className="block font-display text-[1.05rem] font-bold text-brand-deep sm:text-lg lg:whitespace-nowrap">{site.businessName}</span>
              <span className="block text-sm font-semibold text-accent-strong sm:text-base">
                {site.brandName.replace(site.businessName, "").trim()}
              </span>
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

          <div className="flex shrink-0 items-center gap-2">
            {phone && (
              <a
                href={`tel:${phone.e164}`}
                className="hidden min-h-12 items-center gap-2 whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-base font-semibold text-white hover:bg-accent-strong focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep sm:inline-flex"
              >
                <Icon name="phone" className="size-5" />
                {/* Short label while the menu shares the row; the number is always in the top bar. */}
                <span className="2xl:hidden">{dict.nav.callShort}</span>
                <span className="hidden 2xl:inline">{dict.nav.call}</span>
              </a>
            )}
            <div className="xl:hidden">
              <MobileMenu
                locale={locale}
                links={links}
                phone={phone}
                labels={{ menu: dict.nav.menu, close: dict.nav.close, language: dict.nav.language }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
