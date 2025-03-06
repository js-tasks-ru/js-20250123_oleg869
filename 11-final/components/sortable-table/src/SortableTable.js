import fetchJson from '../../../utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {
  constructor(
    headerConfig = [],
    {
      data = [],
      sorted = {},
      url = '',
      isSortLocally = false,
      batchSize = 30,
      rowLinks = false
    } = {}
  ) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;
    this.url = new URL(url, BACKEND_URL);
    this.isSortLocally = isSortLocally;
    this.batchSize = batchSize;
    this.rowLinks = rowLinks;
    this.hasMoreData = true;
    this.iteration = 1;
    
    
    this.element = this.createElement();
    this.subElements = this.getSubElements();
    this.arrowElement = this.createArrowElement();
    
    
    this.initSortState();
    this.initEventListeners();
    
    
    if (this.url.pathname !== '/') {
      this.render(this.sorted.id, this.sorted.order);
    }
  }

  async render(field = this.sorted.id, order = this.sorted.order) {
    if (this.url.pathname !== '/') {
      this.element.classList.add('sortable-table_loading');
      this.data = await this.loadData(field, order);
      this.element.classList.remove('sortable-table_loading');
      this.updateBody();
      this.updateHeader(field, order);
    }
  }

  
  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
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
          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
        </div>
      </div>
    `;
  }

  getTableHeader() {
    return this.headerConfig.map(({ id, title, sortable }) => `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        ${sortable ? '<span data-element="arrow" class="sortable-table__sort-arrow"></span>' : ''}
      </div>
    `).join('');
  }

  getTableBody() {
    return this.data.map(product => {
      const tagName = this.rowLinks ? 'a' : 'div';
      const hrefAttr = this.rowLinks ? `href="/products/${product.id}"` : '';
      
      return `
        <${tagName} ${hrefAttr} class="sortable-table__row">
          ${this.headerConfig.map(({ id, template }) => 
            template 
              ? template(product[id]) 
              : `<div class="sortable-table__cell">${product[id]}</div>`
          ).join('')}
        </${tagName}>
      `;
    }).join('');
  }

 
  
  initSortState() {
    if (!this.sorted.id) {
      const sortableHeader = this.headerConfig.find(item => item.sortable);
      this.sorted.id = sortableHeader?.id;
    }
    
    if (this.sorted.id && this.sorted.order) {
      this.sort(this.sorted.id, this.sorted.order);
    }
  }

  sort(field, order) {
    if (this.isSortLocally) {
      this.sortOnClient(field, order);
    } else {
      this.sortOnServer(field, order);
    }
  }

  sortOnClient(field, order) {
    const sortType = this.headerConfig.find(item => item.id === field)?.sortType;
    const direction = order === 'asc' ? 1 : -1;
    
    this.data.sort((a, b) => {
      if (sortType === 'string') {
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      }
      return direction * (a[field] - b[field]);
    });

    this.updateBody();
    this.updateHeader(field, order);
  }

  async sortOnServer(field, order) {
    this.resetPagination();
    this.element.classList.add('sortable-table_loading');
    this.data = await this.loadData(field, order);
    this.element.classList.remove('sortable-table_loading');
    this.updateBody();
    this.updateHeader(field, order);
  }

 
  async loadData(sortField, sortOrder, iteration = 1) {
    try {
      const start = (iteration - 1) * this.batchSize;
      const end = iteration * this.batchSize;
      
      this.url.searchParams.set('_sort', sortField);
      this.url.searchParams.set('_order', sortOrder);
      this.url.searchParams.set('_start', start);
      this.url.searchParams.set('_end', end);
      this.url.searchParams.set('_embed', 'subcategory.category');

      const response = await fetchJson(this.url);
      this.hasMoreData = response.length === this.batchSize;
      
      return response;
    } catch (error) {
      console.error('Error loading data:', error);
      return [];
    }
  }

  async loadMoreData() {
    if (!this.hasMoreData) return;
    
    this.iteration++;
    const newData = await this.loadData(this.sorted.id, this.sorted.order, this.iteration);
    this.data = [...this.data, ...newData];
    this.updateBody();
  }

 
  updateBody() {
    this.subElements.body.innerHTML = this.getTableBody();
  }

  updateHeader(field, order) {
    const headers = this.subElements.header.querySelectorAll('[data-id]');
    
    headers.forEach(header => {
      header.dataset.order = '';
      if (header.dataset.id === field) {
        header.dataset.order = order;
        header.append(this.arrowElement);
      }
    });
  }

 
  createArrowElement() {
    const div = document.createElement('div');
    div.innerHTML = '<span class="sortable-table__sort-arrow"></span>';
    return div.firstElementChild;
  }

  resetPagination() {
    this.iteration = 1;
    this.hasMoreData = true;
    this.data = [];
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    return [...elements].reduce((acc, elem) => {
      acc[elem.dataset.element] = elem;
      return acc;
    }, {});
  }


  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onHeaderClick);
    window.addEventListener('scroll', this.onWindowScroll);
  }

  onHeaderClick = (event) => {
    const header = event.target.closest('[data-sortable="true"]');
    if (!header) return;

    const field = header.dataset.id;
    const order = header.dataset.order === 'desc' ? 'asc' : 'desc';
    
    this.sorted = { id: field, order };
    this.sort(field, order);
  }

  onWindowScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !this.isSortLocally) {
      await this.loadMoreData();
    }
  }

 
  destroy() {
    this.subElements.header.removeEventListener('pointerdown', this.onHeaderClick);
    this.element.remove();
    window.removeEventListener('scroll', this.onWindowScroll);
  }
}