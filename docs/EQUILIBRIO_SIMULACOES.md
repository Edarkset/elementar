# Equilíbrio: testes por simulação

O bot do repositório (`testes/rodar_bot.js`) joga partidas inteiras sozinho, acelerado, com escolhas aleatórias e com semente (dá para repetir). Cada bateria abaixo tem 40 partidas, até 12 mapas.

```
node testes/rodar_bot.js --n 40 --paralelo 4 --mapas 12 --saida testes/res.json
python3 testes/resumo.py testes/res.json
```

## Resultados

| Bateria | Profundidade média | Diferença entre a melhor e a pior classe | Erros |
|---|---|---|---|
| Antes dos ajustes | 7,8 mapas | 2,8 mapas | 0 |
| Ajuste 1 (classes + itens + ritmo) | 7,9 mapas | 2,3 mapas | 0 |
| Ajuste 2 (classes refinadas, versão atual) | 8,6 mapas | 2,5 mapas | 0 |

**Antes:** guerreiro, guardião e místico chegavam a ~9,4 mapas; assassino só a 6,6; xamã 7,2; caçador e invocador ~7,5.

**Depois:** guerreiro 10,3 · assassino 9,5 · guardião 9,1 · invocador 8,9 · místico 8,8 · mago 8,6 · xamã 8,2 · caçador 7,8. Com 40 partidas a variação entre baterias é de ~1 mapa por classe, então diferenças menores que isso são ruído; o próximo passo seria rodar 200 partidas.

**Mortes:** concentradas nos mapas 8 a 11 (a curva de dificuldade está boa: quase ninguém morre nos 3 primeiros mapas e quase ninguém passa do 12).

**De onde vem o dano:** habilidades e reações elementais são a maior parte; o ataque básico é pouco. O especial combinado contribui pouco (recarga de 75 s).

## O que foi mudado

- **Força por classe** (`AJUSTE_CLASSE` em `js/jogo.js`): multiplicador de dano por classe para aproximar assassino, xamã, caçador e invocador das classes de frente.
- **Itens na hora certa:** cada item tem peso pelo quanto serve no momento (Pedra Ancestral perto de virar Adulto, Mel Ancestral perto de evoluir, Incenso com Selo vazio, Pena de Troca com reserva e troca em recarga). Item inútil quase não cai. O botão Bolsa brilha quando há item que vale usar agora.
- **Troca de monstros:** quem entra chega com um golpe em área do seu elemento ("Entrou em cena!"). No começo do mapa, o jogo avisa se há na reserva um monstro com vantagem de elemento ali (a troca é grátis nesse momento).
- **Menos interrupções:** eram ~12 telas de escolha por mapa (uma a cada ~12 s). Em nível ímpar sem carta especial (dourada, lendária, Elo, Talismã ou da Lenda), a melhor carta entra sozinha com um aviso na tela. Opção no menu de pausa para escolher sempre. Na prática corta ~15% das telas de nível, porque Talismãs e cartas douradas aparecem com frequência.
- **Aviso de filhote selvagem** só na primeira vez da partida.

## Propostas (ainda não feitas, precisam da sua decisão)

1. **Menos telas de nível de verdade:** juntar dois níveis numa carta só (cada carta vale 2 níveis) ou deixar Talismãs entrarem pela loja do Santuário em vez do level up. Corta pela metade as interrupções sem mudar a força.
2. **Mapa mais curto no começo:** 150 s em todo mapa; nos 3 primeiros (que quase ninguém perde) 110 s deixaria a partida mais rápida até a parte interessante.
3. **Especial combinado:** recarga de 75 s para 55 s, ou começar carregado em todo mapa. Hoje quase não aparece.
4. **Eventos no meio do mapa** (a cada ~40 s um acontecimento: chuva de meteoros, mercador, monstro raro fugindo, altar de troca de elemento) para quebrar a repetição.
5. **Reações elementais** são a maior fonte de dano: vale ensinar isso cedo (dica na primeira reação) porque é o que diferencia uma boa equipe.

## Testes de regressão feitos nesta rodada

- 160 partidas simuladas completas (4 baterias de 40): nenhum erro de página.
- Todas as 34 Lendas e os 13 deuses do Panteão, com poder no nível 5, 30 s de jogo cada: nenhum erro.
- Os 8 Dragões Ancestrais nas 4 formas (Filhote, Jovem, Adulto, Supremo): nenhum erro.
- Os 34 reinos, 50 s de mapa e 25 s de chefe cada: todas as artes carregam; um erro encontrado (título do baú atualizado depois de a tela fechar) e corrigido.
