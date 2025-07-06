@echo off

set IMAGE_NAME=dashboard
set SCRIPT_DIR=%~dp0dashboard

REM Build the image

docker build -t %IMAGE_NAME% %SCRIPT_DIR%

REM Ensure backend dependencies and start server in new window
npm install --prefix server >nul
start "backend" cmd /c "npm start --prefix server"

REM Obtain public IP
for /f "usebackq delims=" %%i in (`curl -s https://api.ipify.org`) do set PUBLIC_IP=%%i

REM Run the container
docker run -p 8080:80 -e PUBLIC_IP=%PUBLIC_IP% %IMAGE_NAME%
