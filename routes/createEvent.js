var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');

module.exports = router;

module.exports.addEvent = function(req, res) {
	console.log("Add event");
	console.log(req.body);
	var newEvent = new Event(req.body);
	newEvent.date = new Date(req.body.date);
	newEvent.createdBy = req.user._id;
	// Add new event to db
	newEvent.save(function(err, newEvent) {
		if (err) throw err;
		// Add event to user created events
		User.findOne({_id: req.user._id}, function(err, user) {
			if (err) throw err;
			user.eventsCreated.push(newEvent._id);
			user.save(function(err, user) {
				if (err) throw err;
				res.render('home', { user: user });
			});
		});
	})

};
