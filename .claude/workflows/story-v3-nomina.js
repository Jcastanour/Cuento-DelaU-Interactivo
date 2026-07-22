export const meta = {
  name: 'story-v3-nomina',
  description: 'Historia definitiva EN CALIENTE: "La nómina de más" con narrador sarcástico, 3 voces paralelas, edición, verificación de hilo y anti-cliché',
  phases: [
    { title: 'Escritores', detail: '3 voces escriben la historia completa de la nómina doble' },
    { title: 'Edición', detail: 'el editor jefe fusiona lo mejor' },
    { title: 'Verificación', detail: 'hilo conductor + crítico-lector con corrección' }
  ],
}

const CRAFT = `PRINCIPIOS DE ESCRITURA (obligatorios):
- CONFÍA EN EL LECTOR: no expliques emociones, muéstralas en conducta. La duda es el motor: si una opción es obviamente correcta, está mal escrita.
- ECONOMÍA: cada línea hace dos trabajos. ESCENAS ≤45 PALABRAS, ni una más (la pantalla es fija y se proyecta en un salón).
- DETALLE CONCRETO colombiano de oficina: la quincena que llega con SMS del banco, el arriendo del martes, el tupper marcado, Nequi, el grupo de WhatsApp. Inventa detalles así.
- NADA DE RESIDUO IA: prohibido el guion largo (—); usa punto, coma, dos puntos o paréntesis. Prohibido "no hay vuelta atrás", "cambió todo", "doblar la apuesta", pares "no es X, es Y", moralejas de taza.
- Español colombiano neutro; pasivo-agresivo corporativo cuando toque ("cuídate mucho ✨", "según tu criterio, tú sabes").

EL NARRADOR (dispositivo central, estilo The Stanley Parable):
- Los "eco" tras cada decisión NO son descripciones: son la VOZ DE UN NARRADOR sarcástico que conoce demasiado a Jimena y la juzga con cariño cruel. Ej: "Claro, Jimena. El banco seguro se equivocó A TU FAVOR por primera vez en la historia." / "Avisaste. Qué ciudadana. El arriendo sigue venciéndose."
- El narrador NUNCA dice qué era lo correcto: pica por ambos lados, para que la duda duela.
- En los timeout el narrador se luce: "¿Nada? ¿En serio? Bueno. El silencio también firma."
- Las moralejas de los finales también son del narrador: afiladas, nuevas, nada de proverbio.`

const PREMISA = `PREMISA FIJA (el usuario la eligió, no la cambies):
"LA NÓMINA DE MÁS". Quincena. A Jimena le llegó el pago DOBLE por un error de nómina. Nadie del banco llamó, nadie de nómina escribió. Ella debe el arriendo desde el martes y la tarjeta está que arde. El detonante: el SMS del banco con el saldo imposible, y la primera decisión con la plata ahí, tibiecita.
PERSONAJES: Jimena (tú). Patricia (la jefa, correcta pero ocupada). Andrés (el de nómina: buena gente, dos hijos, el descuadre SE LO PUEDEN COBRAR A ÉL; esto debe pesar en la cadena). Camila (compañera radar: se entera de todo; aquí no es villana, es la que "vio el movimiento raro" y escribe "👀").
CADENA SUGERIDA (puedes afinarla, no aflojarla):
- Nivel 1 (detonante, timer 25): el SMS del saldo. Avisar ya / esperar "a ver si se dan cuenta" / mover la plata a otra cuenta "por si acaso" (impulso).
- Nivel 2 (timer 20): consecuencia directa de cada salida. Ej: si esperaste, llega el arriendo y el dedo sobre "pagar"; si avisaste, nómina dice "tranquila, en 15 días hábiles lo cuadramos" y el arriendo NO espera; si moviste la plata, Camila: "vi que te llegó doble 👀".
- Nivel 3 (timer 20): el factor Andrés. Se sabe que el descuadre sale del bolsillo/puesto de Andrés si no aparece. Cada rama debe pasar por esta presión moral de forma distinta.
- Nivel 4 (timer 20): el cierre aprieta: correo de "auditoría interna", o Andrés en el ascensor, o Patricia pregunta directo, según la rama.
- Finales (8-10): tonos "bueno" (2-3, por caminos distintos, ganados), "agridulce" (2-3: devolviste pero quedaste marcada, o te salvaste pero la amistad con Andrés no), "oscuro" (2-3: descuento por nómina + fama de "la del doble pago", o Andrés paga el pato y tú lo sabes, o el proceso disciplinario). SIN muertes, SIN cárcel exagerada: todo verosímil de oficina real. Ningún camino de nivel 1 lleva solo a finales oscuros.`

