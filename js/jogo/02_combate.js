// Elementar · mapa, modificadores da run (Presságio e Cartas Proibidas), impacto, dano, reações, mortes e ataques
// Parte 2 de 11 da lógica do jogo. Cada parte é um módulo: importa o que usa das outras e exporta o que oferece.
// A entrada é js/jogo/principal.js; as partes são avaliadas na ordem 01 → 11.
import "./01_nucleo.js";   // ordem de carga: os módulos são avaliados de 01 a 11, como antes (cada um puxa o anterior primeiro)
import { $, agendar, ativos, atrib, calcularSinergia, COR, defFonte, defJ, defMapaSeg, defMiniSeg, defPausado, defRodando, dist2, eficacia,
  elementoDe, ELS, embaralhar, escolha, est, filaEsp, filaRamo, fNivel, FONTE, fRecarga, gerarSprite, gravar, J, L, lg, LINHA, MAPA_SEG,
  MAPAS_POR_ERA, META, mistura, NIV, NOME_EL, pausado, R, REAC, relDano, rnd, SIM, SIN, som, spriteSelo, temRel, UNIV, VH, VW } from "./01_nucleo.js";
import { abrirBau, cenaChefe, diaria, dispararEspecial, fechar, mostrarCartas, proximaEscolha, recargaEspecial, salvarRun, soltarBau, soltarMoedas,
  vencerChefe } from "./03_progressao.js";
import { artesDoMapa, preCarregar, resetAnimSelo } from "./05_arte.js";
import { QUAL } from "./06_loop.js";
import { aposAbertura, bolhaCor, danificarProp, iniciarAbertura, iniciarCena, propMaisProximo, rajada } from "./07_cenario.js";
import { aoDisparar, atribPoder, bauDesperto, circuloInvocacao, custo, efCanto, efCortes, efCupula, efCura, efEspiral, efExplosao, efImpactoChao,
  efLeque, efMarca, efMuralha, efPilar, efPuxao, efQueda, efRastroSalto, evento, fatorXPDiretor, luzFlash, multDanoLenda, particulasEl, passiva, tal,
  textoUnico, vEl, vfx, vfxCorte, vfxFeixe, vfxOnda, vfxReacao, vfxSelo, vfxX } from "./08_sistemas.js";
import { anunciar, aoMorrerCriatura, defInimigo, fadigaChefe, faseDois, prepararCriatura } from "./09_criaturas.js";
import { desenharEquipe, desenharNinho, gerarChao, toast } from "./10_desenho.js";
// ================================================================ mapa
export function iniciarMapa(){
  defMapaSeg(R.profundidade<3? 110 : 150); defMiniSeg(Math.round(MAPA_SEG/2));
  const u=UNIV[R.universo]; if(!SIM.ativo) preCarregar(artesDoMapa(u));
  defJ({t:0, inimigos:[], proj:[], balas:[], crias:[], totens:[], gemas:[], nums:[], textos:[], efeitos:[], parts:[], ovosMapa:[], selvagens:[], armadilhas:[], zonas:[], fantasmas:[],
     jogador:{x:0,y:0}, dir:{x:1,y:0}, vida:1, vidaMax:1, escudo:0, xp:R.xp||0, nivel:R.nivel||1, xpProx:xpPara(R.nivel||1), ult:0, spawn:0, niveisPend:0,
     miniFeito:false, chefeFeito:false, chefeVivo:null, fim:false, eraChefe:R.mapaNaEra===MAPAS_POR_ERA-1,
     combo:0, comboT:0, comboMax:0, shake:0, hitstop:0, lento:0, desp:0, dashCd:0, dashT:0, invuln:0, buffCad:0, canto:0, fervor:0, reducao:0, renascer:0,
     tOvo:8, tFilhote:18, ultimoSE:-9, regen:0, agenda:[], tChefe:null, comb:D.combinado_regras.carga_inicial_seg, grito:0, totemAnc:0, solo:new Map(), tSolo:0, tFogo:0, soloJog:"chao", pvx:0, pvy:0, perigos:[], golpes:[], cadaveres:[], falas:[], escuro:0});
  R.selos.forEach((s,i)=>{ resetAnimSelo(s); s.x=(i-1)*14; s.y=10; s.cd=rnd(0,.5); s.cd1=rnd(2,4); s.cd2=rnd(4,7); s.tmpRamo=null; s.furia=0; s.trocaCd=0; });
  if(R.ancestral.estado==="mapa") R.ancestral={estado:"nenhum"};
  { const AR=D.ancestral_regras, m=R.profundidade+1; J.tAnc=-1; J.ovoAnc=null;
    if(R.ancestral.estado==="nenhum"&&m>=AR.mapa_min&&(m>=AR.garantido_no_mapa||Math.random()<AR.chance_por_mapa)) J.tAnc=rnd(25,60); }
  calcularSinergia();
  if(R.mapaNaEra===0&&R.profundidade>0){ R.vidaFrac=1; setTimeout(()=>toast("Santuário: vida cheia e trocas livres."),2300); }
  if(SIN.rm.curaTroca) R.vidaFrac=1;
  J.vida=J.vidaMax*(R.vidaFrac??1); J.reviver=SIN.rm.reviver;
  if(temRel("Taça de Jamshid")&&R.profundidade>0){ J.vida=Math.min(J.vidaMax,J.vida+J.vidaMax*0.25); J.escudo+=J.vidaMax*0.15; }
  ativos().forEach(s=>{ s.cdEsp=10; if(s.esp==null&&s.nivel>=NIV[1]&&!filaEsp.includes(s)) filaEsp.push(s); if(s.mon.ramo==null&&s.nivel>=NIV[2]&&!filaRamo.includes(s)) filaRamo.push(s); if(D.classes[L(s).classe].nome==="Místico"&&s.pod.h2>0) J.renascer=1; });
  gerarChao(u); iniciarCena(u); iniciarAbertura(); J.abates0=R.abates; evento("era:"+u.era); J.escudoGolpes=passiva("escudo_golpes");
  for(let i=0;i<(R.profundidade===0?2:4);i++) spawnInimigo(); if(R.profundidade===0) J.invuln=Math.max(J.invuln,2.5);
  $("lugar").textContent=`${u.nome} · ${D.eras[u.era].nome}${R.ciclo?` · ciclo ${R.ciclo+1}`:""} · mapa ${R.profundidade+1}`;
  if(!J.intro){ $("hud").style.display=""; $("hudBase").style.display=""; }
  desenharEquipe(); desenharNinho(); defRodando(true); defPausado(false);
  aposAbertura(()=>{ const forte=ELS.find(k=>D.vantagem[k]===u.elemento), naReserva=R.reserva.find(m=>LINHA[m.id]&&LINHA[m.id].elemento===forte), naEquipe=ativos().some(s=>elementoDe(s)===forte);
    toast(`${u.nome}<br><small>Inimigos de ${NOME_EL(u.elemento)}. ${dicaVantagem(u.elemento)}${naReserva&&!naEquipe?`<br><b>${LINHA[naReserva.id].filhote}</b> está na reserva: toque num Selo para trocar (grátis agora).`:""}</small>`); });
  if(filaRamo.length||filaEsp.length) agendar(0.3,()=>{ if(!pausado) proximaEscolha(); });
  if(R.profundidade===0&&!R.pressagio&&!SIM.ativo&&!R.teste) aposAbertura(()=>telaPressagio());
}
// ================================================================ modificadores da run: Presságio (escolhido no começo) e Cartas Proibidas
// Cada um soma em R.mods; MOD(k) é lido pelos multiplicadores de dano, vida, crítico, XP, velocidade, área, recarga,
// inimigos (vida, velocidade, quantidade), moedas, sorte nos ovos, carga do Despertar e dano das reações.
export function MOD(k){ return (R&&R.mods&&R.mods[k])||0; }
export function somarMods(m){ R.mods=R.mods||{}; for(const k in m) R.mods[k]=(R.mods[k]||0)+m[k]; if(typeof calcularSinergia==="function"&&J) calcularSinergia(); }
export const PRESSAGIOS=[
  {id:"lua_sangue", nome:"Lua de Sangue", cor:"#e0464a", texto:"Inimigos com +40% de vida e 30% mais numerosos. <span class='bom'>XP +60% e moedas +50%.</span>", mods:{inimigoVida:0.4, horda:0.3, xp:0.6, ouro:0.5}},
  {id:"mare_ouro", nome:"Maré de Ouro", cor:"#ffd34a", texto:"<span class='bom'>Moedas e Essência em dobro.</span> Inimigos 20% mais rápidos.", mods:{ouro:1, inimigoVel:0.2}},
  {id:"vidro", nome:"Lâmina de Vidro", cor:"#9fe0ff", texto:"<span class='bom'>+50% de dano.</span> Você recebe 40% mais dano.", mods:{dano:0.5, danoRec:0.4}},
  {id:"sorte", nome:"Estrela da Sorte", cor:"#b77cff", texto:"<span class='bom'>Ovos e baús muito mais raros.</span> XP -15%.", mods:{sorte:0.18, xp:-0.15}},
  {id:"tempestade", nome:"Tempestade Elemental", cor:"#7fe0ff", texto:"<span class='bom'>Reações elementais com +70% de dano.</span> Ataques comuns -10%.", mods:{reacao:0.7, dano:-0.1}},
  {id:"pes_ligeiros", nome:"Pés Ligeiros", cor:"#7fe8c0", texto:"<span class='bom'>+25% de velocidade e +20% de cadência.</span> Vida -20%.", mods:{velocidade:0.25, cadencia:0.2, vida:-0.2}},
  {id:"colosso", nome:"Colosso", cor:"#d8a060", texto:"<span class='bom'>Vida +60%.</span> Velocidade -15% e dano -10%.", mods:{vida:0.6, velocidade:-0.15, dano:-0.1}},
  {id:"enxame", nome:"Enxame", cor:"#a8d860", texto:"Hordas 70% maiores, mas cada inimigo com -35% de vida. <span class='bom'>XP +25%.</span>", mods:{horda:0.7, inimigoVida:-0.35, xp:0.25}},
  {id:"cacador", nome:"Olho do Caçador", cor:"#ff9a3d", texto:"<span class='bom'>+20% de chance de crítico.</span> Área dos golpes -15%.", mods:{critico:0.2, area:-0.15}},
  {id:"eco", nome:"Eco Ancestral", cor:"#ffe6a6", texto:"<span class='bom'>Despertar carrega 2x mais rápido.</span> Dano -10%.", mods:{despertar:1, dano:-0.1}},
  {id:"vastidao", nome:"Vastidão", cor:"#c4ccd8", texto:"<span class='bom'>Área dos golpes +35%.</span> Recarga 10% mais lenta.", mods:{area:0.35, cadencia:-0.1}}];
