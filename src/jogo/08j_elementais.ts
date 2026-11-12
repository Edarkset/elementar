// Elementar · Poder do Elemento: quando um monstro da equipe chega à forma Suprema (estágio 3), o poder do elemento dele passa a
// aparecer nas cartas de nível. É da equipe (não de um monstro só), sobe do nível 1 ao 5 e dispara sozinho de tempos em tempos.
// Dá uma escolha nova no meio da run, quando os poderes dos monstros já estão perto do máximo.
// O dano vem do monstro Supremo mais forte daquele elemento (é ele que aparece como autor no resumo de fim de run).
import "./08i_relatorio.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import {
  agendar,
  ativos,
  atrib,
  AUTOR,
  COR,
  defAutor,
  defFonte,
  dist2,
  elementoBase,
  ELS,
  embaralhar,
  estBase,
  FONTE,
  J,
  NOME_EL,
  nomeForma,
  R,
  rnd,
  VH,
  VW
} from "./01_nucleo.js";
import { curar, DIF, emArea, ferir, maisForte, pontoDenso, raio, tremor } from "./02_combate.js";
import { aplicarElementoNoSolo } from "./04_ambiente.js";
import { efCirculo, efCura, efEspiral, efExplosao, efPilar, efPuxao, efQueda, vfxOnda, vfxX } from "./08b_efeitos.js";
import { puxar, tal } from "./08d_poderes.js";
// ================================================================ Poder do Elemento

export const ELEMENTAL_MAX = 5;

/** nome e efeito de cada poder, por elemento (o texto da carta) */
export const PODER_ELEMENTO: Record<Elemento, { nome: string; desc: string; cd: number }> = {
  fogo: { nome: "Erupção", desc: "Explosões nos pontos de maior multidão; o chão fica em chamas.", cd: 9 },
  agua: { nome: "Maré", desc: "Uma onda sai da equipe, fere e empurra a horda para longe.", cd: 8 },
  terra: { nome: "Queda de Rochas", desc: "Rochas caem sobre os inimigos na tela, com dano alto.", cd: 10 },
  ar: { nome: "Ciclone", desc: "Um ciclone puxa e fere a multidão por alguns segundos.", cd: 11 },
  raio: { nome: "Tempestade", desc: "Raios caem em vários inimigos de uma vez.", cd: 7 },
  natureza: { nome: "Bênção da Mata", desc: "Cura a equipe e enraíza os inimigos em volta.", cd: 12 },
  luz: { nome: "Pilar Solar", desc: "Um pilar de luz no inimigo mais forte, com dano muito alto.", cd: 9 },
  sombra: { nome: "Abraço da Sombra", desc: "Puxa a multidão para um ponto, fere e cega.", cd: 10 }
};
const DE_EL: Record<Elemento, string> = {
  fogo: "do",
  agua: "da",
  terra: "da",
  ar: "do",
  raio: "do",
  natureza: "da",
  luz: "da",
  sombra: "da"
};
/** bolinhas de nível na carta (as mesmas dos poderes dos monstros, até 5) */
function pipsElemental(lv: number, prox: number) {
  let h = "<span class='pips'>";
  for (let i = 1; i <= ELEMENTAL_MAX; i++) h += `<i class='${i <= lv ? "tem" : i <= prox ? "novo" : ""}'></i>`;
  return h + "</span>";
}
/** multiplicador de dano por nível do poder (sobre o dano do monstro) */
const FORCA = [0, 2.2, 2.7, 3.3, 4, 5];
/** recarga por nível (fração da recarga base) */
const RECARGA = [1, 1, 0.94, 0.88, 0.82, 0.75];

