# Elementar · pedido de folhas de sprites novas

> Versão completa com auditoria e prompts prontos: [PACOTE_PROMPTS.md](PACOTE_PROMPTS.md) (+ dados em [PACOTE_PROMPTS_DADOS.md](PACOTE_PROMPTS_DADOS.md)).

Documento para outra conversa do Claude transformar em um **pacote de prompts de geração de imagem**, como foi feito com as artes atuais. Ele descreve o que o jogo já tem, o que está com defeito e o que falta gerar, com o formato exato que o código lê. Cada item tem prioridade (P1 = mais urgente).

---

## 1. Sobre o jogo (contexto para os prompts)

- **Gênero:** survivor de ação (estilo Vampire Survivors e Hades) com monstros mitológicos e 8 elementos (fogo, água, terra, ar, raio, natureza, luz, sombra). O jogador é um herói no centro com uma equipe de até 3 monstros que evoluem; Lendas e deuses podem substituir o herói.
- **Câmera:** vista de cima em 3/4 (top-down levemente inclinado, como Zelda: A Link to the Past, Sea of Stars e Hades). Personagens de pé, vistos de lado e um pouco de cima.
- **Estilo visual:** pixel art pintada, rica em detalhes, com iluminação suave e cores saturadas, no espírito de jogos japoneses (Sea of Stars, Octopath, Ori pela luz). As artes atuais seguem esse estilo e as novas precisam combinar com elas.
- **Plataforma:** celular (principal) e computador/Steam. A tela do celular mostra cerca de 170 pixels de mundo na largura; um monstro da equipe ocupa 18 a 28 px de mundo, um inimigo comum 15 a 25 px e um chefe 40 a 60 px. A arte é desenhada maior e o jogo reduz, então ela precisa ser **legível em tamanho pequeno**: silhueta forte, contorno escuro, poucas linhas finas.

## 2. Regras técnicas para TODAS as folhas novas

Estas regras resolvem os defeitos das folhas atuais (seção 3). Repetir em todo prompt.

1. **Fundo transparente** (PNG com alfa). Nada de cor de fundo, chão, moldura, grade desenhada ou texto.
2. **Grade exata e uniforme:** a folha tem C colunas × L linhas de células quadradas do mesmo tamanho. Largura da imagem = C × célula; altura = L × célula. Exemplo: célula de 128 px, 8 colunas e 4 linhas = 1024 × 512 px.
3. **Nada sai da célula:** o desenho de um quadro não pode invadir a célula vizinha (hoje isso acontece muito: pés, caudas, efeitos e brilhos passando para o quadro de baixo ou do lado). Deixar ~6% de margem livre em volta.
4. **Linha do chão fixa:** os pés de todos os quadros ficam na mesma altura dentro da célula, a 85% da altura (ex.: y = 109 em célula de 128). Personagens que voam ou flutuam ficam com a base do corpo nessa linha.
5. **Mesma escala em todas as linhas e quadros** da folha (o personagem não pode mudar de tamanho entre poses).
6. **Virado para a direita** em todos os quadros. O jogo espelha para a esquerda.
7. **Sem sombra no chão desenhada** (o jogo desenha a sombra e a luz). Brilho próprio do personagem (olhos, fogo, magia) pode.
8. **Proporção certa:** não esticar nem achatar. As folhas antigas ficaram 25% mais baixas na conversão (o jogo corrige isso hoje); as novas precisam sair na proporção natural.
9. **Animação em ciclo:** em linhas de ciclo (parado, andando, voando), o último quadro emenda no primeiro.
10. **Iluminação** vinda de cima à esquerda, contorno escuro de 1 a 2 px (marrom ou roxo muito escuro, não preto puro).
11. **Entrega:** PNG original grande (a ferramenta `ferramentas/converter_artes.ps1` reduz para WebP mantendo a proporção). Nome de arquivo e pasta conforme a seção de cada item.

Tamanhos de célula recomendados: **128 px** para monstros, herói, Lendas, inimigos, ovos e baús; **256 px** para mini-chefes, chefes e Guardiões; **192 px** para efeitos especiais; **64 px** para ícones (ou 128 para a Steam).

---

## 3. O que já existe e o que está com defeito

