require("dotenv").config();
const express = require("express");

const app = express();

// Import routes
const recommendationRoute = require('./routes/recommendationRoute');

// Only parse JSON for requests that should have a body
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// Mount routes
app.use('/cars', recommendationRoute);

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));