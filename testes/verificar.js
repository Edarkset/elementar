// Verificação automática do Elementar: abre o jogo num navegador, passa por todas as telas, joga em todos os reinos,
// confere regras do jogo e analisa as imagens da tela. Sai com código 1 se achar algum problema.
//
//   node testes/verificar.js                 (tudo)
//   node testes/verificar.js --so telas      (só uma parte: carga, telas, jogo, tela)
//   node testes/verificar.js --seg 40        (segundos simulados por reino; padrão 30)
//
// Grava testes/relatorio.md (resumo) e, com --fotos, as fotos em testes/fotos/.
const { chromium, devices } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..");
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const SO = arg("so", null), SEG = +arg("seg", 30), FOTOS = process.argv.includes("--fotos");
const TIPOS = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml" };

const problemas = [], INFO = [];   // {parte, onde, msg}
const nota = (parte, onde, msg) => { const k = parte + "|" + onde + "|" + msg; if (!problemas.some(p => p.k === k)) problemas.push({ k, parte, onde, msg }); };

function servidor() {
  return new Promise(ok => {
    const s = http.createServer((req, res) => {
      let u = decodeURIComponent(req.url.split("?")[0]); if (u.endsWith("/")) u += "index.html";
      const f = path.join(RAIZ, u); if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
      fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { "Content-Type": TIPOS[path.extname(f)] || "application/octet-stream" }); res.end(d); });
    }).listen(0, () => ok(s));
  });
}

// erros de página, console e rede ficam presos a cada página aberta
function vigiar(p, onde) {
  p.on("pageerror", e => nota("erro", onde, (e.stack || e.message).split("\n").slice(0, 2).join(" | ")));
  p.on("console", m => { if (m.type() === "error" && !/ERR_FAILED/.test(m.text())) nota("console", onde, m.text().slice(0, 200)); });
  p.on("response", r => { if (r.status() >= 400 && !/fonts\.g/.test(r.url())) nota("rede", onde, r.status() + " " + r.url().replace(/^https?:\/\/[^/]+/, "")); });
}
async function abrir(b, base, cfg, onde) {
  const ctx = await b.newContext({ ...cfg, bypassCSP: true }); const p = await ctx.newPage(); vigiar(p, onde);   // o teste injeta código na página
  await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());   // sem internet nos testes: as fontes caem no padrão
  await p.goto(base + "?moderador"); await p.waitForFunction(() => typeof novaRun === "function" && typeof MANIFESTO !== "undefined" && MANIFESTO);
  await p.evaluate(() => { try { localStorage.clear(); } catch (e) {} window.confirm = () => true; });
  return { p, ctx };
}

