# Revisión de contenido antes del lanzamiento

Auditoría técnica y lingüística del 15/10/2026. **Esto no es una aprobación.** `site.copyApproved` sigue en `false`
hasta que Silvia apruebe cada página en inglés y en español y el contenido de Medicare pase la revisión de cumplimiento.

Leyenda:
- **[S]**: Silvia debe aprobarlo (exactitud, tono, afirmaciones sobre la oficina).
- **[C]**: revisión de cumplimiento de Medicare (upline/FMO o responsable de cumplimiento). No se declara que el texto cumpla la normativa de CMS.
- **[Corregido]**: cambio técnico o lingüístico ya hecho en esta auditoría (sin cambiar afirmaciones comerciales).

Dónde están los textos: página principal y elementos comunes en `src/content/dictionaries/en.ts` y `es.ts`;
páginas interiores en `src/content/pages/en.ts` y `es.ts`; datos de la agencia en `src/config/site.ts`.
La estructura EN/ES de las páginas interiores se comprueba automáticamente al compilar (mismas secciones y preguntas).

## Comprobaciones generales

- [x] Las dos versiones de cada página interior tienen las mismas secciones, bloques y preguntas (validación en `src/content/pages/index.ts`).
- [x] No hay precios, primas, beneficios concretos, garantías, promesas de ahorro o elegibilidad, ni frases tipo "el mejor plan".
- [x] Ninguna página dice que la oficina vende o tramita un producto: los bloques "Cómo le puede ayudar nuestra oficina" dependen de `site.scope` (todo pendiente).
- [x] Las fechas de inscripción se comprobaron en esta auditoría: Medicare (15 oct – 7 dic; MA OEP 1 ene – 31 mar) y Mercado de Seguros 2027 (1 nov 2026 – 15 ene 2027; 15 dic para empezar el 1 de enero). **Revisar cada año**; la fecha final del Mercado depende de un litigio sobre la norma federal de 2025.
- [x] No se publican testimonios, logotipos de aseguradoras, licencias, NPN, TTY ni idiomas sin confirmar.
- [ ] [S] El sitio dice "El Paso" en títulos, descripciones y llamadas a la acción, pero una oficina está en Sunland Park (NM). ¿Es correcto presentarse como oficina de El Paso?

## Página principal (`/en`, `/es`)

| Sección | Puntos a aprobar |
|---|---|
| Metadatos (título y descripción) | [S] "ayuda a personas de 65 años o más, personas con discapacidades y sus familias en El Paso…" |
| Hero | [S] "Hable con {Silvia} por teléfono o en persona": ¿atiende Silvia personalmente o también su equipo? [S] "Hable con una persona real". |
| Servicios | [S][C] Descripciones educativas de Medicare, Medicaid, Medicare + Medicaid y el Mercado. "Le ayudamos a averiguarlo" (cuál programa le corresponde). |
| Cómo le ayudamos | [S][C] "Revisamos su situación… le explicamos las opciones de cobertura que podrían aplicar". "Sin presiones". |
| Conozca a Silvia | [S] Texto neutro provisional (no hay presentación propia). "Nos tomamos el tiempo para escucharle…" y "visitar nuestra oficina en El Paso". |
| En familia (Thrive After 60) | [S] Añadido el 16/10/2026. "Silvia Alcazar con sus hijos, Alex y Humberto, en la sesión fotográfica para la revista Thrive After 60" (EN/ES): confirmar nombres (el video de la entrevista lo llama Alejandro) y el nombre de la revista. [S] Derechos de uso de las 4 fotos (fotógrafo/revista) y permiso de Alex y Humberto. El texto no da a entender respaldo de la revista. |
| Videos y eventos | [S] Comercial: "un mensaje breve… para personas nuevas en Medicare". [C] Si el comercial menciona planes o beneficios, confirmar que se presentó/aprobó como material de marketing. [S] Entrevista con Alejandro Alcazar: permiso de Alejandro, descripción del reconocimiento (el video no dice quién lo otorgó; no se añade). [S] Fotos del evento de TelevisaUnivision: derechos de las fotos y permiso de las personas que aparecen; el texto no da a entender respaldo de TelevisaUnivision. |
| Preguntas frecuentes (extracto) | Ver la página de preguntas. |
| Glosario "Palabras que puede escuchar" | [C] Definiciones generales de Medicare Original, Medicare Advantage, Parte D, Medicaid, Mercado, prima, deducible, copago, red y periodo de inscripción. |
| Contacto | [S] "Con gusto le ayudamos". Direcciones de las 4 oficinas y horario lun–vie 9:00–16:00. Foto de Street View oculta en producción. |
| Pie de página | Ver "Avisos legales del pie". |

## Avisos legales del pie (todas las páginas) — revisión de cumplimiento obligatoria

