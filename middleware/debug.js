const debugMiddleware = (req, res, next) => {
  console.log(`[DEBUG] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('[DEBUG] Headers:', req.headers);
  next();
};

module.exports = { debugMiddleware };