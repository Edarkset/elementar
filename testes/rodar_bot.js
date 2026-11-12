// Roda o bot em várias páginas ao mesmo tempo e grava os resultados em JSON.
// node testes/rodar_bot.js --n 24 --paralelo 4 --mapas 12 --saida testes/res.json [--dif '{"vida":1.6}'] [--url http://localhost:8765/]
// --classe cacador: toda partida começa com um monstro dessa classe (escolhido pela semente entre os liberados no começo) e um
// Pacto com o elemento dele e mais um ou dois, também pela semente. Serve para comparar classes com o resto igual.
const { chromium } = require("playwright");
const arg = (k, d) => {
  const i = process.argv.indexOf("--" + k);
  return i > 0 ? process.argv[i + 1] : d;
};
const N = +arg("n", 12),
  PAR = +arg("paralelo", 4),
  MAPAS = +arg("mapas", 12),
  SAIDA = arg("saida", "testes/res.json"),
  URL = arg("url", "http://localhost:8765/"),
  DIF = arg("dif", null),
  S0 = +arg("semente0", 1),
  LOJA = arg("loja", null), // --loja max: Santuário todo comprado
  CLASSE = arg("classe", null),
  PODERES = arg("poderes", null), // --poderes '{"chance_carta_sem_poder":0.8}': muda D.poderes só nesta bateria
  UNIVERSO = arg("universo", null); // --universo andes: o primeiro mapa é este reino
(async () => {
  const b = await chromium.launch();
  const res = [];
  let prox = 0;
  async function trab() {
    const ctx = await b.newContext({ viewport: { width: 900, height: 600 } });
    const p = await ctx.newPage();
    p.on("pageerror", e => console.error("ERRO pagina:", e.message));
    const pronto = () => p.waitForFunction(() => typeof novaRun === "function" && typeof MANIFESTO !== "undefined" && MANIFESTO); // com a lista de artes carregada: ela decide o que existe no mapa
    await p.goto(URL + (URL.includes("?") ? "&" : "?") + "teste");
    await pronto(); // ?teste: publica os nomes do jogo na página para o robô await p.addScriptTag({url:'testes/bot.js'});
    while (prox < N) {
      const i = prox++;
      const sem = S0 + i;
      await p.evaluate(() => {
        localStorage.clear();
      });
      await p.reload();
      await pronto();
      await p.addScriptTag({ url: "testes/bot.js" });
      const t0 = Date.now();
      const r = await p.evaluate(
        ([sem, m, dif, loja, classe, poderes, universo]) => {
          if (poderes) Object.assign(D.poderes, JSON.parse(poderes));
          if (loja === "max") {
            META.loja = {};
            LOJA.forEach(it => (META.loja[it.id] = it.max));
          }
          const cfg = { semente: sem, maxMapas: m, dif: dif ? JSON.parse(dif) : null, universo };
          if (classe) {
            const pool = META.liberados.map(id => LINHA[id]).filter(l => l && l.classe === classe);
            if (!pool.length) throw new Error("nenhum monstro liberado da classe " + classe);
            const l = pool[sem % pool.length],
              outros = ELS.filter(e => e !== l.elemento);
            cfg.inicial = l.id;
            cfg.pacto = [l.elemento, outros[sem % outros.length], ...(sem % 2 ? [outros[(sem * 3 + 1) % outros.length]] : [])].filter(
              (e, i, a) => a.indexOf(e) === i
            );
          }
          return ElementarBot.rodar(cfg);
        },
        [sem, MAPAS, DIF, LOJA, CLASSE, PODERES, UNIVERSO]
      );
      res.push(r);
      require("fs").writeFileSync(SAIDA, JSON.stringify(res, null, 1)); // grava a cada partida: uma bateria interrompida não se perde
      console.log(
        `#${sem} prof ${r.profundidade}${r.morreu ? " (morreu no mapa " + r.mapaMorte + " aos " + r.tNoMapaMorte + "s)" : ""} ttk ${r.mapas.map(m => m.ttkChefe).join(",")} vmin ${r.vidaMin.join(",")} niv ${r.nivel} [${((Date.now() - t0) / 1000).toFixed(0)}s]`
      );
    }
    await ctx.close();
  }
  await Promise.all(Array.from({ length: PAR }, trab));
  require("fs").writeFileSync(SAIDA, JSON.stringify(res, null, 1));
  await b.close();
})();
