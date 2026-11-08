# Elementar · pacote de prompts de arte (v2)

Pacote pronto para gerar as folhas novas e refazer as antigas. Baseado numa auditoria do jogo rodando: pranchas de todas as 408 formas de monstro, combate com cada uma das 8 classes, luta de chefe nas 7 eras, medição automática das 440 folhas de animação e das 34 folhas de inimigos.

Os dados de cada personagem (nome, visual, jeito, inimigos de cada reino, chefes, Lendas) estão no anexo **`PACOTE_PROMPTS_DADOS.md`**. Os prompts abaixo têm campos entre `{chaves}` para preencher com esses dados.

Como usar: copie o **Bloco de estilo** e o **Bloco técnico** no começo de cada prompt, depois o prompt da folha. Quando o prompt pedir referência, **anexe a folha atual** indicada (ela está em `arte/...`), para o gerador manter o mesmo personagem. Os prompts estão em inglês porque os geradores de imagem respondem melhor; as explicações estão em português.

---

## 1. O que a auditoria encontrou (e o que cada folha nova resolve)

| # | Problema visto no jogo | Prova | Solução neste pacote |
|---|---|---|---|
| 1 | As raridades Épica e Lendária dos monstros viram manchas sem detalhe | Prancha das 408 formas: as duas últimas colunas (Ryu, Amaru, Banshee, Kodama, Sereia, Iara) saem com textura de ruído; o Poraquê não tem forma de raridade | **M3**: folhas próprias de Épico e Lendário |
| 2 | Os golpes dos monstros quase não aparecem e as 8 classes parecem iguais | Combate com cada classe: só traços finos e anéis pequenos; a nuvem de veneno é uma mancha verde chapada | **E1–E3**: golpes, projéteis e áreas por elemento e por classe |
| 3 | Despertos (ex.: Bastião Ancestral) e o Despertar viram um clarão branco que cobre a luta | Luta na Atlântida e no Egito: cúpulas hexagonais brancas sobrepostas | **E4**: efeitos próprios dos Despertos e do Despertar |
| 4 | Monstros com só 3 ações (parado, andando, atacando), poucos quadros e desenhados a 64 px | Medição: 332 das 440 folhas têm só 4 quadros de parado | **M1** (refazer em 128 px) e **M2** (ações e jeitinhos novos) |
| 5 | Herói básico desenhado por código, simples perto dos monstros | Telas de combate | **H1** |
| 6 | Ovos, baús, cristais e moedas desenhados por código | Telas de mapa e de baú | **I1–I3** |
| 7 | Inimigos pequenos (48 px), com só 2 quadros de ataque; 6 folhas com linhas fora da grade e 7 com alturas que variam entre quadros | Verificação automática das 34 folhas | **N1** |
| 8 | Chefes pequenos e às vezes fora da tela; sem entrada nem transformação | Luta de chefe nas 7 eras | **N2** |
| 9 | Totens do Xamã são postes simples | Combate da classe Xamã | **E3** (linha do Xamã) |
| 10 | Abismo com paredão pixelado e fundo de uma camada só | Telas do abismo | **C1** |
| 11 | Pisos com costura (Pérsia, Tenochtitlán, Atlântida, Távola) e ponte vertical sem arte | Verificação dos pisos | **C2, C3** |
| 12 | Lendas (agora herói da run) a 64 px e com só 3 ações | Tela da run com Héracles | **L1** |
| 13 | Relíquias e poderes sem ícone nas cartas | Telas de escolha | **U1–U3** |

---

## 2. Bloco de estilo (colar em todo prompt)

```
Art style: high-detail painted pixel art for a 2D action roguelite (Vampire Survivors-like) seen from a
top-down 3/4 camera, in the spirit of Sea of Stars, Octopath Traveler and Hades: rich saturated colors,
soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or
plum, never pure black), strong readable silhouette that still reads when scaled down to 24 px tall.
Mythological fantasy theme with 8 elements: fire, water, earth, air, lightning, nature, light, shadow.
```

## 3. Bloco técnico (colar em todo prompt de folha)

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

Se o gerador não aceitar um tamanho exato, gere maior mantendo a grade (ex.: célula de 256) e a ferramenta `converter_artes.ps1` reduz.

---

## 4. Prompts

### H1 · Herói básico (P1)
- **Arquivo:** `arte/heroi/invocador__anim.png` · grade 8 × 8 · célula 128 px.
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

