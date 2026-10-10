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

  // Two more offices: addresses pending. Fill in streetAddress, city, stateCode and postalCode
  // to publish them; until then they only appear as placeholders in development.
  otherOffices: [
    { label: null, streetAddress: null, city: null, stateCode: null, postalCode: null, phone: null },
    { label: null, streetAddress: null, city: null, stateCode: null, postalCode: null, phone: null },
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
    medicareOrganizations: null,
    medicareProducts: null,
  },

  legal: {
    privacyPolicyReady: false,
    termsReady: false,
  },

  copyApproved: false,
};
