# Análise de equilíbrio do Elementar

Data: 05/11/2026. Feita só lendo os dados (`dados/fonte_*.py`), o código (`js/jogo.js`) e os resultados de simulação já gravados (`docs/sim_resultados.json`, 94 partidas). Nesta máquina não há Python, então **nenhuma simulação nova foi rodada**. Os números marcados com "≈" são contas feitas à mão a partir do código; servem para apontar a direção e precisam ser confirmados no simulador (seção 4).

---

## Resumo em 6 pontos

1. **O jogo está fácil demais para o simulador enxergar diferenças.** 61 de 64 partidas vencem os 6 mapas, a taxa de derrota é 2% e o chefe morre em 13–27 s a partir do mapa 2. Quase todo elemento e toda classe aparecem com "6 mapas vencidos", então o simulador hoje não consegue dizer o que está forte ou fraco.
2. **Muito texto promete mecânica que o código não faz.** 16 das 26 relíquias viram só "+10% de dano". Várias reações (Podridão, Supernova, Chama Negra, Magnetismo…) e quase todos os bônus de 3 da mesma linhagem ou classe são só multiplicadores. Isso é o maior problema: o jogador escolhe pelo texto e recebe outra coisa.
3. **Reações: Fogo e Raio têm muito mais reações de dano que Água e Natureza.** 6 dos 28 pares de elementos não causam dano nenhum (só controle). Num Pacto Duplo, 1 em cada 5 combinações cai num par desses.
4. **Sinergias: Invocador ×3 e Místico ×3 são as melhores, e Caçador e Invocador ganham bônus em dobro** (multiplicador + projétil ou servo extra). Equipe de elemento puro nunca vale a pena: ganha o mesmo poder de uma equipe aleatória e perde todas as reações.
5. **Árvore: alguns modificadores e ramos ganham de longe.** Colapso (Mago) cobre 15× mais área que Chuva; o ramo Solitário dá o melhor atributo e aparece em 79% das evoluções; Aliança não dá atributo nenhum.
6. **Método proposto:** criar uma bateria de "resistência" (jogar até morrer), registrar as escolhas do bot (que já escolhe ao acaso, o que vale como teste A/B de graça) e ajustar em ciclos curtos até cada elemento, classe e opção ficar dentro de ±5% da média.

---

## 1. O que já existe e o que ele mostra

| Fonte | O que diz |
|---|---|
| `docs/RELATORIO_EQUILIBRIO.md` | Modelo de papel (sem jogar): 29/29 testes passam. Poder por classe com razão 1,29 (Guerreiro 127 × Xamã 98). Linhagem pura é o melhor arquétipo (566) e elemento puro empata com equipe aleatória (479). |
| `docs/RELATORIO_SIMULACAO.md` | 64 partidas do bot: 5,84 mapas de 6, derrota 2%, chefe do mapa 2 morre em 13 s. |
| `testes/baseline_sim.json` | Bateria rápida (7 partidas, 4 mapas): 0% de derrota, todos os elementos e classes com nota 4 de 4. Não discrimina nada. |
| `docs/sim_resultados.json` | Resultados brutos. Não tem a divisão de dano por fonte (`porFonte`), que o código atual já registra. Foi gravado antes da árvore de poderes, então é uma foto antiga. |

### Um número que ainda dá para tirar dos dados antigos

Cada mapa tem tempo fixo (chefe aparece aos 150 s), então 6 mapas = 900 s fixos. **O que passa de 900 s é quase todo o tempo gasto matando chefes.** Isso é contínuo e serve como medida de força enquanto a taxa de vitória está travada no teto:

| Elemento no Pacto | Tempo além dos 900 s | | Classe inicial | Tempo além dos 900 s |
|---|---|---|---|---|
| Fogo | 206 s (mais forte) | | Invocador | 178 s |
| Sombra | 218 s | | Guardião | 185 s |
| Raio | 226 s | | Assassino | 206 s |
| Natureza | 233 s | | Mago | 231 s |
| Água | 239 s | | Xamã | 280 s |
| Ar | 245 s | | Caçador | 283 s |
| Luz | 253 s | | Místico | 315 s (mais fraco) |
| Terra | 262 s (mais fraco) | | (Guerreiro: só 1 partida) | |

