import CorePage from './CorePage.js'
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js'
import header from './sales-header.js';


// https://course-js.javascript.ru/api/rest/orders?createdAt_gte=2025-02-02T10%3A21%3A32.745Z&createdAt_lte=2025-03-04T10%3A21%3A32.745Z&_sort=createdAt&_order=desc&_start=0&_end=30



const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class SalesPage extends CorePage {
    constructor() {
        super();
        this.loadTableData();
    }

    loadTableData() {
        this.componentContainer = {
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
        container.className = 'sales';

        const title = document.createElement('h1');
        title.textContent = 'Sales';
        container.append(title);

        const tableContainer = document.createElement('div');
        tableContainer.dataset.element = 'salesTable';
        container.append(tableContainer);

        await this.componentContainer.salesTable.render();
        tableContainer.append(this.componentContainer.salesTable.element);

        return container;
    }

    destroy() {
        super.destroy();
        this.componentContainer.salesTable.destroy();
    }


}