# TEMPO — una experiencia sobre el tiempo

## Qué es

Instalación artística digital interactiva (web) que narra tres temas de un semestre universitario — gestión del tiempo, toma de decisiones e inteligencia emocional — mediante cinco escenas de scroll cinematográfico, partículas y sonido generativo. No es una landing ni una presentación: es una obra narrativa que se recorre.

## Registro

brand — el diseño ES el producto. La impresión emocional del visitante es el entregable.

## Platform

web

## Audiencia

Compañeros y docentes de la clase durante una presentación en vivo; luego cualquier persona con el enlace. Puede presentarla alguien distinto al autor: la obra debe guiarse sola (timeline de escenas + teclado).

## Restricciones duras

- 100% offline: cero CDNs, cero fuentes remotas, cero requests externas. Debe abrir con doble clic en `index.html` (`file://`) — por eso scripts clásicos, no módulos ES.
- Vanilla HTML/CSS/JS + GSAP/ScrollTrigger/Draggable/Lenis vendorizados en `js/vendor/`.
- Deploy final en GitHub Pages.

## Voz de marca

Silenciosa, inevitable, física. Como una sala oscura de museo donde solo hay una obra iluminada. Frases mínimas en serif lapidaria (EB Garamond); micro-UI en Geist. Fondo negro puro `oklch(0.08 0 0)`; el color lo llevan las partículas: arena dorada apagada (tiempo), dos tintes de decisión (A: azul pizarra frío `oklch(0.65 0.055 245)`, B: verde musgo `oklch(0.62 0.07 160)` — semilla de paleta del proyecto), y cinco tonos orgánicos desaturados para las emociones.

## Estrategia de color

Committed: negro casi absoluto como superficie dominante; la escena 3 invierte a blanco puro como shock narrativo. El acento del camino elegido tiñe sutilmente el resto de la obra.
