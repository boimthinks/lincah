/* ============================================================
   Lincah Travel Admin - Modal
   ============================================================ */

const Modal = {
  container: null,

  init() {
    this.container = document.getElementById('modal-container');
  },

  show(options) {
    const {
      title = '',
      content = '',
      buttons = [],
      closeOnOverlay = true
    } = options;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    let buttonsHtml = '';
    if (buttons.length > 0) {
      buttonsHtml = '<div class="modal-footer">';
      buttons.forEach((btn, idx) => {
        const btnClass = btn.className || (btn.primary ? 'btn-primary' : 'btn-secondary');
        buttonsHtml += `
          <button class="btn ${btnClass}" id="modal-btn-${idx}">
            ${btn.text || 'OK'}
          </button>
        `;
      });
      buttonsHtml += '</div>';
    }

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" id="modal-close">${Icon.render('close')}</button>
        </div>
        <div class="modal-body">${content}</div>
        ${buttonsHtml}
      </div>
    `;

    this.container.appendChild(modal);
    
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);

    // Close button
    document.getElementById('modal-close').onclick = () => this.hide(modal);

    // Overlay click
    if (closeOnOverlay) {
      modal.onclick = (e) => {
        if (e.target === modal) this.hide(modal);
      };
    }

    // Button handlers
    buttons.forEach((btn, idx) => {
      const btnEl = document.getElementById(`modal-btn-${idx}`);
      if (btnEl && btn.onclick) {
        btnEl.onclick = () => btn.onclick(() => this.hide(modal));
      }
    });

    return modal;
  },

  hide(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  },

  alert(title, message, onOk) {
    this.show({
      title,
      content: `<p style="color: var(--gray-600); margin: 0;">${message}</p>`,
      buttons: [{
        text: 'OK',
        primary: true,
        onclick: onOk
      }]
    });
  },

  confirm(title, message, onConfirm, onCancel) {
    this.show({
      title,
      content: `
        <div class="confirm-dialog">
          <div class="confirm-icon danger">${Icon.render('warning')}</div>
          <p class="confirm-message">${message}</p>
        </div>
      `,
      buttons: [
        {
          text: 'Batal',
          onclick: (close) => {
            if (onCancel) onCancel();
            close();
          }
        },
        {
          text: 'Hapus',
          primary: true,
          onclick: (close) => {
            if (onConfirm) onConfirm(close);
          }
        }
      ]
    });
  },

  form(title, fields, onSave, onCancel, onDelete) {
    let formValues = {};
    let formHtml = '<form id="modal-form">';
    
    fields.forEach(field => {
      formValues[field.name] = field.value || '';
      
      if (field.type === 'select') {
        formHtml += `
          <div class="form-group">
            <label class="form-label">${field.label}</label>
            <select class="form-select" name="${field.name}" ${field.required ? 'required' : ''}>
              <option value="">Pilih ${field.label}</option>
              ${field.options.map(opt => 
                `<option value="${opt.value}" ${opt.value === field.value ? 'selected' : ''}>${opt.label}</option>`
              ).join('')}
            </select>
          </div>
        `;
      } else if (field.type === 'textarea') {
        formHtml += `
          <div class="form-group">
            <label class="form-label">${field.label}</label>
            <textarea class="form-input" name="${field.name}" rows="3" ${field.required ? 'required' : ''}>${field.value || ''}</textarea>
          </div>
        `;
      } else if (field.type === 'checkbox') {
        formHtml += `
          <div class="form-group" style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
            <input type="checkbox" id="field-${field.name}" name="${field.name}" value="${field.value || 'true'}" ${field.checked ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
            <label for="field-${field.name}" class="form-label" style="margin: 0; cursor: pointer; display: flex; align-items: center; gap: 4px;">
              ${field.icon ? Icon.render(field.icon) : ''} ${field.label}
            </label>
          </div>
        `;
      } else if (field.type === 'number') {
        const formattedValue = Helpers.formatThousands(field.value);
        formHtml += `
          <div class="form-group">
            <label class="form-label">${field.label}</label>
            <input type="text" class="form-input input-number" name="${field.name}" value="${formattedValue}" placeholder="0" ${field.required ? 'required' : ''} autocomplete="off">
          </div>
        `;
      } else {
        formHtml += `
          <div class="form-group">
            <label class="form-label">${field.label}</label>
            <input type="${field.type || 'text'}" class="form-input" name="${field.name}" value="${field.value || ''}" ${field.required ? 'required' : ''}>
          </div>
        `;
      }
    });
    
    formHtml += '</form>';

    this.show({
      title,
      content: formHtml,
      buttons: [
        {
          text: onDelete ? 'Hapus' : 'Batal',
          primary: onDelete ? false : false,
          className: onDelete ? 'btn-danger' : 'btn-secondary',
          onclick: (close) => {
            if (onDelete) {
              onDelete(close);
            } else {
              if (onCancel) onCancel();
              close();
            }
          }
        },
        {
          text: 'Simpan',
          primary: true,
          id: 'save',
          onclick: (close) => {
            const form = document.getElementById('modal-form');
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
              const input = form.querySelector(`input[name="${key}"]`);
              if (input && input.classList.contains('input-number')) {
                data[key] = Helpers.unformatThousands(value);
              } else {
                data[key] = value;
              }
            });
            fields.filter(f => f.type === 'checkbox').forEach(f => {
              const input = form.querySelector(`input[name="${f.name}"]`);
              data[f.name] = input ? input.checked : false;
            });
            onSave(data, close);
          }
        }
      ]
    });

    setTimeout(() => {
      document.querySelectorAll('.input-number').forEach(input => {
        input.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '');
          e.target.value = Helpers.formatThousands(value);
        });
      });
    }, 100);
  }
};