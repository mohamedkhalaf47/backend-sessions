import { Router } from "express";
import movieValidation from "../middleware/movieValidation.js";
import {
	getMovies,
	getMovieById,
	createMovie,
	createMovieHandler,
	updateMovie,
	deleteMovie,
} from "../controllers/movieController.js";

const movieRouter = Router();

movieRouter
	.route("/")
	.get(getMovies)
	.post(movieValidation, createMovie, createMovieHandler);

movieRouter
	.route("/:movieId")
	.get(getMovieById)
	.patch(updateMovie)
	.delete(deleteMovie);

export default movieRouter;
