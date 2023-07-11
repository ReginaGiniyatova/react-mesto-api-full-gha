const { USER_EXISTS_ERROR } = require('../utils/constants');

module.exports = class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = USER_EXISTS_ERROR;
  }
};
