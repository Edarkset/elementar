// Elementar · desenho do cenário
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./07_cenario.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import {
  baseHi,
  branco,
  COR,
  ctx,
  elementoDe,
  escolha,
  hexRgb,
  J,
  lg,
  mistura,
  R,
  rnd,
  S,
  semente,
  SIM,
  tom,
  UNIV,
  VH,
  VW
} from "./01_nucleo.js";
import { sombraContato } from "./02_combate.js";
import { CEL, DUR, hash2 } from "./04_ambiente.js";
import { QUAL } from "./06_loop.js";
import { bolhaCor, CH, tufoInfo, VEG, vento, VREF } from "./07_cenario.js";
import { detalhesArte, spriteMarco, spriteObjetoArte } from "./07c_cenario_arte.js";
import { vEl } from "./08b_efeitos.js";
import { crepusculo, nivelEscuro, sombraProjetada } from "./08g_luz.js";
import { chao } from "./10_desenho.js";
// ================================================================ desenho do cenário
export function spriteCena(chave: string, w: number, h: number, fn) {
  const C = J.cena;
  if (C.sprites.has(chave)) return C.sprites.get(chave);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  fn(g, (x: number, y: number, cor: string | CanvasGradient | CanvasPattern) => {
    g.fillStyle = cor;
    g.fillRect(x, y, 1, 1);
  });
  C.sprites.set(chave, c);
  return c;
}
export function spriteProp(p) {
  const C = J.cena,
    k = C.kit,
    t = p.tipo;
  if (t === "marco" || t === "luz" || t === "frente") return spriteMarco(p);
  const arte = spriteObjetoArte(p);
  if (arte) return arte;
  switch (t) {
    case "vaso": {
      const [cor, faixa] = k.vaso || ["#b8683a", "#2a3a5a"],
        v = p.var;
      return spriteCena("vaso" + v, 9, 12, (g, px) => {
        const cla = tom(cor, 1.25),
          esc = tom(cor, 0.66);
        for (let x = 2; x <= 6; x++) px(x, 0, esc);
        for (let y = 1; y <= 2; y++) for (let x = 3; x <= 5; x++) px(x, y, x === 3 ? cla : cor);
        const ry = v === 1 ? 4.6 : 4.2;
        for (let y = 3; y < 12; y++)
          for (let x = 0; x < 9; x++) {
            const dx = (x - 4) / (v === 2 ? 3.6 : 4.4),
              dy = (y - 7.4) / ry;
            if (dx * dx + dy * dy > 1) continue;
            let c = dx < -0.35 ? cla : dx > 0.4 ? esc : cor;
            if (y === 6 || (v === 2 && y === 9)) c = faixa;
            if (dy > 0.78) c = esc;
            px(x, y, c);
          }
        px(2, 5, tom(cor, 1.5));
        if (v === 0) {
          px(0, 5, esc);
          px(8, 5, esc);
        }
      });
    }
    case "caixote":
      return spriteCena("caixote", 10, 10, (g, px) => {
        const b = "#8a5a30",
          c = "#b07a44",
          e = "#5a3a20";
        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 3; y++) px(x, y, y === 0 ? tom(c, 1.15) : c);
          for (let y = 3; y < 10; y++) px(x, y, x === 0 || x === 9 || y === 9 ? e : b);
        }
        for (let x = 1; x < 9; x++) {
          px(x, 5, e);
          px(x, 7, e);
        }
        for (let i = 0; i < 6; i++) px(2 + i, 8 - Math.floor(i * 0.9), c);
        px(1, 4, "#d8c8a0");
        px(8, 4, "#d8c8a0");
        px(1, 8, "#d8c8a0");
        px(8, 8, "#d8c8a0");
      });
    case "barril":
    case "polvora": {
      const fr = Math.floor(((p.rolou / 2.2) % 4) + 4) % 4,
        ver = p.eixo === "v";
      if (p.saque)
        return spriteCena("saque" + (ver ? "v" : "h") + fr, ver ? 8 : 12, ver ? 12 : 8, (g, px) => {
          for (let i = 0; i < 12; i++)
            for (let j = 0; j < 8; j++) {
              if ((i === 0 || i === 11) && (j === 0 || j === 7)) continue;
              let c = j < 2 ? "#e8d8b8" : j > 5 ? "#a89878" : "#d8c8a0";
              if (i === 2 || i === 9) c = "#2a1e1a";
              if (i >= 4 && i <= 7 && j >= 2 && j <= 5) c = (i + j) % 2 ? "#c8302a" : "#f2e7c9";
              ver ? px(j, i, c) : px(i, j, c);
            }
        });
      return spriteCena(t + (ver ? "v" : "h") + fr, ver ? 8 : 12, ver ? 12 : 8, (g, px) => {
        const pol = t === "polvora",
          b = pol ? "#6a2a20" : "#8a5a30",
          c = pol ? "#8a3a2a" : "#b07a44",
          e = pol ? "#3a1610" : "#5a3a20",
          aro = pol ? "#1a1416" : "#4a4048";
        for (let i = 0; i < 12; i++)
          for (let j = 0; j < 8; j++) {
            if ((i === 0 || i === 11) && (j === 0 || j === 7)) continue;
            let cor = j < 2 ? c : j > 5 ? e : b;
            if ((j + fr) % 3 === 0) cor = tom(cor, 0.85);
            if (i === 2 || i === 9) cor = aro;
            if ((i === 2 || i === 9) && j === 1) cor = "#9a90a0";
            if (i === 0 || i === 11) cor = tom(cor, 0.8);
            if (pol && i >= 5 && i <= 6 && j >= 2 && j <= 5 && i - 5 === (j - 2) % 2) cor = "#f2e7c9";
            ver ? px(j, i, cor) : px(i, j, cor);
          }
      });
    }
    case "feno":
      return spriteCena("feno", 11, 8, (g, px) => {
        for (let x = 0; x < 11; x++)
          for (let y = 0; y < 8; y++) {
            if ((x === 0 || x === 10) && (y === 0 || y === 7)) continue;
            let c = y < 2 ? "#f0d88a" : y > 5 ? "#a8843c" : "#d8b85a";
            if (hash2(x, y, 5) < 0.25) c = "#b8943c";
            if (x === 3 || x === 7) c = "#6a4a24";
            px(x, y, c);
          }
      });
    case "fruta":
      if (k.fruta === "abobora")
        return spriteCena("abobora", 8, 7, (g, px) => {
          for (let x = 0; x < 8; x++)
            for (let y = 1; y < 7; y++) {
              const dx = (x - 3.5) / 4,
                dy = (y - 4) / 3;
              if (dx * dx + dy * dy > 1) continue;
              let c = dx < -0.3 ? "#f0a040" : dx > 0.4 ? "#b85a1a" : "#e07a2a";
              if (x === 2 || x === 5) c = "#c8661e";
              px(x, y, c);
            }
          px(3, 0, "#4a7a2a");
          px(4, 1, "#4a7a2a");
        });
      return spriteCena("coco", 6, 6, (g, px) => {
        for (let x = 0; x < 6; x++)
          for (let y = 0; y < 6; y++) {
            const dx = (x - 2.5) / 3,
              dy = (y - 2.5) / 3;
            if (dx * dx + dy * dy > 1) continue;
            px(x, y, dx + dy < -0.5 ? "#8a6a3a" : hash2(x, y, 9) < 0.3 ? "#5a3a1a" : "#6a4a2a");
          }
        px(2, 1, "#a8885a");
      });
    case "rocha": {
      const st = k.rocha || "normal",
        v = p.var;
      return spriteCena("rocha" + v + st, 14, 10, (g, px) => {
        const base = st === "obsidiana" ? "#2a2030" : st === "areia" ? "#a08a68" : st === "coral" ? "#c87a7a" : "#7a7680",
          cla = st === "obsidiana" ? "#5a4a70" : tom(base, 1.3),
          esc = tom(base, 0.65);
        for (let x = 0; x < 14; x++)
          for (let y = 0; y < 10; y++) {
            const nx = (x - 6.5) / 7,
              ny = (y - 5.4) / 4.8;
            if (nx * nx + ny * ny + 0.35 * hash2(x, y, 11 + v) > 1.05) continue;
            let c = nx + ny < -0.45 ? cla : nx + ny > 0.55 ? esc : base;
            if (st === "musgo" && ny < -0.35 && hash2(x, y, 13) < 0.7) c = hash2(x, y, 14) < 0.5 ? "#4f8a3c" : "#3a6a30";
            if (st === "neve" && ny < -0.3) c = hash2(x, y, 15) < 0.8 ? "#f0f6ff" : "#c8d8e8";
            if (st === "coral" && hash2(x, y, 17) < 0.18) c = "#f0a0a0";
            px(x, y, c);
          }
        if (st === "obsidiana") {
          px(5, 4, "#e8603c");
          px(6, 5, "#e8603c");
          px(7, 5, "#ffd34a");
          px(9, 6, "#e8603c");
        }
      });
    }
    case "gelo":
      return spriteCena("gelo", 12, 11, (g, px) => {
        g.globalAlpha = 0.88;
        for (let x = 0; x < 12; x++) {
          for (let y = 0; y < 3; y++) px(x, y, "#e0f6ff");
          for (let y = 3; y < 11; y++) px(x, y, x < 2 ? "#c8ecff" : x > 9 ? "#7fb8e0" : "#9fd0ea");
        }
        g.globalAlpha = 1;
        for (let x = 1; x < 11; x++) px(x, 3, "#ffffff");
        px(4, 5, "#e8f8ff");
        px(5, 6, "#e8f8ff");
        px(6, 6, "#e8f8ff");
        px(8, 8, "#c8e8ff");
        px(1, 1, "#ffffff");
      });
    case "cristal": {
      const c = k.cristal || "#c8f0ff";
      return spriteCena("cristal" + c, 10, 14, (g, px) => {
        const cla = tom(c, 1.35),
          esc = tom(c, 0.62);
        const prisma = (x0: number, w: number, y0: number) => {
          for (let x = 0; x < w; x++)
            for (let y = y0; y < 14; y++) {
              const topo = y0 + Math.abs(x - (w - 1) / 2) * 1.4;
              if (y < topo) continue;
              px(x0 + x, y, x < w / 2 - 0.5 ? cla : x > w / 2 ? esc : c);
            }
        };
        prisma(0, 3, 5);
        prisma(7, 3, 4);
        prisma(3, 4, 0);
        px(4, 3, "#ffffff");
        px(1, 8, "#ffffff");
      });
    }
    case "arvore": {
      const ced = C.u.id === "mesopotamia",
        cop =
          C.u.elemento === "natureza" && C.u.id !== "floresta_negra"
            ? "#3f8a34"
            : C.u.id === "floresta_negra"
              ? "#2a4a2a"
              : ced
                ? "#2a5a3a"
                : "#3a7a34",
        grande = p.carvalho;
      return spriteCena("arvore" + cop + (grande ? "g" : "") + p.var, grande ? 20 : 14, grande ? 26 : 20, (g, px) => {
        const W = grande ? 20 : 14,
          H = grande ? 26 : 20,
          tr = Math.round(W / 2) - 1;
        for (let y = H - 8; y < H; y++) for (let x = tr; x < tr + 3; x++) px(x, y, x === tr ? "#7a5030" : "#5a3a20");
        for (let y = 0; y < H - 6; y++)
          for (let x = 0; x < W; x++) {
            const dx = (x - W / 2 + 0.5) / (W / 2),
              dy = (y - (H - 6) * 0.5) / ((H - 6) * 0.5);
            const dentro = ced ? Math.abs(dx) < (y / (H - 6)) * 1.05 && y > 1 : dx * dx + dy * dy + 0.25 * hash2(x, y, 7 + p.var) < 1.05;
            if (!dentro) continue;
            let c = dx + dy < -0.4 ? tom(cop, 1.3) : dx + dy > 0.5 ? tom(cop, 0.68) : cop;
            if (hash2(x, y, 11) < 0.12) c = tom(cop, 1.5);
            px(x, y, c);
          }
        if (grande) {
          px(tr + 1, H - 4, "#d6ab4f");
          px(tr, H - 4, "#8a5a20");
          px(tr + 2, H - 4, "#8a5a20");
        }
      });
    }
    case "tronco": {
      const ver = p.eixo === "v";
      return spriteCena("tronco" + (ver ? "v" : "h") + (Math.floor(((p.rolou / 2) % 3) + 3) % 3), ver ? 7 : 13, ver ? 13 : 7, (g, px) => {
        const fr = Math.floor(((p.rolou / 2) % 3) + 3) % 3;
        for (let i = 0; i < 13; i++)
          for (let j = 0; j < 7; j++) {
            let c = j < 2 ? "#9a6a3a" : j > 4 ? "#4a2a14" : "#7a5030";
            if ((j + fr) % 3 === 0) c = tom(c, 0.85);
            if (i === 0 || i === 12) c = j % 2 ? "#c8a070" : "#e0c090";
            ver ? px(j, i, c) : px(i, j, c);
          }
      });
    }
    case "ovo":
      return spriteCena("ovo", 6, 7, (g, px) => {
        for (let x = 0; x < 6; x++)
          for (let y = 0; y < 7; y++) {
            const dx = (x - 2.5) / 3,
              dy = (y - 3.6) / 3.4;
            if (dx * dx + dy * dy > 1) continue;
            px(x, y, dx + dy < -0.4 ? "#ffffff" : dx + dy > 0.5 ? "#c8c0b0" : "#f0eadc");
          }
        px(2, 3, "#c8473b");
        px(4, 4, "#c8473b");
      });
    case "metal": {
      const v = k.metal || "aco";
      if (v === "estatua")
        return spriteCena("m_estatua", 8, 14, (g, px) => {
          for (let x = 0; x < 8; x++) for (let y = 11; y < 14; y++) px(x, y, y === 11 ? "#d8d0c0" : "#a8a090");
          const b = "#b07a3a",
            vd = "#5ab0a0";
          for (let y = 1; y < 11; y++)
            for (let x = 2; x < 6; x++) {
              if (y < 3 && (x === 2 || x === 5)) continue;
              px(x, y, hash2(x, y, 3) < 0.25 ? vd : x === 2 ? tom(b, 1.25) : b);
            }
          px(1, 4, b);
          px(6, 3, b);
          px(6, 2, b);
        });
      if (v === "sino")
        return spriteCena("m_sino", 9, 11, (g, px) => {
          px(4, 0, "#6a4a2a");
          px(3, 1, "#6a4a2a");
          px(5, 1, "#6a4a2a");
          for (let y = 2; y < 11; y++) {
            const w = Math.min(4, 1 + Math.floor((y - 1) * 0.6));
            for (let x = 4 - w; x <= 4 + w; x++)
              px(x, y, y === 10 ? "#5a3a1a" : x < 4 - w + 1 ? "#d8a050" : hash2(x, y, 4) < 0.15 ? "#5ab0a0" : "#b07a3a");
          }
        });
      if (v === "bobina")
        return spriteCena("m_bobina", 8, 14, (g, px) => {
          for (let x = 1; x < 7; x++) for (let y = 11; y < 14; y++) px(x, y, "#3a3640");
          for (let y = 4; y < 11; y++) for (let x = 2; x < 6; x++) px(x, y, y % 2 ? "#c87a3a" : "#e09a5a");
          for (let x = 1; x < 7; x++)
            for (let y = 0; y < 4; y++) {
              const dx = (x - 3.5) / 2.6,
                dy = (y - 1.8) / 2;
              if (dx * dx + dy * dy <= 1) px(x, y, dx + dy < -0.4 ? "#ffffff" : "#c8d0d8");
            }
        });
      const cor = v === "oricalco" ? "#c8603a" : v === "braseiro" ? "#4a4048" : "#8a9ab0";
      return spriteCena("m_pilar" + v, 8, 14, (g, px) => {
        for (let x = 0; x < 8; x++) for (let y = 12; y < 14; y++) px(x, y, tom(cor, 0.6));
        for (let y = 2; y < 12; y++) for (let x = 2; x < 6; x++) px(x, y, x === 2 ? tom(cor, 1.3) : x === 5 ? tom(cor, 0.7) : cor);
        for (let x = 1; x < 7; x++) {
          px(x, 1, tom(cor, 1.1));
          px(x, 0, tom(cor, 0.8));
        }
        if (v === "braseiro") {
          px(3, 0, "#ffd34a");
          px(4, 0, "#e8603c");
        }
      });
    }
  }
  return null;
}
// marcos e objetos entram na fila de profundidade (ordenada pelo pé): quem está mais embaixo na tela fica na frente
export function desenharProps(ox, oy, fila) {
  const C = J.cena;
  for (const p of C.lista) {
    if (p.tipo === "frente") fila.push({ y: p.y, f: () => desenharFrente(p, ox, oy) });
    else fila.push({ y: p.y + p.r * 0.6, f: () => desenharUmProp(p, ox, oy) });
  }
}
// alguém da equipe (ou o Invocador) atrás de um objeto alto: o objeto fica translúcido para não esconder ninguém
export function equipeAtras(xc: number, yPe: number, w: number, h: number) {
  const dentro = (x: number, y: number) => y < yPe && y > yPe - h && Math.abs(x - xc) < w / 2;
  const P = J.jogador;
  if (dentro(P.x, P.y + 6)) return true;
  for (const s of R.selos) if (s.mon && s.x != null && dentro(s.x, s.y + 8)) return true;
  return false;
}
export function desenharFrente(p, ox: number, oy: number) {
  const s = spriteMarco(p);
  if (!s) return;
  const atras = equipeAtras(p.x, p.y, s.width, s.height * (s.base || 0.85));
  sombraContato(p.x - ox, p.y - oy + 1, s.width * 0.7, 0.45);
  p._alfa = (p._alfa ?? 1) + ((atras ? 0.45 : 1) - (p._alfa ?? 1)) * 0.2;
  lg.globalAlpha = p._alfa;
  // planta de primeiro plano balança com o vento (inclinação a partir da base) e treme quando alguém passa por trás
  const C = J.cena,
    vento = ((C && C.Wx) || 0) * 0.004,
    bal = Math.sin(J.t * 1.3 + p.x * 0.05) * 0.035 + vento + (atras ? Math.sin(J.t * 9) * 0.02 : 0),
    bx = Math.round(p.x - ox),
    by = Math.round(p.y - oy);
  lg.save();
  lg.translate(bx, by);
  lg.transform(1, 0, bal, 1, 0, 0);
  lg.drawImage(s, -s.width / 2, -s.height * (s.base || 0.85));
  lg.restore();
  lg.globalAlpha = 1;
}
export function desenharUmProp(p, ox: number, oy: number) {
  const spr = p.spriteFixo || spriteProp(p);
  if (!spr) return;
  const kq = p.caindo > 0 ? p.caindo / 0.7 : 1,
    w = Math.round(spr.width * p.esc * kq),
    h = Math.round(spr.height * p.esc * kq);
  if (kq < 1) lg.globalAlpha = kq;
  const bob = p.flut > 0 ? Math.round(Math.sin(J.t * 2.5 + p.x) * 1) : 0,
    lev = p.levita ? Math.round(6 + Math.sin(J.t * 8 + p.x) * 1.5) : 0,
    x = Math.round(p.x - ox - w / 2),
    y = Math.round(p.y - oy - h * (spr.base || 1) + p.r * 0.6) + bob - lev;
  if (p.tipo === "frente") return;
  if (x < -20 || y < -20 || x > VW + 20 || y > VH + 20) return;
  if (h > 22) {
    const at = equipeAtras(p.x, p.y + p.r * 0.6, w, h);
    p._alfa = (p._alfa ?? 1) + ((at ? 0.5 : 1) - (p._alfa ?? 1)) * 0.2;
  }
  if (p.flut > 0) {
    lg.fillStyle = "rgba(120,180,230,.3)";
    lg.beginPath();
    lg.ellipse(x + w / 2, y + h - 1.5, w * 0.6, 1.2, 0, 0, Math.PI * 2);
    lg.fill();
  } else sombraContato(p.x - ox, p.y - oy + p.r * 0.6 + 1, w * 1.05, 0.4);
  if (!p.flut && !p.levita && !(p.subindo > 0)) sombraProjetada(spr, x + w / 2, y + h, w, h, false, 1.1);
  if (p.flash > 0) {
    lg.drawImage(branco(spr), x, y, w, h);
    return;
  }
  if (p.subindo > 0) {
    const q = Math.max(0, 1 - p.subindo / 0.4);
    lg.save();
    lg.beginPath();
    lg.rect(x, y, w, h);
    lg.clip();
    lg.drawImage(spr, x, y + Math.round(h * (1 - q)), w, h);
    lg.restore();
    return;
  }
  if (p.levita) {
    lg.globalAlpha = 0.35;
    lg.drawImage(silhueta(spr, "#e8a0ff"), x - 1, y, w + 2, h + 1);
    lg.globalAlpha = 1;
  }
  if (p._alfa != null && p._alfa < 0.99) lg.globalAlpha *= p._alfa;
  lg.drawImage(spr, x, y, w, h);
  lg.globalAlpha = 1;
  if (p.ouro && Math.sin(J.t * 3 + p.x * 0.3) > 0.9) {
    lg.fillStyle = "#fff8d0";
    lg.fillRect(x + Math.floor(w * 0.3), y + Math.floor(h * 0.3), 1, 1);
  }
  if (p.carvao > 0) {
    lg.globalAlpha = p.carvao * 0.75;
    lg.drawImage(silhueta(spr, "#1a1214"), x, y, w, h);
    lg.globalAlpha = 1;
  }
  if (p.molhado > 0 && !p.mat.fixo) {
    lg.globalAlpha = 0.25;
    lg.drawImage(silhueta(spr, "#1a3050"), x, y, w, h);
    lg.globalAlpha = 1;
  }
  if (p.congela > 0) {
    lg.globalAlpha = 0.55;
    lg.drawImage(silhueta(spr, "#dff4ff"), x, y, w, h);
    lg.globalAlpha = 1;
  }
  if (p.mat.condutor && p.solo === "eletrico" && Math.random() < 0.3) {
    lg.fillStyle = "#fff3a0";
    lg.fillRect(x + Math.floor(Math.random() * w), y + Math.floor(Math.random() * h), 1, 1);
  }
}
export const cacheSil = new WeakMap(),
  cacheSilM = new WeakMap();
