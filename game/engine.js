/* ════════════════════════════════════════════════════════
   EN CALIENTE · motor del juego
   Lee window.STORY (game/story.js) y dirige todo:
   pantallas, reloj de decisión, medidores, ecos, finales.
   Reutiliza TEMPO (particles.js: canvas/ruido · audio.js: sonido).
   ════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var T = window.TEMPO;
  var S = window.STORY;
  var U = T.util;

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    hud: $("hud"), clock: $("clock"), ring: $("clock-ring"), num: $("clock-num"),
    fillEmo: $("fill-emo"), fillTie: $("fill-tie"),
    cover: $("s-cover"), howto: $("s-howto"), node: $("s-node"), final: $("s-final"),
    hora: $("node-hora"), escena: $("node-escena"), art: $("node-art"),
    slotLeft: $("slot-left"), slotRight: $("slot-right"), slotExtra: $("slot-extra"),
    fTag: $("final-tag"), fTitle: $("final-title"), fText: $("final-text"),
    fMoral: $("final-moral"), fResumen: $("final-resumen"),
    eco: $("eco"), mute: $("btn-mute")
  };

  var RING_LEN = 163.4; /* 2πr con r=26 */

  /* ── estado de la partida ── */
  var st = null;
  function resetState() {
    st = {
      emo: S.meta.emocionInicial,
      tie: S.meta.tiempoInicial,
      history: [],
      impulses: 0,
      decisions: 0,
      timeouts: 0,
      startTime: performance.now()
    };
  }

  /* ── fondo ambiental: motas que se calientan con la emoción ── */
  var stage = new T.Stage2D($("game-bg"));
  var MOTES = Math.round(220 * T.density);
  var motes = [];
  for (var i = 0; i < MOTES; i++) {
    motes.push({ x: Math.random(), y: Math.random(), z: U.rand(0.3, 1), s: U.rand(0, 100) });
  }
  var CALM = [122, 152, 199], HOT = [198, 96, 78];
  var bgHeat = 0.3;

  T.ticker.add({
    active: true,
    update: function (dt, t) {
      stage.clear();
      var c = stage.ctx;
      var heat = st ? U.clamp(st.emo / 100, 0, 1) : 0.3;
      bgHeat = U.lerp(bgHeat, heat, dt * 1.5);
      var rgb = [
        Math.round(U.lerp(CALM[0], HOT[0], bgHeat)),
        Math.round(U.lerp(CALM[1], HOT[1], bgHeat)),
        Math.round(U.lerp(CALM[2], HOT[2], bgHeat))
      ];
      var speed = 0.01 + bgHeat * 0.07;
      for (var i = 0; i < motes.length; i++) {
        var m = motes[i];
        m.x += T.Noise.n2(m.x * 3 + m.s, t * speed * 6) * speed * dt * 6;
        m.y += (T.Noise.n2(m.y * 3 - m.s, t * speed * 5) * speed * 4 - 0.006 * bgHeat) * dt * 6;
        if (m.x < 0) m.x += 1; if (m.x > 1) m.x -= 1;
        if (m.y < 0) m.y += 1; if (m.y > 1) m.y -= 1;
        var sz = 0.6 + m.z * 1.4;
        c.fillStyle = T.rgba(rgb, (0.05 + bgHeat * 0.08) * m.z);
        c.fillRect(m.x * stage.w, m.y * stage.h, sz, sz);
      }
      /* respiración de calor en los bordes cuando está que arde */
      if (bgHeat > 0.6) {
        var pulse = (Math.sin(t * 2.4) * 0.5 + 0.5) * (bgHeat - 0.6) / 0.4;
        var g = c.createRadialGradient(stage.w / 2, stage.h / 2, stage.h * 0.35, stage.w / 2, stage.h / 2, stage.h * 0.85);
        g.addColorStop(0, "rgba(198,96,78,0)");
        g.addColorStop(1, "rgba(198,96,78," + (0.1 * pulse).toFixed(3) + ")");
        c.fillStyle = g;
        c.fillRect(0, 0, stage.w, stage.h);
      }
    }
  });

  /* ── pantallas ── */
  var screens = [els.cover, els.howto, els.node, els.final];
  function showScreen(target, cb) {
    screens.forEach(function (s) {
      if (s !== target && s.classList.contains("is-active")) {
        gsap.to(s, {
          opacity: 0, y: -14, duration: 0.5, ease: "power2.in",
          onComplete: function () {
            s.classList.remove("is-active");
            gsap.set(s, { clearProps: "all" });
          }
        });
      }
    });
    gsap.delayedCall(0.45, function () {
      target.classList.add("is-active");
      gsap.fromTo(target, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      if (cb) cb();
    });
  }

  /* ── medidores ── */
  function paintMeters() {
    var e = U.clamp(st.emo, 0, 100), t = U.clamp(st.tie, 0, 100);
    gsap.to(els.fillEmo, { width: e + "%", duration: 0.9, ease: "power3.out" });
    gsap.to(els.fillTie, { width: t + "%", duration: 0.9, ease: "power3.out" });
    var mix = e / 100;
    var rgb = [
      Math.round(U.lerp(136, 214, mix)),
      Math.round(U.lerp(178, 96, mix)),
      Math.round(U.lerp(204, 72, mix))
    ];
    els.fillEmo.style.background = "rgb(" + rgb.join(",") + ")";
    if (e > 78) gsap.fromTo(".meter--emo", { x: -2 }, { x: 2, duration: 0.07, repeat: 7, yoyo: true, clearProps: "x" });
  }

  /* ── reloj de decisión ── */
  var timerTween = null;
  var lastTick = -1;

  function startTimer(seconds, onTimeout) {
    stopTimer();
    els.clock.classList.add("is-on");
    els.clock.classList.remove("is-urgent");
    var proxy = { t: seconds };
    lastTick = -1;
    els.num.textContent = Math.ceil(seconds);
    gsap.set(els.ring, { attr: { "stroke-dashoffset": 0 } });
    timerTween = gsap.to(proxy, {
      t: 0, duration: seconds, ease: "none",
      onUpdate: function () {
        var s = Math.ceil(proxy.t);
        els.num.textContent = s;
        els.ring.setAttribute("stroke-dashoffset", (RING_LEN * (1 - proxy.t / seconds)).toFixed(1));
        if (proxy.t <= 5.05 && !els.clock.classList.contains("is-urgent")) {
          els.clock.classList.add("is-urgent");
        }
        if (proxy.t <= 5.05 && s !== lastTick) {
          lastTick = s;
          T.audio.touch(980 + (5 - s) * 90);
        }
      },
      onComplete: onTimeout
    });
  }

  function stopTimer() {
    if (timerTween) { timerTween.kill(); timerTween = null; }
    els.clock.classList.remove("is-urgent");
  }

  /* ── eco: lo que acaba de pasar ── */
  function showEco(text, cb) {
    els.eco.textContent = text;
    gsap.timeline()
      .to(els.eco, { opacity: 1, y: -8, duration: 0.45, ease: "power3.out" })
      .to(els.eco, { opacity: 0, y: -18, duration: 0.5, ease: "power2.in", delay: 1.55 })
      .add(function () { gsap.set(els.eco, { clearProps: "y" }); if (cb) cb(); });
  }

  /* ── nodos ── */
  function resolveNext(next) {
    return typeof next === "function" ? next(st) : next;
  }

  function allChoiceBtns() {
    return els.node.querySelectorAll(".choice-btn");
  }

  function renderNode(id) {
    var node = S.nodes[id];
    if (!node) { console.warn("Nodo perdido:", id); return; }
    if (node.final) { renderFinal(id, node); return; }

    els.hora.textContent = node.hora || "";
    els.escena.textContent = node.escena;
    els.art.innerHTML = (window.GAME_ART && window.GAME_ART[node.art]) || "";
    els.slotLeft.innerHTML = "";
    els.slotRight.innerHTML = "";
    els.slotExtra.innerHTML = "";

    /* decisión A a la izquierda, B a la derecha; la tercera vía abajo */
    var slots = [els.slotLeft, els.slotRight, els.slotExtra];
    var btns = node.choices.map(function (ch, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "choice-btn" + (ch.impulso ? " is-impulso" : "");
      b.textContent = ch.txt;
      b.addEventListener("click", function () { choose(node, ch); });
      slots[Math.min(i, 2)].appendChild(b);
      return b;
    });

    showScreen(els.node, function () {
      var words = U.splitWords(els.escena);
      gsap.set(words, { opacity: 0, y: 8, filter: "blur(4px)" });
      gsap.set(btns, { opacity: 0, pointerEvents: "none" });
      var tl = gsap.timeline();
      tl.fromTo(els.hora, { opacity: 0 }, { opacity: 0.8, duration: 0.6 }, 0);
      tl.fromTo(els.art, { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }, 0.05);
      tl.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.5, stagger: 0.022, ease: "power2.out"
      }, 0.25);
      /* los paneles entran desde su lado */
      var wide = window.innerWidth > 760;
      btns.forEach(function (b, i) {
        var fromX = !wide ? 0 : i === 0 ? -36 : i === 1 ? 36 : 0;
        var fromY = wide && i < 2 ? 0 : 18;
        tl.fromTo(b, { opacity: 0, x: fromX, y: fromY },
          { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" }, 0.7 + i * 0.14);
      });
      tl.add(function () {
        btns.forEach(function (b) { b.style.pointerEvents = "auto"; });
        startTimer(node.timer || 15, function () { timeoutFires(node); });
      }, "-=0.35");
    });
  }

  function applyDeltas(d) {
    st.emo = U.clamp(st.emo + (d.emocion || 0), 0, 100);
    st.tie = U.clamp(st.tie + (d.tiempo || 0), 0, 100);
    paintMeters();
  }

  function lockChoices() {
    Array.prototype.forEach.call(allChoiceBtns(), function (b) { b.disabled = true; });
  }

  function choose(node, ch) {
    stopTimer();
    lockChoices();
    st.decisions++;
    if (ch.impulso) {
      st.impulses++;
      T.audio.touch(220);
      gsap.fromTo(".stagearea", { x: -3 }, { x: 3, duration: 0.06, repeat: 5, yoyo: true, clearProps: "x" });
    } else {
      T.audio.touch(520);
    }
    st.history.push({ escena: node.hora || "", txt: ch.txt, impulso: !!ch.impulso });
    applyDeltas(ch);
    showEco(ch.eco || "…", function () {
      renderNode(resolveNext(ch.next));
    });
  }

  function timeoutFires(node) {
    lockChoices();
    st.decisions++;
    st.impulses++;
    st.timeouts++;
    T.audio.sand(1);
    T.audio.touch(160);
    gsap.fromTo(".stagearea", { x: -4 }, { x: 4, duration: 0.06, repeat: 7, yoyo: true, clearProps: "x" });
    var to = node.timeout;
    st.history.push({ escena: node.hora || "", txt: "(no decidiste)", impulso: true });
    applyDeltas(to);
    showEco(to.eco || "El tiempo decidió por ti.", function () {
      renderNode(resolveNext(to.next));
    });
  }

  /* ── final ── */
  function emoDescriptor() {
    if (st.emo < 35) return "terminaste el día en calma";
    if (st.emo < 70) return "terminaste el día tensa";
    return "terminaste el día que ardías";
  }

  function renderFinal(id, node) {
    stopTimer();
    els.clock.classList.remove("is-on");
    els.final.setAttribute("data-tono", node.tono || "oscuro");
    var finalArt = (window.GAME_ART && (window.GAME_ART[node.art] || window.GAME_ART["fin_" + (node.tono || "oscuro")])) || "";
    $("final-art").innerHTML = finalArt;
    els.fTag.textContent = node.tono === "bueno" ? "FINAL · DE LOS BUENOS"
      : node.tono === "negro" ? "FINAL · HUMOR NEGRO" : "FINAL · DE LOS QUE DUELEN";
    els.fTitle.textContent = node.titulo;
    els.fText.textContent = node.texto;
    els.fMoral.textContent = node.moraleja ? "“" + node.moraleja + "”" : "";

    var secs = Math.round((performance.now() - st.startTime) / 1000);
    var mins = Math.floor(secs / 60), rest = secs % 60;
    var tiempoTxt = (mins ? mins + " min " : "") + rest + " s";

    var html = '<p class="r-head">TU PARTIDA</p>';
    html += '<p class="r-stat">te dejaste llevar <strong>' + st.impulses + " de " + st.decisions + "</strong> veces · " + emoDescriptor() + "</p>";
    html += '<p class="r-stat">jugaste <strong>' + tiempoTxt + "</strong>" + (st.timeouts ? " · el reloj decidió por ti " + st.timeouts + (st.timeouts === 1 ? " vez" : " veces") : "") + "</p>";
    html += st.history.map(function (h, i) {
      return '<p class="r-dec">' + (i + 1) + ". " + h.txt + (h.impulso ? " <i>· impulso</i>" : "") + "</p>";
    }).join("");
    els.fResumen.innerHTML = html;

    T.audio.bell(node.tono === "bueno" ? 330 : node.tono === "negro" ? 165 : 220);
    showScreen(els.final);
  }

  /* ── flujo ── */
  $("btn-play").addEventListener("click", function () {
    T.audio.start(true);
    T.state.soundOn = true;
    els.mute.classList.add("is-on");
    T.audio.scene(1);
    showScreen(els.howto);
  });

  $("btn-start").addEventListener("click", function () {
    resetState();
    els.hud.classList.add("is-on");
    paintMeters();
    T.audio.scene(3);
    renderNode(S.start);
  });

  $("btn-replay").addEventListener("click", function () {
    resetState();
    paintMeters();
    T.audio.scene(3);
    renderNode(S.start);
  });

  els.mute.addEventListener("click", function () {
    var on = T.audio.toggle();
    els.mute.classList.toggle("is-on", on);
    els.mute.setAttribute("aria-pressed", on ? "true" : "false");
  });

  /* teclado: 1/2/3 eligen; enter avanza en portada e instrucciones */
  window.addEventListener("keydown", function (e) {
    if (/^[1-3]$/.test(e.key) && els.node.classList.contains("is-active")) {
      var btns = allChoiceBtns();
      var b = btns[parseInt(e.key, 10) - 1];
      if (b && !b.disabled && b.style.pointerEvents !== "none") b.click();
    } else if (e.key === "Enter") {
      if (els.cover.classList.contains("is-active")) $("btn-play").click();
      else if (els.howto.classList.contains("is-active")) $("btn-start").click();
      else if (els.final.classList.contains("is-active")) $("btn-replay").click();
    }
  });

  /* entrada de la portada */
  gsap.fromTo("#s-cover > *", { opacity: 0, y: 16 }, {
    opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out", delay: 0.3
  });

})();
