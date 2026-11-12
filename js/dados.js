// Elementar · dados do jogo (elementos, classes, linhagens, monstros, universos, lendas…)
// Gerado a partir do protótipo. Edite com cuidado: precisa continuar sendo JSON válido depois de "const D = ".
"use strict";
const D = {
 "elementos": {
  "fogo": {
   "nome": "Fogo",
   "cor": "#e8603c",
   "paleta": "vermelho brasa, laranja, amarelo-ouro",
   "status": "queimadura"
  },
  "agua": {
   "nome": "Água",
   "cor": "#3a8fd8",
   "paleta": "azul profundo, ciano, branco-espuma",
   "status": "encharcado"
  },
  "terra": {
   "nome": "Terra",
   "cor": "#a07a44",
   "paleta": "ocre, marrom, verde-musgo, cinza-pedra",
   "status": "abalado"
  },
  "ar": {
   "nome": "Ar",
   "cor": "#9fd6d0",
   "paleta": "branco, azul-céu claro, verde-água",
   "status": "desequilibrado"
  },
  "raio": {
   "nome": "Raio",
   "cor": "#f2d23a",
   "paleta": "amarelo elétrico, azul-violeta, branco",
   "status": "eletrizado"
  },
  "natureza": {
   "nome": "Natureza",
   "cor": "#5aa83c",
   "paleta": "verde-folha, verde-escuro, rosa-flor",
   "status": "envenenado"
  },
  "luz": {
   "nome": "Luz",
   "cor": "#f5e6a8",
   "paleta": "dourado, branco-perolado, âmbar suave",
   "status": "ofuscado"
  },
  "sombra": {
   "nome": "Sombra",
   "cor": "#7a4fb0",
   "paleta": "roxo profundo, preto-azulado, verde-espectral",
   "status": "amaldiçoado"
  }
 },
 "reacoes": [
  {
   "a": "fogo",
   "b": "agua",
   "nome": "Vapor",
   "tipo": "cegueira",
   "desc": "Nuvem que cega: inimigos erram e ficam lentos."
  },
  {
   "a": "fogo",
   "b": "terra",
   "nome": "Magma",
   "tipo": "dano_area",
   "desc": "Poça de lava com dano contínuo."
  },
  {
   "a": "fogo",
   "b": "ar",
   "nome": "Tornado de Fogo",
   "tipo": "dano_area",
   "desc": "Tornado que arrasta e queima."
  },
  {
   "a": "fogo",
   "b": "raio",
   "nome": "Sobrecarga",
   "tipo": "explosao",
   "desc": "Explosão instantânea em área."
  },
  {
   "a": "fogo",
   "b": "natureza",
   "nome": "Incêndio",
   "tipo": "propaga",
   "desc": "Queimadura que pula para inimigos próximos."
  },
  {
   "a": "fogo",
   "b": "luz",
   "nome": "Supernova",
   "tipo": "explosao",
   "desc": "Explosão radiante, dano dobrado em Sombra e Mortos-vivos."
  },
  {
   "a": "fogo",
   "b": "sombra",
   "nome": "Chama Negra",
   "tipo": "dano_tempo",
   "desc": "Queimadura que impede regeneração de chefes."
  },
  {
   "a": "agua",
   "b": "terra",
   "nome": "Lama",
   "tipo": "lentidao",
   "desc": "Lentidão forte em área."
  },
  {
   "a": "agua",
   "b": "ar",
   "nome": "Nevasca",
   "tipo": "congelar",
   "desc": "Congela inimigos por instantes."
  },
  {
   "a": "agua",
   "b": "raio",
   "nome": "Eletrocutar",
   "tipo": "cadeia",
   "desc": "Corrente salta entre inimigos encharcados."
  },
  {
   "a": "agua",
   "b": "natureza",
   "nome": "Florescer",
   "tipo": "cura",
   "desc": "Cada acerto cura a equipe um pouco."
  },
  {
   "a": "agua",
   "b": "luz",
   "nome": "Arco-íris",
   "tipo": "buff",
   "desc": "Equipe ganha cadência por alguns segundos."
  },
  {
   "a": "agua",
   "b": "sombra",
   "nome": "Abismo",
   "tipo": "puxar",
   "desc": "Puxa inimigos para um ponto."
  },
  {
   "a": "terra",
   "b": "ar",
   "nome": "Tempestade de Areia",
   "tipo": "cegueira",
   "desc": "Cega e causa dano leve em área."
  },
  {
   "a": "terra",
   "b": "raio",
   "nome": "Magnetismo",
   "tipo": "puxar",
   "desc": "Prende inimigos e atrai cristais de XP."
  },
  {
   "a": "terra",
   "b": "natureza",
   "nome": "Raízes",
   "tipo": "enraizar",
   "desc": "Enraíza inimigos no lugar."
  },
  {
   "a": "terra",
   "b": "luz",
   "nome": "Cristalizar",
   "tipo": "explosao",
   "desc": "Inimigo vira cristal e estilhaça ao morrer."
  },
  {
   "a": "terra",
   "b": "sombra",
   "nome": "Sepultar",
   "tipo": "dano_elite",
   "desc": "O chão engole: dano alto em elites."
  },
  {
   "a": "ar",
   "b": "raio",
   "nome": "Tempestade",
   "tipo": "cadeia",
   "desc": "Raios aleatórios caem por perto."
  },
  {
   "a": "ar",
   "b": "natureza",
   "nome": "Esporos",
   "tipo": "dano_tempo",
   "desc": "Nuvem de veneno que se espalha."
  },
  {
   "a": "ar",
   "b": "luz",
   "nome": "Aurora",
   "tipo": "escudo",
   "desc": "Escudo de luz para a equipe."
  },
  {
   "a": "ar",
   "b": "sombra",
   "nome": "Vendaval Sombrio",
   "tipo": "empurrar",
   "desc": "Empurra e amaldiçoa (mais dano recebido)."
  },
  {
   "a": "raio",
   "b": "natureza",
   "nome": "Seiva Elétrica",
   "tipo": "cadeia",
   "desc": "Veneno conduz raios entre inimigos."
  },
  {
   "a": "raio",
   "b": "luz",
   "nome": "Julgamento",
   "tipo": "dano_elite",
   "desc": "Raio do céu sobre o inimigo mais forte."
  },
  {
   "a": "raio",
   "b": "sombra",
   "nome": "Pulso Fantasma",
   "tipo": "silenciar",
   "desc": "Inimigos param de atacar por instantes."
  },
  {
   "a": "natureza",
   "b": "luz",
   "nome": "Fotossíntese",
   "tipo": "cura",
   "desc": "Área que regenera a equipe."
  },
  {
   "a": "natureza",
   "b": "sombra",
   "nome": "Podridão",
   "tipo": "dano_pct",
   "desc": "Dano em % da vida máxima."
  },
  {
   "a": "luz",
   "b": "sombra",
   "nome": "Eclipse",
   "tipo": "verdadeiro",
   "desc": "Dano verdadeiro que ignora defesa."
  }
 ],
 "classes": {
  "guardiao": {
   "nome": "Guardião",
   "papel": "frente",
   "base": {
    "vida": 170,
    "dano": 6,
    "cadencia": 0.9,
    "alcance": 60,
    "area": 70,
    "defesa": 0.25
   },
   "basico": "Golpe de Escudo: cone curto que empurra.",
   "h1": {
    "nome": "Provocar",
    "desc": "Atrai inimigos próximos e reduz o dano recebido.",
    "mods": [
     "Espinhos: reflete parte do dano",
     "Bastião: escudo para toda a equipe"
    ]
   },
   "h2": {
    "nome": "Muralha",
    "desc": "Barreira circular temporária ao redor da equipe.",
    "mods": [
     "Fortaleza: dura o dobro",
     "Contra-ataque: explode ao terminar"
    ]
   },
   "sinergia2": "Escudo compartilhado: +20% de vida efetiva da equipe.",
   "sinergia3": "Muralha: reflete 15% do dano e +35% de vida efetiva, mas a equipe anda 10% mais devagar."
  },
  "guerreiro": {
   "nome": "Guerreiro",
   "papel": "frente",
   "base": {
    "vida": 135,
    "dano": 8,
    "cadencia": 1.1,
    "alcance": 55,
    "area": 80,
    "defesa": 0.1
   },
   "basico": "Corte Giratório: golpe em 360 graus ao redor.",
   "h1": {
    "nome": "Investida",
    "desc": "Avança contra o grupo mais denso.",
    "mods": [
     "Rastro: deixa trilha do seu elemento",
     "Tremor: impacto em área no fim"
    ]
   },
   "h2": {
    "nome": "Fúria",
    "desc": "Por alguns segundos, ataca mais rápido.",
    "mods": [
     "Sede de Sangue: roubo de vida",
     "Imparável: +25% de dano e o Invocador ignora lentidão e atordoamento"
    ]
   },
   "sinergia2": "Roubo de vida: golpes curam 3% do dano causado.",
   "sinergia3": "Fúria coletiva: até +40% de dano quanto menor a vida da equipe."
  },
  "assassino": {
   "nome": "Assassino",
   "papel": "dano_fisico",
   "base": {
    "vida": 85,
    "dano": 13,
    "cadencia": 1.6,
    "alcance": 70,
    "area": 20,
    "defesa": 0.05
   },
   "basico": "Lâminas: golpes rápidos no inimigo mais próximo.",
   "h1": {
    "nome": "Salto Sombrio",
    "desc": "Teleporta até a elite mais próxima e golpeia.",
    "mods": [
     "Eco: o salto se repete",
     "Veneno: deixa dano contínuo"
    ]
   },
   "h2": {
    "nome": "Marca da Morte",
    "desc": "Marca um inimigo; ao morrer, explode.",
    "mods": [
     "Execução: mata marcados com até 20% de vida",
     "Contágio: a marca se espalha"
    ]
   },
   "sinergia2": "Crítico em elites e chefes: +15% de dano.",
   "sinergia3": "Execução: inimigos comuns com menos de 15% de vida morrem na hora."
  },
  "cacador": {
   "nome": "Caçador",
   "papel": "dano_fisico",
   "base": {
    "vida": 95,
    "dano": 10,
    "cadencia": 1.4,
    "alcance": 260,
    "area": 10,
    "defesa": 0.05
   },
   "basico": "Disparo: projétil em linha reta no alvo mais próximo.",
   "h1": {
    "nome": "Leque",
    "desc": "Dispara 5 projéteis em leque.",
    "mods": [
     "Perfurante: atravessa inimigos",
     "Ricochete: salta entre alvos"
    ]
   },
   "h2": {
    "nome": "Armadilha",
    "desc": "Planta armadilhas por onde a equipe passa.",
    "mods": [
     "Rede: enraíza",
     "Mina: explode em área"
    ]
   },
   "sinergia2": "+1 projétil em todos os disparos.",
   "sinergia3": "Saraivada: projéteis perfuram e ricocheteiam."
  },
  "mago": {
   "nome": "Mago",
   "papel": "dano_magico",
   "base": {
    "vida": 85,
    "dano": 15,
    "cadencia": 0.8,
    "alcance": 220,
    "area": 60,
    "defesa": 0.0
   },
   "basico": "Orbe: projétil teleguiado que explode em área.",
   "h1": {
    "nome": "Rajada Elementar",
    "desc": "Golpe em área no maior grupo.",
    "mods": [
     "Chuva: seis impactos espalhados",
     "Colapso: um impacto gigante"
    ]
   },
   "h2": {
    "nome": "Círculo Arcano",
    "desc": "Zona no chão que amplifica dano.",
    "mods": [
     "Amplificar: +dano dentro do círculo",
     "Gravidade: puxa inimigos para o centro"
    ]
   },
   "sinergia2": "Recarga 18% mais rápida.",
   "sinergia3": "Conclave: magias ecoam (repetem), mas a equipe perde 15% de vida máxima."
  },
  "invocador": {
   "nome": "Invocador",
   "papel": "dano_magico",
   "base": {
    "vida": 110,
    "dano": 9,
    "cadencia": 0.7,
    "alcance": 160,
    "area": 30,
    "defesa": 0.05
   },
   "basico": "Cria: invoca 2 servos do seu elemento que perseguem inimigos.",
   "h1": {
    "nome": "Horda",
    "desc": "Invoca uma leva extra de servos.",
    "mods": [
     "Kamikaze: servos explodem",
     "Guardiões: servos protegem a equipe"
    ]
   },
   "h2": {
    "nome": "Portal",
    "desc": "Portal que gera servos por alguns segundos.",
    "mods": [
     "Portal duplo",
     "Fusão: servos se juntam num servo gigante"
    ]
   },
   "sinergia2": "+1 servo por invocação.",
   "sinergia3": "Legião: servos explodem ao morrer e renascem uma vez."
  },
  "mistico": {
   "nome": "Místico",
   "papel": "suporte",
   "base": {
    "vida": 100,
    "dano": 6,
    "cadencia": 1.0,
    "alcance": 200,
    "area": 20,
    "defesa": 0.1,
    "cura": 4.0
   },
   "basico": "Raio Vital: fere um inimigo e cura a equipe.",
   "h1": {
    "nome": "Bênção",
    "desc": "Regeneração em área por alguns segundos.",
    "mods": [
     "Sobrecura: excesso vira escudo",
     "Purificação: remove lentidão e maldições"
    ]
   },
   "h2": {
    "nome": "Renascer",
    "desc": "Uma vez por mapa, evita a derrota da equipe.",
    "mods": [
     "Fênix: explode ao renascer",
     "Vínculo: divide o dano recebido"
    ]
   },
   "sinergia2": "Cura periódica da equipe (+25% de vida efetiva).",
   "sinergia3": "Santuário: excesso de cura vira escudo e a equipe ganha 1 ressurreição por mapa."
  },
  "xama": {
   "nome": "Xamã",
   "papel": "suporte",
   "base": {
    "vida": 105,
    "dano": 7.5,
    "cadencia": 0.8,
    "alcance": 140,
    "area": 50,
    "defesa": 0.1
   },
   "basico": "Totem: planta um totem que ataca sozinho.",
   "h1": {
    "nome": "Canto",
    "desc": "Aura que acelera a equipe.",
    "mods": [
     "Fervor: +dano na aura",
     "Tambor: empurra inimigos periodicamente"
    ]
   },
   "h2": {
    "nome": "Espírito Guia",
    "desc": "Espírito que aplica o elemento do Xamã.",
    "mods": [
     "Elementar: o espírito dispara reações",
     "Ancestral: raios em cadeia entre totens"
    ]
   },
   "sinergia2": "Totens com aura: +12% de dano e +8% de vida efetiva.",
   "sinergia3": "Ritual: totens se ligam e formam uma área do elemento dominante."
  }
 },
 "papeis": {
  "frente": "Linha de frente",
  "dano_fisico": "Dano físico",
  "dano_magico": "Dano mágico",
  "suporte": "Suporte"
 },
 "linhagens": {
  "dragoes": {
   "nome": "Dragões e Serpentes",
   "mecanica": "Sopro em cone e escamas.",
   "sinergia2": "Escamas: -12% de dano recebido.",
   "sinergia3": "Sopro Ancestral: os três sopram juntos e misturam os elementos numa reação em área."
  },
  "mortos_vivos": {
   "nome": "Mortos-vivos",
   "mecanica": "Não morrem fácil.",
   "sinergia2": "Cada um revive uma vez por mapa.",
   "sinergia3": "Exército dos Mortos: inimigos abatidos levantam como servos por alguns segundos."
  },
  "feras": {
   "nome": "Feras",
   "mecanica": "Caça e frenesi.",
   "sinergia2": "Abates dão velocidade de ataque e de movimento.",
   "sinergia3": "Caçada: o inimigo mais forte é marcado e recebe +35% de dano da equipe."
  },
  "gigantes": {
   "nome": "Gigantes",
   "mecanica": "Peso e tremor.",
   "sinergia2": "Cada passo causa tremor em área.",
   "sinergia3": "Colosso: a equipe cresce, ganha vida máxima e empurra inimigos ao andar."
  },
  "pequeninos": {
   "nome": "Pequeninos",
   "mecanica": "Enxame e trapaça.",
   "sinergia2": "Mini-invocações extras e +15% de ouro e XP.",
   "sinergia3": "Pequena Revolta: a cada nível nasce um mini-pequenino permanente que copia ataques."
  },
  "marinhos": {
   "nome": "Marinhos",
   "mecanica": "Maré.",
   "sinergia2": "Ondas periódicas empurram inimigos.",
   "sinergia3": "Abismo: área de água que cura a equipe e deixa inimigos lentos."
  },
  "alados": {
   "nome": "Alados",
   "mecanica": "Voo e mergulho.",
   "sinergia2": "Projéteis mais rápidos e com mais alcance.",
   "sinergia3": "Revoada: a equipe ganha uma investida aérea invulnerável."
  },
  "quimeras": {
   "nome": "Quimeras",
   "mecanica": "Curinga.",
   "sinergia2": "Cada quimera copia o bônus de 2 de linhagem de um aliado.",
   "sinergia3": "Abominação: ataques trocam de elemento sozinhos e disparam reações."
  },
  "errante": {
   "nome": "Errante",
   "mecanica": "Sem linhagem fixa: a linhagem é revelada no estágio Adulto.",
   "sinergia2": "-",
   "sinergia3": "-"
  }
 },
 "estagios": [
  {
   "id": "filhote",
   "nome": "Filhote",
   "nivel": 1,
   "mult": 1.0,
   "tamanho": "minúsculo e fofo, proporções de filhote"
  },
  {
   "id": "jovem",
   "nome": "Jovem",
   "nivel": 5,
   "mult": 1.6,
   "tamanho": "pequeno, traços da forma adulta aparecendo"
  },
  {
   "id": "adulto",
   "nome": "Adulto",
   "nivel": 12,
   "mult": 2.6,
   "tamanho": "tamanho médio, forma completa e imponente"
  },
  {
   "id": "supremo",
   "nome": "Supremo",
   "nivel": 20,
   "mult": 4.2,
   "tamanho": "enorme, lendário, ocupa o dobro do espaço"
  }
 ],
 "raridades": [
  {
   "id": "comum",
   "nome": "Comum",
   "moldura": "pedra",
   "cor_muda": false
  },
  {
   "id": "incomum",
   "nome": "Incomum",
   "moldura": "bronze",
   "cor_muda": false
  },
  {
   "id": "raro",
   "nome": "Raro",
   "moldura": "prata",
   "cor_muda": false
  },
  {
   "id": "epico",
   "nome": "Épico",
   "moldura": "prata com ouro",
   "cor_muda": true,
   "regra_cor": "tom vizinho no círculo cromático"
  },
  {
   "id": "lendario",
   "nome": "Lendário",
   "moldura": "ouro",
   "cor_muda": true,
   "regra_cor": "variação natural rara (albino, melânico) ou toda dourada e brilhante"
  }
 ],
 "condicoes": {
  "afinidade": "Pelo menos 1 aliado do mesmo elemento na equipe.",
  "solitario": "Nenhum aliado do mesmo elemento na equipe.",
  "alianca": "Pelo menos 1 aliado da classe indicada. A forma passa a contar como as duas classes.",
  "regional": "Evoluir dentro da Era indicada ou em qualquer universo dominado pelo novo elemento. A forma troca de elemento."
 },
 "regras": {
  "equipe_max": 3,
  "nivel_habilidade_max": 5,
  "nivel_escolha_modificador": 3,
  "supremo_requer": "ter vencido ao menos 1 Guardião da Era na run",
  "despertar": {
   "bonus_por_estrela": 0.06,
   "estrelas": "infinitas, custo crescente"
  },
  "ramos": {
   "afinidade": {
    "dano": 1.1,
    "vida": 1.0,
    "reacao": 1.25
   },
   "solitario": {
    "dano": 1.08,
    "vida": 1.08,
    "reacao": 1.0
   },
   "alianca": {
    "dano": 1.05,
    "vida": 1.05,
    "reacao": 1.0,
    "classe_dupla": true
   },
   "regional": {
    "dano": 1.12,
    "vida": 1.08,
    "reacao": 1.15
   }
  },
  "sinergia_classe": {
   "guardiao": {
    "2": {
     "dps": 1.0,
     "ehp": 1.2
    },
    "3": {
     "dps": 1.1,
     "ehp": 1.35
    }
   },
   "guerreiro": {
    "2": {
     "dps": 1.04,
     "ehp": 1.12
    },
    "3": {
     "dps": 1.2,
     "ehp": 1.12
    }
   },
   "assassino": {
    "2": {
     "dps": 1.15,
     "ehp": 1.0
    },
    "3": {
     "dps": 1.32,
     "ehp": 1.0
    }
   },
   "cacador": {
    "2": {
     "dps": 1.18,
     "ehp": 1.0
    },
    "3": {
     "dps": 1.4,
     "ehp": 1.0
    }
   },
   "mago": {
    "2": {
     "dps": 1.18,
     "ehp": 1.0
    },
    "3": {
     "dps": 1.6,
     "ehp": 0.85
    }
   },
   "invocador": {
    "2": {
     "dps": 1.15,
     "ehp": 1.05
    },
    "3": {
     "dps": 1.5,
     "ehp": 1.2
    }
   },
   "mistico": {
    "2": {
     "dps": 1.05,
     "ehp": 1.25
    },
    "3": {
     "dps": 1.2,
     "ehp": 1.5
    }
   },
   "xama": {
    "2": {
     "dps": 1.12,
     "ehp": 1.08
    },
    "3": {
     "dps": 1.4,
     "ehp": 1.2
    }
   }
  },
  "sinergia_linhagem": {
   "2": {
    "dps": 1.08,
    "ehp": 1.08
   },
   "3": {
    "dps": 1.2,
    "ehp": 1.2
   }
  },
  "sinergia_elemento": {
   "2": {
    "dps": 1.12,
    "ehp": 1.0
   },
   "3": {
    "dps": 1.32,
    "ehp": 1.05
   }
  },
  "reacao_por_par": 0.08,
  "trindade": {
   "dps": 1.15,
   "ehp": 1.15
  },
  "tempo_mapa_seg": 420,
  "mini_chefe_seg": 210,
  "mapas_por_capitulo": 3,
  "fusao": "Dois Adultos com Elo podem se fundir num Supremo; a fusão libera uma vaga na equipe."
 },
 "eras_ordem": [
  "berco",
  "reinos",
  "novo_mundo",
  "navegacoes",
  "gotica",
  "perdidos",
  "elementais"
 ],
 "vantagem": {
  "fogo": "natureza",
  "natureza": "agua",
  "agua": "fogo",
  "terra": "raio",
  "raio": "ar",
  "ar": "terra",
  "luz": "sombra",
  "sombra": "luz"
 },
 "mult_vantagem": {
  "super_efetivo": 1.5,
  "pouco_efetivo": 0.65
 },
 "pacto": {
  "min": 2,
  "max": 3,
  "bonus": {
   "2": {
    "dano": 1.15,
    "texto": "Pacto Duplo: +15% de dano (menos opções, mais força)"
   },
   "3": {
    "dano": 1.0,
    "texto": "Pacto Triplo: mais variedade de monstros e reações"
   }
  },
  "excecoes": "Ovos de chefe e itens Lendários ignoram o Pacto."
 },
 "selos": {
  "quantidade": 3,
  "regra": "Cada Selo guarda o nível, os níveis de poder (ataque básico, habilidade 1 e 2) e os modificadores escolhidos. O monstro colocado no Selo assume tudo isso na hora e evolui até o estágio que o nível permite.",
  "troca_no_mapa": "Livre, com 15 s de recarga por Selo (a Pena de Troca zera a recarga).",
  "troca_fora": "Livre em portais e Santuários.",
  "forma": "Cada monstro lembra o ramo de Adulto que escolheu. Na primeira vez que chega ao Adulto, escolhe.",
  "selo_novo": "Um Selo vazio que recebe seu primeiro monstro começa em 60% do nível médio dos outros."
 },
 "ovos": {
  "raridades": {
   "comum": {
    "xp": 120,
    "chance": 0.8,
    "bonus": 1.0
   },
   "raro": {
    "xp": 260,
    "chance": 0.18,
    "bonus": 1.08
   },
   "lendario": {
    "xp": 520,
    "chance": 0.02,
    "bonus": 1.22
   }
  },
  "ninho_max": 3,
  "intervalo_ovo_seg": 45,
  "intervalo_filhote_seg": 70,
  "filhote_selvagem": "Filhotes fogem da equipe; encoste neles para capturar. Vão direto para a reserva.",
  "ovo_chefe": "Chefes de mapa deixam um ovo Raro de um monstro do universo (de preferência do Pacto). Guardiões da Era deixam um ovo Lendário que ignora o Pacto."
 },
 "itens": {
  "incenso": {
   "nome": "Incenso de Invocação",
   "efeito": "Invoca na hora um monstro Raro do Pacto.",
   "fonte": "elites e baús"
  },
  "chamado": {
   "nome": "Chifre do Chamado Lendário",
   "efeito": "Invoca um monstro Lendário do Pacto.",
   "fonte": "Guardiões da Era (garantido) e chefes (10%)"
  },
  "doce": {
   "nome": "Mel Ancestral",
   "efeito": "+1 nível em um Selo à escolha.",
   "fonte": "elites e baús"
  },
  "pedra": {
   "nome": "Pedra Ancestral",
   "efeito": "A próxima evolução para Adulto libera os 3 ramos, sem requisito.",
   "fonte": "baús"
  },
  "pena": {
   "nome": "Pena de Troca",
   "efeito": "Zera a recarga de troca dos Selos.",
   "fonte": "elites"
  }
 },
 "despertar": {
  "duracao_seg": 12,
  "estagios_extra": 1,
  "dano": 1.6,
  "cadencia": 1.4,
  "carga": "Abates e combos enchem a barra. Ao ativar: explosão em tela, e cada monstro sobe 1 estágio por 12 s."
 },
 "esquiva": {
  "distancia": 40,
  "invulneravel_seg": 0.3,
  "recarga_seg": 1.4
 },
 "combo": {
  "janela_seg": 2.5,
  "xp_por_10": 0.01,
  "xp_max": 0.5,
  "marcos": [
   25,
   50,
   100,
   200
  ]
 },
 "especiais": {
  "guardiao": [
   [
    "Bastião Ancestral",
    "escudo de 25% da vida e provoca todos por perto"
   ],
   [
    "Terremoto do Guardião",
    "dano ×10 em área e atordoa 2 s"
   ]
  ],
  "guerreiro": [
   [
    "Grito de Guerra",
    "equipe com +60% de dano por 6 s"
   ],
   [
    "Golpe Devastador",
    "dano ×14 num grande arco"
   ]
  ],
  "assassino": [
   [
    "Dança das Lâminas",
    "8 golpes ×4 em alvos espalhados"
   ],
   [
    "Execução Sombria",
    "executa comuns abaixo de 25% e causa ×6 em elites"
   ]
  ],
  "cacador": [
   [
    "Chuva de Flechas",
    "zona de 4 s que fere tudo dentro"
   ],
   [
    "Tiro Perfurante",
    "linha de ×20 que atravessa a tela"
   ]
  ],
  "mago": [
   [
    "Cataclismo",
    "dano ×12 numa área enorme"
   ],
   [
    "Prisão Arcana",
    "congela todos na tela por 2,5 s"
   ]
  ],
  "invocador": [
   [
    "Exército Invocado",
    "10 servos por 6 s"
   ],
   [
    "Colosso Invocado",
    "um servo gigante por 10 s"
   ]
  ],
  "mistico": [
   [
    "Milagre",
    "cura 40% e limpa lentidões"
   ],
   [
    "Julgamento",
    "dano ×8 em todos na tela"
   ]
  ],
  "xama": [
   [
    "Tempestade Ritual",
    "zona grande do elemento por 5 s"
   ],
   [
    "Totem Ancestral",
    "totem de 12 s: +40% de cadência"
   ]
  ]
 },
 "especial_regras": {
  "recarga_base_seg": 34,
  "reducao_por_nivel": 0.01,
  "recarga_min_seg": 20,
  "bonus_supremo": 1.5,
  "texto": "Liberado quando o monstro vira Jovem: escolha 1 de 2 especiais. Ele dispara sozinho a cada ~34 s (-1% por nível do Selo, mínimo 20 s). No Supremo, ganha o nome da forma e +50% de força."
 },
 "combinado_regras": {
  "recarga_seg": 55,
  "carga_inicial_seg": 35,
  "manual": true,
  "prioridade": [
   "Elo ativo",
   "3 da mesma linhagem",
   "3 do mesmo elemento",
   "Trindade",
   "par com reação",
   "qualquer equipe"
  ],
  "forca": {
   "elo": 1.0,
   "linhagem": 1.0,
   "elemento": 1.0,
   "trindade": 0.85,
   "reacao": 0.75,
   "basico": 0.6
  }
 },
 "combinados_linhagem": {
  "dragoes": "Revoada Ancestral",
  "mortos_vivos": "Marcha dos Mortos",
  "feras": "Grande Caçada",
  "gigantes": "Passo dos Titãs",
  "pequeninos": "Revolta dos Pequenos",
  "marinhos": "Maremoto",
  "alados": "Céu em Fúria",
  "quimeras": "Abominação Primordial"
 },
 "combinados_elemento": {
  "fogo": "Inferno",
  "agua": "Dilúvio",
  "terra": "Terremoto Primordial",
  "ar": "Furacão",
  "raio": "Tempestade Elétrica",
  "natureza": "Floresta Primordial",
  "luz": "Juízo Solar",
  "sombra": "Noite Eterna"
 },
 "superficies": {
  "gelo": [
   "Gelo",
   "inimigos e Invocador escorregam (perdem controle de direção)"
  ],
  "agua": [
   "Poça d’água",
   "deixa encharcado (status Água) e um pouco mais lento"
  ],
  "lama": [
   "Lama",
   "deixa bem lento"
  ],
  "fogo": [
   "Fogo",
   "queima quem pisa (status Fogo); espalha para grama vizinha"
  ],
  "grama": [
   "Grama",
   "combustível: pega fogo com Fogo ou Raio"
  ],
  "cinza": [
   "Cinzas",
   "resto de fogo; vira grama de novo com Natureza"
  ],
  "vapor": [
   "Vapor",
   "cega e deixa lento por alguns segundos"
  ],
  "eletrico": [
   "Água eletrificada",
   "dá choque em quem estiver dentro (status Raio)"
  ],
  "vinha": [
   "Vinhas",
   "prende: lentidão forte e status Natureza"
  ],
  "areia": [
   "Areia",
   "chão comum dos desertos; Água vira lama nela"
  ],
  "sombra": [
   "Sombra",
   "monstros de Sombra causam +20% com o Invocador dentro"
  ],
  "luz": [
   "Luz sagrada",
   "cura a equipe devagar; dissipa Sombra"
  ]
 },
 "interacoes": [
  [
   "fogo",
   "gelo",
   "agua",
   "Fogo derrete o gelo"
  ],
  [
   "fogo",
   "agua",
   "vapor",
   "Fogo evapora a água"
  ],
  [
   "fogo",
   "grama",
   "fogo",
   "Fogo incendeia a grama"
  ],
  [
   "fogo",
   "vinha",
   "fogo",
   "Fogo queima as vinhas"
  ],
  [
   "fogo",
   "lama",
   "chao",
   "Fogo seca a lama"
  ],
  [
   "agua",
   "fogo",
   "cinza",
   "Água apaga o fogo"
  ],
  [
   "agua",
   "chao",
   "lama",
   "Água deixa rastro de lama na terra"
  ],
  [
   "agua",
   "areia",
   "lama",
   "Água encharca a areia"
  ],
  [
   "agua",
   "cinza",
   "lama",
   "Água vira as cinzas em lama"
  ],
  [
   "terra",
   "agua",
   "lama",
   "Terra absorve a água"
  ],
  [
   "terra",
   "fogo",
   "cinza",
   "Terra abafa o fogo"
  ],
  [
   "terra",
   "vapor",
   "chao",
   "Terra assenta o vapor"
  ],
  [
   "ar",
   "vapor",
   "chao",
   "Ar dispersa o vapor"
  ],
  [
   "ar",
   "fogo",
   "fogo+",
   "Vento aviva e espalha o fogo"
  ],
  [
   "raio",
   "agua",
   "eletrico",
   "Raio eletrifica a água"
  ],
  [
   "raio",
   "lama",
   "eletrico",
   "Raio eletrifica a lama"
  ],
  [
   "raio",
   "grama",
   "fogo?",
   "Raio pode incendiar a grama"
  ],
  [
   "natureza",
   "chao",
   "grama",
   "Natureza faz brotar grama"
  ],
  [
   "natureza",
   "areia",
   "grama",
   "Natureza enverdece a areia"
  ],
  [
   "natureza",
   "cinza",
   "grama",
   "Natureza renasce das cinzas"
  ],
  [
   "natureza",
   "lama",
   "grama",
   "Natureza drena a lama"
  ],
  [
   "natureza",
   "grama",
   "vinha",
   "Natureza transforma grama em vinhas"
  ],
  [
   "luz",
   "sombra",
   "chao",
   "Luz dissipa a sombra"
  ],
  [
   "luz",
   "chao",
   "luz",
   "Luz consagra o chão"
  ],
  [
   "sombra",
   "chao",
   "sombra",
   "Sombra escurece o chão"
  ],
  [
   "sombra",
   "luz",
   "chao",
   "Sombra apaga a luz"
  ]
 ],
 "terreno_natural": {
  "fogo": [
   "cinza",
   0.15
  ],
  "agua": [
   "agua",
   0.22
  ],
  "terra": [
   "areia",
   0.35
  ],
  "ar": [
   "grama",
   0.2
  ],
  "raio": [
   "agua",
   0.15
  ],
  "natureza": [
   "grama",
   0.4
  ],
  "luz": [
   "grama",
   0.2
  ],
  "sombra": [
   "sombra",
   0.15
  ]
 },
 "terreno_especial": {
  "nordico": [
   "gelo",
   0.35
  ],
  "shangrila": [
   "gelo",
   0.3
  ],
  "reino_agua": [
   "agua",
   0.4
  ],
  "egito": [
   "areia",
   0.45
  ],
  "mil_noites": [
   "areia",
   0.45
  ],
  "amazonia": [
   "grama",
   0.45
  ],
  "polinesia": [
   "cinza",
   0.2
  ]
 },
 "linhas": [
  {
   "id": "fogo_fatuo",
   "linhagem": "errante",
   "universo": "amazonia",
   "elemento": "fogo",
   "classe": "mago",
   "visual": "chama viva e flutuante, olhos curiosos que brilham e um rastro de faíscas de vaga-lume",
   "filhote": "Fogo-fátuo",
   "jovem": "Chama Errante",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Boitatá",
     "supremo": "Boitatá Ancião",
     "ultimate": "Fecha um anel de fogo serpenteante ao redor da tela.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Fornalha Viva",
     "supremo": "Colosso Ígneo",
     "ultimate": "Erupção: crateras de magma por toda a área.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Chama Azul",
     "supremo": "Fogo das Almas",
     "ultimate": "Inimigos queimados viram fogos-fátuos aliados.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "regional",
      "era": "reinos",
      "elemento": "sombra"
     }
    }
   ],
   "animal": "vaga-lume / chaminha",
   "personalidade": "tímido e curioso, segue viajantes de longe",
   "traco": "a chama em forma de gota no topo da cabeça",
   "forma": "criatura"
  },
  {
   "id": "dragao_gales",
   "linhagem": "dragoes",
   "universo": "tavola",
   "elemento": "fogo",
   "classe": "guardiao",
   "visual": "dragão vermelho de focinho arredondado e corpo robusto, com asas que crescem a cada evolução",
   "filhote": "Ovo de Brasa",
   "jovem": "Dragonete Rubro",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Dragão de Gales",
     "supremo": "Pendragão",
     "ultimate": "Estandarte Flamejante: muralha de fogo em anel.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Wyrm Ermitão",
     "supremo": "Wyrm da Montanha Oca",
     "ultimate": "Dorme sobre o tesouro: escudo de ouro gigante e chuva de moedas.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Dragão de Batalha",
     "supremo": "Dragão Rei",
     "ultimate": "Rasante de fogo atravessando a tela.",
     "linhagem": "dragoes",
     "classe_extra": "guerreiro",
     "elemento": "fogo",
     "condicao": {
      "tipo": "alianca",
      "classe": "guerreiro"
     }
    }
   ],
   "animal": "lagarto",
   "personalidade": "protetor e orgulhoso, sempre fica na frente dos amigos",
   "traco": "escamas do peito em forma de escudo heráldico",
   "forma": "criatura"
  },
  {
   "id": "long",
   "linhagem": "dragoes",
   "universo": "china",
   "elemento": "agua",
   "classe": "mistico",
   "visual": "carpa dourada de olhos grandes que vira um dragão serpentino de bigodes longos e sorriso sereno",
   "filhote": "Carpa Dourada",
   "jovem": "Carpa do Portão",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Long das Chuvas",
     "supremo": "Rei-Dragão dos Quatro Mares",
     "ultimate": "Monção: cura a equipe e afoga inimigos.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Long Ermitão das Nuvens",
     "supremo": "Dragão Celestial",
     "ultimate": "Pérola celestial orbita e reflete projéteis.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Long dos Tufões",
     "supremo": "Senhor dos Tufões",
     "ultimate": "Tufão que arrasta todos os inimigos.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "regional",
      "era": "navegacoes",
      "elemento": "ar"
     }
    }
   ],
   "animal": "carpa",
   "personalidade": "calmo e sábio, adora chuva",
   "traco": "a pérola que carrega sempre",
   "forma": "criatura"
  },
  {
   "id": "ryu",
   "linhagem": "dragoes",
   "universo": "japao",
   "elemento": "raio",
   "classe": "mago",
   "visual": "enguia azul de olhos vivos que vira um dragão esguio com crina de nuvem de tempestade",
   "filhote": "Enguia do Trovão",
   "jovem": "Ryu Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Ryu da Tempestade",
     "supremo": "Dragão do Trovão Eterno",
     "ultimate": "Tempestade de raios em toda a tela.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Ryu do Lago Silencioso",
     "supremo": "Guardião do Lago Espelhado",
     "ultimate": "Lago de estática que paralisa.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Ryu Relâmpago",
     "supremo": "Dragão Relâmpago",
     "ultimate": "Atravessa a tela em zigue-zague.",
     "linhagem": "dragoes",
     "classe_extra": "assassino",
     "elemento": "raio",
     "condicao": {
      "tipo": "alianca",
      "classe": "assassino"
     }
    }
   ],
   "animal": "enguia",
   "personalidade": "agitado e brincalhão, ri a cada trovão",
   "traco": "chifres em forma de raio",
   "forma": "criatura"
  },
  {
   "id": "serpente_emplumada",
   "linhagem": "dragoes",
   "universo": "tenochtitlan",
   "elemento": "luz",
   "classe": "mago",
   "visual": "serpente do sol e da estrela da manhã, de penas que brilham como a aurora e coroa de penas em forma de disco solar",
   "filhote": "Serpentinha de Penas",
   "jovem": "Serpente Quetzal",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Serpente do Sol",
     "supremo": "Serpente Emplumada Solar",
     "ultimate": "Raio solar varre a tela de ponta a ponta.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Serpente da Estrela d’Alva",
     "supremo": "Estrela da Manhã",
     "ultimate": "Estrela cadente sobre cada elite.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Serpente dos Ventos",
     "supremo": "Serpente dos Quatro Ventos",
     "ultimate": "Quatro tornados cruzam a tela.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "ar"
     }
    }
   ],
   "animal": "cobra",
   "personalidade": "vaidosa e solar, ama se exibir ao sol",
   "traco": "o leque de penas na cabeça",
   "forma": "criatura"
  },
  {
   "id": "amaru",
   "linhagem": "dragoes",
   "universo": "andes",
   "elemento": "terra",
   "classe": "xama",
   "visual": "serpente de pedra com duas cabeças, escamas de pedra e tufos de penas",
   "filhote": "Filhote de Amaru",
   "jovem": "Amaru das Encostas",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Amaru das Montanhas",
     "supremo": "Amaru Bicéfalo",
     "ultimate": "Uma cabeça provoca terremoto, a outra deslizamento.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Serpente dos Terraços",
     "supremo": "Guardiã dos Terraços",
     "ultimate": "Terraços de pedra brotam e viram muralhas.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Amaru Fértil",
     "supremo": "Amaru da Colheita",
     "ultimate": "Campo fértil que cura e enraíza.",
     "linhagem": "dragoes",
     "classe_extra": "mistico",
     "elemento": "terra",
     "condicao": {
      "tipo": "alianca",
      "classe": "mistico"
     }
    }
   ],
   "animal": "cobra",
   "personalidade": "as duas cabeças discordam o tempo todo, mas se protegem",
   "traco": "duas cabeças com expressões diferentes",
   "forma": "criatura"
  },
  {
   "id": "mumia",
   "linhagem": "mortos_vivos",
   "universo": "egito",
   "elemento": "terra",
   "classe": "guardiao",
   "visual": "múmia de bandagens soltas, olhos que brilham entre as faixas, jeito desastrado e simpático",
   "filhote": "Bandagem Viva",
   "jovem": "Múmia Aprendiz",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Múmia Real",
     "supremo": "Faraó Eterno",
     "ultimate": "Tempestade de areia com sarcófagos voadores.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Múmia Tagarela",
     "supremo": "Múmia Lendária do Deserto",
     "ultimate": "Desenrola bandagens que prendem a tela toda.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Múmia Sacerdotal",
     "supremo": "Sumo Sacerdote Imortal",
     "ultimate": "Enxame de escaravelhos amaldiçoados.",
     "linhagem": "mortos_vivos",
     "classe_extra": "mago",
     "elemento": "terra",
     "condicao": {
      "tipo": "alianca",
      "classe": "mago"
     }
    }
   ],
   "animal": "humanoide: múmia",
   "personalidade": "desastrada e carente, quer abraçar todo mundo",
   "traco": "uma bandagem solta que balança como rabinho",
   "forma": "humanoide"
  },
  {
   "id": "draugr",
   "linhagem": "mortos_vivos",
   "universo": "nordico",
   "elemento": "agua",
   "classe": "invocador",
   "visual": "guerreiro viking fantasma de pele azul-gelo, elmo com chifres pequenos, barba de estalactites e corpo robusto",
   "filhote": "Afogado Errante",
   "jovem": "Draugr",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Draugr das Marés",
     "supremo": "Rei do Fundo do Fiorde",
     "ultimate": "Navio fantasma emerge e dispara.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Draugr do Túmulo",
     "supremo": "Senhor do Túmulo",
     "ultimate": "Levanta um exército de draugrs.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Draugr Sombrio",
     "supremo": "Rei-Draugr da Noite",
     "ultimate": "Noite eterna: inimigos perdem a visão.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "regional",
      "era": "gotica",
      "elemento": "sombra"
     }
    }
   ],
   "animal": "humanoide: guerreiro viking fantasma",
   "personalidade": "melancólico, sente saudade do mar",
   "traco": "o elmo com chifres de gelo",
   "forma": "humanoide"
  },
  {
   "id": "jiangshi",
   "linhagem": "mortos_vivos",
   "universo": "china",
   "elemento": "raio",
   "classe": "assassino",
   "visual": "fantasma saltitante de roupa de oficial antigo e chapéu redondo, braços esticados para a frente",
   "filhote": "Talismã Perdido",
   "jovem": "Jiangshi Saltitante",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Jiangshi do Trovão",
     "supremo": "Jiangshi Imperador",
     "ultimate": "Saltos em cadeia com descarga elétrica.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Jiangshi Solitário",
     "supremo": "Jiangshi Milenar",
     "ultimate": "Drena a energia de todos na tela.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Jiangshi Selado",
     "supremo": "Mestre dos Talismãs",
     "ultimate": "Chuva de talismãs paralisantes.",
     "linhagem": "mortos_vivos",
     "classe_extra": "xama",
     "elemento": "raio",
     "condicao": {
      "tipo": "alianca",
      "classe": "xama"
     }
    }
   ],
   "animal": "humanoide: fantasma saltitante",
   "personalidade": "obediente e engraçado",
   "traco": "o talismã de papel na testa que balança a cada pulo",
   "forma": "humanoide"
  },
  {
   "id": "vampiro",
   "linhagem": "mortos_vivos",
   "universo": "transilvania",
   "elemento": "sombra",
   "classe": "mago",
   "visual": "vampiro elegante de capa com gola alta, presas pontudas e olhar charmoso",
   "filhote": "Vampiro Infante",
   "jovem": "Vampiro Neófito",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Conde Vampiro",
     "supremo": "Senhor da Noite",
     "ultimate": "Lua de sangue: roubo de vida para a equipe.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Vampiro Recluso",
     "supremo": "Antigo do Castelo",
     "ultimate": "Castelo surge; inimigos dentro dele sangram.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Vampiro Mestre",
     "supremo": "Lorde dos Morcegos",
     "ultimate": "Nuvem de morcegos cobre a tela.",
     "linhagem": "mortos_vivos",
     "classe_extra": "invocador",
     "elemento": "sombra",
     "condicao": {
      "tipo": "alianca",
      "classe": "invocador"
     }
    }
   ],
   "animal": "humanoide: vampiro",
   "personalidade": "elegante e dramático, faz pose o tempo todo",
   "traco": "a capa que abre como asas de morcego",
   "forma": "humanoide"
  },
  {
   "id": "banshee",
   "linhagem": "mortos_vivos",
   "universo": "celta",
   "elemento": "ar",
   "classe": "xama",
   "visual": "espírito de moça translúcida de cabelos longuíssimos que flutuam, olhos grandes e tristes, vestido de névoa",
   "filhote": "Lamento",
   "jovem": "Banshee Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Banshee Uivante",
     "supremo": "Rainha dos Lamentos",
     "ultimate": "Grito que atravessa a tela.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Banshee das Charnecas",
     "supremo": "Banshee Ancestral",
     "ultimate": "Névoa que silencia todos os inimigos.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Banshee Guardiã",
     "supremo": "Pranteadora Sagrada",
     "ultimate": "Lamento que revive um aliado.",
     "linhagem": "mortos_vivos",
     "classe_extra": "mistico",
     "elemento": "ar",
     "condicao": {
      "tipo": "alianca",
      "classe": "mistico"
     }
    }
   ],
   "animal": "humanoide: espírito",
   "personalidade": "sensível, canta para avisar perigo",
   "traco": "o cabelo de névoa",
   "forma": "humanoide"
  },
  {
   "id": "pirata_fantasma",
   "linhagem": "mortos_vivos",
   "universo": "caribe",
   "elemento": "sombra",
   "classe": "cacador",
   "visual": "pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo",
   "filhote": "Grumete Fantasma",
   "jovem": "Corsário Fantasma",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Capitão Fantasma",
     "supremo": "Capitão do Navio Errante",
     "ultimate": "Bordada de canhões fantasmas.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Pistoleiro do Cais",
     "supremo": "Pistoleiro das Marés Negras",
     "ultimate": "Tiro único que atravessa tudo.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Pirata Afogado",
     "supremo": "Almirante do Abismo",
     "ultimate": "Maré fantasma varre a tela.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "regional",
      "era": "navegacoes",
      "elemento": "agua"
     }
    }
   ],
   "animal": "humanoide: pirata fantasma",
   "personalidade": "fanfarrão e aventureiro",
   "traco": "o chapéu de três pontas",
   "forma": "humanoide"
  },
  {
   "id": "cacada_selvagem",
   "linhagem": "mortos_vivos",
   "universo": "floresta_negra",
   "elemento": "sombra",
   "classe": "invocador",
   "visual": "cão espectral nos primeiros estágios que evolui para um cavaleiro espectral de chifres de cervo montado num cão gigante",
   "filhote": "Cão Espectral",
   "jovem": "Cavaleiro da Caçada",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Mestre da Caçada",
     "supremo": "Caçada Selvagem",
     "ultimate": "Cavalgada espectral atravessa a tela.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Cavaleiro Solitário",
     "supremo": "Cavaleiro do Vendaval",
     "ultimate": "Lança que perfura uma linha inteira.",
     "linhagem": "mortos_vivos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Arqueiro da Caçada",
     "supremo": "Rei-Caçador",
     "ultimate": "Chuva de flechas espectrais.",
     "linhagem": "mortos_vivos",
     "classe_extra": "cacador",
     "elemento": "sombra",
     "condicao": {
      "tipo": "alianca",
      "classe": "cacador"
     }
    }
   ],
   "animal": "humanoide: cavaleiro espectral",
   "personalidade": "leal e incansável, adora uma perseguição",
   "traco": "os chifres de cervo",
   "forma": "humanoide"
  },
  {
   "id": "lobisomem",
   "linhagem": "feras",
   "universo": "floresta_negra",
   "elemento": "natureza",
   "classe": "assassino",
   "visual": "lobo de pelo verde-musgo que, nas formas maiores, fica de pé como um lobo imponente",
   "filhote": "Filhote Uivante",
   "jovem": "Lobo da Lua",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Lobisomem Alfa",
     "supremo": "Lobisomem Ancestral",
     "ultimate": "Uivo que chama uma matilha espectral.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Fera da Lua Cheia",
     "supremo": "Fera Eterna",
     "ultimate": "Frenesi: ataque giratório contínuo.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Lobisomem Sombrio",
     "supremo": "Fera do Eclipse",
     "ultimate": "Eclipse: inimigos ficam cegos.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "regional",
      "era": "gotica",
      "elemento": "sombra"
     }
    }
   ],
   "animal": "lobo",
   "personalidade": "brincalhão de dia, intenso na lua cheia",
   "traco": "a marca de lua crescente na testa",
   "forma": "criatura"
  },
  {
   "id": "kitsune",
   "linhagem": "feras",
   "universo": "japao",
   "elemento": "fogo",
   "classe": "xama",
   "visual": "raposa branca de olhos sorridentes cujas caudas se multiplicam a cada evolução",
   "filhote": "Raposinha de Uma Cauda",
   "jovem": "Kitsune de Três Caudas",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Kitsune de Seis Caudas",
     "supremo": "Kitsune de Nove Caudas",
     "ultimate": "Nove fogos-de-raposa giram e explodem.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Kitsune Ilusionista",
     "supremo": "Kitsune Celestial",
     "ultimate": "Ilusões: cópias da equipe atraem inimigos.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Kitsune Solar",
     "supremo": "Kitsune do Sol Nascente",
     "ultimate": "Raios dourados saem de cada cauda.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "luz"
     }
    }
   ],
   "animal": "raposa",
   "personalidade": "travessa e esperta",
   "traco": "as pontas das caudas em chama azulada",
   "forma": "criatura"
  },
  {
   "id": "qilin",
   "linhagem": "feras",
   "universo": "china",
   "elemento": "luz",
   "classe": "guardiao",
   "visual": "criatura de jade com corpo de cervo, chifre, escamas douradas e cascos que deixam flores",
   "filhote": "Potro de Jade",
   "jovem": "Qilin Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Qilin Radiante",
     "supremo": "Qilin Imperial",
     "ultimate": "Auréola: equipe invulnerável por instantes.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Qilin Andarilho",
     "supremo": "Qilin das Nuvens",
     "ultimate": "Pisadas de luz que curam.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Qilin Sábio",
     "supremo": "Qilin da Benevolência",
     "ultimate": "Chuva de flores curativas.",
     "linhagem": "feras",
     "classe_extra": "mistico",
     "elemento": "luz",
     "condicao": {
      "tipo": "alianca",
      "classe": "mistico"
     }
    }
   ],
   "animal": "cervo / potro",
   "personalidade": "gentil e justo",
   "traco": "flores que brotam nas pegadas",
   "forma": "criatura"
  },
  {
   "id": "ammit",
   "linhagem": "feras",
   "universo": "egito",
   "elemento": "terra",
   "classe": "assassino",
   "visual": "crocodilo com juba de leão e bochechas de hipopótamo",
   "filhote": "Filhote de Crocodilo",
   "jovem": "Devorador Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Ammit",
     "supremo": "Devoradora de Corações",
     "ultimate": "Devora elites instantaneamente.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Fera do Nilo",
     "supremo": "Ammit Ancestral",
     "ultimate": "Emboscada: surge do chão em sequência.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Ammit das Cheias",
     "supremo": "Devoradora das Cheias",
     "ultimate": "A cheia do Nilo inunda a tela.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "agua"
     }
    }
   ],
   "animal": "crocodilo",
   "personalidade": "comilão e honesto",
   "traco": "a juba de leão",
   "forma": "criatura"
  },
  {
   "id": "cerbero",
   "linhagem": "feras",
   "universo": "grecia",
   "elemento": "sombra",
   "classe": "guardiao",
   "visual": "cão de três cabeças, cada uma com um humor (alegre, brava e sonolenta), com coleira de sino",
   "filhote": "Cérbero Filhote",
   "jovem": "Cão do Portão",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Cérbero",
     "supremo": "Guardião do Submundo",
     "ultimate": "Três sopros: fogo, sombra e veneno.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Cérbero Leal",
     "supremo": "Cão Infernal Supremo",
     "ultimate": "Uivo que provoca todos os inimigos.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Cérbero de Guerra",
     "supremo": "Cérbero Desacorrentado",
     "ultimate": "Corrente quebrada: investida tripla.",
     "linhagem": "feras",
     "classe_extra": "guerreiro",
     "elemento": "sombra",
     "condicao": {
      "tipo": "alianca",
      "classe": "guerreiro"
     }
    }
   ],
   "animal": "cachorro",
   "personalidade": "três cabeças, três humores",
   "traco": "as três expressões diferentes",
   "forma": "criatura"
  },
  {
   "id": "raiju",
   "linhagem": "feras",
   "universo": "japao",
   "elemento": "raio",
   "classe": "invocador",
   "visual": "furão-lobo azul de pelo arrepiado de estática",
   "filhote": "Bolinha de Trovão",
   "jovem": "Raiju",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Raiju da Tempestade",
     "supremo": "Besta do Trovão",
     "ultimate": "Cai do céu como um raio gigante.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Raiju Travesso",
     "supremo": "Raiju Ancestral",
     "ultimate": "Enrosca-se nos inimigos e explode.",
     "linhagem": "feras",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Raiju Caçador",
     "supremo": "Lobo do Raio",
     "ultimate": "Corrente de raios em linha.",
     "linhagem": "feras",
     "classe_extra": "cacador",
     "elemento": "raio",
     "condicao": {
      "tipo": "alianca",
      "classe": "cacador"
     }
    }
   ],
   "animal": "furão",
   "personalidade": "hiperativo, não para quieto",
   "traco": "a cauda em forma de raio",
   "forma": "criatura"
  },
  {
   "id": "ciclope",
   "linhagem": "gigantes",
   "universo": "grecia",
   "elemento": "raio",
   "classe": "guerreiro",
   "visual": "gigante gentil de um olho só, grande e expressivo, avental de ferreiro e martelo",
   "filhote": "Ciclopinho",
   "jovem": "Ciclope Ferreiro",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Ciclope do Trovão",
     "supremo": "Forjador de Raios",
     "ultimate": "Martelada que convoca um raio colossal.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Ciclope Pastor",
     "supremo": "Ciclope da Caverna",
     "ultimate": "Arremessa rochas gigantes.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Ciclope Escudeiro",
     "supremo": "Ciclope Bastião",
     "ultimate": "Escudo de bronze gigante.",
     "linhagem": "gigantes",
     "classe_extra": "guardiao",
     "elemento": "raio",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "humanoide: gigante de um olho",
   "personalidade": "trabalhador e tímido",
   "traco": "o olho único",
   "forma": "humanoide"
  },
  {
   "id": "jotunn",
   "linhagem": "gigantes",
   "universo": "nordico",
   "elemento": "agua",
   "classe": "guardiao",
   "visual": "gigante bonachão de pele azul-gelo e barba de estalactites, que começa como um pequeno bloco de gelo com olhos",
   "filhote": "Pedrisco de Gelo",
   "jovem": "Jovem Jötunn",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Jötunn de Gelo",
     "supremo": "Rei do Inverno Eterno",
     "ultimate": "Inverno sem fim congela a tela.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Jötunn das Montanhas",
     "supremo": "Gigante da Montanha Gelada",
     "ultimate": "Avalanche.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Jötunn de Fogo",
     "supremo": "Gigante de Muspell",
     "ultimate": "Espada flamejante varre a tela.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "fogo"
     }
    }
   ],
   "animal": "humanoide: gigante de gelo",
   "personalidade": "lento e bondoso, adora neve",
   "traco": "a barba de estalactites",
   "forma": "humanoide"
  },
  {
   "id": "fomoriano",
   "linhagem": "gigantes",
   "universo": "celta",
   "elemento": "sombra",
   "classe": "guerreiro",
   "visual": "gigante marinho de traços de peixe e chifres de bode feitos de concha, carrancudo e fofo",
   "filhote": "Cria do Mar Sombrio",
   "jovem": "Fomoriano",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Fomoriano das Profundezas",
     "supremo": "Senhor Fomoriano",
     "ultimate": "Maré sombria.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Fomoriano Caolho",
     "supremo": "Olho Maligno",
     "ultimate": "Olhar que destrói tudo em linha.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Fomoriano Saqueador",
     "supremo": "Rei Saqueador",
     "ultimate": "Pilhagem: rouba vida de todos.",
     "linhagem": "gigantes",
     "classe_extra": "assassino",
     "elemento": "sombra",
     "condicao": {
      "tipo": "alianca",
      "classe": "assassino"
     }
    }
   ],
   "animal": "humanoide: gigante marinho",
   "personalidade": "rabugento, mas leal no fundo",
   "traco": "os chifres de concha",
   "forma": "humanoide"
  },
  {
   "id": "ifrit",
   "linhagem": "gigantes",
   "universo": "mil_noites",
   "elemento": "fogo",
   "classe": "guerreiro",
   "visual": "gênio de fogo de braços fortes, sorriso largo e pulseiras douradas, com a metade de baixo em fumaça",
   "filhote": "Brasa da Lâmpada",
   "jovem": "Ifrit Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Ifrit",
     "supremo": "Grão-Ifrit",
     "ultimate": "Tempestade de areia em chamas.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Ifrit Prisioneiro",
     "supremo": "Ifrit Liberto",
     "ultimate": "Três desejos: três ataques aleatórios fortíssimos.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Ifrit Feiticeiro",
     "supremo": "Sultão das Chamas",
     "ultimate": "Círculo de fogo arcano.",
     "linhagem": "gigantes",
     "classe_extra": "mago",
     "elemento": "fogo",
     "condicao": {
      "tipo": "alianca",
      "classe": "mago"
     }
    }
   ],
   "animal": "humanoide: gênio de fogo",
   "personalidade": "exibido e generoso",
   "traco": "a metade de baixo em fumaça",
   "forma": "humanoide"
  },
  {
   "id": "frankenstein",
   "linhagem": "gigantes",
   "universo": "laboratorio",
   "elemento": "raio",
   "classe": "guardiao",
   "visual": "gigante costurado de retalhos coloridos e botões, com parafusos pequenos e estilizados, rosto gentil",
   "filhote": "Faísca de Vida",
   "jovem": "Criatura Remendada",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Criatura Galvânica",
     "supremo": "Colosso Galvânico",
     "ultimate": "Descarga de para-raios por toda a área.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Criatura Solitária",
     "supremo": "A Criatura Eterna",
     "ultimate": "Fúria do abandono: dano cresce sem parar.",
     "linhagem": "gigantes",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Criatura Gentil",
     "supremo": "Coração Elétrico",
     "ultimate": "Desfibrilador: revive e cura.",
     "linhagem": "gigantes",
     "classe_extra": "mistico",
     "elemento": "raio",
     "condicao": {
      "tipo": "alianca",
      "classe": "mistico"
     }
    }
   ],
   "animal": "humanoide: gigante costurado",
   "personalidade": "gentil e desajeitado, tem medo de ficar sozinho",
   "traco": "o coração elétrico que brilha no peito",
   "forma": "humanoide"
  },
  {
   "id": "gnomo",
   "linhagem": "pequeninos",
   "universo": "floresta_negra",
   "elemento": "terra",
   "classe": "invocador",
   "visual": "gnomo de barba branca e nariz redondo, pequeno mas com proporções de adulto, com picareta",
   "filhote": "Gnominho",
   "jovem": "Gnomo Escavador",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Gnomo Mineiro",
     "supremo": "Rei dos Gnomos",
     "ultimate": "Exército de gnomos com picaretas.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Gnomo Eremita",
     "supremo": "Gnomo Ancião",
     "ultimate": "Jardim de cogumelos explosivos.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Gnomo Engenheiro",
     "supremo": "Golem dos Gnomos",
     "ultimate": "Os gnomos montam um golem gigante.",
     "linhagem": "pequeninos",
     "classe_extra": "guardiao",
     "elemento": "terra",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "humanoide: gnomo",
   "personalidade": "trabalhador e animado",
   "traco": "o gorro pontudo vermelho",
   "forma": "humanoide"
  },
  {
   "id": "saci",
   "linhagem": "pequeninos",
   "universo": "amazonia",
   "elemento": "ar",
   "classe": "assassino",
   "visual": "menino-diabrete de uma perna só, pele escura, sorriso travesso, que se move girando num redemoinho",
   "filhote": "Redemoinho",
   "jovem": "Saci Moleque",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Saci Ventania",
     "supremo": "Saci do Furacão",
     "ultimate": "Furacão que rouba cristais de XP dos inimigos.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Saci Trapaceiro",
     "supremo": "Saci Lendário",
     "ultimate": "Some no redemoinho e reaparece golpeando 10 vezes.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Saci da Fumaça",
     "supremo": "Saci Senhor da Névoa",
     "ultimate": "Fumaça que cega a tela.",
     "linhagem": "pequeninos",
     "classe_extra": "xama",
     "elemento": "ar",
     "condicao": {
      "tipo": "alianca",
      "classe": "xama"
     }
    }
   ],
   "animal": "humanoide: saci",
   "personalidade": "travesso e piadista",
   "traco": "o gorro vermelho mágico",
   "forma": "humanoide"
  },
  {
   "id": "curupira",
   "linhagem": "pequeninos",
   "universo": "amazonia",
   "elemento": "natureza",
   "classe": "xama",
   "visual": "menino da mata de cabelos de fogo e pés virados para trás, roupa de folhas",
   "filhote": "Broto Ruivo",
   "jovem": "Curupira Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Curupira Guardião",
     "supremo": "Protetor da Mata",
     "ultimate": "A floresta inteira ataca.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Curupira Andarilho",
     "supremo": "Curupira Ancestral",
     "ultimate": "Pegadas ao contrário: inimigos andam para trás.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Curupira Caçador",
     "supremo": "Senhor da Caça",
     "ultimate": "Armadilhas por toda a mata.",
     "linhagem": "pequeninos",
     "classe_extra": "cacador",
     "elemento": "natureza",
     "condicao": {
      "tipo": "alianca",
      "classe": "cacador"
     }
    }
   ],
   "animal": "humanoide: curupira",
   "personalidade": "protetor da floresta, confunde quem a ameaça",
   "traco": "os pés virados para trás",
   "forma": "humanoide"
  },
  {
   "id": "domovoi",
   "linhagem": "pequeninos",
   "universo": "eslavo",
   "elemento": "fogo",
   "classe": "mistico",
   "visual": "espírito do lar pequeno e peludo, de barba enorme e olhos brilhantes, com proporções de adulto",
   "filhote": "Fagulha do Fogão",
   "jovem": "Domovoi",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Domovoi do Lar",
     "supremo": "Avô do Lar",
     "ultimate": "Lar aconchegante: cura total da equipe.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Domovoi Rabugento",
     "supremo": "Domovoi Ancião",
     "ultimate": "Arremessa panelas em chamas.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Domovoi Protetor",
     "supremo": "Espírito da Casa",
     "ultimate": "Uma casa de madeira protege a equipe.",
     "linhagem": "pequeninos",
     "classe_extra": "guardiao",
     "elemento": "fogo",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "humanoide: espírito do lar",
   "personalidade": "rabugento, mas cuida da casa",
   "traco": "a barba enorme",
   "forma": "humanoide"
  },
  {
   "id": "fada",
   "linhagem": "pequeninos",
   "universo": "celta",
   "elemento": "luz",
   "classe": "cacador",
   "visual": "fada de luz do folclore celta, nascida de uma faísca, com asas translúcidas que deixam rastro de brilho",
   "filhote": "Lampejo",
   "jovem": "Fada Vaga-lume",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Fada do Sol",
     "supremo": "Rainha do Verão",
     "ultimate": "Chuva de pólen solar que cega e queima os inimigos.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Fada Errante",
     "supremo": "Anel de Fadas",
     "ultimate": "Anel de luz no chão: quem entra fica preso dançando.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Fada Espinho de Luz",
     "supremo": "Lâmina da Aurora",
     "ultimate": "Flechas de luz invisíveis que atravessam a fila.",
     "linhagem": "pequeninos",
     "classe_extra": "assassino",
     "elemento": "luz",
     "condicao": {
      "tipo": "alianca",
      "classe": "assassino"
     }
    }
   ],
   "animal": "humanoide: fada",
   "personalidade": "curiosa e brincalhona, adora tudo que brilha",
   "traco": "as asas de luz que deixam rastro de brilho",
   "forma": "humanoide"
  },
  {
   "id": "kappa",
   "linhagem": "pequeninos",
   "universo": "japao",
   "elemento": "agua",
   "classe": "guerreiro",
   "visual": "tartaruga-sapo em postura de lutador de sumô",
   "filhote": "Ovo de Kappa",
   "jovem": "Kappa Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Kappa Lutador",
     "supremo": "Grande Campeão Kappa",
     "ultimate": "Golpe de sumô que empurra todos.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Kappa Travesso",
     "supremo": "Kappa Ancião do Rio",
     "ultimate": "O rio transborda pela tela.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Kappa Casco-Duro",
     "supremo": "Kappa Fortaleza",
     "ultimate": "Casco gigante gira pela tela.",
     "linhagem": "pequeninos",
     "classe_extra": "guardiao",
     "elemento": "agua",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "tartaruga-sapo",
   "personalidade": "competitivo e educado, sempre se curva antes de lutar",
   "traco": "o prato d’água na cabeça",
   "forma": "criatura"
  },
  {
   "id": "mandragora",
   "linhagem": "pequeninos",
   "universo": "floresta_negra",
   "elemento": "natureza",
   "classe": "invocador",
   "visual": "raiz viva de cara de birra com topete de folhas",
   "filhote": "Muda",
   "jovem": "Mandrágora",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Mandrágora Gritadora",
     "supremo": "Mãe-Mandrágora",
     "ultimate": "Grito que atordoa a tela inteira.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Raiz Solitária",
     "supremo": "Mandrágora Ancestral",
     "ultimate": "Raízes tomam todo o chão.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Mandrágora Venenosa",
     "supremo": "Raiz da Bruxa",
     "ultimate": "Nuvem de veneno.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "regional",
      "era": "gotica",
      "elemento": "sombra"
     }
    }
   ],
   "animal": "raiz",
   "personalidade": "dramática, grita quando contrariada",
   "traco": "o topete de folhas",
   "forma": "criatura"
  },
  {
   "id": "kodama",
   "linhagem": "pequeninos",
   "universo": "japao",
   "elemento": "natureza",
   "classe": "mistico",
   "visual": "espírito de casca de árvore e corpo de musgo, visual próprio",
   "filhote": "Semente Sussurrante",
   "jovem": "Kodama",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Kodama do Bosque",
     "supremo": "Espírito da Árvore Milenar",
     "ultimate": "Árvore gigante cura e protege.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Kodama Solitário",
     "supremo": "Eco da Floresta",
     "ultimate": "Eco: repete as últimas habilidades da equipe.",
     "linhagem": "pequeninos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Kodama Ritual",
     "supremo": "Coro dos Kodamas",
     "ultimate": "Coro que acelera a equipe.",
     "linhagem": "pequeninos",
     "classe_extra": "xama",
     "elemento": "natureza",
     "condicao": {
      "tipo": "alianca",
      "classe": "xama"
     }
    }
   ],
   "animal": "musgo / árvore",
   "personalidade": "quieto e observador",
   "traco": "a máscara de folha que muda de expressão",
   "forma": "criatura"
  },
  {
   "id": "iara",
   "linhagem": "marinhos",
   "universo": "amazonia",
   "elemento": "agua",
   "classe": "xama",
   "visual": "sereia de rio de cabelos longos e escuros e cauda de peixe amazônico, entre vitórias-régias",
   "filhote": "Lírio do Rio",
   "jovem": "Iara Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Iara",
     "supremo": "Mãe-d’Água",
     "ultimate": "Canto: inimigos lutam entre si.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Iara Solitária",
     "supremo": "Senhora do Rio",
     "ultimate": "Redemoinho que afoga.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Iara Encantadora",
     "supremo": "Rainha das Águas",
     "ultimate": "Espelho d’água reflete projéteis.",
     "linhagem": "marinhos",
     "classe_extra": "mago",
     "elemento": "agua",
     "condicao": {
      "tipo": "alianca",
      "classe": "mago"
     }
    }
   ],
   "animal": "humanoide: sereia de rio",
   "personalidade": "encantadora e vaidosa",
   "traco": "a cauda de peixe com escamas iridescentes",
   "forma": "humanoide"
  },
  {
   "id": "boto",
   "linhagem": "marinhos",
   "universo": "amazonia",
   "elemento": "natureza",
   "classe": "mistico",
   "visual": "boto-cor-de-rosa sorridente, que usa chapéu branco na forma encantada",
   "filhote": "Filhote de Boto",
   "jovem": "Boto Rosa",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Boto Encantado",
     "supremo": "Boto Senhor dos Bailes",
     "ultimate": "Baile encantado: inimigos dançam atordoados.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Boto Solitário",
     "supremo": "Boto Ancião",
     "ultimate": "Bolha de cura em volta da equipe.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Boto do Mar",
     "supremo": "Rei dos Botos",
     "ultimate": "Onda de botos atravessa a tela.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "regional",
      "era": "navegacoes",
      "elemento": "agua"
     }
    }
   ],
   "animal": "boto",
   "personalidade": "festeiro e charmoso",
   "traco": "o chapéu branco",
   "forma": "criatura"
  },
  {
   "id": "sereia",
   "linhagem": "marinhos",
   "universo": "grecia",
   "elemento": "ar",
   "classe": "mago",
   "visual": "sereia grega com asas e penas de pássaro marinho, cantando sobre as ondas",
   "filhote": "Cantiga",
   "jovem": "Sereia Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Sereia das Rochas",
     "supremo": "Coro das Sereias",
     "ultimate": "Canto que atrai e explode.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Sereia Solitária",
     "supremo": "Sereia Ancestral",
     "ultimate": "Nota final: dano em toda a tela.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Sereia do Mar Profundo",
     "supremo": "Rainha das Marés",
     "ultimate": "Maré que varre a tela.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "regional",
      "era": "navegacoes",
      "elemento": "agua"
     }
    }
   ],
   "animal": "humanoide: sereia grega",
   "personalidade": "cantora e sonhadora",
   "traco": "as penas da cabeça em forma de notas musicais",
   "forma": "humanoide"
  },
  {
   "id": "leviata",
   "linhagem": "marinhos",
   "universo": "mar_profundo",
   "elemento": "agua",
   "classe": "guardiao",
   "visual": "girino-serpente que vira uma serpente colossal de nadadeiras como asas",
   "filhote": "Leviatã Filhote",
   "jovem": "Leviatã Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Leviatã",
     "supremo": "Leviatã Primordial",
     "ultimate": "Engole a tela num redemoinho.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Leviatã Solitário",
     "supremo": "Serpente Abissal",
     "ultimate": "Anel abissal em volta da equipe.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Leviatã de Guerra",
     "supremo": "Leviatã Couraçado",
     "ultimate": "Investida colossal.",
     "linhagem": "marinhos",
     "classe_extra": "guerreiro",
     "elemento": "agua",
     "condicao": {
      "tipo": "alianca",
      "classe": "guerreiro"
     }
    }
   ],
   "animal": "girino / serpente marinha",
   "personalidade": "tímido no começo, protetor dos mares depois",
   "traco": "as nadadeiras em forma de asa",
   "forma": "criatura"
  },
  {
   "id": "ahuizotl",
   "linhagem": "marinhos",
   "universo": "tenochtitlan",
   "elemento": "agua",
   "classe": "assassino",
   "visual": "cão d’água de pelo liso e brilhante",
   "filhote": "Cria do Lago",
   "jovem": "Ahuízotl",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Ahuízotl das Profundezas",
     "supremo": "Senhor do Lago",
     "ultimate": "A mão da cauda puxa inimigos para o fundo.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Ahuízotl Espreitador",
     "supremo": "Ahuízotl Ancestral",
     "ultimate": "Emboscadas em cadeia.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Ahuízotl Sombrio",
     "supremo": "Ahuízotl do Abismo",
     "ultimate": "Abre um abismo no chão.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "sombra"
     }
    }
   ],
   "animal": "cão-d’água",
   "personalidade": "pregador de peças",
   "traco": "a mãozinha na ponta da cauda",
   "forma": "criatura"
  },
  {
   "id": "poraque",
   "linhagem": "marinhos",
   "universo": "amazonia",
   "elemento": "raio",
   "classe": "mistico",
   "visual": "enguia rosada e fofa",
   "filhote": "Ovinho Faiscante",
   "jovem": "Poraquê",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Poraquê Gigante",
     "supremo": "Rei-Poraquê",
     "ultimate": "Choque que recarrega as habilidades da equipe.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Poraquê Solitário",
     "supremo": "Poraquê Ancestral",
     "ultimate": "Campo elétrico paralisante.",
     "linhagem": "marinhos",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Poraquê Arpão",
     "supremo": "Lança Viva",
     "ultimate": "Dispara-se como um arpão elétrico.",
     "linhagem": "marinhos",
     "classe_extra": "cacador",
     "elemento": "raio",
     "condicao": {
      "tipo": "alianca",
      "classe": "cacador"
     }
    }
   ],
   "animal": "enguia",
   "personalidade": "simpático e espoleta",
   "traco": "as bolinhas que acendem como pisca-pisca",
   "forma": "criatura"
  },
  {
   "id": "fenix",
   "linhagem": "alados",
   "universo": "grecia",
   "elemento": "fogo",
   "classe": "mago",
   "visual": "ave de fogo de plumagem em brasa, que renasce cada vez mais majestosa",
   "filhote": "Ovo de Cinzas",
   "jovem": "Fênix Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Fênix",
     "supremo": "Fênix Imortal",
     "ultimate": "Renasce numa explosão solar.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Fênix Solitária",
     "supremo": "Fênix Ancestral",
     "ultimate": "Chuva de penas de fogo.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Fênix Curandeira",
     "supremo": "Fênix das Lágrimas",
     "ultimate": "Lágrimas que curam e revivem.",
     "linhagem": "alados",
     "classe_extra": "mistico",
     "elemento": "fogo",
     "condicao": {
      "tipo": "alianca",
      "classe": "mistico"
     }
    }
   ],
   "animal": "pássaro",
   "personalidade": "otimista, renasce sorrindo",
   "traco": "a crista em forma de chama",
   "forma": "criatura"
  },
  {
   "id": "simurgh",
   "linhagem": "alados",
   "universo": "persia",
   "elemento": "luz",
   "classe": "mistico",
   "visual": "ave sagrada persa de plumagem radiante, com penas-olho que brilham como pequenos sóis",
   "filhote": "Pena Luminosa",
   "jovem": "Simurgh Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Simurgh",
     "supremo": "Simurgh da Árvore da Vida",
     "ultimate": "Árvore da vida: cura e escudo.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Simurgh Ermitã",
     "supremo": "Simurgh Sábia",
     "ultimate": "Dobra o XP e revela elites.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Simurgh Protetora",
     "supremo": "Asas do Monte Qaf",
     "ultimate": "Asas cobrem e protegem a equipe.",
     "linhagem": "alados",
     "classe_extra": "guardiao",
     "elemento": "luz",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "pavão",
   "personalidade": "sábio e acolhedor",
   "traco": "as penas-olho da cauda",
   "forma": "criatura"
  },
  {
   "id": "roc",
   "linhagem": "alados",
   "universo": "mil_noites",
   "elemento": "terra",
   "classe": "cacador",
   "visual": "ave gigantesca de penas marrons que carrega rochas nas garras",
   "filhote": "Ovo de Roc",
   "jovem": "Roc Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Roc",
     "supremo": "Roc Colossal",
     "ultimate": "Arremessa rochedos por toda a tela.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Roc Solitário",
     "supremo": "Roc do Vale dos Diamantes",
     "ultimate": "Chuva de diamantes.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Roc dos Mares",
     "supremo": "Roc das Tempestades",
     "ultimate": "Mergulho que cria uma onda.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "regional",
      "era": "navegacoes",
      "elemento": "ar"
     }
    }
   ],
   "animal": "ave gigante",
   "personalidade": "desajeitado e fortíssimo",
   "traco": "o pedaço de casca na cabeça",
   "forma": "criatura"
  },
  {
   "id": "tengu",
   "linhagem": "alados",
   "universo": "japao",
   "elemento": "ar",
   "classe": "guerreiro",
   "visual": "homem-corvo de máscara vermelha de nariz comprido, roupa de andarilho da montanha e leque de penas",
   "filhote": "Pena de Corvo",
   "jovem": "Karasu Tengu",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Tengu da Montanha",
     "supremo": "Grande Tengu",
     "ultimate": "Leque que cria um tornado.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Tengu Espadachim",
     "supremo": "Mestre Tengu",
     "ultimate": "Mil cortes.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Tengu Sombra",
     "supremo": "Tengu da Lua Negra",
     "ultimate": "Cortes invisíveis.",
     "linhagem": "alados",
     "classe_extra": "assassino",
     "elemento": "ar",
     "condicao": {
      "tipo": "alianca",
      "classe": "assassino"
     }
    }
   ],
   "animal": "humanoide: homem-corvo",
   "personalidade": "orgulhoso e disciplinado",
   "traco": "a máscara vermelha",
   "forma": "humanoide"
  },
  {
   "id": "harpia",
   "linhagem": "alados",
   "universo": "grecia",
   "elemento": "ar",
   "classe": "cacador",
   "visual": "mulher-pássaro de asas no lugar dos braços, penacho armado e garras grandes nos pés",
   "filhote": "Filhote de Harpia",
   "jovem": "Harpia",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Harpia da Tempestade",
     "supremo": "Rainha das Harpias",
     "ultimate": "Revoada de penas cortantes.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Harpia Solitária",
     "supremo": "Harpia Ancestral",
     "ultimate": "Rasante que rouba ouro.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Harpia do Raio",
     "supremo": "Harpia Trovejante",
     "ultimate": "Penas de raio.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "raio"
     }
    }
   ],
   "animal": "humanoide: mulher-pássaro",
   "personalidade": "afiada e independente",
   "traco": "o penacho em coroa",
   "forma": "humanoide"
  },
  {
   "id": "anjo",
   "linhagem": "alados",
   "universo": "tavola",
   "elemento": "luz",
   "classe": "invocador",
   "visual": "anjo de luz que nasce de uma nuvem, com asas de penas brancas e auréola dourada",
   "filhote": "Nuvenzinha",
   "jovem": "Anjinho",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Arcanjo",
     "supremo": "Arcanjo Supremo",
     "ultimate": "Toque da Trombeta: uma onda de luz atordoa todos os inimigos na tela.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Querubim",
     "supremo": "Trono",
     "ultimate": "Portão Guardado: uma muralha de asas bloqueia inimigos e reflete projéteis.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Serafim",
     "supremo": "Serafim Ardente",
     "ultimate": "Coro Ardente: um anel de luz gira ao redor do time, queima inimigos e cura aliados.",
     "linhagem": "alados",
     "classe_extra": "mistico",
     "elemento": "luz",
     "condicao": {
      "tipo": "alianca",
      "classe": "mistico"
     }
    }
   ],
   "animal": "humanoide: anjo",
   "personalidade": "doce e protetor, adora cantar",
   "traco": "a auréola dourada",
   "forma": "humanoide"
  },
  {
   "id": "morcego",
   "linhagem": "alados",
   "universo": "transilvania",
   "elemento": "sombra",
   "classe": "mistico",
   "visual": "morcego de orelhas enormes e olhos vermelhos brilhantes",
   "filhote": "Morceguinho",
   "jovem": "Morcego Vampiro",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Morcego da Noite",
     "supremo": "Rei dos Morcegos",
     "ultimate": "Nuvem que drena inimigos e cura a equipe.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Morcego Solitário",
     "supremo": "Morcego Ancião",
     "ultimate": "Eco sonar: revela e atordoa.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Morcego Caçador",
     "supremo": "Morcego Sanguinário",
     "ultimate": "Mordidas em cadeia.",
     "linhagem": "alados",
     "classe_extra": "assassino",
     "elemento": "sombra",
     "condicao": {
      "tipo": "alianca",
      "classe": "assassino"
     }
    }
   ],
   "animal": "morcego",
   "personalidade": "noturno e carinhoso",
   "traco": "as orelhas enormes",
   "forma": "criatura"
  },
  {
   "id": "minotauro",
   "linhagem": "quimeras",
   "universo": "grecia",
   "elemento": "terra",
   "classe": "guerreiro",
   "visual": "homem-touro forte de chifres curtos e machado de pedra",
   "filhote": "Bezerro de Creta",
   "jovem": "Touro do Labirinto",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Minotauro",
     "supremo": "Senhor do Labirinto",
     "ultimate": "Labirinto de pedra prende os inimigos.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Minotauro Errante",
     "supremo": "Minotauro Ancestral",
     "ultimate": "Investida que atravessa a tela.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Minotauro Couraçado",
     "supremo": "Minotauro de Bronze",
     "ultimate": "Escudo de bronze.",
     "linhagem": "quimeras",
     "classe_extra": "guardiao",
     "elemento": "terra",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "humanoide: homem-touro",
   "personalidade": "teimoso, mas fiel",
   "traco": "o argolão de bronze no focinho",
   "forma": "humanoide"
  },
  {
   "id": "medusa",
   "linhagem": "quimeras",
   "universo": "grecia",
   "elemento": "terra",
   "classe": "mago",
   "visual": "górgona de cabelo de serpentes com expressões próprias e cauda de serpente no lugar das pernas, olhar brilhante",
   "filhote": "Górgona Infante",
   "jovem": "Górgona Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Medusa",
     "supremo": "Rainha Górgona",
     "ultimate": "Olhar petrificante em toda a tela.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Górgona Reclusa",
     "supremo": "Górgona Ancestral",
     "ultimate": "Jardim de estátuas que explodem.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Górgona Sombria",
     "supremo": "Górgona da Noite",
     "ultimate": "Serpentes sombrias.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "regional",
      "era": "gotica",
      "elemento": "sombra"
     }
    }
   ],
   "animal": "humanoide: górgona",
   "personalidade": "tímida, evita olhar nos olhos",
   "traco": "o cabelo de cobrinhas",
   "forma": "humanoide"
  },
  {
   "id": "esfinge",
   "linhagem": "quimeras",
   "universo": "egito",
   "elemento": "luz",
   "classe": "xama",
   "visual": "esfinge solar de corpo de leão, disco de sol na fronte e hieróglifos que brilham na pele",
   "filhote": "Filhote de Esfinge",
   "jovem": "Esfinge Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Esfinge",
     "supremo": "Grande Esfinge",
     "ultimate": "Enigma: inimigos que erram a resposta somem.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Esfinge dos Enigmas",
     "supremo": "Esfinge Ancestral",
     "ultimate": "Silêncio: inimigos param.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Esfinge Guardiã",
     "supremo": "Guardiã das Pirâmides",
     "ultimate": "Pirâmide de luz protege a equipe.",
     "linhagem": "quimeras",
     "classe_extra": "guardiao",
     "elemento": "luz",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "humanoide: esfinge",
   "personalidade": "adora enigmas e cochilos ao sol",
   "traco": "o toucado listrado",
   "forma": "humanoide"
  },
  {
   "id": "grifo",
   "linhagem": "quimeras",
   "universo": "grecia",
   "elemento": "ar",
   "classe": "cacador",
   "visual": "criatura meio águia, meio leão, de plumagem macia no peito",
   "filhote": "Ovo de Grifo",
   "jovem": "Grifo Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Grifo",
     "supremo": "Grifo Real",
     "ultimate": "Rasante que derruba tudo no caminho.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Grifo do Ouro",
     "supremo": "Grifo Ancestral",
     "ultimate": "Ninho de ouro vira escudo.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "alianca",
     "nome": "Grifo Sentinela",
     "supremo": "Grifo Bastião",
     "ultimate": "Asas formam uma muralha de vento.",
     "linhagem": "quimeras",
     "classe_extra": "guardiao",
     "elemento": "ar",
     "condicao": {
      "tipo": "alianca",
      "classe": "guardiao"
     }
    }
   ],
   "animal": "águia / leão",
   "personalidade": "corajoso e leal",
   "traco": "a penugem do peito em forma de coração",
   "forma": "criatura"
  },
  {
   "id": "escorpiao_homem",
   "linhagem": "quimeras",
   "universo": "mesopotamia",
   "elemento": "natureza",
   "classe": "cacador",
   "visual": "guerreiro de tronco humano e corpo de escorpião, couraça dourada e arco",
   "filhote": "Filhote de Escorpião",
   "jovem": "Escorpião-Homem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Escorpião-Homem Arqueiro",
     "supremo": "Guardião do Portão do Sol",
     "ultimate": "Leque gigante de flechas venenosas.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Escorpião Solitário",
     "supremo": "Escorpião Ancestral",
     "ultimate": "Ferrão que derruba elites.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Escorpião de Areia",
     "supremo": "Escorpião do Deserto Eterno",
     "ultimate": "Tempestade de areia.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "terra"
     }
    }
   ],
   "animal": "humanoide: homem-escorpião",
   "personalidade": "preciso e calado",
   "traco": "o ferrão em forma de ponta de flecha",
   "forma": "humanoide"
  },
  {
   "id": "quimera",
   "linhagem": "quimeras",
   "universo": "grecia",
   "elemento": "fogo",
   "classe": "invocador",
   "visual": "leão com uma cabeça de cabra nas costas e uma serpente na cauda",
   "filhote": "Quimerinha",
   "jovem": "Quimera Jovem",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Quimera",
     "supremo": "Quimera Primordial",
     "ultimate": "As três cabeças atacam sozinhas.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "solitario",
     "nome": "Quimera Solitária",
     "supremo": "Quimera Ancestral",
     "ultimate": "Sopro em cone gigante.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "solitario"
     }
    },
    {
     "tipo": "regional",
     "nome": "Quimera Mutante",
     "supremo": "Quimera do Caos",
     "ultimate": "Troca de elemento a cada 5 segundos.",
     "linhagem": "quimeras",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "regional",
      "era": "elementais",
      "elemento": "ar"
     }
    }
   ],
   "animal": "leão / cabra / cobra",
   "personalidade": "três vozes, um coração",
   "traco": "as três cabeças sempre discutindo",
   "forma": "criatura"
  }
 ],
 "elos": [
  {
   "a": "fogo_fatuo",
   "b": "kitsune",
   "nome": "Noite das Mil Chamas",
   "desc": "As chamas orbitais dos dois se multiplicam."
  },
  {
   "a": "fogo_fatuo",
   "b": "iara",
   "nome": "Névoa do Rio",
   "desc": "Vapor dura mais e cega numa área maior."
  },
  {
   "a": "fogo_fatuo",
   "b": "curupira",
   "nome": "Guardiões da Mata",
   "desc": "Inimigos que entram na floresta queimam e se perdem."
  },
  {
   "a": "saci",
   "b": "curupira",
   "nome": "Trapaça da Floresta",
   "desc": "Inimigos confusos andam em círculos."
  },
  {
   "a": "iara",
   "b": "boto",
   "nome": "Encantos do Rio",
   "desc": "Inimigos encantados viram aliados por alguns segundos."
  },
  {
   "a": "fogo_fatuo",
   "b": "ciclope",
   "nome": "Forja Titânica (fusão)",
   "desc": "Fusão da Fornalha Viva com o Ciclope adulto: chuva de armas incandescentes."
  },
  {
   "a": "vampiro",
   "b": "morcego",
   "nome": "Noite de Sangue",
   "desc": "Todo roubo de vida também cura o aliado mais ferido."
  },
  {
   "a": "cerbero",
   "b": "esfinge",
   "nome": "Portões do Além",
   "desc": "Guardiões dos portões: escudo compartilhado dobrado."
  },
  {
   "a": "draugr",
   "b": "anjo",
   "nome": "Descanso dos Inquietos",
   "desc": "Inimigos derrotados viram pequenos espíritos de luz que lutam ao seu lado."
  },
  {
   "a": "jotunn",
   "b": "lobisomem",
   "nome": "Inverno do Lobo",
   "desc": "Cada abate congela inimigos próximos."
  },
  {
   "a": "ryu",
   "b": "long",
   "nome": "Dragões do Oriente",
   "desc": "Pérolas que disparam raios e curam."
  },
  {
   "a": "dragao_gales",
   "b": "grifo",
   "nome": "Céus da Távola",
   "desc": "Rasantes conjuntos em linha."
  },
  {
   "a": "medusa",
   "b": "minotauro",
   "nome": "Labirinto de Pedra",
   "desc": "Inimigos petrificados viram paredes."
  },
  {
   "a": "fenix",
   "b": "simurgh",
   "nome": "Aves Eternas",
   "desc": "A equipe renasce uma vez a mais por mapa."
  },
  {
   "a": "kappa",
   "b": "leviata",
   "nome": "Lutadores das Águas",
   "desc": "Empurrões viram ondas."
  },
  {
   "a": "gnomo",
   "b": "mandragora",
   "nome": "Horta Encantada",
   "desc": "Servos plantam mandrágoras que gritam."
  },
  {
   "a": "fada",
   "b": "roc",
   "nome": "Revoada de Luz",
   "desc": "Gemas coletadas viram flechas de luz."
  },
  {
   "a": "jiangshi",
   "b": "poraque",
   "nome": "Corrente Morta-viva",
   "desc": "Choques reanimam inimigos como aliados."
  },
  {
   "a": "tengu",
   "b": "ryu",
   "nome": "Tempestade da Montanha",
   "desc": "Tornados eletrizados."
  },
  {
   "a": "ammit",
   "b": "mumia",
   "nome": "Julgamento do Coração",
   "desc": "Elites marcadas perdem defesa."
  },
  {
   "a": "banshee",
   "b": "cacada_selvagem",
   "nome": "Grito da Caçada",
   "desc": "Cada grito convoca um cavaleiro espectral."
  },
  {
   "a": "qilin",
   "b": "kodama",
   "nome": "Bosque Sagrado",
   "desc": "Áreas de cura também enraízam inimigos."
  },
  {
   "a": "ifrit",
   "b": "quimera",
   "nome": "Sopro do Deserto",
   "desc": "Sopros de fogo deixam tempestade de areia."
  },
  {
   "a": "harpia",
   "b": "sereia",
   "nome": "Canto das Rochas",
   "desc": "Projéteis encantam os atingidos."
  }
 ],
 "ancestrais": [
  {
   "id": "dragao_solar",
   "ancestral": true,
   "linhagem": "dragoes",
   "universo": null,
   "elemento": "luz",
   "classe": "mago",
   "visual": "a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head",
   "filhote": "Dragonete Solar",
   "jovem": "Dragão Solar Jovem",
   "ovo": "Ovo Solar",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Dragão Solar",
     "supremo": "Dragão Solar Ancestral",
     "ultimate": "Coroa Solar: um disco de sol desce e queima tudo na tela por 4 s.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão Solar",
     "supremo": "Dragão Solar Ancestral",
     "ultimate": "Coroa Solar: um disco de sol desce e queima tudo na tela por 4 s.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão Solar",
     "supremo": "Dragão Solar Ancestral",
     "ultimate": "Coroa Solar: um disco de sol desce e queima tudo na tela por 4 s.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "luz",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head",
   "forma": "criatura"
  },
  {
   "id": "mariposa_vazio",
   "ancestral": true,
   "linhagem": "alados",
   "universo": null,
   "elemento": "sombra",
   "classe": "mistico",
   "visual": "a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun",
   "filhote": "Larva do Vazio",
   "jovem": "Mariposa do Vazio Jovem",
   "ovo": "Casulo do Vazio",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Mariposa do Vazio",
     "supremo": "Mariposa do Vazio Ancestral",
     "ultimate": "Eclipse: um sol negro suga a vida dos inimigos e cura a equipe.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Mariposa do Vazio",
     "supremo": "Mariposa do Vazio Ancestral",
     "ultimate": "Eclipse: um sol negro suga a vida dos inimigos e cura a equipe.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Mariposa do Vazio",
     "supremo": "Mariposa do Vazio Ancestral",
     "ultimate": "Eclipse: um sol negro suga a vida dos inimigos e cura a equipe.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "sombra",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun",
   "forma": "criatura"
  },
  {
   "id": "arvore_dragao",
   "ancestral": true,
   "linhagem": "dragoes",
   "universo": null,
   "elemento": "natureza",
   "classe": "invocador",
   "visual": "a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins",
   "filhote": "Broto-Dragão",
   "jovem": "Árvore-Dragão Jovem",
   "ovo": "Semente-Ovo Ancestral",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Árvore-Dragão",
     "supremo": "Árvore-Dragão Ancestral",
     "ultimate": "Floresta Viva: brotam árvores que prendem e atacam os inimigos.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Árvore-Dragão",
     "supremo": "Árvore-Dragão Ancestral",
     "ultimate": "Floresta Viva: brotam árvores que prendem e atacam os inimigos.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Árvore-Dragão",
     "supremo": "Árvore-Dragão Ancestral",
     "ultimate": "Floresta Viva: brotam árvores que prendem e atacam os inimigos.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "natureza",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins",
   "forma": "criatura"
  },
  {
   "id": "dragao_cristal",
   "ancestral": true,
   "linhagem": "dragoes",
   "universo": null,
   "elemento": "terra",
   "classe": "guardiao",
   "visual": "a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle",
   "filhote": "Dragonete de Cristal",
   "jovem": "Dragão de Cristal Jovem",
   "ovo": "Geodo-Ovo",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Dragão de Cristal",
     "supremo": "Dragão de Cristal Ancestral",
     "ultimate": "Muralha de Cristal: cristais erguem uma barreira que reflete projéteis.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão de Cristal",
     "supremo": "Dragão de Cristal Ancestral",
     "ultimate": "Muralha de Cristal: cristais erguem uma barreira que reflete projéteis.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão de Cristal",
     "supremo": "Dragão de Cristal Ancestral",
     "ultimate": "Muralha de Cristal: cristais erguem uma barreira que reflete projéteis.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "terra",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle",
   "forma": "criatura"
  },
  {
   "id": "dragao_mares",
   "ancestral": true,
   "linhagem": "dragoes",
   "universo": null,
   "elemento": "agua",
   "classe": "xama",
   "visual": "a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine",
   "filhote": "Dragonete das Marés",
   "jovem": "Dragão das Marés Jovem",
   "ovo": "Ovo das Marés",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Dragão das Marés",
     "supremo": "Dragão das Marés Ancestral",
     "ultimate": "Maré Alta: uma onda varre a tela e deixa o chão alagado.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão das Marés",
     "supremo": "Dragão das Marés Ancestral",
     "ultimate": "Maré Alta: uma onda varre a tela e deixa o chão alagado.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão das Marés",
     "supremo": "Dragão das Marés Ancestral",
     "ultimate": "Maré Alta: uma onda varre a tela e deixa o chão alagado.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "agua",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine",
   "forma": "criatura"
  },
  {
   "id": "dragao_vulcanico",
   "ancestral": true,
   "linhagem": "dragoes",
   "universo": null,
   "elemento": "fogo",
   "classe": "guerreiro",
   "visual": "a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks",
   "filhote": "Dragonete de Brasa",
   "jovem": "Dragão Vulcânico Jovem",
   "ovo": "Ovo de Magma",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Dragão Vulcânico",
     "supremo": "Dragão Vulcânico Ancestral",
     "ultimate": "Erupção: o chão racha e jorra magma em volta da equipe.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão Vulcânico",
     "supremo": "Dragão Vulcânico Ancestral",
     "ultimate": "Erupção: o chão racha e jorra magma em volta da equipe.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão Vulcânico",
     "supremo": "Dragão Vulcânico Ancestral",
     "ultimate": "Erupção: o chão racha e jorra magma em volta da equipe.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "fogo",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks",
   "forma": "criatura"
  },
  {
   "id": "dragao_celeste",
   "ancestral": true,
   "linhagem": "dragoes",
   "universo": null,
   "elemento": "ar",
   "classe": "cacador",
   "visual": "a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds",
   "filhote": "Dragonete das Nuvens",
   "jovem": "Dragão Celeste Jovem",
   "ovo": "Ovo das Nuvens",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Dragão Celeste",
     "supremo": "Dragão Celeste Ancestral",
     "ultimate": "Vendaval: ventos cortantes atravessam a tela em linhas.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão Celeste",
     "supremo": "Dragão Celeste Ancestral",
     "ultimate": "Vendaval: ventos cortantes atravessam a tela em linhas.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Dragão Celeste",
     "supremo": "Dragão Celeste Ancestral",
     "ultimate": "Vendaval: ventos cortantes atravessam a tela em linhas.",
     "linhagem": "dragoes",
     "classe_extra": null,
     "elemento": "ar",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds",
   "forma": "criatura"
  },
  {
   "id": "passaro_trovao",
   "ancestral": true,
   "linhagem": "alados",
   "universo": null,
   "elemento": "raio",
   "classe": "assassino",
   "visual": "the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes",
   "filhote": "Filhote do Trovão",
   "jovem": "Pássaro-Trovão Jovem",
   "ovo": "Ovo do Trovão",
   "ramos": [
    {
     "tipo": "afinidade",
     "nome": "Pássaro-Trovão",
     "supremo": "Pássaro-Trovão Ancestral",
     "ultimate": "Relâmpago em Cadeia: raios saltam de inimigo em inimigo.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Pássaro-Trovão",
     "supremo": "Pássaro-Trovão Ancestral",
     "ultimate": "Relâmpago em Cadeia: raios saltam de inimigo em inimigo.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    },
    {
     "tipo": "afinidade",
     "nome": "Pássaro-Trovão",
     "supremo": "Pássaro-Trovão Ancestral",
     "ultimate": "Relâmpago em Cadeia: raios saltam de inimigo em inimigo.",
     "linhagem": "alados",
     "classe_extra": null,
     "elemento": "raio",
     "condicao": {
      "tipo": "afinidade"
     }
    }
   ],
   "animal": "dragão ancestral",
   "personalidade": "majestoso",
   "traco": "the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes",
   "forma": "criatura"
  }
 ],
 "ancestrais_info": [
  {
   "id": "dragao_solar",
   "elemento": "luz",
   "classe": "mago",
   "linhagem": "dragoes",
   "provisorio": false,
   "ovo": "Ovo Solar",
   "filhote": "Dragonete Solar",
   "jovem": "Dragão Solar Jovem",
   "adulto": "Dragão Solar",
   "supremo": "Dragão Solar Ancestral",
   "ultimate": "Coroa Solar: um disco de sol desce e queima tudo na tela por 4 s.",
   "visual": "a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head",
   "formas": [
    "a pearl-white egg with gold veins and a small sun disk glowing through the shell",
    "a small pearl-white hatchling with stubby gold-tipped wings and a tiny sun disk on its chest",
    "a young slender light dragon, wings half grown with sun-disk patterns, a small ray crown",
    "the adult Solar Dragon standing proud, wings spread, sun disks blazing on chest and wings, halo of rays behind the head",
    "the ancestral Solar Dragon, colossal, wings like a sunrise, a full sun-halo crown and golden armor-scales radiating light"
   ]
  },
  {
   "id": "mariposa_vazio",
   "elemento": "sombra",
   "classe": "mistico",
   "linhagem": "alados",
   "provisorio": false,
   "ovo": "Casulo do Vazio",
   "filhote": "Larva do Vazio",
   "jovem": "Mariposa do Vazio Jovem",
   "adulto": "Mariposa do Vazio",
   "supremo": "Mariposa do Vazio Ancestral",
   "ultimate": "Eclipse: um sol negro suga a vida dos inimigos e cura a equipe.",
   "visual": "a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun",
   "formas": [
    "a dark cocoon wrapped in purple threads, a crescent moon glowing faintly inside",
    "a small fluffy larva of the void with a pale little mask and tiny starry spots",
    "a young moth with small starry wings and the first crescent-moon eyespots",
    "the adult Void Moth, wings spread wide with crescent-moon eyespots and starry purple dust, golden ring halo",
    "the ancestral Void Moth, enormous wings like a night sky, a black-sun eclipse halo, flowing cloak-like wing tails"
   ]
  },
  {
   "id": "arvore_dragao",
   "elemento": "natureza",
   "classe": "invocador",
   "linhagem": "dragoes",
   "provisorio": false,
   "ovo": "Semente-Ovo Ancestral",
   "filhote": "Broto-Dragão",
   "jovem": "Árvore-Dragão Jovem",
   "adulto": "Árvore-Dragão",
   "supremo": "Árvore-Dragão Ancestral",
   "ultimate": "Floresta Viva: brotam árvores que prendem e atacam os inimigos.",
   "visual": "a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins",
   "formas": [
    "a big seed-shaped egg of bark with a green glow and a single red leaf sprouting",
    "a small sprout dragon of soft green wood, two leaf-horns, a tiny red leaf tail",
    "a young bark dragon, branches starting as horns, moss on the back, a few red leaves",
    "the adult Tree Dragon, long body of bark and moss, branch horns, red autumn canopy on its back, green glowing veins",
    "the ancestral Tree Dragon, colossal, its back a whole autumn forest, roots trailing like a mane"
   ]
  },
  {
   "id": "dragao_cristal",
   "elemento": "terra",
   "classe": "guardiao",
   "linhagem": "dragoes",
   "provisorio": false,
   "ovo": "Geodo-Ovo",
   "filhote": "Dragonete de Cristal",
   "jovem": "Dragão de Cristal Jovem",
   "adulto": "Dragão de Cristal",
   "supremo": "Dragão de Cristal Ancestral",
   "ultimate": "Muralha de Cristal: cristais erguem uma barreira que reflete projéteis.",
   "visual": "a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle",
   "formas": [
    "a rough stone geode egg cracked open, clear crystals shining inside",
    "a small stone hatchling with tiny crystal spikes on the back",
    "a young stone dragon with growing crystal spikes and small crystal wings",
    "the adult Crystal Dragon, stone scales, big clear crystal spikes and translucent crystal wings",
    "the ancestral Crystal Dragon, colossal, a crown of giant crystals, wings like stained crystal panes"
   ]
  },
  {
   "id": "dragao_mares",
   "elemento": "agua",
   "classe": "xama",
   "linhagem": "dragoes",
   "provisorio": false,
   "ovo": "Ovo das Marés",
   "filhote": "Dragonete das Marés",
   "jovem": "Dragão das Marés Jovem",
   "adulto": "Dragão das Marés",
   "supremo": "Dragão das Marés Ancestral",
   "ultimate": "Maré Alta: uma onda varre a tela e deixa o chão alagado.",
   "visual": "a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine",
   "formas": [
    "a blue pearl-like egg with waves swirling inside the shell",
    "a small blue hatchling with soft fin-ears and a little foam mane",
    "a young sea dragon with wave-crest fins and a growing foam mane",
    "the adult Tide Dragon, wave-crest fins, foam mane, pearls and coral along the spine, water rings around its body",
    "the ancestral Tide Dragon, colossal, a crown of coral and a mane like a breaking wave"
   ]
  },
  {
   "id": "dragao_vulcanico",
   "elemento": "fogo",
   "classe": "guerreiro",
   "linhagem": "dragoes",
   "provisorio": true,
   "ovo": "Ovo de Magma",
   "filhote": "Dragonete de Brasa",
   "jovem": "Dragão Vulcânico Jovem",
   "adulto": "Dragão Vulcânico",
   "supremo": "Dragão Vulcânico Ancestral",
   "ultimate": "Erupção: o chão racha e jorra magma em volta da equipe.",
   "visual": "a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks",
   "formas": [
    "an obsidian egg with glowing magma cracks",
    "a small ember hatchling with warm glowing cracks and a flame tail",
    "a young volcanic dragon, rock plates with magma seams, small flame mane",
    "the adult Volcanic Dragon, black rock scales with magma cracks, flame mane, volcano-peak horns",
    "the ancestral Volcanic Dragon, colossal, its back a smoking volcano range, rivers of magma in the scales"
   ]
  },
  {
   "id": "dragao_celeste",
   "elemento": "ar",
   "classe": "cacador",
   "linhagem": "dragoes",
   "provisorio": true,
   "ovo": "Ovo das Nuvens",
   "filhote": "Dragonete das Nuvens",
   "jovem": "Dragão Celeste Jovem",
   "adulto": "Dragão Celeste",
   "supremo": "Dragão Celeste Ancestral",
   "ultimate": "Vendaval: ventos cortantes atravessam a tela em linhas.",
   "visual": "a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds",
   "formas": [
    "a pale sky-blue egg wrapped in a small swirl of cloud",
    "a small fluffy cloud hatchling with feathered wing buds",
    "a young sky dragon with feathered wings and a cloud mane starting",
    "the adult Sky Dragon, long and slender, big feathered wings, cloud mane, wind ribbons along the body",
    "the ancestral Sky Dragon, colossal, wings like a storm front, a crown of swirling clouds"
   ]
  },
  {
   "id": "passaro_trovao",
   "elemento": "raio",
   "classe": "assassino",
   "linhagem": "alados",
   "provisorio": true,
   "ovo": "Ovo do Trovão",
   "filhote": "Filhote do Trovão",
   "jovem": "Pássaro-Trovão Jovem",
   "adulto": "Pássaro-Trovão",
   "supremo": "Pássaro-Trovão Ancestral",
   "ultimate": "Relâmpago em Cadeia: raios saltam de inimigo em inimigo.",
   "visual": "the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes",
   "formas": [
    "a dark storm-blue egg with lightning veins flickering on the shell",
    "a small fluffy storm chick with static sparks in its down",
    "a young thunderbird with lightning-patterned wing feathers",
    "the adult Thunderbird, huge spread wings with lightning patterns, glowing eyes, crackling crest",
    "the ancestral Thunderbird, colossal, wings like a thunderstorm, a crown of lightning"
   ]
  }
 ],
 "ancestral_regras": {
  "mapa_min": 2,
  "chance_por_mapa": 0.4,
  "garantido_no_mapa": 4,
  "chocar_seg": 240,
  "por_abate_seg": 0.25,
  "nota": "Um ovo por run, só dos elementos do Pacto. Choca com o tempo de jogo e mais rápido com abates. O dragão entra como Lendário, com ramo único."
 },
 "eras": {
  "berco": {
   "nome": "Berço das Civilizações",
   "guardiao": "Tiamat, Mãe dos Monstros",
   "guardiao_visual": "dragoa primordial do caos com corpo de água salgada e escamas de tempestade",
   "combate": {
    "corpo": "serpente",
    "detalhes": [
     "chifres",
     "asas",
     "brilho"
    ],
    "golpes": [
     {
      "nome": "Águas Primordiais",
      "tipo": "onda",
      "desc": "A água salgada do caos se espalha em ondas.",
      "vmax": 160,
      "vel": 100,
      "el": "agua",
      "solo": "agua",
      "empurra": true
     },
     {
      "nome": "Mãe dos Monstros",
      "tipo": "invocar",
      "desc": "Dá à luz onze monstros que cercam a equipe.",
      "n": 11,
      "k": -1,
      "cerco": true
     },
     {
      "nome": "Tempestade do Caos",
      "tipo": "espiral",
      "desc": "Escamas de tempestade giram em todas as direções.",
      "bracos": 6,
      "dur": 5,
      "proj": "raio",
      "el": "raio"
     }
    ],
    "fase2": {
     "nome": "Abzu e Tiamat",
     "op": "caos",
     "desc": "Água doce e salgada se misturam: cada pedaço do chão vira um elemento."
    },
    "mania": ""
   }
  },
  "reinos": {
   "nome": "Era dos Reinos",
   "guardiao": "Fenrir Desacorrentado",
   "guardiao_visual": "lobo colossal de pelo cinza-ferro arrastando correntes quebradas",
   "combate": {
    "corpo": "quadrupede",
    "detalhes": [
     "correntes",
     "presas",
     "pelo",
     "brilho"
    ],
    "golpes": [
     {
      "nome": "Correntes Partidas",
      "tipo": "feixe",
      "desc": "Os pedaços da corrente mágica chicoteiam a arena.",
      "n": 2,
      "larg": 6,
      "alcance": 150,
      "varre": 2.4,
      "el": "sombra",
      "quebra": true
     },
     {
      "nome": "Devorar o Sol",
      "tipo": "escuridao",
      "desc": "Abocanha o sol: a arena escurece.",
      "dur": 6
     },
     {
      "nome": "Investida do Lobo",
      "tipo": "investida",
      "desc": "Três investidas de lobo gigante.",
      "n": 3,
      "vel": 300
     }
    ],
    "fase2": {
     "nome": "Ragnarök",
     "op": "incendiar",
     "desc": "Fogo e gelo rasgam a arena ao mesmo tempo.",
     "gelo": true
    },
    "mania": ""
   }
  },
  "novo_mundo": {
   "nome": "Novo Mundo",
   "guardiao": "Os Senhores de Xibalba",
   "guardiao_visual": "dupla de reis esqueléticos com cocares de penas e máscaras de jade",
   "combate": {
    "corpo": "humanoide",
    "detalhes": [
     "ossos",
     "coroa",
     "mascara",
     "brilho"
    ],
    "golpes": [
     {
      "nome": "Jogo de Bola Sagrado",
      "tipo": "bola",
      "desc": "Duas bolas do jogo sagrado quicam pela arena.",
      "n": 2,
      "r": 6,
      "dur": 10,
      "el": "terra"
     },
     {
      "nome": "Casas das Provas",
      "tipo": "invocar",
      "desc": "Abre as casas das provas: jaguares, morcegos e navalhas.",
      "n": 8,
      "k": -1
     },
     {
      "nome": "Ossos de Xibalba",
      "tipo": "chuva",
      "desc": "Ossos caem como chuva.",
      "n": 10,
      "r": 12,
      "proj": "osso",
      "el": "sombra"
     }
    ],
    "fase2": {
     "nome": "Casa da Escuridão",
     "op": "escurecer",
     "desc": "A primeira prova: a escuridão total."
    },
    "mania": ""
   }
  },
  "navegacoes": {
   "nome": "Grandes Navegações",
   "guardiao": "O Kraken",
   "guardiao_visual": "lula colossal com tentáculos do tamanho de navios",
   "combate": {
    "corpo": "bolha",
    "detalhes": [
     "tentaculos",
     "olho_unico",
     "brilho"
    ],
    "golpes": [
     {
      "nome": "Tentáculos do Abismo",
      "tipo": "tentaculos",
      "desc": "Dez tentáculos brotam em sequência.",
      "n": 10,
      "r": 15,
      "intervalo": 0.35
     },
     {
      "nome": "Engolir Navios",
      "tipo": "vortice",
      "desc": "Um redemoinho que puxa tudo.",
      "r": 150,
      "dur": 4,
      "forca": 70,
      "engole": true
     },
     {
      "nome": "Tinta Negra",
      "tipo": "sopro",
      "desc": "Uma nuvem de tinta que escurece o chão.",
      "ang": 1.2,
      "alcance": 120,
      "el": "sombra",
      "solo": "sombra"
     }
    ],
    "fase2": {
     "nome": "Mar Revolto",
     "op": "inundar",
     "desc": "O mar sobe e tudo boia."
    },
    "mania": ""
   }
  },
  "gotica": {
   "nome": "Era Gótica",
   "guardiao": "O Cavaleiro Sem Cabeça",
   "guardiao_visual": "cavaleiro sem cabeça segurando uma abóbora em chamas, cavalo negro",
   "combate": {
    "corpo": "humanoide",
    "detalhes": [
     "sem_cabeca",
     "abobora_mao",
     "capuz"
    ],
    "golpes": [
     {
      "nome": "Abóbora Flamejante",
      "tipo": "chuva",
      "desc": "Arremessa abóboras em chamas que explodem e incendeiam.",
      "n": 5,
      "r": 18,
      "proj": "abobora",
      "el": "fogo",
      "solo": "fogo"
     },
     {
      "nome": "Galope Noturno",
      "tipo": "investida",
      "desc": "Quatro galopes que atravessam a arena.",
      "n": 4,
      "vel": 310,
      "rastro": "sombra"
     },
     {
      "nome": "Cabeça Errante",
      "tipo": "clones",
      "desc": "A cabeça voa sozinha e ataca de outro ângulo.",
      "n": 1,
      "dur": 8
     }
    ],
    "fase2": {
     "nome": "Vale Adormecido",
     "op": "nevoa",
     "desc": "Uma névoa sonolenta cobre o vale."
    },
    "mania": ""
   }
  },
  "perdidos": {
   "nome": "Mundos Perdidos",
   "guardiao": "Colosso de Oricalco",
   "guardiao_visual": "estátua gigante de metal avermelhado com runas de Atlântida brilhando",
   "combate": {
    "corpo": "golem",
    "detalhes": [
     "runas",
     "elmo",
     "brilho"
    ],
    "golpes": [
     {
      "nome": "Punho de Metal",
      "tipo": "terremoto",
      "desc": "Socos no chão fazem tudo tremer.",
      "dur": 2.5,
      "n": 6
     },
     {
      "nome": "Runas de Atlântida",
      "tipo": "feixe",
      "desc": "Quatro raios de runas em cruz giram.",
      "n": 4,
      "larg": 7,
      "alcance": 150,
      "varre": 1.6,
      "el": "raio"
     },
     {
      "nome": "Reconstrução",
      "tipo": "regenerar",
      "desc": "Absorve as colunas de metal da arena para se consertar. Quebre-as antes.",
      "pct": 0.2,
      "metal": true
     }
    ],
    "fase2": {
     "nome": "Cidade em Anéis",
     "op": "arena",
     "desc": "Anéis de muralha sobem em volta da luta.",
     "mat": "metal"
    },
    "mania": ""
   }
  },
  "elementais": {
   "nome": "Reinos Elementais",
   "guardiao": "O Primordial",
   "guardiao_visual": "entidade de oito braços, cada um de um elemento, núcleo de luz e sombra",
   "combate": {
    "corpo": "espectro",
    "detalhes": [
     "coroa",
     "brilho",
     "chamas",
     "gelo"
    ],
    "golpes": [
     {
      "nome": "Oito Braços",
      "tipo": "leque",
      "desc": "Cada braço dispara um elemento diferente.",
      "n": 16,
      "arco": 6.28,
      "ondas": 2,
      "proj": "multi",
      "el": "multi"
     },
     {
      "nome": "Núcleo de Luz e Sombra",
      "tipo": "feixe",
      "desc": "Dois raios, um de luz e outro de sombra, giram juntos.",
      "n": 2,
      "larg": 8,
      "alcance": 160,
      "varre": 2.6,
      "el": "luz"
     },
     {
      "nome": "Criação",
      "tipo": "muralha",
      "desc": "Cria paredes de elementos diferentes.",
      "forma": "anel",
      "mat": "multi",
      "r": 50
     }
    ],
    "fase2": {
     "nome": "Caos Elemental",
     "op": "caos",
     "desc": "O chão inteiro vira caos elemental."
    },
    "mania": ""
   }
  }
 },
 "universos": [
  {
   "id": "egito",
   "era": "berco",
   "nome": "Duat, Egito",
   "elemento": "terra",
   "inimigos": [
    "Múmias doidonas",
    "Escaravelhos de bronze",
    "Chacais de areia"
   ],
   "mini_chefe": "Sarcófago Andante",
   "chefe": "Apep, Serpente do Caos",
   "reliquia": {
    "nome": "Ankh",
    "efeito": "A equipe revive uma vez nesta run."
   },
   "cenario": "deserto noturno com pirâmides, tochas, e o rio de estrelas do submundo",
   "humor": "Múmias tropeçam nas próprias bandagens e às vezes dançam.",
   "combate": {
    "inimigos": [
     {
      "nome": "Múmias doidonas",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "bote",
      "morte": "desmancha",
      "mania": "danca",
      "detalhes": [
       "bandagens",
       "brilho"
      ]
     },
     {
      "nome": "Escaravelhos de bronze",
      "corpo": "inseto",
      "andar": "corre",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "rola",
      "detalhes": [
       "carapaca",
       "brilho"
      ]
     },
     {
      "nome": "Chacais de areia",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "desmancha",
      "mania": "uiva",
      "detalhes": [
       "orelhas"
      ]
     }
    ],
    "mini": {
     "corpo": "objeto",
     "detalhes": [
      "sarcofago",
      "bandagens"
     ],
     "golpes": [
      {
       "nome": "Tampa Aberta",
       "tipo": "invocar",
       "desc": "Abre a tampa e solta múmias que saem cambaleando.",
       "n": 4,
       "k": 0
      },
      {
       "nome": "Tombo de Pedra",
       "tipo": "salto",
       "desc": "Cai de cara no chão e racha a areia.",
       "r": 26,
       "fissura": 3,
       "solo": "lama"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "serpente",
     "detalhes": [
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Eclipse do Caos",
       "tipo": "escuridao",
       "desc": "Tenta engolir o sol: a arena escurece e só a equipe brilha.",
       "dur": 6
      },
      {
       "nome": "Bote das Areias",
       "tipo": "mergulho",
       "desc": "Mergulha na areia, viaja escondida e irrompe embaixo do jogador.",
       "r": 30,
       "rastro": "lama"
      }
     ],
     "fase2": {
      "nome": "Noite sem Sol",
      "op": "escurecer",
      "desc": "O sol é engolido de vez: a arena fica no escuro até o fim da luta."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 40,
    "rajada": 0.6,
    "veg": "seca",
    "dens": 0.08,
    "part": [
     "poeira"
    ],
    "props": {
     "vaso": 5,
     "rocha": 2,
     "caixote": 1
    },
    "nuvens": false,
    "chao": [
     "rachaduras",
     "pedras",
     "ossos"
    ],
    "redemoinho": true,
    "vaso": [
     "#b8683a",
     "#2a5a8a"
    ],
    "rocha": "areia"
   },
   "arte": {
    "estilo": "ancient Egyptian underworld at night: sandstone, lapis-blue and gold paint, hieroglyph bands",
    "chao": "packed night desert sand with faint wind ripples",
    "marcos": [
     "broken obelisk",
     "half-buried sphinx head",
     "small stepped pyramid block",
     "row of carved columns",
     "statue of a jackal-headed guardian",
     "stone altar with offerings"
    ],
    "luz": "standing bronze brazier with fire",
    "frente": "palm tree trunk with fronds",
    "enfeites": [
     "scarab shell",
     "small bone",
     "pottery shard",
     "lotus flower",
     "papyrus tuft",
     "ankh-shaped pebble",
     "sand-buried brick",
     "star-shaped glint on sand"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.22,
     "lago": 0.12,
     "praca": 0.18,
     "construcao": 0.18
    },
    "chance_ponte": 0.4,
    "lago_solo": "agua",
    "piso": "wind-rippled night desert sand with half-buried sandstone flagstones, small pebbles and dry palm fibers",
    "fundo": "the dark river of the Duat far below: black water reflecting golden stars, faint glowing papyrus",
    "paredao": "layered sandstone shaft wall with carved hieroglyph bands and sand trickling down",
    "praca": "flat sandstone courtyard with a large painted winged sun disk mosaic",
    "lago": "sacred pool with dark blue water, lotus flowers, papyrus and stone steps at the rim",
    "construcao": "small sandstone shrine with two papyrus columns and a winged sun lintel",
    "ponte": "stone slab bridge with small jackal statues at the rail ends",
    "fauna": {
     "ave": "sacred ibis",
     "borboleta": "flying scarab beetle",
     "peixe": "Nile fish",
     "bicho": "small sand lizard"
    }
   },
   "luz": {
    "tom": "#3a3a7a",
    "forca": 0.42,
    "noite": 1
   },
   "objetos": [
    "vaso",
    "rocha",
    "caixote"
   ]
  },
  {
   "id": "grecia",
   "era": "berco",
   "nome": "Santuário dos 12 Signos, Grécia",
   "elemento": "luz",
   "inimigos": [
    "Esqueletos hoplitas",
    "Harpias selvagens",
    "Sátiros"
   ],
   "mini_chefe": "Hidra Jovem",
   "chefe": "Tifão",
   "reliquia": {
    "nome": "Fio de Ariadne",
    "efeito": "Cristais de XP são atraídos de muito mais longe."
   },
   "cenario": "escadaria de mármore com doze templos, um por signo do zodíaco, colunas e oliveiras",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Esqueletos hoplitas",
      "corpo": "humanoide",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "desmonta",
      "mania": "remonta",
      "detalhes": [
       "elmo",
       "lanca",
       "escudo",
       "ossos"
      ]
     },
     {
      "nome": "Harpias selvagens",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "bote",
      "morte": "penas",
      "mania": "rouba",
      "detalhes": [
       "asas",
       "crista"
      ]
     },
     {
      "nome": "Sátiros",
      "corpo": "humanoide",
      "andar": "pula",
      "golpe": "contato",
      "morte": "cai",
      "mania": "danca",
      "detalhes": [
       "chifres",
       "barba",
       "pelo"
      ]
     }
    ],
    "mini": {
     "corpo": "serpente",
     "detalhes": [
      "cabecas",
      "presas"
     ],
     "golpes": [
      {
       "nome": "Três Botes",
       "tipo": "leque",
       "desc": "As três cabeças cospem veneno ao mesmo tempo.",
       "n": 9,
       "arco": 1.1,
       "ondas": 2,
       "proj": "gota",
       "el": "natureza"
      },
      {
       "nome": "Duas por Uma",
       "tipo": "regenerar",
       "desc": "Uma cabeça cortada volta como duas: recupera vida uma vez.",
       "pct": 0.25
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "asas",
      "chifres",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Montanha Arremessada",
       "tipo": "chuva",
       "desc": "Arranca montanhas e arremessa; as rochas ficam na arena.",
       "n": 6,
       "r": 18,
       "proj": "pedra",
       "deixa": "rocha"
      },
      {
       "nome": "Tempestade de Tifão",
       "tipo": "vortice",
       "desc": "Um furacão primordial puxa tudo para perto dele.",
       "r": 110,
       "dur": 4,
       "forca": 60
      }
     ],
     "fase2": {
      "nome": "Fúria Vulcânica",
      "op": "incendiar",
      "desc": "A terra racha e cospe fogo entre os templos."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 32,
    "rajada": 0.3,
    "veg": "capim",
    "dens": 0.25,
    "part": [
     "polen"
    ],
    "props": {
     "vaso": 5,
     "rocha": 1,
     "metal": 1
    },
    "nuvens": true,
    "chao": [
     "lajotas",
     "flores"
    ],
    "vaso": [
     "#c8743a",
     "#1a1210"
    ],
    "metal": "estatua"
   },
   "arte": {
    "estilo": "classical Greek sanctuary: white marble, terracotta, olive green, gold zodiac symbols",
    "chao": "worn white marble flagstones with grass between seams",
    "marcos": [
     "fluted marble column",
     "fallen column drum",
     "small temple pediment",
     "bronze hoplite statue on plinth",
     "olive tree",
     "zodiac stone tablet"
    ],
    "luz": "tripod bronze brazier with fire",
    "frente": "tall broken column",
    "enfeites": [
     "olive leaves",
     "laurel sprig",
     "marble chip",
     "red poppy",
     "small amphora shard",
     "zodiac coin",
     "clover patch",
     "carved stone fragment"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.25,
     "lago": 0.14,
     "praca": 0.18,
     "construcao": 0.16
    },
    "chance_ponte": 0.5,
    "lago_solo": "agua",
    "piso": "worn white marble flagstones with grass, wildflowers and olive leaves in the seams",
    "fundo": "the deep blue Aegean sea seen from high above, with white foam around small rocks",
    "paredao": "white limestone sea cliff with olive roots and wild herbs",
    "praca": "marble floor with a circular zodiac mosaic in gold and blue",
    "lago": "marble basin pool with clear water and a small fountain at the rim",
    "construcao": "small Greek temple with four marble columns and a pediment",
    "ponte": "marble bridge with a low balustrade",
    "fauna": {
     "ave": "seagull",
     "borboleta": "honeybee",
     "peixe": "small sardine",
     "bicho": "tortoise"
    }
   },
   "luz": {
    "tom": "#fff0d0",
    "forca": 0.1,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "rocha",
    "metal"
   ]
  },
  {
   "id": "mesopotamia",
   "era": "berco",
   "nome": "Babilônia, Mesopotâmia",
   "elemento": "ar",
   "inimigos": [
    "Homens-escorpião selvagens",
    "Demônios do vento",
    "Leões alados de pedra"
   ],
   "mini_chefe": "Demônio do Vento Sudoeste",
   "chefe": "Humbaba, Guardião da Floresta de Cedros",
   "reliquia": {
    "nome": "Tabuletas do Destino",
    "efeito": "Cada level up tem 30% de chance de render uma escolha extra."
   },
   "cenario": "zigurates de tijolos azuis, jardins suspensos, portões com leões",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Homens-escorpião selvagens",
      "corpo": "inseto",
      "andar": "corre",
      "golpe": "cuspe",
      "morte": "estilhaca",
      "mania": "",
      "detalhes": [
       "pincas",
       "ferrao",
       "carapaca"
      ]
     },
     {
      "nome": "Demônios do vento",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "rodopia",
      "detalhes": [
       "asas",
       "chifres"
      ]
     },
     {
      "nome": "Leões alados de pedra",
      "corpo": "quadrupede",
      "andar": "caminha",
      "golpe": "salto",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "asas",
       "barba",
       "coroa"
      ]
     }
    ],
    "mini": {
     "corpo": "espectro",
     "detalhes": [
      "asas",
      "garras",
      "chifres"
     ],
     "golpes": [
      {
       "nome": "Vento Pestilento",
       "tipo": "sopro",
       "desc": "Um vento quente e doente sai das asas e empurra tudo.",
       "ang": 0.9,
       "alcance": 110,
       "el": "ar",
       "empurra": true
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "juba",
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Sete Esplendores",
       "tipo": "anel",
       "desc": "Os sete esplendores do guardião se soltam um após o outro.",
       "n": 12,
       "ondas": 7,
       "proj": "estrela",
       "el": "luz"
      },
      {
       "nome": "Floresta de Cedros",
       "tipo": "muralha",
       "desc": "Cedros brotam em volta do jogador e fecham o caminho.",
       "forma": "anel",
       "mat": "arvore",
       "r": 42
      }
     ],
     "fase2": {
      "nome": "Grito da Floresta",
      "op": "floresta",
      "desc": "A floresta de cedros toma a arena."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 55,
    "rajada": 0.7,
    "veg": "seca",
    "dens": 0.14,
    "part": [
     "poeira"
    ],
    "props": {
     "vaso": 4,
     "caixote": 2,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "lajotas",
     "rachaduras"
    ],
    "redemoinho": true,
    "vaso": [
     "#b07a4a",
     "#2a5ab0"
    ]
   },
   "arte": {
    "estilo": "ancient Babylon: blue glazed bricks, mud brick, gold lions, cedar wood",
    "chao": "sun-baked mud brick pavement with sand drifts",
    "marcos": [
     "ziggurat stair corner",
     "blue glazed brick wall with lion relief",
     "lamassu winged bull statue",
     "date palm",
     "cuneiform stele",
     "hanging garden planter with vines"
    ],
    "luz": "clay oil lamp on a pillar",
    "frente": "cedar tree trunk",
    "enfeites": [
     "cuneiform clay tablet",
     "date fruit",
     "blue tile shard",
     "reed tuft",
     "small brick",
     "lion-head coin",
     "sand drift",
     "dry palm leaf"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.22,
     "lago": 0.18,
     "praca": 0.18,
     "construcao": 0.18
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "sun-baked mud brick pavement with sand drifts, reed bits and fallen blue tile shards",
    "fundo": "the Euphrates far below in a deep gorge: brown water and green reed beds",
    "paredao": "mud-brick and earth gorge wall with fallen blue glazed tiles",
    "praca": "blue glazed brick plaza with a golden lion and dragon mosaic",
    "lago": "garden pool with lotus and a brick rim",
    "construcao": "small mud-brick ziggurat shrine with a blue top",
    "ponte": "cedar plank bridge with bronze lion heads",
    "fauna": {
     "ave": "hoopoe bird",
     "borboleta": "dragonfly",
     "peixe": "carp",
     "bicho": "small hedgehog"
    }
   },
   "luz": {
    "tom": "#ffd8a0",
    "forca": 0.16,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "caixote",
    "rocha",
    "arvore"
   ]
  },
  {
   "id": "china",
   "era": "berco",
   "nome": "Montanhas Kunlun, China",
   "elemento": "agua",
   "inimigos": [
    "Jiangshi selvagens",
    "Guerreiros de terracota",
    "Raposas-espírito"
   ],
   "mini_chefe": "Nian, a Fera do Ano Novo",
   "chefe": "O Rei Macaco",
   "reliquia": {
    "nome": "Pêssego da Imortalidade",
    "efeito": "+20% de vida máxima da equipe."
   },
   "cenario": "montanhas flutuantes entre nuvens, pagodes, pontes de bambu",
   "humor": "Nian foge de fogos de artifício.",
   "combate": {
    "inimigos": [
     {
      "nome": "Jiangshi selvagens",
      "corpo": "humanoide",
      "andar": "salta",
      "golpe": "bote",
      "morte": "desmonta",
      "mania": "folego",
      "detalhes": [
       "chapeu",
       "talisma"
      ]
     },
     {
      "nome": "Guerreiros de terracota",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "formacao",
      "detalhes": [
       "elmo",
       "lanca"
      ]
     },
     {
      "nome": "Raposas-espírito",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "ilusao",
      "detalhes": [
       "cauda",
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "quadrupede",
     "detalhes": [
      "chifres",
      "juba",
      "presas"
     ],
     "golpes": [
      {
       "nome": "Investida do Ano Novo",
       "tipo": "investida",
       "desc": "Avança três vezes sem parar.",
       "n": 3,
       "vel": 230
      }
     ],
     "fase2": null,
     "mania": "foge_fogo"
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "cauda",
      "coroa",
      "cajado",
      "pelo"
     ],
     "golpes": [
      {
       "nome": "Bastão que Cresce",
       "tipo": "feixe",
       "desc": "O bastão cresce do tamanho de uma montanha e varre a arena.",
       "larg": 10,
       "alcance": 150,
       "varre": 1.6,
       "el": "terra",
       "quebra": true
      },
      {
       "nome": "Fios de Cabelo",
       "tipo": "clones",
       "desc": "Assopra fios de cabelo que viram cópias dele.",
       "n": 3,
       "dur": 8
      }
     ],
     "fase2": {
      "nome": "Nuvem Cambalhota",
      "op": "nevoa",
      "desc": "Nuvens tomam a arena e ele salta de uma para outra."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 30,
    "rajada": 0.4,
    "veg": "junco",
    "dens": 0.22,
    "part": [
     "folhas"
    ],
    "props": {
     "vaso": 3,
     "caixote": 1,
     "metal": 1,
     "rocha": 1,
     "polvora": 1
    },
    "nuvens": true,
    "chao": [
     "pedras",
     "musgo"
    ],
    "nevoa": "#e8eef4",
    "vaso": [
     "#e8eef6",
     "#2a4fa0"
    ],
    "metal": "sino",
    "rocha": "musgo"
   },
   "arte": {
    "estilo": "Kunlun mountains of Chinese legend: jade green, red lacquer, ink-wash mist, bamboo",
    "chao": "mossy stone path tiles among mountain grass",
    "marcos": [
     "small red pagoda roof on posts",
     "jade-green scholar rock",
     "bamboo cluster",
     "stone guardian lion",
     "moon gate in a wall",
     "pine on a rock"
    ],
    "luz": "red paper lantern on a post",
    "frente": "tall bamboo stalks",
    "enfeites": [
     "bamboo leaf",
     "peach blossom petal",
     "jade pebble",
     "moss clump",
     "old coin with square hole",
     "pine needles",
     "mushroom of immortality",
     "ink-stained stone"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.34,
     "lago": 0.2,
     "praca": 0.14,
     "construcao": 0.14
    },
    "chance_ponte": 0.6,
    "piso": "old stone path slabs of grey-green mountain stone with moss in the joints, scattered red maple and peach petals, tiny ferns, a few cracked slabs, patches of short grass between slabs",
    "fundo": "a sea of soft white clouds seen from very high above, with a few distant green karst peaks poking through and pale blue gaps",
    "paredao": "grey karst limestone cliff face with moss, small pines, hanging roots and ferns",
    "praca": "round stone plaza floor with a yin-yang mosaic in light and dark stone, a ring of carved cloud patterns around it",
    "lago": "round pond with clear turquoise water, lotus pads and pink lotus flowers, a few koi shadows, low mossy stone rim",
    "construcao": "red-lacquered Chinese pavilion with a dark curved tiled roof and golden finial on a square stone base with a short front stair",
    "ponte": "wooden plank bridge with red lacquered rails and small paper lanterns",
    "fauna": {
     "ave": "white red-crowned crane",
     "borboleta": "red and black butterfly",
     "peixe": "orange and white koi fish",
     "bicho": "small green frog"
    }
   },
   "luz": {
    "tom": "#d8f0ff",
    "forca": 0.1,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "caixote",
    "metal",
    "rocha",
    "polvora"
   ]
  },
  {
   "id": "persia",
   "era": "berco",
   "nome": "Shahnameh, Pérsia",
   "elemento": "luz",
   "inimigos": [
    "Divs menores",
    "Leões alados",
    "Serpentes de ombro"
   ],
   "mini_chefe": "Div Branco",
   "chefe": "Zahhak, o Rei-Serpente",
   "reliquia": {
    "nome": "Taça de Jamshid",
    "efeito": "Ao entrar num mapa, a equipe recupera 25% da vida e ganha um escudo de 15%."
   },
   "cenario": "palácios de mosaico azul-turquesa, jardins geométricos, deserto dourado",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Divs menores",
      "corpo": "humanoide",
      "andar": "caminha",
      "golpe": "contato",
      "morte": "puff",
      "mania": "",
      "detalhes": [
       "chifres",
       "presas"
      ]
     },
     {
      "nome": "Leões alados",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "salto",
      "morte": "cai",
      "mania": "",
      "detalhes": [
       "asas",
       "juba"
      ]
     },
     {
      "nome": "Serpentes de ombro",
      "corpo": "serpente",
      "andar": "rasteja",
      "golpe": "bote",
      "morte": "cai",
      "mania": "",
      "detalhes": [
       "presas"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "chifres",
      "pelo",
      "presas"
     ],
     "golpes": [
      {
       "nome": "Cegueira de Mazandaran",
       "tipo": "escuridao",
       "desc": "Uma escuridão mágica cega a equipe.",
       "dur": 4
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "coroa",
      "cabecas",
      "presas"
     ],
     "golpes": [
      {
       "nome": "Serpentes dos Ombros",
       "tipo": "leque",
       "desc": "As duas serpentes dos ombros cospem ao mesmo tempo.",
       "n": 7,
       "arco": 0.8,
       "ondas": 3,
       "duplo": true,
       "proj": "gota",
       "el": "sombra"
      },
      {
       "nome": "Trono de Serpentes",
       "tipo": "invocar",
       "desc": "Serpentes saem das rachaduras do chão.",
       "n": 6,
       "k": 2
      }
     ],
     "fase2": {
      "nome": "Ira de Damavand",
      "op": "arena",
      "desc": "A montanha se fecha em volta da luta.",
      "mat": "rocha"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 35,
    "rajada": 0.3,
    "veg": "capim",
    "dens": 0.18,
    "part": [
     "polen"
    ],
    "props": {
     "vaso": 5,
     "caixote": 1,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "ladrilhos",
     "flores"
    ],
    "vaso": [
     "#3fa8b8",
     "#f2e7c9"
    ]
   },
   "arte": {
    "estilo": "Shahnameh Persia: turquoise mosaic, gold, white plaster, geometric gardens, desert gold",
    "chao": "geometric turquoise and sand mosaic tiles, partly sand-covered",
    "marcos": [
     "arched iwan gateway fragment",
     "turquoise tiled fountain",
     "cypress tree",
     "winged lion relief",
     "carpet stall awning",
     "geometric garden planter"
    ],
    "luz": "brass hanging lantern on a pole",
    "frente": "tall cypress",
    "enfeites": [
     "mosaic tile",
     "rose petal",
     "pomegranate",
     "brass coin",
     "sand drift",
     "feather",
     "small rug fringe",
     "pistachio shells"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.2,
     "praca": 0.2,
     "construcao": 0.16
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "geometric turquoise and sand mosaic tiles partly covered by sand drifts and rose petals",
    "fundo": "a deep mountain gorge far below with a turquoise river and cypress trees",
    "paredao": "rose-gold sandstone cliff with ivy",
    "praca": "courtyard with an eight-pointed star mosaic in turquoise and gold",
    "lago": "garden pool with fountain jets and turquoise tiles",
    "construcao": "small domed pavilion with turquoise tiles",
    "ponte": "stone arch bridge with a tiled parapet",
    "fauna": {
     "ave": "nightingale",
     "borboleta": "peacock butterfly",
     "peixe": "goldfish",
     "bicho": "desert gerbil"
    }
   },
   "luz": {
    "tom": "#ffe0b0",
    "forca": 0.14,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "caixote",
    "rocha"
   ]
  },
  {
   "id": "nordico",
   "era": "reinos",
   "nome": "Ragnarök, Terras Nórdicas",
   "elemento": "agua",
   "inimigos": [
    "Draugr selvagens",
    "Lobos de gelo",
    "Trolls"
   ],
   "mini_chefe": "Troll da Ponte",
   "chefe": "Jörmungandr, a Serpente do Mundo",
   "reliquia": {
    "nome": "Hidromel do Salão dos Heróis",
    "efeito": "Cada abate dá +1% de dano por 10 s (acumula até +30%)."
   },
   "cenario": "fiordes congelados, aurora boreal, ponte de arco-íris quebrada",
   "humor": "Trolls viram pedra se tocados pela luz.",
   "combate": {
    "inimigos": [
     {
      "nome": "Draugr selvagens",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "contato",
      "morte": "derrete",
      "mania": "",
      "detalhes": [
       "elmo",
       "barba",
       "gelo"
      ]
     },
     {
      "nome": "Lobos de gelo",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "uiva",
      "detalhes": [
       "gelo"
      ]
     },
     {
      "nome": "Trolls",
      "corpo": "golem",
      "andar": "caminha",
      "golpe": "salto",
      "morte": "cai",
      "mania": "pedra_luz",
      "detalhes": [
       "presas",
       "pelo"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "presas",
      "pelo",
      "cajado"
     ],
     "golpes": [
      {
       "nome": "Pedágio da Ponte",
       "tipo": "muralha",
       "desc": "Ergue a ponte de pedra e fecha a passagem.",
       "forma": "linha",
       "mat": "rocha",
       "r": 50
      },
      {
       "nome": "Ponte Quebrada",
       "tipo": "salto",
       "desc": "Pula e racha o chão.",
       "r": 28,
       "fissura": 4
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "serpente",
     "detalhes": [
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Anel do Mundo",
       "tipo": "muralha",
       "desc": "Se enrola em volta da arena e aperta o anel.",
       "forma": "anel",
       "mat": "escama",
       "r": 70,
       "aperta": true
      },
      {
       "nome": "Veneno do Ragnarök",
       "tipo": "sopro",
       "desc": "Cospe veneno que deixa o chão lamacento.",
       "ang": 0.8,
       "alcance": 100,
       "el": "natureza",
       "solo": "lama"
      }
     ],
     "fase2": {
      "nome": "Maremoto do Fim",
      "op": "inundar",
      "desc": "O mar invade a arena e congela no frio."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 65,
    "rajada": 0.7,
    "veg": "gelada",
    "dens": 0.2,
    "part": [
     "neve"
    ],
    "props": {
     "gelo": 3,
     "barril": 2,
     "caixote": 2,
     "rocha": 2
    },
    "nuvens": true,
    "chao": [
     "pedras",
     "neve"
    ],
    "rocha": "neve"
   },
   "arte": {
    "estilo": "Norse Ragnarok: frozen fjord, snow, dark wood, iron, aurora teal light",
    "chao": "packed snow over frozen ground with ice patches",
    "marcos": [
     "runestone",
     "longhouse corner with carved dragon post",
     "frozen dead tree",
     "broken rainbow bridge shard (iridescent)",
     "viking ship prow in ice",
     "stone cairn"
    ],
    "luz": "iron fire basket on a pole",
    "frente": "frosted pine trunk",
    "enfeites": [
     "snow clump",
     "rune pebble",
     "icicle shard",
     "pine cone",
     "broken shield piece",
     "wolf track",
     "frozen berry",
     "crow feather"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.15,
     "praca": 0.12,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "packed snow over frozen ground with ice patches, stones and tufts of dry grass",
    "fundo": "the deep blue depths of a glacier crevasse with mist and falling snow",
    "paredao": "blue-white glacier ice wall with a snow lip and icicles",
    "praca": "stone circle floor with a carved world-tree knotwork disk, dusted with snow",
    "lago": "pond of clear dark ice with cracks and trapped bubbles",
    "construcao": "small viking longhouse with a dragon-head gable and turf roof",
    "ponte": "rope and plank bridge with carved runic posts",
    "fauna": {
     "ave": "raven",
     "borboleta": "snow moth",
     "peixe": "arctic char",
     "bicho": "arctic fox"
    }
   },
   "luz": {
    "tom": "#5a8ab0",
    "forca": 0.34,
    "noite": 1
   },
   "objetos": [
    "gelo",
    "barril",
    "caixote",
    "rocha"
   ]
  },
  {
   "id": "celta",
   "era": "reinos",
   "nome": "Terras das Brumas, Celta",
   "elemento": "natureza",
   "inimigos": [
    "Fadas traiçoeiras",
    "Cães negros",
    "Kelpies"
   ],
   "mini_chefe": "Kelpie Ancião",
   "chefe": "Balor do Olho Mortal",
   "reliquia": {
    "nome": "Caldeirão da Abundância",
    "efeito": "Cura total da equipe ao trocar de mapa."
   },
   "cenario": "colinas verdes sob névoa, círculos de pedra, lagos escuros",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Fadas traiçoeiras",
      "corpo": "espectro",
      "andar": "voa",
      "golpe": "cuspe",
      "morte": "puff",
      "mania": "ilusao",
      "detalhes": [
       "asas",
       "brilho"
      ]
     },
     {
      "nome": "Cães negros",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "uiva",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Kelpies",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "derrete",
      "mania": "molhado",
      "detalhes": [
       "juba",
       "folhas"
      ]
     }
    ],
    "mini": {
     "corpo": "quadrupede",
     "detalhes": [
      "juba",
      "folhas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Arrasto para o Lago",
       "tipo": "vortice",
       "desc": "Abre um lago escuro que puxa para o fundo.",
       "r": 70,
       "dur": 3,
       "forca": 45,
       "solo": "agua"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "olho_unico",
      "barba",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Olho Mortal",
       "tipo": "feixe",
       "desc": "A pálpebra se abre devagar e o olhar queima tudo o que toca.",
       "larg": 8,
       "alcance": 170,
       "varre": 1.2,
       "el": "fogo",
       "solo": "cinza",
       "quebra": true
      },
      {
       "nome": "Pisada do Gigante",
       "tipo": "salto",
       "desc": "Salta sobre o jogador e racha as colinas.",
       "r": 34,
       "fissura": 5,
       "deixa": "rocha"
      }
     ],
     "fase2": {
      "nome": "Olhar que Seca a Terra",
      "op": "secar",
      "desc": "Tudo o que o olho viu murcha: a grama vira cinza e a água evapora."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 40,
    "rajada": 0.4,
    "veg": "capim",
    "dens": 0.45,
    "part": [
     "garoa"
    ],
    "props": {
     "feno": 2,
     "barril": 1,
     "caixote": 1,
     "rocha": 3
    },
    "nuvens": true,
    "chao": [
     "flores",
     "pedras",
     "musgo"
    ],
    "nevoa": "#dfe8e4",
    "rocha": "musgo"
   },
   "arte": {
    "estilo": "Celtic misty highlands: emerald grass, grey standing stones, peat brown, silver mist",
    "chao": "soft green turf with peat patches",
    "marcos": [
     "standing stone with spiral carving",
     "stone circle arch (trilithon)",
     "gnarled hawthorn tree",
     "dry stone wall segment",
     "fairy mound with door",
     "celtic cross"
    ],
    "luz": "will-o’-wisp lantern on a stick",
    "frente": "hawthorn trunk with mist",
    "enfeites": [
     "clover",
     "white mushroom ring piece",
     "heather sprig",
     "spiral pebble",
     "foxglove",
     "moss stone",
     "peat clod",
     "silver coin"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.22,
     "lago": 0.22,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.5,
    "lago_solo": "agua",
    "piso": "soft green turf with stepping stones, clover, small daisies and peat patches",
    "fundo": "a misty glen far below with a silver river and green hills",
    "paredao": "dark grey slate cliff with heather and moss",
    "praca": "flat stone floor with a carved triple-spiral disk",
    "lago": "dark peat pool with reeds and water lilies",
    "construcao": "round stone broch tower with a thatched roof",
    "ponte": "old mossy stone clapper bridge",
    "fauna": {
     "ave": "barn owl",
     "borboleta": "firefly",
     "peixe": "trout",
     "bicho": "hare"
    }
   },
   "luz": {
    "tom": "#b8d0c8",
    "forca": 0.22,
    "noite": 0
   },
   "objetos": [
    "rocha",
    "feno",
    "barril",
    "caixote"
   ]
  },
  {
   "id": "tavola",
   "era": "reinos",
   "nome": "Távola Redonda e Avalon",
   "elemento": "luz",
   "inimigos": [
    "Cavaleiros negros",
    "Wyverns",
    "Bruxas do pântano"
   ],
   "mini_chefe": "Cavaleiro Verde",
   "chefe": "Morgana",
   "reliquia": {
    "nome": "Espada na Pedra",
    "efeito": "Com menos de metade da vida, a equipe causa +30% de dano."
   },
   "cenario": "castelo de Camelot em ruínas, lago enevoado de Avalon, macieiras",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Cavaleiros negros",
      "corpo": "humanoide",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "formacao",
      "detalhes": [
       "elmo",
       "escudo",
       "lanca"
      ]
     },
     {
      "nome": "Wyverns",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "cuspe",
      "morte": "cai",
      "mania": "",
      "detalhes": [
       "asas",
       "cauda",
       "presas"
      ]
     },
     {
      "nome": "Bruxas do pântano",
      "corpo": "humanoide",
      "andar": "flutua",
      "golpe": "cuspe",
      "morte": "sapo",
      "mania": "",
      "detalhes": [
       "chapeu",
       "cajado"
      ]
     }
    ],
    "mini": {
     "corpo": "humanoide",
     "detalhes": [
      "elmo",
      "barba",
      "folhas"
     ],
     "golpes": [
      {
       "nome": "Machado Verde",
       "tipo": "investida",
       "desc": "Avança com o machado em arco.",
       "n": 2,
       "vel": 200,
       "rastro": "grama"
      },
      {
       "nome": "Jogo da Decapitação",
       "tipo": "regenerar",
       "desc": "Pega a própria cabeça do chão e continua lutando.",
       "pct": 0.4
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "coroa",
      "capuz",
      "cajado",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Fata Morgana",
       "tipo": "clones",
       "desc": "Miragens dela surgem e atacam junto.",
       "n": 4,
       "dur": 7
      },
      {
       "nome": "Lago Enevoado",
       "tipo": "teleporte",
       "desc": "Some na névoa de Avalon e reaparece perto."
      }
     ],
     "fase2": {
      "nome": "Castelo de Miragem",
      "op": "arena",
      "desc": "Um castelo de cristal ilusório sobe em volta da luta.",
      "mat": "cristal"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 30,
    "rajada": 0.3,
    "veg": "capim",
    "dens": 0.35,
    "part": [
     "petalas"
    ],
    "props": {
     "feno": 2,
     "barril": 2,
     "caixote": 2,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "flores",
     "lajotas"
    ],
    "petala": "#f4d8e0",
    "nevoa": "#e8e4f0",
    "rocha": "musgo"
   },
   "arte": {
    "estilo": "Arthurian Avalon: castle stone, blue and gold banners, apple orchards, lake mist",
    "chao": "cobblestone courtyard edges blending into meadow",
    "marcos": [
     "castle wall corner with banner",
     "sword in stone",
     "apple tree",
     "round stone well",
     "knight statue",
     "wooden market stall"
    ],
    "luz": "iron candle lantern on a post",
    "frente": "banner pole",
    "enfeites": [
     "apple",
     "daisy",
     "cobble chip",
     "horseshoe",
     "broken arrow",
     "chain link",
     "shield crest fragment",
     "clover"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.18,
     "lago": 0.2,
     "praca": 0.2,
     "construcao": 0.2
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "cobblestone courtyard blending into meadow, daisies and fallen apple blossoms",
    "fundo": "the misty lake of Avalon far below: still silver water and a small island",
    "paredao": "castle foundation wall with ivy and moss",
    "praca": "round stone floor mosaic with knightly crests in a ring",
    "lago": "castle fountain pond with water lilies and a stone rim",
    "construcao": "small castle tower with a blue and gold banner",
    "ponte": "wooden drawbridge-style bridge with iron chains",
    "fauna": {
     "ave": "falcon",
     "borboleta": "white butterfly",
     "peixe": "pike",
     "bicho": "rabbit"
    }
   },
   "luz": {
    "tom": "#fff0d8",
    "forca": 0.1,
    "noite": 0
   },
   "objetos": [
    "feno",
    "barril",
    "caixote",
    "rocha",
    "cristal"
   ]
  },
  {
   "id": "japao",
   "era": "reinos",
   "nome": "Parada Noturna dos Yokais, Japão Feudal",
   "elemento": "fogo",
   "inimigos": [
    "Guarda-chuvas assombrados",
    "Lanternas de papel vivas",
    "Onis menores"
   ],
   "mini_chefe": "Oni Vermelho",
   "chefe": "Yamata no Orochi",
   "reliquia": {
    "nome": "Máscara de Oni",
    "efeito": "+25% de dano, mas a equipe recebe 10% a mais de dano."
   },
   "cenario": "vila feudal à noite, pontes vermelhas, lanternas, cerejeiras",
   "humor": "Os guarda-chuvas pulam numa perna só.",
   "combate": {
    "inimigos": [
     {
      "nome": "Guarda-chuvas assombrados",
      "corpo": "objeto",
      "andar": "pula",
      "golpe": "contato",
      "morte": "puff",
      "mania": "",
      "detalhes": [
       "guarda_chuva",
       "olho_unico",
       "lingua",
       "um_pe"
      ]
     },
     {
      "nome": "Lanternas de papel vivas",
      "corpo": "objeto",
      "andar": "flutua",
      "golpe": "cuspe",
      "morte": "chama",
      "mania": "incendeia",
      "detalhes": [
       "lanterna",
       "olho_unico",
       "lingua"
      ]
     },
     {
      "nome": "Onis menores",
      "corpo": "humanoide",
      "andar": "caminha",
      "golpe": "salto",
      "morte": "puff",
      "mania": "",
      "detalhes": [
       "chifres",
       "presas",
       "cajado"
      ]
     }
    ],
    "mini": {
     "corpo": "humanoide",
     "detalhes": [
      "chifres",
      "presas",
      "cajado",
      "pelo"
     ],
     "golpes": [
      {
       "nome": "Kanabō",
       "tipo": "salto",
       "desc": "A clava de ferro desce e racha o chão.",
       "r": 30,
       "fissura": 4
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "serpente",
     "detalhes": [
      "cabecas",
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Oito Cabeças",
       "tipo": "espiral",
       "desc": "As oito cabeças cospem fogo girando.",
       "bracos": 8,
       "dur": 4,
       "proj": "chama",
       "el": "fogo",
       "solo": "fogo"
      },
      {
       "nome": "Oito Vales",
       "tipo": "fissura",
       "desc": "O corpo atravessa oito vales: oito rachaduras correm pelo chão.",
       "n": 8,
       "comp": 120,
       "el": "fogo",
       "solo": "fogo"
      }
     ],
     "fase2": {
      "nome": "Barris de Saquê",
      "op": "saque",
      "desc": "Barris de saquê surgem pela arena. Se o chefe quebrar um, fica bêbado e vulnerável: empurre os barris no caminho dele."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 28,
    "rajada": 0.4,
    "veg": "capim",
    "dens": 0.2,
    "part": [
     "petalas",
     "vagalumes"
    ],
    "props": {
     "barril": 2,
     "polvora": 1,
     "vaso": 2,
     "caixote": 1
    },
    "nuvens": true,
    "chao": [
     "pedras",
     "lajotas"
    ],
    "petala": "#f6c0d0",
    "vaso": [
     "#3a3040",
     "#c8473b"
    ]
   },
   "arte": {
    "estilo": "feudal Japanese yokai night parade: red torii, black lacquer, paper lanterns, cherry blossoms",
    "chao": "raked gravel and dark earth with stepping stones",
    "marcos": [
     "small torii gate",
     "stone toro lantern (unlit)",
     "cherry tree",
     "jizo statue with red bib",
     "shrine bell frame",
     "stacked sake barrels decoration"
    ],
    "luz": "glowing paper chochin lantern on a stand",
    "frente": "torii pillar",
    "enfeites": [
     "cherry petal",
     "fallen fan",
     "rice straw rope piece",
     "geta sandal",
     "small coin",
     "maple leaf",
     "stepping stone",
     "paper charm"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.22,
     "praca": 0.16,
     "construcao": 0.18
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "raked gravel and dark earth with flat stepping stones, cherry petals and moss",
    "fundo": "a deep gorge far below with a rushing river, maple trees, mist and floating lanterns",
    "paredao": "dark volcanic rock cliff with maples and moss",
    "praca": "raked zen gravel circle with a stone fox crest mosaic",
    "lago": "koi pond with stepping stones, water lilies and a small stone lantern on the rim",
    "construcao": "small shrine with a red torii and a shrine bell",
    "ponte": "red arched wooden bridge",
    "fauna": {
     "ave": "crow",
     "borboleta": "firefly",
     "peixe": "koi",
     "bicho": "tanuki"
    }
   },
   "luz": {
    "tom": "#4a3a7a",
    "forca": 0.46,
    "noite": 1
   },
   "objetos": [
    "barril",
    "vaso",
    "polvora",
    "caixote",
    "saque"
   ]
  },
  {
   "id": "eslavo",
   "era": "reinos",
   "nome": "Floresta Eslava",
   "elemento": "natureza",
   "inimigos": [
    "Rusalkas",
    "Espíritos da floresta",
    "Lobos cinzentos"
   ],
   "mini_chefe": "A Casa de Pés de Galinha",
   "chefe": "Koschei, o Imortal",
   "reliquia": {
    "nome": "Ovo de Koschei",
    "efeito": "Uma vez por mapa, um golpe fatal deixa a equipe com 1 de vida."
   },
   "cenario": "floresta de bétulas nevada, isbás de madeira, rios congelados",
   "humor": "A casa da bruxa corre atrás da equipe.",
   "combate": {
    "inimigos": [
     {
      "nome": "Rusalkas",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "derrete",
      "mania": "canto",
      "detalhes": [
       "folhas",
       "brilho"
      ]
     },
     {
      "nome": "Espíritos da floresta",
      "corpo": "planta",
      "andar": "caminha",
      "golpe": "contato",
      "morte": "folhas",
      "mania": "ilusao",
      "detalhes": [
       "chifres",
       "folhas"
      ]
     },
     {
      "nome": "Lobos cinzentos",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "cai",
      "mania": "uiva",
      "detalhes": [
       "pelo"
      ]
     }
    ],
    "mini": {
     "corpo": "objeto",
     "detalhes": [
      "casa",
      "pes_galinha"
     ],
     "golpes": [
      {
       "nome": "Pisoteio de Galinha",
       "tipo": "salto",
       "desc": "A casa dá três pulos em cima da equipe.",
       "r": 24,
       "n": 3
      }
     ],
     "fase2": null,
     "mania": "persegue"
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "ossos",
      "coroa",
      "capuz"
     ],
     "golpes": [
      {
       "nome": "Sopro de Inverno",
       "tipo": "sopro",
       "desc": "Um sopro gelado congela o chão.",
       "ang": 0.9,
       "alcance": 110,
       "el": "agua",
       "solo": "gelo"
      },
      {
       "nome": "Cavalgada dos Ventos",
       "tipo": "investida",
       "desc": "Corre com o vento três vezes.",
       "n": 3,
       "vel": 240
      }
     ],
     "fase2": {
      "nome": "O Carvalho da Morte",
      "op": "carvalho",
      "desc": "A morte do Imortal está num ovo, dentro de um baú, sob um carvalho. Quebre o carvalho e o ovo, ou ele não cai."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 40,
    "rajada": 0.4,
    "veg": "capim",
    "dens": 0.28,
    "part": [
     "neve"
    ],
    "props": {
     "feno": 2,
     "caixote": 2,
     "barril": 1,
     "fruta": 1
    },
    "nuvens": true,
    "chao": [
     "folhas",
     "pedras"
    ],
    "fruta": "abobora",
    "rocha": "neve"
   },
   "arte": {
    "estilo": "Slavic fairy-tale forest: birch white, dark pine, carved wood, embroidered red",
    "chao": "forest floor with moss, birch leaves and snow dust",
    "marcos": [
     "birch tree",
     "carved wooden idol post",
     "log cabin corner",
     "old well with crank",
     "mossy boulder with shrine",
     "fence of sharpened logs"
    ],
    "luz": "wooden lantern on a pole",
    "frente": "birch trunk",
    "enfeites": [
     "birch leaf",
     "red berries",
     "mushroom",
     "pine cone",
     "embroidered cloth scrap",
     "snow patch",
     "acorn",
     "feather"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.22,
     "praca": 0.14,
     "construcao": 0.18
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "forest floor of moss, birch leaves, roots and patches of snow dust",
    "fundo": "a deep misty forest ravine far below with dark pines and a winding stream",
    "paredao": "earth and root wall with birch roots and moss",
    "praca": "wooden plank floor with a carved sun wheel disk",
    "lago": "forest pond with water lilies, reeds and low mist",
    "construcao": "wooden hut with a carved roof and a shingled onion dome",
    "ponte": "log bridge with a carved railing",
    "fauna": {
     "ave": "owl",
     "borboleta": "moth",
     "peixe": "pike",
     "bicho": "hedgehog"
    }
   },
   "luz": {
    "tom": "#c0c8d8",
    "forca": 0.2,
    "noite": 0
   },
   "objetos": [
    "feno",
    "caixote",
    "barril",
    "fruta",
    "arvore",
    "ovo"
   ]
  },
  {
   "id": "mil_noites",
   "era": "reinos",
   "nome": "Mil e Uma Noites",
   "elemento": "fogo",
   "inimigos": [
    "Ladrões do deserto",
    "Ghuls",
    "Escorpiões gigantes"
   ],
   "mini_chefe": "Ghul Ancião",
   "chefe": "O Gigante de Bronze da Cidade de Latão",
   "reliquia": {
    "nome": "Tapete Voador",
    "efeito": "+20% de velocidade de movimento."
   },
   "cenario": "cidade de cúpulas e minaretes ao entardecer, mercados, dunas",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Ladrões do deserto",
      "corpo": "humanoide",
      "andar": "corre",
      "golpe": "bote",
      "morte": "cai",
      "mania": "rouba",
      "detalhes": [
       "chapeu"
      ]
     },
     {
      "nome": "Ghuls",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "contato",
      "morte": "desmancha",
      "mania": "ilusao",
      "detalhes": [
       "presas"
      ]
     },
     {
      "nome": "Escorpiões gigantes",
      "corpo": "inseto",
      "andar": "corre",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "",
      "detalhes": [
       "pincas",
       "ferrao",
       "carapaca"
      ]
     }
    ],
    "mini": {
     "corpo": "humanoide",
     "detalhes": [
      "presas",
      "garras"
     ],
     "golpes": [
      {
       "nome": "Banquete de Areia",
       "tipo": "mergulho",
       "desc": "Afunda na areia e irrompe embaixo do jogador.",
       "r": 26,
       "rastro": "areia"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "lanca",
      "elmo",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Corpo em Brasa",
       "tipo": "onda",
       "desc": "O latão esquenta e solta ondas de calor que incendeiam o chão.",
       "vmax": 110,
       "vel": 90,
       "el": "fogo",
       "solo": "fogo"
      },
      {
       "nome": "Lança de Latão",
       "tipo": "investida",
       "desc": "Carga de lança que atravessa a arena e deixa o chão em brasa.",
       "n": 1,
       "vel": 290,
       "rastro": "fogo"
      }
     ],
     "fase2": {
      "nome": "Cidade de Latão",
      "op": "transmutar",
      "desc": "Tudo vira latão: os objetos viram estátuas de metal que conduzem raio.",
      "mat": "metal"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 45,
    "rajada": 0.6,
    "veg": "seca",
    "dens": 0.08,
    "part": [
     "poeira"
    ],
    "props": {
     "vaso": 5,
     "caixote": 2,
     "barril": 1
    },
    "nuvens": true,
    "chao": [
     "ladrilhos",
     "rachaduras"
    ],
    "redemoinho": true,
    "vaso": [
     "#c89a4a",
     "#7a2a5a"
    ]
   },
   "arte": {
    "estilo": "Thousand and One Nights: golden sand, brass, indigo night, onion domes, silk",
    "chao": "golden desert sand with patterned tile remnants",
    "marcos": [
     "onion-dome kiosk",
     "brass oil lamp pedestal",
     "palm tree",
     "bazaar stall with rugs",
     "broken marble arch",
     "treasure chest pile"
    ],
    "luz": "large brass oil lamp with flame",
    "frente": "palm trunk",
    "enfeites": [
     "gold coin",
     "silk scrap",
     "date",
     "tile shard",
     "small gem",
     "sand ripple",
     "feather",
     "broken jug handle"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.18,
     "praca": 0.18,
     "construcao": 0.18
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "golden desert sand with patterned tile remnants, carpet edges and scattered coins",
    "fundo": "a deep desert canyon far below with an oasis stream and palm trees",
    "paredao": "golden sandstone canyon wall with carved arches",
    "praca": "patterned tile courtyard with an eight-pointed star fountain mosaic",
    "lago": "oasis pool with turquoise water and palm reflections",
    "construcao": "small onion-domed kiosk with a brass lamp",
    "ponte": "rope bridge with colorful silk ribbons",
    "fauna": {
     "ave": "falcon",
     "borboleta": "golden moth",
     "peixe": "small fish",
     "bicho": "fennec fox"
    }
   },
   "luz": {
    "tom": "#3a3a8a",
    "forca": 0.44,
    "noite": 1
   },
   "objetos": [
    "vaso",
    "caixote",
    "barril"
   ]
  },
  {
   "id": "amazonia",
   "era": "novo_mundo",
   "nome": "Amazônia Encantada",
   "elemento": "natureza",
   "inimigos": [
    "Onças espectrais",
    "Cobras-cipó",
    "Piranhas saltadoras"
   ],
   "mini_chefe": "Cobra Grande",
   "chefe": "Mapinguari",
   "reliquia": {
    "nome": "Muiraquitã",
    "efeito": "Cartas de Talismã aparecem bem mais nos level ups."
   },
   "cenario": "rio largo com vitórias-régias, árvores gigantes, névoa dourada",
   "humor": "O Saci selvagem rouba seus cristais e sai rindo.",
   "combate": {
    "inimigos": [
     {
      "nome": "Onças espectrais",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "salto",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "manchas",
       "brilho"
      ]
     },
     {
      "nome": "Cobras-cipó",
      "corpo": "serpente",
      "andar": "rasteja",
      "golpe": "bote",
      "morte": "folhas",
      "mania": "camuflagem",
      "detalhes": [
       "folhas"
      ]
     },
     {
      "nome": "Piranhas saltadoras",
      "corpo": "aquatico",
      "andar": "pula",
      "golpe": "salto",
      "morte": "cai",
      "mania": "molhado",
      "detalhes": [
       "presas",
       "barbatana"
      ]
     }
    ],
    "especial": {
     "nome": "Saci selvagem",
     "corpo": "humanoide",
     "andar": "pula",
     "golpe": "contato",
     "morte": "puff",
     "mania": "rouba",
     "detalhes": [
      "gorro",
      "um_pe"
     ],
     "intervalo": 45
    },
    "mini": {
     "corpo": "serpente",
     "detalhes": [
      "brilho",
      "presas"
     ],
     "golpes": [
      {
       "nome": "Boiúna",
       "tipo": "mergulho",
       "desc": "Some no rio que ela mesma abre e emerge embaixo do jogador.",
       "r": 32,
       "rastro": "agua"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "olho_unico",
      "pelo",
      "garras"
     ],
     "golpes": [
      {
       "nome": "Grito Paralisante",
       "tipo": "onda",
       "desc": "Um grito que deixa quem é atingido lento.",
       "vmax": 120,
       "vel": 110,
       "atordoa": true,
       "el": "natureza"
      },
      {
       "nome": "Derruba Árvores",
       "tipo": "investida",
       "desc": "Atravessa a mata derrubando árvores; os troncos rolam.",
       "n": 2,
       "vel": 220,
       "tronco": true
      }
     ],
     "fase2": {
      "nome": "A Mata Fecha",
      "op": "floresta",
      "desc": "A mata cresce e fecha a arena."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 18,
    "rajada": 0.4,
    "veg": "capim",
    "dens": 0.5,
    "part": [
     "folhas",
     "vagalumes"
    ],
    "props": {
     "fruta": 3,
     "caixote": 1,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "folhas",
     "raizes",
     "flores"
    ],
    "fruta": "coco",
    "nevoa": "#f2e0a0",
    "rocha": "musgo"
   },
   "arte": {
    "estilo": "enchanted Amazon: deep greens, giant leaves, river browns, bioluminescent accents, golden mist",
    "chao": "rich forest soil with roots and leaf litter",
    "marcos": [
     "kapok tree buttress roots",
     "giant fern",
     "ancient carved stone face",
     "waterfall rock",
     "hanging lianas",
     "river canoe on bank"
    ],
    "luz": "firefly cluster in a hollow log",
    "frente": "giant leaf plant",
    "enfeites": [
     "fallen leaf",
     "orchid",
     "root loop",
     "seed pod",
     "colorful feather",
     "glowing mushroom",
     "pebble",
     "berry cluster"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.25,
     "praca": 0.12,
     "construcao": 0.15
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "rich forest soil with roots, leaf litter, moss and fallen flowers",
    "fundo": "a wide brown jungle river far below with canopy and mist",
    "paredao": "red earth riverbank cliff with roots and ferns",
    "praca": "ancient carved stone floor with a jaguar sun motif overgrown by moss",
    "lago": "black-water pond with giant round water lily pads",
    "construcao": "stilt hut with a palm-thatch roof",
    "ponte": "liana and plank hanging bridge",
    "fauna": {
     "ave": "macaw",
     "borboleta": "blue morpho butterfly",
     "peixe": "piranha",
     "bicho": "poison dart frog"
    }
   },
   "luz": {
    "tom": "#d0f0a0",
    "forca": 0.16,
    "noite": 0
   },
   "objetos": [
    "fruta",
    "caixote",
    "rocha",
    "arvore",
    "tronco"
   ]
  },
  {
   "id": "xibalba",
   "era": "novo_mundo",
   "nome": "Xibalba, Submundo Maia",
   "elemento": "sombra",
   "inimigos": [
    "Esqueletos maias",
    "Morcegos-navalha",
    "Corujas mensageiras"
   ],
   "mini_chefe": "Senhor do Jogo de Bola",
   "chefe": "Camazotz, o Morcego da Morte",
   "reliquia": {
    "nome": "Bola de Borracha Sagrada",
    "efeito": "Projéteis ricocheteiam uma vez."
   },
   "cenario": "cavernas com rios escuros, pirâmides invertidas, campo do jogo de bola",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Esqueletos maias",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "contato",
      "morte": "desmonta",
      "mania": "remonta",
      "detalhes": [
       "ossos",
       "coroa"
      ]
     },
     {
      "nome": "Morcegos-navalha",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "bote",
      "morte": "cai",
      "mania": "enxame",
      "detalhes": [
       "asas",
       "presas"
      ]
     },
     {
      "nome": "Corujas mensageiras",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "cuspe",
      "morte": "penas",
      "mania": "pisca",
      "detalhes": [
       "asas",
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "humanoide",
     "detalhes": [
      "ossos",
      "coroa",
      "mascara"
     ],
     "golpes": [
      {
       "nome": "Bola de Borracha",
       "tipo": "bola",
       "desc": "Lança a bola do jogo sagrado, que quica pela arena.",
       "n": 1,
       "r": 6,
       "dur": 9,
       "el": "terra"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "ave",
     "detalhes": [
      "asas",
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Casa dos Morcegos",
       "tipo": "invocar",
       "desc": "Uma nuvem de morcegos sai das asas.",
       "n": 8,
       "k": 1
      },
      {
       "nome": "Rasante Decapitador",
       "tipo": "investida",
       "desc": "Rasantes rápidos de um lado ao outro.",
       "n": 3,
       "vel": 300,
       "voo": true
      }
     ],
     "fase2": {
      "nome": "Noite de Xibalba",
      "op": "escurecer",
      "desc": "A caverna apaga."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 10,
    "rajada": 0.3,
    "veg": "cogumelo",
    "dens": 0.2,
    "part": [
     "esporos",
     "vagalumes"
    ],
    "props": {
     "vaso": 3,
     "rocha": 3
    },
    "nevoa": "#7a5aa8",
    "chao": [
     "ossos",
     "rachaduras"
    ],
    "cogu": "#3fd0c0",
    "nuvens": false,
    "caverna": true,
    "vaso": [
     "#6a6a5a",
     "#3fd0c0"
    ]
   },
   "arte": {
    "estilo": "Maya underworld: dark limestone, jade, bone white, cinnabar red, glowing teal fungi",
    "chao": "dark cave limestone with bone dust",
    "marcos": [
     "carved Maya stele",
     "skull rack (tzompantli) low wall",
     "ballcourt ring stone",
     "stone stair",
     "jade-incrusted altar",
     "stalagmite"
    ],
    "luz": "copal incense burner with smoke",
    "frente": "stalactite column",
    "enfeites": [
     "bone",
     "skull",
     "jade bead",
     "obsidian chip",
     "cinnabar stain",
     "teal glowing fungus",
     "bat dropping pile",
     "carved glyph stone"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.18,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "dark cave limestone with bone dust, cracks and glowing fungi spots",
    "fundo": "a bottomless cave pit far below with a faint teal underground river and flying bats",
    "paredao": "dark limestone cave wall with stalactites and teal glowing fungi",
    "praca": "Maya stone floor with a carved calendar wheel",
    "lago": "underground cenote pool of glowing blue water",
    "construcao": "small Maya temple shrine with a stepped base and skull carvings",
    "ponte": "stone causeway bridge with skull carvings",
    "fauna": {
     "ave": "vampire bat",
     "borboleta": "glowing moth",
     "peixe": "blind cave fish",
     "bicho": "cave cricket"
    }
   },
   "luz": {
    "tom": "#2a3a5a",
    "forca": 0.52,
    "noite": 1
   },
   "objetos": [
    "vaso",
    "rocha"
   ]
  },
  {
   "id": "tenochtitlan",
   "era": "novo_mundo",
   "nome": "Tenochtitlán",
   "elemento": "luz",
   "inimigos": [
    "Guerreiros-jaguar espectrais",
    "Guerreiros-águia",
    "Ahuízotls selvagens"
   ],
   "mini_chefe": "Tzitzimitl",
   "chefe": "Quetzalcoatl",
   "reliquia": {
    "nome": "Pedra do Sol",
    "efeito": "Habilidades recarregam 15% mais rápido."
   },
   "cenario": "cidade sobre o lago, canais, pirâmides com escadarias, jardins flutuantes",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Guerreiros-jaguar espectrais",
      "corpo": "humanoide",
      "andar": "corre",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "capuz",
       "manchas"
      ]
     },
     {
      "nome": "Guerreiros-águia",
      "corpo": "humanoide",
      "andar": "corre",
      "golpe": "salto",
      "morte": "penas",
      "mania": "",
      "detalhes": [
       "asas",
       "crista"
      ]
     },
     {
      "nome": "Ahuízotls selvagens",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "derrete",
      "mania": "molhado",
      "detalhes": [
       "cauda"
      ]
     }
    ],
    "mini": {
     "corpo": "espectro",
     "detalhes": [
      "ossos",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Estrelas Cadentes",
       "tipo": "chuva",
       "desc": "Estrelas caem tentando apagar o sol.",
       "n": 7,
       "r": 14,
       "proj": "estrela",
       "el": "luz",
       "solo": "luz"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "serpente",
     "detalhes": [
      "asas",
      "crista",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Vento da Serpente Emplumada",
       "tipo": "onda",
       "desc": "Uma onda de vento que empurra tudo e limpa a névoa.",
       "vmax": 130,
       "vel": 130,
       "empurra": true,
       "el": "ar"
      },
      {
       "nome": "Estrela da Manhã",
       "tipo": "chuva",
       "desc": "A estrela da manhã cai em raios que consagram o chão.",
       "n": 8,
       "r": 16,
       "proj": "estrela",
       "el": "luz",
       "solo": "luz"
      }
     ],
     "fase2": {
      "nome": "Lago de Texcoco",
      "op": "inundar",
      "desc": "O lago sobe e a cidade vira canais."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 28,
    "rajada": 0.3,
    "veg": "junco",
    "dens": 0.28,
    "part": [
     "polen"
    ],
    "props": {
     "vaso": 4,
     "fruta": 1,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "lajotas",
     "flores"
    ],
    "fruta": "abobora",
    "vaso": [
     "#c86a3a",
     "#2a8a7a"
    ]
   },
   "arte": {
    "estilo": "Aztec lake city: painted stone, turquoise, red ochre, feathers, canals with reeds",
    "chao": "plastered stone plaza with canal edges",
    "marcos": [
     "small pyramid temple stair",
     "feathered serpent head sculpture",
     "chinampa garden bed",
     "canoe with flowers",
     "sun stone fragment",
     "jaguar statue"
    ],
    "luz": "fire bowl on a pedestal",
    "frente": "reed bundle",
    "enfeites": [
     "marigold",
     "feather",
     "maize cob",
     "obsidian blade chip",
     "turquoise bead",
     "cacao pod",
     "painted tile",
     "reed tuft"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.28,
     "lago": 0.2,
     "praca": 0.18,
     "construcao": 0.16
    },
    "chance_ponte": 0.8,
    "lago_solo": "agua",
    "piso": "plastered stone plaza tiles with marigold petals, painted marks and grass at the edges",
    "fundo": "the deep blue water of a great lake far below with floating flowers",
    "paredao": "plastered stone canal wall with painted red bands and moss",
    "praca": "plaza floor with a carved sun stone disk",
    "lago": "garden pond with reeds and flowers",
    "construcao": "small stepped temple with a red shrine on top",
    "ponte": "wooden canal bridge with painted posts",
    "fauna": {
     "ave": "eagle",
     "borboleta": "monarch butterfly",
     "peixe": "axolotl",
     "bicho": "small iguana"
    }
   },
   "luz": {
    "tom": "#ffe0a0",
    "forca": 0.12,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "fruta",
    "rocha"
   ]
  },
  {
   "id": "andes",
   "era": "novo_mundo",
   "nome": "Cidade nas Nuvens, Andes",
   "elemento": "terra",
   "inimigos": [
    "Guerreiros de pedra",
    "Condores",
    "Lhamas furiosas"
   ],
   "mini_chefe": "Condor Gigante",
   "chefe": "Gigante de Tiwanaku",
   "reliquia": {
    "nome": "Quipu",
    "efeito": "+20% de XP."
   },
   "cenario": "terraços nas montanhas, pedras encaixadas, névoa",
   "humor": "As lhamas cospem nos inimigos também.",
   "combate": {
    "inimigos": [
     {
      "nome": "Guerreiros de pedra",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "contato",
      "morte": "estilhaca",
      "mania": "pururauca",
      "detalhes": [
       "elmo",
       "runas"
      ]
     },
     {
      "nome": "Condores",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "salto",
      "morte": "penas",
      "mania": "",
      "detalhes": [
       "asas",
       "crista"
      ]
     },
     {
      "nome": "Lhamas furiosas",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "cuspe",
      "morte": "cai",
      "mania": "cospe_aliado",
      "detalhes": [
       "orelhas",
       "pelo"
      ]
     }
    ],
    "mini": {
     "corpo": "ave",
     "detalhes": [
      "asas",
      "crista",
      "garras"
     ],
     "golpes": [
      {
       "nome": "Corrente de Ar",
       "tipo": "sopro",
       "desc": "As asas gigantes empurram tudo.",
       "ang": 1.1,
       "alcance": 120,
       "el": "ar",
       "empurra": true
      },
      {
       "nome": "Mergulho do Condor",
       "tipo": "investida",
       "desc": "Mergulha do céu em linha.",
       "n": 2,
       "vel": 280,
       "voo": true
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "coroa",
      "runas"
     ],
     "golpes": [
      {
       "nome": "Muralha Encaixada",
       "tipo": "muralha",
       "desc": "Pedras perfeitamente encaixadas prendem o jogador.",
       "forma": "prisao",
       "mat": "rocha",
       "r": 34
      },
      {
       "nome": "Portal do Sol",
       "tipo": "feixe",
       "desc": "O portal do sol dispara um raio dourado.",
       "larg": 9,
       "alcance": 170,
       "varre": 0.9,
       "el": "luz",
       "solo": "luz"
      }
     ],
     "fase2": {
      "nome": "Terraços",
      "op": "arena",
      "desc": "Terraços de pedra sobem em volta da luta.",
      "mat": "rocha"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 70,
    "rajada": 0.6,
    "veg": "seca",
    "dens": 0.25,
    "part": [
     "poeira"
    ],
    "props": {
     "rocha": 4,
     "vaso": 2
    },
    "nuvens": true,
    "chao": [
     "lajotas",
     "pedras"
    ],
    "nevoa": "#eef2f4",
    "vaso": [
     "#a85a3a",
     "#f2e7c9"
    ]
   },
   "arte": {
    "estilo": "Inca Andes: fitted grey stone, terraces, high-altitude grass, woven textiles colors",
    "chao": "rocky highland soil with ichu grass tufts",
    "marcos": [
     "perfectly fitted stone wall",
     "terrace edge",
     "Gate of the Sun fragment",
     "condor carved stone",
     "stone storehouse",
     "quipu post"
    ],
    "luz": "stone brazier",
    "frente": "terrace wall pillar",
    "enfeites": [
     "ichu grass",
     "potato",
     "textile scrap",
     "quipu knot cord",
     "stone chip",
     "llama track",
     "condor feather",
     "small gold figure"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.32,
     "lago": 0.15,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "rocky highland soil with ichu grass tufts, flat stones and small flowers",
    "fundo": "a dizzying mountain gorge far below with a white river, clouds and green terraces",
    "paredao": "grey granite cliff with a grass lip and terrace edges",
    "praca": "fitted stone plaza with a carved sun disk",
    "lago": "high altitude lagoon with deep blue water and reeds",
    "construcao": "small stone house with a thatched roof and a trapezoid door",
    "ponte": "woven grass rope bridge",
    "fauna": {
     "ave": "condor",
     "borboleta": "yellow butterfly",
     "peixe": "trout",
     "bicho": "vizcacha"
    }
   },
   "luz": {
    "tom": "#e0f0ff",
    "forca": 0.08,
    "noite": 0
   },
   "objetos": [
    "rocha",
    "vaso"
   ]
  },
  {
   "id": "polinesia",
   "era": "novo_mundo",
   "nome": "Ilhas do Fogo, Polinésia",
   "elemento": "fogo",
   "inimigos": [
    "Tubarões de recife",
    "Guerreiros de lava",
    "Caranguejos-coco"
   ],
   "mini_chefe": "Enguia Gigante",
   "chefe": "Te Wheke, o Polvo Gigante",
   "reliquia": {
    "nome": "Anzol Mágico",
    "efeito": "Puxa todos os cristais da tela a cada 30 s."
   },
   "cenario": "ilhas vulcânicas, recifes de coral, lava encontrando o mar",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Tubarões de recife",
      "corpo": "aquatico",
      "andar": "corre",
      "golpe": "bote",
      "morte": "cai",
      "mania": "molhado",
      "detalhes": [
       "barbatana",
       "presas"
      ]
     },
     {
      "nome": "Guerreiros de lava",
      "corpo": "golem",
      "andar": "caminha",
      "golpe": "contato",
      "morte": "derrete",
      "mania": "incendeia",
      "detalhes": [
       "chamas"
      ]
     },
     {
      "nome": "Caranguejos-coco",
      "corpo": "inseto",
      "andar": "lateral",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "coco",
      "detalhes": [
       "pincas",
       "carapaca"
      ]
     }
    ],
    "mini": {
     "corpo": "aquatico",
     "detalhes": [
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Descarga",
       "tipo": "anel",
       "desc": "Um choque em anéis.",
       "n": 14,
       "ondas": 2,
       "proj": "raio",
       "el": "raio"
      },
      {
       "nome": "Mergulho Elétrico",
       "tipo": "mergulho",
       "desc": "Some na água e surge embaixo do jogador.",
       "r": 26,
       "rastro": "agua"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "bolha",
     "detalhes": [
      "tentaculos",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Oito Tentáculos",
       "tipo": "tentaculos",
       "desc": "Tentáculos brotam do chão embaixo do jogador, um após o outro.",
       "n": 8,
       "r": 14,
       "intervalo": 0.45
      },
      {
       "nome": "Nuvem de Tinta",
       "tipo": "sopro",
       "desc": "Cospe tinta que mancha o chão de sombra.",
       "ang": 1.0,
       "alcance": 100,
       "el": "sombra",
       "solo": "sombra"
      }
     ],
     "fase2": {
      "nome": "Lava Encontra o Mar",
      "op": "inundar",
      "desc": "O mar invade e a lava ferve: a água vira vapor.",
      "vapor": true
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 50,
    "rajada": 0.4,
    "veg": "capim",
    "dens": 0.25,
    "part": [
     "brasas",
     "cinzas"
    ],
    "props": {
     "fruta": 3,
     "caixote": 1,
     "rocha": 2
    },
    "nuvens": true,
    "chao": [
     "conchas",
     "pedras"
    ],
    "fruta": "coco",
    "rocha": "obsidiana"
   },
   "arte": {
    "estilo": "Polynesian volcano islands: black lava rock, turquoise sea, palm green, red hibiscus, carved wood",
    "chao": "black volcanic sand with coral bits",
    "marcos": [
     "carved tiki statue",
     "outrigger canoe",
     "palm tree",
     "lava rock formation",
     "thatched hut corner",
     "coral reef rock"
    ],
    "luz": "tiki torch",
    "frente": "palm trunk",
    "enfeites": [
     "shell",
     "hibiscus flower",
     "coconut husk",
     "coral piece",
     "lava pebble",
     "fish bone",
     "pearl",
     "sea glass"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.25,
     "lago": 0.2,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "black volcanic sand with coral fragments, shells and small plants",
    "fundo": "glowing orange lava far below with dark crust plates and heat haze",
    "paredao": "black basalt cliff with ferns on top and glowing cracks",
    "praca": "black stone platform with a carved tiki pattern ring",
    "lago": "turquoise tide pool with coral and sea urchins",
    "construcao": "thatched hut with carved posts",
    "ponte": "bamboo bridge lashed with coconut rope",
    "fauna": {
     "ave": "frigatebird",
     "borboleta": "butterfly",
     "peixe": "reef fish",
     "bicho": "hermit crab"
    }
   },
   "luz": {
    "tom": "#ffc890",
    "forca": 0.18,
    "noite": 0
   },
   "objetos": [
    "fruta",
    "rocha",
    "caixote"
   ]
  },
  {
   "id": "cabo_tormentas",
   "era": "navegacoes",
   "nome": "Cabo das Tormentas",
   "elemento": "ar",
   "inimigos": [
    "Marinheiros fantasmas",
    "Aves de tempestade",
    "Ondas vivas"
   ],
   "mini_chefe": "Nau Fantasma",
   "chefe": "Adamastor",
   "reliquia": {
    "nome": "Astrolábio",
    "efeito": "+1 portal para escolher ao fim de cada mapa."
   },
   "cenario": "cabo rochoso sob tempestade, naus antigas, relâmpagos no mar",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Marinheiros fantasmas",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "chapeu"
      ]
     },
     {
      "nome": "Aves de tempestade",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "bote",
      "morte": "penas",
      "mania": "enxame",
      "detalhes": [
       "asas"
      ]
     },
     {
      "nome": "Ondas vivas",
      "corpo": "bolha",
      "andar": "rasteja",
      "golpe": "contato",
      "morte": "estoura",
      "mania": "molhado",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "objeto",
     "detalhes": [
      "nau"
     ],
     "golpes": [
      {
       "nome": "Bordada",
       "tipo": "leque",
       "desc": "Os canhões dos dois lados disparam.",
       "n": 10,
       "arco": 0.6,
       "ondas": 2,
       "duplo": true,
       "proj": "bala",
       "el": "sombra",
       "quebra": true
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "barba",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Profecia das Tormentas",
       "tipo": "tempestade",
       "desc": "Anuncia a tormenta: relâmpagos caem em sequência.",
       "n": 6,
       "intervalo": 0.5,
       "r": 22
      },
      {
       "nome": "Rochedo Arremessado",
       "tipo": "chuva",
       "desc": "Arremessa pedaços do cabo; as rochas ficam.",
       "n": 5,
       "r": 18,
       "proj": "pedra",
       "deixa": "rocha"
      }
     ],
     "fase2": {
      "nome": "Cabo Petrificado",
      "op": "arena",
      "desc": "O gigante vira o próprio cabo: rochedos sobem em volta.",
      "mat": "rocha"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 110,
    "rajada": 0.9,
    "veg": "capim",
    "dens": 0.15,
    "part": [
     "chuva"
    ],
    "props": {
     "barril": 3,
     "polvora": 1,
     "caixote": 2,
     "rocha": 2
    },
    "nuvens": true,
    "chao": [
     "pedras",
     "conchas"
    ],
    "relampago": true,
    "nuvensEscuras": true
   },
   "arte": {
    "estilo": "storm cape of the Age of Sail: wet dark rocks, sea spray, wreck wood, stormy grey-green",
    "chao": "wet rocky shore with puddles",
    "marcos": [
     "sharp sea stack rock",
     "ship wreck hull piece",
     "stone padrão monument cross",
     "lighthouse base",
     "anchor in rocks",
     "kelp-covered boulder"
    ],
    "luz": "storm lantern on a post",
    "frente": "broken mast",
    "enfeites": [
     "shell",
     "rope coil",
     "kelp",
     "puddle",
     "wet plank",
     "sea foam",
     "crab shell",
     "barnacle rock"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.18,
     "praca": 0.14,
     "construcao": 0.14
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "wet rocky shore with puddles, shells, kelp and wooden debris",
    "fundo": "a stormy dark green sea far below with white foam and spray",
    "paredao": "wet dark rock cliff with kelp and barnacles",
    "praca": "ship deck plank floor with a compass rose inlay",
    "lago": "rock tide pool with kelp and anemones",
    "construcao": "stone pillar monument with a cross on top",
    "ponte": "broken ship mast laid as a bridge, with rope",
    "fauna": {
     "ave": "albatross",
     "borboleta": "storm petrel",
     "peixe": "sardine",
     "bicho": "crab"
    }
   },
   "luz": {
    "tom": "#7a8a9a",
    "forca": 0.36,
    "noite": 0
   },
   "objetos": [
    "barril",
    "caixote",
    "rocha",
    "polvora"
   ]
  },
  {
   "id": "caribe",
   "era": "navegacoes",
   "nome": "Caribe Amaldiçoado",
   "elemento": "sombra",
   "inimigos": [
    "Piratas fantasmas",
    "Caranguejos zumbis",
    "Papagaios encrenqueiros"
   ],
   "mini_chefe": "Capitão Caveira",
   "chefe": "O Holandês Voador",
   "reliquia": {
    "nome": "Mapa do Tesouro",
    "efeito": "+40% de Essência ao fim da run."
   },
   "cenario": "ilhas tropicais com névoa verde, naufrágios, baús",
   "humor": "Os papagaios xingam a equipe.",
   "combate": {
    "inimigos": [
     {
      "nome": "Piratas fantasmas",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "cuspe",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "chapeu",
       "tapa_olho"
      ]
     },
     {
      "nome": "Caranguejos zumbis",
      "corpo": "inseto",
      "andar": "lateral",
      "golpe": "bote",
      "morte": "desmonta",
      "mania": "",
      "detalhes": [
       "pincas",
       "carapaca"
      ]
     },
     {
      "nome": "Papagaios encrenqueiros",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "bote",
      "morte": "penas",
      "mania": "xinga",
      "detalhes": [
       "crista",
       "asas"
      ]
     }
    ],
    "mini": {
     "corpo": "humanoide",
     "detalhes": [
      "ossos",
      "chapeu",
      "tapa_olho"
     ],
     "golpes": [
      {
       "nome": "Barril de Pólvora",
       "tipo": "chuva",
       "desc": "Arremessa barris com o pavio aceso.",
       "n": 3,
       "r": 12,
       "proj": "barril",
       "deixa": "polvora_acesa"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "objeto",
     "detalhes": [
      "nau",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Bordada Fantasma",
       "tipo": "leque",
       "desc": "Os canhões fantasmas disparam dos dois lados e quebram o que acertam.",
       "n": 12,
       "arco": 0.7,
       "ondas": 2,
       "duplo": true,
       "proj": "bala",
       "el": "sombra",
       "quebra": true
      },
      {
       "nome": "Névoa Maldita",
       "tipo": "teleporte",
       "desc": "O navio some na névoa e reaparece."
      }
     ],
     "fase2": {
      "nome": "Naufrágio",
      "op": "naufragio",
      "desc": "Destroços de navios naufragados caem pela arena."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 45,
    "rajada": 0.3,
    "veg": "capim",
    "dens": 0.2,
    "part": [
     "vagalumes"
    ],
    "props": {
     "polvora": 2,
     "barril": 3,
     "caixote": 3,
     "fruta": 1
    },
    "nevoa": "#7ad09a",
    "chao": [
     "conchas",
     "ossos"
    ],
    "fruta": "coco"
   },
   "arte": {
    "estilo": "cursed Caribbean: moonlit sand, purple night, ghost green fog, pirate wood and gold",
    "chao": "moonlit beach sand with wet streaks",
    "marcos": [
     "pirate shipwreck bow",
     "treasure chest with gold",
     "palm tree",
     "skull rock",
     "cannon",
     "jolly roger flag post"
    ],
    "luz": "ghost-green lantern on a pole",
    "frente": "palm trunk",
    "enfeites": [
     "gold doubloon",
     "shell",
     "bone",
     "rope",
     "bottle with message",
     "starfish",
     "sand dollar",
     "coconut"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.25,
     "lago": 0.2,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "moonlit beach sand with wet streaks, shells, coins and footprints",
    "fundo": "a moonlit turquoise shallow sea far below with coral and a sunken ship shadow",
    "paredao": "pale limestone sea cliff with palm roots",
    "praca": "ship deck floor with a skull and crossed bones inlay",
    "lago": "moonlit lagoon with mangrove roots",
    "construcao": "small pirate shack on stilts",
    "ponte": "rope bridge made of ship planks",
    "fauna": {
     "ave": "parrot",
     "borboleta": "moth",
     "peixe": "flying fish",
     "bicho": "crab"
    }
   },
   "luz": {
    "tom": "#3a4a8a",
    "forca": 0.46,
    "noite": 1
   },
   "objetos": [
    "barril",
    "caixote",
    "polvora",
    "fruta"
   ]
  },
  {
   "id": "mar_profundo",
   "era": "navegacoes",
   "nome": "Mar Profundo",
   "elemento": "agua",
   "inimigos": [
    "Águas-vivas abissais",
    "Tubarões-lanterna",
    "Sereias sombrias"
   ],
   "mini_chefe": "Polvo Abissal",
   "chefe": "Caríbdis, o Redemoinho",
   "reliquia": {
    "nome": "Concha das Marés",
    "efeito": "A cada 10 s, uma onda empurra e fere os inimigos em volta."
   },
   "cenario": "fundo do mar bioluminescente, ruínas de coral, bolhas",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Águas-vivas abissais",
      "corpo": "bolha",
      "andar": "flutua",
      "golpe": "descarga",
      "morte": "estoura",
      "mania": "pisca",
      "detalhes": [
       "tentaculos",
       "brilho"
      ]
     },
     {
      "nome": "Tubarões-lanterna",
      "corpo": "aquatico",
      "andar": "corre",
      "golpe": "bote",
      "morte": "cai",
      "mania": "",
      "detalhes": [
       "lanterna",
       "presas"
      ]
     },
     {
      "nome": "Sereias sombrias",
      "corpo": "humanoide",
      "andar": "flutua",
      "golpe": "cuspe",
      "morte": "evapora",
      "mania": "canto",
      "detalhes": [
       "cauda",
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "bolha",
     "detalhes": [
      "tentaculos",
      "olho_unico"
     ],
     "golpes": [
      {
       "nome": "Tentáculos Abissais",
       "tipo": "tentaculos",
       "desc": "Tentáculos sobem do fundo.",
       "n": 4,
       "r": 14,
       "intervalo": 0.5
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "bolha",
     "detalhes": [
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Engolir o Mar",
       "tipo": "vortice",
       "desc": "Puxa o mar inteiro: jogador, objetos e destroços vão para a boca.",
       "r": 150,
       "dur": 4.5,
       "forca": 70,
       "engole": true
      },
      {
       "nome": "Cuspir o Mar",
       "tipo": "onda",
       "desc": "Devolve tudo o que engoliu em uma onda.",
       "vmax": 140,
       "vel": 100,
       "empurra": true,
       "cospe": true,
       "el": "agua"
      }
     ],
     "fase2": {
      "nome": "Três Marés",
      "op": "inundar",
      "desc": "A maré sobe e o redemoinho não para de puxar.",
      "puxa": true
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 22,
    "rajada": 0.4,
    "veg": "alga",
    "dens": 0.3,
    "part": [
     "bolhas"
    ],
    "props": {
     "vaso": 2,
     "caixote": 1,
     "rocha": 2
    },
    "nuvens": false,
    "chao": [
     "conchas",
     "pedras"
    ],
    "submerso": true,
    "vaso": [
     "#5a8a7a",
     "#2a3a3a"
    ],
    "rocha": "coral"
   },
   "arte": {
    "estilo": "deep sea of the Age of Sail: dark teal water, bioluminescence, shipwreck, coral",
    "chao": "sandy sea floor with silt ripples",
    "marcos": [
     "sunken ship section",
     "giant clam",
     "coral tower",
     "anchor",
     "barnacled cannon",
     "kelp forest clump"
    ],
    "luz": "glowing anglerfish-like lamp coral",
    "frente": "kelp strand",
    "enfeites": [
     "shell",
     "starfish",
     "pearl",
     "coral bit",
     "bubble cluster",
     "fish bone",
     "sea urchin",
     "sunken coin"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.28,
     "lago": 0.15,
     "praca": 0.15,
     "construcao": 0.18
    },
    "chance_ponte": 0.5,
    "lago_solo": "agua",
    "piso": "sandy sea floor with silt ripples, shells, small corals and sea grass",
    "fundo": "the black abyss of an ocean trench far below with faint glowing specks and marine snow",
    "paredao": "dark rock trench wall with sponges and sea anemones",
    "praca": "sunken ship deck section with barnacles",
    "lago": "brine pool on the seabed: shimmering silver water with mussels at its rim",
    "construcao": "sunken ship hull section standing upright",
    "ponte": "fallen ship mast bridge covered in coral",
    "fauna": {
     "ave": "manta ray",
     "borboleta": "small glowing jellyfish",
     "peixe": "lanternfish",
     "bicho": "hermit crab"
    }
   },
   "luz": {
    "tom": "#2a5a8a",
    "forca": 0.5,
    "noite": 1
   },
   "objetos": [
    "vaso",
    "rocha",
    "caixote"
   ]
  },
  {
   "id": "transilvania",
   "era": "gotica",
   "nome": "Transilvânia",
   "elemento": "sombra",
   "inimigos": [
    "Morcegos",
    "Lobos da noite",
    "Servos zumbis"
   ],
   "mini_chefe": "Strigoi",
   "chefe": "Conde da Noite Eterna",
   "reliquia": {
    "nome": "Estaca de Freixo",
    "efeito": "+40% de dano em chefes, mini-chefes e elites."
   },
   "cenario": "castelo gótico no penhasco, lua cheia, cemitério com velas",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Morcegos",
      "corpo": "ave",
      "andar": "voa",
      "golpe": "bote",
      "morte": "cai",
      "mania": "enxame",
      "detalhes": [
       "asas",
       "orelhas"
      ]
     },
     {
      "nome": "Lobos da noite",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "uiva",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Servos zumbis",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "contato",
      "morte": "desmancha",
      "mania": "tropeca",
      "detalhes": []
     }
    ],
    "mini": {
     "corpo": "espectro",
     "detalhes": [
      "presas",
      "garras",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Voo Noturno",
       "tipo": "teleporte",
       "desc": "Some e ataca de onde não se espera."
      },
      {
       "nome": "Sede",
       "tipo": "investida",
       "desc": "Avança e rouba vida.",
       "n": 1,
       "vel": 240,
       "cura": true
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "capuz",
      "presas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Revoada",
       "tipo": "invocar",
       "desc": "Vira uma revoada de morcegos e se refaz.",
       "n": 8,
       "k": 0,
       "some": true
      },
      {
       "nome": "Lua de Sangue",
       "tipo": "leque",
       "desc": "Disparos de sangue que curam quem dispara.",
       "n": 9,
       "arco": 1.4,
       "ondas": 3,
       "proj": "gota",
       "el": "sombra",
       "cura": true
      }
     ],
     "fase2": {
      "nome": "Castelo Desperto",
      "op": "arena",
      "desc": "Candelabros de ferro sobem em volta da luta.",
      "mat": "metal"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 40,
    "rajada": 0.3,
    "veg": "seca",
    "dens": 0.2,
    "part": [
     "garoa"
    ],
    "props": {
     "fruta": 2,
     "caixote": 2,
     "barril": 1,
     "rocha": 1
    },
    "nevoa": "#c8c8e0",
    "chao": [
     "ossos",
     "pedras"
    ],
    "fruta": "abobora"
   },
   "arte": {
    "estilo": "gothic Transylvania: purple night, black iron, grey stone, blood red, fog",
    "chao": "cracked cobblestone with dead grass",
    "marcos": [
     "gravestone",
     "iron fence segment",
     "dead tree",
     "crypt entrance",
     "gargoyle statue",
     "stone cross"
    ],
    "luz": "iron candelabra with candles",
    "frente": "dead tree trunk",
    "enfeites": [
     "dead leaf",
     "bat skull",
     "rose",
     "candle stub",
     "crow feather",
     "cracked cobble",
     "garlic",
     "rusty key"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.22,
     "lago": 0.15,
     "praca": 0.18,
     "construcao": 0.18
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "cracked cobblestones with dead grass, fallen leaves and fog patches",
    "fundo": "a deep dark ravine far below with fog, dead trees and a distant river",
    "paredao": "black rock cliff with dead roots and fog",
    "praca": "cemetery stone floor with a carved moon and bat mosaic",
    "lago": "dark still pond with dead lilies and fog",
    "construcao": "small gothic crypt chapel with a pointed roof",
    "ponte": "iron bridge with spiked rails",
    "fauna": {
     "ave": "bat",
     "borboleta": "moth",
     "peixe": "pale fish",
     "bicho": "black cat"
    }
   },
   "luz": {
    "tom": "#4a3a6a",
    "forca": 0.5,
    "noite": 1
   },
   "objetos": [
    "fruta",
    "caixote",
    "barril",
    "rocha",
    "metal"
   ]
  },
  {
   "id": "laboratorio",
   "era": "gotica",
   "nome": "Laboratório da Tempestade",
   "elemento": "raio",
   "inimigos": [
    "Criaturas remendadas",
    "Ratos elétricos",
    "Bobinas ambulantes"
   ],
   "mini_chefe": "Cérebro no Jarro",
   "chefe": "A Criatura Primordial",
   "reliquia": {
    "nome": "Para-raios",
    "efeito": "A cada 5 s, um raio atinge um inimigo aleatório."
   },
   "cenario": "torre com laboratório, frascos borbulhando, tempestade elétrica pela janela",
   "humor": "O cérebro no jarro dá conselhos ruins.",
   "combate": {
    "inimigos": [
     {
      "nome": "Criaturas remendadas",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "contato",
      "morte": "desmonta",
      "mania": "tropeca",
      "detalhes": [
       "parafusos"
      ]
     },
     {
      "nome": "Ratos elétricos",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "puff",
      "mania": "eletrifica",
      "detalhes": [
       "orelhas",
       "cauda"
      ]
     },
     {
      "nome": "Bobinas ambulantes",
      "corpo": "objeto",
      "andar": "pula",
      "golpe": "descarga",
      "morte": "estilhaca",
      "mania": "",
      "detalhes": [
       "bobina"
      ]
     }
    ],
    "mini": {
     "corpo": "objeto",
     "detalhes": [
      "jarro",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Onda Cerebral",
       "tipo": "telecinese",
       "desc": "Levanta os objetos do laboratório com a mente e arremessa.",
       "n": 4,
       "r": 90
      }
     ],
     "fase2": null,
     "mania": "conselho"
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "parafusos",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Para-raios Vivo",
       "tipo": "tempestade",
       "desc": "Chama os raios para perto de si.",
       "n": 5,
       "intervalo": 0.45,
       "r": 24
      },
      {
       "nome": "Golpe Galvânico",
       "tipo": "salto",
       "desc": "Salta e eletrifica a água em volta.",
       "r": 34,
       "solo": "eletrico"
      }
     ],
     "fase2": {
      "nome": "Tempestade do Laboratório",
      "op": "eletrificar",
      "desc": "A chuva alaga o chão e as poças ficam eletrificadas."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 60,
    "rajada": 0.7,
    "veg": "capim",
    "dens": 0.06,
    "part": [
     "chuva",
     "faiscas"
    ],
    "props": {
     "metal": 2,
     "barril": 2,
     "polvora": 1,
     "caixote": 2
    },
    "relampago": true,
    "chao": [
     "lajotas",
     "rachaduras"
    ],
    "metal": "bobina",
    "nuvensEscuras": true
   },
   "arte": {
    "estilo": "gothic storm laboratory: wet slate, copper, brass, green glass, electric blue",
    "chao": "wet stone floor tiles with cable lines",
    "marcos": [
     "tesla coil tower",
     "operating table",
     "glass tank with bubbling liquid",
     "brick chimney",
     "lever panel",
     "pile of gears"
    ],
    "luz": "electric arc lamp",
    "frente": "iron pillar with cables",
    "enfeites": [
     "gear",
     "bolt",
     "broken glass",
     "cable",
     "puddle",
     "copper wire",
     "test tube",
     "spark mark"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.25,
     "lago": 0.15,
     "praca": 0.18,
     "construcao": 0.18
    },
    "chance_ponte": 0.8,
    "lago_solo": "agua",
    "piso": "wet stone floor tiles with cables, puddles, bolts and scorch marks",
    "fundo": "a stormy night sky far below with lightning-lit clouds (the lab stands on a high tower)",
    "paredao": "wet stone tower wall with iron pipes and cables",
    "praca": "metal grate floor with a large copper circuit mandala",
    "lago": "stone basin pool of glowing green liquid with bubbles",
    "construcao": "brick lab building with a tesla tower on top",
    "ponte": "iron catwalk with rivets",
    "fauna": {
     "ave": "crow",
     "borboleta": "spark moth",
     "peixe": "eel",
     "bicho": "rat"
    }
   },
   "luz": {
    "tom": "#4a5a7a",
    "forca": 0.44,
    "noite": 1
   },
   "objetos": [
    "metal",
    "barril",
    "caixote",
    "polvora"
   ]
  },
  {
   "id": "floresta_negra",
   "era": "gotica",
   "nome": "Floresta dos Contos Sombrios",
   "elemento": "natureza",
   "inimigos": [
    "Lobisomens selvagens",
    "Bruxas",
    "Cogumelos venenosos"
   ],
   "mini_chefe": "A Casa de Doces",
   "chefe": "A Bruxa da Floresta",
   "reliquia": {
    "nome": "Espelho Mágico",
    "efeito": "Quando a equipe é ferida, um clarão revida nos inimigos encostados (1 vez por segundo)."
   },
   "cenario": "floresta escura com trilha de migalhas, chalés tortos, cogumelos brilhantes",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Lobisomens selvagens",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "salto",
      "morte": "cai",
      "mania": "uiva",
      "detalhes": [
       "pelo",
       "garras"
      ]
     },
     {
      "nome": "Bruxas",
      "corpo": "humanoide",
      "andar": "flutua",
      "golpe": "cuspe",
      "morte": "sapo",
      "mania": "",
      "detalhes": [
       "chapeu",
       "cajado"
      ]
     },
     {
      "nome": "Cogumelos venenosos",
      "corpo": "planta",
      "andar": "pula",
      "golpe": "explode",
      "morte": "estoura",
      "mania": "esporos",
      "detalhes": [
       "cogumelo"
      ]
     }
    ],
    "mini": {
     "corpo": "objeto",
     "detalhes": [
      "casa",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Chuva de Doces",
       "tipo": "chuva",
       "desc": "Doces caem do telhado; os que ficam curam quem tiver coragem de pegar.",
       "n": 6,
       "r": 12,
       "proj": "doce",
       "deixa": "fruta",
       "solo": "lama"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "chapeu",
      "cajado",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Caldeirão Fervente",
       "tipo": "chuva",
       "desc": "Poções voam do caldeirão e cada uma muda o chão de um jeito.",
       "n": 7,
       "r": 16,
       "proj": "pocao",
       "solo": "caos"
      },
      {
       "nome": "Espinhos",
       "tipo": "fissura",
       "desc": "Espinhos correm pelo chão e deixam vinhas.",
       "n": 5,
       "comp": 110,
       "el": "natureza",
       "solo": "vinha"
      }
     ],
     "fase2": {
      "nome": "Floresta Encantada",
      "op": "floresta",
      "desc": "As árvores andam e fecham o cerco."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 22,
    "rajada": 0.4,
    "veg": "cogumelo",
    "dens": 0.28,
    "part": [
     "vagalumes",
     "folhas"
    ],
    "props": {
     "fruta": 2,
     "caixote": 1,
     "barril": 1
    },
    "nuvens": true,
    "chao": [
     "folhas",
     "raizes"
    ],
    "cogu": "#c8473b",
    "fruta": "abobora",
    "nevoa": "#a8b8a0",
    "rocha": "musgo"
   },
   "arte": {
    "estilo": "dark Grimm forest: black-green pines, mossy stone, candy colors only on the witch’s things",
    "chao": "dark forest floor with roots, needles and moss",
    "marcos": [
     "huge gnarled oak",
     "mossy stone well",
     "woodcutter stump with axe",
     "toadstool ring",
     "candy house fence",
     "old signpost"
    ],
    "luz": "lantern hanging from a branch",
    "frente": "black pine trunk",
    "enfeites": [
     "pine needles",
     "breadcrumb",
     "red mushroom",
     "candy",
     "feather",
     "acorn",
     "moss",
     "stone"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.18,
     "lago": 0.2,
     "praca": 0.15,
     "construcao": 0.2
    },
    "chance_ponte": 0.8,
    "lago_solo": "agua",
    "piso": "dark forest floor of pine needles, roots, moss and fallen leaves",
    "fundo": "a dark misty forest gorge far below with black pines",
    "paredao": "earth wall with gnarled roots and mushrooms",
    "praca": "mossy stone circle with a ring of red toadstools",
    "lago": "dark witch pond with lily pads and fog",
    "construcao": "woodcutter’s hut with a crooked chimney",
    "ponte": "fallen tree trunk bridge",
    "fauna": {
     "ave": "crow",
     "borboleta": "moth",
     "peixe": "small black fish",
     "bicho": "toad"
    }
   },
   "luz": {
    "tom": "#3a4a3a",
    "forca": 0.46,
    "noite": 1
   },
   "objetos": [
    "fruta",
    "caixote",
    "barril",
    "arvore"
   ]
  },
  {
   "id": "atlantida",
   "era": "perdidos",
   "nome": "Atlântida",
   "elemento": "agua",
   "inimigos": [
    "Soldados de oricalco",
    "Autômatos",
    "Tritões"
   ],
   "mini_chefe": "Autômato de Oricalco",
   "chefe": "O Rei Afogado",
   "reliquia": {
    "nome": "Cristal de Oricalco",
    "efeito": "+20% de dano de reações."
   },
   "cenario": "cidade submersa em anéis com cúpulas de vidro e canais circulares",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Soldados de oricalco",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "contato",
      "morte": "estilhaca",
      "mania": "formacao",
      "detalhes": [
       "elmo",
       "lanca"
      ]
     },
     {
      "nome": "Autômatos",
      "corpo": "golem",
      "andar": "caminha",
      "golpe": "cuspe",
      "morte": "estilhaca",
      "mania": "",
      "detalhes": [
       "engrenagem"
      ]
     },
     {
      "nome": "Tritões",
      "corpo": "humanoide",
      "andar": "corre",
      "golpe": "bote",
      "morte": "derrete",
      "mania": "",
      "detalhes": [
       "lanca",
       "barbatana"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "engrenagem",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Engrenagens",
       "tipo": "espiral",
       "desc": "Engrenagens giram para todos os lados.",
       "bracos": 4,
       "dur": 3.5,
       "proj": "engrenagem",
       "el": "raio"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "coroa",
      "folhas",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Maré Real",
       "tipo": "onda",
       "desc": "Uma onda real que alaga o chão.",
       "vmax": 130,
       "vel": 90,
       "el": "agua",
       "solo": "agua",
       "empurra": true
      },
      {
       "nome": "Ruínas que Sobem",
       "tipo": "muralha",
       "desc": "Colunas de oricalco sobem do fundo em cruz.",
       "forma": "cruz",
       "mat": "metal",
       "r": 60
      }
     ],
     "fase2": {
      "nome": "A Cidade Afunda",
      "op": "ruir",
      "desc": "Tudo desmorona e o chão alaga.",
      "inunda": true
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 20,
    "rajada": 0.4,
    "veg": "alga",
    "dens": 0.25,
    "part": [
     "bolhas"
    ],
    "props": {
     "vaso": 4,
     "metal": 1,
     "rocha": 1
    },
    "nuvens": false,
    "chao": [
     "lajotas",
     "conchas"
    ],
    "submerso": true,
    "metal": "oricalco",
    "vaso": [
     "#4a9aa0",
     "#d6ab4f"
    ],
    "rocha": "coral"
   },
   "arte": {
    "estilo": "sunken Atlantis: white marble, orichalcum red-gold, turquoise water light, coral",
    "chao": "flooded marble floor with shallow water and coral",
    "marcos": [
     "orichalcum ring wall segment",
     "fallen statue",
     "coral-covered column",
     "trident monument",
     "shell fountain",
     "temple step"
    ],
    "luz": "glowing orichalcum lamp",
    "frente": "coral column",
    "enfeites": [
     "shell",
     "coral bit",
     "orichalcum coin",
     "marble chip",
     "pearl",
     "seaweed",
     "starfish",
     "gear"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.25,
     "lago": 0.2,
     "praca": 0.18,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "flooded marble floor tiles with coral, shells and seaweed",
    "fundo": "deep blue ocean far below with sun rays and sunken ruins",
    "paredao": "white marble wall with coral and red-gold orichalcum bands",
    "praca": "marble floor with concentric rings of orichalcum",
    "lago": "flooded marble pool with clear turquoise water",
    "construcao": "small marble temple with an orichalcum dome",
    "ponte": "orichalcum bridge with trident posts",
    "fauna": {
     "ave": "manta ray",
     "borboleta": "small glowing jellyfish",
     "peixe": "silver fish",
     "bicho": "crab"
    }
   },
   "luz": {
    "tom": "#5aa0c0",
    "forca": 0.3,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "metal",
    "rocha"
   ]
  },
  {
   "id": "eldorado",
   "era": "perdidos",
   "nome": "El Dorado",
   "elemento": "luz",
   "inimigos": [
    "Guardiões dourados",
    "Serpentes de ouro",
    "Exploradores amaldiçoados"
   ],
   "mini_chefe": "Explorador Amaldiçoado",
   "chefe": "O Homem Dourado",
   "reliquia": {
    "nome": "Ídolo Dourado",
    "efeito": "+60% de Essência ao fim da run, mas inimigos causam +15% de dano."
   },
   "cenario": "cidade de ouro escondida na selva, lago sagrado, estátuas douradas",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Guardiões dourados",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "contato",
      "morte": "estilhaca",
      "mania": "",
      "detalhes": [
       "coroa",
       "brilho"
      ]
     },
     {
      "nome": "Serpentes de ouro",
      "corpo": "serpente",
      "andar": "rasteja",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Exploradores amaldiçoados",
      "corpo": "humanoide",
      "andar": "cambaleia",
      "golpe": "contato",
      "morte": "ouro",
      "mania": "",
      "detalhes": [
       "chapeu"
      ]
     }
    ],
    "mini": {
     "corpo": "humanoide",
     "detalhes": [
      "chapeu",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Ganância",
       "tipo": "chuva",
       "desc": "Moedas amaldiçoadas caem do céu.",
       "n": 10,
       "r": 10,
       "proj": "moeda",
       "el": "luz"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "humanoide",
     "detalhes": [
      "coroa",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Toque de Ouro",
       "tipo": "transmutar",
       "desc": "Tudo o que ele toca vira ouro.",
       "r": 60,
       "mat": "metal",
       "solo": "luz"
      },
      {
       "nome": "Oferendas ao Lago",
       "tipo": "chuva",
       "desc": "Oferendas de ouro caem no lago sagrado.",
       "n": 8,
       "r": 14,
       "proj": "moeda",
       "el": "luz",
       "solo": "agua"
      }
     ],
     "fase2": {
      "nome": "Lago Guatavita",
      "op": "transmutar",
      "desc": "O lago dourado transforma todos os objetos em ouro.",
      "mat": "metal"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 25,
    "rajada": 0.3,
    "veg": "capim",
    "dens": 0.38,
    "part": [
     "polen"
    ],
    "props": {
     "vaso": 3,
     "cristal": 1,
     "fruta": 1
    },
    "nuvens": true,
    "chao": [
     "flores",
     "lajotas"
    ],
    "fruta": "coco",
    "vaso": [
     "#e0b040",
     "#8a5a1a"
    ],
    "cristal": "#ffd34a"
   },
   "arte": {
    "estilo": "El Dorado: lush jungle green and gold, sacred lake, gold dust everywhere",
    "chao": "jungle soil sprinkled with gold dust",
    "marcos": [
     "gold muisca raft statue",
     "temple stair",
     "sacred lake rock",
     "gold idol",
     "giant fern",
     "carved stone pillar"
    ],
    "luz": "gold brazier",
    "frente": "jungle tree trunk",
    "enfeites": [
     "gold nugget",
     "emerald",
     "leaf",
     "feather",
     "gold dust",
     "orchid",
     "small idol",
     "stone"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.22,
     "praca": 0.18,
     "construcao": 0.18
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "jungle soil with gold dust, small emeralds, leaves and roots",
    "fundo": "a sacred lake far below with golden reflections and jungle",
    "paredao": "jungle cliff with gold veins and vines",
    "praca": "gold-inlaid stone plaza with a sun disk",
    "lago": "sacred lake pool with small golden offerings",
    "construcao": "golden temple shrine with steps",
    "ponte": "gold-trimmed liana bridge",
    "fauna": {
     "ave": "hummingbird",
     "borboleta": "golden butterfly",
     "peixe": "golden fish",
     "bicho": "frog"
    }
   },
   "luz": {
    "tom": "#ffe8a0",
    "forca": 0.12,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "cristal",
    "fruta",
    "metal"
   ]
  },
  {
   "id": "shangrila",
   "era": "perdidos",
   "nome": "Vale Eterno",
   "elemento": "ar",
   "inimigos": [
    "Yetis",
    "Leopardos-das-neves espectrais",
    "Guardiões de pedra"
   ],
   "mini_chefe": "Yeti",
   "chefe": "Guardião do Vale Eterno",
   "reliquia": {
    "nome": "Flor do Vale",
    "efeito": "A equipe regenera 0,5% da vida por segundo."
   },
   "cenario": "vale oculto entre montanhas nevadas, árvores floridas na neve, fontes termais",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Yetis",
      "corpo": "golem",
      "andar": "caminha",
      "golpe": "cuspe",
      "morte": "cai",
      "mania": "",
      "detalhes": [
       "pelo",
       "gelo"
      ]
     },
     {
      "nome": "Leopardos-das-neves espectrais",
      "corpo": "quadrupede",
      "andar": "corre",
      "golpe": "salto",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "manchas",
       "cauda"
      ]
     },
     {
      "nome": "Guardiões de pedra",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "contato",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "pelo",
      "gelo",
      "presas"
     ],
     "golpes": [
      {
       "nome": "Bola de Neve Gigante",
       "tipo": "bola",
       "desc": "Uma bola de neve que cresce enquanto rola e esmaga o que encontra.",
       "n": 1,
       "r": 6,
       "dur": 9,
       "cresce": true,
       "el": "agua"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "gelo",
      "coroa",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Avalanche",
       "tipo": "avalanche",
       "desc": "Uma parede de neve desce a montanha e cobre o chão.",
       "larg": 60,
       "vel": 70,
       "solo": "gelo"
      },
      {
       "nome": "Pilares de Gelo",
       "tipo": "muralha",
       "desc": "Pilares de gelo sobem em cruz.",
       "forma": "cruz",
       "mat": "gelo",
       "r": 55
      }
     ],
     "fase2": {
      "nome": "Nevasca",
      "op": "congelar",
      "desc": "A nevasca congela o vale."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 45,
    "rajada": 0.7,
    "veg": "gelada",
    "dens": 0.2,
    "part": [
     "neve",
     "petalas"
    ],
    "props": {
     "gelo": 2,
     "cristal": 1,
     "vaso": 2,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "neve",
     "pedras"
    ],
    "petala": "#f6d0e0",
    "cristal": "#9fe0f0",
    "rocha": "neve",
    "vaso": [
     "#c8473b",
     "#d6ab4f"
    ]
   },
   "arte": {
    "estilo": "Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice",
    "chao": "snowy mountain grass with frozen puddles",
    "marcos": [
     "stupa",
     "prayer wheel",
     "apricot tree in bloom",
     "ice formation",
     "monastery wall",
     "prayer flag line post"
    ],
    "luz": "butter lamp shrine",
    "frente": "prayer flag pole",
    "enfeites": [
     "apricot blossom",
     "snow clump",
     "prayer flag scrap",
     "pebble",
     "ice shard",
     "yak track",
     "juniper sprig",
     "bell"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.18,
     "praca": 0.18,
     "construcao": 0.14
    },
    "chance_ponte": 0.7,
    "lago_solo": "agua",
    "piso": "snowy mountain grass with prayer stones, apricot petals and frozen puddles",
    "fundo": "a deep Himalayan valley far below with clouds and blooming apricot trees",
    "paredao": "snowy grey cliff with prayer flags",
    "praca": "stone floor with a mandala mosaic",
    "lago": "turquoise glacier lake with prayer stones",
    "construcao": "small stupa with prayer wheels",
    "ponte": "rope bridge with prayer flags",
    "fauna": {
     "ave": "bar-headed goose",
     "borboleta": "apricot blossom butterfly",
     "peixe": "glacier trout",
     "bicho": "marmot"
    }
   },
   "luz": {
    "tom": "#e8f0ff",
    "forca": 0.1,
    "noite": 0
   },
   "objetos": [
    "gelo",
    "vaso",
    "cristal",
    "rocha",
    "metal"
   ]
  },
  {
   "id": "centro_terra",
   "era": "perdidos",
   "nome": "Centro da Terra",
   "elemento": "terra",
   "inimigos": [
    "Dinossauros",
    "Cogumelos gigantes",
    "Homens-toupeira"
   ],
   "mini_chefe": "Tiranossauro",
   "chefe": "Rei do Mundo Subterrâneo",
   "reliquia": {
    "nome": "Bússola Enlouquecida",
    "efeito": "Recompensas de portal em dobro: Itens e Ovos vêm 2; o resto ganha um Item extra."
   },
   "cenario": "caverna colossal com mar interno, cogumelos gigantes e um sol de cristal",
   "humor": "Os dinossauros têm medo dos Pequeninos.",
   "combate": {
    "inimigos": [
     {
      "nome": "Dinossauros",
      "corpo": "bipede",
      "andar": "corre",
      "golpe": "bote",
      "morte": "cai",
      "mania": "medo_pequeninos",
      "detalhes": [
       "presas",
       "cauda"
      ]
     },
     {
      "nome": "Cogumelos gigantes",
      "corpo": "planta",
      "andar": "pula",
      "golpe": "explode",
      "morte": "estoura",
      "mania": "esporos",
      "detalhes": [
       "cogumelo"
      ]
     },
     {
      "nome": "Homens-toupeira",
      "corpo": "humanoide",
      "andar": "cava",
      "golpe": "bote",
      "morte": "cai",
      "mania": "",
      "detalhes": [
       "garras"
      ]
     }
    ],
    "mini": {
     "corpo": "bipede",
     "detalhes": [
      "presas",
      "cauda"
     ],
     "golpes": [
      {
       "nome": "Rugido",
       "tipo": "onda",
       "desc": "Um rugido que deixa todos lentos.",
       "vmax": 100,
       "vel": 110,
       "atordoa": true,
       "el": "terra"
      },
      {
       "nome": "Investida Jurássica",
       "tipo": "investida",
       "desc": "Corre com tudo.",
       "n": 1,
       "vel": 260
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "golem",
     "detalhes": [
      "coroa",
      "brilho",
      "runas"
     ],
     "golpes": [
      {
       "nome": "Terremoto",
       "tipo": "terremoto",
       "desc": "O mundo subterrâneo treme e estalactites caem.",
       "dur": 3,
       "n": 8
      },
      {
       "nome": "Cristais do Sol Interno",
       "tipo": "chuva",
       "desc": "Cristais caem do sol interno e ficam cravados no chão.",
       "n": 6,
       "r": 14,
       "proj": "cristal",
       "deixa": "cristal",
       "el": "luz"
      }
     ],
     "fase2": {
      "nome": "Desmoronamento",
      "op": "ruir",
      "desc": "O teto da caverna desmorona.",
      "pedras": true
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 12,
    "rajada": 0.5,
    "veg": "cogumelo",
    "dens": 0.25,
    "part": [
     "esporos"
    ],
    "props": {
     "cristal": 3,
     "rocha": 3
    },
    "nuvens": false,
    "chao": [
     "pedras",
     "rachaduras"
    ],
    "cogu": "#c070ff",
    "caverna": true,
    "cristal": "#b070f0"
   },
   "arte": {
    "estilo": "journey to the center of the Earth: giant cave, purple crystal light, giant mushrooms, internal sea",
    "chao": "cave floor rock with crystal dust",
    "marcos": [
     "giant mushroom",
     "crystal cluster",
     "dinosaur skeleton",
     "stalagmite",
     "fossil wall",
     "underground sea rock"
    ],
    "luz": "glowing crystal lamp",
    "frente": "giant mushroom stalk",
    "enfeites": [
     "crystal shard",
     "fossil",
     "mushroom",
     "bone",
     "gem",
     "glowing spore",
     "rock chip",
     "fern"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.18,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "cave floor rock with crystal dust, fossils and mushrooms",
    "fundo": "a glowing underground sea far below with crystal islands",
    "paredao": "cave rock wall with purple crystals and fossils",
    "praca": "rock floor with a giant fossil ammonite spiral",
    "lago": "underground hot spring with steam",
    "construcao": "giant mushroom house",
    "ponte": "bridge made of a giant dinosaur rib cage",
    "fauna": {
     "ave": "pterosaur",
     "borboleta": "glowing spore moth",
     "peixe": "cave fish",
     "bicho": "trilobite"
    }
   },
   "luz": {
    "tom": "#5a3a7a",
    "forca": 0.46,
    "noite": 1
   },
   "objetos": [
    "cristal",
    "rocha",
    "metal"
   ]
  },
  {
   "id": "reino_fogo",
   "era": "elementais",
   "nome": "Reino do Fogo",
   "elemento": "fogo",
   "inimigos": [
    "Elementais menores do Fogo",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela do Fogo",
   "chefe": "Avatar do Fogo",
   "reliquia": {
    "nome": "Núcleo do Fogo",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "rios de lava, colunas de obsidiana, céu alaranjado",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores do Fogo",
      "corpo": "bolha",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "chamas"
     ],
     "golpes": [
      {
       "nome": "Anel de Chamas",
       "tipo": "anel",
       "desc": "Explode em anéis de fogo.",
       "n": 12,
       "ondas": 2,
       "proj": "chama",
       "el": "fogo"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "chamas",
      "brilho",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Chuva de Meteoros",
       "tipo": "chuva",
       "desc": "Meteoros caem e deixam o chão em chamas.",
       "n": 7,
       "r": 16,
       "proj": "pedra",
       "el": "fogo",
       "solo": "fogo"
      },
      {
       "nome": "Colunas de Fogo",
       "tipo": "fissura",
       "desc": "Rachaduras de fogo correm pelo chão.",
       "n": 6,
       "comp": 120,
       "el": "fogo",
       "solo": "fogo"
      }
     ],
     "fase2": {
      "nome": "Rio de Lava",
      "op": "incendiar",
      "desc": "A lava sobe pelas rachaduras."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 35,
    "rajada": 0.4,
    "veg": "seca",
    "dens": 0.04,
    "part": [
     "brasas"
    ],
    "props": {
     "rocha": 3,
     "polvora": 1,
     "metal": 1
    },
    "nuvens": false,
    "chao": [
     "rachaduras"
    ],
    "metal": "braseiro",
    "rocha": "obsidiana"
   },
   "arte": {
    "estilo": "Elemental Realm of Fire: obsidian, lava orange, ash grey, ember light",
    "chao": "cooled black lava crust with glowing cracks",
    "marcos": [
     "obsidian spire",
     "lava rock arch",
     "fire crystal",
     "ash tree",
     "volcanic vent",
     "molten statue"
    ],
    "luz": "lava brazier",
    "frente": "obsidian column",
    "enfeites": [
     "ember",
     "obsidian chip",
     "ash pile",
     "fire crystal",
     "lava crack",
     "charred bone",
     "sulfur",
     "glowing pebble"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.18,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.5,
    "lago_solo": "fogo",
    "piso": "cooled black lava crust with glowing cracks and ash",
    "fundo": "a sea of molten lava far below with glowing currents and heat haze",
    "paredao": "obsidian cliff with glowing magma cracks",
    "praca": "obsidian floor with a fire rune circle",
    "lago": "lava pool with dark crust plates",
    "construcao": "obsidian fire altar shrine",
    "ponte": "basalt column bridge",
    "fauna": {
     "ave": "young phoenix",
     "borboleta": "ember moth",
     "peixe": "lava salamander",
     "bicho": "fire beetle"
    }
   },
   "luz": {
    "tom": "#c06030",
    "forca": 0.3,
    "noite": 1
   },
   "objetos": [
    "rocha",
    "polvora",
    "metal",
    "gelo",
    "cristal",
    "arvore"
   ]
  },
  {
   "id": "reino_agua",
   "era": "elementais",
   "nome": "Reino da Água",
   "elemento": "agua",
   "inimigos": [
    "Elementais menores da Água",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela da Água",
   "chefe": "Avatar da Água",
   "reliquia": {
    "nome": "Núcleo da Água",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "cachoeiras flutuantes, bolhas gigantes, chão espelhado",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores da Água",
      "corpo": "bolha",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "estoura",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Leque de Gotas",
       "tipo": "leque",
       "desc": "Gotas em leque.",
       "n": 9,
       "arco": 1.0,
       "ondas": 2,
       "proj": "gota",
       "el": "agua"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "brilho",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Maremoto",
       "tipo": "onda",
       "desc": "Uma onda gigante que alaga o chão.",
       "vmax": 140,
       "vel": 100,
       "el": "agua",
       "solo": "agua",
       "empurra": true
      },
      {
       "nome": "Prisão de Gelo",
       "tipo": "muralha",
       "desc": "Blocos de gelo fecham o jogador.",
       "forma": "prisao",
       "mat": "gelo",
       "r": 30
      }
     ],
     "fase2": {
      "nome": "Dilúvio",
      "op": "inundar",
      "desc": "A arena inteira alaga."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 30,
    "rajada": 0.4,
    "veg": "junco",
    "dens": 0.3,
    "part": [
     "bolhas"
    ],
    "props": {
     "gelo": 1,
     "vaso": 2,
     "rocha": 1
    },
    "nuvens": true,
    "chao": [
     "conchas"
    ],
    "vaso": [
     "#7ac0e0",
     "#ffffff"
    ]
   },
   "arte": {
    "estilo": "Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue",
    "chao": "mirror-like wet stone with reflections",
    "marcos": [
     "floating waterfall rock",
     "giant bubble on stand",
     "coral arch",
     "water lily cluster",
     "shell throne",
     "ice column"
    ],
    "luz": "glowing water orb lamp",
    "frente": "waterfall column",
    "enfeites": [
     "droplet",
     "shell",
     "lily pad",
     "pearl",
     "bubble",
     "ripple",
     "coral",
     "fish scale"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.25,
     "lago": 0.25,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "mirror-like wet stone with reflections and small shells",
    "fundo": "a bottomless clear blue ocean far below with light rays and bubbles",
    "paredao": "blue rock edge covered by thin waterfalls",
    "praca": "mirror-water floor with a shell spiral mosaic",
    "lago": "pool of clear water ringed by giant bubbles",
    "construcao": "shell palace pavilion",
    "ponte": "coral arch bridge",
    "fauna": {
     "ave": "flying fish",
     "borboleta": "glowing water droplet sprite",
     "peixe": "blue fish",
     "bicho": "crab"
    }
   },
   "luz": {
    "tom": "#a0d8ff",
    "forca": 0.14,
    "noite": 0
   },
   "objetos": [
    "vaso",
    "gelo",
    "rocha",
    "cristal",
    "metal",
    "arvore"
   ]
  },
  {
   "id": "reino_terra",
   "era": "elementais",
   "nome": "Reino da Terra",
   "elemento": "terra",
   "inimigos": [
    "Elementais menores da Terra",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela da Terra",
   "chefe": "Avatar da Terra",
   "reliquia": {
    "nome": "Núcleo da Terra",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "cânions de cristal, montanhas que respiram, raízes de pedra",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores da Terra",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "runas"
     ],
     "golpes": [
      {
       "nome": "Salto Sísmico",
       "tipo": "salto",
       "desc": "Salta e racha o chão.",
       "r": 28,
       "fissura": 3
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "runas",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Placas Tectônicas",
       "tipo": "fissura",
       "desc": "O chão se abre em placas.",
       "n": 6,
       "comp": 130,
       "el": "terra",
       "solo": "lama"
      },
      {
       "nome": "Monólitos",
       "tipo": "muralha",
       "desc": "Monólitos sobem em cruz.",
       "forma": "cruz",
       "mat": "rocha",
       "r": 55
      }
     ],
     "fase2": {
      "nome": "Arena de Pedra",
      "op": "arena",
      "desc": "Paredes de pedra cercam a luta.",
      "mat": "rocha"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 30,
    "rajada": 0.5,
    "veg": "seca",
    "dens": 0.15,
    "part": [
     "poeira"
    ],
    "props": {
     "rocha": 4,
     "cristal": 2
    },
    "nuvens": true,
    "chao": [
     "pedras",
     "rachaduras"
    ],
    "cristal": "#e0a040",
    "redemoinho": true
   },
   "arte": {
    "estilo": "Elemental Realm of Earth: crystal canyons, breathing mountains, stone roots, amber",
    "chao": "canyon rock with amber crystal veins",
    "marcos": [
     "amber crystal cluster",
     "stone root arch",
     "canyon pillar",
     "balanced rocks",
     "geode",
     "stone golem ruin"
    ],
    "luz": "amber crystal lamp",
    "frente": "rock pillar",
    "enfeites": [
     "amber shard",
     "pebble",
     "root",
     "geode piece",
     "sand",
     "fossil",
     "crystal dust",
     "moss"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.15,
     "praca": 0.15,
     "construcao": 0.18
    },
    "chance_ponte": 0.6,
    "lago_solo": "lama",
    "piso": "canyon rock with amber crystal veins, sand and pebbles",
    "fundo": "a crystal canyon far below with amber light",
    "paredao": "layered canyon rock with amber crystals",
    "praca": "stone floor with a geode slice mosaic",
    "lago": "bubbling mud pool",
    "construcao": "stone golem shrine",
    "ponte": "natural stone arch bridge",
    "fauna": {
     "ave": "rock eagle",
     "borboleta": "dust moth",
     "peixe": "mud fish",
     "bicho": "beetle"
    }
   },
   "luz": {
    "tom": "#e0b070",
    "forca": 0.16,
    "noite": 0
   },
   "objetos": [
    "rocha",
    "cristal",
    "gelo",
    "metal",
    "arvore"
   ]
  },
  {
   "id": "reino_ar",
   "era": "elementais",
   "nome": "Reino do Ar",
   "elemento": "ar",
   "inimigos": [
    "Elementais menores do Ar",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela do Ar",
   "chefe": "Avatar do Ar",
   "reliquia": {
    "nome": "Núcleo do Ar",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "ilhas flutuantes, correntes de vento visíveis, nuvens sólidas",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores do Ar",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "asas"
     ],
     "golpes": [
      {
       "nome": "Rajada",
       "tipo": "investida",
       "desc": "Avança como uma rajada.",
       "n": 2,
       "vel": 280,
       "voo": true
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "asas",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Furacão",
       "tipo": "vortice",
       "desc": "Um furacão puxa tudo.",
       "r": 120,
       "dur": 4,
       "forca": 65
      },
      {
       "nome": "Lâminas de Vento",
       "tipo": "leque",
       "desc": "Lâminas de vento em leque.",
       "n": 11,
       "arco": 1.3,
       "ondas": 3,
       "proj": "lamina",
       "el": "ar"
      }
     ],
     "fase2": {
      "nome": "Vendaval",
      "op": "vendaval",
      "desc": "O vento dobra e redemoinhos aparecem."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 95,
    "rajada": 0.8,
    "veg": "dente",
    "dens": 0.35,
    "part": [
     "sementes"
    ],
    "props": {
     "feno": 2,
     "caixote": 1,
     "barril": 1
    },
    "nuvens": true,
    "chao": [
     "flores"
    ],
    "redemoinho": true
   },
   "arte": {
    "estilo": "Elemental Realm of Air: floating islands, solid clouds, visible wind currents, sky blue and white",
    "chao": "cloud-solid ground with grass tufts",
    "marcos": [
     "floating rock island",
     "cloud pillar",
     "windmill",
     "feather totem",
     "wind chime arch",
     "dandelion giant"
    ],
    "luz": "glowing cloud lantern",
    "frente": "wind-swept tree",
    "enfeites": [
     "feather",
     "dandelion seed",
     "cloud puff",
     "small kite",
     "pebble",
     "flower",
     "wind spiral mark",
     "leaf"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.38,
     "lago": 0.15,
     "praca": 0.15,
     "construcao": 0.14
    },
    "chance_ponte": 0.8,
    "lago_solo": "agua",
    "piso": "cloud-solid ground with grass tufts and flowers",
    "fundo": "endless blue sky far below with soft clouds and floating islands",
    "paredao": "floating island rock underside with roots and a grass lip",
    "praca": "white stone floor with a wind spiral mosaic",
    "lago": "rain pond of clear water",
    "construcao": "windmill",
    "ponte": "rope bridge with wind chimes",
    "fauna": {
     "ave": "swallow",
     "borboleta": "dandelion seed sprite",
     "peixe": "small pond fish",
     "bicho": "rabbit"
    }
   },
   "luz": {
    "tom": "#f0f8ff",
    "forca": 0.06,
    "noite": 0
   },
   "objetos": [
    "feno",
    "caixote",
    "barril",
    "rocha",
    "gelo",
    "cristal",
    "metal",
    "arvore"
   ]
  },
  {
   "id": "reino_raio",
   "era": "elementais",
   "nome": "Reino do Raio",
   "elemento": "raio",
   "inimigos": [
    "Elementais menores do Raio",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela do Raio",
   "chefe": "Avatar do Raio",
   "reliquia": {
    "nome": "Núcleo do Raio",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "planície de vidro, tempestade eterna, árvores de relâmpago",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores do Raio",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "brilho"
     ],
     "golpes": [
      {
       "nome": "Faísca",
       "tipo": "feixe",
       "desc": "Um raio curto e rápido.",
       "larg": 6,
       "alcance": 110,
       "varre": 0,
       "el": "raio"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "brilho",
      "runas",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Tempestade Eterna",
       "tipo": "tempestade",
       "desc": "Relâmpagos em sequência.",
       "n": 7,
       "intervalo": 0.4,
       "r": 22
      },
      {
       "nome": "Corrente",
       "tipo": "feixe",
       "desc": "Um raio em linha que varre a planície.",
       "larg": 7,
       "alcance": 170,
       "varre": 1.4,
       "el": "raio",
       "solo": "eletrico"
      }
     ],
     "fase2": {
      "nome": "Planície Eletrificada",
      "op": "eletrificar",
      "desc": "Poças surgem e ficam eletrificadas."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 70,
    "rajada": 0.6,
    "veg": "capim",
    "dens": 0.1,
    "part": [
     "faiscas"
    ],
    "props": {
     "metal": 3,
     "cristal": 2
    },
    "relampago": true,
    "chao": [
     "rachaduras"
    ],
    "metal": "aco",
    "cristal": "#f2d23a",
    "nuvensEscuras": true
   },
   "arte": {
    "estilo": "Elemental Realm of Lightning: glass plain, eternal storm, lightning trees, yellow and electric blue",
    "chao": "fused glass plain with lightning scars",
    "marcos": [
     "lightning tree",
     "glass spire",
     "metal lightning rod",
     "fulgurite sculpture",
     "storm crystal",
     "copper ruin"
    ],
    "luz": "lightning orb on a rod",
    "frente": "glass column",
    "enfeites": [
     "glass shard",
     "spark",
     "fulgurite",
     "copper scrap",
     "scorch mark",
     "crystal",
     "bolt",
     "puddle"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.3,
     "lago": 0.18,
     "praca": 0.15,
     "construcao": 0.15
    },
    "chance_ponte": 0.6,
    "lago_solo": "agua",
    "piso": "fused glass plain with lightning scars and copper scraps",
    "fundo": "storm clouds far below lit by constant lightning",
    "paredao": "fused glass cliff with lightning scars",
    "praca": "copper floor with a lightning rune circle",
    "lago": "pool of crackling electrified water",
    "construcao": "copper lightning rod tower",
    "ponte": "copper bridge with insulator posts",
    "fauna": {
     "ave": "storm bird",
     "borboleta": "spark moth",
     "peixe": "electric eel",
     "bicho": "beetle"
    }
   },
   "luz": {
    "tom": "#5a5a8a",
    "forca": 0.38,
    "noite": 1
   },
   "objetos": [
    "metal",
    "cristal",
    "rocha",
    "gelo",
    "arvore"
   ]
  },
  {
   "id": "reino_natureza",
   "era": "elementais",
   "nome": "Reino da Natureza",
   "elemento": "natureza",
   "inimigos": [
    "Elementais menores da Natureza",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela da Natureza",
   "chefe": "Avatar da Natureza",
   "reliquia": {
    "nome": "Núcleo da Natureza",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "floresta primordial, flores do tamanho de casas, esporos luminosos",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores da Natureza",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "folhas"
     ],
     "golpes": [
      {
       "nome": "Espinhos",
       "tipo": "leque",
       "desc": "Espinhos em leque.",
       "n": 9,
       "arco": 1.1,
       "ondas": 2,
       "proj": "folha",
       "el": "natureza"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "folhas",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Raízes",
       "tipo": "tentaculos",
       "desc": "Raízes brotam embaixo do jogador.",
       "n": 7,
       "r": 14,
       "intervalo": 0.4,
       "solo": "vinha"
      },
      {
       "nome": "Esporos",
       "tipo": "sopro",
       "desc": "Uma nuvem de esporos que vira vinhas.",
       "ang": 1.0,
       "alcance": 100,
       "el": "natureza",
       "solo": "vinha"
      }
     ],
     "fase2": {
      "nome": "Floresta Primordial",
      "op": "floresta",
      "desc": "A floresta cresce sobre tudo."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 30,
    "rajada": 0.4,
    "veg": "capim",
    "dens": 0.55,
    "part": [
     "esporos_luz",
     "folhas"
    ],
    "props": {
     "fruta": 3,
     "feno": 1
    },
    "nuvens": true,
    "chao": [
     "flores",
     "raizes"
    ],
    "fruta": "abobora"
   },
   "arte": {
    "estilo": "Elemental Realm of Nature: primeval forest, house-sized flowers, glowing spores",
    "chao": "lush moss and flower carpet",
    "marcos": [
     "giant flower",
     "ancient tree",
     "mushroom ring",
     "vine arch",
     "giant seed pod",
     "moss boulder"
    ],
    "luz": "glowing spore flower",
    "frente": "giant flower stem",
    "enfeites": [
     "petal",
     "seed",
     "glowing spore",
     "leaf",
     "berry",
     "mushroom",
     "moss",
     "ladybug"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.2,
     "lago": 0.25,
     "praca": 0.15,
     "construcao": 0.18
    },
    "chance_ponte": 0.8,
    "lago_solo": "agua",
    "piso": "lush moss and flower carpet with roots",
    "fundo": "a primeval forest canopy far below with giant flowers",
    "paredao": "moss and root covered cliff with flowers",
    "praca": "floor mosaic of flower petals in a circle",
    "lago": "pond with glowing spores and lilies",
    "construcao": "giant flower bud house",
    "ponte": "living vine bridge",
    "fauna": {
     "ave": "hummingbird",
     "borboleta": "butterfly",
     "peixe": "koi",
     "bicho": "ladybug"
    }
   },
   "luz": {
    "tom": "#c0f0a0",
    "forca": 0.12,
    "noite": 0
   },
   "objetos": [
    "fruta",
    "feno",
    "arvore",
    "rocha",
    "gelo",
    "cristal",
    "metal"
   ]
  },
  {
   "id": "reino_luz",
   "era": "elementais",
   "nome": "Reino da Luz",
   "elemento": "luz",
   "inimigos": [
    "Elementais menores da Luz",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela da Luz",
   "chefe": "Avatar da Luz",
   "reliquia": {
    "nome": "Núcleo da Luz",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "palácio de prismas, chão de luz sólida, arco-íris cruzando o céu",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores da Luz",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Chuva de Luz",
       "tipo": "chuva",
       "desc": "Luz cai do céu.",
       "n": 5,
       "r": 14,
       "proj": "estrela",
       "el": "luz"
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "coroa",
      "brilho",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Prisma",
       "tipo": "feixe",
       "desc": "Três raios de luz giram em volta.",
       "n": 3,
       "larg": 7,
       "alcance": 150,
       "varre": 2.1,
       "el": "luz",
       "solo": "luz"
      },
      {
       "nome": "Julgamento",
       "tipo": "chuva",
       "desc": "Raios de luz caem do céu.",
       "n": 8,
       "r": 15,
       "proj": "estrela",
       "el": "luz",
       "solo": "luz"
      }
     ],
     "fase2": {
      "nome": "Palácio de Prismas",
      "op": "arena",
      "desc": "Prismas de cristal sobem em volta.",
      "mat": "cristal"
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 25,
    "rajada": 0.3,
    "veg": "trigo",
    "dens": 0.4,
    "part": [
     "polen"
    ],
    "props": {
     "cristal": 4,
     "vaso": 1
    },
    "nuvens": true,
    "chao": [
     "lajotas"
    ],
    "cristal": "#fff3c4",
    "vaso": [
     "#f2e7c9",
     "#d6ab4f"
    ]
   },
   "arte": {
    "estilo": "Elemental Realm of Light: palace of prisms, solid light floor, rainbows, white gold",
    "chao": "polished light-stone floor with rainbow refractions",
    "marcos": [
     "prism crystal pillar",
     "light fountain",
     "golden arch",
     "mirror monolith",
     "rainbow bridge piece",
     "sun statue"
    ],
    "luz": "floating light orb",
    "frente": "prism column",
    "enfeites": [
     "light shard",
     "rainbow glint",
     "gold leaf",
     "crystal",
     "feather",
     "star mark",
     "pearl",
     "prism chip"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.28,
     "lago": 0.18,
     "praca": 0.18,
     "construcao": 0.15
    },
    "chance_ponte": 0.7,
    "lago_solo": "luz",
    "piso": "polished light-stone floor with rainbow refractions and gold leaf",
    "fundo": "a sea of golden clouds far below with rainbows",
    "paredao": "white crystal cliff with gold veins",
    "praca": "solid light floor with a sun mandala",
    "lago": "pool of liquid light",
    "construcao": "prism pavilion",
    "ponte": "rainbow light bridge",
    "fauna": {
     "ave": "white dove",
     "borboleta": "light moth",
     "peixe": "golden fish",
     "bicho": "small white fox"
    }
   },
   "luz": {
    "tom": "#fff8e0",
    "forca": 0.04,
    "noite": 0
   },
   "objetos": [
    "cristal",
    "vaso",
    "rocha",
    "gelo",
    "metal",
    "arvore"
   ]
  },
  {
   "id": "reino_sombra",
   "era": "elementais",
   "nome": "Reino da Sombra",
   "elemento": "sombra",
   "inimigos": [
    "Elementais menores da Sombra",
    "Sentinelas do reino",
    "Ecos de monstros derrotados"
   ],
   "mini_chefe": "Sentinela da Sombra",
   "chefe": "Avatar da Sombra",
   "reliquia": {
    "nome": "Núcleo da Sombra",
    "efeito": "Conta como +1 monstro desse elemento para as sinergias."
   },
   "cenario": "vazio estrelado, ruínas flutuando, névoa violeta",
   "humor": null,
   "combate": {
    "inimigos": [
     {
      "nome": "Elementais menores da Sombra",
      "corpo": "bolha",
      "andar": "flutua",
      "golpe": "contato",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     },
     {
      "nome": "Sentinelas do reino",
      "corpo": "golem",
      "andar": "marcha",
      "golpe": "bote",
      "morte": "estilhaca",
      "mania": "finge_estatua",
      "detalhes": [
       "runas",
       "elmo"
      ]
     },
     {
      "nome": "Ecos de monstros derrotados",
      "corpo": "espectro",
      "andar": "flutua",
      "golpe": "bote",
      "morte": "evapora",
      "mania": "",
      "detalhes": [
       "brilho"
      ]
     }
    ],
    "mini": {
     "corpo": "golem",
     "detalhes": [
      "runas",
      "elmo",
      "olho_unico"
     ],
     "golpes": [
      {
       "nome": "Passo Sombrio",
       "tipo": "teleporte",
       "desc": "Some e reaparece perto."
      }
     ],
     "fase2": null,
     "mania": ""
    },
    "chefe": {
     "corpo": "espectro",
     "detalhes": [
      "olho_unico",
      "brilho",
      "coroa"
     ],
     "golpes": [
      {
       "nome": "Vazio",
       "tipo": "vortice",
       "desc": "O vazio puxa tudo para dentro.",
       "r": 120,
       "dur": 4,
       "forca": 60,
       "solo": "sombra"
      },
      {
       "nome": "Mãos das Sombras",
       "tipo": "tentaculos",
       "desc": "Mãos de sombra sobem do chão.",
       "n": 7,
       "r": 14,
       "intervalo": 0.4,
       "solo": "sombra"
      }
     ],
     "fase2": {
      "nome": "Eclipse Eterno",
      "op": "escurecer",
      "desc": "A luz some."
     },
     "mania": ""
    }
   },
   "kit": {
    "vento": 16,
    "rajada": 0.3,
    "veg": "cogumelo",
    "dens": 0.15,
    "part": [
     "esporos"
    ],
    "props": {
     "rocha": 2,
     "cristal": 1
    },
    "nevoa": "#5a3a88",
    "chao": [
     "rachaduras"
    ],
    "cogu": "#7a4fb0",
    "cristal": "#8a5ad0",
    "caverna": true,
    "nuvens": false
   },
   "arte": {
    "estilo": "Elemental Realm of Shadow: starry void, floating ruins, violet mist, black stone",
    "chao": "dark stone fragments floating over starry void",
    "marcos": [
     "floating ruin",
     "void crystal",
     "broken arch",
     "shadow tree",
     "eye statue",
     "chain pillar"
    ],
    "luz": "violet void flame",
    "frente": "broken pillar",
    "enfeites": [
     "void shard",
     "star speck",
     "chain link",
     "purple flame",
     "black feather",
     "ruin chip",
     "eye glint",
     "mist puff"
    ]
   },
   "estrutura": {
    "zona": 320,
    "pecas": {
     "abismo": 0.38,
     "lago": 0.15,
     "praca": 0.15,
     "construcao": 0.14
    },
    "chance_ponte": 0.6,
    "lago_solo": "sombra",
    "piso": "dark stone fragments with violet cracks and star specks",
    "fundo": "a starry void far below with nebulae and floating rocks",
    "paredao": "black stone underside with violet crystal veins dissolving into void",
    "praca": "black stone floor with a violet eye mosaic",
    "lago": "pool of liquid shadow",
    "construcao": "broken void shrine with floating stones",
    "ponte": "chain bridge",
    "fauna": {
     "ave": "shadow crow",
     "borboleta": "void moth",
     "peixe": "shadow fish",
     "bicho": "small eyeball creature"
    }
   },
   "luz": {
    "tom": "#3a2a5a",
    "forca": 0.54,
    "noite": 1
   },
   "objetos": [
    "rocha",
    "cristal",
    "gelo",
    "metal",
    "arvore"
   ]
  }
 ],
 "modificadores": {
  "corrupcao": "O universo é tomado por outro elemento (cores, inimigos e perigos mudam).",
  "invasao": "Inimigos de outro universo invadem este (ex.: valquírias no Japão feudal).",
  "clima": "Noite, tempestade, eclipse ou nevasca mudam a visão e os perigos."
 },
 "hub": {
  "nome": "Nexo entre os Reinos",
  "moeda": "Essência",
  "estacoes": [
   [
    "Altar dos Ecos",
    "Melhorias permanentes pequenas (vida, XP, sorte)."
   ],
   [
    "Bestiário",
    "Coleção de monstros desbloqueados; escolha do lendário fixo da run."
   ],
   [
    "Ateliê",
    "Troca de skins por raridade."
   ],
   [
    "Mesa dos Juramentos",
    "Ativa penalidades voluntárias em troca de mais Essência."
   ],
   [
    "Portal das Eras",
    "Início de run; atalhos para Eras já alcançadas."
   ]
  ],
  "desbloqueio_monstro": "Vencer o chefe de um universo pela primeira vez libera as linhas daquele universo no sorteio.",
  "lendarios": "Encontro raro na run; conquistas permitem fixar 1 lendário por run.",
  "profundidade": "Recorde = número de mapas atravessados na run."
 },
 "materiais": {
  "vaso": {
   "nome": "Vaso",
   "m": 6,
   "r": 4,
   "hp": 0.35,
   "mu": 0.5,
   "e": 0.1,
   "fragil": 110,
   "res": {
    "terra": 1.5
   },
   "afunda": true,
   "frag": "ceramica"
  },
  "caixote": {
   "nome": "Caixote",
   "m": 18,
   "r": 5,
   "hp": 1.1,
   "mu": 0.55,
   "e": 0.15,
   "fragil": 260,
   "inflam": true,
   "queimaT": 7,
   "res": {
    "terra": 1.3,
    "natureza": 0.6
   },
   "flutua": true,
   "frag": "madeira"
  },
  "barril": {
   "nome": "Barril",
   "m": 30,
   "r": 5,
   "hp": 1.5,
   "mu": 0.5,
   "rola": 0.03,
   "e": 0.25,
   "fragil": 300,
   "inflam": true,
   "queimaT": 9,
   "res": {
    "_": 0.8,
    "terra": 1.2
   },
   "flutua": true,
   "frag": "madeira"
  },
  "polvora": {
   "nome": "Barril de pólvora",
   "m": 30,
   "r": 5,
   "hp": 0.6,
   "mu": 0.5,
   "rola": 0.03,
   "e": 0.25,
   "fragil": 240,
   "inflam": true,
   "explode": true,
   "res": {
    "_": 0.8
   },
   "flutua": true,
   "frag": "madeira"
  },
  "feno": {
   "nome": "Fardo de feno",
   "m": 9,
   "r": 5,
   "hp": 0.5,
   "mu": 0.6,
   "e": 0.05,
   "fragil": 999,
   "inflam": true,
   "queimaT": 4,
   "area": 11,
   "flutua": true,
   "frag": "palha"
  },
  "fruta": {
   "nome": "Fruta",
   "m": 4,
   "r": 3,
   "hp": 0.2,
   "mu": 0.4,
   "rola": 0.08,
   "e": 0.3,
   "fragil": 150,
   "area": 4,
   "flutua": true,
   "frag": "fruta"
  },
  "rocha": {
   "nome": "Rocha",
   "m": 260,
   "r": 7,
   "hp": 6,
   "mu": 0.7,
   "e": 0.1,
   "fragil": 9999,
   "res": {
    "_": 0.5,
    "terra": 2.5,
    "raio": 0.4,
    "fogo": 0.3,
    "agua": 0.3
   },
   "afunda": true,
   "frag": "pedra"
  },
  "gelo": {
   "nome": "Bloco de gelo",
   "m": 40,
   "r": 6,
   "hp": 2,
   "mu": 0.06,
   "e": 0.15,
   "fragil": 280,
   "derrete": true,
   "res": {
    "fogo": 2.5,
    "terra": 1.4,
    "agua": 0.3
   },
   "flutua": true,
   "frag": "gelo"
  },
  "cristal": {
   "nome": "Cristal",
   "m": 1000000000,
   "r": 5,
   "hp": 1.5,
   "mu": 1,
   "e": 0.1,
   "fragil": 9999,
   "fixo": true,
   "res": {
    "terra": 2,
    "raio": 0.5,
    "luz": 0.5
   },
   "frag": "cristal"
  },
  "metal": {
   "nome": "Metal",
   "m": 1000000000,
   "r": 5,
   "hp": 1,
   "mu": 1,
   "e": 0.3,
   "fragil": 9999,
   "fixo": true,
   "indestrutivel": true,
   "condutor": true,
   "frag": "metal"
  },
  "arvore": {
   "nome": "Árvore",
   "m": 1000000000,
   "r": 5,
   "hp": 2.5,
   "mu": 1,
   "e": 0.1,
   "fragil": 9999,
   "fixo": true,
   "inflam": true,
   "queimaT": 12,
   "res": {
    "fogo": 1.5,
    "terra": 1.2
   },
   "frag": "madeira"
  },
  "tronco": {
   "nome": "Tronco",
   "m": 60,
   "r": 5,
   "hp": 2,
   "mu": 0.6,
   "rola": 0.05,
   "e": 0.2,
   "fragil": 9999,
   "inflam": true,
   "queimaT": 10,
   "flutua": true,
   "frag": "madeira"
  },
  "ovo": {
   "nome": "Ovo",
   "m": 3,
   "r": 3,
   "hp": 0.3,
   "mu": 0.4,
   "rola": 0.1,
   "e": 0.2,
   "fragil": 120,
   "afunda": true,
   "frag": "ceramica"
  },
  "marco": {
   "nome": "Marco",
   "m": 1000000000.0,
   "r": 7,
   "hp": 1,
   "mu": 1,
   "e": 0.1,
   "fragil": 9999,
   "fixo": true,
   "indestrutivel": true,
   "frag": "pedra"
  },
  "luz": {
   "nome": "Luz",
   "m": 1000000000.0,
   "r": 3,
   "hp": 1,
   "mu": 1,
   "e": 0.1,
   "fragil": 9999,
   "fixo": true,
   "indestrutivel": true,
   "frag": "metal"
  },
  "construcao": {
   "nome": "Construção",
   "m": 1000000000.0,
   "r": 18,
   "hp": 1,
   "mu": 1,
   "e": 0.1,
   "fragil": 9999,
   "fixo": true,
   "indestrutivel": true,
   "frag": "pedra"
  },
  "frente": {
   "nome": "Primeiro plano",
   "m": 1000000000.0,
   "r": 0,
   "hp": 1,
   "mu": 1,
   "e": 0.1,
   "fragil": 9999,
   "fixo": true,
   "indestrutivel": true,
   "fantasma": true,
   "frag": "madeira"
  }
 },
 "poderes": {
  "encaixes": 4,
  "chance_carta": 0.35,
  "chance_carta_sem_poder": 0.35,
  "forca_desperto": 1.4,
  "forca_uniao": 1.15,
  "talismas": {
   "coracao": {
    "nome": "Coração de Brasa",
    "efeito": "dano",
    "valor": 0.06,
    "inicial": true,
    "texto": "+6% de dano"
   },
   "escama": {
    "nome": "Escama Antiga",
    "efeito": "defesa",
    "valor": 0.04,
    "inicial": true,
    "texto": "−4% de dano recebido"
   },
   "ampulheta": {
    "nome": "Ampulheta de Areia",
    "efeito": "recarga",
    "valor": 0.04,
    "inicial": true,
    "texto": "−4% de recarga"
   },
   "lente": {
    "nome": "Lente do Oráculo",
    "efeito": "area",
    "valor": 0.07,
    "inicial": true,
    "texto": "+7% de área"
   },
   "ambar": {
    "nome": "Âmbar Imantado",
    "efeito": "coleta",
    "valor": 0.15,
    "inicial": true,
    "texto": "+15% de alcance de coleta"
   },
   "calice": {
    "nome": "Cálice da Vida",
    "efeito": "regen",
    "valor": 0.002,
    "inicial": true,
    "texto": "+0,2% de vida por segundo"
   },
   "fio": {
    "nome": "Fio das Moiras",
    "efeito": "duracao",
    "valor": 0.08,
    "inicial": false,
    "texto": "+8% de duração"
   },
   "espelho": {
    "nome": "Espelho Gêmeo",
    "efeito": "projeteis",
    "valor": 1,
    "inicial": false,
    "texto": "+1 projétil ou servo nos níveis 2 e 5"
   },
   "pena": {
    "nome": "Pena de Grifo",
    "efeito": "velocidade",
    "valor": 0.05,
    "inicial": false,
    "texto": "+5% de velocidade"
   },
   "trevo": {
    "nome": "Trevo de Avalon",
    "efeito": "critico",
    "valor": 0.03,
    "inicial": false,
    "texto": "+3% de chance de crítico"
   },
   "coroa": {
    "nome": "Coroa de Louros",
    "efeito": "xp",
    "valor": 0.05,
    "inicial": false,
    "texto": "+5% de XP"
   },
   "mascara": {
    "nome": "Máscara de Pedra",
    "efeito": "risco",
    "valor": 0.08,
    "inicial": false,
    "texto": "inimigos +8% de vida e +4% de velocidade; +10% de XP"
   }
  },
  "despertos": [
   {
    "classe": "guardiao",
    "poder": "b",
    "talisma": "escama",
    "nome": "Égide Refletora",
    "desc": "Devolve em onda 25% do dano que a equipe recebeu nos últimos 3 s"
   },
   {
    "classe": "guardiao",
    "poder": "h1",
    "talisma": "calice",
    "nome": "Grito do Bastião",
    "desc": "Atrai num raio maior; cada inimigo atraído cura a equipe em 0,3%"
   },
   {
    "classe": "guardiao",
    "poder": "h2",
    "talisma": "lente",
    "nome": "Fortaleza Viva",
    "desc": "Muralha 35% maior que fere e empurra quem encosta"
   },
   {
    "classe": "guerreiro",
    "poder": "b",
    "talisma": "coracao",
    "nome": "Ciclone de Aço",
    "desc": "Giro contínuo que puxa os inimigos para dentro"
   },
   {
    "classe": "guerreiro",
    "poder": "h1",
    "talisma": "pena",
    "nome": "Estouro do Cometa",
    "desc": "A investida deixa um rastro que explode; recarrega ao derrotar uma elite"
   },
   {
    "classe": "guerreiro",
    "poder": "h2",
    "talisma": "trevo",
    "nome": "Fúria Berserker",
    "desc": "Na Fúria, críticos causam 2,5 vezes o dano e roubam 5% de vida"
   },
   {
    "classe": "assassino",
    "poder": "b",
    "talisma": "espelho",
    "nome": "Leque de Sombras",
    "desc": "3 lâminas que ricocheteiam entre inimigos"
   },
   {
    "classe": "assassino",
    "poder": "h1",
    "talisma": "ampulheta",
    "nome": "Passo Fantasma",
    "desc": "Salta em cadeia por até 4 alvos"
   },
   {
    "classe": "assassino",
    "poder": "h2",
    "talisma": "mascara",
    "nome": "Sentença",
    "desc": "A explosão da marca marca os vizinhos, em cadeia"
   },
   {
    "classe": "cacador",
    "poder": "b",
    "talisma": "pena",
    "nome": "Flecha Cadente",
    "desc": "Flechas perfuram tudo em linha e caem em chuva no fim do alcance"
   },
   {
    "classe": "cacador",
    "poder": "h1",
    "talisma": "espelho",
    "nome": "Tempestade de Penas",
    "desc": "Leque de 9 projéteis que gira em volta"
   },
   {
    "classe": "cacador",
    "poder": "h2",
    "talisma": "trevo",
    "nome": "Campo Minado",
    "desc": "Cada armadilha que explode planta outra"
   },
   {
    "classe": "mago",
    "poder": "b",
    "talisma": "ampulheta",
    "nome": "Constelação",
    "desc": "3 orbes que orbitam e disparam sozinhos"
   },
   {
    "classe": "mago",
    "poder": "h1",
    "talisma": "coracao",
    "nome": "Cataclismo Menor",
    "desc": "Rajada dupla; a segunda cai no grupo mais denso"
   },
   {
    "classe": "mago",
    "poder": "h2",
    "talisma": "lente",
    "nome": "Selo Arcano Maior",
    "desc": "Círculo que segue o Invocador e dobra a força das reações dentro dele"
   },
   {
    "classe": "invocador",
    "poder": "b",
    "talisma": "ambar",
    "nome": "Coletores",
    "desc": "Servos trazem cristais e explodem ao cair"
   },
   {
    "classe": "invocador",
    "poder": "h1",
    "talisma": "coroa",
    "nome": "Legião",
    "desc": "Leva 50% maior; servos ficam mais fortes a cada abate"
   },
   {
    "classe": "invocador",
    "poder": "h2",
    "talisma": "fio",
    "nome": "Portal Eterno",
    "desc": "O portal dura o dobro e se move para o grupo mais denso"
   },
   {
    "classe": "mistico",
    "poder": "b",
    "talisma": "coroa",
    "nome": "Raio Prismático",
    "desc": "O raio salta entre 3 inimigos e cura 3 aliados"
   },
   {
    "classe": "mistico",
    "poder": "h1",
    "talisma": "fio",
    "nome": "Jardim Sagrado",
    "desc": "A área de cura também enraíza inimigos"
   },
   {
    "classe": "mistico",
    "poder": "h2",
    "talisma": "calice",
    "nome": "Fênix",
    "desc": "Renasce com 60% de vida e explosão de luz, até 2 vezes por mapa"
   },
   {
    "classe": "xama",
    "poder": "b",
    "talisma": "escama",
    "nome": "Totem de Pedra",
    "desc": "Totem com vida própria que atrai os inimigos"
   },
   {
    "classe": "xama",
    "poder": "h1",
    "talisma": "mascara",
    "nome": "Canto de Guerra",
    "desc": "A aura acelera e dá +20% de dano; atrai mais inimigos"
   },
   {
    "classe": "xama",
    "poder": "h2",
    "talisma": "ambar",
    "nome": "Espírito Coletor",
    "desc": "O espírito recolhe cristais e aplica o elemento em área"
   }
  ],
  "unioes": [
   {
    "a": "Fortaleza Viva",
    "b": "Jardim Sagrado",
    "nome": "Santuário",
    "desc": "A muralha cura quem está dentro e enraíza quem está fora"
   },
   {
    "a": "Tempestade de Penas",
    "b": "Constelação",
    "nome": "Chuva de Estrelas",
    "desc": "Os orbes disparam leques de penas em todas as direções"
   },
   {
    "a": "Sentença",
    "b": "Legião",
    "nome": "Legião das Sombras",
    "desc": "Inimigos executados viram servos"
   },
   {
    "a": "Estouro do Cometa",
    "b": "Canto de Guerra",
    "nome": "Estouro da Manada",
    "desc": "Espíritos de animais avançam junto com cada investida"
   },
   {
    "a": "Selo Arcano Maior",
    "b": "Espírito Coletor",
    "nome": "Círculo Primordial",
    "desc": "O círculo carrega os 2 elementos da equipe e dispara reação sozinho"
   },
   {
    "a": "Égide Refletora",
    "b": "Fênix",
    "nome": "Égide da Fênix",
    "desc": "Ao renascer, a equipe ganha um escudo que reflete dano por 8 s"
   }
  ]
 },
 "conquistas": [
  {
   "id": "egito:chefe",
   "categoria": "mapa",
   "universo": "egito",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Apep, Serpente do Caos",
   "texto": "Vencer Apep, Serpente do Caos",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "egito:desafio",
   "categoria": "mapa",
   "universo": "egito",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Apep, Serpente do Caos",
   "texto": "Vencer Apep, Serpente do Caos sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "egito:cenario",
   "categoria": "mapa",
   "universo": "egito",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 15,
   "insignia": "prata",
   "nome": "Saqueador do Duat",
   "texto": "Quebrar 15 jarros",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "egito:mestria",
   "categoria": "mapa",
   "universo": "egito",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Duat",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "egito:secreta",
   "categoria": "mapa",
   "universo": "egito",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 8,
   "insignia": "secreta",
   "nome": "Olhos de Íbis",
   "texto": "Assustar 8 bichos do Duat",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "egito:chamado",
   "categoria": "mapa",
   "universo": "egito",
   "ladrilho": 5,
   "evento": "queda",
   "n": 20,
   "insignia": "secreta",
   "nome": "Poços do Duat",
   "texto": "Jogar 20 inimigos nos poços",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "grecia:chefe",
   "categoria": "mapa",
   "universo": "grecia",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Tifão",
   "texto": "Vencer Tifão",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "grecia:desafio",
   "categoria": "mapa",
   "universo": "grecia",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Tifão",
   "texto": "Vencer Tifão sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "grecia:cenario",
   "categoria": "mapa",
   "universo": "grecia",
   "ladrilho": 2,
   "evento": "quebra:rocha",
   "n": 4,
   "insignia": "prata",
   "nome": "Montanhas Partidas",
   "texto": "Quebrar 4 rochas",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "grecia:mestria",
   "categoria": "mapa",
   "universo": "grecia",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Santuário dos 12 Signos",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "grecia:secreta",
   "categoria": "mapa",
   "universo": "grecia",
   "ladrilho": 4,
   "evento": "abate:0",
   "n": 120,
   "insignia": "secreta",
   "nome": "Falange Desfeita",
   "texto": "Derrotar 120 esqueletos hoplitas",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "grecia:chamado",
   "categoria": "mapa",
   "universo": "grecia",
   "ladrilho": 5,
   "evento": "elite",
   "n": 12,
   "insignia": "secreta",
   "nome": "Os Doze Trabalhos",
   "texto": "Derrotar 12 elites no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "mesopotamia:chefe",
   "categoria": "mapa",
   "universo": "mesopotamia",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Humbaba, Guardião da Floresta de Cedros",
   "texto": "Vencer Humbaba, Guardião da Floresta de Cedros",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "mesopotamia:desafio",
   "categoria": "mapa",
   "universo": "mesopotamia",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Humbaba, Guardião da Floresta de Cedros",
   "texto": "Vencer Humbaba, Guardião da Floresta de Cedros sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "mesopotamia:cenario",
   "categoria": "mapa",
   "universo": "mesopotamia",
   "ladrilho": 2,
   "evento": "quebra:arvore",
   "n": 6,
   "insignia": "prata",
   "nome": "Lenhador de Cedros",
   "texto": "Derrubar 6 cedros",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "mesopotamia:mestria",
   "categoria": "mapa",
   "universo": "mesopotamia",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Babilônia",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "mesopotamia:secreta",
   "categoria": "mapa",
   "universo": "mesopotamia",
   "ladrilho": 4,
   "evento": "abate:2",
   "n": 30,
   "insignia": "secreta",
   "nome": "Leões Despertos",
   "texto": "Derrotar 30 leões alados de pedra",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "mesopotamia:chamado",
   "categoria": "mapa",
   "universo": "mesopotamia",
   "ladrilho": 5,
   "evento": "reacao",
   "n": 25,
   "insignia": "secreta",
   "nome": "Epopeia",
   "texto": "Provocar 25 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "china:chefe",
   "categoria": "mapa",
   "universo": "china",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer O Rei Macaco",
   "texto": "Vencer O Rei Macaco",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "china:desafio",
   "categoria": "mapa",
   "universo": "china",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: O Rei Macaco",
   "texto": "Vencer O Rei Macaco sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "china:cenario",
   "categoria": "mapa",
   "universo": "china",
   "ladrilho": 2,
   "evento": "explosao",
   "n": 5,
   "insignia": "prata",
   "nome": "Ano Novo",
   "texto": "Explodir 5 barris de fogos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "china:mestria",
   "categoria": "mapa",
   "universo": "china",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Montanhas Kunlun",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "china:secreta",
   "categoria": "mapa",
   "universo": "china",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 10,
   "insignia": "secreta",
   "nome": "Lago das Carpas",
   "texto": "Assustar 10 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "china:chamado",
   "categoria": "mapa",
   "universo": "china",
   "ladrilho": 5,
   "evento": "queda",
   "n": 15,
   "insignia": "secreta",
   "nome": "Domador das Águas",
   "texto": "Jogar 15 inimigos nos abismos de nuvens",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "persia:chefe",
   "categoria": "mapa",
   "universo": "persia",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Zahhak, o Rei-Serpente",
   "texto": "Vencer Zahhak, o Rei-Serpente",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "persia:desafio",
   "categoria": "mapa",
   "universo": "persia",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Zahhak, o Rei-Serpente",
   "texto": "Vencer Zahhak, o Rei-Serpente sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "persia:cenario",
   "categoria": "mapa",
   "universo": "persia",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 20,
   "insignia": "prata",
   "nome": "Bazar Quebrado",
   "texto": "Quebrar 20 vasos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "persia:mestria",
   "categoria": "mapa",
   "universo": "persia",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Shahnameh",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "persia:secreta",
   "categoria": "mapa",
   "universo": "persia",
   "ladrilho": 4,
   "evento": "abate:2",
   "n": 40,
   "insignia": "secreta",
   "nome": "Tirania Desfeita",
   "texto": "Derrotar 40 serpentes de ombro",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "persia:chamado",
   "categoria": "mapa",
   "universo": "persia",
   "ladrilho": 5,
   "evento": "mini",
   "n": 1,
   "insignia": "secreta",
   "nome": "O Sétimo Trabalho",
   "texto": "Vencer o Div Branco",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "nordico:chefe",
   "categoria": "mapa",
   "universo": "nordico",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Jörmungandr, a Serpente do Mundo",
   "texto": "Vencer Jörmungandr, a Serpente do Mundo",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "nordico:desafio",
   "categoria": "mapa",
   "universo": "nordico",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Jörmungandr, a Serpente do Mundo",
   "texto": "Vencer Jörmungandr, a Serpente do Mundo sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "nordico:cenario",
   "categoria": "mapa",
   "universo": "nordico",
   "ladrilho": 2,
   "evento": "quebra:gelo",
   "n": 6,
   "insignia": "prata",
   "nome": "Degelo",
   "texto": "Quebrar 6 blocos de gelo",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "nordico:mestria",
   "categoria": "mapa",
   "universo": "nordico",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Ragnarök",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "nordico:secreta",
   "categoria": "mapa",
   "universo": "nordico",
   "ladrilho": 4,
   "evento": "petrificado",
   "n": 5,
   "insignia": "secreta",
   "nome": "Aurora",
   "texto": "Transformar 5 trolls em pedra com Luz",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "nordico:chamado",
   "categoria": "mapa",
   "universo": "nordico",
   "ladrilho": 5,
   "evento": "abate:1",
   "n": 60,
   "insignia": "secreta",
   "nome": "Matilha Vencida",
   "texto": "Derrotar 60 lobos de gelo",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "celta:chefe",
   "categoria": "mapa",
   "universo": "celta",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Balor do Olho Mortal",
   "texto": "Vencer Balor do Olho Mortal",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "celta:desafio",
   "categoria": "mapa",
   "universo": "celta",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Balor do Olho Mortal",
   "texto": "Vencer Balor do Olho Mortal sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "celta:cenario",
   "categoria": "mapa",
   "universo": "celta",
   "ladrilho": 2,
   "evento": "quebra:feno",
   "n": 8,
   "insignia": "prata",
   "nome": "Colheita",
   "texto": "Quebrar 8 fardos de feno",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "celta:mestria",
   "categoria": "mapa",
   "universo": "celta",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Terras das Brumas",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "celta:secreta",
   "categoria": "mapa",
   "universo": "celta",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 8,
   "insignia": "secreta",
   "nome": "Brumas",
   "texto": "Assustar 8 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "celta:chamado",
   "categoria": "mapa",
   "universo": "celta",
   "ladrilho": 5,
   "evento": "elite",
   "n": 6,
   "insignia": "secreta",
   "nome": "O Cão de Culann",
   "texto": "Derrotar 6 elites no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "tavola:chefe",
   "categoria": "mapa",
   "universo": "tavola",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Morgana",
   "texto": "Vencer Morgana",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "tavola:desafio",
   "categoria": "mapa",
   "universo": "tavola",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Morgana",
   "texto": "Vencer Morgana sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "tavola:cenario",
   "categoria": "mapa",
   "universo": "tavola",
   "ladrilho": 2,
   "evento": "quebra:barril",
   "n": 6,
   "insignia": "prata",
   "nome": "Rolando pelo Pátio",
   "texto": "Quebrar 6 barris",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "tavola:mestria",
   "categoria": "mapa",
   "universo": "tavola",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Távola Redonda e Avalon",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "tavola:secreta",
   "categoria": "mapa",
   "universo": "tavola",
   "ladrilho": 4,
   "evento": "quebra:caixote",
   "n": 15,
   "insignia": "secreta",
   "nome": "Arsenal de Camelot",
   "texto": "Quebrar 15 caixotes",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "tavola:chamado",
   "categoria": "mapa",
   "universo": "tavola",
   "ladrilho": 5,
   "evento": "uniao",
   "n": 1,
   "insignia": "secreta",
   "nome": "A Távola Redonda",
   "texto": "Formar uma União na Távola",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "japao:chefe",
   "categoria": "mapa",
   "universo": "japao",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Yamata no Orochi",
   "texto": "Vencer Yamata no Orochi",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "japao:desafio",
   "categoria": "mapa",
   "universo": "japao",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Yamata no Orochi",
   "texto": "Vencer Yamata no Orochi sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "japao:cenario",
   "categoria": "mapa",
   "universo": "japao",
   "ladrilho": 2,
   "evento": "explosao",
   "n": 4,
   "insignia": "prata",
   "nome": "Festival de Fogos",
   "texto": "Explodir 4 barris de fogos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "japao:mestria",
   "categoria": "mapa",
   "universo": "japao",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Parada Noturna dos Yokais",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "japao:secreta",
   "categoria": "mapa",
   "universo": "japao",
   "ladrilho": 4,
   "evento": "bebado",
   "n": 1,
   "insignia": "secreta",
   "nome": "Saquê de Oito Tonéis",
   "texto": "Deixar o Orochi bêbado",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "japao:chamado",
   "categoria": "mapa",
   "universo": "japao",
   "ladrilho": 5,
   "evento": "abate:2",
   "n": 50,
   "insignia": "secreta",
   "nome": "Corta-Oni",
   "texto": "Derrotar 50 onis menores",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "eslavo:chefe",
   "categoria": "mapa",
   "universo": "eslavo",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Koschei, o Imortal",
   "texto": "Vencer Koschei, o Imortal",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "eslavo:desafio",
   "categoria": "mapa",
   "universo": "eslavo",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Koschei, o Imortal",
   "texto": "Vencer Koschei, o Imortal sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "eslavo:cenario",
   "categoria": "mapa",
   "universo": "eslavo",
   "ladrilho": 2,
   "evento": "quebra:feno",
   "n": 6,
   "insignia": "prata",
   "nome": "Isbá Desfeita",
   "texto": "Quebrar 6 fardos de feno",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "eslavo:mestria",
   "categoria": "mapa",
   "universo": "eslavo",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Floresta Eslava",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "eslavo:secreta",
   "categoria": "mapa",
   "universo": "eslavo",
   "ladrilho": 4,
   "evento": "ovo_morte",
   "n": 1,
   "insignia": "secreta",
   "nome": "A Agulha no Ovo",
   "texto": "Quebrar o ovo da morte do Koschei",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "eslavo:chamado",
   "categoria": "mapa",
   "universo": "eslavo",
   "ladrilho": 5,
   "evento": "abate:2",
   "n": 50,
   "insignia": "secreta",
   "nome": "Rainha da Estepe",
   "texto": "Derrotar 50 lobos cinzentos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "mil_noites:chefe",
   "categoria": "mapa",
   "universo": "mil_noites",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer O Gigante de Bronze da Cidade de Latão",
   "texto": "Vencer O Gigante de Bronze da Cidade de Latão",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "mil_noites:desafio",
   "categoria": "mapa",
   "universo": "mil_noites",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: O Gigante de Bronze da Cidade de Latão",
   "texto": "Vencer O Gigante de Bronze da Cidade de Latão sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "mil_noites:cenario",
   "categoria": "mapa",
   "universo": "mil_noites",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 20,
   "insignia": "prata",
   "nome": "Tesouro da Caverna",
   "texto": "Quebrar 20 vasos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "mil_noites:mestria",
   "categoria": "mapa",
   "universo": "mil_noites",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Mil e Uma Noites",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "mil_noites:secreta",
   "categoria": "mapa",
   "universo": "mil_noites",
   "ladrilho": 4,
   "evento": "abate:0",
   "n": 40,
   "insignia": "secreta",
   "nome": "Os Quarenta",
   "texto": "Derrotar 40 ladrões do deserto",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "mil_noites:chamado",
   "categoria": "mapa",
   "universo": "mil_noites",
   "ladrilho": 5,
   "evento": "onda",
   "n": 3,
   "insignia": "secreta",
   "nome": "Mil e Uma Noites",
   "texto": "Sobreviver a 3 ondas especiais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "amazonia:chefe",
   "categoria": "mapa",
   "universo": "amazonia",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Mapinguari",
   "texto": "Vencer Mapinguari",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "amazonia:desafio",
   "categoria": "mapa",
   "universo": "amazonia",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Mapinguari",
   "texto": "Vencer Mapinguari sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "amazonia:cenario",
   "categoria": "mapa",
   "universo": "amazonia",
   "ladrilho": 2,
   "evento": "quebra:fruta",
   "n": 10,
   "insignia": "prata",
   "nome": "Chuva de Cocos",
   "texto": "Quebrar 10 cocos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "amazonia:mestria",
   "categoria": "mapa",
   "universo": "amazonia",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Amazônia Encantada",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "amazonia:secreta",
   "categoria": "mapa",
   "universo": "amazonia",
   "ladrilho": 4,
   "evento": "saci",
   "n": 1,
   "insignia": "secreta",
   "nome": "Pega o Saci",
   "texto": "Derrotar o Saci depois de ele roubar cristais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "amazonia:chamado",
   "categoria": "mapa",
   "universo": "amazonia",
   "ladrilho": 5,
   "evento": "fauna",
   "n": 15,
   "insignia": "secreta",
   "nome": "Lua no Rio",
   "texto": "Assustar 15 bichos da mata",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "xibalba:chefe",
   "categoria": "mapa",
   "universo": "xibalba",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Camazotz, o Morcego da Morte",
   "texto": "Vencer Camazotz, o Morcego da Morte",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "xibalba:desafio",
   "categoria": "mapa",
   "universo": "xibalba",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Camazotz, o Morcego da Morte",
   "texto": "Vencer Camazotz, o Morcego da Morte sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "xibalba:cenario",
   "categoria": "mapa",
   "universo": "xibalba",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 12,
   "insignia": "prata",
   "nome": "Oferendas",
   "texto": "Quebrar 12 vasos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "xibalba:mestria",
   "categoria": "mapa",
   "universo": "xibalba",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Xibalba",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "xibalba:secreta",
   "categoria": "mapa",
   "universo": "xibalba",
   "ladrilho": 4,
   "evento": "abate:1",
   "n": 60,
   "insignia": "secreta",
   "nome": "Casa dos Morcegos",
   "texto": "Derrotar 60 morcegos-navalha",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "xibalba:chamado",
   "categoria": "mapa",
   "universo": "xibalba",
   "ladrilho": 5,
   "evento": "mini",
   "n": 1,
   "insignia": "secreta",
   "nome": "O Jogo de Bola",
   "texto": "Vencer o Senhor do Jogo de Bola",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "tenochtitlan:chefe",
   "categoria": "mapa",
   "universo": "tenochtitlan",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Quetzalcoatl",
   "texto": "Vencer Quetzalcoatl",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "tenochtitlan:desafio",
   "categoria": "mapa",
   "universo": "tenochtitlan",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Quetzalcoatl",
   "texto": "Vencer Quetzalcoatl sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "tenochtitlan:cenario",
   "categoria": "mapa",
   "universo": "tenochtitlan",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 15,
   "insignia": "prata",
   "nome": "Mercado de Tlatelolco",
   "texto": "Quebrar 15 vasos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "tenochtitlan:mestria",
   "categoria": "mapa",
   "universo": "tenochtitlan",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Tenochtitlán",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "tenochtitlan:secreta",
   "categoria": "mapa",
   "universo": "tenochtitlan",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 10,
   "insignia": "secreta",
   "nome": "Asas da Lagoa",
   "texto": "Assustar 10 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "tenochtitlan:chamado",
   "categoria": "mapa",
   "universo": "tenochtitlan",
   "ladrilho": 5,
   "evento": "queda",
   "n": 20,
   "insignia": "secreta",
   "nome": "Os Diques",
   "texto": "Jogar 20 inimigos nos canais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "andes:chefe",
   "categoria": "mapa",
   "universo": "andes",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Gigante de Tiwanaku",
   "texto": "Vencer Gigante de Tiwanaku",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "andes:desafio",
   "categoria": "mapa",
   "universo": "andes",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Gigante de Tiwanaku",
   "texto": "Vencer Gigante de Tiwanaku sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "andes:cenario",
   "categoria": "mapa",
   "universo": "andes",
   "ladrilho": 2,
   "evento": "quebra:rocha",
   "n": 6,
   "insignia": "prata",
   "nome": "Pedra sobre Pedra",
   "texto": "Quebrar 6 rochas",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "andes:mestria",
   "categoria": "mapa",
   "universo": "andes",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Cidade nas Nuvens",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "andes:secreta",
   "categoria": "mapa",
   "universo": "andes",
   "ladrilho": 4,
   "evento": "pururauca",
   "n": 10,
   "insignia": "secreta",
   "nome": "Pururaucas",
   "texto": "Fazer 10 guerreiros de pedra voltarem a ser pedra",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "andes:chamado",
   "categoria": "mapa",
   "universo": "andes",
   "ladrilho": 5,
   "evento": "queda",
   "n": 20,
   "insignia": "secreta",
   "nome": "Bastão de Ouro",
   "texto": "Jogar 20 inimigos nos desfiladeiros",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "polinesia:chefe",
   "categoria": "mapa",
   "universo": "polinesia",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Te Wheke, o Polvo Gigante",
   "texto": "Vencer Te Wheke, o Polvo Gigante",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "polinesia:desafio",
   "categoria": "mapa",
   "universo": "polinesia",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Te Wheke, o Polvo Gigante",
   "texto": "Vencer Te Wheke, o Polvo Gigante sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "polinesia:cenario",
   "categoria": "mapa",
   "universo": "polinesia",
   "ladrilho": 2,
   "evento": "quebra:fruta",
   "n": 10,
   "insignia": "prata",
   "nome": "Coqueiral",
   "texto": "Quebrar 10 cocos",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "polinesia:mestria",
   "categoria": "mapa",
   "universo": "polinesia",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Ilhas do Fogo",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "polinesia:secreta",
   "categoria": "mapa",
   "universo": "polinesia",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 8,
   "insignia": "secreta",
   "nome": "Recife Vivo",
   "texto": "Assustar 8 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "polinesia:chamado",
   "categoria": "mapa",
   "universo": "polinesia",
   "ladrilho": 5,
   "evento": "reacao",
   "n": 25,
   "insignia": "secreta",
   "nome": "Navegador das Estrelas",
   "texto": "Provocar 25 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "cabo_tormentas:chefe",
   "categoria": "mapa",
   "universo": "cabo_tormentas",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Adamastor",
   "texto": "Vencer Adamastor",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "cabo_tormentas:desafio",
   "categoria": "mapa",
   "universo": "cabo_tormentas",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Adamastor",
   "texto": "Vencer Adamastor sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "cabo_tormentas:cenario",
   "categoria": "mapa",
   "universo": "cabo_tormentas",
   "ladrilho": 2,
   "evento": "quebra:barril",
   "n": 8,
   "insignia": "prata",
   "nome": "Carga ao Mar",
   "texto": "Quebrar 8 barris",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "cabo_tormentas:mestria",
   "categoria": "mapa",
   "universo": "cabo_tormentas",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Cabo das Tormentas",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "cabo_tormentas:secreta",
   "categoria": "mapa",
   "universo": "cabo_tormentas",
   "ladrilho": 4,
   "evento": "relampago",
   "n": 10,
   "insignia": "secreta",
   "nome": "Olho da Tormenta",
   "texto": "Sobreviver a 10 relâmpagos por perto",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "cabo_tormentas:chamado",
   "categoria": "mapa",
   "universo": "cabo_tormentas",
   "ladrilho": 5,
   "evento": "queda",
   "n": 20,
   "insignia": "secreta",
   "nome": "Dobrar o Cabo",
   "texto": "Jogar 20 inimigos no mar",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "caribe:chefe",
   "categoria": "mapa",
   "universo": "caribe",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer O Holandês Voador",
   "texto": "Vencer O Holandês Voador",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "caribe:desafio",
   "categoria": "mapa",
   "universo": "caribe",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: O Holandês Voador",
   "texto": "Vencer O Holandês Voador sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "caribe:cenario",
   "categoria": "mapa",
   "universo": "caribe",
   "ladrilho": 2,
   "evento": "explosao",
   "n": 8,
   "insignia": "prata",
   "nome": "Paiol",
   "texto": "Explodir 8 barris de pólvora",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "caribe:mestria",
   "categoria": "mapa",
   "universo": "caribe",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Caribe Amaldiçoado",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "caribe:secreta",
   "categoria": "mapa",
   "universo": "caribe",
   "ladrilho": 4,
   "evento": "abate:2",
   "n": 30,
   "insignia": "secreta",
   "nome": "Bico Calado",
   "texto": "Derrotar 30 papagaios encrenqueiros",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "caribe:chamado",
   "categoria": "mapa",
   "universo": "caribe",
   "ladrilho": 5,
   "evento": "explosao",
   "n": 20,
   "insignia": "secreta",
   "nome": "Pavios na Barba",
   "texto": "Explodir 20 barris de pólvora no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "mar_profundo:chefe",
   "categoria": "mapa",
   "universo": "mar_profundo",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Caríbdis, o Redemoinho",
   "texto": "Vencer Caríbdis, o Redemoinho",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "mar_profundo:desafio",
   "categoria": "mapa",
   "universo": "mar_profundo",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Caríbdis, o Redemoinho",
   "texto": "Vencer Caríbdis, o Redemoinho sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "mar_profundo:cenario",
   "categoria": "mapa",
   "universo": "mar_profundo",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 10,
   "insignia": "prata",
   "nome": "Ânforas do Naufrágio",
   "texto": "Quebrar 10 ânforas",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "mar_profundo:mestria",
   "categoria": "mapa",
   "universo": "mar_profundo",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Mar Profundo",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "mar_profundo:secreta",
   "categoria": "mapa",
   "universo": "mar_profundo",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 10,
   "insignia": "secreta",
   "nome": "Raias",
   "texto": "Assustar 10 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "mar_profundo:chamado",
   "categoria": "mapa",
   "universo": "mar_profundo",
   "ladrilho": 5,
   "evento": "reacao",
   "n": 30,
   "insignia": "secreta",
   "nome": "Vinte Mil Léguas",
   "texto": "Provocar 30 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "transilvania:chefe",
   "categoria": "mapa",
   "universo": "transilvania",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Conde da Noite Eterna",
   "texto": "Vencer Conde da Noite Eterna",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "transilvania:desafio",
   "categoria": "mapa",
   "universo": "transilvania",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Conde da Noite Eterna",
   "texto": "Vencer Conde da Noite Eterna sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "transilvania:cenario",
   "categoria": "mapa",
   "universo": "transilvania",
   "ladrilho": 2,
   "evento": "quebra:fruta",
   "n": 10,
   "insignia": "prata",
   "nome": "Abóboras",
   "texto": "Esmagar 10 abóboras",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "transilvania:mestria",
   "categoria": "mapa",
   "universo": "transilvania",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Transilvânia",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "transilvania:secreta",
   "categoria": "mapa",
   "universo": "transilvania",
   "ladrilho": 4,
   "evento": "abate:0",
   "n": 80,
   "insignia": "secreta",
   "nome": "Revoada",
   "texto": "Derrotar 80 morcegos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "transilvania:chamado",
   "categoria": "mapa",
   "universo": "transilvania",
   "ladrilho": 5,
   "evento": "elite",
   "n": 8,
   "insignia": "secreta",
   "nome": "Noite Eterna",
   "texto": "Derrotar 8 elites no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "laboratorio:chefe",
   "categoria": "mapa",
   "universo": "laboratorio",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer A Criatura Primordial",
   "texto": "Vencer A Criatura Primordial",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "laboratorio:desafio",
   "categoria": "mapa",
   "universo": "laboratorio",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: A Criatura Primordial",
   "texto": "Vencer A Criatura Primordial sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "laboratorio:cenario",
   "categoria": "mapa",
   "universo": "laboratorio",
   "ladrilho": 2,
   "evento": "raio_metal",
   "n": 5,
   "insignia": "prata",
   "nome": "Para-raios",
   "texto": "Fazer 5 relâmpagos caírem em metal",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "laboratorio:mestria",
   "categoria": "mapa",
   "universo": "laboratorio",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Laboratório da Tempestade",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "laboratorio:secreta",
   "categoria": "mapa",
   "universo": "laboratorio",
   "ladrilho": 4,
   "evento": "abate:2",
   "n": 40,
   "insignia": "secreta",
   "nome": "Curto-circuito",
   "texto": "Derrotar 40 bobinas ambulantes",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "laboratorio:chamado",
   "categoria": "mapa",
   "universo": "laboratorio",
   "ladrilho": 5,
   "evento": "reacao",
   "n": 40,
   "insignia": "secreta",
   "nome": "Centelha da Vida",
   "texto": "Provocar 40 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "floresta_negra:chefe",
   "categoria": "mapa",
   "universo": "floresta_negra",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer A Bruxa da Floresta",
   "texto": "Vencer A Bruxa da Floresta",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "floresta_negra:desafio",
   "categoria": "mapa",
   "universo": "floresta_negra",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: A Bruxa da Floresta",
   "texto": "Vencer A Bruxa da Floresta sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "floresta_negra:cenario",
   "categoria": "mapa",
   "universo": "floresta_negra",
   "ladrilho": 2,
   "evento": "quebra:fruta",
   "n": 10,
   "insignia": "prata",
   "nome": "Abóboras da Bruxa",
   "texto": "Esmagar 10 abóboras",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "floresta_negra:mestria",
   "categoria": "mapa",
   "universo": "floresta_negra",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Floresta dos Contos Sombrios",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "floresta_negra:secreta",
   "categoria": "mapa",
   "universo": "floresta_negra",
   "ladrilho": 4,
   "evento": "abate:2",
   "n": 30,
   "insignia": "secreta",
   "nome": "Esporos",
   "texto": "Estourar 30 cogumelos venenosos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "floresta_negra:chamado",
   "categoria": "mapa",
   "universo": "floresta_negra",
   "ladrilho": 5,
   "evento": "mini",
   "n": 1,
   "insignia": "secreta",
   "nome": "Migalhas",
   "texto": "Destruir a Casa de Doces",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "atlantida:chefe",
   "categoria": "mapa",
   "universo": "atlantida",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer O Rei Afogado",
   "texto": "Vencer O Rei Afogado",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "atlantida:desafio",
   "categoria": "mapa",
   "universo": "atlantida",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: O Rei Afogado",
   "texto": "Vencer O Rei Afogado sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "atlantida:cenario",
   "categoria": "mapa",
   "universo": "atlantida",
   "ladrilho": 2,
   "evento": "quebra:vaso",
   "n": 15,
   "insignia": "prata",
   "nome": "Ânforas de Oricalco",
   "texto": "Quebrar 15 ânforas",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "atlantida:mestria",
   "categoria": "mapa",
   "universo": "atlantida",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Atlântida",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "atlantida:secreta",
   "categoria": "mapa",
   "universo": "atlantida",
   "ladrilho": 4,
   "evento": "reacao",
   "n": 25,
   "insignia": "secreta",
   "nome": "Correntes",
   "texto": "Provocar 25 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "atlantida:chamado",
   "categoria": "mapa",
   "universo": "atlantida",
   "ladrilho": 5,
   "evento": "queda",
   "n": 15,
   "insignia": "secreta",
   "nome": "Tridente",
   "texto": "Jogar 15 inimigos nos abismos do mar",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "eldorado:chefe",
   "categoria": "mapa",
   "universo": "eldorado",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer O Homem Dourado",
   "texto": "Vencer O Homem Dourado",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "eldorado:desafio",
   "categoria": "mapa",
   "universo": "eldorado",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: O Homem Dourado",
   "texto": "Vencer O Homem Dourado sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "eldorado:cenario",
   "categoria": "mapa",
   "universo": "eldorado",
   "ladrilho": 2,
   "evento": "quebra:cristal",
   "n": 5,
   "insignia": "prata",
   "nome": "Garimpo",
   "texto": "Quebrar 5 cristais",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "eldorado:mestria",
   "categoria": "mapa",
   "universo": "eldorado",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de El Dorado",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "eldorado:secreta",
   "categoria": "mapa",
   "universo": "eldorado",
   "ladrilho": 4,
   "evento": "abate:2",
   "n": 50,
   "insignia": "secreta",
   "nome": "Ganância Punida",
   "texto": "Derrotar 50 exploradores amaldiçoados",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "eldorado:chamado",
   "categoria": "mapa",
   "universo": "eldorado",
   "ladrilho": 5,
   "evento": "onda",
   "n": 3,
   "insignia": "secreta",
   "nome": "O Arco-íris",
   "texto": "Sobreviver a 3 ondas especiais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "shangrila:chefe",
   "categoria": "mapa",
   "universo": "shangrila",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Guardião do Vale Eterno",
   "texto": "Vencer Guardião do Vale Eterno",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "shangrila:desafio",
   "categoria": "mapa",
   "universo": "shangrila",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Guardião do Vale Eterno",
   "texto": "Vencer Guardião do Vale Eterno sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "shangrila:cenario",
   "categoria": "mapa",
   "universo": "shangrila",
   "ladrilho": 2,
   "evento": "quebra:gelo",
   "n": 6,
   "insignia": "prata",
   "nome": "Degelo do Vale",
   "texto": "Quebrar 6 blocos de gelo",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "shangrila:mestria",
   "categoria": "mapa",
   "universo": "shangrila",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Vale Eterno",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "shangrila:secreta",
   "categoria": "mapa",
   "universo": "shangrila",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 8,
   "insignia": "secreta",
   "nome": "Vale Sereno",
   "texto": "Assustar 8 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "shangrila:chamado",
   "categoria": "mapa",
   "universo": "shangrila",
   "ladrilho": 5,
   "evento": "queda",
   "n": 20,
   "insignia": "secreta",
   "nome": "Rota da Seda",
   "texto": "Jogar 20 inimigos nos vales",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "centro_terra:chefe",
   "categoria": "mapa",
   "universo": "centro_terra",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Rei do Mundo Subterrâneo",
   "texto": "Vencer Rei do Mundo Subterrâneo",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "centro_terra:desafio",
   "categoria": "mapa",
   "universo": "centro_terra",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Rei do Mundo Subterrâneo",
   "texto": "Vencer Rei do Mundo Subterrâneo sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "centro_terra:cenario",
   "categoria": "mapa",
   "universo": "centro_terra",
   "ladrilho": 2,
   "evento": "quebra:cristal",
   "n": 8,
   "insignia": "prata",
   "nome": "Geodo",
   "texto": "Quebrar 8 cristais",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "centro_terra:mestria",
   "categoria": "mapa",
   "universo": "centro_terra",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Centro da Terra",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "centro_terra:secreta",
   "categoria": "mapa",
   "universo": "centro_terra",
   "ladrilho": 4,
   "evento": "abate:0",
   "n": 60,
   "insignia": "secreta",
   "nome": "Era dos Répteis",
   "texto": "Derrotar 60 dinossauros",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "centro_terra:chamado",
   "categoria": "mapa",
   "universo": "centro_terra",
   "ladrilho": 5,
   "evento": "queda",
   "n": 15,
   "insignia": "secreta",
   "nome": "Ao Centro",
   "texto": "Jogar 15 inimigos no mar subterrâneo",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_fogo:chefe",
   "categoria": "mapa",
   "universo": "reino_fogo",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar do Fogo",
   "texto": "Vencer Avatar do Fogo",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_fogo:desafio",
   "categoria": "mapa",
   "universo": "reino_fogo",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar do Fogo",
   "texto": "Vencer Avatar do Fogo sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_fogo:cenario",
   "categoria": "mapa",
   "universo": "reino_fogo",
   "ladrilho": 2,
   "evento": "explosao",
   "n": 5,
   "insignia": "prata",
   "nome": "Brasa Viva",
   "texto": "Explodir 5 barris",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_fogo:mestria",
   "categoria": "mapa",
   "universo": "reino_fogo",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino do Fogo",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_fogo:secreta",
   "categoria": "mapa",
   "universo": "reino_fogo",
   "ladrilho": 4,
   "evento": "reacao",
   "n": 30,
   "insignia": "secreta",
   "nome": "Fogo Roubado",
   "texto": "Provocar 30 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_fogo:chamado",
   "categoria": "mapa",
   "universo": "reino_fogo",
   "ladrilho": 5,
   "evento": "elite",
   "n": 10,
   "insignia": "secreta",
   "nome": "Titã do Fogo",
   "texto": "Derrotar 10 elites no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_agua:chefe",
   "categoria": "mapa",
   "universo": "reino_agua",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar da Água",
   "texto": "Vencer Avatar da Água",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_agua:desafio",
   "categoria": "mapa",
   "universo": "reino_agua",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar da Água",
   "texto": "Vencer Avatar da Água sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_agua:cenario",
   "categoria": "mapa",
   "universo": "reino_agua",
   "ladrilho": 2,
   "evento": "quebra:gelo",
   "n": 4,
   "insignia": "prata",
   "nome": "Bolhas",
   "texto": "Quebrar 4 blocos de gelo",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_agua:mestria",
   "categoria": "mapa",
   "universo": "reino_agua",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino da Água",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_agua:secreta",
   "categoria": "mapa",
   "universo": "reino_agua",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 10,
   "insignia": "secreta",
   "nome": "Cardume",
   "texto": "Assustar 10 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_agua:chamado",
   "categoria": "mapa",
   "universo": "reino_agua",
   "ladrilho": 5,
   "evento": "reacao",
   "n": 30,
   "insignia": "secreta",
   "nome": "Véu das Ondas",
   "texto": "Provocar 30 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_terra:chefe",
   "categoria": "mapa",
   "universo": "reino_terra",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar da Terra",
   "texto": "Vencer Avatar da Terra",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_terra:desafio",
   "categoria": "mapa",
   "universo": "reino_terra",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar da Terra",
   "texto": "Vencer Avatar da Terra sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_terra:cenario",
   "categoria": "mapa",
   "universo": "reino_terra",
   "ladrilho": 2,
   "evento": "quebra:rocha",
   "n": 8,
   "insignia": "prata",
   "nome": "Cânion",
   "texto": "Quebrar 8 rochas",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_terra:mestria",
   "categoria": "mapa",
   "universo": "reino_terra",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino da Terra",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_terra:secreta",
   "categoria": "mapa",
   "universo": "reino_terra",
   "ladrilho": 4,
   "evento": "quebra:cristal",
   "n": 6,
   "insignia": "secreta",
   "nome": "Âmbar",
   "texto": "Quebrar 6 cristais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_terra:chamado",
   "categoria": "mapa",
   "universo": "reino_terra",
   "ladrilho": 5,
   "evento": "queda",
   "n": 20,
   "insignia": "secreta",
   "nome": "O Peso do Céu",
   "texto": "Jogar 20 inimigos nos cânions",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_ar:chefe",
   "categoria": "mapa",
   "universo": "reino_ar",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar do Ar",
   "texto": "Vencer Avatar do Ar",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_ar:desafio",
   "categoria": "mapa",
   "universo": "reino_ar",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar do Ar",
   "texto": "Vencer Avatar do Ar sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_ar:cenario",
   "categoria": "mapa",
   "universo": "reino_ar",
   "ladrilho": 2,
   "evento": "quebra:feno",
   "n": 6,
   "insignia": "prata",
   "nome": "Vendaval",
   "texto": "Quebrar 6 fardos de feno",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_ar:mestria",
   "categoria": "mapa",
   "universo": "reino_ar",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino do Ar",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_ar:secreta",
   "categoria": "mapa",
   "universo": "reino_ar",
   "ladrilho": 4,
   "evento": "queda",
   "n": 25,
   "insignia": "secreta",
   "nome": "Ilhas no Céu",
   "texto": "Jogar 25 inimigos no céu aberto",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_ar:chamado",
   "categoria": "mapa",
   "universo": "reino_ar",
   "ladrilho": 5,
   "evento": "onda",
   "n": 3,
   "insignia": "secreta",
   "nome": "Asas de Cera",
   "texto": "Sobreviver a 3 ondas especiais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_raio:chefe",
   "categoria": "mapa",
   "universo": "reino_raio",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar do Raio",
   "texto": "Vencer Avatar do Raio",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_raio:desafio",
   "categoria": "mapa",
   "universo": "reino_raio",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar do Raio",
   "texto": "Vencer Avatar do Raio sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_raio:cenario",
   "categoria": "mapa",
   "universo": "reino_raio",
   "ladrilho": 2,
   "evento": "raio_metal",
   "n": 5,
   "insignia": "prata",
   "nome": "Para-raios Vivo",
   "texto": "Fazer 5 relâmpagos caírem em metal",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_raio:mestria",
   "categoria": "mapa",
   "universo": "reino_raio",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino do Raio",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_raio:secreta",
   "categoria": "mapa",
   "universo": "reino_raio",
   "ladrilho": 4,
   "evento": "quebra:cristal",
   "n": 6,
   "insignia": "secreta",
   "nome": "Vidro do Trovão",
   "texto": "Quebrar 6 cristais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_raio:chamado",
   "categoria": "mapa",
   "universo": "reino_raio",
   "ladrilho": 5,
   "evento": "reacao",
   "n": 40,
   "insignia": "secreta",
   "nome": "Forja do Raio",
   "texto": "Provocar 40 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_natureza:chefe",
   "categoria": "mapa",
   "universo": "reino_natureza",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar da Natureza",
   "texto": "Vencer Avatar da Natureza",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_natureza:desafio",
   "categoria": "mapa",
   "universo": "reino_natureza",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar da Natureza",
   "texto": "Vencer Avatar da Natureza sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_natureza:cenario",
   "categoria": "mapa",
   "universo": "reino_natureza",
   "ladrilho": 2,
   "evento": "quebra:fruta",
   "n": 12,
   "insignia": "prata",
   "nome": "Pomar",
   "texto": "Quebrar 12 frutas",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_natureza:mestria",
   "categoria": "mapa",
   "universo": "reino_natureza",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino da Natureza",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_natureza:secreta",
   "categoria": "mapa",
   "universo": "reino_natureza",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 15,
   "insignia": "secreta",
   "nome": "Bosque Vivo",
   "texto": "Assustar 15 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_natureza:chamado",
   "categoria": "mapa",
   "universo": "reino_natureza",
   "ladrilho": 5,
   "evento": "desperto",
   "n": 2,
   "insignia": "secreta",
   "nome": "O Druida",
   "texto": "Despertar 2 poderes no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_luz:chefe",
   "categoria": "mapa",
   "universo": "reino_luz",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar da Luz",
   "texto": "Vencer Avatar da Luz",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_luz:desafio",
   "categoria": "mapa",
   "universo": "reino_luz",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar da Luz",
   "texto": "Vencer Avatar da Luz sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_luz:cenario",
   "categoria": "mapa",
   "universo": "reino_luz",
   "ladrilho": 2,
   "evento": "quebra:cristal",
   "n": 8,
   "insignia": "prata",
   "nome": "Prismas",
   "texto": "Quebrar 8 cristais",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_luz:mestria",
   "categoria": "mapa",
   "universo": "reino_luz",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino da Luz",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_luz:secreta",
   "categoria": "mapa",
   "universo": "reino_luz",
   "ladrilho": 4,
   "evento": "reacao",
   "n": 30,
   "insignia": "secreta",
   "nome": "Arco-íris",
   "texto": "Provocar 30 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_luz:chamado",
   "categoria": "mapa",
   "universo": "reino_luz",
   "ladrilho": 5,
   "evento": "elite",
   "n": 10,
   "insignia": "secreta",
   "nome": "Carro do Sol",
   "texto": "Derrotar 10 elites no mesmo mapa",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_sombra:chefe",
   "categoria": "mapa",
   "universo": "reino_sombra",
   "ladrilho": 0,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Vencer Avatar da Sombra",
   "texto": "Vencer Avatar da Sombra",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "reino_sombra:desafio",
   "categoria": "mapa",
   "universo": "reino_sombra",
   "ladrilho": 1,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "ouro",
   "nome": "Intocável: Avatar da Sombra",
   "texto": "Vencer Avatar da Sombra sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "reino_sombra:cenario",
   "categoria": "mapa",
   "universo": "reino_sombra",
   "ladrilho": 2,
   "evento": "queda",
   "n": 20,
   "insignia": "prata",
   "nome": "Vazio",
   "texto": "Jogar 20 inimigos no vazio",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_sombra:mestria",
   "categoria": "mapa",
   "universo": "reino_sombra",
   "ladrilho": 3,
   "evento": "chefe_mesmo_el",
   "n": 1,
   "insignia": "prata",
   "nome": "Afinidade de Reino da Sombra",
   "texto": "Vencer o chefe com 2 monstros do elemento do mapa",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "reino_sombra:secreta",
   "categoria": "mapa",
   "universo": "reino_sombra",
   "ladrilho": 4,
   "evento": "fauna",
   "n": 8,
   "insignia": "secreta",
   "nome": "Sussurros",
   "texto": "Assustar 8 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reino_sombra:chamado",
   "categoria": "mapa",
   "universo": "reino_sombra",
   "ladrilho": 5,
   "evento": "onda",
   "n": 3,
   "insignia": "secreta",
   "nome": "A Lira",
   "texto": "Sobreviver a 3 ondas especiais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "primeiro_mapa",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "chefe",
   "n": 1,
   "insignia": "bronze",
   "nome": "Primeiro Pacto",
   "texto": "Vencer o primeiro chefe",
   "secreta": false,
   "essencia": 20,
   "talisma": null
  },
  {
   "id": "chefes_10",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "chefe",
   "n": 10,
   "insignia": "prata",
   "nome": "Caçador de Lendas",
   "texto": "Vencer 10 chefes",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "guardiao",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "guardiao",
   "n": 1,
   "insignia": "prata",
   "nome": "Guardião Derrotado",
   "texto": "Vencer um Guardião da Era",
   "secreta": false,
   "essencia": 60,
   "talisma": "fio"
  },
  {
   "id": "reinos",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "era:elementais",
   "n": 1,
   "insignia": "ouro",
   "nome": "Até os Reinos",
   "texto": "Chegar aos Reinos Elementais",
   "secreta": false,
   "essencia": 150,
   "talisma": "mascara"
  },
  {
   "id": "colecao_40",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "colecao",
   "n": 40,
   "insignia": "prata",
   "nome": "Colecionador",
   "texto": "Ter 40 monstros na coleção",
   "secreta": false,
   "essencia": 60,
   "talisma": "espelho"
  },
  {
   "id": "intocado",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "chefe_intocado",
   "n": 1,
   "insignia": "prata",
   "nome": "Sem Arranhões",
   "texto": "Vencer um chefe sem ser atingido por nenhum golpe dele",
   "secreta": false,
   "essencia": 60,
   "talisma": "trevo"
  },
  {
   "id": "primeiro_desperto",
   "categoria": "grimorio",
   "universo": null,
   "ladrilho": null,
   "evento": "desperto",
   "n": 1,
   "insignia": "bronze",
   "nome": "Primeiro Desperto",
   "texto": "Despertar um poder",
   "secreta": false,
   "essencia": 20,
   "talisma": "pena"
  },
  {
   "id": "primeira_uniao",
   "categoria": "grimorio",
   "universo": null,
   "ladrilho": null,
   "evento": "uniao",
   "n": 1,
   "insignia": "ouro",
   "nome": "Primeira União",
   "texto": "Formar uma União",
   "secreta": false,
   "essencia": 150,
   "talisma": "coroa"
  },
  {
   "id": "despertos_10",
   "categoria": "grimorio",
   "universo": null,
   "ladrilho": null,
   "evento": "desperto",
   "n": 10,
   "insignia": "prata",
   "nome": "Grimório Aberto",
   "texto": "Despertar 10 poderes",
   "secreta": false,
   "essencia": 60,
   "talisma": null
  },
  {
   "id": "primeira_lenda",
   "categoria": "jornada",
   "universo": null,
   "ladrilho": null,
   "evento": "lenda",
   "n": 1,
   "insignia": "ouro",
   "nome": "Lenda Viva",
   "texto": "Liberar a primeira Lenda",
   "secreta": false,
   "essencia": 150,
   "talisma": null
  },
  {
   "id": "quedas_100",
   "categoria": "segredo",
   "universo": null,
   "ladrilho": null,
   "evento": "queda",
   "n": 100,
   "insignia": "secreta",
   "nome": "Beira do Abismo",
   "texto": "Jogar 100 inimigos em abismos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "explosoes_50",
   "categoria": "segredo",
   "universo": null,
   "ladrilho": null,
   "evento": "explosao",
   "n": 50,
   "insignia": "secreta",
   "nome": "Pirotécnico",
   "texto": "Explodir 50 barris de pólvora",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "fauna_100",
   "categoria": "segredo",
   "universo": null,
   "ladrilho": null,
   "evento": "fauna",
   "n": 100,
   "insignia": "secreta",
   "nome": "Amigo dos Bichos",
   "texto": "Assustar 100 bichos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "objetos_500",
   "categoria": "segredo",
   "universo": null,
   "ladrilho": null,
   "evento": "quebra",
   "n": 500,
   "insignia": "secreta",
   "nome": "Furacão Doméstico",
   "texto": "Quebrar 500 objetos",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "bebado_3",
   "categoria": "segredo",
   "universo": null,
   "ladrilho": null,
   "evento": "bebado",
   "n": 3,
   "insignia": "secreta",
   "nome": "Taberneiro",
   "texto": "Deixar o Orochi bêbado 3 vezes",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  },
  {
   "id": "reacoes_1000",
   "categoria": "segredo",
   "universo": null,
   "ladrilho": null,
   "evento": "reacao",
   "n": 1000,
   "insignia": "secreta",
   "nome": "Alquimista",
   "texto": "Provocar 1.000 reações elementais",
   "secreta": true,
   "essencia": 100,
   "talisma": null
  }
 ],
 "lendas": [
  {
   "id": "imhotep",
   "nome": "Imhotep, o Arquiteto",
   "universo": "egito",
   "elementos": [
    "terra",
    "luz"
   ],
   "poder": {
    "nome": "Obelisco Solar",
    "tipo": "area",
    "r": 26,
    "dano": 1.1,
    "cd": 3.0
   },
   "passiva": {
    "nome": "Construtor",
    "efeito": "duracao",
    "valor": 0.5,
    "custo": null
   }
  },
  {
   "id": "heracles",
   "nome": "Héracles",
   "universo": "grecia",
   "elementos": [
    "terra",
    "luz"
   ],
   "poder": {
    "nome": "Doze Trabalhos",
    "tipo": "onda",
    "r": 40,
    "dano": 1.2,
    "cd": 2.6
   },
   "passiva": {
    "nome": "Força Lendária",
    "efeito": "dano_chefe",
    "valor": 0.2,
    "custo": {
     "velocidade": -0.1
    }
   }
  },
  {
   "id": "gilgamesh",
   "nome": "Gilgamesh",
   "universo": "mesopotamia",
   "elementos": [
    "ar",
    "terra"
   ],
   "poder": {
    "nome": "Machado de Uruk",
    "tipo": "projetil",
    "n": 1,
    "perf": 99,
    "volta": true,
    "dano": 1.3,
    "cd": 1.6
   },
   "passiva": {
    "nome": "Busca da Imortalidade",
    "efeito": "revive",
    "valor": 0.5,
    "custo": null
   }
  },
  {
   "id": "yu",
   "nome": "Yu, o Grande",
   "universo": "china",
   "elementos": [
    "agua",
    "terra"
   ],
   "poder": {
    "nome": "Canais de Yu",
    "tipo": "area",
    "r": 30,
    "dano": 0.9,
    "cd": 2.6,
    "solo": "agua"
   },
   "passiva": {
    "nome": "Domador das Enchentes",
    "efeito": "duracao",
    "valor": 0.3,
    "custo": null
   }
  },
  {
   "id": "rostam",
   "nome": "Rostam e Rakhsh",
   "universo": "persia",
   "elementos": [
    "luz",
    "fogo"
   ],
   "poder": {
    "nome": "Carga de Rakhsh",
    "tipo": "investida",
    "dano": 1.5,
    "cd": 3.2
   },
   "passiva": {
    "nome": "Cavaleiro",
    "efeito": "velocidade",
    "valor": 0.15,
    "custo": null
   }
  },
  {
   "id": "sigurd",
   "nome": "Sigurd, o Matador de Dragões",
   "universo": "nordico",
   "elementos": [
    "agua",
    "fogo"
   ],
   "poder": {
    "nome": "Gram",
    "tipo": "orbita",
    "n": 3,
    "r": 30,
    "dano": 1.1,
    "cd": 0.45
   },
   "passiva": {
    "nome": "Matador de Dragões",
    "efeito": "dano_serpentes",
    "valor": 0.3,
    "custo": null
   }
  },
  {
   "id": "cuchulainn",
   "nome": "Cú Chulainn",
   "universo": "celta",
   "elementos": [
    "natureza",
    "raio"
   ],
   "poder": {
    "nome": "Gáe Bulg",
    "tipo": "projetil",
    "n": 1,
    "perf": 4,
    "farpas": 6,
    "dano": 1.4,
    "cd": 1.8
   },
   "passiva": {
    "nome": "Fúria de Batalha",
    "efeito": "dano_baixa_vida",
    "valor": 0.35,
    "custo": null
   }
  },
  {
   "id": "arthur",
   "nome": "Rei Arthur",
   "universo": "tavola",
   "elementos": [
    "luz",
    "terra"
   ],
   "poder": {
    "nome": "Excalibur",
    "tipo": "orbita",
    "n": 3,
    "r": 32,
    "dano": 1.0,
    "cd": 0.45
   },
   "passiva": {
    "nome": "Távola Redonda",
    "efeito": "dano_por_elo",
    "valor": 0.1,
    "custo": null
   }
  },
  {
   "id": "raiko",
   "nome": "Minamoto no Raikō",
   "universo": "japao",
   "elementos": [
    "fogo",
    "luz"
   ],
   "poder": {
    "nome": "Corta-Oni",
    "tipo": "orbita",
    "n": 2,
    "r": 30,
    "dano": 1.3,
    "cd": 0.5
   },
   "passiva": {
    "nome": "Quatro Guardiões",
    "efeito": "escudo_golpes",
    "valor": 4,
    "custo": null
   }
  },
  {
   "id": "marya",
   "nome": "Marya Morevna, a Rainha Guerreira",
   "universo": "eslavo",
   "elementos": [
    "natureza",
    "agua"
   ],
   "poder": {
    "nome": "Exército da Rainha",
    "tipo": "invocar",
    "n": 4,
    "dano": 0.6,
    "cd": 6.0,
    "vida": 6
   },
   "passiva": {
    "nome": "Rainha da Estepe",
    "efeito": "area",
    "valor": 0.15,
    "custo": null
   }
  },
  {
   "id": "sherazade",
   "nome": "Sherazade",
   "universo": "mil_noites",
   "elementos": [
    "fogo",
    "luz"
   ],
   "poder": {
    "nome": "Mil e Uma Histórias",
    "tipo": "invocar",
    "n": 2,
    "dano": 0.65,
    "cd": 9.0,
    "vida": 10
   },
   "passiva": {
    "nome": "Contadora",
    "efeito": "carta_extra",
    "valor": 1,
    "custo": {
     "vida": -0.1
    }
   }
  },
  {
   "id": "naia",
   "nome": "Naiá, a Vitória-Régia",
   "universo": "amazonia",
   "elementos": [
    "natureza",
    "luz"
   ],
   "poder": {
    "nome": "Lua no Rio",
    "tipo": "area",
    "r": 30,
    "dano": 0.6,
    "cd": 3.0,
    "cura": 0.02
   },
   "passiva": {
    "nome": "Flor da Lua",
    "efeito": "regen",
    "valor": 0.004,
    "custo": null
   }
  },
  {
   "id": "gemeos",
   "nome": "Hunahpú e Xbalanqué",
   "universo": "xibalba",
   "elementos": [
    "sombra",
    "luz"
   ],
   "poder": {
    "nome": "Zarabatana e Bola Sagrada",
    "tipo": "dardos",
    "n": 2,
    "dano": 0.6,
    "cd": 0.7
   },
   "passiva": {
    "nome": "Gêmeos",
    "efeito": "revive",
    "valor": 0.4,
    "custo": null
   }
  },
  {
   "id": "nezahualcoyotl",
   "nome": "Nezahualcóyotl, o Rei Poeta",
   "universo": "tenochtitlan",
   "elementos": [
    "luz",
    "agua"
   ],
   "poder": {
    "nome": "Dique de Texcoco",
    "tipo": "area",
    "r": 34,
    "dano": 0.8,
    "cd": 3.2,
    "solo": "agua"
   },
   "passiva": {
    "nome": "Cantos",
    "efeito": "duracao",
    "valor": 0.15,
    "custo": null
   }
  },
  {
   "id": "manco",
   "nome": "Manco Cápac",
   "universo": "andes",
   "elementos": [
    "terra",
    "luz"
   ],
   "poder": {
    "nome": "Bastão de Ouro",
    "tipo": "onda",
    "r": 44,
    "dano": 1.2,
    "cd": 3.0
   },
   "passiva": {
    "nome": "Filho do Sol",
    "efeito": "vida",
    "valor": 0.15,
    "custo": null
   }
  },
  {
   "id": "kupe",
   "nome": "Kupe, o Navegador",
   "universo": "polinesia",
   "elementos": [
    "agua",
    "ar"
   ],
   "poder": {
    "nome": "Remo de Kupe",
    "tipo": "onda",
    "r": 36,
    "dano": 1.0,
    "cd": 2.2
   },
   "passiva": {
    "nome": "Mar Aberto",
    "efeito": "velocidade",
    "valor": 0.1,
    "custo": null
   }
  },
  {
   "id": "dias",
   "nome": "Bartolomeu Dias",
   "universo": "cabo_tormentas",
   "elementos": [
    "ar",
    "agua"
   ],
   "poder": {
    "nome": "Caravela do Cabo",
    "tipo": "projetil",
    "n": 3,
    "perf": 2,
    "dano": 0.8,
    "cd": 1.4
   },
   "passiva": {
    "nome": "Vento a Favor",
    "efeito": "area",
    "valor": 0.15,
    "custo": null
   }
  },
  {
   "id": "barbanegra",
   "nome": "Barba Negra",
   "universo": "caribe",
   "elementos": [
    "sombra",
    "fogo"
   ],
   "poder": {
    "nome": "Pavios na Barba",
    "tipo": "barril",
    "r": 30,
    "dano": 1.8,
    "cd": 3.0
   },
   "passiva": {
    "nome": "Imune ao Paiol",
    "efeito": "explosao_segura",
    "valor": 1,
    "custo": null
   }
  },
  {
   "id": "nemo",
   "nome": "Capitão Nemo",
   "universo": "mar_profundo",
   "elementos": [
    "agua",
    "raio"
   ],
   "poder": {
    "nome": "Nautilus",
    "tipo": "raio",
    "saltos": 4,
    "dano": 1.0,
    "cd": 1.6
   },
   "passiva": {
    "nome": "Luz do Nautilus",
    "efeito": "imune_escuro",
    "valor": 1,
    "custo": null
   }
  },
  {
   "id": "dracula",
   "nome": "Drácula Supremo",
   "universo": "transilvania",
   "elementos": [
    "sombra",
    "ar"
   ],
   "poder": {
    "nome": "Revoada Rubra",
    "tipo": "drenar",
    "n": 5,
    "dano": 0.7,
    "cd": 1.4
   },
   "passiva": {
    "nome": "Sede Eterna",
    "efeito": "roubo_vida",
    "valor": 0.06,
    "custo": {
     "dano_dia": -0.15
    }
   }
  },
  {
   "id": "frankenstein",
   "nome": "Victor Frankenstein",
   "universo": "laboratorio",
   "elementos": [
    "raio",
    "natureza"
   ],
   "poder": {
    "nome": "Centelha da Vida",
    "tipo": "raio",
    "saltos": 3,
    "dano": 0.9,
    "cd": 1.8,
    "reanima": true
   },
   "passiva": {
    "nome": "Remendo",
    "efeito": "revive",
    "valor": 0.3,
    "custo": null
   }
  },
  {
   "id": "joaomaria",
   "nome": "João e Maria",
   "universo": "floresta_negra",
   "elementos": [
    "natureza",
    "fogo"
   ],
   "poder": {
    "nome": "Migalhas e Forno",
    "tipo": "barril",
    "r": 26,
    "dano": 1.4,
    "cd": 2.6
   },
   "passiva": {
    "nome": "Caminho de Volta",
    "efeito": "xp",
    "valor": 0.1,
    "custo": null
   }
  },
  {
   "id": "poseidon",
   "nome": "Poseidon",
   "universo": "atlantida",
   "elementos": [
    "agua",
    "terra"
   ],
   "poder": {
    "nome": "Tridente das Marés",
    "tipo": "onda",
    "r": 48,
    "dano": 1.3,
    "cd": 2.8
   },
   "passiva": {
    "nome": "Senhor dos Mares",
    "efeito": "regen",
    "valor": 0.003,
    "custo": null
   }
  },
  {
   "id": "bochica",
   "nome": "Bochica, o Mensageiro",
   "universo": "eldorado",
   "elementos": [
    "luz",
    "agua"
   ],
   "poder": {
    "nome": "Arco-íris de Bochica",
    "tipo": "investida",
    "dano": 1.6,
    "cd": 2.6
   },
   "passiva": {
    "nome": "Ouro do Lago",
    "efeito": "essencia",
    "valor": 0.2,
    "custo": null
   }
  },
  {
   "id": "marcopolo",
   "nome": "Marco Polo",
   "universo": "shangrila",
   "elementos": [
    "ar",
    "luz"
   ],
   "poder": {
    "nome": "Seda e Bússola",
    "tipo": "area",
    "r": 30,
    "dano": 0.7,
    "cd": 2.8,
    "prende": true
   },
   "passiva": {
    "nome": "Explorador",
    "efeito": "xp",
    "valor": 0.1,
    "custo": null
   }
  },
  {
   "id": "lidenbrock",
   "nome": "Lidenbrock e Axel",
   "universo": "centro_terra",
   "elementos": [
    "terra",
    "fogo"
   ],
   "poder": {
    "nome": "Martelo do Geólogo",
    "tipo": "onda",
    "r": 34,
    "dano": 1.2,
    "cd": 2.4
   },
   "passiva": {
    "nome": "Geólogo",
    "efeito": "xp",
    "valor": 0.1,
    "custo": null
   }
  },
  {
   "id": "prometeu",
   "nome": "Prometeu",
   "universo": "reino_fogo",
   "elementos": [
    "fogo",
    "luz"
   ],
   "poder": {
    "nome": "Fogo Roubado",
    "tipo": "projetil",
    "n": 2,
    "perf": 3,
    "dano": 0.85,
    "cd": 1.4
   },
   "passiva": {
    "nome": "Portador do Fogo",
    "efeito": "dano_chefe",
    "valor": 0.15,
    "custo": {
     "vida": -0.1
    }
   }
  },
  {
   "id": "ondina",
   "nome": "Ondina",
   "universo": "reino_agua",
   "elementos": [
    "agua",
    "natureza"
   ],
   "poder": {
    "nome": "Véu das Ondas",
    "tipo": "area",
    "r": 38,
    "dano": 1.1,
    "cd": 2.4,
    "cura": 0.015
   },
   "passiva": {
    "nome": "Correnteza",
    "efeito": "velocidade",
    "valor": 0.1,
    "custo": null
   }
  },
  {
   "id": "atlas",
   "nome": "Atlas",
   "universo": "reino_terra",
   "elementos": [
    "terra",
    "ar"
   ],
   "poder": {
    "nome": "Peso do Céu",
    "tipo": "onda",
    "r": 52,
    "dano": 1.25,
    "cd": 3.4
   },
   "passiva": {
    "nome": "Ombros de Titã",
    "efeito": "vida",
    "valor": 0.4,
    "custo": {
     "velocidade": -0.15
    }
   }
  },
  {
   "id": "dedalo",
   "nome": "Dédalo e Ícaro",
   "universo": "reino_ar",
   "elementos": [
    "ar",
    "luz"
   ],
   "poder": {
    "nome": "Asas de Cera",
    "tipo": "projetil",
    "n": 4,
    "perf": 1,
    "dano": 0.6,
    "cd": 1.2
   },
   "passiva": {
    "nome": "Asas",
    "efeito": "atravessa_abismo",
    "valor": 1,
    "custo": null
   }
  },
  {
   "id": "brontes",
   "nome": "Brontes, o Ferreiro do Trovão",
   "universo": "reino_raio",
   "elementos": [
    "raio",
    "fogo"
   ],
   "poder": {
    "nome": "Forja do Raio",
    "tipo": "raio",
    "saltos": 5,
    "dano": 1.1,
    "cd": 2.0
   },
   "passiva": {
    "nome": "Ferreiro",
    "efeito": "dano_chefe",
    "valor": 0.15,
    "custo": null
   }
  },
  {
   "id": "merlin",
   "nome": "Merlin, o Druida",
   "universo": "reino_natureza",
   "elementos": [
    "natureza",
    "luz"
   ],
   "poder": {
    "nome": "Bosque de Merlin",
    "tipo": "invocar",
    "n": 2,
    "dano": 0.8,
    "cd": 6.0,
    "vida": 8
   },
   "passiva": {
    "nome": "Sabedoria Antiga",
    "efeito": "carta_extra",
    "valor": 1,
    "custo": null
   }
  },
  {
   "id": "faetonte",
   "nome": "Faetonte",
   "universo": "reino_luz",
   "elementos": [
    "luz",
    "fogo"
   ],
   "poder": {
    "nome": "Carro do Sol",
    "tipo": "investida",
    "dano": 2.0,
    "cd": 2.6
   },
   "passiva": {
    "nome": "Luz Própria",
    "efeito": "imune_escuro",
    "valor": 1,
    "custo": {
     "defesa": -0.1
    }
   }
  },
  {
   "id": "orfeu",
   "nome": "Orfeu",
   "universo": "reino_sombra",
   "elementos": [
    "sombra",
    "luz"
   ],
   "poder": {
    "nome": "Lira do Submundo",
    "tipo": "dardos",
    "n": 3,
    "dano": 0.5,
    "cd": 0.9,
    "encanta": true
   },
   "passiva": {
    "nome": "Volta do Submundo",
    "efeito": "revive",
    "valor": 0.35,
    "custo": null
   }
  }
 ],
 "panteao": [
  {
   "id": "zeus",
   "nome": "Zeus",
   "panteao": "Grego",
   "elementos": [
    "raio",
    "luz"
   ],
   "poder": {
    "nome": "Raio do Olimpo",
    "tipo": "raio",
    "saltos": 6,
    "dano": 1.45,
    "cd": 1.5
   },
   "passiva": {
    "nome": "Rei dos Deuses",
    "efeito": "dano_chefe",
    "valor": 0.2,
    "custo": {
     "defesa": -0.1
    }
   },
   "fardo": "Arrogância: −10% de defesa",
   "dom": {
    "nome": "Fúria do Olimpo",
    "tipo": "raios",
    "n": 9,
    "dano": 6,
    "cd": 28
   },
   "provacao": {
    "universo": "grecia",
    "texto": "Vencer o Tifão com 2 monstros de raio na equipe",
    "requisito": {
     "elemento": "raio",
     "n": 2
    }
   }
  },
  {
   "id": "hades",
   "nome": "Hades",
   "panteao": "Grego",
   "elementos": [
    "sombra",
    "fogo"
   ],
   "poder": {
    "nome": "Bidente do Submundo",
    "tipo": "drenar",
    "n": 6,
    "dano": 1.05,
    "cd": 1.4
   },
   "passiva": {
    "nome": "Senhor dos Mortos",
    "efeito": "roubo_vida",
    "valor": 0.05,
    "custo": {
     "velocidade": -0.1
    }
   },
   "fardo": "Frio da morte: −10% de velocidade",
   "dom": {
    "nome": "Portões do Hades",
    "tipo": "submundo",
    "n": 8,
    "dano": 1.2,
    "vida": 12,
    "cd": 32
   },
   "provacao": {
    "universo": "grecia",
    "texto": "Vencer o Tifão com 2 monstros de sombra na equipe",
    "requisito": {
     "elemento": "sombra",
     "n": 2
    }
   }
  },
  {
   "id": "atena",
   "nome": "Atena",
   "panteao": "Grego",
   "elementos": [
    "luz",
    "terra"
   ],
   "poder": {
    "nome": "Lança da Sabedoria",
    "tipo": "projetil",
    "n": 2,
    "perf": 4,
    "dano": 1.1,
    "cd": 1.5
   },
   "passiva": {
    "nome": "Estrategista",
    "efeito": "carta_extra",
    "valor": 1,
    "custo": {
     "dano_dia": -0.1
    }
   },
   "fardo": "Disciplina: −10% de dano",
   "dom": {
    "nome": "Égide",
    "tipo": "egide",
    "r": 70,
    "escudo": 0.4,
    "cd": 30
   },
   "provacao": {
    "universo": "grecia",
    "texto": "Vencer a Grécia sem usar a esquiva nenhuma vez",
    "requisito": {
     "sem_esquiva": true
    }
   }
  },
  {
   "id": "leonidas",
   "nome": "Leônidas, Rei de Esparta",
   "panteao": "Grego (herói)",
   "elementos": [
    "terra",
    "fogo"
   ],
   "poder": {
    "nome": "Lança e Escudo",
    "tipo": "investida",
    "dano": 1.3,
    "cd": 2.4
   },
   "passiva": {
    "nome": "Não Recuar",
    "efeito": "vida",
    "valor": 0.3,
    "custo": {
     "velocidade": -0.15
    }
   },
   "fardo": "Esparta não foge: −15% de velocidade",
   "dom": {
    "nome": "Termópilas",
    "tipo": "falange",
    "r": 80,
    "dano": 2.2,
    "cd": 28
   },
   "provacao": {
    "universo": "grecia",
    "texto": "Os 300: derrotar 300 inimigos na Grécia e vencer o Tifão",
    "requisito": {
     "abates": 300
    }
   }
  },
  {
   "id": "odin",
   "nome": "Odin",
   "panteao": "Nórdico",
   "elementos": [
    "ar",
    "sombra"
   ],
   "poder": {
    "nome": "Corvos Hugin e Munin",
    "tipo": "dardos",
    "n": 3,
    "dano": 1.35,
    "cd": 0.75
   },
   "passiva": {
    "nome": "Pai de Todos",
    "efeito": "xp",
    "valor": 0.15,
    "custo": {
     "area": -0.1
    }
   },
   "fardo": "O olho dado em troca da sabedoria: −10% de área",
   "dom": {
    "nome": "Gungnir",
    "tipo": "lanca",
    "dano": 9,
    "cd": 28
   },
   "provacao": {
    "universo": "nordico",
    "texto": "Vencer a Jörmungandr com 2 monstros de ar na equipe",
    "requisito": {
     "elemento": "ar",
     "n": 2
    }
   }
  },
  {
   "id": "thor",
   "nome": "Thor",
   "panteao": "Nórdico",
   "elementos": [
    "raio",
    "terra"
   ],
   "poder": {
    "nome": "Mjölnir",
    "tipo": "projetil",
    "n": 1,
    "perf": 99,
    "volta": true,
    "dano": 1.25,
    "cd": 1.8
   },
   "passiva": {
    "nome": "Deus do Trovão",
    "efeito": "dano_serpentes",
    "valor": 0.4,
    "custo": {
     "vida": -0.1
    }
   },
   "fardo": "Temperamento: −10% de vida",
   "dom": {
    "nome": "Martelo dos Trovões",
    "tipo": "martelo",
    "r": 130,
    "dano": 2.4,
    "cd": 30
   },
   "provacao": {
    "universo": "nordico",
    "texto": "Matar a Serpente: vencer a Jörmungandr com 2 monstros de raio em menos de 30 s",
    "requisito": {
     "elemento": "raio",
     "n": 2,
     "tempo": 30
    }
   }
  },
  {
   "id": "loki",
   "nome": "Loki",
   "panteao": "Nórdico",
   "elementos": [
    "fogo",
    "sombra"
   ],
   "poder": {
    "nome": "Chamas do Trapaceiro",
    "tipo": "barril",
    "r": 34,
    "dano": 2.0,
    "cd": 2.3
   },
   "passiva": {
    "nome": "Mil Faces",
    "efeito": "dano_baixa_vida",
    "valor": 0.4,
    "custo": {
     "vida": -0.2
    }
   },
   "fardo": "Ninguém confia nele: −20% de vida",
   "dom": {
    "nome": "Caos",
    "tipo": "caos",
    "r": 110,
    "dur": 4,
    "cd": 26
   },
   "provacao": {
    "universo": "nordico",
    "texto": "Vencer a Jörmungandr sem ser atingido e com um monstro de sombra na equipe",
    "requisito": {
     "elemento": "sombra",
     "n": 1,
     "intocado": true
    }
   }
  },
  {
   "id": "ra",
   "nome": "Rá",
   "panteao": "Egípcio",
   "elementos": [
    "luz",
    "fogo"
   ],
   "poder": {
    "nome": "Disco Solar",
    "tipo": "orbita",
    "n": 4,
    "r": 34,
    "dano": 0.65,
    "cd": 0.45
   },
   "passiva": {
    "nome": "Barca do Sol",
    "efeito": "imune_escuro",
    "valor": 1,
    "custo": {
     "defesa": -0.1
    }
   },
   "fardo": "Calor do meio-dia: −10% de defesa",
   "dom": {
    "nome": "Olho de Rá",
    "tipo": "sol",
    "dano": 2.0,
    "cd": 32
   },
   "provacao": {
    "universo": "egito",
    "texto": "Vencer o Apep com 2 monstros de luz na equipe",
    "requisito": {
     "elemento": "luz",
     "n": 2
    }
   }
  },
  {
   "id": "anubis",
   "nome": "Anúbis",
   "panteao": "Egípcio",
   "elementos": [
    "sombra",
    "terra"
   ],
   "poder": {
    "nome": "Cetro do Embalsamador",
    "tipo": "area",
    "r": 32,
    "dano": 1.2,
    "cd": 2.4
   },
   "passiva": {
    "nome": "Guia das Almas",
    "efeito": "essencia",
    "valor": 0.25,
    "custo": {
     "regen_zero": 1
    }
   },
   "fardo": "A balança cobra: sem regeneração",
   "dom": {
    "nome": "Pesagem do Coração",
    "tipo": "julgamento",
    "limite": 0.3,
    "cd": 26
   },
   "provacao": {
    "universo": "egito",
    "texto": "Vencer o Apep sem curar a equipe no mapa",
    "requisito": {
     "sem_cura": true
    }
   }
  },
  {
   "id": "isis",
   "nome": "Ísis",
   "panteao": "Egípcio",
   "elementos": [
    "agua",
    "luz"
   ],
   "poder": {
    "nome": "Asas de Ísis",
    "tipo": "area",
    "r": 42,
    "dano": 1.35,
    "cd": 2.3,
    "cura": 0.02
   },
   "passiva": {
    "nome": "Grande Maga",
    "efeito": "revive",
    "valor": 0.6,
    "custo": {
     "dano_dia": -0.1
    }
   },
   "fardo": "Magia cobra seu preço: −10% de dano",
   "dom": {
    "nome": "Sopro da Vida",
    "tipo": "vida",
    "cura": 0.5,
    "cd": 34
   },
   "provacao": {
    "universo": "egito",
    "texto": "Vencer o Apep com 2 monstros de água na equipe",
    "requisito": {
     "elemento": "agua",
     "n": 2
    }
   }
  },
  {
   "id": "marduk",
   "nome": "Marduk",
   "panteao": "Mesopotâmico",
   "elementos": [
    "raio",
    "ar"
   ],
   "poder": {
    "nome": "Os Quatro Ventos",
    "tipo": "onda",
    "r": 46,
    "dano": 0.9,
    "cd": 2.6
   },
   "passiva": {
    "nome": "Vencedor de Tiamat",
    "efeito": "dano_chefe",
    "valor": 0.25,
    "custo": {
     "risco": 0.1
    }
   },
   "fardo": "Cinquenta nomes, muitos inimigos: inimigos +10% de vida",
   "dom": {
    "nome": "Rede dos Ventos",
    "tipo": "rede",
    "r": 120,
    "dano": 2.4,
    "cd": 30
   },
   "provacao": {
    "universo": "mesopotamia",
    "texto": "Vencer Tiamat, a Guardiã do Berço",
    "requisito": {
     "guardiao": true
    }
   }
  },
  {
   "id": "ishtar",
   "nome": "Ishtar",
   "panteao": "Mesopotâmico",
   "elementos": [
    "luz",
    "natureza"
   ],
   "poder": {
    "nome": "Estrela da Manhã",
    "tipo": "dardos",
    "n": 3,
    "dano": 0.7,
    "cd": 0.9,
    "encanta": true
   },
   "passiva": {
    "nome": "Senhora do Céu",
    "efeito": "velocidade",
    "valor": 0.15,
    "custo": {
     "defesa": -0.1
    }
   },
   "fardo": "Paixão: −10% de defesa",
   "dom": {
    "nome": "Encanto de Ishtar",
    "tipo": "encanto",
    "r": 90,
    "n": 8,
    "cd": 30
   },
   "provacao": {
    "universo": "mesopotamia",
    "texto": "Vencer o Humbaba com 2 monstros de natureza na equipe",
    "requisito": {
     "elemento": "natureza",
     "n": 2
    }
   }
  },
  {
   "id": "enki",
   "nome": "Enki",
   "panteao": "Mesopotâmico",
   "elementos": [
    "agua",
    "terra"
   ],
   "poder": {
    "nome": "Águas Doces",
    "tipo": "area",
    "r": 36,
    "dano": 0.7,
    "cd": 2.4,
    "solo": "agua"
   },
   "passiva": {
    "nome": "Sábio do Abismo",
    "efeito": "duracao",
    "valor": 0.3,
    "custo": {
     "velocidade": -0.1
    }
   },
   "fardo": "Paciente demais: −10% de velocidade",
   "dom": {
    "nome": "Dilúvio",
    "tipo": "diluvio",
    "dano": 2.0,
    "cd": 30
   },
   "provacao": {
    "universo": "mesopotamia",
    "texto": "Vencer o Humbaba com 2 monstros de água na equipe",
    "requisito": {
     "elemento": "agua",
     "n": 2
    }
   }
  }
 ]
};
