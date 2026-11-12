// Elementar · cenário vivo: vento, vegetação, objetos físicos, destroços, pegadas, clima, redemoinhos e relâmpagos
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./06_loop.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { ativos, defFonte, dist2, elementoDe, escolha, FONTE, J, R, rnd, semente, SIM, tom, VH, VW } from "./01_nucleo.js";
import {
  anel,
  curar,
  danoSimples,
  darItem,
  DIF,
  dificuldade,
  emArea,
  maisProximo,
  parar,
  particulas,
  raio,
  texto,
  tremor
} from "./02_combate.js";
import { aplicarElementoNoSolo, CEL, COR_SOLO, frio, hash2, mudarSolo, soloEm, soloNatural } from "./04_ambiente.js";
import { QUAL } from "./06_loop.js";
import { cacoArte, sortearMarcos } from "./07c_cenario_arte.js";
import { abismoEm, atualizarEstrutura } from "./07d_estrutura.js";
import { lugarDeObjeto } from "./08_horda.js";
import { evento } from "./08e_conquistas.js";
import { passiva } from "./08f_lendas.js";
import { pctMax } from "./09_criaturas.js";
import { aoQuebrarProp } from "./09b_chefes.js";
// ================================================================ cenário vivo: vento, vegetação, objetos físicos e clima
// Escala física: 1 px do mundo ≈ 7 cm (um monstrinho de 10 px tem ~70 cm). Gravidade: 9,8 m/s² ≈ 140 px/s².
// Vento em px/s: 30 ≈ brisa (2 m/s), 70 ≈ vento forte (5 m/s), 110 ≈ tempestade (8 m/s).
export const GRAV = 140,
  VREF = 110,
  K_EMPURRA = 200,
  CH = 96;

// Os kits de cada universo (vento, vegetação, clima, objetos) estão em dados/fonte_cenario.py

// Materiais. m = massa (kg); mu = atrito de deslizamento; rola = resistência ao rolamento (bem menor que o atrito);
// e = restituição (quique); fragil = velocidade de impacto (px/s) a partir da qual o objeto começa a trincar;
// hp em "inimigos comuns" (escala com a profundidade); res = multiplicador de dano por elemento.
export const MAT = D.materiais; // dados/fonte_cenario.py
export const VEG = {
  capim: { cores: ["#2f6a2c", "#4f9a3c", "#8fd05a"], n: [2, 4], L: [3, 6], k: 60, c: 4 },
  seca: { cores: ["#6a4a24", "#9a7a3a", "#d8c070"], n: [2, 3], L: [3, 5], k: 70, c: 4 },
  junco: { cores: ["#2a5a40", "#4a8a58", "#7a4a28"], n: [2, 3], L: [6, 9], k: 40, c: 3.5, cabeca: true },
  gelada: { cores: ["#4a6a7a", "#9ac4d8", "#f0fbff"], n: [2, 3], L: [3, 5], k: 300, c: 30, quebra: true },
  alga: { cores: ["#1f4a3a", "#2f7a52", "#6ac08a"], n: [1, 3], L: [8, 13], k: 12, c: 3 },
  dente: { cores: ["#3f7a34", "#5a9a44", "#f4f4ee"], n: [1, 2], L: [4, 6], k: 50, c: 3, solta: "sementes" },
  trigo: { cores: ["#8a6a2a", "#c8a04a", "#ffe9a0"], n: [2, 4], L: [5, 7], k: 55, c: 4, cabeca: true, solta: "polen" },
  cogumelo: { cogu: true, k: 90, c: 2.2, solta: "esporos" }
};

// ---------------------------------------------------------------- vento
export const VT = { x: 0, y: 0 };
export function vento(x: number, y: number) {
  const C = J.cena;
  if (!C) {
    VT.x = VT.y = 0;
    return VT;
  }
  if (C.kit.submerso) {
    // corrente de fundo: vai e volta com as ondas da superfície (período ~6 s)
    const s = Math.sin(C.t * 0.97 + (x * C.dx + y * C.dy) * 0.004),
      v = C.vBase * (0.2 + 0.8 * s);
    VT.x = C.dx * v;
    VT.y = C.dy * v;
    return VT;
  }
  // rajadas: frentes que viajam na mesma velocidade do vento médio (como no mundo real)
  const s = x * C.dx + y * C.dy,
    p = -x * C.dy + y * C.dx,
    fase = s - C.vBase * C.t;
  const o1 = Math.sin(fase * 0.021),
    g1 = o1 > 0 ? o1 * o1 * o1 * o1 * o1 * o1 : 0;
  const o2 = Math.max(0, Math.sin(fase * 0.0083 + 1.3)),
    g2 = o2 * o2 * o2 * o2 * (0.5 + 0.5 * Math.sin(p * 0.013 + C.t * 0.2));
  let v = C.vBase * (1 + C.kit.rajada * (1.2 * g1 + 0.8 * g2));
  VT.x = C.dx * v;
  VT.y = C.dy * v;
  for (const w of C.vort) {
    const dx = x - w.x,
      dy = y - w.y,
      d = Math.hypot(dx, dy) || 1;
    if (d > w.r * 4) continue;
    // vórtice de Rankine: no núcleo a velocidade cresce com o raio; fora dele cai com 1/r
    const vt = w.vmax * (d < w.r ? d / w.r : w.r / d) * Math.min(1, w.vida / 1.5),
      vr = -0.35 * vt;
    VT.x += (-dy / d) * vt + (dx / d) * vr;
    VT.y += (dx / d) * vt + (dy / d) * vr;
  }
  return VT;
}
export function sustentacao(x: number, y: number) {
  let s = 0;
  for (const w of J.cena.vort) {
    const d = Math.hypot(x - w.x, y - w.y);
    if (d < w.r * 2) s += 110 * (1 - d / (w.r * 2));
  }
  return s;
}

// ---------------------------------------------------------------- início do mapa
export function iniciarCena(u: Universo) {
  const kit = JSON.parse(JSON.stringify(u.kit)); // cópia: a segunda fase dos chefes muda o kit durante a luta
  const r = semente(u.id + "cena" + R.profundidade),
    ang0 = r() * Math.PI * 2;
  const C = (J.cena = {
    u,
    kit,
    veg: kit.veg,
    t: 0,
    ang0,
    dx: Math.cos(ang0),
    dy: Math.sin(ang0),
    vBase: kit.vento,
    Wx: 0,
    Wy: 0,
    Wm: 0,
    props: new Map(),
    lista: [],
    tufos: new Map(),
    marcas: new Map(),
    pegadas: [],
    ondas: [],
    destrocos: [],
    ar: [],
    fumaca: [],
    rastros: [],
    vort: [],
    raios: [],
    filaExp: [],
    aviso: null,
    tRaio: rnd(6, 10),
    tVort: rnd(8, 14),
    tPart: 0,
    nevoa: [],
    nuvens: [],
    detalhes: new Map(),
    sprites: new Map(),
    tSolo: 0,
    contador: 0
  });
  if (kit.nevoa)
    for (let i = 0; i < 8; i++) C.nevoa.push({ x: rnd(-1, 1) * VW, y: rnd(-1, 1) * VH, r: rnd(40, 90), a: rnd(0.1, 0.2), f: rnd(0, 6) });
  if (kit.nuvens !== false && !kit.caverna && !kit.submerso)
    for (let i = 0; i < 4; i++)
      C.nuvens.push({
        x: rnd(-1.5, 1.5) * VW,
        y: rnd(-1.5, 1.5) * VH,
        r: rnd(70, 140),
        a: kit.nuvensEscuras ? rnd(0.16, 0.24) : rnd(0.07, 0.12)
      });
  if (kit.submerso) J.cena.causticas = gerarCausticas();
  if (!SOMBRA_SUAVE) SOMBRA_SUAVE = gerarBolha();
}
export let SOMBRA_SUAVE = null;
export function gerarBolha() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!,
    gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.6, "rgba(255,255,255,.55)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return c;
}
export function bolhaCor(cor: string | CanvasGradient | CanvasPattern) {
  const C = J.cena,
    k = "bolha" + cor;
  if (C.sprites.has(k)) return C.sprites.get(k);
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  g.drawImage(SOMBRA_SUAVE, 0, 0);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = cor;
  g.fillRect(0, 0, 64, 64);
  C.sprites.set(k, c);
  return c;
}
// luz que atravessa a superfície ondulada da água e se concentra no fundo (cáusticas)
export function gerarCausticas() {
  const fr = [];
  for (let f = 0; f < 8; f++) {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!,
      im = g.createImageData(64, 64),
      ph = (f / 8) * Math.PI * 2;
    for (let y = 0; y < 64; y++)
      for (let x = 0; x < 64; x++) {
        const a = (x / 64) * Math.PI * 2,
          b = (y / 64) * Math.PI * 2;
        const v = Math.sin(a * 2 + ph) + Math.sin(b * 3 - ph) + Math.sin((a + b) * 2 + ph * 2) + Math.sin((a - b) * 3 - ph);
        const t = Math.max(0, 1 - Math.abs(v) * 1.4);
        const i = (y * 64 + x) * 4;
        im.data[i] = 200;
        im.data[i + 1] = 240;
        im.data[i + 2] = 255;
        im.data[i + 3] = Math.round(t * t * 255);
      }
    g.putImageData(im, 0, 0);
    fr.push(c);
  }
  return fr;
}

