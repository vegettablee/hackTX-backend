// Business logic layer

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

  
  // TODO: Implement recommendation algorithm here
  // calculate estimated max msrp affordability
  // - Filter vehicles by income range
  // - Filter by vehicleCondition (NEW/USED)
  // - Filter by fuelType
  // - Filter by vehicleYearRange

  return [];
};

const findCarsByCriteria = async () => {

}

module.exports = recommendationService;
