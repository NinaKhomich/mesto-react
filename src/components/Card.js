const Card = ({ name, link, likes, onCardClick, card }) => {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="card">
      <img onClick={handleClick} className="card__photo" alt={name} src={link} />
      <h2 className="card__title">{name}</h2>
      <div className="card__likes">
        <button
          aria-label="Нравится"
          className="card__like"
          type="button"
        ></button>
        <span className="card__likes-number">{likes}</span>
      </div>
      <button
        aria-label="Удалить"
        className="card__delete"
        type="button"
      ></button>
    </article>
  );
};

export default Card;
