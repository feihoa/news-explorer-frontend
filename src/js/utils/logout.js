import {Header} from '../components/Header.js';

import {MainApi} from "../api/MainApi.js";

const header = new Header();
const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });

export default function logout(){
   return mainApi.logout()
   .then((data) =>
   { header.render({
      isLoggedIn: false,
     })
     window.location.href = ('/index.html');

     return data;

   })
 }