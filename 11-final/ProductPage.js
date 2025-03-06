import CorePage from './CorePage.js';
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js';
import header from './product-page.js';
import DoubleSlider from '../../06-events-practice/3-double-slider/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class ProductPage extends CorePage {
    sortableTable = null;
    doubleSlider = null;
    nameFilter = null;
    statusFilter = null;
    priceRange = { from: 0, to: 4000 };
    constructor() {
        super();
        this.loadComponents();
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
    }

    loadComponents() {
        const url = new URL('api/rest/products', BACKEND_URL);

        this.componentContainer.sortableTable = new SortableTable(header, {
            url: url,
            sorted: { id: 'title', order: 'asc' },
            isSortLocally: true,
            rowLinks: true
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
        await this.componentContainer.sortableTable.loadData();
        const productTable = element.querySelector('[data-elem="sortable-table"]');
        await this.componentContainer.sortableTable.render();
        productTable.append(this.componentContainer.sortableTable.element);
        this.element = element;
        this.addEventListeners(this.element);        
        return this.element;
    }

    addEventListeners(element){
        this.componentContainer.doubleSlider.element.addEventListener('range-select', this.handlePriceChange);
        element.querySelector('[data-elem="filterStatus"]').addEventListener('change', this.handleStatusChange);
        element.querySelector('[data-elem="filterName"]').addEventListener('input', this.handleNameInput);
    }

    handlePriceChange = (event) => {
        this.priceRange = event.detail;
        this.updateTableData();
    };

    handleStatusChange = (event) => {
        this.statusFilter = event.target.value;
        this.updateTableData();
    };

    handleNameInput = (event) => {        
        this.nameFilter = event.target.value.trim().toLowerCase();
        this.updateTableData();
    };    

    async updateTableData() {
        const url = new URL('api/rest/products', BACKEND_URL);
        
        url.searchParams.set('price_gte', this.priceRange.from);
        url.searchParams.set('price_lte', this.priceRange.to);
        if(this.statusFilter) url.searchParams.set('status', this.statusFilter);
        if(this.nameFilter) url.searchParams.set('title_like', this.nameFilter);
        
        this.componentContainer.sortableTable.url = url;
        this.componentContainer.sortableTable.resetPagination();
        await this.componentContainer.sortableTable.loadData();
        await this.componentContainer.sortableTable.render();
    }

    getTemplate() {
        return `
                <div class="content__top-panel">
                    <h1 class="page-title">Товары</h1>
                    <a href="/products/add/" class="button-primary" data-page="true">Добавить товар</a>
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

    destroy() {
        super.destroy();
        this.componentContainer.doubleSlider.element.removeEventListener('range-select', this.handlePriceChange);
        this.element.querySelector('[data-elem="filterStatus"]').removeEventListener('change', this.handleStatusChange);
        this.element.querySelector('[data-elem="filterName"]').removeEventListener('input', this.handleNameInput);
    }
}