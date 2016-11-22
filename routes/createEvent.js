var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var Event = require('../models/schema/event');

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('createEvent', { user: req.user });
});

router.post('/', function(req, res) {
	console.log("Add event");
	console.log(req.body);
	var newEvent = new Event(req.body);

	newEvent.save(function(err, newBook) {
		if (err) throw err;
		res.send('Success');
	})
});

module.exports = router;