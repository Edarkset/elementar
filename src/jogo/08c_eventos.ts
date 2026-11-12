// Elementar · eventos no meio do mapa (meteoros, fugitivo dourado, altar, chuva de cristais) e textos de reação
import "./08b_efeitos.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { agendar, ativos, COR, defFonte, elementoDe, escolha, J, lg, MAPA_SEG, R, rnd, SIM, UNIV, VH, VW } from "./01_nucleo.js";
import { DIF, dificuldade, emArea, ferir, particulas, spawnInimigo, texto, tremor } from "./02_combate.js";
import { diaria } from "./03_progressao.js";
import { mudarSolo } from "./04_ambiente.js";
import { bolhaCor } from "./07_cenario.js";
import { particulasEl, vfxOnda } from "./08b_efeitos.js";
import { luzFlash } from "./08g_luz.js";
import { anunciar, feriJogador, perigo } from "./09b_chefes.js";
// ---------------------------------------------------------------- eventos no meio do mapa: a cada ~40 s algo diferente acontece
// chuva de meteoros (círculos anunciados: ferem inimigos e o Invocador), fugitivo dourado (foge; derrotado, deixa baú dourado),
// altar do elemento (ficar em cima carrega o Despertar) e chuva de cristais de experiência
export const EVENTOS = ["meteoros", "fugitivo", "altar", "cristais"];
export function atualizarEventos(dt: number) {
  if (J.fim || J.chefeVivo || J.t > MAPA_SEG - 12 || J.t < 18) return;
  if (J.altar) {
    const a = J.altar,
      P = J.jogador;
    a.t -= dt;
    const dentro = Math.hypot(P.x - a.x, P.y - a.y) < a.r;
    if (dentro && J.desp <= 0) {
      J.ult = Math.min(100, J.ult + dt * 28);
      if (Math.random() < 0.3) particulasEl(P.x, P.y, a.el, 1, 40);
    }
    if (a.t <= 0 || (J.ult >= 100 && dentro)) {
      if (J.ult >= 100 && dentro) {
        diaria("eventos");
      }
      if (J.ult >= 100 && dentro) texto(a.x, a.y - 16, "Despertar pronto!", "#ffd34a", 14);
      J.altar = null;
    }
  }
  J.tEvento = (J.tEvento ?? rnd(26, 34)) - dt;
  if (J.tEvento > 0) return;
  J.tEvento = rnd(36, 46);
  const k = escolha(EVENTOS.filter(x => x !== J.ultEvento));
  J.ultEvento = k;
  const P = J.jogador,
    el = UNIV[R.universo].elemento;
  if (k === "meteoros") {
    if (!SIM.ativo) anunciar({ el: "fogo" }, "Chuva de meteoros!", "Saia dos círculos: as pedras ferem todos que estiverem dentro.");
    for (let i = 0; i < 10; i++)
      agendar(0.6 + i * 0.35, () => {
        if (!J || J.fim) return;
        const x = P.x + rnd(-VW * 0.45, VW * 0.45),
          y = P.y + rnd(-VH * 0.4, VH * 0.4),
          r = 16;
        perigo({
          tipo: "circ",
          x,
          y,
          r,
          t: 1.1,
          cor: "#ff8a3d",
          fim: () => {
            if (!J) return;
            defFonte("ambiente");
            emArea(x, y, r + 4, e => {
              if (e.ehProp !== true) ferir(e, DIF.hp * dificuldade() * 0.9, "fogo");
            });
            defFonte("basico");
            if (Math.hypot(J.jogador.x - x, J.jogador.y - y) < r) feriJogador(J.vidaMax * 0.08, "fogo");
            vfxOnda({ x, y }, "fogo", r + 6);
            particulasEl(x, y, "fogo", 12, 90);
            luzFlash(x, y, "#ffb060", 50, 0.35);
            tremor(3);
            mudarSolo(x, y, "queimado", 8);
          }
        });
      });
  } else if (k === "fugitivo") {
    spawnInimigo(0);
    const e = J.inimigos[J.inimigos.length - 1];
    const a = Math.random() * 6.28;
    e.x = P.x + Math.cos(a) * VW * 0.35;
    e.y = P.y + Math.sin(a) * VH * 0.3;
    Object.assign(e, {
      fugitivo: true,
      elite: true,
      hp: e.max * 8,
      max: e.max * 8,
      esc: 1,
      escAlvo: 1.25,
      virouElite: 1.2,
      v: e.v * 1.25,
      dano: e.dano * 0.3
    });
    if (!SIM.ativo) anunciar({ el: "luz" }, "Um fugitivo dourado!", "Pegue-o antes que escape: ele carrega um baú dourado.");
    agendar(18, () => {
      if (J && e.hp > 0 && !e._pagou) {
        e.hp = 0;
        e.semCadaver = true;
        particulas(e.x, e.y, "#ffd34a", 16, 80);
        J.inimigos = J.inimigos.filter(x => x !== e);
        if (!SIM.ativo) texto(e.x, e.y - 12, "Escapou!", "#ffd34a", 13);
      }
    });
  } else if (k === "altar") {
    const a = Math.random() * 6.28,
      d = Math.min(VW, VH) * 0.3;
    J.altar = { x: P.x + Math.cos(a) * d, y: P.y + Math.sin(a) * d, r: 16, t: 14, el: ativos()[0] ? elementoDe(ativos()[0]) : el };
    if (!SIM.ativo) anunciar({ el: J.altar.el }, "Altar elemental!", "Fique sobre ele para carregar o Despertar.");
  }
  if (k === "meteoros" || k === "cristais")
    agendar(8, () => {
      if (J && !J.fim) diaria("eventos");
    });
  if (k === "cristais") {
    if (!SIM.ativo) anunciar({ el: "luz" }, "Chuva de cristais!", "Corra para pegar a experiência.");
    for (let i = 0; i < 24; i++) {
      const x = P.x + rnd(-VW * 0.45, VW * 0.45),
        y = P.y + rnd(-VH * 0.4, VH * 0.4);
      J.gemas.push({ x, y, vx: 0, vy: 0, v: 3 + R.profundidade * 0.6, cor: "#9fe0ff" });
    }
  }
}
export function desenharAltar(ox: number, oy: number) {
  const a = J.altar;
  if (!a) return;
  const x = a.x - ox,
    y = a.y - oy,
    cor = COR[a.el] || "#ffd34a",
    pul = 0.5 + 0.5 * Math.sin(J.t * 4);
  lg.save();
  lg.translate(x, y);
  lg.scale(1, 0.55);
  lg.globalCompositeOperation = "lighter";
  lg.globalAlpha = 0.25 + 0.15 * pul;
  lg.drawImage(bolhaCor(J.cena, cor), -a.r * 1.3, -a.r * 1.3, a.r * 2.6, a.r * 2.6);
  lg.globalAlpha = 0.9;
  lg.strokeStyle = cor;
  lg.lineWidth = 1.4;
  lg.beginPath();
  lg.arc(0, 0, a.r, 0, Math.PI * 2);
  lg.stroke();
  lg.rotate(J.t * 0.8);
  lg.lineWidth = 0.8;
  for (let i = 0; i < 6; i++) {
    const b = (i / 6) * Math.PI * 2;
    lg.beginPath();
    lg.moveTo(Math.cos(b) * a.r * 0.6, Math.sin(b) * a.r * 0.6);
    lg.lineTo(Math.cos(b + 2.1) * a.r * 0.6, Math.sin(b + 2.1) * a.r * 0.6);
    lg.stroke();
  }
  lg.restore();
  lg.globalCompositeOperation = "source-over";
  lg.globalAlpha = 1;
  lg.fillStyle = "#3a3040";
  lg.fillRect(x - 3, y - 9, 6, 9);
  lg.fillStyle = "#5a5060";
  lg.fillRect(x - 3, y - 9, 6, 2);
  lg.fillStyle = cor;
  lg.beginPath();
  lg.arc(x, y - 12 - pul, 2.2, 0, Math.PI * 2);
  lg.fill();
  lg.lineWidth = 1;
}
// ---------------------------------------------------------------- textos: o nome de uma reação só aparece grande na primeira vez da partida
export function textoUnico(chave: string, x: number, y: number, t: string, cor: string, tam: number) {
  R.vistos = R.vistos || {};
  if (R.vistos[chave]) return false;
  R.vistos[chave] = 1;
  texto(x, y, t, cor, tam);
  return true;
}
