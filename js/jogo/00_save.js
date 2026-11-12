// GERADO por "npm run compilar" a partir de src/jogo/00_save.ts. Edite o .ts, não este arquivo.
// Save: versão, migração e conferência na leitura.
//
// O texto do save vem do localStorage (navegador) ou de um arquivo (computador/Steam) e pode estar velho, cortado ou mexido à mão.
// Antes, ele entrava direto em META e na run salva: um campo com tipo errado ou um monstro que não existe mais travava o menu
// ou o Pacto. Agora cada campo é conferido aqui:
//  - texto ilegível: o jogo começa do zero, mas o texto original é guardado à parte (não é sobrescrito no próximo gravar);
//  - campo com tipo errado: some, e o jogo usa o valor padrão daquele campo (o resto do progresso fica);
//  - id que o conteúdo não tem mais (monstro, Lenda, deus, talismã): sai da lista;
//  - run salva que não dá para continuar: é descartada; o progresso permanente fica.
// Campos que esta versão não conhece são mantidos como estão: um save de uma versão mais nova não perde nada ao passar por aqui.
//
// Este módulo não importa nada do jogo e não sorteia nada (não muda a partida): recebe o catálogo do conteúdo e devolve o save
// conferido. Por isso é testado direto no Node (testes/save.js). Os tipos Catalogo e SaveLido estão em src/tipos.d.ts.
/** versão do formato gravado; suba e escreva a migração em MIGRACOES quando o formato mudar */
export const VERSAO_SAVE = 1;
/** catálogo a partir do conteúdo (D). Monstros são as linhas e também os Dragões Ancestrais (os mesmos que LINHA conhece).
 * O jogo (01_nucleo) e o teste (testes/save.js) usam esta mesma função: os dois não podem divergir. */