| Grupo | Arquivos | Tamanho atual | Defeitos encontrados |
|---|---|---|---|
| Monstros: animação | 408 (`monstros/<el>/<id>__anim_1..8`) | 6×3 células de 64 px | 25% achatados; células pequenas (borradas de perto); desenho invade a célula vizinha; só 3 ações (parado, andando, atacando) |
| Monstros: imagem fixa | 153 (`__base`, `__epico`, `__lendario`) | 4×2 células de 64 px | achatados; Épico e Lendário sem animação própria (o jogo pinta a animação comum com outras cores) |
| Dragões ancestrais | 8 × (`__base`, `__eclosao`, `__anim_1..4`) | base 320×64 e eclosão 384×64 | base e eclosão esmagadas numa faixa; animação 25% mais baixa |
| Lendas e deuses | 47 folhas + 33 retratos | 6×3 células de 64 px | achatadas; só parado, andando e lançando |
| Inimigos comuns | 34 (`reinos/<era>/<reino>__inimigos`) | 8×6 células de 48 px | 6 folhas com linhas fora da grade (Floresta Negra, Reino da Luz, Laboratório, Atlântida, Shangri-lá, Tenochtitlán); alturas diferentes entre quadros de andar (Egito, Celta, Eslavo, Amazônia, Floresta Negra, Atlântida, Shangri-lá); só 2 quadros de ataque |
| Mini-chefes | 34 (`__mini`) | 6×5 células de 64 px | pequenos; moldura fina em volta de alguns |
| Chefes | 34 (`__chefe`) | 6×6 células de 96 px | pequenos; moldura fina em volta do Reino do Fogo e do Reino da Terra |
| Guardiões da Era | 7 (`guardiao_<era>__anim` + `__efeitos`) | 6×6 de 96 px | pequenos |
| Efeitos dos chefes | 41 (`__efeitos`) | 8×2 células de 64 px | ok, mas pequenos |
| Efeitos especiais por classe | 16 (`efeitos/especial__<classe>_1..2`) | 1536×192 | **desligados no jogo**: cada quadro veio cortado com pedaço do vizinho |
| Combinados | 17 (`efeitos/combinado__*`) | 2560×256 | **desligados** pelo mesmo motivo |
| Reações elementais | 28 (`efeitos/reacao__a_b`) | 6 quadros de 128 px | em uso; podem ganhar versão maior |
| Superfícies do chão | 12 (`ambiente/<tipo>`) | 8×2 células de 32 px | pequenas (pixeladas de perto) |
| Piso dos reinos | 34 (`__piso`) | 512 px | 4 não emendam nas bordas (Pérsia, Tenochtitlán, Atlântida, Távola); resolução baixa |
| Ladrilhos, manchas e enfeites | 34 (`__tiles`) | 8×3 de 32 px | a 1ª linha ficou esmagada numa faixa fina |
| Marcos e plantas | 34 (`__props`) | 4×2 de 128 px | ok; sem animação (luzes e plantas são estáticas) |
| Peças grandes | 34 (`__pecas`) | 2×2 de 256 px | a ponte é desenhada de lado; não serve para ponte na vertical |
| Paredão do abismo | 34 (`__paredao`) | 4×2 de 64 px | muito pequeno e com bordas irregulares; o jogo recorta e funde, mas fica pixelado |
| Fundo do abismo | 34 (`__fundo`) | 256 px | pequeno; só uma camada |
| Objetos de quebrar | 34 (`__objetos`) | 8×N de 48 px | pequenos |
| Fauna | 34 (`__fauna`) | 8×2 de 32 px | desenho ocupa 40% da célula, fora da grade |
| Relíquias | 34 (`itens/reliquias`) | 64 px | **não aparecem no jogo** (só o nome); podem virar ícone na escolha |
| Interface | 30 (`ui/`) | vários | ok |

**Hoje desenhado só por código** (sem arte, candidatos a folha nova): herói básico, ovos, baús, cristais de XP, moedas, projéteis e golpes elementais, círculos de invocação, ícones de poderes, Presságios e Cartas Proibidas.

---

## 4. O que gerar (por prioridade)

