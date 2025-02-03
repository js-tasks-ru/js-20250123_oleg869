export default class ColumnChar {
  constructor({ data, label, link, value } = {}) {
    this.data = data || [];
    this.label = label || '';
    this.link = link || '';
    this.value = value || 0;
    this.element = this.createColumnCharElement();
    this.chartHeight = 50;
    this.diagramParam = this.getColumnProps(this.data);
  }
  createColumnCharElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getStaticOrderTemplate();
    return element.firstElementChild;
  }
  destroy() {
    this.element.remove();
  }
  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
  getStaticOrderTemplate() {
    const diagramParamFromProp = this.diagramParam.map(({ percent, value }) => `
      <div style="--value: ${value}" data-tooltip="${percent}%"></div>
    `).join('');
    return `<div class="${this.template}">
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.label}
          <a href="/${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.value}</div>
          <div data-element="body" class="column-chart__chart">
          ${diagramParamFromProp}
        </div>
      </div>
    </div>`
  }
}