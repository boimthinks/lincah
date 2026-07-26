/* ============================================================
   Lincah Travel Admin - Icon Helper
   ============================================================ */

const Icon = {
  create(name, options = {}) {
    const span = document.createElement('span');
    span.className = 'material-icons-round';
    span.textContent = name;
    if (options.className) {
      span.className += ' ' + options.className;
    }
    if (options.style) {
      Object.assign(span.style, options.style);
    }
    return span;
  },

  // Helper untuk render icon dengan HTML string
  render(name, className = '') {
    return `<span class="material-icons-round ${className}">${name}</span>`;
  }
};