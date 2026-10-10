import type { en } from "./en";

// UI copy in Spanish. Must mirror the structure of en.ts.
export const es: typeof en = {
  meta: {
    title: "{business} | Ayuda con Medicare, Medicaid y el Mercado de Seguros",
    description:
      "{agent} de {business} ayuda a personas de 65 años o más y personas con discapacidades a entender sus opciones de Medicare, Medicaid y el Mercado de Seguros Médicos. Hable con una persona real.",
  },
  nav: {
    skip: "Saltar al contenido principal",
    services: "Servicios",
    howWeHelp: "Cómo le ayudamos",
    about: "Quiénes somos",
    contact: "Contacto",
    call: "Llame a la oficina",
    callShort: "Llamar",
    getHelp: "Pedir ayuda",
    language: "Idioma",
    phonePending: "Teléfono de la oficina: pendiente",
  },
  hero: {
    title: "Medicare y su cobertura médica, explicados de forma sencilla",
    subtitle:
      "Ayudamos a adultos mayores y a personas con discapacidades que califican a entender sus opciones de cobertura médica y a encontrar planes que se ajusten a sus necesidades.",
    ctaHelp: "Quiero ayuda con mi cobertura",
    ctaCall: "Llame a la oficina",
    realPerson: "Hable con una persona real",
    otherLanguage: "We speak English",
    office: "Oficina en {city}, {state}",
    photoAlt: "{agent}, {business}",
  },
  services: {
    title: "¿En qué le podemos ayudar?",
    intro: "Elija el tema sobre el que tiene preguntas. Se lo explicamos con palabras sencillas.",
    different:
      "Medicare, Medicaid y el Mercado de Seguros son programas diferentes. ¿No sabe cuál es para usted? Le ayudamos a averiguarlo.",
    disclaimer:
      "Cada programa tiene sus propias reglas para calificar. Los planes y beneficios varían según el lugar, y no todos los planes están disponibles en todas las áreas.",
    forWhom: "Generalmente para:",
    items: {
      medicare: {
        title: "Medicare",
        body: "Medicare es la cobertura médica para personas de 65 años o más y para algunas personas más jóvenes con discapacidades. Le ayudamos a entender sus opciones de Medicare y a revisar los planes que podemos ofrecerle donde usted vive, según sus necesidades.",
        forWhom: "Personas de 65 años o más y algunas personas con discapacidades",
        cta: "Ayuda con Medicare",
      },
      medicaid: {
        title: "Medicaid",
        body: "Medicaid puede ayudar a personas con ingresos y recursos limitados. Cada estado tiene sus propias reglas. Le explicamos las opciones de cobertura y lo que normalmente se necesita para solicitarlo. Su estado decide quién califica.",
        forWhom: "Personas con ingresos y recursos limitados",
        cta: "Información sobre Medicaid",
      },
      aca: {
        title: "Obamacare / Mercado de Seguros (ACA)",
        body: "El Mercado de Seguros Médicos (CuidadoDeSalud.gov) es donde las personas pueden comprar un seguro médico. Es principalmente para personas que no tienen Medicare. Le ayudamos a entender las opciones y a ver para qué planes podría calificar.",
        forWhom: "Personas sin Medicare que necesitan seguro médico",
        cta: "Ver opciones de cobertura",
      },
    },
  },
  terms: {
    title: "Palabras que puede escuchar",
    intro: "La cobertura médica usa muchos nombres. Esto es lo que significan los más comunes.",
    items: [
      {
        term: "Medicare Original",
        meaning: "El programa de Medicare administrado por el gobierno federal. La Parte A ayuda a pagar estadías en el hospital. La Parte B ayuda a pagar visitas al médico.",
      },
      {
        term: "Medicare Advantage (Parte C)",
        meaning: "Otra forma de recibir Medicare. Estos planes son de compañías privadas aprobadas por Medicare. Incluyen la Parte A y la Parte B, y muchos incluyen cobertura de medicamentos.",
      },
      {
        term: "Parte D",
        meaning: "Cobertura que ayuda a pagar medicamentos recetados.",
      },
      {
        term: "Medicaid",
        meaning: "Un programa de cada estado para personas con ingresos y recursos limitados. Algunas personas tienen Medicare y Medicaid a la vez.",
      },
      {
        term: "Mercado de Seguros (Obamacare)",
        meaning: "El lugar oficial para comprar seguro médico, en CuidadoDeSalud.gov. La ayuda con el costo depende de sus ingresos.",
      },
    ],
  },
  steps: {
    title: "Cómo le ayudamos",
    intro: "Pedir ayuda es sencillo. Esto es lo que puede esperar.",
    items: [
      { title: "Cuéntenos qué necesita", body: "Llámenos o visite nuestra oficina. Cuéntenos su situación y qué tipo de ayuda busca." },
      { title: "Entienda sus opciones", body: "Le ayudamos a entender las opciones de cobertura médica que podrían estar disponibles para usted." },
      { title: "Reciba orientación personal", body: "Revisamos las alternativas con usted, para que pueda compararlas y tomar una decisión informada." },
    ],
    note: "Sin presiones. Usted decide lo que es mejor para usted.",
    cta: "Comuníquese con la oficina",
  },
  about: {
    title: "Conozca a {agent}",
    role: "Su contacto en {business}",
    fallback:
      "{agent} es su contacto en {business}. Nuestra oficina ayuda a las personas a entender sus opciones de Medicare, Medicaid y el Mercado de Seguros.",
    howWeHelp:
      "Nos tomamos el tiempo para escucharle y responder sus preguntas con palabras sencillas. Puede hablar con nosotros por teléfono o visitar nuestra oficina.",
    carriersTitle: "Algunas de las compañías con las que trabajamos",
    carriersNote: "Los planes y compañías disponibles dependen de dónde vive.",
    cta: "Comuníquese con la oficina",
    photoAlt: "Retrato de {agent}",
  },
  testimonials: {
    title: "Lo que dicen nuestros clientes",
  },
  contact: {
    title: "Comuníquese con la oficina",
    subtitle: "Llámenos o visite nuestra oficina. Con gusto le ayudamos.",
    subtitleWithTime: "Llámenos o visite nuestra oficina. {agentFirst} normalmente le responderá en {time}.",
    callTitle: "¿Prefiere hablar? Llámenos",
    phone: "Teléfono",
    email: "Correo",
    hours: "Horario de la oficina",
    area: "Zona de servicio",
    address: "Dirección de la oficina",
    book: "Agendar una cita",
    closed: "Cerrado",
    officeAlt: "Oficina de {business}",
    mapTitle: "Mapa con la ubicación de {business}",
    directions: "Cómo llegar",
    officesTitle: "Nuestras oficinas",
    mainOffice: "Oficina principal",
    office: "Oficina {number}",
    officePending: "Dirección pendiente",
  },
  form: {
    title: "Solicitar ayuda",
    intro: "Solo unas preguntas. Nosotros le llamamos.",
    name: "Su nombre",
    phone: "Número de teléfono",
    email: "Correo electrónico",
    optional: "opcional",
    help: "¿Con qué necesita ayuda?",
    helpPlaceholder: "Elija una opción",
    helpOptions: {
      medicare: "Medicare",
      medicaid: "Medicaid",
      aca: "Mercado de Seguros (Obamacare)",
      other: "Otra cosa / No estoy seguro",
    },
    contactMethod: "¿Cómo prefiere que le contactemos?",
    methodPhone: "Llamada",
    methodText: "Mensaje de texto",
    methodEmail: "Correo electrónico",
    language: "Idioma preferido",
    sensitiveHint: "Por favor no envíe su número de Medicare, su número de Seguro Social ni información médica en este formulario.",
    consent: "Acepto que {business} me contacte por teléfono o correo electrónico sobre mi solicitud.",
    smsConsent:
      "Acepto recibir mensajes de texto de {business} sobre mi solicitud. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para cancelar. El consentimiento no es condición de compra.",
    privacyLink: "Política de privacidad",
    submit: "Solicitar ayuda",
    sending: "Enviando…",
    success: "¡Gracias, {name}! Recibimos su solicitud. {agentFirst} se comunicará con usted pronto.",
    required: "Obligatorio",
    errors: {
      name: "Por favor escriba su nombre.",
      contact: "Por favor escriba un teléfono o un correo electrónico.",
      phone: "Por favor escriba un teléfono válido de EE. UU., por ejemplo (915) 555-0123.",
      email: "Por favor escriba un correo electrónico válido.",
      consent: "Por favor marque esta casilla para que podamos contactarle.",
      text: "Para recibir mensajes de texto, escriba un teléfono y marque la casilla de mensajes de texto.",
      generic: "Lo sentimos, algo salió mal y su solicitud no se envió. Intente de nuevo o llame a la oficina.",
      rateLimited: "Demasiados intentos. Espere unos minutos e intente de nuevo.",
      unavailable: "Lo sentimos, no pudimos enviar su solicitud en línea en este momento. Por favor llame a la oficina.",
    },
  },
  footer: {
    rights: "Todos los derechos reservados.",
    licensed: "Con licencia en {state}",
    license: "Licencia n.º {number}",
    privacy: "Política de privacidad",
    terms: "Términos de uso",
    medicareDisclaimer:
      "No ofrecemos todos los planes disponibles en su área. Actualmente representamos a {organizations} organizaciones que ofrecen {products} productos en su área. Comuníquese con Medicare.gov, 1-800-MEDICARE o con el Programa Estatal de Asistencia sobre Seguros de Salud (SHIP) de su localidad para obtener información sobre todas sus opciones.",
    governmentDisclaimer:
      "{business} no está vinculado ni respaldado por el gobierno de EE. UU. ni por el programa federal de Medicare.",
    marketplaceDisclaimer:
      "{business} no es el Mercado de Seguros Médicos® (CuidadoDeSalud.gov). También puede solicitar cobertura directamente en CuidadoDeSalud.gov.",
    medicaidDisclaimer: "La agencia de Medicaid de su estado decide quién califica para Medicaid.",
  },
  legal: {
    privacyTitle: "Política de privacidad",
    termsTitle: "Términos de uso",
    pendingTitle: "Esta página está en preparación",
    pendingBody: "Estamos terminando este documento. Si tiene preguntas mientras tanto, comuníquese con la oficina.",
    lastUpdated: "Última actualización: {date}",
  },
  notFound: {
    title: "Página no encontrada",
    body: "La página que busca no existe o fue movida.",
    home: "Volver al inicio",
  },
  draft: {
    title: "Vista previa — pendiente antes del lanzamiento",
    hint: "Solo visible en desarrollo. Ejecute npm run check:launch para ver detalles.",
  },
};
