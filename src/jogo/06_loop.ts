// Elementar · entrada (toque, teclado) e laço principal do jogo
// Módulo da lógica do jogo: importa o que usa dos outros e exporta o que oferece. Entrada: js/jogo/principal.js; a avaliação segue a ordem dos nomes dos arquivos.
import "./05_arte.js"; // ordem de carga: cada módulo puxa o anterior primeiro, então a avaliação segue a ordem dos nomes dos arquivos
import {
  $,
  agendar,
  ativos,
  atrib,
  atualizarReliquias,
  calcularSinergia,
  COR,
  cv,
  defFonte,
  dist2,
  elementoDe,
  FONTE,
  J,
  L,
  MAPA_SEG,
  MINI_SEG,
  pausado,
  R,
  redimensionar,
  rnd,
  rodando,
  SIM,
  SIN,
  som,
  temRel,
  VH,
  VW
} from "./01_nucleo.js";
import {
  agirSelo,
  anel,
  curar,
  danoSimples,
  DIF,
  dificuldade,
  emArea,
  ferir,
  hordaF,
  maisProximo,
  MOD,
  parar,
  particulas,
  raio,
  spawnChefe,
  spawnInimigo,
  texto,
  tremor,
  xpPara
} from "./02_combate.js";
import {
  abrirBolsa,
  abrirNivel,
  atualizarMoedasBaus,
  checarAncestral,
  chocar,
  CINE,
  derrota,
  efeitoEvolucao,
  mostrarPortais,
  pegarOvo,
  pegarOvoAncestral,
  spawnFilhote,
  spawnOvo,
  surgirOvoAncestral,
  tentarCaptura,
  usarCombinado
} from "./03_progressao.js";
import { aplicarElementoNoSolo, atualizarSolo, CEL, efeitoSoloInimigo, soloEm } from "./04_ambiente.js";
import { atualizarCena, danificarProp, lascas, propNoPonto, rajada } from "./07_cenario.js";
import { passoAbertura, pularAbertura } from "./07d_estrutura.js";
import { ameacaDiretor, atualizarAvisos, atualizarDiretor, multDiretor } from "./08_horda.js";
import { atualizarVfx, efCirculo, efExplosao, efPilar } from "./08b_efeitos.js";
import { atualizarEventos, textoUnico } from "./08c_eventos.js";
import { atualizarArvore, tal } from "./08d_poderes.js";
import { atualizarConquistas } from "./08e_conquistas.js";
import { atualizarLenda, custo, lendaReviver, passiva } from "./08f_lendas.js";
import { atualizarLuz, luzFlash } from "./08g_luz.js";
import { atualizarCriaturas, passoCriatura } from "./09_criaturas.js";
import { atualizarPerigos, criarProp, feriJogador, iaChefe, pintarSolo } from "./09b_chefes.js";
import { chao, desenhar, desenharEquipe, desenharNinho, hud, quadroHeroi, toast } from "./10_desenho.js";
import { pausar } from "./11_menu.js";
// ================================================================ entrada
export const teclas = new Set();
export let toque = null,
  ultimoToque = 0;
addEventListener("pointerdown", () => pularAbertura());
addEventListener("keydown", e => {
  pularAbertura();
  const k = e.key.toLowerCase();
  teclas.add(k);
  if (e.key === " ") usarDespertar();
  if (k === "shift") esquivar();
  if (k === "e") usarCombinado();
});
addEventListener("keyup", e => teclas.delete(e.key.toLowerCase()));
cv.addEventListener("pointerdown", e => {
  const agora = performance.now();
  if (agora - ultimoToque < 260) esquivar();
  ultimoToque = agora;
  toque = { ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY, id: e.pointerId };
  cv.setPointerCapture(e.pointerId);
});
cv.addEventListener("pointermove", e => {
  if (toque && e.pointerId === toque.id) {
    toque.x = e.clientX;
    toque.y = e.clientY;
  }
});
export const soltar = e => {
  if (toque && e.pointerId === toque.id) toque = null;
};
cv.addEventListener("pointerup", soltar);
cv.addEventListener("pointercancel", soltar);
document.addEventListener("visibilitychange", () => {
  if (document.hidden && rodando && !pausado) pausar();
});
$("btnUlt").onclick = () => usarDespertar();
$("btnComb").onclick = () => usarCombinado();
$("btnEsq").onclick = () => esquivar();
$("btnBolsa").onclick = () => abrirBolsa();
$("btnPausa").onclick = () => {
  if (!pausado) pausar();
};
export function esquivar() {
  if (!J || pausado || J.dashCd > 0) return;
  J.usouEsquiva = true;
  J.dashCd = D.esquiva.recarga_seg;
  J.dashT = 0.15;
  J.invuln = D.esquiva.invulneravel_seg;
  particulas(J.jogador.x, J.jogador.y, "#9fd6d0", 8, 50);
}
export function usarDespertar() {
  if (!J || J.ult < 100 || pausado) return;
  J.ult = 0;
  J.desp = D.despertar.duracao_seg;
  rajada(J.jogador.x, J.jogador.y, 90, 2.5);
  R.st.despertares++;
  ativos().forEach(s => (s.tmpRamo = null));
  defFonte("despertar");
  const els = [...new Set(ativos().map(elementoDe))],
    dano = ativos().reduce((t, s) => t + atrib(s).dano, 0) * 2.5;
  for (const e of J.inimigos) {
    if (Math.abs(e.x - J.jogador.x) < VW / 2 + 10 && Math.abs(e.y - J.jogador.y) < VH / 2 + 10)
      els.forEach(el => ferir(e, dano / els.length, el));
  }
  ativos().forEach(s => efeitoEvolucao(s));
  calcularSinergia();
  desenharEquipe();
  J.flash = { vida: 0.5, cor: COR[els[0]] };
  tremor(12);
  parar(0.15);
  texto(J.jogador.x, J.jogador.y - 24, "Despertar Elemental!", "#ffd34a", 24);
}

