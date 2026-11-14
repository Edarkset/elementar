# Elementar · pacote de prompts (v3)

É o **pacote v2 que você já usa**, com as mesmas pastas, os mesmos nomes de arquivo e as mesmas grades, que casam com os seus modelos de nome e com o importador. Cada um dos 2.211 prompts ganhou as travas desta revisão, e entraram 28 prompts novos de raridade.

**Um arquivo = uma imagem.** O nome do arquivo diz o que salvar e o que anexar:

`001 - P2 - salvar como curupira__anim_3__epico - anexar curupira__anim_3 e curupira__epico.txt`

---

## Passo a passo

1. **Abra uma conversa nova no gerador** para cada monstro ou cada reino. Nunca dois monstros diferentes na mesma conversa. Com 8 janelas, cada janela é uma conversa separada.
2. **Abra o arquivo `.txt`**, selecione tudo e cole no gerador.
3. **Anexe na mesma mensagem a imagem (ou as duas imagens) que o nome do arquivo pede**, usando o PNG original, nunca o `.webp` da pasta do jogo.
4. **Gere.**
5. **Confira:** dois cliques em **`CONFERIR_ARTES.html`** (aqui nesta pasta) e arraste a imagem. Ela diz:
   - 🟢 **Pode salvar.**
   - 🟡 **Confira:** marca o quadro suspeito.
   - 🔴 **Refazer:** traz a frase de correção pronta para colar no gerador.
6. **Salve com o nome do "salvar como"** (ou use os seus modelos de nome). Com o nome certo, a página reconhece a grade sozinha.
7. **Mande para mim:** pode ser o volume do importador ou os PNG. Eu converto, coloco no jogo e confiro.

---

## Ordem

- **`1_corrigir`:** primeiro o que tem P1.
- **`2_novas`:** herói, ovos, baús, coletáveis e efeitos (P1); depois o resto.
  - **Raridades:** na pasta de cada monstro em `2_novas/M3_raridades/`, se houver um arquivo **`000 - P1 - COMECE AQUI`**, faça ele antes. É a imagem fixa nova daquele tema de raridade, e ela vira o **segundo anexo** das animações dele.
- **`3_complementares`:** Adultos e Supremos primeiro (P1), um elemento por vez.

Cada pasta tem um índice (`1_corrigir.md`, `2_novas.md`, `3_complementares.md`) com a lista, a grade e o anexo de cada arquivo. `MANIFESTO.csv` tem tudo numa tabela.

---

## O que mudou em cada prompt (as travas)

- **Contra mistura:** o prompt começa com "imagem nova; o ÚNICO assunto é este; a ÚNICA referência é o anexo desta mensagem" e termina com uma conferência que o gerador faz antes de entregar.
- **Tamanho:** o v2 pedia tamanhos como 1024 × 384, que o gerador não faz. Agora o prompt diz para usar a tela que o gerador tiver (1536 × 1024) e **dividir a imagem inteira** na grade pedida (8 × 3, 8 × 5…). Eu ajusto o tamanho ao converter.
- **Fundo:** transparente de verdade, ou magenta chapado (#FF00FF), que o conversor apaga. Para personagem rosa ou roxo, só transparente, porque o magenta apagaria pedaços dele.
- **Raridades (Épico e Lendário):** cada uma é uma **condição especial do ambiente** (estação, cor da chama, degelo, mineral, luz pura ou caída, temperatura), e o prompt conta a condição ao gerador. São dois anexos:
  1. a base da forma, para as poses;
  2. a imagem fixa daquela raridade, para as cores.

  O prompt diz em qual quadro da imagem fixa está a forma, e que, se ela e o texto discordarem, vale a imagem. Os temas estão em `ferramentas/raridades_arte.js`, e as pranchas atuais em `raridades/`.
- **Ponte:** **só deitada**, nas duas linhas (a de baixo é a mesma ponte desgastada). O v2 pedia uma linha em pé, e cada conversa entendia de um jeito. O jogo gira a ponte quando precisa.
- **Auditoria das telas:**
  - Supremos com silhueta mais imponente;
  - contorno de luz nos monstros escuros;
  - núcleo forte nos etéreos.
- **O que não pode sair:** grade desenhada, texto, chão, sombra, xadrez falso, personagem a mais, cortes e mudança de cor entre quadros.

---

## Pastas desta entrega

| Pasta ou arquivo | Para quê |
|---|---|
| `1_corrigir/`, `2_novas/`, `3_complementares/` | os prompts, um por imagem |
| `CONFERIR_ARTES.html` | a página de conferência (abre com dois cliques, até sem internet); também em [Conferência de Artes](https://claude.ai/artifact/4tU9w9bqG11R4iCJ9o8486) |
| `moldes/` | figuras de "como deve ficar" de cada tipo de folha |
| `raridades/` | Comum, Épico e Lendário atuais de cada monstro, lado a lado |
| `MANIFESTO.csv` | todos os prompts numa tabela |
