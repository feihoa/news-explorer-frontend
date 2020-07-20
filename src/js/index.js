import '../js/index.js';
import {Header} from './components/Header.js';

export function MenuChange(elemChange, elemClass) {
  if (elemChange.classList.contains(elemClass)){
    elemChange.classList.remove(elemClass);
  } else {
    elemChange.classList.add(elemClass);
  }
}

const header = new Header();

header.render({
  isLoggedIn: false,
  name: "Отобразись"
})