import CorePage from './CorePage.js';
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js';
import header from './sales-header.js';
import RangePicker from '../../08-forms-fetch-api-part-2/2-range-picker/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class SalesPage extends CorePage {
    constructor() {
        super();
        this.selectedDateRange = {
            from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            to: new Date()
        };
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.loadComponents();

    }

    loadComponents() {
        this.componentContainer = {

            rangePicker: new RangePicker({
                from: this.selectedDateRange.from,
                to: this.selectedDateRange.to
            }),

            salesTable: new SortableTable(header, {
                url: new URL('api/rest/orders', BACKEND_URL),
                isSortLocally: false,
                sorted: {
                    id: 'createdAt',
                    order: 'desc'
                }
            })
        };
    }

    async render() {
        const container = document.createElement('div');
        container.className = 'sales full-height flex-column';

        const tableContainer = document.createElement('div');
        tableContainer.dataset.element = 'ordersContainer';
        container.append(tableContainer);

        await this.componentContainer.salesTable.render();
        tableContainer.append(this.componentContainer.salesTable.element);

        const filterSection = document.createElement('div');
        filterSection.className = 'content__top-panel';

        const title = document.createElement('h1');
        title.textContent = 'Sales';
        filterSection.append(title);

        filterSection.append(this.componentContainer.rangePicker.element);

        container.prepend(filterSection);

        this.componentContainer.rangePicker.element.addEventListener(
            'date-select',
            this.handleDateSelect
        );

        return container;
    }

    handleDateSelect = (event) => {
        this.selectedDateRange = event.detail;
        this.updateTableData();
    };

    async updateTableData() {
        const url = new URL('api/rest/orders', BACKEND_URL);
        url.searchParams.set('createdAt_gte', this.selectedDateRange.from.toISOString());
        url.searchParams.set('createdAt_lte', this.selectedDateRange.to.toISOString());
        this.componentContainer.salesTable.url = url;
        this.componentContainer.salesTable.resetPagination();
        await this.componentContainer.salesTable.loadData();
        await this.componentContainer.salesTable.render();
    }

    destroy() {
        super.destroy();
        this.componentContainer.rangePicker.element.removeEventListener(
            'date-select',
            this.handleDateSelect
        );
        this.componentContainer.salesTable.destroy();
        this.componentContainer.rangePicker.destroy();
    }

}