var knex = require('./knex');

function Users() {
	return knex('users');
};

function Posts() {
	return knex('posts');
};


module.exports = {
	getAllUsers: Users,
	getUserByUsername: function(username) {
		return Users().where('username', username);
	},
	updateUser: function(username, bio) {
		return Users().where('username', username).update('bio', bio);
	},
	addNewUser: function(first_name, last_name, email, username, password_hash) {
		return Users().insert({
			first_name: first_name,
			last_name: last_name,
			email: email,
			username: username,
			password_hash: password_hash,
			created_at: new Date(),
			updated_at: new Date()
		})
	},
	deleteUser: function(username, password) {
		return Users().where('username', username).where('password_hash', password).del();
	},
	getAllPosts: Posts,
	getPostById: function(postId) {
		return Posts().where('id', postId);
	},
	createPost: function(userid, title, body) {
		return Posts().insert({
			title: title,
			user_id: userid,
			body: body,
			created_at: new Date(),
			updated_at: new Date()
		})
	},
	getAllPostByUser: function(userid) {
		return Posts().where('user_id', userid);
	}
}
