import type { Localized } from "../config/types.ts";

/**
 * Silvia's personal message, shown after "Meet Silvia".
 *
 * DRAFT: this is an editorial proposal written by the web team, not Silvia's own words yet.
 * While `approved` is false the section only renders in development (`next dev`); production
 * builds leave it out of the HTML entirely. Set `approved: true` only after Silvia has read,
 * edited if needed, and approved both languages.
 *
 * Only import this file from server components, so the draft never ships in the public JavaScript.
 */
export const silviaMessage: { approved: boolean; title: Localized; paragraphs: Localized<string[]> } = {
  approved: false,
  // {agent} is filled with site.agentName, so the name is written the same way as in the rest of the site.
  title: {
    es: "Un mensaje de {agent}",
    en: "A message from {agent}",
  },
  paragraphs: {
    es: [
      "Para mí, ayudar a las personas a comprender sus opciones de seguro médico es mucho más que un trabajo: es una oportunidad para orientar a las familias y acompañarlas en una decisión importante para su bienestar.",
      "En {business}, creemos que cada persona merece recibir atención personalizada, respuestas claras y la orientación necesaria para comprender las opciones disponibles.",
      "Mi compromiso es seguir trabajando junto a mi equipo para que nuestros clientes se sientan escuchados, informados y acompañados durante su proceso.",
      "Gracias por confiar en nosotros y permitirnos formar parte de algo tan importante como el cuidado de su salud.",
    ],
    en: [
      "For me, helping people understand their health insurance options is much more than a job: it's a chance to guide families and stand by them as they make an important decision for their well-being.",
      "At {business}, we believe everyone deserves personal attention, clear answers and the guidance they need to understand the options available to them.",
      "My commitment is to keep working alongside my team so our clients feel heard, informed and supported every step of the way.",
      "Thank you for trusting us and for letting us be part of something as important as caring for your health.",
    ],
  },
};
