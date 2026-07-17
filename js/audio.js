/* ════════════════════════════════════════════════════════
   TEMPO · audio generativo
   Todo el sonido se sintetiza con Web Audio API.
   Cero archivos: funciona sin internet.
   ════════════════════════════════════════════════════════ */

(function (T) {
  "use strict";

  var ctx = null;          /* AudioContext, creado en el primer gesto */
  var master, padBus, fxBus;
  var padVoices = [];      /* osciladores del acorde vigente */
  var droneOscs = [];
  var droneFilter, padFilter;
  var noiseBuffer = null;
  var texture = null;      /* capa de textura de la escena 4 */
  var enabled = false;

  /* acordes por capítulo (Hz). La obra respira en La. */
  var CHORDS = {
    1: [55, 110, 130.81, 164.81],                 /* La menor grave: contemplación */
    2: [110, 146.83, 164.81, 196],                /* La sus: posibilidad */
    3: [130.81, 196, 261.63, 329.63],             /* Do luminoso: la pregunta */
    "3a": [110, 164.81, 246.94, 329.63],          /* quintas frías y precisas */
    "3b": [110, 138.59, 164.81, 207.65],          /* La mayor cálido y orgánico */
    4: [98, 123.47, 155.56, 185],                 /* racimo suave: lo que sentimos */
    5: [110, 164.81, 220, 277.18, 329.63]         /* La mayor completo: resolución */
  };

  function makeNoiseBuffer() {
    var len = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  function init() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0;
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -28;
    comp.ratio.value = 6;
    master.connect(comp);
    comp.connect(ctx.destination);

    /* ── dron base: dos osciladores desafinados bajo un filtro que respira ── */
    droneFilter = ctx.createBiquadFilter();
    droneFilter.type = "lowpass";
    droneFilter.frequency.value = 220;
    droneFilter.Q.value = 0.7;
    var droneGain = ctx.createGain();
    droneGain.gain.value = 0.16;
    droneFilter.connect(droneGain);
    droneGain.connect(master);

    [55, 55.35].forEach(function (f, i) {
      var o = ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      var g = ctx.createGain();
      g.gain.value = i === 0 ? 0.8 : 0.25;
      o.connect(g); g.connect(droneFilter);
      o.start();
      droneOscs.push(o);
    });

    /* respiración lenta del filtro del dron */
    var lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    var lfoGain = ctx.createGain();
    lfoGain.gain.value = 90;
    lfo.connect(lfoGain); lfoGain.connect(droneFilter.frequency);
    lfo.start();

    /* ── bus de pads (acordes por escena) ── */
    padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 900;
    padBus = ctx.createGain();
    padBus.gain.value = 0.1;
    padFilter.connect(padBus);
    padBus.connect(master);

    /* ── bus de efectos (granos, blips, texturas) ── */
    fxBus = ctx.createGain();
    fxBus.gain.value = 0.5;
    fxBus.connect(master);

    noiseBuffer = makeNoiseBuffer();
  }

  function setChord(key, waveform) {
    if (!ctx) return;
    var chord = CHORDS[key];
    if (!chord) return;
    var now = ctx.currentTime;

    /* despedir voces actuales con cola larga */
    padVoices.forEach(function (v) {
      v.gain.gain.cancelScheduledValues(now);
      v.gain.gain.setValueAtTime(v.gain.gain.value, now);
      v.gain.gain.linearRampToValueAtTime(0, now + 4);
      v.osc.stop(now + 4.2);
    });
    padVoices = [];

    chord.forEach(function (f, i) {
      var o = ctx.createOscillator();
      o.type = waveform || "sine";
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 7;
      var g = ctx.createGain();
      g.gain.value = 0;
      var level = 0.22 / (1 + i * 0.35);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(level, now + 5 + i * 0.8);
      o.connect(g); g.connect(padFilter);
      o.start();
      padVoices.push({ osc: o, gain: g });
    });
  }

  T.audio = {
    /* llamado en el gesto de entrada */
    start: function (withSound) {
      init();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      enabled = withSound;
      T.state.soundOn = withSound;
      if (withSound) {
        master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3);
        setChord(1);
      }
    },

    toggle: function () {
      if (!ctx) { T.audio.start(true); return true; }
      enabled = !enabled;
      T.state.soundOn = enabled;
      if (ctx.state === "suspended") ctx.resume();
      var now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(enabled ? 0.5 : 0, now + 0.8);
      if (enabled && padVoices.length === 0) setChord(1);
      return enabled;
    },

    /* cambio de capítulo */
    scene: function (n) {
      if (!ctx || !enabled) return;
      if (n === 3) padFilter.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 3);
      else if (n === 5) padFilter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 4);
      else padFilter.frequency.linearRampToValueAtTime(900, ctx.currentTime + 3);
      setChord(n);
      if (n === 4) T.audio._startTexture(); else T.audio._stopTexture();
    },

    /* la decisión colorea el mundo sonoro */
    setPath: function (path) {
      if (!ctx || !enabled) return;
      setChord(path === "a" ? "3a" : "3b", path === "a" ? "triangle" : "sine");
      droneFilter.frequency.linearRampToValueAtTime(path === "a" ? 160 : 320, ctx.currentTime + 2);
    },

    /* grano de arena: llamado con moderación desde la escena 1 */
    sand: function (intensity) {
      if (!ctx || !enabled) return;
      var now = ctx.currentTime;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer;
      src.playbackRate.value = 0.6 + Math.random() * 0.8;
      var bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2400 + Math.random() * 3200;
      bp.Q.value = 2.5;
      var g = ctx.createGain();
      var peak = 0.02 + 0.05 * intensity;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(peak, now + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      src.connect(bp); bp.connect(g); g.connect(fxBus);
      src.start(now);
      src.stop(now + 0.35);
    },

    /* blip suave para interacciones (elegir, soltar una tarea) */
    touch: function (freq) {
      if (!ctx || !enabled) return;
      var now = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq || 660;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.07, now + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
      o.connect(g); g.connect(fxBus);
      o.start(now);
      o.stop(now + 1);
    },

    /* textura de la escena 4: aire resonante que sigue la agitación del mouse */
    _startTexture: function () {
      if (!ctx || texture) return;
      var src = ctx.createBufferSource();
      src.buffer = noiseBuffer;
      src.loop = true;
      var bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 500;
      bp.Q.value = 9;
      var g = ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 4);
      src.connect(bp); bp.connect(g); g.connect(fxBus);
      src.start();
      texture = { src: src, bp: bp, gain: g };
    },

    _stopTexture: function () {
      if (!texture) return;
      var now = ctx.currentTime;
      texture.gain.gain.linearRampToValueAtTime(0, now + 2.5);
      texture.src.stop(now + 3);
      texture = null;
    },

    /* 0 = quietud, 1 = agitación; modula la textura emocional */
    agitation: function (v) {
      if (!ctx || !enabled || !texture) return;
      texture.bp.frequency.setTargetAtTime(320 + v * 1600, ctx.currentTime, 0.4);
      texture.gain.gain.setTargetAtTime(0.02 + v * 0.07, ctx.currentTime, 0.6);
    }
  };

})(window.TEMPO);
