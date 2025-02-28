export default class SortableList {
    element = {};
    movingObject = {};
    space = {};
    constructor({ items }) {
        this.items = items;
        this.render();
        this.handleOnPointerDown = this.handleOnPointerDown.bind(this);
        this.handleOnPointerMove = this.handleOnPointerMove.bind(this);
        this.createOnPointerDownListener();
    }


    createOnPointerDownListener() {
        this.element.addEventListener('pointerdown', this.handleOnPointerDown);
    }

    handleOnPointerDown(event) {
        const grabObjet = event.target.closest('[data-grab-handle]');
        if (grabObjet) {
            event.preventDefault();
            this.moveObject(grabObjet, event);
        }

        const deleteObjet = event.target.closest('[data-delete-handle]');
        if (deleteObjet) {
            this.deleteObjet(deleteObjet);
        }
    }

    moveObject(grabObjet, event) {
        this.movingObject = grabObjet.closest('li');
        const coordinates = this.movingObject.getBoundingClientRect();
        console.log(coordinates);

        this.space = document.createElement('li');
        this.space.className = 'sortable-list__placeholder';
        this.space.style.width = `${coordinates.width}px`;
        this.space.style.height = `${coordinates.height}px`;
        console.log(this.space);

        this.movingObject.style.position = 'absolute';
        this.movingObject.style.width = `${coordinates.width}px`;
        this.movingObject.style.height = `${coordinates.height}px`;
        this.movingObject.classList.add('sortable-list__item_dragging');
        this.movingObject.style.left = `${coordinates.left}px`;
        this.movingObject.style.top = `${coordinates.top}px`;
        this.movingObject.after(this.space);

        this.shiftX = event.clientX - coordinates.left;
        this.shiftY = event.clientY - coordinates.top;

        document.addEventListener('pointermove', this.handleOnPointerMove);
    }

    handleOnPointerMove(event) {
        this.movingObject.style.left = `${event.clientX - this.shiftX}px`;
        this.movingObject.style.top = `${event.clientY - this.shiftY}px`;

        const children = this.element.children;
        let insertPosition = -1;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child === this.movingObject || child === this.space) {
                console.log('Не менять');
                continue;
            };

            const coordinates = child.getBoundingClientRect();
            if (event.clientY < coordinates.top + coordinates.height / 2) {
                insertPosition = i;
                console.log('Больше');
                break;
            }
        }

        if (insertPosition === -1) {
            this.element.append(this.space);
        } else {
            const targetElement = children[insertPosition];
            targetElement.before(this.space);
        }
    }

    deleteObjet(deleteObjet) {
        deleteObjet.closest('li').remove();
    }

    setElementsInItem() {
        this.element = document.createElement('ul');
        this.element.className = 'sortable-list';
        this.items.forEach(element => {
            this.element.append(element);
        });
    }

    render() {
        this.setElementsInItem();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.element.removeEventListener('pointerdown', this.handleOnPointerDown);
    }
}
