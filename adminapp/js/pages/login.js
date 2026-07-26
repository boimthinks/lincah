/* ============================================================
   Lincah Travel Admin - Login Page
   ============================================================ */

const LoginPage = {
  render() {
    return `
      <div class="login-container">
        <div class="login-card">
          <div class="login-logo">
            <img src="assets/icons/icon-512.png" alt="Lincah Travel" style="width: 100%; height: 100%; object-fit: contain; border-radius: 16px;">
          </div>
          <h1 class="login-title">Lincah Travel</h1>
          <p class="login-subtitle">Masukkan token akses untuk melanjutkan</p>
          
          <div class="login-error" id="login-error">
            ${Icon.render('error')}
            <span id="login-error-msg">Token akses salah</span>
          </div>
          
          <form id="login-form">
            <div class="form-group">
              <label class="form-label">Token Akses</label>
              <input type="password" class="form-input" id="login-token" 
                placeholder="Masukkan token akses" autocomplete="off" required>
            </div>
            <button type="submit" class="btn btn-primary btn-full" id="login-btn">
              ${Icon.render('login')}
              <span>Masuk</span>
            </button>
          </form>
          
          <p style="text-align: center; margin-top: 20px; font-size: 12px; color: var(--gray-400);">
            v${APP_CONFIG.version}
          </p>
        </div>
      </div>
    `;
  },

  init() {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');
    const errorMsg = document.getElementById('login-error-msg');
    const tokenInput = document.getElementById('login-token');
    const loginBtn = document.getElementById('login-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const token = tokenInput.value.trim();
      if (!token) {
        errorMsg.textContent = 'Token akses tidak boleh kosong';
        errorDiv.classList.add('show');
        return;
      }

      loginBtn.disabled = true;
      loginBtn.innerHTML = `${Icon.render('hourglass_empty')} <span>Memproses...</span>`;

      const result = await Auth.login(token);

      if (result.success) {
        Toast.success('Berhasil masuk!');
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        errorMsg.textContent = result.message;
        errorDiv.classList.add('show');
        loginBtn.disabled = false;
        loginBtn.innerHTML = `${Icon.render('login')} <span>Masuk</span>`;
        tokenInput.value = '';
        tokenInput.focus();
      }
    });
  }
};