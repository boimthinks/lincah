# Panduan Pengelolaan Website Lincah Travel

Selamat datang di website resmi **Lincah Travel** (lincah.web.id). Dokumen ini dibuat khusus untuk Anda yang akan mengelola dan memperbarui konten website ini secara rutin.

Website ini dibangun menggunakan **Astro v6** dengan sistem **Static Site Generation (SSG)**, yang artinya semua data rute, hotel, dan transportasi disimpan dalam bentuk file **Markdown** sederhana. Anda **tidak perlu menjadi programmer** untuk menambah atau mengubah konten di website ini.

---

## 🚀 Informasi Teknologi

- **Framework**: [Astro v6](https://astro.build/)
- **Styling**: [Tailwind CSS v4](https://tailwindtailwindcss.com/)
- **Bahasa Markup**: Markdown (`.md`)

---

## 📁 Struktur Folder Konten

Semua data dinamis website disimpan di dalam folder `src/content/`. Berikut adalah penjelasan setiap sub-folder:

- `src/content/rute/` → Data rute perjalanan.
- `src/content/city-images.md` → Pusat pemetaan gambar untuk setiap kota tujuan.
- `src/content/hotels/` → Data hotel per kota.
- `src/content/public_transport/` → Data transportasi umum (bandara, stasiun, terminal, pelabuhan) per kota.
- `src/content/districts/` → Data nama-nama kecamatan per kota.
- `src/content/vehicles/` → Data armada mobil.
- `src/content/testimonials/` → Testimoni pelanggan.
- `src/content/faq/` → Daftar pertanyaan yang sering diajukan.

---

## 🛠️ Cara Menjalankan Website di Komputer Lokal

### 1. Persiapan
Pastikan Anda sudah menginstall **Node.js** di komputer Anda. Anda bisa mendownloadnya di [sini](https://nodejs.org/).

### 2. Install Dependencies
Buka terminal/command prompt di folder project ini, lalu jalankan:
```bash
npm install
```

### 3. Menjalankan Mode Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka browser dan akses [http://localhost:4321](http://localhost:4321) untuk melihat website secara *live-reload* (otomatis berubah saat Anda edit file).

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build akan berada di folder `dist/` dan siap dideploy.

---

## 📝 Cara Mengelola Konten Website

**Penting**: Nama kota **selalu ditulis dalam huruf kecil (lowercase)** di dalam file Markdown. Contoh: `palembang`, `baturaja`, `muara-enim`.

### 1. Menambah atau Mengedit Rute Perjalanan
Buat/edit file di `src/content/rute/` dengan format nama `asal-tujuan.md` (gunakan tanda hubung `-` jika nama kota lebih dari 1 kata).

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
- **from**: Kota asal.
- **to**: Kota tujuan.
- **type**: `utama` untuk rute unggulan, `semua` untuk rute reguler Sumatera Selatan.

### 2. Mengatur Gambar Kota
Buka file `src/content/city-images.md`. Tambahkan atau ubah URL gambar untuk setiap kota:

```yaml
---
cities:
  palembang: "https://link-gambar-palembang.com/image.webp"
  baturaja: "https://link-gambar-baturaja.com/image.webp"
  muara-enim: ""
---
```
- **Cara kerja**: Gambar dari sini akan otomatis muncul di card rute unggulan dan sidebar.
- **Jika kosong** (tidak ada URL), sistem akan otomatis menggunakan gambar dari file rute, atau gambar *placeholder* bawaan.

### 3. Menambah Daftar Hotel per Kota
Buat file baru di `src/content/hotels/` dengan nama file = **slug kota** (huruf kecil, spasi jadi `-`). Contoh: `palembang.md`.

```yaml
---
city: palembang
items:
  - name: "Hotel Santika Radial Palembang"
    image: "https://link-blogspot.com/foto-hotel.jpg"
    address: "Jl. Brigjen HM. Dhani No.168, Palembang"
    phone: "0711-5556655"
  - name: "The Zuri Hotel Palembang"
    image: "https://link-blogspot.com/foto-hotel.jpg"
    address: "Jl. Radial No.1371, Palembang"
    phone: "0711-5556300"
---
```
- **Tips**: Anda bisa langsung menggunakan URL gambar dari Blogspot. Cukup *copy-paste* link gambar dari blog.

### 4. Menambah Daftar Transportasi Umum per Kota
Buat file baru di `src/content/public_transport/` dengan nama = slug kota.

```yaml
---
city: palembang
items:
  - name: "Bandara Sultan Mahmud Badaruddin II"
    type: "Bandara"
    address: "Jl. Bandara SMB II, Sukarami, Palembang"
  - name: "Stasiun Kertapati"
    type: "Stasiun Kereta"
    address: "Kertapati, Palembang"
  - name: "Terminal Alang-Alang Lebar"
    type: "Terminal Bus"
    address: "Jl. Soekarno Hatta, Palembang"
---
```
- **Tipe yang didukung**: `Bandara`, `Stasiun Kereta`, `Terminal Bus`, `Pelabuhan`. Ikon akan muncul secara otomatis sesuai tipe.

### 5. Menambah Daftar Kecamatan per Kota
Buat file baru di `src/content/districts/` dengan nama = slug kota.

```yaml
---
city: palembang
items:
  - "Ilir Barat I"
  - "Sukarami"
  - "Kertapati"
  - "Jakabaring"
---
```

---

## 🔄 Cara Kerja Tampilan Website

- **Halaman Beranda (`/`)**: Menampilkan rute unggulan (gambar besar), daftar harga semua rute, dan form booking.
- **Halaman Rute (`/[asal]/[tujuan]`)** misal `/baturaja/palembang`: Menampilkan detail rute, dan juga akan otomatis menarik **data hotel, transportasi umum, dan kecamatan untuk kedua kota** (asal & tujuan) sebagai informasi jemput dan antar.

---

## 🚀 Upload ke GitHub & Deploy

1. **Inisialisasi Git** (jika belum):
   ```bash
   git init
   git remote add origin https://github.com/boimthinks/lincah.git
   ```

2. **Tambahkan perubahan & Commit**:
   ```bash
   git add .
   git commit -m "Update data rute dan hotel"
   ```

3. **Kirim ke GitHub**:
   ```bash
   git push -u origin master
   ```

4. **Deploy**: Website ini dapat di-*deploy* secara otomatis melalui Netlify, Vercel, atau Cloudflare Pages dengan mendeteksi *push* ke branch `master`.

---

© 2026 Lincah Travel. All rights reserved.