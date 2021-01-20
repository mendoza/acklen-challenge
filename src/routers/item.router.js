const express = require('express');
const mongoose = require('mongoose');
const Items = require('../models/item.model');
const DefaultError = require('../middlewares/defaultError.middleware');
const ValidateKey = require('../middlewares/validateKey.middleware');
const Collections = require('../models/collection.model');

const item = express.Router();

item.use(ValidateKey);
// Create a collection
item.post('/', (req, res, next) => {
  const { name, value, collectionId } = req.body;
  Collections.findOne({ _id: mongoose.Types.ObjectId(collectionId) })
    .then((coll) => {
      if (coll !== null) {
        Items.create({ name, value, collectionId: mongoose.Types.ObjectId(collectionId) })
          .then((data) => {
            res.status(200).json({ success: true, item: data });
          })
          .catch(next);
      } else {
        next(new Error('Not an existing collection'));
      }
    })
    .catch(next);
});

// Update a Collection
item.put('/', (req, res, next) => {
  const { name, value, id } = req.body;
  Items.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $set: { name, value } })
    .then((data) => {
      res.status(200).json({ success: true, collection: data });
    })
    .catch(next);
});

item.use(DefaultError);
module.exports = item;
