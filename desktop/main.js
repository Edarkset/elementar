// Elementar · versão desktop (Electron). É a base para a versão Steam.
const { app, BrowserWindow, protocol, net, ipcMain, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");
const steam = require("./steam");

const PASTA_JOGO = path.join(__dirname, "jogo");
const PASTA_SAVES = () => path.join(app.getPath("userData"), "saves");

// O jogo é servido por app://elementar/ em vez de file://, para o fetch das artes funcionar
// do mesmo jeito que no navegador.
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } }]);

function arquivoSave(chave) {
  return path.join(PASTA_SAVES(), chave.replace(/[^a-z0-9_-]/gi, "_") + ".json");
}

ipcMain.on("save:ler", (e, chave) => {
  try { e.returnValue = fs.readFileSync(arquivoSave(chave), "utf8"); } catch { e.returnValue = null; }
});
ipcMain.on("save:gravar", (e, chave, texto) => {
  try {
    fs.mkdirSync(PASTA_SAVES(), { recursive: true });
    const alvo = arquivoSave(chave), tmp = alvo + ".tmp";
    fs.writeFileSync(tmp, texto, "utf8");
    fs.renameSync(tmp, alvo);   // grava inteiro ou nada: o save nunca fica pela metade
    e.returnValue = true;
  } catch (err) { console.error("save", err); e.returnValue = false; }
});
ipcMain.on("conquista", (e, id) => steam.conquista(id));
ipcMain.on("sair", () => app.quit());

function criarJanela() {
  const janela = new BrowserWindow({
    width: 1280, height: 720, minWidth: 640, minHeight: 360,
    backgroundColor: "#120f1c", title: "Elementar", show: false,
    icon: path.join(PASTA_JOGO, "app", "icones", "icone-512.png"),
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true, nodeIntegration: false }
  });
  // o jogo nunca sai do próprio endereço (um link estranho não abre dentro do app)
  janela.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("app://elementar/")) e.preventDefault(); });
  janela.once("ready-to-show", () => janela.show());
  janela.webContents.on("before-input-event", (e, tecla) => {
    if (tecla.type !== "keyDown") return;
    if (tecla.key === "F11" || (tecla.alt && tecla.key === "Enter")) { janela.setFullScreen(!janela.isFullScreen()); e.preventDefault(); }
    if (tecla.key === "F12" && !app.isPackaged) janela.webContents.toggleDevTools();
  });
  janela.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  janela.loadURL("app://elementar/index.html");
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle("app", req => {
    const rel = decodeURIComponent(new URL(req.url).pathname).replace(/^\/+/, "") || "index.html";
    const arq = path.normalize(path.join(PASTA_JOGO, rel));
    if (!arq.startsWith(PASTA_JOGO + path.sep)) return new Response("proibido", { status: 403 });
    return net.fetch(pathToFileURL(arq).toString());
  });
  steam.iniciar();
  criarJanela();
});

app.on("window-all-closed", () => app.quit());
