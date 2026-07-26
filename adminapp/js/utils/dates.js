/* ============================================================
   Lincah Travel Admin - Date Utilities
   ============================================================ */

const DateUtils = {
  getToday() {
    return new Date().toISOString().split('T')[0];
  },

  getFirstDayOfMonth(year, month) {
    return `${year}-${String(month).padStart(2, '0')}-01`;
  },

  getLastDayOfMonth(year, month) {
    return new Date(year, month, 0).toISOString().split('T')[0];
  },

  getStartOfWeek(dateStr = null) {
    const date = dateStr ? new Date(dateStr) : new Date();
    const day = date.getDay();
    const diff = day === 0 ? 6 : day - 1; // Monday is 0, Sunday is 6. Adjust if Sunday is first day.
    date.setDate(date.getDate() - diff);
    return date.toISOString().split('T')[0];
  },

  getEndOfWeek(dateStr = null) {
    const date = dateStr ? new Date(dateStr) : new Date();
    const day = date.getDay();
    const diff = day === 0 ? 0 : 7 - day; // Sunday is 0, Saturday is 6.
    date.setDate(date.getDate() + diff);
    return date.toISOString().split('T')[0];
  },

  addDays(dateStr, days) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  },

  addMonths(dateStr, months) {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  },
  
  getQuarterStart(year, quarter) {
    const month = (quarter - 1) * 3;
    return `${year}-${String(month).padStart(2, '0')}-01`;
  },

  getQuarterEnd(year, quarter) {
    const month = quarter * 3;
    return new Date(year, month, 0).toISOString().split('T')[0];
  },

  getYearStart(year) {
    return `${year}-01-01`;
  },

  getYearEnd(year) {
    return `${year}-12-31`;
  },

  getFormattedDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },
  
  getFormattedDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  },
  
  getFormattedMonthYear(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric'
    });
  }
};
