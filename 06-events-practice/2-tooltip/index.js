class Tooltip {
  static lastShownTooltip;
  constructor(){
    this.element = null;

  }
  initialize () {
    this.element = document.createElement('div');

  }

  getTemplate(){

  }

  destroy() {
    this.remove();
  }
}

export default Tooltip;
