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
    this.createListeners();
  }

  createListeners(){
    document.addEventListener('pointerover', this.handleCursorOver);
    document.addEventListener('pointerout', this.handleCursorOut);
  }

  destroyListeners(){
    document.removeEventListener('pointerover', this.handleCursorOver);
    document.removeEventListener('pointerout', this.handleCursorOut);
  }

  handleCursorOver = (event) => {
    const pointObject = event.target.closest('[data-tooltip]');
    if(!pointObject) return;
    this.render(pointObject.dataset.tooltip);
  };
  
  handleCursorOut = () => {
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
    this.destroyListeners();
  }
}

export default Tooltip;
//const tooltip = new Tooltip();
//tooltip.initialize();