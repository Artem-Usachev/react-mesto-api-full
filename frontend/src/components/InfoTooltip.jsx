import React from 'react'
import closeIcon from '../images/Close-Icon.svg'
const InfoTooltip = ({ onClose, isOpen, text, img }) => {
    return (
        <div className={`popup  ${isOpen ? '' : 'invisible'}`}>
            <div className="popup__border">
                <button className="popup__exit" type="button" onClick={onClose}>
                    <img className="popup__exit-img" src={closeIcon} alt="закрыть" />
                </button>
                <div className="popup__content">
                    <img src={img} alt="результат регистрации" className="popup__information-img" />
                    <h2 className="popup__title popup__title_type_information">{text}</h2>
                </div>
            </div>
        </div>
    )
}
export default InfoTooltip
