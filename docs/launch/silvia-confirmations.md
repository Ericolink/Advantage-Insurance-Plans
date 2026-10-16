# Datos y confirmaciones que necesitamos de Silvia

Fecha de la auditoría: 15/10/2026. Nada de esta lista se ha inventado ni marcado como aprobado.
Cada respuesta se introduce en el archivo indicado; `npm run check:launch` deja de mostrar el punto
solo cuando el dato real está puesto.

**Bloquean el lanzamiento:** 1 (dominio), 2 (licencias) y 14 (aprobación de textos y revisión de cumplimiento de Medicare).

---

## 1. Dominio definitivo — BLOQUEANTE

- **Qué necesitamos:** el dominio que se va a usar, por ejemplo `www.<dominio>.com`, y quién lo administra.
- **Dónde se pone:** `src/config/site.ts` → `url: "https://www.<dominio>.com"` (con https y sin barra final).
- **Estado actual:** no figura en ningún archivo del proyecto (ni `netlify.toml`, ni `.env`, ni el perfil de Google).
  Mientras falte, el sitio no genera enlaces canonical, hreflang, Open Graph, sitemap ni URLs en los datos
  estructurados, y todas las páginas quedan como `noindex`.
- La validación rechaza `localhost`, dominios de ejemplo y subdominios temporales (`*.netlify.app`, `*.vercel.app`).

## 2. Licencias estatales — BLOQUEANTE

Para **cada** licencia (de Silvia y, si existe, de la agencia):

| Dato | Ejemplo de formato (no es un dato real) |
|---|---|
| Estado que la emite | `TX` |
| Número de licencia, tal como aparece en la consulta del estado | el que muestra TDI |
| Titular | licencia individual de Silvia (`agent`) o de la agencia (`agency`) |
| Confirmación de que está activa y cubre seguros de salud (Life, Accident & Health o equivalente) | — |

- **Texas:** consulta pública en TDI (Texas Department of Insurance).
- **Nuevo México:** el sitio muestra una oficina en **2603 McNutt Rd, Sunland Park, NM**. Hay que confirmar si
  Silvia o la agencia tienen licencia en Nuevo México (Office of Superintendent of Insurance). Si una oficina
  de NM se publica sin licencia de NM, el check lo señala.
- **No confundir con:** el NPN (punto 3), el teléfono, el EIN/número fiscal ni el número de registro de la empresa.
  La validación rechaza un número de licencia con forma de teléfono o igual al NPN.
- **Dónde se pone:** `src/config/site.ts` → `licenses: [{ state: "TX", number: "…", holder: "agent" }]`.
  Se muestra en el pie de página, en inglés y en español ("Licensed in TX · License #…" / "Con licencia en TX · Licencia n.º …").

## 3. NPN (National Producer Number)

- **Qué necesitamos:** el NPN de Silvia (solo dígitos; se consulta en NIPR).
- **Dónde se pone:** `site.ts` → `npn`. Se muestra en el pie de página. Hoy no se muestra nada.

## 4. Correo electrónico oficial

- **Qué necesitamos:** la dirección que la oficina revisa a diario (idealmente del dominio del punto 1).
- **Dónde se pone:** `site.ts` → `contact.email`. Hoy no se muestra ningún correo. La validación rechaza
  direcciones de ejemplo (`example.com`, etc.).

## 5. Idiomas de atención

- **Qué necesitamos:** en qué idiomas atiende la oficina a sus clientes, por teléfono y en persona
  (¿Silvia? ¿el resto del equipo?). Que el sitio esté en inglés y en español no lo demuestra.
- **Dónde se pone:** `site.ts` → `languages: ["en", "es"]` (o el que corresponda).
- **Efecto:** muestra "Se habla español" / "We speak English", la fila "Idiomas" en Contacto y el selector de idioma del formulario.

## 6. TTY 711

- **Qué necesitamos:** confirmar que la oficina contesta llamadas que llegan por el servicio de retransmisión 711
  (conviene hacer una llamada de prueba).
