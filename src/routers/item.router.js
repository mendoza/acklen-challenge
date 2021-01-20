const express = require('express');
const Items = require('../models/item.model');
const DefaultError = require('../middlewares/defaultError.middleware');
const ValidateKey = require('../middlewares/validateKey.middleware');
const mongoose = require('mongoose');

const item = express.Router();

item.use(ValidateKey);
// Create a collection
item.post('/', (req, res, next) => {
  const { name, value, collection } = req.body;

  Items.create({ name, value, collectionId: mongoose.Types.ObjectId(collection) })
    .then((data) => {
      res.status(200).json({ success: true, item: data });
    })
    .catch(next);
});

item.use(DefaultError);
module.exports = item;
