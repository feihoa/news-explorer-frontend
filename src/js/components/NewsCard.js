

export class NewsCard {
  constructor(keyword, cardName, cardImage, cardDescription, cardPublishedAt,cardSourceName,newsUrl) {
    this.keyword = keyword;
    this.cardName = cardName;
    this.cardImage = cardImage;
    this.cardDescription = cardDescription;
    this.cardPublishedAt = cardPublishedAt;
    this.cardSourceName = cardSourceName;
    this.newsUrl = newsUrl;
  }

  save(event, data, save) {
    event.returnValue = true
    if (event.target.classList.contains('news-card__icon-svg_index') || event.target.classList.contains('news-card__icon-svg_index').children[0,1 ] ||  event.target.classList.contains('news-card__icon-svg') ||  event.target.classList.contains('card-svg') ) {
      if(!event.target.classList.contains('news-card__icon-svg_black')){
        const card = event.target.closest('.news-card');
        console.log(card)
        save(data[0])
        .then(data => {

         event.target.classList.add('news-card__icon-svg_blue')});

    }else{
      event.target.classList.remove('news-card__icon-svg_blue')

    }
    }
  }
  remove(event, data, remover) {
    console.log(event.target)
    if (event.target.classList.contains('button') || event.target.parentElement.classList.contains('button') || event.target.classList.contains('card-svg') ) {
      if (window.confirm("Вы действительно хотите удалить эту статью?")) {
        const card = event.target.closest('.news-card');
        console.log(data[0])
         remover(data[0]._id)
        .then(document.querySelector('#card-zone')).removeChild(card)
        .catch(err)
      }
    }
  }

  create(keyword, cardNameValue, cardDescriptionValue, cardImageValue, cardPublishedAtValue, cardSourceNameValue, newsUrl) {
    let key = '';
    let icon =  ` <button onclick="event.preventDefault()" class="button news-card__save-icon news-card__icon news-card__icon-svg_black news-card__icon-svg_index">
  <svg class="news-card__icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="card-svg" d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" stroke="#B6BCBF" stroke-width="2"/>
  </svg>
    </button>`
    let popupLine = ``
    if(cardImageValue){
      console.log(cardImageValue)
    }else{
      cardImageValue = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    }
    if(window.location.pathname === '/articles.html'){
      key =  `<span id="keyWord" class="text news-card__key-word">${keyword}</span>`
      popupLine = `<span class="text news-card__pop-up-line">Убрать из сохраненных</span>`;
      icon = `<button onclick="event.preventDefault()" class="button news-card__icon news-card__save-icon news-card__icon news-card__icon-svg_black-articles">
      <svg class="news-card__icon-svg news-card__icon-svg-articles" width="21" height="21" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="card-svg" fill-rule="evenodd" clip-rule="evenodd" d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z" fill="#B6BCBF"/>
      </svg>
    </button>`
      }else if('авторизирован и не сохр'){
        popupLine = `<span class="text news-card__pop-up-line">Сoхранить</span>`

      }else if('авторизирован и  сохр'){
      icon =  ` <button onclick="event.preventDefault()" class="button news-card__icon news-card__save-icon news-card__icon-svg_blue">
        <svg class="news-card__icon-svg news-card__icon-svg_blue" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="card-svg" d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z"     stroke="#B6BCBF" stroke-width="2"/>
        </svg>
      </button>`

      }else if('не авторизирован'){
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