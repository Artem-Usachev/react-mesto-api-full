const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');

const optsForUpdateUser = {
  new: true,
  runValidators: true,
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const CastError = new BadRequestError('Передан не корректный id пользователя');
        next(CastError);
      }
      next(err);
    });
};
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const CastError = new BadRequestError('Передан не корректный id пользователя');
        next(CastError);
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'strongest-key-ever',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          token,
        });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        const TypeError = new UnauthorizedError('Неправильные почта или пароль');
        next(TypeError);
      }
      next(err);
    });
};
const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      }),
    )
    .then((user) =>
      res.status(200).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        about: user.about,
      }),
    )
    .catch((err) => {
      if (err.code === 11000) {
        const MongoError = new ConflictError('Пользователь с таким email уже зарегестрирован');
        next(MongoError);
      }
      if (err.name === 'ValidationError') {
        const ValidationError = new BadRequestError(
          'Переданы некорректные данные в методы создания пользователя',
        );
        next(ValidationError);
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, optsForUpdateUser)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ValidationError = new BadRequestError(
          'Переданы некорректные данные в методы обновления аватара пользователя',
        );
        next(ValidationError);
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    optsForUpdateUser,
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ValidationError = new BadRequestError(
          'Переданы некорректные данные в методы обновления профиля',
        );
        next(ValidationError);
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUser,
  login,
  getCurrentUser,
};
