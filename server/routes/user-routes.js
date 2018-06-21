const express = require('express')
const router = express.Router();
const {authenticate} = require('./../middleware/authenticate');
const {User} = require('./../models/user');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

router.get('/', authenticate, (req, res) => {
  res.send(req.user);
});

router.post('/', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
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

router.patch('/reset-password', authenticate, (req, res) => {
  var body = _.pick(req.body, ['newPassword']);

  User.find({_id: new ObjectID(req.user._id)}).then((user) => {
    user[0].password = body.newPassword;
    user[0].tokens = [];
    var newUser = new User(user[0]);

    newUser.save().then(() => {
      return newUser.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(newUser);
    }).catch((error) => {
      res.status(400).send({message: 'Unable to create new profile'});
    });
  });
});

router.patch('/update/name', authenticate, (req, res) => {
  var body = _.pick(req.body, ['firstName', 'lastName']);

  User.find({_id: new ObjectID(req.user._id)}).then((user) => {
    if (body.firstName) {
      user[0].firstName = body.firstName;
    }
    if (body.lastName) {
      user[0].lastName = body.lastName;
    }
    var newUser = new User(user[0]);

    newUser.save().then(() => {
      res.send(newUser);
    }).catch((error) => {
      res.status(400).send({message: 'Unable to update profile'});
    });
  });
})

module.exports = router;