-- ============================================================
-- SQL Migrasi Tabel Notas untuk Sistem Booking Lincah Travel
-- Salin seluruh isi file ini dan paste ke menu "SQL Editor" di Dashboard Supabase Anda, lalu klik "Run"
-- ============================================================

-- 1. Jadikan kolom no_kursi opsional (nullable) agar booking tanpa no kursi tidak error
ALTER TABLE public.notas ALTER COLUMN no_kursi DROP NOT NULL;

-- 2. Tambahkan kolom jumlah_penumpang (default: 1)
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS jumlah_penumpang INTEGER DEFAULT 1;

-- 3. Tambahkan kolom status_booking (default: 'pending')
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS status_booking TEXT DEFAULT 'pending';

-- 4. Tambahkan kolom status_pembayaran (default: 'belum_bayar')
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS status_pembayaran TEXT DEFAULT 'belum_bayar';

-- 5. Tambahkan kolom koordinat_jemput (menyimpan latitude, longitude dari pin peta)
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS koordinat_jemput TEXT;

-- 6. Tambahkan kolom vendor_id yang merujuk ke tabel vendors (foreign key)
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL;

-- 7. Tambahkan kolom fee sebagai pendapatan (default: 0)
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS fee INTEGER DEFAULT 0;

-- 8. Reload schema cache Supabase PostgREST
NOTIFY pgrst, 'reload schema';
