# Servidor local do Elementar (não precisa de Python nem Node).
# Uso, na pasta do repositório:
#   powershell -ExecutionPolicy Bypass -File ferramentas\servidor.ps1
#   powershell -ExecutionPolicy Bypass -File ferramentas\servidor.ps1 -Porta 8080
# Depois abra http://localhost:8000
# Para abrir no celular pelo Wi-Fi de casa, use -Rede (veja docs/APP.md: precisa liberar a porta uma vez como administrador).
param([int]$Porta = 8000, [string]$Raiz = (Split-Path $PSScriptRoot -Parent), [switch]$Rede)

$tipos = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'; '.json' = 'application/json; charset=utf-8'
  '.webmanifest' = 'application/manifest+json'; '.png' = 'image/png'; '.webp' = 'image/webp'
  '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'
  '.mp3' = 'audio/mpeg'; '.ogg' = 'audio/ogg'; '.wav' = 'audio/wav'; '.woff2' = 'font/woff2'; '.txt' = 'text/plain; charset=utf-8'
}
$raizCheia = [IO.Path]::GetFullPath($Raiz).TrimEnd('\') + '\'
$ouvinte = New-Object Net.HttpListener
if ($Rede) { $ouvinte.Prefixes.Add("http://+:$Porta/") } else { $ouvinte.Prefixes.Add("http://localhost:$Porta/") }
try { $ouvinte.Start() } catch {
  if ($Rede) { Write-Host "Não deu para abrir na rede. Rode uma vez, como administrador:`n  netsh http add urlacl url=http://+:$Porta/ user=Todos" }
  throw
}
Write-Host "Elementar em http://localhost:$Porta  (Ctrl+C para parar)"
if ($Rede) {
  Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' -and $_.PrefixOrigin -ne 'WellKnown' } |
    ForEach-Object { Write-Host "No celular (mesmo Wi-Fi): http://$($_.IPAddress):$Porta" }
}
try {
  while ($ouvinte.IsListening) {
    $ctx = $ouvinte.GetContext(); $resp = $ctx.Response
    try {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
      if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
      $arq = [IO.Path]::GetFullPath((Join-Path $raizCheia $rel))
      if (-not $arq.StartsWith($raizCheia) -or -not (Test-Path $arq -PathType Leaf)) {
        $resp.StatusCode = 404; $b = [Text.Encoding]::UTF8.GetBytes('404'); $resp.OutputStream.Write($b, 0, $b.Length)
      } else {
        $ext = [IO.Path]::GetExtension($arq).ToLower()
        $resp.ContentType = $(if ($tipos[$ext]) { $tipos[$ext] } else { 'application/octet-stream' })
        $resp.AddHeader('Cache-Control', 'no-cache')
        $b = [IO.File]::ReadAllBytes($arq); $resp.ContentLength64 = $b.Length
        if ($ctx.Request.HttpMethod -ne 'HEAD') { $resp.OutputStream.Write($b, 0, $b.Length) }
      }
    } catch { $resp.StatusCode = 500 } finally { $resp.Close() }
  }
} finally { $ouvinte.Stop() }
