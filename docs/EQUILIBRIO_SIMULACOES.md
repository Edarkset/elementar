# Equilíbrio: testes por simulação

## Rodada de 12/11/2026: horda gradual e as outras mecânicas

Comparações sempre com 28 a 32 partidas por versão, até o mapa 10. O robô agora mede a horda ao longo do mapa (inimigos na tela de 0 a 15 s, 15 a 30, 30 a 60, 60 a 90 e 90 em diante) e o momento do pico. Também dá para fixar a classe (`--classe`) e mudar dados de poderes (`--poderes`) por bateria.

### 1. Horda gradual

**O que estava errado:** a taxa de nascimento crescia sozinha com o tempo, sem limite, e o diretor só corrigia devagar. Resultado medido (31 partidas): a tela triplicava entre 15 e 30 s (mapa 3: de 11,3 para 35,6 inimigos) e havia picos de até 140 inimigos já no mapa 1.

**O que mudou:** cada mapa tem uma curva de inimigos na tela. Ela começa com poucos e cresce aos poucos até o pico perto do chefe (`alvoHorda` em `08_horda.ts`), e os nascimentos completam o que falta na tela para a curva. O diretor continua decidindo quanto (até +30% para quem domina, -20% e respiro para quem está mal). As ondas especiais passam a ser proporcionais à horda do momento e nunca aparecem nos primeiros 30 s.

| Versão | Mapa 3 na tela (0-15 · 15-30 · 30-60 · 60-90 s) | Tela vazia | Profundidade mediana | O que ensinou |
|---|---|---|---|---|
| antes | 11,3 · 35,6 · 42,8 · 60,6 | 6-10% | 5 | o salto do começo |
| 1 | 3,2 · 5,7 · 11,7 · 22,0 | 14-22% | 6 | contar os que estavam chegando esvaziava a tela (o robô foge, eles ficam fora dela) |
| 2 | 4,6 · 7,7 · 14,9 · 28,5 | 13-17% | 7,5 | a equipe forte mata mais rápido do que a reposição |
| 3 | 7,7 · 12,1 · 21,9 · 40,7 | 3-9% | 6 | forma certa; picos de até 240 depois das ondas |
| 4 | 6,7 · 10,7 · 19,2 · 35,7 | 5-9% | 7 | picos menores (118 a 192); ficou fácil |
| 5 | 6,6 · 10,8 · 19,8 · 35,0 | 5-9% | 7 | vida maior dos comuns não muda quem morre: 66% do dano recebido é de contato |
| **6 (adotada)** | 6,8 · 10,8 · 19,5 · 34,2 | 4-9% | **5** | dano dos comuns 1,4 (era 0,8), vida 0,9 (era 0,62), XP 0,8 (era 0,62): mesma dificuldade de antes |

**Resultado:** a tela cresce aos poucos em todo mapa (mapa 8: 12,0 · 16,4 · 24,1 · 40,8 · 44,5) e não há mais o salto dos 15-30 s. Os picos antes do chefe caíram de 140-322 para 122-199, a tela vazia ficou em 4-9% e o ritmo de níveis por mapa ficou o mesmo (mapa 2: 10,4; antes 10,1). A dificuldade também ficou a mesma: profundidade mediana de 5 mapas, com as mortes espalhadas do mapa 3 ao 10.


### 2. Classes (com a horda gradual)

Doze partidas por classe, até o mapa 8, todas com as mesmas sementes. Cada partida começa com um monstro da classe (`--classe`); o resto da equipe vem pelo jogo. Profundidade média: Invocador 6,75 · Guerreiro 6,08 · Guardião 5,67 · Mago 5,42 · Caçador 5,0 · Assassino 5,0 · Místico 5,0 · Xamã 4,58. Com 12 partidas, diferenças menores que cerca de 1 mapa são ruído; Invocador contra Xamã (2,2 mapas) não é.

