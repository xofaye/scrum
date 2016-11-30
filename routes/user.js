var User = require('../models/schema/user');
//var Event = require('../models/schema/event');

var opts = [
	{
		path: 'eventsCreated',
		select: ('_id', 'title')
	},
	{
		path: 'eventsGoing',
		select: ('_id', 'title')
	}
];

module.exports.updateProfile = function(req, res) {
	var u = req.user;
	console.log(u._id);
	console.log(u.fullName);

	var newName = req.body.fullName;
	console.log(newName);
	if (newName === "") {
		newName = u.fullName;
	}
	var newEmail = req.body.email;
	console.log(newEmail);
	if (newEmail === "") {
		newEmail = u.email;
	}
	var newBio = req.body.bio;
	console.log(newBio);
	if (newBio === ""){
		newBio = u.biography;
	}


	User.findByIdAndUpdate(u._id, {fullName : newName, email : newEmail, biography : newBio}, {new : true}, function(err, user) {
		if (err) throw err;
		user.save(function(err) {
			if (err) throw err;
			console.log("User succesfully updated");
		});
		//res.send(user);
		res.status(200);
		res.redirect("/profile");
		//return user;
		//console.log(user);
	});

}

module.exports.viewProfile = function(req, res) {
	id = req.user.id; 
	if(req.query.id){
		id = req.query.id; 
	}

	// User.findOne({_id: id}).populate('eventsCreated').exec(function(err, e) {
	// 	if (err) throw err;
	// 	console.log(e);
	// })

	User.findOne({_id: id}).populate(opts).exec(function(err, profile) {
		if (err) throw err;
		// var e = []
		// for (var i=0; i< req.user.eventsCreated.length; i++) {
		// 	//console.log(req.user.eventsCreated[i]);
		// 	//console.log(Event.findOne({_id: req.user.eventsCreated[i]}));
		// 	e.push(Event.findOne({_id: req.user.eventsCreated[i]}))
		// }
		//Event.findById()
		console.log(req.user);
		res.render('profile', { "user": req.user, "profile": profile });
	});

}