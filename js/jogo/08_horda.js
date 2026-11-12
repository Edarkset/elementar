// GERADO por "npm run compilar" a partir de src/jogo/08_horda.ts. Edite o .ts, não este arquivo.
// Elementar · diretor de horda (ritmo, ondas, ameaça) e contorno de leitura dos inimigos
import "./07d_estrutura.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { agendar, ctx, H, J, MAPA_SEG, R, rnd, VH, VW, W } from "./01_nucleo.js";
import { DIF, MOD, ondaCerco, particulas, spawnInimigo } from "./02_combate.js";
import { abismoEm, estruturaU, pecasPerto } from "./07d_estrutura.js";
import { evento } from "./08e_conquistas.js";
import { relatorioAmostra } from "./08i_relatorio.js";
import { perigo } from "./09b_chefes.js";
import { chao } from "./10_desenho.js";
// ================================================================ diretor de horda: ajusta o ritmo pelo que está acontecendo na tela
// Mede a cada meio segundo quantos inimigos estão na tela, quantos estão colados no jogador e a vida.
// Dominando: aumenta a densidade e solta ondas especiais. Afogado: segura os nascimentos para você respirar.
// A pressão-alvo cresce dentro de cada mapa e de um mapa para o outro (como no Vampire Survivors).
export function iniciarDiretor() {
  const d = { ajuste: 1, tick: 0, respiro: 0, tEvento: rnd(40, 55), alvo: 0, n: 0, perto: 0, vida: 1, eventos: 0, ameaca: 1, tCheia: 0 };
  J.diretor = d;
  d.alvo = alvoHorda();
  return d;
}
/** quantos inimigos a horda quer na tela agora (curva do mapa, sem o ajuste do diretor) */
export function alvoHorda() {
  const p = R.profundidade,
    u = Math.min(1, J.t / (MAPA_SEG * DIF.hordaSobe)),
    ini = DIF.hordaIni + p * DIF.hordaIniProf,
    pico = Math.min(DIF.hordaMax, DIF.hordaPico + p * DIF.hordaPicoProf);
  return (ini + (pico - ini) * Math.pow(u, DIF.hordaCurva)) * (1 + MOD("horda"));
}
/** tamanho das ondas especiais em relação à horda do momento (onda de 20 numa horda de 40) */
export function escalaOnda() {
  return Math.max(0.35, Math.min(1.8, (J.diretor ? J.diretor.alvo : alvoHorda()) / 40));
}
// ameaça: quem passa muito tempo com a vida cheia apanha mais forte (até +60%); quando a vida cai, volta ao normal
// primeiro mapa da run: o dano recebido começa em 20% e chega ao normal em 80 s (antes, parado, a equipe caía em ~10 s)
export function inicioSuave() {
  return R && R.profundidade === 0 && !R.teste ? Math.min(1, 0.2 + J.t / 100) : 1;
}
export function ameacaDiretor() {
  return (J.diretor ? J.diretor.ameaca : 1) * inicioSuave();
}
// XP: quando o diretor pede mais inimigos que a curva (equipe dominando), cada um vale proporcionalmente menos
export function fatorXPDiretor() {
  const d = J.diretor;
  return d && d.ajuste > 1 ? 1 / Math.sqrt(d.ajuste) : 1;
}
/** inimigos que nascem por segundo agora: completa o que falta na tela para o alvo e repõe os que morrem; nada durante o
 * respiro, nem quando já há muitos chegando (logo além da borda) para não transbordar quando eles entrarem */
