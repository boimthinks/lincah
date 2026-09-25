# OpenCode Agent Instructions: Travel Palembang (Astro SSG)

## Aturan Komunikasi
- **Bahasa**: Selalu gunakan Bahasa Indonesia dalam semua respon, pesan, dan percakapan tanpa terkecuali.

## Project Info
- **Domain**: lincahtravel.web.id
- **Brand**: Lincah Travel (layanan travel door-to-door Sumatera Selatan)
- **Tagline**: "Cepat . Aman . Nyaman"

## Pengingat Penting
- **Aturan Wajib Anti-Duplikasi Artikel**: Sebelum memberi saran judul, ide topik, atau menulis artikel blog baru, Agent **WAJIB membaca/memindai daftar file nyata di `src/content/blog/`** secara langsung (bukan hanya mengandalkan catatan di markdown).
- Saat diminta menulis, mengedit, atau memberi saran judul artikel blog, baca `src/content/blog/` and `SUMBER-PENGETAHUAN.md` (di root project) untuk data brand, rute, harga, armada, testimoni, frontmatter schema. Untuk detail geografi/koridor rute (daerah yang dilewati, junction, karakteristik jalur), baca juga `PENGETAHUAN-KORIDOR-RUTE.md` di root project.
- Gunakan skill **`penulis-ahli`** untuk menulis/mengedit artikel (menggabungkan humanizer + SEO/GEO + konten non-komoditas dalam satu pass).
- **Aturan Penyisipan Keyword**: Saat menulis artikel blog baru, wajib menyelipkan kata kunci rute (seperti "travel [asal] [tujuan]" atau "travel [asal] ke [tujuan]") secara natural di dalam body tulisan (bukan di dalam heading atau properti frontmatter seperti pengantar/kesimpulan), agar dapat diproses oleh mekanisme internal link otomatis.
- **Kewajiban Dua Anchor per Artikel (Internal Link)**: Setiap artikel blog baru wajib memuat minimal 2 tautan internal dengan anchor text sebagai berikut:
  1. **Anchor rute**: frasa "travel [asal] [tujuan]" (misal "travel palembang lahat") yang mengarah ke halaman rute spesifik (`/[from]/[to]`), diproses otomatis oleh `src/utils/internalLinks.ts`.
  2. **Anchor merek/homepage**: frasa "travel palembang" (tanpa kota tujuan) yang mengarah ke homepage (`/`), diproses otomatis oleh `src/utils/internalLinks.ts` (keyword `travel palembang` sudah terdaftar di util tersebut).
  Kedua frasa harus muncul natural di body artikel (bukan di heading atau frontmatter). Pastikan "travel palembang" berdiri sendiri (tidak langsung diikuti nama kota tujuan) agar tidak tertelan oleh anchor rute yang lebih panjang.
- **Kepatuhan Terhadap Kebijakan Google Spam Update**:
  - Dilarang membuat konten duplikat massal (*scaled content abuse*) dengan struktur tulisan yang identik untuk rute-rute berbeda. Setiap artikel harus memiliki variasi informasi yang khas dan spesifik lokal.
  - Hindari kanibalisasi kata kunci atau pembuatan halaman berlebihan (*doorway pages*) hanya untuk memanipulasi peringkat pencarian.

## Konten Video (Pabrik Konten UGC Flash - `konten-video/`)
- Saat diminta membuat **ide/naskah video UGC super singkat (short/reels/tiktok, 12–18 detik, 2–3 klip @ 6 detik)** Lincah Travel, baca dan ikuti panduan di:
  1. **`konten-video/PROMPT_PABRIK_KONTEN.md`** — master system prompt & workflow 2 tahap (UGC Flash, gaya rekaman HP organik).
  2. **`konten-video/STRATEGI_KONTEN.md`** — 8 katalog angle UGC & formula 3 klip (Hook -> Bukti -> CTA).
  3. **`konten-video/DAFTAR_RUTE.md`** — daftar rute resmi (hanya buat konten untuk rute terdaftar).
  4. **`konten-video/published_videos.json`** — riwayat video agar tidak duplikasi.
  5. **`konten-video/TEMPLATE_PRODUKSI.md`** — template naskah UGC & image prompt Google Flow per klip.
- **Wajib** memakai skill **`penulis-ahli`** untuk teks overlay, caption, dan narasi UGC agar natural dan bebas dari kesan buatan AI.
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
- **Permalink Redirects (301)**: `/travel/from-to/` lama diarahkan ke `/{from}/{to}` via `public/_redirects`. Semua URL TANPA trailing slash (`trailingSlash: 'never'`, `build.format: 'file'`); `_redirects` otomatis 301 dari URL ber-trailing slash lama.
- **404 Page**: `src/pages/404.astro` dengan countdown 5 detik sebelum redirect ke homepage.

## Git Commit & Push Gotchas
- **Output git tidak standar / tampil aneh**: Perintah `git status` di environment ini bisa mengembalikan format kustom (mis. `* master`, `~ Modified: 4 files`, atau `clean — nothing to commit`) yang BUKAN output git vanilla. Jangan percaya begitu saja pada ringkasan tersebut. Selalu verifikasi state sebenarnya dengan perintah eksplisit:
  - `git ls-files --others --exclude-standard` (cek file untracked/baru)
  - `git ls-files --deleted` (cek file terhapus)
  - `git diff --name-only` (cek file modified)
  - `git diff --cached --name-only` (cek yang sudah di-stage)
- **Jangan `git add .` atau `git add -A` secara buta**: Selalu stage file satu per satu atau per kelompok yang relevan dengan perubahan fitur. Di sesi ini ditemukan `adminapp/pack.zip` ikut terdeteksi sebagai *deleted* padahal BUKAN bagian dari perubahan kita (sudah tidak ada di working tree, besar kemungkinan terhapus oleh proses lain/build). Men-stage dan commit file tidak terkait berisiko menghapus aset `adminapp` secara tidak sengaja.
- **Cara menyelesaikan masalah saat commit & push**:
  1. Jalankan perintah verifikasi state di atas (bukan hanya `git status`) untuk memetakan file baru/modified/deleted.
  2. Pisahkan file milik perubahan kita dari file tidak terkait (mis. `adminapp/pack.zip`). Exclude file tidak terkait dari staging.
  3. Stage hanya file relevan: `git add <file1> <file2> ...` (hindari `.` atau `-A`).
  4. Commit dengan pesan yang merangkum perubahan (`git commit -m "..."`).
  5. Push ke remote: `git push`. Pastikan branch target benar (default `master`).
  6. Verifikasi hasil: `git log --oneline -3` dan cek output push (`<hash> master -> master`).
- **Build dulu sebelum commit bila menyentuh kode/komponen**: Jalankan `npm run build` untuk memastikan tidak ada error (EXIT CODE 0) sebelum meng-commit perubahan frontend, agar tidak mem-push kode yang gagal build.