const VehicleProfileSchema = {
  id : String, 
  
  vehicleDetails: {
    vehicleCondition: String, // 'NEW' or 'USED'
    fuelType: String // 'GAS', 'HYBRID', or 'ELECTRIC'
  },
  
  msrp: Number,          // price of vehicle
  vehicleYear: Number,
  vehicleModel: String,
  vehicleTrim: String,   // 'BASE', 'SPORT', or 'LIMITED'
  vehicleType : String, // SEDAN, SUV, HATCHBACK, or TRUCK
  mileage: Number,
};

module.exports = VehicleProfileSchema;

