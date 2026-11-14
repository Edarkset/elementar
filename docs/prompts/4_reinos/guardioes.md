# Guardiões das Eras (chefes do fim de cada era)

O jogo lê 6 × 6: linhas 3, 4 e 5 são os três golpes, linha 6 a morte.


## Tiamat, Mãe dos Monstros · Berço das Civilizações

#### Animação

- **Salvar como:** `arte/reinos/berco/guardiao_berco__anim.png`
- **Anexar:** `guardiao_berco__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "Tiamat, Mãe dos Monstros" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Águas Primordiais" (A água salgada do caos se espalha em ondas.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Mãe dos Monstros" (Dá à luz onze monstros que cercam a equipe.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Tempestade do Caos" (Escamas de tempestade giram em todas as direções.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "Tiamat, Mãe dos Monstros", guardian of the era "Berço das Civilizações" (Portuguese description: dragoa primordial do caos com corpo de água salgada e escamas de tempestade; serpent, with horns, wings, glowing accents). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/berco/guardiao_berco__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "Tiamat, Mãe dos Monstros" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Águas Primordiais" (A água salgada do caos se espalha em ondas.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Mãe dos Monstros" (Dá à luz onze monstros que cercam a equipe.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Tempestade do Caos" (Escamas de tempestade giram em todas as direções.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Fenrir Desacorrentado · Era dos Reinos

#### Animação

- **Salvar como:** `arte/reinos/reinos/guardiao_reinos__anim.png`
- **Anexar:** `guardiao_reinos__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "Fenrir Desacorrentado" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Correntes Partidas" (Os pedaços da corrente mágica chicoteiam a arena.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Devorar o Sol" (Abocanha o sol: a arena escurece.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Investida do Lobo" (Três investidas de lobo gigante.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "Fenrir Desacorrentado", guardian of the era "Era dos Reinos" (Portuguese description: lobo colossal de pelo cinza-ferro arrastando correntes quebradas; four-legged beast, with correntes, fangs, fur, glowing accents). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/reinos/guardiao_reinos__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "Fenrir Desacorrentado" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Correntes Partidas" (Os pedaços da corrente mágica chicoteiam a arena.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Devorar o Sol" (Abocanha o sol: a arena escurece.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Investida do Lobo" (Três investidas de lobo gigante.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Os Senhores de Xibalba · Novo Mundo

#### Animação

- **Salvar como:** `arte/reinos/novo_mundo/guardiao_novo_mundo__anim.png`
- **Anexar:** `guardiao_novo_mundo__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "Os Senhores de Xibalba" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Jogo de Bola Sagrado" (Duas bolas do jogo sagrado quicam pela arena.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Casas das Provas" (Abre as casas das provas: jaguares, morcegos e navalhas.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Ossos de Xibalba" (Ossos caem como chuva.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "Os Senhores de Xibalba", guardian of the era "Novo Mundo" (Portuguese description: dupla de reis esqueléticos com cocares de penas e máscaras de jade; humanoid, with bones, crown, mask, glowing accents). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/novo_mundo/guardiao_novo_mundo__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "Os Senhores de Xibalba" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Jogo de Bola Sagrado" (Duas bolas do jogo sagrado quicam pela arena.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Casas das Provas" (Abre as casas das provas: jaguares, morcegos e navalhas.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Ossos de Xibalba" (Ossos caem como chuva.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## O Kraken · Grandes Navegações

#### Animação

- **Salvar como:** `arte/reinos/navegacoes/guardiao_navegacoes__anim.png`
- **Anexar:** `guardiao_navegacoes__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "O Kraken" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Tentáculos do Abismo" (Dez tentáculos brotam em sequência.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Engolir Navios" (Um redemoinho que puxa tudo.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Tinta Negra" (Uma nuvem de tinta que escurece o chão.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "O Kraken", guardian of the era "Grandes Navegações" (Portuguese description: lula colossal com tentáculos do tamanho de navios; blob, with tentacles, single eye, glowing accents). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/navegacoes/guardiao_navegacoes__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "O Kraken" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Tentáculos do Abismo" (Dez tentáculos brotam em sequência.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Engolir Navios" (Um redemoinho que puxa tudo.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Tinta Negra" (Uma nuvem de tinta que escurece o chão.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## O Cavaleiro Sem Cabeça · Era Gótica

#### Animação

- **Salvar como:** `arte/reinos/gotica/guardiao_gotica__anim.png`
- **Anexar:** `guardiao_gotica__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "O Cavaleiro Sem Cabeça" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Abóbora Flamejante" (Arremessa abóboras em chamas que explodem e incendeiam.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Galope Noturno" (Quatro galopes que atravessam a arena.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Cabeça Errante" (A cabeça voa sozinha e ataca de outro ângulo.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "O Cavaleiro Sem Cabeça", guardian of the era "Era Gótica" (Portuguese description: cavaleiro sem cabeça segurando uma abóbora em chamas, cavalo negro; humanoid, with sem_cabeca, abobora_mao, hood). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/gotica/guardiao_gotica__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "O Cavaleiro Sem Cabeça" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Abóbora Flamejante" (Arremessa abóboras em chamas que explodem e incendeiam.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Galope Noturno" (Quatro galopes que atravessam a arena.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Cabeça Errante" (A cabeça voa sozinha e ataca de outro ângulo.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## Colosso de Oricalco · Mundos Perdidos

#### Animação

- **Salvar como:** `arte/reinos/perdidos/guardiao_perdidos__anim.png`
- **Anexar:** `guardiao_perdidos__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "Colosso de Oricalco" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Punho de Metal" (Socos no chão fazem tudo tremer.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Runas de Atlântida" (Quatro raios de runas em cruz giram.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Reconstrução" (Absorve as colunas de metal da arena para se consertar. Quebre-as antes.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "Colosso de Oricalco", guardian of the era "Mundos Perdidos" (Portuguese description: estátua gigante de metal avermelhado com runas de Atlântida brilhando; stone or metal golem, with runes, helmet, glowing accents). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/perdidos/guardiao_perdidos__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "Colosso de Oricalco" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Punho de Metal" (Socos no chão fazem tudo tremer.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Runas de Atlântida" (Quatro raios de runas em cruz giram.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Reconstrução" (Absorve as colunas de metal da arena para se consertar. Quebre-as antes.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```


## O Primordial · Reinos Elementais

#### Animação

- **Salvar como:** `arte/reinos/elementais/guardiao_elementais__anim.png`
- **Anexar:** `guardiao_elementais__anim`: o PNG original (ou o que você já corrigiu), **não** o `.webp` da pasta do jogo, que está achatado
- **O jogo usa:** sim (6 × 6)
- **Molde (como deve ficar):** [Guardião da Era](../moldes/guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the guardian "O Primordial" (one single creature, repeated in 36 poses). The ONLY reference is the image attached to THIS message.

Create a 2D game sprite sheet of one epic boss: 6 animations, 6 frames each.

CANVAS: exactly 1024 x 1024 pixels (square 1:1).
GRID: invisible grid of exactly 6 equal columns x 6 equal rows = 36 cells, each cell 171 px wide x 171 px tall. Do NOT draw the grid. Exactly one pose per cell, 6 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - IDLE LOOP: F1-F4 breathing loop, F5-F6 roar.
ROW 2 - MOVE LOOP, 6 frames.
ROW 3 - ATTACK "Oito Braços" (Cada braço dispara um elemento diferente.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 4 - ATTACK "Núcleo de Luz e Sombra" (Dois raios, um de luz e outro de sombra, giram juntos.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 5 - ATTACK "Criação" (Cria paredes de elementos diferentes.): F1-F2 wind-up, F3-F4 strike, F5-F6 recovery.
ROW 6 - DEATH, 6 frames: long dramatic collapse, fading at the end.

CHARACTER: "O Primordial", guardian of the era "Reinos Elementais" (Portuguese description: entidade de oito braços, cada um de um elemento, núcleo de luz e sombra; floating ghost, with crown, glowing accents, flames, ice). The biggest and most impressive creature of the game.

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

#### Efeitos dos golpes

- **Salvar como:** `arte/reinos/elementais/guardiao_elementais__efeitos.png`
- **Anexar:** nada
- **O jogo usa:** sim (8 × 3: uma linha por golpe; quadros 1-4 projétil, 5-8 impacto)
- **Molde (como deve ficar):** [Efeitos do Guardião](../moldes/efeitos_guardiao.png)

```text
NEW, SEPARATE IMAGE. Start from a blank canvas: do not reuse, copy or continue anything from images generated earlier in this conversation (no characters, poses, colors, effects or layout from them). The ONLY subject of this image is: the attack effects of "O Primordial" (effects only, no creature). There is no reference image for this one: ignore any image attached earlier in the conversation.

Create a 2D game visual effects sheet (no characters): 3 attack effects, 8 frames each.

CANVAS: exactly 1536 x 1024 pixels (landscape 3:2).
GRID: invisible grid of exactly 8 equal columns x 3 equal rows = 24 cells, each cell 192 px wide x 341 px tall. Do NOT draw the grid. Exactly one pose per cell, 8 per row, no more, no less. Rows are read top to bottom, frames left to right.

ROW 1 - effect of "Oito Braços" (Cada braço dispara um elemento diferente.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 2 - effect of "Núcleo de Luz e Sombra" (Dois raios, um de luz e outro de sombra, giram juntos.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.
ROW 3 - effect of "Criação" (Cria paredes de elementos diferentes.): F1-F4 the projectile or wave in flight (loop), F5-F8 the impact on the ground seen from above, growing then fading.

Bright core with soft translucent edges, never opaque white shapes. Each effect centered in its cell.

BACKGROUND: fully transparent (real alpha channel). If transparency is not possible, fill the whole background with flat pure magenta #FF00FF (one solid color, no gradient, no texture, no shadow, no vignette) and then do not use magenta or hot pink anywhere in the artwork.

STYLE: high-detail painted pixel art for a 2D action roguelite seen from a top-down 3/4 camera (like Sea of Stars, Octopath Traveler and Hades): rich saturated colors, soft painterly shading, warm rim light from the top-left, crisp 1-2 px dark outline (very dark brown or plum, never pure black), strong readable silhouette that still reads when shrunk to 24 px tall. Mythological fantasy.

DO NOT: draw grid lines, cell borders, frames, panels or dividers; write any text, letters, numbers, labels or watermark; draw a floor, ground, platform, cast shadow or background scenery; paint a checkerboard pattern to fake transparency; add any character that was not requested, or two poses in the same cell; change colors, size or design between frames; crop the character at a cell edge; stretch or squash anything.

BEFORE YOU FINISH, CHECK: the image is 1536 x 1024; exactly 8 items in every row and exactly 3 rows; nothing from earlier images of this conversation; transparent (or flat #FF00FF magenta) background, no checkerboard; nothing written anywhere.
```
