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
  /** recorte de folha que tira pedaços da pose vizinha também na versão grande */
  _limpar?: boolean;
  _ky?: number;
  /** fração da altura onde fica o pé do desenho */ base?: number;
  _pe?: number;
  _alvo?: number;
  pronta?: boolean;
  falhou?: boolean;
  valida?: boolean;
  /** faixas de desenho já calculadas por número de linhas (faixasFolha) */ [faixas: `_faixas${number}`]: number[][] | null;
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
/** arte do manifesto: imagem carregada ou, quando o fundo foi limpo, um canvas (que não tem src) */
type ArteCarregada = Imagem & { src?: string };
/** valores que a interface guarda no próprio elemento para só mexer na página quando mudam */
interface HTMLElement {
  _v?: number;
  _u?: boolean;
  _escolhendo?: boolean;
}

// ---------------------------------------------------------------- conteúdo (js/dados.js). O esquema completo dos dados é a etapa 3 do plano
/** o herói da run: uma Lenda (D.lendas) ou um deus do Panteão (D.panteao). O código trata os dois juntos; os campos que só
 *  um dos dois tem (universo nas Lendas; dom, fardo e provação nos deuses) ficam opcionais */
type Heroi = Partial<Dados["lendas"][number]> &
  Partial<Dados["panteao"][number]> & {
    id: string;
    nome: string;
    elementos: string[];
    poder: Partial<Dados["lendas"][number]["poder"]> & Partial<Dados["panteao"][number]["poder"]> & { nome: string; tipo: string };
  };
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
// ---------------------------------------------------------------- save conferido na leitura (00_save.js)
/** ids que o conteúdo atual tem, para conferir as listas do save */
interface Catalogo {
  linhas: ReadonlySet<string>;
  universos: ReadonlySet<string>;
  /** Lendas são guardadas pelo universo de onde vêm */
  lendas: ReadonlySet<string>;
  deuses: ReadonlySet<string>;
  talismas: ReadonlySet<string>;
  elementos: ReadonlySet<string>;
}
interface SaveLido {
  /** campos conferidos do progresso permanente (os que faltarem usam o padrão do jogo) */
  meta: Partial<Meta> & Record<string, unknown>;
  run: Run | null;
  /** o que foi corrigido; vazio quando o save estava bom */
  avisos: string[];
  /** true quando o texto não era um save (nada foi aproveitado) */
  ilegivel: boolean;
}
/** golpe de chefe ou mini-chefe (D.eras[...].combate.golpes, kits dos mapas e golpes montados no código). Cada tipo usa campos
 * próprios (n, ondas, arco, vel, proj, dur, deixa...): o conjunto completo ainda não está descrito, por isso o índice aberto. */
