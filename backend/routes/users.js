const users = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getUserInfo);
users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REGEX),
  }),
}), updateUserAvatar);

module.exports = users;
