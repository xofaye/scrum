var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = router;

module.exports.loadEvent = function(req, res) {
	console.log("Load event");
	console.log(req.query);

	Event.findOne({_id: req.query.id}).populate('createdBy fullName _id', 'attendees fullName _id').exec(function(err, event) {
		if (err) throw err;
		res.render('event', { event: event, user: req.user });
	});
}

module.exports.addAttendee = function(req, res) {
	console.log("RSVP");

	Event.findByIdAndUpdate(req.body.id, {
		"$addToSet": {
			attendees : req.user
		}
	}, function(err, event){
		if (err) throw err;
		event.save(function(err) {
			if (err) throw err;
			console.log("Event updated");
		})

		User.findByIdAndUpdate(req.user.id, {
			"$addToSet" : {
				eventsGoing : event
			}
		}, function(err){
			Event.findOne({_id:req.body.id}).populate('createdBy fullName _id', 'attendees fullName _id').exec(function(err, event){
				console.log(req.user.id);
				console.log(event);
				if (err) throw err;
				res.render("event", { event: event, user: req.user });
			
			});
		});
	});
}

module.exports.updateEvent = function(req, res) {
	//e = req.body.id;
	// console.log(new ObjectId(e));
	var newTitle = req.body.title;
	var newLoc = req.body.location;
	var newType = req.body.type;
	var newDesc = req.body.description;
	var newNum = req.body.numRequired;
	var newDate = req.body.date;

	Event.findOne({_id:req.body.id}, function(err, event) {
		if (err) throw err 
			//{console.log("find one " + err)};
		console.log("original event:" + event.title);
		console.log("original event:" + event.date);

		if(newTitle === "") {
			newTitle = event.title;
		}

		if (newLoc === "") {
			console.log("empty location");
			newLoc = event.location;
		}

		if( newDate === "") {
			console.log("empty date");
			newDate = event.date;
		}


		Event.findByIdAndUpdate(req.body.id, {
			"$set": {
					'title': newTitle,
					'location': newLoc,
					'date': newDate,
					'type': newType,
					'description': newDesc,
					'numRequired': newNum
				}
			}, {new:true}, function(err, event){
			if (err) throw err;
				//{console.log("findByIdAndUpdate " + err)};
			event.save(function(err) {
				if (err) throw err;
					//{	console.log("save " + err)};
				console.log("Event updated");
			})

			Event.findOne({_id:req.body.id}).populate('createdBy fullName _id', 'attendees fullName _id').exec(function(err, event){
				if (err) throw err;
					//{console.log(err)};
				res.status(200);
				res.render("event", { event: event, user: req.user } );
			});
		});
	});

		// res.status(200);
		// res.render("event", { event: event, user: req.user } );
	// });
}
