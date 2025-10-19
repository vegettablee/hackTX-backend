const { recommendationService, fetchAllVehicles } = require('../services/recommendationService');

// Request/Response handling layer
const handleRecommendation = async (req, res) => {
   const userId = req.params.id
   const user = req.body; // schema in the form of the body

   // call the database, retrieve the corresponding id
  // call the service here
  // Add your controller methods here
};

module.exports = { handleRecommendation };
