# Dragões ancestrais

Cada dragão tem a animação de 4 estágios (`__anim_1` Filhote a `__anim_4` Supremo), a imagem fixa com as 5 formas e a cena do ovo chocando. **Antes de gerar `__base` e `__eclosao`, reconverta os originais** (etapa 0): eles só ficaram achatados.


## Dragão Solar Ancestral `dragao_solar` · Luz

a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head

#### Dragonete Solar (`__anim_1`)

- **Salvar como:** `arte/lendarios/dragao_solar__anim_1.png`
- **Anexar:** `dragao_solar__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragonete Solar (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spell cast: gathers an orb of its element and launches it forward. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of light energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragonete Solar", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: light (main colors: white, gold and warm cream). Lineage: dragons and serpents. Combat class: Mage.
Look of the line (Portuguese): a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small pearl-white hatchling with stubby gold-tipped wings and a tiny sun disk on its chest.

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

#### Dragão Solar Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/dragao_solar__anim_2.png`
- **Anexar:** `dragao_solar__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Solar Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spell cast: gathers an orb of its element and launches it forward. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of light energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Solar Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: light (main colors: white, gold and warm cream). Lineage: dragons and serpents. Combat class: Mage.
Look of the line (Portuguese): a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young slender light dragon, wings half grown with sun-disk patterns, a small ray crown.

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

#### Dragão Solar (`__anim_3`)

- **Salvar como:** `arte/lendarios/dragao_solar__anim_3.png`
- **Anexar:** `dragao_solar__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Solar (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spell cast: gathers an orb of its element and launches it forward. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of light energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Solar", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: light (main colors: white, gold and warm cream). Lineage: dragons and serpents. Combat class: Mage.
Look of the line (Portuguese): a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Solar Dragon standing proud, wings spread, sun disks blazing on chest and wings, halo of rays behind the head.

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

#### Dragão Solar Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/dragao_solar__anim_4.png`
- **Anexar:** `dragao_solar__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Solar Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spell cast: gathers an orb of its element and launches it forward. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of light energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Solar Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: light (main colors: white, gold and warm cream). Lineage: dragons and serpents. Combat class: Mage.
Look of the line (Portuguese): a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Solar Dragon, colossal, wings like a sunrise, a full sun-halo crown and golden armor-scales radiating light.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/dragao_solar__base.png`
- **Anexar:** a imagem atual `arte/lendarios/dragao_solar__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a pearl-white egg with gold veins and a small sun disk glowing through the shell
2. a small pearl-white hatchling with stubby gold-tipped wings and a tiny sun disk on its chest
3. a young slender light dragon, wings half grown with sun-disk patterns, a small ray crown
4. the adult Solar Dragon standing proud, wings spread, sun disks blazing on chest and wings, halo of rays behind the head
5. the ancestral Solar Dragon, colossal, wings like a sunrise, a full sun-halo crown and golden armor-scales radiating light

DRAGON: a majestic dragon of pearl-white scales trimmed in gold, a radiant sun disk glowing on its chest and on each wing, a halo of sunrays behind its crowned head. Element light.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/dragao_solar__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a pearl-white egg with gold veins and a small sun disk glowing through the shell. F2 the egg pulsing brighter. F3 first cracks glowing light light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small pearl-white hatchling with stubby gold-tipped wings and a tiny sun disk on its chest.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Mariposa do Vazio Ancestral `mariposa_vazio` · Sombra

a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun

#### Larva do Vazio (`__anim_1`)

- **Salvar como:** `arte/lendarios/mariposa_vazio__anim_1.png`
- **Anexar:** `mariposa_vazio__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Larva do Vazio (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: life ray: channels a beam of light from its body, calm and graceful. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Larva do Vazio", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: winged creatures. Combat class: Mystic.
Look of the line (Portuguese): a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small fluffy larva of the void with a pale little mask and tiny starry spots.

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

#### Mariposa do Vazio Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/mariposa_vazio__anim_2.png`
- **Anexar:** `mariposa_vazio__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Mariposa do Vazio Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: life ray: channels a beam of light from its body, calm and graceful. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Mariposa do Vazio Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: winged creatures. Combat class: Mystic.
Look of the line (Portuguese): a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young moth with small starry wings and the first crescent-moon eyespots.

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

#### Mariposa do Vazio (`__anim_3`)

- **Salvar como:** `arte/lendarios/mariposa_vazio__anim_3.png`
- **Anexar:** `mariposa_vazio__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Mariposa do Vazio (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: life ray: channels a beam of light from its body, calm and graceful. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Mariposa do Vazio", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: winged creatures. Combat class: Mystic.
Look of the line (Portuguese): a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Void Moth, wings spread wide with crescent-moon eyespots and starry purple dust, golden ring halo.

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

#### Mariposa do Vazio Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/mariposa_vazio__anim_4.png`
- **Anexar:** `mariposa_vazio__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Mariposa do Vazio Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: life ray: channels a beam of light from its body, calm and graceful. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Mariposa do Vazio Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: winged creatures. Combat class: Mystic.
Look of the line (Portuguese): a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Void Moth, enormous wings like a night sky, a black-sun eclipse halo, flowing cloak-like wing tails.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/mariposa_vazio__base.png`
- **Anexar:** a imagem atual `arte/lendarios/mariposa_vazio__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a dark cocoon wrapped in purple threads, a crescent moon glowing faintly inside
2. a small fluffy larva of the void with a pale little mask and tiny starry spots
3. a young moth with small starry wings and the first crescent-moon eyespots
4. the adult Void Moth, wings spread wide with crescent-moon eyespots and starry purple dust, golden ring halo
5. the ancestral Void Moth, enormous wings like a night sky, a black-sun eclipse halo, flowing cloak-like wing tails

DRAGON: a giant cosmic moth with deep purple wings full of stars and crescent-moon eyespots, a pale moth mask with gentle glowing eyes, a golden ring halo around a small black sun. Element shadow.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/mariposa_vazio__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a dark cocoon wrapped in purple threads, a crescent moon glowing faintly inside. F2 the egg pulsing brighter. F3 first cracks glowing shadow light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small fluffy larva of the void with a pale little mask and tiny starry spots.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Árvore-Dragão Ancestral `arvore_dragao` · Natureza

a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins

#### Broto-Dragão (`__anim_1`)

- **Salvar como:** `arte/lendarios/arvore_dragao__anim_1.png`
- **Anexar:** `arvore_dragao__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Broto-Dragão (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of nature energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Broto-Dragão", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: nature (main colors: leaf green, bark brown and flower accents). Lineage: dragons and serpents. Combat class: Summoner.
Look of the line (Portuguese): a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small sprout dragon of soft green wood, two leaf-horns, a tiny red leaf tail.

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

#### Árvore-Dragão Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/arvore_dragao__anim_2.png`
- **Anexar:** `arvore_dragao__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Árvore-Dragão Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of nature energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Árvore-Dragão Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: nature (main colors: leaf green, bark brown and flower accents). Lineage: dragons and serpents. Combat class: Summoner.
Look of the line (Portuguese): a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young bark dragon, branches starting as horns, moss on the back, a few red leaves.

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

#### Árvore-Dragão (`__anim_3`)

- **Salvar como:** `arte/lendarios/arvore_dragao__anim_3.png`
- **Anexar:** `arvore_dragao__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Árvore-Dragão (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of nature energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Árvore-Dragão", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: nature (main colors: leaf green, bark brown and flower accents). Lineage: dragons and serpents. Combat class: Summoner.
Look of the line (Portuguese): a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Tree Dragon, long body of bark and moss, branch horns, red autumn canopy on its back, green glowing veins.

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

#### Árvore-Dragão Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/arvore_dragao__anim_4.png`
- **Anexar:** `arvore_dragao__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Árvore-Dragão Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: summoning gesture: raises its arms or head and two small spirits of its element pop out. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of nature energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Árvore-Dragão Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: nature (main colors: leaf green, bark brown and flower accents). Lineage: dragons and serpents. Combat class: Summoner.
Look of the line (Portuguese): a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Tree Dragon, colossal, its back a whole autumn forest, roots trailing like a mane.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/arvore_dragao__base.png`
- **Anexar:** a imagem atual `arte/lendarios/arvore_dragao__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a big seed-shaped egg of bark with a green glow and a single red leaf sprouting
2. a small sprout dragon of soft green wood, two leaf-horns, a tiny red leaf tail
3. a young bark dragon, branches starting as horns, moss on the back, a few red leaves
4. the adult Tree Dragon, long body of bark and moss, branch horns, red autumn canopy on its back, green glowing veins
5. the ancestral Tree Dragon, colossal, its back a whole autumn forest, roots trailing like a mane

DRAGON: a long serpentine dragon made of living bark and moss, branches as horns, red autumn foliage along its back, glowing green veins. Element nature.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/arvore_dragao__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a big seed-shaped egg of bark with a green glow and a single red leaf sprouting. F2 the egg pulsing brighter. F3 first cracks glowing nature light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small sprout dragon of soft green wood, two leaf-horns, a tiny red leaf tail.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Dragão de Cristal Ancestral `dragao_cristal` · Terra

a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle

#### Dragonete de Cristal (`__anim_1`)

- **Salvar como:** `arte/lendarios/dragao_cristal__anim_1.png`
- **Anexar:** `dragao_cristal__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragonete de Cristal (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: shield bash: braces, then shoves forward with its body or shield in a short cone. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of earth energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragonete de Cristal", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: earth (main colors: ochre, brown and moss green). Lineage: dragons and serpents. Combat class: Guardian.
Look of the line (Portuguese): a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small stone hatchling with tiny crystal spikes on the back.

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

#### Dragão de Cristal Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/dragao_cristal__anim_2.png`
- **Anexar:** `dragao_cristal__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão de Cristal Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: shield bash: braces, then shoves forward with its body or shield in a short cone. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of earth energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão de Cristal Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: earth (main colors: ochre, brown and moss green). Lineage: dragons and serpents. Combat class: Guardian.
Look of the line (Portuguese): a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young stone dragon with growing crystal spikes and small crystal wings.

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

#### Dragão de Cristal (`__anim_3`)

- **Salvar como:** `arte/lendarios/dragao_cristal__anim_3.png`
- **Anexar:** `dragao_cristal__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão de Cristal (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: shield bash: braces, then shoves forward with its body or shield in a short cone. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of earth energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão de Cristal", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: earth (main colors: ochre, brown and moss green). Lineage: dragons and serpents. Combat class: Guardian.
Look of the line (Portuguese): a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Crystal Dragon, stone scales, big clear crystal spikes and translucent crystal wings.

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

#### Dragão de Cristal Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/dragao_cristal__anim_4.png`
- **Anexar:** `dragao_cristal__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão de Cristal Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: shield bash: braces, then shoves forward with its body or shield in a short cone. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of earth energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão de Cristal Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: earth (main colors: ochre, brown and moss green). Lineage: dragons and serpents. Combat class: Guardian.
Look of the line (Portuguese): a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Crystal Dragon, colossal, a crown of giant crystals, wings like stained crystal panes.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/dragao_cristal__base.png`
- **Anexar:** a imagem atual `arte/lendarios/dragao_cristal__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a rough stone geode egg cracked open, clear crystals shining inside
2. a small stone hatchling with tiny crystal spikes on the back
3. a young stone dragon with growing crystal spikes and small crystal wings
4. the adult Crystal Dragon, stone scales, big clear crystal spikes and translucent crystal wings
5. the ancestral Crystal Dragon, colossal, a crown of giant crystals, wings like stained crystal panes

DRAGON: a powerful dragon of stone scales covered in clear quartz crystal spikes, translucent crystal wings that sparkle. Element earth.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/dragao_cristal__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a rough stone geode egg cracked open, clear crystals shining inside. F2 the egg pulsing brighter. F3 first cracks glowing earth light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small stone hatchling with tiny crystal spikes on the back.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Dragão das Marés Ancestral `dragao_mares` · Água

a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine

#### Dragonete das Marés (`__anim_1`)

- **Salvar como:** `arte/lendarios/dragao_mares__anim_1.png`
- **Anexar:** `dragao_mares__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragonete das Marés (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ritual: stamps the ground and a small spirit totem rises beside it. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragonete das Marés", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: dragons and serpents. Combat class: Shaman.
Look of the line (Portuguese): a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small blue hatchling with soft fin-ears and a little foam mane.

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

#### Dragão das Marés Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/dragao_mares__anim_2.png`
- **Anexar:** `dragao_mares__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão das Marés Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ritual: stamps the ground and a small spirit totem rises beside it. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão das Marés Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: dragons and serpents. Combat class: Shaman.
Look of the line (Portuguese): a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young sea dragon with wave-crest fins and a growing foam mane.

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

#### Dragão das Marés (`__anim_3`)

- **Salvar como:** `arte/lendarios/dragao_mares__anim_3.png`
- **Anexar:** `dragao_mares__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão das Marés (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ritual: stamps the ground and a small spirit totem rises beside it. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão das Marés", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: dragons and serpents. Combat class: Shaman.
Look of the line (Portuguese): a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Tide Dragon, wave-crest fins, foam mane, pearls and coral along the spine, water rings around its body.

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

#### Dragão das Marés Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/dragao_mares__anim_4.png`
- **Anexar:** `dragao_mares__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão das Marés Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ritual: stamps the ground and a small spirit totem rises beside it. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão das Marés Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: dragons and serpents. Combat class: Shaman.
Look of the line (Portuguese): a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Tide Dragon, colossal, a crown of coral and a mane like a breaking wave.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/dragao_mares__base.png`
- **Anexar:** a imagem atual `arte/lendarios/dragao_mares__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a blue pearl-like egg with waves swirling inside the shell
2. a small blue hatchling with soft fin-ears and a little foam mane
3. a young sea dragon with wave-crest fins and a growing foam mane
4. the adult Tide Dragon, wave-crest fins, foam mane, pearls and coral along the spine, water rings around its body
5. the ancestral Tide Dragon, colossal, a crown of coral and a mane like a breaking wave

DRAGON: a sea dragon with deep blue scales, wave-crest fins, a mane of white sea foam, pearls and coral along its spine. Element water.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/dragao_mares__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a blue pearl-like egg with waves swirling inside the shell. F2 the egg pulsing brighter. F3 first cracks glowing water light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small blue hatchling with soft fin-ears and a little foam mane.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Dragão Vulcânico Ancestral `dragao_vulcanico` · Fogo

a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks

#### Dragonete de Brasa (`__anim_1`)

- **Salvar como:** `arte/lendarios/dragao_vulcanico__anim_1.png`
- **Anexar:** `dragao_vulcanico__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragonete de Brasa (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spinning strike: winds up and sweeps a heavy blow in a full circle. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragonete de Brasa", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: dragons and serpents. Combat class: Warrior.
Look of the line (Portuguese): a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small ember hatchling with warm glowing cracks and a flame tail.

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

#### Dragão Vulcânico Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/dragao_vulcanico__anim_2.png`
- **Anexar:** `dragao_vulcanico__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Vulcânico Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spinning strike: winds up and sweeps a heavy blow in a full circle. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Vulcânico Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: dragons and serpents. Combat class: Warrior.
Look of the line (Portuguese): a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young volcanic dragon, rock plates with magma seams, small flame mane.

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

#### Dragão Vulcânico (`__anim_3`)

- **Salvar como:** `arte/lendarios/dragao_vulcanico__anim_3.png`
- **Anexar:** `dragao_vulcanico__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Vulcânico (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spinning strike: winds up and sweeps a heavy blow in a full circle. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Vulcânico", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: dragons and serpents. Combat class: Warrior.
Look of the line (Portuguese): a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Volcanic Dragon, black rock scales with magma cracks, flame mane, volcano-peak horns.

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

#### Dragão Vulcânico Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/dragao_vulcanico__anim_4.png`
- **Anexar:** `dragao_vulcanico__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Vulcânico Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: spinning strike: winds up and sweeps a heavy blow in a full circle. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of fire energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Vulcânico Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: fire (main colors: red, orange and gold). Lineage: dragons and serpents. Combat class: Warrior.
Look of the line (Portuguese): a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Volcanic Dragon, colossal, its back a smoking volcano range, rivers of magma in the scales.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/dragao_vulcanico__base.png`
- **Anexar:** a imagem atual `arte/lendarios/dragao_vulcanico__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. an obsidian egg with glowing magma cracks
2. a small ember hatchling with warm glowing cracks and a flame tail
3. a young volcanic dragon, rock plates with magma seams, small flame mane
4. the adult Volcanic Dragon, black rock scales with magma cracks, flame mane, volcano-peak horns
5. the ancestral Volcanic Dragon, colossal, its back a smoking volcano range, rivers of magma in the scales

DRAGON: a heavy dragon of black volcanic rock with glowing magma cracks, a mane of flames and horns like volcano peaks. Element fire.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/dragao_vulcanico__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: an obsidian egg with glowing magma cracks. F2 the egg pulsing brighter. F3 first cracks glowing fire light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small ember hatchling with warm glowing cracks and a flame tail.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Dragão Celeste Ancestral `dragao_celeste` · Ar

a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds

#### Dragonete das Nuvens (`__anim_1`)

- **Salvar como:** `arte/lendarios/dragao_celeste__anim_1.png`
- **Anexar:** `dragao_celeste__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragonete das Nuvens (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragonete das Nuvens", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: dragons and serpents. Combat class: Hunter.
Look of the line (Portuguese): a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small fluffy cloud hatchling with feathered wing buds.

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

#### Dragão Celeste Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/dragao_celeste__anim_2.png`
- **Anexar:** `dragao_celeste__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Celeste Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Celeste Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: dragons and serpents. Combat class: Hunter.
Look of the line (Portuguese): a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young sky dragon with feathered wings and a cloud mane starting.

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

#### Dragão Celeste (`__anim_3`)

- **Salvar como:** `arte/lendarios/dragao_celeste__anim_3.png`
- **Anexar:** `dragao_celeste__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Celeste (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Celeste", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: dragons and serpents. Combat class: Hunter.
Look of the line (Portuguese): a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Sky Dragon, long and slender, big feathered wings, cloud mane, wind ribbons along the body.

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

#### Dragão Celeste Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/dragao_celeste__anim_4.png`
- **Anexar:** `dragao_celeste__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Dragão Celeste Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: ranged shot: aims and fires (spits, throws or shoots) a projectile straight ahead. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of air energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Dragão Celeste Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: air (main colors: pale cyan, white and silver). Lineage: dragons and serpents. Combat class: Hunter.
Look of the line (Portuguese): a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Sky Dragon, colossal, wings like a storm front, a crown of swirling clouds.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/dragao_celeste__base.png`
- **Anexar:** a imagem atual `arte/lendarios/dragao_celeste__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a pale sky-blue egg wrapped in a small swirl of cloud
2. a small fluffy cloud hatchling with feathered wing buds
3. a young sky dragon with feathered wings and a cloud mane starting
4. the adult Sky Dragon, long and slender, big feathered wings, cloud mane, wind ribbons along the body
5. the ancestral Sky Dragon, colossal, wings like a storm front, a crown of swirling clouds

DRAGON: a long slender sky dragon with feathered wings, white-and-sky-blue scales and a mane of drifting clouds. Element air.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/dragao_celeste__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a pale sky-blue egg wrapped in a small swirl of cloud. F2 the egg pulsing brighter. F3 first cracks glowing air light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small fluffy cloud hatchling with feathered wing buds.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Pássaro-Trovão Ancestral `passaro_trovao` · Raio

the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes

#### Filhote do Trovão (`__anim_1`)

- **Salvar como:** `arte/lendarios/passaro_trovao__anim_1.png`
- **Anexar:** `passaro_trovao__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Filhote do Trovão (`__anim_1`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of lightning energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Filhote do Trovão", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: lightning (main colors: electric yellow, violet and white). Lineage: winged creatures. Combat class: Assassin.
Look of the line (Portuguese): the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a small fluffy storm chick with static sparks in its down.

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

#### Pássaro-Trovão Jovem (`__anim_2`)

- **Salvar como:** `arte/lendarios/passaro_trovao__anim_2.png`
- **Anexar:** `passaro_trovao__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Pássaro-Trovão Jovem (`__anim_2`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of lightning energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pássaro-Trovão Jovem", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: lightning (main colors: electric yellow, violet and white). Lineage: winged creatures. Combat class: Assassin.
Look of the line (Portuguese): the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: a young thunderbird with lightning-patterned wing feathers.

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

#### Pássaro-Trovão (`__anim_3`)

- **Salvar como:** `arte/lendarios/passaro_trovao__anim_3.png`
- **Anexar:** `passaro_trovao__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Pássaro-Trovão (`__anim_3`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of lightning energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pássaro-Trovão", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: lightning (main colors: electric yellow, violet and white). Lineage: winged creatures. Combat class: Assassin.
Look of the line (Portuguese): the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the adult Thunderbird, huge spread wings with lightning patterns, glowing eyes, crackling crest.

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

#### Pássaro-Trovão Ancestral (`__anim_4`)

- **Salvar como:** `arte/lendarios/passaro_trovao__anim_4.png`
- **Anexar:** `passaro_trovao__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Monstro: animação (base, Épico ou Lendário)](../moldes/monstro_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Pássaro-Trovão Ancestral (`__anim_4`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of lightning energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Pássaro-Trovão Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: lightning (main colors: electric yellow, violet and white). Lineage: winged creatures. Combat class: Assassin.
Look of the line (Portuguese): the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes. Signature trait that must always be visible: the radiant markings of its element. Inspired by: dragon.
Personality (Portuguese, show it in the poses): ancient, proud and wise.
This stage looks like: the ancestral Thunderbird, colossal, wings like a thunderstorm, a crown of lightning.

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

#### Imagem fixa das 5 formas (`__base`)

- **Salvar como:** `arte/lendarios/passaro_trovao__base.png`
- **Anexar:** a imagem atual `arte/lendarios/passaro_trovao__base` (reconverta antes; gere só se continuar ruim)
- **O jogo usa:** sim (célula 1 = ovo, 2 a 5 = Filhote a Supremo)
- **Molde (como deve ficar):** [Dragão ancestral: 5 formas](../moldes/ancestral_base.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Imagem fixa das 5 formas (`__base`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 5 still images of one dragon, side by side.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 5 equal columns x 1 equal rows = 5 cells, each cell 307 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 5 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right:
1. a dark storm-blue egg with lightning veins flickering on the shell
2. a small fluffy storm chick with static sparks in its down
3. a young thunderbird with lightning-patterned wing feathers
4. the adult Thunderbird, huge spread wings with lightning patterns, glowing eyes, crackling crest
5. the ancestral Thunderbird, colossal, wings like a thunderstorm, a crown of lightning

DRAGON: the Thunderbird of myth: a huge eagle-like bird of dark storm-blue feathers with lightning-patterned wings and glowing yellow eyes. Element lightning.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 22 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 5 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Ovo chocando (`__eclosao`)

- **Salvar como:** `arte/lendarios/passaro_trovao__eclosao.png`
- **Anexar:** a imagem fixa (`__base`) deste dragão
- **O jogo usa:** ainda não (vai para a cena do ovo chocando)
- **Molde (como deve ficar):** [Dragão ancestral: ovo chocando](../moldes/ancestral_eclosao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Ovo chocando (`__eclosao`). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: an egg hatching, 6 frames in one row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 1 equal rows = 6 cells, each cell 256 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

F1 the egg glowing softly: a dark storm-blue egg with lightning veins flickering on the shell. F2 the egg pulsing brighter. F3 first cracks glowing lightning light. F4 more cracks, shell pieces lifting. F5 the shell bursts with a flash. F6 the hatchling sitting among the shell pieces: a small fluffy storm chick with static sparks in its down.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. The attachment is only a design reference: ignore its layout, size and background.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: the egg fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 870 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 1 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```
