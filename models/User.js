'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String},
  description: {type: String},
  status: {type: String, enum: ['read', 'currently reading', 'favorite']},
  img: { type: String, required: true}
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  books: [bookSchema]
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;
