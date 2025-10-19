require("dotenv").config();
const {
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { dynamo, TableName } = require('./config/dynamoDB');
const fs = require('fs');
const path = require('path');

// Test function to insert fake vehicles from vehicle.json
// to run : node testVehicles.js
async function insertFakeVehicles() {
  // Load vehicles from JSON file
  const vehiclesPath = path.join(__dirname, 'data', 'vehicles.json');
  const fakeVehicles = JSON.parse(fs.readFileSync(vehiclesPath, 'utf-8'));

  try {
    for (const vehicle of fakeVehicles) {
      // Convert plain JSON to DynamoDB format using marshall
      const marshalledVehicle = marshall(vehicle);
      await dynamo.send(new PutItemCommand({ TableName, Item: marshalledVehicle }));
      console.log(`✅ Inserted vehicle: ${vehicle.id} - ${vehicle.vehicleModel}`);
    }
    console.log("✅ All fake vehicles inserted successfully!");
  } catch (err) {
    console.error("❌ Failed to insert vehicles:", err);
  }
}

// Test function to retrieve a vehicle
async function getVehicle(vehicleId) {
  try {
    const result = await dynamo.send(
      new GetItemCommand({
        TableName,
        Key: { id: { S: vehicleId } },
      })
    );

    if (result.Item) {
      console.log(`✅ Retrieved vehicle: ${vehicleId}`, result.Item);
      return result.Item;
    } else {
      console.log(`❌ Vehicle not found: ${vehicleId}`);
      return null;
    }
  } catch (err) {
    console.error("❌ Failed to get vehicle:", err);
  }
}

// Run tests
async function runTests() {
  console.log("Starting vehicle tests...\n");

  // Insert fake vehicles
  await insertFakeVehicles();

  console.log("\n--- Testing retrieval ---");
  // Test retrieving some vehicles
  await getVehicle("VEHICLE#001");
  await getVehicle("VEHICLE#005");
  await getVehicle("VEHICLE#009");

  console.log("\n✅ All vehicle tests completed!");
}

// Execute tests
runTests();