- **Dónde se pone:** `site.ts` → `contact.tty: true`. Mientras tanto no se muestra "TTY: 711".

## 7. Servicios que ofrece la oficina (`site.scope`)

Responder **sí o no** a cada uno. Mientras sigan en `null`, las páginas solo explican el programa y piden llamar;
nunca dicen que la oficina lo vende o lo tramita.

| Clave | Pregunta para Silvia | Páginas que dependen de ella | Texto que se mostraría si es "sí" |
|---|---|---|---|
| `medicareAdvantage` | ¿Ayuda a comparar e inscribirse en planes Medicare Advantage? ¿De qué compañías? | `/medicare` ("Cómo le puede ayudar nuestra oficina"); además activa el párrafo de representación de planes en el pie | "Ayuda para comparar e inscribirse en planes Medicare Advantage de las compañías que representamos." |
| `partD` | ¿Ofrece planes de medicamentos (Parte D) independientes? | `/medicare`; pie (igual que arriba) | "Ayuda con planes de medicamentos de Medicare (Parte D)." |
| `medigap` | ¿Vende seguros suplementarios Medigap? | `/medicare` | "Seguros suplementarios de Medicare (Medigap)." |
| `dsnp` | ¿Ofrece planes D-SNP para personas con Medicare y Medicaid? | `/medicare-y-medicaid` | "Planes para personas con Medicare y Medicaid (D-SNP)." |
| `medicaidApplications` | ¿Ayuda a preparar solicitudes de Medicaid de Texas? (¿y de Nuevo México?) | `/medicaid`, `/medicare-y-medicaid` | "Ayuda para preparar una solicitud de Medicaid de Texas." |
| `acaEnrollment` | ¿Inscribe en planes del Mercado de Seguros (está registrada en HealthCare.gov como agente)? | `/mercado-de-seguros` | "Inscripción en planes del Mercado de Seguros Médicos." |

Dónde se pone: `site.ts` → `scope`.

## 8. Compañías aseguradoras

En el proyecto hay una lista "ilustrativa": UnitedHealthcare, Humana, Devoted Health, Alignment Health, HealthSpring.
**Está oculta** y no se publica hasta que Silvia confirme:

- Con qué compañías tiene **nombramiento (appointment) vigente** para el año de planes 2027.
- En qué estados (TX, NM).
- Si alguna de la lista ya no aplica o falta alguna.
- Los logotipos no se usan sin permiso escrito de cada compañía; solo se muestran los nombres.

Dónde se pone: `site.ts` → `carriers.names` y `carriers.confirmed: true`.

## 9. Cifras del aviso de CMS (verificar)

El pie de página publica: "Actualmente representamos a **12** organizaciones que ofrecen **68** productos en su área".
Estas cifras ya estaban en `site.ts` (`regulated.medicareOrganizations` / `medicareProducts`), pero el proyecto no indica
su origen ni su fecha. Silvia o su upline/contacto de cumplimiento deben confirmar que son correctas para 2027 y para qué área.

## 10. Presentación de Silvia (`site.about.intro`)

- En el proyecto **no existe** ninguna presentación escrita por Silvia ni una propuesta incorporada.
  Hoy se muestra un texto neutro ("Silvia Alcazar es su contacto en Advantage Insurance Plans…").
- **Qué necesitamos:** 2–4 frases en sus palabras, en inglés y en español (opcional: cómo empezó, `about.story`).
  No se inventan años de experiencia, premios ni certificaciones.
- **Dónde se pone:** `site.ts` → `about.intro` / `about.story` y, cuando ella lo apruebe, `about.approvedOn: "AAAA-MM-DD"`.
  Sin fecha de aprobación, el texto solo se ve en desarrollo, marcado como borrador.

## 11. Mensaje personal de Silvia (`src/content/message.ts`)

