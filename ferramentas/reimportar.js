// Refaz os imports de todos os módulos de js/jogo/ a partir do que cada arquivo realmente usa.
//
//   node ferramentas/reimportar.js
//
// Para que serve: mover uma função (ou um trecho) de um módulo para outro. Recorte e cole o código no arquivo novo, rode este
// script e os imports de todos os módulos ficam certos. Ele também atualiza a lista de módulos da ponte de teste
// (js/jogo/ponte_teste.js) e do service worker (sw.js). Depois: npm run formatar, npm run tipos e node testes/reproduzir.js.
//
// Como funciona: tira todos os imports, pede ao verificador do TypeScript os nomes que ficaram sem dono em cada arquivo
// ("Cannot find name") e importa cada um do módulo que o exporta. Não adivinha por texto: nome igual em escopo local não confunde.
// Cada módulo importa primeiro o anterior (pela ordem dos nomes dos arquivos): é isso que mantém a ordem de avaliação.
//
// Regra que o script não resolve sozinho: só o módulo dono pode atribuir numa variável exportada. Se o verificador acusar
// "Cannot assign to ... because it is an import", crie no módulo dono uma função de escrita (como defJ e defPausado em 01_nucleo.js).
const ts = require("typescript"), fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, ".."), DIR = path.join(RAIZ, "js/jogo");
const ehParte = f => /^\d\d[a-z]?_.*\.js$/.test(f);
const ordem = fs.readdirSync(DIR).filter(ehParte).sort(), caminho = f => path.join(DIR, f);
const parse = (nome, txt) => ts.createSourceFile(nome, txt, ts.ScriptTarget.ES2022, true, ts.ScriptKind.JS);
// códigos de "nome não encontrado": 2304 e 2552 (comum), 18004 (propriedade abreviada {x}), 2580 a 2584 e 2592 (nomes que o
// TypeScript acha que são de biblioteca, como $)
const SEM_DONO = new Set([2304, 2552, 18004, 2580, 2581, 2582, 2583, 2584, 2592]);

// 1) tira os imports (o cabeçalho de comentários fica)
const dono = new Map();
for (const f of ordem) {
  const txt = fs.readFileSync(caminho(f), "utf8"), sf = parse(f, txt), imps = sf.statements.filter(ts.isImportDeclaration);
  if (imps.some((s, i) => sf.statements[i] !== s)) throw new Error(`${f}: há import depois de código; deixe todos no começo do arquivo`);
  let out = txt;
  if (imps.length) {
    const ini = imps[0].getStart(sf), fim = txt.indexOf("\n", imps[imps.length - 1].end) + 1;   // leva junto o comentário da linha do último import
    out = txt.slice(0, ini) + txt.slice(fim);
  }
  fs.writeFileSync(caminho(f), out);
  // quem exporta o quê
  for (const st of parse(f, out).statements) {
    if (!(ts.getCombinedModifierFlags(st) & ts.ModifierFlags.Export)) continue;
    const reg = n => { if (dono.has(n) && dono.get(n) !== f) throw new Error(`"${n}" é exportado por ${dono.get(n)} e por ${f}`); dono.set(n, f); };
    const visita = n => { if (ts.isIdentifier(n)) reg(n.text); else n.elements.forEach(e => !ts.isOmittedExpression(e) && visita(e.name)); };
    if ((ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st)) && st.name) reg(st.name.text);
    else if (ts.isVariableStatement(st)) st.declarationList.declarations.forEach(d => visita(d.name));
  }
}

// 2) o verificador diz o que falta em cada arquivo
const prog = ts.createProgram(
  [path.join(RAIZ, "js/tipos.d.ts"), path.join(RAIZ, "js/plataforma.js"), path.join(RAIZ, "js/dados.js"), ...ordem.map(caminho)],
  { allowJs: true, checkJs: true, noEmit: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, moduleResolution: ts.ModuleResolutionKind.Bundler, lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"], skipLibCheck: true }
);
let total = 0;
const problemas = [];
for (const f of ordem) {
  const sf = prog.getSourceFile(caminho(f)), falta = {};
  for (const d of prog.getSemanticDiagnostics(sf)) {
    if (!SEM_DONO.has(d.code)) continue;
    const nome = sf.text.slice(d.start, d.start + d.length), de = dono.get(nome);
    if (!de) problemas.push(`${f}: "${nome}" não é exportado por nenhum módulo`);
    else if (de !== f) (falta[de] = falta[de] || new Set()).add(nome);
  }
  const i = ordem.indexOf(f);
  let imp = "";
  if (i > 0) imp += `import "./${ordem[i - 1]}"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos\n`;
  for (const d of Object.keys(falta).sort()) {
    imp += `import { ${[...falta[d]].sort((a, b) => a.localeCompare(b)).join(", ")} } from "./${d}";\n`;
    total += falta[d].size;
  }
  // os imports entram depois do cabeçalho: as linhas de comentário do começo do arquivo, antes do primeiro título de seção
  const linhas = sf.text.split("\n");
  let k = 0;
  while (k < linhas.length && linhas[k].startsWith("//") && !/^\/\/ (={10,}|-{10,})/.test(linhas[k])) k++;
  fs.writeFileSync(caminho(f), linhas.slice(0, k).join("\n") + "\n" + imp + linhas.slice(k).join("\n"));
}

// 3) a ponte de teste e o service worker acompanham a lista de módulos
{
  const p = caminho("ponte_teste.js");
  let s = fs.readFileSync(p, "utf8");
  const ini = s.indexOf("import * as"), fim = s.indexOf("\n", s.lastIndexOf("import * as")) + 1;
  s = s.slice(0, ini) + ordem.map((f, k) => `import * as m${k} from "./${f}";`).join("\n") + "\n" + s.slice(fim);
  s = s.replace(/for \(const m of \[[^\]]*\]\)/, `for (const m of [${ordem.map((_, k) => "m" + k).join(", ")}])`);
  fs.writeFileSync(p, s);
}
{
  const p = path.join(RAIZ, "sw.js");
  const s = fs.readFileSync(p, "utf8"), novo = s.replace(/("js\/jogo\/\d\d[a-z]?_[^"]+",\s*)+/, ordem.map(f => `"js/jogo/${f}", `).join(""));
  if (!/"js\/jogo\/\d\d[a-z]?_/.test(novo)) throw new Error("sw.js: lista de módulos não encontrada");
  fs.writeFileSync(p, novo);
}
console.log(`${ordem.length} módulos, ${total} nomes importados.`);
if (problemas.length) {
  console.error([...new Set(problemas)].join("\n"));
  process.exit(1);
}
