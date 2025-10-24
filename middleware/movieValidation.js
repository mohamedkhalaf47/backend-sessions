import { body } from "express-validator";

const movieValidation = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title Is Required")
		.isLength({ min: 4 })
		.withMessage("Title Must At Least 4 Characters Long"),
	body("price")
		.notEmpty()
		.isNumeric()
		.isFloat({ min: 0 })
		.withMessage("Price Is Required and Must Be Greater Than 0"),
];

export default movieValidation;
