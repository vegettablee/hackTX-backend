require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

// Create DynamoDB client
const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TableName = "hackatx_db";

module.exports = { dynamo, TableName };
