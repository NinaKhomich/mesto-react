import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function getProfileInfo() {
    Promise.all([api.setProfileInfo(), api.getInitialCards()])
      .then(([userObj, initialCards]) => {
        setCurrentUser(userObj);
        setCards(initialCards);
      })
      .catch((err) =>
        console.log(`Невозможо загрузить данные страницы. Ошибка: ${err})`)
      );
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardItem) =>
            cardItem._id === card._id ? newCard : cardItem
          )
        );
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((cardItem) => cardItem._id !== card._id)
        );
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`));
  }

  function handleUpdateUser(formValues) {
    api
      .editProfileInfo(formValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`));
  }

  function handleUpdateAvatar(formValues) {
    api
      .editProfileAvatar(formValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так. Ошибка: ${err})`));
  }

  function handleAddPlaceSubmit(formValues) {
    api
      .addCard(formValues)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Невозможо загрузить данные страницы. Ошибка: ${err})`)
      );
  }

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
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          name="delete-card"
          title="Вы уверенны?"
          btnText="Да"
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