export function taxaSurgimento() {
  const d = J.diretor;
  if (!d || d.respiro > 0 || d.perto > d.alvo * DIF.hordaChegando) return 0;
  return DIF.hordaRepor + DIF.hordaEnche * Math.max(0, d.alvo - d.n);
}
export function contarTela() {
  const P = J.jogador;
  let n = 0,
    col = 0,
    perto = 0;
  for (const e of J.inimigos) {
    if (e.hp <= 0) continue;
    const dx = Math.abs(e.x - P.x),
      dy = Math.abs(e.y - P.y);
    if (dx < VW * 0.75 && dy < VH * 0.75) perto++;
    if (dx < VW / 2 && dy < VH / 2) {
      n++;
      if (dx < 40 && dy < 40) col++;
    }
  }
  return [n, col, perto];
}
export function atualizarDiretor(dt) {
  const d = J.diretor || iniciarDiretor();
  d.tick -= dt;
  if (d.tick <= 0) {
    d.tick = 0.5;
    const [n, col, perto] = contarTela(),
      vida = J.vida / J.vidaMax;
    d.n = n;
    d.perto = perto;
    d.vida = vida;
    relatorioAmostra(n, vida);
    if (col > 22 && vida < 0.45 && d.respiro <= 0) {
      d.respiro = 3;
    } // afogado: respiro curto
    // ajuste do diretor sobre a curva: quem domina (vida cheia por muito tempo) recebe até 30% a mais; quem está mal, 20% a menos
    const alvoAj = vida < 0.4 ? 0.8 : d.tCheia > 20 ? Math.min(1.3, 1 + (d.tCheia - 20) / 100) : 1;
    d.ajuste += (alvoAj - d.ajuste) * 0.05;
    d.alvo = alvoHorda() * d.ajuste;
    d.tCheia = vida > 0.8 ? d.tCheia + 0.5 : Math.max(0, d.tCheia - 1.5);
    const alvoA = vida < 0.55 ? 1 : 1 + Math.min(0.6, Math.max(0, d.tCheia - 15) / 60 + R.profundidade * 0.04);
    d.ameaca += (alvoA - d.ameaca) * 0.15;
  }
  if (d.respiro > 0) d.respiro -= dt;
  d.tEvento -= dt;
  if (d.tEvento <= 0 && !J.chefeVivo && J.t >= (R.profundidade === 0 ? 45 : 30)) {
    if (d.vida > 0.5 && d.n < d.alvo * 1.2) {
      eventoHorda();
      d.eventos++;
      d.tEvento = rnd(38, 55) - Math.min(15, R.profundidade * 3);
    } else d.tEvento = 8;
  }
}
export function avisar(txt, sub, cor) {
  J.aviso = { txt, sub: sub || "", vida: 2.2, cor: cor || "#ff8a6a" };
}
// lugar bom para um objeto do cenário: fora do abismo (com folga), de lagos, de praças e de construções
export function lugarDeObjeto(x, y, m) {
  if (!estruturaU() || !J.cena) return true;
  if (abismoEm(x, y, m)) return false;
  for (const f of pecasPerto(x, y)) {
    if (f.tipo === "abismo") continue;
    const dx = (x - f.x) / (f.rx + m),
      dy = (y - f.y) / (f.ry + m);
    if (dx * dx + dy * dy < 1) return false;
  }
  return true;
}
export function lugarLivre(x, y) {
  return !(estruturaU() && J.cena && abismoEm(x, y, 6));
}
export function eventoHorda() {
  evento("onda");
  const P = J.jogador,
    prof = R.profundidade,
    escala = escalaOnda();
  /** tipo de onda e peso no sorteio */
  const opcoes = [
    ["cerco", 3],
    ["enxame", 3],
    ["elites", prof >= 1 ? 2 : 1],
    ["emboscada", 2]
  ];
  let tot = 0;
  for (const [, p] of opcoes) tot += p;
  let s = Math.random() * tot,
    tipo = "cerco";
  for (const [t, p] of opcoes) {
    s -= p;
    if (s <= 0) {
      tipo = t;
      break;
    }
  }
  if (tipo === "cerco") {
    ondaCerco();
    avisar("Cerco!", "eles fecham o anel: abra caminho");
    return;
  }
  if (tipo === "enxame") {
    const a = Math.random() * Math.PI * 2,
      ux = Math.cos(a),
      uy = Math.sin(a),
      n = Math.min(40, Math.round(16 * escala));
    avisar("Enxame!", "uma onda rápida vem de um lado");
    J.setas = J.setas || [];
    J.setas.push({ ang: a, vida: 1.4 });
    agendar(1.2, () => {
      if (!J || J.fim) return;
      const P = J.jogador,
        dist = Math.max(VW, VH) * 0.62;
      for (let i = 0; i < n; i++) {
        if (J.inimigos.length >= DIF.max) break;
        spawnInimigo(0);
        const e = J.inimigos[J.inimigos.length - 1],
          lat = ((i % 8) - 3.5) * 12,
          fila = Math.floor(i / 8) * 14;
        e.x = P.x + ux * (dist + fila) - uy * lat;
        e.y = P.y + uy * (dist + fila) + ux * lat;
        e.v *= 1.3;
        e.surgindo = 0;
      }
    });
    return;
  }
  if (tipo === "elites") {
    const a = Math.random() * Math.PI * 2,
      ne = Math.min(4, 2 + Math.floor(prof / 2)),
      dist = Math.max(VW, VH) * 0.55;
    avisar("Elites!", "monstros fortes chegando juntos", "#ffd34a");
    J.setas = J.setas || [];
    J.setas.push({ ang: a, vida: 1.4 });
    agendar(1.0, () => {
      if (!J || J.fim) return;
      const P = J.jogador;
      for (let i = 0; i < ne + 6; i++) {
        spawnInimigo(i < ne ? 2 : Math.floor(Math.random() * 2));
        const e = J.inimigos[J.inimigos.length - 1],
          lat = (i - (ne + 6) / 2) * 10;
        e.x = P.x + Math.cos(a) * dist - Math.sin(a) * lat;
        e.y = P.y + Math.sin(a) * dist + Math.cos(a) * lat;
        e.surgindo = 0;
        if (i < ne) {
          e.daOnda = true;
          if (!e.elite) {
            e.elite = true;
            e.max *= 6;
            e.hp = e.max;
            e.escAlvo = 1.2;
            e.r *= 1.3;
            e.virouElite = 0.6;
            particulas(e.x, e.y, "#ffd34a", 8, 40);
          }
        }
      }
    }); /* elites das ondas soltam item com menos frequência */
    return;
  }
  // emboscada: brotam do chão em volta, cada um anunciado por uma marca
  const n = Math.min(16, Math.round(8 * escala));
  avisar("Emboscada!", "eles brotam do chão em volta de você", "#c8b890");
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + Math.random() * 0.4,
      r = rnd(48, 80),
      x = P.x + Math.cos(a) * r,
      y = P.y + Math.sin(a) * r;
    if (!lugarLivre(x, y)) continue;
    perigo({
      tipo: "circ",
      x,
      y,
      r: 6,
      t: 0.9,
      cor: "#c8b890",
      fim: () => {
        if (!J || J.fim || J.inimigos.length >= DIF.max) return;
        spawnInimigo();
        const e = J.inimigos[J.inimigos.length - 1];
        e.x = x;
        e.y = y;
        e.surgindo = 0.45;
      }
    });
  }
}
export function atualizarAvisos(dt) {
  if (J.aviso) {
    J.aviso.vida -= dt;
    if (J.aviso.vida <= 0) J.aviso = null;
  }
  if (J.setas) {
    for (const s of J.setas) s.vida -= dt;
    J.setas = J.setas.filter(s => s.vida > 0);
  }
}
export function desenharAvisos() {
  if (J.aviso && !(J.chefeVivo && J.chefeVivo.hp > 0)) {
    const a = J.aviso,
      y = Math.round(H * 0.2) + 46 + (J.conqAtual ? 60 : 0);
    ctx.globalAlpha = Math.min(1, a.vida * 1.5);
    ctx.textAlign = "center";
    ctx.font = `800 20px "Cinzel", Georgia, serif`;
    ctx.fillStyle = "#120e1a";
    ctx.fillText(a.txt, W / 2 + 2, y + 2);
    ctx.fillStyle = a.cor;
    ctx.fillText(a.txt, W / 2, y);
    if (a.sub) {
      ctx.font = `13px "Nunito", system-ui, sans-serif`;
      ctx.fillStyle = "#f2e7c9";
      ctx.fillText(a.sub, W / 2, y + 18);
    }
    ctx.globalAlpha = 1;
  }
  if (J.setas)
    for (const s of J.setas) {
      const r = Math.min(W, H) * 0.44,
        x = W / 2 + Math.cos(s.ang) * r,
        y = H / 2 + Math.sin(s.ang) * r * 1.4,
        p = 0.6 + 0.4 * Math.sin(J.t * 14);
      ctx.globalAlpha = Math.min(1, s.vida * 2) * p;
      ctx.fillStyle = "#ff8a6a";
      ctx.beginPath();
      ctx.moveTo(x - Math.cos(s.ang) * 16, y - Math.sin(s.ang) * 16);
      ctx.lineTo(x + Math.cos(s.ang + 2.4) * 12, y + Math.sin(s.ang + 2.4) * 12);
      ctx.lineTo(x + Math.cos(s.ang - 2.4) * 12, y + Math.sin(s.ang - 2.4) * 12);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
}
// ---------------------------------------------------------------- leitura: contorno automático quando o inimigo se confunde com o chão
export const LUM_SPR = new WeakMap();
export function luminancia(r, g, b) {
  const f = c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
export function lumMedia(cv, passo) {
  try {
    const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data;
    let r = 0,
      g = 0,
      b = 0,
      n = 0;
    for (let i = 0; i < d.length; i += 4 * (passo || 1)) {
      if (d[i + 3] < 128) continue;
      r += d[i];
      g += d[i + 1];
      b += d[i + 2];
      n++;
    }
    return n ? luminancia(r / n, g / n, b / n) : 0.2;
  } catch (err) {
    return 0.2;
  }
}
export function lumChao() {
  if (!chao || !chao.cv) return 0.2;
  if (chao.lum == null) chao.lum = lumMedia(chao.cv, 7);
  return chao.lum;
}
export function lumSprite(spr) {
  let L = LUM_SPR.get(spr);
  if (L == null) {
    L = lumMedia(spr, 1);
    LUM_SPR.set(spr, L);
  }
  return L;
}
// devolve a cor do contorno (claro em chão escuro, escuro em chão claro) ou null quando o contraste já é bom
export function contornoLeitura(spr) {
  const Lc = lumChao(),
    Ls = lumSprite(spr),
    c = (Math.max(Lc, Ls) + 0.05) / (Math.min(Lc, Ls) + 0.05);
  if (c >= 1.9) return null;
  return Lc < 0.3 ? "#f2e7c9" : "#140f1c";
}
