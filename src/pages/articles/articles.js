import "./articles.css";
import {MobileMenu} from "../../js/components/MobileMenu.js";
import {mainApi} from '../../js/constants/mainApi.js'
import {NewsCardList} from "../../js/components/NewsCardList";
import {NewsCard} from "../../js/components/NewsCard.js";
import dateFormatChange from "../../js/utils/dateFormatChange.js";
import unique from "../../js/utils/unique.js";
import logout from "../../js/utils/logout";
import getUserData from '../../js/utils/getUserData.js';
import{
  keywordsElem,
  articlesNumber,
  headerElem,
  logo,
  menuLinks,
  mainMenuLink,
  buttonLogout,
  barOne,
  barTwo,
  cardZone
} from '../../js/constants/articles.js'


const mobileMenu = new MobileMenu();
const newsCard = new NewsCard();
const newsCardList = new NewsCardList(cardZone, newsCard);

let isLogged = '';
let keywords = [];

 function checkAuth(){
 getUserData()
 }
 checkAuth()
 const handleMenuIconLinesClick = () =>{
  document.querySelector('#two-lines').classList.toggle("change");
    mobileMenu.toggle(headerElem, 'header_menu-mobile-opened');
    mobileMenu.toggle(logo, 'logo_black');
    mobileMenu.toggle(menuLinks, 'header__menu-links-hidden');
    mobileMenu.toggle(mainMenuLink, 'text_white');
    mobileMenu.toggle(buttonLogout, 'button_circled_black');
    mobileMenu.toggle(buttonLogout, 'text_black');
    mobileMenu.toggle(buttonLogout, 'text_white');
    mobileMenu.toggle(barOne, 'two-lines__bar_white');
    mobileMenu.toggle(barTwo, 'two-lines__bar_white');
}
const handleLogout = (e) =>{
  e.preventDefault();
logout()
.then(data =>{
if(data){
 isLogged = false;
}else{
 isLogged = true;
}
}).catch(err =>  {return err;
})
};


document.querySelector('#two-lines').addEventListener("click", handleMenuIconLinesClick);
document.querySelector('#button-logout').addEventListener('click', handleLogout, {once:true});


function getMainArticlesInfo(){
 return mainApi.getArticles()
  .then((data) => {
    keywords = [];
    data.data.forEach(function(elem){
      keywords.push(elem.keyword);
    })
    keywords = unique(keywords)
    keywordsElem.textContent = ''

    if(data.data.length > 4 || String(data.data.length).slice(-1)  > 4){
      articlesNumber.textContent = `${data.data.length} сохраненных статей`;

    }else if(data.data.length > 1 && data.data.length < 5 || String(data.data.length).slice(-1) > 1 && String(data.data.length).slice(-1) < 5){
      articlesNumber.textContent = `${data.data.length} сохраненные статьи`;

    }else if(data.data.length === 1 || String(data.data.length).slice(-1) === 1){
      articlesNumber.textContent = `${data.data.length} сохраненная статья`;
    }else{
        articlesNumber.textContent = `${data.data.length} сохраненных статей`;
    }

    if(keywords.length > 3){
      keywordsElem.textContent = `По ключевым словам: ${keywords[0]}, ${keywords[1]}  и ${keywords.length - 2} другим`;
    }else if(keywords.length === 3){
      keywordsElem.textContent = `По ключевым словам: ${keywords[0]}, ${keywords[1]}  и ${keywords[2]}`;
    }else if(keywords.length === 2){
      keywordsElem.textContent = `По ключевым словам: ${keywords[0]} и ${keywords[1]}`;
    }else if(keywords.length === 1 && data.data.length !== 0){
      keywordsElem.textContent = `По ключевому слову: ${keywords[0]}`;
    }else if( data.data.length === 0){
      keywordsElem.textContent = ``;
    }
    return data;
})
.catch(err => {console.log(err); return err;})
}

getMainArticlesInfo()
.then(data => {
  if(data && data != 'TypeError: Failed to fetch'){
cardZone.textContent = '';
newsCardList.render(data.data, dateFormatChange);
newsCardList.listeners(data.data, removeCard);
  }
})

function removeCard(id){
 return mainApi.removeArticle(id)
  .then(data =>{
    getMainArticlesInfo();
    return(data)

  })
  .catch(err => {console.log(err); return err})
}