const paymentSchema = require("../models/paymentModel");

let INTEREST_RATE = 5; // constants
let TERM_MONTHS = 60; 

// takes in an instance of paymentSchema
const paymentService = (vehicleProfile, downPayment, interestRate = INTEREST_RATE, termMonths = TERM_MONTHS) => {
  const principal = vehicleProfile.msrp - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  return parseInt(monthlyPayment.toFixed(2));
};

const calculateAffordabilityScores = async (vehicles, user) => { 
  const scoredVehicles = []; 

  for (const vehicle of vehicles) {
    const downPayment = vehicle.msrp * 0.15; // 15% default
    const monthlyPayment = paymentService(vehicle, downPayment);

    const ratio = monthlyPayment / ((user.income / 12) * 0.15);
    const creditWeight = user.creditScore / 850;
    const baseScore = Math.max(0, 1 - ratio);
    const finalScore = parseFloat((baseScore * creditWeight).toFixed(3));
    
    scoredVehicles.push({
      ...vehicle,
      interestRate: INTEREST_RATE,
      termMonths: TERM_MONTHS,
      downPayment,
      monthlyPayment,
      affordabilityScore: finalScore,
    });
    }

  // Sort descending (best first)
  scoredVehicles.sort((a, b) => b.affordabilityScore - a.affordabilityScore); // sort them convert into payment schemas

  let vehiclePaymentSchemas = [];
  for(const sortedVehicle of scoredVehicles)  {
    // Extract only vehicle properties (excluding payment-related fields we added)
    const { interestRate, termMonths, downPayment, monthlyPayment, affordabilityScore, ...vehicleProfile } = sortedVehicle;

    let schema = {
        vehicleProfile,
        interestRate,
        termMonths,
        downPayment,
        monthlyPayment
    };
    vehiclePaymentSchemas.push(schema);
  }
  return vehiclePaymentSchemas; 
}


module.exports = { paymentService, calculateAffordabilityScores };

// formula for monthly payment
// To calculate principal amount: msrp - downPayment
// To calculate the monthly rate: interestRate / 100 / 12
// To calculate the monthly payment: (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))