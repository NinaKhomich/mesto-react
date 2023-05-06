const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_type_photo ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_photo">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="popup__close-btn"
          type="button"
        ></button>
        <figure className="popup__img">
          <img src={card.link} alt={card.name} className="popup__photo" />
          <figcaption className="popup__img-title">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