// ---------------------------------------------------------------- objetos: geração por pedaço do mapa
export function pesoAleatorio(r: () => number, pesos: Record<string, number>) {
  let tot = 0;
  for (const k in pesos) tot += pesos[k];
  let x = r() * tot;
  for (const k in pesos) {
    x -= pesos[k];
    if (x <= 0) return k;
  }
  return Object.keys(pesos)[0];
}
export function gerarPedaco(cx: number, cy: number) {
  const C = J.cena,
    k = cx + ":" + cy;
  if (C.props.has(k)) return;
  const r = semente(C.u.id + "p" + k + "#" + R.profundidade),
    out = [];
  if (r() < 0.4) {
    const tipo = pesoAleatorio(r, C.kit.props),
      n = r() < 0.2 ? 2 : 1,
      /* mapa menos poluído: menos objetos soltos e grupos menores */ bx = cx * CH + 14 + r() * 68,
      by = cy * CH + 14 + r() * 68;
    for (let i = 0; i < n; i++) {
      const x = bx + (i % 2) * 13 + r() * 3,
        y = by + Math.floor(i / 2) * 11 + r() * 3;
      if (Math.abs(x) < 36 && Math.abs(y) < 36) continue;
      const t = soloNatural(Math.floor(x / CEL), Math.floor(y / CEL));
      if (t === "agua" && !C.kit.submerso) continue;
      if (!lugarDeObjeto(x, y, 10)) continue;
      out.push(novoProp(i > 0 && r() < 0.3 ? pesoAleatorio(r, C.kit.props) : tipo, x, y, r));
    }
  }
  sortearMarcos(cx, cy, r, out);
  C.props.set(k, out);
}
export function novoProp(tipo: string, x: number, y: number, r: () => number): PropCena {
  const M = MAT[tipo],
    hp = M.indestrutivel ? Infinity : M.hp * DIF.hp * dificuldade();
  return {
    ehProp: true,
    tipo,
    mat: M,
    x,
    y,
    vx: 0,
    vy: 0,
    r: M.r,
    m: M.m,
    esc: 1,
    hp,
    max: hp,
    eixo: r() < 0.5 ? "h" : "v",
    rolou: 0,
    queima: 0,
    carvao: 0,
    molhado: 0,
    congela: 0,
    pavio: 0,
    flash: 0,
    morto: false,
    flut: 0,
    el: null,
    status: null,
    tCond: 0,
    tSolo: r() * 0.3,
    var: Math.floor(r() * 3)
  };
}
export function carregarProps(ox: number, oy: number) {
  const C = J.cena,
    c0 = Math.floor((ox - 60) / CH),
    c1 = Math.floor((ox + VW + 60) / CH),
    r0 = Math.floor((oy - 60) / CH),
    r1 = Math.floor((oy + VH + 60) / CH);
  C.lista.length = 0;
  for (let cy = r0; cy <= r1; cy++)
    for (let cx = c0; cx <= c1; cx++) {
      gerarPedaco(cx, cy);
      for (const p of C.props.get(cx + ":" + cy)) if (!p.morto) C.lista.push(p);
    }
}

