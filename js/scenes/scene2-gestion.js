/* ════════════════════════════════════════════════════════
   TEMPO · Escena II — Gestión del tiempo
   Tareas que flotan. Un día que espera.
   No hay respuesta correcta: solo prioridades.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  T.registerScene(function (ctx) {
    var U = T.util;
    var stage = new T.Stage2D(document.getElementById("canvas-gestion"));
    var section = document.getElementById("scene-2");
    var ringEl = document.getElementById("day-ring");
    var ringLabel = document.getElementById("day-ring-label");
    var hint = document.getElementById("gestion-hint");
    var phrase = document.getElementById("phrase-gestion");
    var taskEls = Array.prototype.slice.call(document.querySelectorAll(".task"));

    var COLORS = {
      redes:   [186, 122, 170],
      estudio: [205, 180, 127],
      sueno:   [104, 100, 160],
      trabajo: [122, 152, 199],
      familia: [226, 196, 120],
      cuerpo:  [96, 158, 123]
    };

    /* 24 marcas de hora en el anillo */
    (function () {
      var g = document.getElementById("day-ring-ticks");
      for (var i = 0; i < 24; i++) {
        var a = (i / 24) * Math.PI * 2 - Math.PI / 2;
        var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        var r1 = i % 6 === 0 ? 42.5 : 44;
        l.setAttribute("x1", 50 + Math.cos(a) * r1);
        l.setAttribute("y1", 50 + Math.sin(a) * r1);
        l.setAttribute("x2", 50 + Math.cos(a) * 46);
        l.setAttribute("y2", 50 + Math.sin(a) * 46);
        g.appendChild(l);
      }
    })();

    /* ── estado de las tareas ── */
    var tasks = taskEls.map(function (el, i) {
      return {
        el: el,
        key: el.getAttribute("data-task"),
        x: 0, y: 0,          /* posición actual (px, relativa al stage) */
        fx: 0, fy: 0,        /* ancla de flotación */
        dragging: false,
        placed: false,
        seed: i * 7.3
      };
    });

    function ringGeom() {
      var r = ringEl.getBoundingClientRect();
      var s = stage.canvas.getBoundingClientRect();
      return {
        cx: r.left - s.left + r.width / 2,
        cy: r.top - s.top + r.height / 2,
        R: (r.width / 2) * 0.92
      };
    }

    /* anclas de flotación repartidas alrededor del anillo */
    function scatter() {
      var g = ringGeom();
      var Rout = Math.min(stage.w, stage.h) * (T.isTouch ? 0.46 : 0.42);
      tasks.forEach(function (tk, i) {
        if (tk.placed) return;
        var a = (i / tasks.length) * Math.PI * 2 - Math.PI / 2 + 0.35;
        tk.fx = g.cx + Math.cos(a) * Rout * U.rand(0.95, 1.15);
        tk.fy = g.cy + Math.sin(a) * Rout * U.rand(0.82, 1.02);
        tk.fy = U.clamp(tk.fy, stage.h * 0.12, stage.h * 0.8);
        tk.fx = U.clamp(tk.fx, stage.w * 0.1, stage.w * 0.9);
        if (tk.x === 0 && tk.y === 0) { tk.x = tk.fx; tk.y = tk.fy; }
      });
    }
    scatter();
    stage.onResize(scatter);

    /* ── fondo ambiental: polvo que reacciona a las prioridades ── */
    var MOTES = Math.round(320 * T.density);
    var motes = [];
    for (var i = 0; i < MOTES; i++) {
      motes.push({ x: Math.random(), y: Math.random(), z: U.rand(0.3, 1), s: U.rand(0, 100) });
    }
    var ambient = { tint: [205, 180, 127], agit: 0.25, level: 0 };

    function readPriorities() {
      var placed = tasks.filter(function (t) { return t.placed; });
      if (!placed.length) return;
      /* tinte = mezcla de lo que elegiste; agitación = desequilibrio */
      var mix = [0, 0, 0];
      placed.forEach(function (t) {
        var c = COLORS[t.key];
        mix[0] += c[0]; mix[1] += c[1]; mix[2] += c[2];
      });
      ambient.tint = mix.map(function (v) { return Math.round(v / placed.length); });
      var variety = {};
      placed.forEach(function (t) { variety[t.key] = true; });
      var kinds = Object.keys(variety).length;
      /* una sola obsesión enrarece el aire; la variedad lo calma */
      ambient.agit = kinds <= 1 ? 0.9 : kinds === 2 ? 0.55 : 0.2;
      ambient.level = Math.min(1, placed.length / 3);
    }

    var system = T.ticker.add({
      active: false,
      update: function (dt, t) {
        stage.clear();
        var c = stage.ctx;

        /* polvo ambiental */
        var speed = 0.008 + ambient.agit * 0.05;
        var alphaBase = 0.05 + ambient.level * 0.1;
        for (var i = 0; i < motes.length; i++) {
          var m = motes[i];
          m.x += T.Noise.n2(m.x * 3 + m.s, t * speed * 6) * speed * dt * 6;
          m.y += (T.Noise.n2(m.y * 3 - m.s, t * speed * 5) * speed * 3 - 0.004 * ambient.agit) * dt * 6;
          if (m.x < 0) m.x += 1; if (m.x > 1) m.x -= 1;
          if (m.y < 0) m.y += 1; if (m.y > 1) m.y -= 1;
          var sz = 0.6 + m.z * 1.3;
          c.fillStyle = T.rgba(ambient.tint, alphaBase * m.z);
          c.fillRect(m.x * stage.w, m.y * stage.h, sz, sz);
        }

        /* flotación de tareas */
        tasks.forEach(function (tk) {
          if (tk.dragging) return;
          if (!tk.placed) {
            var nx = T.Noise.n2(tk.seed, t * 0.12) * 16;
            var ny = T.Noise.n2(tk.seed + 50, t * 0.1) * 14;
            tk.x += (tk.fx + nx - tk.x) * Math.min(1, dt * 1.4);
            tk.y += (tk.fy + ny - tk.y) * Math.min(1, dt * 1.4);
          } else {
            /* dentro del día: respiración mínima */
            tk.x += T.Noise.n2(tk.seed, t * 0.08) * 0.12;
            tk.y += T.Noise.n2(tk.seed + 9, t * 0.07) * 0.12;
          }
          /* repulsión suave entre tareas libres */
          tasks.forEach(function (o) {
            if (o === tk || o.dragging) return;
            var dx = tk.x - o.x, dy = tk.y - o.y;
            var d2 = dx * dx + dy * dy;
            if (d2 > 1 && d2 < 16900) {
              var d = Math.sqrt(d2), push = (130 - d) / 130 * 26 * dt;
              tk.x += (dx / d) * push;
              tk.y += (dy / d) * push;
            }
          });
          gsap.set(tk.el, { x: tk.x, y: tk.y, xPercent: -50, yPercent: -50 });
        });
      }
    });

    /* ── drag ── */
    var interactions = 0;
    var gateDone = false;

    tasks.forEach(function (tk) {
      Draggable.create(tk.el, {
        type: "x,y",
        onPress: function () {
          tk.dragging = true;
          tk.el.classList.add("is-dragging");
        },
        onDrag: function () {
          tk.x = this.x; tk.y = this.y;
        },
        onRelease: function () {
          tk.dragging = false;
          tk.el.classList.remove("is-dragging");
          tk.x = this.x; tk.y = this.y;
          var g = ringGeom();
          var d = Math.hypot(tk.x - g.cx, tk.y - g.cy);
          var wasPlaced = tk.placed;
          tk.placed = d < g.R;
          tk.el.classList.toggle("in-day", tk.placed);
          if (tk.placed && !wasPlaced) T.audio.touch(392 + Math.random() * 220);
          if (!tk.placed) { tk.fx = tk.x; tk.fy = tk.y; }
          interactions++;
          readPriorities();
          gsap.to(hint, { opacity: 0, duration: 0.8 });
          checkGate();
        }
      });
    });

    function checkGate() {
      if (gateDone) return;
      var placed = tasks.filter(function (t) { return t.placed; }).length;
      if (placed >= 2 && interactions >= 2) {
        gateDone = true;
        gsap.delayedCall(1.6, closeScene);
      }
    }

    /* cierre: lo elegido se disuelve; queda la idea */
    var words = null;
    function closeScene() {
      T.audio.touch(523);
      var tl = gsap.timeline();
      tl.to(taskEls, {
        opacity: 0, scale: 0.85, filter: "blur(10px)",
        duration: 1.6, stagger: 0.12, ease: "power2.in",
        onStart: function () { taskEls.forEach(function (el) { el.style.pointerEvents = "none"; }); }
      }, 0);
      tl.to([ringEl, ringLabel], { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 0.4);
      words = U.splitWords(phrase);
      gsap.set(phrase, { opacity: 1 });
      gsap.set(words, { opacity: 0, y: 16, filter: "blur(6px)" });
      tl.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.5, stagger: 0.14, ease: "power3.out"
      }, 1.4);
      tl.add(function () { ctx.unlock(); }, 2.2);
    }

    /* saltos de presentación: pasar la puerta sin interactuar */
    ctx.onSkip(function () {
      if (gateDone) return;
      gateDone = true;
      closeScene();
    });

    /* ── entrada y scroll ── */
    var entered = false;
    function enterScene() {
      if (entered) return;
      entered = true;
      var g = ringGeom();
      gsap.to(ringEl, { opacity: 1, duration: 2, ease: "power2.out" });
      gsap.to(ringLabel, { opacity: 1, duration: 2, delay: 0.5 });
      gsap.fromTo(taskEls,
        { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, stagger: 0.16, ease: "power3.out", delay: 0.4 });
      gsap.to(hint, { opacity: 1, duration: 1.2, delay: 2.2 });
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: ".scene--gestion .stage",
      onUpdate: function (self) {
        /* puerta suave: el scroll se detiene en medio de la escena hasta interactuar */
        if (!gateDone && self.progress > 0.32) ctx.lock(self);
      },
      onToggle: function (self) {
        system.active = self.isActive;
        if (self.isActive && self.direction >= 0) enterScene();
      }
    });

    /* la frase final se despide al salir */
    ScrollTrigger.create({
      trigger: section,
      start: "82% bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        if (words) gsap.set(phrase, { opacity: 1 - self.progress * 0.9, filter: "blur(" + self.progress * 6 + "px)" });
      }
    });

    return { name: "gestion", section: section };
  });

})(window.TEMPO);
