export default class BasePage {
    element = null;
    subElements = {};
    componentContainer = {};
  
    destroy() {
      Object.values(this.componentContainer).forEach(component => {
        if (component.destroy) component.destroy();
      });
      this.element.remove();
      this.subElements = {};
      this.componentContainer = {};
    }
  
    remove() {
      this.element.remove();
    }
  }