export function nivElemental(el: Elemento) {
  return (R.elementais && R.elementais[el]) || 0;
}
/** o monstro que carrega o poder: o Supremo mais forte daquele elemento (null se nenhum chegou lá) */
export function portadorElemento(el: Elemento): Selo | null {
  let melhor: Selo | null = null;
  for (const s of ativos()) if (estBase(s) >= 3 && elementoBase(s) === el && (!melhor || s.nivel > melhor.nivel)) melhor = s;
  return melhor;
}
/** elementos cujo poder pode aparecer nas cartas agora (algum Supremo e nível abaixo do máximo) */
export function elementosAbertos() {
  if (!DIF.elementais) return [];
  return ELS.filter(el => nivElemental(el) < ELEMENTAL_MAX && portadorElemento(el));
}
export function cartaElemental(el: Elemento): CartaNivel {
  const lv = nivElemental(el),
    prox = lv + 1,
    P = PODER_ELEMENTO[el],
    s = portadorElemento(el)!;
  return {
    peso: 1.2,
    s,
    k: "b",
    elem: el,
    raridade: prox === ELEMENTAL_MAX ? "lendario" : prox >= 3 ? "epico" : "raro",
    titulo: `${P.nome} ${lv ? `${lv} → ${prox}` : "(novo)"}`,
    texto: `${pipsElemental(lv, prox)}<span style="color:${COR[el]};font-weight:700">Poder ${DE_EL[el]} ${NOME_EL(el)}.</span> ${P.desc} Poder da equipe, vindo de ${nomeForma(s)} na forma Suprema. Dano ${Math.round(FORCA[prox] * 100)}% a cada ~${Math.round(P.cd * RECARGA[prox])} s.${prox === ELEMENTAL_MAX ? " · <b>Nível máximo!</b>" : ""}`
  };
}
export function aplicarElemental(el: Elemento) {
  R.elementais = R.elementais || {};
  R.elementais[el] = Math.min(ELEMENTAL_MAX, nivElemental(el) + 1);
  if (R.st) R.st.elementais = (R.st.elementais || 0) + 1;
  if (J) J.cdElem = Object.assign(J.cdElem || {}, { [el]: 1.5 }); // dispara logo depois de escolher: a pessoa vê o que ganhou
}