// ---------------------------------------------------------------- objetos: física
export function atritoSolo(t: string) {
  return t === "gelo" ? 0.15 : t === "agua" ? 0.6 : t === "lama" ? 1.6 : t === "areia" ? 1.2 : 1;
}
export function rolamentoSolo(t: string) {
  return t === "areia" ? 3 : t === "lama" ? 4 : t === "grama" || t === "vinha" ? 1.5 : 1;
} // areia e lama "engolem" a roda
export function colidir(p: PropCena, ent: Ponto | Selo, r: number, m: number, vx: number, vy: number, inimigo: Inimigo) {
  if (p.mat.fantasma) return false;
  const R = r + p.r * p.esc,
    dx = p.x - ent.x,
    dy = p.y - ent.y,
    d2 = dx * dx + dy * dy;
  if (d2 >= R * R) return false;
  const d = Math.sqrt(d2) || 0.01,
    nx = dx / d,
    ny = dy / d,
    ov = R - d,
    M = p.mat;
  const vn = (vx - p.vx) * nx + (vy - p.vy) * ny; // velocidade de aproximação ao longo da normal
  // atrito estático: só arrasta se a força de empurrar vencer μs·m·g
  const parado = Math.hypot(p.vx, p.vy) < 2,
    fixo = M.fixo || p.flut < 0 || (parado && m * K_EMPURRA < M.mu * 1.2 * p.m * GRAV * atritoSolo(p.solo));
  if (fixo) {
    ent.x -= nx * ov;
    ent.y -= ny * ov;
    if (vn > M.fragil && !M.indestrutivel) danificarProp(p, p.max * (vn / M.fragil - 0.7) * 1.2, null);
    return true;
  }
  const wm = p.m / (m + p.m),
    wp = m / (m + p.m);
  ent.x -= nx * ov * wm;
  ent.y -= ny * ov * wm;
  p.x += nx * ov * wp;
  p.y += ny * ov * wp;
  if (vn > 0) {
    const j = ((1 + M.e) * vn) / (1 / m + 1 / p.m);
    p.vx += (j / p.m) * nx;
    p.vy += (j / p.m) * ny;
    // o objeto que vem rápido machuca: energia cinética ½·m·v²
    if (inimigo && vn > 55 && Math.hypot(p.vx, p.vy) > 40) {
      const f = FONTE;
      defFonte("ambiente");
      danoSimples(inimigo, 0.5 * p.m * vn * vn * 1.2e-4 * dificuldade());
      defFonte(f);
      inimigo.x -= nx * Math.min(14, (j / m) * 0.08);
      inimigo.y -= ny * Math.min(14, (j / m) * 0.08);
      particulas(ent.x, ent.y, "#fff3c4", 4, 60);
    }
    const lim = M.fragil * (p.congela > 0 ? 0.6 : 1);
    if (vn > lim) danificarProp(p, p.max * (vn / lim - 0.7) * 1.2, null);
  }
  return true;
}
export function colidirProps(a: PropCena, b: PropCena) {
  if (a.mat.fantasma || b.mat.fantasma) return;
  const R = a.r * a.esc + b.r * b.esc,
    dx = b.x - a.x,
    dy = b.y - a.y,
    d2 = dx * dx + dy * dy;
  if (d2 >= R * R) return;
  const d = Math.sqrt(d2) || 0.01,
    nx = dx / d,
    ny = dy / d,
    ov = R - d,
    fa = a.mat.fixo || a.flut < 0,
    fb = b.mat.fixo || b.flut < 0;
  if (fa && fb) return;
  const ia = fa ? 0 : 1 / a.m,
    ib = fb ? 0 : 1 / b.m,
    s = ia + ib;
  a.x -= (nx * ov * ia) / s;
  a.y -= (ny * ov * ia) / s;
  b.x += (nx * ov * ib) / s;
  b.y += (ny * ov * ib) / s;
  const vn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
  if (vn <= 0) return;
  const e = Math.min(a.mat.e, b.mat.e),
    j = ((1 + e) * vn) / s;
  a.vx -= j * ia * nx;
  a.vy -= j * ia * ny;
  b.vx += j * ib * nx;
  b.vy += j * ib * ny;
  for (const p of [a, b])
    if (!p.mat.indestrutivel && vn > p.mat.fragil * (p.congela > 0 ? 0.6 : 1))
      danificarProp(p, p.max * (vn / p.mat.fragil - 0.7) * 1.2, null);
}
export function atualizarProps(dt: number) {
  const C = J.cena,
    L0 = C.lista,
    P = J.jogador;
  for (const p of L0) {
    const M = p.mat;
    if (p.flash > 0) p.flash -= dt;
    if (p.subindo > 0) {
      p.subindo -= dt;
      if (Math.random() < dt * 20) particulas(p.x + rnd(-p.r, p.r), p.y + 2, "#a89878", 1, 25);
    }
    if (p.temporario > 0) {
      p.temporario -= dt;
      if (p.temporario <= 0) {
        p.semDrop = true;
        quebrar(p);
        continue;
      }
    }
    if (p.molhado > 0) p.molhado -= dt;
    if (p.congela > 0) p.congela -= dt;
    const cx = Math.floor(p.x / CEL),
      cy = Math.floor(p.y / CEL);
    p.solo = soloEm(cx, cy);
    // solo sob o objeto: fogo acende, água apaga e molha, raio procura metal
    p.tSolo -= dt;
    if (p.tSolo <= 0) {
      p.tSolo = 0.25;
      if (p.solo === "fogo") danificarProp(p, p.max * 0.05, "fogo");
      if (p.solo === "agua") {
        p.molhado = 6;
        if (p.queima > 0) apagar(p);
      }
      if (p.solo === "eletrico" && M.condutor) conduzir(p, DIF.hp * 0.6 * dificuldade(), 70);
      if (M.derrete && (p.solo === "fogo" || (C.u.elemento === "fogo" && !frio()))) derreter(p, p.solo === "fogo" ? 0.06 : 0.01);
    }
    // água: madeira, gelo, feno e frutas boiam e derivam; cerâmica, pedra e metal afundam
    if (!C.kit.submerso && p.solo === "agua" && !M.fixo) {
      if (M.flutua) {
        p.flut = 1;
      } else if (M.afunda && p.flut >= 0) {
        afundar(p);
        continue;
      }
    } else p.flut = 0;
    if (M.fixo) continue;
    // vento: arrasto ½·ρ·Cd·A·|v|² só move o que é leve e tem área (feno, frutas); o resto nem sente
    const A = M.area || 0;
    if (A || p.flut > 0) {
      const w = vento(p.x, p.y),
        rx = w.x * (p.flut > 0 ? 0.25 : 1) - p.vx,
        ry = w.y * (p.flut > 0 ? 0.25 : 1) - p.vy,
        rv = Math.hypot(rx, ry);
      const a = ((0.006 * (A || 6)) / p.m) * rv;
      const forte = rv * a > M.mu * GRAV * 0.9 || Math.hypot(p.vx, p.vy) > 3 || p.flut > 0 || M.rola;
      if (forte) {
        p.vx += rx * a * dt;
        p.vy += ry * a * dt;
      }
    }
    // atrito: deslizar gasta μ·g; rolar gasta só μr·g (barris rolam na direção perpendicular ao eixo)
    const sp = Math.hypot(p.vx, p.vy);
    if (sp > 0.01) {
      const fs = atritoSolo(p.solo),
        fr = rolamentoSolo(p.solo);
      if (p.flut > 0) {
        const k = Math.exp(-1.2 * dt);
        p.vx *= k;
        p.vy *= k;
      } else if (M.rola && p.tipo !== "fruta") {
        const rx = p.eixo === "h" ? 0 : 1,
          ry = p.eixo === "h" ? 1 : 0; // direção de rolamento
        let vr = p.vx * rx + p.vy * ry,
          va = p.vx * ry + p.vy * rx;
        const dr = M.rola * fr * GRAV * dt,
          da = M.mu * fs * GRAV * dt;
        vr = Math.sign(vr) * Math.max(0, Math.abs(vr) - dr);
        va = Math.sign(va) * Math.max(0, Math.abs(va) - da);
        p.vx = vr * rx + va * ry;
        p.vy = vr * ry + va * rx;
        p.rolou += Math.abs(vr) * dt;
      } else {
        const mu = (M.rola || M.mu * (p.congela > 0 ? 0.4 : 1)) * (M.rola ? fr : fs),
          q = Math.max(0, sp - mu * GRAV * dt) / sp;
        p.vx *= q;
        p.vy *= q;
        if (M.rola) p.rolou += sp * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    // pisoteio da grama pelo objeto em movimento
    if (sp > 10) tocarTufos(p.x, p.y, p.r, p.vx, p.vy, dt);
  }
  // contatos com quem anda: Invocador, equipe e inimigos
  const dashing = J.dashT > 0,
    vjx = dashing ? ((J.dir.x / (Math.hypot(J.dir.x, J.dir.y) || 1)) * D.esquiva.distancia) / 0.15 : J.pvx,
    vjy = dashing ? ((J.dir.y / (Math.hypot(J.dir.x, J.dir.y) || 1)) * D.esquiva.distancia) / 0.15 : J.pvy;
  for (const p of L0) {
    if (p.morto) continue;
    if (colidir(p, P, 4, 60, vjx, vjy, null) && !dashing) {
      J.pvx *= 0.92;
      J.pvy *= 0.92;
    }
    for (const s of R.selos) {
      if (!s.mon || s.x == null) continue;
      colidir(p, s, 4, 40, s.vx || 0, s.vy || 0, null);
    }
    for (const e of J.inimigos) {
      if (e.hp <= 0 || Math.abs(e.x - p.x) > 30 || Math.abs(e.y - p.y) > 30) continue;
      const m = (e.chefe ? 3000 : e.mini ? 800 : [15, 30, 70][e.tipo] || 30) * (e.elite && !e.chefe && !e.mini ? 3 : 1);
      colidir(p, e, e.r, m, e.vx || 0, e.vy || 0, e);
    }
  }
  for (let i = 0; i < L0.length; i++) for (let j = i + 1; j < L0.length; j++) if (!L0[i].morto && !L0[j].morto) colidirProps(L0[i], L0[j]);
  // queima, pavio e derretimento
  for (const p of L0) {
    if (p.morto) continue;
    const M = p.mat;
    if (p.pavio > 0) {
      p.pavio -= dt;
      if (Math.random() < dt * 30) particulas(p.x + rnd(-1, 1), p.y - p.r - 3, Math.random() < 0.5 ? "#ffd34a" : "#fff3c4", 1, 40);
      if (p.pavio <= 0) {
        p.hp = 0;
        quebrar(p);
        continue;
      }
    }
    if (p.queima > 0) {
      const W = C.Wm,
        oxi = 1 + W / 90; // mais vento = mais oxigênio = queima mais rápido
      p.hp -= ((p.max * dt) / M.queimaT) * oxi;
      p.carvao = Math.min(1, p.carvao + (dt / M.queimaT) * oxi);
      if (Math.random() < dt * 14) brasa(p.x + rnd(-p.r, p.r), p.y - p.r * 0.5, rnd(4, 8));
      if (Math.random() < dt * 6) fumaca(p.x + rnd(-2, 2), p.y - p.r, 4);
      p.tQ = (p.tQ || 0) - dt;
      if (p.tQ <= 0) {
        p.tQ = 0.4;
        mudarSolo(p.x, p.y + 2, "fogo");
        for (const q of L0) {
          if (q === p || q.morto || !q.mat.inflam || q.queima > 0) continue;
          const dx = q.x - p.x,
            dy = q.y - p.y,
            d = Math.hypot(dx, dy);
          if (d > p.r + q.r + 10) continue;
          const vientre = (dx * C.dx + dy * C.dy) / (d || 1);
          if (Math.random() < 0.35 * (1 + Math.max(0, vientre) * Math.min(1.5, W / 40))) danificarProp(q, 0, "fogo");
        }
        emArea(p.x, p.y, p.r + 5, e => {
          if (e.ehProp === true) return;
          e.status = { el: "fogo", t: J.t };
          const f = FONTE;
          defFonte("ambiente");
          danoSimples(e, pctMax(e, 0.05) + 1);
          defFonte(f);
        });
        if (Math.hypot(P.x - p.x, P.y - p.y) < p.r + 5 && J.invuln <= 0 && !ativos().some(s => elementoDe(s) === "fogo"))
          J.vida -= J.vidaMax * 0.02;
      }
      if (p.molhado > 0 || C.kit.submerso) apagar(p);
      if (p.hp <= 0) {
        quebrar(p);
        continue;
      }
    }
  }
  C.lista = L0.filter(p => !p.morto);
  // explosões em cadeia: a pólvora vizinha não explode no mesmo instante
  for (const x of C.filaExp) x.t -= dt;
  const prontas = C.filaExp.filter(x => x.t <= 0);
  C.filaExp = C.filaExp.filter(x => x.t > 0);
  prontas.forEach(x => explodir(x.x, x.y, x.R));
}
export function acender(p: PropCena) {
  const M = p.mat;
  if (J.cena.kit.submerso || p.molhado > 0) return;
  if (M.explode) {
    if (!(p.pavio > 0)) {
      p.pavio = 1.1;
    }
    return;
  }
  if (M.inflam && p.queima <= 0) {
    p.queima = M.queimaT;
  }
}
export function apagar(p: PropCena) {
  if (p.queima > 0) {
    p.queima = 0;
    fumaca(p.x, p.y - p.r, 6);
    fumaca(p.x + 2, p.y - p.r, 5);
  }
  if (p.pavio > 0) p.pavio = 0;
}
export function derreter(p: PropCena, q: number) {
  p.esc = Math.max(0, p.esc - q);
  p.m = p.mat.m * p.esc * p.esc;
  if (Math.random() < 0.4) J.cena.destrocos.push(gota(p.x + rnd(-3, 3), p.y));
  if (p.esc < 0.35) {
    mudarSolo(p.x, p.y, frio() ? "gelo" : "agua");
    mudarSolo(p.x + CEL, p.y, frio() ? "gelo" : "agua");
    p.hp = 0;
    quebrar(p);
  }
}
export function afundar(p: PropCena) {
  p.morto = true;
  for (let i = 0; i < 3; i++) J.cena.ondas.push({ x: p.x, y: p.y, r: 1 + i * 3, vida: 1 });
  particulas(p.x, p.y, "#bfe6ff", 8, 50);
}
export function conduzir(p: PropCena, dano: number, alc: number) {
  if (J.t < p.tCond) return;
  p.tCond = J.t + 0.5;
  const vistos = new Set();
  let n = 0,
    o: Alvo = p;
  for (let i = 0; i < 4; i++) {
    const alvo = maisProximo(o, alc, e => !vistos.has(e));
    if (!alvo) break;
    vistos.add(alvo);
    raio(o.x, o.y - (o === p ? p.r : 0), alvo.x, alvo.y, "#bfe0ff");
    const f = FONTE;
    defFonte("ambiente");
    danoSimples(alvo, dano * (1 - i * 0.15));
    defFonte(f);
    alvo.status = { el: "raio", t: J.t };
    o = alvo;
    n++;
  }
  if (n) {
    particulas(p.x, p.y - p.r, "#fff3a0", 6, 70);
    anel(p.x, p.y, 10, "#bfe0ff", 0.25);
  }
}
export function danificarProp(p: PropCena, dano: number, el: Elemento | "explosao" | null) {
  if (p.morto) return;
  const M = p.mat;
  // objetos indestrutíveis têm vida infinita: golpes calculados "em % da vida" viram um valor finito antes de seguir (senão o raio conduzido seria infinito)
  if (!isFinite(dano)) dano = DIF.hp * dificuldade() * 2;
  if (el === "fogo") {
    if (M.inflam) acender(p);
    if (M.derrete) derreter(p, Math.min(0.25, 0.05 + (dano / p.max) * 0.4));
  }
  if (el === "agua") {
    apagar(p);
    p.molhado = 10;
    if (frio() && !M.fixo) p.congela = 6;
  }
  if (el === "raio") {
    if (M.condutor || p.molhado > 0) conduzir(p, Math.max(dano, DIF.hp * 0.5 * dificuldade()) * 0.8, 70);
    if (M.explode) acender(p);
  }
  if (M.indestrutivel) {
    p.flash = 0.06;
    return;
  }
  const mult = M.res && el && M.res[el] != null ? M.res[el] : M.res && M.res._ != null ? M.res._ : 1;
  p.hp -= dano * mult;
  if (dano > 0) {
    p.flash = 0.07;
    lascas(p, 1 + Math.floor(Math.random() * 2), false);
  }
  if (p.hp <= 0) {
    if (M.explode && !(p.pavio > 0) && el !== "explosao") {
      p.hp = 0;
      quebrar(p);
    } else if (M.explode) {
      p.pavio = Math.min(p.pavio || 1, rnd(0.12, 0.35));
      p.hp = 1;
    } else quebrar(p);
  }
}
export function quebrar(p: PropCena) {
  if (p.morto) return;
  p.morto = true;
  const M = p.mat,
    C = J.cena;
  if (!p.semDrop && !p.temporario) evento("quebra:" + (p.saque ? "barril" : p.tipo));
  if (typeof aoQuebrarProp === "function") aoQuebrarProp(p);
  if (p.semDrop) {
    lascas(p, 6, true);
    return;
  }
  lascas(p, M.frag === "pedra" ? 12 : M.frag === "palha" ? 16 : 10, true);
  particulas(p.x, p.y, "#d8d0c0", 6, 50);
  tremor(M.m > 100 ? 3 : 1.2);
  const prof = 1 + 0.12 * R.profundidade,
    gemas = (n: number, v: number, cor: string) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        J.gemas.push({ x: p.x, y: p.y, vx: Math.cos(a) * rnd(25, 60), vy: Math.sin(a) * rnd(25, 60), v: v * prof, cor });
      }
    };
  switch (p.tipo) {
    // objetos dão recompensas pequenas: itens fortes (Mel, Incenso, Pedra) continuam exclusivos de elites e baús
    case "vaso":
      if (Math.random() < 0.35) gemas(2, 0.4, "#9fe0ff");
      break;
    case "caixote":
      if (Math.random() < 0.3) gemas(2, 0.5, "#9fe0ff");
      if (Math.random() < 0.015) darItem("pena", p);
      break;
    case "barril":
      if (Math.random() < 0.15) gemas(2, 0.5, "#9fe0ff");
      break;
    case "rocha":
      if (Math.random() < 0.15) gemas(1, 1, "#c8b8a0");
      for (let i = 0; i < 3; i++) fumaca(p.x + rnd(-4, 4), p.y, 3, "#b8a888");
      break;
    case "cristal":
      gemas(3, 0.8, C.kit.cristal || "#c8f0ff");
      anel(p.x, p.y, 16, C.kit.cristal || "#c8f0ff", 0.4);
      break;
    case "fruta":
      curar(J.vidaMax * 0.03);
      texto(p.x, p.y - 10, "+vida", "#7fe0a0", 12);
      break;
    case "gelo":
      mudarSolo(p.x, p.y, frio() ? "gelo" : "agua");
      for (let i = 0; i < 4; i++) C.ondas.push({ x: p.x + rnd(-4, 4), y: p.y + rnd(-3, 3), r: 1, vida: 1 });
      break;
  }
  if (p.queima > 0 || p.carvao > 0.5) {
    mudarSolo(p.x, p.y, "cinza");
    for (let i = 0; i < 4; i++) fumaca(p.x + rnd(-3, 3), p.y - 2, 5);
  }
  if (M.explode) C.filaExp.push({ x: p.x, y: p.y, R: 44, t: 0.02 });
}
export function explodir(x: number, y: number, R: number) {
  const C = J.cena,
    P = J.jogador;
  evento("explosao");
  tremor(9);
  parar(0.06);
  J.flash = { cor: "#ffb060", vida: 0.14 };
  anel(x, y, R, "#ffd34a", 0.5);
  anel(x, y, R * 0.6, "#ff6a2a", 0.4);
  particulas(x, y, "#ffd34a", 26, 190, 2);
  particulas(x, y, "#ff6a2a", 18, 150, 2);
  for (let i = 0; i < 10; i++) fumaca(x + rnd(-R * 0.4, R * 0.4), y + rnd(-R * 0.3, R * 0.3), rnd(6, 10));
  for (let i = 0; i < 24; i++) brasa(x + rnd(-8, 8), y + rnd(-6, 6), rnd(10, 30), rnd(-120, 120), rnd(-120, 120));
  C.luzes = C.luzes || [];
  C.luzes.push({ x, y, r: R * 2.2, cor: "255,170,80", vida: 0.35, max: 0.35 });
  const f = FONTE;
  defFonte("ambiente");
  for (const e of J.inimigos) {
    if (e.hp <= 0) continue;
    const dx = e.x - x,
      dy = e.y - y,
      d = Math.hypot(dx, dy) || 1;
    if (d > R + e.r) continue;
    const q = Math.max(0.25, 1 - d / R);
    danoSimples(e, DIF.hp * 3.5 * dificuldade() * q);
    e.status = { el: "fogo", t: J.t };
    const m = e.chefe ? 3000 : e.mini ? 800 : [15, 30, 70][e.tipo] || 30;
    const k = Math.min(28, ((9000 * q * q) / m) * 0.1);
    e.x += (dx / d) * k;
    e.y += (dy / d) * k;
  }
  defFonte(f);
  // impulso radial: Δv = I/m, caindo com o quadrado da distância
  for (const p of C.lista) {
    if (p.morto) continue;
    const dx = p.x - x,
      dy = p.y - y,
      d = Math.hypot(dx, dy) || 1;
    if (d > R) continue;
    const q = 1 - d / R;
    if (!p.mat.fixo) {
      const dv = Math.min(420, (9000 * q * q) / p.m);
      p.vx += (dx / d) * dv;
      p.vy += (dy / d) * dv;
    }
    danificarProp(p, p.max * 2.2 * q, "fogo");
    if (p.mat.explode && !p.morto) {
      p.pavio = Math.min(p.pavio || 1, rnd(0.15, 0.4));
    }
  }
  for (const g of C.destrocos) {
    const dx = g.x - x,
      dy = g.y - y,
      d = Math.hypot(dx, dy) || 1;
    if (d > R * 1.5) continue;
    const q = 1 - d / (R * 1.5);
    g.vx += (dx / d) * 200 * q;
    g.vy += (dy / d) * 200 * q;
    g.vz += 150 * q;
  }
  const dP = Math.hypot(P.x - x, P.y - y);
  if (dP < R && J.invuln <= 0 && !passiva("explosao_segura")) {
    let dano = J.vidaMax * 0.12 * (1 - dP / R);
    if (J.escudo > 0) {
      const a = Math.min(J.escudo, dano);
      J.escudo -= a;
      dano -= a;
    }
    J.vida -= dano;
    texto(P.x, P.y - 14, "Explosão!", "#ff8a3d", 14);
  }
  for (let i = -2; i <= 2; i++)
    for (let j = -2; j <= 2; j++) {
      if (i * i + j * j > 5) continue;
      const cx = x + i * CEL,
        cy = y + j * CEL;
      if (i * i + j * j <= 1) mudarSolo(cx, cy, "cinza");
      else aplicarElementoNoSolo(cx, cy, "fogo");
      if (Math.random() < 0.4) {
        const t = soloEm(Math.floor(cx / CEL), Math.floor(cy / CEL));
        if (t === "grama" || t === "vinha" || t === "chao") mudarSolo(cx, cy, "fogo");
      }
    }
}

