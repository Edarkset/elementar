# Plano para o código: TypeScript sem transcrição cega

Escrito em 11/11/2026, a partir de medições feitas no próprio código. O objetivo é tipagem e segurança de verdade, mantendo o jogo publicado no GitHub Pages, sem perder performance nem qualidade gráfica.

## Onde o código está hoje (medido)

| Medida | Valor |
|---|---|
| Lógica (`js/jogo/`, 11 arquivos) | 4.750 linhas, 580 mil caracteres; 674 linhas passam de 200 caracteres |
| Declarações no escopo global compartilhado | 667 (funções, constantes e variáveis que qualquer arquivo pode ler e alterar) |
| Dados (`js/dados.js`) | 16.700 linhas de conteúdo dentro de um arquivo JavaScript |
| Verificador do TypeScript sobre o JavaScript atual, modo frouxo | 152 erros (126 são propriedades penduradas em objetos, como `canvas._src`) |
| Mesmo verificador, modo estrito | 6.488 erros: 2.248 de "pode ser nulo" (`R` e `J` começam nulos), 3.629 de parâmetro ou variável sem tipo |
| `innerHTML` | 18 pontos | 
| `catch` vazio | 18 pontos |
| `eval` | nenhum |
| Custo da lógica com 200–250 inimigos | ~2,3 ms por quadro |
| Publicação | GitHub Pages direto da pasta raiz do `main`, sem etapa de compilação |

Três conclusões saem daí:

1. **A linguagem não é o gargalo de performance.** A lógica custa pouco; o que pesa é desenho de tela cheia. TypeScript não deixa o jogo mais rápido nem mais bonito. Quem faz isso é o desenho (item 5).
2. **O risco real não é "ser JavaScript", é o estado sem forma.** `J` (o mapa) e `R` (a run) são sacolas com mais de cem campos criados em qualquer lugar; inimigo, projétil e zona são objetos soltos com campos opcionais. É aí que os tipos pegam erro de verdade.
3. **Renomear `.js` para `.ts` não resolve nada disso.** Daria 6.488 erros para calar com `any`, e o código continuaria igual.

## Decisão de linguagem

**TypeScript, em etapas.** Rust ou outra linguagem compilada para WebAssembly não compensa aqui: o desenho continua passando pelas mesmas chamadas do navegador, o ganho de velocidade seria numa parte que já é barata, e o custo seria reescrever tudo e perder a edição rápida.

## Como continuar no GitHub Pages

Arquivo `.ts` precisa ser compilado, e hoje o Pages serve os arquivos como estão. Há dois caminhos, e o plano usa os dois em sequência:

- **Etapas 0 e 1: sem compilação.** O verificador do TypeScript roda sobre o JavaScript (tipos em comentários JSDoc e um arquivo `tipos.d.ts`). O navegador continua carregando exatamente o que está no repositório. Nada muda no Pages.
- **Etapa 2 em diante: compilação local, saída gravada.** `npm run compilar` gera o JavaScript e ele é gravado junto com o TypeScript; o Pages continua servindo os arquivos como estão. (A ideia inicial era publicar pelo Actions, o que exigiria trocar uma opção em Settings → Pages; gravar a saída evita isso e mantém o código do jogo visível no GitHub.)

## Etapas

Cada etapa só é aceita se passar em três provas, que já existem no repositório:

- **mesmo comportamento:** o robô com sementes fixas dá partidas idênticas antes e depois (`node testes/reproduzir.js --gravar` e `--conferir`). Vale desde 11/11/2026: a mesma semente repete a partida inteira;
- **`testes/verificar.js`** com zero problemas (telas, 34 reinos, mecânicas);
- **performance:** custo da lógica por quadro e cópias de imagem por quadro iguais ou menores.

### Etapa 0. Rede de segurança (não muda o que roda) — feita em 11/11/2026

