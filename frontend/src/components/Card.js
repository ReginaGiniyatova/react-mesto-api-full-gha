import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === props.card.owner._id;
  const isLiked = props.card.likes.some((like) => like._id === currentUser._id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleOnCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="place">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="place__delete-btn place__delete-btn_visible"
          aria-label="удалить карточку"
          onClick={handleCardDelete}
          type="button"
        ></button>
      )}

      <div className="place__detail">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__like-container">
          <button
            className={`place__like-btn ${isLiked && "place__like-btn_active"}`}
            aria-label="поставить лайк"
            onClick={handleOnCardLike}
            type="button"
          ></button>
          <p className="place__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
