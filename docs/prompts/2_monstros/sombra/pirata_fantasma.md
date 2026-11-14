# Grumete Fantasma `pirata_fantasma` · Sombra · Caçador

pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Traço marcante: o chapéu de três pontas. Jeito: fanfarrão e aventureiro.

| Arquivo | Forma | Estágio | Elemento |
|---|---|---|---|
| `__anim_1` | Grumete Fantasma | Filhote | Sombra |
| `__anim_2` | Corsário Fantasma | Jovem | Sombra |
| `__anim_3` | Capitão Fantasma | Adulto (ramo A) | Sombra |
| `__anim_4` | Pistoleiro do Cais | Adulto (ramo B) | Sombra |
| `__anim_5` | Pirata Afogado | Adulto (ramo C) | Água |
| `__anim_6` | Capitão do Navio Errante | Supremo (ramo A) | Sombra |
| `__anim_7` | Pistoleiro das Marés Negras | Supremo (ramo B) | Sombra |
| `__anim_8` | Almirante do Abismo | Supremo (ramo C) | Água |

**Raridades** (cada uma é uma condição especial do ambiente, não só outra cor):
- **Épico: Mar gelado.** Condição: naufragou no mar congelado: a chama fantasma esfriou. **Tema novo:** comece pela imagem fixa dele (logo abaixo).
- **Lendário: Navio em chamas.** Condição: o navio pegou fogo: a chama fantasma virou infernal. **Tema novo:** comece pela imagem fixa dele (logo abaixo).

As cores de cada raridade vêm da **imagem fixa** dela (`__epico`, `__lendario`): cada prompt de animação de raridade pede essa imagem como **segundo anexo** e diz em qual quadro dela está a forma. Tema mantido: use a imagem fixa que já está no jogo. Tema novo: gere a imagem fixa nova primeiro e use ela.

**Ordem:** primeiro a folha base de uma forma (etapa 2), depois o Épico, o Lendário e as ações dela (etapa 3), sempre anexando a **base nova** como referência. Comece pelas formas Adulto e Supremo (`__anim_3` a `__anim_8`).

**Como usar cada bloco:** copie o texto inteiro do bloco para o gerador, anexe a imagem indicada e salve com o nome indicado. Depois confira com a lista do arquivo `00_LEIA_PRIMEIRO.md`.


## Comece por aqui: imagem fixa do tema novo

O tema do Épico e do Lendário mudou. Gere primeiro a imagem fixa nova, confira na página de conferência e me mande: ela substitui a antiga e é o segundo anexo das animações desse tema.

