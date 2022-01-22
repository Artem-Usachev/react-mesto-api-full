const express = require('express');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const userRouter = require('./router/users');
const cardRouter = require('./router/cards');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');
const { login, createUser } = require('./controllers/users');
const corsMiddleware = require('./middlewares/cors-defend');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
}
main().catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет!');
  }, 0);
});
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/,
      ),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errors());
app.use(errHandler);

app.listen(PORT, () => {
  console.log('Server started');
});