// ---------------------------------------------------------------- destroços (lascas com gravidade, quique e atrito)
export const COR_FRAG: Record<string, null | string[]> = {
  ceramica: null,
  madeira: ["#8a5a30", "#b07a44", "#5a3a20"],
  palha: ["#d8b85a", "#a8843c", "#f0d88a"],
  fruta: null,
  pedra: ["#7a7680", "#9a96a0", "#5a5660"],
  gelo: ["#bfe6ff", "#e8f8ff", "#8fc4e0"],
  cristal: null,
  metal: ["#8a8a90", "#c8c8d0", "#5a5a60"]
};
export function corFrag(p: PropCena) {
  const C = J.cena,
    f = p.mat.frag;
  if (f === "ceramica") {
    const v = C.kit.vaso || ["#b8683a", "#2a3a5a"];
    return [v[0], tom(v[0], 0.7), v[1]];
  }
  if (f === "fruta") return C.kit.fruta === "abobora" ? ["#e07a2a", "#f0a040", "#f8e0a0"] : ["#6a4a2a", "#f4f0e8", "#8a6a3a"];
  if (f === "cristal") {
    const c = C.kit.cristal || "#c8f0ff";
    return [c, tom(c, 1.3), tom(c, 0.7)];
  }
  if (f === "pedra" && C.kit.rocha === "obsidiana") return ["#2a2030", "#4a3a58", "#e8603c"];
  const base = COR_FRAG[f] || COR_FRAG.madeira;
  return p.carvao > 0.5 ? ["#2a2224", "#4a3a34", "#1a1416"] : base;
}
export function lascas(p: PropCena, n: number, quebra: boolean) {
  const C = J.cena,
    cores = corFrag(p),
    leve = p.mat.frag === "palha";
  for (let i = 0; i < n; i++) {
    if (C.destrocos.length > 260) C.destrocos.shift();
    const a = Math.random() * Math.PI * 2,
      v = quebra ? rnd(25, 90) : rnd(10, 40);
    C.destrocos.push({
      x: p.x + rnd(-2, 2),
      y: p.y + rnd(-2, 2),
      z: rnd(2, p.r * 1.4),
      vx: p.vx * 0.4 + Math.cos(a) * v,
      vy: p.vy * 0.4 + Math.sin(a) * v,
      vz: quebra ? rnd(40, 110) : rnd(20, 50),
      cor: escolha(cores),
      tam: leve ? 1 : Math.random() < 0.35 ? 2 : 1,
      vida: rnd(4, 7),
      leve,
      brilho: p.mat.frag === "cristal" || p.mat.frag === "gelo",
      img: Math.random() < 0.6 ? cacoArte(p) : null
    });
  }
}
export function gota(x: number, y: number) {
  return { x, y, z: rnd(1, 4), vx: rnd(-5, 5), vy: rnd(-5, 5), vz: 0, cor: "#bfe6ff", tam: 1, vida: 0.6, leve: false };
}
export function atualizarDestrocos(dt: number) {
  const C = J.cena,
    P = J.jogador,
    sub = C.kit.submerso;
  for (const g of C.destrocos) {
    g.vida -= dt;
    const lift = C.vort.length ? sustentacao(g.x, g.y) : 0;
    if (g.leve || sub || lift > 0) {
      const w = vento(g.x, g.y),
        k = 1 - Math.exp(-dt / (g.leve ? 0.35 : sub ? 0.8 : 1.2));
      g.vx += (w.x - g.vx) * k;
      g.vy += (w.y - g.vy) * k;
      g.vz += lift * dt * Math.max(0, 1 - g.z / 35);
    }
    g.vz -= (sub ? GRAV * 0.25 : g.leve ? GRAV * 0.3 : GRAV) * dt;
    g.x += g.vx * dt;
    g.y += g.vy * dt;
    g.z += g.vz * dt;
    if (g.z <= 0) {
      g.z = 0;
      if (g.vz < -20) {
        g.vz = -g.vz * 0.3;
      } else g.vz = 0;
      const sp = Math.hypot(g.vx, g.vy);
      if (sp > 0.01) {
        const q = Math.max(0, sp - 0.6 * GRAV * dt) / sp;
        g.vx *= q;
        g.vy *= q;
      }
    }
    // chutar destroços ao passar
    const dx = g.x - P.x,
      dy = g.y - P.y;
    if (g.z < 3 && dx * dx + dy * dy < 25) {
      const d = Math.hypot(dx, dy) || 1,
        v = Math.hypot(J.pvx, J.pvy);
      if (v > 15) {
        g.vx += (dx / d) * v * 0.8;
        g.vy += (dy / d) * v * 0.8;
        g.vz += v * 0.3;
      }
    }
  }
  C.destrocos = C.destrocos.filter(g => g.vida > 0);
}

