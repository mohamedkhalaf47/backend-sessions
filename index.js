// Simple API Project for movie-theatre
import express from "express";
import movieRouter from "./routes/movieRoute.js";
import connectMongo from "./config/connectMongo.js";
import "dotenv/config";
import TextStatus from "./utils/httpStatus.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectMongo();

// Middleware For Whole Application
app.use(express.json({ limit: "10kb" })); // To parse JSON bodies

// Routes
app.use("/api/movies", movieRouter);

app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
