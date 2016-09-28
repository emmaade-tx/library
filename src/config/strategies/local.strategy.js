const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = () => {
	passport.use(new localStrategy({
		fullName: 'full_name',
		userName: 'user_name',
		password: 'password'
	}, (fullname, username, password, done) => {
		const user = {
			fullname: fullname,
			username: username,
			password: password
		};
		done(null, user);
	}));
};