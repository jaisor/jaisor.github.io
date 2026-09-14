<#
.SYNOPSIS
    Regenerates public/favicon.ico from public/favicon.jpg.

.DESCRIPTION
    Browsers, crawlers and link-preview bots still probe /favicon.ico at
    the site root and treat a JPEG-only <link rel="icon"> as no favicon
    at all, so the site ships both. This rebuilds the .ico whenever the
    source photo changes.

    The .ico holds three PNG-encoded frames (16, 32 and 48 px). PNG-in-ICO
    is understood by every browser in use and keeps the file under 12KB;
    the alternative, BMP frames, would roughly triple it for no gain.

    System.Drawing only, so this adds no dependency to a repo that needs
    none. Windows-only, which is fine: it is a maintenance script, not
    part of the build.

.EXAMPLE
    pwsh -File scripts/make-favicon.ps1
#>

[CmdletBinding()]
param(
    [string] $Source,
    [string] $Destination,
    [int[]] $Sizes = @(16, 32, 48)
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Windows PowerShell 5.1 leaves $PSScriptRoot empty while binding param
# defaults, so the repo-relative paths are resolved here instead.
$public = Join-Path $PSScriptRoot '..\public'
if (-not $Source) { $Source = Join-Path $public 'favicon.jpg' }
if (-not $Destination) { $Destination = Join-Path $public 'favicon.ico' }

$img = [System.Drawing.Image]::FromFile((Resolve-Path $Source))
try {
    $frames = foreach ($size in $Sizes) {
        $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $size, $size))
        $g.Dispose()

        $ms = New-Object System.IO.MemoryStream
        $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
        $bytes = $ms.ToArray()
        $bmp.Dispose(); $ms.Dispose()
        , $bytes
    }
}
finally { $img.Dispose() }

# ICONDIR, then one 16-byte ICONDIRENTRY per frame, then the frame data.
$out = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter $out
try {
    $bw.Write([UInt16]0)               # reserved
    $bw.Write([UInt16]1)               # type: icon
    $bw.Write([UInt16]$Sizes.Count)

    $offset = 6 + 16 * $Sizes.Count
    for ($i = 0; $i -lt $Sizes.Count; $i++) {
        $bw.Write([Byte]$Sizes[$i])    # width  (0 would mean 256)
        $bw.Write([Byte]$Sizes[$i])    # height
        $bw.Write([Byte]0)             # palette size: none
        $bw.Write([Byte]0)             # reserved
        $bw.Write([UInt16]1)           # color planes
        $bw.Write([UInt16]32)          # bits per pixel
        $bw.Write([UInt32]$frames[$i].Length)
        $bw.Write([UInt32]$offset)
        $offset += $frames[$i].Length
    }
    foreach ($frame in $frames) { $bw.Write($frame) }
    $bw.Flush()

    $path = [System.IO.Path]::GetFullPath($Destination)
    [System.IO.File]::WriteAllBytes($path, $out.ToArray())
    Write-Host "Wrote $path ($($out.Length) bytes, $($Sizes -join '/') px)"
}
finally { $bw.Dispose(); $out.Dispose() }
