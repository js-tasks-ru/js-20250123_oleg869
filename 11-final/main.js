import Router from './router.js';
import DashboardPage from './DashBoardPage.js';
import SalesPage from './SalesPage.js';

const routes = {
    '/': DashboardPage,
    '/sales': SalesPage
};
  
  new Router(routes);