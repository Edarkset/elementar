# Cria do Lago `ahuizotl` · Água · Assassino

cão d’água de pelo liso e brilhante. Traço marcante: a mãozinha na ponta da cauda. Jeito: pregador de peças.

| Arquivo | Forma | Estágio | Elemento |
|---|---|---|---|
| `__anim_1` | Cria do Lago | Filhote | Água |
| `__anim_2` | Ahuízotl | Jovem | Água |
| `__anim_3` | Ahuízotl das Profundezas | Adulto (ramo A) | Água |
| `__anim_4` | Ahuízotl Espreitador | Adulto (ramo B) | Água |
| `__anim_5` | Ahuízotl Sombrio | Adulto (ramo C) | Sombra |
| `__anim_6` | Senhor do Lago | Supremo (ramo A) | Água |
| `__anim_7` | Ahuízotl Ancestral | Supremo (ramo B) | Água |
| `__anim_8` | Ahuízotl do Abismo | Supremo (ramo C) | Sombra |

**Ordem:** primeiro a folha base de uma forma (etapa 2), depois o Épico, o Lendário e as ações dela (etapa 3), sempre anexando a **base nova** como referência. Comece pelas formas Adulto e Supremo (`__anim_3` a `__anim_8`).

**Como usar cada bloco:** copie o texto inteiro do bloco para o gerador, anexe a imagem indicada e salve com o nome indicado. Depois confira com a lista do arquivo `00_LEIA_PRIMEIRO.md`.


