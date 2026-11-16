@echo off
title CinemaVR
cd /d "%~dp0"
echo.
echo   CinemaVR is starting at http://localhost:8080/
echo   Keep this window open while watching. Close it to stop the server.
echo.
start "CinemaVR server" /min cmd /c "(python -m http.server 8080 || py -3 -m http.server 8080)"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8080/"
echo   Server running in a minimized window. Press any key here to stop everything.
pause >nul
taskkill /fi "WINDOWTITLE eq CinemaVR server" >nul 2>&1
