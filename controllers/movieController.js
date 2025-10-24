import movies from "../models/movie.model.js";
import { validationResult } from "express-validator";

export const getMovies = (req, res) => {
	res.json({ success: true, movies });
};

export const getMovieById = (req, res) => {
	const movieId = +req.params.movieId;
	const movie = movies.find((movie) => movie.id === movieId);
	if (!movie) {
		return res.json({ success: false, message: "Movie not found" });
	}
	res.json({ success: true, movie });
};

export const createMovie = (req, res, next) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.json({ success: false, errors: err.array() });
	}
	next();
};

export const createMovieHandler = (req, res) => {
	const movie = req.body;
	if (!movie.title || !movie.price) {
		return res.json({ success: false, message: "Missing Fields" });
	}
	movies.push({ id: movies.length + 1, ...movie });
	res.json({ success: true, movie, data: movies });
};

export const updateMovie = (req, res) => {
	const movieId = +req.params.movieId;
	let movie = movies.find((movie) => movie.id === movieId);
	if (!movie) {
		return res.json({ success: false, message: "Movie not found" });
	}
	movie = { ...movie, ...req.body };
	return res.json({ success: true, movie });
};

export const deleteMovie = (req, res) => {
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
};
