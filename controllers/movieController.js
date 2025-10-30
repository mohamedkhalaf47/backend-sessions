import Movies from "../models/moviesModel.js";
import { validationResult } from "express-validator";
import TextStatus from "../utils/httpStatus.js";

export const getMovies = async (req, res) => {
	try {
		const movies = await Movies.find();
		res.status(TextStatus.OK).json({ success: true, movies });
	} catch (error) {
		console.log(error.message);
	}
};

export const getMovieById = async (req, res) => {
	try {
		const movieId = req.params.movieId;
		const movie = await Movies.findById(movieId);
		if (!movie) {
			return res
				.status(TextStatus.NOT_FOUND)
				.json({ success: false, message: "Movie not found" });
		}
		res.status(TextStatus.OK).json({ success: true, movie });
	} catch (error) {
		console.log(error.message);
	}
};

export const createMovie = (req, res, next) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res
			.status(TextStatus.BAD_REQUEST)
			.json({ success: false, errors: err.array() });
	}
	next();
};

export const createMovieHandler = async (req, res) => {
	try {
		const newMovie = await Movies.create(req.body);
		await newMovie.save();
		res.status(TextStatus.CREATED).json({ success: true, movie: newMovie });
	} catch (error) {
		console.log(error.message);
	}
};

export const updateMovie = async (req, res) => {
	try {
		const movieId = req.params.movieId;
		const updatedMovie = await Movies.findByIdAndUpdate(
			movieId,
			{ $set: { ...req.body } },
			{ new: true } // This tells MongoDB to return the updated document
		);
		if (!updatedMovie) {
			return res
				.status(TextStatus.NOT_FOUND)
				.json({ success: false, message: "Movie not found" });
		}
		return res
			.status(TextStatus.OK)
			.json({ success: true, movie: updatedMovie });
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteMovie = async (req, res) => {
	try {
		const movieId = req.params.movieId;
		const movie = await Movies.findByIdAndDelete(movieId);
		if (!movie) {
			return res
				.status(TextStatus.NOT_FOUND)
				.json({ success: false, message: "Movie not found" });
		}
		res.status(TextStatus.NO_CONTENT).json({
			success: true,
			message: "Movie deleted successfully",
		});
	} catch (error) {
		console.log(error.message);
	}
};
