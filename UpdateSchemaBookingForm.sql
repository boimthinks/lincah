-- ============================================================
-- SQL Migrasi Tabel Notas untuk Sistem Booking Lincah Travel
-- Jalankan di SQL Editor supabase Dashboard atau melalui CLI
-- ============================================================

-- Set column no_kursi opsional (lebih aman)s
ALTER TABLE public.notas ALTER COLUMN no_kursi DROP NOT NULL;

-- Tambah kolom jumlah_penumpang
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS jumlah_penumpang INTEGER DEFAULT 1;

-- Tambah kolom status_booking
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS status_booking TEXT DEFAULT 'pending';

-- Tambah kolom status_pembayaran
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS status_pembayaran TEXT DEFAULT 'belum_bayar';

-- Tambah kolom koordinat_jemput
ALTER TABLE public.notas ADD COLUMN IF NOT EXISTS koordinat_jemput TEXT;

-- Dilanjutkan via query selanjutnya...