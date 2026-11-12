// GERADO por "npm run compilar" a partir de src/jogo/10_desenho.ts. Edite o .ts, não este arquivo.
// Elementar · desenho de cada quadro, herói e HUD
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./09b_chefes.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import {
  $,
  ativos,
  branco,
  COR,
  ctx,
  cv,
  elementoDe,
  est,
  H,
  hexRgb,
  J,
  lg,
  LINHA,
  lo,
  MAPA_SEG,
  nomeForma,
  pausado,
  Q,
  R,
  rnd,
  S,
  semente,
  SIM,
  spriteLinha,
  spriteOvo,
  spriteSelo,
  tom,
  VH,
  VW,
  W
} from "./01_nucleo.js";
import { itemUsavelAgora, particulas, sombraContato } from "./02_combate.js";
import { abrirEquipe, desenharMoedasBaus, setaFora, tipoCombinado } from "./03_progressao.js";
import { desenharSolo } from "./04_ambiente.js";
import { artesQue, MANIFESTO, movSelo, preCarregar, quadroAnimSelo } from "./05_arte.js";
import { QUAL, toque } from "./06_loop.js";
import { bolhaCor } from "./07_cenario.js";
import {
  desenharCenaAr,
  desenharCenaBrilho,
  desenharCenaChao,
  desenharCenaLuz,
  desenharCenaObjetos,
  desenharDetalhesChao,
  desenharNuvens,
  silhueta
} from "./07b_cenario_desenho.js";
import { ALVO_ARTE, chaoArte, desenharCamadaArte, desenharSprite, spriteUI } from "./07c_cenario_arte.js";
import { desenharAbertura, desenharEstrutura, desenharFauna, desenharQuedasAbismo } from "./07d_estrutura.js";
import { desenharAvisos } from "./08_horda.js";
import {
  desenharArmadilha,
  desenharCria,
  desenharEspirito,
  desenharParticula,
  desenharProjetil,
  desenharVfx,
  desenharZona
} from "./08b_efeitos.js";
import { desenharAltar } from "./08c_eventos.js";
import { desenharConquista } from "./08e_conquistas.js";
import { contornoHeroi, desenharLenda, LENDA, luzPesHeroi } from "./08f_lendas.js";
import { desenharLuzAmbiente, desenharMapaLuz, luzFlash, nivelEscuro, sombraProjetada } from "./08g_luz.js";
import { desenharCadaveres, desenharFalas, desenharInimigo } from "./09_criaturas.js";
import {
  desenharBala,
  desenharBarraChefe,
  desenharBrilhoInimigos,
  desenharEscuridao,
  desenharGolpesLuz,
  desenharPerigos,
  desenharQuedas
} from "./09b_chefes.js";
// ================================================================ desenho
export let chao = null;
export function gerarChao(u) {
  if (chaoArte(u)) return;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d"),
    r = semente(u.id),
    base = COR[u.elemento];
  g.fillStyle = tom(base, 0.26);
  g.fillRect(0, 0, 64, 64);
  for (let i = 0; i < 260; i++) {
    g.fillStyle = r() < 0.5 ? tom(base, 0.33) : tom(base, 0.2);
    g.fillRect(Math.floor(r() * 64), Math.floor(r() * 64), 1 + Math.floor(r() * 2), 1);
  }
  for (let i = 0; i < 5; i++) {
    g.fillStyle = tom(base, 0.45);
    const x = Math.floor(r() * 60),
      y = Math.floor(r() * 60);
    g.fillRect(x, y, 3, 2);
    g.fillStyle = tom(base, 0.15);
    g.fillRect(x, y + 2, 3, 1);
  }
  chao = { cv: c, u };
}
/** valor mínimo do cristal e a cor dele */
export const CORES_GEMA = [
  [0, "#6ab0ff"],
  [3, "#5fe08a"],
  [8, "#c07cff"],
  [20, "#ffd34a"]
];
export function corGema(v) {
  let c = CORES_GEMA[0][1];
  for (const [m, k] of CORES_GEMA) if (v >= m) c = k;
  return c;
}
export function desenharColunaNivel(ox, oy) {
  const c = J.colunaNivel;
  if (!c) return;
  c.t += 1 / 60;
  if (c.t > 0.9) {
    J.colunaNivel = null;
    return;
  }
  const P = J.jogador,
    x = P.x - ox,
    y = P.y - oy,
    a = Math.sin((c.t / 0.9) * Math.PI),
    w = 10 + c.t * 16;
  lg.globalCompositeOperation = "lighter";
  const g = lg.createLinearGradient(0, y - 160, 0, y);
  g.addColorStop(0, "rgba(255,230,140,0)");
  g.addColorStop(1, `rgba(255,230,140,${0.55 * a})`);
  lg.fillStyle = g;
  lg.fillRect(x - w / 2, y - 160, w, 160);
  lg.globalAlpha = 0.4 * a;
  lg.drawImage(bolhaCor("#ffe080"), x - 30, y - 30, 60, 60);
  lg.globalAlpha = 1;
  lg.globalCompositeOperation = "source-over";
}
// multidão: com mais de 110 inimigos vivos, cada inimigo comum é desenhado com uma imagem só (sem o quadro intermediário do passo e sem
// o véu escuro de 16%, que ninguém distingue no meio da horda). Corta até dois terços das cópias de imagem nos momentos mais pesados
export let MULTIDAO = false;
export function desenhar(dt) {
  MULTIDAO = J.inimigos.length > 110;
  const P = J.jogador;
  J.shake *= 0.86;
  const tq = performance.now() / 1000,
    sx = J.shake * (Math.sin(tq * 53) * 0.35 + Math.sin(tq * 29 + 1.3) * 0.25),
    sy = J.shake * (Math.sin(tq * 47 + 0.7) * 0.35 + Math.sin(tq * 23 + 2.1) * 0.25);
  // câmera com precisão menor que 1 pixel do mundo: as posições continuam inteiras (ox, oy), e a sobra desloca a tela inteira.
  // Assim a rolagem é contínua em vez de andar em saltos de um pixel do mundo (3 a 4 pixels da tela).
  // câmera suave: segue o herói com um leve atraso e se adianta um pouco para onde ele anda (vê mais do que vem pela frente)
  {
    const k = 1 - Math.exp(-(dt || 1 / 60) * 7),
      lx = P.x + (J.pvx || 0) * 0.16,
      ly = P.y + (J.pvy || 0) * 0.16;
    if (J.camX == null || Math.abs(J.camX - P.x) > VW) {
      J.camX = P.x;
      J.camY = P.y;
    }
    J.camX += (lx - J.camX) * k;
    J.camY += (ly - J.camY) * k;
  }
  const cx0 = J.camX - VW / 2 + sx,
    cy0 = J.camY - VH / 2 + sy,
    ox = Math.round(cx0),
    oy = Math.round(cy0);
  if (Q > 1 && !SIM.ativo) lg.setTransform(Q, 0, 0, Q, (ox - cx0) * Q, (oy - cy0) * Q);
  else lg.setTransform(Q, 0, 0, Q, 0, 0);
  lg.imageSmoothingEnabled = !!chao.suave;
  lg.imageSmoothingQuality = "high";
  // piso como padrão repetido: a amostragem dá a volta na borda, então não sobra linha de emenda entre um bloco e outro
  const TC = chao.tam || chao.cv.width,
    px = ((ox % TC) + TC) % TC,
    py = ((oy % TC) + TC) % TC,
    kc = TC / chao.cv.width;
  if (!chao.pat || chao.patCv !== chao.cv) {
    chao.pat = lg.createPattern(chao.cv, "repeat");
    chao.patCv = chao.cv;
  }
  lg.save();
  lg.translate(-px, -py);
  lg.scale(kc, kc);
  lg.fillStyle = chao.pat;
  lg.fillRect(0, 0, (VW + TC) / kc, (VH + TC) / kc);
  lg.restore();
  lg.imageSmoothingEnabled = false;
  desenharDetalhesChao(ox, oy);
  desenharEstrutura(ox, oy);
  desenharSolo(ox, oy);
  desenharFauna(ox, oy, "agua");
  desenharCenaChao(ox, oy);
  desenharFauna(ox, oy, "chao");
  desenharPerigos(ox, oy);
  desenharVfx(ox, oy, "chao");
  desenharCadaveres(ox, oy);
  desenharQuedasAbismo(ox, oy);
  const sombra = (x, y, w) => sombraContato(x, y + 0.5, w * 1.2, 0.55);
  // zonas no chão
  for (const z of J.zonas) if (z.tipo !== "espirito") desenharZona(z, ox, oy);
  for (const a of J.armadilhas) desenharArmadilha(a, ox, oy);
  // ovos e filhotes
  for (const o of J.ovosMapa) {
    const s = spriteOvo(LINHA[o.id].elemento, o.rar),
      b = Math.round(Math.sin(J.t * 5 + o.x) * 1.5);
    sombra(o.x - ox, o.y - oy + 6, 8);
    if (o.rar !== "comum") {
      const lend = o.rar === "lendario",
        cor = lend ? "#ffd34a" : "#8ab8ff",
        alt = lend ? 130 : 75,
        pul = 0.5 + 0.5 * Math.sin(J.t * 4 + o.x),
        X = o.x - ox,
        Y = o.y - oy;
      lg.globalCompositeOperation = "lighter";
      const gr = lg.createLinearGradient(0, Y - alt, 0, Y);
      gr.addColorStop(0, "rgba(255,255,255,0)");
      gr.addColorStop(1, lend ? `rgba(255,211,74,${0.38 + 0.2 * pul})` : `rgba(138,184,255,${0.3 + 0.15 * pul})`);
      lg.fillStyle = gr;
      lg.fillRect(X - (lend ? 5 : 3.5), Y - alt, lend ? 10 : 7, alt); // coluna de luz
      lg.globalAlpha = 0.3 + 0.2 * pul;
      lg.drawImage(bolhaCor(cor), X - (lend ? 18 : 13), Y - (lend ? 18 : 13), lend ? 36 : 26, lend ? 36 : 26);
      lg.globalAlpha = 1;
      if (Math.floor(J.t * 8 + o.x) % 5 === 0) {
        lg.fillStyle = "#ffffff";
        lg.fillRect(Math.round(X + rnd(-7, 7)), Math.round(Y - rnd(4, alt * 0.6)), 1, 1);
      } // faíscas subindo
      lg.globalCompositeOperation = "source-over";
      if (lend) setaFora(X, Y, cor);
    }
    lg.drawImage(s, o.x - ox - 5, o.y - oy - 6 + b, 10, 12);
  }
  if (J.ovoAnc) {
    const o = J.ovoAnc,
      x = o.x - ox,
      y = o.y - oy,
      sp = spriteOvo(o.el, "lendario"),
      pul = 0.5 + 0.5 * Math.sin(J.t * 4);
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = 0.2 + 0.2 * pul;
    lg.fillStyle = COR[o.el];
    lg.fillRect(Math.round(x - 3), Math.round(y - 70), 6, 70);
    lg.beginPath();
    lg.arc(x, y, 14 + 3 * pul, 0, Math.PI * 2);
    lg.fill();
    lg.globalAlpha = 1;
    lg.globalCompositeOperation = "source-over";
    sombra(x, y + 9, 11);
    lg.drawImage(sp, x - 10, y - 18, 20, 24);
    if (x < 6 || y < 6 || x > VW - 6 || y > VH - 6) {
      const cx = VW / 2,
        cy = VH / 2,
        ang = Math.atan2(y - cy, x - cx),
        m = Math.min((VW / 2 - 10) / Math.abs(Math.cos(ang) || 1e-6), (VH / 2 - 10) / Math.abs(Math.sin(ang) || 1e-6));
      const ax = cx + Math.cos(ang) * m,
        ay = cy + Math.sin(ang) * m;
      lg.fillStyle = COR[o.el];
      lg.beginPath();
      lg.moveTo(ax + Math.cos(ang) * 6, ay + Math.sin(ang) * 6);
      lg.lineTo(ax + Math.cos(ang + 2.5) * 5, ay + Math.sin(ang + 2.5) * 5);
      lg.lineTo(ax + Math.cos(ang - 2.5) * 5, ay + Math.sin(ang - 2.5) * 5);
      lg.fill();
    }
  }
  for (const f of J.selvagens) {
    if (f.selando) continue;
    const s = spriteLinha(f.id, f.rar);
    sombra(f.x - ox, f.y - oy + 5, 8);
    lg.drawImage(
      s,
      Math.round(f.x - ox - s.width / 2),
      Math.round(f.y - oy - s.height / 2) + Math.round(Math.abs(Math.sin(J.t * 10)) * -2)
    );
    lg.fillStyle = "#fff3c4";
    if (Math.floor(J.t * 4) % 2) lg.fillRect(Math.round(f.x - ox), Math.round(f.y - oy - s.height / 2) - 4, 1, 2);
  }
  desenharMoedasBaus(ox, oy);
  // gemas de XP: cristal pequeno (losango) com face clara e brilho piscando
  // cristais com a cor do valor (azul, verde, roxo, dourado, como em Vampire Survivors) e um brilho aditivo que pulsa
  lg.globalCompositeOperation = "lighter";
  for (const g of J.gemas) {
    const x = g.x - ox,
      y = g.y - oy;
    if (x < -6 || y < -6 || x > VW + 6 || y > VH + 6) continue;
    const c = corGema(g.v);
    lg.globalAlpha = 0.35 + 0.15 * Math.sin(J.t * 6 + g.x);
    lg.drawImage(bolhaCor(c), x - 5, y - 5, 10, 10);
    if (g.voa) {
      lg.globalAlpha = 0.5;
      lg.strokeStyle = c;
      lg.lineWidth = 1;
      lg.beginPath();
      lg.moveTo(x, y);
      lg.lineTo(x - (J.jogador.x - g.x) * 0.12, y - (J.jogador.y - g.y) * 0.12);
      lg.stroke();
    }
  } // rastro ao voar
  lg.globalAlpha = 1;
  lg.globalCompositeOperation = "source-over";
  for (const g of J.gemas) {
    const x = g.x - ox,
      y = g.y - oy + Math.sin(J.t * 4 + g.x) * 0.4;
    if (x < -4 || y < -4 || x > VW + 4 || y > VH + 4) continue;
    const t = g.v > 10 ? 2.4 : g.v > 4 ? 2 : 1.5;
    g.cor = corGema(g.v);
    lg.fillStyle = tom(g.cor, 0.6);
    lg.beginPath();
    lg.moveTo(x, y - t * 1.3);
    lg.lineTo(x + t, y);
    lg.lineTo(x, y + t * 1.3);
    lg.lineTo(x - t, y);
    lg.closePath();
    lg.fill();
    lg.fillStyle = g.cor;
    lg.beginPath();
    lg.moveTo(x, y - t * 1.3);
    lg.lineTo(x + t * 0.75, y - t * 0.1);
    lg.lineTo(x, y + t * 0.9);
    lg.lineTo(x - t * 0.75, y - t * 0.1);
    lg.closePath();
    lg.fill();
    lg.fillStyle = "#ffffff";
    lg.globalAlpha = 0.85;
    lg.beginPath();
    lg.moveTo(x, y - t * 1.2);
    lg.lineTo(x + t * 0.35, y - t * 0.35);
    lg.lineTo(x, y - t * 0.1);
    lg.lineTo(x - t * 0.4, y - t * 0.4);
    lg.closePath();
    lg.fill();
    lg.globalAlpha = 1;
  }
  // totens entram na fila de profundidade junto com o resto (abaixo)
  // profundidade (2,5D): marcos, objetos, inimigos, equipe, Invocador e Lenda desenhados do fundo para a frente pelo pé
  desenharAltar(ox, oy);
  const fila = [];
  desenharCenaObjetos(ox, oy, fila);
  for (const e of J.inimigos) fila.push({ y: e.y + (e.tam || 8) * 0.63 - (e.z || 0) * 0, f: () => desenharInimigo(e, ox, oy, P) });
  for (const c of J.crias) fila.push({ y: c.y + 2, f: () => desenharCria(c, ox, oy) }); // servos entram na ordem de profundidade (antes ficavam embaixo de tudo)
  for (const f of J.fantasmas) {
    lg.globalAlpha = f.vida * 3;
    lg.drawImage(f.spr, Math.round(f.x - ox - f.spr.width / 2), Math.round(f.y - oy - f.spr.height / 2));
  }
  lg.globalAlpha = 1;
  // o herói do centro é a Lenda (ou o deus) escolhida no começo da run; sem Lenda, o Invocador básico
  fila.push({
    y: P.y + 6,
    f: () => {
      sombra(P.x - ox, P.y - oy + 6, 13);
      if (J.invuln > 0) lg.globalAlpha = Math.floor(J.t * 14) % 2 ? 0.6 : 1;
      if (!(LENDA() && desenharLenda(ox, oy))) desenharInvocador(P.x - ox, P.y - oy);
      lg.globalAlpha = 1;
    }
  });
  R.selos.forEach(s => {
    if (s.mon) fila.push({ y: s.y + ALVO_ARTE[est(s)] / 2, f: () => desenharSelo(s, ox, oy, sombra) });
  });
  for (const t of J.totens) fila.push({ y: t.y + 1, f: () => desenharTotem(t, ox, oy) });
  fila.sort((a, b) => a.y - b.y);
  for (const it of fila) {
    lg.globalAlpha = 1;
    it.f();
  }
  lg.globalAlpha = 1;
  desenharVfx(ox, oy, "frente");
  desenharColunaNivel(ox, oy);
  desenharFauna(ox, oy, "ar");
  desenharQuedas(ox, oy);
  desenharCenaAr(ox, oy);
  desenharFauna(ox, oy, "ceu");
  J._nuvemFeita = false;
  desenharMapaLuz(ox, oy);
  desenharNuvens(ox, oy);
  desenharLuzAmbiente(ox, oy);
  desenharEscuridao(ox, oy);
  desenharBrilhoInimigos();
  // luzes aditivas
  lg.globalCompositeOperation = "lighter";
  for (const p of J.proj) desenharProjetil(p, ox, oy);
  for (const z of J.zonas) if (z.tipo === "espirito") desenharEspirito(z, ox, oy);
  for (const b of J.balas) desenharBala(b, ox, oy);
  for (const p of J.parts) desenharParticula(p, ox, oy);
  // anéis e raios com halo: traço largo e fraco por baixo, fino e forte por cima
  lg.lineCap = "round";
  lg.lineJoin = "round";
  const kEf = J.efeitos.length > 16 ? 16 / J.efeitos.length : 1; // muitos anéis juntos: cada um mais fraco (somados viravam um clarão branco)
  for (const f of J.efeitos) {
    const a = (f.vida / f.max) * kEf;
    lg.strokeStyle = f.cor;
    lg.fillStyle = f.cor;
    if (f.linha) {
      const n = 6,
        pts = [[f.x - ox, f.y - oy]];
      for (let i = 1; i < n; i++) {
        const t = i / n;
        pts.push([f.x + (f.x2 - f.x) * t - ox + rnd(-3.5, 3.5), f.y + (f.y2 - f.y) * t - oy + rnd(-3.5, 3.5)]);
      }
      pts.push([f.x2 - ox, f.y2 - oy]);
      for (const [lw, al, cor] of [
        [3.5, 0.25, f.cor],
        [1.3, 0.9, f.cor],
        [0.5, 1, "#ffffff"]
      ]) {
        lg.globalAlpha = a * al;
        lg.strokeStyle = cor;
        lg.lineWidth = lw;
        lg.beginPath();
        lg.moveTo(pts[0][0], pts[0][1]);
        for (const q of pts) lg.lineTo(q[0], q[1]);
        lg.stroke();
      }
    } else {
      const q = 1 - f.vida / f.max,
        r = f.r * (0.55 + 0.6 * (1 - Math.pow(1 - q, 3)));
      /* abre rápido e desacelera */ lg.globalAlpha = a * 0.06;
      lg.beginPath();
      lg.arc(f.x - ox, f.y - oy, r, 0, Math.PI * 2);
      lg.fill();
      lg.globalAlpha = a * 0.2;
      lg.lineWidth = 2.6;
      lg.stroke();
      lg.globalAlpha = a * 0.7;
      lg.lineWidth = 0.8;
      lg.stroke();
    }
  }
  lg.lineWidth = 1;
  lg.lineCap = "butt";
  lg.lineJoin = "miter";
  desenharCenaLuz(ox, oy);
  desenharGolpesLuz(ox, oy);
  desenharVfx(ox, oy, "luz");
  lg.globalAlpha = 1;
  lg.globalCompositeOperation = "source-over";
  // tela
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(lo, 0, 0, VW * S, VH * S);
  desenharCamadaArte();
  desenharCenaBrilho(ox, oy);
  aplicarBloom();
  // luz quente em volta do jogador + vinheta das bordas: uma imagem pequena pronta, desenhada esticada (uma passada em vez de duas)
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(
    sobreposicao(J.desp > 0 ? COR[elementoDe(ativos()[0])] : "#ffd68c", J.desp > 0 ? 0.24 : 0.16, J.vida / J.vidaMax < 0.3 ? 0.8 : 0.62),
    (P.x - ox - VW / 2) * S - 10,
    (P.y - oy - VH / 2) * S - 10,
    W + 20,
    H + 20
  );
  ctx.imageSmoothingEnabled = false;
  if (J.vida / J.vidaMax < 0.3) {
    ctx.globalAlpha = 0.12 + 0.08 * Math.sin(J.t * 8);
    ctx.fillStyle = "#c8473b";
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
  if (J.flash) {
    J.flash.vida -= dt || 1 / 60;
    ctx.globalAlpha = Math.max(0, J.flash.vida) * 0.4;
    ctx.fillStyle = J.flash.cor;
    /* clarão de tela mais leve: não ofusca */ ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    if (J.flash.vida <= 0) J.flash = null;
  }
  ctx.textAlign = "center";
  // números: valores grandes abreviados ("5,3k"); com a tela cheia, só críticos e super efetivos aparecem
  const cheio = J.nums.length > 8;
  // números: nascem com um pulo elástico, contorno escuro (lê em qualquer chão), crítico dourado com brilho; somem encolhendo
  ctx.lineJoin = "round";
  ctx.textBaseline = "middle";
  for (const n of J.nums) {
    if (cheio && n.tam <= 13) continue;
    const idade = (n.max || 0.8) - n.vida,
      v = n.v >= 1000 ? (n.v / 1000).toFixed(n.v >= 10000 ? 0 : 1).replace(".", ",") + "k" : String(n.v);
    const pulo = idade < 0.18 ? 1 + Math.sin((idade / 0.18) * Math.PI) * 0.55 * (1 - idade / 0.18) + 0.25 * (1 - idade / 0.18) : 1,
      some = n.vida < 0.22 ? 0.6 + (n.vida / 0.22) * 0.4 : 1,
      esc = pulo * some * (1 + (n.pop || 0) * 0.3);
    const crit = n.tam >= 20,
      X = (n.x - ox) * S,
      Y = (n.y - oy) * S,
      fs = Math.round(n.tam * 0.78 * esc * (crit ? 1.1 : 1)); /* números menores: menos poluição */
    ctx.globalAlpha = Math.min(1, n.vida * 3);
    ctx.font = `900 ${fs}px "Nunito", system-ui, sans-serif`;
    ctx.lineWidth = Math.max(2.5, fs * 0.2);
    ctx.strokeStyle = "rgba(18,14,26,.92)";
    ctx.strokeText(v, X, Y);
    if (crit) {
      const gr = ctx.createLinearGradient(0, Y - fs / 2, 0, Y + fs / 2);
      gr.addColorStop(0, "#fffbe0");
      gr.addColorStop(0.5, "#ffe066");
      gr.addColorStop(1, "#ff9a3d");
      ctx.fillStyle = gr;
      ctx.shadowColor = "rgba(255,190,60,.85)";
      ctx.shadowBlur = fs * 0.5;
    } else ctx.fillStyle = n.cor;
    ctx.fillText(v, X, Y);
    ctx.shadowBlur = 0;
  }
  ctx.textBaseline = "alphabetic";
  for (const t of J.textos) {
    ctx.globalAlpha = Math.min(1, t.vida * 2);
    const k = t.vida > 0.95 ? 1 + (t.vida - 0.95) * 4 : 1;
    ctx.font = `600 ${Math.round(t.tam * k)}px "Nunito", system-ui, sans-serif`;
    ctx.lineWidth = Math.max(2.5, t.tam * 0.2);
    ctx.strokeStyle = "rgba(18,14,26,.92)";
    ctx.strokeText(t.t, (t.x - ox) * S, (t.y - oy) * S);
    ctx.fillStyle = t.cor;
    ctx.fillText(t.t, (t.x - ox) * S, (t.y - oy) * S);
  }
  ctx.globalAlpha = 1;
  desenharFalas(ox, oy);
  desenharBarraChefe();
  desenharAvisos();
  desenharConquista();
  desenharAbertura();
  if (toque) {
    ctx.strokeStyle = "rgba(242,231,201,.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(toque.ox, toque.oy, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(242,231,201,.35)";
    const dx = toque.x - toque.ox,
      dy = toque.y - toque.oy,
      d = Math.min(40, Math.hypot(dx, dy)),
      a = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.arc(toque.ox + Math.cos(a) * d, toque.oy + Math.sin(a) * d, 14, 0, Math.PI * 2);
    ctx.fill();
  }
}
// monstro da equipe: quadro da folha (ou imagem fixa) + "corpo" por código: antecipação e esticada no ataque,
// investida na direção do alvo, inclinação ao andar, virada suave, pulinho/respiração sem folha e pulo de tamanho ao evoluir
export function desenharSelo(s, ox, oy, sombra) {
  movSelo(s);
  const anim = quadroAnimSelo(s),
    spr = anim || spriteSelo(s),
    x = s.x - ox,
    y = s.y - oy,
    alvo = spr._alvo || spr.width,
    pe = y + alvo / 2,
    t = J.t;
  const dt = Math.min(0.1, Math.max(0, t - (s._td ?? t)));
  s._td = t;
  const vel = s._vel || 0,
    anda = Math.min(1, vel / 40),
    e = est(s);
  if (s._eAnt != null && s._eAnt !== e && s._eMon === s.mon) {
    s._pop = 1;
    luzFlash(s.x, s.y, COR[elementoDe(s)], 60, 0.5);
    particulas(s.x, s.y, COR[elementoDe(s)], 14, 60);
  }
  s._eAnt = e;
  s._eMon = s.mon;
  s._pop = Math.max(0, (s._pop || 0) - dt * 1.8);
  const fxAlvo = s.esq ? -1 : 1;
  if (s._fx != null && s._fx !== fxAlvo) s._vira = 1;
  s._fx = fxAlvo;
  s._vira = Math.max(0, (s._vira || 0) - dt * 7);
  let sx = 1,
    sy = 1,
    lunge = 0,
    rot = 0,
    hop = 0;
  const ta = s.atkT != null && t >= s.atkT ? t - s.atkT : 9;
  if (ta < 0.06) {
    const k = ta / 0.06;
    sy = 1 - 0.13 * k;
    sx = 1 + 0.09 * k;
  } // antecipação: agacha
  else if (ta < 0.42) {
    const k = (ta - 0.06) / 0.36,
      o = Math.sin(k * Math.PI * 2) * (1 - k);
    sy = 1 + 0.15 * o - 0.13 * (1 - Math.min(1, k * 5));
    sx = 1 - 0.1 * o;
    lunge = Math.sin(Math.min(1, k * 1.6) * Math.PI) * 2.4;
  } // estica e volta com mola
  rot = Math.max(-0.12, Math.min(0.12, (s._vx || 0) / 260)); // inclina para onde anda
  if (!anim) {
    if (anda > 0.1) {
      const f = Math.abs(Math.sin(t * 12 + s.x * 0.01));
      hop = f * 1.8 * anda;
      sy *= 1 - 0.07 * (1 - f) * anda;
      sx *= 1 + 0.05 * (1 - f) * anda;
    } else {
      const b = Math.sin(t * 2.6 + s.x * 0.1);
      sy *= 1 + 0.03 * b;
      sx *= 1 - 0.018 * b;
    }
  } else if (anda < 0.1) {
    const b = Math.sin(t * 2.2 + s.x * 0.1);
    sy *= 1 + 0.02 * b;
    sx *= 1 - 0.01 * b; // respira
    // de vez em quando um gesto: pulinho de alegria ou uma olhada para o outro lado
    const ciclo = (t + (s.x % 13)) % 7;
    if (ciclo < 0.35) {
      const k = ciclo / 0.35;
      hop += Math.sin(k * Math.PI) * 2.2;
      sy *= 1 + 0.08 * Math.sin(k * Math.PI);
      sx *= 1 - 0.05 * Math.sin(k * Math.PI);
    }
  } else {
    const pa = Math.abs(Math.sin(t * 9 + s.x * 0.01));
    hop += pa * 0.9 * anda;
    sy *= 1 - 0.035 * (1 - pa) * anda;
  } // andando: sobe e desce no ritmo dos passos
  if (s._vira > 0) {
    const v = Math.sin(s._vira * Math.PI);
    sy *= 1 - 0.1 * v;
    sx *= 1 + 0.07 * v;
    hop += v * 1.2;
  } // virou de lado: agacha e dá um pulinho
  const pk = 1 - s._pop,
    esc = s._pop > 0 ? 1 + 0.32 * Math.sin(pk * Math.PI * 3) * (1 - pk) : 1,
    fx = fxAlvo;
  sombra(x + lunge * fxAlvo * 0.6, pe - 1, alvo * 0.75 * (1 - hop * 0.06) * Math.min(1.2, esc));
  sombraProjetada(spr, x, pe, spr.width, spr.height, s._fx < 0, 1);
  // luz do elemento: brilho no chão em volta dos pés (respira devagar; mais forte no Despertar e à noite)
  if (!SIM.ativo && QUAL > 0) {
    const cor = COR[elementoDe(s)],
      r = alvo * (J.desp > 0 ? 1.25 : 0.95),
      pul = 0.5 + 0.5 * Math.sin(t * 2.4 + s.x * 0.05),
      a = (0.1 + 0.08 * nivelEscuro() + 0.04 * pul) * (J.desp > 0 ? 2 : 1);
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = Math.min(0.6, a);
    lg.drawImage(bolhaCor(cor), x - r, pe - r * 0.42, r * 2, r * 0.84);
    lg.globalAlpha = Math.min(0.35, a * 0.55);
    lg.drawImage(bolhaCor(cor), x - r * 0.7, pe - alvo * 0.55 - r * 0.5, r * 1.4, r);
    lg.globalAlpha = 1;
    // anel de equipe: elipse fina na cor do elemento com três marcas girando devagar (como a marcação de time dos jogos de ação)
    const ra = alvo * 0.48,
      rb = ra * 0.36,
      gi = t * 0.9 + s.x * 0.01;
    lg.strokeStyle = cor;
    lg.lineWidth = 0.8;
    lg.globalAlpha = 0.55;
    lg.beginPath();
    lg.ellipse(x, pe - 0.5, ra, rb, 0, 0, Math.PI * 2);
    lg.stroke();
    lg.lineWidth = 1.4;
    lg.globalAlpha = 0.9;
    for (let i = 0; i < 3; i++) {
      const a0 = gi + (i * Math.PI * 2) / 3;
      lg.beginPath();
      lg.ellipse(x, pe - 0.5, ra, rb, 0, a0, a0 + 0.6);
      lg.stroke();
    }
    lg.globalAlpha = 1;
    lg.globalCompositeOperation = "source-over";
    lg.lineWidth = 1;
  }
  const w = spr.width,
    h = spr.height,
    peS = spr._pe || h;
  lg.save();
  lg.translate(x + lunge * fxAlvo, pe - hop);
  lg.rotate(rot);
  lg.scale(fx * sx * esc, sy * esc);
  // contorno de luz na cor do elemento, por trás do corpo (lê em chão claro e brilha à noite)
  if (!SIM.ativo && QUAL > 0) {
    const sil = silhueta(spr, COR[elementoDe(s)]),
      d = 0.9,
      a0 = 0.38 + 0.12 * Math.sin(t * 3 + s.x * 0.1);
    lg.globalAlpha = a0;
    for (const [ddx, ddy] of [
      [-d, 0],
      [d, 0],
      [0, -d],
      [0, d]
    ])
      lg.drawImage(sil, -w / 2 + ddx, -peS + ddy, w, h);
    lg.globalAlpha = 1;
  }
  desenharSprite(spr, -w / 2, -peS, w, h);
  if (anim && s._prox && s._mix > 0.05) {
    const a0 = lg.globalAlpha;
    lg.globalAlpha = a0 * s._mix;
    desenharSprite(s._prox, -w / 2, -peS, w, h);
    lg.globalAlpha = a0;
  } // quadro intermediário: mistura com o próximo
  if (s._pop > 0) {
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = Math.min(1, s._pop * 1.2) * 0.85;
    lg.drawImage(branco(spr), -w / 2, -peS, w, h);
    lg.globalCompositeOperation = "source-over";
    lg.globalAlpha = 1;
  }
  lg.restore();
  if (s.furia > 0 && J.cena) {
    const pf = 0.5 + 0.5 * Math.sin(t * 14 + s.x);
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = 0.3 + 0.2 * pf;
    lg.drawImage(bolhaCor("#ff5a4a"), x - alvo * 0.7, pe - alvo * 1.05, alvo * 1.4, alvo * 1.2);
    lg.globalCompositeOperation = "source-over";
    lg.globalAlpha = 1;
    if (QUAL > 0 && Math.random() < 0.25)
      J.parts.push({
        x: s.x + rnd(-5, 5),
        y: s.y + rnd(-2, 6),
        vx: rnd(-6, 6),
        vy: -rnd(25, 50),
        vida: rnd(0.3, 0.6),
        max: 0.6,
        cor: Math.random() < 0.5 ? "#ffb040" : "#ff5a4a",
        tam: 1,
        forma: "brasa",
        g: -30
      });
  }
}
// totem do Xamã: poste de madeira esculpido com rosto, asas laterais e uma gema na cor do elemento que pulsa e ilumina o chão
export function desenharTotem(t, ox, oy) {
  const x = t.x - ox,
    y = t.y - oy,
    tm = J.t + (t.x % 7),
    pul = 0.5 + 0.5 * Math.sin(tm * 4),
    cor = t.cor || "#9ff07a";
  sombraContato(x, y + 0.5, 9, 0.5);
  lg.globalCompositeOperation = "lighter";
  lg.globalAlpha = 0.25 + 0.2 * pul;
  lg.drawImage(bolhaCor(cor), x - 11, y - 4, 22, 8);
  lg.globalAlpha = 0.35 + 0.25 * pul;
  lg.drawImage(bolhaCor(cor), x - 6, y - 19, 12, 12);
  lg.globalAlpha = 1;
  lg.globalCompositeOperation = "source-over";
  const pau = lg.createLinearGradient(x - 2.5, 0, x + 2.5, 0);
  pau.addColorStop(0, "#3a2416");
  pau.addColorStop(0.45, "#8a5a32");
  pau.addColorStop(1, "#4a2c18");
  lg.fillStyle = pau;
  lg.beginPath();
  lg.moveTo(x - 2.4, y);
  lg.lineTo(x - 2.1, y - 11);
  lg.quadraticCurveTo(x, y - 13.5, x + 2.1, y - 11);
  lg.lineTo(x + 2.4, y);
  lg.closePath();
  lg.fill();
  lg.fillStyle = "#5a3a20";
  lg.beginPath();
  lg.moveTo(x - 2.2, y - 9);
  lg.lineTo(x - 5, y - 11);
  lg.lineTo(x - 2.2, y - 7);
  lg.moveTo(x + 2.2, y - 9);
  lg.lineTo(x + 5, y - 11);
  lg.lineTo(x + 2.2, y - 7);
  lg.fill(); // asas
  lg.fillStyle = "#1a0e08";
  lg.fillRect(x - 1.4, y - 6.2, 1, 0.8);
  lg.fillRect(x + 0.4, y - 6.2, 1, 0.8);
  lg.fillRect(x - 1, y - 4, 2, 0.6); // rosto
  lg.strokeStyle = "#2a180c";
  lg.lineWidth = 0.4;
  lg.beginPath();
  lg.moveTo(x - 2.2, y - 2.5);
  lg.lineTo(x + 2.2, y - 2.5);
  lg.moveTo(x - 2.1, y - 8.2);
  lg.lineTo(x + 2.1, y - 8.2);
  lg.stroke();
  lg.fillStyle = cor;
  lg.beginPath();
  lg.arc(x, y - 13, 1.7 + 0.3 * pul, 0, Math.PI * 2);
  lg.fill();
  lg.fillStyle = "#ffffff";
  lg.globalAlpha = 0.8;
  lg.beginPath();
  lg.arc(x - 0.5, y - 13.5, 0.6, 0, Math.PI * 2);
  lg.fill();
  lg.globalAlpha = 1;
  lg.lineWidth = 1;
}
// Invocador: o herói da tela inicial, visto de costas em 3/4 (como na capa): cabelo castanho arrepiado, cachecol azul-marinho,
// capa creme com estrela e borda dourada que esvoaça para trás, ombreiras e braçadeiras de bronze, túnica azul-marinho,
// perneiras e botas de couro e espada longa com guarda dourada (a lâmina brilha na cor do elemento do primeiro monstro).
// Desenhado em vetor (nítido em qualquer resolução), com passada, respiração, capa ao vento e balanço da espada.
// ---------------------------------------------------------------- Invocador: pixel art de frente, estilo Vampire Survivors
// Cabeçudo e simpático: cabelo castanho com topete, olhos grandes, cachecol azul-marinho, capa creme, túnica azul com cinto
// dourado e espada curta com a gema do elemento. Olha para o lado em que anda (espelhado), anda com as pernas alternando e
// o corpo balançando, respira parado e pisca de vez em quando. Antes era um desenho vetorial de costas, difícil de ler.
export const HEROI = {
  // proporção de herói (cabeça ~1/3 da altura; antes era metade, cabeçudo demais): cabelo em tons com reflexo, olhos com brilho,
  // bochechas, cachecol vermelho, capa azul por trás, túnica creme com cinto dourado, botas de couro e espada com guarda dourada
  pal: {
    o: "#2b1a24",
    H: "#7a4222",
    h: "#552c16",
    j: "#a8622c",
    y: "#dc9a52",
    S: "#fbd8b6",
    s: "#e2a684",
    E: "#2a1f3a",
    I: "#4a86e8",
    w: "#ffffff",
    N: "#c8403a",
    n: "#8a2a26",
    C: "#2f4c8e",
    c: "#1f3468",
    k: "#4a70b8",
    T: "#efe2c2",
    t: "#c4ae86",
    G: "#f4c85c",
    g: "#a87a2a",
    B: "#5a3a22",
    P: "#3c3256",
    p: "#2a2240",
    O: "#86532a",
    q: "#4e2e16",
    M: "#f2f7fd",
    l: "#a8b6c8",
    r: "#f0a0a0",
    L: "#7a5236"
  },
  cab: [
    "........oooo........",
    "......ooHjjHoo......",
    ".....oHjyyjjHHo.....",
    "....oHjjjHHHHHHo....",
    "....oHHHHHHHhHHo....",
    "....ohHSSSSSShHo....",
    "....ohSwESSwESho....",
    "....ohSSESSSESSo....",
    ".....oSrSssSrSo.....",
    "......oSSsSSSo......",
    ".......oooooo......."
  ],
  corpo: [
    "......oNNNNNNo......",
    "....ooNNNNNNnNoo....",
    "...okCoTTNNTToCko...",
    "..okCCoTTTNTTToCco..",
    "..oCCoSoTTTTToSoCo..",
    "..oCCoSoTGGGGToSoco.",
    "..okcoSoTTgTTToSocco",
    "..oCcooTTTTTTToocco.",
    "..oCc.otTTTTTto.cco.",
    "...oc.otttttttto.co.",
    "....o.oooooooooo.o.."
  ],
  pernas: {
    p: [
      ".......oPPoPPo......",
      ".......oPPoPPo......",
      ".......oPpoPpo......",
      "......oOOOoOOOo.....",
      "......oOqqoOqqo.....",
      "......ooooooooo....."
    ],
    a: [
      ".......oPPoPPo......",
      "......oPPo.oPpo.....",
      "......oOOo.oPpo.....",
      ".....oOOOo.oOOOo....",
      ".....oOqqo.oOqqo....",
      ".....ooooo.ooooo...."
    ],
    b: [
      ".......oPPoPPo......",
      ".......oPpo.oPPo....",
      "......oOOOo.oPpo....",
      "......oOqqo.oOOOo...",
      "......ooooo.oOqqo...",
      "............ooooo..."
    ]
  },
  espada: [
    [17, 12, "o"],
    [17, 13, "G"],
    [16, 14, "o"],
    [17, 14, "G"],
    [18, 14, "o"],
    [17, 15, "o"],
    [17, 16, "M"],
    [17, 17, "M"],
    [17, 18, "l"],
    [17, 19, "l"],
    [17, 20, "l"],
    [17, 21, "o"]
  ],
  cache: new Map()
};
// quadro do herói: pernas (p parado, a e b passada), corpo e cabeça descidos 'bob' px, olhos fechados se 'pisca'; a gema da espada leva a cor do elemento
export function quadroHeroi(pernas, bob, pisca, corGema) {
  const k = pernas + bob + (pisca ? 1 : 0) + corGema;
  if (HEROI.cache.has(k)) return HEROI.cache.get(k);
  const nc = HEROI.cab.length,
    ncp = HEROI.corpo.length,
    W = 20,
    H = nc + ncp + HEROI.pernas.p.length + 1,
    c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d"),
    px = (x, y, ch) => {
      const cor = ch === "X" ? corGema : HEROI.pal[ch];
      if (!cor) return;
      g.fillStyle = cor;
      g.fillRect(x, y, 1, 1);
    };
  HEROI.pernas[pernas].forEach((L, y) => {
    for (let x = 0; x < W; x++) if (L[x] !== ".") px(x, nc + ncp - 1 + y, L[x]);
  });
  HEROI.corpo.forEach((L, y) => {
    for (let x = 0; x < W; x++) if (L[x] !== ".") px(x, nc - 1 + y + bob, L[x]);
  });
  HEROI.cab.forEach((L, y) => {
    for (let x = 0; x < W; x++) {
      let ch = L[x];
      if (ch === ".") continue;
      if (pisca && (ch === "E" || ch === "w" || ch === "I")) ch = y === 7 ? "E" : "S";
      px(x, y + bob, ch);
    }
  });
  for (const [x, y, ch] of HEROI.espada) px(x, y + bob, ch);
  px(17, 13 + bob, "X"); // gema do elemento no pomo
  HEROI.cache.set(k, c);
  return c;
}
export let LADO_INVOCADOR = 1; // para que lado o herói olhava por último (antes ficava pendurado na própria função)
export function desenharInvocador(x, y) {
  const vel = Math.hypot(J.pvx || 0, J.pvy || 0),
    anda = vel > 6,
    t = J.t;
  const lado = J.dir && J.dir.x < -0.1 ? -1 : J.dir && J.dir.x > 0.1 ? 1 : LADO_INVOCADOR;
  LADO_INVOCADOR = lado;
  const a0 = ativos()[0],
    el = a0 ? elementoDe(a0) : R.pacto && R.pacto[0],
    cor = COR[el] || "#7fe0ff";
  let pernas = "p",
    bob = 0;
  if (anda) {
    const f = Math.floor(t * 9) % 4;
    pernas = ["a", "p", "b", "p"][f];
    bob = f % 2 === 0 ? 1 : 0;
  } else bob = Math.floor(t * 1.6) % 2; // passada; parado respira
  const pisca = t % 3.4 < 0.12,
    spr = quadroHeroi(pernas, bob, pisca, cor);
  const suave = lg.imageSmoothingEnabled;
  lg.imageSmoothingEnabled = false;
  luzPesHeroi(Math.round(x), Math.round(y) + 8, cor);
  lg.save();
  lg.translate(Math.round(x), Math.round(y) + 7);
  lg.scale(lado, 1);
  contornoHeroi(spr, -10, -spr.height, spr.width, spr.height, cor);
  lg.drawImage(spr, -10, -spr.height);
  lg.restore();
  lg.imageSmoothingEnabled = suave;
  // brilho do elemento na gema da espada
  const gx = x + lado * 7.5,
    gy = y + 7 - spr.height + 13.5 + bob,
    pul = 0.5 + 0.5 * Math.sin(t * 4),
    [r1, g1, b1] = hexRgb(cor);
  lg.globalCompositeOperation = "lighter";
  const gg = lg.createRadialGradient(gx, gy, 0, gx, gy, 3 + pul);
  gg.addColorStop(0, `rgba(${r1},${g1},${b1},${0.5 + 0.2 * pul})`);
  gg.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
  lg.fillStyle = gg;
  lg.fillRect(gx - 5, gy - 5, 10, 10);
  lg.globalCompositeOperation = "source-over";
}
export let SOBRE = null;
export function sobreposicao(cor, aLuz, aVin) {
  const k = cor + "|" + aLuz + "|" + aVin + "|" + W + "x" + H;
  if (SOBRE && SOBRE.k === k) return SOBRE.c;
  const w = Math.max(16, Math.round(W / 4)),
    h = Math.max(16, Math.round(H / 4)),
    c = (SOBRE && SOBRE.c) || document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d"),
    m = Math.min(w, h),
    [r, gg, b] = hexRgb(cor);
  const vg = g.createRadialGradient(w / 2, h / 2, m * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
  vg.addColorStop(0, "rgba(10,8,20,0)");
  vg.addColorStop(1, `rgba(10,8,20,${aVin})`);
  g.fillStyle = vg;
  g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = "lighter";
  const lz = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, m * 0.45);
  lz.addColorStop(0, `rgba(${r},${gg},${b},${aLuz})`);
  lz.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = lz;
  g.fillRect(0, 0, w, h);
  c._suave = true;
  SOBRE = { k, c };
  return c;
}
// brilho (bloom): reduz a tela, guarda só o que é claro (multiplicar a imagem por ela mesma) e soma de volta, borrado.
// Custa pouco (imagens pequenas) e some sozinho quando o aparelho está lento (QUAL<2).
export let BL1 = null,
  BL2 = null;
export function aplicarBloom() {
  if (QUAL < 2 || SIM.ativo) return; // também no celular: é barato e o jogo desliga sozinho (QUAL<2) se ficar lento
  const w1 = Math.max(8, Math.round(W / 4)),
    h1 = Math.max(8, Math.round(H / 4)),
    w2 = Math.max(4, w1 >> 1),
    h2 = Math.max(4, h1 >> 1);
  if (!BL1) {
    BL1 = document.createElement("canvas");
    BL2 = document.createElement("canvas");
  }
  if (BL1.width !== w1 || BL1.height !== h1) {
    BL1.width = w1;
    BL1.height = h1;
    BL2.width = w2;
    BL2.height = h2;
  }
  const g1 = BL1.getContext("2d"),
    g2 = BL2.getContext("2d");
  g1.globalCompositeOperation = "copy";
  g1.imageSmoothingEnabled = true;
  g1.drawImage(cv, 0, 0, w1, h1);
  g2.globalCompositeOperation = "copy";
  g2.imageSmoothingEnabled = true;
  g2.drawImage(BL1, 0, 0, w2, h2);
  g2.globalCompositeOperation = "multiply";
  g2.drawImage(BL2, 0, 0);
  g2.drawImage(BL2, 0, 0);
  g2.drawImage(BL2, 0, 0);
  g2.globalCompositeOperation = "source-over";
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "low";
  ctx.globalCompositeOperation = "lighter";
  const kb = 0.55 + 0.45 * Math.min(1, nivelEscuro() * 2.2);
  ctx.globalAlpha = 0.3 * kb;
  ctx.drawImage(BL2, 0, 0, W, H);
  ctx.globalAlpha = 0.15 * kb;
  ctx.drawImage(BL2, -W * 0.015, -H * 0.015, W * 1.03, H * 1.03);
  ctx.restore();
}
export let comboAnt = 0;
export let hudQuadro = 0;
export function hud() {
  if (SIM.ativo) return;
  if ((hudQuadro = (hudQuadro + 1) % 3) !== 0 && !pausado) return; // 20 vezes por segundo bastam: mexer na página todo quadro custava ~5% da lógica
  {
    const ev = R.essenciaRun + Math.floor((R.abatesPeso ?? R.abates) / 15),
      el = $("essHud");
    if (el && el._v !== ev) {
      el._v = ev;
      el.textContent = String(ev);
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
    }
  }
  const rest = Math.max(0, MAPA_SEG - J.t);
  $("tempo").textContent = J.chefeFeito ? "Chefe!" : `${Math.floor(rest / 60)}:${String(Math.floor(rest % 60)).padStart(2, "0")}`;
  $("barVida").style.width = `${Math.max(0, (J.vida / J.vidaMax) * 100)}%`;
  $("barEscudo").style.width = `${Math.min(100, (J.escudo / J.vidaMax) * 100)}%`;
  $("barXp").style.width = `${(J.xp / J.xpProx) * 100}%`;
  if (J.pulsoXp > 0) {
    J.pulsoXp -= 0.24;
    $("barXp").parentElement.classList.toggle("pulso", J.pulsoXp > 0);
  }
  $("ultFill").style.height = `${J.desp > 0 ? (J.desp / D.despertar.duracao_seg) * 100 : J.ult}%`;
  $("btnUlt").classList.toggle("pronto", J.ult >= 100 && J.desp <= 0);
  {
    const b = $("btnBolsa");
    if (b) {
      const u = itemUsavelAgora();
      if (b._u !== u) {
        b._u = u;
        b.classList.toggle("util", u);
      }
    }
  }
  const cb2 = $("btnComb"),
    tc = tipoCombinado();
  $("combNome").textContent = J.comb > 0 ? Math.ceil(J.comb) + " s" : tc.nome;
  cb2.title = tc.nome;
  cb2.classList.toggle("pronto", J.comb <= 0);
  $("combFill").style.height = `${J.comb > 0 ? (1 - J.comb / D.combinado_regras.recarga_seg) * 100 : 100}%`;
  $("esqFill").style.height = `${J.dashCd > 0 ? (1 - J.dashCd / D.esquiva.recarga_seg) * 100 : 100}%`;
  const cb = $("combo");
  if (J.combo >= 5) {
    cb.classList.add("vis");
    if (J.combo !== comboAnt) {
      cb.innerHTML = `Combo ${J.combo}<small>+${Math.round(Math.min(D.combo.xp_max, (J.combo / 10) * D.combo.xp_por_10) * 100)}% XP</small>`;
      if (J.combo % 10 === 0) {
        cb.classList.remove("pop");
        void cb.offsetWidth;
        cb.classList.add("pop");
      }
    }
  } else cb.classList.remove("vis");
  comboAnt = J.combo;
  R.selos.forEach((s, i) => {
    const el = document.getElementById("cd" + i);
    if (el) el.style.height = s.trocaCd > 0 ? `${(s.trocaCd / 15) * 100}%` : "0";
  });
}
// artes de quem está na equipe e no ninho: baixadas assim que eles entram (evolução e troca já encontram a arte pronta)
export function preCarregarEquipe() {
  if (SIM.ativo || !MANIFESTO || !R) return;
  const ids = new Set();
  R.selos.forEach(s => s.mon && ids.add(s.mon.id));
  (R.ninho || []).forEach(o => ids.add(o.id));
  const nomes = [];
  for (const id of ids) {
    const l = LINHA[id];
    if (!l) continue;
    const pasta = l.ancestral ? "arte/lendarios/" : `arte/monstros/${l.elemento}/`;
    nomes.push(...artesQue(n => n.startsWith(pasta + id + "__")));
  }
  preCarregar(nomes);
}
export function desenharEquipe() {
  if (SIM.ativo) return;
  preCarregarEquipe();
  const box = $("equipe");
  box.innerHTML = "";
  R.selos.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "retrato" + (s.mon ? "" : " vazio");
    b.setAttribute("aria-label", `Selo ${i + 1}`);
    if (s.mon) {
      const c = document.createElement("canvas");
      c.className = "mini";
      const spr = spriteUI(spriteSelo(s));
      c.width = spr.width;
      c.height = spr.height;
      c.getContext("2d").drawImage(spr, 0, 0);
      if (spr.hi === undefined && spr !== spriteSelo(s)) c.style.imageRendering = "auto";
      if (spr !== spriteSelo(s)) c.style.imageRendering = "auto";
      b.appendChild(c);
      b.style.borderColor = COR[elementoDe(s)];
      b.insertAdjacentHTML(
        "beforeend",
        `${nomeForma(s)}<br>nv ${s.nivel}<div class="cd" id="cd${i}" style="height:0; top:auto; bottom:0"></div>`
      );
    } else b.insertAdjacentHTML("beforeend", `<div style="height:38px;line-height:38px">vazio</div>Selo ${i + 1}`);
    b.onclick = () => {
      if (!pausado && J && !J.fim) abrirEquipe(i);
    };
    box.appendChild(b);
  });
}
export function desenharNinho() {
  if (SIM.ativo) return;
  const box = $("ninho");
  if (!R) {
    box.innerHTML = "";
    return;
  }
  const anc = R.ancestral && R.ancestral.estado === "chocando";
  box.innerHTML = R.ninho.length || anc ? "Ninho" : "";
  if (anc) {
    const A = R.ancestral,
      d = document.createElement("div");
    d.className = "ovo anc";
    d.title = LINHA[A.id].ovo;
    const c = document.createElement("canvas");
    c.className = "mini";
    const s = spriteOvo(A.el, "lendario");
    c.width = s.width;
    c.height = s.height;
    c.getContext("2d").drawImage(s, 0, 0);
    d.appendChild(c);
    d.insertAdjacentHTML("beforeend", `<i><b style="width:${Math.min(100, (A.prog / A.alvo) * 100)}%;background:#ffd34a"></b></i>`);
    box.appendChild(d);
  }
  R.ninho.forEach(o => {
    const d = document.createElement("div");
    d.className = "ovo";
    const c = document.createElement("canvas");
    c.className = "mini";
    const s = spriteOvo(LINHA[o.id].elemento, o.rar);
    c.width = s.width;
    c.height = s.height;
    c.getContext("2d").drawImage(s, 0, 0);
    d.appendChild(c);
    d.insertAdjacentHTML("beforeend", `<i><b style="width:${Math.min(100, (o.prog / o.alvo) * 100)}%"></b></i>`);
    box.appendChild(d);
  });
}
export let toastT = null;
export function toast(h) {
  if (SIM.ativo) return;
  const t = $("toast");
  t.innerHTML = h;
  t.classList.add("vis");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("vis"), 2400);
}
/** troca o chão do mapa (quem monta o piso é o cenário) */
export function defChao(v) {
  return (chao = v);
}
