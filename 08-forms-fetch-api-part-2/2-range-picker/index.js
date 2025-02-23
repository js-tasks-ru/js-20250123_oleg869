export default class RangePicker {
    subElements = {};
    element = null;
    constructor({ from = new Date(), to = new Date() } = {}) {
        this.selected = { from, to };
        this.render();
        this.createOnClickOpenCalendarListener();
        this.getTransformInputDate();
    }

    render() {
        this.createElement();
        this.setSubElements();
    }

    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        this.element = element.firstElementChild;
    }

    setSubElements() {
        const dataElements = this.element.querySelectorAll('[data-element]');
        for (const elem of dataElements) {
            const name = elem.dataset.element;
            this.subElements[name] = elem;
        }
    }

    getTemplate() {
        return `
        <div class = "rangepicker">
            <div class = "rangepicker__input" data-element = "input">
                <span data-element="from"></span>
                <span data-element="to"></span>
            </div>
            <div class = "rangepicker__selector" data-element="selector"></div>
        </div>
    `;
    }

    createOnClickOpenCalendarListener() {
        const { input } = this.subElements;
        input.addEventListener('click', () => this.handleOpenCalendarOnClick());
    }

    handleOpenCalendarOnClick() {
        this.element.classList.toggle('rangepicker_open');
    }

    getTransformInputDate() {
        const transformDate = date =>{
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return day + '.' + month + '.' + year;
        };

        const fromTransformed = this.subElements.from;
        const toTransformed = this.subElements.to;
        fromTransformed.textContent = transformDate(this.selected.from);
        toTransformed.textContent = transformDate(this.selected.to);
        //console.log(fromTransformed);
        //console.log(this.subElements);


    }


    destroy() {
        this.element.remove();
    }

}
