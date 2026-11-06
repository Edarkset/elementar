// Ponte entre o jogo e o Electron. O jogo vê isso como window.ElementarNativo
// e usa por meio de js/plataforma.js.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ElementarNativo", {
  nome: "desktop",
  lerSave: chave => ipcRenderer.sendSync("save:ler", String(chave)),
  gravarSave: (chave, texto) => ipcRenderer.sendSync("save:gravar", String(chave), String(texto)),
  conquista: id => ipcRenderer.send("conquista", String(id)),
  sair: () => ipcRenderer.send("sair")
});
