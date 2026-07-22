/* ════════════════════════════════════════════════════════
   TEMPO · dirección
   Lenis + GSAP, escenas, puertas de interacción,
   línea de tiempo de presentación, teclado, sonido, grano.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  gsap.registerPlugin(ScrollTrigger, Draggable);
  gsap.ticker.lagSmoothing(0);

  /* ── scroll cinematográfico ── */
  var lenis = new Lenis({
    lerp: T.reducedMotion ? 0.4 : 0.06,   /* flotación pesada, sin tirones */
    wheelMultiplier: 0.6,                  /* nadie puede lanzarse: la obra pesa */
    smoothWheel: !T.reducedMotion
  });
  lenis.stop();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });

  /* ── contexto por escena: puertas de interacción y arranque ── */
  var jumping = false;        /* durante saltos de presentación no hay puertas */
  var lockOwner = null;

  function makeCtx() {
    var ctx = {
      _startCbs: [], _skipCbs: [], _autoCbs: [],
      unlocked: false,
      onStart: function (cb) { ctx._startCbs.push(cb); },
      onSkip: function (cb) { ctx._skipCbs.push(cb); },
      onAutoPlay: function (cb) { ctx._autoCbs.push(cb); },
      autoPlay: function () { ctx._autoCbs.forEach(function (cb) { cb(); }); },
      lock: function () {
        if (ctx.unlocked || jumping || lockOwner) return;
        lockOwner = ctx;
        lenis.stop();
      },
      unlock: function () {
        ctx.unlocked = true;
        if (lockOwner === ctx) { lockOwner = null; lenis.start(); }
      },
      skip: function () {
        if (ctx.unlocked) return;
        ctx._skipCbs.forEach(function (cb) { cb(); });
        ctx.unlocked = true;
        if (lockOwner === ctx) { lockOwner = null; lenis.start(); }
      },
      scrollToTop: function () { goToScene(0, 3.2); }
    };
    return ctx;
  }

  /* ── iniciar escenas ── */
  var sceneCtxs = [];
  var scenes = T.scenes.map(function (fn) {
    var ctx = makeCtx();
    sceneCtxs.push(ctx);
    return fn(ctx);
  });
  var sections = scenes.map(function (s) { return s.section; });

  /* ── audio por capítulo ── */
  sections.forEach(function (sec, i) {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: function () { T.audio.scene(i + 1); },
      onEnterBack: function () { T.audio.scene(i + 1); }
    });
  });

  /* ── línea de tiempo de presentación (waypoints) ── */
  var nav = document.getElementById("waypoints");
  var ROMAN = ["I", "II", "III", "IV", "V"];
  var wps = sections.map(function (sec, i) {
    var b = document.createElement("button");
    b.className = "waypoint";
    b.type = "button";
    b.setAttribute("aria-label", "Ir a la escena " + ROMAN[i] + ": " + sec.getAttribute("data-title"));
    b.innerHTML = '<span class="waypoint__label">' + ROMAN[i] + " · " + sec.getAttribute("data-title") + '</span><span class="waypoint__dot"></span>';
    b.addEventListener("click", function () { goToScene(i); });
    nav.appendChild(b);
    return b;
  });

  var current = 0;
  sections.forEach(function (sec, i) {
    ScrollTrigger.create({
      trigger: sec,
      start: "top center",
      end: "bottom center",
      onToggle: function (self) {
        if (!self.isActive) return;
        current = i;
        wps.forEach(function (w, j) { w.classList.toggle("is-active", j === i); });
      }
    });
  });

  /* saltar a una escena: las puertas ANTERIORES se dan por vividas;
     la escena destino conserva la suya, para vivirla de verdad */
  function goToScene(i, duration) {
    i = Math.max(0, Math.min(sections.length - 1, i));
    T.introDone && T.introDone();   /* navegar despierta la obra */
    jumping = true;
    for (var j = 0; j < i; j++) sceneCtxs[j].skip();
    if (lockOwner && lockOwner !== sceneCtxs[i]) lockOwner.skip();
    lenis.start();
    lenis.scrollTo(sections[i], {
      offset: 2,
      duration: duration || (T.reducedMotion ? 0.4 : 2.2),
      easing: function (t) { return 1 - Math.pow(1 - t, 4); },
      lock: true,
      onComplete: function () { jumping = false; }
    });
    /* red de seguridad por si el scroll se interrumpe */
    setTimeout(function () { jumping = false; }, (duration || 2.4) * 1000 + 500);
  }
  T.goToScene = goToScene;

  /* ── teclado: presentar sin tocar el mouse ── */
  window.addEventListener("keydown", function (e) {
    if (!T.state.started) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      /* si la escena actual tiene puerta cerrada, el teclado la pasa */
      if (lockOwner) { lockOwner.skip(); return; }
      goToScene(current + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goToScene(current - 1);
    } else if (/^[1-5]$/.test(e.key)) {
      goToScene(parseInt(e.key, 10) - 1);
    } else if (e.key === "Home") {
      goToScene(0);
    } else if (e.key === "m" || e.key === "M") {
      syncSoundToggle(T.audio.toggle());
    } else if (e.key === "a" || e.key === "A") {
      T.introDone && T.introDone();
      setAuto(!autoMode, true);
    }
  });

  /* ── botón ▸ siguiente escena (estilo juego) ── */
  var nextBtn = document.getElementById("next-btn");
  var nextIcon = document.getElementById("next-btn-icon");
  var atEnd = false;

  function advance() {
    if (atEnd) { goToScene(0, 3.2); return; }
    if (lockOwner) { lockOwner.skip(); return; }
    goToScene(current + 1);
  }
  nextBtn.addEventListener("click", advance);

  /* ── mini-guía persistente + indicador de bajar ── */
  var guideEl = document.getElementById("guide");
  var scrollDown = document.getElementById("scroll-down");
  var lastGuide = "";

  function refreshUI() {
    if (!T.state.started) return;

    /* mientras la obra despierta: pedir paciencia, sin flecha ni pulso */
    if (!introDone) {
      if (lastGuide !== "__intro__") {
        lastGuide = "__intro__";
        guideEl.textContent = "la obra está despertando. espera a que el reloj se forme…";
        guideEl.classList.add("is-visible");
        gsap.to(guideEl, { opacity: 0.55, duration: 0.8 });
      }
      scrollDown.classList.remove("is-visible");
      nextBtn.classList.remove("is-waiting");
      return;
    }

    var meta = scenes[current] || {};
    var waiting = !!(meta.waiting && meta.waiting()) && !sceneCtxs[current].unlocked;

    /* ¿estamos en el final absoluto? */
    var doc = document.documentElement;
    atEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 60;

    var text = waiting ? meta.guide : (atEnd ? "gracias por estar" : "baja para continuar");
    if (autoMode) text = "modo automático — la obra se recorre sola. rueda o teclado para retomar";
    if (text !== lastGuide) {
      lastGuide = text;
      gsap.timeline()
        .to(guideEl, { opacity: 0, duration: 0.3 })
        .add(function () { guideEl.textContent = text; guideEl.classList.add("is-visible"); })
        .to(guideEl, { opacity: 0.55, duration: 0.6 });
    }

    scrollDown.classList.toggle("is-visible", !waiting && !atEnd);
    nextBtn.classList.toggle("is-waiting", waiting);
    /* en el final, el botón invita a recomenzar */
    nextIcon.setAttribute("d", atEnd
      ? "M12 4 A5 5 0 1 0 13 9 M13 3 L13 9 L8 8"      /* ↺ */
      : "M6 3 L11 8 L6 13");                           /* ▸ */
    nextBtn.setAttribute("aria-label", atEnd ? "Volver a empezar" : "Ir a la siguiente escena");
  }
  setInterval(refreshUI, 500);

  /* ── autoavance: la obra puede moverse sola, el visitante siempre manda ── */
  var idle = 0;
  var autoMode = false;
  var autoPinned = false;    /* activado a propósito con el botón: solo la rueda/teclado lo apaga */
  var autoGateWait = 0;
  var autoFired = false;
  var endWait = false;
  var autoBtn = document.getElementById("auto-btn");
  var IDLE_LIMIT = 30;

  function setAuto(on, pinned) {
    autoMode = on;
    autoPinned = on && !!pinned;
    if (on) autoGateWait = 0;
    idle = 0;
    autoBtn.classList.toggle("is-on", on);
    autoBtn.setAttribute("aria-pressed", on ? "true" : "false");
    lastGuide = "";
    refreshUI();
  }

  autoBtn.addEventListener("click", function () {
    T.introDone && T.introDone();
    setAuto(!autoMode, true);
  });

  function userGesture(e) {
    /* tocar el propio botón no cuenta como "retomar el control" */
    if (e && e.target && e.target.closest && e.target.closest("#auto-btn")) return;
    idle = 0;
    if (!autoMode) return;
    /* en modo fijado, mover el mouse no interrumpe: solo rueda, teclado o toque */
    if (autoPinned && (e.type === "pointermove" || e.type === "pointerdown")) return;
    if (e.type === "keydown" && (e.key === "a" || e.key === "A")) return; /* la tecla A alterna aparte */
    setAuto(false);
  }
  ["wheel", "pointermove", "pointerdown", "keydown", "touchstart"].forEach(function (ev) {
    window.addEventListener(ev, userGesture, { passive: true });
  });

  gsap.ticker.add(function (time, deltaMS) {
    if (!T.state.started || jumping || !introDone) return;
    var dt = deltaMS / 1000;
    idle += dt;

    if (!autoMode && idle > IDLE_LIMIT) setAuto(true, false);
    if (!autoMode) return;

    if (lockOwner) {
      /* ante una puerta, la obra juega sola un momento y luego sigue */
      if (autoGateWait === 0) autoFired = false;
      autoGateWait += dt;
      if (autoGateWait > 3 && !autoFired) {
        autoFired = true;
        sceneCtxs[current] && sceneCtxs[current].autoPlay();
      }
      if (autoGateWait > 9) {
        autoGateWait = 0;
        lockOwner.skip();
      }
      return;
    }
    autoGateWait = 0;

    var doc = document.documentElement;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
      /* llegó al final: contempla un momento y recomienza */
      if (autoPinned) {
        if (!endWait) {
          endWait = true;
          gsap.delayedCall(12, function () {
            endWait = false;
            if (autoMode) goToScene(0, 4);
          });
        }
        return;
      }
      setAuto(false);
      gsap.delayedCall(12, function () {
        if (idle >= 11) goToScene(0, 4);
      });
      return;
    }
    /* deriva lenta hacia abajo, como respiración */
    lenis.scrollTo(lenis.targetScroll + 85 * dt, { immediate: true });
  });

  /* ── sonido ── */
  var soundBtn = document.getElementById("sound-toggle");
  function syncSoundToggle(on) {
    soundBtn.classList.toggle("is-on", !!on);
    soundBtn.setAttribute("aria-pressed", on ? "true" : "false");
  }
  soundBtn.addEventListener("click", function () { syncSoundToggle(T.audio.toggle()); });

  /* ── contador de segundos vividos aquí ── */
  var secondsEl = document.getElementById("seconds");
  setInterval(function () {
    if (!T.state.started) return;
    var s = Math.round((performance.now() - T.state.startTime) / 1000);
    secondsEl.textContent = s + " s aquí";
  }, 1000);

  /* ── grano de película: textura viva a baja frecuencia ── */
  (function () {
    var canvas = document.getElementById("grain");
    var c = canvas.getContext("2d");
    var SIZE = 128;
    canvas.width = SIZE; canvas.height = SIZE;
    var img = c.createImageData(SIZE, SIZE);
    var last = 0;
    if (T.reducedMotion) { canvas.style.opacity = "0.03"; }
    gsap.ticker.add(function (time) {
      if (T.reducedMotion && last) return;   /* en calma: un solo fotograma de grano */
      if (time - last < 1 / 8) return;       /* 8 fps: parpadeo orgánico, coste mínimo */
      last = time;
      var d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 26;
      }
      c.putImageData(img, 0, 0);
    });
  })();

  /* ── umbral de entrada ── */
  var entry = document.getElementById("entry");

  gsap.timeline({ delay: 0.35 })
    .to(".entry__title", { opacity: 1, duration: 2.2, ease: "power2.out" })
    .to(".entry__sub", { opacity: 1, duration: 1.6, ease: "power2.out" }, "-=1.4")
    .to(".entry__choices", { opacity: 1, duration: 1.4, ease: "power2.out" }, "-=0.9")
    .to(".entry__hint", { opacity: 1, duration: 1.4, ease: "power2.out" }, "-=0.8")
    .to(".entry__team", { opacity: 1, duration: 1.6, ease: "power2.out" }, "-=0.7");

  /* ── paciencia: la obra despierta antes de dejarse recorrer ──
     El scroll queda retenido hasta que el reloj de la escena I
     termina de formarse; la escena I avisa con T.introDone(). */
  var introDone = false;
  T.introDone = function () {
    if (introDone) return;
    introDone = true;
    lenis.start();
    lastGuide = "";
    refreshUI();
  };

  function begin(withSound) {
    if (T.state.started) return;
    T.state.started = true;
    T.state.startTime = performance.now();
    T.audio.start(withSound);
    syncSoundToggle(withSound);

    gsap.timeline()
      .to(entry, {
        opacity: 0, filter: "blur(14px)", duration: 1.6, ease: "power2.inOut",
        onComplete: function () { entry.remove(); }
      })
      .add(function () {
        document.body.classList.remove("is-locked");
        /* el scroll no se abre aún: primero el reloj debe nacer (T.introDone) */
        ScrollTrigger.refresh();
        sceneCtxs.forEach(function (ctx) {
          ctx._startCbs.forEach(function (cb) { cb(); });
        });
      }, 0.9)
      .to("#waypoints", { opacity: 1, duration: 1.6 }, 1.6)
      .to("#sound-toggle", { opacity: 0.7, duration: 1.6 }, 1.7)
      .to("#seconds", { opacity: 0.55, duration: 1.6 }, 1.8)
      .to("#next-btn", { opacity: 0.55, duration: 1.6 }, 1.9)
      .to("#auto-btn", { opacity: 0.55, duration: 1.6 }, 1.95)
      .add(function () { refreshUI(); }, 2);
  }

  document.getElementById("enter-sound").addEventListener("click", function () { begin(true); });
  document.getElementById("enter-silent").addEventListener("click", function () { begin(false); });

  /* recalcular medidas cuando las fuentes locales terminan de aplicarse */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

})(window.TEMPO);
