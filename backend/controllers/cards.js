const Card = require('../models/cards');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...(req.body.owner = req.user._id),
    ...req.body,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ValidationError = new BadRequestError(
          'Переданы не корректные данные в метод создания карточки',
        );
        next(ValidationError);
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return card;
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndDelete(card._id)
          .then((cardDelited) => {
            res.status(200).send(cardDelited);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалить чужую карточку!');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const CastError = new BadRequestError('Передан не корректный id карточки');
        next(CastError);
      }
      next(err);
    });
};
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cardLiked) => {
      if (!cardLiked) {
        throw new NotFoundError('Карточка не найдена');
      } else res.status(200).send(cardLiked);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const CastError = new BadRequestError('Передан не корректный id карточки');
        next(CastError);
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cardDisliked) => {
      if (!cardDisliked) {
        throw new NotFoundError('Карточка не найдена');
      } else res.status(200).send(cardDisliked);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const CastError = new BadRequestError('Передан не корректный id карточки');
        next(CastError);
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
