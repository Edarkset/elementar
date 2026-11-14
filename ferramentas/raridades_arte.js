// Temas das raridades Épico e Lendário, por monstro, descritos a partir das imagens fixas que já estão no jogo (as cores já
// ajustadas à mão). Monstro novo sem tema usa o padrão (Épico prateado-violeta com runas, Lendário dourado com halo). O tema vale para TODAS as folhas daquela raridade do monstro: a animação de cada forma
// (__anim_N__epico / __lendario) e a imagem fixa das 8 formas (__epico / __lendario), que é a das cartas e do Bestiário e
// também a referência de cor quando a forma ainda não tem animação própria. Assim a carta e a partida mostram o mesmo monstro.
//
// Para acrescentar um tema: uma linha por monstro, com o nome curto (aparece no pacote) e a descrição em inglês para o gerador.
// Depois rode: node ferramentas/gerar_prompts.js
(function () {
  // tirados das imagens fixas de Épico e Lendário que já estão no jogo (arte/monstros/<el>/<id>__epico e __lendario)
  const RARIDADES = {
    fogo_fatuo: {
      epico: {
        nome: "Chama verde",
        en: "GREEN FLAME: emerald and lime-green fire instead of orange, dark green shadows, glowing yellow-green eyes"
      },
      lendario: {
        nome: "Chama galáxia",
        en: "GALAXY FLAME: pale lavender, white and deep indigo-violet fire with tiny star-like specks, a cosmic glow"
      }
    },
    dragao_gales: {
      epico: {
        nome: "Bandeira galesa",
        en: "WELSH FLAG: deep green scales, white wing membranes and red heraldic dragon emblems on the wings"
      },
      lendario: {
        nome: "Porcelana",
        en: "PORCELAIN: white scales painted with cobalt-blue patterns like blue-and-white porcelain, gold trim"
      }
    },
    kitsune: {
      epico: { nome: "Raposa sombria", en: "SHADOW FOX: black-purple fur with violet fox-fire on the tails and ears" },
      lendario: { nome: "Raposa dourada", en: "GOLDEN FOX: golden-yellow fur and tails, warm gold glow, small red accents" }
    },
    ifrit: {
      epico: { nome: "Chama azul", en: "BLUE FLAME: royal-blue and cyan fire body and smoke" },
      lendario: { nome: "Areia dourada", en: "GOLDEN SAND: pale gold, cream and white smoke body with gold ornaments" }
    },
    domovoi: {
      epico: { nome: "Brasa", en: "EMBER: darker coal-brown body with glowing red-orange embers and hot cracks" },
      lendario: { nome: "Cinza clara", en: "PALE ASH: light cream and ash-white beard and fur with gold accents" }
    },
    fenix: {
      epico: { nome: "Fênix sombria", en: "DARK PHOENIX: black and crimson feathers with a red glow" },
      lendario: { nome: "Fênix de gelo", en: "ICE PHOENIX: white and icy-blue feathers with a frost glow" }
    },
    quimera: {
      epico: { nome: "Estátua de bronze", en: "ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue" },
      lendario: { nome: "Joias", en: "JEWELS: crimson-red body with emerald-green and sapphire-blue heads, gem-like shine" }
    },
    long: {
      epico: { nome: "Jade", en: "JADE: jade-green and white scales with gold trim and white clouds" },
      lendario: { nome: "Vermelho imperial", en: "IMPERIAL: crimson red and gold scales, like a Chinese New Year dragon" }
    },
    draugr: {
      epico: { nome: "Verde fantasma", en: "GHOSTLY SEA-GREEN: dark teal body with a sea-green ghostly glow" },
      lendario: { nome: "Geleira", en: "GLACIAL: bright ice-blue and white frost all over" }
    },
    jotunn: {
      epico: { nome: "Safira", en: "SAPPHIRE ICE: deeper royal-blue ice" },
      lendario: { nome: "Gelo aurora", en: "AURORA ICE: pale ice with an iridescent opal sheen (soft rainbow reflections)" }
    },
    kappa: {
      epico: { nome: "Musgo", en: "MOSS: green skin and a moss-covered shell with small lotus flowers" },
      lendario: { nome: "Laca vermelha", en: "RED LACQUER: red-orange skin and a red lacquered shell with gold details, like a shrine" }
    },
    iara: {
      epico: { nome: "Rio escuro", en: "DARK RIVER: dark brown-black tail and water (like the Rio Negro) with silver accents" },
      lendario: { nome: "Pôr do sol", en: "SUNSET: orange-red and gold tail and warm sunset-colored water" }
    },
    leviata: {
      epico: { nome: "Abismo", en: "ABYSSAL: dark navy blue with bright blue highlights" },
      lendario: { nome: "Pérola", en: "PEARL: white and pale lavender scales with a pearly sheen" }
    },
    ahuizotl: {
      epico: { nome: "Jade escuro", en: "DARK JADE: green-black body with emerald highlights" },
      lendario: { nome: "Ouro asteca", en: "AZTEC GOLD: golden body with green jade accents" }
    },
    amaru: {
      epico: { nome: "Tecido andino", en: "ANDEAN AUTUMN: red, orange and gold scales with Andean woven patterns and autumn leaves" },
      lendario: {
        nome: "Ouro e turquesa",
        en: "INCA GOLD AND TURQUOISE: golden body with a turquoise feathered crest and turquoise leaves"
      }
    },
    mumia: {
      epico: { nome: "Musgo de tumba", en: "TOMB MOSS: olive-green aged bandages" },
      lendario: { nome: "Obsidiana", en: "OBSIDIAN: dark brown-black bandages with bronze-gold accents" }
    },
    ammit: {
      epico: { nome: "Pântano", en: "SWAMP: darker olive-green and brown" },
      lendario: { nome: "Ouro e lápis-lazúli", en: "EGYPTIAN GOLD: golden body with lapis-blue stripes" }
    },
    gnomo: {
      epico: { nome: "Safira", en: "SAPPHIRE: blue crystals and gems instead of green, blue hat" },
      lendario: { nome: "Ouro", en: "GOLDEN: gold and cream clothes, golden armor and a glowing beard" }
    },
    roc: {
      epico: { nome: "Prata de tempestade", en: "STORM SILVER: grey-blue and silver feathers" },
      lendario: { nome: "Ouro branco", en: "WHITE GOLD: white feathers with gold" }
    },
    minotauro: {
      epico: { nome: "Vermelho sangue", en: "BLOOD RED: dark crimson and black fur, red cloth" },
      lendario: { nome: "Ouro", en: "GOLDEN: golden fur and gold armor" }
    },
    medusa: {
      epico: { nome: "Esmeralda", en: "EMERALD: vivid emerald-green snakes and scales" },
      lendario: { nome: "Ouro e marfim", en: "GOLD AND IVORY: golden snakes, ivory and gold body" }
    },
    banshee: {
      epico: { nome: "Lavanda", en: "TWILIGHT LAVENDER: periwinkle and lavender-blue ghostly body" },
      lendario: { nome: "Aurora rosada", en: "ROSE DAWN: soft pink and peach ghostly glow" }
    },
    saci: {
      epico: { nome: "Noite estrelada", en: "STARRY NIGHT: dark blue cap and whirlwind decorated with stars and crescent moons" },
      lendario: { nome: "Redemoinho dourado", en: "GOLDEN WHIRLWIND: golden cap and a golden tornado" }
    },
    sereia: {
      epico: { nome: "Recife de coral", en: "CORAL REEF: coral pink and turquoise" },
      lendario: { nome: "Pérola e prata", en: "PEARL SILVER: white, silver and pale lavender" }
    },
    tengu: {
      epico: { nome: "Carmesim", en: "CRIMSON: red and pink-red feathers" },
      lendario: { nome: "Ouro", en: "GOLDEN: gold and cream feathers" }
    },
    harpia: {
      epico: { nome: "Tempestade", en: "STORM: dark grey-black feathers with golden lightning streaks" },
      lendario: { nome: "Ouro", en: "GOLDEN: gold and cream feathers" }
    },
    grifo: {
      epico: { nome: "Neve", en: "SNOW: silver-white body with pale blue wing tips" },
      lendario: { nome: "Ouro solar", en: "SOLAR GOLD: gold body with red gem accents" }
    },
    ryu: {
      epico: { nome: "Tempestade índigo", en: "INDIGO STORM: deep indigo and violet scales with white lightning" },
      lendario: { nome: "Kohaku", en: "KOHAKU: white scales with red markings like a kohaku koi, gold accents" }
    },
    jiangshi: {
      epico: { nome: "Jade", en: "JADE: green robes and a jade-green glow" },
      lendario: { nome: "Ouro imperial", en: "IMPERIAL GOLD: golden robes" }
    },
    raiju: {
      epico: { nome: "Raio violeta", en: "VIOLET LIGHTNING: purple and violet fur and electricity (not pure magenta)" },
      lendario: { nome: "Ouro", en: "GOLDEN: golden fur and golden sparks" }
    },
    ciclope: {
      epico: { nome: "Cobre", en: "COPPER: copper and bronze metallic warm brown with an orange glow" },
      lendario: { nome: "Branco e ouro", en: "WHITE GOLD: cream-white fur and gold armor" }
    },
    frankenstein: {
      epico: { nome: "Galvânico verde", en: "GREEN GALVANIC: glowing green heart and eyes, moss-green patches" },
      lendario: { nome: "Porcelana azul", en: "BLUE PORCELAIN: blue and white armor patches with gold" }
    },
    poraque: {
      epico: { nome: "Bioluminescente", en: "BIOLUMINESCENT: deep blue body with glowing cyan spots" },
      lendario: { nome: "Ouro", en: "GOLDEN: golden electric eel with a warm glow" }
    },
    lobisomem: {
      epico: { nome: "Lobo vermelho", en: "CRIMSON WOLF: deep red and dark red fur" },
      lendario: { nome: "Lobo da neve", en: "SNOW WOLF: white and pale grey fur with icy blue accents" }
    },
    curupira: {
      epico: { nome: "Outono", en: "AUTUMN: clothes of orange, amber and gold autumn leaves, falling autumn leaves, fiery orange hair" },
      lendario: { nome: "Inverno", en: "WINTER: frosty pale-blue and white, icy white-blue hair, frosted leaf clothes, snowflakes" }
    },
    mandragora: {
      epico: { nome: "Beladona violeta", en: "VIOLET NIGHTSHADE: purple and lavender leaves and body" },
      lendario: { nome: "Raiz dourada", en: "GOLDEN ROOT: golden-yellow body and leaves with cream flowers" }
    },
    kodama: {
      epico: { nome: "Sakura (ipê rosa)", en: "SAKURA: soft pink blossoms all over (pink ipê and cherry blossom), pink petals" },
      lendario: { nome: "Ipê amarelo", en: "GOLDEN IPÊ: golden-yellow blossoms all over (yellow ipê), golden petals" }
    },
    boto: {
      epico: { nome: "Boto azul", en: "BLUE: blue-grey river dolphin with blue accents; keep the white hat" },
      lendario: {
        nome: "Boto branco",
        en: "PEARL WHITE: white and cream with gold accents, like the white suit of the enchanted Boto; keep the white hat"
      }
    },
    escorpiao_homem: {
      epico: { nome: "Sangue", en: "BLOOD: crimson and black carapace" },
      lendario: { nome: "Areia dourada", en: "GOLDEN SAND: golden-amber carapace" }
    },
    serpente_emplumada: {
      epico: { nome: "Quetzal verde", en: "QUETZAL GREEN: emerald and jade feathers with gold" },
      lendario: { nome: "Quetzal vermelho", en: "QUETZAL RED: crimson red and green feathers with gold" }
    },
    qilin: {
      epico: { nome: "Coral", en: "CORAL: coral-red and pink body with a white mane" },
      lendario: { nome: "Azul noturno", en: "NIGHT BLUE: navy blue body, white mane and gold horns" }
    },
    fada: {
      epico: { nome: "Luar", en: "MOONLIGHT: silver, lavender and pale blue" },
      lendario: { nome: "Opala", en: "OPAL: rainbow-iridescent wings and soft pastel pinks" }
    },
    simurgh: {
      epico: { nome: "Pavão", en: "PEACOCK: teal-green peacock feathers" },
      lendario: { nome: "Branco e safira", en: "WHITE GOLD: white and gold feathers with sapphire-blue eye spots" }
    },
    anjo: {
      epico: { nome: "Serafim sombrio", en: "DARK SERAPH: dark navy and bronze-orange armor and wings" },
      lendario: { nome: "Ouro radiante", en: "RADIANT: gold and white with a strong glow" }
    },
    esfinge: {
      epico: { nome: "Lápis-lazúli", en: "LAPIS: royal blue and gold, Egyptian style" },
      lendario: { nome: "Ouro puro", en: "PURE GOLD: all gold" }
    },
    vampiro: {
      epico: { nome: "Azul meia-noite", en: "MIDNIGHT BLUE: dark blue cloak, bluish tones and blue magic" },
      lendario: { nome: "Carmesim de cabelo branco", en: "CRIMSON: red cloak and silver-white hair" }
    },
    pirata_fantasma: {
      epico: { nome: "Verde marinho", en: "SEA-GREEN GHOST: deeper green ghostly glow with seaweed" },
      lendario: { nome: "Tesouro", en: "TREASURE: golden ghostly glow and golden coins" }
    },
    cacada_selvagem: {
      epico: { nome: "Caçada de fogo", en: "FIRE HUNT: orange and red flames instead of the green ghost fire, ember-dark bodies" },
      lendario: { nome: "Caçada de gelo", en: "ICE HUNT: icy-blue and white frost ghost fire, pale bodies" }
    },
    cerbero: {
      epico: { nome: "Fogo do inferno", en: "HELLFIRE: dark red fur with orange-red flames" },
      lendario: { nome: "Chama azul", en: "WHITE AND BLUE: cream-white fur with blue flames and gold armor" }
    },
    fomoriano: {
      epico: { nome: "Abismo azul", en: "ABYSS BLUE: deep blue body" },
      lendario: { nome: "Osso", en: "BONE: pale ivory and white body" }
    },
    morcego: {
      epico: { nome: "Carmesim", en: "CRIMSON: bright red wings and dark red fur" },
      lendario: { nome: "Rosa pálido", en: "PALE PINK: pinkish-white fur and pale pink wings" }
    }
  };
  // vale para todos os temas: a raridade tem de continuar parecendo rara e o elemento reconhecível
  const REGRA =
    "The rarity must still read as special at a glance: the Epic has a soft glow and a few sparkles; the Legendary has a stronger aura, ornaments and floating particles. Keep the signature trait and at least one clear cue of its element visible.";
  const PADRAO = {
    epico: {
      nome: "Padrão (prateado-violeta)",
      en: "crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura"
    },
    lendario: {
      nome: "Padrão (dourado)",
      en: "radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings"
    }
  };
  const tema = (id, rar) => (RARIDADES[id] && RARIDADES[id][rar]) || PADRAO[rar];
  const API = { RARIDADES, PADRAO, REGRA, tema };
  if (typeof module !== "undefined") module.exports = API;
  else window.RARIDADES_ARTE = API;
})();