// ---------------------------------------------------------------- vegetação: balanço com o vento + mola amortecida quando é tocada
export function tufoInfo(cx: number, cy: number) {
  const C = J.cena,
    t = soloEm(cx, cy),
    h = hash2(cx, cy, 41),
    d = C.kit.dens;
  let lim;
  switch (t) {
    case "grama":
    case "vinha":
      lim = 0.5;
      break;
    case "chao":
      lim = d;
      break;
    case "areia":
      lim = C.veg === "seca" ? d * 0.6 : d * 0.15;
      break;
    case "gelo":
      lim = d * 0.7;
      break;
    case "fogo":
    case "cinza":
      lim = Math.max(d, 0.45);
      break;
    case "lama":
      lim = d * 0.5;
      break;
    case "agua":
      lim = C.veg === "junco" || C.veg === "alga" ? Math.max(d, 0.3) : d * 0.3;
      break;
    case "eletrico":
      lim = d * 0.3;
      break;
    default:
      lim = d;
  }
  if (h >= lim) return null;
  if (C.u.estrutura && abismoEm(cx * CEL + 4, cy * CEL + 4, 0)) return null;
  return t;
}
// onda de choque no ambiente: dobra a grama para fora, empurra objetos soltos e levanta poeira (golpes em área, mortes de elite,
// chefes e Despertar)
export function rajada(x: number, y: number, R: number, forca: number) {
  const C = J && J.cena;
  if (!C || SIM.ativo) return;
  const f = forca || 1;
  for (let cy = Math.floor((y - R) / CEL); cy <= Math.floor((y + R) / CEL); cy++)
    for (let cx = Math.floor((x - R) / CEL); cx <= Math.floor((x + R) / CEL); cx++) {
      const bx = cx * CEL + 4,
        by = cy * CEL + 4,
        dx = bx - x,
        dy = by - y,
        d = Math.hypot(dx, dy) || 1;
      if (d > R) continue;
      if (!tufoInfo(cx, cy)) continue;
      const k = cx + "," + cy;
      let st = C.tufos.get(k);
      if (!st) {
        st = { bx: 0, by: 0, vx: 0, vy: 0 };
        C.tufos.set(k, st);
      }
      const q = (1 - d / R) * f * 60;
      st.vx += (dx / d) * q;
      st.vy += (dy / d) * q;
    }
  for (const p of C.lista) {
    if (p.morto || p.mat.fixo) continue;
    const dx = p.x - x,
      dy = p.y - y,
      d = Math.hypot(dx, dy) || 1;
    if (d > R) continue;
    const q = ((1 - d / R) * f * 55) / Math.max(1, (p.m || 10) / 10);
    /* objeto leve voa longe, pesado mal se mexe */ p.vx = (p.vx || 0) + (dx / d) * q;
    p.vy = (p.vy || 0) + (dy / d) * q;
  }
  if (QUAL > 0)
    for (let i = 0; i < Math.round(4 * f); i++) {
      const a = Math.random() * 6.28;
      particulaAr("poeira", x + Math.cos(a) * R * 0.6, y + Math.sin(a) * R * 0.5, 1, Math.cos(a) * 20, Math.sin(a) * 12);
    }
}
export function tocarTufos(x: number, y: number, r: number, vx: number, vy: number, dt: number, horda?: boolean) {
  const C = J.cena,
    V = VEG[C.veg],
    R = r + 4,
    sp = Math.hypot(vx, vy);
  const cx0 = Math.floor((x - R) / CEL),
    cx1 = Math.floor((x + R) / CEL),
    cy0 = Math.floor((y - R) / CEL),
    cy1 = Math.floor((y + R + 3) / CEL);
  for (let cy = cy0; cy <= cy1; cy++)
    for (let cx = cx0; cx <= cx1; cx++) {
      const t = tufoInfo(cx, cy);
      if (!t || t === "cinza") continue;
      const bx = cx * CEL + 1 + Math.floor(hash2(cx, cy, 43) * 6),
        by = cy * CEL + 2 + Math.floor(hash2(cx, cy, 47) * 5),
        dx = bx - x,
        dy = by - y,
        d = Math.hypot(dx, dy) || 1;
      if (d > R) continue;
      const k = cx + "," + cy;
      let st = C.tufos.get(k);
      if (!st) {
        st = { bx: 0, by: 0, vx: 0, vy: 0 };
        C.tufos.set(k, st);
      }
      const q = 1 - d / R;
      st.vx += ((dx / d) * 240 * q + vx * 0.9) * dt;
      st.vy += ((dy / d) * 240 * q + vy * 0.9) * dt;
      const marca = C.marcas.get(k);
      if (V.quebra && t !== "fogo" && sp > 20 && !marca) {
        C.marcas.set(k, J.t);
        for (let i = 0; i < 3; i++)
          C.destrocos.push({
            x: bx,
            y: by,
            z: rnd(1, 4),
            vx: rnd(-30, 30),
            vy: rnd(-30, 30),
            vz: rnd(20, 50),
            cor: "#e8f8ff",
            tam: 1,
            vida: 2,
            brilho: true
          });
      } else if (V.solta && !horda && sp > 15 && !marca && Math.random() < dt * 8) {
        if (V.solta === "sementes") C.marcas.set(k, J.t);
        for (let i = 0; i < (V.solta === "sementes" ? 5 : 2); i++) particulaAr(V.solta, bx, by, rnd(3, 7));
      }
      if (t === "agua" && sp > 10 && Math.random() < dt * 3) C.ondas.push({ x: bx, y: by, r: 1, vida: 0.8 });
    }
}
export function atualizarTufos(dt: number) {
  const C = J.cena,
    V = VEG[C.veg],
    P = J.jogador;
  let h = dt;
  const passos = dt > 0.025 ? 2 : 1;
  h = dt / passos;
  for (let i = 0; i < passos; i++)
    for (const st of C.tufos.values()) {
      const am = Math.exp(-V.c * h);
      st.vx *= am;
      st.vy *= am;
      st.vx -= V.k * st.bx * h;
      st.vy -= V.k * st.by * h;
      st.bx += st.vx * h;
      st.by += st.vy * h;
      const m = Math.hypot(st.bx, st.by);
      if (m > 1.3) {
        st.bx *= 1.3 / m;
        st.by *= 1.3 / m;
      }
    }
  for (const [k, st] of C.tufos)
    if (Math.abs(st.bx) + Math.abs(st.by) < 0.01 && Math.abs(st.vx) + Math.abs(st.vy) < 0.05) C.tufos.delete(k);
  if (C.tufos.size > 900) C.tufos.clear();
  for (const [k, t] of C.marcas) if (J.t - t > 28) C.marcas.delete(k);
  // quem anda pela vegetação
  tocarTufos(P.x, P.y, 4, J.pvx, J.pvy, dt);
  for (const s of R.selos) if (s.mon && s.x != null) tocarTufos(s.x, s.y, 3, s.vx || 0, s.vy || 0, dt);
  const ox = P.x - VW / 2,
    oy = P.y - VH / 2;
  let n = 0;
  // a horda toca a vegetação em quadros alternados: metade dos inimigos por quadro, com o dobro do empurrão (mesmo efeito, metade do custo)
  const par = (C.quadro = (C.quadro || 0) + 1) & 1,
    L = J.inimigos;
  for (let i = par; i < L.length; i += 2) {
    const e = L[i];
    if (e.hp <= 0 || e.x < ox - 10 || e.x > ox + VW + 10 || e.y < oy - 10 || e.y > oy + VH + 10) continue;
    if (++n > 70) break;
    tocarTufos(e.x, e.y, e.r * 0.8, e.vx || 0, e.vy || 0, dt * 2, true);
  }
}

