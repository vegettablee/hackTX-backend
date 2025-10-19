require("dotenv").config();
const {
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { dynamo, TableName } = require('./config/dynamoDB');

// Test function to insert fake users, to run : 
// node test.js
async function insertFakeUsers() {
  const fakeUsers = [
    {
      id: { S: "8723hs" },
      name: { S: "John Doe" },
      password: { S: "hashed_password_123" },
      birthday: { S: "1990-05-15" },
      userSpecific: {
        M: {
          income: { N: "75000" },
          creditScore: { N: "720" }
        }
      },
      vehicleCondition: { S: "NEW" },
      fuelType: { S: "HYBRID" },
      vehicleYearRange: { L: [{ N: "2022" }, { N: "2024" }] }
    },
    {
      id: { S: "872sdf3hs" },
      name: { S: "Jane Smith" },
      password: { S: "hashed_password_456" },
      birthday: { S: "1985-08-22" },
      userSpecific: {
        M: {
          income: { N: "95000" },
          creditScore: { N: "780" }
        }
      },
      vehicleCondition: { S: "USED" },
      fuelType: { S: "ELECTRIC" },
      vehicleYearRange: { L: [{ N: "2018" }, { N: "2021" }] }
    },
    {
      id: { S: "98723s" },
      name: { S: "Mike Johnson" },
      password: { S: "hashed_password_789" },
      birthday: { S: "1992-12-03" },
      userSpecific: {
        M: {
          income: { N: "60000" },
          creditScore: { N: "650" }
        }
      },
      vehicleCondition: { S: "NEW" },
      fuelType: { S: "GAS" },
      vehicleYearRange: { L: [{ N: "2023" }, { N: "2024" }] }
    }
  ];

  try {
    for (const user of fakeUsers) {
      await dynamo.send(new PutItemCommand({ TableName, Item: user }));
      console.log(` Inserted user: ${user.id.S}`);
    }
    console.log(" All fake users inserted successfully!");
  } catch (err) {
    console.error("L Failed to insert users:", err);
  }
}

// Test function to retrieve a user
async function getUser(userId) {
  try {
    const result = await dynamo.send(
      new GetItemCommand({
        TableName,
        Key: { id: { S: userId } },
      })
    );

    if (result.Item) {
      console.log(` Retrieved user: ${userId}`, result.Item);
      return result.Item;
    } else {
      console.log(`L User not found: ${userId}`);
      return null;
    }
  } catch (err) {
    console.error("L Failed to get user:", err);
  }
}

// Run tests
async function runTests() {
  console.log("Starting tests...\n");
  
  // Insert fake users
  await insertFakeUsers();

  console.log("\n--- Testing retrieval ---");
  // Test retrieving a user
  await getUser("8723hs");
  await getUser("872sdf3hs");
  await getUser("98723s");

  console.log("\n All tests completed!");
}

// Execute tests
runTests();
