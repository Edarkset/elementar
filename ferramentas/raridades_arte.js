// Temas das raridades Épico e Lendário, por monstro. Monstro sem tema usa o padrão (Épico prateado-violeta com runas,
// Lendário dourado com halo). O tema vale para TODAS as folhas daquela raridade do monstro: a animação de cada forma
// (__anim_N__epico / __lendario) e a imagem fixa das 8 formas (__epico / __lendario), que é a das cartas e do Bestiário e
// também a referência de cor quando a forma ainda não tem animação própria. Assim a carta e a partida mostram o mesmo monstro.
//
// Para acrescentar um tema: uma linha por monstro, com o nome curto (aparece no pacote) e a descrição em inglês para o gerador.
// Depois rode: node ferramentas/gerar_prompts.js
(function () {
  // Cada tema tem a condição que explica a variação ("por"): a raridade é uma condição especial do ambiente (estação,
  // temperatura, mineral, luz do céu, cor real da espécie), não só uma troca de cor. "novo": tema que mudou em relação à
  // imagem fixa que está no jogo; a imagem fixa daquela raridade tem de ser gerada de novo primeiro (ela vira a referência de cor).
  const RARIDADES = {
    fogo_fatuo: {
      epico: {
        nome: "Chama verde",
        en: "GREEN FLAME: emerald and lime-green fire instead of orange, dark green shadows, glowing yellow-green eyes",
        por: "queima perto de veios de cobre, que deixam a chama verde"
      },
      lendario: {
        nome: "Chama galáxia",
        en: "GALAXY FLAME: pale lavender, white and deep indigo-violet fire with tiny star-like specks, a cosmic glow",
        por: "só acende em noites de céu limpo e reflete as estrelas"
      }
    },
    dragao_gales: {
      epico: {
        nome: "Basalto",
        en: "BASALT: black cooled-lava scales with glowing orange cracks between them, smoke rising",
        por: "dorme dentro de vulcões: a lava esfriou nas escamas",
        novo: true
      },
      lendario: {
        nome: "Fogo azul",
        en: "BLUE FIRE: deep blue and white-hot cyan scales, blue flames instead of orange",
        por: "nasce no ponto mais quente da montanha, onde a chama fica azul",
        novo: true
      }
    },
    kitsune: {
      epico: {
        nome: "Raposa sombria",
        en: "SHADOW FOX: black-purple fur with violet fox-fire on the tails and ears",
        por: "a raposa do vazio (kūko) do folclore japonês"
      },
      lendario: {
        nome: "Raposa dourada",
        en: "GOLDEN FOX: golden-yellow fur and tails, warm gold glow, small red accents",
        por: "a raposa celeste (tenko), que viveu mil anos"
      }
    },
    ifrit: {
      epico: {
        nome: "Chama azul",
        en: "BLUE FLAME: royal-blue and cyan fire body and smoke",
        por: "chama mais quente que a normal"
      },
      lendario: {
        nome: "Areia dourada",
        en: "GOLDEN SAND: pale gold, cream and white smoke body with gold ornaments",
        por: "nasce numa tempestade de areia do deserto"
      }
    },
    domovoi: {
      epico: {
        nome: "Brasa",
        en: "EMBER: darker coal-brown body with glowing red-orange embers and hot cracks",
        por: "lareira que nunca se apaga"
      },
      lendario: {
        nome: "Cinza clara",
        en: "PALE ASH: light cream and ash-white beard and fur with gold accents",
        por: "lareira centenária: sobraram cinzas mornas"
      }
    },
    fenix: {
      epico: {
        nome: "Fênix sombria",
        en: "DARK PHOENIX: black and crimson feathers with a red glow",
        por: "acabou de renascer, ainda coberta de carvão"
      },
      lendario: {
        nome: "Fênix de gelo",
        en: "ICE PHOENIX: white and icy-blue feathers with a frost glow",
        por: "renasceu na neve e a chama ficou fria"
      }
    },
    quimera: {
      epico: {
        nome: "Estátua de bronze",
        en: "ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue",
        por: "dormiu séculos em ruínas e virou estátua"
      },
      lendario: {
        nome: "Chamas eternas",
        en: "ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow",
        por: "vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios",
        novo: true
      }
    },
    long: {
      epico: {
        nome: "Koi Asagi",
        en: "ASAGI KOI: blue-grey scales with a net-like pattern, orange-red belly and fins",
        por: "carpa de lagos frios de montanha",
        novo: true
      },
      lendario: {
        nome: "Koi Tancho",
        en: "TANCHO KOI: pure white scales with one round red mark on top of the head, gold whiskers",
        por: "a carpa rara que nasce com o sol vermelho na cabeça",
        novo: true
      }
    },
    draugr: {
      epico: {
        nome: "Verde fantasma",
        en: "GHOSTLY SEA-GREEN: dark teal body with a sea-green ghostly glow",
        por: "afogado num mar de algas"
      },
      lendario: {
        nome: "Geleira",
        en: "GLACIAL: bright ice-blue and white frost all over",
        por: "afogado num mar congelado"
      }
    },
    jotunn: {
      epico: {
        nome: "Degelo",
        en: "MELTING ICE: translucent clear ice with dripping water, darker wet blue, droplets falling",
        por: "o gelo começa a derreter na primavera",
        novo: true
      },
      lendario: {
        nome: "Gelo aurora",
        en: "AURORA ICE: pale ice with an iridescent opal sheen (soft rainbow reflections)",
        por: "nasce sob a aurora boreal"
      }
    },
    kappa: {
      epico: {
        nome: "Tartaruga-de-pente",
        en: "HAWKSBILL: amber shell with a marbled brown-and-gold tortoiseshell pattern, olive-green skin",
        por: "casco âmbar marmorizado, como a tartaruga-de-pente dos recifes",
        novo: true
      },
      lendario: {
        nome: "Albino",
        en: "ALBINO: pale cream-yellow skin and shell, light red eyes, almost white",
        por: "nasce sem cor, como as tartarugas albinas raras",
        novo: true
      }
    },
    iara: {
      epico: {
        nome: "Rio escuro",
        en: "DARK RIVER: dark brown-black tail and water (like the Rio Negro) with silver accents",
        por: "rios de água preta, como o Rio Negro"
      },
      lendario: {
        nome: "Pôr do sol",
        en: "SUNSET: orange-red and gold tail and warm sunset-colored water",
        por: "aparece quando o sol se põe no rio"
      }
    },
    leviata: {
      epico: {
        nome: "Abismo",
        en: "ABYSSAL: dark navy blue with bright blue highlights",
        por: "vive na fossa mais funda"
      },
      lendario: {
        nome: "Pérola",
        en: "PEARL: white and pale lavender scales with a pearly sheen",
        por: "cresceu dentro de uma ostra gigante"
      }
    },
    ahuizotl: {
      epico: {
        nome: "Jade escuro",
        en: "DARK JADE: green-black body with emerald highlights",
        por: "lagos de águas verdes e fundas"
      },
      lendario: {
        nome: "Leucístico",
        en: "LEUCISTIC: pale pink-white body like a leucistic axolotl, soft pink frills, dark eyes",
        por: "como o axolote branco dos lagos do México",
        novo: true
      }
    },
    amaru: {
      epico: {
        nome: "Barro vermelho",
        en: "RED CLAY: wet red-brown clay scales with dripping mud and small grass tufts",
        por: "sai das encostas de argila na estação das chuvas",
        novo: true
      },
      lendario: {
        nome: "Salar",
        en: "SALT FLAT: white salt-crystal scales with turquoise mineral veins and a mirror-like sheen",
        por: "vive no Salar de Uyuni, o deserto de sal dos Andes",
        novo: true
      }
    },
    mumia: {
      epico: {
        nome: "Musgo de tumba",
        en: "TOMB MOSS: olive-green aged bandages",
        por: "tumba úmida tomada pelo musgo"
      },
      lendario: {
        nome: "Obsidiana",
        en: "OBSIDIAN: dark brown-black bandages with bronze-gold accents",
        por: "embalsamada com betume escuro"
      }
    },
    ammit: {
      epico: {
        nome: "Pântano",
        en: "SWAMP: darker olive-green and brown",
        por: "vive nos pântanos do Nilo"
      },
      lendario: {
        nome: "Albino do Nilo",
        en: "ALBINO CROCODILE: white and pale cream scales, light red eyes, keep the golden collar",
        por: "crocodilo albino, raríssimo na natureza",
        novo: true
      }
    },
    gnomo: {
      epico: {
        nome: "Veio de ouro",
        en: "GOLD VEIN: gold nuggets and gold-flecked rock armor, golden pickaxe and lantern glow",
        por: "achou o filão de ouro da mina",
        novo: true
      },
      lendario: {
        nome: "Diamante aurora",
        en: "AURORA DIAMOND: clear diamond crystals with iridescent aurora reflections (soft pink, cyan and violet) on the armor, hat and beard",
        por: "achou o diamante mais raro do mundo, que reflete as cores da aurora",
        novo: true
      }
    },
    roc: {
      epico: {
        nome: "Prata de tempestade",
        en: "STORM SILVER: grey-blue and silver feathers",
        por: "voa acima das tempestades"
      },
      lendario: {
        nome: "Ouro branco",
        en: "WHITE GOLD: white feathers with gold",
        por: "plumagem leucística, quase branca"
      }
    },
    minotauro: {
      epico: {
        nome: "Vermelho sangue",
        en: "BLOOD RED: dark crimson and black fur, red cloth",
        por: "touro de arena, enfurecido"
      },
      lendario: {
        nome: "Touro branco",
        en: "WHITE BULL: pure white fur with a pearly sheen, gold-tipped horns and gold armor",
        por: "o touro branco que Poseidon mandou a Creta",
        novo: true
      }
    },
    medusa: {
      epico: {
        nome: "Esmeralda",
        en: "EMERALD: vivid emerald-green snakes and scales",
        por: "serpentes cor de esmeralda, a pedra preciosa verde"
      },
      lendario: {
        nome: "Diamante",
        en: "DIAMOND: snakes and scales of clear crystal with rainbow sparkles, as if she turned into a living gem",
        por: "o próprio olhar refletido a transformou em gema",
        novo: true
      }
    },
    banshee: {
      epico: {
        nome: "Lavanda",
        en: "TWILIGHT LAVENDER: periwinkle and lavender-blue ghostly body",
        por: "canta no crepúsculo"
      },
      lendario: {
        nome: "Aurora rosada",
        en: "ROSE DAWN: soft pink and peach ghostly glow",
        por: "canta ao amanhecer"
      }
    },
    saci: {
      epico: {
        nome: "Noite estrelada",
        en: "STARRY NIGHT: dark blue cap and whirlwind decorated with stars and crescent moons",
        por: "redemoinho de noite sem lua"
      },
      lendario: {
        nome: "Redemoinho dourado",
        en: "GOLDEN WHIRLWIND: golden cap and a golden tornado",
        por: "redemoinho de poeira do sertão ao sol"
      }
    },
    sereia: {
      epico: {
        nome: "Recife de coral",
        en: "CORAL REEF: coral pink and turquoise",
        por: "canta nos recifes de coral"
      },
      lendario: {
        nome: "Pérola e prata",
        en: "PEARL SILVER: white, silver and pale lavender",
        por: "canta sob a lua cheia"
      }
    },
    tengu: {
      epico: {
        nome: "Bordo de outono",
        en: "CRIMSON: red and pink-red feathers",
        por: "montanha de bordos vermelhos no outono"
      },
      lendario: {
        nome: "Neve da montanha",
        en: "MOUNTAIN SNOW: white and pale grey feathers dusted with snow, icy blue accents",
        por: "vive no pico nevado",
        novo: true
      }
    },
    harpia: {
      epico: {
        nome: "Tempestade",
        en: "STORM: dark grey-black feathers with golden lightning streaks",
        por: "nasce dentro das tempestades"
      },
      lendario: {
        nome: "Ouro",
        en: "GOLDEN: gold and cream feathers",
        por: "voa no pôr do sol"
      }
    },
    grifo: {
      epico: {
        nome: "Neve",
        en: "SNOW: silver-white body with pale blue wing tips",
        por: "faz o ninho nos picos nevados"
      },
      lendario: {
        nome: "Ouro solar",
        en: "SOLAR GOLD: gold body with red gem accents",
        por: "guarda o ouro das montanhas"
      }
    },
    ryu: {
      epico: {
        nome: "Tempestade índigo",
        en: "INDIGO STORM: deep indigo and violet scales with white lightning",
        por: "raios de tempestade noturna"
      },
      lendario: {
        nome: "Kohaku",
        en: "KOHAKU: white scales with red markings like a kohaku koi, gold accents",
        por: "como os raios vermelhos raros acima das nuvens"
      }
    },
    jiangshi: {
      epico: {
        nome: "Jade",
        en: "JADE: green robes and a jade-green glow",
        por: "enterrado com amuletos de jade"
      },
      lendario: {
        nome: "Ouro imperial",
        en: "IMPERIAL GOLD: golden robes",
        por: "um antigo general da corte"
      }
    },
    raiju: {
      epico: {
        nome: "Raio violeta",
        en: "VIOLET LIGHTNING: purple and violet fur and electricity (not pure magenta)",
        por: "o raio fica violeta nas tempestades mais fortes"
      },
      lendario: {
        nome: "Ouro",
        en: "GOLDEN: golden fur and golden sparks",
        por: "raio globular, a bola de luz rara"
      }
    },
    ciclope: {
      epico: {
        nome: "Cobre",
        en: "COPPER: copper and bronze metallic warm brown with an orange glow",
        por: "forja de cobre incandescente"
      },
      lendario: {
        nome: "Branco e ouro",
        en: "WHITE GOLD: cream-white fur and gold armor",
        por: "forjou os raios dos deuses"
      }
    },
    frankenstein: {
      epico: {
        nome: "Galvânico verde",
        en: "GREEN GALVANIC: glowing green heart and eyes, moss-green patches",
        por: "acordou com faíscas químicas verdes"
      },
      lendario: {
        nome: "Fogo de Santelmo",
        en: "ST. ELMO'S FIRE: steel-blue and white body wrapped in glowing electric-blue plasma, crackling sparks",
        por: "acordou numa tempestade, coberto de plasma azul",
        novo: true
      }
    },
    poraque: {
      epico: {
        nome: "Bioluminescente",
        en: "BIOLUMINESCENT: deep blue body with glowing cyan spots",
        por: "águas escuras e profundas"
      },
      lendario: {
        nome: "Ouro",
        en: "GOLDEN: golden electric eel with a warm glow",
        por: "carregado ao máximo, o corpo fica dourado"
      }
    },
    lobisomem: {
      epico: {
        nome: "Lobo vermelho",
        en: "CRIMSON WOLF: deep red and dark red fur",
        por: "como o lobo-vermelho, raro na natureza"
      },
      lendario: {
        nome: "Lobo da neve",
        en: "SNOW WOLF: white and pale grey fur with icy blue accents",
        por: "como o lobo do Ártico"
      }
    },
    curupira: {
      epico: {
        nome: "Outono",
        en: "AUTUMN: clothes of orange, amber and gold autumn leaves, falling autumn leaves, fiery orange hair",
        por: "a mata no outono"
      },
      lendario: {
        nome: "Inverno",
        en: "WINTER: frosty pale-blue and white, icy white-blue hair, frosted leaf clothes, snowflakes",
        por: "a mata coberta de geada"
      }
    },
    mandragora: {
      epico: {
        nome: "Beladona violeta",
        en: "VIOLET NIGHTSHADE: purple and lavender leaves and body",
        por: "floresce à noite"
      },
      lendario: {
        nome: "Raiz dourada",
        en: "GOLDEN ROOT: golden-yellow body and leaves with cream flowers",
        por: "raiz centenária"
      }
    },
    kodama: {
      epico: {
        nome: "Sakura (ipê rosa)",
        en: "SAKURA: soft pink blossoms all over (pink ipê and cherry blossom), pink petals",
        por: "primavera"
      },
      lendario: {
        nome: "Ipê amarelo",
        en: "GOLDEN IPÊ: golden-yellow blossoms all over (yellow ipê), golden petals",
        por: "fim do inverno, quando o ipê amarelo floresce"
      }
    },
    boto: {
      epico: {
        nome: "Boto azul",
        en: "BLUE: blue-grey river dolphin with blue accents; keep the white hat",
        por: "como o tucuxi, o boto cinza-azulado"
      },
      lendario: {
        nome: "Boto branco",
        en: "PEARL WHITE: white and cream with gold accents, like the white suit of the enchanted Boto; keep the white hat",
        por: "a roupa branca do Boto encantado"
      }
    },
    escorpiao_homem: {
      epico: {
        nome: "Sangue",
        en: "BLOOD: crimson and black carapace",
        por: "melânico, do deserto vulcânico"
      },
      lendario: {
        nome: "Fluorescente",
        en: "FLUORESCENT: dark carapace glowing bright cyan-green like a scorpion under ultraviolet moonlight",
        por: "escorpiões brilham sob a luz ultravioleta da lua",
        novo: true
      }
    },
    serpente_emplumada: {
      epico: {
        nome: "Espelho fumegante",
        en: "SMOKING MIRROR (corrupted): obsidian-black feathers with jade-green and dull gold accents, a faint smoky aura",
        por: "corrompida por Tezcatlipoca, o deus do espelho de obsidiana que derrubou Quetzalcóatl",
        novo: true
      },
      lendario: {
        nome: "Estrela da manhã",
        en: "MORNING STAR (Venus): silver-white feathers glowing with pale blue starlight, a radiant star on the crest",
        por: "a forma mais pura: Quetzalcóatl é Vênus, a estrela da manhã",
        novo: true
      }
    },
    qilin: {
      epico: {
        nome: "Eclipse",
        en: "ECLIPSE (fallen): dark navy body, its light dimmed to a thin golden corona around the mane and horns",
        por: "o qilin caído: a luz dele apagou e sobrou só a coroa do eclipse",
        novo: true
      },
      lendario: {
        nome: "Jade celestial",
        en: "CELESTIAL JADE: white-jade body with a soft green-white glow, gold hooves and horns, pure light",
        por: "o mais puro: só aparece em tempos de paz, como na lenda",
        novo: true
      }
    },
    fada: {
      epico: {
        nome: "Luar",
        en: "MOONLIGHT: silver, lavender and pale blue",
        por: "presa à luz refletida da lua"
      },
      lendario: {
        nome: "Opala",
        en: "OPAL: rainbow-iridescent wings and soft pastel pinks",
        por: "carrega o espectro inteiro da luz, como um prisma"
      }
    },
    simurgh: {
      epico: {
        nome: "Pavão",
        en: "PEACOCK: teal-green peacock feathers",
        por: "a luz quebrada nas cores do pavão"
      },
      lendario: {
        nome: "Branco e safira",
        en: "WHITE GOLD: white and gold feathers with sapphire-blue eye spots",
        por: "a ave mais antiga, de luz pura"
      }
    },
    anjo: {
      epico: {
        nome: "Anjo caído",
        en: "DARK SERAPH: dark navy and bronze-orange armor and wings",
        por: "caiu do céu e a luz escureceu na armadura"
      },
      lendario: {
        nome: "Ouro radiante",
        en: "RADIANT: gold and white with a strong glow",
        por: "a luz mais pura, sem sombra nenhuma"
      }
    },
    esfinge: {
      epico: {
        nome: "Lápis-lazúli",
        en: "LAPIS: royal blue and gold, Egyptian style",
        por: "guarda o deserto à luz da lua"
      },
      lendario: {
        nome: "Ouro puro",
        en: "PURE GOLD: all gold",
        por: "a luz pura do sol do meio-dia"
      }
    },
    vampiro: {
      epico: {
        nome: "Azul meia-noite",
        en: "MIDNIGHT BLUE: dark blue cloak, bluish tones and blue magic",
        por: "frio: noite de inverno"
      },
      lendario: {
        nome: "Carmesim de cabelo branco",
        en: "CRIMSON: red cloak and silver-white hair",
        por: "lua de sangue"
      }
    },
    pirata_fantasma: {
      epico: {
        nome: "Mar gelado",
        en: "FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow",
        por: "naufragou no mar congelado: a chama fantasma esfriou",
        novo: true
      },
      lendario: {
        nome: "Navio em chamas",
        en: "INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes",
        por: "o navio pegou fogo: a chama fantasma virou infernal",
        novo: true
      }
    },
    cacada_selvagem: {
      epico: {
        nome: "Caçada de fogo",
        en: "FIRE HUNT: orange and red flames instead of the green ghost fire, ember-dark bodies",
        por: "caça nas noites quentes"
      },
      lendario: {
        nome: "Caçada de gelo",
        en: "ICE HUNT: icy-blue and white frost ghost fire, pale bodies",
        por: "caça no inverno mais frio"
      }
    },
    cerbero: {
      epico: {
        nome: "Fogo do inferno",
        en: "HELLFIRE: dark red fur with orange-red flames",
        por: "o portão mais quente do submundo"
      },
      lendario: {
        nome: "Chama azul",
        en: "WHITE AND BLUE: cream-white fur with blue flames and gold armor",
        por: "a chama fria do submundo"
      }
    },
    fomoriano: {
      epico: {
        nome: "Abismo azul",
        en: "ABYSS BLUE: deep blue body",
        por: "mar profundo e escuro"
      },
      lendario: {
        nome: "Osso",
        en: "BONE: pale ivory and white body",
        por: "virou fóssil no fundo do mar"
      }
    },
    morcego: {
      epico: {
        nome: "Carmesim",
        en: "CRIMSON: bright red wings and dark red fur",
        por: "como o morcego-vermelho"
      },
      lendario: {
        nome: "Rosa pálido",
        en: "PALE PINK: pinkish-white fur and pale pink wings",
        por: "albino, raríssimo"
      }
    }
  };
  // vale para todos os temas: a raridade tem de continuar parecendo rara e o elemento reconhecível
  const REGRA =
    "The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.";
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
