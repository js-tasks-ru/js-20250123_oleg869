export default class DoubleSlider {
    subElements = {};
    constructor({
        min,
        max,
        formatValue = value => value,
        selected = {}
    } = {}) {
        this.min = min ?? 100;
        this.max = max ?? 200;
        this.formatValue = formatValue;
        this.selected = {
            from: selected.from ?? this.min,
            to: selected.to ?? this.max
        };
        this.element = this.setElement();
        this.selectSubElements();
        this.createListener();
    }

    setElement() {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        return element;
    }

    getTemplate() {
        const leftProgress = this.getLeftPercent();
        const rightProgress = this.getRightPercent();

        return `    
              <div class="range-slider">        
              <span data-element="from">${this.formatValue(this.selected.from)}</span>
              <div data-element="container" class="range-slider__inner">
                  <span data-element="thumbProgress" class="range-slider__progress" style="left: ${leftProgress}%; right: ${rightProgress}%">
                  </span>
                  <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: ${leftProgress}%">
                  </span>
                  <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${rightProgress}%">
                  </span>
              </div>
              <span data-element="to">${this.formatValue(this.selected.to)}</span>
              </div>            
      `;
    }

    getLeftPercent() {
        const total = this.max - this.min;
        const value = this.selected.from - this.min;
        return Math.round(value / total * 100);
    }

    getRightPercent() {
        const total = this.max - this.min;
        const value = this.max - this.selected.to;
        return Math.round(value / total * 100);
    }

    selectSubElements() {
        this.element.querySelectorAll('[data-element]').forEach(element => {
            this.subElements[element.dataset.element] = element;
        });
    }

    createListener() {
        this.subElements.thumbLeft.addEventListener('pointerdown', this.handleThubmPointerDown);
        this.subElements.thumbRight.addEventListener('pointerdown', this.handleThubmPointerDown);
    };

    processPointerMove = (e) => {
        const { left, width } = this.subElements.container.getBoundingClientRect();
        const containerLeftX = left;
        const containerRightX = left + width;
        const pointerX = e.clientX;
        const normalizedPointerX = Math.min(containerRightX, Math.max(containerLeftX, pointerX));
        const percentPointerX = Math.round((normalizedPointerX - containerLeftX) / (containerRightX - containerLeftX) * 100);
        return this.min + (this.max - this.min) * percentPointerX / 100;
    }

    handleThubmPointerDown = (e) => {
        this.activeThumb = e.target.dataset.element;

        document.addEventListener("pointermove", this.handleDocumentPointerMove);
        document.addEventListener("pointerup", this.handleDocumentPointerUp);
    }

    handleDocumentPointerMove = (e) => {
        if (this.activeThumb === "thumbLeft") {
            this.selected.from = Math.min(this.selected.to, this.processPointerMove(e));
            this.subElements.from.textContent = this.formatValue(this.selected.from);
            this.subElements.thumbLeft.style.left = this.getLeftPercent() + '%';
            this.subElements.thumbProgress.style.left = this.getLeftPercent() + '%';
        } else {
            this.selected.to = Math.max(this.selected.from, this.processPointerMove(e));
            this.subElements.to.textContent = this.formatValue(this.selected.to);
            this.subElements.thumbRight.style.right = this.getRightPercent() + '%';
            this.subElements.thumbProgress.style.right = this.getRightPercent() + '%';
        }
    }


    handleDocumentPointerUp = (e) => {
        this.activeThumb = null;
        this.dispatchCustomEvent();

        document.removeEventListener("pointermove", this.handleDocumentPointerMove);
        document.removeEventListener("pointerup", this.handleDocumentPointerUp);
    }

    dispatchCustomEvent() {
        const event = new CustomEvent("range-select", {
            detail: {
                from: this.selected.from,
                to: this.selected.to
            },
        });
        this.element.dispatchEvent(event);
    }

    remove() {
        this.element.remove();
    }

    destroyEventListeners() {
        this.subElements.thumbLeft.removeEventListener(
            "pointerdown",
            this.handleThumbPointerdown
        );
        this.subElements.thumbRight.removeEventListener(
            "pointerdown",
            this.handleThumbPointerdown
        );
    }

    destroy() {
        this.destroyEventListeners();
        this.element.remove();
    }

}