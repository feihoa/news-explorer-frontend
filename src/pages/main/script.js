import "./index.css";

import {MobileMenu} from "../../js/components/MobileMenu.js";
import {Form} from "../../js/components/Form";
import {NewsApi} from "../../js/api/NewsApi.js";
import {NewsCardList} from "../../js/components/NewsCardList";
import {NewsCard} from "../../js/components/NewsCard.js";
import {Popup} from "../../js/components/Popup";
import weekAgo from "../../js/utils/weekAgo.js";
import dateFormatChange from "../../js/utils/dateFormatChange.js";
import listToMatrix from "../../js/utils/listToMatrix.js";
import {Header} from '../../js/components/Header.js';
import logout from '../../js/utils/logout.js'
import getUserData from '../../js/utils/getUserData.js';
import {mainApi} from '../../js/constants/mainApi.js'
import {
  showMoreButton,
  buttonLogout,
  searchResult,
  notFound,
  searchPreloader,
  searchInput,
  cardZone,
  headerElem,
  menuLinks,
  menuIconLines,
  linkAuth
} from '../../js/constants/main.js'

const header = new Header();
const mobileMenu = new MobileMenu();
const popup = new Popup(document.querySelector('#popup'));
const form = new Form(event);
const newsCard = new NewsCard();
const newsCardList = new NewsCardList(cardZone, newsCard);
const currentDate = new Date();
const dateAgo = weekAgo(currentDate);

let isLogged = '';
let keyWord;
let cardMatrixLine = 0;
let saved;


 buttonLogout.addEventListener('click', function(e){
   e.preventDefault();
 logout()
 .then(data =>{
  if(data){
    isLogged = false;
  }else{
    isLogged = true;
  }
 }).catch(err =>  {;
 return err;
 })
 }, {once:true});

 function checkAuth(){
 getUserData()
 .then((data) => {
if(data){
  isLogged = true;
}else{
  isLogged = false;
}
})
.catch(err => {console.log(err); return err;})
}
 checkAuth();

 function saveCard(keyword, cardName, cardImage, cardDescription, cardPublishedAt, cardSourceName, newsUrl){
  return mainApi.createArticle(keyword, cardName, cardImage, cardDescription, cardPublishedAt, cardSourceName, newsUrl)
  .then(data =>{
  return data;
  })
  .catch(err => {console.log(err); return err;})
 }

  document.forms.search.addEventListener("submit", function (event) {
    event.preventDefault();
    form.inputBlock();
    if(!form.searchFormError(searchInput.value)){
  searchResult.classList.add('search-result_hidden');
  notFound.classList.add('not-found_hidden');
  showMoreButton.classList.remove('news-card__show-more-button_hidden');
  searchPreloader.classList.remove('search-preloader_hidden');

  keyWord =  searchInput.value;
  searchInput.value = '';

  const URL = 'everything?' +
  `q=${keyWord}&` +
  `from=${dateAgo.replace(/T.*Z/, "")}&` +
  'language=ru&' +
  'sortBy=popularity&' +
  'pageSize=100&' +
  'apiKey=5dc7761c8286400eb78ab29e37682fec';

 const newsApi = new NewsApi({
  baseUrl: `https://praktikum.tk/news/v2/` + URL,
  headers:{
    'Content-Type': 'application/json',
  },
 });

newsApi.getNews()
.then((data) => {
  cardZone.textContent = '';
  cardMatrixLine = 0;
  if(data.articles.length === 0){
    searchResult.classList.add('search-result_hidden');
    searchPreloader.classList.add('search-preloader_hidden');
    notFound.classList.remove('not-found_hidden');
  }else{
    let matrix =  listToMatrix(data.articles, 3);
    showCards(matrix);
    if(isLogged){
    newsCardList.listeners(data.articles, saveCard, keyWord)
    newsCardList.cardPopupLineText(true)
    }else{
    newsCardList.cardPopupLineText(false)
    };
  }
 })
}
searchInput.value = '';
form.inputUnblock();
});

  const showCards = (cards) => {

    mainApi.getArticles()
   .then(data =>{
     saved = [];
      data.data.forEach(elem =>{
        saved.push(elem.link)
      })
      newsCardList.render(cards[cardMatrixLine++], dateFormatChange, keyWord, saved);
      document.querySelector('.search-preloader').classList.add('search-preloader_hidden');
      document.querySelector('.search-result').classList.remove('search-result_hidden');
    })
    .catch(err =>{
      newsCardList.render(cards[cardMatrixLine++], dateFormatChange, keyWord, saved);
      document.querySelector('.search-preloader').classList.add('search-preloader_hidden');
      document.querySelector('.search-result').classList.remove('search-result_hidden');
      console.log(err)
      return err;
    })
    if(cardMatrixLine < cards.length){
     document.querySelector('#show-more-button').onclick = function(){showCards(cards)};
    }else{
     document.querySelector('#show-more-button').classList.add('news-card__show-more-button_hidden');
   }
}

