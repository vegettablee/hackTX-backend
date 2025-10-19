const { getUserById, createUser} = require('../services/userService');

// Request/Response handling layer
const createUser = async (req, res) => {
  // Call the service here
    userId = req.params.id;
    // once the id is received,

};

const getUser = async (req, res) => { 
  userId = req.params.id; 
  matchedUser = userService.getUserById(userId); 
  if(matchedUser) { 
    return res.status(200).json(matchedUser);
  }
  else { 
    return res.status(400).json("Could not find existing user"); 
  }
}

module.exports = userController;
