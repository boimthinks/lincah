# Daftar Artikel Blog & Antrian Rencana — Lincah Travel

Dokumen pusat penjadwalan artikel blog. Berisi mekanisme produksi, tabel artikel yang sudah terbit, dan antrian judul yang direncanakan terbit berkala.

> Sebelum menulis artikel, baca `SUMBER-PENGETAHUAN.md` (data brand, rute, harga, armada, frontmatter schema) dan gunakan skill **`penulis-ahli`**.

---

## Mekanisme Produksi Artikel

Alur kerja saat diminta menerbitkan artikel baru:

1. **Usulan judul** — Saat Anda minta beberapa judul, saya berikan **3–5 opsi** (diambil dari antrian di bawah atau ide baru) beserta singkatan/poin utamanya.
2. **Pemilihan** — Anda memilih satu judul.
3. **Outline** — Saya susun outline artikel (struktur H2/H3, poin utama, data pendukung dari `SUMBER-PENGETAHUAN.md`) untuk Anda setujui terlebih dahulu.
4. **Penulisan** — Artikel ditulis sesuai outline + skill `penulis-ahli`, dengan frontmatter schema blog (`src/content.config.ts`) dan nama file `YYYY-MM-DD-slug.md` di `src/content/blog/` (YYYY-MM-DD = tanggal terbit hari ini).
5. **Update antrian** — Judul yang sudah terbit dicoret di antrian bawah (`- [x] ~~judul~~`) lalu ditandai file artikelnya, sebagai arsip.
6. **Update tabel terbit** — Tambahkan baris baru berisi `File`, `judul_seo`, dan `description` aktual artikel ke tabel di bawah ini.

### Contoh hasil update setelah 1 artikel terbit

Antrian:

- [x] ~~Travel Palembang Sekayu Door to Door: Jadwal, Harga Tiket & Panduan Rute 2026~~ → `2026-08-10-travel-palembang-sekayu.md`

Tabel terbit (baris baru ditambahkan):

| # | File | judul_seo | description |
|---|------|-----------|-------------|
| 25 | `2026-08-10-travel-palembang-sekayu.md` | Travel Palembang Sekayu Door to Door: Jadwal, Harga Tiket & Panduan Rute 2026 | ... description aktual artikel ... |

---

## Tabel Artikel Terbit

