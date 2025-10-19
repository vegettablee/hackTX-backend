## ENDPOINTS

### POST /cars/recommend-cars

Recommends vehicles tailored to a user's preferences and financial profile, along with customized payment plans.

#### Request Body

The client must send a JSON object following the **UserProfileSchema** structure (from `models/userProfileModel.js`):

```json
{
  "id": "string",
  "name": "string",
  "password": "string",
  "userSpecific": {
    "income": "number",
    "creditScore": "number"
  },
  "monthlyBudget": "number",      // Optional: desired monthly payment budget
  "vehicleType": "string",        // Optional: 'SEDAN', 'SUV', 'HATCHBACK', or 'TRUCK'
  "fuelType": "string",           // 'GAS', 'HYBRID', or 'ELECTRIC'
  "vehicleCondition": "string",   // 'NEW' or 'USED'
  "vehicleYearRange": ["number", "number"]  // [minYear, maxYear]
}
```

#### Response

Returns an array of **paymentSchema** objects (as defined in `models/paymentModel.js`). Each payment schema includes:
- A recommended vehicle profile matching the user's preferences
- Financial plan details tailored to the user's creditworthiness and income

**Response Structure:**

```json
[
  {
    "vehicleProfile": {
      "id": "string",
      "vehicleDetails": {
        "vehicleCondition": "string",  // 'NEW' or 'USED'
        "fuelType": "string"            // 'GAS', 'HYBRID', or 'ELECTRIC'
      },
      "msrp": "number",
      "vehicleYear": "number",
      "vehicleModel": "string",
      "vehicleTrim": "string",          // 'BASE', 'SPORT', or 'LIMITED'
      "vehicleType": "string",          // 'SEDAN', 'SUV', 'HATCHBACK', or 'TRUCK'
      "mileage": "number"
    },
    "interestRate": "number",
    "termMonths": "number",
    "downPayment": "number",
    "monthlyPayment": "number"
  }
  // ... more payment schemas
]
```

#### Example

**Request:**
```json
POST /cars/recommend-cars
{
  "id": "USER#001",
  "name": "Alex Ramirez",
  "password": "securePass123",
  "userSpecific": {
    "income": 78000,
    "creditScore": 720
  },
  "monthlyBudget": 800,
  "vehicleType": "SUV",
  "fuelType": "HYBRID",
  "vehicleCondition": "USED",
  "vehicleYearRange": [2019, 2024]
}
```

**Response:**
```json
[
  {
    "vehicleProfile": {
      "id": "VEHICLE#006",
      "vehicleDetails": {
        "vehicleCondition": "USED",
        "fuelType": "HYBRID"
      },
      "msrp": 27000,
      "vehicleYear": 2022,
      "vehicleModel": "Toyota Corolla Cross",
      "vehicleTrim": "SPORT",
      "vehicleType": "SUV",
      "mileage": 24000
    },
    "interestRate": 5,
    "termMonths": 60,
    "downPayment": 4050,
    "monthlyPayment": 434
  }
]
```
