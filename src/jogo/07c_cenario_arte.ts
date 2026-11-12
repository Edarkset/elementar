// Elementar · arte de cenário importada: chão, superfícies, marcos, objetos, efeitos de chefe e a camada em alta resolução
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./07b_cenario_desenho.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { ctx, H, J, lg, Q, R, relatar, S, semente, SIM, UNIV, W } from "./01_nucleo.js";
import { ARTE_IMG, correcaoAltura, MANIFESTO } from "./05_arte.js";
import { CH, novoProp } from "./07_cenario.js";
import { lugarDeObjeto } from "./08_horda.js";
import { escurecimentoArte } from "./08g_luz.js";
import { chao, defChao, gerarChao } from "./10_desenho.js";
// ================================================================ arte de cenário importada: chão, superfícies, marcos, objetos e efeitos dos chefes
// Cada função devolve null quando a folha ainda não foi importada; aí o jogo continua com o desenho procedural.
export const cacheCel = new Map();
// O que existe no mapa é decidido pela lista de artes (o manifesto), não por a imagem já ter chegado: antes, marcos e construções só
// eram criados se a arte estivesse carregada naquele instante, então o mesmo mapa tinha obstáculos diferentes conforme a rede
export function temArteU(sufixo: string) {
  const u = UNIV[R.universo];
  return !!(u && MANIFESTO && MANIFESTO[`arte/reinos/${u.era}/${u.id}__${sufixo}.png`]);
}
export function folhaU(sufixo: string) {
  const u = UNIV[R.universo];
  if (!u) return null;
  const img = ARTE_IMG[`arte/reinos/${u.era}/${u.id}__${sufixo}.png`];
  return img && img.pronta ? img : null;
}
export function folhaArte(caminho: string) {
  const img = ARTE_IMG[caminho];
  return img && img.pronta ? img : null;
}
// recorta a célula (col,row) de uma folha cols x rows e escala para w x h; base = altura relativa da linha de apoio (85% nas folhas)
export let ID_IMG = 0; // ler img.src de uma imagem embutida copia um texto enorme; cada imagem ganha um número fixo
/** número novo para uma imagem ou recorte (a contagem mora aqui; os outros módulos pedem o próximo) */
export function novoIdImg() {
  return ++ID_IMG;
}
// faixas de desenho de uma folha: algumas folhas foram exportadas com as linhas deslocadas da grade (uma faixa vazia em cima,
// poses mais baixas), e o corte pela grade pegava pedaço da pose vizinha. Se a folha tem exatamente 'rows' faixas separadas
// por linhas vazias, cada linha usa a sua faixa; senão, a grade comum
export function faixasFolha(img: Imagem, rows: number) {
  const k = "_faixas" + rows;
  if (img[k] !== undefined) return img[k];
  img[k] = null;
  try {
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data,
      W = c.width,
      H = c.height;
    const bandas = [];
    let on = false,
      y0 = 0;
    for (let y = 0; y < H; y++) {
      let n = 0;
      for (let x = 0; x < W; x += 2) if (d[(y * W + x) * 4 + 3] > 40) n++;
      if (n > 1 && !on) {
        on = true;
        y0 = y;
      } else if (n <= 1 && on) {
        on = false;
        if (y - y0 >= 6) bandas.push([y0, y]);
      }
    }
    if (on && H - y0 >= 6) bandas.push([y0, H]);
    const ch = H / rows,
      fora = bandas.filter((b, i) => Math.abs(b[1] - (i + 1) * ch) > ch * 0.12).length;
    if (bandas.length === rows && fora > 0) img[k] = bandas;
  } catch (e) {
    relatar("cenário: faixas da folha não puderam ser lidas", e);
  }
  return img[k];
}
// pedaço da pose de cima invadindo o topo da célula: se no terço de cima existe uma linha vazia com desenho acima dela,
// o que está acima é de outra pose e sai
export function limparTopoSolto(c: HTMLCanvasElement) {
  try {
    const g = c.getContext("2d"),
      W = c.width,
      H = c.height,
      d = g.getImageData(0, 0, W, H).data,
      cheia = (y: number) => {
        for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 30) return true;
        return false;
      };
    let viu = false;
    for (let y = 0; y < Math.floor(H * 0.35); y++) {
      const t = cheia(y);
      if (t) viu = true;
      else if (viu) {
        let corpo = false;
        for (let y2 = y + 1; y2 < H; y2++)
          if (cheia(y2)) {
            corpo = true;
            break;
          }
        if (corpo) g.clearRect(0, 0, W, y);
        break;
      }
    }
    // o mesmo na base: pedaço da pose de baixo abaixo de uma linha vazia, no terço de baixo
    viu = false;
    for (let y = H - 1; y > Math.floor(H * 0.65); y--) {
      const t = cheia(y);
      if (t) viu = true;
      else if (viu) {
        let corpo = false;
        for (let y2 = y - 1; y2 >= 0; y2--)
          if (cheia(y2)) {
            corpo = true;
            break;
          }
        if (corpo) g.clearRect(0, y, W, H - y);
        break;
      }
    }
    // laterais: fiapo da coluna vizinha separado do corpo por uma coluna vazia, nos 15% de cada lado
    const col = (x: number) => {
        for (let y = 0; y < H; y++) if (d[(y * W + x) * 4 + 3] > 30) return true;
        return false;
      },
      L = Math.floor(W * 0.15);
    for (const [ini, passo] of [
      [0, 1],
      [W - 1, -1]
    ] as [number, number][]) {
      let v = false;
      for (let i = 0; i < L; i++) {
        const x = ini + i * passo,
          t = col(x);
        if (t) v = true;
        else if (v) {
          if (passo > 0) g.clearRect(0, 0, x, H);
          else g.clearRect(x + 1, 0, W - x - 1, H);
          break;
        }
      }
    }
  } catch (e) {
    relatar("cenário: bordas da célula não puderam ser lidas", e);
  }
}
export function celulaArte(img: Imagem, cols: number, rows: number, col: number, row: number, w: number, h: number, base?: number) {
  if (!img) return null;
  if (!img._id) img._id = ++ID_IMG;
  const k = img._id + "|" + cols + "|" + rows + "|" + col + "|" + row + "|" + w + "|" + h;
  if (cacheCel.has(k)) return cacheCel.get(k);
  if (cacheCel.size > 3000) cacheCel.clear();
  const cw = img.width / cols,
    ch = img.height / rows,
    c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = false;
  // a célula entra inteira mantendo a proporção (folhas exportadas com outra proporção não ficam esticadas); a linha de apoio
  // (base) continua no mesmo ponto do quadro, então os pés não mudam de lugar
  const ky = correcaoAltura(img),
    b = base ?? 1,
    e = Math.min(w / cw, h / (ch * ky)),
    dw = cw * e,
    dh = ch * e * ky,
    dx = (w - dw) / 2,
    dy = b * (h - dh); // ky: folha achatada na conversão
  const fx = faixasFolha(img, rows),
    syR = fx ? Math.max(0, Math.min(img.height - ch, fx[row][1] + Math.round(ch * 0.04) - ch)) : row * ch; // linha deslocada: alinha pelo pé da faixa
  g.drawImage(img, Math.round(col * cw), Math.round(syR), Math.round(cw), Math.round(ch), dx, dy, dw, dh);
  c.base = b;
  limparTopoSolto(c);
  c._src = {
    img,
    sx: Math.round(col * cw),
    sy: Math.round(syR),
    sw: Math.round(cw),
    sh: Math.round(ch),
    dest: [dx / w, dy / h, dw / w, dh / h]
  };
  cacheCel.set(k, c);
  return c;
}
// ---------------------------------------------------------------- camada de arte em alta resolução
// O mundo é desenhado em baixa resolução (estilo pixel art) e ampliado para a tela. Arte pintada (monstros, inimigos, chefes,
// Lendas) reduzida a 20-40 px vira borrão; por isso ela é desenhada por cima, na resolução real da tela, a partir do original.
export const CAMADA_ARTE = [];
export let cvArte = null;
// versão da célula em K pixels por pixel de mundo, recortada do arquivo original com suavização de alta qualidade
export function versaoHi(c: Imagem, K?: number) {
  if (!c || !c._src) return null;
  K = Math.max(1, Math.min(8, Math.ceil(K || 4)));
  if (c.hi && c.hiK === K) return c.hi;
  const h = document.createElement("canvas");
  h.width = Math.max(1, Math.round(c.width * K));
  h.height = Math.max(1, Math.round(c.height * K));
  const g = h.getContext("2d"),
    s = c._src,
    d = s.dest || [0, 0, 1, 1],
    dx = d[0] * h.width,
    dy = d[1] * h.height,
    dw = d[2] * h.width,
    dh = d[3] * h.height,
    amp = Math.min(dw / s.sw, dh / s.sh);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  // ampliação "nítida e lisa": primeiro amplia pixel a pixel por um fator inteiro (bordas firmes), depois suaviza até o tamanho final.
  // Só pixel a pixel fica quadriculado; só suave fica borrado.
  const m = amp >= 5 ? 3 : amp >= 1.7 ? 2 : 1;
  if (m >= 2) {
    // pixel a pixel primeiro (bordas firmes), depois suave: inimigos ampliados ~2-3x ficavam embaçados
    const t = document.createElement("canvas");
    t.width = Math.round(s.sw * Math.min(m, 4));
    t.height = Math.round(s.sh * Math.min(m, 4));
    const gt = t.getContext("2d");
    gt.imageSmoothingEnabled = false;
    gt.drawImage(s.img, s.sx, s.sy, s.sw, s.sh, 0, 0, t.width, t.height);
    g.drawImage(t, dx, dy, dw, dh);
  } else g.drawImage(s.img, s.sx, s.sy, s.sw, s.sh, dx, dy, dw, dh);
  c.hi = h;
  c.hiK = K;
  return h;
}
// Toda célula de arte importada (tem _src) desenhada no mundo usa a versão em alta resolução no lugar
// da miniatura. Funciona para qualquer chamada lg.drawImage, então nenhum desenho precisa mudar.
{
  const desenhoOriginal = lg.drawImage.bind(lg);
  // o tipo do navegador descreve as três formas de chamar drawImage; esta função atende as três e troca a imagem pela versão nítida
  lg.drawImage = function (img: Imagem, a: number, b: number, c: number, d: number, e: number, f: number, g2: number, h2: number) {
    if (img && img._suave && !lg.imageSmoothingEnabled) {
      lg.imageSmoothingEnabled = true;
      desenhoOriginal.apply(null, arguments);
      lg.imageSmoothingEnabled = false;
      return;
    }
    if (img && img._hi && Q > 1) {
      const hi = img._hi,
        kx = hi.width / img.width,
        ky = hi.height / img.height,
        n = arguments.length,
        suave = lg.imageSmoothingEnabled;
      lg.imageSmoothingEnabled = true;
      if (n <= 3) desenhoOriginal(hi, a, b, img.width, img.height);
      else if (n <= 5) desenhoOriginal(hi, a, b, c, d);
      else desenhoOriginal(hi, a * kx, b * ky, c * kx, d * ky, e, f, g2, h2);
      lg.imageSmoothingEnabled = suave;
      return;
    }
    if (Q <= 1 || !img || !img._src) return desenhoOriginal.apply(null, arguments);
    const hi = versaoHi(img, Q * 1.25);
    if (!hi) return desenhoOriginal.apply(null, arguments);
    const suave = lg.imageSmoothingEnabled;
    lg.imageSmoothingEnabled = true;
    lg.imageSmoothingQuality = "high";
    const kx = hi.width / img.width,
      ky = hi.height / img.height,
      n = arguments.length;
    if (n <= 3) desenhoOriginal(hi, a, b, img.width, img.height);
    else if (n <= 5) desenhoOriginal(hi, a, b, c, d);
    else desenhoOriginal(hi, a * kx, b * ky, c * kx, d * ky, e, f, g2, h2);
    lg.imageSmoothingEnabled = suave;
  } as unknown as CanvasRenderingContext2D["drawImage"];
}
// área desenhada de uma célula (para encaixar o monstro pelo desenho visível, não pela célula)
export const cacheBB = new Map();
export function bboxCelula(img: Imagem, sx: number, sy: number, sw: number, sh: number) {
  if (!img._id) img._id = ++ID_IMG;
  const k = img._id + "|" + sx + "|" + sy;
  if (cacheBB.has(k)) return cacheBB.get(k);
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(sw));
  c.height = Math.max(1, Math.round(sh));
  const g = c.getContext("2d");
  g.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
  let x0 = c.width,
    y0 = c.height,
    x1 = -1,
    y1 = -1;
  try {
    const d = g.getImageData(0, 0, c.width, c.height).data;
    for (let y = 0; y < c.height; y++)
      for (let x = 0; x < c.width; x++)
        if (d[(y * c.width + x) * 4 + 3] > 24) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
  } catch (err) {
    relatar("arte: contorno do recorte não pôde ser lido", err);
  }
  const bb =
    x1 < 0
      ? { x: sx, y: sy, w: sw, h: sh }
      : {
          x: sx + (x0 * sw) / c.width,
          y: sy + (y0 * sh) / c.height,
          w: ((x1 - x0 + 1) * sw) / c.width,
          h: ((y1 - y0 + 1) * sh) / c.height
        };
  cacheBB.set(k, bb);
  return bb;
}
export const ALVO_ARTE = [18, 21, 24, 28]; // altura do monstro com arte, por estágio (pixels de mundo). Antes 24 a 44: os evoluídos ficavam maiores que o herói e cobriam tudo
export function encaixarArte(img: Imagem, sx: number, sy: number, sw: number, sh: number, alvo: number) {
  const bb = bboxCelula(img, sx, sy, sw, sh),
    ky = correcaoAltura(img),
    k = Math.min(alvo / bb.w, alvo / (bb.h * ky)),
    w = Math.max(1, Math.round(bb.w * k)),
    h = Math.max(1, Math.round(bb.h * ky * k));
  const c = document.createElement("canvas");
  c.width = c.height = alvo;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = true;
  const ox = Math.round((alvo - w) / 2),
    oy = alvo - h;
  g.drawImage(img, bb.x, bb.y, bb.w, bb.h, ox, oy, w, h);
  c._src = { img, sx: bb.x, sy: bb.y, sw: bb.w, sh: bb.h, dest: [ox / alvo, oy / alvo, w / alvo, h / alvo] };
  return c;
}
// Com a tela interna em alta resolução (Q>1) a arte vai direto para o mundo: fica na ordem certa com
// efeitos e recebe a luz do mapa. A camada separada só é usada se a tela interna estiver em baixa resolução.
export function desenharSprite(spr: HTMLCanvasElement, dx: number, dy: number, dw: number, dh: number) {
  const hi = !SIM.ativo && Q <= 1 && spr && spr._src ? versaoHi(spr) : null;
  if (!hi) {
    lg.drawImage(spr, dx, dy, dw, dh);
    return;
  }
  const t = lg.getTransform();
  CAMADA_ARTE.push({ hi, t, dx, dy, dw, dh, al: lg.globalAlpha });
}
export function desenharCamadaArte() {
  if (!CAMADA_ARTE.length) return;
  if (!cvArte) cvArte = document.createElement("canvas");
  if (cvArte.width !== W || cvArte.height !== H) {
    cvArte.width = W;
    cvArte.height = H;
  }
  const g = cvArte.getContext("2d");
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, W, H);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  for (const o of CAMADA_ARTE) {
    const t = o.t,
      k = S / Q;
    g.setTransform(k * t.a, k * t.b, k * t.c, k * t.d, k * t.e, k * t.f);
    g.globalAlpha = o.al;
    g.drawImage(o.hi, o.dx, o.dy, o.dw, o.dh);
  }
  CAMADA_ARTE.length = 0;
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  // a mesma luz do mapa escurece a arte (senão os monstros brilhariam nos mapas noturnos)
  const e = typeof escurecimentoArte === "function" ? escurecimentoArte() : null;
  if (e && e.a > 0.02) {
    g.globalCompositeOperation = "source-atop";
    g.globalAlpha = e.a;
    g.fillStyle = e.cor;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "source-over";
    g.globalAlpha = 1;
  }
  ctx.drawImage(cvArte, 0, 0);
}
export function spriteUI(spr) {
  return (spr && spr._src && versaoHi(spr)) || spr;
}
// quando uma imagem termina de carregar, refaz o que foi desenhado sem ela
export function arteCarregou(ns: string[]) {
  if (!J || !R || typeof chao === "undefined" || !chao || !chao.u) return;
  const u = chao.u,
    pre = `arte/reinos/${u.era}/${u.id}__`;
  const doMapa = (ns || []).filter(n => n.startsWith(pre) || n.startsWith("arte/ambiente/"));
  if (ns && !doMapa.length) return;
  if (!chao.tam && (!ns || doMapa.some(n => /__(piso|tiles)\.png$/.test(n)))) gerarChao(u);
  if (J.cena) {
    J.cena.detalhes.clear();
    J.cena.sprites.clear();
  }
}

