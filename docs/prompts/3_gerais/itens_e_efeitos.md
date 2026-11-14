# Itens gerais

Não dependem dos monstros: podem ser feitos a qualquer momento. **O jogo ainda desenha estes por código.** Quando cada um chegar, me mande o PNG: eu converto, ligo no código e confiro com prints.

#### Herói básico (Invocador)

- **Salvar como:** `arte/heroi/invocador__anim.png`
- **Anexar:** um print do herói atual (tela de jogo) para manter as cores
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of the main hero: 4 animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing, F5-F6 blink.
ROW 2 - WALK LOOP, 6 frames, moving to the right in place, cape flowing.
ROW 3 - COMMAND, 6 frames: points the sword forward and the gem on the pommel flares (F1-F2 raise, F3-F4 point and flare, F5-F6 back to idle).
ROW 4 - F1-F2 hurt (flinch), F3-F6 victory pose (sword raised).

CHARACTER: a young adventurer summoner, heroic proportions (head about 1/3 of the height, not chibi), messy chestnut hair, red scarf, short blue cape, cream tunic with a golden belt, leather boots, short sword with a round gem on the pommel (paint the gem pale white-blue: the game recolors it).

PLACEMENT LOCKS:
- The character faces RIGHT in every cell (the game mirrors it for left).
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Fogo

- **Salvar como:** `arte/ovos/ovo__fogo.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a fire pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing fire light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element fire, colors red, orange and gold. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Água

- **Salvar como:** `arte/ovos/ovo__agua.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a water pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing water light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element water, colors deep blue, teal and white foam. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Terra

- **Salvar como:** `arte/ovos/ovo__terra.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a earth pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing earth light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element earth, colors ochre, brown and moss green. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Ar

- **Salvar como:** `arte/ovos/ovo__ar.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a air pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing air light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element air, colors pale cyan, white and silver. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Raio

- **Salvar como:** `arte/ovos/ovo__raio.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a lightning pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing lightning light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element lightning, colors electric yellow, violet and white. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Natureza

- **Salvar como:** `arte/ovos/ovo__natureza.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a nature pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing nature light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element nature, colors leaf green, bark brown and flower accents. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Luz

- **Salvar como:** `arte/ovos/ovo__luz.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a light pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing light light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element light, colors white, gold and warm cream. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ovo de Sombra

- **Salvar como:** `arte/ovos/ovo__sombra.png`
- **Anexar:** nada (ou o ovo de outro elemento já gerado, para manter o mesmo formato)
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of a magical creature egg: 3 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - COMMON egg: simple shell with a shadow pattern. ROW 2 - RARE egg: silver filigree and a small gem. ROW 3 - LEGENDARY egg: ornate golden shell, glowing gem and a soft aura.
In every row: F1-F3 gentle wobble loop, F4 first cracks glowing shadow light, F5 more cracks with light leaking, F6 the shell bursting with a flash and flying shards.

Element shadow, colors deep purple, black-violet and magenta-free dark glows. The egg is the same size and shape in all three rows; only the decoration changes.

PLACEMENT LOCKS:
- The egg stands upright in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 290 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Baús

- **Salvar como:** `arte/itens/baus.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of treasure chests: 4 rarities, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 wooden chest. ROW 2 silver chest. ROW 3 golden chest. ROW 4 legendary arcane crystal chest.
In every row: F1 closed, F2-F3 shaking in anticipation, F4-F5 the lid opening backwards, F6 open with light pouring out.

Seen from the front at a 3/4 top-down angle. Same chest size in every row.

PLACEMENT LOCKS:
- The chest faces the viewer in every cell.
- Same size in every cell: in the idle row the body fills about 70% of the cell height. Draw it big even if it is a small or baby creature: the game sets the size on screen, the drawing only needs detail.
- Feet (or the bottom of a floating body) touch the same invisible line in every cell: 218 px below the top of the cell (85% of the cell height).
- Centered horizontally in its cell, with at least 18 px of empty space to every cell border. Nothing (tail, wings, weapon, flames, sparks, glow) crosses into a neighbouring cell.
- Clear empty gap between rows.
- Looping rows loop seamlessly: the last frame flows back into the first.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Coletáveis

