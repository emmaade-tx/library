const express = require('express');

const bookRouter = express.Router();

const router = (nav) => {
	const books = [
		{
			title: 'War and Peace',
			genre: 'Historical Fiction',
			author: 'Lev Brendowski',
			read: 'false'
		},
		{
			title: '30 Laws Of Power',
			genre: 'Power and Politics',
			author: 'Dan Brown',
			read: 'false'
		},
		{
			title: 'Eat The frogs',
			genre: 'Motivation and Inspiration',
			author: 'Brian Tracy',
			read: 'false'
		},
		{
			title: 'Rich Dad Poor dad',
			genre: 'Money Making and Success',
			author: 'Robert Kiyosaki',
			read: 'false'
		},
		{
			title: 'Ideas rules the world',
			genre: 'Christian and Motivation',
			author: 'Sam Adeyemi',
			read: 'false'
		} 
	];

	bookRouter.route('/') 
		.get((req, res) => {
			res.render('books', {
			title: 'Books', 
			nav: nav,
			books: books
		});
	});

	bookRouter.route('/:id')
		.get((req, res) => {
			const id = req.params.id;
			res.render('book', {
			title: 'Book', 
			nav: nav,
			book: books[id]
		});
	});

	return bookRouter;
}

module.exports = router;