**Caçador e Xamã:** testados com as mesmas sementes, o tiro do Caçador atravessando 2 inimigos (`cacadorPerfura`) e uma explosão de 14 px no tiro do totem (`totemArea`). O efeito ficou dentro do ruído: Caçador de 5,00 para 5,17 mapas (melhorou em 6 sementes e piorou em 4) e Xamã de 4,58 para 4,75 (melhorou em 5 e piorou em 4). **Não adotados.** Os dois têm dano por segundo parecido com o das outras classes no mapa 1 (cerca de 300) e morrem em mapas espalhados; o que os separa do Invocador é pequeno e não está no ataque básico. Os parâmetros ficam no código (com o valor de hoje) para uma próxima rodada.

**Místico:** o achado desta medição. Começando com ele, o chefe do mapa 1 leva 98,6 s (mediana; as outras classes, de 6 a 24 s), o dano por segundo é 102 (as outras, de 280 a 470) e a equipe sobe só 11,7 níveis no mapa 1 (as outras, de 15 a 21). O Raio Vital fere um inimigo só, com 6 de dano.

| Místico inicial (12 partidas, mesmas sementes) | Chefe do mapa 1 | Dano por segundo | Níveis no mapa 1 | Profundidade |
|---|---|---|---|---|
| hoje | 98,6 s | 102 | 11,7 | 5,00 |
| A: dano ×1,6 | 67,3 s | 135 | 13,2 | 5,50 |
| B: o raio salta para 2 inimigos próximos (60% do dano) | 84,3 s | 109 | 13,6 | 5,83 |
| **C (adotada): ×1,4 e 2 saltos** | **44,7 s** | **149** | **15,9** | 5,67 |

A C corta o primeiro chefe para menos da metade e aproxima os níveis do mapa 1 das outras classes. Ela não foi além porque o Místico já é a classe que mais aparece nas equipes que vão mais fundo (7,2 mapas com ele na equipe): um reforço maior criaria uma classe dominante no fim da run.

### 3. Progressão: os poderes acabam cedo

**O achado:** a primeira Ascensão aparece no mapa 1 ou 2 (mediana: mapa 2). Do mapa 3 em diante, 84% a 100% das escolhas de nível são Ascensão (+3% num atributo): os monstros já têm todos os poderes no 5 e quase não há decisão. Os Talismãs (que abrem Despertos e Uniões) apareciam em só 35% das subidas de nível, mesmo sem mais nada para subir.

**O que mudou:** quando nenhum monstro da equipe tem poder para subir, a carta de Talismã aparece em 85% das subidas de nível (`chance_carta_sem_poder` em `D.poderes`).

| 28 partidas, mesmas sementes | Ascensão nas escolhas (mapas 3 · 4 · 6) | Níveis de Talismã | Despertos | Profundidade (média · mediana) |
|---|---|---|---|---|
| antes (35%) | 84% · 89% · 93% | 6,1 | 2,57 | 5,68 · 5 |
| **85% quando não há poder para subir** | 73% · 78% · 85% | 9,3 | 3,04 | 6,21 · 6,5 |

O robô escolhe uma carta ao acaso, então pega o Talismã só 1 vez em 3 mesmo quando ele aparece. Para quem joga, o que conta é a oferta: depois que os poderes acabam, há uma escolha de verdade em 85% das subidas de nível, contra 35% antes. O jogo ficou um pouco mais fácil (+0,5 mapa, perto do ruído).

**O que ainda falta (decisão de design):** mesmo assim a Ascensão segue maioria, porque cada poder vai só até o nível 5 e a equipe chega lá em dois mapas. As saídas são mais níveis de poder (até 8, com ganho menor por nível), poderes novos no meio da run, ou subir de nível mais devagar.

## Rodada de 10/11/2026: intensidade da horda, efeitos e performance

Mais de 200 partidas simuladas nesta rodada. Tudo abaixo foi medido com o bot; onde o bot não serve de régua, está dito.

### 1. O que estava errado na medição

- **Dano por fonte:** `ferir()` não somava em `R.st.porFonte`; só o dano de efeito (reações, dano no tempo) era contado. O resumo dizia "reação 95%". Corrigido, a divisão real é: reações 31%, habilidades 28%, ataque básico 15%, Despertar 14%, especiais 8%, combinado 3%, ambiente 1%.
- **O jogo estava mais difícil do que este documento dizia.** A tabela abaixo ("Versão atual: 8,0 mapas") foi medida antes do ajuste "hordas começam pequenas, inimigos mais perigosos". No código que estava no repositório, 40 partidas dão **4,7 mapas** de média, com mortes do mapa 4 ao 8. Se a intenção era deixar mais difícil, funcionou; se a meta ainda é o bot chegar ao mapa 8, o jogo está ~3 mapas acima da meta.

