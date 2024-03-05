const { dynamoDBClient, tableName } = require("../dynamoDB");
const {
	GetItemCommand,
	PutItemCommand,
	UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const getScore = async (playerId) => {
	const params = {
		TableName: tableName,
		Key: {
			playerId: { S: playerId },
		},
	};

	const data = await dynamoDBClient.send(new GetItemCommand(params));
	if (!data.Item) {
		throw new Error("Player not found");
	}
	return parseFloat(data.Item.Score.N);
};

const createPlayer = async () => {
	const playerId = uuidv4();
	const params = {
		TableName: tableName,
		Item: {
			playerId: { S: playerId },
			Score: { N: "0" },
		},
	};

	await dynamoDBClient.send(new PutItemCommand(params));
	return playerId;
};

const updateScore = async (playerId, score) => {
	const params = {
		TableName: tableName,
		Key: {
			playerId: { S: playerId },
		},
		UpdateExpression: "SET Score = :score",
		ExpressionAttributeValues: {
			":score": { N: score.toString() },
		},
		ReturnValues: "UPDATED_NEW",
	};

	const data = await dynamoDBClient.send(new UpdateItemCommand(params));
	return parseFloat(data.Attributes?.Score?.N);
};

module.exports = { updateScore, getScore, createPlayer };
