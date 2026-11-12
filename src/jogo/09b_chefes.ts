// Elementar · chefes: inteligência, golpes, perigos anunciados e segunda fase
import "./09_criaturas.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import {
  agendar,
  ativos,
  COR,
  ctx,
  ELS,
  escolha,
  H,
  HUD_BAIXO,
  J,
  lg,
  mistura,
  R,
  relatar,
  rnd,
  SIM,
  som,
  tom,
  UNIV,
  VH,
  VW,
  W
} from "./01_nucleo.js";
import { anel, danoSimples, parar, particulas, raio, texto, tremor } from "./02_combate.js";
import { aplicarElementoNoSolo, CEL, DUR, frio, soloEm } from "./04_ambiente.js";
import { QUAL } from "./06_loop.js";
import { brasa, CH, danificarProp, gerarPedaco, MAT, novoProp, quebrar } from "./07_cenario.js";
import { silhueta, silhuetaMundo, spriteProp } from "./07b_cenario_desenho.js";
import { impactoArte, quadroEfeito } from "./07c_cenario_arte.js";
import { estruturaU, sairDoAbismo } from "./07d_estrutura.js";
import { ameacaDiretor } from "./08_horda.js";
import { particulasEl } from "./08b_efeitos.js";
import { tal } from "./08d_poderes.js";
import { evento } from "./08e_conquistas.js";
import { custo, passiva } from "./08f_lendas.js";
import { GOLPES } from "./09c_golpes.js";
// ================================================================ chefes: golpes característicos, perigos anunciados e segunda fase
// Regra de justiça: tudo o que machuca aparece antes como uma marca no chão (círculo, linha, cone ou anel).
export function angDif(a: number, b: number) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
export function distSeg(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1,
    dy = y2 - y1,
    L = dx * dx + dy * dy || 1,
    t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / L));
  return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
}
export function feriJogador(dano: number, el: Elemento) {
  if (J.invuln > 0 || J.fim || J.deus) return false;
  if (J.chefeVivo) J.atingidoNoChefe = true;
  if (J.escudoGolpes > 0) {
    J.escudoGolpes--;
    particulasEl(J.jogador.x, J.jogador.y, "luz", 6, 50);
    return false;
  }
  dano *= (J.reducao > 0 ? 0.7 : 1) * ameacaDiretor() * tal.defesa() * (1 - custo("defesa"));
  if (J.escudo > 0) {
    const a = Math.min(J.escudo, dano);
    J.escudo -= a;
    dano -= a;
  }
  J.vida -= dano;
  J.danoRec = (J.danoRec || 0) + dano;
  R.st.recBala += dano;
  tremor(2.5);
  som("dano");
  particulas(J.jogador.x, J.jogador.y, COR[el] || "#ff5a4a", 5, 60);
  return true;
}
export function bala(
  dono: Inimigo,
  x: number,
  y: number,
  ang: number,
  vel: number,
  dano: number,
  proj: string,
  el: Elemento | "multi",
  extra?: Partial<Bala>
) {
  const el2 = el === "multi" ? escolha(ELS) : el;
  J.balas.push(
    Object.assign(
      {
        x,
        y,
        vx: Math.cos(ang) * vel,
        vy: Math.sin(ang) * vel,
        vida: 5,
        dano,
        proj: proj || "bola",
        el: el2,
        cor: COR[el2] || "#ff5a4a",
        dono,
        linhaVfx: dono && dono.chefe ? dono.golpeIdx || 0 : null
      },
      extra || {}
    )
  );
}
export function perigo(o: Perigo): Perigo {
  o.max = o.t;
  J.perigos.push(o);
  return o;
}
export function pintarSolo(x: number, y: number, r: number, tipo: string, dur?: number) {
  const C0 = Math.floor((x - r) / CEL),
    C1 = Math.floor((x + r) / CEL),
    R0 = Math.floor((y - r) / CEL),
    R1 = Math.floor((y + r) / CEL);
  for (let cy = R0; cy <= R1; cy++)
    for (let cx = C0; cx <= C1; cx++) {
      const px = cx * CEL + 4,
        py = cy * CEL + 4;
      if ((px - x) ** 2 + (py - y) ** 2 > r * r) continue;
      let t = tipo;
      if (t === "caos") t = escolha(["fogo", "gelo", "lama", "sombra", "luz", "eletrico", "vinha", "agua"]);
      if (t === "agua" && frio()) t = "gelo";
      if (t === "eletrico") {
        J.solo.set(cx + "," + cy, { t: "eletrico", ate: J.t + (dur || 6) });
        continue;
      }
      J.solo.set(cx + "," + cy, { t, ate: J.t + (dur ?? DUR[t] ?? 30) });
    }
}
export function criarProp(tipo: string, x: number, y: number, extra?: Partial<PropCena>) {
  const C = J.cena;
  if (!C || !MAT[tipo]) return null;
  const cx = Math.floor(x / CH),
    cy = Math.floor(y / CH);
  gerarPedaco(C, cx, cy);
  const p = novoProp(tipo, x, y, Math.random);
  Object.assign(p, extra || {});
  C.props.get(cx + ":" + cy).push(p);
  C.lista.push(p);
  return p;
}
export const corG = (e: Inimigo, g) => (g.el && g.el !== "multi" ? COR[g.el] : COR[e.el] || "#ff5a4a");
export const elG = (e: Inimigo, g) => (g.el === "multi" ? escolha(ELS) : g.el || e.el);
export const D0 = (e: Inimigo) => e.dano * (e.mini ? 0.85 : 1);
export function propsEm(x: number, y: number, r: number, fn: (p: PropCena, d: number) => void) {
  if (!J.cena) return;
  for (const p of J.cena.lista) {
    if (p.morto) continue;
    if ((p.x - x) ** 2 + (p.y - y) ** 2 < (r + p.r) ** 2) fn(p, Math.hypot(p.x - x, p.y - y) || 1);
  }
}
export function empurrarProps(x: number, y: number, r: number, forca: number) {
  propsEm(x, y, r, (p, d) => {
    if (p.mat.fixo) return;
    const dv = Math.min(300, forca / p.m);
    p.vx += ((p.x - x) / d) * dv;
    p.vy += ((p.y - y) / d) * dv;
  });
  if (J.cena)
    for (const g of J.cena.destrocos) {
      const d = Math.hypot(g.x - x, g.y - y) || 1;
      if (d < r) {
        g.vx += ((g.x - x) / d) * 120;
        g.vy += ((g.y - y) / d) * 120;
        g.vz += 60;
      }
    }
}

