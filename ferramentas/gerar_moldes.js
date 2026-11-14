// Gera os moldes ("como deve ficar") de cada formato de folha em docs/prompts/moldes/<formato>.png, com o mesmo desenho que
// a página de conferência mostra (ferramentas/conferir_artes.html). Rode depois de mudar ferramentas/layouts_arte.js:
//
//   node ferramentas/gerar_moldes.js
//
// Precisa do Playwright (o mesmo dos testes no navegador).
"use strict";
const { chromium } = require("playwright");
const fs = require("fs"),
  path = require("path");
const RAIZ = path.join(__dirname, ".."),
  SAIDA = path.join(RAIZ, "docs", "prompts", "moldes");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname, "conferir_artes.html"));
  await p.waitForFunction(() => typeof window.desenharMolde === "function");
  const moldes = await p.evaluate(() =>
    window.LAYOUTS_ARTE.LAYOUTS.map(l => {
      const c = document.createElement("canvas");
      window.desenharMolde(c, l, 1024);
      return [l.id, c.toDataURL("image/png")];
    })
  );
  fs.mkdirSync(SAIDA, { recursive: true });
  for (const [id, url] of moldes) fs.writeFileSync(path.join(SAIDA, id + ".png"), Buffer.from(url.split(",")[1], "base64"));
  console.log(`${moldes.length} moldes em docs/prompts/moldes/`);
  await b.close();
})();
