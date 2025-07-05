$ErrorActionPreference = 'Stop'

# Try to determine local network IP address
$localIp = $(ipconfig | Select-String -Pattern 'IPv4 Address.*: ([0-9\.]+)' | ForEach-Object { $_.Matches[0].Groups[1].Value } | Select-Object -First 1)
if (-not $localIp) {
  $localIp = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notmatch '^169\.254' -and $_.IPAddress -ne '127.0.0.1' } | Select-Object -First 1 -ExpandProperty IPAddress
}
if ($localIp) {
  Write-Host "Local network IP: $localIp"
} else {
  Write-Host "Could not determine local IP address"
}

# Start the Vite dev server inside the dashboard directory
npm --prefix dashboard run dev

