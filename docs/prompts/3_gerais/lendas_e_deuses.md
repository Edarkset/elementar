# Lendas e deuses (herói da run)

O jogo lê `arte/lendas/<id>.png` e `arte/panteao/<id>.png` em 6 × 3: parado, andando e lançando o poder.


## Imhotep, o Arquiteto `imhotep`

#### Animação

- **Salvar como:** `arte/lendas/imhotep.png`
- **Anexar:** `imhotep`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `imhotep__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Obelisco Solar" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with earth and light energy, F5-F6 recovery.

CHARACTER: Imhotep, o Arquiteto, a mythological legend of Duat, Egito. Elements: earth and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Héracles `heracles`

#### Animação

- **Salvar como:** `arte/lendas/heracles.png`
- **Anexar:** `heracles`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `heracles__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Doze Trabalhos" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with earth and light energy, F5-F6 recovery.

CHARACTER: Héracles, a mythological legend of Santuário dos 12 Signos, Grécia. Elements: earth and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Gilgamesh `gilgamesh`

#### Animação

- **Salvar como:** `arte/lendas/gilgamesh.png`
- **Anexar:** `gilgamesh`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `gilgamesh__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Machado de Uruk" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with air and earth energy, F5-F6 recovery.

CHARACTER: Gilgamesh, a mythological legend of Babilônia, Mesopotâmia. Elements: air and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Yu, o Grande `yu`

#### Animação

- **Salvar como:** `arte/lendas/yu.png`
- **Anexar:** `yu`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `yu__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Canais de Yu" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with water and earth energy, F5-F6 recovery.

CHARACTER: Yu, o Grande, a mythological legend of Montanhas Kunlun, China. Elements: water and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Rostam e Rakhsh `rostam`

#### Animação

- **Salvar como:** `arte/lendas/rostam.png`
- **Anexar:** `rostam`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `rostam__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Carga de Rakhsh" (investida power), 6 frames: F1-F2 wind-up, F3-F4 release with light and fire energy, F5-F6 recovery.

CHARACTER: Rostam e Rakhsh, a mythological legend of Shahnameh, Pérsia. Elements: light and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Sigurd, o Matador de Dragões `sigurd`

#### Animação

- **Salvar como:** `arte/lendas/sigurd.png`
- **Anexar:** `sigurd`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `sigurd__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Gram" (orbita power), 6 frames: F1-F2 wind-up, F3-F4 release with water and fire energy, F5-F6 recovery.

CHARACTER: Sigurd, o Matador de Dragões, a mythological legend of Ragnarök, Terras Nórdicas. Elements: water and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Cú Chulainn `cuchulainn`

#### Animação

- **Salvar como:** `arte/lendas/cuchulainn.png`
- **Anexar:** `cuchulainn`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `cuchulainn__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Gáe Bulg" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with nature and lightning energy, F5-F6 recovery.

CHARACTER: Cú Chulainn, a mythological legend of Terras das Brumas, Celta. Elements: nature and lightning. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Rei Arthur `arthur`

#### Animação

- **Salvar como:** `arte/lendas/arthur.png`
- **Anexar:** `arthur`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `arthur__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Excalibur" (orbita power), 6 frames: F1-F2 wind-up, F3-F4 release with light and earth energy, F5-F6 recovery.

CHARACTER: Rei Arthur, a mythological legend of Távola Redonda e Avalon. Elements: light and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Minamoto no Raikō `raiko`

#### Animação

- **Salvar como:** `arte/lendas/raiko.png`
- **Anexar:** `raiko`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `raiko__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Corta-Oni" (orbita power), 6 frames: F1-F2 wind-up, F3-F4 release with fire and light energy, F5-F6 recovery.

CHARACTER: Minamoto no Raikō, a mythological legend of Parada Noturna dos Yokais, Japão Feudal. Elements: fire and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Marya Morevna, a Rainha Guerreira `marya`

#### Animação

- **Salvar como:** `arte/lendas/marya.png`
- **Anexar:** `marya`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `marya__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Exército da Rainha" (invocar power), 6 frames: F1-F2 wind-up, F3-F4 release with nature and water energy, F5-F6 recovery.

CHARACTER: Marya Morevna, a Rainha Guerreira, a mythological legend of Floresta Eslava. Elements: nature and water. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Sherazade `sherazade`

#### Animação

- **Salvar como:** `arte/lendas/sherazade.png`
- **Anexar:** `sherazade`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `sherazade__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Mil e Uma Histórias" (invocar power), 6 frames: F1-F2 wind-up, F3-F4 release with fire and light energy, F5-F6 recovery.

CHARACTER: Sherazade, a mythological legend of Mil e Uma Noites. Elements: fire and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Naiá, a Vitória-Régia `naia`

#### Animação

- **Salvar como:** `arte/lendas/naia.png`
- **Anexar:** `naia`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `naia__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Lua no Rio" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with nature and light energy, F5-F6 recovery.

