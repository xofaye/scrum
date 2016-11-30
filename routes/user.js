var User = require('../models/schema/user');
var bCrypt = require('bcrypt-nodejs');
//var ObjectId = require('mongoose').Types.ObjectId;
//var Event = require('../models/schema/event');

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports.updateProfile = function(req, res) {
	//var u = req.user;
	console.log("user profile: " + req.query.id);
	console.log("editing profile: " + req.user._id);
	
	//console.log(u._id);
	//console.log(u.fullName);

	var newName = req.body.fullName;
	console.log(newName);

	var newEmail = req.body.email;
	console.log(newEmail);

	var newBio = req.body.bio;
	console.log(newBio);
	//res.send(req.params);
	var newPassword = req.body.password;

	User.findOne({_id:req.query.id}, function(err, u) {
		if (err) throw err;
		console.log("user: " + u.fullName);

		if (newName === "") {
		newName = u.fullName;
		} if (newEmail === "") {
		newEmail = u.email;
		} if (newBio === ""){
		newBio = u.biography;
		} if (newPassword !== "") {
			newPassword = createHash(newPassword);
		} if (newPassword === "") {
			newPassword = u.password;
		}

		//console.log(u.password);

		User.findByIdAndUpdate(req.query.id, {
			"$set":{
				'fullName': newName,
				'email': newEmail,
				'biography': newBio,
				'password': newPassword
			}
		}, {new:true}, function(err, user){
			if (err) throw err;
			user.save(function(err) {
				if (err) throw err;
				console.log("User successfully updated");
			})
			if (req.user._id.equals(req.query.id)) {
				console.log('same user');
				res.redirect("/profile");

			} else {
				res.redirect("/profile?id=" + req.query.id);
			}
		});
	});

	// User.findByIdAndUpdate(req.query.id, {fullName : newName, email : newEmail, biography : newBio}, {new : true}, function(err, user) {
	// 	if (err) throw err;
	// 	user.save(function(err) {
	// 		if (err) throw err;
	// 		console.log("User succesfully updated");
	// 	});
	// 	//res.status(200);
	// 	res.redirect("/profile");
	// });

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

	User.findOne({_id: id}).populate('eventsCreated title', 'eventsGoing title').exec(function(err, profile) {
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