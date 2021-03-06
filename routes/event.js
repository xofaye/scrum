var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');
var Comment = require('../models/schema/comment');
var ObjectId = require('mongoose').Types.ObjectId;

var opts = [
	{
		path: 'comments',
		model: 'Comment',
		populate: {
			path: 'user',
			model: 'User',
			select: ('_id', 'fullName')
		}
	},
	{
		path: 'attendees',
		select: ('_id', 'fullName')
	},
	{
		path: 'createdBy',
		select: ('_id', 'fullName')
	}
];

module.exports = router;

module.exports.loadEvent = function(req, res) {
	console.log("Load event");
	console.log(req.query);

	Event.findOne({_id: req.query.id}).populate(opts).exec(function(err, event) {
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
			Event.findOne({_id:req.body.id}).populate(opts).exec(function(err, event){
				if (err) throw err;
				res.render("event", { event: event, user: req.user });
			
			});
		});
	});
}

module.exports.removeAttendee = function(req, res) {
	console.log("RSVP");

	Event.findByIdAndUpdate(req.body.id, {
		"$pull": {
			attendees : { $in: [ req.user ] }
		}
	}, function(err, event){
		if (err) throw err;
		event.save(function(err) {
			if (err) throw err;
			console.log("Attendee removed");
		})

		User.findByIdAndUpdate(req.user.id, {
			"$pull" : {
				eventsGoing : { $in: [ event ] }
			}
		}, function(err){
			Event.findOne({_id:req.body.id}).populate(opts).exec(function(err, event){
				if (err) throw err;
				res.render("event", { event: event, user: req.user });
			
			});
		});
	});
}

module.exports.delete = function(req, res) { 
	console.log("DELETE EVENT");

	Event.remove({_id:req.body.id}, function(err, event){
		res.redirect("/home");
	});
}

module.exports.addComment = function(req, res) {
	console.log("Comment");

	var comment = new Comment();
	comment.user = req.user._id;
	comment.event = req.body.id;
	comment.date = new Date();
	comment.text = req.body.text;

	comment.save(function(err, comment) {
		if (err) throw err;
		// Add comment to Event
		Event.findByIdAndUpdate(req.body.id, {
			"$addToSet" : {
				comments : comment
			}
		}, function(err){
			Event.findOne({_id:req.body.id}).populate(opts).exec(function(err, event){
				if (err) throw err;
				res.render("event", { event: event, user: req.user });
			});
		});
	});

}

module.exports.deleteComment = function(req, res) {
	console.log("Delete comment");

	Event.findByIdAndUpdate(req.body.event_id, {
		"$pull": {
			comments: { $in: [ req.body.comment_id ] }
		}
	}, function(err, event){
		if (err) throw err;
		event.save(function(err) {
			if (err) throw err;
			console.log("Comment removed from event");
		})

		Comment.remove({_id:req.body.comment_id}, function(err, comment){
			if (err) throw err;
			console.log("Comment deleted");
			Event.findOne({_id:req.body.event_id}).populate(opts).exec(function(err, event){
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

		if( newDate === "" || newDate <= Date.now()) {
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

			Event.findOne({_id:req.body.id}).populate(opts).exec(function(err, event){
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
