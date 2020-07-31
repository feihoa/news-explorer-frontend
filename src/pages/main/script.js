import "./index.css";
import "./../../js/index.js";

import {MobileMenu} from "../../js/components/MobileMenu.js";
import {Form} from "../../js/components/Form";
import {NewsApi} from "../../js/api/NewsApi.js";
import {MainApi} from "../../js/api/MainApi.js";
import {NewsCardList} from "../../js/components/NewsCardList";
import {NewsCard} from "../../js/components/NewsCard.js";
import {Popup} from "../../js/components/Popup";
import weekAgo from "../../js/utils/weekAgo.js";
import dateFormatChange from "../../js/utils/dateFormatChange.js";
import listToMatrix from "../../js/utils/listToMatrix.js";
import {Header} from '../../js/components/Header.js';
import getUserData from '../../js/utils/getUserData'
import logout from '../../js/utils/logout.js'

const header = new Header();
const mobileMenu = new MobileMenu();
const popup = new Popup(document.querySelector('#popup'));
const form = new Form(event);
const newsCard = new NewsCard();
const newsCardList = new NewsCardList(document.querySelector('#card-zone'), newsCard);

let isLogged = false;
let keyWord;
let currentDate = new Date();
let cardMatrixLine = 0;
let dateAgo = weekAgo(currentDate);


const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });
 isLogged = logout(isLogged)
 isLogged = getUserData(isLogged);
 console.log(isLogged)

 function saveCard(keyword, cardName, cardImage, cardDescription, cardPublishedAt, cardSourceName, newsUrl){

  return mainApi.createArticle(keyword, cardName, cardImage, cardDescription, cardPublishedAt, cardSourceName, newsUrl)
  .then(data =>{
    return data;
  })
 }

  document.forms.search.addEventListener("submit", function (event) {
      event.preventDefault();
  document.querySelector('.not-found').classList.add('not-found_hidden');
  document.querySelector('#show-more-button').classList.remove('news-card__show-more-button_hidden');
  document.querySelector('.search-preloader').classList.remove('search-preloader_hidden');
  event.preventDefault();
  keyWord =  document.querySelector('#search-input').value;
  document.querySelector('#search-input').value = '';

const URL = 'everything?' +
  `q=${keyWord}&` +
  `from=${dateAgo.replace(/T.*Z/, "")}&` +
  'language=ru&' +
  'sortBy=popularity&' +
  'pageSize=100&' +
  'apiKey=5dc7761c8286400eb78ab29e37682fec';

 const newsApi = new NewsApi({
  baseUrl: NODE_ENV === 'development' ? `http://praktikum.tk/news/v2/` + URL: `https://praktikum.tk/news/v2/` + URL,
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
 });
console.log(`http://praktikum.tk/news/v2/` + URL)

newsApi.getNews()
.then((data) => {
  document.querySelector('#card-zone').textContent = '';
  cardMatrixLine = 0;
  if(data.articles.length === 0){
    document.querySelector('.search-result').classList.add('search-result_hidden');
    document.querySelector('.search-preloader').classList.add('search-preloader_hidden');
    document.querySelector('.not-found').classList.remove('not-found_hidden');

  }else{
  if(isLogged){
    newsCardList.listeners(data.articles, saveCard, keyWord)};
    let matrix =  listToMatrix(data.articles, 3);
  return showCards(matrix);
  }
 })
});

  const showCards = (cards) => {
    document.querySelector('.search-preloader').classList.add('search-preloader_hidden');

    newsCardList.render(cards[cardMatrixLine++], dateFormatChange, keyWord, isLogged);
    if(isLogged){
      document.querySelector('.news-card__pop-up-line').textContent = 'Сохранить';
    }else{
      document.querySelector('.news-card__pop-up-line').textContent = 'Войдите, чтобы сохранять статьи';
    }
    document.querySelector('.search-result').classList.remove('search-result_hidden');

    if(cardMatrixLine < cards.length){
      document.querySelector('#show-more-button').onclick = function(){showCards(cards)};
    }else{
      document.querySelector('#show-more-button').classList.add('news-card__show-more-button_hidden');
    }
}

document.querySelector('#two-lines').addEventListener("click", function () {
  document.querySelector('#two-lines').classList.toggle("change");
  mobileMenu.toggle(document.querySelector('#header'), 'header_menu-mobile-opened');
  mobileMenu.toggle(document.querySelector('#menu-links'), 'header__menu-links-hidden');

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
    mainApi.signup(document.querySelector('#input-email').value, document.querySelector('#input-password').value, document.querySelector('#input-name').value)
   .then((data) => {
     if(data ){
     success();
     }
  })
    .catch(err => {
      form.setServerError(document.querySelector('.error_bottom'), err)
    })
  })
  closePopup()
  popupAuth();
});
}

