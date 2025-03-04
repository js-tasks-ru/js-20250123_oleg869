export default class CorePage {
    element = null;
    subElements = {};
    componentsContainer = {};

    destroy(){
        for (const component of Object.values(this.componentsContainer)){
            component.destroy();
        }
        this.element.remove();
        this.element = null;
    }
}