import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="edit-profile"
        title="Редактировать профиль"
        btnText="Сохранить"
      >
        <label htmlFor="user-name" className="popup__label">
          <input
            type="text"
            className="popup__field popup__field_edit_name"
            id="user-name"
            required
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
          />
          <span className="popup__field-error user-name-error"></span>
        </label>
        <label htmlFor="user-job" className="popup__label">
          <input
            type="text"
            className="popup__field popup__field_edit_job"
            id="user-job"
            name="about"
            placeholder="Профессия"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__field-error user-job-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        name="edit-avatar"
        title="Обновить аватар"
        btnText="Сохранить"
      >
        <label htmlFor="user-avatar" className="popup__label">
          <input
            type="url"
            className="popup__field popup__field_edit_avatar"
            id="avatar-link"
            required
            name="avatar"
            placeholder="Ссылка на новый аватар"
          />
          <span className="popup__field-error avatar-link-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name="add-card"
        title="Новое место"
        btnText="Создать"
      >
        <label htmlFor="card-title" className="popup__label">
          <input
            type="text"
            className="popup__field popup__field_add_title"
            id="card-title"
            required
            name="title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
          />
          <span className="popup__field-error card-title-error"></span>
        </label>
        <label htmlFor="card-link" className="popup__label">
          <input
            type="url"
            className="popup__field popup__field_add_link"
            id="card-link"
            required
            name="link"
            placeholder="Ссылка на картинку"
          />
          <span className="popup__field-error card-link-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        name="delete-card"
        title="Вы уверенны?"
        btnText="Да"
      />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
