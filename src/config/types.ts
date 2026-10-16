export type Locale = "en" | "es";

/** Text that must exist in both languages. */
export type Localized<T = string> = Record<Locale, T>;

export type IconName =
  | "car"
  | "home"
  | "heart"
  | "heartPulse"
  | "shield"
  | "umbrella"
  | "briefcase"
  | "users"
  | "building"
  | "document";

export type DayCode = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export interface HoursRow {
  /** Consecutive days that share the same hours, e.g. ["Mo","Tu","We","Th","Fr"]. */
  days: DayCode[];
  /** 24h format "HH:MM". */
  opens: string;
  closes: string;
}

/** Coverage programs the site explains. The copy for each lives in the dictionaries. */
export type ServiceId = "medicare" | "medicaid" | "dual" | "aca";

/**
 * Concrete things the office itself may do. Each one stays `null` until Silvia confirms it:
 * pages only describe a service as offered by the office when it is `true`.
 */
export type ScopeId = "medicareAdvantage" | "partD" | "medigap" | "dsnp" | "medicaidApplications" | "acaEnrollment";

export interface Testimonial {
  quote: Localized;
  /** Use only names the client authorized, e.g. "Maria G." */
  name: string;
  /** Optional context such as the city, only if the client agreed. */
  detail?: Localized;
}

export interface Image {
  /** Path inside /public, e.g. "/images/photo.jpg". */
  src: string;
  width: number;
  height: number;
  /** Optional lighter WebP copy for the page itself (src stays as the fallback and for social previews). */
  webp?: string;
}

export interface License {
  /** Two-letter state code, e.g. "TX". */
  state: string;
  number: string;
}

/** An extra office location. Leave fields null until confirmed: pending offices are hidden in production. */
export interface Office {
  /** Optional name, e.g. { en: "Eastside office", es: "Oficina del Este" }. */
  label: Localized | null;
  streetAddress: string | null;
  city: string | null;
  stateCode: string | null;
  postalCode: string | null;
  /** Only if this office has its own number. */
  phone: { e164: string; display: string } | null;
  /** Google Maps "Share > Embed a map" src URL (only the URL, not the whole iframe). */
  mapEmbedUrl: string | null;
}

export interface SiteConfig {
  businessName: string;
  /** Full commercial name used wherever the office must be identified (avoids confusion with similar names). */
  brandName: string;
  /** Full name, e.g. "Silvia Alcazar". */
  agentName: string;
  /** Production URL without trailing slash, e.g. "https://www.example.com". */
  url: string | null;

  contact: {
    /** E.164 for links ("+15555550123") and how it should be displayed. */
    phone: { e164: string; display: string } | null;
    /** Set true only if the number can receive text messages AND SMS consent was reviewed. */
    acceptsTexts: boolean;
    /** Show "TTY 711" next to the phone. Only once the office confirms it takes relay calls. */
    tty: boolean;
    email: string | null;
  };

  location: {
    city: string | null;
    /** Full state name, e.g. "Texas". */
    state: string | null;
    /** Two-letter code, e.g. "TX". */
    stateCode: string | null;
    /** Street address. Only shown when showAddress is true. */
    streetAddress: string | null;
    postalCode: string | null;
    /** false = service-area business (no public office address). */
    showAddress: boolean;
    /** Human-readable service area, e.g. "Houston and surrounding areas". */
    serviceArea: Localized | null;
    /** Google Maps "Share > Embed a map" src URL (only the URL, not the whole iframe). */
    mapEmbedUrl: string | null;
  };

  /** Offices besides the main one in `location`. */
  otherOffices: Office[];

  hours: HoursRow[] | null;
  /** Languages Silvia serves clients in. */
  languages: Locale[] | null;
  licenses: License[];
  /** National Producer Number, shown in the footer when set. */
  npn: string | null;
  /** Only if Silvia can reliably meet it, e.g. { en: "one business day", es: "un día hábil" }. */
  responseTime: Localized | null;

  /** Business logo placed in /public/images (shown in the header). */
  logo: Image | null;
  /** Real photo of Silvia placed in /public/images. */
  photo: Image | null;
  /** Square close-up of Silvia (cropped from the photo) for the "Meet Silvia" section. */
  portrait: Image | null;
  /** Photo of the office/storefront. `credit` is shown under it (e.g. "Imagery © Google" for Street View). */
  officePhoto: (Image & { credit: string | null }) | null;

  about: {
    /** Short introduction in Silvia's own words. */
    intro: Localized | null;
    /** Why she helps clients / how she started. */
    story: Localized | null;
  };

  /** Programs explained on the site (home cards, pages and form options). Educational, not a sales claim. */
  services: ServiceId[];

  /** What the office itself offers. null = not confirmed yet (the site then stays educational). */
  scope: Record<ScopeId, boolean | null>;

  /** Insurance companies the office works with. Names only (no logos without written permission). */
  carriers: {
    names: string[];
    /** Hidden on the site until the office confirms the list is current and accurate. */
    confirmed: boolean;
  };

  /** Medicare rules restrict testimonials; leave empty unless compliance approved them. */
  testimonials: Testimonial[];

  socials: {
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    /** Google Business Profile URL. */
    google: string | null;
  };

  /**
   * Show the "Request assistance" form. false = informational site: visitors call or visit.
   * Turning it on requires a lead destination (see .env.example) and a privacy policy.
   */
  leadForm: boolean;

  /** Online scheduling link (Calendly, Google Calendar…), optional. */
  bookingUrl: string | null;

  regulated: {
    /** Does the agency market Medicare products? null = not confirmed yet. */
    medicare: boolean | null;
    /** Does the agency sell ACA / Health Insurance Marketplace plans? */
    aca: boolean | null;
    /** Required by CMS when medicare === true. */
    medicareOrganizations: number | null;
    medicareProducts: number | null;
  };

  legal: {
    /** Flip to true once the real policy text is in place (see src/content/legal). */
    privacyPolicyReady: boolean;
    termsReady: boolean;
  };

  /** Silvia/the agency reviewed and approved all page copy in EN and ES. */
  copyApproved: boolean;
}
