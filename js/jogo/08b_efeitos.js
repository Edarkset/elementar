// Elementar · efeitos dos poderes: partículas por elemento, círculos de invocação, golpes básicos, projéteis, especiais, reações, combinados e habilidades
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./08_horda.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import { ativos, COR, elementoDe, J, lg, mistura, rnd, SIM, tom, VH, VW } from "./01_nucleo.js";
import { maisProximo, tremor, VFX_K } from "./02_combate.js";
import { QUAL } from "./06_loop.js";
import { bolhaCor, rajada } from "./07_cenario.js";
import { celulaArte, folhaArte } from "./07c_cenario_arte.js";
import { luzFlash } from "./08g_luz.js";
// ================================================================ poderes: identidade visual de cada elemento e de cada classe
// Cada golpe dos monstros tem forma (corte, onda, feixe, projétil) dada pela classe e "material" dado pelo elemento.
// Quando as folhas de efeito forem importadas (arte/efeitos/...), especiais, reações e combinados tocam a animação da folha.
export const VFX_EL = {
  fogo: { c1: "#ffb040", c2: "#e8603c", forma: "brasa", g: -30 },
  agua: { c1: "#9fe0ff", c2: "#3f8ae0", forma: "gota", g: 120 },
  terra: { c1: "#c8a070", c2: "#7a5a3a", forma: "pedra", g: 160 },
  ar: { c1: "#e8f4ff", c2: "#9fd8e8", forma: "risco", g: 0 },
  raio: { c1: "#fff3a0", c2: "#f2d23a", forma: "faisca", g: 0 },
  natureza: { c1: "#9ff07a", c2: "#4f9a3c", forma: "folha", g: 18 },
  luz: { c1: "#fff8d8", c2: "#ffd34a", forma: "estrela", g: -8 },
  sombra: { c1: "#b080e0", c2: "#3a2050", forma: "fumaca", g: -24 }
};
export const vEl = el => VFX_EL[el] || VFX_EL.luz;
// partículas com forma (usa o mesmo J.parts; "forma" e "g" são opcionais)
export function particulasEl(x, y, el, n, vel) {
  const v = vEl(el),
    L = J.parts.length;
  if (L > 380) n = Math.ceil(n / 4);
  else if (L > 250) n = Math.ceil(n / 2);
  if (QUAL === 0) n = Math.ceil(n / 2);
  for (let i = 0; i < n; i++) {
    if (J.parts.length > 320) J.parts.shift();
    const a = Math.random() * Math.PI * 2,
      s = rnd(vel * 0.3, vel);
    J.parts.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - (v.forma === "brasa" ? 20 : 0),
      vida: rnd(0.35, 0.75),
      max: 0.75,
      cor: Math.random() < 0.6 ? v.c1 : v.c2,
      tam: Math.random() < 0.4 ? 2 : 1,
      forma: v.forma,
      g: v.g,
      giro: Math.random() * 6
    });
  }
}
export function desenharParticula(p, ox, oy) {
  const x = p.x - ox,
    y = p.y - oy;
  if (x < -4 || y < -4 || x > VW + 4 || y > VH + 4) return;
  const a = Math.min(1, (p.vida / p.max) * 1.4);
  lg.globalAlpha = a;
  lg.fillStyle = p.cor;
  lg.strokeStyle = p.cor;
  switch (p.forma) {
    case "faisca": {
      const k = Math.cos(p.vida * 40) * 1.4;
      lg.lineWidth = 0.6;
      lg.lineCap = "round";
      lg.beginPath();
      lg.moveTo(x - k, y - 1.4);
      lg.lineTo(x + k, y + 1.4);
      lg.stroke();
      lg.beginPath();
      lg.arc(x, y, 0.7, 0, Math.PI * 2);
      lg.fill();
      break;
    }
    case "estrela": {
      const s = 1.2 + Math.sin(p.vida * 30) * 0.4;
      lg.lineWidth = 0.5;
      lg.lineCap = "round";
      lg.beginPath();
      lg.moveTo(x - s * 1.6, y);
      lg.lineTo(x + s * 1.6, y);
      lg.moveTo(x, y - s * 1.6);
      lg.lineTo(x, y + s * 1.6);
      lg.stroke();
      lg.beginPath();
      lg.arc(x, y, 0.7, 0, Math.PI * 2);
      lg.fill();
      break;
    }
    case "folha": {
      lg.beginPath();
      lg.ellipse(x, y, 1.3, 0.6, p.vida * 14 + (p.giro || 0), 0, Math.PI * 2);
      lg.fill();
      break;
    }
    case "risco": {
      const d = Math.hypot(p.vx, p.vy) || 1;
      lg.lineWidth = 0.8;
      lg.lineCap = "round";
      lg.beginPath();
      lg.moveTo(x, y);
      lg.lineTo(x - (p.vx / d) * 4, y - (p.vy / d) * 4);
      lg.stroke();
      break;
    }
    case "fumaca":
      lg.globalAlpha = a * 0.35;
      lg.beginPath();
      lg.arc(x, y, (p.tam + 1) * 0.9, 0, Math.PI * 2);
      lg.fill();
      break;
    case "gota":
      lg.beginPath();
      lg.ellipse(x, y, 0.55, (p.tam + 1) * 0.6, 0, 0, Math.PI * 2);
      lg.fill();
      break;
    case "mais":
      lg.fillRect(x - 1.6, y - 0.45, 3.2, 0.9);
      lg.fillRect(x - 0.45, y - 1.6, 0.9, 3.2);
      break;
    default: {
      const r = Math.max(0.5, p.tam * 0.6);
      if (r > 0.9) {
        lg.globalAlpha = a * 0.35;
        lg.beginPath();
        lg.arc(x, y, r * 2, 0, Math.PI * 2);
        lg.fill();
        lg.globalAlpha = a;
      }
      lg.beginPath();
      lg.arc(x, y, r, 0, Math.PI * 2);
      lg.fill();
    }
  }
  lg.lineCap = "butt";
}
// efeitos curtos com desenho próprio (cortes, ondas, feixes, selos)
// ---------------------------------------------------------------- círculo de invocação no chão
// Desenho do círculo (anel duplo, runas, estrela de 6 pontas e marcas) feito uma vez por elemento num canvas; no jogo ele
// é achatado em perspectiva, gira, cresce ao abrir e some com brilho. Usado ao invocar um monstro e ao lançar habilidades
export const cacheCirculo = new Map();
export function artCirculo(el) {
  if (cacheCirculo.has(el)) return cacheCirculo.get(el);
  const N = 160,
    c = document.createElement("canvas");
  c.width = c.height = N;
  const g = c.getContext("2d"),
    cor = COR[el] || "#ffd34a",
    R = N / 2 - 4;
  g.translate(N / 2, N / 2);
  g.lineCap = "round";
  g.shadowColor = cor;
  g.shadowBlur = 8;
  g.strokeStyle = mistura(cor, "#ffffff", 0.45);
  g.lineWidth = 3;
  g.beginPath();
  g.arc(0, 0, R, 0, Math.PI * 2);
  g.stroke();
  g.lineWidth = 1.5;
  g.beginPath();
  g.arc(0, 0, R - 9, 0, Math.PI * 2);
  g.stroke();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2,
      l = i % 3 === 0 ? 7 : 3.5;
    g.beginPath();
    g.moveTo(Math.cos(a) * (R - 1), Math.sin(a) * (R - 1));
    g.lineTo(Math.cos(a) * (R - 1 - l), Math.sin(a) * (R - 1 - l));
    g.stroke();
  } // marcas entre os anéis
  g.lineWidth = 2;
  for (const d of [0, Math.PI]) {
    g.beginPath();
    for (let i = 0; i <= 3; i++) {
      const a = d + (i / 3) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * (R - 12),
        y = Math.sin(a) * (R - 12);
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.stroke();
  } // estrela de 6 pontas
  g.lineWidth = 1.5;
  g.beginPath();
  g.arc(0, 0, R * 0.42, 0, Math.PI * 2);
  g.stroke();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    g.beginPath();
    g.arc(Math.cos(a) * R * 0.62, Math.sin(a) * R * 0.62, 4, 0, Math.PI * 2);
    g.stroke();
  } // runas nas pontas
  g.fillStyle = cor;
  g.globalAlpha = 0.18;
  g.beginPath();
  g.arc(0, 0, R, 0, Math.PI * 2);
  g.fill();
  cacheCirculo.set(el, c);
  return c;
}
export function circuloInvocacao(x, y, el, r, dur, forte) {
  if (SIM.ativo || !J) return;
  const art = artCirculo(el),
    cor = COR[el] || "#ffd34a";
  vfx({
    max: dur || 0.9,
    camada: "chao",
    desenhar(ox, oy, q) {
      const abre = Math.min(1, q / 0.18),
        some = q > 0.7 ? (1 - q) / 0.3 : 1,
        esc = r * (0.55 + 0.45 * (1 - Math.pow(1 - abre, 3))),
        a = J.t * (forte ? 1.6 : 1.1);
      lg.save();
      lg.translate(x - ox, y - oy);
      lg.scale(1, 0.5);
      lg.globalCompositeOperation = "lighter";
      lg.globalAlpha = 0.9 * some;
      lg.rotate(a);
      lg.drawImage(art, -esc, -esc, esc * 2, esc * 2);
      lg.rotate(-a * 2.2);
      lg.globalAlpha = 0.45 * some;
      lg.drawImage(art, -esc * 0.6, -esc * 0.6, esc * 1.2, esc * 1.2); // círculo interno girando ao contrário
      lg.restore();
      lg.globalCompositeOperation = "source-over";
      lg.globalAlpha = 1;
      if (forte && q < 0.6) {
        lg.globalCompositeOperation = "lighter";
        const g = lg.createLinearGradient(0, y - oy - 70, 0, y - oy);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(1, cor);
        lg.globalAlpha = 0.4 * (1 - q / 0.6);
        lg.fillStyle = g;
        lg.fillRect(x - ox - esc * 0.35, y - oy - 70, esc * 0.7, 70);
        lg.globalAlpha = 1;
        lg.globalCompositeOperation = "source-over";
      }
    }
  });
}
export function vfx(o) {
  J.vfx = J.vfx || [];
  if (J.vfx.length > 80) J.vfx.shift();
  o.t = 0;
  J.vfx.push(o);
  return o;
}
export function atualizarVfx(dt) {
  if (!J.vfx) return;
  for (const v of J.vfx) v.t += dt;
  J.vfx = J.vfx.filter(v => v.t < v.max);
}
export function desenharVfx(ox, oy, camada) {
  if (!J.vfx) return;
  for (const v of J.vfx) if ((v.camada || "luz") === camada) v.desenhar(ox, oy, v.t / v.max);
  lg.globalAlpha = 1;
  lg.lineWidth = 1;
}

