export default class SortableList {
    element = {};
    movingObject = {};
    constructor( {items} ){
        this.items = items;
        this.render();
        this.handleOnPointerDown = this.handleOnPointerDown.bind(this);
        this.createOnPointerDownListener();
    }
    

    createOnPointerDownListener(){
        this.element.addEventListener('pointerdown', this.handleOnPointerDown);
    }

    handleOnPointerDown(event){
        const grabObjet = event.target.closest('[data-grab-handle]');
        if(grabObjet){
            event.preventDefault();
            this.moveObject(grabObjet, event);   
        }        
        
        const deleteObjet = event.target.closest('[data-delete-handle]');
        if(deleteObjet){
            this.deleteObjet(deleteObjet);
        }
    }

    moveObject(grabObjet, event){
        this.movingObject = grabObjet.closest('li');
        console.log(this.movingObject);
    }

    deleteObjet(deleteObjet){
        deleteObjet.closest('li').remove();
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
        this.element.removeEventListener('pointerdown', this.handleOnPointerDown);
    }
}
