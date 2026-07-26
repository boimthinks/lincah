/* ============================================================
   Lincah Travel Admin - Helper Utilities
   ============================================================ */

const Helpers = {
  async hashToken(token) {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  formatCurrency(amount) {
    const num = Number(amount) || 0;
    return 'Rp ' + num.toLocaleString('id-ID');
  },

  formatCurrencyShort(amount) {
    const num = Number(amount) || 0;
    if (num >= 1000000000) return 'Rp ' + (num / 1000000000).toFixed(1) + ' M';
    if (num >= 1000000) return 'Rp ' + (num / 1000000).toFixed(1) + ' Jt';
    if (num >= 1000) return 'Rp ' + (num / 1000).toFixed(1) + ' Rb';
    return 'Rp ' + num.toLocaleString('id-ID');
  },

  formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  formatDateFull(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  },

  getToday() {
    return new Date().toISOString().split('T')[0];
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  async getIPAddress() {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return data.ip;
    } catch {
      return 'N/A';
    }
  },

  isValidNumber(val) {
    return !isNaN(val) && val !== '' && val !== null;
  },

  formatThousands(value) {
    if (!value && value !== 0) return '';
    const numStr = String(value).replace(/\D/g, '');
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },

  unformatThousands(value) {
    if (!value) return 0;
    return Number(String(value).replace(/\./g, '')) || 0;
  },

  stripNotaPrefix(str) {
    if (!str) return '';
    return String(str).replace(/^NOTA-/, '');
  },

  formatWhatsApp(phone) {
    if (!phone) return '';
    let cleaned = String(phone).replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('62')) {
      // already correct
    } else {
      // Just append 62 if it doesn't start with 0 or 62 (as a fallback)
      cleaned = '62' + cleaned;
    }
    return cleaned;
  }
};