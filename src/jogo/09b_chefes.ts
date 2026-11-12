// Elementar · chefes: inteligência, golpes, perigos anunciados e segunda fase
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./09_criaturas.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import {
  agendar,
  ativos,
  COR,
  ctx,
  defFonte,
  dist2,
  ELS,
  escolha,
  FONTE,
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
import { anel, danoSimples, DIF, parar, particulas, raio, spawnInimigo, texto, tremor } from "./02_combate.js";
import { aplicarElementoNoSolo, CEL, DUR, frio, soloEm } from "./04_ambiente.js";
import { QUAL } from "./06_loop.js";
import { brasa, cairRaio, CH, danificarProp, fumaca, gerarPedaco, MAT, novoProp, particulaAr, quebrar } from "./07_cenario.js";
import { silhueta, silhuetaMundo, spriteProp } from "./07b_cenario_desenho.js";
import { impactoArte, quadroEfeito } from "./07c_cenario_arte.js";
import { estruturaU, sairDoAbismo } from "./07d_estrutura.js";
import { ameacaDiretor } from "./08_horda.js";
import { particulasEl } from "./08b_efeitos.js";
import { tal } from "./08d_poderes.js";
import { evento } from "./08e_conquistas.js";
import { custo, passiva } from "./08f_lendas.js";
import { pctMax } from "./09_criaturas.js";
// ================================================================ chefes: golpes característicos, perigos anunciados e segunda fase
// Regra de justiça: tudo o que machuca aparece antes como uma marca no chão (círculo, linha, cone ou anel).
export function angDif(a, b) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
export function distSeg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1,
    dy = y2 - y1,
    L = dx * dx + dy * dy || 1,
    t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / L));
  return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
}
export function feriJogador(dano, el) {
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
export function bala(dono, x, y, ang, vel, dano, proj, el, extra?) {
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
export function perigo(o) {
  o.max = o.t;
  J.perigos.push(o);
  return o;
}
export function pintarSolo(x, y, r, tipo, dur?) {
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
export function criarProp(tipo, x, y, extra?) {
  const C = J.cena;
  if (!C || !MAT[tipo]) return null;
  const cx = Math.floor(x / CH),
    cy = Math.floor(y / CH);
  gerarPedaco(cx, cy);
  const p = novoProp(tipo, x, y, Math.random);
  Object.assign(p, extra || {});
  C.props.get(cx + ":" + cy).push(p);
  C.lista.push(p);
  return p;
}
export const corG = (e, g) => (g.el && g.el !== "multi" ? COR[g.el] : COR[e.el] || "#ff5a4a");
export const elG = (e, g) => (g.el === "multi" ? escolha(ELS) : g.el || e.el);
export const D0 = e => e.dano * (e.mini ? 0.85 : 1);
export function propsEm(x, y, r, fn) {
  if (!J.cena) return;
  for (const p of J.cena.lista) {
    if (p.morto) continue;
    if ((p.x - x) ** 2 + (p.y - y) ** 2 < (r + p.r) ** 2) fn(p, Math.hypot(p.x - x, p.y - y) || 1);
  }
}
export function empurrarProps(x, y, r, forca) {
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
export function fadigaChefe(e) {
  if (!e.chefe || J.tChefe == null) return 1;
  return 1 + Math.max(0, J.t - J.tChefe - 75) / 30;
}
export function anunciar(e, txt, sub?) {
  J.anuncio = { txt, sub: sub || "", vida: sub ? 3.2 : 1.8, cor: COR[e.el] || "#ffd34a" };
}
export function iaChefe(e, dt, P) {
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
export function executarGolpe(e, g, P) {
  const cor = corG(e, g),
    el = elG(e, g),
    C = J.cena;
  switch (g.tipo) {
    case "leque": {
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
    case "espiral": {
      const br = g.bracos || 6,
        dur = g.dur || 4;
      let a = Math.random() * 6.28;
      J.golpes.push({
        t: 0,
        cd: 0.4,
        atualizar(dt) {
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
    case "anel": {
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
    case "chuva": {
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
    case "investida": {
      const n = g.n || 1,
        vel = g.vel || 240;
      const uma = i => {
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
    case "salto": {
      const n = g.n || 1,
        r = g.r || 28;
      const um = i => {
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
    case "feixe": {
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
          atualizar(dt) {
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
          luz(ox, oy) {
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
    case "onda": {
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
          atualizar(dt) {
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
          chao(ox, oy) {
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
    case "vortice": {
      const r = g.r || 110,
        dur = g.dur || 4,
        f = g.forca || 60;
      perigo({ tipo: "circ", x: e.x, y: e.y, r: e.r + 14, t: 0.6, cor });
      agendar(0.6, () => {
        if (e.hp <= 0) return;
        J.golpes.push({
          t: 0,
          hit: 0,
          atualizar(dt) {
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
          chao(ox, oy) {
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
    case "invocar": {
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
    case "muralha": {
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
    case "fissura": {
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
              chao(ox, oy) {
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
    case "tentaculos": {
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
                frente(ox, oy) {
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
    case "sopro": {
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
          atualizar(dt) {
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
    case "escuridao":
      J.escuroT = g.dur || 5;
      J.escuroAlvo = 0.82;
      particulas(e.x, e.y, "#140f1c", 30, 100, 2);
      return 0.6;
    case "clones": {
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
        atualizar(dt) {
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
    case "teleporte": {
      const P = J.jogador,
        a = Math.atan2(e.y - P.y, e.x - P.x) + Math.PI + rnd(-0.6, 0.6),
        x = P.x + Math.cos(a) * 48,
        y = P.y + Math.sin(a) * 48;
      e.oculto = true;
      if (C) for (let i = 0; i < 4; i++) fumaca(e.x + rnd(-5, 5), e.y, 6, "#c8c8e0");
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
    case "regenerar": {
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
        atualizar(dt) {
          this.t += dt;
          if (e.hp <= 0) return false;
          e.hp = Math.min(e.max, e.hp + (e.max * g.pct * dt) / 1.5);
          if (Math.random() < dt * 20) particulas(e.x + rnd(-8, 8), e.y + rnd(-8, 8), "#7fe0a0", 1, 30);
          return this.t < 1.5;
        }
      });
      return 1.5;
    }
    case "transmutar": {
      const r = g.r || 60;
      anel(e.x, e.y, r, "#ffd34a", 0.7);
      propsEm(e.x, e.y, r, p => transmutarProp(p));
      if (g.solo) pintarSolo(e.x, e.y, r * 0.8, g.solo);
      tremor(2);
      return 1.0;
    }
    case "mergulho": {
      e.oculto = true;
      e.mergulho = true;
      particulas(e.x, e.y, "#8a6a48", 16, 70);
      tremor(2);
      J.golpes.push({
        t: 0,
        parou: false,
        atualizar(dt) {
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
    case "tempestade": {
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
              if (C) cairRaio(x, y, alvo);
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
    case "bola": {
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
          atualizar(dt) {
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
          frente(ox, oy) {
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
    case "telecinese": {
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
            bala(e, p.x, p.y - 6, a, 190, D0(e) * 0.8, "objeto", e.el, { spr: spriteProp(p), quebra: true, deixaLascas: p });
          }
        });
      });
      return 1.4 + alvos.length * 0.15;
    }
    case "avalanche": {
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
          atualizar(dt) {
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
          frente(ox, oy) {
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
    case "terremoto": {
      const dur = g.dur || 3,
        n = g.n || 6;
      J.golpes.push({
        t: 0,
        ts: 0,
        atualizar(dt) {
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
  }
  return 0.5;
}

export function impactoChuva(e, g, x, y, r) {
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
export function impactoSalto(e, g, x, y, r) {
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
export function executarFissuraCurta(x, y, a, L, cor) {
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
    atualizar(dt) {
      this.t += dt;
      return this.t < 4;
    },
    chao(ox, oy) {
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
export function transmutarProp(p) {
  if (p.morto || p.mat.indestrutivel) return;
  const spr = p.spriteFixo || spriteProp(p);
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
export function constricao(e, P, r) {
  const cx = P.x,
    cy = P.y,
    gap = Math.random() * 6.283;
  J.golpes.push({
    t: 0,
    R: r,
    hit: 0,
    atualizar(dt) {
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
    frente(ox, oy) {
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
export function faseDois(e, f) {
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
        atualizar(dt) {
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
export function aoQuebrarProp(p) {
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
export function atualizarPerigos(dt) {
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
export function desenharPerigos(ox, oy) {
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
export const COR_PROJ = {
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
export function desenharQuedas(ox, oy) {
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
export function desenharGolpesLuz(ox, oy) {
  if (!J.golpes) return;
  for (const g of J.golpes) if (g.luz) g.luz(ox, oy);
}
// balas com forma: cada chefe atira coisas que combinam com ele
export function desenharBala(b, ox, oy) {
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
export function silhuetaBrilho(spr, cor) {
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
  const g = o.getContext("2d");
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
export function desenharEscuridao(ox, oy) {
  if (!(J.escuro > 0.02) || passiva("imune_escuro")) return;
  if (!ESCURO || ESCURO.width !== VW || ESCURO.height !== VH) {
    ESCURO = document.createElement("canvas");
    ESCURO.width = VW;
    ESCURO.height = VH;
  }
  const g = ESCURO.getContext("2d");
  g.globalCompositeOperation = "source-over";
  g.clearRect(0, 0, VW, VH);
  g.fillStyle = `rgba(6,4,14,${J.escuro})`;
  g.fillRect(0, 0, VW, VH);
  g.globalCompositeOperation = "destination-out";
  const furo = (x, y, r) => {
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
export function desenharAnuncio(y?) {
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
