export default class ColumnChar {
  constructor({ data, label, link, value } = {}) {
    this.data = data || [];
    this.label = label || '';
    this.link = link || '';
    this.value = value || 0;
    this.element = this.createColumnCharElement();
    this.chartHeight = 50;
    this.diagramParam = this.getColumnProps(this.data);
    this.template = this.getTemplateName(this.label);
  }

  createColumnCharElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  getTemplateName(label){
    switch(label){
      case 'orders': return 'dashboard__chart_orders';
      case 'sales': return 'dashboard__chart_sales';
      case 'customers': return 'dashboard__chart_sales';
      default: return 'empty';
    }
  }

  destroy() {
    this.element.remove();
  }

  getColumnProps(data) {
    if (!data) return [];
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  getTemplate() {
    const diagramParamFromProp = (this.diagramParam || []).map(({ percent, value }) => `
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