| # | File | judul_seo | description |
|---|------|-----------|-------------|
| 1 | `2026-06-12-rute-palembang-lampung-tol-favorit.md` | Mengapa Rute Palembang-Lampung via Tol Trans-Sumatera Jadi Favorit Mahasiswa dan Pekerja | Analisis lengkap rute travel Palembang-Lampung via Tol Trans-Sumatera. Temukan durasi, harga, jadwal, dan mengapa rute ini menjadi favorit mahasiswa dan pekerja. |
| 2 | `2026-06-13-hiace-premio-vs-innova-reborn.md` | Perbandingan Toyota Hiace Premio dan Innova Reborn: Mana yang Lebih Cocok untuk Perjalanan Dinas di Sumatera Selatan | Perbandingan jujur Toyota Hiace Premio dan Innova Reborn untuk perjalanan dinas di Sumatera Selatan. Pelajari kapasitas, fitur, dan kapan harus memilih masing-masing armada. |
| 3 | `2026-06-14-panduan-booking-travel-bandara-smb-ii.md` | Panduan Lengkap Booking Travel Door-to-Door dari Bandara Sultan Mahmud Badaruddin II Palembang | Panduan langkah demi langkah booking travel dari Bandara SMB II Palembang ke berbagai kota tujuan. Tips koordinasi dengan admin dan persiapan perjalanan. |
| 4 | `2026-06-15-travel-palembang-jambi-dinas.md` | Travel Palembang ke Jambi untuk Perjalanan Dinas: Pilihan Armada, Harga, dan Tips Efisien | Panduan lengkap travel Palembang ke Jambi untuk perjalanan dinas. Pelajari pilihan armada, harga, jadwal, dan tips agar perjalanan Anda efisien dan nyaman. |
| 5 | `2026-06-16-rekomendasi-hotel-dekat-travel-palembang.md` | Rekomendasi Hotel di Palembang yang Dekat dengan Titik Penjemputan Travel Lincah | Daftar hotel terbaik di Palembang yang strategis untuk traveler. Dekat titik penjemputan travel, mudah diakses, dan cocok untuk perjalanan bisnis maupun liburan. |
| 6 | `2026-06-17-avanza-veloz-travel-prabumulih.md` | Toyota Avanza/Veloz untuk Travel Palembang-Prabumulih: Pilihan Ekonomis yang Tetap Nyaman | Mengapa Toyota Avanza/Veloz menjadi armada favorit untuk travel Palembang-Prabumulih. Harga ekonomis, jadwal fleksibel, dan perjalanan hanya 2 jam. |
| 7 | `2026-06-18-tips-aman-pilih-travel.md` | Tips Aman Memilih Travel Door-to-Door untuk Perjalanan Jarak Jauh di Sumatera Selatan | Panduan memilih travel door-to-door yang aman dan terpercaya di Sumatera Selatan. Cek armada, driver, harga transparan, dan testimoni pelanggan. |
| 8 | `2026-06-19-perjalanan-danau-ranau.md` | Perjalanan Palembang ke Danau Ranau: Destinasi Wisata Tersembunyi Sumatera Selatan | Panduan perjalanan dari Palembang ke Danau Ranau menggunakan travel door-to-door. Temukan harga, durasi, dan tips wisata di danau vulkanik terbesar di Sumatera. |
| 9 | `2026-06-20-travel-palembang-lampung-via-tol.md` | Travel Palembang Lampung via Tol: Panduan Lengkap Perjalanan Nyaman | Panduan lengkap travel Palembang Lampung via Tol Trans-Sumatera. Temukan rute, jadwal, durasi 4,5 jam, dan tips booking kursi nyaman bersama Lincah Travel. |
| 10 | `2026-06-21-travel-palembang-ke-betung-rekomendasi-hotel.md` | Rekomendasi Hotel dan Penginapan Terbaik untuk Travel Palembang ke Betung | Rekomendasi hotel dan penginapan terbaik untuk travel Palembang ke Betung dengan Lincah Travel. Temukan pilihan penginapan nyaman dan aman. |
| 11 | `2026-07-11-atasi-keterlambatan-travel-palembang-jambi-musim-hujan.md` | Bagaimana Kami Mengatasi Keterlambatan di Rute Palembang Jambi Selama Musim Hujan | Bedah tuntas strategi Lincah Travel mengatasi kendala keterlambatan rute Palembang-Jambi saat musim hujan. Simak proses, data, dan pelajaran yang kami petik. |
| 12 | `2026-07-25-travel-palembang-jambi-berbasis-palembang.md` | Travel Palembang Jambi — Kenapa Pilih yang Berbasis Langsung di Palembang? | Cari travel Palembang Jambi andalan? Pilih yang berbasis langsung di Palembang. Harga Rp 200.000, door-to-door, armada nyaman. Pesan via WhatsApp 0813-6923-1893. |
| 13 | `2026-07-28-travel-palembang-baturaja-door-to-door.md` | Travel Palembang Baturaja Door to Door Terbaik 2026: Jadwal, Harga Tiket & Rute | Travel Palembang Baturaja door-to-door mulai Rp120.000. Cek jadwal keberangkatan, pilihan armada Hiace/Innova/Avanza, dan cara booking via WhatsApp 24 jam. |
| 14 | `2026-07-30-travel-palembang-lubuklinggau.md` | Travel Palembang Lubuk Linggau Door to Door: Harga Tiket, Jadwal & Tips Perjalanan 2026 | Travel Palembang Lubuklinggau door-to-door Rp200.000. Cek jadwal 09:00/16:00/20:00 WIB, armada Hiace/Innova/Avanza, dan tips perjalanan 7-8 jam via Lintas Sumatera. |
| 15 | `2026-07-31-travel-palembang-pagaralam.md` | Travel Palembang Pagaralam Door to Door: Harga Tiket, Jadwal & Tips 2026 | Travel Palembang Pagaralam door-to-door Rp180.000. Cek jadwal 08:00/15:00/20:00 WIB, armada Hiace/Innova/Avanza, tips sejuk Gunung Dempo & wisata wajib 2026. |
| 16 | `2026-08-02-travel-palembang-kuala-tungkal.md` | Travel Palembang Kuala Tungkal Lintas Provinsi: Rute, Harga Tiket & Tips Perjalanan | Pesan travel door-to-door Palembang Kuala Tungkal dengan Lincah Travel. Cepat, aman, nyaman. Cek rute, harga tiket Rp 400.000, & tips perjalanan via WhatsApp 0813-6923-1893! |
| 17 | `2026-08-03-travel-palembang-kayu-agung.md` | Travel Palembang Kayu Agung Door-to-Door: Jadwal, Harga Tiket & Destinasi Wisata 2026 | Travel Palembang Kayu Agung door-to-door Rp100.000. Cek jadwal 07:00-18:00 WIB, armada Hiace/Innova/Avanza, & destinasi wisata tak terlupakan: Dinesti Land, Danau Teloko, Masjid Agung Solihin. |
| 18 | `2026-08-04-travel-palembang-muara-enim.md` | Travel Palembang Muara Enim: Jadwal, Harga Tiket & Rute 2026 | Travel Palembang Muara Enim Rp150.000 door-to-door. Jadwal 08.00-20.00 WIB, armada Hiace/Innova/Avanza, antar sampai area tambang. Booking 0813-6923-1893. |
| 19 | `2026-08-06-rekap-harga-travel-sumatera-selatan.md` | Rekap Harga Travel Palembang ke 10 Kota Sumatera Selatan 2026 | Rekap tarif travel Palembang ke 10 kota 2026, mulai Rp50.000. Cek harga & durasi Baturaja, Jambi, Lampung. Pesan via WhatsApp 0813-6923-1893. |
| 20 | `2026-08-06-travel-palembang-lahat.md` | Travel Palembang Lahat Door to Door: Harga, Jadwal & Tips Kota Teh 2026 | Travel Palembang Lahat door-to-door Rp200.000, 5-6 jam via Lintas Sumatera. Cek jadwal 08:00/14:00/20:00 WIB dan tips naik ke Kota Teh. Pesan di WhatsApp 0813-6923-1893. |
| 21 | `2026-08-07-jemputan-bandara-smb-ii-palembang.md` | Jemputan Pas Mendarat Bandara SMB II Palembang Door-to-Door 2026 | Jemputan pas mendarat di Bandara SMB II Palembang door-to-door. Titik jemput di area Sukarami, koordinasi real-time dengan driver, dan armada bagasi luas. Hubungi admin via WhatsApp. |
| 22 | `2026-08-07-travel-palembang-muara-dua.md` | Travel Palembang Muara Dua Door to Door: Harga Tiket, Jadwal & Tips Perjalanan 2026 | Travel Palembang Muara Dua door-to-door Rp170.000. Cek jadwal 09:00/15:00/21:00 WIB, armada Hiace/Innova/Avanza, dan tips perjalanan 7-8 jam menembus Bukit Barisan OKU Selatan. |
| 23 | `2026-08-08-travel-jambi-bangko-door-to-door.md` | Travel Jambi Bangko Door to Door Terbaik 2026: Harga & Jadwal | Travel Jambi Bangko Rp200.000 door-to-door. Jadwal 08.00-20.00 WIB, armada Hiace/Innova/Avanza, jemput alamat. Booking via WA 0813-6923-1893. |
| 24 | `2026-08-08-travel-palembang-bayung-lencir.md` | Travel Palembang Bayung Lencir Door to Door: Jadwal, Harga Tiket & Panduan 2026 | Travel Palembang Bayung Lencir Rp200.000 door-to-door, 4-5 jam via Lintas Timur. Jadwal 08:00/14:00/19:00 WIB. Booking WhatsApp 0813-6923-1893. |
| 25 | `2026-08-10-travel-palembang-sekayu.md` | Travel Palembang Sekayu Door to Door: Jadwal, Harga Tiket & Panduan Rute 2026 | Travel Palembang ke Sekayu door-to-door mulai Rp100.000. Cek jadwal keberangkatan 08.00/13.00/16.00 WIB, pilihan armada nyaman, dan booking via WhatsApp 0813-6923-1893. |
| 27 | `2026-08-13-travel-palembang-martapura-oku-timur.md` | Travel Palembang Martapura OKU Timur Door to Door: Jadwal, Harga Tiket & Tips 2026 | Travel Palembang ke Martapura door-to-door mulai Rp160.000. Cek jadwal 09.00/14.00/20.00 WIB, armada Hiace/Innova/Avanza, dan booking via WhatsApp 0813-6923-1893. |

