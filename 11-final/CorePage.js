export default class CorePage {
    element = {};
    subElements = {};
    componentContainer = {};

    destroy() {
        for (const component of Object.values(this.componentContainer)) {
            component.destroy();
        }
    }
}