const STRUCT = `ESTRUCTURA TÉCNICA OBLIGATORIA:
- Partida = 4 decisiones: intro (timer 25) → nivel-2 (20) → nivel-3 (20) → nivel-4 (20) → final. Convergencias permitidas si el hilo aguanta.
- Nodo no-final: hora ("6:14 p.m. · viernes de quincena", la hora AVANZA), escena (≤45 palabras), art (de: nomina, mensaje, chat, telefono, escritorio, cafetera, ascensor, pasillo, juntas, impresora, almuerzo, carpeta, bano, parqueadero), timer, choices 2-3 (txt ≤8 palabras con voz, emocion -30..+30, tiempo -15..0, impulso, eco ≤14 palabras EN VOZ DEL NARRADOR, next), timeout (emocion, eco del narrador, next).
- Final: final true, tono ("bueno"|"agridulce"|"oscuro"), titulo ≤6 palabras, texto ≤70 palabras con UN detalle que se quede en la cabeza, moraleja del narrador, art.
- El hilo conductor es sagrado: cada nodo es consecuencia de la decisión anterior; el jugador debe poder contar su partida.
- Salida: story.js COMPLETO (comentario guía + window.STORY = {meta:{titulo:"EN CALIENTE", subtitulo:"un juego sobre decidir con la sangre hirviendo", protagonista:"Jimena", emocionInicial:42, tiempoInicial:100}, start:"intro", nodes:{...}}). JavaScript válido, sin markdown.`

const SCHEMA = {
  type: 'object', required: ['story'],
  properties: { story: { type: 'string', description: 'story.js completo, JavaScript válido, sin markdown' } }
}

phase('Escritores')
const voices = [
  'VOZ: Thriller de bolsillo. La plata como tensión física: saldos, fechas, el dedo sobre el botón. El narrador es seco y letal.',
  'VOZ: Comedia costumbrista colombiana fina. La quincena, el arriendo, Nequi, el grupo de la oficina. El narrador es el amigo cansado que ya te conoce las mañas.',
  'VOZ: Ironía elegante. El narrador tipo Stanley Parable puro: ceremonioso, condescendiente, quotable. La tensión moral (Andrés) en primer plano.'
]
const brief = CRAFT + '\n\n' + PREMISA + '\n\n' + STRUCT
const drafts = await parallel(voices.map((v, i) => () =>
  agent(brief + '\n\n' + v + '\nEscribe el story.js COMPLETO.', { schema: SCHEMA, label: 'escritor-' + (i + 1), phase: 'Escritores' })
))
const valid = drafts.filter(Boolean)

phase('Edición')
const merged = await agent(
  `Eres el editor jefe. Fusiona estos ${valid.length} borradores (misma premisa, voces distintas) en UNA versión magistral: por nodo elige o mezcla la escena más concreta (≤45 palabras SIEMPRE), los botones con más voz, los ecos de narrador más quotables, las moralejas más afiladas. Respeta la estructura técnica al 100% y verifica que todos los next existan.\n${CRAFT}\n\nDevuelve el story.js COMPLETO.\n\n` +
  valid.map((d, i) => '── BORRADOR ' + (i + 1) + ' ──\n' + d.story).join('\n\n'),
  { schema: SCHEMA, label: 'editor-jefe', effort: 'high' }
)

phase('Verificación')
const hilo = await agent(
  `Verificador de HILO CONDUCTOR. Recorre TODAS las partidas posibles (cada camino intro→final) de este story.js: ¿cada nodo es consecuencia lógica de la decisión anterior? ¿las horas avanzan? ¿Andrés y Camila aparecen con coherencia (nada sale de la nada)? ¿los medidores tienen sentido? ¿ningún camino del intro lleva solo a finales oscuros? ¿escenas ≤45 palabras? Corrige donde falle sin romper ids y devuelve el story.js COMPLETO.\n\n` + merged.story,
  { schema: SCHEMA, label: 'hilo-conductor', effort: 'high' }
)
const final = await agent(
  `Crítico final y lector simulado. Lee como estudiante universitario colombiano que entra por un QR: ¿dónde no dudas (reescribe hasta que duela elegir)? ¿dónde suena a IA o el narrador pierde la gracia? ¿qué escena pasa de 45 palabras (recórtala)? Prohibido el guion largo (—). Corrige y devuelve el story.js COMPLETO final, JavaScript válido, todos los next existentes.\n\n` + hilo.story,
  { schema: SCHEMA, label: 'critico-lector', effort: 'high' }
)

return { story: final.story }