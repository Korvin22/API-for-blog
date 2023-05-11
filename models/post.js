/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const postModel = mongoose.model('card', postSchema);

module.exports = postModel;
