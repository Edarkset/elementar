// Elementar · golpes dos chefes e mini-chefes: uma função por tipo de golpe (leque, espiral, chuva, investida...).
// Cada função recebe o chefe (e), o golpe (g, de D.eras[...].combate.golpes), o jogador (P), a cor e o elemento do golpe e o
// cenário, e devolve quanto tempo o chefe fica ocupado com ele. executarGolpe (09b_chefes.js) escolhe pela tabela GOLPES.
import "./09b_chefes.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { agendar, defFonte, dist2, escolha, FONTE, J, lg, rnd, tom, VH, VW } from "./01_nucleo.js";
import { anel, danoSimples, DIF, particulas, raio, spawnInimigo, texto, tremor } from "./02_combate.js";
import { cairRaio, danificarProp, fumaca, MAT, particulaAr } from "./07_cenario.js";
import { spriteProp } from "./07b_cenario_desenho.js";
import { quadroEfeito } from "./07c_cenario_arte.js";
import { pctMax } from "./09_criaturas.js";
import {
  angDif,
  bala,
  constricao,
  criarProp,
  D0,
  distSeg,
  empurrarProps,
  feriJogador,
  impactoChuva,
  impactoSalto,
  perigo,
  pintarSolo,
  propsEm,
  transmutarProp
} from "./09b_chefes.js";
// ================================================================ golpes

/** leque: rajadas de projéteis em leque na direção do jogador (arco ≥ 6,2 vira círculo); duplo sai dos dois lados do corpo.
 * Campos do golpe que usa: arco, cura, duplo, el, n, ondas, proj, quebra, vel. */
export function golpeLeque(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const ondas = g.ondas || 1,
    n = g.n || 7,
    arco = g.arco || 1;
  for (let w = 0; w < ondas; w++)
    agendar(0.45 + w * 0.38, () => {
      if (e.hp <= 0) return;
      const P = J.jogador,
        a0 = Math.atan2(P.y - e.y, P.x - e.x);
      for (const lado of g.duplo ? [-1, 1] : [0]) {
        const x = e.x - Math.sin(a0) * lado * e.r,
          y = e.y + Math.cos(a0) * lado * e.r;
        for (let i = 0; i < n; i++) {
          const a = arco >= 6.2 ? a0 + (i / n) * 6.283 + w * 0.2 : a0 + (n > 1 ? i / (n - 1) - 0.5 : 0) * arco + (w % 2 ? 0.08 : 0);
          bala(e, x, y, a, g.vel || 72, D0(e) * 0.6, g.proj, g.el || e.el, { quebra: g.quebra, cura: g.cura });
        }
      }
      anel(e.x, e.y, e.r + 4, cor, 0.25);
    });
  return 0.5 + ondas * 0.38;
}
/** espiral: projéteis girando em braços de espiral a partir do chefe, durante um tempo.
 * Campos do golpe que usa: bracos, dur, el, proj, solo, vel. */
export function golpeEspiral(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const br = g.bracos || 6,
    dur = g.dur || 4;
  let a = Math.random() * 6.28;
  J.golpes.push({
    t: 0,
    cd: 0.4,
    atualizar(dt: number) {
      this.t += dt;
      this.cd -= dt;
      if (e.hp <= 0) return false;
      if (this.cd <= 0) {
        this.cd = 0.14;
        a += 0.31;
        for (let i = 0; i < br; i++)
          bala(e, e.x, e.y, a + (i / br) * 6.283, g.vel || 58, D0(e) * 0.45, g.proj, g.el || e.el, { solo: g.solo });
      }
      return this.t < dur;
    }
  });
  return dur;
}
/** anel: anéis de projéteis para todos os lados, em ondas.
 * Campos do golpe que usa: el, n, ondas, proj, vel. */
export function golpeAnel(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const ondas = g.ondas || 2,
    n = g.n || 12;
  for (let w = 0; w < ondas; w++)
    agendar(0.4 + w * 0.42, () => {
      if (e.hp <= 0) return;
      const off = (w * Math.PI) / n;
      for (let i = 0; i < n; i++) bala(e, e.x, e.y, off + (i / n) * 6.283, g.vel || 60, D0(e) * 0.5, g.proj, g.el || e.el);
      anel(e.x, e.y, e.r + 8, cor, 0.3);
    });
  return 0.5 + ondas * 0.42;
}
/** chuva: projéteis caem do céu em volta do jogador, cada queda anunciada no chão.
 * Campos do golpe que usa: n, proj, r. */
export function golpeChuva(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 6,
    r = g.r || 16;
  for (let i = 0; i < n; i++)
    agendar(i * 0.17, () => {
      if (e.hp <= 0 && !e.mini && !e.chefe) return;
      const P = J.jogador,
        x = i === 0 ? P.x + J.pvx * 0.6 : P.x + rnd(-75, 75),
        y = i === 0 ? P.y + J.pvy * 0.6 : P.y + rnd(-65, 65);
      perigo({
        tipo: "circ",
        x,
        y,
        r,
        t: 0.95,
        cor,
        queda: g.proj || "pedra",
        dono: e,
        linhaVfx: e.golpeIdx || 0,
        fim: () => impactoChuva(e, g, x, y, r)
      });
    });
  return 0.5 + n * 0.17;
}
/** investida: o chefe avança em linha reta contra o jogador, anunciado por uma faixa no chão.
 * Campos do golpe que usa: n, vel. */
export function golpeInvestida(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 1,
    vel = g.vel || 240;
  const uma = (i: number) => {
    if (e.hp <= 0) return;
    const P = J.jogador,
      a = Math.atan2(P.y - e.y, P.x - e.x),
      L = Math.min(200, Math.hypot(P.x - e.x, P.y - e.y) + 55),
      x2 = e.x + Math.cos(a) * L,
      y2 = e.y + Math.sin(a) * L;
    perigo({
      tipo: "linha",
      x: e.x,
      y: e.y,
      x2,
      y2,
      larg: e.r * 1.6,
      t: 0.6,
      cor,
      fim: () => {
        if (e.hp > 0) e.dash = { vx: Math.cos(a) * vel, vy: Math.sin(a) * vel, t: L / vel, g };
      }
    });
    if (i + 1 < n) agendar(0.65 + L / vel + 0.15, () => uma(i + 1));
  };
  uma(0);
  return n * (0.8 + 180 / vel) + 0.2;
}
/** salto: o chefe salta e cai sobre o jogador com impacto em área.
 * Campos do golpe que usa: n, r. */
