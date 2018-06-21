require('./../config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const users = require('./routes/user-routes');
const googleBooks = require('./routes/google-book-routes');
const bookLists = require('./routes/book-list-routes');

const {searchBooks, getBook} = require('./google-books-api/books-api');

var app = express();
const port = process.env.PORT;

const baseURL = '/api/v1';

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-auth');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('Access-Control-Expose-Headers', 'x-auth');

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(baseURL + '/users', users);
app.use(baseURL + '/books', googleBooks);
app.use(baseURL + '/booklist', bookLists);



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
