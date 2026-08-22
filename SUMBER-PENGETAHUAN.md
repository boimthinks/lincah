# SUMBER-PENGETAHUAN — Lincah Travel Palembang

File ini adalah **sumber kebenaran tunggal** untuk semua informasi faktual tentang Lincah Travel (data brand, rute, layanan, harga, testimonial, aturan penulisan, artikel terbit). Gunakan selama menulis artikel atau konten blog di `lincahtravel.web.id`.

---

## 1. Identitas Bisnis

| Atribut | Detail |
|---|---|
| **Brand** | Lincah Travel |
| **Website Utama** | lincahtravel.web.id |
| **Tagline Inti** | "Cepat . Aman . Nyaman" |
| **Layanan Utama** | Travel door-to-door (antar-jemput alamat) di wilayah Sumatera Selatan dan sekitarnya |
| **Area Layanan** | Palembang, Baturaja, Lampung, Jambi, Lubuklinggau, Muara Enim, Lahat, Pagaralam, Betung, Kuala Tungkal, dan kota-kota lain di Sumatera Selatan/Sumatera |
| **WhatsApp Admin** | `6281369231893` |
| **Social Media** | LinkedIn: https://www.linkedin.com/company/lincah-travel/ · TikTok: https://www.tiktok.com/@lincahtravelpalembang · YouTube: https://www.youtube.com/@lincahtravel · Facebook: https://web.facebook.com/profile.php?id=61591225023421 · Pinterest: https://id.pinterest.com/lincahtravel/ |
| **Alamat Kantor** | Lorong Tj. Burung Utama, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30139 |

---

## 2. Nilai Perusahaan & Keunggulan

1. **Door-to-Door Service** — Penjemputan dan pengantaran langsung ke alamat (titik jemput & antar fleksibel per kecamatan).
2. **Armada Terbaru** — Hiace Premio, Innova Reborn, Avanza/Veloz dalam kondisi prima.
3. **Driver Profesional** — Sopir berpengalaman dengan gaya mengemudi aman, paham rute tol & jalur utama.
4. **CS 24/7** — Admin responsif melalui WhatsApp untuk booking dan konsultasi rute.
5. **Harga Transparan** — Tarif jelas tanpa biaya tersembunyi.
6. **Rute Lengkap** — Melayani banyak kota di Sumatera Selatan, Lampung, dan Jambi.

---

## 3. Rute Populer & Harga (Wajib Dicantumkan Jujur)

Gunakan data ini sebagai social proof dalam artikel:

| Rute | Durasi | Via | Harga | Catatan |
|---|---|---|---|---|
| **Palembang-Lampung** | 4.5 jam | Tol Trans-Sumatera | Rp 300.000 | Favorit perjalanan umum |
| **Palembang-Jambi** | 5 jam | - | Rp 200.000 | Favorit perjalanan dinas |
| **Palembang-Baturaja** | 3 jam | - | Rp 120.000 | Door-to-door service |
| **Palembang-Lubuklinggau** | 4 jam | - | Rp 200.000 | Akses ke Bengkulu |
| **Palembang-Prabumulih** | 2 jam | - | Rp 120.000 | Ekonomis |
| **Palembang-Muara Enim** | 4-5 jam | - | Rp 150.000 | Akses area industri & tambang |
| **Palembang-Lahat** | 5-6 jam | - | Rp 200.000 | Akses dataran tinggi |
| **Palembang-Indralaya** | 45 menit | Tol | Rp 100.000 | Akses Kampus UNSRI |

**Sumber data:** `src/content/rute/*.md`

---

## 4. Armada (Opsional jika tertarik pengunjung)

| Armada | Kapasitas | Fitur Kunci |
|---|---|---|
| **Toyota Hiace Premio** | 11 penumpang | Full AC double blower, reclining seats, USB chargers |
| **Toyota Innova Reborn** | 7 penumpang | Captain seats, privat & eksklusif |
| **Toyota Avanza/Veloz** | 6 penumpang | AC double blower, harga ekonomis |

