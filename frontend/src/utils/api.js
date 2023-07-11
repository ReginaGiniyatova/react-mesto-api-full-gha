class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me", {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      headers: this._headers,
    });
  }

  patchUserInfo(values) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(values),
    });
  }

  addNewCard(card) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }

  uploadAvatar(value) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(value),
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "5bf1b9a2-bdaf-45b2-a6be-6aae9b831c55",
    "Content-Type": "application/json",
  },
});

export default api;