export function golpeSalto(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 1,
    r = g.r || 28;
  const um = (i: number) => {
    if (e.hp <= 0) return;
    const P = J.jogador,
      x = P.x + J.pvx * 0.3,
      y = P.y + J.pvy * 0.3;
    e.noAr = { x0: e.x, y0: e.y, x1: x, y1: y, t: 0, dur: 0.85 };
    perigo({ tipo: "circ", x, y, r, t: 0.85, cor, fim: () => impactoSalto(e, g, x, y, r) });
    if (i + 1 < n) agendar(1.0, () => um(i + 1));
  };
  um(0);
  return n * 1.0 + 0.2;
}
/** feixe: raio contínuo em linha; pode varrer de um lado para o outro e marcar o chão.
 * Campos do golpe que usa: alcance, larg, n, quebra, solo, varre. */
export function golpeFeixe(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 1,
    varre = g.varre || 0,
    L = g.alcance || 150,
    larg = g.larg || 8,
    durA = varre > 0 ? 1.4 : 0.35,
    dir = Math.random() < 0.5 ? 1 : -1;
  const a0 = Math.atan2(P.y - e.y, P.x - e.x) - (dir * varre) / 2;
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / n) * 6.283;
    perigo({
      tipo: "linha",
      x: e.x,
      y: e.y,
      x2: e.x + Math.cos(a) * L,
      y2: e.y + Math.sin(a) * L,
      larg,
      t: 0.95,
      cor,
      seta: varre > 0 ? dir : 0
    });
  }
  agendar(0.95, () => {
    if (e.hp <= 0) return;
    J.golpes.push({
      t: 0,
      hit: 0,
      ts: 0,
      segs: [],
      atualizar(dt: number) {
        this.t += dt;
        this.hit -= dt;
        this.ts -= dt;
        if (e.hp <= 0) return false;
        const q = Math.min(1, this.t / durA),
          P = J.jogador;
        for (let i = 0; i < n; i++) {
          const a = a0 + (i / n) * 6.283 + dir * varre * q,
            x2 = e.x + Math.cos(a) * L,
            y2 = e.y + Math.sin(a) * L;
          this.segs[i] = [e.x, e.y, x2, y2];
          if (this.hit <= 0 && distSeg(P.x, P.y, e.x, e.y, x2, y2) < larg / 2 + 3 && feriJogador(D0(e) * 0.9, el)) this.hit = 0.35;
          if (C)
            for (const p of C.lista)
              if (!p.morto && distSeg(p.x, p.y, e.x, e.y, x2, y2) < larg / 2 + p.r) {
                danificarProp(p, p.max * (g.quebra ? 4 : 1.5) * dt, el);
                if (!p.mat.fixo) {
                  p.vx += -Math.sin(a) * dir * 80 * dt;
                  p.vy += Math.cos(a) * dir * 80 * dt;
                }
              }
          if (this.ts <= 0 && g.solo)
            for (let k = 0; k < 3; k++) {
              const t = Math.random();
              pintarSolo(e.x + (x2 - e.x) * t, e.y + (y2 - e.y) * t, 4, g.solo, g.solo === "fogo" ? 6 : undefined);
            }
        }
        if (this.ts <= 0) this.ts = 0.06;
        return this.t < durA + 0.15;
      },
      luz(ox: number, oy: number) {
        const a = 1 - Math.max(0, this.t - durA) / 0.15;
        for (const [x1, y1, x2, y2] of this.segs) {
          lg.globalAlpha = 0.35 * a;
          lg.strokeStyle = cor;
          lg.lineWidth = larg;
          lg.beginPath();
          lg.moveTo(x1 - ox, y1 - oy);
          lg.lineTo(x2 - ox, y2 - oy);
          lg.stroke();
          lg.globalAlpha = 0.9 * a;
          lg.lineWidth = Math.max(1, larg * 0.35);
          lg.strokeStyle = "#ffffff";
          lg.beginPath();
          lg.moveTo(x1 - ox, y1 - oy);
          lg.lineTo(x2 - ox, y2 - oy);
          lg.stroke();
        }
        lg.lineWidth = 1;
        lg.globalAlpha = 1;
      }
    });
    tremor(3);
  });
  return 0.95 + durA + 0.2;
}
/** onda: onda que se espalha do chefe; pode empurrar, atordoar e cuspir projéteis.
 * Campos do golpe que usa: atordoa, cospe, empurra, solo, vel, vmax. */