Ter um **Assassino** na equipe final corta o tempo de chefe em ≈23% (194 s contra 252 s); ter um **Místico** aumenta ≈16%. As amostras são pequenas (6 a 19 partidas por grupo), então tratar como pista, não como prova.

Estratégias do bot (mesmas sementes): `carregar` (pôr todo nível num Selo só) é a pior, +107 s. `sem_trocas` é um pouco melhor que trocar por raridade (−33 s): o bônus de raridade (+4% a +22%) não compensa trocar de monstro.

---

## 2. Diagnóstico

### 2.1 Dificuldade: o teto esconde tudo

- Derrota em 2% das partidas, quase sempre no mapa 1.
- Tempo para matar o chefe: 72 s no mapa 1 (o chefe tem 45% da vida), depois **13, 17, 18, 20 e 27 s**. O comentário no código diz que a vida do chefe subiu para a luta "durar o bastante para mostrar golpes e segunda fase"; com 13–27 s isso não acontece.
- A equipe cresce mais rápido que os inimigos: vida dos inimigos ×1,5 por mapa, mas o nível da equipe vai de 14 para 45, cada nível dá +3% de atributo, cada evolução multiplica por 1,6 e ainda há poderes, Talismãs, Despertos e relíquias.

**Consequência:** enquanto o jogo for fácil assim, qualquer desequilíbrio (inclusive os dos itens abaixo) fica invisível nas taxas de vitória. Corrigir a dificuldade vem antes de ajustar o resto.

### 2.2 Elementos e reações

Como a reação funciona no código (`reagirEfeito`): o dano base da reação é `p = dano do golpe × 2,2 × bônus de reação`. Cada tipo usa `p` de um jeito. Num grupo típico de ≈4 inimigos encostados:

| Tipo | Reações | Valor ≈ (em múltiplos de p) |
|---|---|---|
| explosão / dano em área | Magma, Tornado de Fogo, Sobrecarga, Supernova, Cristalizar | ≈5 p (atinge todo mundo perto) |
| cadeia | Eletrocutar, Tempestade, Seiva Elétrica | até 3,5 p |
| puxar | Abismo, Magnetismo | ≈3 p, e ainda junta o grupo |
| propagar | Incêndio | ≈2,4 p e espalha o status (gera mais reações) |
| dano no tempo | Chama Negra, Esporos, **Podridão** | 1,5 p num alvo só |
| dano verdadeiro | Eclipse | 1,8 p num alvo só |
| dano em elite | Sepultar, Julgamento | 1 p (2,5 p em elite e chefe) |
| empurrar + vulnerável | Vendaval Sombrio | 0 p, mas +20% de dano recebido no grupo por 3 s |
| cadência | Arco-íris | 0 p, mas +30% de cadência na equipe por 4 s (quase sempre ativo) |
| cura / escudo | Florescer, Fotossíntese / Aurora | 0 p; cura 4% da vida por reação / escudo de 8% |
| só controle | **Vapor, Lama, Tempestade de Areia, Nevasca, Raízes, Pulso Fantasma** | 0 p |

Somando o valor de dano das 7 reações de cada elemento:

| Elemento | Dano de reação somado ≈ | Perfil |
|---|---|---|
| Fogo | 24 | 4 explosões + Incêndio. O mais forte. |
| Raio | 20 | 3 cadeias + Sobrecarga + Magnetismo. |
| Luz | 15 | 2 explosões, Arco-íris, Julgamento, Eclipse. |
| Terra | 14 | 2 explosões, mas 3 pares sem dano. |
| Ar | 12 | 2 pares sem dano. |
| Sombra | 11 | Muitos efeitos fracos num alvo só; sem identidade clara. |
| Natureza | 9 | Compensa com cura. |
| Água | 9 | 3 pares sem dano; compensa com cura e Arco-íris. |

