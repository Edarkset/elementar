// Elementar · criaturas: inimigos comuns e mini-chefes (corpo, passo, golpe, derrota e desenho)
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./08h_interface.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import {
  agendar,
  ativos,
  branco,
  COR,
  ctx,
  defFonte,
  dist2,
  escolha,
  FONTE,
  J,
  lg,
  linhagemDe,
  R,
  rnd,
  S,
  SIM,
  spriteLinha,
  tom,
  UNIV,
  VH,
  VW
} from "./01_nucleo.js";
import { anel, danoSimples, DIF, dificuldade, morrer, particulas, raio, sombraContato, spawnInimigo, texto, tremor } from "./02_combate.js";
import { aplicarElementoNoSolo, CEL, frio, mudarSolo, soloEm } from "./04_ambiente.js";
import { fatiarFolha, quadroAnim } from "./05_arte.js";
import { QUAL } from "./06_loop.js";
import { brasa, fumaca, particulaAr } from "./07_cenario.js";
import { silhueta, silhuetaMundo } from "./07b_cenario_desenho.js";
import { celulaArte, desenharSprite, folhaArte, folhaU } from "./07c_cenario_arte.js";
import { contornoLeitura } from "./08_horda.js";
import { evento } from "./08e_conquistas.js";
import { sombraProjetada } from "./08g_luz.js";
import { bala, criarProp, feriJogador, perigo } from "./09b_chefes.js";
import { MULTIDAO } from "./10_desenho.js";
// ================================================================ criaturas: inimigos comuns, mini-chefes e chefes
// Cada inimigo vem de dados/fonte_combate.py: corpo, jeito de andar, golpe, derrota, mania e detalhes.
// Os sprites são pintados pixel a pixel por tipo de corpo, com quadros de caminhada, ataque, dor e piscada.
// Quando a folha de arte do universo for importada, ela substitui o sprite pintado (mesma ordem de quadros).

