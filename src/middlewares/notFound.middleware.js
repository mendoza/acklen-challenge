// eslint-disable-next-line no-unused-vars
const NotFound = (_req, res, next) => {
  res.status(404).json({
    success: false,
    message: '🔍 Could not find the resource you were looking',
  });
};

module.exports = NotFound;
