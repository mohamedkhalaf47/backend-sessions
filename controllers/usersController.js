import asyncFnWrap from "../middleware/asyncFnWrap.js";
import User from "../models/userModel.js";
import APIError from "../utils/APIError.js";
import generateToken from "../utils/generateToken.js";
import TextStatus from "../utils/httpStatus.js";
import bcrypt from "bcrypt";

export const getAllUsers = asyncFnWrap(async (req, res) => {
	const query = req.query;
	const limit = query.limit || 3;
	const page = query.page || 1;
	const skip = (page - 1) * limit;

	const users = await User.find().limit(limit).skip(skip);
	res.status(TextStatus.OK).json({ success: true, users });
});

export const register = asyncFnWrap(async (req, res, next) => {
	const { username, email, password, role } = req.body;

	if ((!username, !email, !password)) {
		const error = APIError.create("Fill All The Inputs", false, 400);
		return next(error);
	}

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		const error = APIError.create("User Already Exist", false, 400);
		return next(error);
	}

	const hashedPassword = await bcrypt.hash(password, 8);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
		role,
	});

	// Generate JWT Token (include role so authorization middleware can read it)
	const token = await generateToken({
		email: newUser.email,
		id: newUser._id,
		role: newUser.role,
	});

	newUser.token = token;

	await newUser.save();

	return res.status(TextStatus.CREATED).json({ newUser });
});

export const login = asyncFnWrap(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		const error = APIError.create("Fill All The Inputs", false, 400);
		return next(error);
	}

	const registeredUser = await User.findOne({ email });

	if (!registeredUser) {
		const error = APIError.create("User Not Found", false, 404);
		return next(error);
	}

	const isMatched = await bcrypt.compare(password, registeredUser.password);
	if (!isMatched) {
		const error = APIError.create("Invalid Credentials", false, 400);
		return next(error);
	}

	return res
		.status(TextStatus.OK)
		.json({ message: "Logged In Successfully", registeredUser });
});
