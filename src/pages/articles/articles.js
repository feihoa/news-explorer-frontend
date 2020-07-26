import "./articles.css";
import "./../../js/index.js";
import {Header} from "../../js/components/Header.js";
import {MobileMenu} from "../../js/components/MobileMenu.js";
const mobileMenu = new MobileMenu();
import {MainApi} from "../../js/api/MainApi.js";



document.querySelector('#two-lines').addEventListener("click", function () {
  document.querySelector('#two-lines').classList.toggle("change");
  if (window.screen.width <= 600) {
    mobileMenu.toggle(document.querySelector('#header'), 'header_menu-mobile-opened');
    mobileMenu.toggle(document.querySelector('#logo'), 'logo_black');
    mobileMenu.toggle(document.querySelector('#menu-links'), 'header__menu-links-hidden');
    mobileMenu.toggle(document.querySelector('#mainMenuLink'), 'text_white');
    mobileMenu.toggle(document.querySelector('#logoutMenuButton'), 'button_circled_black');
    mobileMenu.toggle(document.querySelector('#logoutMenuButton'), 'text_black');
    mobileMenu.toggle(document.querySelector('#logoutMenuButton'), 'text_white');
    mobileMenu.toggle(document.querySelector('#bar1'), 'two-lines__bar_white');
    mobileMenu.toggle(document.querySelector('#bar2'), 'two-lines__bar_white');
  }
});


const mainApi = new MainApi({
  baseUrl: NODE_ENV === 'development' ? `http://api.news-explorer-pr.tk` : `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json'
  }
 });

 mainApi.getArticles()
.then((data) => {
  cardList.render(data)
});