**O que isso quer dizer:**
- **Dominantes:** pares com explosão (Fogo + Raio/Terra/Ar/Luz) e as cadeias do Raio. Bate com o simulador antigo, onde Fogo foi o mais rápido.
- **Inúteis para dano:** Vapor, Lama, Tempestade de Areia, Nevasca, Raízes e Pulso Fantasma. Com derrota em 2%, o controle quase não tem valor, então esses pares só atrapalham. Em Pacto Duplo, 6 de 28 combinações (21%) têm uma reação sem dano.
- **Fortes demais na defesa:** Florescer e Fotossíntese curam 4% da vida a **cada** reação, sem limite por segundo. Com centenas de reações por partida, a equipe fica quase imortal. Arco-íris fica ativo quase o tempo todo.
- **Texto que o código não faz:**
  - Podridão diz "dano em % da vida máxima", mas é um dano no tempo comum (não escala contra chefe).
  - Supernova diz "dano dobrado em Sombra e Mortos-vivos": não existe.
  - Chama Negra diz "impede regeneração de chefes": não existe.
  - Magnetismo diz "atrai cristais de XP": não existe.
  - Tempestade de Areia diz "dano leve": não causa dano.
  - Esporos diz "se espalha" e Cristalizar diz "estilhaça ao morrer": viram dano no tempo e explosão comuns.
- Os efeitos de dano no tempo **substituem** o anterior em vez de somar, então reagir de novo não acumula.

### 2.3 Sinergias de equipe

Poder de cada bônus de classe (raiz de dano × vida efetiva, o mesmo critério de `RELATORIO_EQUILIBRIO.md`):

| Classe | 2 iguais | 3 iguais | Observação |
|---|---|---|---|
| Místico | **1,15** | **1,34** | Melhor bônus de 2 e empatado no melhor de 3 |
| Invocador | 1,10 | **1,34** | Dano 1,50 **e** vida 1,20: sem custo nenhum |
| Xamã | 1,10 | 1,30 | |
| Guardião | 1,10 | 1,22 | |
| Caçador | 1,09 | 1,18 | mais **+1 projétil** (2) e perfuração (3) de verdade no código |
| Mago | 1,09 | 1,17 | O único que paga um custo (−15% de vida) |
| Guerreiro | 1,08 | 1,16 | |
| Assassino | 1,07 | 1,15 | O mais fraco no papel |

- **Bônus em dobro:** com 2 Caçadores o código dá +18% de dano **e** +1 projétil no básico (isso dobra o dano do básico). Com 2 Invocadores, +15% de dano **e** 3 servos em vez de 2 (+50%). O modelo de papel não vê isso, então Caçador e Invocador em grupo são bem mais fortes no jogo do que na tabela.
- **Textos de nível 3 que não existem no código:** Execução do Assassino (matar comuns abaixo de 15%), eco das magias do Mago, ressurreição do Místico, "anda 10% mais devagar" do Guardião. Na linhagem, nenhum dos efeitos especiais existe (Mortos-vivos reviverem, Exército dos Mortos, Caçada, Colosso, Revoada, Sopro Ancestral, Abominação): só os multiplicadores +8% e +20%.
- **Linhagem pura é o melhor arquétipo** (566 contra ≈480 dos outros, +18%), porque o bônus de 3 da linhagem (+20% em dano e vida) se soma sem tirar nada: dá para misturar elementos e classes.
- **Elemento puro nunca vale a pena:** o bônus de 3 do mesmo elemento (+32% de dano, +5% de vida) é parecido com o de linhagem, mas a equipe **perde todas as reações**, que no jogo valem bem mais que os +8% por par do modelo.
- **Trindade** (frente + dano + suporte, +15% e +15%) está num bom tamanho: dá motivo para montar a equipe sem obrigar.
- **Pacto Duplo** (+15% de dano) contra **Triplo** (mais pares de reação): no simulador antigo os dois ficaram parecidos (Triplo 22 s mais rápido, só 7 partidas). Por enquanto parece equilibrado.

### 2.4 Relíquias

Em `relMods()`, só 10 relíquias têm efeito próprio. **Qualquer outra cai no `else` e vira "+10% de dano".**

