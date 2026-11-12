// Conferência das artes: cada arquivo contra o que o jogo espera dele (grade, recorte, fundo, linha do chão, manifesto).
//
//   node testes/artes.js              todas as artes; grava testes/artes_relatorio.md
//   node testes/artes.js --novas      só as que mudaram desde o último commit (e as que ainda não estão no git)
//   node testes/artes.js --so lendas  só os caminhos que contêm o texto
// Para ver as artes do jeito que o jogo recorta, com os avisos ao lado: ferramentas/galeria.html (servidor local).
//
// Erro (sai com código 1): o jogo não consegue usar a arte do jeito que está.
//   - arquivo no manifesto que não existe, ou arte em arte/ fora do manifesto (o jogo não acha);
//   - dimensões que não formam nenhuma grade conhecida para aquele tipo (células quadradas e iguais);
//   - folha de personagem sem transparência (fundo pintado).
// Aviso: o jogo usa, mas vai aparecer com defeito.
//   - desenho que encosta na borda da célula (vai aparecer pedaço dele na pose vizinha);
//   - linha do chão variando entre os quadros de uma mesma linha (o personagem "pula" ao andar);
//   - moldura ou fundo na borda da imagem;
//   - grade nova que o código ainda não lê (o aviso diz o que precisa ser ajustado).
// As especificações vêm de docs/PEDIDO_SPRITES.md. A imagem é lida pelo próprio navegador, como no jogo.
const { chromium } = require("playwright");
const http = require("http"),
  fs = require("fs"),
  path = require("path"),
  { execSync } = require("child_process");
const RAIZ = path.join(__dirname, "..");
const arg = k => {
  const i = process.argv.indexOf("--" + k);
  return i > 0 ? process.argv[i + 1] || true : null;
};

// ---------------------------------------------------------------- o que o jogo espera de cada tipo de arte (tabela compartilhada com a galeria)
const TIPOS = require("../ferramentas/artes_tipos.js");
const tipoDe = k => TIPOS.find(t => t.re.test(k));

// ---------------------------------------------------------------- quais artes conferir
const MAN = JSON.parse(fs.readFileSync(path.join(RAIZ, "arte/manifesto.json"), "utf8"));
const problemas = []; // {nivel, arte, msg}
const nota = (nivel, arte, msg) => problemas.push({ nivel, arte, msg });
const noDisco = [];
const andar = d => {
  for (const f of fs.readdirSync(path.join(RAIZ, d), { withFileTypes: true }))
    if (f.isDirectory()) andar(d + "/" + f.name);
    else if (/\.(webp|png|jpe?g)$/i.test(f.name)) noDisco.push(d + "/" + f.name);
};
andar("arte");
const usados = new Set(Object.values(MAN));
for (const [k, v] of Object.entries(MAN))
  if (!fs.existsSync(path.join(RAIZ, v))) nota("erro", k, `o manifesto aponta para ${v}, que não existe`);
for (const f of noDisco)
  if (!usados.has(f) && !/bkp|\(\d\)/.test(f))
    nota("erro", f, "arquivo em arte/ fora do manifesto: o jogo não vai achar (rode o conversor ou acrescente em arte/manifesto.json)");
let lista = Object.keys(MAN).filter(k => fs.existsSync(path.join(RAIZ, MAN[k])));
const so = arg("so");
if (typeof so === "string") lista = lista.filter(k => k.includes(so));
if (arg("novas")) {
  let mudou = "";
  try {
    mudou = execSync("git status --porcelain arte", { cwd: RAIZ, encoding: "utf8" });
  } catch (e) {}
  const caminhos = new Set(mudou.split("\n").map(l => l.slice(3).trim()));
  lista = lista.filter(k => caminhos.has(MAN[k]));
  console.log(`${lista.length} arte(s) nova(s) ou alterada(s) desde o último commit.`);
}
for (const k of lista) if (!tipoDe(k)) nota("aviso", k, "tipo de arte desconhecido: a conferência não sabe que grade esperar");

