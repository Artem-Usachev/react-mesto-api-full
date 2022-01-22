import React, { useContext } from 'react'
import settingAvatar from '../images/setting-avatar.svg'
import pen from '../images/pen.svg'
import plus from '../images/plus.svg'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLikeClick,
    onCardDeleteClick,
}) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <>
            <section className="profile ">
                <button type="button" className="avatar-box" onClick={onEditAvatar}>
                    <img
                        className="avatar-box__avatar"
                        src={currentUser.avatar}
                        alt="фото профиля"
                    />
                    <img
                        className="avatar-box__setting-avatar"
                        src={settingAvatar}
                        alt="загрузить аватар"
                    />
                    <div className="avatar-box__backdrop"></div>
                </button>
                <div className="info ">
                    <div className="info__bar ">
                        <h1 className="info__title ">{currentUser.name}</h1>
                        <button className="info__setting-box" onClick={onEditProfile}>
                            <img className="info__pen-image " src={pen} alt="редактировать " />
                        </button>
                    </div>
                    <p className="info__subtitle ">{currentUser.about}</p>
                </div>
                <button className="add-button " type="button" onClick={onAddPlace}>
                    <img className="add-button__plus " src={plus} alt="добавить " />
                </button>
            </section>

            <section className="places ">
                {cards.length > 0 &&
                    cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLikeClick}
                            onCardDelete={onCardDeleteClick}
                        />
                    ))}
            </section>
        </>
    )
}
