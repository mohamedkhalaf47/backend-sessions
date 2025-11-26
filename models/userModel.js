import { body } from "express-validator";
import mongoose from "mongoose";

const usersModel = new mongoose.Schema(
	{
		username: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [8, "Min Length is At least 8 character"],
		},
		token: { type: String },
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{ versionKey: false, timestamps: true }
);

const User = mongoose.model("User", usersModel);

export default User;
