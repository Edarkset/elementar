// Elementar · utilidades, som, save, sprites procedurais, estado da run, sinergias e Santuário
// Mapa dos módulos, do laço principal e de onde mora cada estado: docs/ARQUITETURA.md
import "./00_save.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { catalogoDe, juntarRecuperacao, lerTextoSave, textoSave } from "./00_save.js";
import { anel, DIF, emArea, ferir, MOD, particulas, PRESSAGIOS, texto, tremor } from "./02_combate.js";
import { ASCENSAO, mostrarCartas, ramosElegiveis, registrarDex } from "./03_progressao.js";
import { arteMonstro } from "./05_arte.js";
import { QUAL } from "./06_loop.js";
import { versaoHi } from "./07c_cenario_arte.js";
import { custo, LENDA, passiva } from "./08f_lendas.js";
import { toast } from "./10_desenho.js";
import { menu } from "./11_menu.js";
// ================================================================ utilidades
export const $ = (id: string) => document.getElementById(id);
// Nenhum erro some em silêncio: o que era "catch vazio" passa por aqui. Cada lugar avisa uma vez só (senão um erro que se repete a
// cada quadro enche o console). grave=true é erro de regra do jogo ou de save (aparece como erro e a verificação automática acusa);
// sem grave é um recurso do navegador que faltou e o jogo segue com o plano B (aparece como aviso)
export const RELATADOS = new Set();
export function relatar(onde: string, erro: unknown, grave?: boolean) {
  if (RELATADOS.has(onde)) return;
  RELATADOS.add(onde);
  (grave ? console.error : console.warn)("Elementar · " + onde, erro);
}
export const rnd = (a: number, b: number) => a + Math.random() * (b - a),
  escolha = a => a[Math.floor(Math.random() * a.length)];
export const embaralhar = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const dist2 = (a: Selo | Ponto, b) => {
  const dx = a.x - b.x,
    dy = a.y - b.y;
  return dx * dx + dy * dy;
};
// fronteira entre o conteúdo (js/dados.js, ainda sem esquema) e as formas do jogo: os dados entram como "desconhecido" e saem tipados.
// Na etapa 3 do plano (dados em JSON com esquema) esta conversão vira validação de verdade
export const LINHAS = D.linhas as unknown as Linha[],
  ANCESTRAIS = (D.ancestrais || []) as unknown as Linha[];
export const LINHA: Record<string, Linha> = Object.fromEntries([...LINHAS, ...ANCESTRAIS].map(l => [l.id, l]));
export const UNIV: Record<string, Universo> = Object.fromEntries((D.universos as unknown as Universo[]).map(u => [u.id, u]));
export const REAC: Record<string, Dados["reacoes"][number]> = {};
D.reacoes.forEach(r => {
  REAC[[r.a, r.b].sort().join("|")] = r;
});
export const ELS = Object.keys(D.elementos) as Elemento[],
  COR = Object.fromEntries(ELS.map(k => [k, D.elementos[k].cor])),
  NOME_EL = (k: string) => D.elementos[k].nome;
export const NIV = [1, 4, 9, 15]; // protótipo (jogo final: 1, 5, 12, 20)
export const MULT = D.estagios.map(e => e.mult),
  TAM = [9, 11, 13, 17];
// duração do mapa: os 3 primeiros (que quase ninguém perde) são mais curtos, para chegar logo na parte interessante
export let MAPA_SEG = 150,
  MINI_SEG = 75;
export const MAPAS_POR_ERA = 3;
export const RAR_BONUS = { comum: 1, incomum: 1.04, raro: 1.08, epico: 1.14, lendario: 1.22 },
  RAR_NOME = { comum: "Comum", incomum: "Incomum", raro: "Raro", epico: "Épico", lendario: "Lendário" };
export const eficacia = (atk: string, def: string) =>
  D.vantagem[atk] === def ? D.mult_vantagem.super_efetivo : D.vantagem[def] === atk ? D.mult_vantagem.pouco_efetivo : 1;
