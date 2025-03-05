export default class Router {
    currentPage = null;
    constructor(routes) {
        this.routes = routes;
        this.element = document.getElementById('content');
        this.handleOperations = {
            popstate: this.handlePopState.bind(this),
            click: this.handleLinkClick.bind(this)
        }

        this.createListeners();
        this.handleRoute();
    }

    createListeners() {
        window.addEventListener('popstate', this.handleOperations.popstate);
        document.body.addEventListener('click', this.handleOperations.click);
    }

    async handleRoute() {
        const path = window.location.pathname;
        const PageClass = this.routes[path] || this.routes['/11-final/'];

        if (this.currentPage) {
            this.currentPage.destroy();
        }

        this.currentPage = new PageClass();
        const element = await this.currentPage.render();

        this.element.innerHTML = '';
        this.element.append(element);
    }

    handlePopState = () => {
        this.handleRoute();
    }

    handleLinkClick = (event) => {
        const link = event.target.closest('a[data-page="true"]');
        if (!link) return;
        if (link.href.startsWith(window.location.origin)) {
            event.preventDefault();
            this.navigate(link.getAttribute('href'));
        }
    }

    navigate(url) {
        history.pushState(null, null, url);
        this.handleRoute();
    }

    destroy() {
        window.removeEventListener('popstate', this.listeners.popstate);
        document.body.removeEventListener('click', this.listeners.click);
    }
}