- Es una **propuesta editorial** escrita por el equipo web, en inglés y en español. No está publicada.
- **Qué necesitamos:** que Silvia la lea, la corrija si quiere y la apruebe en los dos idiomas.
  En particular: ¿le parece bien hablar de "mi equipo"?
- **Dónde se pone:** `approved: true` **y** `approvedOn: "AAAA-MM-DD"`. Con solo `approved: true` el mensaje sigue
  oculto y el check bloquea el lanzamiento hasta que se registre la fecha.

## 12. Fotografía propia de la oficina

- La imagen actual (`public/images/office.webp`) es una captura de Google Street View. **Ya no se publica en producción**
  (solo se ve en desarrollo, marcada como provisional), para no presentarla como foto propia de la agencia.
- **Qué necesitamos:** una foto propia de la fachada o la entrada de la oficina principal (4900 Alameda Ave, Ste E),
  horizontal (aprox. 3:2), sin personas identificables o con su permiso.
- **Dónde se pone:** sustituir `public/images/office.webp` (o añadir otro archivo) y en `site.ts` → `officePhoto`
  actualizar `width`/`height`, `credit: null` y `source: "own"`.

## 13. Perfil oficial de Google

- **Qué necesitamos:** el enlace del botón "Compartir" del Perfil de Empresa de Google que Silvia administra.
- **Candidato a verificar (no configurado):** el mapa insertado de la oficina principal apunta a la ficha
  "Advantage Insurance Plans by Silvia Alcazar", cuyo identificador corresponde a
  `https://maps.google.com/?cid=12859633134886481105`. Silvia debe confirmar que esa ficha es la suya y que la administra.
- **Dónde se pone:** `site.ts` → `socials.google`. La validación rechaza enlaces de búsqueda de Google.

## 14. Aprobación de los textos y revisión de cumplimiento de Medicare — BLOQUEANTE

Ver `docs/launch/content-review.md`: lista de cada página, en inglés y en español, con los puntos concretos que
Silvia debe aprobar y los que necesitan revisión de cumplimiento de Medicare. Cuando todo esté aprobado: `site.ts` → `copyApproved: true`.

## 15. Datos para la política de privacidad y los términos de uso

Los borradores están en `src/content/legal/drafts.ts` (solo se ven en desarrollo, en `/es/privacy` y `/es/terms`).
Están basados en lo que el sitio hace realmente y marcan con `[PENDIENTE]` / `[PENDING]` lo que falta:

- Nombre legal exacto del negocio que opera el sitio (¿LLC? ¿a nombre de Silvia?).
- Proveedor de alojamiento definitivo (el proyecto incluye `netlify.toml`, pero no está confirmado) y cuánto tiempo guarda los registros.
- Confirmar que la oficina no vende ni comparte información del sitio con otras agencias, aseguradoras ni empresas de mercadeo, y qué proveedores la reciben.
- Si existe un aviso de privacidad aparte para llamadas y citas.
- Correo o dirección postal para consultas de privacidad.
- Estados con licencia (para los términos).
- Derechos para publicar el comercial de TV, la entrevista y las fotos del evento de TelevisaUnivision.
- **Revisión legal:** derechos aplicables según las leyes de Texas/Nuevo México, limitación de responsabilidad y ley aplicable.
  El borrador no incluye ninguna cláusula de ese tipo.

Después: mover el texto a `src/content/legal/index.ts` y poner `legal.privacyPolicyReady` / `legal.termsReady: true` en `site.ts`.
El check bloquea si se publica un documento que todavía tiene marcadores pendientes.

## 16. Otros puntos detectados en la auditoría

- **Oficina de Sunland Park (NM):** las páginas de Medicaid y los recursos hablan solo de Texas. ¿Atiende la oficina a
  residentes de Nuevo México? Si es así, habría que añadir los recursos oficiales de NM (no se ha escrito nada sobre NM
  para no afirmar algo sin confirmar).
- **Teléfonos de las otras oficinas:** no hay teléfono propio para George Dieter, Sunland Park ni Myrtle; se usa el principal.
