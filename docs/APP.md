# Elementar como app: celular, computador e Steam

O jogo tem **um único código** (`index.html`, `css/`, `js/`, `arte/`). Ele roda:

| Onde | Como | Status |
|---|---|---|
| Navegador (qualquer aparelho) | abrir o endereço | pronto |
| Celular como app (ícone na tela, tela cheia, offline) | PWA: "Adicionar à tela de início" | pronto |
| Computador (Windows, Mac, Linux) | pasta `desktop/` (Electron) | base pronta, falta instalar o Node |
| Steam | mesma pasta `desktop/` + Steamworks | base pronta (save em arquivo, conquistas, overlay) |

## 1. Testar no celular

### Opção A: GitHub Pages (recomendado, funciona de qualquer lugar)
1. Envie as mudanças para o GitHub (GitHub Desktop → Commit → Push).
2. No site do GitHub: repositório `Edarkset/elementar` → **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, pasta `/ (root)` → Save.
3. Em 1 ou 2 minutos o jogo fica em **https://edarkset.github.io/elementar/**.
4. No iPhone (Safari): botão Compartilhar → **Adicionar à Tela de Início**. No Android (Chrome): menu ⋮ → **Instalar app**.

Repositório privado só publica no Pages com plano pago do GitHub. Nesse caso, use a opção B.

### Opção B: Wi-Fi de casa (sem publicar)
1. Abra o PowerShell **como administrador** na pasta do jogo e libere a porta uma vez:
   ```
   netsh http add urlacl url=http://+:8000/ user=Todos
   netsh advfirewall firewall add rule name="Elementar 8000" dir=in action=allow protocol=TCP localport=8000
   ```
2. Rode `powershell -ExecutionPolicy Bypass -File ferramentas\servidor.ps1 -Rede`.
3. Ele mostra um endereço `http://192.168.x.x:8000`; abra no celular conectado ao mesmo Wi-Fi.

Por esse endereço o jogo roda, mas não instala como app nem funciona offline (o navegador só permite isso em HTTPS).

### No computador
```
powershell -ExecutionPolicy Bypass -File ferramentas\servidor.ps1
```
e abra http://localhost:8000. Não precisa de Python nem Node.

## 2. Modo moderador (testes)
- Toque **5 vezes seguidas no título "Elementar"** do menu, ou abra o jogo com `?moderador` no fim do endereço.
- Aparece o botão **Modo moderador** no menu: liberar todos os monstros, Lendas, Panteão, Talismãs, +10.000 de Essência, ou tudo de uma vez.
- O save de antes da primeira mudança fica guardado: **Restaurar save de antes** volta ao progresso normal.
- Um save que passou pelo modo moderador não envia conquistas para a Steam.
- **Antes de lançar na Steam:** em `js/jogo/11_menu.js`, troque `MODERADOR_DISPONIVEL=true` para `false`.

## 3. Versão de computador e Steam (`desktop/`)
1. Instale o Node.js LTS (nodejs.org).
2. Na pasta `desktop/`: `npm install` e depois `npm run jogar` (abre o jogo numa janela; F11 alterna tela cheia).
3. `npm run instalador` gera o instalador em `desktop/dist/`.

O que já está pronto:
- **Save em arquivo** (`%APPDATA%/Elementar/saves/`), gravado sem risco de ficar pela metade. Configure o *Steam Auto-Cloud* para essa pasta e o save sincroniza entre computadores.
- **Conquistas da Steam**: toda conquista do jogo chama a Steam. No painel do Steamworks, cadastre cada conquista com o **API Name igual ao `id`** de `dados/fonte_conquistas.py`.
- **App ID** em `desktop/steam_appid.txt` (480 é o app de teste da Valve; troque pelo seu quando criar o jogo no Steamworks).
- Overlay da Steam (Shift+Tab) ligado.

Para portar para outro lugar (console, loja de celular), basta outra implementação em `js/plataforma.js`: o jogo só fala com `Plataforma.*`.

## 4. Resolução das artes
O jogo agora desenha o mundo na resolução real da tela (antes era 1/4 a 1/6 dela e ampliava pixelado). Toda arte importada sai do arquivo original, suavizada.

**Limite atual: os próprios arquivos em `arte/` são pequenos.** A exportação (`ferramentas/montar_jogo_completo.py`, tabela `CEL`) reduziu tudo para o tamanho do desenho antigo:

| Arte | No jogo hoje | Padrão dos prompts | Recomendado agora |
|---|---|---|---|
| Monstros (célula) | 64 px | 128 px | 128 px (celular) / 256 px (Steam) |
| Animações (quadro) | 64 px | 128 px | 128 px |
| Inimigos | 48 px | — | 128 px |
| Chefes | 96 px | — | 256 px |
| Ladrilhos de chão | 32 px | — | 64 a 128 px |
| Piso do reino | 512 px | — | 1024 px |

