# Elementar · pacote de prompts de arte (v4)

Este pacote substitui os anteriores. Cada prompt sai **completo**: tamanho da imagem, grade, o que vai em cada quadro, a descrição do personagem e as travas (o que não pode sair). Não tem campo para preencher à mão.

Os prompts são gerados a partir dos dados do próprio jogo (`node ferramentas/gerar_prompts.js`). Se um nome, visual ou golpe mudar no jogo, eu gero de novo e o pacote acompanha.

---

## 1. A ordem

| Etapa | Onde está | O que é | Depende de |
|---|---|---|---|
| **0. Reconverter** | este arquivo, seção 5 | artes boas no original que só ficaram achatadas na conversão antiga | nada (não gera nada) |
| **1. Corrigir** | `1_corrigir.md` | o que o jogo usa hoje e está com defeito | nada |
| **2. Base dos monstros** | `2_monstros/<elemento>/<monstro>.md`, bloco "Base" | a folha de animação de cada forma (parado, andando, atacando) | nada |
| **3. Variações dos monstros** | mesmo arquivo, blocos "Épico", "Lendário" e "Ações" | raridades com arte própria e animações extras | **a base nova da etapa 2** |
| **4. Gerais** | `3_gerais/` | herói, ovos, baús, coletáveis, efeitos, especiais, combinados, Lendas e deuses | nada |
| **5. Reinos** | `4_reinos/<era>/<reino>.md` | inimigos, mini-chefe, chefe, efeitos, cenário e relíquia de cada reino | nada |

**Por que a base vem antes das variações:** o Épico, o Lendário e as Ações pedem para copiar o monstro da imagem anexada. Se o anexo for a folha velha, o gerador copia um desenho pior e num tamanho diferente. **Sempre anexe a base nova.**

**O "refazer as animações" não é para o monstro ficar maior na tela.** O tamanho na tela é o jogo que decide. Refazer serve para:
- deixar o desenho mais nítido;
- deixar a animação mais suave;
- acertar a grade.

Se você já corrigiu a folha de uma forma e ela passa na conferência (seção 3), ela já é a base nova: não precisa refazer.

**Dentro dos monstros:** comece pelas formas Adulto e Supremo (`__anim_3` a `__anim_8`), que são as mais vistas. Faça um elemento por vez.

---

## 2. Como usar um prompt

1. Abra o arquivo do monstro (ou do reino) e ache o bloco.
2. **Copie o bloco de texto inteiro**, sem cortar nada: as travas estão no fim.
3. **Anexe a imagem indicada em "Anexar".**
   - Use o **PNG original** ou o que você já corrigiu.
   - **Nunca** anexe o `.webp` da pasta `arte/` do jogo: eles foram achatados numa conversão antiga e o gerador copiaria o achatamento.
4. Confira o resultado com a lista da seção 3 **antes** de salvar.
5. Salve como PNG com o nome exato de "Salvar como".

### Por que estes tamanhos

Os geradores de imagem só entregam três formatos:
- 1536 × 1024 (deitado);
- 1024 × 1024 (quadrado);
- 1024 × 1536 (em pé).

Todo prompt pede um desses e divide a imagem em colunas e linhas iguais. Os quadros podem não ser quadrados, por exemplo 256 × 341 px: o jogo recorta pelo desenho e alinha pelos pés.

Pedir outro tamanho, como 1024 × 384, faz o gerador espremer a grade. Foi isso que achatou as artes antigas.

---

## 3. Conferência antes de salvar (2 minutos)

Abra a imagem num visualizador que mostre transparência e confira:

