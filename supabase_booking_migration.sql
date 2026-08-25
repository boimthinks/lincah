-- ============================================================
-- SQL Migrasi Tabel Notas untuk Sistem Booking Lincah Travel
-- Salin dan jalankan script ini di menu "SQL Editor" di Dashboard Supabase Anda
-- ============================================================

-- 1. Jadikan no_kursi opsional (karena tidak dipakai di form booking penumpang)
ALTER TABLE public.notas ALTER COLUMN no_kursi DROP NOT NULL;

-- 2. Tambahkan kolom jumlah_penumpang
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS jumlah_penumpang INTEGER DEFAULT 1;

-- 3. Tambahkan kolom status_booking
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS status_booking TEXT DEFAULT 'pending';

-- 4. Tambahkan kolom status_pembayaran
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS status_pembayaran TEXT DEFAULT 'belum_bayar';

-- 5. Tambahkan kolom koordinat_jemput (untuk menyimpan titik latitude & longitude dari map)
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS koordinat_jemput TEXT;

-- 6. Refresh skema cache
NOTIFY pgrst, 'reload schema';
