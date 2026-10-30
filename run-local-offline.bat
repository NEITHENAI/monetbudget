@echo off
title THE MONETS - Uganda National Budget FY 2027/2028 Platform
echo ===================================================================
echo   THE MONETS - UGANDA NATIONAL BUDGET 2027/2028 CONSULTATION PORTAL
echo   Mode: 100%% Offline Localhost Fail-safe
echo ===================================================================
echo.
echo Launching local development server on http://localhost:5174 ...
echo.

start "" "http://localhost:5174"
call npm.cmd run dev -- --host --port 5174

pause