### M1 · Monstros: refazer as 408 folhas em 128 px (P1)
Uma por forma. Anexe a folha atual `arte/monstros/{elemento}/{id}__anim_{n}.png` como referência.
- **Arquivo:** o mesmo nome · grade 8 × 3 · célula 128 px (antes 6 × 3 de 64).
```
Redraw the attached sprite sheet at higher resolution and with smoother animation. Keep exactly the same
creature design, colors and personality: {nome da forma}, {visual}. Signature trait: {traço}.
Row 1: idle loop, 8 frames (breathing, small secondary motion of tail/flames/hair/wings).
Row 2: walk or fly loop, 8 frames.
Row 3: basic attack, 8 frames: 2 anticipation, 2 strike, 2 impact hold, 2 recovery.
```
Ordem das formas: `__anim_1` Filhote, `_2` Jovem, `_3.._5` Adulto (ramos A, B, C), `_6.._8` Supremo (ramos A, B, C). Comece pelos Adultos e Supremos.

### M2 · Monstros: ações novas e jeitinhos (P1 para Adulto e Supremo, P2 para Filhote e Jovem)
- **Arquivo:** `arte/monstros/{elemento}/{id}__acoes_{n}.png` · grade 8 × 5 · célula 128 px.
```
Same creature as the attached sheet: {nome da forma}, {visual}. Personality: {jeito}.
Row 1: skill 1 cast for a {classe} - 8 frames (wind-up, release, recovery).
Row 2: skill 2 / special - 8 frames, bigger and more dramatic than row 1.
Row 3: hurt 2 frames + stunned 2 frames + celebrating 4 frames.
Row 4: personality idle variations - 4 frames of a quirk that shows "{jeito}" (example: shy peeks,
proud chest puff, sleepy yawn, playful hop) + 4 frames looking around.
Row 5: summon entrance rising from a glowing circle on the ground, 6 frames + knocked out 2 frames.
```
Para os Supremos, acrescente: `Row 2 is the ultimate move: {golpe final do Supremo}.`

### M3 · Monstros: Épico e Lendário com arte própria (P1)
Hoje o jogo repinta a forma comum e sai manchado. Gere uma folha por raridade para cada forma Adulta e Suprema (as que mais aparecem), em 8 × 3 de 128 px como na M1.
- **Arquivo:** `arte/monstros/{elemento}/{id}__anim_{n}__epico.png` e `__lendario.png`.
```
Rare variant of the attached creature, same pose and animation as the reference, redesigned as an
{EPIC: crystalline silver-violet variant with glowing runes and sharper details | LEGENDARY: radiant
gold-and-white variant with a soft halo, flowing light particles and ornamental armor/markings}.
Keep the silhouette recognizable as {nome da forma}. Row 1 idle 8, row 2 walk/fly 8, row 3 attack 8.
```
Prioridade: Poraquê (não tem raridade), Ryu, Amaru, Banshee, Kodama, Sereia, Iara, Tengu, Qilin, Frankenstein.

### M4 · Dragões ancestrais (P1)
- Refazer `arte/lendarios/{id}__base.png` como 6 imagens soltas de 256 px (ovo, filhote, jovem, adulto, supremo, retrato) e `__eclosao.png` como grade 8 × 1 de 256 px (ovo pulsando, rachando, estourando, filhote surgindo).
- `__anim_1..4` como na M1, em 8 × 3 de 128 px.

### H2 · Lendas e deuses como herói (P2)
Anexe `arte/lendas/{id}.png` (ou `arte/panteao/{id}.png`).
- **Arquivo:** `arte/lendas/{id}__anim.png` · grade 8 × 6 · célula 128 px.
```
{nome}, mythological hero of {reino}, elements {elementos}. Keep the attached design.
Row 1 idle 8 · Row 2 walk 8 · Row 3 cast own power "{poder}" 8 · Row 4 dodge 8 ·
Row 5 hurt 3 + victory 5 · Row 6 {deuses: Divine Gift "{dom}" 8 | lendas: special pose 8}.
```

### I1 · Ovos (P1)
- **Arquivo:** `arte/ovos/ovo__{elemento}.png` (8 elementos) · grade 8 × 3 · célula 128 px · uma linha por raridade (comum, raro, lendário).
```
Magical creature egg of the {elemento} element. Row 1 common: simple shell with an {elemento} pattern.
Row 2 rare: silver filigree and a small gem. Row 3 legendary: ornate golden shell, glowing gem, aura.
Columns 1-4: gentle wobble loop. Columns 5-7: cracking, cracks glowing in the element color.
Column 8: shell bursting with a flash and flying shards.
```