// ---------------------------------------------------------------- inteligência do chefe
// cansaço: depois de 75 s de luta o chefe recebe cada vez mais dano (2x aos 105 s, 3x aos 135 s); evita lutas intermináveis em encontros desfavoráveis
export function fadigaChefe(e: Inimigo) {
  if (!e.chefe || J.tChefe == null) return 1;
  return 1 + Math.max(0, J.t - J.tChefe - 75) / 30;
}
export function anunciar(e: { el: Elemento }, txt: string, sub?: string) {
  J.anuncio = { txt, sub: sub || "", vida: sub ? 3.2 : 1.8, cor: COR[e.el] || "#ffd34a" };
}
export function iaChefe(e: Inimigo, dt: number, P: Ponto) {
  const def = e.def;
  if (!def || !def.golpes) {
    return false;
  }
  const ia = e.ia || (e.ia = { cd: 2.2, idx: Math.floor(Math.random() * def.golpes.length), ocupado: 0, fase: 1, usados: {}, anuncio: 0 });
  if (ia.anuncio > 0) ia.anuncio -= dt;
  e.tAtk = (e.tAtk || 0) + dt;
  if (ia.trocaFase > 0) ia.trocaFase -= dt;
  // salto em andamento
  if (e.noAr) {
    const s = e.noAr;
    s.t += dt;
    const q = Math.min(1, s.t / s.dur);
    e.x = s.x0 + (s.x1 - s.x0) * q;
    e.y = s.y0 + (s.y1 - s.y0) * q;
    e.z = Math.sin(q * Math.PI) * 34;
    if (q >= 1) {
      e.noAr = null;
      e.z = 0;
    }
  }
  // investida em andamento: atropela, quebra objetos, deixa rastro, derruba árvores
  if (e.dash) {
    const s = e.dash;
    s.t -= dt;
    const g = s.g || {};
    if (!s.acertou && Math.hypot(P.x - e.x, P.y - e.y) < e.r + 5) {
      if (feriJogador(D0(e) * 1.1, elG(e, g))) {
        s.acertou = true;
        if (g.cura) e.hp = Math.min(e.max, e.hp + e.max * 0.03);
      }
    }
    if (!g.voo)
      propsEm(e.x, e.y, e.r, (p, d) => {
        if (!p.mat.indestrutivel) danificarProp(p, p.max * 2.5, elG(e, g));
        if (!p.mat.fixo) {
          p.vx += s.vx * 0.6;
          p.vy += s.vy * 0.6;
        }
      });
    s.dist = (s.dist || 0) + Math.hypot(s.vx, s.vy) * dt;
    if (g.rastro && s.dist - (s.ultRastro || 0) > 6) {
      s.ultRastro = s.dist;
      pintarSolo(e.x, e.y, 6, g.rastro, g.rastro === "fogo" ? 8 : undefined);
    }
    if (g.tronco && s.dist - (s.ultTronco || 0) > 40 && J.cena) {
      s.ultTronco = s.dist;
      const n = Math.hypot(s.vx, s.vy) || 1,
        lado = Math.random() < 0.5 ? 1 : -1,
        x = e.x - (s.vy / n) * 16 * lado,
        y = e.y + (s.vx / n) * 16 * lado;
      const t = criarProp("tronco", x, y, { eixo: Math.abs(s.vx) > Math.abs(s.vy) ? "v" : "h" });
      if (t) {
        t.vx = (-s.vy / n) * lado * 90;
        t.vy = (s.vx / n) * lado * 90;
      }
      particulas(x, y, "#3f7a34", 10, 60);
    }
    if (Math.random() < dt * 20) particulas(e.x, e.y + e.r * 0.5, "#c8b890", 1, 40);
    if (s.t <= 0) {
      e.dash = null;
      tremor(2);
    }
  }
  // saquê: o Orochi vai atrás dos barris e fica bêbado se quebrar um
  if (J.cena && !e.bebado)
    propsEm(e.x, e.y, e.r + 2, p => {
      if (p.saque && !p.morto) {
        p.hp = 0;
        quebrar(p);
        e.bebado = 4.5;
        evento("bebado");
        ia.ocupado = 0;
        e.parado = false;
        e.dash = null;
        anunciar(e, "Bêbado!", "vulnerável por alguns segundos");
        for (let i = 0; i < 10; i++) particulas(e.x, e.y - 10, "#ffb0c0", 1, 30);
      }
    });
  if (e.bebado > 0) {
    e.bebado -= dt;
    if (Math.random() < dt * 3) particulas(e.x + rnd(-6, 6), e.y - e.r * 1.6, "#ffe0f0", 1, 15);
    return true;
  }
  // Caríbdis: na segunda fase, o redemoinho não para de puxar
  if (e.puxao && J.dashT <= 0) {
    const d = Math.hypot(P.x - e.x, P.y - e.y) || 1;
    if (d < 170) {
      P.x += ((e.x - P.x) / d) * 14 * dt;
      P.y += ((e.y - P.y) / d) * 14 * dt;
    }
  }
  if (ia.ocupado > 0) {
    ia.ocupado -= dt;
    if (ia.ocupado <= 0) e.parado = false;
    return true;
  }
  // segunda fase: o cenário muda
  if (e.chefe && ia.fase === 1 && e.hp < e.max * 0.5 && def.fase2) {
    ia.fase = 2;
    ia.trocaFase = 1.4;
    faseDois(e, def.fase2);
    ia.ocupado = 1.4;
    e.parado = true;
    return true;
  }
  // o Orochi persegue os barris de saquê quando existem
  if (J.cena && J.cena.lista.some(p => p.saque && !p.morto) && Math.random() < dt * 0.4) {
    const b = J.cena.lista.find(p => p.saque && !p.morto);
    const a = Math.atan2(b.y - e.y, b.x - e.x);
    e.dash = { vx: Math.cos(a) * 130, vy: Math.sin(a) * 130, t: Math.hypot(b.x - e.x, b.y - e.y) / 130 + 0.1, g: {} };
  }
  ia.cd -= dt * (ia.fase === 2 ? 1.35 : 1);
  if (Math.hypot(P.x - e.x, P.y - e.y) > 170) ia.cd = Math.max(ia.cd, 0.4); // não gasta golpes fora da tela
  if (ia.cd <= 0 && !e.dash && !e.noAr) {
    let tentativas = def.golpes.length;
    while (tentativas-- > 0) {
      const i = ia.idx % def.golpes.length;
      ia.idx++;
      const g = def.golpes[i];
      const dur = executarGolpe(e, g, P);
      if (dur < 0) continue;
      e.golpeIdx = i;
      e.tAtk = 0;
      ia.anuncio = 0.6;
      anunciar(e, g.nome);
      ia.ocupado = dur;
      e.parado = dur > 0.3;
      ia.cd = rnd(2.0, 3.2) * (e.mini ? 1.25 : 1);
      break;
    }
    if (ia.cd <= 0) ia.cd = 1.5;
  }
  return true;
}

