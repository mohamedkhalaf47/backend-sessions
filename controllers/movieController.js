import Movies from "../models/moviesModel.js";
import { validationResult } from "express-validator";
import TextStatus from "../utils/httpStatus.js";
import asyncFnWrap from "../middleware/asyncFnWrap.js";
import APIError from "../utils/APIError.js";

export const getMovies = asyncFnWrap(async (req, res) => {
	const query = req.query;
	const limit = query.limit || 3;
	const page = query.page || 1;
	const skip = (page - 1) * limit;

	const movies = await Movies.find().limit(limit).skip(skip);
	res.status(TextStatus.OK).json({ success: true, movies });
});

export const getMovieById = asyncFnWrap(async (req, res, next) => {
	const movieId = req.params.movieId;
	const movie = await Movies.findById(movieId);
	if (!movie) {
		const error = APIError.create(
			"Movie Not Found",
			false,
			TextStatus.NOT_FOUND
		);
		return next(error);
	}
	res.status(TextStatus.OK).json({ success: true, movie });
});

export const createMovie = (req, res, next) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		const error = APIError.create(err.array(), false, TextStatus.BAD_REQUEST);
		return next(error);
	}
	next();
};

export const createMovieHandler = asyncFnWrap(async (req, res) => {
	const newMovie = await Movies.create(req.body);
	await newMovie.save();
	res.status(TextStatus.CREATED).json({ success: true, movie: newMovie });
});

export const updateMovie = asyncFnWrap(async (req, res, next) => {
	const movieId = req.params.movieId;
	const updatedMovie = await Movies.findByIdAndUpdate(
		movieId,
		{ $set: { ...req.body } },
		{ new: true } // This tells MongoDB to return the updated document
	);
	if (!updatedMovie) {
		const error = APIError.create(
			"Movie Not Found",
			false,
			TextStatus.NOT_FOUND
		);
		return next(error);
	}
	return res.status(TextStatus.OK).json({ success: true, movie: updatedMovie });
});

export const deleteMovie = asyncFnWrap(async (req, res, next) => {
	const movieId = req.params.movieId;
	const movie = await Movies.findByIdAndDelete(movieId);
	if (!movie) {
		const error = APIError.create(
			"Movie Not Found",
			false,
			TextStatus.NOT_FOUND
		);
		return next(error);
	}
	res.status(TextStatus.NO_CONTENT).json({
		success: true,
		message: "Movie deleted successfully",
	});
});
