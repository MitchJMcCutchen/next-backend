const express = require('express')
const router = express.Router();
const {authenticate} = require('./../middleware/authenticate');
const {User} = require('./../models/user');
const _ = require('lodash');

router.get('/', authenticate, (req, res) => {
  res.send(req.user);
});

router.post('/', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  body.password = body.password.toLowerCase();
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((error) => {
    res.status(400).send({message: 'Unable to create new profile'});
  });
});

router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  body.email = body.email.toLowerCase();

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send({message: 'Logged Out Successfully '});
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;