// ---------------------------------------------------------------- as primitivas dos golpes
// cada tipo de golpe é uma função em 09c_golpes.js (tabela GOLPES)
export function executarGolpe(e: Inimigo, g: Golpe, P: Ponto) {
  const cor = corG(e, g),
    el = elG(e, g),
    C = J.cena;
  const f = GOLPES[g.tipo];
  return f ? f(e, g, P, cor, el, C) : 0.5;
}

export function impactoChuva(e: Inimigo, g, x: number, y: number, r: number) {
  const P = J.jogador,
    el = elG(e, g),
    cor = corG(e, g);
  impactoArte(e, x, y, Math.round(r * 2.2));
  if (Math.hypot(P.x - x, P.y - y) < r) feriJogador(D0(e) * 0.9, el);
  propsEm(x, y, r, p => danificarProp(p, p.max * 1.3, el));
  empurrarProps(x, y, r + 8, 1800);
  anel(x, y, r, cor, 0.35);
  particulas(x, y, cor, 10, 80);
  tremor(2.5);
  if (g.proj === "abobora") {
    anel(x, y, r + 6, "#ff8a3d", 0.4);
    pintarSolo(x, y, r * 0.8, "fogo");
    if (J.cena) for (let i = 0; i < 8; i++) brasa(x + rnd(-5, 5), y + rnd(-5, 5), rnd(2, 10));
  }
  if (g.deixa && J.cena) {
    if (g.deixa === "polvora_acesa") {
      const p = criarProp("polvora", x, y);
      if (p) p.pavio = 1.6;
    } else criarProp(g.deixa, x, y, { subindo: 0.15 });
  }
  if (g.solo) pintarSolo(x, y, r * 0.75, g.solo);
}
export function impactoSalto(e: Inimigo, g, x: number, y: number, r: number) {
  const P = J.jogador,
    el = elG(e, g),
    cor = corG(e, g);
  impactoArte(e, x, y, Math.round(r * 2.2));
  tremor(7);
  parar(0.04);
  anel(x, y, r, cor, 0.5);
  anel(x, y, r * 0.5, "#ffffff", 0.3);
  particulas(x, y, "#c8b890", 20, 110, 2);
  if (Math.hypot(P.x - x, P.y - y) < r) feriJogador(D0(e) * 1.1, el);
  propsEm(x, y, r, p => danificarProp(p, p.max * 1.3, el));
  empurrarProps(x, y, r + 12, 2600);
  if (g.fissura)
    for (let i = 0; i < g.fissura; i++) {
      const a = Math.random() * 6.283;
      executarFissuraCurta(x, y, a, r * 1.6, cor);
    }
  if (g.deixa)
    for (let i = 0; i < 3; i++) {
      const a = i * 2.09 + Math.random();
      criarProp(g.deixa, x + Math.cos(a) * (r + 8), y + Math.sin(a) * (r + 8), { subindo: 0.3 });
    }
  if (g.solo === "eletrico") {
    pintarSolo(x, y, r, "agua");
    agendar(0.4, () => pintarSolo(x, y, r, "eletrico", 6));
  } else if (g.solo) pintarSolo(x, y, r * 0.8, g.solo);
}
export function executarFissuraCurta(x: number, y: number, a: number, L: number, cor: string) {
  const pts = [[x, y]];
  let cx = x,
    cy = y;
  for (let s = 0; s < L; s += 5) {
    cx += Math.cos(a + rnd(-0.4, 0.4)) * 5;
    cy += Math.sin(a + rnd(-0.4, 0.4)) * 5;
    pts.push([cx, cy]);
  }
  J.golpes.push({
    t: 0,
    atualizar(dt: number) {
      this.t += dt;
      return this.t < 4;
    },
    chao(ox: number, oy: number) {
      lg.globalAlpha = Math.min(1, 4 - this.t);
      lg.strokeStyle = "#140f1c";
      lg.lineWidth = 1;
      lg.beginPath();
      pts.forEach(([x, y], i) => (i ? lg.lineTo(x - ox, y - oy) : lg.moveTo(x - ox, y - oy)));
      lg.stroke();
      lg.globalAlpha = 1;
    }
  });
}
export function transmutarProp(p: PropCena) {
  if (p.morto || p.mat.indestrutivel) return;
  const spr = p.spriteFixo || spriteProp(J.cena, p);
  if (!spr) return;
  p.spriteFixo = silhuetaMundo(spr, "#e0b040");
  p.ouro = true;
  p.mat = MAT.metal;
  p.hp = Infinity;
  p.max = Infinity;
  p.vx = p.vy = 0;
  p.queima = 0;
  p.pavio = 0;
  particulas(p.x, p.y, "#ffd34a", 8, 50);
}
// Jörmungandr: o corpo se enrola em volta e aperta; escape pela fresta ou com a esquiva
export function constricao(e: Inimigo, P: Ponto, r: number) {
  const cx = P.x,
    cy = P.y,
    gap = Math.random() * 6.283;
  J.golpes.push({
    t: 0,
    R: r,
    hit: 0,
    atualizar(dt: number) {
      this.t += dt;
      this.hit -= dt;
      const dur = 4,
        q = Math.min(1, this.t / dur);
      this.R = r * (1 - 0.78 * q * q);
      const rot = this.t * 0.7,
        P = J.jogador,
        d = Math.hypot(P.x - cx, P.y - cy) || 1;
      const aP = Math.atan2(P.y - cy, P.x - cx),
        naFresta = Math.abs(angDif(aP, gap + rot)) < 0.42;
      if (d > this.R - 5 && d < this.R + 6 && !naFresta && J.dashT <= 0) {
        if (this.hit <= 0 && feriJogador(D0(e) * 0.7, "agua")) this.hit = 0.6;
        const lado = d < this.R ? -1 : 1;
        P.x = cx + ((P.x - cx) / d) * (this.R + lado * 7);
        P.y = cy + ((P.y - cy) / d) * (this.R + lado * 7);
      }
      propsEm(cx, cy, this.R + 4, (p, dp) => {
        if (Math.abs(dp - this.R) < 7) danificarProp(p, p.max * 2 * dt * 5, null);
      });
      this.rot = rot;
      return this.t < dur;
    },
    frente(ox: number, oy: number) {
      const n = Math.max(12, Math.round((2 * Math.PI * this.R) / 5));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 6.283 + this.rot;
        if (Math.abs(angDif(a, gap + this.rot)) < 0.42) continue;
        const x = cx + Math.cos(a) * this.R - ox,
          y = cy + Math.sin(a) * this.R * 0.85 - oy;
        lg.fillStyle = i % 2 ? tom(e.cor, 1.15) : e.cor;
        lg.beginPath();
        lg.arc(x, y - 3, 3.2, 0, Math.PI * 2);
        lg.fill();
        lg.fillStyle = tom(e.cor, 1.5);
        lg.fillRect(Math.round(x) - 1, Math.round(y) - 5, 1, 1);
      }
    }
  });
}

