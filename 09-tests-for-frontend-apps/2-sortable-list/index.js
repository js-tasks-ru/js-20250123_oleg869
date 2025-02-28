export default class SortableList {
    element = {};
    constructor( {items} ){
        this.items = items;
        this.render();
    }

    setElementsInItem(){
        this.element = document.createElement('ul');
        this.element.className = 'sortable-list';
        this.items.forEach(element => {
            this.element.append(element);
        });
    }

    render(){
        this.setElementsInItem();
    }

    remove(){
        this.element.remove();
    }

    destroy(){
        this.remove();
    }
}
