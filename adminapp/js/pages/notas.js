/* ============================================================
   Lincah Travel Admin - Nota Perjalanan Page
   ============================================================ */

const NotasPage = {
  notas: [],
  searchTerm: '',

  async render() {
    return `
      ${Navbar.render({ title: ' Nota', subtitle: 'Nota Perjalanan' })}
      <div class="main-content">
        <div class="section-header">
          <h2 class="section-title">${Icon.render('receipt')} Daftar Nota</h2>
          <button class="btn btn-primary" onclick="NotasPage.showForm()">
            ${Icon.render('add')} Tambah
          </button>
        </div>

        <div style="position: relative; margin-bottom: 12px;">
          <input type="text" class="form-input" placeholder="Cari nama / no. nota / tujuan..." 
            id="search-nota" style="padding-left: 40px;" 
            oninput="NotasPage.onSearch(this.value)">
          <span class="material-icons-round" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400); font-size: 20px;">search</span>
        </div>

        <div id="nota-list"></div>
      </div>
      ${BottomNav.render('notas')}
    `;
  },

  async loadData() {
    try {
      const { data, error } = await db
        .from('notas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      this.notas = data || [];
    } catch (err) {
      console.error('Error loading notas:', err);
      Toast.error('Gagal memuat data nota');
      this.notas = [];
    }
  },

  getFilteredNotas() {
    if (!this.searchTerm) return this.notas;
    const term = this.searchTerm.toLowerCase();
    return this.notas.filter(n =>
      n.nama.toLowerCase().includes(term) ||
      n.no_nota.toLowerCase().includes(term) ||
      n.tujuan.toLowerCase().includes(term) ||
      n.dari.toLowerCase().includes(term)
    );
  },

  renderList() {
    const container = document.getElementById('nota-list');
    if (!container) return;

    const filtered = this.getFilteredNotas();

    if (filtered.length === 0) {
      container.innerHTML = Cards.emptyState('receipt', 'Tidak ada data nota');
      return;
    }

    const items = filtered.map(n => ({
      icon: 'receipt_long',
      iconClass: 'primary',
      title: `<div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
        <span style="font-weight: 600;">${Helpers.escapeHtml(n.nama)}</span>
        <span style="font-size: 10px; color: var(--gray-500); background: var(--gray-100); padding: 2px 6px; border-radius: 4px; font-weight: 600; letter-spacing: 0.3px;">${Helpers.escapeHtml(Helpers.stripNotaPrefix(n.no_nota))}</span>
      </div>
      <span style="font-size: 11px; color: var(--gray-500); font-weight: 500;">${DateUtils.getFormattedDate(n.tanggal_berangkat)}</span>`,
      subtitle: `${Helpers.escapeHtml(n.dari)} ${Icon.render('arrow_forward')} ${Helpers.escapeHtml(n.tujuan)} • ${Helpers.formatCurrency(n.tarif)}`,
      onclick: `NotasPage.showDetail('${n.id}')`
    }));

    container.innerHTML = Cards.listCard(items);
  },

  onSearch(term) {
    this.searchTerm = term;
    this.renderList();
  },

  async generateNoNota() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const prefix = `${y}${m}${d}`;

    const todayNotas = this.notas.filter(n => n.no_nota.startsWith(prefix));
    const seq = String(todayNotas.length + 1).padStart(3, '0');
    return `${prefix}-${seq}`;
  },

  async showForm(id = null) {
    const isEdit = id !== null;
    let nota = {};
    if (isEdit) {
      nota = this.notas.find(n => n.id === id) || {};
    }

    const noNota = isEdit ? nota.no_nota : await this.generateNoNota();

    Modal.form(
      isEdit ? 'Edit Nota' : 'Tambah Nota',
      [
        {
          name: 'no_nota',
          label: 'No. Nota',
          type: 'text',
          value: noNota,
          required: true
        },
        {
          name: 'nama',
          label: 'Nama Penumpang',
          type: 'text',
          value: nota.nama || '',
          required: true
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp',
          type: 'text',
          value: nota.whatsapp || '',
          required: true
        },
        {
          name: 'dari',
          label: 'Dari (Kota Asal)',
          type: 'text',
          value: nota.dari || '',
          required: true
        },
        {
          name: 'tujuan',
          label: 'Tujuan (Kota Tujuan)',
          type: 'text',
          value: nota.tujuan || '',
          required: true
        },
        {
          name: 'tanggal_berangkat',
          label: 'Tanggal Berangkat',
          type: 'date',
          value: nota.tanggal_berangkat || DateUtils.getToday(),
          required: true
        },
        {
          name: 'jam_berangkat',
          label: 'Jam Berangkat',
          type: 'time',
          value: nota.jam_berangkat || '',
          required: true
        },
        {
          name: 'no_kursi',
          label: 'No. Kursi',
          type: 'text',
          value: nota.no_kursi || '',
          required: true
        },
        {
          name: 'tarif',
          label: 'Tarif (Rp)',
          type: 'number',
          value: nota.tarif || '',
          required: true
        }
      ],
      async (data, close) => {
        if (!data.nama || !data.whatsapp || !data.dari || !data.tujuan || !data.tanggal_berangkat || !data.jam_berangkat || !data.no_kursi || !data.tarif) {
          Toast.error('Semua field wajib diisi');
          return;
        }

        data.whatsapp = Helpers.formatWhatsApp(data.whatsapp);
        if (!data.whatsapp) {
          Toast.error('Nomor WhatsApp tidak valid');
          return;
        }

        try {
          const payload = {
            no_nota: data.no_nota,
            nama: data.nama,
            whatsapp: data.whatsapp,
            dari: data.dari,
            tujuan: data.tujuan,
            tanggal_berangkat: data.tanggal_berangkat,
            jam_berangkat: data.jam_berangkat,
            no_kursi: data.no_kursi,
            tarif: Number(Helpers.unformatThousands(String(data.tarif)))
          };

          if (isEdit) {
            const { error } = await db.from('notas').update(payload).eq('id', id);
            if (error) throw error;
            await Auth.logActivity('Edit Nota', 'notas', { id, data: payload });
            Toast.success('Nota berhasil diupdate');
          } else {
            const { error } = await db.from('notas').insert(payload);
            if (error) throw error;
            await Auth.logActivity('Tambah Nota', 'notas', { data: payload });
            Toast.success('Nota berhasil ditambahkan');
          }

          close();
          await this.loadData();
          this.renderList();
        } catch (err) {
          console.error('Save nota error:', err);
          Toast.error('Gagal menyimpan data. Mungkin No. Nota sudah ada.');
        }
      },
      null,
      isEdit ? async (close) => {
        close();
        setTimeout(() => this.confirmDelete(id), 350);
      } : null
    );

    setTimeout(() => {
      const waInput = document.querySelector('input[name="whatsapp"]');
      if (waInput) {
        waInput.addEventListener('blur', function () {
          const formatted = Helpers.formatWhatsApp(this.value);
          if (formatted) this.value = formatted;
        });
      }
    }, 200);
  },

  showDetail(id) {
    const nota = this.notas.find(n => n.id === id);
    if (!nota) return;

    const isoTgl = nota.tanggal_berangkat;
    const formattedTgl = DateUtils.getFormattedDate(isoTgl);

    const modalHtml = `
      <div style="padding: 4px 0;">
        <div style="text-align: center; margin-bottom: 20px;">
          <span style="font-size: 12px; font-weight: 700; color: var(--primary); letter-spacing: 1px;">${Helpers.escapeHtml(Helpers.stripNotaPrefix(nota.no_nota))}</span>
        </div>

        <div style="display: grid; gap: 12px;">
          <div class="summary-row">
            <span class="summary-label">Nama</span>
            <span class="summary-value" style="font-weight: 600;">${Helpers.escapeHtml(nota.nama)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">WhatsApp</span>
            <span class="summary-value">${Helpers.escapeHtml(nota.whatsapp)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Rute</span>
            <span class="summary-value" style="font-weight: 600;">${Helpers.escapeHtml(nota.dari)} → ${Helpers.escapeHtml(nota.tujuan)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Berangkat</span>
            <span class="summary-value">${formattedTgl} • ${Helpers.escapeHtml(nota.jam_berangkat)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Kursi</span>
            <span class="summary-value">${Helpers.escapeHtml(nota.no_kursi)}</span>
          </div>
          <div class="summary-row" style="border-top: 2px solid var(--gray-200); padding-top: 12px; margin-top: 4px;">
            <span class="summary-label" style="font-weight: 700; font-size: 14px;">Tarif</span>
            <span class="summary-value" style="font-weight: 700; font-size: 18px; color: var(--primary);">${Helpers.formatCurrency(nota.tarif)}</span>
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 24px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="NotasPage.downloadPDF('${nota.id}')">
            ${Icon.render('download')} PDF
          </button>
          <button class="btn btn-success" style="flex: 1;" onclick="NotasPage.sendWA('${nota.id}')">
            ${Icon.render('send')} WA
          </button>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn btn-secondary" style="flex: 1;" onclick="Modal.hide(document.querySelector('.modal-overlay:last-child')); setTimeout(() => NotasPage.showForm('${nota.id}'), 400);">
            ${Icon.render('edit')} Edit
          </button>
          <button class="btn btn-danger" style="flex: 1;" onclick="Modal.hide(document.querySelector('.modal-overlay:last-child')); setTimeout(() => NotasPage.confirmDelete('${nota.id}'), 400);">
            ${Icon.render('delete')} Hapus
          </button>
        </div>
        <p style="text-align: center; font-size: 11px; color: var(--gray-400); margin-top: 16px;">
          Nota ini akan divalidasi saat QR Code di-scan
        </p>
      </div>
    `;

    Modal.show({
      title: 'Detail Nota',
      content: modalHtml,
      buttons: [{
        text: 'Tutup',
        primary: true,
        onclick: (close) => close()
      }],
      closeOnOverlay: true
    });
  },

  async confirmDelete(id) {
    const nota = this.notas.find(n => n.id === id);
    Modal.confirm(
      'Hapus Nota',
      `Yakin ingin menghapus nota <strong>${Helpers.escapeHtml(Helpers.stripNotaPrefix(nota?.no_nota) || '')}</strong>?`,
      async (close) => {
        try {
          const { error } = await db.from('notas').delete().eq('id', id);
          if (error) throw error;
          await Auth.logActivity('Hapus Nota', 'notas', { id, no_nota: nota?.no_nota });
          Toast.success('Nota berhasil dihapus');
          close();
          await this.loadData();
          this.renderList();
        } catch (err) {
          console.error('Delete nota error:', err);
          Toast.error('Gagal menghapus nota');
        }
      }
    );
  },

  async downloadPDF(id) {
    const nota = this.notas.find(n => n.id === id);
    if (!nota) return;

    Toast.info('Menyiapkan PDF...');

    try {
      const template = document.createElement('div');
      template.id = 'pdf-template';
      template.style.cssText = 'width: 595px; padding: 0; background: white; font-family: Arial, Helvetica, sans-serif; position: fixed; left: -9999px; top: 0; z-index: -1;';

      const formattedTgl = DateUtils.getFormattedDate(nota.tanggal_berangkat);
      const waLink = `https://wa.me/${nota.whatsapp}`;
      const validasiUrl = `https://lincahtravel.web.id/validasi/${nota.no_nota}`;

      template.innerHTML = `
        <div style="padding: 40px 40px 30px;">
          <div style="display: flex; align-items: center; gap: 14px; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 24px;">
            <svg viewBox="0 0 513 512" style="width: 48px; height: 48px; flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" fill="rgb(20, 71, 230)" d="M84.911,0.000 L429.089,0.000 C475.432,0.000 512.1000,37.568 512.1000,83.911 L512.1000,428.089 C512.1000,474.432 475.432,511.1000 429.089,511.1000 L84.911,511.1000 C38.568,511.1000 1.000,474.432 1.000,428.089 L1.000,83.911 C1.000,37.568 38.568,0.000 84.911,0.000 Z"/>
              <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M447.263,256.242 C421.875,342.251 316.351,411.975 211.570,411.975 C129.379,411.975 72.074,369.069 63.433,309.059 L0.526,309.059 L0.526,300.365 L244.792,300.365 L268.125,211.490 L212.111,211.490 L201.839,250.614 L69.614,250.614 C74.202,237.059 80.775,223.947 88.1000,211.490 L0.526,211.490 L0.526,202.795 L214.393,202.795 L270.408,202.795 L283.469,153.045 L145.936,153.045 C190.202,120.826 246.959,100.509 303.510,100.509 C408.291,100.509 472.652,170.233 447.263,256.242 ZM186.495,309.059 L173.433,358.810 L326.929,358.810 L341.120,309.059 L186.495,309.059 Z"/>
            </svg>
            <div>
              <div style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #1e3a8a; text-transform: uppercase;">
                Lincah<span style="color: #2563eb;">Travel</span>
              </div>
              <div style="font-size: 10px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">
                Cepat . Aman . Nyaman
              </div>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 11px; color: #64748b; letter-spacing: 1px; font-weight: 600; margin-bottom: 4px;">NOTA PERJALANAN DINAS</div>
            <div style="font-size: 13px; color: #1e3a8a; font-weight: 700; letter-spacing: 0.5px;">${Helpers.stripNotaPrefix(nota.no_nota)}</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 12px; color: #64748b; width: 140px; font-weight: 600;">Nama Penumpang</td>
              <td style="padding: 8px 12px; font-weight: 700; color: #1e3a8a;">${nota.nama}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 8px 12px; color: #64748b; width: 140px; font-weight: 600;">WhatsApp</td>
              <td style="padding: 8px 12px; color: #334155;">${nota.whatsapp}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #64748b; width: 140px; font-weight: 600;">Rute Perjalanan</td>
              <td style="padding: 8px 12px; font-weight: 700; color: #1e3a8a;">${nota.dari} → ${nota.tujuan}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 8px 12px; color: #64748b; width: 140px; font-weight: 600;">Tanggal Berangkat</td>
              <td style="padding: 8px 12px; color: #334155;">${formattedTgl}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #64748b; width: 140px; font-weight: 600;">Jam Berangkat</td>
              <td style="padding: 8px 12px; color: #334155;">${nota.jam_berangkat}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 8px 12px; color: #64748b; width: 140px; font-weight: 600;">No. Kursi</td>
              <td style="padding: 8px 12px; color: #334155;">${nota.no_kursi}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-top: 2px solid #1e3a8a; color: #1e3a8a; font-weight: 800; font-size: 14px;">Tarif</td>
              <td style="padding: 10px 12px; border-top: 2px solid #1e3a8a; font-weight: 800; font-size: 16px; color: #1e3a8a; text-align: right;">${Helpers.formatCurrency(nota.tarif)}</td>
            </tr>
          </table>

          <div style="text-align: center; margin: 24px 0 16px;">
            <div id="qr-container" style="display: inline-block; padding: 12px; border: 2px solid #e2e8f0;"></div>
            <div style="font-size: 9px; color: #94a3b8; margin-top: 8px; letter-spacing: 0.5px;">Scan untuk verifikasi nota</div>
          </div>

          <div style="border-top: 2px solid #e2e8f0; padding-top: 16px; font-size: 10px; color: #94a3b8; text-align: center; line-height: 1.6;">
            <div style="font-weight: 600; color: #64748b;">Lincah Travel</div>
            <div>lincah.web.id • ${waLink}</div>
            <div>Lorong Tj. Burung Utama, Bukit Lama, Kec. Ilir Bar. I, Kota Palembang 30139</div>
            <div style="margin-top: 8px; font-style: italic;">Nota ini adalah bukti perjalanan dinas yang valid</div>
          </div>
        </div>
      `;

      document.body.appendChild(template);

      const qrContainer = template.querySelector('#qr-container');
      const qr = new QRCode(qrContainer, {
        text: validasiUrl,
        width: 110,
        height: 110,
        colorDark: '#1e3a8a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });

      await new Promise(r => setTimeout(r, 400));

      const canvas = await html2canvas(template, {
        scale: 2.5,
        width: 595,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageHeight = 297;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }

      pdf.save(`Nota-${nota.no_nota}.pdf`);
      Toast.success('PDF berhasil diunduh');

      document.body.removeChild(template);
    } catch (err) {
      console.error('PDF generation error:', err);
      Toast.error('Gagal membuat PDF');
    }
  },

  sendWA(id) {
    const nota = this.notas.find(n => n.id === id);
    if (!nota) return;

    const nomor = nota.whatsapp.startsWith('62') ? nota.whatsapp : Helpers.formatWhatsApp(nota.whatsapp);
    const formattedTgl = DateUtils.getFormattedDate(nota.tanggal_berangkat);
    const validasiUrl = `https://lincahtravel.web.id/validasi/${nota.no_nota}`;
    const tarifStr = Helpers.formatCurrency(nota.tarif);

    const message = `Halo *${nota.nama}*,

Berikut adalah Nota Perjalanan Anda dari *Lincah Travel*:

━━━━━━━━━━━━━━━━━━━━
📋 *NOTA PERJALANAN DINAS*
━━━━━━━━━━━━━━━━━━━━

No. Nota  : ${Helpers.stripNotaPrefix(nota.no_nota)}
Rute       : ${nota.dari} → ${nota.tujuan}
Tanggal   : ${formattedTgl}
Jam         : ${nota.jam_berangkat}
Kursi       : ${nota.no_kursi}
Tarif       : ${tarifStr}
━━━━━━━━━━━━━━━━━━━━

✅ *Link Validasi:* ${validasiUrl}

Silakan simpan link di atas untuk verifikasi dan cetak nota. Nota ini dapat digunakan untuk klaim perjalanan dinas.

Terima kasih telah menggunakan layanan kami 🙏

*Lincah Travel*
Cepat . Aman . Nyaman
lincah.web.id`;

    const waUrl = `https://wa.me/${nomor}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  },

  async init() {
    await this.loadData();
    this.renderList();
  }
};
