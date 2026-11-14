# Elementar · pacote de prompts de arte (v3, organizado por ordem de geração)

Substitui a ordem dos pacotes anteriores (`PACOTE_PROMPTS.md` e `PACOTE_ARTES_COMPLETO.md`). Os prompts foram conferidos um a um contra o que o código do jogo lê hoje. Os dados de cada monstro, inimigo, chefe e Lenda (nome, visual, traço, jeito, golpes) continuam no anexo **`PACOTE_PROMPTS_DADOS.md`**.

---

## 0. A ordem, em uma frase

**Primeiro a folha base de cada monstro; depois o que copia dela (Épico, Lendário e ações).** O resto (herói, ovos, baús, efeitos, cenário) não depende dos monstros e pode ser feito em qualquer ordem.

| Etapa | O que é | Depende de | O jogo já usa? |
|---|---|---|---|
| **0. Reconverter** | artes que estão boas no original e só ficaram achatadas na conversão | nada (não gera nada) | sim |
| **1. Corrigir** | artes com defeito que o jogo usa hoje (inimigos fora da grade, pisos com costura, efeitos cortados) | nada | sim |
| **2. Base dos monstros** | refazer `__anim_N` em 128 px com 8 quadros por linha | nada | **sim** (a partir de agora o jogo lê 6 ou 8 quadros por linha) |
| **3. Variações dos monstros** | Épico e Lendário com arte própria; folha de ações | **a base nova da etapa 2** | Épico e Lendário: **sim**; ações: ainda não (eu ligo quando chegarem) |
| **4. Novas independentes** | herói, ovos, baús, coletáveis, golpes por elemento e por classe | nada | ainda não (hoje são desenhados por código; eu ligo quando chegarem) |
| **5. Complementares** | chefes, inimigos maiores, Lendas, cenário, ícones | nada | parte sim, parte não (indicado em cada item) |

### Por que a base vem antes das variações

A folha de ações e as de Épico e Lendário pedem ao gerador para **copiar o monstro da folha anexada**. Se você anexar a folha antiga (64 px, 6 quadros), o gerador copia um desenho pequeno e borrado. Além disso, a criatura pode sair num tamanho e numa posição diferentes da folha nova.

**Regra: sempre anexe a folha base NOVA (etapa 2) como referência das etapas 3.** Se um monstro ainda não tem a base nova, faça a base dele primeiro.

### O "refazer todas as animações" é para quê?

Não é para o monstro aparecer maior na tela: **o tamanho na tela é o jogo que decide** (18 px de mundo no Filhote até 28 px no Supremo, independente do tamanho do desenho).

Refazer serve para:
- **Nitidez:** 128 px por quadro em vez de 64 px.
- **Animação mais suave:** 8 quadros por linha em vez de 6 (o parado hoje tem só 4).
- **Acertar a grade:** nas folhas antigas o desenho invade a célula vizinha e o jogo tem de adivinhar onde cortar.

Se a folha que você já corrigiu de um monstro **já está em 128 px, na grade certa, com 8 quadros por linha**, ela já é a base nova: não precisa refazer de novo. Se ela está no formato antigo (6 × 3 de 64 px), ela funciona no jogo, mas vale refazer quando der, começando pelas formas Adulto e Supremo, que são as mais vistas.

---

## 1. Como usar cada prompt

1. Cole o **Bloco de estilo** e o **Bloco técnico** (seção 2).
2. Cole o prompt da folha e troque os campos `{entre chaves}` pelos dados do anexo `PACOTE_PROMPTS_DADOS.md`.
3. Anexe a referência indicada no item, se houver.
4. Salve com o nome de arquivo indicado e converta (seção 1.1).
5. Rode `npm run artes` (ou me mande): a conferência automática diz se a grade, a linha do chão e a transparência estão certas.

### 1.1. Conversão: o que o conversor faz sozinho e o que você me manda

O conversor (`ferramentas/converter_artes.ps1`) só reconhece **arquivos que o jogo já tem** (mesmo nome de hoje). Arquivos com nome novo ele pula com o aviso "não sei onde o jogo usa".

