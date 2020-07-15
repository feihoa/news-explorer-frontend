export class MobileMenu{

  toggle(elemChange, elemClass){
    if (elemChange.classList.contains(elemClass)){
      elemChange.classList.remove(elemClass);
    } else {
      elemChange.classList.add(elemClass);
    }
  }
}
