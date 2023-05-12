/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const Post = require('../models/post');
const User = require('../models/user');
const {
  ValidationError,
  NotFoundError,
  AuthorizationError,
  RightsError,
} = require('../constants/errors');
const { decodeToken } = require('../middlewares/auth');

const getAllPosts = async (req, res, next) => {
  console.log(req.user._id);
  const owner = req.user._id;
  try {
    const posts = await Post.find({ owner });
    return res.status(200).send(posts);
  } catch (e) {
    next(e);
  }
};
const deletePost = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthorizationError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const ownerId = decodeToken(token);
    if (req.user._id !== ownerId._id) {
      throw new RightsError('Невозможно удалить запись другого пользователя');
    }
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) {
      throw new NotFoundError('Запись не найдена');
    }
    return res.status(200).send(post);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};
const createPost = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  try {
    const post = await Post.create({
      message: req.body.message,
      name: user.name,
      owner: req.user._id,
    });
    if (!post) {
      throw new NotFoundError('Запись не найдена');
    }
    return res.status(200).send(post);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};

const editPost = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthorizationError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const ownerId = decodeToken(token);
    if (req.user._id !== ownerId._id) {
      throw new RightsError('Невозможно изменить запись другого пользователя');
    }
    const newPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { message: req.body.message },
      { new: true, runValidators: true },
    );
    res.status(200).send(newPost);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены не корректно'));
      return;
    }
    next(e);
  }
};

module.exports = {
  getAllPosts,
  deletePost,
  createPost,
  editPost,
};
