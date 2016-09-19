var express = require('express');
var router = express.Router();

var query = require('../query')



router.get('/new', function(req, res, next) {
	if(!req.user) {
		res.redirect('/login');
	}
	res.render('post/new', {user: req.user});
})

router.post('/new', function(req, res, next) {

	query.createPost(req.user.id, req.body.title, req.body.body)
	.then(function(data) {
		res.redirect('/dashboard');
	})
	.catch(function(err) {
		return next(err);
	})

})

router.get('/:postId', function(req, res, next) {

	let postId = req.params.postId;

	if(!parseInt(postId)) {
		next();
	}

	query.getPostById(postId)
	.then(function(data) {
		res.render('post/post', {data: data[0], user: req.user});
	})
	.catch(function(err) {
		return next(err);
	})
})


module.exports = router;
