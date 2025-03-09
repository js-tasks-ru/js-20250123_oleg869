import CorePage from './CorePage.js';
import RangePicker from '../../08-forms-fetch-api-part-2/2-range-picker/index.js';
import ColumnChart from '../../07-async-code-fetch-api-part-1/1-column-chart/index.js';
import SortableTable from './components/sortable-table/src/SortableTable.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class DashboardPage extends CorePage {
    constructor() {
        super();
        this.handleOnDateSelect = this.handleOnDateSelect.bind(this);
        this.createElement();
        this.setSubElements();
    }
    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        this.element = element.firstElementChild;
    }

    setSubElements() {
        const dataElements = this.element.querySelectorAll('[data-element]');
        for (const elem of dataElements) {
            const name = elem.dataset.element;
            this.subElements[name] = elem;
        }
    }

    async render() {
        await this.loadComponents();
        return this.element;
    }

    async loadComponents() {
        const to = new Date();
        const from = new Date(to.getFullYear(), to.getMonth() - 1, to.getDate());
        ///
        const ordersChart = new ColumnChart({
            url: new URL('api/dashboard/orders', BACKEND_URL).href,
            range: { from, to },
            label: 'orders',
            link: '#'
        });
        this.componentContainer.ordersChart = ordersChart;
        ordersChart.update(from, to);
        this.subElements.ordersChart.append(ordersChart.element);

        const salesChart = new ColumnChart({
            url: new URL('api/dashboard/sales', BACKEND_URL).href,
            range: { from, to },
            label: 'sales',
            formatHeading: data => `$${data}`
        });
        this.componentContainer.salesChart = salesChart;
        salesChart.update(from, to);
        this.subElements.salesChart.append(salesChart.element);

        const customersChart = new ColumnChart({
            url: new URL('api/dashboard/customers', BACKEND_URL).href,
            range: { from, to },
            label: 'customers'
        });
        this.componentContainer.customersChart = customersChart;
        customersChart.update(from, to);
        this.subElements.customersChart.append(customersChart.element);

        ///
        const url = new URL('api/dashboard/bestsellers', BACKEND_URL);
        url.searchParams.set('from', from.toISOString());
        url.searchParams.set('to', to.toISOString());

        const sortableTable = new SortableTable(header, {
            url: url,
            sorted: { id: 'title', order: 'asc' },
            isSortLocally: true
        });
        this.componentContainer.sortableTable = sortableTable;
        this.subElements.sortableTable.append(sortableTable.element);

        const rangePicker = new RangePicker({ from, to });
        this.componentContainer.rangePicker = rangePicker;
        this.subElements.rangePicker.append(rangePicker.element);
        this.createEventListenerOnSetDateOnRangePicker();
    }


    createEventListenerOnSetDateOnRangePicker() {
        this.componentContainer.rangePicker.element.addEventListener(
            'date-select',
            this.handleOnDateSelect
        );
    }

    handleOnDateSelect(event) {
        const { from, to } = event.detail;
        console.log(from, to);
        this.updateComponents(from, to);
    }

    async updateComponents(from, to) {
        this.componentContainer.ordersChart.update(from, to);
        this.componentContainer.salesChart.update(from, to);
        this.componentContainer.customersChart.update(from, to);

        const url = new URL('api/dashboard/bestsellers', BACKEND_URL);
        url.searchParams.set('from', from.toISOString());
        url.searchParams.set('to', to.toISOString());
        url.searchParams.set('_sort', this.componentContainer.sortableTable.sorted.id);
        url.searchParams.set('_order', this.componentContainer.sortableTable.sorted.order);
        this.componentContainer.sortableTable.url = url;
        this.componentContainer.sortableTable.resetPagination();
        await this.componentContainer.sortableTable.loadData();
        await this.componentContainer.sortableTable.render();
    }


    getTemplate() {
        return `         
             <div class="dashboard">
                <div class="content__top-panel">
                <h2 class="page-title">Dashboard</h2>
                <div data-element="rangePicker"></div>
                </div>
                <div data-element="chartsRoot" class="dashboard__charts">
                <div data-element="ordersChart" class="dashboard__chart_orders"></div>
                <div data-element="salesChart" class="dashboard__chart_sales"></div>
                <div data-element="customersChart" class="dashboard__chart_customers"></div>
                </div>
                <h3 class="block-title">Best sellers</h3>
                <div data-element="sortableTable"></div>
            </div>`;
    }


    destroy() {
        super.destroy();
        this.componentContainer.rangePicker.element.removeEventListener(
            'date-select',
            this.handleDateSelect
        );
        console.log('DashboardPage destroyed');
        this.componentContainer.rangePicker.destroy();
        this.componentContainer.sortableTable.destroy();          
    }

}