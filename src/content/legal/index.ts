import type { Localized } from "../../config/types.ts";

export interface LegalDocument {
  /** ISO date, e.g. "2026-11-01". */
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
}

/**
 * Published legal text, approved by Silvia on 2026-10-15.
 * The open [PENDING] items were removed at her request rather than answered: the documents name no
 * legal entity, email, licensed states or governing-law clause. Add those here when they are confirmed.
 * Setting a document to `null` shows a neutral "being prepared" notice and keeps the page out of search.
 * `npm run check:launch` blocks the launch if a published document still has placeholders.
 */
export const privacyPolicy: Localized<LegalDocument> | null = {
  en: {
    updated: "2026-10-15",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "This website belongs to Advantage Insurance Plans by Silvia Alcazar, with its main office at 4900 Alameda Ave, Ste E, El Paso, TX 79905.",
          "This policy explains what information this website collects when you visit it. It does not cover what you share with our office by phone or in person.",
        ],
      },
      {
        heading: "Information we collect on this website",
        paragraphs: [
          "You can read this website without telling us who you are. There is currently no form on this website and we do not ask you to create an account.",
          "Please do not send us your Social Security number, Medicare number, medical information or bank details through the internet. Bring your documents to your appointment instead.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We use one cookie, called NEXT_LOCALE, to remember whether you chose English or Spanish. It stores only that choice, lasts up to one year and is not used for advertising or to follow you on other websites.",
          "We do not use analytics, advertising cookies or tracking pixels.",
        ],
      },
      {
        heading: "Maps from Google",
        paragraphs: [
          "Our contact section shows Google Maps so you can find our offices. When a map loads, your browser connects to Google, which receives information such as your IP address and may set its own cookies. Google's use of that information is described in Google's Privacy Policy (policies.google.com/privacy).",
        ],
      },
      {
        heading: "Hosting and security logs",
        paragraphs: [
          "Like most websites, our hosting provider automatically records technical information such as your IP address, browser type and the pages requested, to deliver the site and protect it from abuse..",
        ],
      },
      {
        heading: "How we use and share information",
        paragraphs: [
          "We do not sell personal information..",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "We link to official websites such as Medicare.gov, HealthCare.gov and Texas Health and Human Services. Those sites have their own privacy policies.",
        ],
      },
      {
        heading: "Children",
        paragraphs: ["This website is meant for adults and is not directed to children under 13."],
      },
      {
        heading: "Your choices and questions",
        paragraphs: [
          "You can block or delete cookies in your browser settings; the site still works, but it may not remember your language.",
          "For questions about this policy, call our office at (915) 256-9708..",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "If we add new features, such as a contact form, we will update this policy before they go live and change the date at the top of this page.",
        ],
      },
    ],
  },
  es: {
    updated: "2026-10-15",
    sections: [
      {
        heading: "Quiénes somos",
        paragraphs: [
          "Este sitio web pertenece a Advantage Insurance Plans by Silvia Alcazar, con oficina principal en 4900 Alameda Ave, Ste E, El Paso, TX 79905.",
          "Esta política explica qué información recopila este sitio web cuando usted lo visita. No cubre lo que usted comparte con nuestra oficina por teléfono o en persona.",
        ],
      },
      {
        heading: "Información que recopilamos en este sitio",
        paragraphs: [
          "Puede leer este sitio sin decirnos quién es. Por ahora no hay ningún formulario en este sitio y no le pedimos crear una cuenta.",
          "Por favor no nos envíe por internet su número de Seguro Social, su número de Medicare, información médica ni datos bancarios. Mejor traiga sus documentos a su cita.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Usamos una sola cookie, llamada NEXT_LOCALE, para recordar si eligió inglés o español. Solo guarda esa elección, dura hasta un año y no se usa para publicidad ni para seguirle en otros sitios web.",
          "No usamos herramientas de analítica, cookies de publicidad ni píxeles de seguimiento.",
        ],
      },
      {
        heading: "Mapas de Google",
        paragraphs: [
          "Nuestra sección de contacto muestra mapas de Google para que pueda encontrar nuestras oficinas. Cuando se carga un mapa, su navegador se conecta con Google, que recibe información como su dirección IP y puede guardar sus propias cookies. El uso que Google hace de esa información se explica en su Política de Privacidad (policies.google.com/privacy).",
        ],
      },
      {
        heading: "Alojamiento y registros de seguridad",
        paragraphs: [
          "Como la mayoría de los sitios web, nuestro proveedor de alojamiento registra automáticamente información técnica como su dirección IP, el tipo de navegador y las páginas solicitadas, para mostrar el sitio y protegerlo de abusos..",
        ],
      },
      {
        heading: "Cómo usamos y compartimos la información",
        paragraphs: [
          "No vendemos información personal..",
        ],
      },
      {
        heading: "Enlaces a otros sitios",
        paragraphs: [
          "Enlazamos a sitios oficiales como Medicare.gov, CuidadoDeSalud.gov y la Comisión de Salud y Servicios Humanos de Texas. Esos sitios tienen sus propias políticas de privacidad.",
        ],
      },
      {
        heading: "Menores de edad",
        paragraphs: ["Este sitio está pensado para personas adultas y no está dirigido a menores de 13 años."],
      },
      {
        heading: "Sus opciones y preguntas",
        paragraphs: [
          "Puede bloquear o borrar las cookies en la configuración de su navegador; el sitio sigue funcionando, aunque quizás no recuerde su idioma.",
          "Si tiene preguntas sobre esta política, llame a nuestra oficina al (915) 256-9708..",
        ],
      },
      {
        heading: "Cambios a esta política",
        paragraphs: [
          "Si agregamos nuevas funciones, como un formulario de contacto, actualizaremos esta política antes de activarlas y cambiaremos la fecha al principio de esta página.",
        ],
      },
    ],
  },
};