O bot agora mede também, por mapa: inimigos na tela (média e pico), abates por minuto, níveis ganhos, tempo com a vida abaixo de 35% e tempo com a tela quase vazia (menos de 6 inimigos). `rodar_bot.js` grava a cada partida, então uma bateria interrompida não se perde.

### 2. Intensidade da horda

A intensidade virou parâmetro em `DIF` (`js/jogo/02_combate.js`): `horda` multiplica o alvo do diretor e os nascimentos; `hordaVida`, `hordaDano` e `hordaXp` ajustam cada inimigo comum. Assim dá para comparar "poucos e fortes" com "muitos e fracos" mantendo a mesma massa de vida e de experiência.

Varredura (mesmas sementes, até 8 mapas, código antes dos outros ajustes desta rodada):

| Horda | Partidas | Profundidade | Mortes até o mapa 3 | Inimigos na tela | Abates/min | Níveis por mapa | Tela vazia |
|---|---|---|---|---|---|---|---|
| 0,6× com inimigos 1,67× mais fortes | 20 | 4,8 ± 0,3 | 0 | 22 | 640 | 9,6 | 11% |
| 1,0× (como estava) | 23 | 4,8 ± 0,4 | 2 | 29 | 1.050 | 9,3 | 8% |
| **1,6× com inimigos a 62% de vida** | 20 | 5,6 ± 0,5 | 2 | 43 | 2.100 | 9,4 | 7% |
| 2,4× com inimigos a 42% de vida | 9 (interrompida) | 4,5 ± 1,1 | 2 | 47 | 1.770 | 9,0 | 6% |

Leitura:
- **De 1,0× para 1,6× os abates por minuto dobram** e o ritmo de níveis não muda. É a parte "gostosa" do gênero (muita coisa morrendo) sem mexer na progressão.
- **Acima de 1,6× não há ganho:** a 2,4× a equipe já mata no limite, os abates não sobem, a tela bate no teto de inimigos e aparecem mortes no primeiro mapa.
- **Abaixo (0,6×)** a tela fica vazia 11% do tempo e os abates caem 40%: joga-se mais tempo andando do que lutando.
- A profundidade não muda de forma mensurável entre as opções (as diferenças são menores que o erro). Ou seja: a intensidade muda a sensação, não a dificuldade, desde que a vida de cada inimigo acompanhe.

**Armadilha encontrada na validação.** Com a horda 1,6× já no mapa 1, quem começa com Caçador ou Xamã (ataque de alvo único: um tiro mata um inimigo, não importa quão fraco) não limpa a tela, não sobe de nível e cai no primeiro mapa: 3 de 24 partidas, que com a horda antiga iam ao mapa 4–6. Por isso a densidade **entra aos poucos** (`DIF.hordaRampa: 2`): mapa 1 igual ao de antes, metade no mapa 2, cheia do mapa 3 em diante, quando a equipe já tem habilidades em área.

**Valores adotados:** `horda 1.6, hordaVida 0.62, hordaDano 0.8, hordaXp 0.62, hordaMax 190, hordaRampa 2`. Moedas, Essência por abate, carga do Despertar e progresso do ovo ancestral acompanham `hordaXp`, para a economia não inflar com mais abates. O Presságio Enxame e a carta Fome do Enxame agora aumentam também o alvo do diretor (antes ele desfazia o efeito em poucos segundos).

Validação no código final (24 partidas cada, mesmas sementes, até 9 mapas):

