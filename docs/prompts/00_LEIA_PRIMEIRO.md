# Elementar · pacote de prompts de arte (v5)

Este pacote substitui os anteriores. Cada prompt sai **completo**: tamanho da imagem, grade, o que vai em cada quadro, a descrição do personagem e as travas (o que não pode sair). Não tem campo para preencher à mão.

Os prompts são gerados a partir dos dados do próprio jogo (`node ferramentas/gerar_prompts.js`). Se um nome, visual ou golpe mudar no jogo, eu gero de novo e o pacote acompanha.

## O jeito rápido (resumo de uma tela)

1. **Uma conversa por forma de monstro** (ou por folha de reino). Pode deixar 8 janelas abertas ao mesmo tempo, desde que cada janela seja uma conversa diferente.
2. Cole o bloco inteiro e **anexe o PNG de referência na mesma mensagem**.
3. **Solte a imagem gerada na [Conferência de Artes](https://claude.ai/artifact/4tU9w9bqG11R4iCJ9o8486).** Em segundos ela diz "Pode salvar", "Confira" ou "Refazer", marca o quadro com problema e dá a frase de correção pronta para copiar.
4. Salvou com o nome do pacote, a página reconhece o formato sozinha.

---

## Para não misturar imagens (o gerador "lembra" da imagem anterior)

O gerador usa tudo o que já apareceu na conversa. Por isso uma folha nova às vezes sai com um quadro, uma cor ou um efeito da anterior. Cada prompt já começa com uma trava ("NEW, SEPARATE IMAGE … the ONLY subject is …") e termina com uma conferência ("BEFORE YOU FINISH, CHECK …"). Mas a trava mais forte é o jeito de trabalhar:

| Regra | Por quê |
|---|---|
| **Uma conversa = uma forma de monstro.** A base, o Épico, o Lendário e as Ações da mesma forma podem ficar na mesma conversa | são o mesmo personagem: se o gerador "lembrar" da folha anterior, lembra do personagem certo |
| **Nunca dois monstros diferentes na mesma conversa** | é aí que um monstro vaza para a folha do outro |
| **8 janelas = 8 conversas diferentes**, uma forma em cada | as janelas não se misturam entre si |
| **Anexe a referência na mesma mensagem do prompt** | o prompt diz "a única referência é a imagem desta mensagem"; anexo de mensagem antiga confunde |
| **Errou duas vezes a mesma coisa? Conversa nova** | o gerador "vicia" no erro |
| **Reinos: uma conversa por reino** (inimigos, chefe e cenário do mesmo reino juntos) | o cenário de um reino não vaza para outro |

A [Conferência de Artes](https://claude.ai/artifact/4tU9w9bqG11R4iCJ9o8486) procura mistura de três jeitos:
- **Quadro com cores diferentes:** um quadro com cores muito diferentes dos outros do mesmo personagem é o sinal clássico de pose vinda de outra folha.
- **Dois desenhos no mesmo quadro.**
- **Comparação com a referência:** com o botão "Comparar com a referência", ela confere se a folha inteira tem as cores do personagem certo.

---

## Épico e Lendário: a condição especial do ambiente

A raridade não é só outra cor. **O monstro é Épico ou Lendário porque nasceu numa condição rara daquele ambiente**, como os shiny:
- **Natureza:** estações e floradas.
- **Fogo:** a cor real da chama.
- **Água e gelo:** degelo, aurora e as cores reais da espécie (carpa koi, tartaruga, axolote).
- **Terra e pedra:** barro, sal, e a escada do mineral (pedra, ouro, diamante).
- **Ar:** a hora do céu.
- **Raio:** raios reais.
- **Luz:** o Lendário é o mais puro e o Épico é o caído ou corrompido.
- **Sombra:** a temperatura, mais gelado ou mais infernal.

Regras:
- **Épico** é uma variação rara mas plausível. **Lendário** é o fenômeno mais raro ou extremo.
- Cada monstro tem os dois temas com a condição escrita (`ferramentas/raridades_arte.js`), e **o prompt conta a condição ao gerador** ("WHY THIS VARIANT EXISTS…"). Assim ele muda o que a condição mudaria de verdade (geada, gelo pingando, brasa nas rachaduras), e não só a cor.
- **Tema mantido:** as cores vêm da imagem fixa que já está no jogo, como segundo anexo.
- **Tema novo** (25 temas, em 17 monstros): o arquivo do monstro começa com **"Comece por aqui"**, a imagem fixa nova daquela raridade. Gere, confira, me mande, e só depois faça as animações dela, com essa imagem nova como segundo anexo.
- **Para mudar uma decisão,** use a [página de raridades](https://claude.ai/artifact/NqXWqdfxZyBt7tqhMhzT5X) e cole aqui o que ela copiar.
- **Temas rosa, roxo ou lilás** exigem transparência de verdade, nunca fundo magenta.
- **Na página de conferência,** compare uma variante com a imagem fixa **da mesma raridade**.
- A pasta `raridades/` tem as pranchas com as imagens **atuais** (antes dos temas novos), lado a lado.

---

## Molde: como cada folha deve ficar

Cada bloco tem o link "Molde (como deve ficar)", uma figura com:
- a grade;
- o que vai em cada linha;
- a linha dos pés (tracejada);
- a seta mostrando que o personagem olha para a direita.

Todos os moldes estão em `moldes/`, e a página de conferência mostra o molde ao lado da sua imagem.

**Cenário, que era o que mais confundia:**
- **Ponte:** **deitada**, atravessando o quadro inteiro da esquerda para a direita, vista de frente: tabuleiro em cima, arcos embaixo, pontas cortadas retas nas bordas. O jogo repete a ponte de lado para alongar e gira sozinho quando ela é vertical. Ponte em pé ou vista de cima está errada.
- **Paredão:** a linha de cima tem 4 pedaços de paredão. A linha de baixo tem os mesmos 4 pedaços **com uma cachoeira** (água, lava, lama, luz ou sombra, conforme o reino). Os pedaços emendam lado a lado.
- **Praça e lago:** redondos, vistos de cima.
- **Construção, marcos e objetos:** de pé, de frente em 3/4, com a base na mesma linha.

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

O mais rápido: solte a imagem na [Conferência de Artes](https://claude.ai/artifact/4tU9w9bqG11R4iCJ9o8486). Ela confere tudo isto sozinha. A página também está no repositório, em `ferramentas/conferir_artes.html`, e abre direto no navegador. Para conferir à mão, abra a imagem num visualizador que mostre transparência:

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
