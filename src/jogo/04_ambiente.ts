// Elementar · física do ambiente: o chão reage aos elementos
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./03_progressao.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { ativos, defFonte, elementoDe, FONTE, hexRgb, J, lg, Q, R, ramoObj, rnd, semente, SIM, tom, UNIV, VH, VW } from "./01_nucleo.js";
import { curar, danoSimples } from "./02_combate.js";
import { folhaU } from "./07c_cenario_arte.js";
import { abismoEm, estruturaU, lagoEm, soloEstrutura, soloLago } from "./07d_estrutura.js";
import { pctMax } from "./09_criaturas.js";
import { chao } from "./10_desenho.js";
// ================================================================ física do ambiente: o chão reage aos elementos
export const CEL = 8,
  INTER = {};
D.interacoes.forEach(([el, de, vira]) => {
  INTER[el + "|" + de] = vira;
});
// chão que reage aos monstros: água molha, fogo chamusca, terra racha (somem sozinhos com o tempo)
Object.assign(INTER, {
  "agua|chao": "molhado",
  "agua|queimado": "molhado",
  "agua|rachado": "lama",
  "agua|molhado": "molhado",
  "fogo|chao": "queimado",
  "fogo|molhado": "vapor",
  "fogo|rachado": "queimado",
  "raio|molhado": "eletrico",
  "terra|chao": "rachado",
  "terra|molhado": "lama",
  "natureza|molhado": "grama",
  "natureza|queimado": "grama",
  "natureza|rachado": "grama",
  "luz|molhado": "luz",
  "sombra|molhado": "sombra",
  "luz|queimado": "luz",
  "sombra|queimado": "sombra",
  // monstro gelado (forma de gelo, ou de Água num mapa frio): congela poça, lama e água eletrificada, apaga o fogo e condensa o vapor
  "gelo|agua": "gelo",
  "gelo|molhado": "gelo",
  "gelo|lama": "gelo",
  "gelo|eletrico": "gelo",
  "gelo|fogo": "agua",
  "gelo|vapor": "agua",
  "gelo|queimado": "molhado",
  "fogo|gelo": "agua"
});
// formas de gelo (pelo nome do ramo): contam como "gelo" para o chão
export const GELADO = /gelo|neve|glacia|inverno|congel/i;
export function elementoNoSolo(s: Selo) {
  const el = elementoDe(s);
  if (el !== "agua") return el;
  const r = ramoObj(s);
  if ((r && GELADO.test(r.nome + " " + (r.supremo || ""))) || frio()) return "gelo";
  return el;
}
// o chão mudou embaixo de um monstro: um sinal pequeno para a mudança ser vista (com limite, para não poluir)
export const SINAL_SOLO: Record<string, [cor: string, n: number, forma: string | null]> = {
  vapor: ["#e8eef4", 3, "fumaca"],
  gelo: ["#cfefff", 3, "estrela"],
  agua: ["#7fc8ff", 3, null],
  grama: ["#7fd05a", 2, "folha"],
  vinha: ["#4f9a3c", 2, "folha"],
  fogo: ["#ffb040", 3, "faisca"],
  eletrico: ["#fff3a0", 2, "faisca"],
  cinza: ["#9a9690", 2, "fumaca"],
  lama: ["#7a5a3a", 2, null],
  luz: ["#fff3c4", 2, "estrela"],
  sombra: ["#9070c0", 2, "fumaca"],
  queimado: ["#5a4a40", 1, "fumaca"],
  molhado: ["#9fd0ff", 1, null]
};
export function sinalSolo(cx: number, cy: number, vira) {
  const sg = SINAL_SOLO[vira];
  if (!sg || SIM.ativo || J.parts.length > 300) return;
  J._sinalT = J._sinalT || 0;
  if (J.t - J._sinalT < 0.05) return;
  J._sinalT = J.t;
  for (let i = 0; i < sg[1]; i++) {
    const v = 10 + Math.random() * 16,
      a = -Math.PI / 2 + rnd(-0.9, 0.9);
    J.parts.push({
      x: cx * CEL + 4 + rnd(-3, 3),
      y: cy * CEL + 4 + rnd(-2, 2),
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      vida: rnd(0.5, 0.9),
      max: 0.9,
      cor: sg[0],
      tam: sg[2] === "fumaca" ? 3 : 1,
      forma: sg[2] || undefined
    });
  }
}
export const DUR: Record<string, number> = {
  agua: 40,
  lama: 25,
  fogo: 5,
  cinza: 60,
  vapor: 3,
  eletrico: 4,
  grama: 60,
  vinha: 15,
  sombra: 15,
  luz: 15,
  gelo: 60,
  chao: 40,
  molhado: 14,
  queimado: 12,
  rachado: 16
};
export const DEPOIS: Record<string, string> = { fogo: "cinza", eletrico: "agua", vinha: "grama" };
export function hash2(x: number, y: number, s: number) {
  let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function ruido(x: number, y: number, s: number) {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    fx = x - xi,
    fy = y - yi,
    u = fx * fx * (3 - 2 * fx),
    v = fy * fy * (3 - 2 * fy);
  const a = hash2(xi, yi, s),
    b = hash2(xi + 1, yi, s),
    c = hash2(xi, yi + 1, s),
    d = hash2(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export function terrenoBase() {
  const u = UNIV[R.universo];
  return D.terreno_especial[u.id] || D.terreno_natural[u.elemento];
}
// o solo natural de uma célula não muda durante o mapa: fica guardado (era recalculado, com ruído e busca de lagos, várias vezes por
// inimigo a cada quadro; com a horda cheia isso era uma das maiores fatias da lógica)
export function soloNatural(cx: number, cy: number) {
  const M = J.soloNat || (J.soloNat = new Map()),
    k = (cx + 32768) * 65536 + (cy + 32768);
  let t = M.get(k);
  if (t !== undefined) return t;
  const se = soloEstrutura(cx, cy);
  if (se) t = se;
  else {
    const [tipo, p] = terrenoBase();
    const sem = R.universo.length * 7 + R.profundidade;
    t = ruido(cx / 6, cy / 6, sem) < p ? tipo : "chao";
  }
  if (J.cena) {
    if (M.size > 30000) M.clear();
    M.set(k, t);
  } // só guarda com o cenário pronto (lagos e abismos já definidos)
  return t;
}
export function soloEm(cx: number, cy: number) {
  if (!J.solo.size) return soloNatural(cx, cy);
  const k = cx + "," + cy,
    m = J.solo.get(k);
  if (m) {
    if (m.ate > J.t) return m.t;
    J.solo.delete(k);
    if (DEPOIS[m.t]) {
      J.solo.set(k, { t: DEPOIS[m.t], ate: J.t + DUR[DEPOIS[m.t]] });
      return DEPOIS[m.t];
    }
  }
  return soloNatural(cx, cy);
}
export function mudarSolo(x: number, y: number, tipo: string, dur?: number) {
  if (estruturaU() && J.cena && abismoEm(x, y, 0)) return;
  const cx = Math.floor(x / CEL),
    cy = Math.floor(y / CEL);
  J.solo.set(cx + "," + cy, { t: tipo, ate: J.t + (dur ?? DUR[tipo] ?? 30) });
}
export const frio = () => terrenoBase()[0] === "gelo";
export function aplicarElementoNoSolo(x: number, y: number, el: string) {
  const cx = Math.floor(x / CEL),
    cy = Math.floor(y / CEL),
    atual = soloEm(cx, cy);
  let vira = INTER[el + "|" + atual];
  if (!vira) return;
  if (vira === "fogo?") {
    if (Math.random() > 0.15) return;
    vira = "fogo";
  }
  if (vira === "fogo+") {
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ] as [number, number][]) {
      const v = soloEm(cx + dx, cy + dy);
      if (v === "grama" || v === "vinha") J.solo.set(cx + dx + "," + (cy + dy), { t: "fogo", ate: J.t + DUR.fogo });
    }
    return;
  }
  if (el === "agua" && frio() && (vira === "lama" || vira === "agua" || vira === "molhado")) vira = "gelo";
  if (vira !== atual) {
    J.solo.set(cx + "," + cy, { t: vira, ate: J.t + (DUR[vira] ?? 30) });
    R.st.transformacoes++;
    sinalSolo(cx, cy, vira);
  }
}
export function atualizarSolo(dt: number) {
  // cada monstro marca o chão embaixo dele e um pouco em volta (rastro largo, não uma célula só)
  J.tSolo -= dt;
  if (J.tSolo <= 0) {
    J.tSolo = 0.2;
    ativos().forEach(s => {
      const el = elementoNoSolo(s);
      aplicarElementoNoSolo(s.x, s.y + 3, el);
      for (let i = 0; i < 2; i++) aplicarElementoNoSolo(s.x + rnd(-9, 9), s.y + 3 + rnd(-6, 6), el);
    });
  }
  J.tFogo -= dt;
  if (J.tFogo <= 0) {
    J.tFogo = 0.5;
    const fogos = [];
    J.solo.forEach((m, k) => {
      if (m.t === "fogo" && m.ate > J.t) fogos.push(k);
    });
    const vivo = ativos().some(s => elementoDe(s) === "ar") ? 2 : 1;
    // cada vizinho de grama ou vinha tem 15% de chance de pegar fogo a cada meio segundo (o dobro com vento)
    fogos.slice(0, 300).forEach(k => {
      const [cx, cy] = k.split(",").map(Number);
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ] as [number, number][]) {
        if (Math.random() >= 0.15 * vivo * fatorVentoFogo(dx, dy)) continue;
        const v = soloEm(cx + dx, cy + dy);
        if (v === "grama" || v === "vinha") J.solo.set(cx + dx + "," + (cy + dy), { t: "fogo", ate: J.t + DUR.fogo });
      }
    });
    if (J.solo.size > 4000) {
      for (const [k, m] of J.solo) if (m.ate < J.t) J.solo.delete(k);
    }
  }
  // efeitos no Invocador
  const P = J.jogador,
    sj = soloEm(Math.floor(P.x / CEL), Math.floor(P.y / CEL));
  J.soloJog = sj;
  const temEl = (el: string) => ativos().some(s => elementoDe(s) === el);
  if (sj === "fogo" && !temEl("fogo") && J.invuln <= 0) J.vida -= J.vidaMax * 0.04 * dt;
  if (sj === "eletrico" && !temEl("raio") && J.invuln <= 0) J.vida -= J.vidaMax * 0.05 * dt;
  if (sj === "luz") curar(J.vidaMax * 0.01 * dt);
}
export function fatorVentoFogo(dx: number, dy: number) {
  const C = J.cena;
  if (!C || C.kit.submerso) return 1;
  const m = Math.min(1.5, C.Wm / 45),
    d = dx * C.dx + dy * C.dy;
  return Math.max(0.2, 1 + d * m);
}
export function efeitoSoloInimigo(e: Inimigo, dt: number) {
  const t = soloEm(Math.floor(e.x / CEL), Math.floor(e.y / CEL));
  const r = { vel: 1, gelo: false };
  const marcar = (el: Elemento) => {
    if (!e.status || J.t - e.status.t > 3) e.status = { el, t: J.t };
  };
  switch (t) {
    case "gelo":
      r.gelo = true;
      break;
    case "agua":
      r.vel = 0.85;
      marcar("agua");
      break;
    case "lama":
      r.vel = 0.55;
      break;
    case "vinha":
      r.vel = 0.45;
      marcar("natureza");
      break;
    case "vapor":
      e.cego = Math.max(e.cego, 0.5);
      r.vel = 0.8;
      break;
    case "molhado":
      r.vel = 0.92;
      marcar("agua");
      break; // inimigo molhado: o próximo golpe de outro elemento vira reação
    case "queimado":
      marcar("fogo");
      break;
    case "fogo":
      marcar("fogo");
      e.tSolo = (e.tSolo || 0) - dt;
      if (e.tSolo <= 0) {
        e.tSolo = 0.5;
        const f = FONTE;
        defFonte("ambiente");
        if (!((e.chefe || e.mini) && e.el === "fogo")) danoSimples(e, pctMax(e, 0.07) + 2);
        defFonte(f);
      }
      break;
    case "eletrico":
      marcar("raio");
      e.tSolo = (e.tSolo || 0) - dt;
      if (e.tSolo <= 0) {
        e.tSolo = 0.5;
        const f = FONTE;
        defFonte("ambiente");
        if (!((e.chefe || e.mini) && e.el === "raio")) danoSimples(e, pctMax(e, 0.09) + 3);
        defFonte(f);
      }
      break;
  }
  return r;
}
export const COR_SOLO: Record<string, string[]> = {
  gelo: ["#8fc4e0", "#e8f8ff"],
  agua: ["#3a7fd0", "#7fc0ff"],
  lama: ["#5a4028", "#7a5838"],
  fogo: ["#e8603c", "#ffd34a"],
  grama: ["#3f7a34", "#6aa84f"],
  cinza: ["#4a4650", "#6a6670"],
  vapor: ["#d8e4ee", "#ffffff"],
  eletrico: ["#3a6fd0", "#f2d23a"],
  vinha: ["#2c5a28", "#5aa83c"],
  areia: ["#b89a60", "#d8bc80"],
  sombra: ["#2a1840", "#4a2a70"],
  luz: ["#e8d080", "#fff3c4"],
  molhado: ["#7a8fae", "#cfe6ff"],
  queimado: ["#5e4a40", "#ff8a3a"],
  rachado: ["#f4efe6", "#3a2a1c"]
};
// O terreno vira mancha orgânica: as células de 8 px formam um campo suave (interpolação com smoothstep + ruído na borda),
// que recorta uma textura própria de cada tipo. Nada de escada de quadrados chapados por cima do piso pintado.
export const TEX_SOLO = {},
  TEX_K = 3,
  TEX_N = 64,
  BASE_TEX = {};
