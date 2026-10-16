import type { Localized } from "../../config/types.ts";
import type { LegalDocument } from "./index.ts";

/**
 * WORKING DRAFTS — NOT LEGAL ADVICE AND NOT APPROVED.
 *
 * Written by the web team from what the site actually does (checked in the code on 2026-10-15):
 * - No contact form is active (site.leadForm = false). The form code exists and, if enabled, would send
 *   name, phone, email, topic, contact preference, language, consent text, IP address and browser
 *   (user agent) to a webhook or by email (src/lib/submit-lead.ts, src/lib/leads.ts).
 * - One cookie, NEXT_LOCALE, remembers the chosen language for 1 year (src/proxy.ts).
 * - No analytics, advertising pixels or tracking scripts.
 * - Google Maps iframes are embedded for each office (loaded from Google when they come into view).
 * - Fonts, photos, videos and captions are served from the site itself (no third-party requests).
 * - Links to official sites (Medicare.gov, HealthCare.gov, Texas HHS…) open in a new tab.
 * - Hosting: netlify.toml is present, but the production host is not confirmed.
 *
 * Every [PENDING] / [PENDIENTE] item needs an answer from Silvia; the whole text needs review by a
 * lawyer or the agency's compliance contact before it is moved to ./index.ts. These drafts are only
 * shown in development (`next dev`), marked as drafts; production builds never import them.
 */

export const privacyPolicyDraft: Localized<LegalDocument> = {
  en: {
    updated: "2026-10-15",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "This website belongs to Advantage Insurance Plans by Silvia Alcazar [PENDING: exact legal name of the business that operates the site, e.g. the LLC or the agent's name], with its main office at 4900 Alameda Ave, Ste E, El Paso, TX 79905.",
          "This policy explains what information this website collects when you visit it. It does not cover what you share with our office by phone or in person, which is handled as described by our office [PENDING: confirm whether a separate notice exists for calls and appointments].",
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
          "Like most websites, our hosting provider [PENDING: confirm the production host, e.g. Netlify] automatically records technical information such as your IP address, browser type and the pages requested, to deliver the site and protect it from abuse. [PENDING: how long these logs are kept, from the host's terms].",
        ],
      },
      {
        heading: "How we use and share information",
        paragraphs: [
          "We do not sell personal information. [PENDING: Silvia confirms the office does not sell or share website information with other agencies, carriers or marketing companies, and lists any service provider that would receive it].",
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
          "For questions about this policy, call our office at (915) 256-9708 or write to [PENDING: official email or mailing address for privacy requests]. [PENDING: legal review of any rights that apply under Texas or New Mexico law].",
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
          "Este sitio web pertenece a Advantage Insurance Plans by Silvia Alcazar [PENDIENTE: nombre legal exacto del negocio que opera el sitio, por ejemplo la LLC o el nombre de la agente], con oficina principal en 4900 Alameda Ave, Ste E, El Paso, TX 79905.",
          "Esta política explica qué información recopila este sitio web cuando usted lo visita. No cubre lo que usted comparte con nuestra oficina por teléfono o en persona, que se maneja según lo indique nuestra oficina [PENDIENTE: confirmar si existe un aviso aparte para llamadas y citas].",
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
          "Como la mayoría de los sitios web, nuestro proveedor de alojamiento [PENDIENTE: confirmar el proveedor de producción, por ejemplo Netlify] registra automáticamente información técnica como su dirección IP, el tipo de navegador y las páginas solicitadas, para mostrar el sitio y protegerlo de abusos. [PENDIENTE: cuánto tiempo se guardan estos registros, según las condiciones del proveedor].",
        ],
      },
      {
        heading: "Cómo usamos y compartimos la información",
        paragraphs: [
          "No vendemos información personal. [PENDIENTE: Silvia confirma que la oficina no vende ni comparte la información del sitio con otras agencias, aseguradoras ni empresas de mercadeo, y enumera cualquier proveedor de servicios que la recibiría].",
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
          "Si tiene preguntas sobre esta política, llame a nuestra oficina al (915) 256-9708 o escriba a [PENDIENTE: correo oficial o dirección postal para solicitudes de privacidad]. [PENDIENTE: revisión legal de los derechos que apliquen según las leyes de Texas o Nuevo México].",
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

export const termsOfUseDraft: Localized<LegalDocument> = {
  en: {
    updated: "2026-10-15",
    sections: [
      {
        heading: "About this website",
        paragraphs: [
          "This website is operated by Advantage Insurance Plans by Silvia Alcazar [PENDING: exact legal name of the business]. By using it, you agree to these terms.",
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
          "[PENDING: Silvia confirms the states where she and the agency are licensed, so this section can say where the office may offer insurance].",
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
          "The text, photos and videos on this website belong to their owners and may not be copied for commercial use without permission. [PENDING: Silvia confirms the office has the rights to publish the TV commercial, the award interview and the TelevisaUnivision event photos].",
        ],
      },
      {
        heading: "Responsibility",
        paragraphs: [
          "We work to keep this information accurate and up to date, but it may contain errors or become outdated. [PENDING: any limitation of liability or governing-law clause must be written by a lawyer; none is included in this draft].",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "We may update these terms; the date at the top shows the latest version. For questions, call our office at (915) 256-9708 [PENDING: official email].",
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
          "Este sitio web lo opera Advantage Insurance Plans by Silvia Alcazar [PENDIENTE: nombre legal exacto del negocio]. Al usarlo, usted acepta estos términos.",
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
          "[PENDIENTE: Silvia confirma los estados donde ella y la agencia tienen licencia, para que esta sección indique dónde puede ofrecer seguros la oficina].",
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
          "Los textos, fotos y videos de este sitio pertenecen a sus dueños y no pueden copiarse para uso comercial sin permiso. [PENDIENTE: Silvia confirma que la oficina tiene los derechos para publicar el comercial de televisión, la entrevista del reconocimiento y las fotos del evento de TelevisaUnivision].",
        ],
      },
      {
        heading: "Responsabilidad",
        paragraphs: [
          "Procuramos que esta información sea correcta y esté al día, pero puede contener errores o quedar desactualizada. [PENDIENTE: cualquier limitación de responsabilidad o cláusula de ley aplicable debe redactarla un abogado; este borrador no incluye ninguna].",
        ],
      },
      {
        heading: "Cambios y contacto",
        paragraphs: [
          "Podemos actualizar estos términos; la fecha al principio indica la versión más reciente. Si tiene preguntas, llame a nuestra oficina al (915) 256-9708 [PENDIENTE: correo oficial].",
        ],
      },
    ],
  },
};
