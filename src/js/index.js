import '../js/index.js';
import {Header} from './components/Header.js';

import {MainApi} from "../js/api/MainApi.js";


const header = new Header();



const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });



 mainApi.getUserData()
 .then((data) => {
  if(data){
    header.render({
  isLoggedIn: true,
  name: data.data.name
})
  }else{
    console.log(window.location)
    if(window.location.pathname === '/articles.html'){
    window.location.replace('../index.html');
    }
  }
 })

 document.querySelector('#button-logout').addEventListener('click', function(){
  mainApi.logout()
  .then((data) =>
  {
    header.render({
      isLoggedIn: false,
    })
    window.location.replace('../index.html');
  })
 })
