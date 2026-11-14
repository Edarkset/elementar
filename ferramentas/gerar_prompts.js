// Gera o pacote de prompts de arte (docs/prompts/) a partir dos dados do jogo (js/dados.js).
//
//   node ferramentas/gerar_prompts.js              grava docs/prompts/
//   node ferramentas/gerar_prompts.js --conferir   só confere se docs/prompts/ está igual aos dados (usado no npm run testar)
//
// Cada prompt sai completo para copiar e colar: tamanho da tela, grade, o que vai em cada quadro, a descrição do personagem
// e as travas (o que não pode sair). Nada para preencher à mão. O layout de cada folha é o que o código lê hoje
// (05_arte.ts, 09_criaturas.ts, 07c_cenario_arte.ts, 07d_estrutura.ts); folhas novas que o código ainda não lê estão marcadas.
// Mudou um dado do jogo (nome, visual, golpe)? Rode de novo: o pacote acompanha.
"use strict";
const fs = require("fs"),
  path = require("path");
const RAIZ = path.join(__dirname, ".."),
  SAIDA = path.join(RAIZ, "docs", "prompts");
const D = new Function(fs.readFileSync(path.join(RAIZ, "js", "dados.js"), "utf8") + ";return D;")();
const LAY = require("./layouts_arte.js");

// ---------------------------------------------------------------- vocabulário (dados em português -> inglês para o gerador)
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
const COR_EL = {
  fogo: "red, orange and gold",
  agua: "deep blue, teal and white foam",
  terra: "ochre, brown and moss green",
  ar: "pale cyan, white and silver",
  raio: "electric yellow, violet and white",
  natureza: "leaf green, bark brown and flower accents",
  luz: "white, gold and warm cream",
  sombra: "deep purple, black-violet and magenta-free dark glows"
};
const ESTAGIO = [
  { nome: "Filhote", en: "baby form: tiny, round and cute, big head and eyes, short limbs" },
  { nome: "Jovem", en: "young form: small and lively, adult traits starting to show" },
  { nome: "Adulto", en: "adult form: full, confident and impressive body" },
  { nome: "Supremo", en: "supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura" }
];
const LINHAGEM_EN = {
  dragoes: "dragons and serpents",
  mortos_vivos: "undead",
  feras: "beasts",
  gigantes: "giants",
  pequeninos: "little folk",
  marinhos: "sea creatures",
  alados: "winged creatures",
  quimeras: "chimeras",
  errante: "wanderer"
};
// golpe básico de cada classe, como movimento de animação
const ATAQUE_CLASSE = {
  guardiao: "shield bash: braces, then shoves forward with its body or shield in a short cone",
  guerreiro: "spinning strike: winds up and sweeps a heavy blow in a full circle",
  assassino: "quick slashes: dashes forward and cuts twice very fast",
  cacador: "ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead",
  mago: "spell cast: gathers an orb of its element and launches it forward",
  invocador: "summoning gesture: raises its arms or head and two small spirits of its element pop out",
  mistico: "life ray: channels a beam of light from its body, calm and graceful",
  xama: "ritual: stamps the ground and a small spirit totem rises beside it"
};
const CLASSE_EN = {
  guardiao: "Guardian",
  guerreiro: "Warrior",
  assassino: "Assassin",
  cacador: "Hunter",
  mago: "Mage",
  invocador: "Summoner",
  mistico: "Mystic",
  xama: "Shaman"
};
const CORPO = {
  humanoide: "humanoid",
  inseto: "insect",
  quadrupede: "four-legged beast",
  ave: "bird",
  espectro: "floating ghost",
  golem: "stone or metal golem",
  serpente: "serpent",
  objeto: "living object",
  planta: "living plant",
  aquatico: "aquatic creature",
  bolha: "blob",
  bipede: "two-legged creature"
};
const ANDAR = {
  cambaleia: "stumbles forward clumsily",
  corre: "runs fast",
  marcha: "marches in step",
  voa: "flies with flapping",
  pula: "hops",
  flutua: "floats and bobs",
  caminha: "walks",
  salta: "leaps in long jumps",
  rasteja: "crawls low",
  lateral: "scuttles sideways",
  cava: "burrows and pops out"
};
const GOLPE = {
  bote: "lunging bite or strike",
  contato: "body slam",
  cuspe: "spits a projectile",
  salto: "jumps and lands on the target",
  descarga: "electric discharge",
  explode: "swells and explodes"
};
const MORTE = {
  desmancha: "crumbles apart",
  estilhaca: "shatters into shards",
  desmonta: "falls apart piece by piece",
  penas: "bursts into feathers",
  cai: "falls over",
  evapora: "evaporates into mist",
  puff: "vanishes in a puff of smoke",
  derrete: "melts down",
  sapo: "turns into a little frog",
  chama: "burns away in flames",
  folhas: "scatters into leaves",
  estoura: "pops like a bubble",
  ouro: "turns to gold dust"
};
const MANIA = {
  danca: "does a silly dance",
  rola: "rolls on the ground",
  uiva: "howls at the sky",
  remonta: "puts itself back together",
  rouba: "grabs something shiny",
  rodopia: "spins around",
  finge_estatua: "freezes pretending to be a statue",
  folego: "pauses to catch its breath",
  formacao: "salutes in formation",
  ilusao: "flickers like an illusion",
  pedra_luz: "glows like a lit stone",
  molhado: "shakes off water",
  incendeia: "flares up in flames",
  canto: "sings",
  camuflagem: "fades into camouflage",
  enxame: "buzzes in a swarm",
  pisca: "blinks and flickers",
  pururauca: "turns briefly into stone",
  cospe_aliado: "spits out a tiny ally",
  coco: "throws a coconut",
  xinga: "shakes its fist angrily",
  tropeca: "trips and gets up",
  eletrifica: "crackles with electricity",
  esporos: "puffs out spores",
  medo_pequeninos: "jumps back scared",
  "": "looks around curiously"
};
const DETALHE = {
  bandagens: "bandages",
  brilho: "glowing accents",
  carapaca: "shell",
  orelhas: "big ears",
  elmo: "helmet",
  lanca: "spear",
  escudo: "shield",
  ossos: "bones",
  asas: "wings",
  crista: "crest",
  chifres: "horns",
  barba: "beard",
  pelo: "fur",
  pincas: "pincers",
  ferrao: "stinger",
  coroa: "crown",
  chapeu: "hat",
  talisma: "paper talisman",
  cauda: "tail",
  presas: "fangs",
  juba: "mane",
  gelo: "ice",
  folhas: "leaves",
  cajado: "staff",
  guarda_chuva: "umbrella",
  olho_unico: "single eye",
  lingua: "long tongue",
  um_pe: "a single leg",
  lanterna: "lantern",
  manchas: "spots",
  barbatana: "fins",
  capuz: "hood",
  runas: "runes",
  chamas: "flames",
  tapa_olho: "eye patch",
  tentaculos: "tentacles",
  parafusos: "bolts",
  bobina: "electric coil",
  garras: "claws",
  cogumelo: "mushroom cap",
  engrenagem: "gears",
  sarcofago: "sarcophagus",
  cabecas: "several heads",
  casa: "a house on its back",
  pes_galinha: "chicken legs",
  mascara: "mask",
  nau: "ship hull",
  jarro: "jar"
};
const det = l => (l || []).map(d => DETALHE[d] || d).join(", ");

