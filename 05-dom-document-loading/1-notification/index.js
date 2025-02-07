export default class NotificationMessage {
    //class NotificationMessage {
    static lastShownComponent;
    constructor(message, {duration, type} = {}){
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
  
    show(){
      if(NotificationMessage.lastShownComponent){
        NotificationMessage.lastShownComponent.remove();
      }
      NotificationMessage.lastShownComponent = this;    
      document.body.append(this.element);  
      setTimeout(() => {
        this.remove();
      }, this.duration);
    }
  
    getTemplate(){
        return `
            <div class="notification ${this.type}" style="--value:${this.duration}s">
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

//notificationMessage = new NotificationMessage('Пивко всем за мой счет');
//document.body.append(notificationMessage.element);
//notificationMessage.show();