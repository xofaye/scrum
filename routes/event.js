var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');

module.exports = router;

module.exports.loadEvent = function(req, res) {
	console.log("Load event");
	console.log(req.query);

	Event.findOne({_id: req.query.id}).populate('createdBy fullName _id').exec(function(err, event) {
		if (err) throw err;
		res.render('event', { event: event, user: req.user });
		console.log(event.createdBy._id);
	});
}

module.exports.updateEvent = function(req, res) {
	var e = req.user;
	console.log(e);

	// var newTitle = req.body.title;
	// if(newTitle === "") {
	// 	newTitle = e.title;
	// }
	// var newLoc = req.body.location;
	// if (newLoc === "") {
	// 	newLoc = e.location;
	// }
	// var newDate = new Date(req.body.date);
	
	// Event.findByIdAndUpdate(e._id, {title: newTitle, location: newLoc, date: newDate}, {new:true}, function(err, event){
	// 	if (err) throw err;
	// 	event.save(function(err) {
	// 		if (err) throw err;
	// 		console.log("Event updated");
	// 	});
	// 	res.status(200);
	// 	res.redirect("/event");
	// });
}
