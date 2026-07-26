/* ============================================================
   Lincah Travel Admin - Vendors Page
   ============================================================ */

const VendorsPage = {
  vendors: [],
  searchTerm: '',

  async render() {
    return `
      ${Navbar.render({ title: 'Vendor Travel', subtitle: 'Data Vendor' })}
      <div class="main-content">
        <div class="section-header">
          <h2 class="section-title">${Icon.render('business')} Daftar Vendor</h2>
          <button class="btn btn-primary" onclick="VendorsPage.showForm()">
            ${Icon.render('add')} Tambah
          </button>
        </div>

        <div style="position: relative; margin-bottom: 12px;">
          <input type="text" class="form-input" placeholder="Cari vendor..." 
            id="search-vendor" style="padding-left: 40px;" 
            oninput="VendorsPage.onSearch(this.value)">
          <span class="material-icons-round" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400); font-size: 20px;">search</span>
        </div>

        <div id="vendor-list"></div>
      </div>
      ${BottomNav.render('vendors')}
    `;
  },

  async loadData() {
    const { data: vendors, error } = await db
      .from('vendors')
      .select('*')
      .order('nama_travel', { ascending: true });

    if (error) console.error('Error loading vendors:', error);
    this.vendors = vendors || [];
  },

  onSearch(term) {
    this.searchTerm = term.toLowerCase();
    this.renderList();
  },

  renderList() {
    const list = document.getElementById('vendor-list');
    let filtered = [...this.vendors];

    if (this.searchTerm) {
      filtered = filtered.filter(v =>
        v.nama_travel.toLowerCase().includes(this.searchTerm) ||
        v.nama_pic.toLowerCase().includes(this.searchTerm)
      );
    }

    if (filtered.length === 0) {
      list.innerHTML = Cards.emptyState('business', 'Tidak ada data vendor');
      return;
    }

    list.innerHTML = Cards.listCard(filtered.map(v => {
      const phone = Helpers.formatWhatsApp(v.kontak_pic);
      const picHtml = v.nama_pic 
        ? `<span style="display: inline-flex; align-items: center; gap: 4px;"><span class="material-icons-round" style="font-size: 16px; color: var(--primary);">person</span> ${v.nama_pic.toUpperCase()}</span>` 
        : '-';
      const contactHtml = v.kontak_pic 
        ? `<a href="https://wa.me/${phone}" target="_blank" style="text-decoration: none; color: inherit; display: inline-flex; align-items: center; gap: 4px;"><span class="material-icons-round" style="font-size: 16px; color: var(--primary);">phone</span> ${v.kontak_pic}</a>` 
        : '';

      return {
        icon: '',
        iconClass: '',
        title: v.nama_travel.toUpperCase(),
        subtitle: `${picHtml}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${v.kontak_pic ? contactHtml : ''}`,
        onclick: `VendorsPage.showForm('${v.id}')`
      };
    }));
  },

  async showForm(id = null) {
    const isEdit = id !== null;
    let vendor = {};

    if (isEdit) {
      vendor = this.vendors.find(v => v.id === id) || {};
    }

    Modal.form(
      isEdit ? 'Edit Vendor' : 'Tambah Vendor',
      [
        {
          name: 'nama_travel',
          label: 'Nama Travel',
          type: 'text',
          value: vendor.nama_travel || '',
          required: true
        },
        {
          name: 'nama_pic',
          label: 'Nama PIC',
          type: 'text',
          value: vendor.nama_pic || '',
          required: true
        },
        {
          name: 'kontak_pic',
          label: 'Kontak PIC',
          type: 'text',
          value: vendor.kontak_pic || '',
          required: false
        }
      ],
      async (data, close) => {
        if (!data.nama_travel || !data.nama_pic) {
          Toast.error('Nama travel dan Nama PIC wajib diisi');
          return;
        }

        try {
          if (isEdit) {
            const { error } = await db.from('vendors').update({
              nama_travel: data.nama_travel,
              nama_pic: data.nama_pic,
              kontak_pic: data.kontak_pic
            }).eq('id', id);
            if (error) throw error;
            await Auth.logActivity('Edit Vendor', 'vendors', { id, data });
            Toast.success('Vendor berhasil diupdate');
          } else {
            const { error } = await db.from('vendors').insert({
              nama_travel: data.nama_travel,
              nama_pic: data.nama_pic,
              kontak_pic: data.kontak_pic
            });
            if (error) throw error;
            await Auth.logActivity('Tambah Vendor', 'vendors', { data });
            Toast.success('Vendor berhasil ditambahkan');
          }

          close();
          await this.loadData();
          this.renderList();
        } catch (err) {
          console.error('Save vendor error:', err);
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
    const vendor = this.vendors.find(v => v.id === id);
    Modal.confirm(
      'Hapus Vendor',
      `Yakin ingin menghapus vendor <strong>${vendor?.nama_travel || ''}</strong>?`,
      async (close) => {
        try {
          const { error } = await db.from('vendors').delete().eq('id', id);
          if (error) throw error;
          await Auth.logActivity('Hapus Vendor', 'vendors', { id, nama: vendor?.nama_travel });
          Toast.success('Vendor berhasil dihapus');
          close();
          await this.loadData();
          this.renderList();
        } catch (err) {
          console.error('Delete vendor error:', err);
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