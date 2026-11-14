# Etapa 1 · Corrigir (o jogo usa hoje)

As correções dos monstros você já fez. Estas são as que faltam. O prompt completo de cada uma está no arquivo do reino ou nos gerais. Aqui fica só a lista, com a ordem e o motivo.

## 1. Inimigos com a grade errada (mais urgente: aparecem o tempo todo)

O jogo lê os inimigos em **8 colunas × 6 linhas**, com cada inimigo ocupando 2 linhas:
- **Linha de cima:** 2 quadros parado, 4 andando e 2 atacando.
- **Linha de baixo:** 1 de dor, 4 de morte e 3 de mania.

O prompt "Inimigos comuns" de cada reino já pede exatamente isso.

| Defeito | Reinos | Arquivo do prompt |
|---|---|---|
| linhas fora da grade | Floresta Negra, Reino da Luz, Laboratório, Atlântida, Shangri-lá, Tenochtitlán | `4_reinos/gotica/floresta_negra.md`, `4_reinos/elementais/reino_luz.md`, `4_reinos/gotica/laboratorio.md`, `4_reinos/perdidos/atlantida.md`, `4_reinos/perdidos/shangrila.md`, `4_reinos/novo_mundo/tenochtitlan.md` |
| altura muda entre os quadros de andar | Egito, Celta, Eslavo, Amazônia | `4_reinos/berco/egito.md`, `4_reinos/reinos/celta.md`, `4_reinos/reinos/eslavo.md`, `4_reinos/novo_mundo/amazonia.md` |

## 2. Pisos com costura (aparece uma linha quando o piso se repete)

Pérsia, Tenochtitlán, Atlântida, Távola: bloco "Piso" em `4_reinos/berco/persia.md`, `4_reinos/novo_mundo/tenochtitlan.md`, `4_reinos/perdidos/atlantida.md` e `4_reinos/reinos/tavola.md`.

## 3. Chefes com moldura em volta

Reino do Fogo e Reino da Terra: bloco "Chefe" em `4_reinos/elementais/reino_fogo.md` e `4_reinos/elementais/reino_terra.md`. A trava "DO NOT draw … cell borders, frames" já cobre a moldura.

## 4. Especiais e combinados cortados (hoje desligados no jogo)

Os 16 especiais e os 17 combinados vieram com cada quadro cortado e com pedaço do vizinho. Por isso o jogo usa os efeitos desenhados por código.

Os prompts estão em `3_gerais/itens_e_efeitos.md` (blocos "Especial" e "Combinado"). Eles usam os mesmos nomes de arquivo de hoje, então o conversor normal funciona. Quando chegarem, eu ligo de novo no jogo e confiro.

## 5. Relíquias sem desenho

As 34 relíquias hoje são só marcação. Bloco "Relíquia" no arquivo de cada reino. São arquivos novos para o conversor: me mande os PNG.
