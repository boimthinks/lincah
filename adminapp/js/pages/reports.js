/* ============================================================
   Lincah Travel Admin - Reports Page
   ============================================================ */

const ReportsPage = {
  activeTab: 'income',
  activePeriod: 'weekly',
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
          <div class="tab ${this.activeTab === 'vendor' ? 'active' : ''}" onclick="ReportsPage.setTab('vendor')">Per Vendor</div>
        </div>

        <div class="period-selector">
          <button class="period-btn ${this.activePeriod === 'weekly' ? 'active' : ''}" onclick="ReportsPage.setPeriod('weekly')">Mingguan</button>
          <button class="period-btn ${this.activePeriod === 'monthly' ? 'active' : ''}" onclick="ReportsPage.setPeriod('monthly')">Bulanan</button>
          <button class="period-btn ${this.activePeriod === 'quarterly' ? 'active' : ''}" onclick="ReportsPage.setPeriod('quarterly')">3 Bulanan</button>
          <button class="period-btn ${this.activePeriod === 'yearly' ? 'active' : ''}" onclick="ReportsPage.setPeriod('yearly')">Tahunan</button>
        </div>

        <div id="report-content"></div>
      </div>
      ${BottomNav.render('reports')}
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.renderTabs();
    this.renderContent();
  },

  setPeriod(period) {
    this.activePeriod = period;
    this.renderPeriod();
    this.renderContent();
  },

  renderTabs() {
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab')[['income', 'expenses', 'vendor'].indexOf(this.activeTab)].classList.add('active');
  },

  renderPeriod() {
    document.querySelectorAll('.period-btn').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.period-btn')[['weekly', 'monthly', 'quarterly', 'yearly'].indexOf(this.activePeriod)].classList.add('active');
  },

  getDateRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let startDate, endDate, label = '';

    switch (this.activePeriod) {
      case 'weekly':
        startDate = DateUtils.getStartOfWeek();
        endDate = DateUtils.getEndOfWeek();
        const weekNum = Math.ceil(day / 7);
        label = `Minggu ke-${weekNum}`;
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
      case 'yearly':
        startDate = DateUtils.getYearStart(year);
        endDate = DateUtils.getYearEnd(year);
        label = `Tahun ${year}`;
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
      case 'vendor':
        this.renderVendorReport(content);
        break;
    }
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

    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const dayName = current.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      labels.push(dayName);

      const dayTotal = passengers
        .filter(p => p.tanggal_pesan === dateStr)
        .reduce((sum, p) => sum + Number(p.fee_vendor || 0), 0);
      data.push(dayTotal);

      current.setDate(current.getDate() + 1);
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
        <div class="table-container"><table class="table">
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

    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const dayName = current.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      labels.push(dayName);

      const dayTotal = expenses
        .filter(e => e.tanggal === dateStr)
        .reduce((sum, e) => sum + Number(e.nominal || 0), 0);
      data.push(dayTotal);

      current.setDate(current.getDate() + 1);
    }

    Charts.line('reportExpense', 'report-expense-chart', labels, data, {
      label: 'Pengeluaran',
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)'
    });
  },

  renderVendorReport(content) {
    const { startDate, endDate, label } = this.getDateRange();

    const filtered = this.passengers.filter(p => {
      const d = p.tanggal_pesan;
      return d >= startDate && d <= endDate;
    });

    const vendorStats = {};
    this.vendors.forEach(v => {
      vendorStats[v.id] = {
        name: v.nama_travel,
        pic: v.nama_pic,
        totalFee: 0,
        count: 0
      };
    });

    filtered.forEach(p => {
      if (vendorStats[p.vendor_id]) {
        vendorStats[p.vendor_id].totalFee += Number(p.fee_vendor || 0);
        vendorStats[p.vendor_id].count++;
      }
    });

    const vendorList = Object.values(vendorStats).filter(v => v.count > 0);
    const totalFeeAll = vendorList.reduce((sum, v) => sum + v.totalFee, 0);

    content.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('business')} Fee Vendor</h3>
          <span class="badge badge-primary">${label}</span>
        </div>
        <div class="summary-total">
          <div class="summary-row">
            <span class="summary-label">Total Fee Semua Vendor</span>
            <span class="summary-value">${Helpers.formatCurrency(totalFeeAll)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Total Penumpang</span>
            <span class="summary-value">${filtered.length}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('donut_large')} Distribusi Fee Vendor</h3>
        </div>
        <div class="chart-container">
          <canvas id="report-vendor-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('list')} Detail per Vendor</h3>
        </div>
        ${vendorList.length === 0 ? Cards.emptyState('business', 'Tidak ada data vendor') : ''}
        ${vendorList.map(v => `
          <div class="summary-row">
            <div>
              <div style="font-weight: 600;">${v.name}</div>
              <div style="font-size: 12px; color: var(--gray-500);">${v.count} penumpang</div>
            </div>
            <div class="summary-value text-primary">${Helpers.formatCurrency(v.totalFee)}</div>
          </div>
        `).join('')}
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${Icon.render('receipt')} Daftar Penumpang per Vendor</h3>
        </div>
        <div class="table-container"><table class="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>Vendor</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? '<tr><td colspan="4" style="text-align: center; color: var(--gray-400);">Tidak ada data</td></tr>' : ''}
            ${filtered.map(p => {
              const vendor = this.vendors.find(v => v.id === p.vendor_id);
              return `
                <tr>
                  <td>${DateUtils.getFormattedDate(p.tanggal_pesan)}</td>
                  <td>${p.nama_penumpang}</td>
                  <td><span class="badge badge-primary">${vendor?.nama_travel || '-'}</span></td>
                  <td><strong>${Helpers.formatCurrency(p.fee_vendor)}</strong></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table></div>
      </div>
    `;

    if (vendorList.length > 0) {
      Charts.doughnut('reportVendor', 'report-vendor-chart', 
        vendorList.map(v => v.name), 
        vendorList.map(v => v.totalFee)
      );
    }
  },

  renderTable(passengers) {
    if (passengers.length === 0) {
      return Cards.emptyState('people', 'Tidak ada data penumpang');
    }

    let html = '<div class="table-container"><table class="table">';
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