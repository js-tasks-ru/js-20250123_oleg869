import fetchJson from './utils/fetch-json.js';
import SortableTableV2 from '../../06-events-practice/1-sortable-table-v2/index.js';
const BACKEND_URL = 'https://course-js.javascript.ru';
export default class SortableTable extends SortableTableV2 {
  constructor(headersConfig, { sorted = {}, url, isSortLocally = false, pageSize = 30} = {}) {
    super(headersConfig);
    this.isSortLocally = isSortLocally;
    this.url = new URL(url, BACKEND_URL);
    this.sorted.id = sorted.id;
    this.sorted.order = sorted.order;
    this.pageSize = pageSize;
    this.render(sorted.id, sorted.order);
  }

  async loadData(sortField, sortOrder) {
    try {
      const reUsedURL = new URL(this.url.href);
      reUsedURL.searchParams.set('_embed', 'subcategory.category');
      reUsedURL.searchParams.set('_sort', sortField);
      reUsedURL.searchParams.set('_order', sortOrder);
      reUsedURL.searchParams.set('_start', 0);
      reUsedURL.searchParams.set('_end', this.pageSize);

      const response = await fetch(reUsedURL.href);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseToJSON = await response.json();
      return responseToJSON;
    }
    catch (error) {
      console.error('Error loading data:', error);
    }

  }
  async render() {
    this.data = await this.loadData(this.sorted.id, this.sorted.order);
    this.subElements.body.innerHTML = this.getTableBody();
  }

  async sortOnServer(id, order) {
    this.data = await this.loadData(id, order);
    this.subElements.body.innerHTML = this.getTableBody();
  }
}