// ---------------------------------------------------------------- medição no navegador
const TIPOS_MIME = { ".html": "text/html", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json" };
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]);
  if (u === "/") return r.writeHead(200, { "Content-Type": "text/html" }).end("<!doctype html><title>artes</title>");
  const f = path.join(RAIZ, u);
  if (!f.startsWith(RAIZ) || !fs.existsSync(f)) return r.writeHead(404).end();
  r.writeHead(200, { "Content-Type": TIPOS_MIME[path.extname(f)] || "application/octet-stream" }).end(fs.readFileSync(f));
});
// mede uma imagem: dimensões, transparência, borda da imagem e, com a grade, cada célula (caixa do desenho e se encosta na borda)
async function medir(p, url, grade) {
  return p.evaluate(
    async ([url, grade]) => {
      const img = new Image();
      img.src = url;
      await img.decode();
      const w = img.naturalWidth,
        h = img.naturalHeight,
        c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const g = c.getContext("2d", { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, w, h).data,
        A = (x, y) => d[(y * w + x) * 4 + 3];
      let transp = 0;
      for (let i = 3; i < d.length; i += 16) if (d[i] < 16) transp++;
      let borda = 0,
        nb = 0;
      for (let x = 0; x < w; x += 2) {
        nb += 2;
        if (A(x, 0) > 200) borda++;
        if (A(x, h - 1) > 200) borda++;
      }
      for (let y = 0; y < h; y += 2) {
        nb += 2;
        if (A(0, y) > 200) borda++;
        if (A(w - 1, y) > 200) borda++;
      }
      // xadrez pintado: cantos com pixels cinza-claros sem cor, alternando dois tons
      const P = (x, y) => {
        const i = (y * w + x) * 4;
        return [d[i], d[i + 1], d[i + 2]];
      };
      let cinza = 0,
        tons = new Set();
      for (const [cx, cy] of [
        [0, 0],
        [w - 24, 0],
        [0, h - 24],
        [w - 24, h - 24]
      ])
        for (let y = cy; y < cy + 24; y += 3)
          for (let x = cx; x < cx + 24; x += 3) {
            const [r, gg, bb] = P(x, y);
            if (Math.max(r, gg, bb) - Math.min(r, gg, bb) < 12 && r > 120) {
              cinza++;
              tons.add(Math.round(r / 24));
            }
          }
      const out = { w, h, transp: transp / (d.length / 16), borda: borda / nb, xadrez: cinza > 150 && tons.size >= 2 };
      if (!grade) return out;
      const [C, L] = grade,
        cw = w / C,
        ch = h / L,
        celulas = [];
      for (let r = 0; r < L; r++)
        for (let k = 0; k < C; k++) {
          const x0 = Math.round(k * cw),
            y0 = Math.round(r * ch),
            x1 = Math.round((k + 1) * cw) - 1,
            y1 = Math.round((r + 1) * ch) - 1;
          let n = 0,
            bx0 = 1e9,
            by0 = 1e9,
            bx1 = -1,
            by1 = -1,
            esq = 0,
            dir = 0,
            topo = 0;
          for (let y = y0; y <= y1; y++)
            for (let x = x0; x <= x1; x++)
              if (A(x, y) > 40) {
                n++;
                if (x < bx0) bx0 = x;
                if (x > bx1) bx1 = x;
                if (y < by0) by0 = y;
                if (y > by1) by1 = y;
                if (x === x0) esq++;
                if (x === x1) dir++;
                if (y === y0) topo++;
              }
          celulas.push(
            n ? { r, k, n, pe: (by1 - y0 + 1) / ch, larg: (bx1 - bx0 + 1) / cw, alt: (by1 - by0 + 1) / ch, esq, dir, topo } : { r, k, n: 0 }
          );
        }
      out.cel = celulas;
      out.celula = cw;
      return out;
    },
    [url, grade]
  );
}
// escolhe a grade: células quadradas e iguais (especificação); senão, a primeira que divide a imagem (o jogo usa, mas fora da
// especificação: sai esticado ou com o recorte arredondado). devolve { g, le, nota, fora }
function gradeDe(tipo, w, h) {
  for (const op of tipo.grades) {
    const [C, L0] = op.g,
      cw = w / C,
      L = L0 || h / cw;
    if (Number.isInteger(cw) && Number.isInteger(L) && L >= 1 && Math.abs(cw - h / L) < 0.5) return { ...op, g: [C, L] };
    if (tipo.linhasExtras && Number.isInteger(cw) && Number.isInteger(h / cw) && h / cw > L0)
      return { ...op, g: [C, h / cw], le: false, nota: `${h / cw - L0} linha(s) além das ${L0} que o código lê hoje: ajustar ao trocar` };
  }
  const op = tipo.grades[0],
    [C, L0] = op.g,
    L = L0 || Math.max(1, Math.round(h / (w / C)));
  const divide = w % C === 0 && h % L === 0;
  return {
    ...op,
    g: [C, L],
    fora: `${w}×${h} em ${C}×${L} dá células de ${+(w / C).toFixed(1)}×${+(h / L).toFixed(1)} px: ${divide ? "não quadradas (o jogo usa, mas fora da especificação)" : "a imagem não divide pela grade (o jogo arredonda o recorte)"}`
  };
}
srv.listen(0, async () => {
  const base = `http://localhost:${srv.address().port}/`;
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(base);
  const porTipo = {};
  let n = 0;
  for (const k of lista) {
    const tipo = tipoDe(k);
    if (!tipo) continue;
    const url = base + MAN[k];
    let m;
    try {
      m = await medir(p, url, null);
    } catch (e) {
      nota("erro", k, "o navegador não conseguiu abrir a imagem");
      continue;
    }
    n++;
    (porTipo[tipo.nome] = porTipo[tipo.nome] || []).push(`${m.w}×${m.h}`);
    if (tipo.personagem && m.transp < 0.05)
      nota(
        "erro",
        k,
        m.xadrez
          ? 'o fundo veio como xadrez pintado (a "transparência" falsa do gerador de imagem): exportar de novo com fundo transparente de verdade'
          : "sem transparência: o fundo veio pintado (o jogo vai mostrar um retângulo)"
      );
    if (tipo.personagem && m.borda > 0.25)
      nota("aviso", k, `moldura ou fundo na borda da imagem (${Math.round(m.borda * 100)}% da borda pintada)`);
    if (!tipo.grades) continue;
    const gr = gradeDe(tipo, m.w, m.h);
    if (gr.fora) nota("aviso", k, gr.fora);
    if (gr.le === false && gr.nota) nota("aviso", k, gr.nota);
    const mc = await medir(p, url, gr.g);
    const cheias = mc.cel.filter(c => c.n > 0);
    // desenho encostando na borda da célula: pedaço dele aparece na célula vizinha
    const vaza = cheias.filter(c => c.esq > 2 || c.dir > 2 || c.topo > 2);
    if (tipo.personagem && vaza.length > Math.max(1, cheias.length * 0.15))
      nota("aviso", k, `${vaza.length} de ${cheias.length} quadros encostam na borda da célula (pedaço aparece na pose vizinha)`);
    if (tipo.personagem) {
      // linha do chão: dentro de uma mesma linha da folha, o pé não pode variar muito (o personagem "pula" ao andar)
      for (const r of tipo.chao || []) {
        const pes = cheias.filter(c => c.r === r && c.alt > 0.2).map(c => c.pe);
        if (pes.length < 3) continue;
        const v = Math.max(...pes) - Math.min(...pes);
        if (v > 0.08) nota("aviso", k, `linha ${r + 1}: o pé varia ${Math.round(v * 100)}% da célula entre os quadros (o personagem pula)`);
      }
    }
  }
  await b.close();
  srv.close();
  // ---------------------------------------------------------------- relatório
  const erros = problemas.filter(x => x.nivel === "erro"),
    avisos = problemas.filter(x => x.nivel === "aviso");
  let md = `# Conferência das artes\n\n${new Date().toISOString().slice(0, 16).replace("T", " ")} · ${n} artes medidas · ${erros.length} erro(s) · ${avisos.length} aviso(s)\n`;
  const secao = (titulo, xs) => {
    if (!xs.length) return;
    md += `\n## ${titulo} (${xs.length})\n\n`;
    for (const x of xs) md += `- \`${x.arte}\`: ${x.msg}\n`;
  };
  secao("Erros: o jogo não consegue usar", erros);
  secao("Avisos: o jogo usa, mas com defeito", avisos);
  md += "\n## Tamanhos encontrados por tipo\n\n";
  for (const [t, ds] of Object.entries(porTipo)) {
    const c = {};
    for (const d of ds) c[d] = (c[d] || 0) + 1;
    md += `- ${t}: ${Object.entries(c)
      .sort((a, b) => b[1] - a[1])
      .map(([d, q]) => `${d} (${q})`)
      .join(", ")}\n`;
  }
  fs.writeFileSync(path.join(__dirname, "artes_relatorio.md"), md);
  // a galeria (ferramentas/galeria.html) mostra estes avisos junto de cada arte
  const porArte = {};
  for (const x of problemas) (porArte[x.arte] = porArte[x.arte] || []).push(`${x.nivel}: ${x.msg}`);
  fs.writeFileSync(path.join(__dirname, "artes_relatorio.json"), JSON.stringify(porArte));
  console.log(`${n} artes medidas · ${erros.length} erro(s) · ${avisos.length} aviso(s). Relatório: testes/artes_relatorio.md`);
  for (const x of erros.slice(0, 30)) console.log(`ERRO ${x.arte}: ${x.msg}`);
  process.exit(erros.length ? 1 : 0);
});
