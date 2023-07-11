import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { AppContext } from "../contexts/AppContext";

function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({});
  const { isLoading, closeAllPopups } = useContext(AppContext);

  React.useEffect(() => {
    setValues({
      name: "",
      link: "",
    });
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values["name"],
      link: values["link"],
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      submitText={isLoading ? "Добавление..." : "Создать"}
      isOpen={props.isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="form__input"
        type="text"
        name="name"
        value={values["name"] || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        placeholder="Что за место добавляем?"
        required
      />
      <span className="place-input-error form__error"></span>

      <input
        id="place-url-input"
        className="form__input"
        type="url"
        name="link"
        value={values["link"] || ""}
        onChange={handleChange}
        placeholder="Ссылка на фотографию"
        required
      />
      <span className="place-url-input-error form__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
