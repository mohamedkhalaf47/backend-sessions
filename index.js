// Simple API Project for movie-theatre
import express from "express";
import movieRouter from "./routes/movieRoute.js";
import connectMongo from "./config/connectMongo.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

connectMongo();
app.use(cors()); // CORS => Cross Origin Resource Sharing

// Middleware For Whole Application
app.use(express.json({ limit: "10kb" })); // To parse JSON bodies

// Routes
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);

/* Global Error Handling Middleware 
(I made it so i can handle the errors properly in a json format) */
app.use((err, req, res, next) => {
	return res.status(err.statusCode || 404).json({
		success: err.isSuccess,
		message: err.message,
		code: err.statusCode || 500,
		data: null,
	});
});

app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
