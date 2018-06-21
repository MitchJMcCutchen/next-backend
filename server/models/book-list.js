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

BookListSchema.index({bookId: 1, userID: 1} , {unique: true});


var BookList = mongoose.model('BookList', BookListSchema);

module.exports = {BookList};