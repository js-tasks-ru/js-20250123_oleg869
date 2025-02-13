export default class DoubleSlider {
    constructor({
        min,
        max,
        formatValue = value => value,
        selected = {}
    } = {}) {
        this.min = min;
        this.max = max;
        this.element = this.setElement();
        this.formatValue = formatValue;
        
    }

    setElement() {
        const element = document.createElement('div');
        element.className = 'range-slider';
        element.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `            
                <span data-element="from">${this.presentValue}</span>
                <div class="range-slider__inner">
                    <span class="range-slider__progress" style="left: 30%; right: 30%">
                    </span>
                    <span class="range-slider__thumb-left" style="left: 30%">
                    </span>
                    <span class="range-slider__thumb-right" style="right: 30%>
                    </span>
                <div>
                <span data-element="to">${this.presentValue}</span>            
        `;
    }

    createListener(){
        const {thumbLeft, thumbRight} = this.getThumbs();
        thumbLeft.addEventListener('pointerdown', this.handlePointerDown);
        thumbRight.addEventListener('pointerdown', this.handlePointerDown);
    }
    destroyListener(){
        thumbLeft.addEventListener('pointerdown', this.handlePointerDown);
        thumbRight.addEventListener('pointerdown', this.handlePointerDown);
    }

    getThumbs() {
        return {
            thumbLeft: this.element.querySelector('.range-slider__thumb-left'),
            thumbRight: this.element.querySelector('.range-slider__thumb-right')
        }
    }
}
