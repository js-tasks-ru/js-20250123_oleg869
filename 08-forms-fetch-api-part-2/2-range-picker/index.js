export default class RangePicker {
    subElements = {};
    element = null;
    constructor({ from = new Date(), to = new Date() } = {}) {
        this.selected = { from, to };
        this.globalDateFrom = new Date(from);
        this.render();
        this.createOnClickOpenCalendarListener();
        this.getTransformInputDate();
        this.dateSeted = true;

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

    createOnClickSellListener() {
        const cell = this.element.querySelectorAll('.rangepicker__date-grid');
        cell.forEach(grid => {
            grid.addEventListener('click', this.handleOnCellClick);
        });
    }

    handleOpenCalendarOnClick() {
        this.element.classList.toggle('rangepicker_open');
        if (this.element.classList.contains('rangepicker_open')) this.renderCalendar();
    }

    handleOnCellClick = (event) => {
        const target = event.target.closest('.rangepicker__cell');
        const newDate = new Date(target.dataset.value);
        this.onSellClick(newDate);
    }

    getTransformInputDate() {
        const transformDate = date => {
            if (!date) return;
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
        const secondMonth = new Date(this.globalDateFrom);
        secondMonth.setMonth(secondMonth.getMonth() + 1);
        selector.innerHTML =
            `
            <div class="rangepicker__selector-arrow"></div>
            ${this.renderMonthBody(this.globalDateFrom)}
            ${this.renderMonthBody(secondMonth)}
        `;
        requestAnimationFrame(() => this.createOnClickSellListener());
    }

    renderMonthBody(date) {
        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        const month = date.getMonth();
        console.log(monthNames[month]);
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
        //нужно учесть, когда from есть, to еще не пришел

        if (this.selected.to === null) { console.log('пробитие'); }
        if (!date) { console.log('пробитие2'); }
        let cores = '';
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const firstDayWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();

        for (let i = 0; i < firstDayWeek; i++) {
            cores += '<button type="button" class="rangepicker__cell" disabled data-value=""></button>';
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const coreDate = new Date(date.getFullYear(), date.getMonth(), i);
            const transformedDate = coreDate.toISOString();

            cores += `<button type="button" class="${this.getClassFromDate(coreDate)}" data-value="${transformedDate}">${i}</button>`
        }
        return cores;
    }

    getClassFromDate(coreDate) {
        const { from, to } = this.selected;

        if (!to) {
            return coreDate.getTime() === from.getTime() ? 'rangepicker__cell rangepicker__selected-from' :
                'rangepicker__cell';
        }

        if (coreDate.getTime() === from.getTime()) {
            return 'rangepicker__cell rangepicker__selected-from';
        }

        if (coreDate.getTime() === to.getTime()) {
            return 'rangepicker__cell rangepicker__selected-to';
        }

        if (coreDate > from && coreDate < to) {
            return 'rangepicker__cell rangepicker__selected-between';
        }
        return 'rangepicker__cell';
    }

    onSellClick(newDate) {
        console.log(newDate);
        if (this.dateSeted) {
            this.selected = { from: newDate, to: null };
            this.dateSeted = false;
        } else {
            this.selected.to = newDate;
            this.dateSeted = true;

            if (this.selected.from > this.selected.to) {
                let tmp = this.selected.from;
                this.selected.from = this.selected.to;
                this.selected.to = tmp;
            }
        }


        this.renderCalendar();
        this.getTransformInputDate();
    }

    destroyEventListeners() {
        /*this.subElements.thumbLeft.removeEventListener(
            "pointerdown",
            this.handleThumbPointerdown
        );
        this.subElements.thumbRight.removeEventListener(
            "pointerdown",
            this.handleThumbPointerdown
        );*/
    }

    destroy() {

        this.element.remove();
    }

}
