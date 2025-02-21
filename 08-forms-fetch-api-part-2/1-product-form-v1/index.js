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
  productForm;
  imgurUrl = 'https://imgur.com/';
  defaultFormData = {
    title: '',
    description: '',
    quantity: 1,
    subcategory: '',
    status: 1,
    price: 100,
    discount: 0
  };
  constructor(productId) {
    this.productId = productId;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
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
    this.productForm = this.productId ? await this.loadProducts() :
      [this.defaultFormData];
    this.createElement();
    this.getSubElements();
    this.createEventListener();
    return this.element;
  }

  async loadCategories() {
    try {
      const url = new URL('/api/rest/categories', BACKEND_URL);
      url.searchParams.set('_sort', 'weight');
      url.searchParams.set('_refs', 'subcategory');
      const response = await fetchJson(url);
      console.log(response);
      return response;
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
      const response = await fetchJson(url);
      console.log(response);
      const getProductFromServer = (products) => {
        return products.find(elem => elem.id === this.productId);
      };
      return getProductFromServer(response);
    }
    catch (e) { console.error('Error loading product data', e) }
  }

  getTemplate() {
    return `
      <div class="product-form">
         <form data-element="productForm" class="form-grid">          
          ${this.getTitleTemplate()}
          ${this.getDescriptionTemplate()}          
          <div class="form-group form-group__wide" data-element="sortable-list-container">
          <label class="form-label">Фото</label>
          ${this.getImageTemplate()}
          ${this.getCategoryListTemplate()}   
          ${this.getPriceDiscountQuantityStatus()}
          <div class="form-buttons">
            <button type="submit" name="save" class="button-primary-outline">
              Сохранить товар
            </button>
          </div>
          </form>
      </div>
    `
  }

  getTitleTemplate() {
    return `
      <div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input required="" type="text" name="title"
          class="form-control" placeholder="Название товара"
          value = ${this.productForm.title}>
        </fieldset>
      </div>
    `
  }

  getDescriptionTemplate() {
    return `
      <div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea required="" class="form-control" name="description" data-element="productDescription"
         placeholder="Описание товара"
         >${this.productForm.description}</textarea>
      </div>
    `;

  }

  getImageTemplate() {
    return `
      <div data-element="imageListContainer"><ul class="sortable-list">
        ${(this.productForm.images).map(image => `
            <li class="products-edit__imagelist-item sortable-list__item" style="">
            <input type="hidden" name="url" value="${escapeHtml(image.url)}">
            <input type="hidden" name="source" value="${escapeHtml(image.source)}">
            <span>
              <img src="icon-grab.svg" data-grab-handle alt="grab">
              <img class="sortable-table__cell-img" alt="Image" src="${escapeHtml(image.url)}">
              <span>${escapeHtml(image.source)}</span>
            </span>
            <button type="button">
              <img src="icon-trash.svg" data-delete-handle alt="delete">
            </button>
            </li>
          `).join('')}  
      
        <button type="button" name="uploadImage" class="button-primary-outline"><span>Загрузить</span></button>
      </div>
    `;
  }

  getCategoryListTemplate() {
    return `
          <div class="form-group form-group__half_left">
            <label class="form-label">Категория</label>
            <select class="form-control" name="subcategory" data-element="subcategory">
              ${this.getCategories()}
            </select>
          </div>
          `;
  }

  getCategories() {
    return this.categories.map(category =>
      category.subcategories.map(subcategory => `
        <option value = "${subcategory.id}"
        ${this.productForm.subcategory.id === subcategory.id ? `selected = ${category.title}` : ''}>
        ${category.title} > ${subcategory.title}
        </option>
      `
      ).join('')).join('');
  }

  getPriceDiscountQuantityStatus() {
    return `
    <div class="form-group form-group__half_left form-group__two-col">
      <fieldset>
        <label class="form-label">Цена ($)</label>
        <input required="" type="number" name="price" class="form-control" placeholder="100"
         value = ${this.productForm.price} data-element="price">
      </fieldset>
      <fieldset>
        <label class="form-label">Скидка ($)</label>
        <input required="" type="number" name="discount" class="form-control" placeholder="0"
         value = ${this.productForm.discount} data-element="discount">
      </fieldset>
    </div>
    <div class="form-group form-group__part-half">
      <label class="form-label">Количество</label>
      <input required="" type="number" class="form-control" name="quantity" placeholder="1"
      value = ${this.productForm.quantity} data-element="quantity">
    </div>
    <div class="form-group form-group__part-half">
      <label class="form-label">Статус</label>
      <select class="form-control" name="status" data-element="status">

        <option value="1" ${this.productForm.status === 1 ? 'selected' : ''}>Активен</option>
        <option value="0" ${this.productForm.status === 0 ? 'selected' : ''}>Неактивен</option>

      </select>
    </div>
  `
  }

  createEventListener() {
    this.subElements.productForm.addEventListener('submit', this.handleOnSubmit);
  }

  handleOnSubmit = async event => {
    event.preventDefault();
    console.log('send to imgur');
    await this.sendProductDataToImgur();
  }

  async sendProductDataToImgur() {
    const product = {
      id: this.productId,
      description: this.subElements.productDescription.value,
      discount: this.subElements.discount.value,
      price: this.subElements.price.value,
      quantity: this.subElements.quantity.value,
      status: this.subElements.status.value,
      subcategory: this.subElements.subcategory.value,
      title: this.subElements.title.value,

    }

    console.log(product);
  }

  getImageStack() {

  }

  removeEventListener() {
    this.subElements.productForm.addEventListener('submit', this.handleOnSubmit);
  }

  destroy() {
    this.element.remove();
  }
}
