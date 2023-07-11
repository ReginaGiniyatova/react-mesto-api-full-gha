const { INVALID_ARGUMENTS_ERROR } = require('../utils/constants');

module.exports = class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INVALID_ARGUMENTS_ERROR;
  }
};
