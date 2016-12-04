var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');

module.exports = router;

module.exports.findEvents = function(req, res) {
	//console.log("search query: " + req.query);
	context = {};
	var startdate = new Date; 
	var enddate = new Date("December 31, 2099 12:00:00");
	
	if (req.query.type) {
		context["type"] = req.query.type;
	} if(req.query.location){
		context["location"] = {$regex : ".*" + req.query.location + ".*", $options : 'i'};
	} if (req.query.startdate){
		startdate = req.query.startdate;
		//startdate = new Date(req.query.startdate); 
		//console.log("start date: " + startdate);
	} if(req.query.enddate){
		enddate = req.query.enddate;
		//enddate = new Date(req.query.enddate);
		//console.log("enddate: " + enddate);
	}	
	context["date"] =  {  $lte: enddate, $gte: startdate };
	Event.find(context).sort({"date":1}).populate('createdBy fullName _id').exec(function(err, events) {
		if (err) throw err;
		res.render('search', { events : events, user : req.user });
	});
};

module.exports.findUsers = function(req, res) {
	console.log(req.query);
	context = {};
	
	if (req.query.fullName) {
		context["fullName"] = {$regex : ".*" + req.query.fullName + ".*", $options : 'i'};
	} else if(req.query.email){
		context["email"] = email;
	}
	User.find(context).exec(function(err, results) {
		if (err) throw err;
		res.render('users', { results : results, user : req.user });
	});
};
