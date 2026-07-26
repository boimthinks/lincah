/* ============================================================
   Lincah Travel Admin - Bottom Navigation
   ============================================================ */

const BottomNav = {
  render(activeTab = 'dashboard') {
    const links = [
      { icon: 'dashboard', label: 'Beranda', id: 'dashboard' },
      { icon: 'people', label: 'Penumpang', id: 'passengers' },
      { icon: 'receipt', label: 'Nota', id: 'notas' },
      { icon: 'receipt_long', label: 'Laporan', id: 'reports' },
      { icon: 'business', label: 'Vendor', id: 'vendors' }
    ];

    let linksHtml = '';
    links.forEach(link => {
      const isActive = link.id === activeTab;
      linksHtml += `
        <a href="#/${link.id}" class="bottom-nav-item ${isActive ? 'active' : ''}">
          ${Icon.render(link.icon)}
          <span>${link.label}</span>
        </a>
      `;
    });

    return `
      <nav class="bottom-nav">
        ${linksHtml}
      </nav>
    `;
  }
};