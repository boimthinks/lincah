# OpenCode Agent Instructions: Travel Palembang (Astro SSG)

## Project Info
- **Domain**: lincah.web.id
- **Brand**: Lincah Travel

## Tech Stack
- **Framework**: Astro v6 (Static Site Generation)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
- **Components**: Mix of `.astro` (static) and React `.tsx` (interactive islands)
- **Data**: Content Layer API (Markdown files in `src/content/`)

## Key Commands
- `npm run dev`: Start Astro dev server
- `npm run build`: Build static site to `dist/`
- `npm run lint`: Run TypeScript type checking

## Project Conventions
- **Dynamic Routing**: Routes are generated from `src/content/rute/*.md` using `[from]/[to].astro`.
- **Content Config**: Use `src/content.config.ts` (Astro v6 format with `loader: glob`).
- **City Names**: Stored as **lowercase** in Markdown frontmatter (`from`, `to`). Frontend display uses a capitalization helper.
- **WhatsApp Integration**: Use `ADMIN_WA = '6281369231893'` for all call-to-actions.
- **Interactivity**: Use `client:load` on React components (Navbar, BookingForm, RoutesPrices, FAQ) to ensure they function as islands.

## Operational Gotchas
- **Windows Paths**: Be careful with backslashes in tool calls; use forward slashes for Astro imports.
- **Tailwind v4**: Configured via `postcss.config.mjs` and `src/index.css` using `@import "tailwindcss"`. Do not look for a `tailwind.config.js`.
- **Legacy Removal**: The project was converted from Vite/React; ensure no leftover `index.html` or `vite.config.ts` are reintroduced.