| Relíquia | Promete | Faz no código | Avaliação |
|---|---|---|---|
| Flor do Vale | Regeneração constante | 1% da vida por segundo | **Forte demais:** é um Cálice da Vida nível 5 inteiro, de graça |
| Máscara de Oni | +25% de dano, −10% de defesa | +25% de dano, **sem a perda** | **Forte demais** |
| Ankh | Revive uma vez | Revive com 50% | Forte, e está certa |
| Pêssego da Imortalidade | +20% de vida | +20% | Ok |
| Cristal de Oricalco | +20% de dano de reação | +20% | Ok |
| Pedra do Sol | Habilidades recarregam 15% mais rápido | +15% na cadência do **ataque básico** | Efeito errado |
| Caldeirão da Abundância | Cura total ao trocar de mapa | Igual | Ok, mas fraca: o Santuário já cura a cada Era |
| Quipu, Fio de Ariadne, Tapete Voador | +XP, ímã, velocidade | Igual | Fracas (conforto, não poder) |
| Núcleos dos Reinos | Conta como +1 monstro do elemento | Igual | Fortes: transformam 2 iguais em bônus de 3 (+12% → +32% de dano) |
| **16 outras:** Tabuletas do Destino, Taça de Jamshid, Hidromel, Espada na Pedra, Ovo de Koschei, Muiraquitã, Bola de Borracha Sagrada, Anzol Mágico, Astrolábio, Mapa do Tesouro, Concha das Marés, Estaca de Freixo, Para-raios, Espelho Mágico, Ídolo Dourado, Bússola Enlouquecida | Efeitos variados | **Todas viram +10% de dano** | Texto falso. O Ídolo Dourado devia ter custo (+15% de dano recebido) e não tem. |

O bot põe "Relíquia" em 3º lugar na escolha de portal, então as relíquias entram muito nas partidas simuladas.

### 2.5 Árvore de poderes (básico, habilidades, modificadores, ramos, Talismãs, Despertos)

**Básico contra habilidades.** Do nível 1 ao 5, o básico ganha +60% de dano e +20% de cadência (≈×1,9). Cada habilidade ganha ×2 de dano e −24% de recarga (≈×2,6). Subir habilidades rende mais por ponto, e é o que o bot já faz (h1 e h2 até o nível 3 primeiro).

**Modificadores com vencedor claro:**

| Classe e poder | Opção A | Opção B | Quem ganha |
|---|---|---|---|
| Mago, Rajada | Chuva: 5 impactos ×1,6 em raio 18 | Colapso: 1 impacto ×5 em raio 70 | **Colapso**, com folga (cobre ≈15× mais área) |
| Guardião, Muralha | Fortaleza: congela 2,5 s | Contra-ataque: explosão extra ×4 | **Contra-ataque** |
| Caçador, Armadilha | Rede: ×3 e enraíza | Mina: ×6 | **Mina** |
| Invocador, Portal | Portal duplo: 2 portais ×0,6 por 5 s | Fusão: servo gigante ×4 por 9 s | Fusão, provavelmente |
| Guerreiro, Fúria | Sede de Sangue: cura 2%/s | Imparável: promete imunidade a lentidão, **mas o código dá +50% de dano** | Imparável, e com texto errado |
| Místico, Renascer | Fênix | Vínculo | **Nenhum dos dois faz nada**: o poder só arma o Renascer |

**Ramos do Adulto:**

| Ramo | Bônus | Aparece em | Avaliação |
|---|---|---|---|
| Solitário | +12% de dano e +12% de vida | 79% das evoluções | **O melhor e o mais fácil.** Vira a escolha automática. |
| Afinidade | +10% de dano, reação ×1,25 | 21% | Bom, mas pede um aliado do mesmo elemento, o que tira um par de reação |
| Regional | +8% de dano, +4% de vida, reação ×1,10, troca de elemento | 9% | Pior que Solitário e o mais raro: não paga o trabalho |
| Aliança | nada; vira classe dupla | 16% | Só vale se completar uma sinergia ou a Trindade |

