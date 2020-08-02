import { BaseComponent } from "./BaseComponent";

export class Form extends BaseComponent{
  constructor(){
    super()
  }

  _handleValidate(event) {
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

    this.errorMessage = this._handleValidate.errorMessage;
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
  inputBlock(){
    document.getElementsByTagName('input').forEach(elem => {
      elem.setAttribute("disabled", "true");
    })
  }
  inputUnblock(){
    document.getElementsByTagName('input').forEach(elem => {
      elem.removeAttribute("disabled", "false");
    })
  }

  setServerError(elem, err){
    console.log(err)
    if(err === '409'){
      elem.textContent = 'Такой пользователь уже есть';
     }else if(err === '429'){
      elem.textContent = 'Слишком много запросов';
     }else if(err === 'TypeError: Failed to fetch'){
      elem.textContent = 'Отсутствует соединение с интернетом';
     }else if (err === '400'){
      elem.textContent = 'Некорректный запрос';
    }else if (err === '401'){
      elem.textContent = 'Нет такого пользователя';
     }else{
      elem.textContent = 'Произошла ошибка';
     }
  }

  _validateInputElement(element){

    this.element = element;
    this.errorMessage = this._handleValidate.errorMessage;

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
    let inputArray = (Array.from(document.forms.popupForm.querySelectorAll('input')));
    inputArray.forEach(elem => array.push(elem.value));

    if( array.every(elem => elem.length > 1 && elem.length < 31) && this._isEmail(array[0]) && array[1].length >= 8){
      button.removeAttribute('disabled')
    } else {
      button.setAttribute('disabled', true);
    }
  }
  _clear(element){
    this.element = element;
    this.errorMessage = this._handleValidate.errorMessage;
    element.textContent = '';
    this.errorMessage = '';
  }

  searchFormError(value){
    if (!value){
    alert('Пустой запрос');
    this.inputUnblock();
    return true;
  }else if(value.length === 1){
    alert('Недостаточная длина запроса');
    this.inputUnblock();
    return true;
  }else{
    return false;
  }
}
  listeners(){
    const submit = document.querySelector('#button-submit');

    if (submit){
      submit.setAttribute('disabled', true);

    document.forms.popupForm.addEventListener("input", event => {
      this._handleValidate(event);

    })
  }
  }
}