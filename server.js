'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User.js');
const Book = require('./modules/book.js');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)

User.collection.drop()

app.get('/profile', Book.profile);
app.get('/books', Book.list);
app.post('/books', Book.add);
app.put('/books/:id', Book.update);
app.delete('/books/:id', Book.delete);

app.use('*', (req, res) => {
  res.status(404).send('route not found');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
