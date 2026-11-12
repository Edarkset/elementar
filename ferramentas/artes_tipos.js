// Tipos de arte do Elementar: o que o jogo espera de cada folha (grade, linhas onde o pé tem de ficar fixo, se é personagem).
// Usado pela conferência (testes/artes.js, no Node) e pela galeria (ferramentas/galeria.html, no navegador): uma tabela só.
// As especificações vêm de docs/PEDIDO_SPRITES.md.
// grades: [colunas, linhas]; linhas null = quantas couberem (células quadradas). le: false = formato novo que o código ainda não lê.
// personagem: confere linha do chão e transparência.
const TIPOS_ARTE = [
  {
    nome: "monstro (animação)",
    re: /^arte\/monstros\/[^/]+\/[^/]+__anim_\d+\.png$/,
    grades: [{ g: [6, 3] }],
    personagem: true,
    chao: [0, 1]
  },
  {
    nome: "monstro (imagem fixa)",
    re: /^arte\/monstros\/[^/]+\/[^/]+__(base|epico|lendario)\.png$/,
    grades: [{ g: [4, 2] }],
    personagem: true
  },
  {
    nome: "monstro (ações novas)",
    re: /^arte\/monstros\/[^/]+\/[^/]+__acoes_\d+\.png$/,
    grades: [{ g: [8, 4], le: false, nota: "folha de ações nova: o código ainda não usa (precisa ligar as habilidades a estas linhas)" }],
    personagem: true
  },
  { nome: "monstro (retrato)", re: /^arte\/monstros\/.*__retrato\.png$/, grades: null },
  { nome: "dragão ancestral (base)", re: /^arte\/lendarios\/[^/]+__base\.png$/, grades: [{ g: [5, 1] }], personagem: true },
  { nome: "dragão ancestral (eclosão)", re: /^arte\/lendarios\/[^/]+__eclosao\.png$/, grades: [{ g: [6, 1] }], personagem: true },
  {
    nome: "dragão ancestral (animação)",
    re: /^arte\/lendarios\/[^/]+__anim_\d+\.png$/,
    grades: [{ g: [6, 3] }],
    personagem: true,
    chao: [0, 1]
  },
  { nome: "Lenda / deus (retrato)", re: /^arte\/(lendas|panteao)\/[^/]+__retrato\.png$/, grades: null },
  { nome: "Lenda / deus", re: /^arte\/(lendas|panteao)\/[^/]+\.png$/, grades: [{ g: [6, 3] }], personagem: true, chao: [0, 1] },
  {
    nome: "inimigos do reino",
    re: /^arte\/reinos\/[^/]+\/[^/]+__inimigos\.png$/,
    grades: [
      { g: [8, 6] },
      {
        g: [8, 9],
        le: false,
        nota: "folha nova de 9 linhas: o código ainda lê 8×6 (09_criaturas.ts, celulaArte(img, 8, 6...)); ajustar ao trocar"
      }
    ],
    personagem: true,
    chao: [0, 2, 4]
  },
  { nome: "mini-chefe", re: /^arte\/reinos\/[^/]+\/[^/]+__mini\.png$/, grades: [{ g: [6, 5] }], personagem: true, linhasExtras: true },
  { nome: "chefe", re: /^arte\/reinos\/[^/]+\/[^/]+__chefe\.png$/, grades: [{ g: [6, 6] }], personagem: true, linhasExtras: true },
  {
    nome: "Guardião da Era",
    re: /^arte\/reinos\/[^/]+\/guardiao_[^/]+__anim\.png$/,
    grades: [{ g: [6, 6] }],
    personagem: true,
    linhasExtras: true
  },
  { nome: "efeitos de chefe", re: /^arte\/reinos\/[^/]+\/[^/]+__efeitos\.png$/, grades: [{ g: [8, 2] }] },
  { nome: "marcos e plantas", re: /^arte\/reinos\/[^/]+\/[^/]+__props\.png$/, grades: [{ g: [4, 2] }] },
  { nome: "peças grandes", re: /^arte\/reinos\/[^/]+\/[^/]+__pecas\.png$/, grades: [{ g: [2, 2] }] },
  { nome: "paredão do abismo", re: /^arte\/reinos\/[^/]+\/[^/]+__paredao\.png$/, grades: [{ g: [4, 2] }] },
  { nome: "objetos de quebrar", re: /^arte\/reinos\/[^/]+\/[^/]+__objetos\.png$/, grades: [{ g: [8, null] }] },
  { nome: "fauna", re: /^arte\/reinos\/[^/]+\/[^/]+__fauna\.png$/, grades: [{ g: [8, 2] }] },
  { nome: "ladrilhos e enfeites", re: /^arte\/reinos\/[^/]+\/[^/]+__tiles\.png$/, grades: [{ g: [8, 3] }] },
  { nome: "piso, fundo e arte de abertura", re: /^arte\/reinos\/[^/]+\/[^/]+__(piso|fundo|keyart)\.png$/, grades: null },
  { nome: "superfície do chão", re: /^arte\/ambiente\/[^/]+\.png$/, grades: [{ g: [8, 2] }] },
  { nome: "reação elemental", re: /^arte\/efeitos\/reacao__[^/]+\.png$/, grades: [{ g: [6, 1] }] },
  { nome: "especial de classe", re: /^arte\/efeitos\/especial__[^/]+\.png$/, grades: [{ g: [8, 1] }] },
  { nome: "combinado", re: /^arte\/efeitos\/combinado__[^/]+\.png$/, grades: [{ g: [10, 1] }] },
  {
    nome: "herói (novo)",
    re: /^arte\/heroi\/invocador__anim\.png$/,
    grades: [{ g: [8, 7], le: false, nota: "herói novo: o código ainda desenha o Invocador por código" }],
    personagem: true
  },
  {
    nome: "ovo (novo)",
    re: /^arte\/ovos\/ovo__[^/]+\.png$/,
    grades: [{ g: [8, 3], le: false, nota: "ovos novos: o código ainda desenha os ovos por código" }],
    personagem: true
  },
  {
    nome: "baús e coletáveis (novo)",
    re: /^arte\/itens\/(baus|coletaveis)\.png$/,
    grades: [{ g: [8, 4], le: false, nota: "folha nova: o código ainda não usa" }]
  },
  { nome: "imagem avulsa", re: /^arte\/(itens|ui|heroi)\//, grades: null }
];
if (typeof module !== "undefined") module.exports = TIPOS_ARTE;
