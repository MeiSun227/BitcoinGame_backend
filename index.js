const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const playerRouter = require("./route/playerRouter");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use("/player", playerRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