### I2 · Baús (P1)
- **Arquivo:** `arte/itens/baus.png` · grade 8 × 4 · célula 128 px · linhas: madeira, prata, ouro, lendário (cristal arcano).
```
Treasure chest seen from the front at a 3/4 angle. Col 1 closed; cols 2-3 shaking in anticipation;
cols 4-6 opening, the lid tilting back; cols 7-8 open with light pouring out (loop).
```

### I3 · Coletáveis (P1)
- **Arquivo:** `arte/itens/coletaveis.png` · grade 8 × 5 · célula 64 px.
```
Row 1: XP crystals - blue, green, purple, gold, 2 sparkle frames each.
Row 2: gold coin spinning, 8 frames. Row 3: healing heart pulsing 4 + star bonus 4.
Row 4: Essence orb 4 + key 4. Row 5: item drop sparkle burst, 8 frames.
```

### N1 · Inimigos comuns (P1)
Anexe `arte/reinos/{era}/{reino}__inimigos.png`. Os 3 inimigos de cada reino estão no anexo.
- **Arquivo:** o mesmo nome · grade 8 × 9 · célula 128 px (antes 8 × 6 de 48).
```
Three enemies of {reino} (element {elemento}), redrawn bigger with the same designs as the reference.
For each enemy, 3 rows:
  A) idle 2 frames + move 6 frames ({anda});
  B) attack 6 frames ({golpe}) + hurt 2 frames;
  C) death 5 frames ({ao morrer}) + quirk 3 frames ({mania}).
Rows 1-3 = {tipo 0}, rows 4-6 = {tipo 1}, rows 7-9 = {tipo 2}. Same size for the three enemies.
```

### N2 · Mini-chefes, chefes e Guardiões (P2)
Anexe `__mini.png`, `__chefe.png` ou `guardiao_{era}__anim.png`.
- **Arquivo:** o mesmo nome · grade 8 × 8 · célula 256 px.
```
{nome do chefe} of {reino}. Keep the attached design.
Row 1 idle 8 · Row 2 move 8 · Row 3 attack "{golpe 1}" 8 · Row 4 attack "{golpe 2}" 8 ·
Row 5 entrance (rises from the ground / descends / steps through a portal) 8 ·
Row 6 phase 2 transformation "{fase 2}" 8 · Row 7 enraged attack 8 · Row 8 long death 8.
```
- **Efeitos do chefe:** `__efeitos.png` em 8 × 3 de 128 px (projétil 4 + impacto 4 por golpe).

### E1 · Golpes por elemento (P2)
- **Arquivo:** `arte/efeitos/elemento__{elemento}.png` (8) · grade 8 × 6 · célula 128 px.
```
Visual effects for the {elemento} element, transparent background, additive-friendly bright core.
Row 1 hit spark 8 · Row 2 projectile/orb loop 6 + trail 2 · Row 3 ground explosion seen from above 8 ·
Row 4 crescent slash arc 8 · Row 5 Awakening aura loop around a character 8 ·
Row 6 summoning circle on the ground in top-down perspective: 4 opening + 4 glowing loop.
```

### E2 · Especiais e combinados (P2)
Os atuais vieram cortados e estão desligados.
- `arte/efeitos/especial__{classe}_{1|2}.png` (16) e `arte/efeitos/combinado__{nome}.png` (17) · **8 quadros em 1 linha, célula 256 px** (2048 × 256), cada quadro inteiro na sua célula.

### E3 · Assinatura de cada classe (P2)
- **Arquivo:** `arte/efeitos/classe__{classe}.png` (8) · grade 8 × 3 · célula 128 px.
```
Signature combat effects for the {classe} class (neutral white-gold, the game tints by element):
Guardian: shield dome ripple, taunt shockwave. Warrior: heavy cleave arc, ground crack.
Assassin: shadow dash streak, X slash. Hunter: arrow, arrow rain marker. Mage: magic missile, rune burst.
Summoner: summoning portal, spirit wisp. Mystic: healing bloom, poison cloud (soft volumetric, not flat).
Shaman: carved spirit totem with glowing gem (idle loop + activation + break).
Row 1 basic attack 8 · Row 2 skill 1 8 · Row 3 skill 2 8.
```