**Talismãs (nível 5):**
- **Fortes:** Lente (+35% de raio = ≈+80% de área, e vale também para as reações em área), Coração (+30% de dano), Ampulheta (−20% de recarga, inclusive no básico, o que dá ≈+25% em tudo), Espelho (+2 projéteis: triplica o básico do Caçador).
- **Fracos:** Trevo (+15% de chance de crítico ≈ +12% de dano, menos da metade do Coração), Coroa (+25% de XP), Âmbar (ímã), Pena (velocidade), Máscara de Pedra (risco pequeno, prêmio pequeno), Fio (só totens e zonas).

**Despertos e Uniões:**
- Despertos sem dano nenhum: Coletores (Invocador, básico: só puxa cristais; o texto diz que os servos "explodem ao cair") e Jardim Sagrado (Místico, h1: só deixa lento; o texto diz "enraíza").
- A União **Legião das Sombras** não tem efeito no código (só o ×1,15 de força).

### 2.6 Classes

- No modelo, o poder individual vai de 98 (Xamã) a 127 (Guerreiro): razão 1,29, dentro do limite de 1,35 do teste, mas no limite.
- No simulador, **Místico, Caçador e Xamã** começam devagar (280–315 s de chefe) e **Invocador e Guardião** rápido (≈180 s). O suporte sozinho já ganha ×2 de dano ("Proteção do Pacto"), mas parece não bastar.
- Assassino é o mais fraco no papel e o que mais acelera chefes no jogo: o Salto mira o inimigo mais forte e o crítico é garantido. O modelo de papel subestima o Assassino contra chefe.

---

## 3. Método para chegar ao ponto ideal

### 3.1 Metas que dá para medir

| Meta | Faixa ideal | Hoje |
|---|---|---|
| Vitória numa run padrão (6 mapas), bot "equilibrado" | 55–70% (jogador humano médio fica um pouco abaixo) | ≈98% |
| Derrota no mapa 1 | ≤ 5% | 2% (ok) |
| Tempo para matar o chefe do mapa | 40–70 s (Guardião da Era: 60–90 s) | 13–27 s |
| Diferença entre elementos (profundidade média na bateria de resistência) | cada um a ±5% da média | não dá para medir hoje (teto) |
| Diferença entre classes iniciais | cada uma a ±7% da média | Místico ≈ +34% de tempo de chefe sobre a média (315 s contra 235 s) |
| Arquétipos de equipe (classe pura, linhagem pura, elemento puro, reações, Trindade, aleatória) | o melhor no máximo 10% acima do pior | linhagem pura 18% acima no modelo |
| Cada opção de escolha (ramo, modificador, especial, relíquia, Talismã) | efeito na profundidade dentro de ±5% da média do seu grupo | Colapso, Solitário, Flor do Vale e Máscara de Oni fora |
| Divisão do dano por fonte | básico 25–40%, habilidades 25–40%, reações 15–25%, especiais e combinados ≤ 15% | não medido (o código já registra em `R.st.porFonte`) |
| Vida mínima da equipe por mapa | 25–50% em média (há perigo de verdade) | vida termina os mapas em 74–99% |

### 3.2 Como medir com o simulador

1. **Bateria de resistência (nova):** usar `maxMapas: 99` e deixar jogar até morrer. A medida principal passa a ser a **profundidade alcançada** (mapas vencidos), que não tem teto. Hoje a bateria para em 6 mapas e quase todo mundo chega lá.
2. **Registrar as escolhas do bot.** O bot já escolhe ramo, modificador e especial **ao acaso** (`bot.js`, linhas 36–38). Isso é um teste A/B de graça: basta guardar em `R.st` qual opção foi pega (ramo, modificador, especial, relíquias, Talismãs) e comparar a profundidade média de quem pegou cada uma.
3. **Guardar `porFonte`, `ttkChefe` e a vida mínima por mapa** no resultado (o código já calcula a maior parte).
4. **Tamanho da amostra:** a profundidade varia algo como ±1,5 mapa entre partidas. Para enxergar uma diferença de 0,5 mapa, são precisas ≈35 partidas por grupo. Com 8 elementos × 35 ≈ 280 partidas por bateria de elemento; os grupos se sobrepõem (cada partida tem 2–3 elementos, 3 classes, várias escolhas), então ≈300–400 partidas cobrem tudo.
5. **Mesmas sementes antes e depois** de cada mudança, para comparar mudança por mudança sem ruído.

