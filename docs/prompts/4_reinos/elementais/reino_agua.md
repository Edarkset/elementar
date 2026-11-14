# Reino da Água `reino_agua` · inimigos de Água

Cenário: cachoeiras flutuantes, bolhas gigantes, chão espelhado. Humor: -

**Ordem neste reino:** inimigos (o jogo usa e é o que mais aparece), chefe e mini-chefe, depois cenário. Todos já são usados pelo jogo no formato abaixo.

#### Inimigos comuns (3 tipos)

- **Salvar como:** `arte/reinos/elementais/reino_agua__inimigos.png`
- **Anexar:** `reino_agua__inimigos`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 colunas × 6 linhas; cada inimigo ocupa 2 linhas)
- **Molde (como deve ficar):** [Inimigos do reino (3 tipos)](../../moldes/inimigos.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: three enemies of Reino da Água: "Elementais menores da Água", "Sentinelas do reino", "Ecos de monstros derrotados" (no other creature). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet: 3 different small enemies of the same realm, 2 rows each, 8 frames per row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 6 equal rows = 48 cells, each cell 192 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ENEMY 1 = "Elementais menores da Água" (blob, with glowing accents), rows 1 and 2:
ROW 1: F1-F2 idle (blink), F3-F6 move loop (floats and bobs), F7-F8 attack (body slam: F7 wind-up, F8 strike).
ROW 2: F1 hurt (flinch), F2-F5 death (pops like a bubble, the last frame almost gone), F6-F8 quirk: looks around curiously.
ENEMY 2 = "Sentinelas do reino" (stone or metal golem, with runes, helmet), rows 3 and 4:
ROW 3: F1-F2 idle (blink), F3-F6 move loop (marches in step), F7-F8 attack (lunging bite or strike: F7 wind-up, F8 strike).
ROW 4: F1 hurt (flinch), F2-F5 death (shatters into shards, the last frame almost gone), F6-F8 quirk: freezes pretending to be a statue.
ENEMY 3 = "Ecos de monstros derrotados" (floating ghost, with glowing accents), rows 5 and 6:
ROW 5: F1-F2 idle (blink), F3-F6 move loop (floats and bobs), F7-F8 attack (lunging bite or strike: F7 wind-up, F8 strike).
ROW 6: F1 hurt (flinch), F2-F5 death (evaporates into mist, the last frame almost gone), F6-F8 quirk: looks around curiously.

The three enemies have the SAME size as each other (small fodder enemies, cute-creepy and funny), clearly different silhouettes and colors, all fitting the realm.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

REFERENCE: the attached image shows these same three enemies. Copy each one's design, colors and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 145 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 13 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 6 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Mini-chefe: Sentinela da Água

- **Salvar como:** `arte/reinos/elementais/reino_agua__mini.png`
- **Anexar:** `reino_agua__mini`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 5)
- **Molde (como deve ficar):** [Mini-chefe](../../moldes/mini.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the mini-boss "Sentinela da Água" (one single creature, repeated in 30 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one mini-boss: 5 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 5 equal rows = 30 cells, each cell 256 px wide x 205 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 a threatening gesture.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Leque de Gotas" (Gotas em leque.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "attack 2" (): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - DEATH, 6 frames: staggers, collapses and fades.

CHARACTER: "Sentinela da Água", mini-boss of Reino da Água (stone or metal golem, with runes, helmet, glowing accents). Twice as big and much more detailed than the common enemies.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 174 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 6 items in every row and exactly 5 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Chefe: Avatar da Água

- **Salvar como:** `arte/reinos/elementais/reino_agua__chefe.png`
- **Anexar:** `reino_agua__chefe`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Chefe do reino](../../moldes/chefe.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the boss "Avatar da Água" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 menacing breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Maremoto" (Uma onda gigante que alaga o chão.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Prisão de Gelo" (Blocos de gelo fecham o jogador.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - PHASE 2 "Dilúvio" (A arena inteira alaga.): transformation, F1-F3 powering up, F4-F6 the enraged form loop.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "Avatar da Água", final boss of Reino da Água (floating ghost, with glowing accents, crown). Big, iconic and intimidating.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 145 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 12 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1024 x 1024; exactly 6 items in every row and exactly 6 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Efeitos dos golpes do chefe

- **Salvar como:** `arte/reinos/elementais/reino_agua__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (linha 1 = golpe 1, linha 2 = golpe 2; quadros 1-4 projétil, 5-8 impacto no chão)
- **Molde (como deve ficar):** [Efeitos do chefe](../../moldes/efeitos_chefe.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "Avatar da Água" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 2 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 2 equal rows = 16 cells, each cell 192 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Maremoto" (Uma onda gigante que alaga o chão.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Prisão de Gelo" (Blocos de gelo fecham o jogador.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Element water, colors deep blue, teal and white foam. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Marcos, luz e primeiro plano

- **Salvar como:** `arte/reinos/elementais/reino_agua__props.png`
- **Anexar:** `reino_agua__props`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (4 × 2: 6 marcos, a luz e o primeiro plano)
- **Molde (como deve ficar):** [Marcos, luz e primeiro plano](../../moldes/props.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Marcos, luz e primeiro plano. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of 8 environment props, one per cell, seen from a top-down 3/4 camera.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. floating waterfall rock
2. giant bubble on stand
3. coral arch
4. water lily cluster
5. shell throne
6. ice column
7. glowing water orb lamp
8. waterfall column

ORIENTATION: every prop stands upright, seen from the front at a top-down 3/4 angle, its base on the same line at 85% of the cell height, centered, filling most of the cell. Cell 7 (the light) is a standing object with its flame or glow. Cell 8 is a tall foreground element that may reach the top of its cell. WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 4 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Chão: peças, manchas e enfeites

- **Salvar como:** `arte/reinos/elementais/reino_agua__tiles.png`
- **Anexar:** `reino_agua__tiles`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 × 3)
- **Molde (como deve ficar):** [Chão: peças, manchas e enfeites](../../moldes/tiles.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Chão: peças, manchas e enfeites. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of ground decorations seen from straight above, one item per cell.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - 8 square ground texture pieces of mirror-like wet stone with reflections, seen from straight above, each filling its WHOLE cell edge to edge with no transparent margin (slightly different from each other).
ROW 2 - 8 soft ground stains or patches (dirt, moss, cracks) on transparent background, irregular round shapes.
ROW 3 - 8 small loose decorations, one per cell: droplet, shell, lily pad, pearl, bubble, ripple, coral, fish scale.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

BACKGROUND (rows 2 and 3): fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Objetos de quebrar

- **Salvar como:** `arte/reinos/elementais/reino_agua__objetos.png`
- **Anexar:** `reino_agua__objetos`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 × 6: um objeto por linha)
- **Molde (como deve ficar):** [Objetos de quebrar](../../moldes/objetos.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Objetos de quebrar. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of breakable objects: one object per row, 8 states.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 6 equal rows = 48 cells, each cell 192 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1: vaso
ROW 2: gelo
ROW 3: rocha
ROW 4: cristal
ROW 5: metal
ROW 6: arvore
In every row: F1 intact, F2 cracked, F3 badly broken, F4 special state (scorched, frozen or charged, matching the realm), F5-F8 four small debris pieces of that object.
ORIENTATION: every object upright, seen from the front at a top-down 3/4 angle, base on the line at 85% of the cell height, the same size in F1 to F4 of its row. The debris pieces are small and centered in their cells.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 6 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Fauna de ambiente

- **Salvar como:** `arte/reinos/elementais/reino_agua__fauna.png`
- **Anexar:** `reino_agua__fauna`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 × 2)
- **Molde (como deve ficar):** [Fauna de ambiente](../../moldes/fauna.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Fauna de ambiente. The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of small ambient animals, top-down 3/4 view, facing right.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 2 equal rows = 16 cells, each cell 192 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1: F1-F4 flying fish flying loop (wings up, mid, down, mid); F5-F8 glowing water droplet sprite fluttering loop.
ROW 2: F1-F4 blue fish swimming loop; F5 crab sitting, F6 jumping up, F7 at the top of the jump, F8 landing.

Each animal small and centered in its cell. WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Peças grandes (praça, lago, construção, ponte)

- **Salvar como:** `arte/reinos/elementais/reino_agua__pecas.png`
- **Anexar:** `reino_agua__pecas`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (2 × 2)
- **Molde (como deve ficar):** [Peças grandes](../../moldes/pecas.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Peças grandes (praça, lago, construção, ponte). The ONLY reference is the image attached to THIS message.

Create a 2D game sheet of 4 large map pieces seen from straight above (top-down), one per cell.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 2 equal columns x 2 equal rows = 4 cells, each cell 512 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 2 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELL 1 (top left): mirror-water floor with a shell spiral mosaic, round, filling the cell.
CELL 2 (top right): pool of clear water ringed by giant bubbles, round, filling the cell.
CELL 3 (bottom left): shell palace pavilion, top-down 3/4 view.
CELL 4 (bottom right): THE BRIDGE, LYING HORIZONTALLY: coral arch bridge. It runs straight across from the LEFT edge to the RIGHT edge of the cell, both ends cut straight at the cell edges (the game repeats it side by side to make it longer). Seen from the front: the walkway deck is a horizontal band in the upper third with its railings, and the arches or supports hang below it. Never vertical, never diagonal, never seen from above, no towers or end posts.

ORIENTATION: cells 1 and 2 are seen from straight above (top-down), round, filling their cells. Cell 3 is a building seen from the front at a top-down 3/4 angle, standing upright. Cell 4 is the horizontal bridge described above.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1024 x 1024; exactly 2 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Piso

- **Salvar como:** `arte/reinos/elementais/reino_agua__piso.png`
- **Anexar:** nada
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Piso ou fundo (textura que se repete)](../../moldes/piso.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Piso. There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a seamless tileable ground texture for a 2D top-down game.

CANVAS: exactly 1024 x 1024 pixels. The texture must tile perfectly on all four edges (left matches right, top matches bottom): no visible seam when repeated.

GROUND: mirror-like wet stone with reflections and small shells. Seen from straight above. Midtone, low contrast and low saturation in the walkable areas so characters stand out; small details spread evenly, no big landmark that would repeat visibly.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

DO NOT: add objects, characters, shadows, light spots, vignette, borders, text or watermark.

BEFORE YOU FINISH, CHECK: the image is 1024 x 1024; one single subject; nothing from earlier images of this conversation; no seam when tiled; nothing written anywhere.
```

#### Fundo do abismo

- **Salvar como:** `arte/reinos/elementais/reino_agua__fundo.png`
- **Anexar:** nada
- **O jogo usa:** sim
- **Molde (como deve ficar):** [Piso ou fundo (textura que se repete)](../../moldes/piso.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Fundo do abismo. There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a seamless tileable background texture for a 2D top-down game: what is seen far below when looking down into a chasm.

CANVAS: exactly 1024 x 1024 pixels, tiling perfectly on all four edges.

CONTENT: a bottomless clear blue ocean far below with light rays and bubbles. Darker and hazier than the ground (it is far away).

DO NOT: add characters, text, borders or watermark.

BEFORE YOU FINISH, CHECK: the image is 1024 x 1024; one single subject; nothing from earlier images of this conversation; no seam when tiled; nothing written anywhere.
```

#### Paredão do abismo

- **Salvar como:** `arte/reinos/elementais/reino_agua__paredao.png`
- **Anexar:** `reino_agua__paredao`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (4 × 2: 8 pedaços de parede)
- **Molde (como deve ficar):** [Paredão do abismo](../../moldes/paredao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Paredão do abismo. The ONLY reference is the image attached to THIS message.

Create a 2D game sheet of 8 chasm wall segments, the vertical wall seen from the front, one per cell.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - 4 wall segments: blue rock edge covered by thin waterfalls.
ROW 2 - the same wall, 4 segments, each with a waterfall pouring down its middle.
ORIENTATION: we look straight at the vertical rock face (front view, like a cliff seen from the chasm). In every cell the top edge of the rock (with a thin ground lip and plants) is at the top of the cell, the wall fills about 80% of the cell height and fades into mist at the bottom. Each segment fills the FULL cell width and its left and right edges continue seamlessly into the neighbouring segment, so the 4 segments of a row join into one long wall. Small variations between segments, same scale in all 8.

WORLD: Reino da Água. Art direction: Elemental Realm of Water: floating waterfalls, mirror floor, giant bubbles, white and blue. Main element of the realm: water.

BACKGROUND (around the wall): fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 4 items in every row and exactly 2 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```

#### Relíquia: Núcleo da Água

- **Salvar como:** `arte/itens/reliquias/reino_agua.png`
- **Anexar:** nada
- **O jogo usa:** ainda não (vai para a carta da relíquia; me mande o PNG)
- **Molde (como deve ficar):** [Ícone único (relíquia)](../../moldes/icone.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: Relíquia: Núcleo da Água. There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a single game item icon.

CANVAS: exactly 1024 x 1024 pixels, the item centered and filling about 70% of the canvas.

ITEM: the relic "Núcleo da Água" from Reino da Água (effect: Conta como +1 monstro desse elemento para as sinergias.). Precious, magical and readable when shrunk to 32 px. 3/4 view.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1024 x 1024; one single subject; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```
