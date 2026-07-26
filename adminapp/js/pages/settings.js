/* ============================================================
   Lincah Travel Admin - Settings Page
   ============================================================ */

const SettingsPage = {
  async render() {
    return `
      ${Navbar.render({ title: 'Pengaturan', subtitle: 'Pengaturan Aplikasi' })}
      <div class="main-content">
        <div class="section-header">
          <h2 class="section-title">${Icon.render('settings')} Pengaturan</h2>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${Icon.render('apps')} Tentang Aplikasi</h3>
          </div>
          <div class="summary-row">
            <span class="summary-label">Nama Aplikasi</span>
            <span class="summary-value">${APP_CONFIG.name}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Versi</span>
            <span class="summary-value">v${APP_CONFIG.version}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Database</span>
            <span class="summary-value">Supabase</span>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${Icon.render('security')} Keamanan</h3>
          </div>
          <button class="btn btn-danger btn-full" onclick="SettingsPage.confirmLogout()">
            ${Icon.render('logout')} Logout
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${Icon.render('info')} Informasi</h3>
          </div>
          <p style="font-size: 13px; color: var(--gray-600); line-height: 1.6; margin: 0;">
            Aplikasi ini digunakan untuk pencatatan pendapatan dan pengeluaran Lincah Travel.
            Semua data tersimpan di Supabase. Token akses hanya dimiliki oleh admin.
          </p>
        </div>

        <p style="text-align: center; font-size: 12px; color: var(--gray-400); padding: 20px 0;">
          Lincah Travel Admin v${APP_CONFIG.version}
        </p>
      </div>
      ${BottomNav.render('settings')}
    `;
  },

  confirmLogout() {
    Modal.confirm(
      'Logout',
      'Yakin ingin logout dari aplikasi?',
      () => {
        Auth.logout();
      }
    );
  },

  async init() {}
};