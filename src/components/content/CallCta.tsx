import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, type Dictionary } from "@/lib/i18n";
import { formatHoursSummary } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { CallButton } from "@/components/ui/CallButton";

/** "Questions? Talk with Silvia" box with the phone and hours, used at the end of inner pages. */
export function CallCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <aside aria-labelledby="call-cta-title" className="rounded-3xl bg-brand-deep px-6 py-8 text-white sm:p-10">
      <h2 id="call-cta-title" className="font-display text-[1.6rem] font-bold leading-tight text-balance sm:text-3xl">
        {fill(dict.pages.ctaTitle, siteVars)}
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">{dict.pages.ctaBody}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* While this box is on screen, the phone call bar steps aside. */}
        <CallButton dict={dict} variant="primary" className="w-full sm:w-auto sm:shrink-0" primary />
        {site.contact.tty && <span className="text-lg font-semibold">{dict.footer.tty}</span>}
      </div>
      {site.hours && site.hours.length > 0 && (
        <p className="mt-5 text-base text-white/90 sm:text-lg">{fill(dict.pages.hours, { hours: formatHoursSummary(site.hours, locale) })}</p>
      )}
    </aside>
  );
}
