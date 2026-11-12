// Gera src/dados.d.ts (o tipo do conteúdo do jogo, D) a partir de js/dados.js.
//
//   node ferramentas/tipos_dados.js              gera o arquivo
//   node ferramentas/tipos_dados.js --conferir   só confere se o tipo gravado corresponde aos dados (a verificação do GitHub usa)
//
// Regras:
//  - grupo de entradas com a mesma forma (classes, itens, eras, talismãs...) vira mapa: Record<string, T>. É o que o código
//    consulta com chave dinâmica (D.itens[k]);
//  - objeto cujas chaves são elementos, classes ou raridades também vira mapa (D.vantagem[el]);
//  - o resto vira estrutura com os campos nomeados (D.combo.janela_seg): nome digitado errado continua sendo erro;
//  - campo que aparece só em parte das entradas fica opcional; valores misturados viram união.
// É o primeiro passo da etapa 3 do plano (docs/PLANO_CODIGO.md): o próximo é validar os dados contra este tipo.
const fs = require("fs"),
  path = require("path");
const RAIZ = path.join(__dirname, ".."),
  ORIGEM = path.join(RAIZ, "js/dados.js"),
  DESTINO = path.join(RAIZ, "src/dados.d.ts");
const texto = fs.readFileSync(ORIGEM, "utf8");
const achado = /^const D = /m.exec(texto); // no começo de uma linha (o comentário do topo também cita o texto)
if (!achado) throw new Error('js/dados.js precisa começar o conteúdo com "const D = "');
const json = texto
  .slice(achado.index + achado[0].length)
  .trim()
  .replace(/;\s*$/, "");
const D = JSON.parse(json);

const ELEMENTOS = new Set(Object.keys(D.elementos || {}));
const CLASSES = new Set(Object.keys(D.classes || {}));
const RARIDADES = new Set(["comum", "incomum", "raro", "epico", "lendario"]);
const ehObjeto = v => v !== null && typeof v === "object" && !Array.isArray(v);
const chavesConhecidas = ks =>
  ks.length >= 3 && (ks.every(k => ELEMENTOS.has(k)) || ks.every(k => CLASSES.has(k)) || ks.every(k => RARIDADES.has(k)));
// mapa de entradas: 3 ou mais valores, todos objetos, com formas parecidas (a maioria das chaves em comum)
function ehMapaDeEntradas(o) {
  const vs = Object.values(o);
  if (vs.length < 3 || !vs.every(ehObjeto)) return false;
  const conj = vs.map(v => new Set(Object.keys(v)));
  const todas = new Set(conj.flatMap(s => [...s]));
  const comuns = [...todas].filter(k => conj.every(s => s.has(k)));
  return comuns.length >= Math.max(1, Math.min(2, todas.size * 0.3));
}
// também é mapa: 3 ou mais listas (pares, tuplas) ou 6 ou mais valores do mesmo tipo simples, com chaves de identificador
function ehMapaSimples(o) {
  const ks = Object.keys(o),
    vs = Object.values(o);
  if (!ks.every(k => /^[a-z][a-z0-9_]*$/.test(k))) return false;
  if (vs.length >= 3 && vs.every(Array.isArray)) return true;
  return vs.length >= 6 && new Set(vs.map(v => (v === null ? "null" : typeof v))).size === 1 && typeof vs[0] !== "object";
}
const nomeCampo = k => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
// tipo de um conjunto de valores que ocupam o mesmo lugar nos dados
function tipo(vals, recuo) {
  const tipos = new Set(),
    objs = [],
    listas = [];
  for (const v of vals) {
    if (v === null) tipos.add("null");
    else if (Array.isArray(v)) listas.push(v);
    else if (ehObjeto(v)) objs.push(v);
    else tipos.add(typeof v);
  }
  if (listas.length) {
    const itens = listas.flat();
    // lista de tamanho fixo e curto com posições de tipos diferentes vira tupla
    const L = listas[0].length,
      tupla =
        listas.every(l => l.length === L && l.every(x => !ehObjeto(x) && !Array.isArray(x))) &&
        L >= 2 &&
        L <= 4 &&
        new Set(listas[0].map(x => (x === null ? "null" : typeof x))).size > 1;
    if (tupla)
      tipos.add(
        "[" +
          Array.from({ length: L }, (_, i) =>
            tipo(
              listas.map(l => l[i]),
              recuo
            )
          ).join(", ") +
          "]"
      );
    else tipos.add(itens.length ? `(${tipo(itens, recuo)})[]` : "unknown[]");
  }
  if (objs.length) tipos.add(tipoObjeto(objs, recuo));
  const t = [...tipos];
  return t.length ? t.join(" | ") : "unknown";
}
function tipoObjeto(objs, recuo) {
  const r = "  ".repeat(recuo + 1),
    fim = "  ".repeat(recuo);
  const todasChaves = [...new Set(objs.flatMap(o => Object.keys(o)))];
  if (objs.every(o => ehMapaDeEntradas(o) || ehMapaSimples(o) || chavesConhecidas(Object.keys(o))) && todasChaves.length)
    return `Record<string, ${tipo(
      objs.flatMap(o => Object.values(o)),
      recuo
    )}>`;
  if (!todasChaves.length) return "Record<string, never>";
  const campos = todasChaves.map(k => {
    const presentes = objs.filter(o => k in o);
    return `${r}${nomeCampo(k)}${presentes.length < objs.length ? "?" : ""}: ${tipo(
      presentes.map(o => o[k]),
      recuo + 1
    )};`;
  });
  return `{\n${campos.join("\n")}\n${fim}}`;
}
const saida = `// GERADO por "node ferramentas/tipos_dados.js" a partir de js/dados.js. Não edite: edite os dados e gere de novo.
// O tipo do conteúdo do jogo (D). Grupos de entradas viram Record<string, ...>; configurações ficam com os campos nomeados.
interface Dados ${tipoObjeto([D], 0)}
declare const D: Dados;
`;
if (process.argv.includes("--conferir")) {
  const atual = fs.existsSync(DESTINO) ? fs.readFileSync(DESTINO, "utf8") : "";
  if (atual !== saida) {
    console.error('src/dados.d.ts não corresponde a js/dados.js. Rode "node ferramentas/tipos_dados.js" e grave o resultado.');
    process.exit(1);
  }
  console.log("src/dados.d.ts corresponde a js/dados.js.");
} else {
  fs.writeFileSync(DESTINO, saida);
  console.log(`src/dados.d.ts gerado (${saida.split("\n").length} linhas).`);
}
