export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkRequestResult)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkRequestResult)
  }


  likeCard(id, method) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: `${method}`,
      headers: this._headers,
    })
      .then(this._checkRequestResult)
  }


  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
      .then(this._checkRequestResult)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: `DELETE`,
      headers: this._headers,
    })
      .then(this._checkRequestResult)
  }

  updateUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
      .then(this._checkRequestResult)
  }

  updateAvatar(av_link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: av_link,
      }),
    }).then(this._checkRequestResult);
  }
}

