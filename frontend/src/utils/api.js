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
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  patchUserInfo(values) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  }

  addNewCard(card) {
    return this._request("/cards", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  setLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  uploadAvatar(value) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
  }
}

const api = new Api({
  baseUrl: "https://api.mesto.rs.nomoredomains.work",
});

export default api;
