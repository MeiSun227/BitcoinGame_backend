const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const playerRouter = require("./route/playerRouter");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
	cors({
		origin: "*",
	})
);
app.use("/player", playerRouter);

module.exports = app;
