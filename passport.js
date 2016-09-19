var passport = require("passport");
var Local = require('passport-local').Strategy;
var users = require('./users');
var bcrypt = require('bcrypt')


passport.use(new Local(
	function(username, password, done) {
		users.find(username)
		.then(function(data) {

			let user = data[0];

			if(bcrypt.compareSync(password, user.password_hash)){
				users.updateLogin(username);
				done(null, user);
			} else {
				done(null, false, {message: 'Incorrect username or password!'});

			}
		})
		.catch(function(err) {
			done(null, false, {message: 'Incorrect username of password!'});
		})

	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	users.find(username)
	.then(function(data){
		let user = data[0];
		done(null, user);
	})
	.catch(function(err) {
		return next(err);
	})



});

module.exports = passport;
