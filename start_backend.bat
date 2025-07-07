@echo off

set IMAGE_NAME=backend
set SCRIPT_DIR=%~dp0backend

REM Build image if it does not exist
docker image inspect %IMAGE_NAME% >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    docker build -t %IMAGE_NAME% %SCRIPT_DIR%
)

REM Run the container
docker run -p 3000:3000 %IMAGE_NAME%

