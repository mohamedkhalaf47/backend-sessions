import APIError from "../utils/APIError.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	const authHeader = req.header("Authorization") || req.header("authorization");

	if (!authHeader) {
		const error = APIError.create("Token Is Required", false, 401);
		return next(error);
	}

	const token = authHeader.split(" ")[1];
	//   "Bearer Token"
	// ["Bearer", "Token"]
	//   "Token"

	try {
		const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.currentUser = currentUser;
		next();
	} catch (error) {
		APIError.create("Invalid Token", false, 401);
		return next(error);
	}
};

export default verifyToken;