menuIconLines.addEventListener("click", function () {
  menuIconLines.classList.toggle("change");
  mobileMenu.toggle(headerElem, 'header_menu-mobile-opened');
  mobileMenu.toggle(menuLinks, 'header__menu-links-hidden');

});

function registration(){
  document.querySelector('#registration').addEventListener("click", function (e) {
  e.preventDefault();

  popup.close();
  popup.clearContent();
  popup.setContent('registration');
  popup.open();
  form.listeners();

  document.forms.popupForm.addEventListener('submit', function(e){
    e.preventDefault();
    form.inputBlock();
    mainApi.signup((document.querySelector('#input-email').value).toLowerCase(), document.querySelector('#input-password').value, document.querySelector('#input-name').value)
   .then((data) => {
     if(data){
     success();
     form.inputUnblock();
     }
  })
    .catch(err => {
      form.setServerError(document.querySelector('.error_bottom'), err)
      form.inputUnblock();
      return err;
    })
  })
  closePopup();
  popupAuth();

},{once:true});
}

function auth(){
  popup.close();
  popup.clearContent();
  popup.setContent('auth');
  popup.open();
  form.listeners();
  document.forms.popupForm.addEventListener('submit', function(e){
    e.preventDefault();
    form.inputBlock();
    mainApi.signin((document.querySelector('#input-email').value).toLowerCase(), document.querySelector('#input-password').value)
   .then((data) => {
    if(data){
       header.render({
      isLoggedIn: true,
      name: data.data.name,
    })
    isLogged = true;
    cardZone.textContent = '';
    searchResult.classList.add('search-result_hidden');
    document.querySelector('.search-preloader').classList.add('search-preloader_hidden');
    popup.close();
    form.inputUnblock();
    }
  })
  .catch(err => {
    form.setServerError(document.querySelector('.error_bottom'), err)
    form.inputUnblock();
    isLogged = false;
    return err;
  })
  })
  registration();
  closePopup()
}

linkAuth.addEventListener("click", function () {
  auth();
});

function popupAuth(){
  document.querySelector('#log-in').addEventListener("click", function () {
  auth();
  },{once:true});
}

function closePopup(){
  document.querySelector('#close-popup').addEventListener("click", function () {
  popup.close();
  popup.clearContent();

},{once:true});


document.addEventListener("click", function () {
  const popupContent = document.querySelector('#popup__content');

  if (document.querySelector('#popup').contains(event.target) && (popupContent === null || !popupContent.contains(event.target)) ){

  popup.close();
  popup.clearContent();
  }
});

document.addEventListener('keyup', function (e) {
  if(e.keyCode === 27){
    popup.close();
    popup.clearContent();
  }
});
}

function success(){
  popup.close();
  popup.clearContent();
  popup.setContent('success');
  popup.open();
  popupAuth();
  closePopup();
  }
