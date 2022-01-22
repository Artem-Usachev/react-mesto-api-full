import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'
const Header = ({ textButton, path, email, handlerButtonClick }) => {
    return (
        <header className="header ">
            <img className="header__logo " src={logo} alt="лого " />
            <div className="header__box">
                <p className="header__email">{email}</p>
                <Link to={path} className="header__link" onClick={handlerButtonClick}>
                    {textButton}
                </Link>
            </div>
        </header>
    )
}
export default Header
