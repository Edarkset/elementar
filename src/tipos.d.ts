// Elementar · formas centrais do jogo, para o verificador de tipos (npm run tipos).
// Este arquivo não é carregado pelo navegador: só descreve o que o código em js/ já faz.
// Regra: campo novo em R (a run), J (o mapa), num Selo ou num inimigo entra aqui primeiro. Se o código usar um
// campo que não está listado, o verificador acusa: é assim que erro de digitação e campo esquecido aparecem antes de publicar.

/** Dívida de tipagem contada: estrutura que ainda não foi descrita. `grep -o AindaSemTipo src/tipos.d.ts | wc -l` diz quanto falta. */
type AindaSemTipo = any;

type Elemento = "fogo" | "agua" | "terra" | "ar" | "raio" | "natureza" | "luz" | "sombra";
type Raridade = "comum" | "incomum" | "raro" | "epico" | "lendario";
type Classe = "guardiao" | "guerreiro" | "assassino" | "cacador" | "mago" | "invocador" | "mistico" | "xama";
/** origem do dano corrente (R.st.porFonte) */
type FonteDano = "basico" | "habilidade" | "especial" | "combinado" | "despertar" | "reacao" | "ambiente" | "reliquia" | "lenda";
type ChavePoder = "b" | "h1" | "h2";
type Ponto = { x: number; y: number };

// ---------------------------------------------------------------- navegador e plataforma
interface PlataformaJogo {
  nome?: string;
  lerSave(chave: string): string | null;
  gravarSave(chave: string, texto: string): boolean | void;
  conquista(id: string): void;
  sair?: (() => void) | null;
}
interface Window {
  Plataforma?: PlataformaJogo;
  /** exposto pelo preload do Electron (versão de computador/Steam) */
  ElementarNativo?: {
    nome?: string;
    lerSave(chave: string): string | null;
    gravarSave(chave: string, texto: string): void;
    conquista?(id: string): void;
    sair?(): void;
  };
  ARTE_MANIFESTO?: string;
  webkitAudioContext?: typeof AudioContext;
}
interface Navigator {
  standalone?: boolean;
}

// ---------------------------------------------------------------- arte
/** de onde um recorte veio no arquivo original (para refazer em alta resolução) */
interface OrigemRecorte {
  img: Imagem;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dest?: number[];
}
/** marcas que o jogo pendura em imagens e recortes (etapa 1 do plano: virar um tipo Sprite próprio) */
interface MarcasDeArte {
  _id?: number;
  _src?: OrigemRecorte;
  _hi?: HTMLCanvasElement;
  hi?: HTMLCanvasElement;
  hiK?: number;
  _suave?: boolean;
  _ky?: number;
  /** fração da altura onde fica o pé do desenho */ base?: number;
  _pe?: number;
  _alvo?: number;
  pronta?: boolean;
  falhou?: boolean;
  valida?: boolean;
  _quadros?: AindaSemTipo;
  _geo?: AindaSemTipo;
  /** piso espelhado: quem usa dobra o tamanho */ _espelho?: boolean;
  mundoW?: number;
  mundoH?: number;
}
interface HTMLCanvasElement extends MarcasDeArte {
  complete?: boolean;
}
interface HTMLImageElement extends MarcasDeArte {}
type Imagem = HTMLCanvasElement | HTMLImageElement;
/** valores que a interface guarda no próprio elemento para só mexer na página quando mudam */
interface HTMLElement {
  _v?: number;
  _u?: boolean;
  _escolhendo?: boolean;
}

// ---------------------------------------------------------------- conteúdo (js/dados.js). O esquema completo dos dados é a etapa 3 do plano
/** uma linha evolutiva de monstro (D.linhas e D.ancestrais) */
interface Linha {
  id: string;
  elemento: Elemento;
  classe: Classe;
  filhote: string;
  ancestral?: boolean;
  [resto: string]: AindaSemTipo;
}
/** um reino (D.universos) */
interface Universo {
  id: string;
  nome: string;
  era: string;
  elemento: Elemento;
  chefe: string;
  mini_chefe: string;
  combate?: AindaSemTipo;
  /** luz do mapa (noite, cor do céu) */ luz?: AindaSemTipo;
  [resto: string]: AindaSemTipo;
}

