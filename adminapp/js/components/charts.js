/* ============================================================
   Lincah Travel Admin - Charts
   ============================================================ */

const Charts = {
  instances: {},

  destroy(key) {
    if (this.instances[key]) {
      this.instances[key].destroy();
      delete this.instances[key];
    }
  },

  destroyAll() {
    Object.keys(this.instances).forEach(key => this.destroy(key));
  },

  bar(key, canvasId, labels, data, options = {}) {
    this.destroy(key);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: options.label || 'Data',
          data: data,
          backgroundColor: options.backgroundColor || 'rgba(37, 99, 235, 0.8)',
          borderColor: options.borderColor || '#2563eb',
          borderWidth: 1,
          borderRadius: 6,
          barThickness: options.barThickness || 30
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { family: 'Plus Jakarta Sans', weight: '600' },
            bodyFont: { family: 'Plus Jakarta Sans' },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(ctx) {
                return options.tooltipFormat 
                  ? options.tooltipFormat(ctx.parsed.y)
                  : 'Rp ' + ctx.parsed.y.toLocaleString('id-ID');
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: function(value) {
                if (value >= 1000000) return (value / 1000000).toFixed(0) + 'jt';
                if (value >= 1000) return (value / 1000).toFixed(0) + 'rb';
                return value;
              }
            }
          }
        }
      }
    });

    this.instances[key] = chart;
    return chart;
  },

  doughnut(key, canvasId, labels, data, colors = null) {
    this.destroy(key);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const defaultColors = [
      '#2563eb', '#10b981', '#f59e0b', '#ef4444',
      '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'
    ];

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors || defaultColors,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 12,
              font: { family: 'Plus Jakarta Sans', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { family: 'Plus Jakarta Sans', weight: '600' },
            bodyFont: { family: 'Plus Jakarta Sans' },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(ctx) {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = ((ctx.parsed / total) * 100).toFixed(1);
                return ` ${ctx.label}: Rp ${ctx.parsed.toLocaleString('id-ID')} (${pct}%)`;
              }
            }
          }
        }
      }
    });

    this.instances[key] = chart;
    return chart;
  },

  line(key, canvasId, labels, data, options = {}) {
    this.destroy(key);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: options.label || 'Data',
          data: data,
          borderColor: options.borderColor || '#2563eb',
          backgroundColor: options.backgroundColor || 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#fff',
          pointBorderColor: options.borderColor || '#2563eb',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { family: 'Plus Jakarta Sans', weight: '600' },
            bodyFont: { family: 'Plus Jakarta Sans' },
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: function(value) {
                if (value >= 1000000) return (value / 1000000).toFixed(0) + 'jt';
                if (value >= 1000) return (value / 1000).toFixed(0) + 'rb';
                return value;
              }
            }
          }
        }
      }
    });

    this.instances[key] = chart;
    return chart;
  }
};