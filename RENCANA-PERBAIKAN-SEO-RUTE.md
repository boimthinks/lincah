# RENCANA PERBAIKAN SEO HALAMAN RUTE `/[from]/[to]`

> **Status:** Disimpan untuk eksekusi nanti. Belum dijalankan.
> **Tujuan:** Menghilangkan konten duplikat/tipis di 56 halaman rute sekaligus memasukkan kata kunci bernilai tinggi hasil riset (harga tiket travel, ongkos travel, agen travel, loket travel, no telp, nomor telepon, mobil travel, travel [from] ke [to]).
> **Keputusan user:** Data `hotels` / `districts` / `public_transport` **TETAP DISIMPAN** (tidak dihapus). Hanya berhenti menampilkannya di halaman rute.
> **Status data (tambahan):** Ketiga data tersebut dijadikan **sumber pengetahuan (knowledge source)** saja — tersimpan sebagai bahan rujukan (mis. untuk menulis artikel/blog, FAQ, atau pembuatan halaman hub kota di masa depan), **tidak dirender** ke halaman rute. Tidak ada penghapusan file/koleksi.

---

## 1. DIAGNOSIS (mengapa Google anggap duplikat)

- File `src/pages/[from]/[to].astro` menyuntikkan 6 blok otomatis dari data kota:
  - `Hotel di [tujuan]` (HotelList)
  - `Transportasi Umum di [tujuan]` (PublicTransportList)
  - `Area Layanan Pengantaran di [tujuan]` (DistrictList)
  - `Wilayah Penjemputan` (DistrictList, asal)
  - `Jemput di Hotel [asal]` (HotelList, asal)
  - `Transportasi Umum di [asal]` (PublicTransportList, asal)
- Palembang menjadi **asal di 29 rute** dan **tujuan di 27 rute** → blok besar yang SAMA persis disalin ke ~56 halaman → sinyal duplikat utama.
- Kata kunci bernilai tinggi **sama sekali belum ada**: judul hanya `Travel [from] [to] Murah…`, tidak ada FAQ/kontak.
- Isi Markdown per rute (`{Content && …}`, baris ~276) sebenarnya **unik & bagus**, hanya tertutup blok templat berulang.

**Solusi:** Hapus ke-6 blok auto-content, lalu ganti dengan section template yang diparameterisasi `from`/`to`/`price` (tiap H2 menyebut rute → unik per halaman) + tambah bagian Kontak/Loket & FAQ.

---

## 2. FILE YANG DIUBAH

### A. `src/pages/[from]/[to].astro`

#### Edit 1 — Hapus import komponen city (ganti dengan RouteFAQ)
**oldString:**
```
import SidebarCTA from '../../components/SidebarCTA.astro';
import HotelList from '../../components/HotelList.astro';
import PublicTransportList from '../../components/PublicTransportList.astro';
import DistrictList from '../../components/DistrictList.astro';
```
**newString:**
```
import SidebarCTA from '../../components/SidebarCTA.astro';
import RouteFAQ from '../../components/RouteFAQ.astro';
```

#### Edit 2 — Hapus fetch data kota (pertahankan cityImages)
**oldString:**
```
const fromHotelsEntry = await getEntry('hotels', fromCitySlug).catch(() => null);
const fromPublicTransportEntry = await getEntry('public_transport', fromCitySlug).catch(() => null);
const fromDistrictsEntry = await getEntry('districts', fromCitySlug).catch(() => null);

const toHotelsEntry = await getEntry('hotels', toCitySlug).catch(() => null);
const toPublicTransportEntry = await getEntry('public_transport', toCitySlug).catch(() => null);
const toDistrictsEntry = await getEntry('districts', toCitySlug).catch(() => null);

const cityImagesEntry = await getEntry('city_images', 'city-images').catch(() => null);
```
**newString:**
```
const cityImagesEntry = await getEntry('city_images', 'city-images').catch(() => null);
```

