import "./articles.css";
import "../js/index.js";
import {MenuChange} from "../js/index.js";

(function () {


document.querySelector('#two-lines').addEventListener("click", function () {
  document.querySelector('#two-lines').classList.toggle("change");
  if (window.screen.width <= 600) {
  MenuChange(document.querySelector('#header'), 'header_menu-mobile-opened');
  MenuChange(document.querySelector('#logo'), 'logo_black');
  MenuChange(document.querySelector('#headerMenuLinks'), 'header__menu-links-hidden');
  MenuChange(document.querySelector('#mainMenuLink'), 'text_white');
  MenuChange(document.querySelector('#logoutMenuButton'), 'button_circled_black');
  MenuChange(document.querySelector('#logoutMenuButton'), 'text_black');
  MenuChange(document.querySelector('#logoutMenuButton'), 'text_white');
  MenuChange(document.querySelector('#bar1'), 'two-lines__bar_white');
  MenuChange(document.querySelector('#bar2'), 'two-lines__bar_white');
  }
});


}());
