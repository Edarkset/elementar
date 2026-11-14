# Vale Eterno `shangrila` · inimigos de Ar

Cenário: vale oculto entre montanhas nevadas, árvores floridas na neve, fontes termais. Humor: -

**Ordem neste reino:** inimigos (o jogo usa e é o que mais aparece), chefe e mini-chefe, depois cenário. Todos já são usados pelo jogo no formato abaixo.

#### Inimigos comuns (3 tipos)

- **Salvar como:** `arte/reinos/perdidos/shangrila__inimigos.png`
- **Anexar:** `shangrila__inimigos`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 colunas × 6 linhas; cada inimigo ocupa 2 linhas)

```text
Create a 2D game sprite sheet: 3 different small enemies of the same realm, 2 rows each, 8 frames per row.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 6 equal rows = 48 cells, each cell 192 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ENEMY 1 = "Yetis" (stone or metal golem, with fur, ice), rows 1 and 2:
ROW 1: F1-F2 idle (blink), F3-F6 move loop (walks), F7-F8 attack (spits a projectile: F7 wind-up, F8 strike).
ROW 2: F1 hurt (flinch), F2-F5 death (falls over, the last frame almost gone), F6-F8 quirk: looks around curiously.
ENEMY 2 = "Leopardos-das-neves espectrais" (four-legged beast, with spots, tail), rows 3 and 4:
ROW 3: F1-F2 idle (blink), F3-F6 move loop (runs fast), F7-F8 attack (jumps and lands on the target: F7 wind-up, F8 strike).
ROW 4: F1 hurt (flinch), F2-F5 death (evaporates into mist, the last frame almost gone), F6-F8 quirk: looks around curiously.
ENEMY 3 = "Guardiões de pedra" (stone or metal golem, with runes), rows 5 and 6:
ROW 5: F1-F2 idle (blink), F3-F6 move loop (marches in step), F7-F8 attack (body slam: F7 wind-up, F8 strike).
ROW 6: F1 hurt (flinch), F2-F5 death (shatters into shards, the last frame almost gone), F6-F8 quirk: freezes pretending to be a statue.

The three enemies have the SAME size as each other (small fodder enemies, cute-creepy and funny), clearly different silhouettes and colors, all fitting the realm.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

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
```

#### Mini-chefe: Yeti

- **Salvar como:** `arte/reinos/perdidos/shangrila__mini.png`
- **Anexar:** `shangrila__mini`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 5)

```text
Create a 2D game sprite sheet of one mini-boss: 5 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 5 equal rows = 30 cells, each cell 256 px wide x 205 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 a threatening gesture.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Bola de Neve Gigante" (Uma bola de neve que cresce enquanto rola e esmaga o que encontra.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "attack 2" (): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - DEATH, 6 frames: staggers, collapses and fades.

CHARACTER: "Yeti", mini-boss of Vale Eterno (stone or metal golem, with fur, ice, fangs). Twice as big and much more detailed than the common enemies.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

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
```

#### Chefe: Guardião do Vale Eterno

- **Salvar como:** `arte/reinos/perdidos/shangrila__chefe.png`
- **Anexar:** `shangrila__chefe`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)

```text
Create a 2D game sprite sheet of one boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 menacing breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Avalanche" (Uma parede de neve desce a montanha e cobre o chão.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Pilares de Gelo" (Pilares de gelo sobem em cruz.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - PHASE 2 "Nevasca" (A nevasca congela o vale.): transformation, F1-F3 powering up, F4-F6 the enraged form loop.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "Guardião do Vale Eterno", final boss of Vale Eterno (stone or metal golem, with ice, crown, glowing accents). Big, iconic and intimidating.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

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
```

#### Efeitos dos golpes do chefe

- **Salvar como:** `arte/reinos/perdidos/shangrila__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (linha 1 = golpe 1, linha 2 = golpe 2; quadros 1-4 projétil, 5-8 impacto no chão)

```text
Create a 2D game visual effects sheet (no characters): 2 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 2 equal rows = 16 cells, each cell 192 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Avalanche" (Uma parede de neve desce a montanha e cobre o chão.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Pilares de Gelo" (Pilares de gelo sobem em cruz.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Element air, colors pale cyan, white and silver. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Marcos, luz e primeiro plano

- **Salvar como:** `arte/reinos/perdidos/shangrila__props.png`
- **Anexar:** `shangrila__props`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (4 × 2: 6 marcos, a luz e o primeiro plano)

```text
Create a 2D game sprite sheet of 8 environment props, one per cell, seen from a top-down 3/4 camera.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. stupa
2. prayer wheel
3. apricot tree in bloom
4. ice formation
5. monastery wall
6. prayer flag line post
7. butter lamp shrine
8. prayer flag pole

Each prop stands on the same baseline at 85% of its cell height, centered, filling most of the cell. WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Chão: peças, manchas e enfeites

- **Salvar como:** `arte/reinos/perdidos/shangrila__tiles.png`
- **Anexar:** `shangrila__tiles`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 × 3)

```text
Create a 2D game sprite sheet of ground decorations seen from straight above, one item per cell.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - 8 small square ground texture pieces of snowy mountain grass with frozen puddles, each filling its whole cell (opaque inside the cell, slightly different from each other).
ROW 2 - 8 soft ground stains or patches (dirt, moss, cracks) on transparent background, irregular round shapes.
ROW 3 - 8 small loose decorations, one per cell: apricot blossom, snow clump, prayer flag scrap, pebble, ice shard, yak track, juniper sprig, bell.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

BACKGROUND (rows 2 and 3): fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Objetos de quebrar

- **Salvar como:** `arte/reinos/perdidos/shangrila__objetos.png`
- **Anexar:** `shangrila__objetos`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 × 5: um objeto por linha)