---

## 5. Testimoni Pelanggan (Social Proof)

Gunakan testimoni ini sebagai social proof dalam artikel (kutip langsung jika relevan):

- **Rian Hidayat** (Pengusaha, Palembang) — Rute Baturaja-Palembang, Hiace Premio, penjemputan tepat waktu.
- **Sarah Amelia** (Mahasiswi, Lampung) — Rute Palembang-Lampung via Tol, 4.5 jam, admin fast response.
- **Hadi Wijaya** (Dinas Pemerintahan, Jambi) — Rute Palembang-Jambi, Innova Reborn privat, driver sopan.

---

## 6. Frontmatter Schema Blog

Gunakan format ini setiap artikel blog (nama file = tanggal):

```yaml
---
title: "Judul pendek maksimal 5 kata"
judul_seo: "Judul panjang SEO/GEO maksimal 12 kata tanpa titik dua"
slug: "slug-huruf-kecil-dengan-pemisah"
description: "Meta description 120-155 karakter mengandung GEO modifier dan CTA"
pubDate: "YYYY-MM-DD"
author: "Tim Konten Lincah Travel"
image_url: "/img/blog/nama-gambar.jpg"
kategori: "rute" | "armada" | "tips" | "lokal"
pengantar: "Satu paragraf pengantar yang engaged dan menyentuh masalah pembaca"
kesimpulan: "Satu paragraf kesimpulan solutif + ajakan booking via WhatsApp"
tags: ["travel", "palembang", "nama-kota-tujuan"]
---
```

**Catatan:**
- `judul_seo` = H1 dan meta title tag
- `kategori` = rute | armada | tips | lokal
- Daripada menulis new path, gunakan format tanggal di judul file

---

## 7. Aturan Proyek (Obligatory)

Langggar larangan ini akan menghancurkan konten SEO:

- **No emoji** di dalam artikel (judul/poin bulleted).
- **No Hanzi/Karakter Cina** di dalam body, frontmatter, atau alt text.
- **Tanggal artikel** = hari ini saat menulis (jangan buat tanggal fiktif di masa depan, sekarang tanggal 19 Juni 2026).
- **Satu paragraf maksimal 3-4 kali kalimat**.
- **Tidak ada URL kaki** (links ke navigasi, bukan internal link) — gunakan internal link untuk struktur SEO.
- **Judul file = tanggal** (format: `YYYY-MM-DD-slug.md`) — sesuai Astro Content Collections.

---

## 8. Daftar Artikel yang Sudah Terbit (Untuk Anti-Duplikasi)

Validasi ini WAJIB dilakukan saat meminta saran judul ATAU menulis artikel.

