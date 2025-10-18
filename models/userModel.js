const UserSchema = {
  id: String,
  name: String,
  password: String,
  birthday: String,
 
  income: Number,
  creditScore: String,
  
  vehicleCondition: String, // 'NEW' or 'USED'
  fuelType: String, // 'GAS', 'HYBRID', or 'ELECTRIC'
  vehicleYearRange: Array // [minYear, maxYear]
};

module.exports = UserSchema;