// ================================================================ loop
export let ultimoT = 0;
// qualidade automática: mede o tempo de cada quadro e, se o aparelho não der conta, reduz primeiro o que menos se nota
export let QUAL = 2,
  MSQ = 16.7,
  tQual = 0,
  ultimoQuadro = 0,
  desenhouPausado = false;
// - limite de 60 quadros por segundo (telas de 120 Hz desenhavam o dobro sem ganho);
// - pausado (cartas, baú, cenas) ou em segundo plano: desenha um quadro e para, em vez de redesenhar a mesma imagem 60 vezes por segundo;
// - qualidade pelo tempo real entre quadros (inclui o trabalho da placa de vídeo, que é onde o celular esquenta)
document.addEventListener("visibilitychange", () => {
  ultimoT = performance.now();
  desenhouPausado = false;
});
export function mudarQual(q: number) {
  if (q === QUAL) return;
  QUAL = q;
  tQual = performance.now() / 1000;
  redimensionar();
  if (typeof chao !== "undefined" && chao && chao.pat) chao.pat = null;
}
export function passo(t: number) {
  requestAnimationFrame(passo);
  if (document.hidden) return;
  if (t - ultimoQuadro < 15.5) return;
  const intervalo = t - ultimoQuadro;
  ultimoQuadro = t;
  let dt = Math.min(0.05, (t - ultimoT) / 1000 || 0);
  ultimoT = t;
  if (!rodando || !J) return;
  const parado = pausado || CINE.ativa;
  if (parado && desenhouPausado && !J.intro) return;
  if (!pausado && !CINE.ativa) tick(dt);
  if (J) {
    desenhar(dt);
    desenhouPausado = parado;
    if (!parado && intervalo < 200) {
      MSQ = MSQ * 0.95 + intervalo * 0.05;
      const agora = t / 1000;
      if (MSQ > 21 && QUAL > 0 && agora - tQual > 2.5) {
        mudarQual(QUAL - 1);
        MSQ = 16.7;
      } else if (MSQ < 17.6 && QUAL < 2 && agora - tQual > 10) {
        mudarQual(QUAL + 1);
      }
    }
  }
}
export function tick(dt: number) {
  if (J.hitstop > 0) {
    J.hitstop -= dt;
    return;
  }
  if (J.lento > 0) {
    J.lento -= dt;
    dt *= 0.3;
  }
  if (J.deus) J.vida = J.vidaMax;
  atualizar(dt);
  if (J && J.deus) J.vida = J.vidaMax;
}
export function atualizar(dt) {
  if (J.intro && passoAbertura(dt)) return;
  J.t += dt;
  const P = J.jogador,
    rm = SIN.rm;
  if (J.agenda.length) {
    const vence = J.agenda.filter(a => a.t <= J.t);
    J.agenda = J.agenda.filter(a => a.t > J.t);
    vence.forEach(a => a.fn());
    if (!J) return;
  }
  ["dashCd", "invuln", "buffCad", "canto", "fervor", "reducao", "regen", "grito", "totemAnc"].forEach(k => {
    if (J[k] > 0) J[k] -= dt;
  });
  if (J.comb > 0) J.comb -= dt;
  if (J.comboT > 0) {
    J.comboT -= dt;
    if (J.comboT <= 0) J.combo = 0;
  }
  if (J.desp > 0) {
    J.desp -= dt;
    if (J.desp <= 0) {
      ativos().forEach(s => (s.tmpRamo = null));
      calcularSinergia();
      desenharEquipe();
      toast("O Despertar terminou.");
    } else if (Math.random() < 0.5) ativos().forEach(s => particulas(s.x, s.y + 4, COR[elementoDe(s)], 1, 25));
  }
  R.selos.forEach(s => {
    if (s.trocaCd > 0) s.trocaCd -= dt;
  });
  // movimento e esquiva
  let mx = 0,
    my = 0;
  if (teclas.has("w") || teclas.has("arrowup")) my--;
  if (teclas.has("s") || teclas.has("arrowdown")) my++;
  if (teclas.has("a") || teclas.has("arrowleft")) mx--;
  if (teclas.has("d") || teclas.has("arrowright")) mx++;
  if (toque) {
    const dx = toque.x - toque.ox,
      dy = toque.y - toque.oy,
      d = Math.hypot(dx, dy);
    if (d > 6) {
      mx = dx / Math.max(d, 40);
      my = dy / Math.max(d, 40);
    }
  }
  if (SIM.entrada) {
    const v = SIM.entrada();
    mx = v.x;
    my = v.y;
    if (v.esquivar) esquivar();
    if (v.despertar) usarDespertar();
    if (v.combinado) usarCombinado();
  }
  const mm = Math.hypot(mx, my);
  if (mm > 1) {
    mx /= mm;
    my /= mm;
  }
  if (mm > 0.1) J.dir = { x: mx, y: my };
  if (J.dashT > 0) {
    J.dashT -= dt;
    const dn = Math.hypot(J.dir.x, J.dir.y) || 1;
    P.x += (((J.dir.x / dn) * D.esquiva.distancia) / 0.15) * dt;
    P.y += (((J.dir.y / dn) * D.esquiva.distancia) / 0.15) * dt;
    J.fantasmas.push({ x: P.x, y: P.y - 6, spr: quadroHeroi("p", 0, false, "#7fe0ff"), vida: 0.18 });
  } else {
    const sj = soloEm(Math.floor(P.x / CEL), Math.floor(P.y / CEL));
    J.soloJog = sj;
    const ac = sj === "gelo" ? 0.05 : 1,
      vmul =
        (J.imparavel ? 1 : (sj === "lama" ? 0.7 : 1) * (J.atordoa > 0 ? 0.45 : 1)) *
        tal.velocidade() *
        (1 + passiva("velocidade") + custo("velocidade"));
    J.pvx += (mx * 58 * rm.vel * vmul - J.pvx) * Math.min(1, ac * 60 * dt);
    J.pvy += (my * 58 * rm.vel * vmul - J.pvy) * Math.min(1, ac * 60 * dt);
    P.x += J.pvx * dt;
    P.y += J.pvy * dt;
  }
  atualizarSolo(dt);
  // formação: a equipe segue ATRÁS do herói, em leque e espaçada (antes ficava a 13 px, colada em cima dele). O "atrás" gira
  // devagar para o lado oposto ao movimento, então ninguém fica pulando de um lado para o outro
  {
    const alvo = Math.hypot(J.pvx || 0, J.pvy || 0) > 6 && J.dir ? { x: -J.dir.x, y: -J.dir.y } : null;
    J.costas = J.costas || { x: 0, y: -1 };
    if (alvo) {
      J.costas.x += (alvo.x - J.costas.x) * Math.min(1, dt * 2.5);
      J.costas.y += (alvo.y - J.costas.y) * Math.min(1, dt * 2.5);
      const m = Math.hypot(J.costas.x, J.costas.y) || 1;
      J.costas.x /= m;
      J.costas.y /= m;
    }
  }
  const bx = J.costas.x,
    by = J.costas.y,
    form = [
      [bx * 22 - by * 24, by * 22 + bx * 24],
      [bx * 22 + by * 24, by * 22 - bx * 24],
      [bx * 40, by * 40]
    ];
  R.selos.forEach((s, i) => {
    if (!s.mon) return;
    const dxF = P.x + form[i][0] - s.x;
    if (dxF < -1) s.esq = true;
    else if (dxF > 1) s.esq = false;
    s.x += dxF * Math.min(1, dt * 5);
    s.y += (P.y + form[i][1] - s.y) * Math.min(1, dt * 5);
    agirSelo(s, dt);
  });
  if (rm.regen) curar(J.vidaMax * rm.regen * dt);
  if (J.regen > 0) curar(J.vidaMax * J.regenV * dt);
  // spawns: inimigos, ovos e filhotes
  if (!J.fim) {
    if (J.t < MAPA_SEG) {
      J.spawn +=
        dt * (DIF.base + J.t * DIF.cresc) * (1 + R.profundidade * DIF.spawn) * hordaF("horda") * multDiretor() * (1 + MOD("horda"));
      while (J.spawn > 1 && J.inimigos.length < DIF.max) {
        J.spawn--;
        spawnInimigo();
      }
      atualizarDiretor(dt);
      atualizarEventos(dt);
    } // o diretor de horda decide densidade e ondas especiais (diretor.js)
    if (!J.miniFeito && J.t >= MINI_SEG) {
      J.miniFeito = true;
      spawnChefe(true);
    }
    if (!J.chefeFeito && J.t >= MAPA_SEG) {
      J.chefeFeito = true;
      spawnChefe(false);
    }
    J.tOvo -= dt;
    if (J.tOvo <= 0) {
      J.tOvo = D.ovos.intervalo_ovo_seg * rnd(0.8, 1.2);
      spawnOvo();
    }
    J.tFilhote -= dt;
    if (J.tFilhote <= 0) {
      J.tFilhote = D.ovos.intervalo_filhote_seg * rnd(0.8, 1.2);
      spawnFilhote();
    }
  } else if (J.portalEm != null) {
    J.portalEm -= dt / (J.lento > 0 ? 0.3 : 1);
    if (J.portalEm <= 0) {
      J.portalEm = null;
      mostrarPortais();
    }
  }
  // inimigos
  const temGuarda = J.crias.length > 0 && J.crias.some(c => c.guarda); // só procura o servo-escudo se existir algum (era uma busca por inimigo, todo quadro)
  for (const e of J.inimigos) {
    if (e.escAlvo && e.esc !== e.escAlvo) {
      e.esc = Math.min(e.escAlvo, (e.esc || 1) + dt * 0.7);
      if (e.esc >= e.escAlvo) e.escAlvo = null;
    }
    if (e.virouElite > 0) e.virouElite -= dt;
    if (e.flash > 0) e.flash -= dt;
    if (e.reacCd > 0) e.reacCd -= dt;
    if (e.vulner > 0) e.vulner -= dt;
    if (e.cego > 0) e.cego -= dt;
    if (e.dotT > 0) {
      e.dotT -= dt;
      danoSimples(e, e.dot * dt);
    }
    if (e.congela > 0) {
      e.congela -= dt;
      continue;
    }
    const sol = efeitoSoloInimigo(e, dt);
    const f = (e.lenta > 0 ? 0.45 : 1) * sol.vel;
    if (e.lenta > 0) e.lenta -= dt;
    let tx = P.x,
      ty = P.y;
    if (temGuarda) {
      const guarda = J.crias.find(c => c.guarda && dist2(c, e) < 400);
      if (guarda) {
        tx = guarda.x;
        ty = guarda.y;
      }
    }
    const dx = tx - e.x,
      dy = ty - e.y,
      d = Math.hypot(dx, dy) || 1;
    const ac = sol.gelo ? 0.04 : 1;
    e.vx = (e.vx ?? (dx / d) * e.v) + ((dx / d) * e.v * f - (e.vx ?? 0)) * ac;
    e.vy = (e.vy ?? (dy / d) * e.v) + ((dy / d) * e.v * f - (e.vy ?? 0)) * ac;
    const ps = passoCriatura(e, dt, P);
    e.x += e.vx * dt * ps.m + ps.dx;
    e.y += e.vy * dt * ps.m + ps.dy;
    if (e.hp <= 0) continue;
    const dP = Math.hypot(P.x - e.x, P.y - e.y);
    if (dP < e.r + 5 && J.invuln <= 0 && !e.oculto && !(e.surgindo > 0) && !e.estatua && !e.noAr) {
      let dano = ameacaDiretor() * tal.defesa() * e.dano * dt * (e.cego > 0 ? 0.3 : 1) * (J.reducao > 0 ? 0.7 : 1);
      if (J.escudo > 0) {
        const a = Math.min(J.escudo, dano);
        J.escudo -= a;
        dano -= a;
      }
      J.vida -= dano;
      J.danoRec = (J.danoRec || 0) + dano;
      R.st.recContato += dano;
    }
    if (e.elite && !e.chefe && !e.mini && DIF.tiroElite > 0 && R.profundidade >= 1 && !J.fim) {
      e.tiro = (e.tiro ?? DIF.tiroElite) - dt;
      if (e.tiro <= 0 && dP < 150) {
        e.tiro = DIF.tiroElite;
        const a = Math.atan2(P.y - e.y, P.x - e.x);
        for (const da of [-0.2, 0, 0.2])
          J.balas.push({ x: e.x, y: e.y, vx: Math.cos(a + da) * 55, vy: Math.sin(a + da) * 55, vida: 4, dano: e.dano * 0.6 });
      }
    }
    if ((e.chefe || e.mini) && !J.fim && !iaChefe(e, dt, P)) {
      e.rajada -= dt;
      e.investida -= dt;
      if (e.rajada <= 0) {
        e.rajada = e.chefe ? 2.6 : 3.5;
        const n = e.chefe ? 14 : 8,
          off = Math.random();
        for (let i = 0; i < n; i++) {
          const a = ((i + off) / n) * Math.PI * 2;
          J.balas.push({ x: e.x, y: e.y, vx: Math.cos(a) * 42, vy: Math.sin(a) * 42, vida: 5, dano: e.dano * 0.7 });
        }
        anel(e.x, e.y, e.r + 6, "#ff5a4a", 0.3);
      }
      if (e.investida <= 0) {
        e.investida = e.chefe ? 6 : 8;
        e.x += (dx / d) * 45;
        e.y += (dy / d) * 45;
        tremor(4);
        particulas(e.x, e.y, "#ff8a6a", 14, 80);
      }
    }
  }
  J.inimigos = J.inimigos.filter(
    e => e.hp > 0 && ((Math.abs(e.x - P.x) < VW * 1.6 && Math.abs(e.y - P.y) < VH * 1.6) || e.chefe || e.mini)
  );
  atualizarCena(dt);
  if (!J) return;
  if (J.imparavel > 0) J.imparavel -= dt;
  atualizarReliquias(dt);
  atualizarPerigos(dt);
  atualizarCriaturas(dt);
  atualizarAvisos(dt);
  atualizarVfx(dt);
  atualizarLuz(dt);
  if (tal.regen() + passiva("regen") > 0 && !custo("regen_zero"))
    J.vida = Math.min(J.vidaMax, J.vida + J.vidaMax * (tal.regen() + passiva("regen")) * dt);
  atualizarArvore(dt);
  atualizarConquistas(dt);
  atualizarLenda(dt);
  for (const b of J.balas) {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.vida -= dt;
    if (b.contraInimigo) {
      for (const o of J.inimigos) {
        if (o === b.dono || o.hp <= 0) continue;
        if (dist2(b, o) < (o.r + 2) * (o.r + 2)) {
          b.vida = 0;
          const f = FONTE;
          defFonte("ambiente");
          danoSimples(o, b.dano * 3);
          defFonte(f);
          break;
        }
      }
    } else if (J.invuln <= 0 && dist2(b, P) < 25) {
      b.vida = 0;
      feriJogador(b.dano, b.el);
      if (b.cura && b.dono && b.dono.hp > 0) b.dono.hp = Math.min(b.dono.max, b.dono.hp + b.dano * 0.5);
    }
    if (b.solo && Math.random() < dt * 2.5) pintarSolo(b.x, b.y, 3, b.solo, b.solo === "fogo" ? 5 : undefined);
    if (b.vida > 0 && J.cena) {
      const q = propNoPonto(b.x, b.y, 1);
      if (q) {
        b.vida = 0;
        danificarProp(q, b.quebra ? q.max * 2 : DIF.hp * dificuldade() * 0.35, null);
        particulas(b.x, b.y, "#ff8a6a", 3, 40);
      }
    }
    if (b.vida <= 0 && !b.acabou) {
      b.acabou = true;
      if (b.deixa && J.cena) criarProp(b.deixa, b.x, b.y);
      if (b.deixaLascas && J.cena) {
        b.deixaLascas.x = b.x;
        b.deixaLascas.y = b.y;
        lascas(b.deixaLascas, 8, true);
      }
    }
  }
  J.balas = J.balas.filter(b => b.vida > 0);
  // projéteis
  for (const p of J.proj) {
    defFonte(p.fonte || "basico");
    if (p.alvo) {
      if (p.alvo.hp <= 0) p.alvo = maisProximo(p, 130);
      if (p.alvo) {
        const dx = p.alvo.x - p.x,
          dy = p.alvo.y - p.y,
          d = Math.hypot(dx, dy) || 1;
        p.vx = (dx / d) * p.vel;
        p.vy = (dy / d) * p.vel;
      }
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vida -= dt;
    for (const e of J.inimigos) {
      if (e.hp <= 0 || (p.ja && p.ja.has(e))) continue;
      if (dist2(p, e) < (e.r + p.r) * (e.r + p.r)) {
        if (p.explode) {
          for (let i = 0; i < 4; i++)
            aplicarElementoNoSolo(p.x + rnd(-p.explode, p.explode) * 0.6, p.y + rnd(-p.explode, p.explode) * 0.5, p.el);
          emArea(p.x, p.y, p.explode, o => ferir(o, p.dano, p.el));
          anel(p.x, p.y, p.explode, p.cor, 0.35);
          particulas(p.x, p.y, p.cor, 8, 70);
          p.vida = 0;
          break;
        }
        ferir(e, p.dano, p.el);
        (p.ja = p.ja || new Set()).add(e);
        if (Math.random() < 0.3) aplicarElementoNoSolo(e.x, e.y + 2, p.el);
        if (p.ric > 0 || (temRel("Bola de Borracha Sagrada") && !p.bola)) {
          const n = maisProximo(e, 60, o => !p.ja.has(o));
          if (n) {
            if (p.ric > 0) p.ric--;
            else p.bola = true;
            const dx = n.x - p.x,
              dy = n.y - p.y,
              d = Math.hypot(dx, dy) || 1,
              v = Math.hypot(p.vx, p.vy);
            p.vx = (dx / d) * v;
            p.vy = (dy / d) * v;
            continue;
          }
        }
        if (--p.perf <= 0) {
          p.vida = 0;
          break;
        }
      }
    }
    if (p.vida > 0 && J.cena && ((p.alvo && p.alvo.ehProp) || p.alvoProp)) {
      const q = propNoPonto(p.x, p.y, p.r);
      if (q && !(p.ja && p.ja.has(q))) {
        if (p.explode) {
          for (let i = 0; i < 4; i++)
            aplicarElementoNoSolo(p.x + rnd(-p.explode, p.explode) * 0.6, p.y + rnd(-p.explode, p.explode) * 0.5, p.el);
          emArea(p.x, p.y, p.explode, o => ferir(o, p.dano, p.el));
          anel(p.x, p.y, p.explode, p.cor, 0.35);
          particulas(p.x, p.y, p.cor, 8, 70);
          p.vida = 0;
        } else {
          ferir(q, p.dano, p.el);
          if (!q.mat.fixo) {
            q.vx += (p.vx * 1.5) / q.m;
            q.vy += (p.vy * 1.5) / q.m;
          }
          (p.ja = p.ja || new Set()).add(q);
          if (--p.perf <= 0) p.vida = 0;
        }
      }
    }
  }
  J.proj = J.proj.filter(p => p.vida > 0);
  // crias, totens, armadilhas e zonas
  for (const c of J.crias) {
    c.vida -= dt;
    c.cd -= dt;
    defFonte(c.fonte || "basico");
    if (c.guarda) {
      const a = J.t * 3 + J.crias.indexOf(c);
      c.x += (P.x + Math.cos(a) * 16 - c.x) * Math.min(1, dt * 5);
      c.y += (P.y + Math.sin(a) * 16 - c.y) * Math.min(1, dt * 5);
      emArea(c.x, c.y, 6, e => {
        if (c.cd <= 0) {
          ferir(e, c.dano, c.el);
          c.cd = 0.4;
        }
      });
      continue;
    }
    // o servo guarda o alvo por 0,2 s em vez de procurar o mais próximo em toda a horda a cada quadro
    c.tAlvo = (c.tAlvo || 0) - dt;
    if (!c.alvoE || c.alvoE.hp <= 0 || c.tAlvo <= 0) {
      c.alvoE = maisProximo(c, 90);
      c.tAlvo = 0.2;
    }
    const e = c.alvoE;
    if (e) {
      const dx = e.x - c.x,
        dy = e.y - c.y,
        d = Math.hypot(dx, dy) || 1,
        v = c.gigante ? 45 : 70;
      c.x += (dx / d) * v * dt;
      c.y += (dy / d) * v * dt;
      if (d < e.r + (c.gigante ? 7 : 3) && c.cd <= 0) {
        if (c.gigante) {
          emArea(c.x, c.y, 18, o => ferir(o, c.dano, c.el));
          anel(c.x, c.y, 18, c.cor, 0.3);
          tremor(2);
        } else ferir(e, c.dano, c.el);
        c.cd = c.gigante ? 0.8 : 0.5;
      }
    }
    if (c.vida <= 0 && c.kami) {
      emArea(c.x, c.y, 16, o => ferir(o, c.dano * 3, c.el));
      anel(c.x, c.y, 16, c.cor, 0.35);
      particulas(c.x, c.y, c.cor, 8, 70);
    }
  }
  J.crias = J.crias.filter(c => c.vida > 0);
  for (const t of J.totens) {
    t.vida -= dt;
    t.cd -= dt;
    defFonte("basico");
    if (t.cd <= 0) {
      const e = maisProximo(t, 80);
      if (e) {
        const dx = e.x - t.x,
          dy = e.y - t.y + 4,
          d = Math.hypot(dx, dy) || 1;
        J.proj.push({
          fonte: FONTE,
          alvoProp: e.ehProp ? e : null,
          x: t.x,
          y: t.y - 4,
          vx: (dx / d) * 140,
          vy: (dy / d) * 140,
          dano: t.dano,
          el: t.el,
          cor: t.cor,
          vida: 1,
          perf: 1,
          r: 2
        });
      }
      t.cd = 0.8;
    }
  }
  J.totens = J.totens.filter(t => t.vida > 0);
  for (const a of J.armadilhas) {
    a.vida -= dt;
    defFonte(a.fonte || "habilidade");
    const e = maisProximo(a, 8);
    if (e) {
      a.vida = 0;
      emArea(a.x, a.y, 22, o => {
        ferir(o, a.dano, a.el);
        if (a.raiz) o.congela = 2;
      });
      anel(a.x, a.y, 22, a.cor, 0.4);
      if (SIM.ativo) particulas(a.x, a.y, a.cor, 12, 90);
      else efExplosao(a.x, a.y, 22, a.el, false);
      tremor(2);
    }
  }
  J.armadilhas = J.armadilhas.filter(a => a.vida > 0);
  for (const z of J.zonas) {
    z.vida -= dt;
    defFonte(z.fonte || "habilidade");
    if (z.tipo === "circulo" && z.puxa)
      emArea(z.x, z.y, z.r, e => {
        e.x += (z.x - e.x) * dt * 1.5;
        e.y += (z.y - e.y) * dt * 1.5;
      });
    if (z.tipo === "chuva") {
      if (z.segue) {
        z.x = J.jogador.x;
        z.y = J.jogador.y;
      }
      z.cd -= dt;
      if (z.cd <= 0) {
        z.cd = 0.25;
        emArea(z.x, z.y, z.r, e => ferir(e, z.dano, z.el));
        for (let i = 0; i < 3; i++) {
          const a = Math.random() * Math.PI * 2,
            r = Math.random() * z.r;
          J.efeitos.push({
            x: z.x + Math.cos(a) * r,
            y: z.y + Math.sin(a) * r - 10,
            x2: z.x + Math.cos(a) * r,
            y2: z.y + Math.sin(a) * r,
            cor: z.cor,
            vida: 0.15,
            max: 0.15,
            linha: true
          });
        }
      }
    }
    if (z.tipo === "rastro") {
      z.cd = (z.cd || 0) - dt;
      if (z.cd <= 0) {
        z.cd = 0.5;
        emArea(z.x, z.y, z.r, e => ferir(e, z.dano, z.el));
      }
    }
    if (z.tipo === "portal") {
      z.cd -= dt;
      if (z.cd <= 0) {
        z.cd = 0.6;
        J.crias.push({ fonte: FONTE, x: z.x, y: z.y, dano: z.dano, el: z.el, cor: z.cor, vida: 4, cd: 0 });
        particulas(z.x, z.y, z.cor, 4, 40);
      }
    }
    if (z.tipo === "espirito") {
      z.ang += dt * 4;
      z.x = P.x + Math.cos(z.ang) * 28;
      z.y = P.y + Math.sin(z.ang) * 28;
      z.cd -= dt;
      if (z.cd <= 0) {
        z.cd = 0.35;
        emArea(z.x, z.y, 10, e => {
          ferir(e, z.dano, z.el);
          if (z.el2) ferir(e, z.dano * 0.5, z.el2);
        });
        if (z.cadeia) {
          const ts = J.totens;
          for (let i = 0; i < ts.length - 1; i++) {
            raio(ts[i].x, ts[i].y - 4, ts[i + 1].x, ts[i + 1].y - 4, z.cor);
            emArea((ts[i].x + ts[i + 1].x) / 2, (ts[i].y + ts[i + 1].y) / 2, 14, e => ferir(e, z.dano * 0.5, z.el));
          }
        }
      }
    }
  }
  J.zonas = J.zonas.filter(z => z.vida > 0);
  // ovos e filhotes selvagens
  for (const o of J.ovosMapa) {
    o.vida -= dt;
    if (J.fim) {
      o.x += (P.x - o.x) * Math.min(1, dt * 3);
      o.y += (P.y - o.y) * Math.min(1, dt * 3);
    }
    if (dist2(o, P) < 64) {
      o.vida = 0;
      pegarOvo(o);
    }
  }
  J.ovosMapa = J.ovosMapa.filter(o => o.vida > 0);
  if (J.tAnc > 0) {
    J.tAnc -= dt;
    if (J.tAnc <= 0) surgirOvoAncestral();
  }
  if (J.ovoAnc && dist2(J.ovoAnc, P) < 144) {
    const o = J.ovoAnc;
    J.ovoAnc = null;
    pegarOvoAncestral(o);
  }
  if (R.ancestral.estado === "chocando" && !J.fim) {
    R.ancestral.prog += dt;
    checarAncestral();
    J.tAncUI = (J.tAncUI || 0) + dt;
    if (J.tAncUI > 1) {
      J.tAncUI = 0;
      desenharNinho();
    }
  }
  for (const f of J.selvagens) {
    f.vida -= dt;
    const dx = f.x - P.x,
      dy = f.y - P.y,
      d = Math.hypot(dx, dy) || 1;
    if (d < 70) {
      f.x += (dx / d) * 36 * dt;
      f.y += (dy / d) * 36 * dt;
    } else {
      f.x += Math.sin(J.t * 2 + f.x) * 10 * dt;
    }
    if (f.selando) {
      f.x -= (dx / d) * 36 * dt;
      f.y -= (dy / d) * 36 * dt;
      continue;
    }
    if (f.fugaRapida > 0) {
      f.fugaRapida -= dt;
      f.x += (dx / d) * 40 * dt;
      f.y += (dy / d) * 40 * dt;
    }
    if (f.imune > 0) f.imune -= dt;
    if (d < 8 && !(f.imune > 0)) tentarCaptura(f);
  }
  J.selvagens = J.selvagens.filter(f => f.vida > 0);
  // cristais
  const ima = 22 * rm.ima * tal.coleta();
  for (const g of J.gemas) {
    g.x += g.vx * dt;
    g.y += g.vy * dt;
    g.vx *= 0.9;
    g.vy *= 0.9;
    const d = Math.sqrt(dist2(g, P));
    if (d < ima || J.fim || g.puxar) {
      g.voa = (g.voa || 0) + dt;
      const ac = Math.min(1, dt * (6 + g.voa * 30));
      g.x += (P.x - g.x) * ac;
      g.y += (P.y - g.y) * ac;
    } // puxão que acelera: o cristal voa até você
    if (d < 6) {
      g.pega = true;
      J.cadeia = J.t - (J.tCadeia ?? -9) < 0.45 ? (J.cadeia || 0) + 1 : 0;
      J.tCadeia = J.t;
      som("gema", J.cadeia);
      J.pulsoXp = 1;
      if (!SIM.ativo && QUAL > 0) particulas(P.x, P.y - 4, g.cor, 2, 35);
      ganharXp(g.v * rm.xp * (1 + Math.min(D.combo.xp_max, (J.combo / 10) * D.combo.xp_por_10)));
    }
  }
  J.gemas = J.gemas.filter(g => !g.pega);
  atualizarMoedasBaus(dt, ima);
  // partículas e textos
  for (const p of J.parts) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += (p.g ?? 60) * dt;
    p.vx *= 0.96;
    p.vida -= dt;
  }
  J.parts = J.parts.filter(p => p.vida > 0);
  J.nums.forEach(n => {
    n.vida -= dt;
    n.y += n.vy * dt * 0.3;
    n.x += (n.vx || 0) * dt * 0.3;
    n.vy += 80 * dt;
    if (n.pop > 0) n.pop = Math.max(0, n.pop - dt * 6);
  });
  J.nums = J.nums.filter(n => n.vida > 0);
  J.textos.forEach(t => {
    t.vida -= dt;
    t.y -= dt * 12;
  });
  J.textos = J.textos.filter(t => t.vida > 0);
  J.efeitos.forEach(f => (f.vida -= dt));
  J.efeitos = J.efeitos.filter(f => f.vida > 0);
  J.fantasmas.forEach(f => (f.vida -= dt));
  J.fantasmas = J.fantasmas.filter(f => f.vida > 0);
  if (J.vida <= 0 && temRel("Ovo de Koschei") && !J.koschei) {
    J.koschei = true;
    J.vida = 1;
    J.invuln = Math.max(J.invuln, 1.5);
    anel(P.x, P.y, 50, "#c8c8e0", 0.8);
    tremor(6);
    toast("Ovo de Koschei: a morte foi enganada!");
  }
  if (J.vida <= 0 && !lendaReviver()) {
    if (J.renascer > 0) {
      J.renascer = 0;
      const mi = ativos().find(s => L(s).classe === "mistico" && s.pod.h2 > 0);
      const mod = mi ? mi.mod.h2 : null;
      J.vida = J.vidaMax * (mod === 1 ? 0.7 : 0.4);
      anel(P.x, P.y, 60, "#fff3c4", 0.8);
      efPilar(P.x, P.y + 6, "luz", 1.0, 14);
      efCirculo(P.x, P.y + 6, 40, "luz", 1.1, true);
      tremor(8);
      toast("Renascer!");
      if (mod === 0) {
        emArea(P.x, P.y, 70, e => ferir(e, atrib(mi).dano * 8, elementoDe(mi)));
        anel(P.x, P.y, 70, "#ff8a3d", 0.7);
        efExplosao(P.x, P.y, 70, "fogo", true);
        particulas(P.x, P.y, "#ff8a3d", 24, 150, 2);
      }
    } else if (J.reviver > 0) {
      J.reviver--;
      J.vida = J.vidaMax * 0.5;
      toast("Ankh: a equipe se levanta!");
    } else if (R.reviverMeta > 0) {
      R.reviverMeta--;
      J.vida = J.vidaMax * 0.5;
      J.invuln = Math.max(J.invuln, 1.5);
      anel(P.x, P.y, 60, "#ffd34a", 0.8);
      tremor(8);
      toast("Segunda Chance: a equipe se levanta!");
    } else return derrota();
  }
  hud();
}
// subida de nível: câmera lenta curta, onda dourada, coluna de luz e faíscas; o "NÍVEL X" grande aparece no HUD
export function efeitoNivel() {
  if (SIM.ativo || !J) return;
  const P = J.jogador;
  J.lento = Math.max(J.lento || 0, 0.35);
  luzFlash(P.x, P.y, "#ffe080", 110, 0.8);
  anel(P.x, P.y, 22, "#ffffff", 0.35);
  anel(P.x, P.y, 70, "#ffd34a", 0.7);
  particulas(P.x, P.y, "#fff3a0", 26, 140, 2);
  J.colunaNivel = { t: 0 };
  const el = $("nivelPop");
  if (el) {
    el.textContent = `Nível ${J.nivel + 1}!`;
    el.classList.remove("vis");
    void el.offsetWidth;
    el.classList.add("vis");
  }
}
export function ganharXp(v: number) {
  v *= tal.xp() * (1 + passiva("xp"));
  J.xp += v;
  for (const ov of R.ninho) ov.prog += v;
  const prontos = R.ninho.filter(o => o.prog >= o.alvo);
  if (prontos.length) {
    R.ninho = R.ninho.filter(o => o.prog < o.alvo);
    prontos.forEach(chocar);
  }
  desenharNinho();
  while (J.xp >= J.xpProx) {
    som("nivel");
    efeitoNivel();
    J.xp -= J.xpProx;
    J.nivel++;
    J.xpProx = xpPara(J.nivel);
    J.niveisPend++;
    if (temRel("Tabuletas do Destino") && Math.random() < 0.3) {
      J.niveisPend++;
      textoUnico("tabuleta", J.jogador.x, J.jogador.y - 22, "Destino: escolha extra!", "#ffd34a", 14);
    }
    const P = J.jogador;
    anel(P.x, P.y, 50, "#ffd34a", 0.6);
    emArea(P.x, P.y, 50, e => {
      const dx = e.x - P.x,
        dy = e.y - P.y,
        d = Math.hypot(dx, dy) || 1;
      e.x += (dx / d) * 22;
      e.y += (dy / d) * 22;
    });
    particulas(P.x, P.y, "#ffd34a", 16, 100);
    tremor(3);
  }
  if (J.niveisPend > 0 && !pausado && !J.nivelAgendado) {
    J.nivelAgendado = true;
    agendar(0.15, () => {
      J.nivelAgendado = false;
      if (!pausado && J.niveisPend > 0) {
        J.niveisPend--;
        abrirNivel();
      }
    });
  }
}
