// Elementar · entrada do jogo. O index.html carrega só este arquivo.
// Cada parte de js/jogo/ é um módulo: declara o que usa das outras (import) e o que oferece (export).
// A última parte (11) puxa a anterior, que puxa a anterior... até a 00; assim elas são avaliadas na ordem dos nomes dos
// arquivos (00, 01... 07, 07b, 07c... 11), e a 11 termina começando o jogo.
import "./11_menu.js";

// Modo de teste (endereço com ?teste ou ?moderador): expõe os nomes do jogo na página, como eram quando tudo era global.
// É o que o robô, a verificação automática e o console do navegador usam. Sem isso, nada do jogo fica no escopo global.
if (/[?&](teste|moderador|mod)\b/.test(location.search)) import("./ponte_teste.js");
