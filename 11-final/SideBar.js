export default class SideBar {
    constructor() {        
        this.sidebar = document.querySelector('.sidebar');
        this.toggler = document.querySelector('.sidebar__toggler');
        this.handleToggle = this.handleToggle.bind(this);
        this.isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.render();
    }

    render() {
        if (this.isCollapsed) {
            document.body.classList.add('is-collapsed-sidebar');
        } else {
            document.body.classList.remove('is-collapsed-sidebar');
        }
        this.createListener();
    }

    createListener() {
        this.toggler.addEventListener('click', this.handleToggle);
    }

    handleToggle() {
        document.body.classList.toggle('is-collapsed-sidebar');
        this.isCollapsed = !this.isCollapsed;
        localStorage.setItem('sidebarCollapsed', this.isCollapsed);
    }

    destroy(){
        this.toggler.removeEventListener('click', this.handleToggle);
    }


}