// ---------------------------------------------------------------- pegadas e ondas na água
export function rastroDe(o: Mapa | Selo | Inimigo, x: number, y: number, dist: number, r: number) {
  const C = J.cena;
  o._pd = (o._pd || 0) + dist;
  if (o._pd < 5) return;
  o._pd = 0;
  const t = soloEm(Math.floor(x / CEL), Math.floor(y / CEL)),
    antes = o._soloAnt;
  o._soloAnt = t;
  // entrou na água: respingo de gotas; passos no chão seco levantam um pouco de poeira
  if ((t === "agua" || t === "eletrico") && antes && antes !== "agua" && antes !== "eletrico" && !SIM.ativo) {
    particulas(x, y, "#cfeaff", 6, 55);
    for (let i = 0; i < 3; i++) C.ondas.push({ x: x + rnd(-3, 3), y: y + 2, r: 1 + i * 2, vida: 0.9 });
  }
  if ((t === "chao" || t === "areia" || t === "rachado" || t === "cinza") && !SIM.ativo && QUAL > 0 && dist > 0.6 && Math.random() < 0.5)
    particulaAr("poeira", x + rnd(-1.5, 1.5), y + r * 0.5, 0.5, rnd(-6, 6), rnd(-3, 3));
  if (t === "agua" || t === "eletrico") {
    if (C.ondas.length < 80) C.ondas.push({ x, y: y + 2, r: 1, vida: 1 });
    return;
  }
  if (t === "molhado" && C.ondas.length < 80 && Math.random() < 0.4) C.ondas.push({ x, y: y + 2, r: 0.6, vida: 0.6 });
  const cor =
    t === "molhado"
      ? "#16202e"
      : t === "queimado"
        ? "#0e0a08"
        : t === "lama"
          ? "#3a2818"
          : t === "areia"
            ? tom(COR_SOLO.areia[0], 0.75)
            : t === "cinza"
              ? "#2a2830"
              : t === "gelo" && frio()
                ? "#9ab8d0"
                : t === "grama" || t === "vinha"
                  ? null
                  : null;
  if (!cor) return;
  o._lado = !o._lado;
  if (C.pegadas.length > 240) C.pegadas.shift();
  C.pegadas.push({
    x: x + (o._lado ? -1 : 1) * Math.max(1, r * 0.3),
    y: y + r * 0.6,
    cor,
    vida: t === "areia" ? 7 : 10,
    max: t === "areia" ? 7 : 10,
    tam: r > 6 ? 2 : 1
  });
}
export function atualizarPegadas(dt: number) {
  const C = J.cena,
    P = J.jogador;
  // na areia o vento apaga as pegadas mais depressa (transporte de grãos)
  const apaga = 1 + C.Wm / 45;
  const corAreia = C.corAreia || (C.corAreia = tom(COR_SOLO.areia[0], 0.75)); // antes a cor era recalculada para cada pegada, a cada quadro
  for (const p of C.pegadas) p.vida -= dt * (p.cor === corAreia ? apaga : 1);
  C.pegadas = C.pegadas.filter(p => p.vida > 0);
  for (const o of C.ondas) {
    o.vida -= dt;
    o.r += dt * 14;
  }
  C.ondas = C.ondas.filter(o => o.vida > 0);
  const vj = Math.hypot(J.pvx, J.pvy);
  if (vj > 8) rastroDe(J, P.x, P.y + 4, vj * dt, 4);
  for (const s of R.selos) {
    if (!s.mon || s.x == null) continue;
    const v = Math.hypot(s.vx || 0, s.vy || 0);
    if (v > 8) rastroDe(s, s.x, s.y + 4, v * dt, 3);
  }
  for (const e of J.inimigos) {
    if (e.hp <= 0 || (e.tipo !== 2 && !e.chefe && !e.mini && !e.elite)) continue;
    const v = Math.hypot(e.vx || 0, e.vy || 0);
    if (v > 6) rastroDe(e, e.x, e.y + e.r * 0.6, v * dt, e.r);
  }
}

