# Converte as artes originais (PNG grandes) para os WebP leves que o jogo usa.
# O PowerShell monta a lista e serve os arquivos; o navegador reduz cada imagem e devolve o WebP.
# Uso, na pasta do repositório:
#   powershell -ExecutionPolicy Bypass -File ferramentas\converter_artes.ps1 -Origem "C:\caminho\da\pasta\arte"
# Depois abra http://localhost:8001 e espere terminar. Use -Listar para só ver o que seria convertido.
#
# Regras:
# - Arte que já está no manifesto: substitui o arquivo atual, no mesmo tamanho.
# - ambiente: folha 8x2 de peças de 32 px (256x64).
# - lendas e panteao: folha 6x3 (384x192); __retrato 2x3 (256x384).
# - Pula: pastas em $Pular, pastas bkp, arquivos "(1)" (cópias), e marcações (PNG pequeno com o texto "substitua por esta arte").
# - Nome com sufixo de computador do OneDrive (ex.: anubis-BR10-6LL70QN.png) vale como o nome sem o sufixo.
param(
  [Parameter(Mandatory = $true)][string]$Origem,
  [int]$Porta = 8001,
  [double]$Qualidade = 0.9,
  [string[]]$Pular = @('efeitos', 'Itens', 'npcs'),
  [switch]$Listar
)
$ErrorActionPreference = 'Stop'
$repo = Split-Path $PSScriptRoot -Parent
$origemCheia = [IO.Path]::GetFullPath($Origem).TrimEnd('\') + '\'
$arqManifesto = Join-Path $repo 'arte\manifesto.json'
$utf8 = New-Object Text.UTF8Encoding($false)

function TamanhoWebp($caminho) {
  $b = [IO.File]::ReadAllBytes($caminho); $c = [Text.Encoding]::ASCII.GetString($b, 12, 4)
  if ($c -eq 'VP8X') { return @((1 + $b[24] + 256 * $b[25] + 65536 * $b[26]), (1 + $b[27] + 256 * $b[28] + 65536 * $b[29])) }
  if ($c -eq 'VP8L') { $v = [BitConverter]::ToUInt32($b, 21); return @((($v -band 0x3FFF) + 1), ((($v -shr 14) -band 0x3FFF) + 1)) }
  return @(([BitConverter]::ToUInt16($b, 26) -band 0x3FFF), ([BitConverter]::ToUInt16($b, 28) -band 0x3FFF))
}

# manifesto atual, na mesma ordem
$manifesto = [ordered]@{}
$json = [IO.File]::ReadAllText($arqManifesto, $utf8) | ConvertFrom-Json
foreach ($p in $json.PSObject.Properties) { $manifesto[$p.Name] = $p.Value }
$porNome = @{}
foreach ($k in $manifesto.Keys) { $porNome[[IO.Path]::GetFileNameWithoutExtension($k).ToLower()] = $k }

$tarefas = New-Object System.Collections.ArrayList
$pulados = New-Object System.Collections.ArrayList
$porChave = @{}
foreach ($f in Get-ChildItem -LiteralPath $Origem -Recurse -File -Filter *.png) {
  $rel = $f.FullName.Substring($origemCheia.Length); $topo = $rel.Split('\')[0]
  if ($Pular -contains $topo) { [void]$pulados.Add("$rel  (pasta pulada)"); continue }
  if ($rel -match '(^|\\)bkp\\') { [void]$pulados.Add("$rel  (backup)"); continue }
  if ($f.Name -match '\(\d+\)\.png$') { [void]$pulados.Add("$rel  (cópia)"); continue }
  if ($f.Length -lt 150KB) { [void]$pulados.Add("$rel  (marcação)"); continue }
  $nome = ($f.BaseName -replace '-[A-Z]{2}\d+-[A-Z0-9]{6,}$', '').ToLower()
  $chave = $null; $w = 0; $h = 0
  if ($porNome.ContainsKey($nome)) {
    $chave = $porNome[$nome]; $atual = Join-Path $repo ($manifesto[$chave] -replace '/', '\')
    if (-not (Test-Path -LiteralPath $atual)) { [void]$pulados.Add("$rel  (arquivo do manifesto não existe)"); continue }
    $t = TamanhoWebp $atual; $w = $t[0]; $h = $t[1]
  } elseif ($topo -eq 'ambiente') { $chave = "arte/ambiente/$nome.png"; $w = 256; $h = 64 }
  elseif ($topo -eq 'lendas' -or $topo -eq 'panteao') {
    $chave = "arte/$topo/$nome.png"; if ($nome -like '*__retrato') { $w = 256; $h = 384 } else { $w = 384; $h = 192 }
  } else { [void]$pulados.Add("$rel  (não sei onde o jogo usa)"); continue }
  if ($porChave.ContainsKey($chave)) { [void]$pulados.Add("$rel  (repetida: $chave já veio de $($porChave[$chave]))"); continue }
  $porChave[$chave] = $rel
  $destino = if ($manifesto.Contains($chave) -and $manifesto[$chave] -like '*.webp') { $manifesto[$chave] } else { $chave -replace '\.png$', '.webp' }
  [void]$tarefas.Add([pscustomobject]@{ i = $tarefas.Count; origem = $f.FullName; rel = $rel; chave = $chave; destino = $destino; w = $w; h = $h; feito = $false })
}

Write-Host "Converter: $($tarefas.Count)   Pulados: $($pulados.Count)"
$pulados | Group-Object { $_ -replace '^.*\(([^:)]+).*$', '$1' } | ForEach-Object { Write-Host ("  pulados ({0}): {1}" -f $_.Name, $_.Count) }
if ($Listar) {
  $tarefas | ForEach-Object { "{0} -> {1} ({2}x{3})" -f $_.rel, $_.destino, $_.w, $_.h }
  ''; 'Pulados:'; $pulados
  return
}

function Responder($resp, [int]$cod, [byte[]]$b, [string]$tipo) {
  $resp.StatusCode = $cod; $resp.ContentType = $tipo; $resp.ContentLength64 = $b.Length; $resp.OutputStream.Write($b, 0, $b.Length)
}
function GravarManifesto {
  foreach ($t in $tarefas | Where-Object feito) { $manifesto[$t.chave] = $t.destino }
  $linhas = foreach ($k in $manifesto.Keys) { '"' + $k + '": "' + $manifesto[$k] + '"' }
  [IO.File]::WriteAllText($arqManifesto, "{`n" + ($linhas -join ",`n") + "`n}`n", $utf8)
}

$pagina = [IO.File]::ReadAllBytes((Join-Path $PSScriptRoot 'converter_artes.html'))
$ouvinte = New-Object Net.HttpListener; $ouvinte.Prefixes.Add("http://localhost:$Porta/"); $ouvinte.Start()
Write-Host "Abra http://localhost:$Porta no navegador (Ctrl+C para parar)"
try {
  while ($ouvinte.IsListening) {
    $ctx = $ouvinte.GetContext(); $req = $ctx.Request; $resp = $ctx.Response
    try {
      $cam = $req.Url.AbsolutePath
      if ($cam -eq '/') { Responder $resp 200 $pagina 'text/html; charset=utf-8' }
      elseif ($cam -eq '/tarefas') {
        $lista = @($tarefas | ForEach-Object { [pscustomobject]@{ i = $_.i; rel = $_.rel; w = $_.w; h = $_.h; q = $Qualidade } })
        Responder $resp 200 $utf8.GetBytes((ConvertTo-Json -InputObject $lista -Compress)) 'application/json'
      }
      elseif ($cam -match '^/origem/(\d+)$') { Responder $resp 200 ([IO.File]::ReadAllBytes($tarefas[[int]$matches[1]].origem)) 'image/png' }
      elseif ($cam -match '^/salvar/(\d+)$' -and $req.HttpMethod -eq 'POST') {
        $t = $tarefas[[int]$matches[1]]; $ms = New-Object IO.MemoryStream; $req.InputStream.CopyTo($ms); $b = $ms.ToArray()
        if ($b.Length -lt 30 -or [Text.Encoding]::ASCII.GetString($b, 8, 4) -ne 'WEBP') { Responder $resp 400 $utf8.GetBytes('não é WebP') 'text/plain'; continue }
        $dest = Join-Path $repo ($t.destino -replace '/', '\'); [void](New-Item -ItemType Directory -Force (Split-Path $dest))
        [IO.File]::WriteAllBytes($dest, $b); $t.feito = $true
        Responder $resp 200 $utf8.GetBytes('ok') 'text/plain'
      }
      elseif ($cam -eq '/fim') {
        GravarManifesto
        $n = @($tarefas | Where-Object feito).Count
        Responder $resp 200 $utf8.GetBytes("$n de $($tarefas.Count) convertidas; manifesto atualizado") 'text/plain'
        $resp.Close(); Write-Host "Pronto: $n de $($tarefas.Count) convertidas; manifesto atualizado."; break
      }
      else { Responder $resp 404 $utf8.GetBytes('404') 'text/plain' }
    } catch { try { Responder $resp 500 $utf8.GetBytes($_.Exception.Message) 'text/plain' } catch {} } finally { try { $resp.Close() } catch {} }
  }
} finally { $ouvinte.Stop() }
