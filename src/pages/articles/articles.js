import "./articles.css";
import "./../../js/index.js";
import {MobileMenu} from "../../js/components/MobileMenu.js";
import {MainApi} from "../../js/api/MainApi.js";
import {NewsCardList} from "../../js/components/NewsCardList";
import {NewsCard} from "../../js/components/NewsCard.js";
import dateFormatChange from "../../js/utils/dateFormatChange.js";
import unique from "../../js/utils/unique.js";

let isLogged = true;
let keywords = [];
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
    mobileMenu.toggle(document.querySelector('#header'), 'header_menu-mobile-opened');
    mobileMenu.toggle(document.querySelector('#logo'), 'logo_black');
    mobileMenu.toggle(document.querySelector('#menu-links'), 'header__menu-links-hidden');
    mobileMenu.toggle(document.querySelector('#mainMenuLink'), 'text_white');
    mobileMenu.toggle(document.querySelector('#button-logout'), 'button_circled_black');
    mobileMenu.toggle(document.querySelector('#button-logout'), 'text_black');
    mobileMenu.toggle(document.querySelector('#button-logout'), 'text_white');
    mobileMenu.toggle(document.querySelector('#bar1'), 'two-lines__bar_white');
    mobileMenu.toggle(document.querySelector('#bar2'), 'two-lines__bar_white');

});

 mainApi.getUserData()
 .then((data) => {
    document.querySelector('#user-name').textContent = data.data.name;
    document.querySelector('#user-name-a').textContent = data.data.name;
  isLogged = true;
  })
  .catch(err =>
  {
    isLogged = false;
  });


function getMainArticlesInfo(){
  mainApi.getArticles()
  .then((data) => {
    data.data.forEach(function(elem){
      keywords.push(elem.keyword);
    })
    keywords = unique(keywords)
    document.querySelector('#keywords').textContent = ''

    if(data.data.length > 4 || String(data.data.length).slice(-1)  > 4){
      document.querySelector('#articles-number').textContent = `${data.data.length} сохраненных статей`;

    }else if(data.data.length > 1 && data.data.length < 5 || String(data.data.length).slice(-1) > 1 && String(data.data.length).slice(-1) < 5){
      document.querySelector('#articles-number').textContent = `${data.data.length} сохраненные статьи`;

    }else if(data.data.length === 1 || String(data.data.length).slice(-1) === 1){
      document.querySelector('#articles-number').textContent = `${data.data.length} сохраненная статья`;
    }else{
        document.querySelector('#articles-number').textContent = `${data.data.length} сохраненных статей`;
    }

    if(keywords.length > 2){
      document.querySelector('#keywords').textContent = `По ключевым словам: ${keywords[0]}, ${keywords[1]}  и ${keywords.length - 2} другим`;
    }else if(keywords.length === 2){
      document.querySelector('#keywords').textContent = `По ключевым словам: ${keywords[0]}, и ${keywords[1]}`;
    }else if(keywords.length === 1){
      document.querySelector('#keywords').textContent = `По ключевому слову: ${keywords[0]}`;
    }
  newsCardList.render(data.data, dateFormatChange, isLogged)
  newsCardList.listeners(data.data, removeCard);
});
}
getMainArticlesInfo();

function removeCard(id){
 return mainApi.removeArticle(id)
  .then(data =>{
    console.log('data')
    getMainArticlesInfo();
    return(data)

  })
}