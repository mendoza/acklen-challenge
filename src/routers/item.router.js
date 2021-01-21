const express = require('express');
const mongoose = require('mongoose');
const Items = require('../models/item.model');
const DefaultError = require('../middlewares/defaultError.middleware');
const ValidateKey = require('../middlewares/validateKey.middleware');
const Collections = require('../models/collection.model');
const shareItems = require('../models/shareItem.model');

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

// get share id
item.post('/share', (req, res, next) => {
  const { itemId } = req.body;
  shareItems
    .findOne({ itemId: mongoose.Types.ObjectId(itemId) })
    .then((possible) => {
      if (possible === null) {
        shareItems
          .create({ itemId })
          .then((create) => {
            res.status(200).json({ success: true, shareItem: create });
          })
          .catch(next);
      } else {
        res.status(200).json({ success: true, shareItem: possible });
      }
    })
    .catch(next);
});

// get shared item
item.put('/share', (req, res, next) => {
  const { shareId } = req.body;
  shareItems
    .findOne({ _id: mongoose.Types.ObjectId(shareId) })
    .then((possible) => {
      if (possible !== null) {
        Items.findOne({ _id: mongoose.Types.ObjectId(possible.itemId) }).then((sharedItem) => {
          Collections.findOne({ _id: mongoose.Types.ObjectId(sharedItem.collectionId) }).then(
            (data) => {
              res.status(200).json({ success: true, sharedItem, collection: data });
            },
          );
        });
      } else {
        res.status(200).json({ success: false, sharedItem: {} });
      }
    })
    .catch(next);
});

// Delete an item
item.delete('/', (req, res, next) => {
  const { id } = req.body;
  Items.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
    .then((data) => {
      res.status(200).json({ success: true, item: data });
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
