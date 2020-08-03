import { BaseComponent } from "./BaseComponent";

export class Popup extends BaseComponent{
  constructor(elem) {
    super();
    this.elem = elem;
  }

  setContent(popup){
    this.elem.insertAdjacentHTML('beforeend', popup)
  }
  clearContent(){
    if( document.querySelector('#popup__content') !== null){
      this.elem.removeChild( document.querySelector('#popup__content') );
    }
  }
  open() {
    this.elem.style.display = 'flex';


  }
  close() {
    this.elem.style.display = 'none';

  }

}