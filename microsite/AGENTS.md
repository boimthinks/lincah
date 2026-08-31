# AGENTS.md — Sistem Microsite Travel (Static Multi-Domain)

Panduan ini berlaku untuk SELURUH microsite travel di folder `microsite/`. Tujuannya:
setiap microsite baru (misal `travelpalembangsekayu`, `travelpalembanglampung`, dst.)
dibuat dengan **alur kerja, struktur file, dan standar SEO yang persis sama**
dengan microsite referensi `travelpalembangjambi`.

> File ini sengaja diletakkan di `microsite/AGENTS.md` (bukan di dalam folder
> project masing-masing) agar menjadi satu rujukan bersama untuk semua microsite.

---

## 1. Struktur Folder (Satu Microsite = Satu Folder)

```
microsite/
  └── <nama-microsite>/                 ← contoh: travelpalembangjambi (tanpa .web.id)
        index.html                      ← halaman utama (hub rute + booking)
        robots.txt
        sitemap.xml
        llms.txt
        assets/
          css/style.css
          js/main.js                    ← UI: burger, FAQ accordion, swap hero
          js/booking.js                 ← form 2-step + Leaflet map + Supabase + WA redirect
          img/favicon.svg
        <rute-1>/index.html             ← halaman rute spesifik (URL bersih)
        <rute-2>/index.html
        ...
```

**Aturan penamaan folder rute:**
- Gunakan **tanda hubung** (hyphen) untuk nama kota yang terdiri dari dua kata.
  Contoh benar: `pangkalan-balai/`, `bayung-lencir/`.
  Contoh salah: `pangkalanbalai/`, `bayunglencir/`.
- Kota kata tunggal tetap tanpa hyphen: `betung/`, `sungaililin/`, `tempino/`.
- URL hasil: `https://<domain>/<folder>/` (trailing slash, tanpa `.html`).

**Aturan umum:**
- Nama folder microsite = keyword utama tanpa TLD, contoh: `travelpalembangjambi`.
- Domain target (canonical/sitemap/og) = `https://<nama-microsite>.web.id/`.
- Asset di-load dengan path absolut dari root (`/assets/...`) agar aman di
  dalam subfolder rute.

---

## 2. Tech Stack

- **HTML5 Statis Murni** (tanpa build step, tanpa framework).
- **CSS**: 1 file `style.css` custom (mobile-first, CSS variables). Tidak boleh
  pakai Tailwind/CDN agar ringan & cepat (Core Web Vitals 95+).
- **JS**: Vanilla JS murni (2 file: `main.js`, `booking.js`). Tidak ada dependency
  kecuali **Leaflet.js** yang di-load dinamis dari CDN `unpkg` untuk peta picker.
- **Peta**: Leaflet + OpenStreetMap tiles (GRATIS, tanpa API key). Reverse geocoding
  pakai **Nominatim** (`nominatim.openstreetmap.org`). Link akhir ke sopir pakai
  Google Maps (`maps.google.com/?q=lat,lng`) agar sopir mudah buka di HP.
- **Database**: Supabase (sama dengan project utama `lincah-travel`).

---

## 3. Halaman & Section Wajib

### 3a. Halaman Utama (`index.html`)
Berisi section berurutan:
1. **Header** — logo teks + nav anchor + tombol "Chat WA" & "Pesan".
2. **Hero** — H1 keyword utama + subtitle + tag (harga/durasi/jadwal) + route card
   dengan tombol swap arah (Dari ⇄ Ke) + CTA.
3. **Features** — 4 kartu keunggulan (door-to-door, armada AC, driver, jadwal).
4. **Panduan Rute Mendalam** — paragraf 300-500 kata tentang koridor, jarak,
   keunggulan jalur, area jangkauan penjemputan (SEO depth content).
5. **Harga & Jadwal** — price card + jadwal chips.
6. **Cara Pesan** — 4 step (Pilih Rute → Isi Form → Set Lokasi → Kirim WA).
7. **Rute & Daerah Dilalui** — `<ol>` koridor (urut: Palembang → Pangkalan Balai →
   Talang Kelapa & Sembawa → Betung & Sungai Lilin → Bayung Lencir → Tempino →
   Kota Jambi) + grid tombol kota (klik → isi form, atribut `data-from`/`data-to`).
