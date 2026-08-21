/* ============================================================
   Lincah Travel Admin - Reports Page
   ============================================================ */

const ReportsPage = {
  activeTab: 'income',
  activePeriod: 'all',
  filterVendor: 'all',
  passengers: [],
  vendors: [],
  expenses: [],

  async render() {
    return `
      ${Navbar.render({ title: 'Laporan', subtitle: 'Analisis & Statistik' })}
      <div class="main-content">
        <div class="tabs">
          <div class="tab ${this.activeTab === 'income' ? 'active' : ''}" onclick="ReportsPage.setTab('income')">Pendapatan</div>
          <div class="tab ${this.activeTab === 'expenses' ? 'active' : ''}" onclick="ReportsPage.setTab('expenses')">Pengeluaran</div>
          <div class="tab ${this.activeTab === 'unpaid' ? 'active' : ''}" onclick="ReportsPage.setTab('unpaid')">Belum Bayar</div>
        </div>

        <div class="period-selector" id="report-period-selector">
          <button class="period-btn ${this.activePeriod === 'all' ? 'active' : ''}" onclick="ReportsPage.setPeriod('all')">Semua</button>
          <button class="period-btn ${this.activePeriod === 'monthly' ? 'active' : ''}" onclick="ReportsPage.setPeriod('monthly')">Bulanan</button>
          <button class="period-btn ${this.activePeriod === 'quarterly' ? 'active' : ''}" onclick="ReportsPage.setPeriod('quarterly')">3 Bulanan</button>
        </div>

        <div id="report-vendor-filter" style="display: none;"></div>

        <div id="report-content"></div>
      </div>
      ${BottomNav.render('reports')}
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.filterVendor = 'all';
    this.renderTabs();
    this.renderContent();
    this.toggleFilterView();
  },

  toggleFilterView() {
    const periodSelector = document.getElementById('report-period-selector');
    const vendorFilter = document.getElementById('report-vendor-filter');
    if (!periodSelector || !vendorFilter) return;

    if (this.activeTab === 'unpaid') {
      periodSelector.style.display = 'none';
      vendorFilter.style.display = 'block';
      this.renderVendorFilter();
    } else {
      periodSelector.style.display = 'flex';
      vendorFilter.style.display = 'none';
    }
  },

  renderVendorFilter() {
    const vendorFilter = document.getElementById('report-vendor-filter');
    if (!vendorFilter) return;

    let html = `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
      <div class="filter-chip ${this.filterVendor === 'all' ? 'active' : ''}" onclick="ReportsPage.setFilterVendor('all')">Semua Vendor</div>`;
    this.vendors.forEach(v => {
      html += `<div class="filter-chip ${this.filterVendor === v.id ? 'active' : ''}" onclick="ReportsPage.setFilterVendor('${v.id}')">${v.nama_travel}</div>`;
    });
    html += '</div>';
    vendorFilter.innerHTML = html;
  },

  setFilterVendor(vendorId) {
    this.filterVendor = vendorId;
    this.renderVendorFilter();
    this.renderContent();
  },

  setPeriod(period) {
    this.activePeriod = period;
    this.renderPeriod();
    this.renderContent();
  },

  renderTabs() {
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab')[['income', 'expenses', 'unpaid'].indexOf(this.activeTab)].classList.add('active');
  },

  renderPeriod() {
    document.querySelectorAll('.period-btn').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.period-btn')[['all', 'monthly', 'quarterly'].indexOf(this.activePeriod)].classList.add('active');
  },

  getDateRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let startDate, endDate, label = '';

    switch (this.activePeriod) {
      case 'all':
        startDate = '1970-01-01';
        endDate = '2100-01-01';
        label = 'Total Semua Data';
        break;
      case 'monthly':
        startDate = DateUtils.getFirstDayOfMonth(year, month);
        endDate = DateUtils.getLastDayOfMonth(year, month);
        label = new Date(year, month - 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        break;
      case 'quarterly':
        const quarter = Math.ceil(month / 3);
        startDate = DateUtils.getQuarterStart(year, quarter);
        endDate = DateUtils.getQuarterEnd(year, quarter);
        label = `Q${quarter} ${year}`;
        break;
    }

    return { startDate, endDate, label };
  },

  renderContent() {
    const content = document.getElementById('report-content');
    if (!content) return;

    switch (this.activeTab) {
      case 'income':
        this.renderIncomeReport(content);
        break;
      case 'expenses':
        this.renderExpensesReport(content);
        break;
      case 'unpaid':
        this.renderUnpaidReport(content);
        break;
    }

    this.toggleFilterView();
  },

  renderIncomeReport(content) {
    const { startDate, endDate, label } = this.getDateRange();
    
    const filtered = this.passengers.filter(p => {
      const d = p.tanggal_pesan;
      return d >= startDate && d <= endDate;
    });

    const totalFee = filtered.reduce((sum, p) => sum + Number(p.fee_vendor || 0), 0);

    content.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('payments')} Total Pendapatan</h3>
          <span class="badge badge-primary">${label}</span>
        </div>
        <div class="card-value positive" style="font-size: 28px;">${Helpers.formatCurrency(totalFee)}</div>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: var(--gray-500);">${filtered.length} penumpang dalam periode ini</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('show_chart')} Grafik Pendapatan</h3>
        </div>
        <div class="chart-container">
          <canvas id="report-income-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('list')} Detail Pendapatan</h3>
        </div>
        ${this.renderTable(filtered)}
      </div>
    `;

    this.renderIncomeChart(filtered, startDate, endDate);
  },

  renderIncomeChart(passengers, startDate, endDate) {
    const labels = [];
    const data = [];

    if (startDate === '1970-01-01') {
      // Semua data: agregasi per bulan
      const monthlyMap = {};
      passengers.forEach(p => {
        const monthKey = p.tanggal_pesan.substring(0, 7); // 'YYYY-MM'
        monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + Number(p.fee_vendor || 0);
      });
      const sortedMonths = Object.keys(monthlyMap).sort();
      sortedMonths.forEach(m => {
        const [y, mo] = m.split('-');
        const monthDate = new Date(Number(y), Number(mo) - 1);
        labels.push(monthDate.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }));
        data.push(monthlyMap[m]);
      });
    } else {
      // Periode tertentu: agregasi per hari
      let current = new Date(startDate);
      const end = new Date(endDate);
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        labels.push(current.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
        const dayTotal = passengers
          .filter(p => p.tanggal_pesan === dateStr)
          .reduce((sum, p) => sum + Number(p.fee_vendor || 0), 0);
        data.push(dayTotal);
        current.setDate(current.getDate() + 1);
      }
    }

    Charts.line('reportIncome', 'report-income-chart', labels, data, {
      label: 'Pendapatan',
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)'
    });
  },

  renderExpensesReport(content) {
    const { startDate, endDate, label } = this.getDateRange();
    
    const filtered = this.expenses.filter(e => {
      const d = e.tanggal;
      return d >= startDate && d <= endDate;
    });

    const totalExpense = filtered.reduce((sum, e) => sum + Number(e.nominal || 0), 0);

    content.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('money_off')} Total Pengeluaran</h3>
          <span class="badge badge-danger">${label}</span>
        </div>
        <div class="card-value negative" style="font-size: 28px;">${Helpers.formatCurrency(totalExpense)}</div>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: var(--gray-500);">${filtered.length} pengeluaran dalam periode ini</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('show_chart')} Grafik Pengeluaran</h3>
        </div>
        <div class="chart-container">
          <canvas id="report-expense-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('list')} Detail Pengeluaran</h3>
        </div>
        <div class="table-container" style="font-size: 12px;"><table class="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Nominal</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? '<tr><td colspan="3" style="text-align: center; color: var(--gray-400);">Tidak ada data</td></tr>' : ''}
            ${filtered.map(e => `
              <tr>
                <td>${DateUtils.getFormattedDate(e.tanggal)}</td>
                <td>${e.keterangan}</td>
                <td class="text-danger"><strong>${Helpers.formatCurrency(e.nominal)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table></div>
      </div>
    `;

    this.renderExpensesChart(filtered, startDate, endDate);
  },

  renderExpensesChart(expenses, startDate, endDate) {
    const labels = [];
    const data = [];

    if (startDate === '1970-01-01') {
      // Semua data: agregasi per bulan
      const monthlyMap = {};
      expenses.forEach(e => {
        const monthKey = e.tanggal.substring(0, 7); // 'YYYY-MM'
        monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + Number(e.nominal || 0);
      });
      const sortedMonths = Object.keys(monthlyMap).sort();
      sortedMonths.forEach(m => {
        const [y, mo] = m.split('-');
        const monthDate = new Date(Number(y), Number(mo) - 1);
        labels.push(monthDate.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }));
        data.push(monthlyMap[m]);
      });
    } else {
      // Periode tertentu: agregasi per hari
      let current = new Date(startDate);
      const end = new Date(endDate);
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        labels.push(current.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
        const dayTotal = expenses
          .filter(e => e.tanggal === dateStr)
          .reduce((sum, e) => sum + Number(e.nominal || 0), 0);
        data.push(dayTotal);
        current.setDate(current.getDate() + 1);
      }
    }

    Charts.line('reportExpense', 'report-expense-chart', labels, data, {
      label: 'Pengeluaran',
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)'
    });
  },

  renderUnpaidReport(content) {
    const filtered = this.passengers.filter(p => {
      const isUnpaid = p.status_pembayaran === 'belum_bayar';
      const isVendorMatch = this.filterVendor === 'all' || p.vendor_id === this.filterVendor;
      return isUnpaid && isVendorMatch;
    });

    const totalUnpaid = filtered.reduce((sum, p) => sum + Number(p.fee_vendor || 0), 0);
    const vendor = this.vendors.find(v => v.id === this.filterVendor);
    const vendorName = vendor ? vendor.nama_travel : 'Semua Vendor';

    content.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('warning')} Total Belum Bayar</h3>
          <span class="badge badge-danger">${vendorName}</span>
        </div>
        <div class="card-value negative" style="font-size: 28px;">${Helpers.formatCurrency(totalUnpaid)}</div>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: var(--gray-500);">${filtered.length} transaksi belum dibayar</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('list')} Detail Belum Bayar</h3>
        </div>
        ${filtered.length === 0 ? Cards.emptyState('check_circle', 'Tidak ada data belum bayar') : ''}