```text
Create a 2D game sprite sheet of breakable objects: one object per row, 8 states.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 5 equal rows = 40 cells, each cell 192 px wide x 205 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1: gelo
ROW 2: vaso
ROW 3: cristal
ROW 4: rocha
ROW 5: metal
In every row: F1 intact, F2 cracked, F3 badly broken, F4 special state (scorched, frozen or charged, matching the realm), F5-F8 four small debris pieces of that object.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Fauna de ambiente

- **Salvar como:** `arte/reinos/perdidos/shangrila__fauna.png`
- **Anexar:** `shangrila__fauna`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (8 × 2)

```text
Create a 2D game sprite sheet of small ambient animals, top-down 3/4 view, facing right.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 2 equal rows = 16 cells, each cell 192 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1: F1-F4 bar-headed goose flying loop (wings up, mid, down, mid); F5-F8 apricot blossom butterfly fluttering loop.
ROW 2: F1-F4 glacier trout swimming loop; F5 marmot sitting, F6 jumping up, F7 at the top of the jump, F8 landing.

Each animal small and centered in its cell. WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Peças grandes (praça, lago, construção, ponte)

- **Salvar como:** `arte/reinos/perdidos/shangrila__pecas.png`
- **Anexar:** `shangrila__pecas`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (2 × 2)

```text
Create a 2D game sheet of 4 large map pieces seen from straight above (top-down), one per cell.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 2 equal columns x 2 equal rows = 4 cells, each cell 512 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 2 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELL 1 (top left): stone floor with a mandala mosaic, round, filling the cell.
CELL 2 (top right): turquoise glacier lake with prayer stones, round, filling the cell.
CELL 3 (bottom left): small stupa with prayer wheels, top-down 3/4 view.
CELL 4 (bottom right): rope bridge with prayer flags, seen from the side, spanning the full width of the cell.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Piso

- **Salvar como:** `arte/reinos/perdidos/shangrila__piso.png`
- **Anexar:** nada
- **O jogo usa:** sim

```text
Create a seamless tileable ground texture for a 2D top-down game.

CANVAS: exactly 1024 x 1024 pixels. The texture must tile perfectly on all four edges (left matches right, top matches bottom): no visible seam when repeated.

GROUND: snowy mountain grass with prayer stones, apricot petals and frozen puddles. Seen from straight above. Midtone, low contrast and low saturation in the walkable areas so characters stand out; small details spread evenly, no big landmark that would repeat visibly.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

DO NOT: add objects, characters, shadows, light spots, vignette, borders, text or watermark.
```

#### Fundo do abismo

- **Salvar como:** `arte/reinos/perdidos/shangrila__fundo.png`
- **Anexar:** nada
- **O jogo usa:** sim

```text
Create a seamless tileable background texture for a 2D top-down game: what is seen far below when looking down into a chasm.

CANVAS: exactly 1024 x 1024 pixels, tiling perfectly on all four edges.

CONTENT: a deep Himalayan valley far below with clouds and blooming apricot trees. Darker and hazier than the ground (it is far away).

DO NOT: add characters, text, borders or watermark.
```

#### Paredão do abismo

- **Salvar como:** `arte/reinos/perdidos/shangrila__paredao.png`
- **Anexar:** `shangrila__paredao`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (4 × 2: 8 pedaços de parede)

```text
Create a 2D game sheet of 8 chasm wall segments, the vertical wall seen from the front, one per cell.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

Each cell: snowy grey cliff with prayer flags, top edge with a ground lip (and plants if they fit the realm), the bottom fading into mist. Each segment fills the full cell width so they join side by side; small variations between the 8 segments.

WORLD: Vale Eterno. Art direction: Shangri-La valley: snow peaks, prayer flag colors, warm wood, apricot blossoms, ice. Main element of the realm: air.

BACKGROUND (around the wall): fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Relíquia: Flor do Vale

- **Salvar como:** `arte/itens/reliquias/shangrila.png`
- **Anexar:** nada
- **O jogo usa:** ainda não (vai para a carta da relíquia; me mande o PNG)

```text
Create a single game item icon.

CANVAS: exactly 1024 x 1024 pixels, the item centered and filling about 70% of the canvas.

ITEM: the relic "Flor do Vale" from Vale Eterno (effect: A equipe regenera 0,5% da vida por segundo.). Precious, magical and readable when shrunk to 32 px. 3/4 view.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```
