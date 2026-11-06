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
# na pasta do repositório
python3 -m http.server 8000
# depois abra http://localhost:8000
```

Ou use a extensão **Live Server** do VS Code.

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
│   └── jogo.js           # lógica: combate, evolução, mapas, chefes, física do ambiente,
│                         # efeitos, HUD e menus (dividida em seções "// =====")
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

## Save

O progresso fica no navegador (`localStorage`, chave `elementar_proto_v2`). Cada endereço onde o jogo roda tem o seu próprio save.

## Licença

Todos os direitos reservados. Código e artes não podem ser reutilizados sem autorização.
