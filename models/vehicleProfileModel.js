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

  interestRate : Number, // payment plan argument; could have default value
  termMonths : Number,   // payment plan argument; could have default value
  downPayment : Number   // payment plan argument; could have default value
};

module.exports = VehicleProfileSchema;

// function getMonthlyPayment(mrsp, interestRate, termMonths, downPayment) {
//   const principal = mrsp - downPayment;
//   const monthlyRate = interestRate / 100 / 12;
//   return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -1 * termMonths));
// }

// formula for monthly payment
// To calculate principal amount: msrp - downPayment
// To calculate the monthly rate: interestRate / 100 / 12
// To calculate the monthly payment: (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))
