// Gera o pacote de prompts de arte (docs/prompts/): UM ARQUIVO .txt POR IMAGEM, com o nome dizendo o que salvar e o que anexar.
//
//   node ferramentas/gerar_prompts.js              grava docs/prompts/
//   node ferramentas/gerar_prompts.js --conferir   só confere se docs/prompts/ está em dia (usado no npm run testar)
//
// Base: o pacote v2 que já está em produção (ferramentas/prompts_v2_base.json, tirado de elementar_prompts_v2.zip): mesmas
// pastas (1_corrigir, 2_novas, 3_complementares), mesmos nomes de arquivo, mesmas grades e células, para casar com os modelos
// de nome e o importador. Em cima de cada prompt entram as travas desta revisão:
//   - isolamento: imagem nova, o único personagem é este, a única referência é o anexo DESTA mensagem;
//   - tamanho: a grade cobre a imagem inteira mesmo que o gerador só faça 1536x1024 ou 1024x1024 (eu ajusto ao converter);
//   - fundo: transparente de verdade, ou magenta chapado (só alfa para personagem rosa/roxo, que o magenta apagaria);
//   - raridades: o tema de cada monstro com a condição do ambiente (ferramentas/raridades_arte.js) e dois anexos;
//   - ponte: só deitada (o jogo gira); ajustes da auditoria (Supremo imponente, contorno nos escuros, núcleo nos etéreos);
//   - a lista do que não pode sair e a conferência final.
// Também grava a tabela de grades por arquivo (ferramentas/grades_arte.js), que a página de conferência usa.
"use strict";
const fs = require("fs"),
  path = require("path");
const RAIZ = path.join(__dirname, ".."),
  SAIDA = path.join(RAIZ, "docs", "prompts");
const D = new Function(fs.readFileSync(path.join(RAIZ, "js", "dados.js"), "utf8") + ";return D;")();
const RAR = require("./raridades_arte.js"),
  LAY = require("./layouts_arte.js");
const BASE = JSON.parse(fs.readFileSync(path.join(__dirname, "prompts_v2_base.json"), "utf8"));
const CONFERIR = process.argv.includes("--conferir");

const EL = {
  fogo: "fire",
  agua: "water",
  terra: "earth",
  ar: "air",
  raio: "lightning",
  natureza: "nature",
  luz: "light",
  sombra: "shadow"
};
const LINHA = Object.fromEntries(D.linhas.map(l => [l.id, l]));

// ---------------------------------------------------------------- tipos de folha (pela categoria do v2)
const TIPO = cat =>
  cat === "textura"
    ? "opaco"
    : /^efeito|^particulas|^coletavel|^ui/.test(cat)
      ? "efeito"
      : /^reino_(ponte|paredao|cachoeira|fundo2|props_anim)|^superficie|^reliquia|^retrato/.test(cat)
        ? "cenario"
        : "personagem";

// ---------------------------------------------------------------- blocos de trava
const FUNDO =
  "BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.";
const FUNDO_SO_ALFA =
  "BACKGROUND: fully transparent (real alpha channel). This subject has pink or purple colors, so NEVER use a magenta or colored background: only real transparency. No checkerboard, no white or grey background.";
const ROSA = /pink|purple|violet|magenta|lavender|rose|periwinkle|rosa|roxo|lil[aá]s|violeta/i;
const PROIBIDO =
  "DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground or cast shadow (unless this is a ground texture); paint a checkerboard pattern to fake transparency; add any character or object that was not requested, or two poses in the same cell; change colors, size or design between frames; crop anything at a cell edge; stretch or squash anything.";