| Tipo | Como converter |
|---|---|
| Correções com o mesmo nome (etapa 1) | conversor normal |
| Base nova dos monstros `__anim_N` em 8 × 3 (etapa 2) | conversor só na pasta dos monstros com `-Escala 2.6667 -Apenas monstros`, para os quadros ficarem com 128 px (com a escala padrão 2 saem com 96 px: funcionam, mas menos nítidos). Uma vez só por arquivo: rodar de novo sobre o mesmo arquivo aumenta a largura outra vez |
| Nomes novos: `__anim_N__epico`, `__anim_N__lendario`, `__acoes_N`, herói, ovos, baús, coletáveis, efeitos novos, ícones novos | **me mande os PNG originais** (Drive ou anexando aqui) que eu converto, registro no manifesto e confiro no jogo |

```
powershell -ExecutionPolicy Bypass -File ferramentas\converter_artes.ps1 -Origem "C:\caminho\da\pasta\arte" -Escala 2.6667 -Apenas monstros
```

Os prompts estão em inglês porque os geradores respondem melhor assim. Se o gerador não aceitar um tamanho exato, gere maior mantendo a grade (ex.: célula de 256 px). O conversor reduz.

---

## 2. Blocos para colar em todo prompt

### Bloco de estilo

```
Art style: high-detail painted pixel art for a 2D action roguelite (Vampire Survivors-like) seen from a
top-down 3/4 camera, in the spirit of Sea of Stars, Octopath Traveler and Hades: rich saturated colors,
soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or
plum, never pure black), strong readable silhouette that still reads when scaled down to 24 px tall.
Mythological fantasy theme with 8 elements: fire, water, earth, air, lightning, nature, light, shadow.
```

### Bloco técnico (folhas de personagem e de efeito)

```
Sprite sheet rules: transparent background (PNG with alpha), no floor, no cast shadow, no text, no grid
lines, no frame borders. Exact uniform grid of {COLS} columns x {ROWS} rows of square cells, each cell
{CELL}x{CELL} px, total image {COLS*CELL}x{ROWS*CELL} px. Every frame stays fully inside its own cell
with ~6% empty margin: nothing (tails, weapons, sparks, glow) may cross into a neighbouring cell. Feet
(or the base of a floating body) sit on the same horizontal line in every frame, at 85% of the cell
height. Same scale and same character size in every frame and row. Character faces RIGHT in every frame.
Animation rows read left to right; looping rows loop seamlessly (last frame flows into the first).
Natural proportions, never stretched or squashed.
```

### Bloco de referência (colar quando anexar uma folha)

```
Use the attached sprite sheet as the exact character reference: same design, same colors, same
proportions, same size inside the cell and same feet line. Only change what this prompt asks for.
```

---

## 3. Etapa 0 · Reconverter (não gera nada)

Rode o conversor uma vez sobre a pasta dos **originais** que já existem (`-Escala 2`). Isto conserta artes que ficaram achatadas na primeira conversão:

| Arquivos | Problema hoje |
|---|---|
| `lendarios/*__base` e `*__eclosao` (16) | esmagados numa faixa (1536 × 1024 virou 320 × 64) |
| `lendarios/*__anim_*` (32) | 25% mais baixos |
| `reinos/*/*__tiles` e `*__fauna` (68) | linhas fora da grade |
| `ui/` ícones de classes, elementos, linhagens e itens | achatados (64 px de altura para 8 ícones) |

```
powershell -ExecutionPolicy Bypass -File ferramentas\converter_artes.ps1 -Origem "C:\caminho\da\pasta\arte"
```

Se precisar rodar de novo depois, use `-Escala 1` (senão a largura dobra outra vez).

---

## 4. Etapa 1 · Corrigir (o jogo usa hoje)

As correções de monstros você já fez. Faltam estas:

