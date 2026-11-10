// Elementar · cenário vivo, desenho do cenário, arte de cenário e estrutura do mapa (abismos, pontes, lagos)
// Parte 7 de 11 da lógica do jogo: os arquivos de js/jogo/ são carregados em ordem pelo index.html e
// compartilham o mesmo escopo global (funções e constantes de uma parte valem nas outras).
"use strict";
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
  if(r()<0.4){ const tipo=pesoAleatorio(r,C.kit.props), n=r()<0.2? 2 : 1,   /* mapa menos poluído: menos objetos soltos e grupos menores */ bx=cx*CH+14+r()*68, by=cy*CH+14+r()*68;
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
function danificarProp(p,dano,el){ if(p.morto) return; const M=p.mat;
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
// onda de choque no ambiente: dobra a grama para fora, empurra objetos soltos e levanta poeira (golpes em área, mortes de elite,
// chefes e Despertar)
function rajada(x,y,R,forca){ const C=J&&J.cena; if(!C||SIM.ativo) return; const f=forca||1;
  for(let cy=Math.floor((y-R)/CEL);cy<=Math.floor((y+R)/CEL);cy++) for(let cx=Math.floor((x-R)/CEL);cx<=Math.floor((x+R)/CEL);cx++){ const bx=cx*CEL+4, by=cy*CEL+4, dx=bx-x, dy=by-y, d=Math.hypot(dx,dy)||1; if(d>R) continue;
    if(!tufoInfo(cx,cy)) continue; const k=cx+","+cy; let st=C.tufos.get(k); if(!st){ st={bx:0,by:0,vx:0,vy:0}; C.tufos.set(k,st); } const q=(1-d/R)*f*60; st.vx+=dx/d*q; st.vy+=dy/d*q; }
  for(const p of C.lista){ if(p.morto||p.mat.fixo) continue; const dx=p.x-x, dy=p.y-y, d=Math.hypot(dx,dy)||1; if(d>R) continue; const q=(1-d/R)*f*55/Math.max(1,(p.m||10)/10); /* objeto leve voa longe, pesado mal se mexe */ p.vx=(p.vx||0)+dx/d*q; p.vy=(p.vy||0)+dy/d*q; }
  if(QUAL>0) for(let i=0;i<Math.round(4*f);i++){ const a=Math.random()*6.28; particulaAr("poeira",x+Math.cos(a)*R*0.6,y+Math.sin(a)*R*0.5,1,Math.cos(a)*20,Math.sin(a)*12); } }
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
  for(let i=0;i<passos;i++) for(const st of C.tufos.values()){ const am=Math.exp(-V.c*h); st.vx*=am; st.vy*=am; st.vx-=V.k*st.bx*h; st.vy-=V.k*st.by*h; st.bx+=st.vx*h; st.by+=st.vy*h;
    const m=Math.hypot(st.bx,st.by); if(m>1.3){ st.bx*=1.3/m; st.by*=1.3/m; } }
  for(const [k,st] of C.tufos) if(Math.abs(st.bx)+Math.abs(st.by)<0.01&&Math.abs(st.vx)+Math.abs(st.vy)<0.05) C.tufos.delete(k);
  if(C.tufos.size>900) C.tufos.clear();
  for(const [k,t] of C.marcas) if(J.t-t>28) C.marcas.delete(k);
  // quem anda pela vegetação
  tocarTufos(P.x,P.y,4,J.pvx,J.pvy,dt);
  for(const s of R.selos) if(s.mon&&s.x!=null) tocarTufos(s.x,s.y,3,s.vx||0,s.vy||0,dt);
  const ox=P.x-VW/2, oy=P.y-VH/2; let n=0;
  // a horda toca a vegetação em quadros alternados: metade dos inimigos por quadro, com o dobro do empurrão (mesmo efeito, metade do custo)
  const par=(C.quadro=(C.quadro||0)+1)&1, L=J.inimigos;
  for(let i=par;i<L.length;i+=2){ const e=L[i]; if(e.hp<=0||e.x<ox-10||e.x>ox+VW+10||e.y<oy-10||e.y>oy+VH+10) continue; if(++n>70) break; tocarTufos(e.x,e.y,e.r*0.8,e.vx||0,e.vy||0,dt*2,true); } }

// ---------------------------------------------------------------- pegadas e ondas na água
function rastroDe(o,x,y,dist,r){ const C=J.cena; o._pd=(o._pd||0)+dist; if(o._pd<5) return; o._pd=0;
  const t=soloEm(Math.floor(x/CEL),Math.floor(y/CEL)), antes=o._soloAnt; o._soloAnt=t;
  // entrou na água: respingo de gotas; passos no chão seco levantam um pouco de poeira
  if((t==="agua"||t==="eletrico")&&antes&&antes!=="agua"&&antes!=="eletrico"&&!SIM.ativo){ particulas(x,y,"#cfeaff",6,55); for(let i=0;i<3;i++) C.ondas.push({x:x+rnd(-3,3),y:y+2,r:1+i*2,vida:0.9}); }
  if((t==="chao"||t==="areia"||t==="rachado"||t==="cinza")&&!SIM.ativo&&QUAL>0&&dist>0.6&&Math.random()<0.5) particulaAr("poeira",x+rnd(-1.5,1.5),y+r*0.5,0.5,rnd(-6,6),rnd(-3,3));
  if(t==="agua"||t==="eletrico"){ if(C.ondas.length<80) C.ondas.push({x,y:y+2,r:1,vida:1}); return; }
  if(t==="molhado"&&C.ondas.length<80&&Math.random()<0.4) C.ondas.push({x,y:y+2,r:0.6,vida:0.6});
  const cor=t==="molhado"?"#16202e": t==="queimado"?"#0e0a08": t==="lama"?"#3a2818": t==="areia"?tom(COR_SOLO.areia[0],.75): t==="cinza"?"#2a2830": (t==="gelo"&&frio())?"#9ab8d0": t==="grama"||t==="vinha"? null : null;
  if(!cor) return; o._lado=!o._lado; if(C.pegadas.length>240) C.pegadas.shift();
  C.pegadas.push({x:x+(o._lado?-1:1)*Math.max(1,r*0.3),y:y+r*0.6,cor,vida:t==="areia"?7:10,max:t==="areia"?7:10,tam:r>6?2:1}); }
function atualizarPegadas(dt){ const C=J.cena, P=J.jogador;
  // na areia o vento apaga as pegadas mais depressa (transporte de grãos)
  const apaga=1+C.Wm/45;
  const corAreia=C.corAreia||(C.corAreia=tom(COR_SOLO.areia[0],.75));   // antes a cor era recalculada para cada pegada, a cada quadro
  for(const p of C.pegadas) p.vida-=dt*(p.cor===corAreia?apaga:1); C.pegadas=C.pegadas.filter(p=>p.vida>0);
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
  sombraContato(p.x-ox,p.y-oy+1,s.width*0.7,0.45); p._alfa=(p._alfa??1)+((atras?0.45:1)-(p._alfa??1))*0.2; lg.globalAlpha=p._alfa;
  // planta de primeiro plano balança com o vento (inclinação a partir da base) e treme quando alguém passa por trás
  const C=J.cena, vento=(C&&C.Wx||0)*0.004, bal=Math.sin(J.t*1.3+p.x*0.05)*0.035+vento+(atras?Math.sin(J.t*9)*0.02:0), bx=Math.round(p.x-ox), by=Math.round(p.y-oy);
  lg.save(); lg.translate(bx,by); lg.transform(1,0,bal,1,0,0); lg.drawImage(s,-s.width/2,-s.height*(s.base||0.85)); lg.restore(); lg.globalAlpha=1; }
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
    if(pintado&&t==="chao"&&hash2(cx,cy,93)>0.2) continue;
    if(hash2(cx,cy,95)>0.6) continue;   // mapa menos poluído: 40% menos tufos em qualquer chão
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
// faixas de desenho de uma folha: algumas folhas foram exportadas com as linhas deslocadas da grade (uma faixa vazia em cima,
// poses mais baixas), e o corte pela grade pegava pedaço da pose vizinha. Se a folha tem exatamente 'rows' faixas separadas
// por linhas vazias, cada linha usa a sua faixa; senão, a grade comum
function faixasFolha(img,rows){ const k="_faixas"+rows; if(img[k]!==undefined) return img[k]; img[k]=null;
  try{ const c=document.createElement("canvas"); c.width=img.width; c.height=img.height; const g=c.getContext("2d"); g.drawImage(img,0,0); const d=g.getImageData(0,0,c.width,c.height).data, W=c.width, H=c.height;
    const bandas=[]; let on=false, y0=0; for(let y=0;y<H;y++){ let n=0; for(let x=0;x<W;x+=2) if(d[(y*W+x)*4+3]>40) n++; if(n>1&&!on){ on=true; y0=y; } else if(n<=1&&on){ on=false; if(y-y0>=6) bandas.push([y0,y]); } }
    if(on&&H-y0>=6) bandas.push([y0,H]);
    const ch=H/rows, fora=bandas.filter((b,i)=>Math.abs(b[1]-(i+1)*ch)>ch*0.12).length;
    if(bandas.length===rows&&fora>0) img[k]=bandas; }catch(e){}
  return img[k]; }
// pedaço da pose de cima invadindo o topo da célula: se no terço de cima existe uma linha vazia com desenho acima dela,
// o que está acima é de outra pose e sai
function limparTopoSolto(c){ try{ const g=c.getContext("2d"), W=c.width, H=c.height, d=g.getImageData(0,0,W,H).data, cheia=y=>{ for(let x=0;x<W;x++) if(d[(y*W+x)*4+3]>30) return true; return false; };
    let viu=false; for(let y=0;y<Math.floor(H*0.35);y++){ const t=cheia(y); if(t) viu=true; else if(viu){ let corpo=false; for(let y2=y+1;y2<H;y2++) if(cheia(y2)){ corpo=true; break; } if(corpo) g.clearRect(0,0,W,y); break; } }
    // o mesmo na base: pedaço da pose de baixo abaixo de uma linha vazia, no terço de baixo
    viu=false; for(let y=H-1;y>Math.floor(H*0.65);y--){ const t=cheia(y); if(t) viu=true; else if(viu){ let corpo=false; for(let y2=y-1;y2>=0;y2--) if(cheia(y2)){ corpo=true; break; } if(corpo) g.clearRect(0,y,W,H-y); break; } }
    // laterais: fiapo da coluna vizinha separado do corpo por uma coluna vazia, nos 15% de cada lado
    const col=x=>{ for(let y=0;y<H;y++) if(d[(y*W+x)*4+3]>30) return true; return false; }, L=Math.floor(W*0.15);
    for(const [ini,passo] of [[0,1],[W-1,-1]]){ let v=false; for(let i=0;i<L;i++){ const x=ini+i*passo, t=col(x); if(t) v=true; else if(v){ if(passo>0) g.clearRect(0,0,x,H); else g.clearRect(x+1,0,W-x-1,H); break; } } } }catch(e){} }
function celulaArte(img,cols,rows,col,row,w,h,base){ if(!img) return null; if(!img._id) img._id=++ID_IMG; const k=img._id+"|"+cols+"|"+rows+"|"+col+"|"+row+"|"+w+"|"+h;
  if(cacheCel.has(k)) return cacheCel.get(k); if(cacheCel.size>3000) cacheCel.clear();
  const cw=img.width/cols, ch=img.height/rows, c=document.createElement("canvas"); c.width=w; c.height=h; const g=c.getContext("2d"); g.imageSmoothingEnabled=false;
  // a célula entra inteira mantendo a proporção (folhas exportadas com outra proporção não ficam esticadas); a linha de apoio
  // (base) continua no mesmo ponto do quadro, então os pés não mudam de lugar
  const ky=correcaoAltura(img), b=base??1, e=Math.min(w/cw,h/(ch*ky)), dw=cw*e, dh=ch*e*ky, dx=(w-dw)/2, dy=b*(h-dh);   // ky: folha achatada na conversão
  const fx=faixasFolha(img,rows), syR= fx? Math.max(0,Math.min(img.height-ch,fx[row][1]+Math.round(ch*0.04)-ch)) : row*ch;   // linha deslocada: alinha pelo pé da faixa
  g.drawImage(img,Math.round(col*cw),Math.round(syR),Math.round(cw),Math.round(ch),dx,dy,dw,dh); c.base=b;
  limparTopoSolto(c);
  c._src={img,sx:Math.round(col*cw),sy:Math.round(syR),sw:Math.round(cw),sh:Math.round(ch),dest:[dx/w,dy/h,dw/w,dh/h]}; cacheCel.set(k,c); return c; }
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
const ALVO_ARTE=[18,21,24,28];   // altura do monstro com arte, por estágio (pixels de mundo). Antes 24 a 44: os evoluídos ficavam maiores que o herói e cobriam tudo
function encaixarArte(img,sx,sy,sw,sh,alvo){ const bb=bboxCelula(img,sx,sy,sw,sh), ky=correcaoAltura(img), k=Math.min(alvo/bb.w,alvo/(bb.h*ky)), w=Math.max(1,Math.round(bb.w*k)), h=Math.max(1,Math.round(bb.h*ky*k));
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
const TAM_PISO=220;   // o piso de 512 px cobre 220 px de mundo (antes 300: as peças do piso ficavam enormes perto dos personagens)
// realce leve de nitidez (máscara de desfoque), feito uma vez quando o piso carrega; a borda dá a volta para continuar emendando
function nitidez(c,k){ if(SIM.ativo) return c; try{ const g=c.getContext("2d"), w=c.width, h=c.height, im=g.getImageData(0,0,w,h), d=im.data, o=new Uint8ClampedArray(d);
    for(let y=0;y<h;y++){ const ym=((y-1+h)%h)*w, yp=((y+1)%h)*w, y0=y*w; for(let x=0;x<w;x++){ const xm=(x-1+w)%w, xp=(x+1)%w, i=(y0+x)*4;
      for(let ch=0;ch<3;ch++){ const blur=(o[(ym+x)*4+ch]+o[(yp+x)*4+ch]+o[(y0+xm)*4+ch]+o[(y0+xp)*4+ch])*0.25; d[i+ch]=o[i+ch]+(o[i+ch]-blur)*k; } } }
    g.putImageData(im,0,0); }catch(e){} return c; }
// piso pintado mais calmo: a arte do chão tem muito contraste e detalhe (flores, trepadeiras, ladrilhos) e competia com
// monstros e inimigos; tira 20% do contraste, 25% da saturação e escurece um pouco, uma vez só quando o mapa começa
function acalmarPiso(c){ if(SIM.ativo) return c; try{ const g=c.getContext("2d"), im=g.getImageData(0,0,c.width,c.height), d=im.data;
    let soma=0, n=0; for(let i=0;i<d.length;i+=4*97){ soma+=d[i]*0.299+d[i+1]*0.587+d[i+2]*0.114; n++; } const media=soma/n, luz=media<25? 1.45 : media<45? 1.25 : 0.97;   /* piso muito escuro clareia */
    for(let i=0;i<d.length;i+=4){ const r=d[i], gg=d[i+1], b=d[i+2], L=r*0.299+gg*0.587+b*0.114;
      for(let ch=0;ch<3;ch++){ const v=d[i+ch], s=L+(v-L)*0.75; d[i+ch]=(118+(s-118)*0.8)*luz; } }
    g.putImageData(im,0,0); }catch(e){} return c; }
// piso repetido sem costura. A maioria das artes já emenda sozinha e volta como está. As que não emendam nas bordas
// (padrões geométricos como o da Pérsia) viram 4 cópias espelhadas, que emendam sem costura nenhuma; cada cópia cobre
// o mesmo tamanho de mundo, então quem usa dobra o tamanho do piso (c._espelho)
function emendaNasBordas(g,T){ try{ const d=g.getImageData(0,0,T,T).data, px=(x,y)=>(y*T+x)*4, dif=(a,b)=>Math.abs(d[a]-d[b])+Math.abs(d[a+1]-d[b+1])+Math.abs(d[a+2]-d[b+2]);
    let meio=0, ex=0, ey=0, n=0; for(let k=0;k<T;k+=2){ meio+=dif(px(T>>1,k),px((T>>1)+1,k))+dif(px(k,T>>1),px(k,(T>>1)+1)); ex+=dif(px(0,k),px(T-1,k)); ey+=dif(px(k,0),px(k,T-1)); n++; }
    meio/=2*n; return ex/n<=meio*1.3+4&&ey/n<=meio*1.3+4; }catch(e){ return true; } }   // costura = borda bem mais diferente que pixels vizinhos do meio
function tornarContinuo(img,T){ const c=document.createElement("canvas"); c.width=c.height=T; const g=c.getContext("2d"); g.imageSmoothingEnabled=false; g.drawImage(img,0,0,T,T);
  if(emendaNasBordas(g,T)) return c;
  const T2=Math.min(2048,T*2), h2=T2/2, e=document.createElement("canvas"); e.width=e.height=T2; const ge=e.getContext("2d"); ge.imageSmoothingEnabled=true; ge.imageSmoothingQuality="high";
  for(const [sx,sy] of [[1,1],[-1,1],[1,-1],[-1,-1]]){ ge.save(); ge.translate(sx<0?T2:0,sy<0?T2:0); ge.scale(sx,sy); ge.drawImage(img,0,0,h2,h2); ge.restore(); }   // normal, espelhada na horizontal, na vertical e nas duas
  e._espelho=true; return e; }
// o piso é guardado na resolução do arquivo (até 2048 px) e desenhado com 512 px de mundo
function chaoArte(u){ const piso=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__piso.png`]; if(piso&&piso.pronta){ const T=SIM.ativo?512:Math.max(512,Math.min(2048,piso.width)); const cv=acalmarPiso(nitidez(tornarContinuo(piso,T),0.2)); chao={cv,u,tam:TAM_PISO*(cv._espelho?2:1),suave:true}; return true; }
  const img=ARTE_IMG[`arte/reinos/${u.era}/${u.id}__tiles.png`]; if(!img||!img.pronta) return false;
  const c=document.createElement("canvas"); c.width=c.height=128; const g=c.getContext("2d"), r=semente(u.id+"chao"); g.imageSmoothingEnabled=false;
  for(let y=0;y<8;y++) for(let x=0;x<8;x++){ const v=Math.floor(r()*8); g.drawImage(celulaArte(img,8,3,v,0,16,16),x*16,y*16); }
  chao={cv:c,u}; return true; }
// manchas (linha 2) e enfeites (linha 3) espalhados em cada pedaço de 96 px
function detalhesArte(r){ const img=folhaU("tiles"); if(!img) return null; const out=[];
  // mapa menos poluído: menos manchas e enfeites por pedaço; sobre piso pintado (que já tem detalhe próprio), quase nenhum
  const pintado=!!(chao&&chao.suave), nM=pintado?0:1+(r()<0.4?1:0), pE=pintado?0.25:0.45;
  for(let i=0;i<nM;i++) out.push({s:celulaArte(img,8,3,Math.floor(r()*8),1,32,32), x:r()*80-8, y:r()*80-8, w:14+r()*6, a:0.5+r()*0.2});
  for(let i=0;i<2;i++){ if(r()>pE) continue; out.push({s:celulaArte(img,8,3,Math.floor(r()*8),2,32,32), x:r()*84, y:r()*84, w:9+r()*4, a:1}); }
  return out; }


// ---------------------------------------------------------------- marcos, luzes e peças de primeiro plano (folha 4x2)
function sortearMarcos(cx,cy,r,out){ const img=folhaU("props"); if(!img) return;
  const x=cx*CH+10+r()*76, y=cy*CH+10+r()*76; if(Math.abs(x)<40&&Math.abs(y)<40) return; if(!lugarDeObjeto(x,y,22)) return;
  const sorte=r()*1.5; /* mapa menos poluído: ~1/3 menos marcos */ if(sorte<0.3) out.push(Object.assign(novoProp("marco",x,y,r),{idx:Math.floor(r()*6)}));
  else if(sorte<0.42) out.push(Object.assign(novoProp("luz",x,y,r),{idx:6}));
  else if(sorte<0.54) out.push(Object.assign(novoProp("frente",x,y,r),{idx:7})); }
// marcos: recorta só a parte desenhada da célula (a folha tem muita margem vazia) e dá a altura certa para cada tipo
// (colunas e estátuas altas, templo e árvore grandes, braseiro baixo); antes a célula inteira virava um quadrado e tudo saía pequeno
const ALT_MARCO=[56,30,60,56,62,48,44,74];   // 6 = luz (lampião, braseiro): era 32 e ficava baixinho perto das construções
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
  const tam=Math.round((TAM_OBJ[t]||14)*1.8*(p.carvalho?1.4:1));   /* antes 1,35: vaso e caixote saíam menores que a cabeça do herói */ return celulaArte(img,8,rows,col,lin,tam,tam,0.85); }
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
  if(J.chefeVivo||J.miniFeito) for(const e of J.inimigos) if((e.chefe||e.mini)&&e.hp>0&&!e.dash&&!e.noAr&&!e.oculto&&abismoEm(e.x,e.y,0)){ const f=abismoEm(e.x,e.y,0), dx=e.x-f.x, dy=e.y-f.y, d=Math.hypot(dx,dy)||1; e.x+=dx/d*60*dt; e.y+=dy/d*60*dt; }
  // inimigos andando: empurrados para a borda; se um golpe os jogou fundo no buraco, caem
  // sem abismo nas zonas vizinhas não há o que conferir; com abismo, confere metade dos inimigos por quadro
  const temAbismo=pecasPerto(P.x,P.y).some(f=>f.tipo==="abismo"), parA=(C.quadroA=(C.quadroA||0)+1)&1, LI=J.inimigos;
  if(temAbismo) for(let i=parA;i<LI.length;i+=2){ const e=LI[i]; if(e.hp<=0||voa(e)||Math.abs(e.x-P.x)>VW||Math.abs(e.y-P.y)>VH) continue;
    if(fundoDoAbismo(e.x,e.y)>0.12){ queda(e.x,e.y,e.spr,e.esc||1); texto(e.x,e.y-10,"Caiu!","#e8e0ff",12); evento("queda"); e.semCadaver=true; e.hp=0; morrer(e); continue; }
    if(sairDoAbismo(e,e.r*0.6)){ const f=abismoEm(e.x,e.y,e.r+2)||pecasPerto(e.x,e.y).find(g=>g.tipo==="abismo"); if(f){ const dx=e.x-f.x, dy=e.y-f.y, d=Math.hypot(dx,dy)||1, lado=(e.semente||1)%2?1:-1; e.x+=-dy/d*lado*e.v*0.5*dt*2; e.y+=dx/d*lado*e.v*0.5*dt*2; } } }
  // objetos empurrados para o vazio caem; cristais no chão escorregam para a beirada (nunca ficam perdidos)
  if(temAbismo){
    for(const p of C.lista){ if(p.morto||p.mat.fixo||p.caindo) continue; if(abismoEm(p.x,p.y,-p.r*0.4)){ p.caindo=0.7; p.vx*=0.3; p.vy*=0.3; } }
    for(const g of C.destrocos) if(g.z<1&&abismoEm(g.x,g.y,0)) g.vida=Math.min(g.vida,0.2);
    { const G=J.gemas; for(let i=parA;i<G.length;i+=2) sairDoAbismo(G[i],2); }   // cristais: metade por quadro (eram centenas de conferências por quadro)
    // ovos e monstros selvagens nunca ficam no vazio (senão ficam inalcançáveis)
    for(const o of J.ovosMapa) sairDoAbismo(o,5); for(const o of J.selvagens) sairDoAbismo(o,5); if(J.ovoAnc) sairDoAbismo(J.ovoAnc,6); }
  for(const p of C.lista){ if(p.caindo>0){ p.caindo-=dt; if(p.caindo<=0){ p.morto=true; } } }
  atualizarFauna(dt); }
function queda(x,y,spr,esc){ J.quedas=J.quedas||[]; J.quedas.push({x,y,spr,esc,t:0}); }
// ---------------------------------------------------------------- desenho: peças planas, abismo com paralaxe, paredões, ponte
function fundoAbismo(){ const img=folhaU("fundo"); if(img) return img; const C=J.cena; if(C.fundoProc) return C.fundoProc;
  const c=document.createElement("canvas"); c.width=c.height=128; const g=c.getContext("2d"); g.fillStyle="#cfdcea"; g.fillRect(0,0,128,128);
  for(let i=0;i<26;i++){ const x=(i*53)%128, y=(i*37)%128, r=10+(i*7)%18; for(const [dx,dy] of [[0,0],[128,0],[-128,0],[0,128],[0,-128]]){ g.globalAlpha=0.55; g.drawImage(bolhaCor(i%3?"#ffffff":"#e8f0f8"),x-r+dx,y-r+dy,r*2,r*2); } }
  C.fundoProc=c; return c; }
// paredão do abismo: a folha tem 4 rochas (linha 1) e 4 quadros de cachoeira (linha 2), cada uma com margem transparente dos lados.
// Fatiar a célula inteira fazia uma fileira de blocos com buracos e topos repetidos; aqui cada rocha é recortada pelo desenho
// (sem as bordas irregulares) e as 4 viram uma faixa contínua, alinhadas pelo topo da grama
function faixaParedao(img){ if(!img) return null; if(img._faixa) return img._faixa;
  const cw=img.width/4, ch=img.height/2, t=document.createElement("canvas"); t.width=img.width; t.height=img.height; const tg=t.getContext("2d"); tg.drawImage(img,0,0);
  let d; try{ d=tg.getImageData(0,0,t.width,t.height).data; }catch(e){ return null; }
  const caixa=(c,r)=>{ let x0=1e9,x1=-1,y0=1e9; for(let y=r*ch;y<(r+1)*ch;y++) for(let x=c*cw;x<(c+1)*cw;x++) if(d[(y*t.width+x)*4+3]>40){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; } return x1<0? null : {x0,x1,y0}; };
  const linha=r=>{ const bs=[0,1,2,3].map(c=>caixa(c,r)).filter(Boolean); return bs.map(b=>{ const w=b.x1-b.x0+1, m=Math.round(w*0.12); return {sx:b.x0+m, sw:w-2*m, sy:b.y0}; }); };
  const rochas=linha(0), quedas=linha(1); if(!rochas.length) return null;
  const H=Math.round(ch*0.82), W=rochas.reduce((a,b)=>a+b.sw,0), c=document.createElement("canvas"); c.width=Math.max(W,quedas.reduce((a,b)=>a+b.sw,0)); c.height=H*2; const g=c.getContext("2d");
  let x=0; for(const b of rochas){ g.drawImage(img,b.sx,b.sy,b.sw,H,x,0,b.sw,H); x+=b.sw; }
  const qs=[]; x=0; for(const b of quedas){ g.drawImage(img,b.sx,b.sy,b.sw,H,x,H,b.sw,H); qs.push({x,w:b.sw}); x+=b.sw; }
  img._faixa={c, w:W, h:H, quedas:qs.length?qs:[{x:0,w:W}]}; return img._faixa; }
// ponte: recorta a ponte pelo desenho (a célula tem muita margem). De frente (atravessando na horizontal) usa tudo, com os arcos;
// na vertical usa só o tabuleiro e os parapeitos (as linhas que cobrem a largura toda), girado: antes os arcos ficavam de lado
function faixaPonte(pec){ if(pec._ponte!==undefined) return pec._ponte; pec._ponte=null; const cw=pec.width/2, ch=pec.height/2, bb=bboxCelula(pec,cw,ch,cw,ch);
  const t=document.createElement("canvas"); t.width=Math.max(1,Math.round(bb.w)); t.height=Math.max(1,Math.round(bb.h)); const g=t.getContext("2d"); g.drawImage(pec,bb.x,bb.y,bb.w,bb.h,0,0,t.width,t.height);
  let shDeck=bb.h; try{ const d=g.getImageData(0,0,t.width,t.height).data; let ult=-1; for(let y=0;y<t.height;y++){ let n=0; for(let x=0;x<t.width;x++) if(d[(y*t.width+x)*4+3]>40) n++; if(n>=t.width*0.88) ult=y; } if(ult>t.height*0.3) shDeck=(ult+1)*bb.h/t.height; }catch(e){}
  pec._ponte={sx:bb.x, sy:bb.y, sw:bb.w, sh:bb.h, shDeck}; return pec._ponte; }
// névoa do abismo: degradê vertical (transparente -> cor média do fundo) usado para dissolver a base do paredão
function nevoaAbismo(fundo){ if(fundo._nev) return fundo._nev; let r=200,g=210,b=225; try{ const c=document.createElement("canvas"); c.width=c.height=8; const gc=c.getContext("2d"); gc.drawImage(fundo,0,0,8,8); const d=gc.getImageData(0,0,8,8).data; r=g=b=0; for(let i=0;i<d.length;i+=4){ r+=d[i]; g+=d[i+1]; b+=d[i+2]; } r/=64; g/=64; b/=64; }catch(e){}
  const n=document.createElement("canvas"); n.width=1; n.height=64; const gn=n.getContext("2d"), gr=gn.createLinearGradient(0,0,0,64); gr.addColorStop(0,`rgba(${r|0},${g|0},${b|0},0)`); gr.addColorStop(0.55,`rgba(${r|0},${g|0},${b|0},.75)`); gr.addColorStop(1,`rgba(${r|0},${g|0},${b|0},1)`); gn.fillStyle=gr; gn.fillRect(0,0,1,64);
  fundo._nev=n; return n; }
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
    // profundidade em camadas: uma segunda cópia do fundo, maior e mais escura, anda mais rápido (mais perto); ilhas de rocha
    // flutuam devagar no meio do caminho; partículas de luz sobem do fundo
    { const T2=TF*1.6, p2=0.7, ax=-(ox*p2+C.t*C.Wx*0.3), ay=-(oy*p2); const x2=((ax%T2)+T2)%T2-T2, y2=((ay%T2)+T2)%T2-T2;
      lg.globalAlpha=0.35; for(let y=y2;y<VH+T2;y+=T2) for(let x=x2;x<VW+T2;x+=T2) lg.drawImage(fundo,x,y,T2,T2); lg.globalAlpha=1;
      if(QUAL>0) for(let i=0;i<3;i++){ const h=hash2(Math.round(f.x)+i*31,Math.round(f.y),83), px=ex+(h-0.5)*f.rx*1.4+Math.sin(C.t*0.15+i*2)*6-(ox*0.15%40), py=ey+(hash2(i,Math.round(f.y),87)-0.2)*f.ry*0.9+Math.sin(C.t*0.4+i)*2.5, w=8+h*10;
        lg.fillStyle="rgba(10,10,22,.35)"; lg.beginPath(); lg.ellipse(px,py+w*0.9,w*0.7,w*0.18,0,0,Math.PI*2); lg.fill();   // sombra lá embaixo
        lg.fillStyle="#4a4450"; lg.beginPath(); lg.moveTo(px-w,py); lg.lineTo(px+w,py); lg.lineTo(px+w*0.4,py+w*0.7); lg.lineTo(px,py+w*1.1); lg.lineTo(px-w*0.5,py+w*0.6); lg.closePath(); lg.fill();   // rocha
        lg.fillStyle="#6a8a4a"; lg.fillRect(px-w,py-1.5,w*2,2); lg.fillStyle="rgba(255,255,255,.18)"; lg.fillRect(px-w,py,w*2,1); }   // grama em cima e luz na beirada
      lg.globalCompositeOperation="lighter"; for(let i=0;i<8;i++){ const q=((C.t*0.08+i/8)%1), mx=ex+Math.sin(i*7.1)*f.rx*0.8+Math.sin(C.t+i)*2, my=ey+f.ry*0.9-q*f.ry*1.8; lg.globalAlpha=0.6*Math.sin(q*Math.PI); lg.fillStyle="#fff6d0"; lg.fillRect(Math.round(mx),Math.round(my),1,1); }
      lg.globalCompositeOperation="source-over"; lg.globalAlpha=1; }
    // profundidade: mais escuro junto ao paredão (fundo do precipício) e névoa subindo
    const R2=Math.max(f.rx,f.ry)*1.25, gp=lg.createLinearGradient(0,ey-R2,0,ey+R2); gp.addColorStop(0,"rgba(4,4,12,.5)"); gp.addColorStop(0.4,"rgba(8,10,22,.2)"); gp.addColorStop(1,"rgba(10,14,30,.05)");   /* mais claro: o mar de nuvens do fundo virava uma mancha cinza */
    lg.fillStyle=gp; lg.fillRect(ex-R2,ey-R2,R2*2,R2*2);
    lg.globalCompositeOperation="lighter"; for(let i=0;i<5;i++){ const q=((C.t*0.03+i/5)%1), mx=ex+Math.sin(i*2.3+C.t*0.2)*f.rx*0.5, my=ey+f.ry*0.6-q*f.ry*1.2; lg.globalAlpha=0.07*Math.sin(q*Math.PI); lg.drawImage(bolhaCor("#c8d4f0"),mx-f.rx*0.45,my-f.ry*0.22,f.rx*0.9,f.ry*0.44); } lg.globalCompositeOperation="source-over"; lg.globalAlpha=1;
    // paredão: acompanha a curva da borda de cima, em fatias finas; um trecho por buraco vira cachoeira
    const fx=faixaParedao(folhaU("paredao")), PH=40, passo=1, nev=nevoaAbismo(fundo), hf=hash2(Math.round(f.x),Math.round(f.y),61), var0=Math.floor(hf*4);
    const cach0=hf<0.55? (hash2(Math.round(f.x),3,7)-0.5)*f.rx*1.2 : null;
    const xMin=Math.min(...f.pts.map(p=>p[0])), xMax=Math.max(...f.pts.map(p=>p[0]));
    for(let wx=xMin;wx<xMax;wx+=passo){ const tp=topo(wx+passo/2); if(tp==null) continue; const yt=ey+tp, x=ex+wx;
      const agua=cach0!=null&&Math.abs(wx-cach0)<12;
      // nas laterais íngremes o paredão virava uma escada de fatias: some aos poucos (só a borda de trás mostra a parede)
      { const t2=topo(wx+passo*1.5), incl=t2==null?9:Math.abs(t2-tp)/passo; lg.globalAlpha=Math.max(0,Math.min(1,1.8-incl*0.9)); if(lg.globalAlpha<=0.02){ lg.globalAlpha=1; continue; } }
      if(fx){ const k=PH/fx.h;
        if(agua){ const q=fx.quedas[Math.floor(J.t*8)%fx.quedas.length], u=(wx-cach0+12)/24; lg.drawImage(fx.c,q.x+u*q.w,fx.h,Math.max(1,q.w*passo/24),fx.h,x,yt-1,passo+0.6,PH); }
        else { const SW=fx.w*k, u=((((wx+f.x+var0*37)%SW)+SW)%SW)/k; lg.drawImage(fx.c,u,0,Math.min(passo/k,fx.w-u),fx.h,x,yt-1,passo+0.6,PH); } }
      else { const g=lg.createLinearGradient(0,yt,0,yt+26); g.addColorStop(0,"#7a7680"); g.addColorStop(1,"rgba(40,38,46,0)"); lg.fillStyle=g; lg.fillRect(x,yt,passo+0.6,26); if(agua){ lg.fillStyle="rgba(220,240,255,.7)"; lg.fillRect(x,yt,passo+0.6,26+Math.sin(J.t*9+wx)*2); } }
      // a parede se dissolve na névoa da cor do fundo (antes terminava num corte reto no meio do buraco)
      const a0=lg.globalAlpha; lg.globalAlpha=a0; lg.drawImage(nev,0,0,1,64,x,yt+PH*0.35,passo+0.6,PH*0.75);
      lg.globalAlpha=1;
      if(agua&&Math.random()<.012&&C.ar.length<400){ const p=particulaAr("bolhas",x+ox,yt+oy+30,0); p.cor="#ffffff"; p.vz=6; } }
    // sombra interna na beira (o chão de cima projeta sombra no fundo)
    // raízes e vinhas penduradas na borda de cima, balançando com o vento
    if(QUAL>0) for(let wx=xMin+4;wx<xMax-4;wx+=5){ const h=hash2(Math.round(f.x+wx),Math.round(f.y),91); if(h>0.45) continue; const tp=topo(wx); if(tp==null) continue; const yt=ey+tp, x=ex+wx, L=4+h*16, bal=Math.sin(C.t*1.5+wx*0.3)*1.5;
      lg.strokeStyle=h<0.2?"#3e5a2a":"#4a3422"; lg.lineWidth=0.8; lg.beginPath(); lg.moveTo(x,yt); lg.quadraticCurveTo(x+bal*0.5,yt+L*0.5,x+bal,yt+L); lg.stroke(); if(h<0.12){ lg.fillStyle="#6a9a4a"; lg.fillRect(Math.round(x+bal)-1,Math.round(yt+L)-1,2,2); } }
    // sombra interna suave na beira e luz que desce do alto (raios) por cima da névoa
    lg.strokeStyle="rgba(8,6,14,.22)"; lg.lineWidth=5; buraco(); lg.stroke();
    lg.globalCompositeOperation="lighter"; for(let i=0;i<3;i++){ const rx=ex+(i-1)*f.rx*0.55+Math.sin(C.t*0.3+i)*4, gr=lg.createLinearGradient(0,ey-f.ry,0,ey+f.ry); gr.addColorStop(0,"rgba(255,245,220,.12)"); gr.addColorStop(1,"rgba(255,245,220,0)"); lg.fillStyle=gr; lg.beginPath(); lg.moveTo(rx-4,ey-f.ry); lg.lineTo(rx+4,ey-f.ry); lg.lineTo(rx+16,ey+f.ry); lg.lineTo(rx-8,ey+f.ry); lg.fill(); }
    lg.globalCompositeOperation="source-over";
    lg.imageSmoothingEnabled=suave; lg.restore();
    // beirada: contorno escuro e uma luz fina na borda de baixo
    // beirada de pedra: lábio grosso escuro, luz fina na borda de baixo (a que está de frente) e cascalho ao longo da beira
    lg.lineJoin="round"; lg.strokeStyle="rgba(30,22,16,.35)"; lg.lineWidth=2.4; buraco(); lg.stroke(); lg.strokeStyle="rgba(255,236,200,.18)"; lg.lineWidth=0.6; buraco(); lg.stroke();   /* beirada mais fina: o contorno preto grosso parecia recortado */
    lg.strokeStyle="rgba(255,240,210,.5)"; lg.lineWidth=1; lg.beginPath(); let ini=true; for(let i=0;i<NP;i++){ const [px,py]=f.pts[i]; if(py<f.ry*0.25){ ini=true; continue; } lg[ini?"moveTo":"lineTo"](ex+px,ey+py+1.2); ini=false; } lg.stroke();
    for(let i=0;i<NP;i+=2){ const h=hash2(Math.round(f.x)+i,Math.round(f.y),71); if(h>0.55) continue; const [px,py]=f.pts[i], k=1.12+h*0.25, sx=ex+px*k, sy=ey+py*k, rr=0.8+h*2.2;
      lg.fillStyle="rgba(20,14,10,.55)"; lg.beginPath(); lg.ellipse(sx+0.4,sy+0.6,rr,rr*0.6,0,0,Math.PI*2); lg.fill(); lg.fillStyle="#6a6058"; lg.beginPath(); lg.ellipse(sx,sy,rr,rr*0.62,h*3,0,Math.PI*2); lg.fill();
      lg.fillStyle="rgba(255,240,220,.25)"; lg.beginPath(); lg.ellipse(sx-rr*0.25,sy-rr*0.2,rr*0.45,rr*0.25,0,0,Math.PI*2); lg.fill(); }
    lg.lineWidth=1; lg.lineJoin="miter";
    // ponte
    if(f.ponte){ const hz=f.ponte==="h", L=(hz?f.rx:f.ry)*2+14;
      const fp=pec&&faixaPonte(pec);
      if(fp){ const sh=hz? fp.sh : fp.shDeck, H=hz? 40 : 34, k=H/sh, PL=fp.sw*k; lg.save(); lg.translate(f.x-ox,f.y-oy); if(!hz) lg.rotate(Math.PI/2);
        const y0=hz? -H*0.42 : -H/2;   /* de frente, o tabuleiro fica no terço de cima do desenho: alinha com a faixa onde se anda */
        lg.beginPath(); lg.rect(-L/2,y0,L,H); lg.clip(); const suave=lg.imageSmoothingEnabled; lg.imageSmoothingEnabled=true;
        for(let x=-L/2-(PL-(L%PL))/2;x<L/2;x+=PL) lg.drawImage(pec,fp.sx,fp.sy,fp.sw,sh,x,y0,PL+0.5,H); lg.imageSmoothingEnabled=suave; lg.restore(); }
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
