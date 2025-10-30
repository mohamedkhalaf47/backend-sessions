import mongoose from "mongoose";

const moviesModel = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ versionKey: false, timestamps: true }
	/* to disable the "__v" field and add "createdAt" and "updatedAt" fields */
);

const Movies = mongoose.model("Movies", moviesModel);

export default Movies;
