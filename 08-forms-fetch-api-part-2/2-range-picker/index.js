export default class RangePicker {
    subElements = {};
    element = null;
    constructor({ from = new Date(), to = new Date() } = {}) {
        this.selected = { from, to };
        this.globalFrom = from;
        this.createElement();
        this.setSubElements();
        this.handleContainer = {};
        this.createOnClickOpenCalendarListener();
    }

    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.getTempalte();
        this.element = element.firstElementChild;
    }

    createOnClickSellListener() {
        const cell = this.element.querySelectorAll('.rangepicker__date-grid');
        this.handleContainer.cellClick = this.handleOnCellClick;
        cell.forEach(grid => {
            grid.addEventListener('click', this.handleContainer.cellClick);
        });
    }

    createOnClickOpenCalendarListener() {
        const { input } = this.subElements;
        this.handleContainer.toggleCalendar = () => this.handleOpenCalendarOnClick();
        input.addEventListener('click', this.handleContainer.toggleCalendar);
    }

    setSubElements() {
        const dataElements = this.element.querySelectorAll('[data-element]');
        for (const elem of dataElements) {
            const name = elem.dataset.element;
            this.subElements[name] = elem;
        }
    }

    handleOpenCalendarOnClick() {
        this.element.classList.toggle('rangepicker_open');
        if (this.element.classList.contains('rangepicker_open')) this.renderCalendar();
    }

    handleOnCellClick = (event) => {
        const target = event.target.closest('.rangepicker__cell');
        const cellDate = new Date(target.dataset.value);
        this.onSellClick(cellDate);
    }

    onSellClick(cellDate) {
        if (this.selected.to) { // очистить и установить from
            this.selected = { from: cellDate, to: null };
            this.globalFrom = new Date(cellDate);
        } else {
            this.selected.to = cellDate;
            if (this.selected.from > this.selected.to) {
                let tmp = null;
                tmp = this.selected.from;
                this.selected.from = this.selected.to;
                this.selected.to = tmp;
            }
        }
        this.renderCalendar();
        this.updateInput();
    }

    updateInput() {
        const { from, to } = this.subElements;
        from.textContent = this.transformDate(this.selected.from);
        to.textContent = this.transformDate(this.selected.to || this.selected.from);
    }

    renderCalendar() {
        const { selector } = this.subElements;
        selector.innerHTML = '';
        const secondMonth = new Date(this.globalFrom);
        secondMonth.setMonth(secondMonth.getMonth() + 1);
        selector.innerHTML =
            `
        <div class="rangepicker__selector-arrow"></div>
        ${this.renderMonthBody(this.globalFrom)}
        ${this.renderMonthBody(secondMonth)}
      `;
      this.destroySellListeners();
      this.createOnClickSellListener();
    }

    renderMonthBody(date) {
        return `
          <div class="rangepicker__calendar">
              <div class="rangepicker__month-indicator">
                  ${this.transformMonth(date)}
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
              <div class="rangepicker__date-grid">
              ${this.renderDaysInCalendar(date)}
              </div>
          </div>
      `
    }

    renderDaysInCalendar(date) {
        let cores = '';
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const firstDayWeek = firstDayOfMonth.getDay() || 7;

        for (let i = 1; i < firstDayWeek; i++) {
            cores += '<button type="button" class="rangepicker__cell" disabled></button>';
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dateFromMonth = new Date(date.getFullYear(), date.getMonth(), day);
            cores += `<button type="button" 
                   class="${this.setCellClass(dateFromMonth)}" 
                   data-value="${dateFromMonth.toISOString()}"
                   ${day === 1 ? `style="--start-from: ${firstDayWeek}"` : ''}
                 >${day}</button>`;
        }

        return cores;
    }

    setCellClass(dateFromMonth) {
        const { from, to } = this.selected;
        
        if (!to) {
            return dateFromMonth.getTime() === from.getTime() 
                ? 'rangepicker__cell rangepicker__selected-from' 
                : 'rangepicker__cell';
        } else if (this.selected.to && this.selected.to.getTime() === this.selected.from.getTime() &&
            this.selected.to.getTime() === dateFromMonth.getTime()) {
            return 'rangepicker__cell rangepicker__selected-from rangepicker__selected-to';
        } else if (dateFromMonth.getTime() === this.selected.from.getTime()) {
            return 'rangepicker__cell rangepicker__selected-from';
        } else if (this.selected.to && dateFromMonth.getTime() === this.selected.to.getTime()) {
            return 'rangepicker__cell rangepicker__selected-to';
        } else if (this.selected.to && this.selected.to.getTime() > dateFromMonth.getTime() &&
            this.selected.from.getTime() < dateFromMonth.getTime()) {
            return 'rangepicker__cell rangepicker__selected-between';
        }
        else return 'rangepicker__cell';

    }


    getTempalte() {
        return `
         <div class = "rangepicker">
              <div class = "rangepicker__input" data-element = "input">
                  <span data-element="from">${this.transformDate(this.selected.from)}</span>
                   - 
                  <span data-element="to">${this.transformDate(this.selected.to)}</span>
              </div>
              <div class = "rangepicker__selector" data-element="selector"></div>
          </div>
      `;
    }

    transformDate(date) {
        const options = { month: "numeric", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("ru-RU", options);
    }

    transformMonth(date) {
        const options = { month: "long" };
        return date.toLocaleDateString("ru-RU", options);
    }

    destroySellListeners(){
        const cells = this.element.querySelectorAll('.rangepicker__date-grid');
        if (this.handleContainer.cellClick) {
            cells.forEach(grid => {
                grid.removeEventListener('click', this.handleContainer.cellClick);
            });
        }
    }

    destroyEventListeners() {
        const { input } = this.subElements;
        if (this.handleContainer.toggleCalendar) {
            input.removeEventListener('click', this.handleContainer.toggleCalendar);
        }        
    }

    destroy() {
        this.destroySellListeners();
        this.destroyEventListeners();
        this.remove();
    }

    remove() {
        this.element.remove();
    }


}
