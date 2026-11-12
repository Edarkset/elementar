# Elementar

Jogo de ação no estilo *survivor* (inspirado em Vampire Survivors e Hades) com monstros mitológicos e os 8 elementos. Em vez de armas, você monta a build com uma **equipe de até 3 monstros** que evoluem durante a run (estilo Digimon/Pokémon), combinam poderes e disparam reações elementais.

> Projeto pessoal em fase de protótipo. Feito para jogar no navegador, inclusive no iPhone.

## Como jogar

- **Andar:** arraste o dedo na tela (ou W, A, S, D)
- **Esquiva:** botão, Shift ou toque duplo
- **Despertar Elemental:** botão ou espaço
- Os monstros atacam sozinhos; a cada nível você escolhe qual criatura e qual poder evoluir.

## Rodar no computador

O jogo carrega arquivos separados (dados, artes), então precisa de um servidor local; abrir o `index.html` com dois cliques não carrega as artes.

```bash
# na pasta do repositório (Windows, sem instalar nada)
powershell -ExecutionPolicy Bypass -File ferramentas\servidor.ps1
# ou, com Python: python3 -m http.server 8000
# depois abra http://localhost:8000
```

Ou use a extensão **Live Server** do VS Code.

## App, celular e Steam

Celular (instalar como app), versão de computador/Steam, modo moderador, resolução das artes e pendências de performance: veja [docs/APP.md](docs/APP.md).

## Estrutura

```
elementar/
├── index.html            # página do jogo (HUD e telas)
├── css/
│   ├── estilo.css        # visual da interface
│   └── fontes.css        # as duas fontes do jogo (Cinzel e Nunito), servidas junto com ele
├── fontes/               # arquivos das fontes e as licenças delas (SIL Open Font License)
├── src/                  # código-fonte em TypeScript (é aqui que se edita)
│   ├── tipos.d.ts        # formas centrais do jogo: run, mapa, Selo, inimigo, carta...
│   └── jogo/*.ts         # a lógica do jogo, um módulo por assunto (os mesmos nomes da lista abaixo)
├── js/
│   ├── dados.js          # conteúdo do jogo: elementos, reações, classes, linhagens,
│   │                     # 51 monstros, 8 ancestrais, 34 universos, poderes,
│   │                     # conquistas, 34 Lendas e Panteão (13 deuses)
│   ├── plataforma.js     # save e recursos do navegador ou do app de computador
│   ├── jogo/             # GERADO a partir de src/jogo/ (npm run compilar): é o que o navegador carrega
│   │   ├── principal.js      # entrada: puxa todas as partes na ordem dos nomes e, com ?teste, a ponte de teste
│   │   ├── ponte_teste.js    # publica os nomes do jogo na página para o robô e a verificação (só com ?teste ou ?moderador)
│   │   ├── 00_save.js          # save: versão, migração e conferência na leitura (não importa nada do jogo)
│   │   ├── 01_nucleo.js        # utilidades, som, save, estado da run, sinergias, Santuário
│   │   ├── 02_combate.js       # mapa, dificuldade (DIF), Presságio, dano, reações, ataques
│   │   ├── 03_progressao.js    # níveis, escolhas, ovos, Bestiário, baús, portais, especiais
│   │   ├── 04_ambiente.js      # o chão reage aos elementos (fogo, água, gelo...)
│   │   ├── 05_arte.js          # artes importadas: carregamento, recortes, animações
│   │   ├── 06_loop.js          # entrada (toque e teclado) e laço principal
│   │   ├── 07_cenario.js       # cenário vivo: vento, vegetação, objetos físicos, clima
│   │   ├── 07b_cenario_desenho.js · 07c_cenario_arte.js · 07d_estrutura.js (abismos, lagos, fauna, abertura)
│   │   ├── 08_horda.js         # diretor de horda
│   │   ├── 08b_efeitos.js … 08h_interface.js   # efeitos, eventos, poderes, conquistas, Lendas e Panteão, luz, interface
│   │   ├── 09_criaturas.js     # inimigos e mini-chefes
│   │   ├── 09b_chefes.js       # chefes: golpes, perigos anunciados, segunda fase
│   │   ├── 10_desenho.js       # desenho de cada quadro, herói e HUD
│   │   └── 11_menu.js          # menu, pausa e modo moderador; começa o jogo
│   └── app.js            # service worker, tela acesa e save persistente
├── testes/
│   ├── verificar.js      # verificação automática: telas, save, jogo, mecânicas e imagem
│   ├── save.js           # testes do save, sem navegador (usa os saves de verdade de testes/saves/)
│   ├── bot.js            # robô que joga sozinho (usado pelos testes e pelo equilíbrio)
│   ├── reproduzir.js     # prova de "mesmo comportamento": a mesma semente dá a mesma partida
│   └── rodar_bot.js      # várias partidas do robô em paralelo, com estatísticas
└── arte/
    ├── manifesto.json    # lista de artes: nome usado no código → arquivo
    ├── monstros/<elemento>/   # base, épico, lendário e quadros de animação
    ├── lendarios/        # dragões ancestrais (ovo → forma suprema)
    ├── reinos/<universo>/     # cenários, superfícies, marcos e objetos
    ├── itens/
    └── ui/               # tela inicial, logotipo, Talismãs e Insígnias
```

