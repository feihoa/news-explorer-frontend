export class NewsCardList {
  constructor(container, newsCard) {
      this.newsCard = newsCard;
      this.container = container;

  }

  addCard(cardName, cardDescription, cardImage, cardPublishedAt, cardSourceName, newsUrl) {
      this.container.insertAdjacentHTML('beforeend', this.newsCard.create(cardName, cardDescription, cardImage, cardPublishedAt, cardSourceName, newsUrl));
  }
  listeners(api) {
      this.container.addEventListener('click', event => {

          // this.card.like(event, api);
      });

      // this.container.addEventListener('click', event => {
      //     this.card.remove(event, api)
      // });
  }
  _deleteTags(elem){
    const re = /<\/?[^<^>]+(>|$)/g;
    if (elem !== null){
    return elem  = elem.replace(re, "");
    }
  }

  render(data, dateFormatChange) {
      this.data = data;
      this.dateFormatChange = dateFormatChange;
      if(data){      console.log(data)

     return  data.forEach(elem => {
      const title = this._deleteTags(elem.title);
      const description = this._deleteTags(elem.description);
      const urlToImage = this._deleteTags(elem.urlToImage);
      const publishedAt = this._deleteTags(elem.publishedAt);
      const sourceName = this._deleteTags(elem.source.name);
      const url = this._deleteTags(elem.url);

          this.addCard(title, description, urlToImage, this.dateFormatChange(publishedAt), sourceName, url);
      })
    }
  }
}