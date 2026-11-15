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
  // imagem fixa de raridade refeita (fundo opaco): mantém as cores aprovadas e conta a condição do tema
  const fixaRar = item.categoria === "monstro" && /monstros\/[a-z]+\/([a-z_]+)__(epico|lendario)\.png$/.exec(item.saida);
  if (fixaRar) {
    const t = RAR.tema(fixaRar[1], fixaRar[2]);
    extra.push(
      `This is the ${fixaRar[2] === "epico" ? "EPIC" : "LEGENDARY"} variant "${t.nome}": ${t.en}. WHY THIS VARIANT EXISTS (Portuguese): ${t.por}. Keep the colors of the attached image exactly; only fix the background.`
    );
  }
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
  return { ...item, arquivo, arquivoV2: arquivo, tipo, texto: partes.join("\n\n") + "\n" };
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
// raridade das formas 1 e 2 (Filhote e Jovem): o v2 só tinha das formas 3 a 8. Mesmo texto da forma 3, com o nome da forma
const extrasRaridade = [];
for (const l of D.linhas)
  for (const n of [1, 2])
    for (const rar of ["epico", "lendario"]) {
      const modelo = BASE.prompts.find(p => p.saida.endsWith(`/${l.id}__anim_3__${rar}.png`));
      if (!modelo || BASE.prompts.some(p => p.saida.endsWith(`/${l.id}__anim_${n}__${rar}.png`))) continue;
      const nome = n === 1 ? l.filhote : l.jovem;
      extrasRaridade.push({
        ...modelo,
        prioridade: "P2",
        saida: modelo.saida.replace("__anim_3__", `__anim_${n}__`),
        anexo: modelo.anexo.replace("__anim_3.png", `__anim_${n}.png`),
        arquivo: modelo.arquivo.replace(
          /\/\d+ - P\d - salvar como ([a-z_]+)__anim_3__([a-z]+) - anexar ([a-z_]+)__anim_3\.txt$/,
          `/9${n}${rar === "epico" ? 0 : 1} - P2 - salvar como $1__anim_${n}__$2 - anexar $3__anim_${n}.txt`
        ),
        titulo: `${nome} ${rar}`,
        corpo: modelo.corpo.replace(/recognizable as [^(]+\(/, `recognizable as ${nome} (`),
        referencia: (modelo.referencia || "").replace("__anim_3.png", `__anim_${n}.png`)
      });
    }
const prompts = [...BASE.prompts, ...extrasRaridade].map(montar);
for (const l of D.linhas) for (const rar of ["epico", "lendario"]) if (RAR.tema(l.id, rar).novo) prompts.push(fixaNova(l, rar));
// ---------------------------------------------------------------- ordem de execução: a ordem está nos números das pastas e dos
// arquivos. Pastas de etapa (01, 02...), dentro delas uma pasta por monstro, reino ou dragão, e os arquivos numerados na ordem
// exata (o que depende de outro vem depois dele). "NOVA CONVERSA" no nome marca onde abrir uma conversa nova no gerador.
const ETAPAS = {
  corrigir: "01 - PRIMEIRO - corrigir imagens fixas",
  heroi: "02 - heroi, ovos, baus, coletaveis e efeitos",
  monstros: "03 - monstros",
  dragoes: "04 - dragoes ancestrais",
  reinos: "05 - reinos",
  lendas: "06 - lendas e deuses",
  efeitos: "07 - efeitos grandes",
  ambiente: "08 - POR ULTIMO - chao, particulas e interface"
};
const ORDEM_EL = ["fogo", "agua", "terra", "ar", "raio", "natureza", "luz", "sombra"];
const NOME_EL = { fogo: "fogo", agua: "agua", terra: "terra", ar: "ar", raio: "raio", natureza: "natureza", luz: "luz", sombra: "sombra" };
const dois = n => String(n).padStart(2, "0");
const anexoDoNome = arq => {
  const m = / - (anexar .*|sem anexo)\.txt$/.exec(arq);
  return m ? m[1] : "sem anexo";
};
// o que é cada arquivo, em palavras, no começo do nome
const rotulo = p => {
  const s = p.saida,
    k = p.categoria;
  if (k === "monstro_fixa_raridade")
    return s.includes("__epico") ? "IMAGEM FIXA EPICA (tema novo) - " : "IMAGEM FIXA LENDARIA (tema novo) - ";
  if (k === "monstro_anim_v2") return "ANIM BASE - ";
  if (k === "monstro_raridade") return s.includes("__epico") ? "ANIM EPICA - " : "ANIM LENDARIA - ";
  if (k === "monstro_acoes") return "ACOES - ";
  return "";
};
const anexoTexto = p => {
  const a = anexoDoNome(p.arquivoV2 || p.arquivo);
  return p.anexo && p.anexo.includes("/reliquias/") ? a.replace(/^anexar ([a-z_]+)$/, "anexar $1 (pasta reliquias)") : a;
};
const saidaNome = p => path.basename(p.saida, ".png") + (p.saida.includes("/reliquias/") ? " (pasta reliquias)" : "");
const ordemReino = Object.fromEntries(D.universos.map((u, i) => [u.id, i]));
const eras = [...new Set(D.universos.map(u => u.era))];
function destino(p) {
  const s = p.saida,
    k = p.categoria;
  const mon = /arte\/monstros\/([a-z]+)\/([a-z_]+?)__/.exec(s);
  if (k === "monstro") return { etapa: "corrigir", pasta: "", ordem: [0, s] };
  if (/^(heroi|ovo|bau|coletavel|efeito_elemento|efeito_classe)$/.test(k))
    return { etapa: "heroi", pasta: "", ordem: [["heroi", "ovo", "bau", "coletavel", "efeito_elemento", "efeito_classe"].indexOf(k), s] };
  if (mon && /^monstro_/.test(k)) {
    const [, el, id] = mon,
      l = LINHA[id],
      semAcento = x =>
        x
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^A-Za-z0-9 ]/g, "")
          .toLowerCase(),
      pasta = `${dois(ORDEM_EL.indexOf(el) + 1)} - ${NOME_EL[el]}/${dois(D.linhas.filter(x => x.elemento === el).indexOf(l) + 1)} - ${id}`;
    if (k === "monstro_fixa_raridade") return { etapa: "monstros", pasta, ordem: [0, 0, s.includes("__epico") ? 0 : 1] };
    const n = +/__(?:anim|acoes)_(\d)/.exec(s)[1],
      posForma = [3, 4, 5, 6, 7, 8, 1, 2].indexOf(n),
      sub = k === "monstro_anim_v2" ? 0 : s.includes("__epico") ? 1 : s.includes("__lendario") ? 2 : 3;
    return { etapa: "monstros", pasta, ordem: [1, posForma, sub], forma: n };
  }
  if (/^lendario_/.test(k)) {
    const id = /arte\/lendarios\/([a-z_]+?)__/.exec(s)[1],
      i = D.ancestrais_info.findIndex(a => a.id === id),
      partes = ["ovo", "filhote", "jovem", "adulto", "supremo", "retrato", "eclosao", "anim_1", "anim_2", "anim_3", "anim_4"];
    return { etapa: "dragoes", pasta: `${dois(i + 1)} - ${id}`, ordem: [partes.indexOf(/__([a-z_0-9]+)\.png$/.exec(s)[1]), s] };
  }
  const guard = /arte\/reinos\/([a-z_]+)\/guardiao_[a-z_]+__/.exec(s);
  if (guard) return { etapa: "reinos", pasta: `G:${guard[1]}`, ordem: [s.includes("__efeitos") ? 1 : 0, s] };
  const reino = /arte\/reinos\/[a-z_]+\/([a-z_]+?)__([a-z_0-9]+)\.png$/.exec(s) || /arte\/itens\/reliquias\/([a-z_]+)\.png$/.exec(s);
  if (reino && ordemReino[reino[1]] != null) {
    const parte = reino[2] || "reliquia",
      seq = [
        "piso_corrigir",
        "inimigos",
        "mini",
        "chefe",
        "efeitos",
        "piso",
        "fundo",
        "fundo2",
        "paredao",
        "cachoeira",
        "ponte",
        "props_anim",
        "fauna",
        "objetos",
        "reliquia"
      ],
      chave = parte === "piso" && p.grupo === "1_corrigir" ? "piso_corrigir" : parte;
    return { etapa: "reinos", pasta: `R:${reino[1]}`, ordem: [seq.indexOf(chave), s] };
  }
  if (/^(heroi_lenda|retrato)$/.test(k)) {
    const id = /arte\/(?:lendas|panteao)\/([a-z_]+?)__/.exec(s)[1];
    return { etapa: "lendas", pasta: "", ordem: [id, k === "heroi_lenda" ? 0 : 1], grupoConversa: id };
  }
  if (/^efeito_/.test(k))
    return {
      etapa: "efeitos",
      pasta: "",
      ordem: [["efeito_especial", "efeito_combinado", "efeito_desperto", "efeito_lenda"].indexOf(k), s]
    };
  return { etapa: "ambiente", pasta: "", ordem: [["superficie", "particulas", "ui", "ui_camada"].indexOf(k), s] };
}
// pastas de reino na ordem das eras, com o Guardião da era depois dos reinos dela
const pastaReino = new Map();
{
  let i = 0;
  for (const era of eras) {
    for (const u of D.universos.filter(x => x.era === era)) pastaReino.set(`R:${u.id}`, `${dois(++i)} - ${u.id}`);
    pastaReino.set(`G:${era}`, `${dois(++i)} - guardiao da era ${era}`);
  }
}
const cmp = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === b[i]) continue;
    if (a[i] === undefined) return -1;
    if (b[i] === undefined) return 1;
    return typeof a[i] === "number" && typeof b[i] === "number" ? a[i] - b[i] : String(a[i]).localeCompare(String(b[i]));
  }
  return 0;
};
for (const p of prompts) {
  p.dest = destino(p);
  if (pastaReino.has(p.dest.pasta)) p.dest.pasta = pastaReino.get(p.dest.pasta);
}
const grupos = new Map();
for (const p of prompts) {
  const chave = `${ETAPAS[p.dest.etapa]}/${p.dest.pasta}`;
  (grupos.get(chave) || grupos.set(chave, []).get(chave)).push(p);
}
for (const [chave, ps] of grupos) {
  ps.sort((a, b) => cmp(a.dest.ordem, b.dest.ordem));
  let ant = null;
  ps.forEach((p, i) => {
    // conversa nova: começo de cada pasta, de cada forma de monstro e de cada Lenda
    const conversa =
      p.dest.etapa === "monstros"
        ? p.dest.forma
          ? `forma ${p.dest.forma}`
          : "fixa " + p.saida
        : p.dest.etapa === "lendas"
          ? p.dest.grupoConversa
          : p.dest.etapa === "reinos" || p.dest.etapa === "dragoes"
            ? "pasta"
            : saidaNome(p).replace(/__(anim|retrato)$/, "");
    const nova = conversa !== ant;
    ant = conversa;
    p.arquivo = `${chave.replace(/\/$/, "")}/${String(i + 1).padStart(3, "0")} - ${nova ? "NOVA CONVERSA - " : ""}${rotulo(p)}salvar como ${saidaNome(p)} - ${anexoTexto(p)}.txt`;
  });
}
const arquivos = new Map();
const gravar = (rel, txt) => arquivos.set(rel, txt);
for (const p of prompts) gravar(p.arquivo, p.texto);

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
const GERADAS = Object.values(ETAPAS),
  ANTIGAS = [
    "1_corrigir",
    "2_novas",
    "3_complementares",
    "2_monstros",
    "3_gerais",
    "4_reinos",
    "03 - monstros (um por vez, na ordem)",
    "05 - reinos (um por vez, na ordem)"
  ]; // estruturas anteriores, substituídas por esta
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
  `docs/prompts/: ${prompts.length} prompts (${BASE.prompts.length} do v2 com as travas + ${extrasRaridade.length} animacoes epicas e lendarias das formas 1 e 2 + ${novos} imagens fixas de temas novos), um arquivo por imagem.`
);