### C-INI · Inimigos fora da grade
- **Quais:** Floresta Negra, Reino da Luz, Laboratório, Atlântida, Shangri-lá, Tenochtitlán (linhas fora da grade); Egito, Celta, Eslavo, Amazônia (altura muda entre os quadros de andar).
- **Formato que o jogo lê hoje:** `arte/reinos/{era}/{reino}__inimigos.png`, grade **8 × 6**, célula 48 px ou maior (pode gerar em 128 px; o conversor reduz e o jogo lê).
- **Anexe** a folha atual.
```
Three enemies of {reino} (element {elemento}), same designs as the attached sheet, redrawn on a clean grid
of 8 columns x 6 rows. For each enemy, 2 rows: row A = idle 2 frames + move 6 frames ({anda});
row B = attack 6 frames ({golpe}) + hurt 2 frames. Rows 1-2 = {tipo 0}, rows 3-4 = {tipo 1},
rows 5-6 = {tipo 2}. Same size for the three enemies. Leave clear empty space between rows.
```
> Se preferir já fazer a versão maior com morte e mania (8 × 9), ela está na etapa 5 (N1). Não faça as duas: escolha uma.

### C-PISO · Pisos com costura
- **Quais:** Pérsia, Tenochtitlán, Atlântida, Távola.
- **Arquivo:** `arte/reinos/{era}/{reino}__piso.png`, 1024 × 1024, **emendável nos 4 lados**.
```
Seamless tileable ground texture for {reino}, top-down view, 1024x1024, tiles perfectly on all four
edges. Midtone, low contrast and low saturation in the walkable area so characters stand out; small
details concentrated near the edges. No objects, no shadows, no text.
```

### C-CHEFE · Moldura em volta do chefe
- **Quais:** Reino do Fogo e Reino da Terra (`__chefe.png`).
- **Formato que o jogo lê hoje:** grade **6 × 6**. Anexe a folha atual e peça o mesmo desenho sem a moldura fina em volta das células.

### C-EFX · Especiais e combinados cortados (hoje desligados)
- **Arquivos:** `arte/efeitos/especial__{classe}_{1|2}.png` (16) e `arte/efeitos/combinado__{nome}.png` (17).
- **Formato:** **1 linha** de quadros quadrados lado a lado, sem espaço entre eles: especial 8 quadros, combinado 10 quadros, célula 256 px (ex.: 8 × 256 = 2048 × 256).
```
Visual effect only, NO character: {descrição do golpe}. Transparent background, seen from a top-down 3/4
camera. One single row of {8|10} square frames of 256x256 px side by side, no gaps. The effect is centered
in every frame: it starts small, grows to its peak and fades out. Bright core with soft translucent
edges; never opaque white shapes covering the scene.
```

### C-REL · Relíquias sem desenho
- **Arquivos:** `arte/itens/reliquias/{reino}.png` (34), 128 × 128.
```
Single relic item icon from {reino}: {nome da relíquia}. Centered, transparent background, 128x128,
3/4 view, readable at 32 px. No text, no frame.
```

---

## 5. Etapa 2 · Base nova dos monstros (refazer `__anim_N`)

**É a folha mestre.** Tudo o que vem depois copia dela.

- **Arquivo:** `arte/monstros/{elemento}/{id}__anim_{n}.png` (o mesmo nome de hoje).
- **Grade:** **8 colunas × 3 linhas, célula 128 px (1024 × 384)**. O jogo lê esta folha nova e também a antiga (6 × 3) e escolhe pelo tamanho da imagem.
- **Anexe:** a folha atual (ou a que você corrigiu) da mesma forma.
- **Ordem das formas:** `_1` Filhote, `_2` Jovem, `_3` a `_5` Adulto (ramos A, B, C), `_6` a `_8` Supremo (ramos A, B, C). **Comece pelos Adultos e Supremos.**

```
Redraw the attached sprite sheet at higher resolution and with smoother animation. Keep exactly the same
creature design, colors and personality: {nome da forma}, {visual}. Signature trait: {traço}.
Grid: 8 columns x 3 rows, 128x128 px cells (1024x384 total).
Row 1: idle loop, 8 frames (breathing, small secondary motion of tail/flames/hair/wings).
Row 2: walk or fly loop, 8 frames.
Row 3: basic attack, 8 frames: 2 anticipation, 2 strike, 2 impact hold, 2 recovery.
```

