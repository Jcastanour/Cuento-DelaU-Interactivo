/* ════════════════════════════════════════════════════════
   TEMPO · Escena IV — Inteligencia emocional
   Cinco enjambres vivos. Se apartan y vuelven.
   Se golpean y se multiplican. Se observan y se calman.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  T.registerScene(function (ctx) {
    var U = T.util;
    var stage = new T.Stage2D(document.getElementById("canvas-emociones"));
    var section = document.getElementById("scene-4");
    var nameEl = document.getElementById("emotion-name");
    var hint = document.getElementById("emociones-hint");
    var phrase = document.getElementById("phrase-emociones");

    var KEYS = ["alegria", "miedo", "frustracion", "calma", "ansiedad"];
    var PER_SWARM = Math.round(85 * T.density);
    var MAX_PER_SWARM = Math.round(230 * T.density);

    /* firmas de movimiento: cada emoción se mueve distinto */
    var PERSONALITY = {
      alegria:     { orbit: 1.15, speed: 1.1, jitter: 0.25, rise: -14, flee: 0.15 },
      miedo:       { orbit: 0.55, speed: 0.8, jitter: 0.35, rise: 4,   flee: 1 },
      frustracion: { orbit: 0.8,  speed: 1.4, jitter: 1.6,  rise: 0,   flee: 0.3 },
      calma:       { orbit: 0.95, speed: 0.35,jitter: 0.06, rise: 0,   flee: 0.05 },
      ansiedad:    { orbit: 0.75, speed: 2.3, jitter: 0.9,  rise: 0,   flee: 0.45 }
    };

    var swarms = KEYS.map(function (key, i) {
      var s = {
        key: key,
        rgb: T.palette.emotions[key].rgb,
        name: T.palette.emotions[key].name,
        hx: 0.5, hy: 0.5,     /* ancla (fracción del stage) */
        cx: 0, cy: 0,          /* centro actual (px) */
        fleeX: 0, fleeY: 0,
        parts: [],
        seed: i * 31.7
      };
      for (var j = 0; j < PER_SWARM; j++) s.parts.push(newPart(s));
      return s;
    });

    function newPart(s) {
      return {
        a: U.rand(0, Math.PI * 2),
        r: U.rand(14, 60),
        w: U.rand(0.4, 1.4) * (Math.random() < 0.5 ? -1 : 1),
        z: U.rand(0.3, 1),
        ox: 0, oy: 0,          /* empuje del mouse, con retorno de resorte */
        x: 0, y: 0
      };
    }

    function anchorSwarms() {
      /* pentágono irregular alrededor del centro */
      swarms.forEach(function (s, i) {
        var a = (i / swarms.length) * Math.PI * 2 - Math.PI / 2 + 0.3;
        var rx = T.isTouch ? 0.3 : 0.26;
        s.hx = 0.5 + Math.cos(a) * rx;
        s.hy = 0.5 + Math.sin(a) * (rx * 0.78);
      });
    }
    anchorSwarms();

    /* ── mouse ── */
    var mouse = { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0, stillFor: 0, inside: false };

    function toLocal(e) {
      var r = stage.canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    section.addEventListener("pointermove", function (e) {
      var p = toLocal(e);
      mouse.vx = p.x - mouse.x; mouse.vy = p.y - mouse.y;
      mouse.x = p.x; mouse.y = p.y;
      mouse.inside = true;
      firstTouch();
    });
    section.addEventListener("pointerleave", function () { mouse.inside = false; mouse.x = -9999; mouse.y = -9999; });
    section.addEventListener("pointerdown", function (e) {
      var p = toLocal(e);
      /* golpear una emoción la multiplica */
      var s = nearestSwarm(p.x, p.y, 170);
      if (!s) return;
      firstTouch();
      T.audio.touch(180 + Math.random() * 120);
      var burst = Math.min(14, MAX_PER_SWARM - s.parts.length);
      for (var i = 0; i < burst; i++) {
        var np = newPart(s);
        np.x = p.x; np.y = p.y;
        np.ox = U.rand(-40, 40); np.oy = U.rand(-40, 40);
        s.parts.push(np);
      }
      harmony = Math.max(0, harmony - 0.4);
      mouse.stillFor = 0;
    });

    function nearestSwarm(x, y, maxD) {
      var best = null, bd = maxD || 1e9;
      swarms.forEach(function (s) {
        var d = Math.hypot(s.cx - x, s.cy - y);
        if (d < bd) { bd = d; best = s; }
      });
      return best;
    }

    var interacted = false;
    function firstTouch() {
      if (interacted) return;
      interacted = true;
      gsap.to(hint, { opacity: 0, duration: 1, delay: 4 });
    }

    /* ── equilibrio por observación ── */
    var harmony = 0;          /* 0 caos · 1 respiración común */
    var revealed = false;
    var sceneTime = 0;

    function reveal() {
      if (revealed) return;
      revealed = true;
      var words = U.splitWords(phrase);
      gsap.set(phrase, { opacity: 1 });
      gsap.fromTo(words,
        { opacity: 0, y: 14, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, stagger: 0.13, ease: "power3.out" });
      gsap.delayedCall(1.8, function () { ctx.unlock(); });
    }

    ctx.onSkip(reveal);

    var system = T.ticker.add({
      active: false,
      update: function (dt, t) {
        stage.clear();
        var c = stage.ctx;
        sceneTime += dt;

        /* quietud del observador */
        mouse.speed = U.lerp(mouse.speed, Math.hypot(mouse.vx, mouse.vy), 0.2);
        mouse.vx *= 0.8; mouse.vy *= 0.8;
        if (mouse.inside && mouse.speed < 1.2) mouse.stillFor += dt;
        else if (!mouse.inside) mouse.stillFor = Math.max(0, mouse.stillFor - dt * 0.5);
        else mouse.stillFor = 0;

        var targetHarmony = U.norm(mouse.stillFor, 2.5, 7);
        harmony = U.lerp(harmony, targetHarmony, dt * 0.5);
        T.audio.agitation(U.clamp(mouse.speed / 26, 0, 1) * (1 - harmony) + (1 - harmony) * 0.25);

        /* al lograr el equilibrio (o tras esperar mucho), la idea aparece */
        if (harmony > 0.85 || sceneTime > (T.isTouch ? 16 : 40)) reveal();

        var breathe = Math.sin(t * 0.9) * 0.5 + 0.5;   /* respiración común */

        swarms.forEach(function (s, si) {
          var P = PERSONALITY[s.key];

          /* el centro deriva; el miedo huye del cursor y siempre regresa */
          var ax = s.hx * stage.w + T.Noise.n2(s.seed, t * 0.1) * 40 * (1 - harmony);
          var ay = s.hy * stage.h + T.Noise.n2(s.seed + 4, t * 0.09) * 34 * (1 - harmony) + P.rise * (1 - harmony);
          var dm = Math.hypot(mouse.x - ax, mouse.y - ay);
          if (dm < 240) {
            var push = (240 - dm) / 240 * 90 * P.flee * (1 - harmony * 0.85);
            s.fleeX = U.lerp(s.fleeX, (ax - mouse.x) / (dm + 1) * push, dt * 3);
            s.fleeY = U.lerp(s.fleeY, (ay - mouse.y) / (dm + 1) * push, dt * 3);
          } else {
            s.fleeX = U.lerp(s.fleeX, 0, dt * 1.5);   /* …vuelven. siempre vuelven */
            s.fleeY = U.lerp(s.fleeY, 0, dt * 1.5);
          }
          s.cx = ax + s.fleeX;
          s.cy = ay + s.fleeY;

          /* en equilibrio: mismo tamaño, misma respiración */
          var orbitScale = U.lerp(P.orbit, 0.8 + breathe * 0.18, harmony);
          var speedScale = U.lerp(P.speed, 0.3, harmony);
          var jit = P.jitter * (1 - harmony);

          for (var i = 0; i < s.parts.length; i++) {
            var p = s.parts[i];
            p.a += p.w * speedScale * dt;
            var wobble = 1 + T.Noise.n2(p.a * 1.4 + s.seed, t * 0.5) * 0.35 * (1 - harmony);
            var tx = s.cx + Math.cos(p.a) * p.r * orbitScale * wobble;
            var ty = s.cy + Math.sin(p.a) * p.r * orbitScale * wobble * 0.86;
            tx += T.Noise.n2(i * 0.7 + s.seed, t * (1 + jit * 3)) * 14 * jit;
            ty += T.Noise.n2(i * 0.9 - s.seed, t * (1 + jit * 2.6)) * 14 * jit;

            /* empuje directo del cursor sobre las partículas */
            var dpx = tx + p.ox - mouse.x, dpy = ty + p.oy - mouse.y;
            var dp = Math.hypot(dpx, dpy);
            if (dp < 90 && mouse.inside) {
              var f = (90 - dp) / 90 * 55 * (1 - harmony * 0.6);
              p.ox += (dpx / (dp + 1)) * f * dt * 6;
              p.oy += (dpy / (dp + 1)) * f * dt * 6;
            }
            /* resorte de regreso */
            p.ox = U.lerp(p.ox, 0, dt * 2.2);
            p.oy = U.lerp(p.oy, 0, dt * 2.2);

            p.x = p.x ? U.lerp(p.x, tx + p.ox, Math.min(1, dt * 5)) : tx;
            p.y = p.y ? U.lerp(p.y, ty + p.oy, Math.min(1, dt * 5)) : ty;

            var sz = 0.9 + p.z * 1.9;
            var al = 0.2 + p.z * 0.5;
            c.fillStyle = T.rgba(s.rgb, al);
            c.beginPath();
            c.arc(p.x, p.y, sz, 0, 6.2832);
            c.fill();
          }
        });

        /* cursor propio: un punto de atención */
        if (mouse.inside && !T.isTouch) {
          c.beginPath();
          c.arc(mouse.x, mouse.y, 3 + harmony * 3, 0, 6.2832);
          c.fillStyle = "rgba(244,244,242," + (0.5 + harmony * 0.3) + ")";
          c.fill();
        }

        /* nombre de la emoción cercana, apenas */
        var near = mouse.inside ? nearestSwarm(mouse.x, mouse.y, 150) : null;
        if (near) {
          var r = stage.canvas.getBoundingClientRect();
          nameEl.textContent = near.name;
          gsap.set(nameEl, { x: near.cx + r.left, y: near.cy + r.top, opacity: 0.7 });
        } else {
          gsap.set(nameEl, { opacity: 0 });
        }
      }
    });

    /* ── entrada y scroll ── */
    var entered = false;
    function enterScene() {
      if (entered) return;
      entered = true;
      sceneTime = 0;
      gsap.to(hint, { opacity: 1, duration: 1.4, delay: 2.5 });
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: ".scene--emociones .stage",
      onUpdate: function (self) {
        if (!revealed && self.progress > 0.35) ctx.lock(self);
      },
      onToggle: function (self) {
        system.active = self.isActive;
        if (self.isActive && self.direction >= 0) enterScene();
      }
    });

    /* la frase se despide al salir */
    ScrollTrigger.create({
      trigger: section,
      start: "85% bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        if (revealed) gsap.set(phrase, { opacity: 1 - self.progress, filter: "blur(" + self.progress * 6 + "px)" });
      }
    });

    return {
      name: "emociones",
      section: section,
      guide: "tócalas. luego obsérvalas quietas",
      waiting: function () { return !revealed; }
    };
  });

})(window.TEMPO);
