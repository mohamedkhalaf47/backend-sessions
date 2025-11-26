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
import verifyToken from "../middleware/verifyToken.js";
import allowedRole from "../middleware/allowedRole.js";

const movieRouter = Router();

movieRouter
	.route("/")
	.get(getMovies)
	.post(
		verifyToken,
		allowedRole("admin"),
		movieValidation,
		createMovie,
		createMovieHandler
	);

movieRouter
	.route("/:movieId")
	.get(getMovieById)
	.patch(verifyToken, allowedRole("admin"), updateMovie)
	.delete(verifyToken, allowedRole("admin"), deleteMovie);

export default movieRouter;
