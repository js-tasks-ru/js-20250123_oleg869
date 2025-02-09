class Tooltip {
  static lastShownTooltip;
  constructor(){
    this.element = null;

  }
  initialize () {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    document.addEventListener('pointerover', this.mouseCursorOver);
  }

  mouseCursorOver = (event) => {
    const pointObject = event.target.closest('[data-tooltip]');
    if(!pointObject) return;
    this.render(pointObject.dataset.tooltip);
  };

  render(text){
    this.element.textContent = text;
    document.body.append(this.element);
  }

  destroy() {
    this.remove();
  }
}

//export default Tooltip;
const tooltip = new Tooltip();
tooltip.initialize();