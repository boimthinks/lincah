/* ============================================================
   Lincah Travel Admin - Router
   ============================================================ */

const Router = {
  routes: {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'passengers': 'passengers',
    'notas': 'notas',
    'vendors': 'vendors',
    'expenses': 'expenses',
    'reports': 'reports',
    'settings': 'settings',
    'logs': 'logs'
  },

  currentPage: null,
  history: [],

  async navigate(page) {
    const route = this.routes[page] || 'dashboard';
    this.history.push(page);
    await this.render(route);
  },

  async render(page) {
    const app = document.getElementById('app');
    
    if (!Auth.isAuthenticated) {
      app.innerHTML = LoginPage.render();
      LoginPage.init();
      return;
    }

    switch (page) {
      case 'dashboard':
        app.innerHTML = await DashboardPage.render();
        await DashboardPage.init();
        break;
      case 'passengers':
        app.innerHTML = await PassengersPage.render();
        await PassengersPage.init();
        break;
      case 'notas':
        app.innerHTML = await NotasPage.render();
        await NotasPage.init();
        break;
      case 'vendors':
        app.innerHTML = await VendorsPage.render();
        await VendorsPage.init();
        break;
      case 'expenses':
        app.innerHTML = await ExpensesPage.render();
        await ExpensesPage.init();
        break;
      case 'reports':
        app.innerHTML = await ReportsPage.render();
        await ReportsPage.init();
        break;
      case 'settings':
        app.innerHTML = await SettingsPage.render();
        await SettingsPage.init();
        break;
      case 'logs':
        app.innerHTML = await LogsPage.render();
        await LogsPage.init();
        break;
      default:
        app.innerHTML = await DashboardPage.render();
        await DashboardPage.init();
    }

    this.currentPage = page;
    window.scrollTo(0, 0);
  },

  async back() {
    if (this.history.length > 1) {
      this.history.pop();
      const prev = this.history[this.history.length - 1] || 'dashboard';
      await this.render(prev);
    } else {
      await this.render('dashboard');
    }
  },

  handleNavigation() {
    window.addEventListener('hashchange', async () => {
      const hash = window.location.hash.replace('#/', '') || 'dashboard';
      await this.render(hash);
    });
  },

  async init() {
    this.handleNavigation();
    const hash = window.location.hash.replace('#/', '') || 'dashboard';
    this.history = [hash];
    await this.render(hash);
  }
};