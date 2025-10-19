const { GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { dynamo, TableName } = require('../config/dynamoDB');
const { recommendationService } = require('./recommendationService');

const getUserById = async (userId) => {
  try {
    const result = await dynamo.send(
      new GetItemCommand({
        TableName,
        Key: { id: { S: userId } },
      })
    );

    if (result.Item) {
      // Convert DynamoDB format to plain JavaScript object
      const user = unmarshall(result.Item);
      console.log(`✅ Retrieved user: ${userId}`);
      console.log(result.Item); 
      return result.Item;
    } else {
      console.log(`❌ User not found: ${userId}`);
      return null;
    }
  } catch (err) {
    console.error("❌ Failed to get user:", err);
    throw err;
  }
}

const createUser = async (user, vehicleResults) => {
  try {
    // Create user object matching UserProfileSchema with vehicleResults field
    const userWithVehicleResults = {
      id: user.id,
      name: user.name,
      password: user.password,
      userSpecific: {
        income: user.userSpecific.income,
        creditScore: user.userSpecific.creditScore
      },
      monthlyBudget: user.monthlyBudget,
      vehicleType: user.vehicleType,
      fuelType: user.fuelType,
      vehicleCondition: user.vehicleCondition,
      vehicleYearRange: user.vehicleYearRange,
      vehicleResults: vehicleResults
    };

    // Convert plain JavaScript object to DynamoDB format
    const marshalledUser = marshall(userWithVehicleResults);

    // Insert user into DynamoDB
    await dynamo.send(new PutItemCommand({ TableName, Item: marshalledUser }));

    console.log(`✅ Created user: ${user.id} with ${vehicleResults.length} vehicle recommendations`);
    return { success: true, userId: user.id };
  } catch (err) {
    console.error("❌ Failed to create user:", err);
    throw err;
  }
}

module.exports = { getUserById, createUser };