## Como adicionar ou trocar artes

1. Salve a imagem (PNG ou WebP) na pasta certa dentro de `arte/`.
2. Registre em `arte/manifesto.json`: a chave é o nome que o código procura (por exemplo `arte/monstros/fogo/kitsune__base.png`) e o valor é o caminho do arquivo.
3. Se a arte não existir, o jogo usa o desenho gerado por código no lugar, então nada quebra.

As artes atuais são WebP; as chaves terminam em `.png` porque é o nome que o código já usa.

### Trocar várias artes de uma vez (a partir dos PNGs originais)

```
powershell -ExecutionPolicy Bypass -File ferramentas\converter_artes.ps1 -Origem "C:\caminho\da\pasta\arte"
```

Abra http://localhost:8001 e espere aparecer "Pronto". O navegador reduz cada original **mantendo a proporção** (largura = a do arquivo atual vezes `-Escala`, padrão 2; nunca maior que o original), grava o WebP em `arte/` e atualiza o `manifesto.json`. Numa segunda conversão das mesmas artes use `-Escala 1`, senão a largura dobra de novo. Ele pula marcações (PNG pequeno com "substitua por esta arte"), cópias `(1)`, pastas `bkp` e as pastas `Itens` e `npcs` (mude com `-Pular`). Os efeitos viram tiras de quadros quadrados e o ambiente é recortado peça por peça. Use `-Apenas efeitos` para converter só uma pasta e `-Listar` para ver antes o que seria convertido.

O que precisa ser reconvertido ou gerado de novo está em [docs/ARTES_PARA_REFAZER.md](docs/ARTES_PARA_REFAZER.md).

### Conferir as artes novas antes de enviar

```bash
npm run artes -- --novas                            # só as artes novas ou alteradas: grade, recorte, transparência, manifesto
npm run artes                                       # todas (a verificação do GitHub roda esta)
```

Depois, com o servidor local aberto, veja em http://localhost:8000/ferramentas/galeria.html cada folha com a grade que o jogo usa, cada linha animada como no jogo e os avisos ao lado (filtre por caminho, por tipo ou só as que têm aviso).

- **Erro** (a verificação falha): arquivo fora do manifesto, manifesto apontando para arquivo que não existe, imagem que não abre, personagem sem transparência. O caso mais comum com gerador de imagem é o xadrez cinza e branco pintado no lugar da transparência.
- **Aviso** (o jogo usa, mas aparece com defeito): desenho encostando na borda da célula, que aparece como pedaço na pose vizinha; o pé mudando de altura entre os quadros de parado ou andando, e o personagem "pula"; células não quadradas; moldura.
- **Formato novo** (inimigos 8×9, folhas de ações, herói, ovos): o aviso diz o que o código ainda precisa ler. Esse ajuste é feito quando as folhas chegarem.

As especificações de cada folha estão em [docs/PEDIDO_SPRITES.md](docs/PEDIDO_SPRITES.md), e a tabela que a conferência e a galeria usam está em `ferramentas/artes_tipos.js`.

## Testes

Com o Node e o Playwright instalados:

```bash
node testes/verificar.js            # tudo (uns 20 minutos)
node testes/verificar.js --so telas # só uma parte: carga, telas, jogo, tela, mecanicas, visual
```

## Editar o código

O jogo é escrito em TypeScript, em `src/jogo/`. O navegador carrega `js/jogo/`, que é gerado a partir dele e fica gravado no repositório (assim o GitHub Pages publica sem etapa de compilação). Depois de mexer num `.ts`:

```bash
npm ci                                              # uma vez: instala TypeScript e Prettier (só ferramentas, o jogo não usa)
npm run tipos                                       # confere os tipos (não gera arquivos)
npm run compilar                                    # gera js/jogo/*.js a partir de src/jogo/*.ts
npm run formatar                                    # formata o código (npm run formato só confere)
npm run catraca                                     # pendências das regras rígidas: só podem diminuir (--gravar depois de reduzir)
npm run tipos_dados                                 # depois de mexer em js/dados.js: refaz o tipo do conteúdo (src/dados.d.ts)
npm run dados                                       # confere as referências do conteúdo (classe, universo, elemento... existem)
npm run save                                        # testes do save (saves antigos abrem; save estragado é corrigido)
npm run regressao                                   # as partidas de referência continuam iguais (testes/assinatura.json)
node ferramentas/reimportar.js                      # depois de mover uma função de arquivo: refaz os imports de todos os módulos
```