// silhueta com o tamanho do sprite (para virar o próprio sprite: estátua, ouro...). A silhueta comum é feita em alta resolução
// e por isso é bem maior: usada no lugar do sprite, o inimigo aparecia como um borrão cinza gigante cobrindo a tela.
export function silhuetaMundo(spr, cor) {
  let m = cacheSilM.get(spr);
  if (!m) {
    m = {};
    cacheSilM.set(spr, m);
  }
  if (m[cor]) return m[cor];
  const c = document.createElement("canvas");
  c.width = spr.width;
  c.height = spr.height;
  const g = c.getContext("2d");
  g.drawImage(spr, 0, 0);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = cor;
  g.fillRect(0, 0, c.width, c.height);
  const hi = silhueta(spr, cor);
  if (hi.width !== c.width) c._hi = hi;
  c.base = spr.base;
  c._pe = spr._pe;
  c._alvo = spr._alvo;
  m[cor] = c;
  return c;
}
export function silhueta(spr, cor) {
  const k = cor;
  let m = cacheSil.get(spr);
  if (!m) {
    m = {};
    cacheSil.set(spr, m);
  }
  if (m[k]) return m[k];
  const b = baseHi(spr),
    c = document.createElement("canvas");
  c.width = b.width;
  c.height = b.height;
  const g = c.getContext("2d");
  g.drawImage(b, 0, 0);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = cor;
  g.fillRect(0, 0, c.width, c.height);
  if (b !== spr) c._suave = true;
  m[k] = c;
  return c;
}
// detalhes do chão desenhados uma vez por pedaço (pedrinhas, rachaduras, flores, lajotas...)
export function detalhePedaco(cx, cy) {
  const C = J.cena,
    k = cx + ":" + cy;
  if (C.detalhes.has(k)) return C.detalhes.get(k);
  if (C.detalhes.size > 48) {
    const pk = C.detalhes.keys().next().value;
    C.detalhes.delete(pk);
  }
  const c = document.createElement("canvas");
  c.width = c.height = CH;
  const g = c.getContext("2d"),
    r = semente(C.u.id + "d" + k),
    base = COR[C.u.elemento];
  const px = (x: number, y: number, cor, w?: number, h?: number) => {
    g.fillStyle = cor;
    g.fillRect(Math.floor(x), Math.floor(y), w || 1, h || 1);
  };
  const lista = detalhesArte(r);
  if (lista) {
    C.detalhes.set(k, lista);
    return lista;
  }
  for (const tipo of C.kit.chao || []) {
    switch (tipo) {
      case "pedras":
        for (let i = 0; i < 8; i++) {
          const x = r() * CH,
            y = r() * CH,
            g1 = r() < 0.4;
          px(x, y, tom(base, 0.55), g1 ? 2 : 1, g1 ? 2 : 1);
          px(x, y, tom(base, 0.8));
        }
        break;
      case "rachaduras":
        for (let i = 0; i < 2; i++) {
          let x = r() * CH,
            y = r() * CH;
          const a = r() * 6.28;
          for (let s = 0; s < 12; s++) {
            x += Math.cos(a + (r() - 0.5) * 1.4) * 1.2;
            y += Math.sin(a + (r() - 0.5) * 1.4) * 1.2;
            px(x, y, tom(base, 0.14));
          }
        }
        break;
      case "flores":
        for (let i = 0; i < 7; i++) {
          const x = r() * CH,
            y = r() * CH,
            cor = escolha(["#f4e8f0", "#f2d23a", "#e87aa8", "#8ab0f0", "#f0f0f0"]);
          px(x, y + 1, "#3f7a34");
          px(x, y, cor);
          if (r() < 0.5) {
            px(x - 1, y, cor);
            px(x + 1, y, cor);
            px(x, y - 1, cor);
            px(x, y, "#f2d23a");
          }
        }
        break;
      case "ossos":
        for (let i = 0; i < 2; i++) {
          const x = r() * CH,
            y = r() * CH;
          if (r() < 0.3) {
            px(x, y, "#e8e0d0", 3, 3);
            px(x, y + 1, "#2a2420");
            px(x + 2, y + 1, "#2a2420");
          } else {
            px(x, y, "#e8e0d0", 4, 1);
            px(x - 1, y - 1, "#e8e0d0");
            px(x + 4, y + 1, "#e8e0d0");
          }
        }
        break;
      case "conchas":
        for (let i = 0; i < 5; i++) {
          const x = r() * CH,
            y = r() * CH;
          px(x, y, r() < 0.5 ? "#f4d8c0" : "#f0f0e8", 2, 2);
          px(x, y + 1, "#c8a088");
        }
        break;
      case "lajotas": {
        if (r() < 0.45) break;
        const ox0 = Math.floor(r() * 40),
          oy0 = Math.floor(r() * 40);
        g.globalAlpha = 0.45;
        for (let j = 0; j < 4; j++)
          for (let i = 0; i < 4; i++) {
            if (r() < 0.55) continue;
            const x = ox0 + i * 10,
              y = oy0 + j * 7 + (i % 2) * 3;
            if (x > CH - 9 || y > CH - 6) continue;
            g.fillStyle = mistura(tom(base, 0.3), "#8a8478", 0.6);
            g.fillRect(x, y, 9, 6);
            g.fillStyle = "rgba(0,0,0,.35)";
            g.fillRect(x, y + 5, 9, 1);
            g.fillRect(x + 8, y, 1, 6);
            g.fillStyle = "rgba(255,255,255,.12)";
            g.fillRect(x, y, 8, 1);
          }
        g.globalAlpha = 1;
        break;
      }
      case "ladrilhos":
        g.globalAlpha = 0.6;
        for (let i = 0; i < 3; i++) {
          const x = r() * (CH - 8),
            y = r() * (CH - 8);
          for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) px(x + a * 3, y + b * 3, (a + b) % 2 ? "#3fa8b8" : "#d6ab4f", 2, 2);
        }
        g.globalAlpha = 1;
        break;
      case "musgo":
        for (let i = 0; i < 14; i++) {
          const x = r() * CH,
            y = r() * CH;
          px(x, y, r() < 0.5 ? "#3a6a30" : "#4f8a3c", 1 + Math.floor(r() * 2), 1);
        }
        break;
      case "folhas":
        for (let i = 0; i < 10; i++) {
          const x = r() * CH,
            y = r() * CH;
          px(x, y, escolha(["#c8743a", "#d8a040", "#a84a2a", "#6a8a2a"]), 2, 1);
        }
        break;
      case "raizes":
        for (let i = 0; i < 2; i++) {
          let x = r() * CH,
            y = r() * CH;
          const a = r() * 6.28;
          for (let s = 0; s < 18; s++) {
            x += Math.cos(a + Math.sin(s * 0.5)) * 1.1;
            y += Math.sin(a + Math.sin(s * 0.5)) * 1.1;
            px(x, y, "#5a3a20");
          }
        }
        break;
      case "neve":
        for (let i = 0; i < 5; i++) {
          const x = r() * CH,
            y = r() * CH,
            w = 3 + Math.floor(r() * 6);
          g.fillStyle = "rgba(240,246,255,.55)";
          g.fillRect(x, y, w, 2);
          g.fillRect(x + 1, y - 1, w - 2, 1);
        }
        break;
    }
  }
  C.detalhes.set(k, c);
  return c;
}
export function desenharDetalhesChao(ox: number, oy: number) {
  const c0 = Math.floor(ox / CH),
    r0 = Math.floor(oy / CH);
  for (let cy = r0; cy <= r0 + Math.ceil(VH / CH) + 1; cy++)
    for (let cx = c0; cx <= c0 + Math.ceil(VW / CH) + 1; cx++) {
      const d = detalhePedaco(cx, cy);
      // arte importada: cada enfeite vai direto da folha original em alta resolução (antes saía de um canvas pequeno e ficava borrado)
      if (Array.isArray(d)) {
        for (const e of d) {
          lg.globalAlpha = e.a;
          lg.drawImage(e.s, cx * CH - ox + e.x, cy * CH - oy + e.y, e.w, e.w);
        }
        lg.globalAlpha = 1;
      } else lg.drawImage(d, cx * CH - ox, cy * CH - oy);
    }
}
// vegetação: cada folha é uma curva fina (traço suave), curvada pelo vento e pelo contato
export const BALDES = new Map();
export function balde(cor: string, lw?: number) {
  const k = cor + "|" + (lw || 0.8);
  let b = BALDES.get(k);
  if (!b) {
    b = { cor, lw: lw || 0.8, v: [], p: [] };
    BALDES.set(k, b);
  }
  return b;
}
export function desenharTufos(ox: number, oy: number) {
  const C = J.cena,
    V = VEG[C.veg];
  if (!V) return;
  for (const b of BALDES.values()) {
    b.v.length = 0;
    b.p.length = 0;
  }
  const c0 = Math.floor(ox / CEL) - 1,
    r0 = Math.floor(oy / CEL) - 1,
    nc = Math.ceil(VW / CEL) + 3,
    nr = Math.ceil(VH / CEL) + 4,
    pisca = Math.floor(J.t * 10),
    sub = C.kit.submerso;
  const capC = C.kit.cogu || "#c070ff",
    pintado = !!(chao && chao.suave);
  for (let j = 0; j < nr; j++)
    for (let i = 0; i < nc; i++) {
      const cx = c0 + i,
        cy = r0 + j,
        t = tufoInfo(cx, cy);
      if (!t) continue;
      if (QUAL < 2 && hash2(cx, cy, 91) > (QUAL === 1 ? 0.6 : 0.35)) continue;
      // sobre piso pintado, menos tufos soltos no chão comum (o piso já tem detalhe próprio)
      if (pintado && t === "chao" && hash2(cx, cy, 93) > 0.2) continue;
      if (hash2(cx, cy, 95) > 0.6) continue; // mapa menos poluído: 40% menos tufos em qualquer chão
      const x0 = cx * CEL + 1 + hash2(cx, cy, 43) * 6 - ox,
        y0 = cy * CEL + 2 + hash2(cx, cy, 47) * 5 - oy,
        k = cx + "," + cy,
        st = C.tufos.get(k),
        marca = C.marcas.get(k);
      // crescimento: grama nova (Natureza) brota aos poucos
      const sm = J.solo.get(k);
      let g = 1;
      if (sm && (t === "grama" || t === "vinha")) {
        g = Math.min(1, (J.t - (sm.ate - DUR[t])) * 1.6);
        if (g <= 0) continue;
      }
      if (t === "cinza") {
        balde("#2e2a30").p.push(x0, y0, 0.55, x0 + 2, y0 + 0.4, 0.45);
        continue;
      }
      const w = vento(cx * CEL + 4, cy * CEL + 4),
        wm = Math.hypot(w.x, w.y),
        rig = t === "gelo" ? 0.1 : 1,
        kv = 60 / V.k;
      let bx = (sub ? w.x / 45 : (w.x * wm) / (VREF * VREF)) * kv * rig,
        by = (sub ? w.y / 45 : (w.y * wm) / (VREF * VREF)) * kv * rig * 0.5;
      const bm = Math.hypot(bx, by);
      if (bm > 1.1) {
        bx *= 1.1 / bm;
        by *= 1.1 / bm;
      }
      if (st) {
        bx += st.bx;
        by += st.by;
      }
      const turb = (sub ? 0.12 : 0.06 + 0.18 * Math.min(1, wm / VREF)) * rig;
      const h1 = hash2(cx, cy, 51),
        nb = V.cogu ? 1 : V.n[0] + Math.floor(h1 * (V.n[1] - V.n[0] + 1));
      if (V.cogu) {
        const fl = Math.sin(J.t * 5 + h1 * 9) * turb,
          ex = (bx + fl) * 3,
          hh = 2 + h1 * 2,
          cw = h1 < 0.5 ? 1.6 : 2.3;
        balde("#e8e0d0", 0.9).v.push(x0, y0, x0 + ex * 0.3, y0 - hh * 0.6, x0 + ex, y0 - hh);
        balde(capC).p.push(x0 + ex, y0 - hh, cw);
        balde("#ffffff").p.push(x0 + ex - cw * 0.35, y0 - hh - cw * 0.3, cw * 0.3);
        continue;
      }
      let cores = V.cores;
      if (t === "fogo") cores = ["#3a2a20", (pisca + cx) % 2 ? "#e8603c" : "#ffb040", "#ffd34a"];
      else if (t === "gelo") cores = ["#4a6a7a", "#9ac4d8", "#f0fbff"];
      else if (t === "sombra") cores = ["#2a1a3a", "#4a2a60", "#7a4fb0"];
      else if (t === "luz") cores = [V.cores[0], V.cores[1], "#fff3c4"];
      else if (t === "vinha") cores = ["#1f4a1c", "#2f6a28", V.cores[2]];
      for (let b = 0; b < nb; b++) {
        const hb = hash2(cx * 7 + b, cy, 53),
          L = Math.max(
            1,
            (V.L[0] + hb * (V.L[1] - V.L[0])) *
              g *
              (t === "lama" ? 0.4 : t === "agua" && C.veg !== "junco" && !sub ? 0.5 : t === "vinha" ? 1.25 : 1)
          );
        const ofx = (hb - 0.5) * 4,
          fl = Math.sin(J.t * (sub ? 1.6 : 7) + hb * 12 + cx * 0.3) * turb,
          ddx = (bx + fl) * L,
          ddy = by * L,
          encurta = 1 - 0.3 * Math.min(1, bx * bx + by * by);
        const quebrada = V.quebra && marca,
          solta = V.solta === "sementes" && marca,
          Lv = quebrada ? Math.min(L, 2) : L;
        const bx0 = x0 + ofx,
          q = Lv / L,
          tx = bx0 + ddx * q * q,
          ty = y0 - Lv * encurta + ddy * q * q,
          mx = bx0 + ddx * q * q * 0.25,
          my = y0 - Lv * encurta * 0.55;
        const lw = Math.round(Math.max(0.5, 0.85 - Lv * 0.04) * 4) / 4;
        balde(cores[0], lw + 0.25).v.push(bx0, y0 + 0.3, bx0, y0 - Lv * 0.25, bx0 + ddx * 0.06, y0 - Lv * 0.35 * encurta); // pé mais escuro
        balde(quebrada ? cores[0] : cores[1], lw).v.push(bx0, y0, mx, my, tx, ty);
        if (!quebrada) {
          const ux = bx0 + (tx - bx0) * 0.7 + (mx - bx0) * 0.15,
            uy = y0 + (ty - y0) * 0.7;
          balde(cores[2], Math.round(lw * 3) / 4).v.push(ux, uy, (ux + tx) / 2, (uy + ty) / 2 - 0.2, tx, ty);
          if (V.cabeca) balde(cores[2]).p.push(tx, ty - 0.3, 0.75);
        }
        if (C.veg === "dente" && !solta && !quebrada) {
          balde("#f4f4ee").p.push(tx, ty - 1, 1.3);
        }
      }
    }
  lg.lineCap = "round";
  lg.lineJoin = "round";
  if (pintado) lg.globalAlpha = 0.82;
  for (const b of BALDES.values()) {
    if (b.v.length) {
      lg.strokeStyle = b.cor;
      lg.lineWidth = b.lw;
      lg.beginPath();
      const v = b.v;
      for (let i = 0; i < v.length; i += 6) {
        lg.moveTo(v[i], v[i + 1]);
        lg.quadraticCurveTo(v[i + 2], v[i + 3], v[i + 4], v[i + 5]);
      }
      lg.stroke();
    }
    if (b.p.length) {
      lg.fillStyle = b.cor;
      lg.beginPath();
      const p = b.p;
      for (let i = 0; i < p.length; i += 3) {
        lg.moveTo(p[i] + p[i + 2], p[i + 1]);
        lg.arc(p[i], p[i + 1], p[i + 2], 0, Math.PI * 2);
      }
      lg.fill();
    }
  }
  lg.lineWidth = 1;
  lg.lineCap = "butt";
  lg.globalAlpha = 1;
}
export function desenharCenaChao(ox: number, oy: number) {
  const C = J.cena;
  if (!C) return;
  for (const p of C.pegadas) {
    lg.globalAlpha = Math.min(1, (p.vida / p.max) * 1.5) * 0.45;
    lg.fillStyle = p.cor;
    lg.beginPath();
    lg.ellipse(p.x - ox, p.y - oy + 0.5, p.tam * 0.6, 0.5, 0, 0, Math.PI * 2);
    lg.fill();
  }
  lg.globalAlpha = 1;
  lg.strokeStyle = "#d8f0ff";
  lg.lineWidth = 1;
  for (const o of C.ondas) {
    lg.globalAlpha = o.vida * 0.5;
    lg.beginPath();
    lg.ellipse(o.x - ox, o.y - oy, o.r, o.r * 0.55, 0, 0, Math.PI * 2);
    lg.stroke();
  }
  lg.globalAlpha = 1;
  desenharTufos(ox, oy);
  for (const g of C.destrocos) {
    if (g.z >= 1) continue;
    const x = Math.round(g.x - ox),
      y = Math.round(g.y - oy);
    if (x < -4 || y < -4 || x > VW + 4 || y > VH + 4) continue;
    lg.globalAlpha = Math.min(1, g.vida);
    if (g.img) lg.drawImage(g.img, x - 3, y - 3);
    else {
      lg.fillStyle = g.cor;
      lg.beginPath();
      lg.ellipse(x, y, g.tam * 0.7 + 0.2, g.tam * 0.5 + 0.2, (g.x + g.y) * 0.3, 0, Math.PI * 2);
      lg.fill();
    }
  }
  lg.globalAlpha = 1;
}
export function desenharCenaObjetos(ox: number, oy: number, fila) {
  const C = J.cena;
  if (!C) return;
  desenharProps(ox, oy, fila);
  for (const g of C.destrocos) {
    if (g.z < 1) continue;
    const x = Math.round(g.x - ox),
      y = Math.round(g.y - oy);
    if (x < -4 || y < -40 || x > VW + 4 || y > VH + 4) continue;
    lg.globalAlpha = Math.min(1, g.vida) * 0.25;
    lg.fillStyle = "#000";
    lg.beginPath();
    lg.ellipse(x, y, g.tam * 0.7, 0.45, 0, 0, Math.PI * 2);
    lg.fill();
    lg.globalAlpha = Math.min(1, g.vida);
    if (g.img) lg.drawImage(g.img, x - 3, Math.round(y - g.z) - 3);
    else {
      lg.fillStyle = g.cor;
      lg.beginPath();
      lg.ellipse(x, y - g.z, g.tam * 0.7 + 0.2, g.tam * 0.5 + 0.2, (g.x + g.y) * 0.3, 0, Math.PI * 2);
      lg.fill();
    }
  }
  lg.globalAlpha = 1;
}
export function desenharCenaAr(ox: number, oy: number) {
  const C = J.cena;
  if (!C) return;
  // fumaça
  for (const f of C.fumaca) {
    const a = Math.min(1, (f.vida / f.max) * 1.4) * 0.32;
    lg.globalAlpha = a;
    lg.drawImage(bolhaCor(f.cor), f.x - ox - f.r, f.y - f.z - oy - f.r, f.r * 2, f.r * 2);
  }
  lg.globalAlpha = 1;
  // redemoinhos: coluna translúcida que gira
  for (const w of C.vort) {
    const a = Math.min(1, w.vida / 1.5);
    lg.globalAlpha = 0.16 * a;
    lg.drawImage(bolhaCor(w.fogo ? "#ff8a3d" : "#d8c090"), w.x - ox - w.r * 1.6, w.y - oy - w.r * 3.2, w.r * 3.2, w.r * 3.6);
    lg.globalAlpha = 0.5 * a;
    lg.strokeStyle = w.fogo ? "#ffb060" : "#e8d8b0";
    for (let i = 0; i < 4; i++) {
      const ang = J.t * 9 + i * 1.57,
        hy = i * 6;
      lg.beginPath();
      lg.ellipse(w.x - ox, w.y - oy - hy, w.r * (0.5 + i * 0.18), w.r * 0.25, 0, ang, ang + 2.2);
      lg.stroke();
    }
  }
  lg.globalAlpha = 1;
  // partículas sem brilho próprio
  for (const p of C.ar) {
    if (p.luz) continue;
    const x = Math.round(p.x - ox),
      y = Math.round(p.y - oy - p.z);
    if (x < -2 || y < -2 || x > VW + 2 || y > VH + 2) continue;
    const a = Math.min(1, (p.vida / Math.min(1, p.max)) * 1.2);
    lg.globalAlpha = p.k === "poeira" ? a * 0.55 : p.k === "garoa" ? 0.45 : p.k === "chuva" ? 0.6 : a;
    if (p.k === "chuva" || p.k === "garoa") {
      const L = p.k === "chuva" ? 5 : 3,
        sx = (-p.vx / Math.abs(p.vz)) * L,
        sy = L;
      lg.strokeStyle = p.cor;
      lg.beginPath();
      lg.moveTo(x + 0.5, y + 0.5);
      lg.lineTo(x + 0.5 + sx, y + 0.5 - sy);
      lg.stroke();
      continue;
    }
    if (p.k === "bolhas") {
      lg.strokeStyle = p.cor;
      lg.beginPath();
      lg.arc(x + 0.5, y + 0.5, p.tam, 0, Math.PI * 2);
      lg.stroke();
      lg.fillStyle = "#ffffff";
      lg.fillRect(x, y - p.tam + 1, 1, 1);
      continue;
    }
    const fx = p.x - ox,
      fy = p.y - oy - p.z,
      folha = p.k === "folhas" || p.k === "petalas";
    if (p.z > 1 && folha) {
      lg.globalAlpha = a * 0.2;
      lg.fillStyle = "#000";
      lg.beginPath();
      lg.ellipse(fx, p.y - oy, 0.8, 0.4, 0, 0, Math.PI * 2);
      lg.fill();
      lg.globalAlpha = a;
    }
    lg.fillStyle = p.cor;
    lg.beginPath();
    if (folha) {
      const giro = Math.sin(J.t * 8 + p.fase);
      lg.ellipse(fx, fy, Math.max(0.35, Math.abs(giro)) * p.tam * 0.7 + 0.2, p.tam * 0.4 + 0.15, J.t * 2 + p.fase, 0, Math.PI * 2);
    } else lg.arc(fx, fy, Math.max(0.35, p.tam * 0.45), 0, Math.PI * 2);
    lg.fill();
  }
  lg.globalAlpha = 1;
  // rastros de vento
  if (C.rastros.length) {
    lg.strokeStyle = "#ffffff";
    lg.lineWidth = 0.45;
    lg.lineCap = "round";
    for (const r of C.rastros) {
      const w = vento(r.x, r.y),
        m = Math.hypot(w.x, w.y) || 1,
        ux = w.x / m,
        uy = w.y / m;
      lg.globalAlpha = Math.sin((r.vida / r.max) * Math.PI) * 0.4;
      lg.beginPath();
      lg.moveTo(r.x - ox, r.y - oy);
      lg.quadraticCurveTo(
        r.x - ox - ux * r.len * 0.5 - uy * Math.sin(J.t * 6 + r.f) * 2,
        r.y - oy - uy * r.len * 0.5 + ux * Math.sin(J.t * 6 + r.f) * 2,
        r.x - ox - ux * r.len,
        r.y - oy - uy * r.len
      );
      lg.stroke();
    }
    lg.globalAlpha = 1;
    lg.lineWidth = 1;
    lg.lineCap = "butt";
  }
  // névoa e sombras das nuvens
  for (const n of C.nevoa) {
    lg.globalAlpha = n.a * (0.8 + 0.2 * Math.sin(J.t * 0.4 + n.f));
    lg.drawImage(bolhaCor(C.kit.nevoa), n.x - ox - n.r, n.y - oy - n.r * 0.6, n.r * 2, n.r * 1.2);
  }
  for (const n of C.nuvens) {
    lg.globalAlpha = n.a;
    lg.drawImage(bolhaCor("#0a0814"), n.x - ox - n.r, n.y - oy - n.r * 0.7, n.r * 2, n.r * 1.4);
  }
  lg.globalAlpha = 1;
  // aviso do relâmpago
  if (C.aviso) {
    const a = C.aviso,
      q = 1 - a.t / 0.9;
    lg.strokeStyle = "#e8f0ff";
    lg.globalAlpha = 0.3 + 0.5 * q * Math.abs(Math.sin(J.t * 30));
    lg.beginPath();
    lg.ellipse(a.x - ox, a.y - oy, 22 * (1 - q * 0.4), 12 * (1 - q * 0.4), 0, 0, Math.PI * 2);
    lg.stroke();
    lg.globalAlpha = 1;
  }
}
export function desenharCenaLuz(ox: number, oy: number) {
  const C = J.cena;
  if (!C) return;
  for (const p of C.ar) {
    if (!p.luz) continue;
    const x = Math.round(p.x - ox),
      y = Math.round(p.y - oy - p.z);
    if (x < -2 || y < -2 || x > VW + 2 || y > VH + 2) continue;
    const q = p.vida / p.max;
    if (p.k === "brasas") {
      lg.fillStyle = q > 0.6 ? "#ffd34a" : q > 0.3 ? "#ff8a3d" : "#c8473b";
      lg.globalAlpha = Math.min(1, q * 2) * (0.7 + 0.3 * Math.sin(J.t * 20 + p.fase));
    } else if (p.k === "vagalumes") {
      const pis = Math.max(0, Math.sin(J.t * 2.2 + p.fase));
      lg.fillStyle = p.cor;
      lg.globalAlpha = pis * Math.min(1, p.vida);
      if (pis > 0.6) {
        lg.globalAlpha = pis * 0.25;
        lg.fillRect(x - 1, y - 1, 3, 3);
        lg.globalAlpha = pis;
      }
    } else {
      lg.fillStyle = p.cor;
      lg.globalAlpha = Math.min(1, q * 2) * 0.8;
    }
    lg.fillRect(x, y, 1, 1);
  }
  // chamas dos objetos em chamas e pavios
  for (const p of C.lista) {
    if (p.queima <= 0 && !(p.pavio > 0)) continue;
    const x = p.x - ox,
      y = p.y - oy - p.r * 1.2;
    if (p.queima > 0)
      for (let i = 0; i < 5; i++) {
        const h = Math.floor(Math.random() * 5);
        lg.fillStyle = h > 3 ? "#fff3a0" : h > 1 ? "#ffb040" : "#e8603c";
        lg.globalAlpha = 0.9;
        lg.fillRect(Math.round(x + rnd(-p.r, p.r)), Math.round(y - h - C.Wy * 0.03), 1, h + 1);
      }
    lg.globalAlpha = 0.18;
    lg.fillStyle = p.queima > 0 ? "#ff8a3d" : "#ffd34a";
    lg.beginPath();
    lg.arc(x, y + 3, p.queima > 0 ? 9 : 4, 0, Math.PI * 2);
    lg.fill();
  }
  for (const g of C.destrocos)
    if (g.brilho && Math.sin(J.t * 9 + g.x) > 0.85) {
      lg.globalAlpha = 0.9;
      lg.fillStyle = "#ffffff";
      lg.fillRect(Math.round(g.x - ox), Math.round(g.y - oy - g.z), 1, 1);
    }
  for (const p of C.lista)
    if (p.tipo === "cristal" && Math.sin(J.t * 2 + p.x) > 0.97) {
      lg.globalAlpha = 0.8;
      lg.fillStyle = "#ffffff";
      lg.fillRect(Math.round(p.x - ox) - 1, Math.round(p.y - oy - 10), 3, 1);
      lg.fillRect(Math.round(p.x - ox), Math.round(p.y - oy - 11), 1, 3);
    }
  // cáusticas no fundo do mar
  if (C.causticas) {
    const fr = C.causticas[Math.floor(C.t * 6) % 8],
      sx = (((Math.round(-ox + C.t * 4) % 64) + 64) % 64) - 64,
      sy = (((Math.round(-oy + C.t * 2) % 64) + 64) % 64) - 64;
    lg.globalAlpha = 0.13;
    for (let y = sy; y < VH; y += 64) for (let x = sx; x < VW; x += 64) lg.drawImage(fr, x, y);
  }
  // relâmpago
  for (const r of C.raios) {
    lg.globalAlpha = r.vida / r.max;
    lg.strokeStyle = "#ffffff";
    lg.lineWidth = 1;
    lg.beginPath();
    r.pts.forEach(([x, y], i) => (i ? lg.lineTo(x - ox, y - oy) : lg.moveTo(x - ox, y - oy)));
    lg.stroke();
    lg.strokeStyle = "#9fc0ff";
    lg.globalAlpha *= 0.5;
    lg.beginPath();
    r.pts.forEach(([x, y], i) => (i ? lg.lineTo(x - ox + 1, y - oy) : lg.moveTo(x - ox + 1, y - oy)));
    lg.stroke();
  }
  lg.globalAlpha = 1;
}
// brilho na tela cheia: objetos em chamas, explosões e relâmpagos iluminam o entorno
export function desenharCenaBrilho(ox: number, oy: number) {
  const C = J.cena;
  if (!C) return;
  ctx.globalCompositeOperation = "lighter";
  const luz = (x: number, y: number, r: number, cor: string, a: number) => {
    const X = (x - ox) * S,
      Y = (y - oy) * S,
      RR = r * S,
      gr = ctx.createRadialGradient(X, Y, 0, X, Y, RR);
    gr.addColorStop(0, `rgba(${cor},${a})`);
    gr.addColorStop(1, `rgba(${cor},0)`);
    ctx.fillStyle = gr;
    ctx.fillRect(X - RR, Y - RR, RR * 2, RR * 2);
  };
  let n = 0;
  for (const p of C.lista) {
    if (p.queima > 0 && n++ < 6) luz(p.x, p.y - p.r, 34, "255,150,60", 0.22 + 0.05 * Math.sin(J.t * 17 + p.x));
    if (p.tipo === "luz") luz(p.x, p.y - 12, 44, "255,190,110", 0.2 + 0.04 * Math.sin(J.t * 9 + p.x));
  }
  for (const w of C.vort) if (w.fogo) luz(w.x, w.y - 8, 44, "255,140,50", 0.3);
  for (const l of C.luzes || []) luz(l.x, l.y, l.r, l.cor, (0.5 * l.vida) / l.max);
  if (QUAL >= 1 && !SIM.ativo && J.inimigos) {
    for (const s of R.selos) {
      if (!s.mon || s.x == null) continue;
      const [r, g, b] = hexRgb(COR[elementoDe(s)]);
      luz(s.x, s.y, 34, `${r},${g},${b}`, 0.1 + 0.08 * nivelEscuro());
    }
  }
  // golpes e projéteis iluminam o chão em volta, de dia também; com muita coisa na tela cada luz fica mais fraca (não estoura em branco)
  if (QUAL >= 1 && !SIM.ativo) {
    const fl = J.flashes || [],
      np = Math.min(24, J.proj.length),
      tot = fl.length + np * 0.5,
      orc = Math.min(1, 7 / Math.max(1, tot)),
      dia = 1 - nivelEscuro();
    for (const f of fl) {
      const q = f.t / f.max,
        [r, g, b] = hexRgb(f.cor && f.cor[0] === "#" ? f.cor : "#ffe9a0");
      luz(f.x, f.y, f.r * 0.9, `${r},${g},${b}`, (1 - q) * (1 - q) * 0.32 * orc * (0.6 + dia * 0.4));
    }
    for (let i = 0; i < np; i++) {
      const p = J.proj[i],
        v = vEl(p.el),
        [r, g, b] = hexRgb(v.c1);
      luz(p.x, p.y, p.alvo || p.explode ? 22 : 13, `${r},${g},${b}`, 0.16 * orc);
    }
  }
  ctx.globalCompositeOperation = "source-over";
}
// sombras de nuvens passando devagar pelo chão (só nos mapas a céu aberto e de dia)
export const SEM_CEU = new Set(["centro_terra", "mar_profundo", "atlantida", "laboratorio", "xibalba"]);
export let NUVENS = null;
// desenha as sombras de nuvem num contexto qualquer (k = pixels por pixel de mundo); usado dentro da camada de luz (sem passada extra)
export function nuvensEm(g, ox: number, oy: number, k: number) {
  const u = UNIV[R.universo];
  if (QUAL < 1 || SIM.ativo || !u || SEM_CEU.has(u.id) || (u.luz && u.luz.noite)) return;
  const A = 0.13 * (1 - crepusculo() * 0.6);
  if (A < 0.03) return;
  if (!NUVENS) desenharNuvens(null, null, true);
  const esc = 4.4,
    T = 128 * esc,
    px = (((ox + J.t * 7) % T) + T) % T,
    py = (((oy + J.t * 3) % T) + T) % T;
  if (!NUVENS.patL || NUVENS.patCtx !== g) {
    NUVENS.patL = g.createPattern(NUVENS.c, "repeat");
    NUVENS.patCtx = g;
  }
  g.save();
  g.imageSmoothingEnabled = true;
  g.globalAlpha = A;
  g.scale(k, k);
  g.translate(-px, -py);
  g.scale(esc, esc);
  g.fillStyle = NUVENS.patL;
  g.fillRect(0, 0, (g.canvas.width / k + T) / esc, (g.canvas.height / k + T) / esc);
  g.restore();
}
export function desenharNuvens(ox: number, oy: number, soCriar?: boolean) {
  const u = UNIV[R.universo];
  if (!soCriar && J._nuvemFeita) return;
  if (!soCriar && (QUAL < 2 || SIM.ativo || !u || SEM_CEU.has(u.id) || (u.luz && u.luz.noite))) return;
  const A = 0.13 * (1 - crepusculo() * 0.6);
  if (!soCriar && A < 0.03) return;
  if (!NUVENS) {
    const T = 128,
      c = document.createElement("canvas");
    c.width = c.height = T;
    const g = c.getContext("2d"),
      r = semente("nuvens");
    // manchas macias espalhadas, repetidas nas bordas para emendar
    for (let i = 0; i < 22; i++) {
      const x = r() * T,
        y = r() * T,
        rr = 10 + r() * 26,
        a = 0.25 + r() * 0.35;
      for (const dx of [-T, 0, T])
        for (const dy of [-T, 0, T]) {
          const gr = g.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, rr);
          gr.addColorStop(0, `rgba(0,0,0,${a})`);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.fillRect(x + dx - rr, y + dy - rr, rr * 2, rr * 2);
        }
    }
    NUVENS = { c, pat: null };
  }
  if (soCriar) return;
  const esc = 4.4,
    T = 128 * esc,
    px = (((ox + J.t * 7) % T) + T) % T,
    py = (((oy + J.t * 3) % T) + T) % T; // vento leve para a direita
  if (!NUVENS.pat) NUVENS.pat = lg.createPattern(NUVENS.c, "repeat");
  const suave = lg.imageSmoothingEnabled;
  lg.imageSmoothingEnabled = true;
  lg.save();
  lg.globalAlpha = A;
  lg.translate(-px, -py);
  lg.scale(esc, esc);
  lg.fillStyle = NUVENS.pat;
  lg.fillRect(0, 0, (VW + T) / esc, (VH + T) / esc);
  lg.restore();
  lg.imageSmoothingEnabled = suave;
}
