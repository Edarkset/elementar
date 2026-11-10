// Elementar · diretor de horda, poderes, Talismãs, conquistas, Lendas, Panteão, luz e arte da interface
// Parte 8 de 11 da lógica do jogo: os arquivos de js/jogo/ são carregados em ordem pelo index.html e
// compartilham o mesmo escopo global (funções e constantes de uma parte valem nas outras).
"use strict";
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
    // a horda começa pequena em todo mapa (poucos inimigos, mais perigosos) e cresce aos poucos com o tempo e a profundidade
    d.alvo=Math.min(DIF.hordaMax,(DIF.hordaBase+R.profundidade*DIF.hordaProf+J.t*(DIF.hordaT+R.profundidade*DIF.hordaTProf))*DIF.horda*(1+MOD("horda")))*(R.profundidade===0&&!R.teste? Math.min(1,0.5+J.t/80) : 1);
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
  for(let i=0;i<n;i++){ if(J.parts.length>320) J.parts.shift(); const a=Math.random()*Math.PI*2, s=rnd(vel*0.3,vel);
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
// ---------------------------------------------------------------- círculo de invocação no chão
// Desenho do círculo (anel duplo, runas, estrela de 6 pontas e marcas) feito uma vez por elemento num canvas; no jogo ele
// é achatado em perspectiva, gira, cresce ao abrir e some com brilho. Usado ao invocar um monstro e ao lançar habilidades
const cacheCirculo=new Map();
function artCirculo(el){ if(cacheCirculo.has(el)) return cacheCirculo.get(el); const N=160, c=document.createElement("canvas"); c.width=c.height=N; const g=c.getContext("2d"), cor=COR[el]||"#ffd34a", R=N/2-4;
  g.translate(N/2,N/2); g.lineCap="round"; g.shadowColor=cor; g.shadowBlur=8; g.strokeStyle=mistura(cor,"#ffffff",0.45);
  g.lineWidth=3; g.beginPath(); g.arc(0,0,R,0,Math.PI*2); g.stroke(); g.lineWidth=1.5; g.beginPath(); g.arc(0,0,R-9,0,Math.PI*2); g.stroke();
  for(let i=0;i<24;i++){ const a=i/24*Math.PI*2, l=i%3===0?7:3.5; g.beginPath(); g.moveTo(Math.cos(a)*(R-1),Math.sin(a)*(R-1)); g.lineTo(Math.cos(a)*(R-1-l),Math.sin(a)*(R-1-l)); g.stroke(); }   // marcas entre os anéis
  g.lineWidth=2; for(const d of [0,Math.PI]){ g.beginPath(); for(let i=0;i<=3;i++){ const a=d+i/3*Math.PI*2-Math.PI/2; const x=Math.cos(a)*(R-12), y=Math.sin(a)*(R-12); i?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); }   // estrela de 6 pontas
  g.lineWidth=1.5; g.beginPath(); g.arc(0,0,R*0.42,0,Math.PI*2); g.stroke();
  for(let i=0;i<6;i++){ const a=i/6*Math.PI*2+Math.PI/6; g.beginPath(); g.arc(Math.cos(a)*R*0.62,Math.sin(a)*R*0.62,4,0,Math.PI*2); g.stroke(); }   // runas nas pontas
  g.fillStyle=cor; g.globalAlpha=0.18; g.beginPath(); g.arc(0,0,R,0,Math.PI*2); g.fill();
  cacheCirculo.set(el,c); return c; }
function circuloInvocacao(x,y,el,r,dur,forte){ if(SIM.ativo||!J) return; const art=artCirculo(el), cor=COR[el]||"#ffd34a";
  vfx({max:dur||0.9,camada:"chao",desenhar(ox,oy,q){ const abre=Math.min(1,q/0.18), some=q>0.7?(1-q)/0.3:1, esc=r*(0.55+0.45*(1-Math.pow(1-abre,3))), a=J.t*(forte?1.6:1.1);
    lg.save(); lg.translate(x-ox,y-oy); lg.scale(1,0.5); lg.globalCompositeOperation="lighter";
    lg.globalAlpha=0.9*some; lg.rotate(a); lg.drawImage(art,-esc,-esc,esc*2,esc*2);
    lg.rotate(-a*2.2); lg.globalAlpha=0.45*some; lg.drawImage(art,-esc*0.6,-esc*0.6,esc*1.2,esc*1.2);   // círculo interno girando ao contrário
    lg.restore(); lg.globalCompositeOperation="source-over"; lg.globalAlpha=1;
    if(forte&&q<0.6){ lg.globalCompositeOperation="lighter"; const g=lg.createLinearGradient(0,y-oy-70,0,y-oy); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(1,cor); lg.globalAlpha=0.4*(1-q/0.6); lg.fillStyle=g; lg.fillRect(x-ox-esc*0.35,y-oy-70,esc*0.7,70); lg.globalAlpha=1; lg.globalCompositeOperation="source-over"; } }}); }
function vfx(o){ J.vfx=J.vfx||[]; if(J.vfx.length>80) J.vfx.shift(); o.t=0; J.vfx.push(o); return o; }
function atualizarVfx(dt){ if(!J.vfx) return; for(const v of J.vfx) v.t+=dt; J.vfx=J.vfx.filter(v=>v.t<v.max); }
function desenharVfx(ox,oy,camada){ if(!J.vfx) return; for(const v of J.vfx) if((v.camada||"luz")===camada) v.desenhar(ox,oy,v.t/v.max); lg.globalAlpha=1; lg.lineWidth=1; }

// ---------------------------------------------------------------- ataques básicos por classe
function vfxCorte(s,el,r){ const K=VFX_K; const alvo=maisProximo(s,r+20), ang=alvo? Math.atan2(alvo.y-s.y,alvo.x-s.x) : Math.atan2(J.dir.y||0,J.dir.x||1), v=vEl(el), lado=Math.random()<.5?1:-1;
  // lua crescente: o traço é largo no meio e fino nas pontas; brilho por baixo e fio branco por cima; a ponta corre na frente do rastro
  vfx({max:.22,desenhar(ox,oy,q){ const x=s.x-ox, y=s.y-oy, ab=2.3, ini=ang-ab/2*lado, frente=Math.min(1,q*2.4), tras=Math.max(0,q*1.6-0.35), N=12, rr=r*0.85;
    lg.lineCap="round"; lg.globalCompositeOperation="lighter";
    for(const [cor,lw0,al] of [[v.c1,4.2,0.35],[v.c2,2.2,0.9],["#ffffff",0.8,1]]){ const lw=lw0*K; lg.strokeStyle=cor;
      for(let i=0;i<N;i++){ const u0=tras+(frente-tras)*i/N, u1=tras+(frente-tras)*(i+1)/N; if(u1<=u0) continue; const um=(u0+u1)/2, larg=Math.sin(Math.min(1,(um-tras)/Math.max(0.01,frente-tras))*Math.PI);
        lg.globalAlpha=al*(1-q*0.7); lg.lineWidth=Math.max(0.2,lw*larg*(1-q*0.4)); lg.beginPath(); lg.arc(x,y,rr+(cor==="#ffffff"?0.6:0),ini+ab*lado*u0,ini+ab*lado*u1,lado<0); lg.stroke(); } }
    lg.globalCompositeOperation="source-over"; lg.lineCap="butt"; }});
  for(let i=0;i<Math.round(4*K);i++){ const a=ang+rnd(-1,1); particulasEl(s.x+Math.cos(a)*r*0.8,s.y+Math.sin(a)*r*0.8,el,1,40*K); }
  if(K>1.6) luzFlash(s.x,s.y,v.c2,r*1.2,0.18); }
function vfxOnda(s,el,r){ const v=vEl(el), x0=s.x, y0=s.y, K=VFX_K; rajada(x0,y0,r*1.2,0.5*K);
  vfx({max:.35,camada:"chao",desenhar(ox,oy,q){ lg.globalAlpha=(1-q)*0.8; lg.strokeStyle=v.c2; lg.lineWidth=2*K; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r*q,r*q*0.8,0,0,Math.PI*2); lg.stroke();
    if(K>1.5){ lg.globalCompositeOperation="lighter"; lg.globalAlpha=(1-q)*0.25*(K-1); lg.fillStyle=v.c2; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r*q,r*q*0.8,0,0,Math.PI*2); lg.fill(); lg.globalCompositeOperation="source-over"; }
    lg.globalAlpha=(1-q)*0.4; lg.strokeStyle=v.c1; lg.lineWidth=1; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r*q*0.7,r*q*0.56,0,0,Math.PI*2); lg.stroke(); }});
  const nP=Math.round(8*K); for(let i=0;i<nP;i++){ const a=i/nP*Math.PI*2; particulasEl(x0+Math.cos(a)*r,y0+Math.sin(a)*r*0.8,el,1,30*K); } }