Acrescente conforme o monstro (saiu da auditoria das telas):
- **Supremos (`_6` a `_8`):** `Make the silhouette noticeably bigger and more imposing than the adult form, filling more of the cell.`
- **Monstros escuros que somem no chão** (Jiangshi, Vampiro, Cérbero, outros de Sombra): `Add a clear rim light in the {elemento} color around the silhouette.`
- **Monstros etéreos que ficam lavados** (Banshee, Raijū, Kitsune, outros de Ar e Raio): `Keep a saturated glowing core and a firm dark outline; avoid pale washed-out edges.`

---

## 6. Etapa 3 · Variações dos monstros (depende da etapa 2)

### M3 · Épico e Lendário com arte própria (o jogo já usa)
Hoje o jogo pinta a forma comum com outras cores e sai manchado. Com esta folha ele usa o desenho próprio.
- **Arquivos:** `arte/monstros/{elemento}/{id}__anim_{n}__epico.png` e `__anim_{n}__lendario.png`.
- **Grade:** a mesma da base nova: **8 × 3, célula 128 px**.
- **Anexe:** a base NOVA `__anim_{n}` da etapa 2.
- **Prioridade:** Poraquê (não tem raridade), Ryu, Amaru, Banshee, Kodama, Sereia, Iara, Tengu, Qilin, Frankenstein. Formas Adulto e Supremo primeiro.

```
Rare variant of the attached creature, same poses, same animation timing and same size as the reference,
redesigned as an {EPIC: crystalline silver-violet variant with glowing runes and sharper details |
LEGENDARY: radiant gold-and-white variant with a soft halo, flowing light particles and ornamental
armor/markings}. Keep the silhouette recognizable as {nome da forma}.
Grid: 8 columns x 3 rows, 128x128 px cells. Row 1 idle 8, row 2 walk/fly 8, row 3 attack 8.
```

### M2 · Ações e jeitinhos (o jogo ainda não usa; eu ligo quando chegarem)
São as animações de habilidade, especial, dano, comemoração, manias e entrada. Gere **depois** da base e das raridades: é a de menor urgência entre os monstros, porque o jogo só vai mostrar quando eu ligar as habilidades a estas linhas.
- **Arquivo:** `arte/monstros/{elemento}/{id}__acoes_{n}.png`.
- **Grade:** **8 × 5, célula 128 px (1024 × 640)**.
- **Anexe:** a base NOVA `__anim_{n}` da etapa 2.

```
Same creature as the attached sheet: {nome da forma}, {visual}. Personality: {jeito}.
Grid: 8 columns x 5 rows, 128x128 px cells (1024x640 total).
Row 1: skill 1 cast for a {classe} - 8 frames (wind-up, release, recovery).
Row 2: skill 2 / special - 8 frames, bigger and more dramatic than row 1.
Row 3: hurt 2 frames + stunned 2 frames + celebrating 4 frames.
Row 4: personality idle variations - 4 frames of a quirk that shows "{jeito}" (example: shy peeks,
proud chest puff, sleepy yawn, playful hop) + 4 frames looking around.
Row 5: summon entrance rising from a glowing circle on the ground, 6 frames + knocked out 2 frames.
```
Para os Supremos, acrescente: `Row 2 is the ultimate move: {golpe final do Supremo}.`

### M4 · Dragões ancestrais
- `arte/lendarios/{id}__anim_{1..4}.png`: igual à etapa 2 (**8 × 3 de 128 px**; o jogo já lê).
- `__base.png` e `__eclosao.png`: **reconverta primeiro (etapa 0)**. Só gere de novo se, depois de reconvertidos, continuarem ruins.

---

## 7. Etapa 4 · Novas independentes (o jogo ainda desenha por código)

Não dependem dos monstros: podem ser feitas a qualquer momento. Enquanto não chegam, o jogo continua com o desenho por código. Quando chegar cada uma, eu ligo no código e confiro com prints.

