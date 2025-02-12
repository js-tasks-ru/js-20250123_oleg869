export default class DoubleSlider {
    constructor({
        min,
        max,
        formatValue = value => value,
        selected = {}
    } = {}) {
        this.min = min;
        this.max = max;
        this.element = null;
        
        //this.formatValue = value => formatValue;
    }

    setElement() {

    }

    getTemplate() {
        return `
            <div class="range-slider">
                <span data-element="from">${this.presentValue}</span>
                <div class="range-slider__inner">
                    <span class="range-slider__progress" style="left: 30%; right: 30%">
                    </span>
                    <span class="range-slider__thumb-left" style="left: 30%">
                    </span>
                    <span class="range-slider__thumb-right style="right: 30%>
                    </span>
                <div>
                <span data-element="to">${this.presentValue}</span>
            </div>
        `;
    }
}
