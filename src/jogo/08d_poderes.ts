// Elementar · árvore de poderes: Talismãs, Poderes Despertos e Uniões
import "./08c_eventos.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import {
  agendar,
  ativos,
  atrib,
  COR,
  dist2,
  elementoDe,
  escolha,
  est,
  estBase,
  FONTE,
  J,
  L,
  META,
  R,
  relatar,
  rnd,
  SIM,
  SIN
} from "./01_nucleo.js";
import { curar, emArea, ferir, maisProximo, MOD, pontoDenso, texto, tremor } from "./02_combate.js";
import { proximaEscolha } from "./03_progressao.js";
import { aplicarElementoNoSolo } from "./04_ambiente.js";
import { circuloInvocacao, vfxFeixe, vfxOnda, vfxSelo, vfxX } from "./08b_efeitos.js";
import { evento } from "./08e_conquistas.js";
import { custo, passiva } from "./08f_lendas.js";
import { luzFlash } from "./08g_luz.js";
import { iconeTalisma } from "./08h_interface.js";
// ================================================================ árvore de poderes: Talismãs (passivos), Poderes Despertos (evoluções) e Uniões
// Regras e números em dados/fonte_poderes.py. Desperto: poder no nível 5 + Talismã par + monstro Adulto -> baú de mini-chefe ou chefe.
export const PD = () => D.poderes;
export function nivTal(id: string) {
  return (R.talismas && R.talismas[id]) || 0;
}
export function valTal(efeito: string) {
  let v = 0;
  for (const id in R.talismas || {}) {
    const t = PD().talismas[id];
    if (t && t.efeito === efeito) v += t.valor * R.talismas[id];
  }
  return v;
}
export const tal = {
  dano: () => (1 + valTal("dano")) * (1 + MOD("dano")),
  defesa: () => Math.max(0.5, 1 - valTal("defesa")) * ((SIN.rm && SIN.rm.danoRec) || 1) * (1 + MOD("danoRec")),
  recarga: () => Math.max(0.45, (1 - valTal("recarga")) * (1 - MOD("cadencia"))),
  area: () => 1 + valTal("area") + passiva("area") + custo("area") + MOD("area"),
  coleta: () => 1 + valTal("coleta"),
  regen: () => valTal("regen"),
  duracao: () => 1 + valTal("duracao") + passiva("duracao"),
  projeteis: () => {
    const lv = nivTal("espelho");
    return (lv >= 2 ? 1 : 0) + (lv >= 5 ? 1 : 0);
  },
  velocidade: () => (1 + valTal("velocidade")) * (1 + MOD("velocidade")),
  critico: () => valTal("critico") + MOD("critico"),
  xp: () => (1 + valTal("xp") + valTal("risco") * 1.25) * (1 + MOD("xp")),
  riscoVida: () => 1 + valTal("risco"),
  riscoVel: () => 1 + valTal("risco") * 0.5
};
export function talismasLiberados() {
  const T = PD().talismas;
  return Object.keys(T).filter(id => T[id].inicial || (META.talismas || []).includes(id) || SIM.tudoLiberado);
}
export function efeitoTalismaTxt(t, lv: number) {
  const v = t.valor * lv * 100,
    sinal = t.efeito === "defesa" || t.efeito === "recarga" ? "−" : "+";
  return lv ? `${sinal}${v < 10 && Math.abs(v - Math.round(v)) > 0.04 ? v.toFixed(1).replace(".", ",") : Math.round(v)}%` : "0%";
} // valores pequenos (0,2% por nível) apareciam como "0% → 0%"
/** true quando nenhum monstro da equipe tem poder para subir (todos no 5; a habilidade 2 só conta depois da primeira evolução):
 * daí em diante as escolhas de nível seriam quase só Ascensão */