### H1 · Herói básico
- **Arquivo:** `arte/heroi/invocador__anim.png` · grade **8 × 8** · célula 128 px (1024 × 1024).
```
A young adventurer summoner, heroic proportions (head about 1/3 of the height, not chibi), messy chestnut
hair, red scarf, short blue cape, cream tunic with a golden belt, leather boots, short sword with a round
gem on the pommel (paint the gem pale white-blue, the game recolors it).
Row 1: idle breathing, 6 frames + 2 frames blinking.
Row 2: walk cycle, 8 frames.
Row 3: run cycle with cape flowing, 8 frames.
Row 4: dodge roll, 8 frames (crouch, roll, recover).
Row 5: command gesture - points the sword forward and the gem flares, 6 frames + 2 frames hold.
Row 6: casting the Awakening - raises both arms, energy swirls upward, 8 frames.
Row 7: hurt 3 frames + victory pose 5 frames.
Row 8: defeated - falls to one knee then lies down, 6 frames + 2 frames lying still.
```
- **Extra:** `arte/heroi/invocador__retrato.png`, busto 512 × 512, mesmo personagem, fundo transparente.

### I1 · Ovos
- **Arquivo:** `arte/ovos/ovo__{elemento}.png` (8) · grade 8 × 3 · célula 128 px · uma linha por raridade.
```
Magical creature egg of the {elemento} element. Row 1 common: simple shell with an {elemento} pattern.
Row 2 rare: silver filigree and a small gem. Row 3 legendary: ornate golden shell, glowing gem, aura.
Columns 1-4: gentle wobble loop. Columns 5-7: cracking, cracks glowing in the element color.
Column 8: shell bursting with a flash and flying shards.
```

### I2 · Baús
- **Arquivo:** `arte/itens/baus.png` · grade 8 × 4 · célula 128 px · linhas: madeira, prata, ouro, lendário (cristal arcano).
```
Treasure chest seen from the front at a 3/4 angle. Col 1 closed; cols 2-3 shaking in anticipation;
cols 4-6 opening, the lid tilting back; cols 7-8 open with light pouring out (loop).
```

### I3 · Coletáveis
- **Arquivo:** `arte/itens/coletaveis.png` · grade 8 × 5 · célula 64 px.
```
Row 1: XP crystals - blue, green, purple, gold, 2 sparkle frames each.
Row 2: gold coin spinning, 8 frames. Row 3: healing heart pulsing 4 + star bonus 4.
Row 4: Essence orb 4 + key 4. Row 5: item drop sparkle burst, 8 frames.
```

### E1 · Golpes e Poder de cada elemento
- **Arquivo:** `arte/efeitos/elemento__{elemento}.png` (8) · grade **8 × 7** · célula 128 px.
- A linha 7 é nova: o **Poder do Elemento**, que entrou no jogo agora (abre quando um monstro chega à forma Suprema).
```
Visual effects for the {elemento} element, transparent background, additive-friendly bright core.
Row 1 hit spark 8 · Row 2 projectile/orb loop 6 + trail 2 · Row 3 ground explosion seen from above 8 ·
Row 4 crescent slash arc 8 · Row 5 Awakening aura loop around a character 8 ·
Row 6 summoning circle on the ground in top-down perspective: 4 opening + 4 glowing loop ·
Row 7 Element Power "{poder do elemento}": {o que faz}, 8 frames, the biggest effect of the sheet.
```
Poder de cada elemento:

| Elemento | Poder | O que faz |
|---|---|---|
| fire | Eruption | explosions where enemies are densest, ground catches fire |
| water | Tide | a wave rushing out from the team, pushing enemies away |
| earth | Rockfall | boulders falling from the sky onto several enemies |
| air | Cyclone | a whirlwind pulling enemies in |
| lightning | Storm | lightning bolts striking several enemies |
| nature | Forest Blessing | healing bloom with roots grabbing nearby enemies |
| light | Solar Pillar | a column of sunlight on the strongest enemy |
| shadow | Shadow Embrace | dark tendrils pulling enemies into one point |