### P1 · Herói básico (Invocador)
Hoje é pixel art feita no código e é o personagem mais visto do jogo. Precisa ser tão bonito quanto as Lendas.
- **Arquivo:** `arte/heroi/invocador__anim.png`, célula 128 px, **8 colunas × 7 linhas** (1024 × 896).
- **Personagem:** jovem invocador(a) aventureiro(a), proporção de herói de ação (cabeça ~1/3 da altura, não chibi exagerado), cabelo castanho bagunçado, cachecol vermelho, capa azul curta, túnica creme com cinto dourado, botas de couro, espada curta com gema no pomo (a gema muda de cor por código; desenhar em branco-azulado).
- **Linhas:** 1 parado respirando (6 quadros + 2 piscando); 2 andando (8); 3 correndo/esquiva com rolamento (8); 4 ataque/comando, aponta a espada e a gema brilha (6); 5 conjurando Despertar, braços para cima com energia (8); 6 dano e recuperação (4) + vitória (4); 7 caindo derrotado (6) + ajoelhado (2).
- **Extra:** retrato de busto 256 × 256 (`arte/heroi/invocador__retrato.png`) para a tela de escolha.

### P1 · Ovos (8 elementos × 3 raridades)
Hoje são desenhados por código. Aparecem no mapa, no ninho e na cena de choco.
- **Arquivo:** `arte/ovos/ovo__<elemento>.png`, célula 128 px, **8 colunas × 3 linhas**, uma linha por raridade (comum, raro, lendário).
- **Colunas:** 1–4 parado balançando de leve (ciclo); 5–7 rachando aos poucos (rachadura brilhando na cor do elemento); 8 casca estourando (pedaços voando, clarão).
- **Diferença por raridade:** comum = casca simples com padrão do elemento; raro = detalhes prateados e gema; lendário = casca dourada ornamentada, aura e gema grande.
- **Ovos ancestrais (8 dragões):** reconverter `lendarios/*__eclosao` na proporção certa (seção P2) ou gerar no mesmo formato acima, uma linha só.

### P1 · Baús e recompensas
- **Arquivo:** `arte/itens/baus.png`, célula 128 px, **8 colunas × 4 linhas**, uma linha por tipo: madeira (comum), prata, ouro, lendário (cristal/arcano).
- **Colunas:** 1 fechado; 2–3 tremendo (antecipação); 4–6 abrindo (tampa tombando para trás); 7–8 aberto com luz saindo (ciclo de 2).
- **Arquivo:** `arte/itens/coletaveis.png`, célula 64 px, 8 × 4: cristais de XP em 4 cores (azul, verde, roxo, dourado) com 2 quadros de brilho cada; moeda girando (8 quadros); coração de cura (4); estrela de bônus (4).

### P1 · Monstros: reconverter + ações novas
São 51 linhas × 8 formas = 408 folhas; é o item mais caro. Fazer em duas etapas.
1. **Reconverter as 408 folhas atuais em 128 px** a partir dos originais, já na proporção certa e sem invadir células (ferramenta `converter_artes.ps1 -Escala 2`). Não precisa gerar nada; só exportar de novo.
2. **Folha nova de ações por forma:** `monstros/<el>/<id>__acoes_<1..8>.png`, célula 128 px, **8 colunas × 4 linhas**:
   - linha 1: habilidade 1 (preparo, golpe, recuperação), 8 quadros;
   - linha 2: habilidade 2 / especial, 8 quadros;
   - linha 3: dano (2) + atordoado (2) + comemoração (4);
   - linha 4: desmaio/derrota (6) + entrada em cena saindo do chão (2).
   - **Prioridade dentro do item:** começar pelas formas Adulto e Supremo (6 de 8 por linha), que aparecem mais tempo em tela.
3. **Raridades com animação própria** só onde o desenho muda muito da forma comum: Tengu Lendário, Qilin Épico, Frankenstein Épico e Sereia (todas as formas). Mesmo formato 6×3 de `__anim`.

### P1 · Inimigos comuns (34 reinos)
Refazer as 34 folhas em formato maior e mais completo.
- **Arquivo:** `reinos/<era>/<reino>__inimigos.png`, célula 128 px, **8 colunas × 9 linhas** (3 inimigos × 3 linhas cada), na ordem dos inimigos do reino (tipo 0, 1 e 2).
- **Linhas de cada inimigo:** A) parado 2 + andando 6; B) ataque 6 (preparo, golpe, volta) + dano 2; C) morte 5 + mania 3 (o gesto típico: dança, tropeço, grito...).
- Usar como referência o desenho atual de cada inimigo (mesmos personagens), só que maiores, alinhados e com mais quadros.
- **Obs.:** o código atual lê 8×6 (2 linhas por inimigo). Com a folha nova de 9 linhas, o código precisa ser ajustado (eu faço isso quando as folhas chegarem).