// cachoeira do paredão conforme o líquido do reino (estrutura.lago_solo)
const QUEDA = {
  agua: "waterfall",
  fogo: "lava fall",
  lama: "mud and sand fall",
  luz: "cascade of glowing light",
  sombra: "cascade of dark shadow mist"
};
// ---------------------------------------------------------------- blocos de travas
const ESTILO = `STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.`;
const FUNDO = `BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.`;
const PROIBIDO = `DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.`;
function telaGrade(W, H, C, L) {
  const cw = W / C,
    ch = H / L;
  return `CANVAS: exactly ${W} x ${H} pixels (${W > H ? "landscape 3:2" : W < H ? "portrait 2:3" : "square 1:1"}).
GRID: invisible grid of exactly ${C} equal columns x ${L} equal rows = ${C * L} cells, each cell ${fmt(cw)} px wide x ${fmt(ch)} px tall. Do NOT draw the grid. Exactly one pose per cell, ${C} per row, no more, no less. Rows are read top to bottom, frames left to right.`;
}
const fmt = n => (Number.isInteger(n) ? String(n) : n.toFixed(0));
function travasPersonagem(W, H, C, L, extra) {
  const ch = H / L;
  return `PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell${extra ? ` (${extra})` : ""}: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: ${Math.round(ch * 0.85)} px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least ${Math.max(12, Math.round((W / C) * 0.07))} px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.`;
}
// mesmo = a folha anexada já tem a grade pedida (refazer em cima dela): seguir o layout ajuda o gerador a acertar a contagem
const ref = (o = "", mesmo = false) =>
  `REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly${o}. ${
    mesmo
      ? "It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency."
      : "The attachment is only a design reference: ignore its layout, size and background."
  }`;
// o .webp da pasta arte/ do jogo foi achatado na conversão antiga: anexar o PNG original (ou o corrigido)
const ANEXO_ORIGINAL = "o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado";

// prompt pronto (bloco de código) com cabeçalho em português: arquivo, anexo, se o jogo já usa, e o molde de como deve ficar.
// Toda folha ganha duas travas contra mistura com imagens anteriores da mesma conversa: o isolamento no começo
// (só este personagem, só o anexo desta mensagem) e a conferência final (quantidade, fundo, nada de imagens anteriores).
// "so" = o que pode aparecer na imagem (o nome do personagem ou do conjunto); sem ele, vale o título do bloco.
function bloco(titulo, info, linhas, so) {
  const salvar = (info.find(([k]) => k === "Salvar como") || [])[1] || "",
    arq = (/`([^`]+)`/.exec(salvar) || [])[1] || "",
    lay = LAY.doArquivo(arq),
    anexo = (info.find(([k]) => k === "Anexar") || [])[1] || "",
    semAnexo = /^nada/.test(anexo);
  const cab = [`#### ${titulo}`, ""];
  for (const [k, v] of info) cab.push(`- **${k}:** ${v}`);
  if (lay) cab.push(`- **Molde (como deve ficar):** [${lay.nome}]({{MOLDES}}/${lay.id}.png)`);
  const isolar = `NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: ${so || titulo}. ${
    semAnexo
      ? "There is no reference image for this one: ignore any image attached earlier in the conversation."
      : "The ONLY reference is the image attached to THIS message."
  }`;
  const R = lay ? LAY.linhasDe(lay, arq) : 0,
    fim = lay
      ? `BEFORE YOU FINISH, CHECK: the image is ${lay.W} x ${lay.H}; ${lay.R === 1 && lay.C === 1 ? "one single subject" : `exactly ${lay.C} items in every row and exactly ${R} rows`}; nothing from earlier images of this conversation; ${lay.tipo === "opaco" ? "no seam when tiled" : "transparent (or flat #FF00FF magenta) background, no checkerboard"}; nothing written anywhere.`
      : "";
  return cab.join("\n") + "\n\n```text\n" + [isolar, ...linhas.filter(Boolean), fim].filter(Boolean).join("\n\n") + "\n```\n";
}