export function golpeOnda(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const vmax = g.vmax || 120,
    vel = g.vel || 100;
  perigo({ tipo: "circ", x: e.x, y: e.y, r: e.r + 12, t: 0.55, cor });
  agendar(0.55, () => {
    if (e.hp <= 0) return;
    const cx = e.x,
      cy = e.y;
    tremor(3);
    if (g.cospe && e.engolidos && e.engolidos.length) {
      e.engolidos.forEach((tipo, i) => {
        const a = (i / e.engolidos.length) * 6.283 + Math.random() * 0.3;
        bala(e, cx, cy, a, 110, D0(e) * 0.7, MAT[tipo]?.frag === "pedra" ? "pedra" : "barril", e.el, { quebra: true, deixa: tipo });
      });
      e.engolidos = [];
    }
    J.golpes.push({
      r: e.r,
      acertou: false,
      ts: 0,
      atualizar(dt: number) {
        this.r += vel * dt;
        this.ts -= dt;
        const P = J.jogador,
          d = Math.hypot(P.x - cx, P.y - cy);
        if (!this.acertou && Math.abs(d - this.r) < 7 && feriJogador(D0(e) * 0.8, el)) {
          this.acertou = true;
          if (g.atordoa) {
            J.atordoa = 1.6;
            texto(P.x, P.y - 14, "Atordoado!", "#e8e0ff", 13);
          }
          if (g.empurra) {
            P.x += ((P.x - cx) / (d || 1)) * 14;
            P.y += ((P.y - cy) / (d || 1)) * 14;
          }
        }
        if (C) {
          for (const p of C.lista) {
            if (p.morto || p.mat.fixo) continue;
            const dp = Math.hypot(p.x - cx, p.y - cy) || 1;
            if (Math.abs(dp - this.r) < 6 + p.r) {
              const k = ((g.empurra ? 160 : 70) / Math.max(3, p.m)) * dt * 10;
              p.vx += ((p.x - cx) / dp) * k;
              p.vy += ((p.y - cy) / dp) * k;
            }
          }
        }
        if (g.solo && this.ts <= 0) {
          this.ts = 0.08;
          for (let k = 0; k < 8; k++) {
            const a = Math.random() * 6.283;
            pintarSolo(cx + Math.cos(a) * this.r, cy + Math.sin(a) * this.r, 4, g.solo);
          }
        }
        return this.r < vmax;
      },
      chao(ox: number, oy: number) {
        lg.strokeStyle = cor;
        lg.globalAlpha = 0.7 * (1 - (this.r / vmax) * 0.6);
        lg.lineWidth = 3;
        lg.beginPath();
        lg.ellipse(cx - ox, cy - oy, this.r, this.r * 0.8, 0, 0, Math.PI * 2);
        lg.stroke();
        lg.lineWidth = 1;
        lg.globalAlpha = 0.9;
        lg.strokeStyle = "#ffffff";
        lg.beginPath();
        lg.ellipse(cx - ox, cy - oy, this.r, this.r * 0.8, 0, 0, Math.PI * 2);
        lg.stroke();
        lg.globalAlpha = 1;
      }
    });
  });
  return 0.55 + (vmax / vel) * 0.4;
}
/** vortice: redemoinho que puxa o jogador e os objetos; pode engolir o que chegar ao centro.
 * Campos do golpe que usa: dur, engole, forca, r, solo. */
export function golpeVortice(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const r = g.r || 110,
    dur = g.dur || 4,
    f = g.forca || 60;
  perigo({ tipo: "circ", x: e.x, y: e.y, r: e.r + 14, t: 0.6, cor });
  agendar(0.6, () => {
    if (e.hp <= 0) return;
    J.golpes.push({
      t: 0,
      hit: 0,
      atualizar(dt: number) {
        this.t += dt;
        this.hit -= dt;
        if (e.hp <= 0) return false;
        const P = J.jogador,
          cx = e.x,
          cy = e.y,
          d = Math.hypot(P.x - cx, P.y - cy) || 1;
        if (d < r && J.dashT <= 0) {
          const k = f * (1 - (d / r) * 0.5) * dt;
          P.x += ((cx - P.x) / d) * k - ((P.y - cy) / d) * k * 0.5;
          P.y += ((cy - P.y) / d) * k + ((P.x - cx) / d) * k * 0.5;
        }
        if (d < e.r + 8 && this.hit <= 0 && feriJogador(D0(e) * 0.6, el)) this.hit = 0.5;
        if (C) {
          for (const p of C.lista) {
            if (p.morto || p.mat.fixo) continue;
            const dp = Math.hypot(p.x - cx, p.y - cy) || 1;
            if (dp > r) continue;
            const k = ((f * 3) / Math.max(2, p.m)) * dt * 10;
            p.vx += ((cx - p.x) / dp) * k - ((p.y - cy) / dp) * k * 0.6;
            p.vy += ((cy - p.y) / dp) * k + ((p.x - cx) / dp) * k * 0.6;
            if (dp < e.r + p.r && g.engole) {
              p.morto = true;
              (e.engolidos = e.engolidos || []).push(p.tipo);
              particulas(p.x, p.y, "#bfe6ff", 6, 50);
            }
          }
          for (const q of C.destrocos) {
            const dq = Math.hypot(q.x - cx, q.y - cy) || 1;
            if (dq < r) {
              q.vx += (((cx - q.x) / dq) * 80 - ((q.y - cy) / dq) * 60) * dt;
              q.vy += (((cy - q.y) / dq) * 80 + ((q.x - cx) / dq) * 60) * dt;
            }
          }
          if (Math.random() < dt * 25) {
            const a = Math.random() * 6.28,
              rr = rnd(r * 0.4, r);
            const p = particulaAr(C.kit.submerso ? "bolhas" : "poeira", cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, rnd(0, 6));
            p.vx = -Math.sin(a) * 60;
            p.vy = Math.cos(a) * 60;
          }
          if (g.solo && Math.random() < dt * 10) pintarSolo(cx + rnd(-r * 0.5, r * 0.5), cy + rnd(-r * 0.5, r * 0.5), 6, g.solo);
        }
        return this.t < dur;
      },
      chao(ox: number, oy: number) {
        lg.strokeStyle = cor;
        for (let i = 0; i < 5; i++) {
          const a0 = this.t * 4 + i * 1.256;
          lg.globalAlpha = 0.35;
          lg.beginPath();
          for (let k = 0; k <= 12; k++) {
            const t = k / 12,
              rr = r * (1 - t) + e.r * t,
              a = a0 + t * 3;
            const x = e.x - ox + Math.cos(a) * rr,
              y = e.y - oy + Math.sin(a) * rr * 0.8;
            k ? lg.lineTo(x, y) : lg.moveTo(x, y);
          }
          lg.stroke();
        }
        lg.globalAlpha = 1;
      }
    });
  });
  return 0.6 + dur;
}
/** invocar: chama inimigos comuns; em cerco, aparecem em volta do jogador.
 * Campos do golpe que usa: cerco, k, n, some. */
