// GERADO por "npm run compilar" a partir de src/jogo/08i_relatorio.ts. Edite o .ts, não este arquivo.
// Elementar · relatório da partida: as mesmas medidas do robô, registradas no jogo de verdade, para copiar na tela de fim.
// O formato é o do robô (testes/bot.js): horda por mapa com a curva de inimigos na tela, chefe e vida por mapa, escolhas, dano
// por fonte e por monstro. Assim as partidas de quem joga entram no mesmo resumo das simulações (python3 testes/resumo.py) e dá
// para ver se o que o robô mede vale para uma pessoa. Fica tudo no aparelho: nada é enviado para lugar nenhum.
import "./08h_interface.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { elementoDe, est, J, L, R, SIM } from "./01_nucleo.js";
import { toast } from "./10_desenho.js";
// ================================================================ relatório da partida
const MAX_ESCOLHAS = 400;
/** o registro desta run; nulo no robô (que tem o próprio) e fora de partida */
function rel() {
  if (SIM.ativo || !R || !R.st) return null;
  return (R.st.rel ??= { mapas: [], escolhas: [], t0: Date.now() });
}
function mapaAtual(r) {
  const n = R.profundidade + 1;
  let m = r.mapas[r.mapas.length - 1];
  if (!m || m.mapa !== n) {
    if (m) fecharMapa(m);
    m = {
      mapa: n,
      universo: R.universo,
      nivel0: J.nivel,
      abates0: R.abates,
      soma: [0, 0, 0, 0, 0],
      n: [0, 0, 0, 0, 0],
      pico: 0,
      vidaMin: 1,
      amostras: 0,
      baixa: 0,
      vazia: 0
    };
    r.mapas.push(m);
  }
  return m;
}
function fecharMapa(m) {
  if (m.niveis == null && J) {
    m.niveis = J.nivel - m.nivel0;
    m.abates = R.abates - m.abates0;
  }
}
/** faixa de tempo dentro do mapa, a mesma do robô: 0-15 s, 15-30, 30-60, 60-90, 90+ */
function faixa(t) {
  return t < 15 ? 0 : t < 30 ? 1 : t < 60 ? 2 : t < 90 ? 3 : 4;
}
const arred = (v, casas = 1) => +v.toFixed(casas);
/** amostra de meio em meio segundo (o diretor de horda já contou os inimigos na tela) */
export function relatorioAmostra(naTela, vida) {
  const r = rel();
  if (!r || !J || J.intro || J.fim) return;
  const m = mapaAtual(r),
    f = faixa(J.t);
  m.soma[f] += naTela;
  m.n[f]++;
  m.amostras++;
  m.pico = Math.max(m.pico, naTela);
  m.vidaMin = Math.min(m.vidaMin, vida);
  if (vida < 0.35) m.baixa++;
  if (naTela < 6 && !J.chefeVivo) m.vazia++;
}
/** carta escolhida em qualquer tela (subida de nível, especial, baú, portal...) */
export function relatorioEscolha(tela, carta) {
  const r = rel();
  if (!r || r.fechado || r.escolhas.length >= MAX_ESCOLHAS) return;
  const limpo = h => h.replace(/<[^>]*>/g, "").trim();
  r.escolhas.push(`${limpo(tela)} → ${limpo(carta)}`);
}
const inteiros = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Math.round(v)]));
/** fim da run: fecha o registro e devolve o relatório completo, no formato de um resultado do robô (uma lista com uma run) */
export function fecharRelatorio() {
  const r = rel(),
    st = R && R.st;
  if (!r || !st) return "";
  if (r.mapas.length) fecharMapa(r.mapas[r.mapas.length - 1]);
  r.fechado = true;
  const morreu = !!J && J.vida <= 0;
  const dados = {
    origem: "jogo",
    data: new Date().toISOString().slice(0, 16),
    pacto: R.pacto,
    profundidade: R.profundidade,
    morreu,
    mapaMorte: morreu ? R.profundidade + 1 : null,
    tNoMapaMorte: morreu && J ? Math.round(J.t) : null,
    minutos: arred((Date.now() - r.t0) / 60000),
    nivel: J ? J.nivel : 0,
    abates: R.abates,
    mapas: st.mapas,
    vidaMin: r.mapas.map(m => arred(m.vidaMin, 2)),
    porFonte: inteiros(st.porFonte),
    porMonstro: inteiros(st.porMonstro || {}),
    reacoes: st.reacoes,
    recContato: Math.round(st.recContato),
    recBala: Math.round(st.recBala),
    reliquias: R.reliquias.slice(),
    equipe: R.selos
      .filter(s => s.mon)
      .map(s => ({
        id: s.mon.id,
        classe: L(s).classe,
        el: elementoDe(s),
        est: est(s),
        nivel: s.nivel,
        ramo: s.mon.ramo,
        rar: s.mon.rar
      })),
    talismas: Object.values(R.talismas || {}).reduce((a, b) => a + b, 0),
    despertos: st.despertos || 0,
    unioes: st.unioes || 0,
    elementais: st.elementais || 0,
    elementos: Object.assign({}, R.elementais || {}),
    horda: r.mapas.map(m => ({
      mapa: m.mapa,
      tela: m.amostras ? arred(m.soma.reduce((a, b) => a + b, 0) / m.amostras) : 0,
      picoTela: m.pico,
      picoTotal: m.pico,
      abates: m.abates ?? 0,
      niveis: m.niveis ?? 0,
      vidaBaixa: m.amostras ? arred(m.baixa / m.amostras, 3) : 0,
      telaVazia: m.amostras ? arred(m.vazia / m.amostras, 3) : 0,
      seg: Math.round(m.amostras * 0.5),
      curva: m.soma.map((s, i) => (m.n[i] ? arred(s / m.n[i]) : null))
    })),
    escolhas: r.escolhas
  };
  return JSON.stringify([dados]);
}
/** copia um relatório já pronto (ou mostra o texto para copiar à mão, se o navegador não deixar) */
export function copiarRelatorio(texto) {
  if (!texto) return toast("Sem relatório desta partida.");
  const mostrar = () => {
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.readOnly = true;
    ta.className = "relatorio-copiar";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.onblur = () => ta.remove();
    toast("Selecione e copie o relatório.");
  };
  if (navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard
      .writeText(texto)
      .then(() => toast("Relatório copiado. Cole numa conversa para comparar com as simulações."), mostrar);
  else mostrar();
}