## Cria do Lago (`__anim_1`, Filhote)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_1.png`
- **Anexar:** `ahuizotl__anim_1`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Cria do Lago", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_1__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_1` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Cria do Lago", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_1__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_1` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Cria do Lago", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_1.png`
- **Anexar:** a base NOVA `ahuizotl__anim_1` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - SKILL "Marca da Morte" (Marca um inimigo; ao morrer, explode.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Cria do Lago", the Filhote stage (baby form: tiny, round and cute, big head and eyes, short limbs) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Ahuízotl (`__anim_2`, Jovem)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_2.png`
- **Anexar:** `ahuizotl__anim_2`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_2__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_2` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_2__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_2` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_2.png`
- **Anexar:** a base NOVA `ahuizotl__anim_2` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - SKILL "Marca da Morte" (Marca um inimigo; ao morrer, explode.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Ahuízotl", the Jovem stage (young form: small and lively, adult traits starting to show) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Ahuízotl das Profundezas (`__anim_3`, Adulto ramo A)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_3.png`
- **Anexar:** `ahuizotl__anim_3`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl das Profundezas", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_3__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_3` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl das Profundezas", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_3__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_3` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl das Profundezas", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_3.png`
- **Anexar:** a base NOVA `ahuizotl__anim_3` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - SKILL "Marca da Morte" (Marca um inimigo; ao morrer, explode.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Ahuízotl das Profundezas", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Ahuízotl Espreitador (`__anim_4`, Adulto ramo B)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_4.png`
- **Anexar:** `ahuizotl__anim_4`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Espreitador", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_4__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_4` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Espreitador", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_4__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_4` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Espreitador", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_4.png`
- **Anexar:** a base NOVA `ahuizotl__anim_4` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - SKILL "Marca da Morte" (Marca um inimigo; ao morrer, explode.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Ahuízotl Espreitador", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Ahuízotl Sombrio (`__anim_5`, Adulto ramo C)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_5.png`
- **Anexar:** `ahuizotl__anim_5`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Sombrio", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_5__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_5` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Sombrio", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_5__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_5` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Sombrio", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_5.png`
- **Anexar:** a base NOVA `ahuizotl__anim_5` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - SKILL "Marca da Morte" (Marca um inimigo; ao morrer, explode.), 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Ahuízotl Sombrio", the Adulto stage (adult form: full, confident and impressive body) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Senhor do Lago (`__anim_6`, Supremo ramo A)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_6.png`
- **Anexar:** `ahuizotl__anim_6`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Senhor do Lago", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_6__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_6` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Senhor do Lago", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_6__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_6` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Senhor do Lago", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_6.png`
- **Anexar:** a base NOVA `ahuizotl__anim_6` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: A mão da cauda puxa inimigos para o fundo., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Senhor do Lago", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Ahuízotl Ancestral (`__anim_7`, Supremo ramo B)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_7.png`
- **Anexar:** `ahuizotl__anim_7`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_7__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_7` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_7__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_7` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of water energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_7.png`
- **Anexar:** a base NOVA `ahuizotl__anim_7` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with water energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Emboscadas em cadeia., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Ahuízotl Ancestral", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: water (main colors: deep blue, teal and white foam). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Ahuízotl do Abismo (`__anim_8`, Supremo ramo C)

#### Base (etapa 2)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_8.png`
- **Anexar:** `ahuizotl__anim_8`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (parado, andando e atacando)

```text
Create a 2D game sprite sheet of one monster: 3 animations (idle, move, attack), 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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

#### Épico (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_8__epico.png`
- **Anexar:** a base NOVA `ahuizotl__anim_8` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the EPIC rarity variant of a monster. Same poses and same size as the reference, redesigned as a crystalline silver-violet variant with glowing runes, sharper details and a faint violet aura. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Lendário (etapa 3)

- **Salvar como:** `arte/monstros/agua/ahuizotl__anim_8__lendario.png`
- **Anexar:** a base NOVA `ahuizotl__anim_8` (etapa 2)
- **O jogo usa:** sim, no lugar da repintura da forma comum (arquivo novo: me mande o PNG para converter)

```text
Create a 2D game sprite sheet: the LEGENDARY rarity variant of a monster. Same poses and same size as the reference, redesigned as a radiant gold-and-white variant with a soft halo, flowing light particles and ornamental markings. The silhouette must stay recognizable as the same monster.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 3 equal rows = 18 cells, each cell 256 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP, 6 frames: breathing in place with small secondary motion (tail, flames, hair, wings, ears). F1 neutral, F2-F3 inhale and rise slightly, F4 top, F5-F6 exhale back to F1. Feet stay planted.
ROW 2 - MOVE LOOP, 6 frames: a full walk cycle moving to the right, in place (no travel across the cell); if the creature has wings or floats, a flying or floating cycle instead, with the bottom of the body on the feet line. F1 and F4 are the two contact poses; the cycle loops.
ROW 3 - BASIC ATTACK, 6 frames: quick slashes: dashes forward and cuts twice very fast. F1-F2 anticipation (wind-up), F3 strike, F4 impact with a small burst of shadow energy kept inside the cell, F5-F6 recovery back to the idle pose.

CHARACTER: "Ahuízotl do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

REFERENCE: the attached image shows this same character. Copy its design, colors, markings and proportions exactly, except for the rarity recolor and ornaments described above. It already uses the same grid as requested here: keep each pose in the same cell, but redraw everything cleaner, with more detail, perfectly aligned and with real transparency.

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

#### Ações (etapa 3, menor urgência)

- **Salvar como:** `arte/monstros/agua/ahuizotl__acoes_8.png`
- **Anexar:** a base NOVA `ahuizotl__anim_8` (etapa 2)
- **O jogo usa:** ainda não: eu ligo as habilidades a estas linhas quando chegarem (arquivo novo: me mande o PNG)

```text
Create a 2D game sprite sheet of one monster: 4 extra action animations, 6 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 6 equal columns x 4 equal rows = 24 cells, each cell 256 px wide x 256 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - SKILL "Salto Sombrio" (Teleporta até a elite mais próxima e golpeia.), 6 frames: F1-F2 wind-up, F3-F4 release with shadow energy, F5-F6 recovery.
ROW 2 - ULTIMATE MOVE: Abre um abismo no chão., 6 frames, bigger and more dramatic than row 1: F1-F2 charge, F3-F4 peak, F5-F6 recovery. Effects stay inside the cell.
ROW 3 - REACTIONS, 6 frames: F1-F2 hurt (flinches back, squints), F3-F6 celebrating (jumps or cheers, loop).
ROW 4 - PERSONALITY, 6 frames: F1-F4 a quirk that shows its personality "pregador de peças" (for example shy peeking, proud chest puff, sleepy yawn, playful hop), F5-F6 knocked out lying down with dizzy eyes.

CHARACTER: "Ahuízotl do Abismo", the Supremo stage (supreme form: legendary and imposing, bulkier silhouette, ornate details, visible power aura) of a monster line from the game. Element: shadow (main colors: deep purple, black-violet and magenta-free dark glows). Lineage: sea creatures. Combat class: Assassin.
Look of the line (Portuguese): cão d’água de pelo liso e brilhante. Signature trait that must always be visible: a mãozinha na ponta da cauda. Inspired by: cão-d’água.
Personality (Portuguese, show it in the poses): pregador de peças.

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
```


## Imagem fixa das 8 formas (opcional)

#### Imagem fixa

- **Salvar como:** `arte/monstros/agua/ahuizotl__base.png`
- **Anexar:** `ahuizotl__base`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim, onde a forma não tem animação (e como referência de cor)

```text
Create a 2D game sprite sheet: the 8 evolution forms of one monster line, one still pose each (a calm 3/4 standing pose).

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 4 equal columns x 2 equal rows = 8 cells, each cell 384 px wide x 512 px tall. Do NOT draw the grid. Exactly one pose per cell, 4 per row, no more, no less. Rows are read top to bottom, frames left to right.

CELLS, left to right, top row then bottom row:
1. "Cria do Lago" - filhote, element water
2. "Ahuízotl" - jovem, element water
3. "Ahuízotl das Profundezas" - adulto (branch A), element water
4. "Ahuízotl Espreitador" - adulto (branch B), element water
5. "Ahuízotl Sombrio" - adulto (branch C), element shadow
6. "Senhor do Lago" - supremo (branch A), element water
7. "Ahuízotl Ancestral" - supremo (branch B), element water
8. "Ahuízotl do Abismo" - supremo (branch C), element shadow
The baby is the smallest and the supreme forms the most imposing, but every form fills most of its cell height so the details stay readable.

MONSTER LINE (Portuguese): cão d’água de pelo liso e brilhante. Signature trait in every form: a mãozinha na ponta da cauda. Inspired by: cão-d’água. Class: Assassin.

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
```
