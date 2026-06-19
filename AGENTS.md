# OpenCode Agent Instructions: Travel Palembang (Astro SSG)

## Project Info
- **Domain**: lincah.web.id
- **Brand**: Lincah Travel (layanan travel door-to-door Sumatera Selatan)
- **Tagline**: "Cepat . Aman . Nyaman"

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
- **URL Structure**: 
  - `/travel` (Harga & Rute)
  - `/rental` (Rental Mobil)
- **Content Config**: Use `src/content.config.ts` (Astro v6 format with `loader: glob`).
- **City Names**: Stored as **lowercase** in Markdown frontmatter (`from`, `to`). Frontend display uses a capitalization helper.
- **WhatsApp Integration**: Use `ADMIN_WA = '6281369231893'` for all call-to-actions.
- **Interactivity**: Use `client:load` on React components (Navbar, RoutesPrices, FAQ, Hero) to ensure they function as islands.
- **Slugification**: For city data lookup, use: `.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')`.
- **SEO**: Implement JSON-LD Schemas (`BreadcrumbList`, `Product`, `Offer`, `Organization`, `WebSite`) on key pages.

## Content Collections (Data Structure)
All dynamic data is stored in Markdown and defined in `src/content.config.ts`.

1.  **`rute`**: Route definitions.
    *   Field: `from`, `to` (lowercase), `price`, `duration`, `departureTimes` (array), `type` (`utama` | `semua`), `distance` (opt), `description` (opt), `img` (opt).
2.  **`city_images`** (`src/content/city-images.md`): Central mapping for city images.
    *   Priority: `city_images` mapping $\to$ route `img` frontmatter $\to$ Unsplash placeholder.
3.  **`hotels`**: Hotel list per city.
    *   Structure: `city`, `items: [{ name, image, address, phone }]`.
    *   Fallback image: `/img/hotel-placeholder.webp`.
4.  **`public_transport`**: Transport hubs per city.
    *   Types: "bandara" ($\to$ `flight`), "stasiun" ($\to$ `train`), "terminal" ($\to$ `directions_bus`), "pelabuhan" ($\to$ `directions_boat`).
5.  **`districts`**: Districts per city for pickup/dropoff.
    *   Structure: `city`, `items: ["district-1", ...]`.
6.  **Others**: `vehicles`, `testimonials`, `faq`.

## UI Components (`src/components/`)
- `Hero.tsx`: Features a route selector. If a route is selected, the button changes to "PESAN TRAVEL" (green) and links directly to WhatsApp.
- `HowToBook.astro`: Displays the 4-step booking flow.
- `HotelList.astro`: Card grid for hotels.
- `PublicTransportList.astro`: List with Material Icons based on transport type.
- `DistrictList.astro`: Tag/badge list for districts.
- `OtherRoutes.astro`: Sidebar routes navigation (minimalist, icon-based) on `[from]/[to].astro`.
- `SidebarCTA.astro`: Reusable sticky call-to-action for sidebars.
- `RoutesPrices.tsx`: Main route selector and pricing table on `/` and `/travel`.

## Layout & Styling Notes
- **Google Material Icons**: Loaded in `Layout.astro`. Use `<span class="material-icons text-xl">name</span>`.
- **Lucide Icons**: Used in React components.
- **Color Palette**: Primary blue (`blue-700`, `blue-900`), accent yellow (`yellow-400`), neutrals (`slate-50` to `slate-900`).
- **Typography**: `Plus Jakarta Sans`.

## Operational Gotchas
- **Safe Data Fetching**: Always use `.catch(() => null)` when calling `getEntry` for city-specific data (hotels/transport/districts) to prevent build failure if the city file is missing.
- **Tailwind v4**: Configured via `postcss.config.mjs` and `src/index.css` using `@import "tailwindcss"`. No `tailwind.config.js`.
- **Windows Paths**: Use forward slashes for Astro imports.
