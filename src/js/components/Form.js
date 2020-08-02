export class Form {

  handleValidate(event) {
    this.event = event;
    this._clear(event.target);
    this._validateInputElement(event.target);
    this._validateForm(document.querySelector('#button-submit'));
    let errorMessage = '';

  }
  _isEmail(email){
    const re = /^[A-Za-z](([_-])?[A-Za-z0-9])+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    return re.test(String(email));

  }
  _showErrorMessage(element) {

    this.errorMessage = this.handleValidate.errorMessage;
    this.element = element;

    if (element.value.length === 0) {
      this.errorMessage = 'Это обязательное поле';
    }
    else if ((element.value.length < 2 || element.value.length > 30) && element.type !== 'email' && element.type !== 'password') {
      this.errorMessage = 'Должно быть от 2 до 30 символов';
    }
    else if (element.id === 'input-email' && !this._isEmail(element.value)) {
    this.errorMessage = 'Здесь должен быть email';
    }
    else if (element.type === 'password' && (element.value.length < 8 || element.value.length > 30)) {
      this.errorMessage = 'Должно быть от 8 до 30 символов';
    }
    else {
      this.errorMessage = '';
    }
  }

  setServerError(elem, err){
    console.log(err)
    if(err == 409){
      elem.textContent = 'Ошибка: ' + 'такой пользователь уже есть';
     }else if(err == 429){
      elem.textContent = 'Ошибка: ' + 'слишком много запросов';
     }else{
      elem.textContent = 'Ошибка: ' + 'неправильный формат данных';

     }
  }

  _validateInputElement(element){

    this.element = element;
    this.errorMessage = this.handleValidate.errorMessage;

    const errorElement = document.querySelector(`#error-${element.id}`);

    if (errorElement !== null) {
      this._validateForm;

      if (!element.checkValidity()) {

        this._showErrorMessage(element)
        errorElement.textContent = this.errorMessage;
        return false;

      } else {
        errorElement.textContent = '';
        this._validateForm;
        return true;

      }
    }
  }

  _validateForm(button){
    this.button = button;

    let array = [];
    let inputArray = (Array.from(document.forms[1].querySelectorAll('input')));
    inputArray.forEach(elem => array.push(elem.value));

    if( array.every(elem => elem.length > 1 && elem.length < 31) && this._isEmail(array[0]) && array[1].length >= 8){
      button.removeAttribute('disabled')


    } else {
        button.setAttribute('disabled', true);
    }
  }
  _clear(element){
    this.element = element;
    this.errorMessage = this.handleValidate.errorMessage;

    element.textContent = '';
    this.errorMessage = '';
  }

  _getInfo(element){

  }
  listeners(){
    if (document.querySelector('#button-submit')){
    document.querySelector('#button-submit').setAttribute('disabled', true);

    document.forms[1].addEventListener("input", event => {
      this.handleValidate(event);

    })}
  }
}