function isolamento(item, doisAnexos) {
  const anexo = item.anexo && item.anexo !== "-";
  return `NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: ${item.titulo}. ${
    !anexo
      ? "There is no reference image for this one: ignore any image attached earlier in the conversation."
      : doisAnexos
        ? "The ONLY references are the two images attached to THIS message."
        : "The ONLY reference is the image attached to THIS message."
  }`;
}
// a grade sempre cobre a imagem inteira: o gerador costuma só fazer 1536x1024 ou 1024x1024, e eu ajusto ao converter
function regrasGrade(regras) {
  return regras
    .replace(/^Sprite sheet rules: transparent background \(PNG with alpha\), /, "Sprite sheet rules: ")
    .replace(
      /^Single image rules: transparent background \(PNG with alpha\) unless the prompt says it is an opaque texture, /,
      "Single image rules: "
    )
    .replace(
      /Exact uniform grid of (\d+) columns x (\d+) rows of square cells, each cell (\d+)x\d+ px, total image (\d+)x(\d+) px\./,
      (m, c, r, cel, w, h) =>
        `GRID: exactly ${c} columns x ${r} rows of equal cells (${c * r} cells in total), filling the WHOLE image edge to edge, one pose per cell, ${c} per row, no more, no less. Ideal size ${w}x${h} px (cells ${cel}x${cel}). If your tool only makes fixed sizes (like 1536x1024), use a landscape canvas and still divide the WHOLE image into exactly ${c} x ${r} equal cells (the cells may then be taller than wide). Do NOT draw the grid.`
    );
}
function conferencia(item, tipo, fundoSoAlfa) {
  const [c, r] = item.grade.split("x").map(Number),
    um = c * r === 1;
  return `BEFORE YOU FINISH, CHECK: ${um ? "one single subject" : `exactly ${c} items in every row and exactly ${r} rows (${c * r} in total)`}; nothing from earlier images of this conversation; ${
    tipo === "opaco"
      ? "no visible seam when the texture is tiled"
      : fundoSoAlfa
        ? "real transparent background (never magenta), no checkerboard"
        : "transparent (or flat #FF00FF magenta) background, no checkerboard"
  }; nothing written anywhere.`;
}

// ---------------------------------------------------------------- monstros: de que monstro e de que forma é o arquivo
function monstroDe(saida) {
  const m = /arte\/monstros\/([a-z]+)\/([a-z_]+?)__(anim|acoes)_(\d)(?:__(epico|lendario))?\.png$/.exec(saida);
  return m ? { el: m[1], id: m[2], tipo: m[3], n: +m[4], rar: m[5] || null } : null;
}
// ajustes da auditoria das telas (docs/PACOTE_ARTES_COMPLETO.md, parte 2)
const ESCUROS = new Set([
  "jiangshi",
  "vampiro",
  "cerbero",
  "morcego",
  "mumia",
  "draugr",
  "fomoriano",
  "pirata_fantasma",
  "cacada_selvagem"
]);
const ETEREOS = new Set(["banshee", "raiju", "kitsune", "fogo_fatuo", "fada"]);
function auditoria(m) {
  const l = LINHA[m.id],
    ex = [];
  if (m.n >= 6)
    ex.push(
      "SUPREME FORM: make the silhouette noticeably bulkier and more imposing than the adult form (crest, horns, armor or aura), keeping the same cell size and feet line."
    );
  if (ESCUROS.has(m.id) || (l && l.elemento === "sombra"))
    ex.push(
      `READABILITY: add a clear rim light in the ${EL[(l && l.elemento) || m.el]} color around the silhouette so it does not disappear on dark floors.`
    );
  if (ETEREOS.has(m.id)) ex.push("READABILITY: keep a saturated glowing core and a firm dark outline; avoid pale washed-out edges.");
  return ex;
}