export function hexRgb(h: string) {
  h = h.replace("#", "");
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
export const hex = (c: number[]) =>
  "#" +
  c
    .map(v =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
export function tom(h: string, f: number) {
  return hex(hexRgb(h).map(v => (f > 1 ? v + (255 - v) * (f - 1) : v * f)));
}
export function mistura(a: string, b: string, t: number) {
  const x = hexRgb(a),
    y = hexRgb(b);
  return hex(x.map((v, i) => v + (y[i] - v) * t));
}

// ================================================================ som: efeitos sintetizados na hora (sem arquivos de áudio)
// O navegador só libera o som depois do primeiro toque; o volume e o mudo ficam no save (META.som).
export const SOM = { ctx: null, mestre: null, ult: {} as Record<string, number> };
export function somLigar() {
  if (SOM.ctx) {
    if (SOM.ctx.state === "suspended") SOM.ctx.resume();
    return;
  }
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    SOM.ctx = new AC();
    const comp = SOM.ctx.createDynamicsCompressor();
    SOM.mestre = SOM.ctx.createGain();
    SOM.mestre.gain.value = 0.45;
    SOM.mestre.connect(comp);
    comp.connect(SOM.ctx.destination);
  } catch (e) {
    relatar("som: o navegador não deixou criar o áudio", e);
  }
}
addEventListener("pointerdown", somLigar, { passive: true });
addEventListener("keydown", somLigar);
export function somNota(f: number, dur: number, tipo: string, vol: number, atraso?: number, f2?: number) {
  const c = SOM.ctx,
    t = c.currentTime + (atraso || 0),
    o = c.createOscillator(),
    g = c.createGain();
  o.type = tipo || "sine";
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(SOM.mestre);
  o.start(t);
  o.stop(t + dur + 0.02);
}
export function somRuido(dur: number, vol: number, atraso: number, corte: number) {
  const c = SOM.ctx,
    t = c.currentTime + (atraso || 0),
    n = Math.ceil(c.sampleRate * dur),
    buf = c.createBuffer(1, n, c.sampleRate),
    d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = c.createBufferSource(),
    f = c.createBiquadFilter(),
    g = c.createGain();
  f.type = "lowpass";
  f.frequency.value = corte || 2000;
  g.gain.value = vol;
  s.buffer = buf;
  s.connect(f);
  f.connect(g);
  g.connect(SOM.mestre);
  s.start(t);
}
// cada som tem um intervalo mínimo para não virar chiado quando muita coisa acontece junto
export function som(nome: string, x?: number) {
  if (!SOM.ctx || SIM.ativo || (META.som && META.som.mudo)) return;
  const agora = performance.now(),
    min = { acerto: 45, moeda: 35, tic: 30, gema: 28, critico: 70 }[nome] || 0;
  if (agora - (SOM.ult[nome] || 0) < min) return;
  SOM.ult[nome] = agora;
  const v = META.som && META.som.vol != null ? META.som.vol : 1;
  switch (nome) {
    case "moeda":
      somNota(1568, 0.07, "square", 0.05 * v);
      somNota(2093, 0.16, "square", 0.05 * v, 0.06);
      break;
    case "gema": {
      const ESC = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24],
        n = Math.min(ESC.length - 1, x || 0),
        f = 880 * Math.pow(2, ESC[n] / 12);
      somNota(f, 0.07, "sine", 0.045 * v);
      somNota(f * 2, 0.05, "triangle", 0.015 * v, 0.01);
      break;
    } // escala pentatônica: a cadeia de coleta sobe nota a nota
    case "tic":
      somNota(1100, 0.025, "square", 0.035 * v);
      break;
    case "ding":
      somNota(1319, 0.25, "triangle", 0.12 * v);
      somNota(1976, 0.3, "sine", 0.06 * v, 0.02);
      break;
    case "jackpot":
      [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => somNota(f, 0.35, "triangle", 0.11 * v, i * 0.07));
      somNota(2093, 0.8, "sine", 0.08 * v, 0.45);
      somRuido(0.6, 0.05 * v, 0.42, 6000);
      break;
    case "bau":
      somNota(110, 0.25, "sine", 0.25 * v, 0, 70);
      somRuido(0.18, 0.15 * v, 0, 900);
      somNota(330, 0.5, "sawtooth", 0.04 * v, 0.1, 1320);
      break;
    case "abrir":
      somRuido(0.35, 0.18 * v, 0, 4000);
      [784, 988, 1175, 1568].forEach((f, i) => somNota(f, 0.25, "triangle", 0.09 * v, 0.05 + i * 0.05));
      break;
    case "nivel":
      [523, 659, 784, 1047, 1319].forEach((f, i) => somNota(f, 0.26, "triangle", 0.1 * v, i * 0.055));
      somNota(2093, 0.6, "sine", 0.06 * v, 0.3);
      somRuido(0.4, 0.03 * v, 0.25, 7000);
      break;
    case "evolucao":
      [392, 523, 659, 784, 1047].forEach((f, i) => somNota(f, 0.5, "triangle", 0.09 * v, i * 0.09));
      somNota(1568, 1, "sine", 0.06 * v, 0.5);
      break;
    case "acerto":
      somRuido(0.05, 0.05 * v, 0, 1600);
      break;
    case "critico":
      somNota(880, 0.08, "square", 0.06 * v, 0, 1760);
      somRuido(0.06, 0.08 * v, 0, 3000);
      break;
    case "combo":
      [659, 880, 1175].forEach((f, i) => somNota(f, 0.18, "square", 0.06 * v, i * 0.05));
      break;
    case "dano":
      somNota(160, 0.15, "sawtooth", 0.07 * v, 0, 70);
      break;
    case "chefe":
      somNota(73, 1.2, "sawtooth", 0.12 * v, 0, 55);
      somNota(110, 1.2, "sawtooth", 0.08 * v, 0.05, 82);
      break;
  }
}
// ================================================================ save
export const CHAVE = "elementar_proto_v2";
// o save passa pela camada de plataforma (js/plataforma.js): localStorage na web, arquivo no desktop/Steam
export const PLAT = window.Plataforma || {
  lerSave: k => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  gravarSave: (k, t) => {
    try {
      localStorage.setItem(k, t);
    } catch (e) {
      relatar("save: o navegador recusou gravar (modo privado ou sem espaço)", e, true);
    }
  },
  conquista() {}
};
// o save é conferido na leitura (js/jogo/00_save.js): campo estragado volta ao padrão e id que o conteúdo não tem mais sai da lista,
// em vez de travar o menu ou o Pacto. Quando algo é corrigido, o texto original fica guardado à parte, intacto (o primeiro e os dois mais recentes).
export const CHAVE_RECUPERACAO = CHAVE + "_recuperacao";
export function guardarOriginal(texto: string) {
  try {
    PLAT.gravarSave(CHAVE_RECUPERACAO, juntarRecuperacao(PLAT.lerSave(CHAVE_RECUPERACAO), texto, new Date().toISOString()));
  } catch (e) {
    relatar("save: não foi possível guardar o original", e, true);
  }
}
export function lerSave(texto: string | null = PLAT.lerSave(CHAVE)): SaveLido {
  let lido: SaveLido;
  try {
    lido = lerTextoSave(texto, catalogoDe(D));
  } catch (e) {
    relatar("save: falha ao conferir o save", e, true);
    lido = { meta: {}, run: null, avisos: ["falha ao conferir"], ilegivel: true };
  }
  if (lido.avisos.length && texto) {
    relatar("save: corrigido na leitura (o original está guardado em " + CHAVE_RECUPERACAO + ")", lido.avisos);
    guardarOriginal(texto);
  }
  return lido;
}
export function gravar() {
  try {
    PLAT.gravarSave(CHAVE, textoSave(META, RUN_SALVA));
  } catch (e) {
    relatar("save: não foi possível gravar o progresso", e, true);
  }
}
export const salvo = lerSave();
export function liberadosIniciais() {
  const ini = new Set(
    D.linhas.filter(l => D.universos.find(u => u.id === l.universo).era === "berco" || l.universo === "amazonia").map(l => l.id)
  );
  ELS.forEach(el =>
    D.linhas
      .filter(l => l.elemento === el)
      .slice(0, 3)
      .forEach(l => ini.add(l.id))
  );
  return [...ini];
}
export let META: Meta = Object.assign({ essencia: 0, recorde: 0, liberados: liberadosIniciais() }, salvo.meta);
// saves de antes do Bestiário: os filhotes já liberados entram como vistos (sem avisos nem presentes por eles)
if (!META.dex) {
  META.dex = {};
  for (const id of META.liberados) META.dex[id] = { f: 1, r: ["comum"] };
  META.dexMarco = Math.floor(META.liberados.length / 10);
}
export let RUN_SALVA: Run | null = salvo.run;

