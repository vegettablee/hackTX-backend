require("dotenv").config();
const {
  ScanCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { dynamo, TableName } = require('./config/dynamoDB');

// Function to clear all items from the database
async function clearDatabase() {
  try {
    console.log(`Starting to clear all items from table: ${TableName}...`);

    // Scan the table to get all items
    const scanResult = await dynamo.send(new ScanCommand({ TableName }));

    if (!scanResult.Items || scanResult.Items.length === 0) {
      console.log("✅ Table is already empty!");
      return;
    }

    console.log(`Found ${scanResult.Items.length} items to delete...`);

    // Delete each item
    let deletedCount = 0;
    for (const item of scanResult.Items) {
      await dynamo.send(
        new DeleteItemCommand({
          TableName,
          Key: { id: item.id },
        })
      );
      deletedCount++;
      console.log(`🗑️  Deleted item ${deletedCount}/${scanResult.Items.length}: ${item.id.S}`);
    }

    console.log(`\n✅ Successfully deleted ${deletedCount} items from ${TableName}!`);
  } catch (err) {
    console.error("❌ Failed to clear database:", err);
  }
}

// Execute the clear function
clearDatabase();
