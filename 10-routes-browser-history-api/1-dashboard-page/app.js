import DashboardPage from './index.js';

class Router {
    constructor() {
        this.routes = {
            '/': DashBoardPage
        };

        this.content = document.getElementById('content');
        this.currentPage = null;
        this.initSideBar();
    }

    initSideBar() {
        document.querySelector('.sidebar__nav').addEventListener(
            'click', event => {
                const url = event.target.closest('a[data-page]');
                event.preventDefault();
                const path = url.getAttribute('href');
                this.navigate(path);
            }
        );
        
        window.addEventListener('popstate', () => this.onBarSelect());
        this.onBarSelect();
    }

    async onBarSelect(){
        const path = window.location.pathname;
        const url = this.routes[path] || this.routes['/'];

        if(this.currentPage){
            this.currentPage.destroy();
        }
    }




}