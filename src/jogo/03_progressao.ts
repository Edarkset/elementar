// Elementar · níveis, telas de escolha, ovos, Ovo Ancestral, missões, Bestiário, captura, cenas, baús, portais e especiais
import "./02_combate.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import {
  $,
  agendar,
  ANCESTRAIS,
  ativos,
  atrib,
  AUTOR,
  bonusLoja,
  calcularSinergia,
  classeExtraDe,
  COR,
  defFonte,
  defPausado,
  defR,
  defRodando,
  defRunSalva,
  dist2,
  elementoBase,
  elementoDe,
  ELS,
  embaralhar,
  escolha,
  est,
  estBase,
  filaEsp,
  filaRamo,
  fNivel,
  FONTE,
  fRecarga,
  gerarSprite,
  gravar,
  J,
  L,
  lg,
  LINHA,
  linhagemDe,
  LOJA,
  lojaAcessivel,
  MAPAS_POR_ERA,
  META,
  NIV,
  nivelLoja,
  NOME_EL,
  nomeForma,
  novoSt,
  pausado,
  poolPacto,
  precoLoja,
  R,
  ramoObj,
  RAR_NOME,
  REAC,
  relatar,
  relMods,
  rnd,
  semente,
  SIM,
  SIN,
  som,
  spriteLinha,
  spriteOvo,
  spriteSelo,
  TAM,
  telaSantuario,
  temRel,
  tom,
  UNIV,
  VH,
  VW
} from "./01_nucleo.js";
import {
  anel,
  cartaProibida,
  curar,
  danoSimples,
  dicaVantagem,
  DIF,
  dificuldade,
  emArea,
  ferir,
  HAB,
  iniciarMapa,
  itemUtil,
  maisProximo,
  MOD,
  morrer,
  parar,
  particulas,
  pontoDenso,
  raio,
  texto,
  tremor
} from "./02_combate.js";
import { mudarSolo } from "./04_ambiente.js";
import { ARTE_IMG, arteMonstro, artesQue, correcaoAltura, fatiarFolha, folhaAnimMonstro, preCarregar } from "./05_arte.js";
import { ganharXp } from "./06_loop.js";
import { bolhaCor } from "./07_cenario.js";
import { silhueta } from "./07b_cenario_desenho.js";
import { spriteUI } from "./07c_cenario_arte.js";
import { circuloInvocacao, vfx, vfxCombinado, vfxEspecial, vfxOnda } from "./08b_efeitos.js";
import { cartaTalisma, nivTal, PD, tal } from "./08d_poderes.js";
import { eventosVitoria } from "./08e_conquistas.js";
import { cartaLenda, passiva } from "./08f_lendas.js";
import { luzFlash } from "./08g_luz.js";
import { UI_ARQ } from "./08h_interface.js";
import { arteCriatura } from "./09_criaturas.js";
import { anunciar } from "./09b_chefes.js";
import { desenharEquipe, desenharNinho, toast } from "./10_desenho.js";
import { menu, telaPacto } from "./11_menu.js";
// ================================================================ progressão: níveis, poderes, evolução
export function aplicarNivel(s: Selo, qtd: number) {
  for (let i = 0; i < qtd; i++) {
    const antes = estBase(s);
    s.nivel++;
    checarEvolucao(s, antes);
  }
}
export function checarEvolucao(s: Selo, antes: number) {
  if (s.mon.ramo == null && s.nivel >= NIV[2] && !filaRamo.includes(s)) filaRamo.push(s);
  if (s.esp == null && s.nivel >= NIV[1] && !filaEsp.includes(s)) filaEsp.push(s);
  const depois = estBase(s);
  if (depois > antes) {
    if (depois === 2) diaria("evolucoes");
    registrarDex(s.mon.id, depois, s.mon.ramo, s.mon.rar);
    R.st.evolucoes[depois]++;
    efeitoEvolucao(s);
    som("evolucao");
    cenaEvolucao(s, antes, depois);
    calcularSinergia();
    desenharEquipe();
  }
}
export function efeitoEvolucao(s: Selo) {
  if (!J) return;
  anel(s.x, s.y, 30, "#ffffff", 0.6);
  anel(s.x, s.y, 50, COR[elementoDe(s)], 0.8);
  particulas(s.x, s.y, COR[elementoDe(s)], 30, 120, 2);
  particulas(s.x, s.y, "#fff3c4", 14, 90);
  tremor(5);
  parar(0.08);
}
export function ramosElegiveis(s: Selo, ignorarPedra?: boolean, base?: boolean) {
  const l = L(s),
    outros = ativos().filter(o => o !== s),
    u = UNIV[R.universo],
    ok = [],
    elDe = base ? elementoBase : elementoDe;
  if (R.pedraAtiva && !ignorarPedra) return [0, 1, 2];
  l.ramos.forEach((r, i) => {
    const c = r.condicao;
    if (c.tipo === "afinidade" && outros.some(o => elDe(o) === l.elemento)) ok.push(i);
    else if (c.tipo === "solitario" && !outros.some(o => elDe(o) === l.elemento)) ok.push(i);
    else if (c.tipo === "alianca" && outros.some(o => L(o).classe === c.classe || classeExtraDe(o) === c.classe)) ok.push(i);
    else if (c.tipo === "regional" && (u.era === c.era || u.elemento === c.elemento)) ok.push(i);
  });
  return ok;
}
export function textoCondicao(r) {
  const c = r.condicao;
  if (c.tipo === "afinidade") return "Afinidade: 1+ aliado do mesmo elemento";
  if (c.tipo === "solitario") return "Solitário: nenhum aliado do mesmo elemento";
  if (c.tipo === "alianca") return `Aliança: aliado ${D.classes[c.classe].nome} (vira classe dupla)`;
  return `Regional: ${D.eras[c.era].nome} ou mapa de ${NOME_EL(c.elemento)} (vira ${NOME_EL(c.elemento)})`;
}