CHARACTER: Naiá, a Vitória-Régia, a mythological legend of Amazônia Encantada. Elements: nature and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Hunahpú e Xbalanqué `gemeos`

#### Animação

- **Salvar como:** `arte/lendas/gemeos.png`
- **Anexar:** `gemeos`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `gemeos__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Zarabatana e Bola Sagrada" (dardos power), 6 frames: F1-F2 wind-up, F3-F4 release with shadow and light energy, F5-F6 recovery.

CHARACTER: Hunahpú e Xbalanqué, a mythological legend of Xibalba, Submundo Maia. Elements: shadow and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Nezahualcóyotl, o Rei Poeta `nezahualcoyotl`

#### Animação

- **Salvar como:** `arte/lendas/nezahualcoyotl.png`
- **Anexar:** `nezahualcoyotl`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `nezahualcoyotl__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Dique de Texcoco" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with light and water energy, F5-F6 recovery.

CHARACTER: Nezahualcóyotl, o Rei Poeta, a mythological legend of Tenochtitlán. Elements: light and water. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Manco Cápac `manco`

#### Animação

- **Salvar como:** `arte/lendas/manco.png`
- **Anexar:** `manco`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `manco__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Bastão de Ouro" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with earth and light energy, F5-F6 recovery.

CHARACTER: Manco Cápac, a mythological legend of Cidade nas Nuvens, Andes. Elements: earth and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Kupe, o Navegador `kupe`

#### Animação

- **Salvar como:** `arte/lendas/kupe.png`
- **Anexar:** `kupe`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `kupe__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Remo de Kupe" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with water and air energy, F5-F6 recovery.

CHARACTER: Kupe, o Navegador, a mythological legend of Ilhas do Fogo, Polinésia. Elements: water and air. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Bartolomeu Dias `dias`

#### Animação

- **Salvar como:** `arte/lendas/dias.png`
- **Anexar:** `dias`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `dias__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Caravela do Cabo" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with air and water energy, F5-F6 recovery.

CHARACTER: Bartolomeu Dias, a mythological legend of Cabo das Tormentas. Elements: air and water. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Barba Negra `barbanegra`

#### Animação

- **Salvar como:** `arte/lendas/barbanegra.png`
- **Anexar:** `barbanegra`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `barbanegra__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Pavios na Barba" (barril power), 6 frames: F1-F2 wind-up, F3-F4 release with shadow and fire energy, F5-F6 recovery.

CHARACTER: Barba Negra, a mythological legend of Caribe Amaldiçoado. Elements: shadow and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Capitão Nemo `nemo`

#### Animação

- **Salvar como:** `arte/lendas/nemo.png`
- **Anexar:** `nemo`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `nemo__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Nautilus" (raio power), 6 frames: F1-F2 wind-up, F3-F4 release with water and lightning energy, F5-F6 recovery.

CHARACTER: Capitão Nemo, a mythological legend of Mar Profundo. Elements: water and lightning. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Drácula Supremo `dracula`

#### Animação

- **Salvar como:** `arte/lendas/dracula.png`
- **Anexar:** `dracula`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `dracula__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Revoada Rubra" (drenar power), 6 frames: F1-F2 wind-up, F3-F4 release with shadow and air energy, F5-F6 recovery.

CHARACTER: Drácula Supremo, a mythological legend of Transilvânia. Elements: shadow and air. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Victor Frankenstein `frankenstein`

#### Animação

- **Salvar como:** `arte/lendas/frankenstein.png`
- **Anexar:** `frankenstein`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `frankenstein__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Centelha da Vida" (raio power), 6 frames: F1-F2 wind-up, F3-F4 release with lightning and nature energy, F5-F6 recovery.

CHARACTER: Victor Frankenstein, a mythological legend of Laboratório da Tempestade. Elements: lightning and nature. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## João e Maria `joaomaria`

#### Animação

- **Salvar como:** `arte/lendas/joaomaria.png`
- **Anexar:** `joaomaria`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `joaomaria__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Migalhas e Forno" (barril power), 6 frames: F1-F2 wind-up, F3-F4 release with nature and fire energy, F5-F6 recovery.

CHARACTER: João e Maria, a mythological legend of Floresta dos Contos Sombrios. Elements: nature and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Poseidon `poseidon`

#### Animação

