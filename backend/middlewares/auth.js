const jwt = require('jsonwebtoken');
const {
  AUTHORIZATION_ERROR,
  NEED_AUTHORIZATION_ERROR_MESSAGE,
  SECRET_KEY,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(AUTHORIZATION_ERROR).send({ message: NEED_AUTHORIZATION_ERROR_MESSAGE });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return res.status(AUTHORIZATION_ERROR).send({ message: NEED_AUTHORIZATION_ERROR_MESSAGE });
  }

  req.user = payload;

  return next();
};
