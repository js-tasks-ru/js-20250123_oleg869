export default class SortableTable {
//class SortableTable {
  constructor(headerConfig = [{ id, title, sotrable, sortType }],
    data = [{ id, title, price, sales }]) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.element = this.setElement();
  }

  setElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  putProductInTable() {
    const getProductsFromData = this.data.map(({id, title, price, sales}) =>
      `
      <a href="/products/${id}" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="https://imgur.com/gallery/sr-71-photos-t2Gn6K2.jpg"></div>
        <div class="sortable-table__cell">${title}</div>

        <div class="sortable-table__cell">17</div>
        <div class="sortable-table__cell">${price}</div>
        <div class="sortable-table__cell">${sales}</div>
      </a>    
      `
    ).join('');
    return getProductsFromData;
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">

          <div data-element="header" class="sortable-table__header sortable-table__row">
            <div class="sortable-table__cell" data-id="images" data-sortable="false">
              <span>Image</span>
            </div>
            <div class="sortable-table__cell" data-id="title" data-sortable="true">
              <span>Name</span>
              <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>
            </div>
            <div class="sortable-table__cell" data-id="quantity" data-sortable="true">
              <span>Quantity</span>
            </div>
            <div class="sortable-table__cell" data-id="price" data-sortable="true">
              <span>Price</span>
            </div>
            <div class="sortable-table__cell" data-id="sales" data-sortable="true">
              <span>Sales</span>
            </div>
          </div>            

          <div data-element="body" class="sortable-table__body">

            ${this.putProductInTable()}

          </div>

        </div>
      </div>
    `;
  }


  destroy() {
    this.remove();
  }

  remove() {
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

sortable = new SortableTable(header, data);
document.body.append(sortable.element);

*/