// ---------------------------------------------------------------- monstros, Selos e a run
interface Monstro {
  id: string;
  rar: Raridade;
  ramo: number | null;
  nivel?: number;
  supremo?: boolean;
}
interface Selo {
  nivel: number;
  pod: Record<ChavePoder, number>;
  mod: { h1: number | null; h2: number | null };
  esp: number | null;
  mon: Monstro | null;
  trocaCd: number;
  /** caminhos da Ascensão já escolhidos (ASCENSAO em 03_progressao.js) */ asc?: { d: number; c: number; v: number } | null;
  desp?: Partial<Record<ChavePoder, AindaSemTipo>>;
  // posição e relógios no mapa
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  esq?: boolean;
  cd?: number;
  cd1?: number;
  cd2?: number;
  cdEsp?: number;
  tmpRamo?: number | null;
  furia?: number;
  furiaMod?: number | null;
  berserk?: number;
  // animação (05_arte.js)
  atkT?: number | null;
  _t0?: number;
  _row?: number | null;
  _ax?: number | null;
  _ay?: number | null;
  _at?: number | null;
  _td?: number | null;
  _tf?: number | null;
  _vel?: number;
  _vx?: number;
  _vy?: number;
  _px?: number;
  _py?: number;
  _pd?: number;
  _soloAnt?: string;
  _pop?: number;
  _prox?: HTMLCanvasElement | null;
  _mix?: number;
  [marcaDeAnimacao: `_${string}`]: AindaSemTipo;
}
interface OvoNinho {
  id: string;
  rar: Raridade;
  prog: number;
  alvo: number;
}
interface EstatisticasRun {
  porFonte: Partial<Record<FonteDano, number>>;
  especiais: number;
  combinados: number;
  transformacoes: number;
  dano: number;
  golpes: number;
  superEf: number;
  poucoEf: number;
  recContato: number;
  recBala: number;
  reacoes: Record<string, number>;
  ovos: number;
  chocados: number;
  capturas: number;
  trocas: number;
  itens: number;
  despertares: number;
  evolucoes: number[];
  mapas: AindaSemTipo[];
  primeiroAbate: number | null;
  ovoAncestral?: number;
  dragaoChocado?: number;
  talismas?: number;
  despertos?: number;
  mapaPrimeiroDesperto?: number | null;
  unioes?: number;
}
/** R: tudo o que vale para a run inteira (é o que vai para o save no meio da run) */
interface Run {
  pacto: Elemento[];
  selos: Selo[];
  reserva: Monstro[];
  ninho: OvoNinho[];
  ancestral: { estado: string; prog?: number; [k: string]: AindaSemTipo };
  itens: { incenso: number; chamado: number; doce: number; pedra: number; pena: number };
  pedraAtiva: boolean;
  profundidade: number;
  eraIdx: number;
  mapaNaEra: number;
  universo: string;
  reliquias: string[];
  chefesVencidos: number;
  ciclo: number;
  abates: number;
  /** abates ponderados pela intensidade da horda (base da Essência por abate) */ abatesPeso?: number;
  essenciaRun: number;
  elos: string[];
  vidaFrac: number;
  st?: EstatisticasRun;
  reviverMeta?: number;
  recordeAntes?: number;
  xp?: number;
  nivel?: number;
  rerolagens?: number;
  mods?: Record<string, number>;
  pressagio?: string;
  maldicoes?: string[];
  talismas?: Record<string, number>;
  unioes?: string[];
  lenda?: string | null;
  lendaNv?: number;
  lendaReviveu?: boolean;
  teste?: boolean;
  vistos?: AindaSemTipo;
  avisoFilhote?: boolean;
}
/** META: o que fica entre as runs (save permanente) */
interface Meta {
  essencia: number;
  recorde: number;
  liberados: string[];
  som?: { mudo?: boolean; [k: string]: AindaSemTipo };
  dex?: Record<string, AindaSemTipo>;
  dexMarco?: number;
  cont?: Record<string, number>;
  lendas?: AindaSemTipo;
  deuses?: AindaSemTipo;
  conq?: Record<string, number>;
  talismas?: AindaSemTipo;
  moderador?: boolean;
  modUsado?: boolean;
  loja?: Record<string, number>;
  escolhaManual?: boolean;
  dicaReacao?: boolean;
  diarias?: AindaSemTipo;
}
/** resultado de calcularSinergia(): multiplicadores da equipe */
interface Sinergia {
  dano: number;
  vida: number;
  cad: number;
  reac: number;
  chips: AindaSemTipo[];
  rm: AindaSemTipo;
  cacadores?: number;
  invocadores?: number;
  lendaPoder?: number;
}

