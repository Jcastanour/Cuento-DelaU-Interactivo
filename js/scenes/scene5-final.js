/* ════════════════════════════════════════════════════════
   TEMPO · Escena V — Final
   Una luz. El reloj regresa, completo.
   El tiempo avanza; la historia ya es tuya.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  T.registerScene(function (ctx) {
    var U = T.util;
    var stage = new T.Stage2D(document.getElementById("canvas-final"));
    var section = document.getElementById("scene-5");
    var f1 = document.getElementById("final-1");
    var f2 = document.getElementById("final-2");
    var f3 = document.getElementById("final-3");
    var gracias = document.getElementById("final-gracias");
    var endBlock = document.getElementById("final-end");
    var secondsEl = document.getElementById("final-seconds");

    var COUNT = Math.round(2600 * T.density);
    var progress = 0;
    var cx = 0, cy = 0, R = 0;

    function layout() {
      cx = stage.w / 2;
      cy = stage.h / 2;
      R = Math.min(stage.w, stage.h) * 0.27;
    }
    layout();
    stage.onResize(layout);

    /* el color del cierre: arena teñida por el camino que elegiste */
    function tint() {
      var base = T.palette.sand;
      var path = T.state.path === "a" ? T.palette.pathA : T.state.path === "b" ? T.palette.pathB : base;
      return [
        Math.round(U.lerp(base[0], path[0], 0.45)),
        Math.round(U.lerp(base[1], path[1], 0.45)),
        Math.round(U.lerp(base[2], path[2], 0.45))
      ];
    }

    var homes = T.samplers.clock(0, 0, 1, COUNT);
    var parts = [];
    for (var i = 0; i < COUNT; i++) {
      var h = homes[i];
      parts.push({
        part: h.part, hx: h.x, hy: h.y, pr: h.pr || 0, po: h.po || 0,
        z: U.rand(0.35, 1),
        delay: U.rand(0, 0.75),      /* cada partícula nace de la luz en su momento */
        x: 0, y: 0
      });
    }

    function homePx(p, out) {
      if (p.part === "hour" || p.part === "minute") {
        var d = new Date(), ang;
        if (p.part === "hour") ang = ((d.getHours() % 12) + d.getMinutes() / 60) / 12 * Math.PI * 2 - Math.PI / 2;
        else ang = (d.getMinutes() + d.getSeconds() / 60) / 60 * Math.PI * 2 - Math.PI / 2;
        ang += p.po;
        out.x = cx + Math.cos(ang) * p.pr * R;
        out.y = cy + Math.sin(ang) * p.pr * R;
      } else {
        out.x = cx + p.hx * R;
        out.y = cy + p.hy * R;
      }
    }

    var tmp = { x: 0, y: 0 };

    var system = T.ticker.add({
      active: false,
      update: function (dt, t) {
        stage.clear();
        var c = stage.ctx;
        var rgb = tint();

        /* la pequeña luz que respira */
        var lightPhase = 1 - U.norm(progress, 0.3, 0.55);
        if (lightPhase > 0.01) {
          var breathe = 0.7 + Math.sin(t * 1.4) * 0.3;
          var lr = (26 + breathe * 22) * (0.4 + lightPhase);
          var lg = c.createRadialGradient(cx, cy, 0, cx, cy, lr * 3.4);
          lg.addColorStop(0, T.rgba(rgb, 0.75 * lightPhase * breathe));
          lg.addColorStop(0.35, T.rgba(rgb, 0.2 * lightPhase));
          lg.addColorStop(1, T.rgba(rgb, 0));
          c.fillStyle = lg;
          c.fillRect(0, 0, stage.w, stage.h);
        }

        /* de la luz nace el reloj, completo */
        var form = U.norm(progress, 0.16, 0.52);
        if (form > 0) {
          /* cede el foco a las frases y vuelve a brillar al final */
          var dim = 1 - U.norm(progress, 0.55, 0.68) * 0.55 + U.norm(progress, 0.9, 1) * 0.45;
          var wake = 1;
          for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var f = U.norm(form, p.delay * 0.6, p.delay * 0.6 + 0.4);
            if (f <= 0) continue;
            homePx(p, tmp);
            var e = 1 - Math.pow(1 - f, 3);   /* ease-out cúbico del nacimiento */
            p.x = U.lerp(cx, tmp.x, e);
            p.y = U.lerp(cy, tmp.y, e);
            /* latido de vida, ya sin violencia */
            p.x += T.Noise.n2(i * 0.31, t * 0.3) * 0.7;
            p.y += T.Noise.n2(i * 0.37, t * 0.27) * 0.7;
            var size = (p.part === "tick" ? 1.7 : 1.4) * (0.5 + p.z * 0.75);
            c.fillStyle = T.rgba(rgb, (0.3 + p.z * 0.6) * f * dim * wake);
            c.fillRect(p.x - size / 2, p.y - size / 2, size, size);
          }
        }
      }
    });

    /* ── frases del cierre, dirigidas por el scrub ── */
    var seqs = [
      { el: f1, a: 0.56, b: 0.66 },
      { el: f2, a: 0.68, b: 0.78 },
      { el: f3, a: 0.8, b: 0.9 },
      { el: gracias, a: 0.9, b: 0.983 }
    ];
    seqs.forEach(function (s) { s.words = U.splitWords(s.el); gsap.set(s.el, { opacity: 1 }); gsap.set(s.words, { opacity: 0 }); });

    function drivePhrases(p) {
      seqs.forEach(function (s) {
        var into = U.norm(p, s.a, s.a + 0.035);
        var out = s.b > 1 ? 0 : U.norm(p, s.b - 0.02, s.b);
        s.words.forEach(function (w, i) {
          var wIn = U.norm(into, i / s.words.length * 0.6, i / s.words.length * 0.6 + 0.4);
          var o = wIn * (1 - out);
          w.style.opacity = o.toFixed(3);
          w.style.filter = "blur(" + ((1 - wIn) * 6 + out * 6).toFixed(1) + "px)";
          w.style.transform = "translateY(" + ((1 - wIn) * 12).toFixed(1) + "px)";
        });
      });
    }

    /* ── el final absoluto ── */
    var ended = false;
    function showEnd() {
      if (ended) return;
      ended = true;
      var lived = Math.round((performance.now() - T.state.startTime) / 1000);
      secondsEl.textContent = "estuviste aquí " + lived + " segundos. no volverán.";
      gsap.to(endBlock, { opacity: 1, duration: 2.5, ease: "power2.out" });
      endBlock.style.pointerEvents = "auto";
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: ".scene--final .stage",
      scrub: 0.9,
      onUpdate: function (self) {
        progress = self.progress;
        drivePhrases(progress);
        if (progress > 0.985) showEnd();
        else if (ended && progress < 0.9) {
          ended = false;
          gsap.to(endBlock, { opacity: 0, duration: 0.6 });
          endBlock.style.pointerEvents = "none";
        }
      },
      onToggle: function (self) { system.active = self.isActive; }
    });

    document.getElementById("restart").addEventListener("click", function () {
      ctx.scrollToTop();
    });

    return { name: "final", section: section };
  });

})(window.TEMPO);