// ---------------------------------------------------------------- chão: 8 peças sorteadas lado a lado (16 px no mundo cada)
// piso jogável grande (1024 px da folha = 512 px no mundo); emendas pequenas são escondidas misturando uma cópia deslocada perto das bordas
export const TAM_PISO = 220; // o piso de 512 px cobre 220 px de mundo (antes 300: as peças do piso ficavam enormes perto dos personagens)
// realce leve de nitidez (máscara de desfoque), feito uma vez quando o piso carrega; a borda dá a volta para continuar emendando
export function nitidez(c: HTMLCanvasElement, k: number) {
  if (SIM.ativo) return c;
  try {
    const g = c.getContext("2d"),
      w = c.width,
      h = c.height,
      im = g.getImageData(0, 0, w, h),
      d = im.data,
      o = new Uint8ClampedArray(d);
    for (let y = 0; y < h; y++) {
      const ym = ((y - 1 + h) % h) * w,
        yp = ((y + 1) % h) * w,
        y0 = y * w;
      for (let x = 0; x < w; x++) {
        const xm = (x - 1 + w) % w,
          xp = (x + 1) % w,
          i = (y0 + x) * 4;
        for (let ch = 0; ch < 3; ch++) {
          const blur = (o[(ym + x) * 4 + ch] + o[(yp + x) * 4 + ch] + o[(y0 + xm) * 4 + ch] + o[(y0 + xp) * 4 + ch]) * 0.25;
          d[i + ch] = o[i + ch] + (o[i + ch] - blur) * k;
        }
      }
    }
    g.putImageData(im, 0, 0);
  } catch (e) {
    relatar("piso: emenda não pôde ser suavizada", e);
  }
  return c;
}
// piso pintado mais calmo: a arte do chão tem muito contraste e detalhe (flores, trepadeiras, ladrilhos) e competia com
// monstros e inimigos; tira 20% do contraste, 25% da saturação e escurece um pouco, uma vez só quando o mapa começa
export function acalmarPiso(c: HTMLCanvasElement) {
  if (SIM.ativo) return c;
  try {
    const g = c.getContext("2d"),
      im = g.getImageData(0, 0, c.width, c.height),
      d = im.data;
    let soma = 0,
      n = 0;
    for (let i = 0; i < d.length; i += 4 * 97) {
      soma += d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
      n++;
    }
    const media = soma / n,
      luz = media < 25 ? 1.45 : media < 45 ? 1.25 : 0.97; /* piso muito escuro clareia */
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i],
        gg = d[i + 1],
        b = d[i + 2],
        L = r * 0.299 + gg * 0.587 + b * 0.114;
      for (let ch = 0; ch < 3; ch++) {
        const v = d[i + ch],
          s = L + (v - L) * 0.75;
        d[i + ch] = (118 + (s - 118) * 0.8) * luz;
      }
    }
    g.putImageData(im, 0, 0);
  } catch (e) {
    relatar("piso: espelhamento não pôde ser suavizado", e);
  }
  return c;
}
// piso repetido sem costura. A maioria das artes já emenda sozinha e volta como está. As que não emendam nas bordas
// (padrões geométricos como o da Pérsia) viram 4 cópias espelhadas, que emendam sem costura nenhuma; cada cópia cobre
// o mesmo tamanho de mundo, então quem usa dobra o tamanho do piso (c._espelho)
export function emendaNasBordas(g: CanvasRenderingContext2D, T: number) {
  try {
    const d = g.getImageData(0, 0, T, T).data,
      px = (x: number, y: number) => (y * T + x) * 4,
      dif = (a: number, b: number) => Math.abs(d[a] - d[b]) + Math.abs(d[a + 1] - d[b + 1]) + Math.abs(d[a + 2] - d[b + 2]);
    let meio = 0,
      ex = 0,
      ey = 0,
      n = 0;
    for (let k = 0; k < T; k += 2) {
      meio += dif(px(T >> 1, k), px((T >> 1) + 1, k)) + dif(px(k, T >> 1), px(k, (T >> 1) + 1));
      ex += dif(px(0, k), px(T - 1, k));
      ey += dif(px(k, 0), px(k, T - 1));
      n++;
    }
    meio /= 2 * n;
    return ex / n <= meio * 1.3 + 4 && ey / n <= meio * 1.3 + 4;
  } catch (e) {
    return true;
  }
} // costura = borda bem mais diferente que pixels vizinhos do meio
export function tornarContinuo(img: CanvasImageSource, T: number) {
  const c = document.createElement("canvas");
  c.width = c.height = T;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = false;
  g.drawImage(img, 0, 0, T, T);
  if (emendaNasBordas(g, T)) return c;
  const T2 = Math.min(2048, T * 2),
    h2 = T2 / 2,
    e = document.createElement("canvas");
  e.width = e.height = T2;
  const ge = e.getContext("2d");
  ge.imageSmoothingEnabled = true;
  ge.imageSmoothingQuality = "high";
  for (const [sx, sy] of [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1]
  ] as [number, number][]) {
    ge.save();
    ge.translate(sx < 0 ? T2 : 0, sy < 0 ? T2 : 0);
    ge.scale(sx, sy);
    ge.drawImage(img, 0, 0, h2, h2);
    ge.restore();
  } // normal, espelhada na horizontal, na vertical e nas duas
  e._espelho = true;
  return e;
}
// o piso é guardado na resolução do arquivo (até 2048 px) e desenhado com 512 px de mundo
export function chaoArte(u: Universo) {
  const piso = ARTE_IMG[`arte/reinos/${u.era}/${u.id}__piso.png`];
  if (piso && piso.pronta) {
    const T = SIM.ativo ? 512 : Math.max(512, Math.min(2048, piso.width));
    const cv = acalmarPiso(nitidez(tornarContinuo(piso, T), 0.2));
    defChao({ cv, u, tam: TAM_PISO * (cv._espelho ? 2 : 1), suave: true });
    return true;
  }
  const img = ARTE_IMG[`arte/reinos/${u.era}/${u.id}__tiles.png`];
  if (!img || !img.pronta) return false;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d"),
    r = semente(u.id + "chao");
  g.imageSmoothingEnabled = false;
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) {
      const v = Math.floor(r() * 8);
      g.drawImage(celulaArte(img, 8, 3, v, 0, 16, 16), x * 16, y * 16);
    }
  defChao({ cv: c, u });
  return true;
}
// manchas (linha 2) e enfeites (linha 3) espalhados em cada pedaço de 96 px
export function detalhesArte(r: () => number) {
  const img = folhaU("tiles");
  if (!img) return null;
  const out = [];
  // mapa menos poluído: menos manchas e enfeites por pedaço; sobre piso pintado (que já tem detalhe próprio), quase nenhum
  const pintado = !!(chao && chao.suave),
    nM = pintado ? 0 : 1 + (r() < 0.4 ? 1 : 0),
    pE = pintado ? 0.25 : 0.45;
  for (let i = 0; i < nM; i++)
    out.push({
      s: celulaArte(img, 8, 3, Math.floor(r() * 8), 1, 32, 32),
      x: r() * 80 - 8,
      y: r() * 80 - 8,
      w: 14 + r() * 6,
      a: 0.5 + r() * 0.2
    });
  for (let i = 0; i < 2; i++) {
    if (r() > pE) continue;
    out.push({ s: celulaArte(img, 8, 3, Math.floor(r() * 8), 2, 32, 32), x: r() * 84, y: r() * 84, w: 9 + r() * 4, a: 1 });
  }
  return out;
}