| Configuração | Profundidade | Mortes até o mapa 3 | Inimigos na tela | Abates/min | Vida mínima nos mapas 4–6 |
|---|---|---|---|---|---|
| Controle: horda antiga (1,0×) | 4,6 ± 0,3 | 1 | 30 | 1.040 | 54% |
| 1,6× desde o mapa 1 | 4,4 ± 0,5 | 4 | 44 | 1.690 | 56% |
| 1,6× com rampa + Ascensão com caminho (+5% / +3% / +6%) | 6,3 ± 0,5 (9 das 24 chegaram ao limite da bateria) | 1 | 40 | 1.570 | 66% |
| **Adotada:** 1,6× com rampa + Ascensão reduzida (+3% / +2% / +4%), bateria até 12 mapas | 5,8 ± 0,6 | 1 | 40 | 1.880 | 68% |

- A densidade sozinha não muda a profundidade (4,4 contra 4,6, dentro do erro), mas sem rampa mata no começo.
- Com rampa, as mortes no começo voltam ao nível do controle. Nos mapas 4 a 7 a tela passa de 33–41 para 42–60 inimigos e os abates por minuto de 1.380–1.720 para 2.070–2.970.
- **A Ascensão com caminho deixou a run mais fácil do que estava**: com os primeiros valores o bot foi 1,7 ± 0,5 mapa mais fundo que o controle. Como a dificuldade tinha sido aumentada de propósito, os bônus foram reduzidos. **Mesmo assim a versão adotada fica ~1 mapa mais fácil que o controle** (1,0 ± 0,5 na comparação por semente): metade das partidas ainda cai nos mapas 4 a 6, mas um terço agora chega aos mapas 9 a 11. Para voltar exatamente à dificuldade anterior, baixar mais `ASCENSAO` (`js/jogo/03_progressao.js`) ou subir `DIF.vida`.
- **Caçador continua a pior classe inicial** (4,0 mapas nas duas versões, 6 partidas cada), enquanto as outras subiram. Ver proposta 6.

### 3. Escolhas de nível acabavam cedo (o maior achado para o "só mais uma")

Nas 40 partidas de base, a carta escolhida a cada nível:

| Nível da equipe | Escolhas que eram "Ascensão" (+1 nível genérico) |
|---|---|
| 20–29 | 11% |
| 30–39 | 62% |
| 40 em diante | ~90% |

A árvore tem ~13 melhorias por monstro; por volta do mapa 3 tudo está no máximo e o resto da run é a mesma carta. Agora a **Ascensão tem caminho**: Fúria (+5% de dano), Ímpeto (+3% de cadência) ou Vigor (+6% de vida), acumulando, e monstros diferentes oferecem caminhos diferentes na mesma tela. O texto antigo dizia "+6% em todos os atributos"; o código dá +3% (`DIF.nivelAtrib`), e o texto agora mostra o valor real.

### 4. Efeitos dos poderes (por código)

As habilidades usavam todas o mesmo anel, e os objetos no mapa eram quadradinhos. Em `js/jogo/08_sistemas.js`:

| Antes | Agora |
|---|---|
| Rajada do Mago: anel | explosão com núcleo, anel e raios; a Chuva vira meteoros que caem com marca no chão (0,18 s de aviso) |
| Muralha e Provocar do Guardião: anel | pilares do elemento subindo em roda; anéis fechando para o centro e cúpula no herói |
| Salto do Guerreiro e do Assassino: anel | rastro de luz até o alvo, rachadura no chão, cortes; Fúria com aura de brasas |
| Marca do Assassino: um pixel | mira que fecha e gira sobre o inimigo |
| Servos do Invocador: quadrado de 3 px | espíritos em forma de chama, com olhos, na ordem de profundidade |
| Armadilhas: quadrado de 3 px | mina com luz piscando ou rede, com explosão ao disparar |
| Portal, círculo do Mago, rastro, chuva: disco chapado | portal em espiral, círculo de runas girando, línguas de fogo, borda tracejada |
| Espírito do Xamã: quadrado | orbe com cauda; Canto com três ondas de som; cura com anel subindo e "+" |

Nada disso roda na simulação, e com o aparelho lento (`QUAL 0`) os enfeites extras são cortados. As folhas de arte de reação continuam sendo usadas quando existem.

### 5. Performance

Medido com perfil da CPU numa cena de mapa 6 com 200–250 inimigos.

