import { BaseComponent } from "./BaseComponent";

export class Header extends BaseComponent{
constructor(){
  super()
}
  render(props){
    this.props = props;
    this.isLoggedIn = props.isLoggedIn;
    this.name = props.name;
   if(this.isLoggedIn === true){
    document.querySelector('#user-name').textContent = this.name;
    document.querySelector('#link-auth') && (document.querySelector('#link-auth').classList.add('header__link-item_hidden'));
    document.querySelector('#button-saved') && (document.querySelector('#button-saved').classList.remove('header__link-item_hidden'));
    document.querySelector('#button-logout') && (document.querySelector('#button-logout').classList.remove('header__link-item_hidden'));
   }else{
    document.querySelector('#link-auth') && (document.querySelector('#link-auth').classList.remove('header__link-item_hidden'));
    document.querySelector('#button-saved') && (document.querySelector('#button-saved').classList.add('header__link-item_hidden'));
    document.querySelector('#button-logout') && (document.querySelector('#button-logout').classList.add('header__link-item_hidden'));
   }

  }

}