const VehicleProfileSchema = {
  vehicleDetails: {
    vehicleCondition: String, // 'NEW' or 'USED'
    fuelType: String // 'GAS', 'HYBRID', or 'ELECTRIC'
  },
  
  msrp: Number,          // price of vehicle
  vehicleYear: Number,
  vehicleModel: String,
  vehicleTrim: String,   // 'BASE', 'SPORT', or 'LIMITED'
  mileage: Number,
};

module.exports = VehicleProfileSchema;

