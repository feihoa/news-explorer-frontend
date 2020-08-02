
export default function cardPopupLineText(isLogged){
  const popupLine = Array.prototype.slice.call(document.querySelectorAll('.news-card__pop-up-line'));
  if(popupLine){

  if(isLogged){
    popupLine.forEach(elem => {
  elem.textContent = "Сохранить";
    });
return true;
  }else{
    popupLine.forEach(elem => {
      elem.textContent = "Войдите, чтобы сохранять статьи";
        });  console.log(isLogged)

return false;
  }
}
}