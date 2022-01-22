import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateUser(name, description)
    }
    useEffect(() => {
        if (currentUser.name === undefined) {
            setName('')
            setDescription('')
        } else {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
    }, [currentUser.name, currentUser.about, isOpen])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    return (
        <>
            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                onClose={onClose}
                isOpen={isOpen}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    id="user-name"
                    className="popup__text popup__user-name"
                    name="name"
                    placeholder="Имя"
                    required
                    onChange={handleChangeName}
                    value={name}
                />
                <p className="user-name-error text-error invisible"></p>
                <input
                    type="text"
                    id="user-info"
                    className="popup__text popup__user-info"
                    name="about"
                    placeholder="О себе"
                    required
                    onChange={handleChangeDescription}
                    value={description}
                />
                <p className="user-info-error text-error invisible"></p>
            </PopupWithForm>
            )
        </>
    )
}
