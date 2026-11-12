# Mapa do código

Este documento mostra onde cada coisa do jogo mora e como as partes conversam. Ele serve para entrar no código sem precisar ler 23 mil linhas.

## Como o jogo começa

```
index.html
├── js/plataforma.js       save e recursos do aparelho: localStorage no navegador, arquivo no computador/Steam
├── js/dados.js            todo o conteúdo: elementos, monstros, mapas, chefes, Lendas, conquistas (const D)
├── js/jogo/principal.js   entrada da lógica: puxa os módulos na ordem 00 → 11
└── js/app.js              service worker (jogo sem internet), tela acesa
```

O código que se edita fica em `src/jogo/*.ts`. O `js/jogo/*.js` é gerado por `npm run compilar` e fica gravado no repositório, para o GitHub Pages publicar sem uma etapa de compilação. Cada módulo importa primeiro o anterior. Por isso a avaliação segue a ordem dos nomes dos arquivos, e o `11_menu` termina abrindo o menu.

## Os módulos

| Módulo | O que tem |
|---|---|
| `00_save` | save: versão, migração e conferência na leitura (não importa nada do jogo) |
| `01_nucleo` | utilidades, som, leitura e gravação do save, sprites procedurais, estado da run (`R`, `J`, `META`), sinergias, Santuário |
| `02_combate` | começo do mapa (`iniciarMapa`), dificuldade (`DIF`), Presságio, dano (`ferir`), reações, mortes, ataques da equipe |
| `03_progressao` | níveis e cartas, Ascensão, ovos, Bestiário, captura, baús, chefe vencido, portais, fim de run e resumo |
| `04_ambiente` | o chão reage aos elementos (fogo queima, água molha, gelo congela) |
| `05_arte` | artes importadas: manifesto, carregamento sob demanda, recortes, animações; memória solta ao trocar de mapa |
| `06_loop` | entrada (toque e teclado) e laço principal: `passo` → `tick` → `atualizar` |
| `07_cenario` | cenário vivo: vento, vegetação, objetos físicos, destroços, clima |
| `07b`, `07c`, `07d` | desenho do cenário, arte de cenário importada, estrutura do mapa (abismos, lagos, construções, fauna, abertura) |
| `08_horda` | diretor de horda: ritmo, ondas, ameaça |
| `08b_efeitos` | efeitos visuais dos poderes, projéteis, reações e combinados |
| `08c` a `08h` | eventos no meio do mapa, árvore de poderes, conquistas, Lendas e Panteão, luz, arte da interface |
| `08i` | relatório da partida: as medidas do robô registradas no jogo de verdade, copiadas na tela de fim |
| `08j` | Poder do Elemento: o poder da equipe que abre quando um monstro chega à forma Suprema |
| `09_criaturas` | inimigos comuns e mini-chefes: corpo, passo, golpe, derrota e desenho |
| `09b_chefes` | chefes: inteligência, escolha do golpe, perigos anunciados, segunda fase |
| `09c_golpes` | **um golpe por função** (leque, espiral, chuva, investida...) e a tabela `GOLPES` |
| `10_desenho` | desenho de cada quadro (`desenhar`), herói e HUD |
| `11_menu` | menu, Aliança (no código ainda `pacto`: `R.pacto`, `telaPacto`), pausa, modo moderador |

## Um quadro do jogo

`passo`, chamado pelo navegador a cada quadro, mede o tempo. Fora da pausa e das cenas de cinema, ele chama `tick`, que aplica a pausa de impacto e a câmera lenta e chama `atualizar`. Depois o próprio `passo` chama `desenhar`. O `atualizar` é um índice de passos, na ordem:

```
passoAbertura     (só enquanto a cena de abertura do mapa roda)
passoRelogios     agenda de golpes marcados, recargas, combo, Despertar
passoMovimento    herói e esquiva
passoFormacao     a equipe segue atrás do herói
passoSurgimentos  inimigos, ovos e filhotes que surgem com o tempo
passoInimigos     movimento, golpes, status e mortes
passoProjeteis    da equipe e dos inimigos
passoCriasZonas   crias, totens, armadilhas e zonas
passoOvosSelvagens
passoCristais     cristais de experiência e o ímã
passoParticulas   partículas, números de dano e textos
passoVidaZerada   Koschei, Lenda, Ankh, Segunda Chance ou o fim da run
hud()
```

Um passo que encerra o mapa no meio do quadro devolve `false`, e o resto do quadro não roda.

## Onde o estado mora

| Nome | O que é | Vida |
|---|---|---|
| `D` | o conteúdo (`js/dados.js`), tipado por `src/dados.d.ts` | fixo |
| `META` | progresso permanente: coleção, Essência, conquistas, Bestiário | gravado no save |
| `R` | a run: Pacto, equipe (`R.selos`), mapa atual, relíquias | gravada no save a cada mapa |
| `J` | o mapa em andamento: inimigos, projéteis, cenário (`J.cena`), relógio | some ao trocar de mapa |
| `SIN` | sinergias da equipe, recalculadas quando a equipe muda | derivado |

Só o módulo dono pode trocar o valor de uma variável exportada. Os outros chamam a função de escrita dele, por exemplo `defJ`, `defR`, `defPausado` e `defRunSalva` (em `01_nucleo`). Mexer dentro do objeto (`J.t += dt`) vale em qualquer lugar.

## Receitas

- **Golpe novo de chefe:** escreva `golpeNome(e, g, P, cor, el, C)` em `09c_golpes.ts`, devolvendo o tempo que o chefe fica ocupado, e acrescente `nome: golpeNome` na tabela `GOLPES`. O golpe entra nos dados como `{ "tipo": "nome", ... }`.
- **Monstro, mapa, Lenda ou conquista:** edite `js/dados.js` e rode `npm run tipos_dados` (refaz o tipo) e `npm run dados` (confere se tudo que a entrada cita existe).
- **Mover uma função de módulo:** recorte, cole e rode `node ferramentas/reimportar.js`. Os imports de todos os módulos e a lista do service worker ficam certos.
- **Mudança de equilíbrio:** depois de mexer, rode `npm run regressao:gravar` e grave a assinatura nova no mesmo commit, explicando o porquê.
- **Antes de enviar:** `npm run testar` (cerca de 1 minuto). Para mudanças que aparecem na tela, rode também `node testes/verificar.js`.

O plano do código e o histórico das decisões ficam em [PLANO_CODIGO.md](PLANO_CODIGO.md). A rede de testes está descrita no [README](../README.md#rede-de-testes-rode-antes-de-cada-envio).
