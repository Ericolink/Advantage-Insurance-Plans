import Link from "next/link";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, t, type Dictionary } from "@/lib/i18n";
import { siteVars } from "@/lib/site-vars";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // The CMS disclaimer is shown only once both numbers are confirmed (launch is blocked until then).
  const { medicare, aca, medicareOrganizations: organizations, medicareProducts: products } = site.regulated;
  const socials = [
    { href: site.socials.facebook, label: "Facebook" },
    { href: site.socials.instagram, label: "Instagram" },
    { href: site.socials.linkedin, label: "LinkedIn" },
    { href: site.socials.google, label: "Google" },
  ].filter((social): social is { href: string; label: string } => Boolean(social.href));

  return (
    <footer className="border-t border-line bg-brand-deep text-white/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3 text-base">
          {site.logo && (
            // The logo has a white background, so it sits on a white card over the dark footer.
            <span className="inline-block rounded-xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- small static asset, no optimization needed */}
              <img src={site.logo.src} width={site.logo.width} height={site.logo.height} alt="" className="h-12 w-auto" />
            </span>
          )}
          <p className="font-display text-xl font-bold text-white">{site.businessName}</p>
          <p>{site.agentName}</p>
          {site.location.serviceArea && <p>{t(site.location.serviceArea, locale)}</p>}
          {site.licenses.length > 0 && (
            <ul className="space-y-1">
              {site.licenses.map((license) => (
                <li key={`${license.state}-${license.number}`}>
                  {fill(dict.footer.licensed, { state: license.state })} · {fill(dict.footer.license, { number: license.number })}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 text-base md:text-right">
          <ul className="space-y-1">
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-white hover:underline">
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-white hover:underline">
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-3 md:justify-end">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} rel="noopener noreferrer" target="_blank" className="hover:text-white hover:underline">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {(medicare || aca || site.services.includes("medicaid")) && (
        <div className="border-t border-white/15">
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-base leading-relaxed text-white/90 sm:px-6">
            {medicare && organizations !== null && products !== null && (
              <p>{fill(dict.footer.medicareDisclaimer, { organizations, products })}</p>
            )}
            {medicare && <p>{fill(dict.footer.governmentDisclaimer, siteVars)}</p>}
            {aca && <p>{fill(dict.footer.marketplaceDisclaimer, siteVars)}</p>}
            {site.services.includes("medicaid") && <p>{dict.footer.medicaidDisclaimer}</p>}
          </div>
        </div>
      )}

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/80 sm:px-6">
          © {new Date().getFullYear()} {site.businessName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
