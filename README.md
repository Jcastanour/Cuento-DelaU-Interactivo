# TEMPO — una experiencia sobre el tiempo

**Equipo:** Sofía Flórez Ramírez · Carlos Andrés Morales Atehortúa · Santiago Jiménez Morales · Juan Pablo Castaño Uribe · Diana Marisol Peña Ladino
**Curso:** De la Universidad a la Organización (UAO) · 2026-1s
**En línea:** https://jcastanour.github.io/Cuento-DelaU-Interactivo/

Instalación artística digital interactiva. Cinco escenas de scroll cinematográfico que narran tres temas del semestre: **gestión del tiempo**, **toma de decisiones** e **inteligencia emocional**.

Construida con HTML, CSS y JavaScript vanilla + GSAP (ScrollTrigger, Draggable) + Lenis. Todo el sonido es generativo (Web Audio API) y todas las librerías y fuentes están incluidas en el proyecto: **funciona 100% sin internet**.

## Cómo abrirla

**Con internet (enlace público):** la URL de GitHub Pages del repositorio.

**Sin internet (día de la presentación):**
1. Doble clic en `index.html` — funciona directamente en el navegador, o
2. Desde esta carpeta: `python3 -m http.server 8000` y abrir `http://localhost:8000`.

Recomendado: Chrome o Edge, pantalla completa (`F11` / `⌃⌘F`).

## Guion de presentación (línea de tiempo)

La obra se presenta recorriéndola. Los puntos del margen derecho marcan la escena actual.

| Escena | Qué pasa | Qué decir |
|---|---|---|
| **Umbral** | Elegir "entrar con sonido" | El silencio inicial es parte de la obra |
| **I · El tiempo** | Un reloj de partículas marca la hora real; al hacer scroll se deshace como arena y forma una duna | Todos recibimos el mismo tiempo; se va y no vuelve |
| **II · Un día** | Arrastrar tareas al anillo del día; el ambiente cambia según lo que priorices (una sola obsesión enrarece el aire, la variedad lo calma) | Gestionar el tiempo no es crear más: es priorizar |
| **III · La decisión** | Todo se vuelve blanco; dos formas sin nombre. Al elegir, colores, movimiento y sonido cambian; ambos caminos llegan al mismo lugar | Toda decisión tiene consecuencias; no hay opción "correcta" |
| **IV · Lo que sentimos** | Cinco emociones vivas: si las apartas vuelven, si las golpeas se multiplican, si solo las observas se equilibran | No controlamos lo que sentimos; aprendemos a convivir con ello |
| **V · Fin** | Una luz reconstruye el reloj, ahora teñido por el camino que elegiste; cierre con los segundos que viviste dentro | El tiempo avanza, tus decisiones escriben tu historia, tus emociones le dan significado |

## Controles (modo presentación)

- **Rueda / trackpad** — recorrer la obra
- **Botón ▸** (abajo a la derecha) — siguiente escena; si la escena espera interacción, la completa. Late cuando la obra está esperando que juegues. En el final se vuelve ↺.
- **→ / espacio** — igual que ▸ · **←** — escena anterior · **1–5** — salto directo · **Inicio** — comienzo
- **M** — activar/silenciar sonido (también el icono inferior izquierdo)
- **Guía de esquina** (abajo a la izquierda) — siempre dice qué hacer en la escena actual; la flecha del borde inferior indica cuándo hay que bajar.
- **Botón "auto"** (sobre el ▸) o tecla **A** — la obra se recorre sola con su ritmo cinematográfico; mover el mouse no la interrumpe, solo la rueda, el teclado o volver a pulsar el botón. También se enciende sola tras 30 s sin gestos. Ideal para dejarla corriendo tipo instalación (al llegar al final, recomienza).
- Las escenas II, III y IV **esperan interacción** (armar tu día, elegir, observar). Nadie se queda atascado presentando.

## QR para el salón

- `qr.html` — página para proyectar: QR gigante que lleva a la obra en línea, para que el público entre desde su celular mientras presentas.
- El mismo QR aparece discreto en la pantalla de entrada y en los créditos finales.

## Estructura

```
index.html          escenas y UI
css/                reset, sistema base (tokens), escenas
js/vendor/          GSAP, ScrollTrigger, Draggable, Lenis (locales)
js/particles.js     núcleo: canvas 2.5D, ruido, ticker, muestreador del reloj
js/audio.js         sonido generativo (drones, acordes por escena, granos)
js/scenes/          una escena por archivo
fonts/              EB Garamond + Schibsted Grotesk (woff2 locales)
```

Detalles técnicos: scripts clásicos (sin módulos ES) para que `file://` funcione con doble clic; un solo `requestAnimationFrame` central; densidad de partículas adaptativa según pantalla y FPS; `prefers-reduced-motion` respetado.
