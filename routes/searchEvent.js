var express = require('express');
var router = express.Router();
var Event = require('../models/schema/event');
var User = require('../models/schema/user');

module.exports = router;

module.exports.findEvents = function(req, res) {
	console.log(req.query);
	context = {};
	var startdate = new Date; 
	var enddate = new Date("December 31, 2040 12:00:00");
	
	if (req.query.type) {
		context["type"] = req.query.type;
	} else if(req.query.location){
		context["location"] = {$regex : ".*" + req.query.location + ".*"};
	}else if (req.query.startdate){
		startdate = req.query.startdate; 
	}else if(req.query.enddate){
		enddate = req.query.enddate;
	}	
	context["date"] =  {  $lte: enddate, $gte: startdate };
	Event.find(context, function(err, events) {
		if (err) throw err;
		res.render('search', { events : events, user : req.user });
	});
};