function auth(){
  popup.close();
  popup.clearContent();
  popup.setContent('auth');
  popup.open();
  form.listeners();
  document.forms.popupForm.addEventListener('submit', function(e){
    e.preventDefault();
    mainApi.signin(document.querySelector('#input-email').value, document.querySelector('#input-password').value)
   .then((data) => {console.log(data.data.name);

    if(data){
       header.render({
      isLoggedIn: true,
      name: data.data.name,
    })
    isLogged = true;

    popup.close();
      }
  })
  .catch(err => {
    form.setServerError(document.querySelector('.error_bottom'), err)
        isLogged = false;
  })
  })
  registration();
  closePopup()
}

document.querySelector('#link-auth').addEventListener("click", function () {
  auth();
});

function popupAuth(){
  document.querySelector('#log-in').addEventListener("click", function () {
    auth();
  });
}

function closePopup(){
document.querySelector('#close-popup').addEventListener("click", function () {
  popup.close();
  popup.clearContent();

});


document.addEventListener("click", function () {

  if (document.querySelector('#popup').contains(event.target) && (document.querySelector('#popup__content') === null || !document.querySelector('#popup__content').contains(event.target)) ){

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



// import {EditPopup} from "./js/EditPopup.js";
// import {FormValidator} from "./js/FormValidator.js";
// import {Loader} from "./js/Loader.js";
// import {PicPopup} from "./js/PicPopup.js";
// import {Popup} from "./js/Popup.js";
// import {UserInfo} from "./js/UserInfo.js";


// export const mainFunc = (function ()  {



// const card = new Card();
// const popup = new Popup(document.querySelector('#formCard'));
// const popupPhoto = new Popup(document.querySelector('#photoEdit'));

// const picPopup = new PicPopup(document.querySelector('#popupPic'));

// const validator = new FormValidator(event);
// const editPopup = new EditPopup(document.querySelector('#formEdit'));
// const cardList = new CardList(document.querySelector('.places-list'), card);
// const userInfo =  new UserInfo();
// const loader = new Loader();


// api.getUserInfo()
// .then ((data) => {

//   userInfo.setUserInfo(data.name, data.about);
//   userInfo.setUserInfoAvatar(data.avatar);


// })

// api.getInitialCards()
// .then((data) => {
//   cardList.render(data)
// });






// document.querySelector('#placesList').addEventListener('click', function () {
//   picPopup.popupPicHandler(event);
// });

// document.querySelector('#userInfoEditButton').addEventListener("click", function () {
//   loader.changeStatusBack(document.querySelector('#submitEdit'));

//   editPopup.setCurrentValue(userInfo.updateUserInfo().name, userInfo.updateUserInfo().about);
//   editPopup.open();
//   validator.listeners();

// });



// document.querySelector('#popupCloseCard').addEventListener("click", function () {
//   popup.close()
// });

// document.querySelector('#closeEditPhoto').addEventListener("click", function () {
//   popupPhoto.close()
// });

// document.querySelector('#popupClosePic').addEventListener("click", function () {
//   picPopup.close();
// });

// document.querySelector('#closeEdit').addEventListener("click", function () {
//    editPopup.close()
// });



// document.forms.edit.addEventListener("submit", function (event) {
//   event.preventDefault();

//   loader.changeStatus(document.querySelector('#submitEdit'));

//   userInfo.setUserInfo(document.querySelector('#inputUserNameEdit'), document.querySelector('#inputUserInfoEdit'));


//   api.editProfile(userInfo.updateUserInfo().name, userInfo.updateUserInfo().about)
//   .then ((data) => {
//     userInfo.setUserInfo(data.name, data.about);

//     document.querySelector('#userInfoName').textContent = userInfo.updateUserInfo().name;
//     document.querySelector('#userInfoJob').textContent = userInfo.updateUserInfo().about;
//     editPopup.close();

//   });
// });


// document.forms.new.addEventListener('submit', function (event) {
//    event.preventDefault();
//    loader.changeStatus(document.querySelector('#popupSubmit'));

//   api.addCard(document.forms.new.elements.inputName.value, document.forms.new.elements.inputLink.value)
//    .then((data) => {cardList.addCard(data.name, data.link, data.likes, true, data._id);
//   popup.close();

//   })

// });


// document.forms.editPhoto.addEventListener('submit', function (event) {
//   event.preventDefault();
//   loader.changeStatus(document.querySelector('#submitEditPhoto'));


//   userInfo.setUserInfoAvatar(document.querySelector('#inputLinkPhoto').value);

//   api.updateAvatar(userInfo.updateUserInfoAvatar().avatar)
//   .then((data) => {
//     userInfo.setUserInfoAvatar(data.avatar);


//     document.querySelector('#userInfoPic').setAttribute('style', ` background-image: url("${userInfo.updateUserInfoAvatar().avatar}")`);
//     popupPhoto.close();
//   });
// });

// }());



