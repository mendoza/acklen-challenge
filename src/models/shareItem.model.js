const mongoose = require('mongoose');

const shareItems = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
    },
    expire_at: { type: Date, default: Date.now, expires: 60 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('shareItems', shareItems);
