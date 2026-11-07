# Artes para refazer ou reconverter

Varredura feita em todas as artes do `arte/manifesto.json`. Dois tipos de problema:

1. **Conversão errada** (o original está bom; só precisa converter de novo com a ferramenta corrigida).
2. **Arte que precisa ser gerada de novo** (o conteúdo não serve para o jogo).

---

## 1. Reconverter a partir dos originais (não precisa gerar nada)

A conversão anterior forçava cada arte ao tamanho antigo, sem respeitar a proporção do original. Originais em 1536x1024 (3:2) reduzidos para 384x192 (2:1) ficaram 25% achatados; folhas com margem em volta ficaram esmagadas numa faixa.

A ferramenta foi corrigida: agora mantém a proporção, recorta as peças do ambiente pela transparência e permite um tamanho maior (`-Escala`, padrão 2 = o dobro da largura antiga). O jogo lê qualquer tamanho e proporção.

```
powershell -ExecutionPolicy Bypass -File ferramentas\converter_artes.ps1 -Origem "C:\caminho\da\pasta\arte"
```

Rode **uma vez** com o padrão (`-Escala 2`). Se precisar rodar de novo depois, use `-Escala 1`, senão a largura dobra outra vez (ela nunca passa da largura do original).

O que mais ganha com a reconversão:

| Pasta | Problema hoje |
|---|---|
| `lendarios/*__base` (8) | Achatados a menos de 1/3 da altura (1536x1024 virou 320x64). O jogo usa a animação no lugar, mas a imagem fixa está inutilizável. |
| `lendarios/*__anim_*` (32) | 25% mais baixos. O jogo corrige a altura no desenho enquanto isso. O dragão Árvore já foi refeito (o original estava no git). |
| `reinos/*/*__tiles` (34) | A 1ª linha (peças de chão) ficou numa faixa fina no topo de cada célula. Só aparece em mapa sem piso. |
| `reinos/*/*__fauna` (34) | Linhas fora da grade (desenho ocupa 40% da célula). |
| `monstros/*/*__anim_*` (408) e `__base/__epico/__lendario` (153) | Linhas fora da grade de 64 px; o jogo já recorta pelo desenho, mas em 2x (128 px por quadro) fica bem mais nítido. |
| `reinos/*/*__chefe`, `__mini`, `__inimigos` | Grade boa. Reconverter em 2x melhora muito a nitidez (hoje 64-96 px por quadro, desenhado 5 a 7 vezes maior). |

`arte/ambiente/*` já foi refeito agora (os originais estavam no git): eram os retângulos cinza que cobriam a tela.

---

## 2. Gerar de novo

### Efeitos especiais e combinados (`arte/efeitos/especial__*`, 16 arquivos; `combinado__*`, 17 arquivos)
Estão desligados no jogo (os especiais usam efeitos desenhados por código). Dois problemas:
- vieram cortados: cada quadro é uma fatia estreita com pedaço do quadro vizinho (o original não era uma tira de 8 ou 10 quadros iguais);
- os especiais mostram **um personagem inteiro** fazendo o golpe, o que fica estranho por cima do cenário.

Como gerar:
- **Só o efeito**, sem personagem: círculo mágico, explosão, cúpula de escudo, corte, pilar de luz, onda de choque etc.
- Fundo transparente, visto de cima em ¾ (como o resto do jogo).
- **Uma linha só**, quadros quadrados do mesmo tamanho, lado a lado, sem espaço entre eles: especial 8 quadros, combinado 10 quadros (ex.: 8 x 256 px = 2048 x 256).
- O efeito centrado em cada quadro, começando pequeno, crescendo e sumindo.

Depois, em `js/jogo.js`, troque `USAR_FOLHAS_ESPECIAL=false` para `true`.

### Folhas de animação dos monstros (quando forem refeitas)
Para o jogo ficar mais bonito, a regra de ouro é a **grade exata**:
- 6 colunas x 3 linhas, todas as células do mesmo tamanho (128 px ou mais).
- Linha 1 parado (4 a 6 quadros), linha 2 andando (6), linha 3 atacando (6).
- Personagem centralizado na célula e **com os pés na mesma altura** em todos os quadros.
- Nada encostando na borda da célula; fundo transparente.
- Mesma escala do personagem em todas as linhas.

### Épico e Lendário
Hoje o jogo anima essas variações trocando as cores da animação comum. Onde o desenho da raridade é muito diferente do comum (ex.: Tengu Lendário, Qilin Épico, Frankenstein Épico, Sereia), a cor fica aproximada. Folhas de animação próprias para essas raridades resolveriam.

---

## 3. Artes que o código não usa

Não pesam mais (só são baixadas se forem pedidas), mas podem ser apagadas ou ganhar uso:
`arte/itens/*` (34), `arte/lendarios/*__eclosao` (8) e 20 da pasta `arte/ui/` (`ui__barra_chefe`, `ui__barras`, `ui__botao_perigo`, `ui__camada_*`, `ui__cartas`, `ui__classes`, `ui__derrota`, `ui__elementos`, `ui__emblema`, `ui__faixa`, `ui__itens`, `ui__linhagens`, `ui__livro`, `ui__paineis`, `ui__portais`, `ui__refugio`, `ui__selos`, `ui__vitoria`).
