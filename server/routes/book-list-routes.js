const express = require('express');
const router = express.Router();
const {authenticate} = require('./../middleware/authenticate');
const {BookList} = require('./../models/book-list');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

router.get('/', authenticate, (req, res) => {
  BookList.find({userId: new ObjectID(req.user._id)}).then((list) => {
    res.send(list);
  }).catch((err) => {
    res.status(404).send();
  });
})

router.post('/add', authenticate, (req, res) => {
  var book = _.pick(req.body, ['book']);
  var rating = _.pick(req.body, ['rating']);
  var review = _.pick(req.body, ['review']);

  var newBook = new BookList({
    userId: req.user._id,
    bookId: book.book.id,
    title: book.book.title,
    description: book.book.description,
    authors: book.book.authors,
    images: book.book.images,
    rating: rating.rating,
    review: review.review
  });
  newBook.save().then(() => {
    BookList.find({userId: new ObjectID(req.user._id)}).then((list) => {
      res.send(list);
    }).catch((err) => {
      res.status(400).send({message: 'Unable to get users list'})
    });
  });
});

router.delete('/remove/:id', authenticate, (req, res) => {
  var book = req.params.id;

  BookList.findOneAndRemove({
    userId: new ObjectID(req.user._id),
    bookId: book
  }).then(() => {
    BookList.find({userId: new ObjectID(req.user._id)}).then((list) => {
      res.send(list);
    }).catch((err) => {
      res.status(400).send({message: 'Unable to get users list'});
    });
  }).catch((err) => {
    res.status(400).send({message: 'Unable to find the user book list'});
  });
});

router.patch('/rating/:id', authenticate, (req, res) => {
  var book = req.params.id;
  var ratings = _.pick(req.body, ['ratings']);

  BookList.findOneAndUpdate({
    userId: new ObjectID(req.user._id),
    bookId: book
  }, {
    $set: {
      rating: ratings.ratings
    }
  }, {
    new: true
  }).then((updatedBook) => {
    if (updatedBook) {
      console.log('updated book');
      BookList.find({userId: new ObjectID(req.user._id)}).then((list) => {
        res.send(list);
      }).catch((err) => {
        res.status(400).send({message: 'Unable to get users list'});
      });
    }
    else {
      res.status(404).send({message: 'Book does not exist in your list'});
    }
  }).catch((err) => {
    res.status(400).send({message: 'Unable to find the user book list'});
  });
});

module.exports = router;