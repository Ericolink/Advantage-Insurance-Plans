import type { SiteConfig } from "./types.ts";

/**
 * Single source of truth for everything specific to the agency.
 *
 * Rule: never invent data. Anything not confirmed by the office stays `null`
 * (or `false` / `[]`). The site hides or clearly marks whatever is missing, and
 * `npm run check:launch` lists what is still pending.
 */
export const site: SiteConfig = {
  businessName: "Advantage Insurance Plans",
  // Always shown in full: another El Paso agency has a very similar name.
  brandName: "Advantage Insurance Plans by Silvia Alcazar",
  agentName: "Silvia Alcazar",
  url: null,

  contact: {
    phone: { e164: "+19152569708", display: "(915) 256-9708" },
    acceptsTexts: false,
    // Pending: confirm the office accepts relay (TTY 711) calls.
    tty: false,
    email: null,
  },

  // From the office's Google Business Profile.
  location: {
    city: "El Paso",
    state: "Texas",
    stateCode: "TX",
    streetAddress: "4900 Alameda Ave, Ste E",
    postalCode: "79905",
    showAddress: true,
    serviceArea: null,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.0303723364573!2d-106.43493228820752!3d31.7696575346745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75b580758d2bf%3A0xb2769833f2c06cd1!2sAdvantage%20Insurance%20Plans%20by%20Silvia%20Alcazar!5e0!3m2!1ses-419!2smx!4v1791650445788!5m2!1ses-419!2smx",
  },

  otherOffices: [
    {
      label: null,
      streetAddress: "1387 George Dieter Dr, Ste 104",
      city: "El Paso",
      stateCode: "TX",
      postalCode: "79936",
      phone: null,
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.453848843605!2d-106.3049698765835!3d31.73081079090984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e743769ab416db%3A0xfbec8ce5c62b7228!2s1387%20George%20Dieter%20Dr%2C%20El%20Paso%2C%20TX%2079936!5e0!3m2!1ses-419!2sus!4v1792001782292!5m2!1ses-419!2sus",
    },
    {
      label: null,
      streetAddress: "2603 McNutt Rd",
      city: "Sunland Park",
      stateCode: "NM",
      postalCode: "88063",
      phone: null,
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3390.8741276488613!2d-106.58461942384375!3d31.801180233213678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ddf9d52b3b0873%3A0xb71b0618098caa5f!2s2603%20McNutt%20Rd%2C%20Sunland%20Park%2C%20NM%2088063!5e0!3m2!1ses-419!2sus!4v1792010440213!5m2!1ses-419!2sus",
    },
    // Shown on the closing card of the award interview (video2.mp4). Phone and map not confirmed yet.
    {
      label: null,
      streetAddress: "609 Myrtle Ave, Ste B",
      city: "El Paso",
      stateCode: "TX",
      postalCode: "79901",
      phone: null,
      mapEmbedUrl: null,
    },
  ],

  // Saturday and Sunday closed (days not listed are shown as closed).
  hours: [{ days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "16:00" }],
  // Pending confirmation that Silvia serves clients in both languages.
  // When confirmed set ["en", "es"]: it shows "Se habla español" and a language choice in the form.
  languages: null,
  licenses: [],
  npn: null,
  responseTime: null,

  logo: { src: "/images/logo.webp", width: 528, height: 228 },
  photo: { src: "/images/SilviaFoto.jpg", width: 854, height: 1280, webp: "/images/silvia-photo-768.webp" },
  portrait: { src: "/images/silvia-portrait.jpg", width: 400, height: 400 },
  // Google Street View capture: Google requires visible attribution. Replace with an own photo when possible.
  officePhoto: { src: "/images/office.webp", width: 534, height: 353, credit: "Imagery © Google" },

  media: {
    commercial: {
      src: "/images/video1.mp4",
      poster: "/images/video1-poster.webp",
      width: 1280,
      height: 720,
      duration: 23,
      language: "es",
      captions: [
        { language: "es", src: "/captions/video1.es.vtt" },
        { language: "en", src: "/captions/video1.en.vtt" },
      ],
    },
    // Alejandro Alcazar (Silvia's son) interviewed after receiving the award. The video does not
    // name who granted it: don't add an organization, ranking or date that the video doesn't confirm.
    interview: {
      src: "/images/video2.mp4",
      poster: "/images/video2-poster.webp",
      width: 832,
      height: 464,
      duration: 59,
      language: "es",
      // Machine transcription, reviewed by hand; the last phrase is marked as unclear in both languages.
      captions: [
        { language: "es", src: "/captions/video2.es.vtt" },
        { language: "en", src: "/captions/video2.en.vtt" },
      ],
    },
    // TelevisaUnivision event Silvia was invited to. The other guests are not identified, so they are not named.
    eventPhotos: [
      {
        src: "/images/pasarela1.jpg",
        webp: "/images/pasarela1-640.webp",
        width: 1153,
        height: 1138,
        alt: {
          en: "Silvia Alcazar in front of the backdrop at a TelevisaUnivision event",
          es: "Silvia Alcazar frente al fondo del evento de TelevisaUnivision",
        },
      },
      {
        src: "/images/pasarela2.jpg",
        webp: "/images/pasarela2-640.webp",
        width: 1266,
        height: 1600,
        alt: {
          en: "Silvia Alcazar with another guest in the event hall",
          es: "Silvia Alcazar con otra persona invitada en el salón del evento",
        },
      },
      {
        src: "/images/pasarela3.jpg",
        webp: "/images/pasarela3-640.webp",
        width: 1284,
        height: 1419,
        alt: {
          en: "Silvia Alcazar with another guest at the event",
          es: "Silvia Alcazar con otra persona invitada al evento",
        },
      },
      {
        src: "/images/pasarela4.jpg",
        webp: "/images/pasarela4-640.webp",
        width: 1013,
        height: 961,
        alt: {
          en: "Silvia Alcazar with another guest at the event",
          es: "Silvia Alcazar con otra persona invitada al evento",
        },
      },
    ],
  },

  about: {
    // Silvia's own introduction (EN and ES). Do not write a biography she hasn't approved.
    intro: null,
    story: null,
  },

  services: ["medicare", "medicaid", "dual", "aca"],

  // Pending confirmation with Silvia. Until each is true, the pages only explain the program
  // and invite visitors to call; they never say the office sells or handles it.
  scope: {
    medicareAdvantage: null,
    partD: null,
    medigap: null,
    dsnp: null,
    medicaidApplications: null,
    acaEnrollment: null,
  },

  carriers: {
    // Illustrative list from the office; confirm current appointments before setting `confirmed: true`.
    names: ["UnitedHealthcare", "Humana", "Devoted Health", "Alignment Health", "HealthSpring"],
    confirmed: false,
  },

  testimonials: [],

  socials: {
    facebook: null,
    instagram: null,
    linkedin: null,
    google: null,
  },

  // Informational site for now: no online form, visitors call or visit the office.
  leadForm: false,

  bookingUrl: null,

  regulated: {
    medicare: true,
    aca: true,
    // Required for the CMS disclaimer: how many organizations and how many products
    // the office represents in its area. Ask Silvia / her upline or compliance contact.
    medicareOrganizations: 12,
    medicareProducts: 68,
  },

  legal: {
    privacyPolicyReady: false,
    termsReady: false,
  },

  copyApproved: false,
};