---

## Antrian Rencana Artikel

> Status `[ ]` = belum terbit, `[x]` = sudah terbit (dicoret sebagai arsip).

### Kategori 1: Rute & Destinasi Baru (Ekspansi Rute Sumatera)

- [x] ~~Travel Palembang Sekayu Door to Door: Jadwal, Harga Tiket & Panduan Rute 2026~~ → `2026-08-10-travel-palembang-sekayu.md`
  - Panduan lengkap perjalanan travel dari Palembang ke Sekayu (Muba), mencakup estimasi durasi 3–4 jam, jadwal keberangkatan harian, dan layanan antar ke pusat pemerintahan/perkantoran Sekayu.
- [x] ~~Travel Palembang Martapura OKU Timur: Harga Tiket, Armada, dan Tips Perjalanan~~ → `2026-08-13-travel-palembang-martapura-oku-timur.md`
  - Mengulas layanan travel door-to-door rute Palembang menuju Martapura, termasuk informasi tarif, titik penjemputan, dan jadwal fleksibel untuk penumpang umum maupun dinas.
- [ ] **Travel Palembang Pendopo Pali: Solusi Transportasi Cepat dan Aman Sampai Tujuan**
  - Panduan rute travel Palembang ke Pendopo (Kabupaten PALI) via perlintasan darat, harga tiket terjangkau, serta kemudahan antar-jemput hingga alamat rumah/lokasi kerja.
