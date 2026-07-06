@echo off
title KONNECT - Starting...
cd /d "%~dp0"

echo ==== KONNECT RUN %date% %time% ==== > run.log
echo Working dir: %cd% >> run.log

where node >> run.log 2>&1
if errorlevel 1 (
  echo NODE_NOT_FOUND >> run.log
  echo.
  echo  Node.js is not installed. Opening the download page...
  start "" https://nodejs.org
  pause
  exit /b
)
node -v >> run.log 2>&1
call npm -v >> run.log 2>&1

if not exist node_modules (
  echo INSTALLING_DEPENDENCIES >> run.log
  echo.
  echo  First run - installing dependencies. This takes 1-2 minutes...
  echo  Progress is written to run.log
  call npm install --no-audit --no-fund >> run.log 2>&1
  echo INSTALL_EXIT_CODE %errorlevel% >> run.log
)

echo STARTING_SERVER >> run.log
start "" cmd /c "timeout /t 20 /nobreak >nul & start http://localhost:3000"

echo.
echo  ============================================
echo   KONNECT is starting... browser opens in ~20s
echo   If not, visit:  http://localhost:3000
echo   Keep this window open while using the app.
echo  ============================================
echo.
call npm run dev >> run.log 2>&1
echo SERVER_EXITED %errorlevel% >> run.log
pause