### E3 · Assinatura de cada classe
- **Arquivo:** `arte/efeitos/classe__{classe}.png` (8) · grade 8 × 3 · célula 128 px.
```
Signature combat effects for the {classe} class (neutral white-gold, the game tints by element):
Guardian: shield dome ripple, taunt shockwave. Warrior: heavy cleave arc, ground crack.
Assassin: shadow dash streak, X slash. Hunter: arrow, arrow rain marker. Mage: magic missile, rune burst.
Summoner: summoning portal, spirit wisp. Mystic: healing bloom, poison cloud (soft volumetric, not flat).
Shaman: carved spirit totem with glowing gem (idle loop + activation + break).
Row 1 basic attack 8 · Row 2 skill 1 8 · Row 3 skill 2 8.
Translucent effects with a bright core and soft edges: never opaque shapes covering the characters.
```

### E4 · Despertos e Despertar
- `arte/efeitos/desperto__{id}.png` (24): 8 quadros em 1 linha, célula 256 px.
- `arte/efeitos/despertar.png`: onda de energia a partir do herói, 8 × 2 de 256 px.
```
{nome do Desperto}: {descrição}. Translucent effect with a bright glowing core and soft edges, transparent
background, top-down 3/4 view. Never flat opaque white shapes covering the characters.
```

---

## 8. Etapa 5 · Complementares

### N1 · Inimigos maiores (8 × 9)
Versão maior com morte e mania. **Substitui a correção C-INI** (não faça as duas para o mesmo reino). Eu ajusto o código para ler 9 linhas quando chegar.
- **Arquivo:** `arte/reinos/{era}/{reino}__inimigos.png` · grade 8 × 9 · célula 128 px. Anexe a folha atual.
```
Three enemies of {reino} (element {elemento}), redrawn bigger with the same designs as the reference.
For each enemy, 3 rows:
  A) idle 2 frames + move 6 frames ({anda});
  B) attack 6 frames ({golpe}) + hurt 2 frames;
  C) death 5 frames ({ao morrer}) + quirk 3 frames ({mania}).
Rows 1-3 = {tipo 0}, rows 4-6 = {tipo 1}, rows 7-9 = {tipo 2}. Same size for the three enemies.
```
Nos reinos escuros (Reino da Sombra, Transilvânia, Xibalbá, Floresta Negra), acrescente: `Glowing emissive eyes and details so they read on a dark floor.`

### N2 · Mini-chefes, chefes e Guardiões (8 × 8)
Eu ajusto o código para 8 linhas quando chegar (hoje: chefe 6 × 6, mini 6 × 5). Anexe a folha atual.
- **Arquivo:** o mesmo nome · grade 8 × 8 · célula 256 px.
```
{nome do chefe} of {reino}. Keep the attached design.
Row 1 idle 8 · Row 2 move 8 · Row 3 attack "{golpe 1}" 8 · Row 4 attack "{golpe 2}" 8 ·
Row 5 entrance (rises from the ground / descends / steps through a portal) 8 ·
Row 6 phase 2 transformation "{fase 2}" 8 · Row 7 enraged attack 8 · Row 8 long death 8.
```
- **Efeitos do chefe:** `__efeitos.png` em 8 × 3 de 128 px (projétil 4 + impacto 4 por golpe).

### H2 · Lendas e deuses como herói
Anexe `arte/lendas/{id}.png` (ou `arte/panteao/{id}.png`).
- **Arquivo:** `arte/lendas/{id}__anim.png` · grade 8 × 6 · célula 128 px.
```
{nome}, mythological hero of {reino}, elements {elementos}. Keep the attached design.
Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.
Row 1 idle 8 · Row 2 walk 8 · Row 3 cast own power "{poder}" 8 · Row 4 dodge 8 ·
Row 5 hurt 3 + victory 5 · Row 6 {deuses: Divine Gift "{dom}" 8 | lendas: special pose 8}.
```
- **Falta arte:** Frankenstein não tem folha de herói (`lendas/frankenstein.png`).

