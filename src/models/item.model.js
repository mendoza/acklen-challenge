const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    collection: {
      type: String,
      index: true,
      required: true,
    },
    name: { type: String, required: true },
    value: { type: Number, required: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('items', itemSchema);
