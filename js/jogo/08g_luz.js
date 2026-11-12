// GERADO por "npm run compilar" a partir de src/jogo/08g_luz.ts. Edite o .ts, não este arquivo.
// Elementar · luz: tom de cada universo, crepúsculo, escuridão com poças de luz e sombras
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./08f_lendas.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { ativos, COR, elementoDe, J, lg, MAPA_SEG, mistura, R, SIM, tom, UNIV, VH, VW } from "./01_nucleo.js";
import { CEL } from "./04_ambiente.js";
import { QUAL } from "./06_loop.js";
import { bolhaCor } from "./07_cenario.js";
import { nuvensEm, silhueta } from "./07b_cenario_desenho.js";
import { lumChao } from "./08_horda.js";
import { VFX_EL } from "./08b_efeitos.js";
import { passiva } from "./08f_lendas.js";
// ================================================================ luz: tom de cada universo, crepúsculo do fim do mapa e luzes que vêm dos poderes
export function luzFlash(x, y, cor, r, dur) {
  J.flashes = J.flashes || [];
  if (J.flashes.length > 40) J.flashes.shift();
  J.flashes.push({ x, y, cor, r, t: 0, max: dur || 0.3 });
}
export function atualizarLuz(dt) {
  if (J.flashes) {
    for (const f of J.flashes) f.t += dt;
    J.flashes = J.flashes.filter(f => f.t < f.max);
  }
}
// ---------------------------------------------------------------- escuridão com poças de luz e sombras projetadas
// quanto o mapa escurece: noite bem mais, dia só um pouco; o fim do mapa e o chefe puxam para o crepúsculo
export function crepusculo() {
  return J.chefeVivo ? 1 : Math.max(0, Math.min(1, (J.t - MAPA_SEG * 0.6) / (MAPA_SEG * 0.4)));
}
export function nivelEscuro() {
  const u = UNIV[R.universo],
    L = u && u.luz;
  const c = crepusculo();
  if (!L) return 0.1 + c * 0.15;
  return pisoEscuroK() * Math.min(0.6, (L.noite ? 0.34 : 0.1) + c * (L.noite ? 0.1 : 0.2));
} /* noite mais clara: no celular os mapas noturnos ficavam escuros demais para ler */
// piso que já é escuro (reinos noturnos têm piso com brilho de 3% a 5%): a cor da noite e a sombra do mapa pesam menos,
// senão as três camadas juntas deixavam a tela quase preta no celular
export function pisoEscuroK() {
  const l = typeof lumChao === "function" ? lumChao() : 0.2;
  return l < 0.08 ? 0.5 : l < 0.15 ? 0.7 : 1;
}
export let LMAP = null,
  FURO = null;
