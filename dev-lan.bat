@echo off
echo Starting Astro Dev Server with LAN Access...

REM Get machine LAN IP address
for /f "tokens=2 delims=:@" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
  echo Local URL: ^http://%%a:4321
  echo You can access this on mobile devices using this URL
)

npm run dev
pause