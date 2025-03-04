import CorePage from './CorePage.js'
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js'
import header from './sales-header.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class SalesPage extends CorePage {
    constructor() {
        super();
        this.loadTableData();
    }

    loadTableData() {
        this.componentContainer = {
            salesTable: new SortableTable(header, {
                url: new URL('api/rest/sales', BACKEND_URL),
                isSortLocally: false,
                sorted: {
                    id: 'createdAt',
                    order: 'desc'
                }
            })
        };
    }



}