class API {
  constructor(){
    // body of cons.
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "27a9340c-3c21-464f-86c2-e39184d5627d"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

export default API;