// Business logic layer
const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { dynamo, TableName } = require('../config/dynamoDB');
const { calculateAffordabilityScores } = require("./paymentService")

// Mock user for testing the recommendation algorithm
const mockUser = {
  id: "USER#001",
  name: "John Doe",
  password: "hashed_password_123",
  birthday: "1990-05-15",
  userSpecific: {
    income: 75000,
    creditScore: 720
  },
  vehicleCondition: "NEW", // 'NEW' or 'USED'
  fuelType: "HYBRID", // 'GAS', 'HYBRID', or 'ELECTRIC'
  vehicleYearRange: [2022, 2024] // [minYear, maxYear]
};

const recommendationService = async (user) => {
  // user in form of userModel // return the matching car listings
  // For testing, use mockUser if no user is provided
  const currentUser = user || mockUser;
  let vehicles = await fetchAllVehicles();
  let filteredVehicles = findCarsByCriteria(currentUser, vehicles);
  let vehicleRecommendations = getTopVehicles(filteredVehicles, currentUser)

  return vehicleRecommendations;
};

const findCarsByCriteria = (user, vehicles) => {

  let income = user.userSpecific.income;
  let creditScore = user.userSpecific.creditScore;
  let minRange = user.vehicleYearRange[0];
  let maxRange = user.vehicleYearRange[1];
  let fuelType = user.fuelType;
  let vehicleCondition = user.vehicleCondition;

  // Filter vehicles based on user criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    // Check vehicle condition match (NEW or USED)
  const conditionMatch = vehicle.vehicleDetails.vehicleCondition === vehicleCondition;

    // Check fuel type match (GAS, HYBRID, or ELECTRIC)
  const fuelTypeMatch = vehicle.vehicleDetails.fuelType === fuelType;

    // Check if vehicle year is within user's preferred range
  const yearMatch = vehicle.vehicleYear >= minRange && vehicle.vehicleYear <= maxRange;

    // Return true only if all criteria match
  return conditionMatch && fuelTypeMatch && yearMatch;
  });

  return filteredVehicles;
}

const fetchAllVehicles = async () => {

  try {
    // Scan the entire table
    const result = await dynamo.send(new ScanCommand({ TableName }));

    if (!result.Items || result.Items.length === 0) {
      return [];
    }

    const vehicles = result.Items
      .filter(item => item.id && item.id.S && item.id.S.startsWith("VEHICLE#"))
      .map(item => unmarshall(item));

    return vehicles;
  } catch (err) {
    console.error("Failed to fetch vehicles from database:", err);
    throw err;
  }
}

const getTopVehicles = (vehicles, user) => { 
  let topVehicleSchemas = calculateAffordabilityScores(vehicles, user); 
  return topVehicleSchemas; 
} 





module.exports = { recommendationService, fetchAllVehicles, findCarsByCriteria };
