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
} from '../../js/constants/main.js';

import {
  popupLogIn,
  popupRegistration,
  popupSuccess
} from '../../js/constants/popup.js';


const header = new Header();
const mobileMenu = new MobileMenu();
const popup = new Popup(document.querySelector('#popup'));
const form = new Form(event);
const newsCard = new NewsCard();
const newsCardList = new NewsCardList(cardZone, newsCard);
const currentDate = new Date();
const dateAgo = weekAgo(currentDate);
const elementsPerSubArray = 3;

let isLogged = '';
let keyWord;
let cardMatrixLine = 0;
let saved;


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

const handleMenuIconLinesClick = () =>{
  menuIconLines.classList.toggle("change");
  mobileMenu.toggle(headerElem, 'header_menu-mobile-opened');
  mobileMenu.toggle(menuLinks, 'header__menu-links-hidden');
}

const showCards = (cards) => {
  mainApi.getArticles()
 .then(data =>{
   saved = [];
    data.data.forEach(elem =>{
      saved.push(elem.link)
    })
    newsCardList.render(cards[cardMatrixLine++], dateFormatChange, keyWord, saved);
    searchPreloader.classList.add('search-preloader_hidden');
    searchResult.classList.remove('search-result_hidden');
  })
  .catch(err =>{
    newsCardList.render(cards[cardMatrixLine++], dateFormatChange, keyWord, saved);
    searchPreloader.classList.add('search-preloader_hidden');
    searchResult.classList.remove('search-result_hidden');
    console.log(err)
    return err;
  })
  if(cardMatrixLine < cards.length){
    showMoreButton.onclick = function(){showCards(cards)};
  }else{
    showMoreButton.classList.add('news-card__show-more-button_hidden');
 }
};

const handlePopupSubmitAuth = (e) => {
  e.preventDefault();
  form.formBlock();
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
  form.formUnblock();
  }
})
.catch(err => {
  form.setServerError(document.querySelector('.error_bottom'), err)
  form.formUnblock();
  isLogged = false;
  return err;
})
  };
const handlePopupSubmitRegistration = (e) =>{
    e.preventDefault();
form.formBlock();

mainApi.signup((document.querySelector('#input-email').value).toLowerCase(), document.querySelector('#input-password').value, document.querySelector('#input-name').value)
.then((data) => {
if(data){
success();
form.formUnblock();
}
})
.catch(err => {
form.setServerError(document.querySelector('.error_bottom'), err)
form.formUnblock();
return err;
})
};

const handleRegistrationClick = (e) =>{
  e.preventDefault();

  popup.close();
  popup.clearContent();
  popup.setContent(popupRegistration);
  popup.open();
  form.listeners();


  document.forms.popupForm.addEventListener('submit', handlePopupSubmitRegistration);
  closePopup();
  popupAuth();

};

const handleSearch = (event) =>{
  event.preventDefault();
  form.formBlock();
  if(!form.searchFormError(searchInput.value)){
searchResult.classList.add('search-result_hidden');
notFound.classList.add('not-found_hidden');
showMoreButton.classList.remove('news-card__show-more-button_hidden');
searchPreloader.classList.remove('search-preloader_hidden');

keyWord =  searchInput.value;

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
  const matrix =  listToMatrix(data.articles, elementsPerSubArray);
  showCards(matrix);
  if(isLogged){
  newsCardList.listeners(data.articles, saveCard, keyWord)
  newsCardList.cardPopupLineText(true);
  }else{
  newsCardList.cardPopupLineText(false);
  };
}
}).catch((err) => {
 if(err == 'TypeError: Failed to fetch'){
alert('Нет соединения с интернетом');
 }
console.log(err);
return err;
})
}
form.formUnblock();
}

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
  .catch(err => {console.log(err); throw err;})
 };

function registration(){
  document.querySelector('#registration').addEventListener("click",  handleRegistrationClick, {once:true});
}

function auth(){
  popup.close();
  popup.clearContent();
  popup.setContent(popupLogIn);
  popup.open();
  form.listeners();
  document.forms.popupForm.addEventListener('submit', handlePopupSubmitAuth)
  registration();
  closePopup()
};

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

function popupAuth(){
  document.querySelector('#log-in').addEventListener("click", function () {
  auth();
  },{once:true});
};

function success(){
  popup.close();
  popup.clearContent();
  popup.setContent(popupSuccess);
  popup.open();
  popupAuth();
  closePopup();
  };

linkAuth.addEventListener("click", function () {
  auth();
});
menuIconLines.addEventListener("click", handleMenuIconLinesClick);
buttonLogout.addEventListener('click', handleLogout, {once:true});
document.querySelector('.search__search-field').addEventListener("submit", handleSearch);