### E4 · Despertos e Despertar (P2)
- **Arquivo:** `arte/efeitos/desperto__{id}.png` (24) · 8 quadros de 256 px; e `arte/efeitos/despertar.png` (onda de energia a partir do herói, 8 × 2 de 256).
- **Pedido ao gerador:** efeito translúcido com o núcleo brilhante e as bordas suaves. Nada de formas brancas chapadas cobrindo os personagens.

### C1 · Abismo (P2)
- `arte/reinos/{era}/{reino}__paredao.png`: **faixa contínua emendável na horizontal**, 1024 × 256 (rocha com vegetação no topo e base sumindo em névoa) + `__cachoeira.png` 8 × 1 de 128 × 256 em ciclo.
- `__fundo.png` 1024 × 1024 emendável (o mais distante: nuvens, água ou lava conforme o reino) e `__fundo2.png` 1024 × 1024 emendável com ilhas e rochas flutuando, fundo transparente.

### C2 · Pisos (P2)
- `arte/reinos/{era}/{reino}__piso.png` 1024 × 1024 **emendável nos 4 lados**. Começar por Pérsia, Tenochtitlán, Atlântida e Távola. Detalhe médio: o piso não pode competir com os personagens (contraste moderado).

### C3 · Pontes e peças (P2)
- `__ponte.png`: grade 4 × 2 de 256 px — horizontal (de frente, com arcos) e vertical (vista de cima, só o tabuleiro com parapeitos), cada uma com cabeceira A, segmento emendável, segmento com detalhe e cabeceira B.
- `__pecas.png`: 512 por peça (praça, lago, construção).

### C4 · Ambiente animado (P3)
- `__props_anim.png` 8 × 4 de 128: tocha ou braseiro do reino (ciclo 8), lanterna (8), planta grande balançando (8), bandeira ou tecido ao vento (8).
- `__fauna.png` 8 × 3 de 128: ave voando, bicho do chão andando e pulando, peixe ou inseto.
- `arte/efeitos/particulas.png` 8 × 6 de 32: folha, pétala, neve, cinza, brasa, esporo (8 quadros girando cada).
- `__objetos.png`: refazer em 96 px no formato 8 × N atual (intacto, trincado, quebrado, estado especial, 4 cacos).
- `ambiente/{tipo}.png` (12 superfícies): 8 × 2 de 64; linha 2 em ciclo de 8 para água, fogo, elétrico, vapor, luz e sombra.

### U1–U3 · Ícones e interface (P3)
- `ui/poderes.png` 8 × 3 de 128 (básico, habilidade 1 e habilidade 2 de cada classe).
- `ui/despertos.png` 8 × 4 de 128 (24 Despertos + 6 Uniões).
- `ui/pressagios.png` 4 × 3 de 128 (11 Presságios) e `ui/proibidas.png` 3 × 2 de 128 (6 Cartas Proibidas, estilo sombrio vermelho-sangue).
- `itens/reliquias/*`: refazer em 128 px (34).
- `ui/cartas_raridade.png`: molduras 9-slice de carta para comum, incomum, raro, épico, lendário e proibida.
- `ui/faixas_anuncio.png`: faixas de "Nível X!", "Massacre!" e "Chefe chegando".
- Retratos 512 × 512 das 47 Lendas e deuses (`lendas/{id}__retrato.png`).

---

## 5. Ordem de produção sugerida

1. **Primeira leva (mais impacto, poucas folhas):** H1 herói, I1 ovos, I2 baús, I3 coletáveis, E1 golpes por elemento (8), E3 classes (8).
2. **Segunda leva:** M1 + M2 para as formas Adulto e Supremo de um elemento por vez (fogo primeiro), M3 para os 10 da lista de prioridade, N1 inimigos da 1ª era.
3. **Terceira leva:** N2 chefes, H2 Lendas, E2 e E4 efeitos grandes, C1 a C3 cenário.
4. **Depois:** o resto da M1 e M2, C4 e U1 a U3.

Quando cada leva chegar, eu ajusto o código para os formatos novos (8 quadros por linha, folhas de ações, ovos, baús, efeitos, inimigos com 9 linhas, chefes com 8 linhas) e confiro tudo com a verificação automática e prints, como fizemos agora. Enquanto uma folha não existir, o jogo continua usando a arte ou o desenho atual.
