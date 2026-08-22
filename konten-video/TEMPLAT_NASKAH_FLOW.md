# TEMPLAT NASKAH — Format Storyboard Studio (Google Flow)

Templat ini untuk bagian **naskah/skenario saja** (yang masuk ke kolom `fullMarkdown` di export Google Flow). Gunakan untuk semua produksi video drama ke depan agar output selaras dengan format standar Storyboard Studio.

> **Note**: Bagian visual (karakter/lokasi/prop dengan base64) dikelola terpisah di Google Flow, tidak termasuk templat ini, sesuai permintaan.

---

## Aturan Format

1. Judul = `# Judul Video` (H1).
2. **Definisi karakter** ditulis dalam blok kutipan `>` dengan awalan `@nama:` dan dipisah tiap baris.
3. **Scene heading**: `### INT./EXT. LOKASI - WAKTU (menit:detik–menit:detik)`.
4. **Arah kamera/aksi** ditulis sebagai baris kutipan `>` tepat setelah scene heading.
5. **Aksi/setting** = paragraf deskriptif biasa (tidak dikutip).
6. **Dialog**: nama karakter kapital dalam bold `**NAMA**`, sentimen dilakukan dalam italik `_(marah)_`, teks dialog di baris berikutnya.
7. **Transisi** antar scene: `##### CUT TO:` (atau `##### FADE OUT.` di akhir).
8. **Penanda scene**: komentar HTML `<!-- scene-id: UUID -->` (Google Flow mengisinya otomatis saat import).
9. Timestamp harus berurutan: Hook (0:00–0:07) → Tension (0:07–0:25) → Twist (0:25–0:55) → Punchline (0:55–0:75).
10. Dialog wajib Bahasa Indonesia sehari-hari khas Sumsel/Palembang. Deskripsi aksi/kamera bisa bahasa Indonesia.
11. Untuk adegan mobil wajib tulis `RIGHT-HAND-DRIVE` di scene heading/kabin.

---

## Templat

```markdown
# [Judul Video]

> Definisi Karakter:
> @[nama]: [Deskripsi (usia, wajah, pakaian, ekspresi)].
> @[nama]: [Deskripsi].

<!-- scene-id: -->
### INT. RUANG TAMU - MALAM (0:00–0:07)

> [Arah kamera: gerakan + objek/zoom]

[Aksi/setting deskriptif singkat.]

**[NAMA]**
_(emosi, aksi)_
[Dialog...]

**[NAMA]**
[Dialog...]

##### CUT TO:

<!-- scene-id: -->
### EXT. DEPAN RUMAH - SUBUH (0:25–0:55)

> [Kamera/swish, transisi waktu]

[Aksi scene Twist.]

**[NAMA]**
_(nada serius)_
[Dialog yang menunjukkan transformasi...]

**[NAMA]**
[Dialog...]

##### CUT TO:

<!-- scene-id: -->
### EXT. KANTOR MODERN LAHAT - CONTINUOUS (0:55–0:75)

> Medium close-up [nama] menghadap kamera, slow zoom.

[Deskripsi akhir.]

**[NAMA]**
[Dialog punchline statement...]

[Deskripsi aksi penutup, misal menunjukkan layar aplikasi Lincah Travel.]

**[NAMA]**
[Promosi halus Lincah Travel pada kalimat terakhir.]

##### FADE OUT.
```

---

## Catatan Menerjemahkan dari `TEMPLATE_PRODUKSI.md`

Saat naskah produksi (format babak) siap, terjemahkan ke format Flow ini dengan panduan:

| Elemen produksi lama | Ke format Flow |
|---|---|
| `Babak 1 — Hook (0:00–0:07)` | Scene heading `INT./EXT.` + timestamp |
| Arah kamera di `> **Aksi/Camera**` | Baris kutipan `>` |
| Dialog `**[Tokoh]** (emosi)` | `**NAMA**` + `_(emosi)_` |
| Image Prompt per segmen | Tidak masuk naskah (dikelola di Flow/karakter) |
| Tranmisi antar babak | `##### CUT TO:` |

Enkapsular dan bertele-tele tidak perlu; setiap elemen visual masuk ke scene description atau baris kamera, bukan ke dialog.