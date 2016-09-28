const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
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
		},
		{
			title: '48 laws of power',
			genre: 'power and Motivation',
			author: 'Dan Brown',
			read: 'false'
		},
		{
			title: 'Angels and Demon',
			genre: 'Devilish and Drama',
			author: 'Dan Brown',
			read: 'false'
		},
		{
			title: 'Ijapa Toroko Oko yanibo',
			genre: 'Yoruba and story book',
			author: 'Tunde Kilani',
			read: 'false'
		},
];
const router = (nav) => {
	adminRouter.route('/addbooks')
		.get((req, res) => {
			const url = 'mongodb://localhost/libraryApp';
			mongodb.connect(url, (err, db) => {
				const collection = db.collection('books');
				collection.insertMany(books, (err, results) => {
					res.send(results);
					db.close();
				});
			});
		});
	return adminRouter;
};
module.exports = router;