#### Edit 3 — Hapus konstanta turunan city
**oldString:**
```
const fromHotels = fromHotelsEntry?.data.items || [];
const fromPublicTransport = fromPublicTransportEntry?.data.items || [];
const fromDistricts = fromDistrictsEntry?.data.items || [];

const toHotels = toHotelsEntry?.data.items || [];
const toPublicTransport = toPublicTransportEntry?.data.items || [];
const toDistricts = toDistrictsEntry?.data.items || [];
```
**newString:** (kosong — hapus seluruh blok ini)

#### Edit 4 — Ubah judul + tambah metaDescription
**oldString:**
```
const title = `Travel ${capitalize(from)} ${capitalize(to)} Murah. Lincah Travel Cepat, Aman, Nyaman`;
```
**newString:**
```
const title = `Travel ${capitalize(from)} ke ${capitalize(to)} • Harga Tiket, Agen & Jadwal Lincah Travel`;

const metaDescription = `Harga tiket travel ${capitalize(from)} ${capitalize(to)} mulai Rp ${price.toLocaleString('id-ID')}. Cek ongkos travel, agen & loket travel, pilihan mobil travel, dan nomor telepon 0813-6923-1893. Layanan door-to-door Lincah Travel.`;
```

#### Edit 5 — Layout description
**oldString:**
```
<Layout title={title} description={description || `Layanan travel eksekutif door-to-door dari ${capitalize(from)} ke ${capitalize(to)} dengan harga terjangkau.`}>
```
**newString:**
```
<Layout title={title} description={metaDescription}>
```

#### Edit 6 — og:description
**oldString:**
```
  <meta property="og:description" content={description || `Layanan travel eksekutif door-to-door dari ${capitalize(from)} ke ${capitalize(to)} dengan harga terjangkau.`} />
```
**newString:**
```
  <meta property="og:description" content={metaDescription} />
```

#### Edit 7 — twitter:description
**oldString:**
```
  <meta name="twitter:description" content={description || `Layanan travel eksekutif door-to-door dari ${capitalize(from)} ke ${capitalize(to)} dengan harga terjangkau.`} />
```
**newString:**
```
  <meta name="twitter:description" content={metaDescription} />
```

#### Edit 8 — Product schema description
**oldString:**
```
    "description": description || `Layanan travel eksekutif door-to-door dari ${capitalize(from)} ke ${capitalize(to)} dengan harga terjangkau.`,
```
**newString:**
```
    "description": metaDescription,
```

#### Edit 9 — Hapus 3 blok city "tujuan" (sebelum CTA)
**oldString:**
```
        {/* Displaying 'to' city data */}
        {toHotels.length > 0 && (
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-blue-900 mb-6">Hotel di {capitalize(to)}</h2>
            <HotelList items={toHotels} />
          </div>
        )}
        {toPublicTransport.length > 0 && (
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-blue-900 mb-6">Transportasi Umum di {capitalize(to)}</h2>
            <PublicTransportList items={toPublicTransport} />
          </div>
        )}

        {toDistricts.length > 0 && (
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-blue-900 mb-6">Area Layanan Pengantaran di {capitalize(to)}</h2>
            <DistrictList items={toDistricts} />
          </div>
        )}

```
**newString:** (kosong — hapus seluruh blok ini; CTA di bawahnya tetap ada)

