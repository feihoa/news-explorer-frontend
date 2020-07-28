export class Popup {
  constructor(elem) {
    this.elem = elem;
  }
  _patterns(popupType){
    if (popupType === 'auth'){
    return `<div id="popup__content" class="popup__content">
    <svg id="close-popup" class="popup__close" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.357 20l8.821 8.822-2.357 2.357L18.35 20.707a1 1 0 010-1.414L28.82 8.822l2.357 2.357L22.357 20z" fill="#fff"/><path d="M18.13 20l-8.82 8.822 2.356 2.357 10.472-10.472a1 1 0 000-1.414L11.666 8.822 9.31 11.179 18.131 20z" fill="#fff"/></svg>
    <form class="popup__form" name="auth" novalidate>
      <fieldset class="popup__fieldset">
        <legend class="title popup__title">Вход</legend>
          <p class="text popup__form-text">Email</p>
          <input id="input-email" pattern="/^[A-Za-z](([_-])?[A-Za-z0-9])+@[a-zA-Z0-9]+\.[a-zA-Z]+$/" type="email" minlength="2" maxlength="30" required  bname="userEmail" class="popup__input" placeholder="Введите почту">
          <span id="error-input-email"  class="error"></span>

          <p class="text popup__form-text">Пароль</p>
          <input id="input-password" type="password" name="userPassword" minlength="8" maxlength="30"  required class="popup__input "  placeholder="Введите пароль">
          <span id="error-input-password" class="error"></span>

          <span id="error-bottom" class="error error_bottom"></span>
          <button id="button-submit" type="submit" class="button popup__button popup__button-auth popup__button-submit">Войти</button>
      </fieldset>
    </form>
    <p class ="text popup__text popup__text-after-button">или <button id="registration"  type="button" class="button popup__button popup__button-registration popup__after-form-button ">Зарегистрироваться</button></p>
  </div>
    `;
    } else if (popupType === 'registration'){
  return ` <div id="popup__content" class="popup__content">
  <svg id="close-popup" class="popup__close" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.357 20l8.821 8.822-2.357 2.357L18.35 20.707a1 1 0 010-1.414L28.82 8.822l2.357 2.357L22.357 20z" fill="#fff"/><path d="M18.13 20l-8.82 8.822 2.356 2.357 10.472-10.472a1 1 0 000-1.414L11.666 8.822 9.31 11.179 18.131 20z" fill="#fff"/></svg>
  <form class="popup__form" name="registration" novalidate>
      <fieldset class="popup__fieldset">
        <legend class="title popup__title">Регистрация</legend>
        <p class="text popup__form-text">Email</p>

        <input id="input-email" type="email"  minlength="2" maxlength="30" required name="userEmail" class="popup__input" pattern="/^[A-Za-z](([_-])?[A-Za-z0-9])+@[a-zA-Z0-9]+\.[a-zA-Z]+$/" placeholder="Введите почту">
        <span id="error-input-email" class="error"></span>

        <p class="text popup__form-text">Пароль</p>
        <input id="input-password" type="password"  name="userPassword" minlength="8" maxlength="30" required class="popup__input"  placeholder="Введите пароль">
        <span id="error-input-password" class="error"></span>

        <p class="text popup__form-text">Имя</p>
        <input id="input-name" type="name"  name="userPassword" minlength="2" maxlength="30" required class="popup__input"  placeholder="Введите свое имя">
        <span id="error-input-name" class="error"></span>

        <span id="error-bottom" class="error error_bottom"></span>
        <button id="button-submit" type="submit" class="button popup__button popup__button-registration popup__button-submit">Зарегистрироваться</button>
      </fieldset>
    </form>
  <p class ="text popup__text popup__text-after-button">или <button id="log-in" type="button" class="button popup__button popup__button-auth popup__after-form-button">Войти</button></p>
</div>
  `;
    } else if(popupType === 'success'){
  return `<div id="popup__content" class="popup__content popup__content_successful-registration">
  <svg id="close-popup" class="popup__close" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.357 20l8.821 8.822-2.357 2.357L18.35 20.707a1 1 0 010-1.414L28.82 8.822l2.357 2.357L22.357 20z" fill="#fff"/><path d="M18.13 20l-8.82 8.822 2.356 2.357 10.472-10.472a1 1 0 000-1.414L11.666 8.822 9.31 11.179 18.131 20z" fill="#fff"/></svg>
  <h3 class="title popup__title">Пользователь успешно зарегистрирован!</h3>
   <button id="log-in" type="button" class="button popup__button popup__button-auth popup__after-form-button ">Выполнить вход</button>
</div>
  `
    }
  }
  setContent(popupType){
    this.elem.insertAdjacentHTML('beforeend', this._patterns(popupType))
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