// Integração com a Steam (opcional). Sem Steam aberta ou sem o pacote steamworks.js,
// o jogo roda normalmente e isto não faz nada.
// O App ID vem de desktop/steam_appid.txt (480 é o app de teste "Spacewar" da Valve).
const fs = require("fs");
const path = require("path");

let cliente = null;

function lerAppId() {
  for (const p of [path.join(process.cwd(), "steam_appid.txt"), path.join(path.dirname(process.execPath), "steam_appid.txt"), path.join(__dirname, "steam_appid.txt")]) {
    try { const n = parseInt(fs.readFileSync(p, "utf8").trim(), 10); if (n > 0) return n; } catch {}
  }
  return 0;
}

function iniciar() {
  const appId = lerAppId();
  if (!appId) return;
  try {
    const steamworks = require("steamworks.js");
    cliente = steamworks.init(appId);
    steamworks.electronEnableSteamOverlay();
    console.log(`Steam ligada (app ${appId}) para ${cliente.localplayer.getName()}`);
  } catch (e) {
    console.log("Steam indisponível, seguindo sem ela:", e.message);
    cliente = null;
  }
}

// O id da conquista no jogo (dados/fonte_conquistas.py) deve ser o mesmo "API Name"
// cadastrado no painel do Steamworks.
function conquista(id) {
  if (!cliente) return;
  try { if (!cliente.achievement.isActivated(id)) cliente.achievement.activate(id); } catch (e) { console.warn("conquista steam", id, e.message); }
}

module.exports = { iniciar, conquista };
