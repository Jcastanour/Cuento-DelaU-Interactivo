/* ════════════════════════════════════════════════════════
   TEMPO · Escena II — Gestión del tiempo
   Un día de 24 horas que se llena como un juego.
   Cada tarea ocupa su arco; no hay respuesta correcta,
   pero cada combinación cuenta una historia distinta.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  T.registerScene(function (ctx) {
    var U = T.util;
    var stage = new T.Stage2D(document.getElementById("canvas-gestion"));
    var section = document.getElementById("scene-2");
    var ringEl = document.getElementById("day-ring");
    var ringLabel = document.getElementById("day-ring-label");
    var hoursEl = document.getElementById("day-hours");
    var resultEl = document.getElementById("gestion-result");
    var arcsG = document.getElementById("day-arcs");
    var hint = document.getElementById("gestion-hint");
    var phrase = document.getElementById("phrase-gestion");
    var taskEls = Array.prototype.slice.call(document.querySelectorAll(".task"));

    /* horas que ocupa cada tarea en el día, su color y su nota (arpegio en La) */
    var META = {
      sueno:   { hours: 8, rgb: [104, 100, 160], note: 220.0 },
      trabajo: { hours: 6, rgb: [122, 152, 199], note: 246.9 },
      estudio: { hours: 6, rgb: [205, 180, 127], note: 293.7 },
      redes:   { hours: 3, rgb: [186, 122, 170], note: 329.6 },
      familia: { hours: 2, rgb: [226, 196, 120], note: 370.0 },
      cuerpo:  { hours: 2, rgb: [96, 158, 123],  note: 440.0 }
    };

    /* 24 marcas de hora */
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
      var key = el.getAttribute("data-task");
      var arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
      arc.setAttribute("fill", "none");
      arc.setAttribute("stroke", T.rgba(META[key].rgb, 0.85));
      arc.setAttribute("stroke-width", "2.6");
      arc.setAttribute("stroke-linecap", "round");
      arc.style.opacity = "0";
      arcsG.appendChild(arc);
      return {
        el: el, key: key, meta: META[key], arc: arc,
        x: 0, y: 0, fx: 0, fy: 0,
        dragging: false, placed: false,
        dockA: 0,               /* ángulo medio de su arco cuando está en el día */
        seed: i * 7.3
      };
    });

    function ringGeom() {
      var r = ringEl.getBoundingClientRect();
      var s = stage.canvas.getBoundingClientRect();
      return {
        cx: r.left - s.left + r.width / 2,
        cy: r.top - s.top + r.height / 2,
        R: (r.width / 2) * 0.92,
        unit: r.width / 100      /* px por unidad del viewBox */
      };
    }

    function scatter() {
      var g = ringGeom();
      var Rout = Math.min(stage.w, stage.h) * (T.isTouch ? 0.46 : 0.42);
      tasks.forEach(function (tk, i) {
        if (tk.placed) return;
        var a = (i / tasks.length) * Math.PI * 2 - Math.PI / 2 + 0.35;
        tk.fx = g.cx + Math.cos(a) * Rout * U.rand(0.95, 1.15);
        tk.fy = g.cy + Math.sin(a) * Rout * U.rand(0.82, 1.02);
        tk.fy = U.clamp(tk.fy, stage.h * 0.12, stage.h * 0.78);
        tk.fx = U.clamp(tk.fx, stage.w * 0.1, stage.w * 0.9);
        if (tk.x === 0 && tk.y === 0) { tk.x = tk.fx; tk.y = tk.fy; }
      });
    }
    scatter();
    stage.onResize(scatter);

    /* ── arcos del día: el anillo se llena hora a hora ── */
    function arcPath(a0, a1) {
      var r = 40;
      var x0 = 50 + Math.cos(a0) * r, y0 = 50 + Math.sin(a0) * r;
      var x1 = 50 + Math.cos(a1) * r, y1 = 50 + Math.sin(a1) * r;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      return "M " + x0 + " " + y0 + " A " + r + " " + r + " 0 " + large + " 1 " + x1 + " " + y1;
    }

    function totalHours() {
      return tasks.reduce(function (s, t) { return s + (t.placed ? t.meta.hours : 0); }, 0);
    }

    function layoutArcs() {
      var placed = tasks.filter(function (t) { return t.placed; });
      var a = -Math.PI / 2;
      var gap = 0.03;
      placed.forEach(function (t) {
        var span = (t.meta.hours / 24) * Math.PI * 2;
        t.arc.setAttribute("d", arcPath(a + gap, a + span - gap));
        t.dockA = a + span / 2;
        gsap.to(t.arc.style, { opacity: 1, duration: 0.8, ease: "power2.out" });
        a += span;
      });
      tasks.forEach(function (t) {
        if (!t.placed) gsap.to(t.arc.style, { opacity: 0, duration: 0.5 });
      });
      /* horas ocupadas, visibles apenas */
      var h = totalHours();
      hoursEl.textContent = h ? h + " / 24 h" : "";
      hoursEl.classList.toggle("is-over", h > 24);
    }

    /* ── ambiente que responde a las prioridades ── */
    var MOTES = Math.round(320 * T.density);
    var motes = [];
    for (var i = 0; i < MOTES; i++) {
      motes.push({ x: Math.random(), y: Math.random(), z: U.rand(0.3, 1), s: U.rand(0, 100) });
    }
    var ambient = { tint: [205, 180, 127], agit: 0.25, level: 0 };

    function readPriorities() {
      var placed = tasks.filter(function (t) { return t.placed; });
      layoutArcs();
      if (!placed.length) { ambient.level = 0; return; }
      var mix = [0, 0, 0];
      placed.forEach(function (t) {
        mix[0] += t.meta.rgb[0]; mix[1] += t.meta.rgb[1]; mix[2] += t.meta.rgb[2];
      });
      ambient.tint = mix.map(function (v) { return Math.round(v / placed.length); });
      var kinds = placed.length;
      ambient.agit = kinds <= 1 ? 0.9 : kinds === 2 ? 0.55 : totalHours() > 24 ? 0.7 : 0.2;
      ambient.level = Math.min(1, kinds / 3);
    }

    /* ── la historia que cuenta tu día ── */
    function dayStory() {
      var placed = tasks.filter(function (t) { return t.placed; });
      var keys = placed.map(function (t) { return t.key; });
      var has = function (k) { return keys.indexOf(k) >= 0; };
      var h = totalHours();
      if (h > 24) return "no cabe todo. nunca cabe todo.";
      if (keys.length && keys.every(function (k) { return k === "redes" || k === "trabajo" || k === "estudio"; }))
        return "un día lleno. una vida en pausa.";
      if (has("sueno") && (has("familia") || has("cuerpo")) && keys.length >= 3)
        return "un día que respira.";
      if (!has("sueno")) return "sin dormir, el tiempo se cobra.";
      if (keys.length === 1 && has("redes")) return "las horas se fueron mirando otras vidas.";
      return "así se ve un día tuyo. no hay respuesta correcta.";
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

        /* flotación / acople de tareas */
        var g = ringGeom();
        tasks.forEach(function (tk) {
          if (tk.dragging) return;
          if (tk.placed) {
            /* acoplada a su arco de horas */
            var dx = g.cx + Math.cos(tk.dockA) * g.R * 0.66;
            var dy = g.cy + Math.sin(tk.dockA) * g.R * 0.66;
            tk.x += (dx - tk.x) * Math.min(1, dt * 3.2);
            tk.y += (dy - tk.y) * Math.min(1, dt * 3.2);
            tk.x += T.Noise.n2(tk.seed, t * 0.08) * 0.15;
            tk.y += T.Noise.n2(tk.seed + 9, t * 0.07) * 0.15;
          } else {
            var nx = T.Noise.n2(tk.seed, t * 0.12) * 16;
            var ny = T.Noise.n2(tk.seed + 50, t * 0.1) * 14;
            tk.x += (tk.fx + nx - tk.x) * Math.min(1, dt * 1.4);
            tk.y += (tk.fy + ny - tk.y) * Math.min(1, dt * 1.4);
            tasks.forEach(function (o) {
              if (o === tk || o.dragging || o.placed) return;
              var dx2 = tk.x - o.x, dy2 = tk.y - o.y;
              var d2 = dx2 * dx2 + dy2 * dy2;
              if (d2 > 1 && d2 < 16900) {
                var d = Math.sqrt(d2), push = (130 - d) / 130 * 26 * dt;
                tk.x += (dx2 / d) * push;
                tk.y += (dy2 / d) * push;
              }
            });
          }
          gsap.set(tk.el, { x: tk.x, y: tk.y, xPercent: -50, yPercent: -50 });
        });
      }
    });

    /* ── drag: colocar y quitar horas del día ── */
    var interactions = 0;
    var gateDone = false;

    tasks.forEach(function (tk) {
      Draggable.create(tk.el, {
        type: "x,y",
        onPress: function () {
          tk.dragging = true;
          tk.el.classList.add("is-dragging");
        },
        onDrag: function () { tk.x = this.x; tk.y = this.y; },
        onRelease: function () {
          tk.dragging = false;
          tk.el.classList.remove("is-dragging");
          tk.x = this.x; tk.y = this.y;
          var g = ringGeom();
          var d = Math.hypot(tk.x - g.cx, tk.y - g.cy);
          var wasPlaced = tk.placed;
          tk.placed = d < g.R;
          tk.el.classList.toggle("in-day", tk.placed);
          if (tk.placed && !wasPlaced) T.audio.touch(tk.meta.note);
          if (!tk.placed && wasPlaced) T.audio.touch(tk.meta.note * 0.5);
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
      /* la puerta se abre al armar un día con al menos 3 cosas */
      if (placed >= 3) {
        gateDone = true;
        gsap.delayedCall(1.8, closeScene);
      }
    }

    /* cierre: primero la historia de TU día, luego la idea universal */
    var words = null;
    function closeScene() {
      T.audio.touch(523);
      var story = dayStory();
      resultEl.textContent = story;
      var tl = gsap.timeline();
      /* despejar el centro antes de contar la historia */
      tl.to([ringLabel, hoursEl], { opacity: 0, duration: 0.6, ease: "power2.in" }, 0);
      tl.fromTo(resultEl,
        { opacity: 0, y: 10, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }, 0.2);
      tl.to(resultEl, { opacity: 0, filter: "blur(6px)", duration: 1.2, ease: "power2.in" }, 3.4);
      tl.to(taskEls, {
        opacity: 0, scale: 0.85, filter: "blur(10px)",
        duration: 1.6, stagger: 0.12, ease: "power2.in",
        onStart: function () { taskEls.forEach(function (el) { el.style.pointerEvents = "none"; }); }
      }, 3.6);
      tl.to(ringEl, { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 4);
      words = U.splitWords(phrase);
      gsap.set(phrase, { opacity: 1 });
      gsap.set(words, { opacity: 0, y: 16, filter: "blur(6px)" });
      tl.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.5, stagger: 0.14, ease: "power3.out"
      }, 5);
      tl.add(function () { ctx.unlock(); }, 5.8);
    }

    ctx.onSkip(function () {
      if (gateDone) return;
      /* el modo automático arma un día equilibrado antes de irse */
      ["sueno", "estudio", "familia"].forEach(function (key) {
        var tk = tasks.filter(function (t) { return t.key === key; })[0];
        if (tk && !tk.placed) { tk.placed = true; tk.el.classList.add("in-day"); }
      });
      readPriorities();
      gateDone = true;
      closeScene();
    });

    /* demo del autoavance: coloca UNA tarea, como quien prueba */
    ctx.onAutoPlay && ctx.onAutoPlay(function () {
      var free = tasks.filter(function (t) { return !t.placed; });
      if (!free.length) return;
      var tk = free[Math.floor(Math.random() * free.length)];
      tk.placed = true;
      tk.el.classList.add("in-day");
      T.audio.touch(tk.meta.note);
      interactions++;
      readPriorities();
      checkGate();
    });

    /* ── entrada y scroll ── */
    var entered = false;
    function enterScene() {
      if (entered) return;
      entered = true;
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
        if (!gateDone && self.progress > 0.32) ctx.lock(self);
      },
      onToggle: function (self) {
        system.active = self.isActive;
        if (self.isActive && self.direction >= 0) enterScene();
      }
    });

    ScrollTrigger.create({
      trigger: section,
      start: "82% bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        if (words) gsap.set(phrase, { opacity: 1 - self.progress * 0.9, filter: "blur(" + self.progress * 6 + "px)" });
      }
    });

    return {
      name: "gestion",
      section: section,
      guide: "arrastra las tareas hacia el día",
      waiting: function () { return !gateDone; }
    };
  });

})(window.TEMPO);
