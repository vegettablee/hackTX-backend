// Business logic layer

// takes in an instance of paymentSchema
const paymentService = async ({vehicleProfile, interestRate = 5, termMonths = 60, downPayment = 0}) => {
    const principal = vehicleProfile.msrp - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    
    const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -1 * termMonths));

    return parseInt(monthlyPayment.toFixed(2));
};

module.exports = paymentService;

// formula for monthly payment
// To calculate principal amount: msrp - downPayment
// To calculate the monthly rate: interestRate / 100 / 12
// To calculate the monthly payment: (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))