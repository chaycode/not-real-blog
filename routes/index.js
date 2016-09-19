var express = require('express');
var router = express.Router();
var query = require('../query');
var users = require('../users');

var passport = require('../passport')



/* GET home page. */
router.get('/', function(req, res, next) {
	let renderObject = {};

	if (req.isAuthenticated){
		renderObject.user = req.user;
	};

	query.getAllPosts()
	.then(function(data) {
		renderObject.flash = req.flash();
		renderObject.data = data;

		res.render('index', renderObject);

	})
	.catch(function(err) {
		return next(err);
	})
});

router.get('/dashboard', function(req, res, next) {

	if (!req.user) {
		res.redirect('/login');
	}

	query.getAllPostByUser(req.user.id)
	.then(function(posts){
		res.render('user/dashboard', {
			user: req.user,
			posts: posts
		});
	})
	.catch(function(err) {
		return next(err);
	})

});

router.get('/login', function(req, res, next) {

	res.render('login', req.flash());

});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/dashboard',
	failureRedirect: '/login',
	failureFlash: "Incorrect username or password.",
	successFlash: "Welcome!"
}));

router.get('/register', function(req, res, next) {

	if(req.user){
		res.redirect('/dashboard');
	}

	res.render('user/register');
});

router.post('/register', function(req, res, next) {

	if(req.body.password != req.body.password_confirm){
		res.render("register")
	}

	users.add(req.body.first_name, req.body.last_name, req.body.email, req.body.username, req.body.password)
	.then(function(data) {
		res.redirect('/')
	})
	.catch(function(err){
		return next(err)
	})
});

router.get('/update', function(req, res, next) {
	if(!req.user) {
		res.redirect('/login')
	}
	res.render('update', {user: req.user});
})

router.post('/update', function(req, res, next) {
	query.updateUser(req.user.username, req.body.bio)
	.then(function(data) {
		res.redirect('/dashboard');
	})
	.catch(function(err) {
		return next(err);
	})
})

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

router.get('/delete', function(req, res, next) {
	res.render('delete', {user: req.user});
});

router.post('/delete', function(req, res, next) {
	query.deleteUser(req.body.username, req.body.password)
	.then(function() {
		res.redirect('/');
	})
	.catch(function(err) {
		return next(err);
	})
});

module.exports = router;