export function telaPressagio(){ if(!J||SIM.ativo) return; const ops=embaralhar(PRESSAGIOS.slice()).slice(0,3); som("ding");
  mostrarCartas("Presságio", "Os astros mudam as regras desta run. Escolha um.", ops.map(p=>({ titulo:p.nome, raridade:"epico", classe:"pressagio", texto:p.texto,
    acao:()=>{ R.pressagio=p.id; somarMods(p.mods); anunciar({el:"luz"},p.nome,"Presságio desta run"); luzFlash(J.jogador.x,J.jogador.y,p.cor,90,0.6); som("ding"); defPausado(false); fechar(); salvarRun(); } })), {revelar:true});
  /** @type {NodeListOf<HTMLElement>} */($("telaCartas").querySelectorAll(".carta.pressagio")).forEach((b,i)=>b.style.setProperty("--rar",ops[i].cor)); }
export const MALDICOES=[
  {id:"sangue", nome:"Pacto de Sangue", texto:"<span class='bom'>+35% de dano</span> para sempre nesta run. <span class='custo'>Vida máxima -25%.</span>", mods:{dano:0.35, vida:-0.25}},
  {id:"vidro2", nome:"Coração de Vidro", texto:"<span class='bom'>+15% de chance de crítico.</span> <span class='custo'>Recebe 30% mais dano.</span>", mods:{critico:0.15, danoRec:0.3}},
  {id:"ganancia", nome:"Ganância", texto:"<span class='bom'>Moedas +80%.</span> <span class='custo'>Inimigos com +20% de vida.</span>", mods:{ouro:0.8, inimigoVida:0.2}},
  {id:"fome", nome:"Fome do Enxame", texto:"<span class='bom'>XP +40%.</span> <span class='custo'>Hordas 35% maiores.</span>", mods:{xp:0.4, horda:0.35}},
  {id:"frenesi", nome:"Frenesi Selvagem", texto:"<span class='bom'>Cadência +30%.</span> <span class='custo'>Área -20%.</span>", mods:{cadencia:0.3, area:-0.2}},
  {id:"tormenta", nome:"Olho da Tormenta", texto:"<span class='bom'>Reações +50%.</span> <span class='custo'>Inimigos 15% mais rápidos.</span>", mods:{reacao:0.5, inimigoVel:0.15}}];
// carta proibida: às vezes aparece junto das cartas de nível; ganho grande e um preço que dura a run inteira
export function cartaProibida(){ if(SIM.ativo||!J||J.nivel<6||Math.random()>0.2) return null; const ops=MALDICOES.filter(m=>!(R.maldicoes||[]).includes(m.id)); if(!ops.length) return null; const m=escolha(ops);
  return { titulo:"☠ "+m.nome, raridade:"lendario", classe:"maldita", texto:m.texto+"<br><small>Carta Proibida: escolha com cuidado.</small>",
    acao:()=>{ (R.maldicoes=R.maldicoes||[]).push(m.id); somarMods(m.mods); som("jackpot"); tremor(8); luzFlash(J.jogador.x,J.jogador.y,"#c0304a",90,0.6); anunciar({el:"sombra"},m.nome,"Carta Proibida aceita"); proximaEscolha(); } }; }
export function dicaVantagem(el){ const forte=ELS.find(k=>D.vantagem[k]===el); return `${NOME_EL(forte)} é super efetivo aqui.`; }
// Curva de dificuldade (calibrada com o bot: testes/bot.js + testes/rodar_bot.js; ver docs/ANALISE_EQUILIBRIO.md)
export const DIF={vida:1.33, dano:1.48, danoBase:11, hp:38, spawn:0.15, base:1.6, cresc:0.1, onda:22, ondaN:20, max:280,
  rapido:42, rapidoCresc:5, rapidoMax:70, frente:0.2, frenteCresc:0.07, tiroElite:2.8, nivelAtrib:0.03, xpA:6, xpB:4, xpC:0.35,
  mini:80, chefe:560, guardiao:760, chefe1:0.5, chefeQueda:0.12, rampa:2.0, rampaK:2.2,
  // horda: quantos inimigos o diretor quer na tela = (hordaBase + mapa*hordaProf + segundos*(hordaT + mapa*hordaTProf)) * horda, até hordaMax.
  // horda é a intensidade geral (também multiplica os nascimentos); hordaVida, hordaDano e hordaXp valem só para inimigos comuns
  // Valores escolhidos por simulação (docs/EQUILIBRIO_SIMULACOES.md): 1,6x mais inimigos, cada um com 62% da vida, 80% do dano e 62% das
  // recompensas. A "massa" da horda e o ritmo de níveis ficam iguais, os abates por minuto dobram e a tela fica menos tempo vazia.
  // Acima disso (2,4x) os abates não sobem mais e aparecem mortes no primeiro mapa.
  // hordaRampa: a intensidade entra aos poucos (mapa 1 sem mudança, cheia depois de hordaRampa mapas). Com a horda densa desde o começo,
  // quem começa com ataque de alvo único (Caçador, Xamã) não limpava a tela, não subia de nível e caía no primeiro mapa
  horda:1.6, hordaBase:7, hordaProf:7, hordaT:0.3, hordaTProf:0.04, hordaMax:190, hordaVida:0.62, hordaDano:0.8, hordaXp:0.62, hordaRampa:2};