### 3.3 Ciclo de ajuste

1. Rodar a bateria de resistência e gerar a tabela de metas (3.1).
2. Listar o que está fora da faixa e ordenar pelo tamanho do desvio.
3. Mudar **no máximo 3 números**, só os maiores desvios, com passo de até 15% por vez.
4. Rodar de novo com as mesmas sementes.
5. Aceitar se o desvio diminuiu e nada novo saiu da faixa; senão, desfazer.
6. Ao aceitar: atualizar `testes/baseline_sim.json` (`--baseline`) e os limites de `test_equilibrio.py`, para o teste de regressão segurar o ganho.
7. A cada 3 ciclos, jogar de verdade 2 ou 3 partidas: o bot não sente diversão, ritmo nem legibilidade.

Ordem dos ciclos: **dificuldade primeiro** (tirar o teto), depois relíquias e reações, depois sinergias, por último a árvore. Cada camada mexe na de baixo, então começar pela base evita retrabalho.

### 3.4 Sem Python nesta máquina

O simulador depende de Python + Playwright. Três caminhos, do mais simples ao mais trabalhoso:
- **Rodar o bot dentro do próprio jogo:** o `bot.js` só precisa da página aberta. Um botão no modo moderador do `js/jogo.js` ("Simular N partidas") poderia rodar as sementes em sequência e baixar um JSON com os resultados. Não precisa instalar nada. Fica para a sessão que está mexendo no modo moderador.
- Instalar Python (python.org, não o atalho da Microsoft Store) e depois `pip install playwright` e `playwright install chromium`.
- Rodar num GitHub Actions a cada envio.

**Simulações que recomendo rodar primeiro:**
1. Bateria de resistência com a configuração atual (é a nova linha de base).
2. A mesma bateria com `cfg.dif` mais duro (o bot já aceita `dif`): `{vida: 1.6, dano: 1.6}` e `{vida: 1.7, dano: 1.65}`, para achar a faixa de 55–70% de vitória.
3. Bateria com escolhas registradas, para medir ramos, modificadores, especiais, relíquias e Talismãs.
4. Comparação de arquétipos fixos (equipes montadas à mão: 3 Invocadores, 3 Místicos, linhagem pura, elemento puro, Fogo+Raio, Água+Terra).
5. Variantes `semTalismas` e `tudoLiberado` (já existem no bot), para medir quanto a árvore pesa.

---

## 4. Propostas de mudança, por prioridade

Todos os números estão em `dados/fonte_sistema.py`, `dados/fonte_poderes.py`, `dados/fonte_mundo.py` ou `js/jogo.js`. **Nada foi alterado:** cada item precisa da aprovação do usuário e de uma rodada no simulador. Os efeitos esperados são estimativas.

### Prioridade 0: fazer o jogo cumprir o que o texto promete

