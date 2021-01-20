const express = require('express');
const DefaultError = require('../middlewares/defaultError.middleware');
const ValidateKey = require('../middlewares/validateKey.middleware');
const Users = require('../models/user.model');

const user = express.Router();

user.use(ValidateKey);

user.post('/', (req, res, next) => {
  const { email } = req.body;
  Users.findOne({ email })
    .then((possible) => {
      if (possible === null) {
        Users.create({ email })
          .then((data) => {
            res.status(200).json({ success: true, userInfo: data });
          })
          .catch(next);
      } else {
        res.status(200).json({ success: true, userInfo: possible });
      }
    })
    .catch(next);
});

user.use(DefaultError);

module.exports = user;
