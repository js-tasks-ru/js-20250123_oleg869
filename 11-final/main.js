import Router from './router.js';
import DashboardPage from './DashBoardPage.js';
import SalesPage from './SalesPage.js';
import ProductPage from './ProductPage.js';

const routes = {
    '/11-final/': DashboardPage,
    '/sales/': SalesPage,
    '/products/': ProductPage
};
  
  new Router(routes);