// ================================================================ telas de escolha
export function mostrarCartas(titulo: string, sub: string, cartas: Carta[], op: OpcoesCartas = {}) {
  defPausado(true);
  {
    const tc = $("telaCartas"),
      f = op.fundo && UI_ARQ(op.fundo);
    tc.style.backgroundImage = f ? `linear-gradient(180deg,rgba(8,6,16,.35),rgba(8,6,16,.78)), url(${f.src})` : "";
    tc.classList.toggle("com-fundo", !!f);
  }
  $("cartasTitulo").textContent = titulo;
  $("cartasSub").innerHTML = sub || "";
  const box = $("cartas");
  box.innerHTML = "";
  box.className = "cartas" + (op.grade ? " grade" : "");
  $("cartasRodape").innerHTML = "";
  {
    const rl = $("telaCartas").querySelector(".rolagem") as HTMLElement;
    if (rl && rl.dataset.t !== titulo) {
      rl.scrollTop = 0;
      rl.dataset.t = titulo;
    }
  } // tela nova começa do topo
  cartas.forEach((c, ci) => {
    const b = document.createElement("button");
    b.className = "carta r-" + (c.raridade || "comum");
    b.style.setProperty("--i", String(Math.min(ci, 10)));
    if (c.desab) b.disabled = true;
    if (c.classe) b.classList.add(c.classe);
    if (c.quadros && c.quadros.length) {
      const q0 = c.quadros[0],
        cc = document.createElement("canvas");
      cc.width = q0.width;
      cc.height = q0.height;
      cc.className = (c.classe === "medio" ? "retrato-medio" : "retrato-grande") + " anim-retrato";
      cc.getContext("2d")!.drawImage(q0, 0, 0);
      cc._quadros = c.quadros;
      if (c.quadros.geo) {
        cc._geo = c.quadros.geo;
        cc.classList.add("nitido");
      }
      b.appendChild(cc);
      animarRetratos();
    } else if (c.sprite) {
      const sp = spriteUI(c.sprite),
        cc = document.createElement("canvas");
      cc.width = sp.width;
      cc.height = sp.height;
      cc.getContext("2d")!.drawImage(sp, 0, 0);
      if (c.suave || sp !== c.sprite) cc.style.imageRendering = "auto";
      if (c.classe === "grande") cc.className = "retrato-grande";
      b.appendChild(cc);
    }
    const t = document.createElement("div");
    t.innerHTML = `<b>${c.titulo}</b>${c.texto ? `<small>${c.texto}</small>` : ""}`;
    b.appendChild(t);
    b.onclick = () => {
      if (c.desab || box._escolhendo) return;
      if (SIM.ativo || c.manter) {
        if (!c.manter) $("telaCartas").classList.remove("ativa");
        c.acao(b);
        return;
      }
      box._escolhendo = true;
      b.classList.add("escolhida");
      som("tic"); // a carta escolhida cresce e brilha por um instante
      setTimeout(() => {
        box._escolhendo = false;
        $("telaCartas").classList.remove("ativa");
        c.acao(b);
      }, 200);
    };
    box.appendChild(b);
  });
  box.classList.toggle("revelar", !!op.revelar);
  $("telaCartas").classList.add("ativa");
  (box.querySelector("button:not([disabled])") as HTMLElement)?.focus();
}
export function fechar() {
  $("telaCartas").classList.remove("ativa");
}
// retratos animados nas cartas (quadros "parado" da folha de animação), enquanto a tela estiver aberta
export let animRet = null;
export function animarRetratos() {
  if (animRet) return;
  const passo = (t: number) => {
    const cs = [...(document.querySelectorAll("#cartas canvas.anim-retrato") as NodeListOf<HTMLCanvasElement>)].filter(c => c._quadros);
    if (!cs.length || !$("telaCartas").classList.contains("ativa")) {
      animRet = null;
      return;
    }
    const f = Math.floor((t / 1000) * 6);
    for (const c of cs) {
      if (c._geo) {
        desenharRetrato(c, c._geo, f);
        continue;
      }
      const q = c._quadros[f % c._quadros.length],
        g = c.getContext("2d")!;
      g.clearRect(0, 0, c.width, c.height);
      g.drawImage(q, 0, 0);
    }
    animRet = requestAnimationFrame(passo);
  };
  animRet = requestAnimationFrame(passo);
}
// quadros do monstro parado, em alta resolução, para a tela de escolha; sem folha de animação, usa a imagem fixa
// retrato animado (linha "parado" da folha): caixa calculada pela união de todos os quadros (nada sai cortado), margem,
// ampliação inteira pixel a pixel (pixel nítido, sem borrão) e uma sombra macia no chão; os pés ficam na mesma linha em todos os quadros
export function quadrosForma(id: string, e: number, ramo: number, rar: string) {
  const fa = folhaAnimMonstro(id, e, ramo, rar);
  if (!fa) return null;
  const img = fa.img,
    fo = fa.cor || img,
    f = fatiarFolha(img, 6, 3);
  if (!f.valida || !f.linhas[0].qs.length) return null;
  const L = f.linhas[0],
    ky = correcaoAltura(img);
  let x0 = 1e9,
    x1 = -1e9,
    y0 = 1e9,
    y1 = -1e9;
  for (const q of L.qs) {
    const ax = q.bx - q.ref - L.centro;
    x0 = Math.min(x0, ax);
    x1 = Math.max(x1, ax + q.bw);
    y0 = Math.min(y0, (q.by - L.pe) * ky);
    y1 = Math.max(y1, (q.by + q.bh - L.pe) * ky);
  }
  const w = x1 - x0,
    h = y1 - y0,
    lado = Math.max(w, h) * 1.22,
    K = Math.max(2, Math.round(340 / lado)),
    C = Math.round(lado * K),
    cx = C / 2 - (x0 + w / 2) * K,
    peY = C / 2 + (h / 2) * K - (y1 > 0 ? y1 * K : 0) + C * 0.02;
  const qs = L.qs.map(q => {
    const c = document.createElement("canvas");
    c.width = c.height = C;
    const g = c.getContext("2d")!;
    const sg = g.createRadialGradient(C / 2, peY, 0, C / 2, peY, w * K * 0.55);
    sg.addColorStop(0, "rgba(0,0,0,.45)");
    sg.addColorStop(1, "rgba(0,0,0,0)");
    g.save();
    g.translate(0, peY);
    g.scale(1, 0.22);
    g.translate(0, -peY);
    g.fillStyle = sg;
    g.fillRect(0, peY - w * K, C, w * K * 2);
    g.restore();
    g.imageSmoothingEnabled = false;
    g.drawImage(
      fo,
      q.bx,
      q.by,
      q.bw,
      q.bh,
      Math.round(cx + (q.bx - q.ref - L.centro) * K),
      Math.round(peY + (q.by - L.pe) * ky * K),
      q.bw * K,
      Math.round(q.bh * ky * K)
    );
    return c;
  });
  // geometria em tamanho original: as cartas redesenham o quadro direto nos pixels reais da tela (ver desenharRetrato)
  qs.geo = {
    fo,
    lado,
    w,
    ky,
    peY: lado / 2 + h / 2 - (y1 > 0 ? y1 : 0) + lado * 0.02,
    cx: lado / 2 - (x0 + w / 2),
    qs: L.qs.map(q => ({ bx: q.bx, by: q.by, bw: q.bw, bh: q.bh, dx: q.bx - q.ref - L.centro, dy: (q.by - L.pe) * ky }))
  };
  return qs;
}
// desenha um quadro do retrato no canvas da carta, que tem o tamanho exato da tela do aparelho:
// ampliação inteira (cada pixel da arte vira um bloco igual) e nenhuma segunda ampliação do navegador, que borrava tudo
export function desenharRetrato(c: HTMLCanvasElement, geo, i: number) {
  const d = Math.min(3, window.devicePixelRatio || 1),
    T = Math.round((c.clientWidth || 0) * d);
  if (T > 0 && c.width !== T) {
    c.width = c.height = T;
  }
  const C = c.width,
    g = c.getContext("2d")!;
  g.clearRect(0, 0, C, C);
  const k = Math.max(1, Math.floor(C / geo.lado)),
    o = Math.round((C - geo.lado * k) / 2),
    peY = o + geo.peY * k,
    q = geo.qs[i % geo.qs.length];
  const sg = g.createRadialGradient(C / 2, peY, 0, C / 2, peY, geo.w * k * 0.55);
  sg.addColorStop(0, "rgba(0,0,0,.45)");
  sg.addColorStop(1, "rgba(0,0,0,0)");
  g.save();
  g.translate(0, peY);
  g.scale(1, 0.22);
  g.translate(0, -peY);
  g.fillStyle = sg;
  g.fillRect(0, peY - geo.w * k, C, geo.w * k * 2);
  g.restore();
  g.imageSmoothingEnabled = false;
  g.drawImage(
    geo.fo,
    q.bx,
    q.by,
    q.bw,
    q.bh,
    o + Math.round((geo.cx + q.dx) * k),
    Math.round(peY + q.dy * k),
    q.bw * k,
    Math.round(q.bh * geo.ky * k)
  );
}
export function quadrosRetrato(id: string) {
  return quadrosForma(id, 0, null, "comum");
}
export function proximaEscolha() {
  if (filaRamo.length) return escolherRamo(filaRamo.shift());
  if (filaEsp.length) return escolherEspecial(filaEsp.shift());
  if (J && J.niveisPend > 0) {
    J.niveisPend--;
    return abrirNivel();
  }
  fechar();
  defPausado(false);
  calcularSinergia();
  desenharEquipe();
}
export function escolherRamo(s: Selo) {
  if (!s.mon || s.mon.ramo != null) return proximaEscolha();
  if (LINHA[s.mon.id].ancestral) {
    const antes = estBase(s);
    s.mon.ramo = 0;
    checarEvolucao(s, antes);
    return proximaEscolha();
  }
  const l = L(s),
    ok = ramosElegiveis(s),
    pedra = R.pedraAtiva;
  mostrarCartas(
    `${l.jovem} vai virar Adulto`,
    pedra ? "A Pedra Ancestral liberou os três caminhos." : "Escolha o caminho. Os bloqueados mostram o requisito.",
    l.ramos.map((r, i) => ({
      titulo: r.nome + (r.linhagem !== l.linhagem ? ` · ${D.linhagens[r.linhagem].nome}` : ""),
      raridade: ok.includes(i) ? "raro" : "comum",
      desab: !ok.includes(i),
      texto: `${textoCondicao(r)}<br>Supremo: ${r.supremo}. ${r.ultimate}`,
      classe: "medio",
      quadros: quadrosForma(s.mon.id, 2, i, s.mon.rar),
      sprite: arteMonstro(s.mon.id, 2, i, s.mon.rar) || gerarSprite(s.mon.id + "#2#" + i, TAM[2], COR[r.elemento], { rar: s.mon.rar }),
      acao: () => {
        const antes = estBase(s);
        s.mon.ramo = i;
        if (pedra) R.pedraAtiva = false;
        checarEvolucao(s, antes);
        proximaEscolha();
      }
    }))
  );
}
export function resumoPoderes(s: Selo) {
  const c = D.classes[L(s).classe];
  return `Básico ${s.pod.b} · ${c.h1.nome} ${s.pod.h1} · ${c.h2.nome} ${s.pod.h2}`;
}
// level up no estilo survivor: 3 cartas sorteadas entre os poderes da equipe (com raridade), mais Elo, Talismã e Lenda quando houver.
// Às vezes vem uma carta dourada (+2 níveis). Dá para sortear de novo algumas vezes por run.
// a carta mostra o que muda de verdade: dano por golpe antes -> depois e a recarga, e bolinhas do nível do poder
export function pipsPoder(lv: number, prox: number) {
  let h = "<span class='pips'>";
  for (let i = 1; i <= 5; i++) h += `<i class='${i <= lv ? "tem" : i <= prox ? "novo" : ""}'></i>`;
  return h + "</span>";
}
export function numerosPoder(s: Selo, k: ChavePoder, lv: number, prox: number) {
  try {
    const base = atrib(s).dano * tal.dano();
    if (k === "b") {
      const f0 = 1 + 0.2 * (Math.max(1, lv) - 1),
        f1 = 1 + 0.2 * (prox - 1);
      return ` <span class='bom'>Dano ${Math.round(base)} → ${Math.round((base * f1) / f0)}</span>`;
    }
    const d0 = lv ? Math.round(base * fNivel(lv)) : 0,
      d1 = Math.round(base * fNivel(prox)),
      cd = HAB[L(s).classe][k].cd * fRecarga(prox);
    return ` <span class='bom'>Força ${d0 || "—"} → ${d1}</span> · recarga ${cd.toFixed(1).replace(".", ",")} s`;
  } catch (e) {
    return "";
  }
}
// Ascensão com caminho: depois que um monstro tem todos os poderes no máximo, cada nível dele traz um de três caminhos (dano, cadência
// ou vida) que se acumulam. Nas simulações, do nível 40 em diante 9 em cada 10 escolhas eram a mesma carta "+1 nível": a run ficava sem decisão
// Valores: com +5% / +3% / +6% o robô ia ~1,7 mapa mais fundo (a run ficava bem mais fácil no fim); estes mantêm a escolha sem derrubar a dificuldade
export const ASCENSAO = {
  d: { nome: "Fúria", v: 0.03, txt: "de dano" },
  c: { nome: "Ímpeto", v: 0.02, txt: "de cadência" },
  v: { nome: "Vigor", v: 0.04, txt: "de vida" }
};
export function cartasNivel() {
  const eq = ativos(),
    maxN = Math.max(...eq.map(s => s.nivel)),
    cand: CartaNivel[] = [],
    caminhos = embaralhar(Object.keys(ASCENSAO)) as ("d" | "c" | "v")[];
  for (const s of eq) {
    const c = D.classes[L(s).classe],
      lib = [
        ["b", "Ataque básico", `${c.basico} +20% de dano e +5% de cadência.`],
        ["h1", c.h1.nome, c.h1.desc],
        ...(est(s) >= 1 || estBase(s) >= 1 ? [["h2", c.h2.nome, c.h2.desc]] : [])
      ] as [ChavePoder, string, string][];
    const peso = 1 + (maxN - s.nivel) * 0.35;
    let algum = false;
    for (const [k, nome, desc] of lib) {
      const lv = s.pod[k];
      if (lv >= 5) continue;
      algum = true;
      const prox = lv + 1;
      cand.push({
        peso,
        s,
        k,
        raridade: prox === 5 ? "lendario" : prox === 3 && k !== "b" ? "epico" : prox >= 2 ? "raro" : "incomum",
        titulo: `${nome} ${lv ? `${lv} → ${prox}` : "(novo)"}`,
        texto: `${pipsPoder(lv, prox)}<b style="color:${COR[elementoDe(s)]}">${nomeForma(s)}</b> · nível ${s.nivel}. ${desc}${numerosPoder(s, k, lv, prox)}${k !== "b" && prox === 3 ? " Libera um modificador." : ""}${prox === 5 ? " Nível máximo!" : ""}`
      });
    }
    if (!algum) {
      const k = caminhos[cand.filter(c => c.asc).length % caminhos.length],
        A = ASCENSAO[k],
        tem = (s.asc && s.asc[k]) || 0; // monstros diferentes oferecem caminhos diferentes
      cand.push({
        peso: 0.8,
        s,
        asc: k,
        raridade: "lendario",
        titulo: `Ascensão de ${nomeForma(s)}: ${A.nome}`,
        texto: `Todos os poderes no máximo: +1 nível (+${Math.round(DIF.nivelAtrib * 100)}% em todos os atributos) e <span class='bom'>+${Math.round(A.v * 100)}% ${A.txt}</span> para sempre nesta run${tem ? ` (já tem +${Math.round(tem * A.v * 100)}%)` : ""}.`
      });
    }
  }
  const sorteio = [],
    pool = cand.slice();
  while (sorteio.length < 3 && pool.length) {
    const tot = pool.reduce((t, c) => t + c.peso, 0);
    let x = Math.random() * tot;
    const i = pool.findIndex(c => (x -= c.peso) <= 0);
    const c = pool.splice(i < 0 ? 0 : i, 1)[0];
    sorteio.push(c);
  }
  if (sorteio.length && Math.random() < 0.07 + ((SIN.rm && SIN.rm.talisma) || 0) * 0.1) {
    const c = escolha(sorteio.filter(c => !c.asc && c.s.pod[c.k] <= 3));
    if (c) {
      c.dourada = true;
      c.raridade = "lendario";
      c.titulo = "✦ " + c.titulo.replace(/(\d) → (\d)/, (m, a) => `${a} → ${Math.min(5, +a + 2)}`);
      {
        const lv = c.s.pod[c.k],
          p2 = Math.min(5, lv + 2);
        c.texto = c.texto
          .replace(pipsPoder(lv, lv + 1), pipsPoder(lv, p2))
          .replace(numerosPoder(c.s, c.k, lv, lv + 1), numerosPoder(c.s, c.k, lv, p2));
      }
      c.texto += " <b>Carta dourada: +2 níveis!</b>";
    }
  }
  return sorteio;
}
export function aplicarCartaNivel(c: CartaNivel) {
  const s = c.s;
  // escolha com efeito visível na hora: o monstro brilha, solta uma onda da cor do elemento e mostra o ganho
  if (J && !SIM.ativo && s.x != null) {
    s._pop = 1;
    const cor = COR[elementoDe(s)];
    anel(s.x, s.y, 30, cor, 0.5);
    particulas(s.x, s.y, cor, 18, 90, 2);
    luzFlash(s.x, s.y, cor, 60, 0.4);
    texto(s.x, s.y - 20, c.asc ? "Ascensão!" : "Mais forte!", cor, 14);
  }
  if (c.asc) {
    s.asc = s.asc || { d: 0, c: 0, v: 0 };
    s.asc[c.asc] = (s.asc[c.asc] || 0) + 1;
    aplicarNivel(s, 1);
    if (J) calcularSinergia();
    return proximaEscolha();
  }
  const vezes = c.dourada ? Math.min(2, 5 - s.pod[c.k]) : 1;
  let mod = false;
  for (let i = 0; i < vezes; i++) {
    s.pod[c.k]++;
    aplicarNivel(s, 1);
    if (c.k !== "b" && s.pod[c.k] === 3 && s.mod[c.k] == null) mod = true;
  }
  if (c.dourada) {
    som("jackpot");
    if (J) luzFlash(J.jogador.x, J.jogador.y, "#ffd34a", 90, 0.6);
  }
  if (mod) return escolherMod(s, c.k);
  proximaEscolha();
}
export function abrirNivel() {
  if (R.rerolagens == null) R.rerolagens = 2 + nivelLoja("oraculo");
  const sorteadas = cartasNivel();
  const cartas: Carta[] = sorteadas.map(c => ({
    titulo: c.titulo,
    sprite: spriteSelo(c.s),
    raridade: c.raridade,
    texto: c.texto,
    classe: c.dourada ? "dourada" : null,
    acao: () => aplicarCartaNivel(c)
  }));
  D.elos.forEach(e => {
    const a = ativos().find(s => s.mon.id === e.a),
      b = ativos().find(s => s.mon.id === e.b);
    if (a && b && !R.elos.includes(e.nome) && (estBase(a) >= 2 || estBase(b) >= 2))
      cartas.push({
        titulo: `Elo: ${e.nome}`,
        raridade: "epico",
        texto: `${e.desc} (+20% de dano e cadência para os dois)`,
        acao: () => {
          R.elos.push(e.nome);
          tremor(4);
          calcularSinergia();
          proximaEscolha();
        }
      });
  });
  const ct = cartaTalisma();
  if (ct) cartas.push(ct);
  const cl = cartaLenda();
  if (cl) cartas.push(cl);
  if (cartas.some(c => c.raridade === "lendario")) som("ding");
  // ritmo: em nível ímpar sem carta especial, a melhor carta entra sozinha (metade das interrupções; a força da equipe é a mesma)
  const RANK: Record<string, number> = { comum: 0, incomum: 1, raro: 2, epico: 3, lendario: 4 },
    especial = false;
  if (J.nivel % 2 === 1 && !especial && sorteadas.length && !META.escolhaManual) {
    const c = cartas
      .slice(0, sorteadas.length)
      .sort((a, b) => +(b.classe === "dourada") - +(a.classe === "dourada") || (RANK[b.raridade] || 0) - (RANK[a.raridade] || 0))[0];
    if (!SIM.ativo) texto(J.jogador.x, J.jogador.y - 30, `Nível ${J.nivel}: ${c.titulo}`, "#ffe6a6", 13);
    c.acao();
    return;
  }
  {
    const cp = cartaProibida();
    if (cp) cartas.push(cp);
  }
  mostrarCartas(`Nível ${J.nivel}`, "Escolha uma carta.", cartas, { revelar: true });
  if (R.rerolagens > 0) {
    const b = document.createElement("button");
    b.className = "botao sec";
    b.textContent = `Sortear de novo (${R.rerolagens})`;
    b.onclick = () => {
      R.rerolagens--;
      som("tic");
      abrirNivel();
    };
    $("cartasRodape").appendChild(b);
  }
}
export function escolherMod(s: Selo, k: ChavePoder) {
  const c = D.classes[L(s).classe][k];
  mostrarCartas(
    `${c.nome}: modificador`,
    "Escolha como esta habilidade vai funcionar daqui pra frente.",
    c.mods.map((m, i) => ({
      titulo: m.split(":")[0],
      texto: m.split(":").slice(1).join(":").trim(),
      raridade: "epico",
      acao: () => {
        s.mod[k] = i;
        proximaEscolha();
      }
    }))
  );
}

