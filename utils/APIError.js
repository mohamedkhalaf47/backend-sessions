class APIError extends Error {
	// inherit from the built-in Error class
	// to create a custom error type
	constructor() {
		super(); // Call the parent class constructor (Error)
	}

	create(message, isSuccess, statusCode) {
		this.message = message;
		this.isSuccess = isSuccess;
		this.statusCode = statusCode;
		return this;
	}
}

export default new APIError();
