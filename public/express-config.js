// express-config.js
const path = require('path');

function configureExpress(app) {
  // Fix MIME type issues
  app.use('/css', (req, res, next) => {
    res.type('text/css');
    next();
  });

  // Configure static files properly
  app.use(express.static(path.join(__dirname, 'public')));

  // Debug middleware to log requested paths
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

module.exports = configureExpress;