// ================================================================ ovos, filhotes, reserva, troca
export function sortearRaridade() {
  const r = Math.random(),
    o = D.ovos.raridades;
  const bonus = Math.min(0.15, R.profundidade * 0.01) + MOD("sorte");
  return r < o.lendario.chance + bonus * 0.3 ? "lendario" : r < o.lendario.chance + o.raro.chance + bonus ? "raro" : "comum";
}
export function receberMonstro(mon: Monstro, origem: string) {
  const vazio = R.selos.find(s => !s.mon);
  if (vazio) {
    const outros = ativos();
    vazio.nivel = Math.max(vazio.nivel, Math.round((outros.reduce((t, s) => t + s.nivel, 0) / Math.max(1, outros.length)) * 0.6) || 1);
    vazio.mon = mon;
    if (J) {
      vazio.x = J.jogador.x;
      vazio.y = J.jogador.y;
      vazio.cd = 0;
      vazio.cd1 = 2;
      vazio.cd2 = 4;
      efeitoInvocacao(vazio);
    }
    toast(`${LINHA[mon.id].filhote} (${RAR_NOME[mon.rar]}) entrou na equipe!${origem ? `<br><small>${origem}</small>` : ""}`);
    if (vazio.mon.ramo == null && vazio.nivel >= NIV[2]) filaRamo.push(vazio);
  } else {
    R.reserva.push(mon);
    toast(
      `${LINHA[mon.id].filhote} (${RAR_NOME[mon.rar]}) foi para a reserva.${origem ? `<br><small>${origem}</small>` : ""}<br><small>Toque num retrato para trocar.</small>`
    );
  }
  const novo = !META.liberados.includes(mon.id);
  if (novo) META.liberados.push(mon.id);
  registrarDex(mon.id, 0, null, mon.rar);
  if (novo) cenaDescoberta(mon);
  calcularSinergia();
  desenharEquipe();
  if (filaRamo.length && !pausado) proximaEscolha();
}
export function efeitoInvocacao(s: Selo) {
  if (!J) return;
  const cor = COR[elementoDe(s)];
  circuloInvocacao(s.x, s.y + 3, elementoDe(s), 26, 1.3, true);
  anel(s.x, s.y, 10, "#ffffff", 0.4);
  anel(s.x, s.y, 36, cor, 0.7);
  particulas(s.x, s.y, cor, 26, 110, 2);
  tremor(3);
}
// seta na borda da tela apontando para algo valioso fora da vista
export function setaFora(x: number, y: number, cor: string | CanvasGradient | CanvasPattern) {
  if (x >= 6 && y >= 6 && x <= VW - 6 && y <= VH - 6) return;
  const cx = VW / 2,
    cy = VH / 2,
    ang = Math.atan2(y - cy, x - cx),
    m = Math.min((VW / 2 - 10) / Math.abs(Math.cos(ang) || 1e-6), (VH / 2 - 10) / Math.abs(Math.sin(ang) || 1e-6));
  const ax = cx + Math.cos(ang) * m,
    ay = cy + Math.sin(ang) * m,
    p = 1 + 0.15 * Math.sin(J.t * 8);
  lg.fillStyle = cor;
  lg.beginPath();
  lg.moveTo(ax + Math.cos(ang) * 7 * p, ay + Math.sin(ang) * 7 * p);
  lg.lineTo(ax + Math.cos(ang + 2.5) * 5 * p, ay + Math.sin(ang + 2.5) * 5 * p);
  lg.lineTo(ax + Math.cos(ang - 2.5) * 5 * p, ay + Math.sin(ang - 2.5) * 5 * p);
  lg.fill();
}
export function spawnOvo(rar?: Raridade, id?: string, x?: number, y?: number) {
  const pool = poolPacto();
  id = id || escolha(pool);
  rar = rar || sortearRaridade();
  if (!SIM.ativo && J) {
    if (rar === "lendario") {
      anunciar({ el: "luz" }, "Ovo Lendário!", "Siga a luz dourada.");
      som("jackpot");
    } else if (rar === "raro") som("ding");
  }
  const a = Math.random() * Math.PI * 2,
    d = rnd(55, 95);
  J.ovosMapa.push({ x: x ?? J.jogador.x + Math.cos(a) * d, y: y ?? J.jogador.y + Math.sin(a) * d, id, rar, vida: 35 });
}
export function spawnFilhote() {
  const id = escolha(poolPacto()),
    a = Math.random() * Math.PI * 2,
    d = rnd(60, 90);
  J.selvagens.push({
    x: J.jogador.x + Math.cos(a) * d,
    y: J.jogador.y + Math.sin(a) * d,
    id,
    rar: Math.random() < 0.2 ? "incomum" : "comum",
    vida: 25
  });
  if (!R.avisoFilhote) {
    R.avisoFilhote = true;
    toast("Um filhote selvagem apareceu! Encoste nele para capturar.");
  } else texto(J.selvagens[J.selvagens.length - 1].x, J.selvagens[J.selvagens.length - 1].y - 14, "Filhote!", "#fff3c4", 12);
}
export function pegarOvo(o) {
  if (R.ninho.length >= D.ovos.ninho_max) {
    ganharXp(10);
    texto(o.x, o.y - 8, "Ninho cheio: +XP", "#9fd6d0", 13);
    return;
  }
  R.ninho.push({ id: o.id, rar: o.rar, prog: 0, alvo: D.ovos.raridades[o.rar].xp });
  R.st.ovos++;
  particulas(o.x, o.y, "#fff3c4", 12, 70);
  anel(o.x, o.y, 14, "#fff3c4", 0.4);
  texto(o.x, o.y - 10, `Ovo ${RAR_NOME[o.rar]}!`, o.rar === "lendario" ? "#ffd34a" : "#fff3c4", 15);
  desenharNinho();
}
// ================================================================ Ovo Ancestral (Dragões lendários do Covil)
export function surgirOvoAncestral() {
  const opts = ANCESTRAIS.filter(a => R.pacto.includes(a.elemento));
  if (!opts.length) return;
  const a = escolha(opts),
    ang = Math.random() * Math.PI * 2,
    d = rnd(200, 260);
  J.ovoAnc = { x: J.jogador.x + Math.cos(ang) * d, y: J.jogador.y + Math.sin(ang) * d, id: a.id, el: a.elemento };
  R.ancestral = { estado: "mapa", id: a.id, el: a.elemento };
  toast(`Um <b>${a.ovo}</b> apareceu no mapa!<br><small>Siga a coluna de luz.</small>`);
}
export function pegarOvoAncestral(o) {
  const l = LINHA[o.id];
  R.ancestral = { estado: "chocando", id: o.id, el: o.el, prog: 0, alvo: D.ancestral_regras.chocar_seg };
  R.st.ovoAncestral = (R.st.ovoAncestral || 0) + 1;
  particulas(o.x, o.y, COR[o.el], 40, 140, 2);
  anel(o.x, o.y, 40, COR[o.el], 0.5);
  tremor(5);
  toast(`Você pegou o <b>${l.ovo}</b>!<br><small>Ele choca com o tempo de jogo, e mais rápido a cada abate.</small>`);
  desenharNinho();
}
export function checarAncestral() {
  const A = R.ancestral;
  if (!A || A.estado !== "chocando" || A.prog < A.alvo) return;
  A.estado = "chocado";
  const l = LINHA[A.id];
  R.st.dragaoChocado = 1;
  if (J) {
    particulas(J.jogador.x, J.jogador.y, COR[A.el], 80, 180, 2);
    anel(J.jogador.x, J.jogador.y, 90, COR[A.el], 0.6);
    tremor(10);
    parar(0.15);
  }
  receberMonstro({ id: A.id, rar: "lendario", ramo: null }, `O ${l.ovo} chocou! Um Dragão Ancestral foi liberado.`);
  desenharNinho();
}
export function chocar(ov) {
  R.st.chocados++;
  diaria("chocados");
  const mon = { id: ov.id, rar: ov.rar === "raro" ? "raro" : ov.rar, ramo: null };
  cenaChoco(mon);
  particulas(J.jogador.x, J.jogador.y, "#fff3c4", 30, 120, 2);
  anel(J.jogador.x, J.jogador.y, 30, COR[LINHA[ov.id].elemento], 0.7);
  tremor(4);
  receberMonstro(mon, "Chocou no Ninho");
}
export function abrirEquipe(seloIdx: number) {
  if (!J || J.fim) return;
  const s = R.selos[seloIdx];
  const cartas: Carta[] = R.reserva.map((m, i) => ({
    titulo: `${LINHA[m.id].filhote} (${RAR_NOME[m.rar]})`,
    sprite: spriteLinha(m.id, m.rar),
    raridade: m.rar,
    texto: `${NOME_EL(LINHA[m.id].elemento)} · ${D.classes[LINHA[m.id].classe].nome} · ${D.linhagens[LINHA[m.id].linhagem].nome}<br>No Selo ${seloIdx + 1} entra no nível ${s.mon ? s.nivel : "novo"}${m.ramo != null ? `, forma ${LINHA[m.id].ramos[m.ramo].nome}` : ""}.`,
    desab: s.trocaCd > 0,
    acao: () => {
      trocar(seloIdx, i);
      proximaEscolha();
    }
  }));
  const sub = s.mon
    ? `Selo ${seloIdx + 1}: ${nomeForma(s)}, nível ${s.nivel}. ${resumoPoderes(s)}<br>Quem entra no lugar mantém nível, poderes e modificadores do Selo.${s.trocaCd > 0 ? ` Recarga: ${Math.ceil(s.trocaCd)} s.` : ""}`
    : `Selo ${seloIdx + 1} vazio.`;
  cartas.push({ titulo: "Fechar", texto: "", acao: () => proximaEscolha() });
  mostrarCartas(
    "Equipe e reserva",
    sub + (R.reserva.length ? "" : "<br>A reserva está vazia. Choque ovos e capture filhotes para ter opções."),
    cartas
  );
}
export function trocar(si: number, ri: number) {
  R.st.trocas++;
  const s = R.selos[si],
    novo = R.reserva.splice(ri, 1)[0];
  if (s.mon) {
    R.reserva.push({ ...s.mon });
  } else {
    const outros = ativos();
    s.nivel = Math.max(1, Math.round((outros.reduce((t, o) => t + o.nivel, 0) / Math.max(1, outros.length)) * 0.6));
  }
  s.mon = novo;
  s.tmpRamo = null;
  s.trocaCd = J && R.mapaNaEra !== 0 ? 15 : 0;
  s.x = J.jogador.x;
  s.y = J.jogador.y;
  efeitoInvocacao(s);
  s.cdEsp = Math.max(s.cdEsp || 0, 8);
  // entrada em cena: quem entra chega com um golpe em área do seu elemento (troca vira jogada, não só arrumação)
  if (J && !J.fim) {
    const el = elementoDe(s),
      dano = atrib(s).dano * 6;
    defFonte("habilidade");
    J.inimigos.forEach(e => {
      if (e.hp > 0 && Math.hypot(e.x - s.x, e.y - s.y) < 55) ferir(e, dano, el);
    });
    vfxOnda({ x: s.x, y: s.y }, el, 55);
    luzFlash(s.x, s.y, COR[el], 80, 0.4);
    tremor(4);
    if (!SIM.ativo) texto(s.x, s.y - 24, "Entrou em cena!", COR[el], 14);
  }
  if (s.mon.ramo == null && s.nivel >= NIV[2] && !filaRamo.includes(s)) filaRamo.push(s);
  if (s.esp == null && s.nivel >= NIV[1] && !filaEsp.includes(s)) filaEsp.push(s);
  calcularSinergia();
  desenharEquipe();
}
export function abrirBolsa() {
  if (!J || J.fim || pausado) return;
  const ks = Object.keys(D.itens) as ItemBolsa[];
  const cartas: Carta[] = ks.map(k => ({
    titulo: `${D.itens[k].nome} ×${R.itens[k]}`,
    texto: D.itens[k].efeito,
    desab: R.itens[k] <= 0,
    raridade: k === "chamado" ? "lendario" : k === "incenso" ? "raro" : "incomum",
    acao: () => usarItem(k)
  }));
  cartas.push({ titulo: "Fechar", acao: () => proximaEscolha() });
  mostrarCartas("Bolsa", "Itens caem de elites, baús de mini-chefe e chefes.", cartas);
}
export function usarItem(k: ItemBolsa) {
  R.itens[k]--;
  R.st.itens++;
  if (k === "incenso") {
    const id = escolha(poolPacto());
    receberMonstro({ id, rar: "raro", ramo: null }, "Invocado com Incenso");
    particulas(J.jogador.x, J.jogador.y, "#c4ccd8", 30, 120, 2);
    return proximaEscolha();
  }
  if (k === "chamado") {
    const id = escolha(poolPacto());
    receberMonstro({ id, rar: "lendario", ramo: null }, "Atendeu ao Chamado Lendário");
    anel(J.jogador.x, J.jogador.y, 80, "#ffd34a", 0.9);
    tremor(8);
    return proximaEscolha();
  }
  if (k === "pedra") {
    R.pedraAtiva = true;
    toast("Pedra Ancestral ativa: a próxima evolução para Adulto libera os três caminhos.");
    return proximaEscolha();
  }
  if (k === "pena") {
    R.selos.forEach(s => (s.trocaCd = 0));
    toast("Trocas liberadas.");
    return proximaEscolha();
  }
  if (k === "doce") {
    mostrarCartas(
      "Mel Ancestral",
      "Qual Selo ganha +1 nível?",
      ativos().map(s => ({
        titulo: nomeForma(s),
        sprite: spriteSelo(s),
        texto: `Nível ${s.nivel} → ${s.nivel + 1}`,
        acao: () => {
          aplicarNivel(s, 1);
          proximaEscolha();
        }
      }))
    );
  }
}