- **Salvar como:** `arte/lendas/poseidon.png`
- **Anexar:** `poseidon`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `poseidon__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Tridente das Marés" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with water and earth energy, F5-F6 recovery.

CHARACTER: Poseidon, a mythological legend of Atlântida. Elements: water and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Bochica, o Mensageiro `bochica`

#### Animação

- **Salvar como:** `arte/lendas/bochica.png`
- **Anexar:** `bochica`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `bochica__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Arco-íris de Bochica" (investida power), 6 frames: F1-F2 wind-up, F3-F4 release with light and water energy, F5-F6 recovery.

CHARACTER: Bochica, o Mensageiro, a mythological legend of El Dorado. Elements: light and water. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Marco Polo `marcopolo`

#### Animação

- **Salvar como:** `arte/lendas/marcopolo.png`
- **Anexar:** `marcopolo`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `marcopolo__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Seda e Bússola" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with air and light energy, F5-F6 recovery.

CHARACTER: Marco Polo, a mythological legend of Vale Eterno. Elements: air and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Lidenbrock e Axel `lidenbrock`

#### Animação

- **Salvar como:** `arte/lendas/lidenbrock.png`
- **Anexar:** `lidenbrock`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `lidenbrock__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Martelo do Geólogo" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with earth and fire energy, F5-F6 recovery.

CHARACTER: Lidenbrock e Axel, a mythological legend of Centro da Terra. Elements: earth and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Prometeu `prometeu`

#### Animação

- **Salvar como:** `arte/lendas/prometeu.png`
- **Anexar:** `prometeu`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `prometeu__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Fogo Roubado" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with fire and light energy, F5-F6 recovery.

CHARACTER: Prometeu, a mythological legend of Reino do Fogo. Elements: fire and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Ondina `ondina`

#### Animação

- **Salvar como:** `arte/lendas/ondina.png`
- **Anexar:** `ondina`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `ondina__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Véu das Ondas" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with water and nature energy, F5-F6 recovery.

CHARACTER: Ondina, a mythological legend of Reino da Água. Elements: water and nature. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Atlas `atlas`

#### Animação

- **Salvar como:** `arte/lendas/atlas.png`
- **Anexar:** `atlas`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `atlas__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Peso do Céu" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with earth and air energy, F5-F6 recovery.

CHARACTER: Atlas, a mythological legend of Reino da Terra. Elements: earth and air. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Dédalo e Ícaro `dedalo`

#### Animação

- **Salvar como:** `arte/lendas/dedalo.png`
- **Anexar:** `dedalo`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `dedalo__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Asas de Cera" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with air and light energy, F5-F6 recovery.

CHARACTER: Dédalo e Ícaro, a mythological legend of Reino do Ar. Elements: air and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Brontes, o Ferreiro do Trovão `brontes`

#### Animação

- **Salvar como:** `arte/lendas/brontes.png`
- **Anexar:** `brontes`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `brontes__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Forja do Raio" (raio power), 6 frames: F1-F2 wind-up, F3-F4 release with lightning and fire energy, F5-F6 recovery.

CHARACTER: Brontes, o Ferreiro do Trovão, a mythological legend of Reino do Raio. Elements: lightning and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Merlin, o Druida `merlin`

#### Animação

- **Salvar como:** `arte/lendas/merlin.png`
- **Anexar:** `merlin`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `merlin__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Bosque de Merlin" (invocar power), 6 frames: F1-F2 wind-up, F3-F4 release with nature and light energy, F5-F6 recovery.

CHARACTER: Merlin, o Druida, a mythological legend of Reino da Natureza. Elements: nature and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Faetonte `faetonte`

#### Animação

- **Salvar como:** `arte/lendas/faetonte.png`
- **Anexar:** `faetonte`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `faetonte__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Carro do Sol" (investida power), 6 frames: F1-F2 wind-up, F3-F4 release with light and fire energy, F5-F6 recovery.

CHARACTER: Faetonte, a mythological legend of Reino da Luz. Elements: light and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Orfeu `orfeu`

#### Animação

- **Salvar como:** `arte/lendas/orfeu.png`
- **Anexar:** `orfeu`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `orfeu__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Lira do Submundo" (dardos power), 6 frames: F1-F2 wind-up, F3-F4 release with shadow and light energy, F5-F6 recovery.

CHARACTER: Orfeu, a mythological legend of Reino da Sombra. Elements: shadow and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Zeus `zeus`

#### Animação

- **Salvar como:** `arte/panteao/zeus.png`
- **Anexar:** `zeus`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `zeus__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Raio do Olimpo" (raio power), 6 frames: F1-F2 wind-up, F3-F4 release with lightning and light energy, F5-F6 recovery.

CHARACTER: Zeus, a god of the Grego pantheon. Elements: lightning and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Hades `hades`

#### Animação

- **Salvar como:** `arte/panteao/hades.png`
- **Anexar:** `hades`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `hades__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Bidente do Submundo" (drenar power), 6 frames: F1-F2 wind-up, F3-F4 release with shadow and fire energy, F5-F6 recovery.