- **Salvar como:** `arte/itens/coletaveis.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game sprite sheet of small pickups, one item per cell.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - XP crystals: F1-F2 blue (normal, sparkle), F3-F4 green, F5-F6 purple, F7-F8 gold.
ROW 2 - gold coin spinning, 8 frames.
ROW 3 - F1-F4 healing heart pulsing, F5-F8 bonus star twinkling.
ROW 4 - F1-F4 Essence orb swirling, F5-F8 golden key glinting.

Each item small, centered and readable when shrunk to 12 px.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Fogo

- **Salvar como:** `arte/efeitos/elemento__fogo.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the fire element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Eruption: explosions where enemies are densest, the ground catching fire": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors red, orange and gold. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Água

- **Salvar como:** `arte/efeitos/elemento__agua.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the water element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Tide: a wave rushing out in a ring, pushing enemies away": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors deep blue, teal and white foam. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Terra

- **Salvar como:** `arte/efeitos/elemento__terra.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the earth element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Rockfall: boulders falling from the sky and cracking the ground": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors ochre, brown and moss green. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Ar

- **Salvar como:** `arte/efeitos/elemento__ar.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the air element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Cyclone: a whirlwind pulling things in": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors pale cyan, white and silver. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Raio

- **Salvar como:** `arte/efeitos/elemento__raio.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the lightning element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Storm: lightning bolts striking down": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors electric yellow, violet and white. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Natureza

- **Salvar como:** `arte/efeitos/elemento__natureza.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the nature element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Forest Blessing: a healing bloom with roots grabbing nearby": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors leaf green, bark brown and flower accents. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Luz

- **Salvar como:** `arte/efeitos/elemento__luz.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the light element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Solar Pillar: a column of sunlight striking down": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors white, gold and warm cream. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos de Sombra

