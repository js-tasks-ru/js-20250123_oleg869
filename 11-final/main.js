import Router from './router.js';
import DashboardPage from './DashBoardPage.js';
import SalesPage from './SalesPage.js';
import ProductPage from './ProductPage.js';
import AddProductPage from './AddProductPage.js';
import EditProductPage from './EditProductPage.js';


const routes = {
    '/11-final/': DashboardPage,
    '/sales': SalesPage,
    '/products': ProductPage,
    '/products/add': AddProductPage,
    '/products/:id': EditProductPage
};
  
  new Router(routes);