// ---------------------------------------------------------------- clima: partículas do ar
export function particulaAr(k: string, x: number, y: number, z: number, vx?: number, vy?: number) {
  const C = J.cena;
  if (C.ar.length > 300) C.ar.shift();
  const p: ParticulaAr = {
    k,
    x,
    y,
    z: z ?? 0,
    vx: vx ?? 0,
    vy: vy ?? 0,
    vz: 0,
    vida: 3,
    max: 3,
    fase: Math.random() * 6.28,
    cor: null,
    tam: 1
  };
  switch (k) {
    case "neve":
      p.vz = -rnd(14, 20);
      p.vida = p.max = 8;
      p.cor = "#f4f8ff";
      p.tam = Math.random() < 0.25 ? 2 : 1;
      break;
    case "cinzas":
      p.vz = -rnd(8, 12);
      p.vida = p.max = 8;
      p.cor = Math.random() < 0.5 ? "#5a5660" : "#8a8690";
      break;
    case "chuva":
    case "garoa":
      p.vz = -(k === "chuva" ? rnd(240, 280) : rnd(150, 190));
      p.vida = p.max = 2;
      p.cor = k === "chuva" ? "#a8c8f0" : "#c8d8f0";
      break;
    case "folhas":
      p.vz = -rnd(6, 10);
      p.vida = p.max = 7;
      p.cor = escolha(
        J.cena.u.elemento === "natureza" && J.cena.u.id !== "floresta_negra"
          ? ["#4f9a3c", "#7ac050", "#3a7a30"]
          : ["#c8743a", "#d8a040", "#a84a2a", "#8a6a2a"]
      );
      p.tam = 2;
      break;
    case "petalas":
      p.vz = -rnd(5, 9);
      p.vida = p.max = 7;
      p.cor = J.cena.kit.petala || "#f4c8d8";
      p.tam = Math.random() < 0.5 ? 2 : 1;
      break;
    case "sementes":
      p.vz = rnd(-2, 3);
      p.vida = p.max = rnd(5, 8);
      p.cor = "#f4f4ee";
      break;
    case "poeira":
      p.vz = rnd(0, 8);
      p.vida = p.max = rnd(1.2, 2.2);
      p.cor = Math.random() < 0.5 ? "#c8a870" : "#a88a58";
      break;
    case "brasas":
      p.vz = rnd(16, 34);
      p.vida = p.max = rnd(1.6, 2.8);
      p.luz = true;
      break;
    case "polen":
      p.vz = rnd(-1, 2);
      p.vida = p.max = rnd(3, 5);
      p.cor = "#ffe9a0";
      p.luz = true;
      break;
    case "esporos":
      p.vz = rnd(1, 5);
      p.vida = p.max = rnd(3, 5);
      p.cor = J.cena.kit.cogu || "#b070f0";
      p.luz = true;
      break;
    case "esporos_luz":
      p.vz = rnd(2, 6);
      p.vida = p.max = rnd(3, 5);
      p.cor = "#9ff07a";
      p.luz = true;
      break;
    case "vagalumes":
      p.z = rnd(4, 14);
      p.vida = p.max = rnd(6, 10);
      p.cor = "#d8ff8a";
      p.luz = true;
      break;
    case "faiscas":
      p.vz = rnd(30, 60);
      p.vida = p.max = rnd(0.25, 0.5);
      p.cor = "#fff3a0";
      p.luz = true;
      p.vx = rnd(-60, 60);
      p.vy = rnd(-60, 60);
      break;
    case "bolhas":
      p.vz = rnd(10, 18);
      p.vida = p.max = rnd(2.5, 4);
      p.cor = "#bfe6ff";
      p.tam = Math.random() < 0.3 ? 2 : 1;
      break;
  }
  C.ar.push(p);
  return p;
}
export function brasa(x: number, y: number, z: number, vx?: number, vy?: number) {
  const p = particulaAr("brasas", x, y, z, vx, vy);
  p.vx = vx || 0;
  p.vy = vy || 0;
}
export function fumaca(x: number, y: number, r: number, cor?: string) {
  const C = J.cena;
  if (C.fumaca.length > 120) C.fumaca.shift();
  C.fumaca.push({ x, y, z: rnd(2, 6), r: r * 0.5, r1: r * 1.8, vida: rnd(1.8, 2.8), max: 2.8, cor: cor || "#4a4650", vz: rnd(8, 14) });
}
export const QUEDA: Record<string, number> = { neve: 1, cinzas: 1, chuva: 1, garoa: 1, folhas: 1, petalas: 1 };
export function atualizarAr(dt: number, ox: number, oy: number) {
  const C = J.cena,
    k = C.kit;
  // geração: as que caem nascem no alto e "a barlavento", para pousarem dentro da tela
  const taxa: Record<string, number> = {
    neve: 30,
    cinzas: 8,
    chuva: 150,
    garoa: 55,
    folhas: 2.5,
    petalas: 3,
    sementes: 4 + C.Wm / 12,
    poeira: 4 + C.Wm / 6,
    brasas: 5,
    polen: 4,
    esporos: 4,
    esporos_luz: 5,
    vagalumes: 1.2,
    faiscas: 1.2,
    bolhas: 6
  };
  // com a horda grande, o clima abre espaço para os golpes (menos partículas de ambiente)
  const ocupado = Math.min(0.75, J.inimigos.length / 220 + J.parts.length / 900),
    q = QUAL === 0 ? 0.4 : QUAL === 1 ? 0.7 : 1;
  for (const tipo of k.part) {
    let n = taxa[tipo] * dt * (1 - ocupado) * q;
    if (tipo === "vagalumes" && C.ar.filter(p => p.k === "vagalumes").length > 14) n = 0;
    while (n > 0) {
      if (Math.random() >= n) {
        break;
      }
      n -= 1;
      let x = ox + rnd(-20, VW + 20),
        y = oy + rnd(-20, VH + 20),
        z = 0;
      if (QUEDA[tipo]) {
        z = tipo === "chuva" || tipo === "garoa" ? rnd(50, 90) : rnd(40, 80);
        const vz = tipo === "chuva" ? 260 : tipo === "garoa" ? 170 : tipo === "neve" ? 17 : 9;
        x -= (C.Wx * z) / vz;
        y -= (C.Wy * z) / vz;
      } else if (tipo === "brasas" && J.cena.u.elemento !== "fogo") {
        z = 0;
      }
      if (tipo === "faiscas") {
        for (let i = 0; i < 3; i++) particulaAr(tipo, x, y, rnd(0, 4));
        continue;
      }
      particulaAr(tipo, x, y, z);
    }
  }
  // fogo no chão solta brasas e fumaça
  C.tSolo -= dt;
  if (C.tSolo <= 0) {
    C.tSolo = 0.12;
    let fogos = 0;
    for (const [key, m] of J.solo) {
      if (m.t !== "fogo" || m.ate < J.t) continue;
      const [cx, cy] = key.split(",").map(Number),
        x = cx * CEL + 4,
        y = cy * CEL + 4;
      if (x < ox - 10 || x > ox + VW + 10 || y < oy - 10 || y > oy + VH + 10) continue;
      if (++fogos > 40) break;
      if (Math.random() < 0.35) brasa(x + rnd(-3, 3), y, rnd(2, 5));
      if (Math.random() < 0.12) fumaca(x, y, 3);
    }
  }
  const sub = k.submerso;
  for (const p of C.ar) {
    p.vida -= dt;
    const w = vento(p.x, p.y);
    switch (p.k) {
      case "chuva":
      case "garoa":
        p.vx = w.x;
        p.vy = w.y;
        p.z += p.vz * dt;
        if (p.z <= 0) {
          p.vida = 0;
          respingo(p.x, p.y);
        }
        break; // gota em velocidade terminal: anda com o vento
      case "neve":
      case "cinzas": {
        const kk = 1 - Math.exp(-dt / 0.6);
        p.vx += (w.x - p.vx) * kk;
        p.vy += (w.y - p.vy) * kk;
        p.vx += Math.sin(J.t * 2 + p.fase) * 6 * dt * 10 * dt;
        p.z += p.vz * dt + Math.sin(J.t * 1.7 + p.fase) * 0.15;
        if (p.z <= 0) {
          p.z = 0;
          p.vz = 0;
          p.vx *= 0.8;
          p.vy *= 0.8;
          if (p.vida > 1.5) p.vida = 1.5;
        }
        break;
      }
      case "folhas":
      case "petalas": {
        const kk = 1 - Math.exp(-dt / 0.5);
        p.vx += (w.x - p.vx) * kk;
        p.vy += (w.y - p.vy) * kk;
        p.x += Math.cos(J.t * 3 + p.fase) * 8 * dt;
        p.z += p.vz * dt + Math.sin(J.t * 4 + p.fase) * 0.25;
        if (p.z <= 0) {
          p.z = 0;
          p.vx *= 0.9;
          p.vy *= 0.9;
          if (Math.hypot(w.x, w.y) > 45 && Math.random() < dt * 2) p.vz = rnd(8, 16);
          else p.vz = Math.min(p.vz, 0);
          if (p.vida > 2) p.vida = 2;
        } else p.vz -= 0;
        p.vz = Math.max(p.vz - dt * 20, -10);
        break;
      }
      case "sementes": {
        const kk = 1 - Math.exp(-dt / 0.15);
        p.vx += (w.x - p.vx) * kk;
        p.vy += (w.y - p.vy) * kk;
        p.vz += (Math.sin(J.t * 2 + p.fase) * 6 - p.vz) * dt;
        p.z = Math.max(0, p.z + p.vz * dt);
        break;
      }
      case "poeira": {
        const kk = 1 - Math.exp(-dt / 0.2);
        p.vx += (w.x * 1.1 - p.vx) * kk;
        p.vy += (w.y * 1.1 - p.vy) * kk;
        p.vz += (-12 + Math.sin(J.t * 9 + p.fase) * 20) * dt;
        p.z = Math.max(0, p.z + p.vz * dt);
        break;
      }
      case "brasas": {
        const kk = 1 - Math.exp(-dt / 0.4);
        p.vx += (w.x - p.vx) * kk;
        p.vy += (w.y - p.vy) * kk;
        p.vz = Math.max(4, p.vz - dt * 8);
        p.z += p.vz * dt;
        break;
      } // ar quente sobe (empuxo)
      case "polen":
      case "esporos":
      case "esporos_luz": {
        const kk = 1 - Math.exp(-dt / 0.8);
        p.vx += (w.x * 0.5 + rnd(-20, 20) - p.vx) * kk;
        p.vy += (w.y * 0.5 + rnd(-20, 20) - p.vy) * kk;
        p.z = Math.max(0, p.z + p.vz * dt);
        break;
      }
      case "vagalumes": {
        p.vx += (Math.sin(J.t * 0.9 + p.fase) * 14 - p.vx) * dt;
        p.vy += (Math.cos(J.t * 1.1 + p.fase * 1.3) * 14 - p.vy) * dt;
        p.z = 8 + Math.sin(J.t * 1.3 + p.fase) * 5;
        break;
      }
      case "faiscas":
        p.vz -= GRAV * 1.5 * dt;
        p.z += p.vz * dt;
        if (p.z < 0) {
          p.z = 0;
          p.vz = -p.vz * 0.4;
        }
        p.vx *= 0.95;
        p.vy *= 0.95;
        break;
      case "bolhas":
        p.vz += 12 * dt;
        p.z += p.vz * dt;
        p.vx = w.x * 0.4 + Math.sin(J.t * 6 + p.fase) * 8;
        p.vy = w.y * 0.4;
        if (p.z > 60) p.vida = 0;
        break; // bolha acelera subindo (empuxo)
    }
    if (C.vort.length && p.k !== "chuva" && p.k !== "garoa") {
      const l = sustentacao(p.x, p.y);
      if (l > 0) {
        p.vx = w.x;
        p.vy = w.y;
        p.z += l * dt * 0.6 * Math.max(0, 1 - p.z / 40);
        if (p.vz < 0) p.vz *= 0.5;
        if (p.k === "brasas") p.vz *= 0.9;
      }
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.x < ox - 80 || p.x > ox + VW + 80 || p.y < oy - 80 || p.y > oy + VH + 120) p.vida = 0;
  }
  C.ar = C.ar.filter(p => p.vida > 0);
  for (const f of C.fumaca) {
    f.vida -= dt;
    const w = vento(f.x, f.y);
    f.x += w.x * 0.8 * dt;
    f.y += w.y * 0.8 * dt;
    f.z += f.vz * dt;
    f.vz *= Math.exp(-dt * 0.5);
    f.r += (f.r1 - f.r) * dt * 0.8;
  }
  C.fumaca = C.fumaca.filter(f => f.vida > 0);
  // rastros de vento: aparecem só quando o vento é forte o bastante para ser visto
  if (!sub) {
    const forca = Math.max(0, C.Wm - 28) / 12;
    let n = forca * dt * 3;
    while (n > 0) {
      if (Math.random() >= n) break;
      n--;
      C.rastros.push({ x: ox + rnd(-30, VW), y: oy + rnd(0, VH), vida: rnd(0.5, 0.9), max: 0.9, len: rnd(6, 14), f: rnd(0, 6) });
    }
    for (const r of C.rastros) {
      r.vida -= dt;
      const w = vento(r.x, r.y);
      r.x += w.x * dt;
      r.y += w.y * dt;
    }
    C.rastros = C.rastros.filter(r => r.vida > 0).slice(-50);
  }
  // névoa e sombras de nuvem andam com o vento; nuvens mais altas andam mais rápido
  const ww = sub ? 0.4 : 1;
  for (const n of C.nevoa) {
    n.x += C.Wx * 0.8 * ww * dt;
    n.y += C.Wy * 0.8 * ww * dt;
    envolver(n, ox, oy, n.r);
  }
  for (const n of C.nuvens) {
    n.x += C.Wx * 1.6 * dt;
    n.y += C.Wy * 1.6 * dt;
    envolver(n, ox, oy, n.r);
  }
  if (C.luzes) {
    for (const l of C.luzes) l.vida -= dt;
    C.luzes = C.luzes.filter(l => l.vida > 0);
  }
}
export function envolver(n: Ponto, ox: number, oy: number, r: number) {
  const w = VW + 2 * r + 40,
    h = VH + 2 * r + 40,
    x0 = ox - r - 20,
    y0 = oy - r - 20;
  n.x = x0 + ((((n.x - x0) % w) + w) % w);
  n.y = y0 + ((((n.y - y0) % h) + h) % h);
}
export function respingo(x: number, y: number) {
  const C = J.cena,
    t = soloEm(Math.floor(x / CEL), Math.floor(y / CEL));
  if ((t === "agua" || t === "eletrico") && C.ondas.length < 80 && Math.random() < 0.5) C.ondas.push({ x, y, r: 0.5, vida: 0.6 });
  else if (Math.random() < 0.25 && C.destrocos.length < 260)
    C.destrocos.push({ x, y, z: 1, vx: rnd(-12, 12), vy: rnd(-12, 12), vz: rnd(15, 30), cor: "#c8d8f0", tam: 1, vida: 0.25 });
  // chuva apaga fogo aos poucos e molha os objetos
  if (t === "fogo" && Math.random() < 0.04) aplicarElementoNoSolo(x, y, "agua");
}

