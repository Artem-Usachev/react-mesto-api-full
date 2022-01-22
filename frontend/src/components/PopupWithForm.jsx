import React from 'react'
import closeIcon from '../images/Close-Icon.svg'

const PopupWithForm = ({ name, title, onClose, isOpen, children, onSubmit }) => {
    return (
        <div className={`popup  popup_type_${name} ${isOpen ? '' : 'invisible'}`}>
            <div className="popup__border">
                <button className="popup__exit" type="button" onClick={onClose}>
                    <img className="popup__exit-img" src={closeIcon} alt="закрыть" />
                </button>{' '}
                <form className={`popup__content popup__profile-${name}`} onSubmit={onSubmit}>
                    <h2 className="popup__title"> {title} </h2> {children}{' '}
                    <button
                        className={`popup__button popup__button_condition_active popup__button_type_${name}`}
                        type="submit "
                        // disabled
                        id={`btn-${name}`}
                        value="Сохранить"
                    >
                        Сохранить{' '}
                    </button>{' '}
                </form>{' '}
            </div>{' '}
        </div>
    )
}

export default PopupWithForm
