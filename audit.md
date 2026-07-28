## 1. Audit Google Search Console (GSC) & Technical SEO

### A. Kesalahan Kritis Domain pada `robots.txt` (Sangat Fatal!)
* **Temuan:** File `https://lincahtravel.web.id/robots.txt` mengarahkan crawler ke sitemap yang salah:
  ```text
  User-agent: *
  Allow: /
  Sitemap: https://lincah.web.id/sitemap-index.xml   <-- SALAH DOMAIN (kurang kata 'travel')
  ```
* **Dampak GSC:** Googlebot yang membaca `robots.txt` akan mencoba mengambil sitemap dari domain lain (`lincah.web.id`), sehingga memicu error *“Sitemap could not be fetched”* atau menghambat proses pengindeksan rute-rute baru.
* **Solusi:** Segera ubah baris tersebut menjadi:
  ```text
  Sitemap: https://lincahtravel.web.id/sitemap-index.xml
  ```

### B. Ancaman "Thin Content / Doorway Pages" pada 31 Halaman Kota
* **Temuan:** Berdasarkan audit file `sitemap-0.xml` (berisi 96 URL), terdapat **31 halaman kategori kota** (contoh: `/baturaja/`, `/lampung/`, `/jambi/`, `/batu-marta/`). Saat diperiksa, halaman-halaman tersebut hanya memiliki **~160 kata total** (termasuk menu & footer), dan isi utamanya hanya 1 baris tabel rute tanpa artikel, deskripsi lokal, maupun FAQ.
* **Dampak GSC:** Halaman dengan konten sangat tipis (*thin content*) hampir pasti akan mendapat status peringatan di GSC:
  * *“Crawled - currently not indexed”* (Sudah dirayapi tetapi tidak diindeks)
  * *“Discovered - currently not indexed”*
  * Atau berisiko dianggap sebagai **Doorway Page / Soft 404** oleh Google karena dianggap kurang bernilai.
* **Solusi:**
  * **Opsi 1 (Cepat):** Berikan tag `<meta name="robots" content="noindex, follow">` pada halaman kota tunggal yang minim konten, agar Googlebot fokus mengindeks halaman rute lengkap (seperti `/baturaja/palembang/` yang panjangnya sudah 800+ kata) dan artikel blog.
  * **Opsi 2 (Organik maksimal):** Tambahkan minimal 400–500 kata deskripsi lokal di setiap halaman kota tersebut (misal: area penjemputan di kota tersebut, jadwal keberangkatan harian, dan keunggulan travel door-to-door setempat).

### C. Pelacakan Analitik & Verifikasi GSC
* **Temuan:** Di kode HTML halaman utama, tidak ditemukan script pelacak seperti **Google Analytics 4 (GA4)**, **Google Tag Manager (GTM)**, maupun tag meta verifikasi GSC.
* **Saran:** Pastikan verifikasi Google Search Console sudah dilakukan (misalnya melalui DNS TXT Record) dan pasang GA4 agar Anda dapat mengukur halaman mana yang paling banyak menghasilkan konversi klik ke tombol WhatsApp.

---

## 2. Audit SEO On-Page, Schema Markup & Performa (Astro v7)

### A. Meta Description Sangat Pendek & Duplikat Massal (32 Karakter)
* **Temuan:** Halaman utama (`/`), `/travel/`, `/tentang-kami/`, `/rental/`, `/blog/`, serta seluruh 31 halaman kota menggunakan Meta Description yang identik dan terlalu singkat:
  ```html
  <meta content="Layanan Lincah Travel Terpercaya" name="description"/>
  ```
* **Dampak SEO:** Google merekomendasikan panjang Meta Description antara **120–155 karakter**. Meta description 32 karakter yang diduplikasi ke puluhan halaman akan menurunkan *Click-Through Rate (CTR)* di hasil pencarian dan menimbulkan peringatan *"Duplicate meta descriptions"* pada audit SEO.
* **Solusi:** Tulis Meta Description yang unik dan persuasif di halaman-halaman utama.
  * *Contoh Homepage:* `"Lincah Travel Palembang: Layanan antar jemput door to door rute Baturaja, Lampung, Jambi & seluruh Sumsel. Armada Hiace/Innova VIP, harga mulai Rp120rb. Pesan via WA 24 jam!"`

### B. Tidak Ada Tag Open Graph (OG Meta Tags) pada Halaman Inti
* **Temuan:** Halaman utama (`/`), `/travel/`, `/kontak/`, `/rental/`, dan `/tentang-kami/` **tidak memiliki meta tag Open Graph** (`og:title`, `og:description`, `og:image`). Tag ini saat ini hanya muncul pada artikel blog dan sebagian halaman rute.
* **Dampak:** Ketika tautan utama website dibagikan ke WhatsApp, Telegram, atau media sosial, tautan tidak memunculkan gambar thumbnail, judul, dan ringkasan yang profesional.

### C. Hierarki Heading (H1–H4) yang Melompat & Kesalahan Spasi pada Teks H1
* **Temuan Hierarki Heading:**
  * Di Homepage, setelah tag `<H1>`, heading langsung melompat ke `<H3>` (*"Pesan Cepat Sekarang"*), tanpa melewati `<H2>` terlebih dahulu.
  * Pada bagian testimoni dan footer, heading melompat dari `<H2>` ke `<H4>`.
  * Pada halaman `/validasi/`, **tidak ditemukan tag `<H1>` sama sekali**.
