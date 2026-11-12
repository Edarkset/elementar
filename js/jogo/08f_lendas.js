// GERADO por "npm run compilar" a partir de src/jogo/08f_lendas.ts. Edite o .ts, não este arquivo.
// Elementar · Lendas jogáveis e Panteão (deuses jogáveis)
import "./08e_conquistas.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import {
  agendar,
  ativos,
  atrib,
  AUTOR,
  COR,
  defFonte,
  elementoDe,
  FONTE,
  gravar,
  J,
  lg,
  META,
  mistura,
  NOME_EL,
  novaRun,
  R,
  rnd,
  SIM,
  SIN,
  UNIV,
  VH,
  VW
} from "./01_nucleo.js";
import { curar, emArea, ferir, iniciarMapa, maisProximo, morrer, parar, particulas, pontoDenso, texto, tremor } from "./02_combate.js";
import { mostrarCartas, proximaEscolha, salvarRun } from "./03_progressao.js";
import { ARTE_IMG, fatiarFolha, preCarregar, quadroAnim } from "./05_arte.js";
import { QUAL } from "./06_loop.js";
import { bolhaCor } from "./07_cenario.js";
import { silhueta } from "./07b_cenario_desenho.js";
import { desenharSprite, folhaArte } from "./07c_cenario_arte.js";
import { avisar } from "./08_horda.js";
import { particulasEl, vfx, VFX_EL, vfxCorte, vfxFeixe, vfxOnda, vfxSelo } from "./08b_efeitos.js";
import { avisoConquista, metaConq, telaConquistas } from "./08e_conquistas.js";
import { luzFlash, nivelEscuro } from "./08g_luz.js";
import { perigo, pintarSolo } from "./09b_chefes.js";
import { quadroHeroi } from "./10_desenho.js";
// ================================================================ Lendas jogáveis: poder próprio (até o nível 5) e passiva
export const LENDA = () => (R && R.lenda ? D.lendas.find(l => l.id === R.lenda) || D.panteao.find(p => p.id === R.lenda) : null);
export function passiva(ef) {
  const l = LENDA();
  return l && l.passiva.efeito === ef ? l.passiva.valor : 0;
}
export function custo(ef) {
  const l = LENDA();
  return (l && l.passiva.custo && l.passiva.custo[ef]) || 0;
}
// escolha do herói da run: o Invocador básico ou uma Lenda/deus já liberado. Cada carta mostra a arte, o poder e a
// afinidade com o Pacto (quantos elementos em comum), para a escolha ter peso; as bloqueadas dizem como liberar
export function arteHeroiLenda(l) {
  const img = folhaArte(l.dom ? `arte/panteao/${l.id}.png` : `arte/lendas/${l.id}.png`);
  if (!img || !fatiarFolha(img, 6, 3).valida) return null;
  return quadroAnim(img, 0, 0, 64);
}
export function telaInvocador(pacto, id, esperou) {
  metaConq();
  const livres = [...D.panteao.filter(g => (META.deuses || []).includes(g.id)), ...D.lendas.filter(l => META.lendas.includes(l.universo))];
  if (!livres.length) {
    novaRun(pacto, id);
    salvarRun();
    iniciarMapa();
    return;
  }
  const nomes = livres.map(l => (l.dom ? `arte/panteao/${l.id}.png` : `arte/lendas/${l.id}.png`));
  if (
    !esperou &&
    nomes.some(n => {
      const im = ARTE_IMG[n];
      return im && !im.pronta && !im.falhou;
    })
  ) {
    Promise.race([preCarregar(nomes), new Promise(ok => setTimeout(ok, 2500))]).then(() => telaInvocador(pacto, id, true));
    return;
  }
  const ir = lid => {
    novaRun(pacto, id);
    R.lenda = lid;
    R.lendaNv = lid ? 1 : 0;
    salvarRun();
    iniciarMapa();
  };
  const total = D.lendas.length + D.panteao.length,
    estrelas = l => pacto.filter(el => l.elementos.includes(el)).length;
  const cartas = livres
    .map(l => {
      const n = estrelas(l),
        arte = arteHeroiLenda(l);
      return {
        titulo: l.nome,
        raridade: l.dom ? "lendario" : "epico",
        sprite: arte || undefined,
        suave: true,
        classe: arte ? "grande" : null,
        texto:
          `<span style="color:${COR[l.elementos[0]]}">${NOME_EL(l.elementos[0])}</span> e <span style="color:${COR[l.elementos[1]]}">${NOME_EL(l.elementos[1])}</span> · ${l.poder.nome} · ${l.dom ? `Dom: ${l.dom.nome} · Fardo: ${l.fardo}` : l.passiva.nome}<br>` +
          (n
            ? `<span class='bom'>Combina com a sua Aliança</span>: cada monstro de ${l.elementos.map(NOME_EL).join(" ou ")} na equipe dá ★ (mais dano e poder).`
            : `Sem elemento em comum com a Aliança: pouca afinidade.`) +
          (l.universo ? ` Terra Natal: ${UNIV[l.universo] ? UNIV[l.universo].nome : ""}.` : ""),
        acao: () => ir(l.id),
        _n: n
      };
    })
    .sort((a, b) => b._n - a._n);
  mostrarCartas(
    "Quem comanda a equipe?",
    `Lendas e deuses liberados: ${livres.length}/${total}. Complete os murais dos reinos para liberar mais.`,
    [
      {
        titulo: "Invocador",
        texto: "O herói básico, sem poder próprio.",
        sprite: quadroHeroi("p", 0, false, COR[pacto[0]]),
        classe: "grande",
        acao: () => ir(null)
      },
      ...cartas
    ],
    { grade: cartas.length > 3 }
  );
}
export function cartaLenda() {
  const l = LENDA();
  if (!l || (R.lendaNv || 1) >= 5 || Math.random() > 0.3) return null;
  return {
    titulo: `${l.poder.nome} ${R.lendaNv} → ${R.lendaNv + 1}`,
    raridade: "lendario",
    texto: `Poder da Lenda (${TIPOS_LENDA_TXT[l.poder.tipo] || ""}): +25% de dano e −5% de recarga.`,
    acao: () => {
      R.lendaNv++;
      proximaEscolha();
    }
  };
}
export const TIPOS_LENDA_TXT = {
  orbita: "gira em volta",
  projetil: "arremesso",
  onda: "onda de choque",
  invocar: "aliados",
  raio: "raio em cadeia",
  barril: "explosivo",
  investida: "avanço",
  area: "zona no chão",
  drenar: "rouba vida",
  dardos: "disparos rápidos"
};
export function atualizarLenda(dt) {
  const l = LENDA();
  if (!l || !J || J.fim) return;
  if (J.lendaPose) {
    J.lendaPose.t += dt;
    if (J.lendaPose.t >= J.lendaPose.dur) J.lendaPose = null;
  }
  atualizarDom(dt);
  const p = l.poder,
    nv = R.lendaNv || 1,
    P = J.jogador,
    el = l.elementos[0],
    el2 = l.elementos[1],
    cor = COR[el];
  const base =
    (ativos().reduce((t, s) => t + atrib(s).dano, 0) / Math.max(1, ativos().length)) *
    p.dano *
    (1 + 0.25 * (nv - 1)) *
    (1 + custo("dano_dia") * (UNIV[R.universo].luz && !UNIV[R.universo].luz.noite ? 1 : 0)) *
    (SIN.lendaPoder || 1); // afinidade e Terra Natal
  if (p.tipo === "orbita") {
    J.lendaAng = (J.lendaAng || 0) + dt * 3.2;
    J.lendaHit = (J.lendaHit || 0) - dt;
    if (J.lendaHit <= 0) {
      J.lendaHit = p.cd;
      defFonte("lenda");
      J.lendaGiros = (J.lendaGiros || 0) + 1;
      if (J.lendaGiros % 8 === 1 && !J.lendaPose) J.lendaPose = { t: 0, dur: 0.5 };
      for (let i = 0; i < p.n; i++) {
        const a = J.lendaAng + (i / p.n) * Math.PI * 2,
          x = P.x + Math.cos(a) * p.r,
          y = P.y + Math.sin(a) * p.r * 0.8;
        emArea(x, y, 12, e => ferir(e, base, i % 2 ? el2 : el));
      }
    }
    if (!J.lendaVfx) {
      J.lendaVfx = vfx({
        max: 1e9,
        desenhar(ox, oy) {
          const v = VFX_EL[el] || VFX_EL.luz;
          for (let i = 0; i < p.n; i++) {
            const a = J.lendaAng + (i / p.n) * Math.PI * 2,
              x = P.x + Math.cos(a) * p.r - ox,
              y = P.y + Math.sin(a) * p.r * 0.8 - oy;
            lg.globalAlpha = 0.9;
            lg.fillStyle = v.c1;
            lg.fillRect(Math.round(x) - 1, Math.round(y) - 3, 2, 6);
            lg.fillStyle = "#ffffff";
            lg.fillRect(Math.round(x), Math.round(y) - 3, 1, 2);
            lg.globalAlpha = 0.3;
            lg.fillStyle = v.c2;
            lg.fillRect(Math.round(x) - 2, Math.round(y) - 4, 4, 8);
          }
        }
      });
    }
    return;
  }
  J.lendaCd = (J.lendaCd ?? 1) - dt;
  if (J.lendaCd > 0) return;
  J.lendaCd = p.cd * (1 - 0.05 * (nv - 1));
  defFonte("lenda");
  if (!J.lendaPose) J.lendaPose = { t: 0, dur: 0.5 };
  const alvo = maisProximo(P, 150),
    denso = pontoDenso(P, 150) || alvo;
  switch (p.tipo) {
    case "projetil":
      for (let i = 0; i < p.n; i++) {
        const e = maisProximo(P, 160, o => Math.random() < 0.6) || alvo;
        if (!e) break;
        const a = Math.atan2(e.y - P.y, e.x - P.x) + (i - (p.n - 1) / 2) * 0.2;
        const pr = {
          fonte: FONTE,
          autor: AUTOR,
          x: P.x,
          y: P.y,
          vx: Math.cos(a) * 170,
          vy: Math.sin(a) * 170,
          dano: base,
          el: i % 2 ? el2 : el,
          cor,
          vida: p.volta ? 1.4 : 1.1,
          perf: p.perf,
          r: 3
        };
        J.proj.push(pr);
        if (p.volta)
          agendar(0.6, () => {
            pr.vx *= -1;
            pr.vy *= -1;
            pr.ja = new Set();
          });
      }
      break;
    case "dardos":
      for (let i = 0; i < p.n; i++) {
        const e = maisProximo(P, 150, o => Math.random() < 0.7) || alvo;
        if (!e) break;
        const a = Math.atan2(e.y - P.y, e.x - P.x);
        J.proj.push({
          fonte: FONTE,
          autor: AUTOR,
          x: P.x,
          y: P.y,
          vx: Math.cos(a) * 220,
          vy: Math.sin(a) * 220,
          dano: base,
          el: i % 2 ? el2 : el,
          cor,
          vida: 0.9,
          perf: 1,
          r: 2
        });
        if (p.encanta) e.lenta = Math.max(e.lenta || 0, 1.5);
      }
      break;
    case "onda":
      vfxOnda(P, el, p.r);
      emArea(P.x, P.y, p.r, e => {
        ferir(e, base, el);
        const dx = e.x - P.x,
          dy = e.y - P.y,
          d = Math.hypot(dx, dy) || 1;
        if (!e.chefe) {
          e.x += (dx / d) * 10;
          e.y += (dy / d) * 10;
        }
      });
      tremor(2);
      break;
    case "invocar":
      for (let i = 0; i < p.n; i++)
        J.crias.push({
          fonte: FONTE,
          autor: AUTOR,
          x: P.x + rnd(-12, 12),
          y: P.y + rnd(-12, 12),
          dano: base,
          el: i % 2 ? el2 : el,
          cor,
          vida: p.vida,
          cd: 0
        });
      vfxSelo(P.x, P.y, el, 14);
      break;
    case "raio": {
      let o = P;
      const vistos = new Set();
      for (let i = 0; i < p.saltos; i++) {
        const e = maisProximo(o, i ? 70 : 150, x => !vistos.has(x));
        if (!e) break;
        vistos.add(e);
        vfxFeixe(o, e, el2 || el);
        ferir(e, base * (1 - i * 0.1), "raio");
        o = e;
      }
      break;
    }
    case "barril":
      if (denso) {
        const x = denso.x,
          y = denso.y;
        perigo({
          tipo: "circ",
          x,
          y,
          r: p.r,
          t: 0.5,
          cor,
          fim: () => {
            vfxOnda({ x, y }, "fogo", p.r);
            particulasEl(x, y, "fogo", 14, 90);
            luzFlash(x, y, "#ffb060", 60, 0.4);
            emArea(x, y, p.r, e => {
              if (e.ehProp !== true) ferir(e, base, "fogo");
            });
            tremor(3);
          },
          aliado: true
        });
      }
      break;
    case "investida": {
      const mira = denso || alvo;
      const a = mira ? Math.atan2(mira.y - P.y, mira.x - P.x) : Math.atan2(J.pvy || J.dir.y || 0.01, J.pvx || J.dir.x || 1);
      /* avança na direção da horda */ for (let k = 1; k <= 5; k++) {
        const x = P.x + Math.cos(a) * k * 14,
          y = P.y + Math.sin(a) * k * 14;
        emArea(x, y, 12, e => ferir(e, base, k % 2 ? el : el2));
        particulasEl(x, y, el, 3, 40);
      }
      vfxCorte(P, el, 40);
      break;
    }
    case "area":
      if (denso) {
        vfxSelo(denso.x, denso.y, el, p.r);
        emArea(denso.x, denso.y, p.r, e => {
          ferir(e, base, el);
          if (p.prende) e.lenta = Math.max(e.lenta || 0, 2);
        });
        if (p.cura) curar(J.vidaMax * p.cura);
        if (p.solo) pintarSolo(denso.x, denso.y, p.r * 0.6, p.solo, 10);
      }
      break;
    case "drenar": {
      let n = 0;
      for (let i = 0; i < p.n; i++) {
        const e = maisProximo(P, 120, o => Math.random() < 0.7);
        if (!e) break;
        ferir(e, base, el);
        vfxFeixe(P, e, "sombra");
        n++;
      }
      curar(J.vidaMax * 0.01 * n);
      break;
    }
  }
}
export function lendaReviver() {
  const v = passiva("revive");
  if (v && !R.lendaReviveu) {
    R.lendaReviveu = true;
    J.vida = J.vidaMax * v;
    J.invuln = 2;
    luzFlash(J.jogador.x, J.jogador.y, "#ffd34a", 90, 0.7);
    texto(J.jogador.x, J.jogador.y - 24, `${LENDA().passiva.nome}!`, "#ffd34a", 18);
    return true;
  }
  return false;
}
export function multDanoLenda(e) {
  let f = 1;
  if (e.chefe || e.mini) f *= 1 + passiva("dano_chefe");
  if (J.vida < J.vidaMax * 0.4) f *= 1 + passiva("dano_baixa_vida");
  f *= 1 + passiva("dano_por_elo") * (R.elos ? R.elos.length : 0);
  if (passiva("dano_serpentes") && e.def && (e.def.corpo === "serpente" || e.def.corpo === "bipede")) f *= 1 + passiva("dano_serpentes");
  return f;
}
// a Lenda (ou o deus) anda junto com a equipe, na posição do jogador. Folha 6x3 (arte/lendas/<id>.png ou arte/panteao/<id>.png):
// linha 1 parado (4), linha 2 andando (6), linha 3 lançando o poder ou o Dom Divino (6). Sem a folha, uma figura animada por código.
// a Lenda é o herói do centro: desenhada na posição do jogador, do tamanho de um herói (devolve false sem a arte, e entra o Invocador)
export function desenharLenda(ox, oy) {
  const l = LENDA();
  if (!l || !J) return false;
  const P = J.jogador,
    x = Math.round(P.x - ox),
    y = Math.round(P.y - oy + 6);
  luzPesHeroi(x, y + 1, COR[l.elementos[0]]);
  const img = folhaArte(l.dom ? `arte/panteao/${l.id}.png` : `arte/lendas/${l.id}.png`);
  const andando = Math.hypot(J.pvx || 0, J.pvy || 0) > 5,
    pose = J.lendaPose,
    lancando = !!pose,
    esq = (J.pvx || 0) < -1;
  if (img && fatiarFolha(img, 6, 3).valida) {
    const f = fatiarFolha(img, 6, 3);
    let lin = lancando ? 2 : andando ? 1 : 0;
    if (f.linhas[lin].qs.length < 1) lin = 0;
    const n = f.linhas[lin].qs.length;
    const q = lin === 2 ? Math.min(n - 1, Math.floor((pose.t / pose.dur) * n)) : Math.floor(J.t * (lin === 1 ? 10 : 6)) % n,
      s = quadroAnim(img, lin, q, 38); // um pouco maior que antes (34): o herói é o centro da tela
    if (s) {
      const resp = lin === 0 ? 1 + 0.012 * Math.sin(J.t * 2.4) : 1;
      lg.save();
      lg.translate(x, y + 1);
      lg.rotate(Math.max(-0.08, Math.min(0.08, (J.pvx || 0) / 400)));
      lg.scale(esq ? -1 : 1, resp);
      contornoHeroi(s, -s.width / 2, -s._pe, s.width, s.height, COR[l.elementos[0]]);
      desenharSprite(s, -s.width / 2, -s._pe, s.width, s.height);
      lg.restore();
      return true;
    }
  }
  return false; // sem a arte da Lenda: o Invocador entra no lugar
}
// herói (Lenda ou Invocador) sempre legível: brilho no chão e contorno de luz em volta do corpo, como os monstros da equipe;
// sem isso, Lendas de roupa escura (Drácula, Barba Negra, Nemo...) sumiam em chão escuro. Mais forte à noite.
export function luzPesHeroi(x, y, cor) {
  if (SIM.ativo || QUAL === 0) return;
  const a0 = lg.globalAlpha;
  lg.globalCompositeOperation = "lighter";
  lg.globalAlpha = a0 * (0.18 + 0.5 * nivelEscuro());
  lg.drawImage(bolhaCor(J.cena, cor), x - 18, y - 7, 36, 14);
  lg.globalAlpha = a0;
  lg.globalCompositeOperation = "source-over";
}
export function contornoHeroi(spr, x, y, w, h, cor) {
  if (SIM.ativo || QUAL === 0) return;
  const sil = silhueta(spr, mistura(cor, "#ffffff", 0.55)),
    a0 = lg.globalAlpha,
    d = 0.8;
  lg.globalAlpha = a0 * Math.min(0.95, 0.55 + 0.9 * nivelEscuro());
  for (const [dx, dy] of [
    [-d, 0],
    [d, 0],
    [0, -d],
    [0, d]
  ])
    lg.drawImage(sil, x + dx, y + dy, w, h);
  lg.globalAlpha = a0;
}
// ================================================================ Panteão: deuses jogáveis (Dom Divino, Fardo e Provação)
export const DEUS = () => (R && R.lenda ? D.panteao.find(p => p.id === R.lenda) : null);
export function metaDeuses() {
  metaConq();
  META.deuses = META.deuses || [];
  return META.deuses;
}
// Dom Divino: golpe final com recarga longa, lançado sozinho quando a tela enche ou quando o chefe está vivo
export function atualizarDom(dt) {
  const g = DEUS();
  if (!g || !J || J.fim) return;
  for (const e of J.inimigos)
    if (e.estatuaT > 0) {
      e.estatuaT -= dt;
      if (e.estatuaT <= 0) {
        e.estatua = false;
        particulas(e.x, e.y, "#a8a090", 6, 40);
      }
    }
  /* a pedra da Égide dura 3 s */ const d = g.dom;
  J.domCd = (J.domCd ?? d.cd * 0.5) - dt;
  if (J.domCd > 0) return;
  const P = J.jogador,
    tela = J.inimigos.filter(e => e.hp > 0 && Math.abs(e.x - P.x) < VW / 2 && Math.abs(e.y - P.y) < VH / 2);
  if (tela.length < 12 && !(J.chefeVivo && J.chefeVivo.hp > 0)) return;
  J.domCd = d.cd;
  defFonte("lenda");
  const base = (ativos().reduce((t, s) => t + atrib(s).dano, 0) / Math.max(1, ativos().length)) * (1 + 0.25 * ((R.lendaNv || 1) - 1)),
    el = g.elementos[0],
    el2 = g.elementos[1];
  J.lendaPose = { t: 0, dur: 0.6, dom: true };
  avisar(d.nome, g.nome, COR[el]);
  luzFlash(P.x, P.y, VFX_EL[el].c1, 140, 0.8);
  tremor(8);
  parar(0.08);
  const fortes = () => tela.filter(e => e.hp > 0).sort((a, b) => b.hp - a.hp);
  switch (d.tipo) {
    case "raios":
      fortes()
        .slice(0, d.n)
        .forEach((e, i) =>
          agendar(i * 0.12, () => {
            if (!J || e.hp <= 0) return;
            vfxFeixe({ x: e.x, y: e.y - 120 }, e, "raio");
            ferir(e, base * d.dano, "raio");
            particulasEl(e.x, e.y, "raio", 10, 90);
          })
        );
      break;
    case "martelo":
      for (const e of tela)
        if (Math.hypot(e.x - P.x, e.y - P.y) < d.r) {
          vfxFeixe(P, e, "raio");
          ferir(e, base * d.dano, "raio");
        }
      vfxOnda(P, "raio", d.r);
      break;
    case "lanca": {
      const alvo = fortes()[0];
      if (!alvo) break;
      const a = Math.atan2(alvo.y - P.y, alvo.x - P.x);
      for (let k = 1; k <= 14; k++) {
        const x = P.x + Math.cos(a) * k * 16,
          y = P.y + Math.sin(a) * k * 16;
        emArea(x, y, 14, e => ferir(e, (base * d.dano) / 3, k % 2 ? el : el2));
        particulasEl(x, y, el, 2, 30);
      }
      vfxCorte(P, el, 60);
      break;
    }
    case "caos":
      for (const e of tela)
        if (Math.hypot(e.x - P.x, e.y - P.y) < d.r && !e.chefe) {
          e.confuso = d.dur;
          e.lenta = Math.max(e.lenta || 0, d.dur);
          e.vulner = Math.max(e.vulner || 0, d.dur);
        }
      vfxSelo(P.x, P.y, "sombra", d.r * 0.6);
      break;
    case "submundo":
      for (let i = 0; i < d.n; i++)
        J.crias.push({
          fonte: FONTE,
          autor: AUTOR,
          x: P.x + rnd(-50, 50),
          y: P.y + rnd(-50, 50),
          dano: base * d.dano,
          el: "sombra",
          cor: COR.sombra,
          vida: d.vida,
          cd: 0
        });
      vfxSelo(P.x, P.y, "sombra", 50);
      break;
    case "egide":
      J.escudo = (J.escudo || 0) + J.vidaMax * d.escudo;
      for (const e of tela)
        if (!e.chefe && Math.hypot(e.x - P.x, e.y - P.y) < d.r) {
          e.estatua = true;
          e.estatuaT = 3;
          e.lenta = 3;
        }
      vfxOnda(P, "luz", d.r);
      break;
    case "sol":
      for (const e of tela) {
        ferir(e, base * d.dano, "fogo");
        if (Math.random() < 0.3) pintarSolo(e.x, e.y, 6, "fogo", 4);
      }
      break;
    case "julgamento":
      for (const e of tela) {
        if (e.chefe || e.mini) {
          ferir(e, e.max * 0.08, "sombra");
          continue;
        }
        if (e.hp < e.max * d.limite) {
          ferir(e, e.hp + 1, "sombra");
          particulasEl(e.x, e.y, "sombra", 6, 60);
        }
      }
      break;
    case "vida":
      curar(J.vidaMax * d.cura);
      J.queima = 0;
      J.atordoa = 0;
      J.lento = 0;
      particulasEl(P.x, P.y, "luz", 24, 80);
      break;
    case "rede": {
      const c = pontoDenso(P, 150) || P;
      for (const e of tela)
        if (!e.chefe && Math.hypot(e.x - c.x, e.y - c.y) < d.r) {
          e.x += (c.x - e.x) * 0.6;
          e.y += (c.y - e.y) * 0.6;
        }
      agendar(0.3, () => {
        if (!J) return;
        vfxOnda(c, "ar", 50);
        emArea(c.x, c.y, 50, e => ferir(e, base * d.dano, "raio"));
      });
      break;
    }
    case "encanto": {
      let n = 0;
      for (const e of tela) {
        if (e.chefe || e.mini || n >= d.n || Math.hypot(e.x - P.x, e.y - P.y) > d.r) continue;
        n++;
        J.crias.push({ fonte: FONTE, autor: AUTOR, x: e.x, y: e.y, dano: base, el: "luz", cor: COR.luz, vida: 10, cd: 0 });
        e.hp = 0;
        e.semCadaver = true;
        morrer(e);
      }
      break;
    }
    case "diluvio":
      for (const e of tela) {
        ferir(e, base * d.dano, "agua");
        const dx = e.x - P.x,
          dy = e.y - P.y,
          k = Math.hypot(dx, dy) || 1;
        if (!e.chefe) {
          e.x += (dx / k) * 24;
          e.y += (dy / k) * 24;
        }
      }
      for (let i = 0; i < 10; i++) pintarSolo(P.x + rnd(-90, 90), P.y + rnd(-90, 90), 8, "agua", 8);
      break;
    case "falange":
      J.invuln = Math.max(J.invuln, 2);
      for (const e of tela)
        if (Math.hypot(e.x - P.x, e.y - P.y) < d.r) {
          const dx = e.x - P.x,
            dy = e.y - P.y,
            k = Math.hypot(dx, dy) || 1;
          ferir(e, base * d.dano, "terra");
          if (!e.chefe) {
            e.x += (dx / k) * 30;
            e.y += (dy / k) * 30;
          }
        }
      vfxOnda(P, "terra", d.r);
      break;
  }
}
// Provação: na vitória sobre o chefe, confere as condições de cada deus ainda bloqueado (exige o mural do universo de origem completo)
export function conferirProvacoes(e) {
  if (SIM.ativo && !SIM.conquistas) return;
  const ds = metaDeuses(),
    u = UNIV[R.universo];
  for (const g of D.panteao) {
    if (ds.includes(g.id)) continue;
    const pv = g.provacao,
      q = pv.requisito;
    if (!META.lendas.includes(pv.universo)) continue;
    if (q.guardiao) {
      if (!(e.eraChefe && u.era === UNIV[pv.universo].era)) continue;
    } else if (R.universo !== pv.universo || e.eraChefe) continue;
    if (q.elemento && ativos().filter(s => elementoDe(s) === q.elemento).length < q.n) continue;
    if (q.tempo && J.t - J.tChefe > q.tempo) continue;
    if (q.intocado && J.atingidoNoChefe) continue;
    if (q.sem_esquiva && J.usouEsquiva) continue;
    if (q.sem_cura && J.curou) continue;
    if (q.abates && R.abates - (J.abates0 || 0) < q.abates) continue;
    ds.push(g.id);
    avisoConquista(`Deus liberado: ${g.nome}`, `Provação cumprida: ${pv.texto}`);
    if (typeof gravar === "function") gravar();
  }
}
export function telaPanteao() {
  const ds = metaDeuses();
  const cartas = D.panteao.map(g => {
    const livre = ds.includes(g.id),
      aberta = META.lendas.includes(g.provacao.universo);
    return {
      titulo: livre || aberta ? g.nome : "???",
      raridade: livre ? "lendario" : aberta ? "epico" : "comum",
      manter: true,
      sprite: folhaArte(`arte/panteao/${g.id}__retrato.png`) && livre ? retratoPequeno(`arte/panteao/${g.id}__retrato.png`) : null,
      suave: true,
      texto: livre
        ? `${NOME_EL(g.elementos[0])} e ${NOME_EL(g.elementos[1])} · ${g.poder.nome} · Dom: ${g.dom.nome} · Fardo: ${g.fardo}`
        : aberta
          ? `Provação: ${g.provacao.texto}.`
          : `${g.panteao}. Complete o mural de ${UNIV[g.provacao.universo].nome.split(",")[0]} para abrir a Provação.`,
      acao: () => {}
    };
  });
  cartas.push({ titulo: "Voltar", texto: "", acao: () => telaConquistas() });
  mostrarCartas("Panteão", `Deuses liberados: ${ds.length}/${D.panteao.length}`, cartas);
}
export function retratoPequeno(caminho) {
  const img = folhaArte(caminho);
  if (!img) return null;
  const c = document.createElement("canvas");
  c.width = 48;
  c.height = 48;
  const g = c.getContext("2d");
  const s = Math.min(img.width, img.height * 0.66);
  g.drawImage(img, (img.width - s) / 2, 0, s, s, 0, 0, 48, 48);
  return c;
}
