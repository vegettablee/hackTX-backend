const { recommendationService } = require('../services/recommendationService');
const { createUser } = require("../services/userService"); 
// Request/Response handling layer
const handleRecommendation = async (req, res) => {
  try { 
   const user = req.body;
   let topVehicles = await recommendationService(user);
   await createUser(user, topVehicles);

   return res.status(200).json();
  } 
  catch(error) { 
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports = { handleRecommendation };
