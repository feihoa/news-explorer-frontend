import "./articles.css";
import "./../../js/index.js";
import {MobileMenu} from "../../js/components/MobileMenu.js";
import {MainApi} from "../../js/api/MainApi.js";
import {NewsCardList} from "../../js/components/NewsCardList";
import {NewsCard} from "../../js/components/NewsCard.js";
import {dateFormatChange} from "../../js/utils/dateFormatChange.js";

const mobileMenu = new MobileMenu();
const newsCard = new NewsCard();
const newsCardList = new NewsCardList(document.querySelector('#card-zone'), newsCard);

const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json'
  }
 });

document.querySelector('#two-lines').addEventListener("click", function () {
  document.querySelector('#two-lines').classList.toggle("change");
  if (window.screen.width <= 670) {
    mobileMenu.toggle(document.querySelector('#header'), 'header_menu-mobile-opened');
    mobileMenu.toggle(document.querySelector('#logo'), 'logo_black');
    mobileMenu.toggle(document.querySelector('#menu-links'), 'header__menu-links-hidden');
    mobileMenu.toggle(document.querySelector('#mainMenuLink'), 'text_white');
    mobileMenu.toggle(document.querySelector('#button-logout'), 'button_circled_black');
    mobileMenu.toggle(document.querySelector('#button-logout'), 'text_black');
    mobileMenu.toggle(document.querySelector('#button-logout'), 'text_white');
    mobileMenu.toggle(document.querySelector('#bar1'), 'two-lines__bar_white');
    mobileMenu.toggle(document.querySelector('#bar2'), 'two-lines__bar_white');
  }
});

 mainApi.getUserData()
 .then((data) => {
  document.querySelector('#user-name').textContent = data.data.name;
  });


  mainApi.getArticles()
  .then((data) => {
  console.log(data.data)
  newsCardList.render(data.data, dateFormatChange)
  newsCardList.listeners(data.data, removeCard);
});

function removeCard(id){
  mainApi.removeArticle(id)
  .then(data =>{
    console.log('data')
  })
}