// ---------------------------------------------------------------- 1. arquivos: tudo que o manifesto e o código pedem existe
function verificarArquivos() {
  const man = JSON.parse(fs.readFileSync(path.join(RAIZ, "arte/manifesto.json"), "utf8"));
  for (const [k, v] of Object.entries(man)) if (!fs.existsSync(path.join(RAIZ, v))) nota("arquivos", "manifesto", `${k} aponta para ${v}, que não existe`);
  const sw = fs.readFileSync(path.join(RAIZ, "sw.js"), "utf8"), lista = (sw.match(/BASICO=\[([^\]]*)\]/) || [])[1] || "";
  for (const f of lista.match(/"[^"]+"/g) || []) { const n = f.slice(1, -1); if (n !== "./" && !fs.existsSync(path.join(RAIZ, n))) nota("arquivos", "sw.js", `${n} está na lista do service worker e não existe`); }
  const html = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
  for (const m of html.matchAll(/(?:src|href)="([^"#:]+)"/g)) if (!fs.existsSync(path.join(RAIZ, m[1]))) nota("arquivos", "index.html", `${m[1]} não existe`);
}

// ---------------------------------------------------------------- 2. telas: tudo cabe na tela, nada cortado, botões tocáveis
const TELAS = [
  ["menu", "menu()"], ["pacto", "telaPacto()"], ["inicial", "escolherInicial(['fogo','agua'])"], ["santuario", "telaSantuario()"],
  ["bestiario", "telaBestiario()"], ["conquistas", "telaConquistas()"], ["diarias", "telaDiarias()"], ["moderador", "telaModerador()"],
  ["jogo", "__jogo"], ["pausa", "pausar()"], ["bolsa", "abrirBolsa()"], ["equipe", "abrirEquipe(0)"], ["ferramentas", "telaFerramentas()"], ["bau", "__bau"]];
async function analisarTela(p, onde) {
  return p.evaluate(onde => {
    const out = [], W = innerWidth, H = innerHeight;
    const vis = el => { const s = getComputedStyle(el), r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && +s.opacity > 0.05 && r.width > 0 && r.height > 0; };
    const rolaveis = el => { for (let a = el.parentElement; a; a = a.parentElement) { const s = getComputedStyle(a); if (/(auto|scroll)/.test(s.overflowY + s.overflowX) && a.scrollHeight > a.clientHeight + 2) return a; } return null; };
    if (document.documentElement.scrollWidth > W + 1) out.push(`a página rola na horizontal (${document.documentElement.scrollWidth}px > ${W}px)`);
    for (const el of document.querySelectorAll("button, .carta, .casa, .botao, .btn-hud, .circ")) {
      if (!vis(el)) continue; const r = el.getBoundingClientRect(), nome = (el.innerText || el.getAttribute("aria-label") || el.className).trim().replace(/\s+/g, " ").slice(0, 40);
      if (r.right > W + 1 || r.left < -1) out.push(`"${nome}" sai da tela na horizontal (${Math.round(r.left)}..${Math.round(r.right)} de ${W})`);
      if ((r.bottom > H + 1 || r.top < -1) && !rolaveis(el)) out.push(`"${nome}" sai da tela na vertical e não dá para rolar até ele`);
      if (Math.min(r.width, r.height) < 28 && !el.closest(".roda-pacto")) out.push(`"${nome}" pequeno demais para o dedo (${Math.round(r.width)}x${Math.round(r.height)})`);
    }
    for (const el of document.querySelectorAll(".carta b, .botao, .casa span, h1, h2, .btn-hud")) {
      if (!vis(el)) continue; const s = getComputedStyle(el);
      if (s.whiteSpace === "nowrap" || s.textOverflow === "ellipsis") continue;
      if (el.scrollWidth > el.clientWidth + 2) out.push(`texto cortado: "${el.innerText.trim().slice(0, 40)}"`);
    }
    // botões do HUD não podem se sobrepor
    const hud = [...document.querySelectorAll("#hudBase button, .hud-topo button")].filter(vis).map(e => [e, e.getBoundingClientRect()]);
    for (let i = 0; i < hud.length; i++) for (let j = i + 1; j < hud.length; j++) { const a = hud[i][1], b = hud[j][1];
      if (a.left < b.right - 2 && b.left < a.right - 2 && a.top < b.bottom - 2 && b.top < a.bottom - 2) out.push(`botões do HUD sobrepostos: "${hud[i][0].innerText.trim()}" e "${hud[j][0].innerText.trim()}"`); }
    // imagens quebradas
    for (const im of document.querySelectorAll("img")) if (vis(im) && im.complete && im.naturalWidth === 0 && im.getAttribute("src")) out.push(`imagem quebrada: ${im.getAttribute("src").slice(0, 60)}`);
    return out;
  }, onde);
}
async function verificarTelas(b, base) {
  const vistas = { "iPhone em pé": devices["iPhone 13"], "iPhone deitado": devices["iPhone 13 landscape"], "iPhone SE": devices["iPhone SE"], "computador": { viewport: { width: 1280, height: 800 } } };
  for (const [nv, cfg] of Object.entries(vistas)) {
    const { p, ctx } = await abrir(b, base, { ...cfg, deviceScaleFactor: 1 }, "telas/" + nv);
    await p.waitForTimeout(1200);
    for (const [nt, cod] of TELAS) {
      try {
        if (cod === "__jogo") { await p.evaluate(() => { fechar(); $("telaMenu").classList.remove("ativa"); novaRun(["fogo", "agua", "terra"], D.linhas.find(l => l.elemento === "fogo").id); iniciarMapa(); }); await p.waitForTimeout(5500); await p.evaluate(() => { fechar(); pausado = false; if (J.intro) J.intro = null; }); await p.waitForTimeout(800); }
        else if (cod === "__bau") { await p.evaluate(() => { fechar(); pausado = false; abrirBau({ tipo: "ouro" }); }); await p.waitForTimeout(4800); }
        else { await p.evaluate(c => { const b = document.getElementById("bau"); if (b) b.classList.remove("vis"); eval(c); }, cod); await p.waitForTimeout(450); }
        for (const m of await analisarTela(p, nt)) nota("tela", `${nv} · ${nt}`, m);
        if (FOTOS) { fs.mkdirSync(path.join(__dirname, "fotos"), { recursive: true }); await p.screenshot({ path: path.join(__dirname, "fotos", `${nv}_${nt}.png`.replace(/ /g, "-")) }); }
      } catch (e) { nota("erro", `${nv} · ${nt}`, "a tela não abriu: " + e.message.split("\n")[0]); }
    }
    await ctx.close();
  }
}

// ---------------------------------------------------------------- 3. jogo: em cada reino, simula e confere as regras a cada passo
async function verificarJogo(b, base) {
  const { p, ctx } = await abrir(b, base, { viewport: { width: 900, height: 600 } }, "jogo");
  await p.addScriptTag({ url: base + "testes/bot.js" });
  const unis = await p.evaluate(() => D.universos.map(u => u.id));
  for (const uni of unis) {
    const r = await p.evaluate(([uni, SEG]) => {
      const out = [], rng = (() => { let h = 7; return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) + 0x6D2B79F5 >>> 0) / 4294967296); })();
      SIM.ativo = true; SIM.aoDerrota = () => {}; document.getElementById("telaMenu").classList.remove("ativa");
      const els = [...new Set(["fogo", "agua", "terra", "ar", "raio", "natureza", "luz", "sombra"])].slice(0, 3);
      try { novaRun(els, D.linhas.find(l => els.includes(l.elemento)).id); R.universo = uni; iniciarMapa(); } catch (e) { return [`não começou o mapa: ${e.message}`]; }
      rodando = false; J.deus = true; J.intro = null;
      // entrada: anda em círculos largos, esquiva às vezes, usa Despertar e combinado quando prontos
      SIM.entrada = () => ({ x: Math.cos(J.t * 0.4), y: Math.sin(J.t * 0.55), esquivar: rng() < 0.01, despertar: J.ult >= 100, combinado: J.comb <= 0 });
      const num = v => typeof v === "number" && isFinite(v), passo = 1 / 30;
      let maxIni = 0, longe = 0, presoCartas = 0, t = 0, ultimoErro = "";
      for (let i = 0; i < SEG * 30; i++) {
        const tc = document.getElementById("telaCartas");
        if (tc.classList.contains("ativa")) { const bs = [...document.querySelectorAll("#cartas button.carta:not([disabled])")]; if (bs.length) bs[Math.floor(rng() * bs.length)].click(); else { const rb = document.querySelector("#cartasRodape button:not([disabled])"); if (rb) rb.click(); else { presoCartas++; fechar(); } } }
        pausado = false; if (CINE && CINE.ativa) CINE.ativa = false;
        try { tick(passo); } catch (e) { const m = (e.stack || e.message).split("\n").slice(0, 3).join(" | "); if (m !== ultimoErro) out.push("erro no passo do jogo: " + m); ultimoErro = m; if (out.length > 6) break; }
        if (!J) { out.push("o jogo ficou sem estado (J nulo)"); break; }
        t += passo; const P = J.jogador;
        if (!num(P.x) || !num(P.y)) { out.push(`posição do herói inválida em ${t.toFixed(1)}s`); break; }
        if (!num(J.vida) || !num(J.vidaMax) || J.vidaMax <= 0) { out.push(`vida inválida em ${t.toFixed(1)}s (${J.vida}/${J.vidaMax})`); break; }
        for (const e of J.inimigos) if (!num(e.x) || !num(e.y) || (!num(e.hp) && e.hp !== Infinity)) { out.push(`inimigo com valores inválidos (${e.def && e.def.nome}) em ${t.toFixed(1)}s`); e.hp = 0; }
        for (const s of R.selos) if (s.mon && s.x != null) { if (!num(s.x) || !num(s.y)) out.push("monstro da equipe com posição inválida"); else if (Math.hypot(s.x - P.x, s.y - P.y) > 160) longe++; }
        maxIni = Math.max(maxIni, J.inimigos.length);
        if (J.gemas.length > 1500) { out.push(`cristais acumulando sem limite (${J.gemas.length})`); break; }
        if (J.parts && J.parts.length > 800) out.push(`partículas passando do limite (${J.parts.length})`);
      }
      if (J && J.t < SEG * 0.8) out.push(`o tempo do jogo não andou (${J.t.toFixed(1)} s de ${SEG} s simulados)`);
      if (maxIni > 420) out.push(`inimigos demais na tela ao mesmo tempo (${maxIni})`);
      if (longe > SEG * 30 * 0.25) out.push(`monstros da equipe ficaram longe do herói em ${Math.round(longe / (SEG * 30) * 100)}% do tempo`);
      if (presoCartas) out.push(`tela de cartas sem botão para continuar (${presoCartas}x)`);
      SIM.entrada = null; SIM.ativo = false;
      out.push("__info inimigos máx " + maxIni + ", t " + (J ? J.t.toFixed(0) : "?"));
      return out;
    }, [uni, SEG]).catch(e => [`a página caiu: ${e.message.split("\n")[0]}`]);
    for (const m of r) if (m.startsWith("__info")) INFO.push(uni + ": " + m.slice(7)); else nota("jogo", uni, m);
  }
  // partidas inteiras com o robô: vários mapas seguidos, chefes, portais, baús, evoluções e trocas
  for (const sem of [3, 11]) {
    await p.reload(); await p.waitForFunction(() => typeof novaRun === "function"); await p.addScriptTag({ url: base + "testes/bot.js" });
    const r = await p.evaluate(sem => { localStorage.clear(); return ElementarBot.rodar({ semente: sem, maxMapas: 5, maxSeg: 1200 }); }, sem).catch(e => ({ erro: e.message.split("\n")[0] }));
    if (r.erro) { nota("jogo", "partida " + sem, "a partida quebrou: " + r.erro); continue; }
    INFO.push(`partida ${sem}: chegou ao mapa ${r.profundidade}${r.morreu ? ` (morreu no mapa ${r.mapaMorte})` : ""}, nível ${r.nivel}, tempo ${r.tempo} s`);
    for (const m of r.mapas || []) if (m.ttkChefe > 400) nota("jogo", "partida " + sem, `chefe levou ${Math.round(m.ttkChefe)} s para cair (travado?)`);
    if (r.tempo >= 1199) nota("jogo", "partida " + sem, "a partida não andou: bateu o limite de tempo");
  }
  await ctx.close();
}

