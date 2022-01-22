import React, { useEffect, useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Signup from './Signup'
import { ProtectedRoute } from './ProtectedRoute'
import auth from '../utils/auth'
import errorIcon from '../images/erroricon.png'
import InfoTooltip from './InfoTooltip'
const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditPlacePopupOpen, setIsEditPlacePopupOpen] = useState(false)
    const [isSelectedCardPopupOpen, setSelectedCardPopupOpen] = useState(false)
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [cards, setCards] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const [isOpenPopupInfoTooltip, setPopupInfoTooltip] = useState(false)
    const [popupInformationText, setPopupInformationText] = useState('')
    const [popupInformationIcon, setPopupInformationIcon] = useState()
    const [popupInformationHandleCloseIcon, setPopupInformationHandleCloseIcon] = useState()

    const [selectedCard, setSelectedCard] = useState({
        name: '',
        link: '',
    })
    const [currentUser, setCurrentUser] = useState({
        about: '',
        avatar: '',
        email: '',
        name: '',
        _id: '',
    })

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i._id === currentUser._id)
        api.changeLikeCardStatus(card, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)))
            })
            .catch((err) => console.log(err))
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch((err) => console.log(err))
    }

    const handleCardClick = (card) => {
        setSelectedCardPopupOpen(true)
        setSelectedCard(card)
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setIsEditPlacePopupOpen(true)
    }

    const closeAllPopup = () => {
        setIsEditProfilePopupOpen(false)
        setIsEditPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCardPopupOpen(false)
        setPopupInfoTooltip(false)
        setSelectedCard({ name: '', link: '' })
    }

    const handleUpdateUser = (userName, userDescription) => {
        api.setUserInfo(userName, userDescription)
            .then((data) => {
                setCurrentUser(data)
            })
            .then(() => {
                closeAllPopup()
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateAvatar = (avatar) => {
        api.setUserAvatar(avatar)
            .then((data) => {
                setCurrentUser(data)
            })
            .then(() => {
                closeAllPopup()
            })
            .catch((err) => console.log(err))
    }
    const handleAddPlaceSubmit = (name, link) => {
        api.submitCard(name, link)
            .then((data) => {
                setCards([data, ...cards])
            })
            .then(() => {
                closeAllPopup()
            })
            .catch((err) => console.log(err))
    }

    const handleSignUp = ({ email, password }) => {
        return auth
            .signup(email, password)
            .then((res) => {
                return res
            })
            .catch((err) => {
                setPopupInfoTooltip(true)
                setPopupInformationText('Что-то пошло не так! Попробуйте ещё раз.')
                setPopupInformationIcon(errorIcon)
                setPopupInformationHandleCloseIcon(() => closeAllPopup)
                console.log(err)
            })
    }

    const handleSignIn = ({ email, password }) => {
        return auth
            .login(email, password)
            .then((res) => {
                setUserEmail(email)
                checkToken()
                return res
            })
            .catch((err) => {
                setPopupInfoTooltip(true)
                setPopupInformationText('Что-то пошло не так! Попробуйте ещё раз.')
                setPopupInformationIcon(errorIcon)
                setPopupInformationHandleCloseIcon(() => closeAllPopup)
                console.log(err)
            })
    }

    const checkToken = () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    setUserEmail(res.user.email)
                    setAuthenticated(true)
                })
                .catch((err) => console.log(err))
        }
    }
    console.log('user:', currentUser)
    const handleLogOut = () => {
        const token = localStorage.getItem('jwt')
        localStorage.removeItem('jwt', token)
        setAuthenticated(false)
        setCurrentUser({ about: '', avatar: '', email: '', name: '', _id: '' })
    }
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsList]) => {
                setCurrentUser(userData.user)
                setCards(cardsList.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }, [isAuthenticated, currentUser])

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <BrowserRouter>
                        <Switch>
                            {' '}
                            <ProtectedRoute exact path="/">
                                <Header
                                    textButton="Выйти"
                                    path="/signin"
                                    email={userEmail}
                                    handlerButtonClick={handleLogOut}
                                />
                                <div className="content ">
                                    <Main
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        onCardLikeClick={handleCardLike}
                                        onCardDeleteClick={handleCardDelete}
                                        cards={cards}
                                    />
                                    <Footer />

                                    <EditProfilePopup
                                        isOpen={isEditProfilePopupOpen}
                                        onClose={closeAllPopup}
                                        onUpdateUser={handleUpdateUser}
                                    />

                                    <EditAvatarPopup
                                        isOpen={isEditAvatarPopupOpen}
                                        onClose={closeAllPopup}
                                        onUpdateAvatar={handleUpdateAvatar}
                                    />
                                    <AddPlacePopup
                                        isOpen={isEditPlacePopupOpen}
                                        onClose={closeAllPopup}
                                        onAddPlace={handleAddPlaceSubmit}
                                    />
                                    <ImagePopup
                                        isOpen={isSelectedCardPopupOpen}
                                        onClose={closeAllPopup}
                                        card={selectedCard}
                                    ></ImagePopup>
                                </div>
                            </ProtectedRoute>
                            <Route exact path="/signin">
                                <Login onLogin={handleSignIn} />
                            </Route>
                            <Route exact path="/signup">
                                <Signup
                                    onSignup={handleSignUp}
                                    setPopupInfoTooltip={setPopupInfoTooltip}
                                    setPopupInformationText={setPopupInformationText}
                                    setPopupInformationIcon={setPopupInformationIcon}
                                    setPopupInformationHandleCloseIcon={
                                        setPopupInformationHandleCloseIcon
                                    }
                                />
                            </Route>
                        </Switch>
                        <InfoTooltip
                            isOpen={isOpenPopupInfoTooltip}
                            onClose={popupInformationHandleCloseIcon}
                            text={popupInformationText}
                            img={popupInformationIcon}
                        />
                    </BrowserRouter>
                </div>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App