| Item | Situação |
|---|---|
| Verificador de tipos (`npm run tipos`), TypeScript fixo em 5.9.3, `package-lock.json` | Feito. O navegador carrega o mesmo JavaScript de antes. |
| `js/tipos.d.ts` com as formas centrais | Feito: `Run`, `Mapa` (139 campos), `Selo`, `Monstro`, `Meta`, `Sinergia`, `Inimigo`, `Projetil`, `Zona` (união por `tipo`), `Cria`, `Armadilha`, `Totem`, `Gema`, `Carta`, `CartaNivel`, `PecaCenario`, `Linha`, `Universo`. |
| 152 erros do modo frouxo | Zerados, sem `any`. O que ainda não tem forma descrita usa o tipo `AindaSemTipo`, que é contável: 52 usos hoje (`grep -o AindaSemTipo js/tipos.d.ts \| wc -l`). |
| Partida simulada reproduzível | Feito. A mesma semente dá a mesma partida, até a contagem de sorteios. Causas fechadas: o laço normal do jogo rodava junto com o robô; a tela de portais esperava a arte em tempo real; marcos e construções só existiam com a arte carregada (agora quem decide é a lista de artes); efeitos gastavam sorteios diferentes com e sem arte (o robô simula sem estado de arte). |
| Prova de "mesmo comportamento" | `testes/reproduzir.js`, com `--gravar` antes de uma mudança e `--conferir` depois. As correções de tipo desta etapa passaram: 6 partidas idênticas às gravadas antes. |
| Verificação a cada envio | `.github/workflows/verificar.yml`: tipos, arquivos, telas, mecânicas, 34 reinos e repetição de partidas. |
| 18 `catch` vazios | Todos passam por `relatar()`: erro de regra ou de save aparece como erro, recurso do navegador que faltou aparece como aviso, uma vez por lugar. |

No modo estrito, que é a meta da etapa 2, a contagem caiu de 6.488 para 4.751 erros (2.412 de "pode ser nulo", 1.665 de parâmetro sem tipo). Seis regras rígidas ficaram ligadas desde já no `tsconfig.json`, para o código não regredir nelas: `noImplicitThis`, `strictFunctionTypes`, `alwaysStrict`, `useUnknownInCatchVariables`, `noFallthroughCasesInSwitch` (já davam zero erros) e `noUnusedLocals` (quatro variáveis mortas removidas).

O que a tipagem já achou: duas fontes de dano que existiam no código e não estavam em lista nenhuma (`"reliquia"` e `"lenda"`); no resumo de fim de run elas apareciam com o nome interno.

Ficou para a etapa 1, de propósito:
- As marcas penduradas em imagens (`_src`, `_hi`, `_id`...) estão descritas num lugar só (`MarcasDeArte`), mas ainda são propriedades soltas. Virar um tipo `Sprite` próprio pede mexer em todo o desenho, e isso é mais seguro com módulos.
- `Inimigo`, `Selo` e `Carta` aceitam campos não listados (os de criatura e de animação são dezenas). Fechar essas formas é a maior parte dos 52 usos de `AindaSemTipo`.
- O conteúdo (`js/dados.js`) entra tipado numa fronteira única (`LINHAS`, `ANCESTRAIS`, `UNIV`), sem validação. A validação é a etapa 3.

### Etapa 1. Módulos (ainda JavaScript, ainda sem compilação) — em andamento

| Item | Situação |
|---|---|
| As 11 partes viram módulos com `import` e `export` | Feito em 11/11/2026. Eram 667 nomes num escopo global; agora nenhum nome do jogo é global (só `D`, o conteúdo, até a etapa 3). 692 declarações exportadas; cada arquivo lista o que importa. |
| Escrita entre módulos com nome | Feito. Um módulo lê as variáveis de outro direto, mas só o dono atribui: as 69 atribuições que cruzavam arquivos (em 11 variáveis) viraram `defJ`, `defR`, `defPausado`, `defFonte`... |
| Ordem de carga | Mantida. Cada parte importa primeiro a anterior, então a avaliação continua 01 → 11. A verificação de arquivos confere essa cadeia. |
| Ponte de teste | `js/jogo/ponte_teste.js`, carregada só com `?teste` ou `?moderador`: o robô e a verificação continuam usando os mesmos nomes. |
| Prova | 6 partidas idênticas às gravadas antes; telas, desenho, mecânicas e 34 reinos sem problemas; velocidade da lógica igual (0,83 contra 0,82 ms por passo). |
| Formatador automático (Prettier 3.10.0 fixo), num commit só de formatação | Feito. `npm run formatar` aplica, `npm run formato` confere (também a cada envio). A lógica passou de 4.964 linhas densas para 22.700 linhas, uma instrução por linha; as 6 partidas continuaram idênticas. O commit está em `.git-blame-ignore-revs`, para o histórico de autoria pular a formatação. |
| Dividir `07_cenario.js`, `08_sistemas.js` e `09_criaturas.js` por assunto | Feito. Viraram 14 módulos (cenário vivo, desenho do cenário, arte de cenário, estrutura do mapa; horda, efeitos, eventos, poderes, conquistas, lendas, luz, interface; criaturas, chefes). São 22 módulos ao todo, nenhum acima de 2.400 linhas. `ferramentas/reimportar.js` refaz os imports de todos pelo que o verificador acusa: mover uma função é recortar, colar e rodar o script. |

