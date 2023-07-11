const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя карточки должно быть от 2 до 30 символов.',
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Ссылка на аватарку не должна быть пустой.',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
