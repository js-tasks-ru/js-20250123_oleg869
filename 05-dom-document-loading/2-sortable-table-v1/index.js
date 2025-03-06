export default class SortableTable {
  constructor(
    headerConfig = [],
    data = []
  ) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.element = this.createElement();
    this.subElements = this.getSubElements();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  getTableHeader() {
    return this.headerConfig.map(({ id, title, sortable }) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
            <span>${title}</span>            
        </div>
      `;
    }).join('');
  }
  getTableBody() {
    return this.data.map(product => {
      return `
              <a href="/products/${product.id}" class="sortable-table__row">
                ${this.headerConfig.map(({ id, template }) => {
                const tableContent = product[id];
                return template ?
                  template(tableContent) :
                  `<div class="sortable-table__cell">${tableContent}</div>`;
              }).join('')}
              </a>
          `;
    }).join('');
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getTableHeader()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getTableBody()}
          </div>
        </div>
      </div>
    `;
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    return [...elements].reduce((acc, subElement) => {
      acc[subElement.dataset.element] = subElement;
      return acc;
    }, {});
  }

  sort(field, order) {
    const sortableHeader = this.headerConfig.find(elem => elem.id == field);
    if (!sortableHeader || !sortableHeader.sortable) return;
    const sortType = sortableHeader.sortType;
    const sortAsc = (a, b) => {
      return sortType === "string" ?
        a[field].localeCompare(b[field], 'ru', 'en') :
        a[field] - b[field];
    };
    const sortDesc = (a, b) => {
      return sortType === "string" ?
        b[field].localeCompare(a[field], 'ru', 'en') :
        b[field] - a[field];
    };
    this.data.sort(order === "asc" ? sortAsc : sortDesc);
    this.subElements.body.innerHTML = this.getTableBody();
  }

  destroy() {
    this.element.remove();
  }
}