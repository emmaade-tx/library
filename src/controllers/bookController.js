const mongodb = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const bookController = (bookService, nav) => {
	const middleware = (req, res, next) => {
		if (!req.user) {
				res.redirect('/');
		}
		next();
	};
	const getIndex = (req, res) => {
			const url = 'mongodb://localhost/libraryApp';
			mongodb.connect(url, (err, db) => {
				const collection = db.collection('books');
				collection.find({}).toArray( (err, results) => {
					res.render('books', {
					title: 'Books', 
					nav: nav,
					books: results
					});
				});
			});
		};

	const getById = (req, res) => {
			const id = new objectId(req.params.id);
			const url = 'mongodb://localhost/libraryApp';
			mongodb.connect(url, (err, db) => {
				const collection = db.collection('books');
				collection.findOne({
					_id: id
				}, (err, result) => {
					bookService.getBookById(result.bookId, (err, book) => {
						result.book = book;
						res.render('book', {
						title: 'Books', 
						nav: nav,
						book: result
						});
					})
					
				});
			});
		};

	return {
		getIndex: getIndex,
		getById: getById,
		middleware: middleware
	};
};

module.exports = bookController