Grave o `.ts` e o `.js` gerado juntos. A verificação do GitHub recompila e falha se os dois não baterem.

### Rede de testes (rode antes de cada envio)

```bash
npm run testar                                      # tudo que não precisa de tela: conteúdo, tipos, catraca, formato, .ts = .js, save e regressão
node testes/verificar.js                            # no navegador: telas, saves estragados, 34 reinos, mecânicas e imagem (~15 min)
```

| O que pode quebrar | O que pega |
|---|---|
| Regra ou equilíbrio mudou sem querer | `npm run regressao`: 4 partidas do robô comparadas com `testes/assinatura.json` (abates, sorteios, tempo de chefe e nível por mapa, estado segundo a segundo). Uma mudança de 0,75% na vida dos inimigos já falha |
| Mudança de equilíbrio de propósito | `npm run regressao:gravar` no mesmo commit: a assinatura nova fica no histórico, junto com o porquê |
| Save velho ou estragado | `npm run save` (saves reais de cada versão em `testes/saves/`) e `verificar.js --so save` no navegador |
| Conteúdo citando o que não existe | `npm run dados` |
| Arte nova com grade errada, fundo pintado ou fora do manifesto | `npm run artes` (e a galeria, `ferramentas/galeria.html`) |
| Tipo errado, nulo novo | `npm run tipos` e `npm run catraca` |
| Tela quebrada, erro no console, pedido a servidor de fora | `verificar.js` (telas, jogo, imagem) |

A verificação do GitHub roda tudo isso a cada envio. O robô não escolhe Presságio nem joga com Lenda: mudança só nesses caminhos aparece nas mecânicas e telas, não na assinatura.

Prova de que uma mudança de estrutura não alterou o jogo:

```bash
node testes/reproduzir.js                           # cada semente roda duas vezes e tem de dar a mesma partida
node testes/reproduzir.js --gravar antes.json       # antes de reorganizar código
node testes/reproduzir.js --conferir antes.json     # depois: tudo igual = o jogo se comporta igual
```

A cada envio o GitHub roda as referências do conteúdo, tipos, a catraca, formato, a correspondência entre dados e tipo e entre `.ts` e `.js`, os testes do save, telas, saves estragados no navegador, mecânicas, os 34 reinos e a regressão do jogo contra as partidas de referência (`.github/workflows/verificar.yml`). O plano do código está em [docs/PLANO_CODIGO.md](docs/PLANO_CODIGO.md).

O resultado da verificação fica em `testes/relatorio.md` (com `--fotos`, as fotos ficam em `testes/fotos/`). A lógica são módulos: cada parte importa o que usa das outras e exporta o que oferece, e nada do jogo fica no escopo global. Para o robô, a verificação e o console do navegador enxergarem os nomes do jogo (`J`, `R`, `novaRun`...), abra com `?teste` ou `?moderador` no endereço.

### Simular partidas (equilíbrio)

O robô joga partidas inteiras sozinho e mede profundidade, tempo de chefe, dano por fonte e a horda (inimigos na tela, abates por minuto, níveis por mapa):

```bash
python3 -m http.server 8765 &
node testes/rodar_bot.js --n 24 --paralelo 4 --mapas 9 --saida testes/res.json
python3 testes/resumo.py testes/res.json
# testar outra intensidade de horda sem mexer no código:
node testes/rodar_bot.js --n 24 --saida testes/res2.json --dif '{"horda":2.4,"hordaVida":0.42,"hordaXp":0.42}'
```

A intensidade da horda fica em `DIF` (`js/jogo/02_combate.js`). Resultados e decisões: [docs/EQUILIBRIO_SIMULACOES.md](docs/EQUILIBRIO_SIMULACOES.md).

## Save

O progresso fica no navegador (`localStorage`, chave `elementar_proto_v2`; no computador, num arquivo). Cada endereço onde o jogo roda tem o seu próprio save.

O save é gravado com número de versão e conferido na leitura (`src/jogo/00_save.ts`): um campo estragado volta ao valor padrão, um monstro, Lenda ou talismã que o conteúdo não tem mais sai da lista, e uma run salva que não dá para continuar é descartada sem levar junto o progresso permanente. Sempre que algo é corrigido, o texto original fica guardado intacto na chave `elementar_proto_v2_recuperacao` (o primeiro e os dois mais recentes). Quando o formato mudar, suba `VERSAO_SAVE`, escreva a migração e grave um save novo em `testes/saves/`: os antigos continuam lá e precisam continuar abrindo.

## Licença

Todos os direitos reservados. Código e artes não podem ser reutilizados sem autorização.

As fontes em `fontes/` (Cinzel e Nunito) são de terceiros, sob a SIL Open Font License 1.1; as licenças estão junto dos arquivos.