// ---------------------------------------------------------------- monstros
function formasDe(l) {
  const f = [
    { n: 1, nome: l.filhote, e: 0, el: l.elemento, lin: l.linhagem },
    { n: 2, nome: l.jovem, e: 1, el: l.elemento, lin: l.linhagem }
  ];
  l.ramos.forEach((r, i) => f.push({ n: 3 + i, nome: r.nome, e: 2, el: r.elemento, lin: r.linhagem, ramo: i }));
  l.ramos.forEach((r, i) => f.push({ n: 6 + i, nome: r.supremo, e: 3, el: r.elemento, lin: r.linhagem, ramo: i, ult: r.ultimate }));
  return f;
}
const RAMO = ["A", "B", "C"];
function descricaoForma(l, f) {
  const e = ESTAGIO[f.e];
  return `CHARACTER: "${f.nome}", the ${e.nome} stage (${e.en}) of a monster line from the game. Element: ${EL[f.el]} (main colors: ${COR_EL[f.el]}). Lineage: ${LINHAGEM_EN[f.lin] || f.lin}. Combat class: ${CLASSE_EN[l.classe]}.
Look of the line (Portuguese): ${l.visual}. Signature trait that must always be visible: ${l.traco}. Inspired by: ${l.animal}.
Personality (Portuguese, show it in the poses): ${l.personalidade}.`;
}
function promptBase(l, f, raridade) {
  const W = 1536,
    H = 1024,
    C = 6,
    L = 3;
  const cab =
    raridade === "epico"
      ? `Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.`
      : raridade === "lendario"
        ? `Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.`
        : `Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.`;
  return [
    cab,
    telaGrade(W, H, C, L),
    `ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ${ATAQUE_CLASSE[l.classe]}. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of ${EL[f.el]} energy kept inside the cell, F5-F6 recovery back to the idle pose.`,
    descricaoForma(l, f),
    ref(raridade ? ", except for the rarity recolor and ornaments described above" : "", true),
    travasPersonagem(W, H, C, L),
    FUNDO,
    ESTILO,
    PROIBIDO
  ];
}
function promptAcoes(l, f) {
  const W = 1536,
    H = 1024,
    C = 6,
    L = 4,
    c = D.classes[l.classe];
  return [
    `Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.`,
    telaGrade(W, H, C, L),
    `ROW 1 - SKILL "${c.h1.nome}" (${c.h1.desc}), 6 frames: F1-F2 wind-up, F3-F4 release with ${EL[f.el]} energy, F5-F6 recovery.
ROW 2 - ${f.ult ? `ULTIMATE MOVE: ${f.ult}` : `SKILL "${c.h2.nome}" (${c.h2.desc})`}, 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "${l.personalidade}" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.`,
    descricaoForma(l, f),
    ref(),
    travasPersonagem(W, H, C, L, "use the same body size as the attached reference"),
    FUNDO,
    ESTILO,
    PROIBIDO
  ];
}
function promptFixa(l) {
  const W = 1536,
    H = 1024,
    C = 4,
    L = 2,
    fs8 = formasDe(l);
  return [
    `Create a 2D game sprite sheet: the 8 evolution forms of one monster line, one still pose each (a calm 3/4 standing pose).`,
    telaGrade(W, H, C, L),
    `CELLS, left to right, top row then bottom row:
${fs8.map(f => `${f.n}. "${f.nome}" - ${ESTAGIO[f.e].nome.toLowerCase()}${f.ramo != null ? ` (branch ${RAMO[f.ramo]})` : ""}, element ${EL[f.el]}`).join("\n")}
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.`,
    `MONSTER LINE (Portuguese): ${l.visual}. Signature trait in every form: ${l.traco}. Inspired by: ${l.animal}. Class: ${CLASSE_EN[l.classe]}.`,
    `REFERENCE: attach the current __base image of this monster (or the new animation sheets) and copy each form's design exactly. The attachment is only a reference: ignore its layout.`,
    travasPersonagem(W, H, C, L).replace("in the idle row the body fills", "the body fills"),
    FUNDO,
    ESTILO,
    PROIBIDO
  ];
}
function arquivoMonstro(l) {
  const el = l.elemento,
    pasta = `arte/monstros/${el}`,
    F = formasDe(l),
    md = [];
  md.push(`# ${l.filhote} \`${l.id}\` · ${D.elementos[el].nome} · ${D.classes[l.classe].nome}`);
  md.push(`\n${l.visual}. Traço marcante: ${l.traco}. Jeito: ${l.personalidade}.\n`);
  md.push(`| Arquivo | Forma | Estágio | Elemento |\n|---|---|---|---|`);
  for (const f of F)
    md.push(
      `| \`__anim_${f.n}\` | ${f.nome} | ${ESTAGIO[f.e].nome}${f.ramo != null ? ` (ramo ${RAMO[f.ramo]})` : ""} | ${D.elementos[f.el].nome} |`
    );
  md.push(`
**Ordem:** primeiro a folha base de uma forma (etapa 2), depois o Épico, o Lendário e as ações dela (etapa 3), sempre anexando a **base nova** como referência. Comece pelas formas Adulto e Supremo (\`__anim_3\` a \`__anim_8\`).

**Como usar cada bloco:** copie o texto inteiro do bloco para o gerador, anexe a imagem indicada e salve com o nome indicado. Depois confira com a lista do arquivo \`00_LEIA_PRIMEIRO.md\`.
`);
  for (const f of F) {
    const tag = `${f.nome} (\`__anim_${f.n}\`, ${ESTAGIO[f.e].nome}${f.ramo != null ? ` ramo ${RAMO[f.ramo]}` : ""})`;
    md.push(`\n## ${tag}\n`);
    md.push(
      bloco(
        `Base (etapa 2)`,
        [
          ["Salvar como", `\`${pasta}/${l.id}__anim_${f.n}.png\``],
          ["Anexar", `\`${l.id}__anim_${f.n}\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (parado, andando e atacando)"]
        ],
        promptBase(l, f),
        `the monster "${f.nome}" (one single creature, repeated in 18 poses)`
      )
    );
    for (const r of ["epico", "lendario"])
      md.push(
        bloco(
          r === "epico" ? "Épico (etapa 3)" : "Lendário (etapa 3)",
          [
            ["Salvar como", `\`${pasta}/${l.id}__anim_${f.n}__${r}.png\``],
            ["Anexar", `a base NOVA \`${l.id}__anim_${f.n}\` (etapa 2)`],
            ["O jogo usa", "sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)"]
          ],
          promptBase(l, f, r),
          `the ${r === "epico" ? "EPIC" : "LEGENDARY"} variant of the monster "${f.nome}" (one single creature, repeated in 18 poses)`
        )
      );
    md.push(
      bloco(
        "Ações (etapa 3, menor urgência)",
        [
          ["Salvar como", `\`${pasta}/${l.id}__acoes_${f.n}.png\``],
          ["Anexar", `a base NOVA \`${l.id}__anim_${f.n}\` (etapa 2)`],
          ["O jogo usa", "ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)"]
        ],
        promptAcoes(l, f),
        `the monster "${f.nome}" (one single creature, repeated in 24 poses)`
      )
    );
  }
  md.push(`\n## Imagem fixa das 8 formas (opcional)\n`);
  md.push(
    bloco(
      "Imagem fixa",
      [
        ["Salvar como", `\`${pasta}/${l.id}__base.png\``],
        ["Anexar", `\`${l.id}__base\`: ${ANEXO_ORIGINAL}`],
        ["O jogo usa", "sim, onde a forma não tem animação (e como referência de cor)"]
      ],
      promptFixa(l),
      `the 8 evolution forms of the monster line "${l.filhote}", one per cell`
    )
  );
  return md.join("\n");
}