// intensidade da horda neste mapa: cada fator vai de 1 (primeiro mapa) até o valor de DIF
export const hordaK=()=>DIF.hordaRampa>0? Math.min(1,R.profundidade/DIF.hordaRampa) : 1;
export const hordaF=k=>1+(DIF[k]-1)*hordaK();   /* mais difícil (o jogo estava fácil): mais dano, mais inimigos desde o começo e rampa inicial mais forte */   // vida de mini-chefe, chefe e Guardião da Era (em inimigos comuns); o 1º chefe leva chefe1 disso
// ameaças que crescem com a profundidade: começo suave, fim duro
export const velRapido=()=>Math.min(DIF.rapidoMax, DIF.rapido+DIF.rapidoCresc*R.profundidade);
export const chanceFrente=()=>Math.min(0.65, DIF.frente+DIF.frenteCresc*R.profundidade);
// rampa: a equipe ganha muito poder nos primeiros mapas (evoluções); os inimigos acompanham mais rápido no começo e o crescimento
// fixo por mapa fica mais suave, para não virar um muro de repente lá na frente
export const rampa=()=>1+DIF.rampa*(1-Math.exp(-R.profundidade/DIF.rampaK));
export const dificuldade=()=>Math.pow(DIF.vida,R.profundidade)*rampa()*(1+R.ciclo*1.5);
export const danoDif=()=>Math.pow(DIF.dano,R.profundidade)*rampa()*(1+R.ciclo*1.5);
export const xpPara=n=>Math.round(DIF.xpA+DIF.xpB*n+DIF.xpC*n*n);

export function spawnInimigo(kForcado){
  const u=UNIV[R.universo], k=kForcado??(Math.random()<0.45?0:Math.random()<0.6?1:2);
  // nasce à frente da direção de movimento com chance DIF.frente (impede fugir para sempre)
  let lado=Math.floor(Math.random()*4); const dir=J.dir||{x:0,y:0};
  if(Math.random()<chanceFrente()&&Math.hypot(dir.x,dir.y)>0.2) lado = Math.abs(dir.x)>Math.abs(dir.y)? (dir.x>0?3:2) : (dir.y>0?1:0);
  const base=[{hp:.6,v:velRapido(),r:4,n:8},{hp:1,v:24,r:5,n:9},{hp:2.4,v:16,r:6,n:11}][k], elite=Math.random()<0.035;
  const el=Math.random()<0.85?u.elemento:escolha(ELS), hp=DIF.hp*hordaF("hordaVida")*base.hp*dificuldade()*(1+J.t/90)*(elite?7:1);
  const hx=VW/2+10, hy=VH/2+10, px=lado<2? rnd(-hx,hx) : (lado===2?-hx:hx), py=lado<2? (lado===0?-hy:hy) : rnd(-hy,hy);
  J.inimigos.push({x:J.jogador.x+px, y:J.jogador.y+py, hp, max:hp, v:base.v*(1+R.profundidade*0.02), r:base.r*(elite?1.6:1), esc:elite?1.2:1,
    dano:DIF.danoBase*hordaF("hordaDano")*danoDif()*(elite?2:1), tipo:k, el, elite, chefe:false, mini:false,
    spr:gerarSprite(u.id+"i"+k+el, base.n, mistura(COR[el],["#d8473b","#8a4fd0","#e0904a"][k],0.35), {olhos:"#fff2a0"}),
    status:null, lenta:0, congela:0, cego:0, dot:0, dotT:0, reacCd:0, vulner:0, flash:0, marca:0});
  const e=J.inimigos[J.inimigos.length-1]; e.xpF=fatorXPDiretor()*hordaF("hordaXp"); if(R.mods){ e.max*=1+MOD("inimigoVida"); e.hp=e.max; e.v*=1+MOD("inimigoVel"); } if((R.talismas&&R.talismas.mascara)||custo("risco")){ e.max*=tal.riscoVida()*(1+custo("risco")); e.hp=e.max; e.v*=tal.riscoVel(); } e.cor=mistura(COR[el],["#d8473b","#8a4fd0","#e0904a"][k],0.35); prepararCriatura(e,defInimigo(k),[17,20,23][k]);
}
// Onda de cerco: um anel de inimigos fecha em volta do jogador (use a esquiva para atravessar)
export function ondaCerco(){ const n=Math.min(Math.round(DIF.ondaN*(1+R.profundidade*0.15)),Math.max(8,DIF.max+20-J.inimigos.length)), P=J.jogador, r=Math.min(VW,VH)*0.42;
  for(let i=0;i<n;i++){ spawnInimigo(); const e=J.inimigos[J.inimigos.length-1], a=i/n*Math.PI*2; e.x=P.x+Math.cos(a)*r; e.y=P.y+Math.sin(a)*r; e.v*=1.15; }
  tremor(3); }
export function spawnChefe(mini){
  const u=UNIV[R.universo], era=D.eras[u.era], nome=mini?u.mini_chefe:(J.eraChefe?era.guardiao:u.chefe);
  const hp=DIF.hp*dificuldade()*(mini?DIF.mini:(J.eraChefe?DIF.guardiao:DIF.chefe))*(R.profundidade===0?DIF.chefe1:1)/(1+DIF.chefeQueda*R.profundidade);   // chefes do fundo não viram esponja   // +40% com a árvore de poderes: a luta dura o bastante para mostrar golpes e segunda fase  // primeiro chefe mais leve: a equipe ainda é pequena
  const e={x:J.jogador.x, y:J.jogador.y-VH*0.55, hp, max:hp, v:mini?20:15, r:mini?10:15, esc:1, dano:DIF.danoBase*2.25*danoDif(), tipo:9, el:u.elemento, elite:true, chefe:!mini, mini, nome,
    spr:gerarSprite(u.id+(mini?"mini":"boss")+(J.eraChefe?"era":""), mini?14:20, J.eraChefe?"#7a4fb0":COR[u.elemento], {olhos:"#ffd34a"}),
    status:null, lenta:0, congela:0, cego:0, dot:0, dotT:0, reacCd:0, vulner:0, flash:0, marca:0, rajada:2.5, investida:5};
  const cb=mini? u.combate&&u.combate.mini : J.eraChefe? era.combate : u.combate&&u.combate.chefe;
  if(cb){ const andar={ave:"voa",espectro:"flutua",bolha:"flutua",aquatico:"flutua",serpente:"rasteja"}[cb.corpo]||"caminha";
    e.cor=J.eraChefe?"#7a4fb0":mistura(COR[u.elemento],"#5a3a4a",0.25); prepararCriatura(e,Object.assign({nome,andar,golpe:"contato",morte:mini?"estilhaca":"evapora"},cb),mini?32:J.eraChefe?54:44); e.eraChefe=!mini&&J.eraChefe; }
  J.inimigos.push(e); if(!mini){ J.chefeVivo=e; J.tChefe=J.t; J.atingidoNoChefe=false; }
  tremor(6); som("chefe"); if(mini) toast(`Mini-chefe: ${nome}`); else cenaChefe(e,nome,J.eraChefe);
}
export function maisProximo(o,alc,f){ let best=null, bd=alc*alc; for(const e of J.inimigos){ if(e.hp<=0||e.oculto||(e.imortal&&e.hp<=1)||(f&&!f(e))) continue; const d=dist2(o,e); if(d<bd){bd=d; best=e;} }
  if(!best&&!f&&J.cena){
    // Koschei imortal: a equipe mira no carvalho (e depois no ovo) em vez de bater num chefe que não morre
    const ch=J.chefeVivo, k=ch&&ch.imortal? (ch.carvalho&&!ch.carvalho.morto? ch.carvalho : J.cena.lista.find(p=>p.ovoMorte&&!p.morto)) : null;
    best= k&&dist2(o,k)<alc*alc? k : propMaisProximo(o,Math.min(alc,55)); }
  return best; }
