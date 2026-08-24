# OpenCode Agent Instructions: Travel Palembang (Astro SSG)

## Aturan Komunikasi
- **Bahasa**: Selalu gunakan Bahasa Indonesia dalam semua respon, pesan, dan percakapan tanpa terkecuali.

## Project Info
- **Domain**: lincahtravel.web.id
- **Brand**: Lincah Travel (layanan travel door-to-door Sumatera Selatan)
- **Tagline**: "Cepat . Aman . Nyaman"

## Pengingat Penting
- **Aturan Wajib Anti-Duplikasi Artikel**: Sebelum memberi saran judul, ide topik, atau menulis artikel blog baru, Agent **WAJIB membaca/memindai daftar file nyata di `src/content/blog/`** secara langsung (bukan hanya mengandalkan catatan di markdown).
- Saat diminta menulis, mengedit, atau memberi saran judul artikel blog, baca `src/content/blog/` and `SUMBER-PENGETAHUAN.md` (di root project) untuk data brand, rute, harga, armada, testimoni, frontmatter schema.
- Gunakan skill **`penulis-ahli`** untuk menulis/mengedit artikel (menggabungkan humanizer + SEO/GEO + konten non-komoditas dalam satu pass).
- **Aturan Penyisipan Keyword**: Saat menulis artikel blog baru, wajib menyelipkan kata kunci rute (seperti "travel [asal] [tujuan]" atau "travel [asal] ke [tujuan]") secara natural di dalam body tulisan (bukan di dalam heading atau properti frontmatter seperti pengantar/kesimpulan), agar dapat diproses oleh mekanisme internal link otomatis.

## Konten Video (Pabrik Konten Drama - `konten-video/`)
- Saat diminta membuat **ide/naskah video drama pendek (short/reels/tiktok, 60–75 detik)** Lincah Travel, baca dan ikuti panduan di:
  1. **`konten-video/PROMPT_PABRIK_KONTEN.md`** — master system prompt & workflow 2 tahap (Drama Multi-Character).
  2. **`konten-video/STRATEGI_KONTEN.md`** — 8 katalog drama & formula 4 babak (Hook Keributan -> Tension -> Transformation Twist -> Punchline).
  3. **`konten-video/DAFTAR_RUTE.md`** — daftar rute resmi (hanya buat konten untuk rute terdaftar).
  4. **`konten-video/published_videos.json`** — riwayat video agar tidak duplikasi.
  5. **`konten-video/TEMPLATE_PRODUKSI.md`** — template skrip drama & image prompt Google Flow per segmen.
- **Wajib** memakai skill **`penulis-ahli`** untuk naskah drama & dialog agar hasil alami, beremosi, dan bebas dari kesan buatan AI.
- **Wajib** mencatat setiap video yang diproduksi ke `konten-video/published_videos.json`.

## Tech Stack
- **Framework**: Astro v6 (Static Site Generation)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
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
  - `/blog` (Index)
  - `/blog/[slug]` (Detail Single Blog)
- **Blog Layout**: Single blog pages (`/blog/[slug]`) utilize an `8/4 grid layout` with the main content taking `col-span-8` and the sidebar taking `col-span-4`. The sidebar includes `SidebarCTA` and `BlogTOC`. Article content (`<article>`) uses transparent background to blend with the page. Featured image from `image_url` is displayed below breadcrumbs, followed by `title` as H2 heading. The hero section uses `judul_seo` as H1.
- **Blog Typography**: Global styles for blog content (h2, h3, p, ul, ol, table, blockquote, etc.) are defined in `src/index.css` using the `.blog-content` class.
- **Route Body Content**: Route markdown files (`src/content/rute/*.md`) can have body content after frontmatter. Rendered in `[from]/[to].astro` via `await render(entry)` → `<Content />`, styled with `.route-content` class in `src/index.css`.
- **RoutesPrices `showMainRoutes`**: Component accepts `showMainRoutes` prop (default `true`). Set to `false` on `/travel` page to hide the "Rute Utama Unggulan" cards section.
- **Content Config**: Use `src/content.config.ts` (Astro v6 format with `loader: glob`).
- **City Names**: Stored as **lowercase** in Markdown frontmatter (`from`, `to`). Frontend display uses a capitalization helper.
- **WhatsApp Integration**: Use `ADMIN_WA = '6281369231893'` for all call-to-actions.
- **Interactivity**: Use `client:load` on React components (Navbar, RoutesPrices, FAQ, Hero) to ensure they function as islands.
- **Slugification**: For city data lookup, use: `.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')`.
- **SEO**: Implement JSON-LD Schemas (`BreadcrumbList`, `Product`, `Offer`, `Organization`, `WebSite`, `BlogPosting`) and Open Graph meta tags on key pages (`[from]/[to].astro` and `blog/[slug].astro`).

## Content Collections (src/content/)
Semua data dinamis disimpan dalam Markdown, didefinisikan di `src/content.config.ts`:

1. **`rute`**: `from`, `to` (lowercase), `price`, `duration`, `departureTimes`, `type` (`utama`|`semua`), `distance`, `description`, `img`.
2. **`blog`**: `title`, `judul_seo`, `slug`, `description`, `pubDate`, `author`, `image_url`, `kategori` (`rute`|`armada`|`tips`|`lokal`), `pengantar`, `kesimpulan`, `tags`. Simpan artikel langsung di `src/content/blog/` (tanpa subfolder), nama file `YYYY-MM-DD-slug.md`.
3. **`city_images`**: Pemetaan gambar kota (prioritas: mapping → route `img` → Unsplash).
4. **`hotels`**: `city`, `items: [{ name, image, address, phone }]`.
5. **`public_transport`**: bandara → `flight`, stasiun → `train`, terminal → `directions_bus`, pelabuhan → `directions_boat`.
6. **`districts`**: `city`, `items: ["district-1", ...]`.
7. **Lainnya**: `vehicles`, `testimonials`, `faq`.

## UI Components (`src/components/`)
- `Hero.tsx`: Route selector; jika rute dipilih tombol berubah menjadi "PESAN TRAVEL" (link WhatsApp).
- `HowToBook.astro`: Alur booking 4 langkah.
- `HotelsList.astro`, `PublicTransportList.astro`, `DistrictList.astro`: data per kota.
- `OtherRoutes.astro` / `OtherPosts.astro`: navigasi sidebar rute / artikel.
- `BlogTOC.astro`: daftar isi (h2 headings) sidebar.
- `SidebarCTA.astro`: CTA sticky reusable.
- `FloatingWhatsApp.astro`: tombol WA melayang (z-index 9999).
- `RelatedPosts.astro`: kartu artikel terkait horizontal.
- `RouteTicketPopup.astro`: popup tiket untuk halaman rute + link WA auto.
- `RoutesPrices.tsx`: selector & tabel harga di `/`, `/travel`, `/[from]/`.

## Operational Gotchas
- **Safe Data Fetching**: selalu `.catch(() => null)` saat `getEntry` untuk data kota agar build tidak gagal.
- **Tailwind v4**: gunakan `@tailwindcss/vite`, bukan postcss.
- **Windows Paths**: gunakan forward slash untuk import Astro.
- **Permalink Redirects (301)**: `/travel/from-to/` lama diarahkan ke `/{from}/{to}/` via `public/_redirects`.
- **404 Page**: `src/pages/404.astro` dengan countdown 5 detik sebelum redirect ke homepage.