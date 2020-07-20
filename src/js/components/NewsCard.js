

export class NewsCard {
  constructor(cardName, cardImage, cardDescription, cardPublishedAt,cardSourceName) {
    this.cardName = cardName;
    this.cardImage = cardImage;
    this.cardDescription = cardDescription;
    this.cardPublishedAt = cardPublishedAt;
    this.cardSourceName = cardSourceName;
  }

  save(save, api) {
    if (event.target.classList.contains('place-card__like-icon')) {
      if(!event.target.classList.contains('place-card__like-icon_liked')){
        const card = event.target.closest('.place-card');

        api.saveCard(card.id)
        .then((data)  => {return card.querySelector('.place-card__like-number').textContent  = data.likes.length} );
                event.target.classList.add('place-card__like-icon_liked')

    }else{

      const card = event.target.closest('.place-card');
      api.deleteLike(card.id)
      .then((data)  => {return card.querySelector('.place-card__like-number').textContent  = data.likes.length} );
      event.target.classList.remove('place-card__like-icon_liked')

     }
    }
  }

  remove(event, api) {
    if (event.target.classList.contains('place-card__delete-icon')) {

      if (window.confirm("Вы действительно хотите удалить эту карточку?")) {

        const card = event.target.closest('.place-card');
        api.deleteCard(card.id)
        .then(document.querySelector('#placesList').removeChild(card));
      }
    }
  }

  create(cardNameValue, cardDescriptionValue, cardImageValue, isLoggedIn, cardPublishedAtValue, id, cardSourceNameValue) {

    this.cardLike = cardLike;
    this.canDel = canDel;
    this.id = id;

    let del = '';
    let liked = '';

    if(canDel){
      del = '<button class="place-card__delete-icon"></button>';
    };

    cardLike.forEach(function (elem) {
      if (elem._id == '981c6a4012de8f86661526e3'){
        liked = 'place-card__like-icon_liked';

      };
  });

    return   ` <div class="news-card" id=${id}>
  <div class="news-card__image" style="background-image: url(${cardImageValue})">
    <button class="button news-card__save-icon news-card__icon news-card__icon-svg_black">
      <svg class="news-card__icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="card-svg" d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z" stroke="#B6BCBF" stroke-width="2"/>
      </svg>
    </button>
    <span class="text news-card__pop-up-line">${isLoggedIn}</span>
  </div>
  <div class="news-card__content">
    <p class="news-card__date" >${cardPublishedAtValue}</p>
    <h3 class="title news-card__name">${cardNameValue}</h3>
    <p class="text text_black news-card__text">${cardDescriptionValue}</p>
  </div>
  <p class="title news-card__source">${cardSourceNameValue}</p>
</div>
`
  }
}