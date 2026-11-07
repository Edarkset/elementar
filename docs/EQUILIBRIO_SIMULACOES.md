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
| Ajuste 2 (classes refinadas) | 8,6 mapas | 2,5 mapas | 0 |
| Versão atual (+ eventos, mapas curtos, telas de nível só em nível par, combinado 55 s) | 8,0 mapas | 2,5 mapas | 0 |

**Antes:** guerreiro, guardião e místico chegavam a ~9,4 mapas; assassino só a 6,6; xamã 7,2; caçador e invocador ~7,5.

**Depois:** guerreiro 10,3 · assassino 9,5 · guardião 9,1 · invocador 8,9 · místico 8,8 · mago 8,6 · xamã 8,2 · caçador 7,8. Com 40 partidas a variação entre baterias é de ~1 mapa por classe, então diferenças menores que isso são ruído; o próximo passo seria rodar 200 partidas.

**Versão atual:** místico 9,4 · mago 8,6 · guardião 8,3 · guerreiro 8,2 · invocador 8,1 · caçador 7,4 · assassino 7,2 · xamã 6,9. Telas de nível em nível ímpar: de ~1.200 para 0 nas 40 partidas (metade das interrupções de nível).

**Mortes:** concentradas nos mapas 8 a 11 (a curva de dificuldade está boa: quase ninguém morre nos 3 primeiros mapas e quase ninguém passa do 12).

**De onde vem o dano:** habilidades e reações elementais são a maior parte; o ataque básico é pouco. O especial combinado contribuía pouco com recarga de 75 s (agora 55 s).

## O que foi mudado

- **Força por classe** (`AJUSTE_CLASSE` em `js/jogo.js`): multiplicador de dano por classe para aproximar assassino, xamã, caçador e invocador das classes de frente.
- **Itens na hora certa:** cada item tem peso pelo quanto serve no momento (Pedra Ancestral perto de virar Adulto, Mel Ancestral perto de evoluir, Incenso com Selo vazio, Pena de Troca com reserva e troca em recarga). Item inútil quase não cai. O botão Bolsa brilha quando há item que vale usar agora.
- **Troca de monstros:** quem entra chega com um golpe em área do seu elemento ("Entrou em cena!"). No começo do mapa, o jogo avisa se há na reserva um monstro com vantagem de elemento ali (a troca é grátis nesse momento).
- **Menos interrupções:** eram ~12 telas de escolha por mapa (uma a cada ~12 s). Agora a tela de nível só abre em nível par; no ímpar a melhor carta (dourada primeiro) entra sozinha com um aviso na tela. Elo, Talismã e carta da Lenda não se perdem: voltam no nível par seguinte. Opção no menu de pausa para escolher sempre.
- **Mapas 1 a 3 mais curtos:** 110 s em vez de 150 s (quase ninguém perde neles); o mini-chefe aparece na metade.
- **Especial combinado:** recarga de 75 s para 55 s.
- **Eventos no meio do mapa** (a cada ~40 s, nunca o mesmo duas vezes seguidas, nem perto do chefe):
  - *Chuva de meteoros:* círculos anunciados no chão; as pedras ferem inimigos e o Invocador.
  - *Fugitivo dourado:* um inimigo dourado e rápido foge; derrotado, deixa um baú dourado; escapa em 18 s.
  - *Altar elemental:* ficar em cima carrega o Despertar.
  - *Chuva de cristais:* experiência espalhada pela tela.
- **Dica da primeira reação elemental** (uma vez por save), já que reações são a maior fonte de dano.
- **Aviso de filhote selvagem** só na primeira vez da partida.

## Testes de regressão feitos nesta rodada

- 200 partidas simuladas completas (5 baterias de 40): nenhum erro de página.
- Todas as 34 Lendas e os 13 deuses do Panteão, com poder no nível 5, 30 s de jogo cada: nenhum erro.
- Os 8 Dragões Ancestrais nas 4 formas (Filhote, Jovem, Adulto, Supremo): nenhum erro.
- Os 34 reinos, 50 s de mapa e 25 s de chefe cada: todas as artes carregam; um erro encontrado (título do baú atualizado depois de a tela fechar) e corrigido.
