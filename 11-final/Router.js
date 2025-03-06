export default class Router {
    constructor(routes) {
      this.routes = routes;
      this.contentNode = document.getElementById('content');
      this.init();
    }
  
    init() {
      window.addEventListener('popstate', this.handleRoute.bind(this));
      document.addEventListener('click', this.handleLinkClick.bind(this));
      this.handleRoute();
    }
  
    async handleRoute() {
      const path = this.parsePath(window.location.pathname);
      const [matchedRoute, params] = this.matchRoute(path);
  
      const PageClass = this.routes[matchedRoute] || this.routes['/404'] || this.routes['/11-final/'];
  
      if (this.currentPage) {
        await this.currentPage.destroy();
      }
  
      this.currentPage = new PageClass(params);
      const element = await this.currentPage.render();
      
      this.contentNode.innerHTML = '';
      this.contentNode.append(element);
    }
  
    parsePath(path) {
      return path.replace(/\/+$/, '') || '/';
    }
  
    matchRoute(path) {
      const routes = Object.keys(this.routes);
      
      for (const route of routes) {
        const routePattern = route
          .replace(/:\w+/g, '([^/]+)')
          .replace(/\//g, '\\/');
        
        const regex = new RegExp(`^${routePattern}$`);
        const match = path.match(regex);
  
        if (match) {
          const params = this.extractParams(route, match);
          return [route, params];
        }
      }
      
      return [path, {}];
    }
  
    extractParams(route, match) {
      const paramNames = (route.match(/:\w+/g) || []).map(name => name.slice(1));
      return paramNames.reduce((params, name, index) => {
        params[name] = match[index + 1];
        return params;
      }, {});
    }
  
    handleLinkClick = (event) => {
      const link = event.target.closest('a[data-page="true"]');
      if (!link) return;
  
      const href = new URL(link.href);
      if (href.origin === window.location.origin) {
        event.preventDefault();
        this.navigate(href.pathname);
      }
    }
  
    navigate(path) {
      history.pushState(null, null, path);
      this.handleRoute();
    }
  
    destroy() {
      window.removeEventListener('popstate', this.handleRoute);
      document.removeEventListener('click', this.handleLinkClick);
    }
  }