- [x] ~~Travel Palembang Indralaya (Ogan Ilir): Pilihan Efisien untuk Mahasiswa Unsri dan Pekerja~~ → `2026-08-11-travel-palembang-indralaya-unsri.md`
  - Menyoroti rute singkat Palembang–Indralaya, jadwal keberangkatan intensif harian, layanan khusus antar-jemput area kampus Unsri Indralaya, serta opsi armada Avanza/Innova.
- [ ] **Travel Palembang Muara Rupit (Muratara): Jadwal Keberangkatan & Tarif Tiket Terbaru 2026**
  - Informasi perjalanan jarak jauh lintas kabupaten dari Palembang ke Muara Rupit, tips kenyamanan selama 8–9 jam perjalanan, dan kesiapan armada Hiace/Innova.
- [ ] **Travel Palembang Pekanbaru Lintas Sumatera: Rute, Harga Tiket, dan Tips Perjalanan Jauh**
  - Panduan rute ekspansi inter-provinsi dari Palembang menuju Pekanbaru, jadwal rute malam, tempat istirahat (rest area) di sepanjang Jalinteng/Jalintim, dan fasilitas bagasi.
- [ ] **Travel Palembang Padang via Jalinteng: Estimasi Waktu, Harga Tiket & Keamanan Armada**
  - Mengulas opsi travel perlintasan Sumatera Barat dari Palembang, tips menghadapi rute bergelombang/perbukitan, serta kenyamanan suspensi Hiace Premio/Innova.