Como a conversão foi feita: um programa usou o compilador do TypeScript para resolver cada nome (quem declara, quem lê, quem escreve), em vez de procurar texto. Por isso nenhum import ficou faltando nem sobrando, e nomes iguais em escopos diferentes não se confundiram.

Falta nesta etapa: estado em um lugar. `J` e `R` ainda são variáveis exportadas que qualquer módulo altera por dentro (`J.vida -= dano`); só a troca do objeto inteiro passou a ter nome (`defJ`, `defR`). Fechar isso é mais natural na etapa 2, com os tipos estritos dizendo quem mexe em quê.

Versão de computador (`desktop/`, Electron 33) testada em 12/11/2026 sob tela virtual: carrega a entrada como módulo, usa a camada de plataforma do computador (com o acesso nativo ao save), abre o menu e o Pacto e começa uma partida no mapa 1, sem nenhum erro; nenhum nome do jogo fica no escopo global.

### Etapa 2. TypeScript de verdade — em andamento

| Item | Situação |
|---|---|
| Fonte em `.ts` | Feito em 12/11/2026, os 24 arquivos de uma vez (com a prova de repetição não havia razão para ir um por um). A fonte fica em `src/jogo/`; `src/tipos.d.ts` descreve as formas. |
| Como a conversão foi feita | Pelo compilador, não à mão. As 54 anotações JSDoc viraram sintaxe TypeScript (24 casts, 20 tipos de variável, 14 de parâmetro, 1 de retorno). Renomear sem mais nada dava 497 erros: 351 chamadas que não preenchem todos os parâmetros (o JavaScript completa com `undefined`; o TypeScript exige declarar), resolvidas marcando 45 parâmetros como opcionais; e 44 de formas não descritas, resolvidas descrevendo as formas (`Simulacao`, `PropCena`, `ParticulaAr`, `OpcoesCartas`), não com `any`. |
| Publicação | **Mudou o plano**: em vez de publicar pelo Actions (que exigiria trocar uma opção em Settings → Pages), o JavaScript gerado fica gravado em `js/jogo/`. O GitHub Pages serve o mesmo de antes, sem mudar configuração, e o código do jogo continua visível no GitHub. A verificação recompila e falha se `js/jogo/` não corresponder a `src/jogo/`. Se um dia valer publicar pelo Actions, basta parar de gravar `js/jogo/` e trocar a opção. |
| Compilação | `ferramentas/compilar.js` com o próprio TypeScript (`transpileModule`): só tira os tipos, arquivo por arquivo; mesmas funções, mesma ordem, mesmos comentários. Sem esbuild: uma dependência a menos, e não há junção de arquivos a fazer. |
| Prova | As 6 partidas idênticas às gravadas antes; zero erros de tipo; telas, mecânicas e 34 reinos sem problemas. |
| `noImplicitAny` | 1.934 → 247 pendências. Feito em camadas, cada uma provada com o JavaScript gerado idêntico: tipos deduzidos pelo uso (só os de boa qualidade), tipos por nome com o compilador como juiz, formas das listas do mapa e do cenário, funções centrais tipadas à mão (`emArea`, `ferir`, `maisProximo`...), tabelas do código como `Record`, chaves de poder e itens como tipos fechados, e o conteúdo do jogo tipado a partir dos próprios dados (`src/dados.d.ts`, gerado por `ferramentas/tipos_dados.js`). Uma auditoria achou e corrigiu tipos deduzidos errados que passavam porque a função do outro lado ainda não tinha tipo. O que sobra é cauda longa: parâmetros com dados de golpes e conquistas, variáveis que começam vazias e tabelas pequenas. |
| `strictNullChecks` | 3.814 → 1.232 pendências. 2.361 vinham dos 78 contextos de desenho (`getContext("2d")`), marcados como existentes. O cenário (`J.cena`) era o maior bloco: 26 funções que só rodam com o mapa montado passaram a receber o cenário como parâmetro (`C: Cena`), dado por quem já conferiu que ele existe (codemod pelo compilador; partidas de referência idênticas, 34 reinos e telas sem problema). |
| Catraca | `ferramentas/catraca.js` na verificação a cada envio: as duas regras já valem para código novo (um envio que aumente as pendências falha) e a contagem só desce. Quando chegar a zero, a regra vai para o `tsconfig.json`. |
| Validação final (12/11/2026) | Contra a versão de antes de toda a reorganização (commit `d6681d3`, ainda um arquivo só): 14 partidas idênticas (8 sementes novas em 6 mapas e as 6 antigas em 4 mapas). Comparando o JavaScript de antes da conversão com o atual sem formatação nem comentários, sobram 77 linhas: parênteses das anotações antigas (nada muda), `e.ehProp === true` em 7 lugares (equivalente: `ehProp` só recebe `true`, num lugar só) e `String(n.v)` (equivalente: o valor só vai para `fillText`/`strokeText`, que já convertiam). Verificação completa sem problemas (telas, mecânicas, 34 reinos, 34/34 chefes). Sem rede, depois da primeira visita, o jogo abre como antes (o `sw.js` guarda os 23 módulos; as duas falhas de rede, fonte do Google e lista de artes, já aconteciam antes). Computador: partida completa no Electron até a tela de fim, sem erros. |
| Auditoria: nada se perdeu (12/11/2026) | Declaração por declaração (745 funções e variáveis do jogo), o último commit do trabalho de jogo e visual (`d6681d3`, antes de toda a reorganização) contra hoje, sem formatação nem comentários: nenhuma sumiu (só a diretiva `"use strict"`, que módulo já aplica). As 148 que mudaram são formatação, escrita pelo módulo dono (`defJ`...), erro relatado onde antes era `catch` vazio, o save conferido e um ganho de propósito (o resumo de fim de run passou a nomear o dano de Relíquias e da Lenda). Conteúdo, estilo e artes intactos. Além disso, 14 partidas idênticas às daquela versão. Um ramo de outra sessão (`lucid-shannon`, 08 e 09/11) tinha 5 commits nunca mesclados: as correções da auditoria por capturas (memória ao trocar de mapa, que deixava a tela preta no iPhone; estátua com o desenho por baixo; herói com contorno de luz; pisos claros um pouco mais escuros; combo menor; recorte da versão grande) e o pacote de prompts de arte (`docs/PACOTE_*`, `AUDITORIA_CAPTURAS.md`, `PEDIDO_SPRITES.md`). Foram trazidos para o TypeScript, com as mesmas partidas provando que o jogo não mudou. O outro ramo antigo (`graphics-map-assets`, 06/11) já tinha sido refeito no `main`. |
| Regressão | `testes/assinatura.json` (4 sementes, 4 mapas, navegador fixo) conferida a cada envio (`npm run regressao`). Mudança de 0,75% na vida dos inimigos já falha; mudança de propósito regrava a assinatura no mesmo commit (`npm run regressao:gravar`). `npm run testar` roda toda a rede sem navegador de uma vez. |
| Achados no jogo durante a tipagem | `emArea` também atinge objetos do cenário, não só inimigos (agora `Alvo`); o "elemento" às vezes vale `"gelo"`, `"explosao"` ou `"multi"`; Lendas e deuses do Panteão são tratados como uma coisa só, com campos de um lado só; artes podem virar canvas, que não tem `src`. Nenhum era defeito visível, mas todos estavam escondidos. |

