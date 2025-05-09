class API {
  constructor( {baseURL, headers} ) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
  headers: this._headers,
})
.then((res) => res.json());
  }

  // other methods for working with the API
}

export default API;