const express = require('express');
const router = express.Router();
const {searchBooks, getBook} = require('./../google-books-api/books-api');

router.get('/search/:search', (req, res) => {
  searchBooks(req.params.search, (error, results) => {
    if (error) {
      res.status(error.error.code).send(error);
    } else {
      res.send(results);
    }
  });
});

router.get('/find/:id', (req, res) => {
  getBook(req.params.id, (error, result) => {
    if (error) {
      res.status(error.error.code).send(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;