| # | Mudança | Onde | Efeito esperado |
|---|---|---|---|
| 0.1 | Implementar as 16 relíquias genéricas. As mais fáceis: Hidromel (+1% de dano por abate por 10 s, até +30%), Espada na Pedra, Ovo de Koschei (reusar o código do Ankh), Estaca de Freixo (+50% contra linhagem Mortos-vivos), Para-raios, Concha das Marés, Anzol, Espelho Mágico, Bola de Borracha (`ric:1` nos projéteis), Ídolo Dourado com o custo. As de menu (Tabuletas, Taça, Astrolábio, Bússola, Muiraquitã, Mapa) podem entrar depois. | `relMods()` em `js/jogo.js` | Cada relíquia vira uma escolha diferente, e não "+10% de novo". |
| 0.2 | Máscara de Oni: aplicar os −10% de defesa (dano recebido ×1,1). Pedra do Sol: aplicar na recarga de h1 e h2, não na cadência do básico. | `relMods()` e `agirSelo()` | Tira a Máscara do topo; a Pedra passa a fazer o que diz. |
| 0.3 | Reações com texto: Podridão = 3% da vida máxima do alvo (1% em chefe); Supernova ×2 contra Sombra e Mortos-vivos; Chama Negra trava o "regenerar" dos chefes; Magnetismo puxa os cristais num raio de 60; Tempestade de Areia causa 0,4 p em área; Esporos passa o status para 2 vizinhos. | `reagirEfeito()` | Podridão e Chama Negra viram reações anti-chefe com identidade; Sombra e Natureza ganham papel. |
| 0.4 | Sinergias de nível 3 (classe e linhagem): implementar ou reescrever o texto para dizer o que acontece ("+20% de dano e vida"). Sugestão: implementar primeiro as simples (Mortos-vivos revivem 1×, Execução do Assassino, Caçada das Feras, Colosso) e reescrever o resto. | `calcularSinergia()` e textos em `fonte_sistema.py` | O jogador decide pelo que de fato acontece. |
| 0.5 | Místico, Renascer: fazer os modificadores Fênix e Vínculo funcionarem. Guerreiro, Imparável: dar a imunidade prometida (e +25% de dano em vez de +50%). Despertos Coletores e Jardim Sagrado: explosão dos servos e enraizar, como diz o texto. União Legião das Sombras: inimigo executado vira servo. | `HAB`, `COMPORTAMENTO` e `atualizarArvore()` | Nenhuma escolha da árvore fica vazia. |

### Prioridade 1: dificuldade (tirar o teto)

| # | Mudança | Onde | Efeito esperado |
|---|---|---|---|
| 1.1 | Vida do chefe de mapa 180 → 300 e do Guardião da Era 265 → 420 (vezes a dificuldade do mapa). Manter os 45% do primeiro chefe. | `spawnChefe()` | Chefe do mapa 2 em diante sobe de ≈15–25 s para ≈30–45 s. |
| 1.2 | Crescimento por mapa: vida 1,5 → 1,6 e dano 1,55 → 1,62. Confirmar com `cfg.dif` antes de mudar o código. | `DIF` em `js/jogo.js` e `CURVAS` | Vitória cai de ≈98% para a faixa de 55–70%; a profundidade passa a separar builds boas e ruins. |
| 1.3 | Cura por reação: Florescer e Fotossíntese 4% → 2% da vida, com no máximo 1 cura por 0,5 s para a equipe toda. | `reagirEfeito()` | Tira a imortalidade que Água e Natureza dão. |

### Prioridade 2: reações e elementos

| # | Mudança | Efeito esperado |
|---|---|---|
| 2.1 | Explosão e dano em área: dano nos vizinhos 1 p → 0,7 p (o alvo continua levando 1 p). | Fogo e Luz deixam de dominar a limpeza de horda (≈5 p → ≈3,8 p). |
| 2.2 | Os 6 pares só de controle ganham um dano pequeno: 0,8 p em área junto com o efeito (Vapor, Lama, Tempestade de Areia, Nevasca, Raízes, Pulso Fantasma). | Nenhum Pacto fica sem reação de dano; Água e Terra sobem. |
| 2.3 | Dano no tempo (Chama Negra, Esporos): 1,5 p → 2,5 p no total e acumular em vez de substituir (até 3 vezes). | Reações de alvo único passam a valer contra chefe. |
| 2.4 | Arco-íris: +30% → +20% de cadência, com 6 s de espera depois de cada ativação. | Deixa de ficar ativo o tempo todo. |
| 2.5 | Eclipse: 1,8 p → 2,2 p, ignorando a fadiga e bônus de chefe (dano verdadeiro). | Luz + Sombra ganha papel claro: o par anti-chefe. |

### Prioridade 3: sinergias de equipe

