var bcrypt = require('bcrypt');

var query = require('./query');

function hashPassword(password) {
	return bcrypt.hashSync(password, 10);
};

function updateLogin(username) {
	query.getUserByUsername(username).update('last_login', new Date())
	.then(function(data) {
	})
	.catch(function(err) {
		console.error(err);
	})
}

function findUser(username) {

	return query.getUserByUsername(username)

};

function authenticateUser(username, password) {
	// findUser(username)
	return query.getUserByUsername(username)

}

function addUser(first_name, last_name, email, username, password) {
	if (!username || !password) {
		return false;
	}
	
	return query.addNewUser(first_name, last_name, email, username, hashPassword(password))
}

module.exports = {
	find: findUser,
	authenticate: authenticateUser,
	add: addUser,
	updateLogin: updateLogin
}
