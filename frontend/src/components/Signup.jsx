import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import successIcon from '../images/successicon.png'
import Header from './Header'
const Signup = ({
    onSignup,
    setPopupInfoTooltip,
    setPopupInformationText,
    setPopupInformationIcon,
    setPopupInformationHandleCloseIcon,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const Redirect = () => {
        history.push('/signin')
        setPopupInfoTooltip(false)
    }

    const handleSignup = (evt) => {
        evt.preventDefault()

        onSignup({
            email,
            password,
        })
            .then((res) => {
                setEmail('')
                setPassword('')
                if (res) {
                    setPopupInfoTooltip(true)
                    setPopupInformationText('Вы успешно зарегестрировались')
                    setPopupInformationIcon(successIcon)
                    setPopupInformationHandleCloseIcon(() => Redirect)
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

    const handleEmailnput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    return (
        <>
            <Header textButton="Войти" path="/signin" />
            <div className="content">
                <div className="router-window">
                    <h1 className="router-window__title">Регистрация</h1>
                    <form onSubmit={handleSignup}>
                        <input
                            className="router-window__input"
                            type="email"
                            onChange={handleEmailnput}
                            value={email}
                        />
                        <input
                            className="router-window__input"
                            type="password"
                            onChange={handlePasswordInput}
                            value={password}
                        />

                        <button className="router-window__button_registration">
                            Зарегистрироваться
                        </button>
                    </form>
                    <p className="router-window__text">
                        Уже зарегестрированны?
                        <Link to="/signin" className="router-window__link">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Signup
