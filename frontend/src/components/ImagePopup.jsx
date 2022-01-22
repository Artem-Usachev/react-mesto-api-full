import React from 'react'
import closeIcon from '../images/Close-Icon.svg'

const ImagePopup = ({ card, isOpen, onClose }) => {
    return (
        <div className={` popup popup_type_photo ${isOpen ? '' : 'invisible'}`}>
            <figure className="popup__border">
                <img src={card.link} alt={card.name} className="popup__illustration" />
                <button type="button " className="popup__exit" onClick={onClose}>
                    <img src={closeIcon} alt="закрыть " className="popup__exit-img " />
                </button>
                <figcaption className="popup__signature ">{card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup
