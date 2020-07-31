

export class NewsCard {
  constructor(keyword, cardName, cardImage, cardDescription, cardPublishedAt,cardSourceName, newsUrl, logged) {
    this.keyword = keyword;
    this.cardName = cardName;
    this.cardImage = cardImage;
    this.cardDescription = cardDescription;
    this.cardPublishedAt = cardPublishedAt;
    this.cardSourceName = cardSourceName;
    this.newsUrl = newsUrl;
    this.logged = logged;
  }

  save(event, data, savee, keyword) {
    if (event.target.classList.contains('news-card__icon')) {
      if(!event.target.classList.contains('news-card__icon_saved')){
        const card = event.target.closest('.news-card');
       let elem = data.filter(function(elem){

          if(elem.url === card.href){
          return elem;
          }
        })

 savee(keyword, elem[0].title, elem[0].urlToImage, elem[0].description, elem[0].publishedAt, elem[0].source.name, elem[0].url)
        .then(data => {
          console.log(data)
         event.target.classList.add('.news-card__icon_saved')}
)
.catch(err => console.log(err));
        }
    }
  }
  remove(event, data, remover) {
    console.log(event.target)
    if (event.target.classList.contains('news-card__icon_articles')) {
        const card = event.target.closest('.news-card');

        let elem = data.filter(function(elem){

          if(elem.link === card.href){
          return elem;
          }else{
            return false;
          }
        })
         remover(elem[0]._id)
        .then(document.querySelector('#card-zone').removeChild(card))
        .catch(err => console.log(err))

    }
  }

  create(keyword, cardNameValue, cardDescriptionValue, cardImageValue, cardPublishedAtValue, cardSourceNameValue, newsUrl) {
    let key = '';
    let icon =  ` <button onclick="event.preventDefault()" class="button news-card__save-icon news-card__icon news-card__icon-svg_black news-card__icon-svg_index">
    </button>`;
    let popupLine = ``;

    if(!cardImageValue){
      cardImageValue = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
   }
    if(window.location.pathname === '/articles.html'){
      key =  `<span  id="keyWord" class="text news-card__key-word">${keyword}</span>`
      popupLine = `<span class="text news-card__pop-up-line">Убрать из сохраненных</span>`;
      icon = `<button onclick="event.preventDefault()" class="button news-card__icon news-card__save-icon news-card__icon_articles">

    </button>`
      }else{
        // popupLine = `<span class="text news-card__pop-up-line">Сoхранить</span>`

      // }else if(!logged && ' и  сохр'){
      // icon =  ` <button onclick="event.preventDefault()" class="button news-card__icon news-card__icon_saved">
      // </button>`

         popupLine = `<span class="text news-card__pop-up-line">Войдите, чтобы сохранять статьи</span>`

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