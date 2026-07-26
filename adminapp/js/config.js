/* ============================================================
   Lincah Travel Admin - Configuration
   ============================================================ */

const APP_CONFIG = {
  name: 'Lincah Travel Admin',
  version: '1.0.0',
  supabase: {
    url: 'https://wrllosddilihcoqofhdr.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybGxvc2RkaWxpaGNvcW9maGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMzEzMDgsImV4cCI6MjA5NzYwNzMwOH0.Om4UkzVF0Qobqkva5yZuKu5FSAg8GI00dYUiOaaIsPQ'
  },
  token: {
    defaultHash: null,
    storageKey: 'lincah_access_token'
  },
  storage: {
    authKey: 'lincah_auth',
    cachePrefix: 'lincah_cache_'
  },
  cache: {
    duration: 5 * 60 * 1000
  }
};