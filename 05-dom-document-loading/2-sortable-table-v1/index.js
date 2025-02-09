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

  getTableHeder(){
    return this.headerConfig.map(({ id, title, sortable }) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
                      <span>${title}</span>
        </div>
      `;}).join('');
  }

  getTableBody(){
    return this.data.map(product => {
      return `
        <a href="/products/${product.id}" class="sortable-table__row">
          ${this.headerConfig.map(({ id }) => {
            const tableContent = (id === 'images') ?
             `<img class="sortable-table-image" alt="Image" src="${product[id]}">`
              : product[id];
            return `<div class="sortable-table__cell">${tableContent}</div>`;
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
            ${this.getTableHeder()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getTableBody()}
          </div>
        </div>
      </div>
    `;
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element="body"]');
    return [...elements].reduce((acc, subElement) => {
      console.log('acc ', acc);
      console.log('acc sub elem ', acc[subElement.dataset.element]);
      console.log('subElem ', subElement);
      acc[subElement.dataset.element] = subElement;
      console.log('acc reform ', acc);
      return acc;
    }, {});
  }

  sort(field, order){
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

/*
const data = [
  {
    'id': 'soska-(pustyshka)-nuk-10729357',
    'title': 'Соска (пустышка) NUK 10729357',
    'price': 3,
    'sales': 14
  },
  {
    'id': 'tv-tyuner-d-color--dc1301hd',
    'title': 'ТВ тюнер D-COLOR  DC1301HD',
    'price': 15,
    'sales': 13
  },
  {
    'id': 'detskiy-velosiped-lexus-trike-racer-trike',
    'title': 'Детский велосипед Lexus Trike Racer Trike',
    'price': 53,
    'sales': 11
  },
  {
    'id': 'soska-(pustyshka)-philips-scf182/12',
    'title': 'Соска (пустышка) Philips SCF182/12',
    'price': 9,
    'sales': 11
  },
  {
    'id': 'powerbank-akkumulyator-hiper-sp20000',
    'title': 'Powerbank аккумулятор Hiper SP20000',
    'price': 30,
    'sales': 11
  },
];

 const header = [
  {
    id: 'title',
    title: 'Name',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'sales',
    title: 'Sales',
    sortable: true,
    sortType: 'number'
  },
];

sortableTable = new SortableTable(header, data);
document.body.append(sortableTable.element);
*/