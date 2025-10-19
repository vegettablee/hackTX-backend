require("dotenv").config();
const {
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { dynamo, TableName } = require('./config/dynamoDB');
const fs = require('fs');
const path = require('path');

// Test function to insert fake vehicles
async function insertFakeVehicles() {
  // Load vehicles from JSON file
  const vehiclesPath = path.join(__dirname, 'data', 'vehicles.json');
  const fakeVehicles = JSON.parse(fs.readFileSync(vehiclesPath, 'utf-8'));

  try {
    for (const vehicle of fakeVehicles) {
      await dynamo.send(new PutItemCommand({ TableName, Item: vehicle }));
      console.log(`✅ Inserted vehicle: ${vehicle.id.S} - ${vehicle.vehicleModel.S}`);
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
  await getVehicle("VEHICLE#010");

  console.log("\n✅ All vehicle tests completed!");
}

// Execute tests
runTests();
