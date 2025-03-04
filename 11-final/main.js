import Router from './router.js';
import DashboardPage from './DashBoardPage.js';
import SalesPage from './SalesPage.js';


const routes = {
    '/11-final/': DashboardPage,
    '/sales/': SalesPage
};
  
  new Router(routes);