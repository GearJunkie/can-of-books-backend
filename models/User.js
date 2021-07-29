'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String},
  description: {type: String},
  // author: {type: String},
  status: {type: String}
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  books: [bookSchema]
})


module.exports = mongoose.model('users', userSchema);
