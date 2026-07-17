/* ════════════════════════════════════════════════════════
   TEMPO · Escena III — Toma de decisiones
   Blanco absoluto. Dos formas sin nombre.
   Elegir cambia el mundo; no elegir también.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  T.registerScene(function (ctx) {
    var U = T.util;
    var stage = new T.Stage2D(document.getElementById("canvas-decision"));
    var section = document.getElementById("scene-3");
    var question = document.getElementById("phrase-question");
    var choiceA = document.getElementById("choice-a");
    var choiceB = document.getElementById("choice-b");
    var shapeA = document.getElementById("shape-a");
    var shapeB = document.getElementById("shape-b");
    var closing = document.getElementById("phrase-decision");

    var chosen = null;       /* "a" | "b" */
    var progress = 0;
    var aLines = [];
    var hoverA = 0, hoverB = 0, rotA = 0;   /* las formas sienten la cercanía */

    choiceA.addEventListener("pointerenter", function () { hoverA = 1; });
    choiceA.addEventListener("pointerleave", function () { hoverA = 0; });
    choiceB.addEventListener("pointerenter", function () { hoverB = 1; });
    choiceB.addEventListener("pointerleave", function () { hoverB = 0; });

    /* ── forma A: constelación de líneas precisas ── */
    (function () {
      for (var i = 0; i < 9; i++) {
        var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        var a = (i / 9) * Math.PI * 2;
        var r1 = 12 + (i % 3) * 6, r2 = 40 - (i % 2) * 8;
        l.setAttribute("x1", Math.cos(a) * r1);
        l.setAttribute("y1", Math.sin(a) * r1);
        l.setAttribute("x2", Math.cos(a) * r2);
        l.setAttribute("y2", Math.sin(a) * r2);
        shapeA.appendChild(l);
        aLines.push(l);
      }
    })();

    /* ── forma B: masa orgánica que respira (blob por ruido) ── */
    function blobPath(t, breathe) {
      var pts = [];
      var N = 14;
      for (var i = 0; i < N; i++) {
        var a = (i / N) * Math.PI * 2;
        var r = 34 + T.Noise.n2(Math.cos(a) + 9, Math.sin(a) + t * 0.28) * 9 * breathe;
        pts.push([Math.cos(a) * r, Math.sin(a) * r]);
      }
      var d = "M " + ((pts[0][0] + pts[N - 1][0]) / 2) + " " + ((pts[0][1] + pts[N - 1][1]) / 2);
      for (var j = 0; j < N; j++) {
        var p1 = pts[j], p2 = pts[(j + 1) % N];
        d += " Q " + p1[0] + " " + p1[1] + " " + ((p1[0] + p2[0]) / 2) + " " + ((p1[1] + p2[1]) / 2);
      }
      return d + " Z";
    }

    /* ── partículas del pasaje posterior a la elección ── */
    var COUNT = Math.round(650 * T.density);
    var flow = [];
    for (var i = 0; i < COUNT; i++) {
      flow.push({
        x: Math.random(), y: Math.random(),
        z: U.rand(0.3, 1),
        lane: Math.floor(Math.random() * 14),
        s: U.rand(0, 100)
      });
    }

    var system = T.ticker.add({
      active: false,
      update: function (dt, t) {
        stage.clear();
        var c = stage.ctx;

        /* las formas viven; al acercarse, se intensifican */
        if (!chosen) {
          rotA += (4 + hoverA * 30) * dt;
          shapeB.setAttribute("d", blobPath(t * (1 + hoverB * 0.9), 1 + hoverB * 0.85));
          shapeA.setAttribute("transform", "rotate(" + (rotA % 360) + ")");
        }
        if (!chosen) return;

        /* pasaje: el mundo fluye con el carácter de lo elegido */
        var conv = U.norm(progress, 0.62, 0.92);          /* convergencia al final */
        var vis = U.norm(progress, 0.3, 0.5) * (1 - U.norm(progress, 0.9, 1));
        if (vis <= 0.01) return;
        var rgb = chosen === "a" ? T.palette.pathA : T.palette.pathB;
        var cx = stage.w / 2, cy = stage.h / 2;

        for (var i = 0; i < flow.length; i++) {
          var f = flow[i];
          if (chosen === "a") {
            /* carriles rectos, paso firme */
            f.x += (0.06 + f.z * 0.1) * dt;
            if (f.x > 1.05) f.x = -0.05;
            f.y += ((f.lane + 0.5) / 14 - f.y) * dt * 2.4;
          } else {
            /* remolinos, deriva viva */
            f.x += T.Noise.n2(f.x * 2.6 + f.s, f.y * 2.6 + t * 0.16) * 0.11 * dt * 3;
            f.y += T.Noise.n2(f.y * 2.6 - f.s, f.x * 2.6 - t * 0.14) * 0.11 * dt * 3;
            if (f.x < -0.05) f.x += 1.1; if (f.x > 1.05) f.x -= 1.1;
            if (f.y < -0.05) f.y += 1.1; if (f.y > 1.05) f.y -= 1.1;
          }
          var px = U.lerp(f.x * stage.w, cx, conv);
          var py = U.lerp(f.y * stage.h, cy, conv);
          var sz = chosen === "a" ? (1 + f.z * 1.4) : (0.8 + f.z * 2.2);
          c.fillStyle = T.rgba(rgb, (0.16 + f.z * 0.3) * vis);
          if (chosen === "a") c.fillRect(px, py, sz * 2.4, sz * 0.7);
          else { c.beginPath(); c.arc(px, py, sz, 0, 6.2832); c.fill(); }
        }

        /* el punto de convergencia: todas las decisiones llegan a un lugar */
        if (conv > 0) {
          var glow = c.createRadialGradient(cx, cy, 0, cx, cy, 60 + conv * 40);
          glow.addColorStop(0, T.rgba(rgb, 0.4 * conv));
          glow.addColorStop(1, T.rgba(rgb, 0));
          c.fillStyle = glow;
          c.fillRect(0, 0, stage.w, stage.h);
        }
      }
    });

    /* ── elección ── */
    var qWords = U.splitWords(question);
    var closingWords = null;

    function choose(path) {
      if (chosen) return;
      chosen = path;
      T.state.path = path;
      document.body.classList.add("path-" + path);
      document.documentElement.style.setProperty("--path-tint", "var(--path-" + path + ")");
      T.audio.setPath(path);
      T.audio.bell(path === "a" ? 330 : 262);

      var picked = path === "a" ? choiceA : choiceB;
      var other = path === "a" ? choiceB : choiceA;
      var tl = gsap.timeline();
      tl.to(other, { opacity: 0, scale: 0.7, filter: "blur(10px)", duration: 0.9, ease: "power2.in" }, 0);
      tl.to(qWords, { opacity: 0, y: -14, filter: "blur(6px)", stagger: 0.05, duration: 0.7, ease: "power2.in" }, 0);
      /* lo elegido se expande hasta ser el mundo */
      tl.to(picked, { scale: 14, opacity: 0, duration: 1.8, ease: "power3.in" }, 0.15);
      tl.add(function () {
        choiceA.style.pointerEvents = choiceB.style.pointerEvents = "none";
        ctx.unlock();
      }, 1.2);
    }

    choiceA.addEventListener("click", function () { choose("a"); });
    choiceB.addEventListener("click", function () { choose("b"); });

    ctx.onSkip(function () { if (!chosen) choose(Math.random() < 0.5 ? "a" : "b"); });

    /* ── entrada ── */
    var entered = false;
    function enterScene() {
      if (entered) return;
      entered = true;
      gsap.set(question, { opacity: 1 });
      gsap.fromTo(qWords,
        { opacity: 0, y: 16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.3, stagger: 0.2, ease: "power3.out", delay: 0.6 });
      gsap.fromTo([choiceA, choiceB],
        { opacity: 0, scale: 0.86 },
        {
          opacity: 1, scale: 1, duration: 1.6, stagger: 0.25, ease: "power3.out", delay: 1.6,
          onComplete: function () {
            if (!chosen) { choiceA.style.pointerEvents = "auto"; choiceB.style.pointerEvents = "auto"; }
          }
        });
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: ".scene--decision .stage",
      scrub: 0.9,
      onUpdate: function (self) {
        progress = self.progress;
        if (!chosen && self.progress > 0.18) ctx.lock(self);

        /* la frase de cierre entra y sale con el scrub */
        if (chosen) {
          if (!closingWords && self.progress > 0.8) {
            closingWords = U.splitWords(closing);
            gsap.set(closing, { opacity: 1 });
            gsap.fromTo(closingWords,
              { opacity: 0, y: 14, filter: "blur(6px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.3, stagger: 0.12, ease: "power3.out" });
          }
        }
      },
      onToggle: function (self) {
        system.active = self.isActive;
        document.body.classList.toggle("on-light", self.isActive);
        if (self.isActive && self.direction >= 0) enterScene();
      }
    });

    return {
      name: "decision",
      section: section,
      guide: "elige un camino",
      waiting: function () { return !chosen; }
    };
  });

})(window.TEMPO);
