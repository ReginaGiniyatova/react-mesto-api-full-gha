const URL_REGEX = /https?:\/\/(www\.)?[[a-zA-Z0-9-._~:/?#[]+\.[a-z]+[[a-zA-Z0-9-._~:/?#[]+/;

const SECRET_KEY = 'marpha-the-cat';

const INVALID_ARGUMENTS_ERROR = 400;
const AUTHORIZATION_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const ERROR = 500;
const PERMISSION_ERROR = 403;
const USER_EXISTS_ERROR = 409;

const SOMETHING_WENT_WRONG_MESSAGE = 'Ошибка! Что-то пошло не так.';
const USER_NOT_FOUND_MESSAGE = 'Ошибка! Пользователь не найден.';
const USER_WRONG_ID_MESSAGE = 'Ошибка! Неверный id пользователя.';
const INVALID_ARGUMENTS_MESSAGE = 'Ошибка! Неккоректные данные.';

const CARD_NOT_FOUND_MESSAGE = 'Ошибка! Карточка не найдена.';
const CARD_WRONG_ID_MESSAGE = 'Неверный id карточки.';

const PAGE_NOT_FOUND_MESSAGE = 'Страница не найдена.';

const AUTHORIZATION_ERROR_MESSAGE = 'Ошибка! Неверная почта или пароль.';
const NEED_AUTHORIZATION_ERROR_MESSAGE = 'Ошибка! Необходима авторизация.';
const PERMISSION_ERROR_MESSAGE = 'Ошибка! У вас недостаточно прав.';

const USER_EXISTS_MESSAGE = 'Ошибка! Пользователь уже существует.';

module.exports = {
  URL_REGEX,
  INVALID_ARGUMENTS_ERROR,
  NOT_FOUND_ERROR,
  ERROR,
  AUTHORIZATION_ERROR,
  SOMETHING_WENT_WRONG_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_WRONG_ID_MESSAGE,
  INVALID_ARGUMENTS_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  CARD_WRONG_ID_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  AUTHORIZATION_ERROR_MESSAGE,
  NEED_AUTHORIZATION_ERROR_MESSAGE,
  PERMISSION_ERROR,
  PERMISSION_ERROR_MESSAGE,
  USER_EXISTS_ERROR,
  USER_EXISTS_MESSAGE,
  SECRET_KEY,
};
