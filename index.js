// Simple API Project for movie-theatre
import express from "express";
import movieRouter from "./routes/movieRoute";

const app = express();
const PORT = 3000;

// Middleware For Whole Application
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/movies", movieRouter)

app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