export function desenharMapaLuz(ox, oy) {
  if (QUAL === 0 || SIM.ativo || J.escuro > 0.05) return;
  const A = nivelEscuro();
  if (A < 0.04) return;
  const k = 0.25,
    w = Math.ceil((VW + 2) * k),
    h = Math.ceil((VH + 2) * k);
  if (!LMAP) {
    LMAP = document.createElement("canvas");
    FURO = document.createElement("canvas");
    FURO.width = FURO.height = 64;
    const fg = FURO.getContext("2d"),
      gr = fg.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.45, "rgba(255,255,255,.7)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    fg.fillStyle = gr;
    fg.fillRect(0, 0, 64, 64);
  }
  if (LMAP.width !== w || LMAP.height !== h) {
    LMAP.width = w;
    LMAP.height = h;
  }
  const g = LMAP.getContext("2d"),
    L = (UNIV[R.universo] || {}).luz || {},
    c = crepusculo();
  g.globalCompositeOperation = "source-over";
  g.globalAlpha = 1;
  g.clearRect(0, 0, w, h);
  g.fillStyle = L.noite ? "rgba(8,6,22," + A + ")" : c > 0.3 ? "rgba(30,14,26," + A + ")" : "rgba(16,12,28," + A + ")";
  g.fillRect(0, 0, w, h);
  nuvensEm(g, ox - 1, oy - 1, k);
  J._nuvemFeita = true;
  g.globalCompositeOperation = "destination-out";
  const furo = (x, y, r, a) => {
    const X = (x - ox + 1) * k,
      Y = (y - oy + 1) * k,
      R2 = r * k;
    if (X < -R2 || Y < -R2 || X > w + R2 || Y > h + R2) return;
    g.globalAlpha = Math.min(1, a);
    g.drawImage(FURO, X - R2, Y - R2, R2 * 2, R2 * 2);
  };
  const P = J.jogador;
  furo(P.x, P.y, 78, 1);
  furo(P.x, P.y, 40, 0.6);
  for (const s of ativos()) if (s.x != null) furo(s.x, s.y, 44, 0.75);
  // à noite os inimigos são visíveis: cada um abre um pouco de luz em volta de si
  {
    let ne = 0;
    if (L.noite)
      for (const e of J.inimigos) {
        if (e.hp <= 0 || e.oculto) continue;
        if (++ne > 70) break;
        furo(e.x, e.y - (e.tam || 10) * 0.4, e.chefe ? 50 : e.mini ? 30 : 16, e.chefe ? 0.8 : 0.5);
      }
  }
  let n = 0;
  for (const p of J.proj) {
    if (++n > 30) break;
    furo(p.x, p.y, p.alvo || p.explode ? 26 : 16, 0.55);
  }
  for (const f of J.flashes || []) {
    const q = f.t / f.max;
    furo(f.x, f.y, f.r * 1.2, (1 - q) * 0.9);
  }
  for (const f of J.efeitos) {
    furo(f.x, f.y, (f.r || 20) * 1.3, (f.vida / f.max) * 0.6);
  }
  n = 0;
  for (const g2 of J.gemas) {
    if (++n > 40) break;
    furo(g2.x, g2.y, 7, 0.35);
  }
  for (const b of J.baus || []) furo(b.x, b.y, 40, 0.9);
  for (const m of J.moedas || []) furo(m.x, m.y, 8, 0.5);
  if (J.cena) {
    for (const p of J.cena.lista) {
      if (p.morto) continue;
      if (p.queima > 0) furo(p.x, p.y - 4, 55, 0.9);
      else if (p.tipo === "luz") furo(p.x, p.y - 10, 70, 0.85);
      else if (p.tipo === "cristal") furo(p.x, p.y - 6, 26, 0.4);
    }
    let m = 0;
    for (const [key, s2] of J.solo) {
      if (s2.ate < J.t || (s2.t !== "fogo" && s2.t !== "eletrico" && s2.t !== "luz" && s2.t !== "queimado")) continue;
      const [cx, cy] = key.split(",").map(Number);
      if (++m > 60) break;
      furo(cx * CEL + 4, cy * CEL + 4, s2.t === "queimado" ? 12 : 22, s2.t === "queimado" ? 0.35 : 0.7);
    }
  }
  for (const e of J.inimigos) if ((e.chefe || e.mini) && e.hp > 0) furo(e.x, e.y, 46, 0.55);
  g.globalAlpha = 1;
  g.globalCompositeOperation = "source-over";
  const suave = lg.imageSmoothingEnabled;
  lg.imageSmoothingEnabled = true;
  lg.imageSmoothingQuality = "low";
  lg.drawImage(LMAP, -1, -1, w / k, h / k);
  lg.imageSmoothingEnabled = suave;
  lg.imageSmoothingQuality = "high";
}
// sombra projetada no chão (luz vinda de cima à esquerda): silhueta escura, achatada e inclinada a partir dos pés
export function sombraProjetada(spr, x, yPe, w, h, virar, forca) {
  if (!spr || QUAL === 0 || SIM.ativo) return;
  const A = nivelEscuro(),
    a = (0.36 - A * 0.3) * (forca || 1);
  if (a < 0.03) return;
  const sil = silhueta(spr, "#05030a"),
    a0 = lg.globalAlpha;
  lg.save();
  lg.globalAlpha = a0 * a;
  lg.translate(x, yPe);
  lg.transform(1, 0, -0.55, -0.36, 0, 0);
  if (virar) lg.scale(-1, 1);
  lg.drawImage(sil, -w / 2, (-(spr._pe || spr.height) * h) / spr.height, w, h);
  lg.restore();
  lg.globalAlpha = a0;
}
// tom ambiente: multiplica a cena pela cor da luz do universo; perto do fim do mapa caminha para o crepúsculo
export function desenharLuzAmbiente(ox, oy) {
  const u = UNIV[R.universo];
  if (!u || !u.luz) return;
  const L = u.luz;
  const crep = J.chefeVivo ? 1 : Math.max(0, Math.min(1, (J.t - MAPA_SEG * 0.6) / (MAPA_SEG * 0.4)));
  const tom = crep > 0 ? mistura(L.tom, L.noite ? "#2a1a4a" : "#c06a50", crep * 0.6) : L.tom,
    forca = Math.min(0.55, L.forca + crep * (L.noite ? 0.06 : 0.16)) * (J.escuro > 0.05 ? 0.4 : 1) * pisoEscuroK();
  if (forca > 0.01) {
    lg.globalCompositeOperation = "multiply";
    lg.globalAlpha = forca / 0.62;
    lg.fillStyle = tom;
    lg.fillRect(-1, -1, VW + 2, VH + 2);
    lg.globalCompositeOperation = "source-over";
    lg.globalAlpha = 1;
  }
  // luzes: à noite brilham mais
  const k = 0.35 + (L.noite ? 0.65 : 0) + crep * 0.25;
  if (k < 0.3) return;
  lg.globalCompositeOperation = "lighter";
  const luz = (x, y, r, cor, a) => {
    const X = x - ox,
      Y = y - oy;
    if (X < -r || Y < -r || X > VW + r || Y > VH + r) return;
    lg.globalAlpha = Math.min(1, a * k);
    lg.drawImage(bolhaCor(cor), X - r, Y - r, r * 2, r * 2);
  };
  const P = J.jogador;
  if (L.noite) luz(P.x, P.y, 46, "#ffe0b0", 0.22);
  for (const s of ativos()) if (s.x != null) luz(s.x, s.y + 2, 20, COR[elementoDe(s)] || "#ffffff", 0.28);
  if (QUAL === 0) {
    for (const f of J.flashes || []) {
      const q = f.t / f.max;
      luz(f.x, f.y, f.r * (0.5 + q * 0.5), f.cor, (1 - q) * 0.4);
    }
    lg.globalCompositeOperation = "source-over";
    lg.globalAlpha = 1;
    return;
  }
  let n = 0;
  for (const p of J.proj) {
    if (++n > 24) break;
    const v = VFX_EL[p.el] || VFX_EL.luz;
    luz(p.x, p.y, p.alvo || p.explode ? 14 : 9, v.c1, 0.35);
  }
  for (const f of J.flashes || []) {
    const q = f.t / f.max;
    luz(f.x, f.y, f.r * (0.5 + q * 0.5), f.cor, (1 - q) * 0.4);
  }
  if (J.cena) {
    for (const p of J.cena.lista) {
      if (p.queima > 0) luz(p.x, p.y - 4, 30, "#ff9a50", 0.4);
      else if (p.tipo === "luz") luz(p.x, p.y - 10, 36, "#ffc880", 0.35);
      else if (p.tipo === "cristal") luz(p.x, p.y - 6, 18, J.cena.kit.cristal || "#c8f0ff", 0.2);
    }
    // terreno que brilha: varre no máximo 250 registros por quadro, começando de um ponto que gira (cobre tudo em poucos quadros)
    let m = 0,
      vis = QUAL < 2 ? 250 : 0;
    for (const [key, s] of J.solo) {
      if (++vis > 250) break;
      if (s.ate < J.t || (s.t !== "fogo" && s.t !== "eletrico" && s.t !== "luz" && s.t !== "queimado")) continue;
      const [cx, cy] = key.split(",").map(Number),
        x = cx * CEL + 4,
        y = cy * CEL + 4;
      if (Math.abs(x - P.x) > VW / 2 + 10 || Math.abs(y - P.y) > VH / 2 + 10) continue;
      if (++m > 24) break;
      luz(
        x,
        y,
        s.t === "queimado" ? 9 : 14,
        s.t === "fogo" ? "#ff8a3d" : s.t === "queimado" ? "#ff6a20" : s.t === "eletrico" ? "#fff3a0" : "#fff3c4",
        s.t === "queimado" ? 0.12 : 0.18
      );
    }
    let b = 0;
    for (const a of J.cena.ar) {
      if (a.k !== "brasas" && a.k !== "vagalumes") continue;
      if (++b > 20) break;
      luz(a.x, a.y - a.z, 5, a.k === "brasas" ? "#ff9a50" : "#d8ff8a", 0.25);
    }
  }
  for (const e of J.inimigos) if ((e.chefe || e.mini) && e.hp > 0) luz(e.x, e.y - 6, 30, COR[e.el] || "#ffffff", 0.18);
  lg.globalCompositeOperation = "source-over";
  lg.globalAlpha = 1;
}
// quanto a camada de arte em alta resolução deve escurecer (mesma conta da luz ambiente)
export function escurecimentoArte() {
  const u = UNIV[R.universo];
  if (!u || !u.luz || !J) return null;
  const L = u.luz;
  const crep = J.chefeVivo ? 1 : Math.max(0, Math.min(1, (J.t - MAPA_SEG * 0.6) / (MAPA_SEG * 0.4)));
  let forca = Math.min(0.55, L.forca + crep * (L.noite ? 0.06 : 0.16)) * (J.escuro > 0.05 ? 0.4 : 1);
  if (typeof passiva === "function" && passiva("imune_escuro")) forca *= 0.4;
  return { cor: tom(crep > 0 ? mistura(L.tom, L.noite ? "#2a1a4a" : "#c06a50", crep * 0.6) : L.tom, 0.35), a: forca * 0.75 };
}
