export default class CorePage {
    element = null;
    subElements = {};
    componentContainer = {};

    destroy(){
        for (const component of Object.values(this.componentContainer)){
            component.destroy();
        }
        if (this.element) {
            this.element.remove();
        }
        this.element = null;
    }
}