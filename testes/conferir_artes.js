// Teste da página de conferência das imagens geradas (ferramentas/conferir_artes.html): monta folhas de teste no próprio
// navegador (personagens desenhados em canvas) e confere o veredito de cada uma.
//   node testes/conferir_artes.js
"use strict";
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const erros = [];
  p.on("pageerror", e => erros.push(e.message));
  await p.goto("file://" + path.join(__dirname, "..", "ferramentas", "conferir_artes.html"));
  await p.waitForFunction(() => typeof receber === "function");
  const casos = await p.evaluate(async () => {
    // folha 6 x 3 em 1536 x 1024: um "monstro" (corpo + cabeça) por quadro, pés a 85% do quadro
    function folha({ cols = 6, fundo = null, xadrez = false, trocar = null, W = 1536, H = 1024, nome = "teste__anim_3.png" }) {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      const g = c.getContext("2d");
      if (fundo) {
        g.fillStyle = fundo;
        g.fillRect(0, 0, W, H);
      }
      if (xadrez)
        for (let y = 0; y < H; y += 32)
          for (let x = 0; x < W; x += 32) {
            g.fillStyle = (x / 32 + y / 32) % 2 ? "#cccccc" : "#ffffff";
            g.fillRect(x, y, 32, 32);
          }
      const cw = W / cols,
        ch = H / 3;
      for (let r = 0; r < 3; r++)
        for (let k = 0; k < cols; k++) {
          const cx = k * cw + cw / 2,
            pe = r * ch + ch * 0.85,
            a = ch * 0.6,
            outro = trocar && trocar[0] === r && trocar[1] === k;
          g.fillStyle = outro ? "#2a6fd6" : "#e0602c";
          g.beginPath();
          g.ellipse(cx, pe - a * 0.32, a * 0.26, a * 0.32, 0, 0, 7);
          g.fill();
          g.fillStyle = outro ? "#7fd0ff" : "#ffd040";
          g.beginPath();
          g.arc(cx + a * 0.1, pe - a * 0.78, a * 0.2, 0, 7);
          g.fill();
        }
      return new Promise(ok => c.toBlob(bl => ok(new File([bl], nome, { type: "image/png" }))));
    }
    const lista = [
      ["boa", await folha({})],
      ["magenta", await folha({ fundo: "#ff00ff" })],
      ["cinco colunas", await folha({ cols: 5 })],
      ["xadrez", await folha({ xadrez: true })],
      ["pintado", await folha({ fundo: "#334455" })],
      ["tamanho errado", await folha({ W: 1024, H: 384 })],
      ["quadro misturado", await folha({ trocar: [1, 3] })],
      // nome do pacote de prompts (grade 8 x 3 do v2) feito na tela do gerador (1536 x 1024): reconhecido e aceito (o jogo lê 8 poses nesse tamanho)
      ["v2 em 1536x1024", await folha({ cols: 8, nome: "fogo_fatuo__anim_3.png" })],
      ["v2 com 6 colunas", await folha({ cols: 6, nome: "fogo_fatuo__anim_3.png" })]
    ];
    const out = [];
    for (const [nome, f] of lista) {
      await receber([f]);
      const el = document.querySelector("article.cartao");
      out.push([nome, el.className.replace("cartao ", ""), [...el.querySelectorAll("ul.prob li")].map(l => l.textContent).join(" | ")]);
    }
    // contadores clicáveis: "refazer" mostra só os cartões a refazer, "Ver todas" volta a mostrar tudo
    const chips = [...document.querySelectorAll("#resumo button.chip")];
    chips.find(c => c.textContent.includes("refazer")).click();
    const visiveis = [...document.querySelectorAll("article.cartao")].filter(c => !c.hidden);
    const soRefazer = visiveis.length > 0 && visiveis.every(c => c.classList.contains("erro"));
    [...document.querySelectorAll("#resumo button.chip")].find(c => c.textContent.includes("Ver todas")).click();
    const todas = [...document.querySelectorAll("article.cartao")].every(c => !c.hidden);
    out.push([
      "filtro refazer",
      soRefazer && todas ? "ok" : "erro",
      soRefazer ? (todas ? "" : "Ver todas não voltou") : "mostrou cartões que não são de refazer"
    ]);
    return out;
  });
  await b.close();
  const esperado = {
    boa: "ok",
    magenta: "ok",
    "cinco colunas": "erro",
    xadrez: "erro",
    pintado: "erro",
    "tamanho errado": "erro",
    "quadro misturado": "aviso",
    "v2 em 1536x1024": "ok",
    "v2 com 6 colunas": "erro",
    "filtro refazer": "ok"
  };
  let falhas = 0;
  for (const [nome, nivel, probs] of casos) {
    const ok = nivel === esperado[nome];
    if (!ok) falhas++;
    console.log(`${ok ? "ok   " : "FALHA"} ${nome}: ${nivel}${probs ? ` (${probs})` : ""}`);
  }
  if (erros.length) console.log("erros na página:", erros);
  if (falhas || erros.length) process.exit(1);
  console.log(`Conferência das imagens: ${casos.length} casos certos.`);
})();
