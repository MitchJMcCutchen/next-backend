const mongoose = require('mongoose');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const ObjectId = mongoose.Schema.Types.ObjectId;

var BookListSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  bookId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  authors: [String],
  images: {
    smallThumbnail: {
      type: String
    },
    thumbnail: {
      type: String
    },
    small: {
      type: String
    },
    medium: {
      type: String
    },
    large: {
      type: String
    },
    extraLarge: {
      type: String
    }
  },
  rating: {
    overall: {
      type: Boolean,
      required: true
    },
    plot: {
      type: Boolean,
      required: true
    },
    style: {
      type: Boolean,
      required: true
    },
    genre: {
      type: Boolean,
      required: true
    },
    characters: {
      type: Boolean,
      required: true
    }
  },
  review: {
    type: String
  }
});

BookListSchema.methods.addBook = function (book, rating, review) {
  var Books = this;
  var list = {
          bookId: book.book.id,
          title: book.book.title,
          description: book.book.description,
          authors: book.book.authors,
          images: book.book.images,
          rating: rating.rating,
          review: review.review
        }
  let index = Books.bookList.findIndex((bookObj) => {
    return bookObj.bookId === book.id;
  });
  if (index === -1) {
    console.log('update');
    bookList.bookList.push()
    console.log('new list', bookList);
    return Promise.resolve(bookList);
  } else {
    return Promise.reject();
  }
};


var BookList = mongoose.model('BookList', BookListSchema);

module.exports = {BookList};