const { getUserById, createUser} = require('../services/userService');
const { unmarshall } = require("@aws-sdk/util-dynamodb"); 

const getUserVehicleResults = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  if(user) {
    rawData = user.vehicleResults; 
    const simplified = rawData.L.map(item => unmarshall(item.M));
    return res.status(200).json(simplified);
  }
  else {
    return res.status(400).json("Could not find existing user");
  }
}

module.exports = { getUserVehicleResults }; 