| # | Confira | Se falhar |
|---|---|---|
| 1 | **Quantidade:** o número de colunas e de linhas é o do prompt (ex.: 6 por linha, 3 linhas) | correção A |
| 2 | **Fundo:** transparente de verdade, ou magenta chapado (#FF00FF) | correção B |
| 3 | **Sem xadrez:** o fundo não é um xadrez cinza e branco pintado | correção B |
| 4 | **Sem texto:** nenhuma letra, número, linha de grade ou moldura | correção C |
| 5 | **Direção:** o personagem olha para a direita em todos os quadros | correção D |
| 6 | **Nada cortado:** nada encosta na borda do quadro nem invade o vizinho | correção E |
| 7 | **Mesmo tamanho:** o personagem tem o mesmo tamanho em todos os quadros e os pés na mesma altura dentro de cada linha | correção E |
| 8 | **Mesmo personagem:** cores, traço marcante e forma iguais ao anexo | correção F |

Depois de converter, `npm run artes` confere tudo isso de forma automática. Ou me mande as imagens que eu confiro.

### Correções rápidas (cole na mesma conversa do gerador)

- **A · quantidade errada:**
  `Redo it with exactly {N} poses per row and exactly {L} rows, on the same {W} x {H} canvas. Count them: {N} x {L} = {total} poses. Keep everything else.`
- **B · fundo errado ou xadrez:**
  `Redo it with a real transparent background (alpha). If you cannot, use a flat solid #FF00FF magenta background with no checkerboard, no gradient and no shadow. Keep everything else.`
- **C · texto ou linhas:**
  `Redo it without any text, numbers, labels, grid lines or borders. Only the character poses on the background. Keep everything else.`
- **D · lado errado:**
  `Redo it with the character facing RIGHT in every single pose. Keep everything else.`
- **E · cortado ou tamanhos diferentes:**
  `Redo it smaller inside each cell, with empty space around every pose so nothing touches the cell edges, the character the same size in every pose and the feet on the same line. Keep everything else.`
- **F · personagem diferente:**
  `Redo it copying the attached character exactly: same colors, same markings, same shape. Keep the layout.`

Se a mesma falha voltar duas vezes, comece uma conversa nova com o prompt inteiro: o gerador "vicia" no erro.

---

## 4. Converter e mandar para o jogo

| Tipo de arquivo | Como converter |
|---|---|
| Mesmo nome de uma arte que o jogo já tem (base dos monstros, inimigos, chefes, cenário, Lendas, especiais, combinados) | conversor normal: `powershell -ExecutionPolicy Bypass -File ferramentas\converter_artes.ps1 -Origem "C:\caminho\da\pasta"` |
| **Nome novo** (`__anim_N__epico`, `__anim_N__lendario`, `__acoes_N`, herói, ovos, baús, coletáveis, efeitos por elemento e por classe, ícones, relíquias) | **me mande os PNG** (Drive ou anexando aqui): o conversor ainda não reconhece nomes novos. Eu converto, registro e confiro no jogo |

O conversor:
- **Fundo magenta:** apaga sozinho o fundo magenta chapado.
- **Xadrez falso e fundo pintado:** recusa e avisa que é preciso gerar de novo.
- **Escala:** use a padrão. Não use mais o `-Escala 2.6667` que eu tinha indicado antes, que era para outro formato.

---

## 5. Etapa 0 · Reconverter (não gera nada)

Rode o conversor uma vez sobre a pasta dos originais que você já tem:

| Arquivos | Problema hoje |
|---|---|
| `lendarios/*__base` e `*__eclosao` | esmagados numa faixa |
| `reinos/*/*__tiles` e `*__fauna` | linhas fora da grade |
| `ui/` ícones de classes, elementos, linhagens e itens | achatados |

Só gere de novo o que continuar ruim depois de reconvertido.

---

## 6. O que o jogo já usa e o que eu ainda ligo

Cada bloco diz em "O jogo usa":
- **"sim":** entra no jogo assim que for convertido.
- **"ainda não":** o arquivo fica guardado, e eu ligo no código quando chegar, com prints para você conferir. É o caso de herói, ovos, baús, coletáveis, efeitos por elemento e por classe, ações dos monstros, ícones e relíquias.