export function golpeInvocar(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 4;
  if (g.some) {
    e.oculto = true;
    e.revoada = true;
    particulas(e.x, e.y, "#3a2a40", 20, 90);
    agendar(3, () => {
      e.oculto = false;
      e.revoada = false;
      anel(e.x, e.y, 20, "#c070ff", 0.4);
    });
  }
  for (let i = 0; i < n; i++) {
    const P = J.jogador,
      a = (i / n) * 6.283 + Math.random() * 0.3,
      rr = g.cerco ? 72 : rnd(18, 44),
      cx = g.cerco ? P.x : e.x,
      cy = g.cerco ? P.y : e.y,
      x = cx + Math.cos(a) * rr,
      y = cy + Math.sin(a) * rr;
    perigo({
      tipo: "circ",
      x,
      y,
      r: 6,
      t: 0.6,
      cor: "#a89878",
      fim: () => {
        if (J.fim || J.inimigos.length > DIF.max) return;
        spawnInimigo(g.k >= 0 ? g.k : Math.floor(Math.random() * 3));
        const o = J.inimigos[J.inimigos.length - 1];
        o.x = x;
        o.y = y;
        o.surgindo = 0.45;
        o.lacaio = true;
      }
    });
  }
  return g.some ? 3 : 0.9;
}
/** muralha: ergue uma barreira de objetos do cenário para fechar a passagem.
 * Campos do golpe que usa: forma, mat, r. */
export function golpeMuralha(e: Inimigo, g: Golpe, _P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const P = J.jogador,
    r = g.r || 50,
    pts = [];
  if (g.mat === "escama") {
    constricao(e, P, r);
    return 4.2;
  }
  if (g.forma === "anel" || g.forma === "prisao") {
    const n = Math.max(8, Math.round((2 * Math.PI * r) / 11)),
      gap = Math.floor(Math.random() * n);
    for (let i = 0; i < n; i++) {
      if (g.forma === "anel" && (i === gap || i === (gap + 1) % n)) continue;
      const a = (i / n) * 6.283;
      pts.push([P.x + Math.cos(a) * r, P.y + Math.sin(a) * r]);
    }
  } else if (g.forma === "cruz") {
    for (let i = -5; i <= 5; i++) {
      if (Math.abs(i) < 2) continue;
      pts.push([P.x + i * 11, P.y]);
      pts.push([P.x, P.y + i * 11]);
    }
  } else {
    const a = Math.atan2(P.y - e.y, P.x - e.x) + Math.PI / 2,
      mx = (P.x + e.x) / 2,
      my = (P.y + e.y) / 2;
    for (let i = -5; i <= 5; i++) pts.push([mx + Math.cos(a) * i * 11, my + Math.sin(a) * i * 11]);
  }
  for (const [x, y] of pts)
    perigo({
      tipo: "circ",
      x,
      y,
      r: 5,
      t: 0.55,
      cor: "#c8b890",
      fim: () => {
        const tipo = g.mat === "multi" ? escolha(["rocha", "gelo", "cristal", "metal", "arvore"]) : g.mat;
        criarProp(tipo, x, y, { subindo: 0.35, temporario: 12 });
        const P = J.jogador;
        if (Math.hypot(P.x - x, P.y - y) < 7) feriJogador(D0(e) * 0.35, el);
        particulas(x, y, "#a89878", 4, 40);
      }
    });
  tremor(2);
  return 1.0;
}
/** fissura: rachaduras correm pelo chão a partir do chefe, anunciadas em linha.
 * Campos do golpe que usa: comp, n, solo. */
export function golpeFissura(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 5,
    comp = g.comp || 120,
    a0 = Math.atan2(P.y - e.y, P.x - e.x);
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / n) * 6.283,
      x0 = e.x,
      y0 = e.y,
      x2 = x0 + Math.cos(a) * comp,
      y2 = y0 + Math.sin(a) * comp;
    perigo({
      tipo: "linha",
      x: x0,
      y: y0,
      x2,
      y2,
      larg: 10,
      t: 0.8,
      cor,
      fim: () =>
        J.golpes.push({
          t: 0,
          L: 0,
          acertou: false,
          pts: [[x0, y0]],
          atualizar(dt) {
            this.t += dt;
            this.L = Math.min(comp, this.t * 220);
            const fx = x0 + Math.cos(a) * this.L,
              fy = y0 + Math.sin(a) * this.L;
            const ult = this.pts[this.pts.length - 1];
            if (Math.hypot(fx - ult[0], fy - ult[1]) > 5) this.pts.push([fx + rnd(-2, 2), fy + rnd(-2, 2)]);
            if (Math.random() < 0.7) particulas(fx, fy, cor, 2, 50);
            if (g.solo && Math.random() < 0.8) pintarSolo(fx, fy, 4, g.solo, g.solo === "fogo" ? 8 : undefined);
            const P = J.jogador;
            if (!this.acertou && Math.hypot(P.x - fx, P.y - fy) < 9 && feriJogador(D0(e) * 0.9, el)) this.acertou = true;
            propsEm(fx, fy, 6, p => danificarProp(p, p.max * 0.9, el));
            return this.L < comp || this.t < comp / 220 + 1.2;
          },
          chao(ox: number, oy: number) {
            const a = Math.min(1, comp / 220 + 1.2 - this.t);
            lg.globalAlpha = Math.max(0, a);
            lg.strokeStyle = "#140f1c";
            lg.lineWidth = 2;
            lg.beginPath();
            this.pts.forEach(([x, y], i) => (i ? lg.lineTo(x - ox, y - oy) : lg.moveTo(x - ox, y - oy)));
            lg.stroke();
            lg.strokeStyle = cor;
            lg.lineWidth = 1;
            lg.beginPath();
            this.pts.forEach(([x, y], i) => (i ? lg.lineTo(x - ox, y - oy - 1) : lg.moveTo(x - ox, y - oy - 1)));
            lg.stroke();
            lg.globalAlpha = 1;
          }
        })
    });
  }
  return 1.0 + comp / 220;
}
/** tentaculos: tentáculos surgem do chão onde o jogador vai estar, um após o outro.
 * Campos do golpe que usa: intervalo, n, r, solo. */
