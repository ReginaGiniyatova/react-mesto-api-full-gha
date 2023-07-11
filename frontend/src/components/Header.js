import logo from "../images/header-logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />

      <nav className="header__menu">
        {loggedIn && (
          <>
            <p className="header__text">{email}</p>
            <a
              onClick={handleSignOut}
              className="header__menu-link header__menu-link_inactive"
            >
              Выйти
            </a>
          </>
        )}

        {!loggedIn && location.pathname === "/sign-in" && (
          <NavLink to="/sign-up" className="header__menu-link">
            Регистрация
          </NavLink>
        )}

        {!loggedIn && location.pathname === "/sign-up" && (
          <NavLink to="/sign-in" className="header__menu-link">
            Вход
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
