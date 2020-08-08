import { BaseComponent } from "./BaseComponent";

export class NewsCardList extends BaseComponent {
  constructor(container, newsCard) {
    super();
    this.newsCard = newsCard;
    this.container = container;
  }

  addCard(
    keyword,
    cardName,
    cardDescription,
    cardImage,
    cardPublishedAt,
    cardSourceName,
    newsUrl,
    saved
  ) {
    this.container.insertAdjacentHTML(
      "beforeend",
      this.newsCard.create(
        keyword,
        cardName,
        cardDescription,
        cardImage,
        cardPublishedAt,
        cardSourceName,
        newsUrl,
        saved
      )
    );
  }
  listeners(data, func, key) {
    if (window.location.pathname.includes("/articles.html")) {
      this.container.addEventListener("click", (event) => {
        this.newsCard.remove(event, data, func);
      });
    } else {
      this.container.addEventListener("click", (event) => {
        this.newsCard.save(event, data, func, key);
      });
    }
  }
  _deleteTags(elem) {
    const re = /<\/?[^<^>]+(>|$)/g;
    if (elem !== null && elem) {
      return (elem = elem.replace(re, ""));
    }
  }
  cardPopupLineText(isLogged) {
    const popupLines = Array.prototype.slice.call(
      document.querySelectorAll(".news-card__pop-up-line")
    );
    if (popupLines) {
      if (isLogged) {
        popupLines.forEach((elem) => {
          elem.textContent = "Сохранить";
        });
        return true;
      } else {
        popupLines.forEach((elem) => {
          elem.textContent = "Войдите, чтобы сохранять статьи";
        });

        return false;
      }
    }
  }

  render(data, dateFormatChange, key, saved) {
    this.data = data;
    this.dateFormatChange = dateFormatChange;
    this.key = key;
    this.saved = saved;

    if (data) {
      return data.forEach((elem) => {
        const keyword = this._deleteTags(elem.keyword) || this._deleteTags(key);
        const title = this._deleteTags(elem.title);
        const description =
          this._deleteTags(elem.description) || this._deleteTags(elem.text);
        const urlToImage =
          this._deleteTags(elem.urlToImage) || this._deleteTags(elem.image);
        const publishedAt =
          this._deleteTags(elem.publishedAt) || this._deleteTags(elem.date);
        const sourceName =
          this._deleteTags(elem.source.name) || this._deleteTags(elem.source);
        const url = this._deleteTags(elem.url) || this._deleteTags(elem.link);

        this.addCard(
          keyword,
          title,
          description,
          urlToImage,
          this.dateFormatChange(publishedAt),
          sourceName,
          url,
          saved
        );
      });
    }
  }
}
