/* ============================================================
   Lincah Travel Admin - Toast Notifications
   ============================================================ */

const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
  },

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check_circle';
    if (type === 'error') icon = 'error';
    if (type === 'warning') icon = 'warning';
    
    toast.innerHTML = `
      <div class="toast-icon">${Icon.render(icon)}</div>
      <div class="toast-message">${Helpers.escapeHtml(message)}</div>
    `;
    
    this.container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, duration);
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'error');
  },

  warning(message) {
    this.show(message, 'warning');
  },

  info(message) {
    this.show(message, 'info');
  }
};