@echo off
setlocal enabledelayedexpansion

set "IP="
for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr /R /C:"IPv4 Address"') do (
    for /f "delims= " %%g in ("%%f") do (
        set IP=%%g
        if not "!IP:~0,3!"=="169" if not "!IP:~0,3!"=="127" goto :found
    )
)
:found
if defined IP (
    echo Local network IP: !IP!
) else (
    echo Could not determine local IP address
)

npm --prefix dashboard run dev
endlocal

