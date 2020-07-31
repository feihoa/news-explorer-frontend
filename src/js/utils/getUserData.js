import {Header} from '../components/Header.js';

import {MainApi} from "../api/MainApi.js";

const header = new Header();
const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });

export default function getUserData(isLogged){
mainApi.getUserData()
.then((data) => {
 if(data.data){
   header.render({
 isLoggedIn: true,
 name: data.data.name
})
 isLogged = true;
 }
})
.catch(err =>
 {
   isLogged = false;

 if(window.location.pathname === '/articles.html'){
   window.location.replace('../index.html');
 }
 console.log(err)
 return isLogged;
})
}