8. **Armada** — 3 kartu (Hiace Premio / Innova Reborn / Avanza Veloz).
9. **Kebijakan Bagasi & Tips** — info-grid (bagasi, pembayaran, tips perjalanan).
10. **Testimoni** — 3 kartu bintang.
11. **FAQ** — 5 item accordion (harus ada JSON-LD `FAQPage`).
12. **Booking Form** — form 2-step (Data → Peta GPS).
13. **CTA Band** + **Footer** + **Floating WA**.

**Target kata halaman utama: 1.200 – 2.000 kata** (teks terlihat).

### 3b. Halaman Rute Spesifik (`<folder>/index.html`)
Satu file per rute (misal `pangkalan-balai/index.html`). Struktur:
1. Header (nav ke `/#harga`, `/#rute`, `#cara-pesan`, `#armada`, `#faq`).
2. Hero dengan route card **sudah ter-set** rute tersebut.
3. Features (4 kartu).
4. Panduan Rute Mendalam (H3: Detail Koridor / Area Jangkauan / Keunggulan).
5. Cara Pesan (4 step).
6. Armada (3 kartu).
7. FAQ (3 item, ada JSON-LD `FAQPage`).
8. Booking Form dengan `data-from="Palembang" data-to="<Kota>"` agar rute
   otomatis ter-preset saat submit.
9. CTA Band.
10. Footer: **Brand | Rute Lainnya (link ke semua folder rute) | Halaman**
    (Beranda Utama, Cara Pesan, Armada, FAQ, Booking).

**Struktur heading wajib rapi:** tepat 1 `<h1>`, beberapa `<h2>`, dan `<h3>`
untuk sub-detail (Detail Koridor, Area Jangkauan, Keunggulan).

---

## 4. SEO & GEO (Wajib di Setiap Halaman)

- `<title>` maksimal 60 karakter, mengandung keyword utama + harga (halaman utama).
- `<meta description>` 120-155 karakter.
- `<meta name="keywords">` berisi variasi keyword.
- `<link rel="canonical">` → `https://<domain>/` (utama) atau
  `https://<domain>/<folder>/` (halaman rute).
- **Open Graph** + **Twitter Card** lengkap (og:url = canonical).
- **JSON-LD** (di `<head>`):
  - Halaman utama: `WebSite`, `TravelAgency`, `Product`+`Offer`, `BreadcrumbList`, `FAQPage`.
  - Halaman rute: `WebSite`, `TravelAgency` (areaServed), `FAQPage`.
- **`robots.txt`** — izinkan Googlebot + LLM crawler (GPTBot, PerplexityBot,
  ClaudeBot, Google-Extended) + arahkan ke sitemap.
- **`sitemap.xml`** — SELURUH URL (halaman utama + semua folder rute) dengan
  `lastmod` dan `priority` 0.8 untuk halaman rute.
- **`llms.txt`** — ringkasan fakta bisnis untuk AI search engine.
- **Internal link**: footer "Rute Lainnya" wajib menautkan ke semua folder rute
  (`/pangkalan-balai/`, `/betung/`, `/sungaililin/`, `/bayung-lencir/`, `/tempino/`).

---

## 5. Form Booking (Alur Standar)

Alur **wajib sama** dengan `booking.js` microsite referensi:

```
Step 1: Data Penumpang
  - Nama, WhatsApp (+62), Dari (select), Ke (select),
    Tanggal (format DD/MM/YYYY auto-slash), Jam, Jumlah Penumpang
  → Validasi → Lanjut

Step 2: Lokasi Jemput
  - Leaflet map picker (drag marker / click map / search box / tombol GPS)
  - Reverse geocoding Nominatim mengisi textarea alamat
  → Submit
```

**Saat Submit:**
1. **Simpan ke Supabase** tabel `notas` (payload di bawah).
2. **Redirect ke WhatsApp** admin dengan format bullet-point:
   ```
   *PEMESANAN TRAVEL <MICROSITE>*
   No. Ref: *#XXXXXX*
   *Data Penumpang:*
   - Nama: ...
   - WhatsApp: +62...
   - Penumpang: X Orang
   *Detail Perjalanan:*
   - Rute: [Dari] ke *[Ke]*
   - Tanggal: DD/MM/YYYY
   - Jadwal: Perjalanan [Jam]
   - Alamat Jemput: ...
   - Koordinat Jemput: https://maps.google.com/?q=lat,lng
   Terima kasih!
   ```

**Pre-fill rute:** `booking.js` membaca atribut `data-from` / `data-to` pada
`<form id="bookingForm">` (atau query param `?from=&to=`) sehingga halaman rute
langsung men-set rute yang benar sebelum submit.

