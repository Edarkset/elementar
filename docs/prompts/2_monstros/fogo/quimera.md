# Quimerinha `quimera` · Fogo · Invocador

leão com uma cabeça de cabra nas costas e uma serpente na cauda. Traço marcante: as três cabeças sempre discutindo. Jeito: três vozes, um coração.

| Arquivo | Forma | Estágio | Elemento |
|---|---|---|---|
| `__anim_1` | Quimerinha | Filhote | Fogo |
| `__anim_2` | Quimera Jovem | Jovem | Fogo |
| `__anim_3` | Quimera | Adulto (ramo A) | Fogo |
| `__anim_4` | Quimera Solitária | Adulto (ramo B) | Fogo |
| `__anim_5` | Quimera Mutante | Adulto (ramo C) | Ar |
| `__anim_6` | Quimera Primordial | Supremo (ramo A) | Fogo |
| `__anim_7` | Quimera Ancestral | Supremo (ramo B) | Fogo |
| `__anim_8` | Quimera do Caos | Supremo (ramo C) | Ar |

**Raridades** (cada uma é uma condição especial do ambiente, não só outra cor):
- **Épico: Estátua de bronze.** Condição: dormiu séculos em ruínas e virou estátua.
- **Lendário: Chamas eternas.** Condição: vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. **Tema novo:** comece pela imagem fixa dele (logo abaixo).

As cores de cada raridade vêm da **imagem fixa** dela (`__epico`, `__lendario`): cada prompt de animação de raridade pede essa imagem como **segundo anexo** e diz em qual quadro dela está a forma. Tema mantido: use a imagem fixa que já está no jogo. Tema novo: gere a imagem fixa nova primeiro e use ela.

**Ordem:** primeiro a folha base de uma forma (etapa 2), depois o Épico, o Lendário e as ações dela (etapa 3), sempre anexando a **base nova** como referência. Comece pelas formas Adulto e Supremo (`__anim_3` a `__anim_8`).

**Como usar cada bloco:** copie o texto inteiro do bloco para o gerador, anexe a imagem indicada e salve com o nome indicado. Depois confira com a lista do arquivo `00_LEIA_PRIMEIRO.md`.


## Comece por aqui: imagem fixa do tema novo

O tema do Lendário mudou. Gere primeiro a imagem fixa nova, confira na página de conferência e me mande: ela substitui a antiga e é o segundo anexo das animações desse tema.

#### Imagem fixa do Lendário (tema novo): Chamas eternas

