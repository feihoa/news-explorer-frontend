import '../js/index.js';
import {Header} from './components/Header.js';

import {MainApi} from "../js/api/MainApi.js";

import getUserData from '../js/utils/getUserData.js'
import logout from '../js/utils/logout.js'


const header = new Header();

let isLogged = true;

const mainApi = new MainApi({
  baseUrl: `https://api.news-explorer-pr.tk`,
  headers: {
    'Content-Type': 'application/json',
  }
 });

//  getUserData();
//  logout();

