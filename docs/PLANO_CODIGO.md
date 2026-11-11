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
- **Etapa 2 em diante: compilação pelo GitHub Actions.** A cada envio, o GitHub compila e publica. Exige uma mudança única em *Settings → Pages → Source: GitHub Actions*. O endereço do jogo não muda.

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

### Etapa 1. Módulos (ainda JavaScript, ainda sem compilação)

- Os 11 arquivos viram módulos ES com `import` e `export`. Acaba o escopo global de 667 nomes; cada arquivo declara do que depende.
- `07_cenario.js` (1.111 linhas), `09_criaturas.js` e `08_sistemas.js` são divididos por assunto.
- Formatador automático (Prettier) aplicado de uma vez, num commit só de formatação, para o histórico continuar legível.
- Estado em um lugar: `J` e `R` deixam de ser variáveis globais mutáveis e passam a ser acessados por funções tipadas.

### Etapa 2. TypeScript de verdade

- Arquivos renomeados para `.ts`, um módulo por vez, começando pelos que têm menos dependências (`01_nucleo`, `04_ambiente`, `05_arte`).
- Regras ligadas uma a uma, cada uma num commit que zera os erros daquela regra: `noImplicitAny` (3.629 pontos), depois `strictNullChecks` (2.248 pontos). Sem `any` para calar erro.
- Compilação com esbuild (uma dependência, rápida, saída em arquivos estáticos comuns) e publicação pelo Actions.

### Etapa 3. Dados e save

- `dados.js` vira JSON com esquema. O esquema gera os tipos e valida o conteúdo na verificação automática: monstro que cita classe inexistente ou reação sem par passa a ser erro antes de publicar.
- Save com versão e validação na leitura. Hoje o texto do `localStorage` entra direto em `R` e `META`; um save antigo ou corrompido pode quebrar o jogo. Com validação e migração por versão, save velho continua abrindo daqui a anos.

### Etapa 4. Desenho (aqui estão a performance e a qualidade gráfica)

- Uma interface `Desenho` separa a lógica de quem desenha. O Canvas 2D atual vira a primeira implementação.
- Segunda implementação em WebGL: sprites em lote, luz e brilho em shader. É o que permite mais inimigos, efeitos mais ricos e resolução cheia no celular ao mesmo tempo. Só vale depois da etapa 1, com o desenho já isolado.
- Partículas e projéteis em arranjos reutilizados (sem criar e descartar objetos a cada quadro), para tirar as pausas do coletor de lixo.

## Segurança

- A política de conteúdo (CSP) já impede script de fora e `eval`. Manter.
- `innerHTML` (18 pontos): hoje só recebe texto dos próprios arquivos do jogo. Com tipos, um auxiliar único monta o HTML e escapa qualquer valor que venha do save.
- Fontes carregadas do Google Fonts: hospedar junto com o jogo. Remove a única dependência externa em tempo de execução (privacidade, funcionamento offline e durabilidade).
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
