const { ERROR } = require('../utils/constants');

module.exports = class UnexpectedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR;
  }
};