- **Salvar como:** `arte/monstros/fogo/quimera__lendario.png`
- **Anexar:** a imagem fixa comum `quimera__base` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado)
- **O jogo usa:** sim (cartas, Bestiário e cor das formas sem animação própria)
- **Precisa?:** **sim, e antes das animações deste tema**: ela substitui a antiga e vira a referência de cor (converta e confira antes de seguir)
- **Molde (como deve ficar):** [Monstro: imagem fixa das 8 formas](../../moldes/monstro_fixa.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the 8 forms of "Quimerinha" in the LEGENDARY variant, one per cell. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: the 8 evolution forms of one monster line in its LEGENDARY rarity variant, one still pose each (a calm 3/4 standing pose). The variant: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Every form gets the SAME variant treatment so the line looks consistent. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Quimerinha" - filhote, element fire
2. "Quimera Jovem" - jovem, element fire
3. "Quimera" - adulto (branch A), element fire
4. "Quimera Solitária" - adulto (branch B), element fire
5. "Quimera Mutante" - adulto (branch C), element air
6. "Quimera Primordial" - supremo (branch A), element fire
7. "Quimera Ancestral" - supremo (branch B), element fire
8. "Quimera do Caos" - supremo (branch C), element air
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait in every form: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra. Class: Summoner.

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


## Quimerinha (`__anim_1`, Filhote)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_1.png`
- **Anexar:** `quimera__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimerinha" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimerinha", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_1__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_1` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimerinha" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimerinha", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_1__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_1` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimerinha" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimerinha", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_1.png`
- **Anexar:** a base NOVA `quimera__anim_1` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimerinha" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with fire energy, F5-F6 recovery.
ROW 2 - SKILL "Portal" (Portal que gera servos por alguns segundos.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimerinha", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera Jovem (`__anim_2`, Jovem)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_2.png`
- **Anexar:** `quimera__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Jovem" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_2__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_2` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera Jovem" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_2__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_2` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera Jovem" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_2.png`
- **Anexar:** a base NOVA `quimera__anim_2` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Jovem" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with fire energy, F5-F6 recovery.
ROW 2 - SKILL "Portal" (Portal que gera servos por alguns segundos.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera (`__anim_3`, Adulto ramo A)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_3.png`
- **Anexar:** `quimera__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_3__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_3` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_3__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_3` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_3.png`
- **Anexar:** a base NOVA `quimera__anim_3` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with fire energy, F5-F6 recovery.
ROW 2 - SKILL "Portal" (Portal que gera servos por alguns segundos.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera Solitária (`__anim_4`, Adulto ramo B)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_4.png`
- **Anexar:** `quimera__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Solitária" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Solitária", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_4__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_4` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera Solitária" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Solitária", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_4__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_4` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera Solitária" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Solitária", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_4.png`
- **Anexar:** a base NOVA `quimera__anim_4` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Solitária" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with fire energy, F5-F6 recovery.
ROW 2 - SKILL "Portal" (Portal que gera servos por alguns segundos.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera Solitária", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera Mutante (`__anim_5`, Adulto ramo C)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_5.png`
- **Anexar:** `quimera__anim_5`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Mutante" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Mutante", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_5__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_5` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera Mutante" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Mutante", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: air (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_5__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_5` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera Mutante" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Mutante", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: air (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_5.png`
- **Anexar:** a base NOVA `quimera__anim_5` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Mutante" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with air energy, F5-F6 recovery.
ROW 2 - SKILL "Portal" (Portal que gera servos por alguns segundos.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera Mutante", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera Primordial (`__anim_6`, Supremo ramo A)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_6.png`
- **Anexar:** `quimera__anim_6`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Primordial" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Primordial", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_6__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_6` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera Primordial" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Primordial", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_6__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_6` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera Primordial" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Primordial", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_6.png`
- **Anexar:** a base NOVA `quimera__anim_6` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Primordial" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with fire energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: As três cabeças atacam sozinhas., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera Primordial", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera Ancestral (`__anim_7`, Supremo ramo B)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_7.png`
- **Anexar:** `quimera__anim_7`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Ancestral" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_7__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_7` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera Ancestral" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_7__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_7` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera Ancestral" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_7.png`
- **Anexar:** a base NOVA `quimera__anim_7` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera Ancestral" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with fire energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Sopro em cone gigante., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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


## Quimera do Caos (`__anim_8`, Supremo ramo C)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_8.png`
- **Anexar:** `quimera__anim_8`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera do Caos" (one single creature, repeated in 18 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera do Caos", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Épico: Estátua de bronze (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_8__epico.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_8` (etapa 2), para as poses; 2) a imagem fixa aprovada `quimera__epico` (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the EPIC variant of the monster "Quimera do Caos" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the EPIC rarity variant of a monster: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera do Caos", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: air (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

#### Lendário: Chamas eternas (etapa 3)

- **Salvar como:** `arte/monstros/fogo/quimera__anim_8__lendario.png`
- **Anexar:** **duas imagens**: 1) a base NOVA `quimera__anim_8` (etapa 2), para as poses; 2) a imagem fixa NOVA `quimera__lendario` (a que você gerou em "Comece por aqui"), para as cores
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the LEGENDARY variant of the monster "Quimera do Caos" (one single creature, repeated in 18 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster: ETERNAL FLAMES: pale cream limestone-colored body with small eternal flames bursting from cracks in its skin, golden-orange glow. Same poses and same size as reference image 1, only the colors, surface details and small ornaments change. The silhouette must stay recognizable as the same monster. WHY THIS VARIANT EXISTS (Portuguese): vive no Monte Quimera (Yanartaş, na Turquia), onde o fogo sai das pedras há milênios. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Quimera do Caos", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: air (this rarity variant uses the approved variant colors, not the normal ones). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__acoes_8.png`
- **Anexar:** a base NOVA `quimera__anim_8` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)
- **Molde (como deve ficar):** [Monstro: ações](../../moldes/monstro_acoes.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the monster "Quimera do Caos" (one single creature, repeated in 24 poses). The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Horda" (Invoca uma leva extra de servos.), 6 frames: F1-F2 wind-up, F3-F4 release with air energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Troca de elemento a cada 5 segundos., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "três vozes, um coração" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Quimera do Caos", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: chimeras. Combat class: Summoner.
Look of the line (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait that must always be visible: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra.
Personality (Portuguese, show it in the poses): três vozes, um coração.

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

- **Salvar como:** `arte/monstros/fogo/quimera__base.png`
- **Anexar:** `quimera__base`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim, onde a forma não tem animação (e como referência de cor)
- **Molde (como deve ficar):** [Monstro: imagem fixa das 8 formas](../../moldes/monstro_fixa.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the 8 evolution forms of the monster line "Quimerinha", one per cell. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: the 8 evolution forms of one monster line, one still pose each (a calm 3/4 standing pose).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Quimerinha" - filhote, element fire
2. "Quimera Jovem" - jovem, element fire
3. "Quimera" - adulto (branch A), element fire
4. "Quimera Solitária" - adulto (branch B), element fire
5. "Quimera Mutante" - adulto (branch C), element air
6. "Quimera Primordial" - supremo (branch A), element fire
7. "Quimera Ancestral" - supremo (branch B), element fire
8. "Quimera do Caos" - supremo (branch C), element air
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait in every form: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra. Class: Summoner.

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

#### Imagem fixa do Épico: Estátua de bronze

- **Salvar como:** `arte/monstros/fogo/quimera__epico.png`
- **Anexar:** **duas imagens**: 1) a imagem fixa comum `quimera__base`, para as formas; 2) a imagem fixa aprovada `quimera__epico`, para as cores (o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado)
- **O jogo usa:** sim (cartas, Bestiário e cor das formas sem animação própria)
- **Precisa?:** só para mais nitidez: a atual já tem as cores aprovadas
- **Molde (como deve ficar):** [Monstro: imagem fixa das 8 formas](../../moldes/monstro_fixa.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the 8 forms of "Quimerinha" in the EPIC variant, one per cell. The ONLY references are the two images attached to THIS message.

Create a 2D game sprite sheet: the 8 evolution forms of one monster line in its EPIC rarity variant, one still pose each (a calm 3/4 standing pose). The variant: ANCIENT STATUE: olive-bronze and moss-stone colors, like an old weathered bronze statue. Every form gets the SAME variant treatment so the line looks consistent. WHY THIS VARIANT EXISTS (Portuguese): dormiu séculos em ruínas e virou estátua. The variant exists because of a special condition of its environment (explained below), so the change must look natural and physical, not just a recolor: frost, melting ice, mud, mineral veins, flame color, light. The rarity must still read as special at a glance: the Epic has a soft glow; the Legendary is the rarest and most striking. Keep the signature trait and at least one clear cue of its element visible.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Quimerinha" - filhote, element fire
2. "Quimera Jovem" - jovem, element fire
3. "Quimera" - adulto (branch A), element fire
4. "Quimera Solitária" - adulto (branch B), element fire
5. "Quimera Mutante" - adulto (branch C), element air
6. "Quimera Primordial" - supremo (branch A), element fire
7. "Quimera Ancestral" - supremo (branch B), element fire
8. "Quimera do Caos" - supremo (branch C), element air
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): leão com uma cabeça de cabra nas costas e uma serpente na cauda. Signature trait in every form: as três cabeças sempre discutindo. Inspired by: leão / cabra / cobra. Class: Summoner.

TWO REFERENCES ARE ATTACHED. IMAGE 1 = the normal version of these 8 forms in the same layout: keep each form's shape, pose and cell. IMAGE 2 = the approved EPIC version in the same layout: copy its colors, palette, markings and glow exactly, cell by cell, only cleaner and sharper. If image 2 and the text disagree, image 2 wins.

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
