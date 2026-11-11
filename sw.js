// Service worker do Elementar: deixa o jogo abrir offline e instalável.
// - Código (html, js, css): rede primeiro, cópia guardada se estiver offline.
//   Assim toda mudança aparece na hora quando há internet.
// - Artes, ícones e fontes: usa a cópia guardada e atualiza em segundo plano;
//   uma arte trocada aparece na próxima vez que o jogo abrir.
// - arte/manifesto.json: sempre rede primeiro (é ele que diz quais artes existem).
// Suba VERSAO sempre que trocar artes: as artes ficam guardadas no aparelho e só a versão nova do cache as apaga.
// v2: artes refeitas (ambiente, Fênix, enfeites de chão, dragão Árvore).
const VERSAO = "v2";
// o código tem a própria versão: subir esta não apaga as artes guardadas (v3: lógica dividida em js/jogo/; v4: partes viram módulos, entrada em js/jogo/principal.js)
const CODIGO = "elementar-codigo-v4";
const ARTES = `elementar-artes-${VERSAO}`;
const BASICO = ["./", "index.html", "css/estilo.css", "js/dados.js", "js/jogo/01_nucleo.js", "js/jogo/02_combate.js", "js/jogo/03_progressao.js", "js/jogo/04_ambiente.js", "js/jogo/05_arte.js", "js/jogo/06_loop.js", "js/jogo/07_cenario.js", "js/jogo/07b_cenario_desenho.js", "js/jogo/07c_cenario_arte.js", "js/jogo/07d_estrutura.js", "js/jogo/08_horda.js", "js/jogo/08b_efeitos.js", "js/jogo/08c_eventos.js", "js/jogo/08d_poderes.js", "js/jogo/08e_conquistas.js", "js/jogo/08f_lendas.js", "js/jogo/08g_luz.js", "js/jogo/08h_interface.js", "js/jogo/09_criaturas.js", "js/jogo/09b_chefes.js", "js/jogo/10_desenho.js", "js/jogo/11_menu.js", "js/jogo/principal.js", "js/plataforma.js", "js/app.js",
  "manifest.webmanifest", "app/icones/icone-192.png", "app/icones/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CODIGO).then(c => c.addAll(BASICO)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("elementar-") && k !== CODIGO && k !== ARTES).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function redePrimeiro(req, nome) {
  const cache = await caches.open(nome);
  try {
    const r = await fetch(req, { cache: "no-cache" });
    if (r.ok) cache.put(req, r.clone());
    return r;
  } catch (e) {
    return (await cache.match(req, { ignoreSearch: true })) || Response.error();
  }
}

async function guardadoPrimeiro(req, nome, ev) {
  const cache = await caches.open(nome);
  const guardado = await cache.match(req);
  const busca = fetch(req).then(r => { if (r.ok || r.type === "opaque") cache.put(req, r.clone()); return r; }).catch(() => null);
  if (guardado) { ev.waitUntil(busca); return guardado; }
  return (await busca) || Response.error();
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const fonte = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !fonte) return;
  const caminho = url.pathname;
  if (caminho.endsWith("/arte/manifesto.json")) return e.respondWith(redePrimeiro(req, ARTES));
  if (fonte || caminho.includes("/arte/") || caminho.includes("/app/icones/")) return e.respondWith(guardadoPrimeiro(req, ARTES, e));
  e.respondWith(redePrimeiro(req, CODIGO));
});