// ---------------------------------------------------------------- segunda fase: o cenário muda
export function faseDois(e: Inimigo, f) {
  const P = J.jogador,
    C = J.cena;
  anunciar(e, f.nome, f.desc);
  tremor(8);
  parar(0.1);
  J.flash = { cor: COR[e.el] || "#ffffff", vida: 0.25 };
  anel(e.x, e.y, 60, COR[e.el], 0.8);
  const cx = (P.x + e.x) / 2,
    cy = (P.y + e.y) / 2;
  switch (f.op) {
    case "inundar":
      for (let i = 0; i < 220; i++) {
        const a = Math.random() * 6.283,
          r = Math.sqrt(Math.random()) * 140;
        if (Math.random() < 0.2) continue;
        pintarSolo(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 6, "agua", 60);
      }
      if (f.vapor)
        for (let i = 0; i < 40; i++) {
          const a = Math.random() * 6.283,
            r = Math.random() * 120;
          pintarSolo(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5, "vapor");
        }
      if (f.puxa) e.puxao = true;
      break;
    case "incendiar":
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * 6.283 + Math.random() * 0.3,
          gelo = f.gelo && i % 2;
        let x = e.x,
          y = e.y;
        for (let s = 0; s < 160; s += 5) {
          x += Math.cos(a + rnd(-0.3, 0.3)) * 5;
          y += Math.sin(a + rnd(-0.3, 0.3)) * 5;
          pintarSolo(x, y, 4, gelo ? "gelo" : "fogo", gelo ? 40 : 16);
        }
      }
      break;
    case "congelar":
      pintarSolo(cx, cy, 150, "gelo", 60);
      if (C && !C.kit.part.includes("neve")) C.kit.part = [...C.kit.part, "neve"];
      break;
    case "escurecer":
      J.escuroFixo = 0.78;
      break;
    case "floresta":
      pintarSolo(cx, cy, 150, "grama", 120);
      for (let i = 0; i < 40; i++) {
        const a = Math.random() * 6.283,
          r = Math.random() * 140;
        pintarSolo(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5, "vinha", 30);
      }
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * 6.283,
          r = rnd(55, 125),
          x = P.x + Math.cos(a) * r,
          y = P.y + Math.sin(a) * r;
        agendar(i * 0.12, () => criarProp("arvore", x, y, { subindo: 0.5 }));
      }
      break;
    case "ruir":
      if (C)
        C.lista
          .filter(p => !p.morto && !p.mat.indestrutivel)
          .forEach((p, i) =>
            agendar(i * 0.06, () => {
              if (!p.morto) danificarProp(p, p.max * 6, null);
            })
          );
      if (f.inunda) faseDois(e, { nome: "", desc: "", op: "inundar" });
      if (f.pedras)
        for (let i = 0; i < 8; i++)
          agendar(0.3 + i * 0.2, () => {
            const x = P.x + rnd(-80, 80),
              y = P.y + rnd(-70, 70);
            perigo({
              tipo: "circ",
              x,
              y,
              r: 14,
              t: 0.9,
              cor: "#a89878",
              queda: "pedra",
              fim: () => impactoChuva(e, { proj: "pedra", deixa: "rocha" }, x, y, 14)
            });
          });
      break;
    case "transmutar":
      if (C) C.lista.forEach((p, i) => agendar(i * 0.04, () => transmutarProp(p)));
      anel(e.x, e.y, 200, "#ffd34a", 1);
      break;
    case "tempestade":
      if (C) {
        C.kit.relampago = true;
        C.tRaio = 1;
        C.raioRapido = true;
      }
      break;
    case "arena": {
      const n = 56,
        R0 = 105,
        g1 = Math.floor(Math.random() * n),
        g2 = (g1 + n / 2) | 0;
      for (let i = 0; i < n; i++) {
        if (Math.abs(i - g1) < 2 || Math.abs(i - g2) < 2) continue;
        const a = (i / n) * 6.283,
          x = P.x + Math.cos(a) * R0,
          y = P.y + Math.sin(a) * R0;
        agendar(i * 0.02, () =>
          criarProp(f.mat === "multi" ? escolha(["rocha", "gelo", "cristal", "metal"]) : f.mat, x, y, { subindo: 0.4 })
        );
      }
      break;
    }
    case "nevoa":
      if (C) {
        C.kit.nevoa = C.kit.nevoa || "#e8eef4";
        for (let i = 0; i < 12; i++)
          C.nevoa.push({ x: P.x + rnd(-1, 1) * VW, y: P.y + rnd(-1, 1) * VH, r: rnd(50, 100), a: rnd(0.22, 0.32), f: rnd(0, 6) });
      }
      break;
    case "secar":
      for (let cyy = -20; cyy <= 20; cyy++)
        for (let cxx = -20; cxx <= 20; cxx++) {
          const k0 = Math.floor(cx / CEL) + cxx,
            k1 = Math.floor(cy / CEL) + cyy,
            t = soloEm(k0, k1);
          if (t === "grama" || t === "vinha") J.solo.set(k0 + "," + k1, { t: "cinza", ate: J.t + 90 });
          else if (t === "agua" || t === "lama") J.solo.set(k0 + "," + k1, { t: "vapor", ate: J.t + 3 });
        }
      if (C) C.lista.forEach(p => (p.molhado = 0));
      break;
    case "eletrificar":
      J.golpes.push({
        t: 0,
        ts: 0,
        tz: 2,
        atualizar(dt: number) {
          this.t += dt;
          this.ts -= dt;
          this.tz -= dt;
          if (e.hp <= 0) return false;
          const P = J.jogador;
          if (this.ts <= 0) {
            this.ts = 1.6;
            for (let i = 0; i < 3; i++) pintarSolo(P.x + rnd(-90, 90), P.y + rnd(-80, 80), rnd(6, 12), "agua", 25);
          }
          if (this.tz <= 0) {
            this.tz = 2.6;
            const x = P.x + rnd(-60, 60),
              y = P.y + rnd(-60, 60);
            perigo({
              tipo: "circ",
              x,
              y,
              r: 20,
              t: 0.8,
              cor: "#fff3a0",
              fim: () => {
                for (let i = 0; i < 10; i++) {
                  const a = Math.random() * 6.283;
                  aplicarElementoNoSolo(x + Math.cos(a) * rnd(0, 20), y + Math.sin(a) * rnd(0, 20), "raio");
                }
                raio(x, y - 30, x, y, "#fff3a0");
              }
            });
          }
          return true;
        }
      });
      break;
    case "consagrar":
      pintarSolo(cx, cy, 140, "luz", 60);
      break;
    case "caos":
      pintarSolo(cx, cy, 150, "caos", 40);
      break;
    case "saque":
      for (let i = 0; i < 4; i++) {
        const a = i * 1.57 + Math.random() * 0.5,
          r = rnd(55, 85);
        agendar(i * 0.2, () => {
          const b = criarProp("barril", P.x + Math.cos(a) * r, P.y + Math.sin(a) * r, { saque: true, subindo: 0.3 });
          if (b) particulas(b.x, b.y, "#f2e7c9", 8, 40);
        });
      }
      texto(P.x, P.y - 24, "Empurre os barris de saquê até ele!", "#f2e7c9", 13);
      break;
    case "carvalho": {
      const a = Math.atan2(P.y - e.y, P.x - e.x) + rnd(-0.6, 0.6),
        x = P.x + Math.cos(a) * 110,
        y = P.y + Math.sin(a) * 110;
      const c = criarProp("arvore", x, y, { carvalho: true, subindo: 0.6 });
      if (c) {
        c.hp = c.max = c.max * 4;
        if (estruturaU()) sairDoAbismo(c, 12);
      }
      e.imortal = true;
      e.carvalho = c;
      break;
    }
    case "naufragio":
      for (let i = 0; i < 10; i++)
        agendar(i * 0.15, () => {
          const x = P.x + rnd(-90, 90),
            y = P.y + rnd(-80, 80),
            tipo = escolha(["caixote", "barril", "polvora", "caixote", "barril"]);
          perigo({
            tipo: "circ",
            x,
            y,
            r: 10,
            t: 0.9,
            cor: "#a89878",
            queda: tipo === "caixote" ? "caixote" : "barril",
            fim: () => impactoChuva(e, { proj: "pedra", deixa: tipo }, x, y, 10)
          });
        });
      break;
    case "vendaval":
      if (C) {
        C.kit.vento *= 2;
        C.kit.rajada = 0.9;
        C.kit.redemoinho = true;
        C.tVort = 0.5;
      }
      break;
  }
}
// Koschei: a morte dele mora no ovo dentro do carvalho
export function aoQuebrarProp(p: PropCena) {
  if (p.carvalho) {
    const o = criarProp("ovo", p.x, p.y, { ovoMorte: true, subindo: 0.2 });
    if (o && estruturaU()) sairDoAbismo(o, 6);
    texto(p.x, p.y - 16, "O ovo da morte!", "#fff3c4", 14);
  }
  if (p.ovoMorte) {
    evento("ovo_morte");
    const k = J.chefeVivo;
    texto(p.x, p.y - 14, "A morte foi libertada!", "#fff3c4", 15);
    tremor(6);
    if (k && k.imortal) {
      k.imortal = false;
      if (k.hp <= 1) danoSimples(k, 10);
    }
  }
}