### P2 · Mini-chefes, chefes e Guardiões
- **Reconverter em 256 px** sem a moldura (mini, chefe e Guardião de cada reino).
- **Linhas novas** (mesma folha, abaixo das atuais): entrada no mapa, 8 quadros (surge do chão, desce do céu ou atravessa um portal); transformação para a fase 2, 8 quadros; golpe extra, 6 quadros; morte longa, 8 quadros (se desfaz em luz ou pedra).
- **Efeitos dos chefes** (`__efeitos`): reconverter em 128 px por quadro.

### P2 · Lendas e deuses (47)
Agora a Lenda é o herói do centro da tela, então ela aparece o tempo todo.
- **Reconverter** as 47 folhas em 128 px na proporção certa.
- **Linhas novas:** dano (4) + vitória (4); usar o poder próprio, 8 quadros; Dom Divino (só os 13 deuses), 8 quadros.
- **Formato:** `lendas/<id>__acoes.png` e `panteao/<id>__acoes.png`, célula 128 px, 8 × 3.

### P2 · Efeitos elementais (golpes, projéteis, auras)
Hoje os golpes são desenhados por código (traços e círculos). Arte própria dá muito mais impacto.
- **Arquivo:** `efeitos/elemento__<el>.png` (8 elementos), célula 128 px, **8 colunas × 6 linhas**:
  1. impacto de golpe (faísca do elemento), 8 quadros;
  2. projétil/orbe em ciclo, 6 quadros + 2 de rastro;
  3. explosão em área vista de cima, 8 quadros;
  4. corte em arco (meia-lua), 8 quadros;
  5. aura de Despertar em volta do personagem, ciclo de 8;
  6. círculo de invocação no chão visto de cima (perspectiva achatada), 4 quadros de brilho + 4 de abrir.
- **Refazer os especiais e combinados desligados:** `efeitos/especial__<classe>_<1|2>.png` (16) e `efeitos/combinado__<nome>.png` (17), **8 quadros quadrados de 192 px numa linha** (1536 × 192), cada quadro inteiro dentro da sua célula.
- **Reações (28):** opcional, mesma arte em 192 px.

### P2 · Abismo, piso e cenário
- **Paredão do abismo:** `reinos/<era>/<reino>__paredao.png`, **faixa contínua emendável na horizontal**, 1024 × 256 (rocha com vegetação no topo e base sumindo em névoa), mais uma faixa de cachoeira em ciclo de 8 quadros (8 × 1 de 128 × 256).
- **Fundo do abismo em 2 camadas emendáveis** (1024 px cada): `__fundo` (o mais distante: mar de nuvens, água, lava...) e `__fundo2` (camada média com ilhas e rochas flutuando, fundo transparente).
- **Pisos:** 1024 px **emendáveis nos 4 lados**, começando pelos 4 com costura (Pérsia, Tenochtitlán, Atlântida, Távola).
- **Ponte:** `__ponte.png` com dois segmentos emendáveis de 256 px: horizontal (de frente, com arcos) e vertical (vista de cima, só o tabuleiro com parapeitos dos lados), mais as cabeceiras.
- **Ladrilhos/manchas/enfeites** (`__tiles`): reconverter em 64 px por célula, corrigindo a 1ª linha esmagada.
- **Superfícies do chão** (12, `ambiente/<tipo>`): 8 × 2 de 64 px; linha 2 em ciclo de 8 quadros para água, fogo, elétrico, vapor, luz e sombra.

### P3 · Ambiente animado
- **Marcos e luzes animados** (`__props_anim.png`, 128 px, 8 × 2): tocha/braseiro/lanterna do reino com chama em ciclo de 8; planta grande do reino balançando em ciclo de 8.
- **Fauna** (`__fauna`): 128 px, 8 × 3 — ave voando (8), bicho do chão andando e pulando (8), peixe ou inseto (8).
- **Partículas do ambiente** (`efeitos/particulas.png`, 32 px, 8 × 6): folhas, pétalas, neve, cinzas, brasas, esporos, 8 quadros girando cada.
- **Objetos de quebrar** (`__objetos`): reconverter em 96 px; manter o formato 8×N (intacto, trincado, quebrado, estado especial, 4 cacos).