// ---------------------------------------------------------------- marcos, luzes e peças de primeiro plano (folha 4x2)
export function sortearMarcos(cx: number, cy: number, r: () => number, out: PropCena[]) {
  if (!temArteU("props")) return;
  const x = cx * CH + 10 + r() * 76,
    y = cy * CH + 10 + r() * 76;
  if (Math.abs(x) < 40 && Math.abs(y) < 40) return;
  if (!lugarDeObjeto(x, y, 22)) return;
  const sorte = r() * 1.5;
  /* mapa menos poluído: ~1/3 menos marcos */ if (sorte < 0.3)
    out.push(Object.assign(novoProp("marco", x, y, r), { idx: Math.floor(r() * 6) }));
  else if (sorte < 0.42) out.push(Object.assign(novoProp("luz", x, y, r), { idx: 6 }));
  else if (sorte < 0.54) out.push(Object.assign(novoProp("frente", x, y, r), { idx: 7 }));
}
// marcos: recorta só a parte desenhada da célula (a folha tem muita margem vazia) e dá a altura certa para cada tipo
// (colunas e estátuas altas, templo e árvore grandes, braseiro baixo); antes a célula inteira virava um quadrado e tudo saía pequeno
export const ALT_MARCO = [56, 30, 60, 56, 62, 48, 44, 74]; // 6 = luz (lampião, braseiro): era 32 e ficava baixinho perto das construções
export function spriteMarco(p: PropCena) {
  const img = folhaU("props");
  if (!img) return null;
  if (!img._id) img._id = ++ID_IMG;
  const k = "marco|" + img._id + "|" + p.idx;
  if (cacheCel.has(k)) return cacheCel.get(k);
  const cw = img.width / 4,
    ch = img.height / 2,
    sx = (p.idx % 4) * cw,
    sy = Math.floor(p.idx / 4) * ch,
    bb = bboxCelula(img, sx, sy, cw, ch),
    H = ALT_MARCO[p.idx] || 46;
  const e = H / bb.h,
    w = Math.max(1, Math.round(bb.w * e)),
    h = Math.max(1, Math.round(bb.h * e)),
    c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.drawImage(img, bb.x, bb.y, bb.w, bb.h, 0, 0, w, h);
  c._src = { img, sx: bb.x, sy: bb.y, sw: bb.w, sh: bb.h };
  c.base = 0.97;
  cacheCel.set(k, c);
  return c;
}

