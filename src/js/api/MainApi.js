export class MainApi {
  constructor(options) {
    this.options = options;
  }
  signup(email, password, name){
    this.email = email;
    this.password = password;
    this.name = name;
    return  fetch(this.options.baseUrl + '/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: `${this.email}`,
        password: `${this.password}`,
        name: `${this.name}`
      }),
      headers:

          this.options.headers,
  })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

            return Promise.reject(`${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch(err => {throw err});
  }

  signin(email, password){
    this.email = email;
    this.password = password;
    return  fetch(this.options.baseUrl + '/signin', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        email: `${this.email}`,
        password: `${this.password}`
      }),
      headers:
          this.options.headers,
  })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
            return Promise.reject(`${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch(err => {throw err});

  }

  getUserData(){
    return  fetch(this.options.baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      'Content-Type': 'application/json',
      headers:
          this.options.headers,
  })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`${res.status} ${res.statusText}`);
      })
      .then((data) => {
        return data;
      })
      .catch(err => {throw err});
  }


  getArticles(){
    return  fetch(this.options.baseUrl + '/articles', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      'Content-Type': 'application/json',
      headers:
          this.options.headers,
  })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch(err => {throw err});

  }

  createArticle(keyword, cardName, cardImage, cardDescription, cardPublishedAt, cardSourceName, newsUrl){
      this.keyword = keyword;
      this.cardName = cardName;
      this.cardImage = cardImage;
      this.cardDescription = cardDescription;
      this.cardPublishedAt = cardPublishedAt;
      this.cardSourceName = cardSourceName;
      this.newsUrl = newsUrl;
    return  fetch(this.options.baseUrl + '/articles', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        keyword: `${this.keyword}`,
        title: `${this.cardName}`,
        image: `${this.cardImage}`,
        text: `${this.cardDescription}`,
        date: `${this.cardPublishedAt}`,
        source: `${this.cardSourceName}`,
        link: `${this.newsUrl}`
      }),
      'Content-Type': 'application/json',
      headers:
          this.options.headers,
      })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`${res.status}`);
        })
        .then((data) => {
          return data;
        })
        .catch(err => {throw err});
      };


  removeArticle(id){
      this.id = id;
    return  fetch(this.options.baseUrl + '/articles/' + id, {
          method: 'DELETE',
          credentials: 'include',
          withCredentials: true,
          'Content-Type': 'application/json',
          headers:
              this.options.headers,
      })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`${res.status}`);
        })
        .then((data) => {
          return data;
        })
        .catch(err => {throw err});
      }

  logout(){
    return  fetch(this.options.baseUrl + '/logout', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      'Content-Type': 'application/json',
      headers:
          this.options.headers,
  })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch(err => {throw err});

  }

}

