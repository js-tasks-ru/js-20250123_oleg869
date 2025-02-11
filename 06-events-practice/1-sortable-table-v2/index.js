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
    this.createListener();
  }

  createArrowElement() {
    const div = document.createElement('div');
    div.innerHTML =
      ` <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      <span>
    `;
    this.arrowElement = div.firstElementChild;
  }

  handleHeaderCellClick = (e) => {
    
  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      super.sort(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
  }

  getHeaderElements(){
    const elements = this.element.querySelectorAll('.sortable-table__cell[data-sortable="true"]');
    return elements;
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
