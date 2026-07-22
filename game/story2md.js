/* Convierte un story.js en Markdown legible para edición manual.
   Uso: node game/story2md.js <ruta-story.js> */

const p = require("path").resolve(process.argv[2]);
global.window = {};
require(p);
const S = global.window.STORY;

const out = [];
const nodes = S.nodes;
const finals = Object.keys(nodes).filter(id => nodes[id].final);
const normals = Object.keys(nodes).filter(id => !nodes[id].final);

for (const id of normals) {
  const n = nodes[id];
  out.push(`### Escena \`${id}\``);
  out.push(`**${n.hora || ""}**  ·  ilustración: \`${n.art || "?"}\`  ·  reloj: ${n.timer || 20}s\n`);
  out.push(`> ${n.escena}\n`);
  (n.choices || []).forEach((c, i) => {
    out.push(`**Opción ${i + 1}:** ${c.txt}${c.impulso ? "  🔥impulso" : ""}`);
    out.push(`- emoción ${c.emocion >= 0 ? "+" : ""}${c.emocion} · tiempo ${c.tiempo} · lleva a → \`${c.next}\``);
    out.push(`- eco: *${c.eco || ""}*\n`);
  });
  if (n.timeout) {
    out.push(`**Si el reloj llega a 0:** lleva a → \`${n.timeout.next}\` (emoción +${n.timeout.emocion})`);
    out.push(`- eco: *${n.timeout.eco || ""}*\n`);
  }
  out.push("---\n");
}

out.push(`## Finales (${finals.length})\n`);
for (const id of finals) {
  const n = nodes[id];
  out.push(`### \`${id}\` · ${n.titulo}  (tono: ${n.tono})`);
  out.push(`> ${n.texto}\n`);
  out.push(`*Moraleja:* ${n.moraleja || ""}  ·  ilustración: \`${n.art || "?"}\`\n`);
  out.push("---\n");
}

console.log(out.join("\n"));
