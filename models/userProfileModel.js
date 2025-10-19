const { monthlyPayment } = require("./paymentModel");

const UserProfileSchema = {
  id: String,
  name: String,
  password: String,

  userSpecific: {
    income: Number,
    creditScore: Number
  },
  // budget preference 
  monthlyBudget : Number, // hover around a ratio based on the amount, like only go 25 percent over or below

  vehicleType : String, // SEDAN, SUV, HATCHBACK, or TRUCK
  fuelType: String, // 'GAS', 'HYBRID', or 'ELECTRIC'
  vehicleCondition: String, // 'NEW' or 'USED'
  vehicleYearRange: Array // [minYear, maxYear]
  
};

module.exports = UserProfileSchema;
