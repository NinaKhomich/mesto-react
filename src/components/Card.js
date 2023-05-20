import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
  card,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeBtnClassName = `card__like ${isLiked && "card__like_active"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        onClick={handleClick}
        className="card__photo"
        alt={name}
        src={link}
      />
      <h2 className="card__title">{name}</h2>
      <div className="card__likes">
        <button
          aria-label="Нравится"
          className={cardLikeBtnClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <span className="card__likes-number">{likes}</span>
      </div>
      {isOwn && (
        <button
          aria-label="Удалить"
          className="card__delete"
          type="button"
          onClick={handleCardDelete}
        ></button>
      )}
    </article>
  );
};

export default Card;
