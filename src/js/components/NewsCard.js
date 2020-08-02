import { BaseComponent } from "./BaseComponent";

export class NewsCard extends BaseComponent{
  constructor(keyword, cardName, cardImage, cardDescription, cardPublishedAt,cardSourceName, newsUrl, saved) {
    super();
    this.keyword = keyword;
    this.cardName = cardName;
    this.cardImage = cardImage;
    this.cardDescription = cardDescription;
    this.cardPublishedAt = cardPublishedAt;
    this.cardSourceName = cardSourceName;
    this.newsUrl = newsUrl;
    this.saved = saved;
  }

  save(event, data, savee, keyword) {
    if (event.target.classList.contains('news-card__icon_index')) {
      if(!event.target.classList.contains('news-card__icon_saved')){
        const card = event.target.closest('.news-card');
       data.filter(function(elem){

      if(elem.url === card.href){
          if(!/^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi.test(elem.urlToImage)){
             elem.urlToImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
          }
          savee(keyword, elem.title, elem.urlToImage, elem.description, elem.publishedAt, elem.source.name, elem.url)
          .then(data => {
            if (data){
            event.target.classList.add('news-card__icon_saved')
            event.target.parentElement.querySelector('.news-card__pop-up-line').textContent='Сохранено';
            }
          })
          .catch(err => {console.log(err); return err});
      }
  })
    }
    }
  }

  remove(event, data, remover) {
    if (event.target.classList.contains('news-card__icon_articles')) {
        const card = event.target.closest('.news-card');
        data.filter(function(elem){
        if(elem.link === card.href){
      remover(elem._id)
      .then(data => {if (data) {document.querySelector('#card-zone').removeChild(card)}})
      .catch(err => {console.log(err); return err})
        }else{
          return false;
        }
      })
    }
  }


  create(keyword, cardNameValue, cardDescriptionValue, cardImageValue, cardPublishedAtValue, cardSourceNameValue, newsUrl, saved) {
    let key = '';
    let icon =  ` <button onclick="event.preventDefault()" class="button news-card__save-icon news-card__icon news-card__icon_index">
    </button>`;
    let popupLine = ``;

    if(!((/^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi).test(cardImageValue))){
      cardImageValue = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
   }
    if(window.location.pathname === '/articles.html'){
      key =  `<span  id="keyWord" class="text news-card__key-word">${keyword}</span>`
      popupLine = `<span class="text news-card__pop-up-line">Убрать из сохраненных</span>`;
      icon = `<button onclick="event.preventDefault()" class="button news-card__icon news-card__save-icon news-card__icon_articles">
    </button>`
    }else if (!saved) {
      popupLine = `<span class="text news-card__pop-up-line">Войдите, чтобы сохранять статьи</span>`
    }else if(saved.indexOf( newsUrl ) === -1){
      popupLine = `<span class="text news-card__pop-up-line">Сохранить</span>`
    }else if( (saved.indexOf( newsUrl ) !== -1)){
      icon = `<button onclick="event.preventDefault()" class="button news-card__icon news-card__save-icon news-card__icon_index news-card__icon_saved">`;
      popupLine = `<span class="text news-card__pop-up-line">Сoхранено</span>`
    }
  return   ` <a class="news-card" target="_blank" href="${newsUrl}">
  <div class="news-card__image" style="background-image: url(${cardImageValue})">
      ${key}
      ${icon}
      ${popupLine}
  </div>
  <div class="news-card__content">
    <p class="news-card__date" >${cardPublishedAtValue}</p>
    <h3 class="title news-card__name">${cardNameValue}</h3>
    <p class="text text_black news-card__text">${cardDescriptionValue}</p>
  </div>
  <p class="title news-card__source">${cardSourceNameValue}</p>
</a>
`
  }
}