export function maisForte(o,alc){ let best=null, bh=-1; for(const e of J.inimigos){ if(e.hp<=0||dist2(o,e)>alc*alc) continue; const p=e.max*(e.chefe?3:e.mini?2:e.elite?1.5:1); if(p>bh){bh=p; best=e;} } return best; }
export function emArea(x,y,r,fn){ if(FONTE!=="ambiente") r*=tal.area(); const r2=r*r; for(const e of J.inimigos){ if(e.hp<=0) continue; const dx=e.x-x, dy=e.y-y; if(dx*dx+dy*dy<=r2+e.r*e.r) fn(e);}
  if(J.cena) for(const p of J.cena.lista){ if(p.morto||p.hp<=0) continue; const dx=p.x-x, dy=p.y-y; if(dx*dx+dy*dy>r2+p.r*p.r) continue;
    const x0=p.x, y0=p.y; fn(p); if(!p.morto&&(p.x!==x0||p.y!==y0)){ const ddx=p.x-x0, ddy=p.y-y0; p.x=x0; p.y=y0; if(!p.mat.fixo){ const k=Math.min(8,240/p.m); p.vx+=ddx*k; p.vy+=ddy*k; } } } }
export function pontoDenso(o,alc){ let best=null, bn=0; for(const e of J.inimigos){ if(e.hp<=0||dist2(o,e)>alc*alc) continue; let n=0; for(const f of J.inimigos) if(dist2(e,f)<900) n++; if(n>bn){bn=n; best=e;} } return best; }

// ================================================================ efeitos de impacto
export function tremor(v){ v= v>=10? v*0.7 : Math.min(4,v*0.45); J.shake=Math.max(J.shake,v); }   // tremor suave: só os grandes momentos (Despertar, combinado, chefe) sacodem forte
export function parar(t){ J.hitstop=Math.max(J.hitstop,t); }
export function particulas(x,y,cor,n,vel,tam){ const L=J.parts.length; if(L>380) n=Math.ceil(n/4); else if(L>250) n=Math.ceil(n/2); if(QUAL===0) n=Math.ceil(n/2); for(let i=0;i<n;i++){ if(J.parts.length>320) J.parts.shift(); const a=Math.random()*Math.PI*2, v=rnd(vel*0.3,vel);
  J.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-rnd(0,vel*0.3),vida:rnd(.3,.7),max:.7,cor,tam:tam||1+Math.floor(Math.random()*2)}); } }
export function anel(x,y,r,cor,dur){ J.efeitos.push({x,y,r,cor,vida:dur||.35,max:dur||.35}); }
export function raio(x1,y1,x2,y2,cor){ J.efeitos.push({x:x1,y:y1,x2,y2,cor,vida:.22,max:.22,linha:true}); }
export function numero(x,y,v,cor,tam,alvo){
  // golpes seguidos no mesmo inimigo somam no mesmo número (menos poluição na tela)
  if(alvo){ const n=J.nums.find(k=>k.alvo===alvo&&k.cor===cor&&k.vida>0.35); if(n){ n.v+=Math.round(v); n.vida=Math.max(n.vida,0.6); n.x=x; n.y=y; n.pop=1; return; } }
  if(J.nums.length>20) J.nums.shift(); J.nums.push({x:x+rnd(-3,3),y,v:Math.round(v),cor,tam,vida:.8,max:.8,vy:-44,vx:((Math.abs(x*13.7+y*7.3+J.t*31)%32)-16),alvo}); }
export function texto(x,y,t,cor,tam){ if(J.textos.length>12) J.textos.shift(); J.textos.push({x,y,t,cor,tam:tam||16,vida:1.1}); }

// sombra de contato: elipse com borda macia (imagem pronta, escalada), mais escura no centro
export let SOMBRA_IMG=null;
export function sombraContato(x,y,w,a){ if(!SOMBRA_IMG){ SOMBRA_IMG=document.createElement("canvas"); SOMBRA_IMG.width=64; SOMBRA_IMG.height=64; const g=SOMBRA_IMG.getContext("2d"), gr=g.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,"rgba(0,0,0,1)"); gr.addColorStop(0.45,"rgba(0,0,0,.75)"); gr.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=gr; g.fillRect(0,0,64,64); SOMBRA_IMG._suave=true; }
  const h=Math.max(1.6,w*0.38), a0=lg.globalAlpha; lg.globalAlpha=a0*a; const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true; lg.drawImage(SOMBRA_IMG,x-w/2,y-h/2,w,h); lg.imageSmoothingEnabled=suave; lg.globalAlpha=a0; }
// faísca de impacto: clarão branco no ponto do golpe, riscos que saem na cor do elemento e um anel fino (crítico maior).
// No máximo uma a cada 0,07 s por inimigo, para não virar borrão quando muitos golpes acertam juntos.
export function faiscaImpacto(e,el,crit,sup){ if(SIM.ativo||QUAL===0) return; if(J.t-(e._faisca??-9)<0.07) return; e._faisca=J.t; const v=vEl(el), x0=e.x+rnd(-2,2), y0=e.y-3+rnd(-2,2), n=crit?7:sup?5:3, base=Math.random()*6.28, tam=crit?1.6:1;
  const riscos=[]; for(let i=0;i<n;i++) riscos.push({a:base+i/n*6.28+rnd(-0.3,0.3),l:rnd(5,9)*tam});
  vfx({max:crit?0.22:0.16,desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, k=1-q; lg.globalCompositeOperation="lighter"; lg.lineCap="round";
    lg.globalAlpha=k*0.9; lg.drawImage(bolhaCor(crit?"#fff3a0":v.c1),x-6*tam*(0.6+q),y-6*tam*(0.6+q),12*tam*(0.6+q),12*tam*(0.6+q));
    for(const r of riscos){ const d0=r.l*q*0.7, d1=r.l*(0.35+q); lg.strokeStyle=crit?"#fff3a0":v.c2; lg.lineWidth=1.4*k*tam; lg.globalAlpha=k; lg.beginPath(); lg.moveTo(x+Math.cos(r.a)*d0,y+Math.sin(r.a)*d0); lg.lineTo(x+Math.cos(r.a)*d1,y+Math.sin(r.a)*d1); lg.stroke();
      lg.strokeStyle="#ffffff"; lg.lineWidth=0.5*k*tam; lg.stroke(); }
    if(crit||sup){ lg.strokeStyle=crit?"#ffe066":v.c2; lg.lineWidth=0.8*k; lg.globalAlpha=k*0.8; lg.beginPath(); lg.arc(x,y,3+q*10*tam,0,Math.PI*2); lg.stroke(); }
    lg.lineCap="butt"; lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }});
  if(crit) luzFlash(e.x,e.y,"#ffe9a0",34,0.18); }
