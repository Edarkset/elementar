// GERADO por "npm run compilar" a partir de src/jogo/08h_interface.ts. Edite o .ts, não este arquivo.
// Elementar · arte da interface: tela inicial, logotipo, ícones de Talismã e de Insígnia
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./08g_luz.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { $ } from "./01_nucleo.js";
import { cacheArte } from "./05_arte.js";
import { celulaArte, folhaArte } from "./07c_cenario_arte.js";
// ================================================================ arte da interface (pacote prompts/ui): tela inicial, logotipo, ícones de Talismã e Insígnias
export const UI_ARQ = n => folhaArte(`arte/ui/${n}.png`);
// botões desenhados (folhas 1x3: normal, apertado, desativado): cortados em ponta esquerda, faixa, ornamento do meio e ponta direita,
// para esticar na largura do botão sem deformar os enfeites
export function recortarBotao(img, row) {
  const cw = img.width,
    ch = img.height / 3,
    c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const g = c.getContext("2d");
  g.drawImage(img, 0, row * ch, cw, ch, 0, 0, cw, ch);
  let y0 = ch,
    y1 = 0;
  try {
    const d = g.getImageData(0, 0, cw, ch).data;
    for (let y = 0; y < ch; y++)
      for (let x = 0; x < cw; x++)
        if (d[(y * cw + x) * 4 + 3] > 40) {
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
  } catch (e) {
    y0 = 0;
    y1 = ch - 1;
  }
  const h = y1 - y0 + 1,
    k = cw / 128,
    corte = (x0, x1) => {
      const o = document.createElement("canvas");
      o.width = Math.round((x1 - x0) * k);
      o.height = h;
      o.getContext("2d").drawImage(c, Math.round(x0 * k), y0, o.width, h, 0, 0, o.width, h);
      return `url(${o.toDataURL()})`;
    };
  return { esq: corte(0, 38), meio: corte(38, 46), cen: corte(44, 84), dir: corte(90, 128) };
}
export function aplicarArteBotoes() {
  if (document.documentElement.classList.contains("ui-arte")) return;
  const P = UI_ARQ("ui__botao_primario"),
    Sx = UI_ARQ("ui__botao_secundario"),
    A = UI_ARQ("ui__botoes_acao");
  if (!P || !Sx) return;
  const st = document.documentElement.style,
    def = (pref, img) =>
      [0, 1, 2].forEach(r => {
        const b = recortarBotao(img, r);
        for (const k in b) st.setProperty(`--${pref}${r}-${k}`, b[k]);
      });
  def("bp", P);
  def("bs", Sx);
  if (A) {
    const cw = A.width / 3,
      ch = A.height / 2;
    for (let r = 0; r < 2; r++)
      for (let i = 0; i < 3; i++) {
        const o = document.createElement("canvas");
        o.width = cw;
        o.height = ch;
        o.getContext("2d").drawImage(A, i * cw, r * ch, cw, ch, 0, 0, cw, ch);
        st.setProperty(`--acao${i}-${r}`, `url(${o.toDataURL()})`);
      }
    document.documentElement.classList.add("ui-acao");
  }
  document.documentElement.classList.add("ui-arte");
}
// menu em camadas (céu, criaturas e o herói na frente): cada uma se move num ritmo e acompanha o dedo, o mouse ou a inclinação do aparelho
export function montarParalaxe(m) {
  const ceu = UI_ARQ("ui__camada_ceu"),
    cri = UI_ARQ("ui__camada_criaturas"),
    fr = UI_ARQ("ui__camada_frente");
  if (!ceu || !cri || !fr || m.querySelector(".paralaxe")) return false;
  const d = document.createElement("div");
  d.className = "paralaxe";
  d.innerHTML = `<div class="cam ceu" style="background-image:url(${ceu.src})"></div><div class="cam cri" style="background-image:url(${cri.src})"></div><div class="cam brilho"></div><div class="cam fr" style="background-image:url(${fr.src})"></div>`;
  m.prepend(d);
  m.style.backgroundImage = "none";
  m.classList.add("com-arte");
  const mover = (x, y) => {
    d.style.setProperty("--px", Math.max(-1, Math.min(1, x)).toFixed(3));
    d.style.setProperty("--py", Math.max(-1, Math.min(1, y)).toFixed(3));
  };
  addEventListener(
    "pointermove",
    e => {
      if (m.classList.contains("ativa")) mover((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    },
    { passive: true }
  );
  addEventListener(
    "deviceorientation",
    e => {
      if (m.classList.contains("ativa") && e.gamma != null) mover(e.gamma / 25, (e.beta - 45) / 25);
    },
    { passive: true }
  );
  return true;
}
export function aplicarArteUI() {
  aplicarArteBotoes();
  const tela = UI_ARQ("ui__tela_vertical") || UI_ARQ("ui__tela_horizontal"),
    logo = UI_ARQ("ui__logo"),
    m = $("telaMenu");
  if (!m) return;
  if (m.dataset.arte !== "paralaxe" && montarParalaxe(m)) {
    m.dataset.arte = "paralaxe";
  }
  if (tela && !m.dataset.arte) {
    m.dataset.arte = "1";
    m.style.backgroundImage = `linear-gradient(180deg, rgba(10,8,18,.25) 0%, rgba(10,8,18,0) 30%, rgba(10,8,18,.55) 62%, rgba(10,8,18,.92) 100%), url(${tela.src})`;
    m.style.backgroundSize = "cover";
    m.style.backgroundPosition = "center top";
    m.classList.add("com-arte");
  }
  if (logo) {
    const h = m.querySelector("h1");
    if (h && !h.dataset.arte) {
      h.dataset.arte = "1";
      h.innerHTML = `<img src="${logo.src}" alt="Elementar" style="width:min(100%,420px);display:block;margin:0 auto;filter:drop-shadow(0 4px 10px rgba(0,0,0,.6))">`;
    }
  }
}
// ícone de um Talismã (folha 4x3, na ordem de dados/fonte_poderes.py)
export function iconeTalisma(id) {
  const img = folhaArte("arte/ui/talismas.png");
  if (!img) return null;
  const i = Object.keys(D.poderes.talismas).indexOf(id);
  if (i < 0) return null;
  return celulaArte(img, 4, 3, i % 4, Math.floor(i / 4), 64, 64);
}
// Insígnia: moldura do nível (linha 1) com o emblema do tipo de conquista (linha 2); conquistas globais usam a estrela
export const EMBLEMA = { chefe: 0, desafio: 1, cenario: 2, mestria: 3, secreta: 4, chamado: 5 };
export function insigniaSprite(c, ok) {
  const img = folhaArte("arte/ui/insignias.png");
  if (!img) return null;
  const k = `ins|${c.id}|${ok}`;
  if (cacheArte.has(k)) return cacheArte.get(k);
  const cv = document.createElement("canvas");
  cv.width = cv.height = 64;
  const g = cv.getContext("2d");
  g.imageSmoothingEnabled = true;
  const quadro = { bronze: 0, prata: 1, ouro: 2, secreta: 3 }[c.insignia] ?? 0,
    tipo = c.categoria === "mapa" ? c.id.split(":")[1] : null;
  g.drawImage(celulaArte(img, 6, 2, quadro, 0, 64, 64), 0, 0);
  const em = tipo != null && EMBLEMA[tipo] != null ? celulaArte(img, 6, 2, EMBLEMA[tipo], 1, 64, 64) : celulaArte(img, 6, 2, 5, 0, 64, 64);
  g.drawImage(em, 14, 14, 36, 36);
  if (!ok) {
    g.globalCompositeOperation = "saturation";
    g.fillStyle = "#808080";
    g.fillRect(0, 0, 64, 64);
    g.globalCompositeOperation = "source-over";
    g.globalAlpha = 0.55;
    g.fillStyle = "#120e1a";
    g.fillRect(0, 0, 64, 64);
  }
  cacheArte.set(k, cv);
  return cv;
}
