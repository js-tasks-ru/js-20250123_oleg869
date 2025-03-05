import CorePage from './CorePage.js';
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js';
import header from './sales-header.js';
import DoubleSlider from '../../06-events-practice/3-double-slider/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class ProductPage extends CorePage {
    constructor() {
        super();
    }

    loadComponents() {
       
    }

    async render() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        return element;
    }

    getTemplate(){
        return `
              <div class = "product-list">
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
                    <span data-elem="from">$0</span>
                    <div data-elem="inner" class="range-slider__inner">
                        <span data-elem="progress" class="range-slider__progress" style="left: 0%; right: 30.0437%;"></span>
                        <span data-elem="thumbLeft" class="range-slider__thumb-left" style="left: 0%;"></span>
                        <span data-elem="thumbRight" class="range-slider__thumb-right" style="right: 30.0437%;"></span>
                    </div>
                    <span data-elem="to">$2798</span>
                    </div></div>
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
                    <div class = "sortable-table">
                    </div>
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