// ================================================================ sprites procedurais (placeholders da arte final)
export const cacheSpr = new Map();
if (document.fonts && document.fonts.load) {
  for (const f of ['800 20px "Cinzel"', '900 20px "Nunito"', '600 14px "Nunito"']) document.fonts.load(f).catch(() => {});
}
export function semente(s: string) {
  let h = 2166136261;
  for (const c of s) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function gerarSprite(seed: string, n: number, base: string, op: { olhos?: string; rar?: string } = {}) {
  const k = seed + "|" + n + "|" + base + "|" + (op.olhos || "") + "|" + (op.rar || "");
  if (cacheSpr.has(k)) return cacheSpr.get(k);
  const r = semente(seed),
    W = n + 2,
    meio = Math.ceil(n / 2),
    cv = document.createElement("canvas");
  cv.width = W;
  cv.height = W;
  const g = cv.getContext("2d")!;
  let cb = base;
  if (op.rar === "epico") {
    const c = hexRgb(base);
    cb = hex([c[2], c[0], c[1]]);
  }
  if (op.rar === "lendario") cb = "#e8c25a";
  const cores = [tom(cb, 0.72), tom(cb, 1), tom(cb, 1.35)];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < meio; x++) {
      const dx = (x - meio + 0.5) / meio,
        dy = (y - n / 2 + 0.5) / (n / 2),
        d = dx * dx * 0.9 + dy * dy;
      if (r() < 1.15 - d * 1.1) {
        const v = r() < 0.25 ? 0 : y < n * 0.45 ? 2 : 1;
        g.fillStyle = cores[v];
        g.fillRect(x + 1, y + 1, 1, 1);
        g.fillRect(n - x, y + 1, 1, 1);
      }
    }
  const oy = Math.max(1, Math.floor(n * 0.38)),
    ox = Math.max(1, meio - Math.max(1, Math.floor(n / 5)));
  g.fillStyle = op.olhos || "#fff8e0";
  g.fillRect(ox + 1, oy + 1, 1, 1);
  g.fillRect(n - ox, oy + 1, 1, 1);
  const img = g.getImageData(0, 0, W, W).data,
    cheio = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < W && img[(y * W + x) * 4 + 3] > 0;
  const c2 = document.createElement("canvas");
  c2.width = W;
  c2.height = W;
  const g2 = c2.getContext("2d")!;
  g2.fillStyle = "#120e1a";
  for (let y = 0; y < W; y++)
    for (let x = 0; x < W; x++)
      if (!cheio(x, y) && (cheio(x + 1, y) || cheio(x - 1, y) || cheio(x, y + 1) || cheio(x, y - 1))) g2.fillRect(x, y, 1, 1);
  g2.drawImage(cv, 0, 0);
  if (op.rar === "lendario" || op.rar === "epico") {
    g2.fillStyle = "#fffbe6";
    for (let i = 0; i < 3; i++) g2.fillRect(1 + Math.floor(r() * n), 1 + Math.floor(r() * n), 1, 1);
  }
  cacheSpr.set(k, c2);
  return c2;
}
export const cacheBranco = new WeakMap();
// versão de alta resolução (se a arte tiver original) para silhuetas e clarões: senão viram blocos quando ampliados
export function baseHi(spr: HTMLCanvasElement) {
  return (spr && spr._src && typeof Q !== "undefined" && Q > 1 && typeof versaoHi === "function" && versaoHi(spr, Q * 1.25)) || spr;
}
export function branco(spr: HTMLCanvasElement) {
  if (cacheBranco.has(spr)) return cacheBranco.get(spr);
  const b = baseHi(spr),
    c = document.createElement("canvas");
  c.width = b.width;
  c.height = b.height;
  const g = c.getContext("2d")!;
  g.drawImage(b, 0, 0);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, c.width, c.height);
  if (b !== spr) c._suave = true;
  cacheBranco.set(spr, c);
  return c;
}
// ovo em vetor, desenhado em alta resolução (6x) e usado com 10x12 de mundo: casca com volume (degradê e brilho),
// desenho do elemento na casca e acabamento pela raridade (comum: casca creme; raro: prata com faixa; lendário: ouro com runas que brilham)
export const OVO_K = 6;
export function spriteOvo(el: Elemento, rar: string) {
  const k = "ovo|" + el + "|" + rar;
  if (cacheSpr.has(k)) return cacheSpr.get(k);
  const K = OVO_K,
    W = 10 * K,
    H = 12 * K,
    c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!,
    cor = COR[el] || "#ffd34a",
    corC = tom(cor, 1.45),
    corE = tom(cor, 0.6);
  const casca =
    rar === "lendario"
      ? ["#fff4c4", "#f0c860", "#a8741c"]
      : rar === "raro"
        ? ["#ffffff", "#d4dce6", "#8a96a8"]
        : ["#fffaf0", "#ece2cc", "#b8a888"];
  const forma = () => {
    g.beginPath();
    g.moveTo(W / 2, H * 0.04);
    g.bezierCurveTo(W * 0.92, H * 0.06, W * 0.98, H * 0.6, W * 0.86, H * 0.8);
    g.bezierCurveTo(W * 0.74, H * 0.98, W * 0.26, H * 0.98, W * 0.14, H * 0.8);
    g.bezierCurveTo(W * 0.02, H * 0.6, W * 0.08, H * 0.06, W / 2, H * 0.04);
    g.closePath();
  };
  const gr = g.createRadialGradient(W * 0.36, H * 0.3, W * 0.05, W * 0.5, H * 0.55, W * 0.62);
  gr.addColorStop(0, casca[0]);
  gr.addColorStop(0.55, casca[1]);
  gr.addColorStop(1, casca[2]);
  forma();
  g.fillStyle = gr;
  g.fill();
  g.save();
  forma();
  g.clip();
  const corP = rar === "lendario" && (el === "raio" || el === "luz" || el === "fogo") ? tom(cor, 0.55) : cor;
  g.fillStyle = corP;
  g.strokeStyle = corP;
  g.lineCap = "round";
  g.lineJoin = "round";
  const r = semente("ovo" + el);
  g.globalAlpha = 0.9;
  switch (el) {
    case "fogo":
      for (let i = 0; i < 3; i++) {
        const x = W * (0.25 + i * 0.25),
          y = H * 0.62;
        g.beginPath();
        g.moveTo(x, y + H * 0.12);
        g.quadraticCurveTo(x - W * 0.12, y, x, y - H * 0.18);
        g.quadraticCurveTo(x + W * 0.12, y, x, y + H * 0.12);
        g.fill();
      }
      break;
    case "agua":
      g.lineWidth = K * 0.9;
      for (let i = 0; i < 2; i++) {
        const y = H * (0.5 + i * 0.17);
        g.beginPath();
        g.moveTo(0, y);
        for (let x = 0; x <= W; x += W / 8) g.quadraticCurveTo(x + W / 16, y - K * 1.2 * ((x / (W / 8)) % 2 ? -1 : 1), x + W / 8, y);
        g.stroke();
      }
      break;
    case "terra":
      for (let i = 0; i < 5; i++) {
        const x = W * (0.2 + r() * 0.6),
          y = H * (0.35 + r() * 0.5),
          s2 = K * (0.9 + r() * 0.8);
        g.beginPath();
        g.moveTo(x, y - s2);
        g.lineTo(x + s2, y);
        g.lineTo(x, y + s2 * 0.8);
        g.lineTo(x - s2, y);
        g.closePath();
        g.fill();
      }
      break;
    case "ar":
      g.lineWidth = K * 0.7;
      for (let i = 0; i < 3; i++) {
        const y = H * (0.4 + i * 0.15);
        g.beginPath();
        g.moveTo(W * 0.15, y);
        g.bezierCurveTo(W * 0.4, y - K * 2, W * 0.6, y + K * 2, W * 0.85, y - K * 0.6);
        g.stroke();
      }
      break;
    case "raio":
      g.beginPath();
      g.moveTo(W * 0.58, H * 0.22);
      g.lineTo(W * 0.36, H * 0.56);
      g.lineTo(W * 0.52, H * 0.56);
      g.lineTo(W * 0.4, H * 0.86);
      g.lineTo(W * 0.68, H * 0.46);
      g.lineTo(W * 0.52, H * 0.46);
      g.closePath();
      g.fill();
      break;
    case "natureza":
      for (let i = 0; i < 4; i++) {
        const x = W * (0.25 + r() * 0.5),
          y = H * (0.35 + r() * 0.5),
          a = r() * 6.28;
        g.save();
        g.translate(x, y);
        g.rotate(a);
        g.beginPath();
        g.ellipse(0, 0, K * 1.6, K * 0.7, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
      }
      break;
    case "luz":
      g.lineWidth = K * 0.6;
      g.beginPath();
      g.arc(W / 2, H * 0.55, K * 1.6, 0, Math.PI * 2);
      g.fill();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * 6.28;
        g.beginPath();
        g.moveTo(W / 2 + Math.cos(a) * K * 2.4, H * 0.55 + Math.sin(a) * K * 2.4);
        g.lineTo(W / 2 + Math.cos(a) * K * 3.6, H * 0.55 + Math.sin(a) * K * 3.6);
        g.stroke();
      }
      break;
    case "sombra":
      g.beginPath();
      g.arc(W / 2, H * 0.56, K * 2.4, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "destination-out";
      g.beginPath();
      g.arc(W / 2 + K * 1.2, H * 0.5, K * 2, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "source-over";
      break;
    default:
      for (let i = 0; i < 6; i++) {
        g.beginPath();
        g.arc(W * (0.2 + r() * 0.6), H * (0.3 + r() * 0.55), K * (0.5 + r() * 0.6), 0, Math.PI * 2);
        g.fill();
      }
  }
  g.globalAlpha = 1;
  if (rar === "raro") {
    g.fillStyle = corE;
    g.fillRect(0, H * 0.42, W, K * 0.9);
    g.fillStyle = "#ffffff";
    g.globalAlpha = 0.6;
    g.fillRect(0, H * 0.42, W, K * 0.3);
    g.globalAlpha = 1;
  }
  if (rar === "lendario") {
    g.strokeStyle = "#fff8d8";
    g.lineWidth = K * 0.45;
    g.shadowColor = corC;
    g.shadowBlur = K * 2;
    for (let i = 0; i < 3; i++) {
      const x = W * (0.3 + i * 0.2),
        y = H * 0.36;
      g.beginPath();
      g.moveTo(x, y - K);
      g.lineTo(x, y + K);
      g.moveTo(x - K * 0.7, y);
      g.lineTo(x + K * 0.7, y);
      g.stroke();
    }
    g.shadowBlur = 0;
  }
  // sombra própria embaixo e brilho em cima (volume)
  const sb = g.createLinearGradient(0, H * 0.5, 0, H);
  sb.addColorStop(0, "rgba(0,0,0,0)");
  sb.addColorStop(1, "rgba(20,10,20,.38)");
  g.fillStyle = sb;
  g.fillRect(0, 0, W, H);
  g.restore();
  g.save();
  g.globalAlpha = 0.85;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.ellipse(W * 0.34, H * 0.26, W * 0.09, H * 0.1, -0.5, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 0.5;
  g.beginPath();
  g.arc(W * 0.42, H * 0.16, K * 0.5, 0, Math.PI * 2);
  g.fill();
  g.restore();
  forma();
  g.lineWidth = K * 0.55;
  g.strokeStyle = rar === "lendario" ? "#5a3a0a" : "#2a1c28";
  g.stroke();
  c._suave = true;
  c.mundoW = 10;
  c.mundoH = 12;
  cacheSpr.set(k, c);
  return c;
}

// ================================================================ estado
export const cv = $("tela") as HTMLCanvasElement,
  ctx = cv.getContext("2d")!,
  lo = document.createElement("canvas"),
  lg = lo.getContext("2d")!;
export let W = 0,
  H = 0,
  S = 2,
  VW = 0,
  VH = 0,
  Q = 1;
// S = pixels de tela (CSS) por pixel de mundo. Q = pixels reais da tela interna por pixel de mundo:
// o mundo é desenhado na resolução do aparelho (as coordenadas continuam as mesmas), então a arte
// importada sai nítida e o desenho por código continua com cara de pixel art (cada pixel vira um bloco).
// O limite de pixels protege a performance em telas 4K.
// Celular/tablet (toque): tela interna bem menor. Cada passada de tela cheia (piso, chão, luz, tom, vinheta...) custa
// proporcional aos pixels; no iPhone o mundo era desenhado a 860x1867, e o aparelho esquentava. Em tela pequena a diferença quase não aparece.
export const TOQUE = matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
export const PIXELS_MAX = TOQUE ? 1.8e6 : 3.2e6;
// a qualidade automática também reduz a resolução: QUAL 1 = 80%, QUAL 0 = 62%
export const ESC_QUAL = [0.62, 0.8, 1];
export const ZOOM_MUNDO = 170; // pixels de mundo no lado menor da tela (menor = câmera mais perto, arte maior)
export function redimensionar() {
  W = cv.clientWidth;
  H = cv.clientHeight;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(W * dpr);
  cv.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  S = Math.max(2, Math.min(W, H) / ZOOM_MUNDO);
  VW = Math.ceil(W / S);
  VH = Math.ceil(H / S);
  // tela interna na resolução real do aparelho (sem reamostrar a cada quadro); limitada a PIXELS_MAX
  // a tela interna é sempre a resolução da tela dividida por um número inteiro (1, 2, 3...): a ampliação final fica exata.
  // Com um fator quebrado (ex.: 1,46x) cada pixel virava um bloco de tamanho diferente e tudo parecia distorcido.
  {
    const cheio = S * dpr,
      lim = PIXELS_MAX * Math.pow(typeof QUAL === "number" ? ESC_QUAL[QUAL] : 1, 2),
      k = Math.max(1, Math.ceil(Math.sqrt((VW * VH * cheio * cheio) / lim) - 1e-9));
    Q = SIM.ativo ? 1 : Math.max(1, cheio / k);
  }
  lo.width = Math.round(VW * Q);
  lo.height = Math.round(VH * Q);
  lg.setTransform(Q, 0, 0, Q, 0, 0);
}
addEventListener("resize", redimensionar);
// altura real do HUD do topo (muda com a largura da tela e com os chips): o combo e a barra do chefe ficam logo abaixo dele,
// senão no celular deitado o nome do chefe ficava escondido atrás dos chips
export let HUD_BAIXO = 96;
export function medirHud() {
  const h = $("hud");
  if (!h || !h.offsetHeight) return;
  HUD_BAIXO = h.offsetTop + h.offsetHeight;
  $("combo").style.top = HUD_BAIXO + 4 + "px";
}
if (typeof ResizeObserver === "function") new ResizeObserver(medirHud).observe($("hud"));
/** a run em andamento (null no menu) */
export let R: Run = null;
/** o mapa em andamento (null fora do jogo) */
export let J: Mapa = null;
export let rodando = false,
  pausado = false;
// Ganchos para simulação e testes automatizados (não afetam o jogo normal)
// semArte: a simulação não pede nem usa imagens. Vários efeitos escolhem entre "com arte" e "sem arte" e gastam sorteios diferentes em
// cada caso; com a arte chegando em momentos diferentes, a mesma semente dava partidas diferentes. O que existe no mapa (marcos,
// construções) é decidido pela lista de artes, não pela imagem, então os obstáculos são os mesmos do jogo normal
export const SIM: Simulacao = { ativo: false, entrada: null, aoDerrota: null, semEspeciais: false, semArte: false };
export let FONTE: FonteDano = "basico"; // origem do dano corrente (básico, habilidade, especial, combinado, despertar, reação, ambiente)
// monstro que está causando o dano agora (id da linha); null para dano da equipe toda (Lenda, Despertar, combinado) ou do ambiente.
// Projéteis, crias, armadilhas e zonas guardam o autor de quando nasceram. Serve só para o resumo de fim de run ("quem carregou")
export let AUTOR: string | null = null;
export function agendar(seg: number, fn) {
  J.agenda.push({ t: J.t + seg, fn });
}
export function novoSt() {
  return {
    porFonte: {},
    especiais: 0,
    combinados: 0,
    transformacoes: 0,
    dano: 0,
    golpes: 0,
    superEf: 0,
    poucoEf: 0,
    recContato: 0,
    recBala: 0,
    reacoes: {},
    ovos: 0,
    chocados: 0,
    capturas: 0,
    trocas: 0,
    itens: 0,
    despertares: 0,
    evolucoes: [0, 0, 0, 0],
    mapas: [],
    primeiroAbate: null
  };
}
export const filaRamo = [],
  filaEsp = [];

export function novoSelo() {
  return { nivel: 1, pod: { b: 1, h1: 0, h2: 0 }, mod: { h1: null, h2: null }, esp: null, mon: null, trocaCd: 0 };
}
export function novaRun(pacto, inicial) {
  R = {
    pacto,
    selos: [novoSelo(), novoSelo(), novoSelo()],
    reserva: [],
    ninho: [],
    ancestral: { estado: "nenhum" },
    itens: { incenso: 0, chamado: 0, doce: 0, pedra: 0, pena: 0 },
    pedraAtiva: false,
    profundidade: 0,
    eraIdx: 0,
    mapaNaEra: 0,
    universo: "grecia",
    reliquias: [],
    chefesVencidos: 0,
    ciclo: 0,
    abates: 0,
    essenciaRun: 0,
    elos: [],
    vidaFrac: 1
  };
  R.selos[0].mon = { id: inicial, rar: "comum", ramo: null };
  R.st = novoSt();
  if (typeof registrarDex === "function") registrarDex(inicial, 0, null, "comum");
  for (let i = 0; i < nivelLoja("heranca"); i++) {
    R.selos[0].nivel++;
    R.selos[0].pod.b = Math.min(5, R.selos[0].pod.b + 1);
  } // Herança do Santuário
  R.reviverMeta = nivelLoja("chance");
  R.recordeAntes = META.recorde;
}
export const ativos = () => R.selos.filter(s => s.mon);
export const L = (s: Selo) => LINHA[s.mon.id];
export function ramoAtual(s: Selo) {
  return s.mon.ramo ?? (J && J.desp > 0 ? s.tmpRamo : null);
}
export function estBase(s: Selo) {
  let e = 0;
  if (s.nivel >= NIV[1]) e = 1;
  if (s.nivel >= NIV[2] && s.mon.ramo != null) e = 2;
  if (e === 2 && s.nivel >= NIV[3] && R.chefesVencidos > 0) e = 3;
  return e;
}
export function est(s: Selo) {
  const b = estBase(s);
  if (J && J.desp > 0) {
    const e = Math.min(3, b + 1);
    if (e >= 2 && s.mon.ramo == null && s.tmpRamo == null) {
      s.tmpRamo = 0;
      s.tmpRamo = ramosElegiveis(s, true, true)[0] ?? 0;
    }
    return e;
  }
  return b;
}
// elemento sem considerar formas temporárias do Despertar (evita recursão entre Selos)
export function elementoBase(o: Selo) {
  return o.mon.ramo != null && estBase(o) >= 2 ? L(o).ramos[o.mon.ramo].elemento : L(o).elemento;
}
export function ramoObj(s: Selo) {
  const r = ramoAtual(s);
  return est(s) >= 2 && r != null ? L(s).ramos[r] : null;
}
export function elementoDe(s: Selo): Elemento {
  const r = ramoObj(s);
  return r ? r.elemento : L(s).elemento;
}
export function linhagemDe(s: Selo) {
  const r = ramoObj(s);
  return r ? r.linhagem : L(s).linhagem;
}
export function classeExtraDe(s: Selo) {
  const r = ramoObj(s);
  return r ? r.classe_extra : null;
}
export function nomeForma(s: Selo) {
  const e = est(s),
    l = L(s);
  if (e === 0) return l.filhote;
  if (e === 1) return l.jovem;
  const r = ramoObj(s);
  return e === 2 ? r.nome : r.supremo;
}
export function spriteSelo(s: Selo) {
  const e = est(s);
  const arte = arteMonstro(s.mon.id, e, ramoAtual(s), s.mon.rar);
  if (arte) return arte;
  return gerarSprite(s.mon.id + "#" + e + "#" + (ramoAtual(s) ?? "-"), TAM[e], COR[elementoDe(s)], { rar: s.mon.rar });
}
export function spriteLinha(id: string, rar: string) {
  const arte = arteMonstro(id, 0, null, rar);
  if (arte) return arte;
  return gerarSprite(id + "#0#-", TAM[0], COR[LINHA[id].elemento], { rar });
}
export function poolPacto() {
  const p = META.liberados.filter(id => R.pacto.includes(LINHA[id].elemento));
  return p.length ? p : LINHAS.filter(l => R.pacto.includes(l.elemento)).map(l => l.id);
}

// ================================================================ sinergias e atributos
export let SIN: Sinergia = { dano: 1, vida: 1, cad: 1, reac: 1, chips: [], rm: {} };
// ================================================================ Santuário: melhorias permanentes compradas com a Essência das runs
export const LOJA = [
  { id: "forca", nome: "Força Ancestral", max: 5, base: 40, val: 0.06, txt: "+6% de dano da equipe" },
  { id: "vigor", nome: "Vigor", max: 5, base: 40, val: 0.08, txt: "+8% de vida da equipe" },
  { id: "pronto", nome: "Prontidão", max: 5, base: 55, val: 0.04, txt: "+4% de cadência de ataque" },
  { id: "sabedoria", nome: "Sabedoria", max: 5, base: 45, val: 0.07, txt: "+7% de XP" },
  { id: "ima", nome: "Ímã de Cristal", max: 3, base: 30, val: 0.25, txt: "+25% de alcance para puxar cristais" },
  { id: "agil", nome: "Passos Leves", max: 3, base: 35, val: 0.05, txt: "+5% de velocidade do Invocador" },
  { id: "ganancia", nome: "Ganância", max: 5, base: 50, val: 0.12, txt: "+12% de Essência ao fim da run" },
  { id: "heranca", nome: "Herança", max: 3, base: 80, val: 1, txt: "o monstro inicial começa 1 nível acima (no 3, já começa Jovem)" },
  { id: "oraculo", nome: "Visão do Oráculo", max: 1, base: 260, val: 1, txt: "+1 portal para escolher ao fim de cada mapa" },
  { id: "chance", nome: "Segunda Chance", max: 1, base: 420, val: 1, txt: "uma vez por run, a equipe se levanta com metade da vida" }
];
export const nivelLoja = (id: string) => (META.loja && META.loja[id]) || 0;
export function bonusLoja(id: string) {
  const it = LOJA.find(x => x.id === id);
  return 1 + (it ? it.val * nivelLoja(id) : 0);
}
export const precoLoja = it => Math.round(it.base * Math.pow(1.85, nivelLoja(it.id)));
export function lojaAcessivel() {
  return LOJA.filter(it => nivelLoja(it.id) < it.max && precoLoja(it) <= META.essencia);
}
export function pipsLoja(n: number, max: number, pode: boolean) {
  let h = "<span class='pips'>";
  for (let i = 1; i <= max; i++) h += `<i class='${i <= n ? "tem" : i === n + 1 && pode ? "novo" : ""}'></i>`;
  return h + "</span>";
}
export function telaSantuario() {
  $("telaMenu").classList.remove("ativa");
  META.loja = META.loja || {};
  mostrarCartas(
    "Santuário",
    `Essência: <b>${META.essencia}</b>. Melhorias permanentes: valem para todas as próximas runs.`,
    LOJA.map(it => {
      const n = nivelLoja(it.id),
        cheio = n >= it.max,
        p = precoLoja(it),
        pode = !cheio && p <= META.essencia;
      return {
        titulo: it.nome,
        raridade: cheio ? "lendario" : pode ? "raro" : "comum",
        desab: !pode,
        manter: true,
        classe: pode ? "pode" : null,
        texto: `${pipsLoja(n, it.max, pode)}${it.txt}${it.max > 1 ? " por nível" : ""}.<br>${cheio ? "Completo." : `Custa ${p} de Essência${pode ? "" : ` (faltam ${p - META.essencia})`}.`}`,
        acao: () => {
          if (!pode) return;
          META.essencia -= p;
          META.loja[it.id] = n + 1;
          gravar();
          toast(`${it.nome} ${n + 1}/${it.max}`);
          telaSantuario();
        }
      };
    }),
    { fundo: "ui__refugio" }
  );
  const v = document.createElement("button");
  v.className = "botao sec";
  v.textContent = "Voltar";
  v.onclick = () => menu();
  $("cartasRodape").appendChild(v);
}
// Relíquias com efeito em atributo ficam aqui; as de gatilho (Hidromel, Para-raios, Concha...) estão em atualizarReliquias e relDano
export const REL_GATILHO = new Set([
  "Tabuletas do Destino",
  "Taça de Jamshid",
  "Hidromel do Salão dos Heróis",
  "Espada na Pedra",
  "Ovo de Koschei",
  "Bola de Borracha Sagrada",
  "Anzol Mágico",
  "Concha das Marés",
  "Estaca de Freixo",
  "Para-raios",
  "Espelho Mágico",
  "Bússola Enlouquecida"
]);
export const temRel = (n: string) => !!(R && R.reliquias && R.reliquias.includes(n));
export function relMods() {
  const m = {
    dano: bonusLoja("forca"),
    vida: bonusLoja("vigor"),
    cad: bonusLoja("pronto"),
    xp: bonusLoja("sabedoria"),
    vel: bonusLoja("agil"),
    ima: bonusLoja("ima"),
    reac: 1,
    regen: 0,
    reviver: 0,
    nucleo: [],
    curaTroca: false,
    danoRec: 1,
    ess: 1,
    recarga: 1,
    talisma: 0,
    portais: 0
  };
  for (const n of R.reliquias) {
    if (n === "Ankh") m.reviver++;
    else if (n.startsWith("Pêssego")) m.vida *= 1.2;
    else if (n === "Quipu") m.xp *= 1.2;
    else if (n === "Tapete Voador") m.vel *= 1.2;
    else if (n === "Pedra do Sol") m.recarga *= 0.85;
    else if (n === "Fio de Ariadne") m.ima *= 1.8;
    else if (n === "Máscara de Oni") {
      m.dano *= 1.25;
      m.danoRec *= 1.1;
    } else if (n === "Cristal de Oricalco") m.reac *= 1.2;
    else if (n === "Flor do Vale") m.regen += 0.005;
    else if (n.startsWith("Caldeirão")) m.curaTroca = true;
    else if (n === "Muiraquitã") m.talisma += 0.3;
    else if (n === "Astrolábio") m.portais++;
    else if (n === "Mapa do Tesouro") m.ess *= 1.4;
    else if (n === "Ídolo Dourado") {
      m.ess *= 1.6;
      m.danoRec *= 1.15;
    } else if (n.startsWith("Núcleo")) {
      const el = ELS.find(k => n.includes(NOME_EL(k)));
      if (el) m.nucleo.push(el);
    } else if (!REL_GATILHO.has(n)) m.dano *= 1.1;
  }
  return m;
}
// multiplicador de dano das relíquias de gatilho, aplicado em cada golpe
export function relDano(e: Inimigo) {
  if (!R.reliquias.length) return 1;
  let k = 1;
  if (J.hidro && J.hidro.length) {
    while (J.hidro.length && J.hidro[0] < J.t) J.hidro.shift();
    k *= 1 + 0.01 * J.hidro.length;
  }
  if (temRel("Espada na Pedra") && J.vida < J.vidaMax * 0.5) k *= 1.3;
  if (temRel("Estaca de Freixo") && (e.chefe || e.mini || e.elite)) k *= 1.4;
  return k;
}
export const danoMedioEquipe = () => {
  const a = ativos();
  return a.length ? a.reduce((t, s) => t + atrib(s).dano, 0) / a.length : 1;
};
export function atualizarReliquias(dt: number) {
  if (!R.reliquias.length || J.fim) return;
  const P = J.jogador;
  if (temRel("Anzol Mágico")) {
    J.tAnzol = (J.tAnzol ?? 30) - dt;
    if (J.tAnzol <= 0) {
      J.tAnzol = 30;
      J.gemas.forEach(g => (g.puxar = true));
      anel(P.x, P.y, 40, "#9ad8ff", 0.5);
      texto(P.x, P.y - 16, "Anzol!", "#9ad8ff", 13);
    }
  }
  if (temRel("Concha das Marés")) {
    J.tConcha = (J.tConcha ?? 10) - dt;
    if (J.tConcha <= 0) {
      J.tConcha = 10;
      const f = FONTE;
      FONTE = "reliquia";
      const dm = danoMedioEquipe() * 1.5;
      emArea(P.x, P.y, 75, e => {
        const dx = e.x - P.x,
          dy = e.y - P.y,
          d = Math.hypot(dx, dy) || 1;
        if (!e.chefe) {
          e.x += (dx / d) * 28;
          e.y += (dy / d) * 28;
        }
        ferir(e, dm, "agua");
      });
      FONTE = f;
      anel(P.x, P.y, 40, "#7fc0ff", 0.7);
      anel(P.x, P.y, 75, "#bfe6ff", 0.5);
      particulas(P.x, P.y, "#bfe6ff", 24, 140);
    }
  }
  if (temRel("Para-raios")) {
    J.tRaioRel = (J.tRaioRel ?? 5) - dt;
    if (J.tRaioRel <= 0) {
      J.tRaioRel = 5;
      const vis = J.inimigos.filter(e => e.hp > 0 && !e.oculto && Math.abs(e.x - P.x) < VW / 2 && Math.abs(e.y - P.y) < VH / 2);
      const alvo = vis.find(e => e.chefe || e.mini) || vis[Math.floor(Math.random() * vis.length)];
      if (alvo) {
        const f = FONTE;
        FONTE = "reliquia";
        ferir(alvo, danoMedioEquipe() * 6, "raio");
        FONTE = f;
        J.efeitos.push({
          x: alvo.x + rnd(-8, 8),
          y: alvo.y - 90,
          x2: alvo.x,
          y2: alvo.y,
          linha: true,
          cor: "#fff6b0",
          vida: 0.25,
          max: 0.25
        });
        anel(alvo.x, alvo.y, 14, "#fff6b0", 0.6);
        tremor(2);
      }
    }
  }
  if (temRel("Espelho Mágico")) {
    J.tEsp = (J.tEsp || 0) - dt;
    const dr = J.danoRec || 0;
    if (J.tEsp <= 0 && dr > (J._drEsp || 0) + 0.5) {
      J.tEsp = 1;
      J._drEsp = dr;
      const f = FONTE;
      FONTE = "reliquia";
      const dm = danoMedioEquipe() * 3;
      emArea(P.x, P.y, 32, e => ferir(e, dm, "luz"));
      FONTE = f;
      anel(P.x, P.y, 32, "#e8f4ff", 0.6);
    } else if (J.tEsp <= 0) J._drEsp = dr;
  }
}
// Afinidade da Lenda: cada monstro da equipe com um dos 2 elementos da Lenda reforça a equipe, com retorno decrescente
// (+6%, +11%, +15% de dano; com os 3, +8% de vida), e o poder da Lenda cresce junto (+10% por monstro afim).
// No reino de origem da Lenda (Terra Natal), o poder dela ganha +25%. Valores pequenos de propósito: somam com as
// sinergias de classe, linhagem e elemento sem desequilibrar (conferido com o robô em testes/rodar_bot.js).
export const AFIN_LENDA = { dano: [1, 1.06, 1.11, 1.15], vida: [1, 1, 1, 1.08], poderPorAfim: 0.1, terraNatal: 0.25 };
export function afinidadeLenda(eq: Selo[]) {
  const l = typeof LENDA === "function" && LENDA();
  if (!l) return { dano: 1, vida: 1, poder: 1, n: 0, chip: null };
  const n = Math.min(3, eq.filter(s => l.elementos.includes(elementoDe(s))).length),
    natal = !!(l.universo && R.universo === l.universo);
  const poder = (1 + n * AFIN_LENDA.poderPorAfim) * (natal ? 1 + AFIN_LENDA.terraNatal : 1);
  return {
    dano: AFIN_LENDA.dano[n],
    vida: AFIN_LENDA.vida[n],
    poder,
    n,
    natal,
    chip: n || natal ? `${l.nome.split(",")[0].split(" ")[0]} ${"★".repeat(n)}${natal ? " · Terra Natal" : ""}` : null
  };
}
export function calcularSinergia() {
  const rg = D.regras,
    eq = ativos(),
    chips = [];
  let dano = 1,
    vida = 1,
    reac = 1;
  {
    const pr = R.pressagio && PRESSAGIOS.find(p => p.id === R.pressagio);
    if (pr) chips.push("✦ " + pr.nome);
    if (R.maldicoes && R.maldicoes.length) chips.push("☠ " + R.maldicoes.length);
  }
  const cc: Record<string, number> = {},
    lc: Record<string, number> = {},
    ec: Record<string, number> = {};
  eq.forEach(s => {
    const cl = L(s).classe;
    cc[cl] = (cc[cl] || 0) + 1;
    const ex = classeExtraDe(s);
    if (ex) cc[ex] = (cc[ex] || 0) + 1;
    const li = linhagemDe(s);
    if (li !== "errante") lc[li] = (lc[li] || 0) + 1;
    const el = elementoDe(s);
    ec[el] = (ec[el] || 0) + 1;
  });
  const rm = relMods();
  rm.nucleo.forEach(el => (ec[el] = (ec[el] || 0) + 1));
  for (const [c, n] of Object.entries(cc))
    if (n >= 2) {
      const s = rg.sinergia_classe[c][Math.min(n, 3)];
      dano *= s.dps;
      vida *= s.ehp;
      chips.push(`${D.classes[c].nome} ${Math.min(n, 3)}`);
    }
  for (const [li, n] of Object.entries(lc))
    if (n >= 2) {
      const s = rg.sinergia_linhagem[Math.min(n, 3)];
      dano *= s.dps;
      vida *= s.ehp;
      chips.push(`${D.linhagens[li].nome} ${Math.min(n, 3)}`);
    }
  for (const [el, n] of Object.entries(ec))
    if (n >= 2) {
      const s = rg.sinergia_elemento[Math.min(n, 3)];
      dano *= s.dps;
      vida *= s.ehp;
      chips.push(`${NOME_EL(el)} ${Math.min(n, 3)}`);
    }
  const els = Object.keys(ec);
  let pares = 0;
  for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) if (REAC[[els[i], els[j]].sort().join("|")]) pares++;
  eq.forEach(s => {
    const r = ramoObj(s);
    if (r) reac = Math.max(reac, rg.ramos[r.tipo].reacao);
  });
  reac *= rm.reac;
  if (pares) chips.push(`Reações ${pares}`);
  const pap = new Set();
  eq.forEach(s => {
    pap.add(D.classes[L(s).classe].papel);
    const ex = classeExtraDe(s);
    if (ex) pap.add(D.classes[ex].papel);
  });
  if (pap.has("frente") && pap.has("suporte") && (pap.has("dano_fisico") || pap.has("dano_magico"))) {
    dano *= rg.trindade.dps;
    vida *= rg.trindade.ehp;
    chips.push("Trindade");
  }
  const pb = D.pacto.bonus[R.pacto.length];
  if (pb && pb.dano > 1) {
    dano *= pb.dano;
    chips.push("Aliança Dupla");
  }
  R.elos.forEach(e => chips.push(e));
  const af = afinidadeLenda(eq);
  dano *= af.dano;
  vida *= af.vida;
  if (af.chip) chips.push(af.chip);
  SIN = {
    dano: dano * rm.dano,
    vida: vida * rm.vida,
    cad: rm.cad,
    reac,
    chips,
    rm,
    cacadores: cc.cacador || 0,
    invocadores: cc.invocador || 0,
    lendaPoder: af.poder
  };
  if (J) {
    const antes = J.vidaMax,
      nova = eq.reduce((t, s) => t + atrib(s).vida, 0) * SIN.vida * (1 + passiva("vida") + custo("vida")) * (1 + MOD("vida"));
    J.vidaMax = Math.max(1, nova);
    if (antes > 1) J.vida = Math.min(J.vidaMax, (J.vida * J.vidaMax) / antes);
  }
  $("chips").innerHTML =
    R.pacto.map(el => `<span class="chip el" style="color:${COR[el]}">${NOME_EL(el)}</span>`).join("") +
    chips.map(c => `<span class="chip">${c}</span>`).join("");
}
// ajuste fino por classe, a partir de 40 partidas simuladas: assassino, xamã, caçador e invocador chegavam ~2 mapas
// menos fundo que guerreiro, guardião e místico (ver docs/EQUILIBRIO_SIMULACOES.md)
export const AJUSTE_CLASSE = {
  assassino: 1.3,
  xama: 1.2,
  cacador: 1.12,
  invocador: 1.08,
  mago: 0.98,
  guerreiro: 1.04,
  guardiao: 0.93,
  mistico: 0.96
};
export const ASC0 = { d: 0, c: 0, v: 0 };
export function atrib(s: Selo): Atributos {
  const l = L(s),
    b = D.classes[l.classe].base,
    e = est(s),
    eb = estBase(s);
  const md = MULT[e] * (1 + DIF.nivelAtrib * Math.max(0, s.nivel - NIV[eb]));
  const r = ramoObj(s),
    fd = r ? D.regras.ramos[r.tipo].dano : 1,
    fv = r ? D.regras.ramos[r.tipo].vida : 1,
    rar = RAR_BONUS[s.mon.rar];
  const elo = R.elos.some(n => D.elos.find(x => x.nome === n && (x.a === s.mon.id || x.b === s.mon.id))) ? 1.2 : 1;
  const asc = s.asc || ASC0,
    ad = 1 + ASCENSAO.d.v * (asc.d || 0),
    ac = 1 + ASCENSAO.c.v * (asc.c || 0),
    av = 1 + ASCENSAO.v.v * (asc.v || 0); // caminhos da Ascensão (valores em ASCENSAO, 03_progressao.js)
  const desp = J && J.desp > 0,
    buff = J && J.buffCad > 0 ? 1.3 : 1,
    furia = s.furia > 0 ? 2 : 1,
    canto = J && J.canto > 0 ? 1.35 : 1,
    furiaD = s.furia > 0 && s.furiaMod === 1 ? 1.25 : 1;
  return {
    dano:
      b.dano *
      (AJUSTE_CLASSE[l.classe] || 1) *
      md *
      fd *
      rar *
      ad *
      (1 + 0.2 * (s.pod.b - 1)) *
      SIN.dano *
      elo *
      (desp ? D.despertar.dano : 1) *
      (J && J.fervor > 0 ? 1.25 : 1) *
      furiaD *
      (J && J.grito > 0 ? 1.6 : 1) *
      (J && J.soloJog === "sombra" && elementoDe(s) === "sombra" ? 1.2 : 1),
    cad:
      b.cadencia *
      ac *
      (1 + 0.05 * (s.pod.b - 1)) *
      SIN.cad *
      elo *
      (desp ? D.despertar.cadencia : 1) *
      buff *
      furia *
      canto *
      (J && J.totemAnc > 0 ? 1.4 : 1),
    vida: (b.vida / (1 - b.defesa)) * md * fv * rar * av,
    cura: (b.cura || 0) * md * rar
  };
}
export const fNivel = (lv: number) => 1 + 0.25 * Math.max(0, lv - 1),
  fRecarga = (lv: number) => 1 - 0.06 * Math.max(0, lv - 1);

// ================================================================ escrita vinda de outros módulos
// Um módulo lê as variáveis de outro direto (J.vida, R.selos...), mas só o módulo dono pode atribuir nelas. Quem precisa trocar o
// valor inteiro (começar um mapa, pausar, marcar a fonte do dano) chama uma destas funções: toda troca tem um nome e um lugar só.
export function defFonte(v: FonteDano) {
  return (FONTE = v);
}
export function defAutor(v: string | null | undefined) {
  return (AUTOR = v ?? null);
}
export function defPausado(v: boolean) {
  return (pausado = v);
}
export function defRodando(v: boolean) {
  return (rodando = v);
}
/** @param v a run guardada para "Continuar" */ export function defRunSalva(v: AindaSemTipo) {
  return (RUN_SALVA = v);
}
export function defMapaSeg(v: number) {
  return (MAPA_SEG = v);
}
export function defMiniSeg(v: number) {
  return (MINI_SEG = v);
}
export function defJ(v: Mapa) {
  return (J = v);
}
export function defR(v: Run) {
  return (R = v);
}
export function defMeta(v: Meta) {
  return (META = v);
}
