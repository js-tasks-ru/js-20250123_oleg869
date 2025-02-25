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
        if (!target || target.disabled || !target.dataset.value) return;

        const newDate = new Date(target.dataset.value);
        if (isNaN(newDate.getTime())) return;
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
        selector.innerHTML = '';
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
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const firstDayWeek = firstDayOfMonth.getDay() || 7; // Воскресенье -> 7

        for (let i = 1; i < firstDayWeek; i++) {
            cores += '<button type="button" class="rangepicker__cell" disabled></button>';
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
            cores += `<button type="button" 
                     class="${this.getClassFromDate(currentDate)}" 
                     data-value="${currentDate.toISOString()}"
                     ${day === 1 ? `style="--start-from: ${firstDayWeek}"` : ''}
                   >${day}</button>`;
        }

        return cores;
    }

    getClassFromDate(coreDate) {
        const { from, to } = this.selected;

        if (!to) {
            return coreDate.getTime() === from.getTime()
                ? 'rangepicker__cell rangepicker__selected-from'
                : 'rangepicker__cell';
        }

        const isStart = coreDate.getTime() === from.getTime();
        const isEnd = coreDate.getTime() === to.getTime();
        const isBetween = coreDate > from && coreDate < to;

        return [
            'rangepicker__cell',
            isStart ? 'rangepicker__selected-from' : '',
            isEnd ? 'rangepicker__selected-to' : '',
            isBetween ? 'rangepicker__selected-between' : ''
        ].join(' ').trim();
    }

    onSellClick(newDate) {
        if (this.dateSeted) {
            this.selected = { from: newDate, to: null };
            this.dateSeted = false;
            this.globalDateFrom = new Date(newDate);
            this.element.classList.remove('rangepicker_open');
            this.renderCalendar();
            this.element.classList.add('rangepicker_open');
        } else {
            this.selected.to = newDate;
            this.dateSeted = true;

            if (this.selected.from > this.selected.to) {
                let tmp = this.selected.from;
                this.selected.from = this.selected.to;
                this.selected.to = tmp;
            }
            this.updateCalendar();
        }

        this.getTransformInputDate();
    }

    updateCalendar() {
        console.log('after click change');
        const cells = this.element.querySelectorAll('.rangepicker__cell');
        cells.forEach(cell => {
            const date = new Date(cell.dataset.value);
            cell.className = this.getClassFromDate(date);
        });
    }

    destroyEventListeners() {
        const { input } = this.subElements;
        input.removeEventListener('click', this.handleOpenCalendarOnClick);

        const cell = this.element.querySelectorAll('.rangepicker__date-grid');
        cell.forEach(grid => {
            grid.removeEventListener('click', this.handleOnCellClick);
        });
    }

    destroy() {
        this.destroyEventListeners();
        this.element.remove();
    }

}
