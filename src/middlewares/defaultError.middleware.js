// eslint-disable-next-line no-unused-vars
const DefaultError = (err, _req, res, next) => {
  res.status(501).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = DefaultError;
