import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const handleLoginInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleLogin = (e) => {
        e.preventDefault()

        onLogin({ email, password })
            .then((res) => {
                if (res) {
                    history.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            history.push('/')
        }
    }, [history])
    return (
        <>
            <Header textButton="Регистрация" path="/signup" />
            <div className="content">
                <div className="router-window">
                    <h1 className="router-window__title">Вход</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            className="router-window__input"
                            type="email"
                            value={email}
                            onChange={handleLoginInput}
                        />
                        <input
                            className="router-window__input"
                            type="password"
                            value={password}
                            onChange={handlePasswordInput}
                        />

                        <button className="router-window__button_registration" type="submit">
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login
