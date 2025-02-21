import escapeHtml from './utils/escape-html.js';
import fetchJson from './utils/fetch-json.js';
//https://course-js.javascript.ru/api/rest/categories?_sort=weight&_refs=subcategory
const IMGUR_CLIENT_ID = '28aaa2e823b03b1';
const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ProductForm {
  element;
  subElements = {};
  constructor(productId) {
    this.productId = productId;

    this.createElement();
    this.render();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTempalte();
    this.element = element.firstElementChild;
  }

  getSubElements() {
    return this.element.querySelectorAll('[data-element]').forEach(
      element => {
        this.subElements[element.dataset.element] = element;
      });
  }

  async render() {
    const categories = await this.loadCategories();
   

    console.log(categories);

    this.createElement();
    this.getSubElements();
    return this.element;
  }

  async loadCategories() {
    try {
      const url = new URL('/api/rest/categories', BACKEND_URL);
      url.searchParams.set('_sort', 'weight');
      url.searchParams.set('_refs', 'subcategory');
      return await fetchJson(url);
    }
    catch(e) {console.error('Error loading more data', e)}

  }

  getTempalte() {
    return `
      <div class="product-form">
         <form data-element="productForm" class="form-grid">
          <div class="form-group form-group__half_left">
            <fieldset>
              <label class="form-label">Название товара</label>
              <input required="" type="text" name="title" class="form-control" placeholder="Название товара">
            </fieldset>
          </div>
          <div class="form-group form-group__wide">
              <label class="form-label">Описание</label>
              <textarea required="" class="form-control" name="description" data-element="productDescription" placeholder="Описание товара"></textarea>
          </div>
         </form>
      </div>
    `
  }

  destroy() {
    this.element.remove();
  }
}
