# OpenCode Agent Instructions: Travel Palembang (Astro SSG)

## Project Info
- **Domain**: lincah.web.id
- **Brand**: Lincah Travel (layanan travel door-to-door Sumatera Selatan)

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

## Content Collections (Data Structure)
Semua data dinamis disimpan di Markdown (frontmatter) dan di-define di `src/content.config.ts`.

1.  **`rute`**: Daftar rute perjalanan.
    *   Field: `from`, `to` (lowercase), `price`, `duration`, `departureTimes` (array), `type` (`utama` | `semua`), `distance` (opt), `description` (opt), `img` (opt, fallback image per route).
2.  **`city_images`** (`src/content/city-images.md`): Satu file pusat untuk memetakan **gambar utama** berdasarkan kota tujuan (`to`).
    *   Struktur: `cities: { slug-kota: "url-gambar" }`.
    *   **Logika Prioritas Gambar** di `[from]/[to].astro`:
        1.  Cek `city_images` (di `city-images.md`) → jika ada URL, pakai itu.
        2.  Jika kosong, fallback ke `img` di frontmatter rute.
        3.  Jika keduanya kosong, pakai placeholder Unsplash.
3.  **`hotels`**: Daftar hotel per kota.
    *   File: `src/content/hotels/[nama-kota].md` (cth: `palembang.md`).
    *   Struktur: `city: "palembang"`, `items: [{ name, image, address, phone }]`.
    *   **Catatan**: Gambar hotel bisa di-host di Blogspot (gunakan URL langsung).
4.  **`public_transport`**: Daftar transportasi umum (bandara, stasiun, terminal, pelabuhan) per kota.
    *   File: `src/content/public_transport/[nama-kota].md`.
    *   Struktur: `city`, `items: [{ name, type, address }]`.
    *   **Tipe yang didukung** (4 default, otomatis muncul icon Google Material):
        *   Mengandung kata **"bandara"** → icon `flight`
        *   Mengandung kata **"stasiun"** → icon `train`
        *   Mengandung kata **"terminal"** → icon `directions_bus`
        *   Mengandung kata **"pelabuhan"** → icon `directions_boat`
5.  **`districts`**: Daftar kecamatan per kota (untuk area jemput/antar).
    *   File: `src/content/districts/[nama-kota].md`.
    *   Struktur: `city`, `items: ["nama-kecamatan-1", "nama-kecamatan-2", ...]`.
6.  **Lainnya**: `vehicles`, `testimonials`, `faq` (sudah ada sejak awal project).

## Data Display on Route Pages (`src/pages/[from]/[to].astro`)
Halaman rute dinamis menampilkan data untuk **kedua kota** (asal & tujuan) demi SEO lokal:
- **Section dari `from`**: Hotel, Transportasi Umum, dan Kecamatan di kota asal (heading: "Titik Jemput Potensial" / "Area Layanan Penjemputan").
- **Section dari `to`**: Hotel, Transportasi Umum, dan Kecamatan di kota tujuan (heading: "Tujuan Antar" / "Area Layanan Pengantaran").
- **Error Handling**: Jika file data kota (hotel/transport/district) belum dibuat, gunakan `.catch(() => null)` saat `getEntry` agar build tidak gagal.
- **Atribut Gambar**: `alt` dan `title` pada `<img>` di halaman rute menggunakan pola `travel [from] [to] murah`.

## UI Components (`src/components/`)
- `HotelList.astro`: Card grid untuk hotel (gambar, nama, alamat, nomor telepon sebagai teks biasa tanpa link WA).
- `PublicTransportList.astro`: List dengan icon Google Material Icons untuk setiap tipe transport.
- `DistrictList.astro`: Tag/badge list untuk nama-nama kecamatan.
- `OtherRoutes.astro`: Sidebar card view "Rute Lainnya" di halaman `[from]/[to].astro`. Sudah di-enhance dengan gambar kota tujuan dan desain card (bukan list biasa).
- `RoutesPrices.tsx`: Komponen utama di `/` dan `/rute` yang punya 2 section:
    - **Rute Utama Unggulan**: Card view dengan gambar kota tujuan (dari `city_images`), gradient putih di bawah, teks Dari & Tujuan di-overlay di atas gradient.
    - **Tabel Rute Wilayah Sumsel**: List/tabel rute reguler dengan search & filter.
- `Hero.tsx`, `Navbar*.tsx`, `BookingForm.tsx`, `FAQ.tsx`, `Features.astro`, `Fleet.astro`, `HowToBook.astro`, `Testimonials.astro`, `Footer.astro` (komponen standar lain yang sudah ada).

## Layout & Styling Notes
- **Google Material Icons**: Dimuat di `src/layouts/Layout.astro` via `<link href="https://fonts.googleapis.com/icon?family=Material+Icons">`. Pakai dengan `<span class="material-icons text-xl">nama_icon</span>`.
- **Lucide Icons**: Dipakai di komponen React (`.tsx`) seperti `Clock`, `Calendar`, `Search`, dll.
- **Color Palette**: Primary biru (`blue-700`, `blue-900`), kuning aksen (`yellow-400`), netral (`slate-50` s.d. `slate-900`).
- **Typography**: `Plus Jakarta Sans` (sudah di-import di Layout).

## Git & Deployment
- **Repository**: `https://github.com/boimthinks/lincah.git`
- **Branch utama**: `master` (saat ini, perlu di-rename ke `main` jika standar repo GitHub modern).
- **Workflow penambahan data baru**:
    1.  Tambah rute baru → buat file `.md` di `src/content/rute/`.
    2.  Tambah gambar kota → edit `src/content/city-images.md`.
    3.  Tambah hotel/transport/kecamatan → buat/edit file `.md` di folder koleksi terkait dengan nama file = slug kota tujuan.

## Operational Gotchas
- **Windows Paths**: Be careful with backslashes in tool calls; use forward slashes for Astro imports.
- **Tailwind v4**: Configured via `postcss.config.mjs` and `src/index.css` using `@import "tailwindcss"`. Do not look for a `tailwind.config.js`.
- **Legacy Removal**: The project was converted from Vite/React; ensure no leftover `index.html` or `vite.config.ts` are reintroduced.
- **Safe Data Fetching**: Selalu gunakan `.catch(() => null)` saat `getEntry` untuk data yang mungkin belum ada (hotel/transport/district per kota), agar build tidak break.
- **Slugification**: Untuk lookup data per kota, gunakan helper: `.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')` — sama dengan logika di `getStaticPaths`.
