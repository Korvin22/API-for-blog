/* eslint-disable linebreak-style */
const router = require('express').Router();
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
} = require('../controllers/posts');

router.get('/', getAllPosts);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  deletePost,
);
router.patch(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  editPost,
);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      message: Joi.string().required(),
    }),
  }),
  createPost,
);

router.use(errors()); // обработчик ошибок celebrate
module.exports = router;
