export default class CorePage {
    element = null;
    subElements = {};
    componentContainer = {};

    destroy(){
        for (const component of Object.values(this.componentContainer)){
            component.destroy();
        }
        this.element.remove();
        this.element = null;
    }
}