- **Lógica: de ~3,0 ms para ~2,3 ms por quadro (−25%).** Um terço do tempo ia em interações de cenário feitas por inimigo, todo quadro. O solo natural de cada célula agora fica guardado por mapa; capim, borda de abismo e cristais são conferidos em quadros alternados (e nem isso quando não há abismo por perto); os servos guardam o alvo por 0,2 s; o HUD é atualizado 20 vezes por segundo em vez de 60.
- **Desenho na multidão: 850 → 535 cópias de imagem por quadro (−37%)** numa cena com 178 inimigos. Com mais de 110 inimigos vivos, cada inimigo comum é desenhado com uma imagem só (sem o quadro intermediário do passo e sem o véu escuro de 16%).
- **O que não deu para medir aqui:** o custo real de desenho no celular. O navegador de teste desenha sem placa de vídeo, então o tempo de cada cópia de tela cheia não vale como régua. O que sobra de custo é quase todo preenchimento de tela (piso, luz, vinheta, brilho), e isso só se mede no aparelho.

### 6. Tela de fim de run

Mostra agora de onde veio o dano (barras por fonte), a reação mais usada e uma dica do que mais machucou (horda encostando ou golpes e projéteis).

### 7. Limites do bot (para ler os números com cuidado)

- Ele foge de tudo que chega perto, inclusive do chefe. Com equipe de corpo a corpo o chefe fica fora de alcance e a luta se arrasta: 14% das lutas de chefe passam de 100 s e 7% passam de 150 s, e isso é em boa parte do bot, não necessariamente do jogo. Vale ensinar o bot a ficar no alcance da equipe antes de usar o tempo de chefe como medida.
- Ele escolhe cartas ao acaso. Uma pessoa escolhe melhor e desvia pior.
- Com 24 partidas o erro da profundidade é ~0,4 mapa; diferenças menores que 1 mapa são ruído.
- Nas baterias desta rodada a mesma semente dava o mesmo Pacto, o mesmo monstro inicial e o mesmo primeiro mapa, e depois divergia. As comparações "com as mesmas sementes" valem como amostras parecidas, não como repetição exata. Duas causas foram corrigidas no fim da rodada (o laço normal do jogo voltava a rodar junto com o bot a cada mapa novo, e a tela de portais esperava a arte em tempo real mesmo na simulação); agora a mesma semente repete de 2 a 4 mapas idênticos. Falta fechar o resto: os marcos e construções do cenário só existem depois que a arte carrega, então dependem da velocidade de carga.

### 8. Propostas que não dependem de arte nova

Por ordem do que mais deve pesar para a pessoa querer jogar de novo:

1. **Baú e prêmios do fim da run sem graça.** No mapa 6 o baú dourado entrega três vezes "+1 nível". Com tudo no máximo, o baú podia dar relíquia, Talismã, rerrolagem ou um caminho de Ascensão à escolha.
2. **Chefe sem horda.** Durante o chefe os nascimentos param: a luta fica parada e sem experiência. Ondas pequenas a cada 15–20 s manteriam cristais e abates.
3. **Equipe e sinergias são parede de texto** (pausa e "Equipe e reserva"). Retratos, barras de dano, cadência e vida, e os poderes em bolinhas resolveriam.
4. **Dano por monstro.** O resumo novo mostra dano por fonte; por monstro ("quem carregou a run") exige marcar o autor de cada golpe e é o próximo passo natural.
5. **Missões do dia de abates** (300, 500, 800) ficam mais fáceis com o dobro de abates a partir do mapa 3; subir para algo como 450, 750 e 1.200.
6. **Caçador e Xamã contra multidão.** São as classes que mais sofrem com horda densa. Perfuração de 2 no tiro básico do Caçador ou um totem com dano em área deixariam as duas menos dependentes de sorte no começo.
7. **Meta de dificuldade.** Decidir se o alvo é o bot morrer por volta do mapa 5 (como está) ou do mapa 8 (como este documento registrava). Para voltar ao mapa 8 basta baixar `DIF.dano` e `DIF.rampa`; a horda não precisa mudar.

---

## Rodadas anteriores

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

- **Força por classe** (`AJUSTE_CLASSE` em `js/jogo/01_nucleo.js`): multiplicador de dano por classe para aproximar assassino, xamã, caçador e invocador das classes de frente.
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
