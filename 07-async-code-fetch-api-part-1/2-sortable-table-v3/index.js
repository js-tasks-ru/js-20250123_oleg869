import fetchJson from './utils/fetch-json.js';
import SortableTableV2 from '../../06-events-practice/1-sortable-table-v2/index.js';
const BACKEND_URL = 'https://course-js.javascript.ru';
export default class SortableTable extends SortableTableV2 {
  constructor(headersConfig, { sorted = {}, url, isSortLocally = false, batchSize = 30 } = {}) {
    super(headersConfig);
    this.isSortLocally = isSortLocally;
    this.url = new URL(url, BACKEND_URL);
    this.sorted.id = sorted.id;
    this.sorted.order = sorted.order;
    this.batchSize = batchSize;
    this.hasMoreData = true;
    this.iteration = 1;
    this.render(sorted.id, sorted.order);
  }

  handleWindowScroll = async () => {
    if (!this.hasMoreData) return;
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;
    if (scrollY + innerHeight >= scrollHeight) {
      await this.loadNextStack();
    }
  };

  async loadData(sortField, sortOrder, iteration) {
    try {
      const startPosition = (iteration) ? (iteration - 1) * this.batchSize : 0;
      const endPosition = (!iteration) ? this.iteration * this.batchSize : this.batchSize * iteration;
      const reUsedURL = new URL(this.url.href);
      reUsedURL.searchParams.set('_embed', 'subcategory.category');
      reUsedURL.searchParams.set('_sort', sortField);
      reUsedURL.searchParams.set('_order', sortOrder);
      reUsedURL.searchParams.set('_start', startPosition);
      reUsedURL.searchParams.set('_end', endPosition);

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
  
  async loadNextStack() {
    this.iteration++;
    try {
      const newData = await this.loadData(this.sorted.id, this.sorted.order, this.iteration);
      if (newData.length === 0) {
        this.hasMoreData = false;
        return;
      }
      this.data = [...this.data, ...newData];
      await this.render();
    }

    catch (e) {
      console.error('Error loading more data', e);
      this.iteration--;
    }

  }

  createListener() {
    super.createListener();
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  /*createScrollListener() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }*/

  async render() {
    if (this.iteration === 1 && this.hasMoreData)
      this.data = await this.loadData(this.sorted.id, this.sorted.order);
    this.subElements.body.innerHTML = this.getTableBody();
  }

  async sortOnServer(id, order) {
    this.data = await this.loadData(id, order);
    await this.render();
  }

  destroy() {
    super.destroy();
    window.removeEventListener('scroll', this.handleWindowScroll);
  }
}
