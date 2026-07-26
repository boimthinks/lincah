/* ============================================================
   Lincah Travel Admin - Dashboard Page
   ============================================================ */

const DashboardPage = {
  data: {
    totalIncome: 0,
    totalExpenses: 0,
    weeklyIncome: 0,
    totalPassengers: 0,
    recentLogs: []
  },

  async render() {
    const html = `
      ${Navbar.render({ title: 'Lincah Travel', subtitle: 'Dashboard' })}
      <div class="main-content">
        <div class="stats-grid">
          <div class="card">
            <div class="card-header">
              <div class="card-title">${Icon.render('payments')} Pendapatan Bulan Ini</div>
            </div>
            <div class="card-value positive" id="dashboard-income">Rp 0</div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-title">${Icon.render('money_off')} Pengeluaran Bulan Ini</div>
            </div>
            <div class="card-value negative" id="dashboard-expenses">Rp 0</div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="card">
            <div class="card-header">
              <div class="card-title">${Icon.render('group')} Penumpang Bulan Ini</div>
            </div>
            <div class="card-value" id="dashboard-passengers">0</div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-title">${Icon.render('trending_up')} Saldo Bersih</div>
            </div>
            <div class="card-value" id="dashboard-balance">Rp 0</div>
          </div>
        </div>

        <div class="section-header">
          <h2 class="section-title">${Icon.render('account_balance_wallet')} Menu Utama</h2>
        </div>
        <div class="menu-grid">
          ${Cards.menuCard('payments', 'Pendapatan', "Router.navigate('passengers')", 'success')}
          ${Cards.menuCard('money_off', 'Pengeluaran', "Router.navigate('expenses')", 'danger')}
          ${Cards.menuCard('receipt', 'Nota', "Router.navigate('notas')", 'purple')}
          ${Cards.menuCard('people', 'Penumpang', "Router.navigate('passengers')", 'primary')}
          ${Cards.menuCard('business', 'Vendor', "Router.navigate('vendors')", 'warning')}
          ${Cards.menuCard('bar_chart', 'Laporan', "Router.navigate('reports')", 'indigo')}
          ${Cards.menuCard('settings', 'Pengaturan', "Router.navigate('settings')", 'danger')}
          ${Cards.menuCard('history', 'Log', "Router.navigate('logs')", '')}
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${Icon.render('show_chart')} Grafik Pendapatan 7 Hari Terakhir</h3>
          </div>
          <div class="chart-container">
            <canvas id="dashboard-chart-income"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${Icon.render('donut_large')} Distribusi Fee Vendor</h3>
          </div>
          <div class="chart-container">
            <canvas id="dashboard-chart-vendor"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${Icon.render('history')} Aktivitas Terakhir</h3>
            <a href="#/logs" style="font-size: 13px; color: var(--primary); text-decoration: none; font-weight: 600;">Lihat Semua</a>
          </div>
          <div class="log-list" id="dashboard-logs"></div>
        </div>
      </div>
      ${BottomNav.render('dashboard')}
    `;
    return html;
  },

  async loadData() {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const startOfMonth = DateUtils.getFirstDayOfMonth(year, month);
      const endOfMonth = DateUtils.getLastDayOfMonth(year, month);

      // Load passengers this month
      const { data: passengers, error: pErr } = await db
        .from('passengers')
        .select('*')
        .gte('tanggal_pesan', startOfMonth)
        .lte('tanggal_pesan', endOfMonth);

      if (pErr) console.error('Error loading passengers:', pErr);

      // Load expenses this month
      const { data: expenses, error: eErr } = await db
        .from('expenses')
        .select('*')
        .gte('tanggal', startOfMonth)
        .lte('tanggal', endOfMonth);

      if (eErr) console.error('Error loading expenses:', eErr);

      // Load all vendors
      const { data: vendors } = await db.from('vendors').select('*');

      // Calculate stats
      const totalIncome = (passengers || []).reduce((sum, p) => sum + Number(p.fee_vendor || 0), 0);
      const totalExpenses = (expenses || []).reduce((sum, e) => sum + Number(e.nominal || 0), 0);
      const totalPassengers = (passengers || []).length;
      const balance = totalIncome - totalExpenses;

      this.data.totalIncome = totalIncome;
      this.data.totalExpenses = totalExpenses;
      this.data.totalPassengers = totalPassengers;

      // Update UI
      document.getElementById('dashboard-income').textContent = Helpers.formatCurrency(totalIncome);
      document.getElementById('dashboard-expenses').textContent = Helpers.formatCurrency(totalExpenses);
      document.getElementById('dashboard-passengers').textContent = totalPassengers;
      document.getElementById('dashboard-balance').textContent = Helpers.formatCurrency(balance);

      const balanceEl = document.getElementById('dashboard-balance');
      if (balance >= 0) {
        balanceEl.className = 'card-value positive';
      } else {
        balanceEl.className = 'card-value negative';
      }

      // Load 7 days chart
      await this.loadWeekChart(passengers || []);

      // Load vendor distribution chart
      await this.loadVendorChart(passengers || [], vendors || []);

      // Load recent logs
      await this.loadLogs();

    } catch (err) {
      console.error('Dashboard load error:', err);
    }
  },

  async loadWeekChart(passengers) {
    const days = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });
      days.push(dayName);
      
      const dayTotal = passengers
        .filter(p => p.tanggal_pesan === dateStr)
        .reduce((sum, p) => sum + Number(p.fee_vendor || 0), 0);
      data.push(dayTotal);
    }

    Charts.bar('dashboardIncome', 'dashboard-chart-income', days, data, {
      label: 'Pendapatan',
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: '#10b981',
      barThickness: 24
    });
  },

  async loadVendorChart(passengers, vendors) {
    const vendorData = {};
    
    passengers.forEach(p => {
      const vendor = vendors.find(v => v.id === p.vendor_id);
      const name = vendor ? vendor.nama_travel : 'Tidak Diketahui';
      vendorData[name] = (vendorData[name] || 0) + Number(p.fee_vendor || 0);
    });

    const labels = Object.keys(vendorData);
    const data = Object.values(vendorData);

    if (labels.length > 0) {
      Charts.doughnut('dashboardVendor', 'dashboard-chart-vendor', labels, data);
    }
  },

  async loadLogs() {
    const { data: logs } = await db
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    const logList = document.getElementById('dashboard-logs');
    if (!logs || logs.length === 0) {
      logList.innerHTML = '<p style="text-align: center; color: var(--gray-400); padding: 20px;">Belum ada aktivitas</p>';
      return;
    }

    const logsHtml = logs.map(log => {
      const icons = {
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
      const icon = icons[log.aksi] || 'info';
      
      return `
        <div class="log-item">
          <div class="log-icon" style="background: var(--primary-bg); color: var(--primary);">
            ${Icon.render(icon)}
          </div>
          <div class="log-content">
            <p class="log-title">${log.aksi}</p>
            <p class="log-time">${DateUtils.getFormattedDateTime(log.created_at)}</p>
          </div>
        </div>
      `;
    }).join('');

    logList.innerHTML = logsHtml;
  },

  async init() {
    await this.loadData();
  }
};