// Elementar · camada de plataforma
// Único lugar onde o jogo conversa com "onde ele está rodando".
//   - navegador / celular (PWA): save no localStorage, conquistas só dentro do jogo
//   - desktop (Electron, versão Steam): o preload expõe window.ElementarNativo com
//     save em arquivo (que o Steam Cloud sincroniza) e conquistas da Steam
// O jogo só chama Plataforma.*; para portar para outro lugar, basta outra implementação aqui.
"use strict";
(function(){
  const nativo = window.ElementarNativo || null;

  const web = {
    nome: "web",
    lerSave(chave){ try{ return localStorage.getItem(chave); }catch(e){ return null; } },
    gravarSave(chave, texto){ try{ localStorage.setItem(chave, texto); return true; }catch(e){ return false; } },
    conquista(id){},            // na web as conquistas ficam só no save
    sair: null                  // navegador não fecha a janela
  };

  const P = nativo ? {
    nome: nativo.nome || "desktop",
    lerSave(chave){
      try{ const t = nativo.lerSave(chave); if(t != null) return t; }catch(e){ console.warn("save nativo", e); }
      return web.lerSave(chave);   // primeira vez no desktop: aproveita um save antigo do navegador
    },
    gravarSave(chave, texto){
      try{ nativo.gravarSave(chave, texto); return true; }catch(e){ console.warn("save nativo", e); return web.gravarSave(chave, texto); }
    },
    conquista(id){ try{ nativo.conquista && nativo.conquista(id); }catch(e){} },
    sair: nativo.sair ? () => nativo.sair() : null
  } : web;

  P.instalado = nativo != null
    || matchMedia("(display-mode: fullscreen)").matches
    || matchMedia("(display-mode: standalone)").matches
    || navigator.standalone === true;

  window.Plataforma = P;
  // lista de artes que o jogo baixa (antes ficava num script dentro do index.html)
  if(!window.ARTE_MANIFESTO) window.ARTE_MANIFESTO = "arte/manifesto.json";
})();