#### Edit 10 — Ganti 3 blok city "asal" + sisipkan section baru (Tarif, Armada, Agen/Loket, FAQ) lalu Content
**oldString:**
```
        {/* Displaying 'from' city data */}
                {fromDistricts.length > 0 && (
                   <div class="mt-12">
                     <h2 class="text-2xl font-bold text-blue-900 mb-6">Wilayah Penjemputan</h2>
                     <p class="text-slate-600 leading-relaxed">
                       Lincah Travel menyediakan layanan antar-jemput alamat (door-to-door) yang memudahkan Anda. Kami siap menjemput Anda yang berada di wilayah {capitalize(from)}, meliputi: {fromDistricts.join(', ')} dan area sekitarnya. Anda tidak perlu repot keluar rumah, driver kami akan menjemput Anda tepat di titik lokasi Anda berada untuk memulai perjalanan menuju {capitalize(to)}.
                     </p>
                   </div>
                 )}
                 {fromHotels.length > 0 && (
                   <div class="mt-12">
                     <h2 class="text-2xl font-bold text-blue-900 mb-6">Jemput di Hotel {capitalize(from)}</h2>
                     <p class="text-slate-600 leading-relaxed">
                       Sedang mencari layanan <strong>travel di dekat hotel di {capitalize(from)}</strong>? Kami melayani penjemputan langsung dari lobby berbagai hotel ternama. Jika Anda menginap di {fromHotels.map((hotel: any) => hotel.name).join(', ')} atau hotel lainnya di pusat kota {capitalize(from)}, Lincah Travel adalah pilihan tepat untuk perjalanan Anda menuju {capitalize(to)}. Perjalanan menjadi lebih praktis tanpa harus mencari transportasi tambahan dari hotel.
                     </p>
                   </div>
                 )}
                 {fromPublicTransport.length > 0 && (
                   <div class="mt-12">
                     <h2 class="text-2xl font-bold text-blue-900 mb-6">Transportasi Umum di {capitalize(from)}</h2>
                     <p class="text-slate-600 leading-relaxed">
                       Kami juga melayani penjemputan dari titik-titik transportasi umum utama di {capitalize(from)}. Bagi Anda yang baru saja tiba melalui {fromPublicTransport.map((item: any) => item.name).join(', ')}, Anda bisa langsung memesan layanan kami untuk pengantaran langsung ke alamat tujuan di {capitalize(to)} dengan nyaman, aman, dan tepat waktu.
                     </p>
                   </div>
                  )}

        {Content && (
          <div class="route-content max-w-none mt-10 mb-10">
            <Content />
          </div>
        )}
```
**newString:**
```
        {/* BAGIAN BARU: TARIF & HARGA — target keyword "harga tiket travel", "ongkos travel" */}
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-blue-900 mb-6">Harga Tiket Travel {capitalize(from)} {capitalize(to)}</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            Tarif flat travel {capitalize(from)} ke {capitalize(to)} adalah <strong>Rp {price.toLocaleString('id-ID')}</strong> untuk sekali jalan dengan sistem door-to-door. Harga tersebut sudah termasuk penjemputan dari alamat Anda di {capitalize(from)} dan pengantaran langsung ke tujuan di {capitalize(to)}, tanpa biaya terminal.
          </p>
          <p class="text-slate-600 leading-relaxed">
            Ongkos travel {capitalize(from)} {capitalize(to)} bersifat tetap (flat) untuk seluruh titik jemput dalam area jangkauan kota {capitalize(from)}. Tidak ada biaya tersembunyi; harga sudah all-in door-to-door.
          </p>
        </div>

        <div class="mt-12">
          <h2 class="text-2xl font-bold text-blue-900 mb-6">Ongkos Travel {capitalize(from)} {capitalize(to)}</h2>
          <p class="text-slate-600 leading-relaxed">
            Ongkos travel {capitalize(from)} {capitalize(to)} yang berlaku saat ini adalah <strong>Rp {price.toLocaleString('id-ID')}</strong>. Bandingkan dengan biaya transportasi umum lainnya, layanan travel kami jauh lebih praktis karena menjemput langsung dari pintu rumah Anda dan mengantar hingga ke alamat tujuan.
          </p>
        </div>

        {Content && (
          <div class="route-content max-w-none mt-10 mb-10">
            <Content />
          </div>
        )}

        {/* BAGIAN BARU: AGEN & LOKET TRAVEL + KONTAK — target keyword "agen travel", "loket travel", "no telp", "nomor telepon" */}
        <div class="mt-12 bg-slate-50 border border-slate-200 p-6 sm:p-8">
          <h2 class="text-2xl font-bold text-blue-900 mb-4">Agen & Loket Travel {capitalize(from)} {capitalize(to)}</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            Lincah Travel adalah agen travel yang melayani rute {capitalize(from)} ke {capitalize(to)}. Anda dapat memesan tiket maupun bertanya langsung melalui loket/agen kami, atau cukup hubungi nomor telepon/WhatsApp di bawah ini.
          </p>
          <div class="space-y-2 text-sm text-slate-700">
            <p><span class="font-bold text-slate-900">Alamat Loket:</span> Lorong Tj. Burung Utama, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang, Sumatera Selatan 30139</p>
            <p><span class="font-bold text-slate-900">Nomor Telepon / WhatsApp:</span> <a href="https://wa.me/6281369231893" class="text-blue-700 font-bold hover:underline">0813-6923-1893</a></p>
          </div>
          <a
            href="https://wa.me/6281369231893?text=Halo%20Lincah%20Travel%2C%20saya%20mau%20tanya%20travel%20{encodeURIComponent(capitalize(from))}%20{encodeURIComponent(capitalize(to))}"
            class="inline-block mt-5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-none shadow-md transition-all cursor-pointer"
          >
            Hubungi Agen Travel (WhatsApp)
          </a>
        </div>

        {/* BAGIAN BARU: FAQ — target long-tail keyword */}
        <RouteFAQ from={from} to={to} price={price} />
```

