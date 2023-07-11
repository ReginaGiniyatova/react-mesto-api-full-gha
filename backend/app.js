const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const {
  PAGE_NOT_FOUND_MESSAGE,
} = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use('/', authRoutes);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE)));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
