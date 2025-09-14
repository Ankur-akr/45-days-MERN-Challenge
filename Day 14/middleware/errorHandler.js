module.exports = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, message: 'Validation Error', errors });
  }
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate key error', key: err.keyValue });
  }
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
};