export function golpeTentaculos(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 6,
    iv = g.intervalo || 0.45,
    r = g.r || 14;
  for (let i = 0; i < n; i++)
    agendar(i * iv, () => {
      if (e.hp <= 0) return;
      const P = J.jogador,
        x = P.x + J.pvx * 0.35,
        y = P.y + J.pvy * 0.35;
      perigo({
        tipo: "circ",
        x,
        y,
        r,
        t: 0.6,
        cor,
        fim: () => {
          const P = J.jogador;
          if (Math.hypot(P.x - x, P.y - y) < r) feriJogador(D0(e) * 0.9, el);
          propsEm(x, y, r, p => danificarProp(p, p.max * 1.2, el));
          empurrarProps(x, y, r + 6, 1500);
          if (g.solo) pintarSolo(x, y, r * 0.7, g.solo);
          tremor(2);
          particulas(x, y, "#6a5038", 8, 60);
          J.golpes.push({
            t: 0,
            atualizar(dt) {
              this.t += dt;
              return this.t < 0.65;
            },
            frente(ox: number, oy: number) {
              const sa = quadroEfeito(e, e.golpeIdx || 0, Math.min(3, Math.floor((this.t / 0.65) * 4)), 28);
              if (sa) {
                lg.drawImage(sa, Math.round(x - ox - 14), Math.round(y - oy - 26));
                return;
              }
              const h = Math.sin(Math.min(1, this.t / 0.65) * Math.PI) * 22,
                cc = g.solo === "vinha" ? "#3f7a34" : g.solo === "sombra" ? "#3a2050" : tom(e.cor, 0.8);
              for (let k = 0; k < h; k++) {
                const w = Math.max(1, 4 - k * 0.15);
                lg.fillStyle = k % 3 ? cc : tom(cc, 1.3);
                lg.fillRect(Math.round(x - ox - w / 2 + Math.sin(k * 0.3 + this.t * 8) * 2), Math.round(y - oy - k), Math.round(w), 1);
              }
            }
          });
        }
      });
    });
  return n * iv + 0.7;
}
/** sopro: sopro em cone na frente do chefe; pode empurrar e marcar o chão.
 * Campos do golpe que usa: alcance, ang, empurra, solo. */
export function golpeSopro(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const ang = g.ang || 0.9,
    L = g.alcance || 100,
    a = Math.atan2(P.y - e.y, P.x - e.x);
  perigo({ tipo: "cone", x: e.x, y: e.y, a, ab: ang, r: L, t: 0.6, cor });
  agendar(0.6, () => {
    if (e.hp <= 0) return;
    J.golpes.push({
      t: 0,
      hit: 0,
      ts: 0,
      atualizar(dt: number) {
        this.t += dt;
        this.hit -= dt;
        this.ts -= dt;
        if (e.hp <= 0) return false;
        const P = J.jogador,
          d = Math.hypot(P.x - e.x, P.y - e.y),
          dentro = d < L && Math.abs(angDif(Math.atan2(P.y - e.y, P.x - e.x), a)) < ang / 2;
        if (dentro && this.hit <= 0 && feriJogador(D0(e) * 0.45, el)) this.hit = 0.35;
        if (dentro && g.empurra && J.dashT <= 0) {
          P.x += Math.cos(a) * 45 * dt;
          P.y += Math.sin(a) * 45 * dt;
        }
        if (C)
          for (const p of C.lista) {
            if (p.morto) continue;
            const dp = Math.hypot(p.x - e.x, p.y - e.y);
            if (dp > L || Math.abs(angDif(Math.atan2(p.y - e.y, p.x - e.x), a)) > ang / 2) continue;
            danificarProp(p, p.max * 0.5 * dt, el);
            if (g.empurra && !p.mat.fixo) {
              p.vx += ((Math.cos(a) * 900) / p.m) * dt;
              p.vy += ((Math.sin(a) * 900) / p.m) * dt;
            }
          }
        for (let k = 0; k < 3; k++) {
          if (J.parts.length > 320) J.parts.shift();
          const aa = a + rnd(-ang / 2, ang / 2),
            v = rnd(L * 0.9, L * 1.6);
          J.parts.push({
            x: e.x + Math.cos(a) * e.r,
            y: e.y + Math.sin(a) * e.r,
            vx: Math.cos(aa) * v,
            vy: Math.sin(aa) * v - 8,
            vida: rnd(0.4, 0.7),
            max: 0.7,
            cor: k ? cor : tom(cor, 1.4),
            tam: 1 + Math.floor(Math.random() * 2)
          });
        }
        if (g.solo && this.ts <= 0) {
          this.ts = 0.04;
          const aa = a + rnd(-ang / 2, ang / 2),
            rr = rnd(e.r, L);
          pintarSolo(e.x + Math.cos(aa) * rr, e.y + Math.sin(aa) * rr, 5, g.solo);
        }
        return this.t < 1.3;
      }
    });
  });
  return 2.0;
}
/** escuridao: escurece a tela por um tempo.
 * Campos do golpe que usa: dur. */
export function golpeEscuridao(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  J.escuroT = g.dur || 5;
  J.escuroAlvo = 0.82;
  particulas(e.x, e.y, "#140f1c", 30, 100, 2);
  return 0.6;
}
/** clones: cópias do chefe aparecem em volta do jogador; não relança enquanto houver cópias vivas. Devolve -1 quando não pode ser usado agora (o chefe passa ao golpe seguinte).
 * Campos do golpe que usa: dur, n. */