${filtered.map(p => {
            const v = this.vendors.find(v => v.id === p.vendor_id);
            const statusBadge = p.status_pembayaran === 'belum_bayar' 
              ? `<span class="badge badge-warning" style="font-size: 10px;">Belum Bayar</span>` 
              : `<span class="badge badge-success" style="font-size: 10px;">Lunas</span>`;

            return `
              <div style="background: white; border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; box-shadow: var(--shadow-sm); text-align: left;">
              <!-- Baris 1: nama, no wa | lunas/belum lunas -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; text-align: left;">
                <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 14px; color: var(--gray-800);">
                  <span class="material-icons-round" style="font-size: 18px; color: var(--primary);">person</span>
                  <span>${p.nama_penumpang}</span>
                  ${p.wa_whatsapp ? `<span style="font-size: 12px; color: var(--gray-500); font-weight: 400; margin-left: 4px;">(${p.wa_whatsapp})</span>` : ''}
                </div>
                <div>${statusBadge}</div>
              </div>

              <!-- Baris 2: tujuan | fee -->
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px; margin-top: 6px;">
                <span style="color: var(--gray-700); font-weight: 500;">${p.tujuan}</span>
                <span class="text-danger" style="font-weight: 700; font-size: 14px;">${Helpers.formatCurrency(p.fee_vendor)}</span>
              </div>

              <!-- Baris 3: vendor & tanggal + button -->
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--gray-500); margin-top: 6px;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <span style="font-weight: 500;">${v?.nama_travel || '-'}</span>
                  <span>•</span>
                  <span>${DateUtils.getFormattedDate(p.tanggal_pesan)}</span>
                </div>
                <button class="btn btn-sm btn-success" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border: none; border-radius: 6px; cursor: pointer; color: white; background-color: var(--success);" onclick="ReportsPage.markAsPaid('${p.id}')">
                  ${Icon.render('check_circle')} <span style="font-size: 11px; font-weight: 500;">Tandai Lunas</span>
                </button>
              </div>
              </div>
            `;
          }).join('')}
      </div>
    `;
  },

  async markAsPaid(id) {
    try {
      const { error } = await db.from('passengers')
        .update({ status_pembayaran: 'lunas' })
        .eq('id', id);

      if (error) throw error;

      await Auth.logActivity('Ubah Status Bayar', 'reports', { id, newStatus: 'lunas' });
      Toast.success('Status pembayaran berhasil diupdate');
      await this.loadData();
      this.renderContent();
    } catch (err) {
      console.error('Mark as paid error:', err);
      Toast.error('Gagal mengupdate status pembayaran');
    }
  },

  renderTable(passengers) {
    if (passengers.length === 0) {
      return Cards.emptyState('people', 'Tidak ada data penumpang');
    }

    let html = '<div class="table-container" style="font-size: 12px;"><table class="table">';
    html += `
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>Tujuan</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tbody>
    `;

    passengers.forEach(p => {
      html += `
        <tr>
          <td>${DateUtils.getFormattedDate(p.tanggal_pesan)}</td>
          <td>${p.nama_penumpang}</td>
          <td>${p.tujuan}</td>
          <td><strong>${Helpers.formatCurrency(p.fee_vendor)}</strong></td>
        </tr>
      `;
    });

    html += '</tbody></table></div>';
    return html;
  },

  async loadData() {
    const { data: passengers } = await db.from('passengers').select('*');
    this.passengers = passengers || [];

    const { data: vendors } = await db.from('vendors').select('*');
    this.vendors = vendors || [];

    const { data: expenses } = await db.from('expenses').select('*');
    this.expenses = expenses || [];
  },

  async init() {
    await this.loadData();
    this.renderContent();
  }
};