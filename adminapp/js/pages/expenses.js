/* ============================================================
   Lincah Travel Admin - Expenses Page
   ============================================================ */

const ExpensesPage = {
  expenses: [],
  searchTerm: '',

  async render() {
    return `
      ${Navbar.render({ title: 'Pengeluaran', subtitle: 'Data Pengeluaran' })}
      <div class="main-content">
        <div class="section-header">
          <h2 class="section-title">${Icon.render('receipt_long')} Daftar Pengeluaran</h2>
          <button class="btn btn-primary" onclick="ExpensesPage.showForm()">
            ${Icon.render('add')} Tambah
          </button>
        </div>

        <div style="position: relative; margin-bottom: 12px;">
          <input type="text" class="form-input" placeholder="Cari pengeluaran..." 
            id="search-expense" style="padding-left: 40px;" 
            oninput="ExpensesPage.onSearch(this.value)">
          <span class="material-icons-round" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400); font-size: 20px;">search</span>
        </div>

        <div class="card" id="expense-list"></div>
      </div>
      ${BottomNav.render('dashboard')}
    `;
  },

  async loadData() {
    const { data: expenses, error } = await db
      .from('expenses')
      .select('*')
      .order('tanggal', { ascending: false });

    if (error) console.error('Error loading expenses:', error);
    this.expenses = expenses || [];
  },

  onSearch(term) {
    this.searchTerm = term.toLowerCase();
    this.renderList();
  },

  renderList() {
    const list = document.getElementById('expense-list');
    let filtered = [...this.expenses];

    if (this.searchTerm) {
      filtered = filtered.filter(e =>
        e.keterangan.toLowerCase().includes(this.searchTerm)
      );
    }

    if (filtered.length === 0) {
      list.innerHTML = Cards.emptyState('receipt_long', 'Tidak ada data pengeluaran');
      return;
    }

    let html = '<div class="table-container"><table class="table">';
    html += `
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Keterangan</th>
          <th>Nominal</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
    `;

    filtered.forEach(e => {
      html += `
        <tr>
          <td>${DateUtils.getFormattedDate(e.tanggal)}</td>
          <td><strong>${e.keterangan}</strong></td>
          <td class="text-danger"><strong>${Helpers.formatCurrency(e.nominal)}</strong></td>
          <td>${Tables.actions(
            `ExpensesPage.showForm('${e.id}')`,
            `ExpensesPage.confirmDelete('${e.id}')`
          )}</td>
        </tr>
      `;
    });

    html += '</tbody></table></div>';
    list.innerHTML = html;
  },

  async showForm(id = null) {
    const isEdit = id !== null;
    let expense = {};

    if (isEdit) {
      expense = this.expenses.find(e => e.id === id) || {};
    }

    Modal.form(
      isEdit ? 'Edit Pengeluaran' : 'Tambah Pengeluaran',
      [
        {
          name: 'nominal',
          label: 'Nominal (Rp)',
          type: 'number',
          value: expense.nominal || '',
          required: true
        },
        {
          name: 'keterangan',
          label: 'Untuk Apa',
          type: 'textarea',
          value: expense.keterangan || '',
          required: true
        }
      ],
      async (data, close) => {
        if (!data.nominal || !data.keterangan) {
          Toast.error('Semua field wajib diisi');
          return;
        }

        try {
          const payload = {
            tanggal: DateUtils.getToday(),
            nominal: Number(data.nominal),
            keterangan: data.keterangan
          };

          if (isEdit) {
            payload.tanggal = expense.tanggal;
            const { error } = await db.from('expenses').update(payload).eq('id', id);
            if (error) throw error;
            await Auth.logActivity('Edit Pengeluaran', 'expenses', { id, data: payload });
            Toast.success('Pengeluaran berhasil diupdate');
          } else {
            const { error } = await db.from('expenses').insert(payload);
            if (error) throw error;
            await Auth.logActivity('Tambah Pengeluaran', 'expenses', { data: payload });
            Toast.success('Pengeluaran berhasil ditambahkan');
          }

          close();
          await this.loadData();
          this.renderList();
        } catch (err) {
          console.error('Save expense error:', err);
          Toast.error('Gagal menyimpan data');
        }
      }
    );
  },

  async confirmDelete(id) {
    const expense = this.expenses.find(e => e.id === id);
    Modal.confirm(
      'Hapus Pengeluaran',
      `Yakin ingin menghapus pengeluaran <strong>${expense?.keterangan || ''}</strong> sebesar <strong>${Helpers.formatCurrency(expense?.nominal || 0)}</strong>?`,
      async (close) => {
        try {
          const { error } = await db.from('expenses').delete().eq('id', id);
          if (error) throw error;
          await Auth.logActivity('Hapus Pengeluaran', 'expenses', { id, keterangan: expense?.keterangan });
          Toast.success('Pengeluaran berhasil dihapus');
          close();
          await this.loadData();
          this.renderList();
        } catch (err) {
          console.error('Delete expense error:', err);
          Toast.error('Gagal menghapus data');
        }
      }
    );
  },

  async init() {
    await this.loadData();
    this.renderList();
  }
};