// ---------------------------------------------------------------- 4. imagem: em cada reino, a tela desenhada faz sentido
async function verificarImagem(b, base) {
  const { p, ctx } = await abrir(b, base, { ...devices["iPhone 13"], deviceScaleFactor: 2 }, "imagem");
  const unis = await p.evaluate(() => D.universos.map(u => u.id));
  for (const uni of unis) {
    try {
      await p.evaluate(u => { fechar(); $("telaMenu").classList.remove("ativa"); novaRun(["fogo", "agua", "terra"], D.linhas.find(l => l.elemento === "fogo").id); R.universo = u; iniciarMapa(); }, uni);
      await p.waitForFunction(() => ARTE_PEND === 0, null, { timeout: 15000 }).catch(() => nota("imagem", uni, "artes do mapa demoraram mais de 15 s para carregar"));
      await p.waitForTimeout(5000); await p.evaluate(() => { fechar(); pausado = false; J.intro = null; J.deus = true; });
      // tempo de quadro: desenha 30 quadros e mede
      const ms = await p.evaluate(() => { const t0 = performance.now(); for (let i = 0; i < 30; i++) desenhar(1 / 60); return (performance.now() - t0) / 30; });
      if (ms > 40) nota("imagem", uni, `quadro lento: ${ms.toFixed(1)} ms para desenhar (meta: abaixo de 16 ms no celular)`);
      const a = await p.evaluate(() => {
        const c = document.getElementById("tela"), W = c.width, H = c.height, g = c.getContext("2d"), d = g.getImageData(0, 0, W, H).data;
        const lum = (x, y) => { const i = (Math.round(y) * W + Math.round(x)) * 4; return d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114; };
        let s = 0, s2 = 0, n = 0, pretos = 0; for (let y = 0; y < H; y += 6) for (let x = 0; x < W; x += 6) { const l = lum(x, y); s += l; s2 += l * l; n++; if (l < 6) pretos++; }
        const m = s / n, dp = Math.sqrt(Math.max(0, s2 / n - m * m));
        return { media: m, desvio: dp, pretos: pretos / n, VW, VH };
      });
      if (a.desvio < 8) nota("imagem", uni, `tela quase lisa (desvio ${a.desvio.toFixed(1)}): o mapa não foi desenhado?`);
      if (a.pretos > 0.25) nota("imagem", uni, `${Math.round(a.pretos * 100)}% da tela preta`);
      if (a.media < 35) nota("imagem", uni, `tela escura demais (brilho médio ${a.media.toFixed(0)} de 255)`);
      if (a.media > 225) nota("imagem", uni, `tela clara demais (brilho médio ${a.media.toFixed(0)} de 255)`);
      if (FOTOS) { fs.mkdirSync(path.join(__dirname, "fotos"), { recursive: true }); await p.screenshot({ path: path.join(__dirname, "fotos", `reino_${uni}.png`) }); }
    } catch (e) { nota("erro", "imagem/" + uni, e.message.split("\n")[0]); }
  }
  await ctx.close();
}

