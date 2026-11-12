// Elementar · estrutura do mapa: abismos, pontes, lagos, praças, construções, fauna e cena de abertura
import "./07c_cenario_arte.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { $, COR, ctx, cv, H, hexRgb, J, lg, mistura, R, relatar, rnd, semente, SIM, UNIV, VH, VW, W } from "./01_nucleo.js";
import { morrer, texto } from "./02_combate.js";
import { CEL, frio, hash2, soloEm } from "./04_ambiente.js";
import { ARTE_IMG } from "./05_arte.js";
import { QUAL } from "./06_loop.js";
import { bolhaCor, particulaAr, vento } from "./07_cenario.js";
import { silhueta } from "./07b_cenario_desenho.js";
import { bboxCelula, celulaArte, folhaU, temArteU } from "./07c_cenario_arte.js";
import { evento } from "./08e_conquistas.js";
import { passiva } from "./08f_lendas.js";
import { criarProp } from "./09b_chefes.js";
// ================================================================ estrutura do mapa: abismos, lagos, praças, construções, fauna e cena de abertura
// O mapa continua infinito. Em universos com "estrutura" (dados/fonte_cenario.py), cada zona pode ganhar uma peça grande.
// Tudo tem forma geométrica conhecida (elipses e faixas), então a arte e a física usam a mesma área.
export function estruturaU() {
  const u = UNIV[R.universo];
  return (u && u.estrutura) || null;
}
export function zonaPeca(C: Cena, zx, zy) {
  if (!C.zonas) C.zonas = new Map();
  const k = zx + ":" + zy;
  if (C.zonas.has(k)) return C.zonas.get(k);
  const E = estruturaU(),
    Z = E.zona || 320,
    r = semente(R.universo + "z" + k + "#" + R.profundidade);
  let f: PecaCenario = null;
  const x = zx * Z + Z / 2 + (r() - 0.5) * Z * 0.3,
    y = zy * Z + Z / 2 + (r() - 0.5) * Z * 0.3,
    sorte = r();
  if (Math.abs(x) > 130 || Math.abs(y) > 130) {
    let acc = 0;
    for (const [tipo, p] of Object.entries(E.pecas as Record<string, number>)) {
      acc += p;
      if (sorte < acc) {
        f = { tipo, x, y, id: k };
        break;
      }
    }
  }
  if (f) {
    const v = (a: number, b: number) => a + r() * (b - a);
    if (f.tipo === "abismo") {
      f.rx = v(55, 95);
      f.ry = v(42, 70);
      f.fs = [r() * 6.28, r() * 6.28, r() * 6.28];
      if (r() < (E.chance_ponte || 0)) f.ponte = r() < 0.5 ? "h" : "v";
    } else if (f.tipo === "lago") {
      f.rx = v(40, 60);
      f.ry = f.rx * 0.62;
    } else if (f.tipo === "praca") {
      f.rx = 58;
      f.ry = 44;
    } else if (f.tipo === "construcao") {
      f.rx = 22;
      f.ry = 10;
    }
  }
  C.zonas.set(k, f);
  return f;
}
export function pecasPerto(x: number, y: number) {
  const E = estruturaU();
  if (!E || !J.cena) return [];
  const Z = E.zona || 320,
    zx = Math.floor(x / Z),
    zy = Math.floor(y / Z),
    C = J.cena;
  // as peças de cada zona nunca mudam: a lista de vizinhas fica guardada por zona
  if (!C.vizinhas) C.vizinhas = new Map();
  const k = zx * 100003 + zy;
  let out = C.vizinhas.get(k);
  if (out) return out;
  out = [];
  for (let j = -1; j <= 1; j++)
    for (let i = -1; i <= 1; i++) {
      const f = zonaPeca(C, zx + i, zy + j);
      if (f) out.push(f);
    }
  C.vizinhas.set(k, out);
  return out;
}
export const naPonte = (f: PecaCenario, x: number, y: number) =>
  f.ponte === "h" ? Math.abs(y - f.y) < 8 : f.ponte === "v" ? Math.abs(x - f.x) < 8 : false;
