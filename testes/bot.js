// Bot do Elementar: joga sozinho dentro da página, acelerado, e devolve estatísticas da run.
// Uso (no console ou via Playwright):  await ElementarBot.rodar({semente:1, maxMapas:12, dif:{vida:1.5,dano:1.55}})
// Escolhas de cartas são aleatórias (com semente): serve como teste A/B das opções.
(function(){
  function rng(s){ let h=s>>>0||1; return ()=>{ h+=0x6D2B79F5; let t=h; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  const cartaVisivel=()=>document.getElementById("telaCartas").classList.contains("ativa");
  function escolherCarta(r,log){
    const titulo=document.getElementById("cartasTitulo").textContent;
    let bs=[...document.querySelectorAll("#cartas button.carta:not([disabled])")].filter(b=>!/^(Voltar|Ver equipe)/.test(b.querySelector("b")?.textContent||""));
    if(titulo==="Pausado"){ bs[0].click(); return; }
    // evita botões de "manter"/telas de gestão que só reabrem a mesma tela
    if(!bs.length){ const rod=[...document.querySelectorAll("#cartasRodape button:not([disabled])")]; if(rod.length){ rod[0].click(); return; } document.getElementById("telaCartas").classList.remove("ativa"); pausado=false; return; }
    const b=bs[Math.floor(r()*bs.length)]; log.push(titulo+" → "+(b.querySelector("b")?.textContent||"")); b.click();
  }
  function entrada(r){
    // foge do que está perto (peso cresce rápido abaixo de 45 px) e, no resto do tempo, vai atrás de cristais, ovos e filhotes
    const P=J.jogador, RR=45; let fx=0, fy=0, perto=1e9;
    for(const e of J.inimigos){ if(e.hp<=0) continue; const dx=P.x-e.x, dy=P.y-e.y, d=Math.hypot(dx,dy)+0.01, alc=RR+(e.chefe?25:e.mini?12:0)+(e.r||0); perto=Math.min(perto,d-(e.r||0));
      if(d<alc){ const q=(alc-d)/alc; fx+=dx/d*q*q*(e.chefe?2:1); fy+=dy/d*q*q*(e.chefe?2:1); } }
    for(const b of J.balas||[]){ const dx=P.x-b.x, dy=P.y-b.y, d=Math.hypot(dx,dy)+0.01; if(d<30){ const q=(30-d)/30; fx+=dx/d*q*1.5; fy+=dy/d*q*1.5; } }
    for(const z of J.perigos||[]){ const dx=P.x-z.x, dy=P.y-z.y, d=Math.hypot(dx,dy)+0.01, rr=(z.r||20)+10; if(d<rr){ fx+=dx/d*1.2; fy+=dy/d*1.2; } }
    const alvos=[...J.gemas,...J.ovosMapa,...J.selvagens]; let g=null, gd=1e12; for(const o of alvos){ const d=(o.x-P.x)**2+(o.y-P.y)**2; if(d<gd){ gd=d; g=o; } }
    if(g){ const d=Math.sqrt(gd)+0.01; fx+=(g.x-P.x)/d*0.45; fy+=(g.y-P.y)/d*0.45; }
    else { const a=J.t*0.35; fx+=Math.cos(a)*0.3; fy+=Math.sin(a)*0.3; }
    const m=Math.hypot(fx,fy)||1;
    return {x:fx/m, y:fy/m, esquivar: perto<8, despertar: J.ult>=100, combinado: J.comb<=0};
  }
  async function rodar(cfg){
    cfg=Object.assign({semente:1, maxMapas:12, maxSeg:3600, dif:null, passo:1/30}, cfg||{});
    const r=rng(cfg.semente); const rOrig=Math.random, gerador=rng(cfg.semente*7919+13); let sorteios=0; const semeado=()=>{ sorteios++; return gerador(); }; Math.random=semeado;
    // rastro (cfg.rastro): uma linha por segundo de jogo com o estado resumido. Duas execuções da mesma semente devem dar o mesmo rastro;
    // a primeira linha diferente mostra quando (e em que número) a partida deixou de ser a mesma
    const rastro=cfg.rastro? [] : null; let nRastro=0; const lupa=[];
    SIM.ativo=true; SIM.semArte=true; SIM.entrada=()=>entrada(r); let morreu=false; SIM.aoDerrota=()=>{ morreu=true; };
    if(cfg.dif) Object.assign(DIF,cfg.dif);
    const log=[]; document.getElementById("telaMenu").classList.remove("ativa");
    const pac=cfg.pacto|| (()=>{ const els=[...ELS].sort(()=>r()-.5); return els.slice(0, r()<0.5?2:3); })();
    const pool=META.liberados.filter(id=>pac.includes(LINHA[id].elemento)); const ini=cfg.inicial||pool[Math.floor(r()*pool.length)];
    novaRun(pac,ini); iniciarMapa(); rodando=false;   // o laço de desenho fica parado; o bot avança o tempo
    let tSim=0; const vidaMin=[]; let vm=1, profAnt=0;
    // medidas da horda por mapa: inimigos na tela (média e pico), abates, tempo com a vida baixa e tempo com a tela quase vazia
    const horda=[]; let am=null, cont=0; const novaAm=()=>({mapa:R.profundidade+1, n:0, somaTela:0, picoTela:0, picoTotal:0, baixa:0, vazia:0, abates0:R.abates, nivel0:J?J.nivel:1, rec0:R.st.recContato+R.st.recBala});
    const fechaAm=()=>{ if(!am||!am.n) return; horda.push({mapa:am.mapa, tela:+(am.somaTela/am.n).toFixed(1), picoTela:am.picoTela, picoTotal:am.picoTotal, abates:R.abates-am.abates0, niveis:(J?J.nivel:am.nivel0)-am.nivel0,
      vidaBaixa:+(am.baixa/am.n).toFixed(3), telaVazia:+(am.vazia/am.n).toFixed(3), seg:Math.round(am.n*0.5)}); };
    am=novaAm();
    while(!morreu && R.profundidade<cfg.maxMapas && tSim<cfg.maxSeg){
      for(let k=0;k<300;k++){
        if(cartaVisivel()){ escolherCarta(r,log); continue; }
        if(pausado){ pausado=false; }
        if(!J) break;
        tick(cfg.passo); tSim+=cfg.passo; if(J&&J.vidaMax>0) vm=Math.min(vm,J.vida/J.vidaMax); if(R.profundidade!==profAnt){ vidaMin.push(+vm.toFixed(2)); vm=1; profAnt=R.profundidade; fechaAm(); am=novaAm(); }
        // lupa (cfg.lupa={mapa,t0,t1}): estado completo a cada passo num trecho curto, para achar o que mudou primeiro entre duas execuções
        if(cfg.lupa&&J&&R.profundidade===cfg.lupa.mapa&&J.t>=cfg.lupa.t0&&J.t<=cfg.lupa.t1){ const f=v=>typeof v==="number"? +v.toFixed(3) : v;
          lupa.push({t:f(J.t), s:sorteios, P:[f(J.jogador.x),f(J.jogador.y),f(J.vida)], ini:J.inimigos.map(e=>[e.tipo,f(e.x),f(e.y),f(e.hp),e.def&&e.def.nome||"",e.tam||0,f(e.v)].join("|")),
            props:(J.cena?J.cena.lista:[]).map(q=>[q.tipo,f(q.x),f(q.y),f(q.hp),q.morto?1:0,f(q.r),q.esc].join("|")), selos:R.selos.filter(x=>x.mon).map(x=>[x.mon.id,f(x.x),f(x.y),f(x.cd),f(x.cd1),f(x.cd2)].join("|")),
            proj:J.proj.map(q=>[f(q.x),f(q.y),f(q.dano)].join("|")), crias:J.crias.map(q=>[f(q.x),f(q.y)].join("|")), zonas:J.zonas.map(q=>[q.tipo,f(q.x),f(q.y)].join("|")), balas:J.balas.length, perigos:(J.perigos||[]).length, gemas:J.gemas.length, solo:J.solo.size }); }
        if(rastro&&J&&++nRastro%30===0&&rastro.length<cfg.rastro){ let sx=0, sh=0; for(const e of J.inimigos){ sx+=e.x+e.y; sh+=e.hp===Infinity?0:e.hp; } rastro.push([R.profundidade, +J.t.toFixed(2), sorteios, J.inimigos.length, Math.round(sx*10), Math.round(sh), Math.round(J.jogador.x*100), Math.round(J.vida*10), J.nivel, J.gemas.length, J.proj.length, J.parts.length, J.cena?J.cena.lista.length:-1].join(' ')); }
        if(J&&++cont%15===0&&!J.fim&&!J.intro){ const P=J.jogador; let n=0; for(const e of J.inimigos){ if(e.hp>0&&Math.abs(e.x-P.x)<VW/2&&Math.abs(e.y-P.y)<VH/2) n++; }
          am.n++; am.somaTela+=n; am.picoTela=Math.max(am.picoTela,n); am.picoTotal=Math.max(am.picoTotal,J.inimigos.length); if(J.vida/J.vidaMax<0.35) am.baixa++; if(n<6&&!J.chefeVivo) am.vazia++; }
        if(J.vida<=0&&!morreu){ /* derrota() chama SIM.aoDerrota */ }
        if(morreu||R.profundidade>=cfg.maxMapas) break;
      }
      // Partida reproduzível: enquanto o navegador respira, (1) o laço normal do jogo fica parado (iniciarMapa religa "rodando" a cada mapa,
      // e um quadro extra em tempo real mudava a partida) e (2) o acaso da semente fica guardado, para que cargas de imagem e avisos
      // não gastem números dela. Sem isso a mesma semente repetia o primeiro mapa e depois divergia
      rodando=false; Math.random=rOrig; await new Promise(ok=>setTimeout(ok,0)); Math.random=semeado; rodando=false;
    }
    Math.random=rOrig; SIM.ativo=false; SIM.semArte=false; SIM.entrada=null; SIM.aoDerrota=null;
    fechaAm(); const st=R.st;
    return { semente:cfg.semente, pacto:pac, inicial:ini, profundidade:R.profundidade, morreu, tempo:Math.round(tSim), nivel:J?J.nivel:0,
      mapas:st.mapas, vidaMin, porFonte:st.porFonte||null, reliquias:R.reliquias.slice(), equipe:ativos().map(s=>({id:s.mon.id, classe:L(s).classe, el:elementoDe(s), est:estBase(s), nivel:s.nivel, ramo:s.mon.ramo, rar:s.mon.rar})),
      horda, rastro, lupa:cfg.lupa?lupa:undefined, sorteios, abates:R.abates, recContato:Math.round(st.recContato), recBala:Math.round(st.recBala), reacoes:st.reacoes, escolhas:log.slice(-400), vidaFinal:J?+(J.vida/J.vidaMax).toFixed(2):0, mapaMorte:morreu?R.profundidade+1:null, tNoMapaMorte:morreu&&J?Math.round(J.t):null };
  }
  window.ElementarBot={rodar};
})();
