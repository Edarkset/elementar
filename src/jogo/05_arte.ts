// Elementar · artes importadas: manifesto, carregamento sob demanda, recortes e animações dos monstros
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./04_ambiente.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { est, J, L, LINHA, R, ramoAtual, relatar, SIM, UNIV } from "./01_nucleo.js";
import { maisProximo } from "./02_combate.js";
import { QUAL } from "./06_loop.js";
import { ALVO_ARTE, arteCarregou, encaixarArte, novoIdImg } from "./07c_cenario_arte.js";
import { LENDA } from "./08f_lendas.js";
import { aplicarArteUI } from "./08h_interface.js";
// ================================================================ arte real (folhas do Copilot, via importador): usa no lugar dos sprites procedurais
// ARTE_IMG[nome] devolve a imagem; se ela está no manifesto e ainda não foi pedida, começa a baixar na hora (sob demanda).
// Quem usa confere .pronta: enquanto não chega, o jogo segue com o desenho por código.
export let MANIFESTO = null;
export const ARTE_IMG = new Proxy(
    {},
    {
      get(t, k) {
        if (SIM.semArte) return undefined;
        if (typeof k === "string" && !(k in t) && MANIFESTO && MANIFESTO[k]) registrarArte(k, MANIFESTO[k]);
        return t[k];
      }
    }
  ),
  cacheArte = new Map();
// o cache de recortes tem limite (o Safari do iPhone limita a memória total dos canvas): passando de 700, os mais antigos saem
{
  const set0 = cacheArte.set.bind(cacheArte);
  cacheArte.set = (k, v) => {
    if (cacheArte.size > 700) {
      let n = 0;
      for (const kk of cacheArte.keys()) {
        cacheArte.delete(kk);
        if (++n >= 200) break;
      }
    }
    return set0(k, v);
  };
}
export let ARTE_PEND = 0;
// algumas folhas vieram com um fundo quase transparente em cada célula (vira quadrado cinza no chão): zera o alfa muito baixo.
// Só em enfeites, fauna, inimigos, objetos e marcos; brilhos e névoa (efeitos, paredão) ficam como estão
export function limparFundo(nome: string, img: Imagem) {
  const forte = /__(tiles|fauna|inimigos|objetos|props|mini)\.png$/.test(nome);
  // ruído da compressão: pixels com alfa 1 a 11 em volta dos desenhos (invisíveis sozinhos, mas viram retângulos em silhuetas,
  // contornos e brilhos somados). Zera em toda folha de personagem e cenário; efeitos, telas e pisos ficam como estão.
  const leve = !forte && /^arte\/(monstros|lendarios|lendas|panteao)\/|__(chefe|anim|pecas|efeitos)\.png$/.test(nome);
  if (!forte && !leve) return;
  try {
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const im = g.getImageData(0, 0, c.width, c.height),
      d = im.data;
    if (forte)
      for (let i = 3; i < d.length; i += 4) {
        const a = d[i];
        if (a < 56) d[i] = 0;
        else if (a < 110) d[i] = Math.round(((a - 56) / 54) * 110);
      }
    else for (let i = 3; i < d.length; i += 4) if (d[i] < 12) d[i] = 0;
    g.putImageData(im, 0, 0);
    c.pronta = true;
    c.complete = true;
    ARTE_IMG[nome] = c;
  } catch (e) {
    relatar("arte: fundo da imagem não pôde ser limpo", e);
  }
}
export function registrarArte(nome: string, src: string) {
  const img = new Image();
  img.decoding = "async";
  ARTE_PEND++;
  ARTE_IMG[nome] = img;
  img.onload = () => {
    img.pronta = true;
    ARTE_PEND--;
    limparFundo(nome, img);
    novaArte(nome);
  };
  img.onerror = () => {
    ARTE_PEND--;
    img.falhou = true;
  };
  img.src = src;
}
// avisa o jogo das artes que chegaram, em lote (no máximo umas 4 vezes por segundo): os recortes guardados usam o número
// de cada imagem, então nada precisa ser apagado; só o chão e os enfeites do mapa, que foram montados sem a arte, são refeitos
export let artesNovas = [],
  tArtes = null;
