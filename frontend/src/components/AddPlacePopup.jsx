import { useState } from 'react'
import PopupWithForm from './PopupWithForm'
export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [cardImg, setCardImg] = useState('')
    const [cardName, setCardName] = useState('')
    const handleChangeCardName = (e) => {
        setCardName(e.target.value)
    }

    const handleChangeCardImg = (e) => {
        setCardImg(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onAddPlace(cardName, cardImg)
    }
    return (
        <PopupWithForm
            name="place"
            title="Новое место"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="place-name"
                className="popup__text popup__place-name "
                name="name"
                placeholder="Название "
                required
                value={cardName}
                onChange={handleChangeCardName}
            />
            <p className="place-name-error text-error invisible"></p>
            <input
                type="text"
                id="place-link"
                className="popup__text popup__place-link "
                name="link"
                placeholder="Ссылка на картинку "
                required
                pattern="(https://.*|http://.*)"
                value={cardImg}
                onChange={handleChangeCardImg}
            />
            <p className="place-link-error text-error invisible"></p>
        </PopupWithForm>
    )
}