// ---------------------------------------------------------------- redemoinhos de poeira e de fogo
export function atualizarVortices(dt: number, ox: number, oy: number) {
  const C = J.cena,
    P = J.jogador;
  if (C.kit.redemoinho && !J.fim) {
    C.tVort -= dt;
    if (C.tVort <= 0 && C.vort.length < 2) {
      C.tVort = rnd(16, 28);
      const a = Math.random() * Math.PI * 2,
        d = rnd(50, 90);
      C.vort.push({ x: P.x + Math.cos(a) * d, y: P.y + Math.sin(a) * d, r: 9, vmax: 150, vida: rnd(10, 16), fogo: false, f: rnd(0, 6) });
    }
  }
  for (const w of C.vort) {
    w.vida -= dt;
    w.x += (C.Wx * 0.5 + Math.sin(J.t * 0.7 + w.f) * 18) * dt;
    w.y += (C.Wy * 0.5 + Math.cos(J.t * 0.9 + w.f) * 18) * dt;
    // passou sobre fogo: vira redemoinho de fogo (fenômeno real em incêndios); confere a área do núcleo, não só o centro
    let t = null;
    for (const [ax, ay] of [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ] as [number, number][]) {
      const v = soloEm(Math.floor((w.x + ax * w.r * 0.7) / CEL), Math.floor((w.y + ay * w.r * 0.7) / CEL));
      if (v === "fogo") {
        t = v;
        break;
      }
    }
    if (t === "fogo" && !w.fogo) {
      w.fogo = true;
      w.vida = Math.max(w.vida, 6);
      texto(w.x, w.y - 20, "Redemoinho de fogo!", "#ff8a3d", 14);
    }
    if (w.fogo) {
      w.tf = (w.tf || 0) - dt;
      if (w.tf <= 0) {
        w.tf = 0.2;
        aplicarElementoNoSolo(w.x + rnd(-6, 6), w.y + rnd(-6, 6), "fogo");
        const tt = soloEm(Math.floor(w.x / CEL), Math.floor(w.y / CEL));
        if (tt === "grama" || tt === "vinha" || tt === "chao") mudarSolo(w.x, w.y, "fogo");
        const f = FONTE;
        defFonte("ambiente");
        emArea(w.x, w.y, w.r + 3, e => {
          if (e.ehProp === true) {
            danificarProp(e, 0, "fogo");
            return;
          }
          e.status = { el: "fogo", t: J.t };
          danoSimples(e, pctMax(e, 0.06) + 2);
        });
        defFonte(f);
        if (Math.hypot(P.x - w.x, P.y - w.y) < w.r && J.invuln <= 0 && !ativos().some(s => elementoDe(s) === "fogo"))
          J.vida -= J.vidaMax * 0.015;
      }
      for (let i = 0; i < 2; i++) {
        const a = Math.random() * Math.PI * 2,
          r = w.r * rnd(0.6, 1.2);
        brasa(w.x + Math.cos(a) * r, w.y + Math.sin(a) * r, rnd(0, 8));
        const q = J.cena.ar[J.cena.ar.length - 1];
        if (q) {
          q.vz = rnd(6, 14);
          q.vida = q.max = rnd(0.8, 1.4);
        }
      }
    } else if (Math.random() < dt * 18) {
      const a = Math.random() * Math.PI * 2,
        r = Math.random() * w.r * 1.4;
      const p = particulaAr("poeira", w.x + Math.cos(a) * r, w.y + Math.sin(a) * r, rnd(0, 6));
      p.vida = p.max = rnd(1, 1.8);
    }
    // inimigos giram em volta; objetos leves são arrastados pelo campo de vento
    for (const e of J.inimigos) {
      if (e.hp <= 0 || e.chefe || e.mini) continue;
      const dx = e.x - w.x,
        dy = e.y - w.y,
        d = Math.hypot(dx, dy) || 1;
      if (d > w.r * 2.2) continue;
      const q = (1 - d / (w.r * 2.2)) * 40 * dt;
      e.x += (-dy / d) * q;
      e.y += (dx / d) * q;
    }
  }
  C.vort = C.vort.filter(w => w.vida > 0);
}

// ---------------------------------------------------------------- relâmpagos: preferem o que é alto e condutor (para-raios)
export function atualizarRaios(dt: number) {
  const C = J.cena,
    P = J.jogador;
  if (C.kit.relampago && !J.fim) {
    C.tRaio -= dt;
    if (C.tRaio <= 0 && !C.aviso) {
      C.tRaio = C.raioRapido ? rnd(2.5, 4.5) : rnd(8, 15);
      const a = Math.random() * Math.PI * 2,
        d = rnd(30, 100);
      let x = P.x + Math.cos(a) * d,
        y = P.y + Math.sin(a) * d,
        alvo = null,
        bd = 140 * 140;
      for (const p of C.lista)
        if (p.mat.condutor) {
          const dd = (p.x - x) ** 2 + (p.y - y) ** 2;
          if (dd < bd) {
            bd = dd;
            alvo = p;
          }
        }
      if (alvo) {
        x = alvo.x;
        y = alvo.y - alvo.r;
      }
      C.aviso = { x, y, t: 0.9, alvo };
    }
  }
  if (C.aviso) {
    C.aviso.t -= dt;
    if (Math.random() < dt * 20) particulaAr("faiscas", C.aviso.x + rnd(-6, 6), C.aviso.y + rnd(-4, 4), 0);
    if (C.aviso.t <= 0) {
      const { x, y, alvo } = C.aviso;
      C.aviso = null;
      cairRaio(x, y, alvo);
    }
  }
  for (const r of C.raios) r.vida -= dt;
  C.raios = C.raios.filter(r => r.vida > 0);
}
export function cairRaio(x: number, y: number, alvo: PropCena) {
  const C = J.cena,
    P = J.jogador;
  const pts = [];
  let px = x + rnd(-20, 20),
    py = y - VH;
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    pts.push([px + (x - px) * t + (i && i < 10 ? rnd(-7, 7) : 0), py + (y - py) * t]);
  }
  C.raios.push({ pts, vida: 0.28, max: 0.28 });
  J.flash = { cor: "#e8f0ff", vida: 0.16 };
  tremor(6);
  parar(0.04);
  anel(x, y, 22, "#e8f0ff", 0.4);
  particulas(x, y, "#fff3a0", 16, 140, 2);
  C.luzes = C.luzes || [];
  C.luzes.push({ x, y, r: 120, cor: "200,220,255", vida: 0.3, max: 0.3 });
  const f = FONTE;
  defFonte("ambiente");
  const dano = DIF.hp * 2.2 * dificuldade();
  emArea(x, y, 24, e => {
    if (e.ehProp === true) {
      danificarProp(e, dano * 0.5, "raio");
      return;
    }
    danoSimples(e, dano);
    e.status = { el: "raio", t: J.t };
  });
  defFonte(f);
  if (alvo) {
    conduzir(alvo, dano * 0.7, 90);
    evento("raio_metal");
  }
  if (Math.hypot(P.x - x, P.y - y) < 60) evento("relampago");
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++) {
      const cx = x + i * CEL,
        cy = y + j * CEL,
        t = soloEm(Math.floor(cx / CEL), Math.floor(cy / CEL));
      if (t === "grama" || t === "vinha") mudarSolo(cx, cy, "fogo");
      else aplicarElementoNoSolo(cx, cy, "raio");
    }
  if (Math.hypot(P.x - x, P.y - y) < 18 && J.invuln <= 0) {
    J.vida -= J.vidaMax * 0.07;
    texto(P.x, P.y - 14, "Raio!", "#e8f0ff", 14);
  }
}

// ---------------------------------------------------------------- passo do cenário (chamado uma vez por quadro)
export function atualizarCena(dt: number) {
  const C = J.cena;
  if (!C) return;
  C.t += dt;
  const ang = C.ang0 + 0.3 * Math.sin(C.t * 0.031);
  C.dx = Math.cos(ang);
  C.dy = Math.sin(ang);
  const temAr = ativos().some(s => elementoDe(s) === "ar"); // monstros de Ar atiçam o vento
  C.vBase = C.kit.vento * (0.82 + 0.18 * Math.sin(C.t * 0.11 + 1.3)) * (temAr ? 1.3 : 1);
  const P = J.jogador,
    w = vento(P.x, P.y);
  C.Wx = w.x;
  C.Wy = w.y;
  C.Wm = Math.hypot(w.x, w.y);
  for (const s of R.selos) {
    if (!s.mon || s.x == null) continue;
    if (s._px != null && dt > 0) {
      s.vx = (s.x - s._px) / dt;
      s.vy = (s.y - s._py) / dt;
    }
    s._px = s.x;
    s._py = s.y;
  }
  const ox = P.x - VW / 2,
    oy = P.y - VH / 2;
  carregarProps(ox, oy);
  atualizarProps(dt);
  atualizarTufos(dt);
  atualizarPegadas(dt);
  atualizarDestrocos(dt);
  atualizarAr(dt, ox, oy);
  atualizarVortices(dt, ox, oy);
  atualizarRaios(dt);
  atualizarEstrutura(dt);
}
// golpe que atinge um objeto (projéteis e balas)
export function propNoPonto(x: number, y: number, r: number) {
  const C = J.cena;
  if (!C) return null;
  for (const p of C.lista) {
    if (p.morto || p.mat.fantasma) continue;
    const R = p.r * p.esc + r;
    if ((p.x - x) ** 2 + (p.y - p.r * 0.4 - y) ** 2 < R * R) return p;
  }
  return null;
}
export function propMaisProximo(o: Ponto | Selo, alc: number) {
  const C = J.cena;
  if (!C) return null;
  let best = null,
    bd = alc * alc;
  for (const p of C.lista) {
    if (p.morto || p.mat.indestrutivel) continue;
    const d = dist2(o, p);
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return best;
}
