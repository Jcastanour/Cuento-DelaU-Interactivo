/* ════════════════════════════════════════════════════════
   EN CALIENTE · ilustraciones
   Line-art SVG inline: cero imágenes externas, offline total.
   Trazos con currentColor; los acentos llevan class="hot".
   Cada nodo de story.js elige la suya con su campo `art`.
   ════════════════════════════════════════════════════════ */

window.GAME_ART = (function () {
  "use strict";

  function svg(inner) {
    return '<svg viewBox="0 0 140 110" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }

  return {
    /* sala de juntas: la mesa, el equipo, y tú que ardes */
    juntas: svg(
      '<ellipse cx="70" cy="72" rx="46" ry="14"/>' +
      '<circle cx="34" cy="46" r="7"/><circle cx="58" cy="38" r="7"/><circle cx="84" cy="38" r="7"/>' +
      '<circle cx="108" cy="46" r="7" class="hot"/>' +
      '<path class="hot" d="M104 33 l4 -7 M110 33 l1 -8 M116 36 l5 -6"/>' +
      '<path d="M31 44 l5 2 M55 36 l5 2 M81 36 l5 2"/>'
    ),

    /* el mensaje que hunde, a un clic */
    mensaje: svg(
      '<rect x="24" y="22" width="72" height="48" rx="10"/>' +
      '<path d="M34 36 h44 M34 46 h52 M34 56 h30"/>' +
      '<path class="hot" d="M104 58 l26 10 -26 10 6 -10 z"/>' +
      '<circle class="hot" cx="100" cy="26" r="10"/>' +
      '<path class="hot" d="M100 20 v7 M100 31.5 v0.5"/>'
    ),

    /* el chat estalla */
    chat: svg(
      '<rect x="52" y="14" width="36" height="66" rx="8"/>' +
      '<path d="M62 86 h16"/>' +
      '<path d="M30 30 h-14 a6 6 0 0 0 -6 6 v8 a6 6 0 0 0 6 6 h4 l-2 8 10 -8 h2"/>' +
      '<path class="hot" d="M110 24 h16 a6 6 0 0 1 6 6 v8 a6 6 0 0 1 -6 6 h-4 l2 8 -10 -8 h-4"/>' +
      '<path d="M20 62 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0"/>' +
      '<path class="hot" d="M120 60 v6 M120 71 v0.5"/>' +
      '<path d="M60 34 h20 M60 44 h14 M60 54 h18"/>'
    ),

    /* el pasillo del encuentro */
    pasillo: svg(
      '<path d="M14 96 L58 40 h24 L126 96"/>' +
      '<path d="M30 96 L62 52 M110 96 L78 52"/>' +
      '<circle cx="52" cy="66" r="6"/><path d="M52 72 v12 M46 96 l6 -12 6 12"/>' +
      '<circle class="hot" cx="88" cy="66" r="6"/><path class="hot" d="M88 72 v12 M82 96 l6 -12 6 12"/>'
    ),

    /* la carpeta sin respaldo */
    carpeta: svg(
      '<path d="M26 34 h26 l8 8 h44 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 h-72 a6 6 0 0 1 -6 -6 v-42 a6 6 0 0 1 6 -6z"/>' +
      '<path d="M44 66 h36 M44 74 h24"/>' +
      '<path class="hot" d="M100 84 l10 12 3 -6 7 1 z"/>'
    ),

    /* la usb ajena */
    usb: svg(
      '<rect x="44" y="40" width="52" height="26" rx="6"/>' +
      '<path d="M96 46 h14 v14 h-14"/>' +
      '<path d="M101 50 h4 M101 58 h4"/>' +
      '<circle class="hot" cx="58" cy="53" r="6"/>' +
      '<path class="hot" d="M58 50 v4 M58 56 v0.5"/>' +
      '<path d="M30 78 c20 8 60 8 80 0" stroke-dasharray="3 6"/>'
    ),

    /* el corrillo de la cafetera */
    cafetera: svg(
      '<rect x="24" y="30" width="30" height="44" rx="6"/>' +
      '<path d="M32 74 v8 h14 v-8 M30 42 h18"/>' +
      '<path d="M39 20 c-3 4 3 6 0 10 M47 20 c-3 4 3 6 0 10" opacity="0.7"/>' +
      '<circle cx="88" cy="46" r="7"/><circle cx="112" cy="46" r="7" class="hot"/>' +
      '<path d="M88 53 c-6 4 -8 12 -8 20 M112 53 c6 4 8 12 8 20" />' +
      '<path d="M95 44 c3 -2 7 -2 10 0" stroke-dasharray="2 4"/>'
    ),

    /* las escaleras del punto sin retorno */
    escaleras: svg(
      '<path d="M18 92 h20 v-14 h20 v-14 h20 v-14 h20 v-14 h20"/>' +
      '<circle class="hot" cx="104" cy="22" r="6"/>' +
      '<path class="hot" d="M104 28 l-4 10 M104 28 l6 9 M100 38 l-6 8" />' +
      '<path d="M70 20 c10 2 16 8 18 14" stroke-dasharray="2 5" opacity="0.7"/>'
    ),

    /* el parqueadero de noche */
    parqueadero: svg(
      '<path d="M30 82 h80 M36 82 v-16 a8 8 0 0 1 8 -8 h36 a10 10 0 0 1 9 6 l5 10"/>' +
      '<circle cx="50" cy="82" r="6"/><circle cx="92" cy="82" r="6"/>' +
      '<path d="M118 82 v-52 h-6"/>' +
      '<path d="M112 30 L92 58 h40 z" opacity="0.45"/>' +
      '<circle class="hot" cx="26" cy="60" r="5"/><path class="hot" d="M26 65 v10 M21 84 l5 -9 5 9"/>'
    ),

    /* la llamada */
    telefono: svg(
      '<path d="M40 26 a10 10 0 0 1 14 -2 l8 7 a8 8 0 0 1 1 11 l-5 6 c4 10 12 18 22 22 l6 -5 a8 8 0 0 1 11 1 l7 8 a10 10 0 0 1 -2 14 c-8 6 -22 6 -34 -2 -14 -9 -26 -21 -32 -36 -4 -11 -3 -19 4 -24z"/>' +
      '<path class="hot" d="M96 26 c6 2 10 6 12 12 M100 16 c9 3 16 10 19 19"/>'
    ),

    /* el baño: el espejo y la duda */
    bano: svg(
      '<rect x="46" y="18" width="48" height="60" rx="8"/>' +
      '<circle cx="70" cy="42" r="9"/>' +
      '<path d="M70 51 c-8 3 -12 9 -13 16 M70 51 c8 3 12 9 13 16"/>' +
      '<path class="hot" d="M64 40 c1 6 -2 10 -4 12" opacity="0.8"/>' +
      '<path d="M30 88 h80"/>'
    ),

    /* tu escritorio: Jimena frente a la pantalla */
    escritorio: svg(
      '<path d="M18 78 h104"/>' +
      '<path d="M56 78 v-26 a4 4 0 0 1 4 -4 h30 a4 4 0 0 1 4 4 v26"/>' +
      '<path d="M52 78 h46"/>' +
      '<circle cx="36" cy="42" r="8"/>' +
      '<path d="M42 38 c4 -2 6 -6 3 -9" />' +
      '<path d="M36 50 v16 M36 56 l14 6 M28 78 l8 -12"/>' +
      '<rect class="hot" x="98" y="34" width="18" height="14" rx="2"/>' +
      '<path class="hot" d="M102 41 h10"/>'
    ),

    /* la nómina y la plata */
    nomina: svg(
      '<rect x="34" y="14" width="56" height="76" rx="6"/>' +
      '<path d="M44 30 h36 M44 42 h36 M44 54 h22"/>' +
      '<path class="hot" d="M44 70 h36" stroke-width="3"/>' +
      '<circle class="hot" cx="104" cy="70" r="12"/>' +
      '<path class="hot" d="M104 63 v14 M100 66 h6 a3 3 0 0 1 0 6 h-4 a3 3 0 0 0 0 6 h6"/>'
    ),

    /* la impresora compartida */
    impresora: svg(
      '<rect x="30" y="40" width="80" height="30" rx="6"/>' +
      '<path d="M46 40 v-16 h48 v16"/>' +
      '<circle cx="100" cy="50" r="2.5"/>' +
      '<path class="hot" d="M48 70 h44 v22 h-44 z"/>' +
      '<path class="hot" d="M56 80 h28 M56 86 h18"/>'
    ),

    /* el almuerzo: la nevera de todos */
    almuerzo: svg(
      '<rect x="30" y="12" width="44" height="84" rx="8"/>' +
      '<path d="M30 48 h44 M62 32 v8 M62 60 v10"/>' +
      '<rect class="hot" x="88" y="58" width="28" height="18" rx="4"/>' +
      '<path class="hot" d="M88 66 h28"/>' +
      '<path d="M92 50 c0 -4 8 -4 8 -8 M102 50 c0 -4 8 -4 8 -8" opacity="0.6"/>'
    ),

    /* el ascensor: encierro con testigos */
    ascensor: svg(
      '<rect x="34" y="12" width="72" height="84" rx="6"/>' +
      '<path d="M70 12 v84"/>' +
      '<path d="M52 22 l6 6 M58 22 l-6 6 M88 22 l-6 6 M82 22 l6 6" opacity="0"/>' +
      '<circle cx="54" cy="48" r="6"/><path d="M54 54 v14 M48 82 l6 -14 6 14"/>' +
      '<circle class="hot" cx="88" cy="48" r="6"/><path class="hot" d="M88 54 v14 M82 82 l6 -14 6 14"/>' +
      '<path d="M62 18 h16" stroke-dasharray="2 3" opacity="0.6"/>'
    ),

    /* la caja del supermercado: el vuelto de más */
    caja: svg(
      '<path d="M22 92 h96 M30 92 v-20 h80 v20"/>' +
      '<path d="M36 72 v-16 a5 5 0 0 1 5 -5 h30 a5 5 0 0 1 5 5 v16"/>' +
      '<path d="M42 58 h26 M42 64 h18"/>' +
      '<rect class="hot" x="88" y="46" width="26" height="14" rx="2" transform="rotate(-8 101 53)"/>' +
      '<path class="hot" d="M94 52 h14" transform="rotate(-8 101 53)"/>' +
      '<circle cx="36" cy="34" r="7"/><path d="M42 30 c4 -2 6 -6 3 -9"/>' +
      '<path d="M36 41 v10"/>'
    ),

    /* la cuna de Emma */
    cuna: svg(
      '<path d="M28 40 v52 M112 40 v52 M28 66 h84"/>' +
      '<path d="M36 66 v-18 a34 20 0 0 1 68 0 v18"/>' +
      '<path d="M44 66 v-14 M58 66 v-16 M72 66 v-16 M86 66 v-16 M100 66 v-14" opacity="0.5"/>' +
      '<circle cx="70" cy="52" r="7"/>' +
      '<path d="M62 58 c4 4 12 4 16 0"/>' +
      '<path class="hot" d="M104 24 c-2 3 2 5 0 8 M112 20 c-2 3 2 5 0 8" opacity="0.9"/>'
    ),

    /* Coco */
    perro: svg(
      '<path d="M40 78 c-6 -18 4 -34 22 -36 l20 -2 c10 -1 16 6 16 14 0 4 -2 7 -6 9 l-8 3 -2 24"/>' +
      '<path d="M48 90 l2 -14 M84 90 l0 -12 M46 76 h38"/>' +
      '<path d="M84 42 c0 -8 -6 -12 -10 -12 2 4 2 8 2 12"/>' +
      '<circle cx="88" cy="52" r="1.6" fill="currentColor"/>' +
      '<path class="hot" d="M34 66 c-8 -2 -10 -10 -4 -14" />' +
      '<path d="M96 60 c4 1 7 3 8 6" opacity="0.7"/>'
    ),

    /* la tienda de don Óscar */
    tienda: svg(
      '<path d="M24 44 h92 M28 44 v46 h84 v-46"/>' +
      '<path d="M24 44 l8 -18 h76 l8 18"/>' +
      '<path d="M36 44 v-9 M52 44 v-14 M68 44 v-14 M84 44 v-14 M100 44 v-9" opacity="0.5"/>' +
      '<rect x="40" y="58" width="24" height="32" rx="2"/>' +
      '<path class="hot" d="M74 66 h28 M74 76 h28" stroke-width="3"/>' +
      '<path d="M78 90 v-8 M98 90 v-8"/>'
    ),

    /* la fiebre: el termómetro y la madrugada */
    fiebre: svg(
      '<path d="M62 20 v52 a12 12 0 1 0 16 0 v-52 a8 8 0 0 0 -16 0z"/>' +
      '<circle class="hot" cx="70" cy="80" r="7"/>' +
      '<path class="hot" d="M70 72 v-34" stroke-width="3.5"/>' +
      '<path d="M84 30 h8 M84 42 h12 M84 54 h8"/>' +
      '<path d="M30 30 a14 14 0 1 0 10 24 a11 11 0 0 1 -10 -24z" opacity="0.6"/>'
    ),

    /* la parada del bus */
    parada: svg(
      '<path d="M24 92 h92"/>' +
      '<path d="M32 92 v-58 h64 M32 40 h70 l6 8"/>' +
      '<path d="M40 34 v-8 h20"/>' +
      '<circle cx="56" cy="58" r="6"/><path d="M56 64 v12 M50 92 l6 -16 6 16"/>' +
      '<rect class="hot" x="72" y="62" width="22" height="16" rx="2"/>' +
      '<path class="hot" d="M76 70 h14"/>' +
      '<path d="M104 60 c4 6 4 12 0 18" stroke-dasharray="2 4" opacity="0.7"/>'
    ),

    /* finales */
    fin_bueno: svg(
      '<path d="M70 90 c0 -26 0 -44 0 -58"/>' +
      '<path d="M70 46 c-10 -2 -18 -10 -20 -20 10 2 18 10 20 20z"/>' +
      '<path d="M70 62 c10 -2 18 -10 20 -20 -10 2 -18 10 -20 20z"/>' +
      '<path d="M70 78 c-10 -2 -18 -10 -20 -20 10 2 18 10 20 20z"/>' +
      '<path d="M40 96 c20 6 40 6 60 0"/>'
    ),
    fin_oscuro: svg(
      '<path d="M44 46 a16 16 0 0 1 30 -8 a12 12 0 0 1 22 6 a10 10 0 0 1 -4 19 h-46 a12 12 0 0 1 -2 -17z"/>' +
      '<path class="hot" d="M52 74 l-5 12 M70 74 l-5 12 M88 74 l-5 12" opacity="0.8"/>'
    ),
    fin_negro: svg(
      '<path d="M46 92 v-40 a24 24 0 0 1 48 0 v40"/>' +
      '<path d="M34 92 h72"/>' +
      '<path d="M62 56 h16 M70 48 v16"/>' +
      '<path class="hot" d="M96 84 c4 -6 10 -6 12 -2 -2 4 -8 5 -12 2z M99 84 c0 4 0 6 -2 8"/>'
    )
  };
})();