// ---------------------------------------------------------------- o que existe no mapa
interface Inimigo extends Ponto {
  hp: number;
  max: number;
  v: number;
  r: number;
  esc?: number;
  dano: number;
  /** 0 rápido, 1 comum, 2 pesado, 9 chefe e mini-chefe */ tipo: number;
  el: Elemento;
  elite: boolean;
  chefe: boolean;
  mini: boolean;
  nome?: string;
  spr?: HTMLCanvasElement;
  cor?: string;
  status: { el: Elemento; t: number } | null;
  lenta: number;
  congela: number;
  cego: number;
  dot: number;
  dotT: number;
  reacCd: number;
  vulner: number;
  flash: number;
  marca: number;
  vx?: number;
  vy?: number;
  xpF?: number;
  def?: AindaSemTipo;
  tam?: number;
  ia?: AindaSemTipo;
  [campoDeCriatura: string]: AindaSemTipo;
}
interface Projetil extends Ponto {
  vx: number;
  vy: number;
  dano: number;
  el: Elemento;
  cor: string;
  vida: number;
  perf: number;
  r: number;
  fonte?: FonteDano;
  alvo?: Inimigo | null;
  vel?: number;
  explode?: number;
  ric?: number;
  bola?: boolean;
  ja?: Set<AindaSemTipo>;
  alvoProp?: AindaSemTipo;
  rastro?: number[][];
}
interface ZonaBase extends Ponto {
  r: number;
  cor: string;
  vida: number;
  fonte?: FonteDano;
  el?: Elemento;
  dano?: number;
  cd?: number;
}
type Zona =
  | (ZonaBase & { tipo: "circulo"; amp: number; puxa: boolean })
  | (ZonaBase & { tipo: "rastro" })
  | (ZonaBase & { tipo: "chuva"; segue?: boolean })
  | (ZonaBase & { tipo: "portal" })
  | (ZonaBase & { tipo: "espirito"; ang: number; el2: Elemento | null; cadeia: boolean });
