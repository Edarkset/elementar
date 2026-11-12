// Copia o jogo web (a mesma pasta que roda no navegador) para desktop/jogo/.
// O jogo continua tendo um único código: este script só junta os arquivos para empacotar.
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const destino = path.join(__dirname, "jogo");
const itens = ["index.html", "manifest.webmanifest", "css", "fontes", "js", "arte", "app"];

fs.rmSync(destino, { recursive: true, force: true });
fs.mkdirSync(destino, { recursive: true });
for (const item of itens) {
  const de = path.join(raiz, item);
  if (!fs.existsSync(de)) { console.warn(`aviso: ${item} não existe, pulando`); continue; }
  fs.cpSync(de, path.join(destino, item), { recursive: true });
}
console.log(`jogo copiado para ${destino}`);