export function novaArte(nome: string) {
  artesNovas.push(nome);
  if (tArtes) return;
  tArtes = setTimeout(() => {
    const ns = artesNovas;
    artesNovas = [];
    tArtes = null;
    if (typeof aplicarArteUI === "function") aplicarArteUI();
    if (typeof arteCarregou === "function") arteCarregou(ns);
  }, 250);
}
// pede (sem esperar) uma lista de artes; devolve uma promessa que termina quando todas chegaram ou falharam
export function preCarregar(nomes) {
  return Promise.all(
    nomes
      .filter(n => MANIFESTO && MANIFESTO[n])
      .map(
        n =>
          new Promise<void>(ok => {
            const img = ARTE_IMG[n];
            if (!img || img.pronta || img.falhou || img.complete) return ok();
            img.addEventListener("load", ok, { once: true });
            img.addEventListener("error", ok, { once: true });
          })
      )
  );
}
export const artesQue = f => (MANIFESTO ? Object.keys(MANIFESTO).filter(f) : []);
// artes de um mapa: o reino (arte da abertura primeiro), o Guardião da era, a equipe, a Lenda/deus, chão dos elementos e efeitos
export function artesDoMapa(u: Universo) {
  if (!u) return [];
  const pre = `arte/reinos/${u.era}/`,
    ord = [
      "keyart",
      "piso",
      "tiles",
      "props",
      "inimigos",
      "pecas",
      "paredao",
      "objetos",
      "fauna",
      "fundo",
      "mini",
      "chefe",
      "efeitos",
      "anim"
    ];
  const reino = artesQue(n => n.startsWith(pre + u.id + "__") || n.startsWith(pre + "guardiao_" + u.era + "__")).sort((a, b) => {
    const i = (n: string | string[]) => {
      const k = ord.findIndex(o => n.includes("__" + o));
      return k < 0 ? 99 : k;
    };
    return i(a) - i(b);
  });
  const equipe = [];
  if (R)
    for (const s of R.selos) {
      if (!s.mon) continue;
      const l = LINHA[s.mon.id];
      if (!l) continue;
      const pasta = l.ancestral ? "arte/lendarios/" : `arte/monstros/${l.elemento}/`;
      equipe.push(...artesQue(n => n.startsWith(pasta + s.mon.id + "__")));
    }
  const lenda = typeof LENDA === "function" && LENDA();
  const extra = lenda ? artesQue(n => n === `arte/lendas/${lenda.id}.png` || n === `arte/panteao/${lenda.id}.png`) : [];
  return [...reino, ...equipe, ...extra, ...artesQue(n => n.startsWith("arte/ambiente/") || n.startsWith("arte/efeitos/reacao"))];
}
// artes em arquivos: arte/manifesto.json lista { "nome usado no código": "caminho do arquivo" }.
// Na abertura baixa só a interface e as imagens fixas dos monstros (menu e cartas); o resto vem por mapa ou quando for usado.
if (window.ARTE_MANIFESTO) {
  const av = document.createElement("div");
  av.style.cssText =
    "position:fixed;left:50%;top:calc(8px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:60;background:rgba(18,14,26,.88);color:#f2e7c9;border:1px solid #d6ab4f;padding:5px 12px;font:600 12px Nunito,system-ui,sans-serif;border-radius:4px;pointer-events:none;transition:opacity .4s";
  av.textContent = "Carregando artes…";
  (document.body || document.documentElement).appendChild(av);
  (async () => {
    try {
      const r = await fetch(window.ARTE_MANIFESTO, { cache: "no-cache" });
      MANIFESTO = await r.json();
      const UI_USADA =
        /^arte\/ui\/(ui__(botao_primario|botao_secundario|botoes_acao|hud_icones|logo|pacto|tela_horizontal|tela_vertical|camada_ceu|camada_criaturas|camada_frente|derrota|vitoria|refugio|livro)|talismas|insignias)\.png$/;
      const base = artesQue(
        n => UI_USADA.test(n) || /^arte\/monstros\/.*__base\.png$/.test(n) || /^arte\/lendarios\/.*__base\.png$/.test(n)
      );
      let feitos = 0;
      const total = base.length;
      // em blocos de 24 para não sufocar a rede do celular
      for (let i = 0; i < total; i += 24) {
        await preCarregar(base.slice(i, i + 24));
        feitos = Math.min(total, i + 24);
        av.textContent = `Carregando artes ${feitos}/${total}…`;
      }
      av.textContent = "Artes carregadas";
      setTimeout(() => {
        av.style.transition = "opacity .6s";
        av.style.opacity = "0";
        setTimeout(() => av.remove(), 700);
      }, 1200); // some sozinho (ficava em cima do logo)
      if (J && R) preCarregar(artesDoMapa(UNIV[R.universo]));
    } catch (e) {
      console.warn("manifesto de artes", e);
      av.textContent = "Sem artes: usando o desenho por código";
    }
    setTimeout(() => {
      av.style.opacity = "0";
      setTimeout(() => av.remove(), 450);
    }, 1800);
  })();
}
export function arteMonstro(id: string, e: number, ramo: number, rar: string) {
  const l = LINHA[id];
  if (!l) return null;
  if (l.ancestral) {
    const img = ARTE_IMG[`arte/lendarios/${id}__base.png`];
    if (!img || !img.pronta) return null;
    const k = `${id}|anc|${e}`;
    if (cacheArte.has(k)) return cacheArte.get(k);
    const cw = img.width / 5,
      c = encaixarArte(img, (e + 1) * cw, 0, cw, img.height, Math.round(ALVO_ARTE[e] * 1.15));
    cacheArte.set(k, c);
    return c;
  }
  const sufixo = rar === "lendario" ? "lendario" : rar === "epico" ? "epico" : "base";
  const img = ARTE_IMG[`arte/monstros/${l.elemento}/${id}__${sufixo}.png`] || ARTE_IMG[`arte/monstros/${l.elemento}/${id}__base.png`];
  if (!img || !img.pronta) return null;
  const celula = e <= 1 ? e : e === 2 ? 2 + (ramo ?? 0) : 5 + (ramo ?? 0),
    k = `${id}|${celula}|${sufixo}|${e}`;
  if (cacheArte.has(k)) return cacheArte.get(k);
  const cw = img.width / 4,
    ch = img.height / 2,
    c = encaixarArte(img, (celula % 4) * cw, Math.floor(celula / 4) * ch, cw, ch, ALVO_ARTE[e]);
  cacheArte.set(k, c);
  return c;
}
// ---------------------------------------------------------------- animação dos monstros
// Folhas arte/monstros/<el>/<id>__anim_N.png (N = forma 1..8), grade 6x3:
// linha 0 parado, linha 1 andando, linha 2 atacando (até 6 quadros cada).
// As folhas não seguem a grade à risca: o desenho de uma linha às vezes passa da marca de 1/3 (pés cortados,
// pedaço do quadro de cima aparecendo no de baixo). Por isso cada folha é "fatiada" uma vez: os cortes vão para a
// linha (e a coluna) vazia mais próxima da grade, e cada quadro é alinhado pelos pés e pelo centro do corpo.
export const FPS_ANIM = [5, 10, 12],
  cacheFatia = new Map();