// ---------------------------------------------------------------- 5. mecânicas: cada Lenda, deus, dragão, forma de monstro, chefe, item e o save
// roda o jogo em modo simulado por 'seg' segundos conferindo as mesmas regras da parte 3; devolve a lista de problemas
const RODAR = `window.__rodar=function(seg){ const out=[], num=v=>typeof v==="number"&&isFinite(v); let ult="";
  SIM.ativo=true; SIM.aoDerrota=()=>{}; rodando=false; if(J){ J.deus=true; J.intro=null; }
  SIM.entrada=()=>({x:Math.cos(J.t*0.5),y:Math.sin(J.t*0.7),esquivar:false,despertar:J.ult>=100,combinado:J.comb<=0});
  for(let i=0;i<seg*30;i++){ const tc=document.getElementById("telaCartas"); if(tc.classList.contains("ativa")){ const b=document.querySelector("#cartas button.carta:not([disabled])"); if(b) b.click(); else { const rb=document.querySelector("#cartasRodape button:not([disabled])"); if(rb) rb.click(); else fechar(); } }
    pausado=false; if(typeof CINE!=="undefined"&&CINE.ativa) CINE.ativa=false; if(!J) { out.push("estado do jogo sumiu"); break; }
    try{ tick(1/30); }catch(e){ const m=(e.stack||e.message).split("\\n").slice(0,3).join(" | "); if(m!==ult) out.push("erro: "+m); ult=m; if(out.length>4) break; }
    if(!J) break; const P=J.jogador; if(!num(P.x)||!num(P.y)||!num(J.vida)){ out.push("herói com valor inválido em "+J.t.toFixed(1)+" s"); break; }
    for(const e of J.inimigos) if(!num(e.x)||!num(e.y)){ out.push("inimigo com posição inválida ("+(e.def&&e.def.nome)+")"); e.hp=0; } }
  SIM.entrada=null; return out; };`;
