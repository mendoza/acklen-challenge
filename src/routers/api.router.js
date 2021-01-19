const express = require('express');

const collection = require('./colletion.router');
const user = require('./user.router');
const item = require('./item.router');
const ValidateKey = require('../middlewares/validateKey.middleware');
const DefaultError = require('../middlewares/defaultError.middleware');
const NotFound = require('../middlewares/notFound.middleware');

const api = express.Router();

api.use(ValidateKey);
api.use('/collections', collection);
api.use('/users', user);
api.use('/items', item);
api.use(DefaultError);
api.use(NotFound);

module.exports = api;
