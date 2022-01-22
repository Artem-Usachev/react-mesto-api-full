import { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputAvatarRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateAvatar(inputAvatarRef.current.value)
    }
    return (
        <>
            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                onClose={onClose}
                isOpen={isOpen}
                onSubmit={handleSubmit}
            >
                <input
                    ref={inputAvatarRef}
                    type="text"
                    id="avatar-link"
                    className="popup__text popup__avatar-link "
                    name="link"
                    placeholder="Ссылка на картинку "
                    required
                    pattern="https://.*"
                />
                <p className="avatar-link-error text-error invisible"></p>
            </PopupWithForm>
        </>
    )
}
