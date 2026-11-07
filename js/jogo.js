// Elementar · lógica do jogo (protótipo)
"use strict";
// ================================================================ utilidades
const $=id=>document.getElementById(id);
const rnd=(a,b)=>a+Math.random()*(b-a), escolha=a=>a[Math.floor(Math.random()*a.length)];
const embaralhar=a=>{a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;};
const dist2=(a,b)=>{const dx=a.x-b.x, dy=a.y-b.y; return dx*dx+dy*dy;};
const LINHA=Object.fromEntries([...D.linhas,...(D.ancestrais||[])].map(l=>[l.id,l])), UNIV=Object.fromEntries(D.universos.map(u=>[u.id,u]));
const REAC={}; D.reacoes.forEach(r=>{REAC[[r.a,r.b].sort().join("|")]=r;});
const ELS=Object.keys(D.elementos), COR=Object.fromEntries(ELS.map(k=>[k,D.elementos[k].cor])), NOME_EL=k=>D.elementos[k].nome;
const NIV=[1,4,9,15];  // protótipo (jogo final: 1, 5, 12, 20)
const MULT=D.estagios.map(e=>e.mult), TAM=[9,11,13,17];
// duração do mapa: os 3 primeiros (que quase ninguém perde) são mais curtos, para chegar logo na parte interessante
let MAPA_SEG=150, MINI_SEG=75; const MAPAS_POR_ERA=3;
const RAR_BONUS={comum:1,incomum:1.04,raro:1.08,epico:1.14,lendario:1.22}, RAR_NOME={comum:"Comum",incomum:"Incomum",raro:"Raro",epico:"Épico",lendario:"Lendário"};
const eficacia=(atk,def)=> D.vantagem[atk]===def ? D.mult_vantagem.super_efetivo : D.vantagem[def]===atk ? D.mult_vantagem.pouco_efetivo : 1;
function hexRgb(h){h=h.replace("#",""); return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16));}
const hex=c=>"#"+c.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
function tom(h,f){return hex(hexRgb(h).map(v=>f>1? v+(255-v)*(f-1): v*f));}
function mistura(a,b,t){const x=hexRgb(a), y=hexRgb(b); return hex(x.map((v,i)=>v+(y[i]-v)*t));}

// ================================================================ som: efeitos sintetizados na hora (sem arquivos de áudio)
// O navegador só libera o som depois do primeiro toque; o volume e o mudo ficam no save (META.som).
const SOM={ctx:null, mestre:null, ult:{}};
function somLigar(){ if(SOM.ctx){ if(SOM.ctx.state==="suspended") SOM.ctx.resume(); return; } try{ const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    SOM.ctx=new AC(); const comp=SOM.ctx.createDynamicsCompressor(); SOM.mestre=SOM.ctx.createGain(); SOM.mestre.gain.value=0.45; SOM.mestre.connect(comp); comp.connect(SOM.ctx.destination); }catch(e){} }
addEventListener("pointerdown",somLigar,{passive:true}); addEventListener("keydown",somLigar);
function somNota(f,dur,tipo,vol,atraso,f2){ const c=SOM.ctx, t=c.currentTime+(atraso||0), o=c.createOscillator(), g=c.createGain(); o.type=tipo||"sine"; o.frequency.setValueAtTime(f,t); if(f2) o.frequency.exponentialRampToValueAtTime(f2,t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.connect(g); g.connect(SOM.mestre); o.start(t); o.stop(t+dur+0.02); }
function somRuido(dur,vol,atraso,corte){ const c=SOM.ctx, t=c.currentTime+(atraso||0), n=Math.ceil(c.sampleRate*dur), buf=c.createBuffer(1,n,c.sampleRate), d=buf.getChannelData(0); for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
  const s=c.createBufferSource(), f=c.createBiquadFilter(), g=c.createGain(); f.type="lowpass"; f.frequency.value=corte||2000; g.gain.value=vol; s.buffer=buf; s.connect(f); f.connect(g); g.connect(SOM.mestre); s.start(t); }
// cada som tem um intervalo mínimo para não virar chiado quando muita coisa acontece junto
function som(nome,x){ if(!SOM.ctx||SIM.ativo||(META.som&&META.som.mudo)) return; const agora=performance.now(), min={acerto:45,moeda:35,tic:30,gema:40,critico:70}[nome]||0;
  if(agora-(SOM.ult[nome]||0)<min) return; SOM.ult[nome]=agora; const v=(META.som&&META.som.vol!=null? META.som.vol : 1);
  switch(nome){
    case "moeda": somNota(1568,0.07,"square",0.05*v); somNota(2093,0.16,"square",0.05*v,0.06); break;
    case "gema": somNota(1200+Math.random()*500,0.06,"sine",0.04*v); break;
    case "tic": somNota(1100,0.025,"square",0.035*v); break;
    case "ding": somNota(1319,0.25,"triangle",0.12*v); somNota(1976,0.3,"sine",0.06*v,0.02); break;
    case "jackpot": [523,659,784,1047,1319,1568].forEach((f,i)=>somNota(f,0.35,"triangle",0.11*v,i*0.07)); somNota(2093,0.8,"sine",0.08*v,0.45); somRuido(0.6,0.05*v,0.42,6000); break;
    case "bau": somNota(110,0.25,"sine",0.25*v,0,70); somRuido(0.18,0.15*v,0,900); somNota(330,0.5,"sawtooth",0.04*v,0.1,1320); break;
    case "abrir": somRuido(0.35,0.18*v,0,4000); [784,988,1175,1568].forEach((f,i)=>somNota(f,0.25,"triangle",0.09*v,0.05+i*0.05)); break;
    case "nivel": [523,659,784,1047].forEach((f,i)=>somNota(f,0.22,"triangle",0.1*v,i*0.06)); break;
    case "evolucao": [392,523,659,784,1047].forEach((f,i)=>somNota(f,0.5,"triangle",0.09*v,i*0.09)); somNota(1568,1,"sine",0.06*v,0.5); break;
    case "acerto": somRuido(0.05,0.05*v,0,1600); break;
    case "critico": somNota(880,0.08,"square",0.06*v,0,1760); somRuido(0.06,0.08*v,0,3000); break;
    case "combo": [659,880,1175].forEach((f,i)=>somNota(f,0.18,"square",0.06*v,i*0.05)); break;
    case "dano": somNota(160,0.15,"sawtooth",0.07*v,0,70); break;
    case "chefe": somNota(73,1.2,"sawtooth",0.12*v,0,55); somNota(110,1.2,"sawtooth",0.08*v,0.05,82); break;
  } }
// ================================================================ save
const CHAVE="elementar_proto_v2";
// o save passa pela camada de plataforma (js/plataforma.js): localStorage na web, arquivo no desktop/Steam
const PLAT=window.Plataforma||{lerSave:k=>{try{return localStorage.getItem(k);}catch(e){return null;}}, gravarSave:(k,t)=>{try{localStorage.setItem(k,t);}catch(e){}}, conquista(){}};
function lerSave(){try{const s=PLAT.lerSave(CHAVE); return s?JSON.parse(s):null;}catch(e){return null;}}
function gravar(){try{PLAT.gravarSave(CHAVE, JSON.stringify({meta:META, run:RUN_SALVA}));}catch(e){}}
const salvo=lerSave()||{};
function liberadosIniciais(){ const ini=new Set(D.linhas.filter(l=>D.universos.find(u=>u.id===l.universo).era==="berco"||l.universo==="amazonia").map(l=>l.id));
  ELS.forEach(el=>D.linhas.filter(l=>l.elemento===el).slice(0,3).forEach(l=>ini.add(l.id))); return [...ini]; }
let META=Object.assign({essencia:0, recorde:0, liberados:liberadosIniciais()}, salvo.meta||{});
// saves de antes do Bestiário: os filhotes já liberados entram como vistos (sem avisos nem presentes por eles)
if(!META.dex){ META.dex={}; for(const id of META.liberados) META.dex[id]={f:1,r:["comum"]}; META.dexMarco=Math.floor(META.liberados.length/10); }
let RUN_SALVA=salvo.run||null;

// ================================================================ sprites procedurais (placeholders da arte final)
const cacheSpr=new Map();
if(document.fonts&&document.fonts.load){ for(const f of ['800 20px "Cinzel"','900 20px "Nunito"','600 14px "Nunito"']) document.fonts.load(f).catch(()=>{}); }
function semente(s){let h=2166136261; for(const c of s){h^=c.charCodeAt(0); h=Math.imul(h,16777619);} return ()=>{h+=0x6D2B79F5; let t=h; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296;};}
function gerarSprite(seed,n,base,op={}){
  const k=seed+"|"+n+"|"+base+"|"+(op.olhos||"")+"|"+(op.rar||"");
  if(cacheSpr.has(k)) return cacheSpr.get(k);
  const r=semente(seed), W=n+2, meio=Math.ceil(n/2), cv=document.createElement("canvas"); cv.width=W; cv.height=W; const g=cv.getContext("2d");
  let cb=base; if(op.rar==="epico"){const c=hexRgb(base); cb=hex([c[2],c[0],c[1]]);} if(op.rar==="lendario") cb="#e8c25a";
  const cores=[tom(cb,0.72),tom(cb,1),tom(cb,1.35)];
  for(let y=0;y<n;y++) for(let x=0;x<meio;x++){ const dx=(x-meio+0.5)/meio, dy=(y-n/2+0.5)/(n/2), d=dx*dx*0.9+dy*dy;
    if(r()<1.15-d*1.1){ const v=r()<0.25?0:(y<n*0.45?2:1); g.fillStyle=cores[v]; g.fillRect(x+1,y+1,1,1); g.fillRect(n-x,y+1,1,1);} }
  const oy=Math.max(1,Math.floor(n*0.38)), ox=Math.max(1,meio-Math.max(1,Math.floor(n/5)));
  g.fillStyle=op.olhos||"#fff8e0"; g.fillRect(ox+1,oy+1,1,1); g.fillRect(n-ox,oy+1,1,1);
  const img=g.getImageData(0,0,W,W).data, cheio=(x,y)=>x>=0&&y>=0&&x<W&&y<W&&img[(y*W+x)*4+3]>0;
  const c2=document.createElement("canvas"); c2.width=W; c2.height=W; const g2=c2.getContext("2d"); g2.fillStyle="#120e1a";
  for(let y=0;y<W;y++) for(let x=0;x<W;x++) if(!cheio(x,y)&&(cheio(x+1,y)||cheio(x-1,y)||cheio(x,y+1)||cheio(x,y-1))) g2.fillRect(x,y,1,1);
  g2.drawImage(cv,0,0);
  if(op.rar==="lendario"||op.rar==="epico"){ g2.fillStyle="#fffbe6"; for(let i=0;i<3;i++) g2.fillRect(1+Math.floor(r()*n),1+Math.floor(r()*n),1,1); }
  cacheSpr.set(k,c2); return c2;
}
const cacheBranco=new WeakMap();
// versão de alta resolução (se a arte tiver original) para silhuetas e clarões: senão viram blocos quando ampliados
function baseHi(spr){ return (spr&&spr._src&&typeof Q!=="undefined"&&Q>1&&typeof versaoHi==="function"&&versaoHi(spr,Q*1.25))||spr; }
function branco(spr){ if(cacheBranco.has(spr)) return cacheBranco.get(spr); const b=baseHi(spr), c=document.createElement("canvas"); c.width=b.width; c.height=b.height; const g=c.getContext("2d");
  g.drawImage(b,0,0); g.globalCompositeOperation="source-in"; g.fillStyle="#ffffff"; g.fillRect(0,0,c.width,c.height); if(b!==spr) c._suave=true; cacheBranco.set(spr,c); return c; }
// ovo em vetor, desenhado em alta resolução (6x) e usado com 10x12 de mundo: casca com volume (degradê e brilho),
// desenho do elemento na casca e acabamento pela raridade (comum: casca creme; raro: prata com faixa; lendário: ouro com runas que brilham)
const OVO_K=6;
function spriteOvo(el,rar){ const k="ovo|"+el+"|"+rar; if(cacheSpr.has(k)) return cacheSpr.get(k);
  const K=OVO_K, W=10*K, H=12*K, c=document.createElement("canvas"); c.width=W; c.height=H; const g=c.getContext("2d"), cor=COR[el]||"#ffd34a", corC=tom(cor,1.45), corE=tom(cor,0.6);
  const casca=rar==="lendario"?["#fff4c4","#f0c860","#a8741c"]:rar==="raro"?["#ffffff","#d4dce6","#8a96a8"]:["#fffaf0","#ece2cc","#b8a888"];
  const forma=()=>{ g.beginPath(); g.moveTo(W/2,H*0.04); g.bezierCurveTo(W*0.92,H*0.06,W*0.98,H*0.6,W*0.86,H*0.8); g.bezierCurveTo(W*0.74,H*0.98,W*0.26,H*0.98,W*0.14,H*0.8); g.bezierCurveTo(W*0.02,H*0.6,W*0.08,H*0.06,W/2,H*0.04); g.closePath(); };
  const gr=g.createRadialGradient(W*0.36,H*0.3,W*0.05,W*0.5,H*0.55,W*0.62); gr.addColorStop(0,casca[0]); gr.addColorStop(0.55,casca[1]); gr.addColorStop(1,casca[2]);
  forma(); g.fillStyle=gr; g.fill();
  g.save(); forma(); g.clip(); const corP=rar==="lendario"&&(el==="raio"||el==="luz"||el==="fogo")? tom(cor,0.55) : cor; g.fillStyle=corP; g.strokeStyle=corP; g.lineCap="round"; g.lineJoin="round";
  const r=semente("ovo"+el); g.globalAlpha=0.9;
  switch(el){
    case "fogo": for(let i=0;i<3;i++){ const x=W*(0.25+i*0.25), y=H*0.62; g.beginPath(); g.moveTo(x,y+H*0.12); g.quadraticCurveTo(x-W*0.12,y,x,y-H*0.18); g.quadraticCurveTo(x+W*0.12,y,x,y+H*0.12); g.fill(); } break;
    case "agua": g.lineWidth=K*0.9; for(let i=0;i<2;i++){ const y=H*(0.5+i*0.17); g.beginPath(); g.moveTo(0,y); for(let x=0;x<=W;x+=W/8) g.quadraticCurveTo(x+W/16,y-K*1.2*(((x/(W/8))%2)?-1:1),x+W/8,y); g.stroke(); } break;
    case "terra": for(let i=0;i<5;i++){ const x=W*(0.2+r()*0.6), y=H*(0.35+r()*0.5), s2=K*(0.9+r()*0.8); g.beginPath(); g.moveTo(x,y-s2); g.lineTo(x+s2,y); g.lineTo(x,y+s2*0.8); g.lineTo(x-s2,y); g.closePath(); g.fill(); } break;
    case "ar": g.lineWidth=K*0.7; for(let i=0;i<3;i++){ const y=H*(0.4+i*0.15); g.beginPath(); g.moveTo(W*0.15,y); g.bezierCurveTo(W*0.4,y-K*2,W*0.6,y+K*2,W*0.85,y-K*0.6); g.stroke(); } break;
    case "raio": g.beginPath(); g.moveTo(W*0.58,H*0.22); g.lineTo(W*0.36,H*0.56); g.lineTo(W*0.52,H*0.56); g.lineTo(W*0.4,H*0.86); g.lineTo(W*0.68,H*0.46); g.lineTo(W*0.52,H*0.46); g.closePath(); g.fill(); break;
    case "natureza": for(let i=0;i<4;i++){ const x=W*(0.25+r()*0.5), y=H*(0.35+r()*0.5), a=r()*6.28; g.save(); g.translate(x,y); g.rotate(a); g.beginPath(); g.ellipse(0,0,K*1.6,K*0.7,0,0,Math.PI*2); g.fill(); g.restore(); } break;
    case "luz": g.lineWidth=K*0.6; g.beginPath(); g.arc(W/2,H*0.55,K*1.6,0,Math.PI*2); g.fill(); for(let i=0;i<8;i++){ const a=i/8*6.28; g.beginPath(); g.moveTo(W/2+Math.cos(a)*K*2.4,H*0.55+Math.sin(a)*K*2.4); g.lineTo(W/2+Math.cos(a)*K*3.6,H*0.55+Math.sin(a)*K*3.6); g.stroke(); } break;
    case "sombra": g.beginPath(); g.arc(W/2,H*0.56,K*2.4,0,Math.PI*2); g.fill(); g.globalCompositeOperation="destination-out"; g.beginPath(); g.arc(W/2+K*1.2,H*0.5,K*2,0,Math.PI*2); g.fill(); g.globalCompositeOperation="source-over"; break;
    default: for(let i=0;i<6;i++){ g.beginPath(); g.arc(W*(0.2+r()*0.6),H*(0.3+r()*0.55),K*(0.5+r()*0.6),0,Math.PI*2); g.fill(); } }
  g.globalAlpha=1;
  if(rar==="raro"){ g.fillStyle=corE; g.fillRect(0,H*0.42,W,K*0.9); g.fillStyle="#ffffff"; g.globalAlpha=0.6; g.fillRect(0,H*0.42,W,K*0.3); g.globalAlpha=1; }
  if(rar==="lendario"){ g.strokeStyle="#fff8d8"; g.lineWidth=K*0.45; g.shadowColor=corC; g.shadowBlur=K*2; for(let i=0;i<3;i++){ const x=W*(0.3+i*0.2), y=H*0.36; g.beginPath(); g.moveTo(x,y-K); g.lineTo(x,y+K); g.moveTo(x-K*0.7,y); g.lineTo(x+K*0.7,y); g.stroke(); } g.shadowBlur=0; }
  // sombra própria embaixo e brilho em cima (volume)
  const sb=g.createLinearGradient(0,H*0.5,0,H); sb.addColorStop(0,"rgba(0,0,0,0)"); sb.addColorStop(1,"rgba(20,10,20,.38)"); g.fillStyle=sb; g.fillRect(0,0,W,H);
  g.restore();
  g.save(); g.globalAlpha=0.85; g.fillStyle="#ffffff"; g.beginPath(); g.ellipse(W*0.34,H*0.26,W*0.09,H*0.1,-0.5,0,Math.PI*2); g.fill(); g.globalAlpha=0.5; g.beginPath(); g.arc(W*0.42,H*0.16,K*0.5,0,Math.PI*2); g.fill(); g.restore();
  forma(); g.lineWidth=K*0.55; g.strokeStyle=rar==="lendario"?"#5a3a0a":"#2a1c28"; g.stroke();
  c._suave=true; c.mundoW=10; c.mundoH=12; cacheSpr.set(k,c); return c; }

// ================================================================ estado
const cv=$("tela"), ctx=cv.getContext("2d"), lo=document.createElement("canvas"), lg=lo.getContext("2d");
let W=0,H=0,S=2,VW=0,VH=0,Q=1;
// S = pixels de tela (CSS) por pixel de mundo. Q = pixels reais da tela interna por pixel de mundo:
// o mundo é desenhado na resolução do aparelho (as coordenadas continuam as mesmas), então a arte
// importada sai nítida e o desenho por código continua com cara de pixel art (cada pixel vira um bloco).
// O limite de pixels protege a performance em telas 4K.
// Celular/tablet (toque): tela interna bem menor. Cada passada de tela cheia (piso, chão, luz, tom, vinheta...) custa
// proporcional aos pixels; no iPhone o mundo era desenhado a 860x1867, e o aparelho esquentava. Em tela pequena a diferença quase não aparece.
const TOQUE=matchMedia("(pointer: coarse)").matches||"ontouchstart" in window;
const PIXELS_MAX=TOQUE? 1.8e6 : 3.2e6;
// a qualidade automática também reduz a resolução: QUAL 1 = 80%, QUAL 0 = 62%
const ESC_QUAL=[0.62,0.8,1];
const ZOOM_MUNDO=170;   // pixels de mundo no lado menor da tela (menor = câmera mais perto, arte maior)
function redimensionar(){ W=cv.clientWidth; H=cv.clientHeight; const dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
  S=Math.max(2,Math.min(W,H)/ZOOM_MUNDO); VW=Math.ceil(W/S); VH=Math.ceil(H/S);
  // tela interna na resolução real do aparelho (sem reamostrar a cada quadro); limitada a PIXELS_MAX
  // a tela interna é sempre a resolução da tela dividida por um número inteiro (1, 2, 3...): a ampliação final fica exata.
  // Com um fator quebrado (ex.: 1,46x) cada pixel virava um bloco de tamanho diferente e tudo parecia distorcido.
  { const cheio=S*dpr, lim=PIXELS_MAX*Math.pow(typeof QUAL==='number'?ESC_QUAL[QUAL]:1,2), k=Math.max(1,Math.ceil(Math.sqrt(VW*VH*cheio*cheio/lim)-1e-9)); Q=SIM.ativo? 1 : Math.max(1,cheio/k); }
  lo.width=Math.round(VW*Q); lo.height=Math.round(VH*Q); lg.setTransform(Q,0,0,Q,0,0); }
addEventListener("resize",redimensionar);
// altura real do HUD do topo (muda com a largura da tela e com os chips): o combo e a barra do chefe ficam logo abaixo dele,
// senão no celular deitado o nome do chefe ficava escondido atrás dos chips
let HUD_BAIXO=96;
function medirHud(){ const h=$("hud"); if(!h||!h.offsetHeight) return; HUD_BAIXO=h.offsetTop+h.offsetHeight; $("combo").style.top=(HUD_BAIXO+4)+"px"; }
if(typeof ResizeObserver==="function") new ResizeObserver(medirHud).observe($("hud"));
let R=null, J=null, rodando=false, pausado=false;
// Ganchos para simulação e testes automatizados (não afetam o jogo normal)
const SIM={ativo:false, entrada:null, aoDerrota:null, semEspeciais:false};
let FONTE="basico";  // origem do dano corrente (básico, habilidade, especial, combinado, despertar, reação, ambiente)
function agendar(seg,fn){ J.agenda.push({t:J.t+seg,fn}); }
function novoSt(){ return {porFonte:{}, especiais:0, combinados:0, transformacoes:0, dano:0, golpes:0, superEf:0, poucoEf:0, recContato:0, recBala:0, reacoes:{}, ovos:0, chocados:0, capturas:0, trocas:0, itens:0, despertares:0, evolucoes:[0,0,0,0], mapas:[], primeiroAbate:null}; }
const filaRamo=[], filaEsp=[];

function novoSelo(){ return {nivel:1, pod:{b:1,h1:0,h2:0}, mod:{h1:null,h2:null}, esp:null, mon:null, trocaCd:0}; }
function novaRun(pacto, inicial){
  R={pacto, selos:[novoSelo(),novoSelo(),novoSelo()], reserva:[], ninho:[], ancestral:{estado:"nenhum"}, itens:{incenso:0,chamado:0,doce:0,pedra:0,pena:0}, pedraAtiva:false,
     profundidade:0, eraIdx:0, mapaNaEra:0, universo:"grecia", reliquias:[], chefesVencidos:0, ciclo:0, abates:0, essenciaRun:0, elos:[], vidaFrac:1};
  R.selos[0].mon={id:inicial, rar:"comum", ramo:null}; R.st=novoSt(); if(typeof registrarDex==="function") registrarDex(inicial,0,null,"comum");
  for(let i=0;i<nivelLoja("heranca");i++){ R.selos[0].nivel++; R.selos[0].pod.b=Math.min(5,R.selos[0].pod.b+1); }   // Herança do Santuário
  R.reviverMeta=nivelLoja("chance"); R.recordeAntes=META.recorde;
}
const ativos=()=>R.selos.filter(s=>s.mon);
const L=s=>LINHA[s.mon.id];
function ramoAtual(s){ return s.mon.ramo ?? (J&&J.desp>0? s.tmpRamo : null); }
function estBase(s){ let e=0; if(s.nivel>=NIV[1]) e=1; if(s.nivel>=NIV[2]&&s.mon.ramo!=null) e=2; if(e===2&&s.nivel>=NIV[3]&&R.chefesVencidos>0) e=3; return e; }
function est(s){ const b=estBase(s); if(J&&J.desp>0){ const e=Math.min(3,b+1); if(e>=2&&s.mon.ramo==null&&s.tmpRamo==null){ s.tmpRamo=0; s.tmpRamo=ramosElegiveis(s,true,true)[0]??0; } return e; } return b; }
// elemento sem considerar formas temporárias do Despertar (evita recursão entre Selos)
function elementoBase(o){ return o.mon.ramo!=null&&estBase(o)>=2? L(o).ramos[o.mon.ramo].elemento : L(o).elemento; }
function ramoObj(s){ const r=ramoAtual(s); return est(s)>=2&&r!=null? L(s).ramos[r] : null; }
function elementoDe(s){ const r=ramoObj(s); return r? r.elemento : L(s).elemento; }
function linhagemDe(s){ const r=ramoObj(s); return r? r.linhagem : L(s).linhagem; }
function classeExtraDe(s){ const r=ramoObj(s); return r? r.classe_extra : null; }
function nomeForma(s){ const e=est(s), l=L(s); if(e===0) return l.filhote; if(e===1) return l.jovem; const r=ramoObj(s); return e===2? r.nome : r.supremo; }
function spriteSelo(s){ const e=est(s); const arte=arteMonstro(s.mon.id,e,ramoAtual(s),s.mon.rar); if(arte) return arte; return gerarSprite(s.mon.id+"#"+e+"#"+(ramoAtual(s)??"-"), TAM[e], COR[elementoDe(s)], {rar:s.mon.rar}); }
function spriteLinha(id,rar){ const arte=arteMonstro(id,0,null,rar); if(arte) return arte; return gerarSprite(id+"#0#-",TAM[0],COR[LINHA[id].elemento],{rar}); }
function poolPacto(){ const p=META.liberados.filter(id=>R.pacto.includes(LINHA[id].elemento)); return p.length? p : D.linhas.filter(l=>R.pacto.includes(l.elemento)).map(l=>l.id); }

// ================================================================ sinergias e atributos
let SIN={dano:1,vida:1,cad:1,reac:1,chips:[],rm:{}};
// ================================================================ Santuário: melhorias permanentes compradas com a Essência das runs
const LOJA=[
  {id:"forca",     nome:"Força Ancestral",   max:5, base:40,  val:0.06, txt:"+6% de dano da equipe"},
  {id:"vigor",     nome:"Vigor",             max:5, base:40,  val:0.08, txt:"+8% de vida da equipe"},
  {id:"pronto",    nome:"Prontidão",         max:5, base:55,  val:0.04, txt:"+4% de cadência de ataque"},
  {id:"sabedoria", nome:"Sabedoria",         max:5, base:45,  val:0.07, txt:"+7% de XP"},
  {id:"ima",       nome:"Ímã de Cristal",    max:3, base:30,  val:0.25, txt:"+25% de alcance para puxar cristais"},
  {id:"agil",      nome:"Passos Leves",      max:3, base:35,  val:0.05, txt:"+5% de velocidade do Invocador"},
  {id:"ganancia",  nome:"Ganância",          max:5, base:50,  val:0.12, txt:"+12% de Essência ao fim da run"},
  {id:"heranca",   nome:"Herança",           max:3, base:80,  val:1,    txt:"o monstro inicial começa 1 nível acima (no 3, já começa Jovem)"},
  {id:"oraculo",   nome:"Visão do Oráculo",  max:1, base:260, val:1,    txt:"+1 portal para escolher ao fim de cada mapa"},
  {id:"chance",    nome:"Segunda Chance",    max:1, base:420, val:1,    txt:"uma vez por run, a equipe se levanta com metade da vida"}];
const nivelLoja=id=>(META.loja&&META.loja[id])||0;
function bonusLoja(id){ const it=LOJA.find(x=>x.id===id); return 1+(it? it.val*nivelLoja(id) : 0); }
const precoLoja=it=>Math.round(it.base*Math.pow(1.85,nivelLoja(it.id)));
function lojaAcessivel(){ return LOJA.filter(it=>nivelLoja(it.id)<it.max&&precoLoja(it)<=META.essencia); }
function telaSantuario(){
  $("telaMenu").classList.remove("ativa"); META.loja=META.loja||{};
  mostrarCartas("Santuário", `Essência: <b>${META.essencia}</b>. Melhorias permanentes: valem para todas as próximas runs.`,
    LOJA.map(it=>{ const n=nivelLoja(it.id), cheio=n>=it.max, p=precoLoja(it), pode=!cheio&&p<=META.essencia;
      return { titulo:`${it.nome} ${n}/${it.max}`, raridade: cheio?"lendario": pode?"raro":"comum", desab:!pode, manter:true,
        texto:`${it.txt}${it.max>1?" por nível":""}.<br>${cheio?"Completo.":`Custa ${p} de Essência${pode?"":` (faltam ${p-META.essencia})`}.`}`,
        acao:()=>{ if(!pode) return; META.essencia-=p; META.loja[it.id]=n+1; gravar(); toast(`${it.nome} ${n+1}/${it.max}`); telaSantuario(); } }; }),{fundo:"ui__refugio"});
  const v=document.createElement("button"); v.className="botao sec"; v.textContent="Voltar"; v.onclick=()=>menu(); $("cartasRodape").appendChild(v);
}
// Relíquias com efeito em atributo ficam aqui; as de gatilho (Hidromel, Para-raios, Concha...) estão em atualizarReliquias e relDano
const REL_GATILHO=new Set(["Tabuletas do Destino","Taça de Jamshid","Hidromel do Salão dos Heróis","Espada na Pedra","Ovo de Koschei","Bola de Borracha Sagrada","Anzol Mágico","Concha das Marés","Estaca de Freixo","Para-raios","Espelho Mágico","Bússola Enlouquecida"]);
const temRel=n=>!!(R&&R.reliquias&&R.reliquias.includes(n));
function relMods(){ const m={dano:bonusLoja("forca"),vida:bonusLoja("vigor"),cad:bonusLoja("pronto"),xp:bonusLoja("sabedoria"),vel:bonusLoja("agil"),ima:bonusLoja("ima"),reac:1,regen:0,reviver:0,nucleo:[],curaTroca:false,danoRec:1,ess:1,recarga:1,talisma:0,portais:0};
  for(const n of R.reliquias){ if(n==="Ankh") m.reviver++; else if(n.startsWith("Pêssego")) m.vida*=1.2; else if(n==="Quipu") m.xp*=1.2; else if(n==="Tapete Voador") m.vel*=1.2;
    else if(n==="Pedra do Sol") m.recarga*=0.85; else if(n==="Fio de Ariadne") m.ima*=1.8; else if(n==="Máscara de Oni"){ m.dano*=1.25; m.danoRec*=1.1; } else if(n==="Cristal de Oricalco") m.reac*=1.2;
    else if(n==="Flor do Vale") m.regen+=0.005; else if(n.startsWith("Caldeirão")) m.curaTroca=true;
    else if(n==="Muiraquitã") m.talisma+=0.3; else if(n==="Astrolábio") m.portais++; else if(n==="Mapa do Tesouro") m.ess*=1.4;
    else if(n==="Ídolo Dourado"){ m.ess*=1.6; m.danoRec*=1.15; }
    else if(n.startsWith("Núcleo")){ const el=ELS.find(k=>n.includes(NOME_EL(k))); if(el) m.nucleo.push(el); } else if(!REL_GATILHO.has(n)) m.dano*=1.1; }
  return m; }
// multiplicador de dano das relíquias de gatilho, aplicado em cada golpe
function relDano(e){ if(!R.reliquias.length) return 1; let k=1;
  if(J.hidro&&J.hidro.length){ while(J.hidro.length&&J.hidro[0]<J.t) J.hidro.shift(); k*=1+0.01*J.hidro.length; }
  if(temRel("Espada na Pedra")&&J.vida<J.vidaMax*0.5) k*=1.3;
  if(temRel("Estaca de Freixo")&&(e.chefe||e.mini||e.elite)) k*=1.4;
  return k; }
const danoMedioEquipe=()=>{ const a=ativos(); return a.length? a.reduce((t,s)=>t+atrib(s).dano,0)/a.length : 1; };
function atualizarReliquias(dt){ if(!R.reliquias.length||J.fim) return; const P=J.jogador;
  if(temRel("Anzol Mágico")){ J.tAnzol=(J.tAnzol??30)-dt; if(J.tAnzol<=0){ J.tAnzol=30; J.gemas.forEach(g=>g.puxar=true); anel(P.x,P.y,40,"#9ad8ff",.5); texto(P.x,P.y-16,"Anzol!","#9ad8ff",13); } }
  if(temRel("Concha das Marés")){ J.tConcha=(J.tConcha??10)-dt; if(J.tConcha<=0){ J.tConcha=10; const f=FONTE; FONTE="reliquia"; const dm=danoMedioEquipe()*1.5;
      emArea(P.x,P.y,75,e=>{ const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(!e.chefe){ e.x+=dx/d*28; e.y+=dy/d*28; } ferir(e,dm,"agua"); }); FONTE=f;
      anel(P.x,P.y,40,"#7fc0ff",.7); anel(P.x,P.y,75,"#bfe6ff",.5); particulas(P.x,P.y,"#bfe6ff",24,140); } }
  if(temRel("Para-raios")){ J.tRaioRel=(J.tRaioRel??5)-dt; if(J.tRaioRel<=0){ J.tRaioRel=5; const vis=J.inimigos.filter(e=>e.hp>0&&!e.oculto&&Math.abs(e.x-P.x)<VW/2&&Math.abs(e.y-P.y)<VH/2);
      const alvo=vis.find(e=>e.chefe||e.mini)||vis[Math.floor(Math.random()*vis.length)];
      if(alvo){ const f=FONTE; FONTE="reliquia"; ferir(alvo,danoMedioEquipe()*6,"raio"); FONTE=f; J.efeitos.push({x:alvo.x+rnd(-8,8),y:alvo.y-90,x2:alvo.x,y2:alvo.y,linha:true,cor:"#fff6b0",vida:.25,max:.25}); anel(alvo.x,alvo.y,14,"#fff6b0",.6); tremor(2); } } }
  if(temRel("Espelho Mágico")){ J.tEsp=(J.tEsp||0)-dt; const dr=J.danoRec||0; if(J.tEsp<=0&&dr>(J._drEsp||0)+0.5){ J.tEsp=1; J._drEsp=dr; const f=FONTE; FONTE="reliquia"; const dm=danoMedioEquipe()*3;
      emArea(P.x,P.y,32,e=>ferir(e,dm,"luz")); FONTE=f; anel(P.x,P.y,32,"#e8f4ff",.6); } else if(J.tEsp<=0) J._drEsp=dr; } }
function calcularSinergia(){
  const rg=D.regras, eq=ativos(), chips=[]; let dano=1,vida=1,reac=1; const cc={},lc={},ec={};
  eq.forEach(s=>{ const cl=L(s).classe; cc[cl]=(cc[cl]||0)+1; const ex=classeExtraDe(s); if(ex) cc[ex]=(cc[ex]||0)+1;
    const li=linhagemDe(s); if(li!=="errante") lc[li]=(lc[li]||0)+1; const el=elementoDe(s); ec[el]=(ec[el]||0)+1; });
  const rm=relMods(); rm.nucleo.forEach(el=>ec[el]=(ec[el]||0)+1);
  for(const [c,n] of Object.entries(cc)) if(n>=2){const s=rg.sinergia_classe[c][Math.min(n,3)]; dano*=s.dps; vida*=s.ehp; chips.push(`${D.classes[c].nome} ${Math.min(n,3)}`);}
  for(const [li,n] of Object.entries(lc)) if(n>=2){const s=rg.sinergia_linhagem[Math.min(n,3)]; dano*=s.dps; vida*=s.ehp; chips.push(`${D.linhagens[li].nome} ${Math.min(n,3)}`);}
  for(const [el,n] of Object.entries(ec)) if(n>=2){const s=rg.sinergia_elemento[Math.min(n,3)]; dano*=s.dps; vida*=s.ehp; chips.push(`${NOME_EL(el)} ${Math.min(n,3)}`);}
  const els=Object.keys(ec); let pares=0; for(let i=0;i<els.length;i++) for(let j=i+1;j<els.length;j++) if(REAC[[els[i],els[j]].sort().join("|")]) pares++;
  eq.forEach(s=>{ const r=ramoObj(s); if(r) reac=Math.max(reac, rg.ramos[r.tipo].reacao); }); reac*=rm.reac; if(pares) chips.push(`Reações ${pares}`);
  const pap=new Set(); eq.forEach(s=>{pap.add(D.classes[L(s).classe].papel); const ex=classeExtraDe(s); if(ex) pap.add(D.classes[ex].papel);});
  if(pap.has("frente")&&pap.has("suporte")&&(pap.has("dano_fisico")||pap.has("dano_magico"))){ dano*=rg.trindade.dps; vida*=rg.trindade.ehp; chips.push("Trindade"); }
  const pb=D.pacto.bonus[R.pacto.length]; if(pb&&pb.dano>1){ dano*=pb.dano; chips.push("Pacto Duplo"); }
  R.elos.forEach(e=>chips.push(e));
  SIN={dano:dano*rm.dano, vida:vida*rm.vida, cad:rm.cad, reac, chips, rm, cacadores:cc.cacador||0, invocadores:cc.invocador||0};
  if(J){ const antes=J.vidaMax, nova=eq.reduce((t,s)=>t+atrib(s).vida,0)*SIN.vida*(1+passiva("vida")+custo("vida")); J.vidaMax=Math.max(1,nova); if(antes>1) J.vida=Math.min(J.vidaMax, J.vida*J.vidaMax/antes); }
  $("chips").innerHTML=R.pacto.map(el=>`<span class="chip el" style="color:${COR[el]}">${NOME_EL(el)}</span>`).join("")+chips.map(c=>`<span class="chip">${c}</span>`).join("");
}
// ajuste fino por classe, a partir de 40 partidas simuladas: assassino, xamã, caçador e invocador chegavam ~2 mapas
// menos fundo que guerreiro, guardião e místico (ver docs/EQUILIBRIO_SIMULACOES.md)
const AJUSTE_CLASSE={assassino:1.3, xama:1.2, cacador:1.12, invocador:1.08, mago:0.98, guerreiro:1.04, guardiao:0.93, mistico:0.96};
function atrib(s){
  const l=L(s), b=D.classes[l.classe].base, e=est(s), eb=estBase(s);
  const md=MULT[e]*(1+DIF.nivelAtrib*Math.max(0,s.nivel-NIV[eb]));
  const r=ramoObj(s), fd=r?D.regras.ramos[r.tipo].dano:1, fv=r?D.regras.ramos[r.tipo].vida:1, rar=RAR_BONUS[s.mon.rar];
  const elo=R.elos.some(n=>D.elos.find(x=>x.nome===n&&(x.a===s.mon.id||x.b===s.mon.id)))?1.2:1;
  const desp=J&&J.desp>0, buff=J&&J.buffCad>0?1.3:1, furia=s.furia>0?2:1, canto=J&&J.canto>0?1.35:1, furiaD=s.furia>0&&s.furiaMod===1?1.25:1;
  return { dano:b.dano*(AJUSTE_CLASSE[l.classe]||1)*md*fd*rar*(1+0.2*(s.pod.b-1))*SIN.dano*elo*(desp?D.despertar.dano:1)*(J&&J.fervor>0?1.25:1)*furiaD*(J&&J.grito>0?1.6:1)*(J&&J.soloJog==="sombra"&&elementoDe(s)==="sombra"?1.2:1),
           cad:b.cadencia*(1+0.05*(s.pod.b-1))*SIN.cad*elo*(desp?D.despertar.cadencia:1)*buff*furia*canto*(J&&J.totemAnc>0?1.4:1),
           vida:b.vida/(1-b.defesa)*md*fv*rar, cura:(b.cura||0)*md*rar };
}
const fNivel=lv=>1+0.25*Math.max(0,lv-1), fRecarga=lv=>1-0.06*Math.max(0,lv-1);

// ================================================================ mapa
function iniciarMapa(){
  MAPA_SEG=R.profundidade<3? 110 : 150; MINI_SEG=Math.round(MAPA_SEG/2);
  const u=UNIV[R.universo]; if(!SIM.ativo) preCarregar(artesDoMapa(u));
  J={t:0, inimigos:[], proj:[], balas:[], crias:[], totens:[], gemas:[], nums:[], textos:[], efeitos:[], parts:[], ovosMapa:[], selvagens:[], armadilhas:[], zonas:[], fantasmas:[],
     jogador:{x:0,y:0}, dir:{x:1,y:0}, vida:1, vidaMax:1, escudo:0, xp:R.xp||0, nivel:R.nivel||1, xpProx:xpPara(R.nivel||1), ult:0, spawn:0, niveisPend:0,
     miniFeito:false, chefeFeito:false, chefeVivo:null, fim:false, eraChefe:R.mapaNaEra===MAPAS_POR_ERA-1,
     combo:0, comboT:0, comboMax:0, shake:0, hitstop:0, lento:0, desp:0, dashCd:0, dashT:0, invuln:0, buffCad:0, canto:0, fervor:0, reducao:0, renascer:0,
     tOvo:8, tFilhote:18, ultimoSE:-9, regen:0, agenda:[], tChefe:null, comb:D.combinado_regras.carga_inicial_seg, grito:0, totemAnc:0, solo:new Map(), tSolo:0, tFogo:0, soloJog:"chao", pvx:0, pvy:0, perigos:[], golpes:[], cadaveres:[], falas:[], escuro:0};
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
  for(let i=0;i<(R.profundidade===0?3:6);i++) spawnInimigo(); if(R.profundidade===0) J.invuln=Math.max(J.invuln,2.5);
  $("lugar").textContent=`${u.nome} · ${D.eras[u.era].nome}${R.ciclo?` · ciclo ${R.ciclo+1}`:""} · mapa ${R.profundidade+1}`;
  if(!J.intro){ $("hud").style.display=""; $("hudBase").style.display=""; }
  desenharEquipe(); desenharNinho(); rodando=true; pausado=false;
  aposAbertura(()=>{ const forte=ELS.find(k=>D.vantagem[k]===u.elemento), naReserva=R.reserva.find(m=>LINHA[m.id]&&LINHA[m.id].elemento===forte), naEquipe=ativos().some(s=>elementoDe(s)===forte);
    toast(`${u.nome}<br><small>Inimigos de ${NOME_EL(u.elemento)}. ${dicaVantagem(u.elemento)}${naReserva&&!naEquipe?`<br><b>${LINHA[naReserva.id].filhote}</b> está na reserva: toque num Selo para trocar (grátis agora).`:""}</small>`); });
  if(filaRamo.length||filaEsp.length) agendar(0.3,()=>{ if(!pausado) proximaEscolha(); });
}
function dicaVantagem(el){ const forte=ELS.find(k=>D.vantagem[k]===el); return `${NOME_EL(forte)} é super efetivo aqui.`; }
// Curva de dificuldade (calibrada com o bot: testes/bot.js + testes/rodar_bot.js; ver docs/ANALISE_EQUILIBRIO.md)
const DIF={vida:1.33, dano:1.42, danoBase:7, hp:30, spawn:0.15, base:3, cresc:0.08, onda:22, ondaN:20, max:280,
  rapido:42, rapidoCresc:5, rapidoMax:70, frente:0.2, frenteCresc:0.07, tiroElite:2.8, nivelAtrib:0.03, xpA:10, xpB:4, xpC:0.35,
  mini:80, chefe:560, guardiao:760, chefe1:0.5, chefeQueda:0.12, rampa:1.6, rampaK:2.2};   // vida de mini-chefe, chefe e Guardião da Era (em inimigos comuns); o 1º chefe leva chefe1 disso
// ameaças que crescem com a profundidade: começo suave, fim duro
const velRapido=()=>Math.min(DIF.rapidoMax, DIF.rapido+DIF.rapidoCresc*R.profundidade);
const chanceFrente=()=>Math.min(0.65, DIF.frente+DIF.frenteCresc*R.profundidade);
// rampa: a equipe ganha muito poder nos primeiros mapas (evoluções); os inimigos acompanham mais rápido no começo e o crescimento
// fixo por mapa fica mais suave, para não virar um muro de repente lá na frente
const rampa=()=>1+DIF.rampa*(1-Math.exp(-R.profundidade/DIF.rampaK));
const dificuldade=()=>Math.pow(DIF.vida,R.profundidade)*rampa()*(1+R.ciclo*1.5);
const danoDif=()=>Math.pow(DIF.dano,R.profundidade)*rampa()*(1+R.ciclo*1.5);
const xpPara=n=>Math.round(DIF.xpA+DIF.xpB*n+DIF.xpC*n*n);

function spawnInimigo(kForcado){
  const u=UNIV[R.universo], k=kForcado??(Math.random()<0.45?0:Math.random()<0.6?1:2);
  // nasce à frente da direção de movimento com chance DIF.frente (impede fugir para sempre)
  let lado=Math.floor(Math.random()*4); const dir=J.dir||{x:0,y:0};
  if(Math.random()<chanceFrente()&&Math.hypot(dir.x,dir.y)>0.2) lado = Math.abs(dir.x)>Math.abs(dir.y)? (dir.x>0?3:2) : (dir.y>0?1:0);
  const base=[{hp:.6,v:velRapido(),r:4,n:8},{hp:1,v:24,r:5,n:9},{hp:2.4,v:16,r:6,n:11}][k], elite=Math.random()<0.035;
  const el=Math.random()<0.85?u.elemento:escolha(ELS), hp=DIF.hp*base.hp*dificuldade()*(1+J.t/90)*(elite?7:1);
  const hx=VW/2+10, hy=VH/2+10, px=lado<2? rnd(-hx,hx) : (lado===2?-hx:hx), py=lado<2? (lado===0?-hy:hy) : rnd(-hy,hy);
  J.inimigos.push({x:J.jogador.x+px, y:J.jogador.y+py, hp, max:hp, v:base.v*(1+R.profundidade*0.02), r:base.r*(elite?1.6:1), esc:elite?1.2:1,
    dano:DIF.danoBase*danoDif()*(elite?2:1), tipo:k, el, elite, chefe:false, mini:false,
    spr:gerarSprite(u.id+"i"+k+el, base.n, mistura(COR[el],["#d8473b","#8a4fd0","#e0904a"][k],0.35), {olhos:"#fff2a0"}),
    status:null, lenta:0, congela:0, cego:0, dot:0, dotT:0, reacCd:0, vulner:0, flash:0, marca:0});
  const e=J.inimigos[J.inimigos.length-1]; e.xpF=fatorXPDiretor(); if((R.talismas&&R.talismas.mascara)||custo("risco")){ e.max*=tal.riscoVida()*(1+custo("risco")); e.hp=e.max; e.v*=tal.riscoVel(); } e.cor=mistura(COR[el],["#d8473b","#8a4fd0","#e0904a"][k],0.35); prepararCriatura(e,defInimigo(k),[17,20,23][k]);
}
// Onda de cerco: um anel de inimigos fecha em volta do jogador (use a esquiva para atravessar)
function ondaCerco(){ const n=Math.round(DIF.ondaN*(1+R.profundidade*0.15)), P=J.jogador, r=Math.min(VW,VH)*0.42;
  for(let i=0;i<n;i++){ spawnInimigo(); const e=J.inimigos[J.inimigos.length-1], a=i/n*Math.PI*2; e.x=P.x+Math.cos(a)*r; e.y=P.y+Math.sin(a)*r; e.v*=1.15; }
  tremor(3); }
function spawnChefe(mini){
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
function maisProximo(o,alc,f){ let best=null, bd=alc*alc; for(const e of J.inimigos){ if(e.hp<=0||e.oculto||(e.imortal&&e.hp<=1)||(f&&!f(e))) continue; const d=dist2(o,e); if(d<bd){bd=d; best=e;} }
  if(!best&&!f&&J.cena){
    // Koschei imortal: a equipe mira no carvalho (e depois no ovo) em vez de bater num chefe que não morre
    const ch=J.chefeVivo, k=ch&&ch.imortal? (ch.carvalho&&!ch.carvalho.morto? ch.carvalho : J.cena.lista.find(p=>p.ovoMorte&&!p.morto)) : null;
    best= k&&dist2(o,k)<alc*alc? k : propMaisProximo(o,Math.min(alc,55)); }
  return best; }
function maisForte(o,alc){ let best=null, bh=-1; for(const e of J.inimigos){ if(e.hp<=0||dist2(o,e)>alc*alc) continue; const p=e.max*(e.chefe?3:e.mini?2:e.elite?1.5:1); if(p>bh){bh=p; best=e;} } return best; }
function emArea(x,y,r,fn){ if(FONTE!=="ambiente") r*=tal.area(); const r2=r*r; for(const e of J.inimigos){ if(e.hp<=0) continue; const dx=e.x-x, dy=e.y-y; if(dx*dx+dy*dy<=r2+e.r*e.r) fn(e);}
  if(J.cena) for(const p of J.cena.lista){ if(p.morto||p.hp<=0) continue; const dx=p.x-x, dy=p.y-y; if(dx*dx+dy*dy>r2+p.r*p.r) continue;
    const x0=p.x, y0=p.y; fn(p); if(!p.morto&&(p.x!==x0||p.y!==y0)){ const ddx=p.x-x0, ddy=p.y-y0; p.x=x0; p.y=y0; if(!p.mat.fixo){ const k=Math.min(8,240/p.m); p.vx+=ddx*k; p.vy+=ddy*k; } } } }
function pontoDenso(o,alc){ let best=null, bn=0; for(const e of J.inimigos){ if(e.hp<=0||dist2(o,e)>alc*alc) continue; let n=0; for(const f of J.inimigos) if(dist2(e,f)<900) n++; if(n>bn){bn=n; best=e;} } return best; }

// ================================================================ efeitos de impacto
function tremor(v){ J.shake=Math.max(J.shake,v); }
function parar(t){ J.hitstop=Math.max(J.hitstop,t); }
function particulas(x,y,cor,n,vel,tam){ const L=J.parts.length; if(L>380) n=Math.ceil(n/4); else if(L>250) n=Math.ceil(n/2); if(QUAL===0) n=Math.ceil(n/2); for(let i=0;i<n;i++){ if(J.parts.length>450) J.parts.shift(); const a=Math.random()*Math.PI*2, v=rnd(vel*0.3,vel);
  J.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-rnd(0,vel*0.3),vida:rnd(.3,.7),max:.7,cor,tam:tam||1+Math.floor(Math.random()*2)}); } }
function anel(x,y,r,cor,dur){ J.efeitos.push({x,y,r,cor,vida:dur||.35,max:dur||.35}); }
function raio(x1,y1,x2,y2,cor){ J.efeitos.push({x:x1,y:y1,x2,y2,cor,vida:.22,max:.22,linha:true}); }
function numero(x,y,v,cor,tam,alvo){
  // golpes seguidos no mesmo inimigo somam no mesmo número (menos poluição na tela)
  if(alvo){ const n=J.nums.find(k=>k.alvo===alvo&&k.cor===cor&&k.vida>0.35); if(n){ n.v+=Math.round(v); n.vida=Math.max(n.vida,0.6); n.x=x; n.y=y; n.pop=1; return; } }
  if(J.nums.length>30) J.nums.shift(); J.nums.push({x:x+rnd(-3,3),y,v:Math.round(v),cor,tam,vida:.8,max:.8,vy:-44,vx:((Math.abs(x*13.7+y*7.3+J.t*31)%32)-16),alvo}); }
function texto(x,y,t,cor,tam){ if(J.textos.length>12) J.textos.shift(); J.textos.push({x,y,t,cor,tam:tam||16,vida:1.1}); }

// sombra de contato: elipse com borda macia (imagem pronta, escalada), mais escura no centro
let SOMBRA_IMG=null;
function sombraContato(x,y,w,a){ if(!SOMBRA_IMG){ SOMBRA_IMG=document.createElement("canvas"); SOMBRA_IMG.width=64; SOMBRA_IMG.height=64; const g=SOMBRA_IMG.getContext("2d"), gr=g.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,"rgba(0,0,0,1)"); gr.addColorStop(0.45,"rgba(0,0,0,.75)"); gr.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=gr; g.fillRect(0,0,64,64); SOMBRA_IMG._suave=true; }
  const h=Math.max(1.6,w*0.38), a0=lg.globalAlpha; lg.globalAlpha=a0*a; const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true; lg.drawImage(SOMBRA_IMG,x-w/2,y-h/2,w,h); lg.imageSmoothingEnabled=suave; lg.globalAlpha=a0; }
// faísca de impacto: clarão branco no ponto do golpe, riscos que saem na cor do elemento e um anel fino (crítico maior).
// No máximo uma a cada 0,07 s por inimigo, para não virar borrão quando muitos golpes acertam juntos.
function faiscaImpacto(e,el,crit,sup){ if(SIM.ativo||QUAL===0) return; if(J.t-(e._faisca??-9)<0.07) return; e._faisca=J.t; const v=vEl(el), x0=e.x+rnd(-2,2), y0=e.y-3+rnd(-2,2), n=crit?7:sup?5:3, base=Math.random()*6.28, tam=crit?1.6:1;
  const riscos=[]; for(let i=0;i<n;i++) riscos.push({a:base+i/n*6.28+rnd(-0.3,0.3),l:rnd(5,9)*tam});
  vfx({max:crit?0.22:0.16,desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, k=1-q; lg.globalCompositeOperation="lighter"; lg.lineCap="round";
    lg.globalAlpha=k*0.9; lg.drawImage(bolhaCor(crit?"#fff3a0":v.c1),x-6*tam*(0.6+q),y-6*tam*(0.6+q),12*tam*(0.6+q),12*tam*(0.6+q));
    for(const r of riscos){ const d0=r.l*q*0.7, d1=r.l*(0.35+q); lg.strokeStyle=crit?"#fff3a0":v.c2; lg.lineWidth=1.4*k*tam; lg.globalAlpha=k; lg.beginPath(); lg.moveTo(x+Math.cos(r.a)*d0,y+Math.sin(r.a)*d0); lg.lineTo(x+Math.cos(r.a)*d1,y+Math.sin(r.a)*d1); lg.stroke();
      lg.strokeStyle="#ffffff"; lg.lineWidth=0.5*k*tam; lg.stroke(); }
    if(crit||sup){ lg.strokeStyle=crit?"#ffe066":v.c2; lg.lineWidth=0.8*k; lg.globalAlpha=k*0.8; lg.beginPath(); lg.arc(x,y,3+q*10*tam,0,Math.PI*2); lg.stroke(); }
    lg.lineCap="butt"; lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }});
  if(crit) luzFlash(e.x,e.y,"#ffe9a0",34,0.18); }
// ================================================================ dano, reações, mortes
function ferir(e,dano,el,o={}){
  if(e.ehProp){ danificarProp(e,dano,el); return; }
  if(e.hp<=0||e.oculto) return;
  const ef=eficacia(el,e.el), crit=o.crit||Math.random()<0.08+tal.critico()+(ativos().some(s=>s.berserk>0)?0.2:0);
  let d=dano*ef*(crit?1.8:1)*(e.vulner>0?1.2:1)*(e.bebado>0?1.5:1)*fadigaChefe(e)*multDanoLenda(e)*relDano(e);
  for(const z of J.zonas) if(z.tipo==="circulo"&&dist2(z,e)<z.r*z.r) d*=z.amp;
  e.hp-=d; e.flash=0.08; e.golpeT=J.t; if(J.t-(e.dorT??-9)>0.6) e.dorT=J.t; R.st.porFonte[FONTE]=(R.st.porFonte[FONTE]||0)+d; R.st.dano+=d; R.st.golpes++; if(ef>1) R.st.superEf++; else if(ef<1) R.st.poucoEf++;
  if(crit){ som("critico"); numero(e.x,e.y-6,d,"#ffe066",20,e); parar(0.025); particulas(e.x,e.y,"#fff3a0",5,60); }
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
function danoSimples(e,d){ if(e.ehProp){ danificarProp(e,d,null); return; } if(e.hp<=0||e.oculto) return; R.st.porFonte[FONTE]=(R.st.porFonte[FONTE]||0)+d; e.hp-=d; e.flash=0.06; if(e.hp<=0) morrer(e); }
function reagir(e,a,b,dano){
  const r=REAC[[a,b].sort().join("|")]; if(!r) return;
  const fonteAnt=FONTE; FONTE="reacao"; reagirEfeito(e,a,b,dano,r); FONTE=fonteAnt;
}
function reagirEfeito(e,a,b,dano,r){ evento("reacao"); diaria("reacoes");
  if(!SIM.ativo&&!META.dicaReacao){ META.dicaReacao=true; gravar(); toast(`<b>Reação elemental!</b><br><small>${NOME_EL(a)} + ${NOME_EL(b)} no mesmo inimigo. Misturar elementos na equipe é a maior fonte de dano do jogo.</small>`); }
  const p=Math.max(dano,6)*2.2*SIN.reac, cor=mistura(COR[a],COR[b],.5);
  R.st.reacoes[r.nome]=(R.st.reacoes[r.nome]||0)+1; textoUnico("r:"+r.nome,e.x,e.y-10,r.nome,cor,19); tremor(2.5); vfxReacao(e,a,b);
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
function morrer(e){
  if(e.fugitivo&&!e._pagou){ e._pagou=true; diaria("eventos"); soltarBau(e.x,e.y,"ouro"); anunciar({el:"luz"},"Fugitivo derrotado!","Ele deixou um baú dourado."); }
  // todo chefe mostra a segunda fase: um golpe que pularia a metade da vida para na fase 2
  if(e.chefe&&e.def&&e.def.fase2&&e.ia&&e.ia.fase===1&&!e.morto){ e.hp=e.max*0.45; e.ia.fase=2; faseDois(e,e.def.fase2); e.ia.ocupado=1.4; e.parado=true; return; }
  if(e.imortal){ e.hp=1; if(Math.random()<.15) texto(e.x,e.y-20,"Imortal! Quebre o carvalho.","#c8c8e0",13); return; }
  if(e.morto) return; e.morto=true; aoMorrerCriatura(e);
  if(temRel("Hidromel do Salão dos Heróis")){ J.hidro=J.hidro||[]; if(J.hidro.length<30) J.hidro.push(J.t+10); else { J.hidro.shift(); J.hidro.push(J.t+10); } }
  R.abates++; diaria("abates"); if(R.ancestral&&R.ancestral.estado==="chocando") R.ancestral.prog+=D.ancestral_regras.por_abate_seg; if(R.st.primeiroAbate==null) R.st.primeiroAbate=J.t; J.combo++; J.comboT=D.combo.janela_seg; J.comboMax=Math.max(J.comboMax,J.combo);
  J.ult=Math.min(100,J.ult+(e.chefe?25:e.mini?10:e.elite?2:0.07)*(1+Math.min(1,J.combo/200)));
  const cor=COR[e.el]; particulas(e.x,e.y,cor,e.chefe?60:e.elite?22:9,e.chefe?150:90,e.elite?2:1);
  if(e.elite){ tremor(e.chefe?10:4); parar(e.chefe?0.2:0.05); }
  const val=(e.chefe?40:e.mini?15:e.elite?8:1+(e.tipo===2?1:0))*(1+0.12*R.profundidade)*(e.xpF||1);   // xpF: inimigos extras do diretor valem menos
  const nG=Math.min(6,Math.ceil(val/3)); for(let i=0;i<nG;i++){ const a=Math.random()*Math.PI*2; J.gemas.push({x:e.x,y:e.y,vx:Math.cos(a)*rnd(20,50),vy:Math.sin(a)*rnd(20,50),v:val/nG,cor}); }
  if(e.marca>0){ anel(e.x,e.y,24,"#c070ff",.35); emArea(e.x,e.y,24,o=>danoSimples(o,e.marca)); }
  if(e.elite&&!e.chefe&&!e.mini&&Math.random()<(e.daOnda?0.1:0.3)) darItem(itemUtil(["incenso","doce","pena","doce"]), e);
  // moedas de Essência e baús: recompensa pequena e frequente, e de vez em quando uma grande
  { const nm=e.chefe?24:e.mini?10:e.elite?3+Math.floor(Math.random()*3):(Math.random()<0.035?1:0); soltarMoedas(e.x,e.y,nm); }
  if(e.mini||(e.elite&&!e.chefe&&!e.daOnda&&Math.random()<0.1)) soltarBau(e.x,e.y,"prata");
  if(e.mini) evento("mini"); if(e.elite&&!e.chefe&&!e.mini) evento("elite"); if(!e.chefe&&!e.mini&&!e.clone&&!e.especial&&e.tipo<=2) evento("abate:"+e.tipo); if(e.especial&&e.roubou) evento("saci");
  if(e.mini){ darItem(itemUtil(["incenso","incenso","doce"]),e); if(!bauDesperto(e.x,e.y)) darItem(itemUtil(["pedra","doce","pena"]),e); }   // o baú entrega o Desperto no lugar do item
  for(const m of D.combo.marcos) if(J.combo===m){ som("combo"); soltarMoedas(J.jogador.x,J.jogador.y-6,2+Math.floor(m/25)); luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",70,0.5); texto(J.jogador.x,J.jogador.y-22,`Frenesi ${m}!`,"#ffd34a",22); anel(J.jogador.x,J.jogador.y,60,"#ffd34a",.6);
    emArea(J.jogador.x,J.jogador.y,60,o=>{const dx=o.x-J.jogador.x, dy=o.y-J.jogador.y, d=Math.hypot(dx,dy)||1; o.x+=dx/d*30; o.y+=dy/d*30;}); tremor(5); }
  if(e===J.chefeVivo){ bauDesperto(e.x,e.y); vencerChefe(e); agendar(1.1,()=>{ if(J) abrirBau({tipo:"ouro",x:e.x,y:e.y}); }); }
}
function curar(v){ if(J&&v>0) J.curou=true; const sobra=J.vida+v-J.vidaMax; J.vida=Math.min(J.vidaMax,J.vida+v); if(sobra>0&&J.regen>0&&J.regenMod===0) J.escudo=Math.min(J.vidaMax*0.3,J.escudo+sobra); }
// item na hora certa: cada item ganha peso pelo quanto serve agora (Pedra perto de virar Adulto, Mel perto de evoluir,
// Incenso com Selo vazio, Pena com reserva e troca em recarga); o que não serviria para nada quase não cai
function utilItem(k){ const at=ativos(); if(!R||!at.length) return 1;
  switch(k){
    case "pedra": return at.some(s=>s.mon.ramo==null&&s.nivel>=NIV[2]-3)&&!R.pedraAtiva? 4 : at.some(s=>s.mon.ramo==null)? 1 : 0.05;
    case "doce": return at.some(s=>NIV.some(n=>s.nivel===n-1))? 3 : 1;
    case "incenso": return R.selos.some(s=>!s.mon)? 4 : R.reserva.length<2? 1.5 : 0.6;
    case "pena": return R.reserva.length&&R.selos.some(s=>s.trocaCd>0)? 3 : R.reserva.length? 1 : 0.1;
    case "chamado": return 1; }
  return 1; }
function itemUtil(lista){ const w=lista.map(utilItem), tot=w.reduce((a,b)=>a+b,0); let r=Math.random()*tot; for(let i=0;i<lista.length;i++){ r-=w[i]; if(r<=0) return lista[i]; } return lista[0]; }
// algum item da bolsa serve agora? (o botão Bolsa brilha)
function itemUsavelAgora(){ if(!R||!J) return false; const I=R.itens; return (I.incenso>0&&R.selos.some(s=>!s.mon))||(I.doce>0&&ativos().some(s=>NIV.some(n=>s.nivel===n-1)))||I.chamado>0||(I.pedra>0&&!R.pedraAtiva&&ativos().some(s=>s.mon.ramo==null&&s.nivel>=NIV[2]-1))||(I.pena>0&&R.reserva.length&&R.selos.some(s=>s.trocaCd>3)); }
function darItem(k,e){ R.itens[k]++; texto(e.x,e.y-16,D.itens[k].nome,"#9fd6d0",13); particulas(e.x,e.y,"#9fd6d0",10,60); }

// ================================================================ ataques: básico + habilidades por classe
function ataqueBasico(s,a,el,cor){
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
const HAB={
  guardiao:{ h1:{cd:7, f(s,a,el,cor,lv,mod){ emArea(s.x,s.y,60,e=>{ e.x+=(s.x-e.x)*0.5; e.y+=(s.y-e.y)*0.5; if(mod===0) ferir(e,a.dano*2*fNivel(lv),el); }); J.reducao=3; anel(s.x,s.y,60,cor,.5); if(mod===1) J.escudo=Math.min(J.vidaMax*0.4,J.escudo+J.vidaMax*0.1); tremor(2); }},
             h2:{cd:10,f(s,a,el,cor,lv,mod){ const rr=mod===0?65:50; emArea(s.x,s.y,rr,e=>{ ferir(e,a.dano*2*fNivel(lv),el); const dx=e.x-s.x,dy=e.y-s.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*30; e.y+=dy/d*30; e.congela=mod===0?3.2:1; }); anel(s.x,s.y,rr,cor,.6); tremor(3);
               if(mod===1) agendar(1,()=>{ emArea(s.x,s.y,55,e=>ferir(e,a.dano*4*fNivel(lv),el)); anel(s.x,s.y,55,"#ffffff",.5); tremor(4); }); }} },
  guerreiro:{ h1:{cd:5, f(s,a,el,cor,lv,mod){ const e=pontoDenso(s,90)||maisProximo(s,90); if(!e) return false; J.fantasmas.push({x:s.x,y:s.y,spr:spriteSelo(s),vida:.25}); const x0=s.x,y0=s.y; s.x=e.x; s.y=e.y;
               const r=mod===1?50:30; emArea(e.x,e.y,r,o=>ferir(o,a.dano*2.5*fNivel(lv),el)); anel(e.x,e.y,r,cor,.4); tremor(3); particulas(e.x,e.y,cor,14,100);
               if(mod===0) J.zonas.push({fonte:FONTE,tipo:"rastro",x:(x0+e.x)/2,y:(y0+e.y)/2,r:22,el,cor,dano:a.dano*0.8,vida:3}); }},
              h2:{cd:12,f(s,a,el,cor,lv,mod){ s.furia=4+lv*0.5; s.furiaMod=mod; anel(s.x,s.y,18,"#ff5a4a",.5); texto(s.x,s.y-12,"Fúria!","#ff5a4a",14); }} },
  assassino:{ h1:{cd:4, f(s,a,el,cor,lv,mod){ const alvos=[maisForte(s,120)]; if(mod===0) alvos.push(maisForte(s,120)); let ok=false;
               for(const e of alvos){ if(!e||e.hp<=0) continue; ok=true; J.fantasmas.push({x:s.x,y:s.y,spr:spriteSelo(s),vida:.2}); s.x=e.x-3; s.y=e.y-3; ferir(e,a.dano*3*fNivel(lv),el,{crit:true}); if(mod===1){e.dot=a.dano; e.dotT=4;} }
               if(ok) tremor(2); return ok; }},
              h2:{cd:8, f(s,a,el,cor,lv,mod){ let n=0; for(const e of embaralhar(J.inimigos)){ if(e.hp<=0||dist2(s,e)>110*110) continue; e.marca=a.dano*3*fNivel(lv); if(mod===0&&!e.chefe&&!e.mini&&e.hp<e.max*0.25) danoSimples(e,e.hp+1); if(++n>=(mod===1?5:3)) break; } return n>0; }} },
  cacador:{ h1:{cd:4, f(s,a,el,cor,lv,mod){ const e=maisProximo(s,150); if(!e) return false; const base=Math.atan2(e.y-s.y,e.x-s.x);
               for(let i=0;i<5;i++){ const ang=base+(i-2)*0.2; J.proj.push({fonte:FONTE,x:s.x,y:s.y,vx:Math.cos(ang)*190,vy:Math.sin(ang)*190,dano:a.dano*1.3*fNivel(lv),el,cor,vida:1.3,perf:mod===0?5:1,ric:mod===1?3:0,r:2}); } }},
            h2:{cd:9, f(s,a,el,cor,lv,mod){ for(let i=0;i<3;i++) J.armadilhas.push({fonte:FONTE,x:s.x+rnd(-30,30),y:s.y+rnd(-30,30),dano:a.dano*(mod===1?6:4.5)*fNivel(lv),el,cor,raiz:mod===0,vida:12}); }} },
  mago:{ h1:{cd:6, f(s,a,el,cor,lv,mod){ const e=pontoDenso(s,140); if(!e) return false;
            if(mod===0){ for(let i=0;i<6;i++) agendar(i*0.12,()=>{ const x=e.x+rnd(-28,28), y=e.y+rnd(-28,28); emArea(x,y,24,o=>ferir(o,a.dano*2*fNivel(lv),el)); anel(x,y,24,cor,.35); particulas(x,y,cor,8,70); tremor(1.5); }); }
            else { const r=mod===1?70:40; emArea(e.x,e.y,r,o=>ferir(o,a.dano*(mod===1?5:3)*fNivel(lv),el)); anel(e.x,e.y,r,cor,.5); particulas(e.x,e.y,cor,26,130); tremor(mod===1?7:4); } }},
         h2:{cd:12,f(s,a,el,cor,lv,mod){ J.zonas.push({fonte:FONTE,tipo:"circulo",x:J.jogador.x,y:J.jogador.y,r:55,amp:mod===0?1.6:1.3+0.05*lv,puxa:mod===1,cor,vida:5}); }} },
  invocador:{ h1:{cd:7, f(s,a,el,cor,lv,mod){ for(let i=0;i<4;i++) J.crias.push({fonte:FONTE,x:s.x+rnd(-8,8),y:s.y+rnd(-8,8),dano:a.dano*0.7*fNivel(lv),el,cor,vida:7,cd:0,kami:mod===0,guarda:mod===1}); particulas(s.x,s.y,cor,12,60); }},
              h2:{cd:14,f(s,a,el,cor,lv,mod){ const pos=[{x:s.x+20,y:s.y}]; if(mod===0) pos.push({x:s.x-20,y:s.y});
               if(mod===1){ J.crias.push({fonte:FONTE,x:s.x,y:s.y,dano:a.dano*4*fNivel(lv),el,cor,vida:9,cd:0,gigante:true}); anel(s.x,s.y,20,cor,.5); return; }
               pos.forEach(p=>J.zonas.push({fonte:FONTE,tipo:"portal",x:p.x,y:p.y,r:8,cor,el,dano:a.dano*(mod===0?0.85:0.6)*fNivel(lv),vida:5,cd:0})); }} },
  mistico:{ h1:{cd:8, f(s,a,el,cor,lv,mod){ J.regen=4; J.regenV=0.03*fNivel(lv); J.regenMod=mod; anel(J.jogador.x,J.jogador.y,30,"#7fe0a0",.6); if(mod===1) J.buffCad=4; }},
            h2:{cd:999,f(){ J.renascer=1; texto(J.jogador.x,J.jogador.y-18,"Renascer pronto","#fff3c4",13); }} },
  xama:{ h1:{cd:8, f(s,a,el,cor,lv,mod){ J.canto=5; if(mod===0) J.fervor=5; anel(J.jogador.x,J.jogador.y,40,cor,.6); if(mod===1) emArea(J.jogador.x,J.jogador.y,45,e=>{const dx=e.x-J.jogador.x,dy=e.y-J.jogador.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*25; e.y+=dy/d*25;}); }},
         h2:{cd:10,f(s,a,el,cor,lv,mod){ J.zonas.push({fonte:FONTE,tipo:"espirito",x:J.jogador.x,y:J.jogador.y,r:4,ang:0,cor,el,el2:mod===0?escolha(ELS.filter(x=>x!==el)):null,cadeia:mod===1,dano:a.dano*1.2*fNivel(lv),vida:6,cd:0}); }} },
};
function agirSelo(s,dt){
  const a=atrib(s), el=elementoDe(s), cor=COR[el], cls=L(s).classe;
  if(s.esp!=null&&!SIM.semEspeciais){ s.cdEsp=(s.cdEsp??10)-dt; if(s.cdEsp<=0){ FONTE="especial"; dispararEspecial(s,a,el,cor); s.cdEsp=recargaEspecial(s); } }
  if(s.furia>0){ s.furia-=dt; if(s.furiaMod===0) curar(J.vidaMax*0.02*dt); if(s.furiaMod===1) J.imparavel=0.2; }
  s.cd-=dt*a.cad*(J.cantoGuerra>0?1.2:1); if(s.cd<=0){ FONTE="basico"; s.cd=ataqueBasico(s,atribPoder(a,s,"b"),el,cor)*tal.recarga(); aoDisparar(s,"b",a,el,cor); if(J.t-(s.atkT??-9)>0.5) s.atkT=J.t; }
  for(const k of ["h1","h2"]){ const lv=s.pod[k]; if(!lv) continue; if(k==="h2"&&est(s)<1) continue;
    const def=HAB[cls][k]; const key=k==="h1"?"cd1":"cd2"; s[key]-=dt*(J.desp>0?1.4:1);
    if(s[key]<=0){ FONTE="habilidade"; const r=def.f(s,atribPoder(a,s,k),el,cor,lv,s.mod[k]); s[key]= r===false? 0.6 : def.cd*fRecarga(lv)*tal.recarga()*((SIN.rm&&SIN.rm.recarga)||1); if(r!==false) aoDisparar(s,k,a,el,cor); } }
}

// ================================================================ progressão: níveis, poderes, evolução
function aplicarNivel(s,qtd){ for(let i=0;i<qtd;i++){ const antes=estBase(s); s.nivel++; checarEvolucao(s,antes); } }
function checarEvolucao(s,antes){
  if(s.mon.ramo==null&&s.nivel>=NIV[2]&&!filaRamo.includes(s)) filaRamo.push(s);
  if(s.esp==null&&s.nivel>=NIV[1]&&!filaEsp.includes(s)) filaEsp.push(s);
  const depois=estBase(s);
  if(depois>antes){ if(depois===2) diaria("evolucoes"); registrarDex(s.mon.id,depois,s.mon.ramo,s.mon.rar); R.st.evolucoes[depois]++; efeitoEvolucao(s); som("evolucao"); cenaEvolucao(s,antes,depois); calcularSinergia(); desenharEquipe(); }
}
function efeitoEvolucao(s){ if(!J) return; anel(s.x,s.y,30,"#ffffff",.6); anel(s.x,s.y,50,COR[elementoDe(s)],.8); particulas(s.x,s.y,COR[elementoDe(s)],30,120,2); particulas(s.x,s.y,"#fff3c4",14,90); tremor(5); parar(0.08); }
function ramosElegiveis(s,ignorarPedra,base){
  const l=L(s), outros=ativos().filter(o=>o!==s), u=UNIV[R.universo], ok=[], elDe=base?elementoBase:elementoDe;
  if(R.pedraAtiva&&!ignorarPedra) return [0,1,2];
  l.ramos.forEach((r,i)=>{ const c=r.condicao;
    if(c.tipo==="afinidade"&&outros.some(o=>elDe(o)===l.elemento)) ok.push(i);
    else if(c.tipo==="solitario"&&!outros.some(o=>elDe(o)===l.elemento)) ok.push(i);
    else if(c.tipo==="alianca"&&outros.some(o=>L(o).classe===c.classe||classeExtraDe(o)===c.classe)) ok.push(i);
    else if(c.tipo==="regional"&&(u.era===c.era||u.elemento===c.elemento)) ok.push(i); });
  return ok;
}
function textoCondicao(r){ const c=r.condicao;
  if(c.tipo==="afinidade") return "Afinidade: 1+ aliado do mesmo elemento"; if(c.tipo==="solitario") return "Solitário: nenhum aliado do mesmo elemento";
  if(c.tipo==="alianca") return `Aliança: aliado ${D.classes[c.classe].nome} (vira classe dupla)`;
  return `Regional: ${D.eras[c.era].nome} ou mapa de ${NOME_EL(c.elemento)} (vira ${NOME_EL(c.elemento)})`; }

// ================================================================ telas de escolha
function mostrarCartas(titulo,sub,cartas,op={}){
  pausado=true; { const tc=$("telaCartas"), f=op.fundo&&UI_ARQ(op.fundo); tc.style.backgroundImage=f? `linear-gradient(180deg,rgba(8,6,16,.35),rgba(8,6,16,.78)), url(${f.src})` : ""; tc.classList.toggle("com-fundo",!!f); }
  $("cartasTitulo").textContent=titulo; $("cartasSub").innerHTML=sub||""; const box=$("cartas"); box.innerHTML=""; box.className="cartas"+(op.grade?" grade":"");
  $("cartasRodape").innerHTML="";
  { const rl=$("telaCartas").querySelector(".rolagem"); if(rl&&rl.dataset.t!==titulo){ rl.scrollTop=0; rl.dataset.t=titulo; } }   // tela nova começa do topo
  cartas.forEach((c,ci)=>{ const b=document.createElement("button"); b.className="carta r-"+(c.raridade||"comum"); b.style.setProperty("--i",Math.min(ci,10)); if(c.desab) b.disabled=true;
    if(c.classe) b.classList.add(c.classe);
    if(c.quadros&&c.quadros.length){ const q0=c.quadros[0], cc=document.createElement("canvas"); cc.width=q0.width; cc.height=q0.height; cc.className=(c.classe==="medio"?"retrato-medio":"retrato-grande")+" anim-retrato"; cc.getContext("2d").drawImage(q0,0,0); cc._quadros=c.quadros; if(c.quadros.geo){ cc._geo=c.quadros.geo; cc.classList.add("nitido"); } b.appendChild(cc); animarRetratos(); }
    else if(c.sprite){ const sp=spriteUI(c.sprite), cc=document.createElement("canvas"); cc.width=sp.width; cc.height=sp.height; cc.getContext("2d").drawImage(sp,0,0); if(c.suave||sp!==c.sprite) cc.style.imageRendering="auto"; if(c.classe==="grande") cc.className="retrato-grande"; b.appendChild(cc); }
    const t=document.createElement("div"); t.innerHTML=`<b>${c.titulo}</b>${c.texto?`<small>${c.texto}</small>`:""}`; b.appendChild(t);
    b.onclick=()=>{ if(c.desab) return; if(!c.manter) $("telaCartas").classList.remove("ativa"); c.acao(b); }; box.appendChild(b); });
  box.classList.toggle("revelar",!!op.revelar);
  $("telaCartas").classList.add("ativa"); box.querySelector("button:not([disabled])")?.focus();
}
function fechar(){ $("telaCartas").classList.remove("ativa"); }
// retratos animados nas cartas (quadros "parado" da folha de animação), enquanto a tela estiver aberta
let animRet=null;
function animarRetratos(){ if(animRet) return; const passo=t=>{ const cs=[...document.querySelectorAll("#cartas canvas.anim-retrato")].filter(c=>c._quadros);
    if(!cs.length||!$("telaCartas").classList.contains("ativa")){ animRet=null; return; }
    const f=Math.floor(t/1000*6); for(const c of cs){ if(c._geo){ desenharRetrato(c,c._geo,f); continue; } const q=c._quadros[f%c._quadros.length], g=c.getContext("2d"); g.clearRect(0,0,c.width,c.height); g.drawImage(q,0,0); }
    animRet=requestAnimationFrame(passo); }; animRet=requestAnimationFrame(passo); }
// quadros do monstro parado, em alta resolução, para a tela de escolha; sem folha de animação, usa a imagem fixa
// retrato animado (linha "parado" da folha): caixa calculada pela união de todos os quadros (nada sai cortado), margem,
// ampliação inteira pixel a pixel (pixel nítido, sem borrão) e uma sombra macia no chão; os pés ficam na mesma linha em todos os quadros
function quadrosForma(id,e,ramo,rar){ const fa=folhaAnimMonstro(id,e,ramo,rar); if(!fa) return null; const img=fa.img, fo=fa.cor||img, f=fatiarFolha(img,6,3); if(!f.valida||!f.linhas[0].qs.length) return null;
  const L=f.linhas[0], ky=correcaoAltura(img); let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  for(const q of L.qs){ const ax=q.bx-q.ref-L.centro; x0=Math.min(x0,ax); x1=Math.max(x1,ax+q.bw); y0=Math.min(y0,(q.by-L.pe)*ky); y1=Math.max(y1,(q.by+q.bh-L.pe)*ky); }
  const w=x1-x0, h=y1-y0, lado=Math.max(w,h)*1.22, K=Math.max(2,Math.round(340/lado)), C=Math.round(lado*K), cx=C/2-(x0+w/2)*K, peY=C/2+(h/2)*K-(y1>0?y1*K:0)+C*0.02;
  const qs=L.qs.map(q=>{ const c=document.createElement("canvas"); c.width=c.height=C; const g=c.getContext("2d");
    const sg=g.createRadialGradient(C/2,peY,0,C/2,peY,w*K*0.55); sg.addColorStop(0,"rgba(0,0,0,.45)"); sg.addColorStop(1,"rgba(0,0,0,0)"); g.save(); g.translate(0,peY); g.scale(1,0.22); g.translate(0,-peY); g.fillStyle=sg; g.fillRect(0,peY-w*K,C,w*K*2); g.restore();
    g.imageSmoothingEnabled=false; g.drawImage(fo,q.bx,q.by,q.bw,q.bh,Math.round(cx+(q.bx-q.ref-L.centro)*K),Math.round(peY+(q.by-L.pe)*ky*K),q.bw*K,Math.round(q.bh*ky*K)); return c; });
  // geometria em tamanho original: as cartas redesenham o quadro direto nos pixels reais da tela (ver desenharRetrato)
  qs.geo={fo, lado, w, ky, peY:lado/2+h/2-(y1>0?y1:0)+lado*0.02, cx:lado/2-(x0+w/2), qs:L.qs.map(q=>({bx:q.bx,by:q.by,bw:q.bw,bh:q.bh,dx:q.bx-q.ref-L.centro,dy:(q.by-L.pe)*ky}))};
  return qs; }
// desenha um quadro do retrato no canvas da carta, que tem o tamanho exato da tela do aparelho:
// ampliação inteira (cada pixel da arte vira um bloco igual) e nenhuma segunda ampliação do navegador, que borrava tudo
function desenharRetrato(c,geo,i){ const d=Math.min(3,window.devicePixelRatio||1), T=Math.round((c.clientWidth||0)*d);
  if(T>0&&c.width!==T){ c.width=c.height=T; } const C=c.width, g=c.getContext("2d"); g.clearRect(0,0,C,C);
  const k=Math.max(1,Math.floor(C/geo.lado)), o=Math.round((C-geo.lado*k)/2), peY=o+geo.peY*k, q=geo.qs[i%geo.qs.length];
  const sg=g.createRadialGradient(C/2,peY,0,C/2,peY,geo.w*k*0.55); sg.addColorStop(0,"rgba(0,0,0,.45)"); sg.addColorStop(1,"rgba(0,0,0,0)");
  g.save(); g.translate(0,peY); g.scale(1,0.22); g.translate(0,-peY); g.fillStyle=sg; g.fillRect(0,peY-geo.w*k,C,geo.w*k*2); g.restore();
  g.imageSmoothingEnabled=false; g.drawImage(geo.fo,q.bx,q.by,q.bw,q.bh,o+Math.round((geo.cx+q.dx)*k),Math.round(peY+q.dy*k),q.bw*k,Math.round(q.bh*geo.ky*k)); }
function quadrosRetrato(id){ return quadrosForma(id,0,null,"comum"); }
function proximaEscolha(){
  if(filaRamo.length) return escolherRamo(filaRamo.shift());
  if(filaEsp.length) return escolherEspecial(filaEsp.shift());
  if(J&&J.niveisPend>0){ J.niveisPend--; return abrirNivel(); }
  fechar(); pausado=false; calcularSinergia(); desenharEquipe();
}
function escolherRamo(s){
  if(!s.mon||s.mon.ramo!=null) return proximaEscolha();
  if(LINHA[s.mon.id].ancestral){ const antes=estBase(s); s.mon.ramo=0; checarEvolucao(s,antes); return proximaEscolha(); }
  const l=L(s), ok=ramosElegiveis(s), pedra=R.pedraAtiva;
  mostrarCartas(`${l.jovem} vai virar Adulto`, pedra?"A Pedra Ancestral liberou os três caminhos.":"Escolha o caminho. Os bloqueados mostram o requisito.",
    l.ramos.map((r,i)=>({ titulo:r.nome+(r.linhagem!==l.linhagem?` · ${D.linhagens[r.linhagem].nome}`:""), raridade:ok.includes(i)?"raro":"comum", desab:!ok.includes(i),
      texto:`${textoCondicao(r)}<br>Supremo: ${r.supremo}. ${r.ultimate}`, classe:"medio", quadros:quadrosForma(s.mon.id,2,i,s.mon.rar), sprite:arteMonstro(s.mon.id,2,i,s.mon.rar)||gerarSprite(s.mon.id+"#2#"+i,TAM[2],COR[r.elemento],{rar:s.mon.rar}),
      acao:()=>{ const antes=estBase(s); s.mon.ramo=i; if(pedra) R.pedraAtiva=false; checarEvolucao(s,antes); proximaEscolha(); } })));
}
function resumoPoderes(s){ const c=D.classes[L(s).classe]; return `Básico ${s.pod.b} · ${c.h1.nome} ${s.pod.h1} · ${c.h2.nome} ${s.pod.h2}`; }
// level up no estilo survivor: 3 cartas sorteadas entre os poderes da equipe (com raridade), mais Elo, Talismã e Lenda quando houver.
// Às vezes vem uma carta dourada (+2 níveis). Dá para sortear de novo algumas vezes por run.
function cartasNivel(){ const eq=ativos(), maxN=Math.max(...eq.map(s=>s.nivel)), cand=[];
  for(const s of eq){ const c=D.classes[L(s).classe], lib=[["b","Ataque básico",`${c.basico} +20% de dano e +5% de cadência.`],["h1",c.h1.nome,c.h1.desc],...((est(s)>=1||estBase(s)>=1)?[["h2",c.h2.nome,c.h2.desc]]:[])];
    const peso=1+(maxN-s.nivel)*0.35; let algum=false;
    for(const [k,nome,desc] of lib){ const lv=s.pod[k]; if(lv>=5) continue; algum=true; const prox=lv+1;
      cand.push({peso, s, k, raridade: prox===5?"lendario": prox===3&&k!=="b"?"epico": prox>=2?"raro":"incomum",
        titulo:`${nome} ${lv?`${lv} → ${prox}`:"(novo)"}`, texto:`<b style="color:${COR[elementoDe(s)]}">${nomeForma(s)}</b> · nível ${s.nivel}. ${desc}${k!=="b"&&prox===3?" Libera um modificador.":""}${prox===5?" Nível máximo!":""}`}); }
    if(!algum) cand.push({peso:0.8, s, asc:true, raridade:"lendario", titulo:`Ascensão de ${nomeForma(s)}`, texto:"Todos os poderes no máximo: +1 nível (+6% em todos os atributos)."}); }
  const sorteio=[], pool=cand.slice();
  while(sorteio.length<3&&pool.length){ const tot=pool.reduce((t,c)=>t+c.peso,0); let x=Math.random()*tot; const i=pool.findIndex(c=>(x-=c.peso)<=0); const c=pool.splice(i<0?0:i,1)[0]; sorteio.push(c); }
  if(sorteio.length&&Math.random()<0.07+((SIN.rm&&SIN.rm.talisma)||0)*0.1){ const c=escolha(sorteio.filter(c=>!c.asc&&c.s.pod[c.k]<=3)); if(c){ c.dourada=true; c.raridade="lendario"; c.titulo="✦ "+c.titulo.replace(/(\d) → (\d)/,(m,a)=>`${a} → ${Math.min(5,+a+2)}`); c.texto+=" <b>Carta dourada: +2 níveis!</b>"; } }
  return sorteio; }
function aplicarCartaNivel(c){ const s=c.s;
  if(c.asc){ aplicarNivel(s,1); return proximaEscolha(); }
  const vezes=c.dourada? Math.min(2,5-s.pod[c.k]) : 1; let mod=false;
  for(let i=0;i<vezes;i++){ s.pod[c.k]++; aplicarNivel(s,1); if(c.k!=="b"&&s.pod[c.k]===3&&s.mod[c.k]==null) mod=true; }
  if(c.dourada){ som("jackpot"); if(J) luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",90,0.6); }
  if(mod) return escolherMod(s,c.k); proximaEscolha(); }
function abrirNivel(){
  if(R.rerolagens==null) R.rerolagens=2+nivelLoja("oraculo");
  const sorteadas=cartasNivel();
  const cartas=sorteadas.map(c=>({ titulo:c.titulo, sprite:spriteSelo(c.s), raridade:c.raridade, texto:c.texto, classe:c.dourada?"dourada":null, acao:()=>aplicarCartaNivel(c) }));
  D.elos.forEach(e=>{ const a=ativos().find(s=>s.mon.id===e.a), b=ativos().find(s=>s.mon.id===e.b);
    if(a&&b&&!R.elos.includes(e.nome)&&(estBase(a)>=2||estBase(b)>=2)) cartas.push({titulo:`Elo: ${e.nome}`, raridade:"epico", texto:`${e.desc} (+20% de dano e cadência para os dois)`,
      acao:()=>{ R.elos.push(e.nome); tremor(4); calcularSinergia(); proximaEscolha(); }}); });
  const ct=cartaTalisma(); if(ct) cartas.push(ct); const cl=cartaLenda(); if(cl) cartas.push(cl);
  if(cartas.some(c=>c.raridade==="lendario")) som("ding");
  // ritmo: em nível ímpar sem carta especial, a melhor carta entra sozinha (metade das interrupções; a força da equipe é a mesma)
  const RANK={comum:0,incomum:1,raro:2,epico:3,lendario:4}, especial=false;
  if(J.nivel%2===1&&!especial&&sorteadas.length&&!(META.escolhaManual)){ const c=cartas.slice(0,sorteadas.length).sort((a,b)=>(b.classe==="dourada")-(a.classe==="dourada")||(RANK[b.raridade]||0)-(RANK[a.raridade]||0))[0];
    if(!SIM.ativo) texto(J.jogador.x,J.jogador.y-30,`Nível ${J.nivel}: ${c.titulo}`,"#ffe6a6",13); c.acao(); return; }
  mostrarCartas(`Nível ${J.nivel}`, "Escolha uma carta.", cartas, {revelar:true});
  if(R.rerolagens>0){ const b=document.createElement("button"); b.className="botao sec"; b.textContent=`Sortear de novo (${R.rerolagens})`; b.onclick=()=>{ R.rerolagens--; som("tic"); abrirNivel(); }; $("cartasRodape").appendChild(b); }
}
function abrirPoderes(s){
  const c=D.classes[L(s).classe], e=est(s);
  const item=(k,nome,desc,lib)=>{ const lv=s.pod[k], max=lv>=5;
    const modTxt=k!=="b"&&s.mod[k]!=null?` · ${c[k].mods[s.mod[k]].split(":")[0]}`:"";
    return { titulo:`${nome} ${lv?`${lv} → ${lv+1}`:"(aprender)"}${modTxt}`, desab:!lib||max, raridade:lv>=2?"raro":"incomum",
      texto: !lib? "Liberada quando virar Jovem." : max? "Nível máximo." : desc + (k!=="b"&&lv===2?" No próximo nível você escolhe um modificador.":""),
      acao:()=>{ s.pod[k]++; aplicarNivel(s,1); if(k!=="b"&&s.pod[k]===3&&s.mod[k]==null) return escolherMod(s,k); proximaEscolha(); } }; };
  mostrarCartas(nomeForma(s), `Nível ${s.nivel} → ${s.nivel+1}. Escolha qual poder evolui.`, [
    item("b","Ataque básico", `${c.basico} +20% de dano e +5% de cadência.`, true),
    item("h1",c.h1.nome, c.h1.desc, true),
    item("h2",c.h2.nome, c.h2.desc, e>=1||estBase(s)>=1),
    ...(s.pod.b>=5&&s.pod.h1>=5&&s.pod.h2>=5? [{titulo:"Ascensão", raridade:"lendario", texto:"Todos os poderes no máximo: +1 nível (+6% em todos os atributos).", acao:()=>{ aplicarNivel(s,1); proximaEscolha(); }}] : []),
    {titulo:"Voltar", texto:"Escolher outro monstro.", manter:true, acao:()=>abrirNivel()} ]);
}
function escolherMod(s,k){ const c=D.classes[L(s).classe][k];
  mostrarCartas(`${c.nome}: modificador`, "Escolha como esta habilidade vai funcionar daqui pra frente.",
    c.mods.map((m,i)=>({titulo:m.split(":")[0], texto:m.split(":").slice(1).join(":").trim(), raridade:"epico", acao:()=>{ s.mod[k]=i; proximaEscolha(); }}))); }

// ================================================================ ovos, filhotes, reserva, troca
function sortearRaridade(){ const r=Math.random(), o=D.ovos.raridades; const bonus=Math.min(0.15,R.profundidade*0.01);
  return r<o.lendario.chance+bonus*0.3?"lendario": r<o.lendario.chance+o.raro.chance+bonus?"raro":"comum"; }
function receberMonstro(mon,origem){
  const vazio=R.selos.find(s=>!s.mon);
  if(vazio){ const outros=ativos(); vazio.nivel=Math.max(vazio.nivel, Math.round((outros.reduce((t,s)=>t+s.nivel,0)/Math.max(1,outros.length))*0.6)||1);
    vazio.mon=mon; if(J){ vazio.x=J.jogador.x; vazio.y=J.jogador.y; vazio.cd=0; vazio.cd1=2; vazio.cd2=4; efeitoInvocacao(vazio); }
    toast(`${LINHA[mon.id].filhote} (${RAR_NOME[mon.rar]}) entrou na equipe!${origem?`<br><small>${origem}</small>`:""}`);
    if(vazio.mon.ramo==null&&vazio.nivel>=NIV[2]) filaRamo.push(vazio); }
  else { R.reserva.push(mon); toast(`${LINHA[mon.id].filhote} (${RAR_NOME[mon.rar]}) foi para a reserva.${origem?`<br><small>${origem}</small>`:""}<br><small>Toque num retrato para trocar.</small>`); }
  if(!META.liberados.includes(mon.id)) META.liberados.push(mon.id); registrarDex(mon.id,0,null,mon.rar);
  calcularSinergia(); desenharEquipe();
  if(filaRamo.length&&!pausado) proximaEscolha();
}
function efeitoInvocacao(s){ if(!J) return; const cor=COR[elementoDe(s)]; anel(s.x,s.y,10,"#ffffff",.4); anel(s.x,s.y,36,cor,.7); particulas(s.x,s.y,cor,26,110,2); tremor(3); }
function spawnOvo(rar,id,x,y){ const pool=poolPacto(); id=id||escolha(pool); rar=rar||sortearRaridade();
  const a=Math.random()*Math.PI*2, d=rnd(55,95); J.ovosMapa.push({x:x??J.jogador.x+Math.cos(a)*d, y:y??J.jogador.y+Math.sin(a)*d, id, rar, vida:35}); }
function spawnFilhote(){ const id=escolha(poolPacto()), a=Math.random()*Math.PI*2, d=rnd(60,90);
  J.selvagens.push({x:J.jogador.x+Math.cos(a)*d, y:J.jogador.y+Math.sin(a)*d, id, rar:Math.random()<0.2?"incomum":"comum", vida:25}); if(!R.avisoFilhote){ R.avisoFilhote=true; toast("Um filhote selvagem apareceu! Encoste nele para capturar."); } else texto(J.selvagens[J.selvagens.length-1].x,J.selvagens[J.selvagens.length-1].y-14,"Filhote!","#fff3c4",12); }
function pegarOvo(o){
  if(R.ninho.length>=D.ovos.ninho_max){ ganharXp(10); texto(o.x,o.y-8,"Ninho cheio: +XP","#9fd6d0",13); return; }
  R.ninho.push({id:o.id, rar:o.rar, prog:0, alvo:D.ovos.raridades[o.rar].xp}); R.st.ovos++; particulas(o.x,o.y,"#fff3c4",12,70); anel(o.x,o.y,14,"#fff3c4",.4);
  texto(o.x,o.y-10,`Ovo ${RAR_NOME[o.rar]}!`,o.rar==="lendario"?"#ffd34a":"#fff3c4",15); desenharNinho();
}
// ================================================================ Ovo Ancestral (Dragões lendários do Covil)
function surgirOvoAncestral(){ const opts=D.ancestrais.filter(a=>R.pacto.includes(a.elemento)); if(!opts.length) return;
  const a=escolha(opts), ang=Math.random()*Math.PI*2, d=rnd(200,260);
  J.ovoAnc={x:J.jogador.x+Math.cos(ang)*d, y:J.jogador.y+Math.sin(ang)*d, id:a.id, el:a.elemento}; R.ancestral={estado:"mapa", id:a.id, el:a.elemento};
  toast(`Um <b>${a.ovo}</b> apareceu no mapa!<br><small>Siga a coluna de luz.</small>`); }
function pegarOvoAncestral(o){ const l=LINHA[o.id];
  R.ancestral={estado:"chocando", id:o.id, el:o.el, prog:0, alvo:D.ancestral_regras.chocar_seg}; R.st.ovoAncestral=(R.st.ovoAncestral||0)+1;
  particulas(o.x,o.y,COR[o.el],40,140,2); anel(o.x,o.y,40,COR[o.el],.5); tremor(5);
  toast(`Você pegou o <b>${l.ovo}</b>!<br><small>Ele choca com o tempo de jogo, e mais rápido a cada abate.</small>`); desenharNinho(); }
function checarAncestral(){ const A=R.ancestral; if(!A||A.estado!=="chocando"||A.prog<A.alvo) return;
  A.estado="chocado"; const l=LINHA[A.id]; R.st.dragaoChocado=1;
  if(J){ particulas(J.jogador.x,J.jogador.y,COR[A.el],80,180,2); anel(J.jogador.x,J.jogador.y,90,COR[A.el],.6); tremor(10); parar(0.15); }
  receberMonstro({id:A.id, rar:"lendario", ramo:null}, `O ${l.ovo} chocou! Um Dragão Ancestral foi liberado.`); desenharNinho(); }
function chocar(ov){ R.st.chocados++; diaria("chocados"); const mon={id:ov.id, rar:ov.rar==="raro"?"raro":ov.rar, ramo:null}; cenaChoco(mon);
  particulas(J.jogador.x,J.jogador.y,"#fff3c4",30,120,2); anel(J.jogador.x,J.jogador.y,30,COR[LINHA[ov.id].elemento],.7); tremor(4);
  receberMonstro(mon,"Chocou no Ninho"); }
function abrirEquipe(seloIdx){
  if(!J||J.fim) return;
  const s=R.selos[seloIdx];
  const cartas=R.reserva.map((m,i)=>({ titulo:`${LINHA[m.id].filhote} (${RAR_NOME[m.rar]})`, sprite:spriteLinha(m.id,m.rar), raridade:m.rar,
    texto:`${NOME_EL(LINHA[m.id].elemento)} · ${D.classes[LINHA[m.id].classe].nome} · ${D.linhagens[LINHA[m.id].linhagem].nome}<br>No Selo ${seloIdx+1} entra no nível ${s.mon?s.nivel:"novo"}${m.ramo!=null?`, forma ${LINHA[m.id].ramos[m.ramo].nome}`:""}.`,
    desab:s.trocaCd>0, acao:()=>{ trocar(seloIdx,i); proximaEscolha(); } }));
  const sub = s.mon? `Selo ${seloIdx+1}: ${nomeForma(s)}, nível ${s.nivel}. ${resumoPoderes(s)}<br>Quem entra no lugar mantém nível, poderes e modificadores do Selo.${s.trocaCd>0?` Recarga: ${Math.ceil(s.trocaCd)} s.`:""}`
                    : `Selo ${seloIdx+1} vazio.`;
  cartas.push({titulo:"Fechar", texto:"", acao:()=>proximaEscolha()});
  mostrarCartas("Equipe e reserva", sub + (R.reserva.length?"":"<br>A reserva está vazia. Choque ovos e capture filhotes para ter opções."), cartas);
}
function trocar(si,ri){
  R.st.trocas++; const s=R.selos[si], novo=R.reserva.splice(ri,1)[0];
  if(s.mon){ R.reserva.push({...s.mon}); } else { const outros=ativos(); s.nivel=Math.max(1,Math.round((outros.reduce((t,o)=>t+o.nivel,0)/Math.max(1,outros.length))*0.6)); }
  s.mon=novo; s.tmpRamo=null; s.trocaCd=J&&R.mapaNaEra!==0?15:0; s.x=J.jogador.x; s.y=J.jogador.y;
  efeitoInvocacao(s); s.cdEsp=Math.max(s.cdEsp||0,8);
  // entrada em cena: quem entra chega com um golpe em área do seu elemento (troca vira jogada, não só arrumação)
  if(J&&!J.fim){ const el=elementoDe(s), dano=atrib(s).dano*6; FONTE="habilidade"; J.inimigos.forEach(e=>{ if(e.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<55) ferir(e,dano,el); });
    vfxOnda({x:s.x,y:s.y},el,55); luzFlash(s.x,s.y,COR[el],80,0.4); tremor(4); if(!SIM.ativo) texto(s.x,s.y-24,"Entrou em cena!",COR[el],14); } if(s.mon.ramo==null&&s.nivel>=NIV[2]&&!filaRamo.includes(s)) filaRamo.push(s); if(s.esp==null&&s.nivel>=NIV[1]&&!filaEsp.includes(s)) filaEsp.push(s);
  calcularSinergia(); desenharEquipe();
}
function abrirBolsa(){
  if(!J||J.fim||pausado) return;
  const ks=Object.keys(D.itens);
  const cartas=ks.map(k=>({ titulo:`${D.itens[k].nome} ×${R.itens[k]}`, texto:D.itens[k].efeito, desab:R.itens[k]<=0, raridade:k==="chamado"?"lendario":k==="incenso"?"raro":"incomum", acao:()=>usarItem(k) }));
  cartas.push({titulo:"Fechar", acao:()=>proximaEscolha()});
  mostrarCartas("Bolsa", "Itens caem de elites, baús de mini-chefe e chefes.", cartas);
}
function usarItem(k){
  R.itens[k]--; R.st.itens++;
  if(k==="incenso"){ const id=escolha(poolPacto()); receberMonstro({id, rar:"raro", ramo:null}, "Invocado com Incenso"); particulas(J.jogador.x,J.jogador.y,"#c4ccd8",30,120,2); return proximaEscolha(); }
  if(k==="chamado"){ const id=escolha(poolPacto()); receberMonstro({id, rar:"lendario", ramo:null}, "Atendeu ao Chamado Lendário"); anel(J.jogador.x,J.jogador.y,80,"#ffd34a",.9); tremor(8); return proximaEscolha(); }
  if(k==="pedra"){ R.pedraAtiva=true; toast("Pedra Ancestral ativa: a próxima evolução para Adulto libera os três caminhos."); return proximaEscolha(); }
  if(k==="pena"){ R.selos.forEach(s=>s.trocaCd=0); toast("Trocas liberadas."); return proximaEscolha(); }
  if(k==="doce"){ mostrarCartas("Mel Ancestral","Qual Selo ganha +1 nível?", ativos().map(s=>({titulo:nomeForma(s), sprite:spriteSelo(s), texto:`Nível ${s.nivel} → ${s.nivel+1}`, acao:()=>{ aplicarNivel(s,1); proximaEscolha(); }}))); }
}

// ================================================================ missões do dia: 3 objetivos sorteados pela data, Essência por missão e sequência de dias
const TIPOS_DIARIA={abates:{txt:n=>`Derrote ${n} inimigos`,alvos:[300,500,800]}, capturas:{txt:n=>`Capture ${n} filhotes selvagens`,alvos:[2,3,5]}, chocados:{txt:n=>`Choque ${n} ovos`,alvos:[2,3,4]},
  evolucoes:{txt:n=>`Evolua ${n} monstros para Adulto`,alvos:[1,2,3]}, reacoes:{txt:n=>`Provoque ${n} reações elementais`,alvos:[30,60,100]}, chefes:{txt:n=>`Derrote ${n} chefes`,alvos:[1,2,3]}, eventos:{txt:n=>`Complete ${n} eventos do mapa`,alvos:[2,3,5]}};
function hojeStr(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function diarias(){ const hoje=hojeStr(); let D2=META.diarias; if(!D2||D2.dia!==hoje){ const r=semente("diaria"+hoje), tipos=Object.keys(TIPOS_DIARIA), lista=[];
    while(lista.length<3){ const t=tipos[Math.floor(r()*tipos.length)]; if(lista.some(x=>x.t===t)) continue; const al=TIPOS_DIARIA[t].alvos; lista.push({t,alvo:al[Math.floor(r()*al.length)],prog:0,feito:false}); }
    const ontem=new Date(Date.now()-864e5), ontemStr=ontem.getFullYear()+"-"+String(ontem.getMonth()+1).padStart(2,"0")+"-"+String(ontem.getDate()).padStart(2,"0");
    const seq=D2&&D2.ultimoDiaFeito&&(D2.ultimoDiaFeito===ontemStr||D2.ultimoDiaFeito===hoje)? (D2.seq||0) : 0;
    D2=META.diarias={dia:hoje,lista,seq,ultimoDiaFeito:D2&&D2.ultimoDiaFeito}; } return D2; }
function diaria(t,n){ if(SIM.ativo||!R||R.teste) return; const D2=diarias(); let mudou=false;
  for(const m of D2.lista){ if(m.t!==t||m.feito) continue; m.prog=Math.min(m.alvo,m.prog+(n||1)); mudou=true;
    if(m.prog>=m.alvo){ m.feito=true; META.essencia+=40; toast(`<b>Missão do dia completa!</b><br><small>${TIPOS_DIARIA[t].txt(m.alvo)} · +40 de Essência</small>`); som("ding");
      if(D2.lista.every(x=>x.feito)){ D2.seq=(D2.seq||0)+1; D2.ultimoDiaFeito=hojeStr(); const bonus=60+Math.min(7,D2.seq)*10; META.essencia+=bonus; setTimeout(()=>toast(`<b>As 3 missões de hoje!</b><br><small>+${bonus} de Essência · sequência de ${D2.seq} dia${D2.seq>1?"s":""}</small>`),2600); } } }
  if(mudou&&Math.random()<0.1) gravar(); }
function telaDiarias(){ $("telaMenu").classList.remove("ativa"); const D2=diarias(), feitas=D2.lista.filter(m=>m.feito).length;
  mostrarCartas("Missões do dia", `Renovam à meia-noite. Cada uma vale 40 de Essência; as três juntas dão um bônus que cresce com a sequência de dias (agora: ${D2.seq||0}).`,
    [...D2.lista.map(m=>({titulo:TIPOS_DIARIA[m.t].txt(m.alvo), raridade:m.feito?"lendario":"raro", manter:true, texto:m.feito?"Completa!":`${m.prog}/${m.alvo}<div class="prog-diaria"><b style="width:${m.prog/m.alvo*100}%"></b></div>`, acao:()=>{} })),
     {titulo:"Voltar",texto:feitas===3?"Volte amanhã para novas missões.":"",acao:()=>menu()}]); }
// ================================================================ Bestiário: cada forma descoberta (8 por linhagem) e cada raridade vista
// META.dex[id] = {f: bits das 8 formas (0 filhote, 1 jovem, 2-4 adultos, 5-7 supremos), r: raridades vistas}.
// A cada 10 formas novas, Essência de presente. Descobrir algo novo mostra "Novo no Bestiário!".
const FORMAS_TOTAL=()=>D.linhas.length*8;
function celulaForma(e,ramo){ return e<=1? e : e===2? 2+(ramo??0) : 5+(ramo??0); }
function registrarDex(id,e,ramo,rar){ if(SIM.ativo&&!SIM.dex) return; META.dex=META.dex||{}; const d=META.dex[id]||(META.dex[id]={f:0,r:[]}); const c=celulaForma(e,ramo); let novo=false;
  if(!(d.f&(1<<c))){ d.f|=1<<c; novo=true; } if(rar&&!d.r.includes(rar)){ d.r.push(rar); if(rar!=="comum") novo=true; }
  if(novo&&J&&!SIM.ativo){ const l=LINHA[id]; texto(J.jogador.x,J.jogador.y-38,"Novo no Bestiário!","#9fe0ff",14); som("ding"); }
  const tot=formasVistas(), marco=Math.floor(tot/10); META.dexMarco=META.dexMarco??marco;
  if(marco>META.dexMarco){ const ganho=(marco-META.dexMarco)*50; META.dexMarco=marco; META.essencia+=ganho; if(!SIM.ativo) toast(`<b>Bestiário: ${tot} formas descobertas!</b><br><small>+${ganho} de Essência</small>`); }
  if(!SIM.ativo) gravar(); }
function formasVistas(){ let n=0; for(const id in (META.dex||{})){ let f=META.dex[id].f; while(f){ n+=f&1; f>>=1; } } return n; }
function nomeFormaCel(l,c){ return c===0? l.filhote : c===1? l.jovem : c<5? l.ramos[c-2].nome : l.ramos[c-5].supremo; }
function telaBestiario(){ $("telaMenu").classList.remove("ativa"); const dex=META.dex||{}, tot=formasVistas(), prox=(Math.floor(tot/10)+1)*10;
  const cartas=D.linhas.map(l=>{ const d=dex[l.id], n=d? [...Array(8)].reduce((a,_,i)=>a+((d.f>>i)&1),0) : 0, conhecido=META.liberados.includes(l.id)||n>0;
    let melhor=0; if(d) for(let c=7;c>=0;c--) if(d.f&(1<<c)){ melhor=c; break; }
    const e=melhor<=1?melhor:melhor<5?2:3, ramo=melhor>=5?melhor-5:melhor>=2?melhor-2:null, spr=conhecido? (arteMonstro(l.id,e,ramo,"comum")||spriteLinha(l.id,"comum")) : null;
    return { titulo: conhecido? nomeFormaCel(l,melhor) : "???", raridade: n>=8?"lendario":n>=5?"epico":n>=2?"raro":"comum", sprite: spr? (conhecido&&n? spr : silhueta(spr,"#1a1426")) : gerarSprite("dex?",12,"#2a2238"),
      texto: conhecido? `<span style="color:${COR[l.elemento]}">${NOME_EL(l.elemento)}</span> · formas ${n}/8${d&&d.r.length>1?` · ${d.r.length} raridades`:""}` : "Ainda não encontrado", manter:true, acao:()=>telaDexLinha(l) }; });
  mostrarCartas("Bestiário", `Formas descobertas: <b>${tot}</b> de ${FORMAS_TOTAL()} · próxima recompensa em ${prox} (+50 de Essência). Evolua, capture e choque ovos para completar.`,
    [...cartas,{titulo:"Voltar",texto:"",acao:()=>menu()}],{grade:true,fundo:"ui__livro"}); }
function telaDexLinha(l){ const d=(META.dex||{})[l.id]||{f:0,r:[]};
  const formas=[...Array(8)].map((_,c)=>{ const e=c<=1?c:c<5?2:3, ramo=c>=5?c-5:c>=2?c-2:null, visto=!!(d.f&(1<<c)), spr=arteMonstro(l.id,e,ramo,"comum")||gerarSprite(l.id+"#"+e+"#"+(ramo??"-"),TAM[e],COR[l.elemento]);
    return { titulo: visto? nomeFormaCel(l,c) : "???", raridade: visto?(c>=5?"lendario":c>=2?"epico":"raro"):"comum", sprite: visto? spr : silhueta(spr,"#1a1426"),
      texto: ["Filhote","Jovem","Adulto","Adulto","Adulto","Supremo","Supremo","Supremo"][c]+(visto&&c>=2?` · ${NOME_EL(l.ramos[(c-2)%3].elemento)}`:""), manter:true, acao:()=>{} }; });
  mostrarCartas(l.filhote, `Raridades vistas: ${d.r.length? d.r.map(r=>RAR_NOME[r]).join(", ") : "nenhuma"}. Cada caminho de evolução leva a um Adulto e a um Supremo diferentes.`,
    [...formas,{titulo:"Voltar",texto:"",acao:()=>telaBestiario()}],{grade:true,fundo:"ui__livro"}); }

// ================================================================ captura com suspense e choco animado
// o filhote é selado num sigilo que balança três vezes; incomum e acima podem escapar (e fugir mais rápido; dá para tentar de novo)
function tentarCaptura(f){ if(f.selando) return; f.selando=true; const chance=f.rar==="comum"?1:f.rar==="incomum"?0.72:0.55, ok=Math.random()<chance, x0=f.x, y0=f.y, cor=COR[LINHA[f.id].elemento];
  f.vida=99; particulas(x0,y0,"#fff3c4",10,60); tremor(2);
  vfx({max:1.5,desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, t=q*1.5, enc=Math.min(1,t/0.3), bal=t>0.35&&t<1.25? Math.sin((t-0.35)/0.3*Math.PI)*Math.max(0,1-(t-0.35)/0.9)*0.45 : 0;
    lg.save(); lg.translate(x,y-4*(1-enc)); lg.rotate(bal); lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.5+0.3*Math.sin(t*20); lg.drawImage(bolhaCor(cor),-10,-10,20,20); lg.globalCompositeOperation="source-over"; lg.globalAlpha=1;
    // sigilo: disco dourado com runa do elemento
    lg.fillStyle="#3a2a12"; lg.beginPath(); lg.arc(0,0,4.6,0,Math.PI*2); lg.fill(); const g=lg.createRadialGradient(-1.4,-1.6,0.4,0,0,4.4); g.addColorStop(0,"#fff4c4"); g.addColorStop(0.6,"#e0b65a"); g.addColorStop(1,"#8a5a12");
    lg.fillStyle=g; lg.beginPath(); lg.arc(0,0,4,0,Math.PI*2); lg.fill(); lg.fillStyle=cor; lg.beginPath(); lg.arc(0,0,1.6,0,Math.PI*2); lg.fill(); lg.strokeStyle="#5a3a0a"; lg.lineWidth=0.4; lg.beginPath(); lg.moveTo(-4,0); lg.lineTo(4,0); lg.stroke();
    lg.restore(); }});
  agendar(1.3,()=>{ if(!J) return;
    if(ok){ f.vida=0; particulas(x0,y0,cor,22,90,2); particulas(x0,y0,"#ffe9a0",12,60); anel(x0,y0,22,"#ffd34a",.5); tremor(3); som("ding"); R.st.capturas++; diaria("capturas"); if(!SIM.ativo) texto(x0,y0-16,"Capturado!","#ffd34a",16);
      receberMonstro({id:f.id, rar:f.rar, ramo:null},"Capturado!"); }
    else { f.selando=false; f.vida=14; f.fugaRapida=1; f.imune=1; particulas(x0,y0,"#ffffff",14,80); tremor(2); if(!SIM.ativo) texto(x0,y0-14,"Escapou! Tente de novo","#ff9a7a",13); } }); }
// ovo chocando: treme cada vez mais, racha, clarão e o monstro aparece (a cena dura ~2,6 s; um toque pula)
function cenaChoco(mon){ if(SIM.ativo||!J) return; const l=LINHA[mon.id], cor=COR[l.elemento], ovo=spriteOvo(l.elemento,mon.rar==="lendario"?"lendario":mon.rar==="comum"||mon.rar==="incomum"?"comum":"raro");
  const q=quadrosForma(mon.id,0,null,mon.rar), novo=(q&&q[0])||spriteLinha(mon.id,mon.rar); let urlNovo=""; try{ urlNovo=(novo._src&&!novo._alvo? spriteUI(novo):novo).toDataURL(); }catch(e){}
  cenaTocar(`<div class="cine-raios" style="--cor:${cor}"></div><div class="cine-choco" style="--cor:${cor}"><img class="ovo" src="${ovo.toDataURL()}" alt=""><div class="racha"></div><img class="novo" src="${urlNovo}" alt=""></div><div class="cine-clarao choco"></div>
    <div class="cine-texto choco"><small>Chocou!${mon.rar!=="comum"?` · ${RAR_NOME[mon.rar]}`:""}</small><b style="color:${cor}">${l.filhote}</b><i>${NOME_EL(l.elemento)} · ${D.classes[l.classe].nome}</i></div>`, "evolucao choco", 2800); }
// ================================================================ cenas: evolução e chegada do chefe (o jogo para por um instante)
const CINE={ativa:false, fila:[]};
function cenaTocar(html,classe,dur,aoFim){ if(SIM.ativo) return; CINE.fila.push({html,classe,dur,aoFim}); if(!CINE.ativa) cenaProxima(); }
function cenaProxima(){ const c=CINE.fila.shift(); let el=$("cine"); if(!c){ CINE.ativa=false; if(el) el.className="cine"; return; }
  CINE.ativa=true; if(!el){ el=document.createElement("div"); el.id="cine"; $("jogo").appendChild(el); }
  el.className="cine "+c.classe; el.innerHTML=c.html; void el.offsetWidth; el.classList.add("vis");
  let feito=false; const fim=()=>{ if(feito) return; feito=true; el.classList.remove("vis"); if(c.aoFim) c.aoFim(); setTimeout(cenaProxima,220); };
  el.onclick=fim; setTimeout(fim,c.dur); }
function imgDe(spr){ const h=spriteUI(spr); try{ return h.toDataURL(); }catch(e){ return ""; } }
function cenaEvolucao(s,antes,depois){ if(SIM.ativo||!J) return;
  const q=(e,r)=>{ const f=quadrosForma(s.mon.id,e,r,s.mon.rar); return f&&f[0]; };
  const velho=q(antes,antes>=2?s.mon.ramo:null)||arteMonstro(s.mon.id,antes,s.mon.ramo,s.mon.rar)||gerarSprite(s.mon.id+"#"+antes+"#-",TAM[antes],COR[elementoDe(s)],{rar:s.mon.rar});
  const novo=q(depois,s.mon.ramo)||spriteSelo(s), cor=COR[elementoDe(s)], etapa=["Filhote","Jovem","Adulto","Supremo"][depois];
  const url=sp=>{ try{ return (sp._src&&!sp._alvo? spriteUI(sp) : sp).toDataURL(); }catch(e){ return ""; } };
  const faiscas=Array.from({length:18},(_,i)=>`<i style="--a:${i*20+Math.random()*12}deg;--d:${90+Math.random()*90}px;--t:${0.5+Math.random()*0.5}s"></i>`).join("");
  cenaTocar(`<div class="cine-raios" style="--cor:${cor}"></div><div class="cine-evo" style="--cor:${cor}"><div class="evo-aura"></div><img class="velho" src="${url(velho)}" alt=""><img class="novo" src="${url(novo)}" alt=""><div class="evo-faiscas">${faiscas}</div></div><div class="cine-clarao"></div>
    <div class="cine-texto"><small>Evoluiu para ${etapa}!</small><b style="color:${cor}">${nomeForma(s)}</b>${depois===3&&ramoObj(s)?`<i>${ramoObj(s).ultimate}</i>`:""}</div>`, "evolucao", 3600); som("ding"); }
function cenaChefe(e,nome,guardiao){ if(SIM.ativo) return; const u=UNIV[R.universo], spr=arteCriatura(e,"parado",0), cor=COR[e.el]||"#ff5a4a";
  cenaTocar(`<div class="cine-faixa" style="--cor:${cor}"></div><div class="cine-chefe">${spr?`<img src="${imgDe(spr)}" alt="">`:""}</div>
    <div class="cine-texto chefe"><small>${guardiao?"Guardião da Era":"Chefe"} · ${u?u.nome.split(",")[0]:""}</small><b>${nome}</b><i>Inimigo de ${NOME_EL(e.el)}. ${dicaVantagem(e.el)}</i></div>`, "chefe", 2600); }

// ================================================================ moedas, baús e a roleta de prêmios
function soltarMoedas(x,y,n){ if(!J||n<=0) return; J.moedas=J.moedas||[]; for(let i=0;i<n;i++){ if(J.moedas.length>120) break; const a=Math.random()*Math.PI*2, v=rnd(30,80);
  J.moedas.push({x,y,z:4,vx:Math.cos(a)*v,vy:Math.sin(a)*v*0.6,vz:rnd(50,95),f:Math.random()*6,v:1,t:0}); } }
function soltarBau(x,y,tipo){ if(!J) return; J.baus=J.baus||[]; if(J.baus.length>=4) return; J.baus.push({x,y,tipo,t:0}); texto(x,y-18,tipo==="ouro"?"Baú dourado!":"Baú!","#ffd34a",15); luzFlash(x,y,"#ffd34a",60,0.6); som("bau"); }
function atualizarMoedasBaus(dt,ima){ const P=J.jogador;
  if(J.moedas){ for(const m of J.moedas){ m.t+=dt; if(m.z>0||m.vz>0){ m.vz-=260*dt; m.z=Math.max(0,m.z+m.vz*dt); if(m.z===0&&m.vz<0){ m.vz=Math.abs(m.vz)>40? -m.vz*0.35 : 0; } }
      m.x+=m.vx*dt; m.y+=m.vy*dt; m.vx*=0.9; m.vy*=0.9; const d=Math.hypot(P.x-m.x,P.y-m.y);
      if(m.t>0.45&&(d<ima*1.3||J.fim)){ const k=Math.min(1,dt*9); m.x+=(P.x-m.x)*k; m.y+=(P.y-m.y)*k; }
      if(m.t>0.45&&d<7){ m.pega=true; R.essenciaRun+=m.v; som("moeda"); particulas(m.x,m.y,"#ffd34a",3,40); } }
    J.moedas=J.moedas.filter(m=>!m.pega&&m.t<30); }
  if(J.baus){ for(const b of J.baus){ b.t+=dt; if(!J.fim&&Math.hypot(P.x-b.x,P.y-b.y)<11){ b.aberto=true; abrirBau(b); break; } } J.baus=J.baus.filter(b=>!b.aberto); } }
// baú desenhado em vetor (prata ou ouro), com feixe de luz e brilhos
function desenharBauMapa(b,x,y){ const ouro=b.tipo==="ouro", bob=Math.sin(J.t*3+b.x)*1, pul=0.5+0.5*Math.sin(J.t*5);
  lg.globalCompositeOperation="lighter"; const gr=lg.createLinearGradient(0,y-60,0,y); gr.addColorStop(0,"rgba(255,211,74,0)"); gr.addColorStop(1,`rgba(255,211,74,${0.25+0.15*pul})`); lg.fillStyle=gr; lg.fillRect(x-5,y-60,10,60);
  lg.globalAlpha=0.5+0.3*pul; lg.drawImage(bolhaCor(ouro?"#ffd34a":"#bfe6ff"),x-14,y-14,28,28); lg.globalAlpha=1; lg.globalCompositeOperation="source-over";
  lg.fillStyle="rgba(0,0,0,.35)"; lg.beginPath(); lg.ellipse(x,y+5,8,2.4,0,0,Math.PI*2); lg.fill();
  const yy=y+bob, corpo=ouro?"#7a3a7a":"#6a3a1c", aro=ouro?"#ffd34a":"#d8dde8";
  lg.fillStyle=corpo; lg.fillRect(x-7,yy-5,14,9); lg.fillStyle=tom(corpo,1.25); lg.beginPath(); lg.moveTo(x-7.5,yy-5); lg.quadraticCurveTo(x,yy-12,x+7.5,yy-5); lg.closePath(); lg.fill();
  lg.strokeStyle=aro; lg.lineWidth=1; lg.strokeRect(x-7,yy-5,14,9); lg.beginPath(); lg.moveTo(x-7.5,yy-5); lg.quadraticCurveTo(x,yy-12,x+7.5,yy-5); lg.stroke(); lg.beginPath(); lg.moveTo(x-7,yy-1); lg.lineTo(x+7,yy-1); lg.stroke();
  lg.fillStyle=aro; lg.fillRect(x-1.5,yy-4,3,4); lg.fillStyle="#fff8e0"; lg.beginPath(); lg.arc(x,yy-2.2,0.7,0,Math.PI*2); lg.fill();
  if(Math.floor(J.t*6+b.x)%7===0){ lg.globalCompositeOperation="lighter"; lg.fillStyle="#ffffff"; lg.beginPath(); lg.arc(x+rnd(-8,8),yy-rnd(2,12),0.8,0,Math.PI*2); lg.fill(); lg.globalCompositeOperation="source-over"; } }
function desenharMoedasBaus(ox,oy){
  for(const b of (J.baus||[])) desenharBauMapa(b,b.x-ox,b.y-oy);
  for(const m of (J.moedas||[])){ const x=m.x-ox, y=m.y-oy-m.z; if(x<-6||y<-6||x>VW+6||y>VH+6) continue; const w=Math.max(0.4,Math.abs(Math.cos(J.t*7+m.f)))*2.2;
    lg.fillStyle="rgba(0,0,0,.3)"; lg.beginPath(); lg.ellipse(m.x-ox,m.y-oy+1.5,1.8,0.6,0,0,Math.PI*2); lg.fill();
    lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.45; lg.drawImage(bolhaCor("#ffcc40"),x-6,y-6,12,12); lg.globalAlpha=1; lg.globalCompositeOperation="source-over";
    lg.fillStyle="#b8860b"; lg.beginPath(); lg.ellipse(x,y,w,2.2,0,0,Math.PI*2); lg.fill(); lg.fillStyle="#ffd34a"; lg.beginPath(); lg.ellipse(x,y,w*0.75,1.7,0,0,Math.PI*2); lg.fill();
    lg.fillStyle="#fff8d0"; lg.beginPath(); lg.ellipse(x-w*0.25,y-0.6,w*0.25,0.5,0,0,Math.PI*2); lg.fill(); } }
// ---- prêmios
const ICONE_HUD={estrela:7,gema:6,coracao:8,ampulheta:4,bolsa:0,trofeu:10,fogo:5,livro:11,mapa:3};
let ICONES_URL=null;
function iconeHud(nome){ const img=UI_ARQ("ui__hud_icones"); if(!img) return null; if(!ICONES_URL){ ICONES_URL={}; const cw=img.width/6, ch=img.height/2;
    for(const [k,i] of Object.entries(ICONE_HUD)){ const c=document.createElement("canvas"); c.width=cw; c.height=ch; c.getContext("2d").drawImage(img,(i%6)*cw,Math.floor(i/6)*ch,cw,ch,0,0,cw,ch); ICONES_URL[k]=c.toDataURL(); } }
  return ICONES_URL[nome]; }
function sortearPremios(tipo){ const sorte=(SIN.rm&&SIN.rm.talisma?1.5:1), r=Math.random(), ouro=tipo==="ouro";
  const n= ouro? (r<0.22*sorte?5:3) : (r<0.04*sorte?5: r<0.28*sorte?3:1);
  const eq=ativos(), tals=Object.keys(R.talismas||{}).filter(id=>nivTal(id)<5), ess=Math.round((6+R.profundidade*3)*(ouro?2:1));
  const pool=[
    {peso:30, f:()=>{ const s=escolha(eq); return {icone:"estrela", rar:"raro", texto:`${nomeForma(s)}: +1 nível`, aplicar:()=>premioNivel(s)}; }},
    {peso:26, f:()=>({icone:"gema", rar:"incomum", texto:`+${ess} de Essência`, aplicar:()=>{ R.essenciaRun+=ess; }})},
    {peso:12, f:()=>({icone:"coracao", rar:"incomum", texto:"Cura de 35%", aplicar:()=>curar(J.vidaMax*0.35)})},
    {peso:10, f:()=>({icone:"ampulheta", rar:"comum", texto:"Puxa todos os cristais", aplicar:()=>J.gemas.forEach(g=>g.puxar=true)})},
    {peso:10, f:()=>{ const k=itemUtil(["incenso","doce","pena","pedra","chamado"]); return {icone:"bolsa", rar:"incomum", texto:D.itens[k].nome, aplicar:()=>{ R.itens[k]++; }}; }},
    ...(tals.length? [{peso:7, f:()=>{ const id=escolha(tals); return {icone:"trofeu", rar:"epico", texto:`Talismã: ${PD().talismas[id].nome} +1`, aplicar:()=>{ R.talismas[id]=(R.talismas[id]||0)+1; calcularSinergia(); }}; }}] : []),
    {peso:5, f:()=>({icone:"fogo", rar:"epico", texto:"Despertar carregado", aplicar:()=>{ J.ult=100; }})},
    ...(R.ninho.length<D.ovos.ninho_max? [{peso:4, f:()=>({icone:"livro", rar:"lendario", texto:"Ovo Raro", aplicar:()=>{ R.ninho.push({id:escolha(poolPacto()),rar:"raro",prog:0,alvo:D.ovos.raridades.raro.xp}); desenharNinho(); }})}] : [])];
  const tot=pool.reduce((t,p)=>t+p.peso,0), out=[];
  for(let i=0;i<n;i++){ let x=Math.random()*tot; const p=pool.find(p=>(x-=p.peso)<=0)||pool[0]; out.push(p.f()); }
  if(n===5){ out[4]={icone:"estrela", rar:"lendario", texto:`JACKPOT: toda a equipe +1 nível`, aplicar:()=>eq.forEach(premioNivel)}; }
  return out; }
function premioNivel(s){ if(!s||!s.mon) return; const lib=["b","h1",...((est(s)>=1||estBase(s)>=1)?["h2"]:[])].filter(k=>s.pod[k]<5);
  if(lib.length){ const k=lib.sort((a,b)=>s.pod[a]-s.pod[b])[0]; s.pod[k]++; if(k!=="b"&&s.pod[k]===3&&s.mod[k]==null) s.mod[k]=Math.floor(Math.random()*2); }
  aplicarNivel(s,1); calcularSinergia(); desenharEquipe(); }
// tela do baú: o baú treme, abre com moedas voando e as casas giram como uma roleta até parar uma por uma
// baú desenhado: madeira com veios em degradê, cintas de metal com rebites, cantoneiras e fechadura (dourado no baú de ouro),
// tampa curva separada (abre girando) e brilho de dentro que aparece quando ela levanta
function svgBau(ouro){ const m=ouro?["#fff0a8","#e0a830","#8a5a10"]:["#eef2f8","#a8b0c0","#5a6070"], mad=ouro?["#7a2e6a","#4e1a46","#2e0c2a"]:["#9a5a2a","#6a3818","#3e1e0c"];
  const reb=(x,y)=>`<circle cx="${x}" cy="${y}" r="1.6" fill="url(#bm)" stroke="${m[2]}" stroke-width=".5"/>`;
  return `<svg viewBox="0 0 120 100" aria-hidden="true"><defs>
    <linearGradient id="bw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mad[0]}"/><stop offset=".55" stop-color="${mad[1]}"/><stop offset="1" stop-color="${mad[2]}"/></linearGradient>
    <linearGradient id="bt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mad[0]}"/><stop offset="1" stop-color="${mad[1]}"/></linearGradient>
    <linearGradient id="bm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m[0]}"/><stop offset=".5" stop-color="${m[1]}"/><stop offset="1" stop-color="${m[2]}"/></linearGradient>
    <radialGradient id="bl" cx=".5" cy=".9" r=".7"><stop offset="0" stop-color="#fffbe0"/><stop offset=".4" stop-color="${ouro?"#ffd34a":"#ffe9a0"}" stop-opacity=".9"/><stop offset="1" stop-color="#ffd34a" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="60" cy="95" rx="52" ry="5" fill="rgba(0,0,0,.45)"/>
    <ellipse class="brilho-interno" cx="60" cy="44" rx="48" ry="26" fill="url(#bl)"/>
    <g class="corpo"><rect x="10" y="48" width="100" height="44" rx="4" fill="url(#bw)" stroke="#1a0c06" stroke-width="2"/>
      <path d="M12 60H108M12 74H108" stroke="#1a0c06" stroke-opacity=".45" stroke-width="1"/><path d="M14 54q20 2 40 0M64 66q22 2 42 0M16 82q24 2 46 0" stroke="#fff" stroke-opacity=".08" stroke-width="1" fill="none"/>
      <rect x="22" y="48" width="9" height="44" fill="url(#bm)" stroke="${m[2]}" stroke-width=".8"/><rect x="89" y="48" width="9" height="44" fill="url(#bm)" stroke="${m[2]}" stroke-width=".8"/>
      ${reb(26.5,53)}${reb(26.5,70)}${reb(26.5,87)}${reb(93.5,53)}${reb(93.5,70)}${reb(93.5,87)}
      <path d="M10 82v10h12v-3h-9v-7zM110 82v10H98v-3h9v-7z" fill="url(#bm)" stroke="${m[2]}" stroke-width=".6"/>
      <rect x="50" y="52" width="20" height="22" rx="3" fill="url(#bm)" stroke="${m[2]}" stroke-width="1"/><path d="M60 58a3 3 0 0 1 1.6 5.5l1 5h-5.2l1-5A3 3 0 0 1 60 58z" fill="#1a0c06"/></g>
    <g class="tampa"><path d="M10 48V40Q10 20 60 18Q110 20 110 40V48Z" fill="url(#bt)" stroke="#1a0c06" stroke-width="2"/>
      <path d="M14 34Q60 22 106 34" stroke="#fff" stroke-opacity=".12" stroke-width="2" fill="none"/>
      <path d="M22 48V30Q22 23 31 22V48z" fill="url(#bm)" stroke="${m[2]}" stroke-width=".8"/><path d="M98 48V30Q98 23 89 22V48z" fill="url(#bm)" stroke="${m[2]}" stroke-width=".8"/>
      <rect x="8" y="44" width="104" height="6" rx="2" fill="url(#bm)" stroke="${m[2]}" stroke-width=".8"/>${reb(26.5,30)}${reb(93.5,30)}
      <path d="M53 44h14v8a7 7 0 0 1-14 0z" fill="url(#bm)" stroke="${m[2]}" stroke-width="1"/>${ouro?`<circle cx="60" cy="33" r="5" fill="#d84aff" stroke="${m[0]}" stroke-width="1.5"/><circle cx="58.5" cy="31.5" r="1.4" fill="#fff" opacity=".8"/>`:""}</g></svg>`; }
function abrirBau(b){ const premios=sortearPremios(b.tipo);
  if(SIM.ativo){ premios.forEach(p=>p.aplicar()); return; }
  pausado=true; som("bau"); let tela=$("bau"); if(!tela){ tela=document.createElement("div"); tela.id="bau"; $("jogo").appendChild(tela); }
  const ouro=b.tipo==="ouro";
  tela.className="bau-tela"+(ouro?" ouro":""); tela.innerHTML=`<div class="bau-raios"></div><div class="bau-titulo">${ouro?"Baú dourado":"Baú"}</div>
    <div class="bau-arca">${svgBau(ouro)}</div>
    <div class="bau-casas">${premios.map(()=>`<div class="casa"><img alt=""><span></span></div>`).join("")}</div><button class="botao bau-coletar">Coletar</button>`;
  const casas=[...tela.querySelectorAll(".casa")], todos=["estrela","gema","coracao","ampulheta","bolsa","trofeu","fogo","livro"];
  const mostrar=(c,p)=>{ const u=iconeHud(p.icone); const im=c.querySelector("img"); if(u) im.src=u; else im.removeAttribute("src"); c.querySelector("span").textContent=p.texto; };
  tela.classList.add("vis");
  setTimeout(()=>{ tela.classList.add("aberto"); som("abrir"); chuvaMoedas(tela,ouro?40:22); }, 900);
  casas.forEach((c,i)=>{ let atraso=60; const fim=1500+i*480+(premios.length===5&&i===4?600:0), t0=performance.now();
    const girar=()=>{ if(!tela.isConnected) return; const passou=performance.now()-t0;
      if(passou>=fim){ mostrar(c,premios[i]); c.classList.add("parou","r-"+premios[i].rar); som(premios[i].rar==="lendario"?"jackpot":"ding"); tela.classList.remove("treme"); void tela.offsetWidth; tela.classList.add("treme"); chuvaMoedas(c,6);
        if(i===casas.length-1) setTimeout(()=>{ const tt=tela.querySelector(".bau-titulo"); if(!tt) return; if(premios.length===5){ tt.textContent="JACKPOT!"; tt.classList.add("jackpot"); chuvaMoedas(tela,60); } else tt.textContent=premios.length===3?"Prêmio triplo!":"Prêmio!"; tela.classList.add("pronto"); },250);
        return; }
      if(passou>900){ mostrar(c,{icone:escolha(todos),texto:""}); som("tic"); c.classList.toggle("pisca"); }
      atraso=Math.min(240,atraso*(passou>fim-700?1.18:1.04)); setTimeout(girar,atraso); };
    setTimeout(girar,60); });
  tela.querySelector(".bau-coletar").onclick=()=>{ if(!tela.classList.contains("pronto")) return; premios.forEach(p=>p.aplicar()); tela.classList.remove("vis"); setTimeout(()=>{ tela.innerHTML=""; },250);
    pausado=false; som("moeda"); if(filaRamo.length||filaEsp.length||(J&&J.niveisPend>0)) proximaEscolha(); };
}
function chuvaMoedas(el,n){ for(let i=0;i<n;i++){ const m=document.createElement("i"); m.className="moeda-voa"; m.style.setProperty("--x",(Math.random()*2-1)*160+"px"); m.style.setProperty("--y",-(80+Math.random()*160)+"px");
    m.style.setProperty("--d",(0.8+Math.random()*0.7)+"s"); m.style.setProperty("--r",(Math.random()*720-360)+"deg"); m.style.animationDelay=(Math.random()*0.25)+"s"; el.appendChild(m); setTimeout(()=>m.remove(),1800); } }

// ================================================================ fim de mapa, portais, derrota
function vencerChefe(e){ diaria("chefes");
  eventosVitoria(e);
  J.escuroFixo=0; J.escuroAlvo=0; J.perigos=[]; e.puxao=false;
  R.xp=J.xp; R.nivel=J.nivel;
  R.st.mapas.push({mapa:R.profundidade+1, universo:R.universo, ttkChefe:+(J.t-J.tChefe).toFixed(1), vida:+(J.vida/J.vidaMax).toFixed(2), nivel:J.nivel, dps:Math.round(ativos().reduce((t,s)=>{const a=atrib(s); return t+a.dano*a.cad;},0)), hpInimigo:+(DIF.hp*dificuldade()).toFixed(1), estagios:ativos().map(s=>estBase(s)), rar:ativos().map(s=>s.mon.rar[0]), combo:J.comboMax, selos:ativos().map(s=>s.nivel)});
  J.fim=true; J.lento=1.2; tremor(14); parar(0.25); R.chefesVencidos++; R.profundidade++; R.vidaFrac=Math.max(0.05,J.vida/J.vidaMax);
  J.flash={vida:.6,cor:"#ffffff"};
  J.inimigos.forEach(o=>{ if(o!==e&&o.hp>0){ o.hp=0; morrer(o); } });
  const u=UNIV[R.universo], doUniverso=D.linhas.filter(l=>l.universo===u.id).map(l=>l.id);
  doUniverso.forEach(id=>{ if(!META.liberados.includes(id)) META.liberados.push(id); });
  const doPacto=doUniverso.filter(id=>R.pacto.includes(LINHA[id].elemento));
  if(J.eraChefe) spawnOvo("lendario", escolha(doUniverso.length?doUniverso:META.liberados), e.x, e.y);
  else { spawnOvo("raro", escolha(doPacto.length?doPacto:doUniverso.length?doUniverso:poolPacto()), e.x, e.y); if(Math.random()<0.05) R.itens.chamado++; }
  R.essenciaRun+=5+R.profundidade*2;
  ativos().forEach(s=>{ const antes=2; if(estBase(s)===3) checarEvolucao(s,antes); });
  if(J.eraChefe){ R.eraIdx++; R.mapaNaEra=0; if(R.eraIdx>=D.eras_ordem.length){ R.eraIdx=0; R.ciclo++; } } else R.mapaNaEra++;
  if(!R.teste) META.recorde=Math.max(META.recorde,R.profundidade);
  toast(`Chefe derrotado! Pegue o ovo ${J.eraChefe?"Lendário":"Raro"} que ele deixou.`);
  J.portalEm=6;
}
// capa do portal: a arte de abertura do reino recortada, com moldura na cor do elemento
function capaReino(u){ const img=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__keyart.png`]; if(!img||!img.pronta) return null;
  const c=document.createElement("canvas"); c.width=240; c.height=150; const g=c.getContext("2d"), e=Math.max(c.width/img.width,c.height/img.height); g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
  g.drawImage(img,(c.width-img.width*e)/2,(c.height-img.height*e)/2,img.width*e,img.height*e);
  const vg=g.createRadialGradient(120,75,40,120,75,150); vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(0,0,0,.55)"); g.fillStyle=vg; g.fillRect(0,0,240,150); return c; }
function mostrarPortais(){
  const era=D.eras_ordem[R.eraIdx], opcoes=mostrarPortais._ops||embaralhar(D.universos.filter(u=>u.era===era&&u.id!==R.universo)).slice(0,3+((SIN.rm&&SIN.rm.portais)||0)+nivelLoja("oraculo"));
  // adianta a arte da abertura e o chão de cada portal (o resto vem quando o mapa começa)
  // as capas dos portais são a arte de abertura de cada reino: se ainda não chegaram, espera até 2,5 s (uma vez)
  if(!mostrarPortais._jaEsperou&&opcoes.some(u=>{ const im=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__keyart.png`]; return im&&!im.pronta&&!im.falhou; })){
    Promise.race([preCarregar(opcoes.map(u=>`arte/reinos/${u.era}/${u.id}__keyart.png`)),new Promise(ok=>setTimeout(ok,2500))]).then(()=>{ mostrarPortais._jaEsperou=true; mostrarPortais._ops=opcoes; mostrarPortais(); }); return; }
  opcoes.forEach(u=>preCarregar(artesQue(n=>n.startsWith(`arte/reinos/${u.era}/${u.id}__keyart`)||n.startsWith(`arte/reinos/${u.era}/${u.id}__piso`))));
  mostrarPortais._ops=null; mostrarPortais._jaEsperou=false; const recs=embaralhar(["Recrutar","Cura total","Relíquia","Ovo Raro","Item"]); while(recs.length<opcoes.length) recs.push(escolha(["Relíquia","Ovo Raro","Item","Recrutar"]));
  mostrarCartas("Escolha o portal", `Próximo: ${D.eras[era].nome}${R.mapaNaEra===MAPAS_POR_ERA-1?" · o Guardião da Era espera no fim deste mapa":""}. A run fica salva aqui e as trocas são livres.`,
    opcoes.map((u,i)=>{ const rec=recs[i]; return { titulo:u.nome, raridade:"raro", classe:"portal", suave:true, sprite:capaReino(u)||gerarSprite(u.id+"portal",12,COR[u.elemento]),
      texto:`Inimigos de ${NOME_EL(u.elemento)}. ${dicaVantagem(u.elemento)}<br>Recompensa: ${rec}${rec==="Relíquia"?` (${u.reliquia.nome}: ${u.reliquia.efeito})`:""}`,
      acao:()=>aplicarPortal(u,rec) }; }));
}
function aplicarPortal(u,rec){
  R.universo=u.id; R.selos.forEach(s=>s.trocaCd=0);
  const bussola=temRel("Bússola Enlouquecida"), itemExtra=()=>{ const k=escolha(["incenso","pedra","doce","pena","chamado"]); R.itens[k]++; return D.itens[k].nome; };
  const seguir=()=>{ if(bussola&&rec!=="Item"&&rec!=="Ovo Raro") toast(`Bússola: + ${itemExtra()}`); salvarRun(); iniciarMapa(); };
  if(rec==="Relíquia"){ R.reliquias.push(u.reliquia.nome); toast(`Relíquia: ${u.reliquia.nome}`); return seguir(); }
  if(rec==="Cura total"){ R.vidaFrac=1; return seguir(); }
  if(rec==="Ovo Raro"){ for(let i=0;i<(bussola?2:1);i++){ if(R.ninho.length<D.ovos.ninho_max) R.ninho.push({id:escolha(poolPacto()),rar:"raro",prog:0,alvo:D.ovos.raridades.raro.xp}); else R.itens.incenso++; } return seguir(); }
  if(rec==="Item"){ const k=escolha(["incenso","pedra","doce","pena","chamado"]); R.itens[k]++; let msg=`Item: ${D.itens[k].nome}`; if(bussola) msg+=` + ${itemExtra()}`; toast(msg); return seguir(); }
  const pool=embaralhar(poolPacto()).slice(0,3);
  mostrarCartas("Recrutar","Escolha um monstro Raro do seu Pacto.", pool.map(id=>{ const l=LINHA[id]; return { titulo:l.filhote, sprite:spriteLinha(id,"raro"), raridade:"raro",
    texto:`${NOME_EL(l.elemento)} · ${D.classes[l.classe].nome} · ${D.linhagens[l.linhagem].nome}`,
    acao:()=>{ const vazio=R.selos.find(s=>!s.mon); if(vazio){ const o=ativos(); vazio.nivel=Math.max(1,Math.round(o.reduce((t,s)=>t+s.nivel,0)/o.length*0.6)); vazio.mon={id,rar:"raro",ramo:null}; } else R.reserva.push({id,rar:"raro",ramo:null}); seguir(); } }; }));
}
function salvarRun(){ RUN_SALVA=JSON.parse(JSON.stringify({...R, selos:R.selos.map(s=>({nivel:s.nivel,pod:s.pod,mod:s.mod,esp:s.esp??null,mon:s.mon,trocaCd:0}))})); gravar(); }
function carregarRun(s){ R=JSON.parse(JSON.stringify(s)); R.st=R.st||novoSt(); }
function derrota(){
  rodando=false; if(SIM.aoDerrota){ SIM.aoDerrota(); return; } const ess=Math.round((R.essenciaRun+Math.floor(R.abates/15))*(1+passiva("essencia"))*relMods().ess*bonusLoja("ganancia")); META.essencia+=ess; RUN_SALVA=null; gravar();
  // fim de run que puxa para a próxima: recorde, quanto falta para a próxima melhoria e atalho para o Santuário
  const recorde=R.profundidade>(R.recordeAntes??0)&&R.profundidade>0;
  const prox=LOJA.filter(it=>nivelLoja(it.id)<it.max).sort((a,b)=>precoLoja(a)-precoLoja(b))[0], podem=lojaAcessivel();
  const dica= podem.length? `Dá para comprar <b>${podem.length}</b> melhoria${podem.length>1?"s":""} no Santuário agora.` : prox? `Faltam <b>${precoLoja(prox)-META.essencia}</b> de Essência para ${prox.nome}.` : "";
  mostrarCartas(recorde?"Novo recorde!":"A equipe caiu", `Profundidade: <b>${R.profundidade}</b> mapa${R.profundidade===1?"":"s"}${recorde?" (seu melhor)":` · recorde ${META.recorde}`} · Abates: ${R.abates} · Maior combo: ${J.comboMax}<br>Essência ganha: <b>+${ess}</b> (total ${META.essencia}). ${dica}`,
    [...(podem.length? [{titulo:"Ir ao Santuário", raridade:"lendario", texto:"Gastar a Essência em melhorias permanentes.", acao:()=>telaSantuario()}] : []),
     {titulo:"Nova run", raridade:podem.length?"comum":"raro", texto:"Fechar um novo Pacto agora.", acao:()=>telaPacto()},
     {titulo:"Voltar ao Nexo", texto:"Ir para o menu.", acao:()=>menu()}],{fundo:recorde?"ui__vitoria":"ui__derrota"});
}

// ================================================================ especial individual (escolhido pelo jogador, dispara sozinho)
function recargaEspecial(s){ const r=D.especial_regras; return Math.max(r.recarga_min_seg, r.recarga_base_seg*(1-r.reducao_por_nivel*Math.max(0,s.nivel-NIV[1]))); }
function nomeEspecial(s){ const op=D.especiais[L(s).classe][s.esp]; return est(s)===3? `${op[0]} · ${ramoObj(s).supremo}` : op[0]; }
function escolherEspecial(s){
  if(!s.mon||s.esp!=null) return proximaEscolha();
  const ops=D.especiais[L(s).classe];
  mostrarCartas(`Especial de ${nomeForma(s)}`, `Escolha o especial deste Selo. Ele dispara sozinho a cada ~${Math.round(recargaEspecial(s))} s; no Supremo fica 50% mais forte. Trocar de monstro mantém a escolha.`,
    ops.map((o,i)=>({titulo:o[0], texto:o[1], raridade:"epico", sprite:spriteSelo(s), acao:()=>{ s.esp=i; s.cdEsp=6; proximaEscolha(); }})));
}
function dispararEspecial(s,a,el,cor){
  const m=est(s)===3?D.especial_regras.bonus_supremo:1, d=a.dano*m, P=J.jogador, cls=L(s).classe, op=s.esp;
  R.st.especiais++; if(!(J.t-(s._tNome||-99)<8)){ s._tNome=J.t; texto(s.x,s.y-18,nomeEspecial(s),cor,15); } anel(s.x,s.y,24,"#ffffff",.4); particulas(s.x,s.y,cor,20,110,2); tremor(4);
  const naTela=f=>J.inimigos.forEach(e=>{ if(e.hp>0&&Math.abs(e.x-P.x)<VW/2+10&&Math.abs(e.y-P.y)<VH/2+10) f(e); });
  const alvo=pontoDenso(s,150)||maisProximo(s,150)||{x:s.x,y:s.y}; vfxEspecial(s,alvo,cls,op,el);
  switch(cls+op){
    case "guardiao0": J.escudo=Math.min(J.vidaMax*0.5,J.escudo+J.vidaMax*0.25); J.reducao=4; emArea(s.x,s.y,70,e=>{e.x+=(s.x-e.x)*0.6; e.y+=(s.y-e.y)*0.6;}); anel(s.x,s.y,70,cor,.7); break;
    case "guardiao1": emArea(s.x,s.y,70,e=>{ferir(e,d*10,el); e.congela=2;}); anel(s.x,s.y,70,cor,.7); tremor(8); break;
    case "guerreiro0": J.grito=6; anel(P.x,P.y,50,"#ff5a4a",.6); break;
    case "guerreiro1": emArea(alvo.x,alvo.y,60,e=>ferir(e,d*14,el)); anel(alvo.x,alvo.y,60,cor,.6); tremor(7); break;
    case "assassino0": for(let i=0;i<8;i++) agendar(i*0.08,()=>{ const e=escolha(J.inimigos.filter(x=>x.hp>0&&dist2(x,s)<140*140)); if(e){ ferir(e,d*4,el,{crit:true}); raio(s.x,s.y,e.x,e.y,cor);} }); break;
    case "assassino1": naTela(e=>{ if(e.elite||e.chefe||e.mini) ferir(e,d*6,el); else if(e.hp<e.max*0.25){ danoSimples(e,e.hp+1); particulas(e.x,e.y,"#c070ff",6,60);} }); break;
    case "cacador0": J.zonas.push({fonte:FONTE,tipo:"chuva",x:alvo.x,y:alvo.y,r:60,cor,el,dano:d*1.2,vida:4,cd:0}); break;
    case "cacador1": { const ang=Math.atan2(alvo.y-s.y,alvo.x-s.x), cx=Math.cos(ang), cy=Math.sin(ang);
      J.inimigos.forEach(e=>{ const rx=e.x-s.x, ry=e.y-s.y, t=rx*cx+ry*cy, dl=Math.abs(rx*cy-ry*cx); if(t>0&&t<260&&dl<12) ferir(e,d*20,el); });
      raio(s.x,s.y,s.x+cx*260,s.y+cy*260,cor); raio(s.x,s.y+2,s.x+cx*260,s.y+cy*260+2,"#ffffff"); tremor(6); break; }
    case "mago0": emArea(alvo.x,alvo.y,80,e=>ferir(e,d*12,el)); anel(alvo.x,alvo.y,80,cor,.8); particulas(alvo.x,alvo.y,cor,40,160,2); tremor(10); parar(0.08); break;
    case "mago1": naTela(e=>{ e.congela=2.5; ferir(e,d*2,el); }); J.flash={vida:.25,cor:"#bfe8ff"}; break;
    case "invocador0": for(let i=0;i<10;i++) J.crias.push({fonte:FONTE,x:s.x+rnd(-12,12),y:s.y+rnd(-12,12),dano:d*0.8,el,cor,vida:6,cd:0}); break;
    case "invocador1": J.crias.push({fonte:FONTE,x:s.x,y:s.y,dano:d*6,el,cor,vida:10,cd:0,gigante:true}); anel(s.x,s.y,24,cor,.6); break;
    case "mistico0": curar(J.vidaMax*0.4); anel(P.x,P.y,50,"#7fe0a0",.8); particulas(P.x,P.y,"#7fe0a0",24,90); break;
    case "mistico1": naTela(e=>ferir(e,d*8,el)); J.flash={vida:.25,cor:"#fff3c4"}; break;
    case "xama0": J.zonas.push({fonte:FONTE,tipo:"chuva",x:P.x,y:P.y,r:75,cor,el,dano:d*1.5,vida:5,cd:0,segue:true}); break;
    case "xama1": J.totemAnc=12; J.totens.push({x:s.x,y:s.y,dono:s,dano:d*2,el,cor,vida:12,cd:0,grande:true}); break;
  }
}
// ================================================================ especial combinado (muda conforme o time)
function tipoCombinado(){
  const eq=ativos(), F=D.combinado_regras.forca;
  for(const n of R.elos){ const e=D.elos.find(x=>x.nome===n); if(e&&eq.some(s=>s.mon.id===e.a)&&eq.some(s=>s.mon.id===e.b)) return {tipo:"elo",nome:n.replace(" (fusão)",""),forca:F.elo}; }
  if(eq.length===3){ const li=linhagemDe(eq[0]); if(li!=="errante"&&eq.every(s=>linhagemDe(s)===li)) return {tipo:"linhagem",chave:li,nome:D.combinados_linhagem[li],forca:F.linhagem};
    const el=elementoDe(eq[0]); if(eq.every(s=>elementoDe(s)===el)) return {tipo:"elemento",chave:el,nome:D.combinados_elemento[el],forca:F.elemento}; }
  if(SIN.chips.includes("Trindade")) return {tipo:"trindade",nome:"Formação Sagrada",forca:F.trindade};
  const els=[...new Set(eq.map(elementoDe))];
  for(let i=0;i<els.length;i++) for(let j=i+1;j<els.length;j++){ const r=REAC[[els[i],els[j]].sort().join("|")]; if(r) return {tipo:"reacao",a:els[i],b:els[j],nome:`${r.nome} Suprema`,forca:F.reacao}; }
  return {tipo:"basico",nome:"Investida Conjunta",forca:F.basico};
}
function usarCombinado(){
  if(!J||pausado||J.comb>0||SIM.semEspeciais||!ativos().length) return;
  const c=tipoCombinado(), P=J.jogador, eq=ativos(), els=[...new Set(eq.map(elementoDe))];
  J.comb=D.combinado_regras.recarga_seg; R.st.combinados++; FONTE="combinado";
  const total=eq.reduce((t,s)=>t+atrib(s).dano,0)*7*c.forca;
  const naTela=f=>J.inimigos.forEach(e=>{ if(e.hp>0&&Math.abs(e.x-P.x)<VW/2+10&&Math.abs(e.y-P.y)<VH/2+10) f(e); });
  texto(P.x,P.y-28,c.nome,"#e0b0ff",26); J.flash={vida:.45,cor:COR[els[0]]}; tremor(14); parar(0.18); vfxCombinado(c,P);
  eq.forEach(s=>{ anel(s.x,s.y,40,COR[elementoDe(s)],.8); particulas(s.x,s.y,COR[elementoDe(s)],30,150,2); });
  const pintar=(tipo,raio,dur)=>{ for(let i=0;i<60;i++){ const a=Math.random()*Math.PI*2, r=Math.random()*raio; mudarSolo(P.x+Math.cos(a)*r,P.y+Math.sin(a)*r,tipo,dur); } };
  if(c.tipo==="reacao") naTela(e=>{ e.status={el:c.a,t:J.t}; e.reacCd=0; ferir(e,total/2,c.b); });
  else naTela(e=>els.forEach(el=>ferir(e,total/els.length,el)));
  switch(c.tipo){
    case "elo": curar(J.vidaMax*0.1); break;
    case "trindade": J.escudo=Math.min(J.vidaMax*0.5,J.escudo+J.vidaMax*0.3); curar(J.vidaMax*0.3); break;
    case "linhagem": ({dragoes:()=>naTela(e=>{e.dot=total*0.05; e.dotT=4;}), mortos_vivos:()=>{ for(let i=0;i<8;i++) J.crias.push({fonte:FONTE,x:P.x+rnd(-30,30),y:P.y+rnd(-30,30),dano:total*0.02,el:els[0],cor:"#9fa8b8",vida:8,cd:0}); },
       feras:()=>naTela(e=>e.vulner=6), gigantes:()=>naTela(e=>e.congela=2.5), pequeninos:()=>{ for(let i=0;i<12;i++) J.crias.push({fonte:FONTE,x:P.x,y:P.y,dano:total*0.015,el:els[0],cor:"#ffd34a",vida:8,cd:0}); },
       marinhos:()=>{ naTela(e=>{const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*40; e.y+=dy/d*40;}); pintar("agua",70,25); }, alados:()=>{ J.invuln=3; }, quimeras:()=>naTela(e=>e.status={el:escolha(ELS),t:J.t}) })[c.chave](); break;
    case "elemento": ({fogo:()=>pintar("fogo",70,5), agua:()=>pintar("agua",80,30), terra:()=>naTela(e=>e.congela=2), ar:()=>naTela(e=>{const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*50; e.y+=dy/d*50;}),
       raio:()=>{ pintar("eletrico",60,4); }, natureza:()=>pintar("vinha",70,15), luz:()=>{ pintar("luz",60,15); curar(J.vidaMax*0.2); }, sombra:()=>pintar("sombra",80,15) })[c.chave](); break;
  }
}
// ================================================================ física do ambiente: o chão reage aos elementos
const CEL=8, INTER={}; D.interacoes.forEach(([el,de,vira])=>{ INTER[el+"|"+de]=vira; });
// chão que reage aos monstros: água molha, fogo chamusca, terra racha (somem sozinhos com o tempo)
Object.assign(INTER,{"agua|chao":"molhado","agua|queimado":"molhado","agua|rachado":"lama","agua|molhado":"molhado",
  "fogo|chao":"queimado","fogo|molhado":"vapor","fogo|rachado":"queimado","raio|molhado":"eletrico","terra|chao":"rachado","terra|molhado":"lama",
  "natureza|molhado":"grama","natureza|queimado":"grama","natureza|rachado":"grama","luz|molhado":"luz","sombra|molhado":"sombra","luz|queimado":"luz","sombra|queimado":"sombra",
  // monstro gelado (forma de gelo, ou de Água num mapa frio): congela poça, lama e água eletrificada, apaga o fogo e condensa o vapor
  "gelo|agua":"gelo","gelo|molhado":"gelo","gelo|lama":"gelo","gelo|eletrico":"gelo","gelo|fogo":"agua","gelo|vapor":"agua","gelo|queimado":"molhado",
  "fogo|gelo":"agua"});
// formas de gelo (pelo nome do ramo): contam como "gelo" para o chão
const GELADO=/gelo|neve|glacia|inverno|congel/i;
function elementoNoSolo(s){ const el=elementoDe(s); if(el!=="agua") return el; const r=ramoObj(s); if((r&&GELADO.test(r.nome+" "+(r.supremo||"")))||frio()) return "gelo"; return el; }
// o chão mudou embaixo de um monstro: um sinal pequeno para a mudança ser vista (com limite, para não poluir)
const SINAL_SOLO={vapor:["#e8eef4",3,"fumaca"],gelo:["#cfefff",3,"estrela"],agua:["#7fc8ff",3,null],grama:["#7fd05a",2,"folha"],vinha:["#4f9a3c",2,"folha"],fogo:["#ffb040",3,"faisca"],
  eletrico:["#fff3a0",2,"faisca"],cinza:["#9a9690",2,"fumaca"],lama:["#7a5a3a",2,null],luz:["#fff3c4",2,"estrela"],sombra:["#9070c0",2,"fumaca"],queimado:["#5a4a40",1,"fumaca"],molhado:["#9fd0ff",1,null]};
function sinalSolo(cx,cy,vira){ const sg=SINAL_SOLO[vira]; if(!sg||SIM.ativo||J.parts.length>300) return; J._sinalT=J._sinalT||0; if(J.t-J._sinalT<0.05) return; J._sinalT=J.t;
  for(let i=0;i<sg[1];i++){ const v=10+Math.random()*16, a=-Math.PI/2+rnd(-0.9,0.9); J.parts.push({x:cx*CEL+4+rnd(-3,3),y:cy*CEL+4+rnd(-2,2),vx:Math.cos(a)*v,vy:Math.sin(a)*v,vida:rnd(.5,.9),max:.9,cor:sg[0],tam:sg[2]==="fumaca"?3:1,forma:sg[2]||undefined}); } }
const DUR={agua:40,lama:25,fogo:5,cinza:60,vapor:3,eletrico:4,grama:60,vinha:15,sombra:15,luz:15,gelo:60,chao:40,molhado:14,queimado:12,rachado:16};
const DEPOIS={fogo:"cinza",eletrico:"agua",vinha:"grama"};
function hash2(x,y,s){ let h=(x*374761393+y*668265263+s*982451653)|0; h=Math.imul(h^(h>>>13),1274126177); return ((h^(h>>>16))>>>0)/4294967296; }
function ruido(x,y,s){ const xi=Math.floor(x), yi=Math.floor(y), fx=x-xi, fy=y-yi, u=fx*fx*(3-2*fx), v=fy*fy*(3-2*fy);
  const a=hash2(xi,yi,s), b=hash2(xi+1,yi,s), c=hash2(xi,yi+1,s), d=hash2(xi+1,yi+1,s); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
function terrenoBase(){ const u=UNIV[R.universo]; return D.terreno_especial[u.id]||D.terreno_natural[u.elemento]; }
function soloNatural(cx,cy){ const se=soloEstrutura(cx,cy); if(se) return se; const [tipo,p]=terrenoBase(); const sem=R.universo.length*7+R.profundidade; return ruido(cx/6,cy/6,sem)<p? tipo : "chao"; }
function soloEm(cx,cy){ const k=cx+","+cy, m=J.solo.get(k); if(m){ if(m.ate>J.t) return m.t; J.solo.delete(k); if(DEPOIS[m.t]){ J.solo.set(k,{t:DEPOIS[m.t],ate:J.t+DUR[DEPOIS[m.t]]}); return DEPOIS[m.t]; } } return soloNatural(cx,cy); }
function mudarSolo(x,y,tipo,dur){ if(estruturaU()&&J.cena&&abismoEm(x,y,0)) return; const cx=Math.floor(x/CEL), cy=Math.floor(y/CEL); J.solo.set(cx+","+cy,{t:tipo,ate:J.t+(dur??DUR[tipo]??30)}); }
const frio=()=>terrenoBase()[0]==="gelo";
function aplicarElementoNoSolo(x,y,el){
  const cx=Math.floor(x/CEL), cy=Math.floor(y/CEL), atual=soloEm(cx,cy); let vira=INTER[el+"|"+atual]; if(!vira) return;
  if(vira==="fogo?"){ if(Math.random()>0.15) return; vira="fogo"; }
  if(vira==="fogo+"){ for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ const v=soloEm(cx+dx,cy+dy); if(v==="grama"||v==="vinha") J.solo.set((cx+dx)+","+(cy+dy),{t:"fogo",ate:J.t+DUR.fogo}); } return; }
  if(el==="agua"&&frio()&&(vira==="lama"||vira==="agua"||vira==="molhado")) vira="gelo";
  if(vira!==atual){ J.solo.set(cx+","+cy,{t:vira,ate:J.t+(DUR[vira]??30)}); R.st.transformacoes++; sinalSolo(cx,cy,vira); }
}
function atualizarSolo(dt){
  // cada monstro marca o chão embaixo dele e um pouco em volta (rastro largo, não uma célula só)
  J.tSolo-=dt; if(J.tSolo<=0){ J.tSolo=0.2; ativos().forEach(s=>{ const el=elementoNoSolo(s); aplicarElementoNoSolo(s.x,s.y+3,el); for(let i=0;i<2;i++) aplicarElementoNoSolo(s.x+rnd(-9,9),s.y+3+rnd(-6,6),el); }); }
  J.tFogo-=dt; if(J.tFogo<=0){ J.tFogo=0.5; const fogos=[]; J.solo.forEach((m,k)=>{ if(m.t==="fogo"&&m.ate>J.t) fogos.push(k); });
    const vivo=ativos().some(s=>elementoDe(s)==="ar")?2:1;
    // cada vizinho de grama ou vinha tem 15% de chance de pegar fogo a cada meio segundo (o dobro com vento)
    fogos.slice(0,300).forEach(k=>{ const [cx,cy]=k.split(",").map(Number); for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ if(Math.random()>=0.15*vivo*fatorVentoFogo(dx,dy)) continue; const v=soloEm(cx+dx,cy+dy);
      if(v==="grama"||v==="vinha") J.solo.set((cx+dx)+","+(cy+dy),{t:"fogo",ate:J.t+DUR.fogo}); } });
    if(J.solo.size>4000){ for(const [k,m] of J.solo) if(m.ate<J.t) J.solo.delete(k); } }
  // efeitos no Invocador
  const P=J.jogador, sj=soloEm(Math.floor(P.x/CEL),Math.floor(P.y/CEL)); J.soloJog=sj; const temEl=el=>ativos().some(s=>elementoDe(s)===el);
  if(sj==="fogo"&&!temEl("fogo")&&J.invuln<=0) J.vida-=J.vidaMax*0.04*dt;
  if(sj==="eletrico"&&!temEl("raio")&&J.invuln<=0) J.vida-=J.vidaMax*0.05*dt;
  if(sj==="luz") curar(J.vidaMax*0.01*dt);
}
function fatorVentoFogo(dx,dy){ const C=J.cena; if(!C||C.kit.submerso) return 1; const m=Math.min(1.5,C.Wm/45), d=dx*C.dx+dy*C.dy; return Math.max(0.2,1+d*m); }
function efeitoSoloInimigo(e,dt){
  const t=soloEm(Math.floor(e.x/CEL),Math.floor(e.y/CEL)); const r={vel:1,gelo:false};
  const marcar=el=>{ if(!e.status||J.t-e.status.t>3) e.status={el,t:J.t}; };
  switch(t){
    case "gelo": r.gelo=true; break;
    case "agua": r.vel=0.85; marcar("agua"); break;
    case "lama": r.vel=0.55; break;
    case "vinha": r.vel=0.45; marcar("natureza"); break;
    case "vapor": e.cego=Math.max(e.cego,0.5); r.vel=0.8; break;
    case "molhado": r.vel=0.92; marcar("agua"); break;   // inimigo molhado: o próximo golpe de outro elemento vira reação
    case "queimado": marcar("fogo"); break;
    case "fogo": marcar("fogo"); e.tSolo=(e.tSolo||0)-dt; if(e.tSolo<=0){ e.tSolo=0.5; const f=FONTE; FONTE="ambiente"; if(!((e.chefe||e.mini)&&e.el==="fogo")) danoSimples(e,pctMax(e,0.07)+2); FONTE=f; } break;
    case "eletrico": marcar("raio"); e.tSolo=(e.tSolo||0)-dt; if(e.tSolo<=0){ e.tSolo=0.5; const f=FONTE; FONTE="ambiente"; if(!((e.chefe||e.mini)&&e.el==="raio")) danoSimples(e,pctMax(e,0.09)+3); FONTE=f; } break;
  }
  return r;
}
const COR_SOLO={gelo:["#8fc4e0","#e8f8ff"],agua:["#3a7fd0","#7fc0ff"],lama:["#5a4028","#7a5838"],fogo:["#e8603c","#ffd34a"],grama:["#3f7a34","#6aa84f"],cinza:["#4a4650","#6a6670"],
  vapor:["#d8e4ee","#ffffff"],eletrico:["#3a6fd0","#f2d23a"],vinha:["#2c5a28","#5aa83c"],areia:["#b89a60","#d8bc80"],sombra:["#2a1840","#4a2a70"],luz:["#e8d080","#fff3c4"],
  molhado:["#7a8fae","#cfe6ff"],queimado:["#5e4a40","#ff8a3a"],rachado:["#f4efe6","#3a2a1c"]};
// O terreno vira mancha orgânica: as células de 8 px formam um campo suave (interpolação com smoothstep + ruído na borda),
// que recorta uma textura própria de cada tipo. Nada de escada de quadrados chapados por cima do piso pintado.
const TEX_SOLO={}, TEX_K=3, TEX_N=64, BASE_TEX={};
// molhado, rachado e queimado escurecem o piso por multiplicação (o desenho do chão continua por baixo, como pedra molhada de verdade)
const SOLO_MULT={molhado:1, rachado:1, queimado:1};
function texturaSolo(t){ if(TEX_SOLO[t]) return TEX_SOLO[t]; const cor=COR_SOLO[t], N=TEX_N, c=document.createElement("canvas"); c.width=c.height=N*TEX_K;
  const g=c.getContext("2d"), r=semente("solo:"+t); g.scale(TEX_K,TEX_K); g.globalAlpha=BASE_TEX[t]??1; g.fillStyle=cor[0]; g.fillRect(0,0,N,N); g.globalAlpha=1;
  // desenha com repetição nas bordas para a textura emendar sem costura
  const rep=fn=>{ for(const dx of [-N,0,N]) for(const dy of [-N,0,N]){ g.save(); g.translate(dx,dy); fn(); g.restore(); } };
  const mancha=(x,y,rr,cc,a)=>rep(()=>{ const gr=g.createRadialGradient(x,y,0,x,y,rr), [R1,G1,B1]=hexRgb(cc); gr.addColorStop(0,`rgba(${R1},${G1},${B1},${a})`); gr.addColorStop(1,`rgba(${R1},${G1},${B1},0)`); g.fillStyle=gr; g.fillRect(x-rr,y-rr,rr*2,rr*2); });
  if(!(t in BASE_TEX)) for(let i=0;i<34;i++) mancha(r()*N,r()*N,3+r()*9,r()<.5?tom(cor[0],1.22):tom(cor[0],0.78),0.55);
  const traco=(pts,cc,lw,a)=>rep(()=>{ g.strokeStyle=cc; g.globalAlpha=a; g.lineWidth=lw; g.lineCap="round"; g.lineJoin="round"; g.beginPath(); g.moveTo(pts[0],pts[1]); for(let k=2;k<pts.length;k+=2) g.lineTo(pts[k],pts[k+1]); g.stroke(); g.globalAlpha=1; });
  const ponto=(x,y,rr,cc,a)=>rep(()=>{ g.fillStyle=cc; g.globalAlpha=a; g.beginPath(); g.arc(x,y,rr,0,Math.PI*2); g.fill(); g.globalAlpha=1; });
  switch(t){
    case "agua": case "eletrico": for(let i=0;i<16;i++){ const x=r()*N, y=r()*N, w=4+r()*8; traco([x,y,x+w*.5,y-1,x+w,y],cor[1],0.6,0.55); } if(t==="eletrico") for(let i=0;i<5;i++){ let x=r()*N, y=r()*N; const p=[x,y]; for(let s=0;s<4;s++){ x+=2+r()*3; y+=(r()-.5)*5; p.push(x,y); } traco(p,"#fff6b0",0.5,0.8); } break;
    case "gelo": for(let i=0;i<7;i++){ let x=r()*N, y=r()*N; const p=[x,y]; for(let s=0;s<4;s++){ x+=(r()-.5)*10; y+=(r()-.5)*10; p.push(x,y); } traco(p,"#ffffff",0.45,0.6); } for(let i=0;i<6;i++){ const x=r()*N, y=r()*N; traco([x,y,x+5,y-3],"#ffffff",1.2,0.35); } break;
    case "lama": for(let i=0;i<14;i++) ponto(r()*N,r()*N,0.6+r()*1.6,tom(cor[0],0.6),0.6); for(let i=0;i<10;i++) ponto(r()*N,r()*N,0.4+r()*0.6,cor[1],0.7); break;
    case "fogo": for(let i=0;i<10;i++){ let x=r()*N, y=r()*N; const p=[x,y]; for(let s=0;s<4;s++){ x+=(r()-.5)*9; y+=(r()-.5)*9; p.push(x,y); } traco(p,cor[1],1.1,0.85); traco(p,"#fff3c4",0.4,0.8); } break;
    case "grama": case "vinha": for(let i=0;i<140;i++){ const x=r()*N, y=r()*N, l=1.2+r()*2, a=(r()-.5)*0.9; traco([x,y,x+Math.sin(a)*l,y-Math.cos(a)*l],r()<.5?cor[1]:tom(cor[0],0.75),0.45,0.8); } if(t==="vinha") for(let i=0;i<5;i++){ let x=r()*N, y=r()*N, a=r()*6.28; const p=[x,y]; for(let s=0;s<10;s++){ a+=0.6; x+=Math.cos(a)*1.5; y+=Math.sin(a)*1.5; p.push(x,y); } traco(p,"#1f4a1c",0.7,0.8); } break;
    case "cinza": for(let i=0;i<60;i++) ponto(r()*N,r()*N,0.3+r()*0.6,r()<.6?tom(cor[0],0.65):cor[1],0.7); for(let i=0;i<6;i++) ponto(r()*N,r()*N,0.5,"#ff8a40",0.6); break;
    case "areia": for(let i=0;i<14;i++){ const x=r()*N, y=r()*N, w=6+r()*10; traco([x,y,x+w*.35,y-1.2,x+w*.7,y-0.6,x+w,y-1.4],tom(cor[0],0.82),0.5,0.55); } for(let i=0;i<40;i++) ponto(r()*N,r()*N,0.3,cor[1],0.7); break;
    case "sombra": for(let i=0;i<8;i++){ let x=r()*N, y=r()*N, a=r()*6.28; const p=[x,y]; for(let s=0;s<9;s++){ a+=0.5; x+=Math.cos(a)*2; y+=Math.sin(a)*2; p.push(x,y); } traco(p,cor[1],0.8,0.6); } break;
    case "luz": for(let i=0;i<18;i++) ponto(r()*N,r()*N,0.4+r()*0.5,"#ffffff",0.8); break;
    case "vapor": for(let i=0;i<10;i++) mancha(r()*N,r()*N,4+r()*7,"#ffffff",0.5); break;
    case "molhado": for(let i=0;i<10;i++) mancha(r()*N,r()*N,4+r()*8,"#5a6e8e",0.6); for(let i=0;i<8;i++) mancha(r()*N,r()*N,3+r()*5,"#a8b8d0",0.5); break;
    case "queimado": for(let i=0;i<14;i++) mancha(r()*N,r()*N,3+r()*7,"#2a1e18",0.6); for(let i=0;i<8;i++){ let x=r()*N, y=r()*N; const p=[x,y]; for(let s2=0;s2<4;s2++){ x+=(r()-.5)*8; y+=(r()-.5)*8; p.push(x,y); } traco(p,"#ff8a3a",0.8,0.9); traco(p,"#ffe0a0",0.3,0.9); } for(let i=0;i<14;i++) ponto(r()*N,r()*N,0.45,"#ffb050",0.9); break;
    case "rachado": for(let i=0;i<10;i++) ponto(r()*N,r()*N,0.5+r()*0.9,"#b8a890",0.7); for(let i=0;i<10;i++){ let x=r()*N, y=r()*N; const p=[x,y]; for(let s2=0;s2<5;s2++){ x+=(r()-.5)*9; y+=(r()-.5)*9; p.push(x,y); } traco(p,"#2a1a10",0.75,0.95); traco(p.map((v,k)=>v+(k%2?0.7:0)),"#d8c8b0",0.3,0.6); } break; }
  TEX_SOLO[t]=c; return c; }
// reflexos do chão molhado (camada somada por cima, só onde está molhado)
let TEX_BRILHO=null;
function texturaBrilho(){ if(TEX_BRILHO) return TEX_BRILHO; const N=TEX_N, c=document.createElement("canvas"); c.width=c.height=N*TEX_K; const g=c.getContext("2d"), r=semente("brilho"); g.scale(TEX_K,TEX_K); g.lineCap="round";
  for(let i=0;i<16;i++){ const x=r()*N, y=r()*N, w=5+r()*10; for(const dx of [-N,0,N]) for(const dy of [-N,0,N]){ g.strokeStyle="#e8f4ff"; g.globalAlpha=0.5+r()*0.4; g.lineWidth=0.5+r()*0.6; g.beginPath(); g.moveTo(x+dx,y+dy); g.quadraticCurveTo(x+dx+w*0.5,y+dy-1.2,x+dx+w,y+dy-0.4); g.stroke(); } }
  for(let i=0;i<14;i++){ const x=r()*N, y=r()*N; for(const dx of [-N,0,N]) for(const dy of [-N,0,N]){ g.fillStyle="#ffffff"; g.globalAlpha=0.9; g.beginPath(); g.arc(x+dx,y+dy,0.45,0,Math.PI*2); g.fill(); } }
  TEX_BRILHO=c; return c; }
// força do terreno natural sobre um piso pintado (o piso já tem a própria textura; areia nele seria só uma mancha cinza)
const SOLO_NAT_PINTADO={areia:0, grama:0, cinza:0, sombra:0.5, gelo:0.6};
const ALFA_SOLO={molhado:0.6, queimado:0.42, rachado:0.6, agua:0.8, lama:0.8, fogo:0.95, gelo:0.85, grama:0.72, cinza:0.55, vapor:0.42, sombra:0.32, luz:0.3, eletrico:0.9, vinha:0.88, areia:0.7};
const cacheSolo=new Map(), SOLO_FOLGA=8;
// A camada é montada para uma área maior que a tela (folga de 8 células, ancorada numa grade de 8): andar não obriga a refazer.
// Refaz só quando a âncora muda ou o terreno daquele tipo muda (no máximo ~6 vezes por segundo por tipo).
function desenharSolo(ox,oy){
  const A=SOLO_FOLGA, c0=Math.floor(Math.floor(ox/CEL)/A)*A-A, r0=Math.floor(Math.floor(oy/CEL)/A)*A-A;
  const W2=2*A+Math.ceil(VW/CEL)+3, H2=2*A+Math.ceil(VH/CEL)+3;   // tamanho fixo: cobre a tela em qualquer ponto da âncora
  // J.solo ganha um contador de versão: sem mudança no terreno e sem sair da âncora, só redesenha o que já está pronto
  const M=J.solo; if(!M.__ver){ const s0=M.set.bind(M), d0=M.delete.bind(M); M.__ver=1; M.set=(k,v)=>{ M.__ver++; return s0(k,v); }; M.delete=k=>{ M.__ver++; return d0(k); }; }
  const UK=4, Kb=Math.max(1,Math.min(2,Q)), ancora=c0+"|"+r0+"|"+W2+"|"+H2+"|"+Kb, ES=desenharSolo.es||(desenharSolo.es={});
  if(ES.ancora!==ancora||ES.J!==J||(ES.ver!==M.__ver&&J.t-ES.t>0.4)||J.t-ES.t>1||J.t<ES.t) montarSolo(c0,r0,W2,H2,UK,Kb,ancora);
  for(const [t,ent] of cacheSolo){ if(!ent.b) continue;
    let a=ALFA_SOLO[t]??0.8; if(t==="fogo") a*=0.85+0.15*Math.sin(J.t*9); else if(t==="eletrico") a*=Math.floor(J.t*14)%3? 1 : 0.6; else if(t==="agua") a*=0.94+0.06*Math.sin(J.t*2.2); else if(t==="queimado") a*=0.9+0.1*Math.sin(J.t*5);
    const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true; lg.imageSmoothingQuality="low"; lg.globalAlpha=a;
    // só o trecho visível da camada (ampliação simples: a textura já é suave, e a de alta qualidade custa caro a cada quadro)
    const sx=(ox-c0*CEL)*Kb, sy=(oy-r0*CEL)*Kb; if(SOLO_MULT[t]) lg.globalCompositeOperation="multiply"; lg.drawImage(ent.b,sx,sy,VW*Kb,VH*Kb,0,0,VW,VH); lg.globalCompositeOperation="source-over";
    if(ent.b2&&t==="molhado"){ lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.32+0.08*Math.sin(J.t*1.7); lg.drawImage(ent.b2,sx,sy,VW*Kb,VH*Kb,0,0,VW,VH); lg.globalCompositeOperation="source-over"; }
    lg.imageSmoothingEnabled=suave; lg.imageSmoothingQuality="high"; }
  lg.globalAlpha=1;
}
function montarSolo(c0,r0,W2,H2,UK,Kb,ancora){ const ES=desenharSolo.es; ES.ancora=ancora; ES.J=J; ES.ver=J.solo.__ver; ES.t=J.t;
  const est=estruturaU()&&J.cena, lagoArte=est&&folhaU("pecas"), pintado=!!(chao&&chao.suave);
  const n=W2*H2, G=desenharSolo.G&&desenharSolo.G.length>=n? desenharSolo.G : (desenharSolo.G=new Array(n));
  const F=desenharSolo.F&&desenharSolo.F.length>=n? desenharSolo.F : (desenharSolo.F=new Float32Array(n));
  const tipos=new Map();
  for(let j=0;j<H2;j++) for(let i=0;i<W2;i++){ const cx=c0+i, cy=r0+j, idx=j*W2+i; let t=soloEm(cx,cy), f=1;
    if(t!=="chao"){ const din=J.solo.has(cx+","+cy);
      if(est&&abismoEm(cx*CEL+4,cy*CEL+4,0)) t="chao";
      else if(lagoArte&&t===soloLago()&&!din&&lagoEm(cx*CEL+4,cy*CEL+4)) t="chao";
      else if(!din&&pintado&&SOLO_NAT_PINTADO[t]!=null){ f=SOLO_NAT_PINTADO[t]; if(f<=0) t="chao"; } }
    if(!COR_SOLO[t]) t="chao"; G[idx]=t; F[idx]=f;
    if(t!=="chao"){ const h=tipos.get(t)||0; tipos.set(t,(Math.imul(h,31)+idx*7+Math.round(f*10))|0); } }
  for(const k of cacheSolo.keys()) if(!tipos.has(k)) cacheSolo.delete(k);
  const uw=W2*UK, uh=H2*UK, wx0=c0*CEL, wy0=r0*CEL;
  for(const [t,assin] of tipos){
    let ent=cacheSolo.get(t); if(!ent){ ent={}; cacheSolo.set(t,ent); }
    if(ent.ancora!==ancora||ent.assin!==assin){ ent.ancora=ancora; ent.assin=assin;
      // 1) campo suave em 4 px por célula, com borda irregular
      if(!ent.u||ent.u.width!==uw||ent.u.height!==uh){ ent.u=document.createElement("canvas"); ent.u.width=uw; ent.u.height=uh; ent.ug=ent.u.getContext("2d"); ent.id=ent.ug.createImageData(uw,uh); }
      const d=ent.id.data, P=new Float32Array(n), S2=new Float32Array(n);
      for(let k=0;k<n;k++){ if(G[k]===t){ P[k]=1; S2[k]=F[k]; } }
      // desfoque 3x3 no campo: diagonais viram curvas em vez de escada; célula isolada continua como manchinha
      const Pb=new Float32Array(n); for(let j=0;j<H2;j++) for(let i=0;i<W2;i++){ let acc=0, wt=0;
        for(let dj=-1;dj<=1;dj++) for(let di=-1;di<=1;di++){ const ii=i+di, jj=j+dj; if(ii<0||jj<0||ii>=W2||jj>=H2) continue; const w=(di?1:2)*(dj?1:2); acc+=P[jj*W2+ii]*w; wt+=w; }
        const k=j*W2+i; Pb[k]=Math.max(acc/wt, P[k]*0.75); }
      for(let y=0;y<uh;y++){ const fy=(y+0.5)/UK-0.5, j0=Math.max(0,Math.min(H2-2,Math.floor(fy))), vy=Math.max(0,Math.min(1,fy-j0));
        for(let x=0;x<uw;x++){ const fx=(x+0.5)/UK-0.5, i0=Math.max(0,Math.min(W2-2,Math.floor(fx))), vx=Math.max(0,Math.min(1,fx-i0));
          const a=j0*W2+i0, b=a+1, c=a+W2, e=c+1, o=(y*uw+x)*4;
          const vp=(P[a]*(1-vx)+P[b]*vx)*(1-vy)+(P[c]*(1-vx)+P[e]*vx)*vy; if(vp<=0.001){ d[o+3]=0; continue; }
          const v=(Pb[a]*(1-vx)+Pb[b]*vx)*(1-vy)+(Pb[c]*(1-vx)+Pb[e]*vx)*vy; if(v<0.3){ d[o+3]=0; continue; }
          const s=((S2[a]*(1-vx)+S2[b]*vx)*(1-vy)+(S2[c]*(1-vx)+S2[e]*vx)*vy)/vp;
          // ruído só na faixa da borda (no miolo o resultado já é 0 ou 1)
          const m= v>0.69? 1 : v<0.31? 0 : Math.max(0,Math.min(1,(v-0.5+ruido((wx0/2+x/2)/3,(wy0/2+y/2)/3,11)*0.22-0.11)*7+0.5));
          d[o]=d[o+1]=d[o+2]=255; d[o+3]=Math.round(255*m*s); } }
      ent.ug.putImageData(ent.id,0,0);
      // 2) textura do tipo recortada pela máscara + beirada escura embaixo, tudo numa imagem só (um desenho por quadro)
      const bw=W2*CEL*Kb, bh=H2*CEL*Kb;
      if(!ent.b||ent.b.width!==bw||ent.b.height!==bh){ ent.b=document.createElement("canvas"); ent.b.width=bw; ent.b.height=bh; ent.bg=ent.b.getContext("2d"); }
      const g=ent.bg; g.setTransform(1,0,0,1,0,0); g.globalCompositeOperation="source-over"; g.globalAlpha=1; g.clearRect(0,0,bw,bh);
      g.imageSmoothingEnabled=true; g.imageSmoothingQuality="low"; g.drawImage(ent.u,0,0,bw,bh);
      g.globalCompositeOperation="source-in";
      const tex=texturaSolo(t); if(!ent.pat||ent.tex!==tex){ ent.pat=g.createPattern(tex,"repeat"); ent.tex=tex; }
      const N=TEX_N, mx=((wx0%N)+N)%N, my=((wy0%N)+N)%N;
      g.setTransform(Kb/TEX_K,0,0,Kb/TEX_K,0,0); g.translate(-mx*TEX_K,-my*TEX_K); g.fillStyle=ent.pat; g.fillRect(0,0,(W2*CEL+N)*TEX_K,(H2*CEL+N)*TEX_K); g.setTransform(1,0,0,1,0,0);
      if(SOLO_MULT[t]&&t==="molhado"){ if(!ent.b2||ent.b2.width!==bw||ent.b2.height!==bh){ ent.b2=document.createElement("canvas"); ent.b2.width=bw; ent.b2.height=bh; }
        const g2=ent.b2.getContext("2d"); g2.setTransform(1,0,0,1,0,0); g2.globalCompositeOperation="source-over"; g2.clearRect(0,0,bw,bh); g2.imageSmoothingEnabled=true; g2.drawImage(ent.u,0,0,bw,bh); g2.globalCompositeOperation="source-in";
        const pb=g2.createPattern(texturaBrilho(),"repeat"); g2.setTransform(Kb/TEX_K,0,0,Kb/TEX_K,0,0); g2.translate(-mx*TEX_K,-my*TEX_K); g2.fillStyle=pb; g2.fillRect(0,0,(W2*CEL+N)*TEX_K,(H2*CEL+N)*TEX_K); g2.setTransform(1,0,0,1,0,0); g2.globalCompositeOperation="source-over"; }
      if(t!=="vapor"&&t!=="luz"&&!SOLO_MULT[t]){ const liq=t==="agua"||t==="lama"||t==="fogo"||t==="eletrico"||t==="gelo";
        if(!ent.s||ent.s.width!==uw||ent.s.height!==uh){ ent.s=document.createElement("canvas"); ent.s.width=uw; ent.s.height=uh; }
        const gs=ent.s.getContext("2d"); gs.globalCompositeOperation="source-over"; gs.clearRect(0,0,uw,uh); gs.drawImage(ent.u,0,0); gs.globalCompositeOperation="source-in"; gs.fillStyle=tom(COR_SOLO[t][0],0.4); gs.fillRect(0,0,uw,uh); gs.globalCompositeOperation="source-over";
        g.globalCompositeOperation="destination-over"; g.globalAlpha=liq?0.75:0.45; g.drawImage(ent.s,0,(liq?1.2:0.7)*Kb,bw,bh); g.globalAlpha=1; }
      g.globalCompositeOperation="source-over"; } }
}
// ================================================================ arte real (folhas do Copilot, via importador): usa no lugar dos sprites procedurais
// ARTE_IMG[nome] devolve a imagem; se ela está no manifesto e ainda não foi pedida, começa a baixar na hora (sob demanda).
// Quem usa confere .pronta: enquanto não chega, o jogo segue com o desenho por código.
let MANIFESTO=null;
const ARTE_IMG=new Proxy({},{ get(t,k){ if(typeof k==="string"&&!(k in t)&&MANIFESTO&&MANIFESTO[k]) registrarArte(k,MANIFESTO[k]); return t[k]; } }), cacheArte=new Map();
// o cache de recortes tem limite (o Safari do iPhone limita a memória total dos canvas): passando de 700, os mais antigos saem
{ const set0=cacheArte.set.bind(cacheArte); cacheArte.set=(k,v)=>{ if(cacheArte.size>700){ let n=0; for(const kk of cacheArte.keys()){ cacheArte.delete(kk); if(++n>=200) break; } } return set0(k,v); }; }
let ARTE_PEND=0;
// algumas folhas vieram com um fundo quase transparente em cada célula (vira quadrado cinza no chão): zera o alfa muito baixo.
// Só em enfeites, fauna, inimigos, objetos e marcos; brilhos e névoa (efeitos, paredão) ficam como estão
function limparFundo(nome,img){ const forte=/__(tiles|fauna|inimigos|objetos|props|mini)\.png$/.test(nome);
  // ruído da compressão: pixels com alfa 1 a 11 em volta dos desenhos (invisíveis sozinhos, mas viram retângulos em silhuetas,
  // contornos e brilhos somados). Zera em toda folha de personagem e cenário; efeitos, telas e pisos ficam como estão.
  const leve=!forte&&/^arte\/(monstros|lendarios|lendas|panteao)\/|__(chefe|anim|pecas|efeitos)\.png$/.test(nome);
  if(!forte&&!leve) return;
  try{ const c=document.createElement("canvas"); c.width=img.width; c.height=img.height; const g=c.getContext("2d"); g.drawImage(img,0,0); const im=g.getImageData(0,0,c.width,c.height), d=im.data;
    if(forte) for(let i=3;i<d.length;i+=4){ const a=d[i]; if(a<56) d[i]=0; else if(a<110) d[i]=Math.round((a-56)/54*110); }
    else for(let i=3;i<d.length;i+=4) if(d[i]<12) d[i]=0;
    g.putImageData(im,0,0); c.pronta=true; c.complete=true; ARTE_IMG[nome]=c; }catch(e){} }
function registrarArte(nome,src){ const img=new Image(); img.decoding="async"; ARTE_PEND++; ARTE_IMG[nome]=img;
  img.onload=()=>{ img.pronta=true; ARTE_PEND--; limparFundo(nome,img); novaArte(nome); };
  img.onerror=()=>{ ARTE_PEND--; img.falhou=true; }; img.src=src; }
// avisa o jogo das artes que chegaram, em lote (no máximo umas 4 vezes por segundo): os recortes guardados usam o número
// de cada imagem, então nada precisa ser apagado; só o chão e os enfeites do mapa, que foram montados sem a arte, são refeitos
let artesNovas=[], tArtes=null;
function novaArte(nome){ artesNovas.push(nome); if(tArtes) return; tArtes=setTimeout(()=>{ const ns=artesNovas; artesNovas=[]; tArtes=null;
  if(typeof aplicarArteUI==="function") aplicarArteUI(); if(typeof arteCarregou==="function") arteCarregou(ns); }, 250); }
// pede (sem esperar) uma lista de artes; devolve uma promessa que termina quando todas chegaram ou falharam
function preCarregar(nomes){ return Promise.all(nomes.filter(n=>MANIFESTO&&MANIFESTO[n]).map(n=>new Promise(ok=>{ const img=ARTE_IMG[n]; if(!img||img.pronta||img.falhou||img.complete) return ok();
  img.addEventListener("load",ok,{once:true}); img.addEventListener("error",ok,{once:true}); }))); }
const artesQue=f=>MANIFESTO? Object.keys(MANIFESTO).filter(f) : [];
// artes de um mapa: o reino (arte da abertura primeiro), o Guardião da era, a equipe, a Lenda/deus, chão dos elementos e efeitos
function artesDoMapa(u){ if(!u) return []; const pre=`arte/reinos/${u.era}/`, ord=["keyart","piso","tiles","props","inimigos","pecas","paredao","objetos","fauna","fundo","mini","chefe","efeitos","anim"];
  const reino=artesQue(n=>n.startsWith(pre+u.id+"__")||n.startsWith(pre+"guardiao_"+u.era+"__")).sort((a,b)=>{ const i=n=>{ const k=ord.findIndex(o=>n.includes("__"+o)); return k<0?99:k; }; return i(a)-i(b); });
  const equipe=[]; if(R) for(const s of R.selos){ if(!s.mon) continue; const l=LINHA[s.mon.id]; if(!l) continue; const pasta=l.ancestral? "arte/lendarios/" : `arte/monstros/${l.elemento}/`; equipe.push(...artesQue(n=>n.startsWith(pasta+s.mon.id+"__"))); }
  const lenda=typeof LENDA==="function"&&LENDA(); const extra=lenda? artesQue(n=>n===`arte/lendas/${lenda.id}.png`||n===`arte/panteao/${lenda.id}.png`) : [];
  return [...reino,...equipe,...extra,...artesQue(n=>n.startsWith("arte/ambiente/")||n.startsWith("arte/efeitos/reacao"))]; }
// artes em arquivos: arte/manifesto.json lista { "nome usado no código": "caminho do arquivo" }.
// Na abertura baixa só a interface e as imagens fixas dos monstros (menu e cartas); o resto vem por mapa ou quando for usado.
if(window.ARTE_MANIFESTO){ const av=document.createElement("div");
  av.style.cssText="position:fixed;left:50%;top:calc(8px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:60;background:rgba(18,14,26,.88);color:#f2e7c9;border:1px solid #d6ab4f;padding:5px 12px;font:600 12px Nunito,system-ui,sans-serif;border-radius:4px;pointer-events:none;transition:opacity .4s";
  av.textContent="Carregando artes…"; (document.body||document.documentElement).appendChild(av);
  (async()=>{ try{
      const r=await fetch(window.ARTE_MANIFESTO,{cache:"no-cache"}); MANIFESTO=await r.json();
      const UI_USADA=/^arte\/ui\/(ui__(botao_primario|botao_secundario|botoes_acao|hud_icones|logo|pacto|tela_horizontal|tela_vertical|camada_ceu|camada_criaturas|camada_frente|derrota|vitoria|refugio|livro)|talismas|insignias)\.png$/;
      const base=artesQue(n=>UI_USADA.test(n)||/^arte\/monstros\/.*__base\.png$/.test(n)||/^arte\/lendarios\/.*__base\.png$/.test(n));
      let feitos=0; const total=base.length;
      // em blocos de 24 para não sufocar a rede do celular
      for(let i=0;i<total;i+=24){ await preCarregar(base.slice(i,i+24)); feitos=Math.min(total,i+24); av.textContent=`Carregando artes ${feitos}/${total}…`; }
      av.textContent="Artes carregadas";
      if(J&&R) preCarregar(artesDoMapa(UNIV[R.universo]));
    }catch(e){ console.warn("manifesto de artes",e); av.textContent="Sem artes: usando o desenho por código"; }
    setTimeout(()=>{ av.style.opacity="0"; setTimeout(()=>av.remove(),450); },1800); })(); }
function arteMonstro(id,e,ramo,rar){
  const l=LINHA[id]; if(!l) return null;
  if(l.ancestral){ const img=ARTE_IMG[`arte/lendarios/${id}__base.png`]; if(!img||!img.pronta) return null; const k=`${id}|anc|${e}`; if(cacheArte.has(k)) return cacheArte.get(k);
    const cw=img.width/5, c=encaixarArte(img,(e+1)*cw,0,cw,img.height,Math.round(ALVO_ARTE[e]*1.15)); cacheArte.set(k,c); return c; }
  const sufixo=rar==="lendario"?"lendario":rar==="epico"?"epico":"base";
  const img=ARTE_IMG[`arte/monstros/${l.elemento}/${id}__${sufixo}.png`]||ARTE_IMG[`arte/monstros/${l.elemento}/${id}__base.png`];
  if(!img||!img.pronta) return null;
  const celula=e<=1? e : e===2? 2+(ramo??0) : 5+(ramo??0), k=`${id}|${celula}|${sufixo}|${e}`; if(cacheArte.has(k)) return cacheArte.get(k);
  const cw=img.width/4, ch=img.height/2, c=encaixarArte(img,(celula%4)*cw,Math.floor(celula/4)*ch,cw,ch,ALVO_ARTE[e]); cacheArte.set(k,c); return c;
}
// ---------------------------------------------------------------- animação dos monstros
// Folhas arte/monstros/<el>/<id>__anim_N.png (N = forma 1..8), grade 6x3:
// linha 0 parado, linha 1 andando, linha 2 atacando (até 6 quadros cada).
// As folhas não seguem a grade à risca: o desenho de uma linha às vezes passa da marca de 1/3 (pés cortados,
// pedaço do quadro de cima aparecendo no de baixo). Por isso cada folha é "fatiada" uma vez: os cortes vão para a
// linha (e a coluna) vazia mais próxima da grade, e cada quadro é alinhado pelos pés e pelo centro do corpo.
const FPS_ANIM=[6,11,15], cacheFatia=new Map();
const alfaDe=img=>{ const c=document.createElement("canvas"); c.width=img.width; c.height=img.height; const g=c.getContext("2d"); g.drawImage(img,0,0); return g.getImageData(0,0,c.width,c.height).data; };
// melhor corte perto de "nom" (entre lo e hi): linha sem desenho vale muito mais do que ficar perto da grade
function melhorCorte(cont,nom,lo,hi){ let best=nom, bc=1e18; for(let b=Math.max(1,Math.round(lo));b<=Math.min(cont.length-1,Math.round(hi));b++){ const c=(cont[b]>0?1e6+cont[b]*100:0)+Math.abs(b-nom); if(c<bc){ bc=c; best=b; } } return best; }
function fatiarFolha(img,cols,rows,rigido){ if(!img._id) img._id=++ID_IMG; const k=img._id+"|"+cols+"x"+rows+(rigido?"r":""); if(cacheFatia.has(k)) return cacheFatia.get(k);
  // rigido: colunas na grade; o corte entre linhas só sai da grade para uma linha vazia a até 1/4 de célula
  const W=img.width, H=img.height, cw=W/cols, ch=H/rows; let d=null; try{ d=alfaDe(img); }catch(e){}
  const cheio=(x,y)=>d[(y*W+x)*4+3]>24;
  // cortes das linhas
  const lin=new Int32Array(H); if(d) for(let y=0;y<H;y++){ let n=0; for(let x=0;x<W;x++) if(cheio(x,y)) n++; lin[y]=n; }
  let cy=[0]; for(let r=1;r<rows;r++){ if(rigido){ const b=d? melhorCorte(lin,r*ch,r*ch-ch*0.25,r*ch+ch*0.25) : r*ch; cy.push(d&&lin[b]===0? b : Math.round(r*ch)); } else cy.push(d? melhorCorte(lin,r*ch,Math.max(cy[r-1]+ch*0.4,r*ch-ch*0.5),r*ch+ch*0.5) : Math.round(r*ch)); } cy.push(H);
  // se alguma linha ficou sem desenho (folha com tudo deslocado), procura os dois cortes juntos exigindo desenho em cada faixa
  if(d&&rows===3&&!rigido){ const acum=new Float64Array(H+1); for(let y=0;y<H;y++) acum[y+1]=acum[y]+lin[y]; const tem=(a,b)=>acum[b]-acum[a]>0, custo=(b,nom)=>(lin[b]>0?1e6+lin[b]*100:0)+Math.abs(b-nom);
    if(!tem(cy[0],cy[1])||!tem(cy[1],cy[2])||!tem(cy[2],cy[3])){ let bc=1e18, b1=cy[1], b2=cy[2];
      for(let a=Math.round(ch*0.3);a<=Math.round(ch*1.7);a++){ if(!tem(0,a)) continue; for(let b=a+Math.round(ch*0.3);b<=Math.min(H-2,Math.round(ch*2.7));b++){ if(!tem(a,b)||!tem(b,H)) continue; const c=custo(a,ch)+custo(b,2*ch); if(c<bc){ bc=c; b1=a; b2=b; } } }
      cy=[0,b1,b2,H]; } }
  const linhas=[];
  for(let r=0;r<rows;r++){ const y0=cy[r], y1=cy[r+1];
    const col=new Int32Array(W); if(d) for(let x=0;x<W;x++){ let n=0; for(let y=y0;y<y1;y++) if(cheio(x,y)) n++; col[x]=n; }
    const cx=[0]; for(let c=1;c<cols;c++) cx.push(d&&!rigido? melhorCorte(col,c*cw,Math.max(cx[c-1]+cw*0.4,c*cw-cw*0.35),c*cw+cw*0.35) : Math.round(c*cw)); cx.push(W);
    const qs=[]; for(let c=0;c<cols;c++){ const x0=cx[c], x1=cx[c+1]; let bx0=x1, by0=y1, bx1=-1, by1=-1, n=0;
      if(d) for(let y=y0;y<y1;y++) for(let x=x0;x<x1;x++) if(cheio(x,y)){ n++; if(x<bx0)bx0=x; if(x>bx1)bx1=x; if(y<by0)by0=y; if(y>by1)by1=y; }
      if(!d){ bx0=x0; by0=y0; bx1=x1-1; by1=y1-1; n=1; }
      if(bx1>=0) qs.push({c,x0,x1,y0,y1,bx:bx0,by:by0,bw:bx1-bx0+1,bh:by1-by0+1,n,ref:c*cw}); }
    // pedaços soltos (sobra do quadro vizinho) não contam como quadro
    const med=qs.length? qs.map(q=>q.n).sort((a,b)=>a-b)[Math.floor(qs.length/2)] : 0, ok=qs.filter(q=>q.n>=med*0.18);
    // pés = ponto mais baixo da linha; centro = mediana dos centros (cada quadro relativo à sua célula da grade)
    const pe=ok.length? Math.max(...ok.map(q=>q.by+q.bh)) : y1, cs=ok.map(q=>q.bx+q.bw/2-q.ref).sort((a,b)=>a-b), centro=cs.length? cs[Math.floor(cs.length/2)] : cw/2;
    linhas.push({qs:ok,pe,centro}); }
  // tamanho do corpo (parado e andando alinhados pelos pés e pelo centro): define a escala da folha inteira
  let esq=0, dir=0, alto=1; for(const L of linhas.slice(0,Math.min(2,rows))) for(const q of L.qs){ esq=Math.min(esq,q.bx-q.ref-L.centro); dir=Math.max(dir,q.bx+q.bw-q.ref-L.centro); alto=Math.max(alto,L.pe-q.by); }
  const f={linhas,corpoW:Math.max(1,dir-esq),corpoH:alto,cw,ch,valida:!!d&&linhas.length>0&&linhas[0].qs.length>0}; cacheFatia.set(k,f); return f; }
// Épico e Lendário não têm folha de animação própria, mas têm a mesma pose da forma comum com outras cores:
// monta uma tabela de cores (comum -> raridade) com a célula fixa das duas e pinta os quadros da folha comum com ela.
// A tabela é suavizada (média com as cores vizinhas) e o brilho de cada pixel é mantido, para não perder o detalhe.
const cacheRecor=new Map();
function folhaRecolorida(anim,base,alvo,celula){ const k=(anim._id||(anim._id=++ID_IMG))+"|"+(alvo._id||(alvo._id=++ID_IMG))+"|"+celula; if(cacheRecor.has(k)) return cacheRecor.get(k);
  let out=null; try{
    const cel=im=>{ const cw=im.width/4, ch=im.height/2, c=document.createElement("canvas"); c.width=64; c.height=64; const g=c.getContext("2d"); g.imageSmoothingEnabled=false; g.drawImage(im,(celula%4)*cw,Math.floor(celula/4)*ch,cw,ch,0,0,64,64); return g.getImageData(0,0,64,64).data; };
    const b=cel(base), e=cel(alvo), N=16, N3=N*N*N, chave=(d,i)=>((d[i]>>4)*N+(d[i+1]>>4))*N+(d[i+2]>>4);
    // desenho da raridade muito diferente do comum (formas que se sobrepõem pouco): a troca de cores sairia borrada; usa a imagem fixa
    let uni=0, inter=0; for(let i=3;i<b.length;i+=4){ const x=b[i]>40, y=e[i]>40; if(x||y) uni++; if(x&&y) inter++; } if(!uni||inter/uni<0.72) throw 0;
    let n=new Float32Array(N3), s=new Float32Array(N3*3), m=new Float32Array(N3*3);
    for(let i=0;i<b.length;i+=4){ if(b[i+3]<160||e[i+3]<160) continue; const q=chave(b,i); n[q]++; for(let c=0;c<3;c++){ s[q*3+c]+=e[i+c]; m[q*3+c]+=b[i+c]; } }
    // caixa 3D separável (borda repetida), para espalhar as cores conhecidas para as vizinhas
    const caixa=(a,comp,r)=>{ let src=a; for(let eixo=0;eixo<3;eixo++){ const o=new Float32Array(src.length), st=eixo===0?N*N:eixo===1?N:1;
        for(let i=0;i<N3;i++){ const p=Math.floor(i/st)%N; for(let c=0;c<comp;c++){ let t=0; for(let j=-r;j<=r;j++){ const pp=Math.min(N-1,Math.max(0,p+j)); t+=src[(i+(pp-p)*st)*comp+c]; } o[i*comp+c]=t; } } src=o; } return src; };
    const L=new Float32Array(N3*3), M=new Float32Array(N3*3), feito=new Uint8Array(N3);
    for(const r of [0,1,2,4,8,16]){ const nn=r?caixa(n,1,r):n, ss=r?caixa(s,3,r):s, mm=r?caixa(m,3,r):m;
      for(let i=0;i<N3;i++) if(!feito[i]&&nn[i]>1e-6){ feito[i]=1; for(let c=0;c<3;c++){ L[i*3+c]=ss[i*3+c]/nn[i]; M[i*3+c]=mm[i*3+c]/nn[i]; } } }
    const c=document.createElement("canvas"); c.width=anim.width; c.height=anim.height; const g=c.getContext("2d"); g.drawImage(anim,0,0);
    const im=g.getImageData(0,0,c.width,c.height), d=im.data;
    for(let i=0;i<d.length;i+=4){ if(!d[i+3]) continue; const q=chave(d,i), lum=d[i]*.3+d[i+1]*.59+d[i+2]*.11, lm=M[q*3]*.3+M[q*3+1]*.59+M[q*3+2]*.11, dl=lum-lm;
      d[i]=L[q*3]+dl; d[i+1]=L[q*3+1]+dl; d[i+2]=L[q*3+2]+dl; }
    g.putImageData(im,0,0); c.pronta=true; c._id=++ID_IMG; out=c;
  }catch(err){ out=null; }
  cacheRecor.set(k,out); return out; }
// As folhas dos dragões ancestrais vieram de originais 3:2 (1536x1024) reduzidos para 2:1 (384x192): o desenho ficou 25% mais baixo.
// Enquanto não forem convertidas de novo (ferramentas/converter_artes mantém a proporção), a altura é corrigida aqui.
function correcaoAltura(img){ if(img._ky!=null) return img._ky; let k=1; for(const [n,i] of Object.entries(ARTE_IMG)) if(i===img){ if(n.startsWith("arte/lendarios/")&&Math.abs(img.width/img.height-2)<0.01) k=4/3; break; } return img._ky=k; }
// quadro (linha, índice do quadro) da folha, num canvas quadrado com folga: corpo na escala "alvo", pés na mesma linha em todos
const FOLGA_ANIM=1.6;
function quadroAnim(img,row,i,alvo,cor,rows,folga){ rows=rows||3; folga=folga||FOLGA_ANIM; const fo=cor||img, k=(fo._id||(fo._id=++ID_IMG))+"|q"+row+"|"+i+"|"+alvo+"|"+rows+"|"+folga; if(cacheArte.has(k)) return cacheArte.get(k);
  const f=fatiarFolha(img,6,rows), L=f.linhas[row], q=L&&L.qs[i]; if(!q) return null;
  const ky=correcaoAltura(img), s=Math.min(alvo/f.corpoW,alvo/(f.corpoH*ky)), A=Math.round(alvo*folga), peD=A/2+alvo/2;
  let dx=A/2+(q.x0-q.ref-L.centro)*s, dy=peD+(q.y0-L.pe)*s*ky; const dw=(q.x1-q.x0)*s, dh=(q.y1-q.y0)*s*ky; if(Math.abs(s-1)<1e-6&&ky===1){ dx=Math.round(dx); dy=Math.round(dy); }
  const c=document.createElement("canvas"); c.width=c.height=A; const g=c.getContext("2d"); g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
  g.drawImage(fo,q.x0,q.y0,q.x1-q.x0,q.y1-q.y0,dx,dy,dw,dh); c._src={img:fo,sx:q.x0,sy:q.y0,sw:q.x1-q.x0,sh:q.y1-q.y0,dest:[dx/A,dy/A,dw/A,dh/A]}; c._alvo=alvo; c._pe=peD;
  cacheArte.set(k,c); return c; }
// folha de animação da forma atual (com as cores da raridade), ou null
function folhaAnimMonstro(id,e,ramo,rar){ const l=LINHA[id]; if(!l) return null;
  if(l.ancestral){ const img=ARTE_IMG[`arte/lendarios/${id}__anim_${e+1}.png`]; return img&&img.pronta&&fatiarFolha(img,6,3).valida? {img,cor:null} : null; }
  const celula=e<=1? e : e===2? 2+(ramo??0) : 5+(ramo??0), img=ARTE_IMG[`arte/monstros/${l.elemento}/${id}__anim_${celula+1}.png`];
  if(!img||!img.pronta||!fatiarFolha(img,6,3).valida) return null; if(rar!=="epico"&&rar!=="lendario") return {img,cor:null};
  const base=ARTE_IMG[`arte/monstros/${l.elemento}/${id}__base.png`], alvo=ARTE_IMG[`arte/monstros/${l.elemento}/${id}__${rar}.png`];
  if(!base||!base.pronta||!alvo||!alvo.pronta) return null; const cor=folhaRecolorida(img,base,alvo,celula); return cor? {img,cor} : null; }
// o relógio do mapa (J.t) recomeça a cada mapa: horários guardados do mapa anterior viram valores negativos
// (o golpe "durava" para sempre e esticava o monstro para fora da tela). Zera tudo ao começar um mapa.
function resetAnimSelo(s){ s.atkT=null; s._t0=0; s._row=null; s._ax=s._ay=s._at=null; s._td=null; s._tf=null; s._vel=0; s._vx=0; s._fase=0; s._pop=0; s._vira=0; }
// estado de movimento de um Selo (velocidade suavizada, ataque, direção): usado pela animação e pelos efeitos de corpo
function movSelo(s){ const dtA=J.t-(s._at??J.t), dx=s._ax==null?0:s.x-s._ax, dy=s._ay==null?0:s.y-s._ay, d=Math.hypot(dx,dy); s._ax=s.x; s._ay=s.y; s._at=J.t;
  if(dtA>0&&d<25){ const k=Math.min(1,dtA*14); s._vel=(s._vel||0)*(1-k)+(d/dtA)*k; s._vx=(s._vx||0)*(1-k)+(dx/dtA)*k; } }
// quadro atual do monstro de um Selo, ou null (sem folha de animação: usa a imagem fixa)
function quadroAnimSelo(s){ if(SIM.ativo||!J||!s.mon) return null; const e=est(s), fa=folhaAnimMonstro(s.mon.id,e,ramoAtual(s),s.mon.rar); if(!fa) return null;
  const f=fatiarFolha(fa.img,6,3), nAtk=f.linhas[2]? f.linhas[2].qs.length : 0;
  let row= s.atkT!=null&&nAtk>=2&&J.t>=s.atkT&&J.t-s.atkT<nAtk/FPS_ANIM[2]? 2 : (s._vel||0)>6? 1 : 0;
  if(!f.linhas[row]||f.linhas[row].qs.length<2) row=0; const n=f.linhas[row].qs.length; if(n<1) return null;
  if(row!==1){ const alvo=maisProximo(s,160); if(alvo) s.esq=alvo.x<s.x; } else if(Math.abs(s._vx||0)>3) s.esq=s._vx<0;
  if(row!==s._row){ s._row=row; s._t0=J.t; s._fase=0; }
  // andando: a cadência acompanha a velocidade (pés não "patinam" no chão)
  const dtF=Math.min(0.1,Math.max(0,J.t-(s._tf??J.t))); s._tf=J.t;
  if(row===1) s._fase=(s._fase||0)+dtF*FPS_ANIM[1]*Math.max(0.6,Math.min(1.8,(s._vel||0)/45));
  const fr= row===2? Math.min(n-1,Math.floor((J.t-s._t0)*FPS_ANIM[2])) : row===1? Math.floor(s._fase)%n : Math.floor((J.t-s._t0)*FPS_ANIM[0])%n;
  return quadroAnim(fa.img,row,fr,ALVO_ARTE[e]*(LINHA[s.mon.id].ancestral?1.15:1),fa.cor); }

// ================================================================ entrada
const teclas=new Set(); let toque=null, ultimoToque=0;
addEventListener("pointerdown",()=>pularAbertura());
addEventListener("keydown",e=>{ pularAbertura(); const k=e.key.toLowerCase(); teclas.add(k); if(e.key===" ") usarDespertar(); if(k==="shift") esquivar(); if(k==="e") usarCombinado(); });
addEventListener("keyup",e=>teclas.delete(e.key.toLowerCase()));
cv.addEventListener("pointerdown",e=>{ const agora=performance.now(); if(agora-ultimoToque<260) esquivar(); ultimoToque=agora;
  toque={ox:e.clientX,oy:e.clientY,x:e.clientX,y:e.clientY,id:e.pointerId}; cv.setPointerCapture(e.pointerId); });
cv.addEventListener("pointermove",e=>{ if(toque&&e.pointerId===toque.id){ toque.x=e.clientX; toque.y=e.clientY; } });
const soltar=e=>{ if(toque&&e.pointerId===toque.id) toque=null; }; cv.addEventListener("pointerup",soltar); cv.addEventListener("pointercancel",soltar);
document.addEventListener("visibilitychange",()=>{ if(document.hidden&&rodando&&!pausado) pausar(); });
$("btnUlt").onclick=()=>usarDespertar(); $("btnComb").onclick=()=>usarCombinado(); $("btnEsq").onclick=()=>esquivar(); $("btnBolsa").onclick=()=>abrirBolsa();
$("btnPausa").onclick=()=>{ if(!pausado) pausar(); };
function esquivar(){ if(!J||pausado||J.dashCd>0) return; J.usouEsquiva=true; J.dashCd=D.esquiva.recarga_seg; J.dashT=0.15; J.invuln=D.esquiva.invulneravel_seg; particulas(J.jogador.x,J.jogador.y,"#9fd6d0",8,50); }
function usarDespertar(){
  if(!J||J.ult<100||pausado) return; J.ult=0; J.desp=D.despertar.duracao_seg; R.st.despertares++; ativos().forEach(s=>s.tmpRamo=null);
  FONTE="despertar"; const els=[...new Set(ativos().map(elementoDe))], dano=ativos().reduce((t,s)=>t+atrib(s).dano,0)*2.5;
  for(const e of J.inimigos){ if(Math.abs(e.x-J.jogador.x)<VW/2+10&&Math.abs(e.y-J.jogador.y)<VH/2+10) els.forEach(el=>ferir(e,dano/els.length,el)); }
  ativos().forEach(s=>efeitoEvolucao(s)); calcularSinergia(); desenharEquipe();
  J.flash={vida:.5,cor:COR[els[0]]}; tremor(12); parar(0.15); texto(J.jogador.x,J.jogador.y-24,"Despertar Elemental!","#ffd34a",24);
}

// ================================================================ loop
let ultimoT=0;
// qualidade automática: mede o tempo de cada quadro e, se o aparelho não der conta, reduz primeiro o que menos se nota
let QUAL=2, MSQ=16.7, tQual=0, ultimoQuadro=0, desenhouPausado=false;
// - limite de 60 quadros por segundo (telas de 120 Hz desenhavam o dobro sem ganho);
// - pausado (cartas, baú, cenas) ou em segundo plano: desenha um quadro e para, em vez de redesenhar a mesma imagem 60 vezes por segundo;
// - qualidade pelo tempo real entre quadros (inclui o trabalho da placa de vídeo, que é onde o celular esquenta)
document.addEventListener("visibilitychange",()=>{ ultimoT=performance.now(); desenhouPausado=false; });
function mudarQual(q){ if(q===QUAL) return; QUAL=q; tQual=performance.now()/1000; redimensionar(); if(typeof chao!=="undefined"&&chao&&chao.pat) chao.pat=null; }
function passo(t){ requestAnimationFrame(passo); if(document.hidden) return;
  if(t-ultimoQuadro<15.5) return; const intervalo=t-ultimoQuadro; ultimoQuadro=t;
  let dt=Math.min(0.05,(t-ultimoT)/1000||0); ultimoT=t;
  if(!rodando||!J) return; const parado=pausado||CINE.ativa;
  if(parado&&desenhouPausado&&!J.intro) return;
  if(!pausado&&!CINE.ativa) tick(dt);
  if(J){ desenhar(dt); desenhouPausado=parado;
    if(!parado&&intervalo<200){ MSQ=MSQ*0.95+intervalo*0.05; const agora=t/1000;
      if(MSQ>21&&QUAL>0&&agora-tQual>2.5){ mudarQual(QUAL-1); MSQ=16.7; } else if(MSQ<17.6&&QUAL<2&&agora-tQual>10){ mudarQual(QUAL+1); } } } }
function tick(dt){ if(J.hitstop>0){ J.hitstop-=dt; return; } if(J.lento>0){ J.lento-=dt; dt*=0.3; } if(J.deus) J.vida=J.vidaMax; atualizar(dt); if(J&&J.deus) J.vida=J.vidaMax; }
function atualizar(dt){
  if(J.intro&&passoAbertura(dt)) return;
  J.t+=dt; const P=J.jogador, rm=SIN.rm;
  if(J.agenda.length){ const vence=J.agenda.filter(a=>a.t<=J.t); J.agenda=J.agenda.filter(a=>a.t>J.t); vence.forEach(a=>a.fn()); if(!J) return; }
  ["dashCd","invuln","buffCad","canto","fervor","reducao","regen","grito","totemAnc"].forEach(k=>{ if(J[k]>0) J[k]-=dt; });
  if(J.comb>0) J.comb-=dt;
  if(J.comboT>0){ J.comboT-=dt; if(J.comboT<=0) J.combo=0; }
  if(J.desp>0){ J.desp-=dt; if(J.desp<=0){ ativos().forEach(s=>s.tmpRamo=null); calcularSinergia(); desenharEquipe(); toast("O Despertar terminou."); } else if(Math.random()<.5) ativos().forEach(s=>particulas(s.x,s.y+4,COR[elementoDe(s)],1,25)); }
  R.selos.forEach(s=>{ if(s.trocaCd>0) s.trocaCd-=dt; });
  // movimento e esquiva
  let mx=0,my=0; if(teclas.has("w")||teclas.has("arrowup"))my--; if(teclas.has("s")||teclas.has("arrowdown"))my++; if(teclas.has("a")||teclas.has("arrowleft"))mx--; if(teclas.has("d")||teclas.has("arrowright"))mx++;
  if(toque){ const dx=toque.x-toque.ox, dy=toque.y-toque.oy, d=Math.hypot(dx,dy); if(d>6){ mx=dx/Math.max(d,40); my=dy/Math.max(d,40); } }
  if(SIM.entrada){ const v=SIM.entrada(); mx=v.x; my=v.y; if(v.esquivar) esquivar(); if(v.despertar) usarDespertar(); if(v.combinado) usarCombinado(); }
  const mm=Math.hypot(mx,my); if(mm>1){mx/=mm; my/=mm;} if(mm>0.1) J.dir={x:mx,y:my};
  if(J.dashT>0){ J.dashT-=dt; const dn=Math.hypot(J.dir.x,J.dir.y)||1; P.x+=J.dir.x/dn*D.esquiva.distancia/0.15*dt; P.y+=J.dir.y/dn*D.esquiva.distancia/0.15*dt;
    J.fantasmas.push({x:P.x,y:P.y,spr:gerarSprite("invocador-capa",9,"#d6ab4f",{olhos:"#7fe0ff"}),vida:.18}); }
  else { const sj=soloEm(Math.floor(P.x/CEL),Math.floor(P.y/CEL)); J.soloJog=sj; const ac=sj==="gelo"?0.05:1, vmul=(J.imparavel? 1 : (sj==="lama"?0.7:1)*(J.atordoa>0?0.45:1))*tal.velocidade()*(1+passiva("velocidade")+custo("velocidade")); J.pvx+=(mx*58*rm.vel*vmul-J.pvx)*Math.min(1,ac*60*dt); J.pvy+=(my*58*rm.vel*vmul-J.pvy)*Math.min(1,ac*60*dt); P.x+=J.pvx*dt; P.y+=J.pvy*dt; }
  atualizarSolo(dt);
  const form=[[-13,9],[13,9],[0,-12]];
  R.selos.forEach((s,i)=>{ if(!s.mon) return; const dxF=(P.x+form[i][0]-s.x); if(dxF<-1) s.esq=true; else if(dxF>1) s.esq=false; s.x+=dxF*Math.min(1,dt*6); s.y+=(P.y+form[i][1]-s.y)*Math.min(1,dt*6); agirSelo(s,dt); });
  if(rm.regen) curar(J.vidaMax*rm.regen*dt);
  if(J.regen>0) curar(J.vidaMax*J.regenV*dt);
  // spawns: inimigos, ovos e filhotes
  if(!J.fim){
    if(J.t<MAPA_SEG){ J.spawn+=dt*(DIF.base+J.t*DIF.cresc)*(1+R.profundidade*DIF.spawn)*multDiretor(); while(J.spawn>1&&J.inimigos.length<DIF.max){ J.spawn--; spawnInimigo(); }
      atualizarDiretor(dt); atualizarEventos(dt); }   // o diretor de horda decide densidade e ondas especiais (diretor.js)
    if(!J.miniFeito&&J.t>=MINI_SEG){ J.miniFeito=true; spawnChefe(true); }
    if(!J.chefeFeito&&J.t>=MAPA_SEG){ J.chefeFeito=true; spawnChefe(false); }
    J.tOvo-=dt; if(J.tOvo<=0){ J.tOvo=D.ovos.intervalo_ovo_seg*rnd(.8,1.2); spawnOvo(); }
    J.tFilhote-=dt; if(J.tFilhote<=0){ J.tFilhote=D.ovos.intervalo_filhote_seg*rnd(.8,1.2); spawnFilhote(); }
  } else if(J.portalEm!=null){ J.portalEm-=dt/(J.lento>0?0.3:1); if(J.portalEm<=0){ J.portalEm=null; mostrarPortais(); } }
  // inimigos
  for(const e of J.inimigos){
    if(e.escAlvo&&e.esc!==e.escAlvo){ e.esc=Math.min(e.escAlvo,(e.esc||1)+dt*0.7); if(e.esc>=e.escAlvo) e.escAlvo=null; } if(e.virouElite>0) e.virouElite-=dt;
    if(e.flash>0) e.flash-=dt; if(e.reacCd>0) e.reacCd-=dt; if(e.vulner>0) e.vulner-=dt; if(e.cego>0) e.cego-=dt;
    if(e.dotT>0){ e.dotT-=dt; danoSimples(e,e.dot*dt); }
    if(e.congela>0){ e.congela-=dt; continue; }
    const sol=efeitoSoloInimigo(e,dt); const f=(e.lenta>0?0.45:1)*sol.vel; if(e.lenta>0) e.lenta-=dt;
    let tx=P.x, ty=P.y; const guarda=J.crias.find(c=>c.guarda&&dist2(c,e)<400); if(guarda){ tx=guarda.x; ty=guarda.y; }
    const dx=tx-e.x, dy=ty-e.y, d=Math.hypot(dx,dy)||1; const ac=sol.gelo?0.04:1; e.vx=(e.vx??dx/d*e.v)+(dx/d*e.v*f-(e.vx??0))*ac; e.vy=(e.vy??dy/d*e.v)+(dy/d*e.v*f-(e.vy??0))*ac; const ps=passoCriatura(e,dt,P); e.x+=e.vx*dt*ps.m+ps.dx; e.y+=e.vy*dt*ps.m+ps.dy;
    if(e.hp<=0) continue;
    const dP=Math.hypot(P.x-e.x,P.y-e.y);
    if(dP<e.r+5&&J.invuln<=0&&!e.oculto&&!(e.surgindo>0)&&!e.estatua&&!e.noAr){ let dano=ameacaDiretor()*tal.defesa()*e.dano*dt*(e.cego>0?0.3:1)*(J.reducao>0?0.7:1); if(J.escudo>0){const a=Math.min(J.escudo,dano); J.escudo-=a; dano-=a;} J.vida-=dano; J.danoRec=(J.danoRec||0)+dano; R.st.recContato+=dano; }
    if(e.elite&&!e.chefe&&!e.mini&&DIF.tiroElite>0&&R.profundidade>=1&&!J.fim){ e.tiro=(e.tiro??DIF.tiroElite)-dt; if(e.tiro<=0&&dP<150){ e.tiro=DIF.tiroElite; const a=Math.atan2(P.y-e.y,P.x-e.x); for(const da of [-0.2,0,0.2]) J.balas.push({x:e.x,y:e.y,vx:Math.cos(a+da)*55,vy:Math.sin(a+da)*55,vida:4,dano:e.dano*0.6}); } }
    if((e.chefe||e.mini)&&!J.fim&&!iaChefe(e,dt,P)){ e.rajada-=dt; e.investida-=dt;
      if(e.rajada<=0){ e.rajada=e.chefe?2.6:3.5; const n=e.chefe?14:8, off=Math.random(); for(let i=0;i<n;i++){ const a=(i+off)/n*Math.PI*2; J.balas.push({x:e.x,y:e.y,vx:Math.cos(a)*42,vy:Math.sin(a)*42,vida:5,dano:e.dano*0.7}); } anel(e.x,e.y,e.r+6,"#ff5a4a",.3); }
      if(e.investida<=0){ e.investida=e.chefe?6:8; e.x+=dx/d*45; e.y+=dy/d*45; tremor(4); particulas(e.x,e.y,"#ff8a6a",14,80); } }
  }
  J.inimigos=J.inimigos.filter(e=>e.hp>0&&((Math.abs(e.x-P.x)<VW*1.6&&Math.abs(e.y-P.y)<VH*1.6)||e.chefe||e.mini));
  atualizarCena(dt); if(!J) return; if(J.imparavel>0) J.imparavel-=dt; atualizarReliquias(dt); atualizarPerigos(dt); atualizarCriaturas(dt); atualizarAvisos(dt); atualizarVfx(dt); atualizarLuz(dt); if(tal.regen()+passiva("regen")>0&&!custo("regen_zero")) J.vida=Math.min(J.vidaMax,J.vida+J.vidaMax*(tal.regen()+passiva("regen"))*dt); atualizarArvore(dt); atualizarConquistas(dt); atualizarLenda(dt);
  for(const b of J.balas){ b.x+=b.vx*dt; b.y+=b.vy*dt; b.vida-=dt;
    if(b.contraInimigo){ for(const o of J.inimigos){ if(o===b.dono||o.hp<=0) continue; if(dist2(b,o)<(o.r+2)*(o.r+2)){ b.vida=0; const f=FONTE; FONTE="ambiente"; danoSimples(o,b.dano*3); FONTE=f; break; } } }
    else if(J.invuln<=0&&dist2(b,P)<25){ b.vida=0; feriJogador(b.dano,b.el); if(b.cura&&b.dono&&b.dono.hp>0) b.dono.hp=Math.min(b.dono.max,b.dono.hp+b.dano*0.5); }
    if(b.solo&&Math.random()<dt*2.5) pintarSolo(b.x,b.y,3,b.solo,b.solo==="fogo"?5:undefined);
    if(b.vida>0&&J.cena){ const q=propNoPonto(b.x,b.y,1); if(q){ b.vida=0; danificarProp(q,b.quebra?q.max*2:DIF.hp*dificuldade()*0.35,null); particulas(b.x,b.y,"#ff8a6a",3,40); } }
    if(b.vida<=0&&!b.acabou){ b.acabou=true; if(b.deixa&&J.cena) criarProp(b.deixa,b.x,b.y); if(b.deixaLascas&&J.cena){ b.deixaLascas.x=b.x; b.deixaLascas.y=b.y; lascas(b.deixaLascas,8,true); } } }
  J.balas=J.balas.filter(b=>b.vida>0);
  // projéteis
  for(const p of J.proj){ FONTE=p.fonte||"basico";
    if(p.alvo){ if(p.alvo.hp<=0) p.alvo=maisProximo(p,130); if(p.alvo){ const dx=p.alvo.x-p.x, dy=p.alvo.y-p.y, d=Math.hypot(dx,dy)||1; p.vx=dx/d*p.vel; p.vy=dy/d*p.vel; } }
    p.x+=p.vx*dt; p.y+=p.vy*dt; p.vida-=dt;
    for(const e of J.inimigos){ if(e.hp<=0||(p.ja&&p.ja.has(e))) continue; if(dist2(p,e)<(e.r+p.r)*(e.r+p.r)){
      if(p.explode){ for(let i=0;i<4;i++) aplicarElementoNoSolo(p.x+rnd(-p.explode,p.explode)*0.6,p.y+rnd(-p.explode,p.explode)*0.5,p.el); emArea(p.x,p.y,p.explode,o=>ferir(o,p.dano,p.el)); anel(p.x,p.y,p.explode,p.cor,.35); particulas(p.x,p.y,p.cor,8,70); p.vida=0; break; }
      ferir(e,p.dano,p.el); (p.ja=p.ja||new Set()).add(e); if(Math.random()<0.3) aplicarElementoNoSolo(e.x,e.y+2,p.el);
      if(p.ric>0||(temRel("Bola de Borracha Sagrada")&&!p.bola)){ const n=maisProximo(e,60,o=>!p.ja.has(o)); if(n){ if(p.ric>0) p.ric--; else p.bola=true; const dx=n.x-p.x, dy=n.y-p.y, d=Math.hypot(dx,dy)||1, v=Math.hypot(p.vx,p.vy); p.vx=dx/d*v; p.vy=dy/d*v; continue; } }
      if(--p.perf<=0){ p.vida=0; break; } } }
    if(p.vida>0&&J.cena&&((p.alvo&&p.alvo.ehProp)||p.alvoProp)){ const q=propNoPonto(p.x,p.y,p.r); if(q&&!(p.ja&&p.ja.has(q))){
      if(p.explode){ for(let i=0;i<4;i++) aplicarElementoNoSolo(p.x+rnd(-p.explode,p.explode)*0.6,p.y+rnd(-p.explode,p.explode)*0.5,p.el); emArea(p.x,p.y,p.explode,o=>ferir(o,p.dano,p.el)); anel(p.x,p.y,p.explode,p.cor,.35); particulas(p.x,p.y,p.cor,8,70); p.vida=0; }
      else { ferir(q,p.dano,p.el); if(!q.mat.fixo){ q.vx+=p.vx*1.5/q.m; q.vy+=p.vy*1.5/q.m; } (p.ja=p.ja||new Set()).add(q); if(--p.perf<=0) p.vida=0; } } }
  }
  J.proj=J.proj.filter(p=>p.vida>0);
  // crias, totens, armadilhas e zonas
  for(const c of J.crias){ c.vida-=dt; c.cd-=dt; FONTE=c.fonte||"basico";
    if(c.guarda){ const a=J.t*3+J.crias.indexOf(c); c.x+=(P.x+Math.cos(a)*16-c.x)*Math.min(1,dt*5); c.y+=(P.y+Math.sin(a)*16-c.y)*Math.min(1,dt*5); emArea(c.x,c.y,6,e=>{ if(c.cd<=0){ ferir(e,c.dano,c.el); c.cd=.4; } }); continue; }
    const e=maisProximo(c,90); if(e){ const dx=e.x-c.x, dy=e.y-c.y, d=Math.hypot(dx,dy)||1, v=c.gigante?45:70; c.x+=dx/d*v*dt; c.y+=dy/d*v*dt;
      if(d<e.r+(c.gigante?7:3)&&c.cd<=0){ if(c.gigante){ emArea(c.x,c.y,18,o=>ferir(o,c.dano,c.el)); anel(c.x,c.y,18,c.cor,.3); tremor(2);} else ferir(e,c.dano,c.el); c.cd=c.gigante?.8:.5; } }
    if(c.vida<=0&&c.kami){ emArea(c.x,c.y,16,o=>ferir(o,c.dano*3,c.el)); anel(c.x,c.y,16,c.cor,.35); particulas(c.x,c.y,c.cor,8,70); } }
  J.crias=J.crias.filter(c=>c.vida>0);
  for(const t of J.totens){ t.vida-=dt; t.cd-=dt; FONTE="basico"; if(t.cd<=0){ const e=maisProximo(t,80); if(e){ const dx=e.x-t.x, dy=e.y-t.y+4, d=Math.hypot(dx,dy)||1; J.proj.push({fonte:FONTE,alvoProp:e.ehProp?e:null,x:t.x,y:t.y-4,vx:dx/d*140,vy:dy/d*140,dano:t.dano,el:t.el,cor:t.cor,vida:1,perf:1,r:2}); } t.cd=.8; } }
  J.totens=J.totens.filter(t=>t.vida>0);
  for(const a of J.armadilhas){ a.vida-=dt; FONTE=a.fonte||"habilidade"; const e=maisProximo(a,8); if(e){ a.vida=0; emArea(a.x,a.y,22,o=>{ ferir(o,a.dano,a.el); if(a.raiz) o.congela=2; }); anel(a.x,a.y,22,a.cor,.4); particulas(a.x,a.y,a.cor,12,90); tremor(2); } }
  J.armadilhas=J.armadilhas.filter(a=>a.vida>0);
  for(const z of J.zonas){ z.vida-=dt; FONTE=z.fonte||"habilidade";
    if(z.tipo==="circulo"&&z.puxa) emArea(z.x,z.y,z.r,e=>{ e.x+=(z.x-e.x)*dt*1.5; e.y+=(z.y-e.y)*dt*1.5; });
    if(z.tipo==="chuva"){ if(z.segue){ z.x=J.jogador.x; z.y=J.jogador.y; } z.cd-=dt; if(z.cd<=0){ z.cd=.25; emArea(z.x,z.y,z.r,e=>ferir(e,z.dano,z.el)); for(let i=0;i<3;i++){ const a=Math.random()*Math.PI*2, r=Math.random()*z.r; J.efeitos.push({x:z.x+Math.cos(a)*r,y:z.y+Math.sin(a)*r-10,x2:z.x+Math.cos(a)*r,y2:z.y+Math.sin(a)*r,cor:z.cor,vida:.15,max:.15,linha:true}); } } }
    if(z.tipo==="rastro"){ z.cd=(z.cd||0)-dt; if(z.cd<=0){ z.cd=.5; emArea(z.x,z.y,z.r,e=>ferir(e,z.dano,z.el)); } }
    if(z.tipo==="portal"){ z.cd-=dt; if(z.cd<=0){ z.cd=.6; J.crias.push({fonte:FONTE,x:z.x,y:z.y,dano:z.dano,el:z.el,cor:z.cor,vida:4,cd:0}); particulas(z.x,z.y,z.cor,4,40); } }
    if(z.tipo==="espirito"){ z.ang+=dt*4; z.x=P.x+Math.cos(z.ang)*28; z.y=P.y+Math.sin(z.ang)*28; z.cd-=dt;
      if(z.cd<=0){ z.cd=.35; emArea(z.x,z.y,10,e=>{ ferir(e,z.dano,z.el); if(z.el2) ferir(e,z.dano*0.5,z.el2); });
        if(z.cadeia){ const ts=J.totens; for(let i=0;i<ts.length-1;i++){ raio(ts[i].x,ts[i].y-4,ts[i+1].x,ts[i+1].y-4,z.cor); emArea((ts[i].x+ts[i+1].x)/2,(ts[i].y+ts[i+1].y)/2,14,e=>ferir(e,z.dano*0.5,z.el)); } } } } }
  J.zonas=J.zonas.filter(z=>z.vida>0);
  // ovos e filhotes selvagens
  for(const o of J.ovosMapa){ o.vida-=dt; if(J.fim){ o.x+=(P.x-o.x)*Math.min(1,dt*3); o.y+=(P.y-o.y)*Math.min(1,dt*3); } if(dist2(o,P)<64){ o.vida=0; pegarOvo(o); } }
  J.ovosMapa=J.ovosMapa.filter(o=>o.vida>0);
  if(J.tAnc>0){ J.tAnc-=dt; if(J.tAnc<=0) surgirOvoAncestral(); }
  if(J.ovoAnc&&dist2(J.ovoAnc,P)<144){ const o=J.ovoAnc; J.ovoAnc=null; pegarOvoAncestral(o); }
  if(R.ancestral.estado==="chocando"&&!J.fim){ R.ancestral.prog+=dt; checarAncestral(); J.tAncUI=(J.tAncUI||0)+dt; if(J.tAncUI>1){ J.tAncUI=0; desenharNinho(); } }
  for(const f of J.selvagens){ f.vida-=dt; const dx=f.x-P.x, dy=f.y-P.y, d=Math.hypot(dx,dy)||1; if(d<70){ f.x+=dx/d*36*dt; f.y+=dy/d*36*dt; } else { f.x+=Math.sin(J.t*2+f.x)*10*dt; }
    if(f.selando){ f.x-=dx/d*36*dt; f.y-=dy/d*36*dt; continue; } if(f.fugaRapida>0){ f.fugaRapida-=dt; f.x+=dx/d*40*dt; f.y+=dy/d*40*dt; } if(f.imune>0) f.imune-=dt;
    if(d<8&&!(f.imune>0)) tentarCaptura(f); }
  J.selvagens=J.selvagens.filter(f=>f.vida>0);
  // cristais
  const ima=22*rm.ima*tal.coleta();
  for(const g of J.gemas){ g.x+=g.vx*dt; g.y+=g.vy*dt; g.vx*=0.9; g.vy*=0.9; const d=Math.sqrt(dist2(g,P)); if(d<ima||J.fim||g.puxar){ g.x+=(P.x-g.x)*Math.min(1,dt*8); g.y+=(P.y-g.y)*Math.min(1,dt*8); } if(d<6){ g.pega=true; som("gema"); ganharXp(g.v*rm.xp*(1+Math.min(D.combo.xp_max,J.combo/10*D.combo.xp_por_10))); } }
  J.gemas=J.gemas.filter(g=>!g.pega);
  atualizarMoedasBaus(dt,ima);
  // partículas e textos
  for(const p of J.parts){ p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=(p.g??60)*dt; p.vx*=0.96; p.vida-=dt; } J.parts=J.parts.filter(p=>p.vida>0);
  J.nums.forEach(n=>{ n.vida-=dt; n.y+=n.vy*dt*0.3; n.x+=(n.vx||0)*dt*0.3; n.vy+=80*dt; if(n.pop>0) n.pop=Math.max(0,n.pop-dt*6); }); J.nums=J.nums.filter(n=>n.vida>0);
  J.textos.forEach(t=>{ t.vida-=dt; t.y-=dt*12; }); J.textos=J.textos.filter(t=>t.vida>0);
  J.efeitos.forEach(f=>f.vida-=dt); J.efeitos=J.efeitos.filter(f=>f.vida>0);
  J.fantasmas.forEach(f=>f.vida-=dt); J.fantasmas=J.fantasmas.filter(f=>f.vida>0);
  if(J.vida<=0&&temRel("Ovo de Koschei")&&!J.koschei){ J.koschei=true; J.vida=1; J.invuln=Math.max(J.invuln,1.5); anel(P.x,P.y,50,"#c8c8e0",.8); tremor(6); toast("Ovo de Koschei: a morte foi enganada!"); }
  if(J.vida<=0&&!lendaReviver()){
    if(J.renascer>0){ J.renascer=0; const mi=ativos().find(s=>L(s).classe==="mistico"&&s.pod.h2>0); const mod=mi?mi.mod.h2:null;
      J.vida=J.vidaMax*(mod===1?0.7:0.4); anel(P.x,P.y,60,"#fff3c4",.8); tremor(8); toast("Renascer!");
      if(mod===0){ emArea(P.x,P.y,70,e=>ferir(e,atrib(mi).dano*8,elementoDe(mi))); anel(P.x,P.y,70,"#ff8a3d",.7); particulas(P.x,P.y,"#ff8a3d",40,150,2); } }
    else if(J.reviver>0){ J.reviver--; J.vida=J.vidaMax*0.5; toast("Ankh: a equipe se levanta!"); }
    else if(R.reviverMeta>0){ R.reviverMeta--; J.vida=J.vidaMax*0.5; J.invuln=Math.max(J.invuln,1.5); anel(P.x,P.y,60,"#ffd34a",.8); tremor(8); toast("Segunda Chance: a equipe se levanta!"); }
    else return derrota(); }
  hud();
}
function ganharXp(v){
  v*=tal.xp()*(1+passiva("xp")); J.xp+=v; for(const ov of R.ninho) ov.prog+=v;
  const prontos=R.ninho.filter(o=>o.prog>=o.alvo); if(prontos.length){ R.ninho=R.ninho.filter(o=>o.prog<o.alvo); prontos.forEach(chocar); }
  desenharNinho();
  while(J.xp>=J.xpProx){ som("nivel"); J.xp-=J.xpProx; J.nivel++; J.xpProx=xpPara(J.nivel); J.niveisPend++; if(temRel("Tabuletas do Destino")&&Math.random()<0.3){ J.niveisPend++; textoUnico("tabuleta",J.jogador.x,J.jogador.y-22,"Destino: escolha extra!","#ffd34a",14); }
    const P=J.jogador; anel(P.x,P.y,50,"#ffd34a",.6); emArea(P.x,P.y,50,e=>{const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy)||1; e.x+=dx/d*22; e.y+=dy/d*22;}); particulas(P.x,P.y,"#ffd34a",16,100); tremor(3); }
  if(J.niveisPend>0&&!pausado&&!J.nivelAgendado){ J.nivelAgendado=true; agendar(0.15,()=>{ J.nivelAgendado=false; if(!pausado&&J.niveisPend>0){ J.niveisPend--; abrirNivel(); } }); }
}

// ================================================================ cenário vivo: vento, vegetação, objetos físicos e clima
// Escala física: 1 px do mundo ≈ 7 cm (um monstrinho de 10 px tem ~70 cm). Gravidade: 9,8 m/s² ≈ 140 px/s².
// Vento em px/s: 30 ≈ brisa (2 m/s), 70 ≈ vento forte (5 m/s), 110 ≈ tempestade (8 m/s).
const GRAV=140, VREF=110, K_EMPURRA=200, CH=96;

// Os kits de cada universo (vento, vegetação, clima, objetos) estão em dados/fonte_cenario.py


// Materiais. m = massa (kg); mu = atrito de deslizamento; rola = resistência ao rolamento (bem menor que o atrito);
// e = restituição (quique); fragil = velocidade de impacto (px/s) a partir da qual o objeto começa a trincar;
// hp em "inimigos comuns" (escala com a profundidade); res = multiplicador de dano por elemento.
const MAT=D.materiais;   // dados/fonte_cenario.py
const VEG={
  capim:{cores:["#2f6a2c","#4f9a3c","#8fd05a"],n:[2,4],L:[3,6],k:60,c:4},
  seca:{cores:["#6a4a24","#9a7a3a","#d8c070"],n:[2,3],L:[3,5],k:70,c:4},
  junco:{cores:["#2a5a40","#4a8a58","#7a4a28"],n:[2,3],L:[6,9],k:40,c:3.5,cabeca:true},
  gelada:{cores:["#4a6a7a","#9ac4d8","#f0fbff"],n:[2,3],L:[3,5],k:300,c:30,quebra:true},
  alga:{cores:["#1f4a3a","#2f7a52","#6ac08a"],n:[1,3],L:[8,13],k:12,c:3},
  dente:{cores:["#3f7a34","#5a9a44","#f4f4ee"],n:[1,2],L:[4,6],k:50,c:3,solta:"sementes"},
  trigo:{cores:["#8a6a2a","#c8a04a","#ffe9a0"],n:[2,4],L:[5,7],k:55,c:4,cabeca:true,solta:"polen"},
  cogumelo:{cogu:true,k:90,c:2.2,solta:"esporos"}};

// ---------------------------------------------------------------- vento
const VT={x:0,y:0};
function vento(x,y){ const C=J.cena; if(!C){ VT.x=VT.y=0; return VT; }
  if(C.kit.submerso){ // corrente de fundo: vai e volta com as ondas da superfície (período ~6 s)
    const s=Math.sin(C.t*0.97+(x*C.dx+y*C.dy)*0.004), v=C.vBase*(0.2+0.8*s); VT.x=C.dx*v; VT.y=C.dy*v; return VT; }
  // rajadas: frentes que viajam na mesma velocidade do vento médio (como no mundo real)
  const s=x*C.dx+y*C.dy, p=-x*C.dy+y*C.dx, fase=s-C.vBase*C.t;
  const o1=Math.sin(fase*0.021), g1=o1>0? o1*o1*o1*o1*o1*o1 : 0;
  const o2=Math.max(0,Math.sin(fase*0.0083+1.3)), g2=o2*o2*o2*o2*(0.5+0.5*Math.sin(p*0.013+C.t*0.2));
  let v=C.vBase*(1+C.kit.rajada*(1.2*g1+0.8*g2)); VT.x=C.dx*v; VT.y=C.dy*v;
  for(const w of C.vort){ const dx=x-w.x, dy=y-w.y, d=Math.hypot(dx,dy)||1; if(d>w.r*4) continue;
    // vórtice de Rankine: no núcleo a velocidade cresce com o raio; fora dele cai com 1/r
    const vt=w.vmax*(d<w.r? d/w.r : w.r/d)*Math.min(1,w.vida/1.5), vr=-0.35*vt; VT.x+=(-dy/d)*vt+(dx/d)*vr; VT.y+=(dx/d)*vt+(dy/d)*vr; }
  return VT; }
function sustentacao(x,y){ let s=0; for(const w of J.cena.vort){ const d=Math.hypot(x-w.x,y-w.y); if(d<w.r*2) s+=110*(1-d/(w.r*2)); } return s; }

// ---------------------------------------------------------------- início do mapa
function iniciarCena(u){
  const kit=JSON.parse(JSON.stringify(u.kit));   // cópia: a segunda fase dos chefes muda o kit durante a luta
  const r=semente(u.id+"cena"+R.profundidade), ang0=r()*Math.PI*2;
  const C=J.cena={u, kit, veg:kit.veg, t:0, ang0, dx:Math.cos(ang0), dy:Math.sin(ang0), vBase:kit.vento, Wx:0,Wy:0,Wm:0,
    props:new Map(), lista:[], tufos:new Map(), marcas:new Map(), pegadas:[], ondas:[], destrocos:[], ar:[], fumaca:[], rastros:[], vort:[], raios:[],
    filaExp:[], aviso:null, tRaio:rnd(6,10), tVort:rnd(8,14), tPart:0, nevoa:[], nuvens:[], detalhes:new Map(), sprites:new Map(), tSolo:0, contador:0};
  if(kit.nevoa) for(let i=0;i<8;i++) C.nevoa.push({x:rnd(-1,1)*VW, y:rnd(-1,1)*VH, r:rnd(40,90), a:rnd(.10,.2), f:rnd(0,6)});
  if(kit.nuvens!==false&&!kit.caverna&&!kit.submerso) for(let i=0;i<4;i++) C.nuvens.push({x:rnd(-1.5,1.5)*VW, y:rnd(-1.5,1.5)*VH, r:rnd(70,140), a:kit.nuvensEscuras?rnd(.16,.24):rnd(.07,.12)});
  if(kit.submerso) C.causticas=gerarCausticas();
  if(!SOMBRA_SUAVE) SOMBRA_SUAVE=gerarBolha();
}
let SOMBRA_SUAVE=null;
function gerarBolha(){ const c=document.createElement("canvas"); c.width=c.height=64; const g=c.getContext("2d"), gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,"rgba(255,255,255,1)"); gr.addColorStop(.6,"rgba(255,255,255,.55)"); gr.addColorStop(1,"rgba(255,255,255,0)"); g.fillStyle=gr; g.fillRect(0,0,64,64); return c; }
function bolhaCor(cor){ const C=J.cena, k="bolha"+cor; if(C.sprites.has(k)) return C.sprites.get(k);
  const c=document.createElement("canvas"); c.width=c.height=64; const g=c.getContext("2d"); g.drawImage(SOMBRA_SUAVE,0,0); g.globalCompositeOperation="source-in"; g.fillStyle=cor; g.fillRect(0,0,64,64); C.sprites.set(k,c); return c; }
// luz que atravessa a superfície ondulada da água e se concentra no fundo (cáusticas)
function gerarCausticas(){ const fr=[]; for(let f=0;f<8;f++){ const c=document.createElement("canvas"); c.width=c.height=64; const g=c.getContext("2d"), im=g.createImageData(64,64), ph=f/8*Math.PI*2;
    for(let y=0;y<64;y++) for(let x=0;x<64;x++){ const a=x/64*Math.PI*2, b=y/64*Math.PI*2;
      const v=Math.sin(a*2+ph)+Math.sin(b*3-ph)+Math.sin((a+b)*2+ph*2)+Math.sin((a-b)*3-ph); const t=Math.max(0,1-Math.abs(v)*1.4);
      const i=(y*64+x)*4; im.data[i]=200; im.data[i+1]=240; im.data[i+2]=255; im.data[i+3]=Math.round(t*t*255); }
    g.putImageData(im,0,0); fr.push(c); } return fr; }

// ---------------------------------------------------------------- objetos: geração por pedaço do mapa
function pesoAleatorio(r,pesos){ let tot=0; for(const k in pesos) tot+=pesos[k]; let x=r()*tot; for(const k in pesos){ x-=pesos[k]; if(x<=0) return k; } return Object.keys(pesos)[0]; }
function gerarPedaco(cx,cy){ const C=J.cena, k=cx+":"+cy; if(C.props.has(k)) return; const r=semente(C.u.id+"p"+k+"#"+R.profundidade), out=[];
  if(r()<0.62){ const tipo=pesoAleatorio(r,C.kit.props), n=r()<0.35? 2+Math.floor(r()*2) : 1, bx=cx*CH+14+r()*68, by=cy*CH+14+r()*68;
    for(let i=0;i<n;i++){ const x=bx+(i%2)*13+r()*3, y=by+Math.floor(i/2)*11+r()*3; if(Math.abs(x)<36&&Math.abs(y)<36) continue;
      const t=soloNatural(Math.floor(x/CEL),Math.floor(y/CEL)); if(t==="agua"&&!C.kit.submerso) continue; if(!lugarDeObjeto(x,y,10)) continue;
      out.push(novoProp(i>0&&r()<0.3? pesoAleatorio(r,C.kit.props) : tipo, x, y, r)); } }
  sortearMarcos(cx,cy,r,out); C.props.set(k,out); }
function novoProp(tipo,x,y,r){ const M=MAT[tipo], hp=M.indestrutivel? Infinity : M.hp*DIF.hp*dificuldade();
  return {ehProp:true, tipo, mat:M, x, y, vx:0, vy:0, r:M.r, m:M.m, esc:1, hp, max:hp, eixo:r()<.5?"h":"v", rolou:0, queima:0, carvao:0, molhado:0, congela:0, pavio:0,
    flash:0, morto:false, flut:0, el:null, status:null, tCond:0, tSolo:r()*0.3, var:Math.floor(r()*3)}; }
function carregarProps(ox,oy){ const C=J.cena, c0=Math.floor((ox-60)/CH), c1=Math.floor((ox+VW+60)/CH), r0=Math.floor((oy-60)/CH), r1=Math.floor((oy+VH+60)/CH);
  C.lista.length=0; for(let cy=r0;cy<=r1;cy++) for(let cx=c0;cx<=c1;cx++){ gerarPedaco(cx,cy); for(const p of C.props.get(cx+":"+cy)) if(!p.morto) C.lista.push(p); } }

// ---------------------------------------------------------------- objetos: física
function atritoSolo(t){ return t==="gelo"?0.15 : t==="agua"?0.6 : t==="lama"?1.6 : t==="areia"?1.2 : 1; }
function rolamentoSolo(t){ return t==="areia"?3 : t==="lama"?4 : t==="grama"||t==="vinha"?1.5 : 1; }   // areia e lama "engolem" a roda
function colidir(p,ent,r,m,vx,vy,inimigo){ if(p.mat.fantasma) return false;
  const R=r+p.r*p.esc, dx=p.x-ent.x, dy=p.y-ent.y, d2=dx*dx+dy*dy; if(d2>=R*R) return false;
  const d=Math.sqrt(d2)||0.01, nx=dx/d, ny=dy/d, ov=R-d, M=p.mat;
  const vn=(vx-p.vx)*nx+(vy-p.vy)*ny;   // velocidade de aproximação ao longo da normal
  // atrito estático: só arrasta se a força de empurrar vencer μs·m·g
  const parado=Math.hypot(p.vx,p.vy)<2, fixo=M.fixo||p.flut<0||(parado&&m*K_EMPURRA<M.mu*1.2*p.m*GRAV*atritoSolo(p.solo));
  if(fixo){ ent.x-=nx*ov; ent.y-=ny*ov; if(vn>M.fragil&&!M.indestrutivel) danificarProp(p,p.max*(vn/M.fragil-0.7)*1.2,null); return true; }
  const wm=p.m/(m+p.m), wp=m/(m+p.m); ent.x-=nx*ov*wm; ent.y-=ny*ov*wm; p.x+=nx*ov*wp; p.y+=ny*ov*wp;
  if(vn>0){ const j=(1+M.e)*vn/(1/m+1/p.m); p.vx+=j/p.m*nx; p.vy+=j/p.m*ny;
    // o objeto que vem rápido machuca: energia cinética ½·m·v²
    if(inimigo&&vn>55&&Math.hypot(p.vx,p.vy)>40){ const f=FONTE; FONTE="ambiente"; danoSimples(inimigo,0.5*p.m*vn*vn*1.2e-4*dificuldade()); FONTE=f;
      inimigo.x-=nx*Math.min(14,j/m*0.08); inimigo.y-=ny*Math.min(14,j/m*0.08); particulas(ent.x,ent.y,"#fff3c4",4,60); }
    const lim=M.fragil*(p.congela>0?0.6:1); if(vn>lim) danificarProp(p,p.max*(vn/lim-0.7)*1.2,null); }
  return true; }
function colidirProps(a,b){ if(a.mat.fantasma||b.mat.fantasma) return; const R=a.r*a.esc+b.r*b.esc, dx=b.x-a.x, dy=b.y-a.y, d2=dx*dx+dy*dy; if(d2>=R*R) return;
  const d=Math.sqrt(d2)||0.01, nx=dx/d, ny=dy/d, ov=R-d, fa=a.mat.fixo||a.flut<0, fb=b.mat.fixo||b.flut<0; if(fa&&fb) return;
  const ia=fa?0:1/a.m, ib=fb?0:1/b.m, s=ia+ib; a.x-=nx*ov*ia/s; a.y-=ny*ov*ia/s; b.x+=nx*ov*ib/s; b.y+=ny*ov*ib/s;
  const vn=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny; if(vn<=0) return;
  const e=Math.min(a.mat.e,b.mat.e), j=(1+e)*vn/s; a.vx-=j*ia*nx; a.vy-=j*ia*ny; b.vx+=j*ib*nx; b.vy+=j*ib*ny;
  for(const p of [a,b]) if(!p.mat.indestrutivel&&vn>p.mat.fragil*(p.congela>0?.6:1)) danificarProp(p,p.max*(vn/p.mat.fragil-0.7)*1.2,null); }
function atualizarProps(dt){
  const C=J.cena, L0=C.lista, P=J.jogador;
  for(const p of L0){ const M=p.mat; if(p.flash>0) p.flash-=dt; if(p.subindo>0){ p.subindo-=dt; if(Math.random()<dt*20) particulas(p.x+rnd(-p.r,p.r),p.y+2,"#a89878",1,25); }
    if(p.temporario>0){ p.temporario-=dt; if(p.temporario<=0){ p.semDrop=true; quebrar(p); continue; } } if(p.molhado>0) p.molhado-=dt; if(p.congela>0) p.congela-=dt;
    const cx=Math.floor(p.x/CEL), cy=Math.floor(p.y/CEL); p.solo=soloEm(cx,cy);
    // solo sob o objeto: fogo acende, água apaga e molha, raio procura metal
    p.tSolo-=dt; if(p.tSolo<=0){ p.tSolo=0.25;
      if(p.solo==="fogo") danificarProp(p,p.max*0.05,"fogo"); if(p.solo==="agua"){ p.molhado=6; if(p.queima>0) apagar(p); }
      if(p.solo==="eletrico"&&M.condutor) conduzir(p,DIF.hp*0.6*dificuldade(),70);
      if(M.derrete&&(p.solo==="fogo"||C.u.elemento==="fogo"&&!frio())) derreter(p,p.solo==="fogo"?0.06:0.01); }
    // água: madeira, gelo, feno e frutas boiam e derivam; cerâmica, pedra e metal afundam
    if(!C.kit.submerso&&p.solo==="agua"&&!M.fixo){ if(M.flutua){ p.flut=1; } else if(M.afunda&&p.flut>=0){ afundar(p); continue; } } else p.flut=0;
    if(M.fixo) continue;
    // vento: arrasto ½·ρ·Cd·A·|v|² só move o que é leve e tem área (feno, frutas); o resto nem sente
    const A=M.area||0; if(A||p.flut>0){ const w=vento(p.x,p.y), rx=w.x*(p.flut>0?0.25:1)-p.vx, ry=w.y*(p.flut>0?0.25:1)-p.vy, rv=Math.hypot(rx,ry);
      const a=0.006*(A||6)/p.m*rv; const forte=rv*a>M.mu*GRAV*0.9||Math.hypot(p.vx,p.vy)>3||p.flut>0||M.rola;
      if(forte){ p.vx+=rx*a*dt; p.vy+=ry*a*dt; } }
    // atrito: deslizar gasta μ·g; rolar gasta só μr·g (barris rolam na direção perpendicular ao eixo)
    const sp=Math.hypot(p.vx,p.vy);
    if(sp>0.01){ const fs=atritoSolo(p.solo), fr=rolamentoSolo(p.solo);
      if(p.flut>0){ const k=Math.exp(-1.2*dt); p.vx*=k; p.vy*=k; }
      else if(M.rola&&p.tipo!=="fruta"){ const rx=p.eixo==="h"?0:1, ry=p.eixo==="h"?1:0;  // direção de rolamento
        let vr=p.vx*rx+p.vy*ry, va=p.vx*ry+p.vy*rx; const dr=M.rola*fr*GRAV*dt, da=M.mu*fs*GRAV*dt;
        vr=Math.sign(vr)*Math.max(0,Math.abs(vr)-dr); va=Math.sign(va)*Math.max(0,Math.abs(va)-da);
        p.vx=vr*rx+va*ry; p.vy=vr*ry+va*rx; p.rolou+=Math.abs(vr)*dt; }
      else { const mu=(M.rola||M.mu*(p.congela>0?.4:1))*(M.rola?fr:fs), q=Math.max(0,sp-mu*GRAV*dt)/sp; p.vx*=q; p.vy*=q; if(M.rola) p.rolou+=sp*dt; }
      p.x+=p.vx*dt; p.y+=p.vy*dt; }
    // pisoteio da grama pelo objeto em movimento
    if(sp>10) tocarTufos(p.x,p.y,p.r,p.vx,p.vy,dt);
  }
  // contatos com quem anda: Invocador, equipe e inimigos
  const dashing=J.dashT>0, vjx=dashing? J.dir.x/(Math.hypot(J.dir.x,J.dir.y)||1)*D.esquiva.distancia/0.15 : J.pvx, vjy=dashing? J.dir.y/(Math.hypot(J.dir.x,J.dir.y)||1)*D.esquiva.distancia/0.15 : J.pvy;
  for(const p of L0){ if(p.morto) continue;
    if(colidir(p,P,4,60,vjx,vjy,null)&&!dashing){ J.pvx*=0.92; J.pvy*=0.92; }
    for(const s of R.selos){ if(!s.mon||s.x==null) continue; colidir(p,s,4,40,s.vx||0,s.vy||0,null); }
    for(const e of J.inimigos){ if(e.hp<=0||Math.abs(e.x-p.x)>30||Math.abs(e.y-p.y)>30) continue;
      const m=(e.chefe?3000:e.mini?800:[15,30,70][e.tipo]||30)*(e.elite&&!e.chefe&&!e.mini?3:1); colidir(p,e,e.r,m,e.vx||0,e.vy||0,e); } }
  for(let i=0;i<L0.length;i++) for(let j=i+1;j<L0.length;j++) if(!L0[i].morto&&!L0[j].morto) colidirProps(L0[i],L0[j]);
  // queima, pavio e derretimento
  for(const p of L0){ if(p.morto) continue; const M=p.mat;
    if(p.pavio>0){ p.pavio-=dt; if(Math.random()<dt*30) particulas(p.x+rnd(-1,1),p.y-p.r-3,Math.random()<.5?"#ffd34a":"#fff3c4",1,40); if(p.pavio<=0){ p.hp=0; quebrar(p); continue; } }
    if(p.queima>0){ const W=C.Wm, oxi=1+W/90;   // mais vento = mais oxigênio = queima mais rápido
      p.hp-=p.max*dt/M.queimaT*oxi; p.carvao=Math.min(1,p.carvao+dt/M.queimaT*oxi);
      if(Math.random()<dt*14) brasa(p.x+rnd(-p.r,p.r),p.y-p.r*0.5,rnd(4,8)); if(Math.random()<dt*6) fumaca(p.x+rnd(-2,2),p.y-p.r,4);
      p.tQ=(p.tQ||0)-dt; if(p.tQ<=0){ p.tQ=0.4; mudarSolo(p.x,p.y+2,"fogo");
        for(const q of L0){ if(q===p||q.morto||!q.mat.inflam||q.queima>0) continue; const dx=q.x-p.x, dy=q.y-p.y, d=Math.hypot(dx,dy); if(d>p.r+q.r+10) continue;
          const vientre=(dx*C.dx+dy*C.dy)/(d||1); if(Math.random()<0.35*(1+Math.max(0,vientre)*Math.min(1.5,W/40))) danificarProp(q,0,"fogo"); }
        emArea(p.x,p.y,p.r+5,e=>{ if(e.ehProp) return; e.status={el:"fogo",t:J.t}; const f=FONTE; FONTE="ambiente"; danoSimples(e,pctMax(e,0.05)+1); FONTE=f; });
        if(Math.hypot(P.x-p.x,P.y-p.y)<p.r+5&&J.invuln<=0&&!ativos().some(s=>elementoDe(s)==="fogo")) J.vida-=J.vidaMax*0.02; }
      if(p.molhado>0||C.kit.submerso) apagar(p);
      if(p.hp<=0){ quebrar(p); continue; } } }
  C.lista=L0.filter(p=>!p.morto);
  // explosões em cadeia: a pólvora vizinha não explode no mesmo instante
  for(const x of C.filaExp) x.t-=dt; const prontas=C.filaExp.filter(x=>x.t<=0); C.filaExp=C.filaExp.filter(x=>x.t>0); prontas.forEach(x=>explodir(x.x,x.y,x.R));
}
function acender(p){ const M=p.mat; if(J.cena.kit.submerso||p.molhado>0) return;
  if(M.explode){ if(!(p.pavio>0)){ p.pavio=1.1; } return; }
  if(M.inflam&&p.queima<=0){ p.queima=M.queimaT; } }
function apagar(p){ if(p.queima>0){ p.queima=0; fumaca(p.x,p.y-p.r,6); fumaca(p.x+2,p.y-p.r,5); } if(p.pavio>0) p.pavio=0; }
function derreter(p,q){ p.esc=Math.max(0,p.esc-q); p.m=p.mat.m*p.esc*p.esc; if(Math.random()<.4) J.cena.destrocos.push(gota(p.x+rnd(-3,3),p.y));
  if(p.esc<0.35){ mudarSolo(p.x,p.y,frio()?"gelo":"agua"); mudarSolo(p.x+CEL,p.y,frio()?"gelo":"agua"); p.hp=0; quebrar(p); } }
function afundar(p){ p.morto=true; for(let i=0;i<3;i++) J.cena.ondas.push({x:p.x,y:p.y,r:1+i*3,vida:1}); particulas(p.x,p.y,"#bfe6ff",8,50); }
function conduzir(p,dano,alc){ if(J.t<p.tCond) return; p.tCond=J.t+0.5; const vistos=new Set(); let n=0, o=p;
  for(let i=0;i<4;i++){ const alvo=maisProximo(o,alc,e=>!vistos.has(e)); if(!alvo) break; vistos.add(alvo); raio(o.x,o.y-(o===p?p.r:0),alvo.x,alvo.y,"#bfe0ff");
    const f=FONTE; FONTE="ambiente"; danoSimples(alvo,dano*(1-i*0.15)); FONTE=f; alvo.status={el:"raio",t:J.t}; o=alvo; n++; }
  if(n){ particulas(p.x,p.y-p.r,"#fff3a0",6,70); anel(p.x,p.y,10,"#bfe0ff",.25); } }
function danificarProp(p,dano,el){ if(p.morto) return; const M=p.mat, C=J.cena;
  // objetos indestrutíveis têm vida infinita: golpes calculados "em % da vida" viram um valor finito antes de seguir (senão o raio conduzido seria infinito)
  if(!isFinite(dano)) dano=DIF.hp*dificuldade()*2;
  if(el==="fogo"){ if(M.inflam) acender(p); if(M.derrete) derreter(p,Math.min(.25,0.05+dano/p.max*0.4)); }
  if(el==="agua"){ apagar(p); p.molhado=10; if(frio()&&!M.fixo) p.congela=6; }
  if(el==="raio"){ if(M.condutor||p.molhado>0) conduzir(p,Math.max(dano,DIF.hp*0.5*dificuldade())*0.8,70); if(M.explode) acender(p); }
  if(M.indestrutivel){ p.flash=0.06; return; }
  const mult=(M.res&&el&&M.res[el]!=null)? M.res[el] : (M.res&&M.res._!=null? M.res._ : 1);
  p.hp-=dano*mult; if(dano>0){ p.flash=0.07; lascas(p,1+Math.floor(Math.random()*2),false); }
  if(p.hp<=0){ if(M.explode&&!(p.pavio>0)&&el!=="explosao"){ p.hp=0; quebrar(p); } else if(M.explode){ p.pavio=Math.min(p.pavio||1,rnd(.12,.35)); p.hp=1; } else quebrar(p); } }
function quebrar(p){ if(p.morto) return; p.morto=true; const M=p.mat, C=J.cena; if(!p.semDrop&&!p.temporario) evento("quebra:"+(p.saque?"barril":p.tipo)); if(typeof aoQuebrarProp==="function") aoQuebrarProp(p);
  if(p.semDrop){ lascas(p,6,true); return; }
  lascas(p, M.frag==="pedra"?12:M.frag==="palha"?16:10, true);
  particulas(p.x,p.y,"#d8d0c0",6,50); tremor(M.m>100?3:1.2);
  const prof=1+0.12*R.profundidade, gemas=(n,v,cor)=>{ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2; J.gemas.push({x:p.x,y:p.y,vx:Math.cos(a)*rnd(25,60),vy:Math.sin(a)*rnd(25,60),v:v*prof,cor}); } };
  switch(p.tipo){
    // objetos dão recompensas pequenas: itens fortes (Mel, Incenso, Pedra) continuam exclusivos de elites e baús
    case "vaso": if(Math.random()<.35) gemas(2,0.4,"#9fe0ff"); break;
    case "caixote": if(Math.random()<.3) gemas(2,0.5,"#9fe0ff"); if(Math.random()<.015) darItem("pena",p); break;
    case "barril": if(Math.random()<.15) gemas(2,0.5,"#9fe0ff"); break;
    case "rocha": if(Math.random()<.15) gemas(1,1,"#c8b8a0"); for(let i=0;i<3;i++) fumaca(p.x+rnd(-4,4),p.y,3,"#b8a888"); break;
    case "cristal": gemas(3,0.8,C.kit.cristal||"#c8f0ff"); anel(p.x,p.y,16,C.kit.cristal||"#c8f0ff",.4); break;
    case "fruta": curar(J.vidaMax*0.03); texto(p.x,p.y-10,"+vida","#7fe0a0",12); break;
    case "gelo": mudarSolo(p.x,p.y,frio()?"gelo":"agua"); for(let i=0;i<4;i++) C.ondas.push({x:p.x+rnd(-4,4),y:p.y+rnd(-3,3),r:1,vida:1}); break;
  }
  if(p.queima>0||p.carvao>0.5){ mudarSolo(p.x,p.y,"cinza"); for(let i=0;i<4;i++) fumaca(p.x+rnd(-3,3),p.y-2,5); }
  if(M.explode) C.filaExp.push({x:p.x,y:p.y,R:44,t:0.02}); }
function explodir(x,y,R){ const C=J.cena, P=J.jogador; evento("explosao");
  tremor(9); parar(0.06); J.flash={cor:"#ffb060",vida:.14}; anel(x,y,R,"#ffd34a",.5); anel(x,y,R*0.6,"#ff6a2a",.4);
  particulas(x,y,"#ffd34a",26,190,2); particulas(x,y,"#ff6a2a",18,150,2);
  for(let i=0;i<10;i++) fumaca(x+rnd(-R*.4,R*.4),y+rnd(-R*.3,R*.3),rnd(6,10)); for(let i=0;i<24;i++) brasa(x+rnd(-8,8),y+rnd(-6,6),rnd(10,30),rnd(-120,120),rnd(-120,120));
  C.luzes=(C.luzes||[]); C.luzes.push({x,y,r:R*2.2,cor:"255,170,80",vida:.35,max:.35});
  const f=FONTE; FONTE="ambiente";
  for(const e of J.inimigos){ if(e.hp<=0) continue; const dx=e.x-x, dy=e.y-y, d=Math.hypot(dx,dy)||1; if(d>R+e.r) continue; const q=Math.max(.25,1-d/R);
    danoSimples(e,DIF.hp*3.5*dificuldade()*q); e.status={el:"fogo",t:J.t}; const m=(e.chefe?3000:e.mini?800:[15,30,70][e.tipo]||30); const k=Math.min(28,9000*q*q/m*0.1); e.x+=dx/d*k; e.y+=dy/d*k; }
  FONTE=f;
  // impulso radial: Δv = I/m, caindo com o quadrado da distância
  for(const p of C.lista){ if(p.morto) continue; const dx=p.x-x, dy=p.y-y, d=Math.hypot(dx,dy)||1; if(d>R) continue; const q=1-d/R;
    if(!p.mat.fixo){ const dv=Math.min(420,9000*q*q/p.m); p.vx+=dx/d*dv; p.vy+=dy/d*dv; } danificarProp(p,p.max*2.2*q,"fogo"); if(p.mat.explode&&!p.morto){ p.pavio=Math.min(p.pavio||1,rnd(.15,.4)); } }
  for(const g of C.destrocos){ const dx=g.x-x, dy=g.y-y, d=Math.hypot(dx,dy)||1; if(d>R*1.5) continue; const q=1-d/(R*1.5); g.vx+=dx/d*200*q; g.vy+=dy/d*200*q; g.vz+=150*q; }
  const dP=Math.hypot(P.x-x,P.y-y); if(dP<R&&J.invuln<=0&&!passiva("explosao_segura")){ let dano=J.vidaMax*0.12*(1-dP/R); if(J.escudo>0){ const a=Math.min(J.escudo,dano); J.escudo-=a; dano-=a; } J.vida-=dano; texto(P.x,P.y-14,"Explosão!","#ff8a3d",14); }
  for(let i=-2;i<=2;i++) for(let j=-2;j<=2;j++){ if(i*i+j*j>5) continue; const cx=x+i*CEL, cy=y+j*CEL; if(i*i+j*j<=1) mudarSolo(cx,cy,"cinza"); else aplicarElementoNoSolo(cx,cy,"fogo"); if(Math.random()<.4){ const t=soloEm(Math.floor(cx/CEL),Math.floor(cy/CEL)); if(t==="grama"||t==="vinha"||t==="chao") mudarSolo(cx,cy,"fogo"); } } }

// ---------------------------------------------------------------- destroços (lascas com gravidade, quique e atrito)
const COR_FRAG={ceramica:null, madeira:["#8a5a30","#b07a44","#5a3a20"], palha:["#d8b85a","#a8843c","#f0d88a"], fruta:null, pedra:["#7a7680","#9a96a0","#5a5660"],
  gelo:["#bfe6ff","#e8f8ff","#8fc4e0"], cristal:null, metal:["#8a8a90","#c8c8d0","#5a5a60"]};
function corFrag(p){ const C=J.cena, f=p.mat.frag;
  if(f==="ceramica"){ const v=C.kit.vaso||["#b8683a","#2a3a5a"]; return [v[0],tom(v[0],.7),v[1]]; }
  if(f==="fruta") return C.kit.fruta==="abobora"? ["#e07a2a","#f0a040","#f8e0a0"] : ["#6a4a2a","#f4f0e8","#8a6a3a"];
  if(f==="cristal"){ const c=C.kit.cristal||"#c8f0ff"; return [c,tom(c,1.3),tom(c,.7)]; }
  if(f==="pedra"&&C.kit.rocha==="obsidiana") return ["#2a2030","#4a3a58","#e8603c"];
  const base=COR_FRAG[f]||COR_FRAG.madeira; return p.carvao>0.5? ["#2a2224","#4a3a34","#1a1416"] : base; }
function lascas(p,n,quebra){ const C=J.cena, cores=corFrag(p), leve=p.mat.frag==="palha";
  for(let i=0;i<n;i++){ if(C.destrocos.length>260) C.destrocos.shift(); const a=Math.random()*Math.PI*2, v=quebra? rnd(25,90) : rnd(10,40);
    C.destrocos.push({x:p.x+rnd(-2,2),y:p.y+rnd(-2,2),z:rnd(2,p.r*1.4),vx:p.vx*0.4+Math.cos(a)*v,vy:p.vy*0.4+Math.sin(a)*v,vz:quebra?rnd(40,110):rnd(20,50),
      cor:escolha(cores),tam:leve?1:(Math.random()<.35?2:1),vida:rnd(4,7),leve,brilho:p.mat.frag==="cristal"||p.mat.frag==="gelo",img:Math.random()<.6?cacoArte(p):null}); } }
function gota(x,y){ return {x,y,z:rnd(1,4),vx:rnd(-5,5),vy:rnd(-5,5),vz:0,cor:"#bfe6ff",tam:1,vida:.6,leve:false}; }
function atualizarDestrocos(dt){ const C=J.cena, P=J.jogador, sub=C.kit.submerso;
  for(const g of C.destrocos){ g.vida-=dt;
    const lift=C.vort.length? sustentacao(g.x,g.y) : 0;
    if(g.leve||sub||lift>0){ const w=vento(g.x,g.y), k=1-Math.exp(-dt/(g.leve?0.35:sub?0.8:1.2)); g.vx+=(w.x-g.vx)*k; g.vy+=(w.y-g.vy)*k; g.vz+=lift*dt*Math.max(0,1-g.z/35); }
    g.vz-=(sub?GRAV*0.25:g.leve?GRAV*0.3:GRAV)*dt; g.x+=g.vx*dt; g.y+=g.vy*dt; g.z+=g.vz*dt;
    if(g.z<=0){ g.z=0; if(g.vz<-20){ g.vz=-g.vz*0.3; } else g.vz=0;
      const sp=Math.hypot(g.vx,g.vy); if(sp>0.01){ const q=Math.max(0,sp-0.6*GRAV*dt)/sp; g.vx*=q; g.vy*=q; } }
    // chutar destroços ao passar
    const dx=g.x-P.x, dy=g.y-P.y; if(g.z<3&&dx*dx+dy*dy<25){ const d=Math.hypot(dx,dy)||1, v=Math.hypot(J.pvx,J.pvy); if(v>15){ g.vx+=dx/d*v*0.8; g.vy+=dy/d*v*0.8; g.vz+=v*0.3; } } }
  C.destrocos=C.destrocos.filter(g=>g.vida>0); }

// ---------------------------------------------------------------- vegetação: balanço com o vento + mola amortecida quando é tocada
function tufoInfo(cx,cy){ const C=J.cena, t=soloEm(cx,cy), h=hash2(cx,cy,41), d=C.kit.dens;
  let lim; switch(t){ case "grama": case "vinha": lim=0.5; break; case "chao": lim=d; break; case "areia": lim=C.veg==="seca"? d*0.6 : d*0.15; break;
    case "gelo": lim=d*0.7; break; case "fogo": case "cinza": lim=Math.max(d,0.45); break; case "lama": lim=d*0.5; break;
    case "agua": lim=C.veg==="junco"||C.veg==="alga"? Math.max(d,0.3) : d*0.3; break; case "eletrico": lim=d*0.3; break; default: lim=d; }
  if(h>=lim) return null; if(C.u.estrutura&&abismoEm(cx*CEL+4,cy*CEL+4,0)) return null; return t; }
function tocarTufos(x,y,r,vx,vy,dt,horda){ const C=J.cena, V=VEG[C.veg], R=r+4, sp=Math.hypot(vx,vy);
  const cx0=Math.floor((x-R)/CEL), cx1=Math.floor((x+R)/CEL), cy0=Math.floor((y-R)/CEL), cy1=Math.floor((y+R+3)/CEL);
  for(let cy=cy0;cy<=cy1;cy++) for(let cx=cx0;cx<=cx1;cx++){ const t=tufoInfo(cx,cy); if(!t||t==="cinza") continue;
    const bx=cx*CEL+1+Math.floor(hash2(cx,cy,43)*6), by=cy*CEL+2+Math.floor(hash2(cx,cy,47)*5), dx=bx-x, dy=by-y, d=Math.hypot(dx,dy)||1; if(d>R) continue;
    const k=cx+","+cy; let st=C.tufos.get(k); if(!st){ st={bx:0,by:0,vx:0,vy:0}; C.tufos.set(k,st); }
    const q=1-d/R; st.vx+=(dx/d*240*q+vx*0.9)*dt; st.vy+=(dy/d*240*q+vy*0.9)*dt;
    const marca=C.marcas.get(k);
    if(V.quebra&&t!=="fogo"&&sp>20&&!marca){ C.marcas.set(k,J.t); for(let i=0;i<3;i++) C.destrocos.push({x:bx,y:by,z:rnd(1,4),vx:rnd(-30,30),vy:rnd(-30,30),vz:rnd(20,50),cor:"#e8f8ff",tam:1,vida:2,brilho:true}); }
    else if(V.solta&&!horda&&sp>15&&!marca&&Math.random()<dt*8){ if(V.solta==="sementes") C.marcas.set(k,J.t); for(let i=0;i<(V.solta==="sementes"?5:2);i++) particulaAr(V.solta,bx,by,rnd(3,7)); }
    if(t==="agua"&&sp>10&&Math.random()<dt*3) C.ondas.push({x:bx,y:by,r:1,vida:0.8}); } }
function atualizarTufos(dt){ const C=J.cena, V=VEG[C.veg], P=J.jogador; let h=dt; const passos=dt>0.025?2:1; h=dt/passos;
  for(let i=0;i<passos;i++) for(const [k,st] of C.tufos){ const am=Math.exp(-V.c*h); st.vx*=am; st.vy*=am; st.vx-=V.k*st.bx*h; st.vy-=V.k*st.by*h; st.bx+=st.vx*h; st.by+=st.vy*h;
    const m=Math.hypot(st.bx,st.by); if(m>1.3){ st.bx*=1.3/m; st.by*=1.3/m; } }
  for(const [k,st] of C.tufos) if(Math.abs(st.bx)+Math.abs(st.by)<0.01&&Math.abs(st.vx)+Math.abs(st.vy)<0.05) C.tufos.delete(k);
  if(C.tufos.size>900) C.tufos.clear();
  for(const [k,t] of C.marcas) if(J.t-t>28) C.marcas.delete(k);
  // quem anda pela vegetação
  tocarTufos(P.x,P.y,4,J.pvx,J.pvy,dt);
  for(const s of R.selos) if(s.mon&&s.x!=null) tocarTufos(s.x,s.y,3,s.vx||0,s.vy||0,dt);
  const ox=P.x-VW/2, oy=P.y-VH/2; let n=0;
  for(const e of J.inimigos){ if(e.hp<=0||e.x<ox-10||e.x>ox+VW+10||e.y<oy-10||e.y>oy+VH+10) continue; if(++n>120) break; tocarTufos(e.x,e.y,e.r*0.8,e.vx||0,e.vy||0,dt,true); } }

// ---------------------------------------------------------------- pegadas e ondas na água
function rastroDe(o,x,y,dist,r){ const C=J.cena; o._pd=(o._pd||0)+dist; if(o._pd<5) return; o._pd=0;
  const t=soloEm(Math.floor(x/CEL),Math.floor(y/CEL));
  if(t==="agua"||t==="eletrico"){ if(C.ondas.length<80) C.ondas.push({x,y:y+2,r:1,vida:1}); return; }
  if(t==="molhado"&&C.ondas.length<80&&Math.random()<0.4) C.ondas.push({x,y:y+2,r:0.6,vida:0.6});
  const cor=t==="molhado"?"#16202e": t==="queimado"?"#0e0a08": t==="lama"?"#3a2818": t==="areia"?tom(COR_SOLO.areia[0],.75): t==="cinza"?"#2a2830": (t==="gelo"&&frio())?"#9ab8d0": t==="grama"||t==="vinha"? null : null;
  if(!cor) return; o._lado=!o._lado; if(C.pegadas.length>240) C.pegadas.shift();
  C.pegadas.push({x:x+(o._lado?-1:1)*Math.max(1,r*0.3),y:y+r*0.6,cor,vida:t==="areia"?7:10,max:t==="areia"?7:10,tam:r>6?2:1}); }
function atualizarPegadas(dt){ const C=J.cena, P=J.jogador;
  // na areia o vento apaga as pegadas mais depressa (transporte de grãos)
  const apaga=1+C.Wm/45;
  for(const p of C.pegadas) p.vida-=dt*(p.cor===tom(COR_SOLO.areia[0],.75)?apaga:1); C.pegadas=C.pegadas.filter(p=>p.vida>0);
  for(const o of C.ondas){ o.vida-=dt; o.r+=dt*14; } C.ondas=C.ondas.filter(o=>o.vida>0);
  const vj=Math.hypot(J.pvx,J.pvy); if(vj>8) rastroDe(J,P.x,P.y+4,vj*dt,4);
  for(const s of R.selos){ if(!s.mon||s.x==null) continue; const v=Math.hypot(s.vx||0,s.vy||0); if(v>8) rastroDe(s,s.x,s.y+4,v*dt,3); }
  for(const e of J.inimigos){ if(e.hp<=0||(e.tipo!==2&&!e.chefe&&!e.mini&&!e.elite)) continue; const v=Math.hypot(e.vx||0,e.vy||0); if(v>6) rastroDe(e,e.x,e.y+e.r*0.6,v*dt,e.r); } }

// ---------------------------------------------------------------- clima: partículas do ar
function particulaAr(k,x,y,z,vx,vy){ const C=J.cena; if(C.ar.length>300) C.ar.shift();
  const p={k,x,y,z:z??0,vx:vx??0,vy:vy??0,vz:0,vida:3,max:3,fase:Math.random()*6.28,cor:null,tam:1};
  switch(k){
    case "neve": p.vz=-rnd(14,20); p.vida=p.max=8; p.cor="#f4f8ff"; p.tam=Math.random()<.25?2:1; break;
    case "cinzas": p.vz=-rnd(8,12); p.vida=p.max=8; p.cor=Math.random()<.5?"#5a5660":"#8a8690"; break;
    case "chuva": case "garoa": p.vz=-(k==="chuva"?rnd(240,280):rnd(150,190)); p.vida=p.max=2; p.cor=k==="chuva"?"#a8c8f0":"#c8d8f0"; break;
    case "folhas": p.vz=-rnd(6,10); p.vida=p.max=7; p.cor=escolha(J.cena.u.elemento==="natureza"&&J.cena.u.id!=="floresta_negra"?["#4f9a3c","#7ac050","#3a7a30"]:["#c8743a","#d8a040","#a84a2a","#8a6a2a"]); p.tam=2; break;
    case "petalas": p.vz=-rnd(5,9); p.vida=p.max=7; p.cor=J.cena.kit.petala||"#f4c8d8"; p.tam=Math.random()<.5?2:1; break;
    case "sementes": p.vz=rnd(-2,3); p.vida=p.max=rnd(5,8); p.cor="#f4f4ee"; break;
    case "poeira": p.vz=rnd(0,8); p.vida=p.max=rnd(1.2,2.2); p.cor=Math.random()<.5?"#c8a870":"#a88a58"; break;
    case "brasas": p.vz=rnd(16,34); p.vida=p.max=rnd(1.6,2.8); p.luz=true; break;
    case "polen": p.vz=rnd(-1,2); p.vida=p.max=rnd(3,5); p.cor="#ffe9a0"; p.luz=true; break;
    case "esporos": p.vz=rnd(1,5); p.vida=p.max=rnd(3,5); p.cor=J.cena.kit.cogu||"#b070f0"; p.luz=true; break;
    case "esporos_luz": p.vz=rnd(2,6); p.vida=p.max=rnd(3,5); p.cor="#9ff07a"; p.luz=true; break;
    case "vagalumes": p.z=rnd(4,14); p.vida=p.max=rnd(6,10); p.cor="#d8ff8a"; p.luz=true; break;
    case "faiscas": p.vz=rnd(30,60); p.vida=p.max=rnd(.25,.5); p.cor="#fff3a0"; p.luz=true; p.vx=rnd(-60,60); p.vy=rnd(-60,60); break;
    case "bolhas": p.vz=rnd(10,18); p.vida=p.max=rnd(2.5,4); p.cor="#bfe6ff"; p.tam=Math.random()<.3?2:1; break;
  }
  C.ar.push(p); return p; }
function brasa(x,y,z,vx,vy){ const p=particulaAr("brasas",x,y,z,vx,vy); p.vx=vx||0; p.vy=vy||0; }
function fumaca(x,y,r,cor){ const C=J.cena; if(C.fumaca.length>120) C.fumaca.shift(); C.fumaca.push({x,y,z:rnd(2,6),r:r*0.5,r1:r*1.8,vida:rnd(1.8,2.8),max:2.8,cor:cor||"#4a4650",vz:rnd(8,14)}); }
const QUEDA={neve:1,cinzas:1,chuva:1,garoa:1,folhas:1,petalas:1};
function atualizarAr(dt,ox,oy){ const C=J.cena, k=C.kit;
  // geração: as que caem nascem no alto e "a barlavento", para pousarem dentro da tela
  const taxa={neve:30,cinzas:8,chuva:150,garoa:55,folhas:2.5,petalas:3,sementes:4+C.Wm/12,poeira:4+C.Wm/6,brasas:5,polen:4,esporos:4,esporos_luz:5,vagalumes:1.2,faiscas:1.2,bolhas:6};
  // com a horda grande, o clima abre espaço para os golpes (menos partículas de ambiente)
  const ocupado=Math.min(0.75,J.inimigos.length/220+J.parts.length/900), q=QUAL===0?0.4:QUAL===1?0.7:1;
  for(const tipo of k.part){ let n=taxa[tipo]*dt*(1-ocupado)*q; if(tipo==="vagalumes"&&C.ar.filter(p=>p.k==="vagalumes").length>14) n=0;
    while(n>0){ if(Math.random()>=n){ break; } n-=1;
      let x=ox+rnd(-20,VW+20), y=oy+rnd(-20,VH+20), z=0;
      if(QUEDA[tipo]){ z=tipo==="chuva"||tipo==="garoa"? rnd(50,90) : rnd(40,80); const vz=tipo==="chuva"?260:tipo==="garoa"?170:tipo==="neve"?17:9; x-=C.Wx*z/vz; y-=C.Wy*z/vz; }
      else if(tipo==="brasas"&&J.cena.u.elemento!=="fogo"){ z=0; }
      if(tipo==="faiscas"){ for(let i=0;i<3;i++) particulaAr(tipo,x,y,rnd(0,4)); continue; }
      particulaAr(tipo,x,y,z); } }
  // fogo no chão solta brasas e fumaça
  C.tSolo-=dt; if(C.tSolo<=0){ C.tSolo=0.12; let fogos=0;
    for(const [key,m] of J.solo){ if(m.t!=="fogo"||m.ate<J.t) continue; const [cx,cy]=key.split(",").map(Number), x=cx*CEL+4, y=cy*CEL+4;
      if(x<ox-10||x>ox+VW+10||y<oy-10||y>oy+VH+10) continue; if(++fogos>40) break;
      if(Math.random()<.35) brasa(x+rnd(-3,3),y,rnd(2,5)); if(Math.random()<.12) fumaca(x,y,3); } }
  const sub=k.submerso;
  for(const p of C.ar){ p.vida-=dt; const w=vento(p.x,p.y);
    switch(p.k){
      case "chuva": case "garoa": p.vx=w.x; p.vy=w.y; p.z+=p.vz*dt; if(p.z<=0){ p.vida=0; respingo(p.x,p.y); } break;  // gota em velocidade terminal: anda com o vento
      case "neve": case "cinzas": { const kk=1-Math.exp(-dt/0.6); p.vx+=(w.x-p.vx)*kk; p.vy+=(w.y-p.vy)*kk; p.vx+=Math.sin(J.t*2+p.fase)*6*dt*10*dt; p.z+=p.vz*dt+Math.sin(J.t*1.7+p.fase)*0.15; if(p.z<=0){ p.z=0; p.vz=0; p.vx*=0.8; p.vy*=0.8; if(p.vida>1.5) p.vida=1.5; } break; }
      case "folhas": case "petalas": { const kk=1-Math.exp(-dt/0.5); p.vx+=(w.x-p.vx)*kk; p.vy+=(w.y-p.vy)*kk; p.x+=Math.cos(J.t*3+p.fase)*8*dt; p.z+=p.vz*dt+Math.sin(J.t*4+p.fase)*0.25;
        if(p.z<=0){ p.z=0; p.vx*=0.9; p.vy*=0.9; if(Math.hypot(w.x,w.y)>45&&Math.random()<dt*2) p.vz=rnd(8,16); else p.vz=Math.min(p.vz,0); if(p.vida>2) p.vida=2; } else p.vz-=0; p.vz=Math.max(p.vz-dt*20,-10); break; }
      case "sementes": { const kk=1-Math.exp(-dt/0.15); p.vx+=(w.x-p.vx)*kk; p.vy+=(w.y-p.vy)*kk; p.vz+=(Math.sin(J.t*2+p.fase)*6-p.vz)*dt; p.z=Math.max(0,p.z+p.vz*dt); break; }
      case "poeira": { const kk=1-Math.exp(-dt/0.2); p.vx+=(w.x*1.1-p.vx)*kk; p.vy+=(w.y*1.1-p.vy)*kk; p.vz+=(-12+Math.sin(J.t*9+p.fase)*20)*dt; p.z=Math.max(0,p.z+p.vz*dt); break; }
      case "brasas": { const kk=1-Math.exp(-dt/0.4); p.vx+=(w.x-p.vx)*kk; p.vy+=(w.y-p.vy)*kk; p.vz=Math.max(4,p.vz-dt*8); p.z+=p.vz*dt; break; }   // ar quente sobe (empuxo)
      case "polen": case "esporos": case "esporos_luz": { const kk=1-Math.exp(-dt/0.8); p.vx+=(w.x*0.5+rnd(-20,20)-p.vx)*kk; p.vy+=(w.y*0.5+rnd(-20,20)-p.vy)*kk; p.z=Math.max(0,p.z+p.vz*dt); break; }
      case "vagalumes": { p.vx+=(Math.sin(J.t*0.9+p.fase)*14-p.vx)*dt; p.vy+=(Math.cos(J.t*1.1+p.fase*1.3)*14-p.vy)*dt; p.z=8+Math.sin(J.t*1.3+p.fase)*5; break; }
      case "faiscas": p.vz-=GRAV*1.5*dt; p.z+=p.vz*dt; if(p.z<0){ p.z=0; p.vz=-p.vz*0.4; } p.vx*=0.95; p.vy*=0.95; break;
      case "bolhas": p.vz+=12*dt; p.z+=p.vz*dt; p.vx=w.x*0.4+Math.sin(J.t*6+p.fase)*8; p.vy=w.y*0.4; if(p.z>60) p.vida=0; break;  // bolha acelera subindo (empuxo)
    }
    if(C.vort.length&&p.k!=="chuva"&&p.k!=="garoa"){ const l=sustentacao(p.x,p.y); if(l>0){ p.vx=w.x; p.vy=w.y; p.z+=l*dt*0.6*Math.max(0,1-p.z/40); if(p.vz<0) p.vz*=0.5; if(p.k==="brasas") p.vz*=0.9; } }
    p.x+=p.vx*dt; p.y+=p.vy*dt;
    if(p.x<ox-80||p.x>ox+VW+80||p.y<oy-80||p.y>oy+VH+120) p.vida=0; }
  C.ar=C.ar.filter(p=>p.vida>0);
  for(const f of C.fumaca){ f.vida-=dt; const w=vento(f.x,f.y); f.x+=w.x*0.8*dt; f.y+=w.y*0.8*dt; f.z+=f.vz*dt; f.vz*=Math.exp(-dt*0.5); f.r+=(f.r1-f.r)*dt*0.8; }
  C.fumaca=C.fumaca.filter(f=>f.vida>0);
  // rastros de vento: aparecem só quando o vento é forte o bastante para ser visto
  if(!sub){ const forca=Math.max(0,C.Wm-28)/12; let n=forca*dt*3; while(n>0){ if(Math.random()>=n) break; n--; C.rastros.push({x:ox+rnd(-30,VW),y:oy+rnd(0,VH),vida:rnd(.5,.9),max:.9,len:rnd(6,14),f:rnd(0,6)}); }
    for(const r of C.rastros){ r.vida-=dt; const w=vento(r.x,r.y); r.x+=w.x*dt; r.y+=w.y*dt; } C.rastros=C.rastros.filter(r=>r.vida>0).slice(-50); }
  // névoa e sombras de nuvem andam com o vento; nuvens mais altas andam mais rápido
  const ww=sub?0.4:1;
  for(const n of C.nevoa){ n.x+=C.Wx*0.8*ww*dt; n.y+=C.Wy*0.8*ww*dt; envolver(n,ox,oy,n.r); }
  for(const n of C.nuvens){ n.x+=C.Wx*1.6*dt; n.y+=C.Wy*1.6*dt; envolver(n,ox,oy,n.r); }
  if(C.luzes){ for(const l of C.luzes) l.vida-=dt; C.luzes=C.luzes.filter(l=>l.vida>0); } }
function envolver(n,ox,oy,r){ const w=VW+2*r+40, h=VH+2*r+40, x0=ox-r-20, y0=oy-r-20;
  n.x=x0+(((n.x-x0)%w)+w)%w; n.y=y0+(((n.y-y0)%h)+h)%h; }
function respingo(x,y){ const C=J.cena, t=soloEm(Math.floor(x/CEL),Math.floor(y/CEL));
  if((t==="agua"||t==="eletrico")&&C.ondas.length<80&&Math.random()<.5) C.ondas.push({x,y,r:0.5,vida:.6});
  else if(Math.random()<.25&&C.destrocos.length<260) C.destrocos.push({x,y,z:1,vx:rnd(-12,12),vy:rnd(-12,12),vz:rnd(15,30),cor:"#c8d8f0",tam:1,vida:.25});
  // chuva apaga fogo aos poucos e molha os objetos
  if(t==="fogo"&&Math.random()<0.04) aplicarElementoNoSolo(x,y,"agua"); }

// ---------------------------------------------------------------- redemoinhos de poeira e de fogo
function atualizarVortices(dt,ox,oy){ const C=J.cena, P=J.jogador;
  if(C.kit.redemoinho&&!J.fim){ C.tVort-=dt; if(C.tVort<=0&&C.vort.length<2){ C.tVort=rnd(16,28); const a=Math.random()*Math.PI*2, d=rnd(50,90);
    C.vort.push({x:P.x+Math.cos(a)*d,y:P.y+Math.sin(a)*d,r:9,vmax:150,vida:rnd(10,16),fogo:false,f:rnd(0,6)}); } }
  for(const w of C.vort){ w.vida-=dt;
    w.x+=(C.Wx*0.5+Math.sin(J.t*0.7+w.f)*18)*dt; w.y+=(C.Wy*0.5+Math.cos(J.t*0.9+w.f)*18)*dt;
    // passou sobre fogo: vira redemoinho de fogo (fenômeno real em incêndios); confere a área do núcleo, não só o centro
    let t=null; for(const [ax,ay] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]){ const v=soloEm(Math.floor((w.x+ax*w.r*0.7)/CEL),Math.floor((w.y+ay*w.r*0.7)/CEL)); if(v==="fogo"){ t=v; break; } }
    if(t==="fogo"&&!w.fogo){ w.fogo=true; w.vida=Math.max(w.vida,6); texto(w.x,w.y-20,"Redemoinho de fogo!","#ff8a3d",14); }
    if(w.fogo){ w.tf=(w.tf||0)-dt; if(w.tf<=0){ w.tf=0.2; aplicarElementoNoSolo(w.x+rnd(-6,6),w.y+rnd(-6,6),"fogo"); const tt=soloEm(Math.floor(w.x/CEL),Math.floor(w.y/CEL)); if(tt==="grama"||tt==="vinha"||tt==="chao") mudarSolo(w.x,w.y,"fogo");
        const f=FONTE; FONTE="ambiente"; emArea(w.x,w.y,w.r+3,e=>{ if(e.ehProp){ danificarProp(e,0,"fogo"); return; } e.status={el:"fogo",t:J.t}; danoSimples(e,pctMax(e,0.06)+2); }); FONTE=f;
        if(Math.hypot(P.x-w.x,P.y-w.y)<w.r&&J.invuln<=0&&!ativos().some(s=>elementoDe(s)==="fogo")) J.vida-=J.vidaMax*0.015; }
      for(let i=0;i<2;i++){ const a=Math.random()*Math.PI*2, r=w.r*rnd(.6,1.2); brasa(w.x+Math.cos(a)*r,w.y+Math.sin(a)*r,rnd(0,8)); const q=J.cena.ar[J.cena.ar.length-1]; if(q){ q.vz=rnd(6,14); q.vida=q.max=rnd(.8,1.4); } } }
    else if(Math.random()<dt*18){ const a=Math.random()*Math.PI*2, r=Math.random()*w.r*1.4; const p=particulaAr("poeira",w.x+Math.cos(a)*r,w.y+Math.sin(a)*r,rnd(0,6)); p.vida=p.max=rnd(1,1.8); }
    // inimigos giram em volta; objetos leves são arrastados pelo campo de vento
    for(const e of J.inimigos){ if(e.hp<=0||e.chefe||e.mini) continue; const dx=e.x-w.x, dy=e.y-w.y, d=Math.hypot(dx,dy)||1; if(d>w.r*2.2) continue; const q=(1-d/(w.r*2.2))*40*dt; e.x+=(-dy/d)*q; e.y+=(dx/d)*q; } }
  C.vort=C.vort.filter(w=>w.vida>0); }

// ---------------------------------------------------------------- relâmpagos: preferem o que é alto e condutor (para-raios)
function atualizarRaios(dt){ const C=J.cena, P=J.jogador;
  if(C.kit.relampago&&!J.fim){ C.tRaio-=dt;
    if(C.tRaio<=0&&!C.aviso){ C.tRaio=C.raioRapido? rnd(2.5,4.5) : rnd(8,15); const a=Math.random()*Math.PI*2, d=rnd(30,100); let x=P.x+Math.cos(a)*d, y=P.y+Math.sin(a)*d, alvo=null, bd=140*140;
      for(const p of C.lista) if(p.mat.condutor){ const dd=(p.x-x)**2+(p.y-y)**2; if(dd<bd){ bd=dd; alvo=p; } }
      if(alvo){ x=alvo.x; y=alvo.y-alvo.r; } C.aviso={x,y,t:0.9,alvo}; } }
  if(C.aviso){ C.aviso.t-=dt; if(Math.random()<dt*20) particulaAr("faiscas",C.aviso.x+rnd(-6,6),C.aviso.y+rnd(-4,4),0);
    if(C.aviso.t<=0){ const {x,y,alvo}=C.aviso; C.aviso=null; cairRaio(x,y,alvo); } }
  for(const r of C.raios) r.vida-=dt; C.raios=C.raios.filter(r=>r.vida>0); }
function cairRaio(x,y,alvo){ const C=J.cena, P=J.jogador;
  const pts=[]; let px=x+rnd(-20,20), py=y-VH; for(let i=0;i<=10;i++){ const t=i/10; pts.push([px+(x-px)*t+(i&&i<10?rnd(-7,7):0), py+(y-py)*t]); }
  C.raios.push({pts,vida:.28,max:.28}); J.flash={cor:"#e8f0ff",vida:.16}; tremor(6); parar(0.04); anel(x,y,22,"#e8f0ff",.4); particulas(x,y,"#fff3a0",16,140,2);
  C.luzes=(C.luzes||[]); C.luzes.push({x,y,r:120,cor:"200,220,255",vida:.3,max:.3});
  const f=FONTE; FONTE="ambiente"; const dano=DIF.hp*2.2*dificuldade();
  emArea(x,y,24,e=>{ if(e.ehProp){ danificarProp(e,dano*0.5,"raio"); return; } danoSimples(e,dano); e.status={el:"raio",t:J.t}; }); FONTE=f;
  if(alvo){ conduzir(alvo,dano*0.7,90); evento("raio_metal"); } if(Math.hypot(P.x-x,P.y-y)<60) evento("relampago");
  for(let i=-1;i<=1;i++) for(let j=-1;j<=1;j++){ const cx=x+i*CEL, cy=y+j*CEL, t=soloEm(Math.floor(cx/CEL),Math.floor(cy/CEL)); if(t==="grama"||t==="vinha") mudarSolo(cx,cy,"fogo"); else aplicarElementoNoSolo(cx,cy,"raio"); }
  if(Math.hypot(P.x-x,P.y-y)<18&&J.invuln<=0){ J.vida-=J.vidaMax*0.07; texto(P.x,P.y-14,"Raio!","#e8f0ff",14); } }

// ---------------------------------------------------------------- passo do cenário (chamado uma vez por quadro)
function atualizarCena(dt){ const C=J.cena; if(!C) return; C.t+=dt;
  const ang=C.ang0+0.3*Math.sin(C.t*0.031); C.dx=Math.cos(ang); C.dy=Math.sin(ang);
  const temAr=ativos().some(s=>elementoDe(s)==="ar");   // monstros de Ar atiçam o vento
  C.vBase=C.kit.vento*(0.82+0.18*Math.sin(C.t*0.11+1.3))*(temAr?1.3:1);
  const P=J.jogador, w=vento(P.x,P.y); C.Wx=w.x; C.Wy=w.y; C.Wm=Math.hypot(w.x,w.y);
  for(const s of R.selos){ if(!s.mon||s.x==null) continue; if(s._px!=null&&dt>0){ s.vx=(s.x-s._px)/dt; s.vy=(s.y-s._py)/dt; } s._px=s.x; s._py=s.y; }
  const ox=P.x-VW/2, oy=P.y-VH/2;
  carregarProps(ox,oy); atualizarProps(dt); atualizarTufos(dt); atualizarPegadas(dt); atualizarDestrocos(dt);
  atualizarAr(dt,ox,oy); atualizarVortices(dt,ox,oy); atualizarRaios(dt); atualizarEstrutura(dt); }
// golpe que atinge um objeto (projéteis e balas)
function propNoPonto(x,y,r){ const C=J.cena; if(!C) return null; for(const p of C.lista){ if(p.morto||p.mat.fantasma) continue; const R=p.r*p.esc+r; if((p.x-x)**2+(p.y-p.r*0.4-y)**2<R*R) return p; } return null; }
function propMaisProximo(o,alc){ const C=J.cena; if(!C) return null; let best=null, bd=alc*alc;
  for(const p of C.lista){ if(p.morto||p.mat.indestrutivel) continue; const d=dist2(o,p); if(d<bd){ bd=d; best=p; } } return best; }

// ================================================================ desenho do cenário
function spriteCena(chave,w,h,fn){ const C=J.cena; if(C.sprites.has(chave)) return C.sprites.get(chave);
  const c=document.createElement("canvas"); c.width=w; c.height=h; const g=c.getContext("2d"); fn(g,(x,y,cor)=>{ g.fillStyle=cor; g.fillRect(x,y,1,1); }); C.sprites.set(chave,c); return c; }
function spriteProp(p){ const C=J.cena, k=C.kit, t=p.tipo;
  if(t==="marco"||t==="luz"||t==="frente") return spriteMarco(p); const arte=spriteObjetoArte(p); if(arte) return arte;
  switch(t){
    case "vaso": { const [cor,faixa]=k.vaso||["#b8683a","#2a3a5a"], v=p.var; return spriteCena("vaso"+v,9,12,(g,px)=>{ const cla=tom(cor,1.25), esc=tom(cor,.66);
        for(let x=2;x<=6;x++) px(x,0,esc); for(let y=1;y<=2;y++) for(let x=3;x<=5;x++) px(x,y,x===3?cla:cor);
        const ry=v===1?4.6:4.2; for(let y=3;y<12;y++) for(let x=0;x<9;x++){ const dx=(x-4)/(v===2?3.6:4.4), dy=(y-7.4)/ry; if(dx*dx+dy*dy>1) continue;
          let c=dx<-0.35?cla:dx>0.4?esc:cor; if(y===6||(v===2&&y===9)) c=faixa; if(dy>0.78) c=esc; px(x,y,c); }
        px(2,5,tom(cor,1.5)); if(v===0){ px(0,5,esc); px(8,5,esc); } }); }
    case "caixote": return spriteCena("caixote",10,10,(g,px)=>{ const b="#8a5a30", c="#b07a44", e="#5a3a20";
        for(let x=0;x<10;x++){ for(let y=0;y<3;y++) px(x,y,y===0?tom(c,1.15):c); for(let y=3;y<10;y++) px(x,y,(x===0||x===9||y===9)?e:b); }
        for(let x=1;x<9;x++){ px(x,5,e); px(x,7,e); } for(let i=0;i<6;i++) px(2+i,8-Math.floor(i*0.9),c); px(1,4,"#d8c8a0"); px(8,4,"#d8c8a0"); px(1,8,"#d8c8a0"); px(8,8,"#d8c8a0"); });
    case "barril": case "polvora": { const fr=Math.floor((p.rolou/2.2)%4+4)%4, ver=p.eixo==="v";
      if(p.saque) return spriteCena("saque"+(ver?"v":"h")+fr,ver?8:12,ver?12:8,(g,px)=>{ for(let i=0;i<12;i++) for(let j=0;j<8;j++){ if((i===0||i===11)&&(j===0||j===7)) continue; let c=j<2?"#e8d8b8":j>5?"#a89878":"#d8c8a0"; if(i===2||i===9) c="#2a1e1a"; if(i>=4&&i<=7&&j>=2&&j<=5) c=(i+j)%2?"#c8302a":"#f2e7c9"; ver?px(j,i,c):px(i,j,c); } });
      return spriteCena(t+(ver?"v":"h")+fr,ver?8:12,ver?12:8,(g,px)=>{ const pol=t==="polvora", b=pol?"#6a2a20":"#8a5a30", c=pol?"#8a3a2a":"#b07a44", e=pol?"#3a1610":"#5a3a20", aro=pol?"#1a1416":"#4a4048";
        for(let i=0;i<12;i++) for(let j=0;j<8;j++){ if((i===0||i===11)&&(j===0||j===7)) continue; let cor=j<2?c:j>5?e:b; if(((j+fr)%3)===0) cor=tom(cor,.85);
          if(i===2||i===9) cor=aro; if((i===2||i===9)&&j===1) cor="#9a90a0"; if(i===0||i===11) cor=tom(cor,.8);
          if(pol&&i>=5&&i<=6&&j>=2&&j<=5&&((i-5)===((j-2)%2))) cor="#f2e7c9"; ver? px(j,i,cor) : px(i,j,cor); } }); }
    case "feno": return spriteCena("feno",11,8,(g,px)=>{ for(let x=0;x<11;x++) for(let y=0;y<8;y++){ if((x===0||x===10)&&(y===0||y===7)) continue; let c=y<2?"#f0d88a":y>5?"#a8843c":"#d8b85a";
        if(hash2(x,y,5)<.25) c="#b8943c"; if(x===3||x===7) c="#6a4a24"; px(x,y,c); } });
    case "fruta": if(k.fruta==="abobora") return spriteCena("abobora",8,7,(g,px)=>{ for(let x=0;x<8;x++) for(let y=1;y<7;y++){ const dx=(x-3.5)/4, dy=(y-4)/3; if(dx*dx+dy*dy>1) continue; let c=dx<-.3?"#f0a040":dx>.4?"#b85a1a":"#e07a2a"; if(x===2||x===5) c="#c8661e"; px(x,y,c); } px(3,0,"#4a7a2a"); px(4,1,"#4a7a2a"); });
      return spriteCena("coco",6,6,(g,px)=>{ for(let x=0;x<6;x++) for(let y=0;y<6;y++){ const dx=(x-2.5)/3, dy=(y-2.5)/3; if(dx*dx+dy*dy>1) continue; px(x,y,dx+dy<-.5?"#8a6a3a":hash2(x,y,9)<.3?"#5a3a1a":"#6a4a2a"); } px(2,1,"#a8885a"); });
    case "rocha": { const st=k.rocha||"normal", v=p.var; return spriteCena("rocha"+v+st,14,10,(g,px)=>{
        const base=st==="obsidiana"?"#2a2030":st==="areia"?"#a08a68":st==="coral"?"#c87a7a":"#7a7680", cla=st==="obsidiana"?"#5a4a70":tom(base,1.3), esc=tom(base,.65);
        for(let x=0;x<14;x++) for(let y=0;y<10;y++){ const nx=(x-6.5)/7, ny=(y-5.4)/4.8; if(nx*nx+ny*ny+0.35*hash2(x,y,11+v)>1.05) continue;
          let c=(nx+ny<-.45)?cla:(nx+ny>.55)?esc:base; if(st==="musgo"&&ny<-.35&&hash2(x,y,13)<.7) c=hash2(x,y,14)<.5?"#4f8a3c":"#3a6a30";
          if(st==="neve"&&ny<-.3) c=hash2(x,y,15)<.8?"#f0f6ff":"#c8d8e8"; if(st==="coral"&&hash2(x,y,17)<.18) c="#f0a0a0"; px(x,y,c); }
        if(st==="obsidiana"){ px(5,4,"#e8603c"); px(6,5,"#e8603c"); px(7,5,"#ffd34a"); px(9,6,"#e8603c"); } }); }
    case "gelo": return spriteCena("gelo",12,11,(g,px)=>{ g.globalAlpha=.88; for(let x=0;x<12;x++){ for(let y=0;y<3;y++) px(x,y,"#e0f6ff"); for(let y=3;y<11;y++) px(x,y,x<2?"#c8ecff":x>9?"#7fb8e0":"#9fd0ea"); }
        g.globalAlpha=1; for(let x=1;x<11;x++) px(x,3,"#ffffff"); px(4,5,"#e8f8ff"); px(5,6,"#e8f8ff"); px(6,6,"#e8f8ff"); px(8,8,"#c8e8ff"); px(1,1,"#ffffff"); });
    case "cristal": { const c=k.cristal||"#c8f0ff"; return spriteCena("cristal"+c,10,14,(g,px)=>{ const cla=tom(c,1.35), esc=tom(c,.62);
        const prisma=(x0,w,y0)=>{ for(let x=0;x<w;x++) for(let y=y0;y<14;y++){ const topo=y0+Math.abs(x-(w-1)/2)*1.4; if(y<topo) continue; px(x0+x,y,x<w/2-0.5?cla:x>w/2?esc:c); } };
        prisma(0,3,5); prisma(7,3,4); prisma(3,4,0); px(4,3,"#ffffff"); px(1,8,"#ffffff"); }); }
    case "arvore": { const ced=C.u.id==="mesopotamia", cop=C.u.elemento==="natureza"&&C.u.id!=="floresta_negra"?"#3f8a34":C.u.id==="floresta_negra"?"#2a4a2a":ced?"#2a5a3a":"#3a7a34", grande=p.carvalho;
      return spriteCena("arvore"+cop+(grande?"g":"")+p.var,grande?20:14,grande?26:20,(g,px)=>{ const W=grande?20:14, H=grande?26:20, tr=Math.round(W/2)-1;
        for(let y=H-8;y<H;y++) for(let x=tr;x<tr+3;x++) px(x,y,x===tr?"#7a5030":"#5a3a20");
        for(let y=0;y<H-6;y++) for(let x=0;x<W;x++){ const dx=(x-W/2+0.5)/(W/2), dy=(y-(H-6)*0.5)/((H-6)*0.5); const dentro=ced? Math.abs(dx)<(y/(H-6))*1.05&&y>1 : dx*dx+dy*dy+0.25*hash2(x,y,7+p.var)<1.05;
          if(!dentro) continue; let c=(dx+dy<-0.4)?tom(cop,1.3):(dx+dy>0.5)?tom(cop,.68):cop; if(hash2(x,y,11)<.12) c=tom(cop,1.5); px(x,y,c); }
        if(grande){ px(tr+1,H-4,"#d6ab4f"); px(tr,H-4,"#8a5a20"); px(tr+2,H-4,"#8a5a20"); } }); }
    case "tronco": { const ver=p.eixo==="v"; return spriteCena("tronco"+(ver?"v":"h")+Math.floor((p.rolou/2)%3+3)%3,ver?7:13,ver?13:7,(g,px)=>{ const fr=Math.floor((p.rolou/2)%3+3)%3;
        for(let i=0;i<13;i++) for(let j=0;j<7;j++){ let c=j<2?"#9a6a3a":j>4?"#4a2a14":"#7a5030"; if((j+fr)%3===0) c=tom(c,.85); if(i===0||i===12) c=j%2?"#c8a070":"#e0c090"; ver?px(j,i,c):px(i,j,c); } }); }
    case "ovo": return spriteCena("ovo",6,7,(g,px)=>{ for(let x=0;x<6;x++) for(let y=0;y<7;y++){ const dx=(x-2.5)/3, dy=(y-3.6)/3.4; if(dx*dx+dy*dy>1) continue; px(x,y,(dx+dy<-0.4)?"#ffffff":(dx+dy>0.5)?"#c8c0b0":"#f0eadc"); } px(2,3,"#c8473b"); px(4,4,"#c8473b"); });
    case "metal": { const v=k.metal||"aco";
      if(v==="estatua") return spriteCena("m_estatua",8,14,(g,px)=>{ for(let x=0;x<8;x++) for(let y=11;y<14;y++) px(x,y,y===11?"#d8d0c0":"#a8a090");
          const b="#b07a3a", vd="#5ab0a0"; for(let y=1;y<11;y++) for(let x=2;x<6;x++){ if(y<3&&(x===2||x===5)) continue; px(x,y,hash2(x,y,3)<.25?vd:(x===2?tom(b,1.25):b)); } px(1,4,b); px(6,3,b); px(6,2,b); });
      if(v==="sino") return spriteCena("m_sino",9,11,(g,px)=>{ px(4,0,"#6a4a2a"); px(3,1,"#6a4a2a"); px(5,1,"#6a4a2a"); for(let y=2;y<11;y++){ const w=Math.min(4,1+Math.floor((y-1)*0.6)); for(let x=4-w;x<=4+w;x++) px(x,y,y===10?"#5a3a1a":x<4-w+1?"#d8a050":hash2(x,y,4)<.15?"#5ab0a0":"#b07a3a"); } });
      if(v==="bobina") return spriteCena("m_bobina",8,14,(g,px)=>{ for(let x=1;x<7;x++) for(let y=11;y<14;y++) px(x,y,"#3a3640"); for(let y=4;y<11;y++) for(let x=2;x<6;x++) px(x,y,y%2?"#c87a3a":"#e09a5a");
          for(let x=1;x<7;x++) for(let y=0;y<4;y++){ const dx=(x-3.5)/2.6, dy=(y-1.8)/2; if(dx*dx+dy*dy<=1) px(x,y,dx+dy<-.4?"#ffffff":"#c8d0d8"); } });
      const cor=v==="oricalco"?"#c8603a":v==="braseiro"?"#4a4048":"#8a9ab0";
      return spriteCena("m_pilar"+v,8,14,(g,px)=>{ for(let x=0;x<8;x++) for(let y=12;y<14;y++) px(x,y,tom(cor,.6)); for(let y=2;y<12;y++) for(let x=2;x<6;x++) px(x,y,x===2?tom(cor,1.3):x===5?tom(cor,.7):cor);
        for(let x=1;x<7;x++){ px(x,1,tom(cor,1.1)); px(x,0,tom(cor,.8)); } if(v==="braseiro"){ px(3,0,"#ffd34a"); px(4,0,"#e8603c"); } }); } }
  return null; }
// marcos e objetos entram na fila de profundidade (ordenada pelo pé): quem está mais embaixo na tela fica na frente
function desenharProps(ox,oy,fila){ const C=J.cena;
  for(const p of C.lista){ if(p.tipo==="frente") fila.push({y:p.y,f:()=>desenharFrente(p,ox,oy)}); else fila.push({y:p.y+p.r*0.6,f:()=>desenharUmProp(p,ox,oy)}); } }
// alguém da equipe (ou o Invocador) atrás de um objeto alto: o objeto fica translúcido para não esconder ninguém
function equipeAtras(xc,yPe,w,h){ const dentro=(x,y)=>y<yPe&&y>yPe-h&&Math.abs(x-xc)<w/2; const P=J.jogador; if(dentro(P.x,P.y+6)) return true;
  for(const s of R.selos) if(s.mon&&s.x!=null&&dentro(s.x,s.y+8)) return true; return false; }
function desenharFrente(p,ox,oy){ const s=spriteMarco(p); if(!s) return; const atras=equipeAtras(p.x,p.y,s.width,s.height*(s.base||0.85));
  sombraContato(p.x-ox,p.y-oy+1,s.width*0.7,0.45); p._alfa=(p._alfa??1)+((atras?0.45:1)-(p._alfa??1))*0.2; lg.globalAlpha=p._alfa; lg.drawImage(s,Math.round(p.x-ox-s.width/2),Math.round(p.y-oy-s.height*(s.base||0.85))); lg.globalAlpha=1; }
function desenharUmProp(p,ox,oy){ const spr=p.spriteFixo||spriteProp(p); if(!spr) return; const kq=p.caindo>0? p.caindo/0.7 : 1, w=Math.round(spr.width*p.esc*kq), h=Math.round(spr.height*p.esc*kq); if(kq<1) lg.globalAlpha=kq;
    const bob=p.flut>0? Math.round(Math.sin(J.t*2.5+p.x)*1) : 0, lev=p.levita? Math.round(6+Math.sin(J.t*8+p.x)*1.5) : 0, x=Math.round(p.x-ox-w/2), y=Math.round(p.y-oy-h*(spr.base||1)+p.r*0.6)+bob-lev; if(p.tipo==="frente") return;
    if(x<-20||y<-20||x>VW+20||y>VH+20) return;
    if(h>22){ const at=equipeAtras(p.x,p.y+p.r*0.6,w,h); p._alfa=(p._alfa??1)+((at?0.5:1)-(p._alfa??1))*0.2; }
    if(p.flut>0){ lg.fillStyle="rgba(120,180,230,.3)"; lg.beginPath(); lg.ellipse(x+w/2,y+h-1.5,w*0.6,1.2,0,0,Math.PI*2); lg.fill(); } else sombraContato(p.x-ox,p.y-oy+p.r*0.6+1,w*1.05,0.4);
    if(!p.flut&&!p.levita&&!(p.subindo>0)) sombraProjetada(spr,x+w/2,y+h,w,h,false,1.1);
    if(p.flash>0){ lg.drawImage(branco(spr),x,y,w,h); return; }
    if(p.subindo>0){ const q=Math.max(0,1-p.subindo/0.4); lg.save(); lg.beginPath(); lg.rect(x,y,w,h); lg.clip(); lg.drawImage(spr,x,y+Math.round(h*(1-q)),w,h); lg.restore(); return; }
    if(p.levita){ lg.globalAlpha=.35; lg.drawImage(silhueta(spr,"#e8a0ff"),x-1,y,w+2,h+1); lg.globalAlpha=1; }
    if(p._alfa!=null&&p._alfa<0.99) lg.globalAlpha*=p._alfa; lg.drawImage(spr,x,y,w,h);
    lg.globalAlpha=1;
    if(p.ouro&&Math.sin(J.t*3+p.x*0.3)>0.9){ lg.fillStyle="#fff8d0"; lg.fillRect(x+Math.floor(w*0.3),y+Math.floor(h*0.3),1,1); }
    if(p.carvao>0){ lg.globalAlpha=p.carvao*0.75; lg.drawImage(silhueta(spr,"#1a1214"),x,y,w,h); lg.globalAlpha=1; }
    if(p.molhado>0&&!p.mat.fixo){ lg.globalAlpha=.25; lg.drawImage(silhueta(spr,"#1a3050"),x,y,w,h); lg.globalAlpha=1; }
    if(p.congela>0){ lg.globalAlpha=.55; lg.drawImage(silhueta(spr,"#dff4ff"),x,y,w,h); lg.globalAlpha=1; }
    if(p.mat.condutor&&p.solo==="eletrico"&&Math.random()<.3){ lg.fillStyle="#fff3a0"; lg.fillRect(x+Math.floor(Math.random()*w),y+Math.floor(Math.random()*h),1,1); } }
const cacheSil=new WeakMap(), cacheSilM=new WeakMap();
// silhueta com o tamanho do sprite (para virar o próprio sprite: estátua, ouro...). A silhueta comum é feita em alta resolução
// e por isso é bem maior: usada no lugar do sprite, o inimigo aparecia como um borrão cinza gigante cobrindo a tela.
function silhuetaMundo(spr,cor){ let m=cacheSilM.get(spr); if(!m){ m={}; cacheSilM.set(spr,m); } if(m[cor]) return m[cor];
  const c=document.createElement("canvas"); c.width=spr.width; c.height=spr.height; const g=c.getContext("2d"); g.drawImage(spr,0,0); g.globalCompositeOperation="source-in"; g.fillStyle=cor; g.fillRect(0,0,c.width,c.height);
  const hi=silhueta(spr,cor); if(hi.width!==c.width) c._hi=hi; c.base=spr.base; c._pe=spr._pe; c._alvo=spr._alvo; m[cor]=c; return c; }
function silhueta(spr,cor){ const k=cor; let m=cacheSil.get(spr); if(!m){ m={}; cacheSil.set(spr,m); } if(m[k]) return m[k];
  const b=baseHi(spr), c=document.createElement("canvas"); c.width=b.width; c.height=b.height; const g=c.getContext("2d"); g.drawImage(b,0,0); g.globalCompositeOperation="source-in"; g.fillStyle=cor; g.fillRect(0,0,c.width,c.height); if(b!==spr) c._suave=true; m[k]=c; return c; }
// detalhes do chão desenhados uma vez por pedaço (pedrinhas, rachaduras, flores, lajotas...)
function detalhePedaco(cx,cy){ const C=J.cena, k=cx+":"+cy; if(C.detalhes.has(k)) return C.detalhes.get(k);
  if(C.detalhes.size>48){ const pk=C.detalhes.keys().next().value; C.detalhes.delete(pk); }
  const c=document.createElement("canvas"); c.width=c.height=CH; const g=c.getContext("2d"), r=semente(C.u.id+"d"+k), base=COR[C.u.elemento];
  const px=(x,y,cor,w,h)=>{ g.fillStyle=cor; g.fillRect(Math.floor(x),Math.floor(y),w||1,h||1); };
  const lista=detalhesArte(r); if(lista){ C.detalhes.set(k,lista); return lista; }
  for(const tipo of C.kit.chao||[]){
    switch(tipo){
      case "pedras": for(let i=0;i<8;i++){ const x=r()*CH, y=r()*CH, g1=r()<.4; px(x,y,tom(base,.55),g1?2:1,g1?2:1); px(x,y,tom(base,.8)); } break;
      case "rachaduras": for(let i=0;i<2;i++){ let x=r()*CH, y=r()*CH; const a=r()*6.28; for(let s=0;s<12;s++){ x+=Math.cos(a+(r()-.5)*1.4)*1.2; y+=Math.sin(a+(r()-.5)*1.4)*1.2; px(x,y,tom(base,.14)); } } break;
      case "flores": for(let i=0;i<7;i++){ const x=r()*CH, y=r()*CH, cor=escolha(["#f4e8f0","#f2d23a","#e87aa8","#8ab0f0","#f0f0f0"]); px(x,y+1,"#3f7a34"); px(x,y,cor); if(r()<.5){ px(x-1,y,cor); px(x+1,y,cor); px(x,y-1,cor); px(x,y,"#f2d23a"); } } break;
      case "ossos": for(let i=0;i<2;i++){ const x=r()*CH, y=r()*CH; if(r()<.3){ px(x,y,"#e8e0d0",3,3); px(x,y+1,"#2a2420"); px(x+2,y+1,"#2a2420"); } else { px(x,y,"#e8e0d0",4,1); px(x-1,y-1,"#e8e0d0"); px(x+4,y+1,"#e8e0d0"); } } break;
      case "conchas": for(let i=0;i<5;i++){ const x=r()*CH, y=r()*CH; px(x,y,r()<.5?"#f4d8c0":"#f0f0e8",2,2); px(x,y+1,"#c8a088"); } break;
      case "lajotas": { if(r()<.45) break; const ox0=Math.floor(r()*40), oy0=Math.floor(r()*40); g.globalAlpha=.45; for(let j=0;j<4;j++) for(let i=0;i<4;i++){ if(r()<.55) continue; const x=ox0+i*10, y=oy0+j*7+(i%2)*3; if(x>CH-9||y>CH-6) continue;
          g.fillStyle=mistura(tom(base,.3),"#8a8478",.6); g.fillRect(x,y,9,6); g.fillStyle="rgba(0,0,0,.35)"; g.fillRect(x,y+5,9,1); g.fillRect(x+8,y,1,6); g.fillStyle="rgba(255,255,255,.12)"; g.fillRect(x,y,8,1); } g.globalAlpha=1; break; }
      case "ladrilhos": g.globalAlpha=.6; for(let i=0;i<3;i++){ const x=r()*(CH-8), y=r()*(CH-8); for(let a=0;a<3;a++) for(let b=0;b<3;b++) px(x+a*3,y+b*3,(a+b)%2?"#3fa8b8":"#d6ab4f",2,2); } g.globalAlpha=1; break;
      case "musgo": for(let i=0;i<14;i++){ const x=r()*CH, y=r()*CH; px(x,y,r()<.5?"#3a6a30":"#4f8a3c",1+Math.floor(r()*2),1); } break;
      case "folhas": for(let i=0;i<10;i++){ const x=r()*CH, y=r()*CH; px(x,y,escolha(["#c8743a","#d8a040","#a84a2a","#6a8a2a"]),2,1); } break;
      case "raizes": for(let i=0;i<2;i++){ let x=r()*CH, y=r()*CH; const a=r()*6.28; for(let s=0;s<18;s++){ x+=Math.cos(a+Math.sin(s*.5))*1.1; y+=Math.sin(a+Math.sin(s*.5))*1.1; px(x,y,"#5a3a20"); } } break;
      case "neve": for(let i=0;i<5;i++){ const x=r()*CH, y=r()*CH, w=3+Math.floor(r()*6); g.fillStyle="rgba(240,246,255,.55)"; g.fillRect(x,y,w,2); g.fillRect(x+1,y-1,w-2,1); } break; } }
  C.detalhes.set(k,c); return c; }
function desenharDetalhesChao(ox,oy){ const c0=Math.floor(ox/CH), r0=Math.floor(oy/CH);
  for(let cy=r0;cy<=r0+Math.ceil(VH/CH)+1;cy++) for(let cx=c0;cx<=c0+Math.ceil(VW/CH)+1;cx++){ const d=detalhePedaco(cx,cy);
    // arte importada: cada enfeite vai direto da folha original em alta resolução (antes saía de um canvas pequeno e ficava borrado)
    if(Array.isArray(d)){ for(const e of d){ lg.globalAlpha=e.a; lg.drawImage(e.s,cx*CH-ox+e.x,cy*CH-oy+e.y,e.w,e.w); } lg.globalAlpha=1; }
    else lg.drawImage(d,cx*CH-ox,cy*CH-oy); } }
// vegetação: cada folha é uma curva fina (traço suave), curvada pelo vento e pelo contato
const BALDES=new Map();
function balde(cor,lw){ const k=cor+"|"+(lw||0.8); let b=BALDES.get(k); if(!b){ b={cor,lw:lw||0.8,v:[],p:[]}; BALDES.set(k,b); } return b; }
function desenharTufos(ox,oy){ const C=J.cena, V=VEG[C.veg]; if(!V) return; for(const b of BALDES.values()){ b.v.length=0; b.p.length=0; }
  const c0=Math.floor(ox/CEL)-1, r0=Math.floor(oy/CEL)-1, nc=Math.ceil(VW/CEL)+3, nr=Math.ceil(VH/CEL)+4, pisca=Math.floor(J.t*10), sub=C.kit.submerso;
  const capC=C.kit.cogu||"#c070ff", pintado=!!(chao&&chao.suave);
  for(let j=0;j<nr;j++) for(let i=0;i<nc;i++){ const cx=c0+i, cy=r0+j, t=tufoInfo(cx,cy); if(!t) continue; if(QUAL<2&&hash2(cx,cy,91)>(QUAL===1?0.6:0.35)) continue;
    // sobre piso pintado, menos tufos soltos no chão comum (o piso já tem detalhe próprio)
    if(pintado&&t==="chao"&&hash2(cx,cy,93)>0.4) continue;
    const x0=cx*CEL+1+hash2(cx,cy,43)*6-ox, y0=cy*CEL+2+hash2(cx,cy,47)*5-oy, k=cx+","+cy, st=C.tufos.get(k), marca=C.marcas.get(k);
    // crescimento: grama nova (Natureza) brota aos poucos
    const sm=J.solo.get(k); let g=1; if(sm&&(t==="grama"||t==="vinha")){ g=Math.min(1,(J.t-(sm.ate-DUR[t]))*1.6); if(g<=0) continue; }
    if(t==="cinza"){ balde("#2e2a30").p.push(x0,y0,0.55,x0+2,y0+0.4,0.45); continue; }
    const w=vento(cx*CEL+4,cy*CEL+4), wm=Math.hypot(w.x,w.y), rig=t==="gelo"?0.1:1, kv=60/V.k;
    let bx=(sub? w.x/45 : w.x*wm/(VREF*VREF))*kv*rig, by=(sub? w.y/45 : w.y*wm/(VREF*VREF))*kv*rig*0.5; const bm=Math.hypot(bx,by); if(bm>1.1){ bx*=1.1/bm; by*=1.1/bm; }
    if(st){ bx+=st.bx; by+=st.by; }
    const turb=(sub?0.12:0.06+0.18*Math.min(1,wm/VREF))*rig;
    const h1=hash2(cx,cy,51), nb=V.cogu? 1 : V.n[0]+Math.floor(h1*(V.n[1]-V.n[0]+1));
    if(V.cogu){ const fl=Math.sin(J.t*5+h1*9)*turb, ex=(bx+fl)*3, hh=2+h1*2, cw=h1<.5?1.6:2.3;
      balde("#e8e0d0",0.9).v.push(x0,y0,x0+ex*0.3,y0-hh*0.6,x0+ex,y0-hh);
      balde(capC).p.push(x0+ex,y0-hh,cw); balde("#ffffff").p.push(x0+ex-cw*0.35,y0-hh-cw*0.3,cw*0.3); continue; }
    let cores=V.cores; if(t==="fogo") cores=["#3a2a20",(pisca+cx)%2?"#e8603c":"#ffb040","#ffd34a"]; else if(t==="gelo") cores=["#4a6a7a","#9ac4d8","#f0fbff"]; else if(t==="sombra") cores=["#2a1a3a","#4a2a60","#7a4fb0"]; else if(t==="luz") cores=[V.cores[0],V.cores[1],"#fff3c4"]; else if(t==="vinha") cores=["#1f4a1c","#2f6a28",V.cores[2]];
    for(let b=0;b<nb;b++){ const hb=hash2(cx*7+b,cy,53), L=Math.max(1,(V.L[0]+hb*(V.L[1]-V.L[0]))*g*(t==="lama"?0.4:t==="agua"&&C.veg!=="junco"&&!sub?0.5:t==="vinha"?1.25:1));
      const ofx=(hb-0.5)*4, fl=Math.sin(J.t*(sub?1.6:7)+hb*12+cx*0.3)*turb, ddx=(bx+fl)*L, ddy=by*L, encurta=1-0.3*Math.min(1,bx*bx+by*by);
      const quebrada=V.quebra&&marca, solta=V.solta==="sementes"&&marca, Lv=quebrada? Math.min(L,2) : L;
      const bx0=x0+ofx, q=Lv/L, tx=bx0+ddx*q*q, ty=y0-Lv*encurta+ddy*q*q, mx=bx0+ddx*q*q*0.25, my=y0-Lv*encurta*0.55;
      const lw=Math.round(Math.max(0.5,0.85-Lv*0.04)*4)/4;
      balde(cores[0],lw+0.25).v.push(bx0,y0+0.3,bx0,y0-Lv*0.25,bx0+ddx*0.06,y0-Lv*0.35*encurta);   // pé mais escuro
      balde(quebrada?cores[0]:cores[1],lw).v.push(bx0,y0,mx,my,tx,ty);
      if(!quebrada){ const ux=bx0+(tx-bx0)*0.7+(mx-bx0)*0.15, uy=y0+(ty-y0)*0.7; balde(cores[2],Math.round(lw*3)/4).v.push(ux,uy,(ux+tx)/2,(uy+ty)/2-0.2,tx,ty);
        if(V.cabeca) balde(cores[2]).p.push(tx,ty-0.3,0.75); }
      if(C.veg==="dente"&&!solta&&!quebrada){ balde("#f4f4ee").p.push(tx,ty-1,1.3); } } }
  lg.lineCap="round"; lg.lineJoin="round"; if(pintado) lg.globalAlpha=0.82;
  for(const b of BALDES.values()){
    if(b.v.length){ lg.strokeStyle=b.cor; lg.lineWidth=b.lw; lg.beginPath(); const v=b.v; for(let i=0;i<v.length;i+=6){ lg.moveTo(v[i],v[i+1]); lg.quadraticCurveTo(v[i+2],v[i+3],v[i+4],v[i+5]); } lg.stroke(); }
    if(b.p.length){ lg.fillStyle=b.cor; lg.beginPath(); const p=b.p; for(let i=0;i<p.length;i+=3){ lg.moveTo(p[i]+p[i+2],p[i+1]); lg.arc(p[i],p[i+1],p[i+2],0,Math.PI*2); } lg.fill(); } }
  lg.lineWidth=1; lg.lineCap="butt"; lg.globalAlpha=1; }
function desenharCenaChao(ox,oy){ const C=J.cena; if(!C) return;
  for(const p of C.pegadas){ lg.globalAlpha=Math.min(1,p.vida/p.max*1.5)*0.45; lg.fillStyle=p.cor; lg.beginPath(); lg.ellipse(p.x-ox,p.y-oy+0.5,p.tam*0.6,0.5,0,0,Math.PI*2); lg.fill(); }
  lg.globalAlpha=1; lg.strokeStyle="#d8f0ff"; lg.lineWidth=1;
  for(const o of C.ondas){ lg.globalAlpha=o.vida*0.5; lg.beginPath(); lg.ellipse(o.x-ox,o.y-oy,o.r,o.r*0.55,0,0,Math.PI*2); lg.stroke(); }
  lg.globalAlpha=1;
  desenharTufos(ox,oy);
  for(const g of C.destrocos){ if(g.z>=1) continue; const x=Math.round(g.x-ox), y=Math.round(g.y-oy); if(x<-4||y<-4||x>VW+4||y>VH+4) continue; lg.globalAlpha=Math.min(1,g.vida); if(g.img) lg.drawImage(g.img,x-3,y-3); else { lg.fillStyle=g.cor; lg.beginPath(); lg.ellipse(x,y,g.tam*0.7+0.2,g.tam*0.5+0.2,(g.x+g.y)*0.3,0,Math.PI*2); lg.fill(); } }
  lg.globalAlpha=1; }
function desenharCenaObjetos(ox,oy,fila){ const C=J.cena; if(!C) return; desenharProps(ox,oy,fila);
  for(const g of C.destrocos){ if(g.z<1) continue; const x=Math.round(g.x-ox), y=Math.round(g.y-oy); if(x<-4||y<-40||x>VW+4||y>VH+4) continue;
    lg.globalAlpha=Math.min(1,g.vida)*0.25; lg.fillStyle="#000"; lg.beginPath(); lg.ellipse(x,y,g.tam*0.7,0.45,0,0,Math.PI*2); lg.fill(); lg.globalAlpha=Math.min(1,g.vida); if(g.img) lg.drawImage(g.img,x-3,Math.round(y-g.z)-3); else { lg.fillStyle=g.cor; lg.beginPath(); lg.ellipse(x,y-g.z,g.tam*0.7+0.2,g.tam*0.5+0.2,(g.x+g.y)*0.3,0,Math.PI*2); lg.fill(); } }
  lg.globalAlpha=1; }
function desenharCenaAr(ox,oy){ const C=J.cena; if(!C) return;
  // fumaça
  for(const f of C.fumaca){ const a=Math.min(1,f.vida/f.max*1.4)*0.32; lg.globalAlpha=a; lg.drawImage(bolhaCor(f.cor),f.x-ox-f.r,f.y-f.z-oy-f.r,f.r*2,f.r*2); }
  lg.globalAlpha=1;
  // redemoinhos: coluna translúcida que gira
  for(const w of C.vort){ const a=Math.min(1,w.vida/1.5); lg.globalAlpha=0.16*a; lg.drawImage(bolhaCor(w.fogo?"#ff8a3d":"#d8c090"),w.x-ox-w.r*1.6,w.y-oy-w.r*3.2,w.r*3.2,w.r*3.6);
    lg.globalAlpha=0.5*a; lg.strokeStyle=w.fogo?"#ffb060":"#e8d8b0"; for(let i=0;i<4;i++){ const ang=J.t*9+i*1.57, hy=i*6; lg.beginPath(); lg.ellipse(w.x-ox,w.y-oy-hy,w.r*(0.5+i*0.18),w.r*0.25,0,ang,ang+2.2); lg.stroke(); } }
  lg.globalAlpha=1;
  // partículas sem brilho próprio
  for(const p of C.ar){ if(p.luz) continue; const x=Math.round(p.x-ox), y=Math.round(p.y-oy-p.z); if(x<-2||y<-2||x>VW+2||y>VH+2) continue;
    const a=Math.min(1,p.vida/Math.min(1,p.max)*1.2); lg.globalAlpha=p.k==="poeira"?a*0.55:p.k==="garoa"?0.45:p.k==="chuva"?0.6:a;
    if(p.k==="chuva"||p.k==="garoa"){ const L=p.k==="chuva"?5:3, sx=-p.vx/Math.abs(p.vz)*L, sy=L; lg.strokeStyle=p.cor; lg.beginPath(); lg.moveTo(x+0.5,y+0.5); lg.lineTo(x+0.5+sx,y+0.5-sy); lg.stroke(); continue; }
    if(p.k==="bolhas"){ lg.strokeStyle=p.cor; lg.beginPath(); lg.arc(x+0.5,y+0.5,p.tam,0,Math.PI*2); lg.stroke(); lg.fillStyle="#ffffff"; lg.fillRect(x,y-p.tam+1,1,1); continue; }
    const fx=p.x-ox, fy=p.y-oy-p.z, folha=p.k==="folhas"||p.k==="petalas";
    if(p.z>1&&folha){ lg.globalAlpha=a*0.2; lg.fillStyle="#000"; lg.beginPath(); lg.ellipse(fx,p.y-oy,0.8,0.4,0,0,Math.PI*2); lg.fill(); lg.globalAlpha=a; }
    lg.fillStyle=p.cor; lg.beginPath();
    if(folha){ const giro=Math.sin(J.t*8+p.fase); lg.ellipse(fx,fy,Math.max(0.35,Math.abs(giro))*p.tam*0.7+0.2,p.tam*0.4+0.15,J.t*2+p.fase,0,Math.PI*2); }
    else lg.arc(fx,fy,Math.max(0.35,p.tam*0.45),0,Math.PI*2);
    lg.fill(); }
  lg.globalAlpha=1;
  // rastros de vento
  if(C.rastros.length){ lg.strokeStyle="#ffffff"; lg.lineWidth=0.45; lg.lineCap="round"; for(const r of C.rastros){ const w=vento(r.x,r.y), m=Math.hypot(w.x,w.y)||1, ux=w.x/m, uy=w.y/m;
      lg.globalAlpha=Math.sin(r.vida/r.max*Math.PI)*0.4; lg.beginPath(); lg.moveTo(r.x-ox,r.y-oy); lg.quadraticCurveTo(r.x-ox-ux*r.len*0.5-uy*Math.sin(J.t*6+r.f)*2,r.y-oy-uy*r.len*0.5+ux*Math.sin(J.t*6+r.f)*2,r.x-ox-ux*r.len,r.y-oy-uy*r.len); lg.stroke(); }
    lg.globalAlpha=1; lg.lineWidth=1; lg.lineCap="butt"; }
  // névoa e sombras das nuvens
  for(const n of C.nevoa){ lg.globalAlpha=n.a*(0.8+0.2*Math.sin(J.t*0.4+n.f)); lg.drawImage(bolhaCor(C.kit.nevoa),n.x-ox-n.r,n.y-oy-n.r*0.6,n.r*2,n.r*1.2); }
  for(const n of C.nuvens){ lg.globalAlpha=n.a; lg.drawImage(bolhaCor("#0a0814"),n.x-ox-n.r,n.y-oy-n.r*0.7,n.r*2,n.r*1.4); }
  lg.globalAlpha=1;
  // aviso do relâmpago
  if(C.aviso){ const a=C.aviso, q=1-a.t/0.9; lg.strokeStyle="#e8f0ff"; lg.globalAlpha=0.3+0.5*q*Math.abs(Math.sin(J.t*30)); lg.beginPath(); lg.ellipse(a.x-ox,a.y-oy,22*(1-q*0.4),12*(1-q*0.4),0,0,Math.PI*2); lg.stroke(); lg.globalAlpha=1; } }
function desenharCenaLuz(ox,oy){ const C=J.cena; if(!C) return;
  for(const p of C.ar){ if(!p.luz) continue; const x=Math.round(p.x-ox), y=Math.round(p.y-oy-p.z); if(x<-2||y<-2||x>VW+2||y>VH+2) continue; const q=p.vida/p.max;
    if(p.k==="brasas"){ lg.fillStyle=q>.6?"#ffd34a":q>.3?"#ff8a3d":"#c8473b"; lg.globalAlpha=Math.min(1,q*2)*(0.7+0.3*Math.sin(J.t*20+p.fase)); }
    else if(p.k==="vagalumes"){ const pis=Math.max(0,Math.sin(J.t*2.2+p.fase)); lg.fillStyle=p.cor; lg.globalAlpha=pis*Math.min(1,p.vida); if(pis>.6){ lg.globalAlpha=pis*0.25; lg.fillRect(x-1,y-1,3,3); lg.globalAlpha=pis; } }
    else { lg.fillStyle=p.cor; lg.globalAlpha=Math.min(1,q*2)*0.8; }
    lg.fillRect(x,y,1,1); }
  // chamas dos objetos em chamas e pavios
  for(const p of C.lista){ if(p.queima<=0&&!(p.pavio>0)) continue; const x=p.x-ox, y=p.y-oy-p.r*1.2;
    if(p.queima>0) for(let i=0;i<5;i++){ const h=Math.floor(Math.random()*5); lg.fillStyle=h>3?"#fff3a0":h>1?"#ffb040":"#e8603c"; lg.globalAlpha=.9; lg.fillRect(Math.round(x+rnd(-p.r,p.r)),Math.round(y-h-C.Wy*0.03),1,h+1); }
    lg.globalAlpha=0.18; lg.fillStyle=p.queima>0?"#ff8a3d":"#ffd34a"; lg.beginPath(); lg.arc(x,y+3,p.queima>0?9:4,0,Math.PI*2); lg.fill(); }
  for(const g of C.destrocos) if(g.brilho&&Math.sin(J.t*9+g.x)>0.85){ lg.globalAlpha=.9; lg.fillStyle="#ffffff"; lg.fillRect(Math.round(g.x-ox),Math.round(g.y-oy-g.z),1,1); }
  for(const p of C.lista) if(p.tipo==="cristal"&&Math.sin(J.t*2+p.x)>0.97){ lg.globalAlpha=.8; lg.fillStyle="#ffffff"; lg.fillRect(Math.round(p.x-ox)-1,Math.round(p.y-oy-10),3,1); lg.fillRect(Math.round(p.x-ox),Math.round(p.y-oy-11),1,3); }
  // cáusticas no fundo do mar
  if(C.causticas){ const fr=C.causticas[Math.floor(C.t*6)%8], sx=((Math.round(-ox+C.t*4)%64)+64)%64-64, sy=((Math.round(-oy+C.t*2)%64)+64)%64-64; lg.globalAlpha=0.13;
    for(let y=sy;y<VH;y+=64) for(let x=sx;x<VW;x+=64) lg.drawImage(fr,x,y); }
  // relâmpago
  for(const r of C.raios){ lg.globalAlpha=r.vida/r.max; lg.strokeStyle="#ffffff"; lg.lineWidth=1; lg.beginPath(); r.pts.forEach(([x,y],i)=>i? lg.lineTo(x-ox,y-oy) : lg.moveTo(x-ox,y-oy)); lg.stroke();
    lg.strokeStyle="#9fc0ff"; lg.globalAlpha*=0.5; lg.beginPath(); r.pts.forEach(([x,y],i)=>i? lg.lineTo(x-ox+1,y-oy) : lg.moveTo(x-ox+1,y-oy)); lg.stroke(); }
  lg.globalAlpha=1; }
// brilho na tela cheia: objetos em chamas, explosões e relâmpagos iluminam o entorno
function desenharCenaBrilho(ox,oy){ const C=J.cena; if(!C) return; ctx.globalCompositeOperation="lighter";
  const luz=(x,y,r,cor,a)=>{ const X=(x-ox)*S, Y=(y-oy)*S, RR=r*S, gr=ctx.createRadialGradient(X,Y,0,X,Y,RR); gr.addColorStop(0,`rgba(${cor},${a})`); gr.addColorStop(1,`rgba(${cor},0)`); ctx.fillStyle=gr; ctx.fillRect(X-RR,Y-RR,RR*2,RR*2); };
  let n=0; for(const p of C.lista){ if(p.queima>0&&n++<6) luz(p.x,p.y-p.r,34,"255,150,60",0.22+0.05*Math.sin(J.t*17+p.x)); if(p.tipo==="luz") luz(p.x,p.y-12,44,"255,190,110",0.2+0.04*Math.sin(J.t*9+p.x)); }
  for(const w of C.vort) if(w.fogo) luz(w.x,w.y-8,44,"255,140,50",0.3);
  for(const l of C.luzes||[]) luz(l.x,l.y,l.r,l.cor,0.5*l.vida/l.max);
  if(QUAL>=1&&!SIM.ativo&&J.inimigos){ for(const s of R.selos){ if(!s.mon||s.x==null) continue; const [r,g,b]=hexRgb(COR[elementoDe(s)]); luz(s.x,s.y,34,`${r},${g},${b}`,0.1+0.08*nivelEscuro()); } }
  // golpes e projéteis iluminam o chão em volta, de dia também; com muita coisa na tela cada luz fica mais fraca (não estoura em branco)
  if(QUAL>=1&&!SIM.ativo){ const fl=J.flashes||[], np=Math.min(24,J.proj.length), tot=fl.length+np*0.5, orc=Math.min(1,7/Math.max(1,tot)), dia=1-nivelEscuro();
    for(const f of fl){ const q=f.t/f.max, [r,g,b]=hexRgb(f.cor&&f.cor[0]==="#"?f.cor:"#ffe9a0"); luz(f.x,f.y,f.r*0.9,`${r},${g},${b}`,(1-q)*(1-q)*0.32*orc*(0.6+dia*0.4)); }
    for(let i=0;i<np;i++){ const p=J.proj[i], v=vEl(p.el), [r,g,b]=hexRgb(v.c1); luz(p.x,p.y,p.alvo||p.explode?22:13,`${r},${g},${b}`,0.16*orc); } }
  ctx.globalCompositeOperation="source-over"; }
// sombras de nuvens passando devagar pelo chão (só nos mapas a céu aberto e de dia)
const SEM_CEU=new Set(["centro_terra","mar_profundo","atlantida","laboratorio","xibalba"]); let NUVENS=null;
// desenha as sombras de nuvem num contexto qualquer (k = pixels por pixel de mundo); usado dentro da camada de luz (sem passada extra)
function nuvensEm(g,ox,oy,k){ const u=UNIV[R.universo]; if(QUAL<1||SIM.ativo||!u||SEM_CEU.has(u.id)||(u.luz&&u.luz.noite)) return; const A=0.13*(1-crepusculo()*0.6); if(A<0.03) return;
  if(!NUVENS) desenharNuvens(null,null,true); const esc=4.4, T=128*esc, px=(((ox+J.t*7)%T)+T)%T, py=(((oy+J.t*3)%T)+T)%T;
  if(!NUVENS.patL||NUVENS.patCtx!==g){ NUVENS.patL=g.createPattern(NUVENS.c,"repeat"); NUVENS.patCtx=g; }
  g.save(); g.imageSmoothingEnabled=true; g.globalAlpha=A; g.scale(k,k); g.translate(-px,-py); g.scale(esc,esc); g.fillStyle=NUVENS.patL; g.fillRect(0,0,(g.canvas.width/k+T)/esc,(g.canvas.height/k+T)/esc); g.restore(); }
function desenharNuvens(ox,oy,soCriar){ const u=UNIV[R.universo]; if(!soCriar&&J._nuvemFeita) return; if(!soCriar&&(QUAL<2||SIM.ativo||!u||SEM_CEU.has(u.id)||(u.luz&&u.luz.noite))) return; const A=0.13*(1-crepusculo()*0.6); if(!soCriar&&A<0.03) return;
  if(!NUVENS){ const T=128, c=document.createElement("canvas"); c.width=c.height=T; const g=c.getContext("2d"), r=semente("nuvens");
    // manchas macias espalhadas, repetidas nas bordas para emendar
    for(let i=0;i<22;i++){ const x=r()*T, y=r()*T, rr=10+r()*26, a=0.25+r()*0.35; for(const dx of [-T,0,T]) for(const dy of [-T,0,T]){ const gr=g.createRadialGradient(x+dx,y+dy,0,x+dx,y+dy,rr); gr.addColorStop(0,`rgba(0,0,0,${a})`); gr.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=gr; g.fillRect(x+dx-rr,y+dy-rr,rr*2,rr*2); } }
    NUVENS={c,pat:null}; } if(soCriar) return;
  const esc=4.4, T=128*esc, px=(((ox+J.t*7)%T)+T)%T, py=(((oy+J.t*3)%T)+T)%T;   // vento leve para a direita
  if(!NUVENS.pat) NUVENS.pat=lg.createPattern(NUVENS.c,"repeat");
  const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true; lg.save(); lg.globalAlpha=A; lg.translate(-px,-py); lg.scale(esc,esc); lg.fillStyle=NUVENS.pat; lg.fillRect(0,0,(VW+T)/esc,(VH+T)/esc); lg.restore(); lg.imageSmoothingEnabled=suave; }

// ================================================================ arte de cenário importada: chão, superfícies, marcos, objetos e efeitos dos chefes
// Cada função devolve null quando a folha ainda não foi importada; aí o jogo continua com o desenho procedural.
const cacheCel=new Map();
function folhaU(sufixo){ const u=UNIV[R.universo]; if(!u) return null; const img=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__${sufixo}.png`]; return img&&img.pronta? img : null; }
function folhaArte(caminho){ const img=ARTE_IMG[caminho]; return img&&img.pronta? img : null; }
// recorta a célula (col,row) de uma folha cols x rows e escala para w x h; base = altura relativa da linha de apoio (85% nas folhas)
let ID_IMG=0;   // ler img.src de uma imagem embutida copia um texto enorme; cada imagem ganha um número fixo
function celulaArte(img,cols,rows,col,row,w,h,base){ if(!img) return null; if(!img._id) img._id=++ID_IMG; const k=img._id+"|"+cols+"|"+rows+"|"+col+"|"+row+"|"+w+"|"+h;
  if(cacheCel.has(k)) return cacheCel.get(k); if(cacheCel.size>3000) cacheCel.clear();
  const cw=img.width/cols, ch=img.height/rows, c=document.createElement("canvas"); c.width=w; c.height=h; const g=c.getContext("2d"); g.imageSmoothingEnabled=false;
  // a célula entra inteira mantendo a proporção (folhas exportadas com outra proporção não ficam esticadas); a linha de apoio
  // (base) continua no mesmo ponto do quadro, então os pés não mudam de lugar
  const b=base??1, e=Math.min(w/cw,h/ch), dw=cw*e, dh=ch*e, dx=(w-dw)/2, dy=b*(h-dh);
  g.drawImage(img,Math.round(col*cw),Math.round(row*ch),Math.round(cw),Math.round(ch),dx,dy,dw,dh); c.base=b;
  c._src={img,sx:Math.round(col*cw),sy:Math.round(row*ch),sw:Math.round(cw),sh:Math.round(ch),dest:[dx/w,dy/h,dw/w,dh/h]}; cacheCel.set(k,c); return c; }
// ---------------------------------------------------------------- camada de arte em alta resolução
// O mundo é desenhado em baixa resolução (estilo pixel art) e ampliado para a tela. Arte pintada (monstros, inimigos, chefes,
// Lendas) reduzida a 20-40 px vira borrão; por isso ela é desenhada por cima, na resolução real da tela, a partir do original.
const CAMADA_ARTE=[]; let cvArte=null;
// versão da célula em K pixels por pixel de mundo, recortada do arquivo original com suavização de alta qualidade
function versaoHi(c,K){ if(!c||!c._src) return null; K=Math.max(1,Math.min(8,Math.ceil(K||4))); if(c.hi&&c.hiK===K) return c.hi;
  const h=document.createElement("canvas"); h.width=Math.max(1,Math.round(c.width*K)); h.height=Math.max(1,Math.round(c.height*K));
  const g=h.getContext("2d"), s=c._src, d=s.dest||[0,0,1,1], dx=d[0]*h.width, dy=d[1]*h.height, dw=d[2]*h.width, dh=d[3]*h.height, amp=Math.min(dw/s.sw,dh/s.sh);
  g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
  // ampliação "nítida e lisa": primeiro amplia pixel a pixel por um fator inteiro (bordas firmes), depois suaviza até o tamanho final.
  // Só pixel a pixel fica quadriculado; só suave fica borrado.
  const m=amp>=5? 3 : amp>=1.7? 2 : 1; if(m>=2){   // pixel a pixel primeiro (bordas firmes), depois suave: inimigos ampliados ~2-3x ficavam embaçados
   const t=document.createElement("canvas"); t.width=Math.round(s.sw*Math.min(m,4)); t.height=Math.round(s.sh*Math.min(m,4)); const gt=t.getContext("2d"); gt.imageSmoothingEnabled=false;
    gt.drawImage(s.img,s.sx,s.sy,s.sw,s.sh,0,0,t.width,t.height); g.drawImage(t,dx,dy,dw,dh); }
  else g.drawImage(s.img,s.sx,s.sy,s.sw,s.sh,dx,dy,dw,dh);
  c.hi=h; c.hiK=K; return h; }
// Toda célula de arte importada (tem _src) desenhada no mundo usa a versão em alta resolução no lugar
// da miniatura. Funciona para qualquer chamada lg.drawImage, então nenhum desenho precisa mudar.
{ const desenhoOriginal=lg.drawImage.bind(lg);
  lg.drawImage=function(img,a,b,c,d,e,f,g2,h2){
    if(img&&img._suave&&!lg.imageSmoothingEnabled){ lg.imageSmoothingEnabled=true; desenhoOriginal.apply(null,arguments); lg.imageSmoothingEnabled=false; return; }
    if(img&&img._hi&&Q>1){ const hi=img._hi, kx=hi.width/img.width, ky=hi.height/img.height, n=arguments.length, suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true;
      if(n<=3) desenhoOriginal(hi,a,b,img.width,img.height); else if(n<=5) desenhoOriginal(hi,a,b,c,d); else desenhoOriginal(hi,a*kx,b*ky,c*kx,d*ky,e,f,g2,h2); lg.imageSmoothingEnabled=suave; return; }
    if(Q<=1||!img||!img._src) return desenhoOriginal.apply(null,arguments);
    const hi=versaoHi(img,Q*1.25); if(!hi) return desenhoOriginal.apply(null,arguments);
    const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true; lg.imageSmoothingQuality="high";
    const kx=hi.width/img.width, ky=hi.height/img.height, n=arguments.length;
    if(n<=3) desenhoOriginal(hi,a,b,img.width,img.height);
    else if(n<=5) desenhoOriginal(hi,a,b,c,d);
    else desenhoOriginal(hi,a*kx,b*ky,c*kx,d*ky,e,f,g2,h2);
    lg.imageSmoothingEnabled=suave; }; }
// área desenhada de uma célula (para encaixar o monstro pelo desenho visível, não pela célula)
const cacheBB=new Map();
function bboxCelula(img,sx,sy,sw,sh){ if(!img._id) img._id=++ID_IMG; const k=img._id+"|"+sx+"|"+sy; if(cacheBB.has(k)) return cacheBB.get(k);
  const c=document.createElement("canvas"); c.width=Math.max(1,Math.round(sw)); c.height=Math.max(1,Math.round(sh)); const g=c.getContext("2d"); g.drawImage(img,sx,sy,sw,sh,0,0,c.width,c.height);
  let x0=c.width, y0=c.height, x1=-1, y1=-1; try{ const d=g.getImageData(0,0,c.width,c.height).data;
    for(let y=0;y<c.height;y++) for(let x=0;x<c.width;x++) if(d[(y*c.width+x)*4+3]>24){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; } }catch(err){}
  const bb= x1<0? {x:sx,y:sy,w:sw,h:sh} : {x:sx+x0*sw/c.width, y:sy+y0*sh/c.height, w:(x1-x0+1)*sw/c.width, h:(y1-y0+1)*sh/c.height}; cacheBB.set(k,bb); return bb; }
const ALVO_ARTE=[24,30,36,44];   // altura do monstro com arte, por estágio (pixels de mundo); a equipe é maior que a horda para se destacar
function encaixarArte(img,sx,sy,sw,sh,alvo){ const bb=bboxCelula(img,sx,sy,sw,sh), k=Math.min(alvo/bb.w,alvo/bb.h), w=Math.max(1,Math.round(bb.w*k)), h=Math.max(1,Math.round(bb.h*k));
  const c=document.createElement("canvas"); c.width=c.height=alvo; const g=c.getContext("2d"); g.imageSmoothingEnabled=true; const ox=Math.round((alvo-w)/2), oy=alvo-h;
  g.drawImage(img,bb.x,bb.y,bb.w,bb.h,ox,oy,w,h); c._src={img,sx:bb.x,sy:bb.y,sw:bb.w,sh:bb.h,dest:[ox/alvo,oy/alvo,w/alvo,h/alvo]}; return c; }
// Com a tela interna em alta resolução (Q>1) a arte vai direto para o mundo: fica na ordem certa com
// efeitos e recebe a luz do mapa. A camada separada só é usada se a tela interna estiver em baixa resolução.
function desenharSprite(spr,dx,dy,dw,dh){ const hi=(!SIM.ativo&&Q<=1&&spr&&spr._src)? versaoHi(spr) : null;
  if(!hi){ lg.drawImage(spr,dx,dy,dw,dh); return; } const t=lg.getTransform(); CAMADA_ARTE.push({hi,t,dx,dy,dw,dh,al:lg.globalAlpha}); }
function desenharCamadaArte(){ if(!CAMADA_ARTE.length) return; if(!cvArte) cvArte=document.createElement("canvas"); if(cvArte.width!==W||cvArte.height!==H){ cvArte.width=W; cvArte.height=H; }
  const g=cvArte.getContext("2d"); g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,W,H); g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
  for(const o of CAMADA_ARTE){ const t=o.t, k=S/Q; g.setTransform(k*t.a,k*t.b,k*t.c,k*t.d,k*t.e,k*t.f); g.globalAlpha=o.al; g.drawImage(o.hi,o.dx,o.dy,o.dw,o.dh); }
  CAMADA_ARTE.length=0; g.setTransform(1,0,0,1,0,0); g.globalAlpha=1;
  // a mesma luz do mapa escurece a arte (senão os monstros brilhariam nos mapas noturnos)
  const e=typeof escurecimentoArte==="function"? escurecimentoArte() : null; if(e&&e.a>0.02){ g.globalCompositeOperation="source-atop"; g.globalAlpha=e.a; g.fillStyle=e.cor; g.fillRect(0,0,W,H); g.globalCompositeOperation="source-over"; g.globalAlpha=1; }
  ctx.drawImage(cvArte,0,0); }
function spriteUI(spr){ return (spr&&spr._src&&versaoHi(spr))||spr; }
// quando uma imagem termina de carregar, refaz o que foi desenhado sem ela
function arteCarregou(ns){ if(!J||!R||typeof chao==="undefined"||!chao||!chao.u) return; const u=chao.u, pre=`arte/reinos/${u.era}/${u.id}__`;
  const doMapa=(ns||[]).filter(n=>n.startsWith(pre)||n.startsWith("arte/ambiente/")); if(ns&&!doMapa.length) return;
  if(!chao.tam&&(!ns||doMapa.some(n=>/__(piso|tiles)\.png$/.test(n)))) gerarChao(u);
  if(J.cena){ J.cena.detalhes.clear(); J.cena.sprites.clear(); } }

// ---------------------------------------------------------------- chão: 8 peças sorteadas lado a lado (16 px no mundo cada)
// piso jogável grande (1024 px da folha = 512 px no mundo); emendas pequenas são escondidas misturando uma cópia deslocada perto das bordas
const TAM_PISO=300;   // o piso de 512 px cobre 300 px de mundo: mais nítido de perto
// realce leve de nitidez (máscara de desfoque), feito uma vez quando o piso carrega; a borda dá a volta para continuar emendando
function nitidez(c,k){ if(SIM.ativo) return c; try{ const g=c.getContext("2d"), w=c.width, h=c.height, im=g.getImageData(0,0,w,h), d=im.data, o=new Uint8ClampedArray(d);
    for(let y=0;y<h;y++){ const ym=((y-1+h)%h)*w, yp=((y+1)%h)*w, y0=y*w; for(let x=0;x<w;x++){ const xm=(x-1+w)%w, xp=(x+1)%w, i=(y0+x)*4;
      for(let ch=0;ch<3;ch++){ const blur=(o[(ym+x)*4+ch]+o[(yp+x)*4+ch]+o[(y0+xm)*4+ch]+o[(y0+xp)*4+ch])*0.25; d[i+ch]=o[i+ch]+(o[i+ch]-blur)*k; } } }
    g.putImageData(im,0,0); }catch(e){} return c; }
function tornarContinuo(img,T){ const c=document.createElement("canvas"); c.width=c.height=T; const g=c.getContext("2d"); g.imageSmoothingEnabled=false; g.drawImage(img,0,0,T,T);
  const o=document.createElement("canvas"); o.width=o.height=T; const go=o.getContext("2d"), h=T/2; go.imageSmoothingEnabled=false;
  for(const [dx,dy] of [[-h,-h],[h,-h],[-h,h],[h,h]]) go.drawImage(img,dx,dy,T,T);
  // a maioria dos pisos já emenda sozinha: a mistura (que deixa uma faixa "fantasma" borrada) só entra no eixo que tem costura visível
  let mx=true, my=true; try{ const d=g.getImageData(0,0,T,T).data, px=(x,y)=>(y*T+x)*4, dif=(a,b)=>Math.abs(d[a]-d[b])+Math.abs(d[a+1]-d[b+1])+Math.abs(d[a+2]-d[b+2]);
    let ix=0, ex=0, ey=0, n=0; for(let k=0;k<T;k+=2){ ix+=dif(px(T>>1,k),px((T>>1)+1,k))+dif(px(k,T>>1),px(k,(T>>1)+1)); ex+=dif(px(0,k),px(T-1,k)); ey+=dif(px(k,0),px(k,T-1)); n++; }
    ix/=2*n; mx=ex/n>ix*1.3+4; my=ey/n>ix*1.3+4; }catch(e){}
  if(!mx&&!my) return c;
  const m=document.createElement("canvas"); m.width=m.height=T; const gm=m.getContext("2d"), F=Math.round(T*0.07);
  const borda=(x0,y0,x1,y1,rx,ry,rw,rh)=>{ const gr=gm.createLinearGradient(x0,y0,x1,y1); gr.addColorStop(0,"rgba(255,255,255,1)"); gr.addColorStop(0.5,"rgba(255,255,255,.45)"); gr.addColorStop(1,"rgba(255,255,255,0)"); gm.fillStyle=gr; gm.fillRect(rx,ry,rw,rh); };
  if(mx){ borda(0,0,F,0,0,0,F,T); borda(T,0,T-F,0,T-F,0,F,T); } if(my){ borda(0,0,0,F,0,0,T,F); borda(0,T,0,T-F,0,T-F,T,F); }
  go.globalCompositeOperation="destination-in"; go.drawImage(m,0,0); g.drawImage(o,0,0); return c; }
// o piso é guardado na resolução do arquivo (até 2048 px) e desenhado com 512 px de mundo
function chaoArte(u){ const piso=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__piso.png`]; if(piso&&piso.pronta){ const T=SIM.ativo?512:Math.max(512,Math.min(2048,piso.width)); chao={cv:nitidez(tornarContinuo(piso,T),0.55),u,tam:TAM_PISO,suave:true}; return true; }
  const img=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__tiles.png`]; if(!img||!img.pronta) return false;
  const c=document.createElement("canvas"); c.width=c.height=128; const g=c.getContext("2d"), r=semente(u.id+"chao"); g.imageSmoothingEnabled=false;
  for(let y=0;y<8;y++) for(let x=0;x<8;x++){ const v=Math.floor(r()*8); g.drawImage(celulaArte(img,8,3,v,0,16,16),x*16,y*16); }
  chao={cv:c,u}; return true; }
// manchas (linha 2) e enfeites (linha 3) espalhados em cada pedaço de 96 px
function detalhesArte(r){ const img=folhaU("tiles"); if(!img) return null; const out=[];
  for(let i=0;i<3;i++) out.push({s:celulaArte(img,8,3,Math.floor(r()*8),1,32,32), x:r()*80-8, y:r()*80-8, w:14+r()*6, a:0.55+r()*0.25});
  for(let i=0;i<3;i++){ if(r()<0.35) continue; out.push({s:celulaArte(img,8,3,Math.floor(r()*8),2,32,32), x:r()*84, y:r()*84, w:9+r()*4, a:1}); }
  return out; }

// ---------------------------------------------------------------- superfícies (fogo, água, gelo...): textura contínua por célula de 8 px
const SUP_ANIMADA={agua:1,fogo:1,eletrico:1,vapor:1,luz:1,sombra:1};
function superficieArte(t,cx,cy,x,y,pisca){ const img=folhaArte(`arte/ambiente/${t}.png`); if(!img) return false;
  // cada peça de 32 px da folha cobre 2x2 células de 8 px do mundo; peças vizinhas se encaixam porque a textura é contínua
  const anim=SUP_ANIMADA[t], col=anim? Math.floor(J.t*8)%8 : Math.floor(hash2(cx>>1,cy>>1,5)*4), row=anim?1:0;
  const cw=img.width/8, ch=img.height/2, sx=col*cw+((cx&1)*cw/2), sy=row*ch+((cy&1)*ch/2);
  lg.drawImage(img,sx,sy,cw/2,ch/2,x,y,CEL,CEL);
  if(hash2(cx,cy,13)<0.1){ const o=4+Math.floor(hash2(cx,cy,17)*4); lg.drawImage(img,o*cw,0,cw,ch,x,y,CEL,CEL); }
  return true; }

// ---------------------------------------------------------------- marcos, luzes e peças de primeiro plano (folha 4x2)
function sortearMarcos(cx,cy,r,out){ const img=folhaU("props"); if(!img) return;
  const x=cx*CH+10+r()*76, y=cy*CH+10+r()*76; if(Math.abs(x)<40&&Math.abs(y)<40) return; if(!lugarDeObjeto(x,y,22)) return;
  const sorte=r(); if(sorte<0.3) out.push(Object.assign(novoProp("marco",x,y,r),{idx:Math.floor(r()*6)}));
  else if(sorte<0.42) out.push(Object.assign(novoProp("luz",x,y,r),{idx:6}));
  else if(sorte<0.54) out.push(Object.assign(novoProp("frente",x,y,r),{idx:7})); }
// marcos: recorta só a parte desenhada da célula (a folha tem muita margem vazia) e dá a altura certa para cada tipo
// (colunas e estátuas altas, templo e árvore grandes, braseiro baixo); antes a célula inteira virava um quadrado e tudo saía pequeno
const ALT_MARCO=[56,30,60,56,62,48,32,74];
function spriteMarco(p){ const img=folhaU("props"); if(!img) return null; if(!img._id) img._id=++ID_IMG; const k="marco|"+img._id+"|"+p.idx; if(cacheCel.has(k)) return cacheCel.get(k);
  const cw=img.width/4, ch=img.height/2, sx=(p.idx%4)*cw, sy=Math.floor(p.idx/4)*ch, bb=bboxCelula(img,sx,sy,cw,ch), H=ALT_MARCO[p.idx]||46;
  const e=H/bb.h, w=Math.max(1,Math.round(bb.w*e)), h=Math.max(1,Math.round(bb.h*e)), c=document.createElement("canvas"); c.width=w; c.height=h; const g=c.getContext("2d"); g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
  g.drawImage(img,bb.x,bb.y,bb.w,bb.h,0,0,w,h); c._src={img,sx:bb.x,sy:bb.y,sw:bb.w,sh:bb.h}; c.base=0.97; cacheCel.set(k,c); return c; }

// ---------------------------------------------------------------- objetos físicos (folha 8xN: intacto, trincado, quebrado, estado especial, 4 cacos)
const TAM_OBJ={vaso:13,caixote:13,barril:14,polvora:14,feno:14,fruta:9,rocha:17,gelo:15,cristal:17,metal:18,arvore:26,tronco:16,ovo:9,saque:14};
function linhaObjeto(p){ const u=UNIV[R.universo]; return u&&u.objetos? u.objetos.indexOf(p.saque?"saque":p.tipo) : -1; }
function spriteObjetoArte(p){ const img=folhaU("objetos"); if(!img) return null; const u=UNIV[R.universo], lin=linhaObjeto(p); if(lin<0) return null;
  const rows=u.objetos.length, q=p.max>0&&isFinite(p.max)? p.hp/p.max : 1, t=p.saque?"saque":p.tipo; let col=q<0.34?2:q<0.67?1:0;
  if(t==="metal") col=p.solo==="eletrico"?1:p.congela>0?3:0;
  else if(t==="arvore") col=p.carvao>0.5?3:p.queima>0?2:q<0.6?1:0;
  else if(p.carvao>0.5||(p.congela>0&&["rocha","gelo","cristal","vaso","ovo"].includes(t))) col=3;
  const tam=Math.round((TAM_OBJ[t]||14)*1.35*(p.carvalho?1.4:1)); return celulaArte(img,8,rows,col,lin,tam,tam,0.85); }
function cacoArte(p){ const img=folhaU("objetos"); if(!img) return null; const lin=linhaObjeto(p); if(lin<0) return null; const u=UNIV[R.universo];
  return celulaArte(img,8,u.objetos.length,4+Math.floor(Math.random()*4),lin,6,6,1); }

// ---------------------------------------------------------------- efeitos dos golpes dos chefes (8x2 por chefe, 8x3 por Guardião)
function folhaEfeitos(e){ const u=UNIV[R.universo]; if(!u||!(e&&(e.chefe))) return null;
  return e.eraChefe? folhaArte(`arte/reinos/${u.era}/guardiao_${u.era}__efeitos.png`) : folhaU("efeitos"); }
function quadroEfeito(e,linha,col,tam){ const img=folhaEfeitos(e); if(!img) return null; const rows=e.eraChefe?3:2; return celulaArte(img,8,rows,col,Math.min(rows-1,linha||0),tam,tam,0.5); }
// toca os quadros 5 a 8 (estouro no chão) no ponto do impacto
function impactoArte(e,x,y,tam){ const linha=e&&e.golpeIdx||0; if(!quadroEfeito(e,linha,4,tam)) return;
  J.golpes.push({t:0,atualizar(dt){ this.t+=dt; return this.t<0.4; },frente(ox,oy){ const s=quadroEfeito(e,linha,4+Math.min(3,Math.floor(this.t/0.1)),tam); if(s) lg.drawImage(s,Math.round(x-ox-tam/2),Math.round(y-oy-tam/2)); }}); }

// ================================================================ estrutura do mapa: abismos, lagos, praças, construções, fauna e cena de abertura
// O mapa continua infinito. Em universos com "estrutura" (dados/fonte_cenario.py), cada zona pode ganhar uma peça grande.
// Tudo tem forma geométrica conhecida (elipses e faixas), então a arte e a física usam a mesma área.
function estruturaU(){ const u=UNIV[R.universo]; return u&&u.estrutura||null; }
function zonaPeca(zx,zy){ const C=J.cena; if(!C.zonas) C.zonas=new Map(); const k=zx+":"+zy; if(C.zonas.has(k)) return C.zonas.get(k);
  const E=estruturaU(), Z=E.zona||320, r=semente(R.universo+"z"+k+"#"+R.profundidade); let f=null;
  const x=zx*Z+Z/2+(r()-.5)*Z*0.3, y=zy*Z+Z/2+(r()-.5)*Z*0.3, sorte=r();
  if(Math.abs(x)>130||Math.abs(y)>130){ let acc=0; for(const [tipo,p] of Object.entries(E.pecas)){ acc+=p; if(sorte<acc){ f={tipo,x,y,id:k}; break; } } }
  if(f){ const v=(a,b)=>a+r()*(b-a);
    if(f.tipo==="abismo"){ f.rx=v(55,95); f.ry=v(42,70); f.fs=[r()*6.28,r()*6.28,r()*6.28]; if(r()<(E.chance_ponte||0)) f.ponte=r()<.5?"h":"v"; }
    else if(f.tipo==="lago"){ f.rx=v(40,60); f.ry=f.rx*0.62; }
    else if(f.tipo==="praca"){ f.rx=58; f.ry=44; }
    else if(f.tipo==="construcao"){ f.rx=22; f.ry=10; } }
  C.zonas.set(k,f); return f; }
function pecasPerto(x,y){ const E=estruturaU(); if(!E||!J.cena) return []; const Z=E.zona||320, zx=Math.floor(x/Z), zy=Math.floor(y/Z), C=J.cena;
  // as peças de cada zona nunca mudam: a lista de vizinhas fica guardada por zona
  if(!C.vizinhas) C.vizinhas=new Map(); const k=zx*100003+zy; let out=C.vizinhas.get(k); if(out) return out; out=[];
  for(let j=-1;j<=1;j++) for(let i=-1;i<=1;i++){ const f=zonaPeca(zx+i,zy+j); if(f) out.push(f); } C.vizinhas.set(k,out); return out; }
const naPonte=(f,x,y)=> f.ponte==="h"? Math.abs(y-f.y)<8 : f.ponte==="v"? Math.abs(x-f.x)<8 : false;
// o ponto está no vazio? (m = margem: positiva alarga o buraco)
// borda irregular do abismo (rocha quebrada, não uma elipse perfeita): raio relativo pelo ângulo, entre ~0,8 e ~1,2
function raioAbismo(f,a){ const s=f.fs||[0,0,0]; return 1+0.1*Math.sin(3*a+s[0])+0.06*Math.sin(5*a+s[1])+0.035*Math.sin(9*a+s[2]); }
function abismoEm(x,y,m){ m=m||0; for(const f of pecasPerto(x,y)){ if(f.tipo!=="abismo"||Math.abs(x-f.x)>f.rx*1.22+m||Math.abs(y-f.y)>f.ry*1.22+m) continue; const dx=(x-f.x)/(f.rx+m), dy=(y-f.y)/(f.ry+m); if(dx*dx+dy*dy<raioAbismo(f,Math.atan2(dy,dx))**2&&!naPonte(f,x,y)) return f; } return null; }
function lagoEm(x,y){ for(const f of pecasPerto(x,y)){ if(f.tipo!=="lago"||Math.abs(x-f.x)>f.rx||Math.abs(y-f.y)>f.ry) continue; const dx=(x-f.x)/f.rx, dy=(y-f.y)/f.ry; if(dx*dx+dy*dy<1) return f; } return null; }
// solo natural: dentro do lago é água (no frio, gelo)
function soloLago(){ const t=(estruturaU()||{}).lago_solo||"agua"; return t==="agua"&&frio()? "gelo" : t; }
function soloEstrutura(cx,cy){ if(!estruturaU()||!J.cena) return null; const x=cx*CEL+4, y=cy*CEL+4; if(lagoEm(x,y)) return soloLago(); return null; }
// empurra para fora do abismo: para a borda mais próxima ou para a ponte, o que estiver mais perto
function sairDoAbismo(o,r){ const f=abismoEm(o.x,o.y,r); if(!f) return false;
  const dx=o.x-f.x, dy=o.y-f.y, a=Math.atan2(dy/(f.ry+r),dx/(f.rx+r)), bx=f.x+Math.cos(a)*(f.rx+r+0.5), by=f.y+Math.sin(a)*(f.ry+r+0.5);
  let tx=bx, ty=by; if(f.ponte){ const px=f.ponte==="h"?o.x:f.x, py=f.ponte==="h"?f.y:o.y; if(Math.hypot(px-o.x,py-o.y)<Math.hypot(bx-o.x,by-o.y)){ tx=f.ponte==="h"?o.x:f.x+Math.sign(o.x-f.x||1)*7; ty=f.ponte==="h"?f.y+Math.sign(o.y-f.y||1)*7:o.y; } }
  o.x=tx; o.y=ty; return true; }
// quanto o ponto entrou no buraco (0 = borda, 1 = centro)
function fundoDoAbismo(x,y){ const f=abismoEm(x,y,0); if(!f) return 0; const dx=(x-f.x)/f.rx, dy=(y-f.y)/f.ry; return 1-Math.sqrt(dx*dx+dy*dy)/raioAbismo(f,Math.atan2(dy,dx)); }
function voa(e){ const d=e.def; return e.chefe||e.mini||!d||d.andar==="voa"||d.andar==="flutua"||d.corpo==="espectro"; }
function atualizarEstrutura(dt){ const E=estruturaU(), C=J.cena; if(!E||!C) return; const P=J.jogador;
  // construções e luzes da praça viram objetos fixos quando a zona chega perto
  for(const f of pecasPerto(P.x,P.y)){ if(f.criado) continue; f.criado=true;
    if(f.tipo==="construcao"&&folhaU("pecas")) criarProp("construcao",f.x,f.y);
    if(f.tipo==="praca"&&folhaU("props")) for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.PI/4; const l=criarProp("luz",f.x+Math.cos(a)*f.rx*0.95,f.y+Math.sin(a)*f.ry*0.95); if(l) l.idx=6; } }
  if(!(J.dashT>0&&passiva("atravessa_abismo"))) sairDoAbismo(P,4);
  // chefes voam por cima do vazio, mas não ficam parados sobre ele (senão saem do alcance da equipe)
  for(const e of J.inimigos) if((e.chefe||e.mini)&&e.hp>0&&!e.dash&&!e.noAr&&!e.oculto&&abismoEm(e.x,e.y,0)){ const f=abismoEm(e.x,e.y,0), dx=e.x-f.x, dy=e.y-f.y, d=Math.hypot(dx,dy)||1; e.x+=dx/d*60*dt; e.y+=dy/d*60*dt; }
  // inimigos andando: empurrados para a borda; se um golpe os jogou fundo no buraco, caem
  for(const e of J.inimigos){ if(e.hp<=0||voa(e)||Math.abs(e.x-P.x)>VW||Math.abs(e.y-P.y)>VH) continue;
    if(fundoDoAbismo(e.x,e.y)>0.12){ queda(e.x,e.y,e.spr,e.esc||1); texto(e.x,e.y-10,"Caiu!","#e8e0ff",12); evento("queda"); e.semCadaver=true; e.hp=0; morrer(e); continue; }
    if(sairDoAbismo(e,e.r*0.6)){ const f=abismoEm(e.x,e.y,e.r+2)||pecasPerto(e.x,e.y).find(g=>g.tipo==="abismo"); if(f){ const dx=e.x-f.x, dy=e.y-f.y, d=Math.hypot(dx,dy)||1, lado=(e.semente||1)%2?1:-1; e.x+=-dy/d*lado*e.v*0.5*dt; e.y+=dx/d*lado*e.v*0.5*dt; } } }
  // objetos empurrados para o vazio caem; cristais no chão escorregam para a beirada (nunca ficam perdidos)
  for(const p of C.lista){ if(p.morto||p.mat.fixo||p.caindo) continue; if(abismoEm(p.x,p.y,-p.r*0.4)){ p.caindo=0.7; p.vx*=0.3; p.vy*=0.3; } }
  for(const p of C.lista){ if(p.caindo>0){ p.caindo-=dt; if(p.caindo<=0){ p.morto=true; } } }
  for(const g of C.destrocos) if(g.z<1&&abismoEm(g.x,g.y,0)) g.vida=Math.min(g.vida,0.2);
  for(const g of J.gemas) sairDoAbismo(g,2);
  // ovos e monstros selvagens nunca ficam no vazio (senão ficam inalcançáveis)
  for(const o of J.ovosMapa) sairDoAbismo(o,5); for(const o of J.selvagens) sairDoAbismo(o,5); if(J.ovoAnc) sairDoAbismo(J.ovoAnc,6);
  atualizarFauna(dt); }
function queda(x,y,spr,esc){ J.quedas=J.quedas||[]; J.quedas.push({x,y,spr,esc,t:0}); }
// ---------------------------------------------------------------- desenho: peças planas, abismo com paralaxe, paredões, ponte
function fundoAbismo(){ const img=folhaU("fundo"); if(img) return img; const C=J.cena; if(C.fundoProc) return C.fundoProc;
  const c=document.createElement("canvas"); c.width=c.height=128; const g=c.getContext("2d"); g.fillStyle="#cfdcea"; g.fillRect(0,0,128,128);
  for(let i=0;i<26;i++){ const x=(i*53)%128, y=(i*37)%128, r=10+(i*7)%18; for(const [dx,dy] of [[0,0],[128,0],[-128,0],[0,128],[0,-128]]){ g.globalAlpha=0.55; g.drawImage(bolhaCor(i%3?"#ffffff":"#e8f0f8"),x-r+dx,y-r+dy,r*2,r*2); } }
  C.fundoProc=c; return c; }
function desenharEstrutura(ox,oy){ const E=estruturaU(), C=J.cena; if(!E||!C) return; const pec=folhaU("pecas"), feats=pecasPerto(ox+VW/2,oy+VH/2);
  // praças e lagos (planos, por baixo de tudo)
  for(const f of feats){ if(f.tipo==="praca"){ if(pec){ const w=f.rx*2.6; lg.drawImage(celulaArte(pec,2,2,0,0,Math.round(w),Math.round(w)),Math.round(f.x-ox-w/2),Math.round(f.y-oy-w/2)); }
      else { lg.globalAlpha=0.5; lg.fillStyle="#a8a498"; lg.beginPath(); lg.ellipse(f.x-ox,f.y-oy,f.rx*0.8,f.ry*0.8,0,0,Math.PI*2); lg.fill(); lg.fillStyle="#3a3836"; lg.beginPath(); lg.ellipse(f.x-ox,f.y-oy,f.rx*0.4,f.ry*0.4,0,-Math.PI/2,Math.PI/2); lg.fill(); lg.globalAlpha=1; } }
    if(f.tipo==="lago"&&pec){ const w=f.rx*2/0.7; lg.drawImage(celulaArte(pec,2,2,1,0,Math.round(w),Math.round(w)),Math.round(f.x-ox-w/2),Math.round(f.y-oy-w/2)); } }
  // abismos: recorta o buraco e mostra o fundo em paralaxe (anda a 45% da velocidade do chão e as nuvens derivam com o vento)
  const fundo=fundoAbismo(), TF=fundo.width>256?256:fundo.width, par=0.45, dx0=-(ox*par+C.t*C.Wx*0.15), dy0=-(oy*par+C.t*C.Wy*0.15);
  for(const f of feats){ if(f.tipo!=="abismo") continue;
    if(f.x+f.rx*1.4<ox||f.x-f.rx*1.4>ox+VW||f.y+f.ry*1.4<oy||f.y-f.ry*1.4>oy+VH+40) continue;
    const ex=f.x-ox, ey=f.y-oy, NP=56; if(!f.pts){ f.pts=[]; for(let i=0;i<NP;i++){ const a=i/NP*Math.PI*2, k=raioAbismo(f,a); f.pts.push([Math.cos(a)*f.rx*k,Math.sin(a)*f.ry*k]); } }
    const buraco=()=>{ lg.beginPath(); f.pts.forEach(([px,py],i)=>lg[i?"lineTo":"moveTo"](ex+px,ey+py)); lg.closePath(); };
    // borda de cima (para o paredão): y mais alto de cada x, dos pontos da metade de cima
    const topo=wx=>{ let best=null; for(let i=0;i<NP;i++){ const [ax,ay]=f.pts[i], [bx,by]=f.pts[(i+1)%NP]; if(ay>0&&by>0) continue; if((ax-wx)*(bx-wx)>0) continue; const t=bx===ax?0:(wx-ax)/(bx-ax), yy=ay+(by-ay)*t; if(best==null||yy<best) best=yy; } return best; };
    // recorte liso em elipse (antes era uma escada de quadrados de 8 px)
    lg.save(); buraco(); lg.clip(); const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true;
    const sx=((dx0%TF)+TF)%TF-TF, sy=((dy0%TF)+TF)%TF-TF; for(let y=sy;y<VH+TF;y+=TF) for(let x=sx;x<VW+TF;x+=TF) lg.drawImage(fundo,x,y,TF,TF);
    // profundidade: mais escuro junto ao paredão (fundo do precipício) e névoa subindo
    const R2=Math.max(f.rx,f.ry)*1.25, gp=lg.createLinearGradient(0,ey-R2,0,ey+R2); gp.addColorStop(0,"rgba(4,4,12,.78)"); gp.addColorStop(0.45,"rgba(8,10,22,.45)"); gp.addColorStop(1,"rgba(10,14,30,.2)");
    lg.fillStyle=gp; lg.fillRect(ex-R2,ey-R2,R2*2,R2*2);
    lg.globalCompositeOperation="lighter"; for(let i=0;i<5;i++){ const q=((C.t*0.03+i/5)%1), mx=ex+Math.sin(i*2.3+C.t*0.2)*f.rx*0.5, my=ey+f.ry*0.6-q*f.ry*1.2; lg.globalAlpha=0.07*Math.sin(q*Math.PI); lg.drawImage(bolhaCor("#c8d4f0"),mx-f.rx*0.45,my-f.ry*0.22,f.rx*0.9,f.ry*0.44); } lg.globalCompositeOperation="source-over"; lg.globalAlpha=1;
    // paredão: acompanha a curva da borda de cima, em fatias finas; um trecho por buraco vira cachoeira
    const par2=folhaU("paredao"), PW=34, PH=34, passo=2, hf=hash2(Math.round(f.x),Math.round(f.y),61), var0=Math.floor(hf*4);
    const cach0=hf<0.55? (hash2(Math.round(f.x),3,7)-0.5)*f.rx*1.2 : null;
    const xMin=Math.min(...f.pts.map(p=>p[0])), xMax=Math.max(...f.pts.map(p=>p[0]));
    for(let wx=xMin;wx<xMax;wx+=passo){ const tp=topo(wx+passo/2); if(tp==null) continue; const yt=ey+tp, x=ex+wx;
      const agua=cach0!=null&&Math.abs(wx-cach0)<12;
      if(par2){ const cw=par2.width/4, ch=par2.height/2, u=(((wx+f.x)%PW)+PW)%PW, col=agua? Math.floor(J.t*8)%4 : (var0+Math.floor((wx+f.x+1e4)/PW))%4;
        lg.drawImage(par2,col*cw+u/PW*cw,(agua?1:0)*ch,cw*passo/PW,ch,x,yt-1,passo+0.6,PH); }
      else { const g=lg.createLinearGradient(0,yt,0,yt+26); g.addColorStop(0,"#7a7680"); g.addColorStop(1,"rgba(40,38,46,0)"); lg.fillStyle=g; lg.fillRect(x,yt,passo+0.6,26); if(agua){ lg.fillStyle="rgba(220,240,255,.7)"; lg.fillRect(x,yt,passo+0.6,26+Math.sin(J.t*9+wx)*2); } }
      if(agua&&Math.random()<.04&&C.ar.length<400){ const p=particulaAr("bolhas",x+ox,yt+oy+30,0); p.cor="#ffffff"; p.vz=6; } }
    // sombra interna na beira (o chão de cima projeta sombra no fundo)
    lg.strokeStyle="rgba(8,6,14,.6)"; lg.lineWidth=6; buraco(); lg.stroke(); lg.strokeStyle="rgba(8,6,14,.35)"; lg.lineWidth=12; buraco(); lg.stroke();
    lg.imageSmoothingEnabled=suave; lg.restore();
    // beirada: contorno escuro e uma luz fina na borda de baixo
    // beirada de pedra: lábio grosso escuro, luz fina na borda de baixo (a que está de frente) e cascalho ao longo da beira
    lg.lineJoin="round"; lg.strokeStyle="rgba(30,22,16,.85)"; lg.lineWidth=2.6; buraco(); lg.stroke(); lg.strokeStyle="#140f1c"; lg.lineWidth=1; buraco(); lg.stroke();
    lg.strokeStyle="rgba(255,240,210,.32)"; lg.lineWidth=0.8; lg.beginPath(); let ini=true; for(let i=0;i<NP;i++){ const [px,py]=f.pts[i]; if(py<f.ry*0.25){ ini=true; continue; } lg[ini?"moveTo":"lineTo"](ex+px,ey+py+1.2); ini=false; } lg.stroke();
    for(let i=0;i<NP;i+=2){ const h=hash2(Math.round(f.x)+i,Math.round(f.y),71); if(h>0.55) continue; const [px,py]=f.pts[i], k=1.12+h*0.25, sx=ex+px*k, sy=ey+py*k, rr=0.8+h*2.2;
      lg.fillStyle="rgba(20,14,10,.55)"; lg.beginPath(); lg.ellipse(sx+0.4,sy+0.6,rr,rr*0.6,0,0,Math.PI*2); lg.fill(); lg.fillStyle="#6a6058"; lg.beginPath(); lg.ellipse(sx,sy,rr,rr*0.62,h*3,0,Math.PI*2); lg.fill();
      lg.fillStyle="rgba(255,240,220,.25)"; lg.beginPath(); lg.ellipse(sx-rr*0.25,sy-rr*0.2,rr*0.45,rr*0.25,0,0,Math.PI*2); lg.fill(); }
    lg.lineWidth=1; lg.lineJoin="miter";
    // ponte
    if(f.ponte){ const hz=f.ponte==="h", L=(hz?f.rx:f.ry)*2+14;
      if(pec){ const alt=18, esc=alt/50, cel=Math.round(256*esc), s=celulaArte(pec,2,2,1,1,cel,cel); lg.save(); lg.translate(f.x-ox,f.y-oy); if(!hz) lg.rotate(Math.PI/2); lg.beginPath(); lg.rect(-L/2,-cel/2,L,cel); lg.clip(); for(let x=-L/2;x<L/2;x+=cel) lg.drawImage(s,Math.round(x),-cel/2); lg.restore(); }
      else { lg.save(); lg.translate(f.x-ox,f.y-oy); if(!hz) lg.rotate(Math.PI/2); for(let x=-L/2;x<L/2;x+=3){ lg.fillStyle=(x/3|0)%2?"#8a5a30":"#a0703c"; lg.fillRect(Math.round(x),-7,2,14); } lg.fillStyle="#c8302a"; lg.fillRect(-L/2,-8,L,1); lg.fillRect(-L/2,7,L,1); lg.restore(); } } } }
function desenharQuedasAbismo(ox,oy){ if(!J.quedas) return; for(const q of J.quedas) q.t+=1/60; J.quedas=J.quedas.filter(q=>q.t<0.7);
  for(const q of J.quedas){ const k=1-q.t/0.7, w=q.spr.width*q.esc*k, h=q.spr.height*q.esc*k; lg.globalAlpha=k; lg.drawImage(silhueta(q.spr,"#2a3040"),Math.round(q.x-ox-w/2),Math.round(q.y-oy-h/2+q.t*14),w,h); } lg.globalAlpha=1; }

// ---------------------------------------------------------------- fauna: bichos de ambiente que reagem a quem passa
function quadroFauna(row,col,tam){ const img=folhaU("fauna"); return img? celulaArte(img,8,2,col,row,tam,tam,0.5) : null; }
function atualizarFauna(dt){ const C=J.cena, P=J.jogador; if(!C.fauna) C.fauna=[]; C.tAve=(C.tAve??3)-dt;
  const perto=(x,y,r)=>{ if(Math.hypot(P.x-x,P.y-y)<r) return P; for(const e of J.inimigos){ if(Math.abs(e.x-x)<r&&Math.abs(e.y-y)<r) return e; } return null; };
  // aves cruzam a tela a favor do vento, em bando, com sombra no chão
  if(C.tAve<=0){ C.tAve=rnd(7,14); const a=Math.atan2(C.dy,C.dx)+rnd(-.4,.4), n=1+Math.floor(Math.random()*3), lado=rnd(-VH*0.4,VH*0.4);
    for(let i=0;i<n;i++) C.fauna.push({k:"ave",x:P.x-Math.cos(a)*VW*0.8-Math.sin(a)*lado+i*rnd(-10,10),y:P.y-Math.sin(a)*VW*0.8+Math.cos(a)*lado+i*12,vx:Math.cos(a)*46,vy:Math.sin(a)*46,z:rnd(34,50),f:Math.random()*4,vida:12}); }
  // borboletas perto do jogador, sobre a grama
  if(C.fauna.filter(b=>b.k==="borboleta").length<5&&Math.random()<dt*0.8){ const x=P.x+rnd(-VW/2,VW/2), y=P.y+rnd(-VH/2,VH/2); const t=soloEm(Math.floor(x/CEL),Math.floor(y/CEL)); if(t!=="agua"&&!abismoEm(x,y,0)) C.fauna.push({k:"borboleta",x,y,vx:0,vy:0,z:rnd(4,10),f:Math.random()*4,vida:rnd(14,24),susto:0}); }
  // peixes e sapos nos lagos que estão na tela
  for(const f of pecasPerto(P.x,P.y)){ if(f.tipo!=="lago"||f.povoado||Math.abs(f.x-P.x)>VW||Math.abs(f.y-P.y)>VH) continue; f.povoado=true;
    for(let i=0;i<4;i++) C.fauna.push({k:"peixe",lago:f,x:f.x+rnd(-f.rx*.5,f.rx*.5),y:f.y+rnd(-f.ry*.5,f.ry*.5),vx:rnd(-8,8),vy:rnd(-5,5),f:Math.random()*4,vida:1e9,susto:0});
    for(let i=0;i<3;i++){ const a=Math.random()*6.28; C.fauna.push({k:"bicho",lago:f,x:f.x+Math.cos(a)*(f.rx+5),y:f.y+Math.sin(a)*(f.ry+4),z:0,vz:0,vx:0,vy:0,f:0,vida:1e9,pulo:0}); } }
  for(const b of C.fauna){ b.vida-=dt; b.f+=dt*8;
    if(b.k==="ave"){ b.x+=b.vx*dt; b.y+=b.vy*dt; }
    else if(b.k==="borboleta"){ const q=perto(b.x,b.y,16); if(q){ if(!b.assustado){ b.assustado=true; evento("fauna"); } const d=Math.hypot(b.x-q.x,b.y-q.y)||1; b.vx=(b.x-q.x)/d*40; b.vy=(b.y-q.y)/d*40; b.susto=0.6; b.z=Math.min(20,b.z+dt*20); }
      b.susto-=dt; if(b.susto<=0){ b.vx+=(Math.sin(J.t*2+b.f)*12-b.vx)*dt*2; b.vy+=(Math.cos(J.t*1.7+b.f*1.3)*10-b.vy)*dt*2; } const w=vento(b.x,b.y); b.x+=(b.vx+w.x*0.4)*dt; b.y+=(b.vy+w.y*0.4)*dt; b.z=6+Math.sin(J.t*3+b.f)*3; }
    else if(b.k==="peixe"){ const L=b.lago, q=perto(b.x,b.y,22)||(J.cena.ondas.find(o=>Math.hypot(o.x-b.x,o.y-b.y)<12)); if(q){ if(!b.assustado){ b.assustado=true; evento("fauna"); } const d=Math.hypot(b.x-q.x,b.y-q.y)||1; b.vx=(b.x-q.x)/d*45; b.vy=(b.y-q.y)/d*30; b.susto=0.8; }
      b.susto-=dt; if(b.susto<=0){ b.vx+=(Math.sin(J.t*0.6+b.f)*10-b.vx)*dt; b.vy+=(Math.cos(J.t*0.5+b.f)*6-b.vy)*dt; }
      const nx=b.x+b.vx*dt, ny=b.y+b.vy*dt, dx=(nx-L.x)/(L.rx*0.82), dy=(ny-L.y)/(L.ry*0.8); if(dx*dx+dy*dy<1&&soloEm(Math.floor(nx/CEL),Math.floor(ny/CEL))===soloLago()){ b.x=nx; b.y=ny; } else { b.vx*=-1; b.vy*=-1; } }
    else if(b.k==="bicho"){ if(b.pulo>0){ b.pulo-=dt; b.x+=b.vx*dt; b.y+=b.vy*dt; b.z=Math.sin((1-b.pulo/0.45)*Math.PI)*7; if(b.pulo<=0){ b.z=0; if(b.lago&&soloEm(Math.floor(b.x/CEL),Math.floor(b.y/CEL))==="agua") J.cena.ondas.push({x:b.x,y:b.y,r:1,vida:.8}); } }
      else { const q=perto(b.x,b.y,24); if(q&&!b.assustado){ b.assustado=true; evento("fauna"); } if(q||Math.random()<dt*0.15){ const a=q? Math.atan2(b.y-q.y,b.x-q.x)+rnd(-.5,.5) : Math.random()*6.28; b.vx=Math.cos(a)*55; b.vy=Math.sin(a)*40; b.pulo=0.45; } } } }
  C.fauna=C.fauna.filter(b=>{ if(b.vida<=0) return false;
    if(b.lago){ const longe=Math.abs(b.lago.x-P.x)>VW*1.6||Math.abs(b.lago.y-P.y)>VH*1.6; if(longe) b.lago.povoado=false; return !longe; }
    return Math.abs(b.x-P.x)<VW*1.6&&Math.abs(b.y-P.y)<VH*1.6; }); }
function desenharFauna(ox,oy,camada){ const C=J.cena; if(!C||!C.fauna) return;
  for(const b of C.fauna){ const x=Math.round(b.x-ox), y=Math.round(b.y-oy); if(x<-30||y<-60||x>VW+30||y>VH+30) continue; const q=Math.floor(b.f)%4;
    if(camada==="agua"&&b.k==="peixe"){ const s=quadroFauna(1,q,10); if(s){ lg.save(); lg.translate(x,y); lg.rotate(Math.atan2(b.vy,b.vx)); lg.globalAlpha=.85; lg.drawImage(s,-5,-5); lg.restore(); lg.globalAlpha=1; } else { lg.fillStyle="#f08a3a"; lg.fillRect(x-1,y,3,1); lg.fillStyle="#ffffff"; lg.fillRect(x+1,y,1,1); } }
    if(camada==="chao"&&b.k==="bicho"){ const s=quadroFauna(1,4+(b.pulo>0?(b.z>4?2:1):(b.pulo<0?3:0)),9); lg.fillStyle="rgba(0,0,0,.3)"; lg.beginPath(); lg.ellipse(x,y+1.5,2.2,0.8,0,0,Math.PI*2); lg.fill(); if(s) lg.drawImage(s,x-4,y-5-Math.round(b.z)); else { lg.fillStyle="#4f9a3c"; lg.fillRect(x-1,y-1-Math.round(b.z),3,2); } }
    if(camada==="ar"&&b.k==="borboleta"){ const s=quadroFauna(0,4+q,8); if(s) lg.drawImage(s,x-4,y-4-Math.round(b.z)); else { lg.fillStyle=q%2?"#d8302a":"#1a1418"; lg.fillRect(x-(q%2),y-Math.round(b.z),1+(q%2)*2,1); } }
    if(camada==="ceu"&&b.k==="ave"){ lg.globalAlpha=.18; lg.fillStyle="#000"; lg.beginPath(); lg.ellipse(x+b.z*0.4,y+b.z*0.6,5,2,0,0,Math.PI*2); lg.fill(); lg.globalAlpha=1;
      const s=quadroFauna(0,q,16); if(s){ lg.save(); lg.translate(x,y-b.z); if(b.vx<0) lg.scale(-1,1); lg.drawImage(s,-8,-8); lg.restore(); } else { lg.fillStyle="#f4f4ee"; const asa=q%2?-1:1; lg.fillRect(x-3,y-b.z+asa,3,1); lg.fillRect(x+1,y-b.z+asa,3,1); lg.fillRect(x,y-b.z,1,1); } } } }

// ---------------------------------------------------------------- cena de abertura: a arte-conceito do reino como cena de cinema
// faixas de cinema, câmera lenta, raios de luz e brasas na cor do elemento, título letra a letra e saída em íris revelando o mapa.
// O HUD e o aviso do mapa só aparecem quando ela termina. Se a arte ainda está chegando, espera até 2,5 s com a tela escura.
function iniciarAbertura(){ const u=UNIV[R.universo]; if(!u||SIM.ativo) return; const img=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__keyart.png`]; if(!img||img.falhou) return;
  const r=semente(u.id+"intro"), motes=[]; for(let i=0;i<46;i++) motes.push({x:r(),y:r(),v:0.03+r()*0.08,a:r()*6.28,s:0.6+r()*1.8,b:0.3+r()*0.7});
  J.intro={t:0,dur:4.6,img,u,espera:0,motes,depois:[],cor:COR[u.elemento]||"#ffd890"}; $("hud").style.display="none"; $("hudBase").style.display="none"; }
function aposAbertura(fn){ if(J&&J.intro) J.intro.depois.push(fn); else fn(); }
function fimAbertura(){ const I=J.intro; J.intro=null; $("hud").style.display=""; $("hudBase").style.display=""; for(const f of I.depois) f(); }
// chamada no lugar do atualizar enquanto a abertura passa; devolve true se ela ainda está na tela
function passoAbertura(dt){ const I=J.intro; if(!I) return false;
  if(!I.img.pronta){ I.espera+=dt; if(I.espera>2.5||I.img.falhou){ fimAbertura(); return false; } return true; }
  I.t+=dt; if(I.t>=I.dur) fimAbertura(); return true; }
function pularAbertura(){ if(J&&J.intro){ if(!J.intro.img.pronta) J.intro.espera=9; else if(J.intro.t<J.intro.dur-0.8) J.intro.t=J.intro.dur-0.8; } }
const suaveIO=x=>x<0?0:x>1?1:x*x*(3-2*x), suaveO=x=>1-Math.pow(1-Math.max(0,Math.min(1,x)),3);
let CV_INTRO=null;
function desenharAbertura(){ const I=J&&J.intro; if(!I) return; const t=I.t, D0=I.dur, img=I.img, [cr,cg,cb]=hexRgb(I.cor), M=Math.min(W,H);
  ctx.save(); ctx.setTransform(cv.width/W,0,0,cv.height/H,0,0);
  if(!img.pronta){ ctx.fillStyle="#07050b"; ctx.fillRect(0,0,W,H); const p=0.5+0.5*Math.sin(I.espera*5); ctx.fillStyle=`rgba(${cr},${cg},${cb},${0.25+0.4*p})`;
    for(let i=0;i<3;i++){ ctx.beginPath(); ctx.arc(W/2+(i-1)*14,H/2,3,0,Math.PI*2); ctx.fill(); } ctx.restore(); return; }
  const sai=Math.max(0,(t-(D0-0.9))/0.9);   // 0..1 na saída
  // 1) cena: arte com câmera lenta (aproxima e desliza), num canvas à parte para a saída em íris
  if(!CV_INTRO) CV_INTRO=document.createElement("canvas"); if(CV_INTRO.width!==cv.width||CV_INTRO.height!==cv.height){ CV_INTRO.width=cv.width; CV_INTRO.height=cv.height; }
  const g=CV_INTRO.getContext("2d"); g.setTransform(cv.width/W,0,0,cv.height/H,0,0); g.globalCompositeOperation="source-over"; g.globalAlpha=1;
  const q=suaveIO(t/D0), zoom=1.2-0.12*q+sai*0.18; g.fillStyle="#07050b"; g.fillRect(0,0,W,H); g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high";
  // celular em pé: a arte (larga) cortada para cobrir a tela perderia os lados. Fica inteira na largura, sobre um fundo
  // desfocado dela mesma (reduzida a 48 px e ampliada: borra em qualquer navegador), com as bordas de cima e de baixo se desfazendo
  if(H>W*1.05){ if(!I.borrada){ const b=document.createElement("canvas"); b.width=48; b.height=Math.max(1,Math.round(48*img.height/img.width)); const gb=b.getContext("2d"); gb.imageSmoothingEnabled=true; gb.drawImage(img,0,0,b.width,b.height); I.borrada=b; }
    const eb=Math.max(W/img.width,H/img.height)*1.15; g.globalAlpha=0.55; g.drawImage(I.borrada,(W-img.width*eb)/2,(H-img.height*eb)/2,img.width*eb,img.height*eb); g.globalAlpha=1;
    const w=W*1.06*(zoom/1.2+0.17), h=w*img.height/img.width, x=(W-w)/2+(0.5-q)*W*0.04, y=H*0.38-h/2;
    if(!I.recorte) I.recorte=document.createElement("canvas"); const rc=I.recorte; if(rc.width!==Math.ceil(W)||rc.height!==Math.ceil(H)){ rc.width=Math.ceil(W); rc.height=Math.ceil(H); }
    const gr2=rc.getContext("2d"); gr2.setTransform(1,0,0,1,0,0); gr2.globalCompositeOperation="source-over"; gr2.clearRect(0,0,rc.width,rc.height); gr2.imageSmoothingEnabled=true; gr2.imageSmoothingQuality="high"; gr2.drawImage(img,x,y,w,h);
    const mk=gr2.createLinearGradient(0,y,0,y+h); mk.addColorStop(0,"rgba(0,0,0,0)"); mk.addColorStop(0.1,"rgba(0,0,0,1)"); mk.addColorStop(0.86,"rgba(0,0,0,1)"); mk.addColorStop(1,"rgba(0,0,0,0)");
    gr2.globalCompositeOperation="destination-in"; gr2.fillStyle=mk; gr2.fillRect(0,0,rc.width,rc.height); g.drawImage(rc,0,0,W,H); }
  else { const esc=Math.max(W/img.width,H/img.height)*zoom, w=img.width*esc, h=img.height*esc, x=(W-w)/2+(0.5-q)*W*0.05, y=(H-h)/2+(0.5-q)*H*0.025; g.drawImage(img,x,y,w,h); }
  // tom do elemento por cima (bem leve) e vinheta forte nas bordas
  g.globalCompositeOperation="soft-light"; g.fillStyle=`rgba(${cr},${cg},${cb},0.35)`; g.fillRect(0,0,W,H); g.globalCompositeOperation="source-over";
  const vg=g.createRadialGradient(W/2,H*0.45,M*0.25,W/2,H/2,Math.hypot(W,H)*0.6); vg.addColorStop(0,"rgba(7,5,11,0)"); vg.addColorStop(1,"rgba(7,5,11,.78)"); g.fillStyle=vg; g.fillRect(0,0,W,H);
  // raios de luz diagonais que passam devagar
  g.globalCompositeOperation="lighter";
  for(let i=0;i<4;i++){ const px=W*(0.1+i*0.28)+Math.sin(t*0.5+i)*W*0.05, lw=M*(0.06+0.05*((i*7)%3)), a=0.05+0.04*Math.sin(t*1.3+i*2);
    const lr=g.createLinearGradient(px,0,px+lw,0); lr.addColorStop(0,`rgba(${cr},${cg},${cb},0)`); lr.addColorStop(0.5,`rgba(255,240,210,${a})`); lr.addColorStop(1,`rgba(${cr},${cg},${cb},0)`);
    g.save(); g.translate(px,-H*0.1); g.rotate(0.35); g.translate(-px,0); g.fillStyle=lr; g.fillRect(px,0,lw,H*1.4); g.restore(); }
  // brasas/poeira de luz subindo, na cor do elemento
  for(const m of I.motes){ const yy=((m.y-t*m.v)%1+1)%1, xx=m.x+Math.sin(t*0.9+m.a)*0.02, X=xx*W, Y=yy*H, rr=m.s*M/420, al=m.b*(0.35+0.65*Math.sin(t*2+m.a)**2)*Math.min(1,t/0.8);
    const gr=g.createRadialGradient(X,Y,0,X,Y,rr*4); gr.addColorStop(0,`rgba(255,246,220,${al})`); gr.addColorStop(0.3,`rgba(${cr},${cg},${cb},${al*0.6})`); gr.addColorStop(1,`rgba(${cr},${cg},${cb},0)`); g.fillStyle=gr; g.fillRect(X-rr*4,Y-rr*4,rr*8,rr*8); }
  g.globalCompositeOperation="source-over";
  // 2) título: era em letras espaçadas, nome do reino letra a letra subindo com brilho, filete dourado com losango
  const tt=t-0.55, cy=H*(H>W*1.05?0.74:0.76), larguraMax=W*0.86, medir=(txt,f)=>{ g.font=`800 ${f}px "Cinzel", Georgia, serif`; return g.measureText(txt).width; };
  // nome numa linha se couber grande; senão quebra na vírgula ("Santuário dos 12 Signos" / "Grécia") e cada linha cabe na largura
  let linhas=[I.u.nome], fs=Math.round(Math.min(M*0.075,larguraMax*100/Math.max(1,medir(I.u.nome,100))));
  if(fs<M*0.06&&I.u.nome.includes(",")){ const [a,...b]=I.u.nome.split(","); linhas=[a.trim(),b.join(",").trim()]; fs=Math.round(Math.min(M*0.08,larguraMax*100/Math.max(1,medir(linhas[0],100)))); }
  const fs2=Math.round(Math.min(fs*0.62,larguraMax*100/Math.max(1,medir(linhas[1]||"",100)))), fe=Math.round(Math.max(11,Math.min(M*0.03,fs*0.42))), alto=linhas.length>1? fs*0.55+fs2*0.6 : 0;
  if(tt>0){ const fade=1-sai*1.6;
    // faixa escura por trás do título (dá leitura em qualquer arte)
    const fx=g.createLinearGradient(0,cy-fs*2.2,0,H); fx.addColorStop(0,"rgba(7,5,11,0)"); fx.addColorStop(0.45,`rgba(7,5,11,${0.62*Math.min(1,tt/0.5)*Math.max(0,fade)})`); fx.addColorStop(1,`rgba(7,5,11,${0.8*Math.max(0,fade)})`);
    g.fillStyle=fx; g.fillRect(0,cy-fs*2.2,W,H);
    g.globalAlpha=Math.max(0,Math.min(1,tt/0.6)*fade); g.textAlign="center"; g.textBaseline="middle"; g.font=`600 ${fe}px "Nunito", system-ui, sans-serif`;
    const era=(D.eras[I.u.era].nome+(R.ciclo?` · ciclo ${R.ciclo+1}`:"")+` · mapa ${R.profundidade+1}`).toUpperCase().split("").join(" ");
    g.shadowColor="rgba(0,0,0,.9)"; g.shadowBlur=fe*0.6; g.fillStyle="#f0c96a"; g.fillText(era,W/2,cy-fs*0.95); g.shadowBlur=0;
    const yl=cy+fs*0.72+alto*1.2, lw=suaveO((tt-0.2)/0.9)*Math.min(W*0.32,fs*5.2); if(lw>1){ const gl=g.createLinearGradient(W/2-lw,0,W/2+lw,0); gl.addColorStop(0,"rgba(214,171,79,0)"); gl.addColorStop(0.5,"rgba(255,226,150,1)"); gl.addColorStop(1,"rgba(214,171,79,0)");
      g.fillStyle=gl; g.fillRect(W/2-lw,yl,lw*2,Math.max(1,M*0.003)); g.save(); g.translate(W/2,yl); g.rotate(Math.PI/4); g.fillStyle="#ffe296"; const d=M*0.008; g.fillRect(-d,-d,d*2,d*2); g.restore(); }
    let atraso=0.15;
    linhas.forEach((txt,li)=>{ const f=li? fs2 : fs, yb=li? cy+fs*0.55+fs2*0.55 : cy; g.font=`800 ${f}px "Cinzel", Georgia, serif`; const larg=g.measureText(txt).width; let xx=W/2-larg/2; g.textAlign="left";
      for(let i=0;i<txt.length;i++){ const ch=txt[i], cw=g.measureText(ch).width, k=suaveO((tt-atraso-i*0.035)/0.45); if(k<=0){ xx+=cw; continue; }
        g.globalAlpha=k*Math.max(0,fade); const yy=yb+(1-k)*f*0.5;
        g.shadowColor=`rgba(${cr},${cg},${cb},0.9)`; g.shadowBlur=f*0.45*(1.3-k*0.5); g.fillStyle="#140f1c"; g.fillText(ch,xx+f*0.05,yy+f*0.06);
        g.shadowBlur=f*0.3; g.fillStyle=k<1? mistura("#ffffff",li?"#ffe6a6":"#f6ead0",k) : (li?"#ffe6a6":"#f6ead0"); g.fillText(ch,xx,yy); g.shadowBlur=0; xx+=cw; }
      atraso+=txt.length*0.035; });
    g.globalAlpha=1; g.textBaseline="alphabetic"; }
  // 3) faixas de cinema: entram no começo e saem junto com a íris
  const fb=H*0.11*suaveO(t/0.7)*(1-suaveIO(sai*1.3)); g.fillStyle="#000"; g.fillRect(0,0,W,fb); g.fillRect(0,H-fb,W,fb);
  // entrada: sai do preto
  if(t<0.6){ g.fillStyle=`rgba(7,5,11,${1-suaveO(t/0.6)})`; g.fillRect(0,0,W,H); }
  // 4) saída em íris: um círculo de luz abre do centro e mostra o mapa por baixo
  if(sai>0){ const R0=Math.hypot(W,H)*0.6*suaveIO(sai), bord=M*0.12; g.globalCompositeOperation="destination-out";
    const ir=g.createRadialGradient(W/2,H/2,Math.max(0,R0-bord),W/2,H/2,R0+0.01); ir.addColorStop(0,"rgba(0,0,0,1)"); ir.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=ir; g.fillRect(0,0,W,H); g.globalCompositeOperation="source-over"; }
  ctx.globalAlpha=1; ctx.drawImage(CV_INTRO,0,0,W,H);
  if(sai>0&&sai<1){ const R0=Math.hypot(W,H)*0.6*suaveIO(sai), bord=M*0.12; ctx.globalCompositeOperation="lighter"; const an=ctx.createRadialGradient(W/2,H/2,Math.max(0,R0-bord),W/2,H/2,R0);
    an.addColorStop(0,`rgba(${cr},${cg},${cb},0)`); an.addColorStop(0.7,`rgba(255,240,210,${0.5*(1-sai)})`); an.addColorStop(1,`rgba(${cr},${cg},${cb},0)`); ctx.fillStyle=an; ctx.fillRect(0,0,W,H); ctx.globalCompositeOperation="source-over"; }
  ctx.restore(); }

// ================================================================ diretor de horda: ajusta o ritmo pelo que está acontecendo na tela
// Mede a cada meio segundo quantos inimigos estão na tela, quantos estão colados no jogador e a vida.
// Dominando: aumenta a densidade e solta ondas especiais. Afogado: segura os nascimentos para você respirar.
// A pressão-alvo cresce dentro de cada mapa e de um mapa para o outro (como no Vampire Survivors).
function iniciarDiretor(){ J.diretor={mult:1, tick:0, respiro:0, tEvento:rnd(40,55), alvo:20, n:0, vida:1, eventos:0, ameaca:1, tCheia:0}; }
// ameaça: quem passa muito tempo com a vida cheia apanha mais forte (até +60%); quando a vida cai, volta ao normal
// primeiro mapa da run: o dano recebido começa em 20% e chega ao normal em 80 s (antes, parado, a equipe caía em ~10 s)
function inicioSuave(){ return R&&R.profundidade===0&&!R.teste? Math.min(1,0.2+J.t/100) : 1; }
function ameacaDiretor(){ return (J.diretor? J.diretor.ameaca : 1)*inicioSuave(); }
// XP: os inimigos extras que o diretor coloca valem proporcionalmente menos, para o ritmo de níveis não disparar
function fatorXPDiretor(){ const d=J.diretor; return d&&d.mult>1? Math.max(0.55,1/Math.sqrt(d.mult)) : 1; }
function multDiretor(){ const d=J.diretor; if(!d) return 1; return d.respiro>0? 0.1 : d.mult; }
function contarTela(){ const P=J.jogador; let n=0, col=0; for(const e of J.inimigos){ if(e.hp<=0) continue; const dx=Math.abs(e.x-P.x), dy=Math.abs(e.y-P.y); if(dx<VW/2&&dy<VH/2){ n++; if(dx<40&&dy<40) col++; } } return [n,col]; }
function atualizarDiretor(dt){ if(!J.diretor) iniciarDiretor(); const d=J.diretor; d.tick-=dt;
  if(d.tick<=0){ d.tick=0.5; const [n,col]=contarTela(), vida=J.vida/J.vidaMax; d.n=n; d.vida=vida;
    d.alvo=Math.min(150,24+R.profundidade*16+J.t*0.22)*(R.profundidade===0&&!R.teste? Math.min(1,0.4+J.t/60) : 1);   // primeiro mapa: a horda cresce aos poucos
    if(col>22&&vida<0.45&&d.respiro<=0){ d.respiro=3; }                  // afogado: respiro curto
    let m=d.mult; if(n>d.alvo*1.6) m-=0.15; else if(n<d.alvo*0.7&&vida>0.5) m+=0.12; else if(n<d.alvo) m+=0.04; else m-=0.03;
    d.mult=Math.max(0.3,Math.min(2.6,m));
    d.tCheia=vida>0.8? d.tCheia+0.5 : Math.max(0,d.tCheia-1.5);
    const alvoA=vida<0.55? 1 : 1+Math.min(0.6,Math.max(0,d.tCheia-15)/60+R.profundidade*0.04); d.ameaca+=(alvoA-d.ameaca)*0.15; }
  if(d.respiro>0) d.respiro-=dt;
  d.tEvento-=dt;
  if(d.tEvento<=0&&!J.chefeVivo&&!(R.profundidade===0&&J.t<45)){
    if(d.vida>0.5&&d.n<d.alvo*1.2){ eventoHorda(); d.eventos++; d.tEvento=rnd(38,55)-Math.min(15,R.profundidade*3); } else d.tEvento=8; } }
function avisar(txt,sub,cor){ J.aviso={txt,sub:sub||"",vida:2.2,cor:cor||"#ff8a6a"}; }
// lugar bom para um objeto do cenário: fora do abismo (com folga), de lagos, de praças e de construções
function lugarDeObjeto(x,y,m){ if(!estruturaU()||!J.cena) return true; if(abismoEm(x,y,m)) return false;
  for(const f of pecasPerto(x,y)){ if(f.tipo==="abismo") continue; const dx=(x-f.x)/(f.rx+m), dy=(y-f.y)/(f.ry+m); if(dx*dx+dy*dy<1) return false; } return true; }
function lugarLivre(x,y){ return !(estruturaU()&&J.cena&&abismoEm(x,y,6)); }
function eventoHorda(){ evento("onda"); const P=J.jogador, prof=R.profundidade, escala=1+prof*0.15;
  const opcoes=[["cerco",3],["enxame",3],["elites",prof>=1?2:1],["emboscada",2]]; let tot=0; for(const [,p] of opcoes) tot+=p; let s=Math.random()*tot, tipo="cerco"; for(const [t,p] of opcoes){ s-=p; if(s<=0){ tipo=t; break; } }
  if(tipo==="cerco"){ ondaCerco(); avisar("Cerco!","eles fecham o anel: abra caminho"); return; }
  if(tipo==="enxame"){ const a=Math.random()*Math.PI*2, ux=Math.cos(a), uy=Math.sin(a), n=Math.min(40,Math.round(16*escala));
    avisar("Enxame!","uma onda rápida vem de um lado"); J.setas=J.setas||[]; J.setas.push({ang:a,vida:1.4});
    agendar(1.2,()=>{ if(!J||J.fim) return; const P=J.jogador, dist=Math.max(VW,VH)*0.62;
      for(let i=0;i<n;i++){ if(J.inimigos.length>=DIF.max) break; spawnInimigo(0); const e=J.inimigos[J.inimigos.length-1], lat=(i%8-3.5)*12, fila=Math.floor(i/8)*14;
        e.x=P.x+ux*(dist+fila)-uy*lat; e.y=P.y+uy*(dist+fila)+ux*lat; e.v*=1.3; e.surgindo=0; } });
    return; }
  if(tipo==="elites"){ const a=Math.random()*Math.PI*2, ne=Math.min(4,2+Math.floor(prof/2)), dist=Math.max(VW,VH)*0.55;
    avisar("Elites!","monstros fortes chegando juntos","#ffd34a"); J.setas=J.setas||[]; J.setas.push({ang:a,vida:1.4});
    agendar(1.0,()=>{ if(!J||J.fim) return; const P=J.jogador;
      for(let i=0;i<ne+6;i++){ spawnInimigo(i<ne?2:Math.floor(Math.random()*2)); const e=J.inimigos[J.inimigos.length-1], lat=(i-(ne+6)/2)*10;
        e.x=P.x+Math.cos(a)*dist-Math.sin(a)*lat; e.y=P.y+Math.sin(a)*dist+Math.cos(a)*lat; e.surgindo=0;
        if(i<ne){ e.daOnda=true; if(!e.elite){ e.elite=true; e.max*=6; e.hp=e.max; e.escAlvo=1.2; e.r*=1.3; e.virouElite=0.6; particulas(e.x,e.y,"#ffd34a",8,40); } } } });   /* elites das ondas soltam item com menos frequência */
    return; }
  // emboscada: brotam do chão em volta, cada um anunciado por uma marca
  const n=Math.min(16,Math.round(8*escala)); avisar("Emboscada!","eles brotam do chão em volta de você","#c8b890");
  for(let i=0;i<n;i++){ const a=i/n*Math.PI*2+Math.random()*0.4, r=rnd(48,80), x=P.x+Math.cos(a)*r, y=P.y+Math.sin(a)*r; if(!lugarLivre(x,y)) continue;
    perigo({tipo:"circ",x,y,r:6,t:0.9,cor:"#c8b890",fim:()=>{ if(!J||J.fim||J.inimigos.length>=DIF.max) return; spawnInimigo(); const e=J.inimigos[J.inimigos.length-1]; e.x=x; e.y=y; e.surgindo=0.45; }}); } }
function atualizarAvisos(dt){ if(J.aviso){ J.aviso.vida-=dt; if(J.aviso.vida<=0) J.aviso=null; } if(J.setas){ for(const s of J.setas) s.vida-=dt; J.setas=J.setas.filter(s=>s.vida>0); } }
function desenharAvisos(){ if(J.aviso&&!(J.chefeVivo&&J.chefeVivo.hp>0)){ const a=J.aviso, y=Math.round(H*0.2)+46+(J.conqAtual?60:0); ctx.globalAlpha=Math.min(1,a.vida*1.5); ctx.textAlign="center";
    ctx.font=`800 20px "Cinzel", Georgia, serif`; ctx.fillStyle="#120e1a"; ctx.fillText(a.txt,W/2+2,y+2); ctx.fillStyle=a.cor; ctx.fillText(a.txt,W/2,y);
    if(a.sub){ ctx.font=`13px "Nunito", system-ui, sans-serif`; ctx.fillStyle="#f2e7c9"; ctx.fillText(a.sub,W/2,y+18); } ctx.globalAlpha=1; }
  if(J.setas) for(const s of J.setas){ const r=Math.min(W,H)*0.44, x=W/2+Math.cos(s.ang)*r, y=H/2+Math.sin(s.ang)*r*1.4, p=0.6+0.4*Math.sin(J.t*14);
    ctx.globalAlpha=Math.min(1,s.vida*2)*p; ctx.fillStyle="#ff8a6a"; ctx.beginPath(); ctx.moveTo(x-Math.cos(s.ang)*16,y-Math.sin(s.ang)*16); ctx.lineTo(x+Math.cos(s.ang+2.4)*12,y+Math.sin(s.ang+2.4)*12); ctx.lineTo(x+Math.cos(s.ang-2.4)*12,y+Math.sin(s.ang-2.4)*12); ctx.fill(); ctx.globalAlpha=1; } }

// ---------------------------------------------------------------- leitura: contorno automático quando o inimigo se confunde com o chão
const LUM_SPR=new WeakMap();
function luminancia(r,g,b){ const f=c=>{ c/=255; return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4); }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); }
function lumMedia(cv,passo){ try{ const d=cv.getContext("2d").getImageData(0,0,cv.width,cv.height).data; let r=0,g=0,b=0,n=0; for(let i=0;i<d.length;i+=4*(passo||1)){ if(d[i+3]<128) continue; r+=d[i]; g+=d[i+1]; b+=d[i+2]; n++; } return n? luminancia(r/n,g/n,b/n) : 0.2; }catch(err){ return 0.2; } }
function lumChao(){ if(!chao||!chao.cv) return 0.2; if(chao.lum==null) chao.lum=lumMedia(chao.cv,7); return chao.lum; }
function lumSprite(spr){ let L=LUM_SPR.get(spr); if(L==null){ L=lumMedia(spr,1); LUM_SPR.set(spr,L); } return L; }
// devolve a cor do contorno (claro em chão escuro, escuro em chão claro) ou null quando o contraste já é bom
function contornoLeitura(spr){ const Lc=lumChao(), Ls=lumSprite(spr), c=(Math.max(Lc,Ls)+0.05)/(Math.min(Lc,Ls)+0.05); if(c>=1.9) return null; return Lc<0.3? "#f2e7c9" : "#140f1c"; }

// ================================================================ poderes: identidade visual de cada elemento e de cada classe
// Cada golpe dos monstros tem forma (corte, onda, feixe, projétil) dada pela classe e "material" dado pelo elemento.
// Quando as folhas de efeito forem importadas (arte/efeitos/...), especiais, reações e combinados tocam a animação da folha.
const VFX_EL={
  fogo:{c1:"#ffb040",c2:"#e8603c",forma:"brasa",g:-30}, agua:{c1:"#9fe0ff",c2:"#3f8ae0",forma:"gota",g:120},
  terra:{c1:"#c8a070",c2:"#7a5a3a",forma:"pedra",g:160}, ar:{c1:"#e8f4ff",c2:"#9fd8e8",forma:"risco",g:0},
  raio:{c1:"#fff3a0",c2:"#f2d23a",forma:"faisca",g:0}, natureza:{c1:"#9ff07a",c2:"#4f9a3c",forma:"folha",g:18},
  luz:{c1:"#fff8d8",c2:"#ffd34a",forma:"estrela",g:-8}, sombra:{c1:"#b080e0",c2:"#3a2050",forma:"fumaca",g:-24}};
const vEl=el=>VFX_EL[el]||VFX_EL.luz;
// partículas com forma (usa o mesmo J.parts; "forma" e "g" são opcionais)
function particulasEl(x,y,el,n,vel){ const v=vEl(el), L=J.parts.length; if(L>380) n=Math.ceil(n/4); else if(L>250) n=Math.ceil(n/2); if(QUAL===0) n=Math.ceil(n/2);
  for(let i=0;i<n;i++){ if(J.parts.length>450) J.parts.shift(); const a=Math.random()*Math.PI*2, s=rnd(vel*0.3,vel);
    J.parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(v.forma==="brasa"?20:0),vida:rnd(.35,.75),max:.75,cor:Math.random()<.6?v.c1:v.c2,tam:Math.random()<.4?2:1,forma:v.forma,g:v.g,giro:Math.random()*6}); } }
function desenharParticula(p,ox,oy){ const x=p.x-ox, y=p.y-oy; if(x<-4||y<-4||x>VW+4||y>VH+4) return; const a=Math.min(1,p.vida/p.max*1.4); lg.globalAlpha=a; lg.fillStyle=p.cor; lg.strokeStyle=p.cor;
  switch(p.forma){
    case "faisca": { const k=Math.cos(p.vida*40)*1.4; lg.lineWidth=0.6; lg.lineCap="round"; lg.beginPath(); lg.moveTo(x-k,y-1.4); lg.lineTo(x+k,y+1.4); lg.stroke(); lg.beginPath(); lg.arc(x,y,0.7,0,Math.PI*2); lg.fill(); break; }
    case "estrela": { const s=1.2+Math.sin(p.vida*30)*0.4; lg.lineWidth=0.5; lg.lineCap="round"; lg.beginPath(); lg.moveTo(x-s*1.6,y); lg.lineTo(x+s*1.6,y); lg.moveTo(x,y-s*1.6); lg.lineTo(x,y+s*1.6); lg.stroke(); lg.beginPath(); lg.arc(x,y,0.7,0,Math.PI*2); lg.fill(); break; }
    case "folha": { lg.beginPath(); lg.ellipse(x,y,1.3,0.6,p.vida*14+(p.giro||0),0,Math.PI*2); lg.fill(); break; }
    case "risco": { const d=Math.hypot(p.vx,p.vy)||1; lg.lineWidth=0.8; lg.lineCap="round"; lg.beginPath(); lg.moveTo(x,y); lg.lineTo(x-p.vx/d*4,y-p.vy/d*4); lg.stroke(); break; }
    case "fumaca": lg.globalAlpha=a*0.35; lg.beginPath(); lg.arc(x,y,(p.tam+1)*0.9,0,Math.PI*2); lg.fill(); break;
    case "gota": lg.beginPath(); lg.ellipse(x,y,0.55,(p.tam+1)*0.6,0,0,Math.PI*2); lg.fill(); break;
    default: { const r=Math.max(0.5,p.tam*0.6); if(r>0.9){ lg.globalAlpha=a*0.35; lg.beginPath(); lg.arc(x,y,r*2,0,Math.PI*2); lg.fill(); lg.globalAlpha=a; } lg.beginPath(); lg.arc(x,y,r,0,Math.PI*2); lg.fill(); } }
  lg.lineCap="butt"; }
// efeitos curtos com desenho próprio (cortes, ondas, feixes, selos)
function vfx(o){ J.vfx=J.vfx||[]; if(J.vfx.length>80) J.vfx.shift(); o.t=0; J.vfx.push(o); return o; }
function atualizarVfx(dt){ if(!J.vfx) return; for(const v of J.vfx) v.t+=dt; J.vfx=J.vfx.filter(v=>v.t<v.max); }
function desenharVfx(ox,oy,camada){ if(!J.vfx) return; for(const v of J.vfx) if((v.camada||"luz")===camada) v.desenhar(ox,oy,v.t/v.max); lg.globalAlpha=1; lg.lineWidth=1; }

// ---------------------------------------------------------------- ataques básicos por classe
function vfxCorte(s,el,r){ const alvo=maisProximo(s,r+20), ang=alvo? Math.atan2(alvo.y-s.y,alvo.x-s.x) : Math.atan2(J.dir.y||0,J.dir.x||1), v=vEl(el), lado=Math.random()<.5?1:-1;
  // lua crescente: o traço é largo no meio e fino nas pontas; brilho por baixo e fio branco por cima; a ponta corre na frente do rastro
  vfx({max:.22,desenhar(ox,oy,q){ const x=s.x-ox, y=s.y-oy, ab=2.3, ini=ang-ab/2*lado, frente=Math.min(1,q*2.4), tras=Math.max(0,q*1.6-0.35), N=12, rr=r*0.85;
    lg.lineCap="round"; lg.globalCompositeOperation="lighter";
    for(const [cor,lw,al] of [[v.c1,4.2,0.35],[v.c2,2.2,0.9],["#ffffff",0.8,1]]){ lg.strokeStyle=cor;
      for(let i=0;i<N;i++){ const u0=tras+(frente-tras)*i/N, u1=tras+(frente-tras)*(i+1)/N; if(u1<=u0) continue; const um=(u0+u1)/2, larg=Math.sin(Math.min(1,(um-tras)/Math.max(0.01,frente-tras))*Math.PI);
        lg.globalAlpha=al*(1-q*0.7); lg.lineWidth=Math.max(0.2,lw*larg*(1-q*0.4)); lg.beginPath(); lg.arc(x,y,rr+(cor==="#ffffff"?0.6:0),ini+ab*lado*u0,ini+ab*lado*u1,lado<0); lg.stroke(); } }
    lg.globalCompositeOperation="source-over"; lg.lineCap="butt"; }});
  for(let i=0;i<4;i++){ const a=ang+rnd(-1,1); particulasEl(s.x+Math.cos(a)*r*0.8,s.y+Math.sin(a)*r*0.8,el,1,40); } }
function vfxOnda(s,el,r){ const v=vEl(el), x0=s.x, y0=s.y;
  vfx({max:.35,camada:"chao",desenhar(ox,oy,q){ lg.globalAlpha=(1-q)*0.8; lg.strokeStyle=v.c2; lg.lineWidth=2; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r*q,r*q*0.8,0,0,Math.PI*2); lg.stroke();
    lg.globalAlpha=(1-q)*0.4; lg.strokeStyle=v.c1; lg.lineWidth=1; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r*q*0.7,r*q*0.56,0,0,Math.PI*2); lg.stroke(); }});
  for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; particulasEl(x0+Math.cos(a)*r,y0+Math.sin(a)*r*0.8,el,1,30); } }
function vfxFeixe(s,e,el){ const v=vEl(el), pts=[]; const n=6; for(let i=0;i<=n;i++){ const t=i/n; pts.push([t,(i&&i<n)?rnd(-3,3):0]); }
  vfx({max:.16,desenhar(ox,oy,q){ const dx=e.x-s.x, dy=e.y-s.y, d=Math.hypot(dx,dy)||1, nx=-dy/d, ny=dx/d;
    for(const [lw,cor,al] of [[3,v.c2,.45],[1,v.c1,1]]){ lg.globalAlpha=al*(1-q); lg.strokeStyle=cor; lg.lineWidth=lw; lg.beginPath();
      pts.forEach(([t,o],i)=>{ const x=s.x+dx*t+nx*o-ox, y=s.y+dy*t+ny*o-oy; i?lg.lineTo(x,y):lg.moveTo(x,y); }); lg.stroke(); } }});
  particulasEl(e.x,e.y,el,4,50); }
function vfxX(e,el){ const v=vEl(el), x0=e.x, y0=e.y;
  vfx({max:.22,desenhar(ox,oy,q){ const L=9*Math.min(1,q*3); lg.globalAlpha=1-q; lg.strokeStyle="#ffffff"; lg.lineWidth=1; lg.beginPath(); lg.moveTo(x0-ox-L,y0-oy-L); lg.lineTo(x0-ox+L,y0-oy+L); lg.moveTo(x0-ox+L,y0-oy-L); lg.lineTo(x0-ox-L,y0-oy+L); lg.stroke();
    lg.strokeStyle=v.c2; lg.globalAlpha=(1-q)*0.6; lg.lineWidth=3; lg.beginPath(); lg.moveTo(x0-ox-L,y0-oy-L); lg.lineTo(x0-ox+L,y0-oy+L); lg.stroke(); }}); }
function vfxSelo(x0,y0,el,r){ const v=vEl(el);
  vfx({max:.5,camada:"chao",desenhar(ox,oy,q){ lg.globalAlpha=Math.sin(q*Math.PI)*0.8; lg.strokeStyle=v.c1; lg.lineWidth=1; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r,r*0.6,0,0,Math.PI*2); lg.stroke();
    for(let i=0;i<5;i++){ const a=q*2+i/5*Math.PI*2; lg.fillStyle=v.c2; lg.fillRect(Math.round(x0-ox+Math.cos(a)*r),Math.round(y0-oy+Math.sin(a)*r*0.6),2,1); } }}); }
// golpe que acertou: estouro pequeno do material do elemento
function vfxAcerto(e,el,forte){ if(Math.random()<(forte?1:0.35)) particulasEl(e.x,e.y,el,forte?6:2,forte?70:40); }

// ---------------------------------------------------------------- projéteis com forma e rastro
// projéteis: forma suave por elemento + halo de luz + rastro afinando (desenhado em modo aditivo)
function desenharProjetil(p,ox,oy){ const v=vEl(p.el), x=p.x-ox, y=p.y-oy, ang=Math.atan2(p.vy||0.001,p.vx||0.001), orbe=!!p.alvo||!!p.explode;
  if(x<-12||y<-12||x>VW+12||y>VH+12) return;
  p.rastro=p.rastro||[]; p.rastro.push([p.x,p.y]); if(p.rastro.length>(orbe?8:6)) p.rastro.shift();
  const rs=p.rastro; lg.lineCap="round"; lg.strokeStyle=v.c2;
  for(let i=1;i<rs.length;i++){ const q=i/rs.length; lg.globalAlpha=q*0.55; lg.lineWidth=(orbe?3.2:1.8)*q; lg.beginPath(); lg.moveTo(rs[i-1][0]-ox,rs[i-1][1]-oy); lg.lineTo(rs[i][0]-ox,rs[i][1]-oy); lg.stroke(); }
  const R=orbe?10:6.5; lg.globalAlpha=orbe?0.6:0.45; lg.drawImage(bolhaCor(v.c1),x-R,y-R,R*2,R*2); lg.globalAlpha=1;
  if(orbe){ const pul=1+Math.sin(J.t*20)*0.2; lg.fillStyle=v.c2; lg.beginPath(); lg.arc(x,y,2.8*pul,0,Math.PI*2); lg.fill(); lg.fillStyle=v.c1; lg.beginPath(); lg.arc(x,y,1.9,0,Math.PI*2); lg.fill();
    lg.fillStyle="#ffffff"; lg.beginPath(); lg.arc(x-0.5,y-0.5,0.9,0,Math.PI*2); lg.fill();
    lg.fillStyle=v.c1; for(let i=0;i<3;i++){ const a=J.t*9+i*2.09; lg.beginPath(); lg.arc(x+Math.cos(a)*5,y+Math.sin(a)*3.6,0.6,0,Math.PI*2); lg.fill(); } lg.lineCap="butt"; return; }
  lg.save(); lg.translate(x,y); lg.rotate(ang);
  switch(v.forma){
    case "brasa": lg.fillStyle=v.c2; lg.beginPath(); lg.moveTo(-6,0); lg.quadraticCurveTo(-1,-2.6,1.5,-2); lg.arc(1.2,0,2,-Math.PI/2,Math.PI/2); lg.quadraticCurveTo(-1,2.6,-6,0); lg.fill();
      lg.fillStyle=v.c1; lg.beginPath(); lg.arc(1,0,1.5,0,Math.PI*2); lg.fill(); lg.fillStyle="#fff3c4"; lg.beginPath(); lg.arc(1.4,-0.3,0.7,0,Math.PI*2); lg.fill(); break;   // bola de fogo
    case "gota": lg.fillStyle=v.c2; lg.beginPath(); lg.moveTo(-4.5,0); lg.quadraticCurveTo(0,-2,2.2,-1.3); lg.arc(2,0,1.4,-Math.PI/2,Math.PI/2); lg.quadraticCurveTo(0,2,-4.5,0); lg.fill();
      lg.fillStyle="#ffffff"; lg.globalAlpha=0.8; lg.beginPath(); lg.ellipse(1.6,-0.5,0.8,0.45,0,0,Math.PI*2); lg.fill(); break;                                           // dardo d'água
    case "pedra": lg.rotate(J.t*12); lg.fillStyle=v.c2; lg.beginPath(); for(let i=0;i<6;i++){ const a=i/6*Math.PI*2, rr=i%2?1.8:2.5; lg.lineTo(Math.cos(a)*rr,Math.sin(a)*rr); } lg.closePath(); lg.fill();
      lg.fillStyle=v.c1; lg.beginPath(); lg.arc(-0.6,-0.6,0.9,0,Math.PI*2); lg.fill(); break;                                                                                // pedra girando
    case "risco": lg.strokeStyle=v.c1; lg.lineWidth=1.3; lg.beginPath(); lg.arc(-2.5,0,3.6,-1.25,1.25); lg.stroke(); lg.strokeStyle="#ffffff"; lg.lineWidth=0.5; lg.beginPath(); lg.arc(-2.2,0,3.6,-0.9,0.9); lg.stroke(); break;   // lâmina de vento
    case "faisca": { lg.lineJoin="round"; const pts=[-5,0,-2.5,(Math.random()-.5)*3,0,(Math.random()-.5)*3,2.5,(Math.random()-.5)*3,4.5,0];
      for(const [cor,lw] of [[v.c1,1.4],["#ffffff",0.55]]){ lg.strokeStyle=cor; lg.lineWidth=lw; lg.beginPath(); lg.moveTo(pts[0],pts[1]); for(let i=2;i<pts.length;i+=2) lg.lineTo(pts[i],pts[i+1]); lg.stroke(); } break; }   // raio
    case "folha": lg.rotate(Math.sin(J.t*16)*0.6); lg.fillStyle=v.c2; lg.beginPath(); lg.ellipse(0,0,3,1.3,0,0,Math.PI*2); lg.fill(); lg.strokeStyle=v.c1; lg.lineWidth=0.4; lg.beginPath(); lg.moveTo(-2.6,0); lg.lineTo(2.6,0); lg.stroke(); break;   // espinho/folha
    case "estrela": lg.strokeStyle=v.c1; lg.lineWidth=1.3; lg.beginPath(); lg.moveTo(-5,0); lg.lineTo(3,0); lg.stroke(); lg.strokeStyle="#ffffff"; lg.lineWidth=0.6; lg.beginPath(); lg.moveTo(-2,0); lg.lineTo(3.5,0); lg.stroke();
      lg.fillStyle="#ffffff"; lg.beginPath(); lg.arc(3.4,0,0.9,0,Math.PI*2); lg.fill(); break;                                                                                // agulha de luz
    default: lg.fillStyle=v.c2; lg.beginPath(); lg.arc(0,0,2.4,0,Math.PI*2); lg.fill(); lg.fillStyle=v.c1; lg.beginPath(); lg.arc(0.4,-0.4,1.1,0,Math.PI*2); lg.fill(); }        // orbe de sombra
  lg.restore(); lg.lineCap="butt"; lg.lineJoin="miter"; }

// ---------------------------------------------------------------- especiais, reações e combinados (usa as folhas quando importadas)
function tocarFolha(caminho,cols,x,y,tam,dur){ const img=folhaArte(caminho); if(!img) return false;
  vfx({max:dur,camada:"frente",desenhar(ox,oy,q){ const s=celulaArte(img,cols,1,Math.min(cols-1,Math.floor(q*cols)),0,tam,tam,0.5); lg.globalAlpha=q>0.85?(1-q)/0.15:1; lg.drawImage(s,Math.round(x-ox-tam/2),Math.round(y-oy-tam/2)); }});
  return true; }
// As folhas arte/efeitos/especial__* e combinado__* vieram cortadas na conversão (cada quadro é uma fatia com pedaço do vizinho)
// e mostram um personagem inteiro por cima do cenário. Até serem refeitas, os especiais usam os efeitos desenhados abaixo.
const USAR_FOLHAS_ESPECIAL=false;
// ---- peças de efeito desenhadas (nítidas em qualquer resolução)
const curvaEf=q=>q<0.15? q/0.15 : q>0.75? (1-q)/0.25 : 1;   // entra rápido, segura, some
function efCirculo(x0,y0,r,el,dur,rapido){ const v=vEl(el), runas=Array.from({length:12},(_,i)=>i);
  vfx({max:dur,camada:"chao",desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, a=curvaEf(q), rot=q*(rapido?6:2.4), rr=r*(0.6+0.4*Math.min(1,q*4));
    lg.save(); lg.translate(x,y); lg.scale(1,0.62); lg.globalCompositeOperation="lighter"; lg.lineCap="round";
    lg.globalAlpha=a*0.35; lg.drawImage(bolhaCor(v.c1),-rr*1.1,-rr*1.1,rr*2.2,rr*2.2);
    for(const [k,lw,cor,al] of [[1,2.2,v.c2,0.55],[1,0.8,"#ffffff",0.9],[0.78,1.4,v.c1,0.8]]){ lg.globalAlpha=a*al; lg.strokeStyle=cor; lg.lineWidth=lw; lg.beginPath(); lg.arc(0,0,rr*k,0,Math.PI*2); lg.stroke(); }
    lg.rotate(rot); lg.strokeStyle=v.c1; lg.lineWidth=1; lg.globalAlpha=a*0.85; lg.beginPath();
    for(let i=0;i<6;i++){ const t1=i/6*Math.PI*2, t2=(i+2)/6*Math.PI*2; lg.moveTo(Math.cos(t1)*rr*0.78,Math.sin(t1)*rr*0.78); lg.lineTo(Math.cos(t2)*rr*0.78,Math.sin(t2)*rr*0.78); } lg.stroke();
    lg.rotate(-rot*2); lg.fillStyle=v.c1; for(const i of runas){ const t1=i/12*Math.PI*2, R2=rr*0.89; lg.save(); lg.translate(Math.cos(t1)*R2,Math.sin(t1)*R2); lg.rotate(t1); lg.globalAlpha=a*(0.6+0.4*Math.sin(q*20+i)); lg.fillRect(-1.2,-0.4,2.4,0.8); lg.fillRect(-0.4,-1.2,0.8,2.4); lg.restore(); }
    lg.restore(); lg.globalCompositeOperation="source-over"; lg.lineCap="butt"; }}); }
function efPilar(x0,y0,el,dur,larg){ const v=vEl(el), L=larg||10;
  vfx({max:dur,desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, a=curvaEf(q), w=L*(0.4+0.6*Math.sin(Math.min(1,q*3)*Math.PI/2))*(1-Math.max(0,q-0.7)*2), h=120;
    lg.globalCompositeOperation="lighter"; const gr=lg.createLinearGradient(x-w,0,x+w,0); gr.addColorStop(0,"rgba(255,255,255,0)"); gr.addColorStop(0.3,v.c2); gr.addColorStop(0.5,"#ffffff"); gr.addColorStop(0.7,v.c2); gr.addColorStop(1,"rgba(255,255,255,0)");
    lg.globalAlpha=a*0.75; lg.fillStyle=gr; lg.fillRect(x-w,y-h,w*2,h); lg.globalAlpha=a*0.6; lg.drawImage(bolhaCor(v.c1),x-w*2.2,y-w*1.1,w*4.4,w*2.2); lg.globalCompositeOperation="source-over"; }});
  for(let i=0;i<10;i++) J.parts.push({x:x0+rnd(-L,L)*0.6,y:y0,vx:rnd(-6,6),vy:-rnd(60,140),vida:rnd(.4,.8),max:.8,cor:v.c1,tam:1,forma:"estrela"}); }
function efCupula(x0,y0,r,el,dur){ const v=vEl(el);
  vfx({max:dur,desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, a=curvaEf(q), rr=r*(0.7+0.3*Math.min(1,q*5)); lg.globalCompositeOperation="lighter";
    lg.globalAlpha=a*0.22; lg.fillStyle=v.c1; lg.beginPath(); lg.ellipse(x,y,rr,rr*0.95,0,Math.PI,0); lg.ellipse(x,y,rr,rr*0.35,0,0,Math.PI); lg.fill();
    lg.strokeStyle=v.c1; lg.lineWidth=1.6; lg.globalAlpha=a*0.85; lg.beginPath(); lg.ellipse(x,y,rr,rr*0.95,0,Math.PI,0); lg.stroke(); lg.beginPath(); lg.ellipse(x,y,rr,rr*0.35,0,0,Math.PI*2); lg.stroke();
    // hexágonos que brilham passando pela cúpula
    lg.lineWidth=0.7; lg.strokeStyle="#ffffff"; for(let i=0;i<7;i++){ const t=(i/7+q*0.8)%1, ang=Math.PI+t*Math.PI, hx=x+Math.cos(ang)*rr*0.75, hy=y+Math.sin(ang)*rr*0.7, hr=3;
      lg.globalAlpha=a*Math.sin(t*Math.PI); lg.beginPath(); for(let k=0;k<6;k++){ const b=k/6*Math.PI*2; lg[k?"lineTo":"moveTo"](hx+Math.cos(b)*hr,hy+Math.sin(b)*hr); } lg.closePath(); lg.stroke(); }
    lg.globalCompositeOperation="source-over"; }}); }
function efCortes(x0,y0,r,el,n){ const v=vEl(el);
  for(let i=0;i<n;i++){ const ang=Math.random()*Math.PI*2, t0=i*0.06, cx=x0+rnd(-r*0.3,r*0.3), cy=y0+rnd(-r*0.3,r*0.3), L=r*rnd(0.8,1.2);
    vfx({max:0.24+t0,desenhar(ox,oy,q0){ const q=(q0*(0.24+t0)-t0)/0.24; if(q<0) return; const x=cx-ox, y=cy-oy, a=1-q, k=Math.min(1,q*3);
      lg.globalCompositeOperation="lighter"; lg.lineCap="round"; const dx=Math.cos(ang)*L, dy=Math.sin(ang)*L*0.7;
      for(const [lw,cor,al] of [[4,v.c2,0.4],[1.6,v.c1,0.9],[0.6,"#ffffff",1]]){ lg.globalAlpha=a*al; lg.strokeStyle=cor; lg.lineWidth=lw*(1-q*0.5); lg.beginPath(); lg.moveTo(x-dx,y-dy); lg.lineTo(x-dx+dx*2*k,y-dy+dy*2*k); lg.stroke(); }
      lg.globalCompositeOperation="source-over"; lg.lineCap="butt"; }}); }
  particulasEl(x0,y0,el,10,90); }
function efImpactoChao(x0,y0,r,el){ const v=vEl(el), rach=Array.from({length:9},()=>({a:Math.random()*Math.PI*2,l:r*rnd(0.5,1),q:rnd(-0.3,0.3)}));
  vfx({max:1.2,camada:"chao",desenhar(ox,oy,q){ const x=x0-ox, y=y0-oy, a=q<0.7?1:(1-q)/0.3, k=Math.min(1,q*8); lg.strokeStyle="#1a1210"; lg.lineCap="round";
    for(const c of rach){ lg.globalAlpha=a*0.7; lg.lineWidth=1.4; lg.beginPath(); lg.moveTo(x,y); const mx=x+Math.cos(c.a)*c.l*0.5*k, my=y+Math.sin(c.a)*c.l*0.35*k; lg.lineTo(mx,my); lg.lineTo(x+Math.cos(c.a+c.q)*c.l*k,y+Math.sin(c.a+c.q)*c.l*0.7*k); lg.stroke(); }
    lg.globalCompositeOperation="lighter"; lg.globalAlpha=a*(1-q)*0.8; lg.strokeStyle=v.c1; lg.lineWidth=1; for(const c of rach){ lg.beginPath(); lg.moveTo(x,y); lg.lineTo(x+Math.cos(c.a)*c.l*0.5*k,y+Math.sin(c.a)*c.l*0.35*k); lg.stroke(); }
    lg.globalCompositeOperation="source-over"; lg.lineCap="butt"; }});
  vfxOnda({x:x0,y:y0},el,r); tremor(5); for(let i=0;i<14;i++){ const a=Math.random()*Math.PI*2, vv=rnd(40,110); J.parts.push({x:x0,y:y0,vx:Math.cos(a)*vv,vy:Math.sin(a)*vv*0.6-rnd(30,70),vida:rnd(.4,.8),max:.8,cor:"#8a7a6a",tam:2}); } }
function efChuva(x0,y0,r,el){ const v=vEl(el);
  for(let i=0;i<14;i++){ const t0=i*0.04, tx=x0+rnd(-r,r), ty=y0+rnd(-r*0.7,r*0.7);
    vfx({max:0.28+t0,desenhar(ox,oy,q0){ const q=(q0*(0.28+t0)-t0)/0.28; if(q<0) return; const x=tx-ox, y=ty-oy, h=60*(1-q); lg.globalCompositeOperation="lighter"; lg.lineCap="round";
      lg.globalAlpha=0.9; lg.strokeStyle=v.c1; lg.lineWidth=1.2; lg.beginPath(); lg.moveTo(x+h*0.3,y-h); lg.lineTo(x+h*0.3-6,y-h+12); lg.stroke();
      if(q>0.85){ lg.globalAlpha=(1-q)*6; lg.drawImage(bolhaCor(v.c1),x-5,y-3,10,6); } lg.globalCompositeOperation="source-over"; lg.lineCap="butt"; }}); } }
function efEspiral(x0,y0,r,el,dur){ for(let i=0;i<22;i++){ const a=i/22*Math.PI*6, d=r*(0.2+i/22*0.8), v=vEl(el); J.parts.push({x:x0+Math.cos(a)*d,y:y0+Math.sin(a)*d*0.7,vx:-Math.sin(a)*60,vy:Math.cos(a)*42-30,vida:rnd(.5,dur),max:dur,cor:i%2?v.c1:v.c2,tam:1,forma:el==="natureza"?"folha":"estrela"}); } }
function vfxEspecial(s,alvo,cls,op,el){ const v=vEl(el), centro=["guardiao","mistico","invocador","xama"].includes(cls)? s : alvo;
  luzFlash(centro.x,centro.y,v.c1,90,0.45);
  if(USAR_FOLHAS_ESPECIAL&&tocarFolha(`arte/efeitos/especial__${cls}_${op+1}.png`,8,centro.x,centro.y,110,0.7)) return;
  const x0=centro.x, y0=centro.y;
  switch(cls){
    case "guardiao": efCupula(x0,y0+4,30,el,0.9); efCirculo(x0,y0+6,34,el,0.9); break;
    case "assassino": efCortes(x0,y0,26,el,6); break;
    case "guerreiro": efImpactoChao(x0,y0+4,44,el); efCortes(x0,y0-4,30,el,1); break;
    case "mago": efCirculo(x0,y0+4,30,el,0.8,true); efPilar(x0,y0+4,el,0.7,9); break;
    case "mistico": efCirculo(x0,y0+6,36,el,1.0); efEspiral(x0,y0,30,el,1.0); break;
    case "invocador": efCirculo(x0,y0+6,32,el,1.1,true); efPilar(x0,y0+6,el,0.6,6); efEspiral(x0,y0,22,el,0.8); break;
    case "xama": efEspiral(x0,y0,36,el,1.1); efCirculo(x0,y0+6,30,el,0.9); break;
    case "cacador": efChuva(x0,y0,34,el); efCirculo(x0,y0+4,30,el,0.7,true); break;
    default: efCirculo(x0,y0+6,32,el,0.8); vfxOnda({x:x0,y:y0},el,60); }
  particulasEl(x0,y0,el,14,110); }
function nomeArqReacao(a,b){ for(const [x,y] of [[a,b],[b,a]]){ const c=`arte/efeitos/reacao__${x}_${y}.png`; if(folhaArte(c)) return c; } return null; }
function vfxReacao(e,a,b){ const c=nomeArqReacao(a,b); luzFlash(e.x,e.y,mistura(COR[a],COR[b],.5),34,0.25);
  if(c&&tocarFolha(c,6,e.x,e.y,44,0.45)) return; particulasEl(e.x,e.y,a,7,85); particulasEl(e.x,e.y,b,7,85); vfxOnda({x:e.x,y:e.y},b,18); }
function vfxCombinado(c,P){ const chave=c.chave||c.a||"luz"; luzFlash(P.x,P.y,"#ffffff",160,0.6);
  if(USAR_FOLHAS_ESPECIAL&&tocarFolha(`arte/efeitos/combinado__${chave}.png`,10,P.x,P.y,170,1.0)) return; const el=VFX_EL[chave]? chave : elementoDe(ativos()[0]);
  // combinado: círculo grande girando, pilar de luz no centro, onda e uma chuva das cores da equipe
  efCirculo(P.x,P.y+6,70,el,1.4,true); efCirculo(P.x,P.y+6,46,elementoDe(ativos()[ativos().length-1])||el,1.2); efPilar(P.x,P.y+6,el,1.0,16); vfxOnda({x:P.x,y:P.y},el,110); efEspiral(P.x,P.y,60,el,1.2); }

// ---------------------------------------------------------------- eventos no meio do mapa: a cada ~40 s algo diferente acontece
// chuva de meteoros (círculos anunciados: ferem inimigos e o Invocador), fugitivo dourado (foge; derrotado, deixa baú dourado),
// altar do elemento (ficar em cima carrega o Despertar) e chuva de cristais de experiência
const EVENTOS=["meteoros","fugitivo","altar","cristais"];
function atualizarEventos(dt){ if(J.fim||J.chefeVivo||J.t>MAPA_SEG-12||J.t<18) return;
  if(J.altar){ const a=J.altar, P=J.jogador; a.t-=dt; const dentro=Math.hypot(P.x-a.x,P.y-a.y)<a.r; if(dentro&&J.desp<=0){ J.ult=Math.min(100,J.ult+dt*28); if(Math.random()<.3) particulasEl(P.x,P.y,a.el,1,40); }
    if(a.t<=0||J.ult>=100&&dentro){ if(J.ult>=100&&dentro){ diaria("eventos"); } if(J.ult>=100&&dentro) texto(a.x,a.y-16,"Despertar pronto!","#ffd34a",14); J.altar=null; } }
  J.tEvento=(J.tEvento??rnd(26,34))-dt; if(J.tEvento>0) return; J.tEvento=rnd(36,46);
  const k=escolha(EVENTOS.filter(x=>x!==J.ultEvento)); J.ultEvento=k; const P=J.jogador, el=UNIV[R.universo].elemento;
  if(k==="meteoros"){ if(!SIM.ativo) anunciar({el:"fogo"},"Chuva de meteoros!","Saia dos círculos: as pedras ferem todos que estiverem dentro.");
    for(let i=0;i<10;i++) agendar(0.6+i*0.35,()=>{ if(!J||J.fim) return; const x=P.x+rnd(-VW*0.45,VW*0.45), y=P.y+rnd(-VH*0.4,VH*0.4), r=16;
      perigo({tipo:"circ",x,y,r,t:1.1,cor:"#ff8a3d",fim:()=>{ if(!J) return; FONTE="ambiente"; emArea(x,y,r+4,e=>{ if(!e.ehProp) ferir(e,DIF.hp*dificuldade()*0.9,"fogo"); }); FONTE="basico";
        if(Math.hypot(J.jogador.x-x,J.jogador.y-y)<r) feriJogador(J.vidaMax*0.08,"fogo"); vfxOnda({x,y},"fogo",r+6); particulasEl(x,y,"fogo",12,90); luzFlash(x,y,"#ffb060",50,0.35); tremor(3); mudarSolo(x,y,"queimado",8); }}); }); }
  else if(k==="fugitivo"){ spawnInimigo(0); const e=J.inimigos[J.inimigos.length-1]; const a=Math.random()*6.28; e.x=P.x+Math.cos(a)*VW*0.35; e.y=P.y+Math.sin(a)*VH*0.3;
    Object.assign(e,{fugitivo:true,elite:true,hp:e.max*8,max:e.max*8,esc:1,escAlvo:1.25,virouElite:1.2,v:e.v*1.25,dano:e.dano*0.3});
    if(!SIM.ativo) anunciar({el:"luz"},"Um fugitivo dourado!","Pegue-o antes que escape: ele carrega um baú dourado.");
    agendar(18,()=>{ if(J&&e.hp>0&&!e._pagou){ e.hp=0; e.semCadaver=true; particulas(e.x,e.y,"#ffd34a",16,80); J.inimigos=J.inimigos.filter(x=>x!==e); if(!SIM.ativo) texto(e.x,e.y-12,"Escapou!","#ffd34a",13); } }); }
  else if(k==="altar"){ const a=Math.random()*6.28, d=Math.min(VW,VH)*0.3; J.altar={x:P.x+Math.cos(a)*d,y:P.y+Math.sin(a)*d,r:16,t:14,el:ativos()[0]?elementoDe(ativos()[0]):el};
    if(!SIM.ativo) anunciar({el:J.altar.el},"Altar elemental!","Fique sobre ele para carregar o Despertar."); }
  if(k==="meteoros"||k==="cristais") agendar(8,()=>{ if(J&&!J.fim) diaria("eventos"); });
  if(k==="cristais"){ if(!SIM.ativo) anunciar({el:"luz"},"Chuva de cristais!","Corra para pegar a experiência.");
    for(let i=0;i<24;i++){ const x=P.x+rnd(-VW*0.45,VW*0.45), y=P.y+rnd(-VH*0.4,VH*0.4); J.gemas.push({x,y,vx:0,vy:0,v:3+R.profundidade*0.6,cor:"#9fe0ff"}); } } }
function desenharAltar(ox,oy){ const a=J.altar; if(!a) return; const x=a.x-ox, y=a.y-oy, cor=COR[a.el]||"#ffd34a", pul=0.5+0.5*Math.sin(J.t*4);
  lg.save(); lg.translate(x,y); lg.scale(1,0.55); lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.25+0.15*pul; lg.drawImage(bolhaCor(cor),-a.r*1.3,-a.r*1.3,a.r*2.6,a.r*2.6);
  lg.globalAlpha=0.9; lg.strokeStyle=cor; lg.lineWidth=1.4; lg.beginPath(); lg.arc(0,0,a.r,0,Math.PI*2); lg.stroke(); lg.rotate(J.t*0.8); lg.lineWidth=0.8;
  for(let i=0;i<6;i++){ const b=i/6*Math.PI*2; lg.beginPath(); lg.moveTo(Math.cos(b)*a.r*0.6,Math.sin(b)*a.r*0.6); lg.lineTo(Math.cos(b+2.1)*a.r*0.6,Math.sin(b+2.1)*a.r*0.6); lg.stroke(); }
  lg.restore(); lg.globalCompositeOperation="source-over"; lg.globalAlpha=1;
  lg.fillStyle="#3a3040"; lg.fillRect(x-3,y-9,6,9); lg.fillStyle="#5a5060"; lg.fillRect(x-3,y-9,6,2); lg.fillStyle=cor; lg.beginPath(); lg.arc(x,y-12-pul,2.2,0,Math.PI*2); lg.fill(); lg.lineWidth=1; }
// ---------------------------------------------------------------- textos: o nome de uma reação só aparece grande na primeira vez da partida
function textoUnico(chave,x,y,t,cor,tam){ R.vistos=R.vistos||{}; if(R.vistos[chave]) return false; R.vistos[chave]=1; texto(x,y,t,cor,tam); return true; }

// ================================================================ árvore de poderes: Talismãs (passivos), Poderes Despertos (evoluções) e Uniões
// Regras e números em dados/fonte_poderes.py. Desperto: poder no nível 5 + Talismã par + monstro Adulto -> baú de mini-chefe ou chefe.
const PD=()=>D.poderes;
function nivTal(id){ return (R.talismas&&R.talismas[id])||0; }
function valTal(efeito){ let v=0; for(const id in (R.talismas||{})){ const t=PD().talismas[id]; if(t&&t.efeito===efeito) v+=t.valor*R.talismas[id]; } return v; }
const tal={ dano:()=>1+valTal("dano"), defesa:()=>Math.max(0.5,1-valTal("defesa"))*((SIN.rm&&SIN.rm.danoRec)||1), recarga:()=>Math.max(0.6,1-valTal("recarga")), area:()=>1+valTal("area")+passiva("area")+custo("area"),
  coleta:()=>1+valTal("coleta"), regen:()=>valTal("regen"), duracao:()=>1+valTal("duracao")+passiva("duracao"), projeteis:()=>{ const lv=nivTal("espelho"); return (lv>=2?1:0)+(lv>=5?1:0); },
  velocidade:()=>1+valTal("velocidade"), critico:()=>valTal("critico"), xp:()=>1+valTal("xp")+valTal("risco")*1.25, riscoVida:()=>1+valTal("risco"), riscoVel:()=>1+valTal("risco")*0.5 };
function talismasLiberados(){ const T=PD().talismas; return Object.keys(T).filter(id=>T[id].inicial||(META.talismas||[]).includes(id)||SIM.tudoLiberado); }
function cartaTalisma(){ if(SIM.semTalismas||Math.random()>=PD().chance_carta+passiva("carta_extra")*0.35+((SIN.rm&&SIN.rm.talisma)||0)) return null; const tem=Object.keys(R.talismas||{}), cheio=tem.length>=PD().encaixes;
  const ops=talismasLiberados().filter(id=> cheio? (tem.includes(id)&&nivTal(id)<5) : nivTal(id)<5); if(!ops.length) return null;
  const util=ops.filter(id=>PD().despertos.some(d=>d.talisma===id&&ativos().some(s=>L(s).classe===d.classe)));   // prefere os que abrem Desperto da equipe
  // meio caminho de uma União: se a equipe já tem um Desperto de um par e a classe do parceiro está na equipe, favorece o Talismã que falta
  const par=paresPendentes(), falta=ops.filter(id=>par.some(p=>p.talisma===id));
  const id=falta.length&&Math.random()<0.6? escolha(falta) : escolha(util.length&&Math.random()<0.7?util:ops), t=PD().talismas[id], lv=nivTal(id), abre=PD().despertos.filter(d=>d.talisma===id).map(d=>d.nome).join(" e ");
  const uniao=paresPendentes().find(p=>p.talisma===id);
  return {titulo:`Talismã: ${t.nome} ${lv?`${lv} → ${lv+1}`:"(novo)"}`, raridade:"epico", sprite:iconeTalisma(id), suave:true, texto:`${t.texto} por nível. Abre os Despertos ${abre}.${uniao?` Completa o caminho da União ${uniao.uniao}.`:""} Encaixes: ${tem.length+(lv?0:1)}/${PD().encaixes}.`,
    acao:()=>{ R.talismas=R.talismas||{}; R.talismas[id]=lv+1; R.st.talismas=(R.st.talismas||0)+1; if(J) texto(J.jogador.x,J.jogador.y-20,t.nome,"#e0b0ff",14); proximaEscolha(); } }; }
function despertoDe(s,k){ return PD().despertos.find(d=>d.classe===L(s).classe&&d.poder===k); }
function podeDespertar(s,k){ const d=despertoDe(s,k); return !!d&&!(s.desp&&s.desp[k])&&s.pod[k]>=5&&nivTal(d.talisma)>0&&estBase(s)>=2; }
function bauDesperto(x,y){ const cand=[]; for(const s of ativos()) for(const k of ["b","h1","h2"]) if(podeDespertar(s,k)) cand.push([s,k]); if(!cand.length) return false;
  const [s,k]=escolha(cand), d=despertoDe(s,k); s.desp=s.desp||{}; s.desp[k]=true; R.st.despertos=(R.st.despertos||0)+1; evento("desperto");
  if(R.st.mapaPrimeiroDesperto==null) R.st.mapaPrimeiroDesperto=R.profundidade+1;
  texto(x,y-24,`Desperto: ${d.nome}!`,"#ffd34a",18); if(typeof luzFlash==="function") luzFlash(x,y,"#ffd34a",80,0.6); tremor(5); checarUnioes(); return true; }
function despertosAtivos(){ const n=new Set(); for(const s of ativos()) for(const k of ["b","h1","h2"]) if(s.desp&&s.desp[k]){ const d=despertoDe(s,k); if(d) n.add(d.nome); } return n; }
function checarUnioes(){ const n=despertosAtivos(); R.unioes=R.unioes||[];
  for(const u of PD().unioes) if(n.has(u.a)&&n.has(u.b)&&!R.unioes.includes(u.nome)){ R.unioes.push(u.nome); R.st.unioes=(R.st.unioes||0)+1; evento("uniao"); if(J){ texto(J.jogador.x,J.jogador.y-30,`União: ${u.nome}!`,"#ff8ad8",20); tremor(8); } } }
// força de um poder: Desperto e União multiplicam o dano daquele poder (o Desperto substitui o poder, não soma)
function fatorPoder(s,k){ if(!(s.desp&&s.desp[k])) return 1; let f=PD().forca_desperto; const d=despertoDe(s,k);
  if(d&&(R.unioes||[]).some(nm=>{ const u=PD().unioes.find(x=>x.nome===nm); return u&&(u.a===d.nome||u.b===d.nome)&&despertosAtivos().has(u.a)&&despertosAtivos().has(u.b); })) f*=PD().forca_uniao; return f; }
// Proteção do Pacto: enquanto a equipe tem um só monstro, ele bate mais forte (o dobro nas classes de suporte), para nenhum começo ficar travado
function fatorSozinho(s){ if(ativos().length!==1) return 1; const c=L(s).classe; return c==="mistico"||c==="guardiao"? 2 : 1.4; }
function atribPoder(a,s,k){ const f=fatorPoder(s,k)*tal.dano()*fatorSozinho(s); return f===1? a : Object.assign({},a,{dano:a.dano*f}); }

// Uniões a meio caminho: a equipe tem um Desperto do par e um monstro da classe do outro Desperto (devolve o Talismã que falta)
function paresPendentes(){ const tem=despertosAtivos(), out=[];
  for(const u of PD().unioes) for(const [x,y] of [[u.a,u.b],[u.b,u.a]]){ if(!tem.has(x)||tem.has(y)) continue; const d=PD().despertos.find(k=>k.nome===y);
    if(d&&ativos().some(s=>L(s).classe===d.classe)) out.push({talisma:d.talisma,uniao:u.nome}); }
  return out; }

// ---------------------------------------------------------------- comportamentos dos Despertos (rodam junto com o poder, quando ele dispara)
const _P=(s,a,el,cor,dano,extra)=>Object.assign({fonte:FONTE,x:s.x,y:s.y,dano,el,cor,vida:1.3,perf:1,r:2},extra);
function puxar(cx,cy,r,forca){ for(const e of J.inimigos){ if(e.hp<=0||e.chefe) continue; const dx=cx-e.x, dy=cy-e.y, d=Math.hypot(dx,dy)||1; if(d<r&&d>4){ e.x+=dx/d*forca; e.y+=dy/d*forca; } } }
const COMPORTAMENTO={
  guardiao:{ b(s,a,el){ const v=(J.danoRec||0)*0.25; if(v>0){ vfxOnda(s,el,40); emArea(s.x,s.y,40,e=>ferir(e,v,el)); } },
             h1(s,a,el){ let n=0; for(const e of J.inimigos){ if(e.hp<=0||e.chefe||dist2(e,s)>70*70) continue; const dx=s.x-e.x, dy=s.y-e.y, d=Math.hypot(dx,dy)||1; e.x+=dx/d*10; e.y+=dy/d*10; if(++n>=10) break; } curar(J.vidaMax*0.003*n); },
             h2(s,a,el){ vfxOnda(s,el,47); emArea(s.x,s.y,47,e=>{ ferir(e,a.dano*0.6,el); const dx=e.x-s.x, dy=e.y-s.y, d=Math.hypot(dx,dy)||1; e.x+=dx/d*8; e.y+=dy/d*8; }); } },
  guerreiro:{ b(s,a,el){ puxar(s.x,s.y,44,6); emArea(s.x,s.y,28,e=>ferir(e,a.dano*0.4,el)); },
              h1(s,a,el){ for(const f of [0.5,1]) agendar(0.15*f,()=>{ if(!J) return; vfxOnda(s,el,22); emArea(s.x,s.y,22,e=>ferir(e,a.dano*0.8,el)); }); },
              h2(s,a,el){ s.berserk=6; } },
  assassino:{ b(s,a,el,cor){ for(let i=0;i<2;i++){ const e=maisProximo(s,110,o=>Math.random()<0.7); if(!e) break; const g=Math.atan2(e.y-s.y,e.x-s.x)+(i?0.4:-0.4); J.proj.push(_P(s,a,el,cor,a.dano*0.7,{vx:Math.cos(g)*180,vy:Math.sin(g)*180,ric:2,perf:2})); } },
              h1(s,a,el){ const vistos=new Set(); for(let i=0;i<3;i++){ const e=maisProximo(s,60,o=>!vistos.has(o)); if(!e) break; vistos.add(e); vfxX(e,el); ferir(e,a.dano,el); } },
              h2(s,a){ let n=0; for(const e of J.inimigos){ if(e.hp<=0||dist2(e,s)>60*60) continue; e.marca=Math.max(e.marca||0,a.dano*1.5); if(++n>=3) break; } } },
  cacador:{ b(s,a,el){ const e=maisProximo(s,140); if(e) agendar(0.35,()=>{ if(!J) return; vfxOnda(e,el,18); emArea(e.x,e.y,18,o=>ferir(o,a.dano*0.5,el)); }); },
            h1(s,a,el,cor){ for(let i=0;i<8;i++){ const g=i/8*Math.PI*2+J.t; J.proj.push(_P(s,a,el,cor,a.dano*0.5,{vx:Math.cos(g)*150,vy:Math.sin(g)*150})); } },
            h2(s,a,el,cor){ J.armadilhas.push({fonte:FONTE,x:s.x+rnd(-30,30),y:s.y+rnd(-30,30),dano:a.dano*3,el,cor,raiz:false,vida:12}); } },
  mago:{ b(s,a,el,cor){ for(let i=0;i<2;i++){ const e=maisProximo(s,130); if(!e) break; J.proj.push(_P(s,a,el,cor,a.dano*0.6,{alvo:e,vel:110,vida:2.2,r:3,explode:16})); } },
         h1(s,a,el){ const p=pontoDenso(s,150); if(p) agendar(0.3,()=>{ if(!J) return; vfxOnda(p,el,30); emArea(p.x,p.y,30,o=>ferir(o,a.dano*1.2,el)); }); },
         h2(s,a,el){ const P=J.jogador; vfxSelo(P.x,P.y,el,35); emArea(P.x,P.y,35,o=>{ ferir(o,a.dano*0.5,el); if(!o.status) o.status={el,t:J.t}; }); } },
  invocador:{ b(){ const P=J.jogador; for(const g of J.gemas){ if(dist2(g,P)<90*90){ g.vx+=(P.x-g.x)*0.8; g.vy+=(P.y-g.y)*0.8; } } },
              h1(s,a,el,cor){ J.crias.push({fonte:FONTE,x:s.x+rnd(-6,6),y:s.y+rnd(-6,6),dano:a.dano*0.7,el,cor,vida:7,cd:0}); },
              h2(s,a,el,cor){ const p=pontoDenso(s,150)||s; for(let i=0;i<2;i++) J.crias.push({fonte:FONTE,x:p.x+rnd(-10,10),y:p.y+rnd(-10,10),dano:a.dano*0.6,el,cor,vida:8,cd:0}); } },
  mistico:{ b(s,a,el){ const vistos=new Set(); let o=maisProximo(s,110); for(let i=0;i<2&&o;i++){ vistos.add(o); const n=maisProximo(o,60,x=>!vistos.has(x)); if(!n) break; vfxFeixe(o,n,el); ferir(n,a.dano*0.7,el); o=n; } curar(J.vidaMax*0.01); },
            h1(s,a,el){ const P=J.jogador; emArea(P.x,P.y,40,o=>{ o.lenta=Math.max(o.lenta||0,2); }); vfxSelo(P.x,P.y,"natureza",40); },
            h2(){ } },
  xama:{ b(s){ const t=J.totens.filter(x=>x.dono===s).pop(); if(t) puxar(t.x,t.y,50,4); },
         h1(){ J.cantoGuerra=4; },
         h2(s,a,el){ const P=J.jogador; for(const g of J.gemas) if(dist2(g,P)<110*110){ g.vx+=(P.x-g.x)*0.8; g.vy+=(P.y-g.y)*0.8; } const p=pontoDenso(s,120); if(p) for(let i=0;i<4;i++) aplicarElementoNoSolo(p.x+rnd(-10,10),p.y+rnd(-10,10),el); } } };
function aoDisparar(s,k,a,el,cor){ if(!(s.desp&&s.desp[k])) return; const f=(COMPORTAMENTO[L(s).classe]||{})[k]; if(f) try{ f(s,atribPoder(a,s,k),el,cor); }catch(err){} }
// efeitos contínuos: Fênix, Fúria Berserker, Canto de Guerra e as Uniões
function atualizarArvore(dt){ if(!J) return; J.danoRec=Math.max(0,(J.danoRec||0)-(J.danoRec||0)*dt/3); if(J.cantoGuerra>0) J.cantoGuerra-=dt;
  for(const s of ativos()){ if(s.berserk>0) s.berserk-=dt;
    if(s.desp&&s.desp.h2&&L(s).classe==="mistico"&&J.vida<J.vidaMax*0.25&&(J.fenix||0)<2){ J.fenix=(J.fenix||0)+1; J.vida=Math.max(J.vida,J.vidaMax*0.6); luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",90,0.7);
      emArea(J.jogador.x,J.jogador.y,60,o=>ferir(o,atrib(s).dano*3,"luz")); texto(J.jogador.x,J.jogador.y-24,"Fênix!","#ffd34a",20); if((R.unioes||[]).includes("Égide da Fênix")) J.escudo=(J.escudo||0)+J.vidaMax*0.3; } }
  const U=R.unioes||[]; if(!U.length) return; J.tUniao=(J.tUniao||0)-dt; if(J.tUniao>0) return; J.tUniao=3; const P=J.jogador, a0=ativos()[0]; if(!a0) return; const d0=atrib(a0).dano;
  if(U.includes("Santuário")) curar(J.vidaMax*0.02);
  if(U.includes("Chuva de Estrelas")) for(let i=0;i<12;i++){ const g=i/12*Math.PI*2; J.proj.push({fonte:"combinado",x:P.x,y:P.y,vx:Math.cos(g)*160,vy:Math.sin(g)*160,dano:d0*0.6,el:"luz",cor:"#fff3c4",vida:1.2,perf:2,r:2}); }
  if(U.includes("Círculo Primordial")){ const p=pontoDenso(P,140); const els=[...new Set(ativos().map(elementoDe))]; if(p&&els.length>=2){ emArea(p.x,p.y,30,o=>{ o.status={el:els[0],t:J.t}; ferir(o,d0*0.8,els[1]); }); vfxSelo(p.x,p.y,els[0],30); } }
  if(U.includes("Estouro da Manada")) for(let i=0;i<3;i++) J.crias.push({fonte:"combinado",x:P.x+rnd(-10,10),y:P.y+rnd(-10,10),dano:d0*0.6,el:elementoDe(a0),cor:COR[elementoDe(a0)],vida:5,cd:0}); }

// ================================================================ conquistas: eventos, Insígnias, Ladrilhos dos murais e Lendas
// Conquistas de mapa contam dentro de uma visita ao mapa (J.cont); as globais somam entre runs (META.cont).
const CONQ=()=>D.conquistas;
function metaConq(){ META.conq=META.conq||{}; META.cont=META.cont||{}; META.talismas=META.talismas||[]; META.lendas=META.lendas||[]; return META; }
function evento(nome,n){ if(!J||SIM.ativo&&!SIM.conquistas) return; n=n||1; metaConq(); J.cont=J.cont||{};
  J.cont[nome]=(J.cont[nome]||0)+n; META.cont[nome]=(META.cont[nome]||0)+n;
  if(nome.startsWith("quebra:")){ META.cont.quebra=(META.cont.quebra||0)+n; checarGlobais("quebra"); }
  for(const c of CONQ()){ if(META.conq[c.id]||c.evento!==nome) continue;
    if(c.categoria==="mapa"){ if(c.universo===R.universo&&J.cont[nome]>=c.n) conceder(c); }
    else if(META.cont[nome]>=c.n) conceder(c); } }
function checarGlobais(nome){ for(const c of CONQ()) if(!META.conq[c.id]&&c.categoria!=="mapa"&&c.evento===nome&&(META.cont[nome]||0)>=c.n) conceder(c); }
function conceder(c){ const M=metaConq(); if(M.conq[c.id]) return; M.conq[c.id]=Date.now(); M.essencia+=c.essencia; if(!M.modUsado) PLAT.conquista(c.id);   // save mexido no modo moderador não gera conquista na Steam
  if(c.talisma&&!M.talismas.includes(c.talisma)) M.talismas.push(c.talisma);
  const rot={bronze:"Insígnia de bronze",prata:"Insígnia de prata",ouro:"Insígnia de ouro",secreta:"Insígnia secreta"}[c.insignia];
  avisoConquista(`${c.secreta?"Segredo descoberto":"Conquista"}: ${c.nome}`, `${rot} · +${c.essencia} de Essência${c.talisma?` · Talismã liberado: ${D.poderes.talismas[c.talisma].nome}`:""}${c.ladrilho!=null?" · Ladrilho do mural":""}`);
  if(c.categoria==="mapa"){ const u=c.universo, todas=CONQ().filter(x=>x.universo===u); if(todas.every(x=>M.conq[x.id])&&!M.lendas.includes(u)){ M.lendas.push(u);
      const l=D.lendas.find(x=>x.universo===u); avisoConquista(`Lenda liberada: ${l.nome}`,`O mural de ${UNIV[u].nome} está completo. Escolha a Lenda no início da próxima run.`); M.cont.lenda=(M.cont.lenda||0)+1; checarGlobais("lenda"); } }
  if(typeof gravar==="function") gravar(); }
function avisoConquista(txt,sub){ J&&(J.conqFila=J.conqFila||[]).push({txt,sub}); if(!J) toast(txt); }
function atualizarConquistas(dt){ if(!J) return; if(J.conqAtual){ J.conqAtual.vida-=dt; if(J.conqAtual.vida<=0) J.conqAtual=null; } else if(J.conqFila&&J.conqFila.length){ J.conqAtual=Object.assign(J.conqFila.shift(),{vida:3}); } }
function desenharConquista(){ const c=J&&J.conqAtual; if(!c) return; const a=Math.min(1,c.vida*2, (3-c.vida)*3), w=Math.min(W*0.9,460), x=(W-w)/2, y=Math.round(H*0.2);
  ctx.globalAlpha=a; ctx.fillStyle="rgba(18,14,26,.92)"; ctx.fillRect(x,y,w,52); ctx.strokeStyle="#d6ab4f"; ctx.lineWidth=2; ctx.strokeRect(x+1,y+1,w-2,50); ctx.lineWidth=1;
  ctx.textAlign="center"; ctx.font=`600 15px "Nunito", system-ui, sans-serif`; ctx.fillStyle="#ffd34a"; ctx.fillText(c.txt,W/2,y+21); ctx.font=`12px "Nunito", system-ui, sans-serif`; ctx.fillStyle="#f2e7c9"; ctx.fillText(c.sub,W/2,y+40); ctx.globalAlpha=1; }
// eventos que dependem do fim da luta
function eventosVitoria(e){ conferirProvacoes(e); evento("chefe"); if(!J.atingidoNoChefe) evento("chefe_intocado");
  const u=UNIV[R.universo]; if(ativos().filter(s=>elementoDe(s)===u.elemento).length>=2) evento("chefe_mesmo_el"); if(e.eraChefe) evento("guardiao"); }
// ---------------------------------------------------------------- tela de conquistas e murais
function telaConquistas(){ metaConq(); $("telaMenu").classList.remove("ativa"); const tot=CONQ().length, feitas=Object.keys(META.conq).length;
  const cartas=[{titulo:`Insígnias: ${feitas}/${tot}`, texto:`Lendas liberadas: ${META.lendas.length}/34 · Talismãs liberados: ${6+META.talismas.length}/12`, manter:true, acao:()=>telaGlobais()}];
  for(const u of D.universos){ const cs=CONQ().filter(c=>c.universo===u.id), n=cs.filter(c=>META.conq[c.id]).length, l=D.lendas.find(x=>x.universo===u.id);
    cartas.push({titulo:u.nome.split(",")[0], raridade:n===6?"lendario":n>=3?"epico":"comum", sprite:muralSprite(u.id,n), manter:true, texto:`Mural ${n}/6 · Lenda: ${n===6?l.nome:"???"}`, acao:()=>telaMural(u.id)}); }
  cartas.splice(1,0,{titulo:`Panteão: ${(META.deuses||[]).length}/${D.panteao.length}`, raridade:"lendario", texto:"Deuses e o rei-herói Leônidas. Cada um abre uma Provação quando o mural do seu mapa fica completo.", manter:true, acao:()=>telaPanteao()});
  cartas.push({titulo:"Voltar", texto:"", acao:()=>menu()});
  mostrarCartas("Conquistas e Lendas","Cada conquista de mapa dá um Ladrilho. Os 6 Ladrilhos montam o retrato da Lenda do universo.",cartas,{grade:true}); }
function telaMural(uid){ const u=UNIV[uid], l=D.lendas.find(x=>x.universo===uid);
  const cartas=CONQ().filter(c=>c.universo===uid).map(c=>{ const ok=!!META.conq[c.id]; return {titulo:ok||!c.secreta?c.nome:"???", sprite:insigniaSprite(c,ok), suave:true, raridade:ok?{bronze:"incomum",prata:"raro",ouro:"epico",secreta:"lendario"}[c.insignia]:"comum", manter:true,
    texto:ok? `✓ ${c.texto}` : c.secreta? "Conquista secreta. O Cronista conta uma charada a cada mapa vencido." : c.texto, acao:()=>{}}; });
  const livre=META.lendas.includes(uid);
  cartas.unshift({titulo:livre?l.nome:"Lenda escondida", suave:!!folhaArte(`arte/lendas/${l.id}__retrato.png`), sprite:muralSprite(uid,cartas.filter(c=>c.titulo!=="???"&&c.texto.startsWith("✓")).length), raridade:livre?"lendario":"comum", manter:true,
    texto:livre?`${NOME_EL(l.elementos[0])} e ${NOME_EL(l.elementos[1])} · Poder: ${l.poder.nome} · Passiva: ${l.passiva.nome}`:"Complete as 6 conquistas deste mapa para revelar quem é.", acao:()=>{}});
  cartas.push({titulo:"Voltar", texto:"", acao:()=>telaConquistas()});
  mostrarCartas(u.nome, "Mural de Ladrilhos", cartas); }
function telaGlobais(){ const cartas=CONQ().filter(c=>c.categoria!=="mapa").map(c=>{ const ok=!!META.conq[c.id]; return {titulo:ok||!c.secreta?c.nome:"???", sprite:insigniaSprite(c,ok), suave:true, manter:true, raridade:ok?"epico":"comum",
    texto:ok?`✓ ${c.texto}${c.talisma?` · liberou ${D.poderes.talismas[c.talisma].nome}`:""}`:(c.secreta?"Segredo.":c.texto+(c.talisma?` · libera ${D.poderes.talismas[c.talisma].nome}`:"")), acao:()=>{}}; });
  cartas.push({titulo:"Voltar", texto:"", acao:()=>telaConquistas()}); mostrarCartas("Insígnias","Jornada, Grimório e Segredos",cartas,{grade:true}); }
// mural: o retrato da Lenda (arte/lendas/<id>__retrato.png, cortado em 2x3) com os ladrilhos ainda não conquistados cobertos
function muralSprite(uid,n){ const l=D.lendas.find(x=>x.universo===uid), c=document.createElement("canvas"); c.width=24; c.height=36; const g=c.getContext("2d"), img=folhaArte(`arte/lendas/${l.id}__retrato.png`);
  for(let i=0;i<6;i++){ const x=(i%2)*12, y=Math.floor(i/2)*12; if(i<n){ if(img){ g.imageSmoothingEnabled=false; g.drawImage(img,(i%2)*img.width/2,Math.floor(i/2)*img.height/3,img.width/2,img.height/3,x,y,12,12); } else { g.fillStyle=COR[l.elementos[i%2]]; g.fillRect(x+1,y+1,10,10); g.fillStyle="#fff3c4"; g.fillRect(x+5,y+5,2,2); } }
    else { g.fillStyle="#2a2433"; g.fillRect(x+1,y+1,10,10); g.fillStyle="#3a3446"; g.fillRect(x+1,y+1,10,1); } }
  return c; }

// ================================================================ Lendas jogáveis: poder próprio (até o nível 5) e passiva
const LENDA=()=>R&&R.lenda? (D.lendas.find(l=>l.id===R.lenda)||D.panteao.find(p=>p.id===R.lenda)) : null;
function passiva(ef){ const l=LENDA(); return l&&l.passiva.efeito===ef? l.passiva.valor : 0; }
function custo(ef){ const l=LENDA(); return l&&l.passiva.custo&&l.passiva.custo[ef]||0; }
function telaInvocador(pacto,id){ metaConq(); const livres=[...D.panteao.filter(g=>(META.deuses||[]).includes(g.id)), ...D.lendas.filter(l=>META.lendas.includes(l.universo))];
  if(!livres.length){ novaRun(pacto,id); salvarRun(); iniciarMapa(); return; }
  const ir=lid=>{ novaRun(pacto,id); R.lenda=lid; R.lendaNv=lid?1:0; salvarRun(); iniciarMapa(); };
  mostrarCartas("Quem comanda a equipe?","As Lendas trazem um poder próprio e uma passiva.",[{titulo:"Invocador", texto:"O Invocador de sempre.", acao:()=>ir(null)},
    ...livres.map(l=>({titulo:l.nome, raridade:"lendario", texto:`${NOME_EL(l.elementos[0])} e ${NOME_EL(l.elementos[1])} · ${l.poder.nome} · ${l.dom?`Dom: ${l.dom.nome} · Fardo: ${l.fardo}`:l.passiva.nome}`, acao:()=>ir(l.id)}))]); }
function cartaLenda(){ const l=LENDA(); if(!l||(R.lendaNv||1)>=5||Math.random()>0.3) return null;
  return {titulo:`${l.poder.nome} ${R.lendaNv} → ${R.lendaNv+1}`, raridade:"lendario", texto:`Poder da Lenda (${TIPOS_LENDA_TXT[l.poder.tipo]||""}): +25% de dano e −5% de recarga.`, acao:()=>{ R.lendaNv++; proximaEscolha(); }}; }
const TIPOS_LENDA_TXT={orbita:"gira em volta",projetil:"arremesso",onda:"onda de choque",invocar:"aliados",raio:"raio em cadeia",barril:"explosivo",investida:"avanço",area:"zona no chão",drenar:"rouba vida",dardos:"disparos rápidos"};
function atualizarLenda(dt){ const l=LENDA(); if(!l||!J||J.fim) return; if(J.lendaPose){ J.lendaPose.t+=dt; if(J.lendaPose.t>=J.lendaPose.dur) J.lendaPose=null; } atualizarDom(dt); const p=l.poder, nv=R.lendaNv||1, P=J.jogador, el=l.elementos[0], el2=l.elementos[1], cor=COR[el];
  const base=(ativos().reduce((t,s)=>t+atrib(s).dano,0)/Math.max(1,ativos().length))*p.dano*(1+0.25*(nv-1))*(1+custo("dano_dia")*(UNIV[R.universo].luz&&!UNIV[R.universo].luz.noite?1:0));
  if(p.tipo==="orbita"){ J.lendaAng=(J.lendaAng||0)+dt*3.2; J.lendaHit=(J.lendaHit||0)-dt; if(J.lendaHit<=0){ J.lendaHit=p.cd; FONTE="lenda"; J.lendaGiros=(J.lendaGiros||0)+1; if(J.lendaGiros%8===1&&!J.lendaPose) J.lendaPose={t:0,dur:0.5};
      for(let i=0;i<p.n;i++){ const a=J.lendaAng+i/p.n*Math.PI*2, x=P.x+Math.cos(a)*p.r, y=P.y+Math.sin(a)*p.r*0.8; emArea(x,y,12,e=>ferir(e,base,i%2?el2:el)); } }
    if(!J.lendaVfx){ J.lendaVfx=vfx({max:1e9,desenhar(ox,oy){ const v=VFX_EL[el]||VFX_EL.luz; for(let i=0;i<p.n;i++){ const a=J.lendaAng+i/p.n*Math.PI*2, x=P.x+Math.cos(a)*p.r-ox, y=P.y+Math.sin(a)*p.r*0.8-oy;
        lg.globalAlpha=0.9; lg.fillStyle=v.c1; lg.fillRect(Math.round(x)-1,Math.round(y)-3,2,6); lg.fillStyle="#ffffff"; lg.fillRect(Math.round(x),Math.round(y)-3,1,2); lg.globalAlpha=0.3; lg.fillStyle=v.c2; lg.fillRect(Math.round(x)-2,Math.round(y)-4,4,8); } }}); }
    return; }
  J.lendaCd=(J.lendaCd??1)-dt; if(J.lendaCd>0) return; J.lendaCd=p.cd*(1-0.05*(nv-1)); FONTE="lenda"; if(!J.lendaPose) J.lendaPose={t:0,dur:0.5};
  const alvo=maisProximo(P,150), denso=pontoDenso(P,150)||alvo;
  switch(p.tipo){
    case "projetil": for(let i=0;i<p.n;i++){ const e=maisProximo(P,160,o=>Math.random()<0.6)||alvo; if(!e) break; const a=Math.atan2(e.y-P.y,e.x-P.x)+(i-(p.n-1)/2)*0.2;
        const pr={fonte:FONTE,x:P.x,y:P.y,vx:Math.cos(a)*170,vy:Math.sin(a)*170,dano:base,el:i%2?el2:el,cor,vida:p.volta?1.4:1.1,perf:p.perf,r:3}; J.proj.push(pr);
        if(p.volta) agendar(0.6,()=>{ pr.vx*=-1; pr.vy*=-1; pr.ja=new Set(); }); } break;
    case "dardos": for(let i=0;i<p.n;i++){ const e=maisProximo(P,150,o=>Math.random()<0.7)||alvo; if(!e) break; const a=Math.atan2(e.y-P.y,e.x-P.x); J.proj.push({fonte:FONTE,x:P.x,y:P.y,vx:Math.cos(a)*220,vy:Math.sin(a)*220,dano:base,el:i%2?el2:el,cor,vida:0.9,perf:1,r:2});
        if(p.encanta) e.lenta=Math.max(e.lenta||0,1.5); } break;
    case "onda": vfxOnda(P,el,p.r); emArea(P.x,P.y,p.r,e=>{ ferir(e,base,el); const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(!e.chefe){ e.x+=dx/d*10; e.y+=dy/d*10; } }); tremor(2); break;
    case "invocar": for(let i=0;i<p.n;i++) J.crias.push({fonte:FONTE,x:P.x+rnd(-12,12),y:P.y+rnd(-12,12),dano:base,el:i%2?el2:el,cor,vida:p.vida,cd:0}); vfxSelo(P.x,P.y,el,14); break;
    case "raio": { let o=P; const vistos=new Set(); for(let i=0;i<p.saltos;i++){ const e=maisProximo(o,i?70:150,x=>!vistos.has(x)); if(!e) break; vistos.add(e); vfxFeixe(o,e,el2||el); ferir(e,base*(1-i*0.1),"raio"); o=e; } break; }
    case "barril": if(denso){ const x=denso.x, y=denso.y; perigo({tipo:"circ",x,y,r:p.r,t:0.5,cor,fim:()=>{ vfxOnda({x,y},"fogo",p.r); particulasEl(x,y,"fogo",14,90); luzFlash(x,y,"#ffb060",60,0.4); emArea(x,y,p.r,e=>{ if(!e.ehProp) ferir(e,base,"fogo"); }); tremor(3); }, aliado:true}); } break;
    case "investida": { const mira=denso||alvo; const a=mira? Math.atan2(mira.y-P.y,mira.x-P.x) : Math.atan2(J.pvy||J.dir.y||0.01,J.pvx||J.dir.x||1); /* avança na direção da horda */ for(let k=1;k<=5;k++){ const x=P.x+Math.cos(a)*k*14, y=P.y+Math.sin(a)*k*14; emArea(x,y,12,e=>ferir(e,base,k%2?el:el2)); particulasEl(x,y,el,3,40); } vfxCorte(P,el,40); break; }
    case "area": if(denso){ vfxSelo(denso.x,denso.y,el,p.r); emArea(denso.x,denso.y,p.r,e=>{ ferir(e,base,el); if(p.prende) e.lenta=Math.max(e.lenta||0,2); }); if(p.cura) curar(J.vidaMax*p.cura); if(p.solo) pintarSolo(denso.x,denso.y,p.r*0.6,p.solo,10); } break;
    case "drenar": { let n=0; for(let i=0;i<p.n;i++){ const e=maisProximo(P,120,o=>Math.random()<0.7); if(!e) break; ferir(e,base,el); vfxFeixe(P,e,"sombra"); n++; } curar(J.vidaMax*0.01*n); break; }
  } }
// passivas que dependem de eventos
function lendaAoIniciarMapa(){ const l=LENDA(); if(!l) return; const v=passiva("vida")+custo("vida"); if(v){ J.vidaMax*=1+v; J.vida=Math.min(J.vidaMax,J.vida*(1+v)); } J.escudoGolpes=passiva("escudo_golpes"); }
function lendaReviver(){ const v=passiva("revive"); if(v&&!R.lendaReviveu){ R.lendaReviveu=true; J.vida=J.vidaMax*v; J.invuln=2; luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",90,0.7); texto(J.jogador.x,J.jogador.y-24,`${LENDA().passiva.nome}!`,"#ffd34a",18); return true; } return false; }
function multDanoLenda(e){ let f=1; if(e.chefe||e.mini) f*=1+passiva("dano_chefe"); if(J.vida<J.vidaMax*0.4) f*=1+passiva("dano_baixa_vida"); f*=1+passiva("dano_por_elo")*(R.elos?R.elos.length:0);
  if(passiva("dano_serpentes")&&e.def&&(e.def.corpo==="serpente"||e.def.corpo==="bipede")) f*=1+passiva("dano_serpentes"); return f; }
// a Lenda (ou o deus) anda junto com a equipe, na posição do jogador. Folha 6x3 (arte/lendas/<id>.png ou arte/panteao/<id>.png):
// linha 1 parado (4), linha 2 andando (6), linha 3 lançando o poder ou o Dom Divino (6). Sem a folha, uma figura animada por código.
function desenharLenda(ox,oy){ const l=LENDA(); if(!l||!J) return; const P=J.jogador, x=Math.round(P.x-ox-10), y=Math.round(P.y-oy+2), img=folhaArte(l.dom?`arte/panteao/${l.id}.png`:`arte/lendas/${l.id}.png`);
  const andando=Math.hypot(J.pvx||0,J.pvy||0)>5, pose=J.lendaPose, lancando=!!pose, dom=!!(pose&&pose.dom), esq=(J.pvx||0)<-1;
  lg.fillStyle="rgba(0,0,0,.3)"; lg.beginPath(); lg.ellipse(x,y+1,6,2,0,0,Math.PI*2); lg.fill();
  if(img&&fatiarFolha(img,6,3).valida){ const f=fatiarFolha(img,6,3); let lin=lancando?2:andando?1:0; if(f.linhas[lin].qs.length<1) lin=0; const n=f.linhas[lin].qs.length;
    const q=lin===2? Math.min(n-1,Math.floor(pose.t/pose.dur*n)) : Math.floor(J.t*(lin===1?10:6))%n, s=quadroAnim(img,lin,q,30);
    if(s){ const resp=lin===0? 1+0.012*Math.sin(J.t*2.4) : 1; lg.save(); lg.translate(x,y+1); lg.rotate(Math.max(-0.08,Math.min(0.08,(J.pvx||0)/400))); lg.scale(esq?-1:1,resp); desenharSprite(s,-s.width/2,-s._pe,s.width,s.height); lg.restore(); return; } }
  // figura por código: respiração, passos, capa balançando e braço erguido ao lançar
  const c1=COR[l.elementos[0]], c2=COR[l.elementos[1]], t=J.t, passo=andando?Math.sin(t*14):0, resp=andando?0:Math.round(Math.sin(t*3)*0.6), lev=(lancando||dom)?1:0, s=esq?-1:1, X=v=>x+v*s;
  lg.fillStyle=tom(c2,0.55); const capa=Math.round(Math.sin(t*(andando?10:3))*1.5); lg.fillRect(Math.min(X(-3),X(-3-capa)),y-10+resp,3,9);
  lg.fillStyle="#2a2433"; lg.fillRect(X(-2)-(s<0?1:0),y-3,2,3+Math.round(passo)); lg.fillRect(X(1)-(s<0?1:0),y-3,2,3-Math.round(passo));
  lg.fillStyle=c1; lg.fillRect(x-3,y-10+resp,6,7); lg.fillStyle=tom(c1,1.3); lg.fillRect(x-3,y-10+resp,6,1);
  lg.fillStyle="#f0d8b8"; lg.fillRect(x-2,y-14+resp,4,4); lg.fillStyle=c2; lg.fillRect(x-2,y-15+resp,4,1); if(l.dom){ lg.fillStyle="#ffd34a"; lg.fillRect(x-2,y-16+resp,1,1); lg.fillRect(x,y-17+resp,1,2); lg.fillRect(x+1,y-16+resp,1,1); }
  lg.fillStyle="#f0d8b8"; if(lev){ lg.fillRect(X(3),y-15,1,5); lg.globalAlpha=0.5+0.5*Math.sin(t*20); lg.fillStyle=c2; lg.fillRect(X(3)-1,y-18,3,3); lg.globalAlpha=1; } else lg.fillRect(X(3),y-9+resp+Math.round(passo*0.5),1,4); }

// ================================================================ Panteão: deuses jogáveis (Dom Divino, Fardo e Provação)
const DEUS=()=>R&&R.lenda? D.panteao.find(p=>p.id===R.lenda) : null;
function metaDeuses(){ metaConq(); META.deuses=META.deuses||[]; return META.deuses; }
// Dom Divino: golpe final com recarga longa, lançado sozinho quando a tela enche ou quando o chefe está vivo
function atualizarDom(dt){ const g=DEUS(); if(!g||!J||J.fim) return;
  for(const e of J.inimigos) if(e.estatuaT>0){ e.estatuaT-=dt; if(e.estatuaT<=0){ e.estatua=false; particulas(e.x,e.y,"#a8a090",6,40); } }   /* a pedra da Égide dura 3 s */ const d=g.dom; J.domCd=(J.domCd??d.cd*0.5)-dt; if(J.domCd>0) return;
  const P=J.jogador, tela=J.inimigos.filter(e=>e.hp>0&&Math.abs(e.x-P.x)<VW/2&&Math.abs(e.y-P.y)<VH/2);
  if(tela.length<12&&!(J.chefeVivo&&J.chefeVivo.hp>0)) return; J.domCd=d.cd; FONTE="lenda";
  const base=(ativos().reduce((t,s)=>t+atrib(s).dano,0)/Math.max(1,ativos().length))*(1+0.25*((R.lendaNv||1)-1)), el=g.elementos[0], el2=g.elementos[1];
  J.lendaPose={t:0,dur:0.6,dom:true}; avisar(d.nome, g.nome, COR[el]); luzFlash(P.x,P.y,VFX_EL[el].c1,140,0.8); tremor(8); parar(0.08);
  const fortes=()=>tela.filter(e=>e.hp>0).sort((a,b)=>b.hp-a.hp);
  switch(d.tipo){
    case "raios": fortes().slice(0,d.n).forEach((e,i)=>agendar(i*0.12,()=>{ if(!J||e.hp<=0) return; vfxFeixe({x:e.x,y:e.y-120},e,"raio"); ferir(e,base*d.dano,"raio"); particulasEl(e.x,e.y,"raio",10,90); })); break;
    case "martelo": for(const e of tela) if(Math.hypot(e.x-P.x,e.y-P.y)<d.r){ vfxFeixe(P,e,"raio"); ferir(e,base*d.dano,"raio"); } vfxOnda(P,"raio",d.r); break;
    case "lanca": { const alvo=fortes()[0]; if(!alvo) break; const a=Math.atan2(alvo.y-P.y,alvo.x-P.x); for(let k=1;k<=14;k++){ const x=P.x+Math.cos(a)*k*16, y=P.y+Math.sin(a)*k*16; emArea(x,y,14,e=>ferir(e,base*d.dano/3,k%2?el:el2)); particulasEl(x,y,el,2,30); } vfxCorte(P,el,60); break; }
    case "caos": for(const e of tela) if(Math.hypot(e.x-P.x,e.y-P.y)<d.r&&!e.chefe){ e.confuso=d.dur; e.lenta=Math.max(e.lenta||0,d.dur); e.vulner=Math.max(e.vulner||0,d.dur); } vfxSelo(P.x,P.y,"sombra",d.r*0.6); break;
    case "submundo": for(let i=0;i<d.n;i++) J.crias.push({fonte:FONTE,x:P.x+rnd(-50,50),y:P.y+rnd(-50,50),dano:base*d.dano,el:"sombra",cor:COR.sombra,vida:d.vida,cd:0}); vfxSelo(P.x,P.y,"sombra",50); break;
    case "egide": J.escudo=(J.escudo||0)+J.vidaMax*d.escudo; for(const e of tela) if(!e.chefe&&Math.hypot(e.x-P.x,e.y-P.y)<d.r){ e.estatua=true; e.estatuaT=3; e.lenta=3; } vfxOnda(P,"luz",d.r); break;
    case "sol": for(const e of tela){ ferir(e,base*d.dano,"fogo"); if(Math.random()<0.3) pintarSolo(e.x,e.y,6,"fogo",4); } break;
    case "julgamento": for(const e of tela){ if(e.chefe||e.mini){ ferir(e,e.max*0.08,"sombra"); continue; } if(e.hp<e.max*d.limite){ ferir(e,e.hp+1,"sombra"); particulasEl(e.x,e.y,"sombra",6,60); } } break;
    case "vida": curar(J.vidaMax*d.cura); J.queima=0; J.atordoa=0; J.lento=0; particulasEl(P.x,P.y,"luz",24,80); break;
    case "rede": { const c=pontoDenso(P,150)||P; for(const e of tela) if(!e.chefe&&Math.hypot(e.x-c.x,e.y-c.y)<d.r){ e.x+=(c.x-e.x)*0.6; e.y+=(c.y-e.y)*0.6; }
      agendar(0.3,()=>{ if(!J) return; vfxOnda(c,"ar",50); emArea(c.x,c.y,50,e=>ferir(e,base*d.dano,"raio")); }); break; }
    case "encanto": { let n=0; for(const e of tela){ if(e.chefe||e.mini||n>=d.n||Math.hypot(e.x-P.x,e.y-P.y)>d.r) continue; n++; J.crias.push({fonte:FONTE,x:e.x,y:e.y,dano:base,el:"luz",cor:COR.luz,vida:10,cd:0}); e.hp=0; e.semCadaver=true; morrer(e); } break; }
    case "diluvio": for(const e of tela){ ferir(e,base*d.dano,"agua"); const dx=e.x-P.x, dy=e.y-P.y, k=Math.hypot(dx,dy)||1; if(!e.chefe){ e.x+=dx/k*24; e.y+=dy/k*24; } } for(let i=0;i<10;i++) pintarSolo(P.x+rnd(-90,90),P.y+rnd(-90,90),8,"agua",8); break;
    case "falange": J.invuln=Math.max(J.invuln,2); for(const e of tela) if(Math.hypot(e.x-P.x,e.y-P.y)<d.r){ const dx=e.x-P.x, dy=e.y-P.y, k=Math.hypot(dx,dy)||1; ferir(e,base*d.dano,"terra"); if(!e.chefe){ e.x+=dx/k*30; e.y+=dy/k*30; } } vfxOnda(P,"terra",d.r); break;
  } }
// Provação: na vitória sobre o chefe, confere as condições de cada deus ainda bloqueado (exige o mural do universo de origem completo)
function conferirProvacoes(e){ if(SIM.ativo&&!SIM.conquistas) return; const ds=metaDeuses(), u=UNIV[R.universo];
  for(const g of D.panteao){ if(ds.includes(g.id)) continue; const pv=g.provacao, q=pv.requisito; if(!META.lendas.includes(pv.universo)) continue;
    if(q.guardiao){ if(!(e.eraChefe&&u.era===UNIV[pv.universo].era)) continue; } else if(R.universo!==pv.universo||e.eraChefe) continue;
    if(q.elemento&&ativos().filter(s=>elementoDe(s)===q.elemento).length<q.n) continue;
    if(q.tempo&&(J.t-J.tChefe)>q.tempo) continue; if(q.intocado&&J.atingidoNoChefe) continue; if(q.sem_esquiva&&J.usouEsquiva) continue;
    if(q.sem_cura&&J.curou) continue; if(q.abates&&(R.abates-(J.abates0||0))<q.abates) continue;
    ds.push(g.id); avisoConquista(`Deus liberado: ${g.nome}`,`Provação cumprida: ${pv.texto}`); if(typeof gravar==="function") gravar(); } }
function telaPanteao(){ const ds=metaDeuses();
  const cartas=D.panteao.map(g=>{ const livre=ds.includes(g.id), aberta=META.lendas.includes(g.provacao.universo);
    return {titulo:livre||aberta?g.nome:"???", raridade:livre?"lendario":aberta?"epico":"comum", manter:true, sprite:folhaArte(`arte/panteao/${g.id}__retrato.png`)&&livre?retratoPequeno(`arte/panteao/${g.id}__retrato.png`):null, suave:true,
      texto: livre? `${NOME_EL(g.elementos[0])} e ${NOME_EL(g.elementos[1])} · ${g.poder.nome} · Dom: ${g.dom.nome} · Fardo: ${g.fardo}`
           : aberta? `Provação: ${g.provacao.texto}.` : `${g.panteao}. Complete o mural de ${UNIV[g.provacao.universo].nome.split(",")[0]} para abrir a Provação.`, acao:()=>{}}; });
  cartas.push({titulo:"Voltar", texto:"", acao:()=>telaConquistas()}); mostrarCartas("Panteão",`Deuses liberados: ${ds.length}/${D.panteao.length}`,cartas); }
function retratoPequeno(caminho){ const img=folhaArte(caminho); if(!img) return null; const c=document.createElement("canvas"); c.width=48; c.height=48; const g=c.getContext("2d"); const s=Math.min(img.width,img.height*0.66); g.drawImage(img,(img.width-s)/2,0,s,s,0,0,48,48); return c; }

// ================================================================ luz: tom de cada universo, crepúsculo do fim do mapa e luzes que vêm dos poderes
function luzFlash(x,y,cor,r,dur){ J.flashes=J.flashes||[]; if(J.flashes.length>40) J.flashes.shift(); J.flashes.push({x,y,cor,r,t:0,max:dur||0.3}); }
function atualizarLuz(dt){ if(J.flashes){ for(const f of J.flashes) f.t+=dt; J.flashes=J.flashes.filter(f=>f.t<f.max); } }
// ---------------------------------------------------------------- escuridão com poças de luz e sombras projetadas
// quanto o mapa escurece: noite bem mais, dia só um pouco; o fim do mapa e o chefe puxam para o crepúsculo
function crepusculo(){ return J.chefeVivo? 1 : Math.max(0,Math.min(1,(J.t-MAPA_SEG*0.6)/(MAPA_SEG*0.4))); }
function nivelEscuro(){ const u=UNIV[R.universo], L=u&&u.luz; const c=crepusculo(); if(!L) return 0.1+c*0.15; return Math.min(0.7,(L.noite?0.48:0.1)+c*(L.noite?0.12:0.2)); }
let LMAP=null, FURO=null;
function desenharMapaLuz(ox,oy){ if(QUAL===0||SIM.ativo||J.escuro>0.05) return; const A=nivelEscuro(); if(A<0.04) return;
  const k=0.25, w=Math.ceil((VW+2)*k), h=Math.ceil((VH+2)*k);
  if(!LMAP){ LMAP=document.createElement("canvas"); FURO=document.createElement("canvas"); FURO.width=FURO.height=64; const fg=FURO.getContext("2d"), gr=fg.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,"rgba(255,255,255,1)"); gr.addColorStop(0.45,"rgba(255,255,255,.7)"); gr.addColorStop(1,"rgba(255,255,255,0)"); fg.fillStyle=gr; fg.fillRect(0,0,64,64); }
  if(LMAP.width!==w||LMAP.height!==h){ LMAP.width=w; LMAP.height=h; }
  const g=LMAP.getContext("2d"), L=(UNIV[R.universo]||{}).luz||{}, c=crepusculo();
  g.globalCompositeOperation="source-over"; g.globalAlpha=1; g.clearRect(0,0,w,h); g.fillStyle=L.noite? "rgba(8,6,22,"+A+")" : c>0.3? "rgba(30,14,26,"+A+")" : "rgba(16,12,28,"+A+")"; g.fillRect(0,0,w,h);
  nuvensEm(g,ox-1,oy-1,k); J._nuvemFeita=true;
  g.globalCompositeOperation="destination-out";
  const furo=(x,y,r,a)=>{ const X=(x-ox+1)*k, Y=(y-oy+1)*k, R2=r*k; if(X<-R2||Y<-R2||X>w+R2||Y>h+R2) return; g.globalAlpha=Math.min(1,a); g.drawImage(FURO,X-R2,Y-R2,R2*2,R2*2); };
  const P=J.jogador; furo(P.x,P.y,78,1); furo(P.x,P.y,40,0.6);
  for(const s of ativos()) if(s.x!=null) furo(s.x,s.y,44,0.75);
  let n=0; for(const p of J.proj){ if(++n>30) break; furo(p.x,p.y,p.alvo||p.explode?26:16,0.55); }
  for(const f of (J.flashes||[])){ const q=f.t/f.max; furo(f.x,f.y,f.r*1.2,(1-q)*0.9); }
  for(const f of J.efeitos){ furo(f.x,f.y,(f.r||20)*1.3,f.vida/f.max*0.6); }
  n=0; for(const g2 of J.gemas){ if(++n>40) break; furo(g2.x,g2.y,7,0.35); }
  for(const b of (J.baus||[])) furo(b.x,b.y,40,0.9);
  for(const m of (J.moedas||[])) furo(m.x,m.y,8,0.5);
  if(J.cena){ for(const p of J.cena.lista){ if(p.morto) continue; if(p.queima>0) furo(p.x,p.y-4,55,0.9); else if(p.tipo==="luz") furo(p.x,p.y-10,70,0.85); else if(p.tipo==="cristal") furo(p.x,p.y-6,26,0.4); }
    let m=0; for(const [key,s2] of J.solo){ if(s2.ate<J.t||(s2.t!=="fogo"&&s2.t!=="eletrico"&&s2.t!=="luz"&&s2.t!=="queimado")) continue; const [cx,cy]=key.split(",").map(Number); if(++m>60) break; furo(cx*CEL+4,cy*CEL+4,s2.t==="queimado"?12:22,s2.t==="queimado"?0.35:0.7); } }
  for(const e of J.inimigos) if((e.chefe||e.mini)&&e.hp>0) furo(e.x,e.y,46,0.55);
  g.globalAlpha=1; g.globalCompositeOperation="source-over";
  const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true; lg.imageSmoothingQuality="low"; lg.drawImage(LMAP,-1,-1,w/k,h/k); lg.imageSmoothingEnabled=suave; lg.imageSmoothingQuality="high"; }
// sombra projetada no chão (luz vinda de cima à esquerda): silhueta escura, achatada e inclinada a partir dos pés
function sombraProjetada(spr,x,yPe,w,h,virar,forca){ if(!spr||QUAL===0||SIM.ativo) return; const A=nivelEscuro(), a=(0.36-A*0.3)*(forca||1); if(a<0.03) return;
  const sil=silhueta(spr,"#05030a"), a0=lg.globalAlpha; lg.save(); lg.globalAlpha=a0*a; lg.translate(x,yPe); lg.transform(1,0,-0.55,-0.36,0,0); if(virar) lg.scale(-1,1);
  lg.drawImage(sil,-w/2,-(spr._pe||spr.height)*h/spr.height,w,h); lg.restore(); lg.globalAlpha=a0; }
// tom ambiente: multiplica a cena pela cor da luz do universo; perto do fim do mapa caminha para o crepúsculo
function desenharLuzAmbiente(ox,oy){ const u=UNIV[R.universo]; if(!u||!u.luz) return; const L=u.luz;
  const crep=J.chefeVivo? 1 : Math.max(0,Math.min(1,(J.t-MAPA_SEG*0.6)/(MAPA_SEG*0.4)));
  const tom=crep>0? mistura(L.tom, L.noite?"#2a1a4a":"#c06a50", crep*0.6) : L.tom, forca=Math.min(0.55,L.forca+crep*(L.noite?0.06:0.16))*(J.escuro>0.05?0.4:1);
  if(forca>0.01){ lg.globalCompositeOperation="multiply"; lg.globalAlpha=forca/0.62; lg.fillStyle=tom; lg.fillRect(-1,-1,VW+2,VH+2); lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }
  // luzes: à noite brilham mais
  const k=0.35+(L.noite?0.65:0)+crep*0.25; if(k<0.3) return; lg.globalCompositeOperation="lighter";
  const luz=(x,y,r,cor,a)=>{ const X=x-ox, Y=y-oy; if(X<-r||Y<-r||X>VW+r||Y>VH+r) return; lg.globalAlpha=Math.min(1,a*k); lg.drawImage(bolhaCor(cor),X-r,Y-r,r*2,r*2); };
  const P=J.jogador; if(L.noite) luz(P.x,P.y,46,"#ffe0b0",0.22);
  for(const s of ativos()) if(s.x!=null) luz(s.x,s.y+2,20,COR[elementoDe(s)]||"#ffffff",0.28);
  if(QUAL===0){ for(const f of (J.flashes||[])){ const q=f.t/f.max; luz(f.x,f.y,f.r*(0.5+q*0.5),f.cor,(1-q)*0.4); } lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; return; }
  let n=0; for(const p of J.proj){ if(++n>24) break; const v=VFX_EL[p.el]||VFX_EL.luz; luz(p.x,p.y,p.alvo||p.explode?14:9,v.c1,0.35); }
  for(const f of (J.flashes||[])){ const q=f.t/f.max; luz(f.x,f.y,f.r*(0.5+q*0.5),f.cor,(1-q)*0.4); }
  if(J.cena){ for(const p of J.cena.lista){ if(p.queima>0) luz(p.x,p.y-4,30,"#ff9a50",0.4); else if(p.tipo==="luz") luz(p.x,p.y-10,36,"#ffc880",0.35); else if(p.tipo==="cristal") luz(p.x,p.y-6,18,J.cena.kit.cristal||"#c8f0ff",0.2); }
    // terreno que brilha: varre no máximo 250 registros por quadro, começando de um ponto que gira (cobre tudo em poucos quadros)
    let m=0, vis=QUAL<2?250:0; for(const [key,s] of J.solo){ if(++vis>250) break; if(s.ate<J.t||(s.t!=="fogo"&&s.t!=="eletrico"&&s.t!=="luz"&&s.t!=="queimado")) continue; const [cx,cy]=key.split(",").map(Number), x=cx*CEL+4, y=cy*CEL+4; if(Math.abs(x-P.x)>VW/2+10||Math.abs(y-P.y)>VH/2+10) continue; if(++m>24) break;
      luz(x,y,s.t==="queimado"?9:14,s.t==="fogo"?"#ff8a3d":s.t==="queimado"?"#ff6a20":s.t==="eletrico"?"#fff3a0":"#fff3c4",s.t==="queimado"?0.12:0.18); }
    let b=0; for(const a of J.cena.ar){ if(a.k!=="brasas"&&a.k!=="vagalumes") continue; if(++b>20) break; luz(a.x,a.y-a.z,5,a.k==="brasas"?"#ff9a50":"#d8ff8a",0.25); } }
  for(const e of J.inimigos) if((e.chefe||e.mini)&&e.hp>0) luz(e.x,e.y-6,30,COR[e.el]||"#ffffff",0.18);
  lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }

// quanto a camada de arte em alta resolução deve escurecer (mesma conta da luz ambiente)
function escurecimentoArte(){ const u=UNIV[R.universo]; if(!u||!u.luz||!J) return null; const L=u.luz; const crep=J.chefeVivo? 1 : Math.max(0,Math.min(1,(J.t-MAPA_SEG*0.6)/(MAPA_SEG*0.4)));
  let forca=Math.min(0.55,L.forca+crep*(L.noite?0.06:0.16))*(J.escuro>0.05?0.4:1); if(typeof passiva==="function"&&passiva("imune_escuro")) forca*=0.4;
  return {cor: tom(crep>0? mistura(L.tom, L.noite?"#2a1a4a":"#c06a50", crep*0.6) : L.tom, 0.35), a: forca*0.75}; }

// ================================================================ arte da interface (pacote prompts/ui): tela inicial, logotipo, ícones de Talismã e Insígnias
const UI_ARQ=n=>folhaArte(`arte/ui/${n}.png`);
// botões desenhados (folhas 1x3: normal, apertado, desativado): cortados em ponta esquerda, faixa, ornamento do meio e ponta direita,
// para esticar na largura do botão sem deformar os enfeites
function recortarBotao(img,row){ const cw=img.width, ch=img.height/3, c=document.createElement("canvas"); c.width=cw; c.height=ch; const g=c.getContext("2d"); g.drawImage(img,0,row*ch,cw,ch,0,0,cw,ch);
  let y0=ch, y1=0; try{ const d=g.getImageData(0,0,cw,ch).data; for(let y=0;y<ch;y++) for(let x=0;x<cw;x++) if(d[(y*cw+x)*4+3]>40){ if(y<y0) y0=y; if(y>y1) y1=y; } }catch(e){ y0=0; y1=ch-1; }
  const h=y1-y0+1, k=cw/128, corte=(x0,x1)=>{ const o=document.createElement("canvas"); o.width=Math.round((x1-x0)*k); o.height=h; o.getContext("2d").drawImage(c,Math.round(x0*k),y0,o.width,h,0,0,o.width,h); return `url(${o.toDataURL()})`; };
  return {esq:corte(0,38), meio:corte(38,46), cen:corte(44,84), dir:corte(90,128)}; }
function aplicarArteBotoes(){ if(document.documentElement.classList.contains("ui-arte")) return; const P=UI_ARQ("ui__botao_primario"), Sx=UI_ARQ("ui__botao_secundario"), A=UI_ARQ("ui__botoes_acao"); if(!P||!Sx) return;
  const st=document.documentElement.style, def=(pref,img)=>[0,1,2].forEach(r=>{ const b=recortarBotao(img,r); for(const k in b) st.setProperty(`--${pref}${r}-${k}`,b[k]); });
  def("bp",P); def("bs",Sx);
  if(A){ const cw=A.width/3, ch=A.height/2; for(let r=0;r<2;r++) for(let i=0;i<3;i++){ const o=document.createElement("canvas"); o.width=cw; o.height=ch; o.getContext("2d").drawImage(A,i*cw,r*ch,cw,ch,0,0,cw,ch); st.setProperty(`--acao${i}-${r}`,`url(${o.toDataURL()})`); } document.documentElement.classList.add("ui-acao"); }
  document.documentElement.classList.add("ui-arte"); }
// menu em camadas (céu, criaturas e o herói na frente): cada uma se move num ritmo e acompanha o dedo, o mouse ou a inclinação do aparelho
function montarParalaxe(m){ const ceu=UI_ARQ("ui__camada_ceu"), cri=UI_ARQ("ui__camada_criaturas"), fr=UI_ARQ("ui__camada_frente"); if(!ceu||!cri||!fr||m.querySelector(".paralaxe")) return false;
  const d=document.createElement("div"); d.className="paralaxe"; d.innerHTML=`<div class="cam ceu" style="background-image:url(${ceu.src})"></div><div class="cam cri" style="background-image:url(${cri.src})"></div><div class="cam brilho"></div><div class="cam fr" style="background-image:url(${fr.src})"></div>`;
  m.prepend(d); m.style.backgroundImage="none"; m.classList.add("com-arte");
  const mover=(x,y)=>{ d.style.setProperty("--px",Math.max(-1,Math.min(1,x)).toFixed(3)); d.style.setProperty("--py",Math.max(-1,Math.min(1,y)).toFixed(3)); };
  addEventListener("pointermove",e=>{ if(m.classList.contains("ativa")) mover(e.clientX/innerWidth*2-1,e.clientY/innerHeight*2-1); },{passive:true});
  addEventListener("deviceorientation",e=>{ if(m.classList.contains("ativa")&&e.gamma!=null) mover(e.gamma/25,(e.beta-45)/25); },{passive:true});
  return true; }
function aplicarArteUI(){ aplicarArteBotoes(); const tela=UI_ARQ("ui__tela_vertical")||UI_ARQ("ui__tela_horizontal"), logo=UI_ARQ("ui__logo"), m=$("telaMenu"); if(!m) return;
  if(m.dataset.arte!=="paralaxe"&&montarParalaxe(m)){ m.dataset.arte="paralaxe"; }
  if(tela&&!m.dataset.arte){ m.dataset.arte="1"; m.style.backgroundImage=`linear-gradient(180deg, rgba(10,8,18,.25) 0%, rgba(10,8,18,0) 30%, rgba(10,8,18,.55) 62%, rgba(10,8,18,.92) 100%), url(${tela.src})`;
    m.style.backgroundSize="cover"; m.style.backgroundPosition="center top"; m.classList.add("com-arte"); }
  if(logo){ const h=m.querySelector("h1"); if(h&&!h.dataset.arte){ h.dataset.arte="1"; h.innerHTML=`<img src="${logo.src}" alt="Elementar" style="width:min(100%,420px);display:block;margin:0 auto;filter:drop-shadow(0 4px 10px rgba(0,0,0,.6))">`; } } }
// ícone de um Talismã (folha 4x3, na ordem de dados/fonte_poderes.py)
function iconeTalisma(id){ const img=folhaArte("arte/ui/talismas.png"); if(!img) return null; const i=Object.keys(D.poderes.talismas).indexOf(id); if(i<0) return null; return celulaArte(img,4,3,i%4,Math.floor(i/4),64,64); }
// Insígnia: moldura do nível (linha 1) com o emblema do tipo de conquista (linha 2); conquistas globais usam a estrela
const EMBLEMA={chefe:0,desafio:1,cenario:2,mestria:3,secreta:4,chamado:5};
function insigniaSprite(c,ok){ const img=folhaArte("arte/ui/insignias.png"); if(!img) return null; const k=`ins|${c.id}|${ok}`; if(cacheArte.has(k)) return cacheArte.get(k);
  const cv=document.createElement("canvas"); cv.width=cv.height=64; const g=cv.getContext("2d"); g.imageSmoothingEnabled=true;
  const quadro={bronze:0,prata:1,ouro:2,secreta:3}[c.insignia]??0, tipo=c.categoria==="mapa"? c.id.split(":")[1] : null;
  g.drawImage(celulaArte(img,6,2,quadro,0,64,64),0,0);
  const em= tipo!=null&&EMBLEMA[tipo]!=null? celulaArte(img,6,2,EMBLEMA[tipo],1,64,64) : celulaArte(img,6,2,5,0,64,64); g.drawImage(em,14,14,36,36);
  if(!ok){ g.globalCompositeOperation="saturation"; g.fillStyle="#808080"; g.fillRect(0,0,64,64); g.globalCompositeOperation="source-over"; g.globalAlpha=0.55; g.fillStyle="#120e1a"; g.fillRect(0,0,64,64); }
  cacheArte.set(k,cv); return cv; }

// ================================================================ criaturas: inimigos comuns, mini-chefes e chefes
// Cada inimigo vem de dados/fonte_combate.py: corpo, jeito de andar, golpe, derrota, mania e detalhes.
// Os sprites são pintados pixel a pixel por tipo de corpo, com quadros de caminhada, ataque, dor e piscada.
// Quando a folha de arte do universo for importada, ela substitui o sprite pintado (mesma ordem de quadros).

const cacheCri=new Map();
function spriteCriatura(def,tam,cor,q,pose,semente){
  const det=def.detalhes||[], k=def.nome+"|"+tam+"|"+cor+"|"+q+"|"+pose+"|"+(semente||0); if(cacheCri.has(k)) return cacheCri.get(k);
  if(cacheCri.size>1400) cacheCri.clear();
  const W=tam+4, H=tam+4, buf=new Array(W*H).fill(null), s=tam, ox=2, oy=2, tem=d=>det.includes(d), u=Math.max(1,s/16);
  const px=(x,y,c)=>{ x=Math.round(x)+ox; y=Math.round(y)+oy; if(x>=0&&y>=0&&x<W&&y<H&&c) buf[y*W+x]=c; };
  const osso=tem("ossos"), band=tem("bandagens");
  const base= osso? "#e2dac6" : band? "#d8ccaa" : cor, cla=tom(base,1.28), esc=tom(base,.62), cont="#140f1c";
  const sombreado=(dx,dy,c)=> (dx+dy<-0.45)? tom(c,1.28) : (dx+dy>0.5)? tom(c,.66) : c;
  const elipse=(cx,cy,rx,ry,c,plano)=>{ for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++) for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){ const dx=(x-cx)/Math.max(.5,rx), dy=(y-cy)/Math.max(.5,ry); if(dx*dx+dy*dy<=1.05) px(x,y,plano?c:sombreado(dx,dy,c)); } };
  const ret=(x,y,w,h,c)=>{ for(let j=0;j<h;j++) for(let i=0;i<w;i++) px(x+i,y+j,c); };
  const linha=(x0,y0,x1,y1,c,g)=>{ const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0))); for(let i=0;i<=n;i++){ const t=i/n, x=x0+(x1-x0)*t, y=y0+(y1-y0)*t; px(x,y,c); if(g>1) px(x,y+1,c); } };
  const fi=q*Math.PI/2, sw=Math.sin(fi), sw2=Math.cos(fi), atk=pose==="atk", dor=pose==="dor", pisc=pose==="pisca", man=pose==="mania";
  const r=semente? semente : 1;
  // pontos de referência para os detalhes: cabeça (hx,hy,hr) e corpo (bx,by,br)
  let hx=s*0.5, hy=s*0.3, hr=s*0.16, bx=s*0.5, by=s*0.58, br=s*0.22, frente=1, boca=null, olhos=[];
  const dd=dor?1:0;
  switch(def.corpo){
    case "humanoide": { const hip=s*0.7+dd, umPe=tem("um_pe"), ab=atk?-1:0;
      if(!tem("cauda")||!tem("flutua")){
        if(umPe){ linha(s*0.5,hip,s*0.5+sw*u,s-1,esc,u); px(s*0.5+sw*u+1,s-1,esc); }
        else if(def.andar!=="flutua"){ linha(s*0.43,hip,s*0.4+sw*1.6*u,s-1,esc,1); linha(s*0.57,hip,s*0.6-sw*1.6*u,s-1,esc,1); if(u>1.2){ linha(s*0.43+1,hip,s*0.4+sw*1.6*u+1,s-1,esc); linha(s*0.57-1,hip,s*0.6-sw*1.6*u-1,s-1,esc); } }
        else { for(let i=0;i<4;i++) linha(s*0.38+i*s*0.08,hip,s*0.36+i*s*0.09+Math.sin(fi+i)*u,s-1-(i%2),tom(base,.8)); } }
      elipse(s*0.5,s*0.54+dd,s*0.19,s*0.19,base); bx=s*0.5; by=s*0.54+dd; br=s*0.19;
      if(!tem("sem_cabeca")){ hx=s*0.52+(atk?u:0); hy=s*0.29+dd; hr=s*0.165; elipse(hx,hy,hr,hr*0.95,osso||band?base:tom(base,1.12)); }
      else { hx=s*0.52; hy=s*0.36; hr=s*0.08; ret(s*0.42,s*0.34,s*0.2,2,"#3a2a2a"); }
      // braços balançando ao contrário das pernas; no ataque, o braço da frente vai à frente
      linha(s*0.32,s*0.47+dd,s*0.28-sw*u,s*0.68+dd,tom(base,.85),1);
      if(atk) linha(s*0.66,s*0.46+dd,s*0.86,s*0.38+dd,tom(base,.95),1); else if(man) linha(s*0.66,s*0.46,s*0.78,s*0.24,tom(base,.95),1); else linha(s*0.68,s*0.47+dd,s*0.72+sw*u,s*0.68+dd,tom(base,.95),1);
      olhos=[[hx+hr*0.15,hy],[hx+hr*0.65,hy]]; boca=[hx+hr*0.45,hy+hr*0.55]; break; }
    case "golem": { const hip=s*0.74+dd;
      ret(s*0.3,hip,s*0.14,s-hip,esc); ret(s*0.56,hip,s*0.14,s-hip,esc); ret(s*0.3+sw*u,s-2,s*0.16,2,tom(esc,.8)); ret(s*0.56-sw*u,s-2,s*0.16,2,tom(esc,.8));
      for(let y=Math.round(s*0.34)+dd;y<hip;y++) for(let x=Math.round(s*0.2);x<s*0.8;x++){ const dx=(x-s*0.5)/(s*0.3), dy=(y-s*0.55)/(s*0.22); px(x,y,sombreado(dx,dy,base)); }
      bx=s*0.5; by=s*0.55; br=s*0.28;
      const ay=atk?-u*2:0; ret(s*0.1,s*0.38+dd+ay,s*0.12,s*0.34,tom(base,.8)); ret(s*0.78,s*0.38+dd+(atk?-u*3:0),s*0.12,s*0.34,tom(base,.9));
      hx=s*0.52; hy=s*0.26+dd; hr=s*0.13; elipse(hx,hy,hr*1.1,hr,tom(base,1.08)); olhos=[[hx-hr*0.2,hy],[hx+hr*0.5,hy]]; boca=[hx+hr*0.2,hy+hr*0.6]; break; }
    case "quadrupede": { const y0=s*0.66+dd;
      const pernas=[[s*0.26,0],[s*0.38,Math.PI],[s*0.6,Math.PI],[s*0.72,0]];
      for(const [x,f] of pernas){ const o=Math.sin(fi+f)*1.4*u; linha(x,y0,x+o,s-1,x<s*0.5?esc:tom(base,.75),u>1.2?2:1); }
      elipse(s*0.48,s*0.58+dd,s*0.3,s*0.16,base); bx=s*0.48; by=s*0.58; br=s*0.2;
      hx=s*0.78+(atk?u*1.5:0); hy=s*0.44+dd+(atk?u:0); hr=s*0.13; elipse(hx,hy,hr,hr*0.9,tom(base,1.08)); elipse(hx+hr*0.9,hy+hr*0.35,hr*0.55,hr*0.4,tom(base,1.0));
      if(!tem("cauda")) linha(s*0.18,s*0.54,s*0.08,s*0.42+sw2*u,esc);
      olhos=[[hx+hr*0.3,hy-hr*0.2]]; boca=[hx+hr*1.3,hy+hr*0.6]; frente=1; break; }
    case "bipede": { const y0=s*0.68+dd;
      linha(s*0.42,y0,s*0.38+sw*2*u,s-1,esc,2); linha(s*0.54,y0,s*0.58-sw*2*u,s-1,tom(base,.8),2);
      for(let i=0;i<8;i++) elipse(s*0.32-i*s*0.035,s*0.58+i*s*0.025+sw2*i*0.15,s*0.08-i*s*0.008,s*0.06-i*s*0.006,tom(base,.92),true);
      elipse(s*0.5,s*0.55+dd,s*0.2,s*0.17,base); bx=s*0.5; by=s*0.55; br=s*0.18;
      hx=s*0.72+(atk?u:0); hy=s*0.32+dd; hr=s*0.13; elipse(hx,hy,hr*1.2,hr,tom(base,1.1)); linha(hx-hr*0.4,hy+hr*0.9,hx+hr*1.2,hy+hr*(atk?1.6:0.9),esc);
      linha(s*0.66,s*0.5,s*0.74,s*0.58,esc); olhos=[[hx+hr*0.4,hy-hr*0.3]]; boca=[hx+hr*1.1,hy+hr*0.9]; break; }
    case "inseto": { const y0=s*0.72+dd;
      for(let i=0;i<3;i++){ const x=s*0.32+i*s*0.16, o=Math.sin(fi+i*Math.PI)*u; linha(x,y0,x-u*2+o,s-1,esc); linha(x+1,y0,x+u*2+o,s-1,esc); }
      elipse(s*0.46,s*0.64+dd,s*0.3,s*0.16,base); for(let x=Math.round(s*0.22);x<s*0.7;x+=Math.max(2,Math.round(u*2))) for(let y=Math.round(s*0.52);y<s*0.76;y++) if(buf[(Math.round(y+dd)+oy)*W+x+ox]) px(x,y+dd,tom(base,.8));
      bx=s*0.46; by=s*0.64; br=s*0.2; hx=s*0.78; hy=s*0.62+dd; hr=s*0.1; elipse(hx,hy,hr,hr*0.9,tom(base,.9));
      olhos=[[hx+hr*0.3,hy-hr*0.3]]; boca=[hx+hr,hy+hr*0.3]; break; }
    case "serpente": { const n=9;
      for(let i=n;i>=0;i--){ const t=i/n, x=s*0.08+t*s*0.66, y=s*0.74+Math.sin(t*5.5+fi)*s*0.07+dd, rr=s*(0.06+0.07*t); elipse(x,y,rr,rr*0.85,i%2?base:tom(base,.9)); }
      hx=s*0.8+(atk?u*2:0); hy=s*0.56+dd-(atk?u*2:0); hr=s*0.13; elipse(hx,hy,hr*1.15,hr,tom(base,1.1)); bx=s*0.45; by=s*0.72; br=s*0.18;
      if(q%2===0||atk){ px(hx+hr*1.2,hy+hr*0.3,"#e04848"); px(hx+hr*1.2+1,hy+hr*0.1,"#e04848"); }
      olhos=[[hx+hr*0.35,hy-hr*0.35]]; boca=[hx+hr,hy+hr*0.4]; break; }
    case "ave": { const voando=def.andar==="voa", asa=voando? (q%2===0?-1:1) : 0;
      if(!voando){ linha(s*0.45,s*0.7,s*0.42+sw*u,s-1,"#c8a040"); linha(s*0.55,s*0.7,s*0.58-sw*u,s-1,"#c8a040"); }
      elipse(s*0.48,s*0.54+dd,s*0.22,s*0.16,base); bx=s*0.48; by=s*0.54; br=s*0.18;
      for(let i=0;i<4;i++) linha(s*0.28,s*0.55,s*0.08,s*0.5+i*s*0.04,tom(base,.8));
      const wy=asa<0? -s*0.3 : s*0.06; for(let i=0;i<5;i++) linha(s*0.4,s*0.5,s*0.18+i*s*0.06,s*0.5+wy+Math.abs(i-2)*u*0.8,i%2?tom(base,.78):tom(base,.92));
      hx=s*0.7+(atk?u*1.5:0); hy=s*0.36+dd; hr=s*0.12; elipse(hx,hy,hr,hr,tom(base,1.12)); linha(hx+hr*0.8,hy,hx+hr*1.9,hy+hr*(atk?0.8:0.3),"#e0a838");
      olhos=[[hx+hr*0.3,hy-hr*0.2]]; boca=[hx+hr*1.4,hy+hr*0.3]; break; }
    case "espectro": {
      elipse(s*0.5,s*0.4+dd,s*0.22,s*0.22,base); bx=s*0.5; by=s*0.5; br=s*0.2;
      for(let y=Math.round(s*0.5);y<s-1;y++){ const t=(y-s*0.5)/(s*0.5), w=s*0.22*(1-t*0.55); for(let x=Math.round(s*0.5-w);x<=s*0.5+w;x++){ const onda=Math.sin(x*0.9+fi*2)*1.4; if(y>s*0.9+onda) continue; px(x+Math.sin(t*3+fi)*u,y,sombreado((x-s*0.5)/(w+1),t,base)); } }
      linha(s*0.3,s*0.48,s*0.16-sw*u,s*0.64,tom(base,.85)); linha(s*0.7,s*0.48,s*(atk?0.92:0.84)+sw*u,s*(atk?0.4:0.64),tom(base,.95));
      hx=s*0.5; hy=s*0.38+dd; hr=s*0.2; olhos=[[hx-hr*0.15,hy],[hx+hr*0.5,hy]]; boca=[hx+hr*0.2,hy+hr*0.55]; break; }
    case "bolha": { const sq=(q%2===0?0.12:-0.06)+(dor?0.2:0);
      elipse(s*0.5,s*0.62+sq*s*0.3,s*0.32*(1+sq),s*0.28*(1-sq),base); px(s*0.36,s*0.48,"#ffffff"); px(s*0.38,s*0.46,tom(base,1.6));
      bx=s*0.5; by=s*0.62; br=s*0.3; hx=s*0.52; hy=s*0.56; hr=s*0.2; olhos=[[hx-hr*0.3,hy],[hx+hr*0.5,hy]]; boca=[hx+hr*0.1,hy+hr*0.6]; break; }
    case "aquatico": { const cauda=Math.sin(fi)*u*1.5;
      elipse(s*0.5,s*0.6+dd,s*0.32,s*0.17,base); for(let i=0;i<4;i++) linha(s*0.2,s*0.6,s*0.04,s*0.48+i*s*0.08+cauda,tom(base,.8));
      for(let x=Math.round(s*0.3);x<s*0.75;x++) px(x,s*0.68+dd,tom(base,1.25));
      bx=s*0.5; by=s*0.6; br=s*0.2; hx=s*0.72; hy=s*0.56+dd; hr=s*0.12; olhos=[[hx+hr*0.3,hy-hr*0.3]]; boca=[hx+hr*1.3,hy+hr*0.5]; break; }
    case "planta": {
      if(tem("cogumelo")){ const sq=q%2? 0.08 : 0; ret(s*0.42,s*0.5,s*0.16,s*0.5,"#e8e0d0"); ret(s*0.42,s*0.5,u,s*0.5,"#ffffff");
        for(let y=Math.round(s*0.16);y<s*0.52;y++){ const t=(y-s*0.16)/(s*0.36), w=s*(0.18+0.24*Math.sqrt(t))*(1+sq); for(let x=Math.round(s*0.5-w);x<=s*0.5+w;x++) px(x,y,sombreado((x-s*0.5)/w,t-0.5,base)); }
        for(const [a,b] of [[0.36,0.3],[0.6,0.26],[0.5,0.4],[0.7,0.42]]) px(s*a,s*b,"#f4f0e8"); hx=s*0.5; hy=s*0.64; hr=s*0.1; bx=s*0.5; by=s*0.6; br=s*0.14;
        olhos=[[hx-hr*0.6,hy],[hx+hr*0.5,hy]]; boca=[hx,hy+hr*0.9]; break; }
      ret(s*0.4,s*0.4,s*0.2,s*0.6,"#5a3a20"); for(let i=0;i<5;i++) linha(s*0.5,s*0.42,s*0.12+i*s*0.19,s*0.24+(i%2)*s*0.08+sw*u*(i%2?1:-1),"#4a2a14");
      elipse(s*0.5,s*0.3,s*0.3,s*0.2,"#3f7a34"); for(let i=0;i<8;i++) px(s*0.25+((i*37)%10)/10*s*0.5,s*0.18+((i*53)%10)/10*s*0.24,"#7ac050");
      linha(s*0.4,s*(1-0.02),s*0.36+sw*u,s-1,"#4a2a14"); hx=s*0.5; hy=s*0.52; hr=s*0.1; bx=s*0.5; by=s*0.6; br=s*0.16; olhos=[[hx-hr*0.6,hy],[hx+hr*0.6,hy]]; boca=[hx,hy+hr]; break; }
    case "objeto": default: {
      if(tem("guarda_chuva")){ linha(s*0.5,s*0.45,s*0.5+sw*u,s-1,"#8a5a30",1); px(s*0.5+sw*u+1,s-1,"#8a5a30");
        for(let y=Math.round(s*0.12);y<s*0.46;y++){ const t=(y-s*0.12)/(s*0.34), w=s*0.42*Math.sqrt(t); for(let x=Math.round(s*0.5-w);x<=s*0.5+w;x++) px(x,y+(dor?1:0),(Math.floor((x-s*0.5)/(s*0.12))+10)%2? base : tom(base,.78)); }
        hx=s*0.5; hy=s*0.32; hr=s*0.12; olhos=[[hx,hy]]; boca=[hx,hy+hr*1.1]; bx=s*0.5; by=s*0.3; br=s*0.3; break; }
      if(tem("lanterna")){ for(let y=Math.round(s*0.2);y<s*0.82;y++){ const t=(y-s*0.51)/(s*0.31), w=s*0.26*Math.sqrt(Math.max(0,1-t*t)); for(let x=Math.round(s*0.5-w);x<=s*0.5+w;x++) px(x,y,(y%3===0)?tom(base,.72):sombreado((x-s*0.5)/(w+1),t,base)); }
        ret(s*0.38,s*0.16,s*0.24,2,"#2a2024"); ret(s*0.38,s*0.82,s*0.24,2,"#2a2024"); hx=s*0.5; hy=s*0.44; hr=s*0.14; olhos=[[hx,hy]]; boca=[hx,hy+hr*1.4]; bx=s*0.5; by=s*0.5; br=s*0.24; break; }
      if(tem("bobina")){ ret(s*0.3,s*0.82,s*0.4,s*0.18,"#3a3640"); for(let y=Math.round(s*0.32);y<s*0.82;y++) ret(s*0.38,y,s*0.24,1,y%2?"#c87a3a":"#e09a5a"); elipse(s*0.5,s*0.22,s*0.17,s*0.14,"#c8d0d8"); if(atk||q%2) px(s*0.5+u*2,s*0.1,"#fff3a0");
        hx=s*0.5; hy=s*0.22; hr=s*0.14; olhos=[[hx-hr*0.4,hy],[hx+hr*0.4,hy]]; bx=s*0.5; by=s*0.55; br=s*0.18; break; }
      if(tem("jarro")){ for(let y=Math.round(s*0.2);y<s*0.95;y++) for(let x=Math.round(s*0.24);x<s*0.76;x++) px(x,y,(x===Math.round(s*0.24)||x===Math.round(s*0.76)-1)?"#9fd0ea":"rgba(150,210,240,.35)");
        elipse(s*0.5,s*0.55+(q%2),s*0.18,s*0.14,"#e8a0b0"); for(let i=0;i<4;i++) px(s*0.42+i*s*0.05,s*0.55+(i%2),"#c86a80"); ret(s*0.22,s*0.14,s*0.56,s*0.08,"#8a8a90");
        hx=s*0.5; hy=s*0.5; hr=s*0.14; olhos=[[hx-hr*0.4,hy],[hx+hr*0.6,hy]]; bx=s*0.5; by=s*0.55; br=s*0.2; break; }
      if(tem("nau")){ const b=q%2;
        for(let y=Math.round(s*0.56);y<s*0.82;y++){ const t=(y-s*0.56)/(s*0.26), w=s*0.46*(1-t*0.5); for(let x=Math.round(s*0.5-w);x<=s*0.5+w;x++) px(x,y+b,y%3===0?tom(base,.7):base); }
        linha(s*0.48,s*0.1,s*0.48,s*0.58,"#3a2a20"); for(let y=Math.round(s*0.16);y<s*0.5;y++) ret(s*0.3,y,s*0.36,1,y%4===0?"rgba(220,230,220,.5)":"rgba(200,220,210,.75)");
        for(let i=0;i<3;i++) px(s*0.3+i*s*0.2,s*0.66+b,"#1a1416"); hx=s*0.5; hy=s*0.3; hr=s*0.2; bx=s*0.5; by=s*0.66; br=s*0.4; break; }
      if(tem("casa")){ if(tem("pes_galinha")){ linha(s*0.38,s*0.7,s*0.34+sw*2*u,s-1,"#e0b040",1); linha(s*0.62,s*0.7,s*0.66-sw*2*u,s-1,"#e0b040",1); }
        ret(s*0.22,s*0.38,s*0.56,s*0.34,"#8a5a30"); for(let y=Math.round(s*0.38);y<s*0.72;y+=2) ret(s*0.22,y,s*0.56,1,"#6a4020");
        for(let y=0;y<s*0.2;y++) ret(s*0.5-y*1.6,s*0.18+y,y*3.2,1,y%2?"#4a6a3a":"#3a5a2a"); hx=s*0.5; hy=s*0.5; hr=s*0.1; olhos=[[s*0.36,s*0.5],[s*0.62,s*0.5]]; boca=[s*0.5,s*0.64]; bx=s*0.5; by=s*0.55; br=s*0.28; break; }
      if(tem("sarcofago")){ const hop=0; for(let y=Math.round(s*0.08);y<s;y++){ const t=(y-s*0.08)/(s*0.92), w=s*(t<0.2? 0.14+t*0.6 : 0.26-0.06*t); for(let x=Math.round(s*0.5-w);x<=s*0.5+w;x++) px(x,y+hop,(y%5===0)?"#2a5a8a":sombreado((x-s*0.5)/w,0,"#d6ab4f")); }
        elipse(s*0.5,s*0.2,s*0.11,s*0.1,"#e8c070"); hx=s*0.5; hy=s*0.2; hr=s*0.1; olhos=[[hx-hr*0.4,hy],[hx+hr*0.5,hy]]; boca=[hx,hy+hr*0.7]; bx=s*0.5; by=s*0.55; br=s*0.24; break; }
      ret(s*0.24,s*0.36,s*0.52,s*0.6,base); hx=s*0.5; hy=s*0.5; hr=s*0.12; olhos=[[hx-hr,hy],[hx+hr,hy]]; boca=[hx,hy+hr]; bx=s*0.5; by=s*0.6; br=s*0.26; }
  }
  // ---------------------------------------------------------------- detalhes
  const ouro="#e0b040", metal="#a8a8b8", bronze="#b07a3a";
  for(const d of det){ switch(d){
    case "bandagens": for(let y=Math.round(s*0.2);y<s*0.9;y+=2) for(let x=0;x<s;x++){ const i=(Math.round(y)+oy)*W+x+ox; if(buf[i]&&buf[i]!==cont) buf[i]=tom(base,.82); }
      linha(bx-br,by,bx-br-s*0.18,by+Math.sin(fi)*s*0.1+s*0.06,"#e8dcc0"); break;
    case "elmo": for(let x=Math.round(hx-hr*1.1);x<=hx+hr*1.1;x++) for(let y=Math.round(hy-hr*1.05);y<=hy-hr*0.1;y++){ const dx=(x-hx)/(hr*1.1), dy=(y-hy)/hr; if(dx*dx+dy*dy<=1.1) px(x,y,sombreado(dx,dy,bronze)); }
      linha(hx-hr*0.4,hy-hr*1.4,hx+hr*0.3,hy-hr*1.6,"#c8473b"); break;
    case "lanca": linha(s*0.82,s*0.86,s*0.82+(atk?u*3:0),s*0.06,"#7a5a30"); px(s*0.82+(atk?u*3:0),s*0.04,metal); px(s*0.82+(atk?u*3:0),s*0.02,"#e8e8f0"); break;
    case "escudo": elipse(bx-br*0.6,by+br*0.1,s*0.13,s*0.15,bronze); px(bx-br*0.6,by+br*0.1,"#f2d23a"); break;
    case "chifres": linha(hx-hr*0.5,hy-hr*0.7,hx-hr*0.9,hy-hr*1.8,"#e8e0d0"); linha(hx+hr*0.5,hy-hr*0.7,hx+hr*0.8,hy-hr*1.8,"#e8e0d0"); break;
    case "asas": if(def.corpo!=="ave"){ const up=q%2===0; for(let i=0;i<4;i++){ linha(bx-br*0.2,by-br*0.4,bx-br*1.4-i,by-br*(up?1.8:0.4)+i*u,tom(base,.7)); linha(bx+br*0.2,by-br*0.4,bx+br*1.3+i,by-br*(up?1.8:0.4)+i*u,tom(base,.85)); } } break;
    case "cauda": { const cx0=bx-br*1.1; for(let i=0;i<6;i++) px(cx0-i*u*0.8,by+Math.sin(i*0.8+fi)*u*1.5-i*u*0.4,i>3?tom(base,1.3):tom(base,.85)); break; }
    case "juba": for(let a=0;a<6.28;a+=0.35){ const x=hx+Math.cos(a)*hr*1.25, y=hy+Math.sin(a)*hr*1.2; if(x<hx+hr*0.5) px(x,y,"#a8682a"); } break;
    case "mascara": elipse(hx+hr*0.2,hy,hr*0.8,hr*0.75,"#9fe0c0",true); olhos=olhos.map(([x,y])=>[x,y]); break;
    case "chapeu": if(det.includes("cajado")){ for(let i=0;i<hr*2.4;i++) ret(hx-hr*1.2+i*0.5,hy-hr*0.9-i*0.9,Math.max(1,hr*2.4-i),1,"#2a1e3a"); ret(hx-hr*1.6,hy-hr*0.9,hr*3.4,1,"#2a1e3a"); }
      else if(det.includes("talisma")){ ret(hx-hr*1.2,hy-hr*1.3,hr*2.4,hr*0.7,"#1a1a2a"); px(hx,hy-hr*1.6,"#c8473b"); }
      else { ret(hx-hr*1.5,hy-hr*0.8,hr*3,1,"#3a2a20"); ret(hx-hr*0.8,hy-hr*1.6,hr*1.6,hr*0.8,"#3a2a20"); } break;
    case "capuz": for(let a=Math.PI*0.9;a<Math.PI*2.1;a+=0.12) px(hx+Math.cos(a)*hr*1.15,hy+Math.sin(a)*hr*1.15,"#2a1e2e"); linha(hx-hr,hy,bx-br*1.2,s*0.86,"#2a1e2e"); break;
    case "coroa": for(let i=0;i<3;i++){ px(hx-hr*0.6+i*hr*0.6,hy-hr*1.2,ouro); px(hx-hr*0.6+i*hr*0.6,hy-hr*1.5,ouro); } ret(hx-hr*0.8,hy-hr*1.05,hr*1.8,1,ouro); break;
    case "olho_unico": olhos=[[hx+hr*0.3,hy]]; px(hx+hr*0.3-1,hy,"#ffffff"); px(hx+hr*0.3+1,hy,"#ffffff"); px(hx+hr*0.3,hy-1,"#ffffff"); px(hx+hr*0.3,hy+1,"#ffffff"); break;
    case "tentaculos": for(let i=0;i<5;i++){ const x0=bx-br*0.8+i*br*0.4; for(let j=0;j<s*0.3;j++) px(x0+Math.sin(j*0.5+fi+i)*u,by+br*0.5+j,j>s*0.2?tom(base,1.2):tom(base,.85)); } break;
    case "pincas": { const a=atk?u:0; elipse(hx+hr*1.6+a,hy-hr*0.2,hr*0.7,hr*0.5,tom(base,1.1)); px(hx+hr*2.2+a,hy-hr*0.6,cont); break; }
    case "carapaca": for(let x=Math.round(bx-br);x<bx+br;x+=2) px(x,by-br*0.6,tom(base,1.4)); break;
    case "barba": for(let y=0;y<hr*1.4;y++) ret(hx-hr*0.4+y*0.1,hy+hr*0.5+y,Math.max(1,hr*1.2-y*0.5),1,"#d8d8e0"); break;
    case "cajado": linha(s*0.86,s*0.96,s*0.84,s*0.12,"#6a4a2a"); px(s*0.84,s*0.1,"#9fe0ff"); px(s*0.84,s*0.08,"#ffffff"); break;
    case "presas": if(boca){ px(boca[0],boca[1],"#ffffff"); px(boca[0]-2,boca[1],"#ffffff"); } break;
    case "chamas": for(let i=0;i<5;i++){ const x=hx-hr+i*hr*0.5, h=1+((i+q)%3); for(let j=0;j<h;j++) px(x,hy-hr-j,j===h-1?"#ffd34a":"#e8603c"); } break;
    case "gelo": for(let i=0;i<4;i++){ px(bx-br+i*br*0.6,by+br,"#e8f8ff"); px(bx-br+i*br*0.6,by+br+1,"#bfe6ff"); } break;
    case "folhas": for(let i=0;i<5;i++) px(bx-br+((i*37)%10)/10*br*2,by-br+((i*53)%10)/10*br*1.4,"#5aa83c"); px(hx,hy-hr,"#7ac050"); break;
    case "crista": for(let i=0;i<3;i++) linha(hx-hr*0.2+i,hy-hr*0.8,hx-hr*0.6+i*u,hy-hr*1.8,i===1?"#e04848":"#f2d23a"); break;
    case "orelhas": { const L=def.corpo==="quadrupede"?1.25:1.8; linha(hx-hr*0.2,hy-hr*0.6,hx-hr*0.1,hy-hr*L,tom(base,.9)); linha(hx+hr*0.4,hy-hr*0.6,hx+hr*0.6,hy-hr*L,tom(base,.8)); break; }
    case "manchas": for(let i=0;i<6;i++){ const x=bx-br+((i*41)%10)/10*br*2, y=by-br*0.5+((i*29)%10)/10*br; if(buf[(Math.round(y)+oy)*W+Math.round(x)+ox]) px(x,y,tom(base,.45)); } break;
    case "barbatana": for(let i=0;i<4;i++) linha(bx-i,by-br*0.6,bx-u*2,by-br*0.6-s*0.16+i,tom(base,.8)); break;
    case "lingua": if(boca&&(q%2===0||atk)) { px(boca[0],boca[1]+1,"#e04870"); px(boca[0],boca[1]+2,"#e04870"); } break;
    case "ferrao": for(let i=0;i<8;i++){ const a=Math.PI*(1-i/8); px(bx-br*0.7+Math.cos(a)*br*0.9,by-br*0.3-Math.sin(a)*br*1.4,i>6?"#f2d23a":tom(base,.85)); } break;
    case "engrenagem": elipse(bx,by,br*0.4,br*0.4,metal); px(bx,by,cont); break;
    case "tapa_olho": if(olhos.length) { const [x,y]=olhos[olhos.length-1]; px(x,y,"#000"); px(x+1,y,"#000"); linha(hx-hr,hy-hr*0.5,hx+hr,hy-hr*0.2,"#000"); } break;
    case "gorro": for(let i=0;i<hr*2;i++) ret(hx-hr+i*0.6,hy-hr*0.8-i*0.7,Math.max(1,hr*2-i),1,"#d8302a"); break;
    case "garras": px(bx+br*1.1,by+br*0.6,"#f4f0e8"); px(bx+br*1.2,by+br*0.4,"#f4f0e8"); break;
    case "pelo": for(let i=0;i<10;i++){ const x=bx-br+((i*37)%10)/10*br*2, y=by-br+((i*71)%10)/10*br*2; const ii=(Math.round(y)+oy)*W+Math.round(x)+ox; if(buf[ii]) px(x,y,tom(base,.78)); } break;
    case "parafusos": px(hx-hr*1.1,hy+hr*0.8,metal); px(hx+hr*1.1,hy+hr*0.8,metal); linha(hx-hr*0.6,hy-hr*0.3,hx+hr*0.4,hy-hr*0.5,"#3a2a2a"); break;
    case "correntes": for(let i=0;i<7;i++) px(hx-hr+i*hr*0.35,hy+hr*1.1+(i%2),metal); for(let i=0;i<5;i++) px(bx-br*0.5+i,s-2-(i%2),metal); break;
    case "cabecas": { const n=def.corpo==="serpente"? (det.includes("brilho")&&s>26?8:3) : 2;
      for(let i=0;i<n;i++){ const a=-0.9+i*(1.8/Math.max(1,n-1)), L=s*0.28, x1=(def.corpo==="humanoide"? (i? s*0.72 : s*0.28) : s*0.62+Math.cos(a)*L), y1=(def.corpo==="humanoide"? s*0.28 : s*0.5+Math.sin(a)*L*0.9);
        linha(def.corpo==="humanoide"?(i?s*0.64:s*0.36):s*0.6,def.corpo==="humanoide"?s*0.44:s*0.6,x1,y1+Math.sin(fi+i)*u,tom(base,.9),u>1.5?2:1); elipse(x1,y1+Math.sin(fi+i)*u,s*0.06,s*0.05,tom(base,1.15)); px(x1+1,y1-1+Math.sin(fi+i)*u,"#ffd34a"); } break; }
    case "runas": for(let i=0;i<4;i++) px(bx-br*0.6+i*br*0.4,by-br*0.2+(i%2)*br*0.4,"#7fe0ff"); break;
    case "abobora_mao": elipse(s*0.84,s*0.5,s*0.1,s*0.09,"#e07a2a"); px(s*0.82,s*0.5,"#ffd34a"); px(s*0.86,s*0.5,"#ffd34a"); break;
    case "talisma": ret(hx+hr*0.1,hy-hr*0.6,Math.max(1,hr*0.5),hr*1.4,"#f2e070"); px(hx+hr*0.2,hy-hr*0.2,"#c8473b"); break;
    case "um_pe": case "pes_galinha": case "brilho": case "cogumelo": case "guarda_chuva": case "lanterna": case "bobina": case "jarro": case "nau": case "casa": case "sarcofago": case "sem_cabeca": case "ossos": break;
  } }
  // olhos: brilhantes para quem tem "brilho"; fechados na piscada; "x" na dor
  const corOlho=det.includes("brilho")? (def.corpo==="espectro"?"#bff4ff":"#ffd34a") : "#1a1418";
  for(const [x,y] of olhos){ if(pisc){ px(x,y,tom(base,.6)); px(x+1,y,tom(base,.6)); } else if(dor){ px(x,y,"#ffffff"); px(x+1,y+1,"#ffffff"); } else { px(x,y,corOlho); if(s>=14&&!det.includes("brilho")) px(x,y-1,"#ffffff"); } }
  if(atk&&boca&&def.corpo!=="objeto") px(boca[0],boca[1],"#3a0a10");
  // contorno escuro de 1 px
  const fim=buf.slice(); for(let y=0;y<H;y++) for(let x=0;x<W;x++){ if(buf[y*W+x]) continue; if((x>0&&buf[y*W+x-1])||(x<W-1&&buf[y*W+x+1])||(y>0&&buf[(y-1)*W+x])||(y<H-1&&buf[(y+1)*W+x])) fim[y*W+x]=cont; }
  const c=document.createElement("canvas"); c.width=W; c.height=H; const g=c.getContext("2d");
  for(let i=0;i<fim.length;i++){ if(!fim[i]) continue; g.fillStyle=fim[i]; g.fillRect(i%W,Math.floor(i/W),1,1); }
  cacheCri.set(k,c); return c; }

// ---------------------------------------------------------------- arte importada (folhas 8x6 de inimigos, 6x4 de mini, 6x5 de chefe, 6x6 de Guardião)
const cacheFolha=new Map();
function quadroFolha(caminho,cols,rows,col,row,lado){ const img=ARTE_IMG[caminho]; if(!img||!img.pronta) return null; const k=caminho+"|"+col+"|"+row+"|"+lado;
  if(cacheFolha.has(k)) return cacheFolha.get(k); const cw=img.width/cols, ch=img.height/rows, c=document.createElement("canvas"); c.width=c.height=lado; const g=c.getContext("2d"); g.imageSmoothingEnabled=false;
  const e=Math.min(lado/cw,lado/ch), dw=cw*e, dh=ch*e, dx=(lado-dw)/2, dy=lado-dh;
  g.drawImage(img,col*cw,row*ch,cw,ch,dx,dy,dw,dh); c._src={img,sx:col*cw,sy:row*ch,sw:cw,sh:ch,dest:[dx/lado,dy/lado,dw/lado,dh/lado]}; cacheFolha.set(k,c); return c; }
// célula (col,row) de uma folha em grade, mas com o recorte inteligente: o corte entre linhas/colunas vai para o espaço vazio
// mais próximo (o desenho de uma pose invadia a célula vizinha: pedaço da pose de cima aparecendo, pés cortados e o bicho
// "mudando de tamanho"). Escala e posição são as mesmas da grade, então todas as poses do mesmo bicho ficam do mesmo tamanho.
function quadroGrade(img,cols,rows,col,row,tam,base){ if(!img._id) img._id=++ID_IMG; const k=img._id+"|g"+cols+"x"+rows+"|"+col+"|"+row+"|"+tam; if(cacheCel.has(k)) return cacheCel.get(k);
  const f=fatiarFolha(img,cols,rows,true), L=f.valida&&f.linhas[row]; let q=L&&L.qs.find(x=>x.c===col);
  if(!q) return celulaArte(img,cols,rows,col,row,tam,tam,base);
  const cw=img.width/cols, ch=img.height/rows, e=Math.min(tam/cw,tam/ch), dx0=(tam-cw*e)/2, dy0=base*(tam-ch*e);
  const sw=q.x1-q.x0, sh=q.y1-q.y0, dx=dx0+(q.x0-col*cw)*e, dy=dy0+(q.y0-row*ch)*e, dw=sw*e, dh=sh*e;
  const c=document.createElement("canvas"); c.width=c.height=tam; const g=c.getContext("2d"); g.imageSmoothingEnabled=false; g.drawImage(img,q.x0,q.y0,sw,sh,dx,dy,dw,dh);
  c.base=base; c._src={img,sx:q.x0,sy:q.y0,sw,sh,dest:[dx/tam,dy/tam,dw/tam,dh/tam]}; cacheCel.set(k,c); return c; }
function arteCriatura(e,pose,q){ const u=UNIV[R.universo]; if(!u) return null;
  if(e.chefe||e.mini){ const tam=Math.round(e.tam*1.8), caminho=e.eraChefe? `arte/reinos/${u.era}/guardiao_${u.era}__anim.png` : `arte/reinos/${u.era}/${u.id}__${e.mini?"mini":"chefe"}.png`;
    const img=folhaArte(caminho); if(!img) return null; const rows=e.mini?5:6; let row=0, col=q%4;
    if(pose==="anda"){ row=1; col=q%6; } else if(pose==="atk"){ row=2+Math.min(e.golpeIdx||0,e.eraChefe?2:1); col=Math.min(5,Math.floor((e.tAtk||0)*8)); }
    else if(pose==="fase"){ row=4; col=q%6; } else if(pose==="morte"){ row=rows-1; col=q%6; }
    // recorte inteligente (quadros alinhados pelos pés, sem tremer); o quadro tem o mesmo tamanho de antes (tam)
    const f=fatiarFolha(img,6,rows), L=f.valida&&f.linhas[row]; if(L&&L.qs.length){ const q=quadroAnim(img,row,Math.min(col,L.qs.length-1),tam/1.3,null,rows,1.3); if(q){ q.base=q._pe/q.height; return q; } }
    return celulaArte(img,6,rows,col,row,tam,tam,0.85); }
  if(e.especial||e.tipo>2||e.clone) return null; const img=folhaU("inimigos"); if(!img) return null; const tam=Math.round(e.tam*1.55), r0=2*e.tipo;   // menor que a equipe e menos ampliado (a arte tem 48 px)
  let row=r0, col;
  if(pose==="atk") col=6+(q%2); else if(pose==="anda") col=Math.hypot(e.vx||0,e.vy||0)<3? q%2 : 2+(q%4); else if(pose==="pisca") col=q%2;
  else if(pose==="dor"){ row=r0+1; col=0; } else if(pose==="morte"){ row=r0+1; col=1+Math.min(3,q); } else if(pose==="mania"){ row=r0+1; col=5+(q%3); } else col=q%2;
  return celulaArte(img,8,6,col,row,tam,tam,0.85); }   // grade simples: o recorte inteligente trazia pedaços de outras poses nestas folhas (ver docs/ARTES_PARA_REFAZER.md)
// ---------------------------------------------------------------- nascimento, passo e animação
function defInimigo(k){ const u=UNIV[R.universo]; return (u.combate&&u.combate.inimigos[k])||{nome:"inimigo"+k,corpo:"humanoide",andar:"caminha",golpe:"contato",morte:"puff",mania:"",detalhes:[]}; }
function prepararCriatura(e,def,tam){ e.def=def; e.tam=tam; e.passo=Math.random()*4; e.fase=Math.random()*6.28; e.cdG=rnd(1,3); e.surgindo=e.chefe||e.mini?0:0.45; e.tMania=rnd(4,12); e.semente=Math.floor(Math.random()*3)+1;
  if(def.mania==="finge_estatua") e.estatua=true;
  if(R.universo.startsWith("reino_")&&e.tipo===2){ const l=escolha(D.linhas); e.eco=l.id; }
  e.spr=spriteCriatura(def,tam,e.cor,0,"anda",e.semente); }
// dano em % da vida: chefes e mini-chefes contam como no máximo 6 inimigos comuns (senão o próprio fogo os derrete)
function pctMax(o,p){ return (o.chefe||o.mini)? Math.min(o.max,DIF.hp*dificuldade()*6)*p : o.max*p; }
function fala(e,txt,cor){ J.falas=J.falas||[]; J.ultFala=J.ultFala||{}; if(J.t-(J.ultFala[txt]??-9)<3.5) return; J.ultFala[txt]=J.t; if(J.falas.length>6) J.falas.shift(); J.falas.push({e,txt,cor:cor||"#fff8e6",vida:1.6}); }
const XINGOS=["Rato de porão!","Cabeça de bagre!","Marujo de água doce!","Arrr! #@%!","Perna de pau!","Croc, croc!"];
const CONSELHOS=["Encoste na bobina!","Fique parado na água!","Raio + água = spa!","Corra até o chefe!","Abrace o barril!","Desligue a esquiva!"];
function temPequeninoPerto(e){ return ativos().some(s=>linhagemDe(s)==="pequeninos"&&dist2(s,e)<55*55); }
// retorna {m: multiplicador da velocidade normal, dx, dy: deslocamento extra}
const PASSO={m:1,dx:0,dy:0};
function passoCriatura(e,dt,P){ const d=e.def; PASSO.m=1; PASSO.dx=0; PASSO.dy=0; if(!d) return PASSO;
  const dist=Math.hypot(P.x-e.x,P.y-e.y);
  if(e.surgindo>0){ e.surgindo-=dt; PASSO.m=0; return PASSO; }
  if(e.chefe||e.mini){ if(e.parado||e.oculto&&!e.mergulho) PASSO.m=0; if(e.dash){ PASSO.m=0; PASSO.dx=e.dash.vx*dt; PASSO.dy=e.dash.vy*dt; } if(e.bebado>0){ PASSO.m=0.35; PASSO.dx=Math.sin(J.t*5)*20*dt; } if(d.mania==="persegue") PASSO.m*=1.6;
    if(dist>110&&!e.parado) PASSO.m*=Math.min(3.2,1+(dist-110)/40);   // longe da luta: o chefe acelera para alcançar
    if(d.mania==="conselho"){ e.tMania-=dt; if(e.tMania<=0){ e.tMania=rnd(5,8); fala(e,escolha(CONSELHOS),"#e8a0ff"); } }
    if(d.mania==="foge_fogo"){ if(e.medo>0){ e.medo-=dt; PASSO.m=-1.2; } else if(soloEm(Math.floor(e.x/CEL),Math.floor(e.y/CEL))==="fogo"||(e.status&&e.status.el==="fogo"&&J.t-e.status.t<0.3)){ e.medo=1.6; fala(e,"Fogos não!","#ff8a3d"); } }
    return PASSO; }
  e.passo+=Math.hypot(e.vx||0,e.vy||0)*dt/5;
  if(e.caido>0){ e.caido-=dt; PASSO.m=0; return PASSO; }
  if(e.danca>0){ e.danca-=dt; PASSO.m=0; if(Math.random()<dt*3) particulas(e.x+rnd(-3,3),e.y-e.tam*0.6,"#f2e7c9",1,20); return PASSO; }
  if(e.atk>0){ e.atk-=dt; PASSO.m=0; if(e.atk<=0) golpeCriatura(e,P,dist); return PASSO; }
  if(e.dash){ e.dash.t-=dt; PASSO.m=0; PASSO.dx=e.dash.vx*dt; PASSO.dy=e.dash.vy*dt; if(e.dash.t<=0) e.dash=null; return PASSO; }
  if(e.pulo){ const p=e.pulo; p.t+=dt; const q=Math.min(1,p.t/p.dur); e.x=p.x0+(p.x1-p.x0)*q; e.y=p.y0+(p.y1-p.y0)*q; e.z=Math.sin(q*Math.PI)*12; PASSO.m=0;
    if(q>=1){ e.pulo=null; e.z=0; particulas(e.x,e.y+3,"#d8c8a0",6,40); if(Math.hypot(P.x-e.x,P.y-e.y)<10) feriJogador(e.dano*0.8,e.el); } return PASSO; }
  if(e.pavio>0){ e.pavio-=dt; PASSO.m=0.2; if(e.pavio<=0) estourarCriatura(e); return PASSO; }
  // golpes à distância e de perto
  e.cdG-=dt;
  if(e.cdG<=0&&!J.fim){ const g=d.golpe;
    if(g==="bote"&&dist<34){ e.atk=0.4; e.cdG=rnd(2,2.8); }
    else if(g==="cuspe"&&dist>40&&dist<120){ e.atk=0.35; e.cdG=rnd(2.8,4.2); }
    else if(g==="salto"&&dist>22&&dist<75){ e.atk=0.3; e.cdG=rnd(3,4.2); e.alvoPulo={x:P.x,y:P.y}; perigo({tipo:"circ",x:P.x,y:P.y,r:10,t:0.9,cor:"#ff8a6a"}); }
    else if(g==="descarga"&&dist<28){ e.atk=0.45; e.cdG=rnd(2.6,3.4); perigo({tipo:"circ",x:e.x,y:e.y,r:22,t:0.45,cor:"#fff3a0"}); }
    else if(g==="explode"&&dist<16){ e.pavio=0.7; e.cdG=99; } }
  // jeito de andar
  e.fase+=dt*(d.andar==="salta"?5:8);
  if(d.andar==="salta") PASSO.m=Math.sin(e.fase)>0? 1.7 : 0.05;
  if(d.andar==="pula") PASSO.m=0.6+0.8*Math.abs(Math.sin(e.fase*0.5));
  if(d.andar==="cambaleia"){ PASSO.dx+=Math.sin(e.fase*0.4)*6*dt; PASSO.m=0.85; }
  if(d.andar==="lateral"){ const k=Math.sin(e.fase*0.25)*18*dt; PASSO.dx+=-(P.y-e.y)/(dist||1)*k; PASSO.dy+=(P.x-e.x)/(dist||1)*k; }
  if(d.andar==="voa"){ PASSO.dx+=Math.sin(e.fase*0.3)*10*dt; PASSO.dy+=Math.cos(e.fase*0.27)*8*dt; }
  if(d.andar==="cava"){ e.cavando=dist>30; if(e.cavando&&Math.random()<dt*6) particulas(e.x,e.y+2,"#8a6a48",1,20); }
  if(e.pressa>0){ e.pressa-=dt; PASSO.m*=1.35; }
  // manias
  e.tMania-=dt; const mania=d.mania;
  switch(mania){
    case "danca": if(e.tMania<=0){ e.tMania=rnd(8,16); if(Math.random()<.55){ e.danca=1.6; if(Math.random()<.4) fala(e,"♪","#ffe9a0"); } else { e.caido=0.9; particulas(e.x,e.y+3,"#d8ccaa",5,30); } } break;
    case "tropeca": if(e.tMania<=0){ e.tMania=rnd(9,18); e.caido=1; particulas(e.x,e.y+3,"#a8a090",5,30); } break;
    case "xinga": if(e.tMania<=0){ e.tMania=rnd(10,22); if(dist<120) fala(e,escolha(XINGOS),"#ffe066"); } break;
    case "uiva": if(e.tMania<=0){ e.tMania=rnd(9,15); e.danca=0.8; fala(e,"Auuu!","#cfe0ff"); for(const o of J.inimigos) if(o!==e&&o.tipo===e.tipo&&dist2(o,e)<70*70) o.pressa=3; } break;
    case "ilusao": if(e.tMania<=0){ e.tMania=rnd(4,8); particulas(e.x,e.y,"#c8b0ff",6,40); const a=Math.random()*6.28; e.x+=Math.cos(a)*18; e.y+=Math.sin(a)*18; particulas(e.x,e.y,"#c8b0ff",6,40); } break;
    case "foge_fogo": case "medo_pequeninos": { if(e.medo>0){ e.medo-=dt; PASSO.m=-1.3; } else if(mania==="medo_pequeninos"&&temPequeninoPerto(e)){ e.medo=1.5; if(Math.random()<.3) fala(e,"!!","#ffe066"); }
        else if(mania==="foge_fogo"&&(soloEm(Math.floor(e.x/CEL),Math.floor(e.y/CEL))==="fogo"||(e.status&&e.status.el==="fogo"&&J.t-e.status.t<0.5))){ e.medo=2; fala(e,"Fogo!","#ff8a3d"); } break; }
    case "folego": { if(J.paradoT>0.8){ PASSO.m=0.2; PASSO.dx+=Math.sin(e.fase*0.5)*14*dt; if(e.tMania<=0){ e.tMania=rnd(3,6); fala(e,"?","#e8e8ff"); } } break; }
    case "rouba": { if(e.fuga>0){ e.fuga-=dt; PASSO.m=-1.5; break; } let g=null, bd=90*90; for(const x of J.gemas){ const dd2=dist2(x,e); if(dd2<bd){ bd=dd2; g=x; } }
        if(g){ const dx=g.x-e.x, dy=g.y-e.y, dd=Math.hypot(dx,dy)||1; PASSO.m=0; PASSO.dx=dx/dd*e.v*1.6*dt; PASSO.dy=dy/dd*e.v*1.6*dt; if(dd<5){ g.pega=true; e.roubou=(e.roubou||0)+g.v; fala(e,"Hihihi!","#ffe9a0"); e.fuga=2.5; } } break; }
    case "enxame": { let cx=0,cy=0,n=0; for(const o of J.inimigos){ if(o!==e&&o.tipo===e.tipo&&Math.abs(o.x-e.x)<40&&Math.abs(o.y-e.y)<40){ cx+=o.x; cy+=o.y; n++; if(n>6) break; } } if(n){ PASSO.dx+=(cx/n-e.x)*0.8*dt; PASSO.dy+=(cy/n-e.y)*0.8*dt; } break; }
    case "canto": if(dist<90&&dist>14&&!J.fim){ P.x+=(e.x-P.x)/dist*5*dt; P.y+=(e.y-P.y)/dist*5*dt; if(Math.random()<dt*2) particulas(e.x,e.y-e.tam*0.6,"#c8b0ff",1,15); } break;
    case "rodopia": if(e.tMania<=0){ e.tMania=rnd(6,10); e.giro=2; } if(e.giro>0){ e.giro-=dt; if(J.cena) for(const p of J.cena.lista) if(!p.mat.fixo&&dist2(p,e)<18*18){ const dx=p.x-e.x, dy=p.y-e.y, dd=Math.hypot(dx,dy)||1; p.vx+=(-dy/dd*80+dx/dd*40)*dt; p.vy+=(dx/dd*80+dy/dd*40)*dt; } if(Math.random()<dt*12) particulaAr&&J.cena&&particulaAr("poeira",e.x+rnd(-4,4),e.y,rnd(0,6)); } break;
    case "incendeia": case "molhado": case "eletrifica": e.tRastro=(e.tRastro||0)-dt; if(e.tRastro<=0){ e.tRastro=0.6; aplicarElementoNoSolo(e.x,e.y+2,mania==="incendeia"?"fogo":mania==="molhado"?"agua":"raio"); } break;
    case "formacao": PASSO.dy+=(Math.round(e.y/12)*12-e.y)*3*dt; break;
    case "finge_estatua": if(e.estatua){ PASSO.m=0; if(dist<40||e.hp<e.max){ e.estatua=false; particulas(e.x,e.y,"#a8a090",10,50); tremor(1); } } break;
    case "camuflagem": { const t=soloEm(Math.floor(e.x/CEL),Math.floor(e.y/CEL)); e.oculta=(t==="grama"||t==="vinha")&&dist>24; break; }
    case "pedra_luz": { const t=soloEm(Math.floor(e.x/CEL),Math.floor(e.y/CEL)); if(t==="luz"||(e.status&&e.status.el==="luz")){ petrificar(e); } break; }
    case "pisca": if(e.tMania<=0){ e.tMania=rnd(2,5); e.piscaT=0.18; } break;
  }
  if(e.piscaT>0) e.piscaT-=dt;
  return PASSO; }
function golpeCriatura(e,P,dist){ const d=e.def, g=d.golpe;
  if(g==="bote"){ const dx=P.x-e.x, dy=P.y-e.y, dd=Math.hypot(dx,dy)||1; e.dash={vx:dx/dd*150,vy:dy/dd*150,t:0.22}; }
  else if(g==="cuspe"){ let alvo=P, amigo=false;
    if(d.mania==="cospe_aliado"&&Math.random()<0.35){ const o=maisProximoInimigo(e,90); if(o){ alvo=o; amigo=true; fala(e,"Ptui!","#e8e8ff"); } }
    const a=Math.atan2(alvo.y-e.y,alvo.x-e.x); bala(e,e.x,e.y-e.tam*0.3,a,70,e.dano*0.45,projCuspe(e),e.el,{contraInimigo:amigo}); }
  else if(g==="salto"&&e.alvoPulo){ e.pulo={x0:e.x,y0:e.y,x1:e.alvoPulo.x,y1:e.alvoPulo.y,t:0,dur:0.6}; e.alvoPulo=null; }
  else if(g==="descarga"){ raio(e.x,e.y,e.x+rnd(-20,20),e.y+rnd(-20,20),"#fff3a0"); anel(e.x,e.y,22,"#fff3a0",.3); if(Math.hypot(P.x-e.x,P.y-e.y)<22) feriJogador(e.dano*0.7,"raio");
    for(let i=0;i<4;i++){ const a=i*1.57; aplicarElementoNoSolo(e.x+Math.cos(a)*12,e.y+Math.sin(a)*12,"raio"); } } }
function maisProximoInimigo(o,alc){ let best=null, bd=alc*alc; for(const e of J.inimigos){ if(e===o||e.hp<=0) continue; const d=dist2(o,e); if(d<bd){ bd=d; best=e; } } return best; }
function projCuspe(e){ const d=e.def, el=e.el; if(d.detalhes.includes("lanterna")) return "chama"; if(d.corpo==="ave") return "pena"; if(d.corpo==="golem") return d.detalhes.includes("gelo")||d.detalhes.includes("pelo")? "gelo" : "pedra";
  if(d.detalhes.includes("chapeu")&&d.detalhes.includes("cajado")) return "pocao"; if(d.detalhes.includes("tapa_olho")) return "bala"; if(el==="fogo") return "chama"; if(el==="natureza") return "folha"; if(el==="raio") return "raio"; return "gota"; }
function estourarCriatura(e){ const P=J.jogador; anel(e.x,e.y,18,"#c8f07a",.4); particulas(e.x,e.y,COR[e.el],14,90); if(J.cena) for(let i=0;i<8;i++) particulaAr("esporos",e.x+rnd(-8,8),e.y+rnd(-8,8),rnd(0,6));
  if(Math.hypot(P.x-e.x,P.y-e.y)<18) feriJogador(e.dano*1.1,e.el);
  const f=FONTE; FONTE="ambiente"; for(const o of J.inimigos) if(o!==e&&o.hp>0&&dist2(o,e)<18*18) danoSimples(o,pctMax(o,0.3)); FONTE=f;
  for(let i=0;i<5;i++){ const a=i*1.26; mudarSolo(e.x+Math.cos(a)*8,e.y+Math.sin(a)*8,"vinha",8); } e.hp=0; morrer(e); }
function petrificar(e){ if(e.hp<=0) return; evento("petrificado"); texto(e.x,e.y-12,"Virou pedra!","#d8d0c0",13); particulas(e.x,e.y,"#a8a090",14,60); const spr=silhuetaMundo(spriteDe(e,"anda",0),"#8a8478");
  criarEstatua(e.x,e.y,spr,"rocha"); e.semCadaver=true; e.hp=0; morrer(e); }
function spriteDe(e,pose,q){ const arte=arteCriatura(e,pose,q); if(arte) return arte; return spriteCriatura(e.def,e.tam,e.cor,q,pose,e.semente); }
// ---------------------------------------------------------------- derrota: cada inimigo cai do seu jeito
function aoMorrerCriatura(e){ const d=e.def; if(!d||e.semCadaver) return; const C=J.cena;
  if(e.roubou){ const n=Math.min(8,Math.ceil(e.roubou)); for(let i=0;i<n;i++){ const a=Math.random()*6.28; J.gemas.push({x:e.x,y:e.y,vx:Math.cos(a)*50,vy:Math.sin(a)*50,v:e.roubou/n*1.5,cor:"#9fe0ff"}); } fala(e,"Ai, ai!","#ffe9a0"); }
  if(d.mania==="remonta"&&!e.remontado&&!e.clone){ const x=e.x, y=e.y, k=e.tipo; agendar(2.4,()=>{ if(!J||J.fim) return; spawnInimigo(k); const o=J.inimigos[J.inimigos.length-1]; o.x=x; o.y=y; o.hp=o.max*0.4; o.remontado=true; o.surgindo=0.6; particulas(x,y,"#e2dac6",8,40); }); }
  if(d.mania==="pururauca"&&Math.random()<0.4){ evento("pururauca"); criarEstatua(e.x,e.y,silhuetaMundo(spriteDe(e,"anda",0),"#8a8478"),"rocha"); return; }
  if(d.mania==="coco"&&J.cena&&Math.random()<0.6) criarProp("fruta",e.x,e.y);
  if(d.morte==="ouro"){ criarEstatua(e.x,e.y,silhuetaMundo(spriteDe(e,"anda",0),"#e0b040"),"metal"); return; }
  if(d.mania==="esporos") for(let i=0;i<6;i++) J.cena&&particulaAr("esporos",e.x+rnd(-6,6),e.y+rnd(-6,6),rnd(0,6));
  J.cadaveres=J.cadaveres||[]; if(J.cadaveres.length>60) J.cadaveres.shift();
  const spr=spriteDe(e,"dor",0), dur=e.chefe? 1.6 : e.mini? 1 : 0.55;
  const foto={chefe:e.chefe,mini:e.mini,eraChefe:e.eraChefe,tipo:e.tipo,tam:e.tam,especial:e.especial,clone:e.clone}; const temArte=!!arteCriatura(foto,"morte",0);
  J.cadaveres.push({x:e.x,y:e.y,spr,estilo:d.morte,t:0,max:temArte?(e.chefe?1.4:e.mini?0.9:0.5):dur,flip:e.x>J.jogador.x,esc:e.esc||1,cor:e.cor,el:e.el,foto:temArte?foto:null});
  switch(d.morte){
    case "desmonta": case "estilhaca": if(C) for(let i=0;i<(e.chefe?24:7);i++){ const a=Math.random()*6.28, v=rnd(30,80); C.destrocos.push({x:e.x,y:e.y,z:rnd(2,8),vx:Math.cos(a)*v,vy:Math.sin(a)*v,vz:rnd(30,80),cor:d.morte==="desmonta"?"#e2dac6":(Math.random()<.5?e.cor:tom(e.cor,.6)),tam:Math.random()<.4?2:1,vida:rnd(2,4)}); } break;
    case "puff": if(C) for(let i=0;i<4;i++) fumaca(e.x+rnd(-3,3),e.y+rnd(-3,1),4,"#d8d0e0"); break;
    case "penas": if(C) for(let i=0;i<6;i++){ const p=particulaAr("folhas",e.x+rnd(-3,3),e.y,rnd(4,10)); p.cor=Math.random()<.5?e.cor:"#f4f0e8"; } break;
    case "folhas": if(C) for(let i=0;i<8;i++) particulaAr("folhas",e.x+rnd(-4,4),e.y,rnd(2,10)); break;
    case "derrete": mudarSolo(e.x,e.y,e.el==="fogo"?"fogo":frio()?"gelo":"agua"); break;
    case "chama": mudarSolo(e.x,e.y,"fogo"); if(C) for(let i=0;i<8;i++) brasa(e.x+rnd(-3,3),e.y,rnd(0,6)); break;
    case "estoura": anel(e.x,e.y,10,"#bfe6ff",.3); if(C) for(let i=0;i<4;i++) C.ondas.push({x:e.x+rnd(-3,3),y:e.y+rnd(-2,2),r:1,vida:0.8}); break;
    case "sapo": J.sapos=J.sapos||[]; J.sapos.push({x:e.x,y:e.y,vida:3,f:Math.random()*6}); if(C) fumaca(e.x,e.y,5,"#a8e0a0"); break;
    case "desmancha": if(C) for(let i=0;i<10;i++){ const p=particulaAr("poeira",e.x+rnd(-4,4),e.y+rnd(-2,2),rnd(0,8)); p.cor=Math.random()<.5?"#d8c8a0":tom(e.cor,.8); } break;
  } }
function criarEstatua(x,y,spr,material){ if(!J.cena) return; const p=criarProp(material==="metal"?"metal":"rocha",x,y); if(!p) return; p.spriteFixo=spr; if(material==="metal") p.ouro=true; return p; }
function atualizarCriaturas(dt){
  if(J.cadaveres){ for(const c of J.cadaveres) c.t+=dt; J.cadaveres=J.cadaveres.filter(c=>c.t<c.max); }
  if(J.falas){ for(const f of J.falas) f.vida-=dt; J.falas=J.falas.filter(f=>f.vida>0); }
  if(J.sapos){ for(const s of J.sapos){ s.vida-=dt; s.f+=dt; const h=Math.sin(s.f*6); if(h>0){ s.x+=Math.cos(s.f)*18*dt; s.y+=Math.sin(s.f*0.7)*10*dt; } } J.sapos=J.sapos.filter(s=>s.vida>0); }
  const vj=Math.hypot(J.pvx,J.pvy); J.paradoT=vj<5? (J.paradoT||0)+dt : 0;
  // personagem especial do universo (ex.: o Saci selvagem que rouba cristais na Amazônia)
  const u=UNIV[R.universo], esp=u.combate&&u.combate.especial;
  if(esp&&!J.fim){ J.tEsp=(J.tEsp??esp.intervalo*0.5)-dt; if(J.tEsp<=0){ J.tEsp=esp.intervalo*rnd(.8,1.2); spawnInimigo(0); const e=J.inimigos[J.inimigos.length-1];
      e.especial=true; e.def=Object.assign({},esp); e.tam=13; e.cor="#6a3a2a"; e.v=55; e.hp=e.max=DIF.hp*0.8*dificuldade(); e.spr=spriteCriatura(e.def,13,e.cor,0,"anda",1); e.surgindo=0;
      const a=Math.random()*6.28; e.x=J.jogador.x+Math.cos(a)*90; e.y=J.jogador.y+Math.sin(a)*90; fala(e,"Hihihi!","#ffe9a0"); if(J.cena) J.cena.vort.push({x:e.x,y:e.y,r:6,vmax:90,vida:3,fogo:false,f:0,segue:e}); } }
  if(J.cena) for(const w of J.cena.vort) if(w.segue){ if(w.segue.hp>0){ w.x=w.segue.x; w.y=w.segue.y+2; } else w.vida=Math.min(w.vida,0.3); } }
// ---------------------------------------------------------------- desenho
function poseDe(e){ if(e.ia&&e.ia.trocaFase>0) return "fase"; if(e.caido>0||(e.flash>0&&J.t-(e.dorT??-9)<0.15)) return "dor"; /* pose de dor no máximo a cada 0,6 s: com golpes seguidos o inimigo ficava sempre agachado */ if(e.atk>0||e.pavio>0||(e.ia&&e.ia.anuncio>0)) return "atk"; if(e.danca>0) return "mania"; if(e.piscaT>0) return "pisca"; return "anda"; }
function desenharInimigo(e,ox,oy,P){ const x=e.x-ox, y=e.y-oy; if(x<-40||y<-50||x>VW+40||y>VH+40) return;
  const d=e.def; if(!d){ return false; }
  if(e.oculto&&!e.mergulho) { if(e.revoada) return; lg.globalAlpha=0.15; }
  const pose=poseDe(e), q=Math.floor(e.passo||0)%4, voa=d.andar==="voa", flut=d.andar==="flutua";
  let spr= e.eco&&!e.chefe? spriteLinha(e.eco,"comum") : spriteDe(e,pose,pose==="mania"?Math.floor(J.t*6)%4:q);
  if(e.estatua) spr=silhuetaMundo(spr,"#8a8478");
  const w=Math.round(spr.width*(e.esc||1)*(e.eco?0.9:1)), h=Math.round(spr.height*(e.esc||1)*(e.eco?0.9:1));
  let z=(e.z||0), sx=1, sy=1, dx=0;
  if(voa) z+=7+Math.sin(J.t*5+e.fase)*1.5; if(flut) z+=3+Math.sin(J.t*2+e.fase)*2;
  if(d.andar==="pula"||(d.andar==="salta"&&!e.chefe)) z+=Math.max(0,Math.sin(e.fase))*(d.andar==="salta"?6:3);
  if(d.andar==="corre"&&pose==="anda"){ sx=1.06; sy=0.95; }
  if(d.andar==="rasteja"){ sx=1+Math.sin(e.fase)*0.07; sy=1-Math.sin(e.fase)*0.06; }
  if(d.andar==="cambaleia") dx=Math.round(Math.sin(e.fase*0.4)*1);
  if(pose==="atk"&&!e.chefe) dx+=Math.sin(J.t*30+e.fase)*0.5;   // tremor leve e contínuo (antes sorteava a cada quadro e o bicho 'pulava')
  if(e.chefe||e.mini) z+=Math.sin(J.t*2.2)*1.2;
  if(e.giro>0) sx=Math.cos(J.t*18);
  const sombraW=Math.max(4,w*0.55*(voa?0.7:1)), rim=contornoLeitura(spr);
  sombraContato(x,y+h*0.32,sombraW*1.1,rim?0.55:0.45);
  // nascendo: sobe do chão (ou desce do céu, se voa)
  let clip=1; if(e.surgindo>0){ clip=1-e.surgindo/0.45; if(voa) z+=e.surgindo*60; else if(Math.random()<.3) particulas(e.x,e.y+3,"#a89878",1,25); }
  if(e.cavando){ lg.fillStyle="#6a5038"; lg.beginPath(); lg.ellipse(x,y+3,5,2.5,0,0,Math.PI*2); lg.fill(); lg.fillStyle="#1a1418"; lg.fillRect(Math.round(x)+1,Math.round(y)+1,1,1); lg.globalAlpha=1; return true; }
  if(e.oculta) lg.globalAlpha=0.3; if(flut&&d.corpo==="espectro"||e.eco) lg.globalAlpha=Math.min(lg.globalAlpha,0.82); if(e.clone) lg.globalAlpha=Math.min(lg.globalAlpha,0.6+0.2*Math.sin(J.t*9));
  if(e.congela>0) lg.globalAlpha*=.75;
  const virar=e.x>P.x? true : false, img=e.flash>0? branco(spr) : spr;
  if(z<2&&!e.oculta&&clip>=1) sombraProjetada(spr,x+dx,y+h*0.35+h*(1-(spr.base||1)),w,h,virar,e.chefe||e.mini?1:0.85);
  lg.save(); lg.translate(x+dx,y-z+h*0.35+h*(1-(spr.base||1))); if(e.caido>0&&!spr._src) lg.rotate(virar?-1.4:1.4); /* só o desenho por código deita girando; a arte pintada girada virava uma mancha achatada */ if(pose==="mania") lg.scale(Math.floor(J.t*5)%2?-1:1,1);
  lg.scale((virar?-1:1)*sx,sy);
  if(clip<1){ lg.globalAlpha*=clip; lg.translate(0,(1-clip)*3); }
  if(rim&&e.flash<=0){ const a0=lg.globalAlpha; lg.globalAlpha=a0*0.6; lg.drawImage(silhueta(spr,rim),-w/2-1,-h-1,w+2,h+2); lg.globalAlpha=a0; }   // contorno de leitura
  // levou golpe: brilho branco por cima do corpo (mais leve em chefe, que apanha o tempo todo)
  desenharSprite(spr,-w/2,-h,w,h); if(!e.chefe&&!e.mini&&!e.elite&&QUAL>0&&!SIM.ativo){ const a0=lg.globalAlpha; lg.globalAlpha=a0*0.16; lg.drawImage(silhueta(spr,"#140c1c"),-w/2,-h,w,h); lg.globalAlpha=a0; }
  if(img!==spr){ const a0=lg.globalAlpha; lg.globalCompositeOperation="lighter"; lg.globalAlpha=a0*(e.chefe||e.mini?0.4:0.75)*Math.min(1,e.flash/0.05); lg.drawImage(img,-w/2,-h,w,h); lg.globalAlpha=a0; lg.globalCompositeOperation="source-over"; }
  if(e.virouElite>0){ lg.globalAlpha=Math.min(1,e.virouElite*2)*0.7; lg.globalCompositeOperation="lighter"; lg.drawImage(silhueta(spr,"#ffd34a"),-w/2,-h,w,h); lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }
  if(e.chefe&&e.ia&&e.ia.fase===2){ lg.globalAlpha=0.18+0.12*Math.sin(J.t*6); lg.globalCompositeOperation="lighter"; lg.drawImage(silhueta(spr,COR[e.el]||"#ff5a4a"),-w/2,-h,w,h); lg.globalCompositeOperation="source-over"; }
  lg.restore(); lg.globalAlpha=1;
  if(e.bebado>0&&Math.floor(J.t*4)%2){ lg.fillStyle="#ffb0c0"; lg.fillRect(Math.round(x)-2,Math.round(y-z-h*0.7),1,1); lg.fillRect(Math.round(x)+2,Math.round(y-z-h*0.75),1,1); }
  if(e.pavio>0&&Math.floor(J.t*12)%2){ lg.globalAlpha=.6; lg.drawImage(branco(spr),Math.round(x-w/2),Math.round(y-z-h*0.65),w,h); lg.globalAlpha=1; }
  if(e.marca>0){ lg.fillStyle="#c070ff"; lg.fillRect(Math.round(x)-1,Math.round(y-z-h*0.65)-4,3,1); }
  if(e.status){ lg.fillStyle=COR[e.status.el]; lg.fillRect(Math.round(x)-1,Math.round(y-z-h*0.65)-3,2,2); }
  if((e.elite||e.mini)&&!e.chefe){ lg.fillStyle="#000"; lg.fillRect(Math.round(x-w/3),Math.round(y-z-h*0.7)-6,Math.round(w*2/3),2); lg.fillStyle="#e06a5a"; lg.fillRect(Math.round(x-w/3),Math.round(y-z-h*0.7)-6,Math.round(w*2/3*Math.max(0,e.hp/e.max)),2); }
  // detalhes que dependem do quadro: escaravelho rolando a bolinha, faísca da bobina
  if(d.mania==="rola"){ const bxx=x+(virar?-1:1)*(w*0.45), r=2; lg.fillStyle="#b8986a"; lg.beginPath(); lg.arc(bxx,y+h*0.25-z,r,0,Math.PI*2); lg.fill(); }
  return true; }
function desenharCadaveres(ox,oy){ if(!J.cadaveres) return;
  for(const c of J.cadaveres){ const q=c.t/c.max, x=c.x-ox, y=c.y-oy;
    if(c.foto){ const n=c.foto.chefe||c.foto.mini?6:4, s=arteCriatura(c.foto,"morte",Math.min(n-1,Math.floor(q*n))); if(s){ const w=s.width*c.esc, h=s.height*c.esc; lg.save(); lg.translate(Math.round(x),Math.round(y+h*0.35+h*0.15)); if(c.flip) lg.scale(-1,1); lg.globalAlpha=q>0.85?(1-q)/0.15:1; lg.drawImage(s,-w/2,-h,w,h); lg.restore(); lg.globalAlpha=1; continue; } }
    const w=c.spr.width*c.esc, h=c.spr.height*c.esc; lg.save(); lg.translate(Math.round(x),Math.round(y+h*0.35)); if(c.flip) lg.scale(-1,1);
    let a=1-q, sx=1, sy=1, rot=0, dy=0;
    switch(c.estilo){ case "desmancha": sy=1-q; a=1; break; case "derrete": sy=Math.max(0.1,1-q*1.4); sx=1+q*0.8; break; case "evapora": dy=-q*12; a=1-q; break; case "cai": rot=Math.min(1,q*3)*1.45; a=q<.6?1:(1-q)*2.5; break;
      case "puff": case "estoura": sx=sy=1+q*0.6; a=1-q; break; case "estilhaca": case "desmonta": a=q<.15?1:0; break; case "chama": a=1-q; sy=1-q*0.5; break; case "penas": case "folhas": case "sapo": a=1-q*2; break; }
    lg.rotate(rot); lg.globalAlpha=Math.max(0,a); lg.translate(0,dy);
    lg.drawImage(c.estilo==="chama"? silhueta(c.spr,"#ff8a3d") : c.estilo==="evapora"? silhueta(c.spr,"#e8e0ff") : c.spr,-w/2*sx,-h*sy,w*sx,h*sy); lg.restore(); }
  lg.globalAlpha=1;
  if(J.sapos) for(const s of J.sapos){ const h=Math.max(0,Math.sin(s.f*6))*3; lg.fillStyle="#4f9a3c"; lg.fillRect(Math.round(s.x-ox)-1,Math.round(s.y-oy-h)-1,3,2); lg.fillStyle="#1a1418"; lg.fillRect(Math.round(s.x-ox),Math.round(s.y-oy-h)-2,1,1); } }
function desenharFalas(ox,oy){ if(!J.falas) return; ctx.textAlign="center"; ctx.font=`600 13px "Nunito", system-ui, sans-serif`;
  for(const f of J.falas){ const e=f.e, x=(e.x-ox)*S, y=(e.y-oy-(e.tam||10)*1.1-(1.6-f.vida)*6)*S, w=ctx.measureText(f.txt).width+10; ctx.globalAlpha=Math.min(1,f.vida*2);
    ctx.fillStyle="rgba(18,14,26,.82)"; ctx.fillRect(x-w/2,y-13,w,17); ctx.beginPath(); ctx.moveTo(x-3,y+4); ctx.lineTo(x+3,y+4); ctx.lineTo(x,y+8); ctx.fill(); ctx.fillStyle=f.cor; ctx.fillText(f.txt,x,y); }
  ctx.globalAlpha=1; }

// ================================================================ chefes: golpes característicos, perigos anunciados e segunda fase
// Regra de justiça: tudo o que machuca aparece antes como uma marca no chão (círculo, linha, cone ou anel).
function angDif(a,b){ let d=(a-b)%(Math.PI*2); if(d>Math.PI) d-=Math.PI*2; if(d<-Math.PI) d+=Math.PI*2; return d; }
function distSeg(px,py,x1,y1,x2,y2){ const dx=x2-x1, dy=y2-y1, L=dx*dx+dy*dy||1, t=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/L)); return Math.hypot(px-(x1+dx*t),py-(y1+dy*t)); }
function feriJogador(dano,el){ if(J.invuln>0||J.fim||J.deus) return false; if(J.chefeVivo) J.atingidoNoChefe=true; if(J.escudoGolpes>0){ J.escudoGolpes--; particulasEl(J.jogador.x,J.jogador.y,"luz",6,50); return false; } dano*=(J.reducao>0?0.7:1)*ameacaDiretor()*tal.defesa()*(1-custo("defesa")); if(J.escudo>0){ const a=Math.min(J.escudo,dano); J.escudo-=a; dano-=a; }
  J.vida-=dano; J.danoRec=(J.danoRec||0)+dano; R.st.recBala+=dano; tremor(2.5); som("dano"); particulas(J.jogador.x,J.jogador.y,COR[el]||"#ff5a4a",5,60); return true; }
function bala(dono,x,y,ang,vel,dano,proj,el,extra){ const el2=el==="multi"? escolha(ELS) : el;
  J.balas.push(Object.assign({x,y,vx:Math.cos(ang)*vel,vy:Math.sin(ang)*vel,vida:5,dano,proj:proj||"bola",el:el2,cor:COR[el2]||"#ff5a4a",dono,linhaVfx:dono&&dono.chefe?dono.golpeIdx||0:null},extra||{})); }
function perigo(o){ o.max=o.t; J.perigos.push(o); return o; }
function dentroPerigo(o,x,y,m){ m=m||0;
  if(o.tipo==="circ") return Math.hypot(x-o.x,y-o.y)<o.r+m;
  if(o.tipo==="linha") return distSeg(x,y,o.x,o.y,o.x2,o.y2)<o.larg/2+m;
  if(o.tipo==="cone"){ const d=Math.hypot(x-o.x,y-o.y); return d<o.r+m&&Math.abs(angDif(Math.atan2(y-o.y,x-o.x),o.a))<o.ab/2+0.1; }
  return false; }
function pintarSolo(x,y,r,tipo,dur){ const C0=Math.floor((x-r)/CEL), C1=Math.floor((x+r)/CEL), R0=Math.floor((y-r)/CEL), R1=Math.floor((y+r)/CEL);
  for(let cy=R0;cy<=R1;cy++) for(let cx=C0;cx<=C1;cx++){ const px=cx*CEL+4, py=cy*CEL+4; if((px-x)**2+(py-y)**2>r*r) continue;
    let t=tipo; if(t==="caos") t=escolha(["fogo","gelo","lama","sombra","luz","eletrico","vinha","agua"]); if(t==="agua"&&frio()) t="gelo";
    if(t==="eletrico"){ J.solo.set(cx+","+cy,{t:"eletrico",ate:J.t+(dur||6)}); continue; }
    J.solo.set(cx+","+cy,{t,ate:J.t+(dur??DUR[t]??30)}); } }
function criarProp(tipo,x,y,extra){ const C=J.cena; if(!C||!MAT[tipo]) return null; const cx=Math.floor(x/CH), cy=Math.floor(y/CH); gerarPedaco(cx,cy);
  const p=novoProp(tipo,x,y,Math.random); Object.assign(p,extra||{}); C.props.get(cx+":"+cy).push(p); C.lista.push(p); return p; }
const corG=(e,g)=> g.el&&g.el!=="multi"? COR[g.el] : COR[e.el]||"#ff5a4a";
const elG=(e,g)=> g.el==="multi"? escolha(ELS) : (g.el||e.el);
const D0=e=>e.dano*(e.mini?0.85:1);
function propsEm(x,y,r,fn){ if(!J.cena) return; for(const p of J.cena.lista){ if(p.morto) continue; if((p.x-x)**2+(p.y-y)**2<(r+p.r)**2) fn(p,Math.hypot(p.x-x,p.y-y)||1); } }
function empurrarProps(x,y,r,forca){ propsEm(x,y,r,(p,d)=>{ if(p.mat.fixo) return; const dv=Math.min(300,forca/p.m); p.vx+=(p.x-x)/d*dv; p.vy+=(p.y-y)/d*dv; });
  if(J.cena) for(const g of J.cena.destrocos){ const d=Math.hypot(g.x-x,g.y-y)||1; if(d<r){ g.vx+=(g.x-x)/d*120; g.vy+=(g.y-y)/d*120; g.vz+=60; } } }

// ---------------------------------------------------------------- inteligência do chefe
// cansaço: depois de 75 s de luta o chefe recebe cada vez mais dano (2x aos 105 s, 3x aos 135 s); evita lutas intermináveis em encontros desfavoráveis
function fadigaChefe(e){ if(!e.chefe||J.tChefe==null) return 1; return 1+Math.max(0,J.t-J.tChefe-75)/30; }
function anunciar(e,txt,sub){ J.anuncio={txt,sub:sub||"",vida:sub?3.2:1.8,cor:COR[e.el]||"#ffd34a"}; }
function iaChefe(e,dt,P){ const def=e.def;
  if(!def||!def.golpes){ return false; }
  const ia=e.ia||(e.ia={cd:2.2, idx:Math.floor(Math.random()*def.golpes.length), ocupado:0, fase:1, usados:{}, anuncio:0});
  if(ia.anuncio>0) ia.anuncio-=dt; e.tAtk=(e.tAtk||0)+dt; if(ia.trocaFase>0) ia.trocaFase-=dt;
  // salto em andamento
  if(e.noAr){ const s=e.noAr; s.t+=dt; const q=Math.min(1,s.t/s.dur); e.x=s.x0+(s.x1-s.x0)*q; e.y=s.y0+(s.y1-s.y0)*q; e.z=Math.sin(q*Math.PI)*34; if(q>=1){ e.noAr=null; e.z=0; } }
  // investida em andamento: atropela, quebra objetos, deixa rastro, derruba árvores
  if(e.dash){ const s=e.dash; s.t-=dt; const g=s.g||{};
    if(!s.acertou&&Math.hypot(P.x-e.x,P.y-e.y)<e.r+5){ if(feriJogador(D0(e)*1.1,elG(e,g))){ s.acertou=true; if(g.cura) e.hp=Math.min(e.max,e.hp+e.max*0.03); } }
    if(!g.voo) propsEm(e.x,e.y,e.r,(p,d)=>{ if(!p.mat.indestrutivel) danificarProp(p,p.max*2.5,elG(e,g)); if(!p.mat.fixo){ p.vx+=s.vx*0.6; p.vy+=s.vy*0.6; } });
    s.dist=(s.dist||0)+Math.hypot(s.vx,s.vy)*dt;
    if(g.rastro&&s.dist-(s.ultRastro||0)>6){ s.ultRastro=s.dist; pintarSolo(e.x,e.y,6,g.rastro,g.rastro==="fogo"?8:undefined); }
    if(g.tronco&&s.dist-(s.ultTronco||0)>40&&J.cena){ s.ultTronco=s.dist; const n=Math.hypot(s.vx,s.vy)||1, lado=Math.random()<.5?1:-1, x=e.x-s.vy/n*16*lado, y=e.y+s.vx/n*16*lado;
      const t=criarProp("tronco",x,y,{eixo:Math.abs(s.vx)>Math.abs(s.vy)?"v":"h"}); if(t){ t.vx=-s.vy/n*lado*90; t.vy=s.vx/n*lado*90; } particulas(x,y,"#3f7a34",10,60); }
    if(Math.random()<dt*20) particulas(e.x,e.y+e.r*0.5,"#c8b890",1,40);
    if(s.t<=0){ e.dash=null; tremor(2); } }
  // saquê: o Orochi vai atrás dos barris e fica bêbado se quebrar um
  if(J.cena&&!e.bebado) propsEm(e.x,e.y,e.r+2,p=>{ if(p.saque&&!p.morto){ p.hp=0; quebrar(p); e.bebado=4.5; evento("bebado"); ia.ocupado=0; e.parado=false; e.dash=null; anunciar(e,"Bêbado!","vulnerável por alguns segundos"); for(let i=0;i<10;i++) particulas(e.x,e.y-10,"#ffb0c0",1,30); } });
  if(e.bebado>0){ e.bebado-=dt; if(Math.random()<dt*3) particulas(e.x+rnd(-6,6),e.y-e.r*1.6,"#ffe0f0",1,15); return true; }
  // Caríbdis: na segunda fase, o redemoinho não para de puxar
  if(e.puxao&&J.dashT<=0){ const d=Math.hypot(P.x-e.x,P.y-e.y)||1; if(d<170){ P.x+=(e.x-P.x)/d*14*dt; P.y+=(e.y-P.y)/d*14*dt; } }
  if(ia.ocupado>0){ ia.ocupado-=dt; if(ia.ocupado<=0) e.parado=false; return true; }
  // segunda fase: o cenário muda
  if(e.chefe&&ia.fase===1&&e.hp<e.max*0.5&&def.fase2){ ia.fase=2; ia.trocaFase=1.4; faseDois(e,def.fase2); ia.ocupado=1.4; e.parado=true; return true; }
  // o Orochi persegue os barris de saquê quando existem
  if(J.cena&&J.cena.lista.some(p=>p.saque&&!p.morto)&&Math.random()<dt*0.4){ const b=J.cena.lista.find(p=>p.saque&&!p.morto); const a=Math.atan2(b.y-e.y,b.x-e.x); e.dash={vx:Math.cos(a)*130,vy:Math.sin(a)*130,t:Math.hypot(b.x-e.x,b.y-e.y)/130+0.1,g:{}}; }
  ia.cd-=dt*(ia.fase===2?1.35:1);
  if(Math.hypot(P.x-e.x,P.y-e.y)>170) ia.cd=Math.max(ia.cd,0.4);   // não gasta golpes fora da tela
  if(ia.cd<=0&&!e.dash&&!e.noAr){
    let tentativas=def.golpes.length;
    while(tentativas-->0){ const i=ia.idx%def.golpes.length; ia.idx++; const g=def.golpes[i];
      const dur=executarGolpe(e,g,P); if(dur<0) continue;
      e.golpeIdx=i; e.tAtk=0; ia.anuncio=0.6; anunciar(e,g.nome); ia.ocupado=dur; e.parado=dur>0.3; ia.cd=rnd(2.0,3.2)*(e.mini?1.25:1); break; }
    if(ia.cd<=0) ia.cd=1.5; }
  return true; }

// ---------------------------------------------------------------- as primitivas dos golpes
function executarGolpe(e,g,P){ const cor=corG(e,g), el=elG(e,g), C=J.cena;
  switch(g.tipo){
    case "leque": { const ondas=g.ondas||1, n=g.n||7, arco=g.arco||1;
      for(let w=0;w<ondas;w++) agendar(0.45+w*0.38,()=>{ if(e.hp<=0) return; const P=J.jogador, a0=Math.atan2(P.y-e.y,P.x-e.x);
        for(const lado of g.duplo?[-1,1]:[0]){ const x=e.x-Math.sin(a0)*lado*e.r, y=e.y+Math.cos(a0)*lado*e.r;
          for(let i=0;i<n;i++){ const a=arco>=6.2? a0+i/n*6.283+w*0.2 : a0+(n>1?(i/(n-1)-0.5):0)*arco+(w%2?0.08:0); bala(e,x,y,a,g.vel||72,D0(e)*0.6,g.proj,g.el||e.el,{quebra:g.quebra,cura:g.cura}); } }
        anel(e.x,e.y,e.r+4,cor,.25); });
      return 0.5+ondas*0.38; }
    case "espiral": { const br=g.bracos||6, dur=g.dur||4; let a=Math.random()*6.28;
      J.golpes.push({t:0,cd:0.4,atualizar(dt){ this.t+=dt; this.cd-=dt; if(e.hp<=0) return false; if(this.cd<=0){ this.cd=0.14; a+=0.31; for(let i=0;i<br;i++) bala(e,e.x,e.y,a+i/br*6.283,g.vel||58,D0(e)*0.45,g.proj,g.el||e.el,{solo:g.solo}); } return this.t<dur; }});
      return dur; }
    case "anel": { const ondas=g.ondas||2, n=g.n||12; for(let w=0;w<ondas;w++) agendar(0.4+w*0.42,()=>{ if(e.hp<=0) return; const off=w*Math.PI/n; for(let i=0;i<n;i++) bala(e,e.x,e.y,off+i/n*6.283,g.vel||60,D0(e)*0.5,g.proj,g.el||e.el); anel(e.x,e.y,e.r+8,cor,.3); });
      return 0.5+ondas*0.42; }
    case "chuva": { const n=g.n||6, r=g.r||16;
      for(let i=0;i<n;i++) agendar(i*0.17,()=>{ if(e.hp<=0&&!e.mini&&!e.chefe) return; const P=J.jogador, x=i===0?P.x+J.pvx*0.6:P.x+rnd(-75,75), y=i===0?P.y+J.pvy*0.6:P.y+rnd(-65,65);
        perigo({tipo:"circ",x,y,r,t:0.95,cor,queda:g.proj||"pedra",dono:e,linhaVfx:e.golpeIdx||0,fim:()=>impactoChuva(e,g,x,y,r)}); });
      return 0.5+n*0.17; }
    case "investida": { const n=g.n||1, vel=g.vel||240;
      const uma=i=>{ if(e.hp<=0) return; const P=J.jogador, a=Math.atan2(P.y-e.y,P.x-e.x), L=Math.min(200,Math.hypot(P.x-e.x,P.y-e.y)+55), x2=e.x+Math.cos(a)*L, y2=e.y+Math.sin(a)*L;
        perigo({tipo:"linha",x:e.x,y:e.y,x2,y2,larg:e.r*1.6,t:0.6,cor,fim:()=>{ if(e.hp>0) e.dash={vx:Math.cos(a)*vel,vy:Math.sin(a)*vel,t:L/vel,g}; }});
        if(i+1<n) agendar(0.65+L/vel+0.15,()=>uma(i+1)); };
      uma(0); return n*(0.8+180/vel)+0.2; }
    case "salto": { const n=g.n||1, r=g.r||28;
      const um=i=>{ if(e.hp<=0) return; const P=J.jogador, x=P.x+J.pvx*0.3, y=P.y+J.pvy*0.3; e.noAr={x0:e.x,y0:e.y,x1:x,y1:y,t:0,dur:0.85};
        perigo({tipo:"circ",x,y,r,t:0.85,cor,fim:()=>impactoSalto(e,g,x,y,r)}); if(i+1<n) agendar(1.0,()=>um(i+1)); };
      um(0); return n*1.0+0.2; }
    case "feixe": { const n=g.n||1, varre=g.varre||0, L=g.alcance||150, larg=g.larg||8, durA=varre>0?1.4:0.35, dir=Math.random()<.5?1:-1;
      const a0=Math.atan2(P.y-e.y,P.x-e.x)-dir*varre/2;
      for(let i=0;i<n;i++){ const a=a0+i/n*6.283; perigo({tipo:"linha",x:e.x,y:e.y,x2:e.x+Math.cos(a)*L,y2:e.y+Math.sin(a)*L,larg,t:0.95,cor,seta:varre>0?dir:0}); }
      agendar(0.95,()=>{ if(e.hp<=0) return; J.golpes.push({t:0,hit:0,ts:0,segs:[],atualizar(dt){ this.t+=dt; this.hit-=dt; this.ts-=dt; if(e.hp<=0) return false; const q=Math.min(1,this.t/durA), P=J.jogador;
        for(let i=0;i<n;i++){ const a=a0+i/n*6.283+dir*varre*q, x2=e.x+Math.cos(a)*L, y2=e.y+Math.sin(a)*L; this.segs[i]=[e.x,e.y,x2,y2];
          if(this.hit<=0&&distSeg(P.x,P.y,e.x,e.y,x2,y2)<larg/2+3&&feriJogador(D0(e)*0.9,el)) this.hit=0.35;
          if(C) for(const p of C.lista) if(!p.morto&&distSeg(p.x,p.y,e.x,e.y,x2,y2)<larg/2+p.r){ danificarProp(p,p.max*(g.quebra?4:1.5)*dt,el); if(!p.mat.fixo){ p.vx+=-Math.sin(a)*dir*80*dt; p.vy+=Math.cos(a)*dir*80*dt; } }
          if(this.ts<=0&&g.solo) for(let k=0;k<3;k++){ const t=Math.random(); pintarSolo(e.x+(x2-e.x)*t,e.y+(y2-e.y)*t,4,g.solo,g.solo==="fogo"?6:undefined); } }
        if(this.ts<=0) this.ts=0.06; return this.t<durA+0.15; },
        luz(ox,oy){ const a=1-Math.max(0,this.t-durA)/0.15; for(const [x1,y1,x2,y2] of this.segs){ lg.globalAlpha=0.35*a; lg.strokeStyle=cor; lg.lineWidth=larg; lg.beginPath(); lg.moveTo(x1-ox,y1-oy); lg.lineTo(x2-ox,y2-oy); lg.stroke();
          lg.globalAlpha=0.9*a; lg.lineWidth=Math.max(1,larg*0.35); lg.strokeStyle="#ffffff"; lg.beginPath(); lg.moveTo(x1-ox,y1-oy); lg.lineTo(x2-ox,y2-oy); lg.stroke(); } lg.lineWidth=1; lg.globalAlpha=1; }}); tremor(3); });
      return 0.95+durA+0.2; }
    case "onda": { const vmax=g.vmax||120, vel=g.vel||100; perigo({tipo:"circ",x:e.x,y:e.y,r:e.r+12,t:0.55,cor});
      agendar(0.55,()=>{ if(e.hp<=0) return; const cx=e.x, cy=e.y; tremor(3);
        if(g.cospe&&e.engolidos&&e.engolidos.length){ e.engolidos.forEach((tipo,i)=>{ const a=i/e.engolidos.length*6.283+Math.random()*0.3; bala(e,cx,cy,a,110,D0(e)*0.7,MAT[tipo]?.frag==="pedra"?"pedra":"barril",e.el,{quebra:true,deixa:tipo}); }); e.engolidos=[]; }
        J.golpes.push({r:e.r,acertou:false,ts:0,atualizar(dt){ this.r+=vel*dt; this.ts-=dt; const P=J.jogador, d=Math.hypot(P.x-cx,P.y-cy);
          if(!this.acertou&&Math.abs(d-this.r)<7&&feriJogador(D0(e)*0.8,el)){ this.acertou=true; if(g.atordoa){ J.atordoa=1.6; texto(P.x,P.y-14,"Atordoado!","#e8e0ff",13); } if(g.empurra){ P.x+=(P.x-cx)/(d||1)*14; P.y+=(P.y-cy)/(d||1)*14; } }
          if(C){ for(const p of C.lista){ if(p.morto||p.mat.fixo) continue; const dp=Math.hypot(p.x-cx,p.y-cy)||1; if(Math.abs(dp-this.r)<6+p.r){ const k=(g.empurra?160:70)/Math.max(3,p.m)*dt*10; p.vx+=(p.x-cx)/dp*k; p.vy+=(p.y-cy)/dp*k; } } }
          if(g.solo&&this.ts<=0){ this.ts=0.08; for(let k=0;k<8;k++){ const a=Math.random()*6.283; pintarSolo(cx+Math.cos(a)*this.r,cy+Math.sin(a)*this.r,4,g.solo); } }
          return this.r<vmax; },
          chao(ox,oy){ lg.strokeStyle=cor; lg.globalAlpha=0.7*(1-this.r/vmax*0.6); lg.lineWidth=3; lg.beginPath(); lg.ellipse(cx-ox,cy-oy,this.r,this.r*0.8,0,0,Math.PI*2); lg.stroke();
            lg.lineWidth=1; lg.globalAlpha=0.9; lg.strokeStyle="#ffffff"; lg.beginPath(); lg.ellipse(cx-ox,cy-oy,this.r,this.r*0.8,0,0,Math.PI*2); lg.stroke(); lg.globalAlpha=1; }}); });
      return 0.55+vmax/vel*0.4; }
    case "vortice": { const r=g.r||110, dur=g.dur||4, f=g.forca||60; perigo({tipo:"circ",x:e.x,y:e.y,r:e.r+14,t:0.6,cor});
      agendar(0.6,()=>{ if(e.hp<=0) return; J.golpes.push({t:0,hit:0,atualizar(dt){ this.t+=dt; this.hit-=dt; if(e.hp<=0) return false; const P=J.jogador, cx=e.x, cy=e.y, d=Math.hypot(P.x-cx,P.y-cy)||1;
          if(d<r&&J.dashT<=0){ const k=f*(1-d/r*0.5)*dt; P.x+=(cx-P.x)/d*k-(P.y-cy)/d*k*0.5; P.y+=(cy-P.y)/d*k+(P.x-cx)/d*k*0.5; }
          if(d<e.r+8&&this.hit<=0&&feriJogador(D0(e)*0.6,el)) this.hit=0.5;
          if(C){ for(const p of C.lista){ if(p.morto||p.mat.fixo) continue; const dp=Math.hypot(p.x-cx,p.y-cy)||1; if(dp>r) continue; const k=f*3/Math.max(2,p.m)*dt*10; p.vx+=(cx-p.x)/dp*k-(p.y-cy)/dp*k*0.6; p.vy+=(cy-p.y)/dp*k+(p.x-cx)/dp*k*0.6;
              if(dp<e.r+p.r&&g.engole){ p.morto=true; (e.engolidos=e.engolidos||[]).push(p.tipo); particulas(p.x,p.y,"#bfe6ff",6,50); } }
            for(const q of C.destrocos){ const dq=Math.hypot(q.x-cx,q.y-cy)||1; if(dq<r){ q.vx+=((cx-q.x)/dq*80-(q.y-cy)/dq*60)*dt; q.vy+=((cy-q.y)/dq*80+(q.x-cx)/dq*60)*dt; } }
            if(Math.random()<dt*25){ const a=Math.random()*6.28, rr=rnd(r*0.4,r); const p=particulaAr(C.kit.submerso?"bolhas":"poeira",cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,rnd(0,6)); p.vx=-Math.sin(a)*60; p.vy=Math.cos(a)*60; }
            if(g.solo&&Math.random()<dt*10) pintarSolo(cx+rnd(-r*.5,r*.5),cy+rnd(-r*.5,r*.5),6,g.solo); }
          return this.t<dur; },
          chao(ox,oy){ lg.strokeStyle=cor; for(let i=0;i<5;i++){ const a0=this.t*4+i*1.256; lg.globalAlpha=0.35; lg.beginPath(); for(let k=0;k<=12;k++){ const t=k/12, rr=r*(1-t)+e.r*t, a=a0+t*3; const x=e.x-ox+Math.cos(a)*rr, y=e.y-oy+Math.sin(a)*rr*0.8; k?lg.lineTo(x,y):lg.moveTo(x,y); } lg.stroke(); } lg.globalAlpha=1; }}); });
      return 0.6+dur; }
    case "invocar": { const n=g.n||4; if(g.some){ e.oculto=true; e.revoada=true; particulas(e.x,e.y,"#3a2a40",20,90); agendar(3,()=>{ e.oculto=false; e.revoada=false; anel(e.x,e.y,20,"#c070ff",.4); }); }
      for(let i=0;i<n;i++){ const P=J.jogador, a=i/n*6.283+Math.random()*0.3, rr=g.cerco?72:rnd(18,44), cx=g.cerco?P.x:e.x, cy=g.cerco?P.y:e.y, x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr;
        perigo({tipo:"circ",x,y,r:6,t:0.6,cor:"#a89878",fim:()=>{ if(J.fim||J.inimigos.length>DIF.max) return; spawnInimigo(g.k>=0?g.k:Math.floor(Math.random()*3)); const o=J.inimigos[J.inimigos.length-1]; o.x=x; o.y=y; o.surgindo=0.45; o.lacaio=true; }}); }
      return g.some? 3 : 0.9; }
    case "muralha": { const P=J.jogador, r=g.r||50, pts=[];
      if(g.mat==="escama"){ constricao(e,P,r); return 4.2; }
      if(g.forma==="anel"||g.forma==="prisao"){ const n=Math.max(8,Math.round(2*Math.PI*r/11)), gap=Math.floor(Math.random()*n); for(let i=0;i<n;i++){ if(g.forma==="anel"&&(i===gap||i===(gap+1)%n)) continue; const a=i/n*6.283; pts.push([P.x+Math.cos(a)*r,P.y+Math.sin(a)*r]); } }
      else if(g.forma==="cruz"){ for(let i=-5;i<=5;i++){ if(Math.abs(i)<2) continue; pts.push([P.x+i*11,P.y]); pts.push([P.x,P.y+i*11]); } }
      else { const a=Math.atan2(P.y-e.y,P.x-e.x)+Math.PI/2, mx=(P.x+e.x)/2, my=(P.y+e.y)/2; for(let i=-5;i<=5;i++) pts.push([mx+Math.cos(a)*i*11,my+Math.sin(a)*i*11]); }
      for(const [x,y] of pts) perigo({tipo:"circ",x,y,r:5,t:0.55,cor:"#c8b890",fim:()=>{ const tipo=g.mat==="multi"? escolha(["rocha","gelo","cristal","metal","arvore"]) : g.mat;
        criarProp(tipo,x,y,{subindo:0.35,temporario:12}); const P=J.jogador; if(Math.hypot(P.x-x,P.y-y)<7) feriJogador(D0(e)*0.35,el); particulas(x,y,"#a89878",4,40); }});
      tremor(2); return 1.0; }
    case "fissura": { const n=g.n||5, comp=g.comp||120, a0=Math.atan2(P.y-e.y,P.x-e.x);
      for(let i=0;i<n;i++){ const a=a0+i/n*6.283, x0=e.x, y0=e.y, x2=x0+Math.cos(a)*comp, y2=y0+Math.sin(a)*comp;
        perigo({tipo:"linha",x:x0,y:y0,x2,y2,larg:10,t:0.8,cor,fim:()=>J.golpes.push({t:0,L:0,acertou:false,pts:[[x0,y0]],atualizar(dt){ this.t+=dt; this.L=Math.min(comp,this.t*220); const fx=x0+Math.cos(a)*this.L, fy=y0+Math.sin(a)*this.L;
            const ult=this.pts[this.pts.length-1]; if(Math.hypot(fx-ult[0],fy-ult[1])>5) this.pts.push([fx+rnd(-2,2),fy+rnd(-2,2)]);
            if(Math.random()<.7) particulas(fx,fy,cor,2,50); if(g.solo&&Math.random()<.8) pintarSolo(fx,fy,4,g.solo,g.solo==="fogo"?8:undefined);
            const P=J.jogador; if(!this.acertou&&Math.hypot(P.x-fx,P.y-fy)<9&&feriJogador(D0(e)*0.9,el)) this.acertou=true;
            propsEm(fx,fy,6,p=>danificarProp(p,p.max*0.9,el)); return this.L<comp||this.t<comp/220+1.2; },
          chao(ox,oy){ const a=Math.min(1,(comp/220+1.2-this.t)); lg.globalAlpha=Math.max(0,a); lg.strokeStyle="#140f1c"; lg.lineWidth=2; lg.beginPath(); this.pts.forEach(([x,y],i)=>i?lg.lineTo(x-ox,y-oy):lg.moveTo(x-ox,y-oy)); lg.stroke();
            lg.strokeStyle=cor; lg.lineWidth=1; lg.beginPath(); this.pts.forEach(([x,y],i)=>i?lg.lineTo(x-ox,y-oy-1):lg.moveTo(x-ox,y-oy-1)); lg.stroke(); lg.globalAlpha=1; }})}); }
      return 1.0+comp/220; }
    case "tentaculos": { const n=g.n||6, iv=g.intervalo||0.45, r=g.r||14;
      for(let i=0;i<n;i++) agendar(i*iv,()=>{ if(e.hp<=0) return; const P=J.jogador, x=P.x+J.pvx*0.35, y=P.y+J.pvy*0.35;
        perigo({tipo:"circ",x,y,r,t:0.6,cor,fim:()=>{ const P=J.jogador; if(Math.hypot(P.x-x,P.y-y)<r) feriJogador(D0(e)*0.9,el); propsEm(x,y,r,p=>danificarProp(p,p.max*1.2,el)); empurrarProps(x,y,r+6,1500);
          if(g.solo) pintarSolo(x,y,r*0.7,g.solo); tremor(2); particulas(x,y,"#6a5038",8,60);
          J.golpes.push({t:0,atualizar(dt){ this.t+=dt; return this.t<0.65; },frente(ox,oy){ const sa=quadroEfeito(e,e.golpeIdx||0,Math.min(3,Math.floor(this.t/0.65*4)),28); if(sa){ lg.drawImage(sa,Math.round(x-ox-14),Math.round(y-oy-26)); return; } const h=Math.sin(Math.min(1,this.t/0.65)*Math.PI)*22, cc=g.solo==="vinha"?"#3f7a34":g.solo==="sombra"?"#3a2050":tom(e.cor,.8);
            for(let k=0;k<h;k++){ const w=Math.max(1,4-k*0.15); lg.fillStyle=k%3?cc:tom(cc,1.3); lg.fillRect(Math.round(x-ox-w/2+Math.sin(k*0.3+this.t*8)*2),Math.round(y-oy-k),Math.round(w),1); } }}); }}); });
      return n*iv+0.7; }
    case "sopro": { const ang=g.ang||0.9, L=g.alcance||100, a=Math.atan2(P.y-e.y,P.x-e.x);
      perigo({tipo:"cone",x:e.x,y:e.y,a,ab:ang,r:L,t:0.6,cor});
      agendar(0.6,()=>{ if(e.hp<=0) return; J.golpes.push({t:0,hit:0,ts:0,atualizar(dt){ this.t+=dt; this.hit-=dt; this.ts-=dt; if(e.hp<=0) return false; const P=J.jogador, d=Math.hypot(P.x-e.x,P.y-e.y), dentro=d<L&&Math.abs(angDif(Math.atan2(P.y-e.y,P.x-e.x),a))<ang/2;
          if(dentro&&this.hit<=0&&feriJogador(D0(e)*0.45,el)) this.hit=0.35; if(dentro&&g.empurra&&J.dashT<=0){ P.x+=Math.cos(a)*45*dt; P.y+=Math.sin(a)*45*dt; }
          if(C) for(const p of C.lista){ if(p.morto) continue; const dp=Math.hypot(p.x-e.x,p.y-e.y); if(dp>L||Math.abs(angDif(Math.atan2(p.y-e.y,p.x-e.x),a))>ang/2) continue; danificarProp(p,p.max*0.5*dt,el); if(g.empurra&&!p.mat.fixo){ p.vx+=Math.cos(a)*900/p.m*dt; p.vy+=Math.sin(a)*900/p.m*dt; } }
          for(let k=0;k<3;k++){ if(J.parts.length>450) J.parts.shift(); const aa=a+rnd(-ang/2,ang/2), v=rnd(L*0.9,L*1.6); J.parts.push({x:e.x+Math.cos(a)*e.r,y:e.y+Math.sin(a)*e.r,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v-8,vida:rnd(.4,.7),max:.7,cor:k?cor:tom(cor,1.4),tam:1+Math.floor(Math.random()*2)}); }
          if(g.solo&&this.ts<=0){ this.ts=0.04; const aa=a+rnd(-ang/2,ang/2), rr=rnd(e.r,L); pintarSolo(e.x+Math.cos(aa)*rr,e.y+Math.sin(aa)*rr,5,g.solo); }
          return this.t<1.3; }}); });
      return 2.0; }
    case "escuridao": J.escuroT=g.dur||5; J.escuroAlvo=0.82; particulas(e.x,e.y,"#140f1c",30,100,2); return 0.6;
    case "clones": { if(J.inimigos.some(o=>o.clone&&o.hp>0)) return -1;   // não relança enquanto houver cópias vivas
      const n=g.n||3, dur=Math.min(6,g.dur||6); for(let i=0;i<n;i++){ const P=J.jogador, a=i/n*6.283+Math.random(), x=P.x+Math.cos(a)*60, y=P.y+Math.sin(a)*60;
        spawnInimigo(0); const c=J.inimigos[J.inimigos.length-1]; Object.assign(c,{x,y,def:e.def,tam:e.tam,cor:e.cor,spr:e.spr,clone:true,elite:true,hp:e.max*0.02,max:e.max*0.02,dano:e.dano*0.5,v:e.v,r:e.r*0.8,esc:1,el:e.el,tipo:9,surgindo:0.3,vidaClone:dur});
        particulas(x,y,"#e8e0ff",10,50); }
      J.golpes.push({t:0,cd:1.5,atualizar(dt){ this.t+=dt; this.cd-=dt; const cl=J.inimigos.filter(o=>o.clone&&o.hp>0);
          for(const o of cl){ o.vidaClone-=dt; if(o.vidaClone<=0){ o.hp=0; particulas(o.x,o.y,"#e8e0ff",8,40); } }
          if(this.cd<=0){ this.cd=2.2; for(const o of cl){ const P=J.jogador, a=Math.atan2(P.y-o.y,P.x-o.x); for(let i=-1;i<=1;i++) bala(o,o.x,o.y,a+i*0.25,62,D0(e)*0.35,"estrela",e.el); } }
          return this.t<dur+0.5; }});
      const outro=J.inimigos.filter(o=>o.clone)[0]; if(outro){ const x=e.x, y=e.y; e.x=outro.x; e.y=outro.y; outro.x=x; outro.y=y; }
      return 0.8; }
    case "teleporte": { const P=J.jogador, a=Math.atan2(e.y-P.y,e.x-P.x)+Math.PI+rnd(-0.6,0.6), x=P.x+Math.cos(a)*48, y=P.y+Math.sin(a)*48; e.oculto=true; if(C) for(let i=0;i<4;i++) fumaca(e.x+rnd(-5,5),e.y,6,"#c8c8e0");
      perigo({tipo:"circ",x,y,r:22,t:0.6,cor,fim:()=>{ e.x=x; e.y=y; e.oculto=false; anel(x,y,22,cor,.4); const P=J.jogador; if(Math.hypot(P.x-x,P.y-y)<22) feriJogador(D0(e)*0.8,el); empurrarProps(x,y,26,1200); }});
      return 1.1; }
    case "regenerar": { if(e.regenerou||e.hp>e.max*0.6) return -1;
      if(g.metal){ const metais=C? C.lista.filter(p=>!p.morto&&p.mat.condutor&&dist2(p,e)<170*170) : []; if(!metais.length) return -1;
        metais.forEach((p,i)=>agendar(i*0.2,()=>{ if(p.morto) return; raio(p.x,p.y-p.r,e.x,e.y,"#9fe0ff"); p.morto=true; particulas(p.x,p.y,"#c8c8d0",10,60); e.hp=Math.min(e.max,e.hp+e.max*g.pct/2); }));
        e.regenerou=true; return 0.4+metais.length*0.2; }
      e.regenerou=true; J.golpes.push({t:0,atualizar(dt){ this.t+=dt; if(e.hp<=0) return false; e.hp=Math.min(e.max,e.hp+e.max*g.pct*dt/1.5); if(Math.random()<dt*20) particulas(e.x+rnd(-8,8),e.y+rnd(-8,8),"#7fe0a0",1,30); return this.t<1.5; }});
      return 1.5; }
    case "transmutar": { const r=g.r||60; anel(e.x,e.y,r,"#ffd34a",.7); propsEm(e.x,e.y,r,p=>transmutarProp(p)); if(g.solo) pintarSolo(e.x,e.y,r*0.8,g.solo); tremor(2); return 1.0; }
    case "mergulho": { e.oculto=true; e.mergulho=true; particulas(e.x,e.y,"#8a6a48",16,70); tremor(2);
      J.golpes.push({t:0,parou:false,atualizar(dt){ this.t+=dt; if(e.hp<=0){ e.oculto=false; e.mergulho=false; return false; } const P=J.jogador;
          if(!this.parou){ const dx=P.x-e.x, dy=P.y-e.y, d=Math.hypot(dx,dy)||1; e.x+=dx/d*115*dt; e.y+=dy/d*115*dt; if(g.rastro&&Math.random()<dt*14) pintarSolo(e.x,e.y,5,g.rastro); if(Math.random()<dt*14) particulas(e.x,e.y,"#8a6a48",1,30);
            if(d<6||this.t>2.2){ this.parou=true; const x=e.x, y=e.y, r=g.r||28; perigo({tipo:"circ",x,y,r,t:0.55,cor,fim:()=>{ e.oculto=false; e.mergulho=false; tremor(6); anel(x,y,r,cor,.5); particulas(x,y,"#8a6a48",24,120,2);
                const P=J.jogador; if(Math.hypot(P.x-x,P.y-y)<r) feriJogador(D0(e)*1.1,el); propsEm(x,y,r,p=>danificarProp(p,p.max*1.5,el)); empurrarProps(x,y,r+10,2500); }}); } }
          return !this.parou||e.mergulho; }});
      return 3.2; }
    case "tempestade": { const n=g.n||5, iv=g.intervalo||0.5, r=g.r||22;
      for(let i=0;i<n;i++) agendar(i*iv,()=>{ if(e.hp<=0) return; const P=J.jogador; let x=P.x+rnd(-24,24), y=P.y+rnd(-24,24), alvo=null;
        if(C) for(const p of C.lista) if(p.mat.condutor&&!p.morto&&Math.hypot(p.x-x,p.y-y)<60){ alvo=p; x=p.x; y=p.y-p.r; break; }
        perigo({tipo:"circ",x,y,r,t:0.75,cor:"#e8f0ff",fim:()=>{ if(C) cairRaio(x,y,alvo); else { anel(x,y,r,"#e8f0ff",.4); const P=J.jogador; if(Math.hypot(P.x-x,P.y-y)<r) feriJogador(D0(e),"raio"); } }}); });
      return n*iv+0.8; }
    case "bola": { for(let i=0;i<(g.n||1);i++){ const a=Math.atan2(P.y-e.y,P.x-e.x)+(i?0.8:0)+rnd(-0.2,0.2);
        J.golpes.push({x:e.x,y:e.y,vx:Math.cos(a)*150,vy:Math.sin(a)*150,r:g.r||6,t:0,giro:0,hitJ:0,neve:g.cresce,atualizar(dt){ this.t+=dt; this.hitJ-=dt; const P=J.jogador, ox=P.x-VW/2, oy=P.y-VH/2;
            this.x+=this.vx*dt; this.y+=this.vy*dt; this.giro+=Math.hypot(this.vx,this.vy)*dt/this.r;
            if(this.x<ox+this.r||this.x>ox+VW-this.r){ this.vx=-this.vx; this.x=Math.max(ox+this.r,Math.min(ox+VW-this.r,this.x)); }
            if(this.y<oy+this.r||this.y>oy+VH-this.r){ this.vy=-this.vy; this.y=Math.max(oy+this.r,Math.min(oy+VH-this.r,this.y)); }
            if(this.neve){ this.r=Math.min(15,this.r+Math.hypot(this.vx,this.vy)*dt*0.012); pintarSolo(this.x,this.y,this.r*0.6,"gelo",20); }
            propsEm(this.x,this.y,this.r,(p,d)=>{ if(p.mat.fixo||this.neve||p.m>100){ const nx=(this.x-p.x)/d, ny=(this.y-p.y)/d, vn=this.vx*nx+this.vy*ny; if(vn<0){ this.vx-=2*vn*nx; this.vy-=2*vn*ny; } } danificarProp(p,p.max*(this.neve?3:0.6),null); if(!p.mat.fixo){ p.vx+=this.vx*0.5; p.vy+=this.vy*0.5; } });
            if(this.hitJ<=0&&Math.hypot(P.x-this.x,P.y-this.y)<this.r+4&&feriJogador(D0(e)*0.8,e.el)){ this.hitJ=0.8; J.pvx+=this.vx*0.5; J.pvy+=this.vy*0.5; }
            const f=FONTE; FONTE="ambiente"; for(const o of J.inimigos) if(o!==e&&o.hp>0&&!o.chefe&&Math.hypot(o.x-this.x,o.y-this.y)<this.r+o.r){ danoSimples(o,pctMax(o,0.4)*dt*10); o.x+=this.vx*dt; o.y+=this.vy*dt; } FONTE=f;
            if(this.t>(g.dur||9)){ particulas(this.x,this.y,this.neve?"#f4f8ff":"#8a5a30",16,80); return false; } return true; },
          frente(ox,oy){ const x=Math.round(this.x-ox), y=Math.round(this.y-oy); lg.fillStyle="rgba(0,0,0,.3)"; lg.beginPath(); lg.ellipse(x,y+this.r*0.8,this.r,this.r*0.35,0,0,Math.PI*2); lg.fill();
            lg.fillStyle=this.neve?"#f0f6ff":"#6a4024"; lg.beginPath(); lg.arc(x,y,this.r,0,Math.PI*2); lg.fill(); lg.strokeStyle=this.neve?"#c8dcf0":"#2a1810"; lg.beginPath(); lg.arc(x,y,this.r*0.6,this.giro,this.giro+2.2); lg.stroke();
            lg.fillStyle="#ffffff"; lg.fillRect(x-Math.round(this.r*0.4),y-Math.round(this.r*0.5),1,1); }}); }
      return 0.7; }
    case "telecinese": { const r=g.r||90; let alvos=C? C.lista.filter(p=>!p.morto&&!p.mat.fixo&&p.m<120&&dist2(p,e)<r*r).slice(0,g.n||4) : [];
      if(alvos.length<2&&C) for(let i=0;i<2;i++){ const a=Math.random()*6.28; const p=criarProp("rocha",e.x+Math.cos(a)*24,e.y+Math.sin(a)*24,{subindo:0.3}); if(p) alvos.push(p); }
      alvos.forEach((p,i)=>{ p.levita=true; const P=J.jogador; perigo({tipo:"linha",x:p.x,y:p.y,x2:p.x+(P.x-p.x)*1.6,y2:p.y+(P.y-p.y)*1.6,larg:8,t:0.8+i*0.15,cor:"#e8a0ff",fim:()=>{ if(p.morto) return;
          const P=J.jogador, a=Math.atan2(P.y-p.y,P.x-p.x); p.morto=true; bala(e,p.x,p.y-6,a,190,D0(e)*0.8,"objeto",e.el,{spr:spriteProp(p),quebra:true,deixaLascas:p}); }}); });
      return 1.4+alvos.length*0.15; }
    case "avalanche": { const P=J.jogador, a=Math.atan2(P.y-e.y,P.x-e.x), ux=Math.cos(a), uy=Math.sin(a), px=-uy, py=ux, inicio=Math.max(VW,VH)*0.75, comp=Math.max(VW,VH)*1.8, gap=rnd(-30,30);
      const x0=P.x-ux*inicio, y0=P.y-uy*inicio; perigo({tipo:"linha",x:x0-px*comp/2,y:y0-py*comp/2,x2:x0+px*comp/2,y2:y0+py*comp/2,larg:g.larg?18:16,t:1.0,cor:"#e8f4ff"});
      agendar(1.0,()=>J.golpes.push({s:0,ts:0,acertou:false,atualizar(dt){ this.s+=(g.vel||70)*dt; this.ts-=dt; const cx=x0+ux*this.s, cy=y0+uy*this.s, P=J.jogador;
          const dp=(P.x-cx)*ux+(P.y-cy)*uy, lat=(P.x-cx)*px+(P.y-cy)*py; if(!this.acertou&&Math.abs(dp)<9&&Math.abs(lat-gap)>14&&feriJogador(D0(e)*1.0,"agua")){ this.acertou=true; P.x+=ux*20; P.y+=uy*20; }
          if(this.ts<=0){ this.ts=0.05; for(let k=0;k<10;k++){ const l=rnd(-comp/2,comp/2); if(Math.abs(l-gap)<14) continue; pintarSolo(cx+px*l,cy+py*l,5,g.solo||"gelo",30); } }
          propsEm(cx,cy,comp/2,p=>{ const d=(p.x-cx)*ux+(p.y-cy)*uy; if(Math.abs(d)<8) danificarProp(p,p.max*3,null); });
          this.c=[cx,cy]; return this.s<inicio*2+40; },
        frente(ox,oy){ if(!this.c) return; const [cx,cy]=this.c; for(let l=-comp/2;l<comp/2;l+=3){ if(Math.abs(l-gap)<14) continue; const x=cx+px*l-ox, y=cy+py*l-oy, h=5+Math.sin(l*0.7+this.s*0.3)*2;
            lg.fillStyle="#f4f8ff"; lg.fillRect(Math.round(x-ux*4),Math.round(y-uy*4-h),3,h+2); lg.fillStyle="#c8dcf0"; lg.fillRect(Math.round(x-ux*4),Math.round(y-uy*4+1),3,1); } }}));
      return 1.2; }
    case "terremoto": { const dur=g.dur||3, n=g.n||6;
      J.golpes.push({t:0,ts:0,atualizar(dt){ this.t+=dt; this.ts-=dt; if(this.ts<=0){ this.ts=0.22; tremor(3.5); if(C) for(const p of C.lista){ if(p.morto||Math.random()>.3) continue; if(!p.mat.fixo){ p.vx+=rnd(-40,40); p.vy+=rnd(-40,40); } danificarProp(p,p.max*0.12,null); }
          if(C) for(const q of C.destrocos){ q.vz+=rnd(10,40); } } return this.t<dur; }});
      for(let i=0;i<n;i++) agendar(0.3+i*dur/n,()=>{ const P=J.jogador, x=P.x+rnd(-70,70), y=P.y+rnd(-60,60); perigo({tipo:"circ",x,y,r:12,t:0.85,cor:"#a89878",queda:"pedra",fim:()=>impactoChuva(e,{proj:"pedra",deixa:Math.random()<.5?"rocha":null},x,y,12)}); });
      return dur+0.3; }
  }
  return 0.5; }

function impactoChuva(e,g,x,y,r){ const P=J.jogador, el=elG(e,g), cor=corG(e,g); impactoArte(e,x,y,Math.round(r*2.2));
  if(Math.hypot(P.x-x,P.y-y)<r) feriJogador(D0(e)*0.9,el);
  propsEm(x,y,r,p=>danificarProp(p,p.max*1.3,el)); empurrarProps(x,y,r+8,1800);
  anel(x,y,r,cor,.35); particulas(x,y,cor,10,80); tremor(2.5);
  if(g.proj==="abobora"){ anel(x,y,r+6,"#ff8a3d",.4); pintarSolo(x,y,r*0.8,"fogo"); if(J.cena) for(let i=0;i<8;i++) brasa(x+rnd(-5,5),y+rnd(-5,5),rnd(2,10)); }
  if(g.deixa&&J.cena){ if(g.deixa==="polvora_acesa"){ const p=criarProp("polvora",x,y); if(p) p.pavio=1.6; } else criarProp(g.deixa,x,y,{subindo:0.15}); }
  if(g.solo) pintarSolo(x,y,r*0.75,g.solo); }
function impactoSalto(e,g,x,y,r){ const P=J.jogador, el=elG(e,g), cor=corG(e,g); impactoArte(e,x,y,Math.round(r*2.2)); tremor(7); parar(0.04); anel(x,y,r,cor,.5); anel(x,y,r*0.5,"#ffffff",.3); particulas(x,y,"#c8b890",20,110,2);
  if(Math.hypot(P.x-x,P.y-y)<r) feriJogador(D0(e)*1.1,el);
  propsEm(x,y,r,p=>danificarProp(p,p.max*1.3,el)); empurrarProps(x,y,r+12,2600);
  if(g.fissura) for(let i=0;i<g.fissura;i++){ const a=Math.random()*6.283; executarFissuraCurta(x,y,a,r*1.6,cor); }
  if(g.deixa) for(let i=0;i<3;i++){ const a=i*2.09+Math.random(); criarProp(g.deixa,x+Math.cos(a)*(r+8),y+Math.sin(a)*(r+8),{subindo:0.3}); }
  if(g.solo==="eletrico"){ pintarSolo(x,y,r,"agua"); agendar(0.4,()=>pintarSolo(x,y,r,"eletrico",6)); } else if(g.solo) pintarSolo(x,y,r*0.8,g.solo); }
function executarFissuraCurta(x,y,a,L,cor){ const pts=[[x,y]]; let cx=x, cy=y; for(let s=0;s<L;s+=5){ cx+=Math.cos(a+rnd(-.4,.4))*5; cy+=Math.sin(a+rnd(-.4,.4))*5; pts.push([cx,cy]); }
  J.golpes.push({t:0,atualizar(dt){ this.t+=dt; return this.t<4; },chao(ox,oy){ lg.globalAlpha=Math.min(1,(4-this.t)); lg.strokeStyle="#140f1c"; lg.lineWidth=1; lg.beginPath(); pts.forEach(([x,y],i)=>i?lg.lineTo(x-ox,y-oy):lg.moveTo(x-ox,y-oy)); lg.stroke(); lg.globalAlpha=1; }}); }
function transmutarProp(p){ if(p.morto||p.mat.indestrutivel) return; const spr=p.spriteFixo||spriteProp(p); if(!spr) return; p.spriteFixo=silhuetaMundo(spr,"#e0b040"); p.ouro=true; p.mat=MAT.metal; p.hp=Infinity; p.max=Infinity; p.vx=p.vy=0; p.queima=0; p.pavio=0;
  particulas(p.x,p.y,"#ffd34a",8,50); }
// Jörmungandr: o corpo se enrola em volta e aperta; escape pela fresta ou com a esquiva
function constricao(e,P,r){ const cx=P.x, cy=P.y, gap=Math.random()*6.283;
  J.golpes.push({t:0,R:r,hit:0,atualizar(dt){ this.t+=dt; this.hit-=dt; const dur=4, q=Math.min(1,this.t/dur); this.R=r*(1-0.78*q*q); const rot=this.t*0.7, P=J.jogador, d=Math.hypot(P.x-cx,P.y-cy)||1;
      const aP=Math.atan2(P.y-cy,P.x-cx), naFresta=Math.abs(angDif(aP,gap+rot))<0.42;
      if(d>this.R-5&&d<this.R+6&&!naFresta&&J.dashT<=0){ if(this.hit<=0&&feriJogador(D0(e)*0.7,"agua")) this.hit=0.6; const lado=d<this.R?-1:1; P.x=cx+(P.x-cx)/d*(this.R+lado*7); P.y=cy+(P.y-cy)/d*(this.R+lado*7); }
      propsEm(cx,cy,this.R+4,(p,dp)=>{ if(Math.abs(dp-this.R)<7) danificarProp(p,p.max*2*dt*5,null); });
      this.rot=rot; return this.t<dur; },
    frente(ox,oy){ const n=Math.max(12,Math.round(2*Math.PI*this.R/5)); for(let i=0;i<n;i++){ const a=i/n*6.283+this.rot; if(Math.abs(angDif(a,gap+this.rot))<0.42) continue; const x=cx+Math.cos(a)*this.R-ox, y=cy+Math.sin(a)*this.R*0.85-oy;
        lg.fillStyle=i%2?tom(e.cor,1.15):e.cor; lg.beginPath(); lg.arc(x,y-3,3.2,0,Math.PI*2); lg.fill(); lg.fillStyle=tom(e.cor,1.5); lg.fillRect(Math.round(x)-1,Math.round(y)-5,1,1); } }}); }

// ---------------------------------------------------------------- segunda fase: o cenário muda
function faseDois(e,f){ const P=J.jogador, C=J.cena; anunciar(e,f.nome,f.desc); tremor(8); parar(0.1); J.flash={cor:COR[e.el]||"#ffffff",vida:.25}; anel(e.x,e.y,60,COR[e.el],.8);
  const cx=(P.x+e.x)/2, cy=(P.y+e.y)/2;
  switch(f.op){
    case "inundar": for(let i=0;i<220;i++){ const a=Math.random()*6.283, r=Math.sqrt(Math.random())*140; if(Math.random()<.2) continue; pintarSolo(cx+Math.cos(a)*r,cy+Math.sin(a)*r,6,"agua",60); }
      if(f.vapor) for(let i=0;i<40;i++){ const a=Math.random()*6.283, r=Math.random()*120; pintarSolo(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,"vapor"); }
      if(f.puxa) e.puxao=true; break;
    case "incendiar": for(let i=0;i<8;i++){ const a=i/8*6.283+Math.random()*0.3, gelo=f.gelo&&i%2; let x=e.x, y=e.y; for(let s=0;s<160;s+=5){ x+=Math.cos(a+rnd(-.3,.3))*5; y+=Math.sin(a+rnd(-.3,.3))*5; pintarSolo(x,y,4,gelo?"gelo":"fogo",gelo?40:16); } } break;
    case "congelar": pintarSolo(cx,cy,150,"gelo",60); if(C&&!C.kit.part.includes("neve")) C.kit.part=[...C.kit.part,"neve"]; break;
    case "escurecer": J.escuroFixo=0.78; break;
    case "floresta": pintarSolo(cx,cy,150,"grama",120); for(let i=0;i<40;i++){ const a=Math.random()*6.283, r=Math.random()*140; pintarSolo(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,"vinha",30); }
      for(let i=0;i<10;i++){ const a=Math.random()*6.283, r=rnd(55,125), x=P.x+Math.cos(a)*r, y=P.y+Math.sin(a)*r; agendar(i*0.12,()=>criarProp("arvore",x,y,{subindo:0.5})); } break;
    case "ruir": if(C) C.lista.filter(p=>!p.morto&&!p.mat.indestrutivel).forEach((p,i)=>agendar(i*0.06,()=>{ if(!p.morto) danificarProp(p,p.max*6,null); }));
      if(f.inunda) faseDois(e,{nome:"",desc:"",op:"inundar"}); if(f.pedras) for(let i=0;i<8;i++) agendar(0.3+i*0.2,()=>{ const x=P.x+rnd(-80,80), y=P.y+rnd(-70,70); perigo({tipo:"circ",x,y,r:14,t:0.9,cor:"#a89878",queda:"pedra",fim:()=>impactoChuva(e,{proj:"pedra",deixa:"rocha"},x,y,14)}); }); break;
    case "transmutar": if(C) C.lista.forEach((p,i)=>agendar(i*0.04,()=>transmutarProp(p))); anel(e.x,e.y,200,"#ffd34a",1); break;
    case "tempestade": if(C){ C.kit.relampago=true; C.tRaio=1; C.raioRapido=true; } break;
    case "arena": { const n=56, R0=105, g1=Math.floor(Math.random()*n), g2=(g1+n/2)|0; for(let i=0;i<n;i++){ if(Math.abs(i-g1)<2||Math.abs(i-g2)<2) continue; const a=i/n*6.283, x=P.x+Math.cos(a)*R0, y=P.y+Math.sin(a)*R0;
        agendar(i*0.02,()=>criarProp(f.mat==="multi"?escolha(["rocha","gelo","cristal","metal"]):f.mat,x,y,{subindo:0.4})); } break; }
    case "nevoa": if(C){ C.kit.nevoa=C.kit.nevoa||"#e8eef4"; for(let i=0;i<12;i++) C.nevoa.push({x:P.x+rnd(-1,1)*VW, y:P.y+rnd(-1,1)*VH, r:rnd(50,100), a:rnd(.22,.32), f:rnd(0,6)}); } break;
    case "secar": for(let cyy=-20;cyy<=20;cyy++) for(let cxx=-20;cxx<=20;cxx++){ const k0=Math.floor(cx/CEL)+cxx, k1=Math.floor(cy/CEL)+cyy, t=soloEm(k0,k1);
        if(t==="grama"||t==="vinha") J.solo.set(k0+","+k1,{t:"cinza",ate:J.t+90}); else if(t==="agua"||t==="lama") J.solo.set(k0+","+k1,{t:"vapor",ate:J.t+3}); }
      if(C) C.lista.forEach(p=>p.molhado=0); break;
    case "eletrificar": J.golpes.push({t:0,ts:0,tz:2,atualizar(dt){ this.t+=dt; this.ts-=dt; this.tz-=dt; if(e.hp<=0) return false; const P=J.jogador;
        if(this.ts<=0){ this.ts=1.6; for(let i=0;i<3;i++) pintarSolo(P.x+rnd(-90,90),P.y+rnd(-80,80),rnd(6,12),"agua",25); }
        if(this.tz<=0){ this.tz=2.6; const x=P.x+rnd(-60,60), y=P.y+rnd(-60,60); perigo({tipo:"circ",x,y,r:20,t:0.8,cor:"#fff3a0",fim:()=>{ for(let i=0;i<10;i++){ const a=Math.random()*6.283; aplicarElementoNoSolo(x+Math.cos(a)*rnd(0,20),y+Math.sin(a)*rnd(0,20),"raio"); } raio(x,y-30,x,y,"#fff3a0"); }}); }
        return true; }}); break;
    case "consagrar": pintarSolo(cx,cy,140,"luz",60); break;
    case "caos": pintarSolo(cx,cy,150,"caos",40); break;
    case "saque": for(let i=0;i<4;i++){ const a=i*1.57+Math.random()*0.5, r=rnd(55,85); agendar(i*0.2,()=>{ const b=criarProp("barril",P.x+Math.cos(a)*r,P.y+Math.sin(a)*r,{saque:true,subindo:0.3}); if(b) particulas(b.x,b.y,"#f2e7c9",8,40); }); }
      texto(P.x,P.y-24,"Empurre os barris de saquê até ele!","#f2e7c9",13); break;
    case "carvalho": { const a=Math.atan2(P.y-e.y,P.x-e.x)+rnd(-0.6,0.6), x=P.x+Math.cos(a)*110, y=P.y+Math.sin(a)*110; const c=criarProp("arvore",x,y,{carvalho:true,subindo:0.6});
      if(c){ c.hp=c.max=c.max*4; if(estruturaU()) sairDoAbismo(c,12); } e.imortal=true; e.carvalho=c; break; }
    case "naufragio": for(let i=0;i<10;i++) agendar(i*0.15,()=>{ const x=P.x+rnd(-90,90), y=P.y+rnd(-80,80), tipo=escolha(["caixote","barril","polvora","caixote","barril"]); perigo({tipo:"circ",x,y,r:10,t:0.9,cor:"#a89878",queda:tipo==="caixote"?"caixote":"barril",fim:()=>impactoChuva(e,{proj:"pedra",deixa:tipo},x,y,10)}); }); break;
    case "vendaval": if(C){ C.kit.vento*=2; C.kit.rajada=0.9; C.kit.redemoinho=true; C.tVort=0.5; } break;
  } }
// Koschei: a morte dele mora no ovo dentro do carvalho
function aoQuebrarProp(p){ if(p.carvalho){ const o=criarProp("ovo",p.x,p.y,{ovoMorte:true,subindo:0.2}); if(o&&estruturaU()) sairDoAbismo(o,6); texto(p.x,p.y-16,"O ovo da morte!","#fff3c4",14); }
  if(p.ovoMorte){ evento("ovo_morte"); const k=J.chefeVivo; texto(p.x,p.y-14,"A morte foi libertada!","#fff3c4",15); tremor(6); if(k&&k.imortal){ k.imortal=false; if(k.hp<=1) danoSimples(k,10); } } }

// ---------------------------------------------------------------- atualização e desenho do sistema de perigos
function atualizarPerigos(dt){ if(!J.perigos) return;
  for(const o of J.perigos){ o.t-=dt; if(o.t<=0&&o.fim){ const f=o.fim; o.fim=null; f(); } } J.perigos=J.perigos.filter(o=>o.t>0);
  J.golpes=J.golpes.filter(g=>{ try{ return g.atualizar(dt)!==false; }catch(err){ return false; } });
  if(J.escuroT>0){ J.escuroT-=dt; if(J.escuroT<=0) J.escuroAlvo=0; }
  const alvo=Math.max(J.escuroFixo||0,J.escuroAlvo||0); J.escuro=(J.escuro||0)+(alvo-(J.escuro||0))*Math.min(1,dt*2);
  if(J.atordoa>0) J.atordoa-=dt; if(J.anuncio){ J.anuncio.vida-=dt; if(J.anuncio.vida<=0) J.anuncio=null; } }
function desenharPerigos(ox,oy){ if(!J.perigos) return;
  for(const o of J.perigos){ const q=1-o.t/o.max, pul=0.5+0.5*Math.sin(J.t*18); lg.strokeStyle=o.cor; lg.fillStyle=o.cor; lg.lineWidth=1;
    if(o.tipo==="circ"){ lg.globalAlpha=0.12+0.25*q; lg.beginPath(); lg.ellipse(o.x-ox,o.y-oy,o.r*q,o.r*q*0.8,0,0,Math.PI*2); lg.fill(); lg.globalAlpha=0.5+0.4*pul*q; lg.beginPath(); lg.ellipse(o.x-ox,o.y-oy,o.r,o.r*0.8,0,0,Math.PI*2); lg.stroke(); }
    else if(o.tipo==="linha"){ const a=Math.atan2(o.y2-o.y,o.x2-o.x), L=Math.hypot(o.x2-o.x,o.y2-o.y); lg.save(); lg.translate(o.x-ox,o.y-oy); lg.rotate(a); lg.globalAlpha=0.12+0.22*q; lg.fillRect(0,-o.larg/2,L*q,o.larg); lg.globalAlpha=0.5+0.4*pul*q; lg.strokeRect(0,-o.larg/2,L,o.larg);
      if(o.seta){ lg.globalAlpha=0.8; for(let i=1;i<4;i++){ const xx=L*i/4; lg.beginPath(); lg.moveTo(xx,o.seta*o.larg); lg.lineTo(xx+3,o.seta*o.larg*1.6); lg.lineTo(xx-3,o.seta*o.larg*1.6); lg.fill(); } } lg.restore(); }
    else if(o.tipo==="cone"){ lg.globalAlpha=0.12+0.22*q; lg.beginPath(); lg.moveTo(o.x-ox,o.y-oy); lg.arc(o.x-ox,o.y-oy,o.r*q,o.a-o.ab/2,o.a+o.ab/2); lg.closePath(); lg.fill(); lg.globalAlpha=0.5+0.4*pul*q; lg.beginPath(); lg.moveTo(o.x-ox,o.y-oy); lg.arc(o.x-ox,o.y-oy,o.r,o.a-o.ab/2,o.a+o.ab/2); lg.closePath(); lg.stroke(); } }
  lg.globalAlpha=1;
  for(const g of J.golpes) if(g.chao) g.chao(ox,oy); }
const COR_PROJ={pedra:"#8a8478",osso:"#e8e0d0",moeda:"#e0b040",doce:"#f080c0",pocao:"#9a60e0",barril:"#8a5a30",caixote:"#8a5a30",abobora:"#e07a2a",cristal:"#c8f0ff",bala:"#2a2224",engrenagem:"#c8a050"};
function desenharQuedas(ox,oy){ if(!J.perigos) return;
  for(const o of J.perigos){ if(!o.queda) continue; const h=Math.round(o.t/o.max*90), x=Math.round(o.x-ox), y=Math.round(o.y-oy-h), cor=COR_PROJ[o.queda]||o.cor;
    if(o.dono){ const s=quadroEfeito(o.dono,o.linhaVfx,Math.floor(J.t*10)%4,16); if(s){ lg.drawImage(s,x-8,y-8); continue; } }
    lg.fillStyle=cor; if(o.queda==="estrela"){ lg.globalCompositeOperation="lighter"; lg.fillRect(x-1,y-3,2,7); lg.fillRect(x-3,y-1,7,2); lg.globalAlpha=.4; lg.fillRect(x,y-12,1,10); lg.globalAlpha=1; lg.globalCompositeOperation="source-over"; continue; }
    lg.fillRect(x-2,y-2,5,5); lg.fillStyle=tom(cor,1.35); lg.fillRect(x-2,y-2,2,2); if(o.queda==="abobora"){ lg.fillStyle="#ffd34a"; lg.fillRect(x,y,1,1); } }
  for(const g of J.golpes) if(g.frente) g.frente(ox,oy); }
function desenharGolpesLuz(ox,oy){ if(!J.golpes) return; for(const g of J.golpes) if(g.luz) g.luz(ox,oy); }
// balas com forma: cada chefe atira coisas que combinam com ele
function desenharBala(b,ox,oy){ const x=Math.round(b.x-ox), y=Math.round(b.y-oy), a=Math.atan2(b.vy,b.vx), cx=Math.round(Math.cos(a)*2), cy=Math.round(Math.sin(a)*2);
  if(b.spr){ lg.globalCompositeOperation="source-over"; lg.drawImage(b.spr,x-b.spr.width/2,y-b.spr.height/2); lg.globalCompositeOperation="lighter"; return; }
  if(b.linhaVfx!=null){ const s=quadroEfeito(b.dono,b.linhaVfx,Math.floor(J.t*10)%4,12); if(s){ lg.save(); lg.translate(x,y); lg.rotate(Math.atan2(b.vy,b.vx)); lg.drawImage(s,-6,-6); lg.restore(); return; } }
  const c=b.cor, p=b.proj;
  switch(p){
    case "lamina": case "pena": lg.fillStyle=c; lg.fillRect(x-cx,y-cy,1,1); lg.fillRect(x,y,1,1); lg.fillRect(x+cx,y+cy,1,1); lg.globalAlpha=.4; lg.fillRect(x-cx*2,y-cy*2,1,1); lg.globalAlpha=1; break;
    case "estrela": lg.fillStyle=c; lg.fillRect(x-1,y,3,1); lg.fillRect(x,y-1,1,3); lg.globalAlpha=.35; lg.fillRect(x-2,y-2,5,5); lg.globalAlpha=1; break;
    case "raio": lg.fillStyle="#fff3a0"; lg.fillRect(x,y,1,1); lg.fillRect(x+(Math.random()<.5?1:-1),y-1,1,1); lg.fillStyle=c; lg.globalAlpha=.4; lg.fillRect(x-1,y-1,3,3); lg.globalAlpha=1; break;
    case "chama": lg.fillStyle=Math.random()<.5?"#ffd34a":"#ff8a3d"; lg.fillRect(x-1,y-1,2,2); lg.globalAlpha=.4; lg.fillStyle="#e8603c"; lg.fillRect(x-cx-1,y-cy-1,3,3); lg.globalAlpha=1; break;
    case "gota": case "gelo": lg.fillStyle=c; lg.fillRect(x-1,y-1,2,2); lg.fillStyle="#ffffff"; lg.fillRect(x-1,y-1,1,1); break;
    case "pedra": case "osso": case "moeda": case "doce": case "pocao": case "barril": case "abobora": case "cristal": case "bala": case "engrenagem": case "objeto": {
      lg.globalCompositeOperation="source-over"; const cc=COR_PROJ[p]||c; lg.fillStyle=cc; lg.fillRect(x-1,y-1,3,3); lg.fillStyle=tom(cc,1.4); lg.fillRect(x-1,y-1,1,1);
      if(p==="bala"){ lg.globalAlpha=.3; lg.fillStyle="#c8c8d0"; lg.fillRect(x-cx*2-1,y-cy*2-1,2,2); lg.globalAlpha=1; } lg.globalCompositeOperation="lighter"; break; }
    case "folha": lg.fillStyle=c; lg.fillRect(x,y,2,1); break;
    case "nota": lg.fillStyle=c; lg.fillRect(x,y-2,1,3); lg.fillRect(x-1,y,2,1); break;
    default: lg.fillStyle=c; lg.globalAlpha=.4; lg.fillRect(x-2,y-2,5,5); lg.globalAlpha=1; lg.fillRect(x-1,y-1,2,2); } }
// escuridão: só a equipe, o fogo e os objetos em chamas iluminam
let ESCURO=null;
function desenharEscuridao(ox,oy){ if(!(J.escuro>0.02)||passiva("imune_escuro")) return; if(!ESCURO||ESCURO.width!==VW||ESCURO.height!==VH){ ESCURO=document.createElement("canvas"); ESCURO.width=VW; ESCURO.height=VH; }
  const g=ESCURO.getContext("2d"); g.globalCompositeOperation="source-over"; g.clearRect(0,0,VW,VH); g.fillStyle=`rgba(6,4,14,${J.escuro})`; g.fillRect(0,0,VW,VH); g.globalCompositeOperation="destination-out";
  const furo=(x,y,r)=>{ const gr=g.createRadialGradient(x-ox,y-oy,0,x-ox,y-oy,r); gr.addColorStop(0,"rgba(0,0,0,1)"); gr.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=gr; g.fillRect(x-ox-r,y-oy-r,r*2,r*2); };
  furo(J.jogador.x,J.jogador.y,46); ativos().forEach(s=>s.x!=null&&furo(s.x,s.y,16));
  if(J.cena){ for(const p of J.cena.lista){ if(p.queima>0) furo(p.x,p.y,30); if(p.tipo==="luz") furo(p.x,p.y-10,38); } let n=0; for(const [k,m] of J.solo){ if(m.t!=="fogo"&&m.t!=="luz"||m.ate<J.t) continue; const [a,b]=k.split(",").map(Number); if(++n>60) break; furo(a*CEL+4,b*CEL+4,14); } }
  lg.drawImage(ESCURO,-1,-1,VW+2,VH+2); }
// barra do chefe e anúncio do golpe
// aviso grande no alto da tela (chefe, eventos do mapa); sem chefe, fica um pouco abaixo do HUD
function desenharAnuncio(y){ if(!J.anuncio) return; if(y==null) y=Math.max(Math.round(H*0.2)+28, HUD_BAIXO+70);
  if(J.anuncio){ const a=J.anuncio; ctx.globalAlpha=Math.min(1,a.vida*1.5); ctx.textAlign="center"; ctx.font=`800 20px "Cinzel", Georgia, serif`; ctx.lineWidth=4; ctx.lineJoin="round"; ctx.strokeStyle="rgba(18,14,26,.9)"; ctx.strokeText(a.txt,W/2,y+36); ctx.fillStyle=a.cor; ctx.fillText(a.txt,W/2,y+36);
    if(a.sub){ ctx.font=`13px "Nunito", system-ui, sans-serif`; ctx.fillStyle="#f2e7c9"; const pal=a.sub.split(" "), linhas=[]; let l=""; for(const p of pal){ if((l+" "+p).length>44){ linhas.push(l); l=p; } else l=l?l+" "+p:p; } linhas.push(l); linhas.forEach((t,i)=>ctx.fillText(t,W/2,y+56+i*16)); }
    ctx.globalAlpha=1; } }
function desenharBarraChefe(){ const ch=J.chefeVivo&&J.chefeVivo.hp>0? J.chefeVivo : J.inimigos.find(e=>e.mini&&e.hp>0); if(!ch){ desenharAnuncio(); return; }
  const w=Math.min(W*0.84,420), x=(W-w)/2, y=Math.max(Math.round(H*0.2)+28, HUD_BAIXO+70), frac=Math.max(0,ch.hp/ch.max);
  ctx.globalAlpha=0.92; ctx.fillStyle="rgba(18,14,26,.85)"; ctx.fillRect(x-4,y-20,w+8,32); ctx.fillStyle="#3a2a30"; ctx.fillRect(x,y,w,7);
  ctx.fillStyle=ch.imortal? "#c8c8e0" : ch.chefe? "#d6ab4f" : "#e06a5a"; ctx.fillRect(x,y,w*frac,7); if(ch.chefe&&ch.def&&ch.def.fase2){ ctx.fillStyle="#f2e7c9"; ctx.fillRect(x+w*0.5-1,y-2,2,11); }
  ctx.textAlign="left"; ctx.font=`600 13px "Nunito", system-ui, sans-serif`; ctx.fillStyle="#f2e7c9"; ctx.fillText(ch.nome+(ch.imortal?" · Imortal":"")+(ch.bebado>0?" · Bêbado":"")+(fadigaChefe(ch)>1.2?" · Cansado":""),x,y-6);
  ctx.globalAlpha=1;
  desenharAnuncio(y);
  // seta para o carvalho do Koschei quando ele está fora da tela
  const c=ch.carvalho; if(c&&!c.morto){ const P=J.jogador, dx=c.x-P.x, dy=c.y-P.y; if(Math.abs(dx)>VW/2-8||Math.abs(dy)>VH/2-8){ const ang=Math.atan2(dy,dx), cx=W/2+Math.cos(ang)*Math.min(W,H)*0.4, cy=H/2+Math.sin(ang)*Math.min(W,H)*0.4;
      ctx.fillStyle="#7fe0a0"; ctx.beginPath(); ctx.moveTo(cx+Math.cos(ang)*12,cy+Math.sin(ang)*12); ctx.lineTo(cx+Math.cos(ang+2.5)*9,cy+Math.sin(ang+2.5)*9); ctx.lineTo(cx+Math.cos(ang-2.5)*9,cy+Math.sin(ang-2.5)*9); ctx.fill(); } } }

// ================================================================ desenho
let chao=null;
function gerarChao(u){ if(chaoArte(u)) return; const c=document.createElement("canvas"); c.width=c.height=64; const g=c.getContext("2d"), r=semente(u.id), base=COR[u.elemento];
  g.fillStyle=tom(base,0.26); g.fillRect(0,0,64,64);
  for(let i=0;i<260;i++){ g.fillStyle=r()<.5?tom(base,0.33):tom(base,0.2); g.fillRect(Math.floor(r()*64),Math.floor(r()*64),1+Math.floor(r()*2),1); }
  for(let i=0;i<5;i++){ g.fillStyle=tom(base,0.45); const x=Math.floor(r()*60), y=Math.floor(r()*60); g.fillRect(x,y,3,2); g.fillStyle=tom(base,0.15); g.fillRect(x,y+2,3,1); }
  chao={cv:c,u}; }
function decorEm(cx,cy){ const r=semente(chao.u.id+cx+":"+cy), out=[], n=Math.floor(r()*3);
  for(let i=0;i<n;i++) out.push({x:cx*96+r()*96, y:cy*96+r()*96, spr:gerarSprite(chao.u.id+"d"+Math.floor(r()*4),10+Math.floor(r()*8),tom(COR[chao.u.elemento],0.38),{olhos:tom(COR[chao.u.elemento],0.38)})});
  return out; }
function desenharVirado(spr,x,y,virar,lado){ const w=lado||spr.width, h=lado||spr.height; if(!virar){ desenharSprite(spr,x,y,w,h); return; }
  lg.save(); lg.translate(x+w,y); lg.scale(-1,1); desenharSprite(spr,0,0,w,h); lg.restore(); }
function desenhar(dt){
  const P=J.jogador; J.shake*=0.86; const tq=performance.now()/1000, sx=J.shake*(Math.sin(tq*53)*0.35+Math.sin(tq*29+1.3)*0.25), sy=J.shake*(Math.sin(tq*47+0.7)*0.35+Math.sin(tq*23+2.1)*0.25);
  // câmera com precisão menor que 1 pixel do mundo: as posições continuam inteiras (ox, oy), e a sobra desloca a tela inteira.
  // Assim a rolagem é contínua em vez de andar em saltos de um pixel do mundo (3 a 4 pixels da tela).
  const cx0=P.x-VW/2+sx, cy0=P.y-VH/2+sy, ox=Math.round(cx0), oy=Math.round(cy0);
  if(Q>1&&!SIM.ativo) lg.setTransform(Q,0,0,Q,(ox-cx0)*Q,(oy-cy0)*Q); else lg.setTransform(Q,0,0,Q,0,0);
  lg.imageSmoothingEnabled=!!chao.suave; lg.imageSmoothingQuality="high";
  // piso como padrão repetido: a amostragem dá a volta na borda, então não sobra linha de emenda entre um bloco e outro
  const TC=chao.tam||chao.cv.width, px=((ox%TC)+TC)%TC, py=((oy%TC)+TC)%TC, kc=TC/chao.cv.width;
  if(!chao.pat||chao.patCv!==chao.cv){ chao.pat=lg.createPattern(chao.cv,"repeat"); chao.patCv=chao.cv; }
  lg.save(); lg.translate(-px,-py); lg.scale(kc,kc); lg.fillStyle=chao.pat; lg.fillRect(0,0,(VW+TC)/kc,(VH+TC)/kc); lg.restore();
  lg.imageSmoothingEnabled=false;
  desenharDetalhesChao(ox,oy); desenharEstrutura(ox,oy);
  desenharSolo(ox,oy); desenharFauna(ox,oy,"agua"); desenharCenaChao(ox,oy); desenharFauna(ox,oy,"chao"); desenharPerigos(ox,oy); desenharVfx(ox,oy,"chao"); desenharCadaveres(ox,oy); desenharQuedasAbismo(ox,oy);
  const sombra=(x,y,w)=>sombraContato(x,y+0.5,w*1.2,0.55);
  // zonas no chão
  for(const z of J.zonas){ if(z.tipo==="circulo"||z.tipo==="rastro"||z.tipo==="chuva"){ lg.globalAlpha=0.18+0.06*Math.sin(J.t*8); lg.fillStyle=z.cor; lg.beginPath(); lg.arc(z.x-ox,z.y-oy,z.r,0,Math.PI*2); lg.fill(); lg.globalAlpha=1; }
    if(z.tipo==="portal"){ lg.strokeStyle=z.cor; lg.beginPath(); lg.arc(z.x-ox,z.y-oy,6+Math.sin(J.t*10)*1.5,0,Math.PI*2); lg.stroke(); } }
  for(const a of J.armadilhas){ lg.fillStyle=a.cor; lg.fillRect(Math.round(a.x-ox)-1,Math.round(a.y-oy)-1,3,3); lg.fillStyle="#120e1a"; lg.fillRect(Math.round(a.x-ox),Math.round(a.y-oy),1,1); }
  // ovos e filhotes
  for(const o of J.ovosMapa){ const s=spriteOvo(LINHA[o.id].elemento,o.rar), b=Math.round(Math.sin(J.t*5+o.x)*1.5); sombra(o.x-ox,o.y-oy+6,8);
    if(o.rar!=="comum"){ lg.globalCompositeOperation="lighter"; lg.globalAlpha=.25+.15*Math.sin(J.t*6); lg.fillStyle=o.rar==="lendario"?"#ffd34a":"#c4ccd8"; lg.beginPath(); lg.arc(o.x-ox,o.y-oy,9,0,Math.PI*2); lg.fill(); lg.globalAlpha=1; lg.globalCompositeOperation="source-over"; }
    lg.drawImage(s,o.x-ox-5,o.y-oy-6+b,10,12); }
  if(J.ovoAnc){ const o=J.ovoAnc, x=o.x-ox, y=o.y-oy, sp=spriteOvo(o.el,"lendario"), pul=0.5+0.5*Math.sin(J.t*4);
    lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.2+0.2*pul; lg.fillStyle=COR[o.el]; lg.fillRect(Math.round(x-3),Math.round(y-70),6,70);
    lg.beginPath(); lg.arc(x,y,14+3*pul,0,Math.PI*2); lg.fill(); lg.globalAlpha=1; lg.globalCompositeOperation="source-over";
    sombra(x,y+9,11); lg.drawImage(sp,x-10,y-18,20,24);
    if(x<6||y<6||x>VW-6||y>VH-6){ const cx=VW/2, cy=VH/2, ang=Math.atan2(y-cy,x-cx), m=Math.min((VW/2-10)/Math.abs(Math.cos(ang)||1e-6),(VH/2-10)/Math.abs(Math.sin(ang)||1e-6));
      const ax=cx+Math.cos(ang)*m, ay=cy+Math.sin(ang)*m; lg.fillStyle=COR[o.el]; lg.beginPath(); lg.moveTo(ax+Math.cos(ang)*6,ay+Math.sin(ang)*6);
      lg.lineTo(ax+Math.cos(ang+2.5)*5,ay+Math.sin(ang+2.5)*5); lg.lineTo(ax+Math.cos(ang-2.5)*5,ay+Math.sin(ang-2.5)*5); lg.fill(); } }
  for(const f of J.selvagens){ if(f.selando) continue; const s=spriteLinha(f.id,f.rar); sombra(f.x-ox,f.y-oy+5,8); lg.drawImage(s,Math.round(f.x-ox-s.width/2),Math.round(f.y-oy-s.height/2)+Math.round(Math.abs(Math.sin(J.t*10))*-2));
    lg.fillStyle="#fff3c4"; if(Math.floor(J.t*4)%2) lg.fillRect(Math.round(f.x-ox),Math.round(f.y-oy-s.height/2)-4,1,2); }
  desenharMoedasBaus(ox,oy);
  // gemas de XP: cristal pequeno (losango) com face clara e brilho piscando
  for(const g of J.gemas){ const x=g.x-ox, y=g.y-oy+Math.sin(J.t*4+g.x)*0.4; if(x<-4||y<-4||x>VW+4||y>VH+4) continue; const t=g.v>4?2.1:1.5;
    lg.fillStyle=tom(g.cor,0.6); lg.beginPath(); lg.moveTo(x,y-t*1.3); lg.lineTo(x+t,y); lg.lineTo(x,y+t*1.3); lg.lineTo(x-t,y); lg.closePath(); lg.fill();
    lg.fillStyle=g.cor; lg.beginPath(); lg.moveTo(x,y-t*1.3); lg.lineTo(x+t*0.75,y-t*0.1); lg.lineTo(x,y+t*0.9); lg.lineTo(x-t*0.75,y-t*0.1); lg.closePath(); lg.fill();
    lg.fillStyle="#ffffff"; lg.globalAlpha=0.85; lg.beginPath(); lg.moveTo(x,y-t*1.2); lg.lineTo(x+t*0.35,y-t*0.35); lg.lineTo(x,y-t*0.1); lg.lineTo(x-t*0.4,y-t*0.4); lg.closePath(); lg.fill(); lg.globalAlpha=1; }
  // totens entram na fila de profundidade junto com o resto (abaixo)
  // profundidade (2,5D): marcos, objetos, inimigos, equipe, Invocador e Lenda desenhados do fundo para a frente pelo pé
  desenharAltar(ox,oy);
  const fila=[]; desenharCenaObjetos(ox,oy,fila);
  for(const e of J.inimigos) fila.push({y:e.y+(e.tam||8)*0.63-(e.z||0)*0,f:()=>desenharInimigo(e,ox,oy,P)});
  for(const c of J.crias){ const t=c.gigante?6:3; lg.fillStyle=tom(c.cor,1.2); lg.fillRect(Math.round(c.x-ox)-t/2,Math.round(c.y-oy)-t/2,t,t); lg.fillStyle="#120e1a"; lg.fillRect(Math.round(c.x-ox),Math.round(c.y-oy),1,1); }
  for(const f of J.fantasmas){ lg.globalAlpha=f.vida*3; lg.drawImage(f.spr,Math.round(f.x-ox-f.spr.width/2),Math.round(f.y-oy-f.spr.height/2)); } lg.globalAlpha=1;
  fila.push({y:P.y+6,f:()=>{ sombra(P.x-ox,P.y-oy+6,13); if(J.invuln>0) lg.globalAlpha=Math.floor(J.t*14)%2? .6 : 1; desenharInvocador(P.x-ox,P.y-oy); lg.globalAlpha=1; }});
  R.selos.forEach(s=>{ if(s.mon) fila.push({y:s.y+ALVO_ARTE[est(s)]/2,f:()=>desenharSelo(s,ox,oy,sombra)}); });
  fila.push({y:P.y+3,f:()=>desenharLenda(ox,oy)});
  for(const t of J.totens) fila.push({y:t.y+1,f:()=>desenharTotem(t,ox,oy)});
  fila.sort((a,b)=>a.y-b.y); for(const it of fila){ lg.globalAlpha=1; it.f(); } lg.globalAlpha=1;
  desenharVfx(ox,oy,"frente"); desenharFauna(ox,oy,"ar"); desenharQuedas(ox,oy); desenharCenaAr(ox,oy); desenharFauna(ox,oy,"ceu"); J._nuvemFeita=false; desenharMapaLuz(ox,oy); desenharNuvens(ox,oy); desenharLuzAmbiente(ox,oy); desenharEscuridao(ox,oy);
  // luzes aditivas
  lg.globalCompositeOperation="lighter";
  for(const p of J.proj) desenharProjetil(p,ox,oy);
  for(const z of J.zonas) if(z.tipo==="espirito"){ lg.fillStyle=z.cor; lg.globalAlpha=.4; lg.fillRect(Math.round(z.x-ox)-3,Math.round(z.y-oy)-3,7,7); lg.globalAlpha=1; lg.fillRect(Math.round(z.x-ox)-1,Math.round(z.y-oy)-1,3,3); }
  for(const b of J.balas) desenharBala(b,ox,oy);
  for(const p of J.parts) desenharParticula(p,ox,oy);
  // anéis e raios com halo: traço largo e fraco por baixo, fino e forte por cima
  lg.lineCap="round"; lg.lineJoin="round";
  for(const f of J.efeitos){ const a=f.vida/f.max; lg.strokeStyle=f.cor; lg.fillStyle=f.cor;
    if(f.linha){ const n=6, pts=[[f.x-ox,f.y-oy]]; for(let i=1;i<n;i++){ const t=i/n; pts.push([f.x+(f.x2-f.x)*t-ox+rnd(-3.5,3.5), f.y+(f.y2-f.y)*t-oy+rnd(-3.5,3.5)]); } pts.push([f.x2-ox,f.y2-oy]);
      for(const [lw,al,cor] of [[3.5,0.25,f.cor],[1.3,0.9,f.cor],[0.5,1,"#ffffff"]]){ lg.globalAlpha=a*al; lg.strokeStyle=cor; lg.lineWidth=lw; lg.beginPath(); lg.moveTo(pts[0][0],pts[0][1]); for(const q of pts) lg.lineTo(q[0],q[1]); lg.stroke(); } }
    else { const r=f.r*(1.15-a*0.5); lg.globalAlpha=a*0.12; lg.beginPath(); lg.arc(f.x-ox,f.y-oy,r,0,Math.PI*2); lg.fill();
      lg.globalAlpha=a*0.3; lg.lineWidth=3; lg.stroke(); lg.globalAlpha=a*0.95; lg.lineWidth=0.9; lg.stroke(); } }
  lg.lineWidth=1; lg.lineCap="butt"; lg.lineJoin="miter";
  desenharCenaLuz(ox,oy); desenharGolpesLuz(ox,oy); desenharVfx(ox,oy,"luz");
  lg.globalAlpha=1; lg.globalCompositeOperation="source-over";
  // tela
  ctx.imageSmoothingEnabled=false; ctx.clearRect(0,0,W,H); ctx.drawImage(lo,0,0,VW*S,VH*S); desenharCamadaArte();
  desenharCenaBrilho(ox,oy); aplicarBloom();
  // luz quente em volta do jogador + vinheta das bordas: uma imagem pequena pronta, desenhada esticada (uma passada em vez de duas)
  ctx.imageSmoothingEnabled=true; ctx.drawImage(sobreposicao(J.desp>0?COR[elementoDe(ativos()[0])]:"#ffd68c",J.desp>0?.24:.16,J.vida/J.vidaMax<0.3?.8:.62),(P.x-ox-VW/2)*S-10,(P.y-oy-VH/2)*S-10,W+20,H+20); ctx.imageSmoothingEnabled=false;
  if(J.vida/J.vidaMax<0.3){ ctx.globalAlpha=0.12+0.08*Math.sin(J.t*8); ctx.fillStyle="#c8473b"; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1; }
  if(J.flash){ J.flash.vida-=dt||1/60; ctx.globalAlpha=Math.max(0,J.flash.vida); ctx.fillStyle=J.flash.cor; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1; if(J.flash.vida<=0) J.flash=null; }
  ctx.textAlign="center";
  // números: valores grandes abreviados ("5,3k"); com a tela cheia, só críticos e super efetivos aparecem
  const cheio=J.nums.length>12;
  // números: nascem com um pulo elástico, contorno escuro (lê em qualquer chão), crítico dourado com brilho; somem encolhendo
  ctx.lineJoin="round"; ctx.textBaseline="middle";
  for(const n of J.nums){ if(cheio&&n.tam<=13) continue; const idade=(n.max||0.8)-n.vida, v=n.v>=1000? (n.v/1000).toFixed(n.v>=10000?0:1).replace(".",",")+"k" : n.v;
    const pulo=idade<0.18? 1+Math.sin(idade/0.18*Math.PI)*0.55*(1-idade/0.18)+0.25*(1-idade/0.18) : 1, some=n.vida<0.22? 0.6+n.vida/0.22*0.4 : 1, esc=pulo*some*(1+(n.pop||0)*0.3);
    const crit=n.tam>=20, X=(n.x-ox)*S, Y=(n.y-oy)*S, fs=Math.round(n.tam*esc*(crit?1.1:1));
    ctx.globalAlpha=Math.min(1,n.vida*3); ctx.font=`900 ${fs}px "Nunito", system-ui, sans-serif`;
    ctx.lineWidth=Math.max(2.5,fs*0.2); ctx.strokeStyle="rgba(18,14,26,.92)"; ctx.strokeText(v,X,Y);
    if(crit){ const gr=ctx.createLinearGradient(0,Y-fs/2,0,Y+fs/2); gr.addColorStop(0,"#fffbe0"); gr.addColorStop(0.5,"#ffe066"); gr.addColorStop(1,"#ff9a3d"); ctx.fillStyle=gr; ctx.shadowColor="rgba(255,190,60,.85)"; ctx.shadowBlur=fs*0.5; }
    else ctx.fillStyle=n.cor;
    ctx.fillText(v,X,Y); ctx.shadowBlur=0; }
  ctx.textBaseline="alphabetic";
  for(const t of J.textos){ ctx.globalAlpha=Math.min(1,t.vida*2); const k=t.vida>0.95? 1+(t.vida-0.95)*4 : 1; ctx.font=`600 ${Math.round(t.tam*k)}px "Nunito", system-ui, sans-serif`; ctx.lineWidth=Math.max(2.5,t.tam*0.2); ctx.strokeStyle="rgba(18,14,26,.92)"; ctx.strokeText(t.t,(t.x-ox)*S,(t.y-oy)*S); ctx.fillStyle=t.cor; ctx.fillText(t.t,(t.x-ox)*S,(t.y-oy)*S); }
  ctx.globalAlpha=1; desenharFalas(ox,oy); desenharBarraChefe(); desenharAvisos(); desenharConquista(); desenharAbertura();
  if(toque){ ctx.strokeStyle="rgba(242,231,201,.35)"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(toque.ox,toque.oy,40,0,Math.PI*2); ctx.stroke(); ctx.fillStyle="rgba(242,231,201,.35)";
    const dx=toque.x-toque.ox, dy=toque.y-toque.oy, d=Math.min(40,Math.hypot(dx,dy)), a=Math.atan2(dy,dx); ctx.beginPath(); ctx.arc(toque.ox+Math.cos(a)*d,toque.oy+Math.sin(a)*d,14,0,Math.PI*2); ctx.fill(); }
}
// monstro da equipe: quadro da folha (ou imagem fixa) + "corpo" por código: antecipação e esticada no ataque,
// investida na direção do alvo, inclinação ao andar, virada suave, pulinho/respiração sem folha e pulo de tamanho ao evoluir
function desenharSelo(s,ox,oy,sombra){ movSelo(s);
  const anim=quadroAnimSelo(s), spr=anim||spriteSelo(s), x=s.x-ox, y=s.y-oy, alvo=spr._alvo||spr.width, pe=y+alvo/2, t=J.t;
  const dt=Math.min(0.1,Math.max(0,t-(s._td??t))); s._td=t; const vel=s._vel||0, anda=Math.min(1,vel/40), e=est(s);
  if(s._eAnt!=null&&s._eAnt!==e&&s._eMon===s.mon){ s._pop=1; luzFlash(s.x,s.y,COR[elementoDe(s)],60,0.5); particulas(s.x,s.y,COR[elementoDe(s)],14,60); }
  s._eAnt=e; s._eMon=s.mon; s._pop=Math.max(0,(s._pop||0)-dt*1.8);
  const fxAlvo=s.esq?-1:1; if(s._fx!=null&&s._fx!==fxAlvo) s._vira=1; s._fx=fxAlvo; s._vira=Math.max(0,(s._vira||0)-dt*7);
  let sx=1, sy=1, lunge=0, rot=0, hop=0;
  const ta=s.atkT!=null&&t>=s.atkT? t-s.atkT : 9;
  if(ta<0.06){ const k=ta/0.06; sy=1-0.13*k; sx=1+0.09*k; }                                            // antecipação: agacha
  else if(ta<0.42){ const k=(ta-0.06)/0.36, o=Math.sin(k*Math.PI*2)*(1-k); sy=1+0.15*o-0.13*(1-Math.min(1,k*5)); sx=1-0.1*o; lunge=Math.sin(Math.min(1,k*1.6)*Math.PI)*2.4; }   // estica e volta com mola
  rot=Math.max(-0.12,Math.min(0.12,(s._vx||0)/260));                                                    // inclina para onde anda
  if(!anim){ if(anda>0.1){ const f=Math.abs(Math.sin(t*12+s.x*0.01)); hop=f*1.8*anda; sy*=1-0.07*(1-f)*anda; sx*=1+0.05*(1-f)*anda; }
    else { const b=Math.sin(t*2.6+s.x*0.1); sy*=1+0.03*b; sx*=1-0.018*b; } }
  else if(anda<0.1){ const b=Math.sin(t*2.2+s.x*0.1); sy*=1+0.012*b; }
  if(s._vira>0){ const v=Math.sin(s._vira*Math.PI); sy*=1-0.1*v; sx*=1+0.07*v; hop+=v*1.2; }   // virou de lado: agacha e dá um pulinho
  const pk=1-s._pop, esc=s._pop>0? 1+0.32*Math.sin(pk*Math.PI*3)*(1-pk) : 1, fx=fxAlvo;
  sombra(x+lunge*fxAlvo*0.6,pe-1,alvo*0.75*(1-hop*0.06)*Math.min(1.2,esc)); sombraProjetada(spr,x,pe,spr.width,spr.height,s._fx<0,1);
  // luz do elemento: brilho no chão em volta dos pés (respira devagar; mais forte no Despertar e à noite)
  if(!SIM.ativo&&QUAL>0){ const cor=COR[elementoDe(s)], r=alvo*(J.desp>0?1.25:0.95), pul=0.5+0.5*Math.sin(t*2.4+s.x*0.05), a=(0.1+0.08*nivelEscuro()+0.04*pul)*(J.desp>0?2:1);
    lg.globalCompositeOperation="lighter"; lg.globalAlpha=Math.min(0.6,a); lg.drawImage(bolhaCor(cor),x-r,pe-r*0.42,r*2,r*0.84); lg.globalAlpha=Math.min(0.35,a*0.55); lg.drawImage(bolhaCor(cor),x-r*0.7,pe-alvo*0.55-r*0.5,r*1.4,r); lg.globalAlpha=1;
    // anel de equipe: elipse fina na cor do elemento com três marcas girando devagar (como a marcação de time dos jogos de ação)
    const ra=alvo*0.48, rb=ra*0.36, gi=t*0.9+s.x*0.01; lg.strokeStyle=cor; lg.lineWidth=0.8; lg.globalAlpha=0.55; lg.beginPath(); lg.ellipse(x,pe-0.5,ra,rb,0,0,Math.PI*2); lg.stroke();
    lg.lineWidth=1.4; lg.globalAlpha=0.9; for(let i=0;i<3;i++){ const a0=gi+i*Math.PI*2/3; lg.beginPath(); lg.ellipse(x,pe-0.5,ra,rb,0,a0,a0+0.6); lg.stroke(); }
    lg.globalAlpha=1; lg.globalCompositeOperation="source-over"; lg.lineWidth=1; }
  const w=spr.width, h=spr.height, peS=spr._pe||h;
  lg.save(); lg.translate(x+lunge*fxAlvo,pe-hop); lg.rotate(rot); lg.scale(fx*sx*esc,sy*esc);
  // contorno de luz na cor do elemento, por trás do corpo (lê em chão claro e brilha à noite)
  if(!SIM.ativo&&QUAL>0){ const sil=silhueta(spr,COR[elementoDe(s)]), d=0.9, a0=0.38+0.12*Math.sin(t*3+s.x*0.1);
    lg.globalAlpha=a0; for(const [ddx,ddy] of [[-d,0],[d,0],[0,-d],[0,d]]) lg.drawImage(sil,-w/2+ddx,-peS+ddy,w,h); lg.globalAlpha=1; }
  desenharSprite(spr,-w/2,-peS,w,h);
  if(s._pop>0){ lg.globalCompositeOperation="lighter"; lg.globalAlpha=Math.min(1,s._pop*1.2)*0.85; lg.drawImage(branco(spr),-w/2,-peS,w,h); lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }
  lg.restore();
  if(s.furia>0){ lg.fillStyle="#ff5a4a"; lg.fillRect(Math.round(x)-1,Math.round(pe-alvo)-3,2,1); } }
// totem do Xamã: poste de madeira esculpido com rosto, asas laterais e uma gema na cor do elemento que pulsa e ilumina o chão
function desenharTotem(t,ox,oy){ const x=t.x-ox, y=t.y-oy, tm=J.t+(t.x%7), pul=0.5+0.5*Math.sin(tm*4), cor=t.cor||"#9ff07a";
  sombraContato(x,y+0.5,9,0.5);
  lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.25+0.2*pul; lg.drawImage(bolhaCor(cor),x-11,y-4,22,8); lg.globalAlpha=0.35+0.25*pul; lg.drawImage(bolhaCor(cor),x-6,y-19,12,12); lg.globalAlpha=1; lg.globalCompositeOperation="source-over";
  const pau=lg.createLinearGradient(x-2.5,0,x+2.5,0); pau.addColorStop(0,"#3a2416"); pau.addColorStop(0.45,"#8a5a32"); pau.addColorStop(1,"#4a2c18");
  lg.fillStyle=pau; lg.beginPath(); lg.moveTo(x-2.4,y); lg.lineTo(x-2.1,y-11); lg.quadraticCurveTo(x,y-13.5,x+2.1,y-11); lg.lineTo(x+2.4,y); lg.closePath(); lg.fill();
  lg.fillStyle="#5a3a20"; lg.beginPath(); lg.moveTo(x-2.2,y-9); lg.lineTo(x-5,y-11); lg.lineTo(x-2.2,y-7); lg.moveTo(x+2.2,y-9); lg.lineTo(x+5,y-11); lg.lineTo(x+2.2,y-7); lg.fill();   // asas
  lg.fillStyle="#1a0e08"; lg.fillRect(x-1.4,y-6.2,1,0.8); lg.fillRect(x+0.4,y-6.2,1,0.8); lg.fillRect(x-1,y-4,2,0.6);   // rosto
  lg.strokeStyle="#2a180c"; lg.lineWidth=0.4; lg.beginPath(); lg.moveTo(x-2.2,y-2.5); lg.lineTo(x+2.2,y-2.5); lg.moveTo(x-2.1,y-8.2); lg.lineTo(x+2.1,y-8.2); lg.stroke();
  lg.fillStyle=cor; lg.beginPath(); lg.arc(x,y-13,1.7+0.3*pul,0,Math.PI*2); lg.fill(); lg.fillStyle="#ffffff"; lg.globalAlpha=0.8; lg.beginPath(); lg.arc(x-0.5,y-13.5,0.6,0,Math.PI*2); lg.fill(); lg.globalAlpha=1; lg.lineWidth=1; }
// Invocador: o herói da tela inicial, visto de costas em 3/4 (como na capa): cabelo castanho arrepiado, cachecol azul-marinho,
// capa creme com estrela e borda dourada que esvoaça para trás, ombreiras e braçadeiras de bronze, túnica azul-marinho,
// perneiras e botas de couro e espada longa com guarda dourada (a lâmina brilha na cor do elemento do primeiro monstro).
// Desenhado em vetor (nítido em qualquer resolução), com passada, respiração, capa ao vento e balanço da espada.
function desenharInvocador(x,y){
  const vel=Math.hypot(J.pvx||0,J.pvy||0), anda=Math.min(1,vel/30), t=J.t, fase=t*10;
  const lado=(J.dir&&J.dir.x<-0.1)? -1 : (J.dir&&J.dir.x>0.1)? 1 : (desenharInvocador.lado||1); desenharInvocador.lado=lado;
  const a0=ativos()[0], el=a0? elementoDe(a0) : (R.pacto&&R.pacto[0]), cor=COR[el]||"#7fe0ff";
  const passo=Math.sin(fase)*anda, pulo=Math.abs(Math.cos(fase))*anda*0.7, resp=Math.sin(t*2.1)*0.25*(1-anda), vento=Math.sin(t*1.6)+0.5*Math.sin(t*2.9+1);
  const navy="#232a4e", navyC="#353f6e", creme="#efe2c2", cremeS="#c9b48c", ouro="#e3b65a", ouroE="#8f6a24", bronze="#b07a3a", bronzeE="#6e4a22", couro="#6b4426", couroE="#432a16", cabelo="#5a3418", cabeloC="#8a5428", pele="#e4b98e";
  lg.save(); lg.translate(x,y+6-pulo); lg.scale(lado*1.18,1.18); lg.lineJoin="round"; lg.lineCap="round";
  const linha=(w,c)=>{ lg.lineWidth=w; lg.strokeStyle=c; lg.stroke(); }, contorno=()=>linha(0.42,"rgba(18,10,6,.9)");
  // ---- capa (atrás de tudo): presa nos ombros, cai e esvoaça para trás; mais aberta ao correr
  const ab=3.4+anda*4.4+vento*0.9, fim=-0.6+anda*1.4, ond=t*(5+anda*5);
  const capa=(dx,dy)=>{ lg.beginPath(); lg.moveTo(-2.6+dx,-17.6+dy);
    lg.bezierCurveTo(-4.5-ab*0.3,-13,-5.2-ab*0.75,-7,-5.6-ab+dx,fim+Math.sin(ond)*0.6);
    lg.lineTo(-4-ab*0.8,fim+0.9+Math.sin(ond+1.2)*0.5); lg.lineTo(-2.6-ab*0.6,fim+0.2+Math.sin(ond+2.2)*0.5); lg.lineTo(-1.2-ab*0.4,fim+1+Math.sin(ond+3)*0.4); lg.lineTo(0.2-ab*0.2,fim+0.3);
    lg.bezierCurveTo(0.6,-6,1.6,-12,2.4+dx,-17.6+dy); lg.closePath(); };
  lg.fillStyle=cremeS; capa(-0.3,0.3); lg.fill();
  const gc=lg.createLinearGradient(-6,0,2,0); gc.addColorStop(0,cremeS); gc.addColorStop(0.55,creme); gc.addColorStop(1,"#fff6dc"); lg.fillStyle=gc; capa(0,0); lg.fill(); contorno();
  // borda dourada e estrela bordada na capa
  lg.beginPath(); lg.moveTo(-5.6-ab,fim+Math.sin(ond)*0.6); lg.lineTo(-4-ab*0.8,fim+0.9+Math.sin(ond+1.2)*0.5); lg.lineTo(-2.6-ab*0.6,fim+0.2+Math.sin(ond+2.2)*0.5); lg.lineTo(-1.2-ab*0.4,fim+1+Math.sin(ond+3)*0.4); lg.lineTo(0.2-ab*0.2,fim+0.3); linha(0.7,ouro);
  lg.save(); lg.translate(-3.4-ab*0.55,-6.2); lg.rotate(-0.2-ab*0.03); lg.fillStyle=ouro; lg.beginPath(); for(let i=0;i<8;i++){ const r=i%2?0.7:1.9, an=i/8*Math.PI*2-Math.PI/2; lg.lineTo(Math.cos(an)*r,Math.sin(an)*r); } lg.closePath(); lg.fill(); lg.restore();
  // ---- pernas: calça de couro com faixas e botas (passada alternada, joelho dobra)
  const perna=(px,k)=>{ const sw=passo*k, pe=px+sw*2.2, ly=-Math.max(0,-sw)*1.1, jx=px+sw*1.2;
    lg.beginPath(); lg.moveTo(px-0.95,-9.6); lg.lineTo(jx-1,-5); lg.lineTo(pe-0.9,ly-2.4); lg.lineTo(pe+0.9,ly-2.4); lg.lineTo(jx+1,-5); lg.lineTo(px+0.95,-9.6); lg.closePath(); lg.fillStyle=k>0?couro:couroE; lg.fill(); contorno();
    lg.strokeStyle=couroE; lg.lineWidth=0.3; for(const yy of [-8,-6.6,-4]){ lg.beginPath(); lg.moveTo(px-0.9+(yy+9.6)*sw*0.25,yy); lg.lineTo(px+0.9+(yy+9.6)*sw*0.25,yy+0.4); lg.stroke(); }
    lg.beginPath(); lg.moveTo(pe-1.05,ly-2.8); lg.lineTo(pe+1.05,ly-2.8); lg.lineTo(pe+1.25+0.9,ly-0.2); lg.lineTo(pe-1.05,ly-0.2); lg.closePath(); lg.fillStyle="#3a2414"; lg.fill(); contorno();
    lg.fillStyle="#8a6a44"; lg.fillRect(pe-1.05,ly-2.9,2.1,0.55); };
  perna(-1.1,-1); perna(1.1,1);
  // ---- túnica: saia azul-marinho com painel creme e barra dourada
  const sk=passo*0.5;
  lg.beginPath(); lg.moveTo(-2.7,-11.2); lg.lineTo(-3.3+sk,-6.4); lg.lineTo(3.2+sk,-6.4); lg.lineTo(2.7,-11.2); lg.closePath(); lg.fillStyle=navy; lg.fill(); contorno();
  lg.beginPath(); lg.moveTo(0.2,-10.8); lg.lineTo(0.6+sk,-6.6); lg.lineTo(2.1+sk,-6.6); lg.lineTo(1.6,-10.8); lg.closePath(); lg.fillStyle=creme; lg.fill();
  lg.beginPath(); lg.moveTo(-3.3+sk,-6.5); lg.lineTo(3.2+sk,-6.5); linha(0.5,ouro);
  // ---- tronco: gibão azul com cinto de couro e fivela
  const ty=resp;
  lg.beginPath(); lg.moveTo(-2.9,-17.4+ty); lg.quadraticCurveTo(-3.2,-14,-2.6,-11); lg.lineTo(2.6,-11); lg.quadraticCurveTo(3.2,-14,2.9,-17.4+ty); lg.closePath();
  const gt=lg.createLinearGradient(-3,0,3,0); gt.addColorStop(0,navy); gt.addColorStop(0.6,navyC); gt.addColorStop(1,navy); lg.fillStyle=gt; lg.fill(); contorno();
  lg.fillStyle=couroE; lg.fillRect(-2.8,-11.9,5.6,1); lg.fillStyle=ouro; lg.fillRect(-0.55,-12,1.1,1.2);
  lg.strokeStyle=bronzeE; lg.lineWidth=0.35; lg.beginPath(); lg.moveTo(-1.6,-16.5+ty); lg.lineTo(-1.9,-12.4); lg.moveTo(1.6,-16.5+ty); lg.lineTo(1.9,-12.4); lg.stroke();
  // ---- braço de trás (bronze), balança com a passada
  const bt=-passo*1.6; lg.beginPath(); lg.moveTo(-2.7,-16.6+ty); lg.lineTo(-3.4+bt*0.4,-13.4); lg.lineTo(-3.2+bt,-10.6); linha(1.5,bronzeE); lg.beginPath(); lg.arc(-3.2+bt,-10.4,0.7,0,Math.PI*2); lg.fillStyle=pele; lg.fill();
  // ---- cachecol azul-marinho caindo nas costas
  lg.beginPath(); lg.moveTo(-2.4,-18.2+ty); lg.quadraticCurveTo(0,-19.4+ty,2.4,-18.2+ty); lg.quadraticCurveTo(1.4,-16+ty,0,-15.6+ty); lg.quadraticCurveTo(-1.6,-16+ty,-2.4,-18.2+ty); lg.fillStyle=navy; lg.fill(); contorno();
  lg.beginPath(); lg.moveTo(-0.6,-16+ty); lg.quadraticCurveTo(-1.6-ab*0.25,-14.5,-2.2-ab*0.45,-13.4+Math.sin(ond+0.5)*0.4); linha(0.9,navyC);
  // ---- cabeça de costas: nuca, orelha e bochecha do lado para onde olha, cabelo arrepiado que balança
  const hy=-20.6+ty, bal=Math.sin(t*3)*0.25*(1+anda*2);
  lg.beginPath(); lg.ellipse(0.2,hy,2.1,2.3,0,0,Math.PI*2); lg.fillStyle=pele; lg.fill(); contorno();
  lg.beginPath(); lg.ellipse(1.9,hy+0.3,0.45,0.7,0.2,0,Math.PI*2); lg.fillStyle="#d4a678"; lg.fill();
  // cabelo: massa arredondada com mechas desiguais puxadas para trás pelo vento (não uma coroa)
  lg.beginPath(); lg.moveTo(1.9,hy+0.4); lg.quadraticCurveTo(2.5,hy-1.6,1.6,hy-2.9);
  lg.quadraticCurveTo(1.1,hy-4.1,0.1,hy-3.7+bal*0.3); lg.quadraticCurveTo(-0.6,hy-4.6,-1.4,hy-3.6);
  lg.quadraticCurveTo(-2.6-bal,hy-4,-3.1-bal,hy-2.6); lg.quadraticCurveTo(-2.4,hy-2.4,-2.6,hy-1.9);
  lg.quadraticCurveTo(-3.6-bal,hy-1.4,-3.5-bal*1.2,hy-0.2); lg.quadraticCurveTo(-2.7,hy-0.5,-2.4,hy+0.2);
  lg.quadraticCurveTo(-2.9-bal,hy+0.8,-2.6-bal,hy+1.6); lg.quadraticCurveTo(-1.4,hy+1.3,-0.4,hy+1.6); lg.quadraticCurveTo(0.8,hy+1.2,1.2,hy+0.4); lg.closePath();
  const gh=lg.createLinearGradient(0,hy-4,0,hy+1.6); gh.addColorStop(0,cabeloC); gh.addColorStop(1,cabelo); lg.fillStyle=gh; lg.fill(); contorno();
  lg.beginPath(); lg.moveTo(-0.4,hy-3.2); lg.quadraticCurveTo(-1.4,hy-2.2,-2.4,hy-1.6); lg.moveTo(0.8,hy-2.6); lg.quadraticCurveTo(0,hy-1.2,-1.4,hy-0.4); linha(0.3,"#a8743a");
  // ---- ombreiras douradas
  const ombro=(ox,oy,r)=>{ lg.beginPath(); lg.ellipse(ox,oy,r,r*0.75,0,0,Math.PI*2); const go=lg.createRadialGradient(ox-r*0.3,oy-r*0.4,0.1,ox,oy,r); go.addColorStop(0,"#ffe4a0"); go.addColorStop(0.6,ouro); go.addColorStop(1,ouroE); lg.fillStyle=go; lg.fill(); contorno(); };
  ombro(-2.7,-17.5+ty,1.5); ombro(2.7,-17.4+ty,1.6);
  // ---- braço da frente (bronze) com a espada longa, ponta para baixo e para a frente; parado, levanta um pouco
  const hx=3.4+passo*0.6, hyM=-12.2+ty, ang=anda>0.2? 0.95 : 0.7+Math.sin(t*1.3)*0.05, L=12, ca=Math.cos(ang), sa=Math.sin(ang);
  lg.beginPath(); lg.moveTo(2.8,-16.6+ty); lg.lineTo(3.6,-14.2+ty); lg.lineTo(hx,hyM); linha(1.6,bronze); lg.beginPath(); lg.moveTo(3.3,-14.6+ty); lg.lineTo(hx,hyM); linha(0.5,"#e0a860");
  lg.save(); lg.translate(hx,hyM); lg.rotate(ang);
  lg.beginPath(); lg.moveTo(-2.2,0); lg.lineTo(0,0); linha(1,"#3a2414");                                                   // cabo
  lg.beginPath(); lg.arc(-2.5,0,0.65,0,Math.PI*2); lg.fillStyle=cor; lg.fill(); contorno();                                 // pomo com gema do elemento
  lg.beginPath(); lg.moveTo(0.3,-1.7); lg.quadraticCurveTo(0.8,0,0.3,1.7); linha(0.9,ouro);                               // guarda
  const lam=lg.createLinearGradient(0,-0.7,0,0.7); lam.addColorStop(0,"#ffffff"); lam.addColorStop(0.5,"#cdd6e2"); lam.addColorStop(1,"#7a8898");
  lg.beginPath(); lg.moveTo(0.6,-0.65); lg.lineTo(L-1.4,-0.55); lg.lineTo(L,0); lg.lineTo(L-1.4,0.55); lg.lineTo(0.6,0.65); lg.closePath(); lg.fillStyle=lam; lg.fill(); lg.lineWidth=0.3; lg.strokeStyle="rgba(18,10,6,.8)"; lg.stroke();
  lg.beginPath(); lg.moveTo(1,0); lg.lineTo(L-1.6,0); linha(0.25,"rgba(80,90,110,.8)");
  const br=(t*0.7)%1; lg.globalCompositeOperation="lighter"; lg.globalAlpha=0.3+0.2*Math.sin(t*4); lg.beginPath(); lg.moveTo(1,0); lg.lineTo(L-0.8,0); linha(1.2,cor);
  lg.globalAlpha=0.9*Math.sin(br*Math.PI); lg.fillStyle="#ffffff"; lg.beginPath(); lg.arc(1+(L-2)*br,-0.2,0.5,0,Math.PI*2); lg.fill(); lg.globalAlpha=1; lg.globalCompositeOperation="source-over";
  lg.restore();
  lg.beginPath(); lg.arc(hx,hyM,0.85,0,Math.PI*2); lg.fillStyle=bronzeE; lg.fill();                                         // manopla
  // luz do elemento na ponta da espada
  const px=hx+ca*L, py=hyM+sa*L, pul=0.5+0.5*Math.sin(t*4); lg.globalCompositeOperation="lighter"; const [r1,g1,b1]=hexRgb(cor), gg=lg.createRadialGradient(px,py,0,px,py,3.5+pul);
  gg.addColorStop(0,`rgba(${r1},${g1},${b1},${0.45+0.2*pul})`); gg.addColorStop(1,`rgba(${r1},${g1},${b1},0)`); lg.fillStyle=gg; lg.fillRect(px-5,py-5,10,10); lg.globalCompositeOperation="source-over";
  lg.restore(); lg.lineWidth=1; lg.lineCap="butt"; lg.lineJoin="miter"; }
let SOBRE=null;
function sobreposicao(cor,aLuz,aVin){ const k=cor+"|"+aLuz+"|"+aVin+"|"+W+"x"+H; if(SOBRE&&SOBRE.k===k) return SOBRE.c;
  const w=Math.max(16,Math.round(W/4)), h=Math.max(16,Math.round(H/4)), c=(SOBRE&&SOBRE.c)||document.createElement("canvas"); c.width=w; c.height=h; const g=c.getContext("2d"), m=Math.min(w,h), [r,gg,b]=hexRgb(cor);
  const vg=g.createRadialGradient(w/2,h/2,m*0.3,w/2,h/2,Math.max(w,h)*0.75); vg.addColorStop(0,"rgba(10,8,20,0)"); vg.addColorStop(1,`rgba(10,8,20,${aVin})`); g.fillStyle=vg; g.fillRect(0,0,w,h);
  g.globalCompositeOperation="lighter"; const lz=g.createRadialGradient(w/2,h/2,0,w/2,h/2,m*0.45); lz.addColorStop(0,`rgba(${r},${gg},${b},${aLuz})`); lz.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=lz; g.fillRect(0,0,w,h);
  c._suave=true; SOBRE={k,c}; return c; }
// brilho (bloom): reduz a tela, guarda só o que é claro (multiplicar a imagem por ela mesma) e soma de volta, borrado.
// Custa pouco (imagens pequenas) e some sozinho quando o aparelho está lento (QUAL<2).
let BL1=null, BL2=null;
function aplicarBloom(){ if(QUAL<2||SIM.ativo||TOQUE) return;
  const w1=Math.max(8,Math.round(W/4)), h1=Math.max(8,Math.round(H/4)), w2=Math.max(4,w1>>1), h2=Math.max(4,h1>>1);
  if(!BL1){ BL1=document.createElement("canvas"); BL2=document.createElement("canvas"); }
  if(BL1.width!==w1||BL1.height!==h1){ BL1.width=w1; BL1.height=h1; BL2.width=w2; BL2.height=h2; }
  const g1=BL1.getContext("2d"), g2=BL2.getContext("2d");
  g1.globalCompositeOperation="copy"; g1.imageSmoothingEnabled=true; g1.drawImage(cv,0,0,w1,h1);
  g2.globalCompositeOperation="copy"; g2.imageSmoothingEnabled=true; g2.drawImage(BL1,0,0,w2,h2);
  g2.globalCompositeOperation="multiply"; g2.drawImage(BL2,0,0); g2.drawImage(BL2,0,0); g2.drawImage(BL2,0,0); g2.globalCompositeOperation="source-over";
  ctx.save(); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="low"; ctx.globalCompositeOperation="lighter";
  const kb=0.55+0.45*Math.min(1,nivelEscuro()*2.2); ctx.globalAlpha=0.3*kb; ctx.drawImage(BL2,0,0,W,H); ctx.globalAlpha=0.15*kb; ctx.drawImage(BL2,-W*0.015,-H*0.015,W*1.03,H*1.03); ctx.restore(); }
let comboAnt=0;
function hud(){
  if(SIM.ativo) return;
  { const ev=R.essenciaRun+Math.floor(R.abates/15), el=$("essHud"); if(el&&el._v!==ev){ el._v=ev; el.textContent=ev; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); } }
  const rest=Math.max(0,MAPA_SEG-J.t); $("tempo").textContent=J.chefeFeito?"Chefe!":`${Math.floor(rest/60)}:${String(Math.floor(rest%60)).padStart(2,"0")}`;
  $("barVida").style.width=`${Math.max(0,J.vida/J.vidaMax*100)}%`; $("barEscudo").style.width=`${Math.min(100,J.escudo/J.vidaMax*100)}%`;
  $("barXp").style.width=`${J.xp/J.xpProx*100}%`; $("ultFill").style.height=`${J.desp>0?J.desp/D.despertar.duracao_seg*100:J.ult}%`; $("btnUlt").classList.toggle("pronto",J.ult>=100&&J.desp<=0); { const b=$("btnBolsa"); if(b){ const u=itemUsavelAgora(); if(b._u!==u){ b._u=u; b.classList.toggle("util",u); } } }
  const cb2=$("btnComb"), tc=tipoCombinado(); $("combNome").textContent=J.comb>0?Math.ceil(J.comb)+" s":tc.nome; cb2.title=tc.nome; cb2.classList.toggle("pronto",J.comb<=0); $("combFill").style.height=`${J.comb>0?(1-J.comb/D.combinado_regras.recarga_seg)*100:100}%`;
  $("esqFill").style.height=`${J.dashCd>0?(1-J.dashCd/D.esquiva.recarga_seg)*100:100}%`;
  const cb=$("combo"); if(J.combo>=5){ cb.classList.add("vis"); if(J.combo!==comboAnt){ cb.innerHTML=`Combo ${J.combo}<small>+${Math.round(Math.min(D.combo.xp_max,J.combo/10*D.combo.xp_por_10)*100)}% XP</small>`;
    if(J.combo%10===0){ cb.classList.remove("pop"); void cb.offsetWidth; cb.classList.add("pop"); } } } else cb.classList.remove("vis");
  comboAnt=J.combo;
  R.selos.forEach((s,i)=>{ const el=document.getElementById("cd"+i); if(el) el.style.height=s.trocaCd>0?`${s.trocaCd/15*100}%`:"0"; });
}
// artes de quem está na equipe e no ninho: baixadas assim que eles entram (evolução e troca já encontram a arte pronta)
function preCarregarEquipe(){ if(SIM.ativo||!MANIFESTO||!R) return; const ids=new Set(); R.selos.forEach(s=>s.mon&&ids.add(s.mon.id)); (R.ninho||[]).forEach(o=>ids.add(o.id));
  const nomes=[]; for(const id of ids){ const l=LINHA[id]; if(!l) continue; const pasta=l.ancestral? "arte/lendarios/" : `arte/monstros/${l.elemento}/`; nomes.push(...artesQue(n=>n.startsWith(pasta+id+"__"))); } preCarregar(nomes); }
function desenharEquipe(){ if(SIM.ativo) return; preCarregarEquipe(); const box=$("equipe"); box.innerHTML="";
  R.selos.forEach((s,i)=>{ const b=document.createElement("button"); b.className="retrato"+(s.mon?"":" vazio"); b.setAttribute("aria-label",`Selo ${i+1}`);
    if(s.mon){ const c=document.createElement("canvas"); c.className="mini"; const spr=spriteUI(spriteSelo(s)); c.width=spr.width; c.height=spr.height; c.getContext("2d").drawImage(spr,0,0); if(spr.hi===undefined&&spr!==spriteSelo(s)) c.style.imageRendering="auto"; if(spr!==spriteSelo(s)) c.style.imageRendering="auto"; b.appendChild(c);
      b.style.borderColor=COR[elementoDe(s)]; b.insertAdjacentHTML("beforeend",`${nomeForma(s)}<br>nv ${s.nivel}<div class="cd" id="cd${i}" style="height:0; top:auto; bottom:0"></div>`); }
    else b.insertAdjacentHTML("beforeend",`<div style="height:38px;line-height:38px">vazio</div>Selo ${i+1}`);
    b.onclick=()=>{ if(!pausado&&J&&!J.fim) abrirEquipe(i); }; box.appendChild(b); }); }
function desenharNinho(){ if(SIM.ativo) return; const box=$("ninho"); if(!R){ box.innerHTML=""; return; }
  const anc=R.ancestral&&R.ancestral.estado==="chocando"; box.innerHTML=(R.ninho.length||anc)?"Ninho":"";
  if(anc){ const A=R.ancestral, d=document.createElement("div"); d.className="ovo anc"; d.title=LINHA[A.id].ovo; const c=document.createElement("canvas"); c.className="mini"; const s=spriteOvo(A.el,"lendario");
    c.width=s.width; c.height=s.height; c.getContext("2d").drawImage(s,0,0); d.appendChild(c); d.insertAdjacentHTML("beforeend",`<i><b style="width:${Math.min(100,A.prog/A.alvo*100)}%;background:#ffd34a"></b></i>`); box.appendChild(d); } R.ninho.forEach(o=>{ const d=document.createElement("div"); d.className="ovo"; const c=document.createElement("canvas"); c.className="mini"; const s=spriteOvo(LINHA[o.id].elemento,o.rar);
    c.width=s.width; c.height=s.height; c.getContext("2d").drawImage(s,0,0); d.appendChild(c); d.insertAdjacentHTML("beforeend",`<i><b style="width:${Math.min(100,o.prog/o.alvo*100)}%"></b></i>`); box.appendChild(d); }); }
let toastT=null; function toast(h){ if(SIM.ativo) return; const t=$("toast"); t.innerHTML=h; t.classList.add("vis"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("vis"),2400); }

// ================================================================ menu, Pacto, pausa
function pausar(){ if(!J) return; pausado=true;
  mostrarCartas("Pausado", `Profundidade ${R.profundidade} · Pacto: ${R.pacto.map(NOME_EL).join(", ")}`, [
    {titulo:"Continuar", texto:"Voltar ao mapa.", acao:()=>{ pausado=false; }},
    {titulo:"Ver equipe e sinergias", manter:true, texto:(SIN.chips.join(" · ")||"Nenhuma sinergia ativa ainda.")+"<br>"+ativos().map(s=>`${nomeForma(s)} (nv ${s.nivel}): ${NOME_EL(elementoDe(s))}, ${D.classes[L(s).classe].nome}${classeExtraDe(s)?" + "+D.classes[classeExtraDe(s)].nome:""}, ${D.linhagens[linhagemDe(s)].nome}. ${resumoPoderes(s)}`).join("<br>"), acao:()=>pausar()},
    {titulo:`Escolher todo nível: ${META.escolhaManual?"sim":"não"}`, texto:"Desligado: em metade dos níveis a melhor carta entra sozinha.", manter:true, acao:()=>{ META.escolhaManual=!META.escolhaManual; gravar(); pausar(); }},
    {titulo:`Som: ${META.som&&META.som.mudo?"desligado":"ligado"}`, texto:"Toque para ligar ou desligar os efeitos sonoros.", manter:true, acao:()=>{ META.som=META.som||{}; META.som.mudo=!META.som.mudo; gravar(); somLigar(); som("ding"); pausar(); }},
    ...(MODERADOR_DISPONIVEL&&META.moderador? [{titulo:"Ferramentas de teste", texto:"Níveis, evolução, chefe, invencível...", manter:true, acao:()=>telaFerramentas()}] : []),
    {titulo:"Sair e salvar", texto:"A run recomeça do início deste mapa.", acao:()=>{ rodando=false; menu(); }} ]); }
function menu(){
  rodando=false; fechar(); $("telaMenu").classList.add("ativa"); $("hud").style.display="none"; $("hudBase").style.display="none"; $("combo").classList.remove("vis");
  $("metaEss").textContent=`Essência: ${META.essencia}`; $("metaProf").textContent=`Recorde: ${META.recorde} mapas`; $("metaCol").textContent=`Coleção: ${META.liberados.length}/${D.linhas.length}`;
  const box=$("menuBotoes"); box.innerHTML="";
  if(RUN_SALVA){ const b=document.createElement("button"); b.className="botao"; b.textContent=`Continuar run (mapa ${RUN_SALVA.profundidade+1})`;
    b.onclick=()=>{ $("telaMenu").classList.remove("ativa"); carregarRun(RUN_SALVA); iniciarMapa(); }; box.appendChild(b); }
  const n=document.createElement("button"); n.className="botao"+(RUN_SALVA?" sec":""); n.textContent="Nova run: fechar Pacto"; n.onclick=telaPacto; box.appendChild(n);
  { const pode=lojaAcessivel().length, sa=document.createElement("button"); sa.className="botao"+(pode?"":" sec"); sa.textContent=`Santuário (${META.essencia} de Essência)${pode?` · ${pode} melhoria${pode>1?"s":""} disponível${pode>1?"is":""}`:""}`; sa.onclick=telaSantuario; box.appendChild(sa); }
  metaConq(); META.cont.colecao=META.liberados.length; checarGlobais("colecao");
  { const D2=diarias(), f=D2.lista.filter(m=>m.feito).length, bm=document.createElement("button"); bm.className="botao"+(f<3?"":" sec"); bm.textContent=`Missões do dia (${f}/3)${D2.seq?` · ${D2.seq} dia${D2.seq>1?"s":""} seguido${D2.seq>1?"s":""}`:""}`; bm.onclick=telaDiarias; box.appendChild(bm); }
  { const bd=document.createElement("button"); bd.className="botao sec"; bd.textContent=`Bestiário (${formasVistas()}/${FORMAS_TOTAL()} formas)`; bd.onclick=telaBestiario; box.appendChild(bd); }
  const cq=document.createElement("button"); cq.className="botao sec"; cq.textContent=`Conquistas e Lendas (${Object.keys(META.conq).length}/${D.conquistas.length})`; cq.onclick=telaConquistas; box.appendChild(cq);
  if(MODERADOR_DISPONIVEL&&META.moderador){ const md=document.createElement("button"); md.className="botao sec"; md.textContent="Modo moderador"; md.onclick=telaModerador; box.appendChild(md); }
  gravar();
}
// ================================================================ modo moderador (testes)
// Escondido: toque 5 vezes no título do menu, ou abra o jogo com ?moderador no endereço.
// Desligue MODERADOR_DISPONIVEL na versão que vai para a Steam.
const MODERADOR_DISPONIVEL=true;
const CHAVE_BACKUP=CHAVE+"_antes_moderador";
if(MODERADOR_DISPONIVEL){
  if(/[?&](moderador|mod)\b/.test(location.search)) META.moderador=true;
  let toques=0, ultimo=0;
  document.querySelector("#telaMenu h1")?.addEventListener("click",()=>{ const t=performance.now(); toques= t-ultimo<600? toques+1 : 1; ultimo=t;
    if(toques>=5){ toques=0; META.moderador=true; gravar(); toast("Modo moderador liberado"); menu(); } });
}
function backupModerador(){ if(!PLAT.lerSave(CHAVE_BACKUP)) PLAT.gravarSave(CHAVE_BACKUP, JSON.stringify({meta:META, run:RUN_SALVA})); META.modUsado=true; }
function telaModerador(){
  $("telaMenu").classList.remove("ativa"); metaConq(); metaDeuses();
  const talismas=[...new Set(D.conquistas.map(c=>c.talisma).filter(Boolean))], temBackup=!!PLAT.lerSave(CHAVE_BACKUP);
  const feito=msg=>{ gravar(); toast(msg); telaModerador(); };
  mostrarCartas("Modo moderador", "Ferramentas de teste. O save de antes da primeira mudança fica guardado e pode ser restaurado aqui.", [
    {titulo:`Liberar todos os monstros (${META.liberados.length}/${D.linhas.length})`, texto:"Todas as linhas evolutivas aparecem no Pacto, nos ovos e nos filhotes.", raridade:"raro", manter:true,
      acao:()=>{ backupModerador(); META.liberados=[...new Set([...META.liberados,...D.linhas.map(l=>l.id)])]; feito("Todos os monstros liberados"); }},
    {titulo:`Liberar todas as Lendas (${META.lendas.length}/${D.lendas.length})`, texto:"Todas podem ser escolhidas como Invocador.", raridade:"epico", manter:true,
      acao:()=>{ backupModerador(); META.lendas=[...new Set([...META.lendas,...D.lendas.map(l=>l.universo)])]; feito("Todas as Lendas liberadas"); }},
    {titulo:`Liberar o Panteão (${META.deuses.length}/${D.panteao.length})`, texto:"Todos os deuses podem ser escolhidos como Invocador.", raridade:"lendario", manter:true,
      acao:()=>{ backupModerador(); META.deuses=[...new Set([...META.deuses,...D.panteao.map(g=>g.id)])]; feito("Panteão liberado"); }},
    {titulo:`Liberar todos os Talismãs (${META.talismas.length}/${talismas.length})`, texto:"", raridade:"incomum", manter:true,
      acao:()=>{ backupModerador(); META.talismas=[...new Set([...META.talismas,...talismas])]; feito("Talismãs liberados"); }},
    {titulo:"+10.000 de Essência", texto:`Agora: ${META.essencia}`, manter:true,
      acao:()=>{ backupModerador(); META.essencia+=10000; feito("+10.000 de Essência"); }},
    {titulo:"Liberar tudo", texto:"Monstros, Lendas, Panteão, Talismãs e +10.000 de Essência.", raridade:"lendario", manter:true,
      acao:()=>{ backupModerador(); META.liberados=[...new Set([...META.liberados,...D.linhas.map(l=>l.id)])]; META.lendas=[...new Set([...META.lendas,...D.lendas.map(l=>l.universo)])];
        META.deuses=[...new Set([...META.deuses,...D.panteao.map(g=>g.id)])]; META.talismas=[...new Set([...META.talismas,...talismas])]; META.essencia+=10000; feito("Tudo liberado"); }},
    {titulo:"Restaurar save de antes", texto: temBackup? "Volta ao progresso de antes do modo moderador." : "Nenhuma mudança feita ainda.", desab:!temBackup, manter:true,
      acao:()=>{ if(!confirm("Voltar ao save de antes do modo moderador? O que foi liberado aqui some.")) return;
        try{ const s=JSON.parse(PLAT.lerSave(CHAVE_BACKUP)); META=Object.assign({essencia:0, recorde:0, liberados:liberadosIniciais()}, s.meta||{}); RUN_SALVA=s.run||null; }catch(e){ return toast("Backup ilegível"); }
        META.moderador=true; PLAT.gravarSave(CHAVE_BACKUP,""); feito("Save restaurado"); }},
    {titulo:"Testar uma Lenda ou um deus", texto:"Começa uma partida com ela no comando e uma equipe de nível 12.", raridade:"lendario", acao:()=>telaTesteLenda()},
    {titulo:"Testar um Dragão Ancestral", texto:"Começa uma partida com o dragão na equipe, na forma que escolher.", raridade:"lendario", acao:()=>telaTesteDragao()},
    {titulo:"Esconder modo moderador", texto:"Tire o botão do menu (toque 5 vezes no título para voltar).", manter:true,
      acao:()=>{ META.moderador=false; gravar(); fechar(); menu(); }},
    {titulo:"Voltar", texto:"", acao:()=>menu()}
  ]);
  $("telaCartas").classList.add("ativa");
}
// ---------------------------------------------------------------- testes do moderador: Lendas, deuses e Dragões Ancestrais
function equipeTeste(pacto,nivel){ const pool=D.linhas.filter(l=>pacto.includes(l.elemento)).map(l=>l.id); return embaralhar(pool).slice(0,3).map(id=>({id,nivel})); }
function comecarTeste(pacto,equipe,lenda){ backupModerador(); fechar(); $("telaMenu").classList.remove("ativa"); novaRun(pacto,equipe[0].id); R.teste=true;
  equipe.forEach((m,i)=>{ const s=R.selos[i]; s.mon={id:m.id,rar:m.rar||"comum",ramo:m.ramo??null}; s.nivel=m.nivel||1; s.pod={b:Math.min(5,1+Math.floor(s.nivel/4)),h1:s.nivel>=NIV[1]?2:0,h2:s.nivel>=NIV[2]?2:0}; });
  if(equipe.some(m=>m.supremo)) R.chefesVencidos=1;
  if(lenda){ R.lenda=lenda; R.lendaNv=5; } iniciarMapa(); }
function telaTesteLenda(){ const todas=[...D.lendas,...D.panteao];
  mostrarCartas("Testar Lenda ou deus","A partida de teste não conta para o recorde.",[...todas.map(l=>({titulo:l.nome, raridade:l.dom?"lendario":"epico", texto:`${NOME_EL(l.elementos[0])} e ${NOME_EL(l.elementos[1])} · ${l.poder.nome} (nível 5)${l.dom?` · Dom: ${l.dom.nome}`:""}`,
    acao:()=>comecarTeste(l.elementos.slice(0,2),equipeTeste(l.elementos,12),l.id)})), {titulo:"Voltar", texto:"", acao:()=>telaModerador()}],{grade:true}); }
function telaTesteDragao(){ const anc=D.ancestrais||[];
  mostrarCartas("Testar Dragão Ancestral","Escolha o dragão.",[...anc.map(l=>({titulo:l.filhote||l.id, sprite:spriteLinha(l.id,"lendario"), raridade:"lendario", texto:`${NOME_EL(l.elemento)} · ${l.ovo||""}`,
    acao:()=>mostrarCartas(l.filhote||l.id,"Em qual forma?",[["Filhote",1],["Jovem",NIV[1]],["Adulto",NIV[2]],["Supremo",NIV[3]]].map(([n,nv])=>({titulo:n, texto:`Nível ${nv}`,
      acao:()=>{ const outros=equipeTeste([l.elemento],nv).filter(m=>m.id!==l.id).slice(0,2); comecarTeste([l.elemento,ELS.find(e=>e!==l.elemento)],[{id:l.id,nivel:nv,rar:"lendario",ramo:nv>=NIV[2]?0:null,supremo:nv>=NIV[3]},...outros]); } })))})), {titulo:"Voltar", texto:"", acao:()=>telaModerador()}],{grade:true}); }
// ferramentas dentro da partida (menu de pausa)
function telaFerramentas(){ const feito=m=>{ toast(m); pausado=false; fechar(); };
  mostrarCartas("Ferramentas de teste","Só no modo moderador.",[
    {titulo:"+5 níveis na equipe", texto:"", acao:()=>{ ativos().forEach(s=>{ const antes=estBase(s); s.nivel+=5; if(s.mon.ramo==null&&s.nivel>=NIV[2]) s.mon.ramo=0; checarEvolucao(s,antes); }); desenharEquipe(); feito("+5 níveis"); }},
    {titulo:"Evoluir tudo ao máximo", texto:"Forma Suprema em todos.", acao:()=>{ R.chefesVencidos=Math.max(1,R.chefesVencidos); ativos().forEach(s=>{ const antes=estBase(s); s.nivel=Math.max(s.nivel,NIV[3]); if(s.mon.ramo==null) s.mon.ramo=0; checarEvolucao(s,antes); }); desenharEquipe(); feito("Equipe no máximo"); }},
    {titulo:"Despertar e combinado prontos", texto:"", acao:()=>{ J.ult=100; J.comb=0; feito("Prontos"); }},
    {titulo:"Chamar o chefe agora", texto:"", acao:()=>{ J.t=Math.max(J.t,MAPA_SEG-1); feito("O chefe está chegando"); }},
    {titulo:`Invencível: ${J.deus?"ligado":"desligado"}`, texto:"Não perde vida.", acao:()=>{ J.deus=!J.deus; feito(J.deus?"Invencível":"Normal"); }},
    {titulo:"Pular para o próximo mapa", texto:"", acao:()=>{ pausado=false; fechar(); R.profundidade++; R.mapaNaEra=(R.mapaNaEra+1)%MAPAS_POR_ERA; mostrarPortais(); }},
    {titulo:"Voltar", texto:"", acao:()=>pausar()} ]); }
// emblema de elemento desenhado em vetor (orbe com o símbolo), nítido em qualquer tela
const cacheEmblema=new Map();
function emblemaElemento(el,ativo){ const k=el+"|"+!!ativo; if(cacheEmblema.has(k)) return cacheEmblema.get(k);
  const N=96, c=document.createElement("canvas"); c.width=c.height=N; const g=c.getContext("2d"), cor=COR[el]||"#ffffff", [r,gg,b]=hexRgb(cor);
  g.translate(N/2,N/2);
  const fundo=g.createRadialGradient(-10,-14,4,0,0,44); fundo.addColorStop(0,tom(cor,1.5)); fundo.addColorStop(0.55,cor); fundo.addColorStop(1,tom(cor,0.35));
  g.fillStyle=fundo; g.beginPath(); g.arc(0,0,40,0,Math.PI*2); g.fill();
  g.lineWidth=3; g.strokeStyle=ativo?"#ffe6a6":"rgba(255,240,210,.55)"; g.stroke();
  if(ativo){ g.shadowColor=`rgba(${r},${gg},${b},1)`; g.shadowBlur=14; }
  g.fillStyle="#fff8e8"; g.strokeStyle="#fff8e8"; g.lineCap="round"; g.lineJoin="round"; g.lineWidth=5; g.beginPath();
  switch(el){
    case "fogo": g.moveTo(0,24); g.bezierCurveTo(-20,22,-20,0,-6,-10); g.bezierCurveTo(-6,-2,0,0,2,-6); g.bezierCurveTo(4,-14,-2,-20,2,-26); g.bezierCurveTo(16,-14,22,4,14,16); g.bezierCurveTo(10,22,6,24,0,24); g.fill(); break;
    case "agua": g.moveTo(0,-26); g.bezierCurveTo(10,-10,20,2,18,10); g.bezierCurveTo(16,22,6,26,0,26); g.bezierCurveTo(-6,26,-16,22,-18,10); g.bezierCurveTo(-20,2,-10,-10,0,-26); g.fill(); break;
    case "terra": g.moveTo(-26,18); g.lineTo(-8,-14); g.lineTo(0,-2); g.lineTo(8,-20); g.lineTo(26,18); g.closePath(); g.fill(); break;
    case "ar": for(const [y,w] of [[-12,20],[0,26],[12,16]]){ g.moveTo(-w,y); g.bezierCurveTo(-w/3,y-6,w/3,y+6,w,y-2); } g.stroke(); break;
    case "raio": g.moveTo(6,-28); g.lineTo(-14,4); g.lineTo(0,4); g.lineTo(-6,28); g.lineTo(14,-6); g.lineTo(0,-6); g.closePath(); g.fill(); break;
    case "natureza": g.moveTo(-18,20); g.bezierCurveTo(-22,-6,0,-24,22,-22); g.bezierCurveTo(22,0,6,22,-18,20); g.fill(); g.strokeStyle=tom(cor,0.5); g.lineWidth=3; g.beginPath(); g.moveTo(-18,20); g.lineTo(10,-8); g.stroke(); break;
    case "luz": g.arc(0,0,10,0,Math.PI*2); g.fill(); g.lineWidth=4; g.beginPath(); for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; g.moveTo(Math.cos(a)*16,Math.sin(a)*16); g.lineTo(Math.cos(a)*25,Math.sin(a)*25); } g.stroke(); break;
    case "sombra": g.arc(0,0,22,0,Math.PI*2); g.fill(); g.globalCompositeOperation="destination-out"; g.shadowBlur=0; g.beginPath(); g.arc(10,-7,19,0,Math.PI*2); g.fill(); g.globalCompositeOperation="source-over"; break; }
  g.shadowBlur=0; const brilho=g.createRadialGradient(-12,-16,0,-12,-16,22); brilho.addColorStop(0,"rgba(255,255,255,.45)"); brilho.addColorStop(1,"rgba(255,255,255,0)"); g.fillStyle=brilho; g.beginPath(); g.arc(0,0,40,0,Math.PI*2); g.fill();
  cacheEmblema.set(k,c); return c; }
// Pacto: a roda dos elementos (arte/ui/ui__pacto) vira o seletor; cada gema é um botão
const RODA_PACTO={luz:[50,19.5],agua:[72.8,24.6],ar:[83.3,48.2],natureza:[74.2,70.8],sombra:[50,81.2],raio:[26.8,70.8],terra:[18.2,48.2],fogo:[27.3,24.6]};
function telaPacto(){
  $("telaMenu").classList.remove("ativa"); const sel=new Set(); let foco=null; const roda=UI_ARQ("ui__pacto");
  const render=()=>{
    if(!roda){   // sem a arte: grade de emblemas
      mostrarCartas("Pacto Elemental", `Escolha ${D.pacto.min} ou ${D.pacto.max} elementos. Só ovos e filhotes deles vão aparecer. ${D.pacto.bonus[2].texto}.`,
        ELS.map(el=>({ titulo:NOME_EL(el), manter:true, raridade:sel.has(el)?"lendario":"comum", sprite:emblemaElemento(el,sel.has(el)), suave:true, texto:infoElemento(el),
          acao:()=>{ if(sel.has(el)) sel.delete(el); else if(sel.size<D.pacto.max) sel.add(el); render(); } })), {grade:true});
    } else {
      mostrarCartas("Pacto Elemental", `Toque em ${D.pacto.min} ou ${D.pacto.max} gemas. Só ovos e filhotes desses elementos vão aparecer.`, []);
      const box=$("cartas"); box.className="cartas"; box.innerHTML=`<div class="roda-pacto"><img src="${roda.src}" alt="Roda dos elementos"></div><div class="roda-info"></div>`;
      const r=box.querySelector(".roda-pacto");
      for(const el of ELS){ const [x,y]=RODA_PACTO[el], g=document.createElement("button"); g.className="gema"+(sel.has(el)?" sel":"")+(foco===el?" foco":""); g.style.left=x+"%"; g.style.top=y+"%"; g.style.setProperty("--cor",COR[el]);
        g.setAttribute("aria-label",NOME_EL(el)+(sel.has(el)?" (escolhido)":"")); g.setAttribute("aria-pressed",sel.has(el));
        g.onclick=()=>{ foco=el; if(sel.has(el)) sel.delete(el); else if(sel.size<D.pacto.max) sel.add(el); else toast(`No máximo ${D.pacto.max} elementos.`); render(); }; r.appendChild(g); }
      const nomes=[...sel].map(el=>`<span style="color:${COR[el]}">${NOME_EL(el)}</span>`).join(" + ")||"nenhum elemento ainda";
      box.querySelector(".roda-info").innerHTML=`<b>Pacto: ${nomes}</b>${foco?`<small><span style="color:${COR[foco]}">${NOME_EL(foco)}</span>: ${infoElemento(foco)}</small>`:`<small>${D.pacto.bonus[2].texto}.</small>`}`;
    }
    const b=document.createElement("button"); b.className="botao"; b.textContent=sel.size>=D.pacto.min?`Fechar Pacto (${[...sel].map(NOME_EL).join(", ")})`:`Escolha ${D.pacto.min - sel.size} elemento(s)`;
    b.disabled=sel.size<D.pacto.min; b.onclick=()=>escolherInicial([...sel]); $("cartasRodape").appendChild(b);
    const v=document.createElement("button"); v.className="botao sec"; v.textContent="Voltar"; v.onclick=()=>menu(); $("cartasRodape").appendChild(v);
  };
  render();
}
function infoElemento(el){ const n=META.liberados.filter(id=>LINHA[id].elemento===el).length, perde=ELS.find(k=>D.vantagem[k]===el); return `${n} monstros · vence ${NOME_EL(D.vantagem[el])} · perde para ${NOME_EL(perde)}`; }
function escolherInicial(pacto,opsProntas){
  const pool=META.liberados.filter(id=>pacto.includes(LINHA[id].elemento)); const ops=opsProntas||[];
  if(!opsProntas){ pacto.forEach(el=>{ const c=embaralhar(pool.filter(id=>LINHA[id].elemento===el))[0]; if(c) ops.push(c); });
    embaralhar(pool).forEach(id=>{ if(ops.length<4&&!ops.includes(id)) ops.push(id); });
    // a animação de cada monstro só começa a baixar quando é pedida: sem ela a carta mostrava a imagem reserva, bem menor e borrada.
    // Espera chegar (até 2,5 s, uma vez) e só então mostra a tela.
    const nomes=ops.map(id=>LINHA[id].ancestral? `arte/lendarios/${id}__anim_1.png` : `arte/monstros/${LINHA[id].elemento}/${id}__anim_1.png`).filter(n=>MANIFESTO&&MANIFESTO[n]);
    if(nomes.some(n=>{ const im=ARTE_IMG[n]; return im&&!im.pronta&&!im.falhou; })){
      Promise.race([preCarregar(nomes),new Promise(ok=>setTimeout(ok,2500))]).then(()=>escolherInicial(pacto,ops)); return; } }
  mostrarCartas("Monstro inicial", "Os outros chegam por ovos, capturas e invocações durante a run.", ops.map(id=>{ const l=LINHA[id]; return { titulo:l.filhote, sprite:spriteLinha(id,"comum"), quadros:quadrosRetrato(id), classe:"grande", raridade:"incomum",
    texto:`<span style="color:${COR[l.elemento]}">${NOME_EL(l.elemento)}</span> · ${D.classes[l.classe].nome} · ${D.linhagens[l.linhagem].nome}<br>Evolui: ${l.jovem}<br>${D.classes[l.classe].basico}`,
    acao:()=>telaInvocador(pacto,id) }; }), {grade:true});
}
redimensionar(); menu(); aplicarArteUI(); requestAnimationFrame(passo);
