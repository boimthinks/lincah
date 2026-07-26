/* ============================================================
   Lincah Travel Admin - Main Application
   ============================================================ */

const App = {
  async init() {
    console.log('Lincah Travel Admin v' + APP_CONFIG.version);
    
    // Initialize components
    Toast.init();
    Modal.init();
    
    // Check authentication
    const isAuthenticated = await Auth.checkAccess();
    
    if (isAuthenticated) {
      // User is authenticated, render router
      await Router.init();
    } else {
      // Show login page
      const app = document.getElementById('app');
      app.innerHTML = LoginPage.render();
      LoginPage.init();
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await App.init();
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        console.log('Service Worker registered:', reg.scope);
      })
      .catch(err => {
        console.log('Service Worker registration failed:', err);
      });
  });
}