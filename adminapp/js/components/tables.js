/* ============================================================
   Lincah Travel Admin - Tables
   ============================================================ */

const Tables = {
  render(headers, rows, options = {}) {
    if (rows.length === 0) {
      return Cards.emptyState(options.emptyIcon || 'table_chart', options.emptyMessage || 'Tidak ada data');
    }

    let html = '<div class="table-container"><table class="table">';
    
    // Header
    html += '<thead><tr>';
    headers.forEach(h => {
      html += `<th>${h}</th>`;
    });
    html += '</tr></thead>';
    
    // Body
    html += '<tbody>';
    rows.forEach(row => {
      html += '<tr>';
      row.forEach((cell, i) => {
        html += `<td>${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    
    return html;
  },

  actionEdit(onclick) {
    return `<button class="swipe-btn edit" onclick="${onclick}">${Icon.render('edit')}</button>`;
  },

  actionDelete(onclick) {
    return `<button class="swipe-btn delete" onclick="${onclick}">${Icon.render('delete')}</button>`;
  },

  actions(onclickEdit, onclickDelete) {
    return `
      <div class="table-actions">
        ${this.actionEdit(onclickEdit)}
        ${this.actionDelete(onclickDelete)}
      </div>
    `;
  }
};