// ================================================================ missões do dia: 3 objetivos sorteados pela data, Essência por missão e sequência de dias
export const TIPOS_DIARIA: Record<string, { txt: (n: number) => string; alvos: number[] }> = {
  abates: { txt: (n: number) => `Derrote ${n} inimigos`, alvos: [300, 500, 800] },
  capturas: { txt: (n: number) => `Capture ${n} filhotes selvagens`, alvos: [2, 3, 5] },
  chocados: { txt: (n: number) => `Choque ${n} ovos`, alvos: [2, 3, 4] },
  evolucoes: { txt: (n: number) => `Evolua ${n} monstros para Adulto`, alvos: [1, 2, 3] },
  reacoes: { txt: (n: number) => `Provoque ${n} reações elementais`, alvos: [30, 60, 100] },
  chefes: { txt: (n: number) => `Derrote ${n} chefes`, alvos: [1, 2, 3] },
  eventos: { txt: (n: number) => `Complete ${n} eventos do mapa`, alvos: [2, 3, 5] }
};
export function hojeStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
export function diarias() {
  const hoje = hojeStr();
  let D2 = META.diarias;
  if (!D2 || D2.dia !== hoje) {
    const r = semente("diaria" + hoje),
      tipos = Object.keys(TIPOS_DIARIA),
      lista = [];
    while (lista.length < 3) {
      const t = tipos[Math.floor(r() * tipos.length)];
      if (lista.some(x => x.t === t)) continue;
      const al = TIPOS_DIARIA[t].alvos;
      lista.push({ t, alvo: al[Math.floor(r() * al.length)], prog: 0, feito: false });
    }
    const ontem = new Date(Date.now() - 864e5),
      ontemStr = ontem.getFullYear() + "-" + String(ontem.getMonth() + 1).padStart(2, "0") + "-" + String(ontem.getDate()).padStart(2, "0");
    const seq = D2 && D2.ultimoDiaFeito && (D2.ultimoDiaFeito === ontemStr || D2.ultimoDiaFeito === hoje) ? D2.seq || 0 : 0;
    D2 = META.diarias = { dia: hoje, lista, seq, ultimoDiaFeito: D2 && D2.ultimoDiaFeito };
  }
  return D2;
}
export function diaria(t: string, n?: number) {
  if (SIM.ativo || !R || R.teste) return;
  const D2 = diarias();
  let mudou = false;
  for (const m of D2.lista) {
    if (m.t !== t || m.feito) continue;
    m.prog = Math.min(m.alvo, m.prog + (n || 1));
    mudou = true;
    if (m.prog >= m.alvo) {
      m.feito = true;
      META.essencia += 40;
      toast(`<b>Missão do dia completa!</b><br><small>${TIPOS_DIARIA[t].txt(m.alvo)} · +40 de Essência</small>`);
      som("ding");
      if (D2.lista.every(x => x.feito)) {
        D2.seq = (D2.seq || 0) + 1;
        D2.ultimoDiaFeito = hojeStr();
        const bonus = 60 + Math.min(7, D2.seq) * 10;
        META.essencia += bonus;
        setTimeout(
          () =>
            toast(
              `<b>As 3 missões de hoje!</b><br><small>+${bonus} de Essência · sequência de ${D2.seq} dia${D2.seq > 1 ? "s" : ""}</small>`
            ),
          2600
        );
      }
    }
  }
  if (mudou && Math.random() < 0.1) gravar();
}
export function telaDiarias() {
  $("telaMenu").classList.remove("ativa");
  const D2 = diarias(),
    feitas = D2.lista.filter(m => m.feito).length;
  mostrarCartas(
    "Missões do dia",
    `Renovam à meia-noite. Cada uma vale 40 de Essência; as três juntas dão um bônus que cresce com a sequência de dias (agora: ${D2.seq || 0}).`,
    [
      ...D2.lista.map(m => ({
        titulo: TIPOS_DIARIA[m.t].txt(m.alvo),
        raridade: m.feito ? "lendario" : "raro",
        manter: true,
        texto: m.feito
          ? "Completa!"
          : `${m.prog}/${m.alvo}<div class="prog-diaria"><b style="width:${(m.prog / m.alvo) * 100}%"></b></div>`,
        acao: () => {}
      })),
      { titulo: "Voltar", texto: feitas === 3 ? "Volte amanhã para novas missões." : "", acao: () => menu() }
    ]
  );
}
// ================================================================ Bestiário: cada forma descoberta (8 por linhagem) e cada raridade vista
// META.dex[id] = {f: bits das 8 formas (0 filhote, 1 jovem, 2-4 adultos, 5-7 supremos), r: raridades vistas}.
// A cada 10 formas novas, Essência de presente. Descobrir algo novo mostra "Novo no Bestiário!".
export const FORMAS_TOTAL = () => D.linhas.length * 8;
export function celulaForma(e: number, ramo: number) {
  return e <= 1 ? e : e === 2 ? 2 + (ramo ?? 0) : 5 + (ramo ?? 0);
}
export function registrarDex(id: string, e: number, ramo: number, rar: string) {
  if (SIM.ativo && !SIM.dex) return;
  META.dex = META.dex || {};
  const d = META.dex[id] || (META.dex[id] = { f: 0, r: [] });
  const c = celulaForma(e, ramo);
  let novo = false;
  if (!(d.f & (1 << c))) {
    d.f |= 1 << c;
    novo = true;
  }
  if (rar && !d.r.includes(rar)) {
    d.r.push(rar);
    if (rar !== "comum") novo = true;
  }
  if (novo && J && !SIM.ativo) {
    texto(J.jogador.x, J.jogador.y - 38, "Novo no Bestiário!", "#9fe0ff", 14);
    som("ding");
  }
  const tot = formasVistas(),
    marco = Math.floor(tot / 10);
  META.dexMarco = META.dexMarco ?? marco;
  if (marco > META.dexMarco) {
    const ganho = (marco - META.dexMarco) * 50;
    META.dexMarco = marco;
    META.essencia += ganho;
    if (!SIM.ativo) toast(`<b>Bestiário: ${tot} formas descobertas!</b><br><small>+${ganho} de Essência</small>`);
  }
  if (!SIM.ativo) gravar();
}
export function formasVistas() {
  let n = 0;
  for (const id in META.dex || {}) {
    let f = META.dex[id].f;
    while (f) {
      n += f & 1;
      f >>= 1;
    }
  }
  return n;
}
export function nomeFormaCel(l, c: number) {
  return c === 0 ? l.filhote : c === 1 ? l.jovem : c < 5 ? l.ramos[c - 2].nome : l.ramos[c - 5].supremo;
}
export function telaBestiario() {
  $("telaMenu").classList.remove("ativa");
  const dex = META.dex || {},
    tot = formasVistas(),
    prox = (Math.floor(tot / 10) + 1) * 10;
  const cartas = D.linhas.map(l => {
    const d = dex[l.id],
      n = d ? [...Array(8)].reduce((a, _, i) => a + ((d.f >> i) & 1), 0) : 0,
      conhecido = META.liberados.includes(l.id) || n > 0;
    let melhor = 0;
    if (d)
      for (let c = 7; c >= 0; c--)
        if (d.f & (1 << c)) {
          melhor = c;
          break;
        }
    const e = melhor <= 1 ? melhor : melhor < 5 ? 2 : 3,
      ramo = melhor >= 5 ? melhor - 5 : melhor >= 2 ? melhor - 2 : null,
      spr = conhecido ? arteMonstro(l.id, e, ramo, "comum") || spriteLinha(l.id, "comum") : null;
    return {
      titulo: conhecido ? nomeFormaCel(l, melhor) : "???",
      raridade: n >= 8 ? "lendario" : n >= 5 ? "epico" : n >= 2 ? "raro" : "comum",
      sprite: spr ? (conhecido && n ? spr : silhueta(spr, "#1a1426")) : gerarSprite("dex?", 12, "#2a2238"),
      texto: conhecido
        ? `<span style="color:${COR[l.elemento]}">${NOME_EL(l.elemento)}</span> · formas ${n}/8${d && d.r.length > 1 ? ` · ${d.r.length} raridades` : ""}<span class="prog-dex"><b style="width:${(n / 8) * 100}%;background:${COR[l.elemento]}"></b></span>`
        : "Ainda não encontrado",
      manter: true,
      classe: conhecido ? (n >= 8 ? "completo" : null) : "oculto",
      acao: () => telaDexLinha(l)
    };
  });
  mostrarCartas(
    "Bestiário",
    `Formas descobertas: <b>${tot}</b> de ${FORMAS_TOTAL()} · próxima recompensa em ${prox} (+50 de Essência). Evolua, capture e choque ovos para completar.`,
    [...cartas, { titulo: "Voltar", texto: "", acao: () => menu() }],
    { grade: true, fundo: "ui__livro" }
  );
}
export function telaDexLinha(l) {
  const d = (META.dex || {})[l.id] || { f: 0, r: [] };
  const formas = [...Array(8)].map((_, c) => {
    const e = c <= 1 ? c : c < 5 ? 2 : 3,
      ramo = c >= 5 ? c - 5 : c >= 2 ? c - 2 : null,
      visto = !!(d.f & (1 << c)),
      spr = arteMonstro(l.id, e, ramo, "comum") || gerarSprite(l.id + "#" + e + "#" + (ramo ?? "-"), TAM[e], COR[l.elemento]);
    return {
      titulo: visto ? nomeFormaCel(l, c) : "???",
      raridade: visto ? (c >= 5 ? "lendario" : c >= 2 ? "epico" : "raro") : "comum",
      sprite: visto ? spr : silhueta(spr, "#1a1426"),
      texto:
        ["Filhote", "Jovem", "Adulto", "Adulto", "Adulto", "Supremo", "Supremo", "Supremo"][c] +
        (visto && c >= 2 ? ` · ${NOME_EL(l.ramos[(c - 2) % 3].elemento)}` : ""),
      manter: true,
      acao: () => {}
    };
  });
  mostrarCartas(
    l.filhote,
    `Raridades vistas: ${d.r.length ? d.r.map(r => RAR_NOME[r]).join(", ") : "nenhuma"}. Cada caminho de evolução leva a um Adulto e a um Supremo diferentes.`,
    [...formas, { titulo: "Voltar", texto: "", acao: () => telaBestiario() }],
    { grade: true, fundo: "ui__livro" }
  );
}

// ================================================================ captura com suspense e choco animado
// o filhote é selado num sigilo que balança três vezes; incomum e acima podem escapar (e fugir mais rápido; dá para tentar de novo)
export function tentarCaptura(f) {
  if (f.selando) return;
  f.selando = true;
  const chance = f.rar === "comum" ? 1 : f.rar === "incomum" ? 0.72 : 0.55,
    ok = Math.random() < chance,
    x0 = f.x,
    y0 = f.y,
    cor = COR[LINHA[f.id].elemento];
  f.vida = 99;
  particulas(x0, y0, "#fff3c4", 10, 60);
  tremor(2);
  vfx({
    max: 1.5,
    desenhar(ox: number, oy: number, q: number) {
      const x = x0 - ox,
        y = y0 - oy,
        t = q * 1.5,
        enc = Math.min(1, t / 0.3),
        bal = t > 0.35 && t < 1.25 ? Math.sin(((t - 0.35) / 0.3) * Math.PI) * Math.max(0, 1 - (t - 0.35) / 0.9) * 0.45 : 0;
      lg.save();
      lg.translate(x, y - 4 * (1 - enc));
      lg.rotate(bal);
      lg.globalCompositeOperation = "lighter";
      lg.globalAlpha = 0.5 + 0.3 * Math.sin(t * 20);
      lg.drawImage(bolhaCor(cor), -10, -10, 20, 20);
      lg.globalCompositeOperation = "source-over";
      lg.globalAlpha = 1;
      // sigilo: disco dourado com runa do elemento
      lg.fillStyle = "#3a2a12";
      lg.beginPath();
      lg.arc(0, 0, 4.6, 0, Math.PI * 2);
      lg.fill();
      const g = lg.createRadialGradient(-1.4, -1.6, 0.4, 0, 0, 4.4);
      g.addColorStop(0, "#fff4c4");
      g.addColorStop(0.6, "#e0b65a");
      g.addColorStop(1, "#8a5a12");
      lg.fillStyle = g;
      lg.beginPath();
      lg.arc(0, 0, 4, 0, Math.PI * 2);
      lg.fill();
      lg.fillStyle = cor;
      lg.beginPath();
      lg.arc(0, 0, 1.6, 0, Math.PI * 2);
      lg.fill();
      lg.strokeStyle = "#5a3a0a";
      lg.lineWidth = 0.4;
      lg.beginPath();
      lg.moveTo(-4, 0);
      lg.lineTo(4, 0);
      lg.stroke();
      lg.restore();
    }
  });
  agendar(1.3, () => {
    if (!J) return;
    if (ok) {
      f.vida = 0;
      particulas(x0, y0, cor, 22, 90, 2);
      particulas(x0, y0, "#ffe9a0", 12, 60);
      anel(x0, y0, 22, "#ffd34a", 0.5);
      tremor(3);
      som("ding");
      R.st.capturas++;
      diaria("capturas");
      if (!SIM.ativo) texto(x0, y0 - 16, "Capturado!", "#ffd34a", 16);
      receberMonstro({ id: f.id, rar: f.rar, ramo: null }, "Capturado!");
    } else {
      f.selando = false;
      f.vida = 14;
      f.fugaRapida = 1;
      f.imune = 1;
      particulas(x0, y0, "#ffffff", 14, 80);
      tremor(2);
      if (!SIM.ativo) texto(x0, y0 - 14, "Escapou! Tente de novo", "#ff9a7a", 13);
    }
  });
}
// ovo chocando: treme cada vez mais, racha, clarão e o monstro aparece (a cena dura ~2,6 s; um toque pula)
export function cenaChoco(mon: Monstro) {
  if (SIM.ativo || !J) return;
  const l = LINHA[mon.id],
    cor = COR[l.elemento],
    ovo = spriteOvo(l.elemento, mon.rar === "lendario" ? "lendario" : mon.rar === "comum" || mon.rar === "incomum" ? "comum" : "raro");
  const q = quadrosForma(mon.id, 0, null, mon.rar),
    novo = (q && q[0]) || spriteLinha(mon.id, mon.rar);
  let urlNovo = "";
  try {
    urlNovo = (novo._src && !novo._alvo ? spriteUI(novo) : novo).toDataURL();
  } catch (e) {
    relatar("retrato do monstro novo: imagem não pôde ser lida", e);
  }
  cenaTocar(
    `<div class="cine-raios" style="--cor:${cor}"></div><div class="cine-choco" style="--cor:${cor}"><img class="ovo" src="${ovo.toDataURL()}" alt=""><div class="racha"></div><img class="novo" src="${urlNovo}" alt=""></div><div class="cine-clarao choco"></div>
    <div class="cine-texto choco"><small>Chocou!${mon.rar !== "comum" ? ` · ${RAR_NOME[mon.rar]}` : ""}</small><b style="color:${cor}">${l.filhote}</b><i>${NOME_EL(l.elemento)} · ${D.classes[l.classe].nome}</i></div>`,
    "evolucao choco",
    2800
  );
}
// ================================================================ cenas: evolução e chegada do chefe (o jogo para por um instante)
// monstro nunca visto: a silhueta escura aparece, acende com um clarão e o nome é revelado
export function cenaDescoberta(mon: Monstro) {
  if (SIM.ativo || !J) return;
  const l = LINHA[mon.id],
    cor = COR[l.elemento],
    q = quadrosForma(mon.id, 0, null, mon.rar),
    img = (q && q[0]) || spriteLinha(mon.id, mon.rar);
  let url = "";
  try {
    url = (img._src && !img._alvo ? spriteUI(img) : img).toDataURL();
  } catch (e) {
    relatar("retrato do monstro: imagem não pôde ser lida", e);
  }
  cenaTocar(
    `<div class="cine-raios" style="--cor:${cor}"></div><div class="cine-descoberta" style="--cor:${cor}"><img src="${url}" alt=""></div><div class="cine-clarao descoberta"></div>
    <div class="cine-texto descoberta"><small>Novo monstro descoberto!</small><b style="color:${cor}">${l.filhote}</b><i>${NOME_EL(l.elemento)} · ${D.classes[l.classe].nome} · ${D.linhagens[l.linhagem].nome}</i><em>Agora ele aparece no Pacto, nos ovos e nos filhotes.</em></div>`,
    "evolucao descoberta",
    3400
  );
  som("jackpot");
}
export const CINE = { ativa: false, fila: [] };
export function cenaTocar(html: string, classe: string, dur: number, aoFim?: () => void) {
  if (SIM.ativo) return;
  CINE.fila.push({ html, classe, dur, aoFim });
  if (!CINE.ativa) cenaProxima();
}
/** descarta as cenas que ainda estavam na fila (ao voltar ao menu): senão tocariam por cima do menu ou da próxima run */
export function limparCenas() {
  CINE.fila.length = 0;
  CINE.ativa = false;
  const el = $("cine");
  if (el) {
    el.className = "cine";
    el.innerHTML = "";
  }
}
export function cenaProxima() {
  const c = CINE.fila.shift();
  let el = $("cine");
  if (!c) {
    CINE.ativa = false;
    if (el) el.className = "cine";
    return;
  }
  CINE.ativa = true;
  if (!el) {
    el = document.createElement("div");
    el.id = "cine";
    $("jogo").appendChild(el);
  }
  el.className = "cine " + c.classe;
  el.innerHTML = c.html;
  void el.offsetWidth;
  el.classList.add("vis");
  let feito = false;
  const fim = () => {
    if (feito) return;
    feito = true;
    el.classList.remove("vis");
    if (c.aoFim) c.aoFim();
    setTimeout(cenaProxima, 220);
  };
  el.onclick = fim;
  setTimeout(fim, c.dur);
}
export function imgDe(spr: Imagem) {
  const h = spriteUI(spr);
  try {
    return h.toDataURL();
  } catch (e) {
    return "";
  }
}
export function cenaEvolucao(s: Selo, antes: number, depois: number) {
  if (SIM.ativo || !J) return;
  const q = (e: number, r: number) => {
    const f = quadrosForma(s.mon.id, e, r, s.mon.rar);
    return f && f[0];
  };
  const velho =
    q(antes, antes >= 2 ? s.mon.ramo : null) ||
    arteMonstro(s.mon.id, antes, s.mon.ramo, s.mon.rar) ||
    gerarSprite(s.mon.id + "#" + antes + "#-", TAM[antes], COR[elementoDe(s)], { rar: s.mon.rar });
  const novo = q(depois, s.mon.ramo) || spriteSelo(s),
    cor = COR[elementoDe(s)],
    etapa = ["Filhote", "Jovem", "Adulto", "Supremo"][depois];
  const url = (sp: Carta | Imagem) => {
    try {
      return (sp._src && !sp._alvo ? spriteUI(sp) : sp).toDataURL();
    } catch (e) {
      return "";
    }
  };
  const faiscas = Array.from(
    { length: 18 },
    (_, i) => `<i style="--a:${i * 20 + Math.random() * 12}deg;--d:${90 + Math.random() * 90}px;--t:${0.5 + Math.random() * 0.5}s"></i>`
  ).join("");
  cenaTocar(
    `<div class="cine-raios" style="--cor:${cor}"></div><div class="cine-evo" style="--cor:${cor}"><div class="evo-aura"></div><img class="velho" src="${url(velho)}" alt=""><img class="novo" src="${url(novo)}" alt=""><div class="evo-faiscas">${faiscas}</div></div><div class="cine-clarao"></div>
    <div class="cine-texto"><small>Evoluiu para ${etapa}!</small><b style="color:${cor}">${nomeForma(s)}</b>${depois === 3 && ramoObj(s) ? `<i>${ramoObj(s).ultimate}</i>` : ""}</div>`,
    "evolucao",
    3600
  );
  som("ding");
}
export function cenaChefe(e: Inimigo, nome: string, guardiao: boolean) {
  if (SIM.ativo) return;
  const u = UNIV[R.universo],
    spr = arteCriatura(e, "parado", 0),
    cor = COR[e.el] || "#ff5a4a";
  cenaTocar(
    `<div class="cine-faixa" style="--cor:${cor}"></div><div class="cine-chefe">${spr ? `<img src="${imgDe(spr)}" alt="">` : ""}</div>
    <div class="cine-texto chefe"><small>${guardiao ? "Guardião da Era" : "Chefe"} · ${u ? u.nome.split(",")[0] : ""}</small><b>${nome}</b><i>Inimigo de ${NOME_EL(e.el)}. ${dicaVantagem(e.el)}</i></div>`,
    "chefe",
    2600
  );
}

