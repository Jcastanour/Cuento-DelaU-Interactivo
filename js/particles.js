/* ════════════════════════════════════════════════════════
   TEMPO · núcleo compartido
   Namespace global, canvas 2.5D, ruido, utilidades.
   Scripts clásicos (sin módulos) para funcionar en file://
   ════════════════════════════════════════════════════════ */

window.TEMPO = window.TEMPO || {};

(function (T) {
  "use strict";

  /* ── preferencias y entorno ── */
  T.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  T.isTouch = window.matchMedia("(hover: none)").matches;

  /* factor de densidad de partículas: pantalla pequeña o poca potencia → menos */
  T.density = 1;
  (function () {
    var area = window.innerWidth * window.innerHeight;
    if (area < 500000) T.density = 0.55;         // móvil
    else if (area < 900000) T.density = 0.8;     // portátil pequeño
    if (T.reducedMotion) T.density *= 0.5;
  })();

  /* ── utilidades ── */
  T.util = {
    lerp: function (a, b, t) { return a + (b - a) * t; },
    clamp: function (v, a, b) { return v < a ? a : v > b ? b : v; },
    rand: function (a, b) { return a + Math.random() * (b - a); },
    /* mapea t de [a,b] a [0,1] con clamp */
    norm: function (t, a, b) { return T.util.clamp((t - a) / (b - a), 0, 1); },

    /* divide una frase en spans de palabras (respeta <br> y <em>) */
    splitWords: function (el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var textNodes = [], n;
      while ((n = walker.nextNode())) textNodes.push(n);
      textNodes.forEach(function (node) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (piece) {
          if (!piece) return;
          if (/^\s+$/.test(piece)) { frag.appendChild(document.createTextNode(" ")); return; }
          var span = document.createElement("span");
          span.className = "w";
          span.textContent = piece;
          frag.appendChild(span);
        });
        node.parentNode.replaceChild(frag, node);
      });
      return el.querySelectorAll(".w");
    }
  };

  /* ── ruido pseudo-simplex (value noise 2D suavizado, suficiente y liviano) ── */
  T.Noise = (function () {
    var P = new Uint8Array(512);
    var perm = [];
    for (var i = 0; i < 256; i++) perm[i] = i;
    /* barajado determinista para que la obra sea consistente entre visitas */
    var seed = 20260717;
    function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    for (var j = 255; j > 0; j--) {
      var k = Math.floor(rnd() * (j + 1));
      var tmp = perm[j]; perm[j] = perm[k]; perm[k] = tmp;
    }
    for (var m = 0; m < 512; m++) P[m] = perm[m & 255];

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function grad(h, x, y) {
      switch (h & 3) {
        case 0: return x + y;
        case 1: return -x + y;
        case 2: return x - y;
        default: return -x - y;
      }
    }
    return {
      /* ruido 2D en [-1, 1] */
      n2: function (x, y) {
        var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        var u = fade(x), v = fade(y);
        var A = P[X] + Y, B = P[X + 1] + Y;
        return T.util.lerp(
          T.util.lerp(grad(P[A], x, y), grad(P[B], x - 1, y), u),
          T.util.lerp(grad(P[A + 1], x, y - 1), grad(P[B + 1], x - 1, y - 1), u),
          v
        ) * 1.6;
      }
    };
  })();

  /* ── gestor de canvas con devicePixelRatio ── */
  T.Stage2D = function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = 0; this.h = 0;
    this._onResize = [];
    this.resize();
    var self = this;
    window.addEventListener("resize", function () { self.resize(); });
  };

  T.Stage2D.prototype = {
    resize: function () {
      var r = this.canvas.getBoundingClientRect();
      var w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
      if (w === this.w && h === this.h) return;
      this.w = w; this.h = h;
      this.canvas.width = Math.round(w * this.dpr);
      this.canvas.height = Math.round(h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      for (var i = 0; i < this._onResize.length; i++) this._onResize[i](w, h);
    },
    onResize: function (fn) { this._onResize.push(fn); },
    clear: function () { this.ctx.clearRect(0, 0, this.w, this.h); }
  };

  /* ── ticker central: un solo rAF vía gsap, con escenas activables ──
     Cada escena registra { update(dt, t), active: bool }.
     Las escenas fuera de viewport se pausan desde sus ScrollTriggers. */
  T.ticker = (function () {
    var systems = [];
    var fpsLow = 0;
    gsap.ticker.add(function (time, deltaMS) {
      var dt = Math.min(deltaMS / 1000, 1 / 24); // clamp para pestañas dormidas
      /* degradación elegante: si el equipo no alcanza 45fps sostenidos, bajar densidad */
      if (deltaMS > 24) { fpsLow++; } else if (fpsLow > 0) { fpsLow--; }
      if (fpsLow > 120 && T.density > 0.4) { T.density *= 0.75; fpsLow = 0; T._densityDropped = true; }
      for (var i = 0; i < systems.length; i++) {
        if (systems[i].active) systems[i].update(dt, time);
      }
    });
    return {
      add: function (system) { systems.push(system); return system; }
    };
  })();

  /* ── muestreadores de formas (targets para partículas) ── */
  T.samplers = {
    /* puntos que dibujan un reloj análogo: aro, marcas y manecillas.
       Devuelve [{x, y, part}] con part: "ring" | "tick" | "hour" | "minute" */
    clock: function (cx, cy, R, count) {
      var pts = [];
      var i, a, r;
      var nRing = Math.floor(count * 0.52);
      var nTick = Math.floor(count * 0.16);
      var nHour = Math.floor(count * 0.13);
      var nMin = count - nRing - nTick - nHour;

      for (i = 0; i < nRing; i++) {
        a = (i / nRing) * Math.PI * 2;
        r = R + T.util.rand(-R * 0.012, R * 0.012);
        pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, part: "ring" });
      }
      for (i = 0; i < nTick; i++) {
        var tick = Math.floor(T.util.rand(0, 12));
        a = (tick / 12) * Math.PI * 2 - Math.PI / 2;
        var len = (tick % 3 === 0) ? 0.13 : 0.07;
        r = R * T.util.rand(0.86 - len, 0.9);
        pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, part: "tick" });
      }
      /* manecillas guardan coordenadas polares relativas para poder girar */
      for (i = 0; i < nHour; i++) {
        r = R * T.util.rand(0.04, 0.5);
        pts.push({ x: cx, y: cy, part: "hour", pr: r, po: T.util.rand(-0.022, 0.022) });
      }
      for (i = 0; i < nMin; i++) {
        r = R * T.util.rand(0.04, 0.74);
        pts.push({ x: cx, y: cy, part: "minute", pr: r, po: T.util.rand(-0.016, 0.016) });
      }
      return pts;
    }
  };

  /* ── colores de la obra (rgb precalculado para canvas) ── */
  T.palette = {
    sand: [205, 180, 127],       /* arena dorada apagada */
    white: [244, 244, 242],
    pathA: [122, 152, 199],      /* azul pizarra frío */
    pathB: [96, 158, 123],       /* verde musgo (semilla) */
    emotions: {
      alegria:     { rgb: [226, 196, 120], name: "alegría" },
      miedo:       { rgb: [104, 100, 160], name: "miedo" },
      frustracion: { rgb: [198, 110, 96],  name: "frustración" },
      calma:       { rgb: [136, 186, 196], name: "calma" },
      ansiedad:    { rgb: [186, 122, 170], name: "ansiedad" }
    }
  };

  T.rgba = function (rgb, a) {
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + a + ")";
  };

  /* registro de escenas: cada archivo de escena se anota aquí y main.js las inicia */
  T.scenes = [];
  T.registerScene = function (fn) { T.scenes.push(fn); };

  /* estado global de la obra */
  T.state = {
    started: false,
    startTime: 0,
    path: null,        /* "a" | "b" tras la decisión */
    soundOn: false
  };

})(window.TEMPO);
