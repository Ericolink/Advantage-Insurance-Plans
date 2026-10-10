# Investigación de competencia y oportunidades — Advantage Insurance Plans by Silvia Alcazar

Fecha de la investigación: 10 de octubre de 2026 (cinco días antes del inicio del Periodo de Inscripción Anual de Medicare, 15 oct – 7 dic).

**Cómo leer este informe**

- **[Observado]**: lo vi directamente en la página pública o en su código HTML el 10/10/2026.
- **[Tercero]**: lo dice una fuente externa (directorio, nota de prensa, reseñas), no la propia página.
- **[Inferencia]**: es mi interpretación; no es un hecho comprobado.
- **[Recomendación]**: es mi propuesta.

No he modificado el sitio. Este documento es el único archivo que he creado.

**Limitaciones de la investigación**

- El sitio no tiene una URL pública configurada (`site.url = null`). Por eso evalué el código local y una compilación de producción servida en local, no el sitio real publicado.
- No pude ejecutar Lighthouse ni pruebas con lectores de pantalla. Las conclusiones de rendimiento y accesibilidad salen del código y del HTML generado.
- No pude acceder a boomerbenefits.com (HTTP 403), medicareinteractive.org (403), eHealth (tiempo de espera agotado) ni eCFR (bloqueo). Para las normas de CMS usé la copia de Cornell LII.
- No consulté la Biblioteca de Anuncios de Meta ni el Centro de Transparencia de Google Ads, porque requieren un navegador interactivo. No afirmo nada sobre la publicidad pagada de los competidores.
- Ningún dato de volumen de búsqueda, posiciones en Google ni tasas de conversión se ha inventado. No los tengo.

---

## SECCIÓN 1. RESUMEN EJECUTIVO

**Hallazgos principales**

1. **El mercado local de El Paso tiene sitios web débiles.** Los cinco competidores locales revisados tienen al menos uno de estos problemas:
   - contenido desactualizado ("2020", "2017" y "© 2016" en BYGA);
   - enlaces rotos (Medicare Express);
   - restos de plantilla y teléfonos contradictorios (Texas Medical Care Plans);
   - ausencia del aviso obligatorio de CMS (Advantage Insurance Agency Inc);
   - un español de mala calidad (Medicare Express: "Habalmos Espanol").

   Un sitio claro, actualizado y bien escrito en español ya sería una diferencia real. [Observado]