// ================================================================ moedas, baús e a roleta de prêmios
export function soltarMoedas(x: number, y: number, n: number) {
  if (!J || n <= 0) return;
  {
    const m = n * (1 + MOD("ouro"));
    n = Math.floor(m) + (Math.random() < m % 1 ? 1 : 0);
  }
  J.moedas = J.moedas || [];
  for (let i = 0; i < n; i++) {
    if (J.moedas.length > 120) break;
    const a = Math.random() * Math.PI * 2,
      v = rnd(30, 80);
    J.moedas.push({ x, y, z: 4, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 0.6, vz: rnd(50, 95), f: Math.random() * 6, v: 1, t: 0 });
  }
}
export function soltarBau(x: number, y: number, tipo: string) {
  if (!J) return;
  J.baus = J.baus || [];
  if (J.baus.length >= 4) return;
  J.baus.push({ x, y, tipo, t: 0 });
  texto(x, y - 18, tipo === "ouro" ? "Baú dourado!" : "Baú!", "#ffd34a", 15);
  luzFlash(x, y, "#ffd34a", 60, 0.6);
  som("bau");
}
export function atualizarMoedasBaus(dt: number, ima: number) {
  const P = J.jogador;
  if (J.moedas) {
    for (const m of J.moedas) {
      m.t += dt;
      if (m.z > 0 || m.vz > 0) {
        m.vz -= 260 * dt;
        m.z = Math.max(0, m.z + m.vz * dt);
        if (m.z === 0 && m.vz < 0) {
          m.vz = Math.abs(m.vz) > 40 ? -m.vz * 0.35 : 0;
        }
      }
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      m.vx *= 0.9;
      m.vy *= 0.9;
      const d = Math.hypot(P.x - m.x, P.y - m.y);
      if (m.t > 0.45 && (d < ima * 1.3 || J.fim)) {
        const k = Math.min(1, dt * 9);
        m.x += (P.x - m.x) * k;
        m.y += (P.y - m.y) * k;
      }
      if (m.t > 0.45 && d < 7) {
        m.pega = true;
        R.essenciaRun += m.v;
        som("moeda");
        particulas(m.x, m.y, "#ffd34a", 3, 40);
      }
    }
    J.moedas = J.moedas.filter(m => !m.pega && m.t < 30);
  }
  if (J.baus) {
    for (const b of J.baus) {
      b.t += dt;
      if (!J.fim && Math.hypot(P.x - b.x, P.y - b.y) < 11) {
        b.aberto = true;
        abrirBau(b);
        break;
      }
    }
    J.baus = J.baus.filter(b => !b.aberto);
  }
}
// baú desenhado em vetor (prata ou ouro), com feixe de luz e brilhos
export function desenharBauMapa(b: BauMapa, x: number, y: number) {
  const ouro = b.tipo === "ouro",
    bob = Math.sin(J.t * 3 + b.x) * 1,
    pul = 0.5 + 0.5 * Math.sin(J.t * 5);
  lg.globalCompositeOperation = "lighter";
  const gr = lg.createLinearGradient(0, y - 60, 0, y);
  gr.addColorStop(0, "rgba(255,211,74,0)");
  gr.addColorStop(1, `rgba(255,211,74,${0.25 + 0.15 * pul})`);
  lg.fillStyle = gr;
  lg.fillRect(x - 5, y - 60, 10, 60);
  lg.globalAlpha = 0.5 + 0.3 * pul;
  lg.drawImage(bolhaCor(ouro ? "#ffd34a" : "#bfe6ff"), x - 14, y - 14, 28, 28);
  lg.globalAlpha = 1;
  lg.globalCompositeOperation = "source-over";
  lg.fillStyle = "rgba(0,0,0,.35)";
  lg.beginPath();
  lg.ellipse(x, y + 5, 8, 2.4, 0, 0, Math.PI * 2);
  lg.fill();
  const yy = y + bob,
    corpo = ouro ? "#7a3a7a" : "#6a3a1c",
    aro = ouro ? "#ffd34a" : "#d8dde8";
  lg.fillStyle = corpo;
  lg.fillRect(x - 7, yy - 5, 14, 9);
  lg.fillStyle = tom(corpo, 1.25);
  lg.beginPath();
  lg.moveTo(x - 7.5, yy - 5);
  lg.quadraticCurveTo(x, yy - 12, x + 7.5, yy - 5);
  lg.closePath();
  lg.fill();
  lg.strokeStyle = aro;
  lg.lineWidth = 1;
  lg.strokeRect(x - 7, yy - 5, 14, 9);
  lg.beginPath();
  lg.moveTo(x - 7.5, yy - 5);
  lg.quadraticCurveTo(x, yy - 12, x + 7.5, yy - 5);
  lg.stroke();
  lg.beginPath();
  lg.moveTo(x - 7, yy - 1);
  lg.lineTo(x + 7, yy - 1);
  lg.stroke();
  lg.fillStyle = aro;
  lg.fillRect(x - 1.5, yy - 4, 3, 4);
  lg.fillStyle = "#fff8e0";
  lg.beginPath();
  lg.arc(x, yy - 2.2, 0.7, 0, Math.PI * 2);
  lg.fill();
  if (Math.floor(J.t * 6 + b.x) % 7 === 0) {
    lg.globalCompositeOperation = "lighter";
    lg.fillStyle = "#ffffff";
    lg.beginPath();
    lg.arc(x + rnd(-8, 8), yy - rnd(2, 12), 0.8, 0, Math.PI * 2);
    lg.fill();
    lg.globalCompositeOperation = "source-over";
  }
}
export function desenharMoedasBaus(ox: number, oy: number) {
  for (const b of J.baus || []) desenharBauMapa(b, b.x - ox, b.y - oy);
  for (const m of J.moedas || []) {
    const x = m.x - ox,
      y = m.y - oy - m.z;
    if (x < -6 || y < -6 || x > VW + 6 || y > VH + 6) continue;
    const w = Math.max(0.4, Math.abs(Math.cos(J.t * 7 + m.f))) * 2.2;
    lg.fillStyle = "rgba(0,0,0,.3)";
    lg.beginPath();
    lg.ellipse(m.x - ox, m.y - oy + 1.5, 1.8, 0.6, 0, 0, Math.PI * 2);
    lg.fill();
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = 0.45;
    lg.drawImage(bolhaCor("#ffcc40"), x - 6, y - 6, 12, 12);
    lg.globalAlpha = 1;
    lg.globalCompositeOperation = "source-over";
    lg.fillStyle = "#b8860b";
    lg.beginPath();
    lg.ellipse(x, y, w, 2.2, 0, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = "#ffd34a";
    lg.beginPath();
    lg.ellipse(x, y, w * 0.75, 1.7, 0, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = "#fff8d0";
    lg.beginPath();
    lg.ellipse(x - w * 0.25, y - 0.6, w * 0.25, 0.5, 0, 0, Math.PI * 2);
    lg.fill();
  }
}
// ---- prêmios
export const ICONE_HUD = { estrela: 7, gema: 6, coracao: 8, ampulheta: 4, bolsa: 0, trofeu: 10, fogo: 5, livro: 11, mapa: 3 };
export let ICONES_URL = null;
export function iconeHud(nome: string) {
  const img = UI_ARQ("ui__hud_icones");
  if (!img) return null;
  if (!ICONES_URL) {
    ICONES_URL = {};
    const cw = img.width / 6,
      ch = img.height / 2;
    for (const [k, i] of Object.entries(ICONE_HUD)) {
      const c = document.createElement("canvas");
      c.width = cw;
      c.height = ch;
      c.getContext("2d")!.drawImage(img, (i % 6) * cw, Math.floor(i / 6) * ch, cw, ch, 0, 0, cw, ch);
      ICONES_URL[k] = c.toDataURL();
    }
  }
  return ICONES_URL[nome];
}
export function sortearPremios(tipo: string) {
  const sorte = SIN.rm && SIN.rm.talisma ? 1.5 : 1,
    r = Math.random(),
    ouro = tipo === "ouro";
  const n = ouro ? (r < 0.22 * sorte ? 5 : 3) : r < 0.04 * sorte ? 5 : r < 0.28 * sorte ? 3 : 1;
  const eq = ativos(),
    tals = Object.keys(R.talismas || {}).filter(id => nivTal(id) < 5),
    ess = Math.round((6 + R.profundidade * 3) * (ouro ? 2 : 1));
  const pool = [
    {
      peso: 30,
      f: () => {
        const s = escolha(eq);
        return { icone: "estrela", rar: "raro", texto: `${nomeForma(s)}: +1 nível`, aplicar: () => premioNivel(s) };
      }
    },
    {
      peso: 26,
      f: () => ({
        icone: "gema",
        rar: "incomum",
        texto: `+${ess} de Essência`,
        aplicar: () => {
          R.essenciaRun += ess;
        }
      })
    },
    { peso: 12, f: () => ({ icone: "coracao", rar: "incomum", texto: "Cura de 35%", aplicar: () => curar(J.vidaMax * 0.35) }) },
    {
      peso: 10,
      f: () => ({
        icone: "ampulheta",
        rar: "comum",
        texto: "Puxa todos os cristais",
        aplicar: () => J.gemas.forEach(g => (g.puxar = true))
      })
    },
    {
      peso: 10,
      f: () => {
        const k = itemUtil(["incenso", "doce", "pena", "pedra", "chamado"]);
        return {
          icone: "bolsa",
          rar: "incomum",
          texto: D.itens[k].nome,
          aplicar: () => {
            R.itens[k]++;
          }
        };
      }
    },
    ...(tals.length
      ? [
          {
            peso: 7,
            f: () => {
              const id = escolha(tals);
              return {
                icone: "trofeu",
                rar: "epico",
                texto: `Talismã: ${PD().talismas[id].nome} +1`,
                aplicar: () => {
                  R.talismas[id] = (R.talismas[id] || 0) + 1;
                  calcularSinergia();
                }
              };
            }
          }
        ]
      : []),
    {
      peso: 5,
      f: () => ({
        icone: "fogo",
        rar: "epico",
        texto: "Despertar carregado",
        aplicar: () => {
          J.ult = 100;
        }
      })
    },
    ...(R.ninho.length < D.ovos.ninho_max
      ? [
          {
            peso: 4,
            f: () => ({
              icone: "livro",
              rar: "lendario",
              texto: "Ovo Raro",
              aplicar: () => {
                R.ninho.push({ id: escolha(poolPacto()), rar: "raro", prog: 0, alvo: D.ovos.raridades.raro.xp });
                desenharNinho();
              }
            })
          }
        ]
      : [])
  ];
  const tot = pool.reduce((t, p) => t + p.peso, 0),
    out = [];
  for (let i = 0; i < n; i++) {
    let x = Math.random() * tot;
    const p = pool.find(p => (x -= p.peso) <= 0) || pool[0];
    out.push(p.f());
  }
  if (n === 5) {
    out[4] = { icone: "estrela", rar: "lendario", texto: `JACKPOT: toda a equipe +1 nível`, aplicar: () => eq.forEach(premioNivel) };
  }
  return out;
}
export function premioNivel(s: Selo) {
  if (!s || !s.mon) return;
  const lib = (["b", "h1", ...(est(s) >= 1 || estBase(s) >= 1 ? ["h2"] : [])] as ChavePoder[]).filter(k => s.pod[k] < 5);
  if (lib.length) {
    const k = lib.sort((a, b) => s.pod[a] - s.pod[b])[0];
    s.pod[k]++;
    if (k !== "b" && s.pod[k] === 3 && s.mod[k] == null) s.mod[k] = Math.floor(Math.random() * 2);
  }
  aplicarNivel(s, 1);
  calcularSinergia();
  desenharEquipe();
}
// tela do baú: o baú treme, abre com moedas voando e as casas giram como uma roleta até parar uma por uma
// baú desenhado: madeira com veios em degradê, cintas de metal com rebites, cantoneiras e fechadura (dourado no baú de ouro),
// tampa curva separada (abre girando) e brilho de dentro que aparece quando ela levanta
// baú da tela de prêmio: de frente, mais alto que largo o bastante para ler como baú (antes era uma caixa larga e baixa),
// madeira em tábuas, cantoneiras, cintas com rebites e fechadura. Ao abrir, a tampa sobe e tomba para trás (achata em Y a partir
// da dobradiça de trás) e aparece o interior brilhando, em vez de girar de lado e ficar solta.
export function svgBau(ouro: boolean) {
  const m = ouro ? ["#fff4c0", "#f0c048", "#a87418", "#5a3a08"] : ["#f4f6fa", "#b8c0cc", "#6e7686", "#3a404c"],
    mad = ouro ? ["#9a4a8e", "#6e2c66", "#4a1a46", "#2a0c28"] : ["#b8743a", "#8a4e22", "#5e3214", "#341a08"];
  const reb = (x: number, y: number, r = 1.9) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".6"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.35}" fill="#fff" opacity=".7"/>`;
  const tabuas = (y0: number, y1: number) =>
    [34, 52, 68, 86]
      .map(
        x =>
          `<path d="M${x} ${y0}V${y1}" stroke="${mad[3]}" stroke-opacity=".55" stroke-width="1"/><path d="M${x + 1.2} ${y0}V${y1}" stroke="#fff" stroke-opacity=".07" stroke-width="1"/>`
      )
      .join("");
  const veios = `<path d="M38 66q6-1.5 12 0M56 80q5 1.5 10 0M72 64q5-1.5 12 0M40 90q4 1 9 0M74 88q4-1 9 0" stroke="${mad[3]}" stroke-opacity=".35" stroke-width=".8" fill="none"/>`;
  return `<svg viewBox="0 0 120 112" aria-hidden="true"><defs>
    <linearGradient id="bauW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mad[0]}"/><stop offset=".5" stop-color="${mad[1]}"/><stop offset="1" stop-color="${mad[2]}"/></linearGradient>
    <linearGradient id="bauWl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".82" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
    <linearGradient id="bauT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mad[0]}"/><stop offset=".7" stop-color="${mad[1]}"/><stop offset="1" stop-color="${mad[2]}"/></linearGradient>
    <linearGradient id="bauM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m[0]}"/><stop offset=".45" stop-color="${m[1]}"/><stop offset="1" stop-color="${m[2]}"/></linearGradient>
    <radialGradient id="bauL" cx=".5" cy=".75" r=".75"><stop offset="0" stop-color="#fffbe6"/><stop offset=".35" stop-color="${ouro ? "#ffd34a" : "#ffe9a0"}"/><stop offset="1" stop-color="${ouro ? "#c070ff" : "#ffb040"}" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="60" cy="106" rx="54" ry="5" fill="rgba(0,0,0,.5)"/>
    <g class="tampa-aberta"><path d="M11 47L15 6Q60 1 105 6L109 47Z" fill="${mad[2]}" stroke="#140804" stroke-width="2.2"/>
      <path d="M17 44L20 11Q60 7 100 11L103 44Z" fill="${mad[3]}"/>${[36, 52, 68, 84].map(x => `<path d="M${x} 9V45" stroke="#000" stroke-opacity=".3" stroke-width="1"/>`).join("")}
      <path d="M11 47L15 6Q60 1 105 6L109 47" fill="none" stroke="url(#bauM)" stroke-width="3.2"/>
      <path d="M23 46L25 7H33L32 46z" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".7"/><path d="M97 46L95 7H87L88 46z" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".7"/>
      ${reb(28.5, 16) + reb(28, 32) + reb(91.5, 16) + reb(92, 32)}</g>
    <ellipse class="brilho-interno" cx="60" cy="40" rx="56" ry="34" fill="url(#bauL)" opacity=".85"/>
    <g class="interior"><path d="M12 52Q12 44 20 43H100Q108 44 108 52Z" fill="#1a0c06"/><ellipse cx="60" cy="49" rx="42" ry="5.5" fill="url(#bauL)"/>
      <circle cx="44" cy="49" r="3.2" fill="#ffd34a" stroke="#a87418" stroke-width=".6"/><circle cx="52" cy="47.5" r="3.2" fill="#ffe680" stroke="#a87418" stroke-width=".6"/><circle cx="70" cy="48" r="3.2" fill="#ffd34a" stroke="#a87418" stroke-width=".6"/><circle cx="62" cy="50" r="3.2" fill="#fff0a8" stroke="#a87418" stroke-width=".6"/>${ouro ? `<path d="M76 50l3-5 3 5-3 3z" fill="#d84aff" stroke="#fff" stroke-width=".5"/>` : ""}</g>
    <g class="corpo">
      <rect x="10" y="50" width="100" height="52" rx="3" fill="url(#bauW)" stroke="#140804" stroke-width="2.2"/>
      ${tabuas(52, 100)}${veios}<rect x="10" y="50" width="100" height="52" rx="3" fill="url(#bauWl)"/>
      <rect x="9" y="50" width="102" height="6" rx="1.5" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".8"/>
      <rect x="9" y="95" width="102" height="7" rx="1.5" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".8"/>
      <rect x="22" y="50" width="10" height="52" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".8"/><rect x="88" y="50" width="10" height="52" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".8"/>
      ${[61, 73, 85].map(y => reb(27, y) + reb(93, y)).join("")}${[14, 44, 76, 106].map(x => reb(x, 53, 1.4) + reb(x, 98.5, 1.4)).join("")}
      <path d="M9 56v14h5V61h4v-5zM111 56v14h-5V61h-4v-5zM9 95V81h5v9h4v5zM111 95V81h-5v9h-4v5z" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".7"/>
      <path d="M49 58h22v14q0 9-11 13q-11-4-11-13z" fill="url(#bauM)" stroke="${m[3]}" stroke-width="1.1"/><path d="M51.5 60.5h17v11q0 7-8.5 10.5q-8.5-3.5-8.5-10.5z" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/>
      <circle cx="60" cy="67" r="3" fill="#140804"/><path d="M58.6 68.5h2.8l1 7h-4.8z" fill="#140804"/>${ouro ? `<circle cx="60" cy="80" r="2" fill="#d84aff" stroke="#fff4c0" stroke-width=".7"/>` : ""}</g>
    <g class="tampa">
      <path d="M10 50V36Q10 13 60 11Q110 13 110 36V50Z" fill="url(#bauT)" stroke="#140804" stroke-width="2.2"/>
      <path d="M16 46V35Q17 19 60 17Q103 19 104 35V46" fill="none" stroke="${mad[3]}" stroke-opacity=".5" stroke-width="1"/>
      <path d="M12 28Q60 6 108 28" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="2.5"/>
      <path d="M10 50V36Q10 13 60 11Q110 13 110 36V50Z" fill="url(#bauWl)"/>
      <path d="M22 50V30Q22 18 32 16.5V50z" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".8"/><path d="M98 50V30Q98 18 88 16.5V50z" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".8"/>
      ${reb(27, 26) + reb(27, 38) + reb(93, 26) + reb(93, 38)}
      <rect x="8" y="44" width="104" height="7" rx="2" fill="url(#bauM)" stroke="${m[3]}" stroke-width=".9"/>${[14, 44, 76, 106].map(x => reb(x, 47.5, 1.4)).join("")}
      <path d="M53 44h14v9q0 6-7 8q-7-2-7-8z" fill="url(#bauM)" stroke="${m[3]}" stroke-width="1.1"/><circle cx="60" cy="52" r="1.6" fill="#140804"/>
      ${ouro ? `<circle cx="60" cy="27" r="5.5" fill="#d84aff" stroke="${m[1]}" stroke-width="2"/><circle cx="58.3" cy="25.3" r="1.6" fill="#fff" opacity=".85"/>` : ""}</g></svg>`;
}
export function abrirBau(b: { tipo: string; x?: number; y?: number }) {
  const premios = sortearPremios(b.tipo);
  if (SIM.ativo) {
    premios.forEach(p => p.aplicar());
    return;
  }
  defPausado(true);
  som("bau");
  let tela = $("bau");
  if (!tela) {
    tela = document.createElement("div");
    tela.id = "bau";
    $("jogo").appendChild(tela);
  }
  const ouro = b.tipo === "ouro";
  tela.className = "bau-tela" + (ouro ? " ouro" : "");
  tela.innerHTML = `<div class="bau-raios"></div><div class="bau-titulo">${ouro ? "Baú dourado" : "Baú"}</div>
    <div class="bau-arca">${svgBau(ouro)}</div>
    <div class="bau-casas">${premios.map(() => `<div class="casa"><img alt=""><span></span></div>`).join("")}</div><button class="botao bau-coletar">Coletar</button>`;
  const casas = [...tela.querySelectorAll(".casa")],
    todos = ["estrela", "gema", "coracao", "ampulheta", "bolsa", "trofeu", "fogo", "livro"];
  const mostrar = (c: Element, p) => {
    const u = iconeHud(p.icone);
    const im = c.querySelector("img");
    if (u) im.src = u;
    else im.removeAttribute("src");
    c.querySelector("span").textContent = p.texto;
  };
  tela.classList.add("vis");
  setTimeout(() => {
    tela.classList.add("aberto");
    som("abrir");
    chuvaMoedas(tela, ouro ? 40 : 22);
  }, 900);
  casas.forEach((c, i) => {
    let atraso = 60;
    const fim = 1500 + i * 480 + (premios.length === 5 && i === 4 ? 600 : 0),
      t0 = performance.now();
    const girar = () => {
      if (!tela.isConnected) return;
      const passou = performance.now() - t0;
      if (passou >= fim) {
        mostrar(c, premios[i]);
        c.classList.add("parou", "r-" + premios[i].rar);
        som(premios[i].rar === "lendario" ? "jackpot" : "ding");
        tela.classList.remove("treme");
        void tela.offsetWidth;
        tela.classList.add("treme");
        chuvaMoedas(c, 6);
        if (i === casas.length - 1)
          setTimeout(() => {
            const tt = tela.querySelector(".bau-titulo");
            if (!tt) return;
            if (premios.length === 5) {
              tt.textContent = "JACKPOT!";
              tt.classList.add("jackpot");
              chuvaMoedas(tela, 60);
            } else tt.textContent = premios.length === 3 ? "Prêmio triplo!" : "Prêmio!";
            tela.classList.add("pronto");
          }, 250);
        return;
      }
      if (passou > 900) {
        mostrar(c, { icone: escolha(todos), texto: "" });
        som("tic");
        c.classList.toggle("pisca");
      }
      atraso = Math.min(240, atraso * (passou > fim - 700 ? 1.18 : 1.04));
      setTimeout(girar, atraso);
    };
    setTimeout(girar, 60);
  });
  (tela.querySelector(".bau-coletar") as HTMLElement).onclick = () => {
    if (!tela.classList.contains("pronto")) return;
    premios.forEach(p => p.aplicar());
    tela.classList.remove("vis");
    setTimeout(() => {
      tela.innerHTML = "";
    }, 250);
    defPausado(false);
    som("moeda");
    if (filaRamo.length || filaEsp.length || (J && J.niveisPend > 0)) proximaEscolha();
  };
}
export function chuvaMoedas(el: Element, n: number) {
  for (let i = 0; i < n; i++) {
    const m = document.createElement("i");
    m.className = "moeda-voa";
    m.style.setProperty("--x", (Math.random() * 2 - 1) * 160 + "px");
    m.style.setProperty("--y", -(80 + Math.random() * 160) + "px");
    m.style.setProperty("--d", 0.8 + Math.random() * 0.7 + "s");
    m.style.setProperty("--r", Math.random() * 720 - 360 + "deg");
    m.style.animationDelay = Math.random() * 0.25 + "s";
    el.appendChild(m);
    setTimeout(() => m.remove(), 1800);
  }
}

// ================================================================ fim de mapa, portais, derrota
export function vencerChefe(e: Inimigo) {
  diaria("chefes");
  eventosVitoria(e);
  J.escuroFixo = 0;
  J.escuroAlvo = 0;
  J.perigos = [];
  e.puxao = false;
  R.xp = J.xp;
  R.nivel = J.nivel;
  R.st.mapas.push({
    mapa: R.profundidade + 1,
    universo: R.universo,
    ttkChefe: +(J.t - J.tChefe).toFixed(1),
    vida: +(J.vida / J.vidaMax).toFixed(2),
    nivel: J.nivel,
    dps: Math.round(
      ativos().reduce((t, s) => {
        const a = atrib(s);
        return t + a.dano * a.cad;
      }, 0)
    ),
    hpInimigo: +(DIF.hp * dificuldade()).toFixed(1),
    estagios: ativos().map(s => estBase(s)),
    rar: ativos().map(s => s.mon.rar[0]),
    combo: J.comboMax,
    selos: ativos().map(s => s.nivel)
  });
  J.fim = true;
  J.lento = 1.2;
  tremor(14);
  parar(0.25);
  R.chefesVencidos++;
  R.profundidade++;
  R.vidaFrac = Math.max(0.05, J.vida / J.vidaMax);
  J.flash = { vida: 0.6, cor: "#ffffff" };
  J.inimigos.forEach(o => {
    if (o !== e && o.hp > 0) {
      o.hp = 0;
      morrer(o);
    }
  });
  const u = UNIV[R.universo],
    doUniverso = D.linhas.filter(l => l.universo === u.id).map(l => l.id);
  doUniverso.forEach(id => {
    if (!META.liberados.includes(id)) META.liberados.push(id);
  });
  const doPacto = doUniverso.filter(id => R.pacto.includes(LINHA[id].elemento));
  if (J.eraChefe) spawnOvo("lendario", escolha(doUniverso.length ? doUniverso : META.liberados), e.x, e.y);
  else {
    spawnOvo("raro", escolha(doPacto.length ? doPacto : doUniverso.length ? doUniverso : poolPacto()), e.x, e.y);
    if (Math.random() < 0.05) R.itens.chamado++;
  }
  R.essenciaRun += 5 + R.profundidade * 2;
  ativos().forEach(s => {
    const antes = 2;
    if (estBase(s) === 3) checarEvolucao(s, antes);
  });
  if (J.eraChefe) {
    R.eraIdx++;
    R.mapaNaEra = 0;
    if (R.eraIdx >= D.eras_ordem.length) {
      R.eraIdx = 0;
      R.ciclo++;
    }
  } else R.mapaNaEra++;
  if (!R.teste) META.recorde = Math.max(META.recorde, R.profundidade);
  toast(`Chefe derrotado! Pegue o ovo ${J.eraChefe ? "Lendário" : "Raro"} que ele deixou.`);
  J.portalEm = 6;
}
// capa do portal: a arte de abertura do reino recortada, com moldura na cor do elemento
export function capaReino(u: Universo) {
  const img = ARTE_IMG[`arte/reinos/${u.era}/${u.id}__keyart.png`];
  if (!img || !img.pronta) return null;
  const c = document.createElement("canvas");
  c.width = 240;
  c.height = 150;
  const g = c.getContext("2d")!,
    e = Math.max(c.width / img.width, c.height / img.height);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.drawImage(img, (c.width - img.width * e) / 2, (c.height - img.height * e) / 2, img.width * e, img.height * e);
  const vg = g.createRadialGradient(120, 75, 40, 120, 75, 150);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,.55)");
  g.fillStyle = vg;
  g.fillRect(0, 0, 240, 150);
  return c;
}
// a tela de portais pode esperar a arte das capas uma vez; enquanto espera, guarda as opções já sorteadas
export const PORTAIS = { ops: null, jaEsperou: false };
export function mostrarPortais() {
  const era = D.eras_ordem[R.eraIdx],
    opcoes =
      PORTAIS.ops ||
      embaralhar(D.universos.filter(u => u.era === era && u.id !== R.universo)).slice(
        0,
        3 + ((SIN.rm && SIN.rm.portais) || 0) + nivelLoja("oraculo")
      );
  // adianta a arte da abertura e o chão de cada portal (o resto vem quando o mapa começa)
  // as capas dos portais são a arte de abertura de cada reino: se ainda não chegaram, espera até 2,5 s (uma vez)
  if (
    !SIM.ativo &&
    !PORTAIS.jaEsperou &&
    opcoes.some(u => {
      /* na simulação não espera: a espera em tempo real fazia a mesma semente dar partidas diferentes */ const im =
        ARTE_IMG[`arte/reinos/${u.era}/${u.id}__keyart.png`];
      return im && !im.pronta && !im.falhou;
    })
  ) {
    Promise.race([preCarregar(opcoes.map(u => `arte/reinos/${u.era}/${u.id}__keyart.png`)), new Promise(ok => setTimeout(ok, 2500))]).then(
      () => {
        PORTAIS.jaEsperou = true;
        PORTAIS.ops = opcoes;
        mostrarPortais();
      }
    );
    return;
  }
  opcoes.forEach(u =>
    preCarregar(artesQue(n => n.startsWith(`arte/reinos/${u.era}/${u.id}__keyart`) || n.startsWith(`arte/reinos/${u.era}/${u.id}__piso`)))
  );
  PORTAIS.ops = null;
  PORTAIS.jaEsperou = false;
  const recs = embaralhar(["Recrutar", "Cura total", "Relíquia", "Ovo Raro", "Item"]);
  while (recs.length < opcoes.length) recs.push(escolha(["Relíquia", "Ovo Raro", "Item", "Recrutar"]));
  mostrarCartas(
    "Escolha o portal",
    `Próximo: ${D.eras[era].nome}${R.mapaNaEra === MAPAS_POR_ERA - 1 ? " · o Guardião da Era espera no fim deste mapa" : ""}. A run fica salva aqui e as trocas são livres.`,
    opcoes.map((u, i) => {
      const rec = recs[i];
      return {
        titulo: u.nome,
        raridade: "raro",
        classe: "portal",
        suave: true,
        sprite: capaReino(u) || gerarSprite(u.id + "portal", 12, COR[u.elemento]),
        texto: `Inimigos de ${NOME_EL(u.elemento)}. ${dicaVantagem(u.elemento)}<br>Recompensa: ${rec}${rec === "Relíquia" ? ` (${u.reliquia.nome}: ${u.reliquia.efeito})` : ""}`,
        acao: () => aplicarPortal(u, rec)
      };
    })
  );
}
export function aplicarPortal(u: Universo, rec: string) {
  R.universo = u.id;
  R.selos.forEach(s => (s.trocaCd = 0));
  const bussola = temRel("Bússola Enlouquecida"),
    itemExtra = () => {
      const k = escolha(["incenso", "pedra", "doce", "pena", "chamado"]);
      R.itens[k]++;
      return D.itens[k].nome;
    };
  const seguir = () => {
    if (bussola && rec !== "Item" && rec !== "Ovo Raro") toast(`Bússola: + ${itemExtra()}`);
    salvarRun();
    iniciarMapa();
  };
  if (rec === "Relíquia") {
    R.reliquias.push(u.reliquia.nome);
    toast(`Relíquia: ${u.reliquia.nome}`);
    return seguir();
  }
  if (rec === "Cura total") {
    R.vidaFrac = 1;
    return seguir();
  }
  if (rec === "Ovo Raro") {
    for (let i = 0; i < (bussola ? 2 : 1); i++) {
      if (R.ninho.length < D.ovos.ninho_max)
        R.ninho.push({ id: escolha(poolPacto()), rar: "raro", prog: 0, alvo: D.ovos.raridades.raro.xp });
      else R.itens.incenso++;
    }
    return seguir();
  }
  if (rec === "Item") {
    const k = escolha(["incenso", "pedra", "doce", "pena", "chamado"]);
    R.itens[k]++;
    let msg = `Item: ${D.itens[k].nome}`;
    if (bussola) msg += ` + ${itemExtra()}`;
    toast(msg);
    return seguir();
  }
  const pool = embaralhar(poolPacto()).slice(0, 3);
  mostrarCartas(
    "Recrutar",
    "Escolha um monstro Raro do seu Pacto.",
    pool.map(id => {
      const l = LINHA[id];
      return {
        titulo: l.filhote,
        sprite: spriteLinha(id, "raro"),
        raridade: "raro",
        texto: `${NOME_EL(l.elemento)} · ${D.classes[l.classe].nome} · ${D.linhagens[l.linhagem].nome}`,
        acao: () => {
          const vazio = R.selos.find(s => !s.mon);
          if (vazio) {
            const o = ativos();
            vazio.nivel = Math.max(1, Math.round((o.reduce((t, s) => t + s.nivel, 0) / o.length) * 0.6));
            vazio.mon = { id, rar: "raro", ramo: null };
          } else R.reserva.push({ id, rar: "raro", ramo: null });
          seguir();
        }
      };
    })
  );
}
export function salvarRun() {
  defRunSalva(
    JSON.parse(
      JSON.stringify({
        ...R,
        selos: R.selos.map(s => ({
          nivel: s.nivel,
          pod: s.pod,
          mod: s.mod,
          esp: s.esp ?? null,
          asc: s.asc || null,
          mon: s.mon,
          trocaCd: 0
        }))
      })
    )
  );
  gravar();
}
export function carregarRun(s: Run) {
  defR(JSON.parse(JSON.stringify(s)));
  R.st = R.st || novoSt();
}
// resumo da run na tela de fim: de onde veio o dano, a reação mais usada e o que mais machucou (com uma dica para a próxima)
export function resumoRun() {
  const st = R.st || ({} as Partial<EstatisticasRun>),
    pf = st.porFonte || {},
    tot = Object.values(pf).reduce((a, b) => a + b, 0);
  if (!(tot > 0)) return "";
  /** nome e cor de cada fonte de dano */
  const N: Record<string, [string, string]> = {
    reliquia: ["Relíquias", "#e8c070"],
    lenda: ["Lenda", "#ffe6a6"],
    basico: ["Ataque básico", "#c8d0e0"],
    habilidade: ["Habilidades", "#7fc8ff"],
    reacao: ["Reações", "#ffb040"],
    especial: ["Especiais", "#c58cff"],
    despertar: ["Despertar", "#ffd34a"],
    combinado: ["Combinado", "#ff8ab0"],
    ambiente: ["Ambiente", "#9ff07a"]
  };
  const linhas = Object.entries(pf)
    .map(([k, v]) => [k, (v / tot) * 100] as [string, number])
    .filter(([, q]) => q >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(
      ([k, q]) =>
        `<div class="rd-linha"><span>${(N[k] || [k])[0]}</span><i><b style="width:${Math.max(3, Math.round(q))}%;background:${(N[k] || [k, "#c8d0e0"])[1]}"></b></i><em>${Math.round(q)}%</em></div>`
    )
    .join("");
  const re = Object.entries(st.reacoes || {}).sort((a, b) => b[1] - a[1])[0],
    rec = (st.recContato || 0) + (st.recBala || 0),
    pc = rec > 0 ? st.recContato / rec : 0;
  const dica =
    rec <= 0
      ? ""
      : pc > 0.65
        ? "A maior parte do dano que você levou veio de <b>encostar na horda</b>: guarde a esquiva para atravessar o cerco."
        : pc < 0.4
          ? "A maior parte do dano que você levou veio de <b>golpes e projéteis</b>: saia das marcas no chão antes do golpe."
          : "Você levou dano tanto da horda quanto dos golpes: troque de lugar antes de ficar cercado.";
  return `<div class="resumo-dano"><div class="rd-titulo">De onde veio o seu dano</div>${linhas}${re ? `<div class="rd-nota">Reação mais usada: <b>${re[0]}</b> (${re[1]}×)</div>` : ""}${dica ? `<div class="rd-nota">${dica}</div>` : ""}${quemCarregou(st)}</div>`;
}
// quem carregou a run: os três monstros que mais causaram dano (básico, habilidades, especiais e as reações que dispararam),
// com o nome da forma em que terminaram a run. Monstro que saiu da equipe aparece pelo nome da linha
export function quemCarregou(st: Partial<EstatisticasRun>) {
  const pm = st.porMonstro || {},
    tot = Object.values(pm).reduce((a, b) => a + b, 0);
  if (!(tot > 0)) return "";
  const nome = (id: string) => {
    const s = R.selos.find(x => x.mon && x.mon.id === id);
    return s ? nomeForma(s) : LINHA[id] ? LINHA[id].filhote : id;
  };
  const top = Object.entries(pm)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const barras = top
    .map(([id, v]) => {
      const q = (v / tot) * 100,
        cor = LINHA[id] ? COR[LINHA[id].elemento] : "#c8d0e0";
      return `<div class="rd-linha"><span>${nome(id)}</span><i><b style="width:${Math.max(3, Math.round(q))}%;background:${cor}"></b></i><em>${Math.round(q)}%</em></div>`;
    })
    .join("");
  const [lider, vLider] = top[0];
  const nota =
    vLider / tot >= 0.5
      ? `<b>${nome(lider)}</b> carregou a run sozinho: mais da metade do dano da equipe.`
      : top.length > 1 && vLider / tot < 0.4
        ? "Dano bem dividido: a equipe inteira trabalhou."
        : `<b>${nome(lider)}</b> foi quem mais causou dano.`;
  return `<div class="rd-titulo">Quem carregou a run</div>${barras}<div class="rd-nota">${nota}</div>`;
}
export function derrota() {
  defRodando(false);
  if (SIM.aoDerrota) {
    SIM.aoDerrota();
    return;
  }
  const ess = Math.round(
    (R.essenciaRun + Math.floor((R.abatesPeso ?? R.abates) / 15)) *
      (1 + passiva("essencia")) *
      (1 + MOD("ouro")) *
      relMods().ess *
      bonusLoja("ganancia")
  );
  META.essencia += ess;
  defRunSalva(null);
  gravar();
  // fim de run que puxa para a próxima: recorde, quanto falta para a próxima melhoria e atalho para o Santuário
  const recorde = R.profundidade > (R.recordeAntes ?? 0) && R.profundidade > 0;
  const prox = LOJA.filter(it => nivelLoja(it.id) < it.max).sort((a, b) => precoLoja(a) - precoLoja(b))[0],
    podem = lojaAcessivel();
  const dica = podem.length
    ? `Dá para comprar <b>${podem.length}</b> melhoria${podem.length > 1 ? "s" : ""} no Santuário agora.`
    : prox
      ? `Faltam <b>${precoLoja(prox) - META.essencia}</b> de Essência para ${prox.nome}.`
      : "";
  mostrarCartas(
    recorde ? "Novo recorde!" : "A equipe caiu",
    `Profundidade: <b>${R.profundidade}</b> mapa${R.profundidade === 1 ? "" : "s"}${recorde ? " (seu melhor)" : ` · recorde ${META.recorde}`} · Abates: ${R.abates} · Maior combo: ${J.comboMax}<br>Essência ganha: <b>+${ess}</b> (total ${META.essencia}). ${dica}${resumoRun()}`,
    [
      ...(podem.length
        ? [
            {
              titulo: "Ir ao Santuário",
              raridade: "lendario",
              texto: "Gastar a Essência em melhorias permanentes.",
              acao: () => telaSantuario()
            }
          ]
        : []),
      { titulo: "Nova run", raridade: podem.length ? "comum" : "raro", texto: "Fechar um novo Pacto agora.", acao: () => telaPacto() },
      { titulo: "Voltar ao Nexo", texto: "Ir para o menu.", acao: () => menu() }
    ],
    { fundo: recorde ? "ui__vitoria" : "ui__derrota" }
  );
}

// ================================================================ especial individual (escolhido pelo jogador, dispara sozinho)
export function recargaEspecial(s: Selo) {
  const r = D.especial_regras;
  return Math.max(r.recarga_min_seg, r.recarga_base_seg * (1 - r.reducao_por_nivel * Math.max(0, s.nivel - NIV[1])));
}
export function nomeEspecial(s: Selo) {
  const op = D.especiais[L(s).classe][s.esp];
  return est(s) === 3 ? `${op[0]} · ${ramoObj(s).supremo}` : op[0];
}
export function escolherEspecial(s: Selo) {
  if (!s.mon || s.esp != null) return proximaEscolha();
  const ops = D.especiais[L(s).classe];
  mostrarCartas(
    `Especial de ${nomeForma(s)}`,
    `Escolha o especial deste Selo. Ele dispara sozinho a cada ~${Math.round(recargaEspecial(s))} s; no Supremo fica 50% mais forte. Trocar de monstro mantém a escolha.`,
    ops.map((o, i) => ({
      titulo: o[0],
      texto: o[1],
      raridade: "epico",
      sprite: spriteSelo(s),
      acao: () => {
        s.esp = i;
        s.cdEsp = 6;
        proximaEscolha();
      }
    }))
  );
}
export function dispararEspecial(s, a: Atributos, el, cor) {
  const m = est(s) === 3 ? D.especial_regras.bonus_supremo : 1,
    d = a.dano * m,
    P = J.jogador,
    cls = L(s).classe,
    op = s.esp;
  R.st.especiais++;
  if (s._nomeMapa !== R.profundidade) {
    s._nomeMapa = R.profundidade;
    texto(s.x, s.y - 18, nomeEspecial(s), cor, 13);
  }
  /* nome do especial só na 1ª vez do mapa */ anel(s.x, s.y, 24, "#ffffff", 0.4);
  particulas(s.x, s.y, cor, 20, 110, 2);
  tremor(4);
  const naTela = f =>
    J.inimigos.forEach(e => {
      if (e.hp > 0 && Math.abs(e.x - P.x) < VW / 2 + 10 && Math.abs(e.y - P.y) < VH / 2 + 10) f(e);
    });
  const alvo = pontoDenso(s, 150) || maisProximo(s, 150) || { x: s.x, y: s.y };
  vfxEspecial(s, alvo, cls, op, el);
  switch (cls + op) {
    case "guardiao0":
      J.escudo = Math.min(J.vidaMax * 0.5, J.escudo + J.vidaMax * 0.25);
      J.reducao = 4;
      emArea(s.x, s.y, 70, e => {
        e.x += (s.x - e.x) * 0.6;
        e.y += (s.y - e.y) * 0.6;
      });
      anel(s.x, s.y, 70, cor, 0.7);
      break;
    case "guardiao1":
      emArea(s.x, s.y, 70, e => {
        ferir(e, d * 10, el);
        e.congela = 2;
      });
      anel(s.x, s.y, 70, cor, 0.7);
      tremor(8);
      break;
    case "guerreiro0":
      J.grito = 6;
      anel(P.x, P.y, 50, "#ff5a4a", 0.6);
      break;
    case "guerreiro1":
      emArea(alvo.x, alvo.y, 60, e => ferir(e, d * 14, el));
      anel(alvo.x, alvo.y, 60, cor, 0.6);
      tremor(7);
      break;
    case "assassino0":
      for (let i = 0; i < 8; i++)
        agendar(i * 0.08, () => {
          const e = escolha(J.inimigos.filter(x => x.hp > 0 && dist2(x, s) < 140 * 140));
          if (e) {
            ferir(e, d * 4, el, { crit: true });
            raio(s.x, s.y, e.x, e.y, cor);
          }
        });
      break;
    case "assassino1":
      naTela(e => {
        if (e.elite || e.chefe || e.mini) ferir(e, d * 6, el);
        else if (e.hp < e.max * 0.25) {
          danoSimples(e, e.hp + 1);
          particulas(e.x, e.y, "#c070ff", 6, 60);
        }
      });
      break;
    case "cacador0":
      J.zonas.push({ fonte: FONTE, autor: AUTOR, tipo: "chuva", x: alvo.x, y: alvo.y, r: 60, cor, el, dano: d * 1.2, vida: 4, cd: 0 });
      break;
    case "cacador1": {
      const ang = Math.atan2(alvo.y - s.y, alvo.x - s.x),
        cx = Math.cos(ang),
        cy = Math.sin(ang);
      J.inimigos.forEach(e => {
        const rx = e.x - s.x,
          ry = e.y - s.y,
          t = rx * cx + ry * cy,
          dl = Math.abs(rx * cy - ry * cx);
        if (t > 0 && t < 260 && dl < 12) ferir(e, d * 20, el);
      });
      raio(s.x, s.y, s.x + cx * 260, s.y + cy * 260, cor);
      raio(s.x, s.y + 2, s.x + cx * 260, s.y + cy * 260 + 2, "#ffffff");
      tremor(6);
      break;
    }
    case "mago0":
      emArea(alvo.x, alvo.y, 80, e => ferir(e, d * 12, el));
      anel(alvo.x, alvo.y, 80, cor, 0.8);
      particulas(alvo.x, alvo.y, cor, 40, 160, 2);
      tremor(10);
      parar(0.08);
      break;
    case "mago1":
      naTela(e => {
        e.congela = 2.5;
        ferir(e, d * 2, el);
      });
      J.flash = { vida: 0.25, cor: "#bfe8ff" };
      break;
    case "invocador0":
      for (let i = 0; i < 10; i++)
        J.crias.push({ fonte: FONTE, autor: AUTOR, x: s.x + rnd(-12, 12), y: s.y + rnd(-12, 12), dano: d * 0.8, el, cor, vida: 6, cd: 0 });
      break;
    case "invocador1":
      J.crias.push({ fonte: FONTE, autor: AUTOR, x: s.x, y: s.y, dano: d * 6, el, cor, vida: 10, cd: 0, gigante: true });
      anel(s.x, s.y, 24, cor, 0.6);
      break;
    case "mistico0":
      curar(J.vidaMax * 0.4);
      anel(P.x, P.y, 50, "#7fe0a0", 0.8);
      particulas(P.x, P.y, "#7fe0a0", 24, 90);
      break;
    case "mistico1":
      naTela(e => ferir(e, d * 8, el));
      J.flash = { vida: 0.25, cor: "#fff3c4" };
      break;
    case "xama0":
      J.zonas.push({
        fonte: FONTE,
        autor: AUTOR,
        tipo: "chuva",
        x: P.x,
        y: P.y,
        r: 75,
        cor,
        el,
        dano: d * 1.5,
        vida: 5,
        cd: 0,
        segue: true
      });
      break;
    case "xama1":
      J.totemAnc = 12;
      J.totens.push({ x: s.x, y: s.y, dono: s, dano: d * 2, el, cor, vida: 12, cd: 0, grande: true });
      break;
  }
}
// ================================================================ especial combinado (muda conforme o time)
export function tipoCombinado() {
  const eq = ativos(),
    F = D.combinado_regras.forca;
  for (const n of R.elos) {
    const e = D.elos.find(x => x.nome === n);
    if (e && eq.some(s => s.mon.id === e.a) && eq.some(s => s.mon.id === e.b))
      return { tipo: "elo", nome: n.replace(" (fusão)", ""), forca: F.elo };
  }
  if (eq.length === 3) {
    const li = linhagemDe(eq[0]);
    if (li !== "errante" && eq.every(s => linhagemDe(s) === li))
      return { tipo: "linhagem", chave: li, nome: D.combinados_linhagem[li], forca: F.linhagem };
    const el = elementoDe(eq[0]);
    if (eq.every(s => elementoDe(s) === el)) return { tipo: "elemento", chave: el, nome: D.combinados_elemento[el], forca: F.elemento };
  }
  if (SIN.chips.includes("Trindade")) return { tipo: "trindade", nome: "Formação Sagrada", forca: F.trindade };
  const els = [...new Set(eq.map(elementoDe))];
  for (let i = 0; i < els.length; i++)
    for (let j = i + 1; j < els.length; j++) {
      const r = REAC[[els[i], els[j]].sort().join("|")];
      if (r) return { tipo: "reacao", a: els[i], b: els[j], nome: `${r.nome} Suprema`, forca: F.reacao };
    }
  return { tipo: "basico", nome: "Investida Conjunta", forca: F.basico };
}
export function usarCombinado() {
  if (!J || pausado || J.comb > 0 || SIM.semEspeciais || !ativos().length) return;
  const c = tipoCombinado(),
    P = J.jogador,
    eq = ativos(),
    els = [...new Set(eq.map(elementoDe))];
  J.comb = D.combinado_regras.recarga_seg;
  R.st.combinados++;
  defFonte("combinado");
  const total = eq.reduce((t, s) => t + atrib(s).dano, 0) * 7 * c.forca;
  const naTela = f =>
    J.inimigos.forEach(e => {
      if (e.hp > 0 && Math.abs(e.x - P.x) < VW / 2 + 10 && Math.abs(e.y - P.y) < VH / 2 + 10) f(e);
    });
  texto(P.x, P.y - 28, c.nome, "#e0b0ff", 26);
  J.flash = { vida: 0.45, cor: COR[els[0]] };
  tremor(14);
  parar(0.18);
  vfxCombinado(c, P);
  eq.forEach(s => {
    anel(s.x, s.y, 40, COR[elementoDe(s)], 0.8);
    particulas(s.x, s.y, COR[elementoDe(s)], 30, 150, 2);
  });
  const pintar = (tipo: string, raio: number, dur: number) => {
    for (let i = 0; i < 60; i++) {
      const a = Math.random() * Math.PI * 2,
        r = Math.random() * raio;
      mudarSolo(P.x + Math.cos(a) * r, P.y + Math.sin(a) * r, tipo, dur);
    }
  };
  if (c.tipo === "reacao")
    naTela(e => {
      e.status = { el: c.a, t: J.t };
      e.reacCd = 0;
      ferir(e, total / 2, c.b);
    });
  else naTela(e => els.forEach(el => ferir(e, total / els.length, el)));
  switch (c.tipo) {
    case "elo":
      curar(J.vidaMax * 0.1);
      break;
    case "trindade":
      J.escudo = Math.min(J.vidaMax * 0.5, J.escudo + J.vidaMax * 0.3);
      curar(J.vidaMax * 0.3);
      break;
    case "linhagem":
      ({
        dragoes: () =>
          naTela(e => {
            e.dot = total * 0.05;
            e.dotT = 4;
          }),
        mortos_vivos: () => {
          for (let i = 0; i < 8; i++)
            J.crias.push({
              fonte: FONTE,
              autor: AUTOR,
              x: P.x + rnd(-30, 30),
              y: P.y + rnd(-30, 30),
              dano: total * 0.02,
              el: els[0],
              cor: "#9fa8b8",
              vida: 8,
              cd: 0
            });
        },
        feras: () => naTela(e => (e.vulner = 6)),
        gigantes: () => naTela(e => (e.congela = 2.5)),
        pequeninos: () => {
          for (let i = 0; i < 12; i++)
            J.crias.push({ fonte: FONTE, autor: AUTOR, x: P.x, y: P.y, dano: total * 0.015, el: els[0], cor: "#ffd34a", vida: 8, cd: 0 });
        },
        marinhos: () => {
          naTela(e => {
            const dx = e.x - P.x,
              dy = e.y - P.y,
              d = Math.hypot(dx, dy) || 1;
            e.x += (dx / d) * 40;
            e.y += (dy / d) * 40;
          });
          pintar("agua", 70, 25);
        },
        alados: () => {
          J.invuln = 3;
        },
        quimeras: () => naTela(e => (e.status = { el: escolha(ELS), t: J.t }))
      })[c.chave]();
      break;
    case "elemento":
      ({
        fogo: () => pintar("fogo", 70, 5),
        agua: () => pintar("agua", 80, 30),
        terra: () => naTela(e => (e.congela = 2)),
        ar: () =>
          naTela(e => {
            const dx = e.x - P.x,
              dy = e.y - P.y,
              d = Math.hypot(dx, dy) || 1;
            e.x += (dx / d) * 50;
            e.y += (dy / d) * 50;
          }),
        raio: () => {
          pintar("eletrico", 60, 4);
        },
        natureza: () => pintar("vinha", 70, 15),
        luz: () => {
          pintar("luz", 60, 15);
          curar(J.vidaMax * 0.2);
        },
        sombra: () => pintar("sombra", 80, 15)
      })[c.chave]();
      break;
  }
}
