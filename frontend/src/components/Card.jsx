import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(CurrentUserContext)

    const handleDeleteBtnClick = (card) => {
        onCardDelete(card)
    }
    const handleImgClick = (card) => {
        onCardClick(card)
    }
    const handleLikeClick = (card) => {
        console.log(card)
        onCardLike(card)
    }
    const isOwn = card.owner === currentUser._id
    const isLiked = card.likes.some((like) => like._id === currentUser._id)
    const cardDeleteButtonClassName = `place__delete ${isOwn ? 'place__delete' : 'invisible'}`
    const cardLikeButtonClassName = `place__heart ${
        isLiked ? 'place__heart_active' : 'place__heart'
    }`

    return (
        <>
            <div className="place-template ">
                <article className="place">
                    <img
                        src={card.link}
                        className="place__illustration "
                        alt={card.name}
                        onClick={() => handleImgClick(card)}
                    ></img>
                    <button
                        type="button"
                        className={cardDeleteButtonClassName}
                        onClick={() => handleDeleteBtnClick(card)}
                    ></button>
                    <div className="place__box ">
                        <h2 className="place__title ">{card.name}</h2>
                        <div className="place__heart-box">
                            <button
                                className={cardLikeButtonClassName}
                                type="button"
                                onClick={() => handleLikeClick(card)}
                            ></button>
                            <figcaption className="place__heart-signature">
                                {card.likes.length > 0 && card.likes.length}
                            </figcaption>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}

export default Card