| # | Mudança (em `REGRAS["sinergia_classe"]` e afins) | Efeito esperado |
|---|---|---|
| 3.1 | Invocador 3: dano 1,50 → 1,35, vida 1,20 → 1,10. Invocador 2: dano 1,15 → 1,05 (o servo extra já paga). | Poder com 3 iguais de 1,34 → 1,22. |
| 3.2 | Caçador 2: dano 1,18 → 1,05 (o projétil extra já dobra o básico). Caçador 3: dano 1,40 → 1,25. | Acaba o bônus em dobro. |
| 3.3 | Místico 2: vida 1,25 → 1,20. Místico 3: dano 1,20 → 1,10. | Poder com 3 iguais de 1,34 → 1,26. |
| 3.4 | Assassino 3: dano 1,32 → 1,40 (com a Execução implementada, rever). Guerreiro 3: vida 1,12 → 1,20. | Os dois de baixo sobem para ≈1,20. |
| 3.5 | Elemento 3: dano 1,32 → 1,50 e vida 1,05 → 1,10, **ou** criar a "Ressonância": em equipe de 1 elemento só, todo 4º golpe no mesmo inimigo dispara uma reação do próprio elemento. | Elemento puro vira escolha de verdade, e não armadilha. |
| 3.6 | Linhagem 3: 1,20/1,20 → 1,15/1,15 (depois de implementar os efeitos especiais, que somam poder). | Linhagem pura cai de +18% para ≈+8% sobre a média. |
| 3.7 | Corrigir o modelo de papel (`test_equilibrio.py`): valor de reação por par 0,08 → medir no jogo; contar o projétil e o servo extra. | O teste rápido passa a refletir o jogo. |

### Prioridade 4: árvore de poderes

| # | Mudança | Efeito esperado |
|---|---|---|
| 4.1 | Ramos: Solitário 1,12/1,12 → 1,08/1,08; Aliança 1,00/1,00 → 1,05/1,05; Regional 1,08/1,04/1,10 → 1,12/1,08/1,15. | Solitário deixa de ser automático; Regional (raro e troca o elemento) paga o esforço. |
| 4.2 | Mago, Chuva: 5 impactos ×1,6 raio 18 → 6 impactos ×2,0 raio 24. Caçador, Rede: ×3 → ×4,5. Invocador, Portal duplo: dano 0,6 → 0,85. Guardião, Fortaleza: congelar 2,5 s → 3 s e +50% de raio. | Os dois modificadores de cada poder ficam a ±10% um do outro. |
| 4.3 | Básico: +15% → +20% de dano por nível. | Subir o básico deixa de ser escolha ruim. |
| 4.4 | Talismãs: Trevo +3% → +5% de crítico por nível (ou +3% e +10% de dano crítico); Coroa +5% → +8%; Lente +7% → +5% de área; Ampulheta só nas habilidades (ou 4% → 3%). | Diminui a distância entre o melhor e o pior Talismã. |
| 4.5 | Flor do Vale: 1%/s → 0,4%/s. Núcleo: limitar a 1 por run (ou contar só para o bônus de 2). | Tira as duas relíquias que hoje decidem a run sozinhas. |

### Prioridade 5: classes (só depois das camadas acima)

| # | Mudança | Efeito esperado |
|---|---|---|
| 5.1 | Xamã: dano base 7,5 → 8,5; totem dura 6 s → 7 s. | Xamã sai do fundo da tabela. |
| 5.2 | Místico: dano base 6 → 7, ou o Raio Vital acerta 2 alvos desde o nível 1. | Começo menos lento. |
| 5.3 | Caçador: sem mudança antes da 3.2. Depois de tirar o bônus em dobro, medir de novo. | — |

---

## 5. O que fica de fora ou sem certeza

- **Lendas e Panteão** não foram analisados a fundo (passivas e fardos mexem em `passiva()` e `custo()`). Entram como próximo passo, com a mesma bateria.
- Os resultados de simulação são **anteriores à árvore de poderes**; os números de tempo de chefe podem ter mudado. A primeira tarefa do método é justamente refazer a linha de base.
- Os valores "≈" das reações supõem grupos de ≈4 inimigos. Em hordas muito densas as explosões valem ainda mais; contra chefe sozinho, valem menos.
- O simulador abre `prototipo/index.html`. Vale conferir se ele está igual ao `js/jogo.js` atual antes de confiar nos resultados.
