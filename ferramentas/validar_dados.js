// Confere as referências do conteúdo do jogo (js/dados.js): tudo que uma entrada cita precisa existir.
//
//   node ferramentas/validar_dados.js
//
// O tipo gerado (src/dados.d.ts) garante a forma dos dados; esta conferência garante o que o tipo não vê: que a classe de um
// monstro existe, que o universo de uma Lenda existe, que uma reação liga dois elementos de verdade, que nenhum id se repete.
// Um erro destes não aparece no carregamento: só quando o jogo sorteia aquela entrada, às vezes no meio de uma run.
// Sai com código 1 e lista cada problema. A verificação do GitHub roda a cada envio.
const fs = require("fs"),
  path = require("path");
const texto = fs.readFileSync(path.join(__dirname, "../js/dados.js"), "utf8");
const achado = /^const D = /m.exec(texto);
const D = JSON.parse(
  texto
    .slice(achado.index + achado[0].length)
    .trim()
    .replace(/;\s*$/, "")
);

const problemas = [];
const erro = (onde, msg) => problemas.push(`${onde}: ${msg}`);
const conjunto = (lista, k = "id") => new Set(lista.map(x => x[k]));
const ELEMENTOS = new Set(Object.keys(D.elementos)),
  CLASSES = new Set(Object.keys(D.classes)),
  LINHAGENS = new Set(Object.keys(D.linhagens)),
  ERAS = new Set(Object.keys(D.eras)),
  UNIVERSOS = conjunto(D.universos),
  MONSTROS = new Set([...D.linhas, ...(D.ancestrais || [])].map(l => l.id)),
  TALISMAS = new Set(Object.keys(D.poderes.talismas));
const deve = (conj, v, onde, oque) => conj.has(v) || erro(onde, `${oque} "${v}" não existe`);

// ids repetidos: a segunda entrada fica inalcançável e o save mistura as duas
for (const [nome, lista] of [
  ["linhas e ancestrais", [...D.linhas, ...(D.ancestrais || [])]],
  ["universos", D.universos],
  // Lendas e deuses juntos: a run guarda só o id (R.lenda) e o jogo procura primeiro nas Lendas; id igual esconderia o deus
  ["lendas e panteao", [...D.lendas, ...D.panteao]],
  ["conquistas", D.conquistas]
]) {
  const vistos = new Set();
  for (const e of lista) {
    if (typeof e.id !== "string" || !e.id) erro(nome, `entrada sem id (${JSON.stringify(e).slice(0, 60)})`);
    else if (vistos.has(e.id)) erro(nome, `id "${e.id}" repetido`);
    vistos.add(e.id);
  }
}

// monstros: elemento, classe, linhagem e universo
for (const l of D.linhas) {
  const onde = `linhas/${l.id}`;
  deve(ELEMENTOS, l.elemento, onde, "elemento");
  deve(CLASSES, l.classe, onde, "classe");
  deve(LINHAGENS, l.linhagem, onde, "linhagem");
  deve(UNIVERSOS, l.universo, onde, "universo");
  if (!Array.isArray(l.ramos) || !l.ramos.length) erro(onde, "sem ramos de evolução");
}
for (const l of D.ancestrais || []) {
  const onde = `ancestrais/${l.id}`;
  deve(ELEMENTOS, l.elemento, onde, "elemento");
  deve(CLASSES, l.classe, onde, "classe");
  deve(LINHAGENS, l.linhagem, onde, "linhagem");
  if (l.universo !== null) deve(UNIVERSOS, l.universo, onde, "universo");
}

// mapas e eras
for (const u of D.universos) {
  deve(ERAS, u.era, `universos/${u.id}`, "era");
  deve(ELEMENTOS, u.elemento, `universos/${u.id}`, "elemento");
}
for (const e of D.eras_ordem) deve(ERAS, e, "eras_ordem", "era");
for (const e of ERAS) if (!D.eras_ordem.includes(e)) erro("eras_ordem", `a era "${e}" não está na ordem`);
for (const e of ERAS) if (!D.universos.some(u => u.era === e)) erro(`eras/${e}`, "nenhum universo nesta era");

// elementos: vantagem cobre todos, e cada reação liga dois elementos diferentes, sem par repetido
for (const el of ELEMENTOS) if (!(el in D.vantagem)) erro("vantagem", `"${el}" não vence ninguém`);
for (const [a, b] of Object.entries(D.vantagem)) {
  deve(ELEMENTOS, a, "vantagem", "elemento");
  deve(ELEMENTOS, b, "vantagem", "elemento");
}
const pares = new Set();
for (const [k, r] of Object.entries(D.reacoes)) {
  const onde = `reacoes/${k} (${r.nome})`;
  deve(ELEMENTOS, r.a, onde, "elemento");
  deve(ELEMENTOS, r.b, onde, "elemento");
  if (r.a === r.b) erro(onde, "liga um elemento a ele mesmo");
  const par = [r.a, r.b].sort().join("+");
  if (pares.has(par)) erro(onde, `o par ${par} já tem reação`);
  pares.add(par);
}

// Lendas, deuses e elos entre monstros
for (const l of D.lendas) {
  deve(UNIVERSOS, l.universo, `lendas/${l.id}`, "universo");
  for (const el of l.elementos) deve(ELEMENTOS, el, `lendas/${l.id}`, "elemento");
}
for (const g of D.panteao) for (const el of g.elementos) deve(ELEMENTOS, el, `panteao/${g.id}`, "elemento");
const elos = new Set();
for (const e of D.elos) {
  const onde = `elos/${e.nome}`;
  deve(MONSTROS, e.a, onde, "monstro");
  deve(MONSTROS, e.b, onde, "monstro");
  if (e.a === e.b) erro(onde, "liga um monstro a ele mesmo");
  const par = [e.a, e.b].sort().join("+");
  if (elos.has(par)) erro(onde, `o par ${par} já tem elo`);
  elos.add(par);
}
for (const k of Object.keys(D.combinados_linhagem)) deve(LINHAGENS, k, "combinados_linhagem", "linhagem");
for (const k of Object.keys(D.combinados_elemento)) deve(ELEMENTOS, k, "combinados_elemento", "elemento");

// conquistas: o universo e o talismã que dão precisam existir
for (const c of D.conquistas) {
  if (c.universo != null) deve(UNIVERSOS, c.universo, `conquistas/${c.id}`, "universo");
  if (c.talisma != null) deve(TALISMAS, c.talisma, `conquistas/${c.id}`, "talismã");
}

if (problemas.length) {
  console.error(`js/dados.js tem ${problemas.length} referência(s) quebrada(s):\n- ` + problemas.join("\n- "));
  process.exit(1);
}
console.log(
  `js/dados.js: referências conferidas (${MONSTROS.size} monstros, ${UNIVERSOS.size} universos, ${pares.size} reações, ${elos.size} elos, ${D.conquistas.length} conquistas).`
);
