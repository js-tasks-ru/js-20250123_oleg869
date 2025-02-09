export default class SortableTable {
  //class SortableTable {
    constructor(headerConfig = [{ id, title, sortable, sortType }],
      data = [{ id, title, price, sales }]) {
      this.data = data;
      this.headerConfig = headerConfig;
      this.element = this.setElement();
      this.subElements = this.setSubElements();
    }
  
    setElement() {
      const element = document.createElement('div');
      element.innerHTML = this.getTemplate();
      return element.firstElementChild;
    }

    setSubElements(){
      const subElements = {};

      return subElements;
    }
  
    sort(fieldForSort, order){
        const sortInfo = this.headerConfig.find(elem => elem.id === fieldForSort);
        if(!sortInfo.sortable) return;
        const sortType = sortInfo.sortType;
        const sortAsc = (a, b) => {
            return sortType === "string" ? 
            a[fieldForSort].localeCompare(b[fieldForSort], 'ru', 'en') :
            a[fieldForSort] - b[fieldForSort];
        };
        const sortDesc = (a, b) => {
            return sortType === "string" ? 
             b[fieldForSort].localeCompare(a[fieldForSort], 'ru', 'en') :
             b[fieldForSort] - a[fieldForSort];
        };
        this.data.sort(order === "asc" ? sortAsc : sortDesc);
        this.element.querySelector('.sortable-table__body').innerHTML = this.putProductInTable();
    }
  
    putProductInTable() {
      const getProductsFromData = this.data.map(({id, title, price, sales}) =>
        `
        <a href="/products/${id}" class="sortable-table__row">
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src=""></div>
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