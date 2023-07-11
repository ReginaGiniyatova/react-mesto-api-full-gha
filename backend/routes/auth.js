const auth = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const { createUser, login } = require('../controllers/auth');
const { URL_REGEX } = require('../utils/constants');

auth.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
auth.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEX),
  }),
}), createUser);

module.exports = auth;
