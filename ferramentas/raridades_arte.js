// Temas próprios das raridades Épico e Lendário, por monstro. Quem não está aqui usa o tema padrão (Épico prateado-violeta com
// runas, Lendário dourado com halo). O tema vale para TODAS as folhas daquela raridade do monstro: a animação de cada forma
// (__anim_N__epico / __lendario) e a imagem fixa das 8 formas (__epico / __lendario), que é a das cartas e do Bestiário e
// também a referência de cor quando a forma ainda não tem animação própria. Assim a carta e a partida mostram o mesmo monstro.
//
// Para acrescentar um tema: uma linha por monstro, com o nome curto (aparece no pacote) e a descrição em inglês para o gerador.
// Depois rode: node ferramentas/gerar_prompts.js
(function () {
  const RARIDADES = {
    curupira: {
      epico: {
        nome: "Inverno",
        en: "WINTER version: frost-covered palette of pale blue, white and silver; the fiery hair turned into icy white-blue flames; leaf clothes frozen and dusted with snow; small icicles and drifting snowflakes. Keep the leaf clothes and a few green leaves under the frost so it still reads as a nature creature"
      },
      lendario: {
        nome: "Ipê amarelo",
        en: "GOLDEN IPÊ version (Brazilian yellow ipê tree in bloom): warm golden-yellow palette, clothes made of yellow ipê flowers, yellow blossoms in the hair, golden petals floating around and a soft golden glow"
      }
    },
    kodama: {
      epico: {
        nome: "Sakura (ipê rosa)",
        en: "SAKURA version (pink ipê and Japanese cherry blossom): soft pink and white palette, bark body covered in pink blossoms, a blossom crown, pink petals drifting around"
      },
      lendario: {
        nome: "Ipê amarelo",
        en: "GOLDEN IPÊ version (Brazilian yellow ipê tree in bloom): warm golden-yellow palette, body covered in yellow ipê flowers, golden petals floating around and a soft golden glow"
      }
    },
    boto: {
      epico: {
        nome: "Boto azul",
        en: "BLUE version: the dolphin skin is deep river blue instead of pink, with lighter blue belly and silver accents; keep the white hat"
      },
      lendario: {
        nome: "Boto branco",
        en: "WHITE version, inspired by the white suit of the enchanted Boto from the legend: pearl-white skin with a soft pearly sheen, subtle gold accents and a soft halo; keep the white hat"
      }
    }
  };
  // vale para todos os temas: a raridade tem de continuar parecendo rara e o elemento reconhecível
  const REGRA =
    "The rarity must still read as special at a glance: the Epic has a soft glow and a few sparkles; the Legendary has a stronger aura, ornaments and floating particles. Keep the signature trait and at least one clear cue of its element visible.";
  const PADRAO = {
    epico: {
      nome: "Padrão (prateado-violeta)",
      en: "crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura"
    },
    lendario: {
      nome: "Padrão (dourado)",
      en: "radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings"
    }
  };
  const tema = (id, rar) => (RARIDADES[id] && RARIDADES[id][rar]) || PADRAO[rar];
  const API = { RARIDADES, PADRAO, REGRA, tema };
  if (typeof module !== "undefined") module.exports = API;
  else window.RARIDADES_ARTE = API;
})();
