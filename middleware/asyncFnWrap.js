const asyncFnWrap = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => {
			next(err); // forward the Error object, not err.message... sorry guys 
		}); 
	};
};

export default asyncFnWrap;
