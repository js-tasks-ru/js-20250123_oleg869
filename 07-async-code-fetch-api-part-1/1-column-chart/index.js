import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';
const BACKEND_URL_ORDER = 'https://course-js.javascript.ru/api/dashboard/orders';
export default class ColumnChart extends ColumnChartV1 {
    subElements = {};
    constructor({ url = '', range = {}, ...legacy } = {}) {
        super(legacy);
        this.setSubElements();
        this.url = new URL(url, BACKEND_URL_ORDER);
    }

    setSubElements() {
        return this.element.querySelectorAll('[data-element]').forEach(element => {
            this.subElements[element.dataset.element] = element;
        });
    }

    async update(from, to) {
        try {
            let response;
            this.url.searchParams.set('from', from.toISOString());
            this.url.searchParams.set('to', to.toISOString());
            response = await fetchJson(this.url);
            this.processResponse(response);
            return response;
        }
        catch (e) {
            console.error(`Get data failed: ${e}`);
            throw e;
        }

    }    

    processResponse(response) {
        this.data = Object.values(response);
        this.value = this.data.reduce((sum, item) => sum + item, 0);
        this.subElements.header.innerHTML = this.formatHeading(this.value);
        this.subElements.body.innerHTML = this.setColumnProps();
        this.element.classList.toggle('column-chart_loading', !this.data.length);
    }

}