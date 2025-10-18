const VehicleSchema = {
  vehicleDetails: {
    vehicleCondition: String, // 'NEW' or 'USED'
    fuelType: String // 'GAS', 'HYBRID', or 'ELECTRIC'
  },
  msrp: Number,
  vehicleYear: Number,
  vehicleModel: String,
  vehicleTrim: String, // 'BASE', 'SPORT', or 'LIMITED'
  mileage: Number
};

module.exports = VehicleSchema;
