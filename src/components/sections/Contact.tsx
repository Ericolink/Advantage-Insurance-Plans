import type { ReactNode } from "react";
import { site } from "@/config/site";
import type { Locale, Office } from "@/config/types";
import { fill, localeNames, t, type Dictionary } from "@/lib/i18n";
import { closedDays, formatDays, formatHours } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";

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
  // The embed URL carries its own language (Spanish here); switch it to match the page.
  const mapUrl =
    location.mapEmbedUrl && locale === "en"
      ? location.mapEmbedUrl.replaceAll("!1ses-419!2smx", "!1sen!2sus")
      : location.mapEmbedUrl;
  const closed = hours ? closedDays(hours) : [];
  const officePhoto = site.officePhoto && (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
      <img
        src={site.officePhoto.src}
        width={site.officePhoto.width}
        height={site.officePhoto.height}
        alt={fill(dict.contact.officeAlt, siteVars)}
        loading="lazy"
        className="aspect-[3/2] w-full rounded-2xl object-cover shadow-sm ring-1 ring-line"
      />
      {site.officePhoto.credit && (
        <figcaption className="mt-1 text-right text-sm text-ink-soft">{site.officePhoto.credit}</figcaption>
      )}
    </figure>
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-32 bg-brand-soft">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2 id="contact-title" className="font-display text-3xl font-bold text-brand-deep sm:text-4xl">
          {dict.contact.title}
        </h2>
        <p className="mt-3 text-xl text-ink">{subtitle}</p>

        <div className={`mt-10 grid items-start gap-10 ${site.leadForm ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-2"}`}>
          <div className="space-y-8">
            {/* Calling is the easiest option for many visitors, so it comes first. */}
            <div className="rounded-2xl bg-surface p-6 ring-2 ring-brand sm:p-8">
              <p className="text-2xl font-bold text-brand-deep">{dict.contact.callTitle}</p>
              {contact.phone && (
                <a href={`tel:${contact.phone.e164}`} className="mt-3 block text-3xl font-bold text-accent-strong hover:underline">
                  {contact.phone.display}
                </a>
              )}
              <CallButton dict={dict} showNumber={false} variant="brand" className="mt-5 w-full" />
            </div>

            <dl className="space-y-5">
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
              {!showAddress && location.serviceArea && (
                <InfoRow icon="mapPin" label={dict.contact.area}>
                  {t(location.serviceArea, locale)}
                </InfoRow>
              )}
            </dl>

            {site.leadForm && officePhoto}

            {site.bookingUrl && (
              <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                <Icon name="calendar" className="size-5" />
                {dict.contact.book}
              </ButtonLink>
            )}
          </div>

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
            <ul className="mt-5 grid gap-5 md:grid-cols-3">
              {showAddress && (
                <OfficeCard office={mainOffice} title={dict.contact.mainOffice} dict={dict} />
              )}
              {otherOffices.map(({ office, number }) => (
                <OfficeCard
                  key={number}
                  office={office}
                  title={office.label ? t(office.label, locale) : fill(dict.contact.office, { number })}
                  dict={dict}
                />
              ))}
            </ul>
          </div>
        )}

        {mapUrl && (
          <iframe
            src={mapUrl}
            title={fill(dict.contact.mapTitle, siteVars)}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="mt-10 h-80 w-full rounded-2xl border-0 shadow-sm ring-1 ring-line sm:h-96"
          />
        )}
      </div>
    </section>
  );
}

function isComplete(office: Office): boolean {
  return Boolean(office.streetAddress && office.city && office.stateCode);
}

function OfficeCard({ office, title, dict }: { office: Office; title: string; dict: Dictionary }) {
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
    <li className="flex flex-col rounded-2xl bg-surface p-6 ring-1 ring-line">
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
        className="mt-3 inline-flex items-center gap-1 text-lg font-semibold text-brand underline underline-offset-4"
      >
        {dict.contact.directions}
        <Icon name="arrowRight" className="size-4" />
      </a>
    </li>
  );
}

function InfoRow({ icon, label, children }: { icon: "mail" | "clock" | "mapPin"; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface text-brand ring-1 ring-line">
        <Icon name={icon} className="size-6" />
      </span>
      <div className="text-lg">
        <dt className="font-semibold text-ink-soft">{label}</dt>
        <dd className="text-ink">{children}</dd>
      </div>
    </div>
  );
}
