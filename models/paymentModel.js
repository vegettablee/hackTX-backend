const VehicleProfileSchema = require("./vehicleProfileModel");

const paymentSchema = {
  vehicleProfile : VehicleProfileSchema,

  interestRate : Number, // payment plan argument; could have default value
  termMonths : Number,   // payment plan argument; could have default value
  downPayment : Number,   // payment plan argument; could have default value
  monthlyPayment : Number 
};

module.exports = paymentSchema;
