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
- **Antes de lançar na Steam:** em `js/jogo.js`, troque `MODERADOR_DISPONIVEL=true` para `false`.

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
As 408 folhas de animação dos monstros eram baixadas mas **não eram usadas**. Agora os monstros da equipe ficam parados, andam e atacam com os quadros das folhas (as variações Épica e Lendária, sem animação própria, continuam com a imagem fixa).

Conferência automática das folhas (padrão: 3 linhas com 4, 6 e 6 quadros):
- 398 de 408 animações no padrão.
- **Refazer:** `fogo/fenix__anim_1` e `fogo/fogo_fatuo__anim_5` (quadros pequenos e deslocados da grade; o jogo usa a imagem fixa nelas).
- Falta 1 quadro (o jogo pula o quadro vazio): `ar/tengu__anim_6`, `luz/anjo__anim_3`, `luz/simurgh__anim_5`, `raio/poraque__anim_7`, `sombra/pirata_fantasma__anim_4` e `__anim_7`, `terra/roc__anim_3` e `__anim_8`.
- Folhas base, épica e lendária: todas com as 8 formas. Ifrit, Anjo e Kodama têm a primeira forma muito pequena na célula (perde detalhe quando ampliada).
- Os dragões ancestrais (`arte/lendarios/*__anim_*`) também têm folhas que o jogo ainda não usa.

## 6. Performance e segurança

Feito:
- Tela interna limitada a ~4,2 milhões de pixels (protege telas 4K e celulares).
- Service worker: jogo abre offline; código sempre atualizado quando há internet; artes guardadas no aparelho.
- Tela fica acesa durante o jogo; pedido para o navegador não apagar o save (o Safari do iPhone apaga dados de sites não instalados após alguns dias sem uso).
- Política de segurança de conteúdo (CSP) no `index.html`: só roda script do próprio jogo.
- Electron isolado (sandbox, sem acesso do jogo ao Node, sem navegar para fora do jogo).
- Servidor local só responde em `localhost` e bloqueia acesso a arquivos fora da pasta.

Pendente (por prioridade):
1. **Carregar artes por mapa.** Hoje o jogo baixa e decodifica as 1.129 artes na abertura (~35 MB em arquivo, centenas de MB na memória). Com artes maiores isso estoura a memória do iPhone. O ideal: carregar só a interface, a equipe e o reino atual, e baixar o próximo reino durante o mapa.
2. **Fonte local.** A fonte Pixelify Sans vem do Google Fonts; sem internet (ou na Steam offline) cai na fonte reserva. Baixar o arquivo `.woff2` para `css/` resolve (licença livre, OFL).
3. Desligar o modo moderador na versão Steam (`MODERADOR_DISPONIVEL=false`).
