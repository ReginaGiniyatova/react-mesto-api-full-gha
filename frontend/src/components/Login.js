import React from "react";
import { useForm } from "../hooks/useForm";

function Login({ prefillEmail, onLogin }) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({
      email: prefillEmail,
      password: "",
    });
  }, [prefillEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      email: values["email"],
      password: values["password"],
    });
  };

  return (
    <div className="login">
      <h2 className="login__welcome">Вход</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          id="login-input-email"
          className="login-form__input"
          type="email"
          name="email"
          value={values["email"] || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          placeholder="Email"
          required
        />
        <input
          id="login-input-password"
          className="login-form__input"
          type="password"
          name="password"
          value={values["password"] || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          placeholder="Пароль"
          required
        />
        <button className="login-form__save-btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
