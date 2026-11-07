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
│   └── estilo.css        # visual da interface
├── js/
│   ├── dados.js          # conteúdo do jogo: elementos, reações, classes, linhagens,
│   │                     # 51 monstros, 8 ancestrais, 34 universos, poderes,
│   │                     # conquistas, 34 Lendas e Panteão (13 deuses)
│   ├── plataforma.js     # save e recursos do navegador ou do app de computador
│   ├── jogo/             # lógica do jogo, em partes carregadas em ordem pelo index.html
│   │   ├── 01_nucleo.js      # utilidades, som, save, estado da run, sinergias, Santuário
│   │   ├── 02_combate.js     # mapa, dificuldade (DIF), Presságio, dano, reações, ataques
│   │   ├── 03_progressao.js  # níveis, escolhas, ovos, Bestiário, baús, portais, especiais
│   │   ├── 04_ambiente.js    # o chão reage aos elementos (fogo, água, gelo...)
│   │   ├── 05_arte.js        # artes importadas: carregamento, recortes, animações
│   │   ├── 06_loop.js        # entrada (toque e teclado) e laço principal
│   │   ├── 07_cenario.js     # cenário vivo, piso, abismos, pontes e lagos
│   │   ├── 08_sistemas.js    # horda, poderes, Talismãs, conquistas, Lendas, Panteão, luz
│   │   ├── 09_criaturas.js   # inimigos, mini-chefes e chefes
│   │   ├── 10_desenho.js     # desenho de cada quadro, herói e HUD
│   │   └── 11_menu.js        # menu, pausa e modo moderador; começa o jogo
│   └── app.js            # service worker, tela acesa e save persistente
├── testes/
│   ├── verificar.js      # verificação automática: telas, jogo, mecânicas e imagem
│   ├── bot.js            # robô que joga sozinho (usado pelos testes e pelo equilíbrio)
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

## Testes

Com o Node e o Playwright instalados:

```bash
node testes/verificar.js            # tudo (uns 20 minutos)
node testes/verificar.js --so telas # só uma parte: carga, telas, jogo, tela, mecanicas, visual
```

O resultado fica em `testes/relatorio.md` (com `--fotos`, as fotos ficam em `testes/fotos/`). O código usa o escopo global: uma parte de `js/jogo/` pode usar funções das outras, desde que o uso aconteça durante o jogo e não no carregamento da página.

## Save

O progresso fica no navegador (`localStorage`, chave `elementar_proto_v2`). Cada endereço onde o jogo roda tem o seu próprio save.

## Licença

Todos os direitos reservados. Código e artes não podem ser reutilizados sem autorização.
