/* ════════════════════════════════════════════════════════
   TEMPO · Escena I — El tiempo
   Un reloj de partículas que marca la hora real
   y se deshace como arena con el scroll.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  T.registerScene(function (ctx) {
    var U = T.util;
    var stage = new T.Stage2D(document.getElementById("canvas-clock"));
    var section = document.getElementById("scene-1");
    var phrase = document.getElementById("phrase-intro");
    var cue = document.getElementById("scroll-cue");

    var COUNT = Math.round(3200 * T.density);
    var parts = [];
    var progress = 0;      /* scrub del scroll 0..1 */
    var form = 0;          /* 0 = polvo disperso, 1 = reloj formado */
    var cx = 0, cy = 0, R = 0, floorY = 0;
    var grainClock = 0;

    function layout() {
      cx = stage.w / 2;
      cy = stage.h / 2;
      R = Math.min(stage.w, stage.h) * 0.3;
      floorY = stage.h * 0.86;
    }
    layout();
    stage.onResize(layout);

    /* ── construir partículas ── */
    var homes = T.samplers.clock(0, 0, 1, COUNT); /* unitario; se escala al dibujar */
    for (var i = 0; i < COUNT; i++) {
      var h = homes[i];
      parts.push({
        part: h.part,
        hx: h.x, hy: h.y,            /* home unitario (aro y marcas) */
        pr: h.pr || 0, po: h.po || 0,/* polar (manecillas) */
        x: U.rand(-1.6, 1.6), y: U.rand(-1.6, 1.6),  /* arranca como polvo */
        vx: 0, vy: 0,
        z: U.rand(0.35, 1),          /* profundidad 2.5D: tamaño y alpha */
        theta: 0,                    /* umbral de desprendimiento */
        fall: 0,                     /* 0 pegada · 1 cayendo */
        settled: false,
        px: 0, py: 0                 /* posición final en píxeles */
      });
    }
    /* umbral: las de abajo se sueltan primero, como arena */
    parts.forEach(function (p) {
      var yBias = (p.hy + 1) / 2;   /* 0 arriba, 1 abajo */
      p.theta = U.clamp(0.16 + (1 - yBias) * 0.5 + U.rand(-0.1, 0.1), 0.14, 0.9);
      if (p.part === "hour" || p.part === "minute") p.theta = U.clamp(p.theta + 0.22, 0.3, 0.96);
      /* posición inicial en píxeles: polvo disperso alrededor del centro */
      p.px = cx + p.x * R;
      p.py = cy + p.y * R;
    });

    /* home en píxeles, con manecillas girando a la hora real */
    function homePx(p, t, out) {
      if (p.part === "hour" || p.part === "minute") {
        var d = new Date();
        var ang;
        if (p.part === "hour") {
          ang = ((d.getHours() % 12) + d.getMinutes() / 60) / 12 * Math.PI * 2 - Math.PI / 2;
        } else {
          ang = (d.getMinutes() + d.getSeconds() / 60) / 60 * Math.PI * 2 - Math.PI / 2;
        }
        ang += p.po;
        out.x = cx + Math.cos(ang) * p.pr * R;
        out.y = cy + Math.sin(ang) * p.pr * R;
      } else {
        out.x = cx + p.hx * R;
        out.y = cy + p.hy * R;
      }
    }

    var tmp = { x: 0, y: 0 };

    /* el cursor puede tocar el tiempo: lo aparta y el tiempo vuelve */
    var mouse = { x: -9999, y: -9999, inside: false };
    section.addEventListener("pointermove", function (e) {
      var r = stage.canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = true;
    });
    section.addEventListener("pointerleave", function () { mouse.inside = false; mouse.x = -9999; });

    var system = T.ticker.add({
      active: false,
      update: function (dt, t) {
        stage.clear();
        var c = stage.ctx;
        var pileGrow = U.norm(progress, 0.25, 1);

        /* halo tenue tras el reloj */
        if (form > 0.02) {
          var glow = c.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
          var ga = 0.05 * form * (1 - progress * 0.9);
          glow.addColorStop(0, "rgba(205,180,127," + ga + ")");
          glow.addColorStop(1, "rgba(205,180,127,0)");
          c.fillStyle = glow;
          c.fillRect(0, 0, stage.w, stage.h);
        }

        var grains = 0;
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i];
          var falling = !T.reducedMotion && progress > p.theta;

          if (!falling) {
            /* pegada al reloj (o regresando: el retorno duele, es más lento) */
            p.settled = false;
            homePx(p, t, tmp);
            var k = p.fall > 0 ? 1.6 : 4.5;  /* volver cuesta más que estar */
            p.fall = Math.max(0, p.fall - dt * 1.2);
            var mixX = U.lerp(p.x * R + cx, tmp.x, form);
            var mixY = U.lerp(p.y * R + cy, tmp.y, form);
            if (form >= 1) { mixX = tmp.x; mixY = tmp.y; }
            p.px += (mixX - p.px) * Math.min(1, dt * k);
            p.py += (mixY - p.py) * Math.min(1, dt * k);
            /* latido sutil de vida */
            var n = T.Noise.n2(p.px * 0.01, t * 0.35 + i * 0.13);
            p.px += n * 0.5 * form;
            p.py += T.Noise.n2(p.py * 0.01, t * 0.3 - i * 0.11) * 0.5 * form;
            /* la mano aparta el tiempo; el tiempo siempre regresa */
            if (mouse.inside && form > 0.5) {
              var mdx = p.px - mouse.x, mdy = p.py - mouse.y;
              var md = mdx * mdx + mdy * mdy;
              if (md < 12100 && md > 1) {
                var mf = (110 - Math.sqrt(md)) / 110 * 60 * dt;
                p.px += (mdx / Math.sqrt(md)) * mf;
                p.py += (mdy / Math.sqrt(md)) * mf;
              }
            }
          } else {
            /* cae como arena */
            if (p.fall === 0) { p.vx = U.rand(-6, 6); p.vy = U.rand(0, 10); grains++; }
            p.fall = Math.min(1, p.fall + dt * 2);
            var pileY = floorY - 90 * pileGrow * Math.exp(-Math.pow((p.px - cx) / (R * 0.9), 2));
            if (!p.settled) {
              p.vy += 460 * dt;
              p.vx += T.Noise.n2(p.px * 0.004, t * 0.6) * 26 * dt;
              p.px += p.vx * dt;
              p.py += p.vy * dt;
              if (p.py >= pileY) {
                /* la arena se acumula con cuerpo, no en una línea */
                p.py = pileY + U.rand(0, 14 + 26 * pileGrow);
                p.settled = true;
              }
            } else {
              p.py += (pileY + 3 - p.py) * dt * 0.6; /* el montículo respira */
            }
          }

          /* dibujar */
          var size = (p.part === "ring" ? 1.5 : p.part === "tick" ? 1.7 : 1.3) * (0.5 + p.z * 0.75);
          var alpha = (0.28 + p.z * 0.6) * form;
          if (p.settled) alpha *= 0.75;
          if (T.reducedMotion) alpha *= (1 - U.norm(progress, 0.3, 0.95));
          c.fillStyle = "rgba(205,180,127," + alpha.toFixed(3) + ")";
          c.fillRect(p.px - size / 2, p.py - size / 2, size, size);
        }

        /* granos de sonido, con moderación */
        grainClock += dt;
        if (grains > 0 && grainClock > 0.12) {
          grainClock = 0;
          T.audio.sand(Math.min(1, grains / 40));
        }
      }
    });

    /* ── entrada: la frase, luego el reloj se condensa del polvo ── */
    var words = U.splitWords(phrase);
    gsap.set(phrase, { opacity: 1 });
    gsap.set(words, { opacity: 0, y: 14, filter: "blur(6px)" });

    ctx.onStart(function () {
      system.active = true;
      var tl = gsap.timeline();
      tl.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.6, stagger: 0.28, ease: "power3.out"
      }, 0.6);
      tl.to({ v: 0 }, {
        v: 1, duration: T.reducedMotion ? 1.5 : 3.2, ease: "power2.inOut",
        onUpdate: function () { form = this.targets()[0].v; },
        onComplete: function () { T.audio.bell(220); }
      }, 2.2);
      tl.to(cue, { opacity: 1, duration: 1.2 }, "-=0.8");
      /* el reloj ya nació: ahora sí, la obra se deja recorrer */
      tl.add(function () { T.introDone && T.introDone(); });

      /* si nadie baja en unos segundos, la obra lo susurra */
      var slowHint = document.createElement("p");
      slowHint.className = "hint";
      slowHint.textContent = "baja lentamente";
      section.querySelector(".stage").appendChild(slowHint);
      gsap.delayedCall(6.5, function () {
        if (window.scrollY < 60) {
          gsap.to(slowHint, { opacity: 1, duration: 1.4 });
          var hide = function () {
            if (window.scrollY < 60) return;
            window.removeEventListener("scroll", hide);
            gsap.to(slowHint, { opacity: 0, duration: 0.8 });
          };
          window.addEventListener("scroll", hide, { passive: true });
        }
      });
    });

    /* ── scrub: el reloj se deshace ── */
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: ".scene--tiempo .stage",
      scrub: 0.9,
      onUpdate: function (self) { progress = self.progress; },
      onToggle: function (self) { system.active = self.isActive; }
    });

    /* la frase y la pista se disuelven con el primer gesto de scroll */
    gsap.to(words, {
      opacity: 0, y: -18, filter: "blur(8px)", stagger: 0.06, ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "12% top", scrub: true }
    });
    gsap.to(cue, {
      opacity: 0, ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "8% top", scrub: true }
    });

    return {
      name: "tiempo",
      section: section,
      system: system,
      guide: "baja lentamente",
      waiting: function () { return false; }
    };
  });

})(window.TEMPO);
