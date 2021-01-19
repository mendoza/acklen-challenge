const crypto = require('crypto');
// eslint-disable-next-line no-unused-vars
const ValidateKey = (req, res, next) => {
  if (!req.header('treasure-key')) {
    const err = new Error('🔑 You need a key access this API');
    res.status(401).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }

  if (
    crypto.timingSafeEqual(
      Buffer.from(process.env.API_KEY),
      Buffer.from(req.header('treasure-key')),
    )
  ) {
    const err = new Error('🔑 Not enough permission to access this API');
    res.status(401).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  } else {
    next();
  }
};

module.exports = ValidateKey;
