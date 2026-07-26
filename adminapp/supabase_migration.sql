-- ============================================================
-- Lincah Travel Admin - Database Schema
-- ============================================================

-- Notas table for travel invoices/notes
CREATE TABLE IF NOT EXISTS notas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  no_nota TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  dari TEXT NOT NULL,
  tujuan TEXT NOT NULL,
  tanggal_berangkat DATE NOT NULL,
  jam_berangkat TEXT NOT NULL,
  no_kursi TEXT NOT NULL,
  tarif BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notas_no_nota ON notas(no_nota);
CREATE INDEX IF NOT EXISTS idx_notas_created_at ON notas(created_at DESC);

-- Enable RLS
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;

-- Allow public read (for validation page)
CREATE POLICY "Allow public read notas" ON notas
  FOR SELECT USING (true);

-- Allow all operations for authenticated requests
CREATE POLICY "Allow all notas" ON notas
  USING (true);
