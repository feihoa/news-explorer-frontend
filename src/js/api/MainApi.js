 // signup регистрирует нового пользователя;
  // signin аутентифицирует пользователя на основе почты и пароля;
  // getUserData возвращает информацию о пользователе;
  // getArticles забирает все статьи;
  // createArticle создаёт статью;
  // removeArticle удаляет статью.

export class MainApi {
  constructor(options) {
    this.options = options;
  }


  signup()
  signin()
  getUserData(){
    return  fetch(this.options.baseUrl + '/users/me', {
      headers : this.options.headers,
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

            return Promise.reject(` ${res.status}`);
      })
      .then((data) => {

        return data;
      })
      .catch((err) => {
        console.log(err);
      });

  }
  getArticles()

  createArticle(name, link){
      this.name = name;
      this.link = link;
    return  fetch(this.options.baseUrl + '/cards', {
          method: 'POST',
          body: JSON.stringify({
            name: `${this.name}`,
            link: `${this.link}`
          }),
          headers:
              this.options.headers,
      })
          .then((res) => {
              if (res.ok) {
                return res.json();
              }

                  return Promise.reject(` ${res.status}`);
            })
            .then((data) => {
              return data;
            })
            .catch((err) => {
              console.log(err);
            })

  };


  removeArticle(id){
      this.id = id;
    return  fetch(this.options.baseUrl + '/cards/' + id, {
          method: 'DELETE',
          headers:
              this.options.headers,
      })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }

              return Promise.reject(` ${res.status}`);
        })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });

  }


  // другие методы работы с API
}