### Kategori 2: Layanan Charter, Rental & Corporate Event (B2B & Group)

- [ ] **Sewa Mobil Innova Reborn dan Hiace Premio Drop Off Palembang: Solusi Praktis Perjalanan Dinas**
  - Panduan layanan charter/drop-off khusus (satu mobil penuh) untuk keperluan kunjungan kerja, tamu VIP instansi, atau perjalanan bisnis tanpa bergabung dengan penumpang lain.
- [ ] **Jasa Travel dan Charter Armada untuk Acara Pernikahan (Wedding) Rombongan Keluarga di Palembang**
  - Solusi transportasi antar-jemput rombongan keluarga besan dari luar kota (seperti Jambi/Lampung/Baturaja) menuju lokasi akad atau resepsi di Palembang.
- [ ] **Panduan Charter Bus Pariwisata & Hiace Lincah Travel untuk Event / Gathering Perusahaan**
  - Edukasi tata cara pemesanan armada rombongan corporate gathering atau outbound kantor, pilihan armada dari van hingga medium bus, serta transparansi biaya.
- [ ] **Layanan Kirim Paket Kilat (Express Cargo) via Travel Palembang: Barang Sampai di Hari yang Sama**
  - Mengenalkan pemanfaatan bagasi travel untuk pengiriman dokumen penting atau paket barang cepat (same-day delivery) antarkota di Sumsel dan Jambi.
- [ ] **Sewa Hiace / Innova untuk City Tour Palembang: Keliling Tempat Wisata & Kuliner Pempek**
  - Paket sewa armada harian plus driver untuk wisatawan yang ingin mengeksplorasi Jembatan Ampera, Museum SMB II, Kemaro, dan pusat berburu oleh-oleh pempek di Palembang.

### Kategori 3: Panduan Wisata & Itinerary Spesifik (Lokal Sumatera)

- [ ] **Panduan Wisata Kuliner Palembang: 10 Tempat Makan Pempek dan Es Kacang Merah Asli yang Wajib Dikunjungi**
  - Rekomendasi wisata kuliner legendaris di Palembang yang mudah dijangkau dengan penjemputan travel atau armada city tour Lincah Travel.
- [ ] **Itinerary 3 Hari 2 Malam Liburan Sejuk di Pagaralam: Dari Kebun Teh Dempo hingga Air Terjun Lematang**
  - Panduan rencana perjalanan liburan singkat ke Pagaralam memanfaatkan travel harian Palembang-Pagaralam, rekomendasi penginapan, dan tempat wisata populer.
- [ ] **Panduan Wisata Danau Ranau dari Palembang: Rute Terbaik, Penginapan, dan Aktivitas Seru**
  - Detail perjalanan menuju Danau Ranau via Muara Dua/Baturaja, opsi transportasi travel door-to-door, serta spot foto dan kegiatan water sport di lokasi.
- [ ] **Panduan Liburan Rombongan ke Dinesti Land Kayuagung: Harga Tiket Masuk & Rute Travel**
  - Mengulas destinasi wisata wahana keluarga terbaru di Kayuagung (OKI), estimasi waktu tempuh dari Palembang via Tol, serta aksesibilitas armada travel.

### Kategori 4: Tips Perjalanan, Operasional & Fitur Armada

- [ ] **Perbedaan Toyota Avanza, Innova Reborn, dan Hiace Premio: Pilih Armada Travel Sesuai Kebutuhan Anda**
  - Artikel komparasi komprehensif yang membandingkan 3 armada utama Lincah Travel dari segi jumlah kursi, ruang kaki (legroom), kapasitas bagasi, dan tingkat kenyamanan.
- [ ] **Tips Mengatur Bagasi Bawaan Saat Naik Travel Door-to-Door Agar Tidak Overload**
  - Panduan batas muatan bagasi gratis per penumpang, cara mengemas koper/dus agar muat di bagasi Hiace/Innova, dan aturan membawa barang pecah belah.
