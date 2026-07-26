/* ============================================================
   Lincah Travel Admin - Activity Logs Page
   ============================================================ */

const LogsPage = {
  logs: [],
  filterAksi: 'all',

  async render() {
    return `
      ${Navbar.render({ title: 'Log Aktivitas', subtitle: 'Riwayat Aktivitas', showBack: true })}
      <div class="main-content">
        <div class="section-header">
          <h2 class="section-title">${Icon.render('history')} Riwayat Aktivitas</h2>
        </div>

        <div class="filter-bar" id="filter-aksi"></div>

        <div id="log-list"></div>
      </div>
      ${BottomNav.render('dashboard')}
    `;
  },

  async loadData() {
    const { data: logs, error } = await db
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) console.error('Error loading logs:', error);
    this.logs = logs || [];
  },

  renderFilters() {
    const filterBar = document.getElementById('filter-aksi');
    if (!filterBar) return;

    const aksiList = ['all', 'Login', 'Logout', 'Tambah', 'Edit', 'Hapus'];
    const labels = {
      'all': 'Semua',
      'Login': 'Login',
      'Logout': 'Logout',
      'Tambah': 'Tambah',
      'Edit': 'Edit',
      'Hapus': 'Hapus'
    };

    let html = '';
    aksiList.forEach(aksi => {
      const isActive = this.filterAksi === aksi;
      const icon = aksi === 'all' ? 'filter_list' : 
                   aksi === 'Login' ? 'login' : 
                   aksi === 'Logout' ? 'logout' :
                   aksi === 'Tambah' ? 'add' :
                   aksi === 'Edit' ? 'edit' : 'delete';
      html += `
        <div class="filter-chip ${isActive ? 'active' : ''}" 
          onclick="LogsPage.setFilter('${aksi}')">
          ${Icon.render(icon)}
          ${labels[aksi]}
        </div>
      `;
    });

    filterBar.innerHTML = html;
  },

  setFilter(aksi) {
    this.filterAksi = aksi;
    this.renderFilters();
    this.renderList();
  },

  renderList() {
    const list = document.getElementById('log-list');
    let filtered = [...this.logs];

    if (this.filterAksi !== 'all') {
      filtered = filtered.filter(l => l.aksi.includes(this.filterAksi));
    }

    if (filtered.length === 0) {
      list.innerHTML = Cards.emptyState('history', 'Tidak ada log aktivitas');
      return;
    }

    const iconMap = {
      'Login': 'login',
      'Logout': 'logout',
      'Tambah Penumpang': 'person_add',
      'Edit Penumpang': 'edit',
      'Hapus Penumpang': 'person_remove',
      'Tambah Vendor': 'add_business',
      'Edit Vendor': 'edit',
      'Hapus Vendor': 'delete_business',
      'Tambah Pengeluaran': 'add_card',
      'Edit Pengeluaran': 'edit',
      'Hapus Pengeluaran': 'delete'
    };

    const colorMap = {
      'Login': { bg: '#d1fae5', color: '#059669' },
      'Logout': { bg: '#fee2e2', color: '#dc2626' },
      'Tambah': { bg: '#d1fae5', color: '#059669' },
      'Edit': { bg: 'var(--primary-bg)', color: 'var(--primary)' },
      'Hapus': { bg: '#fee2e2', color: '#dc2626' }
    };

    list.innerHTML = '<div class="card">' + filtered.map(log => {
      const icon = iconMap[log.aksi] || 'info';
      const colorType = log.aksi.includes('Tambah') ? 'Tambah' :
                        log.aksi.includes('Edit') ? 'Edit' :
                        log.aksi.includes('Hapus') ? 'Hapus' :
                        log.aksi;
      const colors = colorMap[colorType] || { bg: 'var(--gray-100)', color: 'var(--gray-600)' };

      let detailHtml = '';
      if (log.detail && typeof log.detail === 'object') {
        const detailKeys = Object.keys(log.detail);
        if (detailKeys.length > 0) {
          detailHtml = `<p style="font-size: 11px; color: var(--gray-400); margin: 2px 0 0 0;">${JSON.stringify(log.detail).substring(0, 80)}</p>`;
        }
      }

      return `
        <div class="log-item">
          <div class="log-icon" style="background: ${colors.bg}; color: ${colors.color};">
            ${Icon.render(icon)}
          </div>
          <div class="log-content">
            <p class="log-title">${log.aksi}</p>
            <p style="font-size: 12px; color: var(--gray-500);">${log.halaman || '-'}</p>
            <p class="log-time">${DateUtils.getFormattedDateTime(log.created_at)}</p>
            ${detailHtml}
          </div>
        </div>
      `;
    }).join('') + '</div>';
  },

  async init() {
    await this.loadData();
    this.renderFilters();
    this.renderList();
  }
};