export const cacheCri = new Map();
export function spriteCriatura(def, tam: number, cor: string, q: number, pose: string, semente: number) {
  const det = def.detalhes || [],
    k = def.nome + "|" + tam + "|" + cor + "|" + q + "|" + pose + "|" + (semente || 0);
  if (cacheCri.has(k)) return cacheCri.get(k);
  if (cacheCri.size > 1400) cacheCri.clear();
  const W = tam + 4,
    H = tam + 4,
    buf = new Array(W * H).fill(null),
    s = tam,
    ox = 2,
    oy = 2,
    tem = (d: string) => det.includes(d),
    u = Math.max(1, s / 16);
  const px = (x: number, y: number, c: string) => {
    x = Math.round(x) + ox;
    y = Math.round(y) + oy;
    if (x >= 0 && y >= 0 && x < W && y < H && c) buf[y * W + x] = c;
  };
  const osso = tem("ossos"),
    band = tem("bandagens");
  const base = osso ? "#e2dac6" : band ? "#d8ccaa" : cor,
    esc = tom(base, 0.62),
    cont = "#140f1c";
  const sombreado = (dx: number, dy: number, c: string) => (dx + dy < -0.45 ? tom(c, 1.28) : dx + dy > 0.5 ? tom(c, 0.66) : c);
  const elipse = (cx: number, cy: number, rx: number, ry: number, c: string, plano?: boolean) => {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x - cx) / Math.max(0.5, rx),
          dy = (y - cy) / Math.max(0.5, ry);
        if (dx * dx + dy * dy <= 1.05) px(x, y, plano ? c : sombreado(dx, dy, c));
      }
  };
  const ret = (x: number, y: number, w: number, h: number, c: string) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) px(x + i, y + j, c);
  };
  const linha = (x0: number, y0: number, x1: number, y1: number, c: string, g?: number) => {
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    for (let i = 0; i <= n; i++) {
      const t = i / n,
        x = x0 + (x1 - x0) * t,
        y = y0 + (y1 - y0) * t;
      px(x, y, c);
      if (g > 1) px(x, y + 1, c);
    }
  };
  const fi = (q * Math.PI) / 2,
    sw = Math.sin(fi),
    sw2 = Math.cos(fi),
    atk = pose === "atk",
    dor = pose === "dor",
    pisc = pose === "pisca",
    man = pose === "mania";
  // pontos de referência para os detalhes: cabeça (hx,hy,hr) e corpo (bx,by,br)
  let hx = s * 0.5,
    hy = s * 0.3,
    hr = s * 0.16,
    bx = s * 0.5,
    by = s * 0.58,
    br = s * 0.22,
    boca = null,
    olhos = [];
  const dd = dor ? 1 : 0;
  switch (def.corpo) {
    case "humanoide": {
      const hip = s * 0.7 + dd,
        umPe = tem("um_pe");
      if (!tem("cauda") || !tem("flutua")) {
        if (umPe) {
          linha(s * 0.5, hip, s * 0.5 + sw * u, s - 1, esc, u);
          px(s * 0.5 + sw * u + 1, s - 1, esc);
        } else if (def.andar !== "flutua") {
          linha(s * 0.43, hip, s * 0.4 + sw * 1.6 * u, s - 1, esc, 1);
          linha(s * 0.57, hip, s * 0.6 - sw * 1.6 * u, s - 1, esc, 1);
          if (u > 1.2) {
            linha(s * 0.43 + 1, hip, s * 0.4 + sw * 1.6 * u + 1, s - 1, esc);
            linha(s * 0.57 - 1, hip, s * 0.6 - sw * 1.6 * u - 1, s - 1, esc);
          }
        } else {
          for (let i = 0; i < 4; i++)
            linha(s * 0.38 + i * s * 0.08, hip, s * 0.36 + i * s * 0.09 + Math.sin(fi + i) * u, s - 1 - (i % 2), tom(base, 0.8));
        }
      }
      elipse(s * 0.5, s * 0.54 + dd, s * 0.19, s * 0.19, base);
      bx = s * 0.5;
      by = s * 0.54 + dd;
      br = s * 0.19;
      if (!tem("sem_cabeca")) {
        hx = s * 0.52 + (atk ? u : 0);
        hy = s * 0.29 + dd;
        hr = s * 0.165;
        elipse(hx, hy, hr, hr * 0.95, osso || band ? base : tom(base, 1.12));
      } else {
        hx = s * 0.52;
        hy = s * 0.36;
        hr = s * 0.08;
        ret(s * 0.42, s * 0.34, s * 0.2, 2, "#3a2a2a");
      }
      // braços balançando ao contrário das pernas; no ataque, o braço da frente vai à frente
      linha(s * 0.32, s * 0.47 + dd, s * 0.28 - sw * u, s * 0.68 + dd, tom(base, 0.85), 1);
      if (atk) linha(s * 0.66, s * 0.46 + dd, s * 0.86, s * 0.38 + dd, tom(base, 0.95), 1);
      else if (man) linha(s * 0.66, s * 0.46, s * 0.78, s * 0.24, tom(base, 0.95), 1);
      else linha(s * 0.68, s * 0.47 + dd, s * 0.72 + sw * u, s * 0.68 + dd, tom(base, 0.95), 1);
      olhos = [
        [hx + hr * 0.15, hy],
        [hx + hr * 0.65, hy]
      ];
      boca = [hx + hr * 0.45, hy + hr * 0.55];
      break;
    }
    case "golem": {
      const hip = s * 0.74 + dd;
      ret(s * 0.3, hip, s * 0.14, s - hip, esc);
      ret(s * 0.56, hip, s * 0.14, s - hip, esc);
      ret(s * 0.3 + sw * u, s - 2, s * 0.16, 2, tom(esc, 0.8));
      ret(s * 0.56 - sw * u, s - 2, s * 0.16, 2, tom(esc, 0.8));
      for (let y = Math.round(s * 0.34) + dd; y < hip; y++)
        for (let x = Math.round(s * 0.2); x < s * 0.8; x++) {
          const dx = (x - s * 0.5) / (s * 0.3),
            dy = (y - s * 0.55) / (s * 0.22);
          px(x, y, sombreado(dx, dy, base));
        }
      bx = s * 0.5;
      by = s * 0.55;
      br = s * 0.28;
      const ay = atk ? -u * 2 : 0;
      ret(s * 0.1, s * 0.38 + dd + ay, s * 0.12, s * 0.34, tom(base, 0.8));
      ret(s * 0.78, s * 0.38 + dd + (atk ? -u * 3 : 0), s * 0.12, s * 0.34, tom(base, 0.9));
      hx = s * 0.52;
      hy = s * 0.26 + dd;
      hr = s * 0.13;
      elipse(hx, hy, hr * 1.1, hr, tom(base, 1.08));
      olhos = [
        [hx - hr * 0.2, hy],
        [hx + hr * 0.5, hy]
      ];
      boca = [hx + hr * 0.2, hy + hr * 0.6];
      break;
    }
    case "quadrupede": {
      const y0 = s * 0.66 + dd;
      const pernas = [
        [s * 0.26, 0],
        [s * 0.38, Math.PI],
        [s * 0.6, Math.PI],
        [s * 0.72, 0]
      ];
      for (const [x, f] of pernas) {
        const o = Math.sin(fi + f) * 1.4 * u;
        linha(x, y0, x + o, s - 1, x < s * 0.5 ? esc : tom(base, 0.75), u > 1.2 ? 2 : 1);
      }
      elipse(s * 0.48, s * 0.58 + dd, s * 0.3, s * 0.16, base);
      bx = s * 0.48;
      by = s * 0.58;
      br = s * 0.2;
      hx = s * 0.78 + (atk ? u * 1.5 : 0);
      hy = s * 0.44 + dd + (atk ? u : 0);
      hr = s * 0.13;
      elipse(hx, hy, hr, hr * 0.9, tom(base, 1.08));
      elipse(hx + hr * 0.9, hy + hr * 0.35, hr * 0.55, hr * 0.4, tom(base, 1.0));
      if (!tem("cauda")) linha(s * 0.18, s * 0.54, s * 0.08, s * 0.42 + sw2 * u, esc);
      olhos = [[hx + hr * 0.3, hy - hr * 0.2]];
      boca = [hx + hr * 1.3, hy + hr * 0.6];
      break;
    }
    case "bipede": {
      const y0 = s * 0.68 + dd;
      linha(s * 0.42, y0, s * 0.38 + sw * 2 * u, s - 1, esc, 2);
      linha(s * 0.54, y0, s * 0.58 - sw * 2 * u, s - 1, tom(base, 0.8), 2);
      for (let i = 0; i < 8; i++)
        elipse(
          s * 0.32 - i * s * 0.035,
          s * 0.58 + i * s * 0.025 + sw2 * i * 0.15,
          s * 0.08 - i * s * 0.008,
          s * 0.06 - i * s * 0.006,
          tom(base, 0.92),
          true
        );
      elipse(s * 0.5, s * 0.55 + dd, s * 0.2, s * 0.17, base);
      bx = s * 0.5;
      by = s * 0.55;
      br = s * 0.18;
      hx = s * 0.72 + (atk ? u : 0);
      hy = s * 0.32 + dd;
      hr = s * 0.13;
      elipse(hx, hy, hr * 1.2, hr, tom(base, 1.1));
      linha(hx - hr * 0.4, hy + hr * 0.9, hx + hr * 1.2, hy + hr * (atk ? 1.6 : 0.9), esc);
      linha(s * 0.66, s * 0.5, s * 0.74, s * 0.58, esc);
      olhos = [[hx + hr * 0.4, hy - hr * 0.3]];
      boca = [hx + hr * 1.1, hy + hr * 0.9];
      break;
    }
    case "inseto": {
      const y0 = s * 0.72 + dd;
      for (let i = 0; i < 3; i++) {
        const x = s * 0.32 + i * s * 0.16,
          o = Math.sin(fi + i * Math.PI) * u;
        linha(x, y0, x - u * 2 + o, s - 1, esc);
        linha(x + 1, y0, x + u * 2 + o, s - 1, esc);
      }
      elipse(s * 0.46, s * 0.64 + dd, s * 0.3, s * 0.16, base);
      for (let x = Math.round(s * 0.22); x < s * 0.7; x += Math.max(2, Math.round(u * 2)))
        for (let y = Math.round(s * 0.52); y < s * 0.76; y++)
          if (buf[(Math.round(y + dd) + oy) * W + x + ox]) px(x, y + dd, tom(base, 0.8));
      bx = s * 0.46;
      by = s * 0.64;
      br = s * 0.2;
      hx = s * 0.78;
      hy = s * 0.62 + dd;
      hr = s * 0.1;
      elipse(hx, hy, hr, hr * 0.9, tom(base, 0.9));
      olhos = [[hx + hr * 0.3, hy - hr * 0.3]];
      boca = [hx + hr, hy + hr * 0.3];
      break;
    }
    case "serpente": {
      const n = 9;
      for (let i = n; i >= 0; i--) {
        const t = i / n,
          x = s * 0.08 + t * s * 0.66,
          y = s * 0.74 + Math.sin(t * 5.5 + fi) * s * 0.07 + dd,
          rr = s * (0.06 + 0.07 * t);
        elipse(x, y, rr, rr * 0.85, i % 2 ? base : tom(base, 0.9));
      }
      hx = s * 0.8 + (atk ? u * 2 : 0);
      hy = s * 0.56 + dd - (atk ? u * 2 : 0);
      hr = s * 0.13;
      elipse(hx, hy, hr * 1.15, hr, tom(base, 1.1));
      bx = s * 0.45;
      by = s * 0.72;
      br = s * 0.18;
      if (q % 2 === 0 || atk) {
        px(hx + hr * 1.2, hy + hr * 0.3, "#e04848");
        px(hx + hr * 1.2 + 1, hy + hr * 0.1, "#e04848");
      }
      olhos = [[hx + hr * 0.35, hy - hr * 0.35]];
      boca = [hx + hr, hy + hr * 0.4];
      break;
    }
    case "ave": {
      const voando = def.andar === "voa",
        asa = voando ? (q % 2 === 0 ? -1 : 1) : 0;
      if (!voando) {
        linha(s * 0.45, s * 0.7, s * 0.42 + sw * u, s - 1, "#c8a040");
        linha(s * 0.55, s * 0.7, s * 0.58 - sw * u, s - 1, "#c8a040");
      }
      elipse(s * 0.48, s * 0.54 + dd, s * 0.22, s * 0.16, base);
      bx = s * 0.48;
      by = s * 0.54;
      br = s * 0.18;
      for (let i = 0; i < 4; i++) linha(s * 0.28, s * 0.55, s * 0.08, s * 0.5 + i * s * 0.04, tom(base, 0.8));
      const wy = asa < 0 ? -s * 0.3 : s * 0.06;
      for (let i = 0; i < 5; i++)
        linha(
          s * 0.4,
          s * 0.5,
          s * 0.18 + i * s * 0.06,
          s * 0.5 + wy + Math.abs(i - 2) * u * 0.8,
          i % 2 ? tom(base, 0.78) : tom(base, 0.92)
        );
      hx = s * 0.7 + (atk ? u * 1.5 : 0);
      hy = s * 0.36 + dd;
      hr = s * 0.12;
      elipse(hx, hy, hr, hr, tom(base, 1.12));
      linha(hx + hr * 0.8, hy, hx + hr * 1.9, hy + hr * (atk ? 0.8 : 0.3), "#e0a838");
      olhos = [[hx + hr * 0.3, hy - hr * 0.2]];
      boca = [hx + hr * 1.4, hy + hr * 0.3];
      break;
    }
    case "espectro": {
      elipse(s * 0.5, s * 0.4 + dd, s * 0.22, s * 0.22, base);
      bx = s * 0.5;
      by = s * 0.5;
      br = s * 0.2;
      for (let y = Math.round(s * 0.5); y < s - 1; y++) {
        const t = (y - s * 0.5) / (s * 0.5),
          w = s * 0.22 * (1 - t * 0.55);
        for (let x = Math.round(s * 0.5 - w); x <= s * 0.5 + w; x++) {
          const onda = Math.sin(x * 0.9 + fi * 2) * 1.4;
          if (y > s * 0.9 + onda) continue;
          px(x + Math.sin(t * 3 + fi) * u, y, sombreado((x - s * 0.5) / (w + 1), t, base));
        }
      }
      linha(s * 0.3, s * 0.48, s * 0.16 - sw * u, s * 0.64, tom(base, 0.85));
      linha(s * 0.7, s * 0.48, s * (atk ? 0.92 : 0.84) + sw * u, s * (atk ? 0.4 : 0.64), tom(base, 0.95));
      hx = s * 0.5;
      hy = s * 0.38 + dd;
      hr = s * 0.2;
      olhos = [
        [hx - hr * 0.15, hy],
        [hx + hr * 0.5, hy]
      ];
      boca = [hx + hr * 0.2, hy + hr * 0.55];
      break;
    }
    case "bolha": {
      const sq = (q % 2 === 0 ? 0.12 : -0.06) + (dor ? 0.2 : 0);
      elipse(s * 0.5, s * 0.62 + sq * s * 0.3, s * 0.32 * (1 + sq), s * 0.28 * (1 - sq), base);
      px(s * 0.36, s * 0.48, "#ffffff");
      px(s * 0.38, s * 0.46, tom(base, 1.6));
      bx = s * 0.5;
      by = s * 0.62;
      br = s * 0.3;
      hx = s * 0.52;
      hy = s * 0.56;
      hr = s * 0.2;
      olhos = [
        [hx - hr * 0.3, hy],
        [hx + hr * 0.5, hy]
      ];
      boca = [hx + hr * 0.1, hy + hr * 0.6];
      break;
    }
    case "aquatico": {
      const cauda = Math.sin(fi) * u * 1.5;
      elipse(s * 0.5, s * 0.6 + dd, s * 0.32, s * 0.17, base);
      for (let i = 0; i < 4; i++) linha(s * 0.2, s * 0.6, s * 0.04, s * 0.48 + i * s * 0.08 + cauda, tom(base, 0.8));
      for (let x = Math.round(s * 0.3); x < s * 0.75; x++) px(x, s * 0.68 + dd, tom(base, 1.25));
      bx = s * 0.5;
      by = s * 0.6;
      br = s * 0.2;
      hx = s * 0.72;
      hy = s * 0.56 + dd;
      hr = s * 0.12;
      olhos = [[hx + hr * 0.3, hy - hr * 0.3]];
      boca = [hx + hr * 1.3, hy + hr * 0.5];
      break;
    }
    case "planta": {
      if (tem("cogumelo")) {
        const sq = q % 2 ? 0.08 : 0;
        ret(s * 0.42, s * 0.5, s * 0.16, s * 0.5, "#e8e0d0");
        ret(s * 0.42, s * 0.5, u, s * 0.5, "#ffffff");
        for (let y = Math.round(s * 0.16); y < s * 0.52; y++) {
          const t = (y - s * 0.16) / (s * 0.36),
            w = s * (0.18 + 0.24 * Math.sqrt(t)) * (1 + sq);
          for (let x = Math.round(s * 0.5 - w); x <= s * 0.5 + w; x++) px(x, y, sombreado((x - s * 0.5) / w, t - 0.5, base));
        }
        for (const [a, b] of [
          [0.36, 0.3],
          [0.6, 0.26],
          [0.5, 0.4],
          [0.7, 0.42]
        ] as [number, number][])
          px(s * a, s * b, "#f4f0e8");
        hx = s * 0.5;
        hy = s * 0.64;
        hr = s * 0.1;
        bx = s * 0.5;
        by = s * 0.6;
        br = s * 0.14;
        olhos = [
          [hx - hr * 0.6, hy],
          [hx + hr * 0.5, hy]
        ];
        boca = [hx, hy + hr * 0.9];
        break;
      }
      ret(s * 0.4, s * 0.4, s * 0.2, s * 0.6, "#5a3a20");
      for (let i = 0; i < 5; i++)
        linha(s * 0.5, s * 0.42, s * 0.12 + i * s * 0.19, s * 0.24 + (i % 2) * s * 0.08 + sw * u * (i % 2 ? 1 : -1), "#4a2a14");
      elipse(s * 0.5, s * 0.3, s * 0.3, s * 0.2, "#3f7a34");
      for (let i = 0; i < 8; i++) px(s * 0.25 + (((i * 37) % 10) / 10) * s * 0.5, s * 0.18 + (((i * 53) % 10) / 10) * s * 0.24, "#7ac050");
      linha(s * 0.4, s * (1 - 0.02), s * 0.36 + sw * u, s - 1, "#4a2a14");
      hx = s * 0.5;
      hy = s * 0.52;
      hr = s * 0.1;
      bx = s * 0.5;
      by = s * 0.6;
      br = s * 0.16;
      olhos = [
        [hx - hr * 0.6, hy],
        [hx + hr * 0.6, hy]
      ];
      boca = [hx, hy + hr];
      break;
    }
    case "objeto":
    default: {
      if (tem("guarda_chuva")) {
        linha(s * 0.5, s * 0.45, s * 0.5 + sw * u, s - 1, "#8a5a30", 1);
        px(s * 0.5 + sw * u + 1, s - 1, "#8a5a30");
        for (let y = Math.round(s * 0.12); y < s * 0.46; y++) {
          const t = (y - s * 0.12) / (s * 0.34),
            w = s * 0.42 * Math.sqrt(t);
          for (let x = Math.round(s * 0.5 - w); x <= s * 0.5 + w; x++)
            px(x, y + (dor ? 1 : 0), (Math.floor((x - s * 0.5) / (s * 0.12)) + 10) % 2 ? base : tom(base, 0.78));
        }
        hx = s * 0.5;
        hy = s * 0.32;
        hr = s * 0.12;
        olhos = [[hx, hy]];
        boca = [hx, hy + hr * 1.1];
        bx = s * 0.5;
        by = s * 0.3;
        br = s * 0.3;
        break;
      }
      if (tem("lanterna")) {
        for (let y = Math.round(s * 0.2); y < s * 0.82; y++) {
          const t = (y - s * 0.51) / (s * 0.31),
            w = s * 0.26 * Math.sqrt(Math.max(0, 1 - t * t));
          for (let x = Math.round(s * 0.5 - w); x <= s * 0.5 + w; x++)
            px(x, y, y % 3 === 0 ? tom(base, 0.72) : sombreado((x - s * 0.5) / (w + 1), t, base));
        }
        ret(s * 0.38, s * 0.16, s * 0.24, 2, "#2a2024");
        ret(s * 0.38, s * 0.82, s * 0.24, 2, "#2a2024");
        hx = s * 0.5;
        hy = s * 0.44;
        hr = s * 0.14;
        olhos = [[hx, hy]];
        boca = [hx, hy + hr * 1.4];
        bx = s * 0.5;
        by = s * 0.5;
        br = s * 0.24;
        break;
      }
      if (tem("bobina")) {
        ret(s * 0.3, s * 0.82, s * 0.4, s * 0.18, "#3a3640");
        for (let y = Math.round(s * 0.32); y < s * 0.82; y++) ret(s * 0.38, y, s * 0.24, 1, y % 2 ? "#c87a3a" : "#e09a5a");
        elipse(s * 0.5, s * 0.22, s * 0.17, s * 0.14, "#c8d0d8");
        if (atk || q % 2) px(s * 0.5 + u * 2, s * 0.1, "#fff3a0");
        hx = s * 0.5;
        hy = s * 0.22;
        hr = s * 0.14;
        olhos = [
          [hx - hr * 0.4, hy],
          [hx + hr * 0.4, hy]
        ];
        bx = s * 0.5;
        by = s * 0.55;
        br = s * 0.18;
        break;
      }
      if (tem("jarro")) {
        for (let y = Math.round(s * 0.2); y < s * 0.95; y++)
          for (let x = Math.round(s * 0.24); x < s * 0.76; x++)
            px(x, y, x === Math.round(s * 0.24) || x === Math.round(s * 0.76) - 1 ? "#9fd0ea" : "rgba(150,210,240,.35)");
        elipse(s * 0.5, s * 0.55 + (q % 2), s * 0.18, s * 0.14, "#e8a0b0");
        for (let i = 0; i < 4; i++) px(s * 0.42 + i * s * 0.05, s * 0.55 + (i % 2), "#c86a80");
        ret(s * 0.22, s * 0.14, s * 0.56, s * 0.08, "#8a8a90");
        hx = s * 0.5;
        hy = s * 0.5;
        hr = s * 0.14;
        olhos = [
          [hx - hr * 0.4, hy],
          [hx + hr * 0.6, hy]
        ];
        bx = s * 0.5;
        by = s * 0.55;
        br = s * 0.2;
        break;
      }
      if (tem("nau")) {
        const b = q % 2;
        for (let y = Math.round(s * 0.56); y < s * 0.82; y++) {
          const t = (y - s * 0.56) / (s * 0.26),
            w = s * 0.46 * (1 - t * 0.5);
          for (let x = Math.round(s * 0.5 - w); x <= s * 0.5 + w; x++) px(x, y + b, y % 3 === 0 ? tom(base, 0.7) : base);
        }
        linha(s * 0.48, s * 0.1, s * 0.48, s * 0.58, "#3a2a20");
        for (let y = Math.round(s * 0.16); y < s * 0.5; y++)
          ret(s * 0.3, y, s * 0.36, 1, y % 4 === 0 ? "rgba(220,230,220,.5)" : "rgba(200,220,210,.75)");
        for (let i = 0; i < 3; i++) px(s * 0.3 + i * s * 0.2, s * 0.66 + b, "#1a1416");
        hx = s * 0.5;
        hy = s * 0.3;
        hr = s * 0.2;
        bx = s * 0.5;
        by = s * 0.66;
        br = s * 0.4;
        break;
      }
      if (tem("casa")) {
        if (tem("pes_galinha")) {
          linha(s * 0.38, s * 0.7, s * 0.34 + sw * 2 * u, s - 1, "#e0b040", 1);
          linha(s * 0.62, s * 0.7, s * 0.66 - sw * 2 * u, s - 1, "#e0b040", 1);
        }
        ret(s * 0.22, s * 0.38, s * 0.56, s * 0.34, "#8a5a30");
        for (let y = Math.round(s * 0.38); y < s * 0.72; y += 2) ret(s * 0.22, y, s * 0.56, 1, "#6a4020");
        for (let y = 0; y < s * 0.2; y++) ret(s * 0.5 - y * 1.6, s * 0.18 + y, y * 3.2, 1, y % 2 ? "#4a6a3a" : "#3a5a2a");
        hx = s * 0.5;
        hy = s * 0.5;
        hr = s * 0.1;
        olhos = [
          [s * 0.36, s * 0.5],
          [s * 0.62, s * 0.5]
        ];
        boca = [s * 0.5, s * 0.64];
        bx = s * 0.5;
        by = s * 0.55;
        br = s * 0.28;
        break;
      }
      if (tem("sarcofago")) {
        const hop = 0;
        for (let y = Math.round(s * 0.08); y < s; y++) {
          const t = (y - s * 0.08) / (s * 0.92),
            w = s * (t < 0.2 ? 0.14 + t * 0.6 : 0.26 - 0.06 * t);
          for (let x = Math.round(s * 0.5 - w); x <= s * 0.5 + w; x++)
            px(x, y + hop, y % 5 === 0 ? "#2a5a8a" : sombreado((x - s * 0.5) / w, 0, "#d6ab4f"));
        }
        elipse(s * 0.5, s * 0.2, s * 0.11, s * 0.1, "#e8c070");
        hx = s * 0.5;
        hy = s * 0.2;
        hr = s * 0.1;
        olhos = [
          [hx - hr * 0.4, hy],
          [hx + hr * 0.5, hy]
        ];
        boca = [hx, hy + hr * 0.7];
        bx = s * 0.5;
        by = s * 0.55;
        br = s * 0.24;
        break;
      }
      ret(s * 0.24, s * 0.36, s * 0.52, s * 0.6, base);
      hx = s * 0.5;
      hy = s * 0.5;
      hr = s * 0.12;
      olhos = [
        [hx - hr, hy],
        [hx + hr, hy]
      ];
      boca = [hx, hy + hr];
      bx = s * 0.5;
      by = s * 0.6;
      br = s * 0.26;
    }
  }
  // ---------------------------------------------------------------- detalhes
  const ouro = "#e0b040",
    metal = "#a8a8b8",
    bronze = "#b07a3a";
  for (const d of det) {
    switch (d) {
      case "bandagens":
        for (let y = Math.round(s * 0.2); y < s * 0.9; y += 2)
          for (let x = 0; x < s; x++) {
            const i = (Math.round(y) + oy) * W + x + ox;
            if (buf[i] && buf[i] !== cont) buf[i] = tom(base, 0.82);
          }
        linha(bx - br, by, bx - br - s * 0.18, by + Math.sin(fi) * s * 0.1 + s * 0.06, "#e8dcc0");
        break;
      case "elmo":
        for (let x = Math.round(hx - hr * 1.1); x <= hx + hr * 1.1; x++)
          for (let y = Math.round(hy - hr * 1.05); y <= hy - hr * 0.1; y++) {
            const dx = (x - hx) / (hr * 1.1),
              dy = (y - hy) / hr;
            if (dx * dx + dy * dy <= 1.1) px(x, y, sombreado(dx, dy, bronze));
          }
        linha(hx - hr * 0.4, hy - hr * 1.4, hx + hr * 0.3, hy - hr * 1.6, "#c8473b");
        break;
      case "lanca":
        linha(s * 0.82, s * 0.86, s * 0.82 + (atk ? u * 3 : 0), s * 0.06, "#7a5a30");
        px(s * 0.82 + (atk ? u * 3 : 0), s * 0.04, metal);
        px(s * 0.82 + (atk ? u * 3 : 0), s * 0.02, "#e8e8f0");
        break;
      case "escudo":
        elipse(bx - br * 0.6, by + br * 0.1, s * 0.13, s * 0.15, bronze);
        px(bx - br * 0.6, by + br * 0.1, "#f2d23a");
        break;
      case "chifres":
        linha(hx - hr * 0.5, hy - hr * 0.7, hx - hr * 0.9, hy - hr * 1.8, "#e8e0d0");
        linha(hx + hr * 0.5, hy - hr * 0.7, hx + hr * 0.8, hy - hr * 1.8, "#e8e0d0");
        break;
      case "asas":
        if (def.corpo !== "ave") {
          const up = q % 2 === 0;
          for (let i = 0; i < 4; i++) {
            linha(bx - br * 0.2, by - br * 0.4, bx - br * 1.4 - i, by - br * (up ? 1.8 : 0.4) + i * u, tom(base, 0.7));
            linha(bx + br * 0.2, by - br * 0.4, bx + br * 1.3 + i, by - br * (up ? 1.8 : 0.4) + i * u, tom(base, 0.85));
          }
        }
        break;
      case "cauda": {
        const cx0 = bx - br * 1.1;
        for (let i = 0; i < 6; i++)
          px(cx0 - i * u * 0.8, by + Math.sin(i * 0.8 + fi) * u * 1.5 - i * u * 0.4, i > 3 ? tom(base, 1.3) : tom(base, 0.85));
        break;
      }
      case "juba":
        for (let a = 0; a < 6.28; a += 0.35) {
          const x = hx + Math.cos(a) * hr * 1.25,
            y = hy + Math.sin(a) * hr * 1.2;
          if (x < hx + hr * 0.5) px(x, y, "#a8682a");
        }
        break;
      case "mascara":
        elipse(hx + hr * 0.2, hy, hr * 0.8, hr * 0.75, "#9fe0c0", true);
        olhos = olhos.map(([x, y]) => [x, y]);
        break;
      case "chapeu":
        if (det.includes("cajado")) {
          for (let i = 0; i < hr * 2.4; i++) ret(hx - hr * 1.2 + i * 0.5, hy - hr * 0.9 - i * 0.9, Math.max(1, hr * 2.4 - i), 1, "#2a1e3a");
          ret(hx - hr * 1.6, hy - hr * 0.9, hr * 3.4, 1, "#2a1e3a");
        } else if (det.includes("talisma")) {
          ret(hx - hr * 1.2, hy - hr * 1.3, hr * 2.4, hr * 0.7, "#1a1a2a");
          px(hx, hy - hr * 1.6, "#c8473b");
        } else {
          ret(hx - hr * 1.5, hy - hr * 0.8, hr * 3, 1, "#3a2a20");
          ret(hx - hr * 0.8, hy - hr * 1.6, hr * 1.6, hr * 0.8, "#3a2a20");
        }
        break;
      case "capuz":
        for (let a = Math.PI * 0.9; a < Math.PI * 2.1; a += 0.12) px(hx + Math.cos(a) * hr * 1.15, hy + Math.sin(a) * hr * 1.15, "#2a1e2e");
        linha(hx - hr, hy, bx - br * 1.2, s * 0.86, "#2a1e2e");
        break;
      case "coroa":
        for (let i = 0; i < 3; i++) {
          px(hx - hr * 0.6 + i * hr * 0.6, hy - hr * 1.2, ouro);
          px(hx - hr * 0.6 + i * hr * 0.6, hy - hr * 1.5, ouro);
        }
        ret(hx - hr * 0.8, hy - hr * 1.05, hr * 1.8, 1, ouro);
        break;
      case "olho_unico":
        olhos = [[hx + hr * 0.3, hy]];
        px(hx + hr * 0.3 - 1, hy, "#ffffff");
        px(hx + hr * 0.3 + 1, hy, "#ffffff");
        px(hx + hr * 0.3, hy - 1, "#ffffff");
        px(hx + hr * 0.3, hy + 1, "#ffffff");
        break;
      case "tentaculos":
        for (let i = 0; i < 5; i++) {
          const x0 = bx - br * 0.8 + i * br * 0.4;
          for (let j = 0; j < s * 0.3; j++)
            px(x0 + Math.sin(j * 0.5 + fi + i) * u, by + br * 0.5 + j, j > s * 0.2 ? tom(base, 1.2) : tom(base, 0.85));
        }
        break;
      case "pincas": {
        const a = atk ? u : 0;
        elipse(hx + hr * 1.6 + a, hy - hr * 0.2, hr * 0.7, hr * 0.5, tom(base, 1.1));
        px(hx + hr * 2.2 + a, hy - hr * 0.6, cont);
        break;
      }
      case "carapaca":
        for (let x = Math.round(bx - br); x < bx + br; x += 2) px(x, by - br * 0.6, tom(base, 1.4));
        break;
      case "barba":
        for (let y = 0; y < hr * 1.4; y++) ret(hx - hr * 0.4 + y * 0.1, hy + hr * 0.5 + y, Math.max(1, hr * 1.2 - y * 0.5), 1, "#d8d8e0");
        break;
      case "cajado":
        linha(s * 0.86, s * 0.96, s * 0.84, s * 0.12, "#6a4a2a");
        px(s * 0.84, s * 0.1, "#9fe0ff");
        px(s * 0.84, s * 0.08, "#ffffff");
        break;
      case "presas":
        if (boca) {
          px(boca[0], boca[1], "#ffffff");
          px(boca[0] - 2, boca[1], "#ffffff");
        }
        break;
      case "chamas":
        for (let i = 0; i < 5; i++) {
          const x = hx - hr + i * hr * 0.5,
            h = 1 + ((i + q) % 3);
          for (let j = 0; j < h; j++) px(x, hy - hr - j, j === h - 1 ? "#ffd34a" : "#e8603c");
        }
        break;
      case "gelo":
        for (let i = 0; i < 4; i++) {
          px(bx - br + i * br * 0.6, by + br, "#e8f8ff");
          px(bx - br + i * br * 0.6, by + br + 1, "#bfe6ff");
        }
        break;
      case "folhas":
        for (let i = 0; i < 5; i++) px(bx - br + (((i * 37) % 10) / 10) * br * 2, by - br + (((i * 53) % 10) / 10) * br * 1.4, "#5aa83c");
        px(hx, hy - hr, "#7ac050");
        break;
      case "crista":
        for (let i = 0; i < 3; i++)
          linha(hx - hr * 0.2 + i, hy - hr * 0.8, hx - hr * 0.6 + i * u, hy - hr * 1.8, i === 1 ? "#e04848" : "#f2d23a");
        break;
      case "orelhas": {
        const L = def.corpo === "quadrupede" ? 1.25 : 1.8;
        linha(hx - hr * 0.2, hy - hr * 0.6, hx - hr * 0.1, hy - hr * L, tom(base, 0.9));
        linha(hx + hr * 0.4, hy - hr * 0.6, hx + hr * 0.6, hy - hr * L, tom(base, 0.8));
        break;
      }
      case "manchas":
        for (let i = 0; i < 6; i++) {
          const x = bx - br + (((i * 41) % 10) / 10) * br * 2,
            y = by - br * 0.5 + (((i * 29) % 10) / 10) * br;
          if (buf[(Math.round(y) + oy) * W + Math.round(x) + ox]) px(x, y, tom(base, 0.45));
        }
        break;
      case "barbatana":
        for (let i = 0; i < 4; i++) linha(bx - i, by - br * 0.6, bx - u * 2, by - br * 0.6 - s * 0.16 + i, tom(base, 0.8));
        break;
      case "lingua":
        if (boca && (q % 2 === 0 || atk)) {
          px(boca[0], boca[1] + 1, "#e04870");
          px(boca[0], boca[1] + 2, "#e04870");
        }
        break;
      case "ferrao":
        for (let i = 0; i < 8; i++) {
          const a = Math.PI * (1 - i / 8);
          px(bx - br * 0.7 + Math.cos(a) * br * 0.9, by - br * 0.3 - Math.sin(a) * br * 1.4, i > 6 ? "#f2d23a" : tom(base, 0.85));
        }
        break;
      case "engrenagem":
        elipse(bx, by, br * 0.4, br * 0.4, metal);
        px(bx, by, cont);
        break;
      case "tapa_olho":
        if (olhos.length) {
          const [x, y] = olhos[olhos.length - 1];
          px(x, y, "#000");
          px(x + 1, y, "#000");
          linha(hx - hr, hy - hr * 0.5, hx + hr, hy - hr * 0.2, "#000");
        }
        break;
      case "gorro":
        for (let i = 0; i < hr * 2; i++) ret(hx - hr + i * 0.6, hy - hr * 0.8 - i * 0.7, Math.max(1, hr * 2 - i), 1, "#d8302a");
        break;
      case "garras":
        px(bx + br * 1.1, by + br * 0.6, "#f4f0e8");
        px(bx + br * 1.2, by + br * 0.4, "#f4f0e8");
        break;
      case "pelo":
        for (let i = 0; i < 10; i++) {
          const x = bx - br + (((i * 37) % 10) / 10) * br * 2,
            y = by - br + (((i * 71) % 10) / 10) * br * 2;
          const ii = (Math.round(y) + oy) * W + Math.round(x) + ox;
          if (buf[ii]) px(x, y, tom(base, 0.78));
        }
        break;
      case "parafusos":
        px(hx - hr * 1.1, hy + hr * 0.8, metal);
        px(hx + hr * 1.1, hy + hr * 0.8, metal);
        linha(hx - hr * 0.6, hy - hr * 0.3, hx + hr * 0.4, hy - hr * 0.5, "#3a2a2a");
        break;
      case "correntes":
        for (let i = 0; i < 7; i++) px(hx - hr + i * hr * 0.35, hy + hr * 1.1 + (i % 2), metal);
        for (let i = 0; i < 5; i++) px(bx - br * 0.5 + i, s - 2 - (i % 2), metal);
        break;
      case "cabecas": {
        const n = def.corpo === "serpente" ? (det.includes("brilho") && s > 26 ? 8 : 3) : 2;
        for (let i = 0; i < n; i++) {
          const a = -0.9 + i * (1.8 / Math.max(1, n - 1)),
            L = s * 0.28,
            x1 = def.corpo === "humanoide" ? (i ? s * 0.72 : s * 0.28) : s * 0.62 + Math.cos(a) * L,
            y1 = def.corpo === "humanoide" ? s * 0.28 : s * 0.5 + Math.sin(a) * L * 0.9;
          linha(
            def.corpo === "humanoide" ? (i ? s * 0.64 : s * 0.36) : s * 0.6,
            def.corpo === "humanoide" ? s * 0.44 : s * 0.6,
            x1,
            y1 + Math.sin(fi + i) * u,
            tom(base, 0.9),
            u > 1.5 ? 2 : 1
          );
          elipse(x1, y1 + Math.sin(fi + i) * u, s * 0.06, s * 0.05, tom(base, 1.15));
          px(x1 + 1, y1 - 1 + Math.sin(fi + i) * u, "#ffd34a");
        }
        break;
      }
      case "runas":
        for (let i = 0; i < 4; i++) px(bx - br * 0.6 + i * br * 0.4, by - br * 0.2 + (i % 2) * br * 0.4, "#7fe0ff");
        break;
      case "abobora_mao":
        elipse(s * 0.84, s * 0.5, s * 0.1, s * 0.09, "#e07a2a");
        px(s * 0.82, s * 0.5, "#ffd34a");
        px(s * 0.86, s * 0.5, "#ffd34a");
        break;
      case "talisma":
        ret(hx + hr * 0.1, hy - hr * 0.6, Math.max(1, hr * 0.5), hr * 1.4, "#f2e070");
        px(hx + hr * 0.2, hy - hr * 0.2, "#c8473b");
        break;
      case "um_pe":
      case "pes_galinha":
      case "brilho":
      case "cogumelo":
      case "guarda_chuva":
      case "lanterna":
      case "bobina":
      case "jarro":
      case "nau":
      case "casa":
      case "sarcofago":
      case "sem_cabeca":
      case "ossos":
        break;
    }
  }
  // olhos: brilhantes para quem tem "brilho"; fechados na piscada; "x" na dor
  const corOlho = det.includes("brilho") ? (def.corpo === "espectro" ? "#bff4ff" : "#ffd34a") : "#1a1418";
  for (const [x, y] of olhos) {
    if (pisc) {
      px(x, y, tom(base, 0.6));
      px(x + 1, y, tom(base, 0.6));
    } else if (dor) {
      px(x, y, "#ffffff");
      px(x + 1, y + 1, "#ffffff");
    } else {
      px(x, y, corOlho);
      if (s >= 14 && !det.includes("brilho")) px(x, y - 1, "#ffffff");
    }
  }
  if (atk && boca && def.corpo !== "objeto") px(boca[0], boca[1], "#3a0a10");
  // contorno escuro de 1 px
  const fim = buf.slice();
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (buf[y * W + x]) continue;
      if (
        (x > 0 && buf[y * W + x - 1]) ||
        (x < W - 1 && buf[y * W + x + 1]) ||
        (y > 0 && buf[(y - 1) * W + x]) ||
        (y < H - 1 && buf[(y + 1) * W + x])
      )
        fim[y * W + x] = cont;
    }
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  for (let i = 0; i < fim.length; i++) {
    if (!fim[i]) continue;
    g.fillStyle = fim[i];
    g.fillRect(i % W, Math.floor(i / W), 1, 1);
  }
  cacheCri.set(k, c);
  return c;
}

