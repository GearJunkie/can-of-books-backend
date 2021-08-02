'use strict';

const getKey = require('../lib/getKey.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const Book = {};

//===================================================//

Book.profile = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function(err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
  })
}

//===================================================//

Book.list = (req, res) => {
  User.find({})
  .then(books => {
    res.json(books);
  })
}

//===================================================//

Book.add = (req, res) => {
  const {email, name, description, status} = req.body;
  User.findOne({email:email})
  .then(user => {
    console.log(user)
    user.books.push(
      {name:name, description:description, status:status}
    )
    user.save()
    res.json(user);
  }).catch(err => console.error(err))
}
//===================================================//

Book.update = (req, res) => {
  let id = req.arams.id;
  User.findByIdAndUpdate(id)
  .then(() => res.json({ msg: 'book updated' }))
  .catch(err => console.error(err));
}

//=====================================================//

Book.delete = (req, res) => {
  let id = req.params.id;
  User.findByIdAndDelete(id)
  .then(() => res.json({ msg: 'book deleted'}))
  .catch(err => console.error(err));
}

//====================================================//

module.exports = Book;
