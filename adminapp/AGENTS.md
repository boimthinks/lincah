# Lincah Travel Admin - Agent Instructions

## Project Overview
PWA for tracking Lincah Travel business expenses/income. Vanilla HTML/CSS/JS SPA with Supabase backend. Hosted on shared hosting.

## Tech Stack
- **Frontend:** Vanilla JS (no framework), Tailwind CSS via CDN, Chart.js, Google Material Icons
- **Backend:** Supabase (PostgreSQL + REST API)
- **PWA:** Service Worker + manifest

## Key Files
- `index.html` - Single entry point, loads all JS/CSS
- `js/config.js` - Supabase URL and anon key
- `js/auth.js` - Token authentication (SHA-256 hash)
- `js/app.js` - Main app initialization
- `js/router.js` - SPA hash-based routing
- `js/pages/*.js` - Page components (dashboard, passengers, vendors, expenses, reports, logs, settings)
- `js/components/*.js` - Reusable UI components
- `sw.js` - Service worker (skip Supabase requests, network-first for JS/CSS)
- `supabase_migration.sql` - Database schema

## Commands
No build step. Open `index.html` or use local server:
```bash
python3 -m http.server 8080
# or
npx serve
```

*Untuk membuka project di browser, jalankan command server di atas lalu akses `http://localhost:8080`.*

## Architecture Notes
- SPA with hash routing (`#/dashboard`, `#/vendors`, etc.)
- All pages render via `document.getElementById('app').innerHTML = ...`
- Authentication: single token `#Sederhana123`, stored as SHA-256 hash in `app_settings` table
- Data flows: pages fetch from Supabase, render to DOM, handle CRUD
- Service worker caches static assets but NOT Supabase API requests

## Supabase
- Project URL and anon key in `js/config.js`
- Database tables: `vendors`, `passengers`, `expenses`, `app_settings`, `activity_logs`
- RLS enabled but policy allows all (auth enforced at frontend level)
- Token hash auto-initialized on first load

## Gotchas
- Service worker version is in `sw.js` `CACHE_NAME`. Increment when deploying changes.
- `sw.js` skips caching for `supabase.co` hostname - do NOT cache API responses.
- Number inputs use thousand separators (dots) via `Helpers.formatThousands()` / `Helpers.unformatThousands()`
- All card list titles/subtitles use `text-transform: uppercase` via CSS
- WhatsApp links auto-normalize phone numbers (08xx -> 628xx)
- Delete flow: edit form shows "Hapus" button, closes form, then shows confirmation dialog
- All changes are made to files in `lincah-travel-admin/` folder for shared hosting deployment

## Deployment
Upload entire `lincah-travel-admin/` folder contents to `public_html` on shared hosting. No build required.