const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
