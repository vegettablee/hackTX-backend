const { recommendationService } = require('../services/recommendationService');

// Request/Response handling layer
const handleRecommendation = async (req, res) => {
   const user = req.body;
   let topVehicles = await recommendationService(user);
   return res.json(topVehicles);
};

module.exports = { handleRecommendation };
