class Tooltip {
  static lastShownTooltip;
  constructor(){
    this.element = null;

  }
  initialize () {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';

  }

  mouseCursorOver = (event) => {
    const pointObject = event.target.closest('[data-tooltip]');
    if(!pointObject) return;

  };

  render(text){
    this.element.textContent = text;
    document.body.append(this.element);
  }

  getTemplate(){

  }

  destroy() {
    this.remove();
  }
}

export default Tooltip;
