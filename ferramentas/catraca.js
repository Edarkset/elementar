// Catraca das regras rígidas do TypeScript que ainda não estão ligadas no tsconfig.json.
//
//   node ferramentas/catraca.js            confere: falha se alguma regra tiver MAIS pendências do que o registrado
//   node ferramentas/catraca.js --gravar   grava as contagens atuais (use depois de reduzir pendências)
//
// Por que existe: noImplicitAny e strictNullChecks ainda têm pendências no código antigo. Ligar as regras agora exigiria
// espalhar marcadores artificiais (any, !) pelo código. A catraca faz as regras valerem para código novo: um envio que
// aumente qualquer contagem falha na verificação. A contagem só pode descer; quando chegar a zero, a regra vai para o tsconfig.json.
const { execFileSync } = require("child_process"),
  fs = require("fs"),
  path = require("path");
const RAIZ = path.join(__dirname, ".."),
  ARQ = path.join(__dirname, "catraca.json");
const REGRAS = ["noImplicitAny", "strictNullChecks"];
const tsc = path.join(RAIZ, "node_modules/typescript/bin/tsc");
function contar(regra) {
  let saida = "";
  try {
    saida = execFileSync(process.execPath, [tsc, "-p", path.join(RAIZ, "tsconfig.json"), `--${regra}`], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024
    });
  } catch (e) {
    saida = e.stdout || "";
  }
  return (saida.match(/error TS\d+/g) || []).length;
}
const atual = Object.fromEntries(REGRAS.map(r => [r, contar(r)]));
if (process.argv.includes("--gravar")) {
  fs.writeFileSync(ARQ, JSON.stringify(atual, null, 2) + "\n");
  console.log("Catraca gravada:", JSON.stringify(atual));
  process.exit(0);
}
const registrado = fs.existsSync(ARQ) ? JSON.parse(fs.readFileSync(ARQ, "utf8")) : {};
let falhou = false;
for (const r of REGRAS) {
  const antes = registrado[r] ?? Infinity,
    agora = atual[r];
  if (agora > antes) {
    falhou = true;
    console.error(
      `${r}: ${agora} pendências (eram ${antes}). O código novo precisa de tipos (npx tsc -p tsconfig.json --${r} mostra onde).`
    );
  } else if (agora < antes)
    console.log(`${r}: ${agora} pendências (eram ${antes}). Boa: rode "node ferramentas/catraca.js --gravar" para travar o ganho.`);
  else console.log(`${r}: ${agora} pendências (igual ao registrado).`);
}
process.exit(falhou ? 1 : 0);
