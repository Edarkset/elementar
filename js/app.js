// Elementar · comportamento de app (roda depois do jogo)
// - registra o service worker (jogo offline e instalável)
// - pede ao navegador para não apagar o save (o Safari do iPhone apaga dados de sites
//   não instalados depois de alguns dias sem uso)
// - mantém a tela acesa enquanto o jogo está aberto
// - bloqueia gestos do celular que atrapalham (zoom com dois dedos, menu de toque longo)
"use strict";
(function(){
  const P = window.Plataforma || /** @type {Partial<PlataformaJogo>} */({});
  const servido = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if("serviceWorker" in navigator && servido && P.nome === "web"){
    addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(r => r.update()).catch(e => console.warn("service worker", e));
      // versão nova publicada: o service worker novo assume e a página recarrega uma vez sozinha (senão o jogo antigo continuava aberto)
      const tinha = !!navigator.serviceWorker.controller; let recarregou = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (tinha && !recarregou) { recarregou = true; location.reload(); } });
    });
  }

  if(navigator.storage && navigator.storage.persist){
    navigator.storage.persisted().then(ok => { if(!ok) navigator.storage.persist(); }).catch(() => {});
  }

  // tela acesa
  let trava = null;
  async function manterAcesa(){
    if(!("wakeLock" in navigator) || document.hidden || trava) return;
    try{ trava = await navigator.wakeLock.request("screen"); trava.addEventListener("release", () => { trava = null; }); }catch(e){}
  }
  addEventListener("pointerdown", manterAcesa, { passive: true });
  document.addEventListener("visibilitychange", () => { if(!document.hidden) manterAcesa(); });

  // gestos do celular
  document.addEventListener("gesturestart", e => e.preventDefault());
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("touchmove", e => { if(e.touches.length > 1) e.preventDefault(); }, { passive: false });
})();