2. **El español es una oportunidad clara en El Paso.** Un anuncio de venta de una agencia local de Medicare describe una cartera de clientes ~80 % hispanohablantes y ~90 % mayores de 65 años ([BizQuest](https://www.bizquest.com/business-for-sale/well-established-insurance-agency-in-el-paso-tx-1-3m-1-4m/BW2527587/)) [Tercero].
   - Ningún competidor local tiene una versión en español completa y bien hecha. [Observado]
   - Nuestro sitio ya tiene una versión completa en español, pero **oculta el mensaje "Se habla español"** hasta que Silvia confirme que atiende en los dos idiomas (`site.languages = null`).
3. **Nuestro sitio es una sola página.** Los competidores que mejor trabajan el SEO local tienen una página por tema, por ejemplo "Medicare Advantage El Paso" o "El Paso Medicare Plans". Connie Health tiene una página muy completa sobre El Paso, con FAQ, tablas y fecha de actualización. Nosotros solo tenemos la página de inicio y las páginas legales. [Observado]
4. **Hay riesgo de confusión de marca.** Existe **Advantage Insurance Agency Inc** en El Paso (11930 Vista Del Sol Dr, (915) 855-2996). Vende Medicare y tiene una página "Medicare Advantage El Paso" con datos estructurados LocalBusiness. Nuestro nombre es casi igual. [Observado] "by Silvia Alcazar" debe formar parte constante de la marca. [Recomendación]
5. **Cuatro faltas bloquean el lanzamiento, y no son de diseño.** Faltan:
   - el número de licencia;
   - las cifras del aviso de CMS ("representamos X organizaciones que ofrecen Y productos");
   - el dominio;
   - la aprobación de los textos.

   El aviso de CMS es obligatorio en los sitios web de las organizaciones de marketing externas (TPMO) ([42 CFR 422.2267(e)(41)](https://www.law.cornell.edu/cfr/text/42/422.2267)). Nada de lo que propongo debe publicarse antes de resolver esto.

**Las cinco mejores oportunidades**

1. **Completar la confianza básica.** Publicar la licencia, el aviso de CMS completo y "Se habla español" (si se confirma), y una presentación real de Silvia.
2. **Crear páginas por servicio en inglés y español:**
   - Medicare, con Original Medicare comparado con Medicare Advantage;
   - Medicare y Medicaid juntos (doble elegibilidad);
   - Medicaid;
   - el Mercado de Seguros (ACA).

   Ayudan al visitante y al SEO local.
3. **Crear una página "Su primera cita: qué esperar y qué traer"** y una FAQ que incluya a familiares y cuidadores. Ningún competidor local la tiene.
4. **Poner en marcha el Perfil de Empresa de Google** con reseñas reales y la marca diferenciada "by Silvia Alcazar", y enlazar Facebook.
5. **Ofrecer una forma de pedir ayuda fuera del horario.** La oficina abre de lunes a viernes de 9 a 4. Hoy, quien visita la página por la noche o el fin de semana no puede dejar un mensaje. Las opciones son una solicitud de llamada corta o una agenda en línea, con consentimiento correcto. Se activa solo cuando Silvia lo decida, porque ahora el sitio es informativo por decisión suya.

---

## SECCIÓN 2. EVALUACIÓN DE NUESTRA PÁGINA ACTUAL

Fuente: código local (`src/`) y compilación de producción servida en local (`/es`, 81 KB de HTML). [Observado]

### Estructura actual

- **Páginas:** `/en` y `/es` (inicio), `/[lang]/privacy` y `/[lang]/terms`. Las dos páginas legales muestran "Esta página está en preparación".
- **Secciones del inicio, en orden:**
  1. Hero;
  2. "¿En qué le podemos ayudar?" (Medicare, Medicaid y ACA);
  3. "Cómo le ayudamos" (3 pasos);
  4. "Palabras que puede escuchar" (glosario de 5 términos);
  5. "Conozca a Silvia Alcazar";
  6. Testimonios (oculto porque está vacío);
  7. Contacto con mapa;
  8. Pie con avisos legales.
- **Navegación:** 4 anclas: Servicios, Cómo le ayudamos, Quiénes somos y Contacto. En móvil se muestran como una fila de enlaces que se ajusta al ancho, sin menú hamburguesa.

### Lo que hacemos bien

| Aspecto | Evidencia |
|---|---|
| Teléfono siempre visible | Barra superior con "Hable con una persona real: (915) 256-9708". Botón "Llamar" fijo en la cabecera. 6 enlaces `tel:` en la página. |
| Legibilidad | Texto base de 18 px (`font-size: 112.5%`). Cuerpo de 18–20 px y títulos de 36–48 px. La paleta está ajustada a contraste AA (comentado en `globals.css`). |
| Botones grandes | Altura mínima de 48–52 px (`min-h-12` / `min-h-13`). |
| Accesibilidad por teclado | Enlace "Saltar al contenido principal", foco visible de 3 px, `prefers-reduced-motion` respetado y pasos numerados con texto para lectores de pantalla. |
| Lenguaje claro | Frases cortas y trato de "usted". "Generalmente para:" en cada servicio. Glosario sin jerga. "Sin presiones. Usted decide". |
| Bilingüe técnico | Rutas `/en` y `/es`, `hreflang`, detección de idioma por navegador y cookie. |
| Honestidad y cumplimiento | Avisos de no afiliación al gobierno, del Mercado de Seguros y de Medicaid. Lista de aseguradoras oculta hasta que se confirme. Sin logotipos. Sin testimonios inventados. Indexación bloqueada hasta el lanzamiento. |
| SEO técnico base | `<title>` y meta descripción por idioma, H1 único, H2 por sección, JSON-LD `InsuranceAgency` con dirección y horario, sitemap y robots condicionados al lanzamiento. |
| Rendimiento | Páginas estáticas (SSG) y sin scripts de terceros (ni analítica ni chat). CSS de 29 KB. ~587 KB de JS sin comprimir: es el runtime de Next/React, aceptable pero mejorable para un sitio sin interactividad. |

### Lo que falta o conviene corregir

| # | Problema | Por qué importa | Tipo |
|---|---|---|---|
| 1 | El aviso de CMS (TPMO) no se muestra porque faltan las cifras de organizaciones y productos. | Es obligatorio y debe ser "prominente" en el sitio ([422.2267(e)(41)](https://www.law.cornell.edu/cfr/text/42/422.2267)). | Bloqueante legal |
| 2 | No hay número de licencia de Texas. | Genera confianza, y los visitantes pueden verificarlo en TDI. | Bloqueante |
| 3 | "Se habla español" está oculto (`languages = null`). | Es el mayor diferenciador local y no se ve. | Confirmar con Silvia |
| 4 | Solo hay una página. | Sin URLs por servicio, el sitio difícilmente aparece en búsquedas como "Medicare Advantage El Paso" o "ayuda con Medicaid El Paso" [Inferencia]. | SEO |
| 5 | No hay FAQ. | Las dudas típicas quedan sin respuesta: ¿cuesta algo?, ¿cuándo me inscribo?, ¿qué traigo?, ¿tengo Medicare y Medicaid? | Contenido |
| 6 | No hay comparación entre Original Medicare y Medicare Advantage. | Es la decisión central del cliente de Medicare. | Contenido |
| 7 | No se mencionan los periodos de inscripción (AEP del 15 oct al 7 dic, cumplir 65 años). | Es el momento de mayor búsqueda [Inferencia]. Connie, BYGA y Medicare Express lo destacan. | Contenido |
| 8 | No hay "Qué esperar de la cita / qué traer". | Reduce la ansiedad y las llamadas incompletas. | Contenido |
| 9 | Silvia no tiene presentación propia (se usa un texto genérico). | La persona es el motivo para elegir a una agente local. | Confirmar con Silvia |
| 10 | No hay forma de contactar fuera del horario (sin correo, formulario ni agenda). | Quien llega de Facebook por la noche no tiene cómo dejar su mensaje. | Conversión |
| 11 | El hero tiene dos botones casi equivalentes: "Quiero ayuda con mi cobertura" baja a Contacto y "Llame a la oficina" llama. | Dos opciones que llevan al mismo resultado pueden confundir. | UX |
| 12 | La foto de la oficina es una captura de Street View con crédito a Google. | Una foto propia genera más confianza y evita depender de Google. | Visual |
| 13 | No hay Facebook ni Perfil de Google enlazados (`socials` vacíos). | No hay prueba social ni conexión con el canal de Facebook. | Marketing |
| 14 | Las páginas legales están "en preparación" y hay un mapa de Google incrustado. | El mapa carga recursos de Google. La política de privacidad es necesaria antes de cualquier formulario. | Legal |
| 15 | No hay analítica ni medición de llamadas. | No se puede saber qué canal trae clientes. Hay que decidirlo con cuidado por privacidad (ver Sección 9). | Medición |
| 16 | La imagen `NegocioLocal.png` pesa 285 KB en PNG. | Es una optimización menor: convertir a WebP. | Rendimiento |

### Elementos que podrían confundir a una persona mayor

- **Dos CTA equivalentes en el hero** (problema 11). [Inferencia]
- **"Obamacare / Mercado de Seguros (ACA)":** son tres nombres para lo mismo. Está bien explicado en la tarjeta, pero conviene usar un solo nombre principal en los botones.
- **Botón por servicio que solo baja a Contacto:** "Ayuda con Medicare" lleva al mismo lugar que "Información sobre Medicaid". El visitante espera encontrar información de ese tema. [Inferencia]
- **Pocos enlaces de navegación en móvil,** aunque son grandes y siempre visibles. Esto está bien y no debe empeorarse al añadir páginas.

---

## SECCIÓN 3. LISTA DE COMPETIDORES

**Tipos de negocio:**

- **Agencia local:** oficina física con agentes con licencia.
- **Agencia nacional:** corredor telefónico o digital en varios estados.
- **Aseguradora:** vende sus propios planes.
- **FMO:** organización que gestiona agentes; no es un competidor directo.
- **Plataforma:** comparador o agencia digital.

| # | Nombre | URL revisada | Tipo | Especialidad | Público | Características destacadas |
|---|---|---|---|---|---|---|
| 1 | Advantage Insurance Agency Inc | https://advantageinsuranceagency.net/ · [página Medicare Advantage El Paso](https://advantageinsuranceagency.net/areas-of-service/el-paso-medicare-advantage/) | Agencia local (El Paso) | Seguros generales: auto, hogar, comercial y también Medicare | Público general | Nombre casi igual al nuestro. Páginas por servicio y zona. Schema LocalBusiness. Formulario de 4 campos. Sin español, sin aviso de CMS y sin agentes con nombre. |
| 2 | Medicare Express | https://www.medicareexpress.info/ · [en español](https://www.medicareexpress.info/en-espanol.html) | Agencia local (El Paso) | Medicare Advantage | 65+ | Teléfono con TTY 711 en todas partes. Aviso de CMS completo ("12 organizations… 48 products"). Fundador con 30 años de experiencia. Citas. El español es parcial y tiene errores. Enlaces rotos. Sin etiqueta viewport (no adaptado a móvil). |
| 3 | BYGA Healthcare Insurance | https://www.bygahealthcareinsurance.com/medicare-plans.html · https://elpasomedicareadvantageplans.com/ | Agencia local (El Paso) | Medicare, ACA y personas con Medicare y Medicaid | 65+ y bajos ingresos | Dominios con palabras clave locales. Reuniones informativas gratuitas, incluida una para personas con Medicare y Medicaid. Insignia del BBB. Contenido desactualizado ("2020", "2017", "© 2016"). |
| 4 | Texas Medical Care Plans | https://texasmedicalcareplans.com/en/home/ | Agencia local (El Paso, 3 oficinas) | ACA principalmente, también Medicare | Hispanos, familias | WhatsApp. Consentimiento para SMS. Formulario con "No estoy seguro". FAQ de 8 preguntas. Cita en línea. Restos de plantilla ("Quanto specialist 800-123-1234"), teléfonos contradictorios y contador roto. |
| 5 | Humana MarketPoint (localizador de agentes) | https://medicareagent.humana.com/tx/elpaso | Aseguradora | Solo planes Humana | 65+ | 12 agentes en El Paso con foto, nombre y teléfono directo. Enlace "Español". No indica idiomas por agente. |
| 6 | Connie Health (página local El Paso) | https://www.conniehealth.com/medicare-near-me/medicare-advantage-plans/texas/el-paso-county/el-paso/ | Plataforma / agencia | Medicare Advantage | 65+ | La página local de SEO más completa: H1 "The Best Medicare Advantage Plans in El Paso, Texas 2026", 52 planes, tabla de aseguradoras, ~20 FAQ, autor, revisión y fecha de actualización. Sin versión en español. |
| 7 | Anhelo | https://www.anhelosalud.com/ | Agencia nacional (español primero) | Medicare Advantage | Hispanos 65+ | Todo en español. Buscador por código postal. Guías "Medicare 101", "Medicaid 101" y otras. Reseñas de Trustpilot. Teléfono 24/7 con TTY. Logotipos de aseguradoras. |
| 8 | Chapter | https://www.askchapter.org/ | Agencia nacional | Medicare (todas las modalidades) | 65+ | Reserva de cita con asesor. Flujo guiado "Explore on your own". Reseñas de Reviews.io y BBB A+. Aviso de CMS (50 organizaciones / 15,778 productos). |
| 9 | Coverage2Care | https://coverage2care.com/inicio/ | Agencia regional (San Antonio, TX) | Medicare y grupos | Bilingüe | "Se Habla Español". Proceso de 3 pasos ("Conectar, Compara, Cubierta"). Guía gratuita de Medicare. Blog. WhatsApp en el código. Sin aviso de CMS visible. |
| 10 | Medicare Agent in Katy (Ruben Guerrero) | https://medicareinkaty.com/ | Agente local (Katy, TX) | Medicare, D-SNP y transición desde ACA | 65+ bilingüe | Agente con nombre y foto. Sección en español. Pasos para quienes cumplen 65. Explicación de los periodos de inscripción. Testimonios con iniciales. Aviso de CMS. No publica número de licencia. |
| 11 | GoHealth | https://www.gohealth.com/medicare/ | Agencia nacional / plataforma | Medicare Advantage | 65+ | "Help Me Choose a Plan" (flujo guiado). Trustpilot 4.8 con 42,895 reseñas. El aviso de CMS tiene marcadores sin rellenar ("[number_of_organizations]"). |
| 12 | Advocate Health Advisors | https://www.advocatehealthadvisors.com/ | FMO (gestiona agentes; no es competidor directo) | Medicare | 65+ y veteranos | Consentimiento detallado para llamadas y SMS. Página para veteranos. Podcast y YouTube. Aviso de CMS. Tiene presencia en El Paso según [KFOX14](https://int.kfoxtv.com/community/senior-healthy-living/advocate-health-advisors-we-provide-expertise-in-the-medicare-environment-in-el-paso). |
| 13 | Boomer Benefits | https://boomerbenefits.com/ (**no accesible: HTTP 403**) | Agencia nacional (Texas) | Medicare | 65+ | Solo datos de terceros: 5.0 con 478 reseñas en [Yext](https://directory.yext.com/en/boomer-benefits-1956184856); nota de prensa propia de "13,000 reseñas de 5 estrellas" ([fuente](https://lifestyle.kbew98country.com/story/91466/boomer-benefits-celebrates-over-13000-5-star-reviews-reinforcing-its-aim-to-become-the-best-medicare-broker-in-dallas-texas/)). Sin verificar en su sitio. |

**Fuentes informativas (no son competidores, pero sirven de referencia de buenas prácticas):**

- [Medicare.gov](https://www.medicare.gov/): dos rutas principales ("Get started with Medicare" / "Talk to someone"), aviso de temporada ("Open Enrollment starts Oct 15") y enlace "Plain Writing".
- [TDI – recursos de Medicare de Texas](https://www.tdi.texas.gov/consumer/hicap/): consejería gratuita, 800-252-3439.

**Otros agentes de El Paso identificados pero no analizados** (solo aparecen en directorios):

- ArmandoWInsurance y Alliance Insurance Solutions ([1800insurance](https://www.1800insurance.com/agents/texas/el-paso/alliance-insurance-solutions-llc-77PQ10Y)).
- RUA Insurance Group y Michael Lopez Jr & Associates ([BBB](https://wwwwww.bbb.org/us/tx/el-paso/category/medicare)).

Se pueden analizar en una segunda ronda.

---

## SECCIÓN 4. ANÁLISIS COMPARATIVO

Leyenda: ✔ presente · ◐ parcial o con problemas · ✘ ausente · ? no verificable. Todo es [Observado], salvo lo marcado.

| Criterio | Nosotros | Adv. Ins. Agency | Medicare Express | BYGA | Tx Medical Care | Connie | Anhelo | Chapter | Coverage2Care | Katy | GoHealth |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Teléfono visible y clicable | ✔ | ✔ | ◐ (sin `tel:`) | ✔ | ◐ (números distintos) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| TTY 711 | ✘ | ✘ | ✔ | ✘ | ✘ | ✔ | ✔ | ? | ✘ | ✘ | ✔ |
| Español completo | ✔ (oculto el aviso) | ✘ | ◐ (errores) | ◐ (página aparte) | ◐ (mezclado) | ✘ | ✔ | ✘ | ◐ | ◐ | ✘ |
| Agente con nombre y foto | ✔ | ✘ | ◐ (sin foto) | ✘ | ◐ (fotos sin bio) | ◐ | ✘ | ✘ | ✘ | ✔ | ✘ |
| Licencia visible | ✘ (pendiente) | ✘ | ✘ | ✘ | ✘ | ? | ? | ◐ (pág. Licensing) | ✘ | ✘ | ? |
| Aviso de CMS (TPMO) completo | ✘ (pendiente) | ✘ | ✔ | ◐ | ◐ | ◐ | ◐ | ✔ | ✘ | ◐ | ◐ (marcadores vacíos) |
| Páginas por servicio | ✘ | ✔ | ◐ | ◐ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| FAQ | ✘ | ◐ | ✘ | ✘ | ✔ (8) | ✔ (~20) | ✘ | ✘ | ✘ | ◐ | ? |
| Glosario o lenguaje llano | ✔ | ✘ | ◐ | ◐ | ◐ | ◐ | ✔ | ? | ◐ | ◐ | ? |
| Proceso explicado (pasos) | ✔ | ◐ | ◐ | ✘ | ✘ | ✘ | ✘ | ◐ | ✔ | ✔ | ? |
| Formulario | ✘ (por decisión) | ✔ (4 campos) | ✔ (3 + consentimiento) | ✔ (3) | ✔ | ◐ (externo) | ◐ (solo código postal) | ✘ | ◐ | ✘ | ? |
| Agenda en línea | ✘ | ✘ | ◐ (página "schedule") | ✘ | ◐ | ✘ | ✘ | ✔ | ✘ | ✘ | ✘ |
| WhatsApp, SMS o chat | ✘ | ✘ | ✘ | ✘ | ✔ WhatsApp + SMS | ✘ | ✘ | ✘ | ◐ WhatsApp | ✘ | ✘ |
| Herramienta o cuestionario | ✘ | ✘ | ✘ | ✘ | ◐ ("No estoy seguro") | ✔ | ✔ código postal | ✔ flujo guiado | ◐ | ◐ | ✔ |
| Reseñas | ✘ | ✘ | ✘ | ◐ BBB | ✘ | ? | ✔ Trustpilot | ✔ Reviews.io + BBB | ◐ testimonios | ◐ testimonios | ✔ Trustpilot |
| Recursos educativos | ◐ glosario | ✘ | ◐ | ◐ | ◐ noticias | ✔ | ✔ guías 101 | ◐ | ✔ guía + blog | ✔ | ✔ |
| Eventos o charlas | ✘ | ✘ | ✘ | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| Schema (JSON-LD) | ✔ InsuranceAgency | ✔ LocalBusiness | ✘ | ✘ | ◐ Organization | ? | ◐ | ✘ | ◐ | ◐ | ? |
| Adaptado a móvil (viewport) | ✔ | ✔ | ✘ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Contenido actualizado | ✔ | ✔ | ✔ (8/2025) | ✘ (2016–2020) | ◐ (contador roto) | ✔ (mayo 2026) | ✔ | ✔ | ✔ | ? | ✔ |

### Conclusiones por eje

- **Diseño y UX:**
  - Los sitios locales usan plantillas genéricas con carruseles. Advantage Insurance Agency muestra fotos de autos y casas aunque también vende Medicare.
  - Nuestro sitio ya es más claro y accesible que todos los locales. [Observado]
  - Los nacionales (Chapter, GoHealth, Connie) son limpios, pero orientados a vender planes por teléfono, no a una relación personal.
- **Contenido:**
  - Connie demuestra el modelo SEO local: datos verificables del condado, FAQ y fecha de actualización.
  - Anhelo demuestra el modelo educativo en español: guías "101" por programa.
  - Nadie en El Paso combina las dos cosas.
- **Accesibilidad:**
  - Solo los nacionales y Medicare Express muestran TTY 711.
  - Ningún sitio local muestra un compromiso de accesibilidad ni opciones de tamaño de texto.
  - Nuestro sitio tiene la mejor base técnica (salto de contenido, foco visible y 18 px), pero no muestra TTY 711. [Recomendación: añadir "TTY 711" junto al teléfono solo si la oficina lo atiende o lo acepta mediante el servicio de retransmisión; confirmarlo con Silvia.]
- **Confianza:**
  - Ningún competidor local publica el número de licencia.
  - El aviso de CMS completo solo aparece en Medicare Express. La mayoría lo tiene incompleto o no lo tiene.
  - Publicar licencia, aviso completo, foto y presentación de Silvia y dirección con horario es una forma barata de superar a todos los locales. [Inferencia]
- **Captación:**
  - El mecanismo dominante es el teléfono (todos).
  - Los formularios son cortos, de 3 a 4 campos.
  - La agenda en línea solo es seria en Chapter.
  - WhatsApp aparece solo en agencias con fuerte público hispano (Texas Medical Care Plans y Coverage2Care).
  - No tengo datos de qué funciona mejor; solo sé qué usan.
- **SEO:**
  - Los locales apuestan por dominios y títulos con "El Paso Medicare". Medicare Express tiene un título sobrecargado de palabras clave.
  - Nosotros tenemos un buen título, pero una sola URL.
- **Bilingüe:**
  - Solo Anhelo (nacional) hace un español de calidad.
  - En El Paso, el español existente es parcial o tiene errores.
  - Esta es la brecha más clara del mercado local. [Inferencia]

---

## SECCIÓN 5. FUNCIONALIDADES QUE PODEMOS AGREGAR

**Supuestos de coste:**

- El coste se expresa en **horas de desarrollo**. Para pasarlo a dinero, multiplique por la tarifa de su desarrollador. Como referencia de supuesto (no es una cotización), una tarifa freelance de 50–100 USD/h.
- El contenido lo redacto yo, pero **Silvia debe aprobarlo**. Si se usa Medicare, debe revisarlo también el área de cumplimiento de su upline o de la aseguradora. Ese tiempo no está incluido.
- Los costes externos se indican aparte.

### PRIORIDAD ALTA

| Funcionalidad | Problema que resuelve | Competidores que la usan | Evidencia | Beneficio esperado | Dificultad | Coste (supuestos) | Recomendación |
|---|---|---|---|---|---|---|---|
| Aviso de CMS completo, licencia de Texas y NPN en el pie | Obligación legal y desconfianza ("¿es legítimo?") | Medicare Express y Chapter completos; la mayoría, incompletos | Texto de 422.2267(e)(41); pie de Medicare Express | Poder lanzar legalmente; confianza | Muy baja (el código ya existe) | ~0.5 h, una vez se tengan los datos | **Hacer ya**. Depende de Silvia. |
| "Se habla español / We speak English" visible | El visitante hispano no sabe si lo atenderán en su idioma | Coverage2Care, Medicare Express (con errores) | Ver Sección 3 | Diferenciador local principal | Muy baja (cambiar `languages`) | ~0.25 h | **Hacer** si Silvia confirma. |
| Presentación real de Silvia (en sus palabras) | Una agente local se elige por la persona | Katy (nombre y foto), Medicare Express (fundador) | Sección 3 | Confianza y conexión personal | Baja | 1–2 h, más una entrevista breve con Silvia | **Hacer**. Sin inventar biografía. |
| Páginas por servicio (Medicare, Medicaid, Mercado ACA) | El visitante busca su tema; una sola página no posiciona temas distintos | Adv. Ins. Agency, Connie, Anhelo, Katy, Tx Medical Care | URLs `/areas-of-service/el-paso-medicare-advantage/`, guías 101 | Visitantes de búsqueda; botones de servicio con destino real | Media | 10–16 h para 3 páginas × 2 idiomas, con sitemap y metadatos | **Hacer**, empezando por Medicare. |
| Comparación Original Medicare frente a Medicare Advantage | Es la decisión que más confunde | BYGA (parcial), Katy, Anhelo | Secciones educativas observadas | Claridad; contenido útil para buscadores | Baja–media | 3–5 h (tabla accesible, no imagen) | **Hacer** dentro de la página de Medicare. |
| FAQ (incluida una sección para familiares y cuidadores) | Dudas repetidas: costo de la ayuda, fechas, qué traer, Medicare más Medicaid | Connie (~20), Tx Medical Care (8) | Sección 3 | Menos fricción. Posible resultado enriquecido en Google [Inferencia: Google limita los resultados enriquecidos de FAQ y no está garantizado] | Baja | 4–6 h (acordeón accesible con `<details>`) | **Hacer**. |
| "Su cita: qué esperar y qué traer" | Ansiedad ante la primera consulta; llamadas en las que falta información | Ningún competidor local; Katy tiene pasos para quien cumple 65 | Ausencia observada | Diferenciación y consultas más eficientes | Baja | 2–3 h | **Hacer**. Lista de documentos sin pedirlos en línea (ver Sección 9). |
| Aviso de temporada (AEP del 15 oct al 7 dic; cumplir 65) | El visitante no sabe que hay fechas límite | Medicare.gov, Connie, BYGA, Tx Medical Care | "Open Enrollment starts Oct 15" en Medicare.gov | Urgencia legítima y relevancia | Baja | 1–2 h (banner configurable con fecha de fin) | **Hacer** (temporada activa). Sin contador. |
| Diferenciación de marca | Confusión con "Advantage Insurance Agency Inc" | — | Mismo mercado, nombres casi iguales | Que las llamadas y reseñas lleguen a Silvia | Muy baja | 0.5 h en el sitio, más la configuración de Perfil de Google | **Hacer**: usar siempre "Advantage Insurance Plans by Silvia Alcazar". |

### PRIORIDAD MEDIA

| Funcionalidad | Problema que resuelve | Competidores que la usan | Evidencia | Beneficio esperado | Dificultad | Coste (supuestos) | Recomendación |
|---|---|---|---|---|---|---|---|
| Solicitud de llamada (formulario corto: nombre, teléfono, tema, idioma, consentimiento) | No hay forma de pedir ayuda fuera del horario | Adv. Ins. Agency (4 campos), Medicare Express, BYGA, Tx Medical Care | Sección 3 | Recoger solicitudes nocturnas y de fin de semana | Baja: **ya está programado** (`leadForm=false`) | 1–2 h para activarlo, más un servicio de envío (p. ej. Resend, con plan gratuito para poco volumen; [verificar precios actuales]) | **Hacer** cuando Silvia decida, con política de privacidad lista y sin datos sensibles. |
| Agenda en línea | Elegir hora sin llamar; útil para hijos que ayudan | Chapter | "Pick a convenient time to meet…" | Citas con menos llamadas de ida y vuelta | Baja (el campo `bookingUrl` ya existe) | ~1 h. Herramientas como Calendly o Google Calendar tienen planes gratuitos o de bajo coste [verificar]. | **Opcional**. Solo si Silvia mantiene la agenda al día. Una cita de Medicare puede requerir Scope of Appointment (ver Sección 9). |
| "¿Qué ayuda necesito?" (guía de 2–3 preguntas sin recoger datos) | No saber si su caso es Medicare, Medicaid o ACA | GoHealth ("Help Me Choose"), Chapter (flujo guiado), Tx Medical Care ("No estoy seguro") | Sección 3 | Orientación inmediata; dirige a la página correcta | Media | 6–10 h (preguntas y respuestas estáticas, sin almacenar nada) | **Hacer** después de las páginas por servicio. No recomienda planes, solo el programa a investigar. |
| Página "Medicare y Medicaid juntos" (doble elegibilidad) | Público frecuente en El Paso [Inferencia]; muy confuso | BYGA (reunión para doble elegibilidad), Katy (D-SNP) | Sección 3 | Atiende a un público central del negocio | Media | 3–5 h | **Hacer** si Silvia confirma que atiende estos casos y planes D-SNP. |
| Perfil de Empresa de Google con reseñas y enlace desde el sitio | Prueba social local | Anhelo, Chapter, GoHealth (plataformas); BBB en BYGA | Sección 3 | Confianza y visibilidad en el mapa de Google [Inferencia] | Baja (fuera del sitio) | 1 h en el sitio; la gestión de reseñas es trabajo continuo de la oficina | **Hacer**. Enlazar al perfil en lugar de copiar reseñas en la web (ver Sección 9 sobre testimonios). |
| Enlace a Facebook | El canal de captación elegido | Tx Medical Care, Coverage2Care, BYGA | Iconos sociales observados | Coherencia entre canales | Muy baja | 0.25 h | **Hacer** cuando exista la página de Facebook. |
| "TTY 711" junto al teléfono | Personas con discapacidad auditiva | Medicare Express, Connie, Anhelo, GoHealth | Sección 3 | Accesibilidad real | Muy baja | 0.25 h | **Hacer** si la oficina acepta llamadas de retransmisión (confirmar). |
| Guía descargable en PDF ("Medicare en palabras sencillas") | Las personas mayores imprimen y comparten con su familia [Inferencia] | Coverage2Care ("Free Medicare Guide"), Anhelo (guías 101) | Sección 3 | Recurso para compartir; material para eventos | Media (diseño del PDF) | 6–10 h, o diseño externo | **Fase 2**. Descarga sin pedir datos al principio. |
| Medición respetuosa de la privacidad (clics en "Llamar" y visitas) | No se sabe qué canal funciona | La mayoría usa Google Analytics o Meta Pixel | `gtag`, `facebook.net` y `hotjar` vistos en el HTML | Decidir con datos | Baja–media | 2–4 h; herramientas sin cookies como Plausible o Vercel Analytics, de bajo coste [verificar] | **Hacer**, pero **no** instalar el Meta Pixel en páginas de salud sin revisión (ver Sección 9). |

### PRIORIDAD BAJA

| Funcionalidad | Por qué no ahora |
|---|---|
| Comparador de planes por código postal (Anhelo, Connie, GoHealth) | Requiere datos de planes actualizados y acuerdos con proveedores. Aumenta el riesgo regulatorio (afirmaciones sobre beneficios y primas). La ventaja de Silvia es la atención personal, no un comparador. **No recomendado.** |
| Chat en vivo o chatbot | Ningún competidor local lo usa. Requiere atención continua. Un bot que hable de planes debe cumplir las normas de CMS (el aviso TPMO también es obligatorio en chats). **No ahora.** |
| WhatsApp | Lo usan las agencias hispanas (Tx Medical Care, Coverage2Care). Puede encajar con el público, pero requiere que Silvia lo atienda, un número confirmado y reglas de consentimiento. **Valorar en la fase 2 si Silvia ya usa WhatsApp con clientes.** |
| SMS | Requiere consentimiento específico y registro 10DLC del número. El código ya contempla el consentimiento (`acceptsTexts=false`). **Solo si Silvia lo quiere.** |
| Blog con publicaciones frecuentes | Útil para SEO, pero exige constancia. Mejor empezar con 4–6 páginas "pilar" bien hechas (Sección 6). |
| Boletín por correo | No hay correo de la oficina todavía. **Más adelante.** |
| Calendario de charlas informativas (BYGA lo hace) | Puede ser un diferenciador local, pero las charlas educativas tienen reglas propias de CMS (no se puede vender en ellas). **Valorar con Silvia.** |
| Logotipos de aseguradoras | Requieren permiso escrito. Los nombres bastan (ya está previsto). |

---

## SECCIÓN 6. NUEVAS PÁGINAS Y SECCIONES

### Distinción previa

| Categoría | Contenido |
|---|---|
| **1. Servicios por confirmar con Silvia** | ¿Ofrece Medigap / Medicare Supplement? ¿Planes de medicamentos (Parte D)? ¿Planes D-SNP para personas con Medicare y Medicaid? ¿Inscribe en planes del Mercado ACA (está registrada en el Mercado federal)? ¿Ayuda con la solicitud de Medicaid o solo orienta? ¿Programas de ahorros de Medicare y "Extra Help"? |
| **2. Contenido educativo que podemos ofrecer sin vender** | Qué es Medicare (Partes A, B, C, D), Original frente a Advantage, periodos de inscripción, Medicaid en términos generales, diferencias entre programas y glosario. Debe enlazar a fuentes oficiales (Medicare.gov, HealthCare.gov / CuidadoDeSalud.gov, Texas HHS / YourTexasBenefits). |
| **3. Páginas comerciales solo si se presta el servicio** | "Medigap en El Paso", "Planes D-SNP", "Inscripción en el Mercado de Seguros". |

### Páginas recomendadas

| Página (EN/ES) | Objetivo | Público | Contenido | CTA | SEO | Prioridad |
|---|---|---|---|---|---|---|
| **Medicare** `/es/medicare` | Explicar Medicare y cómo ayuda Silvia | 64–65 años, personas con discapacidad, familiares | Partes A/B/C/D en lenguaje llano; Original frente a Advantage (tabla); cuándo inscribirse (inicial, AEP y especial, con enlaces a Medicare.gov); qué hace la oficina; aviso de CMS | "Llame a Silvia: (915) 256-9708" | Alto ("Medicare El Paso", "agente de Medicare en español El Paso") [palabras clave sin volumen verificado] | Alta |
| **Medicare y Medicaid juntos** `/es/medicare-y-medicaid` | Orientar a quienes tienen o podrían tener los dos | Adultos mayores con ingresos limitados; cuidadores | Qué significa tener los dos; que Texas decide la elegibilidad de Medicaid; programas de ahorros (con enlace oficial); D-SNP solo si se confirma | Llamar | Medio-alto | Alta si se confirma; si no, Media |
| **Medicaid** `/es/medicaid` | Orientar sin prometer elegibilidad | Ingresos limitados, personas con discapacidad | Qué es; quién decide (Texas HHS); enlace a YourTexasBenefits; qué documentos suelen pedirse; qué puede hacer la oficina | Llamar | Medio | Media |
| **Mercado de Seguros (Obamacare)** `/es/mercado-de-seguros` | Atender a menores de 65 sin Medicare | Familias y adultos sin cobertura | Qué es; periodos de inscripción (verificar las fechas de cada año); ayuda según ingresos; transición al cumplir 65 (Katy lo trata); aviso "no somos el Mercado" | Llamar | Medio ("Obamacare El Paso": BYGA tiene dominio propio, obamacareelpaso.com) | Media (alta solo si el ACA es una línea de negocio importante) |
| **Su cita: qué esperar** `/es/su-cita` | Reducir la ansiedad y preparar la consulta | Todos; especialmente familiares | Duración aproximada; presencial o por teléfono; lista de documentos para **traer** (tarjeta de Medicare, lista de medicamentos y médicos, tarjetas de seguro actuales); qué **no** enviar por internet; "sin compromiso"; qué pasa después | Llamar / agendar | Bajo-medio | Alta |
| **Preguntas frecuentes** `/es/preguntas` | Resolver dudas sin llamar | Todos | 12–20 preguntas en grupos: costos de la ayuda, fechas, Medicare y Medicaid, cambiar de plan, **familiares y cuidadores** (¿puedo llamar por mi mamá?, ¿puedo acompañarla?) | Llamar | Medio | Alta |
| **Conozca a Silvia** (sección ampliada o página) | Generar confianza en la persona | Todos | Introducción en sus palabras; idiomas; licencia; años de experiencia (si los aprueba); oficinas | Llamar | Bajo-medio (búsqueda por nombre) | Alta |
| **Recursos oficiales** `/es/recursos` | Credibilidad y ayuda real | Todos | Medicare.gov, 1-800-MEDICARE, consejería gratuita de Texas (TDI, 800-252-3439), CuidadoDeSalud.gov, YourTexasBenefits, Seguro Social | — | Bajo | Media |
| **Guía descargable** | Llevar la información a casa | Adultos mayores y familias | Versión imprimible de "Medicare en palabras sencillas" | Llamar | Bajo | Media (fase 2) |
| **Página de campaña para Facebook** `/es/ayuda-medicare` | Destino de los anuncios, sin distracciones | Tráfico de Facebook | Mensaje único, foto de Silvia, 3 pasos, teléfono grande, aviso de CMS | Llamar | Ninguno (`noindex`) | Media (cuando haya anuncios) |
| **Contacto** (página propia) | Facilitar la visita | Todos | Teléfono, horario, mapa, cómo llegar, estacionamiento y accesibilidad del local (si se confirma) | Llamar / Cómo llegar | Medio (local) | Media |

**Nota sobre la "página en español":** ya existe toda la versión `/es`. No hace falta una página aparte. Basta con hacer visible "Se habla español" y vigilar la calidad del texto en español (revisión por hablante nativo, ver Sección 9).

---

## SECCIÓN 7. OPORTUNIDADES PARA DIFERENCIARNOS

1. **"Una persona, no un centro de llamadas."**
   - Los nacionales (Chapter, GoHealth, Anhelo, Connie) dan teléfonos 1-8xx y agentes anónimos.
   - Los locales tampoco muestran a sus agentes, salvo Katy.
   - Silvia, con foto, nombre, oficina física y su propia voz, es el diferenciador. Mensaje sugerido: "Hable con Silvia en nuestra oficina de El Paso". [Recomendación]
2. **Español de verdad, no traducido a medias.** El texto en español actual es natural y usa "usted". Mantener esa calidad en todas las páginas nuevas supera a todo el mercado local observado.
3. **Educación antes que venta.** Los locales hablan de "$0 premium", "most competitive rates" y "beneficios gratis". Esas afirmaciones son arriesgadas (CMS restringe el uso de "free"; ver Sección 9) y generan desconfianza. Nosotros podemos ser "la oficina que le explica", con lenguaje sereno y enlaces oficiales.
4. **Pensar en la familia.** Ningún competidor se dirige a hijos y cuidadores. Una sección de FAQ y un mensaje del tipo "¿Ayuda a un familiar? Pueden venir juntos" encaja con cómo muchas personas mayores toman decisiones. [Inferencia: no tengo datos de cuántos clientes de Silvia llegan así; preguntarle.]
5. **Transparencia total en el pie:** licencia, aviso de CMS completo, dirección y horario. Ningún local tiene las cuatro cosas.
6. **Calma en lugar de urgencia artificial.** Avisar de las fechas reales (AEP) sin contadores ni "¡últimos días!". Es coherente con el "Sin presiones" que ya tenemos.

**Ideas de la lista inicial que aportan poco ahora:**

- **Comparador de planes:** tiene un coste y un riesgo altos y no es nuestra ventaja.
- **Chatbot:** requiere atención continua y debe cumplir las normas de CMS.
- **Página separada en español:** ya existe.
- **Blog frecuente:** antes de tener las páginas pilar no compensa.

---

## SECCIÓN 8. PLAN DE IMPLEMENTACIÓN

El esfuerzo está en horas de desarrollo y redacción. No incluye el tiempo de aprobación de Silvia ni de cumplimiento.

### Fase 1 — Esenciales (antes o justo al lanzar)

| Mejora | Esfuerzo | Dependencias | Beneficio |
|---|---|---|---|
| Licencia de Texas, NPN y aviso de CMS completo | 0.5 h | Silvia: número de licencia y cifras de organizaciones y productos (upline o cumplimiento) | Permite lanzar legalmente |
| Dominio (`site.url`) | 0.5 h | Comprar o confirmar el dominio | Activa el SEO, el sitemap y la indexación |
| "Se habla español" visible | 0.25 h | Confirmación de Silvia | Diferenciador principal |
| Presentación de Silvia | 1–2 h | Texto aprobado por Silvia | Confianza |
| Marca "by Silvia Alcazar" en la cabecera, el título y el schema | 0.5 h | — | Evita la confusión con Advantage Insurance Agency Inc |
| Un solo CTA principal en el hero (llamar) más uno secundario distinto ("Cómo funciona la cita") | 1 h | — | Menos confusión |
| Aviso de temporada AEP | 1–2 h | Fechas oficiales del año | Relevancia ahora mismo |
| Políticas de privacidad y términos reales | 2–4 h de redacción | Revisión profesional recomendada | Requisito para el mapa, la analítica y el formulario |
| Aprobación de todos los textos (`copyApproved`) | — | Silvia y cumplimiento | Bloqueante |

### Fase 2 — Captación

| Mejora | Esfuerzo | Dependencias | Beneficio |
|---|---|---|---|
| Página de Medicare con la comparación Original / Advantage | 5–7 h | Confirmar qué productos de Medicare ofrece | Ayuda y SEO |
| Página "Su cita: qué esperar" | 2–3 h | Proceso real de Silvia | Menos fricción |
| FAQ con sección para familiares | 4–6 h | Respuestas aprobadas | Resolver dudas |
| Perfil de Google, Facebook y enlaces sociales | 1 h en el sitio | Que existan los perfiles | Prueba social |
| Solicitud de llamada (activar el formulario existente) | 1–2 h, más configuración del envío | Decisión de Silvia, política de privacidad y destino de los mensajes | Captar fuera del horario |
| TTY 711 | 0.25 h | Confirmación | Accesibilidad |
| Medición sin cookies de los clics en "Llamar" | 2–4 h | Política de privacidad | Saber qué funciona |
| Página de destino para Facebook | 3–4 h | Que haya campañas | Mejor rendimiento de los anuncios [Inferencia] |

### Fase 3 — Crecimiento y SEO

| Mejora | Esfuerzo | Dependencias | Beneficio |
|---|---|---|---|
| Páginas de Medicaid, Mercado ACA y Medicare con Medicaid | 8–12 h | Confirmar los servicios | Cubrir todos los temas |
| Guía "¿Qué ayuda necesito?" | 6–10 h | Páginas por servicio publicadas | Orientación inmediata |
| Página de recursos oficiales | 2 h | — | Credibilidad |
| Guía en PDF descargable | 6–10 h | Contenido aprobado | Material para compartir y para eventos |
| Agenda en línea | 1 h | Herramienta y disciplina de agenda | Comodidad |
| Oficinas 2 y 3 (ya previstas en el código) | 0.5 h | Direcciones | SEO local en más zonas |
| Contenido para Facebook (ver abajo) | Continuo | Responsable en la oficina | Alcance |
| Segunda ronda de competencia local y de anuncios | 3–4 h | Navegador interactivo | Completar el análisis |

### Estrategia de contenido para Facebook (borrador)

[Recomendación: no tengo datos de rendimiento.]

- **Ritmo:** 1–2 publicaciones por semana, alternando inglés y español.
- **Formatos:**
  - "Palabra de la semana" (glosario);
  - "¿Sabía que…?" con fechas reales;
  - presentación de la oficina y de Silvia;
  - recordatorios del AEP;
  - "Pregúntele a Silvia" con preguntas frecuentes respondidas en video corto.
- **Reglas:**
  - cada publicación que mencione planes o beneficios de Medicare debe cumplir las normas de CMS: aviso de TPMO y sin "gratis" ni superlativos;
  - sin testimonios sin revisar;
  - enlazar siempre a la página del sitio correspondiente.

---

## SECCIÓN 9. RIESGOS Y ASUNTOS POR CONFIRMAR

**No es asesoramiento legal.** Distingo tres cosas:

- **(V) Obligación verificada:** la leí en la norma.
- **(B) Buena práctica.**
- **(P) Requiere un profesional:** abogado, cumplimiento del upline o de la aseguradora.

### Riesgos

| Tema | Detalle | Tipo |
|---|---|---|
| Aviso de TPMO | Texto consultado: "We do not offer every plan available in your area. Currently we represent [X] organizations which offer [Y] products in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options." Debe mostrarse "prominently" en el sitio, también en correos y chats, y decirse verbalmente en las llamadas de venta ([422.2267(e)(41)](https://www.law.cornell.edu/cfr/text/42/422.2267)). Nuestro pie añade además el SHIP local (Medicare Express y Connie también lo mencionan). Es información adicional, pero hay que **confirmar con cumplimiento el texto vigente exacto**. | V / P |
| Uso de "free" (gratis) | Prohibido usar "free" para describir una prima de $0 o beneficios ([422.2262(a)(1)(xi) y (a)(2)(iii)](https://www.law.cornell.edu/cfr/text/42/422.2262)). Varios competidores lo hacen ("$0 Cost Benefits"). Nosotros no debemos. Decir que la consulta con Silvia no tiene costo es distinto, pero conviene confirmarlo. | V / P |
| Nombre y logotipo de Medicare | No sugerir que CMS o Medicare respaldan a la agencia. La imagen de la tarjeta de Medicare solo puede usarse con autorización de CMS ([422.2262(a)(1)(ix), (xvii)](https://www.law.cornell.edu/cfr/text/42/422.2262)). No usar la tarjeta en "qué traer" como imagen; basta con el texto. | V |
| Testimonios | Si promocionan a una aseguradora o un plan, deben identificar el producto, la persona debe haber estado inscrita y hay que indicar si se le pagó ([422.2262(b)](https://www.law.cornell.edu/cfr/text/42/422.2262)). Además aplican las guías de la FTC sobre testimonios (no consultadas en esta sesión). El sitio ya los bloquea hasta que se revisen. **Recomendación:** enlazar a las reseñas de Google en lugar de copiarlas. | V / P |
| Citas de Medicare y Scope of Appointment | Antes de una cita de venta hay que acordar y registrar el alcance (por escrito si es presencial). La autorización vale 12 meses ([422.2264](https://www.law.cornell.edu/cfr/text/42/422.2264)). La norma de espera de 48 horas entre el SOA y la cita **no aparecía en el texto consultado: verificar con cumplimiento** antes de ofrecer una agenda en línea que dé citas "para hoy". | V / P |
| Eventos | En los eventos educativos no se puede vender ni presentar planes concretos. En los eventos de ventas no se puede exigir información de contacto para asistir ([422.2264](https://www.law.cornell.edu/cfr/text/42/422.2264)). | V |
| Compartir datos de los clientes | CMS prohíbe que una TPMO comparta datos de beneficiarios con otra TPMO sin consentimiento previo, expreso y por escrito. En el litigio *Americans for Beneficiary Choice v. HHS* (N.D. Tex.) se suspendieron otras partes de esa norma, pero **no** la del consentimiento ([fuente](https://tcpaworld.com/2024/07/07/arbitrary-and-capricious-a-sign-of-things-to-come/)). Estado actual: **verificar**. Regla práctica: los datos del formulario no se venden ni se comparten. | V (estado parcial) / P |
| Llamadas y SMS (TCPA) | La regla de consentimiento "uno a uno" de la FCC fue anulada por el 11.º Circuito el 24/1/2025 ([Morrison Foerster](https://mofo.com/resources/insights/250130-eleventh-circuit-vacates-fcc-s-tcpa-one-to-one-consent-rule)). El TCPA sigue exigiendo consentimiento para llamadas automatizadas y mensajes de marketing. El formulario ya incluye un consentimiento separado para SMS ("no es condición de compra", STOP). Para enviar SMS hace falta registrar el número (10DLC) con el proveedor. | V / P |
| Datos sensibles en formularios | El formulario ya avisa: "no envíe su número de Medicare, Seguro Social ni información médica". Mantener los formularios mínimos. No pedir fecha de nacimiento, medicamentos ni ingresos en línea; eso se habla en la cita. | B |
| Píxeles publicitarios | La FTC ha sancionado el envío de información de salud a plataformas publicitarias (casos GoodRx y BetterHelp; no consultados en esta sesión). Instalar el Meta Pixel en páginas sobre Medicaid o discapacidad puede revelar información sensible. **Recomendación:** no usarlo en el sitio, o solo en la página de campaña y sin eventos de formulario, tras una revisión profesional. | B / P |
| Mapa de Google incrustado | Envía datos del visitante a Google. Debe mencionarse en la política de privacidad. | B |
| Logotipos de aseguradoras | Requieren permiso escrito. Mostrar solo los nombres confirmados (ya previsto). Las aseguradoras suelen exigir revisar los sitios de sus agentes que mencionan sus planes. | B / P |
| Mercado ACA | Si Silvia inscribe en el Mercado federal, aplican las normas de agentes registrados (45 CFR 155.220, no consultado en esta sesión). Mantener el aviso "no somos el Mercado" (ya existe). | P |
| Normas de publicidad de Texas (TDI) | Es posible que Texas tenga reglas propias sobre publicidad de seguros de salud y suplementos. No las verifiqué. | P |
| Confusión de marca | Advantage Insurance Agency Inc opera en El Paso con un nombre parecido. Consultar si "Advantage Insurance Plans" está registrado como DBA y usar siempre "by Silvia Alcazar". | P |
| Calidad del español | Una traducción incorrecta de términos de Medicare puede inducir a error. Revisión por hablante nativo con conocimiento del sector. | B |

### Lo que necesitamos preguntar a Silvia

1. Número de licencia de Texas y NPN. ¿Tiene licencia en otros estados (p. ej. Nuevo México)?
2. Cuántas **organizaciones** y cuántos **productos** de Medicare representa en su zona, para el aviso de CMS. ¿Quién es su upline o FMO? ¿Exigen aprobar el sitio?
3. ¿Atiende en inglés **y** en español? ¿Hay más personas en la oficina que atiendan?
4. Servicios exactos: ¿Medigap? ¿Parte D? ¿D-SNP? ¿Inscribe en el Mercado ACA (registro FFM)? ¿Ayuda con la solicitud de Medicaid o solo orienta?
5. Aseguradoras confirmadas para este año (la lista actual no está verificada).
6. ¿La consulta tiene costo para el cliente? (Normalmente no, pero hay que confirmarlo antes de publicarlo.)
7. ¿Acepta llamadas TTY o de retransmisión?
8. Correo de la oficina. Facebook. Perfil de Google (URL).
9. Direcciones de las oficinas 2 y 3.
10. Su presentación en sus propias palabras: años de experiencia, por qué hace este trabajo y foto autorizada.
11. ¿Quiere recibir solicitudes en línea (formulario o agenda)? ¿Quién responde y en cuánto tiempo?
12. ¿Usa WhatsApp con clientes? ¿Quiere SMS?
13. ¿Hace o quiere hacer charlas informativas?
14. ¿Atiende en casa del cliente o solo en la oficina y por teléfono?
15. Dominio deseado para el sitio.
16. ¿Tiene reseñas en Google que se puedan enlazar?
17. ¿Qué documentos pide realmente que traigan a la primera cita?

---

## SECCIÓN 10. RECOMENDACIÓN FINAL — LAS 10 PRIMERAS MEJORAS

1. **Aviso de CMS completo, licencia y NPN visibles.** Es obligatorio, bloquea el lanzamiento y casi ningún competidor local lo hace bien. Es una ventaja de confianza que cuesta muy poco.
2. **"Se habla español" visible (si se confirma).** Es la mayor brecha del mercado local, y la versión en español ya está hecha.
3. **Presentación real de Silvia.** La atención personal es lo que la distingue de los 1-800 nacionales, y hoy el sitio usa un texto genérico.
4. **Marca "by Silvia Alcazar" en todas partes, más el Perfil de Google.** Existe un competidor local con nombre casi igual. Las llamadas y las reseñas deben llegar a la oficina correcta.
5. **Página de Medicare con la comparación Original frente a Advantage.** Es la duda número uno del público principal y la primera página de SEO local.
6. **"Su cita: qué esperar y qué traer".** Ningún competidor la tiene, reduce la ansiedad y protege la privacidad: los documentos se traen, no se envían.
7. **FAQ con sección para familiares y cuidadores.** Resuelve dudas sin llamar y atiende a quien a menudo hace la búsqueda en Google por su padre o su madre. [Inferencia]
8. **Aviso de temporada AEP (15 oct – 7 dic).** La temporada empieza en cinco días. Es información útil y real, sin presión.
9. **Un CTA principal claro en el hero.** Hoy dos botones llevan casi al mismo resultado. Hay que simplificar para quien lee despacio.
10. **Solicitud de llamada fuera del horario (activar el formulario existente) junto con la política de privacidad.** Es el siguiente paso de captación. El código ya existe, pero depende de la decisión de Silvia y de tener la política lista.

A continuación vendrían, por orden: la página Medicare y Medicaid, TTY 711, la medición sin cookies y la guía "¿Qué ayuda necesito?".

---

## Anexo A. Fuentes consultadas

**Competidores (páginas públicas visitadas el 10/10/2026):**

- https://advantageinsuranceagency.net/
- https://advantageinsuranceagency.net/areas-of-service/el-paso-medicare-advantage/
- https://www.medicareexpress.info/
- https://www.medicareexpress.info/en-espanol.html
- https://www.bygahealthcareinsurance.com/medicare-plans.html
- https://elpasomedicareadvantageplans.com/
- https://texasmedicalcareplans.com/en/home/
- https://medicareagent.humana.com/tx/elpaso
- https://www.conniehealth.com/medicare-near-me/medicare-advantage-plans/texas/el-paso-county/el-paso/
- https://www.anhelosalud.com/
- https://www.askchapter.org/
- https://coverage2care.com/inicio/
- https://medicareinkaty.com/
- https://www.gohealth.com/medicare/
- https://www.advocatehealthadvisors.com/

**No accesibles:**

- https://boomerbenefits.com/ (403)
- https://www.medicareinteractive.org/es (403)
- https://www.ehealthinsurance.com/medicare/ (tiempo de espera agotado)

**Datos técnicos de SEO** (título, meta, H1, JSON-LD, viewport, scripts): extraídos del HTML de cada página con curl el 10/10/2026.

**Terceros:**

- [BizQuest – agencia en venta en El Paso](https://www.bizquest.com/business-for-sale/well-established-insurance-agency-in-el-paso-tx-1-3m-1-4m/BW2527587/)
- [Yext – Boomer Benefits](https://directory.yext.com/en/boomer-benefits-1956184856)
- [Nota de prensa de Boomer Benefits](https://lifestyle.kbew98country.com/story/91466/boomer-benefits-celebrates-over-13000-5-star-reviews-reinforcing-its-aim-to-become-the-best-medicare-broker-in-dallas-texas/)
- [KFOX14 – Advocate Health Advisors](https://int.kfoxtv.com/community/senior-healthy-living/advocate-health-advisors-we-provide-expertise-in-the-medicare-environment-in-el-paso)
- [BBB El Paso – Medicare](https://wwwwww.bbb.org/us/tx/el-paso/category/medicare)
- [1800insurance – agentes de El Paso](https://www.1800insurance.com/agents/texas/el-paso/alliance-insurance-solutions-llc-77PQ10Y)
- [Expertise – El Paso](https://www.expertise.com/insurance/health-insurance/texas/el-paso)
- [Lanzamiento de Anhelo (WTW)](https://wtwco.com/en-us/news/2021/06/willis-towers-watson-launches-anhelo-a-new-brand-to-help-latino-seniors-navigate-medicare)

**Fuentes oficiales y legales:**

- [42 CFR 422.2262](https://www.law.cornell.edu/cfr/text/42/422.2262)
- [42 CFR 422.2264](https://www.law.cornell.edu/cfr/text/42/422.2264)
- [42 CFR 422.2267](https://www.law.cornell.edu/cfr/text/42/422.2267)
- [Medicare.gov](https://www.medicare.gov/)
- [TDI – recursos de Medicare](https://www.tdi.texas.gov/consumer/hicap/)
- [Anulación de la regla uno a uno de la FCC (Morrison Foerster)](https://mofo.com/resources/insights/250130-eleventh-circuit-vacates-fcc-s-tcpa-one-to-one-consent-rule)
- [Litigio TPMO (TCPAWorld)](https://tcpaworld.com/2024/07/07/arbitrary-and-capricious-a-sign-of-things-to-come/)

**Nuestro sitio:** código en `src/`, `npm run check:launch` (4 bloqueantes y 9 recomendados) y `next build` más `next start` en local.