| Texto | Estado | Puntos |
|---|---|---|
| Aviso de CMS para TPMO ("No ofrecemos todos los planes… representamos a 12 organizaciones que ofrecen 68 productos…") | Publicado | [C] Confirmar las cifras, el área y la fecha. Texto basado en 42 CFR 422.2267(e)(41). |
| "La cantidad exacta de aseguradoras y planes depende de su código postal y condado." | Publicado | [C] |
| Párrafo de representación ("Advantage Insurance Plans representa a organizaciones de planes Medicare Advantage HMO, PPO, PFFS y de planes de medicamentos… calificación de 5 estrellas") | **Oculto** hasta que `scope.medicareAdvantage` o `scope.partD` sea `true` | [S] Afirma qué tipos de planes representa la oficina (incluido PFFS). [C] Revisar el texto completo. |
| "AIP es una marca operada por Advantage Insurance Plans y es utilizada por sus agentes y agencias de seguros independientes afiliados con licencia, que están certificados para vender productos de Medicare…" | Publicado | [S][C] El sitio no usa la sigla "AIP" en ningún otro lugar. Confirmar si existe esa marca, si hay agentes/agencias afiliados y la certificación anual para vender Medicare. Parece texto de otra organización; confirmar que aplica a esta agencia. |
| "{marca} no tiene vínculo con el gobierno de EE. UU. ni con el programa federal de Medicare, ni cuenta con su respaldo." | Publicado | [Corregido] Gramática en ES ("no está vinculado ni respaldado por"). [C] |
| Aviso del Mercado ("{marca} no es el Mercado de Seguros Médicos®…") | Publicado | [C] |
| "La agencia de Medicaid de su estado decide quién califica para Medicaid." | Publicado | [S] |
| "La información de este sitio es general y educativa…" | Publicado | [S] |

## Páginas interiores (`src/content/pages`)

### Medicare — `/en/medicare`, `/es/medicare`
- [C] Quién puede tener Medicare, partes A–D, tabla Medicare Original vs. Medicare Advantage (fuente: Medicare.gov), qué revisar al comparar, periodos de inscripción.
- [S] "{Silvia} puede explicarle estas opciones… en persona o por teléfono".
- [S] Bloque de servicios: pendiente de `scope.medicareAdvantage`, `partD`, `medigap`.
- [Corregido] ES: "Quien decide… es el Seguro Social y Medicare" → "Quienes deciden… son el Seguro Social y Medicare".
- [S] Añadido el 16/10/2026: ilustración de una tarjeta de Medicare en blanco ("Ilustración de una tarjeta de Medicare. No contiene datos personales.").

### Medicaid — `/en/medicaid`, `/es/medicaid`
- [S] Todo el contenido es de Texas (Texas HHS, YourTexasBenefits, 2-1-1 Texas). ¿Atiende la oficina a residentes de Nuevo México?
- [S] "Podemos explicarle cómo funciona Medicaid… y qué suele pedir la solicitud". Bloque de servicios pendiente de `scope.medicaidApplications`.
- [S] Añadido el 16/10/2026: ejemplo de tarjeta de Medicaid de Texas (Your Texas Benefits) en blanco, en la sección "¿Qué es Medicaid?". Confirmar que se puede mostrar la imagen con el logotipo de Texas HHSC.

### Medicare y Medicaid — `/en/medicare-and-medicaid`, `/es/medicare-y-medicaid`
- [C] Coordinación de pagos, Programas de Ahorros de Medicare, Ayuda Adicional, D-SNP, oportunidades adicionales para cambiar de cobertura.
- [S] "Traiga sus cartas o tarjetas… y le ayudamos a entender qué tiene ahora". Servicios pendientes de `scope.dsnp`, `scope.medicaidApplications`.

### Mercado de Seguros — `/en/aca-marketplace`, `/es/mercado-de-seguros`
- [S] Fechas de 2027 (comprobadas; revisar si cambia la norma federal).
- [S] Transición al cumplir 65 años. Servicio pendiente de `scope.acaEnrollment` (requiere registro como agente en HealthCare.gov).

### Primera cita — `/en/first-appointment`, `/es/primera-cita`
- [S] Pasos, qué traer, venir con un familiar.
- [C] Descripción del "Alcance de la cita" (Scope of Appointment). Confirmar que refleja cómo lo hace la oficina.
- [S] Aviso de no enviar datos sensibles por internet.

### Preguntas frecuentes — `/en/faq`, `/es/preguntas-frecuentes`
- [C] Respuestas sobre Medicare, Medicaid, Mercado y fechas.
- [S] "¿La oficina me puede ayudar a entender mis opciones? Sí…". "¿Puedo llamar por mi mamá o mi papá?".
- [Corregido] "¿Cómo me comunico con la oficina?": decía "visite nuestra oficina en El Paso" aunque el sitio publica cuatro oficinas (una en NM); ahora dice "una de nuestras oficinas… las direcciones".

### Recursos — `/en/resources`, `/es/recursos`
- [S] Teléfonos y sitios oficiales (Medicare, Seguro Social, Texas HICAP, Texas HHS, 2-1-1, HealthCare.gov). Solo Texas.

### Política de privacidad y términos — `/privacy`, `/terms`
- Publicadas el 2026-10-15 (`src/content/legal/index.ts`). Ver `silvia-confirmations.md`, punto 15.

## Otras correcciones lingüísticas hechas

- EN/ES: título "Televisa Univision" → "TelevisaUnivision" (igual que en el resto del sitio).
- ES (formulario, hoy desactivado): "Otra cosa / No estoy seguro" → "Otra cosa / No lo sé" (neutral en género).

## Cómo se registra la aprobación

1. Silvia revisa esta lista en el sitio de desarrollo (`npm run dev`), en inglés y en español.
2. Los cambios que pida se aplican en los archivos indicados.
3. El responsable de cumplimiento revisa los puntos [C] y el pie de página.
4. Solo entonces: `src/config/site.ts` → `copyApproved: true`. Conviene anotar en el commit la fecha y quién aprobó.