// o ponto está no vazio? (m = margem: positiva alarga o buraco)
// borda irregular do abismo (rocha quebrada, não uma elipse perfeita): raio relativo pelo ângulo, entre ~0,8 e ~1,2
export function raioAbismo(f: PecaCenario, a: number) {
  const s = f.fs || [0, 0, 0];
  return 1 + 0.1 * Math.sin(3 * a + s[0]) + 0.06 * Math.sin(5 * a + s[1]) + 0.035 * Math.sin(9 * a + s[2]);
}
export function abismoEm(x: number, y: number, m: number) {
  m = m || 0;
  for (const f of pecasPerto(x, y)) {
    if (f.tipo !== "abismo" || Math.abs(x - f.x) > f.rx * 1.22 + m || Math.abs(y - f.y) > f.ry * 1.22 + m) continue;
    const dx = (x - f.x) / (f.rx + m),
      dy = (y - f.y) / (f.ry + m);
    if (dx * dx + dy * dy < raioAbismo(f, Math.atan2(dy, dx)) ** 2 && !naPonte(f, x, y)) return f;
  }
  return null;
}
export function lagoEm(x: number, y: number) {
  for (const f of pecasPerto(x, y)) {
    if (f.tipo !== "lago" || Math.abs(x - f.x) > f.rx || Math.abs(y - f.y) > f.ry) continue;
    const dx = (x - f.x) / f.rx,
      dy = (y - f.y) / f.ry;
    if (dx * dx + dy * dy < 1) return f;
  }
  return null;
}
// solo natural: dentro do lago é água (no frio, gelo)
export function soloLago() {
  const t = (estruturaU() || {}).lago_solo || "agua";
  return t === "agua" && frio() ? "gelo" : t;
}
export function soloEstrutura(cx: number, cy: number) {
  if (!estruturaU() || !J.cena) return null;
  const x = cx * CEL + 4,
    y = cy * CEL + 4;
  if (lagoEm(x, y)) return soloLago();
  return null;
}
// empurra para fora do abismo: para a borda mais próxima ou para a ponte, o que estiver mais perto
export function sairDoAbismo(o: Ponto, r: number) {
  const f = abismoEm(o.x, o.y, r);
  if (!f) return false;
  const dx = o.x - f.x,
    dy = o.y - f.y,
    a = Math.atan2(dy / (f.ry + r), dx / (f.rx + r)),
    bx = f.x + Math.cos(a) * (f.rx + r + 0.5),
    by = f.y + Math.sin(a) * (f.ry + r + 0.5);
  let tx = bx,
    ty = by;
  if (f.ponte) {
    const px = f.ponte === "h" ? o.x : f.x,
      py = f.ponte === "h" ? f.y : o.y;
    if (Math.hypot(px - o.x, py - o.y) < Math.hypot(bx - o.x, by - o.y)) {
      tx = f.ponte === "h" ? o.x : f.x + Math.sign(o.x - f.x || 1) * 7;
      ty = f.ponte === "h" ? f.y + Math.sign(o.y - f.y || 1) * 7 : o.y;
    }
  }
  o.x = tx;
  o.y = ty;
  return true;
}
// quanto o ponto entrou no buraco (0 = borda, 1 = centro)
export function fundoDoAbismo(x: number, y: number) {
  const f = abismoEm(x, y, 0);
  if (!f) return 0;
  const dx = (x - f.x) / f.rx,
    dy = (y - f.y) / f.ry;
  return 1 - Math.sqrt(dx * dx + dy * dy) / raioAbismo(f, Math.atan2(dy, dx));
}
export function voa(e: Inimigo) {
  const d = e.def;
  return e.chefe || e.mini || !d || d.andar === "voa" || d.andar === "flutua" || d.corpo === "espectro";
}
export function atualizarEstrutura(dt: number) {
  const E = estruturaU(),
    C = J.cena;
  if (!E || !C) return;
  const P = J.jogador;
  // construções e luzes da praça viram objetos fixos quando a zona chega perto
  for (const f of pecasPerto(P.x, P.y)) {
    if (f.criado) continue;
    f.criado = true;
    if (f.tipo === "construcao" && temArteU("pecas")) criarProp("construcao", f.x, f.y);
    if (f.tipo === "praca" && temArteU("props"))
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        const l = criarProp("luz", f.x + Math.cos(a) * f.rx * 0.95, f.y + Math.sin(a) * f.ry * 0.95);
        if (l) l.idx = 6;
      }
  }
  if (!(J.dashT > 0 && passiva("atravessa_abismo"))) sairDoAbismo(P, 4);
  // chefes voam por cima do vazio, mas não ficam parados sobre ele (senão saem do alcance da equipe)
  if (J.chefeVivo || J.miniFeito)
    for (const e of J.inimigos)
      if ((e.chefe || e.mini) && e.hp > 0 && !e.dash && !e.noAr && !e.oculto && abismoEm(e.x, e.y, 0)) {
        const f = abismoEm(e.x, e.y, 0),
          dx = e.x - f.x,
          dy = e.y - f.y,
          d = Math.hypot(dx, dy) || 1;
        e.x += (dx / d) * 60 * dt;
        e.y += (dy / d) * 60 * dt;
      }
  // inimigos andando: empurrados para a borda; se um golpe os jogou fundo no buraco, caem
  // sem abismo nas zonas vizinhas não há o que conferir; com abismo, confere metade dos inimigos por quadro
  const temAbismo = pecasPerto(P.x, P.y).some(f => f.tipo === "abismo"),
    parA = (C.quadroA = (C.quadroA || 0) + 1) & 1,
    LI = J.inimigos;
  if (temAbismo)
    for (let i = parA; i < LI.length; i += 2) {
      const e = LI[i];
      if (e.hp <= 0 || voa(e) || Math.abs(e.x - P.x) > VW || Math.abs(e.y - P.y) > VH) continue;
      if (fundoDoAbismo(e.x, e.y) > 0.12) {
        queda(e.x, e.y, e.spr, e.esc || 1);
        texto(e.x, e.y - 10, "Caiu!", "#e8e0ff", 12);
        evento("queda");
        e.semCadaver = true;
        e.hp = 0;
        morrer(e);
        continue;
      }
      if (sairDoAbismo(e, e.r * 0.6)) {
        const f = abismoEm(e.x, e.y, e.r + 2) || pecasPerto(e.x, e.y).find(g => g.tipo === "abismo");
        if (f) {
          const dx = e.x - f.x,
            dy = e.y - f.y,
            d = Math.hypot(dx, dy) || 1,
            lado = (e.semente || 1) % 2 ? 1 : -1;
          e.x += (-dy / d) * lado * e.v * 0.5 * dt * 2;
          e.y += (dx / d) * lado * e.v * 0.5 * dt * 2;
        }
      }
    }
  // objetos empurrados para o vazio caem; cristais no chão escorregam para a beirada (nunca ficam perdidos)
  if (temAbismo) {
    for (const p of C.lista) {
      if (p.morto || p.mat.fixo || p.caindo) continue;
      if (abismoEm(p.x, p.y, -p.r * 0.4)) {
        p.caindo = 0.7;
        p.vx *= 0.3;
        p.vy *= 0.3;
      }
    }
    for (const g of C.destrocos) if (g.z < 1 && abismoEm(g.x, g.y, 0)) g.vida = Math.min(g.vida, 0.2);
    {
      const G = J.gemas;
      for (let i = parA; i < G.length; i += 2) sairDoAbismo(G[i], 2);
    } // cristais: metade por quadro (eram centenas de conferências por quadro)
    // ovos e monstros selvagens nunca ficam no vazio (senão ficam inalcançáveis)
    for (const o of J.ovosMapa) sairDoAbismo(o, 5);
    for (const o of J.selvagens) sairDoAbismo(o, 5);
    if (J.ovoAnc) sairDoAbismo(J.ovoAnc, 6);
  }
  for (const p of C.lista) {
    if (p.caindo > 0) {
      p.caindo -= dt;
      if (p.caindo <= 0) {
        p.morto = true;
      }
    }
  }
  atualizarFauna(C, dt);
}
export function queda(x: number, y: number, spr: HTMLCanvasElement, esc: number) {
  J.quedas = J.quedas || [];
  J.quedas.push({ x, y, spr, esc, t: 0 });
}
// ---------------------------------------------------------------- desenho: peças planas, abismo com paralaxe, paredões, ponte
export function fundoAbismo() {
  const img = folhaU("fundo");
  if (img) return img;
  const C = J.cena;
  if (C.fundoProc) return C.fundoProc;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#cfdcea";
  g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 26; i++) {
    const x = (i * 53) % 128,
      y = (i * 37) % 128,
      r = 10 + ((i * 7) % 18);
    for (const [dx, dy] of [
      [0, 0],
      [128, 0],
      [-128, 0],
      [0, 128],
      [0, -128]
    ] as [number, number][]) {
      g.globalAlpha = 0.55;
      g.drawImage(bolhaCor(C, i % 3 ? "#ffffff" : "#e8f0f8"), x - r + dx, y - r + dy, r * 2, r * 2);
    }
  }
  C.fundoProc = c;
  return c;
}
// paredão do abismo: a folha tem 4 rochas (linha 1) e 4 quadros de cachoeira (linha 2), cada uma com margem transparente dos lados.
// Fatiar a célula inteira fazia uma fileira de blocos com buracos e topos repetidos; aqui cada rocha é recortada pelo desenho
// (sem as bordas irregulares) e as 4 viram uma faixa contínua, alinhadas pelo topo da grama
export function faixaParedao(img) {
  if (!img) return null;
  if (img._faixa) return img._faixa;
  const cw = img.width / 4,
    ch = img.height / 2,
    t = document.createElement("canvas");
  t.width = img.width;
  t.height = img.height;
  const tg = t.getContext("2d")!;
  tg.drawImage(img, 0, 0);
  let d;
  try {
    d = tg.getImageData(0, 0, t.width, t.height).data;
  } catch (e) {
    return null;
  }
  const caixa = (c: number, r: number) => {
    let x0 = 1e9,
      x1 = -1,
      y0 = 1e9;
    for (let y = r * ch; y < (r + 1) * ch; y++)
      for (let x = c * cw; x < (c + 1) * cw; x++)
        if (d[(y * t.width + x) * 4 + 3] > 40) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
        }
    return x1 < 0 ? null : { x0, x1, y0 };
  };
  const linha = (r: number) => {
    const bs = [0, 1, 2, 3].map(c => caixa(c, r)).filter(Boolean);
    return bs.map(b => {
      const w = b.x1 - b.x0 + 1,
        m = Math.round(w * 0.12);
      return { sx: b.x0 + m, sw: w - 2 * m, sy: b.y0 };
    });
  };
  const rochas = linha(0),
    quedas = linha(1);
  if (!rochas.length) return null;
  const H = Math.round(ch * 0.82),
    W = rochas.reduce((a, b) => a + b.sw, 0),
    c = document.createElement("canvas");
  c.width = Math.max(
    W,
    quedas.reduce((a, b) => a + b.sw, 0)
  );
  c.height = H * 2;
  const g = c.getContext("2d")!;
  let x = 0;
  for (const b of rochas) {
    g.drawImage(img, b.sx, b.sy, b.sw, H, x, 0, b.sw, H);
    x += b.sw;
  }
  const qs = [];
  x = 0;
  for (const b of quedas) {
    g.drawImage(img, b.sx, b.sy, b.sw, H, x, H, b.sw, H);
    qs.push({ x, w: b.sw });
    x += b.sw;
  }
  img._faixa = { c, w: W, h: H, quedas: qs.length ? qs : [{ x: 0, w: W }] };
  return img._faixa;
}
// ponte: recorta a ponte pelo desenho (a célula tem muita margem). De frente (atravessando na horizontal) usa tudo, com os arcos;
// na vertical usa só o tabuleiro e os parapeitos (as linhas que cobrem a largura toda), girado: antes os arcos ficavam de lado
export function faixaPonte(pec) {
  if (pec._ponte !== undefined) return pec._ponte;
  pec._ponte = null;
  const cw = pec.width / 2,
    ch = pec.height / 2,
    bb = bboxCelula(pec, cw, ch, cw, ch);
  const t = document.createElement("canvas");
  t.width = Math.max(1, Math.round(bb.w));
  t.height = Math.max(1, Math.round(bb.h));
  const g = t.getContext("2d")!;
  g.drawImage(pec, bb.x, bb.y, bb.w, bb.h, 0, 0, t.width, t.height);
  let shDeck = bb.h;
  try {
    const d = g.getImageData(0, 0, t.width, t.height).data;
    let ult = -1;
    for (let y = 0; y < t.height; y++) {
      let n = 0;
      for (let x = 0; x < t.width; x++) if (d[(y * t.width + x) * 4 + 3] > 40) n++;
      if (n >= t.width * 0.88) ult = y;
    }
    if (ult > t.height * 0.3) shDeck = ((ult + 1) * bb.h) / t.height;
  } catch (e) {
    relatar("abismo: altura do paredão não pôde ser lida", e);
  }
  pec._ponte = { sx: bb.x, sy: bb.y, sw: bb.w, sh: bb.h, shDeck };
  return pec._ponte;
}
// névoa do abismo: degradê vertical (transparente -> cor média do fundo) usado para dissolver a base do paredão
export function nevoaAbismo(fundo) {
  if (fundo._nev) return fundo._nev;
  let r = 200,
    g = 210,
    b = 225;
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 8;
    const gc = c.getContext("2d")!;
    gc.drawImage(fundo, 0, 0, 8, 8);
    const d = gc.getImageData(0, 0, 8, 8).data;
    r = g = b = 0;
    for (let i = 0; i < d.length; i += 4) {
      r += d[i];
      g += d[i + 1];
      b += d[i + 2];
    }
    r /= 64;
    g /= 64;
    b /= 64;
  } catch (e) {
    relatar("abismo: cor da névoa não pôde ser lida", e);
  }
  const n = document.createElement("canvas");
  n.width = 1;
  n.height = 64;
  const gn = n.getContext("2d")!,
    gr = gn.createLinearGradient(0, 0, 0, 64);
  gr.addColorStop(0, `rgba(${r | 0},${g | 0},${b | 0},0)`);
  gr.addColorStop(0.55, `rgba(${r | 0},${g | 0},${b | 0},.75)`);
  gr.addColorStop(1, `rgba(${r | 0},${g | 0},${b | 0},1)`);
  gn.fillStyle = gr;
  gn.fillRect(0, 0, 1, 64);
  fundo._nev = n;
  return n;
}
export function desenharEstrutura(ox: number, oy: number) {
  const E = estruturaU(),
    C = J.cena;
  if (!E || !C) return;
  const pec = folhaU("pecas"),
    feats = pecasPerto(ox + VW / 2, oy + VH / 2);
  // praças e lagos (planos, por baixo de tudo)
  for (const f of feats) {
    if (f.tipo === "praca") {
      if (pec) {
        const w = f.rx * 2.6;
        lg.drawImage(celulaArte(pec, 2, 2, 0, 0, Math.round(w), Math.round(w)), Math.round(f.x - ox - w / 2), Math.round(f.y - oy - w / 2));
      } else {
        lg.globalAlpha = 0.5;
        lg.fillStyle = "#a8a498";
        lg.beginPath();
        lg.ellipse(f.x - ox, f.y - oy, f.rx * 0.8, f.ry * 0.8, 0, 0, Math.PI * 2);
        lg.fill();
        lg.fillStyle = "#3a3836";
        lg.beginPath();
        lg.ellipse(f.x - ox, f.y - oy, f.rx * 0.4, f.ry * 0.4, 0, -Math.PI / 2, Math.PI / 2);
        lg.fill();
        lg.globalAlpha = 1;
      }
    }
    if (f.tipo === "lago" && pec) {
      const w = (f.rx * 2) / 0.7;
      lg.drawImage(celulaArte(pec, 2, 2, 1, 0, Math.round(w), Math.round(w)), Math.round(f.x - ox - w / 2), Math.round(f.y - oy - w / 2));
    }
  }
  // abismos: recorta o buraco e mostra o fundo em paralaxe (anda a 45% da velocidade do chão e as nuvens derivam com o vento)
  const fundo = fundoAbismo(),
    TF = fundo.width > 256 ? 256 : fundo.width,
    par = 0.45,
    dx0 = -(ox * par + C.t * C.Wx * 0.15),
    dy0 = -(oy * par + C.t * C.Wy * 0.15);
  for (const f of feats) {
    if (f.tipo !== "abismo") continue;
    if (f.x + f.rx * 1.4 < ox || f.x - f.rx * 1.4 > ox + VW || f.y + f.ry * 1.4 < oy || f.y - f.ry * 1.4 > oy + VH + 40) continue;
    const ex = f.x - ox,
      ey = f.y - oy,
      NP = 56;
    if (!f.pts) {
      f.pts = [];
      for (let i = 0; i < NP; i++) {
        const a = (i / NP) * Math.PI * 2,
          k = raioAbismo(f, a);
        f.pts.push([Math.cos(a) * f.rx * k, Math.sin(a) * f.ry * k]);
      }
    }
    const buraco = () => {
      lg.beginPath();
      f.pts.forEach(([px, py], i) => lg[i ? "lineTo" : "moveTo"](ex + px, ey + py));
      lg.closePath();
    };
    // borda de cima (para o paredão): y mais alto de cada x, dos pontos da metade de cima
    const topo = (wx: number) => {
      let best = null;
      for (let i = 0; i < NP; i++) {
        const [ax, ay] = f.pts[i],
          [bx, by] = f.pts[(i + 1) % NP];
        if (ay > 0 && by > 0) continue;
        if ((ax - wx) * (bx - wx) > 0) continue;
        const t = bx === ax ? 0 : (wx - ax) / (bx - ax),
          yy = ay + (by - ay) * t;
        if (best == null || yy < best) best = yy;
      }
      return best;
    };
    // recorte liso em elipse (antes era uma escada de quadrados de 8 px)
    lg.save();
    buraco();
    lg.clip();
    const suave = lg.imageSmoothingEnabled;
    lg.imageSmoothingEnabled = true;
    const sx = (((dx0 % TF) + TF) % TF) - TF,
      sy = (((dy0 % TF) + TF) % TF) - TF;
    for (let y = sy; y < VH + TF; y += TF) for (let x = sx; x < VW + TF; x += TF) lg.drawImage(fundo, x, y, TF, TF);
    // profundidade em camadas: uma segunda cópia do fundo, maior e mais escura, anda mais rápido (mais perto); ilhas de rocha
    // flutuam devagar no meio do caminho; partículas de luz sobem do fundo
    {
      const T2 = TF * 1.6,
        p2 = 0.7,
        ax = -(ox * p2 + C.t * C.Wx * 0.3),
        ay = -(oy * p2);
      const x2 = (((ax % T2) + T2) % T2) - T2,
        y2 = (((ay % T2) + T2) % T2) - T2;
      lg.globalAlpha = 0.35;
      for (let y = y2; y < VH + T2; y += T2) for (let x = x2; x < VW + T2; x += T2) lg.drawImage(fundo, x, y, T2, T2);
      lg.globalAlpha = 1;
      if (QUAL > 0)
        for (let i = 0; i < 3; i++) {
          const h = hash2(Math.round(f.x) + i * 31, Math.round(f.y), 83),
            px = ex + (h - 0.5) * f.rx * 1.4 + Math.sin(C.t * 0.15 + i * 2) * 6 - ((ox * 0.15) % 40),
            py = ey + (hash2(i, Math.round(f.y), 87) - 0.2) * f.ry * 0.9 + Math.sin(C.t * 0.4 + i) * 2.5,
            w = 8 + h * 10;
          lg.fillStyle = "rgba(10,10,22,.35)";
          lg.beginPath();
          lg.ellipse(px, py + w * 0.9, w * 0.7, w * 0.18, 0, 0, Math.PI * 2);
          lg.fill(); // sombra lá embaixo
          lg.fillStyle = "#4a4450";
          lg.beginPath();
          lg.moveTo(px - w, py);
          lg.lineTo(px + w, py);
          lg.lineTo(px + w * 0.4, py + w * 0.7);
          lg.lineTo(px, py + w * 1.1);
          lg.lineTo(px - w * 0.5, py + w * 0.6);
          lg.closePath();
          lg.fill(); // rocha
          lg.fillStyle = "#6a8a4a";
          lg.fillRect(px - w, py - 1.5, w * 2, 2);
          lg.fillStyle = "rgba(255,255,255,.18)";
          lg.fillRect(px - w, py, w * 2, 1);
        } // grama em cima e luz na beirada
      lg.globalCompositeOperation = "lighter";
      for (let i = 0; i < 8; i++) {
        const q = (C.t * 0.08 + i / 8) % 1,
          mx = ex + Math.sin(i * 7.1) * f.rx * 0.8 + Math.sin(C.t + i) * 2,
          my = ey + f.ry * 0.9 - q * f.ry * 1.8;
        lg.globalAlpha = 0.6 * Math.sin(q * Math.PI);
        lg.fillStyle = "#fff6d0";
        lg.fillRect(Math.round(mx), Math.round(my), 1, 1);
      }
      lg.globalCompositeOperation = "source-over";
      lg.globalAlpha = 1;
    }
    // profundidade: mais escuro junto ao paredão (fundo do precipício) e névoa subindo
    const R2 = Math.max(f.rx, f.ry) * 1.25,
      gp = lg.createLinearGradient(0, ey - R2, 0, ey + R2);
    gp.addColorStop(0, "rgba(4,4,12,.5)");
    gp.addColorStop(0.4, "rgba(8,10,22,.2)");
    gp.addColorStop(1, "rgba(10,14,30,.05)"); /* mais claro: o mar de nuvens do fundo virava uma mancha cinza */
    lg.fillStyle = gp;
    lg.fillRect(ex - R2, ey - R2, R2 * 2, R2 * 2);
    lg.globalCompositeOperation = "lighter";
    for (let i = 0; i < 5; i++) {
      const q = (C.t * 0.03 + i / 5) % 1,
        mx = ex + Math.sin(i * 2.3 + C.t * 0.2) * f.rx * 0.5,
        my = ey + f.ry * 0.6 - q * f.ry * 1.2;
      lg.globalAlpha = 0.07 * Math.sin(q * Math.PI);
      lg.drawImage(bolhaCor(C, "#c8d4f0"), mx - f.rx * 0.45, my - f.ry * 0.22, f.rx * 0.9, f.ry * 0.44);
    }
    lg.globalCompositeOperation = "source-over";
    lg.globalAlpha = 1;
    // paredão: acompanha a curva da borda de cima, em fatias finas; um trecho por buraco vira cachoeira
    const fx = faixaParedao(folhaU("paredao")),
      PH = 40,
      passo = 1,
      nev = nevoaAbismo(fundo),
      hf = hash2(Math.round(f.x), Math.round(f.y), 61),
      var0 = Math.floor(hf * 4);
    const cach0 = hf < 0.55 ? (hash2(Math.round(f.x), 3, 7) - 0.5) * f.rx * 1.2 : null;
    const xMin = Math.min(...f.pts.map(p => p[0])),
      xMax = Math.max(...f.pts.map(p => p[0]));
    for (let wx = xMin; wx < xMax; wx += passo) {
      const tp = topo(wx + passo / 2);
      if (tp == null) continue;
      const yt = ey + tp,
        x = ex + wx;
      const agua = cach0 != null && Math.abs(wx - cach0) < 12;
      // nas laterais íngremes o paredão virava uma escada de fatias: some aos poucos (só a borda de trás mostra a parede)
      {
        const t2 = topo(wx + passo * 1.5),
          incl = t2 == null ? 9 : Math.abs(t2 - tp) / passo;
        lg.globalAlpha = Math.max(0, Math.min(1, 1.8 - incl * 0.9));
        if (lg.globalAlpha <= 0.02) {
          lg.globalAlpha = 1;
          continue;
        }
      }
      if (fx) {
        const k = PH / fx.h;
        if (agua) {
          const q = fx.quedas[Math.floor(J.t * 8) % fx.quedas.length],
            u = (wx - cach0 + 12) / 24;
          lg.drawImage(fx.c, q.x + u * q.w, fx.h, Math.max(1, (q.w * passo) / 24), fx.h, x, yt - 1, passo + 0.6, PH);
        } else {
          const SW = fx.w * k,
            u = ((((wx + f.x + var0 * 37) % SW) + SW) % SW) / k;
          lg.drawImage(fx.c, u, 0, Math.min(passo / k, fx.w - u), fx.h, x, yt - 1, passo + 0.6, PH);
        }
      } else {
        const g = lg.createLinearGradient(0, yt, 0, yt + 26);
        g.addColorStop(0, "#7a7680");
        g.addColorStop(1, "rgba(40,38,46,0)");
        lg.fillStyle = g;
        lg.fillRect(x, yt, passo + 0.6, 26);
        if (agua) {
          lg.fillStyle = "rgba(220,240,255,.7)";
          lg.fillRect(x, yt, passo + 0.6, 26 + Math.sin(J.t * 9 + wx) * 2);
        }
      }
      // a parede se dissolve na névoa da cor do fundo (antes terminava num corte reto no meio do buraco)
      const a0 = lg.globalAlpha;
      lg.globalAlpha = a0;
      lg.drawImage(nev, 0, 0, 1, 64, x, yt + PH * 0.35, passo + 0.6, PH * 0.75);
      lg.globalAlpha = 1;
      if (agua && Math.random() < 0.012 && C.ar.length < 400) {
        const p = particulaAr("bolhas", x + ox, yt + oy + 30, 0);
        p.cor = "#ffffff";
        p.vz = 6;
      }
    }
    // sombra interna na beira (o chão de cima projeta sombra no fundo)
    // raízes e vinhas penduradas na borda de cima, balançando com o vento
    if (QUAL > 0)
      for (let wx = xMin + 4; wx < xMax - 4; wx += 5) {
        const h = hash2(Math.round(f.x + wx), Math.round(f.y), 91);
        if (h > 0.45) continue;
        const tp = topo(wx);
        if (tp == null) continue;
        const yt = ey + tp,
          x = ex + wx,
          L = 4 + h * 16,
          bal = Math.sin(C.t * 1.5 + wx * 0.3) * 1.5;
        lg.strokeStyle = h < 0.2 ? "#3e5a2a" : "#4a3422";
        lg.lineWidth = 0.8;
        lg.beginPath();
        lg.moveTo(x, yt);
        lg.quadraticCurveTo(x + bal * 0.5, yt + L * 0.5, x + bal, yt + L);
        lg.stroke();
        if (h < 0.12) {
          lg.fillStyle = "#6a9a4a";
          lg.fillRect(Math.round(x + bal) - 1, Math.round(yt + L) - 1, 2, 2);
        }
      }
    // sombra interna suave na beira e luz que desce do alto (raios) por cima da névoa
    lg.strokeStyle = "rgba(8,6,14,.22)";
    lg.lineWidth = 5;
    buraco();
    lg.stroke();
    lg.globalCompositeOperation = "lighter";
    for (let i = 0; i < 3; i++) {
      const rx = ex + (i - 1) * f.rx * 0.55 + Math.sin(C.t * 0.3 + i) * 4,
        gr = lg.createLinearGradient(0, ey - f.ry, 0, ey + f.ry);
      gr.addColorStop(0, "rgba(255,245,220,.12)");
      gr.addColorStop(1, "rgba(255,245,220,0)");
      lg.fillStyle = gr;
      lg.beginPath();
      lg.moveTo(rx - 4, ey - f.ry);
      lg.lineTo(rx + 4, ey - f.ry);
      lg.lineTo(rx + 16, ey + f.ry);
      lg.lineTo(rx - 8, ey + f.ry);
      lg.fill();
    }
    lg.globalCompositeOperation = "source-over";
    lg.imageSmoothingEnabled = suave;
    lg.restore();
    // beirada: contorno escuro e uma luz fina na borda de baixo
    // beirada de pedra: lábio grosso escuro, luz fina na borda de baixo (a que está de frente) e cascalho ao longo da beira
    lg.lineJoin = "round";
    lg.strokeStyle = "rgba(30,22,16,.35)";
    lg.lineWidth = 2.4;
    buraco();
    lg.stroke();
    lg.strokeStyle = "rgba(255,236,200,.18)";
    lg.lineWidth = 0.6;
    buraco();
    lg.stroke(); /* beirada mais fina: o contorno preto grosso parecia recortado */
    lg.strokeStyle = "rgba(255,240,210,.5)";
    lg.lineWidth = 1;
    lg.beginPath();
    let ini = true;
    for (let i = 0; i < NP; i++) {
      const [px, py] = f.pts[i];
      if (py < f.ry * 0.25) {
        ini = true;
        continue;
      }
      lg[ini ? "moveTo" : "lineTo"](ex + px, ey + py + 1.2);
      ini = false;
    }
    lg.stroke();
    for (let i = 0; i < NP; i += 2) {
      const h = hash2(Math.round(f.x) + i, Math.round(f.y), 71);
      if (h > 0.55) continue;
      const [px, py] = f.pts[i],
        k = 1.12 + h * 0.25,
        sx = ex + px * k,
        sy = ey + py * k,
        rr = 0.8 + h * 2.2;
      lg.fillStyle = "rgba(20,14,10,.55)";
      lg.beginPath();
      lg.ellipse(sx + 0.4, sy + 0.6, rr, rr * 0.6, 0, 0, Math.PI * 2);
      lg.fill();
      lg.fillStyle = "#6a6058";
      lg.beginPath();
      lg.ellipse(sx, sy, rr, rr * 0.62, h * 3, 0, Math.PI * 2);
      lg.fill();
      lg.fillStyle = "rgba(255,240,220,.25)";
      lg.beginPath();
      lg.ellipse(sx - rr * 0.25, sy - rr * 0.2, rr * 0.45, rr * 0.25, 0, 0, Math.PI * 2);
      lg.fill();
    }
    lg.lineWidth = 1;
    lg.lineJoin = "miter";
    // ponte
    if (f.ponte) {
      const hz = f.ponte === "h",
        L = (hz ? f.rx : f.ry) * 2 + 14;
      const fp = pec && faixaPonte(pec);
      if (fp) {
        const sh = hz ? fp.sh : fp.shDeck,
          H = hz ? 40 : 34,
          k = H / sh,
          PL = fp.sw * k;
        lg.save();
        lg.translate(f.x - ox, f.y - oy);
        if (!hz) lg.rotate(Math.PI / 2);
        const y0 = hz ? -H * 0.42 : -H / 2; /* de frente, o tabuleiro fica no terço de cima do desenho: alinha com a faixa onde se anda */
        lg.beginPath();
        lg.rect(-L / 2, y0, L, H);
        lg.clip();
        const suave = lg.imageSmoothingEnabled;
        lg.imageSmoothingEnabled = true;
        for (let x = -L / 2 - (PL - (L % PL)) / 2; x < L / 2; x += PL) lg.drawImage(pec, fp.sx, fp.sy, fp.sw, sh, x, y0, PL + 0.5, H);
        lg.imageSmoothingEnabled = suave;
        lg.restore();
      } else {
        lg.save();
        lg.translate(f.x - ox, f.y - oy);
        if (!hz) lg.rotate(Math.PI / 2);
        for (let x = -L / 2; x < L / 2; x += 3) {
          lg.fillStyle = ((x / 3) | 0) % 2 ? "#8a5a30" : "#a0703c";
          lg.fillRect(Math.round(x), -7, 2, 14);
        }
        lg.fillStyle = "#c8302a";
        lg.fillRect(-L / 2, -8, L, 1);
        lg.fillRect(-L / 2, 7, L, 1);
        lg.restore();
      }
    }
  }
}
export function desenharQuedasAbismo(ox: number, oy: number) {
  if (!J.quedas) return;
  for (const q of J.quedas) q.t += 1 / 60;
  J.quedas = J.quedas.filter(q => q.t < 0.7);
  for (const q of J.quedas) {
    const k = 1 - q.t / 0.7,
      w = q.spr.width * q.esc * k,
      h = q.spr.height * q.esc * k;
    lg.globalAlpha = k;
    lg.drawImage(silhueta(q.spr, "#2a3040"), Math.round(q.x - ox - w / 2), Math.round(q.y - oy - h / 2 + q.t * 14), w, h);
  }
  lg.globalAlpha = 1;
}