export function equipeSemPoder() {
  return ativos().every(s => (["b", "h1", "h2"] as ChavePoder[]).every(k => s.pod[k] >= 5 || (k === "h2" && est(s) < 1 && estBase(s) < 1)));
}
export function cartaTalisma() {
  const chance = equipeSemPoder() ? PD().chance_carta_sem_poder : PD().chance_carta;
  if (SIM.semTalismas || Math.random() >= chance + passiva("carta_extra") * 0.35 + ((SIN.rm && SIN.rm.talisma) || 0)) return null;
  const tem = Object.keys(R.talismas || {}),
    cheio = tem.length >= PD().encaixes;
  const ops = talismasLiberados().filter(id => (cheio ? tem.includes(id) && nivTal(id) < 5 : nivTal(id) < 5));
  if (!ops.length) return null;
  const util = ops.filter(id => PD().despertos.some(d => d.talisma === id && ativos().some(s => L(s).classe === d.classe))); // prefere os que abrem Desperto da equipe
  // meio caminho de uma União: se a equipe já tem um Desperto de um par e a classe do parceiro está na equipe, favorece o Talismã que falta
  const par = paresPendentes(),
    falta = ops.filter(id => par.some(p => p.talisma === id));
  const id = falta.length && Math.random() < 0.6 ? escolha(falta) : escolha(util.length && Math.random() < 0.7 ? util : ops),
    t = PD().talismas[id],
    lv = nivTal(id),
    abre = PD()
      .despertos.filter(d => d.talisma === id)
      .map(d => d.nome)
      .join(" e ");
  const uniao = paresPendentes().find(p => p.talisma === id);
  return {
    titulo: `Talismã: ${t.nome} ${lv ? `${lv} → ${lv + 1}` : "(novo)"}`,
    raridade: "epico",
    sprite: iconeTalisma(id),
    suave: true,
    texto: `${t.texto} por nível <span class='bom'>(total ${efeitoTalismaTxt(t, lv)} → ${efeitoTalismaTxt(t, lv + 1)})</span>. Abre os Despertos ${abre}.${uniao ? ` Completa o caminho da União ${uniao.uniao}.` : ""} Encaixes: ${tem.length + (lv ? 0 : 1)}/${PD().encaixes}.`,
    acao: () => {
      R.talismas = R.talismas || {};
      R.talismas[id] = lv + 1;
      R.st.talismas = (R.st.talismas || 0) + 1;
      if (J) texto(J.jogador.x, J.jogador.y - 20, t.nome, "#e0b0ff", 14);
      proximaEscolha();
    }
  };
}
export function despertoDe(s: Selo, k: ChavePoder) {
  return PD().despertos.find(d => d.classe === L(s).classe && d.poder === k);
}
export function podeDespertar(s: Selo, k: ChavePoder) {
  const d = despertoDe(s, k);
  return !!d && !(s.desp && s.desp[k]) && s.pod[k] >= 5 && nivTal(d.talisma) > 0 && estBase(s) >= 2;
}
export function bauDesperto(x: number, y: number) {
  const cand = [];
  for (const s of ativos()) for (const k of ["b", "h1", "h2"] as ChavePoder[]) if (podeDespertar(s, k)) cand.push([s, k]);
  if (!cand.length) return false;
  const [s, k] = escolha(cand),
    d = despertoDe(s, k);
  s.desp = s.desp || {};
  s.desp[k] = true;
  R.st.despertos = (R.st.despertos || 0) + 1;
  evento("desperto");
  if (R.st.mapaPrimeiroDesperto == null) R.st.mapaPrimeiroDesperto = R.profundidade + 1;
  texto(x, y - 24, `Desperto: ${d.nome}!`, "#ffd34a", 18);
  if (typeof luzFlash === "function") luzFlash(x, y, "#ffd34a", 80, 0.6);
  tremor(5);
  checarUnioes();
  return true;
}
export function despertosAtivos() {
  const n = new Set();
  for (const s of ativos())
    for (const k of ["b", "h1", "h2"] as ChavePoder[])
      if (s.desp && s.desp[k]) {
        const d = despertoDe(s, k);
        if (d) n.add(d.nome);
      }
  return n;
}
export function checarUnioes() {
  const n = despertosAtivos();
  R.unioes = R.unioes || [];
  for (const u of PD().unioes)
    if (n.has(u.a) && n.has(u.b) && !R.unioes.includes(u.nome)) {
      R.unioes.push(u.nome);
      R.st.unioes = (R.st.unioes || 0) + 1;
      evento("uniao");
      if (J) {
        texto(J.jogador.x, J.jogador.y - 30, `União: ${u.nome}!`, "#ff8ad8", 20);
        tremor(8);
      }
    }
}
// força de um poder: Desperto e União multiplicam o dano daquele poder (o Desperto substitui o poder, não soma)
export function fatorPoder(s: Selo, k: ChavePoder) {
  if (!(s.desp && s.desp[k])) return 1;
  let f = PD().forca_desperto;
  const d = despertoDe(s, k);
  if (
    d &&
    (R.unioes || []).some(nm => {
      const u = PD().unioes.find(x => x.nome === nm);
      return u && (u.a === d.nome || u.b === d.nome) && despertosAtivos().has(u.a) && despertosAtivos().has(u.b);
    })
  )
    f *= PD().forca_uniao;
  return f;
}
// Proteção do Pacto: enquanto a equipe tem um só monstro, ele bate mais forte (o dobro nas classes de suporte), para nenhum começo ficar travado
export function fatorSozinho(s: Selo) {
  if (ativos().length !== 1) return 1;
  const c = L(s).classe;
  return c === "mistico" || c === "guardiao" ? 2 : 1.4;
}
export function atribPoder(a: Atributos, s: Selo, k: ChavePoder) {
  const f = fatorPoder(s, k) * tal.dano() * fatorSozinho(s);
  return f === 1 ? a : Object.assign({}, a, { dano: a.dano * f });
}

