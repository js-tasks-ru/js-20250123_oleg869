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

    let header = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);

    if (!header) {
      const sortableHeader = this.headerConfig.find(item => item.sortable);
      this.sorted.id = sortableHeader?.id;
      header = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);
    }

    if (this.data) this.sort(this.sorted.id, this.sorted.order);
    header.dataset.order = this.sorted.order;
    header.append(this.arrowElement);
  }

  handleHeaderCellClick = (e) => {
    const cellElement = e.target.closest('.sortable-table__cell[data-sortable="true"]');
    if (!cellElement) return;
    const { id, order } = cellElement.dataset;
    const newOrder = order === 'desc' ? 'asc' : 'desc';
    if (this.isSortLocally) {
      this.sortOnClient(id, newOrder);
    } else {
      this.sortOnServer(id, newOrder);
    }
    cellElement.dataset.order = newOrder;
    this.updateHeaderSortArrow();
  }

  updateHeaderSortArrow() {
    const currentHeaderCell = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);

    this.subElements.header.querySelectorAll('.sortable-table__cell').forEach(cell => {
      cell.dataset.order = '';
      const existingArrow = cell.querySelector('.sortable-table__sort-arrow');
      if (existingArrow) {
        cell.removeChild(existingArrow);
      }
    });

    if (currentHeaderCell) {
      currentHeaderCell.dataset.order = this.sorted.order;
      currentHeaderCell.append(this.arrowElement);
    }
  }


  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer(sortField, sortOrder);
    }
  }

  sortOnClient(id, order) {
    super.sort(id, order);
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