### L-FX · Efeitos dos poderes das Lendas
- **Arquivo:** `arte/efeitos/lenda__{tipo}.png` · 10 tipos · 8 quadros × 1 linha · célula 192 px.
```
Signature power effect of a mythological hero, type "{tipo}", neutral white-gold so the game can tint it by
element, transparent background, bright core with soft translucent edges (never opaque white shapes).
orbita: 3 glowing relics orbiting · projetil: thrown weapon with motion trail · onda: ground shockwave ring ·
raio: chain lightning arc between two points · area: glowing zone on the ground (top-down perspective) ·
investida: dash streak with afterimages · invocar: spirit ally appearing from a portal ·
dardos: volley of small darts · drenar: life-steal beam with particles flowing back · barril: explosive cask
bursting. 8 frames: appear, peak, fade.
```

### C1 a C4 · Cenário
- **C1 Abismo:** `__paredao.png` faixa emendável na horizontal 1024 × 256 (rocha com vegetação no topo e base sumindo em névoa); `__fundo.png` 1024 × 1024 emendável; `__fundo2.png` 1024 × 1024 emendável com ilhas flutuando, fundo transparente.
- **C3 Pontes:** `__ponte.png` grade 4 × 2 de 256 px: horizontal (de frente, com arcos) e vertical (vista de cima, tabuleiro com parapeitos), cada uma com cabeceira A, segmento emendável, segmento com detalhe e cabeceira B.
- **C4 Ambiente animado:** `__props_anim.png` 8 × 4 de 128 (tocha, lanterna, planta balançando, bandeira); `__fauna.png` 8 × 3 de 128; `arte/efeitos/particulas.png` 8 × 6 de 32; `__objetos.png` em 96 px no formato 8 × N atual; `ambiente/{tipo}.png` 8 × 2 de 64.

### U1 a U3 · Ícones e interface
- `ui/poderes.png` 8 × 3 de 128 (básico, habilidade 1 e habilidade 2 de cada classe).
- `ui/despertos.png` 8 × 4 de 128 (24 Despertos + 6 Uniões).
- `ui/elementais.png` 8 × 1 de 128 (os 8 Poderes do Elemento, para a carta de nível). **Novo.**
- `ui/pressagios.png` 4 × 3 de 128 e `ui/proibidas.png` 3 × 2 de 128 (estilo sombrio vermelho-sangue).
- `ui/cartas_raridade.png`: molduras 9-slice de carta (comum, incomum, raro, épico, lendário, proibida).
- Retratos 512 × 512 das 47 Lendas e deuses (`lendas/{id}__retrato.png`).

---

## 9. O que mudou em relação aos pacotes anteriores

| Item | Antes | Agora | Por quê |
|---|---|---|---|
| Ordem | por prioridade, misturando tudo | por dependência: base dos monstros antes das variações | ações e raridades copiam a base; com a base velha saíam pequenas e diferentes |
| Monstros 8 × 3 (M1) | o jogo só lia 6 × 3 | o jogo lê 6 × 3 e 8 × 3 | a folha nova sairia cortada errada |
| Épico e Lendário (M3) | o jogo não lia | o jogo lê `__anim_N__epico/__lendario` | antes a folha nova seria ignorada |
| Folha de ações (M2) | 8 × 5 no pacote e 8 × 4 na conferência | 8 × 5 nos dois | estavam diferentes |
| Herói (H1) | 8 × 8 num documento e 8 × 7 em outro | 8 × 8 | estavam diferentes |
| Golpes por elemento (E1) | 8 × 6 | 8 × 7 | linha nova do Poder do Elemento |
| Correções de inimigos | só a versão 8 × 9 | correção no formato atual (8 × 6) **ou** versão nova 8 × 9 | a 8 × 6 o jogo já lê; a 8 × 9 precisa de ajuste no código |
| Dragões e ícones achatados | gerar de novo | reconverter primeiro | o original está bom |
| Bloco de referência | não havia | novo | evita o gerador mudar o tamanho e a posição do monstro |
