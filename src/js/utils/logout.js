import {Header} from '../components/Header.js';

import {MainApi} from "../api/MainApi.js";

const header = new Header();
const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });

export default function logout(isLogged){
  document.querySelector('#button-logout').addEventListener('click', function(){
   mainApi.logout()
   .then((data) =>
   {
     header.render({
       isLoggedIn: false,
     })
     window.location.replace('../index.html');
     return isLogged = false;

   }) .catch(err =>  {
     console.log(err)
     isLogged = false;
    return isLogged;
    })
    .end()
  })
 }