export class NewsCardList {
  constructor(container, newsCard) {
      this.newsCard = newsCard;
      this.container = container;

  }

  addCard(cardName, cardDescription, cardImage, isLoggedIn, cardPublishedAt, id, cardSourceName) {

      this.container.insertAdjacentHTML('beforeend', this.newsCard.create(cardName, cardDescription, cardImage, isLoggedIn, cardPublishedAt, id, cardSourceName));
  }
  listeners(api) {
      this.container.addEventListener('click', event => {

          // this.card.like(event, api);
      });

      this.container.addEventListener('click', event => {
          this.card.remove(event, api)
      });
  }

  render(data) {
      this.data = data;
      let id ;
     return  data.forEach(elem => {
          id = elem._id;
          // if (elem.owner._id == '981c6a4012de8f86661526e3'){
          //     canDel = true;
          // }else{
          //     canDel = false;
          // }

          this.addCard(elem.name, elem.description, elem.image, isLoggedIn, elem.publishedAt, elem.id, elem.sourceName);
      })
  }
}