const request = require('request');
const api_key = 'AIzaSyCh0Y97t6aJ68J85AfeTaH7pbo1gmwycE8';

var searchBooks = (search, callback) => {
  const returnFields = 'items(id%2CvolumeInfo(authors%2Ccategories%2Cdescription%2CimageLinks%2CpageCount%2CpublishedDate%2Cpublisher%2CseriesInfo%2Csubtitle%2Ctitle))%2CtotalItems';

  request({
    url: `https://www.googleapis.com/books/v1/volumes?q=${search}&fields=${returnFields}&key=${api_key}`,
    json: true
    }, (error, response, body) => {
      if (error) {
        callback('Unable to connect to Google Servers.');
      } else if (body.error) {
        callback(body);
      } else {
        callback(undefined, body);
      }
    })
}

var getBook = (bookId, callback) => {
  const returnFields = 'fields=id%2CvolumeInfo(authors%2Ccategories%2Cdescription%2CimageLinks%2CpageCount%2Ctitle)';
  
  request({
    url: `https://www.googleapis.com/books/v1/volumes/${bookId}&fields=${returnFields}&key="${api_key}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google Servers.');
    } else if (body.error) {
      callback(body);
    } else {
      callback(undefined, body);
    }
  });
}

module.exports = {searchBooks, getBook};