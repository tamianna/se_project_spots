class API {
  constructor( {baseURL, headers} ) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  //can add multiple methods to it, use a comma to separate. 
  getAppInfo() {
    return Promise.all([this.getInitialCards(),])
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

  // other methods for working with the API
}

export default API;