// ritmo por classe: guardiões e místicos são calmos, assassinos e caçadores inquietos (o mesmo quadro ganha personalidade)
export const RITMO_CLASSE = {
  guardiao: 0.75,
  mistico: 0.85,
  xama: 0.9,
  mago: 0.9,
  invocador: 0.95,
  guerreiro: 1,
  cacador: 1.12,
  assassino: 1.25
};
// ataque com peso: segura o primeiro quadro (preparo), passa rápido pelo golpe e segura o último (impacto)
export function progressoAtaque(k: number) {
  return k < 0.3 ? k * 0.5 : k < 0.7 ? 0.15 + ((k - 0.3) / 0.4) * 0.75 : 0.9 + ((k - 0.7) / 0.3) * 0.1;
}
export const alfaDe = img => {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext("2d");
  g.drawImage(img, 0, 0);
  return g.getImageData(0, 0, c.width, c.height).data;
};
// melhor corte perto de "nom" (entre lo e hi): linha sem desenho vale muito mais do que ficar perto da grade
export function melhorCorte(cont, nom: number, lo: number, hi: number) {
  let best = nom,
    bc = 1e18;
  for (let b = Math.max(1, Math.round(lo)); b <= Math.min(cont.length - 1, Math.round(hi)); b++) {
    const c = (cont[b] > 0 ? 1e6 + cont[b] * 100 : 0) + Math.abs(b - nom);
    if (c < bc) {
      bc = c;
      best = b;
    }
  }
  return best;
}
export function fatiarFolha(img: Imagem, cols: number, rows: number, rigido?: boolean) {
  if (!img._id) img._id = novoIdImg();
  const k = img._id + "|" + cols + "x" + rows + (rigido ? "r" : "");
  if (cacheFatia.has(k)) return cacheFatia.get(k);
  // rigido: colunas na grade; o corte entre linhas só sai da grade para uma linha vazia a até 1/4 de célula
  const W = img.width,
    H = img.height,
    cw = W / cols,
    ch = H / rows;
  let d = null;
  try {
    d = alfaDe(img);
  } catch (e) {
    relatar("arte: folha não pôde ser lida para o recorte", e);
  }
  const cheio = (x: number, y: number) => d[(y * W + x) * 4 + 3] > 24;
  // cortes das linhas
  const lin = new Int32Array(H);
  if (d)
    for (let y = 0; y < H; y++) {
      let n = 0;
      for (let x = 0; x < W; x++) if (cheio(x, y)) n++;
      lin[y] = n;
    }
  let cy = [0];
  for (let r = 1; r < rows; r++) {
    if (rigido) {
      const b = d ? melhorCorte(lin, r * ch, r * ch - ch * 0.25, r * ch + ch * 0.25) : r * ch;
      cy.push(d && lin[b] === 0 ? b : Math.round(r * ch));
    } else cy.push(d ? melhorCorte(lin, r * ch, Math.max(cy[r - 1] + ch * 0.4, r * ch - ch * 0.5), r * ch + ch * 0.5) : Math.round(r * ch));
  }
  cy.push(H);
  // se alguma linha ficou sem desenho (folha com tudo deslocado), procura os dois cortes juntos exigindo desenho em cada faixa
  if (d && rows === 3 && !rigido) {
    const acum = new Float64Array(H + 1);
    for (let y = 0; y < H; y++) acum[y + 1] = acum[y] + lin[y];
    const tem = (a: number, b: number) => acum[b] - acum[a] > 0,
      custo = (b: number, nom: number) => (lin[b] > 0 ? 1e6 + lin[b] * 100 : 0) + Math.abs(b - nom);
    if (!tem(cy[0], cy[1]) || !tem(cy[1], cy[2]) || !tem(cy[2], cy[3])) {
      let bc = 1e18,
        b1 = cy[1],
        b2 = cy[2];
      for (let a = Math.round(ch * 0.3); a <= Math.round(ch * 1.7); a++) {
        if (!tem(0, a)) continue;
        for (let b = a + Math.round(ch * 0.3); b <= Math.min(H - 2, Math.round(ch * 2.7)); b++) {
          if (!tem(a, b) || !tem(b, H)) continue;
          const c = custo(a, ch) + custo(b, 2 * ch);
          if (c < bc) {
            bc = c;
            b1 = a;
            b2 = b;
          }
        }
      }
      cy = [0, b1, b2, H];
    }
  }
  const linhas = [];
  for (let r = 0; r < rows; r++) {
    const y0 = cy[r],
      y1 = cy[r + 1];
    const col = new Int32Array(W);
    if (d)
      for (let x = 0; x < W; x++) {
        let n = 0;
        for (let y = y0; y < y1; y++) if (cheio(x, y)) n++;
        col[x] = n;
      }
    const cx = [0];
    for (let c = 1; c < cols; c++)
      cx.push(
        d && !rigido ? melhorCorte(col, c * cw, Math.max(cx[c - 1] + cw * 0.4, c * cw - cw * 0.35), c * cw + cw * 0.35) : Math.round(c * cw)
      );
    cx.push(W);
    const qs = [];
    for (let c = 0; c < cols; c++) {
      const x0 = cx[c],
        x1 = cx[c + 1];
      let bx0 = x1,
        by0 = y1,
        bx1 = -1,
        by1 = -1,
        n = 0;
      if (d)
        for (let y = y0; y < y1; y++)
          for (let x = x0; x < x1; x++)
            if (cheio(x, y)) {
              n++;
              if (x < bx0) bx0 = x;
              if (x > bx1) bx1 = x;
              if (y < by0) by0 = y;
              if (y > by1) by1 = y;
            }
      if (!d) {
        bx0 = x0;
        by0 = y0;
        bx1 = x1 - 1;
        by1 = y1 - 1;
        n = 1;
      }
      if (bx1 >= 0) qs.push({ c, x0, x1, y0, y1, bx: bx0, by: by0, bw: bx1 - bx0 + 1, bh: by1 - by0 + 1, n, ref: c * cw });
    }
    // pedaços soltos (sobra do quadro vizinho) não contam como quadro
    const med = qs.length ? qs.map(q => q.n).sort((a, b) => a - b)[Math.floor(qs.length / 2)] : 0,
      ok = qs.filter(q => q.n >= med * 0.18);
    // pés = ponto mais baixo da linha; centro = mediana dos centros (cada quadro relativo à sua célula da grade)
    const pe = ok.length ? Math.max(...ok.map(q => q.by + q.bh)) : y1,
      cs = ok.map(q => q.bx + q.bw / 2 - q.ref).sort((a, b) => a - b),
      centro = cs.length ? cs[Math.floor(cs.length / 2)] : cw / 2;
    linhas.push({ qs: ok, pe, centro });
  }
  // tamanho do corpo (parado e andando alinhados pelos pés e pelo centro): define a escala da folha inteira
  let esq = 0,
    dir = 0,
    alto = 1;
  for (const L of linhas.slice(0, Math.min(2, rows)))
    for (const q of L.qs) {
      esq = Math.min(esq, q.bx - q.ref - L.centro);
      dir = Math.max(dir, q.bx + q.bw - q.ref - L.centro);
      alto = Math.max(alto, L.pe - q.by);
    }
  const f = { linhas, corpoW: Math.max(1, dir - esq), corpoH: alto, cw, ch, valida: !!d && linhas.length > 0 && linhas[0].qs.length > 0 };
  cacheFatia.set(k, f);
  return f;
}
// Épico e Lendário não têm folha de animação própria, mas têm a mesma pose da forma comum com outras cores:
// monta uma tabela de cores (comum -> raridade) com a célula fixa das duas e pinta os quadros da folha comum com ela.
// A tabela é suavizada (média com as cores vizinhas) e o brilho de cada pixel é mantido, para não perder o detalhe.
export const cacheRecor = new Map();
export function folhaRecolorida(anim, base, alvo, celula) {
  const k = (anim._id || (anim._id = novoIdImg())) + "|" + (alvo._id || (alvo._id = novoIdImg())) + "|" + celula;
  if (cacheRecor.has(k)) return cacheRecor.get(k);
  let out = null;
  try {
    const cel = im => {
      const cw = im.width / 4,
        ch = im.height / 2,
        c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const g = c.getContext("2d");
      g.imageSmoothingEnabled = false;
      g.drawImage(im, (celula % 4) * cw, Math.floor(celula / 4) * ch, cw, ch, 0, 0, 64, 64);
      return g.getImageData(0, 0, 64, 64).data;
    };
    const b = cel(base),
      e = cel(alvo),
      N = 16,
      N3 = N * N * N,
      chave = (d, i: number) => ((d[i] >> 4) * N + (d[i + 1] >> 4)) * N + (d[i + 2] >> 4);
    // desenho da raridade muito diferente do comum (formas que se sobrepõem pouco): a troca de cores sairia borrada; usa a imagem fixa
    let uni = 0,
      inter = 0;
    for (let i = 3; i < b.length; i += 4) {
      const x = b[i] > 40,
        y = e[i] > 40;
      if (x || y) uni++;
      if (x && y) inter++;
    }
    if (!uni || inter / uni < 0.72) throw 0;
    let n = new Float32Array(N3),
      s = new Float32Array(N3 * 3),
      m = new Float32Array(N3 * 3);
    for (let i = 0; i < b.length; i += 4) {
      if (b[i + 3] < 160 || e[i + 3] < 160) continue;
      const q = chave(b, i);
      n[q]++;
      for (let c = 0; c < 3; c++) {
        s[q * 3 + c] += e[i + c];
        m[q * 3 + c] += b[i + c];
      }
    }
    // caixa 3D separável (borda repetida), para espalhar as cores conhecidas para as vizinhas
    const caixa = (a, comp: number, r: number) => {
      let src = a;
      for (let eixo = 0; eixo < 3; eixo++) {
        const o = new Float32Array(src.length),
          st = eixo === 0 ? N * N : eixo === 1 ? N : 1;
        for (let i = 0; i < N3; i++) {
          const p = Math.floor(i / st) % N;
          for (let c = 0; c < comp; c++) {
            let t = 0;
            for (let j = -r; j <= r; j++) {
              const pp = Math.min(N - 1, Math.max(0, p + j));
              t += src[(i + (pp - p) * st) * comp + c];
            }
            o[i * comp + c] = t;
          }
        }
        src = o;
      }
      return src;
    };
    const L = new Float32Array(N3 * 3),
      M = new Float32Array(N3 * 3),
      feito = new Uint8Array(N3);
    for (const r of [0, 1, 2, 4, 8, 16]) {
      const nn = r ? caixa(n, 1, r) : n,
        ss = r ? caixa(s, 3, r) : s,
        mm = r ? caixa(m, 3, r) : m;
      for (let i = 0; i < N3; i++)
        if (!feito[i] && nn[i] > 1e-6) {
          feito[i] = 1;
          for (let c = 0; c < 3; c++) {
            L[i * 3 + c] = ss[i * 3 + c] / nn[i];
            M[i * 3 + c] = mm[i * 3 + c] / nn[i];
          }
        }
    }
    const c = document.createElement("canvas");
    c.width = anim.width;
    c.height = anim.height;
    const g = c.getContext("2d");
    g.drawImage(anim, 0, 0);
    const im = g.getImageData(0, 0, c.width, c.height),
      d = im.data;
    for (let i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue;
      const q = chave(d, i),
        lum = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11,
        lm = M[q * 3] * 0.3 + M[q * 3 + 1] * 0.59 + M[q * 3 + 2] * 0.11,
        dl = lum - lm;
      d[i] = L[q * 3] + dl;
      d[i + 1] = L[q * 3 + 1] + dl;
      d[i + 2] = L[q * 3 + 2] + dl;
    }
    g.putImageData(im, 0, 0);
    c.pronta = true;
    c._id = novoIdImg();
    out = c;
  } catch (err) {
    out = null;
  }
  cacheRecor.set(k, out);
  return out;
}
// As folhas dos dragões ancestrais vieram de originais 3:2 (1536x1024) reduzidos para 2:1 (384x192): o desenho ficou 25% mais baixo.
// Enquanto não forem convertidas de novo (ferramentas/converter_artes mantém a proporção), a altura é corrigida aqui.
// folhas que a conversão antiga achatou: originais em 3:2 (1536x1024) foram forçados ao tamanho antigo, e o desenho ficou
// 25% mais baixo (ou 33% mais largo). Reconhecidas pelo caminho E pelo tamanho exato da conversão antiga: uma arte
// reconvertida com a proporção certa tem outro tamanho e não é esticada. Medido comparando escudos redondos e corpos.
/** padrão do nome e tamanho do arquivo achatado */
export const ARTE_ACHATADA: [RegExp, number, number][] = [
  [/^arte\/monstros\/.*__anim_\d+\.png$/, 384, 192],
  [/^arte\/monstros\/.*__(base|epico|lendario)\.png$/, 256, 128],
  [/^arte\/lendarios\/.*__anim_\d+\.png$/, 384, 192],
  [/^arte\/(lendas|panteao)\/[a-z0-9_]+\.png$/, 384, 192],
  [/^arte\/reinos\/.*__inimigos\.png$/, 384, 288],
  [/^arte\/reinos\/.*__mini\.png$/, 384, 320],
  [/^arte\/reinos\/.*__chefe\.png$/, 576, 576],
  [/^arte\/reinos\/.*guardiao_[a-z_]+__anim\.png$/, 576, 576]
];
export function correcaoAltura(img) {
  if (!img) return 1;
  if (img._ky != null) return img._ky;
  let k = 1;
  for (const [n, i] of Object.entries(ARTE_IMG))
    if (i === img) {
      if (!/__retrato\.png$/.test(n) && ARTE_ACHATADA.some(([re, w, h]) => re.test(n) && img.width === w && img.height === h)) k = 4 / 3;
      break;
    }
  return (img._ky = k);
}
// quadro (linha, índice do quadro) da folha, num canvas quadrado com folga: corpo na escala "alvo", pés na mesma linha em todos
export const FOLGA_ANIM = 1.6;
export function quadroAnim(img: Imagem, row: number, i: number, alvo: number, cor?: Imagem | null, rows?: number, folga?: number) {
  rows = rows || 3;
  folga = folga || FOLGA_ANIM;
  const fo = cor || img,
    k = (fo._id || (fo._id = novoIdImg())) + "|q" + row + "|" + i + "|" + alvo + "|" + rows + "|" + folga;
  if (cacheArte.has(k)) return cacheArte.get(k);
  const f = fatiarFolha(img, 6, rows),
    L = f.linhas[row],
    q = L && L.qs[i];
  if (!q) return null;
  const ky = correcaoAltura(img),
    s = Math.min(alvo / f.corpoW, alvo / (f.corpoH * ky)),
    A = Math.round(alvo * folga),
    peD = A / 2 + alvo / 2;
  let dx = A / 2 + (q.x0 - q.ref - L.centro) * s,
    dy = peD + (q.y0 - L.pe) * s * ky;
  const dw = (q.x1 - q.x0) * s,
    dh = (q.y1 - q.y0) * s * ky;
  if (Math.abs(s - 1) < 1e-6 && ky === 1) {
    dx = Math.round(dx);
    dy = Math.round(dy);
  }
  const c = document.createElement("canvas");
  c.width = c.height = A;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.drawImage(fo, q.x0, q.y0, q.x1 - q.x0, q.y1 - q.y0, dx, dy, dw, dh);
  c._src = { img: fo, sx: q.x0, sy: q.y0, sw: q.x1 - q.x0, sh: q.y1 - q.y0, dest: [dx / A, dy / A, dw / A, dh / A] };
  c._alvo = alvo;
  c._pe = peD;
  cacheArte.set(k, c);
  return c;
}
// folha de animação da forma atual (com as cores da raridade), ou null
export function folhaAnimMonstro(id: string, e: number, ramo: number, rar: string) {
  const l = LINHA[id];
  if (!l) return null;
  if (l.ancestral) {
    const img = ARTE_IMG[`arte/lendarios/${id}__anim_${e + 1}.png`];
    return img && img.pronta && fatiarFolha(img, 6, 3).valida ? { img, cor: null } : null;
  }
  const celula = e <= 1 ? e : e === 2 ? 2 + (ramo ?? 0) : 5 + (ramo ?? 0),
    img = ARTE_IMG[`arte/monstros/${l.elemento}/${id}__anim_${celula + 1}.png`];
  if (!img || !img.pronta || !fatiarFolha(img, 6, 3).valida) return null;
  if (rar !== "epico" && rar !== "lendario") return { img, cor: null };
  const base = ARTE_IMG[`arte/monstros/${l.elemento}/${id}__base.png`],
    alvo = ARTE_IMG[`arte/monstros/${l.elemento}/${id}__${rar}.png`];
  if (!base || !base.pronta || !alvo || !alvo.pronta) return null;
  const cor = folhaRecolorida(img, base, alvo, celula);
  return cor ? { img, cor } : null;
}
// o relógio do mapa (J.t) recomeça a cada mapa: horários guardados do mapa anterior viram valores negativos
// (o golpe "durava" para sempre e esticava o monstro para fora da tela). Zera tudo ao começar um mapa.
export function resetAnimSelo(s: Selo) {
  s.atkT = null;
  s._t0 = 0;
  s._row = null;
  s._ax = s._ay = s._at = null;
  s._td = null;
  s._tf = null;
  s._vel = 0;
  s._vx = 0;
  s._fase = 0;
  s._pop = 0;
  s._vira = 0;
}
// estado de movimento de um Selo (velocidade suavizada, ataque, direção): usado pela animação e pelos efeitos de corpo
export function movSelo(s: Selo) {
  const dtA = J.t - (s._at ?? J.t),
    dx = s._ax == null ? 0 : s.x - s._ax,
    dy = s._ay == null ? 0 : s.y - s._ay,
    d = Math.hypot(dx, dy);
  s._ax = s.x;
  s._ay = s.y;
  s._at = J.t;
  if (dtA > 0 && d < 25) {
    const k = Math.min(1, dtA * 14);
    s._vel = (s._vel || 0) * (1 - k) + (d / dtA) * k;
    s._vx = (s._vx || 0) * (1 - k) + (dx / dtA) * k;
  }
}
// quadro atual do monstro de um Selo, ou null (sem folha de animação: usa a imagem fixa)
export function quadroAnimSelo(s) {
  if (SIM.ativo || !J || !s.mon) return null;
  const e = est(s),
    fa = folhaAnimMonstro(s.mon.id, e, ramoAtual(s), s.mon.rar);
  if (!fa) return null;
  const f = fatiarFolha(fa.img, 6, 3),
    nAtk = f.linhas[2] ? f.linhas[2].qs.length : 0;
  let row = s.atkT != null && nAtk >= 2 && J.t >= s.atkT && J.t - s.atkT < nAtk / FPS_ANIM[2] ? 2 : (s._vel || 0) > 6 ? 1 : 0;
  if (!f.linhas[row] || f.linhas[row].qs.length < 2) row = 0;
  const n = f.linhas[row].qs.length;
  if (n < 1) return null;
  if (row !== 1) {
    const alvo = maisProximo(s, 160);
    if (alvo) s.esq = alvo.x < s.x;
  } else if (Math.abs(s._vx || 0) > 3) s.esq = s._vx < 0;
  if (row !== s._row) {
    s._row = row;
    s._t0 = J.t;
    s._fase = 0;
  }
  // andando: a cadência acompanha a velocidade (pés não "patinam" no chão)
  const dtF = Math.min(0.1, Math.max(0, J.t - (s._tf ?? J.t)));
  s._tf = J.t;
  if (row === 1) s._fase = (s._fase || 0) + dtF * FPS_ANIM[1] * Math.max(0.6, Math.min(1.8, (s._vel || 0) / 45));
  const rc = RITMO_CLASSE[L(s).classe] || 1,
    alvoA = ALVO_ARTE[e] * (LINHA[s.mon.id].ancestral ? 1.15 : 1);
  let fr,
    prox = null,
    mix = 0;
  if (row === 2) {
    const dur = (n / (FPS_ANIM[2] * rc)) * 1.25,
      k = Math.min(1, (J.t - s._t0) / dur);
    fr = Math.min(n - 1, Math.floor(progressoAtaque(k) * n));
  } else if (row === 1) {
    fr = Math.floor(s._fase) % n;
    if (QUAL > 0) {
      prox = quadroAnim(fa.img, row, (fr + 1) % n, alvoA, fa.cor);
      mix = (s._fase % 1) * 0.7;
    }
  } // andando: também mistura com o próximo passo
  else {
    // parado: vai e volta pelos quadros (0,1,2,3,2,1...), num ritmo próprio de cada monstro, com mistura suave entre um quadro e o próximo
    const per = Math.max(1, 2 * n - 2),
      pos = ((J.t - s._t0) * FPS_ANIM[0] * rc * (0.9 + (0.2 * ((s.mon.id.length * 7) % 5)) / 5)) % per,
      a = Math.floor(pos),
      b = (a + 1) % per,
      ida = (i: number) => (i < n ? i : per - i);
    fr = ida(a);
    if (QUAL > 0) {
      prox = quadroAnim(fa.img, row, ida(b), alvoA, fa.cor);
      mix = pos - a;
    }
  }
  const q = quadroAnim(fa.img, row, fr, alvoA, fa.cor);
  if (q) {
    s._prox = prox;
    s._mix = mix;
  }
  return q;
}
