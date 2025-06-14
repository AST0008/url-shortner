const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event)); // 👈 helpful log

  const shortCode = event.pathParameters.shortCode;

  const command = new GetItemCommand({
    TableName: process.env.TABLE_NAME,
    Key: {
      shortCode: { S: shortCode }
    }
  });

  try {
    const data = await client.send(command);

    if (!data.Item || !data.Item.originalUrl) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Short URL not found" }),
      };
    }

    return {
      statusCode: 301,
      headers: {
        Location: data.Item.originalUrl.S,
      },
      body: null,
    };
  } catch (err) {
    console.error("ERROR:", err); // 👈 log actual error
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
