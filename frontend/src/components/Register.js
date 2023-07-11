import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({ onRegister }) {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      email: values["email"],
      password: values["password"],
    });
  };
  return (
    <div className="register">
      <h2 className="register__welcome">Регистрация</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          id="register-input-email"
          className="register-form__input"
          type="email"
          name="email"
          minLength="2"
          maxLength="30"
          placeholder="Email"
          value={values["email"] || ""}
          onChange={handleChange}
          required
        />
        <input
          id="register-input-password"
          className="register-form__input"
          type="password"
          name="password"
          minLength="2"
          maxLength="30"
          placeholder="Пароль"
          value={values["password"] || ""}
          onChange={handleChange}
          required
        />
        <button className="register-form__save-btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <NavLink to="/sign-in" className="register__has-account-text">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
}

export default Register;
