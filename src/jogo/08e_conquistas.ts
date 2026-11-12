// Elementar · conquistas: eventos, Insígnias, murais e telas
import "./08d_poderes.js"; // ordem de carga: o módulo anterior primeiro (docs/ARQUITETURA.md)
import { $, ativos, COR, ctx, elementoDe, gravar, H, J, META, NOME_EL, PLAT, R, SIM, UNIV, W } from "./01_nucleo.js";
import { mostrarCartas } from "./03_progressao.js";
import { folhaArte } from "./07c_cenario_arte.js";
import { conferirProvacoes, telaPanteao } from "./08f_lendas.js";
import { insigniaSprite } from "./08h_interface.js";
import { toast } from "./10_desenho.js";
import { menu } from "./11_menu.js";
// ================================================================ conquistas: eventos, Insígnias, Ladrilhos dos murais e Lendas
// Conquistas de mapa contam dentro de uma visita ao mapa (J.cont); as globais somam entre runs (META.cont).
export const CONQ = () => D.conquistas;
export function metaConq() {
  META.conq = META.conq || {};
  META.cont = META.cont || {};
  META.talismas = META.talismas || [];
  META.lendas = META.lendas || [];
  return META;
}
export function evento(nome: string, n?: number) {
  if (!J || (SIM.ativo && !SIM.conquistas)) return;
  n = n || 1;
  metaConq();
  J.cont = J.cont || {};
  J.cont[nome] = (J.cont[nome] || 0) + n;
  META.cont[nome] = (META.cont[nome] || 0) + n;
  if (nome.startsWith("quebra:")) {
    META.cont.quebra = (META.cont.quebra || 0) + n;
    checarGlobais("quebra");
  }
  for (const c of CONQ()) {
    if (META.conq[c.id] || c.evento !== nome) continue;
    if (c.categoria === "mapa") {
      if (c.universo === R.universo && J.cont[nome] >= c.n) conceder(c);
    } else if (META.cont[nome] >= c.n) conceder(c);
  }
}
export function checarGlobais(nome: string) {
  for (const c of CONQ()) if (!META.conq[c.id] && c.categoria !== "mapa" && c.evento === nome && (META.cont[nome] || 0) >= c.n) conceder(c);
}
export function conceder(c) {
  const M = metaConq();
  if (M.conq[c.id]) return;
  M.conq[c.id] = Date.now();
  M.essencia += c.essencia;
  if (!M.modUsado) PLAT.conquista(c.id); // save mexido no modo moderador não gera conquista na Steam
  if (c.talisma && !M.talismas.includes(c.talisma)) M.talismas.push(c.talisma);
  const rot = { bronze: "Insígnia de bronze", prata: "Insígnia de prata", ouro: "Insígnia de ouro", secreta: "Insígnia secreta" }[
    c.insignia
  ];
  avisoConquista(
    `${c.secreta ? "Segredo descoberto" : "Conquista"}: ${c.nome}`,
    `${rot} · +${c.essencia} de Essência${c.talisma ? ` · Talismã liberado: ${D.poderes.talismas[c.talisma].nome}` : ""}${c.ladrilho != null ? " · Ladrilho do mural" : ""}`
  );
  if (c.categoria === "mapa") {
    const u = c.universo,
      todas = CONQ().filter(x => x.universo === u);
    if (todas.every(x => M.conq[x.id]) && !M.lendas.includes(u)) {
      M.lendas.push(u);
      const l = D.lendas.find(x => x.universo === u);
      avisoConquista(`Lenda liberada: ${l.nome}`, `O mural de ${UNIV[u].nome} está completo. Escolha a Lenda no início da próxima run.`);
      M.cont.lenda = (M.cont.lenda || 0) + 1;
      checarGlobais("lenda");
    }
  }
  if (typeof gravar === "function") gravar();
}
export function avisoConquista(txt: string, sub: string) {
  J && (J.conqFila = J.conqFila || []).push({ txt, sub });
  if (!J) toast(txt);
}
export function atualizarConquistas(dt: number) {
  if (!J) return;
  if (J.conqAtual) {
    J.conqAtual.vida -= dt;
    if (J.conqAtual.vida <= 0) J.conqAtual = null;
  } else if (J.conqFila && J.conqFila.length) {
    J.conqAtual = Object.assign(J.conqFila.shift(), { vida: 3 });
  }
}
export function desenharConquista() {
  const c = J && J.conqAtual;
  if (!c) return;
  const a = Math.min(1, c.vida * 2, (3 - c.vida) * 3),
    w = Math.min(W * 0.9, 460),
    x = (W - w) / 2,
    y = Math.round(H * 0.2);
  ctx.globalAlpha = a;
  ctx.fillStyle = "rgba(18,14,26,.92)";
  ctx.fillRect(x, y, w, 52);
  ctx.strokeStyle = "#d6ab4f";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, w - 2, 50);
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.font = `600 15px "Nunito", system-ui, sans-serif`;
  ctx.fillStyle = "#ffd34a";
  ctx.fillText(c.txt, W / 2, y + 21);
  ctx.font = `12px "Nunito", system-ui, sans-serif`;
  ctx.fillStyle = "#f2e7c9";
  ctx.fillText(c.sub, W / 2, y + 40);
  ctx.globalAlpha = 1;
}
// eventos que dependem do fim da luta
export function eventosVitoria(e: Inimigo) {
  conferirProvacoes(e);
  evento("chefe");
  if (!J.atingidoNoChefe) evento("chefe_intocado");
  const u = UNIV[R.universo];
  if (ativos().filter(s => elementoDe(s) === u.elemento).length >= 2) evento("chefe_mesmo_el");
  if (e.eraChefe) evento("guardiao");
}
// ---------------------------------------------------------------- tela de conquistas e murais
export function telaConquistas() {
  metaConq();
  $("telaMenu").classList.remove("ativa");
  const tot = CONQ().length,
    feitas = Object.keys(META.conq).length;
  const cartas: Carta[] = [
    {
      titulo: `Insígnias: ${feitas}/${tot}`,
      texto: `Lendas liberadas: ${META.lendas.length}/34 · Talismãs liberados: ${6 + META.talismas.length}/12`,
      manter: true,
      acao: () => telaGlobais()
    }
  ];
  for (const u of D.universos) {
    const cs = CONQ().filter(c => c.universo === u.id),
      n = cs.filter(c => META.conq[c.id]).length,
      l = D.lendas.find(x => x.universo === u.id);
    cartas.push({
      titulo: u.nome.split(",")[0],
      raridade: n === 6 ? "lendario" : n >= 3 ? "epico" : "comum",
      sprite: muralSprite(u.id, n),
      manter: true,
      texto: `Mural ${n}/6 · Lenda: ${n === 6 ? l.nome : "???"}`,
      acao: () => telaMural(u.id)
    });
  }
  cartas.splice(1, 0, {
    titulo: `Panteão: ${(META.deuses || []).length}/${D.panteao.length}`,
    raridade: "lendario",
    texto: "Deuses e o rei-herói Leônidas. Cada um abre uma Provação quando o mural do seu mapa fica completo.",
    manter: true,
    acao: () => telaPanteao()
  });
  cartas.push({ titulo: "Voltar", texto: "", acao: () => menu() });
  mostrarCartas(
    "Conquistas e Lendas",
    "Cada conquista de mapa dá um Ladrilho. Os 6 Ladrilhos montam o retrato da Lenda do universo.",
    cartas,
    { grade: true }
  );
}
export function telaMural(uid: string) {
  const u = UNIV[uid],
    l = D.lendas.find(x => x.universo === uid);
  const cartas: Carta[] = CONQ()
    .filter(c => c.universo === uid)
    .map(c => {
      const ok = !!META.conq[c.id];
      return {
        titulo: ok || !c.secreta ? c.nome : "???",
        sprite: insigniaSprite(c, ok),
        suave: true,
        raridade: ok ? { bronze: "incomum", prata: "raro", ouro: "epico", secreta: "lendario" }[c.insignia] : "comum",
        manter: true,
        texto: ok ? `✓ ${c.texto}` : c.secreta ? "Conquista secreta. O Cronista conta uma charada a cada mapa vencido." : c.texto,
        acao: () => {}
      };
    });
  const livre = META.lendas.includes(uid);
  cartas.unshift({
    titulo: livre ? l.nome : "Lenda escondida",
    suave: !!folhaArte(`arte/lendas/${l.id}__retrato.png`),
    sprite: muralSprite(uid, cartas.filter(c => c.titulo !== "???" && c.texto.startsWith("✓")).length),
    raridade: livre ? "lendario" : "comum",
    manter: true,
    texto: livre
      ? `${NOME_EL(l.elementos[0])} e ${NOME_EL(l.elementos[1])} · Poder: ${l.poder.nome} · Passiva: ${l.passiva.nome}`
      : "Complete as 6 conquistas deste mapa para revelar quem é.",
    acao: () => {}
  });
  cartas.push({ titulo: "Voltar", texto: "", acao: () => telaConquistas() });
  mostrarCartas(u.nome, "Mural de Ladrilhos", cartas);
}
export function telaGlobais() {
  const cartas: Carta[] = CONQ()
    .filter(c => c.categoria !== "mapa")
    .map(c => {
      const ok = !!META.conq[c.id];
      return {
        titulo: ok || !c.secreta ? c.nome : "???",
        sprite: insigniaSprite(c, ok),
        suave: true,
        manter: true,
        raridade: ok ? "epico" : "comum",
        texto: ok
          ? `✓ ${c.texto}${c.talisma ? ` · liberou ${D.poderes.talismas[c.talisma].nome}` : ""}`
          : c.secreta
            ? "Segredo."
            : c.texto + (c.talisma ? ` · libera ${D.poderes.talismas[c.talisma].nome}` : ""),
        acao: () => {}
      };
    });
  cartas.push({ titulo: "Voltar", texto: "", acao: () => telaConquistas() });
  mostrarCartas("Insígnias", "Jornada, Grimório e Segredos", cartas, { grade: true });
}
// mural: o retrato da Lenda (arte/lendas/<id>__retrato.png, cortado em 2x3) com os ladrilhos ainda não conquistados cobertos
export function muralSprite(uid: string, n: number) {
  const l = D.lendas.find(x => x.universo === uid),
    c = document.createElement("canvas");
  c.width = 24;
  c.height = 36;
  const g = c.getContext("2d")!,
    img = folhaArte(`arte/lendas/${l.id}__retrato.png`);
  for (let i = 0; i < 6; i++) {
    const x = (i % 2) * 12,
      y = Math.floor(i / 2) * 12;
    if (i < n) {
      if (img) {
        g.imageSmoothingEnabled = false;
        g.drawImage(img, ((i % 2) * img.width) / 2, (Math.floor(i / 2) * img.height) / 3, img.width / 2, img.height / 3, x, y, 12, 12);
      } else {
        g.fillStyle = COR[l.elementos[i % 2]];
        g.fillRect(x + 1, y + 1, 10, 10);
        g.fillStyle = "#fff3c4";
        g.fillRect(x + 5, y + 5, 2, 2);
      }
    } else {
      g.fillStyle = "#2a2433";
      g.fillRect(x + 1, y + 1, 10, 10);
      g.fillStyle = "#3a3446";
      g.fillRect(x + 1, y + 1, 10, 1);
    }
  }
  return c;
}
