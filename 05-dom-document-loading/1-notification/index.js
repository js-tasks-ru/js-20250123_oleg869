//export default class NotificationMessage {
    class NotificationMessage {
    constructor(message, {duration, type}){
        this.message = message || '';
        this.duration = duration || 0;
        this.type = type || '';
        this.element = this.setElement();
    }

    setElement(){
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        return element.firstElementChild ;
    }
  
    show(){ // рендер объекта
      const existing = document.querySelector('.notification');
      if (existing) console.log('object exist');
    
      document.body.append(this.element);
  
      setTimeout(() => {
        this.remove();
        console.log(this.duration);
      }, this.duration);
    }
  
    getTemplate(){
        return `
            <div class="notification success" style="--value:${this.duration}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
                </div>
            </div>
        `;
    }
  
    destroy(){
        this.remove();
    }
  
    remove(){
        this.element.remove();
    }
  
  }

notificationMessage = new NotificationMessage('Пивко всем за мой счет', 5000);
document.body.append(notificationMessage.element);
notificationMessage.show();