* **Temuan Kesalahan Spasi di H1 DOM Text:**
  * Pada halaman utama, teks DOM H1 terbaca: `"TravelPalembangProfesional & Tepat Waktu"`.
  * Pada `/travel/`, teks DOM H1 terbaca: `"Harga dan RuteLincah Travel Palembang"`.
  * *Penyebab:* Penggunaan `<span class="...">` yang berdempetan tanpa spasi eksplisit (misal: `Travel<span class="...">Palembang</span>`). Mesin pencari dan *screen reader* membaca kata-kata tersebut menempel.

### D. Kehilangan JSON-LD Schema `FAQPage` di Halaman Utama
* **Temuan:** Halaman utama sudah dilengkapi Schema `TravelAgency`, `WebSite`, dan `Organization` (sangat baik). Namun, pada bagian **"Kemudahan Informasi Keberangkatan Anda" (FAQ)**, **belum terpasang Schema JSON-LD `FAQPage`**.
* **Dampak:** Tanpa Schema `FAQPage`, website kehilangan kesempatan untuk mendapatkan **Rich Snippet FAQ (dropdown Q&A)** di halaman Google SERP yang terbukti meningkatkan CTR organik hingga 20–30%.

### E. Performa Gambar & Ukuran HTML (CLS & External Image Hosting)
* **Temuan Gambar Tanpa Dimensi:** Seluruh 13 gambar `<img />` di Homepage tidak memiliki atribut `width` dan `height` eksplisit. Hal ini dapat memicu **Cumulative Layout Shift (CLS)** di audit Core Web Vitals.
* **Hosting Gambar Eksternal:** Banyak gambar di-host di domain pihak ketiga (`blogger.googleusercontent.com` dan `images.unsplash.com`). Ini menambah keterlambatan DNS Lookup dan berisiko gambar pecah jika tautan eksternal berubah.
* **Ukuran HTML Besar karena Inline SVG:** Ukuran dokumen HTML Homepage mencapai **300 KB** (cukup berat untuk HTML polos). Ternyata **22% (68.000 karakter)** berasal dari 147 tag ikon `<svg>` yang di-inline berulang kali di daftar rute.

---

## 3. Bagian yang Harus Dihilangkan vs. Ditambahkan

### ❌ Bagian yang Harus Dihilangkan / Dikurangi
1. **Domain Salah di `robots.txt`:** Hilangkan `https://lincah.web.id/sitemap-index.xml` dan ganti ke domain yang benar.
2. **Ketergantungan Gambar Pihak Ketiga:** Hilangkan penggunaan gambar dari Blogger (`blogger.googleusercontent.com`) dan Unsplash. Simpan gambar secara lokal di dalam folder proyek (`/public/img/`) dan manfaatkan format kompresi modern (WebP/AVIF).
3. **Duplikasi Halaman Kota yang Tipis dari Indeks Google:** Hilangkan indeksasi (pasang tag `noindex`) pada halaman kategori kota yang kontennya di bawah 200 kata agar *Crawl Budget* Googlebot fokus ke halaman rute (`/baturaja/palembang/`) dan artikel blog.
4. **Penumpukan Inline SVG Berlebih:** Kurangi perulangan SVG inline mentah pada setiap baris rute. Gunakan teknik *SVG Sprite* atau komponen ikon terpusat agar ukuran HTML turun drastis di bawah 100 KB.

### ➕ Bagian yang Harus Ditambahkan / Diperkaya
1. **Schema JSON-LD `FAQPage` pada Homepage & Halaman Rute:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       {
         "@type": "Question",
         "name": "Apakah sistem penjemputannya door-to-door (antar-jemput alamat)?",
         "acceptedAnswer": {
           "@type": "Answer",
           "text": "Ya, kami melayani sistem door-to-door service gratis di dalam area jangkauan kota asal dan tujuan..."
         }
       }
     ]
   }
   ```
2. **Tag Open Graph & Twitter Card Global di Layout Dasar Astro (`Layout.astro`):**
   * Tambahkan `<meta property="og:title" />`, `og:description`, `og:image`, dan `og:url` agar tampilan saat dibagikan di WhatsApp/Telegram selalu muncul dengan thumbnail yang menarik.
3. **Atribut `width` dan `height` Eksplisit pada Setiap `<img />`:**
   * Contoh: `<img src="/img/hiace.webp" width="600" height="400" alt="Toyota Hiace Premio Lincah Travel Palembang" loading="lazy" />`
4. **Teks Narasi SEO (SEO Content Block) di Halaman Utama:**
   * Tambahkan 300–400 kata narasi deskriptif di bagian bawah Homepage yang memuat kata kunci berkonversi tinggi seperti *"travel palembang baturaja door to door"*, *"travel palembang lampung via tol"*, dan *"travel palembang jambi jemput alamat"*.
5. **Perbaikan Spasi Eksplisit pada Heading H1:**
   * Pastikan ada karakter spasi di antara kata dan tag `<span>`, contoh:
     `Travel <span>Palembang</span>` (bukan `Travel<span>Palembang</span>`).


