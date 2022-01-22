class Auth {
    constructor({ address, headers = {} }) {
        this._address = address
        this._headers = headers
    }
    _cheackServerResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(console.log(`Ошибка: ${res.status}`))
    }
    signup(email, password) {
        return fetch(`${this._address}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(this._cheackServerResponse)
    }

    login(email, password) {
        return fetch(`${this._address}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(this._cheackServerResponse)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token)
                    console.log(data)
                    return data
                }
            })
    }
    checkToken(token) {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: (this._headers = { ...this._headers, authorization: `Bearer ${token}` }),
        }).then(this._cheackServerResponse)
    }
}
const auth = new Auth({
    address: 'https://api.artemusachev.students.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default auth
