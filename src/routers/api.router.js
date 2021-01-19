const express = require('express');

const collection = require('./colletion.router');
const user = require('./user.router');
const item = require('./item.router');

const api = express.Router();

api.use('/collections', collection);
api.use('/users', user);
api.use('/items', item);

module.exports = api;
