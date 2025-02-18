import fetchJson from './utils/fetch-json.js';
import SortableTableV2 from '../../06-events-practice/1-sortable-table-v2/index.js';
const BACKEND_URL = 'https://course-js.javascript.ru';
export default class SortableTable extends SortableTableV2 {
  constructor(headersConfig, { sorted = {}, url, isSortLocally = false, pageSize = 30, scrolledRecords = 10 } = {}) {
    super(headersConfig);
    this.isSortLocally = isSortLocally;
    this.url = new URL(url, BACKEND_URL);
    this.sorted.id = sorted.id;
    this.sorted.order = sorted.order;
    this.pageSize = pageSize;
    this.startPosition = 0;
    this.hasMoreData = true;
    this.render(sorted.id, sorted.order);
    this.handleScroll;
    this.scrolledRecords = scrolledRecords;
    this.createScrollListener();
  }

  handleWindowScroll = async () => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;
    console.log(`scrollY=${scrollY} innerHeight=${innerHeight} scrollHeight=${scrollHeight}`);
    console.log(`scrollY + innerHeight = ${scrollY + innerHeight}`);
    console.log(`scrollHeight - this.scrolledRecords = ${scrollHeight - this.scrolledRecords}`);
    if (scrollY + innerHeight >= scrollHeight) {
      await this.loadNextStack();
    }


  };

  async loadData(sortField, sortOrder) {
    try {
      const reUsedURL = new URL(this.url.href);
      reUsedURL.searchParams.set('_embed', 'subcategory.category');
      reUsedURL.searchParams.set('_sort', sortField);
      reUsedURL.searchParams.set('_order', sortOrder);
      reUsedURL.searchParams.set('_start', this.startPosition);
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

  async loadNextStack() {
    this.startPosition = this.pageSize + 1;
    this.pageSize = this.pageSize * 2;
    try {
      const newData = await this.loadData(this.sorted.id, this.sorted.order);
      if (newData.length === 0) {
        this.hasMoreData = false;
        return;
      }
      this.data = [...this.data, ...newData];
      await this.render();
    }

    catch (e) {
      console.error('Error loading more data', e);
    }

  }

  createScrollListener() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  async render() {
    this.data = await this.loadData(this.sorted.id, this.sorted.order);
    this.subElements.body.innerHTML = this.getTableBody();
  }

  async sortOnServer(id, order) {
    this.data = await this.loadData(id, order);
    this.subElements.body.innerHTML = this.getTableBody();
  }

  destroy() {
    super.destroy();
    window.removeEventListener('scroll', this.handleWindowScroll);
  }
}
