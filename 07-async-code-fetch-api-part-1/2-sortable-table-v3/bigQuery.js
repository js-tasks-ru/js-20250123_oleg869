
class SortableTableV1 {
    constructor(
        headerConfig = [],
        data = []
    ) {
        this.data = data;
        this.headerConfig = headerConfig;
        this.element = this.createElement();
        this.subElements = this.getSubElements();
    }

    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        return element.firstElementChild;
    }

    getTableHeader() {
        return this.headerConfig.map(({ id, title, sortable }) => {
            return `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
              <span>${title}</span>            
          </div>
        `;
        }).join('');
    }
    getTableBody() {
        return this.data.map(product => {
            return `
                <a href="/products/${product.id}" class="sortable-table__row">
                  ${this.headerConfig.map(({ id, template }) => {
                const tableContent = product[id];
                return template ?
                    template(tableContent) :
                    `<div class="sortable-table__cell">${tableContent}</div>`;
            }).join('')}
                </a>
            `;
        }).join('');
    }

    getTemplate() {
        return `
        <div data-element="productsContainer" class="products-list__container">
          <div class="sortable-table">
            <div data-element="header" class="sortable-table__header sortable-table__row">
              ${this.getTableHeader()}
            </div>
            <div data-element="body" class="sortable-table__body">
              ${this.getTableBody()}
            </div>
          </div>
        </div>
      `;
    }

    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]');
        return [...elements].reduce((acc, subElement) => {
            acc[subElement.dataset.element] = subElement;
            return acc;
        }, {});
    }

    sort(field, order) {
        const sortableHeader = this.headerConfig.find(elem => elem.id == field);
        if (!sortableHeader || !sortableHeader.sortable) return;
        const sortType = sortableHeader.sortType;
        const sortAsc = (a, b) => {
            return sortType === "string" ?
                a[field].localeCompare(b[field], 'ru', 'en') :
                a[field] - b[field];
        };
        const sortDesc = (a, b) => {
            return sortType === "string" ?
                b[field].localeCompare(a[field], 'ru', 'en') :
                b[field] - a[field];
        };
        this.data.sort(order === "asc" ? sortAsc : sortDesc);
        this.subElements.body.innerHTML = this.getTableBody();
    }

    destroy() {
        this.element.remove();
    }
}

//////////////////////////////////  

class SortableTableV2 extends SortableTableV1 {
    constructor(headersConfig, {
        data = [],
        sorted = {}
    } = {}) {
        super(headersConfig, data);
        this.sorted = sorted;
        this.isSortLocally = true;
        this.createArrowElement();
        this.initInfoFromSort();
        this.createListener();
    }

    createArrowElement() {
        const elem = document.createElement('div');
        elem.innerHTML =
            ` <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;

        this.arrowElement = elem.firstElementChild;
    }

    initInfoFromSort() {
        let header = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);

        if (!header) {
            const sortableHeader = this.headerConfig.find(item => item.sortable);
            this.sorted.id = sortableHeader?.id;
            header = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);
        }

        this.sort(this.sorted.id, this.sorted.order);
        header.dataset.order = this.sorted.order;
        header.append(this.arrowElement);
    }

    handleHeaderCellClick = (e) => {
        const cellElement = e.target.closest('.sortable-table__cell[data-sortable="true"]');
        if (!cellElement) return;
        const { id, order } = cellElement.dataset;
        const sortOrder = order === 'desc' ? 'asc' : 'desc';
        this.sort(id, sortOrder);
        cellElement.dataset.order = sortOrder;
        cellElement.append(this.arrowElement);
    }

    sort(sortField, sortOrder) {
        if (this.isSortLocally) {
            this.sortOnClient(sortField, sortOrder);
        } else {
            this.sortOnServer(sortField, sortOrder);
        }
    }

    sortOnClient(id, order) {
        super.sort(id, order);
    }

    getHeaderElements() {
        return this.subElements.header.querySelectorAll('.sortable-table__cell[data-sortable="true"]');
    }

    sortOnServer() { }

    createListener() {
        this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellClick);
    }

    destroyListener() {
        this.subElements.header.removeEventListener('pointerdown', this.handleHeaderCellClick);
    }

    destroy() {
        super.destroy();
        this.destroyListener()
    }

}

////////////////////////


/////////////////////////////////////

const BACKEND_URL = 'https://course-js.javascript.ru';
class SortableTable extends SortableTableV2 {
    constructor(headersConfig, { sorted = {}, url, isSortLocally } = {}) {
        super(headersConfig);
        this.isSortLocally = isSortLocally;
        this.url = new URL(url, BACKEND_URL);
        this.sorted.order = sorted.order || 'asc';
        this.renderPromise = this.loadData(sorted.id, sorted.order);
    }

    async loadData(sortField, sortOrder) {
        try {
            this.url.searchParams.set('_embed', 'subcategory.category');
            this.url.searchParams.set('_sort', sortField);
            this.url.searchParams.set('_order', sortOrder);
            this.url.searchParams.set('_start', '0');
            this.url.searchParams.set('_end', '30');
            const response = await fetch(this.url);
            const responseToJSON = await response.json();
            console.log(responseToJSON);
            this.data = responseToJSON;
      
            if (this.subElements?.body) {
              this.subElements.body.innerHTML = this.getTableBody();
            }
        } catch (error) {
            console.error('Error loading data:', error);

        }
        return this.data;
    }
    async render() {
        return this.renderPromise;
    }

    sortOnServer(id, order) {
        this.loadData(id, order);
    }
}



const headerConfig = [
    {
        id: 'images',
        title: 'Image',
        sortable: false,
        template: products => {
            return `
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${products[0].url}">
          </div>
        `;
        }
    },
    {
        id: 'title',
        title: 'Name',
        sortable: true,
        sortType: 'string'
    },
    {
        id: 'quantity',
        title: 'Quantity',
        sortable: true,
        sortType: 'number'
    },
    {
        id: 'price',
        title: 'Price',
        sortable: true,
        sortType: 'number'
    },
    {
        id: 'status',
        title: 'Status',
        sortable: true,
        sortType: 'number',
        template: products => {
            return `<div class="sortable-table__cell">
          ${products > 0 ? 'Active' : 'Inactive'}
        </div>`;
        }
    },
];


sortableTable = new SortableTable(headerConfig, {
    url: 'api/rest/products',
    sorted: {
        id: headerConfig.find(item => item.sortable).id,
        order: 'asc'
    }
});

document.body.append(sortableTable.element);  