// ---------------------------------------------------------------- dragões ancestrais
function arquivoAncestrais() {
  const md = [
    `# Dragões ancestrais\n\nCada dragão tem a animação de 4 estágios (\`__anim_1\` Filhote a \`__anim_4\` Supremo), a imagem fixa com as 5 formas e a cena do ovo chocando. **Antes de gerar \`__base\` e \`__eclosao\`, reconverta os originais** (etapa 0): eles só ficaram achatados.\n`
  ];
  for (const a of D.ancestrais_info) {
    const pasta = "arte/lendarios";
    md.push(`\n## ${a.supremo} \`${a.id}\` · ${D.elementos[a.elemento].nome}\n`);
    md.push(`${a.visual}\n`);
    const nomes = [a.filhote, a.jovem, a.adulto, a.supremo];
    nomes.forEach((nome, e) => {
      const l = {
          ...a,
          traco: "the radiant markings of its element",
          animal: "dragon",
          personalidade: "ancient, proud and wise",
          visual: a.visual
        },
        f = { n: e + 1, nome, e, el: a.elemento, lin: a.linhagem, ult: e === 3 ? a.ultimate : null };
      const p = promptBase(l, f);
      p.splice(3, 1, `${descricaoForma(l, f)}\nThis stage looks like: ${a.formas[e + 1]}.`);
      md.push(
        bloco(
          `${nome} (\`__anim_${e + 1}\`)`,
          [
            ["Salvar como", `\`${pasta}/${a.id}__anim_${e + 1}.png\``],
            ["Anexar", `\`${a.id}__anim_${e + 1}\`: ${ANEXO_ORIGINAL}`],
            ["O jogo usa", "sim"]
          ],
          p
        )
      );
    });
    md.push(
      bloco(
        "Imagem fixa das 5 formas (`__base`)",
        [
          ["Salvar como", `\`${pasta}/${a.id}__base.png\``],
          ["Anexar", `a imagem atual \`${pasta}/${a.id}__base\` (reconverta antes; gere só se continuar ruim)`],
          ["O jogo usa", "sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)"]
        ],
        [
          `Create a 2D game sprite sheet: 5 still images of one dragon, side by side.`,
          telaGrade(1536, 1024, 5, 1),
          `CELLS, left to right:\n${a.formas.map((x, i) => `${i + 1}. ${x}`).join("\n")}`,
          `DRAGON: ${a.visual}. Element ${EL[a.elemento]}.`,
          ref(),
          travasPersonagem(1536, 1024, 5, 1).replace("in the idle row the body fills", "the body fills"),
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
    md.push(
      bloco(
        "Ovo chocando (`__eclosao`)",
        [
          ["Salvar como", `\`${pasta}/${a.id}__eclosao.png\``],
          ["Anexar", `a imagem fixa (\`__base\`) deste dragão`],
          ["O jogo usa", "ainda não (vai para a cena do ovo chocando)"]
        ],
        [
          `Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.`,
          telaGrade(1536, 1024, 6, 1),
          `F1 the egg glowing softly: ${a.formas[0]}. F2 the egg pulsing brighter. F3 first cracks glowing ${EL[a.elemento]} light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: ${a.formas[1]}.`,
          ref(),
          travasPersonagem(1536, 1024, 6, 1).replace("in the idle row the body fills", "the egg fills"),
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  }
  return md.join("\n");
}

// ---------------------------------------------------------------- reinos
function arquivoReino(u) {
  const pasta = `arte/reinos/${u.era}`,
    md = [],
    c = u.combate || {},
    ar = u.arte || {},
    es = u.estrutura || {};
  md.push(`# ${u.nome} \`${u.id}\` · inimigos de ${D.elementos[u.elemento].nome}\n`);
  md.push(`Cenário: ${u.cenario}. Humor: ${u.humor || "-"}\n`);
  md.push(
    `**Ordem neste reino:** inimigos (o jogo usa e é o que mais aparece), chefe e mini-chefe, depois cenário. Todos já são usados pelo jogo no formato abaixo.\n`
  );
  const mundo = `WORLD: ${u.nome}. Art direction: ${ar.estilo || u.cenario}. Main element of the realm: ${EL[u.elemento]}.`;
  // inimigos: o layout é exatamente o que 09_criaturas.ts lê
  const ini = c.inimigos || [];
  md.push(
    bloco(
      "Inimigos comuns (3 tipos)",
      [
        ["Salvar como", `\`${pasta}/${u.id}__inimigos.png\``],
        ["Anexar", `\`${u.id}__inimigos\`: ${ANEXO_ORIGINAL}`],
        ["O jogo usa", "sim (8 colunas × 6 linhas; cada inimigo ocupa 2 linhas)"]
      ],
      [
        `Create a 2D game sprite sheet: 3 different small enemies of the same realm, 2 rows each, 8 frames per row.`,
        telaGrade(1536, 1024, 8, 6),
        ini
          .map(
            (
              e,
              k
            ) => `ENEMY ${k + 1} = "${e.nome}" (${CORPO[e.corpo] || e.corpo}${e.detalhes && e.detalhes.length ? `, with ${det(e.detalhes)}` : ""}), rows ${2 * k + 1} and ${2 * k + 2}:
ROW ${2 * k + 1}: F1-F2 idle (blink), F3-F6 move loop (${ANDAR[e.andar] || e.andar}), F7-F8 attack (${GOLPE[e.golpe] || e.golpe}: F7 wind-up, F8 strike).
ROW ${2 * k + 2}: F1 hurt (flinch), F2-F5 death (${MORTE[e.morte] || e.morte}, the last frame almost gone), F6-F8 quirk: ${MANIA[e.mania] || e.mania || "looks around"}.`
          )
          .join("\n"),
        `The three enemies have the SAME size as each other (small fodder enemies, cute-creepy and funny), clearly different silhouettes and colors, all fitting the realm.${["reino_sombra", "transilvania", "xibalba", "floresta_negra"].includes(u.id) ? " Give them glowing emissive eyes and details so they read on a dark floor." : ""}`,
        mundo,
        `REFERENCE: the attached image shows these same three enemies. Copy each one's design, colors and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.`,
        travasPersonagem(1536, 1024, 8, 6),
        FUNDO,
        ESTILO,
        PROIBIDO
      ],
      `three enemies of ${u.nome}: ${ini.map(e => `"${e.nome}"`).join(", ")} (no other creature)`
    )
  );
  const golpes = x => (x && x.golpes) || [];
  if (c.mini)
    md.push(
      bloco(
        `Mini-chefe: ${u.mini_chefe}`,
        [
          ["Salvar como", `\`${pasta}/${u.id}__mini.png\``],
          ["Anexar", `\`${u.id}__mini\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (6 × 5)"]
        ],
        [
          `Create a 2D game sprite sheet of one mini-boss: 5 animations, 6 frames each.`,
          telaGrade(1536, 1024, 6, 5),
          `ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 a threatening gesture.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "${golpes(c.mini)[0]?.nome || "attack 1"}" (${golpes(c.mini)[0]?.desc || ""}): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "${golpes(c.mini)[1]?.nome || "attack 2"}" (${golpes(c.mini)[1]?.desc || ""}): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - DEATH, 6 frames: staggers, collapses and fades.`,
          `CHARACTER: "${u.mini_chefe}", mini-boss of ${u.nome} (${CORPO[c.mini.corpo] || c.mini.corpo}${c.mini.detalhes ? `, with ${det(c.mini.detalhes)}` : ""}). Twice as big and much more detailed than the common enemies.`,
          mundo,
          ref("", true),
          travasPersonagem(1536, 1024, 6, 5),
          FUNDO,
          ESTILO,
          PROIBIDO
        ],
        `the mini-boss "${u.mini_chefe}" (one single creature, repeated in 30 poses)`
      )
    );
  if (c.chefe)
    md.push(
      bloco(
        `Chefe: ${u.chefe}`,
        [
          ["Salvar como", `\`${pasta}/${u.id}__chefe.png\``],
          ["Anexar", `\`${u.id}__chefe\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (6 × 6)"]
        ],
        [
          `Create a 2D game sprite sheet of one boss: 6 animations, 6 frames each.`,
          telaGrade(1024, 1024, 6, 6),
          `ROW 1 - IDLE LOOP: F1-F4 menacing breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "${golpes(c.chefe)[0]?.nome || "attack 1"}" (${golpes(c.chefe)[0]?.desc || ""}): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "${golpes(c.chefe)[1]?.nome || "attack 2"}" (${golpes(c.chefe)[1]?.desc || ""}): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - PHASE 2${c.chefe.fase2 ? ` "${c.chefe.fase2.nome}" (${c.chefe.fase2.desc})` : ""}: transformation, F1-F3 powering up, F4-F6 the enraged form loop.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.`,
          `CHARACTER: "${u.chefe}", final boss of ${u.nome} (${CORPO[c.chefe.corpo] || c.chefe.corpo}${c.chefe.detalhes ? `, with ${det(c.chefe.detalhes)}` : ""}). Big, iconic and intimidating.`,
          mundo,
          ref("", true),
          travasPersonagem(1024, 1024, 6, 6),
          FUNDO,
          ESTILO,
          PROIBIDO
        ],
        `the boss "${u.chefe}" (one single creature, repeated in 36 poses)`
      )
    );
  md.push(
    bloco(
      "Efeitos dos golpes do chefe",
      [
        ["Salvar como", `\`${pasta}/${u.id}__efeitos.png\``],
        ["Anexar", "nada"],
        ["O jogo usa", "sim (linha 1 = golpe 1, linha 2 = golpe 2; quadros 1-4 projétil, 5-8 impacto no chão)"]
      ],
      [
        `Create a 2D game visual effects sheet (no characters): 2 attack effects, 8 frames each.`,
        telaGrade(1536, 1024, 8, 2),
        golpes(c.chefe)
          .slice(0, 2)
          .map(
            (g, i) =>
              `ROW ${i + 1} - effect of "${g.nome}" (${g.desc}): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.`
          )
          .join("\n"),
        `Element ${EL[u.elemento]}, colors ${COR_EL[u.elemento]}. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.`,
        FUNDO,
        ESTILO,
        PROIBIDO
      ],
      `the attack effects of "${u.chefe}" (effects only, no creature)`
    )
  );
  if (ar.marcos)
    md.push(
      bloco(
        "Marcos, luz e primeiro plano",
        [
          ["Salvar como", `\`${pasta}/${u.id}__props.png\``],
          ["Anexar", `\`${u.id}__props\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (4 × 2: 6 marcos, a luz e o primeiro plano)"]
        ],
        [
          `Create a 2D game sprite sheet of 8 environment props, one per cell, seen from a top-down 3/4 camera.`,
          telaGrade(1536, 1024, 4, 2),
          `CELLS, left to right, top row then bottom row:\n${[...ar.marcos.slice(0, 6), ar.luz, ar.frente].map((x, i) => `${i + 1}. ${x}`).join("\n")}`,
          `ORIENTATION: every prop stands upright, seen from the front at a top-down 3/4 angle, its base on the same line at 85% of the cell height, centered, filling most of the cell. Cell 7 (the light) is a standing object with its flame or glow. Cell 8 is a tall foreground element that may reach the top of its cell. ${mundo}`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  if (ar.enfeites)
    md.push(
      bloco(
        "Chão: peças, manchas e enfeites",
        [
          ["Salvar como", `\`${pasta}/${u.id}__tiles.png\``],
          ["Anexar", `\`${u.id}__tiles\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (8 × 3)"]
        ],
        [
          `Create a 2D game sprite sheet of ground decorations seen from straight above, one item per cell.`,
          telaGrade(1536, 1024, 8, 3),
          `ROW 1 - 8 square ground texture pieces of ${ar.chao}, seen from straight above, each filling its WHOLE cell edge to edge with no transparent margin (slightly different from each other).
ROW 2 - 8 soft ground stains or patches (dirt, moss, cracks) on transparent background, irregular round shapes.
ROW 3 - 8 small loose decorations, one per cell: ${ar.enfeites.join(", ")}.`,
          mundo,
          FUNDO.replace("BACKGROUND:", "BACKGROUND (rows 2 and 3):"),
          ESTILO,
          PROIBIDO
        ]
      )
    );
  if (u.objetos && u.objetos.length)
    md.push(
      bloco(
        "Objetos de quebrar",
        [
          ["Salvar como", `\`${pasta}/${u.id}__objetos.png\``],
          ["Anexar", `\`${u.id}__objetos\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", `sim (8 × ${u.objetos.length}: um objeto por linha)`]
        ],
        [
          `Create a 2D game sprite sheet of breakable objects: one object per row, 8 states.`,
          telaGrade(1536, 1024, 8, u.objetos.length),
          `${u.objetos.map((o, i) => `ROW ${i + 1}: ${o}`).join("\n")}
In every row: F1 intact, F2 cracked, F3 badly broken, F4 special state (scorched, frozen or charged, matching the realm), F5-F8 four small debris pieces of that object.
ORIENTATION: every object upright, seen from the front at a top-down 3/4 angle, base on the line at 85% of the cell height, the same size in F1 to F4 of its row. The debris pieces are small and centered in their cells.`,
          mundo,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  if (es.fauna)
    md.push(
      bloco(
        "Fauna de ambiente",
        [
          ["Salvar como", `\`${pasta}/${u.id}__fauna.png\``],
          ["Anexar", `\`${u.id}__fauna\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (8 × 2)"]
        ],
        [
          `Create a 2D game sprite sheet of small ambient animals, top-down 3/4 view, facing right.`,
          telaGrade(1536, 1024, 8, 2),
          `ROW 1: F1-F4 ${es.fauna.ave} flying loop (wings up, mid, down, mid); F5-F8 ${es.fauna.borboleta} fluttering loop.
ROW 2: F1-F4 ${es.fauna.peixe} swimming loop; F5 ${es.fauna.bicho} sitting, F6 jumping up, F7 at the top of the jump, F8 landing.`,
          `Each animal small and centered in its cell. ${mundo}`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  if (es.praca)
    md.push(
      bloco(
        "Peças grandes (praça, lago, construção, ponte)",
        [
          ["Salvar como", `\`${pasta}/${u.id}__pecas.png\``],
          ["Anexar", `\`${u.id}__pecas\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (2 × 2)"]
        ],
        [
          `Create a 2D game sheet of 4 large map pieces seen from straight above (top-down), one per cell.`,
          telaGrade(1024, 1024, 2, 2),
          `CELL 1 (top left): ${es.praca}, round, filling the cell.
CELL 2 (top right): ${es.lago}, round, filling the cell.
CELL 3 (bottom left): ${es.construcao}, top-down 3/4 view.
CELL 4 (bottom right): THE BRIDGE, LYING HORIZONTALLY: ${es.ponte}. It runs straight across from the LEFT edge to the RIGHT edge of the cell, both ends cut straight at the cell edges (the game repeats it side by side to make it longer). Seen from the front: the walkway deck is a horizontal band in the upper third with its railings, and the arches or supports hang below it. Never vertical, never diagonal, never seen from above, no towers or end posts.`,
          `ORIENTATION: cells 1 and 2 are seen from straight above (top-down), round, filling their cells. Cell 3 is a building seen from the front at a top-down 3/4 angle, standing upright. Cell 4 is the horizontal bridge described above.`,
          mundo,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  if (es.piso)
    md.push(
      bloco(
        "Piso",
        [
          ["Salvar como", `\`${pasta}/${u.id}__piso.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "sim"]
        ],
        [
          `Create a seamless tileable ground texture for a 2D top-down game.`,
          `CANVAS: exactly 1024 x 1024 pixels. The texture must tile perfectly on all four edges (left matches right, top matches bottom): no visible seam when repeated.`,
          `GROUND: ${es.piso}. Seen from straight above. Midtone, low contrast and low saturation in the walkable areas so characters stand out; small details spread evenly, no big landmark that would repeat visibly.`,
          mundo,
          `DO NOT: add objects, characters, shadows, light spots, vignette, borders, text or watermark.`
        ]
      )
    );
  if (es.fundo)
    md.push(
      bloco(
        "Fundo do abismo",
        [
          ["Salvar como", `\`${pasta}/${u.id}__fundo.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "sim"]
        ],
        [
          `Create a seamless tileable background texture for a 2D top-down game: what is seen far below when looking down into a chasm.`,
          `CANVAS: exactly 1024 x 1024 pixels, tiling perfectly on all four edges.`,
          `CONTENT: ${es.fundo}. Darker and hazier than the ground (it is far away).`,
          `DO NOT: add characters, text, borders or watermark.`
        ]
      )
    );
  if (es.paredao)
    md.push(
      bloco(
        "Paredão do abismo",
        [
          ["Salvar como", `\`${pasta}/${u.id}__paredao.png\``],
          ["Anexar", `\`${u.id}__paredao\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (4 × 2: 8 pedaços de parede)"]
        ],
        [
          `Create a 2D game sheet of 8 chasm wall segments, the vertical wall seen from the front, one per cell.`,
          telaGrade(1536, 1024, 4, 2),
          `ROW 1 - 4 wall segments: ${es.paredao}.
ROW 2 - the same wall, 4 segments, each with a ${QUEDA[es.lago_solo] || "waterfall"} pouring down its middle.
ORIENTATION: we look straight at the vertical rock face (front view, like a cliff seen from the chasm). In every cell the top edge of the rock (with a thin ground lip${es.lago_solo === "agua" ? " and plants" : ""}) is at the top of the cell, the wall fills about 80% of the cell height and fades into mist at the bottom. Each segment fills the FULL cell width and its left and right edges continue seamlessly into the neighbouring segment, so the 4 segments of a row join into one long wall. Small variations between segments, same scale in all 8.`,
          mundo,
          FUNDO.replace("BACKGROUND:", "BACKGROUND (around the wall):"),
          ESTILO,
          PROIBIDO
        ]
      )
    );
  if (u.reliquia)
    md.push(
      bloco(
        `Relíquia: ${u.reliquia.nome}`,
        [
          ["Salvar como", `\`arte/itens/reliquias/${u.id}.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "ainda não (vai para a carta da relíquia; me mande o PNG)"]
        ],
        [
          `Create a single game item icon.`,
          `CANVAS: exactly 1024 x 1024 pixels, the item centered and filling about 70% of the canvas.`,
          `ITEM: the relic "${u.reliquia.nome}" from ${u.nome} (effect: ${u.reliquia.efeito}). Precious, magical and readable when shrunk to 32 px. 3/4 view.`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  return md.join("\n");
}
function arquivoGuardioes() {
  const md = [
    `# Guardiões das Eras (chefes do fim de cada era)\n\nO jogo lê 6 × 6: linhas 3, 4 e 5 são os três golpes, linha 6 a morte.\n`
  ];
  for (const [id, e] of Object.entries(D.eras)) {
    const c = e.combate || {},
      g = c.golpes || [],
      pasta = `arte/reinos/${id}`;
    md.push(`\n## ${e.guardiao} · ${e.nome}\n`);
    md.push(
      bloco(
        "Animação",
        [
          ["Salvar como", `\`${pasta}/guardiao_${id}__anim.png\``],
          ["Anexar", `\`guardiao_${id}__anim\`: ${ANEXO_ORIGINAL}`],
          ["O jogo usa", "sim (6 × 6)"]
        ],
        [
          `Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.`,
          telaGrade(1024, 1024, 6, 6),
          `ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
${[0, 1, 2].map(i => `ROW ${i + 3} - ATTACK "${g[i]?.nome || `attack ${i + 1}`}" (${g[i]?.desc || ""}): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.`).join("\n")}
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.`,
          `CHARACTER: "${e.guardiao}", guardian of the era "${e.nome}" (Portuguese description: ${e.guardiao_visual}; ${CORPO[c.corpo] || c.corpo}${c.detalhes ? `, with ${det(c.detalhes)}` : ""}). The biggest and most impressive creature of the game.`,
          ref("", true),
          travasPersonagem(1024, 1024, 6, 6),
          FUNDO,
          ESTILO,
          PROIBIDO
        ],
        `the guardian "${e.guardiao}" (one single creature, repeated in 36 poses)`
      )
    );
    md.push(
      bloco(
        "Efeitos dos golpes",
        [
          ["Salvar como", `\`${pasta}/guardiao_${id}__efeitos.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)"]
        ],
        [
          `Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.`,
          telaGrade(1536, 1024, 8, 3),
          g
            .slice(0, 3)
            .map(
              (x, i) =>
                `ROW ${i + 1} - effect of "${x.nome}" (${x.desc}): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.`
            )
            .join("\n"),
          `Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ],
        `the attack effects of "${e.guardiao}" (effects only, no creature)`
      )
    );
  }
  return md.join("\n");
}

// ---------------------------------------------------------------- Lendas e deuses
function arquivoLendas() {
  const md = [
    `# Lendas e deuses (herói da run)\n\nO jogo lê \`arte/lendas/<id>.png\` e \`arte/panteao/<id>.png\` em 6 × 3: parado, andando e lançando o poder.\n`
  ];
  const todos = [...D.lendas.map(l => ({ ...l, pasta: "lendas" })), ...D.panteao.map(l => ({ ...l, pasta: "panteao" }))];
  for (const l of todos) {
    const u = D.universos.find(x => x.id === (l.universo || (l.provacao && l.provacao.universo)));
    md.push(`\n## ${l.nome} \`${l.id}\`\n`);
    md.push(
      bloco(
        "Animação",
        [
          ["Salvar como", `\`arte/${l.pasta}/${l.id}.png\``],
          ["Anexar", `\`${l.id}\`: ${ANEXO_ORIGINAL}; e o retrato \`${l.id}__retrato\`, se existir`],
          ["O jogo usa", "sim (6 × 3)"]
        ],
        [
          `Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.`,
          telaGrade(1536, 1024, 6, 3),
          `ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "${l.poder.nome}" (${l.poder.tipo} power), 6 frames: F1-F2 wind-up, F3-F4 release with ${l.elementos.map(e => EL[e]).join(" and ")} energy, F5-F6 recovery.`,
          `CHARACTER: ${l.nome}, ${l.pasta === "panteao" ? `a god of the ${l.panteao} pantheon` : `a mythological legend${u ? ` of ${u.nome}` : ""}`}. Elements: ${l.elementos.map(e => EL[e]).join(" and ")}. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.`,
          ref("", true),
          travasPersonagem(1536, 1024, 6, 3),
          FUNDO,
          ESTILO,
          PROIBIDO
        ],
        `the hero ${l.nome} (one single character, repeated in 18 poses)`
      )
    );
  }
  return md.join("\n");
}

// ---------------------------------------------------------------- itens gerais (herói, ovos, baús, efeitos, ícones)
function arquivoGeral() {
  const md = [
    `# Itens gerais\n\nNão dependem dos monstros: podem ser feitos a qualquer momento. **O jogo ainda desenha estes por código.** Quando cada um chegar, me mande o PNG: eu converto, ligo no código e confiro com prints.\n`
  ];
  md.push(
    bloco(
      "Herói básico (Invocador)",
      [
        ["Salvar como", "`arte/heroi/invocador__anim.png`"],
        ["Anexar", "um print do herói atual (tela de jogo) para manter as cores"],
        ["O jogo usa", "ainda não"]
      ],
      [
        `Create a 2D game sprite sheet of the main hero: 4 animations, 6 frames each.`,
        telaGrade(1536, 1024, 6, 4),
        `ROW 1 - IDLE LOOP: F1-F4 breathing, F5-F6 blink.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place, cape flowing.
ROW 3 - COMMAND, 6 frames: points the sword forward and the gem on the pommel flares (F1-F2 raise, F3-F4 point and flare, F5-F6 back to idle).
ROW 4 - F1-F2 hurt (flinch), F3-F6 victory pose (sword raised).`,
        `CHARACTER: a young adventurer summoner, heroic proportions (head about 1/3 of the height, not chibi), messy chestnut hair, red scarf, short blue cape, cream tunic with a golden belt, leather boots, short sword with a round gem on the pommel (paint the gem pale white-blue: the game recolors it).`,
        travasPersonagem(1536, 1024, 6, 4),
        FUNDO,
        ESTILO,
        PROIBIDO
      ]
    )
  );
  for (const el of Object.keys(EL))
    md.push(
      bloco(
        `Ovo de ${D.elementos[el].nome}`,
        [
          ["Salvar como", `\`arte/ovos/ovo__${el}.png\``],
          ["Anexar", "nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)"],
          ["O jogo usa", "ainda não"]
        ],
        [
          `Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.`,
          telaGrade(1536, 1024, 6, 3),
          `ROW 1 - COMMON egg: simple shell with a ${EL[el]} pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing ${EL[el]} light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.`,
          `Element ${EL[el]}, colors ${COR_EL[el]}. The egg is the same size and shape in all three rows; only the decoration changes.`,
          travasPersonagem(1536, 1024, 6, 3).replace(
            "The character faces RIGHT in every cell (the game mirrors it for left).",
            "The egg stands upright in every cell."
          ),
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  md.push(
    bloco(
      "Baús",
      [
        ["Salvar como", "`arte/itens/baus.png`"],
        ["Anexar", "nada"],
        ["O jogo usa", "ainda não"]
      ],
      [
        `Create a 2D game sprite sheet of treasure chests: 4 rarities, 6 frames each.`,
        telaGrade(1536, 1024, 6, 4),
        `ROW 1 wooden chest. ROW 2 silver chest. ROW 3 golden chest. ROW 4 legendary arcane crystal chest.
In every row: F1 closed, F2-F3 shaking in anticipation, F4-F5 the lid opening backwards, F6 open with light pouring out.`,
        `Seen from the front at a 3/4 top-down angle. Same chest size in every row.`,
        travasPersonagem(1536, 1024, 6, 4).replace(
          "The character faces RIGHT in every cell (the game mirrors it for left).",
          "The chest faces the viewer in every cell."
        ),
        FUNDO,
        ESTILO,
        PROIBIDO
      ]
    )
  );
  md.push(
    bloco(
      "Coletáveis",
      [
        ["Salvar como", "`arte/itens/coletaveis.png`"],
        ["Anexar", "nada"],
        ["O jogo usa", "ainda não"]
      ],
      [
        `Create a 2D game sprite sheet of small pickups, one item per cell.`,
        telaGrade(1536, 1024, 8, 4),
        `ROW 1 - XP crystals: F1-F2 blue (normal, sparkle), F3-F4 green, F5-F6 purple, F7-F8 gold.
ROW 2 - gold coin spinning, 8 frames.
ROW 3 - F1-F4 healing heart pulsing, F5-F8 bonus star twinkling.
ROW 4 - F1-F4 Essence orb swirling, F5-F8 golden key glinting.`,
        `Each item small, centered and readable when shrunk to 12 px.`,
        FUNDO,
        ESTILO,
        PROIBIDO
      ]
    )
  );
  const PODER = {
    fogo: "Eruption: explosions where enemies are densest, the ground catching fire",
    agua: "Tide: a wave rushing out in a ring, pushing enemies away",
    terra: "Rockfall: boulders falling from the sky and cracking the ground",
    ar: "Cyclone: a whirlwind pulling things in",
    raio: "Storm: lightning bolts striking down",
    natureza: "Forest Blessing: a healing bloom with roots grabbing nearby",
    luz: "Solar Pillar: a column of sunlight striking down",
    sombra: "Shadow Embrace: dark tendrils pulling into one point"
  };
  for (const el of Object.keys(EL))
    md.push(
      bloco(
        `Efeitos de ${D.elementos[el].nome}`,
        [
          ["Salvar como", `\`arte/efeitos/elemento__${el}.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "ainda não"]
        ],
        [
          `Create a 2D game visual effects sheet for the ${EL[el]} element (no characters): 4 effects, 8 frames each.`,
          telaGrade(1536, 1024, 8, 4),
          `ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "${PODER[el]}": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.`,
          `Colors ${COR_EL[el]}. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  for (const [k, c] of Object.entries(D.classes))
    md.push(
      bloco(
        `Efeitos da classe ${c.nome}`,
        [
          ["Salvar como", `\`arte/efeitos/classe__${k}.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "ainda não"]
        ],
        [
          `Create a 2D game visual effects sheet for the ${CLASSE_EN[k]} class (no characters): 3 effects, 8 frames each.`,
          telaGrade(1536, 1024, 8, 3),
          `ROW 1 - basic attack "${c.basico}", 8 frames.
ROW 2 - skill "${c.h1.nome}" (${c.h1.desc}), 8 frames.
ROW 3 - skill "${c.h2.nome}" (${c.h2.desc}), 8 frames.
(Text in Portuguese describes what the effect does.)`,
          `Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  for (const [k, ops] of Object.entries(D.especiais))
    ops.forEach(([nome, desc], i) =>
      md.push(
        bloco(
          `Especial ${D.classes[k].nome} ${i + 1}: ${nome}`,
          [
            ["Salvar como", `\`arte/efeitos/especial__${k}_${i + 1}.png\``],
            ["Anexar", "nada"],
            ["O jogo usa", "não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)"]
          ],
          [
            `Create a 2D game visual effect animation strip (effect only, NO character).`,
            telaGrade(1536, 1024, 8, 1),
            `EFFECT: the special move "${nome}" (${desc}). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.`,
            `Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.`,
            FUNDO,
            ESTILO,
            PROIBIDO
          ]
        )
      )
    );
  // golpes combinados: 8 por linhagem, 8 por elemento e a Trindade (nomes dos arquivos que o jogo já procura)
  const comb = [
    ...Object.entries(D.combinados_linhagem).map(([k, nome]) => [k, nome, `the whole team of ${LINHAGEM_EN[k] || k} attacking together`]),
    ...Object.entries(D.combinados_elemento).map(([k, nome]) => [
      `el_${k}`,
      nome,
      `three ${EL[k]} monsters unleashing their element together, colors ${COR_EL[k]}`
    ]),
    ["trindade", "Trindade", "three different elements spiralling into one blast"]
  ];
  for (const [k, nome, desc] of comb)
    md.push(
      bloco(
        `Combinado: ${nome}`,
        [
          ["Salvar como", `\`arte/efeitos/combinado__${k}.png\``],
          ["Anexar", "nada"],
          ["O jogo usa", "não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)"]
        ],
        [
          `Create a 2D game visual effect animation strip (effect only, NO character).`,
          telaGrade(1536, 1024, 10, 1),
          `EFFECT: the team combo attack "${nome}": ${desc}. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.`,
          `Bright core with soft translucent edges, never opaque white shapes.`,
          FUNDO,
          ESTILO,
          PROIBIDO
        ]
      )
    );
  md.push(
    bloco(
      "Ícones dos Poderes do Elemento",
      [
        ["Salvar como", "`arte/ui/elementais.png`"],
        ["Anexar", "nada"],
        ["O jogo usa", "ainda não (vai para a carta de nível)"]
      ],
      [
        `Create a 2D game sheet of 8 square ability icons, one per cell.`,
        telaGrade(1536, 1024, 4, 2),
        `CELLS, left to right, top row then bottom row:\n${Object.keys(EL)
          .map((e, i) => `${i + 1}. ${EL[e]} - ${PODER[e]}`)
          .join("\n")}`,
        `Each icon a round medallion with the power symbol inside, colors of its element, readable when shrunk to 32 px.`,
        FUNDO,
        ESTILO,
        PROIBIDO
      ]
    )
  );
  return md.join("\n");
}

// ---------------------------------------------------------------- gravação
const CONFERIR = process.argv.includes("--conferir"),
  GERADAS = ["2_monstros", "3_gerais", "4_reinos"],
  gerados = new Map();
function gravar(rel, txt) {
  const nivel = rel.split("/").length - 1; // link do molde relativo à pasta do arquivo
  gerados.set(rel, txt.replace(/\{\{MOLDES\}\}/g, "../".repeat(nivel) + "moldes").trimEnd() + "\n");
}
let n = 0;
for (const l of D.linhas) {
  gravar(`2_monstros/${l.elemento}/${l.id}.md`, arquivoMonstro(l));
  n++;
}
gravar(`2_monstros/ancestrais.md`, arquivoAncestrais());
for (const u of D.universos) gravar(`4_reinos/${u.era}/${u.id}.md`, arquivoReino(u));
gravar(`4_reinos/guardioes.md`, arquivoGuardioes());
gravar(`3_gerais/itens_e_efeitos.md`, arquivoGeral());
gravar(`3_gerais/lendas_e_deuses.md`, arquivoLendas());
// arquivos que existem hoje nas pastas geradas (00_LEIA_PRIMEIRO.md e 1_corrigir.md são escritos à mão e ficam de fora)
const existentes = [];
for (const d of GERADAS)
  (function andar(rel) {
    const abs = path.join(SAIDA, rel);
    if (!fs.existsSync(abs)) return;
    for (const f of fs.readdirSync(abs)) {
      const r = path.join(rel, f);
      if (fs.statSync(path.join(SAIDA, r)).isDirectory()) andar(r);
      else existentes.push(r.split(path.sep).join("/"));
    }
  })(d);
if (CONFERIR) {
  // a tabela de objetos por reino da página de conferência tem de bater com os dados
  const objs = Object.fromEntries(D.universos.map(u => [u.id, (u.objetos || []).length]));
  const errados = Object.keys(objs).filter(k => LAY.OBJETOS[k] !== objs[k]);
  if (errados.length) {
    console.error(
      `ferramentas/layouts_arte.js: objetos por reino desatualizados (${errados.join(", ")}). Atualize OBJETOS com os dados do jogo.`
    );
    process.exit(1);
  }
  const dif = [...new Set([...gerados.keys(), ...existentes])].filter(
    r => !gerados.has(r) || !fs.existsSync(path.join(SAIDA, r)) || fs.readFileSync(path.join(SAIDA, r), "utf8") !== gerados.get(r)
  );
  if (dif.length) {
    console.error(
      `docs/prompts/ não corresponde aos dados do jogo (${dif.length} arquivo(s), ex.: ${dif.slice(0, 3).join(", ")}). Rode: node ferramentas/gerar_prompts.js`
    );
    process.exit(1);
  }
  console.log(`docs/prompts/ corresponde aos dados do jogo (${gerados.size} arquivos).`);
  process.exit(0);
}
for (const d of GERADAS) fs.rmSync(path.join(SAIDA, d), { recursive: true, force: true });
for (const [rel, txt] of gerados) {
  const f = path.join(SAIDA, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, txt);
}
const total = [...gerados.values()].reduce((t, s) => t + (s.match(/^```text$/gm) || []).length, 0);
console.log(
  `docs/prompts/: ${n} monstros, ${D.ancestrais_info.length} dragões, ${D.universos.length} reinos, ${Object.keys(D.eras).length} Guardiões, ${D.lendas.length + D.panteao.length} Lendas e deuses · ${total} prompts`
);
