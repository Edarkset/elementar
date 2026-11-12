// Elementar · diretor de horda (ritmo, ondas, ameaça) e contorno de leitura dos inimigos
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./07d_estrutura.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { agendar, ctx, H, J, R, rnd, VH, VW, W } from "./01_nucleo.js";
import { DIF, hordaF, hordaK, MOD, ondaCerco, particulas, spawnInimigo } from "./02_combate.js";
import { abismoEm, estruturaU, pecasPerto } from "./07d_estrutura.js";
import { evento } from "./08e_conquistas.js";
import { perigo } from "./09b_chefes.js";
import { chao } from "./10_desenho.js";
// ================================================================ diretor de horda: ajusta o ritmo pelo que está acontecendo na tela
// Mede a cada meio segundo quantos inimigos estão na tela, quantos estão colados no jogador e a vida.
// Dominando: aumenta a densidade e solta ondas especiais. Afogado: segura os nascimentos para você respirar.
// A pressão-alvo cresce dentro de cada mapa e de um mapa para o outro (como no Vampire Survivors).
export function iniciarDiretor() {
  J.diretor = { mult: 1, tick: 0, respiro: 0, tEvento: rnd(40, 55), alvo: 20, n: 0, vida: 1, eventos: 0, ameaca: 1, tCheia: 0 };
}
// ameaça: quem passa muito tempo com a vida cheia apanha mais forte (até +60%); quando a vida cai, volta ao normal
// primeiro mapa da run: o dano recebido começa em 20% e chega ao normal em 80 s (antes, parado, a equipe caía em ~10 s)
export function inicioSuave() {
  return R && R.profundidade === 0 && !R.teste ? Math.min(1, 0.2 + J.t / 100) : 1;
}
export function ameacaDiretor() {
  return (J.diretor ? J.diretor.ameaca : 1) * inicioSuave();
}
// XP: os inimigos extras que o diretor coloca valem proporcionalmente menos, para o ritmo de níveis não disparar
export function fatorXPDiretor() {
  const d = J.diretor;
  return d && d.mult > 1 ? Math.max(0.55, 1 / Math.sqrt(d.mult)) : 1;
}
export function multDiretor() {
  const d = J.diretor;
  if (!d) return 1;
  return d.respiro > 0 ? 0.1 : d.mult;
}
export function contarTela() {
  const P = J.jogador;
  let n = 0,
    col = 0;
  for (const e of J.inimigos) {
    if (e.hp <= 0) continue;
    const dx = Math.abs(e.x - P.x),
      dy = Math.abs(e.y - P.y);
    if (dx < VW / 2 && dy < VH / 2) {
      n++;
      if (dx < 40 && dy < 40) col++;
    }
  }
  return [n, col];
}
export function atualizarDiretor(dt) {
  if (!J.diretor) iniciarDiretor();
  const d = J.diretor;
  d.tick -= dt;
  if (d.tick <= 0) {
    d.tick = 0.5;
    const [n, col] = contarTela(),
      vida = J.vida / J.vidaMax;
    d.n = n;
    d.vida = vida;
    // a horda começa pequena em todo mapa (poucos inimigos, mais perigosos) e cresce aos poucos com o tempo e a profundidade
    d.alvo =
      Math.min(
        120 + (DIF.hordaMax - 120) * hordaK(),
        (DIF.hordaBase + R.profundidade * DIF.hordaProf + J.t * (DIF.hordaT + R.profundidade * DIF.hordaTProf)) *
          hordaF("horda") *
          (1 + MOD("horda"))
      ) * (R.profundidade === 0 && !R.teste ? Math.min(1, 0.5 + J.t / 80) : 1);
    if (col > 22 && vida < 0.45 && d.respiro <= 0) {
      d.respiro = 3;
    } // afogado: respiro curto
    let m = d.mult;
    if (n > d.alvo * 1.6) m -= 0.15;
    else if (n < d.alvo * 0.7 && vida > 0.5) m += 0.12;
    else if (n < d.alvo) m += 0.04;
    else m -= 0.03;
    d.mult = Math.max(0.3, Math.min(2.6, m));
    d.tCheia = vida > 0.8 ? d.tCheia + 0.5 : Math.max(0, d.tCheia - 1.5);
    const alvoA = vida < 0.55 ? 1 : 1 + Math.min(0.6, Math.max(0, d.tCheia - 15) / 60 + R.profundidade * 0.04);
    d.ameaca += (alvoA - d.ameaca) * 0.15;
  }
  if (d.respiro > 0) d.respiro -= dt;
  d.tEvento -= dt;
  if (d.tEvento <= 0 && !J.chefeVivo && !(R.profundidade === 0 && J.t < 45)) {
    if (d.vida > 0.5 && d.n < d.alvo * 1.2) {
      eventoHorda();
      d.eventos++;
      d.tEvento = rnd(38, 55) - Math.min(15, R.profundidade * 3);
    } else d.tEvento = 8;
  }
}
export function avisar(txt, sub, cor?) {
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
    escala = 1 + prof * 0.15;
  /** tipo de onda e peso no sorteio */
  const opcoes: [string, number][] = [
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
