import Link from "next/link";
import type { ReactNode } from "react";
import { pagePath } from "@/config/pages";
import { site } from "@/config/site";
import type { Locale, Office } from "@/config/types";
import { fill, localeNames, t, type Dictionary } from "@/lib/i18n";
import { closedDays, formatDays, formatHours } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { DraftTag } from "@/components/ui/DraftTag";
import { Icon } from "@/components/ui/Icon";
import { container, h2Class, leadClass, sectionSpace, textLinkClass } from "@/components/ui/styles";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contact, location, hours, responseTime } = site;
  const subtitle = responseTime
    ? fill(dict.contact.subtitleWithTime, { ...siteVars, time: t(responseTime, locale) })
    : fill(dict.contact.subtitle, siteVars);
  const showAddress = location.showAddress && location.streetAddress && location.city && location.stateCode;
  const mainOffice: Office = { label: null, ...location, phone: null };
  // Pending offices are placeholders for development only; production shows confirmed addresses.
  const isDev = process.env.NODE_ENV === "development";
  const otherOffices = site.otherOffices
    .map((office, index) => ({ office, number: index + 2 }))
    .filter(({ office }) => isComplete(office) || isDev);
  const closed = hours ? closedDays(hours) : [];
  // Only the office's own photo is published. A Street View capture is a development placeholder, so it is
  // never presented as the agency's own picture of its premises.
  const photo = site.officePhoto && (site.officePhoto.source === "own" || isDev) ? site.officePhoto : null;
  const officePhoto = photo && (
    <figure>
      {photo.source !== "own" && <DraftTag className="mb-2">Street View placeholder · hidden in production</DraftTag>}
      {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
      <img
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={fill(dict.contact.officeAlt, { ...siteVars, business: site.brandName })}
        loading="lazy"
        className="aspect-[3/2] w-full rounded-2xl object-cover shadow-sm ring-1 ring-line"
      />
      {photo.credit && <figcaption className="mt-1 text-right text-sm text-ink-soft">{photo.credit}</figcaption>}
    </figure>
  );

  // Calling is the easiest option for many visitors, so it comes first. The number itself is the tap target.
  const callCard = (
    <div className="rounded-2xl bg-surface p-6 shadow-sm sm:p-8">
      <p className="text-xl font-bold text-brand-deep sm:text-2xl">{dict.contact.callTitle}</p>
      {contact.phone && (
        <a
          href={`tel:${contact.phone.e164}`}
          data-primary-call=""
          className="mt-2 inline-flex min-h-12 items-center gap-3 text-3xl font-bold text-accent-strong underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
        >
          <Icon name="phone" className="size-7 shrink-0" />
          {contact.phone.display}
        </a>
      )}
      {contact.tty && <p className="mt-1 text-lg font-semibold text-ink">{dict.footer.tty}</p>}
      <div className="mt-5 hidden sm:block">
        <CallButton dict={dict} showNumber={false} variant="brand" className="w-full" />
      </div>
    </div>
  );
  const details = (
    <>
      <dl className="divide-y divide-line">
        {contact.email && (
          <InfoRow icon="mail" label={dict.contact.email}>
            <a href={`mailto:${contact.email}`} className="break-all font-semibold text-brand hover:underline">
              {contact.email}
            </a>
          </InfoRow>
        )}
        {hours && hours.length > 0 && (
          <InfoRow icon="clock" label={dict.contact.hours}>
            <ul>
              {hours.map((row) => (
                <li key={row.days.join()}>
                  {formatDays(row.days, locale)}: {formatHours(row, locale)}
                </li>
              ))}
              {closed.length > 0 && (
                <li>
                  {formatDays(closed, locale)}: {dict.contact.closed}
                </li>
              )}
            </ul>
          </InfoRow>
        )}
        {site.languages && (
          <InfoRow icon="globe" label={dict.contact.languages}>
            {site.languages.map((code) => localeNames[code]).join(" · ")}
          </InfoRow>
        )}
        {!showAddress && location.serviceArea && (
          <InfoRow icon="mapPin" label={dict.contact.area}>
            {t(location.serviceArea, locale)}
          </InfoRow>
        )}
      </dl>

      <Link href={pagePath("firstVisit", locale)} className={textLinkClass}>
        {dict.contact.prepare}
        <Icon name="arrowRight" className="size-5 shrink-0" />
      </Link>
    </>
  );
  const booking = site.bookingUrl && (
    <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
      <Icon name="calendar" className="size-5" />
      {dict.contact.book}
    </ButtonLink>
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className={`scroll-mt-24 bg-accent-soft ${sectionSpace}`}>
      <div className={container}>
        {/* Only the heading moves: the phone, hours and addresses below are there to be read at once. */}
        <div data-reveal>
          <h2 id="contact-title" className={h2Class}>
            {dict.contact.title}
          </h2>
          <p className={`mt-4 ${leadClass}`}>{subtitle}</p>
        </div>

        {/* Form on: contact details beside it. Form off: the photo beside them, or, without a photo,
            the call card and the details side by side so no column is left empty. */}
        <div className={`mt-10 grid items-start gap-10 lg:gap-12 ${site.leadForm ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-2"}`}>
          {site.leadForm || officePhoto ? (
            <div className="space-y-8">
              {callCard}
              {details}
              {site.leadForm && officePhoto}
              {booking}
            </div>
          ) : (
            <>
              {callCard}
              <div className="space-y-8">
                {details}
                {booking}
              </div>
            </>
          )}

          {site.leadForm ? (
            <LeadForm
              locale={locale}
              text={dict.form}
              consentText={fill(dict.form.consent, siteVars)}
              smsConsentText={fill(dict.form.smsConsent, siteVars)}
              successTemplate={fill(dict.form.success, siteVars)}
              helpOptions={[
                ...site.services.map((id) => ({ id, label: dict.form.helpOptions[id] })),
                { id: "other" as const, label: dict.form.helpOptions.other },
              ]}
              languages={(site.languages ?? []).map((code) => ({ code, label: localeNames[code] }))}
              acceptsTexts={site.contact.acceptsTexts && Boolean(site.contact.phone)}
              privacyHref={site.legal.privacyPolicyReady ? `/${locale}/privacy` : null}
              fallback={{ phone: contact.phone, email: contact.email }}
            />
          ) : (
            officePhoto
          )}
        </div>

        {(showAddress || otherOffices.length > 0) && (
          <div className="mt-12">
            <h3 className="font-display text-2xl font-bold text-brand-deep">{dict.contact.officesTitle}</h3>
            {/* Two by two when the count is even, so no office card sits alone on its row. */}
            <ul className={`mt-5 grid gap-5 ${((showAddress ? 1 : 0) + otherOffices.length) % 2 === 0 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {showAddress && (
                <OfficeCard office={mainOffice} title={dict.contact.mainOffice} locale={locale} dict={dict} />
              )}
              {otherOffices.map(({ office, number }) => (
                <OfficeCard
                  key={number}
                  office={office}
                  title={office.label ? t(office.label, locale) : fill(dict.contact.office, { number })}
                  locale={locale}
                  dict={dict}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function isComplete(office: Office): boolean {
  return Boolean(office.streetAddress && office.city && office.stateCode);
}

// The embed URL carries its own language (Spanish here); switch it to match the page.
function localizedMapUrl(url: string, locale: Locale): string {
  return locale === "en" ? url.replace(/!1ses-419!2s[a-z]{2}/g, "!1sen!2sus") : url;
}

function OfficeCard({ office, title, locale, dict }: { office: Office; title: string; locale: Locale; dict: Dictionary }) {
  if (!isComplete(office)) {
    return (
      <li className="rounded-2xl border-2 border-dashed border-amber-500 bg-amber-50 p-6 text-amber-950">
        <p className="text-xl font-bold">{title}</p>
        <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
          <Icon name="mapPin" className="size-5" />
          {dict.contact.officePending}
        </p>
      </li>
    );
  }
  const address = `${office.streetAddress}, ${office.city}, ${office.stateCode} ${office.postalCode ?? ""}`.trim();
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.businessName}, ${address}`)}`;
  return (
    <li className="flex flex-col rounded-2xl bg-surface p-6 shadow-sm">
      <p className="flex items-center gap-2 text-xl font-bold text-brand-deep">
        <Icon name="mapPin" className="size-6 text-brand" />
        {title}
      </p>
      <address className="mt-3 flex-1 text-lg not-italic text-ink">
        {office.streetAddress}
        <br />
        {office.city}, {office.stateCode} {office.postalCode}
      </address>
      {office.phone && (
        <a href={`tel:${office.phone.e164}`} className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-brand hover:underline">
          <Icon name="phone" className="size-5" />
          {office.phone.display}
        </a>
      )}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-1 text-lg font-semibold text-brand underline underline-offset-4"
      >
        {dict.contact.directions}
        <Icon name="arrowRight" className="size-4" />
      </a>
      {office.mapEmbedUrl && (
        <iframe
          src={localizedMapUrl(office.mapEmbedUrl, locale)}
          title={fill(dict.contact.mapTitle, { business: title })}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mt-4 h-56 w-full rounded-xl border-0 ring-1 ring-line"
        />
      )}
    </li>
  );
}

function InfoRow({ icon, label, children }: { icon: "mail" | "clock" | "mapPin" | "globe"; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-4 first:pt-0">
      <Icon name={icon} className="mt-1 size-6 shrink-0 text-brand" />
      <div className="text-base sm:text-lg">
        <dt className="font-semibold text-brand-deep">{label}</dt>
        <dd className="mt-0.5 text-ink">{children}</dd>
      </div>
    </div>
  );
}
