//export default class DoubleSlider {
class DoubleSlider {
    subElements = {};
    constructor({
        min,
        max,
        formatValue = value => '$' + value,
        selected = {}
    } = {}) {
        this.min = min ?? 100;
        this.max = max ?? 200;
        this.formatValue = formatValue;
        this.selected = {
            from: selected.from ?? min,
            to: selected.to ?? max
        };
        this.element = this.setElement();
        this.selectSubElements();
        this.createListener();
    }

    setElement() {
        const element = document.createElement('div');
        element.className = 'range-slider';
        element.innerHTML = this.getTemplate();
        return element;
    }

    getTemplate() {
        const leftProgress = this.getLeftPercent();
        const rightProgress = this.getRightPercent();

        return `            
                <span data-element="from">${this.formatValue(this.selected.from)}</span>
                <div class="range-slider__inner">
                    <span class="range-slider__progress" style="left: ${leftProgress}%; right: ${rightProgress}%">
                    </span>
                    <span class="range-slider__thumb-left" style="left: ${leftProgress}%">
                    </span>
                    <span class="range-slider__thumb-right" style="right: ${rightProgress}%">
                    </span>
                </div>
                <span data-element="to">${this.formatValue(this.selected.to)}</span>            
        `;
    }

    getLeftPercent(){
        const total = this.max - this.min;
        const value = this.from - this.min;
        return Math.round(value / total * 100) ;
    }

    getRightPercent(){
        const total = this.max - this.min;
        const value = this.from - this.min;
        return Math.round(value / total * 100) ;
    }

    selectSubElements() {
        this.element.querySelectorAll('[data-element]').forEach(elem => {
            this.subElements[elem.dataset.element] = elem;
        });
    }

    createListener(){};


}

const slider = new DoubleSlider({
    min: 0,
    max: 100,
    selected: { from: 10, to: 60 }
});
console.log(slider.min, slider.max, slider.selected);
document.body.append(slider.element);
console.log(`${slider.thumbElements.from.textContent}  ${slider.thumbElements.to.textContent}`);