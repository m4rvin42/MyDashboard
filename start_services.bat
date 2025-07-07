@echo off

for /f "usebackq delims=" %%i in (`curl -s https://api.ipify.org`) do set PUBLIC_IP=%%i

REM Build and run containers

docker compose up --build
