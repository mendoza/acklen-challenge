const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    sub: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', userSchema);
