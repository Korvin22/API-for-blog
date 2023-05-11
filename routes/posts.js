/* eslint-disable linebreak-style */
const router = require('express').Router();
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const {
  getAllPosts, createPost, deletePost,
} = require('../controllers/posts');

router.get('/', getAllPosts);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deletePost);
router.post('/', celebrate({
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
}), createPost);

router.use(errors()); // обработчик ошибок celebrate
module.exports = router;
