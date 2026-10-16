import Link from "next/link";
import type { ReactNode } from "react";
import { pagePath } from "@/config/pages";
import { site } from "@/config/site";
import type { Image, Locale, Office, OfficePhotoFraming } from "@/config/types";
import { fill, localeNames, t, type Dictionary } from "@/lib/i18n";
import { closedDays, formatDays, formatHours } from "@/lib/format";
import { siteVars } from "@/lib/site-vars";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";
import { Icon } from "@/components/ui/Icon";
import { cardHoverClass, container, h2Class, leadClass, sectionSpace, textLinkClass } from "@/components/ui/styles";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contact, location, hours, responseTime } = site;
  const subtitle = responseTime
    ? fill(dict.contact.subtitleWithTime, { ...siteVars, time: t(responseTime, locale) })
    : fill(dict.contact.subtitle, siteVars);
  const showAddress = location.showAddress && location.streetAddress && location.city && location.stateCode;
  const mainOffice: Office = { label: null, ...location, phone: null };
  // Only the office's own photo is published: a Street View capture is never presented as the agency's
  // own picture of its premises.
  const mainPhoto = site.officePhoto?.source === "own" ? site.officePhoto : null;
  const offices: ShownOffice[] = [
    ...(showAddress
      ? [{
          key: "main",
          office: mainOffice,
          title: dict.contact.mainOffice,
          photo: mainPhoto && {
            ...mainPhoto,
            alt: mainPhoto.alt ? t(mainPhoto.alt, locale) : fill(dict.contact.officeAlt, { ...siteVars, business: site.brandName }),
          },
        }]
      : []),
    // Only offices with a complete address are shown.
    ...site.otherOffices
      .map((office, index) => ({ office, number: index + 2 }))
      .filter(({ office }) => isComplete(office))
      .map(({ office, number }) => ({
        key: String(number),
        office,
        title: office.label ? t(office.label, locale) : fill(dict.contact.office, { number }),
        photo: office.photo ? { ...office.photo, alt: t(office.photo.alt, locale) } : null,
      })),
  ];
  // Offices with a real photo lead; the rest follow as smaller cards, in their configured order.
  const featured = offices.filter((entry): entry is ShownOffice & { photo: ShownPhoto } => entry.photo !== null);
  const others = offices.filter((entry) => entry.photo === null);
  const closed = hours ? closedDays(hours) : [];

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
      <dl className="divide-y divide-white/40">
        {contact.email && (
          <InfoRow icon="mail" label={dict.contact.email}>
            <a href={`mailto:${contact.email}`} className="break-all font-semibold text-white underline-offset-4 hover:underline">
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

      {/* White on the orange background, like the hero's links. */}
      <Link
        href={pagePath("firstVisit", locale)}
        className={textLinkClass.replace("text-accent-strong", "text-white").replace("hover:text-brand-deep hover:decoration-accent", "hover:decoration-4")}
      >
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

  // Same orange and white text as the hero, so the page opens and closes on the brand color. The phone, the
  // addresses and the maps sit on white cards.
  return (
    <section id="contact" aria-labelledby="contact-title" className={`scroll-mt-24 bg-orange ${sectionSpace}`}>
      <div className={container}>
        {/* Only the heading moves: the phone, hours and addresses below are there to be read at once. */}
        <div data-reveal>
          <h2 id="contact-title" className={h2Class.replace("text-brand-deep", "text-white")}>
            {dict.contact.title}
          </h2>
          <p className={`mt-4 ${leadClass.replace("text-ink", "text-white")}`}>{subtitle}</p>
        </div>

        {/* Form on: contact details beside it. Form off: the call card and the details side by side.
            The office photos live with their addresses, in "Our offices" below. */}
        <div className={`mt-10 grid items-start gap-10 lg:gap-12 ${site.leadForm ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-2"}`}>
          {site.leadForm ? (
            <div className="space-y-8">
              {callCard}
              {details}
              {booking}
            </div>
          ) : (
            callCard
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
            <div className="space-y-8">
              {details}
              {booking}
            </div>
          )}
        </div>

        {offices.length > 0 && (
          <div className="mt-14 border-t border-white/40 pt-12 sm:mt-16 sm:pt-14">
            <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-white sm:text-3xl">
              <span aria-hidden="true" className="h-0.5 w-10 bg-white" />
              {dict.contact.officesTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white">{dict.contact.officesIntro}</p>

            {featured.length > 0 && (
              <ul className="mt-8 space-y-6 lg:space-y-8">
                {featured.map((entry, index) => (
                  <FeaturedOffice key={entry.key} entry={entry} photoFirst={index % 2 === 0} locale={locale} dict={dict} />
                ))}
              </ul>
            )}

            {others.length > 0 && (
              // Two across, or three when the count divides by three, so no card sits alone on its row.
              <ul className={`mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 ${others.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
                {others.map((entry) => (
                  <OfficeCard key={entry.key} office={entry.office} title={entry.title} locale={locale} dict={dict} />
                ))}
              </ul>
            )}
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

type ShownPhoto = Image & OfficePhotoFraming & { alt: string; credit?: string | null };
type ShownOffice = { key: string; office: Office; title: string; photo: ShownPhoto | null };

function directionsUrl(office: Office): string {
  const address = `${office.streetAddress}, ${office.city}, ${office.stateCode} ${office.postalCode ?? ""}`.trim();
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.businessName}, ${address}`)}`;
}

/**
 * An office with its own photo. The frame takes the photo's own ratio, so it is shown whole and never stretched,
 * and the layout follows the photo instead of the other way round:
 * - Wide photo: photo and address side by side on desktop, the map as a band underneath (beside the address it
 *   would make the row taller than the photo and force a crop). On tablets the photo spans the card, with the
 *   address and map side by side below it.
 * - Tall photo: the address and the map share a column beside it from tablets on; the map fills the height left.
 * Either way the photo covers about the same area on desktop, so both offices carry the same weight. If the
 * text still runs taller than the photo, a sliver is trimmed around the photo's own `focus`.
 */
function FeaturedOffice({ entry, photoFirst, locale, dict }: { entry: ShownOffice & { photo: ShownPhoto }; photoFirst: boolean; locale: Locale; dict: Dictionary }) {
  const { office, title, photo } = entry;
  const tall = photo.height > photo.width;
  // Alternate sides so two featured offices read as an editorial spread, not a repeated block.
  const layout = tall
    ? photoFirst
      ? "md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      : "md:grid-cols-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:[&>figure]:order-last"
    : photoFirst
      ? "md:grid-cols-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      : "md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:[&>figure]:order-last";

  const details = (
    <div>
      <h4 id={`office-${entry.key}`} className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-strong sm:text-base">
        <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
        {title}
      </h4>
      <address className="mt-3 not-italic">
        <span className="block font-display text-2xl font-bold leading-snug text-brand-deep text-balance sm:text-[1.75rem]">{office.streetAddress}</span>
        <span className="mt-1 block text-lg text-ink">
          {office.city}, {office.stateCode} {office.postalCode}
        </span>
      </address>
      {office.phone && (
        <a href={`tel:${office.phone.e164}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-brand hover:underline">
          <Icon name="phone" className="size-5" />
          {office.phone.display}
        </a>
      )}
      <ButtonLink href={directionsUrl(office)} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-5 w-full sm:w-auto">
        <Icon name="mapPin" className="size-5" />
        {dict.contact.directions}
      </ButtonLink>
    </div>
  );
  const map = office.mapEmbedUrl && <OfficeMap url={office.mapEmbedUrl} title={title} locale={locale} dict={dict} className="absolute inset-0 h-full" />;

  return (
    <li>
      <article
        aria-labelledby={`office-${entry.key}`}
        className={`group grid overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-line ${layout} ${cardHoverClass}`}
      >
        <figure className={`relative overflow-hidden bg-muted ${tall ? "" : "md:col-span-2 lg:col-span-1"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps the static export option open */}
          <img
            src={photo.webp ?? photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photo.focus }}
            className="block h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
          />
          {photo.credit && (
            <figcaption className="absolute right-2 bottom-2 rounded bg-surface/90 px-2 py-0.5 text-sm text-ink-soft">{photo.credit}</figcaption>
          )}
        </figure>

        {tall ? (
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            {details}
            {/* The map takes whatever height the photo leaves, so it never makes the card taller than the photo. */}
            {map && <div className="relative min-h-52 flex-1 md:min-h-32">{map}</div>}
          </div>
        ) : (
          <>
            <div className="p-6 sm:p-8 lg:self-center">{details}</div>
            {map && <div className="relative mx-6 mb-6 h-56 sm:mx-8 sm:mb-8 md:mt-8 md:ml-0 md:h-auto md:min-h-40 lg:col-span-2 lg:mt-6 lg:ml-8 lg:h-56">{map}</div>}
          </>
        )}
      </article>
    </li>
  );
}

/** An office without a photo: a quieter card, so the featured offices lead, with the address and map at hand. */
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
  return (
    <li className={`flex flex-col rounded-2xl border border-line bg-surface p-6 hover:border-accent/40 ${cardHoverClass}`}>
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
          <Icon name="mapPin" className="size-6" />
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-accent-strong">{title}</h4>
          <address className="mt-1 text-lg not-italic text-ink">
            <span className="block text-xl font-bold text-brand-deep">{office.streetAddress}</span>
            {office.city}, {office.stateCode} {office.postalCode}
          </address>
        </div>
      </div>
      {office.phone && (
        <a href={`tel:${office.phone.e164}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-brand hover:underline">
          <Icon name="phone" className="size-5" />
          {office.phone.display}
        </a>
      )}
      <a href={directionsUrl(office)} target="_blank" rel="noopener noreferrer" className={`mt-3 self-start ${textLinkClass}`}>
        {dict.contact.directions}
        <Icon name="arrowRight" className="size-5 shrink-0" />
      </a>
      {office.mapEmbedUrl && <OfficeMap url={office.mapEmbedUrl} title={title} locale={locale} dict={dict} className="mt-4 h-48" />}
    </li>
  );
}

function OfficeMap({ url, title, locale, dict, className }: { url: string; title: string; locale: Locale; dict: Dictionary; className: string }) {
  return (
    <iframe
      src={localizedMapUrl(url, locale)}
      title={fill(dict.contact.mapTitle, { business: title })}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className={`w-full rounded-xl border-0 ring-1 ring-line ${className}`}
    />
  );
}

function InfoRow({ icon, label, children }: { icon: "mail" | "clock" | "mapPin" | "globe"; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-4 first:pt-0">
      <Icon name={icon} className="mt-1 size-6 shrink-0 text-white" />
      <div className="text-base sm:text-lg">
        <dt className="font-semibold text-white">{label}</dt>
        <dd className="mt-0.5 text-white">{children}</dd>
      </div>
    </div>
  );
}
