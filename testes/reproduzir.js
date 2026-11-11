// Prova de "mesmo comportamento": o robô joga com sementes fixas e cada partida vira uma assinatura
// (tempo de chefe e nível por mapa, abates, quantos sorteios o jogo fez e um resumo do estado segundo a segundo).
//
//   node testes/reproduzir.js                         cada semente roda duas vezes: as duas têm de ser idênticas
//   node testes/reproduzir.js --gravar arquivo.json   guarda as assinaturas (antes de mexer no código)
//   node testes/reproduzir.js --conferir arquivo.json compara com as guardadas (depois de mexer): tudo igual = nada mudou no jogo
//   --sementes 2,3,4,9   --mapas 4
//
// Qualquer mudança de regra, de equilíbrio ou de ordem dos sorteios muda a assinatura; por isso ela serve para reorganizar
// código (tipos, módulos, formatação) com a certeza de que o jogo ficou igual. A assinatura vale na mesma máquina e no mesmo
// navegador: outra versão do navegador pode arredondar contas de forma diferente. Sai com código 1 se algo diferir.
const { chromium } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..");
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const SEMENTES = arg("sementes", "2,3,4,9").split(",").map(Number), MAPAS = +arg("mapas", 4), GRAVAR = arg("gravar", null), CONFERIR = arg("conferir", null), PARALELO = +arg("paralelo", 4);
const TIPOS = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".webmanifest": "application/manifest+json" };

function servidor() {
  return new Promise(ok => {
    const s = http.createServer((req, res) => {
      let u = decodeURIComponent(req.url.split("?")[0]); if (u.endsWith("/")) u += "index.html";
      const f = path.join(RAIZ, u); if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
      fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { "Content-Type": TIPOS[path.extname(f)] || "application/octet-stream" }); res.end(d); });
    }).listen(0, () => ok(s));
  });
}
// resumo curto de um texto longo (FNV-1a de 32 bits)
function resumo(txt) { let h = 0x811c9dc5; for (let i = 0; i < txt.length; i++) { h ^= txt.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16).padStart(8, "0"); }

(async () => {
  const srv = await servidor(), base = `http://localhost:${srv.address().port}/`, b = await chromium.launch();
  const erros = [];
  async function jogar(sem) {
    const ctx = await b.newContext({ viewport: { width: 900, height: 600 } }), p = await ctx.newPage();
    p.on("pageerror", e => erros.push(`semente ${sem}: ${e.message}`));
    await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    await p.goto(base + "?teste"); await p.waitForFunction(() => typeof novaRun === "function" && typeof MANIFESTO !== "undefined" && MANIFESTO);
    await p.addScriptTag({ url: base + "testes/bot.js" });
    const r = await p.evaluate(([sem, m]) => { localStorage.clear(); return ElementarBot.rodar({ semente: sem, maxMapas: m, rastro: 6000 }); }, [sem, MAPAS]);
    await ctx.close();
    return { semente: sem, mapas: r.mapas.map(m => m.ttkChefe + "/" + m.nivel).join(" "), fim: r.morreu ? `morreu no mapa ${r.mapaMorte} aos ${r.tNoMapaMorte}s` : "vivo", abates: r.abates, sorteios: r.sorteios, segundos: r.rastro.length, estado: resumo(r.rastro.join("\n")) };
  }
  const texto = a => `${a.mapas} · ${a.fim} · ${a.abates} abates · ${a.sorteios} sorteios · estado ${a.estado}`;
  // fila com no máximo PARALELO partidas ao mesmo tempo
  async function emLote(tarefas) { const out = new Array(tarefas.length); let i = 0; await Promise.all(Array.from({ length: Math.min(PARALELO, tarefas.length) }, async () => { while (i < tarefas.length) { const k = i++; out[k] = await tarefas[k](); } })); return out; }

  let falhas = 0;
  if (CONFERIR) {
    const antes = JSON.parse(fs.readFileSync(CONFERIR, "utf8")), agora = await emLote(antes.map(a => () => jogar(a.semente)));
    antes.forEach((a, i) => { const igual = JSON.stringify(a) === JSON.stringify(agora[i]); if (!igual) falhas++;
      console.log(`semente ${a.semente}: ${igual ? "IGUAL" : "MUDOU"}\n   ${igual ? "" : "antes "}${texto(a)}${igual ? "" : "\n   agora " + texto(agora[i])}`); });
    console.log(falhas ? `${falhas} de ${antes.length} partidas mudaram: o comportamento do jogo não é mais o mesmo.` : `As ${antes.length} partidas são idênticas às guardadas: o jogo se comporta igual.`);
  } else {
    const res = await emLote(SEMENTES.flatMap(s => [() => jogar(s), () => jogar(s)]));
    const unicas = SEMENTES.map((s, i) => { const x = res[i * 2], y = res[i * 2 + 1], igual = JSON.stringify(x) === JSON.stringify(y); if (!igual) falhas++;
      console.log(`semente ${s}: ${igual ? "repetiu" : "NÃO repetiu"}\n   ${texto(x)}${igual ? "" : "\n   " + texto(y)}`); return x; });
    if (GRAVAR && !falhas) { fs.writeFileSync(GRAVAR, JSON.stringify(unicas, null, 1)); console.log(`Assinaturas gravadas em ${GRAVAR}.`); }
    console.log(falhas ? `${falhas} de ${SEMENTES.length} sementes não repetiram a mesma partida.` : `As ${SEMENTES.length} sementes repetiram a mesma partida nas duas execuções.`);
  }
  for (const e of erros) console.log("erro de página: " + e);
  await b.close(); srv.close(); process.exit(falhas || erros.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
