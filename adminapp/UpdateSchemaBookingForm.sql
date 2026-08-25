-- Migration: Create Booking System for lincah-travel
-- Date: 2026-08-25
-- Purpose: Add booking fields (status, payment, passengers) and adjust schema

-- Rename columns to make them nullable
ALTER TABLE notas ALTER COLUMN no_kursai DROP NOT NULL;

-- Add new columns for booking system
ALTER TABLE notas ADD COLUMN IF NOT EXISTS jumlah_penumpang INTEGER DEFAULT 1;

ALTER TABLE notas ADD COLUMN IF NOT EXISTS status_booking TEXT DEFAULT 'pending';

ALTER TABLE notas ADD COLUMN IF NOT EXISTS status_pembayaran TEXT DEFAULT 'belum_bayar';

COMMENTS AND EXAMPLES BELOW HERE.