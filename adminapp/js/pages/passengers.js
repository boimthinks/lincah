/* ============================================================
   Lincah Travel Admin - Passengers Page
   ============================================================ */

const PassengersPage = {
  passengers: [],
  vendors: [],
  filterVendor: 'all',
  searchTerm: '',

  async render() {
    return `
      ${Navbar.render({ title: ' Penumpang', subtitle: 'Data Penumpang' })}
      <div class="main-content">
        <div class="section-header">
          <h2 class="section-title">${Icon.render('people')} Daftar Penumpang</h2>
          <button class="btn btn-primary" onclick="PassengersPage.showForm()">
            ${Icon.render('add')} Tambah
          </button>
        </div>

        <div style="position: relative; margin-bottom: 12px;">
          <input type="text" class="form-input" placeholder="Cari penumpang..." 
            id="search-passenger" style="padding-left: 40px;" 
            oninput="PassengersPage.onSearch(this.value)">
          <span class="material-icons-round" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400); font-size: 20px;">search</span>
        </div>

        <div class="filter-bar" id="filter-vendor"></div>

        <div id="passenger-list"></div>
      </div>
      ${BottomNav.render('passengers')}
    `;
  },

  async loadData() {
    const { data: vendors, error: vErr } = await db.from('vendors').select('*');
    if (vErr) console.error('Error loading vendors:', vErr);
    this.vendors = vendors || [];

    const { data: passengers, error } = await db
      .from('passengers')
      .select('*')
      .order('tanggal_pesan', { ascending: false });

    if (error) console.error('Error loading passengers:', error);
    this.passengers = passengers || [];
  },

  renderFilters() {
    const filterBar = document.getElementById('filter-vendor');
    if (!filterBar) return;

    let html = `<div class="filter-chip ${this.filterVendor === 'all' ? 'active' : ''}" onclick="PassengersPage.setFilter('all')">Semua Vendor</div>`;
    this.vendors.forEach(v => {
      html += `<div class="filter-chip ${this.filterVendor === v.id ? 'active' : ''}" onclick="PassengersPage.setFilter('${v.id}')">${v.nama_travel}</div>`;
    });
    filterBar.innerHTML = html;
  },

  setFilter(vendorId) {
    this.filterVendor = vendorId;
    this.renderFilters();
    this.renderList();
  },

  onSearch(term) {
    this.searchTerm = term.toLowerCase();
    this.renderList();
  },

  getFilteredPassengers() {
    let list = [...this.passengers];

    if (this.filterVendor !== 'all') {
      list = list.filter(p => p.vendor_id === this.filterVendor);
    }

    if (this.searchTerm) {
      list = list.filter(p =>
        p.nama_penumpang.toLowerCase().includes(this.searchTerm) ||
        p.tujuan.toLowerCase().includes(this.searchTerm)
      );
    }

    return list;
  },

  renderList() {
    const listContainer = document.getElementById('passenger-list');
    const filtered = this.getFilteredPassengers();

    if (filtered.length === 0) {
      listContainer.innerHTML = Cards.emptyState('people', 'Tidak ada data penumpang');
      return;
    }

    listContainer.innerHTML = filtered.map(p => {
      const vendor = this.vendors.find(v => v.id === p.vendor_id);
      const vendorName = vendor ? vendor.nama_travel : '-';
      const statusBadge = p.status_pembayaran === 'belum_bayar' 
        ? `<span class="badge badge-warning" style="font-size: 10px;">Belum Bayar</span>` 
        : `<span class="badge badge-success" style="font-size: 10px;">Lunas</span>`;
      
      return `
        <div style="background: white; border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; box-shadow: var(--shadow-sm); text-align: left; cursor: pointer;" onclick="PassengersPage.showForm('${p.id}')">
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
            <span style="font-weight: 700; font-size: 14px; color: var(--primary);">${Helpers.formatCurrency(p.fee_vendor)}</span>
          </div>

          <!-- Baris 3: vendor & tanggal -->
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--gray-500); margin-top: 6px;">
            <span style="font-weight: 500;">${vendorName}</span>
            <span>${DateUtils.getFormattedDate(p.tanggal_pesan)}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  async showForm(id = null) {
    const isEdit = id !== null;
    let passenger = {};

    if (isEdit) {
      passenger = this.passengers.find(p => p.id === id) || {};
    }

    const vendorOptions = this.vendors.map(v => ({
      value: v.id,
      label: v.nama_travel
    }));

    Modal.form(
      isEdit ? 'Edit Penumpang' : 'Tambah Penumpang',
      [
        {
          name: 'tanggal_pesan',
          label: 'Tanggal Pesan',
          type: 'date',
          value: passenger.tanggal_pesan || DateUtils.getToday(),
          required: true
        },
        {
          name: 'nama_penumpang',
          label: 'Nama Penumpang',
          type: 'text',
          value: passenger.nama_penumpang || '',
          required: true
        },
        {
          name: 'wa_whatsapp',
          label: 'No. WhatsApp',
          type: 'text',
          value: passenger.wa_whatsapp || '',
          required: true
        },
        {
          name: 'tujuan',
          label: 'Tujuan',
          type: 'text',
          value: passenger.tujuan || '',
          required: true
        },
        {
          name: 'vendor_id',
          label: 'Vendor Travel',
          type: 'select',
          value: passenger.vendor_id || '',
          options: vendorOptions,
          required: true
        },
        {
          name: 'fee_vendor',
          label: 'Fee Vendor (Rp)',
          type: 'number',
          value: passenger.fee_vendor || '',
          required: true
        },
        {
          name: 'status_pembayaran',
          label: 'Belum Bayar',
          type: 'checkbox',
          icon: 'check_circle',
          value: 'true',
          checked: passenger.status_pembayaran === 'belum_bayar'
        }
      ],
      async (data, close) => {
        if (!data.nama_penumpang || !data.wa_whatsapp || !data.tujuan || !data.vendor_id || !data.fee_vendor) {
          Toast.error('Semua field wajib diisi');
          return;
        }

        try {
          const payload = {
            tanggal_pesan: data.tanggal_pesan,
            nama_penumpang: data.nama_penumpang,
            wa_whatsapp: data.wa_whatsapp,
            tujuan: data.tujuan,
            vendor_id: data.vendor_id,
            fee_vendor: Number(data.fee_vendor),
            status_pembayaran: data.status_pembayaran === true ? 'belum_bayar' : 'lunas'
          };

          if (isEdit) {
            const { error } = await db.from('passengers').update(payload).eq('id', id);
            if (error) throw error;
            await Auth.logActivity('Edit Penumpang', 'passengers', { id, data: payload });
            Toast.success('Penumpang berhasil diupdate');
          } else {
            const { error } = await db.from('passengers').insert(payload);
            if (error) throw error;
            await Auth.logActivity('Tambah Penumpang', 'passengers', { data: payload });
            Toast.success('Penumpang berhasil ditambahkan');
          }

          close();
          await this.loadData();
          this.renderFilters();
          this.renderList();
        } catch (err) {
          console.error('Save passenger error:', err);
          Toast.error('Gagal menyimpan data');
        }
      },
      null, // onCancel
      isEdit ? async (close) => {
        close();
        setTimeout(() => {
          this.confirmDelete(id);
        }, 350);
      } : null
    );
  },

  async confirmDelete(id) {
    const passenger = this.passengers.find(p => p.id === id);
    Modal.confirm(
      'Hapus Penumpang',
      `Yakin ingin menghapus data penumpang <strong>${passenger?.nama_penumpang || ''}</strong>?`,
      async (close) => {
        try {
          const { error } = await db.from('passengers').delete().eq('id', id);
          if (error) throw error;
          await Auth.logActivity('Hapus Penumpang', 'passengers', { id, nama: passenger?.nama_penumpang });
          Toast.success('Penumpang berhasil dihapus');
          close();
          await this.loadData();
          this.renderFilters();
          this.renderList();
        } catch (err) {
          console.error('Delete passenger error:', err);
          Toast.error('Gagal menghapus data');
        }
      }
    );
  },

  async init() {
    await this.loadData();
    this.renderFilters();
    this.renderList();
  }
};
