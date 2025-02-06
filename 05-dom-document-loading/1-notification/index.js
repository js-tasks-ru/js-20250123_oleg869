export default class NotificationMessage {
    constructor(message, {duration, type}){
        this.message = message || '';
        this.duration = duration || 0;
        this.type = type || '';
        this.element = setElement();
    }

    setElement(){
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        return element.firstChild;
    }

    getTemplate(){
        return `
            <div class="notification success" style="--value:20s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                <div class="notification-header">success</div>
                <div class="notification-body">
                    Hello world
                </div>
                </div>
            </div>
        `;
    }

}
