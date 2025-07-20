
@echo off

REM Obtain public IP
for /f "usebackq delims=" %%i in (`curl -s https://api.ipify.org`) do set PUBLIC_IP=%%i

set PUBLIC_IP=%PUBLIC_IP%
docker compose up

