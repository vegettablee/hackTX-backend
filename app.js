require("dotenv").config();
const express = require("express");
const cors = require("cors");
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

app.use(cors({
  origin: "http://localhost:3000",// <-- Replace with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false // if you’re using cookies or auth headers
}));


// Mount routes
app.use('/cars', recommendationRoute);

// Start server (locally)
//app.listen(3000, () => console.log("Server running on http://localhost:3000"));

// leftover from package.json for script
//"test": "echo \"Error: no test specified\" && exit 1"

// Deploy for render
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express on Render!');
});

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});