const express = require('express');
const router = express.Router();
const {authenticate} = require('./../middleware/authenticate');
const {BookList} = require('./../models/book-list');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

router.post('/add', authenticate, (req, res) => {
  var book = _.pick(req.body, ['book']);
  var rating = _.pick(req.body, ['rating']);
  var review = _.pick(req.body, ['review']);

  BookList.findOneAndUpdate({
    userId: new ObjectID(req.user._id),
    $or: [{
      'bookList.bookId': {
        $ne: book.book.id
      }
    }, {
      bookList: {
        $size: 0
      }
    }]
  }, 
  {
    $push: {
      'bookList': {
        bookId: book.book.id,
        title: book.book.title,
        description: book.book.description,
        authors: book.book.authors,
        images: book.book.images,
        rating: rating.rating,
        review: review.review
      }
    }
  }, {
    new: true
  }).then((bookList) => {
    if (bookList) {  
      return res.send(bookList);
    }
    res.status(400).send({message: 'The book already exists in the user list'});
  }).catch((err) => {
    res.status(400).send({message: 'Unable to find user book list'});
  });
});

module.exports = router;