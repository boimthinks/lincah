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

-- Enabling RLS
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;

-- Allow public read (for validation page)
CREATE POLICY "Allow public read notas" ON notas
  FOR SELECT USING (true);

-- Allow all operations for authenticated requests
CREATE POLICY "Allow all notas" ON notas
  USING (true);

-- Passengers table with payment status
CREATE TABLE IF NOT EXISTS passengers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tanggal_pesan DATE NOT NULL,
  nama_penumpang TEXT NOT NULL,
  wa_whatsapp TEXT,
  tujuan TEXT NOT NULL,
  vendor_id UUID NOT NULL,
  fee_vendor BIGINT NOT NULL DEFAULT 0,
  status_pembayaran TEXT NOT NULL DEFAULT 'belum_bayar',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

CREATE INDEX IF NOT EXISTS idx_passengers_tanggal_pesan ON passengers(tanggal_pesan DESC);
CREATE INDEX IF NOT EXISTS idx_passengers_vendor_id ON passengers(vendor_id);
CREATE INDEX IF NOT EXISTS idx_passengers_status_pembayaran ON passengers(status_pembayaran);

-- Enable RLS
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;

-- Allow all access for authenticated page
CREATE POLICY "Allow all passengers" ON passengers
  FOR SELECT USING (true);

CREATE POLICY "Allow all passengers" ON passengers
  FOR INSERT USING (true);

CREATE POLICY "Allow all passengers" ON passengers
  FOR UPDATE USING (true);

CREATE POLICY "Allow all passengers" ON passengers
  FOR DELETE USING (true);