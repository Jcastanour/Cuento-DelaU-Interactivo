/* Validador del grafo de story.js (correr con node)
   Uso: node game/validate.js [ruta-al-story.js]
   Revisa: next existentes, nodos alcanzables, finales alcanzables,
   timeouts presentes, longitud de escenas, campos obligatorios. */

const path = process.argv[2] || "game/story.js";
global.window = {};
require(require("path").resolve(path));
const S = global.window.STORY;

let errs = [], warns = [];
const nodes = S.nodes;

if (!nodes[S.start]) errs.push("start no existe: " + S.start);

const reachable = new Set();
const queue = [S.start];
while (queue.length) {
  const id = queue.pop();
  if (reachable.has(id)) continue;
  reachable.add(id);
  const n = nodes[id];
  if (!n) { errs.push("next apunta a nodo inexistente: " + id); continue; }
  if (n.final) {
    ["titulo", "texto", "tono"].forEach(k => { if (!n[k]) errs.push(id + ": final sin " + k); });
    if (!["bueno", "agridulce", "oscuro", "negro"].includes(n.tono)) warns.push(id + ": tono raro '" + n.tono + "'");
    continue;
  }
  if (!n.escena) errs.push(id + ": sin escena");
  else {
    const w = n.escena.split(/\s+/).length;
    if (w > 55) warns.push(id + ": escena larga (" + w + " palabras)");
  }
  if (!n.timeout) errs.push(id + ": sin timeout");
  else queue.push(n.timeout.next);
  if (!n.choices || n.choices.length < 2) errs.push(id + ": menos de 2 choices");
  else n.choices.forEach((c, i) => {
    if (!c.txt) errs.push(id + " choice " + i + ": sin txt");
    if (!c.next) errs.push(id + " choice " + i + ": sin next");
    else queue.push(c.next);
    if (!c.eco) warns.push(id + " choice " + i + ": sin eco");
  });
}

const unreachable = Object.keys(nodes).filter(id => !reachable.has(id));
if (unreachable.length) warns.push("nodos inalcanzables: " + unreachable.join(", "));

const finals = Object.keys(nodes).filter(id => nodes[id].final && reachable.has(id));
const tonos = {};
finals.forEach(id => { tonos[nodes[id].tono] = (tonos[nodes[id].tono] || 0) + 1; });

/* profundidad de partidas: mínimo y máximo de decisiones hasta un final */
function depths() {
  let min = Infinity, max = 0;
  const stack = [[S.start, 0, new Set()]];
  while (stack.length) {
    const [id, d, seen] = stack.pop();
    const n = nodes[id];
    if (!n || seen.has(id) || d > 12) continue;
    if (n.final) { min = Math.min(min, d); max = Math.max(max, d); continue; }
    const s2 = new Set(seen); s2.add(id);
    (n.choices || []).forEach(c => stack.push([c.next, d + 1, s2]));
    if (n.timeout) stack.push([n.timeout.next, d + 1, s2]);
  }
  return { min, max };
}
const dep = depths();

console.log("nodos:", Object.keys(nodes).length, "· alcanzables:", reachable.size);
console.log("finales alcanzables:", finals.length, JSON.stringify(tonos));
console.log("decisiones por partida: min", dep.min, "· max", dep.max);
if (warns.length) { console.log("\nAVISOS:"); warns.forEach(w => console.log(" ⚠", w)); }
if (errs.length) { console.log("\nERRORES:"); errs.forEach(e => console.log(" ✗", e)); process.exit(1); }
console.log("\nGRAFO OK");
