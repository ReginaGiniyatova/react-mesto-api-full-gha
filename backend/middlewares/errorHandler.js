const {
  ERROR,
  SOMETHING_WENT_WRONG_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const {
    statusCode = ERROR,
    message: msg = SOMETHING_WENT_WRONG_MESSAGE,
  } = err;

  res.status(statusCode).send({ message: msg });
  next();
};