- **Salvar como:** `arte/efeitos/elemento__sombra.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the shadow element (no characters): 4 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 4 equal rows = 32 cells, each cell 192 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - hit spark: F1 small flash, F2-F4 burst, F5-F8 fading sparks.
ROW 2 - projectile: F1-F6 a flying orb loop, F7-F8 its trail dissolving.
ROW 3 - ground explosion seen from above: F1 spark, F2-F4 expanding blast, F5-F8 smoke and embers fading.
ROW 4 - ELEMENT POWER "Shadow Embrace: dark tendrils pulling into one point": the biggest effect of the sheet, F1-F2 build-up, F3-F5 peak, F6-F8 fading.

Colors deep purple, black-violet and magenta-free dark glows. Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Guardião

- **Salvar como:** `arte/efeitos/classe__guardiao.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Guardian class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Golpe de Escudo: cone curto que empurra.", 8 frames.
ROW 2 - skill "Provocar" (Atrai inimigos próximos e reduz o dano recebido.), 8 frames.
ROW 3 - skill "Muralha" (Barreira circular temporária ao redor da equipe.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Guerreiro

- **Salvar como:** `arte/efeitos/classe__guerreiro.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Warrior class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Corte Giratório: golpe em 360 graus ao redor.", 8 frames.
ROW 2 - skill "Investida" (Avança contra o grupo mais denso.), 8 frames.
ROW 3 - skill "Fúria" (Por alguns segundos, ataca mais rápido.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Assassino

- **Salvar como:** `arte/efeitos/classe__assassino.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Assassin class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Lâminas: golpes rápidos no inimigo mais próximo.", 8 frames.
ROW 2 - skill "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 8 frames.
ROW 3 - skill "Marca da Morte" (Marca um inimigo; ao morrer, explode.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Caçador

- **Salvar como:** `arte/efeitos/classe__cacador.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Hunter class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Disparo: projétil em linha reta no alvo mais próximo.", 8 frames.
ROW 2 - skill "Leque" (Dispara 5 projéteis em leque.), 8 frames.
ROW 3 - skill "Armadilha" (Planta armadilhas por onde a equipe passa.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Mago

- **Salvar como:** `arte/efeitos/classe__mago.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Mage class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Orbe: projétil teleguiado que explode em área.", 8 frames.
ROW 2 - skill "Rajada Elementar" (Golpe em área no maior grupo.), 8 frames.
ROW 3 - skill "Círculo Arcano" (Zona no chão que amplifica dano.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Invocador

- **Salvar como:** `arte/efeitos/classe__invocador.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Summoner class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Cria: invoca 2 servos do seu elemento que perseguem inimigos.", 8 frames.
ROW 2 - skill "Horda" (Invoca uma leva extra de servos.), 8 frames.
ROW 3 - skill "Portal" (Portal que gera servos por alguns segundos.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Místico

- **Salvar como:** `arte/efeitos/classe__mistico.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Mystic class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Raio Vital: fere um inimigo e cura a equipe.", 8 frames.
ROW 2 - skill "Bênção" (Regeneração em área por alguns segundos.), 8 frames.
ROW 3 - skill "Renascer" (Uma vez por mapa, evita a derrota da equipe.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Efeitos da classe Xamã

- **Salvar como:** `arte/efeitos/classe__xama.png`
- **Anexar:** nada
- **O jogo usa:** ainda não

```text
Create a 2D game visual effects sheet for the Shaman class (no characters): 3 effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - basic attack "Totem: planta um totem que ataca sozinho.", 8 frames.
ROW 2 - skill "Canto" (Aura que acelera a equipe.), 8 frames.
ROW 3 - skill "Espírito Guia" (Espírito que aplica o elemento do Xamã.), 8 frames.
(Text in Portuguese describes what the effect does.)

Neutral white-gold colors (the game tints them by element). Bright core with soft translucent edges, never opaque shapes covering the characters. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Guardião 1: Bastião Ancestral

- **Salvar como:** `arte/efeitos/especial__guardiao_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Bastião Ancestral" (escudo de 25% da vida e provoca todos por perto). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Guardião 2: Terremoto do Guardião

- **Salvar como:** `arte/efeitos/especial__guardiao_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Terremoto do Guardião" (dano ×10 em área e atordoa 2 s). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Guerreiro 1: Grito de Guerra

- **Salvar como:** `arte/efeitos/especial__guerreiro_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Grito de Guerra" (equipe com +60% de dano por 6 s). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Guerreiro 2: Golpe Devastador

- **Salvar como:** `arte/efeitos/especial__guerreiro_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Golpe Devastador" (dano ×14 num grande arco). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Assassino 1: Dança das Lâminas

- **Salvar como:** `arte/efeitos/especial__assassino_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Dança das Lâminas" (8 golpes ×4 em alvos espalhados). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Assassino 2: Execução Sombria

- **Salvar como:** `arte/efeitos/especial__assassino_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Execução Sombria" (executa comuns abaixo de 25% e causa ×6 em elites). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Caçador 1: Chuva de Flechas

- **Salvar como:** `arte/efeitos/especial__cacador_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Chuva de Flechas" (zona de 4 s que fere tudo dentro). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Caçador 2: Tiro Perfurante

- **Salvar como:** `arte/efeitos/especial__cacador_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Tiro Perfurante" (linha de ×20 que atravessa a tela). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Mago 1: Cataclismo

- **Salvar como:** `arte/efeitos/especial__mago_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Cataclismo" (dano ×12 numa área enorme). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Mago 2: Prisão Arcana

- **Salvar como:** `arte/efeitos/especial__mago_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Prisão Arcana" (congela todos na tela por 2,5 s). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Invocador 1: Exército Invocado

- **Salvar como:** `arte/efeitos/especial__invocador_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Exército Invocado" (10 servos por 6 s). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Invocador 2: Colosso Invocado

- **Salvar como:** `arte/efeitos/especial__invocador_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Colosso Invocado" (um servo gigante por 10 s). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Místico 1: Milagre

- **Salvar como:** `arte/efeitos/especial__mistico_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Milagre" (cura 40% e limpa lentidões). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Místico 2: Julgamento

- **Salvar como:** `arte/efeitos/especial__mistico_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Julgamento" (dano ×8 em todos na tela). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Xamã 1: Tempestade Ritual

- **Salvar como:** `arte/efeitos/especial__xama_1.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Tempestade Ritual" (zona grande do elemento por 5 s). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Especial Xamã 2: Totem Ancestral

- **Salvar como:** `arte/efeitos/especial__xama_2.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os especiais hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 1 equal rows = 8 cells, each cell 192 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the special move "Totem Ancestral" (totem de 12 s: +40% de cadência). F1 small spark, F2-F3 growing, F4-F5 peak, F6-F8 fading out. Same center point in every frame.

Neutral white-gold (the game tints it by element). Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Revoada Ancestral

- **Salvar como:** `arte/efeitos/combinado__dragoes.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Revoada Ancestral": the whole team of dragons and serpents attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Marcha dos Mortos

- **Salvar como:** `arte/efeitos/combinado__mortos_vivos.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Marcha dos Mortos": the whole team of undead attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Grande Caçada

- **Salvar como:** `arte/efeitos/combinado__feras.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Grande Caçada": the whole team of beasts attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Passo dos Titãs

- **Salvar como:** `arte/efeitos/combinado__gigantes.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Passo dos Titãs": the whole team of giants attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Revolta dos Pequenos

- **Salvar como:** `arte/efeitos/combinado__pequeninos.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Revolta dos Pequenos": the whole team of little folk attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Maremoto

- **Salvar como:** `arte/efeitos/combinado__marinhos.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Maremoto": the whole team of sea creatures attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Céu em Fúria

- **Salvar como:** `arte/efeitos/combinado__alados.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Céu em Fúria": the whole team of winged creatures attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Abominação Primordial

- **Salvar como:** `arte/efeitos/combinado__quimeras.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Abominação Primordial": the whole team of chimeras attacking together. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Inferno

- **Salvar como:** `arte/efeitos/combinado__el_fogo.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Inferno": three fire monsters unleashing their element together, colors red, orange and gold. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Dilúvio

- **Salvar como:** `arte/efeitos/combinado__el_agua.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Dilúvio": three water monsters unleashing their element together, colors deep blue, teal and white foam. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Terremoto Primordial

- **Salvar como:** `arte/efeitos/combinado__el_terra.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Terremoto Primordial": three earth monsters unleashing their element together, colors ochre, brown and moss green. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Furacão

- **Salvar como:** `arte/efeitos/combinado__el_ar.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Furacão": three air monsters unleashing their element together, colors pale cyan, white and silver. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Tempestade Elétrica

- **Salvar como:** `arte/efeitos/combinado__el_raio.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Tempestade Elétrica": three lightning monsters unleashing their element together, colors electric yellow, violet and white. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Floresta Primordial

- **Salvar como:** `arte/efeitos/combinado__el_natureza.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Floresta Primordial": three nature monsters unleashing their element together, colors leaf green, bark brown and flower accents. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Juízo Solar

- **Salvar como:** `arte/efeitos/combinado__el_luz.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Juízo Solar": three light monsters unleashing their element together, colors white, gold and warm cream. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Noite Eterna

- **Salvar como:** `arte/efeitos/combinado__el_sombra.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Noite Eterna": three shadow monsters unleashing their element together, colors deep purple, black-violet and magenta-free dark glows. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Combinado: Trindade

- **Salvar como:** `arte/efeitos/combinado__trindade.png`
- **Anexar:** nada
- **O jogo usa:** não por enquanto (os combinados hoje são desenhados por código; ligo quando chegarem)

```text
Create a 2D game visual effect animation strip (effect only, NO character).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 10 equal columns x 1 equal rows = 10 cells, each cell 154 px wide x 1024 px tall. Do NOT draw the grid. Exactly one pose per cell, 10 per row, no more, no less. Rows are read top to bottom, frames left to right.

EFFECT: the team combo attack "Trindade": three different elements spiralling into one blast. Seen from a top-down 3/4 camera. F1 small spark, F2-F4 growing, F5-F7 huge peak, F8-F10 fading out. Same center point in every frame.

Bright core with soft translucent edges, never opaque white shapes.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```

#### Ícones dos Poderes do Elemento

- **Salvar como:** `arte/ui/elementais.png`
- **Anexar:** nada
- **O jogo usa:** ainda não (vai para a carta de nível)

```text
Create a 2D game sheet of 8 square ability icons, one per cell.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. fire - Eruption: explosions where enemies are densest, the ground catching fire
2. water - Tide: a wave rushing out in a ring, pushing enemies away
3. earth - Rockfall: boulders falling from the sky and cracking the ground
4. air - Cyclone: a whirlwind pulling things in
5. lightning - Storm: lightning bolts striking down
6. nature - Forest Blessing: a healing bloom with roots grabbing nearby
7. light - Solar Pillar: a column of sunlight striking down
8. shadow - Shadow Embrace: dark tendrils pulling into one point

Each icon a round medallion with the power symbol inside, colors of its element, readable when shrunk to 32 px.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.
```