export function catalogoDe(d) {
  return {
    linhas: new Set([...d.linhas, ...(d.ancestrais || [])].map(l => l.id)),
    universos: new Set(d.universos.map(u => u.id)),
    lendas: new Set(d.lendas.map(l => l.universo)),
    deuses: new Set(d.panteao.map(g => g.id)),
    talismas: new Set(Object.keys(d.poderes.talismas)),
    elementos: new Set(Object.keys(d.elementos))
  };
}
/** cópias dos saves originais que precisaram de correção: a primeira de todas e as duas mais recentes (sem repetir) */
export function juntarRecuperacao(guardado, texto, quando) {
  let lista = [];
  if (guardado)
    try {
      const v = JSON.parse(guardado);
      if (Array.isArray(v)) lista = v.filter(e => ehObj(e) && typeof e.texto === "string");
      else lista = [{ quando: "?", texto: guardado }];
    } catch (e) {
      lista = [{ quando: "?", texto: guardado }];
    }
  if (!lista.some(e => e.texto === texto)) lista.push({ quando, texto });
  if (lista.length > 3) lista = [lista[0], ...lista.slice(-2)];
  return JSON.stringify(lista);
}
const ehObj = v => typeof v === "object" && v !== null && !Array.isArray(v);
const ehNum = v => typeof v === "number" && Number.isFinite(v);
const ehNumNaoNeg = v => ehNum(v) && v >= 0;
// Migrações: MIGRACOES[n] leva um save da versão n para a n + 1. Saves sem número de versão são a versão 0,
// que tem o mesmo formato da 1 (a versão passou a ser gravada a partir da 1).
const MIGRACOES = [s => s];
/** lê o texto gravado e devolve o save conferido */
export function lerTextoSave(texto, cat) {
  const avisos = [];
  if (!texto) return { meta: {}, run: null, avisos, ilegivel: false };
  let bruto;
  try {
    bruto = JSON.parse(texto);
  } catch (e) {
    return { meta: {}, run: null, avisos: ["o texto do save está corrompido"], ilegivel: true };
  }
  if (!ehObj(bruto)) return { meta: {}, run: null, avisos: ["o save não tem o formato esperado"], ilegivel: true };
  let s = bruto,
    v = ehNumNaoNeg(s.v) ? Math.floor(s.v) : 0;
  if (v > VERSAO_SAVE) avisos.push(`save da versão ${v}, mais nova que esta (${VERSAO_SAVE}): lido no que esta versão entende`);
  for (; v < VERSAO_SAVE; v++) s = MIGRACOES[v](s);
  return { meta: sanearMeta(s.meta, cat, avisos), run: sanearRun(s.run, cat, avisos), avisos, ilegivel: false };
}
/** texto a gravar: sempre com a versão do formato */
export function textoSave(meta, run) {
  return JSON.stringify({ v: VERSAO_SAVE, meta, run });
}
// ---------------------------------------------------------------- progresso permanente
function sanearMeta(m, cat, avisos) {
  if (m === undefined || m === null) return {};
  if (!ehObj(m)) {
    avisos.push("progresso com formato errado: começa do zero");
    return {};
  }
  const out = { ...m };
  const tirar = (k, motivo) => {
    delete out[k];
    avisos.push(`${k}: ${motivo}`);
  };
  for (const k of ["essencia", "recorde"]) if (k in out && !ehNumNaoNeg(out[k])) tirar(k, "não era um número válido");
  if ("dexMarco" in out && !ehNumNaoNeg(out.dexMarco)) tirar("dexMarco", "não era um número válido");
  // listas de ids: só ficam os que o conteúdo tem (um id desconhecido quebrava o Pacto e as telas de coleção)
  const listas = [
    ["liberados", cat.linhas],
    ["lendas", cat.lendas],
    ["deuses", cat.deuses],
    ["talismas", cat.talismas]
  ];
  for (const [k, conhecidos] of listas) {
    if (!(k in out)) continue;
    const l = out[k];
    if (!Array.isArray(l)) {
      tirar(k, "não era uma lista");
      continue;
    }
    const bons = [...new Set(l.filter(id => typeof id === "string" && conhecidos.has(id)))];
    if (bons.length !== l.length) avisos.push(`${k}: ${l.length - bons.length} item(ns) desconhecido(s) ou repetido(s) removido(s)`);
    if (k === "liberados" && !bons.length) tirar(k, "nenhum monstro conhecido (volta à coleção inicial)");
    else out[k] = bons;
  }
  // tabelas de números (contadores, conquistas, loja)
  for (const k of ["cont", "conq", "loja"]) {
    if (!(k in out)) continue;
    const t = out[k];
    if (!ehObj(t)) {
      tirar(k, "não era uma tabela");
      continue;
    }
    const bons = Object.fromEntries(Object.entries(t).filter(([, n]) => ehNum(n)));
    if (Object.keys(bons).length !== Object.keys(t).length) avisos.push(`${k}: valores que não eram números removidos`);
    out[k] = bons;
  }
  // Bestiário: { id: { f: formas vistas (bits), r: raridades vistas } }
  if ("dex" in out) {
    const d = out.dex;
    if (!ehObj(d)) tirar("dex", "não era uma tabela (refeito a partir da coleção)");
    else {
      const bons = {};
      for (const [id, e] of Object.entries(d))
        if (cat.linhas.has(id) && ehObj(e) && ehNumNaoNeg(e.f))
          bons[id] = { ...e, f: Math.floor(e.f), r: Array.isArray(e.r) ? e.r.filter(x => typeof x === "string") : [] };
      if (Object.keys(bons).length !== Object.keys(d).length) avisos.push("dex: entradas desconhecidas ou ilegíveis removidas");
      out.dex = bons;
    }
  }
  if ("som" in out) {
    const som = out.som;
    if (!ehObj(som)) tirar("som", "não era uma tabela");
    else if ("vol" in som && !(ehNum(som.vol) && som.vol >= 0 && som.vol <= 1)) {
      const { vol, ...resto } = som;
      out.som = resto;
      avisos.push("som.vol: fora de 0 a 1");
    }
  }
  // missões do dia: sem a lista, o jogo sorteia as do dia de novo
  if ("diarias" in out && !(ehObj(out.diarias) && Array.isArray(out.diarias.lista))) tirar("diarias", "formato errado (sorteadas de novo)");
  for (const k of ["moderador", "modUsado", "escolhaManual", "dicaReacao"])
    if (k in out && typeof out[k] !== "boolean") {
      out[k] = !!out[k];
      avisos.push(`${k}: não era sim/não`);
    }
  return out;
}
// ---------------------------------------------------------------- run salva
// A run é conferida no que o jogo precisa para continuar; se algo essencial estiver errado, ela é descartada inteira
// (remendar uma run pela metade daria uma partida diferente da que foi salva).
function sanearRun(r, cat, avisos) {
  if (r === undefined || r === null) return null;
  const erro = problemaRun(r, cat);
  if (erro) {
    avisos.push(`run salva descartada: ${erro}`);
    return null;
  }
  return r;
}
function problemaRun(r, cat) {
  if (!ehObj(r)) return "não é uma run";
  if (!Array.isArray(r.pacto) || !r.pacto.every(el => typeof el === "string" && cat.elementos.has(el)))
    return "pacto com elemento desconhecido";
  if (typeof r.universo !== "string" || !cat.universos.has(r.universo)) return "mapa desconhecido";
  for (const k of ["profundidade", "eraIdx", "mapaNaEra"]) if (!ehNumNaoNeg(r[k])) return `${k} não é um número válido`;
  if (!Array.isArray(r.selos) || !r.selos.length) return "equipe vazia";
  const monstroOk = m => ehObj(m) && typeof m.id === "string" && cat.linhas.has(m.id) && typeof m.rar === "string";
  for (const s of r.selos) {
    if (!ehObj(s) || !ehNumNaoNeg(s.nivel) || !ehObj(s.pod)) return "selo da equipe ilegível";
    if (s.mon !== null && s.mon !== undefined && !monstroOk(s.mon)) return "monstro da equipe desconhecido";
  }
  for (const k of ["reserva", "ninho", "reliquias", "elos"]) if (k in r && !Array.isArray(r[k])) return `${k} não é uma lista`;
  if (Array.isArray(r.reserva) && !r.reserva.every(monstroOk)) return "monstro da reserva desconhecido";
  if (Array.isArray(r.ninho) && !r.ninho.every(o => ehObj(o) && typeof o.id === "string" && cat.linhas.has(o.id)))
    return "ovo do ninho desconhecido";
  if ("itens" in r && !ehObj(r.itens)) return "bolsa ilegível";
  return null;
}
