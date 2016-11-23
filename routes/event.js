var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');

module.exports = router;

module.exports.loadEvent = function(req, res) {
	console.log("Load event");
	console.log(req.query);

	Event.findOne({_id: req.query.id}, function(err, event) {
		if (err) throw err;
		res.render('event', { event: event });
	});
};