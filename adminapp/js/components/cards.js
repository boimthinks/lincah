/* ============================================================
   Lincah Travel Admin - Cards
   ============================================================ */

const Cards = {
  stat(icon, title, value, colorClass = 'primary') {
    const colors = {
      primary: { bg: 'var(--primary-bg)', color: 'var(--primary)' },
      success: { bg: '#d1fae5', color: '#059669' },
      warning: { bg: '#fef3c7', color: '#d97706' },
      danger: { bg: '#fee2e2', color: '#dc2626' }
    };
    const c = colors[colorClass] || colors.primary;
    
    return `
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${Icon.render(icon)}
            <span>${title}</span>
          </div>
        </div>
        <div class="card-value">${value}</div>
      </div>
    `;
  },

  menuCard(icon, label, onClick, colorClass = 'primary') {
    const colors = {
      primary: { bg: 'var(--primary-bg)', color: 'var(--primary)' },
      success: { bg: '#d1fae5', color: '#059669' },
      warning: { bg: '#fef3c7', color: '#d97706' },
      danger: { bg: '#fee2e2', color: '#dc2626' },
      purple: { bg: '#ede9fe', color: '#7c3aed' },
      indigo: { bg: '#e0e7ff', color: '#4f46e5' }
    };
    const c = colors[colorClass] || colors.primary;
    
    return `
      <div class="menu-item" onclick="${onClick}">
        <div class="menu-item-icon" style="background: ${c.bg}; color: ${c.color};">
          ${Icon.render(icon)}
        </div>
        <div class="menu-item-label">${label}</div>
      </div>
    `;
  },

  listCard(items) {
    return items.map(item => `
      <div class="list-item" onclick="${item.onclick || ''}">
        ${item.icon ? `<div class="list-item-icon ${item.iconClass || 'primary'}">${Icon.render(item.icon)}</div>` : ''}
        <div class="list-item-content">
          <p class="list-item-title">${item.title}</p>
          <p class="list-item-subtitle">${item.subtitle}</p>
        </div>
        ${item.value ? `<div style="text-align: right;">
          <div style="font-size: 14px; font-weight: 600; color: var(--gray-800);">${item.value}</div>
          ${item.valueLabel ? `<div style="font-size: 11px; color: var(--gray-500);">${item.valueLabel}</div>` : ''}
        </div>` : ''}
      </div>
    `).join('');
  },

  emptyState(icon, message) {
    return `
      <div class="empty-state">
        <span class="material-icons-round">${icon}</span>
        <p>${message}</p>
      </div>
    `;
  }
};