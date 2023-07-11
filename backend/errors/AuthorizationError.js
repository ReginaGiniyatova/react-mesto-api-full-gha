const { AUTHORIZATION_ERROR } = require('../utils/constants');

module.exports = class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHORIZATION_ERROR;
  }
};
