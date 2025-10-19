const { GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { dynamo, TableName } = require('../config/dynamoDB');

const getUserById = async (userId) => {
  try {
    const result = await dynamo.send(
      new GetItemCommand({
        TableName,
        Key: { id: { S: userId } },
      })
    );

    if (result.Item) {
      console.log(`Retrieved user: ${userId}`, result.Item);
      return result.Item;
    } else {
      console.log(`L User not found: ${userId}`);
      return null;
    }
  } catch (err) {
    console.error("L Failed to get user:", err);
  }
}

const createUser = async (id) => { 

}

module.exports = getUserById, createUser
