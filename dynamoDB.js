const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const dotenv = require("dotenv");

dotenv.config();

const dynamoDBClient = new DynamoDBClient({
	region: process.env.AWS_DEFAULT_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const tableName = "score-table";

module.exports = { dynamoDBClient, tableName };
