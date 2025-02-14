//export default class DoubleSlider {
class DoubleSlider {
    constructor({
        min,
        max,
        formatValue = value => '$' + value,
        selected = {}
    } = {}) {
        this.min = min;
        this.max = max;
        this.formatValue = formatValue;
        this.selected = {
            from: selected.from ?? min,
            to: selected.to ?? max
        };
        this.element = this.setElement();
        this.thumbElements = this.getThumbValues();
    }

    setElement() {
        const element = document.createElement('div');
        element.className = 'range-slider';
        element.innerHTML = this.getTemplate();
        return element;
    }

    getTemplate() {
        return `            
                <span data-element="from">${this.formatValue(this.selected.from)}</span>
                <div class="range-slider__inner">
                    <span class="range-slider__progress" style="left: 30%; right: 30%">
                    </span>
                    <span class="range-slider__thumb-left" style="left: 30%">
                    </span>
                    <span class="range-slider__thumb-right" style="right: 30%">
                    </span>
                </div>
                <span data-element="to">${this.formatValue(this.selected.to)}</span>            
        `;
    }

    getThumbValues() {
        const thumbElements = this.element.querySelectorAll('[data-element]');
        return {
            from: thumbElements[0],
            to: thumbElements[1]
        };
    }
    /*
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
    }*/
}

const slider = new DoubleSlider({
    min: 0,
    max: 100,
    selected: { from: 10, to: 60 }
});
console.log(slider.min, slider.max, slider.selected);
document.body.append(slider.element);
console.log(`${slider.thumbElements.from.textContent}  ${slider.thumbElements.to.textContent}`);