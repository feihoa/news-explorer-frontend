export class NewsCardList {
  constructor(container, newsCard) {
      this.newsCard = newsCard;
      this.container = container;

  }

  addCard(cardName, cardDescription, cardImage, isLoggedIn, cardPublishedAt, id, cardSourceName, newsUrl) {
      this.container.insertAdjacentHTML('beforeend', this.newsCard.create(cardName, cardDescription, cardImage, isLoggedIn, cardPublishedAt, id, cardSourceName, newsUrl));
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
  clearContent(){
    // if( document.querySelectorAll('#news-card') !== null){
    //   this.container.removeChild( document.querySelectorAll('news-card') );
    // }
    var myNode = document.querySelector("#news-card");

    if(myNode !== null){
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }  }
  }
  render(data) {
    this.clearContent()
      this.data = data;
     return  data.articles.forEach(elem => {
      let isLoggedIn = 'Сохранить';
      const title = this._deleteTags(elem.title);
      const description = this._deleteTags(elem.description);
      const urlToImage = this._deleteTags(elem.urlToImage);
      const publishedAt = this._deleteTags(elem.publishedAt);
      const sourceName = this._deleteTags(elem.source.name);
      const url = this._deleteTags(elem.url);

          this.addCard(title, description, urlToImage, isLoggedIn, publishedAt, elem.id, sourceName, url);
      })
  }
}