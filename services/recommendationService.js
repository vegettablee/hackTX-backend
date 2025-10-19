// Business logic layer
const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { dynamo, TableName } = require('../config/dynamoDB');
const { calculateAffordabilityScores } = require("./paymentService")


const recommendationService = async (user) => {
  // user in form of userModel // return the matching car listings
  // For testing, use mockUser if no user is provided
  const currentUser = user;

  console.log("User preferences:", JSON.stringify(currentUser, null, 2));

  let vehicles = await fetchAllVehicles();
  console.log(`Fetched ${vehicles.length} vehicles from database`);

  let filteredVehicles = findCarsByCriteria(currentUser, vehicles);
  console.log(`${filteredVehicles.length} vehicles passed filtering`);

  let vehicleRecommendations = await getTopVehicles(filteredVehicles, currentUser);
  console.log(`Returning ${vehicleRecommendations.length} recommendations`);

  return vehicleRecommendations;
};

const findCarsByCriteria = (user, vehicles) => {

  let income = user.userSpecific.income;
  let creditScore = user.userSpecific.creditScore;
  let minRange = user.vehicleYearRange[0];
  let maxRange = user.vehicleYearRange[1];
  let fuelType = user.fuelType ? user.fuelType.toUpperCase() : null;
  let vehicleCondition = user.vehicleCondition ? user.vehicleCondition.toUpperCase() : null;
  let vehicleType = user.vehicleType ? user.vehicleType.toUpperCase() : null;
  let monthlyBudget = user.monthlyBudget;

  // Reverse-calculate target MSRP from monthly budget
  let targetMSRP = null;
  let minMSRP = 0;
  let maxMSRP = Infinity;

  if (monthlyBudget) {
    const INTEREST_RATE = 5; // Same as paymentService
    const TERM_MONTHS = 60;
    const DOWN_PAYMENT_PERCENT = 0.15;

    const monthlyRate = INTEREST_RATE / 100 / 12;
    const principal = monthlyBudget * (1 - Math.pow(1 + monthlyRate, -TERM_MONTHS)) / monthlyRate;
    targetMSRP = principal / (1 - DOWN_PAYMENT_PERCENT);

    // Allow vehicles up to 25% over budget, but no lower limit
    minMSRP = 0; // Allow any cheaper vehicles
    maxMSRP = targetMSRP * 1.25;

    console.log(`Budget calculation: monthlyBudget=$${monthlyBudget}, targetMSRP=$${targetMSRP.toFixed(2)}, maxMSRP=$${maxMSRP.toFixed(2)}`);
  }

  // Filter vehicles based on user criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    // Check vehicle condition match (NEW or USED)
    const vehicleConditionUpper = vehicle.vehicleDetails?.vehicleCondition?.toUpperCase();
    const conditionMatch = vehicleCondition ? vehicleConditionUpper === vehicleCondition : true;

    // Check fuel type match (GAS, HYBRID, or ELECTRIC)
    const vehicleFuelTypeUpper = vehicle.vehicleDetails?.fuelType?.toUpperCase();
    const fuelTypeMatch = fuelType ? vehicleFuelTypeUpper === fuelType : true;

    // Check vehicle type match (SEDAN, SUV, HATCHBACK, or TRUCK)
    const vehicleTypeUpper = vehicle.vehicleType?.toUpperCase();
    const typeMatch = vehicleType ? vehicleTypeUpper === vehicleType : true;

    // Check if vehicle year is within user's preferred range
    const yearMatch = vehicle.vehicleYear >= minRange && vehicle.vehicleYear <= maxRange;

    // Check if MSRP is within calculated budget range
    const budgetMatch = vehicle.msrp >= minMSRP && vehicle.msrp <= maxMSRP;

    const passed = conditionMatch && fuelTypeMatch && typeMatch && yearMatch && budgetMatch;

    if (!passed) {
      console.log(`Vehicle ${vehicle.id} filtered out: condition=${conditionMatch}, fuel=${fuelTypeMatch}, type=${typeMatch}, year=${yearMatch}, budget=${budgetMatch} (MSRP: $${vehicle.msrp})`);
    }

    // Return true only if all criteria match
    return passed;
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