export function golpeClones(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  if (J.inimigos.some(o => o.clone && o.hp > 0)) return -1; // não relança enquanto houver cópias vivas
  const n = g.n || 3,
    dur = Math.min(6, g.dur || 6);
  for (let i = 0; i < n; i++) {
    const P = J.jogador,
      a = (i / n) * 6.283 + Math.random(),
      x = P.x + Math.cos(a) * 60,
      y = P.y + Math.sin(a) * 60;
    spawnInimigo(0);
    const c = J.inimigos[J.inimigos.length - 1];
    Object.assign(c, {
      x,
      y,
      def: e.def,
      tam: e.tam,
      cor: e.cor,
      spr: e.spr,
      clone: true,
      elite: true,
      hp: e.max * 0.02,
      max: e.max * 0.02,
      dano: e.dano * 0.5,
      v: e.v,
      r: e.r * 0.8,
      esc: 1,
      el: e.el,
      tipo: 9,
      surgindo: 0.3,
      vidaClone: dur
    });
    particulas(x, y, "#e8e0ff", 10, 50);
  }
  J.golpes.push({
    t: 0,
    cd: 1.5,
    atualizar(dt: number) {
      this.t += dt;
      this.cd -= dt;
      const cl = J.inimigos.filter(o => o.clone && o.hp > 0);
      for (const o of cl) {
        o.vidaClone -= dt;
        if (o.vidaClone <= 0) {
          o.hp = 0;
          particulas(o.x, o.y, "#e8e0ff", 8, 40);
        }
      }
      if (this.cd <= 0) {
        this.cd = 2.2;
        for (const o of cl) {
          const P = J.jogador,
            a = Math.atan2(P.y - o.y, P.x - o.x);
          for (let i = -1; i <= 1; i++) bala(o, o.x, o.y, a + i * 0.25, 62, D0(e) * 0.35, "estrela", e.el);
        }
      }
      return this.t < dur + 0.5;
    }
  });
  const outro = J.inimigos.filter(o => o.clone)[0];
  if (outro) {
    const x = e.x,
      y = e.y;
    e.x = outro.x;
    e.y = outro.y;
    outro.x = x;
    outro.y = y;
  }
  return 0.8;
}
/** teleporte: o chefe some e reaparece perto do jogador, com o ponto de chegada anunciado. */
export function golpeTeleporte(e: Inimigo, g: Golpe, _P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const P = J.jogador,
    a = Math.atan2(e.y - P.y, e.x - P.x) + Math.PI + rnd(-0.6, 0.6),
    x = P.x + Math.cos(a) * 48,
    y = P.y + Math.sin(a) * 48;
  e.oculto = true;
  if (C) for (let i = 0; i < 4; i++) fumaca(C, e.x + rnd(-5, 5), e.y, 6, "#c8c8e0");
  perigo({
    tipo: "circ",
    x,
    y,
    r: 22,
    t: 0.6,
    cor,
    fim: () => {
      e.x = x;
      e.y = y;
      e.oculto = false;
      anel(x, y, 22, cor, 0.4);
      const P = J.jogador;
      if (Math.hypot(P.x - x, P.y - y) < 22) feriJogador(D0(e) * 0.8, el);
      empurrarProps(x, y, 26, 1200);
    }
  });
  return 1.1;
}
/** regenerar: o chefe recupera vida uma vez, quando está abaixo de 60%. Devolve -1 quando não pode ser usado agora (o chefe passa ao golpe seguinte).
 * Campos do golpe que usa: metal, pct. */
export function golpeRegenerar(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  if (e.regenerou || e.hp > e.max * 0.6) return -1;
  if (g.metal) {
    const metais = C ? C.lista.filter(p => !p.morto && p.mat.condutor && dist2(p, e) < 170 * 170) : [];
    if (!metais.length) return -1;
    metais.forEach((p, i) =>
      agendar(i * 0.2, () => {
        if (p.morto) return;
        raio(p.x, p.y - p.r, e.x, e.y, "#9fe0ff");
        p.morto = true;
        particulas(p.x, p.y, "#c8c8d0", 10, 60);
        e.hp = Math.min(e.max, e.hp + (e.max * g.pct) / 2);
      })
    );
    e.regenerou = true;
    return 0.4 + metais.length * 0.2;
  }
  e.regenerou = true;
  J.golpes.push({
    t: 0,
    atualizar(dt: number) {
      this.t += dt;
      if (e.hp <= 0) return false;
      e.hp = Math.min(e.max, e.hp + (e.max * g.pct * dt) / 1.5);
      if (Math.random() < dt * 20) particulas(e.x + rnd(-8, 8), e.y + rnd(-8, 8), "#7fe0a0", 1, 30);
      return this.t < 1.5;
    }
  });
  return 1.5;
}
/** transmutar: objetos do cenário em volta do chefe mudam de material.
 * Campos do golpe que usa: r, solo. */
export function golpeTransmutar(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const r = g.r || 60;
  anel(e.x, e.y, r, "#ffd34a", 0.7);
  propsEm(e.x, e.y, r, p => transmutarProp(p));
  if (g.solo) pintarSolo(e.x, e.y, r * 0.8, g.solo);
  tremor(2);
  return 1.0;
}
/** mergulho: o chefe some no chão e emerge sob o jogador; pode deixar rastro.
 * Campos do golpe que usa: r, rastro. */
export function golpeMergulho(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  e.oculto = true;
  e.mergulho = true;
  particulas(e.x, e.y, "#8a6a48", 16, 70);
  tremor(2);
  J.golpes.push({
    t: 0,
    parou: false,
    atualizar(dt: number) {
      this.t += dt;
      if (e.hp <= 0) {
        e.oculto = false;
        e.mergulho = false;
        return false;
      }
      const P = J.jogador;
      if (!this.parou) {
        const dx = P.x - e.x,
          dy = P.y - e.y,
          d = Math.hypot(dx, dy) || 1;
        e.x += (dx / d) * 115 * dt;
        e.y += (dy / d) * 115 * dt;
        if (g.rastro && Math.random() < dt * 14) pintarSolo(e.x, e.y, 5, g.rastro);
        if (Math.random() < dt * 14) particulas(e.x, e.y, "#8a6a48", 1, 30);
        if (d < 6 || this.t > 2.2) {
          this.parou = true;
          const x = e.x,
            y = e.y,
            r = g.r || 28;
          perigo({
            tipo: "circ",
            x,
            y,
            r,
            t: 0.55,
            cor,
            fim: () => {
              e.oculto = false;
              e.mergulho = false;
              tremor(6);
              anel(x, y, r, cor, 0.5);
              particulas(x, y, "#8a6a48", 24, 120, 2);
              const P = J.jogador;
              if (Math.hypot(P.x - x, P.y - y) < r) feriJogador(D0(e) * 1.1, el);
              propsEm(x, y, r, p => danificarProp(p, p.max * 1.5, el));
              empurrarProps(x, y, r + 10, 2500);
            }
          });
        }
      }
      return !this.parou || e.mergulho;
    }
  });
  return 3.2;
}
/** tempestade: raios caem perto do jogador em sequência.
 * Campos do golpe que usa: intervalo, n, r. */
