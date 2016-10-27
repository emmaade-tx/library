const goodeadsService = () => {
	const getBookById = (id, cb) => {
		cb(null, {description: "Our description"});
	};
	return {
		getBookById: getBookById
	}
};
module.exports = goodeadsService;