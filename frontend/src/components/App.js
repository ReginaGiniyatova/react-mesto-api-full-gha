import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/auth";
import { AppContext } from "../contexts/AppContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn)
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch(console.error);
  }, [loggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .getContent(jwt)
        .then((json) => {
          setEmail(json.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch(console.error);
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((_) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleRegister(data) {
    authApi
      .signUp(data)
      .then((json) => {
        setEmail(json.data.email);
        navigate("/sign-in", { replace: true });
        setIsRegisterSuccess(true);
      })
      .catch((error) => {
        setIsRegisterSuccess(false);
        console.error(error);
      })
      .finally((_) => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleUpdateUser(values) {
    setIsLoading(true);
    api
      .patchUserInfo(values)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally((_) => setIsLoading(false));
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api
      .uploadAvatar(value)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally((_) => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally((_) => setIsLoading(false));
  }

  function handleLogin(data) {
    authApi
      .signIn(data)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        checkToken();
      })
      .catch((error) => {
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error(error);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm title="Вы уверены?" name="remove" submitText="Да" />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} />

        <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isRegisterSuccess} />

        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                element={Main}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login prefillEmail={email} onLogin={handleLogin} />}
          />
        </Routes>

        {loggedIn && <Footer />}
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