// molhado, rachado e queimado escurecem o piso por multiplicação (o desenho do chão continua por baixo, como pedra molhada de verdade)
export const SOLO_MULT: Record<string, number> = { molhado: 1, rachado: 1, queimado: 1 };
export function texturaSolo(t: string) {
  if (TEX_SOLO[t]) return TEX_SOLO[t];
  const cor = COR_SOLO[t],
    N = TEX_N,
    c = document.createElement("canvas");
  c.width = c.height = N * TEX_K;
  const g = c.getContext("2d"),
    r = semente("solo:" + t);
  g.scale(TEX_K, TEX_K);
  g.globalAlpha = BASE_TEX[t] ?? 1;
  g.fillStyle = cor[0];
  g.fillRect(0, 0, N, N);
  g.globalAlpha = 1;
  // desenha com repetição nas bordas para a textura emendar sem costura
  const rep = (fn: () => void) => {
    for (const dx of [-N, 0, N])
      for (const dy of [-N, 0, N]) {
        g.save();
        g.translate(dx, dy);
        fn();
        g.restore();
      }
  };
  const mancha = (x: number, y: number, rr: number, cc, a: number) =>
    rep(() => {
      const gr = g.createRadialGradient(x, y, 0, x, y, rr),
        [R1, G1, B1] = hexRgb(cc);
      gr.addColorStop(0, `rgba(${R1},${G1},${B1},${a})`);
      gr.addColorStop(1, `rgba(${R1},${G1},${B1},0)`);
      g.fillStyle = gr;
      g.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    });
  if (!(t in BASE_TEX))
    for (let i = 0; i < 34; i++) mancha(r() * N, r() * N, 3 + r() * 9, r() < 0.5 ? tom(cor[0], 1.22) : tom(cor[0], 0.78), 0.55);
  const traco = (pts, cc, lw: number, a: number) =>
    rep(() => {
      g.strokeStyle = cc;
      g.globalAlpha = a;
      g.lineWidth = lw;
      g.lineCap = "round";
      g.lineJoin = "round";
      g.beginPath();
      g.moveTo(pts[0], pts[1]);
      for (let k = 2; k < pts.length; k += 2) g.lineTo(pts[k], pts[k + 1]);
      g.stroke();
      g.globalAlpha = 1;
    });
  const ponto = (x: number, y: number, rr: number, cc, a: number) =>
    rep(() => {
      g.fillStyle = cc;
      g.globalAlpha = a;
      g.beginPath();
      g.arc(x, y, rr, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
    });
  switch (t) {
    case "agua":
    case "eletrico":
      for (let i = 0; i < 16; i++) {
        const x = r() * N,
          y = r() * N,
          w = 4 + r() * 8;
        traco([x, y, x + w * 0.5, y - 1, x + w, y], cor[1], 0.6, 0.55);
      }
      if (t === "eletrico")
        for (let i = 0; i < 5; i++) {
          let x = r() * N,
            y = r() * N;
          const p = [x, y];
          for (let s = 0; s < 4; s++) {
            x += 2 + r() * 3;
            y += (r() - 0.5) * 5;
            p.push(x, y);
          }
          traco(p, "#fff6b0", 0.5, 0.8);
        }
      break;
    case "gelo":
      for (let i = 0; i < 7; i++) {
        let x = r() * N,
          y = r() * N;
        const p = [x, y];
        for (let s = 0; s < 4; s++) {
          x += (r() - 0.5) * 10;
          y += (r() - 0.5) * 10;
          p.push(x, y);
        }
        traco(p, "#ffffff", 0.45, 0.6);
      }
      for (let i = 0; i < 6; i++) {
        const x = r() * N,
          y = r() * N;
        traco([x, y, x + 5, y - 3], "#ffffff", 1.2, 0.35);
      }
      break;
    case "lama":
      for (let i = 0; i < 14; i++) ponto(r() * N, r() * N, 0.6 + r() * 1.6, tom(cor[0], 0.6), 0.6);
      for (let i = 0; i < 10; i++) ponto(r() * N, r() * N, 0.4 + r() * 0.6, cor[1], 0.7);
      break;
    case "fogo":
      for (let i = 0; i < 10; i++) {
        let x = r() * N,
          y = r() * N;
        const p = [x, y];
        for (let s = 0; s < 4; s++) {
          x += (r() - 0.5) * 9;
          y += (r() - 0.5) * 9;
          p.push(x, y);
        }
        traco(p, cor[1], 1.1, 0.85);
        traco(p, "#fff3c4", 0.4, 0.8);
      }
      break;
    case "grama":
    case "vinha":
      for (let i = 0; i < 140; i++) {
        const x = r() * N,
          y = r() * N,
          l = 1.2 + r() * 2,
          a = (r() - 0.5) * 0.9;
        traco([x, y, x + Math.sin(a) * l, y - Math.cos(a) * l], r() < 0.5 ? cor[1] : tom(cor[0], 0.75), 0.45, 0.8);
      }
      if (t === "vinha")
        for (let i = 0; i < 5; i++) {
          let x = r() * N,
            y = r() * N,
            a = r() * 6.28;
          const p = [x, y];
          for (let s = 0; s < 10; s++) {
            a += 0.6;
            x += Math.cos(a) * 1.5;
            y += Math.sin(a) * 1.5;
            p.push(x, y);
          }
          traco(p, "#1f4a1c", 0.7, 0.8);
        }
      break;
    case "cinza":
      for (let i = 0; i < 60; i++) ponto(r() * N, r() * N, 0.3 + r() * 0.6, r() < 0.6 ? tom(cor[0], 0.65) : cor[1], 0.7);
      for (let i = 0; i < 6; i++) ponto(r() * N, r() * N, 0.5, "#ff8a40", 0.6);
      break;
    case "areia":
      for (let i = 0; i < 14; i++) {
        const x = r() * N,
          y = r() * N,
          w = 6 + r() * 10;
        traco([x, y, x + w * 0.35, y - 1.2, x + w * 0.7, y - 0.6, x + w, y - 1.4], tom(cor[0], 0.82), 0.5, 0.55);
      }
      for (let i = 0; i < 40; i++) ponto(r() * N, r() * N, 0.3, cor[1], 0.7);
      break;
    case "sombra":
      for (let i = 0; i < 8; i++) {
        let x = r() * N,
          y = r() * N,
          a = r() * 6.28;
        const p = [x, y];
        for (let s = 0; s < 9; s++) {
          a += 0.5;
          x += Math.cos(a) * 2;
          y += Math.sin(a) * 2;
          p.push(x, y);
        }
        traco(p, cor[1], 0.8, 0.6);
      }
      break;
    case "luz":
      for (let i = 0; i < 18; i++) ponto(r() * N, r() * N, 0.4 + r() * 0.5, "#ffffff", 0.8);
      break;
    case "vapor":
      for (let i = 0; i < 10; i++) mancha(r() * N, r() * N, 4 + r() * 7, "#ffffff", 0.5);
      break;
    case "molhado":
      for (let i = 0; i < 10; i++) mancha(r() * N, r() * N, 4 + r() * 8, "#5a6e8e", 0.6);
      for (let i = 0; i < 8; i++) mancha(r() * N, r() * N, 3 + r() * 5, "#a8b8d0", 0.5);
      break;
    case "queimado":
      for (let i = 0; i < 14; i++) mancha(r() * N, r() * N, 3 + r() * 7, "#2a1e18", 0.6);
      for (let i = 0; i < 8; i++) {
        let x = r() * N,
          y = r() * N;
        const p = [x, y];
        for (let s2 = 0; s2 < 4; s2++) {
          x += (r() - 0.5) * 8;
          y += (r() - 0.5) * 8;
          p.push(x, y);
        }
        traco(p, "#ff8a3a", 0.8, 0.9);
        traco(p, "#ffe0a0", 0.3, 0.9);
      }
      for (let i = 0; i < 14; i++) ponto(r() * N, r() * N, 0.45, "#ffb050", 0.9);
      break;
    case "rachado":
      for (let i = 0; i < 10; i++) ponto(r() * N, r() * N, 0.5 + r() * 0.9, "#b8a890", 0.7);
      for (let i = 0; i < 10; i++) {
        let x = r() * N,
          y = r() * N;
        const p = [x, y];
        for (let s2 = 0; s2 < 5; s2++) {
          x += (r() - 0.5) * 9;
          y += (r() - 0.5) * 9;
          p.push(x, y);
        }
        traco(p, "#2a1a10", 0.75, 0.95);
        traco(
          p.map((v, k) => v + (k % 2 ? 0.7 : 0)),
          "#d8c8b0",
          0.3,
          0.6
        );
      }
      break;
  }
  TEX_SOLO[t] = c;
  return c;
}
// reflexos do chão molhado (camada somada por cima, só onde está molhado)
export let TEX_BRILHO = null;
export function texturaBrilho() {
  if (TEX_BRILHO) return TEX_BRILHO;
  const N = TEX_N,
    c = document.createElement("canvas");
  c.width = c.height = N * TEX_K;
  const g = c.getContext("2d"),
    r = semente("brilho");
  g.scale(TEX_K, TEX_K);
  g.lineCap = "round";
  for (let i = 0; i < 16; i++) {
    const x = r() * N,
      y = r() * N,
      w = 5 + r() * 10;
    for (const dx of [-N, 0, N])
      for (const dy of [-N, 0, N]) {
        g.strokeStyle = "#e8f4ff";
        g.globalAlpha = 0.5 + r() * 0.4;
        g.lineWidth = 0.5 + r() * 0.6;
        g.beginPath();
        g.moveTo(x + dx, y + dy);
        g.quadraticCurveTo(x + dx + w * 0.5, y + dy - 1.2, x + dx + w, y + dy - 0.4);
        g.stroke();
      }
  }
  for (let i = 0; i < 14; i++) {
    const x = r() * N,
      y = r() * N;
    for (const dx of [-N, 0, N])
      for (const dy of [-N, 0, N]) {
        g.fillStyle = "#ffffff";
        g.globalAlpha = 0.9;
        g.beginPath();
        g.arc(x + dx, y + dy, 0.45, 0, Math.PI * 2);
        g.fill();
      }
  }
  TEX_BRILHO = c;
  return c;
}
// força do terreno natural sobre um piso pintado (o piso já tem a própria textura; areia nele seria só uma mancha cinza)
export const SOLO_NAT_PINTADO: Record<string, number> = { areia: 0, grama: 0, cinza: 0, sombra: 0.5, gelo: 0.6 };
export const ALFA_SOLO: Record<string, number> = {
  molhado: 0.6,
  queimado: 0.42,
  rachado: 0.6,
  agua: 0.8,
  lama: 0.8,
  fogo: 0.95,
  gelo: 0.85,
  grama: 0.72,
  cinza: 0.55,
  vapor: 0.42,
  sombra: 0.32,
  luz: 0.3,
  eletrico: 0.9,
  vinha: 0.88,
  areia: 0.7
};
export const cacheSolo = new Map(),
  SOLO_FOLGA = 8;
// A camada é montada para uma área maior que a tela (folga de 8 células, ancorada numa grade de 8): andar não obriga a refazer.
// Refaz só quando a âncora muda ou o terreno daquele tipo muda (no máximo ~6 vezes por segundo por tipo).
// o que o desenho do chão guarda entre um quadro e outro (antes ficava pendurado na própria função desenharSolo)
export const SOLO_DES = {
  /** estado da última montagem */ es: null,
  /** grade de tipos de solo */ G: null,
  F: null as Float32Array
};
export function desenharSolo(ox: number, oy: number) {
  const A = SOLO_FOLGA,
    c0 = Math.floor(Math.floor(ox / CEL) / A) * A - A,
    r0 = Math.floor(Math.floor(oy / CEL) / A) * A - A;
  const W2 = 2 * A + Math.ceil(VW / CEL) + 3,
    H2 = 2 * A + Math.ceil(VH / CEL) + 3; // tamanho fixo: cobre a tela em qualquer ponto da âncora
  // J.solo ganha um contador de versão: sem mudança no terreno e sem sair da âncora, só redesenha o que já está pronto
  const M = J.solo;
  if (!M.__ver) {
    const s0 = M.set.bind(M),
      d0 = M.delete.bind(M);
    M.__ver = 1;
    M.set = (k, v) => {
      M.__ver++;
      return s0(k, v);
    };
    M.delete = k => {
      M.__ver++;
      return d0(k);
    };
  }
  const UK = 4,
    Kb = Math.max(1, Math.min(2, Q)),
    ancora = c0 + "|" + r0 + "|" + W2 + "|" + H2 + "|" + Kb,
    ES = SOLO_DES.es || (SOLO_DES.es = {});
  if (ES.ancora !== ancora || ES.J !== J || (ES.ver !== M.__ver && J.t - ES.t > 0.4) || J.t - ES.t > 1 || J.t < ES.t)
    montarSolo(c0, r0, W2, H2, UK, Kb, ancora);
  for (const [t, ent] of cacheSolo) {
    if (!ent.b) continue;
    let a = ALFA_SOLO[t] ?? 0.8;
    if (t === "fogo") a *= 0.85 + 0.15 * Math.sin(J.t * 9);
    else if (t === "eletrico") a *= Math.floor(J.t * 14) % 3 ? 1 : 0.6;
    else if (t === "agua") a *= 0.94 + 0.06 * Math.sin(J.t * 2.2);
    else if (t === "queimado") a *= 0.9 + 0.1 * Math.sin(J.t * 5);
    const suave = lg.imageSmoothingEnabled;
    lg.imageSmoothingEnabled = true;
    lg.imageSmoothingQuality = "low";
    lg.globalAlpha = a;
    // só o trecho visível da camada (ampliação simples: a textura já é suave, e a de alta qualidade custa caro a cada quadro)
    // só a área que tem esse tipo de chão (antes cada tipo cobria a tela inteira, mesmo com 2 ladrilhos)
    const cb = ent.caixa;
    let x0 = 0,
      y0 = 0,
      x1 = VW,
      y1 = VH;
    if (cb) {
      x0 = Math.max(0, (c0 + cb[0] - 1) * CEL - ox);
      y0 = Math.max(0, (r0 + cb[1] - 1) * CEL - oy);
      x1 = Math.min(VW, (c0 + cb[2] + 2) * CEL - ox);
      y1 = Math.min(VH, (r0 + cb[3] + 2) * CEL - oy);
    }
    if (x1 <= x0 || y1 <= y0) {
      lg.imageSmoothingEnabled = suave;
      lg.imageSmoothingQuality = "high";
      continue;
    }
    const sx = (ox - c0 * CEL + x0) * Kb,
      sy = (oy - r0 * CEL + y0) * Kb,
      w = x1 - x0,
      h = y1 - y0;
    if (SOLO_MULT[t]) lg.globalCompositeOperation = "multiply";
    lg.drawImage(ent.b, sx, sy, w * Kb, h * Kb, x0, y0, w, h);
    lg.globalCompositeOperation = "source-over";
    if (ent.b2 && t === "molhado") {
      lg.globalCompositeOperation = "lighter";
      lg.globalAlpha = 0.32 + 0.08 * Math.sin(J.t * 1.7);
      lg.drawImage(ent.b2, sx, sy, w * Kb, h * Kb, x0, y0, w, h);
      lg.globalCompositeOperation = "source-over";
    }
    lg.imageSmoothingEnabled = suave;
    lg.imageSmoothingQuality = "high";
  }
  lg.globalAlpha = 1;
}
export function montarSolo(c0: number, r0: number, W2: number, H2: number, UK: number, Kb: number, ancora: string) {
  const ES = SOLO_DES.es;
  ES.ancora = ancora;
  ES.J = J;
  ES.ver = J.solo.__ver;
  ES.t = J.t;
  const est = estruturaU() && J.cena,
    lagoArte = est && folhaU("pecas"),
    pintado = !!(chao && chao.suave);
  const n = W2 * H2,
    G = SOLO_DES.G && SOLO_DES.G.length >= n ? SOLO_DES.G : (SOLO_DES.G = new Array(n));
  const F = SOLO_DES.F && SOLO_DES.F.length >= n ? SOLO_DES.F : (SOLO_DES.F = new Float32Array(n));
  const tipos = new Map(),
    caixas = new Map(); // caixas: área ocupada por cada tipo (o desenho só copia essa área)
  for (let j = 0; j < H2; j++)
    for (let i = 0; i < W2; i++) {
      const cx = c0 + i,
        cy = r0 + j,
        idx = j * W2 + i;
      let t = soloEm(cx, cy),
        f = 1;
      if (t !== "chao") {
        const din = J.solo.has(cx + "," + cy);
        if (est && abismoEm(cx * CEL + 4, cy * CEL + 4, 0)) t = "chao";
        else if (lagoArte && t === soloLago() && !din && lagoEm(cx * CEL + 4, cy * CEL + 4)) t = "chao";
        else if (!din && pintado && SOLO_NAT_PINTADO[t] != null) {
          f = SOLO_NAT_PINTADO[t];
          if (f <= 0) t = "chao";
        }
      }
      if (!COR_SOLO[t]) t = "chao";
      G[idx] = t;
      F[idx] = f;
      if (t !== "chao") {
        const h = tipos.get(t) || 0;
        tipos.set(t, (Math.imul(h, 31) + idx * 7 + Math.round(f * 10)) | 0);
        const b = caixas.get(t);
        if (b) {
          if (i < b[0]) b[0] = i;
          if (j < b[1]) b[1] = j;
          if (i > b[2]) b[2] = i;
          if (j > b[3]) b[3] = j;
        } else caixas.set(t, [i, j, i, j]);
      }
    }
  for (const k of cacheSolo.keys()) if (!tipos.has(k)) cacheSolo.delete(k);
  const uw = W2 * UK,
    uh = H2 * UK,
    wx0 = c0 * CEL,
    wy0 = r0 * CEL;
  for (const [t, assin] of tipos) {
    let ent = cacheSolo.get(t);
    if (!ent) {
      ent = {};
      cacheSolo.set(t, ent);
    }
    ent.caixa = caixas.get(t);
    if (ent.ancora !== ancora || ent.assin !== assin) {
      ent.ancora = ancora;
      ent.assin = assin;
      // 1) campo suave em 4 px por célula, com borda irregular
      if (!ent.u || ent.u.width !== uw || ent.u.height !== uh) {
        ent.u = document.createElement("canvas");
        ent.u.width = uw;
        ent.u.height = uh;
        ent.ug = ent.u.getContext("2d");
        ent.id = ent.ug.createImageData(uw, uh);
      }
      const d = ent.id.data,
        P = new Float32Array(n),
        S2 = new Float32Array(n);
      for (let k = 0; k < n; k++) {
        if (G[k] === t) {
          P[k] = 1;
          S2[k] = F[k];
        }
      }
      // desfoque 3x3 no campo: diagonais viram curvas em vez de escada; célula isolada continua como manchinha
      const Pb = new Float32Array(n);
      for (let j = 0; j < H2; j++)
        for (let i = 0; i < W2; i++) {
          let acc = 0,
            wt = 0;
          for (let dj = -1; dj <= 1; dj++)
            for (let di = -1; di <= 1; di++) {
              const ii = i + di,
                jj = j + dj;
              if (ii < 0 || jj < 0 || ii >= W2 || jj >= H2) continue;
              const w = (di ? 1 : 2) * (dj ? 1 : 2);
              acc += P[jj * W2 + ii] * w;
              wt += w;
            }
          const k = j * W2 + i;
          Pb[k] = Math.max(acc / wt, P[k] * 0.75);
        }
      for (let y = 0; y < uh; y++) {
        const fy = (y + 0.5) / UK - 0.5,
          j0 = Math.max(0, Math.min(H2 - 2, Math.floor(fy))),
          vy = Math.max(0, Math.min(1, fy - j0));
        for (let x = 0; x < uw; x++) {
          const fx = (x + 0.5) / UK - 0.5,
            i0 = Math.max(0, Math.min(W2 - 2, Math.floor(fx))),
            vx = Math.max(0, Math.min(1, fx - i0));
          const a = j0 * W2 + i0,
            b = a + 1,
            c = a + W2,
            e = c + 1,
            o = (y * uw + x) * 4;
          const vp = (P[a] * (1 - vx) + P[b] * vx) * (1 - vy) + (P[c] * (1 - vx) + P[e] * vx) * vy;
          if (vp <= 0.001) {
            d[o + 3] = 0;
            continue;
          }
          const v = (Pb[a] * (1 - vx) + Pb[b] * vx) * (1 - vy) + (Pb[c] * (1 - vx) + Pb[e] * vx) * vy;
          if (v < 0.3) {
            d[o + 3] = 0;
            continue;
          }
          const s = ((S2[a] * (1 - vx) + S2[b] * vx) * (1 - vy) + (S2[c] * (1 - vx) + S2[e] * vx) * vy) / vp;
          // ruído só na faixa da borda (no miolo o resultado já é 0 ou 1)
          const m =
            v > 0.69
              ? 1
              : v < 0.31
                ? 0
                : Math.max(0, Math.min(1, (v - 0.5 + ruido((wx0 / 2 + x / 2) / 3, (wy0 / 2 + y / 2) / 3, 11) * 0.22 - 0.11) * 7 + 0.5));
          d[o] = d[o + 1] = d[o + 2] = 255;
          d[o + 3] = Math.round(255 * m * s);
        }
      }
      ent.ug.putImageData(ent.id, 0, 0);
      // 2) textura do tipo recortada pela máscara + beirada escura embaixo, tudo numa imagem só (um desenho por quadro)
      const bw = W2 * CEL * Kb,
        bh = H2 * CEL * Kb;
      if (!ent.b || ent.b.width !== bw || ent.b.height !== bh) {
        ent.b = document.createElement("canvas");
        ent.b.width = bw;
        ent.b.height = bh;
        ent.bg = ent.b.getContext("2d");
      }
      const g = ent.bg;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.globalCompositeOperation = "source-over";
      g.globalAlpha = 1;
      g.clearRect(0, 0, bw, bh);
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = "low";
      g.drawImage(ent.u, 0, 0, bw, bh);
      g.globalCompositeOperation = "source-in";
      const tex = texturaSolo(t);
      if (!ent.pat || ent.tex !== tex) {
        ent.pat = g.createPattern(tex, "repeat");
        ent.tex = tex;
      }
      const N = TEX_N,
        mx = ((wx0 % N) + N) % N,
        my = ((wy0 % N) + N) % N;
      g.setTransform(Kb / TEX_K, 0, 0, Kb / TEX_K, 0, 0);
      g.translate(-mx * TEX_K, -my * TEX_K);
      g.fillStyle = ent.pat;
      g.fillRect(0, 0, (W2 * CEL + N) * TEX_K, (H2 * CEL + N) * TEX_K);
      g.setTransform(1, 0, 0, 1, 0, 0);
      if (SOLO_MULT[t] && t === "molhado") {
        if (!ent.b2 || ent.b2.width !== bw || ent.b2.height !== bh) {
          ent.b2 = document.createElement("canvas");
          ent.b2.width = bw;
          ent.b2.height = bh;
        }
        const g2 = ent.b2.getContext("2d");
        g2.setTransform(1, 0, 0, 1, 0, 0);
        g2.globalCompositeOperation = "source-over";
        g2.clearRect(0, 0, bw, bh);
        g2.imageSmoothingEnabled = true;
        g2.drawImage(ent.u, 0, 0, bw, bh);
        g2.globalCompositeOperation = "source-in";
        const pb = g2.createPattern(texturaBrilho(), "repeat");
        g2.setTransform(Kb / TEX_K, 0, 0, Kb / TEX_K, 0, 0);
        g2.translate(-mx * TEX_K, -my * TEX_K);
        g2.fillStyle = pb;
        g2.fillRect(0, 0, (W2 * CEL + N) * TEX_K, (H2 * CEL + N) * TEX_K);
        g2.setTransform(1, 0, 0, 1, 0, 0);
        g2.globalCompositeOperation = "source-over";
      }
      if (t !== "vapor" && t !== "luz" && !SOLO_MULT[t]) {
        const liq = t === "agua" || t === "lama" || t === "fogo" || t === "eletrico" || t === "gelo";
        if (!ent.s || ent.s.width !== uw || ent.s.height !== uh) {
          ent.s = document.createElement("canvas");
          ent.s.width = uw;
          ent.s.height = uh;
        }
        const gs = ent.s.getContext("2d");
        gs.globalCompositeOperation = "source-over";
        gs.clearRect(0, 0, uw, uh);
        gs.drawImage(ent.u, 0, 0);
        gs.globalCompositeOperation = "source-in";
        gs.fillStyle = tom(COR_SOLO[t][0], 0.4);
        gs.fillRect(0, 0, uw, uh);
        gs.globalCompositeOperation = "source-over";
        g.globalCompositeOperation = "destination-over";
        g.globalAlpha = liq ? 0.75 : 0.45;
        g.drawImage(ent.s, 0, (liq ? 1.2 : 0.7) * Kb, bw, bh);
        g.globalAlpha = 1;
      }
      g.globalCompositeOperation = "source-over";
    }
  }
}
