const paymentSchema = require("../models/paymentModel");

// takes in an instance of paymentSchema
const paymentService = ({vehicleProfile, interestRate = 5, termMonths = 60, downPayment = 0}) => {
    const principal = vehicleProfile.msrp - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    
    const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -1 * termMonths));

    return parseInt(monthlyPayment.toFixed(2));
};

const calculateAffordabilityScores = async (vehicles, user) => { 

    let scoredVehicles = []; 

    for (const vehicle of vehicles) {
    // Compute monthly payment
    const payment = paymentService({ vehicleProfile: vehicle });

    // Compute affordability ratio
    const ratio = payment / ((user.income / 12) * 0.15);
    const creditWeight = user.creditScore / 850;

    // Higher = better affordability
    const baseScore = Math.max(0, 1 - ratio);
    const finalScore = parseFloat((baseScore * creditWeight).toFixed(3));
    // Push vehicle + its affordability score
    scoredVehicles.push({
      ...vehicle,
      monthlyPayment: payment,
      affordabilityScore: finalScore,
    });
  }

  // Sort descending (best first)
  scoredVehicles.sort((a, b) => b.affordabilityScore - a.affordabilityScore);

  let vehiclePaymentSchemas = []; 
  for(sortedVehicle of scoredVehicles)  { 
    let schema = paymentSchema({
        vehicleProfile : sortedVehicle.vehicle, 
        
    })
  }
}


module.exports = paymentService, calculateAffordabilityScores

// formula for monthly payment
// To calculate principal amount: msrp - downPayment
// To calculate the monthly rate: interestRate / 100 / 12
// To calculate the monthly payment: (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))