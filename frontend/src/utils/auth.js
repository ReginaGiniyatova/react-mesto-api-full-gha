class Auth {
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

  signUp(data) {
    return this._request("/signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  signIn(data) {
    return this._request("/signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  getContent(token) {
    return this._request("/users/me", {
      methos: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const authApi = new Auth({
  baseUrl: "https://api.mesto.rs.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
