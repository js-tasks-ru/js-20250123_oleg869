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
        if (this.element.classList.contains('rangepicker_open')) this.renderCalendar();
    }

    getTransformInputDate() {
        const transformDate = date => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return day + '.' + month + '.' + year;
        };

        const fromTransformed = this.subElements.from;
        const toTransformed = this.subElements.to;
        fromTransformed.textContent = transformDate(this.selected.from);
        toTransformed.textContent = transformDate(this.selected.to);


    }

    renderCalendar() {
        const { selector } = this.subElements;
        selector.innerHTML =
            `
            <div class="rangepicker__selector-arrow"></div>
            ${this.renderMonthBody(this.selected.from)}
            ${this.renderMonthBody(this.selected.to)}
        `;
    }

    renderMonthBody(date) {
        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        const month = date.getMonth();
        console.log(monthNames[month]);


        //определить их соответствие дню недели
        return `
                <div class="rangepicker__calendar">
                    <div class="rangepicker__month-indicator">
                    <time>${monthNames[month]}</time>
                    </div>
                    <div class="rangepicker__day-of-week">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                    </div>
                    <div class="rangepicker__date-grid"></div>
                    <div class="rangepicker__date-grid">
                        ${this.renderDaysInCalendar(date)}
                    </div>
                </div>
            `;
    }

    renderDaysInCalendar(date) {
        let cores = '';
        //const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDate();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        //const lastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const firstDayWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();

        for (let i = 0; i < firstDayWeek; i++) {
            cores += '<button type="button" class="rangepicker__cell" data-value=""></button>';
        }

        //нужно проверять каждую ячейку, входит ли она своей датой в промежуток

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const coreDate = new Date(date.getFullYear(), date.getMonth(), i);
            const transformedDate = coreDate.toISOString();

            cores += `<button type="button" class="${this.getClassFromDate(coreDate)}" data-value="${transformedDate}">${i}</button>`
        }


        return cores;
    }

    getClassFromDate(coreDate) {
        if (coreDate.getTime() === this.selected.from.getTime()) {
            console.log(coreDate, this.selected.from);
            return 'rangepicker__cell rangepicker__selected-from';
        } else if (coreDate.getTime() === this.selected.to.getTime()) {
            return 'rangepicker__cell rangepicker__selected-to';
        } else if (coreDate.getTime() < this.selected.from.getTime() ||
         coreDate.getTime() > this.selected.to.getTime()) {
            return 'rangepicker__cell';
        }  return 'rangepicker__cell rangepicker__selected-between'
    }

    getCoreClassForRender() {

    }


    destroy() {
        this.element.remove();
    }

}
