import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { localeTags, t } from "@/lib/i18n";

const dayNames = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };

/** schema.org InsuranceAgency built only from confirmed data in site.ts. */
export function JsonLd({ locale }: { locale: Locale }) {
  const { contact, location } = site;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    // Full commercial name, so search engines don't mix the office up with similarly named agencies.
    name: site.brandName,
    alternateName: site.businessName,
    ...(site.url && { url: `${site.url}/${locale}`, "@id": `${site.url}/#agency` }),
    ...(contact.phone && { telephone: contact.phone.e164 }),
    ...(contact.email && { email: contact.email }),
    ...(site.photo && site.url && { image: `${site.url}${site.photo.src}` }),
    ...(site.logo && site.url && { logo: `${site.url}${site.logo.src}` }),
    ...(site.languages && { knowsLanguage: site.languages.map((code) => localeTags[code]) }),
    employee: { "@type": "Person", name: site.agentName },
  };

  if (location.showAddress && location.streetAddress) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.city,
      addressRegion: location.stateCode,
      postalCode: location.postalCode,
      addressCountry: "US",
    };
  }
  if (location.serviceArea) data.areaServed = t(location.serviceArea, locale);
  else if (location.city && location.state) data.areaServed = { "@type": "City", name: `${location.city}, ${location.state}` };
  else if (location.state) data.areaServed = { "@type": "State", name: location.state };

  if (site.hours) {
    data.openingHoursSpecification = site.hours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days.map((day) => dayNames[day]),
      opens: row.opens,
      closes: row.closes,
    }));
  }

  const sameAs = Object.values(site.socials).filter(Boolean);
  if (sameAs.length > 0) data.sameAs = sameAs;

  return <JsonLdScript data={data} />;
}

/** BreadcrumbList for inner pages. Needs absolute URLs, so it is only output once site.url is set. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  if (!site.url) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${site.url}${item.path}` })),
  };
  return <JsonLdScript data={data} />;
}

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
