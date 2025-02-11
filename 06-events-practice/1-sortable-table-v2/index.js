import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
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



  createListener(){
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderClick);
  }

  destroyListener(){
    this.subElements.header.destroyListener('pointerdown', this.handleHeaderClick);
  }

}
