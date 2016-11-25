var User = require('../models/schema/user');


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

	// User.findById(u._id, function(err, user){
	// 	if (err) throw err;
	// 	res.send(user);
	// })

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

	//console.log(User.findOne({_id:u._id}));
	//return User.findOne({_id: u._id});
	//res.send(u);

}

module.exports.viewProfile = function(req, res) {
	id = req.user.id; 
	if(req.query.id){
		id = req.query.id; 
	}
	User.findOne({_id: id}, function(err, profile) {
		if (err) throw err;
		res.render('profile', { "user": req.user, "profile": profile, "events":req.user.eventsGoing });
	});

}