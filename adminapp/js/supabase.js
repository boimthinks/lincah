/* ============================================================
   Lincah Travel Admin - Supabase Client
   ============================================================ */

const { createClient } = supabase;

const db = createClient(
  APP_CONFIG.supabase.url,
  APP_CONFIG.supabase.anonKey
);