CHARACTER: Hades, a god of the Grego pantheon. Elements: shadow and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Atena `atena`

#### Animação

- **Salvar como:** `arte/panteao/atena.png`
- **Anexar:** `atena`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `atena__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Lança da Sabedoria" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with light and earth energy, F5-F6 recovery.

CHARACTER: Atena, a god of the Grego pantheon. Elements: light and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Leônidas, Rei de Esparta `leonidas`

#### Animação

- **Salvar como:** `arte/panteao/leonidas.png`
- **Anexar:** `leonidas`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `leonidas__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Lança e Escudo" (investida power), 6 frames: F1-F2 wind-up, F3-F4 release with earth and fire energy, F5-F6 recovery.

CHARACTER: Leônidas, Rei de Esparta, a god of the Grego (herói) pantheon. Elements: earth and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Odin `odin`

#### Animação

- **Salvar como:** `arte/panteao/odin.png`
- **Anexar:** `odin`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `odin__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Corvos Hugin e Munin" (dardos power), 6 frames: F1-F2 wind-up, F3-F4 release with air and shadow energy, F5-F6 recovery.

CHARACTER: Odin, a god of the Nórdico pantheon. Elements: air and shadow. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Thor `thor`

#### Animação

- **Salvar como:** `arte/panteao/thor.png`
- **Anexar:** `thor`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `thor__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Mjölnir" (projetil power), 6 frames: F1-F2 wind-up, F3-F4 release with lightning and earth energy, F5-F6 recovery.

CHARACTER: Thor, a god of the Nórdico pantheon. Elements: lightning and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Loki `loki`

#### Animação

- **Salvar como:** `arte/panteao/loki.png`
- **Anexar:** `loki`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `loki__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Chamas do Trapaceiro" (barril power), 6 frames: F1-F2 wind-up, F3-F4 release with fire and shadow energy, F5-F6 recovery.

CHARACTER: Loki, a god of the Nórdico pantheon. Elements: fire and shadow. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Rá `ra`

#### Animação

- **Salvar como:** `arte/panteao/ra.png`
- **Anexar:** `ra`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `ra__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Disco Solar" (orbita power), 6 frames: F1-F2 wind-up, F3-F4 release with light and fire energy, F5-F6 recovery.

CHARACTER: Rá, a god of the Egípcio pantheon. Elements: light and fire. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Anúbis `anubis`

#### Animação

- **Salvar como:** `arte/panteao/anubis.png`
- **Anexar:** `anubis`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `anubis__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Cetro do Embalsamador" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with shadow and earth energy, F5-F6 recovery.

CHARACTER: Anúbis, a god of the Egípcio pantheon. Elements: shadow and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Ísis `isis`

#### Animação

- **Salvar como:** `arte/panteao/isis.png`
- **Anexar:** `isis`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `isis__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Asas de Ísis" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with water and light energy, F5-F6 recovery.

CHARACTER: Ísis, a god of the Egípcio pantheon. Elements: water and light. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Marduk `marduk`

#### Animação

- **Salvar como:** `arte/panteao/marduk.png`
- **Anexar:** `marduk`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `marduk__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Os Quatro Ventos" (onda power), 6 frames: F1-F2 wind-up, F3-F4 release with lightning and air energy, F5-F6 recovery.

CHARACTER: Marduk, a god of the Mesopotâmico pantheon. Elements: lightning and air. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Ishtar `ishtar`

#### Animação

- **Salvar como:** `arte/panteao/ishtar.png`
- **Anexar:** `ishtar`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `ishtar__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Estrela da Manhã" (dardos power), 6 frames: F1-F2 wind-up, F3-F4 release with light and nature energy, F5-F6 recovery.

CHARACTER: Ishtar, a god of the Mesopotâmico pantheon. Elements: light and nature. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```


## Enki `enki`

#### Animação

- **Salvar como:** `arte/panteao/enki.png`
- **Anexar:** `enki`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado; e o retrato `enki__retrato`, se existir
- **O jogo usa:** sim (6 × 3)

```text
Create a 2D game sprite sheet of one hero: 3 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: heroic stance, breathing, cape or hair moving.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place.
ROW 3 - CASTING "Águas Doces" (area power), 6 frames: F1-F2 wind-up, F3-F4 release with water and earth energy, F5-F6 recovery.

CHARACTER: Enki, a god of the Mesopotâmico pantheon. Elements: water and earth. Heroic proportions (head about 1/4 to 1/3 of the height, not chibi). Strong warm rim light and bright accents (eyes, weapon, emblem) so the hero reads on any floor.

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
```
