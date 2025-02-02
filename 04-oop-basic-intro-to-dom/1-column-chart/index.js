export default class ColumnChar {
    constructor({ data, label, link, value } = {}) {
      this.data = data || [];
      this.label = label || '';
      this.link = link || '';
      this.value = value || 0;
      this.element = this.createColumnCharElement();
    }
    createColumnCharElement() {
      const element = document.createElement('div');
      element.innerHTML = this.getStaticOrderTemplate();
      return element.firstElementChild;
    }
    getStaticOrderTemplate() {
      let val = ''
      for (let elem of this.data) {
        val = val + `
          <div style="--value: ${elem}" data-tooltip="${elem * 2}%"></div>
        `;
      }
  
      return `<div class="dashboard__chart_orders">
      <div class="column-chart" style="--chart-height: 50">
        <div class="column-chart__title">
          ${this.label}
          <a href="/${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.value}</div>
          <div data-element="body" class="column-chart__chart">
            ${val}
        </div>
      </div>
    </div>`
    }
  }