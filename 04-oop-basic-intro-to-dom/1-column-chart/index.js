export default class ColumnChart {
  constructor({ data,
    label,
    link,
    value,
    formatHeading = value => value
  } = {}) {
    this.data = data || [];
    this.label = label || '';
    this.link = link || '';
    this.value = value || 0;
    this.chartHeight = 50;
    this.formatHeading = formatHeading;
    this.element = this.createColumnChartElement();
    this.elementFromDataBody = this.getDataElementsFromBody();
  }

  createColumnChartElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  update(data) {
    this.data = data;
    this.elementFromDataBody.body.innerHTML = this.setColumnProps();
  }

  getTemplateName(label) {
    switch (label) {
      case 'orders': return 'dashboard__chart_orders';
      case 'sales': return 'dashboard__chart_sales';
      case 'customers': return 'dashboard__chart_sales';
      default: return 'column-chart column-chart_loading';
    }
  }

  getDataElementsFromBody() {
    const element = this.element.querySelector('[data-element="body"]');
    return {body : element};
  }

  destroy() {
    this.remove();
  }

  remove() {
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

  setColumnProps() {
    const diagramParamFromProp = (this.getColumnProps(this.data) || []).map(({ percent, value }) => `
      <div style="--value: ${value}" data-tooltip="${percent}"></div>
    `).join('');
    return diagramParamFromProp;
  }

  getTemplate() {
    return `
            <div class="${this.getTemplateName(this.label)}">
                <div class="column-chart" style="--chart-height: ${this.chartHeight}">
                  <div class="column-chart__title">
                     ${this.label}
                  <a href="/${this.link}" class="column-chart__link">View all</a>
                  </div>
                  <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">
                      ${this.formatHeading(this.value)}
                    </div>
                    <div data-element="body" class="column-chart__chart">
                      ${this.setColumnProps()}
                    </div>
                  </div>
                </div>
            </div>`;
  }
}

const columnChart = new ColumnChart({
  data: [20, 20, 10],
  label: 'customers',
  link: 'sales',
  value: 2045
});


document.body.append(columnChart.element);
console.log(columnChart.getDataElementsFromBody());
columnChart.update([10, 40, 73, 29, 9, 32]);