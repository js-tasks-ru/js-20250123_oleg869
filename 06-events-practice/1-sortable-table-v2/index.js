import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.isSortLocally = true;
    this.headerElements = this.getHeaderElements();    
    this.createArrowElement();
    this.sort(this.sorted.id, this.sorted.order);
    this.createListener();
  }

  createArrowElement() {
    const elem = document.createElement('div');
    elem.innerHTML =
      ` <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      <span>
    `;
    this.arrowElement = elem.firstElementChild;
  }

  handleHeaderCellClick = (e) => {
    const cellElement = e.target.closest('.sortable-table__cell[data-sortable="true"]');
    if (!cellElement) return;

    const { id, order } = cellElement.dataset;
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    this.sort(id, newOrder);
  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      super.sort(sortField, sortOrder);
      this.headerElements.forEach(elem=> {
        elem.removeAttribute('data-order');
        if (elem.dataset.id === sortField) {
          elem.dataset.order = sortOrder;
          elem.append(this.arrowElement);
        }
      });
    } else {
      this.sortOnServer();
    }
  }

  getHeaderElements(){
    return this.subElements.header.querySelectorAll('.sortable-table__cell[data-sortable="true"]');     
  }

  sortOnServer(){}

  createListener() {
    this.headerElements.forEach(elem=> {elem.addEventListener('pointerdown', this.handleHeaderCellClick)});
  }

  destroyListener() {
    this.headerElements.forEach(elem=> {elem.removeEventListener('pointerdown', this.handleHeaderCellClick)});
  }

  destroy(){
    super.destroy();
    this.destroyListener()
  }

}
