const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://database/NextApp');

module.exports = {mongoose}