### P3 · Ícones de poderes, relíquias e escolhas
Hoje as cartas de poder mostram só o retrato do monstro, e as escolhas parecem iguais.
- **Poderes por classe:** `ui/poderes.png`, 128 px, 8 × 3: ataque básico, habilidade 1 e habilidade 2 de cada uma das 8 classes (guardião, guerreiro, assassino, caçador, mago, invocador, místico, xamã).
- **Despertos (24) e Uniões (6):** `ui/despertos.png`, 128 px, 8 × 4.
- **Presságios (11):** `ui/pressagios.png`, 128 px, 4 × 3 — Lua de Sangue, Maré de Ouro, Lâmina de Vidro, Estrela da Sorte, Tempestade Elemental, Pés Ligeiros, Colosso, Enxame, Olho do Caçador, Eco Ancestral, Vastidão.
- **Cartas Proibidas (6):** `ui/proibidas.png`, 128 px, 3 × 2 — Pacto de Sangue, Coração de Vidro, Ganância, Fome do Enxame, Frenesi Selvagem, Olho da Tormenta (estilo sombrio, vermelho-sangue).
- **Relíquias (34):** reconverter em 128 px; passam a aparecer na escolha de portal e na Bolsa.
- **Molduras de carta por raridade** (comum, incomum, raro, épico, lendário, proibida), 9-slice: `ui/cartas_raridade.png`.

### P3 · Interface
- Faixa de "Nível X!", faixa de sequência de abates ("Massacre!") e faixa de chefe chegando (`ui/faixas_anuncio.png`).
- Pele da barra de XP e de vida (`ui/barras.png` já existe; versão com brilho correndo).
- Retratos 256 × 256 das 47 Lendas e deuses em busto, para a tela de escolha do herói.

---

## 5. Resumo da quantidade

| Prioridade | Item | Folhas |
|---|---|---|
| P1 | Herói básico | 1 + retrato |
| P1 | Ovos | 8 |
| P1 | Baús e coletáveis | 2 |
| P1 | Monstros: reconversão | 408 + 153 (só exportar) |
| P1 | Monstros: ações (começando por Adulto e Supremo) | até 408 (306 de Adulto e Supremo) |
| P1 | Monstros: raridades próprias | ~32 |
| P1 | Inimigos comuns | 34 |
| P2 | Mini, chefes e Guardiões (reconversão + linhas novas) | 75 |
| P2 | Lendas e deuses: ações | 47 |
| P2 | Efeitos elementais | 8 |
| P2 | Especiais e combinados refeitos | 33 |
| P2 | Abismo (paredão, cachoeira, 2 fundos), pisos e pontes | ~170 |
| P3 | Ambiente animado, fauna, partículas, objetos | ~105 |
| P3 | Ícones (poderes, despertos, presságios, proibidas, relíquias) e molduras | ~7 |
| P3 | Interface | ~50 |

**Sugestão de ordem:** herói, ovos, baús e coletáveis (poucas folhas, impacto enorme); depois inimigos e efeitos elementais; depois a reconversão de tudo em 128/256 px; e por fim as ações extras dos monstros e Lendas, aos poucos, um elemento por vez.

## 6. O que pedir à outra conversa

> Com base neste documento, monte um pacote de prompts de geração de imagem para o jogo Elementar, um prompt por folha, seguindo as regras técnicas da seção 2 em todos eles. Para itens repetidos (8 elementos, 34 reinos, 51 monstros, 47 Lendas), faça um modelo com as partes que mudam bem marcadas e a lista de valores para cada um (nome, elemento, cores, descrição do personagem). Organize na ordem de prioridade P1, P2, P3 e indique o nome do arquivo e a pasta de cada folha.

Quando as folhas chegarem, eu ajusto o código para ler os formatos novos (herói, ovos, baús, efeitos, inimigos de 9 linhas, ações dos monstros) e mantenho o desenho por código como reserva enquanto a arte não existir.