// ---------------------------------------------------------------- prompt de cada arquivo
function montar(item) {
  const tipo = TIPO(item.categoria),
    m = monstroDe(item.saida),
    l = m && LINHA[m.id];
  let corpo = item.corpo,
    referencia = item.referencia || "",
    arquivo = item.arquivo,
    doisAnexos = false;
  const extra = [];
  // raridade: tema do monstro (com a condição) e dois anexos (base da forma + imagem fixa da raridade)
  if (item.categoria === "monstro_raridade" && m && m.rar) {
    const t = RAR.tema(m.id, m.rar),
      RAROT = m.rar === "epico" ? "EPIC" : "LEGENDARY";
    corpo = corpo.replace(
      /redesigned as an? (EPIC|LEGENDARY): .*?\.(?= Keep the silhouette)/,
      `redesigned as the ${RAROT} variant: ${t.en}.${t.por ? ` WHY THIS VARIANT EXISTS (Portuguese): ${t.por}.` : ""} ${RAR.REGRA}`
    );
    referencia = `TWO REFERENCES ARE ATTACHED. IMAGE 1 = ${m.id}__anim_${m.n}.png, the normal sheet of this same form: copy its poses, cell layout, shapes and size exactly. IMAGE 2 = ${m.id}__${m.rar}.png, the ${t.novo ? "NEW" : "approved"} ${RAROT} colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row ${Math.floor((m.n - 1) / 4) + 1}, column ${((m.n - 1) % 4) + 1}. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.`;
    arquivo = arquivo.replace(/ - anexar ([a-z_0-9]+)\.txt$/, ` - anexar $1 e ${m.id}__${m.rar}.txt`);
    doisAnexos = true;
  }
  // ponte: só deitada (no v2 a linha 2 pedia a ponte em pé, vista de cima, e cada conversa entendia de um jeito)
  if (item.categoria === "reino_ponte")
    corpo = corpo.replace(
      /Row 2 VERTICAL bridge seen from above, only the deck with parapets: (.*)$/,
      "Row 2: the SAME horizontal bridge pieces again, worn and damaged (cracks, missing stones or planks), also seen from the front: $1 ORIENTATION: every piece in both rows lies HORIZONTALLY, running from left to right, seen from the front with the walkway on top and the arches or supports below. Never draw a vertical bridge, a diagonal bridge or a bridge seen from above (the game rotates it when it needs a vertical one)."
    );
  if (item.categoria === "reino_paredao_v2")
    corpo +=
      " ORIENTATION: a horizontal strip of the vertical cliff face seen from the front (as if looking at it from the chasm), the ground lip along the top edge, wider than tall.";
  if (item.categoria === "monstro_anim_v2" && m) extra.push(...auditoria(m));
  const tema = m && m.rar ? RAR.tema(m.id, m.rar).en : "",
    soAlfa = tipo !== "opaco" && ROSA.test([l && l.visual, tema, corpo].join(" "));
  const partes = [
    isolamento(item, doisAnexos),
    corpo,
    ...extra,
    BASE.estilo,
    regrasGrade(item.regras),
    tipo === "opaco" ? null : soAlfa ? FUNDO_SO_ALFA : FUNDO,
    referencia,
    PROIBIDO,
    conferencia(item, tipo, soAlfa)
  ].filter(Boolean);
  return { ...item, arquivo, tipo, texto: partes.join("\n\n") + "\n" };
}

// imagem fixa nova de uma raridade com tema novo: vem antes das animações daquela raridade
function fixaNova(l, rar) {
  const t = RAR.tema(l.id, rar),
    RAROT = rar === "epico" ? "EPIC" : "LEGENDARY",
    formas = [l.filhote, l.jovem, ...l.ramos.map(r => r.nome), ...l.ramos.map(r => r.supremo)];
  const item = {
    grupo: "2_novas",
    codigo: "M3_raridades",
    prioridade: "P1",
    categoria: "monstro_fixa_raridade",
    saida: `arte/monstros/${l.elemento}/${l.id}__${rar}.png`,
    grade: "4x2",
    celula: "256",
    anexo: `arte/monstros/${l.elemento}/${l.id}__base.png`,
    arquivo: `2_novas/M3_raridades/${l.elemento}/${l.id}/000 - P1 - COMECE AQUI - salvar como ${l.id}__${rar} - anexar ${l.id}__base.txt`,
    titulo: `the 8 forms of the monster line "${l.filhote}" in the new ${RAROT} variant, one per cell`,
    corpo: `The 8 evolution forms of one monster line in its NEW ${RAROT} rarity variant, one still pose each (a calm 3/4 standing pose), facing right. The variant: ${t.en}. WHY THIS VARIANT EXISTS (Portuguese): ${t.por}. Every form gets the SAME variant treatment so the line looks consistent. ${RAR.REGRA} Cells left to right, top row then bottom row: ${formas.map((f, i) => `${i + 1}. ${f}`).join("; ")}. Look of the line (Portuguese): ${l.visual}. Signature trait in every form: ${l.traco}.`,
    regras:
      "Sprite sheet rules: no floor, no cast shadow, no text, no grid lines, no frame borders. Exact uniform grid of 4 columns x 2 rows of square cells, each cell 256x256 px, total image 1024x512 px. Every form stays fully inside its own cell with ~6% empty margin. Feet (or the base of a floating body) on the same line at 85% of the cell height. Natural proportions, never stretched or squashed.",
    referencia: `Reference: the attached image is ${l.id}__base.png, the normal version of these 8 forms in the same layout: keep each form's shape, pose and cell, and apply the new variant. This is a NEW variant: do not reuse any older ${RAROT} colors of this monster.`
  };
  return montar(item);
}