interface Cria extends Ponto {
  dano: number;
  el: Elemento;
  cor: string;
  vida: number;
  cd: number;
  fonte?: FonteDano;
  kami?: boolean;
  guarda?: boolean;
  gigante?: boolean;
  alvoE?: Inimigo | null;
  tAlvo?: number;
}
interface Armadilha extends Ponto {
  dano: number;
  el: Elemento;
  cor: string;
  raiz: boolean;
  vida: number;
  fonte?: FonteDano;
}
interface Totem extends Ponto {
  dono: Selo;
  dano: number;
  el: Elemento;
  cor: string;
  vida: number;
  cd: number;
  grande?: boolean;
}
interface Gema extends Ponto {
  vx: number;
  vy: number;
  v: number;
  cor: string;
  voa?: number;
  puxar?: boolean;
  pega?: boolean;
}
interface Bala extends Ponto {
  vx: number;
  vy: number;
  vida: number;
  dano: number;
  [k: string]: AindaSemTipo;
}
interface Particula extends Ponto {
  vx: number;
  vy: number;
  vida: number;
  max: number;
  cor: string;
  tam: number;
  forma?: string;
  g?: number;
  giro?: number;
}
/** anel ou raio curto (J.efeitos) */
interface Efeito extends Ponto {
  r?: number;
  cor: string;
  vida: number;
  max: number;
  linha?: boolean;
  x2?: number;
  y2?: number;
}
/** efeito com desenho próprio (J.vfx); q vai de 0 a 1 */
interface Vfx {
  max: number;
  t?: number;
  camada?: "chao" | "frente" | "luz";
  desenhar(ox: number, oy: number, q: number): void;
}
/** peça grande do cenário, uma por zona do mapa (abismo, lago, praça, construção) */
interface PecaCenario extends Ponto {
  tipo: string;
  id: string;
  rx?: number;
  ry?: number;
  /** fases da borda irregular do abismo */ fs?: number[];
  ponte?: "h" | "v";
  criado?: boolean;
}
/** carta de nível antes de virar botão (cartasNivel) */
interface CartaNivel {
  peso: number;
  s: Selo;
  k?: ChavePoder;
  /** caminho da Ascensão */ asc?: "d" | "c" | "v";
  raridade: string;
  titulo: string;
  texto: string;
  dourada?: boolean;
}
interface DiretorHorda {
  mult: number;
  tick: number;
  respiro: number;
  tEvento: number;
  alvo: number;
  n: number;
  vida: number;
  eventos: number;
  ameaca: number;
  tCheia: number;
}

/** J: o mapa em andamento (recriado a cada mapa por iniciarMapa) */
interface Mapa {
  t: number;
  fim: boolean;
  jogador: Ponto;
  dir: Ponto;
  pvx: number;
  pvy: number;
  costas?: Ponto;
  camX?: number;
  camY?: number;
  // listas
  inimigos: Inimigo[];
  proj: Projetil[];
  balas: Bala[];
  crias: Cria[];
  totens: Totem[];
  gemas: Gema[];
  armadilhas: Armadilha[];
  zonas: Zona[];
  nums: AindaSemTipo[];
  textos: AindaSemTipo[];
  efeitos: Efeito[];
  parts: Particula[];
  ovosMapa: AindaSemTipo[];
  selvagens: AindaSemTipo[];
  fantasmas: AindaSemTipo[];
  perigos: AindaSemTipo[];
  golpes: AindaSemTipo[];
  cadaveres: AindaSemTipo[];
  falas: AindaSemTipo[];
  agenda: { t: number; fn: () => void }[];
  vfx?: Vfx[];
  flashes?: AindaSemTipo[];
  moedas?: AindaSemTipo[];
  baus?: AindaSemTipo[];
  quedas?: AindaSemTipo[];
  setas?: { ang: number; vida: number }[];
  sapos?: AindaSemTipo[];
  hidro?: number[];
  janelaAbates?: number[];
  // equipe
  vida: number;
  vidaMax: number;
  escudo: number;
  xp: number;
  nivel: number;
  xpProx: number;
  niveisPend: number;
  ult: number;
  desp: number;
  comb: number;
  combo: number;
  comboT: number;
  comboMax: number;
  cadeia?: number;
  tCadeia?: number;
  dashCd: number;
  dashT: number;
  invuln: number;
  buffCad: number;
  canto: number;
  fervor: number;
  reducao: number;
  renascer: number;
  regen: number;
  regenV?: number;
  regenMod?: number | null;
  grito: number;
  totemAnc: number;
  imparavel?: number;
  cantoGuerra?: number;
  atordoa?: number;
  reviver?: number;
  escudoGolpes?: number;
  fenix?: number;
  koschei?: boolean;
  curou?: boolean;
  danoRec?: number;
  atingidoNoChefe?: boolean;
  usouEsquiva?: boolean;
  deus?: boolean;
  // horda, chefe e relógios do mapa
  spawn: number;
  diretor?: DiretorHorda;
  miniFeito: boolean;
  chefeFeito: boolean;
  chefeVivo: Inimigo | null;
  eraChefe: boolean;
  tChefe: number | null;
  tOvo: number;
  tFilhote: number;
  tAnc?: number;
  ovoAnc?: AindaSemTipo;
  tAncUI?: number;
  tEvento?: number;
  ultEvento?: string;
  altar?: AindaSemTipo;
  portalEm?: number | null;
  abates0?: number;
  ultimoSE: number;
  tCuraReac?: number;
  tUniao?: number;
  tAnzol?: number;
  tConcha?: number;
  tRaioRel?: number;
  tEsp?: number;
  _drEsp?: number;
  // chão e cenário
  /** __ver sobe a cada mudança: o desenho do chão só é refeito quando muda */ solo: Map<string, { t: string; ate: number }> & {
    __ver?: number;
  };
  /** solo natural de cada célula, guardado por mapa */ soloNat?: Map<number, string>;
  tSolo: number;
  tFogo: number;
  soloJog: string;
  cena?: AindaSemTipo;
  intro?: AindaSemTipo;
  // tela
  shake: number;
  hitstop: number;
  lento: number;
  flash?: { cor: string; vida: number } | null;
  escuro: number;
  escuroAlvo?: number;
  escuroFixo?: number;
  escuroT?: number;
  anuncio?: AindaSemTipo;
  aviso?: { txt: string; sub: string; vida: number; cor: string } | null;
  conqAtual?: AindaSemTipo;
  conqFila?: AindaSemTipo[];
  colunaNivel?: AindaSemTipo;
  pulsoXp?: number;
  nivelAgendado?: boolean;
  _nuvemFeita?: boolean;
  _sinalT?: number;
  ultFala?: Record<string, number>;
  ultFalaG?: number;
  paradoT?: number;
  cont?: Record<string, number>;
  // Lenda (o herói da run) e domínio dos deuses
  lendaPose?: AindaSemTipo;
  lendaAng?: number;
  lendaHit?: number;
  lendaCd?: number;
  lendaGiros?: number;
  lendaVfx?: AindaSemTipo;
  domCd?: number;
  queima?: number;
}

