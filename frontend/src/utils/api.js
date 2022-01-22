class Api {
    constructor({ address, headers = {} }) {
        this._address = address
        this._headers = headers
    }
    _cheackServerResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }
    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._cheackServerResponse)
    }
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._cheackServerResponse)
    }

    setUserAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar,
            }),
        }).then(this._cheackServerResponse)
    }
    setUserInfo(name, about) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._cheackServerResponse)
    }
    submitCard(name, link) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._cheackServerResponse)
    }
    deleteCard(card) {
        return fetch(`${this._address}/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._cheackServerResponse)
    }

    changeLikeCardStatus(card, isLike) {
        return fetch(`${this._address}/cards/${card._id}/likes`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._cheackServerResponse)
    }
}
const api = new Api({
    address: 'https://api.artemusachev.students.nomoredomains.rocks',
})
export default api
