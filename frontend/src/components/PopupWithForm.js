import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm(props) {
  function handleSubmit(e) {
    props.onSubmit(e);
  }

  usePopupClose(props.isOpen, props.onClose);

  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={`popup-${props.name}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__form">
          <h3 className="popup__form-title">{props.title}</h3>

          <form
            className="form"
            name={`${props.name}-form`}
            onSubmit={handleSubmit}
          >
            {props.children}
            <button
              className="form__save-btn"
              aria-label={props.submitText}
              type="submit"
            >
              {props.submitText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
