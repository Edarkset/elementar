// Elementar · ponte de teste. Só é carregada com ?teste ou ?moderador no endereço (ver principal.js).
// Publica na página (window) todos os nomes exportados pelos módulos do jogo, para o robô (testes/bot.js), a verificação
// automática (testes/verificar.js) e o console do navegador. A leitura é sempre ao vivo; a escrita só existe para as variáveis
// que têm função de escrita no módulo dono (defJ, defPausado...).
import * as m0 from "./00_save.js";
import * as m1 from "./01_nucleo.js";
import * as m2 from "./02_combate.js";
import * as m3 from "./03_progressao.js";
import * as m4 from "./04_ambiente.js";
import * as m5 from "./05_arte.js";
import * as m6 from "./06_loop.js";
import * as m7 from "./07_cenario.js";
import * as m8 from "./07b_cenario_desenho.js";
import * as m9 from "./07c_cenario_arte.js";
import * as m10 from "./07d_estrutura.js";
import * as m11 from "./08_horda.js";
import * as m12 from "./08b_efeitos.js";
import * as m13 from "./08c_eventos.js";
import * as m14 from "./08d_poderes.js";
import * as m15 from "./08e_conquistas.js";
import * as m16 from "./08f_lendas.js";
import * as m17 from "./08g_luz.js";
import * as m18 from "./08h_interface.js";
import * as m19 from "./09_criaturas.js";
import * as m20 from "./09b_chefes.js";
import * as m21 from "./10_desenho.js";
import * as m22 from "./11_menu.js";

/** variável → função de escrita no módulo dono */
const ESCRITA: Record<string, string> = {
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
for (const m of [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18, m19, m20, m21, m22]) {
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
