import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { AppContext } from "../contexts/AppContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({});
  const { isLoading, closeAllPopups } = useContext(AppContext);

  React.useEffect(() => {
    setValues({
      username: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values["username"],
      about: values["description"],
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      submitText={isLoading ? "Сохранить" : "Сохранение"}
      isOpen={props.isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <input
        id="username-input"
        className="form__input"
        value={values["username"] || ""}
        onChange={handleChange}
        type="text"
        name="username"
        minLength="2"
        maxLength="40"
        placeholder="Как вас зовут?"
        required
      />
      <span className="username-input-error form__error"></span>
      <input
        id="profession-input"
        className="form__input"
        type="text"
        name="description"
        value={values["description"] || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        placeholder="Чем занимаетесь?"
        required
      />
      <span className="profession-input-error form__error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