> **Catatan:** CTA gradient biru ("Siap Berangkat ke {to}?") yang berada di antara Edit 9 dan Edit 10 **tetap dipertahankan** (tidak diubah).

---

### B. `src/components/RouteFAQ.astro` (FILE BARU)

Isi lengkap:
```
---
import { getCollection } from 'astro:content';

interface Props {
  from: string;
  to: string;
  price: number;
}

const { from, to, price } = Astro.props;

const capitalize = (str: string) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
const fromC = capitalize(from);
const toC = capitalize(to);

const genericFaqs = await getCollection('faq');

const routeFaqs = [
  {
    q: `Berapa harga tiket travel ${fromC} ${toC}?`,
    a: `Harga tiket travel ${fromC} ${toC} adalah Rp ${price.toLocaleString('id-ID')} flat untuk sekali jalan door-to-door. Harga sudah termasuk jemput di alamat ${fromC} dan antar ke tujuan di ${toC}, tanpa biaya tambahan.`
  },
  {
    q: `Di mana loket atau agen travel ${fromC}?`,
    a: `Loket/agen Lincah Travel berada di Lorong Tj. Burung Utama, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang. Anda juga bisa memesan langsung via WhatsApp 0813-6923-1893 tanpa perlu datang ke loket.`
  },
  {
    q: `Nomor telepon travel ${fromC} ${toC} berapa?`,
    a: `Nomor telepon dan WhatsApp travel ${fromC} ${toC} adalah 0813-6923-1893. Admin siap 24 jam untuk konfirmasi jadwal dan pemesanan kursi.`
  },
  {
    q: `Apa saja pilihan mobil travel ${fromC} ${toC}?`,
    a: `Armada travel ${fromC} ${toC} meliputi Toyota Hiace Premio (11 seat), Toyota Innova Reborn (7 seat), dan Toyota Avanza/Veloz (6 seat), semua ber-AC dan dikemudikan driver berpengalaman.`
  }
];

const allFaqs = [...routeFaqs, ...genericFaqs.map(f => ({ q: f.data.question, a: f.data.answer }))];
---

<div class="mt-12">
  <h2 class="text-2xl font-bold text-blue-900 mb-6">Pertanyaan Umum (FAQ) Travel {fromC} {toC}</h2>
  <div class="space-y-4">
    {allFaqs.map(item => (
      <div class="bg-white border border-slate-200 p-5">
        <h3 class="text-base font-bold text-blue-900 mb-2">{item.q}</h3>
        <p class="text-sm text-slate-600 leading-relaxed">{item.a}</p>
      </div>
    ))}
  </div>
</div>
```

