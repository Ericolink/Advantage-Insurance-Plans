import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { fill, type Dictionary } from "@/lib/i18n";
import { formatHoursSummary } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { CallButton } from "@/components/ui/CallButton";

/** "Questions? Talk with Silvia" box with the phone and hours, used at the end of inner pages. */
export function CallCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <aside aria-labelledby="call-cta-title" className="rounded-3xl bg-brand-deep p-6 text-white sm:p-10">
      <h2 id="call-cta-title" className="font-display text-3xl font-bold">
        {fill(dict.pages.ctaTitle, siteVars)}
      </h2>
      <p className="mt-3 max-w-2xl text-xl text-white/90">{dict.pages.ctaBody}</p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CallButton dict={dict} variant="primary" />
        {site.contact.tty && <span className="text-lg font-semibold">{dict.footer.tty}</span>}
      </div>
      {site.hours && site.hours.length > 0 && (
        <p className="mt-4 text-lg text-white/90">{fill(dict.pages.hours, { hours: formatHoursSummary(site.hours, locale) })}</p>
      )}
    </aside>
  );
}
