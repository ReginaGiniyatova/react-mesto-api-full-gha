const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const {
  NEED_AUTHORIZATION_ERROR_MESSAGE,
  SECRET_KEY,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError(NEED_AUTHORIZATION_ERROR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return next(new AuthorizationError(NEED_AUTHORIZATION_ERROR_MESSAGE));
  }

  req.user = payload;

  return next();
};
