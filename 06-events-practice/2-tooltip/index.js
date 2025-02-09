class Tooltip {
  static tooltipInstance;
  constructor(){
    if(Tooltip.tooltipInstance) {
      return Tooltip.tooltipInstance;
    } Tooltip.tooltipInstance = this;
    this.element = null;

  }
  initialize () {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    document.addEventListener('pointerover', this.mouseCursorOver);
    document.addEventListener('pointerout', this.mouserCursorOut);
  }

  mouseCursorOver = (event) => {
    const pointObject = event.target.closest('[data-tooltip]');
    if(!pointObject) return;
    this.render(pointObject.dataset.tooltip);
  };
  
  mouserCursorOut = (event) => {
    this.remove();
  };

  render(text){
    this.element.textContent = text;
    document.body.append(this.element);
  }

  remove(){
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default Tooltip;
//const tooltip = new Tooltip();
//tooltip.initialize();