export function golpeTempestade(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const n = g.n || 5,
    iv = g.intervalo || 0.5,
    r = g.r || 22;
  for (let i = 0; i < n; i++)
    agendar(i * iv, () => {
      if (e.hp <= 0) return;
      const P = J.jogador;
      let x = P.x + rnd(-24, 24),
        y = P.y + rnd(-24, 24),
        alvo = null;
      if (C)
        for (const p of C.lista)
          if (p.mat.condutor && !p.morto && Math.hypot(p.x - x, p.y - y) < 60) {
            alvo = p;
            x = p.x;
            y = p.y - p.r;
            break;
          }
      perigo({
        tipo: "circ",
        x,
        y,
        r,
        t: 0.75,
        cor: "#e8f0ff",
        fim: () => {
          if (C) cairRaio(C, x, y, alvo);
          else {
            anel(x, y, r, "#e8f0ff", 0.4);
            const P = J.jogador;
            if (Math.hypot(P.x - x, P.y - y) < r) feriJogador(D0(e), "raio");
          }
        }
      });
    });
  return n * iv + 0.8;
}
/** bola: esferas que crescem e explodem em área.
 * Campos do golpe que usa: cresce, dur, n, r. */
export function golpeBola(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  for (let i = 0; i < (g.n || 1); i++) {
    const a = Math.atan2(P.y - e.y, P.x - e.x) + (i ? 0.8 : 0) + rnd(-0.2, 0.2);
    J.golpes.push({
      x: e.x,
      y: e.y,
      vx: Math.cos(a) * 150,
      vy: Math.sin(a) * 150,
      r: g.r || 6,
      t: 0,
      giro: 0,
      hitJ: 0,
      neve: g.cresce,
      atualizar(dt: number) {
        this.t += dt;
        this.hitJ -= dt;
        const P = J.jogador,
          ox = P.x - VW / 2,
          oy = P.y - VH / 2;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.giro += (Math.hypot(this.vx, this.vy) * dt) / this.r;
        if (this.x < ox + this.r || this.x > ox + VW - this.r) {
          this.vx = -this.vx;
          this.x = Math.max(ox + this.r, Math.min(ox + VW - this.r, this.x));
        }
        if (this.y < oy + this.r || this.y > oy + VH - this.r) {
          this.vy = -this.vy;
          this.y = Math.max(oy + this.r, Math.min(oy + VH - this.r, this.y));
        }
        if (this.neve) {
          this.r = Math.min(15, this.r + Math.hypot(this.vx, this.vy) * dt * 0.012);
          pintarSolo(this.x, this.y, this.r * 0.6, "gelo", 20);
        }
        propsEm(this.x, this.y, this.r, (p, d) => {
          if (p.mat.fixo || this.neve || p.m > 100) {
            const nx = (this.x - p.x) / d,
              ny = (this.y - p.y) / d,
              vn = this.vx * nx + this.vy * ny;
            if (vn < 0) {
              this.vx -= 2 * vn * nx;
              this.vy -= 2 * vn * ny;
            }
          }
          danificarProp(p, p.max * (this.neve ? 3 : 0.6), null);
          if (!p.mat.fixo) {
            p.vx += this.vx * 0.5;
            p.vy += this.vy * 0.5;
          }
        });
        if (this.hitJ <= 0 && Math.hypot(P.x - this.x, P.y - this.y) < this.r + 4 && feriJogador(D0(e) * 0.8, e.el)) {
          this.hitJ = 0.8;
          J.pvx += this.vx * 0.5;
          J.pvy += this.vy * 0.5;
        }
        const f = FONTE;
        defFonte("ambiente");
        for (const o of J.inimigos)
          if (o !== e && o.hp > 0 && !o.chefe && Math.hypot(o.x - this.x, o.y - this.y) < this.r + o.r) {
            danoSimples(o, pctMax(o, 0.4) * dt * 10);
            o.x += this.vx * dt;
            o.y += this.vy * dt;
          }
        defFonte(f);
        if (this.t > (g.dur || 9)) {
          particulas(this.x, this.y, this.neve ? "#f4f8ff" : "#8a5a30", 16, 80);
          return false;
        }
        return true;
      },
      frente(ox: number, oy: number) {
        const x = Math.round(this.x - ox),
          y = Math.round(this.y - oy);
        lg.fillStyle = "rgba(0,0,0,.3)";
        lg.beginPath();
        lg.ellipse(x, y + this.r * 0.8, this.r, this.r * 0.35, 0, 0, Math.PI * 2);
        lg.fill();
        lg.fillStyle = this.neve ? "#f0f6ff" : "#6a4024";
        lg.beginPath();
        lg.arc(x, y, this.r, 0, Math.PI * 2);
        lg.fill();
        lg.strokeStyle = this.neve ? "#c8dcf0" : "#2a1810";
        lg.beginPath();
        lg.arc(x, y, this.r * 0.6, this.giro, this.giro + 2.2);
        lg.stroke();
        lg.fillStyle = "#ffffff";
        lg.fillRect(x - Math.round(this.r * 0.4), y - Math.round(this.r * 0.5), 1, 1);
      }
    });
  }
  return 0.7;
}
/** telecinese: pedras sobem em volta do chefe e são arremessadas em linha contra o jogador.
 * Campos do golpe que usa: n, r. */
export function golpeTelecinese(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const r = g.r || 90;
  let alvos = C ? C.lista.filter(p => !p.morto && !p.mat.fixo && p.m < 120 && dist2(p, e) < r * r).slice(0, g.n || 4) : [];
  if (alvos.length < 2 && C)
    for (let i = 0; i < 2; i++) {
      const a = Math.random() * 6.28;
      const p = criarProp("rocha", e.x + Math.cos(a) * 24, e.y + Math.sin(a) * 24, { subindo: 0.3 });
      if (p) alvos.push(p);
    }
  alvos.forEach((p, i) => {
    p.levita = true;
    const P = J.jogador;
    perigo({
      tipo: "linha",
      x: p.x,
      y: p.y,
      x2: p.x + (P.x - p.x) * 1.6,
      y2: p.y + (P.y - p.y) * 1.6,
      larg: 8,
      t: 0.8 + i * 0.15,
      cor: "#e8a0ff",
      fim: () => {
        if (p.morto) return;
        const P = J.jogador,
          a = Math.atan2(P.y - p.y, P.x - p.x);
        p.morto = true;
        bala(e, p.x, p.y - 6, a, 190, D0(e) * 0.8, "objeto", e.el, { spr: spriteProp(C, p), quebra: true, deixaLascas: p });
      }
    });
  });
  return 1.4 + alvos.length * 0.15;
}
/** avalanche: uma frente larga de pedras desce pelo mapa, anunciada em faixa.
 * Campos do golpe que usa: larg, solo, vel. */
