// Roda o bot em várias páginas ao mesmo tempo e grava os resultados em JSON.
// node testes/rodar_bot.js --n 24 --paralelo 4 --mapas 12 --saida testes/res.json [--dif '{"vida":1.6}'] [--url http://localhost:8765/]
const { chromium } = require('playwright');
const arg=(k,d)=>{ const i=process.argv.indexOf('--'+k); return i>0? process.argv[i+1] : d; };
const N=+arg('n',12), PAR=+arg('paralelo',4), MAPAS=+arg('mapas',12), SAIDA=arg('saida','testes/res.json'), URL=arg('url','http://localhost:8765/'), DIF=arg('dif',null), S0=+arg('semente0',1), LOJA=arg('loja',null);   // --loja max: Santuário todo comprado
(async()=>{
  const b=await chromium.launch(); const res=[]; let prox=0;
  async function trab(){
    const ctx=await b.newContext({viewport:{width:900,height:600}}); const p=await ctx.newPage();
    p.on('pageerror',e=>console.error('ERRO pagina:',e.message));
    await p.goto(URL); await p.waitForFunction(()=>typeof novaRun==='function'); await p.addScriptTag({url:'testes/bot.js'});
    while(prox<N){ const i=prox++; const sem=S0+i;
      await p.evaluate(()=>{ localStorage.clear(); });
      await p.reload(); await p.waitForFunction(()=>typeof novaRun==='function'); await p.addScriptTag({url:'testes/bot.js'});
      const t0=Date.now();
      const r=await p.evaluate(([sem,m,dif,loja])=>{ if(loja==='max'){ META.loja={}; LOJA.forEach(it=>META.loja[it.id]=it.max); } return ElementarBot.rodar({semente:sem,maxMapas:m,dif:dif?JSON.parse(dif):null}); },[sem,MAPAS,DIF,LOJA]);
      res.push(r); require('fs').writeFileSync(SAIDA,JSON.stringify(res,null,1));   // grava a cada partida: uma bateria interrompida não se perde
      console.log(`#${sem} prof ${r.profundidade}${r.morreu?' (morreu no mapa '+r.mapaMorte+' aos '+r.tNoMapaMorte+'s)':''} ttk ${r.mapas.map(m=>m.ttkChefe).join(',')} vmin ${r.vidaMin.join(',')} niv ${r.nivel} [${((Date.now()-t0)/1000).toFixed(0)}s]`);
    }
    await ctx.close();
  }
  await Promise.all(Array.from({length:PAR},trab));
  require('fs').writeFileSync(SAIDA,JSON.stringify(res,null,1)); await b.close();
})();