interface Golpe {
  tipo: string;
  nome?: string;
  el?: Elemento | "multi";
  [campo: string]: AindaSemTipo;
}
/** atributos de um monstro na hora (atrib e atribPoder): dano por golpe, golpes por segundo, vida e cura */
interface Atributos {
  dano: number;
  cad: number;
  vida: number;
  cura: number;
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
/** o que um golpe pode atingir: inimigo ou objeto do cenário (vaso, barril, estátua...); distinguir com ehProp === true */
type Alvo = Inimigo | PropCena;
/** item da bolsa */
type ItemBolsa = "incenso" | "chamado" | "doce" | "pedra" | "pena";
interface Inimigo extends Ponto {
  /** distingue de PropCena (objeto do cenário), que também pode levar golpes */ ehProp?: false;
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
  /** contorno do abismo, calculado na primeira vez que aparece */ pts?: number[][];
  /** lago já recebeu peixes e sapos */ povoado?: boolean;
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
  /** ajuste do diretor sobre a curva do mapa (0,8 a 1,4) */
  ajuste: number;
  tick: number;
  respiro: number;
  tEvento: number;
  /** inimigos que a horda quer na tela agora (curva do mapa vezes o ajuste) */
  alvo: number;
  /** inimigos na tela */
  n: number;
  /** inimigos na tela e chegando (logo além da borda, onde nascem) */
  perto: number;
  vida: number;
  eventos: number;
  ameaca: number;
  tCheia: number;
}

// ---------------------------------------------------------------- itens das listas do mapa (levantados dos pontos onde entram na lista)
/** número de dano que sobe da criatura */
interface NumeroDano extends Ponto {
  v: number;
  cor: string;
  tam: number;
  vida: number;
  max: number;
  vx: number;
  vy: number;
  alvo: Ponto | null;
  pop?: number;
}
/** texto curto que sobe e some */
interface TextoFlutuante extends Ponto {
  t: string;
  cor: string;
  tam: number;
  vida: number;
}
/** ovo no chão do mapa */
interface OvoMapa extends Ponto {
  id: string;
  rar: Raridade;
  vida: number;
}
/** filhote selvagem para capturar */
interface Selvagem extends Ponto {
  id: string;
  rar: Raridade;
  vida: number;
  selando?: boolean;
  fugaRapida?: number;
  imune?: number;
}
/** rastro do corpo de quem passou rápido (esquiva, salto) */
interface Fantasma extends Ponto {
  spr: Imagem;
  vida: number;
}
/** inimigo derrotado caindo do seu jeito */
interface Cadaver extends Ponto {
  spr: HTMLCanvasElement | null;
  estilo: string;
  t: number;
  max: number;
  flip: boolean;
  esc: number;
  cor: string;
  el: Elemento;
  /** quando há arte de derrota: o que é preciso para escolher o quadro */ foto: {
    chefe: boolean;
    mini: boolean;
    eraChefe: boolean;
    tipo: number;
    tam: number;
    especial: boolean;
    clone: boolean;
  } | null;
}
/** balão de fala de uma criatura */
interface Fala {
  e: Inimigo;
  txt: string;
  cor: string;
  vida: number;
}
/** clarão de luz num ponto */
interface Clarao extends Ponto {
  cor: string;
  r: number;
  t: number;
  max: number;
}
/** moeda de Essência pulando no chão */
interface Moeda extends Ponto {
  z: number;
  vx: number;
  vy: number;
  vz: number;
  f: number;
  v: number;
  t: number;
  pega?: boolean;
}
/** baú no chão */
interface BauMapa extends Ponto {
  tipo: string;
  t: number;
  aberto?: boolean;
}
/** inimigo ou objeto caindo no abismo */
interface Queda extends Ponto {
  spr: HTMLCanvasElement;
  esc: number;
  t: number;
}
/** sapo do pântano */
interface Sapo extends Ponto {
  vida: number;
  f: number;
}
/** golpe de chefe em andamento: atualizar devolve false quando acabou; o estado de cada golpe fica no próprio objeto */
interface GolpeChefe {
  t?: number;
  atualizar(dt: number): boolean;
  frente?(ox: number, oy: number): void;
  luz?(ox: number, oy: number): void;
  chao?(ox: number, oy: number): void;
  [estado: string]: AindaSemTipo;
}
/** marca no chão que avisa um golpe (círculo, linha, cone, anel) e o que acontece quando o tempo acaba */
interface Perigo {
  tipo: string;
  t: number;
  max?: number;
  x?: number;
  y?: number;
  r?: number;
  cor?: string;
  fim?: () => void;
  [forma: string]: AindaSemTipo;
}

// ---------------------------------------------------------------- o cenário vivo do mapa (J.cena, montado por iniciarCena)
interface Destroco extends Ponto {
  z: number;
  vx: number;
  vy: number;
  vz: number;
  cor: string;
  tam: number;
  vida: number;
  leve?: boolean;
  brilho?: boolean;
  img?: HTMLCanvasElement | null;
}
interface Pegada extends Ponto {
  cor: string;
  vida: number;
  max: number;
  tam: number;
}
interface Fumaca extends Ponto {
  z: number;
  r: number;
  r1: number;
  vida: number;
  max: number;
  cor: string;
  vz: number;
}
interface RastroAr extends Ponto {
  vida: number;
  max: number;
  len: number;
  f: number;
}
interface Vortice extends Ponto {
  r: number;
  vmax: number;
  vida: number;
  fogo: boolean;
  f: number;
  segue?: Inimigo;
  /** relógio das faíscas */ tf?: number;
}
interface Relampago {
  pts: number[][];
  vida: number;
  max: number;
}
interface Fauna extends Ponto {
  k: string;
  vx: number;
  vy: number;
  z?: number;
  vz?: number;
  f: number;
  vida: number;
  susto?: number;
  pulo?: number;
  lago?: PecaCenario;
  assustado?: boolean;
}
interface LuzCena extends Ponto {
  r: number;
  cor: string;
  vida: number;
  max: number;
}
interface Cena {
  u: Universo;
  /** kit visual do reino (dados) */ kit: AindaSemTipo;
  veg: string;
  t: number;
  ang0: number;
  dx: number;
  dy: number;
  vBase: number;
  Wx: number;
  Wy: number;
  Wm: number;
  /** objetos por pedaço do mapa */ props: Map<string, PropCena[]>;
  /** objetos perto da tela */ lista: PropCena[];
  tufos: Map<string, { bx: number; by: number; vx: number; vy: number }>;
  marcas: Map<string, number>;
  pegadas: Pegada[];
  ondas: { x: number; y: number; r: number; vida: number }[];
  destrocos: Destroco[];
  ar: ParticulaAr[];
  fumaca: Fumaca[];
  rastros: RastroAr[];
  vort: Vortice[];
  raios: Relampago[];
  filaExp: { x: number; y: number; R: number; t: number }[];
  aviso: AindaSemTipo;
  tRaio: number;
  tVort: number;
  tPart: number;
  nevoa: { x: number; y: number; r: number; a: number; f: number }[];
  nuvens: { x: number; y: number; r: number; a: number }[];
  detalhes: Map<string, AindaSemTipo>;
  sprites: Map<string, HTMLCanvasElement>;
  tSolo: number;
  contador: number;
  fauna?: Fauna[];
  luzes?: LuzCena[];
  causticas?: HTMLCanvasElement[];
  /** peças grandes por zona do mapa e a lista de vizinhas de cada zona (07d_estrutura) */ zonas?: Map<string, PecaCenario>;
  vizinhas?: Map<number, PecaCenario[]>;
  /** contadores de quadro: metade do trabalho em cada quadro */ quadro?: number;
  quadroA?: number;
  tAve?: number;
  fundoProc?: HTMLCanvasElement;
  raioRapido?: boolean;
  corAreia?: string;
}

/** J: o mapa em andamento (recriado a cada mapa por iniciarMapa) */
interface Mapa {
  /** rastro do herói no chão (rastroDe): distância desde a última pegada, solo anterior e lado do passo */ _pd?: number;
  _soloAnt?: string;
  _lado?: boolean;
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
  nums: NumeroDano[];
  textos: TextoFlutuante[];
  efeitos: Efeito[];
  parts: Particula[];
  ovosMapa: OvoMapa[];
  selvagens: Selvagem[];
  fantasmas: Fantasma[];
  perigos: Perigo[];
  golpes: GolpeChefe[];
  cadaveres: Cadaver[];
  falas: Fala[];
  agenda: { t: number; fn: () => void }[];
  vfx?: Vfx[];
  flashes?: Clarao[];
  moedas?: Moeda[];
  baus?: BauMapa[];
  quedas?: Queda[];
  setas?: { ang: number; vida: number }[];
  sapos?: Sapo[];
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
  cena?: Cena;
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