/** ganchos de simulação e teste (01_nucleo.ts); no jogo normal ficam desligados */
interface Simulacao {
  ativo: boolean;
  /** entrada do robô no lugar do toque e do teclado */ entrada:
    (() => { x: number; y: number; esquivar?: boolean; despertar?: boolean; combinado?: boolean }) | null;
  aoDerrota: (() => void) | null;
  semEspeciais: boolean;
  /** simula sem estado de arte (partida reproduzível) */ semArte: boolean;
  /** testes que querem esses sistemas ligados mesmo simulando */ dex?: boolean;
  conquistas?: boolean;
  semTalismas?: boolean;
  tudoLiberado?: boolean;
}
/** objeto físico do cenário (vaso, barril, marco, estátua...), criado por novoProp */
interface PropCena extends Ponto {
  ehProp: true;
  tipo: string;
  mat: AindaSemTipo;
  vx: number;
  vy: number;
  r: number;
  m: number;
  esc: number;
  hp: number;
  max: number;
  morto: boolean;
  /** marcos e luzes: célula da folha */ idx?: number;
  /** estátua de inimigo derrotado */ spriteFixo?: HTMLCanvasElement;
  ouro?: boolean;
  [estado: string]: AindaSemTipo;
}
/** partícula do clima (neve, chuva, folhas, brasas...), criada por particulaAr */
interface ParticulaAr extends Ponto {
  k: string;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  vida: number;
  max: number;
  fase: number;
  cor: string | null;
  tam: number;
  /** brilha (soma luz) */ luz?: boolean;
}
/** opções das telas de escolha */
interface OpcoesCartas {
  /** arte de fundo (ui__...) */ fundo?: string;
  grade?: boolean;
  /** cartas entram viradas e se revelam */ revelar?: boolean;
}

/** uma carta das telas de escolha (mostrarCartas) */
interface Carta {
  titulo: string;
  texto?: string;
  raridade?: string;
  classe?: string | null;
  sprite?: Imagem | null;
  suave?: boolean;
  desab?: boolean;
  manter?: boolean;
  acao: (botao?: HTMLButtonElement) => void;
  [extra: string]: AindaSemTipo;
}
