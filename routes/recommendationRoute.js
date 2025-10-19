const express = require('express');
const router = express.Router();
const { handleRecommendation } = require('../controllers/recommendationController');

// Add your routes here
router.post('/recommend-cars', handleRecommendation)

module.exports = router;
