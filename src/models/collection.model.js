const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    private: { type: Boolean, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('collections', collectionSchema);
