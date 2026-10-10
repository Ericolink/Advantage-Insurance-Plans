import Link from "next/link";
import { pagePath, type PageId } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { getPage } from "@/content/pages";
import { fill, t, type Dictionary } from "@/lib/i18n";
import { formatDays, formatHours } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";

const programPages: PageId[] = ["medicare", "medicaid", "dual", "aca"];
const helpPages: PageId[] = ["firstVisit", "faq", "resources"];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // The CMS disclaimer is shown only once both numbers are confirmed (launch is blocked until then).
  const { medicare, aca, medicareOrganizations: organizations, medicareProducts: products } = site.regulated;
  const { contact, location } = site;
  const socials = [
    { href: site.socials.facebook, label: "Facebook" },
    { href: site.socials.instagram, label: "Instagram" },
    { href: site.socials.linkedin, label: "LinkedIn" },
    { href: site.socials.google, label: "Google" },
  ].filter((social): social is { href: string; label: string } => Boolean(social.href));
  const linkClass = "inline-flex min-h-11 items-center hover:text-white hover:underline";

  return (
    <footer className="border-t border-line bg-brand-deep text-white/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-base sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          {site.logo && (
            // The logo has a white background, so it sits on a white card over the dark footer.
            <span className="inline-block rounded-xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- small static asset, no optimization needed */}
              <img src={site.logo.src} width={site.logo.width} height={site.logo.height} alt="" className="h-12 w-auto" />
            </span>
          )}
          <p className="font-display text-xl font-bold text-white">{site.brandName}</p>
          {site.licenses.length > 0 && (
            <ul className="space-y-1">
              {site.licenses.map((license) => (
                <li key={`${license.state}-${license.number}`}>
                  {fill(dict.footer.licensed, { state: license.state })} · {fill(dict.footer.license, { number: license.number })}
                </li>
              ))}
            </ul>
          )}
          {site.npn && <p>{fill(dict.footer.npn, { number: site.npn })}</p>}
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">{dict.footer.contactTitle}</h2>
          <ul className="mt-3 space-y-2">
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.e164}`} className="text-xl font-bold text-white underline-offset-4 hover:underline">
                  {contact.phone.display}
                </a>
                {contact.tty && <span className="block">{dict.footer.tty}</span>}
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="break-all hover:text-white hover:underline">
                  {contact.email}
                </a>
              </li>
            )}
            {location.showAddress && location.streetAddress && (
              <li>
                <address className="not-italic">
                  {location.streetAddress}
                  <br />
                  {location.city}, {location.stateCode} {location.postalCode}
                </address>
              </li>
            )}
            {!location.showAddress && location.serviceArea && <li>{t(location.serviceArea, locale)}</li>}
            {site.hours?.map((row) => (
              <li key={row.days.join()}>
                {formatDays(row.days, locale)}: {formatHours(row, locale)}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-programs">
          <h2 id="footer-programs" className="text-lg font-bold text-white">
            {dict.footer.programsTitle}
          </h2>
          <ul className="mt-2">
            {programPages.map((id) => (
              <li key={id}>
                <Link href={pagePath(id, locale)} className={linkClass}>
                  {getPage(id, locale).label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-info">
          <h2 id="footer-info" className="text-lg font-bold text-white">
            {dict.footer.infoTitle}
          </h2>
          <ul className="mt-2">
            {helpPages.map((id) => (
              <li key={id}>
                <Link href={pagePath(id, locale)} className={linkClass}>
                  {getPage(id, locale).label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/privacy`} className={linkClass}>
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className={linkClass}>
                {dict.footer.terms}
              </Link>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} rel="noopener noreferrer" target="_blank" className={linkClass}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-base leading-relaxed text-white/90 sm:px-6">
          {medicare && organizations !== null && products !== null && (
            <p className="font-semibold text-white">{fill(dict.footer.medicareDisclaimer, { organizations, products })}</p>
          )}
          {medicare && <p>{fill(dict.footer.governmentDisclaimer, siteVars)}</p>}
          {aca && <p>{fill(dict.footer.marketplaceDisclaimer, siteVars)}</p>}
          {site.services.includes("medicaid") && <p>{dict.footer.medicaidDisclaimer}</p>}
          <p>{dict.footer.educational}</p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-base text-white/80 sm:px-6">
          © {new Date().getFullYear()} {site.brandName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
