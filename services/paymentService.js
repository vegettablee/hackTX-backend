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
    let vehiclePaymentSchemas = []; 

    for(vehicle of vehicles) { 
    let schema = paymentSchema(); 
    let payment = paymentService(vehicle); 

    const ratio = payment / ((user.income / 12) * 0.15);
    const creditWeight = user.creditScore / 850; // scale 0–1
  
    const baseScore = Math.max(0, 1 - ratio);
    scoredVehicles.append({ 
        "vehicle" : vehicle, 
        "score" : baseScore
    })
    
    }
    return baseScore * creditWeight;
}


module.exports = paymentService, calculateAffordabilityScores

// formula for monthly payment
// To calculate principal amount: msrp - downPayment
// To calculate the monthly rate: interestRate / 100 / 12
// To calculate the monthly payment: (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))