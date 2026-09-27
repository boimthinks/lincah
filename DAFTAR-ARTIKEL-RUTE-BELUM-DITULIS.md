# Daftar Artikel Rute yang Belum Ditulis (Prioritas)

**Tujuan:** Menutup celah konten di mana rute sudah terdaftar di `src/content/rute/`
(tampil di halaman `/travel` & memiliki landing page `/[from]/[to]`) **tetapi belum
punya artikel blog**. Tanpa artikel blog, autolink rute (`src/utils/internalLinks.ts`
→ `ROUTE_BLOG_MAP`) akan *fallback* ke landing page `/[from]/[to]` yang tidak
terindeks Google — sehingga link equity terbuang.

**Status terkini (SELESAI):** Semua rute yang terdaftar di `src/content/rute/`
sudah punya artikel blog dan terpetakan di `ROUTE_BLOG_MAP`. Tidak ada lagi
autolink yang *fallback* ke landing page `/[from]/[to]`.

Riwayat penyelesaian: 4 rute unik (Muara Beliti, Talang Padang, Tugumulyo,
Pelabuhan Tanjung Api-api) ditulis pada 2026-09-27.

> Catatan: setiap rute punya 2 file (arah `palembang→kota` dan `kota→palembang`),
> tapi cukup **1 artikel blog** yang dipakai bersama untuk kedua arah via `ROUTE_BLOG_MAP`.

---

## 🔴 Prioritas 1 — Rute Utama yang Sudah Lama Ada di /travel (Segera)

Rute ini sudah lama tayang di halaman harga & punya landing page, volume pencarian
layak, dan saat ini autolink-nya jatuh ke landing page yang tidak terindeks.

| # | Rute (from → to) | File Rute | routeKey (forward) | routeKey (reverse) | Estimasi Intent | Slug Artikel Usulan |
|---|------------------|-----------|--------------------|--------------------|-----------------|---------------------|
| 1 | Palembang → Muara Beliti | `palembang-muara-beliti.md` / `muara-beliti-palembang.md` | `palembang-muara-beliti` | `muara-beliti-palembang` | Menengah (ibukota Musi Rawas, urusan pemerintahan/bisnis) | `travel-palembang-muara-beliti` |
| 2 | Palembang → Talang Padang | `palembang-talang-padang.md` / `talang-padang-palembang.md` | `palembang-talang-padang` | `talang-padang-palembang` | Rendah–Menengah (lintas provinsi ke Bengkulu) | `travel-palembang-talang-padang` |
| 3 | Palembang → Tugumulyo | `palembang-tugumulyo.md` / `tugumulyo-palembang.md` | `palembang-tugumulyo` | `tugumulyo-palembang` | Rendah–Menengah (OKU, dekat Baturaja/Lubuklinggau) | `travel-palembang-tugumulyo` |

## 🟠 Prioritas 2 — Rute Spesifik Wisata/Pelabuhan (Niche tapi Konversi Tinggi)

Rute pendek ke pelabuhan (ferry ke Bangka Belitung) — intent sangat transaksional
(penumpang mau berangkat kapal). Potensi konversi WA tinggi meski volume pencarian kecil.

| # | Rute (from → to) | File Rute | routeKey (forward) | routeKey (reverse) | Estimasi Intent | Slug Artikel Usulan |
|---|------------------|-----------|--------------------|--------------------|-----------------|---------------------|
| 4 | Palembang → Pelabuhan Tanjung Api-api | `palembang-pelabuhan-tanjung-api-api.md` / `pelabuhan-tanjung-api-api-palembang.md` | `palembang-pelabuhan-tanjung-api-api` | (reverse tidak ada di rute) | Menengah (akses ferry ke Bangka) | `travel-palembang-pelabuhan-tanjung-api-api` |

---

## 📋 Template Saat Menulis (agar autolink aktif)

1. Tulis artikel blog ke `src/content/blog/YYYY-MM-DD-<slug>.md` dengan `kategori: "rute"`.
2. Pastikan body mengandung frasa natural: `travel palembang <kota>` (dan/atau `<kota> palembang`).
3. Daftarkan ke `ROUTE_BLOG_MAP` di `src/utils/internalLinks.ts` untuk **kedua arah**:
   ```ts
   'palembang-muara-beliti': '/blog/travel-palembang-muara-beliti',
   'muara-beliti-palembang': '/blog/travel-palembang-muara-beliti',
   ```
4. Cross-check slug: `grep "^slug:" src/content/blog/*.md` (harus cocok persis).
5. `npm run build` → pastikan exit 0 & tidak ada slug hantu.

## ✅ Checklist Selesai
- [x] `travel-palembang-muara-beliti` (+ reverse `muara-beliti-palembang`) — artikel: `2026-09-27-travel-palembang-muara-beliti.md`
- [x] `travel-palembang-talang-padang` (+ reverse `talang-padang-palembang`) — artikel: `2026-09-27-travel-palembang-talang-padang.md`
- [x] `travel-palembang-tugumulyo` (+ reverse `tugumulyo-palembang`) — artikel: `2026-09-27-travel-palembang-tugumulyo.md`
- [x] `travel-palembang-pelabuhan-tanjung-api-api` (forward saja, rute reverse tidak ada) — artikel: `2026-09-27-travel-palembang-pelabuhan-tanjung-api-api.md`

## 📊 Ringkasan
- Total rute di `src/content/rute/`: 54 file (27 pasang forward/reverse, beberapa unik)
- Sudah punya artikel blog & terpetakan: 50 rute (forward/reverse)
- **Belum punya artikel: 4 rute unik (Muara Beliti, Talang Padang, Tugumulyo, Pelabuhan Tanjung Api-api)**
- Dampak: 4 rute di atas saat ini autolink-nya mengarah ke landing page `/[from]/[to]`
  (tidak terindeks). Setelah artikel dibuat & dipetakan, autolink beralih ke `/blog/...`.
