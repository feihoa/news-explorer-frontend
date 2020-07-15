import '../js/index.js';

export function MenuChange(elemChange, elemClass) {
  if (elemChange.classList.contains(elemClass)){
    elemChange.classList.remove(elemClass);
  } else {
    elemChange.classList.add(elemClass);
  }
}