O caminho para as duas regras: começar pelos parâmetros das funções mais chamadas (que espalham tipo para o resto pela inferência) e, para os nulos, separar o código que só roda durante o jogo (onde `J` sempre existe) do que roda no menu, em vez de encher o código de `J!`.

### Etapa 3. Dados e save — em andamento

| Item | Situação |
|---|---|
| Tipo do conteúdo | Feito: `src/dados.d.ts` é gerado do próprio `js/dados.js` (`npm run tipos_dados`); a verificação falha se os dois não baterem. O `dados.js` continua sendo o arquivo editado (virar JSON puro não traria ganho que o tipo gerado já não dê). |
| Referências do conteúdo | Feito em 12/11/2026: `ferramentas/validar_dados.js` (`npm run dados`) confere que classe, linhagem, universo, era e elemento citados existem, que cada reação liga dois elementos diferentes sem par repetido, que elos ligam monstros que existem, que conquistas dão talismãs que existem, e que nenhum id se repete (Lendas e deuses juntos: a run guarda só o id e o jogo procura primeiro nas Lendas). O conteúdo atual passa sem nenhum problema; erros plantados de propósito são pegos. |
| Save com versão | Feito em 12/11/2026: `src/jogo/00_save.ts`, sem importar nada do jogo e sem sortear nada. O save passa a ser gravado com `v: 1`; save sem versão é a versão 0, que tem o mesmo formato. Na leitura, cada campo do progresso é conferido: tipo errado volta ao padrão, id que o conteúdo não tem mais sai da lista (monstros incluem os Dragões Ancestrais), campos que esta versão não conhece ficam (um save mais novo não perde nada). A run salva ou abre como foi salva ou é descartada inteira, com o progresso permanente mantido. O texto original de todo save corrigido fica guardado intacto (`elementar_proto_v2_recuperacao`: o primeiro e os dois mais recentes). Se a run salva passar na conferência e mesmo assim não abrir, o jogador volta ao menu com o progresso, em vez de travar. |
| Prova do save | `testes/save.js` (28 testes, no Node) com saves de verdade gravados pelo jogo antes e depois da mudança (`testes/saves/`), que precisam abrir sem nenhuma correção para sempre. No navegador (`verificar.js --so save`), 7 saves velhos, estragados ou mexidos abrem menu, Pacto, Bestiário, conquistas, missões, Santuário e Panteão sem erro. Comparado com a versão anterior: um monstro desconhecido na coleção travava o Pacto, uma lista de Lendas com tipo errado travava as Lendas, e um save corrompido era sobrescrito e perdido; agora os três abrem e o original fica guardado. |
| Achado | A primeira versão da conferência só conhecia as linhas de monstros e teria descartado uma run com Dragão Ancestral na equipe; o teste no navegador pegou antes de publicar. Hoje o jogo e o teste montam o catálogo pela mesma função (`catalogoDe`). |