export function golpeAvalanche(e: Inimigo, g: Golpe, _P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const P = J.jogador,
    a = Math.atan2(P.y - e.y, P.x - e.x),
    ux = Math.cos(a),
    uy = Math.sin(a),
    px = -uy,
    py = ux,
    inicio = Math.max(VW, VH) * 0.75,
    comp = Math.max(VW, VH) * 1.8,
    gap = rnd(-30, 30);
  const x0 = P.x - ux * inicio,
    y0 = P.y - uy * inicio;
  perigo({
    tipo: "linha",
    x: x0 - (px * comp) / 2,
    y: y0 - (py * comp) / 2,
    x2: x0 + (px * comp) / 2,
    y2: y0 + (py * comp) / 2,
    larg: g.larg ? 18 : 16,
    t: 1.0,
    cor: "#e8f4ff"
  });
  agendar(1.0, () =>
    J.golpes.push({
      s: 0,
      ts: 0,
      acertou: false,
      atualizar(dt: number) {
        this.s += (g.vel || 70) * dt;
        this.ts -= dt;
        const cx = x0 + ux * this.s,
          cy = y0 + uy * this.s,
          P = J.jogador;
        const dp = (P.x - cx) * ux + (P.y - cy) * uy,
          lat = (P.x - cx) * px + (P.y - cy) * py;
        if (!this.acertou && Math.abs(dp) < 9 && Math.abs(lat - gap) > 14 && feriJogador(D0(e) * 1.0, "agua")) {
          this.acertou = true;
          P.x += ux * 20;
          P.y += uy * 20;
        }
        if (this.ts <= 0) {
          this.ts = 0.05;
          for (let k = 0; k < 10; k++) {
            const l = rnd(-comp / 2, comp / 2);
            if (Math.abs(l - gap) < 14) continue;
            pintarSolo(cx + px * l, cy + py * l, 5, g.solo || "gelo", 30);
          }
        }
        propsEm(cx, cy, comp / 2, p => {
          const d = (p.x - cx) * ux + (p.y - cy) * uy;
          if (Math.abs(d) < 8) danificarProp(p, p.max * 3, null);
        });
        this.c = [cx, cy];
        return this.s < inicio * 2 + 40;
      },
      frente(ox: number, oy: number) {
        if (!this.c) return;
        const [cx, cy] = this.c;
        for (let l = -comp / 2; l < comp / 2; l += 3) {
          if (Math.abs(l - gap) < 14) continue;
          const x = cx + px * l - ox,
            y = cy + py * l - oy,
            h = 5 + Math.sin(l * 0.7 + this.s * 0.3) * 2;
          lg.fillStyle = "#f4f8ff";
          lg.fillRect(Math.round(x - ux * 4), Math.round(y - uy * 4 - h), 3, h + 2);
          lg.fillStyle = "#c8dcf0";
          lg.fillRect(Math.round(x - ux * 4), Math.round(y - uy * 4 + 1), 3, 1);
        }
      }
    })
  );
  return 1.2;
}
/** terremoto: o chão treme, objetos se quebram e pedras caem em volta do jogador.
 * Campos do golpe que usa: dur, n. */
export function golpeTerremoto(e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined): number {
  const dur = g.dur || 3,
    n = g.n || 6;
  J.golpes.push({
    t: 0,
    ts: 0,
    atualizar(dt: number) {
      this.t += dt;
      this.ts -= dt;
      if (this.ts <= 0) {
        this.ts = 0.22;
        tremor(3.5);
        if (C)
          for (const p of C.lista) {
            if (p.morto || Math.random() > 0.3) continue;
            if (!p.mat.fixo) {
              p.vx += rnd(-40, 40);
              p.vy += rnd(-40, 40);
            }
            danificarProp(p, p.max * 0.12, null);
          }
        if (C)
          for (const q of C.destrocos) {
            q.vz += rnd(10, 40);
          }
      }
      return this.t < dur;
    }
  });
  for (let i = 0; i < n; i++)
    agendar(0.3 + (i * dur) / n, () => {
      const P = J.jogador,
        x = P.x + rnd(-70, 70),
        y = P.y + rnd(-60, 60);
      perigo({
        tipo: "circ",
        x,
        y,
        r: 12,
        t: 0.85,
        cor: "#a89878",
        queda: "pedra",
        fim: () => impactoChuva(e, { proj: "pedra", deixa: Math.random() < 0.5 ? "rocha" : null }, x, y, 12)
      });
    });
  return dur + 0.3;
}

/** tipo de golpe → função; tipo desconhecido não faz nada (executarGolpe devolve 0.5) */
export const GOLPES: Record<string, (e: Inimigo, g: Golpe, P: Ponto, cor: string, el: Elemento, C: Cena | undefined) => number> = {
  leque: golpeLeque,
  espiral: golpeEspiral,
  anel: golpeAnel,
  chuva: golpeChuva,
  investida: golpeInvestida,
  salto: golpeSalto,
  feixe: golpeFeixe,
  onda: golpeOnda,
  vortice: golpeVortice,
  invocar: golpeInvocar,
  muralha: golpeMuralha,
  fissura: golpeFissura,
  tentaculos: golpeTentaculos,
  sopro: golpeSopro,
  escuridao: golpeEscuridao,
  clones: golpeClones,
  teleporte: golpeTeleporte,
  regenerar: golpeRegenerar,
  transmutar: golpeTransmutar,
  mergulho: golpeMergulho,
  tempestade: golpeTempestade,
  bola: golpeBola,
  telecinese: golpeTelecinese,
  avalanche: golpeAvalanche,
  terremoto: golpeTerremoto
};
