export default class RangePicker {
    element = null;
    subElements = {};
    selectingFrom = true;
    selected = {
        from: new Date(),
        to: new Date()
    };

    constructor({ from = new Date(), to = new Date() } = {}) {
        this.showDateFrom = new Date(from);
        this.selected = { from, to };
        this.createElement();
        this.setSubElements();
        this.createListeners();
    }

    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate;
        this.element = element.firstElementChild;
    }

    setSubElements() {
        const dataElements = this.element.querySelectorAll('[data-element]');
        for (const elem of dataElements) {
            const name = elem.dataset.element;
            this.subElements[name] = elem;
        }
    }

    createListeners() {
        const { input, selector } = this.subElements;
        input.addEventListener('click', () => this.handleOnClickShowCalendar());
        document.addEventListener('click', this.handleOnClickBodyHideCalendar, true);
    }

    handleOnClickShowCalendar() {
        this.element.classList.toggle('rangepicker_open');
        //this.renderCalendar();
    }

    handleOnClickBodyHideCalendar = (event) => {
        const getCalendar = event.target.closest('.rangepicker');
        if (!getCalendar) {
            this.element.classList.remove('rangepicker_open');
        }
    }

    /*render() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        this.element = element.firstElementChild;
        this.subElements = this.getSubElements();
        this.initEventListeners();
        this.updateInput();
        return this.element;
    }*/

    getTemplate() {
        return `
        <div class="rangepicker">
            <div class="rangepicker__input" data-element="input">
            <span data-element="from"></span>
             -
            <span data-element="to"></span>
            </div>
            <div class="rangepicker__selector" data-element="selector"></div>
        </div>
        `;
    }

    destroyListeners(){
        document.handleOnClickBodyHideCalendar('click', this.onDocumentClick, true);
    }


    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
        this.destroyListeners();
    }
}