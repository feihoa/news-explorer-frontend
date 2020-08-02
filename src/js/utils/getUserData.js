import {Header} from '../components/Header.js';

import {MainApi} from "../api/MainApi.js";

const header = new Header();
const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });

export default function getUserData(){
  const popupLine = document.querySelector('.news-card__pop-up-line');
return mainApi.getUserData()
.then((data) => {
 if(data.data){
   header.render({
 isLoggedIn: true,
 name: data.data.name
})
if(window.location.pathname === '/articles.html'){
document.querySelector('#user-name').textContent = data.data.name;
document.querySelector('#user-name-a').textContent = data.data.name;
}
 return true;
 }
})
.catch(err =>
 {
 if(window.location.pathname === '/articles.html'){
   window.location.replace('../index.html');
 }
 console.log(err)
 return false;
})
}