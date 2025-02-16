import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.isSortLocally = true;
    this.createArrowElement();
    this.initInfoFromSort();
    this.createListener();
  }

  createArrowElement() {
    const elem = document.createElement('div');
    elem.innerHTML =
      ` <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;

    this.arrowElement = elem.firstElementChild;
  }

  initInfoFromSort() {
    const header = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);
    this.sort(this.sorted.id, this.sorted.order);
    header.dataset.order = this.sorted.order;
    header.append(this.arrowElement);
  }

  handleHeaderCellClick = (e) => {
    const cellElement = e.target.closest('.sortable-table__cell[data-sortable="true"]');
    if (!cellElement) return;
    const { id, order } = cellElement.dataset;
    const sortOrder = order === 'desc' ? 'asc' : 'desc';
    this.sort(id, sortOrder);
    cellElement.dataset.order = sortOrder;
    cellElement.append(this.arrowElement);
  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      super.sort(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
  }

  getHeaderElements() {
    return this.subElements.header.querySelectorAll('.sortable-table__cell[data-sortable="true"]');
  }

  sortOnServer() { }

  createListener() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroyListener() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroy() {
    super.destroy();
    this.destroyListener()
  }

}
