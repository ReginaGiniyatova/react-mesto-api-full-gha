import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <a className="profile__avatar-cover" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            alt="аватарка пользователя"
            src={currentUser.avatar}
          />
        </a>
        <div className="profile-info">
          <div className="profile-info__container">
            <h1 className="profile-info__username">{currentUser.name}</h1>
            <button
              className="profile-info__edit-button"
              aria-label="открыть форму редактирования профиля"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile-info__user-description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="открыть форму добавления карточки"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="places">
        {props.cards.map((card, id) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
