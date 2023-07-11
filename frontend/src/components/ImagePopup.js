import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function ImagePopup(props) {
  const { closeAllPopups } = useContext(AppContext);

  return (
    <div
      className={`popup ${
        props.card.name ? "popup_opened" : ""
      } popup_dark_overlay`}
      id="popup-photo-view"
    >
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={closeAllPopups}
        ></button>
        <img
          className="popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <h3 className="popup__label">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