// ---------------------------------------------------------------- arte importada (folhas 8x6 de inimigos, 6x4 de mini, 6x5 de chefe, 6x6 de Guardião)
export function arteCriatura(e, pose: string, q: number) {
  const u = UNIV[R.universo];
  if (!u) return null;
  if (e.chefe || e.mini) {
    const tam = Math.round(e.tam * 1.8),
      caminho = e.eraChefe
        ? `arte/reinos/${u.era}/guardiao_${u.era}__anim.png`
        : `arte/reinos/${u.era}/${u.id}__${e.mini ? "mini" : "chefe"}.png`;
    const img = folhaArte(caminho);
    if (!img) return null;
    const rows = e.mini ? 5 : 6;
    let row = 0,
      col = q % 4;
    if (pose === "anda") {
      row = 1;
      col = q % 6;
    } else if (pose === "atk") {
      row = 2 + Math.min(e.golpeIdx || 0, e.eraChefe ? 2 : 1);
      col = Math.min(5, Math.floor((e.tAtk || 0) * 8));
    } else if (pose === "fase") {
      row = 4;
      col = q % 6;
    } else if (pose === "morte") {
      row = rows - 1;
      col = q % 6;
    }
    // recorte inteligente (quadros alinhados pelos pés, sem tremer); o quadro tem o mesmo tamanho de antes (tam)
    const f = fatiarFolha(img, 6, rows),
      L = f.valida && f.linhas[row];
    if (L && L.qs.length) {
      const q = quadroAnim(img, row, Math.min(col, L.qs.length - 1), tam / 1.3, null, rows, 1.3);
      if (q) {
        q.base = q._pe / q.height;
        return q;
      }
    }
    return celulaArte(img, 6, rows, col, row, tam, tam, 0.85);
  }
  if (e.especial || e.tipo > 2 || e.clone) return null;
  const img = folhaU("inimigos");
  if (!img) return null;
  const tam = Math.round(e.tam * 1.55),
    r0 = 2 * e.tipo; // menor que a equipe e menos ampliado (a arte tem 48 px)
  let row = r0,
    col;
  if (pose === "atk") col = 6 + (q % 2);
  else if (pose === "anda") col = Math.hypot(e.vx || 0, e.vy || 0) < 3 ? q % 2 : 2 + (q % 4);
  else if (pose === "pisca") col = q % 2;
  else if (pose === "dor") {
    row = r0 + 1;
    col = 0;
  } else if (pose === "morte") {
    row = r0 + 1;
    col = 1 + Math.min(3, q);
  } else if (pose === "mania") {
    row = r0 + 1;
    col = 5 + (q % 3);
  } else col = q % 2;
  return celulaArte(img, 8, 6, col, row, tam, tam, 0.85);
} // grade simples: o recorte inteligente trazia pedaços de outras poses nestas folhas (ver docs/ARTES_PARA_REFAZER.md)
// ---------------------------------------------------------------- nascimento, passo e animação
export function defInimigo(k: number) {
  const u = UNIV[R.universo];
  return (
    (u.combate && u.combate.inimigos[k]) || {
      nome: "inimigo" + k,
      corpo: "humanoide",
      andar: "caminha",
      golpe: "contato",
      morte: "puff",
      mania: "",
      detalhes: []
    }
  );
}
export function prepararCriatura(e: Inimigo, def, tam: number) {
  e.def = def;
  e.tam = tam;
  e.passo = Math.random() * 4;
  e.fase = Math.random() * 6.28;
  e.cdG = rnd(1, 3);
  e.surgindo = e.chefe || e.mini ? 0 : 0.45;
  e.tMania = rnd(4, 12);
  e.semente = Math.floor(Math.random() * 3) + 1;
  if (def.mania === "finge_estatua") e.estatua = true;
  if (R.universo.startsWith("reino_") && e.tipo === 2) {
    const l = escolha(D.linhas);
    e.eco = l.id;
  }
  e.spr = spriteCriatura(def, tam, e.cor, 0, "anda", e.semente);
}
// dano em % da vida: chefes e mini-chefes contam como no máximo 6 inimigos comuns (senão o próprio fogo os derrete)
export function pctMax(o: Inimigo, p: number) {
  return o.chefe || o.mini ? Math.min(o.max, DIF.hp * dificuldade() * 6) * p : o.max * p;
}
export function fala(e: Inimigo, txt: string, cor: string) {
  J.falas = J.falas || [];
  J.ultFala = J.ultFala || {};
  if (J.t - (J.ultFala[txt] ?? -9) < 8 || J.t - (J.ultFalaG ?? -9) < 2.5 || J.falas.length >= 2) return;
  J.ultFala[txt] = J.t;
  J.ultFalaG = J.t;
  /* menos balões: tela mais limpa */ J.falas.push({ e, txt, cor: cor || "#fff8e6", vida: 1.6 });
}
export const XINGOS = ["Rato de porão!", "Cabeça de bagre!", "Marujo de água doce!", "Arrr! #@%!", "Perna de pau!", "Croc, croc!"];
export const CONSELHOS = [
  "Encoste na bobina!",
  "Fique parado na água!",
  "Raio + água = spa!",
  "Corra até o chefe!",
  "Abrace o barril!",
  "Desligue a esquiva!"
];
export function temPequeninoPerto(e: Inimigo) {
  return ativos().some(s => linhagemDe(s) === "pequeninos" && dist2(s, e) < 55 * 55);
}
// retorna {m: multiplicador da velocidade normal, dx, dy: deslocamento extra}
export const PASSO = { m: 1, dx: 0, dy: 0 };
export function passoCriatura(e: Inimigo, dt: number, P: Ponto) {
  const d = e.def;
  PASSO.m = 1;
  PASSO.dx = 0;
  PASSO.dy = 0;
  if (!d) return PASSO;
  const dist = Math.hypot(P.x - e.x, P.y - e.y);
  if (e.surgindo > 0) {
    e.surgindo -= dt;
    PASSO.m = 0;
    return PASSO;
  }
  if (e.chefe || e.mini) {
    if (e.parado || (e.oculto && !e.mergulho)) PASSO.m = 0;
    if (e.dash) {
      PASSO.m = 0;
      PASSO.dx = e.dash.vx * dt;
      PASSO.dy = e.dash.vy * dt;
    }
    if (e.bebado > 0) {
      PASSO.m = 0.35;
      PASSO.dx = Math.sin(J.t * 5) * 20 * dt;
    }
    if (d.mania === "persegue") PASSO.m *= 1.6;
    if (dist > 110 && !e.parado) PASSO.m *= Math.min(3.2, 1 + (dist - 110) / 40); // longe da luta: o chefe acelera para alcançar
    if (d.mania === "conselho") {
      e.tMania -= dt;
      if (e.tMania <= 0) {
        e.tMania = rnd(5, 8);
        fala(e, escolha(CONSELHOS), "#e8a0ff");
      }
    }
    if (d.mania === "foge_fogo") {
      if (e.medo > 0) {
        e.medo -= dt;
        PASSO.m = -1.2;
      } else if (
        soloEm(Math.floor(e.x / CEL), Math.floor(e.y / CEL)) === "fogo" ||
        (e.status && e.status.el === "fogo" && J.t - e.status.t < 0.3)
      ) {
        e.medo = 1.6;
        fala(e, "Fogos não!", "#ff8a3d");
      }
    }
    return PASSO;
  }
  e.passo += (Math.hypot(e.vx || 0, e.vy || 0) * dt) / 5;
  if (e.caido > 0) {
    e.caido -= dt;
    PASSO.m = 0;
    return PASSO;
  }
  if (e.danca > 0) {
    e.danca -= dt;
    PASSO.m = 0;
    if (Math.random() < dt * 3) particulas(e.x + rnd(-3, 3), e.y - e.tam * 0.6, "#f2e7c9", 1, 20);
    return PASSO;
  }
  if (e.atk > 0) {
    e.atk -= dt;
    PASSO.m = 0;
    if (e.atk <= 0) golpeCriatura(e, P, dist);
    return PASSO;
  }
  if (e.dash) {
    e.dash.t -= dt;
    PASSO.m = 0;
    PASSO.dx = e.dash.vx * dt;
    PASSO.dy = e.dash.vy * dt;
    if (e.dash.t <= 0) e.dash = null;
    return PASSO;
  }
  if (e.pulo) {
    const p = e.pulo;
    p.t += dt;
    const q = Math.min(1, p.t / p.dur);
    e.x = p.x0 + (p.x1 - p.x0) * q;
    e.y = p.y0 + (p.y1 - p.y0) * q;
    e.z = Math.sin(q * Math.PI) * 12;
    PASSO.m = 0;
    if (q >= 1) {
      e.pulo = null;
      e.z = 0;
      particulas(e.x, e.y + 3, "#d8c8a0", 6, 40);
      if (Math.hypot(P.x - e.x, P.y - e.y) < 10) feriJogador(e.dano * 0.8, e.el);
    }
    return PASSO;
  }
  if (e.pavio > 0) {
    e.pavio -= dt;
    PASSO.m = 0.2;
    if (e.pavio <= 0) estourarCriatura(e);
    return PASSO;
  }
  // golpes à distância e de perto
  e.cdG -= dt;
  if (e.cdG <= 0 && !J.fim) {
    const g = d.golpe;
    if (g === "bote" && dist < 34) {
      e.atk = 0.4;
      e.cdG = rnd(2, 2.8);
    } else if (g === "cuspe" && dist > 40 && dist < 120) {
      e.atk = 0.35;
      e.cdG = rnd(2.8, 4.2);
    } else if (g === "salto" && dist > 22 && dist < 75) {
      e.atk = 0.3;
      e.cdG = rnd(3, 4.2);
      e.alvoPulo = { x: P.x, y: P.y };
      perigo({ tipo: "circ", x: P.x, y: P.y, r: 10, t: 0.9, cor: "#ff8a6a" });
    } else if (g === "descarga" && dist < 28) {
      e.atk = 0.45;
      e.cdG = rnd(2.6, 3.4);
      perigo({ tipo: "circ", x: e.x, y: e.y, r: 22, t: 0.45, cor: "#fff3a0" });
    } else if (g === "explode" && dist < 16) {
      e.pavio = 0.7;
      e.cdG = 99;
    }
  }
  // jeito de andar
  e.fase += dt * (d.andar === "salta" ? 5 : 8);
  if (d.andar === "salta") PASSO.m = Math.sin(e.fase) > 0 ? 1.7 : 0.05;
  if (d.andar === "pula") PASSO.m = 0.6 + 0.8 * Math.abs(Math.sin(e.fase * 0.5));
  if (d.andar === "cambaleia") {
    PASSO.dx += Math.sin(e.fase * 0.4) * 6 * dt;
    PASSO.m = 0.85;
  }
  if (d.andar === "lateral") {
    const k = Math.sin(e.fase * 0.25) * 18 * dt;
    PASSO.dx += (-(P.y - e.y) / (dist || 1)) * k;
    PASSO.dy += ((P.x - e.x) / (dist || 1)) * k;
  }
  if (d.andar === "voa") {
    PASSO.dx += Math.sin(e.fase * 0.3) * 10 * dt;
    PASSO.dy += Math.cos(e.fase * 0.27) * 8 * dt;
  }
  if (d.andar === "cava") {
    e.cavando = dist > 30;
    if (e.cavando && Math.random() < dt * 6) particulas(e.x, e.y + 2, "#8a6a48", 1, 20);
  }
  if (e.pressa > 0) {
    e.pressa -= dt;
    PASSO.m *= 1.35;
  }
  // manias
  e.tMania -= dt;
  const mania = d.mania;
  switch (mania) {
    case "danca":
      if (e.tMania <= 0) {
        e.tMania = rnd(8, 16);
        if (Math.random() < 0.55) {
          e.danca = 1.6;
          if (Math.random() < 0.4) fala(e, "♪", "#ffe9a0");
        } else {
          e.caido = 0.9;
          particulas(e.x, e.y + 3, "#d8ccaa", 5, 30);
        }
      }
      break;
    case "tropeca":
      if (e.tMania <= 0) {
        e.tMania = rnd(9, 18);
        e.caido = 1;
        particulas(e.x, e.y + 3, "#a8a090", 5, 30);
      }
      break;
    case "xinga":
      if (e.tMania <= 0) {
        e.tMania = rnd(10, 22);
        if (dist < 120) fala(e, escolha(XINGOS), "#ffe066");
      }
      break;
    case "uiva":
      if (e.tMania <= 0) {
        e.tMania = rnd(9, 15);
        e.danca = 0.8;
        fala(e, "Auuu!", "#cfe0ff");
        for (const o of J.inimigos) if (o !== e && o.tipo === e.tipo && dist2(o, e) < 70 * 70) o.pressa = 3;
      }
      break;
    case "ilusao":
      if (e.tMania <= 0) {
        e.tMania = rnd(4, 8);
        particulas(e.x, e.y, "#c8b0ff", 6, 40);
        const a = Math.random() * 6.28;
        e.x += Math.cos(a) * 18;
        e.y += Math.sin(a) * 18;
        particulas(e.x, e.y, "#c8b0ff", 6, 40);
      }
      break;
    case "foge_fogo":
    case "medo_pequeninos": {
      if (e.medo > 0) {
        e.medo -= dt;
        PASSO.m = -1.3;
      } else if (mania === "medo_pequeninos" && temPequeninoPerto(e)) {
        e.medo = 1.5;
        if (Math.random() < 0.3) fala(e, "!!", "#ffe066");
      } else if (
        mania === "foge_fogo" &&
        (soloEm(Math.floor(e.x / CEL), Math.floor(e.y / CEL)) === "fogo" || (e.status && e.status.el === "fogo" && J.t - e.status.t < 0.5))
      ) {
        e.medo = 2;
        fala(e, "Fogo!", "#ff8a3d");
      }
      break;
    }
    case "folego": {
      if (J.paradoT > 0.8) {
        PASSO.m = 0.2;
        PASSO.dx += Math.sin(e.fase * 0.5) * 14 * dt;
        if (e.tMania <= 0) {
          e.tMania = rnd(3, 6);
          fala(e, "?", "#e8e8ff");
        }
      }
      break;
    }
    case "rouba": {
      if (e.fuga > 0) {
        e.fuga -= dt;
        PASSO.m = -1.5;
        break;
      }
      let g = null,
        bd = 90 * 90;
      for (const x of J.gemas) {
        const dd2 = dist2(x, e);
        if (dd2 < bd) {
          bd = dd2;
          g = x;
        }
      }
      if (g) {
        const dx = g.x - e.x,
          dy = g.y - e.y,
          dd = Math.hypot(dx, dy) || 1;
        PASSO.m = 0;
        PASSO.dx = (dx / dd) * e.v * 1.6 * dt;
        PASSO.dy = (dy / dd) * e.v * 1.6 * dt;
        if (dd < 5) {
          g.pega = true;
          e.roubou = (e.roubou || 0) + g.v;
          fala(e, "Hihihi!", "#ffe9a0");
          e.fuga = 2.5;
        }
      }
      break;
    }
    case "enxame": {
      let cx = 0,
        cy = 0,
        n = 0;
      for (const o of J.inimigos) {
        if (o !== e && o.tipo === e.tipo && Math.abs(o.x - e.x) < 40 && Math.abs(o.y - e.y) < 40) {
          cx += o.x;
          cy += o.y;
          n++;
          if (n > 6) break;
        }
      }
      if (n) {
        PASSO.dx += (cx / n - e.x) * 0.8 * dt;
        PASSO.dy += (cy / n - e.y) * 0.8 * dt;
      }
      break;
    }
    case "canto":
      if (dist < 90 && dist > 14 && !J.fim) {
        P.x += ((e.x - P.x) / dist) * 5 * dt;
        P.y += ((e.y - P.y) / dist) * 5 * dt;
        if (Math.random() < dt * 2) particulas(e.x, e.y - e.tam * 0.6, "#c8b0ff", 1, 15);
      }
      break;
    case "rodopia":
      if (e.tMania <= 0) {
        e.tMania = rnd(6, 10);
        e.giro = 2;
      }
      if (e.giro > 0) {
        e.giro -= dt;
        if (J.cena)
          for (const p of J.cena.lista)
            if (!p.mat.fixo && dist2(p, e) < 18 * 18) {
              const dx = p.x - e.x,
                dy = p.y - e.y,
                dd = Math.hypot(dx, dy) || 1;
              p.vx += ((-dy / dd) * 80 + (dx / dd) * 40) * dt;
              p.vy += ((dx / dd) * 80 + (dy / dd) * 40) * dt;
            }
        if (Math.random() < dt * 12) particulaAr && J.cena && particulaAr("poeira", e.x + rnd(-4, 4), e.y, rnd(0, 6));
      }
      break;
    case "incendeia":
    case "molhado":
    case "eletrifica":
      e.tRastro = (e.tRastro || 0) - dt;
      if (e.tRastro <= 0) {
        e.tRastro = 0.6;
        aplicarElementoNoSolo(e.x, e.y + 2, mania === "incendeia" ? "fogo" : mania === "molhado" ? "agua" : "raio");
      }
      break;
    case "formacao":
      PASSO.dy += (Math.round(e.y / 12) * 12 - e.y) * 3 * dt;
      break;
    case "finge_estatua":
      if (e.estatua) {
        PASSO.m = 0;
        if (dist < 40 || e.hp < e.max) {
          e.estatua = false;
          particulas(e.x, e.y, "#a8a090", 10, 50);
          tremor(1);
        }
      }
      break;
    case "camuflagem": {
      const t = soloEm(Math.floor(e.x / CEL), Math.floor(e.y / CEL));
      e.oculta = (t === "grama" || t === "vinha") && dist > 24;
      break;
    }
    case "pedra_luz": {
      const t = soloEm(Math.floor(e.x / CEL), Math.floor(e.y / CEL));
      if (t === "luz" || (e.status && e.status.el === "luz")) {
        petrificar(e);
      }
      break;
    }
    case "pisca":
      if (e.tMania <= 0) {
        e.tMania = rnd(2, 5);
        e.piscaT = 0.18;
      }
      break;
  }
  if (e.piscaT > 0) e.piscaT -= dt;
  return PASSO;
}
export function golpeCriatura(e: Inimigo, P: Ponto, dist: number) {
  const d = e.def,
    g = d.golpe;
  if (g === "bote") {
    const dx = P.x - e.x,
      dy = P.y - e.y,
      dd = Math.hypot(dx, dy) || 1;
    e.dash = { vx: (dx / dd) * 150, vy: (dy / dd) * 150, t: 0.22 };
  } else if (g === "cuspe") {
    let alvo = P,
      amigo = false;
    if (d.mania === "cospe_aliado" && Math.random() < 0.35) {
      const o = maisProximoInimigo(e, 90);
      if (o) {
        alvo = o;
        amigo = true;
        fala(e, "Ptui!", "#e8e8ff");
      }
    }
    const a = Math.atan2(alvo.y - e.y, alvo.x - e.x);
    bala(e, e.x, e.y - e.tam * 0.3, a, 70, e.dano * 0.45, projCuspe(e), e.el, { contraInimigo: amigo });
  } else if (g === "salto" && e.alvoPulo) {
    e.pulo = { x0: e.x, y0: e.y, x1: e.alvoPulo.x, y1: e.alvoPulo.y, t: 0, dur: 0.6 };
    e.alvoPulo = null;
  } else if (g === "descarga") {
    raio(e.x, e.y, e.x + rnd(-20, 20), e.y + rnd(-20, 20), "#fff3a0");
    anel(e.x, e.y, 22, "#fff3a0", 0.3);
    if (Math.hypot(P.x - e.x, P.y - e.y) < 22) feriJogador(e.dano * 0.7, "raio");
    for (let i = 0; i < 4; i++) {
      const a = i * 1.57;
      aplicarElementoNoSolo(e.x + Math.cos(a) * 12, e.y + Math.sin(a) * 12, "raio");
    }
  }
}
export function maisProximoInimigo(o: Ponto | Selo, alc: number) {
  let best = null,
    bd = alc * alc;
  for (const e of J.inimigos) {
    if (e === o || e.hp <= 0) continue;
    const d = dist2(o, e);
    if (d < bd) {
      bd = d;
      best = e;
    }
  }
  return best;
}
export function projCuspe(e: Inimigo) {
  const d = e.def,
    el = e.el;
  if (d.detalhes.includes("lanterna")) return "chama";
  if (d.corpo === "ave") return "pena";
  if (d.corpo === "golem") return d.detalhes.includes("gelo") || d.detalhes.includes("pelo") ? "gelo" : "pedra";
  if (d.detalhes.includes("chapeu") && d.detalhes.includes("cajado")) return "pocao";
  if (d.detalhes.includes("tapa_olho")) return "bala";
  if (el === "fogo") return "chama";
  if (el === "natureza") return "folha";
  if (el === "raio") return "raio";
  return "gota";
}
export function estourarCriatura(e: Inimigo) {
  const P = J.jogador;
  anel(e.x, e.y, 18, "#c8f07a", 0.4);
  particulas(e.x, e.y, COR[e.el], 14, 90);
  if (J.cena) for (let i = 0; i < 8; i++) particulaAr("esporos", e.x + rnd(-8, 8), e.y + rnd(-8, 8), rnd(0, 6));
  if (Math.hypot(P.x - e.x, P.y - e.y) < 18) feriJogador(e.dano * 1.1, e.el);
  const f = FONTE;
  defFonte("ambiente");
  for (const o of J.inimigos) if (o !== e && o.hp > 0 && dist2(o, e) < 18 * 18) danoSimples(o, pctMax(o, 0.3));
  defFonte(f);
  for (let i = 0; i < 5; i++) {
    const a = i * 1.26;
    mudarSolo(e.x + Math.cos(a) * 8, e.y + Math.sin(a) * 8, "vinha", 8);
  }
  e.hp = 0;
  morrer(e);
}
export function petrificar(e: Inimigo) {
  if (e.hp <= 0) return;
  evento("petrificado");
  texto(e.x, e.y - 12, "Virou pedra!", "#d8d0c0", 13);
  particulas(e.x, e.y, "#a8a090", 14, 60);
  const spr = silhuetaMundo(spriteDe(e, "anda", 0), "#8a8478");
  criarEstatua(e.x, e.y, spr, "rocha");
  e.semCadaver = true;
  e.hp = 0;
  morrer(e);
}
export function spriteDe(e: Inimigo, pose: string, q: number) {
  const arte = arteCriatura(e, pose, q);
  if (arte) return arte;
  return spriteCriatura(e.def, e.tam, e.cor, q, pose, e.semente);
}
// ---------------------------------------------------------------- derrota: cada inimigo cai do seu jeito
export function aoMorrerCriatura(e: Inimigo) {
  const d = e.def;
  if (!d || e.semCadaver) return;
  const C = J.cena;
  if (e.roubou) {
    const n = Math.min(8, Math.ceil(e.roubou));
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.28;
      J.gemas.push({ x: e.x, y: e.y, vx: Math.cos(a) * 50, vy: Math.sin(a) * 50, v: (e.roubou / n) * 1.5, cor: "#9fe0ff" });
    }
    fala(e, "Ai, ai!", "#ffe9a0");
  }
  if (d.mania === "remonta" && !e.remontado && !e.clone) {
    const x = e.x,
      y = e.y,
      k = e.tipo;
    agendar(2.4, () => {
      if (!J || J.fim) return;
      spawnInimigo(k);
      const o = J.inimigos[J.inimigos.length - 1];
      o.x = x;
      o.y = y;
      o.hp = o.max * 0.4;
      o.remontado = true;
      o.surgindo = 0.6;
      particulas(x, y, "#e2dac6", 8, 40);
    });
  }
  if (d.mania === "pururauca" && Math.random() < 0.4) {
    evento("pururauca");
    criarEstatua(e.x, e.y, silhuetaMundo(spriteDe(e, "anda", 0), "#8a8478"), "rocha");
    return;
  }
  if (d.mania === "coco" && J.cena && Math.random() < 0.6) criarProp("fruta", e.x, e.y);
  if (d.morte === "ouro") {
    criarEstatua(e.x, e.y, silhuetaMundo(spriteDe(e, "anda", 0), "#e0b040"), "metal");
    return;
  }
  if (d.mania === "esporos") for (let i = 0; i < 6; i++) J.cena && particulaAr("esporos", e.x + rnd(-6, 6), e.y + rnd(-6, 6), rnd(0, 6));
  J.cadaveres = J.cadaveres || [];
  if (J.cadaveres.length > 60) J.cadaveres.shift();
  const spr = spriteDe(e, "dor", 0),
    dur = e.chefe ? 1.6 : e.mini ? 1 : 0.55;
  const foto = { chefe: e.chefe, mini: e.mini, eraChefe: e.eraChefe, tipo: e.tipo, tam: e.tam, especial: e.especial, clone: e.clone };
  const temArte = !!arteCriatura(foto, "morte", 0);
  J.cadaveres.push({
    x: e.x,
    y: e.y,
    spr,
    estilo: d.morte,
    t: 0,
    max: temArte ? (e.chefe ? 1.4 : e.mini ? 0.9 : 0.5) : dur,
    flip: e.x > J.jogador.x,
    esc: e.esc || 1,
    cor: e.cor,
    el: e.el,
    foto: temArte ? foto : null
  });
  switch (d.morte) {
    case "desmonta":
    case "estilhaca":
      if (C)
        for (let i = 0; i < (e.chefe ? 24 : 7); i++) {
          const a = Math.random() * 6.28,
            v = rnd(30, 80);
          C.destrocos.push({
            x: e.x,
            y: e.y,
            z: rnd(2, 8),
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v,
            vz: rnd(30, 80),
            cor: d.morte === "desmonta" ? "#e2dac6" : Math.random() < 0.5 ? e.cor : tom(e.cor, 0.6),
            tam: Math.random() < 0.4 ? 2 : 1,
            vida: rnd(2, 4)
          });
        }
      break;
    case "puff":
      if (C) for (let i = 0; i < 4; i++) fumaca(e.x + rnd(-3, 3), e.y + rnd(-3, 1), 4, "#d8d0e0");
      break;
    case "penas":
      if (C)
        for (let i = 0; i < 6; i++) {
          const p = particulaAr("folhas", e.x + rnd(-3, 3), e.y, rnd(4, 10));
          p.cor = Math.random() < 0.5 ? e.cor : "#f4f0e8";
        }
      break;
    case "folhas":
      if (C) for (let i = 0; i < 8; i++) particulaAr("folhas", e.x + rnd(-4, 4), e.y, rnd(2, 10));
      break;
    case "derrete":
      mudarSolo(e.x, e.y, e.el === "fogo" ? "fogo" : frio() ? "gelo" : "agua");
      break;
    case "chama":
      mudarSolo(e.x, e.y, "fogo");
      if (C) for (let i = 0; i < 8; i++) brasa(e.x + rnd(-3, 3), e.y, rnd(0, 6));
      break;
    case "estoura":
      anel(e.x, e.y, 10, "#bfe6ff", 0.3);
      if (C) for (let i = 0; i < 4; i++) C.ondas.push({ x: e.x + rnd(-3, 3), y: e.y + rnd(-2, 2), r: 1, vida: 0.8 });
      break;
    case "sapo":
      J.sapos = J.sapos || [];
      J.sapos.push({ x: e.x, y: e.y, vida: 3, f: Math.random() * 6 });
      if (C) fumaca(e.x, e.y, 5, "#a8e0a0");
      break;
    case "desmancha":
      if (C)
        for (let i = 0; i < 10; i++) {
          const p = particulaAr("poeira", e.x + rnd(-4, 4), e.y + rnd(-2, 2), rnd(0, 8));
          p.cor = Math.random() < 0.5 ? "#d8c8a0" : tom(e.cor, 0.8);
        }
      break;
  }
}
export function criarEstatua(x: number, y: number, spr: HTMLCanvasElement, material: string) {
  if (!J.cena) return;
  const p = criarProp(material === "metal" ? "metal" : "rocha", x, y);
  if (!p) return;
  p.spriteFixo = spr;
  if (material === "metal") p.ouro = true;
  return p;
}
export function atualizarCriaturas(dt: number) {
  if (J.cadaveres) {
    for (const c of J.cadaveres) c.t += dt;
    J.cadaveres = J.cadaveres.filter(c => c.t < c.max);
  }
  if (J.falas) {
    for (const f of J.falas) f.vida -= dt;
    J.falas = J.falas.filter(f => f.vida > 0);
  }
  if (J.sapos) {
    for (const s of J.sapos) {
      s.vida -= dt;
      s.f += dt;
      const h = Math.sin(s.f * 6);
      if (h > 0) {
        s.x += Math.cos(s.f) * 18 * dt;
        s.y += Math.sin(s.f * 0.7) * 10 * dt;
      }
    }
    J.sapos = J.sapos.filter(s => s.vida > 0);
  }
  const vj = Math.hypot(J.pvx, J.pvy);
  J.paradoT = vj < 5 ? (J.paradoT || 0) + dt : 0;
  // personagem especial do universo (ex.: o Saci selvagem que rouba cristais na Amazônia)
  const u = UNIV[R.universo],
    esp = u.combate && u.combate.especial;
  if (esp && !J.fim) {
    J.tEsp = (J.tEsp ?? esp.intervalo * 0.5) - dt;
    if (J.tEsp <= 0) {
      J.tEsp = esp.intervalo * rnd(0.8, 1.2);
      spawnInimigo(0);
      const e = J.inimigos[J.inimigos.length - 1];
      e.especial = true;
      e.def = Object.assign({}, esp);
      e.tam = 13;
      e.cor = "#6a3a2a";
      e.v = 55;
      e.hp = e.max = DIF.hp * 0.8 * dificuldade();
      e.spr = spriteCriatura(e.def, 13, e.cor, 0, "anda", 1);
      e.surgindo = 0;
      const a = Math.random() * 6.28;
      e.x = J.jogador.x + Math.cos(a) * 90;
      e.y = J.jogador.y + Math.sin(a) * 90;
      fala(e, "Hihihi!", "#ffe9a0");
      if (J.cena) J.cena.vort.push({ x: e.x, y: e.y, r: 6, vmax: 90, vida: 3, fogo: false, f: 0, segue: e });
    }
  }
  if (J.cena)
    for (const w of J.cena.vort)
      if (w.segue) {
        if (w.segue.hp > 0) {
          w.x = w.segue.x;
          w.y = w.segue.y + 2;
        } else w.vida = Math.min(w.vida, 0.3);
      }
}
// ---------------------------------------------------------------- desenho
export function poseDe(e: Inimigo) {
  if (e.ia && e.ia.trocaFase > 0) return "fase";
  if (e.caido > 0 || (e.flash > 0 && J.t - (e.dorT ?? -9) < 0.15)) return "dor";
  /* pose de dor no máximo a cada 0,6 s: com golpes seguidos o inimigo ficava sempre agachado */ if (
    e.atk > 0 ||
    e.pavio > 0 ||
    (e.ia && e.ia.anuncio > 0)
  )
    return "atk";
  if (e.danca > 0) return "mania";
  if (e.piscaT > 0) return "pisca";
  return "anda";
}
export function desenharInimigo(e: Inimigo, ox: number, oy: number, P: Ponto) {
  const x = e.x - ox,
    y = e.y - oy;
  if (x < -40 || y < -50 || x > VW + 40 || y > VH + 40) return;
  const d = e.def;
  if (!d) {
    return false;
  }
  if (e.oculto && !e.mergulho) {
    if (e.revoada) return;
    lg.globalAlpha = 0.15;
  }
  const pose = poseDe(e),
    q = Math.floor(e.passo || 0) % 4,
    voa = d.andar === "voa",
    flut = d.andar === "flutua";
  let spr = e.eco && !e.chefe ? spriteLinha(e.eco, "comum") : spriteDe(e, pose, pose === "mania" ? Math.floor(J.t * 6) % 4 : q);
  if (e.estatua) spr = silhuetaMundo(spr, "#8a8478");
  const w = Math.round(spr.width * (e.esc || 1) * (e.eco ? 0.9 : 1)),
    h = Math.round(spr.height * (e.esc || 1) * (e.eco ? 0.9 : 1));
  let z = e.z || 0,
    sx = 1,
    sy = 1,
    dx = 0;
  if (voa) z += 7 + Math.sin(J.t * 5 + e.fase) * 1.5;
  if (flut) z += 3 + Math.sin(J.t * 2 + e.fase) * 2;
  if (d.andar === "pula" || (d.andar === "salta" && !e.chefe)) z += Math.max(0, Math.sin(e.fase)) * (d.andar === "salta" ? 6 : 3);
  if (d.andar === "corre" && pose === "anda") {
    sx = 1.06;
    sy = 0.95;
  }
  if (d.andar === "rasteja") {
    sx = 1 + Math.sin(e.fase) * 0.07;
    sy = 1 - Math.sin(e.fase) * 0.06;
  }
  if (d.andar === "cambaleia") dx = Math.round(Math.sin(e.fase * 0.4) * 1);
  if ((d.andar === "caminha" || d.andar === "marcha") && pose === "anda") {
    const pa = Math.abs(Math.sin((e.fase || 0) * 1.2));
    z += pa * 0.8;
    sy *= 1 - 0.04 * (1 - pa);
    sx *= 1 + 0.03 * (1 - pa);
  } // passada: sobe e desce no ritmo dos pés
  if (pose === "pisca" || (pose === "anda" && Math.hypot(e.vx || 0, e.vy || 0) < 3)) {
    const b = Math.sin(J.t * 2.4 + (e.fase || 0));
    sy *= 1 + 0.025 * b;
  } // parado: respira
  if (pose === "atk" && !e.chefe) dx += Math.sin(J.t * 30 + e.fase) * 0.5; // tremor leve e contínuo (antes sorteava a cada quadro e o bicho 'pulava')
  if (e.chefe || e.mini) z += Math.sin(J.t * 2.2) * 1.2;
  if (e.giro > 0) sx = Math.cos(J.t * 18);
  const sombraW = Math.max(4, w * 0.55 * (voa ? 0.7 : 1)),
    rim = contornoLeitura(spr);
  sombraContato(x, y + h * 0.32, sombraW * 1.1, rim ? 0.55 : 0.45);
  // nascendo: sobe do chão (ou desce do céu, se voa)
  let clip = 1;
  if (e.surgindo > 0) {
    clip = 1 - e.surgindo / 0.45;
    if (voa) z += e.surgindo * 60;
    else if (Math.random() < 0.3) particulas(e.x, e.y + 3, "#a89878", 1, 25);
  }
  if (e.cavando) {
    lg.fillStyle = "#6a5038";
    lg.beginPath();
    lg.ellipse(x, y + 3, 5, 2.5, 0, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = "#1a1418";
    lg.fillRect(Math.round(x) + 1, Math.round(y) + 1, 1, 1);
    lg.globalAlpha = 1;
    return true;
  }
  if (e.oculta) lg.globalAlpha = 0.3;
  if ((flut && d.corpo === "espectro") || e.eco) lg.globalAlpha = Math.min(lg.globalAlpha, 0.82);
  if (e.clone) lg.globalAlpha = Math.min(lg.globalAlpha, 0.6 + 0.2 * Math.sin(J.t * 9));
  if (e.congela > 0) lg.globalAlpha *= 0.75;
  const virar = e.x > P.x ? true : false,
    img = e.flash > 0 ? branco(spr) : spr;
  if (z < 2 && !e.oculta && clip >= 1)
    sombraProjetada(spr, x + dx, y + h * 0.35 + h * (1 - (spr.base || 1)), w, h, virar, e.chefe || e.mini ? 1 : 0.85);
  if (e.rx || e.ry) {
    dx += e.rx;
    z -= e.ry * 0.6;
    e.rx *= 0.78;
    e.ry *= 0.78;
    if (Math.abs(e.rx) + Math.abs(e.ry) < 0.05) {
      e.rx = 0;
      e.ry = 0;
    }
  } // tranco do golpe
  e._vis = { spr, x: x + dx, y: y - z + h * 0.35 + h * (1 - (spr.base || 1)), w, h, virar, t: J.t }; // para o brilho noturno, desenhado depois da escuridão
  lg.save();
  lg.translate(x + dx, y - z + h * 0.35 + h * (1 - (spr.base || 1)));
  if (e.caido > 0 && !spr._src) lg.rotate(virar ? -1.4 : 1.4);
  /* só o desenho por código deita girando; a arte pintada girada virava uma mancha achatada */ if (pose === "mania")
    lg.scale(Math.floor(J.t * 5) % 2 ? -1 : 1, 1);
  lg.scale((virar ? -1 : 1) * sx, sy);
  if (clip < 1) {
    lg.globalAlpha *= clip;
    lg.translate(0, (1 - clip) * 3);
  }
  if (rim && e.flash <= 0) {
    const a0 = lg.globalAlpha;
    lg.globalAlpha = a0 * 0.6;
    lg.drawImage(silhueta(spr, rim), -w / 2 - 1, -h - 1, w + 2, h + 2);
    lg.globalAlpha = a0;
  } // contorno de leitura
  // levou golpe: brilho branco por cima do corpo (mais leve em chefe, que apanha o tempo todo)
  desenharSprite(spr, -w / 2, -h, w, h);
  // quadro intermediário: no andar, mistura com o próximo passo pela fração do ciclo (animação mais fluida com os mesmos quadros)
  if (QUAL > 0 && !SIM.ativo && !MULTIDAO && pose === "anda" && spr._src && !e.eco && !e.estatua) {
    const f = (e.passo || 0) % 1;
    if (f > 0.15) {
      const nx = spriteDe(e, pose, (q + 1) % 4);
      if (nx && nx !== spr) {
        const a0 = lg.globalAlpha;
        lg.globalAlpha = a0 * f * 0.7;
        desenharSprite(nx, -w / 2, -h, w, h);
        lg.globalAlpha = a0;
      }
    }
  }
  if (!e.chefe && !e.mini && !e.elite && QUAL > 0 && !SIM.ativo && !MULTIDAO) {
    const a0 = lg.globalAlpha;
    lg.globalAlpha = a0 * 0.16;
    lg.drawImage(silhueta(spr, "#140c1c"), -w / 2, -h, w, h);
    lg.globalAlpha = a0;
  }
  if (img !== spr) {
    const a0 = lg.globalAlpha;
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = a0 * (e.chefe || e.mini ? 0.4 : 0.75) * Math.min(1, e.flash / 0.05);
    lg.drawImage(img, -w / 2, -h, w, h);
    lg.globalAlpha = a0;
    lg.globalCompositeOperation = "source-over";
  }
  if (e.virouElite > 0) {
    lg.globalAlpha = Math.min(1, e.virouElite * 2) * 0.7;
    lg.globalCompositeOperation = "lighter";
    lg.drawImage(silhueta(spr, "#ffd34a"), -w / 2, -h, w, h);
    lg.globalCompositeOperation = "source-over";
    lg.globalAlpha = 1;
  }
  if (e.chefe && e.ia && e.ia.fase === 2) {
    lg.globalAlpha = 0.18 + 0.12 * Math.sin(J.t * 6);
    lg.globalCompositeOperation = "lighter";
    lg.drawImage(silhueta(spr, COR[e.el] || "#ff5a4a"), -w / 2, -h, w, h);
    lg.globalCompositeOperation = "source-over";
  }
  lg.restore();
  lg.globalAlpha = 1;
  if (e.bebado > 0 && Math.floor(J.t * 4) % 2) {
    lg.fillStyle = "#ffb0c0";
    lg.fillRect(Math.round(x) - 2, Math.round(y - z - h * 0.7), 1, 1);
    lg.fillRect(Math.round(x) + 2, Math.round(y - z - h * 0.75), 1, 1);
  }
  if (e.pavio > 0 && Math.floor(J.t * 12) % 2) {
    lg.globalAlpha = 0.6;
    lg.drawImage(branco(spr), Math.round(x - w / 2), Math.round(y - z - h * 0.65), w, h);
    lg.globalAlpha = 1;
  }
  if (e.marca > 0) {
    const my = y - z - h * 0.35,
      g = J.t * 2.5;
    lg.strokeStyle = "#c070ff";
    lg.lineWidth = 0.9;
    lg.globalAlpha = 0.9;
    for (let i = 0; i < 4; i++) {
      const t0 = (i * Math.PI) / 2 + g;
      lg.beginPath();
      lg.arc(x, my, 5, t0, t0 + 0.7);
      lg.stroke();
    }
    lg.globalAlpha = 1;
  } // mira do Assassino
  if (e.status) {
    lg.fillStyle = COR[e.status.el];
    lg.fillRect(Math.round(x) - 1, Math.round(y - z - h * 0.65) - 3, 2, 2);
  }
  if ((e.elite || e.mini) && !e.chefe) {
    lg.fillStyle = "#000";
    lg.fillRect(Math.round(x - w / 3), Math.round(y - z - h * 0.7) - 6, Math.round((w * 2) / 3), 2);
    lg.fillStyle = "#e06a5a";
    lg.fillRect(Math.round(x - w / 3), Math.round(y - z - h * 0.7) - 6, Math.round(((w * 2) / 3) * Math.max(0, e.hp / e.max)), 2);
  }
  // detalhes que dependem do quadro: escaravelho rolando a bolinha, faísca da bobina
  if (d.mania === "rola") {
    const bxx = x + (virar ? -1 : 1) * (w * 0.45),
      r = 2;
    lg.fillStyle = "#b8986a";
    lg.beginPath();
    lg.arc(bxx, y + h * 0.25 - z, r, 0, Math.PI * 2);
    lg.fill();
  }
  return true;
}
export function desenharCadaveres(ox: number, oy: number) {
  if (!J.cadaveres) return;
  for (const c of J.cadaveres) {
    const q = c.t / c.max,
      x = c.x - ox,
      y = c.y - oy;
    if (c.foto) {
      const n = c.foto.chefe || c.foto.mini ? 6 : 4,
        s = arteCriatura(c.foto, "morte", Math.min(n - 1, Math.floor(q * n)));
      if (s) {
        const w = s.width * c.esc,
          h = s.height * c.esc;
        lg.save();
        lg.translate(Math.round(x), Math.round(y + h * 0.35 + h * 0.15));
        if (c.flip) lg.scale(-1, 1);
        lg.globalAlpha = q > 0.85 ? (1 - q) / 0.15 : 1;
        lg.drawImage(s, -w / 2, -h, w, h);
        lg.restore();
        lg.globalAlpha = 1;
        continue;
      }
    }
    const w = c.spr.width * c.esc,
      h = c.spr.height * c.esc;
    lg.save();
    lg.translate(Math.round(x), Math.round(y + h * 0.35));
    if (c.flip) lg.scale(-1, 1);
    let a = 1 - q,
      sx = 1,
      sy = 1,
      rot = 0,
      dy = 0;
    switch (c.estilo) {
      case "desmancha":
        sy = 1 - q;
        a = 1;
        break;
      case "derrete":
        sy = Math.max(0.1, 1 - q * 1.4);
        sx = 1 + q * 0.8;
        break;
      case "evapora":
        dy = -q * 12;
        a = 1 - q;
        break;
      case "cai":
        rot = Math.min(1, q * 3) * 1.45;
        a = q < 0.6 ? 1 : (1 - q) * 2.5;
        break;
      case "puff":
      case "estoura":
        sx = sy = 1 + q * 0.6;
        a = 1 - q;
        break;
      case "estilhaca":
      case "desmonta":
        a = q < 0.15 ? 1 : 0;
        break;
      case "chama":
        a = 1 - q;
        sy = 1 - q * 0.5;
        break;
      case "penas":
      case "folhas":
      case "sapo":
        a = 1 - q * 2;
        break;
    }
    lg.rotate(rot);
    lg.globalAlpha = Math.max(0, a);
    lg.translate(0, dy);
    lg.drawImage(
      c.estilo === "chama" ? silhueta(c.spr, "#ff8a3d") : c.estilo === "evapora" ? silhueta(c.spr, "#e8e0ff") : c.spr,
      (-w / 2) * sx,
      -h * sy,
      w * sx,
      h * sy
    );
    lg.restore();
  }
  lg.globalAlpha = 1;
  if (J.sapos)
    for (const s of J.sapos) {
      const h = Math.max(0, Math.sin(s.f * 6)) * 3;
      lg.fillStyle = "#4f9a3c";
      lg.fillRect(Math.round(s.x - ox) - 1, Math.round(s.y - oy - h) - 1, 3, 2);
      lg.fillStyle = "#1a1418";
      lg.fillRect(Math.round(s.x - ox), Math.round(s.y - oy - h) - 2, 1, 1);
    }
}
export function desenharFalas(ox: number, oy: number) {
  if (!J.falas) return;
  ctx.textAlign = "center";
  ctx.font = `600 13px "Nunito", system-ui, sans-serif`;
  for (const f of J.falas) {
    const e = f.e,
      x = (e.x - ox) * S,
      y = (e.y - oy - (e.tam || 10) * 1.1 - (1.6 - f.vida) * 6) * S,
      w = ctx.measureText(f.txt).width + 10;
    ctx.globalAlpha = Math.min(1, f.vida * 2);
    ctx.fillStyle = "rgba(18,14,26,.82)";
    ctx.fillRect(x - w / 2, y - 13, w, 17);
    ctx.beginPath();
    ctx.moveTo(x - 3, y + 4);
    ctx.lineTo(x + 3, y + 4);
    ctx.lineTo(x, y + 8);
    ctx.fill();
    ctx.fillStyle = f.cor;
    ctx.fillText(f.txt, x, y);
  }
  ctx.globalAlpha = 1;
}
