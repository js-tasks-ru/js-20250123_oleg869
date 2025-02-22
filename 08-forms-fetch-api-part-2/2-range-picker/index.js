export default class RangePicker {
subElements = null;
element = null;
constructor({ from = new Date(), to = new Date() } = {}) {
    this.selected = { from, to };
    this.render();
}

render(){
    console.log('render');
    this.createElement();
    this.setSubElements();
    
}

createElement(){
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
}

setSubElements(){
    const subElements = {};
    const dataElements = this.element.querySelectorAll('[data-element');
    for(const elem of dataElements){
        const name = elem.dataset.element;
        //console.log(name);
        subElements[name] = elem;
    }
    this.subElements = subElements;
}

getTemplate(){
    return `
        <div class = "rangepicker">
            <div class = "rangepicker__input" data-element = "input">
                <span data-element="from"></span>
                <span data-element="to"></span>
            </div>
            <div class = "rangepicker__selector" data-element="selector"></div>
        </div>
    `;
}

toggleSelector(){

}


renderCalendar(){

}

}
