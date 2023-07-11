const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { URL_REGEX, USER_NOT_FOUND_MESSAGE, AUTHORIZATION_ERROR_MESSAGE } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlenght: 30,
    default: 'Жак-Ив Кусто',
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя должно быть от 2 до 30 символов.',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlenght: 30,
    default: 'Исследователь',
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Описание должно быть от 2 до 30 символов.',
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Ссылка на аватарку не должна быть пустой.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError(USER_NOT_FOUND_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError(AUTHORIZATION_ERROR_MESSAGE));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
