const UserProfileSchema = {
  id: String,
  name: String,
  password: String,
  birthday: String,
  userSpecific: {
    income: Number,
    creditScore: Number
  },

  // preferences
  vehicleCondition: String, // 'NEW' or 'USED'
  fuelType: String, // 'GAS', 'HYBRID', or 'ELECTRIC'
  vehicleYearRange: Array // [minYear, maxYear]
};

module.exports = UserProfileSchema;
