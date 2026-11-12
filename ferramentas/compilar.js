// Gera js/jogo/*.js (o que o navegador carrega) a partir de src/jogo/*.ts (o que se edita).
//
//   npm run compilar              gera os arquivos
//   npm run compilar -- --conferir  só confere se os arquivos gravados batem com o TypeScript (a verificação do GitHub usa)
//
// Por que os .js ficam no repositório: o GitHub Pages serve os arquivos como estão, sem etapa de compilação. Gravando a saída,
// o jogo publicado continua funcionando sem mudar nenhuma configuração, e qualquer pessoa vê o código do jogo no GitHub.
//
// O que a compilação faz: só tira os tipos (anotações, "as", parâmetros "?"), arquivo por arquivo, sem juntar nem reescrever o
// código; cada .js tem as mesmas funções, na mesma ordem, com os mesmos comentários. A conferência de tipos é outra etapa
// (npm run tipos): aqui nada é conferido, então compilar é rápido e sempre dá o mesmo resultado.
const ts = require("typescript"),
  fs = require("fs"),
  path = require("path"),
  prettier = require("prettier");
const RAIZ = path.join(__dirname, ".."),
  SRC = path.join(RAIZ, "src/jogo"),
  OUT = path.join(RAIZ, "js/jogo");
const CONFERIR = process.argv.includes("--conferir");
const OPCOES = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ES2022,
  verbatimModuleSyntax: true, // os imports saem exatamente como escritos
  removeComments: false,
  newLine: ts.NewLineKind.LineFeed
};

(async () => {
  const cfg = await prettier.resolveConfig(path.join(RAIZ, ".prettierrc.json"));
  const fontes = fs
    .readdirSync(SRC)
    .filter(f => f.endsWith(".ts") && !f.endsWith(".d.ts"))
    .sort();
  const esperado = new Set(fontes.map(f => f.replace(/\.ts$/, ".js")));
  const diferentes = [];
  for (const f of fontes) {
    const ts0 = fs.readFileSync(path.join(SRC, f), "utf8");
    const r = ts.transpileModule(ts0, { compilerOptions: OPCOES, fileName: f, reportDiagnostics: true });
    const erros = (r.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
    if (erros.length) throw new Error(`${f}: ${erros.map(d => ts.flattenDiagnosticMessageText(d.messageText, " ")).join("; ")}`);
    const aviso = `// GERADO por "npm run compilar" a partir de src/jogo/${f}. Edite o .ts, não este arquivo.\n`;
    const js = await prettier.format(aviso + r.outputText, { ...cfg, parser: "babel", filepath: f.replace(/\.ts$/, ".js") });
    const destino = path.join(OUT, f.replace(/\.ts$/, ".js"));
    const atual = fs.existsSync(destino) ? fs.readFileSync(destino, "utf8") : null;
    if (atual !== js) {
      diferentes.push(path.basename(destino));
      if (!CONFERIR) fs.writeFileSync(destino, js);
    }
  }
  // .js que sobrou sem .ts correspondente (arquivo renomeado ou apagado em src/)
  const sobras = fs.readdirSync(OUT).filter(f => f.endsWith(".js") && !esperado.has(f));
  if (CONFERIR) {
    if (diferentes.length || sobras.length) {
      console.error(`js/jogo/ não corresponde a src/jogo/: ${[...diferentes, ...sobras.map(s => s + " (sem .ts)")].join(", ")}`);
      console.error('Rode "npm run compilar" e grave os arquivos gerados junto com a mudança no .ts.');
      process.exit(1);
    }
    console.log(`js/jogo/ corresponde a src/jogo/ (${fontes.length} arquivos).`);
  } else {
    for (const s of sobras) fs.unlinkSync(path.join(OUT, s));
    console.log(
      `${fontes.length} arquivos compilados; ${diferentes.length} mudaram${sobras.length ? `; removidos sem .ts: ${sobras.join(", ")}` : ""}.`
    );
  }
})().catch(e => {
  console.error(e.message || e);
  process.exit(1);
});