// ================================================================ dano, reações, mortes
export function ferir(e,dano,el,o={}){
  if(e.ehProp){ danificarProp(e,dano,el); return; }
  if(e.hp<=0||e.oculto) return;
  const ef=eficacia(el,e.el), crit=o.crit||Math.random()<0.08+tal.critico()+(ativos().some(s=>s.berserk>0)?0.2:0);
  let d=dano*ef*(crit?1.8:1)*(e.vulner>0?1.2:1)*(e.bebado>0?1.5:1)*fadigaChefe(e)*multDanoLenda(e)*relDano(e);
  for(const z of J.zonas) if(z.tipo==="circulo"&&dist2(z,e)<z.r*z.r) d*=z.amp;
  R.st.porFonte[FONTE]=(R.st.porFonte[FONTE]||0)+Math.min(d,Math.max(0,e.hp)); e.hp-=d; e.flash=0.08; e.golpeT=J.t;
  // impacto: o inimigo dá um tranco para trás no desenho, proporcional ao golpe (crítico mais forte). Só visual: empurrar de verdade
  // espalhava a horda, os golpes em área acertavam menos e as lutas ficavam até 7x mais longas
  if(!e.chefe&&!e.estatua&&e.max>0){ const P=J.jogador, dx=e.x-P.x, dy=e.y-P.y, dd=Math.hypot(dx,dy)||1, k=Math.min(1,d/e.max*3)*(crit?3:1.8)*(e.elite||e.mini?0.5:1); e.rx=(e.rx||0)+dx/dd*k; e.ry=(e.ry||0)+dy/dd*k; const m=Math.hypot(e.rx,e.ry); if(m>3.5){ e.rx*=3.5/m; e.ry*=3.5/m; } }
  if(crit){ som("critico"); numero(e.x,e.y-6,d,"#ffe066",20,e); anel(e.x,e.y-3,9,"#fff3c4",.16); particulas(e.x,e.y,"#fff3a0",5,60); }
  else if(ef>1){ numero(e.x,e.y-6,d,"#ff8a3d",17,e); }
  else if(ef<1){ numero(e.x,e.y-6,d,"#9a98a8",12,e); }
  else numero(e.x,e.y-6,d,"#fff8e6",13,e);
  som("acerto");
  if(ef>1&&J.t-J.ultimoSE>0.6){ J.ultimoSE=J.t; textoUnico("superef",e.x,e.y-14,"Super efetivo!","#ff8a3d",15); anel(e.x,e.y,14,"#ff8a3d",.3); particulasEl(e.x,e.y-4,"luz",4,50); tremor(1.5); }
  particulasEl(e.x,e.y,el,2,40); faiscaImpacto(e,el,crit,ef>1);
  if(e.status&&e.status.el!==el&&e.reacCd<=0&&J.t-e.status.t<4){ reagir(e,e.status.el,el,d); e.reacCd=0.6; }
  e.status={el,t:J.t};
  if(e.hp<=0) morrer(e);
}
export function danoSimples(e,d){ if(e.ehProp){ danificarProp(e,d,null); return; } if(e.hp<=0||e.oculto) return; R.st.porFonte[FONTE]=(R.st.porFonte[FONTE]||0)+Math.min(d,Math.max(0,e.hp)); e.hp-=d; e.flash=0.06; if(e.hp<=0) morrer(e); }
export function reagir(e,a,b,dano){
  const r=REAC[[a,b].sort().join("|")]; if(!r) return;
  const fonteAnt=FONTE; defFonte("reacao"); reagirEfeito(e,a,b,dano,r); defFonte(fonteAnt);
}
export function reagirEfeito(e,a,b,dano,r){ evento("reacao"); diaria("reacoes");
  if(!SIM.ativo&&!META.dicaReacao){ META.dicaReacao=true; gravar(); toast(`<b>Reação elemental!</b><br><small>${NOME_EL(a)} + ${NOME_EL(b)} no mesmo inimigo. Misturar elementos na equipe é a maior fonte de dano do jogo.</small>`); }
  const p=Math.max(dano,6)*2.2*SIN.reac*(1+MOD("reacao")), cor=mistura(COR[a],COR[b],.5);
  R.st.reacoes[r.nome]=(R.st.reacoes[r.nome]||0)+1; textoUnico("r:"+r.nome,e.x,e.y-10,r.nome,cor,17); vfxReacao(e,a,b);
  switch(r.tipo){
    case "explosao": case "dano_area": anel(e.x,e.y,26,cor,.45); emArea(e.x,e.y,26,o=>{ if(o!==e) danoSimples(o,p); }); danoSimples(e,p); tremor(4); break;
    case "cadeia": { let alvo=e; const vistos=new Set([e]); for(let i=0;i<5;i++){ const n=maisProximo(alvo,48,o=>!vistos.has(o)); if(!n) break; raio(alvo.x,alvo.y,n.x,n.y,cor); danoSimples(n,p*0.7); vistos.add(n); alvo=n; } break; }
    case "lentidao": emArea(e.x,e.y,26,o=>o.lenta=2.5); anel(e.x,e.y,26,cor,.6); break;
    case "congelar": case "enraizar": emArea(e.x,e.y,22,o=>o.congela=1.6); anel(e.x,e.y,22,cor,.6); break;
    case "cegueira": emArea(e.x,e.y,28,o=>{o.cego=3; o.lenta=2;}); anel(e.x,e.y,28,cor,.7); break;
    case "propaga": emArea(e.x,e.y,32,o=>{o.status={el:a,t:J.t}; danoSimples(o,p*0.4);}); anel(e.x,e.y,32,cor,.4); break;
    case "cura": if(J.t-(J.tCuraReac??-9)>=0.5){ J.tCuraReac=J.t; curar(J.vidaMax*0.025); particulas(J.jogador.x,J.jogador.y,"#7fe0a0",8,40); } break;   // no máximo 1 cura a cada 0,5 s
    case "buff": J.buffCad=4; texto(J.jogador.x,J.jogador.y-16,"Cadência!",cor,14); break;
    case "escudo": J.escudo=Math.min(J.vidaMax*0.3,J.escudo+J.vidaMax*0.08); anel(J.jogador.x,J.jogador.y,16,"#fff3c4",.4); break;
    case "puxar": emArea(e.x,e.y,42,o=>{o.x+=(e.x-o.x)*0.7; o.y+=(e.y-o.y)*0.7; danoSimples(o,p*0.4);}); anel(e.x,e.y,42,cor,.5); break;
    case "empurrar": emArea(e.x,e.y,38,o=>{const dx=o.x-e.x, dy=o.y-e.y, d=Math.hypot(dx,dy)||1; o.x+=dx/d*26; o.y+=dy/d*26; o.vulner=3;}); anel(e.x,e.y,38,cor,.4); break;
    case "dano_tempo": case "dano_pct": e.dot=p*0.5; e.dotT=3; break;
    case "dano_elite": danoSimples(e,(e.elite||e.chefe||e.mini)?p*2.5:p); anel(e.x,e.y,12,cor,.3); break;
    case "silenciar": emArea(e.x,e.y,32,o=>o.congela=1.2); anel(e.x,e.y,32,cor,.5); break;
    case "verdadeiro": danoSimples(e,p*1.8); anel(e.x,e.y,16,"#ffffff",.4); break;
  }
}
export function morrer(e){
  if(e.fugitivo&&!e._pagou){ e._pagou=true; diaria("eventos"); soltarBau(e.x,e.y,"ouro"); anunciar({el:"luz"},"Fugitivo derrotado!","Ele deixou um baú dourado."); }
  // todo chefe mostra a segunda fase: um golpe que pularia a metade da vida para na fase 2
  if(e.chefe&&e.def&&e.def.fase2&&e.ia&&e.ia.fase===1&&!e.morto){ e.hp=e.max*0.45; e.ia.fase=2; faseDois(e,e.def.fase2); e.ia.ocupado=1.4; e.parado=true; return; }
  if(e.imortal){ e.hp=1; if(Math.random()<.15) texto(e.x,e.y-20,"Imortal! Quebre o carvalho.","#c8c8e0",13); return; }
  if(e.morto) return; e.morto=true; aoMorrerCriatura(e);
  if(temRel("Hidromel do Salão dos Heróis")){ J.hidro=J.hidro||[]; if(J.hidro.length<30) J.hidro.push(J.t+10); else { J.hidro.shift(); J.hidro.push(J.t+10); } }
  // abates em sequência: matar muitos em pouco tempo solta um "Massacre" com som subindo e moedas extras
  if(!SIM.ativo){ J.janelaAbates=(J.janelaAbates||[]).filter(t=>J.t-t<1.4); J.janelaAbates.push(J.t); const n=J.janelaAbates.length;
    if(n===8||n===15||n===25||n===40){ const nome=n>=40?"Aniquilação":n>=25?"Carnificina":n>=15?"Massacre":"Sequência"; texto(J.jogador.x,J.jogador.y-34,`${nome} x${n}!`,n>=25?"#ff6a8a":n>=15?"#ffb040":"#ffe680",n>=25?20:16);
      som(n>=25?"jackpot":"combo"); soltarMoedas(e.x,e.y,Math.floor(n/8)); luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",60,0.4); } }
  R.abates++; R.abatesPeso=(R.abatesPeso??R.abates-1)+hordaF("hordaXp"); diaria("abates"); if(R.ancestral&&R.ancestral.estado==="chocando") R.ancestral.prog+=D.ancestral_regras.por_abate_seg*hordaF("hordaXp"); if(R.st.primeiroAbate==null) R.st.primeiroAbate=J.t; J.combo++; J.comboT=D.combo.janela_seg; J.comboMax=Math.max(J.comboMax,J.combo);
  J.ult=Math.min(100,J.ult+(e.chefe?25:e.mini?10:e.elite?2:0.07*hordaF("hordaXp"))*(1+Math.min(1,J.combo/200))*(1+MOD("despertar")));
  const cor=COR[e.el]; particulas(e.x,e.y,cor,e.chefe?60:e.elite?22:9,e.chefe?150:90,e.elite?2:1);
  if(e.elite){ tremor(e.chefe?10:4); parar(e.chefe?0.2:0.05); rajada(e.x,e.y,e.chefe?80:35,e.chefe?2:1); }
  const val=(e.chefe?40:e.mini?15:e.elite?8:1.6*(1+(e.tipo===2?1:0)))*(1+0.12*R.profundidade)*(e.xpF||1);   // inimigo comum vale mais: a horda é menor   // xpF: inimigos extras do diretor valem menos
  const nG=Math.min(6,Math.ceil(val/3)); for(let i=0;i<nG;i++){ const a=Math.random()*Math.PI*2; J.gemas.push({x:e.x,y:e.y,vx:Math.cos(a)*rnd(20,50),vy:Math.sin(a)*rnd(20,50),v:val/nG,cor}); }
  if(e.marca>0){ anel(e.x,e.y,24,"#c070ff",.35); emArea(e.x,e.y,24,o=>danoSimples(o,e.marca)); }
  if(e.elite&&!e.chefe&&!e.mini&&Math.random()<(e.daOnda?0.1:0.3)) darItem(itemUtil(["incenso","doce","pena","doce"]), e);
  // moedas de Essência e baús: recompensa pequena e frequente, e de vez em quando uma grande
  { const nm=e.chefe?24:e.mini?10:e.elite?3+Math.floor(Math.random()*3):(Math.random()<0.035*hordaF("hordaXp")?1:0); soltarMoedas(e.x,e.y,nm); }
  if(e.mini||(e.elite&&!e.chefe&&!e.daOnda&&Math.random()<0.1)) soltarBau(e.x,e.y,"prata");
  if(e.mini) evento("mini"); if(e.elite&&!e.chefe&&!e.mini) evento("elite"); if(!e.chefe&&!e.mini&&!e.clone&&!e.especial&&e.tipo<=2) evento("abate:"+e.tipo); if(e.especial&&e.roubou) evento("saci");
  if(e.mini){ darItem(itemUtil(["incenso","incenso","doce"]),e); if(!bauDesperto(e.x,e.y)) darItem(itemUtil(["pedra","doce","pena"]),e); }   // o baú entrega o Desperto no lugar do item
  for(const m of D.combo.marcos) if(J.combo===m){ som("combo"); soltarMoedas(J.jogador.x,J.jogador.y-6,2+Math.floor(m/25)); luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",70,0.5); texto(J.jogador.x,J.jogador.y-22,`Frenesi ${m}!`,"#ffd34a",16); anel(J.jogador.x,J.jogador.y,60,"#ffd34a",.6);
    emArea(J.jogador.x,J.jogador.y,60,o=>{const dx=o.x-J.jogador.x, dy=o.y-J.jogador.y, d=Math.hypot(dx,dy)||1; o.x+=dx/d*30; o.y+=dy/d*30;}); tremor(5); }
  if(e===J.chefeVivo){ bauDesperto(e.x,e.y); vencerChefe(e); agendar(1.1,()=>{ if(J) abrirBau({tipo:"ouro",x:e.x,y:e.y}); }); }
}
export function curar(v){ if(J&&v>0) J.curou=true; const sobra=J.vida+v-J.vidaMax; J.vida=Math.min(J.vidaMax,J.vida+v); if(sobra>0&&J.regen>0&&J.regenMod===0) J.escudo=Math.min(J.vidaMax*0.3,J.escudo+sobra); }
// item na hora certa: cada item ganha peso pelo quanto serve agora (Pedra perto de virar Adulto, Mel perto de evoluir,
// Incenso com Selo vazio, Pena com reserva e troca em recarga); o que não serviria para nada quase não cai
export function utilItem(k){ const at=ativos(); if(!R||!at.length) return 1;
  switch(k){
    case "pedra": return at.some(s=>s.mon.ramo==null&&s.nivel>=NIV[2]-3)&&!R.pedraAtiva? 4 : at.some(s=>s.mon.ramo==null)? 1 : 0.05;
    case "doce": return at.some(s=>NIV.some(n=>s.nivel===n-1))? 3 : 1;
    case "incenso": return R.selos.some(s=>!s.mon)? 4 : R.reserva.length<2? 1.5 : 0.6;
    case "pena": return R.reserva.length&&R.selos.some(s=>s.trocaCd>0)? 3 : R.reserva.length? 1 : 0.1;
    case "chamado": return 1; }
  return 1; }
export function itemUtil(lista){ const w=lista.map(utilItem), tot=w.reduce((a,b)=>a+b,0); let r=Math.random()*tot; for(let i=0;i<lista.length;i++){ r-=w[i]; if(r<=0) return lista[i]; } return lista[0]; }
// algum item da bolsa serve agora? (o botão Bolsa brilha)
export function itemUsavelAgora(){ if(!R||!J) return false; const I=R.itens; return (I.incenso>0&&R.selos.some(s=>!s.mon))||(I.doce>0&&ativos().some(s=>NIV.some(n=>s.nivel===n-1)))||I.chamado>0||(I.pedra>0&&!R.pedraAtiva&&ativos().some(s=>s.mon.ramo==null&&s.nivel>=NIV[2]-1))||(I.pena>0&&R.reserva.length&&R.selos.some(s=>s.trocaCd>3)); }
export function darItem(k,e){ R.itens[k]++; const lend=k==="chamado"; texto(e.x,e.y-16,D.itens[k].nome,lend?"#ffd34a":"#9fd6d0",lend?16:13); particulas(e.x,e.y,lend?"#ffd34a":"#9fd6d0",lend?30:10,lend?110:60);
  if(lend&&!SIM.ativo){ anunciar({el:"luz"},"Item lendário!",D.itens[k].nome); som("jackpot"); luzFlash(e.x,e.y,"#ffd34a",90,0.7); anel(e.x,e.y,30,"#ffd34a",.6); } }

// ================================================================ ataques: básico + habilidades por classe
export function ataqueBasico(s,a,el,cor){
  const cls=L(s).classe;
  switch(cls){
    case "guardiao": emArea(s.x,s.y,26,e=>{ferir(e,a.dano,el); const dx=e.x-s.x,dy=e.y-s.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*8; e.y+=dy/d*8;}); vfxOnda(s,el,26); break;
    case "guerreiro": emArea(s.x,s.y,24,e=>ferir(e,a.dano,el)); vfxCorte(s,el,24); break;
    case "assassino": { const e=maisProximo(s,80); if(!e) return .2; vfxX(e,el); J.fantasmas.push({x:s.x,y:s.y,spr:spriteSelo(s),vida:.2}); s.x=e.x-4; s.y=e.y-4; ferir(e,a.dano*1.2,el); particulas(e.x,e.y,cor,4,60); break; }
    case "cacador": { const e=maisProximo(s,140); if(!e) return .2; const n=1+(SIN.cacadores>=2?1:0)+tal.projeteis();
      for(let i=0;i<n;i++){ const ang=Math.atan2(e.y-s.y,e.x-s.x)+(i-(n-1)/2)*0.18; J.proj.push({fonte:FONTE,alvoProp:e.ehProp?e:null,x:s.x,y:s.y,vx:Math.cos(ang)*170,vy:Math.sin(ang)*170,dano:a.dano,el,cor,vida:1.2,perf:SIN.cacadores>=3?3:1,r:2}); } break; }
    case "mago": { const e=maisProximo(s,130); if(!e) return .2; J.proj.push({fonte:FONTE,x:s.x,y:s.y,vx:0,vy:0,alvo:e,vel:95,dano:a.dano,el,cor,vida:2.5,perf:1,r:3,explode:22}); break; }
    case "invocador": { vfxSelo(s.x,s.y,el,9); const n=2+(SIN.invocadores>=2?1:0)+tal.projeteis(); for(let i=0;i<n;i++) J.crias.push({fonte:FONTE,x:s.x+rnd(-6,6),y:s.y+rnd(-6,6),dano:a.dano*0.6,el,cor,vida:6,cd:0}); return 2.5; }
    case "mistico": { const e=maisProximo(s,110); if(e){ ferir(e,a.dano,el); vfxFeixe(s,e,el);} if(Math.random()<.5) particulasEl(J.jogador.x+rnd(-4,4),J.jogador.y,"natureza",2,20); curar(a.cura/a.cad*3); break; }
    case "xama": { vfxSelo(s.x,s.y,el,10); const meus=J.totens.filter(t=>t.dono===s); if(meus.length>=3) meus[0].vida=0; J.totens.push({x:s.x,y:s.y,dono:s,dano:a.dano,el,cor,vida:6*tal.duracao(),cd:0}); return 2.5; }
  }
  return 1;
}
// Habilidades 1 e 2: recarga base em segundos; o modificador é escolhido no nível 3.
export const HAB={
  guardiao:{ h1:{cd:7, f(s,a,el,cor,lv,mod){ emArea(s.x,s.y,60,e=>{ e.x+=(s.x-e.x)*0.5; e.y+=(s.y-e.y)*0.5; if(mod===0) ferir(e,a.dano*2*fNivel(lv),el); }); J.reducao=3; efPuxao(s.x,s.y,60,el); efCupula(J.jogador.x,J.jogador.y+4,15,el,1.1); if(mod===1) J.escudo=Math.min(J.vidaMax*0.4,J.escudo+J.vidaMax*0.1); tremor(2); }},
             h2:{cd:10,f(s,a,el,cor,lv,mod){ const rr=mod===0?65:50; emArea(s.x,s.y,rr,e=>{ ferir(e,a.dano*2*fNivel(lv),el); const dx=e.x-s.x,dy=e.y-s.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*30; e.y+=dy/d*30; e.congela=mod===0?3.2:1; }); anel(s.x,s.y,rr,cor,.6); efMuralha(s.x,s.y,rr,el,mod===0?1.6:0.9); efImpactoChao(s.x,s.y,rr*0.7,el);
               if(mod===1) agendar(1,()=>{ emArea(s.x,s.y,55,e=>ferir(e,a.dano*4*fNivel(lv),el)); efExplosao(s.x,s.y,55,el,true); tremor(4); }); }} },
  guerreiro:{ h1:{cd:5, f(s,a,el,cor,lv,mod){ const e=pontoDenso(s,90)||maisProximo(s,90); if(!e) return false; J.fantasmas.push({x:s.x,y:s.y,spr:spriteSelo(s),vida:.25}); const x0=s.x,y0=s.y; s.x=e.x; s.y=e.y;
               const r=mod===1?50:30; emArea(e.x,e.y,r,o=>ferir(o,a.dano*2.5*fNivel(lv),el)); efRastroSalto(x0,y0,e.x,e.y,el); efImpactoChao(e.x,e.y,r,el); efExplosao(e.x,e.y,r*0.8,el,mod===1);
               if(mod===0) J.zonas.push({fonte:FONTE,tipo:"rastro",x:(x0+e.x)/2,y:(y0+e.y)/2,r:22,el,cor,dano:a.dano*0.8,vida:3}); }},
              h2:{cd:12,f(s,a,el,cor,lv,mod){ s.furia=4+lv*0.5; s.furiaMod=mod; anel(s.x,s.y,18,"#ff5a4a",.5); efEspiral(s.x,s.y,16,"fogo",0.8); luzFlash(s.x,s.y,"#ff5a4a",50,0.3); texto(s.x,s.y-12,"Fúria!","#ff5a4a",14); }} },
  assassino:{ h1:{cd:4, f(s,a,el,cor,lv,mod){ const alvos=[maisForte(s,120)]; if(mod===0) alvos.push(maisForte(s,120)); let ok=false;
               for(const e of alvos){ if(!e||e.hp<=0) continue; ok=true; J.fantasmas.push({x:s.x,y:s.y,spr:spriteSelo(s),vida:.2}); efRastroSalto(s.x,s.y,e.x,e.y,el); efCortes(e.x,e.y-3,13,el,2); s.x=e.x-3; s.y=e.y-3; ferir(e,a.dano*3*fNivel(lv),el,{crit:true}); if(mod===1){e.dot=a.dano; e.dotT=4;} }
               if(ok) tremor(2); return ok; }},
              h2:{cd:8, f(s,a,el,cor,lv,mod){ let n=0; for(const e of embaralhar(J.inimigos)){ if(e.hp<=0||dist2(s,e)>110*110) continue; e.marca=a.dano*3*fNivel(lv); efMarca(e); if(mod===0&&!e.chefe&&!e.mini&&e.hp<e.max*0.25) danoSimples(e,e.hp+1); if(++n>=(mod===1?5:3)) break; } return n>0; }} },
  cacador:{ h1:{cd:4, f(s,a,el,cor,lv,mod){ const e=maisProximo(s,150); if(!e) return false; const base=Math.atan2(e.y-s.y,e.x-s.x); efLeque(s.x,s.y,base,el);
               for(let i=0;i<5;i++){ const ang=base+(i-2)*0.2; J.proj.push({fonte:FONTE,x:s.x,y:s.y,vx:Math.cos(ang)*190,vy:Math.sin(ang)*190,dano:a.dano*1.3*fNivel(lv),el,cor,vida:1.3,perf:mod===0?5:1,ric:mod===1?3:0,r:2}); } }},
            h2:{cd:9, f(s,a,el,cor,lv,mod){ vfxSelo(s.x,s.y,el,26); for(let i=0;i<3;i++) J.armadilhas.push({fonte:FONTE,x:s.x+rnd(-30,30),y:s.y+rnd(-30,30),dano:a.dano*(mod===1?6:4.5)*fNivel(lv),el,cor,raiz:mod===0,vida:12}); }} },
  mago:{ h1:{cd:6, f(s,a,el,cor,lv,mod){ const e=pontoDenso(s,140); if(!e) return false;
            if(mod===0){ for(let i=0;i<6;i++){ const x=e.x+rnd(-28,28), y=e.y+rnd(-28,28); efQueda(x,y,el,i*0.12); agendar(0.18+i*0.12,()=>{ emArea(x,y,24,o=>ferir(o,a.dano*2*fNivel(lv),el)); efExplosao(x,y,24,el); tremor(1.5); }); } }
            else { const r=mod===1?70:40; emArea(e.x,e.y,r,o=>ferir(o,a.dano*(mod===1?5:3)*fNivel(lv),el)); anel(e.x,e.y,r,cor,.5); efExplosao(e.x,e.y,r,el,mod===1); if(mod===1) efImpactoChao(e.x,e.y,r*0.7,el); tremor(mod===1?7:4); } }},
         h2:{cd:12,f(s,a,el,cor,lv,mod){ J.zonas.push({fonte:FONTE,tipo:"circulo",el,x:J.jogador.x,y:J.jogador.y,r:55,amp:mod===0?1.6:1.3+0.05*lv,puxa:mod===1,cor,vida:5}); }} },
  invocador:{ h1:{cd:7, f(s,a,el,cor,lv,mod){ for(let i=0;i<4;i++) J.crias.push({fonte:FONTE,x:s.x+rnd(-8,8),y:s.y+rnd(-8,8),dano:a.dano*0.7*fNivel(lv),el,cor,vida:7,cd:0,kami:mod===0,guarda:mod===1}); particulas(s.x,s.y,cor,12,60); }},
              h2:{cd:14,f(s,a,el,cor,lv,mod){ const pos=[{x:s.x+20,y:s.y}]; if(mod===0) pos.push({x:s.x-20,y:s.y});
               if(mod===1){ J.crias.push({fonte:FONTE,x:s.x,y:s.y,dano:a.dano*4*fNivel(lv),el,cor,vida:9,cd:0,gigante:true}); anel(s.x,s.y,20,cor,.5); circuloInvocacao(s.x,s.y+3,el,22,0.9,true); efPilar(s.x,s.y+4,el,0.6,7); return; }
               pos.forEach(p=>{ circuloInvocacao(p.x,p.y+2,el,13,0.8,false); luzFlash(p.x,p.y,cor,36,0.3); }); pos.forEach(p=>J.zonas.push({fonte:FONTE,tipo:"portal",x:p.x,y:p.y,r:8,cor,el,dano:a.dano*(mod===0?0.85:0.6)*fNivel(lv),vida:5,cd:0})); }} },
  mistico:{ h1:{cd:8, f(s,a,el,cor,lv,mod){ J.regen=4; J.regenV=0.03*fNivel(lv); J.regenMod=mod; anel(J.jogador.x,J.jogador.y,30,"#7fe0a0",.6); efCura(30); if(mod===1) J.buffCad=4; }},
            h2:{cd:999,f(){ J.renascer=1; texto(J.jogador.x,J.jogador.y-18,"Renascer pronto","#fff3c4",13); }} },
  xama:{ h1:{cd:8, f(s,a,el,cor,lv,mod){ J.canto=5; if(mod===0) J.fervor=5; efCanto(46,el); if(mod===1) emArea(J.jogador.x,J.jogador.y,45,e=>{const dx=e.x-J.jogador.x,dy=e.y-J.jogador.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*25; e.y+=dy/d*25;}); }},
         h2:{cd:10,f(s,a,el,cor,lv,mod){ J.zonas.push({fonte:FONTE,tipo:"espirito",x:J.jogador.x,y:J.jogador.y,r:4,ang:0,cor,el,el2:mod===0?escolha(ELS.filter(x=>x!==el)):null,cadeia:mod===1,dano:a.dano*1.2*fNivel(lv),vida:6,cd:0}); }} },
};
// força visual de um monstro: cresce com o estágio (filhote -> supremo), o nível do poder e a raridade.
// Os efeitos (corte, onda, raio, selo) usam isso para ficar maiores, mais grossos e com mais partículas: um Supremo
// lendário com poder 5 parece outra criatura perto de um filhote comum
export let VFX_K=1;
export function forcaVisual(s,k){ const rar={comum:0,incomum:0.05,raro:0.12,epico:0.2,lendario:0.32}[s.mon.rar]||0; return 1+est(s)*0.28+((s.pod[k]||1)-1)*0.09+rar; }
export function agirSelo(s,dt){
  const a=atrib(s), el=elementoDe(s), cor=COR[el], cls=L(s).classe;
  if(s.esp!=null&&!SIM.semEspeciais){ s.cdEsp=(s.cdEsp??10)-dt; if(s.cdEsp<=0){ defFonte("especial"); dispararEspecial(s,a,el,cor); s.cdEsp=recargaEspecial(s); } }
  if(s.furia>0){ s.furia-=dt; if(s.furiaMod===0) curar(J.vidaMax*0.02*dt); if(s.furiaMod===1) J.imparavel=0.2; }
  s.cd-=dt*a.cad*(J.cantoGuerra>0?1.2:1); if(s.cd<=0){ defFonte("basico"); VFX_K=forcaVisual(s,"b"); s.cd=ataqueBasico(s,atribPoder(a,s,"b"),el,cor)*tal.recarga(); VFX_K=1; aoDisparar(s,"b",a,el,cor); if(J.t-(s.atkT??-9)>0.5) s.atkT=J.t; }
  for(const k of ["h1","h2"]){ const lv=s.pod[k]; if(!lv) continue; if(k==="h2"&&est(s)<1) continue;
    const def=HAB[cls][k]; const key=k==="h1"?"cd1":"cd2"; s[key]-=dt*(J.desp>0?1.4:1);
    if(s[key]<=0){ defFonte("habilidade"); VFX_K=forcaVisual(s,k)*1.1; const r=def.f(s,atribPoder(a,s,k),el,cor,lv,s.mod[k]); VFX_K=1; s[key]= r===false? 0.6 : def.cd*fRecarga(lv)*tal.recarga()*((SIN.rm&&SIN.rm.recarga)||1); if(r!==false) aoDisparar(s,k,a,el,cor); } }
}
