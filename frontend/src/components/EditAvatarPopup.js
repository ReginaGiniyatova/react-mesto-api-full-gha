import { useContext, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const editAvatarPopupRef = useRef();
  const { isLoading, closeAllPopups } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: editAvatarPopupRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submitText={isLoading ? "Сохранить" : "Сохранение"}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={closeAllPopups}
    >
      <input
        id="avatar-url-input"
        className="form__input"
        type="url"
        name="link"
        placeholder="Ссылка на изображение"
        ref={editAvatarPopupRef}
        required
      />
      <span className="avatar-url-input-error form__error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
