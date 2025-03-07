import CorePage from './CorePage.js';
import SortableList from '../09-tests-for-frontend-apps/2-sortable-list/index.js'
import fetchJson from './utils/fetch-json.js';
const BACKEND_URL = 'https://course-js.javascript.ru';

export default class CategoryPage extends CorePage {
    constructor() {
        super();

    }

    async render() {
        const element = document.createElement('div');
        element.className = 'categories'
        const response = await this.loadCategories();
        element.innerHTML = this.getTemplate(response);

        this.element = element;
        this.loadComponents();

        return this.element;
    }

    loadComponents() {
        const sortableLists = Array.from(this.element.querySelectorAll('.subcategory-list .sortable-list'))
        this.componentContainer = sortableLists.map(listElement => {
            const items = Array.from(listElement.querySelectorAll('.sortable-list__item'));

            const sortableList = new SortableList({
                items: items
            });

            listElement.replaceWith(sortableList.element);
            return sortableList;
        });

    }

    async loadCategories() {
        try {
            const url = new URL('/api/rest/categories', BACKEND_URL);
            url.searchParams.set('_sort', 'weight');
            url.searchParams.set('_refs', 'subcategory');
            const response = await fetchJson(url);
            return response;
        }
        catch (e) { console.error('Error loading categories data', e) }
    }

    getTemplate(response = []) {
        return `
            <div class="content__top-panel">
                <h1 class="page-title">Категории товаров</h1>
            </div>
            <p>лол, копирну текст прямо с сайта Подкатегории можно перетаскивать, меняя их порядок внутри своей категории.</p>
            <div data-elem="categoriesContainer">
                ${this.getCategories(response)}
            </div>
        `;
    }

    getCategories(response) {
        return response.map(category => `
            <div class="category category_open" data-id="${category.id}">
                <header class="category__header">
                    ${category.title}
                </header>
                <div class="category__body">
                    <div class="subcategory-list">
                        <ul class="sortable-list">
                            ${this.getSubcategories(category.subcategories)}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getSubcategories(subcategories) {
        return subcategories.map(subcategory => `
            <li class="categories__sortable-list-item sortable-list__item" 
                data-grab-handle 
                data-id="${subcategory.id}">
                <strong>${subcategory.title}</strong>
                <span><b>${subcategory.count}</b> products</span>
            </li>
        `).join('');
    }

    destroy() {
        super.destroy();
    }
}