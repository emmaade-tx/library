const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const mongodb = require('mongodb').MongoClient;

const router = () => {
	authRouter.route('/signup')
		.post((req, res) => {
			const url = 'mongodb://localhost/libraryApp';
			mongodb.connect(url, (err, db) => {
				const collection = db.collection('users');
				const user = {
					userName: req.body.user_name,
					firstName: req.body.first_name,
					password: req.body.password
				};
				collection.insert(user, (err, results) => {
					req.login(results.ops[0], () => {
					res.redirect('/auth/profile');
					});
				});
			});
			
		});
	authRouter.route('/signin')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
		}), (req, res) => {
			res.redirect('/auth/profile');
		});
	authRouter.route('/profile')
		.all((req, res, next) => {
			if (!req.user) {
				res.redirect('/');
			}
			next();
		})
		.get((req, res) => {
			res.json(req.user);
		});
	return authRouter;
};
module.exports = router;