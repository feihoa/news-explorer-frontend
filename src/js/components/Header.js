export class Header {

  render(props){
    this.props = props;
    this.isLoggedIn = props.isLoggedIn;
    this.name = props.name;
   if(this.isLoggedIn === true){
    document.querySelector('#user-name').textContent = this.name;
    document.querySelector('#link-auth') && (document.querySelector('#link-auth').style.display = 'none');
    document.querySelector('#button-saved') && (document.querySelector('#button-saved').style.display = 'true');
    document.querySelector('#button-logout') && (document.querySelector('#button-logout').style.display = 'true');
   }else{
    document.querySelector('#link-auth') && (document.querySelector('#link-auth').style.display = 'true');
    document.querySelector('#button-saved') && (document.querySelector('#button-saved').style.display = 'none');
    document.querySelector('#button-logout') && (document.querySelector('#button-logout').style.display = 'none');
   }

  }

}