### Rute yang Sudah Ada Artikelya (Skip/DITOLAK)
| Rute | Status Artikel | File |
|---|---|---|
| Palembang-Baturaja | ✅ Ada | `2026-07-28-travel-palembang-baturaja-door-to-door.md` |
| Palembang-Lampung | ✅ Ada | `2026-06-20-travel-palembang-lampung-via-tol.md` |
| Palembang-Jambi | ✅ Ada | `2026-06-15-travel-palembang-jambi-dinas.md` & lainnya |
| Palembang-Prabumulih | ✅ Ada | `2026-06-17-avanza-veloz-travel-prabumulih.md` |
| Palembang-Lubuklinggau | ✅ Ada | `2026-07-30-travel-palembang-lubuklinggau.md` |
| Palembang-Pagaralam | ✅ Ada | `2026-07-31-travel-palembang-pagaralam.md` |
| Palembang-Danau Ranau | ✅ Ada | `2026-06-19-perjalanan-danau-ranau.md` |
| Palembang-Betung | ✅ Ada | `2026-06-21-travel-palembang-ke-betung-rekomendasi-hotel.md` |
| Palembang-Kayu Agung | ✅ Ada | `2026-08-03-travel-palembang-kayu-agung.md` |
| Palembang-Kuala Tungkal | ✅ Ada | `2026-08-02-travel-palembang-kuala-tungkal.md` |
| Palembang-Muara Enim | ✅ Ada | `2026-08-04-travel-palembang-muara-enim.md` |
| Palembang-Lahat | ✅ Ada | `2026-08-06-travel-palembang-lahat.md` |
| Palembang-Muara Dua | ✅ Ada | `2026-08-07-travel-palembang-muara-dua.md` |
| Palembang-Bayung Lencir | ✅ Ada | `2026-08-08-travel-palembang-bayung-lencir.md` |
| Palembang-Sekayu | ✅ Ada | `2026-08-10-travel-palembang-sekayu.md` |
| Palembang-Indralaya | ✅ Ada | `2026-08-11-travel-palembang-indralaya-unsri.md` |
| Palembang-Martapura | ✅ Ada | `2026-08-13-travel-palembang-martapura-oku-timur.md` |
| Palembang-Tebing Tinggi (Empat Lawang) | ✅ Ada | `2026-08-14-travel-palembang-tebing-tinggi-empat-lawang.md` |

### Rute Belum Ada Artikelya (PRIORITAS TINGGI)
| Rute | Prioritas | Alasan |
|---|---|---|
| Palembang-Belitang | 🔴 Tinggi | Wilayah OKU Timur, pusat pertanian & bisnis |
| Palembang-Tanjung Enim | 🟡 Sedang | Kawasan tambang & industri dekat Muara Enim |
| Palembang-Sungai Lilin | 🟡 Sedang | Jalur Lintas Timur Palembang - Jambi |
| Palembang-Sungai Lilin | 🟡 Sedang | Jalur Lintas Timur Palembang - Jambi |

---

## 9. Topik Rekomendasi (Open)

Topik-topik ini bisa dikembangkan, belum memiliki artikel:

1. Travel Palembang-Muara Enim (tipe beda, lebih kompleks)
2. Travel Palembang-Lahat (kemungkinan heavy traffic di Tol)
3. Mengapa Hiace Premio lebih nyaman untuk rute <?= "nama rute" ?>

Jika menulis topik yang sudah ada artikelnya, **dilarang** kecuali ada pembaruan signifikan (harga berubah, armada baru, pengalaman pelanggan terbaru) atau angle berbeda (misal dari sisi hotel, wisata, atau perjalanan dinas).

---

## 10. Lokasi Data Referensi

- **Testimoni:** `src/content/testimonials/`
- **Rute:** `src/content/rute/*.md`
- **Armada:** `src/content/vehicles/`
- **Hotel per kota:** `src/content/hotels/*`

---

## 11. Cara Menulis Artikel (intinya—praktik ril via skill)

Gunakan skill `penulis-ahli` untuk seluruh penulisan artikel blog. Skill ini menggabungkan:

**(1) Humanizer** — menghilangkan pola AI (em dash, kosakata khas AI, banal kalimat).
**(2) SEO & GEO** — optimasi mesin pencari dan AI Overviews (Google AI Optimization 2026).
**(3) Konten non-komoditas** — sudut pandang unik, E-E-A-T, dan data lokal.

**Proses:**
1. Baca file ini (SUMBER-PENGETAHUAN.md) untuk data brand, rute, harga, testimonial.
2. Gunakan skill `penulis-ahli` untuk menulis—skill ini akan mengintegrasikan semua prinsip.
3. Sebelum menyimpan, cek: (a) wasmulya email mengarang data, (b) no emoji/Hanzi, (c) frontmatter schema benar, (d) paragraf ≤ 3-4 kalimat.

---

**Catatan:** Arahkan semua riset saran judul atau penulisan artikel ke skill `penulis-ahli`. File ini FOKUS pada data/identitas brand, bukan panduan penulisan universal.