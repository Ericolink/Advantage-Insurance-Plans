// UI copy in English. Every key must also exist in es.ts (enforced by the type).
// Agency-specific facts live in src/config/site.ts, not here.
// Writing rules: short sentences, plain words, no promises of eligibility, savings or approval.
export const en = {
  meta: {
    title: "{business} | Medicare, Medicaid & Marketplace Help",
    description:
      "{agent} at {business} helps people 65 and older and people with disabilities understand Medicare, Medicaid and Health Insurance Marketplace options. Talk to a real person.",
  },
  nav: {
    skip: "Skip to main content",
    services: "Services",
    howWeHelp: "How We Help",
    about: "About Us",
    contact: "Contact",
    call: "Call Our Office",
    callShort: "Call",
    getHelp: "Get Help",
    language: "Language",
    phonePending: "Office phone: pending",
  },
  hero: {
    title: "Medicare and Health Coverage Made Simple",
    subtitle:
      "Helping seniors and eligible individuals with disabilities understand their health coverage options and find plans that fit their needs.",
    ctaHelp: "Get Help With My Coverage",
    ctaCall: "Call Our Office",
    realPerson: "Talk to a real person",
    otherLanguage: "Se habla español",
    office: "Office in {city}, {state}",
    photoAlt: "{agent}, {business}",
  },
  services: {
    title: "How can we help you?",
    intro: "Choose the topic you have questions about. We'll explain it in plain words.",
    different: "Medicare, Medicaid and the Marketplace are different programs. Not sure which one is for you? We can help you find out.",
    disclaimer:
      "Each program has its own eligibility rules. Plans and benefits vary by location, and not every plan is available in every area.",
    forWhom: "Usually for:",
    items: {
      medicare: {
        title: "Medicare",
        body: "Medicare is health coverage for people 65 and older, and for some younger people with disabilities. We help you understand your Medicare choices and review the plans we can offer where you live, based on your needs.",
        forWhom: "People 65+ and some people with disabilities",
        cta: "Get Medicare Help",
      },
      medicaid: {
        title: "Medicaid",
        body: "Medicaid can help people with limited income and resources. Each state has its own rules. We explain the coverage options and what is usually needed to apply. Your state decides who qualifies.",
        forWhom: "People with limited income and resources",
        cta: "Get Medicaid Information",
      },
      aca: {
        title: "Obamacare / ACA Marketplace",
        body: "The Health Insurance Marketplace (HealthCare.gov) is where people can shop for health insurance. It is mainly for people who don't have Medicare. We help you understand the options and see which plans you may qualify for.",
        forWhom: "People without Medicare who need health insurance",
        cta: "Explore Health Coverage Options",
      },
    },
  },
  terms: {
    title: "Words you may hear",
    intro: "Health coverage has many names. Here is what the most common ones mean.",
    items: [
      {
        term: "Original Medicare",
        meaning: "The Medicare program run by the federal government. Part A helps pay for hospital stays. Part B helps pay for doctor visits.",
      },
      {
        term: "Medicare Advantage (Part C)",
        meaning: "Another way to get Medicare. These plans come from private companies approved by Medicare. They include Part A and Part B, and many include drug coverage.",
      },
      {
        term: "Part D",
        meaning: "Coverage that helps pay for prescription drugs.",
      },
      {
        term: "Medicaid",
        meaning: "A program run by each state for people with limited income and resources. Some people have both Medicare and Medicaid.",
      },
      {
        term: "ACA Marketplace (Obamacare)",
        meaning: "The official place to buy health insurance, at HealthCare.gov. Help with the cost depends on your income.",
      },
    ],
  },
  steps: {
    title: "How We Help You",
    intro: "Getting help is simple. Here is what to expect.",
    items: [
      { title: "Tell Us What You Need", body: "Call us or visit our office. Tell us about your situation and what kind of help you are looking for." },
      { title: "Understand Your Options", body: "We help you understand the health coverage options that may be available to you." },
      { title: "Get Personalized Guidance", body: "We go over the choices with you, so you can compare them and make an informed decision." },
    ],
    note: "There is no pressure. You decide what is right for you.",
    cta: "Contact Our Office",
  },
  about: {
    title: "Meet {agent}",
    role: "Your contact at {business}",
    fallback:
      "{agent} is your contact at {business}. Our office helps people understand their Medicare, Medicaid and Marketplace options.",
    howWeHelp:
      "We take the time to listen and answer your questions in plain words. You can talk with us by phone or visit our office.",
    carriersTitle: "Some of the companies we work with",
    carriersNote: "Plans and companies available depend on where you live.",
    cta: "Contact Our Office",
    photoAlt: "Portrait of {agent}",
  },
  testimonials: {
    title: "What our clients say",
  },
  contact: {
    title: "Contact Our Office",
    subtitle: "Call us or visit our office. We're happy to help.",
    subtitleWithTime: "Call us or visit our office. {agentFirst} will usually get back to you within {time}.",
    callTitle: "Prefer to talk? Call us",
    phone: "Phone",
    email: "Email",
    hours: "Office hours",
    area: "Service area",
    address: "Office address",
    book: "Book an appointment",
    closed: "Closed",
    officeAlt: "{business} office",
    mapTitle: "Map showing the location of {business}",
    directions: "Get directions",
    officesTitle: "Our offices",
    mainOffice: "Main office",
    office: "Office {number}",
    officePending: "Address pending",
  },
  form: {
    title: "Request Assistance",
    intro: "Only a few questions. We'll call you back.",
    name: "Your name",
    phone: "Phone number",
    email: "Email",
    optional: "optional",
    help: "What do you need help with?",
    helpPlaceholder: "Choose one",
    helpOptions: {
      medicare: "Medicare",
      medicaid: "Medicaid",
      aca: "ACA Marketplace (Obamacare)",
      other: "Something else / I'm not sure",
    },
    contactMethod: "How should we contact you?",
    methodPhone: "Phone call",
    methodText: "Text message",
    methodEmail: "Email",
    language: "Preferred language",
    sensitiveHint: "Please do not send your Medicare number, Social Security number or medical information in this form.",
    consent: "I agree that {business} may contact me by phone or email about my request.",
    smsConsent:
      "I agree to receive text messages from {business} about my request. Message and data rates may apply. Reply STOP to opt out. Consent is not a condition of purchase.",
    privacyLink: "Privacy policy",
    submit: "Request Assistance",
    sending: "Sending…",
    success: "Thank you, {name}! We received your request. {agentFirst} will contact you soon.",
    required: "Required",
    errors: {
      name: "Please enter your name.",
      contact: "Please enter a phone number or an email.",
      phone: "Please enter a valid US phone number, like (915) 555-0123.",
      email: "Please enter a valid email address.",
      consent: "Please check this box so we can contact you.",
      text: "To get text messages, please enter a phone number and check the text message box.",
      generic: "Sorry, something went wrong and your request was not sent. Please try again or call our office.",
      rateLimited: "Too many attempts. Please wait a few minutes and try again.",
      unavailable: "Sorry, we couldn't send your request online right now. Please call our office.",
    },
  },
  footer: {
    rights: "All rights reserved.",
    licensed: "Licensed in {state}",
    license: "License #{number}",
    privacy: "Privacy policy",
    terms: "Terms of use",
    medicareDisclaimer:
      "We do not offer every plan available in your area. Currently we represent {organizations} organizations which offer {products} products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options.",
    governmentDisclaimer:
      "{business} is not connected with or endorsed by the U.S. government or the federal Medicare program.",
    marketplaceDisclaimer:
      "{business} is not the Health Insurance Marketplace® (HealthCare.gov). You can also apply for coverage directly at HealthCare.gov.",
    medicaidDisclaimer: "Medicaid eligibility is decided by your state's Medicaid agency.",
  },
  legal: {
    privacyTitle: "Privacy policy",
    termsTitle: "Terms of use",
    pendingTitle: "This page is being prepared",
    pendingBody: "We're finishing this document. If you have questions in the meantime, please contact our office.",
    lastUpdated: "Last updated: {date}",
  },
  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or was moved.",
    home: "Back to home",
  },
  draft: {
    title: "Preview — pending before launch",
    hint: "Only visible in development. Run npm run check:launch for details.",
  },
};