async function verificarMecanicas(b, base) {
  const { p, ctx } = await abrir(b, base, { viewport: { width: 900, height: 600 } }, "mecanicas");
  await p.addScriptTag({ content: RODAR });
  const roda = async (onde, prep, seg) => { const r = await p.evaluate(([prep, seg]) => { try { (0, eval)(prep); } catch (e) { return ["não começou: " + (e.stack || e.message).split("\n").slice(0, 2).join(" | ")]; } return __rodar(seg); }, [prep, seg]).catch(e => ["a página caiu: " + e.message.split("\n")[0]]);
    for (const m of r) nota("mecânica", onde, m); };
  // todas as formas de todos os monstros (4 estágios x 3 ramos x 3 raridades) têm desenho e nome
  const formas = await p.evaluate(() => { const out = []; novaRun(["fogo", "agua"], D.linhas[0].id); R.chefesVencidos = 1;
    for (const l of D.linhas) for (let e = 0; e < 4; e++) for (const ramo of e >= 2 ? [0, 1, 2] : [null]) for (const rar of ["comum", "epico", "lendario"]) {
      const sl = { nivel: NIV[e], pod: { b: 1, h1: 0, h2: 0 }, mod: {}, mon: { id: l.id, rar, ramo } };
      try { const sp = spriteSelo(sl); if (!sp || !sp.width || !sp.height) out.push(`${l.id} estágio ${e} ramo ${ramo} ${rar}: sem desenho`); const n = nomeForma(sl); if (!n || /undefined|null/.test(n)) out.push(`${l.id} estágio ${e} ramo ${ramo}: nome inválido "${n}"`); }
      catch (err) { out.push(`${l.id} estágio ${e} ramo ${ramo} ${rar}: ${err.message}`); } }
    return out; });
  for (const m of formas.slice(0, 40)) nota("mecânica", "formas dos monstros", m);
  // cada Lenda e cada deus do Panteão como Invocador, com equipe de nível 12
  const lendas = await p.evaluate(() => [...D.lendas, ...D.panteao].map(l => [l.id, l.nome]));
  for (const [id, nome] of lendas) await roda("lenda " + nome, `{ const l=[...D.lendas,...D.panteao].find(x=>x.id===${JSON.stringify(id)}); comecarTeste(l.elementos.slice(0,2),equipeTeste(l.elementos,12),l.id); }`, 15);
  // cada Dragão Ancestral em cada forma
  const anc = await p.evaluate(() => (D.ancestrais || []).map(a => a.id));
  for (const id of anc) for (const [f, nv] of [["filhote", 1], ["adulto", 9], ["supremo", 15]])
    await roda(`dragão ${id} (${f})`, `{ const l=LINHA[${JSON.stringify(id)}], o=ELS.find(e=>e!==l.elemento); comecarTeste([l.elemento,o],[{id:l.id,nivel:${nv},rar:"lendario",ramo:${nv >= 9 ? 0 : null},supremo:${nv >= 15}}],null); }`, 10);
  // chefe de cada reino: aparece, apanha até cair e o jogo segue para os portais
  const unis = await p.evaluate(() => D.universos.map(u => u.id)); let chefesOk = 0;
  for (const u of unis) {
    await roda("chefe de " + u, `{ fechar(); novaRun(["fogo","agua","terra"],D.linhas.find(l=>l.elemento==="fogo").id); R.universo=${JSON.stringify(u)}; iniciarMapa(); J.intro=null; J.t=MAPA_SEG-1; }`, 6);
    const r = await p.evaluate(() => { const ch = J && (J.chefeVivo || J.inimigos.find(e => e.chefe)); if (!ch) return "o chefe não apareceu no fim do mapa";
      let n = 0; const t0 = J.t; while (J && J.chefeVivo && J.chefeVivo.hp > 0 && n++ < 600) { const c = J.chefeVivo; c.imortal = false; if (J.t - t0 > 1) { FONTE = "basico"; ferir(c, c.max * 0.08, "fogo"); } try { tick(1 / 30); } catch (e) { return "erro na luta: " + e.message; } }
      if (J && J.chefeVivo && J.chefeVivo.hp > 0) return "o chefe não caiu mesmo apanhando (imortal ou travado?)";
      for (let i = 0; i < 120; i++) { try { tick(1 / 30); } catch (e) { return "erro depois do chefe: " + e.message; } }
      const tc = document.getElementById("telaCartas"), tit = document.getElementById("cartasTitulo").textContent;
      return tc.classList.contains("ativa") || /portal/i.test(tit) || document.querySelector(".bau-tela.vis") ? null : "depois do chefe não abriu baú nem portais"; }).catch(e => "a página caiu: " + e.message.split("\n")[0]);
    if (r) nota("mecânica", "chefe de " + u, r); else chefesOk++;
    await p.evaluate(() => { fechar(); const bt = document.getElementById("bau"); if (bt) bt.classList.remove("vis"); pausado = false; });
  }
  // itens: cada um usado com a equipe cheia
  const itens = await p.evaluate(() => { const out = []; fechar(); novaRun(["fogo", "agua"], D.linhas.find(l => l.elemento === "fogo").id); iniciarMapa(); J.intro = null;
    for (const k of Object.keys(D.itens)) { try { R.itens[k] = 1; usarItem(k); fechar(); pausado = false; tick(1 / 30); } catch (e) { out.push(`${k}: ${e.message}`); } } return out; });
  for (const m of itens) nota("mecânica", "itens", m);
  // save: salva no meio do mapa, carrega e continua jogando
  INFO.push(`mecânicas: ${await p.evaluate(() => D.linhas.length * 4 * 3)} formas de monstro, ${lendas.length} Lendas e deuses, ${anc.length * 3} formas de dragão, ${chefesOk}/${unis.length} chefes vencidos, ${await p.evaluate(() => Object.keys(D.itens).length)} itens`);
  await roda("salvar e continuar", `{ fechar(); novaRun(["fogo","agua"],D.linhas.find(l=>l.elemento==="fogo").id); iniciarMapa(); J.intro=null; for(let i=0;i<300;i++) tick(1/30); R.profundidade=2; salvarRun(); const s=JSON.parse(JSON.stringify(RUN_SALVA)); carregarRun(s); iniciarMapa(); if(R.profundidade!==2) throw new Error("profundidade não voltou do save"); }`, 10);
  await ctx.close();
}