**Daftar kota (`CITIES` di booking.js)** untuk koridor Palembang-Jambi:
`Palembang, Pangkalan Balai, Talang Kelapa, Sembawa, Betung, Sungai Lilin,
Bayung Lencir, Tempino, Jambi`.

---

## 6. Konfigurasi Supabase (Shared dengan lincah-travel)

Gunakan credential yang SAMA dengan project utama (lihat `src/components/BookingModal.tsx`
atau `adminapp/js/config.js`):

```
SUPABASE_URL = https://wrllosddilihcoqofhdr.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybGxvc2RkaWxpaGNvcW9maGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMzEzMDgsImV4cCI6MjA5NzYwNzMwOH0.Om4UkzVF0Qobqkva5yZuKu5FSAg8GI00dYUiOaaIsPQ
ADMIN_WA = 6281369231893
```

**Tabel `notas` (payload insert):**
```js
{
  no_nota: string,          // 6 digit terakhir Date.now()
  nama: string,
  whatsapp: string,         // tanpa 0 depan, pakai 62
  dari: string,
  tujuan: string,
  tanggal_berangkat: date,  // format YYYY-MM-DD
  jam_berangkat: string,
  tarif: number,            // 200000 * jumlah_penumpang
  jemput: string,
  jumlah_penumpang: number,
  status_booking: 'pending',
  status_pembayaran: 'belum_bayar',
  koordinat_jemput: string  // "lat, lng"
}
```

> Catatan: kolom `koordinat_jemput`, `status_booking`, `status_pembayaran`,
> `jumlah_penumpang` sudah ada (lihat `adminapp/UpdateSchemaBookingForm.sql`).
> Jika ingin membedakan sumber microsite di dashboard, jalankan:
> `ALTER TABLE notas ADD COLUMN IF NOT EXISTS source_subdomain TEXT;`
> lalu tambahkan field `source_subdomain: '<nama-microsite>'` ke payload.

---

## 7. Cara Replikasi Microsite Baru (Workflow)

1. `mkdir -p microsite/<nama-baru>/assets/{css,js,img}`
2. Copy `index.html`, `style.css`, `main.js`, `booking.js`, `robots.txt`,
   `sitemap.xml`, `llms.txt`, `favicon.svg` dari microsite referensi.
3. **Buat halaman rute** sebagai subfolder: `mkdir microsite/<nama-baru>/<folder-rute>`
   lalu isi tiap folder dengan `index.html` (template halaman rute, lihat #3b).
   - Nama folder pakai hyphen untuk kota dua kata: `pangkalan-balai/`, `bayung-lencir/`.
4. **Ganti semua** kemunculan di tiap file:
   - Nama brand / keyword (misal: "Palembang Jambi" → "Palembang Sekayu")
   - Harga, durasi, jadwal (sesuai data rute asli)
   - Daftar kota di `booking.js` (`CITIES` array) & grid tombol kota
   - URL domain di canonical / og / sitemap / llms.txt
   - JSON-LD (TravelAgency areaServed, Product harga, FAQPage)
   - Konten koridor & testimoni (pakai data faktual, jangan mengarang)
   - Link footer "Rute Lainnya" → sesuaikan dengan folder rute yang ada
5. Pastikan jumlah kata halaman utama 1.200 – 2.000.
6. Update `sitemap.xml` agar mencakup halaman utama + semua folder rute.
7. Tes lokal: `python3 -m http.server 8080 --directory microsite/<nama-baru>`
   buka `http://localhost:8080/` dan `http://localhost:8080/<folder-rute>/`,
   submit form, cek data masuk Supabase.

---

## 8. Larangan & Standar Konten

- **Jangan** sebut "Lincah Travel" di dalam microsite (identitas desain & copy
  harus mandiri/berbeda dari brand utama).
- **Jangan** memakai em dash (—) atau en dash (–) di copy.
- **Jangan** mengarang harga/alamat/testimoni. Pakai data faktual dari
  `SUMBER-PENGETAHUAN.md` project utama atau konfirmasi ke user.
- Paragraf maksimal 3-4 kalimat. Bahasa semi-formal, hangat, solutif.
- Internal link wajib berupa anchor ke section di halaman yang sama
  ( `#harga`, `#rute`, `#booking`, dll) atau ke folder rute (`/betung/`).
- Nama folder rute wajib konsisten dengan hyphen untuk kota dua kata.