// ---------------------------------------------------------------- ataques básicos por classe
export function vfxCorte(s, el, r) {
  const K = VFX_K;
  const alvo = maisProximo(s, r + 20),
    ang = alvo ? Math.atan2(alvo.y - s.y, alvo.x - s.x) : Math.atan2(J.dir.y || 0, J.dir.x || 1),
    v = vEl(el),
    lado = Math.random() < 0.5 ? 1 : -1;
  // lua crescente: o traço é largo no meio e fino nas pontas; brilho por baixo e fio branco por cima; a ponta corre na frente do rastro
  vfx({
    max: 0.22,
    desenhar(ox, oy, q) {
      const x = s.x - ox,
        y = s.y - oy,
        ab = 2.3,
        ini = ang - (ab / 2) * lado,
        frente = Math.min(1, q * 2.4),
        tras = Math.max(0, q * 1.6 - 0.35),
        N = 12,
        rr = r * 0.85;
      lg.lineCap = "round";
      lg.globalCompositeOperation = "lighter";
      for (const [cor, lw0, al] of [
        [v.c1, 4.2, 0.35],
        [v.c2, 2.2, 0.9],
        ["#ffffff", 0.8, 1]
      ]) {
        const lw = lw0 * K;
        lg.strokeStyle = cor;
        for (let i = 0; i < N; i++) {
          const u0 = tras + ((frente - tras) * i) / N,
            u1 = tras + ((frente - tras) * (i + 1)) / N;
          if (u1 <= u0) continue;
          const um = (u0 + u1) / 2,
            larg = Math.sin(Math.min(1, (um - tras) / Math.max(0.01, frente - tras)) * Math.PI);
          lg.globalAlpha = al * (1 - q * 0.7);
          lg.lineWidth = Math.max(0.2, lw * larg * (1 - q * 0.4));
          lg.beginPath();
          lg.arc(x, y, rr + (cor === "#ffffff" ? 0.6 : 0), ini + ab * lado * u0, ini + ab * lado * u1, lado < 0);
          lg.stroke();
        }
      }
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
  for (let i = 0; i < Math.round(4 * K); i++) {
    const a = ang + rnd(-1, 1);
    particulasEl(s.x + Math.cos(a) * r * 0.8, s.y + Math.sin(a) * r * 0.8, el, 1, 40 * K);
  }
  if (K > 1.6) luzFlash(s.x, s.y, v.c2, r * 1.2, 0.18);
}
export function vfxOnda(s, el, r) {
  const v = vEl(el),
    x0 = s.x,
    y0 = s.y,
    K = VFX_K;
  rajada(x0, y0, r * 1.2, 0.5 * K);
  vfx({
    max: 0.35,
    camada: "chao",
    desenhar(ox, oy, q) {
      lg.globalAlpha = (1 - q) * 0.8;
      lg.strokeStyle = v.c2;
      lg.lineWidth = 2 * K;
      lg.beginPath();
      lg.ellipse(x0 - ox, y0 - oy, r * q, r * q * 0.8, 0, 0, Math.PI * 2);
      lg.stroke();
      if (K > 1.5) {
        lg.globalCompositeOperation = "lighter";
        lg.globalAlpha = (1 - q) * 0.25 * (K - 1);
        lg.fillStyle = v.c2;
        lg.beginPath();
        lg.ellipse(x0 - ox, y0 - oy, r * q, r * q * 0.8, 0, 0, Math.PI * 2);
        lg.fill();
        lg.globalCompositeOperation = "source-over";
      }
      lg.globalAlpha = (1 - q) * 0.4;
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1;
      lg.beginPath();
      lg.ellipse(x0 - ox, y0 - oy, r * q * 0.7, r * q * 0.56, 0, 0, Math.PI * 2);
      lg.stroke();
    }
  });
  const nP = Math.round(8 * K);
  for (let i = 0; i < nP; i++) {
    const a = (i / nP) * Math.PI * 2;
    particulasEl(x0 + Math.cos(a) * r, y0 + Math.sin(a) * r * 0.8, el, 1, 30 * K);
  }
}
export function vfxFeixe(s, e, el) {
  const v = vEl(el),
    K = VFX_K,
    pts = [];
  const n = 6;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([t, i && i < n ? rnd(-3, 3) : 0]);
  }
  vfx({
    max: 0.16,
    desenhar(ox, oy, q) {
      const dx = e.x - s.x,
        dy = e.y - s.y,
        d = Math.hypot(dx, dy) || 1,
        nx = -dy / d,
        ny = dx / d;
      for (const [lw0, cor, al] of [
        [3, v.c2, 0.45],
        [1, v.c1, 1],
        [0.5, "#ffffff", K > 1.5 ? 0.9 : 0]
      ]) {
        const lw = lw0 * K;
        lg.globalAlpha = al * (1 - q);
        lg.strokeStyle = cor;
        lg.lineWidth = lw;
        lg.beginPath();
        pts.forEach(([t, o], i) => {
          const x = s.x + dx * t + nx * o - ox,
            y = s.y + dy * t + ny * o - oy;
          i ? lg.lineTo(x, y) : lg.moveTo(x, y);
        });
        lg.stroke();
      }
    }
  });
  particulasEl(e.x, e.y, el, 4, 50);
}
export function vfxX(e, el) {
  const v = vEl(el),
    x0 = e.x,
    y0 = e.y,
    K = VFX_K;
  vfx({
    max: 0.22,
    desenhar(ox, oy, q) {
      const L = 9 * K * Math.min(1, q * 3);
      lg.globalAlpha = 1 - q;
      lg.strokeStyle = "#ffffff";
      lg.lineWidth = 1;
      lg.beginPath();
      lg.moveTo(x0 - ox - L, y0 - oy - L);
      lg.lineTo(x0 - ox + L, y0 - oy + L);
      lg.moveTo(x0 - ox + L, y0 - oy - L);
      lg.lineTo(x0 - ox - L, y0 - oy + L);
      lg.stroke();
      lg.strokeStyle = v.c2;
      lg.globalAlpha = (1 - q) * 0.6;
      lg.lineWidth = 3;
      lg.beginPath();
      lg.moveTo(x0 - ox - L, y0 - oy - L);
      lg.lineTo(x0 - ox + L, y0 - oy + L);
      lg.stroke();
    }
  });
}
export function vfxSelo(x0, y0, el, r) {
  const v = vEl(el),
    K = VFX_K;
  vfx({
    max: 0.5,
    camada: "chao",
    desenhar(ox, oy, q) {
      lg.globalAlpha = Math.sin(q * Math.PI) * 0.8;
      lg.strokeStyle = v.c1;
      lg.lineWidth = K;
      lg.beginPath();
      lg.ellipse(x0 - ox, y0 - oy, r, r * 0.6, 0, 0, Math.PI * 2);
      lg.stroke();
      if (K > 1.5) {
        lg.beginPath();
        lg.ellipse(x0 - ox, y0 - oy, r * 0.7, r * 0.42, 0, 0, Math.PI * 2);
        lg.stroke();
      }
      for (let i = 0; i < Math.round(5 * K); i++) {
        const a = q * 2 + (i / 5) * Math.PI * 2;
        lg.fillStyle = v.c2;
        lg.fillRect(Math.round(x0 - ox + Math.cos(a) * r), Math.round(y0 - oy + Math.sin(a) * r * 0.6), 2, 1);
      }
    }
  });
}

// ---------------------------------------------------------------- projéteis com forma e rastro
// projéteis: forma suave por elemento + halo de luz + rastro afinando (desenhado em modo aditivo)
export function desenharProjetil(p, ox, oy) {
  const v = vEl(p.el),
    x = p.x - ox,
    y = p.y - oy,
    ang = Math.atan2(p.vy || 0.001, p.vx || 0.001),
    orbe = !!p.alvo || !!p.explode;
  if (x < -12 || y < -12 || x > VW + 12 || y > VH + 12) return;
  p.rastro = p.rastro || [];
  p.rastro.push([p.x, p.y]);
  if (p.rastro.length > (orbe ? 8 : 6)) p.rastro.shift();
  const rs = p.rastro;
  lg.lineCap = "round";
  lg.strokeStyle = v.c2;
  for (let i = 1; i < rs.length; i++) {
    const q = i / rs.length;
    lg.globalAlpha = q * 0.55;
    lg.lineWidth = (orbe ? 3.2 : 1.8) * q;
    lg.beginPath();
    lg.moveTo(rs[i - 1][0] - ox, rs[i - 1][1] - oy);
    lg.lineTo(rs[i][0] - ox, rs[i][1] - oy);
    lg.stroke();
  }
  const R = orbe ? 10 : 6.5;
  lg.globalAlpha = orbe ? 0.6 : 0.45;
  lg.drawImage(bolhaCor(v.c1), x - R, y - R, R * 2, R * 2);
  lg.globalAlpha = 1;
  if (orbe) {
    const pul = 1 + Math.sin(J.t * 20) * 0.2;
    lg.fillStyle = v.c2;
    lg.beginPath();
    lg.arc(x, y, 2.8 * pul, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = v.c1;
    lg.beginPath();
    lg.arc(x, y, 1.9, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = "#ffffff";
    lg.beginPath();
    lg.arc(x - 0.5, y - 0.5, 0.9, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = v.c1;
    for (let i = 0; i < 3; i++) {
      const a = J.t * 9 + i * 2.09;
      lg.beginPath();
      lg.arc(x + Math.cos(a) * 5, y + Math.sin(a) * 3.6, 0.6, 0, Math.PI * 2);
      lg.fill();
    }
    lg.lineCap = "butt";
    return;
  }
  lg.save();
  lg.translate(x, y);
  lg.rotate(ang);
  switch (v.forma) {
    case "brasa":
      lg.fillStyle = v.c2;
      lg.beginPath();
      lg.moveTo(-6, 0);
      lg.quadraticCurveTo(-1, -2.6, 1.5, -2);
      lg.arc(1.2, 0, 2, -Math.PI / 2, Math.PI / 2);
      lg.quadraticCurveTo(-1, 2.6, -6, 0);
      lg.fill();
      lg.fillStyle = v.c1;
      lg.beginPath();
      lg.arc(1, 0, 1.5, 0, Math.PI * 2);
      lg.fill();
      lg.fillStyle = "#fff3c4";
      lg.beginPath();
      lg.arc(1.4, -0.3, 0.7, 0, Math.PI * 2);
      lg.fill();
      break; // bola de fogo
    case "gota":
      lg.fillStyle = v.c2;
      lg.beginPath();
      lg.moveTo(-4.5, 0);
      lg.quadraticCurveTo(0, -2, 2.2, -1.3);
      lg.arc(2, 0, 1.4, -Math.PI / 2, Math.PI / 2);
      lg.quadraticCurveTo(0, 2, -4.5, 0);
      lg.fill();
      lg.fillStyle = "#ffffff";
      lg.globalAlpha = 0.8;
      lg.beginPath();
      lg.ellipse(1.6, -0.5, 0.8, 0.45, 0, 0, Math.PI * 2);
      lg.fill();
      break; // dardo d'água
    case "pedra":
      lg.rotate(J.t * 12);
      lg.fillStyle = v.c2;
      lg.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2,
          rr = i % 2 ? 1.8 : 2.5;
        lg.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      lg.closePath();
      lg.fill();
      lg.fillStyle = v.c1;
      lg.beginPath();
      lg.arc(-0.6, -0.6, 0.9, 0, Math.PI * 2);
      lg.fill();
      break; // pedra girando
    case "risco":
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1.3;
      lg.beginPath();
      lg.arc(-2.5, 0, 3.6, -1.25, 1.25);
      lg.stroke();
      lg.strokeStyle = "#ffffff";
      lg.lineWidth = 0.5;
      lg.beginPath();
      lg.arc(-2.2, 0, 3.6, -0.9, 0.9);
      lg.stroke();
      break; // lâmina de vento
    case "faisca": {
      lg.lineJoin = "round";
      const pts = [-5, 0, -2.5, (Math.random() - 0.5) * 3, 0, (Math.random() - 0.5) * 3, 2.5, (Math.random() - 0.5) * 3, 4.5, 0];
      for (const [cor, lw] of [
        [v.c1, 1.4],
        ["#ffffff", 0.55]
      ]) {
        lg.strokeStyle = cor;
        lg.lineWidth = lw;
        lg.beginPath();
        lg.moveTo(pts[0], pts[1]);
        for (let i = 2; i < pts.length; i += 2) lg.lineTo(pts[i], pts[i + 1]);
        lg.stroke();
      }
      break;
    } // raio
    case "folha":
      lg.rotate(Math.sin(J.t * 16) * 0.6);
      lg.fillStyle = v.c2;
      lg.beginPath();
      lg.ellipse(0, 0, 3, 1.3, 0, 0, Math.PI * 2);
      lg.fill();
      lg.strokeStyle = v.c1;
      lg.lineWidth = 0.4;
      lg.beginPath();
      lg.moveTo(-2.6, 0);
      lg.lineTo(2.6, 0);
      lg.stroke();
      break; // espinho/folha
    case "estrela":
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1.3;
      lg.beginPath();
      lg.moveTo(-5, 0);
      lg.lineTo(3, 0);
      lg.stroke();
      lg.strokeStyle = "#ffffff";
      lg.lineWidth = 0.6;
      lg.beginPath();
      lg.moveTo(-2, 0);
      lg.lineTo(3.5, 0);
      lg.stroke();
      lg.fillStyle = "#ffffff";
      lg.beginPath();
      lg.arc(3.4, 0, 0.9, 0, Math.PI * 2);
      lg.fill();
      break; // agulha de luz
    default:
      lg.fillStyle = v.c2;
      lg.beginPath();
      lg.arc(0, 0, 2.4, 0, Math.PI * 2);
      lg.fill();
      lg.fillStyle = v.c1;
      lg.beginPath();
      lg.arc(0.4, -0.4, 1.1, 0, Math.PI * 2);
      lg.fill();
  } // orbe de sombra
  lg.restore();
  lg.lineCap = "butt";
  lg.lineJoin = "miter";
}

// ---------------------------------------------------------------- especiais, reações e combinados (usa as folhas quando importadas)
export function tocarFolha(caminho, cols, x, y, tam, dur) {
  const img = folhaArte(caminho);
  if (!img) return false;
  vfx({
    max: dur,
    camada: "frente",
    desenhar(ox, oy, q) {
      const s = celulaArte(img, cols, 1, Math.min(cols - 1, Math.floor(q * cols)), 0, tam, tam, 0.5);
      lg.globalAlpha = q > 0.85 ? (1 - q) / 0.15 : 1;
      lg.drawImage(s, Math.round(x - ox - tam / 2), Math.round(y - oy - tam / 2));
    }
  });
  return true;
}
// As folhas arte/efeitos/especial__* e combinado__* vieram cortadas na conversão (cada quadro é uma fatia com pedaço do vizinho)
// e mostram um personagem inteiro por cima do cenário. Até serem refeitas, os especiais usam os efeitos desenhados abaixo.
export const USAR_FOLHAS_ESPECIAL = false;
// ---- peças de efeito desenhadas (nítidas em qualquer resolução)
export const curvaEf = q => (q < 0.15 ? q / 0.15 : q > 0.75 ? (1 - q) / 0.25 : 1); // entra rápido, segura, some
export function efCirculo(x0, y0, r, el, dur, rapido) {
  if (SIM.ativo) return;
  const v = vEl(el),
    runas = Array.from({ length: 12 }, (_, i) => i);
  vfx({
    max: dur,
    camada: "chao",
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        a = curvaEf(q),
        rot = q * (rapido ? 6 : 2.4),
        rr = r * (0.6 + 0.4 * Math.min(1, q * 4));
      lg.save();
      lg.translate(x, y);
      lg.scale(1, 0.62);
      lg.globalCompositeOperation = "lighter";
      lg.lineCap = "round";
      lg.globalAlpha = a * 0.35;
      lg.drawImage(bolhaCor(v.c1), -rr * 1.1, -rr * 1.1, rr * 2.2, rr * 2.2);
      for (const [k, lw, cor, al] of [
        [1, 2.2, v.c2, 0.55],
        [1, 0.8, "#ffffff", 0.9],
        [0.78, 1.4, v.c1, 0.8]
      ]) {
        lg.globalAlpha = a * al;
        lg.strokeStyle = cor;
        lg.lineWidth = lw;
        lg.beginPath();
        lg.arc(0, 0, rr * k, 0, Math.PI * 2);
        lg.stroke();
      }
      lg.rotate(rot);
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1;
      lg.globalAlpha = a * 0.85;
      lg.beginPath();
      for (let i = 0; i < 6; i++) {
        const t1 = (i / 6) * Math.PI * 2,
          t2 = ((i + 2) / 6) * Math.PI * 2;
        lg.moveTo(Math.cos(t1) * rr * 0.78, Math.sin(t1) * rr * 0.78);
        lg.lineTo(Math.cos(t2) * rr * 0.78, Math.sin(t2) * rr * 0.78);
      }
      lg.stroke();
      lg.rotate(-rot * 2);
      lg.fillStyle = v.c1;
      for (const i of runas) {
        const t1 = (i / 12) * Math.PI * 2,
          R2 = rr * 0.89;
        lg.save();
        lg.translate(Math.cos(t1) * R2, Math.sin(t1) * R2);
        lg.rotate(t1);
        lg.globalAlpha = a * (0.6 + 0.4 * Math.sin(q * 20 + i));
        lg.fillRect(-1.2, -0.4, 2.4, 0.8);
        lg.fillRect(-0.4, -1.2, 0.8, 2.4);
        lg.restore();
      }
      lg.restore();
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
}
export function efPilar(x0, y0, el, dur, larg) {
  if (SIM.ativo) return;
  const v = vEl(el),
    L = larg || 10;
  vfx({
    max: dur,
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        a = curvaEf(q),
        w = L * (0.4 + 0.6 * Math.sin((Math.min(1, q * 3) * Math.PI) / 2)) * (1 - Math.max(0, q - 0.7) * 2),
        h = 120;
      lg.globalCompositeOperation = "lighter";
      const gr = lg.createLinearGradient(x - w, 0, x + w, 0);
      gr.addColorStop(0, "rgba(255,255,255,0)");
      gr.addColorStop(0.3, v.c2);
      gr.addColorStop(0.5, "#ffffff");
      gr.addColorStop(0.7, v.c2);
      gr.addColorStop(1, "rgba(255,255,255,0)");
      lg.globalAlpha = a * 0.75;
      lg.fillStyle = gr;
      lg.fillRect(x - w, y - h, w * 2, h);
      lg.globalAlpha = a * 0.6;
      lg.drawImage(bolhaCor(v.c1), x - w * 2.2, y - w * 1.1, w * 4.4, w * 2.2);
      lg.globalCompositeOperation = "source-over";
    }
  });
  for (let i = 0; i < 10; i++)
    J.parts.push({
      x: x0 + rnd(-L, L) * 0.6,
      y: y0,
      vx: rnd(-6, 6),
      vy: -rnd(60, 140),
      vida: rnd(0.4, 0.8),
      max: 0.8,
      cor: v.c1,
      tam: 1,
      forma: "estrela"
    });
}
export function efCupula(x0, y0, r, el, dur) {
  if (SIM.ativo) return;
  const v = vEl(el);
  vfx({
    max: dur,
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        a = curvaEf(q),
        rr = r * (0.7 + 0.3 * Math.min(1, q * 5));
      lg.globalCompositeOperation = "lighter";
      lg.globalAlpha = a * 0.22;
      lg.fillStyle = v.c1;
      lg.beginPath();
      lg.ellipse(x, y, rr, rr * 0.95, 0, Math.PI, 0);
      lg.ellipse(x, y, rr, rr * 0.35, 0, 0, Math.PI);
      lg.fill();
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1.6;
      lg.globalAlpha = a * 0.85;
      lg.beginPath();
      lg.ellipse(x, y, rr, rr * 0.95, 0, Math.PI, 0);
      lg.stroke();
      lg.beginPath();
      lg.ellipse(x, y, rr, rr * 0.35, 0, 0, Math.PI * 2);
      lg.stroke();
      // hexágonos que brilham passando pela cúpula
      lg.lineWidth = 0.7;
      lg.strokeStyle = "#ffffff";
      for (let i = 0; i < 7; i++) {
        const t = (i / 7 + q * 0.8) % 1,
          ang = Math.PI + t * Math.PI,
          hx = x + Math.cos(ang) * rr * 0.75,
          hy = y + Math.sin(ang) * rr * 0.7,
          hr = 3;
        lg.globalAlpha = a * Math.sin(t * Math.PI);
        lg.beginPath();
        for (let k = 0; k < 6; k++) {
          const b = (k / 6) * Math.PI * 2;
          lg[k ? "lineTo" : "moveTo"](hx + Math.cos(b) * hr, hy + Math.sin(b) * hr);
        }
        lg.closePath();
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
    }
  });
}
export function efCortes(x0, y0, r, el, n) {
  if (SIM.ativo) return;
  const v = vEl(el);
  for (let i = 0; i < n; i++) {
    const ang = Math.random() * Math.PI * 2,
      t0 = i * 0.06,
      cx = x0 + rnd(-r * 0.3, r * 0.3),
      cy = y0 + rnd(-r * 0.3, r * 0.3),
      L = r * rnd(0.8, 1.2);
    vfx({
      max: 0.24 + t0,
      desenhar(ox, oy, q0) {
        const q = (q0 * (0.24 + t0) - t0) / 0.24;
        if (q < 0) return;
        const x = cx - ox,
          y = cy - oy,
          a = 1 - q,
          k = Math.min(1, q * 3);
        lg.globalCompositeOperation = "lighter";
        lg.lineCap = "round";
        const dx = Math.cos(ang) * L,
          dy = Math.sin(ang) * L * 0.7;
        for (const [lw, cor, al] of [
          [4, v.c2, 0.4],
          [1.6, v.c1, 0.9],
          [0.6, "#ffffff", 1]
        ]) {
          lg.globalAlpha = a * al;
          lg.strokeStyle = cor;
          lg.lineWidth = lw * (1 - q * 0.5);
          lg.beginPath();
          lg.moveTo(x - dx, y - dy);
          lg.lineTo(x - dx + dx * 2 * k, y - dy + dy * 2 * k);
          lg.stroke();
        }
        lg.globalCompositeOperation = "source-over";
        lg.lineCap = "butt";
      }
    });
  }
  particulasEl(x0, y0, el, 10, 90);
}
export function efImpactoChao(x0, y0, r, el) {
  if (SIM.ativo) return;
  const v = vEl(el),
    rach = Array.from({ length: 9 }, () => ({ a: Math.random() * Math.PI * 2, l: r * rnd(0.5, 1), q: rnd(-0.3, 0.3) }));
  vfx({
    max: 1.2,
    camada: "chao",
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        a = q < 0.7 ? 1 : (1 - q) / 0.3,
        k = Math.min(1, q * 8);
      lg.strokeStyle = "#1a1210";
      lg.lineCap = "round";
      for (const c of rach) {
        lg.globalAlpha = a * 0.7;
        lg.lineWidth = 1.4;
        lg.beginPath();
        lg.moveTo(x, y);
        const mx = x + Math.cos(c.a) * c.l * 0.5 * k,
          my = y + Math.sin(c.a) * c.l * 0.35 * k;
        lg.lineTo(mx, my);
        lg.lineTo(x + Math.cos(c.a + c.q) * c.l * k, y + Math.sin(c.a + c.q) * c.l * 0.7 * k);
        lg.stroke();
      }
      lg.globalCompositeOperation = "lighter";
      lg.globalAlpha = a * (1 - q) * 0.8;
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1;
      for (const c of rach) {
        lg.beginPath();
        lg.moveTo(x, y);
        lg.lineTo(x + Math.cos(c.a) * c.l * 0.5 * k, y + Math.sin(c.a) * c.l * 0.35 * k);
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
  vfxOnda({ x: x0, y: y0 }, el, r);
  tremor(5);
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2,
      vv = rnd(40, 110);
    J.parts.push({
      x: x0,
      y: y0,
      vx: Math.cos(a) * vv,
      vy: Math.sin(a) * vv * 0.6 - rnd(30, 70),
      vida: rnd(0.4, 0.8),
      max: 0.8,
      cor: "#8a7a6a",
      tam: 2
    });
  }
}
export function efChuva(x0, y0, r, el) {
  if (SIM.ativo) return;
  const v = vEl(el);
  for (let i = 0; i < 14; i++) {
    const t0 = i * 0.04,
      tx = x0 + rnd(-r, r),
      ty = y0 + rnd(-r * 0.7, r * 0.7);
    vfx({
      max: 0.28 + t0,
      desenhar(ox, oy, q0) {
        const q = (q0 * (0.28 + t0) - t0) / 0.28;
        if (q < 0) return;
        const x = tx - ox,
          y = ty - oy,
          h = 60 * (1 - q);
        lg.globalCompositeOperation = "lighter";
        lg.lineCap = "round";
        lg.globalAlpha = 0.9;
        lg.strokeStyle = v.c1;
        lg.lineWidth = 1.2;
        lg.beginPath();
        lg.moveTo(x + h * 0.3, y - h);
        lg.lineTo(x + h * 0.3 - 6, y - h + 12);
        lg.stroke();
        if (q > 0.85) {
          lg.globalAlpha = (1 - q) * 6;
          lg.drawImage(bolhaCor(v.c1), x - 5, y - 3, 10, 6);
        }
        lg.globalCompositeOperation = "source-over";
        lg.lineCap = "butt";
      }
    });
  }
}
export function efEspiral(x0, y0, r, el, dur) {
  if (SIM.ativo) return;
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 6,
      d = r * (0.2 + (i / 22) * 0.8),
      v = vEl(el);
    J.parts.push({
      x: x0 + Math.cos(a) * d,
      y: y0 + Math.sin(a) * d * 0.7,
      vx: -Math.sin(a) * 60,
      vy: Math.cos(a) * 42 - 30,
      vida: rnd(0.5, dur),
      max: dur,
      cor: i % 2 ? v.c1 : v.c2,
      tam: 1,
      forma: el === "natureza" ? "folha" : "estrela"
    });
  }
}
// ---------------------------------------------------------------- habilidades: cada uma com o seu desenho
// Antes toda habilidade era o mesmo anel. Agora cada uma tem forma própria (explosão, meteoro, muralha, puxão, salto, canto...)
// e os objetos que ficam no mapa (servos, armadilhas, portais, zonas, espírito) deixaram de ser quadradinhos.
// Nada disto roda na simulação, e com o aparelho lento (QUAL 0) os enfeites extras são cortados.
export const semVfx = () => SIM.ativo || !J || !J.cena;
// explosão: núcleo branco, bola do elemento, anel que abre e raios curtos saindo
export function efExplosao(x0, y0, r, el, forte) {
  if (semVfx()) return;
  const v = vEl(el),
    K = Math.min(2, VFX_K),
    raios = QUAL > 0 ? Array.from({ length: forte ? 12 : 7 }, () => ({ a: Math.random() * Math.PI * 2, l: rnd(0.6, 1.1) })) : [];
  luzFlash(x0, y0, v.c2, r * (forte ? 1.1 : 1.2), forte ? 0.3 : 0.22);
  vfx({
    max: forte ? 0.55 : 0.4,
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        ab = 1 - Math.pow(1 - q, 3),
        rr = r * (0.25 + 0.85 * ab),
        a = 1 - q;
      lg.globalCompositeOperation = "lighter";
      // núcleo claro pequeno e curto: grande e forte, várias explosões juntas viravam uma tela branca
      lg.globalAlpha = a * a * a * 0.55;
      lg.drawImage(bolhaCor("#ffffff"), x - rr * 0.4, y - rr * 0.32, rr * 0.8, rr * 0.64);
      lg.globalAlpha = a * a * 0.42;
      lg.drawImage(bolhaCor(v.c2), x - rr * 1.05, y - rr * 0.84, rr * 2.1, rr * 1.68);
      lg.lineCap = "round";
      lg.strokeStyle = v.c2;
      lg.lineWidth = (forte ? 3 : 2) * K * a + 0.4;
      lg.globalAlpha = a * 0.9;
      lg.beginPath();
      lg.ellipse(x, y, rr, rr * 0.8, 0, 0, Math.PI * 2);
      lg.stroke();
      lg.strokeStyle = "#ffffff";
      lg.lineWidth = 0.7;
      lg.globalAlpha = a;
      lg.beginPath();
      lg.ellipse(x, y, rr * 0.96, rr * 0.77, 0, 0, Math.PI * 2);
      lg.stroke();
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1.1;
      lg.globalAlpha = a * 0.85;
      for (const c of raios) {
        const d0 = rr * 0.55,
          d1 = rr * (0.75 + 0.45 * c.l);
        lg.beginPath();
        lg.moveTo(x + Math.cos(c.a) * d0, y + Math.sin(c.a) * d0 * 0.8);
        lg.lineTo(x + Math.cos(c.a) * d1, y + Math.sin(c.a) * d1 * 0.8);
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
  particulasEl(x0, y0, el, Math.round((forte ? 16 : 8) * Math.min(1.6, K)), forte ? 140 : 95);
  if (forte) rajada(x0, y0, r * 1.4, 1.2);
}
// meteoro: um risco cai do céu e termina no ponto de impacto, com a marca crescendo no chão (avisa onde vai cair)
export function efQueda(x0, y0, el, atraso) {
  if (semVfx()) return;
  const v = vEl(el),
    dur = 0.2,
    tot = Math.max(0, atraso) + dur;
  vfx({
    max: tot,
    desenhar(ox, oy, q0) {
      const q = (q0 * tot - (tot - dur)) / dur;
      if (q < 0) return;
      const x = x0 - ox,
        y = y0 - oy,
        h = 90 * (1 - q),
        dx = h * 0.35;
      lg.globalCompositeOperation = "lighter";
      lg.lineCap = "round";
      for (const [lw, cor, al] of [
        [3.2, v.c2, 0.45],
        [1.4, v.c1, 0.95],
        [0.5, "#ffffff", 1]
      ]) {
        lg.globalAlpha = al;
        lg.strokeStyle = cor;
        lg.lineWidth = lw;
        lg.beginPath();
        lg.moveTo(x + dx, y - h);
        lg.lineTo(x + dx + 7, y - h - 20);
        lg.stroke();
      }
      lg.globalAlpha = 0.8;
      lg.drawImage(bolhaCor(v.c1), x + dx - 4, y - h - 4, 8, 8);
      lg.globalAlpha = 0.4 * q;
      lg.strokeStyle = v.c1;
      lg.lineWidth = 0.8;
      lg.beginPath();
      lg.ellipse(x, y, 10 * q + 2, 8 * q + 1.5, 0, 0, Math.PI * 2);
      lg.stroke();
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
}
// puxão: anéis que fecham para o centro e riscos correndo para dentro
export function efPuxao(x0, y0, r, el) {
  if (semVfx()) return;
  const v = vEl(el),
    nR = QUAL > 0 ? 14 : 8,
    riscos = Array.from({ length: nR }, (_, i) => ({ a: (i / nR) * Math.PI * 2 + rnd(-0.15, 0.15), d: rnd(0.7, 1) }));
  vfx({
    max: 0.4,
    camada: "chao",
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        a = 1 - q,
        k = 1 - q * 0.85;
      lg.globalCompositeOperation = "lighter";
      lg.lineCap = "round";
      for (const [m, lw, cor, al] of [
        [1, 2, v.c2, 0.5],
        [0.72, 1, v.c1, 0.8]
      ]) {
        lg.globalAlpha = a * al;
        lg.strokeStyle = cor;
        lg.lineWidth = lw;
        lg.beginPath();
        lg.ellipse(x, y, r * k * m, r * k * m * 0.8, 0, 0, Math.PI * 2);
        lg.stroke();
      }
      lg.strokeStyle = "#ffffff";
      lg.lineWidth = 0.7;
      lg.globalAlpha = a * 0.8;
      for (const c of riscos) {
        const d1 = r * c.d * k,
          d0 = d1 * 0.72;
        lg.beginPath();
        lg.moveTo(x + Math.cos(c.a) * d1, y + Math.sin(c.a) * d1 * 0.8);
        lg.lineTo(x + Math.cos(c.a) * d0, y + Math.sin(c.a) * d0 * 0.8);
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
}
// muralha: pilares do elemento sobem em roda e seguram por um instante
export function efMuralha(x0, y0, r, el, dur) {
  if (semVfx()) return;
  const v = vEl(el),
    N = QUAL > 0 ? 16 : 10;
  vfx({
    max: dur,
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        sobe = 1 - Math.pow(1 - Math.min(1, q * 6), 2),
        a = q > 0.7 ? (1 - q) / 0.3 : 1;
      lg.globalCompositeOperation = "lighter";
      for (let i = 0; i < N; i++) {
        const t = (i / N) * Math.PI * 2,
          frente = Math.sin(t) > 0,
          px = x + Math.cos(t) * r,
          py = y + Math.sin(t) * r * 0.8,
          h = (9 + 3 * Math.sin(i * 2.3)) * sobe * (frente ? 1 : 0.8),
          al = a * (frente ? 0.75 : 0.4);
        lg.globalAlpha = al;
        lg.fillStyle = v.c2;
        lg.fillRect(px - 1.6, py - h, 3.2, h);
        lg.fillStyle = v.c1;
        lg.fillRect(px - 1.6, py - h, 3.2, 1.2);
        lg.globalAlpha = al * 0.6;
        lg.fillStyle = "#ffffff";
        lg.fillRect(px - 0.4, py - h, 0.8, h);
      }
      lg.globalAlpha = a * 0.5;
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1;
      lg.beginPath();
      lg.ellipse(x, y, r, r * 0.8, 0, 0, Math.PI * 2);
      lg.stroke();
      lg.globalCompositeOperation = "source-over";
    }
  });
}
// salto: risco de luz do ponto de partida até o alvo, que encurta e some
export function efRastroSalto(x1, y1, x2, y2, el) {
  if (semVfx()) return;
  const v = vEl(el);
  vfx({
    max: 0.28,
    desenhar(ox, oy, q) {
      const a = 1 - q,
        sx = x1 + (x2 - x1) * q * 0.8 - ox,
        sy = y1 + (y2 - y1) * q * 0.8 - oy;
      lg.globalCompositeOperation = "lighter";
      lg.lineCap = "round";
      for (const [lw, cor, al] of [
        [6, v.c2, 0.3],
        [2.4, v.c1, 0.8],
        [0.8, "#ffffff", 1]
      ]) {
        lg.globalAlpha = a * al;
        lg.strokeStyle = cor;
        lg.lineWidth = lw * a + 0.2;
        lg.beginPath();
        lg.moveTo(sx, sy);
        lg.lineTo(x2 - ox, y2 - oy);
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
}
// leque: clarão de disparo abrindo na direção do tiro
export function efLeque(x0, y0, ang, el) {
  if (semVfx()) return;
  const v = vEl(el);
  vfx({
    max: 0.16,
    desenhar(ox, oy, q) {
      const x = x0 - ox,
        y = y0 - oy,
        a = 1 - q,
        L = 10 + 22 * q;
      lg.globalCompositeOperation = "lighter";
      lg.lineCap = "round";
      lg.strokeStyle = v.c1;
      lg.lineWidth = 1.2 * a + 0.3;
      lg.globalAlpha = a;
      for (let i = -2; i <= 2; i++) {
        const t = ang + i * 0.2;
        lg.beginPath();
        lg.moveTo(x + Math.cos(t) * 4, y + Math.sin(t) * 4);
        lg.lineTo(x + Math.cos(t) * L, y + Math.sin(t) * L);
        lg.stroke();
      }
      lg.globalAlpha = a * 0.7;
      lg.drawImage(bolhaCor(v.c1), x - 7, y - 7, 14, 14);
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
}
// ondas de som: três anéis saindo um atrás do outro (acompanham o herói)
export function efCanto(r, el) {
  if (semVfx()) return;
  const v = vEl(el);
  vfx({
    max: 0.9,
    camada: "chao",
    desenhar(ox, oy, q) {
      const x = J.jogador.x - ox,
        y = J.jogador.y - oy;
      lg.globalCompositeOperation = "lighter";
      for (let i = 0; i < 3; i++) {
        const k = q * 1.4 - i * 0.2;
        if (k <= 0 || k >= 1) continue;
        lg.globalAlpha = (1 - k) * 0.8;
        lg.strokeStyle = i % 2 ? v.c1 : v.c2;
        lg.lineWidth = 1.8 * (1 - k) + 0.4;
        lg.beginPath();
        lg.ellipse(x, y, r * k, r * k * 0.8, 0, 0, Math.PI * 2);
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
    }
  });
  efEspiral(J.jogador.x, J.jogador.y, r * 0.6, el, 0.9);
}
// cura: anel verde que sobe pelo corpo e sinais de "+" subindo
export function efCura(r) {
  if (semVfx()) return;
  vfx({
    max: 0.8,
    desenhar(ox, oy, q) {
      const x = J.jogador.x - ox,
        y = J.jogador.y - oy,
        a = curvaEf(q);
      lg.globalCompositeOperation = "lighter";
      lg.strokeStyle = "#7fe0a0";
      lg.lineWidth = 1.4;
      for (let i = 0; i < 2; i++) {
        const k = (q + i * 0.35) % 1;
        lg.globalAlpha = a * (1 - k) * 0.9;
        lg.beginPath();
        lg.ellipse(x, y + 6 - k * 26, r * (0.5 - 0.2 * k), r * (0.5 - 0.2 * k) * 0.4, 0, 0, Math.PI * 2);
        lg.stroke();
      }
      lg.globalAlpha = a * 0.3;
      lg.drawImage(bolhaCor("#7fe0a0"), x - r * 0.7, y - r * 0.6, r * 1.4, r * 1.2);
      lg.globalCompositeOperation = "source-over";
    }
  });
  for (let i = 0; i < (QUAL > 0 ? 8 : 4); i++)
    J.parts.push({
      x: J.jogador.x + rnd(-12, 12),
      y: J.jogador.y + rnd(-4, 8),
      vx: rnd(-4, 4),
      vy: -rnd(18, 36),
      vida: rnd(0.5, 0.9),
      max: 0.9,
      cor: i % 2 ? "#7fe0a0" : "#d8ffd0",
      tam: 1,
      forma: "mais"
    });
}
// marca do Assassino: mira que fecha sobre o inimigo e fica nele
export function efMarca(e) {
  if (semVfx()) return;
  vfx({
    max: 0.35,
    desenhar(ox, oy, q) {
      if (e.hp <= 0) return;
      const x = e.x - ox,
        y = e.y - oy - (e.tam || 8) * 0.3,
        d = 14 * (1 - q) + 5,
        a = Math.min(1, q * 3);
      lg.globalCompositeOperation = "lighter";
      lg.strokeStyle = "#c070ff";
      lg.lineWidth = 1.2;
      lg.globalAlpha = a;
      lg.lineCap = "round";
      for (let i = 0; i < 4; i++) {
        const t = (i * Math.PI) / 2 + q * 2.5;
        lg.beginPath();
        lg.arc(x, y, d, t, t + 0.7);
        lg.stroke();
      }
      lg.globalCompositeOperation = "source-over";
      lg.lineCap = "butt";
    }
  });
}
// ---- objetos de habilidade que ficam no mapa
export function desenharCria(c, ox, oy) {
  const x = c.x - ox,
    y = c.y - oy;
  if (x < -12 || y < -12 || x > VW + 12 || y > VH + 12) return;
  const t = c.gigante ? 5 : 2.6,
    bob = Math.sin(J.t * 9 + c.x * 0.7) * 1.2 - 3,
    some = Math.min(1, c.vida * 2);
  // espírito em forma de chama com olhos (servo comum) ou maior, com anel (gigante da Fusão); o que protege o herói gira com um arco
  lg.globalCompositeOperation = "lighter";
  lg.globalAlpha = 0.55 * some;
  lg.drawImage(bolhaCor(c.cor), x - t * 2.3, y - t * 2.3 + bob, t * 4.6, t * 4.6);
  lg.globalCompositeOperation = "source-over";
  lg.globalAlpha = some;
  lg.fillStyle = tom(c.cor, 1.15);
  lg.beginPath();
  lg.moveTo(x, y - t * 1.8 + bob);
  lg.quadraticCurveTo(x + t * 1.25, y - t * 0.1 + bob, x, y + t + bob);
  lg.quadraticCurveTo(x - t * 1.25, y - t * 0.1 + bob, x, y - t * 1.8 + bob);
  lg.fill();
  lg.fillStyle = "#fffbe8";
  const o = Math.max(0.7, t * 0.3);
  lg.fillRect(x - t * 0.5, y - t * 0.1 + bob, o, o);
  lg.fillRect(x + t * 0.5 - o, y - t * 0.1 + bob, o, o);
  if (c.gigante || c.guarda) {
    lg.strokeStyle = c.cor;
    lg.lineWidth = 0.8;
    lg.globalAlpha = 0.7 * some;
    const a0 = J.t * 4;
    lg.beginPath();
    lg.ellipse(x, y + t + bob + 1, t * 1.5, t * 0.6, 0, a0, a0 + 4.2);
    lg.stroke();
  }
  lg.globalAlpha = 1;
}
export function desenharArmadilha(a, ox, oy) {
  const x = a.x - ox,
    y = a.y - oy;
  if (x < -10 || y < -10 || x > VW + 10 || y > VH + 10) return;
  const pul = 0.5 + 0.5 * Math.sin(J.t * 6 + a.x);
  lg.globalAlpha = 0.22 + 0.2 * pul;
  lg.drawImage(bolhaCor(a.cor), x - 8, y - 6, 16, 12);
  lg.globalAlpha = 0.9;
  lg.strokeStyle = a.cor;
  lg.lineWidth = 0.8;
  lg.beginPath();
  lg.ellipse(x, y, 5.5, 3.8, 0, 0, Math.PI * 2);
  lg.stroke();
  if (a.raiz) {
    lg.globalAlpha = 0.75;
    lg.beginPath();
    lg.moveTo(x - 5, y);
    lg.lineTo(x + 5, y);
    lg.moveTo(x, y - 3.4);
    lg.lineTo(x, y + 3.4);
    lg.moveTo(x - 3.6, y - 2.5);
    lg.lineTo(x + 3.6, y + 2.5);
    lg.moveTo(x + 3.6, y - 2.5);
    lg.lineTo(x - 3.6, y + 2.5);
    lg.stroke();
  } // rede
  else {
    lg.fillStyle = "#2a2030";
    lg.beginPath();
    lg.ellipse(x, y - 0.6, 2.6, 2, 0, 0, Math.PI * 2);
    lg.fill();
    lg.fillStyle = pul > 0.6 ? "#ffffff" : a.cor;
    lg.fillRect(Math.round(x) - 0.5, Math.round(y) - 1.6, 1, 1);
  } // mina com luz piscando
  lg.globalAlpha = 1;
}
export function desenharZona(z, ox, oy) {
  const x = z.x - ox,
    y = z.y - oy,
    r = z.r;
  if (x < -r - 6 || y < -r - 6 || x > VW + r + 6 || y > VH + r + 6) return;
  const fim = Math.min(1, z.vida * 2),
    pul = 0.5 + 0.5 * Math.sin(J.t * 8 + z.x * 0.3);
  if (z.tipo === "portal") {
    const a = J.t * 5;
    lg.globalCompositeOperation = "lighter";
    lg.globalAlpha = 0.5 * fim;
    lg.drawImage(bolhaCor(z.cor), x - 12, y - 9, 24, 18);
    lg.globalAlpha = 0.9 * fim;
    lg.strokeStyle = z.cor;
    lg.lineWidth = 1.2;
    lg.lineCap = "round";
    for (let i = 0; i < 3; i++) {
      const t = a * (i % 2 ? -1 : 1) + i * 2;
      lg.beginPath();
      lg.ellipse(x, y, 7.5 - i * 1.9, 5.2 - i * 1.3, 0, t, t + 3.6);
      lg.stroke();
    }
    lg.globalCompositeOperation = "source-over";
    lg.lineCap = "butt";
    lg.globalAlpha = 0.85 * fim;
    lg.fillStyle = "#120e1a";
    lg.beginPath();
    lg.ellipse(x, y, 2.6, 1.8, 0, 0, Math.PI * 2);
    lg.fill();
    lg.globalAlpha = 1;
    return;
  }
  lg.globalCompositeOperation = "lighter";
  if (z.tipo === "circulo") {
    const art = artCirculo(z.el || "luz");
    lg.save();
    lg.translate(x, y);
    lg.globalAlpha = (0.45 + 0.15 * pul) * fim;
    lg.rotate(J.t * 0.7);
    lg.drawImage(art, -r, -r, r * 2, r * 2);
    lg.rotate(-J.t * 1.9);
    lg.globalAlpha = 0.3 * fim;
    lg.drawImage(art, -r * 0.55, -r * 0.55, r * 1.1, r * 1.1);
    lg.restore();
  } else if (z.tipo === "rastro") {
    const v = vEl(z.el);
    for (let i = 0; i < 5; i++) {
      const a = i * 1.26 + J.t * 1.5,
        d = r * 0.5 * (0.5 + 0.5 * Math.sin(J.t * 3 + i)),
        rr = r * (0.5 + 0.12 * Math.sin(J.t * 9 + i * 2));
      lg.globalAlpha = (0.24 + 0.1 * pul) * fim;
      lg.drawImage(bolhaCor(i % 2 ? v.c1 : v.c2), x + Math.cos(a) * d - rr, y + Math.sin(a) * d * 0.8 - rr * 0.8, rr * 2, rr * 1.6);
    }
  } else {
    lg.globalAlpha = (0.2 + 0.06 * pul) * fim;
    lg.drawImage(bolhaCor(z.cor), x - r * 1.15, y - r * 1.15, r * 2.3, r * 2.3);
    lg.globalAlpha = 0.45 * fim;
    lg.strokeStyle = z.cor;
    lg.lineWidth = 0.8;
    lg.setLineDash([3, 3]);
    lg.lineDashOffset = -J.t * 10;
    lg.beginPath();
    lg.arc(x, y, r, 0, Math.PI * 2);
    lg.stroke();
    lg.setLineDash([]);
  }
  lg.globalCompositeOperation = "source-over";
  lg.globalAlpha = 1;
}
// espírito do Xamã: orbe com cauda na órbita (desenhado na passada de luz)
export function desenharEspirito(z, ox, oy) {
  const P = J.jogador,
    x = z.x - ox,
    y = z.y - oy;
  for (let i = 5; i >= 1; i--) {
    const a = z.ang - i * 0.2,
      rr = 5.5 - i * 0.7;
    lg.globalAlpha = 0.5 * (1 - i / 6);
    lg.drawImage(bolhaCor(z.cor), P.x + Math.cos(a) * 28 - ox - rr, P.y + Math.sin(a) * 28 - oy - rr, rr * 2, rr * 2);
  }
  lg.globalAlpha = 0.95;
  lg.drawImage(bolhaCor(z.cor), x - 8, y - 8, 16, 16);
  lg.fillStyle = "#ffffff";
  lg.beginPath();
  lg.arc(x, y, 1.8, 0, Math.PI * 2);
  lg.fill();
  lg.globalAlpha = 1;
}
export function vfxEspecial(s, alvo, cls, op, el) {
  const v = vEl(el),
    centro = ["guardiao", "mistico", "invocador", "xama"].includes(cls) ? s : alvo;
  luzFlash(centro.x, centro.y, v.c1, 90, 0.45);
  if (USAR_FOLHAS_ESPECIAL && tocarFolha(`arte/efeitos/especial__${cls}_${op + 1}.png`, 8, centro.x, centro.y, 110, 0.7)) return;
  const x0 = centro.x,
    y0 = centro.y;
  switch (cls) {
    case "guardiao":
      efCupula(x0, y0 + 4, 30, el, 0.9);
      efCirculo(x0, y0 + 6, 34, el, 0.9);
      break;
    case "assassino":
      efCortes(x0, y0, 26, el, 6);
      break;
    case "guerreiro":
      efImpactoChao(x0, y0 + 4, 44, el);
      efCortes(x0, y0 - 4, 30, el, 1);
      break;
    case "mago":
      efCirculo(x0, y0 + 4, 30, el, 0.8, true);
      efPilar(x0, y0 + 4, el, 0.7, 9);
      break;
    case "mistico":
      efCirculo(x0, y0 + 6, 36, el, 1.0);
      efEspiral(x0, y0, 30, el, 1.0);
      break;
    case "invocador":
      efCirculo(x0, y0 + 6, 32, el, 1.1, true);
      efPilar(x0, y0 + 6, el, 0.6, 6);
      efEspiral(x0, y0, 22, el, 0.8);
      break;
    case "xama":
      efEspiral(x0, y0, 36, el, 1.1);
      efCirculo(x0, y0 + 6, 30, el, 0.9);
      break;
    case "cacador":
      efChuva(x0, y0, 34, el);
      efCirculo(x0, y0 + 4, 30, el, 0.7, true);
      break;
    default:
      efCirculo(x0, y0 + 6, 32, el, 0.8);
      vfxOnda({ x: x0, y: y0 }, el, 60);
  }
  particulasEl(x0, y0, el, 14, 110);
}
export function nomeArqReacao(a, b) {
  for (const [x, y] of [
    [a, b],
    [b, a]
  ]) {
    const c = `arte/efeitos/reacao__${x}_${y}.png`;
    if (folhaArte(c)) return c;
  }
  return null;
}
export function vfxReacao(e, a, b) {
  const c = nomeArqReacao(a, b);
  luzFlash(e.x, e.y, mistura(COR[a], COR[b], 0.5), 34, 0.25);
  if (c && tocarFolha(c, 6, e.x, e.y, 44, 0.45)) return;
  particulasEl(e.x, e.y, a, 7, 85);
  particulasEl(e.x, e.y, b, 7, 85);
  vfxOnda({ x: e.x, y: e.y }, b, 18);
}
export function vfxCombinado(c, P) {
  const chave = c.chave || c.a || "luz";
  luzFlash(P.x, P.y, "#ffffff", 160, 0.6);
  if (USAR_FOLHAS_ESPECIAL && tocarFolha(`arte/efeitos/combinado__${chave}.png`, 10, P.x, P.y, 170, 1.0)) return;
  const el = VFX_EL[chave] ? chave : elementoDe(ativos()[0]);
  // combinado: círculo grande girando, pilar de luz no centro, onda e uma chuva das cores da equipe
  efCirculo(P.x, P.y + 6, 70, el, 1.4, true);
  efCirculo(P.x, P.y + 6, 46, elementoDe(ativos()[ativos().length - 1]) || el, 1.2);
  efPilar(P.x, P.y + 6, el, 1.0, 16);
  vfxOnda({ x: P.x, y: P.y }, el, 110);
  efEspiral(P.x, P.y, 60, el, 1.2);
}