// ---------------------------------------------------------------- fauna: bichos de ambiente que reagem a quem passa
export function quadroFauna(row: number, col: number, tam: number) {
  const img = folhaU("fauna");
  return img ? celulaArte(img, 8, 2, col, row, tam, tam, 0.5) : null;
}
export function atualizarFauna(C: Cena, dt: number) {
  const P = J.jogador;
  if (!C.fauna) C.fauna = [];
  C.tAve = (C.tAve ?? 3) - dt;
  const perto = (x: number, y: number, r: number) => {
    if (Math.hypot(P.x - x, P.y - y) < r) return P;
    for (const e of J.inimigos) {
      if (Math.abs(e.x - x) < r && Math.abs(e.y - y) < r) return e;
    }
    return null;
  };
  // aves cruzam a tela a favor do vento, em bando, com sombra no chão
  if (C.tAve <= 0) {
    C.tAve = rnd(7, 14);
    const a = Math.atan2(C.dy, C.dx) + rnd(-0.4, 0.4),
      n = 1 + Math.floor(Math.random() * 3),
      lado = rnd(-VH * 0.4, VH * 0.4);
    for (let i = 0; i < n; i++)
      C.fauna.push({
        k: "ave",
        x: P.x - Math.cos(a) * VW * 0.8 - Math.sin(a) * lado + i * rnd(-10, 10),
        y: P.y - Math.sin(a) * VW * 0.8 + Math.cos(a) * lado + i * 12,
        vx: Math.cos(a) * 46,
        vy: Math.sin(a) * 46,
        z: rnd(34, 50),
        f: Math.random() * 4,
        vida: 12
      });
  }
  // borboletas perto do jogador, sobre a grama
  if (C.fauna.filter(b => b.k === "borboleta").length < 5 && Math.random() < dt * 0.8) {
    const x = P.x + rnd(-VW / 2, VW / 2),
      y = P.y + rnd(-VH / 2, VH / 2);
    const t = soloEm(Math.floor(x / CEL), Math.floor(y / CEL));
    if (t !== "agua" && !abismoEm(x, y, 0))
      C.fauna.push({ k: "borboleta", x, y, vx: 0, vy: 0, z: rnd(4, 10), f: Math.random() * 4, vida: rnd(14, 24), susto: 0 });
  }
  // peixes e sapos nos lagos que estão na tela
  for (const f of pecasPerto(P.x, P.y)) {
    if (f.tipo !== "lago" || f.povoado || Math.abs(f.x - P.x) > VW || Math.abs(f.y - P.y) > VH) continue;
    f.povoado = true;
    for (let i = 0; i < 4; i++)
      C.fauna.push({
        k: "peixe",
        lago: f,
        x: f.x + rnd(-f.rx * 0.5, f.rx * 0.5),
        y: f.y + rnd(-f.ry * 0.5, f.ry * 0.5),
        vx: rnd(-8, 8),
        vy: rnd(-5, 5),
        f: Math.random() * 4,
        vida: 1e9,
        susto: 0
      });
    for (let i = 0; i < 3; i++) {
      const a = Math.random() * 6.28;
      C.fauna.push({
        k: "bicho",
        lago: f,
        x: f.x + Math.cos(a) * (f.rx + 5),
        y: f.y + Math.sin(a) * (f.ry + 4),
        z: 0,
        vz: 0,
        vx: 0,
        vy: 0,
        f: 0,
        vida: 1e9,
        pulo: 0
      });
    }
  }
  for (const b of C.fauna) {
    b.vida -= dt;
    b.f += dt * 8;
    if (b.k === "ave") {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    } else if (b.k === "borboleta") {
      const q = perto(b.x, b.y, 16);
      if (q) {
        if (!b.assustado) {
          b.assustado = true;
          evento("fauna");
        }
        const d = Math.hypot(b.x - q.x, b.y - q.y) || 1;
        b.vx = ((b.x - q.x) / d) * 40;
        b.vy = ((b.y - q.y) / d) * 40;
        b.susto = 0.6;
        b.z = Math.min(20, b.z + dt * 20);
      }
      b.susto -= dt;
      if (b.susto <= 0) {
        b.vx += (Math.sin(J.t * 2 + b.f) * 12 - b.vx) * dt * 2;
        b.vy += (Math.cos(J.t * 1.7 + b.f * 1.3) * 10 - b.vy) * dt * 2;
      }
      const w = vento(b.x, b.y);
      b.x += (b.vx + w.x * 0.4) * dt;
      b.y += (b.vy + w.y * 0.4) * dt;
      b.z = 6 + Math.sin(J.t * 3 + b.f) * 3;
    } else if (b.k === "peixe") {
      const L = b.lago,
        q = perto(b.x, b.y, 22) || J.cena.ondas.find(o => Math.hypot(o.x - b.x, o.y - b.y) < 12);
      if (q) {
        if (!b.assustado) {
          b.assustado = true;
          evento("fauna");
        }
        const d = Math.hypot(b.x - q.x, b.y - q.y) || 1;
        b.vx = ((b.x - q.x) / d) * 45;
        b.vy = ((b.y - q.y) / d) * 30;
        b.susto = 0.8;
      }
      b.susto -= dt;
      if (b.susto <= 0) {
        b.vx += (Math.sin(J.t * 0.6 + b.f) * 10 - b.vx) * dt;
        b.vy += (Math.cos(J.t * 0.5 + b.f) * 6 - b.vy) * dt;
      }
      const nx = b.x + b.vx * dt,
        ny = b.y + b.vy * dt,
        dx = (nx - L.x) / (L.rx * 0.82),
        dy = (ny - L.y) / (L.ry * 0.8);
      if (dx * dx + dy * dy < 1 && soloEm(Math.floor(nx / CEL), Math.floor(ny / CEL)) === soloLago()) {
        b.x = nx;
        b.y = ny;
      } else {
        b.vx *= -1;
        b.vy *= -1;
      }
    } else if (b.k === "bicho") {
      if (b.pulo > 0) {
        b.pulo -= dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.z = Math.sin((1 - b.pulo / 0.45) * Math.PI) * 7;
        if (b.pulo <= 0) {
          b.z = 0;
          if (b.lago && soloEm(Math.floor(b.x / CEL), Math.floor(b.y / CEL)) === "agua")
            J.cena.ondas.push({ x: b.x, y: b.y, r: 1, vida: 0.8 });
        }
      } else {
        const q = perto(b.x, b.y, 24);
        if (q && !b.assustado) {
          b.assustado = true;
          evento("fauna");
        }
        if (q || Math.random() < dt * 0.15) {
          const a = q ? Math.atan2(b.y - q.y, b.x - q.x) + rnd(-0.5, 0.5) : Math.random() * 6.28;
          b.vx = Math.cos(a) * 55;
          b.vy = Math.sin(a) * 40;
          b.pulo = 0.45;
        }
      }
    }
  }
  C.fauna = C.fauna.filter(b => {
    if (b.vida <= 0) return false;
    if (b.lago) {
      const longe = Math.abs(b.lago.x - P.x) > VW * 1.6 || Math.abs(b.lago.y - P.y) > VH * 1.6;
      if (longe) b.lago.povoado = false;
      return !longe;
    }
    return Math.abs(b.x - P.x) < VW * 1.6 && Math.abs(b.y - P.y) < VH * 1.6;
  });
}
export function desenharFauna(ox: number, oy: number, camada: string) {
  const C = J.cena;
  if (!C || !C.fauna) return;
  for (const b of C.fauna) {
    const x = Math.round(b.x - ox),
      y = Math.round(b.y - oy);
    if (x < -30 || y < -60 || x > VW + 30 || y > VH + 30) continue;
    const q = Math.floor(b.f) % 4;
    if (camada === "agua" && b.k === "peixe") {
      const s = quadroFauna(1, q, 10);
      if (s) {
        lg.save();
        lg.translate(x, y);
        lg.rotate(Math.atan2(b.vy, b.vx));
        lg.globalAlpha = 0.85;
        lg.drawImage(s, -5, -5);
        lg.restore();
        lg.globalAlpha = 1;
      } else {
        lg.fillStyle = "#f08a3a";
        lg.fillRect(x - 1, y, 3, 1);
        lg.fillStyle = "#ffffff";
        lg.fillRect(x + 1, y, 1, 1);
      }
    }
    if (camada === "chao" && b.k === "bicho") {
      const s = quadroFauna(1, 4 + (b.pulo > 0 ? (b.z > 4 ? 2 : 1) : b.pulo < 0 ? 3 : 0), 9);
      lg.fillStyle = "rgba(0,0,0,.3)";
      lg.beginPath();
      lg.ellipse(x, y + 1.5, 2.2, 0.8, 0, 0, Math.PI * 2);
      lg.fill();
      if (s) lg.drawImage(s, x - 4, y - 5 - Math.round(b.z));
      else {
        lg.fillStyle = "#4f9a3c";
        lg.fillRect(x - 1, y - 1 - Math.round(b.z), 3, 2);
      }
    }
    if (camada === "ar" && b.k === "borboleta") {
      const s = quadroFauna(0, 4 + q, 8);
      if (s) lg.drawImage(s, x - 4, y - 4 - Math.round(b.z));
      else {
        lg.fillStyle = q % 2 ? "#d8302a" : "#1a1418";
        lg.fillRect(x - (q % 2), y - Math.round(b.z), 1 + (q % 2) * 2, 1);
      }
    }
    if (camada === "ceu" && b.k === "ave") {
      lg.globalAlpha = 0.18;
      lg.fillStyle = "#000";
      lg.beginPath();
      lg.ellipse(x + b.z * 0.4, y + b.z * 0.6, 5, 2, 0, 0, Math.PI * 2);
      lg.fill();
      lg.globalAlpha = 1;
      const s = quadroFauna(0, q, 16);
      if (s) {
        lg.save();
        lg.translate(x, y - b.z);
        if (b.vx < 0) lg.scale(-1, 1);
        lg.drawImage(s, -8, -8);
        lg.restore();
      } else {
        lg.fillStyle = "#f4f4ee";
        const asa = q % 2 ? -1 : 1;
        lg.fillRect(x - 3, y - b.z + asa, 3, 1);
        lg.fillRect(x + 1, y - b.z + asa, 3, 1);
        lg.fillRect(x, y - b.z, 1, 1);
      }
    }
  }
}

