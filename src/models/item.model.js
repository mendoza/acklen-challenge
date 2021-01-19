const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
    },
    name: { type: String, required: true },
    value: { type: Number, required: false, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('items', itemSchema);
