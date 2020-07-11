import "./index.css";




// import {Api} from "./js/Api.js";
// import {Card} from "./js/Card.js";
// import {CardList} from "./js/CardList.js";
// import {EditPopup} from "./js/EditPopup.js";
// import {FormValidator} from "./js/FormValidator.js";
// import {Loader} from "./js/Loader.js";
// import {PicPopup} from "./js/PicPopup.js";
// import {Popup} from "./js/Popup.js";
// import {UserInfo} from "./js/UserInfo.js";


// export const mainFunc = (function ()  {

//   const api = new Api({
//     baseUrl: NODE_ENV === 'development' ? 'http://praktikum.tk/cohort9' : 'https://praktikum.tk/cohort9',
//     headers: {
//       authorization: '548c5797-a590-40d0-8f9e-48d758ca9ae7',
//       'Content-Type': 'application/json'
//     }
//   });

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


//   document.querySelector('#userInfoName').textContent = userInfo.updateUserInfo().name;
//   document.querySelector('#userInfoJob').textContent = userInfo.updateUserInfo().about;
//   document.querySelector('#userInfoPic').setAttribute('style', ` background-image: url("${userInfo.updateUserInfoAvatar().avatar}")`);

// })

// api.getInitialCards()
// .then((data) => {
//   cardList.render(data)
// });



// cardList.listeners(api);




// document.querySelector('#userInfoButton').addEventListener("click", function () {
//   loader.changeStatusBack(document.querySelector('#submitEdit'));

//   validator.resetPrevious();
//   popup.open();
//   validator.listeners();

// });



// document.querySelector('#userInfoPic').addEventListener("click", function () {
//   loader.changeStatusBack(document.querySelector('#submitEditPhoto'));

//   validator.resetPrevious();

//   popupPhoto.open();
//   validator.listeners();
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



