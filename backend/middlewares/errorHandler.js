const {
  ERROR,
  SOMETHING_WENT_WRONG_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR;
  const message = statusCode === ERROR ? SOMETHING_WENT_WRONG_MESSAGE : err.message;

  res.status(statusCode).send({ message });
  next();
};
