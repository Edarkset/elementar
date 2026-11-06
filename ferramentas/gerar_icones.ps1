# Gera os ícones do app (PWA, iPhone e lojas) a partir do emblema.
# Uso: powershell -ExecutionPolicy Bypass -File ferramentas\gerar_icones.ps1
# Usa o decodificador de imagens do Windows (WIC), que lê WebP no Windows 10/11.
param(
  [string]$Origem = (Join-Path (Split-Path $PSScriptRoot -Parent) 'arte\ui\ui__emblema.webp'),
  [string]$Saida  = (Join-Path (Split-Path $PSScriptRoot -Parent) 'app\icones')
)
Add-Type -AssemblyName PresentationCore, WindowsBase
New-Item -ItemType Directory -Force $Saida | Out-Null

$fs = [IO.File]::OpenRead($Origem)
$dec = [Windows.Media.Imaging.BitmapDecoder]::Create($fs, 'PreservePixelFormat', 'OnLoad')
$img = $dec.Frames[0]; $fs.Close()
# o WebP chega num formato que o WPF desenha sem transparência; converte para BGRA comum
if ($img.Format -ne [Windows.Media.PixelFormats]::Bgra32) {
  $img = New-Object Windows.Media.Imaging.FormatConvertedBitmap $img, ([Windows.Media.PixelFormats]::Bgra32), $null, 0
}
$fundo = New-Object Windows.Media.SolidColorBrush ([Windows.Media.Color]::FromRgb(0x12, 0x0f, 0x1c))

# nome, tamanho, escala do emblema (maskable precisa de margem: a zona segura é o círculo de 80%)
$lista = @(
  @('icone-192.png', 192, 0.92), @('icone-512.png', 512, 0.92),
  @('icone-maskable-192.png', 192, 0.74), @('icone-maskable-512.png', 512, 0.74),
  @('apple-touch-icon.png', 180, 0.86), @('icone-1024.png', 1024, 0.86), @('favicon-32.png', 32, 1.0)
)
foreach ($i in $lista) {
  $nome, $t, $esc = $i
  $vis = New-Object Windows.Media.DrawingVisual
  $dc = $vis.RenderOpen()
  $dc.DrawRectangle($fundo, $null, (New-Object Windows.Rect 0, 0, $t, $t))
  $lado = $t * $esc; $o = ($t - $lado) / 2
  $dc.DrawImage($img, (New-Object Windows.Rect $o, $o, $lado, $lado))
  $dc.Close()
  $rtb = New-Object Windows.Media.Imaging.RenderTargetBitmap $t, $t, 96, 96, ([Windows.Media.PixelFormats]::Pbgra32)
  [Windows.Media.RenderOptions]::SetBitmapScalingMode($vis, 'HighQuality')
  $rtb.Render($vis)
  $enc = New-Object Windows.Media.Imaging.PngBitmapEncoder
  $enc.Frames.Add([Windows.Media.Imaging.BitmapFrame]::Create($rtb))
  $out = [IO.File]::Create((Join-Path $Saida $nome)); $enc.Save($out); $out.Close()
  Write-Host "ok  $nome ($t px)"
}