// ---------------------------------------------------------------- montagem do pacote
const prompts = BASE.prompts.map(montar);
for (const l of D.linhas) for (const rar of ["epico", "lendario"]) if (RAR.tema(l.id, rar).novo) prompts.push(fixaNova(l, rar));
const arquivos = new Map();
const gravar = (rel, txt) => arquivos.set(rel, txt);
for (const p of prompts) gravar(p.arquivo, p.texto);

// índice de cada grupo (lista de arquivos, grade, célula e anexo), como no v2
const NOME_GRUPO = {
  "1_corrigir": "Corrigir (refazer a folha atual)",
  "2_novas": "Novas (não existem hoje)",
  "3_complementares": "Complementares (melhoram uma folha que já existe, que vai anexada)"
};
for (const g of Object.keys(NOME_GRUPO)) {
  const ps = prompts.filter(p => p.grupo === g).sort((a, b) => a.arquivo.localeCompare(b.arquivo));
  const porCodigo = new Map();
  for (const p of ps) (porCodigo.get(p.codigo) || porCodigo.set(p.codigo, []).get(p.codigo)).push(p);
  const md = [`# ${NOME_GRUPO[g]}`, "", `${ps.length} prompts, um arquivo por imagem. Prioridade: P1 primeiro, depois P2 e P3.`, ""];
  if (g === "2_novas")
    md.push(
      `**Temas novos de raridade:** nas pastas \`M3_raridades/<elemento>/<monstro>/\`, o arquivo \`000 - P1 - COMECE AQUI\` é a imagem fixa nova daquela raridade. Faça ele antes das animações dela: ele vira o segundo anexo.`,
      ""
    );
  md.push("| Código | Prompts | P1 | P2 | P3 |", "|---|---|---|---|---|");
  for (const [c, l] of porCodigo)
    md.push(`| ${c} | ${l.length} | ${["P1", "P2", "P3"].map(x => l.filter(p => p.prioridade === x).length).join(" | ")} |`);
  for (const [c, l] of porCodigo) {
    md.push("", `## ${c}`, "", "| Prioridade | Salvar como | Grade | Célula | Anexar |", "|---|---|---|---|---|");
    for (const p of l) {
      const anexos =
        p.categoria === "monstro_raridade"
          ? `\`${p.anexo}\` + imagem fixa \`${path.basename(p.saida).replace(/__anim_\d/, "")}\``
          : p.anexo && p.anexo !== "-"
            ? `\`${p.anexo}\``
            : "-";
      md.push(`| ${p.prioridade} | \`${p.saida}\` | ${p.grade} | ${p.celula} px | ${anexos} |`);
    }
  }
  gravar(`${g}.md`, md.join("\n") + "\n");
}
// manifesto (mesmas colunas do v2)
gravar(
  "MANIFESTO.csv",
  ["grupo;codigo;prioridade;categoria;arquivo_de_saida;grade;celula_px;anexo;arquivo_prompt;titulo"]
    .concat(
      prompts.map(p => [p.grupo, p.codigo, p.prioridade, p.categoria, p.saida, p.grade, p.celula, p.anexo, p.arquivo, p.titulo].join(";"))
    )
    .join("\n") + "\n"
);
// grades por arquivo, para a página de conferência reconhecer cada imagem pelo nome
const grades = {};
for (const p of prompts) grades[path.basename(p.saida)] = { g: p.grade, c: +p.celula || 0, t: p.tipo, k: p.categoria };
const gradesJs = `// Gerado por ferramentas/gerar_prompts.js: a grade de cada arquivo do pacote de prompts (nome -> grade, célula, tipo, categoria).
// A página de conferência (conferir_artes.html) usa para reconhecer cada imagem pelo nome. Não edite à mão.
(function () {
  const GRADES = ${JSON.stringify(grades)};
  if (typeof module !== "undefined") module.exports = GRADES;
  else window.GRADES_ARTE = GRADES;
})();
`;
gravar("grades_arte.js", gradesJs);
gravar("CONFERIR_ARTES.html", fs.readFileSync(path.join(__dirname, "conferir_artes.html"), "utf8"));
gravar("layouts_arte.js", fs.readFileSync(path.join(__dirname, "layouts_arte.js"), "utf8"));

