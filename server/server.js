require('./../config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const users = require('./routes/user-routes');
const googleBooks = require('./routes/google-book-routes');

const {searchBooks, getBook} = require('./google-books-api/books-api');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/users', users);
app.use('/books', googleBooks);



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