// ---------------------------------------------------------------- 6. jogo desenhado: joga em tempo real em cada reino (com chefe, Despertar,
// combinado e baú), para pegar erros no código de desenho, que o modo simulado não executa
async function verificarVisual(b, base) {
  const { p, ctx } = await abrir(b, base, { ...devices["iPhone 13"], deviceScaleFactor: 2 }, "visual");
  const unis = await p.evaluate(() => D.universos.map(u => u.id)); const lentos = [];
  for (const u of unis) {
    try {
      await p.evaluate(u => { fechar(); $("telaMenu").classList.remove("ativa"); const els = ["fogo", "agua", "terra"], ids = D.linhas.filter(l => els.includes(l.elemento)).map(l => l.id);
        comecarTeste(els, [{ id: ids[0], nivel: 16, ramo: 0 }, { id: ids[4], nivel: 9, ramo: 1 }, { id: ids[8], nivel: 5 }], null); R.universo = u; iniciarMapa();
        window.__fecha && clearInterval(window.__fecha);
        window.__fecha = setInterval(() => { if (!J) return; J.deus = true; if ($("telaCartas").classList.contains("ativa")) { const bt = document.querySelector("#cartas button.carta:not([disabled])"); if (bt) bt.click(); else fechar(); }
          const bau = document.querySelector(".bau-tela.vis.pronto .bau-coletar"); if (bau) bau.click(); }, 200);
        SIM.entrada = () => ({ x: Math.cos(J.t * 0.6), y: Math.sin(J.t * 0.8), esquivar: Math.random() < 0.01, despertar: J.ult >= 100, combinado: J.comb <= 0 }); }, u);
      await p.waitForTimeout(6000);
      await p.evaluate(() => { J.intro = null; J.ult = 100; J.comb = 0; soltarBau(J.jogador.x + 20, J.jogador.y, "comum"); });
      await p.waitForTimeout(4000);
      await p.evaluate(() => { J.t = Math.max(J.t, MAPA_SEG - 1); });
      await p.waitForTimeout(5000);
      await p.evaluate(() => { const c = J && J.chefeVivo; if (c) { c.imortal = false; FONTE = "basico"; ferir(c, c.hp + 1, "fogo"); } });
      await p.waitForTimeout(3000);
      const ms = await p.evaluate(() => MSQ); if (ms > 30) lentos.push(`${u} ${ms.toFixed(0)} ms`);
    } catch (e) { nota("erro", "visual/" + u, e.message.split("\n")[0]); }
  }
  if (lentos.length) INFO.push("quadros lentos no navegador de teste (sem placa de vídeo, só referência): " + lentos.join(", "));
  await p.evaluate(() => { clearInterval(window.__fecha); SIM.entrada = null; });
  await ctx.close();
}