> FAQ umum (f1–f5 dari koleksi `faq`) tampil sama di semua halaman — itu wajar untuk bagian suplemen & tidak memicu penalti duplikat. Keunikan tiap halaman dijamin oleh 4 pertanyaan `routeFaqs` (exact-match ber-parameter) + H2 spesifik rute + isi Markdown.

---

## 3. FILE YANG TIDAK DIUBAH (sesuai keputusan simpan data)

- `src/components/HotelList.astro` — **tetap ada** (tidak dirender di halaman rute; komponen ini menjadi bagian dari "sumber pengetahuan" untuk reuse nanti)
- `src/components/DistrictList.astro` — **tetap ada** (sama)
- `src/components/PublicTransportList.astro` — **tetap ada** (sama)
- `src/content/hotels/*` — **tetap ada** → berstatus **sumber pengetahuan** (rujukan penulisan artikel/FAQ/hub kota, tidak ditampilkan di rute)
- `src/content/districts/*` — **tetap ada** → berstatus **sumber pengetahuan**
- `src/content/public_transport/*` — **tetap ada** → berstatus **sumber pengetahuan**
- Definisi koleksi `hotels`, `districts`, `public_transport` di `src/content.config.ts` — **tetap ada**
- Sidebar `OtherRoutes` di `[from]/[to].astro` — **tetap ada** (tautan internal navigasi, bukan duplikat isi)

> **Catatan pengetahuan:** Data hotel / transportasi umum / area layanan kecamatan kini berfungsi murni sebagai bahan referensi internal. Bila kelak dibutuhkan (mis. halaman `/palembang` atau artikel lokal), komponen & koleksi sudah siap dipakai tanpa harus dibuat ulang.

---

## 4. LANGKAH EKSEKUSI (urutan)

1. Buat file `src/components/RouteFAQ.astro` (isi lihat bagian B).
2. Terapkan Edit 1–10 pada `src/pages/[from]/[to].astro` (urutan bebas, semua independent).
3. Jalankan `npx astro build`.
4. Verifikasi (lihat bagian 5).

---

## 5. VERIFIKASI

- Build sukses tanpa error.
- File hasil: `dist/palembang/babat-toman.html` dan `dist/babat-toman/palembang.html` ter-generate.
- Grep konten di `dist/palembang/babat-toman.html`:
  - ADA: `Harga Tiket Travel`, `Ongkos Travel`, `Mobil Travel`, `Agen & Loket Travel`, `Pertanyaan Umum (FAQ) Travel`, `0813-6923-1893`, `Lorong Tj. Burung Utama`.
- Grep di `dist/palembang/babat-toman.html`:
  - TIDAK ADA lagi: `Wilayah Penjemputan`, `Jemput di Hotel`, `Transportasi Umum di`, `Area Layanan Pengantaran di`.
- Pastikan `<link rel="canonical">` tetap merujuk ke URL halaman sendiri (tidak ada `noindex` di halaman rute — `[from]/[to].astro` tidak memakai prop `noindex`).
- Cek judul halaman di source: `Travel Palembang ke Babat Toman • Harga Tiket, Agen & Jadwal Lincah Travel`.

---

## 6. CATATAN RISIKO / KEPUTUSAN

- Alamat loket berbasis Palembang (kantor pusat agen) — pas untuk keyword "agen/loket" karena itulah lokasi agen travel-nya.
- Tiap H2 baru menyertakan nama rute → 56 halaman mendapat konten primer unik + isi Markdown unik → mengatasi duplikat sambil menangkap kata kunci riset.
- Reverse-direction pages (`babat-toman/palembang`) mendapat parameter `from`/`to` terbalik secara otomatis dari `getStaticPaths`, sehingga section-nya ikut unik.
- Jika kelak ingin membuat halaman hub kota (`/palembang`, `/babat-toman`), data di `src/content/{hotels,districts,public_transport}` sudah tersedia untuk dipakai.
