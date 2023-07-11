const { PERMISSION_ERROR } = require('../utils/constants');

module.exports = class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = PERMISSION_ERROR;
  }
};
