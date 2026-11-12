// Elementar · menu, Pacto, pausa e modo moderador; começa o jogo
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./10_desenho.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import {
  $,
  ativos,
  CHAVE,
  classeExtraDe,
  COR,
  defMeta,
  defPausado,
  defRodando,
  defRunSalva,
  elementoDe,
  ELS,
  embaralhar,
  estBase,
  gravar,
  hexRgb,
  J,
  L,
  liberadosIniciais,
  LINHA,
  linhagemDe,
  lojaAcessivel,
  MAPA_SEG,
  MAPAS_POR_ERA,
  META,
  NIV,
  NOME_EL,
  nomeForma,
  novaRun,
  PLAT,
  R,
  redimensionar,
  RUN_SALVA,
  SIN,
  som,
  somLigar,
  spriteLinha,
  telaSantuario,
  tom
} from "./01_nucleo.js";
import { iniciarMapa } from "./02_combate.js";
import {
  carregarRun,
  checarEvolucao,
  diarias,
  fechar,
  FORMAS_TOTAL,
  formasVistas,
  mostrarCartas,
  mostrarPortais,
  quadrosRetrato,
  resumoPoderes,
  telaBestiario,
  telaDiarias
} from "./03_progressao.js";
import { ARTE_IMG, MANIFESTO, preCarregar } from "./05_arte.js";
import { passo } from "./06_loop.js";
import { checarGlobais, metaConq, telaConquistas } from "./08e_conquistas.js";
import { metaDeuses, telaInvocador } from "./08f_lendas.js";
import { aplicarArteUI, UI_ARQ } from "./08h_interface.js";
import { desenharEquipe, toast } from "./10_desenho.js";
// ================================================================ menu, Pacto, pausa
export function pausar() {
  if (!J) return;
  defPausado(true);
  mostrarCartas("Pausado", `Profundidade ${R.profundidade} · Pacto: ${R.pacto.map(NOME_EL).join(", ")}`, [
    {
      titulo: "Continuar",
      texto: "Voltar ao mapa.",
      acao: () => {
        defPausado(false);
      }
    },
    {
      titulo: "Ver equipe e sinergias",
      manter: true,
      texto:
        (SIN.chips.join(" · ") || "Nenhuma sinergia ativa ainda.") +
        "<br>" +
        ativos()
          .map(
            s =>
              `${nomeForma(s)} (nv ${s.nivel}): ${NOME_EL(elementoDe(s))}, ${D.classes[L(s).classe].nome}${classeExtraDe(s) ? " + " + D.classes[classeExtraDe(s)].nome : ""}, ${D.linhagens[linhagemDe(s)].nome}. ${resumoPoderes(s)}`
          )
          .join("<br>"),
      acao: () => pausar()
    },
    {
      titulo: `Escolher todo nível: ${META.escolhaManual ? "sim" : "não"}`,
      texto: "Desligado: em metade dos níveis a melhor carta entra sozinha.",
      manter: true,
      acao: () => {
        META.escolhaManual = !META.escolhaManual;
        gravar();
        pausar();
      }
    },
    {
      titulo: `Som: ${META.som && META.som.mudo ? "desligado" : "ligado"}`,
      texto: "Toque para ligar ou desligar os efeitos sonoros.",
      manter: true,
      acao: () => {
        META.som = META.som || {};
        META.som.mudo = !META.som.mudo;
        gravar();
        somLigar();
        som("ding");
        pausar();
      }
    },
    ...(MODERADOR_DISPONIVEL && META.moderador
      ? [{ titulo: "Ferramentas de teste", texto: "Níveis, evolução, chefe, invencível...", manter: true, acao: () => telaFerramentas() }]
      : []),
    {
      titulo: "Sair e salvar",
      texto: "A run recomeça do início deste mapa.",
      acao: () => {
        defRodando(false);
        menu();
      }
    }
  ]);
}
export function menu() {
  defRodando(false);
  fechar();
  $("telaMenu").classList.add("ativa");
  $("hud").style.display = "none";
  $("hudBase").style.display = "none";
  $("combo").classList.remove("vis");
  $("metaEss").textContent = `Essência: ${META.essencia}`;
  $("metaProf").textContent = `Recorde: ${META.recorde} mapas`;
  $("metaCol").textContent = `Coleção: ${META.liberados.length}/${D.linhas.length}`;
  const box = $("menuBotoes");
  box.innerHTML = "";
  if (RUN_SALVA) {
    const b = document.createElement("button");
    b.className = "botao";
    b.textContent = `Continuar run (mapa ${RUN_SALVA.profundidade + 1})`;
    b.onclick = () => {
      $("telaMenu").classList.remove("ativa");
      carregarRun(RUN_SALVA);
      iniciarMapa();
    };
    box.appendChild(b);
  }
  const n = document.createElement("button");
  n.className = "botao" + (RUN_SALVA ? " sec" : "");
  n.textContent = "Nova run: fechar Pacto";
  n.onclick = telaPacto;
  box.appendChild(n);
  {
    const pode = lojaAcessivel().length,
      sa = document.createElement("button");
    sa.className = "botao" + (pode ? "" : " sec");
    sa.textContent = `Santuário (${META.essencia} de Essência)${pode ? ` · ${pode} melhoria${pode > 1 ? "s" : ""} disponível${pode > 1 ? "is" : ""}` : ""}`;
    sa.onclick = telaSantuario;
    box.appendChild(sa);
  }
  metaConq();
  META.cont.colecao = META.liberados.length;
  checarGlobais("colecao");
  {
    const D2 = diarias(),
      f = D2.lista.filter(m => m.feito).length,
      bm = document.createElement("button");
    bm.className = "botao" + (f < 3 ? "" : " sec");
    bm.textContent = `Missões do dia (${f}/3)${D2.seq ? ` · ${D2.seq} dia${D2.seq > 1 ? "s" : ""} seguido${D2.seq > 1 ? "s" : ""}` : ""}`;
    bm.onclick = telaDiarias;
    box.appendChild(bm);
  }
  {
    const bd = document.createElement("button");
    bd.className = "botao sec";
    bd.textContent = `Bestiário (${formasVistas()}/${FORMAS_TOTAL()} formas)`;
    bd.onclick = telaBestiario;
    box.appendChild(bd);
  }
  const cq = document.createElement("button");
  cq.className = "botao sec";
  cq.textContent = `Conquistas e Lendas (${Object.keys(META.conq).length}/${D.conquistas.length})`;
  cq.onclick = telaConquistas;
  box.appendChild(cq);
  if (MODERADOR_DISPONIVEL && META.moderador) {
    const md = document.createElement("button");
    md.className = "botao sec";
    md.textContent = "Modo moderador";
    md.onclick = telaModerador;
    box.appendChild(md);
  }
  {
    const IC = [
      ["Continuar", "▶"],
      ["Nova run", "⚔"],
      ["Santuário", "⛩"],
      ["Missões", "☀"],
      ["Bestiário", "❖"],
      ["Conquistas", "♛"],
      ["Modo moderador", "⚙"]
    ];
    for (const b of box.children as HTMLCollectionOf<HTMLElement>) {
      const ic = IC.find(([t]) => b.textContent.startsWith(t));
      b.dataset.icone = ic ? ic[1] : "✦";
    }
  } // ícone de cada botão
  gravar();
}
// ================================================================ modo moderador (testes)
// Escondido: toque 5 vezes no título do menu, ou abra o jogo com ?moderador no endereço.
// Desligue MODERADOR_DISPONIVEL na versão que vai para a Steam.
export const MODERADOR_DISPONIVEL = true;
export const CHAVE_BACKUP = CHAVE + "_antes_moderador";
if (MODERADOR_DISPONIVEL) {
  if (/[?&](moderador|mod)\b/.test(location.search)) META.moderador = true;
  let toques = 0,
    ultimo = 0;
  document.querySelector("#telaMenu h1")?.addEventListener("click", () => {
    const t = performance.now();
    toques = t - ultimo < 600 ? toques + 1 : 1;
    ultimo = t;
    if (toques >= 5) {
      toques = 0;
      META.moderador = true;
      gravar();
      toast("Modo moderador liberado");
      menu();
    }
  });
}
export function backupModerador() {
  if (!PLAT.lerSave(CHAVE_BACKUP)) PLAT.gravarSave(CHAVE_BACKUP, JSON.stringify({ meta: META, run: RUN_SALVA }));
  META.modUsado = true;
}
export function telaModerador() {
  $("telaMenu").classList.remove("ativa");
  metaConq();
  metaDeuses();
  const talismas = [...new Set(D.conquistas.map(c => c.talisma).filter(Boolean))],
    temBackup = !!PLAT.lerSave(CHAVE_BACKUP);
  const feito = (msg: string) => {
    gravar();
    toast(msg);
    telaModerador();
  };
  mostrarCartas("Modo moderador", "Ferramentas de teste. O save de antes da primeira mudança fica guardado e pode ser restaurado aqui.", [
    {
      titulo: `Liberar todos os monstros (${META.liberados.length}/${D.linhas.length})`,
      texto: "Todas as linhas evolutivas aparecem no Pacto, nos ovos e nos filhotes.",
      raridade: "raro",
      manter: true,
      acao: () => {
        backupModerador();
        META.liberados = [...new Set([...META.liberados, ...D.linhas.map(l => l.id)])];
        feito("Todos os monstros liberados");
      }
    },
    {
      titulo: `Liberar todas as Lendas (${META.lendas.length}/${D.lendas.length})`,
      texto: "Todas podem ser escolhidas como Invocador.",
      raridade: "epico",
      manter: true,
      acao: () => {
        backupModerador();
        META.lendas = [...new Set([...META.lendas, ...D.lendas.map(l => l.universo)])];
        feito("Todas as Lendas liberadas");
      }
    },
    {
      titulo: `Liberar o Panteão (${META.deuses.length}/${D.panteao.length})`,
      texto: "Todos os deuses podem ser escolhidos como Invocador.",
      raridade: "lendario",
      manter: true,
      acao: () => {
        backupModerador();
        META.deuses = [...new Set([...META.deuses, ...D.panteao.map(g => g.id)])];
        feito("Panteão liberado");
      }
    },
    {
      titulo: `Liberar todos os Talismãs (${META.talismas.length}/${talismas.length})`,
      texto: "",
      raridade: "incomum",
      manter: true,
      acao: () => {
        backupModerador();
        META.talismas = [...new Set([...META.talismas, ...talismas])];
        feito("Talismãs liberados");
      }
    },
    {
      titulo: "+10.000 de Essência",
      texto: `Agora: ${META.essencia}`,
      manter: true,
      acao: () => {
        backupModerador();
        META.essencia += 10000;
        feito("+10.000 de Essência");
      }
    },
    {
      titulo: "Liberar tudo",
      texto: "Monstros, Lendas, Panteão, Talismãs e +10.000 de Essência.",
      raridade: "lendario",
      manter: true,
      acao: () => {
        backupModerador();
        META.liberados = [...new Set([...META.liberados, ...D.linhas.map(l => l.id)])];
        META.lendas = [...new Set([...META.lendas, ...D.lendas.map(l => l.universo)])];
        META.deuses = [...new Set([...META.deuses, ...D.panteao.map(g => g.id)])];
        META.talismas = [...new Set([...META.talismas, ...talismas])];
        META.essencia += 10000;
        feito("Tudo liberado");
      }
    },
    {
      titulo: "Restaurar save de antes",
      texto: temBackup ? "Volta ao progresso de antes do modo moderador." : "Nenhuma mudança feita ainda.",
      desab: !temBackup,
      manter: true,
      acao: () => {
        if (!confirm("Voltar ao save de antes do modo moderador? O que foi liberado aqui some.")) return;
        try {
          const s = JSON.parse(PLAT.lerSave(CHAVE_BACKUP));
          defMeta(Object.assign({ essencia: 0, recorde: 0, liberados: liberadosIniciais() }, s.meta || {}));
          defRunSalva(s.run || null);
        } catch (e) {
          return toast("Backup ilegível");
        }
        META.moderador = true;
        PLAT.gravarSave(CHAVE_BACKUP, "");
        feito("Save restaurado");
      }
    },
    {
      titulo: "Testar uma Lenda ou um deus",
      texto: "Começa uma partida com ela no comando e uma equipe de nível 12.",
      raridade: "lendario",
      acao: () => telaTesteLenda()
    },
    {
      titulo: "Testar um Dragão Ancestral",
      texto: "Começa uma partida com o dragão na equipe, na forma que escolher.",
      raridade: "lendario",
      acao: () => telaTesteDragao()
    },
    {
      titulo: "Esconder modo moderador",
      texto: "Tire o botão do menu (toque 5 vezes no título para voltar).",
      manter: true,
      acao: () => {
        META.moderador = false;
        gravar();
        fechar();
        menu();
      }
    },
    { titulo: "Voltar", texto: "", acao: () => menu() }
  ]);
  $("telaCartas").classList.add("ativa");
}
// ---------------------------------------------------------------- testes do moderador: Lendas, deuses e Dragões Ancestrais
export function equipeTeste(pacto: string | string[], nivel: number) {
  const pool = D.linhas.filter(l => pacto.includes(l.elemento)).map(l => l.id);
  return embaralhar(pool)
    .slice(0, 3)
    .map(id => ({ id, nivel }));
}
export function comecarTeste(pacto: string[], equipe, lenda?: string) {
  backupModerador();
  fechar();
  $("telaMenu").classList.remove("ativa");
  novaRun(pacto, equipe[0].id);
  R.teste = true;
  equipe.forEach((m, i) => {
    const s = R.selos[i];
    s.mon = { id: m.id, rar: m.rar || "comum", ramo: m.ramo ?? null };
    s.nivel = m.nivel || 1;
    s.pod = { b: Math.min(5, 1 + Math.floor(s.nivel / 4)), h1: s.nivel >= NIV[1] ? 2 : 0, h2: s.nivel >= NIV[2] ? 2 : 0 };
  });
  if (equipe.some(m => m.supremo)) R.chefesVencidos = 1;
  if (lenda) {
    R.lenda = lenda;
    R.lendaNv = 5;
  }
  iniciarMapa();
}
export function telaTesteLenda() {
  const todas = [...D.lendas, ...D.panteao];
  mostrarCartas(
    "Testar Lenda ou deus",
    "A partida de teste não conta para o recorde.",
    [
      ...todas.map(l => ({
        titulo: l.nome,
        raridade: l.dom ? "lendario" : "epico",
        texto: `${NOME_EL(l.elementos[0])} e ${NOME_EL(l.elementos[1])} · ${l.poder.nome} (nível 5)${l.dom ? ` · Dom: ${l.dom.nome}` : ""}`,
        acao: () => comecarTeste(l.elementos.slice(0, 2), equipeTeste(l.elementos, 12), l.id)
      })),
      { titulo: "Voltar", texto: "", acao: () => telaModerador() }
    ],
    { grade: true }
  );
}
export function telaTesteDragao() {
  const anc = D.ancestrais || [];
  mostrarCartas(
    "Testar Dragão Ancestral",
    "Escolha o dragão.",
    [
      ...anc.map(l => ({
        titulo: l.filhote || l.id,
        sprite: spriteLinha(l.id, "lendario"),
        raridade: "lendario",
        texto: `${NOME_EL(l.elemento)} · ${l.ovo || ""}`,
        acao: () =>
          mostrarCartas(
            l.filhote || l.id,
            "Em qual forma?",
            (
              [
                ["Filhote", 1],
                ["Jovem", NIV[1]],
                ["Adulto", NIV[2]],
                ["Supremo", NIV[3]]
              ] as [string, number][]
            ).map(([n, nv]) => ({
              titulo: n,
              texto: `Nível ${nv}`,
              acao: () => {
                const outros = equipeTeste([l.elemento], nv)
                  .filter(m => m.id !== l.id)
                  .slice(0, 2);
                comecarTeste(
                  [l.elemento, ELS.find(e => e !== l.elemento)],
                  [{ id: l.id, nivel: nv, rar: "lendario", ramo: nv >= NIV[2] ? 0 : null, supremo: nv >= NIV[3] }, ...outros]
                );
              }
            }))
          )
      })),
      { titulo: "Voltar", texto: "", acao: () => telaModerador() }
    ],
    { grade: true }
  );
}
// ferramentas dentro da partida (menu de pausa)
export function telaFerramentas() {
  const feito = (m: string) => {
    toast(m);
    defPausado(false);
    fechar();
  };
  mostrarCartas("Ferramentas de teste", "Só no modo moderador.", [
    {
      titulo: "+5 níveis na equipe",
      texto: "",
      acao: () => {
        ativos().forEach(s => {
          const antes = estBase(s);
          s.nivel += 5;
          if (s.mon.ramo == null && s.nivel >= NIV[2]) s.mon.ramo = 0;
          checarEvolucao(s, antes);
        });
        desenharEquipe();
        feito("+5 níveis");
      }
    },
    {
      titulo: "Evoluir tudo ao máximo",
      texto: "Forma Suprema em todos.",
      acao: () => {
        R.chefesVencidos = Math.max(1, R.chefesVencidos);
        ativos().forEach(s => {
          const antes = estBase(s);
          s.nivel = Math.max(s.nivel, NIV[3]);
          if (s.mon.ramo == null) s.mon.ramo = 0;
          checarEvolucao(s, antes);
        });
        desenharEquipe();
        feito("Equipe no máximo");
      }
    },
    {
      titulo: "Despertar e combinado prontos",
      texto: "",
      acao: () => {
        J.ult = 100;
        J.comb = 0;
        feito("Prontos");
      }
    },
    {
      titulo: "Chamar o chefe agora",
      texto: "",
      acao: () => {
        J.t = Math.max(J.t, MAPA_SEG - 1);
        feito("O chefe está chegando");
      }
    },
    {
      titulo: `Invencível: ${J.deus ? "ligado" : "desligado"}`,
      texto: "Não perde vida.",
      acao: () => {
        J.deus = !J.deus;
        feito(J.deus ? "Invencível" : "Normal");
      }
    },
    {
      titulo: "Pular para o próximo mapa",
      texto: "",
      acao: () => {
        defPausado(false);
        fechar();
        R.profundidade++;
        R.mapaNaEra = (R.mapaNaEra + 1) % MAPAS_POR_ERA;
        mostrarPortais();
      }
    },
    { titulo: "Voltar", texto: "", acao: () => pausar() }
  ]);
}
// emblema de elemento desenhado em vetor (orbe com o símbolo), nítido em qualquer tela
export const cacheEmblema = new Map();
export function emblemaElemento(el: Elemento, ativo: boolean) {
  const k = el + "|" + !!ativo;
  if (cacheEmblema.has(k)) return cacheEmblema.get(k);
  const N = 96,
    c = document.createElement("canvas");
  c.width = c.height = N;
  const g = c.getContext("2d"),
    cor = COR[el] || "#ffffff",
    [r, gg, b] = hexRgb(cor);
  g.translate(N / 2, N / 2);
  const fundo = g.createRadialGradient(-10, -14, 4, 0, 0, 44);
  fundo.addColorStop(0, tom(cor, 1.5));
  fundo.addColorStop(0.55, cor);
  fundo.addColorStop(1, tom(cor, 0.35));
  g.fillStyle = fundo;
  g.beginPath();
  g.arc(0, 0, 40, 0, Math.PI * 2);
  g.fill();
  g.lineWidth = 3;
  g.strokeStyle = ativo ? "#ffe6a6" : "rgba(255,240,210,.55)";
  g.stroke();
  if (ativo) {
    g.shadowColor = `rgba(${r},${gg},${b},1)`;
    g.shadowBlur = 14;
  }
  g.fillStyle = "#fff8e8";
  g.strokeStyle = "#fff8e8";
  g.lineCap = "round";
  g.lineJoin = "round";
  g.lineWidth = 5;
  g.beginPath();
  switch (el) {
    case "fogo":
      g.moveTo(0, 24);
      g.bezierCurveTo(-20, 22, -20, 0, -6, -10);
      g.bezierCurveTo(-6, -2, 0, 0, 2, -6);
      g.bezierCurveTo(4, -14, -2, -20, 2, -26);
      g.bezierCurveTo(16, -14, 22, 4, 14, 16);
      g.bezierCurveTo(10, 22, 6, 24, 0, 24);
      g.fill();
      break;
    case "agua":
      g.moveTo(0, -26);
      g.bezierCurveTo(10, -10, 20, 2, 18, 10);
      g.bezierCurveTo(16, 22, 6, 26, 0, 26);
      g.bezierCurveTo(-6, 26, -16, 22, -18, 10);
      g.bezierCurveTo(-20, 2, -10, -10, 0, -26);
      g.fill();
      break;
    case "terra":
      g.moveTo(-26, 18);
      g.lineTo(-8, -14);
      g.lineTo(0, -2);
      g.lineTo(8, -20);
      g.lineTo(26, 18);
      g.closePath();
      g.fill();
      break;
    case "ar":
      for (const [y, w] of [
        [-12, 20],
        [0, 26],
        [12, 16]
      ] as [number, number][]) {
        g.moveTo(-w, y);
        g.bezierCurveTo(-w / 3, y - 6, w / 3, y + 6, w, y - 2);
      }
      g.stroke();
      break;
    case "raio":
      g.moveTo(6, -28);
      g.lineTo(-14, 4);
      g.lineTo(0, 4);
      g.lineTo(-6, 28);
      g.lineTo(14, -6);
      g.lineTo(0, -6);
      g.closePath();
      g.fill();
      break;
    case "natureza":
      g.moveTo(-18, 20);
      g.bezierCurveTo(-22, -6, 0, -24, 22, -22);
      g.bezierCurveTo(22, 0, 6, 22, -18, 20);
      g.fill();
      g.strokeStyle = tom(cor, 0.5);
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(-18, 20);
      g.lineTo(10, -8);
      g.stroke();
      break;
    case "luz":
      g.arc(0, 0, 10, 0, Math.PI * 2);
      g.fill();
      g.lineWidth = 4;
      g.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        g.moveTo(Math.cos(a) * 16, Math.sin(a) * 16);
        g.lineTo(Math.cos(a) * 25, Math.sin(a) * 25);
      }
      g.stroke();
      break;
    case "sombra":
      g.arc(0, 0, 22, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "destination-out";
      g.shadowBlur = 0;
      g.beginPath();
      g.arc(10, -7, 19, 0, Math.PI * 2);
      g.fill();
      g.globalCompositeOperation = "source-over";
      break;
  }
  g.shadowBlur = 0;
  const brilho = g.createRadialGradient(-12, -16, 0, -12, -16, 22);
  brilho.addColorStop(0, "rgba(255,255,255,.45)");
  brilho.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = brilho;
  g.beginPath();
  g.arc(0, 0, 40, 0, Math.PI * 2);
  g.fill();
  cacheEmblema.set(k, c);
  return c;
}
// Pacto: a roda dos elementos (arte/ui/ui__pacto) vira o seletor; cada gema é um botão
export const RODA_PACTO = {
  luz: [50, 19.5],
  agua: [72.8, 24.6],
  ar: [83.3, 48.2],
  natureza: [74.2, 70.8],
  sombra: [50, 81.2],
  raio: [26.8, 70.8],
  terra: [18.2, 48.2],
  fogo: [27.3, 24.6]
};
export function telaPacto() {
  $("telaMenu").classList.remove("ativa");
  const sel = new Set<Elemento>();
  let foco = null;
  const roda = UI_ARQ("ui__pacto");
  const render = () => {
    if (!roda) {
      // sem a arte: grade de emblemas
      mostrarCartas(
        "Pacto Elemental",
        `Escolha ${D.pacto.min} ou ${D.pacto.max} elementos. Só ovos e filhotes deles vão aparecer. ${D.pacto.bonus[2].texto}.`,
        ELS.map(el => ({
          titulo: NOME_EL(el),
          manter: true,
          raridade: sel.has(el) ? "lendario" : "comum",
          sprite: emblemaElemento(el, sel.has(el)),
          suave: true,
          texto: infoElemento(el),
          acao: () => {
            if (sel.has(el)) sel.delete(el);
            else if (sel.size < D.pacto.max) sel.add(el);
            render();
          }
        })),
        { grade: true }
      );
    } else {
      mostrarCartas(
        "Pacto Elemental",
        `Toque em ${D.pacto.min} ou ${D.pacto.max} gemas. Só ovos e filhotes desses elementos vão aparecer.`,
        []
      );
      const box = $("cartas");
      box.className = "cartas";
      box.innerHTML = `<div class="roda-pacto"><img src="${roda.src}" alt="Roda dos elementos"></div><div class="roda-info"></div>`;
      const r = box.querySelector(".roda-pacto");
      for (const el of ELS) {
        const [x, y] = RODA_PACTO[el],
          g = document.createElement("button");
        g.className = "gema" + (sel.has(el) ? " sel" : "") + (foco === el ? " foco" : "");
        g.style.left = x + "%";
        g.style.top = y + "%";
        g.style.setProperty("--cor", COR[el]);
        g.setAttribute("aria-label", NOME_EL(el) + (sel.has(el) ? " (escolhido)" : ""));
        g.setAttribute("aria-pressed", String(sel.has(el)));
        g.onclick = () => {
          foco = el;
          if (sel.has(el)) sel.delete(el);
          else if (sel.size < D.pacto.max) sel.add(el);
          else toast(`No máximo ${D.pacto.max} elementos.`);
          render();
        };
        r.appendChild(g);
      }
      const nomes = [...sel].map(el => `<span style="color:${COR[el]}">${NOME_EL(el)}</span>`).join(" + ") || "nenhum elemento ainda";
      box.querySelector(".roda-info").innerHTML =
        `<b>Pacto: ${nomes}</b>${foco ? `<small><span style="color:${COR[foco]}">${NOME_EL(foco)}</span>: ${infoElemento(foco)}</small>` : `<small>${D.pacto.bonus[2].texto}.</small>`}`;
    }
    const b = document.createElement("button");
    b.className = "botao";
    b.textContent =
      sel.size >= D.pacto.min ? `Fechar Pacto (${[...sel].map(NOME_EL).join(", ")})` : `Escolha ${D.pacto.min - sel.size} elemento(s)`;
    b.disabled = sel.size < D.pacto.min;
    b.onclick = () => escolherInicial([...sel]);
    $("cartasRodape").appendChild(b);
    const v = document.createElement("button");
    v.className = "botao sec";
    v.textContent = "Voltar";
    v.onclick = () => menu();
    $("cartasRodape").appendChild(v);
  };
  render();
}
export function infoElemento(el: Elemento) {
  const n = META.liberados.filter(id => LINHA[id].elemento === el).length,
    perde = ELS.find(k => D.vantagem[k] === el);
  return `${n} monstros · vence ${NOME_EL(D.vantagem[el])} · perde para ${NOME_EL(perde)}`;
}
export function escolherInicial(pacto: Elemento[], opsProntas?) {
  const pool = META.liberados.filter(id => pacto.includes(LINHA[id].elemento));
  const ops = opsProntas || [];
  if (!opsProntas) {
    pacto.forEach(el => {
      const c = embaralhar(pool.filter(id => LINHA[id].elemento === el))[0];
      if (c) ops.push(c);
    });
    embaralhar(pool).forEach(id => {
      if (ops.length < 4 && !ops.includes(id)) ops.push(id);
    });
    // a animação de cada monstro só começa a baixar quando é pedida: sem ela a carta mostrava a imagem reserva, bem menor e borrada.
    // Espera chegar (até 2,5 s, uma vez) e só então mostra a tela.
    const nomes = ops
      .map(id => (LINHA[id].ancestral ? `arte/lendarios/${id}__anim_1.png` : `arte/monstros/${LINHA[id].elemento}/${id}__anim_1.png`))
      .filter(n => MANIFESTO && MANIFESTO[n]);
    if (
      nomes.some(n => {
        const im = ARTE_IMG[n];
        return im && !im.pronta && !im.falhou;
      })
    ) {
      Promise.race([preCarregar(nomes), new Promise(ok => setTimeout(ok, 2500))]).then(() => escolherInicial(pacto, ops));
      return;
    }
  }
  mostrarCartas(
    "Monstro inicial",
    "Os outros chegam por ovos, capturas e invocações durante a run.",
    ops.map(id => {
      const l = LINHA[id];
      return {
        titulo: l.filhote,
        sprite: spriteLinha(id, "comum"),
        quadros: quadrosRetrato(id),
        classe: "grande",
        raridade: "incomum",
        texto: `<span style="color:${COR[l.elemento]}">${NOME_EL(l.elemento)}</span> · ${D.classes[l.classe].nome} · ${D.linhagens[l.linhagem].nome}<br>Evolui: ${l.jovem}<br>${D.classes[l.classe].basico}`,
        acao: () => telaInvocador(pacto, id)
      };
    }),
    { grade: true }
  );
}
redimensionar();
menu();
aplicarArteUI();
requestAnimationFrame(passo);