// ---------------------------------------------------------------- cena de abertura: a arte-conceito do reino como cena de cinema
// faixas de cinema, câmera lenta, raios de luz e brasas na cor do elemento, título letra a letra e saída em íris revelando o mapa.
// O HUD e o aviso do mapa só aparecem quando ela termina. Se a arte ainda está chegando, espera até 2,5 s com a tela escura.
export function iniciarAbertura() {
  const u = UNIV[R.universo];
  if (!u || SIM.ativo) return;
  const img = ARTE_IMG[`arte/reinos/${u.era}/${u.id}__keyart.png`];
  if (!img || img.falhou) return;
  const r = semente(u.id + "intro"),
    motes = [];
  for (let i = 0; i < 46; i++) motes.push({ x: r(), y: r(), v: 0.03 + r() * 0.08, a: r() * 6.28, s: 0.6 + r() * 1.8, b: 0.3 + r() * 0.7 });
  J.intro = { t: 0, dur: 4.6, img, u, espera: 0, motes, depois: [], cor: COR[u.elemento] || "#ffd890" };
  $("hud").style.display = "none";
  $("hudBase").style.display = "none";
}
export function aposAbertura(fn: () => void) {
  if (J && J.intro) J.intro.depois.push(fn);
  else fn();
}
export function fimAbertura() {
  const I = J.intro;
  J.intro = null;
  $("hud").style.display = "";
  $("hudBase").style.display = "";
  for (const f of I.depois) f();
}
// chamada no lugar do atualizar enquanto a abertura passa; devolve true se ela ainda está na tela
export function passoAbertura(dt: number) {
  const I = J.intro;
  if (!I) return false;
  if (!I.img.pronta) {
    I.espera += dt;
    if (I.espera > 2.5 || I.img.falhou) {
      fimAbertura();
      return false;
    }
    return true;
  }
  I.t += dt;
  if (I.t >= I.dur) fimAbertura();
  return true;
}
export function pularAbertura() {
  if (J && J.intro) {
    if (!J.intro.img.pronta) J.intro.espera = 9;
    else if (J.intro.t < J.intro.dur - 0.8) J.intro.t = J.intro.dur - 0.8;
  }
}
export const suaveIO = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x)),
  suaveO = (x: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
export let CV_INTRO = null;
export function desenharAbertura() {
  const I = J && J.intro;
  if (!I) return;
  const t = I.t,
    D0 = I.dur,
    img = I.img,
    [cr, cg, cb] = hexRgb(I.cor),
    M = Math.min(W, H);
  ctx.save();
  ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
  if (!img.pronta) {
    ctx.fillStyle = "#07050b";
    ctx.fillRect(0, 0, W, H);
    const p = 0.5 + 0.5 * Math.sin(I.espera * 5);
    ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.25 + 0.4 * p})`;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(W / 2 + (i - 1) * 14, H / 2, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }
  const sai = Math.max(0, (t - (D0 - 0.9)) / 0.9); // 0..1 na saída
  // 1) cena: arte com câmera lenta (aproxima e desliza), num canvas à parte para a saída em íris
  if (!CV_INTRO) CV_INTRO = document.createElement("canvas");
  if (CV_INTRO.width !== cv.width || CV_INTRO.height !== cv.height) {
    CV_INTRO.width = cv.width;
    CV_INTRO.height = cv.height;
  }
  const g = CV_INTRO.getContext("2d")!;
  g.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
  g.globalCompositeOperation = "source-over";
  g.globalAlpha = 1;
  const q = suaveIO(t / D0),
    zoom = 1.2 - 0.12 * q + sai * 0.18;
  g.fillStyle = "#07050b";
  g.fillRect(0, 0, W, H);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  // celular em pé: a arte (larga) cortada para cobrir a tela perderia os lados. Fica inteira na largura, sobre um fundo
  // desfocado dela mesma (reduzida a 48 px e ampliada: borra em qualquer navegador), com as bordas de cima e de baixo se desfazendo
  if (H > W * 1.05) {
    if (!I.borrada) {
      const b = document.createElement("canvas");
      b.width = 48;
      b.height = Math.max(1, Math.round((48 * img.height) / img.width));
      const gb = b.getContext("2d")!;
      gb.imageSmoothingEnabled = true;
      gb.drawImage(img, 0, 0, b.width, b.height);
      I.borrada = b;
    }
    const eb = Math.max(W / img.width, H / img.height) * 1.15;
    g.globalAlpha = 0.55;
    g.drawImage(I.borrada, (W - img.width * eb) / 2, (H - img.height * eb) / 2, img.width * eb, img.height * eb);
    g.globalAlpha = 1;
    const w = W * 1.06 * (zoom / 1.2 + 0.17),
      h = (w * img.height) / img.width,
      x = (W - w) / 2 + (0.5 - q) * W * 0.04,
      y = H * 0.38 - h / 2;
    if (!I.recorte) I.recorte = document.createElement("canvas");
    const rc = I.recorte;
    if (rc.width !== Math.ceil(W) || rc.height !== Math.ceil(H)) {
      rc.width = Math.ceil(W);
      rc.height = Math.ceil(H);
    }
    const gr2 = rc.getContext("2d")!;
    gr2.setTransform(1, 0, 0, 1, 0, 0);
    gr2.globalCompositeOperation = "source-over";
    gr2.clearRect(0, 0, rc.width, rc.height);
    gr2.imageSmoothingEnabled = true;
    gr2.imageSmoothingQuality = "high";
    gr2.drawImage(img, x, y, w, h);
    const mk = gr2.createLinearGradient(0, y, 0, y + h);
    mk.addColorStop(0, "rgba(0,0,0,0)");
    mk.addColorStop(0.1, "rgba(0,0,0,1)");
    mk.addColorStop(0.86, "rgba(0,0,0,1)");
    mk.addColorStop(1, "rgba(0,0,0,0)");
    gr2.globalCompositeOperation = "destination-in";
    gr2.fillStyle = mk;
    gr2.fillRect(0, 0, rc.width, rc.height);
    g.drawImage(rc, 0, 0, W, H);
  } else {
    const esc = Math.max(W / img.width, H / img.height) * zoom,
      w = img.width * esc,
      h = img.height * esc,
      x = (W - w) / 2 + (0.5 - q) * W * 0.05,
      y = (H - h) / 2 + (0.5 - q) * H * 0.025;
    g.drawImage(img, x, y, w, h);
  }
  // tom do elemento por cima (bem leve) e vinheta forte nas bordas
  g.globalCompositeOperation = "soft-light";
  g.fillStyle = `rgba(${cr},${cg},${cb},0.35)`;
  g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = "source-over";
  const vg = g.createRadialGradient(W / 2, H * 0.45, M * 0.25, W / 2, H / 2, Math.hypot(W, H) * 0.6);
  vg.addColorStop(0, "rgba(7,5,11,0)");
  vg.addColorStop(1, "rgba(7,5,11,.78)");
  g.fillStyle = vg;
  g.fillRect(0, 0, W, H);
  // raios de luz diagonais que passam devagar
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 4; i++) {
    const px = W * (0.1 + i * 0.28) + Math.sin(t * 0.5 + i) * W * 0.05,
      lw = M * (0.06 + 0.05 * ((i * 7) % 3)),
      a = 0.05 + 0.04 * Math.sin(t * 1.3 + i * 2);
    const lr = g.createLinearGradient(px, 0, px + lw, 0);
    lr.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
    lr.addColorStop(0.5, `rgba(255,240,210,${a})`);
    lr.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    g.save();
    g.translate(px, -H * 0.1);
    g.rotate(0.35);
    g.translate(-px, 0);
    g.fillStyle = lr;
    g.fillRect(px, 0, lw, H * 1.4);
    g.restore();
  }
  // brasas/poeira de luz subindo, na cor do elemento
  for (const m of I.motes) {
    const yy = (((m.y - t * m.v) % 1) + 1) % 1,
      xx = m.x + Math.sin(t * 0.9 + m.a) * 0.02,
      X = xx * W,
      Y = yy * H,
      rr = (m.s * M) / 420,
      al = m.b * (0.35 + 0.65 * Math.sin(t * 2 + m.a) ** 2) * Math.min(1, t / 0.8);
    const gr = g.createRadialGradient(X, Y, 0, X, Y, rr * 4);
    gr.addColorStop(0, `rgba(255,246,220,${al})`);
    gr.addColorStop(0.3, `rgba(${cr},${cg},${cb},${al * 0.6})`);
    gr.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    g.fillStyle = gr;
    g.fillRect(X - rr * 4, Y - rr * 4, rr * 8, rr * 8);
  }
  g.globalCompositeOperation = "source-over";
  // 2) título: era em letras espaçadas, nome do reino letra a letra subindo com brilho, filete dourado com losango
  const tt = t - 0.55,
    cy = H * (H > W * 1.05 ? 0.74 : 0.76),
    larguraMax = W * 0.86,
    medir = (txt: string, f: number) => {
      g.font = `800 ${f}px "Cinzel", Georgia, serif`;
      return g.measureText(txt).width;
    };
  // nome numa linha se couber grande; senão quebra na vírgula ("Santuário dos 12 Signos" / "Grécia") e cada linha cabe na largura
  let linhas = [I.u.nome],
    fs = Math.round(Math.min(M * 0.075, (larguraMax * 100) / Math.max(1, medir(I.u.nome, 100))));
  if (fs < M * 0.06 && I.u.nome.includes(",")) {
    const [a, ...b] = I.u.nome.split(",");
    linhas = [a.trim(), b.join(",").trim()];
    fs = Math.round(Math.min(M * 0.08, (larguraMax * 100) / Math.max(1, medir(linhas[0], 100))));
  }
  const fs2 = Math.round(Math.min(fs * 0.62, (larguraMax * 100) / Math.max(1, medir(linhas[1] || "", 100)))),
    fe = Math.round(Math.max(11, Math.min(M * 0.03, fs * 0.42))),
    alto = linhas.length > 1 ? fs * 0.55 + fs2 * 0.6 : 0;
  if (tt > 0) {
    const fade = 1 - sai * 1.6;
    // faixa escura por trás do título (dá leitura em qualquer arte)
    const fx = g.createLinearGradient(0, cy - fs * 2.2, 0, H);
    fx.addColorStop(0, "rgba(7,5,11,0)");
    fx.addColorStop(0.45, `rgba(7,5,11,${0.62 * Math.min(1, tt / 0.5) * Math.max(0, fade)})`);
    fx.addColorStop(1, `rgba(7,5,11,${0.8 * Math.max(0, fade)})`);
    g.fillStyle = fx;
    g.fillRect(0, cy - fs * 2.2, W, H);
    g.globalAlpha = Math.max(0, Math.min(1, tt / 0.6) * fade);
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = `600 ${fe}px "Nunito", system-ui, sans-serif`;
    const era = (D.eras[I.u.era].nome + (R.ciclo ? ` · ciclo ${R.ciclo + 1}` : "") + ` · mapa ${R.profundidade + 1}`)
      .toUpperCase()
      .split("")
      .join(" ");
    g.shadowColor = "rgba(0,0,0,.9)";
    g.shadowBlur = fe * 0.6;
    g.fillStyle = "#f0c96a";
    g.fillText(era, W / 2, cy - fs * 0.95);
    g.shadowBlur = 0;
    const yl = cy + fs * 0.72 + alto * 1.2,
      lw = suaveO((tt - 0.2) / 0.9) * Math.min(W * 0.32, fs * 5.2);
    if (lw > 1) {
      const gl = g.createLinearGradient(W / 2 - lw, 0, W / 2 + lw, 0);
      gl.addColorStop(0, "rgba(214,171,79,0)");
      gl.addColorStop(0.5, "rgba(255,226,150,1)");
      gl.addColorStop(1, "rgba(214,171,79,0)");
      g.fillStyle = gl;
      g.fillRect(W / 2 - lw, yl, lw * 2, Math.max(1, M * 0.003));
      g.save();
      g.translate(W / 2, yl);
      g.rotate(Math.PI / 4);
      g.fillStyle = "#ffe296";
      const d = M * 0.008;
      g.fillRect(-d, -d, d * 2, d * 2);
      g.restore();
    }
    let atraso = 0.15;
    linhas.forEach((txt, li) => {
      const f = li ? fs2 : fs,
        yb = li ? cy + fs * 0.55 + fs2 * 0.55 : cy;
      g.font = `800 ${f}px "Cinzel", Georgia, serif`;
      const larg = g.measureText(txt).width;
      let xx = W / 2 - larg / 2;
      g.textAlign = "left";
      for (let i = 0; i < txt.length; i++) {
        const ch = txt[i],
          cw = g.measureText(ch).width,
          k = suaveO((tt - atraso - i * 0.035) / 0.45);
        if (k <= 0) {
          xx += cw;
          continue;
        }
        g.globalAlpha = k * Math.max(0, fade);
        const yy = yb + (1 - k) * f * 0.5;
        g.shadowColor = `rgba(${cr},${cg},${cb},0.9)`;
        g.shadowBlur = f * 0.45 * (1.3 - k * 0.5);
        g.fillStyle = "#140f1c";
        g.fillText(ch, xx + f * 0.05, yy + f * 0.06);
        g.shadowBlur = f * 0.3;
        g.fillStyle = k < 1 ? mistura("#ffffff", li ? "#ffe6a6" : "#f6ead0", k) : li ? "#ffe6a6" : "#f6ead0";
        g.fillText(ch, xx, yy);
        g.shadowBlur = 0;
        xx += cw;
      }
      atraso += txt.length * 0.035;
    });
    g.globalAlpha = 1;
    g.textBaseline = "alphabetic";
  }
  // 3) faixas de cinema: entram no começo e saem junto com a íris
  const fb = H * 0.11 * suaveO(t / 0.7) * (1 - suaveIO(sai * 1.3));
  g.fillStyle = "#000";
  g.fillRect(0, 0, W, fb);
  g.fillRect(0, H - fb, W, fb);
  // entrada: sai do preto
  if (t < 0.6) {
    g.fillStyle = `rgba(7,5,11,${1 - suaveO(t / 0.6)})`;
    g.fillRect(0, 0, W, H);
  }
  // 4) saída em íris: um círculo de luz abre do centro e mostra o mapa por baixo
  if (sai > 0) {
    const R0 = Math.hypot(W, H) * 0.6 * suaveIO(sai),
      bord = M * 0.12;
    g.globalCompositeOperation = "destination-out";
    const ir = g.createRadialGradient(W / 2, H / 2, Math.max(0, R0 - bord), W / 2, H / 2, R0 + 0.01);
    ir.addColorStop(0, "rgba(0,0,0,1)");
    ir.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = ir;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "source-over";
  }
  ctx.globalAlpha = 1;
  ctx.drawImage(CV_INTRO, 0, 0, W, H);
  if (sai > 0 && sai < 1) {
    const R0 = Math.hypot(W, H) * 0.6 * suaveIO(sai),
      bord = M * 0.12;
    ctx.globalCompositeOperation = "lighter";
    const an = ctx.createRadialGradient(W / 2, H / 2, Math.max(0, R0 - bord), W / 2, H / 2, R0);
    an.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
    an.addColorStop(0.7, `rgba(255,240,210,${0.5 * (1 - sai)})`);
    an.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    ctx.fillStyle = an;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
  }
  ctx.restore();
}
