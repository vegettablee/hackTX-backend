const userService = require('../services/userService');

// Request/Response handling layer
const userController = async (req, res) => {
  // Call the service here
    userId = req.params.id;
    matchedUser = userService.getUserById(userId); 

};

module.exports = userController;
