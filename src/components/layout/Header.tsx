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
              <a href={`tel:${phone.e164}`} className="whitespace-nowrap font-bold underline-offset-4 transition-colors hover:text-sun hover:underline">
                {phone.display}
              </a>
            ) : (
              <span className="rounded bg-amber-300 px-2 font-semibold text-amber-950">{dict.nav.phonePending}</span>
            )}
          </p>
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
        </div>
      </div>

      {/* data-site-header: a soft shadow fades in once the page scrolls (globals.css). */}
      <header data-site-header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className={`${container} flex items-center justify-between gap-3 py-2.5 sm:py-3`}>
          <Link href={home} className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-3 focus-visible:outline-brand-deep">
            {site.logo && (
              // On phones the full logo (which includes the name) stands alone, a little larger so its text reads.
              // eslint-disable-next-line @next/next/no-img-element -- small static asset, no optimization needed
              <img src={site.logo.webp ?? site.logo.src} width={site.logo.width} height={site.logo.height} alt="" className="h-12 w-auto sm:h-10" />
            )}
            {/* The full name ("… by Silvia Alcazar") sets the office apart from agencies with similar names.
                On phones it is visually hidden next to the logo but stays the link's accessible name. */}
            <span className={`leading-tight ${site.logo ? "sr-only sm:not-sr-only" : ""}`}>
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
                    className="relative whitespace-nowrap rounded-lg px-2.5 py-2 text-base font-semibold text-ink transition-colors duration-200 after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:bg-accent-soft hover:text-accent-strong hover:after:scale-x-100 motion-reduce:after:transition-none"
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
                className="hidden min-h-12 items-center gap-2 whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-base font-semibold text-white transition-[background-color,box-shadow,scale] duration-200 hover:bg-accent-strong hover:shadow-[0_8px_18px_-10px_rgb(165_59_11/0.7)] motion-safe:active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-deep sm:inline-flex"
              >
                <Icon name="phone" className="size-5" />
                {/* Always the short label: the row is capped at the container width, and with the long one
                    ("Llame a la oficina") the Spanish menu ran over the business name. The number is in the top bar. */}
                {dict.nav.callShort}
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
