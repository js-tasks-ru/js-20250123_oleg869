import escapeHtml from './utils/escape-html.js';
import fetchJson from './utils/fetch-json.js';
//https://course-js.javascript.ru/api/rest/categories?_sort=weight&_refs=subcategory
//https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30
const IMGUR_CLIENT_ID = '28aaa2e823b03b1';
const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ProductForm {
  element;
  subElements = {};
  categories;
  products;
  constructor(productId) {
    this.productId = productId;

    
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
    this.categories = await this.loadCategories();
    this.products = await this.loadProducts();

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
    catch (e) { console.error('Error loading categories data', e) }
  }

  async loadProducts() {
    try {
      const url = new URL('/api/rest/products', BACKEND_URL);
      url.searchParams.set('_embed', 'subcategory.category');
      url.searchParams.set('_sort', 'title');
      url.searchParams.set('_order', 'asc');
      url.searchParams.set('_start', 0);
      url.searchParams.set('_end', 30);
      return await fetchJson(url);
    }
    catch (e) { console.error('Error loading product data', e) }
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
          
          <div class="form-group form-group__wide" data-element="sortable-list-container">
          <label class="form-label">Фото</label>
          <div data-element="imageListContainer"><ul class="sortable-list"><li class="products-edit__imagelist-item sortable-list__item" style="">
            <input type="hidden" name="url" value="https://i.imgur.com/MWorX2R.jpg">
            <input type="hidden" name="source" value="75462242_3746019958756848_838491213769211904_n.jpg">
            <span>
          <img src="icon-grab.svg" data-grab-handle="" alt="grab">
          <img class="sortable-table__cell-img" alt="Image" src="https://i.imgur.com/MWorX2R.jpg">
          <span>75462242_3746019958756848_838491213769211904_n.jpg</span>
          </span>
          <button type="button">
            <img src="icon-trash.svg" data-delete-handle="" alt="delete">
          </button></li></ul></div>
          <button type="button" name="uploadImage" class="button-primary-outline"><span>Загрузить</span></button>
          </div>
         
          <div class="form-group form-group__half_left">
            <label class="form-label">Категория</label>
            <select class="form-control" name="subcategory">              
              ${this.getCategoryListTemplate()}
            </select>
        </div>
         
          </form>
      </div>
    `
  }

  getCategoryListTemplate() {
    return `
    <div class="form-group form-group__half_left">
            <label class="form-label">Категория</label>
            <select class="form-control" name="subcategory">
              ${this.getCategories()}
            </select>
          `;
  }

  getCategories() {
    return this.categories.map(category => 
      category.subcategories.map(subcategory => `
        <option value = "${subcategory.id}"
        ${subcategory.id === this.products.subcategory ? 'selected' : ''}>
        </option>
      `
    ).join('')).join('');
  }


  destroy() {
    this.element.remove();
  }
}
