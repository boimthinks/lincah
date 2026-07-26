/* ============================================================
   Lincah Travel Admin - Authentication
   ============================================================ */

const Auth = {
  tokenHash: null,
  isAuthenticated: false,

  async init() {
    // Auto-initialize: pastikan hash token ada di database
    await this.ensureTokenHash();

    const savedHash = localStorage.getItem(APP_CONFIG.storage.authKey);
    if (savedHash) {
      this.tokenHash = savedHash;
      this.isAuthenticated = await this.verifyHash(savedHash);
      if (this.isAuthenticated) {
        return true;
      }
    }
    return false;
  },

  async ensureTokenHash() {
    try {
      const defaultToken = '#Sederhana123';
      const defaultHash = await Helpers.hashToken(defaultToken);

      const { data, error } = await db
        .from('app_settings')
        .select('setting_value')
        .eq('setting_key', 'access_token_hash')
        .single();

      if (error || !data) {
        // Tidak ada hash, insert baru
        console.log('No token hash found, inserting default...');
        await db.from('app_settings').insert({
          setting_key: 'access_token_hash',
          setting_value: defaultHash
        });
        console.log('Default token hash inserted.');
      } else if (data.setting_value !== defaultHash) {
        // Hash tidak cocok, update dengan yang benar
        console.log('Token hash mismatch, updating...');
        await db.from('app_settings')
          .update({ setting_value: defaultHash, updated_at: new Date().toISOString() })
          .eq('setting_key', 'access_token_hash');
        console.log('Token hash updated to default.');
      }
    } catch (err) {
      console.error('ensureTokenHash error:', err);
    }
  },

  async verifyHash(hash) {
    try {
      const { data, error } = await db
        .from('app_settings')
        .select('setting_value')
        .eq('setting_key', 'access_token_hash')
        .single();

      if (error) {
        console.error('Auth verify error:', error);
        return false;
      }

      return data && data.setting_value === hash;
    } catch (err) {
      console.error('Auth verify exception:', err);
      return false;
    }
  },

  async login(token) {
    if (!token || token.trim() === '') {
      return { success: false, message: 'Masukkan token akses' };
    }

    const hash = await Helpers.hashToken(token.trim());

    const isValid = await this.verifyHash(hash);
    if (isValid) {
      this.tokenHash = hash;
      this.isAuthenticated = true;
      localStorage.setItem(APP_CONFIG.storage.authKey, hash);
      await this.logActivity('Login', 'login', { method: 'token' });
      return { success: true };
    } else {
      return { success: false, message: 'Token akses salah, silakan coba lagi' };
    }
  },

  logout() {
    this.logActivity('Logout', 'settings', {});
    this.tokenHash = null;
    this.isAuthenticated = false;
    localStorage.removeItem(APP_CONFIG.storage.authKey);
    location.reload();
  },

  async checkAccess() {
    const isLoggedIn = await this.init();
    return isLoggedIn;
  },

  async logActivity(aksi, halaman, detail = {}) {
    try {
      await db.from('activity_logs').insert({
        user_token_hash: this.tokenHash,
        aksi: aksi,
        halaman: halaman,
        detail: detail
      });
    } catch (err) {
      console.error('Log activity error:', err);
    }
  }
};