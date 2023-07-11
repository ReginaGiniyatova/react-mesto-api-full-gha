const cards = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCardById,
  setCardLike,
  setCardDislike,
} = require('../controllers/cards');
const { URL_REGEX } = require('../utils/constants');

cards.get('/', getCards);
cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
}), createCard);
cards.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCardById);
cards.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), setCardLike);
cards.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), setCardDislike);

module.exports = cards;
