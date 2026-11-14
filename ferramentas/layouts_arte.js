// Formatos das folhas de arte do Elementar: uma tabela só, usada pelo pacote de prompts (gerar_prompts.js), pelos moldes
// (gerar_moldes.js) e pela página de conferência das imagens geradas (conferir_artes.html).
// Cada formato: tela que o gerador entrega, grade, o que vai em cada linha (para o molde), o tipo de conferência e como
// reconhecer o arquivo pelo nome.
//   tipo: "personagem" (pés na linha, mesmo tamanho, um só desenho por quadro, quadro estranho = mistura)
//         "efeito" (só grade e bordas), "cenario" (grade e bordas), "opaco" (sem transparência; confere a emenda)
//   grupos: como comparar as cores dos quadros para achar um quadro misturado de outra imagem:
//         "folha" = todos os quadros são o mesmo personagem; "pares" = cada 2 linhas um personagem (inimigos);
//         "linha" = cada linha um personagem; null = não compara (cada quadro é uma coisa diferente)
(function () {
  const L = [
    {
      id: "monstro_base",
      nome: "Monstro: animação (base, Épico ou Lendário)",
      W: 1536,
      H: 1024,
      C: 6,
      R: 3,
      linhas: ["Parado (ciclo)", "Andando (ciclo)", "Ataque"],
      tipo: "personagem",
      grupos: "folha",
      re: /__anim_\d+(__(epico|lendario))?\.png$/i
    },
    {
      id: "monstro_acoes",
      nome: "Monstro: ações",
      W: 1536,
      H: 1024,
      C: 6,
      R: 4,
      linhas: ["Habilidade 1", "Habilidade 2 / golpe final", "Dor (2) + comemora (4)", "Jeito (4) + nocaute (2)"],
      tipo: "personagem",
      grupos: "folha",
      re: /__acoes_\d+\.png$/i
    },
    {
      id: "ancestral_base",
      nome: "Dragão ancestral: 5 formas",
      W: 1536,
      H: 1024,
      C: 5,
      R: 1,
      linhas: ["Ovo · Filhote · Jovem · Adulto · Supremo"],
      tipo: "personagem",
      grupos: null,
      re: /(lendarios[\\/]|^)(dragao_solar|mariposa_vazio|arvore_dragao|dragao_cristal|dragao_mares|dragao_vulcanico|dragao_celeste|passaro_trovao)__base\.png$/i
    },
    {
      id: "monstro_fixa",
      nome: "Monstro: imagem fixa das 8 formas",
      W: 1536,
      H: 1024,
      C: 4,
      R: 2,
      linhas: ["Filhote · Jovem · Adulto A · Adulto B", "Adulto C · Supremo A · Supremo B · Supremo C"],
      tipo: "personagem",
      grupos: null,
      re: /monstros[\\/].*__(base|epico|lendario)\.png$|^[a-z_]+__(base|epico|lendario)\.png$/i
    },
    {
      id: "ancestral_eclosao",
      nome: "Dragão ancestral: ovo chocando",
      W: 1536,
      H: 1024,
      C: 6,
      R: 1,
      linhas: ["Ovo → rachando → estoura → filhote"],
      tipo: "personagem",
      grupos: null,
      re: /__eclosao\.png$/i
    },
    {
      id: "lenda",
      nome: "Lenda ou deus",
      W: 1536,
      H: 1024,
      C: 6,
      R: 3,
      linhas: ["Parado (ciclo)", "Andando (ciclo)", "Lançando o poder"],
      tipo: "personagem",
      grupos: "folha",
      re: /(lendas|panteao)[\\/][a-z_]+\.png$/i
    },
    {
      id: "inimigos",
      nome: "Inimigos do reino (3 tipos)",
      W: 1536,
      H: 1024,
      C: 8,
      R: 6,
      linhas: [
        "Inimigo 1: parado 2 · anda 4 · ataque 2",
        "Inimigo 1: dor 1 · morte 4 · mania 3",
        "Inimigo 2: parado 2 · anda 4 · ataque 2",
        "Inimigo 2: dor 1 · morte 4 · mania 3",
        "Inimigo 3: parado 2 · anda 4 · ataque 2",
        "Inimigo 3: dor 1 · morte 4 · mania 3"
      ],
      tipo: "personagem",
      grupos: "pares",
      re: /__inimigos\.png$/i
    },
    {
      id: "mini",
      nome: "Mini-chefe",
      W: 1536,
      H: 1024,
      C: 6,
      R: 5,
      linhas: ["Parado (ciclo)", "Andando (ciclo)", "Golpe 1", "Golpe 2", "Morte"],
      tipo: "personagem",
      grupos: "folha",
      re: /__mini\.png$/i
    },
    {
      id: "chefe",
      nome: "Chefe do reino",
      W: 1024,
      H: 1024,
      C: 6,
      R: 6,
      linhas: ["Parado (ciclo)", "Andando (ciclo)", "Golpe 1", "Golpe 2", "Fase 2", "Morte"],
      tipo: "personagem",
      grupos: "folha",
      re: /__chefe\.png$/i
    },
    {
      id: "guardiao",
      nome: "Guardião da Era",
      W: 1024,
      H: 1024,
      C: 6,
      R: 6,
      linhas: ["Parado (ciclo)", "Andando (ciclo)", "Golpe 1", "Golpe 2", "Golpe 3", "Morte"],
      tipo: "personagem",
      grupos: "folha",
      re: /guardiao_[a-z_]+__anim\.png$/i
    },
    {
      id: "efeitos_chefe",
      nome: "Efeitos do chefe",
      W: 1536,
      H: 1024,
      C: 8,
      R: 2,
      linhas: ["Golpe 1: voando 4 · impacto 4", "Golpe 2: voando 4 · impacto 4"],
      tipo: "efeito",
      grupos: null,
      re: /^(?!.*guardiao_).*__efeitos\.png$/i
    },
    {
      id: "efeitos_guardiao",
      nome: "Efeitos do Guardião",
      W: 1536,
      H: 1024,
      C: 8,
      R: 3,
      linhas: ["Golpe 1: voando 4 · impacto 4", "Golpe 2: voando 4 · impacto 4", "Golpe 3: voando 4 · impacto 4"],
      tipo: "efeito",
      grupos: null,
      re: /guardiao_[a-z_]+__efeitos\.png$/i
    },
    {
      id: "props",
      nome: "Marcos, luz e primeiro plano",
      W: 1536,
      H: 1024,
      C: 4,
      R: 2,
      linhas: ["Marco 1 · Marco 2 · Marco 3 · Marco 4", "Marco 5 · Marco 6 · Luz · Primeiro plano"],
      tipo: "cenario",
      grupos: null,
      re: /__props\.png$/i
    },
    {
      id: "tiles",
      nome: "Chão: peças, manchas e enfeites",
      W: 1536,
      H: 1024,
      C: 8,
      R: 3,
      linhas: ["8 peças de chão (cheias, opacas)", "8 manchas", "8 enfeites soltos"],
      tipo: "cenario",
      grupos: null,
      cheias: [0],
      re: /__tiles\.png$/i
    },
    {
      id: "objetos",
      nome: "Objetos de quebrar",
      W: 1536,
      H: 1024,
      C: 8,
      R: 3,
      linhasVariaveis: true,
      linhas: ["Objeto: inteiro · trincado · quebrado · especial · 4 cacos"],
      tipo: "personagem",
      grupos: "linha",
      re: /__objetos\.png$/i
    },
    {
      id: "fauna",
      nome: "Fauna de ambiente",
      W: 1536,
      H: 1024,
      C: 8,
      R: 2,
      linhas: ["Ave voando 4 · inseto 4", "Peixe nadando 4 · bicho: parado, sobe, alto, cai"],
      tipo: "cenario",
      grupos: null,
      re: /__fauna\.png$/i
    },
    {
      id: "pecas",
      nome: "Peças grandes",
      W: 1024,
      H: 1024,
      C: 2,
      R: 2,
      linhas: ["Praça (redonda) · Lago (redondo)", "Construção · PONTE DEITADA (esquerda → direita)"],
      tipo: "cenario",
      grupos: null,
      re: /__pecas\.png$/i
    },
    {
      id: "paredao",
      nome: "Paredão do abismo",
      W: 1536,
      H: 1024,
      C: 4,
      R: 2,
      linhas: ["4 pedaços de paredão (emendam lado a lado)", "4 pedaços com cachoeira (emendam lado a lado)"],
      tipo: "cenario",
      grupos: null,
      re: /__paredao\.png$/i
    },
    {
      id: "piso",
      nome: "Piso ou fundo (textura que se repete)",
      W: 1024,
      H: 1024,
      C: 1,
      R: 1,
      linhas: ["textura emendável nos 4 lados"],
      tipo: "opaco",
      grupos: null,
      re: /__(piso|fundo)\.png$/i
    },
    {
      id: "icone",
      nome: "Ícone único (relíquia)",
      W: 1024,
      H: 1024,
      C: 1,
      R: 1,
      linhas: ["um ícone no centro"],
      tipo: "cenario",
      grupos: null,
      re: /reliquias[\\/][a-z_]+\.png$/i
    },
    {
      id: "heroi",
      nome: "Herói (Invocador)",
      W: 1536,
      H: 1024,
      C: 6,
      R: 4,
      linhas: ["Parado (ciclo)", "Andando (ciclo)", "Comando com a espada", "Dor (2) + vitória (4)"],
      tipo: "personagem",
      grupos: "folha",
      re: /invocador__anim\.png$/i
    },
    {
      id: "ovo",
      nome: "Ovo (3 raridades)",
      W: 1536,
      H: 1024,
      C: 6,
      R: 3,
      linhas: [
        "Comum: balança 3 · racha 2 · estoura 1",
        "Raro: balança 3 · racha 2 · estoura 1",
        "Lendário: balança 3 · racha 2 · estoura 1"
      ],
      tipo: "personagem",
      grupos: "linha",
      re: /ovo__[a-z]+\.png$/i
    },
    {
      id: "baus",
      nome: "Baús (4 raridades)",
      W: 1536,
      H: 1024,
      C: 6,
      R: 4,
      linhas: ["Madeira", "Prata", "Ouro", "Lendário (cristal)"],
      tipo: "personagem",
      grupos: "linha",
      re: /baus\.png$/i
    },
    {
      id: "coletaveis",
      nome: "Coletáveis",
      W: 1536,
      H: 1024,
      C: 8,
      R: 4,
      linhas: ["Cristais de XP", "Moeda girando", "Coração 4 · estrela 4", "Essência 4 · chave 4"],
      tipo: "efeito",
      grupos: null,
      re: /coletaveis\.png$/i
    },
    {
      id: "efeitos_elemento",
      nome: "Efeitos de um elemento",
      W: 1536,
      H: 1024,
      C: 8,
      R: 4,
      linhas: ["Faísca de impacto", "Projétil", "Explosão no chão", "Poder do Elemento"],
      tipo: "efeito",
      grupos: null,
      re: /elemento__[a-z]+\.png$/i
    },
    {
      id: "efeitos_classe",
      nome: "Efeitos de uma classe",
      W: 1536,
      H: 1024,
      C: 8,
      R: 3,
      linhas: ["Ataque básico", "Habilidade 1", "Habilidade 2"],
      tipo: "efeito",
      grupos: null,
      re: /classe__[a-z]+\.png$/i
    },
    {
      id: "especial",
      nome: "Especial (tira de 8)",
      W: 1536,
      H: 1024,
      C: 8,
      R: 1,
      linhas: ["surge · cresce · pico · some"],
      tipo: "efeito",
      grupos: null,
      re: /especial__[a-z]+_\d\.png$/i
    },
    {
      id: "combinado",
      nome: "Combinado (tira de 10)",
      W: 1536,
      H: 1024,
      C: 10,
      R: 1,
      linhas: ["surge · cresce · pico · some"],
      tipo: "efeito",
      grupos: null,
      re: /combinado__[a-z_]+\.png$/i
    },
    {
      id: "icones",
      nome: "Ícones (4 × 2)",
      W: 1536,
      H: 1024,
      C: 4,
      R: 2,
      linhas: ["ícones 1 a 4", "ícones 5 a 8"],
      tipo: "efeito",
      grupos: null,
      re: /ui[\\/]elementais\.png$|^elementais\.png$/i
    }
  ];
  // objetos de quebrar: uma linha por objeto do reino (conferido contra js/dados.js por gerar_prompts.js --conferir)
  const OBJETOS = {
    egito: 3,
    grecia: 3,
    mesopotamia: 4,
    china: 5,
    persia: 3,
    nordico: 4,
    celta: 4,
    tavola: 5,
    japao: 5,
    eslavo: 6,
    mil_noites: 3,
    amazonia: 5,
    xibalba: 2,
    tenochtitlan: 3,
    andes: 2,
    polinesia: 3,
    cabo_tormentas: 4,
    caribe: 4,
    mar_profundo: 3,
    transilvania: 5,
    laboratorio: 4,
    floresta_negra: 4,
    atlantida: 3,
    eldorado: 4,
    shangrila: 5,
    centro_terra: 3,
    reino_fogo: 6,
    reino_agua: 6,
    reino_terra: 5,
    reino_ar: 8,
    reino_raio: 5,
    reino_natureza: 7,
    reino_luz: 6,
    reino_sombra: 5
  };
  /** linhas da folha: fixas, ou (objetos) uma por objeto do reino tirado do nome do arquivo */
  function linhasDe(lay, nome) {
    if (!lay.linhasVariaveis) return lay.R;
    const m = /([a-z_]+)__objetos\.png$/i.exec(nome || "");
    return (m && OBJETOS[m[1].toLowerCase()]) || lay.R;
  }
  const API = {
    LAYOUTS: L,
    OBJETOS,
    linhasDe,
    porId: id => L.find(x => x.id === id),
    doArquivo: nome => L.find(x => x.re.test(nome)) || null
  };
  if (typeof module !== "undefined") module.exports = API;
  else window.LAYOUTS_ARTE = API;
})();
