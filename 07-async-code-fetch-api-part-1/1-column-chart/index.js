import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';
const BACKEND_URL_ORDER = 'https://course-js.javascript.ru/api/dashboard/orders';
export default class ColumnChart extends ColumnChartV1 {
    //class ColumnChart extends ColumnChartV1 {
    subElements = {};
    constructor({ url = '', range = {}, ...legacy } = {}) {
        super(legacy);
        this.getDataLocally = false;
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
            if (this.getDataLocally) {
                response = await this.loadValuesFromFile(from, to);
            } else {
                this.url.searchParams.set('from', from.toISOString());
                this.url.searchParams.set('to', to.toISOString());
                response = await fetchJson(this.url);
            }
            this.processResponse(response);
            return response;
        }
        catch (e) {
            console.error(`Get data failed: ${this.getDataLocally}, ${e}`);
            throw e;
        }

    }

    async loadValuesFromFile(from, to) {
        const { default: data } = await import('./__mocks__/orders-data.js');
        return (from.toDateString() === to.toDateString()) ? data :
            this.filterDate(data, from, to);
    }

    filterDate(data, from, to) {

        const formatDateToCompare = date => {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        }

        const formatedFrom = formatDateToCompare(from);
        console.log(`formatedFrom ${formatedFrom}`);
        const formatedTo = formatDateToCompare(to);
        console.log(`formatedTo ${formatedTo}`);
        return Object.keys(data).reduce((result, date) => {
            const currentDate = new Date(date + "T00:00:00Z");
            const formatedCurrentDate = formatDateToCompare(currentDate);
            if (formatedCurrentDate >= formatedFrom && formatedCurrentDate <= formatedTo) {
                result[date] = data[date];
            }
            return result;
        }, {});
    }

    processResponse(response) {
        this.data = Object.values(response);
        this.subElements.body.innerHTML = this.setColumnProps();
        this.element.classList.toggle('column-chart_loading', !this.data.length);
    }

}