(async () => {
  const s = await servidor(), base = `http://localhost:${s.address().port}/`, b = await chromium.launch(), t0 = Date.now();
  const partes = { carga: verificarArquivos, telas: () => verificarTelas(b, base), jogo: () => verificarJogo(b, base), tela: () => verificarImagem(b, base), mecanicas: () => verificarMecanicas(b, base), visual: () => verificarVisual(b, base) };
  for (const [n, f] of Object.entries(partes)) { if (SO && SO !== n) continue; const t = Date.now(); process.stdout.write(`${n}... `); await f(); console.log(`${((Date.now() - t) / 1000).toFixed(0)} s`); }
  await b.close(); s.close();
  const porParte = {}; for (const p of problemas) (porParte[p.parte] = porParte[p.parte] || []).push(p);
  let md = `# Verificação automática\n\n${new Date().toISOString().slice(0, 16).replace("T", " ")} · ${((Date.now() - t0) / 1000).toFixed(0)} s · ${problemas.length} problema(s)\n`;
  for (const [parte, ps] of Object.entries(porParte)) { md += `\n## ${parte} (${ps.length})\n\n`; for (const p of ps) md += `- **${p.onde}**: ${p.msg}\n`; }
  if (!problemas.length) md += "\nNenhum problema encontrado.\n";
  if (INFO.length) md += "\n## medições do jogo\n\n" + INFO.map(i => "- " + i).join("\n") + "\n";
  fs.writeFileSync(path.join(__dirname, "relatorio.md"), md); console.log("\n" + md);
  process.exit(problemas.length ? 1 : 0);
})();
