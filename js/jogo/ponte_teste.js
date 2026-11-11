// Elementar · ponte de teste. Só é carregada com ?teste ou ?moderador no endereço (ver principal.js).
// Publica na página (window) todos os nomes exportados pelos módulos do jogo, para o robô (testes/bot.js), a verificação
// automática (testes/verificar.js) e o console do navegador. A leitura é sempre ao vivo; a escrita só existe para as variáveis
// que têm função de escrita no módulo dono (defJ, defPausado...).
import * as m01 from "./01_nucleo.js";
import * as m02 from "./02_combate.js";
import * as m03 from "./03_progressao.js";
import * as m04 from "./04_ambiente.js";
import * as m05 from "./05_arte.js";
import * as m06 from "./06_loop.js";
import * as m07 from "./07_cenario.js";
import * as m08 from "./08_sistemas.js";
import * as m09 from "./09_criaturas.js";
import * as m10 from "./10_desenho.js";
import * as m11 from "./11_menu.js";

/** variável → função de escrita no módulo dono */
const ESCRITA = {
  FONTE: "defFonte",
  pausado: "defPausado",
  rodando: "defRodando",
  RUN_SALVA: "defRunSalva",
  chao: "defChao",
  MAPA_SEG: "defMapaSeg",
  MINI_SEG: "defMiniSeg",
  J: "defJ",
  R: "defR",
  META: "defMeta"
};
const naoPublicados = [];
for (const m of [m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11]) {
  for (const nome of Object.keys(m)) {
    const escreve = ESCRITA[nome] && m[ESCRITA[nome]];
    try {
      Object.defineProperty(window, nome, {
        configurable: true,
        get: () => m[nome],
        set: escreve
          ? v => {
              escreve(v);
            }
          : () => {
              throw new Error(`"${nome}" não pode ser trocado de fora do módulo dono: falta uma função de escrita`);
            }
      });
    } catch (e) {
      naoPublicados.push(nome);
    } // nome que o navegador já usa e não deixa redefinir
  }
}
if (naoPublicados.length)
  console.warn("Elementar · ponte de teste: nomes não publicados (o navegador já usa): " + naoPublicados.join(", "));