function vfxFeixe(s,e,el){ const v=vEl(el), K=VFX_K, pts=[]; const n=6; for(let i=0;i<=n;i++){ const t=i/n; pts.push([t,(i&&i<n)?rnd(-3,3):0]); }
  vfx({max:.16,desenhar(ox,oy,q){ const dx=e.x-s.x, dy=e.y-s.y, d=Math.hypot(dx,dy)||1, nx=-dy/d, ny=dx/d;
    for(const [lw0,cor,al] of [[3,v.c2,.45],[1,v.c1,1],[0.5,"#ffffff",K>1.5?0.9:0]]){ const lw=lw0*K; lg.globalAlpha=al*(1-q); lg.strokeStyle=cor; lg.lineWidth=lw; lg.beginPath();
      pts.forEach(([t,o],i)=>{ const x=s.x+dx*t+nx*o-ox, y=s.y+dy*t+ny*o-oy; i?lg.lineTo(x,y):lg.moveTo(x,y); }); lg.stroke(); } }});
  particulasEl(e.x,e.y,el,4,50); }
function vfxX(e,el){ const v=vEl(el), x0=e.x, y0=e.y, K=VFX_K;
  vfx({max:.22,desenhar(ox,oy,q){ const L=9*K*Math.min(1,q*3); lg.globalAlpha=1-q; lg.strokeStyle="#ffffff"; lg.lineWidth=1; lg.beginPath(); lg.moveTo(x0-ox-L,y0-oy-L); lg.lineTo(x0-ox+L,y0-oy+L); lg.moveTo(x0-ox+L,y0-oy-L); lg.lineTo(x0-ox-L,y0-oy+L); lg.stroke();
    lg.strokeStyle=v.c2; lg.globalAlpha=(1-q)*0.6; lg.lineWidth=3; lg.beginPath(); lg.moveTo(x0-ox-L,y0-oy-L); lg.lineTo(x0-ox+L,y0-oy+L); lg.stroke(); }}); }
