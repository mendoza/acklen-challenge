const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', userSchema);
