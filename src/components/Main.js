import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  const getUserData = () => {
    api
      .setProfileInfo()
      .then((res) => {
        setUserAvatar(res.avatar);
        setUserName(res.name);
        setUserDescription(res.about);
      })
      .catch((err) =>
        console.log(`Невозможо загрузить данные страницы. Ошибка: ${err})`)
      );
  };

  const getCardsArray = () => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) =>
        console.log(`Невозможо загрузить данные страницы. Ошибка: ${err})`)
      );
  };

  useEffect(() => {
    getCardsArray();
  }, []);

  useEffect(() => {
    getUserData();
  });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-box" onClick={onEditAvatar}>
          <img
            src={userAvatar}
            alt="Аватар профиля"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            aria-label="Редактировать профиль"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          aria-label="Добавить"
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section aria-label="Фотографии профиля" className="cards">
        {cards.map((card) => {
          return (
            <div key={card._id}>
              <Card
                name={card.name}
                link={card.link}
                likes={card.likes.length}
                card={card}
                onCardClick={onCardClick}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Main;