function vfxSelo(x0,y0,el,r){ const v=vEl(el), K=VFX_K;
  vfx({max:.5,camada:"chao",desenhar(ox,oy,q){ lg.globalAlpha=Math.sin(q*Math.PI)*0.8; lg.strokeStyle=v.c1; lg.lineWidth=K; lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r,r*0.6,0,0,Math.PI*2); lg.stroke();
    if(K>1.5){ lg.beginPath(); lg.ellipse(x0-ox,y0-oy,r*0.7,r*0.42,0,0,Math.PI*2); lg.stroke(); }
    for(let i=0;i<Math.round(5*K);i++){ const a=q*2+i/5*Math.PI*2; lg.fillStyle=v.c2; lg.fillRect(Math.round(x0-ox+Math.cos(a)*r),Math.round(y0-oy+Math.sin(a)*r*0.6),2,1); } }}); }

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
const tal={ dano:()=>(1+valTal("dano"))*(1+MOD("dano")), defesa:()=>Math.max(0.5,1-valTal("defesa"))*((SIN.rm&&SIN.rm.danoRec)||1)*(1+MOD("danoRec")), recarga:()=>Math.max(0.45,(1-valTal("recarga"))*(1-MOD("cadencia"))), area:()=>1+valTal("area")+passiva("area")+custo("area")+MOD("area"),
  coleta:()=>1+valTal("coleta"), regen:()=>valTal("regen"), duracao:()=>1+valTal("duracao")+passiva("duracao"), projeteis:()=>{ const lv=nivTal("espelho"); return (lv>=2?1:0)+(lv>=5?1:0); },
  velocidade:()=>(1+valTal("velocidade"))*(1+MOD("velocidade")), critico:()=>valTal("critico")+MOD("critico"), xp:()=>(1+valTal("xp")+valTal("risco")*1.25)*(1+MOD("xp")), riscoVida:()=>1+valTal("risco"), riscoVel:()=>1+valTal("risco")*0.5 };
