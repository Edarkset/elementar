# Auditoria por capturas (mapas, monstros e Lendas)

Gravação automática em iPhone 13 (tela de alta densidade), com a equipe lutando e inimigos em volta:
- **34 mapas:** combate e luta de chefe em cada um, mais medições (brilho da tela, contraste entre o herói e o chão, inimigos em tela);
- **51 monstros:** cada um nas formas Filhote, Adulto e Supremo, lutando juntos;
- **47 Lendas e deuses:** cada um como herói da run, no seu reino de origem.

Ao todo, 166 telas. O script está em `testes/` e pode ser repetido.

## 1. Corrigido no código nesta rodada

| Problema visto | Causa | Correção |
|---|---|---|
| Tela preta durante o combate (Mesopotâmia, Reino da Luz, Reino do Ar, captura do Raijū) | A memória de imagens crescia ~40 MB por mapa e nunca era liberada (183 MB no 4º mapa). Ao passar do teto, o navegador descarta as telas. O Safari do iPhone tem um teto parecido | Ao trocar de mapa, as artes de outros reinos e os recortes guardados são soltos. A memória ficou estável em ~80 MB |
| Manchas cinzas e brancas chapadas em vários reinos (Terra, Fogo, Natureza, Água, Shangri-lá) | Inimigos com a mania "fingir de estátua" (e as estátuas de pedra e ouro) eram desenhados como silhueta de uma cor só | A estátua agora mantém o desenho, em tom de pedra ou ouro |
| Pedaços da pose vizinha acima de alguns inimigos (harpias, raposas) | A limpeza só valia para a versão pequena; o celular usa a versão grande | Limpeza também na versão grande |
| Lendas de roupa escura somem no chão (Drácula, Barba Negra, Nemo, Dias, Brontes) | O herói não tinha contorno nem luz própria | Contorno de luz e brilho nos pés do herói, mais fortes à noite; Lendas um pouco maiores |
| Figura branca do Rei Afogado na Atlântida | Gelo a 55% sobre estátuas grandes | Gelo leve em objetos grandes |
| "Combo" grande no meio de cima da tela em todo combate | — | Fonte menor |

## 2. Propostas por mapa

Medições (brilho de 0 a 255; contraste = diferença entre o herói e o chão em volta):

| Mapa | O que se vê | Proposta |
|---|---|---|
| Caribe, Pérsia, Tenochtitlán | Herói com pouco contraste com o piso (diferença de 2 a 19) | Pisos com menos contraste e menos cor nas áreas de passagem (prompt C2: "midtone floor, low contrast"). O contorno novo do herói já ajuda |
| Reino da Luz, Reino do Ar, Grécia, Shangri-lá | Pisos muito claros (brilho 113 a 148): efeitos brancos e cristais somem | Pisos um tom mais escuros, ou a luz do reino puxando para um dourado mais quente. No código: escurecer 8% o piso desses reinos |
| Reino da Sombra, Transilvânia, Xibalbá, Floresta Negra | Escuros (43 a 49), mas agora com inimigos brilhando | Ok. Nas folhas novas dos inimigos desses reinos, pedir olhos e detalhes brilhantes (emissivos) |
| Mesopotâmia, Atlântida, Reino da Água | Áreas grandes de água e abismo cobrindo a tela | Ok; o abismo novo (C1) melhora |
| Todos | Pisos com o mesmo detalhe pequeno repetido | Prompt C2 em 1024 px, com áreas mais lisas para a luta e detalhe nas bordas |
| Chefes | Todos aparecem e cabem na tela; a barra fica no topo | Prompt N2: chefes em 256 px com entrada e fase 2. Hoje o chefe entra sem cerimônia |

## 3. Propostas para os monstros

| Observação | Monstros | Proposta |
|---|---|---|
| As 3 formas do mesmo monstro juntas mostram pouca diferença de tamanho e de "peso" entre Filhote, Adulto e Supremo | todos | Prompt M1: o Supremo com silhueta bem maior e mais imponente. No código já há 18 → 28 px; com arte maior dá para subir o Supremo para 32 px |
| Supremos com efeitos que cobrem a equipe (Ciclope, Qilin, Ifrit, Draugr) | classes Guerreiro e Guardião | Prompt E3: efeitos mais translúcidos, com núcleo brilhante e borda suave |
| Monstros pequenos e escuros somem no chão (Jiangshi, Vampiro Filhote, Cérbero) | sombra e mortos-vivos | Prompt M1: contorno mais claro (rim light) na cor do elemento nas folhas novas |
| Monstros etéreos ficam lavados em chão claro (Banshee, Raijū, Kitsune) | ar e raio | Prompt M1: núcleo mais saturado e contorno escuro firme |
| Raridades Épico e Lendário manchadas | Ryu, Amaru, Banshee, Kodama, Sereia, Iara, Poraquê | Prompt M3 (já no pacote) |

## 4. Propostas para as Lendas e deuses

| Observação | Quem | Proposta |
|---|---|---|
| Arte das Lendas com muitos tons escuros e poucas luzes | Drácula, Barba Negra, Nemo, Dias, Marco Polo, Lidenbrock | Prompt H2: "strong warm rim light, bright accents (eyes, weapon, emblem)" |
| Frankenstein sem folha de herói (entra o Invocador) | Frankenstein | Gerar `lendas/frankenstein.png` (H2) |
| Lendas no tamanho de um monstro: parecem mais um da equipe do que o herói | todas | Prompt H2 em 128 px. No código, Lendas passaram de 34 para 38 px; com a arte nova dá para 44 |
| Poderes das Lendas desenhados com efeitos genéricos (anéis) | todas | Prompt novo L-FX: um efeito por tipo de poder (órbita, projétil, onda, raio em cadeia, área, investida, invocação, dardos, dreno, barril), 8 × 1 de 192 px, tingido pelo elemento |
| Dom Divino dos deuses sem animação própria | 13 deuses | Prompt H2, linha 6 |

## 5. Interface durante o combate

- Faixas de conquista e "Segredo descoberto" cobrem o topo da luta por vários segundos: encurtar e subir para a barra do HUD.
- Números de dano empilhados em grupos densos: no código já agrupam; com efeitos novos, reduzir mais.
- Toast de "Reação elemental!" aparece em cima do herói: mover para baixo da barra de XP.

## 6. Prompt novo (complemento do pacote)

### L-FX · Efeitos dos poderes das Lendas (P2)
- **Arquivo:** `arte/efeitos/lenda__{tipo}.png` · 10 tipos (orbita, projetil, onda, raio, area, investida, invocar, dardos, drenar, barril) · **8 quadros × 1 linha · célula 192 px**.
```
Signature power effect of a mythological hero, type "{tipo}", neutral white-gold so the game can tint it by
element, transparent background, bright core with soft translucent edges (never opaque white shapes).
orbita: 3 glowing relics orbiting · projetil: thrown weapon with motion trail · onda: ground shockwave ring ·
raio: chain lightning arc between two points · area: glowing zone on the ground (top-down perspective) ·
investida: dash streak with afterimages · invocar: spirit ally appearing from a portal ·
dardos: volley of small darts · drenar: life-steal beam with particles flowing back · barril: explosive cask
bursting. 8 frames: appear, peak, fade.
```
