const express = require('express');
const mongoose = require('mongoose');
const DefaultError = require('../middlewares/defaultError.middleware');
const ValidateKey = require('../middlewares/validateKey.middleware');
const Collections = require('../models/collection.model');

const collection = express.Router();

collection.use(ValidateKey);

collection.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (userId && userId !== '') {
    Collections.find({ user: mongoose.Types.ObjectId(userId) })
      .then((data) => {
        res.status(200).json({ success: true, collections: data });
      })
      .catch(next);
  }
});

collection.use(DefaultError);
module.exports = collection;
