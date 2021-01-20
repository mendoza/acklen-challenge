const express = require('express');
const mongoose = require('mongoose');
const DefaultError = require('../middlewares/defaultError.middleware');
const ValidateKey = require('../middlewares/validateKey.middleware');
const Collections = require('../models/collection.model');
const Items = require('../models/item.model');

const collection = express.Router();

collection.use(ValidateKey);

// Get All Collections
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

// Create a collection
collection.post('/', (req, res, next) => {
  const { name, user, description, isPrivate } = req.body;
  Collections.create({ name, user, description, private: isPrivate })
    .then((data) => {
      res.status(200).json({ success: true, collection: data });
    })
    .catch(next);
});

// get a collection's items
collection.post('/items', (req, res, next) => {
  const { user, CollectionId } = req.body;
  Collections.findOne({ user, _id: CollectionId })
    .then((coll) => {
      if (coll !== null) {
        Items.find({ collectionId: CollectionId })
          .then((items) => {
            res.status(200).json({ success: true, collection: coll, items });
          })
          .catch(next);
      } else {
        res.status(200).json({ success: false });
      }
    })
    .catch(next);
});

// Delete a Collection
collection.delete('/', (req, res, next) => {
  const { id } = req.body;
  Collections.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
    .then((data) => {
      Items.deleteMany({ collection: id })
        .then((ItemsData) => {
          res.status(200).json({ success: true, collection: data, items: ItemsData });
        })
        .catch(next);
    })
    .catch(next);
});

// Update a Collection
collection.put('/', (req, res, next) => {
  const { name, user, description, private: notPublic, id } = req.body;
  Collections.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { $set: { name, user, description, private: notPublic } },
  )
    .then((data) => {
      res.status(200).json({ success: true, collection: data });
    })
    .catch(next);
});
collection.use(DefaultError);
module.exports = collection;