// ---------------------------------------------------------------- atualização e desenho do sistema de perigos
export function atualizarPerigos(dt: number) {
  if (!J.perigos) return;
  for (const o of J.perigos) {
    o.t -= dt;
    if (o.t <= 0 && o.fim) {
      const f = o.fim;
      o.fim = null;
      f();
    }
  }
  J.perigos = J.perigos.filter(o => o.t > 0);
  J.golpes = J.golpes.filter(g => {
    try {
      return g.atualizar(dt) !== false;
    } catch (err) {
      return false;
    }
  });
  if (J.escuroT > 0) {
    J.escuroT -= dt;
    if (J.escuroT <= 0) J.escuroAlvo = 0;
  }
  const alvo = Math.max(J.escuroFixo || 0, J.escuroAlvo || 0);
  J.escuro = (J.escuro || 0) + (alvo - (J.escuro || 0)) * Math.min(1, dt * 2);
  if (J.atordoa > 0) J.atordoa -= dt;
  if (J.anuncio) {
    J.anuncio.vida -= dt;
    if (J.anuncio.vida <= 0) J.anuncio = null;
  }
}
export function desenharPerigos(ox: number, oy: number) {
  if (!J.perigos) return;
  for (const o of J.perigos) {
    const q = 1 - o.t / o.max,
      pul = 0.5 + 0.5 * Math.sin(J.t * 18);
    lg.strokeStyle = o.cor;
    lg.fillStyle = o.cor;
    lg.lineWidth = 1;
    if (o.tipo === "circ") {
      lg.globalAlpha = 0.12 + 0.25 * q;
      lg.beginPath();
      lg.ellipse(o.x - ox, o.y - oy, o.r * q, o.r * q * 0.8, 0, 0, Math.PI * 2);
      lg.fill();
      lg.globalAlpha = 0.5 + 0.4 * pul * q;
      lg.beginPath();
      lg.ellipse(o.x - ox, o.y - oy, o.r, o.r * 0.8, 0, 0, Math.PI * 2);
      lg.stroke();
    } else if (o.tipo === "linha") {
      const a = Math.atan2(o.y2 - o.y, o.x2 - o.x),
        L = Math.hypot(o.x2 - o.x, o.y2 - o.y);
      lg.save();
      lg.translate(o.x - ox, o.y - oy);
      lg.rotate(a);
      lg.globalAlpha = 0.12 + 0.22 * q;
      lg.fillRect(0, -o.larg / 2, L * q, o.larg);
      lg.globalAlpha = 0.5 + 0.4 * pul * q;
      lg.strokeRect(0, -o.larg / 2, L, o.larg);
      if (o.seta) {
        lg.globalAlpha = 0.8;
        for (let i = 1; i < 4; i++) {
          const xx = (L * i) / 4;
          lg.beginPath();
          lg.moveTo(xx, o.seta * o.larg);
          lg.lineTo(xx + 3, o.seta * o.larg * 1.6);
          lg.lineTo(xx - 3, o.seta * o.larg * 1.6);
          lg.fill();
        }
      }
      lg.restore();
    } else if (o.tipo === "cone") {
      lg.globalAlpha = 0.12 + 0.22 * q;
      lg.beginPath();
      lg.moveTo(o.x - ox, o.y - oy);
      lg.arc(o.x - ox, o.y - oy, o.r * q, o.a - o.ab / 2, o.a + o.ab / 2);
      lg.closePath();
      lg.fill();
      lg.globalAlpha = 0.5 + 0.4 * pul * q;
      lg.beginPath();
      lg.moveTo(o.x - ox, o.y - oy);
      lg.arc(o.x - ox, o.y - oy, o.r, o.a - o.ab / 2, o.a + o.ab / 2);
      lg.closePath();
      lg.stroke();
    }
  }
  lg.globalAlpha = 1;
  for (const g of J.golpes) if (g.chao) g.chao(ox, oy);
}
export const COR_PROJ: Record<string, string> = {
  pedra: "#8a8478",
  osso: "#e8e0d0",
  moeda: "#e0b040",
  doce: "#f080c0",
  pocao: "#9a60e0",
  barril: "#8a5a30",
  caixote: "#8a5a30",
  abobora: "#e07a2a",
  cristal: "#c8f0ff",
  bala: "#2a2224",
  engrenagem: "#c8a050"
};
export function desenharQuedas(ox: number, oy: number) {
  if (!J.perigos) return;
  for (const o of J.perigos) {
    if (!o.queda) continue;
    const h = Math.round((o.t / o.max) * 90),
      x = Math.round(o.x - ox),
      y = Math.round(o.y - oy - h),
      cor = COR_PROJ[o.queda] || o.cor;
    if (o.dono) {
      const s = quadroEfeito(o.dono, o.linhaVfx, Math.floor(J.t * 10) % 4, 16);
      if (s) {
        lg.drawImage(s, x - 8, y - 8);
        continue;
      }
    }
    lg.fillStyle = cor;
    if (o.queda === "estrela") {
      lg.globalCompositeOperation = "lighter";
      lg.fillRect(x - 1, y - 3, 2, 7);
      lg.fillRect(x - 3, y - 1, 7, 2);
      lg.globalAlpha = 0.4;
      lg.fillRect(x, y - 12, 1, 10);
      lg.globalAlpha = 1;
      lg.globalCompositeOperation = "source-over";
      continue;
    }
    lg.fillRect(x - 2, y - 2, 5, 5);
    lg.fillStyle = tom(cor, 1.35);
    lg.fillRect(x - 2, y - 2, 2, 2);
    if (o.queda === "abobora") {
      lg.fillStyle = "#ffd34a";
      lg.fillRect(x, y, 1, 1);
    }
  }
  for (const g of J.golpes) if (g.frente) g.frente(ox, oy);
}
export function desenharGolpesLuz(ox: number, oy: number) {
  if (!J.golpes) return;
  for (const g of J.golpes) if (g.luz) g.luz(ox, oy);
}
// balas com forma: cada chefe atira coisas que combinam com ele
export function desenharBala(b: Bala, ox: number, oy: number) {
  const x = Math.round(b.x - ox),
    y = Math.round(b.y - oy),
    a = Math.atan2(b.vy, b.vx),
    cx = Math.round(Math.cos(a) * 2),
    cy = Math.round(Math.sin(a) * 2);
  if (b.spr) {
    lg.globalCompositeOperation = "source-over";
    lg.drawImage(b.spr, x - b.spr.width / 2, y - b.spr.height / 2);
    lg.globalCompositeOperation = "lighter";
    return;
  }
  if (b.linhaVfx != null) {
    const s = quadroEfeito(b.dono, b.linhaVfx, Math.floor(J.t * 10) % 4, 12);
    if (s) {
      lg.save();
      lg.translate(x, y);
      lg.rotate(Math.atan2(b.vy, b.vx));
      lg.drawImage(s, -6, -6);
      lg.restore();
      return;
    }
  }
  const c = b.cor,
    p = b.proj;
  switch (p) {
    case "lamina":
    case "pena":
      lg.fillStyle = c;
      lg.fillRect(x - cx, y - cy, 1, 1);
      lg.fillRect(x, y, 1, 1);
      lg.fillRect(x + cx, y + cy, 1, 1);
      lg.globalAlpha = 0.4;
      lg.fillRect(x - cx * 2, y - cy * 2, 1, 1);
      lg.globalAlpha = 1;
      break;
    case "estrela":
      lg.fillStyle = c;
      lg.fillRect(x - 1, y, 3, 1);
      lg.fillRect(x, y - 1, 1, 3);
      lg.globalAlpha = 0.35;
      lg.fillRect(x - 2, y - 2, 5, 5);
      lg.globalAlpha = 1;
      break;
    case "raio":
      lg.fillStyle = "#fff3a0";
      lg.fillRect(x, y, 1, 1);
      lg.fillRect(x + (Math.random() < 0.5 ? 1 : -1), y - 1, 1, 1);
      lg.fillStyle = c;
      lg.globalAlpha = 0.4;
      lg.fillRect(x - 1, y - 1, 3, 3);
      lg.globalAlpha = 1;
      break;
    case "chama":
      lg.fillStyle = Math.random() < 0.5 ? "#ffd34a" : "#ff8a3d";
      lg.fillRect(x - 1, y - 1, 2, 2);
      lg.globalAlpha = 0.4;
      lg.fillStyle = "#e8603c";
      lg.fillRect(x - cx - 1, y - cy - 1, 3, 3);
      lg.globalAlpha = 1;
      break;
    case "gota":
    case "gelo":
      lg.fillStyle = c;
      lg.fillRect(x - 1, y - 1, 2, 2);
      lg.fillStyle = "#ffffff";
      lg.fillRect(x - 1, y - 1, 1, 1);
      break;
    case "pedra":
    case "osso":
    case "moeda":
    case "doce":
    case "pocao":
    case "barril":
    case "abobora":
    case "cristal":
    case "bala":
    case "engrenagem":
    case "objeto": {
      lg.globalCompositeOperation = "source-over";
      const cc = COR_PROJ[p] || c;
      lg.fillStyle = cc;
      lg.fillRect(x - 1, y - 1, 3, 3);
      lg.fillStyle = tom(cc, 1.4);
      lg.fillRect(x - 1, y - 1, 1, 1);
      if (p === "bala") {
        lg.globalAlpha = 0.3;
        lg.fillStyle = "#c8c8d0";
        lg.fillRect(x - cx * 2 - 1, y - cy * 2 - 1, 2, 2);
        lg.globalAlpha = 1;
      }
      lg.globalCompositeOperation = "lighter";
      break;
    }
    case "folha":
      lg.fillStyle = c;
      lg.fillRect(x, y, 2, 1);
      break;
    case "nota":
      lg.fillStyle = c;
      lg.fillRect(x, y - 2, 1, 3);
      lg.fillRect(x - 1, y, 2, 1);
      break;
    default:
      lg.fillStyle = c;
      lg.globalAlpha = 0.4;
      lg.fillRect(x - 2, y - 2, 5, 5);
      lg.globalAlpha = 1;
      lg.fillRect(x - 1, y - 1, 2, 2);
  }
}
// escuridão: só a equipe, o fogo e os objetos em chamas iluminam
export let ESCURO = null;
// silhueta para o brilho: corta o fundo quase transparente de algumas artes (virava um quadrado aceso em volta do bicho)
export const cacheSilB = new WeakMap();
export function silhuetaBrilho(spr: HTMLCanvasElement, cor: string) {
  let m = cacheSilB.get(spr);
  if (!m) {
    m = {};
    cacheSilB.set(spr, m);
  }
  if (m[cor]) return m[cor];
  const c = silhueta(spr, cor),
    o = document.createElement("canvas");
  o.width = c.width;
  o.height = c.height;
  const g = o.getContext("2d")!;
  g.drawImage(c, 0, 0);
  try {
    const im = g.getImageData(0, 0, o.width, o.height),
      d = im.data;
    for (let i = 3; i < d.length; i += 4) d[i] = d[i] < 70 ? 0 : Math.min(255, (d[i] - 70) * 1.4);
    g.putImageData(im, 0, 0);
  } catch (e) {
    relatar("brilho dos inimigos: imagem não pôde ser lida", e);
  }
  if (c._suave) o._suave = true;
  m[cor] = o;
  return o;
}
// reinos noturnos: inimigos brilham (aura na cor do elemento e contorno claro), por cima da escuridão, para lerem bem e ficarem bonitos
export function desenharBrilhoInimigos() {
  if (SIM.ativo || QUAL === 0) return;
  const L = (UNIV[R.universo] || {}).luz;
  if (!(L && L.noite) && !(J.escuro > 0.05)) return;
  const a0 = lg.globalCompositeOperation;
  lg.globalCompositeOperation = "lighter";
  let n = 0;
  for (const e of J.inimigos) {
    const v = e._vis;
    if (!v || v.t !== J.t || e.hp <= 0 || e.oculto) continue;
    if (++n > 90) break;
    const cor = e._corBrilho || (e._corBrilho = mistura(COR[e.el] || "#c8a0ff", "#ffffff", 0.25)),
      pul = 0.75 + 0.25 * Math.sin(J.t * 3 + (e.fase || 0)),
      au = e.chefe || e.mini ? 1.3 : 1.22;
    lg.save();
    lg.translate(v.x, v.y);
    lg.scale(v.virar ? -1 : 1, 1);
    lg.globalAlpha = 0.45 * pul;
    lg.drawImage(silhuetaBrilho(v.spr, cor), (-v.w * au) / 2, -v.h * au + (au - 1) * v.h * 0.1, v.w * au, v.h * au); // aura
    lg.globalAlpha = 0.2 * pul;
    lg.drawImage(silhuetaBrilho(v.spr, "#ffffff"), -v.w / 2, -v.h, v.w, v.h); // corpo levemente aceso
    lg.restore();
  }
  lg.globalAlpha = 1;
  lg.globalCompositeOperation = a0;
}
export function desenharEscuridao(ox: number, oy: number) {
  if (!(J.escuro > 0.02) || passiva("imune_escuro")) return;
  if (!ESCURO || ESCURO.width !== VW || ESCURO.height !== VH) {
    ESCURO = document.createElement("canvas");
    ESCURO.width = VW;
    ESCURO.height = VH;
  }
  const g = ESCURO.getContext("2d")!;
  g.globalCompositeOperation = "source-over";
  g.clearRect(0, 0, VW, VH);
  g.fillStyle = `rgba(6,4,14,${J.escuro})`;
  g.fillRect(0, 0, VW, VH);
  g.globalCompositeOperation = "destination-out";
  const furo = (x: number, y: number, r: number) => {
    const gr = g.createRadialGradient(x - ox, y - oy, 0, x - ox, y - oy, r);
    gr.addColorStop(0, "rgba(0,0,0,1)");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(x - ox - r, y - oy - r, r * 2, r * 2);
  };
  furo(J.jogador.x, J.jogador.y, 46);
  ativos().forEach(s => s.x != null && furo(s.x, s.y, 16));
  if (J.cena) {
    for (const p of J.cena.lista) {
      if (p.queima > 0) furo(p.x, p.y, 30);
      if (p.tipo === "luz") furo(p.x, p.y - 10, 38);
    }
    let n = 0;
    for (const [k, m] of J.solo) {
      if ((m.t !== "fogo" && m.t !== "luz") || m.ate < J.t) continue;
      const [a, b] = k.split(",").map(Number);
      if (++n > 60) break;
      furo(a * CEL + 4, b * CEL + 4, 14);
    }
  }
  lg.drawImage(ESCURO, -1, -1, VW + 2, VH + 2);
}
// barra do chefe e anúncio do golpe
// aviso grande no alto da tela (chefe, eventos do mapa); sem chefe, fica um pouco abaixo do HUD
export function desenharAnuncio(y?: number) {
  if (!J.anuncio) return;
  if (y == null) y = Math.max(Math.round(H * 0.2) + 28, HUD_BAIXO + 70);
  if (J.anuncio) {
    const a = J.anuncio;
    ctx.globalAlpha = Math.min(1, a.vida * 1.5);
    ctx.textAlign = "center";
    ctx.font = `800 20px "Cinzel", Georgia, serif`;
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(18,14,26,.9)";
    ctx.strokeText(a.txt, W / 2, y + 36);
    ctx.fillStyle = a.cor;
    ctx.fillText(a.txt, W / 2, y + 36);
    if (a.sub) {
      ctx.font = `13px "Nunito", system-ui, sans-serif`;
      ctx.fillStyle = "#f2e7c9";
      const pal = a.sub.split(" "),
        linhas = [];
      let l = "";
      for (const p of pal) {
        if ((l + " " + p).length > 44) {
          linhas.push(l);
          l = p;
        } else l = l ? l + " " + p : p;
      }
      linhas.push(l);
      linhas.forEach((t, i) => ctx.fillText(t, W / 2, y + 56 + i * 16));
    }
    ctx.globalAlpha = 1;
  }
}
export function desenharBarraChefe() {
  const ch = J.chefeVivo && J.chefeVivo.hp > 0 ? J.chefeVivo : J.inimigos.find(e => e.mini && e.hp > 0);
  if (!ch) {
    desenharAnuncio();
    return;
  }
  const w = Math.min(W * 0.84, 420),
    x = (W - w) / 2,
    y = Math.max(Math.round(H * 0.2) + 28, HUD_BAIXO + 70),
    frac = Math.max(0, ch.hp / ch.max);
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = "rgba(18,14,26,.85)";
  ctx.fillRect(x - 4, y - 20, w + 8, 32);
  ctx.fillStyle = "#3a2a30";
  ctx.fillRect(x, y, w, 7);
  ctx.fillStyle = ch.imortal ? "#c8c8e0" : ch.chefe ? "#d6ab4f" : "#e06a5a";
  ctx.fillRect(x, y, w * frac, 7);
  if (ch.chefe && ch.def && ch.def.fase2) {
    ctx.fillStyle = "#f2e7c9";
    ctx.fillRect(x + w * 0.5 - 1, y - 2, 2, 11);
  }
  ctx.textAlign = "left";
  ctx.font = `600 13px "Nunito", system-ui, sans-serif`;
  ctx.fillStyle = "#f2e7c9";
  ctx.fillText(
    ch.nome + (ch.imortal ? " · Imortal" : "") + (ch.bebado > 0 ? " · Bêbado" : "") + (fadigaChefe(ch) > 1.2 ? " · Cansado" : ""),
    x,
    y - 6
  );
  ctx.globalAlpha = 1;
  desenharAnuncio(y);
  // seta para o carvalho do Koschei quando ele está fora da tela
  const c = ch.carvalho;
  if (c && !c.morto) {
    const P = J.jogador,
      dx = c.x - P.x,
      dy = c.y - P.y;
    if (Math.abs(dx) > VW / 2 - 8 || Math.abs(dy) > VH / 2 - 8) {
      const ang = Math.atan2(dy, dx),
        cx = W / 2 + Math.cos(ang) * Math.min(W, H) * 0.4,
        cy = H / 2 + Math.sin(ang) * Math.min(W, H) * 0.4;
      ctx.fillStyle = "#7fe0a0";
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * 12, cy + Math.sin(ang) * 12);
      ctx.lineTo(cx + Math.cos(ang + 2.5) * 9, cy + Math.sin(ang + 2.5) * 9);
      ctx.lineTo(cx + Math.cos(ang - 2.5) * 9, cy + Math.sin(ang - 2.5) * 9);
      ctx.fill();
    }
  }
}