export const termsOfUse: Localized<LegalDocument> | null = {
  en: {
    updated: "2026-10-15",
    sections: [
      {
        heading: "About this website",
        paragraphs: [
          "This website is operated by Advantage Insurance Plans by Silvia Alcazar. By using it, you agree to these terms.",
        ],
      },
      {
        heading: "General, educational information",
        paragraphs: [
          "The information on this website is general and educational. It is not a decision about your eligibility, a quote, or a recommendation for your situation. Medicare, Medicaid and the Health Insurance Marketplace decide eligibility and benefits.",
          "Plans, costs, benefits and dates change every year and depend on where you live. Always confirm the details with the official sources we link to, or with our office.",
        ],
      },
      {
        heading: "No insurance is sold through this website",
        paragraphs: [
          "You cannot buy, enroll in, change or cancel insurance through this website. Visiting the site or calling our office does not enroll you in any plan and does not create an insurance contract.",
        ],
      },
      {
        heading: "Not a government website",
        paragraphs: [
          "This is not a government website. We are not connected with or endorsed by the U.S. government, the federal Medicare program, the Health Insurance Marketplace (HealthCare.gov) or Texas Health and Human Services.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "We link to official websites for your convenience. We do not control them and are not responsible for their content.",
        ],
      },
      {
        heading: "Photos, videos and text",
        paragraphs: [
          "The text, photos and videos on this website belong to their owners and may not be copied for commercial use without permission..",
        ],
      },
      {
        heading: "Responsibility",
        paragraphs: [
          "We work to keep this information accurate and up to date, but it may contain errors or become outdated..",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "We may update these terms; the date at the top shows the latest version. For questions, call our office at (915) 256-9708.",
        ],
      },
    ],
  },
  es: {
    updated: "2026-10-15",
    sections: [
      {
        heading: "Sobre este sitio web",
        paragraphs: [
          "Este sitio web lo opera Advantage Insurance Plans by Silvia Alcazar. Al usarlo, usted acepta estos términos.",
        ],
      },
      {
        heading: "Información general y educativa",
        paragraphs: [
          "La información de este sitio es general y educativa. No es una decisión sobre su elegibilidad, una cotización ni una recomendación para su situación. Medicare, Medicaid y el Mercado de Seguros Médicos deciden la elegibilidad y los beneficios.",
          "Los planes, costos, beneficios y fechas cambian cada año y dependen de dónde vive. Confirme siempre los detalles en las fuentes oficiales que enlazamos o con nuestra oficina.",
        ],
      },
      {
        heading: "En este sitio no se vende ningún seguro",
        paragraphs: [
          "En este sitio no puede comprar, inscribirse, cambiar ni cancelar un seguro. Visitar el sitio o llamar a nuestra oficina no lo inscribe en ningún plan ni crea un contrato de seguro.",
        ],
      },
      {
        heading: "No es un sitio del gobierno",
        paragraphs: [
          "Este no es un sitio web del gobierno. No tenemos vínculo con el gobierno de EE. UU., el programa federal de Medicare, el Mercado de Seguros Médicos (CuidadoDeSalud.gov) ni la Comisión de Salud y Servicios Humanos de Texas, ni contamos con su respaldo.",
        ],
      },
      {
        heading: "Enlaces a otros sitios",
        paragraphs: [
          "Enlazamos a sitios oficiales para su comodidad. No los controlamos y no somos responsables de su contenido.",
        ],
      },
      {
        heading: "Fotos, videos y textos",
        paragraphs: [
          "Los textos, fotos y videos de este sitio pertenecen a sus dueños y no pueden copiarse para uso comercial sin permiso..",
        ],
      },
      {
        heading: "Responsabilidad",
        paragraphs: [
          "Procuramos que esta información sea correcta y esté al día, pero puede contener errores o quedar desactualizada..",
        ],
      },
      {
        heading: "Cambios y contacto",
        paragraphs: [
          "Podemos actualizar estos términos; la fecha al principio indica la versión más reciente. Si tiene preguntas, llame a nuestra oficina al (915) 256-9708.",
        ],
      },
    ],
  },
};

/** Markers used in drafts for facts that still need confirmation. */
const PLACEHOLDER = /\[(PENDING|PENDIENTE)\b/;

/** True if any heading or paragraph, in either language, still has a [PENDING] / [PENDIENTE] marker. */
export function hasPlaceholders(document: Localized<LegalDocument>): boolean {
  return Object.values(document).some((version) =>
    version.sections.some((section) => PLACEHOLDER.test(section.heading) || section.paragraphs.some((paragraph) => PLACEHOLDER.test(paragraph))),
  );
}
