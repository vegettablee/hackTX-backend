require("dotenv").config();
const express = require("express");
const {
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { dynamo, TableName } = require('./config/dynamoDB');

const app = express();

// Import routes
const recommendationRoute = require('./routes/recommendationRoute');

// Only parse JSON for requests that should have a body
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// Mount routes
app.use('/api/recommendations', recommendationRoute);

// ✅ Test route
app.get("/test-db", async (req, res) => {
  try {
    // 1️⃣ Fake data to insert
    const item = {
      id: { S: "TEST#123" },
      message: { S: "Hello from Express + DynamoDB!" },
      timestamp: { N: Date.now().toString() },
    };

    // 2️⃣ Write to DynamoDB
    await dynamo.send(new PutItemCommand({ TableName, Item: item }));

    // 3️⃣ Read it back
    const result = await dynamo.send(
      new GetItemCommand({
        TableName,
        Key: { id: { S: "TEST#123" } },
      })
    );

    // 4️⃣ Respond with the data
    res.json({
      success: true,
      message: "✅ DynamoDB connection works!",
      data: result.Item,
    });
  } catch (err) {
    console.error("❌ DynamoDB test failed:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ✅ Start server
app.listen(3000, () => console.log(" Server running on http://localhost:3000"));