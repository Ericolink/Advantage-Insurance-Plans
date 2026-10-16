import type { PagesContent } from "./types";

// Páginas internas en español. Deben tener las mismas páginas, secciones e ids de preguntas que en.ts.
// Datos comprobados en Medicare.gov, CuidadoDeSalud.gov y Texas HHS el 10/10/2026. Revisar las fechas cada año.
// Trato de "usted", lenguaje cotidiano, sin promesas de elegibilidad, ahorro ni beneficios.

const MEDICARE = "https://es.medicare.gov";

export const esPages: PagesContent = {
  medicare: {
    metaTitle: "Ayuda con Medicare en El Paso, TX: Partes A, B, C y D",
    metaDescription:
      "Medicare explicado con palabras sencillas: Partes A, B, C y D, Medicare Original o Medicare Advantage, y cuándo puede inscribirse o hacer cambios. Hable con nuestra oficina en El Paso.",
    label: "Medicare",
    title: "Medicare, explicado con palabras sencillas",
    intro:
      "Medicare es el seguro médico del gobierno federal para personas de 65 años o más y para algunas personas más jóvenes con discapacidades. Aquí tiene lo básico, para que pueda hacer mejores preguntas y tomar su propia decisión.",
    sections: [
      {
        id: "who",
        heading: "¿Quién puede tener Medicare?",
        blocks: [
          { type: "p", text: "En general, Medicare es para:" },
          {
            type: "list",
            items: [
              "Personas de 65 años o más que cumplen los requisitos de ciudadanía o residencia.",
              "Personas menores de 65 años que reciben beneficios por discapacidad del Seguro Social. Normalmente Medicare empieza de forma automática después de 24 meses de recibir esos beneficios.",
              "Personas con ELA (esclerosis lateral amiotrófica) o con enfermedad renal en etapa final (falla permanente de los riñones).",
            ],
          },
          { type: "note", text: "Cada caso es diferente. Quienes deciden si usted califica son el Seguro Social y Medicare, no nuestra oficina." },
          {
            type: "image",
            image: "medicareCard",
            alt: "Ilustración de una tarjeta de Medicare en blanco: una franja azul con la palabra MEDICARE arriba, líneas vacías en el centro y una franja roja abajo",
            caption: "Ilustración de una tarjeta de Medicare. No contiene datos personales.",
          },
        ],
      },
      {
        id: "parts",
        heading: "Las partes de Medicare",
        blocks: [
          {
            type: "list",
            items: [
              "Parte A (seguro de hospital): ayuda a pagar estadías en el hospital, cuidado en un centro de enfermería especializada, cuidados paliativos (hospicio) y algunos cuidados de salud en el hogar.",
              "Parte B (seguro médico): ayuda a pagar consultas médicas, atención ambulatoria, servicios preventivos y algunos equipos médicos.",
              "Parte C (Medicare Advantage): otra forma de recibir la Parte A y la Parte B, a través de una compañía privada aprobada por Medicare.",
              "Parte D (cobertura de medicamentos): ayuda a pagar medicamentos recetados. Puede ser un plan de medicamentos aparte o venir incluida en muchos planes Medicare Advantage.",
            ],
          },
        ],
      },
      {
        id: "two-ways",
        heading: "Dos formas de recibir Medicare",
        blocks: [
          {
            type: "p",
            text: "Medicare Original es la Parte A y la Parte B, administradas por el gobierno federal. Puede añadir un plan de medicamentos aparte (Parte D) y es posible que pueda comprar un seguro suplementario de Medicare (Medigap) para ayudar con los costos que Medicare Original no paga.",
          },
          {
            type: "p",
            text: "Los planes Medicare Advantage (Parte C) son de compañías privadas aprobadas por Medicare. Cubren todo lo que cubren la Parte A y la Parte B, la mayoría incluye medicamentos y algunos ofrecen beneficios adicionales. Normalmente tienen una red de médicos y sus propias reglas.",
          },
          {
            type: "table",
            caption: "Medicare Original y Medicare Advantage: diferencias generales (fuente: Medicare.gov)",
            headers: ["Tema", "Medicare Original", "Medicare Advantage"],
            rows: [
              [
                "Médicos y hospitales",
                "Cualquier médico u hospital de EE. UU. que acepte Medicare.",
                "Es posible que deba usar médicos de la red y del área de servicio del plan (salvo emergencias).",
              ],
              [
                "Límite anual de lo que usted paga",
                "No hay límite anual, salvo que tenga otra cobertura, como Medigap.",
                "Los planes tienen un límite anual de lo que usted paga por los servicios cubiertos por Medicare.",
              ],
              [
                "Prima mensual",
                "Usted paga la prima de la Parte B, y la de un plan de medicamentos si se inscribe en uno.",
                "Usted paga la prima de la Parte B y es posible que también pague una prima del plan.",
              ],
              [
                "Medicamentos recetados",
                "Puede inscribirse en un plan de medicamentos aparte (Parte D).",
                "La mayoría de los planes incluye cobertura de medicamentos.",
              ],
              [
                "Beneficios adicionales (dental, visión, audición)",
                "La mayoría no están cubiertos.",
                "Algunos planes ofrecen beneficios adicionales. Varían según el plan.",
              ],
              [
                "Autorizaciones y referidos",
                "En la mayoría de los casos no necesita autorización previa ni referido.",
                "Es posible que necesite autorización antes de algunos servicios, o un referido para ver a un especialista.",
              ],
              [
                "Medigap",
                "Es posible que pueda comprar un seguro Medigap.",
                "No se puede usar un seguro Medigap junto con un plan Medicare Advantage.",
              ],
            ],
          },
          {
            type: "note",
            text: "Ninguna de las dos opciones es la mejor para todos. Lo que le conviene depende de sus médicos, sus medicamentos, su presupuesto y cómo prefiere recibir atención. Los planes, costos y beneficios cambian cada año y dependen de dónde vive.",
          },
        ],
      },
      {
        id: "compare",
        heading: "Qué revisar al comparar coberturas",
        blocks: [
          {
            type: "list",
            items: [
              "¿Sus médicos, especialistas y hospital están en la red del plan?",
              "¿Sus medicamentos están cubiertos y cuánto le costarían?",
              "¿Qué farmacia usa y está en la red?",
              "¿Cuánto pagaría cada mes y cuánto es lo máximo que podría pagar en un año?",
              "¿Necesita un referido o una autorización para la atención que más usa?",
              "¿Viaja o pasa parte del año fuera del área del plan?",
            ],
          },
        ],
      },
      {
        id: "dates",
        heading: "¿Cuándo puede inscribirse o hacer cambios?",
        blocks: [
          {
            type: "list",
            items: [
              "Periodo de Inscripción Inicial: normalmente 7 meses alrededor de su cumpleaños número 65. Empieza 3 meses antes del mes en que cumple 65 y termina 3 meses después.",
              "Periodo de Inscripción Abierta: cada año del 15 de octubre al 7 de diciembre. Los cambios empiezan el 1 de enero.",
              "Periodo de Inscripción Abierta de Medicare Advantage: del 1 de enero al 31 de marzo, solo si ya tiene un plan Medicare Advantage. Puede cambiarse de plan o volver a Medicare Original.",
              "Periodos de Inscripción Especial: para ciertos cambios en su vida, por ejemplo si se muda, pierde otra cobertura, o recibe Medicaid o Ayuda Adicional (Extra Help).",
            ],
          },
          {
            type: "note",
            text: "Si no se inscribe en su primera oportunidad, es posible que tenga que esperar y que pague una multa por inscripción tardía. Confirme siempre sus fechas en Medicare.gov o con el Seguro Social.",
          },
        ],
      },
      {
        id: "office",
        heading: "Cómo le puede ayudar nuestra oficina",
        blocks: [
          {
            type: "p",
            text: "{agentFirst} puede explicarle estas opciones con palabras sencillas, en persona o por teléfono, y responder sus preguntas antes de que usted decida.",
          },
          { type: "scope", items: ["medicareAdvantage", "partD", "medigap"] },
        ],
      },
      {
        id: "sources",
        heading: "Información oficial",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Medicare.gov: Cómo empezar con Medicare", href: `${MEDICARE}/basics/get-started-with-medicare`, text: "Quién califica y cómo inscribirse." },
              {
                label: "Medicare.gov: Compare Medicare Original y Medicare Advantage",
                href: `${MEDICARE}/basics/get-started-with-medicare/get-more-coverage/your-coverage-options/compare-original-medicare-medicare-advantage`,
                text: "La comparación oficial en la que se basa esta página.",
              },
              { label: "Medicare.gov: Cómo inscribirse en un plan", href: `${MEDICARE}/basics/get-started-with-medicare/get-more-coverage/joining-a-plan`, text: "Periodos de inscripción y fechas." },
              { label: "Buscador de planes de Medicare", href: `${MEDICARE}/plan-compare/`, text: "Todos los planes disponibles en su área." },
              { label: "1-800-MEDICARE (1-800-633-4227)", href: `${MEDICARE}/talk-to-someone`, text: "Las 24 horas, los 7 días de la semana. TTY: 1-877-486-2048." },
            ],
          },
        ],
      },
    ],
    related: ["dual", "firstVisit", "faq"],
  },

  medicaid: {
    metaTitle: "Medicaid en El Paso, TX: qué es y cómo solicitarlo",
    metaDescription:
      "Qué es Medicaid, quién decide la elegibilidad en Texas y dónde solicitarlo. Orientación con palabras sencillas para adultos mayores y personas con discapacidades en El Paso.",
    label: "Medicaid",
    title: "Medicaid en Texas: lo básico",
    intro:
      "Medicaid es un programa de cobertura médica para personas con ingresos y recursos limitados. En Texas lo administra la Comisión de Salud y Servicios Humanos (Texas HHS), que decide quién califica.",
    sections: [
      {
        id: "what",
        heading: "¿Qué es Medicaid?",
        blocks: [
          {
            type: "p",
            text: "Medicaid lo administran juntos el gobierno federal y cada estado. Cada estado pone sus propias reglas sobre quién califica y qué se cubre, así que las reglas de Texas pueden ser distintas a las de otros estados.",
          },
          {
            type: "p",
            text: "En Texas, Medicaid tiene programas para niños y familias, para adultos mayores y para adultos con discapacidades. Algunos programas ayudan con cuidados a largo plazo o cuidados en el hogar.",
          },
          {
            type: "image",
            image: "texasMedicaidCard",
            alt: "Tarjeta de identificación de Medicaid de Texas en blanco, con el logotipo de Your Texas Benefits y de la Comisión de Salud y Servicios Humanos, y campos vacíos para el nombre del miembro y el número de Medicaid",
            caption: "Ejemplo de una tarjeta de identificación de Medicaid de Texas (Your Texas Benefits), en blanco y sin datos personales.",
          },
        ],
      },
      {
        id: "who",
        heading: "¿Quién decide si usted califica?",
        blocks: [
          {
            type: "p",
            text: "Solo Texas HHS puede decidir si usted califica. Revisa cosas como sus ingresos, sus recursos, su edad o discapacidad y dónde vive. Nuestra oficina no puede decirle si lo van a aprobar.",
          },
          {
            type: "note",
            text: "Tenga cuidado con cualquier persona que le prometa que va a calificar o a recibir un beneficio. Solo el estado puede tomar esa decisión.",
          },
        ],
      },
      {
        id: "apply",
        heading: "Cómo solicitarlo en Texas",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Solicítelo en internet", text: "Entre a YourTexasBenefits.com para conocer los programas, presentar su solicitud y revisar su caso." },
              { title: "Busque ayuda local", text: "Puede marcar 2-1-1 o visitar 211texas.org para encontrar ayuda cerca de usted." },
              { title: "Responda las cartas del estado", text: "Texas HHS puede pedirle documentos. Guarde copias y responda antes de la fecha que indica la carta." },
            ],
          },
        ],
      },
      {
        id: "medicare",
        heading: "Si también tiene Medicare",
        blocks: [
          {
            type: "p",
            text: "Algunas personas califican para Medicare y Medicaid al mismo tiempo. Medicaid también puede ayudar a algunas personas a pagar los costos de Medicare. Lea nuestra página sobre tener los dos programas.",
          },
        ],
      },
      {
        id: "office",
        heading: "Cómo le puede ayudar nuestra oficina",
        blocks: [
          {
            type: "p",
            text: "Podemos explicarle cómo funciona Medicaid junto con otras coberturas y qué suele pedir la solicitud, para que sepa qué esperar.",
          },
          { type: "scope", items: ["medicaidApplications"] },
        ],
      },
      {
        id: "sources",
        heading: "Información oficial",
        blocks: [
          {
            type: "links",
            items: [
              { label: "YourTexasBenefits.com", href: "https://www.yourtexasbenefits.com/Learn/Home?lang=es_US", text: "Solicite Medicaid y otros beneficios de Texas." },
              { label: "Texas HHS: Medicaid y CHIP", href: "https://www.hhs.texas.gov/services/health/medicaid-chip", text: "Programas para adultos mayores, personas con discapacidades y familias (en inglés)." },
              { label: "2-1-1 Texas", href: "https://www.211texas.org/", text: "Encuentre ayuda local. Marque 2-1-1." },
            ],
          },
        ],
      },
    ],
    related: ["dual", "firstVisit", "resources"],
  },

  dual: {
    metaTitle: "Medicare y Medicaid al mismo tiempo (doble elegibilidad) en El Paso, TX",
    metaDescription:
      "¿Puede tener Medicare y Medicaid a la vez? Cómo funcionan juntos, ayuda con los costos de Medicare y dónde revisar sus opciones en Texas.",
    label: "Medicare y Medicaid",
    title: "Tener Medicare y Medicaid al mismo tiempo",
    intro:
      "Algunas personas califican para los dos programas. A esto se le suele llamar “doble elegibilidad”. Tener los dos puede bajar lo que usted paga por su atención, pero las reglas son detalladas, así que conviene entender lo básico.",
    sections: [
      {
        id: "how",
        heading: "Cómo funcionan juntos los dos programas",
        blocks: [
          {
            type: "list",
            items: [
              "Medicare paga primero los servicios que cubre.",
              "Medicaid paga al final, después de Medicare y de cualquier otro seguro que tenga.",
              "Medicaid puede cubrir algunas cosas que Medicare no cubre, según el programa para el que califique.",
            ],
          },
        ],
      },
      {
        id: "costs",
        heading: "Ayuda con los costos de Medicare",
        blocks: [
          {
            type: "list",
            items: [
              "Programas de Ahorros de Medicare: los administra el estado. Pueden ayudar a pagar las primas de la Parte A y la Parte B de Medicare y, en algunos casos, otros costos.",
              "Ayuda Adicional (Extra Help): un programa que baja el costo de los medicamentos recetados. Las personas con Medicaid completo la reciben automáticamente.",
            ],
          },
          { type: "note", text: "Texas decide quién califica para Medicaid y para los Programas de Ahorros de Medicare. Pida al estado que revise su caso." },
        ],
      },
      {
        id: "plans",
        heading: "Planes para personas que tienen los dos",
        blocks: [
          {
            type: "p",
            text: "Existen planes de Medicare pensados para personas que tienen Medicare y Medicaid, llamados Planes de Necesidades Especiales para Personas con Doble Elegibilidad (D-SNP). Que haya uno disponible, y que le convenga, depende de dónde vive y de su cobertura de Medicaid.",
          },
          {
            type: "p",
            text: "Si tiene los dos programas, también es posible que tenga más oportunidades durante el año para cambiar su cobertura de Medicare. Revise sus opciones en Medicare.gov.",
          },
        ],
      },
      {
        id: "office",
        heading: "Cómo le puede ayudar nuestra oficina",
        blocks: [
          {
            type: "p",
            text: "Traiga sus cartas o tarjetas de Medicare y Medicaid, y le ayudamos a entender qué tiene ahora y qué preguntas hacer.",
          },
          { type: "scope", items: ["dsnp", "medicaidApplications"] },
        ],
      },
      {
        id: "sources",
        heading: "Información oficial",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Medicare.gov: Medicaid", href: `${MEDICARE}/basics/costs/help/medicaid`, text: "Cómo funcionan juntos Medicare y Medicaid." },
              { label: "Medicare.gov: Programas de Ahorros de Medicare", href: `${MEDICARE}/basics/costs/help/medicare-savings-programs`, text: "Ayuda para pagar las primas de Medicare." },
              { label: "Medicare.gov: Ayuda Adicional", href: `${MEDICARE}/basics/costs/help/drug-costs`, text: "Ayuda con el costo de los medicamentos." },
              {
                label: "Texas HHS: Cobertura doble de Medicare y Medicaid",
                href: "https://www.hhs.texas.gov/services/health/medicaid-chip/medicaid-chip-programs-services/options-medicare-medicaid-dual-coverage",
                text: "Opciones en Texas para personas con los dos programas (en inglés).",
              },
              { label: "YourTexasBenefits.com", href: "https://www.yourtexasbenefits.com/Learn/Home?lang=es_US", text: "Solicite programas de Texas." },
            ],
          },
        ],
      },
    ],
    related: ["medicare", "medicaid", "firstVisit"],
  },

  aca: {
    metaTitle: "Mercado de Seguros Médicos (ACA / Obamacare) en El Paso, TX",
    metaDescription:
      "Qué es el Mercado de Seguros Médicos, para quién es, la ayuda con el costo, las fechas de inscripción y qué cambia cuando usted recibe Medicare.",
    label: "Mercado de Seguros",
    title: "El Mercado de Seguros Médicos (ACA / Obamacare)",
    intro:
      "El Mercado de Seguros es donde las personas pueden comprar un seguro médico privado. La ley que lo creó es la Ley de Cuidado de Salud a Bajo Precio (ACA), que muchas personas llaman “Obamacare”. En Texas, el Mercado es CuidadoDeSalud.gov (HealthCare.gov).",
    sections: [
      {
        id: "who",
        heading: "¿Para quién es?",
        blocks: [
          {
            type: "list",
            items: [
              "Personas y familias que no reciben seguro médico por su trabajo, por Medicare o por Medicaid.",
              "Personas que están perdiendo otra cobertura, por ejemplo al dejar un trabajo.",
            ],
          },
          { type: "p", text: "Los planes del Mercado, en general, no son para personas que ya tienen Medicare." },
        ],
      },
      {
        id: "costs",
        heading: "Ayuda con el costo",
        blocks: [
          {
            type: "p",
            text: "Según los ingresos y el tamaño de su hogar, es posible que califique para ahorrar en su prima mensual y, en algunos planes, en lo que paga cuando recibe atención. El Mercado lo decide cuando usted presenta su solicitud.",
          },
          { type: "note", text: "Nadie puede prometerle un precio o un ahorro antes de que se revise su solicitud." },
        ],
      },
      {
        id: "dates",
        heading: "¿Cuándo puede inscribirse?",
        blocks: [
          {
            type: "list",
            items: [
              "Inscripción Abierta para la cobertura de 2027: del 1 de noviembre de 2026 al 15 de enero de 2027.",
              "Inscríbase a más tardar el 15 de diciembre para que la cobertura empiece el 1 de enero.",
              "Fuera de esas fechas, es posible que pueda inscribirse después de ciertos cambios en su vida, como perder su cobertura, mudarse o tener un bebé.",
            ],
          },
          { type: "p", text: "Las fechas pueden cambiar cada año. Revise las fechas vigentes en CuidadoDeSalud.gov." },
        ],
      },
      {
        id: "medicare",
        heading: "Si va a cumplir 65 años o va a recibir Medicare",
        blocks: [
          {
            type: "list",
            items: [
              "Su plan del Mercado no termina solo cuando empieza Medicare. Usted tiene que cancelarlo.",
              "Una vez que usted es elegible para la Parte A de Medicare, ya no puede seguir recibiendo ahorros en un plan del Mercado.",
              "Puede informar la fecha de inicio de Medicare hasta 3 meses antes, para que su plan del Mercado termine el día antes de que empiece Medicare.",
              "No espere para inscribirse en Medicare: si se pasa su periodo de inscripción, puede tener multas y retrasos.",
            ],
          },
        ],
      },
      {
        id: "office",
        heading: "Cómo le puede ayudar nuestra oficina",
        blocks: [
          { type: "p", text: "Podemos explicarle cómo funciona el Mercado y qué cambia cuando usted cumple 65 años." },
          { type: "scope", items: ["acaEnrollment"] },
        ],
      },
      {
        id: "sources",
        heading: "Información oficial",
        blocks: [
          {
            type: "links",
            items: [
              { label: "CuidadoDeSalud.gov", href: "https://www.cuidadodesalud.gov/es/", text: "El Mercado oficial. Llame al 1-800-318-2596 (TTY: 1-855-889-4325)." },
              { label: "CuidadoDeSalud.gov: Fechas y plazos", href: "https://www.cuidadodesalud.gov/es/quick-guide/dates-and-deadlines/", text: "Las fechas de inscripción de este año." },
              { label: "CuidadoDeSalud.gov: Costos más bajos", href: "https://www.cuidadodesalud.gov/es/lower-costs/", text: "Cómo se calculan los ahorros." },
              {
                label: "CuidadoDeSalud.gov: Cambiar del Mercado a Medicare",
                href: "https://www.cuidadodesalud.gov/es/medicare/changing-from-marketplace-to-medicare/",
                text: "Qué hacer cuando usted es elegible para Medicare.",
              },
            ],
          },
        ],
      },
    ],
    related: ["medicare", "medicaid", "faq"],
  },

  firstVisit: {
    metaTitle: "Su primera cita: qué esperar y qué traer",
    metaDescription:
      "Cómo prepararse para su primera conversación con nuestra oficina en El Paso: qué traer, de qué vamos a hablar y qué no debe enviar nunca por internet.",
    label: "Su primera cita",
    title: "Su primera cita: qué puede esperar",
    intro:
      "Hablar de su cobertura médica puede parecer mucho. Así puede prepararse para que la conversación sea tranquila y útil. Si tiene cualquier duda, simplemente llámenos y pregunte.",
    sections: [
      {
        id: "steps",
        heading: "Cómo funciona",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Llame a la oficina", text: "Cuéntenos con qué necesita ayuda. Le diremos cómo podemos ayudarle y cómo prepararse." },
              { title: "Hable con {agentFirst}", text: "Escuchamos su situación y le explicamos sus opciones con palabras sencillas." },
              { title: "Usted decide", text: "Puede tomarse su tiempo, hacer más preguntas o hablarlo con su familia. Sin presiones." },
            ],
          },
        ],
      },
      {
        id: "bring",
        heading: "Qué puede ser útil tener a la mano",
        blocks: [
          { type: "p", text: "No necesita todo esto. Cuando llame, pregunte qué es útil en su caso." },
          {
            type: "list",
            items: [
              "Su tarjeta de Medicare, si la tiene.",
              "Las tarjetas de su seguro médico actual, incluida la de Medicaid si la tiene.",
              "Una lista de sus medicamentos, con la dosis y cada cuánto los toma.",
              "Los nombres de sus médicos, especialistas y farmacia.",
              "Cartas de Medicare, del Seguro Social, de Medicaid o de su plan sobre las que tenga preguntas.",
              "Sus preguntas, por escrito, para que no se le olviden.",
            ],
          },
        ],
      },
      {
        id: "family",
        heading: "Si quiere venir con un familiar",
        blocks: [
          {
            type: "p",
            text: "Muchas personas prefieren venir con un hijo, una hija o la persona que les cuida. Avísenos cuando llame. Usted decide qué información se comparte y quién participa en la decisión.",
          },
        ],
      },
      {
        id: "medicare-rule",
        heading: "Una regla de Medicare que puede notar",
        blocks: [
          {
            type: "p",
            text: "Antes de hablar de planes específicos de Medicare, un agente con licencia tiene que confirmar con usted qué tipos de planes quiere conversar. Esto se llama “Alcance de la cita” (Scope of Appointment) y lo exige Medicare. No lo inscribe en nada.",
          },
        ],
      },
      {
        id: "privacy",
        heading: "Proteja su información",
        blocks: [
          {
            type: "note",
            text: "Nunca envíe su número de Seguro Social, su número de Medicare, su historial médico ni datos bancarios por un formulario en internet, mensaje de texto, correo electrónico o redes sociales. Mejor traiga sus documentos a la cita.",
          },
        ],
      },
    ],
    related: ["faq", "medicare", "resources"],
  },

  faq: {
    metaTitle: "Preguntas sobre Medicare, Medicaid y el Mercado de Seguros",
    metaDescription:
      "Respuestas sencillas a preguntas comunes sobre Medicare, Medicaid, el Mercado de Seguros (ACA), las fechas de inscripción y las citas, también para familiares y cuidadores.",
    label: "Preguntas",
    title: "Preguntas frecuentes",
    intro: "Respuestas cortas a las preguntas que más escuchamos. Cada situación es diferente, así que llámenos si su pregunta no está aquí.",
    sections: [
      {
        id: "medicare",
        heading: "Medicare",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "what-is-medicare",
                question: "¿Qué es Medicare?",
                answer: [
                  "Medicare es el seguro médico del gobierno federal para personas de 65 años o más y para algunas personas más jóvenes con discapacidades, ELA o falla permanente de los riñones.",
                  "Tiene cuatro partes: A (hospital), B (médico), C (Medicare Advantage) y D (medicamentos recetados).",
                ],
              },
              {
                id: "original-vs-advantage",
                question: "¿Cuál es la diferencia entre Medicare Original y Medicare Advantage?",
                answer: [
                  "Medicare Original lo administra el gobierno federal y le permite ir con cualquier médico de EE. UU. que acepte Medicare. Los planes Medicare Advantage son de compañías privadas aprobadas por Medicare. Normalmente tienen una red de médicos, la mayoría incluye medicamentos y tienen un límite anual de lo que usted paga.",
                  "Ninguno es el mejor para todos. Depende de sus médicos, sus medicamentos y su presupuesto.",
                ],
              },
              {
                id: "already-insured",
                question: "¿Qué pasa si ya tengo un seguro médico?",
                answer: [
                  "Depende del tipo de cobertura, por ejemplo un seguro del trabajo, un plan de jubilados o un plan del Mercado. Algunas coberturas funcionan junto con Medicare y otras no. Pregunte a su empleador o a su plan, y llámenos para revisar su situación juntos.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "medicaid",
        heading: "Medicaid",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "what-is-medicaid",
                question: "¿Qué es Medicaid?",
                answer: [
                  "Medicaid es un programa para personas con ingresos y recursos limitados. En Texas lo administra la Comisión de Salud y Servicios Humanos (Texas HHS), que decide quién califica. Puede solicitarlo en YourTexasBenefits.com.",
                ],
              },
              {
                id: "both",
                question: "¿Puedo tener Medicare y Medicaid al mismo tiempo?",
                answer: [
                  "Sí, algunas personas califican para los dos. Medicare paga primero y Medicaid paga al final. Algunos programas también ayudan a pagar las primas de Medicare o el costo de los medicamentos.",
                  "Texas decide quién califica para Medicaid, así que cada caso tiene que revisarse.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "marketplace",
        heading: "Mercado de Seguros (ACA)",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "what-is-marketplace",
                question: "¿Qué es el Mercado de Seguros (Obamacare)?",
                answer: [
                  "Es donde las personas sin seguro del trabajo, Medicare ni Medicaid pueden comprar un seguro médico. En Texas es CuidadoDeSalud.gov. Puede recibir ayuda con el costo según los ingresos y el tamaño de su hogar.",
                ],
              },
              {
                id: "marketplace-to-medicare",
                question: "Tengo un plan del Mercado y voy a cumplir 65 años. ¿Qué hago?",
                answer: [
                  "Inscríbase en Medicare durante su Periodo de Inscripción Inicial y después cancele su plan del Mercado. No termina solo, y ya no puede recibir ahorros del Mercado una vez que es elegible para la Parte A de Medicare.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "enrollment",
        heading: "Inscripción y fechas",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "turning-65",
                question: "Voy a cumplir 65 años pronto. ¿Qué debo hacer?",
                answer: [
                  "Su primera oportunidad para inscribirse suele ser un periodo de 7 meses: los 3 meses antes del mes en que cumple 65, ese mes y los 3 meses siguientes. Si ya recibe beneficios del Seguro Social, normalmente lo inscriben automáticamente en la Parte A y la Parte B.",
                  "Inscribirse tarde puede traer multas, así que conviene empezar con tiempo. Le ayudamos a entender los pasos.",
                ],
              },
              {
                id: "change-plan",
                question: "¿Cuándo puedo cambiar mi plan de Medicare?",
                answer: [
                  "Cada año del 15 de octubre al 7 de diciembre, y los cambios empiezan el 1 de enero. Si tiene un plan Medicare Advantage, también puede hacer un cambio del 1 de enero al 31 de marzo. Algunos cambios en su vida le dan otras oportunidades durante el año.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "contact",
        heading: "Citas y contacto",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "how-contact",
                question: "¿Cómo me comunico con la oficina?",
                answer: ["Llámenos en horario de oficina o visite una de nuestras oficinas. Encontrará el teléfono, el horario y las direcciones al final de esta página."],
              },
              {
                id: "can-you-help",
                question: "¿La oficina me puede ayudar a entender mis opciones?",
                answer: [
                  "Sí. Le explicamos cómo funcionan Medicare, Medicaid y el Mercado de Seguros y respondemos sus preguntas con palabras sencillas. Si algo no está entre lo que hacemos, le diremos dónde encontrar ayuda oficial.",
                ],
              },
              {
                id: "bring",
                question: "¿Qué documentos debo llevar?",
                answer: [
                  "Puede ser útil traer su tarjeta de Medicare si la tiene, las tarjetas de su seguro actual, una lista de sus medicamentos y los nombres de sus médicos. Llámenos para preguntar qué es útil en su caso.",
                  "Por favor no envíe su número de Seguro Social ni de Medicare por internet.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "family",
        heading: "Familiares y cuidadores",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "family-member",
                question: "¿Puede acompañarme un familiar?",
                answer: ["Sí, puede venir con un familiar o con la persona que le cuida. Solo avísenos cuando llame."],
              },
              {
                id: "call-for-parent",
                question: "¿Puedo llamar por mi mamá o mi papá?",
                answer: [
                  "Sí, puede llamar para hacer preguntas generales. Para hablar de los detalles de su cobertura o tomar decisiones, normalmente su mamá o su papá tendrá que participar o dar su permiso.",
                ],
              },
            ],
          },
        ],
      },
    ],
    related: ["firstVisit", "medicare", "resources"],
  },

  resources: {
    metaTitle: "Recursos oficiales de Medicare, Medicaid y el Mercado de Seguros",
    metaDescription:
      "Teléfonos y sitios oficiales de Medicare, el Seguro Social, Medicaid de Texas, la consejería gratuita de Medicare en Texas y el Mercado de Seguros Médicos.",
    label: "Recursos",
    title: "Recursos oficiales",
    intro: "Estos programas oficiales también pueden responder sus preguntas, sin costo. Con gusto le ayudamos a usarlos.",
    sections: [
      {
        id: "medicare",
        heading: "Medicare y Seguro Social",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Medicare.gov en español", href: MEDICARE, text: "El sitio oficial de Medicare, con el buscador de planes." },
              { label: "1-800-MEDICARE (1-800-633-4227)", href: `${MEDICARE}/talk-to-someone`, text: "Las 24 horas, los 7 días de la semana. TTY: 1-877-486-2048." },
              { label: "Seguro Social en español", href: "https://www.ssa.gov/espanol/", text: "Inscripción en la Parte A y la Parte B. Teléfono: 1-800-772-1213." },
            ],
          },
        ],
      },
      {
        id: "counseling",
        heading: "Consejería gratuita de Medicare en Texas",
        blocks: [
          {
            type: "links",
            items: [
              {
                label: "Texas HICAP: 1-800-252-9240",
                href: "https://www.tdi.texas.gov/consumer/hicap/",
                text: "Programa de Información, Consejería y Defensa sobre Salud: ayuda gratuita e imparcial con Medicare (es el Programa Estatal de Asistencia sobre Seguros de Salud, SHIP, de Texas).",
              },
            ],
          },
        ],
      },
      {
        id: "texas",
        heading: "Medicaid y beneficios de Texas",
        blocks: [
          {
            type: "links",
            items: [
              { label: "YourTexasBenefits.com", href: "https://www.yourtexasbenefits.com/Learn/Home?lang=es_US", text: "Solicite Medicaid y otros beneficios." },
              { label: "Texas HHS: Medicaid y CHIP", href: "https://www.hhs.texas.gov/services/health/medicaid-chip", text: "Programas para adultos mayores y personas con discapacidades (en inglés)." },
              { label: "2-1-1 Texas", href: "https://www.211texas.org/", text: "Ayuda local con salud, comida, vivienda y más." },
            ],
          },
        ],
      },
      {
        id: "marketplace",
        heading: "Mercado de Seguros Médicos",
        blocks: [
          {
            type: "links",
            items: [{ label: "CuidadoDeSalud.gov", href: "https://www.cuidadodesalud.gov/es/", text: "Teléfono: 1-800-318-2596 (TTY: 1-855-889-4325)." }],
          },
        ],
      },
      {
        id: "words",
        heading: "Palabras que puede escuchar",
        blocks: [{ type: "glossary" }],
      },
    ],
    related: ["medicare", "faq", "firstVisit"],
  },
};
