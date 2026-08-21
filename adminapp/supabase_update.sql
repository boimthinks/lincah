-- Jalankan perintah SQL ini di SQL Editor Supabase Anda:

ALTER TABLE passengers 
  ADD COLUMN IF NOT EXISTS status_pembayaran TEXT NOT NULL DEFAULT 'belum_bayar',
  ADD COLUMN IF NOT EXISTS wa_whatsapp TEXT;

CREATE INDEX IF NOT EXISTS idx_passengers_status_pembayaran ON passengers(status_pembayaran);
