import BasePage from './index.js';

class Router {
    constructor(){
        this.routes = {
            '/': BasePage
        };
    
    this.content = document.getElementById('content');
    this.currentPage = null;
    }

}