export default class DoubleSlider {
    constructor({
        min,
        max,
        formatValue = value => value,
        selected = {}
    } = {}) {
        this.element = null;
        
        //this.formatValue = value => formatValue;
    }

    setElement() {

    }

    getTemplate() {
        return `
            <div class="range-slider">
                <div class="range-slider__inner">
                    <span class="range-slider__progress">
                    </span>
                    <span class="range-slider__thumb-left">
                    </span>
                    <span class="range-slider__thumb-right>
                    </span>
                <div>
                <span>${this.presentValue}</span>
            </div>
        `;
    }
}
