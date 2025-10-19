## ENDPOINTS

### POST /recommend-cars

Recommends vehicles tailored to a user's preferences and financial profile, along with customized payment plans.

#### Request Body

The client must send a JSON object following the **UserProfileSchema** structure (from `models/userProfileModel.js`):

```json
{
  "id": "string",
  "name": "string",
  "password": "string",
  "birthday": "string",
  "userSpecific": {
    "income": "number",
    "creditScore": "number"
  },
  "vehicleCondition": "string",  // 'NEW' or 'USED'
  "fuelType": "string",           // 'GAS', 'HYBRID', or 'ELECTRIC'
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
      "vehicleDetails": {
        "vehicleCondition": "string",  // 'NEW' or 'USED'
        "fuelType": "string"            // 'GAS', 'HYBRID', or 'ELECTRIC'
      },
      "msrp": "number",
      "vehicleYear": "number",
      "vehicleModel": "string",
      "vehicleTrim": "string",          // 'BASE', 'SPORT', or 'LIMITED'
      "mileage": "number"
    },
    "interestRate": "number",
    "termMonths": "number",
    "downPayment": "number",
    "monthlyPayment" : "number,
  },
  // ... more payment schemas
]
```

#### Example

**Request:**
```json
POST /recommend-cars
{
  "id": "user123",
  "name": "John Doe",
  "password": "hashedpassword",
  "birthday": "1990-05-15",
  "userSpecific": {
    "income": 75000,
    "creditScore": 720
  },
  "vehicleCondition": "NEW",
  "fuelType": "HYBRID",
  "vehicleYearRange": [2022, 2025]
}
```

**Response:**
```json
[
  {
    "vehicleProfile": {
      "vehicleDetails": {
        "vehicleCondition": "NEW",
        "fuelType": "HYBRID"
      },
      "msrp": 32000,
      "vehicleYear": 2024,
      "vehicleModel": "Toyota Camry",
      "vehicleTrim": "SPORT",
      "mileage": 0
    },
    "interestRate": 4.5,
    "termMonths": 60,
    "downPayment": 6400,
    "monthlyPayment" : 350,
  }
]
```