// ---------------------------------------------------------------- objetos físicos (folha 8xN: intacto, trincado, quebrado, estado especial, 4 cacos)
export const TAM_OBJ: Record<string, number> = {
  vaso: 13,
  caixote: 13,
  barril: 14,
  polvora: 14,
  feno: 14,
  fruta: 9,
  rocha: 17,
  gelo: 15,
  cristal: 17,
  metal: 18,
  arvore: 26,
  tronco: 16,
  ovo: 9,
  saque: 14
};
export function linhaObjeto(p: PropCena) {
  const u = UNIV[R.universo];
  return u && u.objetos ? u.objetos.indexOf(p.saque ? "saque" : p.tipo) : -1;
}
export function spriteObjetoArte(p: PropCena) {
  const img = folhaU("objetos");
  if (!img) return null;
  const u = UNIV[R.universo],
    lin = linhaObjeto(p);
  if (lin < 0) return null;
  const rows = u.objetos.length,
    q = p.max > 0 && isFinite(p.max) ? p.hp / p.max : 1,
    t = p.saque ? "saque" : p.tipo;
  let col = q < 0.34 ? 2 : q < 0.67 ? 1 : 0;
  if (t === "metal") col = p.solo === "eletrico" ? 1 : p.congela > 0 ? 3 : 0;
  else if (t === "arvore") col = p.carvao > 0.5 ? 3 : p.queima > 0 ? 2 : q < 0.6 ? 1 : 0;
  else if (p.carvao > 0.5 || (p.congela > 0 && ["rocha", "gelo", "cristal", "vaso", "ovo"].includes(t))) col = 3;
  const tam = Math.round((TAM_OBJ[t] || 14) * 1.8 * (p.carvalho ? 1.4 : 1));
  /* antes 1,35: vaso e caixote saíam menores que a cabeça do herói */ return celulaArte(img, 8, rows, col, lin, tam, tam, 0.85);
}
export function cacoArte(p: PropCena) {
  const img = folhaU("objetos");
  if (!img) return null;
  const lin = linhaObjeto(p);
  if (lin < 0) return null;
  const u = UNIV[R.universo];
  return celulaArte(img, 8, u.objetos.length, 4 + Math.floor(Math.random() * 4), lin, 6, 6, 1);
}