Reexporte a partir dos originais com tamanhos maiores. O jogo não precisa de mudança: ele lê qualquer tamanho. **Ao subir a resolução, carregue as artes por mapa** (ver Performance), senão o celular fica sem memória.

## 5. Animações
Os monstros da equipe, os dragões ancestrais e a Lenda/deus que acompanha o jogador usam as folhas de animação (parado, andando, atacando).

**Recorte inteligente.** As folhas não seguem a grade de 64 px à risca: em muitas, o desenho de uma linha passa da marca de 1/3 (pés cortados, pedaço do quadro de cima aparecendo no de baixo). O jogo agora acha a linha e a coluna vazias mais próximas da grade, ignora sobras soltas do quadro vizinho e alinha cada quadro pelos pés e pelo centro do corpo. Resultado da conferência automática: as 440 folhas (monstros + ancestrais) passam; `fenix__anim_1` e `fogo_fatuo__anim_5`, antes descartadas, voltaram a funcionar; 102 folhas têm 5 ou 6 quadros de "parado" e agora todos tocam.

**Épico e Lendário animados.** Essas variações não têm folha própria, mas têm a mesma pose da forma comum com outras cores. O jogo monta uma tabela de cores (célula comum → célula da raridade) e pinta os quadros da folha comum com ela, mantendo o brilho de cada pixel. Quando o desenho da raridade é muito diferente do comum (ex.: Tengu Lendário), a cor fica aproximada.

**Corpo por código, por cima dos quadros:** agacha e estica no golpe, avança na direção do alvo, inclina para onde anda, vira de lado suavemente, cadência do passo pela velocidade, pulinho e respiração quando não há folha, e um pulo de tamanho com brilho ao evoluir.

**Limite que continua:** as células têm 64 px e aparecem 5 a 7 vezes maiores na tela; nenhum filtro cria detalhe que não existe. O jogo amplia "nítido e liso" (pixel a pixel por 2x, depois suave), mas a melhora de verdade é exportar as células em 128 px (tabela da seção 4). O código lê qualquer tamanho.

## 6. Performance e segurança

Feito:
- Tela interna limitada a ~4,2 milhões de pixels (protege telas 4K e celulares).
- Service worker: jogo abre offline; código sempre atualizado quando há internet; artes guardadas no aparelho.
- Tela fica acesa durante o jogo; pedido para o navegador não apagar o save (o Safari do iPhone apaga dados de sites não instalados após alguns dias sem uso).
- Política de segurança de conteúdo (CSP) no `index.html`: só roda script do próprio jogo.
- Electron isolado (sandbox, sem acesso do jogo ao Node, sem navegar para fora do jogo).
- Servidor local só responde em `localhost` e bloqueia acesso a arquivos fora da pasta.

- **Artes sob demanda.** Na abertura o jogo baixa só a interface usada e as imagens fixas dos monstros (69 arquivos, ~2,4 MB, antes eram as 1.294 artes, ~87 MB). Ao entrar num mapa baixa o reino, o Guardião da era, a equipe, a Lenda, o chão dos elementos e os efeitos (~7 MB no primeiro mapa; a abertura do mapa cobre a espera). Qualquer outra arte é baixada na primeira vez em que o jogo a pede. Os portais adiantam a arte de abertura e o chão de cada opção.
- Chegada de arte não apaga mais os recortes guardados (antes, a cada 40 artes, tudo era refeito e o jogo engasgava).
- Câmera com precisão menor que 1 pixel do mundo: a rolagem e os inimigos andam de forma contínua.

Artes no manifesto que o código não usa (ficam no repositório; com o carregamento sob demanda não pesam): `arte/itens/*` (34), `arte/lendarios/*__eclosao` (8) e 20 da pasta `arte/ui/` (`ui__barra_chefe`, `ui__barras`, `ui__botao_perigo`, `ui__camada_*`, `ui__cartas`, `ui__classes`, `ui__derrota`, `ui__elementos`, `ui__emblema`, `ui__faixa`, `ui__itens`, `ui__linhagens`, `ui__livro`, `ui__paineis`, `ui__portais`, `ui__refugio`, `ui__selos`, `ui__vitoria`).

Pendente (por prioridade):
1. **Fonte local.** A fonte Pixelify Sans vem do Google Fonts; sem internet (ou na Steam offline) cai na fonte reserva. Baixar o arquivo `.woff2` para `css/` resolve (licença livre, OFL).
2. Desligar o modo moderador na versão Steam (`MODERADOR_DISPONIVEL=false`).
