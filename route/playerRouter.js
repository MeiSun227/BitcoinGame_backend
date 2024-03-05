const express = require("express");
const {
	getScore,
	createPlayer,
	updateScore,
} = require("../service/playerService");

const playerRouter = express.Router();

playerRouter.get("/:playerId", async (req, res) => {
	const playerId = req.params.playerId;
	try {
		const score = await getScore(playerId);
		res.json({ playerId, score });
	} catch (error) {
		console.error("Error retrieving score:", error);
		res.status(404).json({ error: "Player not found" });
	}
});

playerRouter.post("/", async (req, res) => {
	try {
		const playerId = await createPlayer();
		res.json({
			playerId,
			message: "New player created successfully",
			score: 0,
		});
	} catch (error) {
		console.error("Error creating player:", error);
		res.status(500).json({ error: "An error occurred while creating player" });
	}
});

playerRouter.put("/:playerId", async (req, res) => {
	const playerId = req.params.playerId;
	try {
		const { score } = req.body;
		const newScore = await updateScore(playerId, score);
		res.json({
			message: "Score updated successfully",
			newScore,
		});
	} catch (error) {
		console.error("Error updating score:", error);
		res.status(500).json({ error: "An error occurred while updating score" });
	}
});

module.exports = playerRouter;