// ---------------------------------------------------------------- efeitos dos golpes dos chefes (8x2 por chefe, 8x3 por Guardião)
export function folhaEfeitos(e: Inimigo) {
  const u = UNIV[R.universo];
  if (!u || !(e && e.chefe)) return null;
  return e.eraChefe ? folhaArte(`arte/reinos/${u.era}/guardiao_${u.era}__efeitos.png`) : folhaU("efeitos");
}
export function quadroEfeito(e: Inimigo, linha, col: number, tam: number) {
  const img = folhaEfeitos(e);
  if (!img) return null;
  const rows = e.eraChefe ? 3 : 2;
  return celulaArte(img, 8, rows, col, Math.min(rows - 1, linha || 0), tam, tam, 0.5);
}
// toca os quadros 5 a 8 (estouro no chão) no ponto do impacto
export function impactoArte(e: Inimigo, x: number, y: number, tam: number) {
  const linha = (e && e.golpeIdx) || 0;
  if (!quadroEfeito(e, linha, 4, tam)) return;
  J.golpes.push({
    t: 0,
    atualizar(dt: number) {
      this.t += dt;
      return this.t < 0.4;
    },
    frente(ox: number, oy: number) {
      const s = quadroEfeito(e, linha, 4 + Math.min(3, Math.floor(this.t / 0.1)), tam);
      if (s) lg.drawImage(s, Math.round(x - ox - tam / 2), Math.round(y - oy - tam / 2));
    }
  });
}
