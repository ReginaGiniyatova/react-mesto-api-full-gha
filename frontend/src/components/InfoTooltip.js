import successMark from "../images/success_mark.svg";
import failedMark from "../images/failed_mark.svg";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function InfoTooltip({ isOpen, isSuccess }) {
  const { closeAllPopups } = useContext(AppContext);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={closeAllPopups}
        ></button>
        <div className="popup__form">
          <img
            className="popup__state-icon"
            src={isSuccess ? successMark : failedMark}
            alt={isSuccess ? "успешная регистрация" : "что-то пошло не так"}
          />
          <p className="popup__form-description">
            {isSuccess
              ? "Вы успешно\nзарегистрировались!"
              : "Что-то пошло не так!\nПопробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