function talismasLiberados(){ const T=PD().talismas; return Object.keys(T).filter(id=>T[id].inicial||(META.talismas||[]).includes(id)||SIM.tudoLiberado); }
function efeitoTalismaTxt(t,lv){ const v=t.valor*lv*100, sinal=t.efeito==="defesa"||t.efeito==="recarga"? "−" : "+"; return lv? `${sinal}${Math.round(v)}%` : "0%"; }
function cartaTalisma(){ if(SIM.semTalismas||Math.random()>=PD().chance_carta+passiva("carta_extra")*0.35+((SIN.rm&&SIN.rm.talisma)||0)) return null; const tem=Object.keys(R.talismas||{}), cheio=tem.length>=PD().encaixes;
  const ops=talismasLiberados().filter(id=> cheio? (tem.includes(id)&&nivTal(id)<5) : nivTal(id)<5); if(!ops.length) return null;
  const util=ops.filter(id=>PD().despertos.some(d=>d.talisma===id&&ativos().some(s=>L(s).classe===d.classe)));   // prefere os que abrem Desperto da equipe
  // meio caminho de uma União: se a equipe já tem um Desperto de um par e a classe do parceiro está na equipe, favorece o Talismã que falta
  const par=paresPendentes(), falta=ops.filter(id=>par.some(p=>p.talisma===id));
  const id=falta.length&&Math.random()<0.6? escolha(falta) : escolha(util.length&&Math.random()<0.7?util:ops), t=PD().talismas[id], lv=nivTal(id), abre=PD().despertos.filter(d=>d.talisma===id).map(d=>d.nome).join(" e ");
  const uniao=paresPendentes().find(p=>p.talisma===id);
  return {titulo:`Talismã: ${t.nome} ${lv?`${lv} → ${lv+1}`:"(novo)"}`, raridade:"epico", sprite:iconeTalisma(id), suave:true, texto:`${t.texto} por nível <span class='bom'>(total ${efeitoTalismaTxt(t,lv)} → ${efeitoTalismaTxt(t,lv+1)})</span>. Abre os Despertos ${abre}.${uniao?` Completa o caminho da União ${uniao.uniao}.`:""} Encaixes: ${tem.length+(lv?0:1)}/${PD().encaixes}.`,
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
function aoDisparar(s,k,a,el,cor){ if(k!=="b"&&!SIM.ativo) circuloInvocacao(s.x,s.y+3,el,10+est(s)*2.5,0.6,false);   // habilidade: círculo pequeno sob o monstro
 if(!(s.desp&&s.desp[k])) return; const f=(COMPORTAMENTO[L(s).classe]||{})[k]; if(f) try{ f(s,atribPoder(a,s,k),el,cor); }catch(err){} }
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
// escolha do herói da run: o Invocador básico ou uma Lenda/deus já liberado. Cada carta mostra a arte, o poder e a
// afinidade com o Pacto (quantos elementos em comum), para a escolha ter peso; as bloqueadas dizem como liberar
function arteHeroiLenda(l){ const img=folhaArte(l.dom?`arte/panteao/${l.id}.png`:`arte/lendas/${l.id}.png`); if(!img||!fatiarFolha(img,6,3).valida) return null; return quadroAnim(img,0,0,64); }
function telaInvocador(pacto,id,esperou){ metaConq(); const livres=[...D.panteao.filter(g=>(META.deuses||[]).includes(g.id)), ...D.lendas.filter(l=>META.lendas.includes(l.universo))];
  if(!livres.length){ novaRun(pacto,id); salvarRun(); iniciarMapa(); return; }
  const nomes=livres.map(l=>l.dom?`arte/panteao/${l.id}.png`:`arte/lendas/${l.id}.png`);
  if(!esperou&&nomes.some(n=>{ const im=ARTE_IMG[n]; return im&&!im.pronta&&!im.falhou; })){ Promise.race([preCarregar(nomes),new Promise(ok=>setTimeout(ok,2500))]).then(()=>telaInvocador(pacto,id,true)); return; }
  const ir=lid=>{ novaRun(pacto,id); R.lenda=lid; R.lendaNv=lid?1:0; salvarRun(); iniciarMapa(); };
  const total=D.lendas.length+D.panteao.length, estrelas=l=>pacto.filter(el=>l.elementos.includes(el)).length;
  const cartas=livres.map(l=>{ const n=estrelas(l), arte=arteHeroiLenda(l);
    return {titulo:l.nome, raridade:l.dom?"lendario":"epico", sprite:arte||undefined, suave:true, classe:arte?"grande":null,
      texto:`<span style="color:${COR[l.elementos[0]]}">${NOME_EL(l.elementos[0])}</span> e <span style="color:${COR[l.elementos[1]]}">${NOME_EL(l.elementos[1])}</span> · ${l.poder.nome} · ${l.dom?`Dom: ${l.dom.nome} · Fardo: ${l.fardo}`:l.passiva.nome}<br>`+
        (n? `<span class='bom'>Combina com o seu Pacto</span>: cada monstro de ${l.elementos.map(NOME_EL).join(" ou ")} na equipe dá ★ (mais dano e poder).` : `Sem elemento em comum com o Pacto: pouca afinidade.`)+(l.universo?` Terra Natal: ${UNIV[l.universo]?UNIV[l.universo].nome:""}.`:""),
      acao:()=>ir(l.id), _n:n}; }).sort((a,b)=>b._n-a._n);
  mostrarCartas("Quem comanda a equipe?",`Lendas e deuses liberados: ${livres.length}/${total}. Complete os murais dos reinos para liberar mais.`,
    [{titulo:"Invocador", texto:"O herói básico, sem poder próprio.", sprite:quadroHeroi("p",0,false,COR[pacto[0]]), classe:"grande", acao:()=>ir(null)}, ...cartas],{grade:cartas.length>3}); }
function cartaLenda(){ const l=LENDA(); if(!l||(R.lendaNv||1)>=5||Math.random()>0.3) return null;
  return {titulo:`${l.poder.nome} ${R.lendaNv} → ${R.lendaNv+1}`, raridade:"lendario", texto:`Poder da Lenda (${TIPOS_LENDA_TXT[l.poder.tipo]||""}): +25% de dano e −5% de recarga.`, acao:()=>{ R.lendaNv++; proximaEscolha(); }}; }
const TIPOS_LENDA_TXT={orbita:"gira em volta",projetil:"arremesso",onda:"onda de choque",invocar:"aliados",raio:"raio em cadeia",barril:"explosivo",investida:"avanço",area:"zona no chão",drenar:"rouba vida",dardos:"disparos rápidos"};
function atualizarLenda(dt){ const l=LENDA(); if(!l||!J||J.fim) return; if(J.lendaPose){ J.lendaPose.t+=dt; if(J.lendaPose.t>=J.lendaPose.dur) J.lendaPose=null; } atualizarDom(dt); const p=l.poder, nv=R.lendaNv||1, P=J.jogador, el=l.elementos[0], el2=l.elementos[1], cor=COR[el];
  const base=(ativos().reduce((t,s)=>t+atrib(s).dano,0)/Math.max(1,ativos().length))*p.dano*(1+0.25*(nv-1))*(1+custo("dano_dia")*(UNIV[R.universo].luz&&!UNIV[R.universo].luz.noite?1:0))*(SIN.lendaPoder||1);   // afinidade e Terra Natal
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
function lendaReviver(){ const v=passiva("revive"); if(v&&!R.lendaReviveu){ R.lendaReviveu=true; J.vida=J.vidaMax*v; J.invuln=2; luzFlash(J.jogador.x,J.jogador.y,"#ffd34a",90,0.7); texto(J.jogador.x,J.jogador.y-24,`${LENDA().passiva.nome}!`,"#ffd34a",18); return true; } return false; }
function multDanoLenda(e){ let f=1; if(e.chefe||e.mini) f*=1+passiva("dano_chefe"); if(J.vida<J.vidaMax*0.4) f*=1+passiva("dano_baixa_vida"); f*=1+passiva("dano_por_elo")*(R.elos?R.elos.length:0);
  if(passiva("dano_serpentes")&&e.def&&(e.def.corpo==="serpente"||e.def.corpo==="bipede")) f*=1+passiva("dano_serpentes"); return f; }
// a Lenda (ou o deus) anda junto com a equipe, na posição do jogador. Folha 6x3 (arte/lendas/<id>.png ou arte/panteao/<id>.png):
// linha 1 parado (4), linha 2 andando (6), linha 3 lançando o poder ou o Dom Divino (6). Sem a folha, uma figura animada por código.
// a Lenda é o herói do centro: desenhada na posição do jogador, do tamanho de um herói (devolve false sem a arte, e entra o Invocador)
function desenharLenda(ox,oy){ const l=LENDA(); if(!l||!J) return false; const P=J.jogador, x=Math.round(P.x-ox), y=Math.round(P.y-oy+6), img=folhaArte(l.dom?`arte/panteao/${l.id}.png`:`arte/lendas/${l.id}.png`);
  const andando=Math.hypot(J.pvx||0,J.pvy||0)>5, pose=J.lendaPose, lancando=!!pose, esq=(J.pvx||0)<-1;
  if(img&&fatiarFolha(img,6,3).valida){ const f=fatiarFolha(img,6,3); let lin=lancando?2:andando?1:0; if(f.linhas[lin].qs.length<1) lin=0; const n=f.linhas[lin].qs.length;
    const q=lin===2? Math.min(n-1,Math.floor(pose.t/pose.dur*n)) : Math.floor(J.t*(lin===1?10:6))%n, s=quadroAnim(img,lin,q,34);
    if(s){ const resp=lin===0? 1+0.012*Math.sin(J.t*2.4) : 1; lg.save(); lg.translate(x,y+1); lg.rotate(Math.max(-0.08,Math.min(0.08,(J.pvx||0)/400))); lg.scale(esq?-1:1,resp); desenharSprite(s,-s.width/2,-s._pe,s.width,s.height); lg.restore(); return true; } }
  return false;   // sem a arte da Lenda: o Invocador entra no lugar
}
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
function nivelEscuro(){ const u=UNIV[R.universo], L=u&&u.luz; const c=crepusculo(); if(!L) return 0.1+c*0.15; return pisoEscuroK()*Math.min(0.6,(L.noite?0.34:0.1)+c*(L.noite?0.1:0.2)); }   /* noite mais clara: no celular os mapas noturnos ficavam escuros demais para ler */
// piso que já é escuro (reinos noturnos têm piso com brilho de 3% a 5%): a cor da noite e a sombra do mapa pesam menos,
// senão as três camadas juntas deixavam a tela quase preta no celular
function pisoEscuroK(){ const l=typeof lumChao==="function"? lumChao() : 0.2; return l<0.08? 0.5 : l<0.15? 0.7 : 1; }
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
  // à noite os inimigos são visíveis: cada um abre um pouco de luz em volta de si
  { let ne=0; if(L.noite) for(const e of J.inimigos){ if(e.hp<=0||e.oculto) continue; if(++ne>70) break; furo(e.x,e.y-(e.tam||10)*0.4,(e.chefe?50:e.mini?30:16),e.chefe?0.8:0.5); } }
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
  const tom=crep>0? mistura(L.tom, L.noite?"#2a1a4a":"#c06a50", crep*0.6) : L.tom, forca=Math.min(0.55,L.forca+crep*(L.noite?0.06:0.16))*(J.escuro>0.05?0.4:1)*pisoEscuroK();
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
