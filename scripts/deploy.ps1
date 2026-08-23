<#
.SYNOPSIS
    Builds the site and syncs dist/ to a remote server via rsync.

.DESCRIPTION
    Runs `npm run build`, then rsyncs dist/'s contents into ~/dist in the
    given user's home directory on the given host, deleting any remote
    files that no longer exist locally. Only changed files are
    transferred, so repeat deploys after a small content edit are fast.

    rsync itself isn't native to Windows, so this shells out to WSL (which
    ships rsync) and runs the whole rsync-over-ssh step there, via
    wsl-rsync-deploy.sh, using WSL's own ssh rather than bridging out to
    Windows' ssh.exe. That matters: a passphrase, password, or host-key
    prompt needs a real console, and a Windows exe invoked across the
    WSL/Windows interop boundary as rsync's remote-shell child only gets
    a pipe, not a console, so such a prompt has nowhere to go and the
    whole thing hangs. Running natively inside WSL avoids that.

    wsl-rsync-deploy.sh copies this Windows user's .ssh directory, plus
    the given private key specifically, into a throwaway native (ext4)
    temp dir so it can fix permissions on them (required by ssh, but
    impossible to set on /mnt/c, which can't hold real Unix permission
    bits) — deleted again once rsync exits, however it exits. The key is
    passed explicitly (rather than relying on ssh's automatic identity
    discovery or config-file IdentityFile resolution) because both of
    those resolve against this Windows user's real default identities /
    home directory, not necessarily the key actually authorized on the
    target host. known_hosts is read from the real Windows file
    directly, so a host key trusted once doesn't need re-confirming on
    every deploy. Requires WSL installed with a distro that has rsync
    (already the case on this machine's default Ubuntu distro).

.PARAMETER Username
    The SSH username to authenticate as on the remote host.

.PARAMETER HostName
    The remote host to deploy to.

.PARAMETER PrivateKeyPath
    Path to the private key file to authenticate with (e.g.
    "$HOME\.ssh\jaisor").

.EXAMPLE
    ./scripts/deploy.ps1 -Username jordan -HostName example.com -PrivateKeyPath ~\.ssh\jaisor
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Username,

    [Parameter(Mandatory = $true)]
    [string]$HostName,

    [Parameter(Mandatory = $true)]
    [string]$PrivateKeyPath
)

$ErrorActionPreference = "Stop"

# Convert C:\foo\bar -> /mnt/c/foo/bar directly rather than shelling out to
# `wsl.exe wslpath`, whose output PowerShell can end up capturing as $null
# depending on how args cross the wsl.exe boundary.
function ConvertTo-WslPath {
    param([Parameter(Mandatory = $true)][string]$WindowsPath)
    $DriveLetter = $WindowsPath.Substring(0, 1).ToLower()
    $PathRemainder = $WindowsPath.Substring(2) -replace '\\', '/'
    return "/mnt/$DriveLetter$PathRemainder"
}

$RemoteTarget = "${Username}@${HostName}"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$DistPath = Join-Path $RepoRoot "dist"
$SyncScriptPath = Join-Path $PSScriptRoot "wsl-rsync-deploy.sh"
$WindowsSshDir = Join-Path $env:USERPROFILE ".ssh"

Push-Location $RepoRoot
try {
    if (-not (Get-Command wsl.exe -ErrorAction SilentlyContinue)) {
        throw "wsl.exe not found; this script requires WSL (with rsync installed in its default distro) to sync efficiently."
    }

    Write-Host "Building project..."
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "npm run build failed with exit code $LASTEXITCODE"
    }

    if (-not (Test-Path $DistPath)) {
        throw "dist folder not found at $DistPath after build"
    }
    if (-not (Test-Path $WindowsSshDir)) {
        throw "no .ssh directory found at $WindowsSshDir"
    }
    if (-not (Test-Path $PrivateKeyPath)) {
        throw "no private key found at $PrivateKeyPath"
    }

    $ResolvedDistPath = (Resolve-Path $DistPath).Path
    # Trailing slash on the source: sync dist/'s *contents* into ~/dist,
    # rather than nesting a dist/ folder inside it.
    $WslDistSource = "$(ConvertTo-WslPath $ResolvedDistPath)/"
    $WslSshDir = ConvertTo-WslPath (Resolve-Path $WindowsSshDir).Path
    $WslSyncScriptPath = ConvertTo-WslPath (Resolve-Path $SyncScriptPath).Path
    $WslPrivateKeyPath = ConvertTo-WslPath (Resolve-Path $PrivateKeyPath).Path

    Write-Host "Syncing dist/ to ${RemoteTarget}:~/dist via rsync..."
    wsl.exe bash $WslSyncScriptPath $WslDistSource $WslSshDir "${RemoteTarget}:dist/" $WslPrivateKeyPath
    if ($LASTEXITCODE -ne 0) {
        throw "rsync failed with exit code $LASTEXITCODE"
    }

    Write-Host "Deployed dist/ to ${RemoteTarget}:~/dist"
}
finally {
    Pop-Location
}
