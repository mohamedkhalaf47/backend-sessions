import APIError from "../utils/APIError.js";
import TextStatus from "../utils/httpStatus.js";

const allowedRole = (...roles) => {
	// made it to be req.currentUser?.role to avoid crash if currentUser is undefined and to handle single role string or array of roles
	return (req, res, next) => {
		if (!roles.includes(req.currentUser?.role)) {
			return next(
				APIError.create(
					"This Role Is Not Authorized",
					false,
					TextStatus.UNAUTHORIZED
				)
			);
		}
		// role is allowed, continue to next middleware/handler
		next();
	};
};

export default allowedRole;