### Etapa 4. Desenho (aqui estão a performance e a qualidade gráfica)

- Uma interface `Desenho` separa a lógica de quem desenha. O Canvas 2D atual vira a primeira implementação.
- Segunda implementação em WebGL: sprites em lote, luz e brilho em shader. É o que permite mais inimigos, efeitos mais ricos e resolução cheia no celular ao mesmo tempo. Só vale depois da etapa 1, com o desenho já isolado.
- Partículas e projéteis em arranjos reutilizados (sem criar e descartar objetos a cada quadro), para tirar as pausas do coletor de lixo.

## Segurança

- A política de conteúdo (CSP) já impede script de fora e `eval`. Manter.
- `innerHTML` (18 pontos): hoje só recebe texto dos próprios arquivos do jogo. Com tipos, um auxiliar único monta o HTML e escapa qualquer valor que venha do save.
- Fontes: feito em 12/11/2026. Cinzel e Nunito ficam em `fontes/` (115 KB, licença OFL junto) com as mesmas regras que o Google Fonts entregava; o texto sai idêntico pixel a pixel (menu, Pacto, conquistas e Santuário comparados). A política de conteúdo agora só permite fonte e estilo do próprio jogo, e a verificação acusa qualquer pedido a servidor de fora: o jogo não depende de terceiros para rodar.
- Dependências de compilação fixadas em versão exata e conferidas pelo arquivo de trava.

## Durabilidade

- O que é publicado continua sendo arquivo estático comum, sem framework. Abre em qualquer navegador moderno e em qualquer hospedagem.
- Duas dependências de desenvolvimento no total (TypeScript e esbuild), nenhuma em tempo de execução.
- O caminho do computador e Steam (`desktop/`) continua igual: ele empacota os mesmos arquivos.

## O que não fazer

- Converter tudo de uma vez.
- Usar `any` ou `@ts-ignore` para fechar a contagem de erros.
- Trocar de motor ou de framework antes de os módulos existirem.
- Misturar mudança de equilíbrio com mudança de estrutura no mesmo commit: a prova de "mesmo comportamento" deixa de valer.
