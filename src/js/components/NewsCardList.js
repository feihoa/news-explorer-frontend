export class NewsCardList {
  constructor(container, newsCard) {
      this.newsCard = newsCard;
      this.container = container;

  }

  addCard(keyword, cardName, cardDescription, cardImage, cardPublishedAt, cardSourceName, newsUrl) {
      this.container.insertAdjacentHTML('beforeend', this.newsCard.create(keyword, cardName, cardDescription, cardImage, cardPublishedAt, cardSourceName, newsUrl));
  }
  listeners(data, re) {
    if(window.location.pathname === '/articles.html'){

      this.container.addEventListener('click', event => {

        this.newsCard.remove(event, data, re)
    });

    }else{
      this.container.addEventListener('click', event => {

          this.newsCard.save(event, data, re);
      });
    }
  }
  _deleteTags(elem){
    const re = /<\/?[^<^>]+(>|$)/g;
    if (elem !== null && elem){
    return elem  = elem.replace(re, "");
    }
  }

  render(data, dateFormatChange) {
      this.data = data;
      this.dateFormatChange = dateFormatChange;
      if(data){      console.log(data)

     return  data.forEach(elem => {
      const keyword = this._deleteTags(elem.keyword)
      const title = this._deleteTags(elem.title);
      const description = (this._deleteTags(elem.description) || this._deleteTags(elem.text) )
      const urlToImage = (this._deleteTags(elem.urlToImage) || this._deleteTags(elem.image));
      const publishedAt = (this._deleteTags(elem.publishedAt) || this._deleteTags(elem.date));
      const sourceName = (this._deleteTags(elem.source.name) || this._deleteTags(elem.source));
      const url = (this._deleteTags(elem.url)|| this._deleteTags(elem.link));

          this.addCard(keyword, title, description, urlToImage, this.dateFormatChange(publishedAt), sourceName, url);
      })
    }
  }
}