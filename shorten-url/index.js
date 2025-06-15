const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  let originalUrl;

  try {
    const body = JSON.parse(event.body);
    originalUrl = body.originalUrl;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" }),
    };
  }

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid URL" }),
    };
  }

  const shortCode = crypto.randomBytes(3).toString("hex");
  const expirationInSeconds = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;

  const command = new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    Item: {
      shortCode: { S: shortCode },
      originalUrl: { S: originalUrl },
      expireAt: { N: expirationInSeconds.toString() }
    },
  });

  try {
    await client.send(command);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving to database", error: err.message }),
    };
  }

  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*", // allow frontend access
        "Access-Control-Allow-Credentials": true
      },
    body: JSON.stringify({
      shortCode,
      shortUrl: `${process.env.DOMAIN_NAME}/${shortCode}`,
    }),
  };
};

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_) {
    return false;
  }
}
