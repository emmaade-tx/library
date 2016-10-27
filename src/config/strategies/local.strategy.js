const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;

module.exports = () => {
	passport.use(new localStrategy({
		usernameField: 'user_name',
		passwordField: 'password'
	}, (username, password, done) => {
			const url = 'mongodb://localhost/libraryApp';
			mongodb.connect(url, (err, db) => {
				const collection = db.collection('users');
				collection.findOne({
					userName: username
					}, (err, results) => {
						if (results.password === password) {
							const user = results;
							done(null, user);
						} else {
							done(null, false, {message: 'Bad password'});
						}
						
					});
			});
		}));
};