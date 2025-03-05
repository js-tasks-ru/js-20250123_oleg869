import CorePage from './CorePage.js';
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js';
import header from './product-page.js';
import DoubleSlider from '../../06-events-practice/3-double-slider/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class ProductPage extends CorePage {
    sortableTable = null;
    doubleSlider = null;
    constructor() {
        super();
        this.loadComponents();
    }

    loadComponents() {
        const url = new URL('api/rest/products', BACKEND_URL);

        this.componentContainer.sortableTable = new SortableTable(header, {
            url: url,
            sorted: { id: 'title', order: 'asc' },
            isSortLocally: true
        });

        this.componentContainer.doubleSlider = new DoubleSlider({
            min: 0,
            max: 4000,
            formatValue: value => `$${value}`,
            selected: {
                from: 0,
                to: 4000
            }
        });

    }

    async render() {
        const element = document.createElement('div');
        element.className = 'products-list'
        element.innerHTML = this.getTemplate();

        const sliderContainer = element.querySelector('[data-elem="sliderContainer"]');
        sliderContainer.append(this.componentContainer.doubleSlider.element);

        const productTable = element.querySelector('[data-elem="sortable-table"]');
        await this.componentContainer.sortableTable.render();
        productTable.append(this.componentContainer.sortableTable.element);

        return element;
    }

    getTemplate() {
        return `
                <div class="content__top-panel">
                    <h1 class="page-title">Товары</h1>
                    <a href="/products/add" class="button-primary">Добавить товар</a>
                </div>
                <div class="content-box content-box_small">
                        <form class="form-inline">
                        <div class="form-group">
                            <label class="form-label">Сортировать по:</label>
                            <input type="text" data-elem="filterName" class="form-control" placeholder="Название товара">
                        </div>
                        <div class="form-group" data-elem="sliderContainer">
                            <label class="form-label">Цена:</label>
                        <div class="range-slider">
                            
                        </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Статус:</label>
                            <select class="form-control" data-elem="filterStatus">
                            <option value="" selected="">Любой</option>
                            <option value="1">Активный</option>
                            <option value="0">Неактивный</option>
                            </select>
                        </div>
                        </form>
                </div>
                <div data-elem = "productsContainer" class = "products-list__container">
                    <div data-elem = "sortable-table" class = "sortable-table">
                    </div>
                </div>
              
        `;
    }



    async updateTableData() {

    }

    destroy() {
        super.destroy();

    }
}