- [ ] **Cara Mengatasi Mual Perjalanan (Mabuk Darat) Saat Melintasi Jalur Lintas Sumatera yang Berbelok**
  - Tips kesehatan praktis bagi penumpang travel rute perbukitan (seperti Pagaralam, Lahat, atau Muara Dua), mulai dari posisi duduk ideal hingga persiapan obat pribadi.
- [ ] **Keuntungan Naik Travel Malam (Overnight Trip) Palembang ke Kota-Kota di Sumatera**
  - Mengulas kelebihan jadwal travel malam (jam 19:00/20:00 WIB), seperti jalanan lebih lengang, hemat waktu istirahat, dan tiba di kota tujuan di pagi hari.
- [ ] **Panduan Penjemputan Travel Door-to-Door di Area Banyuasin dan Musi Banyuasin**
  - Edukasi kepada pelanggan mengenai batas coverage area penjemputan gratis ke rumah/pinggir jalan lintas utama di wilayah Banyuasin dan Sekayu.
- [ ] **Standard Keselamatan Armada Lincah Travel: Perawatan Rutin, Cek Ban, dan Kualifikasi Driver**
  - Artikel transparansi & trust-building mengenai SOP perawatan armada berkala dan penyaringan driver profesional untuk menjamin keamanan penumpang.

### Kategori 5: Edukasi Pemesanan, Finansial & Musiman (SEO Conversions)

- [ ] **Cara Booking Tiket Travel Lincah via WhatsApp 24 Jam: Cepat, Mudah, dan Tanpa Ribet**
  - Panduan step-by-step memesan tiket travel, mulai dari isi form format nama/alamat jemput/tujuan, konfirmasi pembayaran, hingga lacak lokasi driver.
- [ ] **Perbandingan Biaya Naik Travel Door-to-Door vs Naik Bus Umum + Naik Ojek Online**
  - Analisis akumulasi biaya riil perjalanan (door-to-door langsung vs bus terminal yang memerlukan biaya carter/ojek tambahan) untuk membuktikan efisiensi travel.
- [ ] **Tips Mudik Lebaran Nyaman Naik Travel Palembang: Waktu Booking Ideal dan Persiapan Rute**
  - Panduan menghadapi high season mudik, strategi pesan tiket jauh-jauh hari, penyesuaian jadwal keberangkatan, serta penanganan lalu lintas padat.
- [ ] **Panduan Travel untuk Orang Tua / Lansia: Layanan Ekstra Antar-Jemput Sampai Depan Pintu Rumah**
  - Menjelaskan mengapa layanan door-to-door Lincah Travel sangat ramah bagi penumpang usia lanjut yang tidak bisa berdesakan di terminal/stasiun.
- [ ] **Syarat dan Ketentuan Pembatalan (Reschedule) Tiket Travel Lincah yang Wajib Dipahami**
  - Edukasi kebijakan transparan mengenai perubahan jadwal keberangkatan, batas waktu konfirmasi ke admin, dan refund agar perjalanan pelanggan tetap fleksibel.
- [ ] **Rekomendasi Rest Area dan Tempat Makan Enak Jalur Tol Palembang–Lampung**
  - Ulasan spot fasilitas umum, musala, dan tempat makan favorit tempat armada travel berhenti sejenak untuk istirahat di sepanjang tol Trans-Sumatera.
- [ ] **Tips Liburan Hemat Bareng Rombongan Kecil (5–7 Orang) Menggunakan Sewa Innova Reborn**
  - Trik membagi biaya sewa armada (cost-sharing), penyusunan rute efektif, dan fleksibilitas waktu dibanding naik moda transportasi massal.
- [ ] **Mengapa Lincah Travel Jadi Pilihan Utama Travel Door-to-Door di Sumatera Selatan & Jambi**
  - Artikel pillar branding yang merangkum keunggulan Lincah Travel (harga transparan, armada terawat, driver lokal berpengalaman, dan layanan admin WhatsApp 24 jam).
