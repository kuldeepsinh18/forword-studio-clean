@echo off
echo.
echo ========================================
echo   FORWARD STUDIO - Setup Script
echo ========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo.
echo Access the site at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm run dev
