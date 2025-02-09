export default class SortableTable {
  constructor(
    headerConfig = [], 
    data = []
  ) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  getTableHeder(){
    
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getTableHeader()}
          </div>
          <div data-element="body" class="sortable-table__body">
            
          </div>
        </div>
      </div>
    `;
  }

  destroy() {
    this.element.remove();
  }
}