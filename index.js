// Simple API Project for movie-theatre

import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
const PORT = 3000;

// Middleware For Whole Application
app.use(express.json()); // To parse JSON bodies

// Movies Validation
const movieValidation = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title Is Required")
		.isLength({ min: 4 })
		.withMessage("Title Must At Least 4 Characters Long"),
	body("price")
		.notEmpty()
		.isNumeric()
		.isFloat({ min: 0 })
		.withMessage("Price Is Required and Must Be Greater Than 0"),
];

// Data
let movies = [
	{ id: 1, title: "Inception", price: 10 },
	{ id: 2, title: "Spider-Man", price: 15 },
];

// CRUD Operations (Create, Read, Update, Delete)

app.get("/api/movies", (req, res) => {
	res.json({ success: true, movies });
});

app.get("/api/movies/:movieId", (req, res) => {
	const movieId = +req.params.movieId;
	const movie = movies.find((movie) => movie.id === movieId);
	if (!movie) {
		return res.json({ success: false, message: "Movie not found" });
	}
	res.json({ success: true, movie });
});

app.post(
	"/api/movies",
	movieValidation,
	(req, res, next) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.json({ success: false, errors: err.array() });
		}
		next();
	},
	(req, res) => {
		const movie = req.body;
		if (!movie.title || !movie.price) {
			return res.json({ success: false, message: "Missing Fields" });
		}
		movies.push({ id: movies.length + 1, ...movie });
		res.json({ success: true, movie, data: movies });
	}
);

app.patch("/api/movies/:movieId", (req, res) => {
	const movieId = +req.params.movieId;
	let movie = movies.find((movie) => movie.id === movieId);
	if (!movie) {
		return res.json({ success: false, message: "Movie not found" });
	}
	movie = { ...movie, ...req.body };
	return res.json({ success: true, movie });
});

app.delete("/api/movies/:movieId", (req, res) => {
	const movieId = +req.params.movieId;
	let movie = movies.find((movie) => movie.id === movieId);
	if (!movie) {
		return res.json({ success: false, message: "Movie not found" });
	}

	movies = movies.filter((movie) => movie.id !== movieId);

	res.json({
		success: true,
		message: "Movie deleted successfully",
		data: movies,
	});
});

app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
