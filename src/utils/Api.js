class API {
  constructor( {baseURL, headers} ) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  //can add multiple methods to it, use a comma to separate.
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo(),])
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
  headers: this._headers,
})
.then(res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
});
}

  addNewCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }


  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

// other methods for working with the API
editUserInfo({ name, about }) {
  return fetch(`${this._baseURL}/users/me`, {
    method: "PATCH",
    headers: this._headers,

    body: JSON.stringify({
      name,
      about,
    }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  });
}

}


export default API;