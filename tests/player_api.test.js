const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);

describe("POST /player", () => {
	it("should create a new user", async () => {
		// Define the user data to be sent in the request body

		const response = await api.post("/player").send();
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("playerId"); // Assuming the response contains the created user's ID
		expect(response.body).toHaveProperty("score", 0); // Corrected typo: "socre" to "score"
	});
});

describe("GET /player/:playerId", () => {
	let playerId; // Declare a variable to store the generated player ID

	beforeEach(async () => {
		const newUserResponse = await api.post("/player").send();
		playerId = newUserResponse.body.playerId;
	});

	it("responds with json containing player score", async () => {
		const response = await api.get(`/player/${playerId}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("playerId", playerId);
		expect(response.body).toHaveProperty("score", 0);
	});

	it("should return 404 if player ID does not exist", async () => {
		const response = await api.get("/player/nonexistentPlayerId");
		expect(response.status).toBe(404);
	});
});

describe("GET /player/:playerId", () => {
	it("should update the score for a player", async () => {
		// Create a new player to update the score
		const createPlayerResponse = await api.post("/player").send({ score: 0 });
		const playerId = createPlayerResponse.body.playerId;

		const updatedScore = 20;

		const updateScoreResponse = await api
			.put(`/player/${playerId}`)
			.send({ score: updatedScore });

		// Assert the response status code
		expect(updateScoreResponse.status).toBe(200);

		// Assert the response body
		expect(updateScoreResponse.body).toEqual({
			message: "Score updated successfully",
			newScore: updatedScore,
		});
	});
});
