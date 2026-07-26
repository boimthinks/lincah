/* ============================================================
   Lincah Travel Admin - Navbar
   ============================================================ */

const Navbar = {
  render(options = {}) {
    const {
      title = 'Lincah Travel',
      subtitle = 'Admin Panel',
      showBack = false,
      actions = []
    } = options;

    let actionsHtml = '';
    if (actions.length > 0) {
      actionsHtml = actions.map(a => `
        <button class="btn btn-icon" style="background: rgba(255,255,255,0.2); border: none; color: white;" 
          onclick="${a.onclick}">
          ${Icon.render(a.icon)}
        </button>
      `).join('');
    }

    return `
      <header class="header">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            ${showBack ? `<button class="btn btn-icon" style="background: rgba(255,255,255,0.2); border: none; color: white;" onclick="Router.back()">
              ${Icon.render('arrow_back')}
            </button>` : ''}
            <img src="assets/icons/icon-dashboard.png" alt="Logo" style="width: 46px; height: 46px; border-radius: 10px; object-fit: cover;">
            <div>
              <h1 class="header-title">${title}</h1>
              <p class="header-subtitle">${subtitle}</p>
            </div>
          </div>
          <div style="display: flex; gap: 4px;">
            ${actionsHtml}
          </div>
        </div>
      </header>
    `;
  }
};