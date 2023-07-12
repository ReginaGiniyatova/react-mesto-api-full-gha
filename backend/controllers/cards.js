const Card = require('../models/card');
const InvalidArgumentError = require('../errors/InvalidArgumentError');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');
const {
  INVALID_ARGUMENTS_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  PERMISSION_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((error) => (
      error.name === 'ValidationError'
        ? next(new InvalidArgumentError(INVALID_ARGUMENTS_MESSAGE))
        : next
    ));
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      }

      const { owner } = card;

      if (owner.valueOf() !== userId) {
        throw new PermissionError(PERMISSION_ERROR_MESSAGE);
      }

      return card.deleteOne()
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

module.exports.setCardLike = (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }

      throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
    })
    .catch(next);
};

module.exports.setCardDislike = (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send(card);
      }

      throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
    })
    .catch(next);
};