// ---------------------------------------------------------------- conferir ou gravar
const GERADAS = ["1_corrigir", "2_novas", "3_complementares"],
  ANTIGAS = ["2_monstros", "3_gerais", "4_reinos"]; // estrutura da revisão anterior, substituída por esta
const nasPastas = [];
for (const d of GERADAS)
  (function andar(rel) {
    const abs = path.join(SAIDA, rel);
    if (!fs.existsSync(abs)) return;
    for (const f of fs.readdirSync(abs)) {
      const r = path.join(rel, f);
      if (fs.statSync(path.join(SAIDA, r)).isDirectory()) andar(r);
      else nasPastas.push(r.split(path.sep).join("/"));
    }
  })(d);
const gradesFerramenta = path.join(__dirname, "grades_arte.js");
if (CONFERIR) {
  const semMonstro = Object.keys(RAR.RARIDADES).filter(id => !LINHA[id]);
  if (semMonstro.length) {
    console.error(`ferramentas/raridades_arte.js: monstro(s) que não existem no jogo: ${semMonstro.join(", ")}`);
    process.exit(1);
  }
  const objs = Object.fromEntries(D.universos.map(u => [u.id, (u.objetos || []).length]));
  const errados = Object.keys(objs).filter(k => LAY.OBJETOS[k] !== objs[k]);
  if (errados.length) {
    console.error(`ferramentas/layouts_arte.js: objetos por reino desatualizados (${errados.join(", ")}).`);
    process.exit(1);
  }
  const dif = [...new Set([...arquivos.keys(), ...nasPastas])].filter(
    r => !arquivos.has(r) || !fs.existsSync(path.join(SAIDA, r)) || fs.readFileSync(path.join(SAIDA, r), "utf8") !== arquivos.get(r)
  );
  if (!fs.existsSync(gradesFerramenta) || fs.readFileSync(gradesFerramenta, "utf8") !== gradesJs) dif.push("ferramentas/grades_arte.js");
  if (dif.length) {
    console.error(
      `docs/prompts/ não está em dia (${dif.length} arquivo(s), ex.: ${dif.slice(0, 3).join(", ")}). Rode: node ferramentas/gerar_prompts.js`
    );
    process.exit(1);
  }
  console.log(`docs/prompts/ em dia (${prompts.length} prompts, ${arquivos.size} arquivos).`);
  process.exit(0);
}
for (const d of [...GERADAS, ...ANTIGAS]) fs.rmSync(path.join(SAIDA, d), { recursive: true, force: true });
for (const f of ["1_corrigir.md", "2_novas.md", "3_complementares.md"]) fs.rmSync(path.join(SAIDA, f), { force: true });
for (const [rel, txt] of arquivos) {
  const f = path.join(SAIDA, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, txt);
}
fs.writeFileSync(gradesFerramenta, gradesJs);
const novos = prompts.filter(p => p.categoria === "monstro_fixa_raridade").length;
console.log(
  `docs/prompts/: ${prompts.length} prompts (${BASE.prompts.length} do v2 com as travas + ${novos} imagens fixas de temas novos), um arquivo por imagem.`
);