// ---------------------------------------------------------------- disparo
/** relógio de cada poder de elemento; chamado a cada quadro */
export function passoElementais(dt: number) {
  if (!R.elementais || J.fim) return;
  J.cdElem = J.cdElem || {};
  for (const el in R.elementais) {
    const e = el as Elemento,
      lv = R.elementais[e]!,
      s = portadorElemento(e);
    if (!lv || !s || s.x == null) continue;
    J.cdElem[e] = (J.cdElem[e] ?? 3) - dt;
    if (J.cdElem[e]! > 0) continue;
    const fonte = FONTE;
    defFonte("elemental");
    defAutor(s.mon!.id);
    const dano = atrib(s).dano * tal.dano() * FORCA[lv],
      ok = DISPARO[e](s, dano, lv, tal.area());
    defFonte(fonte);
    defAutor(null);
    J.cdElem[e] = ok ? PODER_ELEMENTO[e].cd * RECARGA[lv] * tal.recarga() : 1;
  }
}
/** agenda um golpe do poder que, quando cair, ainda conta como Poder do Elemento do mesmo monstro */
function depois(seg: number, fn: () => void) {
  const autor = AUTOR;
  agendar(seg, () => {
    const fonte = FONTE;
    defFonte("elemental");
    defAutor(autor);
    fn();
    defFonte(fonte);
    defAutor(null);
  });
}
const naTela = (e: Inimigo) => e.hp > 0 && Math.abs(e.x - J.jogador.x) < VW / 2 && Math.abs(e.y - J.jogador.y) < VH / 2;
function alvosNaTela(n: number) {
  const l = J.inimigos.filter(naTela);
  embaralhar(l);
  return l.slice(0, n);
}
/** cada disparo devolve false se não havia alvo (tenta de novo em 1 s) */
const DISPARO: Record<Elemento, (s: Selo, dano: number, lv: number, area: number) => boolean> = {
  fogo(s, dano, lv, area) {
    const r = 38;
    let n = 0;
    for (let i = 0; i < 2 + Math.ceil(lv / 2); i++) {
      const alvo = pontoDenso(J.jogador, VW / 2);
      if (!alvo) break;
      const x = alvo.x + rnd(-20, 20),
        y = alvo.y + rnd(-20, 20);
      depois(i * 0.18, () => {
        emArea(x, y, r, e => ferir(e, dano, "fogo"));
        efExplosao(x, y, r * area, "fogo", lv >= 4);
        aplicarElementoNoSolo(x, y, "fogo");
      });
      n++;
    }
    if (n) tremor(3);
    return n > 0;
  },
  agua(s, dano, lv, area) {
    const P = J.jogador,
      r = 70 + lv * 6;
    if (!J.inimigos.some(e => e.hp > 0 && dist2(e, P) < r * r * area * area)) return false;
    vfxOnda(P, "agua", r * area);
    efCirculo(P.x, P.y, r * area, "agua", 0.6, true);
    emArea(P.x, P.y, r, e => {
      ferir(e, dano * 0.8, "agua");
      if (e.chefe) return;
      const dx = e.x - P.x,
        dy = e.y - P.y,
        d = Math.hypot(dx, dy) || 1;
      e.x += (dx / d) * 34;
      e.y += (dy / d) * 34;
    });
    return true;
  },
  terra(s, dano, lv, area) {
    const alvos = alvosNaTela(3 + lv);
    alvos.forEach((a, i) => {
      const x = a.x,
        y = a.y,
        atraso = 0.35 + i * 0.08;
      efQueda(x, y, "terra", atraso);
      depois(atraso, () => {
        emArea(x, y, 24, e => ferir(e, dano * 1.2, "terra"));
        tremor(1.5);
      });
    });
    return alvos.length > 0;
  },
  ar(s, dano, lv, area) {
    const alvo = pontoDenso(J.jogador, VW / 2);
    if (!alvo) return false;
    const x = alvo.x,
      y = alvo.y,
      r = 55,
      dur = 2 + lv * 0.3,
      golpes = Math.round(dur / 0.4);
    efEspiral(x, y, r * area, "ar", dur);
    for (let i = 0; i < golpes; i++)
      depois(i * 0.4, () => {
        puxar(x, y, r * area * 1.3, 5);
        emArea(x, y, r, e => ferir(e, (dano * 1.6) / golpes, "ar"));
      });
    return true;
  },
  raio(s, dano, lv, area) {
    const alvos = alvosNaTela(3 + lv);
    let ant: Ponto = { x: s.x ?? J.jogador.x, y: s.y ?? J.jogador.y };
    for (const a of alvos) {
      raio(ant.x, ant.y, a.x, a.y, COR.raio);
      vfxX(a, "raio");
      emArea(a.x, a.y, 14, e => ferir(e, dano * 0.9, "raio"));
      ant = a;
    }
    return alvos.length > 0;
  },
  natureza(s, dano, lv, area) {
    const P = J.jogador,
      r = 60 + lv * 5;
    curar(J.vidaMax * (0.03 + lv * 0.01));
    efCura(r * area);
    emArea(P.x, P.y, r, e => {
      ferir(e, dano * 0.5, "natureza");
      if (!e.chefe) e.congela = Math.max(e.congela || 0, 0.8 + lv * 0.2);
    });
    return true;
  },
  luz(s, dano, lv, area) {
    const alvo = maisForte(J.jogador, VW / 2);
    if (!alvo) return false;
    efPilar(alvo.x, alvo.y, "luz", 0.8, 22 * area);
    depois(0.25, () => emArea(alvo.x, alvo.y, 26, e => ferir(e, e === alvo ? dano * 2.2 : dano * 0.6, "luz")));
    return true;
  },
  sombra(s, dano, lv, area) {
    const alvo = pontoDenso(J.jogador, VW / 2);
    if (!alvo) return false;
    const x = alvo.x,
      y = alvo.y,
      r = 70;
    efPuxao(x, y, r * area, "sombra");
    puxar(x, y, r * area, 26);
    depois(0.35, () =>
      emArea(x, y, r * 0.6, e => {
        ferir(e, dano * 1.1, "sombra");
        e.cego = Math.max(e.cego || 0, 1.5);
      })
    );
    return true;
  }
};