// Uniões a meio caminho: a equipe tem um Desperto do par e um monstro da classe do outro Desperto (devolve o Talismã que falta)
export function paresPendentes() {
  const tem = despertosAtivos(),
    out = [];
  for (const u of PD().unioes)
    for (const [x, y] of [
      [u.a, u.b],
      [u.b, u.a]
    ] as [string, string][]) {
      if (!tem.has(x) || tem.has(y)) continue;
      const d = PD().despertos.find(k => k.nome === y);
      if (d && ativos().some(s => L(s).classe === d.classe)) out.push({ talisma: d.talisma, uniao: u.nome });
    }
  return out;
}

// ---------------------------------------------------------------- comportamentos dos Despertos (rodam junto com o poder, quando ele dispara)
export const _P = (s: Selo, a: Atributos, el: Elemento, cor: string, dano: number, extra) =>
  Object.assign({ fonte: FONTE, x: s.x, y: s.y, dano, el, cor, vida: 1.3, perf: 1, r: 2 }, extra);
export function puxar(cx: number, cy: number, r: number, forca: number) {
  for (const e of J.inimigos) {
    if (e.hp <= 0 || e.chefe) continue;
    const dx = cx - e.x,
      dy = cy - e.y,
      d = Math.hypot(dx, dy) || 1;
    if (d < r && d > 4) {
      e.x += (dx / d) * forca;
      e.y += (dy / d) * forca;
    }
  }
}
export const COMPORTAMENTO = {
  guardiao: {
    b(s: Selo, a: Atributos, el: Elemento) {
      const v = (J.danoRec || 0) * 0.25;
      if (v > 0) {
        vfxOnda(s, el, 40);
        emArea(s.x, s.y, 40, e => ferir(e, v, el));
      }
    },
    h1(s: Selo, a: Atributos, el: Elemento) {
      let n = 0;
      for (const e of J.inimigos) {
        if (e.hp <= 0 || e.chefe || dist2(e, s) > 70 * 70) continue;
        const dx = s.x - e.x,
          dy = s.y - e.y,
          d = Math.hypot(dx, dy) || 1;
        e.x += (dx / d) * 10;
        e.y += (dy / d) * 10;
        if (++n >= 10) break;
      }
      curar(J.vidaMax * 0.003 * n);
    },
    h2(s: Selo, a: Atributos, el: Elemento) {
      vfxOnda(s, el, 47);
      emArea(s.x, s.y, 47, e => {
        ferir(e, a.dano * 0.6, el);
        const dx = e.x - s.x,
          dy = e.y - s.y,
          d = Math.hypot(dx, dy) || 1;
        e.x += (dx / d) * 8;
        e.y += (dy / d) * 8;
      });
    }
  },
  guerreiro: {
    b(s: Selo, a: Atributos, el: Elemento) {
      puxar(s.x, s.y, 44, 6);
      emArea(s.x, s.y, 28, e => ferir(e, a.dano * 0.4, el));
    },
    h1(s: Selo, a: Atributos, el: Elemento) {
      for (const f of [0.5, 1])
        agendar(0.15 * f, () => {
          if (!J) return;
          vfxOnda(s, el, 22);
          emArea(s.x, s.y, 22, e => ferir(e, a.dano * 0.8, el));
        });
    },
    h2(s: Selo, a: Atributos, el: Elemento) {
      s.berserk = 6;
    }
  },
  assassino: {
    b(s: Selo, a: Atributos, el: Elemento, cor: string) {
      for (let i = 0; i < 2; i++) {
        const e = maisProximo(s, 110, o => Math.random() < 0.7);
        if (!e) break;
        const g = Math.atan2(e.y - s.y, e.x - s.x) + (i ? 0.4 : -0.4);
        J.proj.push(_P(s, a, el, cor, a.dano * 0.7, { vx: Math.cos(g) * 180, vy: Math.sin(g) * 180, ric: 2, perf: 2 }));
      }
    },
    h1(s: Selo, a: Atributos, el: Elemento) {
      const vistos = new Set();
      for (let i = 0; i < 3; i++) {
        const e = maisProximo(s, 60, o => !vistos.has(o));
        if (!e) break;
        vistos.add(e);
        vfxX(e, el);
        ferir(e, a.dano, el);
      }
    },
    h2(s: Selo, a: Atributos) {
      let n = 0;
      for (const e of J.inimigos) {
        if (e.hp <= 0 || dist2(e, s) > 60 * 60) continue;
        e.marca = Math.max(e.marca || 0, a.dano * 1.5);
        if (++n >= 3) break;
      }
    }
  },
  cacador: {
    b(s: Selo, a: Atributos, el: Elemento) {
      const e = maisProximo(s, 140);
      if (e)
        agendar(0.35, () => {
          if (!J) return;
          vfxOnda(e, el, 18);
          emArea(e.x, e.y, 18, o => ferir(o, a.dano * 0.5, el));
        });
    },
    h1(s: Selo, a: Atributos, el: Elemento, cor: string) {
      for (let i = 0; i < 8; i++) {
        const g = (i / 8) * Math.PI * 2 + J.t;
        J.proj.push(_P(s, a, el, cor, a.dano * 0.5, { vx: Math.cos(g) * 150, vy: Math.sin(g) * 150 }));
      }
    },
    h2(s: Selo, a: Atributos, el: Elemento, cor: string) {
      J.armadilhas.push({ fonte: FONTE, x: s.x + rnd(-30, 30), y: s.y + rnd(-30, 30), dano: a.dano * 3, el, cor, raiz: false, vida: 12 });
    }
  },
  mago: {
    b(s: Selo, a: Atributos, el: Elemento, cor: string) {
      for (let i = 0; i < 2; i++) {
        const e = maisProximo(s, 130);
        if (!e) break;
        J.proj.push(_P(s, a, el, cor, a.dano * 0.6, { alvo: e, vel: 110, vida: 2.2, r: 3, explode: 16 }));
      }
    },
    h1(s: Selo, a: Atributos, el: Elemento) {
      const p = pontoDenso(s, 150);
      if (p)
        agendar(0.3, () => {
          if (!J) return;
          vfxOnda(p, el, 30);
          emArea(p.x, p.y, 30, o => ferir(o, a.dano * 1.2, el));
        });
    },
    h2(s: Selo, a: Atributos, el: Elemento) {
      const P = J.jogador;
      vfxSelo(P.x, P.y, el, 35);
      emArea(P.x, P.y, 35, o => {
        ferir(o, a.dano * 0.5, el);
        if (!o.status) o.status = { el, t: J.t };
      });
    }
  },
  invocador: {
    b() {
      const P = J.jogador;
      for (const g of J.gemas) {
        if (dist2(g, P) < 90 * 90) {
          g.vx += (P.x - g.x) * 0.8;
          g.vy += (P.y - g.y) * 0.8;
        }
      }
    },
    h1(s: Selo, a: Atributos, el: Elemento, cor: string) {
      J.crias.push({ fonte: FONTE, x: s.x + rnd(-6, 6), y: s.y + rnd(-6, 6), dano: a.dano * 0.7, el, cor, vida: 7, cd: 0 });
    },
    h2(s: Selo, a: Atributos, el: Elemento, cor: string) {
      const p = pontoDenso(s, 150) || s;
      for (let i = 0; i < 2; i++)
        J.crias.push({ fonte: FONTE, x: p.x + rnd(-10, 10), y: p.y + rnd(-10, 10), dano: a.dano * 0.6, el, cor, vida: 8, cd: 0 });
    }
  },
  mistico: {
    b(s: Selo, a: Atributos, el: Elemento) {
      const vistos = new Set();
      let o = maisProximo(s, 110);
      for (let i = 0; i < 2 && o; i++) {
        vistos.add(o);
        const n = maisProximo(o, 60, x => !vistos.has(x));
        if (!n) break;
        vfxFeixe(o, n, el);
        ferir(n, a.dano * 0.7, el);
        o = n;
      }
      curar(J.vidaMax * 0.01);
    },
    h1(s: Selo, a: Atributos, el: Elemento) {
      const P = J.jogador;
      emArea(P.x, P.y, 40, o => {
        o.lenta = Math.max(o.lenta || 0, 2);
      });
      vfxSelo(P.x, P.y, "natureza", 40);
    },
    h2() {}
  },
  xama: {
    b(s: Selo) {
      const t = J.totens.filter(x => x.dono === s).pop();
      if (t) puxar(t.x, t.y, 50, 4);
    },
    h1() {
      J.cantoGuerra = 4;
    },
    h2(s: Selo, a: Atributos, el: Elemento) {
      const P = J.jogador;
      for (const g of J.gemas)
        if (dist2(g, P) < 110 * 110) {
          g.vx += (P.x - g.x) * 0.8;
          g.vy += (P.y - g.y) * 0.8;
        }
      const p = pontoDenso(s, 120);
      if (p) for (let i = 0; i < 4; i++) aplicarElementoNoSolo(p.x + rnd(-10, 10), p.y + rnd(-10, 10), el);
    }
  }
};
export function aoDisparar(s: Selo, k: ChavePoder, a: Atributos, el: Elemento, cor: string) {
  if (k !== "b" && !SIM.ativo) circuloInvocacao(s.x, s.y + 3, el, 10 + est(s) * 2.5, 0.6, false); // habilidade: círculo pequeno sob o monstro
  if (!(s.desp && s.desp[k])) return;
  const f = (COMPORTAMENTO[L(s).classe] || {})[k];
  if (f)
    try {
      f(s, atribPoder(a, s, k), el, cor);
    } catch (err) {
      relatar("Desperto: o comportamento do poder falhou", err, true);
    }
}
// efeitos contínuos: Fênix, Fúria Berserker, Canto de Guerra e as Uniões
export function atualizarArvore(dt: number) {
  if (!J) return;
  J.danoRec = Math.max(0, (J.danoRec || 0) - ((J.danoRec || 0) * dt) / 3);
  if (J.cantoGuerra > 0) J.cantoGuerra -= dt;
  for (const s of ativos()) {
    if (s.berserk > 0) s.berserk -= dt;
    if (s.desp && s.desp.h2 && L(s).classe === "mistico" && J.vida < J.vidaMax * 0.25 && (J.fenix || 0) < 2) {
      J.fenix = (J.fenix || 0) + 1;
      J.vida = Math.max(J.vida, J.vidaMax * 0.6);
      luzFlash(J.jogador.x, J.jogador.y, "#ffd34a", 90, 0.7);
      emArea(J.jogador.x, J.jogador.y, 60, o => ferir(o, atrib(s).dano * 3, "luz"));
      texto(J.jogador.x, J.jogador.y - 24, "Fênix!", "#ffd34a", 20);
      if ((R.unioes || []).includes("Égide da Fênix")) J.escudo = (J.escudo || 0) + J.vidaMax * 0.3;
    }
  }
  const U = R.unioes || [];
  if (!U.length) return;
  J.tUniao = (J.tUniao || 0) - dt;
  if (J.tUniao > 0) return;
  J.tUniao = 3;
  const P = J.jogador,
    a0 = ativos()[0];
  if (!a0) return;
  const d0 = atrib(a0).dano;
  if (U.includes("Santuário")) curar(J.vidaMax * 0.02);
  if (U.includes("Chuva de Estrelas"))
    for (let i = 0; i < 12; i++) {
      const g = (i / 12) * Math.PI * 2;
      J.proj.push({
        fonte: "combinado",
        x: P.x,
        y: P.y,
        vx: Math.cos(g) * 160,
        vy: Math.sin(g) * 160,
        dano: d0 * 0.6,
        el: "luz",
        cor: "#fff3c4",
        vida: 1.2,
        perf: 2,
        r: 2
      });
    }
  if (U.includes("Círculo Primordial")) {
    const p = pontoDenso(P, 140);
    const els = [...new Set(ativos().map(elementoDe))];
    if (p && els.length >= 2) {
      emArea(p.x, p.y, 30, o => {
        o.status = { el: els[0], t: J.t };
        ferir(o, d0 * 0.8, els[1]);
      });
      vfxSelo(p.x, p.y, els[0], 30);
    }
  }
  if (U.includes("Estouro da Manada"))
    for (let i = 0; i < 3; i++)
      J.crias.push({
        fonte: "combinado",
        x: P.x + rnd(-10, 10),
        y: P.y + rnd(-10, 10),
        dano: d0 * 0.6,
        el: elementoDe(a0),
        cor: COR[elementoDe(a0)],
        vida: 5,
        cd: 0
      });
}