#### Imagem fixa do Épico (tema novo): Mar gelado

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__epico.png`
- **Anexar:** a imagem fixa comum `pirata_fantasma__base` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado)
- **O jogo usa:** sim (cartas, Bestiário e cor das formas sem animação própria)
- **Precisa?:** **sim, e antes das animações deste tema**: ela substitui a antiga e vira a referência de cor (converta e confira antes de seguir)
- **Molde (como deve ficar):** [Monstro: imagem fixa das 8 formas](../../moldes/monstro_fixa.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the 8 forms of "Grumete Fantasma" in the EPIC variant, one per cell. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: the 8 evolution forms of one monster line in its EPIC rarity variant, one still pose each (a calm 3/4 standing pose). The variant: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Every form gets the SAME variant treatment so the line looks consistent. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Grumete Fantasma" - filhote, element shadow
2. "Corsário Fantasma" - jovem, element shadow
3. "Capitão Fantasma" - adulto (branch A), element shadow
4. "Pistoleiro do Cais" - adulto (branch B), element shadow
5. "Pirata Afogado" - adulto (branch C), element water
6. "Capitão do Navio Errante" - supremo (branch A), element shadow
7. "Pistoleiro das Marés Negras" - supremo (branch B), element shadow
8. "Almirante do Abismo" - supremo (branch C), element water
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait in every form: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma. Class: Hunter.

REFERENCE: the attached image is the normal version of these 8 forms in the same layout: keep each form's shape, pose and cell, and apply the new variant described above. This is a NEW variant: do not reuse any older EPIC colors of this monster.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 435 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 27 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 4 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Imagem fixa do Lendário (tema novo): Navio em chamas

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__lendario.png`
- **Anexar:** a imagem fixa comum `pirata_fantasma__base` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado)
- **O jogo usa:** sim (cartas, Bestiário e cor das formas sem animação própria)
- **Precisa?:** **sim, e antes das animações deste tema**: ela substitui a antiga e vira a referência de cor (converta e confira antes de seguir)
- **Molde (como deve ficar):** [Monstro: imagem fixa das 8 formas](../../moldes/monstro_fixa.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the 8 forms of "Grumete Fantasma" in the LEGENDARY variant, one per cell. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: the 8 evolution forms of one monster line in its LEGENDARY rarity variant, one still pose each (a calm 3/4 standing pose). The variant: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Every form gets the SAME variant treatment so the line looks consistent. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Grumete Fantasma" - filhote, element shadow
2. "Corsário Fantasma" - jovem, element shadow
3. "Capitão Fantasma" - adulto (branch A), element shadow
4. "Pistoleiro do Cais" - adulto (branch B), element shadow
5. "Pirata Afogado" - adulto (branch C), element water
6. "Capitão do Navio Errante" - supremo (branch A), element shadow
7. "Pistoleiro das Marés Negras" - supremo (branch B), element shadow
8. "Almirante do Abismo" - supremo (branch C), element water
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait in every form: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma. Class: Hunter.

REFERENCE: the attached image is the normal version of these 8 forms in the same layout: keep each form's shape, pose and cell, and apply the new variant described above. This is a NEW variant: do not reuse any older LEGENDARY colors of this monster.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 435 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 27 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 4 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Grumete Fantasma (`__anim_1`, Filhote)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_1.png`
- **Anexar:** `pirata_fantasma__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Grumete Fantasma" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Grumete Fantasma", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_1__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_1` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Grumete Fantasma" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Grumete Fantasma", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 1. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_1__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_1` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Grumete Fantasma" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Grumete Fantasma", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 1. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_1.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_1` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Grumete Fantasma" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - SKILL "Armadilha" (Planta armadilhas por onde a equipe passa.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Grumete Fantasma", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Corsário Fantasma (`__anim_2`, Jovem)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_2.png`
- **Anexar:** `pirata_fantasma__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Corsário Fantasma" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Corsário Fantasma", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_2__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_2` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Corsário Fantasma" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Corsário Fantasma", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 2. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_2__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_2` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Corsário Fantasma" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Corsário Fantasma", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 2. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_2.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_2` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Corsário Fantasma" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - SKILL "Armadilha" (Planta armadilhas por onde a equipe passa.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Corsário Fantasma", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Capitão Fantasma (`__anim_3`, Adulto ramo A)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_3.png`
- **Anexar:** `pirata_fantasma__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Capitão Fantasma" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Capitão Fantasma", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_3__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_3` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Capitão Fantasma" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Capitão Fantasma", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 3. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_3__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_3` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Capitão Fantasma" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Capitão Fantasma", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 3. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_3.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_3` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Capitão Fantasma" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - SKILL "Armadilha" (Planta armadilhas por onde a equipe passa.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Capitão Fantasma", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Pistoleiro do Cais (`__anim_4`, Adulto ramo B)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_4.png`
- **Anexar:** `pirata_fantasma__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Pistoleiro do Cais" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pistoleiro do Cais", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_4__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_4` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Pistoleiro do Cais" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pistoleiro do Cais", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 4. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_4__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_4` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Pistoleiro do Cais" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pistoleiro do Cais", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 1, column 4. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_4.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_4` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Pistoleiro do Cais" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - SKILL "Armadilha" (Planta armadilhas por onde a equipe passa.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Pistoleiro do Cais", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Pirata Afogado (`__anim_5`, Adulto ramo C)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_5.png`
- **Anexar:** `pirata_fantasma__anim_5`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Pirata Afogado" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pirata Afogado", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_5__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_5` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Pirata Afogado" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pirata Afogado", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 1. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_5__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_5` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Pirata Afogado" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pirata Afogado", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 1. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_5.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_5` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Pirata Afogado" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - SKILL "Armadilha" (Planta armadilhas por onde a equipe passa.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Pirata Afogado", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Capitão do Navio Errante (`__anim_6`, Supremo ramo A)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_6.png`
- **Anexar:** `pirata_fantasma__anim_6`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Capitão do Navio Errante" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Capitão do Navio Errante", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_6__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_6` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Capitão do Navio Errante" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Capitão do Navio Errante", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 2. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_6__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_6` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Capitão do Navio Errante" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Capitão do Navio Errante", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 2. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_6.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_6` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Capitão do Navio Errante" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Bordada de canhões fantasmas., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Capitão do Navio Errante", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Pistoleiro das Marés Negras (`__anim_7`, Supremo ramo B)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_7.png`
- **Anexar:** `pirata_fantasma__anim_7`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Pistoleiro das Marés Negras" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pistoleiro das Marés Negras", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_7__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_7` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Pistoleiro das Marés Negras" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pistoleiro das Marés Negras", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 3. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_7__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_7` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Pistoleiro das Marés Negras" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pistoleiro das Marés Negras", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 3. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_7.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_7` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Pistoleiro das Marés Negras" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Tiro único que atravessa tudo., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Pistoleiro das Marés Negras", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Almirante do Abismo (`__anim_8`, Supremo ramo C)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_8.png`
- **Anexar:** `pirata_fantasma__anim_8`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Almirante do Abismo" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Almirante do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Épico: Mar gelado (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_8__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_8` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__epico` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Almirante do Abismo" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: FROZEN SEA: icy-blue ghost fire instead of green, frost on the clothes and sails, pale blue glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): naufragou no mar congelado: a chama fantasma esfriou. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Almirante do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved EPIC colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 4. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Lendário: Navio em chamas (etapa 3)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__anim_8__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `pirata_fantasma__anim_8` (etapa 2), para as poses; 2) a imagem fixa NOVA `pirata_fantasma__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Almirante do Abismo" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: INFERNAL: orange-red ghost fire with embers instead of green, scorched dark clothes. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): o navio pegou fogo: a chama fantasma virou infernal. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Almirante do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (this rarity variant uses the approved variant colors, not the normal ones). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

TWO REFERENCES ARE ATTACHED.
IMAGE 1 = the new normal sheet of this same form: copy its poses, cell layout, shapes and size exactly.
IMAGE 2 = the approved LEGENDARY colors of this monster line (8 forms, 4 columns x 2 rows): this form is the one in row 2, column 4. Copy its colors, palette, markings and glow EXACTLY onto every pose. If image 2 and the text disagree, image 2 wins.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__acoes_8.png`
- **Anexar:** a base NOVA `pirata_fantasma__anim_8` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Almirante do Abismo" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Leque" (Dispara 5 projéteis em leque.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Maré fantasma varre a tela., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "fanfarrão e aventureiro" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Almirante do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: undead. Combat class: Hunter.
Look of the line (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait that must always be visible: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma.
Personality (Portuguese, show it in the poses): fanfarrão e aventureiro.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell (use the same body size as the attached reference): in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 4 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Imagens fixas das 8 formas (cartas e Bestiário)

A comum já existe. A imagem fixa de cada raridade **é a referência de cor** das animações dela (segundo anexo). Tema mantido: a atual já tem as cores aprovadas, refaça só para mais nitidez. Tema novo: está em "Comece por aqui", no topo.

#### Imagem fixa

- **Salvar como:** `arte/monstros/sombra/pirata_fantasma__base.png`
- **Anexar:** `pirata_fantasma__base`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim, onde a forma não tem animação (e como referência de cor)
- **Molde (como deve ficar):** [Monstro: imagem fixa das 8 formas](../../moldes/monstro_fixa.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the 8 evolution forms of the monster line "Grumete Fantasma", one per cell. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: the 8 evolution forms of one monster line, one still pose each (a calm 3/4 standing pose).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Grumete Fantasma" - filhote, element shadow
2. "Corsário Fantasma" - jovem, element shadow
3. "Capitão Fantasma" - adulto (branch A), element shadow
4. "Pistoleiro do Cais" - adulto (branch B), element shadow
5. "Pirata Afogado" - adulto (branch C), element water
6. "Capitão do Navio Errante" - supremo (branch A), element shadow
7. "Pistoleiro das Marés Negras" - supremo (branch B), element shadow
8. "Almirante do Abismo" - supremo (branch C), element water
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): pirata fantasma de chapéu de três pontas, tapa-olho e luneta, corpo que vira névoa da cintura para baixo. Signature trait in every form: o chapéu de três pontas. Inspired by: humanoide: pirata fantasma. Class: Hunter.

REFERENCE: attach the current __base image of this monster (or the new animation sheets) and copy each form's design exactly. The attachment is only a reference: ignore its layout.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 435 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 27 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 4 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```
