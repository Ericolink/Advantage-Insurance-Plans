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

export interface Video {
  /** Path inside /public, e.g. "/images/video.mp4". */
  src: string;
  /** Still frame taken from the video itself, shown until it plays. */
  poster: string;
  width: number;
  height: number;
  /** Length in seconds, shown before the video loads. */
  duration: number;
  /** Spoken language of the video. */
  language: Locale;
  /** WebVTT caption tracks, one per language. Visitors pick one (or none) in the player's controls. */
  captions: { language: Locale; src: string }[];
}

/** A photo shown in a gallery: `webp` is the light thumbnail, `src` the full photo for the enlarged view. */
export interface GalleryPhoto extends Image {
  alt: Localized;
}

/**
 * A state insurance license, exactly as it appears on the state's license lookup
 * (Texas: TDI, https://www.tdi.texas.gov/agent/agent-lookup.html; New Mexico: OSI).
 * Not the NPN (National Producer Number, see `site.npn`), not a phone, tax ID or business filing number.
 */
export interface License {
  /** Two-letter code of the state that issued the license, e.g. "TX". */
  state: string;
  /** License number issued by that state. */
  number: string;
  /** Whose license it is: Silvia's individual agent license or the agency's own license. */
  holder: "agent" | "agency";
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
  /** Photo of this office taken by or for the agency, shown next to its map. */
  photo?: GalleryPhoto;
}

export interface SiteConfig {
  businessName: string;
  /** Full commercial name used wherever the office must be identified (avoids confusion with similar names). */
  brandName: string;
  /** Full name, e.g. "Silvia Alcazar". */
  agentName: string;
  /**
   * Production URL: https, no trailing slash, e.g. "https://www.yourdomain.com".
   * null = not confirmed yet: no canonical, hreflang, Open Graph URL/image, sitemap or JSON-LD URLs
   * are generated, and every page stays noindex.
   */
  url: string | null;

  contact: {
    /** E.164 for links ("+15555550123") and how it should be displayed. */
    phone: { e164: string; display: string } | null;
    /** Set true only if the number can receive text messages AND SMS consent was reviewed. */
    acceptsTexts: boolean;
    /** Show "TTY 711" next to the phone. Only once the office confirms it takes relay calls. */
    tty: boolean;
    email: string | null;
    /** Show the floating WhatsApp button for `phone`. Only if that number is on WhatsApp. */
    whatsapp: boolean;
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
  /**
   * Languages the office actually serves clients in (by phone and in person). Not the same as the
   * site's languages: the site is in EN and ES either way. null = not confirmed ("Se habla español" stays hidden).
   */
  languages: Locale[] | null;
  licenses: License[];
  /** National Producer Number (NIPR, digits only), shown in the footer when set. Not a state license number. */
  npn: string | null;
  /** Only if Silvia can reliably meet it, e.g. { en: "one business day", es: "un día hábil" }. */
  responseTime: Localized | null;

  /** Business logo placed in /public/images (shown in the header). */
  logo: Image | null;
  /** Real photo of Silvia placed in /public/images. */
  photo: Image | null;
  /** Square close-up of Silvia (cropped from the photo) for the "Meet Silvia" section. */
  portrait: Image | null;
  /**
   * Photo of the office/storefront. `credit` is shown under it (e.g. "Imagery © Google" for Street View).
   * `source: "own"` = taken by or for the office. Any other source (e.g. a Street View capture) is only a
   * development placeholder: production builds don't show it, so it is never presented as the office's own photo.
   */
  officePhoto: (Image & { credit: string | null; source: "own" | "streetView" }) | null;

  /**
   * Photos of Silvia with her sons from the Thrive After 60 magazine session, shown after "Meet Silvia".
   * Never imply the magazine endorses or recommends the agency. Hidden when empty.
   */
  familyPhotos: GalleryPhoto[];

  /** Videos and event photos for the "In the media" section. Hidden when all are empty. */
  media: {
    /** The agency's own TV commercial. */
    commercial: Video | null;
    /** Interview recorded at an award ceremony. */
    interview: Video | null;
    /** Photos of Silvia at an event she was invited to. Never imply the host endorses the agency. */
    eventPhotos: GalleryPhoto[];
  };

  about: {
    /** Short introduction in Silvia's own words. */
    intro: Localized | null;
    /** Why she helps clients / how she started. */
    story: Localized | null;
    /**
     * ISO date (e.g. "2026-11-02") on which Silvia read and approved `intro` and `story` in EN and ES.
     * null = not approved: the texts are not shown and the site uses the neutral fallback.
     */
    approvedOn: string | null;
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
