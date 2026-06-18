# Travel Palembang - Executive Shuttle & Rental

Website resmi Travel Palembang yang dibangun menggunakan **Astro v6** dengan arsitektur **SSG (Static Site Generation)**. Proyek ini fokus pada performa tinggi, SEO, dan kemudahan pengelolaan konten via Markdown.

## 🚀 Teknologi Utama

- **Framework**: [Astro v6](https://astro.build/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Interactivity**: [React](https://react.dev/) (Astro Islands)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Management**: Astro Content Collections (Markdown)

## 📁 Struktur Proyek

- `src/content/rute/`: Data rute perjalanan dalam format `.md`.
- `src/content/vehicles/`: Data armada kendaraan.
- `src/content/testimonials/`: Review pelanggan.
- `src/pages/`: Halaman website (termasuk dynamic routing `/[from]/[to]`).
- `src/components/`: Gabungan komponen `.astro` (statis) dan `.tsx` (interaktif).

## 🛠️ Cara Menjalankan

### Persiapan
Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/).

### Instalasi
```bash
npm install
```

### Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka [http://localhost:4321](http://localhost:4321) di browser Anda.

### Build (Produksi)
```bash
npm run build
```
Hasil build akan berada di folder `dist/` dan siap dideploy ke provider hosting statis seperti Netlify, Vercel, atau GitHub Pages.

## 📝 Cara Menambah Rute Baru

Cukup buat file Markdown baru di `src/content/rute/` dengan format nama `asal-tujuan.md`.
Isi frontmatter seperti contoh berikut:

```yaml
---
from: palembang
to: baturaja
price: 135000
duration: 4 - 5 Jam
departureTimes: ["08:00 WIB", "14:00 WIB", "17:00 WIB", "20:00 WIB"]
type: utama
distance: 200 km
img: https://link-gambar.com/foto.webp
description: Deskripsi rute Anda di sini...
---
```

Website akan secara otomatis membuat halaman single page di `/palembang/baturaja`.

---
© 2026 Travel Palembang. All rights reserved.
